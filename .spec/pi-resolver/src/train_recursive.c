// Pi Resolver — Recursive Training from the Resolution Stack
//
// The SIPE law applied to training itself:
//   Constraints induce properties.
//   Induced properties become constraints on the next level.
//
// Just as REST → PRESTO → SERVER → RESOLVE → APERTURE,
// the training proceeds:
//   Level 0: Frequency → byte distribution matches English
//   Level 1: Bigrams → what follows what (context-dependent distribution)
//   Level 2: Boundaries → word/sentence structure emerges
//   Level 3: Patterns → common sequences and phrases
//   Level 4: Constraints → constraint-governed output
//
// Each level inherits the prior level's induced properties as constraints.
// Each level adds one new form. The model does not learn everything from
// scratch — it learns each level's new constraints while maintaining
// the prior levels' properties.
//
// This is progressive constraint narrowing applied to weight optimization.

#include "model.h"
#include "attention.h"
#include "math_util.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>
#include <dirent.h>

#define MAX_CORPUS (512 * 1024)
#define SEQ_LEN 64

// === Corpus Loading ===

static int load_corpus(const char *dir_path, uint8_t *corpus, int max_size) {
    DIR *dir = opendir(dir_path);
    if (!dir) return 0;
    int total = 0;
    struct dirent *entry;
    while ((entry = readdir(dir)) != NULL) {
        int len = strlen(entry->d_name);
        if (len < 4 || strcmp(entry->d_name + len - 3, ".md") != 0) continue;
        char path[512];
        snprintf(path, sizeof(path), "%s/%s", dir_path, entry->d_name);
        FILE *f = fopen(path, "rb");
        if (!f) continue;
        int n = fread(corpus + total, 1, max_size - total, f);
        fclose(f);
        if (n > 0) total += n;
        if (total >= max_size - 1024) break;
    }
    closedir(dir);
    return total;
}

// === Softmax for loss ===

static void softmax_vec(float *out, const float *in, int n) {
    float mx = in[0];
    for (int i = 1; i < n; i++) if (in[i] > mx) mx = in[i];
    float s = 0;
    for (int i = 0; i < n; i++) { out[i] = expf(in[i] - mx); s += out[i]; }
    for (int i = 0; i < n; i++) out[i] /= s;
}

// === Compute Loss on a Sequence ===

static float compute_loss(Model *m, const uint8_t *seq, int len) {
    Token tokens[128];
    for (int i = 0; i < len && i < 128; i++) {
        tokens[i].token = seq[i];
        tokens[i].ns = NS_SYSTEM;
        tokens[i].pos_type = POS_CONTENT;
        tokens[i].position = i;
    }
    float loss = 0;
    int count = 0;
    for (int pos = 0; pos < len - 1 && pos < 127; pos++) {
        model_forward(m, tokens, pos);
        float probs[256];
        softmax_vec(probs, m->logits, 256);
        float p = probs[seq[pos + 1]];
        if (p < 1e-10f) p = 1e-10f;
        loss += -logf(p);
        count++;
    }
    return count > 0 ? loss / count : 0;
}

// === Generate Sample ===

static void gen_sample(Model *m, const char *prompt, int gen_len) {
    Token tokens[128];
    int plen = 0;
    for (int i = 0; prompt[i] && plen < 60; i++, plen++) {
        tokens[plen] = (Token){(uint8_t)prompt[i], NS_SYSTEM, POS_CONSTRAINT, plen};
    }
    for (int i = 0; i < plen; i++) model_forward(m, tokens, i);

    printf("\"");
    for (int g = 0; g < gen_len; g++) {
        int pos = plen + g;
        if (pos >= 127) break;
        if (g > 0) model_forward(m, tokens, pos - 1);
        int best = 0;
        float bv = m->logits[0];
        for (int i = 1; i < 256; i++) if (m->logits[i] > bv) { bv = m->logits[i]; best = i; }
        if (best == 0) break;
        printf("%c", (best >= 32 && best < 127) ? best : '.');
        tokens[pos] = (Token){(uint8_t)best, NS_OUTPUT, POS_CONTENT, pos};
    }
    printf("\"");
}

// ============================================================
// LEVEL 0: Frequency Distribution
// ============================================================
// Constraint: the output byte distribution should match the corpus byte distribution.
// Form: English letter frequencies are formal properties of the language.
// Method: adjust output projection biases to match observed frequencies.
// Induced property: the model emits bytes in proportion to their corpus frequency.

static void train_level_0(Model *m, const uint8_t *corpus, int corpus_len) {
    printf("Level 0: Frequency Distribution\n");
    printf("  Constraint: output distribution matches corpus byte frequency\n");
    printf("  Form: letter frequencies are prior to any particular text\n\n");

    // Count byte frequencies in corpus
    int counts[256] = {0};
    for (int i = 0; i < corpus_len; i++) counts[corpus[i]]++;

    // Compute log-frequency bias for output projection
    // Adjust the bias of each output token proportional to its log-frequency
    int dim = m->config.dim;
    for (int v = 0; v < 256; v++) {
        float freq = (float)counts[v] / (float)corpus_len;
        if (freq < 1e-8f) freq = 1e-8f;
        float log_freq = logf(freq);

        // Add frequency bias across all dimensions of the output projection row
        // This shifts the logit for this token proportional to its corpus frequency
        for (int d = 0; d < dim; d++) {
            m->weights.output_proj[v * dim + d] += log_freq * 0.1f;
        }
    }

    // Verify: what does the model emit now?
    printf("  After Level 0: ");
    gen_sample(m, "The ", 40);
    printf("\n");

    // Check top-5 tokens by logit after a sample forward pass
    Token test[4] = {
        {(uint8_t)'T', NS_SYSTEM, POS_CONTENT, 0},
        {(uint8_t)'h', NS_SYSTEM, POS_CONTENT, 1},
        {(uint8_t)'e', NS_SYSTEM, POS_CONTENT, 2},
        {(uint8_t)' ', NS_SYSTEM, POS_CONTENT, 3},
    };
    model_forward(m, test, 3);

    // Find top 5
    int top[5] = {0,1,2,3,4};
    for (int i = 0; i < 256; i++) {
        for (int t = 0; t < 5; t++) {
            if (m->logits[i] > m->logits[top[t]]) {
                for (int s = 4; s > t; s--) top[s] = top[s-1];
                top[t] = i;
                break;
            }
        }
    }
    printf("  Top 5 after 'The ': ");
    for (int t = 0; t < 5; t++) {
        int b = top[t];
        printf("'%c'(%.3f) ", (b >= 32 && b < 127) ? b : '.', m->logits[b]);
    }
    printf("\n\n");
}

// ============================================================
// LEVEL 1: Bigram Structure
// ============================================================
// Constraint: the probability of byte B following byte A should match the corpus.
// Form: bigram patterns are formal properties of English orthography.
// Induced property: context-dependent output — what follows depends on what preceded.
// This is the level that breaks the monotone mode.

static void train_level_1(Model *m, const uint8_t *corpus, int corpus_len, int steps) {
    printf("Level 1: Bigram Structure\n");
    printf("  Constraint: P(b|a) matches corpus bigram frequencies\n");
    printf("  Form: bigram patterns are prior to any particular sentence\n");
    printf("  This level inherits Level 0's frequency distribution as a constraint\n\n");

    int dim = m->config.dim;

    // Count bigrams
    int bigram[256][256];
    memset(bigram, 0, sizeof(bigram));
    for (int i = 0; i < corpus_len - 1; i++) {
        bigram[corpus[i]][corpus[i+1]]++;
    }

    // For each byte A, compute the conditional distribution P(B|A)
    // Encode this into the embedding-to-output relationship:
    // When byte A is in context, the output projection should favor bytes
    // that frequently follow A.
    //
    // Method: for each byte A, find the top-K followers and strengthen
    // the connection between A's embedding dimensions and those followers'
    // output projection rows.

    for (int a = 0; a < 256; a++) {
        // Count total bigrams starting with a
        int total = 0;
        for (int b = 0; b < 256; b++) total += bigram[a][b];
        if (total < 10) continue;  // Skip rare bytes

        // Find top 10 followers
        int top[10];
        for (int t = 0; t < 10; t++) top[t] = 0;
        for (int b = 0; b < 256; b++) {
            for (int t = 0; t < 10; t++) {
                if (bigram[a][b] > bigram[a][top[t]]) {
                    for (int s = 9; s > t; s--) top[s] = top[s-1];
                    top[t] = b;
                    break;
                }
            }
        }

        // Strengthen the connection: when A's embedding features are active,
        // the output should favor A's top followers.
        // We do this by making A's embedding and its followers' output projections
        // share signal in specific dimensions.

        // Use dimensions 32-47 for bigram signals (beyond the category dims 0-31)
        int sig_dim = 32 + (a % 16);  // Each byte uses a dimension based on its value mod 16

        // Strengthen A's embedding in this dimension
        m->weights.token_embed[a * dim + sig_dim] += 0.5f;

        // Strengthen top followers' output projection in this dimension
        for (int t = 0; t < 10; t++) {
            int b = top[t];
            float p = (float)bigram[a][b] / (float)total;
            m->weights.output_proj[b * dim + sig_dim] += p * 2.0f;
        }
    }

    // Fine-tune with gradient steps to refine the bigram encoding
    printf("  Fine-tuning with %d gradient steps...\n", steps);
    float lr = 0.005f;

    for (int step = 0; step < steps; step++) {
        int start = rand() % (corpus_len - SEQ_LEN - 1);
        float base_loss = compute_loss(m, corpus + start, SEQ_LEN);

        // Perturb output projection — more weights per step than Level 0
        int n_perturb = 256;
        float eps = 0.005f;

        for (int p = 0; p < n_perturb; p++) {
            int idx = rand() % (256 * dim);
            float orig = m->weights.output_proj[idx];
            m->weights.output_proj[idx] = orig + eps;
            float lp = compute_loss(m, corpus + start, SEQ_LEN);
            m->weights.output_proj[idx] = orig;
            float grad = (lp - base_loss) / eps;
            m->weights.output_proj[idx] -= lr * grad;
        }

        // Also perturb embeddings
        for (int p = 0; p < n_perturb; p++) {
            int idx = rand() % (256 * dim);
            float orig = m->weights.token_embed[idx];
            m->weights.token_embed[idx] = orig + eps;
            float lp = compute_loss(m, corpus + start, SEQ_LEN);
            m->weights.token_embed[idx] = orig;
            float grad = (lp - base_loss) / eps;
            m->weights.token_embed[idx] -= lr * grad;
        }

        if (step % 50 == 0) {
            printf("  Step %4d/%d  loss=%.4f  sample: ", step, steps, base_loss);
            gen_sample(m, "The ", 20);
            printf("\n");
        }
    }

    float final_loss = compute_loss(m, corpus, SEQ_LEN);
    printf("  Final loss: %.4f\n", final_loss);
    printf("  After Level 1: ");
    gen_sample(m, "The ", 40);
    printf("\n\n");
}

// ============================================================
// LEVEL 2: Boundary Structure
// ============================================================
// Constraint: whitespace and punctuation follow word/sentence patterns.
// Form: word boundaries and sentence boundaries are formal properties.
// Inherited: Level 0 frequency + Level 1 bigram structure.
// Induced property: output contains spaces and punctuation in plausible positions.

static void train_level_2(Model *m, const uint8_t *corpus, int corpus_len, int steps) {
    printf("Level 2: Boundary Structure\n");
    printf("  Constraint: word/sentence boundaries follow corpus patterns\n");
    printf("  Inherits: Level 0 frequency + Level 1 bigrams\n\n");

    int dim = m->config.dim;

    // Compute word length distribution from corpus
    int word_lengths[32] = {0};
    int wl = 0;
    for (int i = 0; i < corpus_len; i++) {
        if (corpus[i] == ' ' || corpus[i] == '\n' || corpus[i] == '\t') {
            if (wl > 0 && wl < 32) word_lengths[wl]++;
            wl = 0;
        } else {
            wl++;
        }
    }

    // Most common word lengths: 2-5 characters
    // Encode: after N consecutive non-space characters, boost space probability
    // Use attention weights to encode this — the attention layer can count
    // consecutive non-space characters and boost space when threshold is reached

    // Simpler approach: strengthen the connection between letter→space transitions
    // in the output projection for dimensions that carry "word length" signal

    // Use dim 48-55 for boundary signals
    for (int d = 48; d < 56 && d < dim; d++) {
        // Boost space output in boundary dimensions
        m->weights.output_proj[' ' * dim + d] += 0.3f;
        m->weights.output_proj['\n' * dim + d] += 0.2f;

        // Boost common sentence-end → space patterns
        m->weights.output_proj['.' * dim + d] += 0.2f;
        m->weights.output_proj[',' * dim + d] += 0.15f;
    }

    // Fine-tune
    printf("  Fine-tuning with %d gradient steps...\n", steps);
    float lr = 0.003f;
    float eps = 0.005f;
    int n_perturb = 256;

    for (int step = 0; step < steps; step++) {
        int start = rand() % (corpus_len - SEQ_LEN - 1);
        float base_loss = compute_loss(m, corpus + start, SEQ_LEN);

        for (int p = 0; p < n_perturb; p++) {
            int idx = rand() % (256 * dim);
            float orig = m->weights.output_proj[idx];
            m->weights.output_proj[idx] = orig + eps;
            float lp = compute_loss(m, corpus + start, SEQ_LEN);
            m->weights.output_proj[idx] = orig;
            m->weights.output_proj[idx] -= lr * ((lp - base_loss) / eps);
        }

        for (int p = 0; p < n_perturb; p++) {
            int idx = rand() % (256 * dim);
            float orig = m->weights.token_embed[idx];
            m->weights.token_embed[idx] = orig + eps;
            float lp = compute_loss(m, corpus + start, SEQ_LEN);
            m->weights.token_embed[idx] = orig;
            m->weights.token_embed[idx] -= lr * ((lp - base_loss) / eps);
        }

        if (step % 50 == 0) {
            printf("  Step %4d/%d  loss=%.4f  sample: ", step, steps, base_loss);
            gen_sample(m, "The ", 20);
            printf("\n");
        }
    }

    printf("  After Level 2: ");
    gen_sample(m, "The ", 40);
    printf("\n");
    gen_sample(m, "# ", 40);
    printf("\n\n");
}

// ============================================================
// LEVEL 3: Pattern Structure
// ============================================================
// Constraint: common multi-byte sequences from the corpus are reproduced.
// Form: words and phrases are formal units of language.
// Inherited: Levels 0-2.
// Induced property: recognizable word fragments and short phrases appear.

static void train_level_3(Model *m, const uint8_t *corpus, int corpus_len, int steps) {
    printf("Level 3: Pattern Structure\n");
    printf("  Constraint: common sequences from the corpus are reproduced\n");
    printf("  Inherits: Levels 0-2\n\n");

    // This level trains more aggressively on the corpus
    // focusing on attention weights (layers 0 and 1) which govern
    // how context influences the output

    int dim = m->config.dim;
    float lr = 0.002f;
    float eps = 0.005f;
    int n_perturb = 128;

    printf("  Training attention weights (%d steps)...\n", steps);

    for (int step = 0; step < steps; step++) {
        int start = rand() % (corpus_len - SEQ_LEN - 1);
        float base_loss = compute_loss(m, corpus + start, SEQ_LEN);

        // Perturb attention weights (wq, wk, wv, wo) in layer 0
        for (int p = 0; p < n_perturb; p++) {
            // Randomly choose which weight matrix to perturb
            float *mat;
            int mat_choice = rand() % 4;
            if (mat_choice == 0) mat = m->weights.layers[0].wq;
            else if (mat_choice == 1) mat = m->weights.layers[0].wk;
            else if (mat_choice == 2) mat = m->weights.layers[0].wv;
            else mat = m->weights.layers[0].wo;

            int idx = rand() % (dim * dim);
            float orig = mat[idx];
            mat[idx] = orig + eps;
            float lp = compute_loss(m, corpus + start, SEQ_LEN);
            mat[idx] = orig;
            mat[idx] -= lr * ((lp - base_loss) / eps);
        }

        // Also perturb FFN weights
        for (int p = 0; p < n_perturb / 2; p++) {
            int ffn_dim = m->config.ffn_dim;
            int mat_choice = rand() % 3;
            float *mat;
            int size;
            if (mat_choice == 0) { mat = m->weights.layers[0].w1; size = ffn_dim * dim; }
            else if (mat_choice == 1) { mat = m->weights.layers[0].w2; size = dim * ffn_dim; }
            else { mat = m->weights.layers[0].w3; size = ffn_dim * dim; }

            int idx = rand() % size;
            float orig = mat[idx];
            mat[idx] = orig + eps;
            float lp = compute_loss(m, corpus + start, SEQ_LEN);
            mat[idx] = orig;
            mat[idx] -= lr * ((lp - base_loss) / eps);
        }

        if (step % 50 == 0) {
            printf("  Step %4d/%d  loss=%.4f  sample: ", step, steps, base_loss);
            gen_sample(m, "The ", 20);
            printf("\n");
        }
    }

    printf("  After Level 3: ");
    gen_sample(m, "The ", 40);
    printf("\n");
    gen_sample(m, "The constraint ", 40);
    printf("\n");
    gen_sample(m, "## ", 40);
    printf("\n\n");
}

// ============================================================
// MAIN
// ============================================================

int main(int argc, char **argv) {
    const char *corpus_dir = "../../.whitepaper";
    int steps_per_level = 200;
    if (argc > 1) corpus_dir = argv[1];
    if (argc > 2) steps_per_level = atoi(argv[2]);

    printf("Pi Resolver — Recursive Training from the Resolution Stack\n");
    printf("===========================================================\n\n");

    uint8_t *corpus = (uint8_t*)malloc(MAX_CORPUS);
    int corpus_len = load_corpus(corpus_dir, corpus, MAX_CORPUS);
    printf("Corpus: %d bytes (%.1f KB)\n\n", corpus_len, corpus_len / 1024.0f);

    if (corpus_len < 1000) {
        fprintf(stderr, "Corpus too small.\n");
        return 1;
    }

    Config cfg = {
        .dim = 64, .n_layers = 2, .n_heads = 4, .head_dim = 16,
        .vocab_size = 256, .max_seq_len = 128, .ffn_dim = 256
    };

    Model m;
    model_init(&m, cfg);
    model_derive_weights(&m);

    printf("Before any training:\n  ");
    gen_sample(&m, "The ", 40);
    printf("\n\n");

    // The resolution stack of training:
    // Each level's induced properties become constraints on the next.
    train_level_0(&m, corpus, corpus_len);
    train_level_1(&m, corpus, corpus_len, steps_per_level);
    train_level_2(&m, corpus, corpus_len, steps_per_level);
    train_level_3(&m, corpus, corpus_len, steps_per_level);

    printf("===========================================================\n");
    printf("Final samples after all levels:\n\n");
    gen_sample(&m, "The ", 60);
    printf("\n");
    gen_sample(&m, "# ", 60);
    printf("\n");
    gen_sample(&m, "The form ", 60);
    printf("\n");
    gen_sample(&m, "constraint", 60);
    printf("\n");
    printf("\n===========================================================\n");
    printf("The resolution stack of training:\n");
    printf("  Level 0: Frequency       — byte distribution matches English\n");
    printf("  Level 1: Bigrams         — what follows what (inherited: Level 0)\n");
    printf("  Level 2: Boundaries      — word/sentence structure (inherited: 0-1)\n");
    printf("  Level 3: Patterns        — sequences and context (inherited: 0-2)\n");
    printf("  Each level's induced properties constrained the next.\n");
    printf("  The same law that built REST→PRESTO→SERVER→RESOLVE→APERTURE\n");
    printf("  built the training stack. The form governs all the way down.\n");

    free(corpus);
    return 0;
}
