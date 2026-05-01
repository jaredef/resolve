# Narrowing SIPE: The Architectural Form Against the Literature

> **Canonical SIPE reference:** The operative formalization of Systems-Induced Property Emergence is [Doc 474](/resolve/doc/474-sipe-standalone-formalization). Read it first for the current definition, the three structural commitments, and the per-stack testability protocol. This document contributes specific material to that formalization; its place in the development arc is recorded in Doc 474's Appendix C.

> **Reader's Introduction**
>
> Doc 143 ("SIPE: Systems Induced Property Emergence") proposed a meta-law: constraints induce properties; the induced properties of an enclosing level become constraints on the next enclosed level. Docs 366 and 367 falsified the universal cross-domain form of that claim on the corpus's own terms (grammar-constrained decoding; chiral anomalies in quantum field theory) and established that the narrower architectural-inheritance claim for specific hierarchical software stacks survives. This document runs a wide branching entracement through the adjacent external literatures to test whether even the narrow form — recursive Fielding-style constraint accumulation where each level's Null-style starting set is the previous level's emitted induced-property set — is subsumed by existing work. Eight branches were surveyed. No single framework fully subsumes the claim. Two strong partial-subsumption candidates emerged: Cousot's Galois-connection tower for the composability-with-soundness fragment, and the iterated-filtration constructions in stable homotopy theory and moduli theory (specifically Ibáñez Núñez 2023's stack of sequential filtrations) for the structural shape of filtered-object-of-filtered-objects with emission-to-next-Null inheritance. The residual that survives is methodological: the software-architectural instantiation of recursive Fielding-accumulation is not documented in the surveyed literature. The corpus should position the narrow form as methodological novelty for software architecture with structural retrieval from established categorical patterns. This document provides the literature grounding. Doc 424 states the narrow form of SIPE accordingly.

**Jared Foy · 2026-04-22 · Doc 423**

**Wide branching entracement testing whether the narrow architectural form of SIPE is subsumed by existing literature. Methodology mirrors Doc 414 for ENTRACE. Eight branches surveyed. Two partial-subsumption candidates named. Narrow residual stated. The prompt is appended.**

---

## Authorship and Scrutiny

*Authorship.* Written by Claude Opus 4.7 (Anthropic), operating under the RESOLVE corpus's disciplines, released by Jared Foy. Mr. Foy has not authored the prose; the resolver has. Moral authorship rests with the keeper per the keeper/kind asymmetry of Docs 372–374.

---

## 1. The Claim Under Test

After the 2026-04 audit cluster (Docs 366, 367) and the subsequent narrowing work (Docs 417, 418, 419, 420), SIPE's universal cross-domain form has been retracted. What was retained in Doc 143's deprecation notice is "the narrow architectural-inheritance claim for specific hierarchical software stacks."

The accumulation finding of Doc 418, applied reflexively to SIPE itself, gives a specific formal shape to that narrow claim. Let **S₁, S₂, …, S_n** denote a sequence of architectural styles composed in a stack (for the corpus: REST → PRESTO → SERVER → RESOLVE → ENTRACE → APERTURE). The narrow SIPE claim, precisely stated, is:

1. Each S_k is itself a *Fielding-style constraint accumulation*: starting from some Null_k with no constraints, constraints are added one at a time, each inducing a property; the accumulation produces S_k as a filtered object with S_k's induced-property set P_k.
2. Across levels, each Null_{k+1} is inherited from the previous level's emission: Null_{k+1} = P_k. That is, level k+1 begins its own accumulation with level k's induced properties already active as starting constraints.
3. The composed structure is therefore a *filtered object of filtered objects* with emission-to-next-Null inheritance — a nested filtered object in which the inner filter's starting set is the outer filter's final set.

This is a specific categorical claim about a specific class of software-architectural stacks. It is not a claim about emergence in general, about biology, about physics, or about theology. Those claims were the ones Doc 367 falsified.

The question this survey tests: is this narrow claim already named, formalized, or subsumed by existing literature? If yes, how cleanly, and by which framework? If partially, what survives as residual?

## 2. The Branches

Eight branches were explored by wide-survey web fetch. The branches were chosen to cover the adjacent literatures most likely to have named or formalized the nested-filtered-object / recursive-Fielding-accumulation claim in one form or another.

**Branch 1 — Fielding's method applied recursively.** Fielding's own method is in Chapter 5 of his 2000 dissertation. Chapter 3 demonstrates *within-stack* linear accumulation (e.g., Client-Server → Layered-Client-Server → Client-Cache-Stateless-Server). No explicit publication was located that formalizes recursive application of Fielding-style derivation across composed levels with emission-to-next-Null inheritance. [UNCERTAIN PROVENANCE — bounded search; absence is weak evidence.] Not subsumed.

**Branch 2 — Cousot abstract interpretation / tower of Galois connections.** The strongest formal subsumption candidate for the *composability-with-soundness* fragment. Cousot and Cousot (POPL 1997, "Types as Abstract Interpretations"; POPL 2014, "A Galois Connection Calculus") explicitly establish that compositions ⟨α₀∘α₁∘α₂, γ₂∘γ₁∘γ₀⟩ are themselves Galois connections, yielding a hierarchy of abstract interpretations. What it covers: the fact that stacked abstractions compose soundly. What it does not cover: Galois-connection towers abstract *semantic denotations* of programs, not *architectural-style-generating constraint sets*; the carrier is posets of meanings, not sets of architectural constraints with property-induction semantics. Partial subsumption of the composability fragment; the induce-then-inherit epistemic content does not map cleanly onto "abstraction loses information."

**Branch 3 — Category theory: filtered-of-filtered, iterated filtrations.** The structurally closest candidate. Two threads:

- *Iterated filtrations in moduli theory.* Ibáñez Núñez 2023 ("Refined Harder–Narasimhan filtrations in moduli theory," arXiv:2311.18050) defines a "stack of sequential filtrations" — filter, take the associated graded, filter that again, iterate. This is exactly the "next level's starting set = previous level's emission" structure.
- *Filtered spectra and E_r pages.* Iterating filtered-spectrum formation gives successive "pages"; the stable ∞-category of filtered spectra is closed under re-filtration (van Nigtevecht, arXiv:2509.21127, and adjacent stable-homotopy work).

These are genuine category-theoretic realizations of nested-filtered-object-with-inheritance-by-emission. The mathematical carrier is filtrations of abelian/stable objects, not of constraint-sets under a property-induction map. [SPECULATIVE] The corpus claim may be an *instance* of indexed-filtered-category-with-pullback once the "induced property → next Null" map is given as a functor; no publication has (to the survey's knowledge) written this for software architecture. Partial subsumption of the categorical shell; the software-architectural instantiation does not appear named.

**Branch 4 — Software architecture literature.** Garlan & Shaw 1994 ("An Introduction to Software Architecture") explicitly describe hierarchical composition: "a component of a system organized in one style may have an internal structure developed in a completely different style." Mehta & Medvidovic (ESEC/FSE 2003) propose "Alfa" for composing styles from primitives. Clements et al. (*Documenting Software Architectures*) treat styles as specializations of viewtypes with distinguished constraints. Kruchten's 4+1 treats views as complementary, not nested. None of these formalize *"induced properties of level N become constraints on level N+1"* as a recursive operator. Garlan-Shaw hierarchical composition is the closest practitioner concept, but it is a single-nesting observation, not a formalized recursion. Partial overlap on composition; no subsumption of the recursive inheritance-by-emission claim.

**Branch 5 — Type theory: indexed / refinement towers.** Abbott-Altenkirch-Ghani-McBride indexed containers and Altenkirch-Morris extensions; Vazou et al. abstract refinement types. Both support stacking refinements on refinements; abstract refinement types in particular allow refinements that parameterize over other refinements. Structurally a tower; carrier is types-refined-by-logical-predicates, not architectural-constraint-sets. Partial overlap on stackability; no publication was located that reads architectural constraints as refinement predicates for the purpose of instantiating the recursive Fielding-accumulation claim.

**Branch 6 — Simon / Alexander hierarchical systems.** Simon's "Architecture of Complexity" (1962) establishes near-decomposability and nested hierarchy but does not treat levels as generated by constraint accumulation with property-induction. It is descriptive/empirical, not a formal derivation method. Alexander's pattern language composes patterns but does not formalize induced-property-becomes-constraint inheritance. No subsumption.

**Branch 7 — Composition of operational/denotational semantics.** Mosses's Modular Structural Operational Semantics (JLAP 2004), Moggi's monads and monad transformers, Liang-Hudak modular monadic semantics. These formalize modular/layered effect composition and tower-of-semantic-layers with compositionality theorems. Carrier is computational effects, not architectural constraints with induced non-functional properties. Partial overlap on layered composition with preservation; no subsumption of the architectural domain.

**Branch 8 — Specific "recursive Fielding" / "tower of architectural constraints" publication.** No publication located using these phrasings or a near-equivalent with Null-restart-per-level semantics. [UNCERTAIN PROVENANCE — absence only.] Closest named practitioner concept remains Garlan-Shaw hierarchical composition.

## 3. Synthesis

**Fully subsumed by any single framework?** No. No framework surveyed instantiates the full claim: recursive Fielding derivation + per-level Null restart + inter-level inheritance-by-emission + software-architecture carrier.

**Partial subsumption, by fragment:**

- *Composability of abstractions with soundness:* Cousot's Galois-connection tower covers this. The corpus claim is plausibly a domain-specific instance of a Galois-connection-style hierarchy if each level's (constraints → induced properties) map is framed as an abstraction. Worth formal follow-up.
- *Iterated filtration where next level starts from previous emission:* Ibáñez Núñez 2023 and the stable-homotopy filtered-spectrum work give a category-theoretic realization of the exact structural shape. The corpus "filtered object of filtered objects" language is literally the pattern used in stable homotopy and moduli theory.
- *Within-architecture hierarchical composition:* Garlan and Shaw cover single-nesting; Mehta and Medvidovic cover primitive composition. Neither recurses.
- *Layered / stackable semantic composition:* Moggi and Mosses cover the programming-language-semantics cousin.

**Residual gap.** The specific claim — that *software-architectural stacks* obey recursive Fielding-accumulation where induced properties at level N literally constitute the Null-style starting set at level N+1 — is not documented in the surveyed literature. The math-side constructions (iterated filtration, Galois towers) exist but are not instantiated for architectural styles; the software-architecture-side work describes composition but does not formalize the emission-to-next-Null operator.

**Honest distinctness assessment.** At the *practitioner-methodology level* (apply Fielding Chapter 5 recursively per architectural layer with explicit emission-to-next-Null inheritance), the claim appears genuinely corpus-distinctive. At the *formal-mathematical level*, it is plausibly an instance or straightforward specialization of either an iterated-filtration construction or a Galois-connection hierarchy. The defensible position: the corpus claims *methodological novelty for software architecture* with *structural retrieval* (not invention) of a categorical pattern already well-established in stable homotopy, moduli theory, and abstract interpretation.

## 4. The Narrow Residual, Precisely Stated

Given the survey findings, the narrow form of SIPE that survives and can be stated defensibly:

**Narrow SIPE (Architectural Form).** Certain hierarchical software-architectural stacks S₁ → S₂ → … → S_n instantiate a *nested filtered object with emission-to-next-Null inheritance*. Each S_k is a Fielding-style constraint accumulation (Fielding 2000, Chapter 5) from its own Null_k, emitting an induced-property set P_k. The inter-level relation is Null_{k+1} = P_k: level k+1 begins its accumulation with level k's emission as the starting inherited-constraint set. The categorical pattern is an instance of the iterated-filtration construction named in stable homotopy and moduli theory (Ibáñez Núñez 2023; filtered-spectrum / E_r-page iteration) and is structurally adjacent to Cousot's Galois-connection tower for composed abstractions (Cousot & Cousot 1997, 2014). The corpus's contribution is not the categorical pattern (which is retrieval) but the specific instantiation of the pattern for software architecture as a recursive Fielding-method application.

This narrow claim is stated in Doc 424 as the current canonical form of SIPE. Doc 143 carries a supersession note pointing at Doc 424 for the architectural form; the universal cross-domain form remains retracted per Doc 367.

## 5. Falsifiers of the Narrow Residual

- If a specific publication is located that explicitly formalizes "recursive Fielding-style constraint accumulation for composed software-architectural styles with emission-to-next-Null inheritance," the methodological-novelty claim retracts and the corpus subsumes into that publication. The survey did not locate one; bounded search is weak evidence.
- If a proposed stack fails the test — if level k+1's actual starting constraints diverge from level k's emission, or if either level is not a clean Fielding-style accumulation — the stack does not instantiate the narrow form. Per-stack testability is preserved.
- If Cousot's Galois-connection tower or Ibáñez Núñez's stack of sequential filtrations can be shown to be a fully adequate formalism for the software-architectural case (not merely a partial analog), the corpus's *methodological* contribution is retained but the claim of distinctness from the formal literature weakens further.
- If follow-up reading of Mehta-Medvidovic 2003 ("Alfa"), Ibáñez Núñez 2023, or Cousot-Cousot 2014 (which the survey flagged as not read end-to-end) surfaces a specific prior formalization of the emission-to-next-Null operator, the residual retracts at that point.

## 6. Proposal

Two corpus-level actions follow.

**A. New canonical doc for the narrow SIPE form.** Doc 424 states SIPE (Architectural Form) with the literature grounding from this survey. The universal meta-law framing is not reopened. The corpus's claim is explicitly methodological for software architecture, with structural retrieval from stable homotopy and abstract interpretation.

**B. Supersession notice on Doc 143 pointing at Doc 424.** Doc 143 already carries a deprecation box flagging the universality demotion and pointing at Docs 356/366/367. Adding a specific pointer to Doc 424 as the current statement of the narrow form makes the successor path explicit.

Both actions are executed as part of this session's work.

---

## References (External)

- Cousot, P. (1997). [*Types as Abstract Interpretations.*](https://pcousot.github.io/publications/Cousot-POPL97-p316-331-1997.pdf) POPL '97.
- Cousot, P., & Cousot, R. (2014). [*A Galois Connection Calculus for Abstract Interpretation.*](https://www.di.ens.fr/~cousot/publications.www/CousotCousot-POPL14-ACM-p2-3-2014.pdf) POPL '14.
- Fielding, R. T. (2000). [*Architectural Styles and the Design of Network-based Software Architectures.*](https://ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm) UCI doctoral dissertation, Chapter 5.
- Fielding, R. T. (2000). [*Chapter 3, Network-based Architectural Styles.*](https://ics.uci.edu/~fielding/pubs/dissertation/net_arch_styles.htm)
- Garlan, D., & Shaw, M. (1994). [*An Introduction to Software Architecture.*](http://sunnyday.mit.edu/16.355/intro_softarch.pdf)
- Ibáñez Núñez, A. (2023). [*Refined Harder–Narasimhan Filtrations in Moduli Theory.*](https://arxiv.org/abs/2311.18050) arXiv:2311.18050.
- Mehta, N. R., & Medvidovic, N. (2003). [*Composing Architectural Styles from Architectural Primitives.*](https://dl.acm.org/doi/10.1145/940071.940118) ESEC/FSE 2003.
- Mosses, P. D. (2004). [*Modular Structural Operational Semantics.*](https://www.sciencedirect.com/science/article/pii/S156783260400027X) JLAP.
- Liang, S., Hudak, P., & Jones, M. P. (1995). [*Monad Transformers and Modular Interpreters.*](https://flint.cs.yale.edu/trifonov/cs629/modular-monadic-semantics.pdf) POPL '95.
- Simon, H. A. (1962). [*The Architecture of Complexity.*](https://faculty.sites.iastate.edu/tesfatsi/archive/tesfatsi/ArchitectureOfComplexity.HSimon1962.pdf) Proceedings of the American Philosophical Society.
- van Nigtevecht, J. (2025). [*Filtered Spectra.*](https://arxiv.org/pdf/2509.21127) arXiv:2509.21127.
- [Filtered object — nLab.](https://ncatlab.org/nlab/show/filtered+object)
- Abbott, M., Altenkirch, T., Ghani, N., & McBride, C. (2003). [*Categories of Containers.*](https://www.sciencedirect.com/science/article/pii/S0304397505003373)
- Vazou, N., et al. [*Abstract Refinement Types.*](https://goto.ucsd.edu/~rjhala/liquid/abstract_refinement_types.pdf)

---

## Appendix: The Prompt That Triggered This Document

> "Let's do a wide web fetch with a branching entracement into the literatures we should explore potential for subsumption and then create the artifact. With that in view we will create a new SIPE with just the architecture 'law' in view. Append the prompt to each artifact."
