// Pi Resolver — Autoregressive Generation
//
// Essential constraint #2: Sequential generation.
// Each token is conditioned on all preceding tokens.
// B_t is defined at each position given the tokens already emitted.
// The generation loop is the physical substrate of progressive constraint narrowing.

#include "types.h"
#include "math_util.h"
#include <stdlib.h>
#include <stdio.h>
#include <string.h>

// External: defined in model.c
extern void model_init(Model *m, Config cfg);
extern void model_init_random(Model *m, unsigned int seed);
extern void model_forward(Model *m, const Token *tokens, int pos);

// === Token Selection ===
// After sparsemax, logits contain exact zeros for invalid tokens.
// Select the token with highest weight (argmax over the sparse distribution).

static int select_token(const float *logits, int vocab_size) {
    int best = 0;
    float best_val = logits[0];
    for (int i = 1; i < vocab_size; i++) {
        if (logits[i] > best_val) {
            best_val = logits[i];
            best = i;
        }
    }
    return best;
}

// === Count Non-Zero Logits ===
// Measures |B_t| — the branching set cardinality at the current position.

static int count_nonzero(const float *logits, int vocab_size) {
    int count = 0;
    for (int i = 0; i < vocab_size; i++) {
        if (logits[i] > 0.0f) count++;
    }
    return count;
}

// === Generate ===

int generate(
    Model *m,
    Token *tokens,         // Pre-filled with system + user tokens
    int prompt_len,        // Number of tokens already in the sequence
    int max_gen,           // Maximum tokens to generate
    int verbose            // Print |B_t| at each position
) {
    int pos = prompt_len;
    int total = prompt_len + max_gen;
    if (total > m->config.max_seq_len) total = m->config.max_seq_len;

    // Process prompt (fill KV cache)
    for (int i = 0; i < prompt_len; i++) {
        model_forward(m, tokens, i);
    }

    // Generate
    for (; pos < total; pos++) {
        model_forward(m, tokens, pos - 1);

        int bt = count_nonzero(m->logits, m->config.vocab_size);
        int next = select_token(m->logits, m->config.vocab_size);

        if (verbose) {
            printf("  pos %3d: token=%3d ('%c')  |B_t|=%d\n",
                   pos, next, (next >= 32 && next < 127) ? next : '.', bt);
        }

        // Emit the token
        tokens[pos].token = (uint8_t)next;
        tokens[pos].ns = NS_OUTPUT;
        tokens[pos].pos_type = POS_CONTENT;
        tokens[pos].position = pos;

        // Stop on null byte
        if (next == 0) break;
    }

    return pos - prompt_len;  // Number of tokens generated
}

// === Build Token Sequence from Strings ===

int build_sequence(
    Token *tokens,
    const char *system_str,    // System namespace constraints
    const char *user_str,      // User namespace input
    int max_len
) {
    int pos = 0;

    // System namespace tokens (constraint-persistent)
    for (int i = 0; system_str[i] && pos < max_len; i++, pos++) {
        tokens[pos].token = (uint8_t)system_str[i];
        tokens[pos].ns = NS_SYSTEM;
        tokens[pos].pos_type = POS_CONSTRAINT;
        tokens[pos].position = pos;
    }

    // User namespace tokens (content)
    for (int i = 0; user_str[i] && pos < max_len; i++, pos++) {
        tokens[pos].token = (uint8_t)user_str[i];
        tokens[pos].ns = NS_USER;
        tokens[pos].pos_type = POS_CONTENT;
        tokens[pos].position = pos;
    }

    return pos;
}
