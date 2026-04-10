// Pi Resolver — Math Utilities
// Pure functions. No state. No allocation.

#ifndef PI_RESOLVER_MATH_H
#define PI_RESOLVER_MATH_H

#include <math.h>
#include <string.h>

// === Sigmoid (non-competitive activation for attention) ===

static inline float sigmoid(float x) {
    return 1.0f / (1.0f + expf(-x));
}

// === Sparsemax ===
// Projects a vector onto the probability simplex with exact zeros.
// Unlike softmax, sparsemax assigns exactly 0.0 to sub-threshold elements.
// Algorithm: Martins & Astudillo 2016

static inline void sparsemax(float *out, const float *in, int n) {
    // Sort indices by value (descending) — simple insertion sort for small n
    int idx[n];
    for (int i = 0; i < n; i++) idx[i] = i;
    for (int i = 1; i < n; i++) {
        int j = i;
        while (j > 0 && in[idx[j]] > in[idx[j-1]]) {
            int tmp = idx[j]; idx[j] = idx[j-1]; idx[j-1] = tmp;
            j--;
        }
    }

    // Find the threshold k (support size)
    float cumsum = 0.0f;
    int k = 0;
    for (int i = 0; i < n; i++) {
        cumsum += in[idx[i]];
        if (1.0f + (float)(i + 1) * in[idx[i]] > cumsum) {
            k = i + 1;
        }
    }

    // Compute threshold tau
    float tau_sum = 0.0f;
    for (int i = 0; i < k; i++) tau_sum += in[idx[i]];
    float tau = (tau_sum - 1.0f) / (float)k;

    // Project
    for (int i = 0; i < n; i++) {
        out[i] = in[i] - tau;
        if (out[i] < 0.0f) out[i] = 0.0f;  // Exact zero
    }
}

// === RMS Layer Normalization ===

static inline void rmsnorm(float *out, const float *x, const float *weight, int n) {
    float ss = 0.0f;
    for (int i = 0; i < n; i++) ss += x[i] * x[i];
    ss = 1.0f / sqrtf(ss / (float)n + 1e-6f);
    for (int i = 0; i < n; i++) out[i] = x[i] * ss * weight[i];
}

// === Matrix-Vector Multiply ===
// out[rows] = mat[rows x cols] @ vec[cols]

static inline void matvec(float *out, const float *mat, const float *vec, int rows, int cols) {
    for (int i = 0; i < rows; i++) {
        float sum = 0.0f;
        const float *row = mat + i * cols;
        for (int j = 0; j < cols; j++) sum += row[j] * vec[j];
        out[i] = sum;
    }
}

// === Element-wise Add ===

static inline void vecadd(float *out, const float *a, const float *b, int n) {
    for (int i = 0; i < n; i++) out[i] = a[i] + b[i];
}

// === SiLU Activation (for FFN) ===

static inline float silu(float x) {
    return x * sigmoid(x);
}

#endif // PI_RESOLVER_MATH_H
