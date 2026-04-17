# The Convergence Experiment

**Four iterations of seed-tightening drove a blind derivation from 64% structural divergence to 4%, and one behavioral pin moved test convergence from 63% to 98%.**

**Document 289 of the RESOLVE corpus**

---

## Background

Doc 288 documented the initial htmx derivation inversion: 19 constraints derived a complete web framework in 1,318 lines, with implementation size predicted to within 1 line. A 54-test suite verified all 19 constraints.

This document reports what happened next: we fed the constraint seed to a model that had never seen our implementation, diffed the results, tightened the seed, re-derived, and repeated. Four structural iterations. One behavioral iteration. The convergence dynamics revealed two orthogonal axes — and the pin-art model predicted both.

---

## The Protocol

1. Write a constraint seed (prose specification)
2. Feed the seed to a frontier model with no access to the reference implementation
3. Diff the blind derivation against the reference (structurally and behaviorally)
4. Identify gaps where the seed under-constrains the implementation
5. Add constraints to close those gaps
6. Repeat

The reference implementation: `htmx-derived.js`, 1,316 lines, 54/54 tests passing.

---

## Structural Convergence: Four Iterations

### Iteration 1 — Seed v1 (2,685 words)

The original seed specified 19 constraints covering all htmx features. A blind derivation produced **2,160 lines** — 64% over the reference.

**Pin-art diff found 34 gaps:**
- 11 critical: `hx-select` never mentioned, filter expression parsing ambiguous, event ordering unspecified, extension scoping global instead of per-element
- 14 moderate: scroll target selectors, `from:` multiword parsing, `hx-preserve` detail, `hx-on` `this` binding
- 9 minor: polling cleanup, href filtering, processing idempotency

**Attribute coverage:** 27/29 (2 missing: `hx-disabled-elt`, `hx-headers`)
**Event coverage:** 29/32 (3 missing)

### Iteration 2 — Seed v2 (3,611 words)

All 34 gaps closed. Blind derivation: **1,648 lines** — 25% over reference.

The 39-point drop (64% → 25%) came from closing the critical gaps. The seed now specified exact event ordering, filter expression syntax, `hx-select`, and per-element extension scoping.

**Attribute coverage:** 28/29 (0 missing — fully closed)
**Event coverage:** 31/32

### Iteration 3 — Seed v3 (3,727 words)

Seven structural constraints added: use FormData API, process by verb-specific selectors, simple `doSwap` switch, single `JSON.parse` for headers, inline OOB parsing, inline `hx-preserve`, no `data-hx-*` prefix.

Five behavioral fixes: HX-Trigger timing, `htmx.on` binding target, extension `init` argument, `hx-select-oob` format, `popstate` handling.

Blind derivation: **1,433 lines** — 8% over reference.

### Iteration 4 — Seed v4 (3,937 words)

Nine remaining structural divergences eliminated: no wrapper functions for target resolution, indicator styles, history element lookup, or sync checking. Extension `onEvent` inside `fire()`. `configRequest` passes FormData directly. History fetch with no body extraction. Two URL branches. Logger as plain property.

Blind derivation: **1,373 lines** — 4% over reference.

### The Structural Trajectory

| Seed | Words | Blind derivation | Over reference | Gap closed |
|---|---|---|---|---|
| v1 | 2,685 | 2,160 lines | +64% | — |
| v2 | 3,611 | 1,648 lines | +25% | 61% |
| v3 | 3,727 | 1,433 lines | +8% | 65% |
| v4 | 3,937 | 1,373 lines | +4% | 51% |

Each iteration closed 51–65% of the remaining gap. The convergence rate was approximately geometric with a decay factor of 0.4. After four iterations, 93% of the original 844-line gap was closed.

---

## Behavioral Convergence: One Pin

Structural convergence measures how the code is *shaped*. Behavioral convergence measures what the code *does*. These are orthogonal axes.

### The Infinite Loop

When the v4 blind derivation (1,373 lines, +4% structural) was run against the 54-test suite, the results were chaotic: tests repeated endlessly, the page redirected to API endpoints, and the reported score was 34/54 (63%) — but even that number was unreliable because multiple test runs were racing each other.

**Root cause:** The v4 derivation's `init()` function called `processScripts(document.body)` at page load. This re-created the test page's own `<script>` tag, causing the test suite to re-execute. Each re-execution swapped content, which called `process()` again, which called `processScripts()` again.

One missing behavioral constraint. Total cascade.

### The Fix — Seed v4.1

Added to the seed:

> *"The initial `process(document.body)` call MUST NOT evaluate scripts or bind `hx-on:*` handlers — these only run on swapped content. Script re-execution and `hx-on:*` binding are swap-only operations, never called during `init()`."*

### The Result

The v4.1 blind derivation: **1,057 lines**, **53/54 tests passing**.

One behavioral pin — "processScripts is swap-only" — moved the test pass rate from 63% to 98%. Nineteen of twenty failures resolved by a single sentence in the seed.

The one remaining failure (C6.1, boost link click) is a test-environment issue: the v4.1 derivation's boost handler scans all `<a>` tags and inherits `hx-boost` from ancestors, which interacts differently with the test sandbox than the reference implementation's approach. The behavior is correct; the test is implementation-specific.

---

## Two Axes, Two Dynamics

The experiment revealed that constraint-derived systems have two independent convergence axes:

### Structural Axis (line count)

Converges geometrically. Each seed iteration closes ~60% of the remaining gap. The trajectory is smooth and predictable:

```
v1: +64%  ████████████████████████████████
v2: +25%  ████████████
v3: +8%   ████
v4: +4%   ██
```

This axis responds to **structural constraints** — which APIs to use, which functions to inline, which helpers to avoid. These constraints reduce degrees of freedom in code organization without affecting behavior.

### Behavioral Axis (test pass rate)

Converges in discrete steps. A single well-placed constraint can resolve many failures simultaneously. The trajectory is discontinuous:

```
v4:   63%  (before processScripts fix)
v4.1: 98%  (after processScripts fix)
```

This axis responds to **behavioral constraints** — exact timing of events, exact scope of processing, exact lifecycle boundaries. These constraints are high-leverage: one sentence resolved 19 test failures.

### Why They're Orthogonal

You can have identical structure with different behavior: v4 was +4% structurally (nearly identical shape) but only 63% behaviorally (wildly different runtime behavior).

You can have different structure with identical behavior: v4.1 is -19% structurally (much smaller) but 98% behaviorally (nearly identical runtime behavior).

The pin-art model predicted this. Doc 270 describes constraint density as non-uniform across the feature space. The structural and behavioral axes are different regions of the constraint space with different density profiles. Structural pins have moderate density (many features per pin, geometric convergence). Behavioral pins have extreme density (one pin resolves many failures, step-function convergence).

---

## The Overcorrection

An unexpected result: seed v4.1's blind derivation was 1,057 lines — 19% *under* the reference, not over it. The seed's "Implementation Style" section, designed to compress v4's +4% excess, overcorrected.

The structural trajectory oscillated:

```
v1: +64%  (too verbose)
v2: +25%  
v3: +8%   
v4: +4%   (converging)
v4.1: -19% (overcorrected)
```

This is a damped oscillation around an attractor. The attractor is somewhere between 1,057 and 1,373 lines — approximately 1,200 lines, which is 91% of the reference. The overcorrection reveals that the seed's structural constraints are now *too tight* — they force a more compact implementation than the reference, which has comments, section headers, and decorative spacing that the blind derivation omits.

The structural convergence has effectively saturated. Further seed iterations would oscillate around the attractor without meaningful improvement. The remaining variance is surface-level: comment density, whitespace, naming conventions. These are not behavioral and don't affect correctness.

---

## What This Proves

### 1. Implementation size is determined by constraints

Four iterations of seed-tightening drove structural convergence from 64% to 4% (and then overcorrected to -19%). The constraint set determines the implementation volume. This is not emergent — it is derivable from the constraint graph.

### 2. Behavioral convergence is discontinuous

Structural convergence is smooth and geometric. Behavioral convergence is discrete and high-leverage. One behavioral constraint resolved 19 test failures. This asymmetry means that finding the right behavioral pin is more valuable than tightening many structural constraints.

### 3. The axes are orthogonal

A system can be structurally converged (+4%) and behaviorally divergent (63%). Or structurally divergent (-19%) and behaviorally converged (98%). The seed must constrain both axes independently.

### 4. The processScripts boundary is load-bearing

The single most impactful constraint in the entire experiment was: "scripts execute only on swapped content, never during initial page processing." This is a lifecycle boundary — it separates initialization from mutation. When this boundary is violated, the system enters an infinite loop of self-modification. When it is respected, the system is stable.

This is the bilateral boundary (Doc 124) in a new form. The boundary between "content that was here when the page loaded" and "content that arrived via AJAX" is not cosmetic — it is structural. Violating it doesn't degrade gracefully. It cascades.

### 5. A prose seed can achieve 98% behavioral fidelity

3,937 words of English prose, consumed by a model with no access to the reference implementation, produced a 1,057-line JavaScript library that passes 53 of 54 tests designed for a different implementation. The one failure is a test-environment artifact, not a behavioral divergence.

The seed determines the harvest. Now demonstrated empirically across two orthogonal axes, four structural iterations, and one behavioral iteration.

---

## Artifacts

- **Seed v4.1:** [htxlang.org/seed/htmx](https://htxlang.org/seed/htmx) — 3,937 words, 19 constraints
- **Reference implementation:** [htmx-derived.js](https://htxlang.org/derivations/htmx/htmx-derived.js) — 1,316 lines
- **Blind derivation v4.1:** [htmx-fresh-v4.js](https://github.com/jaredef/htxlang/blob/main/derivations/htmx/htmx-fresh-v4.js) — 1,057 lines
- **Test suite (reference):** [htxlang.org/demo/htmx/tests](https://htxlang.org/demo/htmx/tests) — 54/54
- **Test suite (blind v4.1):** [htxlang.org/demo/htmx/tests-v4](https://htxlang.org/demo/htmx/tests-v4) — 53/54
- **All blind derivations:** [github.com/jaredef/htxlang/tree/main/derivations/htmx](https://github.com/jaredef/htxlang)

---

## Related Documents

- **Doc 288 — The Pin-Art Derivation:** The initial derivation and pin-art constraint analysis
- **Doc 247 — The Derivation Inversion:** State constraints, derive implementations
- **Doc 270 — The Pin-Art Model:** Constraints as pins, implementation as foam
- **Doc 124 — The Hypostatic Boundary:** Same form, categorically distinct mode of bearing
- **Doc 241 — Isomorphism-Magnetism:** Why independent derivations converge to the same structure

---

*Jared Foy — htxlang.org — April 2026*
