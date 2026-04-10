#ifndef PI_RESOLVER_MODEL_H
#define PI_RESOLVER_MODEL_H

#include "types.h"

typedef struct {
    float *token_embed;
    struct LayerWeights {
        float *norm1, *wq, *wk, *wv, *wo, *norm2, *w1, *w2, *w3;
    } *layers;
    float *norm_out;
    float *output_proj;
} Weights;

typedef struct {
    Config config;
    Weights weights;
    float *key_cache;
    float *value_cache;
    float *x, *xb, *q, *k, *v, *attn_out;
    float *ffn_buf1, *ffn_buf2;
    float *logits;
    float *attn_weights;
} Model;

void model_init(Model *m, Config cfg);
void model_init_random(Model *m, unsigned int seed);
void model_forward(Model *m, const Token *tokens, int pos);

int build_sequence(Token *tokens, const char *system_str, const char *user_str, int max_len);
int generate(Model *m, Token *tokens, int prompt_len, int max_gen, int verbose);
void model_derive_weights(Model *m);

#endif
