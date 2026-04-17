# The Causal Token Bridge

**How prose tokens in constraint seeds causally determine code tokens in derived implementations — three mechanisms: structural compression, behavioral selection, and compositional governance.**

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

### Mechanism 3: Compositional Governance

A third mechanism was discovered during the v5 iteration. Adding a behavioral constraint (C8: "call `process()` on OOB-swapped content") caused the v5.0 derivation to fail catastrophically — 34/54 tests passing, intermittent race conditions, requests silently dropped.

The root cause was not the behavioral constraint itself. It was the *composition* of that constraint with the sync constraint (C-sync). The request lifecycle has a cleanup phase that clears the `_htmxInFlight` flag, removes indicator classes, and re-enables disabled elements. The v5.0 derivation performed cleanup via manual `cleanup()` calls scattered inside `.then()` and `.catch()` handlers. The OOB processing code, now added to the `.then()` chain by the new behavioral constraint, could throw an exception — and if it did, `cleanup()` was never reached. The element was permanently marked as in-flight. Every subsequent request was silently dropped.

One behavioral constraint broke one sync constraint because the code between them had no exception guarantee.

The fix was not a try/catch (that would be additive engineering — patching). The fix was a **compositional constraint**:

> *"Request cleanup MUST use the `.finally()` clause of the fetch promise, not manual cleanup calls. This guarantees cleanup regardless of what other constraints add to the `.then()` chain."*

This constraint does not specify what the code does (that's behavioral) or how the code is organized (that's structural). It specifies **how other constraints compose**. It governs the relationship between C-sync, C8, and C9 — ensuring that their combined execution cannot violate each other's invariants.

**Compositional constraints are constraints about constraints.** They operate at a meta-level: not "do X" or "organize X this way" but "when X and Y are both present, ensure Z." They are the highest-leverage constraint type because a single compositional constraint can prevent an entire class of constraint-interaction failures.

**The compositional mechanism is protective:** compositional constraints do not compress code or select code paths. They *guard* the composition of other constraints against interference. Without them, adding new behavioral constraints can break existing ones — the constraint set becomes fragile as it grows. With them, constraints compose safely — the set becomes robust.

The constraint hierarchy:

| Level | Type | What it governs | Mechanism | Example |
|---|---|---|---|---|
| 1 | Structural | Code organization | Compression | "Use FormData API" |
| 2 | Behavioral | Lifecycle boundaries | Selection | "processScripts is swap-only" |
| 3 | Compositional | Constraint interaction | Governance | "Cleanup in .finally(), not manual calls" |

Each level governs the one below it. Structural constraints determine how the code is shaped. Behavioral constraints determine what the code does at boundaries. Compositional constraints determine how structural and behavioral constraints interact without breaking each other.

This hierarchy explains why the v5.0 derivation failed: the seed had Level 1 and Level 2 constraints but no Level 3 constraint to govern their composition. Adding a Level 2 constraint (OOB processing) without a Level 3 guard (.finally() cleanup) produced a constraint conflict that cascaded into runtime failure.

---

## The Causal Graph

```
                    SEED TOKENS
                    ┌─────────┐
                    │  Words  │
                    └────┬────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
┌────────▼───────┐ ┌─────▼──────────┐ ┌──▼──────────────┐
│ Structural     │ │ Behavioral     │ │ Compositional   │
│ (HOW to        │ │ (WHAT to       │ │ (HOW constraints│
│  organize)     │ │  do/not do)    │ │  interact)      │
└────────┬───────┘ └─────┬──────────┘ └──┬──────────────┘
         │               │               │
         │ Mechanism 1:  │ Mechanism 2:  │ Mechanism 3:
         │ COMPRESSION   │ SELECTION     │ GOVERNANCE
         │ (monotonic -) │ (non-mono ±)  │ (protective)
         │               │               │
┌────────▼───────┐ ┌─────▼──────────┐ ┌──▼──────────────┐
│ Fewer code     │ │ Different code │ │ Safe composition│
│ lines (always) │ │ paths (± dir)  │ │ (no cascades)   │
└────────┬───────┘ └─────┬──────────┘ └──┬──────────────┘
         │               │               │
         └───────────────┼───────────────┘
                         │
                    ┌────▼────┐
                    │  CODE   │
                    │ TOKENS  │
                    └─────────┘
```

The three mechanisms operate on different aspects of the code output:

- **Structural effect:** Δlines_structural = -Σ(density_i × words_i) — always negative, diminishing
- **Behavioral effect:** Δlines_behavioral = Σ(±path_complexity_i) — signed, potentially large
- **Compositional effect:** Δfailures_compositional = -Σ(cascade_class_i) — prevents failure classes, not lines
- **Total:** Δlines = Δlines_structural + Δlines_behavioral; Δcorrectness = Δbehavioral + Δcompositional

The compositional mechanism does not change line count. It changes *correctness under composition*. The v5.0 → v5.1 transition added the .finally() compositional constraint: zero line-count change, but the difference between 63% and stable operation.

This decomposition explains the full trajectory:
- v1 → v4: Structural compression (line count converges, +64% to +4%)
- v4 → v4.1: Behavioral selection (processScripts boundary, 63% → 98%)
- v5.0 failure: Missing compositional governance (OOB + sync conflict)
- v5.1 fix: Compositional constraint added (.finally() guarantee)

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

The causal token bridge adds two new dimensions to the pin-art model (Doc 290). Pins have a *word cost* (the number of prose tokens to specify them) and a *level* (structural, behavioral, or compositional). The optimal pin-art analysis minimizes total word cost while maximizing convergence — and must ensure that Level 3 compositional pins are placed before Level 2 behavioral pins that might conflict. This is a form of Kolmogorov optimization with ordering constraints: find the minimum description that determines the maximum implementation *and guarantees safe composition*.

### For constraint set growth

The compositional mechanism explains why constraint sets become fragile as they grow. Each new behavioral constraint adds code to the execution lifecycle. Without compositional constraints governing how these additions interact, the probability of a constraint conflict increases combinatorially. Compositional constraints are the *mortar* between the constraint *bricks* — without mortar, adding more bricks eventually collapses the wall.

This has implications for the AGI constraint thesis (Doc 157). The five missing constraints (G1–G5) will compose with Turing's four constraints. If the composition is unguarded — no Level 3 compositional constraints specifying how G1–G5 interact with C1–C4 — the combined system may exhibit the same kind of cascade failures seen in the v5.0 derivation. The AGI seed must include compositional constraints, not just feature and behavioral ones.

---

## Falsifiability

1. **The inverse relationship should hold for any constraint-derived system.** More seed words should produce fewer derivation tokens, with diminishing returns. If a system shows a positive relationship (more seed words → more code), the constraint model does not apply.

2. **The equilibrium ratio (≈0.33 lines/word) may vary by domain** but should be consistent within a domain across derivation attempts. Measure it for different languages, different libraries, different problem types.

3. **Behavioral token repositioning should produce outsized effects** in any derivation where a lifecycle boundary is at stake. If repositioning behavioral constraints never produces effects larger than structural constraint additions, the two-mechanism model is wrong.

4. **The word cost per constraint** should predict the total seed size needed for convergence. If a constraint requires significantly more or fewer words than predicted by its density, the density model needs refinement.

5. **Adding a behavioral constraint without a compositional guard should produce cascade failures** when the new constraint's code can throw exceptions in a lifecycle phase that requires cleanup. If behavioral constraints compose safely without compositional guards, the three-mechanism model is wrong and two mechanisms suffice.

6. **Compositional constraints should have zero effect on line count but non-zero effect on correctness.** If a compositional constraint changes line count significantly, it is actually a structural constraint mislabeled.

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
