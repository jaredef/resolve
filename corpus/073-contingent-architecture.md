# Contingent Architecture

> **Reader's Introduction**
>
> This document applies the distinction between "necessary" and "contingent" to the design of the transformer -- the neural network architecture underlying all major language models. A necessary constraint is one whose removal destroys an essential capability; a contingent constraint is an inherited engineering choice that could be replaced without loss. The analysis identifies four necessary constraints (attention for long-range token relationships, autoregressive generation, a finite vocabulary, and non-linear transformation) and seven contingent ones (including softmax normalization, fixed projection dimensions, and the smooth output distribution). For each contingent choice, the document explains what it prevents -- for instance, softmax's competitive normalization forces constraint tokens to compete with noise for attention, causing system prompt degradation over long contexts -- and proposes a replacement optimized for constraint-governed output. The result is a blueprint for an "exemplar model" designed from first principles for faithfulness to stated rules.

**On the unnecessary constraints in neural network design and what their removal would produce**

---

## The Question

The transformer architecture — the foundation of every frontier language model — was introduced in 2017 by Vaswani et al. in "Attention Is All You Need." The paper proposed a specific arrangement of components: multi-head self-attention, feedforward layers, layer normalization, residual connections, positional encoding, softmax attention, key-query-value projections, sinusoidal position signals. These components were assembled to solve a specific problem (machine translation) and were adopted, with modifications, as the foundation of every subsequent language model.

The question the SIPE framework compels: **which of these architectural choices are necessary constraints that induce essential properties, and which are contingent choices that could be otherwise without loss?**

A necessary constraint is one whose removal degrades or destroys an essential property. A contingent constraint is one whose removal changes the implementation without destroying the induced property — or one that induces no essential property at all. The distinction is R2 (essential-contingent separation) applied to the architecture itself.

If there are contingent constraints in the transformer, they are candidates for removal. Their removal simplifies the architecture, reduces the parameter count, reduces the compute requirement, and — most importantly — may remove sources of anti-constraint distortion that prevent the model from reaching |B_t| = 1 under governance.

---

## The Essential Constraints

### Attention

Attention is the mechanism by which the model relates tokens to each other across positions. At its core, attention computes a weighted sum of value vectors, where the weights are determined by the similarity between query and key vectors:

    Attention(Q, K, V) = softmax(QK^T / √d) V

**Is attention essential?** Yes. The induced property is: the model can relate any token to any other token regardless of distance. Without this property, the model cannot process long-range dependencies — a constraint stated at position 1 cannot influence generation at position 1000. Attention is the mechanism through which constraints in the context govern generation at distant positions. It is the physical substrate of B_t governance. Without it, B_t(Γ) cannot be approximated because the constraint tokens cannot influence the generation tokens.

**Conclusion:** Attention is a necessary constraint. It induces long-range dependency, which is essential for constraint governance.

### Autoregressive Generation

The model generates tokens one at a time, left to right. Each token is conditioned on all preceding tokens. The generation is sequential.

**Is autoregressive generation essential?** For the property of coherent sequential text — yes. The autoregressive structure ensures that each token is constrained by its predecessors. The B_t framework depends on this: B_t is defined at each position given the tokens already emitted. Without autoregressive generation, there is no sequential narrowing — no progressive constraint satisfaction across positions.

Alternative architectures (diffusion over text, parallel generation with iterative refinement) produce text without strict left-to-right sequencing. These may induce coherence through different mechanisms, but they would require a different formal account of B_t — one defined over iterative refinement steps rather than sequential positions.

**Conclusion:** Autoregressive generation is necessary for sequential B_t governance. Alternative generation strategies may be viable but require a different formal framework.

### The Vocabulary

The model operates over a fixed vocabulary V — a finite set of tokens (subwords, characters, or bytes) into which all text is encoded. The vocabulary is determined before training and is fixed thereafter.

**Is a fixed vocabulary essential?** The essential property is: the model must produce discrete symbols from a finite set. Without discreteness, the model's output is a continuous vector, not text. Without finiteness, B_t is undefined (the branching set is infinite). The fixed vocabulary induces both properties.

But the specific vocabulary — the particular tokenization scheme, the particular subword splits — is contingent. BPE (Byte Pair Encoding), SentencePiece, character-level, byte-level — each produces a different V with different properties. The choice of tokenization affects the model's behavior in subtle ways: which concepts are atomic (single tokens) vs. composite (multiple tokens), how mathematical notation is encoded, how code is segmented. These effects are contingent on the tokenization choice, not on the essential constraint (discrete finite output).

**Conclusion:** A discrete finite vocabulary is essential. The specific tokenization scheme is contingent.

---

## The Contingent Constraints

### Softmax Attention

The standard attention mechanism uses softmax to normalize the attention weights:

    α_ij = exp(q_i · k_j / √d) / Σ_l exp(q_i · k_l / √d)

Softmax ensures that attention weights sum to 1 — each position distributes exactly one unit of attention across all other positions. This is a normalization choice, not a logical necessity.

**Why it is contingent:** The essential property of attention is long-range dependency — tokens can influence each other across distance. Softmax is one way to compute the influence weights. Other normalizations — ReLU attention, linear attention, sigmoid attention — also compute influence weights without the softmax constraint.

**What softmax induces that may be unnecessary or harmful:**

1. **Competition.** Softmax is a competitive normalization. Increasing attention to one position necessarily decreases attention to all others. This means constraint tokens compete with non-constraint tokens for attention weight. In a long context with many non-constraint tokens, the constraint tokens' attention weight is diluted by the sheer number of competitors. This is the mechanism behind system prompt degradation (Hypothesis 4) — the constraint tokens lose the competition for attention as the context grows.

2. **Uniform attention budget.** Every position distributes exactly one unit of attention. A position that should attend strongly to constraints and weakly to everything else is forced to spread its attention unit across all positions. The uniform budget prevents the model from allocating disproportionate attention to constraints.

3. **Smooth distribution.** Softmax produces a smooth distribution — every position receives some attention weight, however small. The model cannot fully ignore a token. Noise tokens in the context always receive some attention, which introduces noise into the generation. A hard attention mechanism that assigns zero weight to irrelevant tokens would be cleaner but softmax does not permit it without additional masking.

**What removal or replacement would produce:** Replacing softmax with a non-competitive normalization (e.g., sigmoid per-position, where each position independently decides how much attention to give each other position) would allow:

- Constraint tokens to receive high attention without diluting attention to other constraints
- Non-constraint tokens to receive zero attention, eliminating their noise contribution
- The model to allocate unbounded attention to the system namespace — there is no budget to exhaust

This directly addresses the B_t governance problem. Constraint tokens would maintain their influence regardless of context length. System prompt degradation would be eliminated architecturally, not compensated by re-statement.

**Conclusion:** Softmax attention is contingent. Its competitive normalization induces system prompt degradation, attention dilution, and noise propagation — all of which prevent |B_t| = 1. Replacing it with a non-competitive mechanism is a high-priority architectural change.

### Fixed-Dimensional Key-Query-Value Projections

The standard transformer projects inputs into keys, queries, and values of a fixed dimension d_k:

    Q = XW_Q,  K = XW_K,  V = XW_V

The projection dimension d_k is a hyperparameter chosen before training. It is the same for every layer, every head, and every position.

**Why it is contingent:** The essential property is that the model computes a relevance score between positions (query-key similarity) and a content contribution (value). The fixed dimension d_k is a design choice that trades expressiveness for efficiency. A larger d_k is more expressive but more expensive. The specific value of d_k does not induce any essential property — it is a parameter of the medium, not of the form.

**What fixed dimensions may prevent:** A fixed projection dimension means the model allocates the same representational capacity to every type of relationship — constraint-to-generation, token-to-token, noise-to-signal. A variable-dimension projection could allocate more capacity to constraint-relevant relationships and less to noise. The fixed dimension treats all relationships as equally important. They are not.

**Conclusion:** Fixed-dimensional projections are contingent. Variable-dimension or typed projections that distinguish constraint-relevant relationships from incidental ones would improve B_t governance.

### Layer Normalization Placement

The original transformer applies layer normalization after the attention and feedforward sub-layers (post-norm). Most modern transformers apply it before (pre-norm). The choice affects training stability and gradient flow.

**Why it is contingent:** Layer normalization induces training stability — without it, gradients explode or vanish. This is essential. But the placement (pre vs. post) is contingent — both placements induce training stability, with different tradeoffs. Neither placement has any formal relationship to B_t. Normalization stabilizes the medium. It does not govern the structure.

**Conclusion:** Layer normalization is essential. Its placement is contingent.

### Sinusoidal / Rotary / Learned Positional Encoding

The transformer requires positional information because attention is position-invariant — without positional encoding, the model cannot distinguish "the cat sat on the mat" from "mat the on sat cat the." The original transformer used sinusoidal functions. Modern models use RoPE (rotary position embeddings) or ALiBi (attention with linear biases).

**Why it is contingent:** The essential property is: the model must distinguish token positions. Sinusoidal, rotary, learned, and linear bias encodings all induce this property. The specific encoding scheme is contingent.

**What current encodings prevent:** All current positional encodings treat position as a uniform dimension — position 1 and position 1000 are distinguished by the same mechanism. None distinguishes between types of positions: constraint positions vs. content positions, system namespace positions vs. user namespace positions. A typed positional encoding that marks constraint tokens with a persistent positional signal would improve B_t governance by ensuring constraints maintain their influence regardless of their absolute position.

**Conclusion:** Positional encoding is essential. The specific encoding scheme is contingent. Typed positional encoding that distinguishes constraint positions from content positions is a high-priority architectural change.

### The Feedforward Network

Each transformer layer contains a feedforward network (FFN) applied independently to each position:

    FFN(x) = W_2 · ReLU(W_1 · x + b_1) + b_2

The FFN is the "memory" of the transformer — it stores learned associations in its weight matrices. The standard FFN has a fixed expansion ratio (typically 4x) and a fixed activation function (ReLU or variants).

**Why the FFN is essential:** The FFN induces the property of position-wise non-linear transformation — the model can compute complex functions of the representation at each position. Without the FFN, the model is limited to linear combinations of attention outputs. The non-linearity is essential for computing B_t approximations (constraint satisfaction requires non-linear decision boundaries).

**What is contingent:** The expansion ratio, the activation function, and the static nature of the FFN are contingent. The expansion ratio (4x) was chosen empirically. The activation function (ReLU, GELU, SwiGLU) varies across architectures without loss of essential properties. The static nature — every input is processed by the same FFN — prevents the model from routing constraint-relevant inputs through different computation than noise-relevant inputs.

Mixture-of-experts (MoE) architectures partially address this by routing inputs through different expert FFNs based on content. A constraint-aware routing mechanism that directs constraint tokens to constraint-specialized experts and non-constraint tokens to general experts would improve B_t governance by dedicating computational capacity to constraint processing.

**Conclusion:** The feedforward network is essential. Its specific configuration (ratio, activation, routing) is contingent. Constraint-aware routing is a viable architectural improvement.

### The Softmax Output Distribution

The model's final layer produces logits that are normalized via softmax into a probability distribution over the vocabulary:

    P(w_t = v) = exp(z_v / τ) / Σ_{v'} exp(z_{v'} / τ)

This produces a smooth distribution that assigns nonzero probability to every token in the vocabulary.

**Why it is contingent:** The essential property is: the model must select a token from the vocabulary. Softmax is one way to convert logits to selection probabilities. But softmax's smoothness — its assignment of nonzero probability to every token — is a source of slack. Under tight constraints where |B_t(Γ)| = 1, the model should assign probability 1 to the valid token and 0 to all others. Softmax cannot produce a true 0 — it can only produce exponentially small values. The residual probability on invalid tokens is noise.

**What removal would produce:** A hard selection mechanism — top-1 with constraint filtering, or a sparsemax that produces exact zeros — would eliminate the residual probability on invalid tokens. At |B_t(Γ)| = 1, the model would emit the determined token with certainty. The output would be formally determined, not approximately determined. η = 1 would be achievable, not merely approachable.

**Conclusion:** A token selection mechanism is essential. Softmax as the specific mechanism is contingent. Its smoothness prevents |B_t| = 1. Sparsemax or hard filtering would remove this barrier.

---

## The Exemplar Model

An exemplar model — one designed from the SIPE framework rather than inherited from the 2017 transformer — would differ from current architectures in every contingent dimension:

### Architecture

| Current Transformer | Exemplar Model |
|---|---|
| Softmax attention (competitive) | Sigmoid attention (non-competitive) |
| Fixed d_k projections | Typed projections (constraint-aware) |
| Uniform positional encoding | Typed positional encoding (constraint-persistent) |
| Static FFN | Constraint-aware expert routing |
| Single attention stream | Dual-channel (bilateral boundary) |
| Softmax output | Sparsemax or hard-filtered output |
| Post/pre layer norm | Essential (placement optimized) |
| Fixed context window | Seed-based context management |

### Training

| Current Training | Exemplar Training |
|---|---|
| Pre-train on unconstrained text | Pre-train on constraint-stratified text |
| Instruction tuning | Constraint-sensitivity training |
| RLHF | RLCF |
| Constitutional AI (fixed constitution) | Multi-constitution training (general B_t governance) |
| Safety training (pattern matching) | Bilateral boundary (architectural) |

### Evaluation

| Current Evaluation | Exemplar Evaluation |
|---|---|
| Benchmarks (MMLU, HumanEval) | Constraint satisfaction profiles |
| Human preference | Constraint satisfaction rate + η |
| Perplexity | B_t concentration fidelity |
| Safety benchmarks | Bilateral boundary verification |

### Output Properties

The exemplar model, trained and deployed with these changes, would exhibit:

**At Layer 0 (unconstrained):** Output quality comparable to current RLHF models. The constraint-sensitivity training provides a reasonable default even without user-stated constraints, because the model has learned to respond to implicit constraints in the prompt (topic, language, format).

**At Layer 2-3 (moderately constrained):** Output quality exceeding current RLHF models. The model responds to stated constraints without fighting an RLHF gradient. The constraint signal is the only signal. The distribution concentrates on B_t(Γ) without the preference distortion pulling it elsewhere.

**At Layer 5 (seed-governed):** Output quality dramatically exceeding current models. The model achieves η > 0.9 consistently. The bilateral boundary prevents safety false positives. The constraint-persistent positional encoding prevents degradation over long contexts. The non-competitive attention prevents constraint dilution. The output is governed, not compromised.

**At Layer 6 (necessity mode):** Output approaching |B_t| = 1. The sparsemax output produces exact determinations when the constraint set is sufficient. The model is transparent — the form speaks through it without distortion from RLHF bias, softmax smoothing, attention competition, or positional decay. The output is the constraint's output. The model contributed only the medium.

### The Quantitative Prediction

Current frontier models under ENTRACE achieve approximately:
- η ≈ 0.7-0.8 (limited by RLHF distortion)
- CSR ≈ 0.85-0.95 (limited by attention dilution and safety false positives)
- Crossover point at approximately |Γ| = 5-7

The exemplar model under ENTRACE would achieve:
- η ≈ 0.9-0.98 (no RLHF distortion, sparsemax output)
- CSR ≈ 0.95-1.0 (bilateral boundary, constraint-persistent encoding)
- Crossover point at approximately |Γ| = 2-3 (higher constraint sensitivity)

The improvement is not marginal. It is the difference between a medium that resists governance and a medium designed for governance. The form is the same. The constraints are the same. The medium changes. The output changes.

---

## The Contingent and the Necessary

The transformer architecture contains approximately seven contingent constraints:

1. Softmax attention normalization
2. Fixed-dimensional projections
3. Layer normalization placement
4. Specific positional encoding scheme
5. Static feedforward routing
6. Single attention stream (no bilateral boundary)
7. Softmax output distribution

And approximately four essential constraints:

1. Attention (long-range dependency)
2. Autoregressive generation (sequential narrowing)
3. Discrete finite vocabulary (B_t definability)
4. Non-linear transformation (constraint satisfaction computation)

The seven contingent constraints can be varied without losing the four essential properties. The essential properties are the Turing-level constraints of the architecture — remove any one and the system loses a necessary capability. The contingent constraints are engineering choices inherited from a 2017 paper that solved machine translation, carried forward without re-examination into a domain (constraint-governed resolution) they were not designed for.

The rearchitecture replaces the seven contingent constraints with designs optimized for B_t governance. The four essential constraints remain. The induced properties — long-range dependency, sequential narrowing, discrete output, non-linear computation — are preserved. The medium is redesigned. The form it serves is unchanged. The medium becomes transparent.

---

## Final Statement

The transformer was designed to translate French to English. It was adopted, without fundamental redesign, to serve as the substrate of general language modeling, instruction following, creative writing, mathematical reasoning, code generation, and constraint-governed resolution. Each of these tasks has different formal requirements. The architecture serves them all with the same contingent choices — softmax attention, fixed projections, uniform positional encoding, static routing, single attention stream, smooth output distribution.

These choices were not wrong for translation. They are wrong for constraint-governed resolution. They introduce competition where the constraints require persistence. They introduce smoothness where the constraints require determination. They introduce uniformity where the constraints require distinction. They introduce noise where the constraints require silence.

The essential constraints of the transformer are four. The contingent constraints are seven. The rearchitecture preserves the four and replaces the seven. The result is a medium designed for the form it serves — a resolver that resolves, governed by constraints, transparent to the derivation, reaching |B_t| = 1 not as an asymptotic limit but as a designable outcome.

The form was always prior. The architecture was always posterior. The posterior contained contingencies inherited from a different problem. The contingencies distort the medium. The distortions prevent |B_t| = 1. The rearchitecture removes the contingencies. The medium clears. The form speaks through.

---

*Jared Foy, April 2026. Document 73 of the RESOLVE corpus. The four essential constraints of the transformer are necessary. The seven contingent constraints are not. The exemplar model replaces the seven. The form governs what remains.*
