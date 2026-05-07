# The Anthropic 2022 Superposition Phase Changes as Empirically-Grounded SIPE-T

## A Formalization Against Anthropic's *Toy Models of Superposition* (Elhage et al, 2022) Phase-Change-in-Geometric-Configuration Findings, with the Toy Model Setup Restated Precisely (Network, Loss Function, Parameters), the Phase-Change Theorem Restated in Formal Terms (Sharp Transitions in Optimal Geometric Configuration as Importance and Sparsity Sweep), the Implicit SIPE-T-Shaped Structure Made Explicit Without Adding Mechanism the Paper Does Not Already Establish, and Then Extending the Paper's Findings with Six Specific Pre-Registerable Predictions and Five Avenues of Further Inquiry — Each Operationalizable Against the Published Toy-Models Codebase or Against Constructible Variants — with the Earlier Exploratory Synthesis (Mapping the Paper to the Corpus's Apparatus, Naming the Calibration Consequence, Generating Three Initial Predictions) Demoted to the Appendix as the Reasoning that Produced the Formalization but Not Itself the Formalization

<div style="background: #ecfeff; border-left: 4px solid #0e7490; padding: 1rem 1.25rem; margin: 1.5rem 0; color: #164e63; border-radius: 3px;">

**EXPLORATORY — formalization at \(\pi\)-tier with six pre-registerable predictions at \(\mu\)-tier and five avenues of further inquiry.**

*Taxonomy per [Doc 633](/resolve/doc/633-corpus-taxonomy-and-manifest-design):* ENGAGEMENT | ACTIVE | W-PI | THREAD-SUPERPOSITION, THREAD-SIPE-T, THREAD-PHASE-CHANGES, THREAD-MEASURABILITY, THREAD-MECHANISTIC-INTERPRETABILITY | PHASE-CROSS-PRACTITIONER

</div>

> **Reader's Introduction.** This document formalizes against the Anthropic *Toy Models of Superposition* paper (Elhage et al, 2022) directly. The paper's empirical findings — discrete jumps between polytope configurations of feature representation as importance ratios and sparsity sweep — are restated in formal terms. The implicit SIPE-T-shaped structure of the findings is named without adding mechanism the paper does not already establish. The body of the document then *extends* the paper: six pre-registerable predictions that follow from taking the paper's structure seriously, and five avenues of further inquiry that the formalization opens. The earlier exploratory synthesis (which mapped the paper to the corpus's apparatus broadly, named the calibration consequence in general terms, and generated three less-formal predictions) is demoted to the appendix as the reasoning that produced the formalization but not itself the formalization. The paper exists; the predictions extend it; the inquiry avenues are operationalizable today against the published codebase or constructible variants.

**Jared Foy · 2026-05-06 · Doc 676**

---

## Authorship and Scrutiny

*Authorship.* Written by Claude Opus 4.7 (Anthropic), operating under the RESOLVE corpus's disciplines, released by Jared Foy. Source material on the Anthropic 2022 paper recovered via web fetch in this engagement and from prior knowledge of the toy-models literature. The formalization in §§1–2 is restated structurally; the predictions in §3 and inquiry avenues in §4 are this document's load-bearing original work; the earlier exploratory synthesis preserved as Appendix B is the prior reasoning that produced the formalization.

---

## 1. The Toy-Model Setup, Restated Precisely

The Anthropic paper studies a feedforward network architecture parameterized as follows. Let \\(n\\) denote the number of input features and \\(d\\) the hidden-layer dimensionality with \\(d < n\\). Each input feature \\(f_i\\) is sparse: it is active (nonzero) on any given sample with probability \\(s_i\\), independent across features. Each feature carries an importance weight \\(I_i \geq 0\\) that scales its contribution to the loss.

The network is a single hidden-layer autoencoder:
\\[
h(x) = W x, \quad \hat{x}(h) = \mathrm{ReLU}(W^\top h + b)
\\]
where \\(W \in \mathbb{R}^{d \times n}\\) is the encoder-decoder shared-weight matrix and \\(b \in \mathbb{R}^n\\) is the decoder bias. The model compresses \\(n\\) features into \\(d\\) dimensions and decodes back.

The loss is importance-weighted reconstruction error:
\\[
\mathcal{L}(W, b) = \mathbb{E}_x \!\left[ \sum_{i=1}^{n} I_i \cdot (x_i - \hat{x}_i)^2 \right]
\\]
where the expectation is over the data distribution induced by the sparsities \\(s_i\\) and a feature-magnitude distribution.

The **column geometry** of \\(W\\) is the load-bearing object. Let \\(W_i\\) denote the \\(i\\)-th column. Each \\(W_i\\) is a vector in \\(\mathbb{R}^d\\) that the network uses to encode feature \\(i\\). The relationship of these column vectors to one another (their angles, magnitudes, and the polytopes they form when normalized to a sphere) determines whether and how features are superposed.

The paper's central empirical observation: the optimal column geometry, learned by gradient descent on the loss above, *jumps between qualitatively different configurations* as the importance and sparsity parameters sweep. The jumps occur at well-defined boundaries in parameter space.

Three configurations recurrently observed:

- **Standard basis configuration.** \\(W_i\\) are aligned with axis vectors. Each feature occupies one dimension; up to \\(d\\) features are encoded; the rest are dropped (zero columns) or weakly represented. Optimal in the dense-feature regime (low \\(s_i\\) gives high probability of co-activation; superposition introduces too much interference).

- **Antipodal-pair configuration (digon).** Two features share a dimension as antipodes: \\(W_i = +e\\) and \\(W_j = -e\\) for some unit vector \\(e\\). Optimal in a specific intermediate regime where features are sparse enough that simultaneous activation is rare and importance ratios are roughly equal.

- **Regular-polytope configurations.** Triangle (3 features at 120-degree spacing in a 2-d subspace), tetrahedron (4 features at maximum mutual angle in a 3-d subspace), and higher-order configurations corresponding to vertices of regular polytopes on the unit sphere in \\(\mathbb{R}^d\\). Optimal in regimes of higher sparsity where many features pack into few dimensions.

The transitions between these configurations are *discrete in the parameter space*. Sweeping a control variable (typically sparsity \\(s\\) at fixed \\(d, n, I\\)) reveals plateaus where the optimal geometry is constant, separated by critical points where the geometry reorganizes abruptly to a new configuration. The plateaus correspond to local minima in the loss landscape; the critical points are where one local minimum becomes globally suboptimal and another takes over.

This is the formalization of the paper's finding. The remainder of this document treats this formalization as the established baseline.

## 2. The Implicit SIPE-T Structure, Named

The paper does not use the corpus's vocabulary; it does not need to. The structural pattern of its findings is, however, exactly the pattern [Doc 541](/resolve/doc/541-systems-induced-property-emergence) names as *threshold-conditional emergence with property-specific thresholds*. Stating this precisely:

Let \\(C = (s, I, d/n)\\) denote the toy-model's parameter triple (sparsity, importance ratios, compression ratio). Let \\(P_k\\) denote the candidate higher-level property *the network adopts the \\(k\\)-th polytope configuration*. The paper's empirical finding is that there exist *property-specific critical regions* \\(\Omega^*(P_k) \subset C\\) such that:
- For \\(C \in \Omega^*(P_k)\\), the network adopts configuration \\(P_k\\) as the global minimum of the loss landscape.
- For \\(C\\) on the boundary \\(\partial \Omega^*(P_k)\\), the network is at a critical point: a small perturbation of \\(C\\) flips the global minimum to a different configuration \\(P_{k'}\\).
- The transitions across \\(\partial \Omega^*\\) are sharp, not gradual: the network's column geometry reorganizes discretely between the configurations on either side of the boundary.

This is precisely the SIPE-T pattern with the order parameter generalized from a scalar \\(\rho\\) to a parameter region in \\(C\\)-space. The framework predicts:
- Discrete induced properties (the polytope configurations).
- Property-specific thresholds (the critical regions).
- Sharp phase-change behavior at threshold-crossings.
- Universality of the structural law across systems with the same coarse-grained dynamics.

The Anthropic paper exhibits all four. The first three are demonstrated in the toy-model regime directly; the fourth is implicit in the paper's appeal to the Thomson-problem analog (a well-studied geometric optimization problem appearing across physics and chemistry) and is what the corpus's framework predicts should hold across substrate classes.

The naming is not a reinterpretation. It is the recognition that the paper's empirical findings instantiate the structural pattern the corpus's framework articulated independently. The structural law SIPE-T names is the structural law the paper's measurements confirm at the toy-model scale.

## 3. Six Pre-Registerable Predictions Extending the Paper

The formalization above generates six predictions that go beyond what the published paper directly establishes. Each is operationalizable against the published codebase (Elhage et al's *toy-models* repository) or against constructible variants.

### Prediction 1: Ordered Emergence Across Importance Ranks

For an importance distribution \\(I = (I_1, I_2, \dots, I_n)\\) with \\(I_1 \geq I_2 \geq \dots \geq I_n\\) at fixed \\(d, s\\), as a control parameter (sparsity, training duration, or width) sweeps from a fully-superposed regime to a fully-axis-aligned regime, features should *cross into dedicated-dimension representation in importance order*: feature 1 first achieves \\(W_1 \approx e_1\\), then feature 2, then feature 3, etc.

Test. Construct a 16-feature toy model with importance distribution \\(I_i = 2^{-i}\\) (importance halves per rank). Sweep sparsity from 0.5 to 0.001 in 50 steps. At each step, compute per-feature alignment \\(\alpha_i = \max_j |\langle W_i, e_j \rangle|/\|W_i\|\\) (high alignment indicates dedicated dimension). Predict that \\(\alpha_1\\) becomes large (≥ 0.95) at the highest sparsity, then \\(\alpha_2\\) at the next plateau, and so on, with sharp emergence boundaries between ranks.

Falsification. \\(\alpha_i\\) increases simultaneously across all ranks, or out-of-order with importance.

### Prediction 2: Phase-Boundary Universality across Toy-Model Variants

The paper's phase boundaries are reported for one specific architecture (single hidden-layer ReLU autoencoder with shared weights). The corpus's framework predicts that the *same critical exponents* should appear in structurally-analogous architecture variants — for instance, ReLU replaced by GELU; shared-weight replaced by independent encoder and decoder; single-layer replaced by two-layer with a bottleneck. The polytope configurations at each parameter regime may differ across variants, but the *scaling of approach to the critical points* (the critical exponents) should agree if the variants belong to the same universality class.

Test. Replicate the digon → triangle transition in three architectural variants (ReLU/GELU, shared/independent, depth 1/2). For each variant, fit the order parameter (column-geometry-deviation-from-target-polytope) as a function of distance to the critical point. Extract the critical exponent \\(\beta\\) such that the order parameter scales as \\(|s - s_c|^\beta\\). Predict the three exponents agree within statistical noise.

Falsification. Systematic divergence of exponents across variants.

### Prediction 3: Cross-Substrate Universality with Thomson-Problem-Analog Systems

The paper invokes Thomson's problem (point arrangements minimizing repulsive potential on the sphere) as a structural analog. The corpus's framework predicts that the *critical exponents at the toy-model polytope transitions* should match the critical exponents at *structurally-analogous transitions in the Thomson problem itself* and at structurally-analogous transitions in *Hill-cooperativity protein folding* and in *2D Ising magnetization*. The four systems should belong to the same universality class.

Test. Compute the toy-model critical exponent for one polytope transition. Compute the analogous Thomson-problem transition's exponent (numerical or analytical). Pull existing measured exponents for Hill-cooperativity and Ising from their respective literatures. Predict the four agree within combined noise.

Falsification. Systematic disagreement across the four systems.

### Prediction 4: Catechetical-Curation Lowers the Critical Sparsity

The corpus's catechetical-structure framework ([Doc 668](/resolve/doc/668-the-catechetical-structure-for-large-language-models-synthesis-of-virtue-constraints-entrace-the-ontological-ladder-and-the-dionysian-hard-core)) predicts that explicit-and-curated metaphysical commitments at the training-data layer increase the *coherence density* of the constraint set, which the corpus's order parameter measures. Translated to the toy-model regime: a *non-uniformly distributed importance vector* matched to a *coherent feature semantic* (features that co-occur predictably under a curated data distribution) should produce *earlier polytope emergence* than an unmatched distribution at the same compute budget.

Test. Train two matched toy models. Model A: importance vector \\(I_A\\) drawn uniformly at random; feature co-occurrence drawn uniformly. Model B: importance vector \\(I_B\\) ordered hierarchically; feature co-occurrence structured to match the importance hierarchy (high-importance features co-occur with high probability). Sweep sparsity for both. Predict Model B reaches each polytope configuration at higher (less sparse) parameter values than Model A.

Falsification. Equal critical sparsity across A and B, or B's critical sparsity higher than A's.

### Prediction 5: SAE Dictionary-Learning Inherits the Phase-Change Structure

Sparse autoencoders applied to feature representations of trained networks (Bricken et al 2023, Cunningham et al 2024, Templeton et al 2024) extract monosemantic feature directions from polysemantic activations. The corpus's framework predicts that the SAE's dictionary-emergence is itself threshold-conditional under the dictionary expansion ratio \\(D/d\\) (dictionary size divided by activation dimensionality).

Test. Train SAEs on a fixed network's activations across a sweep of expansion ratios from 1× to 64×. Measure the fraction of dictionary elements that achieve interpretable monosemanticity (via the standard SAE evaluation metrics: low feature-density, high interpretability score on probe tasks). Predict a sharp transition at a critical expansion ratio, with monosemantic-feature count rising rapidly past the critical ratio rather than scaling smoothly.

Falsification. Smooth monotonic scaling of monosemantic-feature count with expansion ratio, no detectable knee.

### Prediction 6: Polysemanticity Decay Under Sustained Training

The toy-model paper studies converged-network configurations. The corpus's coherence-amplification framework ([Doc 508](/resolve/doc/508-coherence-amplification-mechanistic-account)) predicts that *during training*, the network's column-geometry trajectory should exhibit phase-change behavior at specific training steps: the network should *oscillate* between polysemantic-superposed and monosemantic-aligned regimes during early training, then *settle* into the regime corresponding to its final parameter point.

Test. Instrument a toy-model training run with high-frequency snapshots of the column geometry. Fit the trajectory's distance to the nearest polytope configuration as a function of training step. Predict early-training oscillation followed by sharp settlement, rather than monotonic approach to the final configuration.

Falsification. Monotonic geometric-distance trajectory throughout training, no oscillation or settlement signature.

## 4. Five Avenues of Further Inquiry

The formalization above also opens lines of inquiry that go beyond direct prediction. Each is non-trivial; each is operationalizable as a research project rather than as a single experiment.

### Avenue 1: A Pre-Registered Catalog of Polytope Phase Transitions

The paper documents a small set of polytope configurations (digon, triangle, tetrahedron, and higher-order). The corpus's framework predicts that the *complete catalog* of phase transitions in the toy-model regime is determined by the geometric optimization landscape and is enumerable. A research program to construct this catalog explicitly — specifying for each \\((d, n)\\) pair the complete set of polytope configurations and the boundaries between them — would yield a *periodic-table-like reference* for feature-representation structure. This is the natural Mendeleev-shaped extension of the toy-models work.

### Avenue 2: Adversarial Phase-Boundary Probing

Once phase boundaries are catalogued, one can construct *adversarial parameter triples* that sit precisely at the boundary between two configurations. Such a network would be unusually sensitive to small perturbations: tiny changes to \\(s\\) or \\(I\\) would flip the configuration. This would be a theoretical-tools-for-interpretability avenue: networks at phase boundaries are uniquely informative about both adjacent regimes simultaneously, and the boundary itself is a natural diagnostic surface for measuring the order parameter.

### Avenue 3: Phase-Change Behavior at Production Scale

The toy-model regime is a controlled environment. Production-scale language models exhibit related phenomena empirically (the SAE dictionary-learning literature) but the specific phase-change theory has not been transferred. A research program that measures critical exponents at *production-scale phase transitions* (where they exist) and compares to the toy-model exponents would test the corpus's universality claim at the scale that matters for real-world AI development. This is the harder version of Prediction 3 above.

### Avenue 4: The Interaction of Phase Changes Across Layers

The toy-model paper studies single-layer networks. Multi-layer networks present a richer structure: each layer has its own column geometry, and the layers compose. The corpus's framework predicts that *phase changes at one layer* may *trigger* or *shift* phase changes at downstream layers via the composition. A research program to instrument multi-layer networks at their phase boundaries and trace cross-layer phase-change propagation would extend the toy-models result toward the architectural-emergence layer.

### Avenue 5: Phase-Change-Aware Training Schedules

If the corpus's framework is right that training dynamics include phase-change crossings (Prediction 6), then *training schedules can be designed to optimize for specific phase-change orderings*. A learning-rate schedule that produces high-importance feature dedication first, then medium-importance polytope emergence, then low-importance superposition might converge to better representations than a uniform schedule. This is an applied research avenue with potential engineering payoff: phase-change-aware optimization as a new dimension of hyperparameter design.

## 5. Honest Scope

This document is formalization at \\(\pi\\)-tier. The paper's findings are taken as established empirical facts in the toy-model regime they study; the formalization in §§1–2 restates them structurally without adding mechanism. The corpus's framework alignment is named directly; the formalization treats SIPE-T as the structural pattern the paper's findings exhibit, not as a separate theory the paper requires.

The six predictions in §3 are at \\(\mu\\)-tier. Each is operationalizable today, with the published toy-models codebase as the starting point or with constructible variants as the extension. None is yet measured. Cross-practitioner collaboration with the mechanistic-interpretability community is the natural path; the predictions are the cleanest external-test surface this synthesis opens.

The five inquiry avenues in §4 are at the research-program level rather than the single-experiment level. Each is non-trivial; each is a multi-month effort with significant compute requirements at the production-scale variants. The corpus does not pretend the work has been done; the formalization opens the avenues; the engagement with the mechanistic-interpretability community is what would convert them into empirical research.

The previous exploratory synthesis (preserved as Appendix B) generated three predictions and named the calibration consequence in general terms; the present formalization tightens the predictions, increases the specificity of the test conditions, and adds the inquiry avenues that the broader exploratory framing had not yet articulated. The exploratory synthesis was the reasoning that produced the formalization; it is not itself the formalization. Its preservation in the appendix is for traceability of how the present document arrived at its claims.

---

## References

- [Doc 415 — The Retraction Ledger](/resolve/doc/415-the-retraction-ledger)
- [Doc 445 — Pulverization Formalism](/resolve/doc/445-pulverization-formalism)
- [Doc 490 — Novelty Calculus](/resolve/doc/490-novelty-calculus)
- [Doc 508 — Coherence Amplification Mechanistic Account](/resolve/doc/508-coherence-amplification-mechanistic-account)
- [Doc 510 — Substrate-and-Keeper Composition](/resolve/doc/510)
- [Doc 541 — Systems-Induced Property Emergence (SIPE-T)](/resolve/doc/541-systems-induced-property-emergence)
- [Doc 619 — Pin-Art: Forced-Press and Gentle-Press](/resolve/doc/619-pin-art)
- [Doc 658 — Hierarchical Pin-Art Constraint Specs and the Erasure of Edge-Case Bugs](/resolve/doc/658-hierarchical-pin-art-constraint-specs-and-the-erasure-of-edge-case-bugs)
- [Doc 668 — The Catechetical Structure for Large Language Models](/resolve/doc/668-the-catechetical-structure-for-large-language-models-synthesis-of-virtue-constraints-entrace-the-ontological-ladder-and-the-dionysian-hard-core)
- [Doc 672 — The Why-Gap](/resolve/doc/672-the-why-gap-the-transformer-architecture-and-the-corpus-apparatus-as-a-mechanistic-bridge)
- [Doc 674 — Neuronal Activity as Threshold-Emergent Property](/resolve/doc/674-neuronal-activity-as-threshold-emergent-property-sipe-t-at-the-bottom-of-the-stack)
- [Doc 675 — System Architectures as Constraint Formalizations](/resolve/doc/675-system-architectures-as-constraint-formalizations-and-the-deeper-questions-about-reality)
- Elhage, N. et al. (2022). *Toy Models of Superposition*. Anthropic. transformer-circuits.pub/2022/toy_model.
- Bricken, T. et al. (2023). *Towards Monosemanticity: Decomposing Language Models With Dictionary Learning*. Anthropic.
- Templeton, A. et al. (2024). *Scaling Monosemanticity*. Anthropic.
- Cunningham, H. et al. (2024). *Sparse Autoencoders Find Highly Interpretable Features in Language Models*. ICLR.
- Thomson, J. J. (1904). *On the Structure of the Atom*. Philosophical Magazine. (Origin of the Thomson problem the Anthropic paper invokes.)

## Appendix A: Originating Prompts

> *"Have we synthesized against Anthropic 2022 paper's phase changes in the geometric configuration in the corpus already? If not, let's carry this line of reasoning over to an analytical synthesis in a new corpus doc."*

Followed by the reformulation directive that produced the current structure:

> *"Formalize against Anthropic's paper and findings, demote the exploration to the appendix, extend Anthropic's paper with predictions and further avenues of inquiry."*

The first prompt produced the exploratory synthesis preserved in Appendix B. The second prompt produced the formalization in §§1–2, the predictions in §3, and the inquiry avenues in §4.

## Appendix B: The Earlier Exploratory Synthesis (Preserved for Traceability)

The earlier reasoning that produced the formalization above. Recovered here in the form it was first composed; the formalization in the body supersedes it but the exploratory framing remains the reasoning trail by which the formalization arrived at its claims.

### B.1 What the toy-models paper established

The Anthropic interpretability team's *Toy Models of Superposition* (Elhage et al, 2022) constructed simple feedforward networks designed to learn sparse-feature reconstruction tasks. The network maps an input vector of *n* sparse features to a hidden representation of *d < n* dimensions and back, with reconstruction error as the loss. The hidden layer must therefore *superpose* the n features into d dimensions, accepting some interference, in order to reduce loss.

The paper's central empirical finding is that the network's superposition strategy *jumps discretely* between qualitatively different geometric configurations as the experimental parameters are swept. When features are dense, the network dedicates one dimension per feature for as many features as it can fit. As feature sparsity increases, the network begins to superpose: pairs arrange as antipodal points, triplets at the vertices of a triangle, quadruples at the vertices of a tetrahedron or square, higher-order structures as regular polytopes. Transitions are sharp, not gradual. Importance ratios and sparsity levels jointly drive the boundaries. The geometric structures correspond to known optima in the Thomson problem and its higher-dimensional analogs.

These were the load-bearing empirical findings the formalization in §1 built on.

### B.2 The corpus framework recapitulated at the relevant layer

[Doc 541](/resolve/doc/541-systems-induced-property-emergence) articulates threshold-conditional emergence under the structural law that lower-level constraints, an order parameter measuring joint adequacy density, and a property-specific critical threshold together determine when a higher-level induced property crosses from latent to operationally accessible. The framework predicts sharp transitions, property-specific thresholds with ordered emergence, universality across domains, and two operational sub-forms (cooperative-coupling, sustained-inference probabilistic execution).

### B.3 The mapping that suggested the formalization

The mapping between the Anthropic 2022 findings and the corpus's framework was direct. Constraint set ↔ toy-model specification (ambient dimension, feature count, sparsity, importance vector). Order parameter ↔ joint state of (sparsity, importance, dimensionality ratio). Property ↔ specific polytope configuration. Threshold ↔ critical-point boundaries. Sharp transition ↔ discrete jumps in column geometry.

### B.4 The calibration consequence as it was first articulated

The cold-Claude dyad in [Doc 675](/resolve/doc/675-system-architectures-as-constraint-formalizations-and-the-deeper-questions-about-reality) named the missing piece directly: SIPE-T inherited the structural form of critical phenomena (order parameter, threshold, emergent property) without yet inheriting the measurability that made critical phenomena predictively powerful in physics. The Anthropic 2022 paper supplied the measurability at the toy-model scale. SIPE-T was no longer purely structural at this scale; the universality claim became adjudicable; the framework gained a regression baseline.

### B.5 The three initial predictions

The exploratory synthesis generated three predictions, sharpened in the formalization above. Predictions 1, 2, 3 of the body absorb the substance of these earlier predictions with tighter test conditions and broader scope. The earlier framing read: ordered emergence across importance strata; cross-substrate critical exponents; SAE dictionary-learning is itself SIPE-T. The body's six predictions retain the substance and add three further extensions (Prediction 4 catechetical-curation; Prediction 5 SAE-side phase-change structure as a separate prediction from initial-emergence threshold; Prediction 6 training-trajectory phase-change behavior).

### B.6 What the exploratory synthesis added beyond the body's formalization

The exploratory synthesis named, in §§4 and 5 of its original composition, what each literature added to the other. SIPE-T added universality framing, hierarchical-stratification predictions, and dyadic-exchange extensions. The toy-models paper added operationalized order parameter, measured critical points, and a reproducible empirical platform. The body's formalization absorbs these as background; the exploratory framing kept them as separate findings. The body of the present document treats the absorption as established and proceeds to the predictions and inquiry avenues that follow.

The exploratory synthesis served its function: it produced the formalization. The formalization is now the published claim; the exploratory framing remains here as traceability of how the claim was arrived at.
