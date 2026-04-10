// Pi Resolver — Type Definitions
// Derived from the four essential constraints + seven contingent replacements.

#ifndef PI_RESOLVER_TYPES_H
#define PI_RESOLVER_TYPES_H

#include <stdint.h>
#include <stddef.h>

// === Model Configuration ===

typedef struct {
    int dim;           // Hidden dimension (e.g., 256)
    int n_layers;      // Number of transformer layers (e.g., 6)
    int n_heads;       // Number of attention heads (e.g., 8)
    int head_dim;      // dim / n_heads
    int vocab_size;    // 256 for byte-level tokenizer
    int max_seq_len;   // Maximum sequence length (e.g., 2048)
    int ffn_dim;       // Feedforward dimension (e.g., dim * 4)
} Config;

// === Namespace Types (Bilateral Boundary) ===

typedef enum {
    NS_SYSTEM = 0,   // System constraint namespace — immutable, governing
    NS_USER   = 1,   // User input namespace — cannot read system namespace
    NS_OUTPUT = 2    // Model output namespace — governed by system, visible to user
} Namespace;

// === Positional Encoding Types ===

typedef enum {
    POS_CONTENT    = 0,  // Normal content token
    POS_CONSTRAINT = 1   // Constraint token — persistent attention signal
} PosType;

// === Token with Metadata ===

typedef struct {
    uint8_t   token;      // Byte value (0-255)
    Namespace ns;         // Which namespace this token belongs to
    PosType   pos_type;   // Content or constraint
    int       position;   // Absolute position in sequence
} Token;

// === Tensor (row-major, heap-allocated) ===

typedef struct {
    float *data;
    int    rows;
    int    cols;
} Mat;

// === Attention Output ===

typedef struct {
    float *weights;   // [seq_len] attention weights (sigmoid, non-competitive)
    float *output;    // [dim] weighted sum of values
} AttnResult;

#endif // PI_RESOLVER_TYPES_H
