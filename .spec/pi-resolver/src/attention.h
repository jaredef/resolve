#ifndef PI_RESOLVER_ATTENTION_H
#define PI_RESOLVER_ATTENTION_H

#include "types.h"

void sigmoid_attention(
    float *output,
    float *attn_weights,
    const float *queries,
    const float *keys,
    const float *values,
    const Token *tokens,
    int query_pos,
    int seq_len,
    int head_dim
);

#endif
