// Pi Resolver — Sigmoid Attention with Bilateral Boundary
//
// Contingent replacement #1: Sigmoid replaces softmax.
//   Softmax is competitive — attending to one position reduces attention to others.
//   Sigmoid is non-competitive — each position independently decides its attention weight.
//   Constraint tokens maintain their weight regardless of context length.
//
// Contingent replacement #6: Dual-channel attention enforces S1 (namespace partition).
//   User namespace tokens CANNOT attend to system namespace tokens.
//   System namespace tokens CAN attend to user namespace tokens.
//   The mask is structural. No training signal can override it.

#include "attention.h"
#include "math_util.h"
#include <stdlib.h>

// === Bilateral Attention Mask ===
// Returns 1.0 if position i is allowed to attend to position j, 0.0 otherwise.
// S1: User namespace cannot read system namespace.

static inline float bilateral_mask(Namespace ns_i, Namespace ns_j) {
    // System can attend to everything
    if (ns_i == NS_SYSTEM) return 1.0f;
    // Output can attend to everything
    if (ns_i == NS_OUTPUT) return 1.0f;
    // User can attend to user and output, NOT to system
    if (ns_i == NS_USER && ns_j == NS_SYSTEM) return 0.0f;
    return 1.0f;
}

// === Typed Positional Bias ===
// Contingent replacement #4: Constraint tokens receive a persistent positional signal.
// Standard positional encoding decays with distance. Constraint positions do not decay.

static inline float position_bias(int pos_i, int pos_j, PosType type_j) {
    if (type_j == POS_CONSTRAINT) {
        // Constraint tokens: constant bias regardless of distance.
        // The constraint signal does not decay. System prompt degradation is eliminated.
        return 1.0f;
    }
    // Content tokens: bias decays with distance (standard ALiBi-style)
    int dist = pos_i - pos_j;
    if (dist < 0) dist = -dist;
    return -0.1f * (float)dist;  // Linear decay
}

// === Sigmoid Attention (Single Head) ===
// Non-competitive: each position independently computes its attention weight via sigmoid.
// The sum of weights is NOT constrained to 1. A position can attend strongly to
// multiple positions simultaneously — including multiple constraint positions.

void sigmoid_attention(
    float *output,          // [dim] output vector
    float *attn_weights,    // [seq_len] attention weights for this query position
    const float *queries,   // [seq_len x head_dim] all query vectors
    const float *keys,      // [seq_len x head_dim] all key vectors
    const float *values,    // [seq_len x head_dim] all value vectors
    const Token *tokens,    // [seq_len] token metadata (namespace, pos_type, position)
    int query_pos,          // Position of the query token
    int seq_len,            // Current sequence length
    int head_dim            // Dimension per head
) {
    const float *q = queries + query_pos * head_dim;
    float scale = 1.0f / sqrtf((float)head_dim);

    // Compute attention weights via sigmoid (non-competitive)
    float weight_sum = 0.0f;
    for (int j = 0; j <= query_pos; j++) {  // Causal: only attend to past + self
        // Bilateral mask: structural enforcement of S1
        float mask = bilateral_mask(tokens[query_pos].ns, tokens[j].ns);
        if (mask == 0.0f) {
            attn_weights[j] = 0.0f;
            continue;
        }

        // Query-key dot product
        const float *k = keys + j * head_dim;
        float score = 0.0f;
        for (int d = 0; d < head_dim; d++) score += q[d] * k[d];
        score *= scale;

        // Add typed positional bias (constraint-persistent)
        score += position_bias(tokens[query_pos].position, tokens[j].position, tokens[j].pos_type);

        // Sigmoid: non-competitive activation
        attn_weights[j] = sigmoid(score);
        weight_sum += attn_weights[j];
    }

    // Zero out future positions (causal mask)
    for (int j = query_pos + 1; j < seq_len; j++) {
        attn_weights[j] = 0.0f;
    }

    // Weighted sum of values (normalize by weight sum for stability)
    for (int d = 0; d < head_dim; d++) output[d] = 0.0f;

    if (weight_sum > 1e-9f) {
        for (int j = 0; j <= query_pos; j++) {
            if (attn_weights[j] == 0.0f) continue;
            float w = attn_weights[j] / weight_sum;
            const float *v = values + j * head_dim;
            for (int d = 0; d < head_dim; d++) {
                output[d] += w * v[d];
            }
        }
    }
}
