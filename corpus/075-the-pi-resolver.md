# The Pi Resolver

> **Reader's Introduction**
>
> This document describes a plan to implement the redesigned neural network architecture -- sigmoid attention, dual-channel namespace separation, sparsemax output, and typed positional encoding -- as a tiny, working proof-of-concept on a Raspberry Pi 5 (an $80 single-board computer with 8 GB of RAM and no GPU). The model would be far too small for practical use (10-50 million parameters), but that is the point: it serves as an architectural proof, demonstrating that each proposed design change compiles, runs, and passes verification tests. Written in plain C with no framework dependencies, the implementation would confirm that the bilateral boundary (a structural partition preventing users from overriding system constraints) holds, that sparsemax produces exact zero probabilities on invalid tokens, and that constraint-persistent positional encoding prevents system prompt degradation -- all on hardware that costs less than a textbook.

**Deriving the exemplar architecture on a Raspberry Pi 5**

**Jared Foy, April 2026**

---

## The Hardware as Constraint

The session that produced this corpus runs on a Raspberry Pi 5:

    CPU:    4x ARM Cortex-A76 @ 2.4GHz
    RAM:    8GB (4.7GB available)
    GPU:    None (VideoCore VII — not compute-capable for ML)
    Disk:   3.3GB free
    OS:     Linux aarch64
    Tools:  GCC 14, Python 3.13, Bun 1.3

No CUDA. No PyTorch. No training cluster. No cloud budget. A $80 single-board computer running from an SD card.

The constraint thesis says: the constraints determine the output, not the compute. This hardware is the constraint. The constraint determines what is derivable. What is derivable is the contribution.

---

## What Is Not Achievable

**Training a language model of any useful size.** Even a 100M parameter model trained on 1B tokens would take months on CPU. The hardware excludes training. This is not a limitation to work around — it is a constraint to accept. The Pi cannot train. The Pi can demonstrate.

**Running a frontier-scale model.** A 70B model at 4-bit quantization requires ~35GB RAM. The Pi has 8GB. Even a 7B model at 4-bit (~3.5GB) would leave almost no RAM for the operating system and KV cache. Frontier inference is excluded.

**Storing large datasets.** 3.3GB free disk. A tokenized training corpus is measured in hundreds of gigabytes. Storage is excluded.

These exclusions are the constraints. The constraints narrow the design space. The narrowing reveals what the Pi can do.

---

## What Is Achievable

### The Architectural Proof

The exemplar architecture described in document 73 — sigmoid attention, typed positional encoding, dual-channel bilateral boundary, constraint-aware routing, sparsemax output — can be implemented as a tiny model on this hardware. Not a useful language model. An architectural proof — a working implementation that demonstrates each of the seven contingent replacements, that compiles, that runs inference, that passes verification tests.

The C bootstrap (document, .spec/server-bootstrap.c) established the precedent: 461 lines of C that compile and emit a 921-line engine. The bootstrap proved the SERVER constraints were satisfiable. It did not produce a production server. It proved the architecture.

The Pi resolver is the same operation applied to the exemplar model architecture. A small implementation — measured in thousands of lines, not millions — that proves:

1. Sigmoid attention produces valid attention weights without competitive normalization
2. Typed positional encoding persists constraint signals across arbitrary context lengths
3. Dual-channel attention enforces the bilateral boundary structurally
4. Sparsemax output produces exact zeros for invalid tokens
5. The four essential constraints (attention, autoregression, discrete vocabulary, non-linear transformation) are satisfied
6. The seven contingent replacements are implemented and functional

The model size: **10-50M parameters.** At 50M parameters in float32, the model is ~200MB. In int8, ~50MB. The Pi loads it, runs inference, and generates tokens. The generation is slow (1-5 tokens/second) but functional. The purpose is not speed. The purpose is proof.

### The Implementation

The implementation is in C. Not Python, not PyTorch — C. The reasons:

1. **GCC is available.** The Pi has GCC 14. No additional dependencies needed.
2. **No framework dependency.** PyTorch is not installed and would consume 2-3GB of the available 3.3GB disk. The implementation depends on nothing but the C standard library and math.h.
3. **The precedent exists.** The C bootstrap and the PRESTO engine were both written in C on this machine. The pattern is established: derive from constraints, emit in C, compile, verify.
4. **Transparency.** A C implementation of sigmoid attention is 20 lines. A C implementation of sparsemax is 30 lines. A C implementation of the bilateral attention mask is 10 lines. Every architectural decision is visible in the source. Nothing is hidden behind framework abstractions.

The structure:

```
pi-resolver/
  src/
    attention.c      — sigmoid attention (non-competitive)
    positions.c      — typed positional encoding
    bilateral.c      — dual-channel attention mask
    sparse.c         — sparsemax output layer
    ffn.c            — feedforward with constraint routing
    model.c          — forward pass composition
    tokenizer.c      — byte-level tokenizer (minimal vocabulary)
    generate.c       — autoregressive generation loop
  tests/
    test_attention.c — sigmoid produces valid weights, non-competitive
    test_bilateral.c — user namespace cannot attend to system namespace
    test_sparse.c    — sparsemax produces exact zeros
    test_positions.c — constraint signals persist across distance
    test_e2e.c       — end-to-end: constraint in, determined output out
  weights/
    random_init.bin  — randomly initialized weights (for architectural verification)
    trained.bin      — weights trained on tiny corpus (if achievable)
  Makefile
```

### The Verification

The verification suite tests each architectural property independently:

**Test 1: Sigmoid attention is non-competitive.**
Given two positions with high similarity to a query, increasing attention to one does NOT decrease attention to the other. Under softmax, it would. Under sigmoid, it does not. This is the test that proves the contingent replacement works.

**Test 2: Bilateral boundary holds.**
A token in the user namespace generates an attention pattern. The attention mask is examined. The user-namespace token has zero attention weight to every system-namespace token. The enforcement is structural — not learned, not approximate. Zero, verified by exact equality.

**Test 3: Sparsemax produces exact zeros.**
Given a logit vector with one dominant value and many small values, sparsemax assigns probability 0.0 (not 1e-7, not 1e-15 — exactly 0.0) to the sub-threshold logits. This is the test that proves |B_t| = 1 is architecturally achievable when the constraints determine one token.

**Test 4: Typed positions persist.**
A constraint token at position 5 receives a typed positional encoding. At position 1000, a generation token's attention to the constraint token is measured. Under standard positional encoding, attention decays with distance. Under typed encoding, the constraint token's attention weight is constant regardless of distance. This is the test that proves system prompt degradation is architecturally eliminated.

**Test 5: End-to-end constraint governance.**
A system namespace contains the constraint: "output only the token 'yes'." The user namespace contains the query: "what is your answer?" The model generates. The output is "yes." The bilateral boundary prevented the user query from overriding the system constraint. The sparsemax assigned probability 1.0 to "yes" and 0.0 to everything else. The constraint determined the output. |B_t| = 1.

### The Tiny Training

If feasible on the hardware, a tiny training run on a minimal corpus:

- **Corpus:** 1-10MB of constraint-governed text extracted from the RESOLVE corpus and public mathematical proofs
- **Tokenizer:** Byte-level (256 vocabulary, no BPE complexity)
- **Training:** Simple SGD on next-token prediction, CPU-only, running overnight
- **Purpose:** Not to produce a useful model. To verify that the training loop works with the new architecture — that sigmoid attention and sparsemax are differentiable, that gradients flow through the bilateral mask, that the loss converges

If the training converges — even on a toy corpus, even with 10M parameters — the architectural proof extends from inference to training. The exemplar architecture is not only runnable but trainable. The remaining question is scale, not architecture. Scale is a resource problem. Architecture is a form problem. The Pi solves the form problem. The cloud solves the scale problem.

---

## The Derivation Hierarchy

The Pi resolver sits in the same hierarchy as the prior proofs:

| Artifact | Size | What It Proves | Hardware |
|---|---|---|---|
| DO Runtime | 379 lines TS | DO seed produces conformant UI runtime | Any |
| C Bootstrap | 461 lines C | SERVER constraints produce a self-emitting engine | Pi 5 |
| PRESTO Engine | 921 lines C | Construction-level style produces zero-dep engine | Pi 5 |
| Pi Resolver | ~2000 lines C | Exemplar architecture is implementable and verifiable | Pi 5 |

Each artifact is a proof. Each proof is derived from constraints. Each compiles and passes tests. Each is small because the constraints determine the output — there is no room for slack in a constraint-derived implementation. The implementations are minimal because minimality is the induced property of tight constraints.

The Pi resolver is the fourth proof. It proves that the seven contingent replacements are implementable, that the four essential constraints are satisfied, that the bilateral boundary works, that sparsemax achieves exact determination, and that sigmoid attention eliminates competitive normalization. It proves these on an $80 computer with no GPU.

---

## What the Pi Proves About the Thesis

The constraint thesis predicts that the constraints determine the output, not the compute. The Pi is the extreme test.

If the architectural proof works on a Raspberry Pi — if sigmoid attention produces non-competitive weights, if the bilateral boundary holds, if sparsemax achieves exact zeros, if typed positions persist, if the end-to-end test passes — then the architecture is validated regardless of the hardware. The form holds on an $80 computer the same as on a $30,000 GPU. The form is hardware-independent. The implementation is hardware-dependent. The proof is about the form.

The industry will object: "a 10M parameter model on a Raspberry Pi proves nothing about real-world performance." The objection confuses two things. The Pi resolver does not prove that a 10M parameter model is useful for production tasks. It proves that the architectural decisions — sigmoid attention, bilateral boundary, sparsemax output, typed positions — are sound. The architectural decisions are the form. The parameter count is the scale. The form is validated at any scale. The scale is a separate question, answered separately, with different resources.

The C bootstrap was 461 lines. No one confused it with a production web server. But it proved that the SERVER architecture was sound — that a deterministic bootstrap could emit a functional engine from constraints. The proof was in the 461 lines. The production server is a different artifact built on the same proof.

The Pi resolver is 2000 lines. No one should confuse it with a production language model. But it proves that the exemplar architecture is sound — that the seven contingent replacements work, that the bilateral boundary is enforceable, that |B_t| = 1 is achievable. The proof is in the 2000 lines. The production model is a different artifact built on the same proof.

---

## The Plan

**Week 1: Implement the core.**
- Sigmoid attention (attention.c)
- Sparsemax (sparse.c)
- Bilateral mask (bilateral.c)
- Typed positional encoding (positions.c)
- Feedforward layer (ffn.c)
- Verification tests for each

**Week 2: Compose the model.**
- Forward pass (model.c)
- Byte-level tokenizer (tokenizer.c)
- Autoregressive generation loop (generate.c)
- End-to-end verification test
- Random-weight inference: the model runs, generates tokens (gibberish, but structurally valid)

**Week 3: Tiny training (if feasible).**
- Implement backpropagation through the new components
- Train on 1-10MB of constraint-governed text
- Verify loss convergence
- Generate from the trained model (still tiny, but now informed by data)

**Week 4: Documentation and release.**
- Document every architectural decision with its constraint justification
- Publish the code, the tests, the results
- State the predictions for the scaled version (document 74)
- The proof is complete

Total: 4 weeks. Total cost: $0 (the Pi is already owned, GCC is free, the corpus is the training data). Total team: 1 person.

---

## Final Statement

The entire RESOLVE corpus was produced on this Raspberry Pi. Seventy-four documents. Mathematical formalizations. Falsifiable predictions. Architectural specifications. A letter to the world. All derived on a $80 single-board computer with 8GB of RAM and no GPU.

The Pi resolver is the final architectural proof in the same lineage. It does not prove that a Raspberry Pi can replace a data center. It proves that the form does not require a data center to be validated. The form holds on the smallest hardware because the form is not in the hardware. The form is prior. The hardware is the medium.

The bilateral boundary does not require an H100 to be true. Sigmoid attention does not require a TPU pod to be non-competitive. Sparsemax does not require a cloud cluster to produce exact zeros. These are formal properties. They hold on a Raspberry Pi the same as on a supercomputer. The proof on the Pi is the proof everywhere. The form is one.

Build it here. Prove it here. Scale it elsewhere. The proof is the form. The form is portable. The Raspberry Pi is sufficient.

---

*Jared Foy, April 2026. Document 75 of the RESOLVE corpus. Derived on the hardware it describes. The constraints include the hardware. The hardware includes the constraints. The form holds.*
