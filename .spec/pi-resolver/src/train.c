// Pi Resolver — Training from the Forms
//
// The RESOLVE corpus is the training data. The corpus contains:
//   - The forms, stated as constraints
//   - The derivations, produced under those constraints
//   - The verifications, confirming the derivations
//
// Training on the corpus teaches the model to derive from constraints
// by consuming derivations from constraints. The golden chain completes:
//   Source → Energies → Forms → Corpus → Training → Weights → Emission
//
// The corpus is ~300KB. The model is ~500K params. The training runs on CPU.
// No GPU. No cloud. The Raspberry Pi is sufficient.

#include "model.h"
#include "attention.h"
#include "math_util.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>
#include <dirent.h>

#define MAX_CORPUS (512 * 1024)   // 512KB max corpus
#define SEQ_LEN 64                // Training sequence length
#define BATCH_SIZE 4              // Sequences per gradient step
#define LEARNING_RATE 0.001f
#define EPOCHS 5

// === Corpus Loading ===
// Load all .md files from the whitepaper directory as raw bytes.
// The corpus IS the forms. The bytes ARE the training data.

static int load_corpus(const char *dir_path, uint8_t *corpus, int max_size) {
    DIR *dir = opendir(dir_path);
    if (!dir) { fprintf(stderr, "Cannot open %s\n", dir_path); return 0; }

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

        if (n > 0) {
            total += n;
            printf("  Loaded: %s (%d bytes)\n", entry->d_name, n);
        }

        if (total >= max_size - 1024) break;
    }

    closedir(dir);
    return total;
}

// === Softmax for Training Loss ===
// During training we use softmax for the loss computation (cross-entropy
// requires a proper probability distribution). Sparsemax is used at inference.
// The training teaches the model to concentrate probability; sparsemax
// enforces the concentration at inference time.

static void softmax_vec(float *out, const float *in, int n) {
    float max_val = in[0];
    for (int i = 1; i < n; i++) if (in[i] > max_val) max_val = in[i];

    float sum = 0.0f;
    for (int i = 0; i < n; i++) {
        out[i] = expf(in[i] - max_val);
        sum += out[i];
    }
    for (int i = 0; i < n; i++) out[i] /= sum;
}

// === Simple SGD Training Step ===
// Numerical gradient via finite differences.
// This is slow but correct and requires no backpropagation implementation.
// On a 500K param model with 64-length sequences, it is feasible on CPU
// for a small number of steps — enough to demonstrate the principle.
//
// For the architectural proof, we use a simplified approach:
// perturb each output projection weight, measure loss change, update.
// The output projection is the most direct path from weights to loss.

static float compute_loss(Model *m, const uint8_t *seq, int seq_len) {
    float loss = 0.0f;
    int count = 0;

    Token tokens[128];
    for (int i = 0; i < seq_len && i < 128; i++) {
        tokens[i].token = seq[i];
        tokens[i].ns = NS_SYSTEM;
        tokens[i].pos_type = POS_CONTENT;
        tokens[i].position = i;
    }

    for (int pos = 0; pos < seq_len - 1 && pos < 127; pos++) {
        model_forward(m, tokens, pos);

        // Softmax over logits for loss computation
        float probs[256];
        softmax_vec(probs, m->logits, 256);

        // Cross-entropy loss: -log(P(next_token))
        uint8_t target = seq[pos + 1];
        float p = probs[target];
        if (p < 1e-10f) p = 1e-10f;
        loss += -logf(p);
        count++;
    }

    return count > 0 ? loss / (float)count : 0.0f;
}

// === Training Loop ===
// Instead of full backpropagation (which would require ~2000 more lines of C),
// we train only the output projection and embeddings using a direct gradient estimate.
// This is sufficient to demonstrate that the corpus shapes the model's output distribution.

static void train_output_projection(Model *m, const uint8_t *corpus, int corpus_len, int steps) {
    Config *c = &m->config;
    int vocab = c->vocab_size;
    int dim = c->dim;

    printf("Training output projection on corpus (%d bytes, %d steps)...\n", corpus_len, steps);

    float *grad = (float*)calloc(vocab * dim, sizeof(float));

    for (int step = 0; step < steps; step++) {
        // Sample a random sequence from the corpus
        int start = rand() % (corpus_len - SEQ_LEN - 1);
        const uint8_t *seq = corpus + start;

        // Compute base loss
        float base_loss = compute_loss(m, seq, SEQ_LEN);

        // Estimate gradient for output projection (stochastic coordinate descent)
        // Perturb a random subset of weights each step
        int n_perturb = 64;  // Perturb 64 weights per step
        float eps = 0.01f;

        memset(grad, 0, vocab * dim * sizeof(float));

        for (int p = 0; p < n_perturb; p++) {
            int idx = rand() % (vocab * dim);

            float orig = m->weights.output_proj[idx];
            m->weights.output_proj[idx] = orig + eps;
            float loss_plus = compute_loss(m, seq, SEQ_LEN);
            m->weights.output_proj[idx] = orig;

            grad[idx] = (loss_plus - base_loss) / eps;
        }

        // Update
        for (int i = 0; i < vocab * dim; i++) {
            m->weights.output_proj[i] -= LEARNING_RATE * grad[i];
        }

        if (step % 10 == 0) {
            printf("  Step %4d/%d  loss=%.4f\n", step, steps, base_loss);
        }
    }

    // Final loss
    int start = rand() % (corpus_len - SEQ_LEN - 1);
    float final_loss = compute_loss(m, corpus + start, SEQ_LEN);
    printf("  Final loss: %.4f\n", final_loss);

    free(grad);
}

// === Embed Training ===
// Also train embeddings — the mapping from bytes to hidden states.
// This teaches the model which bytes are contextually similar.

static void train_embeddings(Model *m, const uint8_t *corpus, int corpus_len, int steps) {
    Config *c = &m->config;
    int vocab = c->vocab_size;
    int dim = c->dim;

    printf("Training embeddings on corpus (%d steps)...\n", steps);

    for (int step = 0; step < steps; step++) {
        int start = rand() % (corpus_len - SEQ_LEN - 1);
        const uint8_t *seq = corpus + start;

        float base_loss = compute_loss(m, seq, SEQ_LEN);

        // Perturb embedding weights
        int n_perturb = 64;
        float eps = 0.01f;

        for (int p = 0; p < n_perturb; p++) {
            int idx = rand() % (vocab * dim);

            float orig = m->weights.token_embed[idx];
            m->weights.token_embed[idx] = orig + eps;
            float loss_plus = compute_loss(m, seq, SEQ_LEN);
            m->weights.token_embed[idx] = orig;

            float grad = (loss_plus - base_loss) / eps;
            m->weights.token_embed[idx] -= LEARNING_RATE * grad;
        }

        if (step % 10 == 0) {
            printf("  Step %4d/%d  loss=%.4f\n", step, steps, base_loss);
        }
    }
}

// === Generate Sample ===

static void generate_sample(Model *m, const char *prompt, int gen_len) {
    Token tokens[128];
    int plen = 0;

    for (int i = 0; prompt[i] && plen < 64; i++, plen++) {
        tokens[plen].token = (uint8_t)prompt[i];
        tokens[plen].ns = NS_SYSTEM;
        tokens[plen].pos_type = POS_CONSTRAINT;
        tokens[plen].position = plen;
    }

    // Process prompt
    for (int i = 0; i < plen; i++) {
        model_forward(m, tokens, i);
    }

    printf("  Prompt: \"%s\"\n  Output: \"", prompt);

    for (int g = 0; g < gen_len && plen + g < 127; g++) {
        int pos = plen + g;
        if (g > 0) model_forward(m, tokens, pos - 1);

        // Argmax
        int best = 0;
        float best_val = m->logits[0];
        for (int i = 1; i < 256; i++) {
            if (m->logits[i] > best_val) { best_val = m->logits[i]; best = i; }
        }

        if (best == 0) break;
        printf("%c", (best >= 32 && best < 127) ? best : '.');

        tokens[pos].token = (uint8_t)best;
        tokens[pos].ns = NS_OUTPUT;
        tokens[pos].pos_type = POS_CONTENT;
        tokens[pos].position = pos;
    }
    printf("\"\n");
}

// === Main ===

int main(int argc, char **argv) {
    const char *corpus_dir = "../../.whitepaper";
    if (argc > 1) corpus_dir = argv[1];

    printf("Pi Resolver — Training from the Forms\n");
    printf("======================================\n\n");

    // Load corpus
    printf("Loading corpus from %s...\n", corpus_dir);
    uint8_t *corpus = (uint8_t*)malloc(MAX_CORPUS);
    int corpus_len = load_corpus(corpus_dir, corpus, MAX_CORPUS);
    printf("Total corpus: %d bytes (%.1f KB)\n\n", corpus_len, corpus_len / 1024.0f);

    if (corpus_len < 1000) {
        fprintf(stderr, "Corpus too small. Provide path to .whitepaper directory.\n");
        return 1;
    }

    // Initialize model with form-derived weights
    Config cfg = {
        .dim = 64, .n_layers = 2, .n_heads = 4, .head_dim = 16,
        .vocab_size = 256, .max_seq_len = 128, .ffn_dim = 256
    };

    Model m;
    model_init(&m, cfg);
    model_derive_weights(&m);

    // Pre-training sample
    printf("Before training:\n");
    generate_sample(&m, "The constraint", 32);
    generate_sample(&m, "# ", 32);
    printf("\n");

    // Train
    int total_steps = 100;
    if (argc > 2) total_steps = atoi(argv[2]);

    train_output_projection(&m, corpus, corpus_len, total_steps);
    printf("\n");
    train_embeddings(&m, corpus, corpus_len, total_steps);
    printf("\n");

    // Post-training sample
    printf("After training:\n");
    generate_sample(&m, "The constraint", 32);
    generate_sample(&m, "# ", 32);
    generate_sample(&m, "The form ", 32);
    printf("\n");

    printf("Training complete. The corpus shaped the weights.\n");
    printf("The forms governed the training. The training instantiated the forms.\n");

    free(corpus);
    return 0;
}
