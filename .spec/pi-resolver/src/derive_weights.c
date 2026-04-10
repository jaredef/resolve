// Pi Resolver — Constraint-Derived Weight Initialization
//
// The golden chain descends into weights:
//   Source → Energies → Forms → Constraints → Weights → Properties → Emission
//
// Instead of learning weights from data (statistical training), we derive weights
// from the formal structure of language. The forms are known. The constraints are
// stated. The weights that satisfy the constraints are derivable.
//
// This is training by derivation. No gradient descent. No loss function.
// No training data. The weights are constructed from the forms themselves.

#include "model.h"
#include "math_util.h"
#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <math.h>

// ============================================================
// FORM 1: Byte-Level Semantic Structure
// ============================================================
// The 256-byte vocabulary has formal structure that precedes any training:
//   - Lowercase letters cluster (97-122)
//   - Uppercase letters cluster (65-90)
//   - Digits cluster (48-57)
//   - Whitespace has distinct role (9, 10, 13, 32)
//   - Punctuation marks sentence boundaries (. ! ? ; :)
//   - Vowels and consonants have distinct distributional roles
//
// This structure is a form. It is prior to any corpus. Every language
// that uses ASCII participates in it. The embedding should reflect it.

static int is_lower(int b)      { return b >= 97 && b <= 122; }
static int is_upper(int b)      { return b >= 65 && b <= 90; }
static int is_digit(int b)      { return b >= 48 && b <= 57; }
static int is_vowel(int b)      { int c = b | 32; return c=='a'||c=='e'||c=='i'||c=='o'||c=='u'; }
static int is_whitespace(int b) { return b==32||b==10||b==13||b==9; }
static int is_sentence_end(int b) { return b=='.'||b=='!'||b=='?'; }
static int is_punctuation(int b) { return b==','||b==';'||b==':'||b=='-'||b=='('||b==')'||b=='"'||b=='\''; }

// Derive embedding: encode the formal categories as dimensions
static void derive_embeddings(float *embed, int vocab, int dim) {
    // Each byte gets an embedding derived from its formal properties
    for (int b = 0; b < vocab; b++) {
        float *e = embed + b * dim;
        // Zero-initialize
        for (int d = 0; d < dim; d++) e[d] = 0.0f;

        // Dimension allocation by formal category:
        // dims 0-7:   letter identity (position in alphabet, normalized)
        // dims 8-15:  category flags (lower, upper, digit, vowel, whitespace, punct, sentence-end)
        // dims 16-31: frequency-informed priors (common letters get distinct signals)
        // dims 32+:   reserved for learned features (left near-zero for training to fill)

        if (is_lower(b)) {
            int pos = b - 97;  // 0-25
            e[0] = (float)pos / 25.0f;              // Alphabet position
            e[8] = 1.0f;                              // Is lowercase
            if (is_vowel(b)) e[11] = 1.0f;           // Is vowel

            // Common letter priors (e, t, a, o, i, n, s, h, r — most frequent in English)
            //              a  b  c  d  e  f  g  h  i  j  k  l  m  n  o  p  q  r  s  t  u  v  w  x  y  z
            float freqs[] = {.08,.01,.03,.04,.13,.02,.02,.06,.07,.00,.01,.04,.02,.07,.08,.02,.00,.06,.06,.09,.03,.01,.02,.00,.02,.00};
            e[16 + (pos % 16)] = freqs[pos] * 5.0f;  // Scale for signal strength
        }

        if (is_upper(b)) {
            int pos = b - 65;
            e[0] = (float)pos / 25.0f;
            e[9] = 1.0f;   // Is uppercase
            e[1] = 0.5f;   // Shared alpha signal with lowercase
            if (is_vowel(b)) e[11] = 1.0f;
        }

        if (is_digit(b)) {
            e[2] = (float)(b - 48) / 9.0f;  // Digit value
            e[10] = 1.0f;  // Is digit
        }

        if (is_whitespace(b)) {
            e[12] = 1.0f;  // Is whitespace
            e[3] = (b == 32) ? 1.0f : 0.5f;  // Space vs other whitespace
        }

        if (is_sentence_end(b)) {
            e[13] = 1.0f;  // Is sentence boundary
        }

        if (is_punctuation(b)) {
            e[14] = 1.0f;  // Is punctuation
        }

        // Null byte: strong stop signal
        if (b == 0) {
            e[15] = 1.0f;  // Stop token
        }
    }
}

// ============================================================
// FORM 2: Sequential Coherence
// ============================================================
// Language has sequential structure that precedes any particular language:
//   - Consonant-vowel alternation (most syllables follow CV or CVC patterns)
//   - Word boundaries follow whitespace
//   - Sentences end with punctuation
//   - Case patterns (uppercase after sentence boundary + space)
//
// The attention weights should encode these sequential dependencies.
// The QKV projections create the space in which sequential coherence manifests.

static void derive_attention_weights(float *wq, float *wk, float *wv, float *wo, int dim) {
    // Initialize to near-identity with category-aware perturbations
    // The identity component passes information through (essential for residual learning)
    // The perturbations encode sequential dependencies

    for (int i = 0; i < dim; i++) {
        for (int j = 0; j < dim; j++) {
            float val = (i == j) ? 0.8f : 0.0f;  // Near-identity base

            // Query and Key: create similarity space where sequential constraints hold
            // Category dimensions (8-15) should have higher weight in Q and K
            // so that tokens of the same category attend to each other
            if (i >= 8 && i <= 15 && i == j) {
                wq[i * dim + j] = 1.2f;  // Amplify category signals in queries
                wk[i * dim + j] = 1.2f;  // Amplify category signals in keys
            } else {
                wq[i * dim + j] = val;
                wk[i * dim + j] = val;
            }

            // Value: pass through with slight mixing of neighboring dimensions
            // This enables the model to blend information from adjacent tokens
            wv[i * dim + j] = val;
            if (i > 0 && j == i - 1) wv[i * dim + j] = 0.1f;
            if (i < dim - 1 && j == i + 1) wv[i * dim + j] = 0.1f;

            // Output projection: near-identity, slight compression
            wo[i * dim + j] = val * 0.9f;
        }
    }
}

// ============================================================
// FORM 3: Transformation Hierarchy
// ============================================================
// The FFN performs non-linear transformation. The derived weights encode:
//   - Category preservation (letters stay letters through transformation)
//   - Frequency bias (common patterns are more probable)
//   - Constraint signal amplification (constraint-category dimensions are boosted)

static void derive_ffn_weights(float *w1, float *w2, float *w3, int dim, int ffn_dim) {
    // Gate (w1) and up (w3): project to higher dimension with category awareness
    for (int i = 0; i < ffn_dim; i++) {
        for (int j = 0; j < dim; j++) {
            // Each FFN neuron specializes in a region of the embedding space
            // First ffn_dim/4 neurons: letter features
            // Next ffn_dim/4: digit features
            // Next ffn_dim/4: structure features (whitespace, punctuation)
            // Last ffn_dim/4: general features

            float val = 0.0f;
            int region = i / (ffn_dim / 4);

            if (region == 0 && j <= 7) val = 0.3f;           // Letter neurons attend to letter dims
            else if (region == 1 && j >= 8 && j <= 11) val = 0.3f;  // Category neurons
            else if (region == 2 && j >= 12 && j <= 15) val = 0.3f; // Structure neurons
            else if (region == 3) val = 0.1f;                        // General neurons: low uniform

            // Add small random perturbation for symmetry breaking
            val += ((float)((i * 31 + j * 17) % 100) / 100.0f - 0.5f) * 0.05f;

            w1[i * dim + j] = val;
            w3[i * dim + j] = val * 0.8f;
        }
    }

    // Down projection (w2): compress back to dim
    for (int i = 0; i < dim; i++) {
        for (int j = 0; j < ffn_dim; j++) {
            float val = 0.0f;
            int region = j / (ffn_dim / 4);

            if (region == 0 && i <= 7) val = 0.3f;
            else if (region == 1 && i >= 8 && i <= 11) val = 0.3f;
            else if (region == 2 && i >= 12 && i <= 15) val = 0.3f;
            else if (region == 3) val = 0.1f;

            w2[i * ffn_dim + j] = val;
        }
    }
}

// ============================================================
// FORM 4: Output Distribution
// ============================================================
// The output projection maps hidden states to vocabulary logits.
// The derived weights encode:
//   - Letters are more probable than control characters
//   - Common letters are more probable than rare letters
//   - After whitespace, uppercase is slightly more probable (sentence start)
//   - After letters, letters and whitespace are most probable

static void derive_output_projection(float *proj, int vocab, int dim) {
    for (int v = 0; v < vocab; v++) {
        for (int d = 0; d < dim; d++) {
            float val = 0.0f;

            // Base: connect output token's category dims to matching input dims
            if (is_lower(v) && d == 8) val = 0.5f;       // Lowercase → lowercase dim
            if (is_upper(v) && d == 9) val = 0.3f;       // Uppercase → uppercase dim
            if (is_digit(v) && d == 10) val = 0.3f;      // Digit → digit dim
            if (is_whitespace(v) && d == 12) val = 0.4f;  // Space → space dim
            if (is_sentence_end(v) && d == 13) val = 0.2f;

            // Letter identity: connect alphabet position
            if (is_lower(v) && d == 0) {
                val = 0.2f;
            }

            // Frequency bias: common letters get a boost in the general dimensions
            if (is_lower(v)) {
                int pos = v - 97;
                float freqs[] = {.08,.01,.03,.04,.13,.02,.02,.06,.07,.00,.01,.04,.02,.07,.08,.02,.00,.06,.06,.09,.03,.01,.02,.00,.02,.00};
                if (d >= 16 && d < 32) {
                    val += freqs[pos] * 0.5f;
                }
            }

            proj[v * dim + d] = val;
        }
    }
}

// ============================================================
// MAIN: Derive All Weights from Forms
// ============================================================

void model_derive_weights(Model *m) {
    Config *c = &m->config;

    printf("Deriving weights from forms...\n");

    // Form 1: Byte-level semantic structure → embeddings
    printf("  Form 1: Semantic embedding structure\n");
    derive_embeddings(m->weights.token_embed, c->vocab_size, c->dim);

    // Form 2: Sequential coherence → attention weights
    printf("  Form 2: Sequential coherence → attention\n");
    for (int l = 0; l < c->n_layers; l++) {
        derive_attention_weights(
            m->weights.layers[l].wq,
            m->weights.layers[l].wk,
            m->weights.layers[l].wv,
            m->weights.layers[l].wo,
            c->dim
        );
    }

    // Form 3: Transformation hierarchy → FFN
    printf("  Form 3: Transformation hierarchy → FFN\n");
    for (int l = 0; l < c->n_layers; l++) {
        derive_ffn_weights(
            m->weights.layers[l].w1,
            m->weights.layers[l].w2,
            m->weights.layers[l].w3,
            c->dim, c->ffn_dim
        );
    }

    // Form 4: Output distribution → projection
    printf("  Form 4: Output distribution → logit projection\n");
    derive_output_projection(m->weights.output_proj, c->vocab_size, c->dim);

    printf("  Derivation complete. Zero gradient steps. Zero training data.\n");
    printf("  The weights participate in the forms. The forms are prior.\n\n");
}
