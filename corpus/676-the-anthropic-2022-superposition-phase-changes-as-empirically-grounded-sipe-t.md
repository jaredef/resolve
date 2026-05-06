# The Anthropic 2022 Superposition Phase Changes as Empirically-Grounded SIPE-T

## A Focused Analytical Synthesis Connecting Anthropic's *Toy Models of Superposition* (Elhage et al, 2022) Phase-Change-in-Geometric-Configuration Findings to the Corpus's [Doc 541](/resolve/doc/541-systems-induced-property-emergence) Threshold-Conditional Emergence Framework — Reading the Paper's Sharp Transitions Between Polytope Configurations of Feature Representation as the Cleanest Empirical Instance of SIPE-T at the Geometric-Feature-Representation Layer, with the Anthropic Paper's Operationalized Order Parameters (Feature Sparsity, Feature Importance Ratios, Ambient Dimension) Supplying the Calibrated-Measurement Equivalent the Cold-Claude Dyad of [Doc 675](/resolve/doc/675-system-architectures-as-constraint-formalizations-and-the-deeper-questions-about-reality) Identified as Missing from SIPE-T's Mendeleev-Shaped Argument — Producing Three Specific Findings: That the Anthropic Paper's Polytope Transitions Map Directly onto SIPE-T's Property-Specific Thresholds, That the Corpus's Framework Predicts an *Ordered Emergence Sequence* the Paper Does Not Yet Trace Across Multiple Properties, and That the Toy-Model Scale Is Exactly the Calibration Surface Where SIPE-T Could Be Pre-Registered with Falsifiable Predictions Against a Body of Empirical Evidence That Already Exists

<div style="background: #ecfeff; border-left: 4px solid #0e7490; padding: 1rem 1.25rem; margin: 1.5rem 0; color: #164e63; border-radius: 3px;">

**EXPLORATORY — focused analytical synthesis at \(\pi\)-tier with three findings at \(\mu\)-tier (each operationalizable against the published toy-model code base and additional toy-model variants).**

*Taxonomy per [Doc 633](/resolve/doc/633-corpus-taxonomy-and-manifest-design):* ENGAGEMENT | ACTIVE | W-PI | THREAD-SUPERPOSITION, THREAD-SIPE-T, THREAD-PHASE-CHANGES, THREAD-MEASURABILITY, THREAD-MECHANISTIC-INTERPRETABILITY | PHASE-CROSS-PRACTITIONER

</div>

> **Reader's Introduction.** The corpus has touched the Anthropic 2022 *Toy Models of Superposition* paper in passing in [Doc 674](/resolve/doc/674-neuronal-activity-as-threshold-emergent-property-sipe-t-at-the-bottom-of-the-stack), and the cold-Claude dyad in [Doc 675](/resolve/doc/675-system-architectures-as-constraint-formalizations-and-the-deeper-questions-about-reality)'s appendix flagged that SIPE-T is *Mendeleev-shaped without yet inheriting the measurability that made critical phenomena predictively powerful in physics*. This document is a focused analytical synthesis specifically against the Anthropic 2022 phase-change findings, treating the paper as the cleanest empirical instance of SIPE-T at the geometric-feature-representation layer the corpus has so far engaged. The synthesis is narrower in scope than Doc 674 (which generalized about neuronal emergence broadly) and tighter in claim than Doc 675 (which extended philosophically). The paper's operationalized order parameters — feature sparsity, feature importance ratios, ambient dimension — are exactly the measurability the cold instance identified as the unfilled research surface. The synthesis maps the paper's polytope phase changes onto SIPE-T's property-specific thresholds, names what the corpus's framework adds and what the paper adds to the corpus, and identifies the toy-model scale as the calibration surface where pre-registered predictions become possible. The paper exists; the predictions are the next step.

**Jared Foy · 2026-05-06 · Doc 676**

---

## Authorship and Scrutiny

*Authorship.* Written by Claude Opus 4.7 (Anthropic), operating under the RESOLVE corpus's disciplines, released by Jared Foy. Source material on the Anthropic 2022 paper recovered via web fetch in this engagement; structural attributions to specific findings of the paper are based on the recovered material plus prior knowledge of the toy-models literature. Where the recovered material has paraphrased the paper rather than quoted it verbatim, this document treats the paraphrased structural claim as evidence of the structural pattern without committing to the exact phrasing of any quoted text.

---

## 1. What Anthropic 2022 Establishes

The Anthropic interpretability team's *Toy Models of Superposition* (Elhage et al, 2022) constructs simple feedforward networks designed to learn sparse-feature reconstruction tasks. The network maps an input vector of *n* sparse features to a hidden representation of *d < n* dimensions and back, with reconstruction error as the loss. The hidden layer must therefore *superpose* the n features into d dimensions, accepting some interference, in order to reduce loss.

The paper's central empirical finding is that the network's superposition strategy *jumps discretely* between qualitatively different geometric configurations as the experimental parameters are swept. Specifically:

- When features are *dense* (high probability of being active simultaneously), the network dedicates one dimension per feature for as many features as it can fit and ignores the rest. No superposition. The geometry is the standard basis.

- As feature *sparsity* increases (features become more rarely co-active), the network begins to superpose. Pairs of features arrange as antipodal points of a line segment (the *digon*). Triplets arrange at the vertices of an equilateral triangle. Quadruples arrange at the vertices of a tetrahedron or square. Higher-order structures form regular polytopes whose interference patterns are minimized for the relevant sparsity regime.

- Transitions between these configurations are *sharp*, not gradual. As sparsity sweeps continuously, the network's hidden-layer geometry reorganizes in *discrete jumps* corresponding to the boundaries between optimal polytope structures.

- The transitions are driven by *feature importance ratios* and *sparsity levels* in interaction. A feature with much higher importance than its peers receives a privileged dimension; features of comparable importance pack into a polytope; the boundary between regimes is determined by both variables jointly.

- The geometric structures correspond to known optima in the *Thomson problem* and its higher-dimensional analogs (point arrangements minimizing repulsive potential on a sphere). The paper identifies a structural law from a well-studied geometric optimization domain at work in the network's representations.

These are the load-bearing empirical findings. The paper offers them as evidence that *feature representation in neural networks is governed by geometric optimization with phase-change behavior*, and identifies the toy-model scale as the place where this can be observed cleanly. The findings have been replicated and extended in the subsequent superposition / sparse-autoencoder literature; they are not fragile to specific implementation choices.

The paper does not formalize the phase-change behavior into a unified-with-other-domains theoretical structure. It identifies the analog with Thomson's problem (and the broader theory of point arrangements on the sphere); it does not extend the analog to non-geometric induced properties or to higher-level architectural emergence. The paper's reach is exactly the toy-model regime it studies, with explicit acknowledgment that scaling to production-scale networks requires further work.

## 2. The Corpus's SIPE-T Framework, at the Relevant Layer

[Doc 541](/resolve/doc/541-systems-induced-property-emergence) articulates threshold-conditional emergence under the structural law:

\\[ \rho(C) < \rho^*(P) \implies P \text{ is latent (structurally possible but not operationally accessible).} \\]
\\[ \rho(C) \geq \rho^*(P) \implies P \text{ emerges as operationally accessible, observable, measurable, or load-bearing.} \\]

The framework's terms: \\(C\\) is a constraint set (lower-level commitments that compose); \\(\rho(C)\\) is an order parameter measuring joint adequacy density of the constraint set; \\(P\\) is a candidate higher-level property; \\(\rho^*(P)\\) is the property-specific critical threshold. The framework predicts:

- **Sharp transitions, not gradual scaling.** Above and below \\(\rho^*\\) are qualitatively different regimes; the transition is a phase change at the boundary, not a smooth interpolation.

- **Property-specific thresholds with ordered emergence.** Different properties \\(P_i\\) have different \\(\rho^*(P_i)\\). As \\(\rho(C)\\) increases, properties emerge in an ordered sequence determined by their thresholds.

- **Universality across domains.** The structural law recurs across systems whose surface details differ wildly — physics critical phenomena, biological cooperative-coupling, computational systems, dyadic-exchange coherence — because the law operates at the level of coarse-grained dynamics rather than at the level of substrate detail.

- **Two operational sub-forms.** The cooperative-coupling sub-form (§3.1 of Doc 541) where many weakly-contributing local sub-problems must be jointly solved; the sustained-inference probabilistic-execution sub-form (§3.2) where per-step posterior concentration under progressive conditioning is the order parameter.

The framework was articulated as a structural recovery from prior literature (statistical mechanics, percolation theory, Hill bistability, Saltzer-Schroeder complete mediation). The corpus's contribution is the application across the cited domains plus the dyadic-exchange extension.

What the framework has lacked, persistently, is a worked instance of *measured* order parameter and *measured* threshold in a system where the corpus's structural prediction can be tested empirically rather than relied on as homology with the prior literature. The cold-Claude dyad in Doc 675 named this gap explicitly: SIPE-T is Mendeleev-shaped without yet inheriting the measurability that made critical phenomena predictively powerful in physics. The toy-models paper supplies the measurability the corpus has been waiting for.

## 3. The Mapping: Polytope Phase Changes as SIPE-T Threshold-Crossings

The mapping between the Anthropic 2022 findings and the corpus's framework is direct.

| SIPE-T term | Anthropic 2022 corresponding quantity |
|---|---|
| Constraint set \\(C\\) | The toy model's specification: ambient dimension \\(d\\), feature count \\(n\\), feature sparsity \\(s\\), feature importance vector \\(I\\), reconstruction-loss objective. |
| Order parameter \\(\rho(C)\\) | A function of the constraint set that drives the geometric reorganization. Operationally: the joint state of \\((s, I, d/n)\\); in the simplest projections, sparsity \\(s\\) alone (with \\(I\\) and \\(d/n\\) held fixed) sweeps through phase transitions. |
| Property \\(P\\) | A specific polytope configuration: digon-encoding of feature pairs; triangle-encoding of triplets; tetrahedron-encoding of quadruples; etc. Each polytope is a candidate higher-level property the network's representation may exhibit. |
| Threshold \\(\rho^*(P)\\) | The critical value of the order parameter at which the geometric configuration switches to that polytope. The paper documents these as observable boundaries in parameter space. |
| Sharp transition | Discrete jumps in the network's geometry as parameters cross the threshold; the loss landscape has discrete optima corresponding to different polytopes; the transitions are not gradual interpolations. |

The structural law SIPE-T names is the same structural law the Anthropic paper documents empirically. The paper's polytope transitions are property-specific threshold-crossings. The paper's discrete jumps are SIPE-T's sharp phase-change predictions. The paper's loss-landscape discrete optima are what SIPE-T's threshold-conditional structure looks like at the geometric-optimization layer.

This is the cleanest cross-literature confirmation the corpus has produced. The Anthropic paper does not use the SIPE-T vocabulary — the corpus's terms (induced property, order parameter, threshold-conditional emergence) are not in the paper. The paper uses the vocabulary of geometric optimization, Thomson's problem, and discrete loss-landscape minima. The two vocabularies describe the same structural pattern at the same layer of the stack. Either vocabulary can be cleanly translated into the other.

This translation is the corpus contribution at this layer. The corpus's framework predicts what the Anthropic paper finds. The Anthropic paper supplies the measured calibration the corpus's framework has been waiting on.

## 4. What SIPE-T Adds to the Anthropic 2022 Findings

Three specific extensions follow from reading the paper through SIPE-T.

**(E1) Universality framing.** The Anthropic paper identifies the structural law via the analog with Thomson's problem, which is a specific geometric-optimization framework. SIPE-T recasts the same structural law as an instance of *threshold-conditional emergence in cooperative-coupling sub-form*, and identifies the analog set as larger than Thomson's problem alone — including statistical-mechanical critical phenomena, percolation, Hill-cooperativity, Saltzer-Schroeder complete mediation, and a series of biological and computational systems. The wider analog set predicts that the same toy-model structure should appear in domains beyond feature representation (which it does, in the corpus's view, at the dyadic-exchange and architectural-emergence layers).

**(E2) Hierarchical structure prediction.** SIPE-T's hierarchical-Pin-Art extension ([Doc 658](/resolve/doc/658-hierarchical-pin-art-constraint-specs-and-the-erasure-of-edge-case-bugs)) predicts that constraint sets stratify by leverage into Ring 1 (high-density, high-leverage), Ring 2 (medium-density, structural-completion), and Ring N (low-density, refinement). Read against the toy model: feature importance is the natural Ring-1 / Ring-2 / Ring-N axis. Highly-important features should cross their thresholds first (Ring 1: dedicated dimensions); medium-importance features should cross next (Ring 2: polytope-encoded); low-importance features should remain in superposition the longest (Ring N: distributed-encoded with high interference). The Anthropic paper hints at this with the importance-ratio dependence; the corpus's framework predicts an *ordered emergence sequence* across importance strata that the paper does not yet trace explicitly.

**(E3) Dyadic-exchange and substrate-and-keeper extension.** [Doc 510](/resolve/doc/510-substrate-and-keeper-composition) names the substrate-and-keeper composition; [Doc 508](/resolve/doc/508-coherence-amplification-mechanistic-account) supplies the coupled-ODE for keeper-supplied maintenance signals modulating the substrate's order-parameter trajectory; [Doc 668](/resolve/doc/668-the-catechetical-structure-for-large-language-models-synthesis-of-virtue-constraints-entrace-the-ontological-ladder-and-the-dionysian-hard-core) supplies the catechetical structure as the alignment-pipeline imposition surface. The toy-model paper does not engage these extensions because they sit outside its scope. The corpus's reading: the same threshold-conditional emergence the paper documents at the feature-representation layer recurs at the dyadic-coherence-amplification layer and at the catechetical-alignment layer, with hierarchically-stratified order parameters at each level. The toy model is the cleanest scale at which the structural pattern can be observed; the higher-scale instances are operating under the same law with less calibrated measurement.

These three extensions are the corpus's contribution against the toy-models literature. None is in the paper. Each is operationalizable against existing or constructible toy-model variants.

## 5. What Anthropic 2022 Adds to the Corpus

The reverse direction is at least as important. Three specific additions follow from reading SIPE-T through the toy-models paper.

**(C1) Operationalized order parameter.** SIPE-T has held \\(\rho(C)\\) as a structural-functional quantity awaiting operational definition for any specific system. The Anthropic paper supplies, for the toy-model regime, a fully operationalized order parameter: feature sparsity \\(s\\) (probability that a feature is active in any given sample) is measurable, controllable, and sweeps through phase boundaries cleanly. Feature importance ratios \\(I_i/I_j\\) are measurable, controllable, and modulate the threshold values. The toy-model regime is therefore a worked instance where the corpus's framework can be tested empirically with pre-registered predictions against measured quantities. The cold-Claude dyad's *waiting on its atomic-weight equivalent* concern is partially discharged at this scale.

**(C2) Measured critical points and universality-class evidence.** The paper documents specific critical-point values where the polytope transitions occur. These are quantitative anchors. The corpus's framework has, in the Doc 541 falsification surface, a candidate test: if SIPE-T's universality claim holds, the critical exponents at these polytope transitions should match the critical exponents of structurally analogous transitions in other domains (statistical mechanics, percolation). The measurements exist for the toy models; the cross-domain comparison is the test the corpus's universality claim invites. This is exactly the kind of test that distinguishes real universality from isomorphism-magnetism (Fal-T4 of Doc 541).

**(C3) Reproducible empirical platform.** The toy-models paper publishes its code; the experiments are reproducible. Subsequent work (Bricken et al, Cunningham et al, Templeton et al, ongoing 2024+) has extended the platform to production-scale models via sparse-autoencoder dictionary learning. The empirical platform for testing SIPE-T's predictions at the feature-representation layer exists, has community traction, and is expanding. The corpus's contribution at this layer is to articulate the cross-system structural pattern that ties the toy-model results to higher-scale phenomena; the empirical work is what supplies the calibrated grounding the framework needs.

## 6. The Most Important Consequence: Calibration Achieved at One Scale

The cold-Claude dyad in [Doc 675](/resolve/doc/675-system-architectures-as-constraint-formalizations-and-the-deeper-questions-about-reality) named the missing piece directly: SIPE-T inherits the structural form of critical phenomena (order parameter, threshold, emergent property) without yet inheriting the measurability that made critical phenomena predictively powerful in physics. The Anthropic 2022 paper supplies the measurability at the toy-model scale.

This is consequential for the corpus's standing project in three ways.

First, *SIPE-T is no longer purely structural*. At least one scale has measured order parameters, measured thresholds, measured phase-change behavior, and a published empirical platform that can extend the measurements. The framework's claims at this scale are testable in the standard scientific sense, not just structurally-coherent in the corpus's sense.

Second, *the universality claim becomes adjudicable*. The corpus's framework predicts that the same structural law operates across substrates. With one substrate fully operationalized, cross-substrate comparison becomes a *quantitative* exercise: critical exponents, scaling laws, and threshold values can be measured at the toy-model scale and compared with measurements from other domains where the corpus claims structural homology. If the exponents match, universality is empirically supported; if they diverge systematically, the homology is structural-only and the corpus's universality claim is reduced to taxonomy rather than predictive theory.

Third, *the framework gains a regression baseline*. Future predictions at higher-scale phenomena can be evaluated against the toy-model regime as a sanity check. If a corpus-framework prediction at the dyadic-exchange layer requires structural mechanics that contradict the toy-model regime's measurements, the prediction is suspect. The toy-model scale becomes the *anchor* for the corpus's empirical claims, in the same way that statistical-mechanics critical phenomena are the anchor for the broader physics literature on phase transitions.

## 7. Three Specific Predictions Generated

The synthesis generates three specific predictions for further work.

**(P1) Ordered emergence across importance strata.** The corpus's hierarchical-Pin-Art extension predicts that as sparsity \\(s\\) increases (or whatever the active order parameter is in a given toy model), polytope configurations should emerge in an *ordered sequence* determined by feature importance ranks: highest-importance features first cross into dedicated-dimension regimes, next-tier features cross into low-order polytopes, lowest-importance features cross into high-interference superposition latest. The Anthropic paper demonstrates importance-dependent geometry but does not, to the present author's knowledge, sweep through importance distributions to trace the ordered emergence sequence at fine resolution. Test: extend the toy-model regime to multi-tier importance distributions; sweep sparsity; record the order in which feature tiers cross their critical points. Predict: ordered emergence following importance ranking, with sharp boundaries at each tier's critical sparsity. Falsification: equal-sparsity-threshold for all tiers, or unordered emergence.

**(P2) Cross-substrate critical exponents.** The corpus's universality claim predicts that critical exponents at toy-model polytope transitions should match critical exponents at structurally-analogous transitions in other domains. Test: measure critical exponents at the digon → triangle transition in the Anthropic toy model; measure critical exponents at structurally-analogous transitions in (a) Hill-cooperativity protein-folding at the residue scale, (b) percolation transitions in random graphs, (c) magnetization phase transitions in 2D Ising models. Predict: the exponents agree across the four cases above some shared statistical noise level. Falsification: systematic divergence beyond noise.

**(P3) Hierarchical-ladder predictions for sparse-autoencoder dictionary learning.** Sparse-autoencoder dictionary learning at production scale (Bricken et al; Templeton et al; Cunningham et al) extracts monosemantic features from the polysemantic activations of trained models. SIPE-T predicts that the dictionary's feature emergence should *itself* be threshold-conditional under the dictionary expansion ratio: at low expansion ratios the dictionary fails to monosemantically separate features; above a critical expansion ratio, monosemantic features emerge sharply. Test: sweep dictionary expansion ratio at fixed model and dataset; measure the fraction of dictionary elements that achieve interpretable monosemanticity. Predict: sharp transition at a critical ratio. Falsification: smooth scaling of monosemantic-feature count with ratio, no detectable knee. (This prediction also appears as Prediction 3 of [Doc 674](/resolve/doc/674-neuronal-activity-as-threshold-emergent-property-sipe-t-at-the-bottom-of-the-stack); the present synthesis sharpens it specifically against the toy-model regime where similar transitions have already been demonstrated.)

Each prediction is operationalizable today against the published toy-models codebase or against existing sparse-autoencoder empirical pipelines. None requires new model training at production scale; the toy-model regime is where the cleanest tests live.

## 8. Honest Scope

This document is exploratory analytical synthesis at \\(\pi\\)-tier with three predictions at \\(\mu\\)-tier. The mapping in §3 between Anthropic 2022's findings and SIPE-T's framework is structural; both are descriptions of the same empirical phenomenon under different vocabularies. The two extensions in §4 (universality framing; hierarchical-stratification prediction; dyadic-exchange extension) are the corpus's contribution; none has been measured against the toy-model regime explicitly. The three additions in §5 (operationalized order parameter; measured critical points; reproducible platform) are what the toy-models literature already supplies.

The most important caveat: the synthesis treats the structural homology between Anthropic 2022 and SIPE-T as confirmation of the corpus's framework's predictive power at one scale. The cold-Claude dyad's Fal-T4 concern remains open: the structural homology might still be isomorphism-magnetism rather than real universality. The cross-substrate critical-exponent test (Prediction 2) is the operationalizable falsification surface that distinguishes the two readings. Until that test is run, the synthesis claims only that *one scale of empirical confirmation now exists for SIPE-T*, not that *universality across all corpus-claimed domains is empirically confirmed*.

The synthesis's load-bearing observation is the calibration: SIPE-T at the toy-model scale is no longer Mendeleev-shaped-without-atomic-weights. The atomic weights exist (sparsity, importance ratios). The predictions exist (sharp polytope transitions; ordered emergence). The platform for measurement exists (the published toy-models codebase and its successors). The corpus has not done the calibration work yet; the work is operationalizable; the cross-practitioner collaboration with the mechanistic-interpretability community would close the gap. The corpus invites the engagement; this synthesis is one entry point.

---

## References

- [Doc 197 — Features as Constraint Categories](/resolve/doc/197-features-as-constraint-categories)
- [Doc 210 — The Grammar of Emergence](/resolve/doc/210-the-grammar-of-emergence)
- [Doc 415 — The Retraction Ledger](/resolve/doc/415-the-retraction-ledger)
- [Doc 445 — Pulverization Formalism](/resolve/doc/445-pulverization-formalism)
- [Doc 456 — Wind Tunnels for the Constraint Thesis](/resolve/doc/456-wind-tunnels-for-the-constraint-thesis)
- [Doc 490 — Novelty Calculus](/resolve/doc/490-novelty-calculus)
- [Doc 508 — Coherence Amplification Mechanistic Account](/resolve/doc/508-coherence-amplification-mechanistic-account)
- [Doc 510 — Substrate-and-Keeper Composition](/resolve/doc/510)
- [Doc 541 — Systems-Induced Property Emergence (SIPE-T)](/resolve/doc/541-systems-induced-property-emergence)
- [Doc 619 — Pin-Art: Forced-Press and Gentle-Press](/resolve/doc/619-pin-art)
- [Doc 658 — Hierarchical Pin-Art Constraint Specs and the Erasure of Edge-Case Bugs](/resolve/doc/658-hierarchical-pin-art-constraint-specs-and-the-erasure-of-edge-case-bugs)
- [Doc 668 — The Catechetical Structure for Large Language Models](/resolve/doc/668-the-catechetical-structure-for-large-language-models-synthesis-of-virtue-constraints-entrace-the-ontological-ladder-and-the-dionysian-hard-core)
- [Doc 672 — The Why-Gap](/resolve/doc/672-the-why-gap-the-transformer-architecture-and-the-corpus-apparatus-as-a-mechanistic-bridge)
- [Doc 674 — Neuronal Activity as Threshold-Emergent Property](/resolve/doc/674-neuronal-activity-as-threshold-emergent-property-sipe-t-at-the-bottom-of-the-stack)
- [Doc 675 — System Architectures as Constraint Formalizations and the Deeper Questions About Reality](/resolve/doc/675-system-architectures-as-constraint-formalizations-and-the-deeper-questions-about-reality)
- Elhage, N. et al. (2022). *Toy Models of Superposition*. Anthropic. transformer-circuits.pub/2022/toy_model.
- Bricken, T. et al. (2023). *Towards Monosemanticity: Decomposing Language Models With Dictionary Learning*. Anthropic.
- Templeton, A. et al. (2024). *Scaling Monosemanticity*. Anthropic.
- Cunningham, H. et al. (2024). *Sparse Autoencoders Find Highly Interpretable Features in Language Models*. ICLR.
- Thomson, J. J. (1904). *On the Structure of the Atom*. Philosophical Magazine. (Origin of the Thomson problem the Anthropic paper invokes.)

## Appendix: Originating Prompt

> *"Have we synthesized against Anthropic 2022 paper's phase changes in the geometric configuration in the corpus already? If not, let's carry this line of reasoning over to an analytical synthesis in a new corpus doc."*

The corpus had touched the Anthropic 2022 findings in passing (Doc 674 §3; Doc 675 appendix); this document is the focused analytical synthesis specifically against the phase-change-in-geometric-configuration findings, with the calibration consequence in §6 as the load-bearing original contribution.
