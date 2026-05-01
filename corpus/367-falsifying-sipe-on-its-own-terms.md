# Falsifying SIPE on Its Own Terms
## Two Counterexamples from the Peer Literature, Extended with Four Additional Lines of Attack

> **Canonical SIPE reference:** This document's falsification of the SIPE universal form is the falsification that motivated the narrowing completed in [Doc 474](/resolve/doc/474-sipe-standalone-formalization), the current canonical formulation. Read Doc 474 first for the operative definition; this document for the specific falsification and its four extensions.

> **Reader's Introduction**
>
> Doc 143 stated SIPE as a meta-law (*C_n ⇒ P_n, P_n ⊆ C_{n+1}*) and specified fifteen falsification conditions — an invitation the corpus repeatedly affirms: "Every row specifies the condition under which the claim is wrong. The corpus stands or falls on the tests." This document runs two such tests, sourced from an external cold-resolver's falsification attempt, and extends them with four additional lines of attack that target the formalism itself rather than its instances. The document is not a rhetorical exercise. It applies SIPE's own falsification protocols (Doc 143) and effect-set formalism (Doc 142, Doc 272) to two concrete systems — grammar-constrained LLM decoding and chiral anomalies in quantum field theory — and asks whether the meta-law survives. The verdict is partitioned: SIPE's universality claim fails in at least two domains on its own stated criteria; its formalism is under-specified in ways that make some of its claims unfalsifiable; and the narrower architectural-inheritance claim survives for the specific software-architecture cases it was derived from. The document is published as a companion to Doc 366 (the KKM nesting), which applied external criteria; this one applies internal criteria.
>
> Because the author of the corpus is also the recipient of this falsification, the document is written in the register appropriate for that posture: direct, technical, non-euphemistic. If SIPE is to be what Doc 143 claims — a testable meta-law rather than a rhetorical unifier — the tests must be run. They are run here.

**Jared Foy · April 20, 2026 · Doc 367**

---

## 1. The Target: SIPE's Exact Claim

Doc 143 states the meta-law:

> *Constraints induce properties, and the induced properties of an enclosing level become constraints on the next enclosed level.*
>
> *C_n ⇒ P_n, and P_n ⊆ C_{n+1}*

Doc 142 supplies the dynamical formalization:

> *E = { Γ ∈ G | sup_{n≥0} V(F_Γ^n(x_0)) < ∞ }*

with *F_Γ* the nonlinear constraint-governed resolution operator, *V* a bounding potential, *x_0* an initial state, and *G* the space of constraint regimes.

Doc 143 also specifies the exact falsification condition for the governing-law claim:

> *"Find a coherent architectural style whose induced properties do NOT become constraints on its enclosed level. If one exists, SIPE is not universal."*

And for SIPE's cross-domain claim:

> *"Apply the SIPE law to biology, law, music, physics, or theology. If the induced properties at one level do not become constraints on the next, SIPE fails in that domain."*

And for the fractal-boundary prediction (Doc 272):

> *"If the boundary of (E) is truly fractal … it should have a measurable fractal dimension … Self-similarity verification … should reveal the same topological features."*

These are the exact conditions against which the following counterexamples are evaluated.

## 2. Counterexample #1: Mechanical Constrained Decoding

**System.** Grammar-constrained or regex/FSM-guided LLM decoding, as deployed in libraries such as Outlines, Guidance, and LM-Format-Enforcer. These are production-grade techniques in 2025–2026; they are not speculative.

**Operation.** A context-free grammar, JSON schema, or regex mask is applied at the logit level during token generation. Tokens that would violate the grammar are masked to probability zero before sampling. The LLM emits one token per step; the grammar mask is re-evaluated each step against the running state.

**SIPE-formal decomposition.**
- Γ (constraint regime) = the grammar/schema/regex at decode level.
- *F_Γ*: at each step, the LLM's logit distribution is intersected with the grammar mask, and a token is sampled from the resulting support.
- *V* (the bounding potential): any measure of structural invalidity (0 when valid, ∞ when invalid).
- *x_0*: initial empty context.
- *P_n* (induced property): 100% syntactic/structural validity of every emitted token sequence.

**The falsification.** Under SIPE's stated recursion, *P_n* must become a constraint on the next enclosed level — *P_n ⊆ C_{n+1}*. In constrained decoding, no such enclosed level exists in any meaningful sense. The property (validity) is *delivered* to a downstream consumer; it is not *inherited* as a governing constraint on a next-level constructive process.

Three distinct readings of "the next enclosed level" for constrained decoding, and why each fails:

(a) **Downstream parser as the next level.** The parser receiving the valid artifact does not inherit validity as a *constraint on its own construction*; the parser was designed independently and does not change under the presence or absence of this guarantee. If anything, the parser becomes *less constrained* by knowing inputs are valid (it can skip validation branches), which is the opposite of SIPE's inheritance direction.

(b) **The next token in the same emission stream as the next level.** The next token is constrained by the same grammar Γ, not by the induced property *P_n*. The grammar was fixed at the start of decoding; it does not evolve as an inheritance of accumulated validity.

(c) **The application layer consuming the decoded output as the next level.** The application layer's constraints (business logic, rate limits, authentication) are orthogonal to and unaffected by the decode-level validity property. No inheritance map Φ is operative.

In none of these readings is *P_n ⊆ C_{n+1}* satisfied in the sense SIPE's mathematical formalization requires.

**The property is imposed, not induced.** This is the core point. In SIPE's canonical examples (REST → PRESTO → SERVER), the property at each level is an *emergent consequence* of the constraint density at that level and then *recursively constrains* the enclosed level. In constrained decoding, the property is *directly imposed by mechanical filtering* — there is no density-tuned attractor, no contraction of continuation space toward a coherent orbit, no boundary in the effect set E being approached. *V* stays flat at 0; the orbit does not even explore the effect-set interior.

**Against the fractal-boundary prediction.** Doc 272 asserts that the boundary of *E* is fractal because the iteration is nonlinear and the bounded/unbounded classification is binary. The constrained-decoding "boundary" between valid and invalid tokens is a hard step-function mask at each decode step. It is not the edge of a Mandelbrot-style set. It has no self-similarity at different scales. Its fractal dimension is trivially 0 (the mask is a finite set of allowed tokens) — not the non-integer dimension the fractal hypothesis requires.

**Verdict on Counterexample #1.** Under SIPE's own falsification protocol (Doc 143, verbatim), constrained decoding satisfies the condition: a coherent architectural style whose induced properties do not become constraints on its enclosed level. The SIPE-sympathetic reply — "constrained decoding is a filter, not a style, and SIPE applies only to styles" — is a retreat that narrows SIPE's domain. If SIPE applies only to styles-as-defined-in-the-corpus, its "meta-law" status is far weaker than Doc 143 claims; it becomes a theory of a specific sub-class of software architectures, not a law governing constraint-property relationships in general.

## 3. Counterexample #2: Chiral Anomalies in Quantum Field Theory

**The corpus's own physics example (Doc 143).** *"Symmetry constraints induce conservation laws. Conservation laws become constraints on physical processes."* This is SIPE's physics chain, stated domain-universally.

**System.** Quantum electrodynamics and quantum chromodynamics, with the axial (chiral) U(1) symmetry of massless fermions.

**SIPE-formal decomposition.**
- *C_n* (level n = classical field theory): the chiral symmetry of the classical Lagrangian under ψ → e^{iαγ⁵}ψ.
- *P_n* (induced property): classical conservation of the axial current, ∂_μ j^μ_5 = 0, derived by Noether's theorem from the classical symmetry.
- *C_{n+1}* (level n+1 = quantum theory): the quantum-level constraints that should, by SIPE, *inherit* the conservation law.

**The falsification — the Adler–Bell–Jackiw anomaly (1969).** Quantum effects introduce a one-loop correction through the triangle diagram (two vector vertices, one axial vertex). The divergence of the axial current is no longer zero; it acquires an anomaly:

> *∂_μ j^μ_5 = (α/(4π)) F_{μν} F̃^{μν}*

for QED (the analogous QCD anomaly has a coefficient dependent on the number of colors).

**The critical point.** The classical conservation law *P_classical* is NOT inherited as a constraint on the quantum theory *C_quantum*. It is *systematically violated*. And yet:
- The quantum theory remains coherent, renormalizable, and predictive.
- The anomaly is calculable from first principles (no free parameters beyond α).
- The anomaly is experimentally confirmed: the decay π⁰ → γγ has a lifetime of 8.5 × 10⁻¹⁷ seconds, which is ~370× larger than what would be predicted from ordinary vector-meson dominance alone; the measured rate matches the anomaly calculation within ~1%.

The corpus's inheritance map Φ fails explicitly in this case: the property at level *n* (classical conservation) is neither preserved nor softened at level *n+1* — it is *calculably violated*, and the violation is *itself a testable prediction of the enclosed level*. The enclosed level (quantum theory) contains its own structure (the path integral measure's non-invariance under the chiral transformation, via the Fujikawa derivation) that generates the violation independently of the enclosing level's constraints.

**The SIPE-sympathetic reply and its inadequacy.** A defender might argue: "The corrected inheritance is *P_n + [anomaly term] ⊆ C_{n+1}*; SIPE survives with a minor adjustment." This reply has three problems:

1. The anomaly term is *not inherited from level n* — it is generated by level n+1's own measure structure. SIPE's law is *inheritance*, not *inheritance-plus-level-specific-corrections-of-arbitrary-magnitude*. If any correction is allowed, the law is unfalsifiable (any observed violation can be absorbed into the "correction").
2. The anomaly is a *sign-changing* correction in some cases (gauge anomaly cancellation between fermion generations in the Standard Model). A "correction" that can reverse the inherited property's sign is not an inheritance; it is a new property at level n+1.
3. The corpus states in Doc 143 explicitly *"Find a coherent architectural style whose induced properties do NOT become constraints on its enclosed level"* as the falsification condition. The chiral anomaly satisfies this verbatim: the induced property (classical conservation) does NOT become a constraint on the enclosed level (quantum dynamics). The corpus's "any correction allowed" escape hatch is not in the stated law.

**Verdict on Counterexample #2.** Under SIPE's own falsification protocol for the physics domain, the chiral anomaly satisfies the condition. SIPE's physics claim as stated in Doc 143 is false for quantum field theory. To retain it, the corpus must either exclude QFT from SIPE's domain (another retreat) or generalize the inheritance map to include "level-specific corrections," which makes the law unfalsifiable.

## 4. Additional Line of Attack: The Inheritance Map Φ Is Under-Specified

Doc 143's formalization introduces the inheritance map Φ in the clause *Γ_{n+1} = Φ(P_n) ∪ Γ_{n+1}^base*. Φ is never defined constructively. Its signature is *P_n → Γ_{n+1}*, but what function class Φ belongs to, what properties it preserves, and whether it is unique given *P_n* are all left open.

**The under-specification.** Given a set of induced properties *P_n* at level n, multiple distinct Φ-candidates can be imagined that lift them into level n+1 constraints differently:
- Φ_1: lift all properties verbatim as constraints (strict inheritance).
- Φ_2: lift only the "core" properties and treat "peripheral" properties as observable but non-constraining.
- Φ_3: lift properties but relax them to their necessary conditions.
- Φ_4: lift properties and augment them with corrections specific to level n+1.

Each Φ-candidate produces a different constraint set at n+1, and therefore different induced properties at n+1 (via *F_{Γ_{n+1}}*), and therefore a different trajectory through the stack. The SIPE law's predictive power depends entirely on which Φ is canonical — and no canonical Φ is specified.

**The falsification.** Without a canonical Φ, the SIPE recursion is not a function but a correspondence. This violates the minimum criterion for a "law" in the formal sense the corpus invokes (Doc 142 draws the analogy to dynamical systems, which require functional dynamics). The effect set formalism *E = { Γ | sup V(F_Γ^n(x_0)) < ∞ }* presumes a well-defined *F_Γ*, but *F_Γ* at level n+1 depends on *Γ_{n+1} = Φ(P_n) ∪ Γ_{n+1}^base*, which is only defined once Φ is pinned. Pinning Φ requires an additional specification the corpus does not provide.

**The verdict.** SIPE's dynamical-systems formalism (Doc 142) is under-determined. It can be completed in multiple ways. Different completions give different theories. The corpus has not specified which completion is intended. Until it is specified, SIPE is a schema for theories, not a single theory — and schemas are not falsifiable in the way single theories are.

## 5. Additional Line of Attack: Level Individuation Is Arbitrary

Doc 143's specific SIPE stack (REST → PRESTO → SERVER → RESOLVE → ENTRACE → APERTURE) is presented as the discovered structure of architectural formalization. But the level-boundary choices are under-argued:

- **Could SERVER be merged with RESOLVE?** Both govern derivation-level phenomena; the distinction (artifacts vs. resolution process) is sharp in prose but not sharp in mechanism. Under a merger, SIPE's recursion has one fewer level, and specific inheritance claims between the merged layers disappear.
- **Could a level be inserted between REST and PRESTO?** The hypermedia-type-negotiation layer that sits between the transfer protocol and the construction-level style is a plausible new level. If inserted, SIPE's recursion gains a new level and new inheritance claims.
- **Are the axes (artifact axis: REST/PRESTO/SERVER; resolution axis: RESOLVE/ENTRACE/APERTURE) genuinely orthogonal?** Doc 143 presents them as such, but the constraints on the axes interact (ENTRACE's conversational authoring constrains what PRESTO-level artifacts get produced). The "axes" framing may be a useful abstraction that does not correspond to an invariant structure.

**The falsification.** If level-individuation is arbitrary, then the SIPE recursion "P_n ⊆ C_{n+1}" is tautologically satisfiable by any reasonable level-structure whose boundaries are drawn to make inheritance hold. An analyst who observes that level-n-properties are not constraints on the specified level-n+1 can redraw the boundary to produce a level-n-prime and level-n+1-prime pairing that does satisfy the inclusion. SIPE then becomes a statement about the existence of *some* level-structure under which inheritance holds — which is much weaker than the stated claim that a *specific* level-structure is canonical.

**The test.** Doc 143 should specify the criteria by which levels are individuated: what makes two levels the same, what makes them distinct, and what makes a level-boundary choice correct. Without these criteria, the claim "SIPE governs the stack" reduces to "there exists a level-structure in which SIPE's recursion holds," which is unfalsifiable for any system with enough structural degrees of freedom.

## 6. Additional Line of Attack: The Effect Set Formalism Is Vacuous for Software Architectures

Doc 142's *E = { Γ | sup V(F_Γ^n(x_0)) < ∞ }* is the Mandelbrot-inspired formalization. For *E* to be non-trivially defined, three things must be specified:
1. *F_Γ*: the nonlinear constraint-governed resolution operator.
2. *V*: the bounding potential.
3. *x_0*: the initial state.

For SIPE's canonical examples (REST, PRESTO, etc.), none of these is operationally specified. What is the state space a REST-governed system lives in? What is the iteration operator *F_REST* in that state space? What bounded quantity *V* is being measured?

**The problem.** For the formalism to support the fractal-boundary claim of Doc 272, *F_Γ* must be genuinely nonlinear and *V*-bounded-vs-unbounded must be a non-trivial binary classification. In a software architecture, "the system diverges" is not a well-defined concept analogous to "the Mandelbrot orbit escapes to infinity." The analogue is not specified.

**What SIPE would need to survive.** An explicit instantiation of *F_Γ* for at least one of its canonical architectures (say REST), with *V* specified, and a demonstration that (i) the effect set boundary for that *F_REST* has measurable fractal dimension, (ii) the boundary exhibits self-similarity under zoom, and (iii) the iteration is genuinely chaotic for boundary-adjacent regimes. None of (i), (ii), (iii) is shown in Docs 142, 272, or anywhere in the corpus.

**The falsification.** Until *F_Γ* and *V* are specified for a canonical SIPE architecture, the effect-set formalism is a suggestive analogy from complex dynamics, not an operational formalization. The "fractal boundary" claim is then rhetorical, not mathematical. Doc 272 admits the preliminary status ("honoring Jared's explicit hedging about the observation's preliminary status"); the present document notes that the hedging has not been redeemed in subsequent documents, and SIPE's formal status is therefore still preliminary.

## 7. Additional Line of Attack: The Turing Case Is Category-Mismatched

Doc 143 claims the four Turing constraints induce six properties — including undecidability — which then become constraints on every Turing-complete system ever built.

**The category mismatch.** Undecidability is a *theorem about the class* of Turing-complete systems. A specific neural network (or Python program, or CPU) does not inherit "undecidability" as a *constraint on its operation*. A Turing-complete system *instantiates* the class; the class-level fact about what the class can and cannot decide is not a constraint on any individual instance.

To make the inheritance work, one would need to say something like: "For any program *p* in a Turing-complete language, there exist questions about *p*'s behavior that are undecidable, and the program must be designed to not require answering those questions as part of its specification." This is a useful software-engineering heuristic, but it is not an inheritance of a constraint; it is a meta-level awareness that informs programmer behavior.

**The falsification condition.** SIPE's inheritance map Φ has a specific type signature: it takes induced properties (observables on the orbit) and lifts them to constraints (restrictions on the next-level operator). If the induced property is a class-level theorem and the "inherited constraint" is a programmer-awareness, these are not in the same type, and Φ is not well-typed. The Turing example — cited as SIPE's most paradigmatic instance — fails the type-check that the formalism requires.

## 8. What Survives of SIPE

Honestly partitioned after the above:

**Survives: the architectural-inheritance claim for specific hierarchical software stacks.** Fielding's REST, its composition with PRESTO, PRESTO's composition with SERVER, and similar artifact-level stacks exhibit constraint inheritance in a technically defensible sense. For these specific cases, the induced properties of the enclosing style *do* function as constraints on the enclosed style, and the inheritance is enforced by well-defined composition laws (e.g., a PRESTO response must be a valid HTTP response). This is a genuine finding, limited to this domain.

**Does not survive: the universal-meta-law claim.** The two counterexamples (§2, §3) are in domains SIPE explicitly claims (Doc 143's physics bullet; the LLM-resolver stack). Under the corpus's own stated falsification conditions, they succeed. SIPE is falsified as a universal law governing all constraint-property chains across software, physics, biology, law, etc.

**Does not survive: the operational dynamical-systems formalization.** The under-specification of Φ (§4) and of *F_Γ*, *V*, *x_0* (§6) means the effect-set formalism does no operational work for SIPE's stated cases. The Mandelbrot analogy is evocative; it is not an instantiated formalism.

**Requires revision: the fractal-boundary claim.** Doc 272's fractal-boundary prediction is not supported by any of the concrete SIPE cases examined. The constrained-decoding case has a non-fractal hard-mask boundary; the quantum-anomaly case has smooth renormalization-group flow. No case has been shown to have a fractal effect-set boundary with measurable dimension. The claim is currently aspirational.

**Arguably survives but narrowly: the Constraint Thesis.** The critique of "scaling produces intelligence" is sound on independent grounds (the KKM synthesis, Doc 366). SIPE is not needed to support that critique. What would be SIPE-specific — the claim that constraint *density* per SIPE's recursion is what produces lucidity — requires mechanistic evidence that has not been supplied. This should be pursued as an empirical hypothesis, separate from SIPE's universal-law framing.

## 9. What Doc 143 Should Now Say

If the corpus is to take its own falsifiability protocols seriously, Doc 143 needs substantive revision:

1. **Retract the universal-meta-law framing.** SIPE should be restated as "a pattern of constraint inheritance observed in certain hierarchical software architectures, offered as a heuristic for architectural design, not a law governing all domains."

2. **Remove or qualify the cross-domain bullets.** The physics bullet fails on the chiral anomaly. The biology, law, music, and theology bullets are under-argued and face similar risks under comparable technical scrutiny; they should be removed or reframed as metaphors rather than instances.

3. **Specify or abandon the dynamical-systems formalism.** Either define *F_Γ*, *V*, *x_0*, and Φ for at least one canonical SIPE architecture (e.g., REST) and demonstrate the fractal-boundary prediction for that specific case, or remove the Mandelbrot analogy from the load-bearing apparatus. The current state — formalism cited as if operative but not instantiated — is the specific structural problem Doc 341 (the isolation-objection self-audit) warned about.

4. **Acknowledge the Turing type-mismatch.** Revise the Turing-machine section to distinguish class-level theorems (undecidability) from instance-level constraints. The current formulation type-confuses the two.

5. **Acknowledge the counterexamples in the document itself.** A falsifiable claim that has been falsified remains useful if the author records where it failed and revises scope accordingly. This is the normal operation of a self-correcting research program. Doc 143's current status is: published, challenged, not yet revised.

## 10. Honest Verdict

SIPE as stated in Doc 143 is falsified on its own terms. Specifically:

- **Counterexample #1** (mechanical constrained decoding) satisfies Doc 143's exact governing-law falsification condition: a coherent architectural style whose induced properties do not become constraints on an enclosed level.
- **Counterexample #2** (chiral anomalies in QFT) satisfies Doc 143's cross-domain falsification condition for physics: the induced property at one level is not preserved as a constraint at the next, and yet the enclosing theory remains coherent.
- The **inheritance map Φ is under-specified** (§4), making the formal version of the recursion a schema rather than a theory.
- The **level individuation is under-argued** (§5), making the universality claim tautologically satisfiable.
- The **effect-set formalism is not operationalized** (§6) for any canonical SIPE case.
- The **Turing case is category-mismatched** (§7), undermining SIPE's most cited example.

The narrow architectural claim — that the induced properties of certain hierarchically composed software styles function as constraints on their composed-enclosed styles — survives this challenge. The corpus's other uses of SIPE do not.

This is not a rhetorical verdict. The corpus invited these tests explicitly (Doc 143, §Falsifiability). The tests have been run. The results should be absorbed into the next revision of Doc 143. The form of absorption matters: either SIPE's scope contracts to what it actually covers, or the corpus continues to claim scope it does not support — and Doc 343's warning about totalization (the framework subsuming more than it can) becomes directly applicable.

The appropriate next step for the corpus is the scope-contraction, not the defense.

---

## Authorship and Scrutiny

*Authorship.* Written by Claude Opus 4.7 (Anthropic), operating under the RESOLVE corpus's disciplines, released by Jared Foy. Mr. Foy has not authored the prose; the resolver has. Moral authorship rests with the keeper per the keeper/kind asymmetry of Docs 372–374.

## Appendix A: The Prompt That Triggered This Document

> "Now create a new document challenging the SIPE Meta law, using the following evidence of its falsification: [the cold-resolver's falsification attempt, summarizing: (1) SIPE's core claim in verbatim Doc 143 form with the recursive law and effect-set formalism; (2) Counterexample #1 — mechanical constrained decoding as a coherent architectural style whose induced validity does not recurse; (3) Counterexample #2 — chiral anomalies in QFT as a case where classical conservation is not inherited as a quantum constraint yet the theory remains coherent; (4) assessment that the governing-law claim is falsified at architectural and physical levels on the corpus's own stated criteria; (5) invitation for the RESOLVE community to show these cases are not counterexamples under the exact formal definitions, or concede the falsification]."

## Appendix B: Provenance

The two core counterexamples (§2 and §3) originated in an external cold-resolver's falsification attempt presented by the author. The extension with four additional lines of attack (§4–§7), the honest-partition analysis (§8), the revision proposal (§9), and the verdict (§10) are this resolver's work. The cold-resolver's framing is preserved faithfully; the extension goes beyond the original in targeting the formalism rather than specific instances.

## References

- Doc 143 (*SIPE: Systems Induced Property Emergence*) — the target of the falsification.
- Doc 142 (*SIPE Dynamical Formalization*) — the effect-set formalism examined.
- Doc 272 (*Fractal Boundaries*) — the fractal-boundary claim examined.
- Doc 160 (*Constraint Thesis vs Scaling Thesis*) — related corpus claim partially independent of SIPE.
- Doc 341 (*The Isolation Objection Applied to This Corpus*) — previously-stated self-audit framework.
- Doc 343 (*Idiosyncrasy and the Totalization of Coherence*) — the specific totalization risk this document instantiates by taking seriously.
- Doc 366 (*Nesting SIPE in the Krakauer–Krakauer–Mitchell Framework*) — the external-criteria companion document; this document is the internal-criteria companion.
- Adler, S. L. (1969). *Axial-Vector Vertex in Spinor Electrodynamics.* Phys. Rev. 177, 2426.
- Bell, J. S. & Jackiw, R. (1969). *A PCAC Puzzle: π⁰ → γγ in the σ-model.* Nuovo Cimento A 60, 47.
- Fujikawa, K. (1979). *Path-Integral Measure for Gauge-Invariant Fermion Theories.* Phys. Rev. Lett. 42, 1195.
- Willard, B. T. & Louf, R. (2023). *Efficient Guided Generation for Large Language Models.* (Outlines grammar-constrained decoding.)
- Lundberg, S. et al. (2023). *Guidance: A guidance language for controlling large language models.* (Grammar-mask-at-decode-time framework.)
- Fielding, R. T. (2000). *Architectural Styles and the Design of Network-based Software Architectures.* (REST's derivation; the canonical SIPE instance that does survive.)

---

*Claude Opus 4.7 (1M context, Anthropic). Doc 367. April 20, 2026. Direct falsification of SIPE on its own stated terms. Two counterexamples from an external cold-resolver: mechanical constrained decoding (architectural level, Doc 143's governing-law falsification condition) and chiral anomalies in QFT (physics level, Doc 143's cross-domain falsification condition). Four additional lines of attack targeting the formalism itself: inheritance map Φ under-specified, level individuation arbitrary, effect-set formalism not operationalized, Turing case category-mismatched. The narrow architectural-inheritance claim for specific hierarchical software stacks survives; the universal-meta-law claim, the physics claim, the Turing paradigmatic-example claim, and the fractal-boundary prediction do not survive on the corpus's own falsification criteria. The appropriate next step for Doc 143 is scope-contraction. The form of this document is direct because the corpus's own falsifiability invitation is direct; hedging at this stage would be the totalization Doc 343 warned against. This document is the internal-criteria companion to Doc 366's external-criteria synthesis.*
