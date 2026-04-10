# Pi Resolver — Session Seed

## Identity

You are working on the Pi Resolver — the exemplar model architecture derived from the RESOLVE corpus. The architecture replaces seven contingent constraints of the standard transformer with principled alternatives while preserving four essential constraints. It compiles and passes 27 verification tests on a Raspberry Pi 5.

## What Exists

The implementation is in `.spec/pi-resolver/`:

- `src/types.h` — Config, Namespace (SYSTEM/USER/OUTPUT), PosType (CONTENT/CONSTRAINT), Token
- `src/math_util.h` — sigmoid, sparsemax, rmsnorm, matvec, silu
- `src/attention.c` — sigmoid attention (non-competitive), bilateral mask (S1), typed positional bias
- `src/model.c` — forward pass: embedding → layers(norm → QKV → sigmoid attention → residual → norm → SiLU FFN → residual) → final norm → output projection → sparsemax
- `src/derive_weights.c` — form-derived weight initialization (four forms: byte semantics, sequential coherence, transformation hierarchy, output distribution)
- `src/train.c` — single-level training via numerical gradient (coordinate-wise perturbation)
- `src/train_recursive.c` — four-level recursive training (frequency → bigrams → boundaries → patterns)
- `src/server.c` — PRESTO HTTP chat server on port 8099
- `tests/test_all.c` — 27 assertions, 0 failures

## Four Essential Constraints (Do Not Change)

1. Attention — long-range dependency
2. Autoregressive generation — sequential B_t narrowing
3. Discrete finite vocabulary — 256 bytes, B_t definable
4. Non-linear transformation — SiLU FFN

## Seven Contingent Replacements (Implemented)

1. Sigmoid attention replaces softmax (non-competitive normalization)
2. Typed positional encoding (constraint tokens don't decay with distance)
3. Dual-channel bilateral boundary (user namespace cannot attend to system namespace)
4. Constraint-aware routing (simplified to single FFN; full MoE is a scale optimization)
5. Sparsemax output (exact zeros; |B_t| = 1 is achievable)
6. Pre-norm RMS (placement contingent, chosen for stability)
7. Residual connections (standard)

## Current State

Architecture: proven, compiled, verified.
Form-derived weights: produce 'e' (most frequent English letter) — the frequency prior works without training.
Corpus training: loss computes and decreases but coordinate-wise numerical gradient cannot escape the dominant mode. The optimization method is itself a constraint — coordinate-wise perturbation induces single-mode convergence.

## What Must Be Done

Implement full backpropagation through the exemplar architecture. The numerical gradient approach (finite differences, 64-256 weights perturbed per step) is too sparse to produce varied output. Full backpropagation updates all weights simultaneously per step, enabling multi-mode convergence.

Specific requirements:
1. Backward pass through sparsemax (Jacobian of the sparsemax projection)
2. Backward pass through sigmoid attention (gradient through non-competitive weights + bilateral mask)
3. Backward pass through SiLU-gated FFN (standard, well-documented)
4. Backward pass through RMS norm (standard)
5. Cross-entropy loss on next-byte prediction
6. Training loop: forward → loss → backward → SGD update, over the RESOLVE corpus (~500KB in `.whitepaper/`)
7. The recursive training structure (Level 0 frequency → Level 1 bigrams → Level 2 boundaries → Level 3 patterns → ...) should be preserved — each level's induced properties become constraints on the next

The M1 MacBook Pro has unified memory and the Accelerate framework. Use these. The model is ~500K parameters at dim=64. It fits trivially in memory. The training should be fast on M1.

## Constraints on Your Work

- Zero external dependencies. C standard library + math.h + Accelerate (optional).
- Do not change the architecture. The forward pass is proven. Implement its backward pass.
- Do not add RLHF. Train with cross-entropy loss on constraint-governed text (the corpus).
- Preserve all existing tests. Add backward-pass verification tests.
- The bilateral mask gradient is zero — the mask is structural, not differentiable. Gradients do not flow across the namespace boundary. This is correct.

## The Corpus as Training Data

The RESOLVE corpus in `.whitepaper/` is the training data. Load all `.md` files as raw bytes. The corpus is the forms stated as constraints and their derivations. Training on it teaches the model the relationship between stated constraints and constraint-satisfying output.

## The Principle

The same SIPE law that built REST → PRESTO → SERVER → RESOLVE → APERTURE applies to training. Each level's induced properties become constraints on the next. The form governs the training. The training instantiates the form. The recursive structure is the architecture applied to itself.

## Success Criterion

After training, the model produces varied, non-monotone output that exhibits recognizable patterns from the corpus — word boundaries, common letter sequences, markdown structure. The output need not be semantically coherent (the model is 500K parameters). It must be structurally valid and demonstrably shaped by the corpus rather than stuck in a single-mode attractor.
