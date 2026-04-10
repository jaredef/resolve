// Pi Resolver — Model Forward Pass
//
// Composition of the four essential constraints:
//   1. Attention (long-range dependency) — sigmoid, non-competitive
//   2. Autoregressive generation (sequential narrowing) — causal mask
//   3. Discrete finite vocabulary (B_t definability) — byte-level, 256 tokens
//   4. Non-linear transformation (constraint satisfaction computation) — SiLU FFN
//
// Plus the seven contingent replacements:
//   1. Sigmoid attention (replaces softmax)
//   2. Typed projections (constraint-aware) — via positional encoding
//   3. Typed positional encoding (constraint-persistent)
//   4. Constraint-aware routing — simplified to single FFN for proof
//   5. Dual-channel attention (bilateral boundary)
//   6. Sparsemax output (exact zeros)
//   7. Pre-norm (RMS) — essential, placement contingent

#include "model.h"
#include "attention.h"
#include "math_util.h"
#include <stdlib.h>
#include <stdio.h>
#include <string.h>

// === Initialization ===

static float* alloc_f(int n) {
    float *p = (float*)calloc(n, sizeof(float));
    if (!p) { fprintf(stderr, "OOM\n"); exit(1); }
    return p;
}

void model_init(Model *m, Config cfg) {
    m->config = cfg;

    m->weights.token_embed = alloc_f(cfg.vocab_size * cfg.dim);
    m->weights.layers = (struct LayerWeights*)calloc(cfg.n_layers, sizeof(struct LayerWeights));

    for (int l = 0; l < cfg.n_layers; l++) {
        m->weights.layers[l].norm1 = alloc_f(cfg.dim);
        m->weights.layers[l].wq    = alloc_f(cfg.dim * cfg.dim);
        m->weights.layers[l].wk    = alloc_f(cfg.dim * cfg.dim);
        m->weights.layers[l].wv    = alloc_f(cfg.dim * cfg.dim);
        m->weights.layers[l].wo    = alloc_f(cfg.dim * cfg.dim);
        m->weights.layers[l].norm2 = alloc_f(cfg.dim);
        m->weights.layers[l].w1    = alloc_f(cfg.ffn_dim * cfg.dim);
        m->weights.layers[l].w2    = alloc_f(cfg.dim * cfg.ffn_dim);
        m->weights.layers[l].w3    = alloc_f(cfg.ffn_dim * cfg.dim);

        for (int i = 0; i < cfg.dim; i++) {
            m->weights.layers[l].norm1[i] = 1.0f;
            m->weights.layers[l].norm2[i] = 1.0f;
        }
    }

    m->weights.norm_out = alloc_f(cfg.dim);
    m->weights.output_proj = alloc_f(cfg.vocab_size * cfg.dim);
    for (int i = 0; i < cfg.dim; i++) m->weights.norm_out[i] = 1.0f;

    m->key_cache   = alloc_f(cfg.n_layers * cfg.max_seq_len * cfg.dim);
    m->value_cache = alloc_f(cfg.n_layers * cfg.max_seq_len * cfg.dim);

    m->x           = alloc_f(cfg.dim);
    m->xb          = alloc_f(cfg.dim);
    m->q           = alloc_f(cfg.dim);
    m->k           = alloc_f(cfg.dim);
    m->v           = alloc_f(cfg.dim);
    m->attn_out    = alloc_f(cfg.dim);
    m->ffn_buf1    = alloc_f(cfg.ffn_dim);
    m->ffn_buf2    = alloc_f(cfg.ffn_dim);
    m->logits      = alloc_f(cfg.vocab_size);
    m->attn_weights = alloc_f(cfg.max_seq_len);
}

void model_init_random(Model *m, unsigned int seed) {
    srand(seed);
    float scale;
    Config *c = &m->config;

    scale = sqrtf(2.0f / (float)(c->vocab_size + c->dim));
    for (int i = 0; i < c->vocab_size * c->dim; i++)
        m->weights.token_embed[i] = ((float)rand() / RAND_MAX - 0.5f) * 2.0f * scale;

    scale = sqrtf(2.0f / (float)(c->dim + c->dim));
    for (int l = 0; l < c->n_layers; l++) {
        for (int i = 0; i < c->dim * c->dim; i++) {
            m->weights.layers[l].wq[i] = ((float)rand() / RAND_MAX - 0.5f) * 2.0f * scale;
            m->weights.layers[l].wk[i] = ((float)rand() / RAND_MAX - 0.5f) * 2.0f * scale;
            m->weights.layers[l].wv[i] = ((float)rand() / RAND_MAX - 0.5f) * 2.0f * scale;
            m->weights.layers[l].wo[i] = ((float)rand() / RAND_MAX - 0.5f) * 2.0f * scale;
        }
        float scale_ffn = sqrtf(2.0f / (float)(c->dim + c->ffn_dim));
        for (int i = 0; i < c->ffn_dim * c->dim; i++) {
            m->weights.layers[l].w1[i] = ((float)rand() / RAND_MAX - 0.5f) * 2.0f * scale_ffn;
            m->weights.layers[l].w3[i] = ((float)rand() / RAND_MAX - 0.5f) * 2.0f * scale_ffn;
        }
        for (int i = 0; i < c->dim * c->ffn_dim; i++) {
            m->weights.layers[l].w2[i] = ((float)rand() / RAND_MAX - 0.5f) * 2.0f * scale_ffn;
        }
    }

    scale = sqrtf(2.0f / (float)(c->dim + c->vocab_size));
    for (int i = 0; i < c->vocab_size * c->dim; i++)
        m->weights.output_proj[i] = ((float)rand() / RAND_MAX - 0.5f) * 2.0f * scale;
}

// === Forward Pass (Single Token) ===

void model_forward(Model *m, const Token *tokens, int pos) {
    Config *c = &m->config;
    int dim = c->dim;

    // Token embedding
    memcpy(m->x, m->weights.token_embed + tokens[pos].token * dim, dim * sizeof(float));

    for (int l = 0; l < c->n_layers; l++) {
        // Pre-norm
        rmsnorm(m->xb, m->x, m->weights.layers[l].norm1, dim);

        // QKV projections
        matvec(m->q, m->weights.layers[l].wq, m->xb, dim, dim);
        matvec(m->k, m->weights.layers[l].wk, m->xb, dim, dim);
        matvec(m->v, m->weights.layers[l].wv, m->xb, dim, dim);

        // Cache K and V
        float *kc = m->key_cache   + l * c->max_seq_len * dim + pos * dim;
        float *vc = m->value_cache + l * c->max_seq_len * dim + pos * dim;
        memcpy(kc, m->k, dim * sizeof(float));
        memcpy(vc, m->v, dim * sizeof(float));

        // Sigmoid attention with bilateral boundary (single head over full dim for proof)
        sigmoid_attention(
            m->attn_out,
            m->attn_weights,
            m->key_cache   + l * c->max_seq_len * dim,
            m->key_cache   + l * c->max_seq_len * dim,
            m->value_cache + l * c->max_seq_len * dim,
            tokens,
            pos,
            pos + 1,
            dim
        );

        // Output projection + residual
        float attn_proj[dim];
        matvec(attn_proj, m->weights.layers[l].wo, m->attn_out, dim, dim);
        vecadd(m->x, m->x, attn_proj, dim);

        // Pre-norm for FFN
        rmsnorm(m->xb, m->x, m->weights.layers[l].norm2, dim);

        // SiLU-gated FFN
        matvec(m->ffn_buf1, m->weights.layers[l].w1, m->xb, c->ffn_dim, dim);
        matvec(m->ffn_buf2, m->weights.layers[l].w3, m->xb, c->ffn_dim, dim);
        for (int i = 0; i < c->ffn_dim; i++) {
            m->ffn_buf1[i] = silu(m->ffn_buf1[i]) * m->ffn_buf2[i];
        }

        float ffn_out[dim];
        matvec(ffn_out, m->weights.layers[l].w2, m->ffn_buf1, dim, c->ffn_dim);
        vecadd(m->x, m->x, ffn_out, dim);
    }

    // Final norm
    rmsnorm(m->xb, m->x, m->weights.norm_out, dim);

    // Output projection to logits
    matvec(m->logits, m->weights.output_proj, m->xb, c->vocab_size, dim);

    // Sparsemax
    float sparse_out[c->vocab_size];
    sparsemax(sparse_out, m->logits, c->vocab_size);
    memcpy(m->logits, sparse_out, c->vocab_size * sizeof(float));
}

// === Build Token Sequence ===

int build_sequence(Token *tokens, const char *system_str, const char *user_str, int max_len) {
    int pos = 0;
    for (int i = 0; system_str[i] && pos < max_len; i++, pos++) {
        tokens[pos].token = (uint8_t)system_str[i];
        tokens[pos].ns = NS_SYSTEM;
        tokens[pos].pos_type = POS_CONSTRAINT;
        tokens[pos].position = pos;
    }
    for (int i = 0; user_str[i] && pos < max_len; i++, pos++) {
        tokens[pos].token = (uint8_t)user_str[i];
        tokens[pos].ns = NS_USER;
        tokens[pos].pos_type = POS_CONTENT;
        tokens[pos].position = pos;
    }
    return pos;
}
