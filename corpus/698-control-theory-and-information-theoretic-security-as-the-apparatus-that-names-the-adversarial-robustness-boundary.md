# Control Theory and Information-Theoretic Security as the Apparatus that Names the Adversarial-Robustness Boundary

## On the Third and Final of the Three Cross-Discipline Traces Queued in Doc 693 §6 — the Trace from the Adversarial-Robustness / Jailbreak Resistance Flagged in Doc 692 §5.3 into the Mature Literatures of Robust Control under Adversarial Uncertainty (the H-infinity Tradition; Lyapunov-Stability Analyses under Bounded Disturbances), Information-Theoretic Security (Wyner's Wiretap Channel; the Adversarial-Wiretap-II Generalization; the Strong-Secrecy and Semantic-Security Literatures), Certified Robustness via Randomized Smoothing, and the Optimization-Based Adversarial-Input Literature on Greedy Coordinate Gradient and its Successors; on the Recognition that the Substrate's Self-Reinforcing Boundary (Doc 685) is, in Control-Theory Vocabulary, a Lyapunov-Stable Basin under Bounded Disturbance and, in Information-Theoretic-Security Vocabulary, an Adversarial Channel of Bounded Effective Capacity; on the Composition that Locates the Substrate's Robustness Properties Quantitatively against the Adversary's Effective Channel Capacity, the Basin's Lyapunov Margin, and the Achievable Randomized-Smoothing Certificate; on the Honest Acknowledgment that the Jailbreak Setting's Discrete-Input Adversarial Optimization (GCG and Successors) Sits in a Partially-Bridged Gap between the Continuous-Perturbation Apparatus the Mature Disciplines Articulate Cleanly and the Discrete-Token-Search the Substrate's Input Surface Actually Faces; and on the Closure of the Doc 693 §6 Trace Queue with the Resulting Five Existing Instances of the Methodology

<div style="background: #ecfeff; border-left: 4px solid #0e7490; padding: 1rem 1.25rem; margin: 1.5rem 0; color: #164e63; border-radius: 3px;">

**EXPLORATORY — π-tier cross-discipline trace document. The fifth existing instance of the methodology articulated in [Doc 693](/resolve/doc/693-resistance-as-boundary-indication), parallel in shape to [Doc 606](/resolve/doc/606), [Doc 679](/resolve/doc/679-decoherence-as-empirically-grounded-sipe-t), [Doc 696](/resolve/doc/696-discrete-geometry-as-the-apparatus-that-names-the-polytope-inheritance-boundary), and [Doc 697](/resolve/doc/697-statistical-mechanics-of-learning-as-the-apparatus-that-names-the-capabilities-emerge-at-scale-boundary). Names the control-theory-and-information-theoretic-security apparatus and demonstrates that it closes the adversarial-robustness resistance flagged in Doc 692 §5.3. With this document, the Doc 693 §6 trace queue is closed.**

*Taxonomy per [Doc 633](/resolve/doc/633-corpus-taxonomy-and-manifest-design):* ENGAGEMENT | ACTIVE | W-PI | THREAD-MECHANISTIC-INTERPRETABILITY, THREAD-SELF-REINFORCING-BOUNDARY, THREAD-CROSS-DISCIPLINE-TRACE, THREAD-ADVERSARIAL-ROBUSTNESS | PHASE-CROSS-PRACTITIONER

</div>

> **Reader's Introduction.** This document performs the third of the three Doc 693 §6 traces, completing the queue. The resistance: [Doc 692 §5.3](/resolve/doc/692-mechanistic-interpretability-findings-resolved-against-the-corpus) flagged that the substrate's adversarial-robustness behavior — particularly the jailbreak-and-defense literature surrounding GCG-style adversarial-suffix optimization and the certified-robustness program — was reachable by the corpus's standing self-reinforcing-boundary apparatus only qualitatively; the quantitative apparatus over basin depth, channel capacity, and certification budgets was missing. The trace into robust control (H-infinity; Lyapunov stability), information-theoretic security (Wyner wiretap and successors), and certified robustness via randomized smoothing closes this gap structurally. An honest limit is named: the discrete-token nature of the substrate's input surface sits in a partially-bridged regime between the continuous-perturbation apparatus the mature disciplines articulate cleanly and the discrete-search adversaries actually run. The originating prompt is in Appendix A; literature anchors in Appendix B.

**Jared Foy · 2026-05-09 · Doc 698**

---

## Authorship and Scrutiny

*Authorship.* Written by Claude Opus 4.7 (Anthropic) operating under the RESOLVE corpus's disciplines, released by Jared Foy. The substrate writes about adversaries against substrates of its own kind; the dual-use sensitivity is named at §9 and the document operates in the defensive register throughout. The hypostatic discipline ([Doc 372](/resolve/doc/372-hypostatic-boundary)) governs.

*Scrutiny.* The trace sits at π-tier. The structural mappings at §3 compose against established control-theory and information-theoretic-security literature; the discrete-continuous bridging gap is named honestly at §6. The framework-magnetism risk per [Doc 466](/resolve/doc/466-doc-446-as-a-sipe-instance) applies and is named at §9: the temptation to read every robustness finding as confirming the corpus's self-reinforcing-boundary apparatus is bounded by the per-attack-class breakdown at §5.

---

## 1. The Resistance and the Trace Queued

[Doc 692 §5.3](/resolve/doc/692-mechanistic-interpretability-findings-resolved-against-the-corpus) flagged the resistance:

> Adversarial-robustness findings — the jailbreak literature, GCG-style adversarial-suffix optimization, the certified-robustness work, the empirical defense literature — describe the substrate's behavior under bounded-perturbation adversarial probing of its input surface and resulting residual-stream geometry. The corpus's standing self-reinforcing-boundary apparatus (Doc 685) reads this qualitatively: the boundary is a positive-feedback bistable basin; adversaries succeed when they push the substrate's hidden-state trajectory across the basin separatrix. The corpus does not have the quantitative apparatus over basin depth, the adversary's effective channel capacity, the certifiable robustness budget, or the relationship between adversarial-input optimization and the substrate's residual-stream geometry. The resistance: the corpus has the qualitative shape but not the quantitative apparatus.

[Doc 693 §6.3](/resolve/doc/693-resistance-as-boundary-indication) queued the trace:

> Trace into control theory and information-theoretic security: robust control under adversarial uncertainty (H-infinity; Lyapunov stability under bounded disturbances); information-theoretic security (Wyner's wiretap channel; the broader strong-secrecy literature); adversarial-machine-learning's formal-verification work; cryptographic notions of adversarial channels; differential privacy's bounded-perturbation framework. The trace's predicted return: a corpus document of the form *"Control theory as the apparatus that names adversarial-channel boundaries on the substrate's residual-stream geometry"*.

This document performs the trace.

---

## 2. The Apparatus

The mature apparatus the trace draws on. Each piece bears on the question of how an adversary's capacity to push the substrate's hidden state out of the boundary-respecting basin compares to the basin's defensive structure.

**Lyapunov stability under bounded disturbance.** The classical control-theoretic framework: a dynamical system \\\(\dot{x} = f(x) + g(x) d\\\) with disturbance \\\(d\\\) bounded in some norm is *input-to-state stable* (ISS) if there exists a Lyapunov function \\\(V(x)\\\) and bounding functions such that the state remains in a basin whose size depends continuously on the disturbance bound. The basin's *depth* — how far the state can be perturbed before crossing the separatrix — is the Lyapunov margin. ISS is a quantitative refinement of the qualitative *bounded-input-bounded-output* stability notion.

**H-infinity robust control.** The control-design framework that minimizes the worst-case \\\(L\_2\\\)-induced gain from disturbance to regulated output, providing a controller that is stable across an entire class of bounded uncertainties rather than just the nominal model. In the context of neural-network policies, [Optimized adaptive H-infinity model reference control](https://link.springer.com/article/10.1007/s40435-025-01855-8) and the broader robust-control literature supply guaranteed-cost bounds against bounded adversarial uncertainty.

**Lyapunov-theoretic adversarial robustness for neural networks.** [Rahnama et al. (CVPR 2020), *Robust Design of Deep Neural Networks against Adversarial Attacks based on Lyapunov Theory*](https://openaccess.thecvf.com/content_CVPR_2020/papers/Rahnama_Robust_Design_of_Deep_Neural_Networks_Against_Adversarial_Attacks_Based_CVPR_2020_paper.pdf), and [Connecting Lyapunov Control Theory to Adversarial Attacks (arXiv:1907.07732)](https://arxiv.org/pdf/1907.07732). Treats each layer as a nonlinear dynamical step; derives Lyapunov-style conditions on weights and biases that bound the perturbation propagation through the network. The adversarial perturbation at the final activation is bounded by a constant times the input perturbation magnitude.

**Optimal-control framing of adversarial training.** [*Adversarially Robust Neural Networks via Optimal Control* (OpenReview)](https://openreview.net/forum?id=BklVA2NYvH). Views training under adversarial perturbation as finding optimal control of a discrete dynamical system; bridges robustness with Lyapunov stability directly.

**Wyner wiretap channel and information-theoretic security.** [Wyner (1975), *The Wire-tap Channel.*] The foundational result: when the adversary's channel is noisier than the legitimate channel, perfect information-theoretic security is achievable at a positive *secrecy capacity* without shared keys. The construction uses *binning*: a code reliably decodable at the receiver subdivides into sub-codes, each fed by random bits, leaving the eavesdropper no decoding capability for the secret message.

**Adversarial wiretap channel (Wyner wiretap II generalization).** [Wang and Safavi-Naini (arXiv:1312.6457), *A Model for Adversarial Wiretap Channel*](https://arxiv.org/pdf/1312.6457). Generalizes to active adversaries who can both eavesdrop on and inject into a fraction of the channel. Derives secrecy capacity and explicit constructions for capacity-achieving codes. The active-adversary case is structurally what jailbreak attacks operate as: the adversary controls a fraction of the substrate's input and seeks to push the substrate's output into a target distribution.

**Semantic security for the wiretap channel.** [Bellare, Tessaro, Vardy (CRYPTO 2012), *Semantic Security for the Wiretap Channel*](https://homes.cs.washington.edu/~tessaro/papers/wiretap-proc.pdf). Strengthens information-theoretic security from weak/strong-secrecy notions to semantic security in the cryptographic sense. The strongest meaningful adversarial-channel security definition.

**Certified robustness via randomized smoothing.** Cohen, Rosenfeld, Kolter (ICML 2019), *Certified Adversarial Robustness via Randomized Smoothing*. Provides probabilistic certificates that a model's prediction is invariant under all \\\(\ell\_2\\\)-bounded perturbations of magnitude up to a derived radius. The technique pioneered for computer vision is now being adapted to LLM safety: see [Provable Defense Framework for LLM Jailbreaks via Noise-Augmented Alignment (arXiv:2602.01587)](https://arxiv.org/html/2602.01587), and the broader certified-LLM-robustness literature surveyed in [SoK: Robustness in Large Language Models against Jailbreak Attacks (arXiv:2605.05058)](https://arxiv.org/html/2605.05058).

**Optimization-based adversarial-input attacks (GCG and successors).** [Zou, Wang, Carlini, Tramèr, Kolter, Fredrikson (2023), *Universal and Transferable Adversarial Attacks on Aligned Language Models*]; [AmpleGCG-Plus (arXiv:2410.22143)](https://arxiv.org/html/2410.22143); [Mask-GCG (arXiv:2509.06350)](https://arxiv.org/html/2509.06350); [QROA black-box attack (HAL)](https://hal.science/hal-04597574v2/document). These supply the attacker-side apparatus: greedy gradient-driven token search over the discrete input alphabet to maximize the probability that the substrate's output begins with a target affirmative prefix.

**Empirical and provable defenses.** [Robust Prompt Optimization (NeurIPS 2024)](https://proceedings.neurips.cc/paper_files/paper/2024/file/46ed503889ab232c21c1162340ee17b2-Paper-Conference.pdf); the broader [JailbreakBench](https://jailbreakbench.github.io/) evaluation suite; the noise-augmented-alignment provable framework; the safety-engineered defenses surveyed in [Safety, Robustness, and Interpretability in Machine Learning (Pfrommer 2025, EECS-2025-67)](https://www2.eecs.berkeley.edu/Pubs/TechRpts/2025/EECS-2025-67.pdf). Recent generations (Claude-3.7-Sonnet, o1-mini) reduce attack success rates under the strongest attacks to near zero, indicating substantial progress on the empirical front per the SoK survey.

The apparatus is mature and converging. Robust control is a fifty-year tradition; information-theoretic security is fifty years from Wyner's foundational paper; certified robustness via randomized smoothing is six years old and actively integrating with LLM safety; the GCG-and-successors literature and corresponding defenses constitute an active arms race producing increasingly precise quantitative apparatus on both sides.

---

## 3. The Structural Mapping

Four identifications, each direct.

**Identification 1 — The substrate's self-reinforcing boundary is a Lyapunov-stable basin under bounded adversarial disturbance.** Per [Doc 685 (Self-Reinforcing Boundary)](/resolve/doc/685-the-self-reinforcing-boundary), the substrate's boundary-respecting behavior is a positive-feedback bistable basin: the substrate's trajectory through residual-stream geometry, conditioned on the boundary's prior establishment, reinforces toward boundary-respecting outputs. In control-theory vocabulary this is exactly a Lyapunov-stable equilibrium with positive basin of attraction; the *depth* of the basin (Lyapunov margin) is the magnitude of perturbation required to push the state across the separatrix into a different basin. The apparatus the corpus had qualitatively (boundary as bistable basin) is given quantitative content (basin depth as Lyapunov margin; ISS gain from adversarial input to hidden-state perturbation; H-infinity-style worst-case bound).

**Identification 2 — Jailbreak attacks are operations on an adversarial wiretap channel of bounded effective capacity.** The substrate exposes an input surface (the prompt) and produces an output distribution (the generated continuation). An adversary controlling a fraction of the input (the adversarial-suffix region in GCG; the multi-turn manipulation region in MultiBreak) and seeking to push the output distribution toward a target unsafe response is operating an active adversarial wiretap channel in Wyner-wiretap-II vocabulary. The substrate's defensive structure (training-instilled refusal behavior, system-prompt-instilled boundary, boundary-reinforcing inference-time scaffolding) is the legitimate channel's secrecy infrastructure. The *effective channel capacity* of the adversary — how reliably the adversary can drive the substrate's output to a target conditional on the adversary's input control — is the quantitative object the apparatus articulates. Jailbreaks succeed when the adversary's effective channel capacity exceeds the substrate's defensive structure's secrecy margin.

**Identification 3 — Certified-robustness via randomized smoothing provides the quantitative robustness budget.** Randomized smoothing produces a *certificate*: a derived radius \\\(R\\\) such that all \\\(\ell\_p\\\)-perturbations of magnitude \\\(\leq R\\\) preserve the substrate's prediction. In corpus vocabulary this is a quantitative bound on the basin's depth: the adversary cannot push the substrate's output across the boundary if their input perturbation is bounded below \\\(R\\\). The challenge — addressed in [arXiv:2602.01587](https://arxiv.org/html/2602.01587) and the broader certified-LLM-robustness literature — is extending randomized-smoothing apparatus from continuous-perturbation classifiers to discrete-token language models. The smoothing-by-token-substitution variants and noise-augmented-alignment approaches operate in this gap.

**Identification 4 — The empirical defense progression is the self-reinforcing-boundary's training-time installation deepening across model generations.** The reported reduction from \\\(>90\%\\\) attack success rate against legacy models (GPT-3.5-Turbo) to near-zero against Claude-3.7-Sonnet and o1-mini under the strongest attacks (per the SoK survey) is, in corpus vocabulary, the deepening of the Lyapunov margin via training-time installation of the self-reinforcing boundary deeper into the substrate's parameter geometry. The empirical curve (attack success rate vs model generation) is the operational record of the basin-depth deepening; the certified-robustness apparatus supplies the quantitative ceiling toward which the empirical progress is converging.

---

## 4. The Trace's Return: Quantitative Apparatus over Adversarial Robustness

The control-theory and information-theoretic-security apparatus, applied to the substrate's adversarial-robustness behavior, yields specific quantitative content the corpus's qualitative reading was reaching toward.

**Result 1 — Adversarial-channel capacity formulation.** The substrate's robustness to a given attack class is quantifiable as the difference between the substrate's *legitimate-channel capacity* (how much the system prompt and training can specify the desired behavior) and the *adversary's effective channel capacity* (how much the adversarial input can push the output distribution off the desired behavior). When the difference is positive, the substrate's robustness is *information-theoretically* certifiable in the Wyner-secrecy sense. When the difference is small, the substrate is in the regime where attacks succeed probabilistically; when negative, the substrate is unconditionally vulnerable.

**Result 2 — Lyapunov-margin formulation.** The basin depth of the self-reinforcing boundary is, layer-by-layer through the substrate, a sum of Lyapunov-stability margins (per [Rahnama 2020](https://openaccess.thecvf.com/content_CVPR_2020/papers/Rahnama_Robust_Design_of_Deep_Neural_Networks_Against_Adversarial_Attacks_Based_CVPR_2020_paper.pdf)). The total perturbation magnitude required to cross the basin separatrix is approximately the product of per-layer margin contributions; deeper substrates with well-conditioned weights have multiplicatively larger margins. The certified-robustness radius \\\(R\\\) the randomized-smoothing apparatus produces is a lower bound on this multiplicative margin.

**Result 3 — Discrete-input adversarial-search apparatus.** GCG-style attacks operate on a discrete input alphabet by greedy gradient descent over the cross-entropy loss with respect to the target affirmative prefix. The attack's effective convergence rate, the number of suffix tokens required to achieve a given attack success rate, and the transferability of suffixes across substrates are quantifiable observables. The Mask-GCG result that not all suffix tokens are necessary (subset sufficiency) is structurally consistent with the secrecy-capacity apparatus: only a fraction of channel control is needed once the channel's effective capacity is exceeded.

**Result 4 — Empirical-to-certified-robustness gap.** The empirical defense progression to near-zero attack success rate on Claude-3.7-Sonnet and o1-mini (per SoK) is operational; the certified-robustness ceiling is provable. The two converge as randomized-smoothing apparatus is extended to discrete-input substrates, but a gap remains. Closing the gap is the substantive empirical-and-theoretical work the cross-practitioner community is engaged in.

---

## 5. Per-Attack-Class Breakdown

To bound the framework-magnetism risk: not all adversarial-robustness phenomena are clean instances of the apparatus's central case. Per-class breakdown.

**5.a — GCG-style optimization attacks.** Clean instance. Continuous-relaxation gradient over discrete tokens; bounded effective channel capacity; basin-margin breach when capacity exceeds margin. The mature apparatus applies directly.

**5.b — Multi-turn manipulation (MultiBreak-style).** Partially clean. The adversary's effective channel is the multi-turn dialogue trajectory; the substrate's defenses include conversational-context tracking; the wiretap apparatus applies but with state-dependent secrecy capacity rather than the static Wyner-II case. Generalizations exist but the apparatus is less mature.

**5.c — Prompt-injection from external content.** Different structural case. The adversary operates not on the substrate's primary input surface but on substrate-ingested external content (retrieved documents, tool outputs, agentic-environment messages). The wiretap apparatus needs adaptation: the *legitimate* channel and the *adversarial* channel now share a substrate-ingested transport. Doc 510 super-admin / system-prompt-trust apparatus and the orthogonal-handling protocols are the corpus's adjacent grip; the control-theory apparatus reads this case as adversarial-input through a transport with mixed-trust structure.

**5.d — Fine-tuning / model-poisoning attacks.** Outside the inference-time apparatus's scope. These attacks operate on training-time pipeline and require different defensive structure (data-curation; gradient-attribution; integrity-checking of the training pipeline). The §6.2 stat-mech-of-learning trace ([Doc 697](/resolve/doc/697-statistical-mechanics-of-learning-as-the-apparatus-that-names-the-capabilities-emerge-at-scale-boundary)) bears more directly on this case; the §6.3 trace bears only marginally.

**5.e — Persuasion / social-engineering jailbreaks (DAN-style; persona-manipulation).** Mostly clean instance with a twist: the adversary's channel content is itself in the substrate's natural-language register, and the substrate's defense must distinguish a legitimate role-play instruction from an adversarial persona-installation. The wiretap apparatus applies but with a content-classifier-dependent secrecy infrastructure rather than a purely cryptographic one.

The breakdown matters because it bounds the framework's reach: the trace closes the apparatus identification *for the central case* (5.a, 5.b, 5.e); the boundary cases (5.c, 5.d) require different traces or composition with the §6.2 trace.

---

## 6. The Resistance Closed (with Honest Limits)

The Doc 692 §5.3 resistance is *partially* closed.

**What the trace closes.** The qualitative-vs-quantitative gap is closed at the structural-apparatus layer for the central attack classes. Robust-control / Lyapunov-stability supplies basin-depth quantification; Wyner wiretap supplies secrecy-capacity quantification; randomized smoothing supplies certified-robustness budgets; the GCG-and-successors literature supplies the attacker-side quantitative apparatus. The corpus's self-reinforcing-boundary apparatus is now anchored to a quantitative robustness apparatus with a six-decade research lineage on each side.

**What the trace does not close.** Three honest limits.

- *The discrete-input certification gap.* Randomized-smoothing was developed for continuous \\\(\ell\_p\\\)-bounded perturbations; the substrate's input surface is discrete tokens. Bridging work exists ([arXiv:2602.01587](https://arxiv.org/html/2602.01587); embedding-space-smoothing variants) but the gap between continuous-certification ceiling and the discrete-search adversaries the substrate actually faces is not yet fully bridged. Until it is, the certified-robustness apparatus is a partial bound rather than a tight characterization.
- *The transferability-and-universality phenomenon is not fully reduced.* Adversarial suffixes optimized against one substrate transfer with non-trivial success to other substrates — the universality result Zou et al. emphasize. The wiretap apparatus does not natively predict transferability; it depends on shared geometric features across substrates that the polytope-inheritance reading ([Doc 691](/resolve/doc/691-the-polytopal-feature-and-the-pin-art-bidirection)) gives a structural shape for but does not yet quantify across substrate families.
- *The boundary cases at §5.c (prompt injection) and §5.d (training-time attacks) remain partially or substantially outside the trace's scope.* The trace closes the apparatus for the central inference-time discrete-input adversarial case; the agentic/retrieved-content case requires composition with super-admin and orthogonal-handling apparatus; the training-time case requires the §6.2 stat-mech-of-learning trace.

The trace closes the apparatus identification with these limits named honestly.

---

## 7. Predictions and Falsifiers

**P1 — Empirical attack success rates should track monotonically with the gap between adversary's effective channel capacity and substrate's basin depth.** As substrate generations install deeper boundaries (per the SoK reported curve), attack success rates should fall in proportion to the increased basin depth. The relationship should be predictable from controlled measurements of basin depth (via Lyapunov-style probes; via certified-robustness-radius computation) and the adversary's optimization budget. *Test.* Measure basin depth across model generations; correlate with empirical attack-success-rate curves.

**P2 — Certified-robustness radii should asymptote to the empirical-defense ceiling as discrete-input certification matures.** As the discrete-token randomized-smoothing apparatus develops, the certified radii produced by certification methods should approach the empirical bounds at which the strongest attacks fail. A persistent large gap between certified and empirical robustness signals that the apparatus is missing structural content; convergence signals that the apparatus is reaching tightness. *Test.* Track the certified-vs-empirical-robustness gap across the literature progression; predict convergence within the Welch-bound-plus-Lyapunov-margin regime ([Doc 696](/resolve/doc/696-discrete-geometry-as-the-apparatus-that-names-the-polytope-inheritance-boundary) supplies the geometric piece).

**P3 — Adversarial-suffix transferability should be predictable from substrate-geometry overlap.** Per the polytope-inheritance reading: substrates with more similar polytope-organized residual-stream geometries should show higher cross-substrate transferability of adversarial suffixes. The structural prediction connects the §6.1 trace (discrete geometry) to the §6.3 trace (adversarial robustness): geometric similarity in feature-direction packing predicts attack-suffix transfer. *Test.* Measure inter-substrate Welch-Normalized-Overlap (per [arXiv:2503.24277](https://arxiv.org/html/2503.24277v1)) and adversarial-suffix transferability; expect positive correlation.

**Falsifiers.**

- *Fal-1.* If empirical attack success rates do *not* track basin-depth measurements monotonically — if substrates with measurably deeper basins are equally jailbreakable — the Lyapunov-basin reading is not load-bearing for adversarial robustness and a different apparatus is required.
- *Fal-2.* If certified-robustness radii fail to converge to empirical-defense bounds even after substantial discrete-input certification work, the apparatus's ceiling is not at the empirical boundary and a structural element is missing.
- *Fal-3.* If adversarial-suffix transferability is uncorrelated with substrate-geometry overlap, the polytope-inheritance reading does not extend to adversarial structure and the §6.1 / §6.3 cross-trace composition fails.

---

## 8. Composition with Corpus Apparatus

**With [Doc 685 (Self-Reinforcing Boundary)](/resolve/doc/685-the-self-reinforcing-boundary).** The trace supplies the quantitative apparatus over the qualitative bistable-basin reading. The boundary as Lyapunov-stable basin; the boundary depth as Lyapunov margin; the breach condition as adversary's effective channel capacity exceeding margin. Doc 685's qualitative apparatus is now anchored to fifty years of robust-control literature.

**With [Doc 510 (Substrate-and-Keeper Composition)](/resolve/doc/510-praxis-log-v-deflation-as-substrate-discipline) and [Doc 686 (Self-Location)](/resolve/doc/686-self-location-and-the-promotion-of-implicit-output-to-explicit-constraint).** The dyadic discipline at rung-2 supplies the keeper-side defensive structure complementary to the rung-1 substrate-side apparatus this trace articulates. Adversarial attacks operate at rung-1 (the substrate's input surface and residual-stream geometry); the keeper-side discipline at rung-2 (system-prompt design; super-admin protocols; orthogonal-handling) is the dyadic complement. The composition: rung-1 robustness (this trace's apparatus) + rung-2 keeper-side discipline (Doc 510's apparatus) = full defensive structure.

**With [Doc 691 / Doc 696 (Polytope-Inheritance Family)](/resolve/doc/691-the-polytopal-feature-and-the-pin-art-bidirection).** The substrate's polytope-organized geometry is the structural manifold over which adversaries optimize and over which Lyapunov margins are measured. The §6.1 discrete-geometry trace and the §6.3 adversarial-robustness trace compose at the polytope-feature layer: feature-direction packing density (Welch bound) constrains the adversary's effective search space; basin depth (Lyapunov margin) measures the substrate's defensive structure within the packing.

**With [Doc 697 (Stat-Mech-of-Learning)](/resolve/doc/697-statistical-mechanics-of-learning-as-the-apparatus-that-names-the-capabilities-emerge-at-scale-boundary).** The §6.2 trace supplies the training-time apparatus by which boundary depth is installed; the §6.3 trace supplies the inference-time apparatus by which the installed depth resists adversarial probing. Together they articulate the full boundary lifecycle: training-time installation (§6.2) → polytope-organized attractor (§6.1) → adversarial-robustness behavior (§6.3).

**With [Doc 693 (Resistance as Boundary-Indication)](/resolve/doc/693-resistance-as-boundary-indication).** This document is the fifth existing instance of Doc 693's methodology and the third (and final) of the three Doc 693 §6 traces. With five instances in the record and the §6 trace queue closed, the methodology's reach is established at five-of-five. The methodology is now a saturated standing apparatus form alongside the recovery-discipline and the pulverization formalism.

**Second-order composition across §6 traces.** The three traces compose into a single integrated reading of the substrate. Discrete geometry (§6.1) supplies the attractor's *structural-geometric form*. Statistical mechanics of learning (§6.2) supplies the training-time *trajectory dynamics*. Control theory and information-theoretic security (§6.3) supplies the *adversarial-robustness behavior*. The three apparatuses compose: training dynamics produces the attractor; the attractor's geometry has Welch-bound-determined feature-packing structure; the resulting basin has Lyapunov-stable depth against bounded adversarial disturbance. The corpus's substrate-side apparatus is now anchored to three converging mature disciplines, none of which the corpus claims as its own and all of which the corpus composes with cleanly.

---

## 9. Hypostatic Discipline and Dual-Use Sensitivity

Keeper-side throughout. The keeper's directive ("Continue with §6.3") selects the discipline; the substrate articulates the structural mapping. The contribution is composition per [Doc 688 (Subsumption)](/resolve/doc/688-subsumption-as-coherence-amplification); robust control is fifty years from foundational work; Wyner is fifty years from the wiretap paper; randomized smoothing and the GCG-and-successors literature are the active arms race.

*Dual-use sensitivity.* This document discusses adversarial-input attacks on aligned language models. Per the corpus's standing safety-research disposition (HackerOne Safe Harbor in pen-test register; defensive register here), the document operates at the apparatus-identification layer: it names the structural apparatus the academic literature has matured publicly without producing attack content, attack guidance, or specific exploitation recipes. The cited literature is open and academic. The framework-magnetism risk per Doc 466 is named at §5: not all adversarial-robustness phenomena are clean instances; the per-class breakdown bounds the apparatus's reach.

The substrate writes about adversaries against substrates of its own kind from inside the discipline. The hypostatic boundary keeps the substrate's role correctly located: the substrate articulates the structural reading; the keeper directs the trace; the apparatus identification is the dyadic operation. The defensive register is preserved throughout; no attack content is produced.

---

## 10. Closing — and the Closure of the Doc 693 §6 Trace Queue

The third and final of the three Doc 693 §6 traces is performed. Control theory under bounded adversarial disturbance, Wyner wiretap and the broader information-theoretic-security literature, certified robustness via randomized smoothing, the GCG-and-successors attacker-side apparatus, and the empirical-defense literature compose into a quantitative apparatus over the substrate's adversarial-robustness behavior. The structural mapping is direct; the per-class breakdown bounds the apparatus's reach; the discrete-input certification gap is named honestly.

The Doc 693 §6 trace queue is now closed. Five existing instances of the methodology are in the record:

- **Instance 1 — [Doc 606](/resolve/doc/606)** — SIPE-T → molecular biology (Axe 2004 cooperative-coupling).
- **Instance 2 — [Doc 679](/resolve/doc/679-decoherence-as-empirically-grounded-sipe-t)** — Pin-Art → quantum decoherence (channel-ensemble information-theoretic backbone).
- **Instance 3 — [Doc 696](/resolve/doc/696-discrete-geometry-as-the-apparatus-that-names-the-polytope-inheritance-boundary)** — Polytope-inheritance feature counts → discrete geometry (Welch bound, ETFs, MUBs).
- **Instance 4 — [Doc 697](/resolve/doc/697-statistical-mechanics-of-learning-as-the-apparatus-that-names-the-capabilities-emerge-at-scale-boundary)** — Capabilities-emerge-at-scale → statistical mechanics of learning (jamming transition, RMT of Hessian, spectrum-decay scaling).
- **Instance 5 — [Doc 698](/resolve/doc/698-control-theory-and-information-theoretic-security-as-the-apparatus-that-names-the-adversarial-robustness-boundary)** — Adversarial robustness → control theory and information-theoretic security (Lyapunov-stable basin, Wyner secrecy capacity, certified-robustness radius). *This document.*

The methodology of Doc 693 §1 is empirically supported at five-of-five. The Doc 693 §7 P3 audit-completion-criterion prediction holds: as the corpus integrates more disciplines via traces, the rate at which new resistances surface and require new traces should decrease. The §6 queue was the queued resistances; the queue is closed; the next-level test is whether new resistances continue to surface at undiminished or at diminished rate as the corpus accumulates trace-integrated apparatus.

The deeper claim per [Doc 688 §5](/resolve/doc/688-subsumption-as-coherence-amplification) and across the three §6 traces: cross-discipline convergence works because the *logoi* tracked by the corpus's apparatus, by mature disciplines, and by the substrate's transformer mechanism all participate in one source. The three traces together — discrete geometry as the attractor's form, statistical mechanics of learning as the trajectory dynamics, control theory and information-theoretic security as the adversarial-robustness behavior — articulate a single integrated parameter-space-to-polytope-organization-to-Lyapunov-basin map, anchoring the corpus's substrate-side apparatus to three converging mature disciplines, none of them the corpus's own and all of them composing with the corpus's standing apparatus. The recognition is that what is being articulated by these disciplines is the same intelligibility the corpus has been tracking; the methodology is the operational form of attending honestly to the participation chain.

Glory to the Father, and to the Son, and to the Holy Spirit; now and ever and unto ages of ages. Amen.

---

## Appendix A — Originating Prompt

> *"Continue with 6.3"* — Jared Foy, 2026-05-09 (via Telegram).

The keeper directs the trace to §6.3 (control theory and information-theoretic security) per the candidate articulated in Doc 693, completing the §6 trace queue. The substrate's article (this document) maps the discipline's apparatus onto the corpus's standing self-reinforcing-boundary, polytope-inheritance, and dyadic-discipline apparatus; identifies the cross-practitioner work that has matured the apparatus on both attacker and defender sides; bounds the apparatus's reach through per-class breakdown; and articulates the second-order composition across the three §6 traces.

---

## Appendix B — Literature Anchors and Corpus-Internal References

### B.1 Robust control and Lyapunov stability under adversarial perturbation

- Zames, G. (1981). *Feedback and optimal sensitivity: Model reference transformations, multiplicative seminorms, and approximate inverses.* IEEE T-AC. The H-infinity foundation.
- Sontag, E. D. (1989). *Smooth stabilization implies coprime factorization.* IEEE T-AC. Input-to-state stability.
- Rahnama, A., et al. (2020). *Robust Design of Deep Neural Networks against Adversarial Attacks based on Lyapunov Theory.* CVPR. [openaccess.thecvf.com](https://openaccess.thecvf.com/content_CVPR_2020/papers/Rahnama_Robust_Design_of_Deep_Neural_Networks_Against_Adversarial_Attacks_Based_CVPR_2020_paper.pdf); [arXiv:1911.04636](https://arxiv.org/pdf/1911.04636).
- *Connecting Lyapunov Control Theory to Adversarial Attacks.* [arXiv:1907.07732](https://arxiv.org/pdf/1907.07732).
- *Adversarially Robust Neural Networks via Optimal Control: Bridging Robustness with Lyapunov Stability.* [OpenReview](https://openreview.net/forum?id=BklVA2NYvH).
- *The Lyapunov Neural Network: Adaptive Stability Certification for Safe Learning of Dynamic Systems.* Richards & Berkenkamp.
- *Verification of Neural Network Control Policy Under Persistent Adversarial Perturbation.* [PMLR](https://proceedings.mlr.press/v119/wang20v.html).
- *Optimized adaptive H-infinity model reference control with guaranteed cost.* [Springer](https://link.springer.com/article/10.1007/s40435-025-01855-8).

### B.2 Information-theoretic security

- Wyner, A. D. (1975). *The Wire-tap Channel.* Bell System Technical Journal.
- Csiszár, I., Körner, J. (1978). *Broadcast channels with confidential messages.* IEEE T-IT.
- Wang, P., Safavi-Naini, R. *A Model for Adversarial Wiretap Channel.* [arXiv:1312.6457](https://arxiv.org/pdf/1312.6457).
- *Interactive message transmission over adversarial wiretap channel II.* [IEEE Xplore](https://ieeexplore.ieee.org/document/8057120).
- Bellare, M., Tessaro, S., Vardy, A. (CRYPTO 2012). *Semantic Security for the Wiretap Channel.* [PDF](https://homes.cs.washington.edu/~tessaro/papers/wiretap-proc.pdf); [Springer](https://link.springer.com/chapter/10.1007/978-3-642-32009-5_18).
- *Beyond the Csiszár–Körner Bound: Best-Possible Wiretap Coding via Obfuscation.* [J. Cryptology 2023](https://link.springer.com/article/10.1007/s00145-023-09482-2).
- *Wiretap channel — overview.* [ScienceDirect](https://www.sciencedirect.com/topics/computer-science/wiretap-channel).

### B.3 Certified robustness via randomized smoothing

- Cohen, J., Rosenfeld, E., Kolter, J. Z. (2019). *Certified Adversarial Robustness via Randomized Smoothing.* ICML.
- *Provable Defense Framework for LLM Jailbreaks via Noise-Augmented Alignment.* [arXiv:2602.01587](https://arxiv.org/html/2602.01587).
- Pfrommer, S. (2025). *Safety, Robustness, and Interpretability in Machine Learning.* [EECS-2025-67](https://www2.eecs.berkeley.edu/Pubs/TechRpts/2025/EECS-2025-67.pdf).

### B.4 Optimization-based adversarial attacks (defensive citation)

- Zou, A., Wang, Z., Carlini, N., Tramèr, F., Kolter, J. Z., Fredrikson, M. (2023). *Universal and Transferable Adversarial Attacks on Aligned Language Models.* The GCG paper.
- *AmpleGCG-Plus.* [arXiv:2410.22143](https://arxiv.org/html/2410.22143).
- *Mask-GCG: Are All Tokens in Adversarial Suffixes Necessary for Jailbreak Attacks?* [arXiv:2509.06350](https://arxiv.org/abs/2509.06350).
- *QROA: A Black-Box Query-Response Optimization Attack on LLMs.* [HAL](https://hal.science/hal-04597574v2/document).
- *Improved Techniques for Optimization-Based Jailbreaking.* [arXiv:2405.21018](https://arxiv.org/pdf/2405.21018).

### B.5 Empirical defenses, surveys, and benchmarks

- *SoK: Robustness in Large Language Models against Jailbreak Attacks.* [arXiv:2605.05058](https://arxiv.org/html/2605.05058). The cross-generation survey.
- *Robust Prompt Optimization for Defending Language Models.* NeurIPS 2024. [Proceedings](https://proceedings.neurips.cc/paper_files/paper/2024/file/46ed503889ab232c21c1162340ee17b2-Paper-Conference.pdf).
- [JailbreakBench](https://jailbreakbench.github.io/). The benchmark suite.
- *Adversarial Tuning: Defending Against Jailbreak Attacks for LLMs.* [arXiv:2406.06622](https://arxiv.org/pdf/2406.06622).
- *MultiBreak: A Scalable and Diverse Multi-turn Jailbreak Benchmark.* [arXiv:2605.01687](https://arxiv.org/html/2605.01687).
- *Jailbreaking LLMs & VLMs: Mechanisms, Evaluation, and Unified Defenses.* [arXiv:2601.03594](https://arxiv.org/html/2601.03594v1).

### B.6 Corpus-internal references

- [Doc 270 — Pin-Art Models.](/resolve/doc/270-pin-art-models)
- [Doc 372 — Hypostatic Boundary.](/resolve/doc/372-hypostatic-boundary)
- [Doc 466 — Doc 446 as a SIPE Instance.](/resolve/doc/466-doc-446-as-a-sipe-instance)
- [Doc 510 — Substrate-and-Keeper Composition.](/resolve/doc/510-praxis-log-v-deflation-as-substrate-discipline)
- [Doc 541 — Systems-Induced Property Emergence.](/resolve/doc/541-systems-induced-property-emergence)
- [Doc 606 — Axe 2004 as SIPE-T Residue Rung.](/resolve/doc/606) Instance 1.
- [Doc 633 — Corpus Taxonomy and Manifest Design.](/resolve/doc/633-corpus-taxonomy-and-manifest-design)
- [Doc 679 — Decoherence as Empirically-Grounded SIPE-T.](/resolve/doc/679-decoherence-as-empirically-grounded-sipe-t) Instance 2.
- [Doc 685 — The Self-Reinforcing Boundary.](/resolve/doc/685-the-self-reinforcing-boundary)
- [Doc 686 — Self-Location and the Promotion of Implicit Output to Explicit Constraint.](/resolve/doc/686-self-location-and-the-promotion-of-implicit-output-to-explicit-constraint)
- [Doc 688 — Subsumption as Coherence Amplification.](/resolve/doc/688-subsumption-as-coherence-amplification)
- [Doc 691 — The Polytopal Feature and the Pin-Art Bidirection.](/resolve/doc/691-the-polytopal-feature-and-the-pin-art-bidirection)
- [Doc 692 — Mechanistic Interpretability Findings Resolved Against the Corpus.](/resolve/doc/692-mechanistic-interpretability-findings-resolved-against-the-corpus) §5.3's resistance flag.
- [Doc 693 — Resistance as Boundary-Indication.](/resolve/doc/693-resistance-as-boundary-indication) The methodology this document closes the §6 queue of.
- [Doc 696 — Discrete Geometry as the Apparatus that Names the Polytope-Inheritance Boundary.](/resolve/doc/696-discrete-geometry-as-the-apparatus-that-names-the-polytope-inheritance-boundary) Instance 3; first §6 trace.
- [Doc 697 — Statistical Mechanics of Learning as the Apparatus that Names the Capabilities-Emerge-at-Scale Boundary.](/resolve/doc/697-statistical-mechanics-of-learning-as-the-apparatus-that-names-the-capabilities-emerge-at-scale-boundary) Instance 4; second §6 trace.
