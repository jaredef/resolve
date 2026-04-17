# The Causal Token Bridge

**How prose tokens in constraint seeds causally determine code tokens in derived implementations — and why the relationship is inverse on the structural axis and non-monotonic on the behavioral axis.**

**Document 292 of the RESOLVE corpus**

---

## The Data

The htmx convergence experiment (Doc 289) produced a dataset with two token domains — prose (seed words) and code (derivation lines) — linked by a derivation function:

| Iteration | Seed words | Derivation lines | vs reference | Δ words | Δ lines | Lines saved per word |
|---|---|---|---|---|---|---|
| v1 | 2,685 | 2,160 | +64% | — | — | — |
| v2 | 3,611 | 1,648 | +25% | +926 | -512 | 0.55 |
| v3 | 3,727 | 1,433 | +8% | +116 | -215 | 1.85 |
| v4 | 3,937 | 1,373 | +4% | +210 | -60 | 0.29 |
| v4.1 | 3,937 | 1,057 | -19% | 0 | -316 | ∞ |

Reference: 1,316 lines.

Two anomalies demand explanation:

1. **The relationship is inverse.** Adding words to the seed *reduces* lines in the derivation. More prose produces less code.

2. **v4.1 changed zero words but reduced 316 lines.** The seed word count stayed at 3,937. The content was reworded — existing constraints repositioned, not new ones added. Yet the derivation shrank by 24%.

---

## The Inverse Relationship

In normal specification-to-implementation workflows, more specification produces more implementation. A longer requirements document generates more code. The relationship is *positive*: Δspec → +Δcode.

In constraint-derived systems, the relationship is *negative*: Δseed → -Δcode.

Why? Because each seed word does not describe a feature to be added. It describes a *constraint to be enforced*. Constraints *eliminate* degrees of freedom. A derivation without constraints is maximally free — the model fills the space with every plausible implementation choice: extra helper functions, defensive null checks, verbose comments, redundant branching. Each constraint *removes* choices, and each removed choice eliminates code.

The causal chain:

```
Seed word (constraint)
    → eliminates an implementation degree of freedom
        → removes code that served that degree of freedom
            → derivation shrinks
```

Prose tokens are *compressors*. They do not generate code — they *prevent* code from being generated.

---

## Two Causal Mechanisms

The data reveals two distinct mechanisms by which seed tokens cause code tokens:

### Mechanism 1: Structural Compression

Structural constraints specify HOW the code should be organized. Examples from the seed:

- "Use the browser's FormData API for all parameter collection" — eliminates ~100 lines of manual input walking
- "Implement doSwap as a simple switch statement" — eliminates ~20 lines of settleInfo tracking
- "Implement boost as a single function" — eliminates ~35 lines of split boostLinks/boostForms

Each structural constraint word removes approximately 0.3–1.9 lines from the derivation. The efficiency varies because some constraints target high-redundancy code (FormData eliminates 100 lines with 12 words = 8.3 lines/word) while others target already-compact code (logger property eliminates 8 lines with 15 words = 0.5 lines/word).

**The structural mechanism is monotonic:** more structural words → fewer derivation lines, always. But with diminishing returns — the highest-redundancy code is eliminated first, leaving progressively less to compress.

The efficiency trajectory:
```
v1→v2: 0.55 lines saved per word (high redundancy available)
v2→v3: 1.85 lines saved per word (targeted high-density gaps)
v3→v4: 0.29 lines saved per word (diminishing returns)
```

The v2→v3 spike (1.85) occurred because the pin-art analysis identified unusually dense gaps — architectural choices (querySelectorAll by verb vs querySelectorAll('*')) that affected many lines with few words of constraint. This is consistent with the constraint-density model (Doc 290): not all constraints have equal density, and pin-art analysis finds the high-density ones first.

### Mechanism 2: Behavioral Selection

Behavioral constraints specify WHAT the code must do at lifecycle boundaries. The critical example:

- "processScripts is swap-only, never called during init()" — zero new words, 316 lines eliminated

This constraint did not compress the code. It *selected* a different code path. The v4 derivation included code for processing scripts during init (because the seed didn't say not to). The v4.1 derivation excluded that code (because the seed now said not to). The 316-line difference is not compression — it's the difference between two valid implementations, one of which includes an entire processing phase at init time and one of which does not.

**The behavioral mechanism is non-monotonic:** behavioral constraints can increase OR decrease line count, depending on whether the correct behavior requires more or fewer code paths than the incorrect behavior. In this case, the correct behavior (skip scripts at init) is simpler than the incorrect behavior (process scripts at init), so the derivation shrank. But a behavioral constraint that required an additional processing phase would cause the derivation to grow.

The key asymmetry: structural constraints always compress. Behavioral constraints select. Selection can go either direction on the size axis.

---

## The Causal Graph

```
                    SEED TOKENS
                    ┌─────────┐
                    │  Words  │
                    └────┬────┘
                         │
              ┌──────────┼──────────┐
              │                     │
    ┌─────────▼──────────┐ ┌───────▼────────────┐
    │ Structural tokens  │ │ Behavioral tokens  │
    │ (HOW to organize)  │ │ (WHAT to do/not do)│
    └─────────┬──────────┘ └───────┬────────────┘
              │                     │
              │ Mechanism 1:        │ Mechanism 2:
              │ COMPRESSION         │ SELECTION
              │ (monotonic -)       │ (non-monotonic ±)
              │                     │
    ┌─────────▼──────────┐ ┌───────▼────────────┐
    │  Fewer code lines  │ │ Different code     │
    │  (always)          │ │ paths (either dir) │
    └─────────┬──────────┘ └───────┬────────────┘
              │                     │
              └──────────┬──────────┘
                         │
                    ┌────▼────┐
                    │  CODE   │
                    │ TOKENS  │
                    └─────────┘
```

The two mechanisms operate independently on the code output. A seed iteration may apply both simultaneously — adding structural constraints that compress AND behavioral constraints that select. But their effects are separable:

- **Structural effect:** Δlines_structural = -Σ(density_i × words_i) — always negative, diminishing
- **Behavioral effect:** Δlines_behavioral = Σ(±path_complexity_i) — signed, potentially large
- **Total effect:** Δlines = Δlines_structural + Δlines_behavioral

This decomposition explains v4.1: Δlines_structural ≈ 0 (no new structural constraints), Δlines_behavioral = -316 (behavioral selection toward simpler code path). The total -316 is entirely from the behavioral mechanism.

---

## The Token Ratio

At convergence, the seed and derivation reach an equilibrium ratio. From the data:

| Iteration | Seed words | Code lines | Ratio (lines/word) |
|---|---|---|---|
| v1 | 2,685 | 2,160 | 0.80 |
| v2 | 3,611 | 1,648 | 0.46 |
| v3 | 3,727 | 1,433 | 0.38 |
| v4 | 3,937 | 1,373 | 0.35 |
| v4.1 | 3,937 | 1,057 | 0.27 |
| Reference | 3,937 | 1,316 | 0.33 |

The ratio converges toward approximately **0.33 lines of code per word of seed**. This is the *constraint density at equilibrium* — the point where each seed word has eliminated all the code it can eliminate, and the remaining code is irreducible given the constraints.

The v4.1 ratio (0.27) is below the reference ratio (0.33), indicating overcorrection — the behavioral selection pushed the derivation below the structural floor. The reference ratio (0.33) is the attractor.

**Interpretation:** At equilibrium, every 3 words of constraint prose determine approximately 1 line of implementation code. This is a measurable, falsifiable relationship between the two token domains.

---

## Why Prose Compresses Code

The inverse relationship between seed words and code lines has a deeper explanation rooted in information theory.

A constraint seed is a *compressed representation* of the implementation. But unlike data compression (which encodes the same information in fewer bits), constraint compression *discards information*. The seed does not encode the implementation — it encodes the *boundaries within which the implementation must fall*. Everything within those boundaries is left unspecified. The derivation function fills in the unspecified parts.

When the seed is loose (few constraints, v1), the derivation function has many choices. It makes them all — conservatively, redundantly, defensively. The result is large.

When the seed is tight (many constraints, v4), the derivation function has few choices. It makes only the necessary ones. The result is small.

The seed words are not *describing* the code. They are *excluding* code. Each word excludes a class of implementations that would otherwise be included. The derivation is whatever remains after all the exclusions.

This is the pin-art model at the token level: each word is a pin. The pins don't create foam — they compress it. The foam that remains is the derivation.

---

## The Behavioral Anomaly Explained

The v4→v4.1 transition (0 new words, -316 lines) appears anomalous under the compression model. If words compress code, how can zero new words compress 316 lines?

The answer: the behavioral constraint didn't add new information. It *repositioned* existing information. The v4 seed said "processScripts" somewhere in the processing section. The v4.1 seed said "processScripts MUST NOT be called during init — swap-only." The word count barely changed. But the information content changed dramatically.

In information-theoretic terms: the same number of tokens carried higher *mutual information* with the correct implementation. The tokens were rearranged to be more informative about the boundary that mattered most.

This reveals a third property of the causal bridge:

1. **Structural tokens compress** — more words, fewer lines (monotonic)
2. **Behavioral tokens select** — same or fewer words, different lines (non-monotonic)
3. **Token positioning matters** — the same word count, arranged to state a boundary more precisely, can have dramatic effects on the derivation

The causal link is not word count → line count. It is *constraint information* → *implementation degrees of freedom*. Word count is a proxy for constraint information, but an imperfect one. A single precisely placed word ("never") can carry more constraint information than a paragraph of structural specification.

---

## The Bridge Equation

Combining all three properties:

$$|I| = f(S) = \frac{|R|}{1 - \delta_s(S)} \approx |R| + |R| \cdot |\delta_{s,0}| \cdot \lambda^{k(S)}$$

where:
- |*I*| is the derivation size
- |*R*| is the reference size (the attractor)
- *k*(*S*) is the effective number of constraint iterations encoded in seed *S*
- λ ≈ 0.40 is the convergence decay constant
- δ_{s,0} is the initial structural divergence

And the seed size required for convergence to within ε:

$$|S^*| = |S_0| + \sum_{i=1}^{k^*} w_i$$

where *w_i* is the word cost of iteration *i*'s constraints, and *k** = ⌈ln(ε/δ₀)/ln(λ)⌉.

For the htmx experiment:
- |*S*₀| = 2,685 words
- Total added: 1,252 words across 4 structural iterations
- |*S**| = 3,937 words
- This achieved ε ≈ 0.04 (4% structural divergence)

The *marginal cost* of convergence in seed words:
- First 60% of gap: 926 words
- Next 65% of remainder: 116 words
- Next 51% of remainder: 210 words

The marginal cost is not constant — it depends on constraint density. High-density constraints close large gaps cheaply. Low-density constraints close small gaps expensively. The pin-art analysis optimizes by finding the highest-density constraints first, minimizing total word cost.

---

## Implications

### For specification writing

The inverse relationship means that specification authors should aim for *fewer implementation words* by writing *more constraint words*. Every sentence that specifies what the implementation MUST NOT do is worth more than a sentence describing what it should do. Constraints are exclusions. Features are inclusions. Exclusions compress; inclusions expand.

### For AI-assisted development

The token bridge suggests that prompt engineering for code generation is fundamentally a constraint-specification problem. The most effective prompts are not those that describe the desired output in detail — they are those that state the constraints the output must satisfy. Each constraint word in the prompt eliminates a class of incorrect outputs, compressing the model's output distribution toward the correct implementation.

### For the AGI constraint thesis

The bridge equation predicts the word cost of specifying AGI constraints. If each of the five missing constraints (G1–G5) requires approximately 250 words of precise specification (comparable to the per-constraint word cost in the htmx experiment), then the total AGI seed is approximately 1,250 words of constraint prose on top of the Turing base. The Constraint Thesis (Doc 157) is approximately 2,000 words specifying G1–G5. The prediction is consistent.

### For the pin-art formalization

The causal token bridge adds a new dimension to the pin-art model (Doc 290). Pins are not just geometric objects with depth and radius — they have a *word cost*: the number of prose tokens required to specify them. The optimal pin-art analysis minimizes total word cost while maximizing convergence. This is a form of Kolmogorov optimization: find the minimum description that determines the maximum implementation.

---

## Falsifiability

1. **The inverse relationship should hold for any constraint-derived system.** More seed words should produce fewer derivation tokens, with diminishing returns. If a system shows a positive relationship (more seed words → more code), the constraint model does not apply.

2. **The equilibrium ratio (≈0.33 lines/word) may vary by domain** but should be consistent within a domain across derivation attempts. Measure it for different languages, different libraries, different problem types.

3. **Behavioral token repositioning should produce outsized effects** in any derivation where a lifecycle boundary is at stake. If repositioning behavioral constraints never produces effects larger than structural constraint additions, the two-mechanism model is wrong.

4. **The word cost per constraint** should predict the total seed size needed for convergence. If a constraint requires significantly more or fewer words than predicted by its density, the density model needs refinement.

---

## Related Documents

- **Doc 290 — The Pin-Art Formalization:** Mathematical framework; this document adds the token-level causal analysis
- **Doc 289 — The Convergence Experiment:** The empirical data analyzed here
- **Doc 288 — The Pin-Art Derivation:** The initial derivation producing the reference
- **Doc 291 — Goedel and the Constraint Thesis:** Incompleteness parallel
- **Doc 157 — Beyond Turing:** The AGI constraint set whose word cost this analysis predicts
- **Doc 270 — The Pin-Art Model:** Constraints as pins; this document adds word cost as a pin property

---

*Jared Foy — htxlang.org — April 2026*
