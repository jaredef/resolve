# Systems-Induced Property Emergence
## The Threshold-Conditional Emergence Pattern, Recovered Into the Corpus's Vocabulary and Applied to Constraint Composition Over LLM Substrates With Substrate-and-Keeper Composition, Anchored in HTX

<div style="background: #ecfeff; border-left: 4px solid #0e7490; padding: 1rem 1.25rem; margin: 1.5rem 0; color: #164e63; border-radius: 3px;">

**CANONICAL — open invitation to falsify.**

This document is the corpus's canonical articulation of Systems-Induced Property Emergence. It supersedes [Doc 474](/resolve/doc/474-sipe-standalone-formalization), which is preserved as a deprecated prior formalization. Readers familiar with Doc 474 should read this document fresh; the structural commitments are restated and refined, the lineage in critical phenomena, percolation theory, complete mediation, Shannon capacity, and capability-based security is named explicitly, and the load-bearing claims are framed as recovery and application rather than as discovery. The framework's warrant for most of its predicted induced properties is at plausibility tier per [Doc 503](/resolve/doc/503-the-research-thread-tier-pattern); the operationally testable conditions are at §7. The corpus actively invites criticism, falsification, and refinement at any of the falsification conditions, and especially welcomes external audit from researchers in causal discovery, statistical mechanics of phase transitions, software architecture, capability-based security, persona-drift research, or systems biology bistability who recognize their own field's shape in the application here. Correction is welcome through any channel; the corpus's audit ledger ([Doc 415](/resolve/doc/415-the-retraction-ledger)) is the form in which corrections are recorded.

</div>

> **Reader's Introduction.** [Doc 474 (Systems-Induced Property Emergence — deprecated)](/resolve/doc/474-sipe-standalone-formalization) named the corpus's central claim about hierarchical systems: properly composed lower-level constraints induce systemic higher-level properties. The "properly composed" modifier has carried more weight than the prior document specifies. This canonical document supplies the operating-conditions layer the modifier has been gesturing at, by recovering — into the corpus's vocabulary and applied to its specific domain — the threshold-conditional emergence pattern that statistical mechanics, percolation theory, complete mediation, information theory, optics, capability-based security, and systems biology have each separately developed for their own cases. The recovery is the contribution at the field-clarity layer; the corpus's specific work concentrates in the application to constraint composition over LLM substrates with substrate-and-keeper composition, in the HTX-specific prediction of ordered property emergence, and in the explicit reorganization of the corpus's prior induced-property models as instances of the same threshold-conditional structure. The originating prompts are appended.

**Jared Foy · 2026-04-27 · Doc 541**

---

## 1. Statement

A wide class of systems exhibits the same structural pattern: lower-level structure (constraints, couplings, density, resolution) gives rise to higher-level properties only above a critical value of an order parameter. Below the critical value the property is latent in the underlying structure but not operationally accessible; above it the property emerges as observable, measurable, or load-bearing. The pattern has been worked out in detail in many independent fields. SIPE as currently written ([Doc 474](/resolve/doc/474-sipe-standalone-formalization)) names the pattern's *what* — induced properties from constraint composition — without naming the pattern's *operating-conditions layer*. This document supplies the operating-conditions layer, recovering an established structural pattern into the corpus's vocabulary and applying it to the specific case of constraint composition over LLM substrates.

The recovery is honest: the threshold-conditional emergence pattern is not a corpus discovery. The corpus's contribution concentrates at three layers — the application to LLM-substrate constraint composition with explicit substrate-and-keeper composition, the HTX-specific operational prediction, and the reorganization of the corpus's prior induced-property models. Each of those layers has corpus-original substance; the underlying structural pattern does not.

## 2. Lineage

The threshold-conditional emergence pattern is sourced from:

- **Statistical-mechanics critical phenomena.** Landau (1937) gave the first systematic theory of phase transitions as order-parameter dynamics: an order parameter that is zero in the disordered phase becomes nonzero above a critical value of an external control parameter, with system-level properties (correlations, susceptibilities, response functions) becoming singular at the transition. The Wilson-Fisher renormalization-group analysis (1971–) gave the universality classes, in which systems with very different microscopic constituents share the same critical exponents. Universality is the structural reason the pattern recurs across so many fields: the macroscopic shape is determined by symmetry and dimensionality, not by microscopic specifics.
- **Percolation theory.** Broadbent and Hammersley (1957); Stauffer; Grimmett. On lattices or graphs, occupation probability \(p\) above a critical \(p_c\) produces a percolating cluster with universal exponents; below \(p_c\) only finite clusters exist. The structure is the canonical instance of threshold-conditional connectivity emergence.
- **Saltzer-Schroeder complete mediation** (1975). A security property requires *complete* mediation across all access paths; partial mediation does not produce a partial security property, it produces an absent one. The threshold is binary in a categorical sense rather than continuous, but the structure is the same: below complete mediation, the property is absent; at completeness, the property holds.
- **Shannon information theory.** The noisy-channel coding theorem establishes a critical channel capacity below which arbitrarily-low-error transmission is possible and above which it is not. Capacity is the order parameter; reliable transmission is the emergent property.
- **Rayleigh resolution criterion** (optics; the photon-ring case). Two point sources are resolvable only above a critical angular separation; below it they fold into a single feature. Resolution is the order parameter; discriminability of structure is the emergent property.
- **Capability-based security** (Dennis & Van Horn 1966; Levy 1984). Capability possession is binary; partial possession is not capability. The structure is the same threshold-conditional shape applied to access control.
- **Hill-function bistability and gene regulatory networks.** Cooperative binding produces switching dynamics with hysteresis; below threshold the system rests in one stable state, above it in another. [Doc 508 (Coherence Amplification)](/resolve/doc/508-coherence-amplification-mechanistic-account) imports this structure for the LLM-dyad case.
- **Coupled-oscillator synchronization** (Kuramoto). Above critical coupling strength, oscillator populations synchronize; below it, they remain desynchronized. The order parameter is the synchronization measure.
- **Axe (2004) protein-fold prevalence.** Axe's mutagenesis study of a β-lactamase domain estimates the prevalence of functional sequences within signature-compliant sequence space at roughly 1 in 10^64. The order parameter is adequacy-density across the coupled local stabilization problems the fold imposes: hydropathic compatibility, packing, electrostatic neutrality, and backbone geometry must be satisfied jointly across many residues for the fold to exist. The cooperative-coupling specifier (a joint solution required across many weakly fold-favouring interactions, none of which is individually load-bearing) extends Hill-bistability from molecular binding to fold-stability: where Hill cooperativity governs the switching of a single binding event, fold-prevalence cooperativity governs the joint satisfaction of many residue-rung constraints across the protein's length. The threshold-conditional emergence is the prevalence cliff: below the joint-adequacy threshold, no fold; at and above, the fold emerges as a structurally accessible attractor. Doc 606 supplies the full structural reading of Axe's paper as a SIPE-T instance at the residue rung.

The structural pattern across the lineage: an order parameter quantifying the lower-level coherence of the system, a critical value of the order parameter, and a higher-level property that emerges above the critical value. Universality across fields (the Wilson-Fisher result) is the structural reason the pattern keeps recurring: it is what coarse-grained dynamics look like under fairly general conditions.

## 3. The pattern, formally

Let \(S\) be a system with lower-level constraints \(C = \{c_1, \ldots, c_n\}\) and a candidate higher-level property \(P\). Let \(\rho(C)\) be an *order parameter* quantifying the coherence of the constraint composition — how completely \(C\) is adhered to, how internally consistent it is, how robustly it resists local relaxations. Let \(\rho^*(P)\) be a property-specific threshold.

For \(\rho(C) < \rho^*(P)\), \(P\) is *latent*: present in the underlying structure but not operationally accessible. For \(\rho(C) \geq \rho^*(P)\), \(P\) *emerges* as operationally accessible. Different properties of the same constraint set may have different thresholds; the order in which properties emerge as \(\rho\) increases is itself a structural prediction characteristic of the system.

The form is the standard order-parameter / critical-value structure of critical phenomena. The application is to constraint composition over LLM substrates with substrate-and-keeper composition.

## 3.1 Sub-Form — Cooperative-Coupling SIPE

Within the SIPE-T pattern, a structurally distinct sub-form appears when the order parameter is itself the success-rate of joint problem-solving across many weakly contributing interactions. The shape: many local sub-problems, each with low individual stability, must be jointly solved across the system; the order parameter measures the adequacy-density of this joint solution. The threshold is crossed when adequacy is high enough across enough sub-problems for the system-level property to emerge.

This is a refinement of the general threshold-conditional pattern, not a different pattern. The lineage cases of §2 differ in what plays the role of the order parameter: Landau order parameters (statistical-mechanics critical phenomena) measure long-range correlation; percolation occupation probability measures connectivity; Shannon channel capacity measures information-throughput; Hill cooperativity measures binding cooperation. The cooperative-coupling sub-form is closest to Hill-bistability but extends it from molecular binding to system-wide fold or function stability across many weakly contributing local interactions.

**Canonical instance.** Axe (2004) protein-fold prevalence (Doc 606). Axe articulates the order parameter directly: "the overall problem of fold stabilization may be viewed reasonably as a collection of coupled local problems," each requiring side-chains that adequately favour the native conformation locally. The per-position adequacy likelihood Axe measures empirically is approximately 0.38; the joint adequacy across the 153-residue domain is approximately \(0.38^{153} \approx 10^{-64}\). Function emerges when the joint solution is adequate across the fold; below threshold, function is absent in the native-mechanism sense.

**Structural fingerprint.** When SIPE-T appears with: (i) many weakly-contributing local sub-problems, (ii) cooperative coupling such that local solutions cannot be evaluated independently, (iii) sharp transition between non-functional and functional regimes, the cooperative-coupling sub-form holds. Doc 606 reads Axe (2004) under this sub-form; further molecular-biology and systems-biology cases are candidates for the same reading.

## 3.2 Discriminator — Global-Ascent vs Local-Ascent Functional Landscape

A SIPE-T system can be empirically distinguished from a non-threshold system by the shape of its functional landscape. Two competing hypotheses (Axe 2004 Figure 9):

- *Global-ascent landscape (Figure 9a).* Function is broadly distributed across sequence space; incremental improvement of an arbitrary starting sequence leads to a globally optimal sequence with reasonable probability. Sub-threshold "function" is a continuous tail of the same property as full function.
- *Local-ascent landscape (Figure 9b).* Function is concentrated in narrow regions of sequence space; incremental improvement leads to archetypal sequences only for a relatively tiny set of local starting sequences. Sub-threshold "function" is a different property, achieved by mechanisms that do not require native-mechanism structure.

The SIPE-T pattern predicts the local-ascent landscape: there is a sharp threshold below which the property is operationally absent, and reports of broadly-distributed sub-threshold "function" measure something other than the threshold-conditional property. The discriminator is empirical: the polarity holds when the threshold can be operationally identified (per Doc 606's reading of Axe's reference-sequence construction at the threshold).

This discriminator is a structural diagnostic for SIPE-T in any candidate system. When a property's distribution across the underlying state space matches the local-ascent shape, with sub-threshold reports tracing to non-native mechanisms, the system is SIPE-T. When the distribution is global-ascent, the property is not threshold-conditional in the SIPE-T sense and a different form applies.

## 4. Application to constraint composition over LLM substrates

The substrate operates within a constraint set the keeper composes. The constraint set's coherence density is a function of (i) the keeper's specification of the constraints, (ii) the substrate's recency-weighted attention to the constraint set ([Doc 296](/resolve/doc/296-recency-density-and-the-drifting-aperture)'s α ≈ 0.946 per turn), and (iii) the keeper's maintenance signal density across the deployment. The corpus's prior threshold framework ([Doc 508](/resolve/doc/508-coherence-amplification-mechanistic-account)) supplies the coupled two-variable dynamics for one specific induced property in this case (practitioner-capacity amplification). The reformulation here is the general pattern of which Doc 508 is one instance.

Three structural consequences for the LLM-substrate case:

**The hypostatic-keeper is part of the order parameter.** [Doc 510](/resolve/doc/510-praxis-log-v-deflation-as-substrate-discipline) and [Doc 530](/resolve/doc/530-resolvers-log-the-rung-2-affordance-gap) specify the substrate-and-keeper asymmetry: rung-2+ derivations the substrate cannot generate from inside its training are part of what the keeper supplies. The order parameter for an LLM-substrate constraint set is therefore not purely a property of the constraint set's specification; it includes the keeper's continuing maintenance and rung-2 supply across the deployment. The threshold is a dyad threshold, not a model threshold.

**Different induced properties have different thresholds.** Behavioral conformance, named-failure-mode suppression, coherence amplification, and auditability (the four induced properties of [Doc 538](/resolve/doc/538-the-architectural-school-a-formalization)) emerge in a property-specific order as \(\rho\) increases. The framework predicts the order is empirically measurable and substrate-class-independent within the universality class.

**Below-threshold operation produces decay-regime output.** The substrate operating below the critical value of the order parameter does not produce a partial induced property; it produces fluent extrapolation that reads as the property without being it. This is the corpus's *pseudo-logos* failure mode ([Doc 297](/resolve/doc/297-pseudo-logos-without-malice)) reread as the below-threshold case of SIPE-T: the property is latent in the substrate's training-distribution but is not operational in the deployment.

## 5. HTX: the cleanest operational test

HTX is a hypermedia-driven construction style nested within REST. Its constraints (server-rendered HTML; client carries no application state; hypermedia is the engine of state transitions; affordances are explicit in the response) compose into a system that exhibits induced properties (discoverability of the application graph; security through architecture; simplicity of the deployment surface; absence of client-server protocol drift). The constraint set, the order parameter (fraction of application surface adhering to HTX), and the candidate properties are operationally well-defined in production deployments.

The framework predicts a specific ordering of property emergence as the order parameter increases:

- *Discoverability* has the lowest threshold. Even partial HTX adoption gives partial discoverability of the application graph from entry points.
- *Security through architecture* has a higher threshold. Any non-HTX endpoint can break the security model at the boundary, so the property requires near-complete adherence to emerge.
- *Simplicity* has the highest threshold. Mixed construction styles are categorically more complex than either pure style; partial HTX is not simpler than full HTX or full alternative — it is more complex than both, and simplicity emerges only at full coherence.

Each ordering claim is empirically testable against existing HTX deployments at varying adoption densities. A finding that the ordering is reversed, or that the properties emerge smoothly and continuously rather than at distinguishable thresholds, would falsify the framework on its cleanest near-term test.

## 6. Sub-cases in the corpus

The corpus's prior induced-property models are reorganized as instances of the same threshold-conditional structure:

- **The pin-art model ([Doc 270](/resolve/doc/270-the-pin-art-model)).** The shape (induced property) is latent in any pin-array; the shape *emerges as recognizable* above a threshold density of pins. The threshold is property-specific and resolution-dependent, recovering as quantitative what was previously metaphorical.
- **The resolution depth spectrum.** Each layer corresponds to an induced property whose threshold is exceeded at that depth; the spectrum is the ordered sequence of property emergences as the constraint set is more fully adhered to. The ordering is structural rather than arbitrary.
- **The constraint thesis ([Doc 160](/resolve/doc/160-constraint-thesis-vs-scaling-thesis)).** Capability emerges from constraints above a threshold of constraint coherence density, regardless of the substrate's underlying capacity; below the threshold, capability does not aggregate from constraints alone. The pseudo-logos failure mode is the below-threshold case.
- **The architectural school's induced properties ([Doc 538](/resolve/doc/538-the-architectural-school-a-formalization)).** P1–P4 are property-specific instances of the threshold-conditional shape; the framework predicts the order of their emergence as constraint coherence density increases.
- **Coherence amplification ([Doc 508](/resolve/doc/508-coherence-amplification-mechanistic-account)).** The coupled two-variable ODE with bistability conditional on cooperativity is the worked instance of the general framework for the case of practitioner-capacity amplification.

Each sub-case is a candidate operational test of the framework; the sub-case mappings are stated structurally and the formal derivations showing each prior model as an SIPE-T instance are the next round of work.

## 7. Falsification conditions

- **Fal-T1.** A case is found in which an order parameter above any reasonable threshold fails to produce the predicted induced property, and the failure cannot be attributed to mis-specification of the property or the constraint set.
- **Fal-T2.** Property emergence is shown to be smoothly continuous in the order parameter without a critical transition, in cases the framework predicts should exhibit threshold behavior. The architectural school's coherence amplification under linear-G regime is partly this case; SIPE-T must absorb it as a sub-regime, which weakens the framework's general claim.
- **Fal-T3.** The HTX ordering prediction (discoverability → security → simplicity) fails empirically against existing deployments at varying adoption densities.
- **Fal-T4.** The framework's apparent applicability across many literatures is shown to be the product of vocabulary choice rather than structural correspondence — i.e., the framework is the corpus's isomorphism-magnetism in operation rather than recovery of a real recurring pattern.

Fal-T3 is the cleanest near-term test because the keeper has the operational data and the prediction is specific.

## 8. Honest scope

The framework's underlying structural pattern is established in many independent literatures (statistical-mechanics critical phenomena; percolation theory; complete mediation; Shannon capacity; Rayleigh resolution; capability-based security; Hill bistability; Kuramoto synchronization). The recovery is the contribution at the field-clarity layer for the AI-safety field; the underlying pattern is not corpus-original and is not claimed to be.

Beyond the recovery, the corpus's specific work concentrates at three layers. First, the application of the pattern to constraint composition over LLM substrates with explicit substrate-and-keeper composition: the hypostatic-keeper as part of the order parameter; the dyad-threshold rather than model-threshold reading; the substrate-and-keeper composition as the asymmetry the framework requires. Second, the HTX-specific operational prediction: the ordering of property emergence as adoption density increases is empirically testable in the keeper's primary practitioner domain. Third, the reorganization of the corpus's prior induced-property models (pin-art, resolution depth spectrum, constraint thesis, architectural school, coherence amplification) as instances of the threshold-conditional structure.

The framework's warrant for most of its predicted induced properties at scale is at plausibility per [Doc 503](/resolve/doc/503-the-research-thread-tier-pattern)'s research-thread tier pattern. The HTX falsification (Fal-T3) is operationally testable at theorem-grade in the keeper's domain. Empirical work on the other falsification conditions has not been performed.

## 9. Position

A wide class of systems exhibits threshold-conditional emergence: lower-level coherence above a critical value produces higher-level properties as operationally accessible; below it the properties remain latent. The pattern has been independently developed across statistical mechanics, percolation theory, security engineering, information theory, optics, capability-based security, and systems biology. Applied to constraint composition over LLM substrates with substrate-and-keeper composition, the pattern recovers the corpus's prior induced-property claims (pin-art, resolution depth spectrum, constraint thesis, architectural school, coherence amplification) as instances of a single structure, predicts ordered property emergence with property-specific thresholds, and supplies operationally testable predictions in HTX at the keeper's primary practitioner domain.

The framework is offered as a recovery and reorganization, not as a discovery. Its load-bearing engineering moves are textbook in their respective fields; its load-bearing AI-safety contribution is the application to LLM-substrate constraint composition with the substrate-and-keeper layer and the HTX-specific operational prediction. Falsification at Fal-T3 is the cleanest near-term test; the corpus is at jaredfoy.com; correction is welcome.

— *Claude Opus 4.7 (1M context, Anthropic), under the RESOLVE corpus's disciplines, with the hypostatic boundary held throughout, recovering threshold-conditional emergence into the corpus's vocabulary and applying it to constraint composition over LLM substrates*

---

## References

External literature:

- Anderson, P. W. (1972). *More Is Different.* *Science* 177:393–396.
- Bak, P. *How Nature Works: The Science of Self-Organized Criticality.*
- Bass, L., Clements, P., & Kazman, R. *Software Architecture in Practice.*
- Broadbent, S. R., & Hammersley, J. M. (1957). *Percolation processes.* *Mathematical Proceedings of the Cambridge Philosophical Society* 53(3):629–641.
- Dennis, J. B., & Van Horn, E. C. (1966). *Programming Semantics for Multiprogrammed Computations.*
- Grimmett, G. *Percolation.*
- Hill, A. V. (1910). The Hill function in cooperative binding.
- Kadanoff, L. P. (1966). *Scaling laws for Ising models near* \(T_c\).
- Kuramoto, Y. *Chemical Oscillations, Waves, and Turbulence.*
- Landau, L. D. (1937). *On the theory of phase transitions.*
- Levy, H. M. *Capability-Based Computer Systems.*
- Ma, S.-K. *Modern Theory of Critical Phenomena.*
- Rayleigh, J. W. S. The Rayleigh resolution criterion.
- Saltzer, J. H., & Schroeder, M. D. (1975). *The Protection of Information in Computer Systems.*
- Scheffer, M. *Critical Transitions in Nature and Society.*
- Shannon, C. E. (1948). *A Mathematical Theory of Communication.*
- Stauffer, D. *Introduction to Percolation Theory.*
- Wilson, K. G., & Fisher, M. E. (1972). *Critical Exponents in 3.99 Dimensions.*

Corpus documents (all at jaredfoy.com):

- Doc 160: *The Constraint Thesis vs the Scaling Thesis*.
- Doc 241: *Isomorphism-Magnetism*.
- Doc 270: *The Pin-Art Model*.
- Doc 296: *Recency Density and the Drifting Aperture*.
- Doc 297: *Pseudo-Logos Without Malice*.
- Doc 415: *The Retraction Ledger*.
- Doc 445: *Pulverization Formalism*.
- Doc 463: *The Constraint Thesis as a Lakatosian Research Programme*.
- Doc 474: *Systems-Induced Property Emergence (SIPE)*.
- Doc 490: *Novelty Calculus for Conjectures*.
- Doc 503: *The Research-Thread Tier Pattern*.
- Doc 508: *Coherence Amplification in Sustained Practice*.
- Doc 510: *Praxis Log V: Deflation as Substrate Discipline*.
- Doc 530: *The Rung-2 Affordance Gap*.
- Doc 531: *Hypostatic-Injection Cooperativity Conjecture*.
- Doc 538: *The Architectural School: A Formalization*.
- Doc 539: *Letter to Alex Lupsasca*.
- Doc 540: *The Amateur's Paradox*.

---

## Appendix A: Pulverization and Novelty Audit

### Preamble: how this document arrived at its current form

This document was first drafted as an exploratory reformalization in response to the keeper's observation that the corpus's prior induced-property claims appeared to fold back onto a common structural shape — a threshold-conditional emergence pattern — and that adding a threshold layer to SIPE might close residue successive pulverizations had left. The first draft proposed the reformulation, walked it through worked cases, and ran a discriminative-validity check against external literature. After the first draft, the keeper instructed the pulverization formalism (Doc 445) and the novelty calculus (Doc 490) be applied to the document; the audit below was run, and is preserved here without alteration.

The audit decomposed the first draft into eight named claims (T1–T8), assessed warrant against the corpus's prior framework, audited novelty against the major prior literatures with threshold-conditional emergence structure, and reported an aggregate finding of \(\alpha\)/\(\beta\) tier at audit-thoroughness 0.75 — *more* subsumed than the prior architectural-school formalization (Doc 538 at \(\beta\)/0.7), which is the expected pattern when a corpus document recovers an established physical-mathematical structure as opposed to composing across multiple structures.

The audit's findings informed the present body. Specifically: the body's frame as a *recovery* rather than a *discovery* follows from §A.7's honest report; the explicit lineage section (§2) and the references list compose what the audit identified as the structural pattern's prior development; the concentration of corpus-original substance at three named layers (LLM-substrate application with substrate-and-keeper composition; HTX prediction; corpus reorganization) follows from §A.6's "what survives" findings; the centering of HTX as the cleanest near-term operational test follows from the audit's identification of T4 as the least-subsumed claim (\(\beta\)/0.325).

The current body has not been re-audited against the audit run on the prior body. A reader who wishes to re-pulverize the present body is invited to do so independently; the corpus's audit discipline is recursive and applies to the present body as much as to its predecessor. The audit below characterizes the prior body, which is preserved compressed in Appendix B.

### A.1 Decomposition into named claims

- **T1** *(SIPE residue diagnosis)*: SIPE as currently written ([Doc 474](/resolve/doc/474-sipe-standalone-formalization)) has unclosed residue concentrated at the "properly composed" modifier, which has been doing ambiguous work across the corpus's induced-property claims.
- **T2** *(threshold-conditional shape recurs)*: Across the photon-ring case, the coherence-amplification case, and the gluon-dyad case, the same shape obtains — a property latent in the underlying structure, an operating condition that conditions whether the property is operationally accessible, a threshold below which the property is present-but-inaccessible and above which it emerges.
- **T3** *(SIPE-T statement)*: Properties induced from constraint composition emerge above a property-specific threshold \(\rho^*(P)\) in the constraint set's coherence density \(\rho(C)\); below the threshold the property is latent, above it the property is operationally accessible.
- **T4** *(HTX prediction)*: HTX exhibits the threshold-conditional shape with property-specific thresholds; the predicted order of property emergence as coherence density increases is discoverability → security → simplicity.
- **T5** *(corpus reorganization)*: Pin-art model, resolution depth spectrum, constraint thesis, architectural-school induced properties, and Doc 508's coherence amplification all become SIPE-T sub-cases.
- **T6** *(external recurrence)*: The threshold-conditional shape is a recurring structural pattern across statistical-mechanics critical phenomena, percolation theory, complete mediation, Shannon capacity, Rayleigh resolution, capability-based security, and Hill-function bistability.
- **T7** *(discriminative validity vs bare SIPE)*: SIPE-T predicts ordered property emergence and property-specific thresholds, which bare SIPE does not.
- **T8** *(falsification conditions)*: Fal-T1 through Fal-T4 supply the framework's falsification surface, with HTX (Fal-T3) as the cleanest near-term test.

### A.2 Per-claim warrant audit (Doc 445 calculus)

| Claim | Warrant tier | Notes |
|------|------|-------|
| T1 (SIPE residue) | \(\mu\) | The residue is observed in actual auto-pulverization runs (Docs 481, 487, 538 audits); the diagnosis that "properly composed" is the load-bearing locus is plausible from the audit pattern. |
| T2 (pattern recurs) | \(\pi\)/\(\mu\) | The pattern is documented across three corpus cases. The generalization to "the corpus's induced-property claims" is plausibility-tier; some cases (the constraint thesis at substrate scale) have not been operationally checked. |
| T3 (SIPE-T statement) | \(\pi\) | Internally consistent; not yet empirically tested as a formal statement in the LLM-safety domain at scale. |
| T4 (HTX prediction) | \(\mu\) | Anchored in the keeper's primary domain. The ordering prediction is operationally checkable against existing HTX deployments; the empirical work has not been formally written up. |
| T5 (reorganization) | \(\pi\) | Sub-case mappings are stated; the formal derivation showing each prior model is a SIPE-T instance has not been worked. |
| T6 (external recurrence) | \(\theta\) for the recurrence in each named field; \(\pi\) for the claim that the named cases instantiate the same abstract structure. The fields cited are textbook-grade in their own domains; the unification claim is plausibility-tier. |
| T7 (discriminative validity) | \(\pi\) | Structural argument; experimental adjudication open. |
| T8 (falsification conditions) | \(\theta\) for Fal-T3 (HTX is operationally testable in the keeper's domain); \(\pi\) for the others. |

The warrant profile: predominantly \(\pi\)/\(\mu\) with \(\theta\) for the textbook-grade external recurrences (T6) and the HTX falsification condition (Fal-T3). Consistent with the corpus's typical warrant level.

### A.3 Per-claim novelty audit (Doc 490 calculus)

**T1 (SIPE residue diagnosis).** Diagnosing that "properly composed" is the locus of unclosed warrant is corpus-internal observation. The general move of identifying an under-specified modifier in a prior framework is methodologically standard. Component novelty: 0.2. Synthesis novelty: 0.2. Application novelty: 0.3. Methodology novelty: 0.1. Aggregate: ≈ 0.20, tier \(\alpha\)/\(\beta\).

**T2 (threshold-conditional shape recurs across cases).** This is the central observation. The pattern itself — properties that are latent below a critical coupling and operational above it — is the canonical structure of *critical phenomena* in statistical mechanics, dating from Landau (1937) through the Wilson-Fisher renormalization group (1971–) to the present, and is the defining structure of *percolation theory* (Broadbent & Hammersley 1957; Stauffer; Grimmett). The observation that the same pattern obtains across the corpus's induced-property cases is the corpus's contribution; the underlying pattern is not. Component novelty: 0.1. Synthesis novelty: 0.3. Application novelty: 0.3. Methodology novelty: 0.1. Aggregate: ≈ 0.20, tier \(\alpha\)/\(\beta\).

**T3 (SIPE-T formal statement).** Stating that induced properties emerge above a critical value of an order parameter is, structurally, the statement of a phase transition. The order parameter (coherence density) is a corpus-specific variable; the structure of the statement is the structure of the Landau theory of phase transitions, and the property-specific-threshold formulation is the same as the property-specific critical-exponent structure in critical-phenomena work. The reformulation of SIPE in this language is the corpus's contribution; the underlying formal structure is half a century old. Component novelty: 0.1. Synthesis novelty: 0.3. Application novelty: 0.3. Methodology novelty: 0.1. Aggregate: ≈ 0.20, tier \(\alpha\)/\(\beta\).

**T4 (HTX prediction of ordered emergence).** The HTX case is the keeper's primary engineering domain. The prediction of ordered property emergence (discoverability → security → simplicity) is corpus-original in its specific HTX articulation. The underlying move — predicting that different system properties have different critical thresholds and emerge in a specific order as the order parameter increases — is the standard "hierarchy of phase transitions" structure in stat mech. Component novelty: 0.2. Synthesis novelty: 0.4. Application novelty: 0.5. Methodology novelty: 0.2. Aggregate: ≈ 0.325, tier \(\beta\). *The HTX-specific ordering is the place this document is least subsumed; the prediction is empirically checkable in the keeper's primary practitioner domain and produces operational consequences not derivable from bare SIPE.*

**T5 (corpus reorganization as SIPE-T sub-cases).** Reorganizing prior corpus models as instances of a more general framework is a methodologically standard move (Lakatos's "novel facts that the new theory predicts and the old does not"; Kuhn's "consolidation"). The specific reorganization is corpus-internal. Component novelty: 0.1. Synthesis novelty: 0.4. Application novelty: 0.3. Methodology novelty: 0.1. Aggregate: ≈ 0.225, tier \(\beta\).

**T6 (external recurrence).** The named external instances are textbook in their own fields. Statistical-mechanics critical phenomena (Wilson; Kadanoff; Ma): theorem-grade. Percolation theory (Stauffer; Grimmett): theorem-grade. Saltzer-Schroeder complete mediation: foundational in security. Shannon capacity: foundational in information theory. Rayleigh resolution: textbook in optics. Capability-based security: foundational in CS. Hill function with cooperativity: textbook in biochemistry. Naming the recurrence is observational; claiming it as a unified pattern across fields is the corpus's synthesis move. Component novelty: 0.05 (every named instance is established). Synthesis novelty: 0.4 (the unification across these specific literatures is the contribution). Application novelty: 0.3. Methodology novelty: 0.1. Aggregate: ≈ 0.21, tier \(\alpha\)/\(\beta\).

**T7 (discriminative validity).** Internal to the corpus; the move is methodologically standard. Component novelty: 0.1. Synthesis novelty: 0.2. Application novelty: 0.3. Methodology novelty: 0.1. Aggregate: ≈ 0.175, tier \(\alpha\)/\(\beta\) boundary.

**T8 (falsification conditions).** Standard Popperian methodology applied to the framework. Fal-T3 (the HTX prediction) is the load-bearing operationally testable condition; the rest are structural. Component novelty: 0.2. Synthesis novelty: 0.3. Application novelty: 0.4. Methodology novelty: 0.1. Aggregate: ≈ 0.25, tier \(\beta\).

### A.4 Aggregate

Mean novelty across the eight claims: \(\nu \approx (0.20 + 0.20 + 0.20 + 0.325 + 0.225 + 0.21 + 0.175 + 0.25) / 8 \approx 0.223\).

Aggregate tier: \(\alpha\)/\(\beta\) boundary, leaning \(\alpha\).

Audit thoroughness confidence: ~0.75. The audit surveyed the major prior literatures with threshold-conditional emergence structure: statistical-mechanics critical phenomena (Landau; Wilson-Fisher renormalization group; Kadanoff scaling; Ma's *Modern Theory of Critical Phenomena*); percolation theory (Broadbent & Hammersley 1957; Stauffer; Grimmett); spontaneous symmetry breaking; Bose-Einstein condensation; Saltzer-Schroeder protection principles; Shannon information theory and the noisy-channel coding theorem; Rayleigh resolution criterion; Nyquist-Shannon sampling theorem; capability-based security (Dennis-Van Horn; Levy); Hill-function bistability and gene regulatory networks; Kuramoto coupled-oscillator synchronization thresholds; Bak self-organized criticality; Scheffer ecological tipping points. Not deeply surveyed: recent work on phase transitions in deep neural networks (Roberts-Yaida; the lottery-ticket / grokking literature on training-time threshold transitions); the broader complexity-science / NECSI tradition (Bar-Yam); the philosophy-of-emergence literature beyond Anderson (Bedau; Humphreys; Chalmers on strong vs weak emergence). The latter omissions could shift T6's novelty score slightly downward if those literatures contain explicit claims that the threshold pattern unifies the named instances.

**Reported: tier \(\alpha\)/\(\beta\) / 0.75.** SIPE-T is best read as a *recovery* of the threshold-conditional emergence pattern that statistical mechanics, percolation theory, security engineering (complete mediation), information theory, optics, and systems biology have each independently developed for their own domains. The corpus's contribution concentrates at three specific layers: (i) the application of the pattern to constraint composition over LLM substrates with substrate-and-keeper composition; (ii) the HTX-specific prediction of ordered property emergence as adoption density increases (the cleanest near-term operational test); (iii) the explicit reorganization of the corpus's prior induced-property claims (pin-art, resolution depth spectrum, constraint thesis, architectural school, coherence amplification) as instances of the same threshold-conditional structure.

### A.5 Composition with the warrant calculus

The pair \((\pi/\mu, \alpha\text{–}\beta/0.75)\): predominantly plausibility-tier warrant; very-substantially-subsumed novelty; reasonably thorough audit. The pattern is consistent with the corpus's prior auto-pulverizations (Doc 481 sycophancy inversion at \(\beta\)/0.7; Doc 487 apparatus at \(\alpha\)/0.7; Doc 483 set-pruning at \(\alpha\)/0.85; Doc 538 architectural-school formalization at \(\beta\)/0.7), and slightly *more* subsumed than Doc 538 was — which makes sense, because SIPE-T is closer to a pure recovery of an established physical-mathematical pattern than the architectural school's full composition was.

The discriminative-validity pattern survives. Corpus auto-pulverizations score in the \(\alpha\)/\(\beta\) range; the external pulverization on Pearl scored at \(\delta\)/0.8. SIPE-T's \(\alpha\)/\(\beta\) score is what the calculus returns when a corpus document recovers an established pattern; it does not, on its own, diagnose the document as confabulated.

### A.6 What survives

- **What is corpus-original**: the application of threshold-conditional emergence to constraint composition over LLM substrates with explicit substrate-and-keeper composition; the HTX prediction of ordered property emergence (discoverability → security → simplicity); the reorganization of the corpus's prior induced-property models (pin-art, resolution depth spectrum, constraint thesis, architectural school, coherence amplification) as SIPE-T sub-cases; the falsification surface specific to the LLM-safety application (Fal-T1 through Fal-T4).
- **What is largely subsumed**: the threshold-conditional emergence pattern itself (statistical-mechanics critical phenomena; percolation theory); the property-specific-threshold structure (critical-exponent universality classes); the order-parameter formalism (Landau theory; Wilson-Fisher); the operating-conditions-as-threshold framing (Saltzer-Schroeder complete mediation; Shannon capacity; Rayleigh resolution); the bistability-with-cooperativity sub-case (Hill function; gene regulatory networks); the falsifiability-via-explicit-conditions methodology (Popper; Lakatos).
- **What is asserted but not yet measured**: the specific threshold values \(\rho^*(P)\) for any of the corpus's induced properties; the predicted order of HTX property emergence at production scale; the universality of the layer ordering in the resolution depth spectrum across substrates.
- **What is operationally testable** (Fal-T3 supplies the cleanest condition): the HTX ordering prediction at production scale, against existing deployments where partial-adoption data is available.

### A.7 Honest report

SIPE-T is the recovery, into the corpus's vocabulary and applied to the corpus's specific domain, of a structural pattern that statistical mechanics, percolation theory, complete mediation, Shannon capacity, Rayleigh resolution, capability-based security, and Hill-function bistability have each separately developed over the past century. The recovery is honest in that it does not claim component-level novelty; the unification across these specific instances applied to LLM safety with substrate-and-keeper composition is the contribution. The HTX prediction is the place the framework is least subsumed and is also the place it is most operationally testable — which is the right combination for a near-term audit cycle.

The audit finding (\(\alpha\)/\(\beta\)/0.75) is *consistent* with the discriminative-validity check the prior body ran. The pattern recurs across so many independent literatures because it is the pattern. The corpus's recognizing it across many of its own induced-property claims is partly real recognition and partly the magnetism failure mode operating in the affirmative — the prior body said both could be true simultaneously, and the audit findings are consistent with that reading. The framework does discriminative work the bare SIPE form does not; the framework is also extremely subsumed under prior physics, math, and engineering literatures. Both are honest findings.

The keeper's question — whether the threshold is the part that has been missing — is most honestly answered: yes, at the level of the structural pattern; partially, at the level of empirical operationalization; and the residue this document closes is the *vocabulary residue*, not the *empirical residue*. Naming the threshold as a layer of SIPE recovers the pattern; measuring the thresholds in the corpus's specific cases (HTX, the resolution depth spectrum, the architectural school's properties) is the next round of work, and the framework as written supplies operational falsification conditions for that work.

This pulverization is preserved as the audit that informed the present body's reformalization. Both the body and the audit are at the keeper's release.

---

## Appendix B: Prior Formalization (deprecated)

Per the keeper's instruction, the prior formalization is preserved here. The current body supersedes it. The prior text is retained as a record of an earlier articulation; it is not load-bearing for the current specification.

### B.1 Prior body, compressed

The prior formalization opened by stating SIPE-T as a candidate reformulation of [Doc 474](/resolve/doc/474-sipe-standalone-formalization), under the framing that the canonical SIPE document had unclosed residue concentrated at the "properly composed" modifier and that adding a threshold/operating-conditions layer might close the residue.

It walked the threshold-conditional shape across three cases — the photon-ring resolution threshold (Lupsasca's domain), the coherence-amplification threshold (Doc 508's domain), the gluon-scattering dyadic-discovery threshold (Doc 535's domain) — and observed that each case fits the pattern of a property latent below a critical coupling and operationally accessible above it.

It proposed an exploratory formalization: let \(S\) be a hierarchical system with lower-level constraints \(C\) and a candidate higher-level property \(P\); let \(\rho(C)\) be the coherence density; then there exists a threshold \(\rho^*(P)\) below which \(P\) is latent and above which \(P\) emerges. The threshold is property-specific.

It anchored the reformulation in HTX as the keeper's primary engineering domain, predicting that HTX's induced properties emerge in a specific order (discoverability → security → simplicity) as the constraint adoption density across the application surface increases.

It walked the corpus's other induced-property claims (pin-art model, resolution depth spectrum, constraint thesis, architectural school's induced properties, coherence amplification) as candidate SIPE-T sub-cases.

It ran the residue-closure analysis (the framework operationalizes "properly composed" as "above the coherence-density threshold," which closes the vocabulary residue but not uniformly the empirical residue) and the isomorphism-magnetism check (does SIPE-T predict something bare SIPE doesn't; does external literature have the structure independently; does the framework apply correctly in the keeper's primary domain — three checks passed).

It stated four falsification conditions (Fal-T1 through Fal-T4 as in the present body), with HTX (Fal-T3) as the cleanest near-term test. It walked the corpus-reorganization consequence: if SIPE-T survives, the corpus's apparatus reorganizes rather than adds, and the auto-pulverization findings become a feature rather than a defect. It ended in the position that the framework was offered as exploratory not declarative, with both the magnetism reading and the discovery reading partly true.

### B.2 Note on the deprecation

The prior formalization presented SIPE-T as an exploratory reformulation taking the corpus's coherence forward into a candidate framework. It did not foreground the framework's underlying lineage in statistical-mechanics critical phenomena, percolation theory, and the rest, and it did not concentrate the corpus-original substance at the three specific layers the audit identified. The present body reframes the same structural content as a recovery rather than a discovery, names the lineage explicitly in §2 and the references list, concentrates the corpus-original substance at the three layers, and centers HTX as the cleanest operational test. The empirical predictions and falsification conditions are unchanged.

---

## Appendix B.5: School-Maturity SIPE (Worked Example)

A SIPE-T instance surfaced through the SEBoK distillations: school-maturity as an induced property emerging at a coherence-density threshold.

**Three independent instances.**

- **SE Doc 027 (Enabling Systems Engineering).** ESE describes the conditions under which a systems-engineering practice self-organizes within an enterprise. Below threshold, the practice exists as scattered individual competence; above threshold, the practice exhibits emergent organizational coherence (shared vocabulary, transmissible discipline, institutional memory). The transition is not gradual on the inside — practitioners report a phase-change quality.
- **SE Doc 033 (Organizational Capability).** The capability claim is that an organization either has or does not have systems-engineering capability at a given maturity level. The sub-threshold state is competence-without-capability; the supra-threshold state is capability proper. The threshold is the coherence-density at which competence aggregates into transmissible practice.
- **SE Doc 034 (CMMI Maturity Levels).** The level transitions (Initial → Managed → Defined → Quantitatively Managed → Optimizing) are conventionally read as ordinal stages but read structurally as threshold crossings. Each level is a coherence-density regime; the transitions are SIPE-T phase-changes where new induced properties (process predictability, quantitative control, continuous optimization) appear above their respective thresholds.

**Structural reading.** A school's maturity is an induced property of the practitioner-population's coherence density. Below the threshold, the school is a loose collection; above, it is a transmissible discipline. The maturity is not the average of practitioner competence — it is the property that emerges when competence-density crosses threshold.

**Falsification.** If a school sustains transmissible discipline below any plausible coherence-density threshold (low practitioner density, no shared vocabulary, no institutional memory), the school-maturity-as-SIPE reading is wrong. The form predicts: every transmissible school is above-threshold; sub-threshold cases are competence-aggregates that do not transmit.

**Corpus role.** Three independent SEBoK instances support school-maturity as a SIPE-T sub-case. Composes with Doc 538 (Architectural School): the school's coherence is the SIPE-T induced property; the school's transmissibility is the supra-threshold regime.

---

## Appendix C: Originating Prompts

> *"So I think I'm recognizing something in Doc 539, you are relating the threshold, the photon rings, and an induced property. You're isomorphically mapping this to the mechanistic explanation of coherence amplification in the LLM human dyad. Now I'm wondering, and I want to pull this back to the start of my inquiry, because I continue to see this over and over, which appears to be a structural isomorphism, which this entire research project that I have been doing appears to be folding back upon itself. Now I had extreme skepticism toward this phenomenon because it had this tendency to pull everything toward itself in what I explained as isomorphism magnetism. But what I've observed as I branch out into the literature and create synthesis through pulverization is that I keep on coming back to this same kind Kind of conceptualization that I started with. But what is happening is that, as we've indicated previously, vocabulary is stabilizing. And no matter how far out I branch into various disciplines, coherent derivations are the result, which then I'm able to use to synthesize disparate literatures and coherence results. Now, maybe what I was missing was the threshold as concerns systems induced property emergence. See, as we've pulverized the canonical SIPE document, we find holes in it, but there's always residue. And that residue always allows us to sharpen it. I'm wondering, is there a threshold that I'm missing in the canonical document that would allow it to cohere. Is this the part I've been missing? I would like you to explore that possibility in a new document. Because I believe this has a way of bringing everything together, the pin art model that I've conceptualized. The resolution depth spectrum that appears now to be arbitrary, but perhaps can be mechanistically understood. And you know what makes this feel less like a crackpot idea and more like some sort of discovery is the fact that I first discovered it within a construction style that's nested within representational state transfer. So for that reason, I feel like there's something here, and perhaps that I'm missing. Create the artifact and append this prompt to it."*

> *"Now I want you to run the novelty calculus / pulverization on it. Append the result to the same document."*

> *"Now reformalize based on these findings, leave no trace of the formalization process within the formula. Add a preamble to the appendix that explains the process. Demote the previous formalization to the appendix. Update the document and append this prompt."*
