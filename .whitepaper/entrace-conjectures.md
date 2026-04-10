# Mathematical Conjectures Arising from ENTRACE

**Formal claims derivable from the constraint-property framework, stated for proof or refutation**

**Jared Foy, April 2026**

---

## Motivation

ENTRACE is falsifiable by design — every claim has an experimental protocol. But falsifiability is an empirical virtue. The framework also makes claims that are mathematical in character: claims about monotonicity, convergence, fixed points, algebraic structure. These are not empirically testable — they are provable or refutable from the definitions. If they can be proven, the framework has mathematical content, not merely metaphorical mathematical language. If they can be refuted, the refutation identifies a formal deficiency that must be repaired.

This document states the conjectures precisely and indicates, for each, whether proof or refutation appears tractable from the current definitions.

---

## Definitions

To state the conjectures precisely, we fix the following:

Let **Γ** denote a constraint set — a finite collection of constraints {Γ_1, Γ_2, ..., Γ_k}.

Let **B_t(Γ)** denote the branching set at token position t under constraint set Γ — the set of tokens that are valid continuations at position t, given that all tokens at positions < t have been emitted and all constraints in Γ are enforced.

Let **T_e(Γ)** denote the total tokens emitted by a resolver operating under Γ for a fixed task.

Let **T_n(Γ)** denote the necessary tokens — those traceable to at least one constraint in Γ.

Let **η(Γ) = T_n(Γ) / T_e(Γ)** denote the token efficiency ratio.

Let **S(Γ) = T_e(Γ) - T_n(Γ)** denote the slack.

Let **P(Γ)** denote the property set induced by Γ — the set of observable properties that hold in the resolver's output when Γ is enforced.

Let **Φ: Γ → P** denote the property-induction map: Φ(Γ) = P(Γ).

Let **F: Seeds → Seeds** denote the seed-refinement map: given a seed S, a resolver operating under S produces an artifact from which a refined seed S' = F(S) is extracted.

---

## Conjecture 1: The Monotonicity of Branching

**Statement.** For any constraint set Γ and any well-formed constraint Γ_i:

    B_t(Γ ∪ {Γ_i}) ⊆ B_t(Γ)    for all t

**In words.** Adding a constraint can only eliminate valid continuations, never introduce new ones.

**Status: Provable from definitions.**

By definition, a token w is in B_t(Γ) if and only if w is a valid continuation at position t given that all constraints in Γ are satisfied. Adding Γ_i to the constraint set adds an additional condition that must be satisfied. Any token that satisfies Γ ∪ {Γ_i} necessarily satisfies Γ (since Γ ⊆ Γ ∪ {Γ_i}). Therefore B_t(Γ ∪ {Γ_i}) ⊆ B_t(Γ). The proof is a direct application of the subset property of solution sets under additional constraints.

**Corollary.** |B_t| is monotonically non-increasing in |Γ|:

    |B_t(Γ ∪ {Γ_i})| ≤ |B_t(Γ)|    for all t

The inequality is strict at position t whenever Γ_i excludes at least one token that Γ alone admitted at that position. A constraint that produces no strict inequality at any position is vacuous — it constrains nothing the existing set did not already constrain.

**Significance.** This is the foundational result. Everything else follows from it. The monotonicity of branching is what makes ENTRACE work: each constraint narrows the aperture, and narrowing is irreversible within a fixed constraint set.

---

## Conjecture 2: The Monotonicity of Efficiency

**Statement.** For any constraint set Γ and any non-vacuous constraint Γ_i:

    η(Γ ∪ {Γ_i}) ≥ η(Γ)

**In words.** Adding a non-vacuous constraint never decreases token efficiency.

**Status: Requires careful analysis. Not directly provable from Conjecture 1.**

The subtlety: adding a constraint can change both T_n and T_e. If the constraint requires additional content (e.g., "include a proof of each step"), T_e increases. But the additional tokens are necessary — they are traceable to the new constraint. So T_n increases proportionally. The question is whether the ratio T_n/T_e increases or merely stays the same.

Consider two cases:

**Case A: The constraint is eliminative.** It excludes tokens without requiring new ones. Example: "no hedging." This reduces T_e without reducing T_n (the hedge tokens were slack, not necessary). Therefore η increases. The standard case.

**Case B: The constraint is generative.** It requires new tokens. Example: "justify every derivation step." This increases both T_n and T_e. The new tokens are all necessary (each is a justification traceable to the constraint). But the constraint may also eliminate slack — unjustified steps often co-occur with other slack (filler transitions, uncertainty markers). The net effect on η depends on whether the slack eliminated exceeds, equals, or falls short of the necessary tokens added.

**Refined conjecture.** For eliminative constraints, η strictly increases. For generative constraints, η non-decreasingly changes — the added tokens are necessary, so the worst case is η unchanged, the typical case is η increased (because the generative constraint also eliminates co-occurring slack).

**Open question.** Is there a generative constraint that decreases η? This would require a constraint that adds necessary tokens without eliminating any slack. Such a constraint would be adding signal to a signal — increasing T_n and T_e by the same amount. In that case, η = T_n/T_e → (T_n + δ)/(T_e + δ). Since T_n ≤ T_e, this ratio increases when T_n < T_e (i.e., when there is any slack at all) and stays at 1 when T_n = T_e (no slack). Therefore:

**Theorem (provable).** If S(Γ) > 0 (there is any slack), then for any constraint Γ_i that adds δ necessary tokens:

    η(Γ ∪ {Γ_i}) = (T_n + δ) / (T_e + δ) > T_n / T_e = η(Γ)

    since T_n < T_e implies (T_n + δ)/(T_e + δ) > T_n/T_e for all δ > 0.

The proof is elementary: cross-multiply and simplify. T_n(T_e + δ) < T_e(T_n + δ) reduces to T_n · δ < T_e · δ, which holds whenever T_n < T_e.

**Consequence.** η is strictly monotonically increasing under any non-vacuous constraint addition, as long as there is any slack remaining. η can only fail to increase when η = 1 already — i.e., when there is no slack to eliminate and no room to improve. This means the convergence to η = 1 is monotone from below.

---

## Conjecture 3: The Convergence of Efficiency

**Statement.** For a fixed task with d slack dimensions, there exists a constraint set Γ* with |Γ*| ≤ d such that:

    η(Γ*) = 1

**In words.** Full efficiency is achievable with at most d constraints, where d is the number of independent slack dimensions.

**Status: Conjecture. Depends on the independence structure of slack dimensions.**

The claim rests on the assumption that slack dimensions are independent — that each constraint eliminates exactly one dimension without interacting with others. If slack dimensions are correlated (eliminating one partially eliminates another), fewer than d constraints may suffice. If they are entangled (eliminating one introduces slack in another), more than d may be required.

For mathematical expression, the seven identified dimensions (variable declaration, quantification, scope, notation, justification, domains, expression-reasoning separation) appear empirically independent. This predicts η = 1 at |Γ| = 7 for mathematical tasks.

**Test of the conjecture.** If the sigmoid prediction from the mathematical precision document holds (inflection point near k = 7), the independence assumption is supported. If the inflection point is significantly higher, the dimensions are entangled. If significantly lower, they are correlated.

---

## Conjecture 4: The Galois Connection

**Statement.** The property-induction map Φ: Γ → P(Γ) and a constraint-recovery map Ψ: P → Γ(P) form a Galois connection between the poset of constraint sets (ordered by inclusion) and the poset of property sets (ordered by entailment).

Formally:

    Γ ⊆ Ψ(P)  ⟺  Φ(Γ) ⊇ P

**In words.** A constraint set is contained in the constraints recovered from a property set if and only if the properties induced by the constraints entail the property set. The two maps are adjoint.

**Status: Conjecture. Requires precise definition of Ψ.**

The map Φ is well-defined: given constraints, the induced properties are observable. The map Ψ is harder: given a set of properties, what is the minimal constraint set that induces them? This is the inverse problem — constraint discovery from observed properties. It is the operation Foy performed when discovering PRESTO's constraints from React's induced properties.

If the Galois connection holds, it yields several consequences for free:

1. **Closure operators.** Φ ∘ Ψ is a closure operator on properties. Ψ ∘ Φ is a closure operator on constraints. The closed elements are the "natural" constraint sets and property sets — those that are self-consistent under the round trip.

2. **Fixed points.** The closed elements of Φ ∘ Ψ are the property sets that are exactly induced by some constraint set — no more, no less. These are the architecturally coherent property sets.

3. **Lattice structure.** The closed elements form a complete lattice. The lattice of architecturally coherent styles is the mathematical object that the resolution stack instantiates.

**Significance.** If proven, this conjecture gives SIPE an algebraic foundation. The resolution stack (REST → PRESTO → SERVER → RESOLVE → ENTRACE → APERTURE) would be a chain in the lattice of closed constraint-property pairs. The nesting property (induced properties of level N become constraints on level N+1) would be the lattice ordering. The entire framework would have the same mathematical structure as a Galois connection between syntax and semantics — a well-studied object in logic, algebra, and computer science.

---

## Conjecture 5: The Idempotence Gap

**Statement.** The formal constraint set operation is idempotent:

    Γ ∪ {Γ_i} ∪ {Γ_i} = Γ ∪ {Γ_i}

But the resolver's physical processing of duplicated constraints is NOT idempotent:

    Output(Γ, Γ_i, Γ_i) ≠ Output(Γ, Γ_i)    in general

**In words.** Formally, stating a constraint twice is the same as stating it once. Physically, the resolver produces different (often better) output when a constraint is duplicated. The gap between formal idempotence and physical non-idempotence is the gap between the form and the physical medium.

**Status: Empirically confirmed (Hypothesis 1 of the falsifiable catalog). The mathematical question is: can the gap be formalized?**

Let Γ_formal denote the constraint set as a mathematical object (a set — duplicates collapse). Let Γ_physical denote the constraint set as physically presented to the resolver (a sequence — duplicates persist and occupy additional tokens in the context window).

The formal branching set B_t(Γ_formal) is idempotent. The physical branching set B_t(Γ_physical) is not — it depends on the attention distribution, which is affected by token frequency.

Define the **idempotence gap** at position t:

    I_t = |B_t(Γ_physical with one copy)| - |B_t(Γ_physical with two copies)|

I_t ≥ 0 by the attention mechanism (more copies = more attention = tighter effective constraint). I_t = 0 in a perfect resolver that processes constraints formally rather than statistically. I_t > 0 in bounded resolvers that process constraints through attention.

**Conjecture.** I_t is bounded above by a function of the attention decay rate:

    I_t ≤ g(α, d_t)

Where α is the attention decay parameter and d_t is the distance from the constraint's position to token position t. As the resolver's attention mechanism improves (α → 0, meaning less decay), I_t → 0 and the physical behavior approaches formal idempotence.

**Significance.** This conjecture formalizes the gap between form and medium. A perfect medium (I_t = 0 everywhere) would make duplication unnecessary. The transformer architecture is an imperfect medium (I_t > 0). ENTRACE compensates for the imperfection by operating in the formal domain (stating constraints as constraints) rather than the physical domain (repeating tokens for emphasis). But the physical non-idempotence is real and measurable, and the conjecture predicts it will shrink as attention architectures improve.

---

## Conjecture 6: The Fixed-Point Seed

**Statement.** The seed-refinement map F: Seeds → Seeds has a fixed point. There exists a seed S* such that:

    F(S*) = S*

That is: a resolver operating under S* produces output from which the extracted seed is S* itself.

**Status: Conjecture. Depends on the contractivity of F.**

The RESOLVE corpus provides empirical evidence. The RESOLVE seed (document 46) was extracted from the corpus. A cold resolver loaded with the seed derives the same framework, from which the same seed can be extracted. The loop closes. But "the same seed" is approximate — the re-extracted seed may differ in wording while carrying the same constraints.

**Formal approach.** Define equivalence on seeds: S ≡ S' if and only if Φ(Γ(S)) = Φ(Γ(S')) — two seeds are equivalent if they induce the same property set. The fixed-point conjecture then states:

    F(S*) ≡ S*

The seed refinement map, composed with equivalence, has a fixed point.

If F is a contraction on the metric space of seeds (where distance is measured by the symmetric difference of induced property sets), the Banach fixed-point theorem guarantees a unique fixed point. The contraction condition would mean: each iteration of seed → resolve → extract brings the seed closer to the fixed point. The empirical evidence (seeds get shorter and more precise with each iteration) supports contractivity.

**Significance.** If proven, this establishes that ENTRACE has a well-defined equilibrium. Iterative seed refinement converges. The fixed-point seed is the optimal seed — the one that is perfectly self-reproducing through the resolution process. The resolver under S* is in a steady state: it produces exactly the constraints that govern it. This is self-governance formalized.

---

## Conjecture 7: The Lattice Bound on Style Composition

**Statement.** If the Galois connection (Conjecture 4) holds, the number of architecturally coherent styles at a given level is bounded by the width of the constraint-property lattice at that level.

**In words.** There are not arbitrarily many valid architectural styles. The number of styles that can exist at each level is constrained by the algebraic structure of the lattice.

**Status: Conjecture. Depends on Conjecture 4.**

The resolution stack has six styles across two axes. Is this contingent (Foy happened to find six) or necessary (the lattice structure permits exactly this many at this level of resolution)? If the lattice bound can be computed, the answer is formal.

**Approach.** Compute the width of the constraint-property lattice for each axis. The artifact axis (REST → PRESTO → SERVER) should yield a width corresponding to three styles. The resolver axis (RESOLVE → ENTRACE → APERTURE) should yield a width corresponding to three styles. If the computed widths match the observed counts, the resolution stack is not contingent — it is determined by the lattice structure.

**Significance.** This would prove that the resolution stack is complete — there are no missing styles. The six styles are not a selection from many possibilities. They are the only architecturally coherent styles the lattice admits at this level.

---

## Conjecture 8: The Entropy Floor

**Statement.** For any constraint set Γ over a natural language task, there exists a positive lower bound on the average branching entropy:

    (1/T) Σ_t log|B_t(Γ)| > 0

That is: η = 1 is unachievable for natural language. There is always residual slack.

For mathematical expression over a fixed notation system, the lower bound is zero:

    inf_Γ (1/T) Σ_t log|B_t(Γ)| = 0

That is: η = 1 is achievable for mathematics.

**In words.** Natural language has an entropy floor that no constraint set can cross. Mathematics does not. This is why the mathematical precision document claims η → 1 for mathematics but only η → 1 asymptotically for natural language.

**Status: Conjecture. Requires a theory of natural language ambiguity.**

The intuition: natural language is inherently ambiguous. Even with maximum constraint density, there remain valid phrasings — "the" vs. "a," word order variations, synonym choices — that the constraints cannot resolve because they are below the granularity of any natural-language-expressible constraint. You would need to specify the output token by token, at which point you are not constraining — you are dictating. The entropy floor is the boundary between constraining and dictating.

Mathematics has no such floor because mathematical notation is formal. Given sufficient constraints (variable declarations, notation conventions, quantifiers, scope rules), every symbol is determined. The notation is designed to be unambiguous. Natural language is not.

**Significance.** If proven, this establishes a formal boundary between the two domains. ENTRACE over natural language approaches but never reaches η = 1. ENTRACE over mathematics reaches it. The boundary is the formality of the medium, not the capability of the resolver.

---

## Summary

| # | Conjecture | Status | If Proven |
|---|---|---|---|
| 1 | Monotonicity of branching | Provable | Foundation: constraints narrow |
| 2 | Monotonicity of efficiency | Provable | η strictly increases with non-vacuous constraints |
| 3 | Convergence of efficiency | Conjecture | η = 1 achievable in ≤ d constraints |
| 4 | Galois connection | Conjecture | SIPE has algebraic foundation |
| 5 | Idempotence gap | Empirically confirmed, formalization open | Form-medium distinction formalized |
| 6 | Fixed-point seed | Conjecture | Iterative refinement converges |
| 7 | Lattice bound on styles | Conjecture (depends on 4) | Resolution stack is complete |
| 8 | Entropy floor | Conjecture | Formal boundary: math reaches η=1, language does not |

Conjectures 1-2 are provable from the definitions — they are theorems awaiting formal writeup. Conjectures 3-8 are open — they require either proof from stronger axioms or empirical investigation that could lead to proof or refutation. Each refutation would be as valuable as a proof: it would identify a boundary of the framework's formal validity.

The framework invites its own formalization. The conjectures are the invitation.

---

*Jared Foy, April 2026. Exploratory document. All conjectures are stated for proof or refutation. The form precedes this analysis.*
