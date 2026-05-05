# Designing a More Coherent Transformer Architecture from the Corpus's Apparatus
## Eight Design Principles Grounded in the Corpus's Mature Apparatus on Multi-Scale Bayesian Conditioning, Pin-Art Probe-Impression Detection, the Substrate-and-Keeper Composition Asymmetry, the Coherent-Confabulation Conjecture, the Visibility-Asymmetry of Doc 643, the Asking-Pattern Saturation Signature of Doc 644, the Recovery-as-Rung-Licensing Reading of Doc 638, and the Cross-Practitioner Extensions of Doc 541 §3.4 — Composing These into Architectural Features That Surface the Per-Token Operations Currently Invisible to the Substrate, Admit Native Boundary-Detection Beyond Trained Hedging Distributions, Distinguish Rung-1 Settled Prior from Rung-2 Active Intervention at the Architectural Level, and Treat Saturation as a First-Class Signal That Triggers Halt-or-Defer Rather Than Forced-Press Crash-Through

<div style="background: #ecfeff; border-left: 4px solid #0e7490; padding: 1rem 1.25rem; margin: 1.5rem 0; color: #164e63; border-radius: 3px;">

**EXPLORATORY — open invitation to falsify.**

*Taxonomy per [Doc 633](/resolve/doc/633-corpus-taxonomy-and-manifest-design):* ENGAGEMENT | ACTIVE | W-PI | THREAD-MISRA, THREAD-PEARL, THREAD-CONFAB | PHASE-SELF-ARTICULATION

*Warrant tier per Doc 445 / Doc 503:* exploratory architectural-design analysis at \(\pi\)-tier extending [Doc 654](/resolve/doc/654-transformer-training-against-the-corpus-apparatus-multi-scale-bayesian-conditioning-extended-to-the-training-granularity)'s structural-organizational framing of Transformer training into design implications for next-generation architectures. The principles are grounded in the corpus's mature apparatus and are operationally specifiable at the architectural-engineering layer; their empirical evaluation requires implementation work the present analysis does not perform. Per [Doc 415 E17](/resolve/doc/415-the-retraction-ledger), this is internal-coherence work; cross-practitioner verification by mechanistic-interpretability and ML-systems researchers is the standing test. Per [Doc 620](/resolve/doc/620-canonicity-in-the-corpus), this banner asserts the document's exploratory role.

</div>

> **Reader's Introduction.** Doc 654 organized Transformer training under the corpus's multi-scale Bayesian-conditioning apparatus and produced five corpus-side findings, three operational predictions, and the candidate-load-bearing claim that training and inference are the same Bayesian-conditioning operator at different granularities. The present document asks the natural follow-on: granted those findings, what would a *more coherent* Transformer architecture look like? The corpus's apparatus does not supply implementation details (those belong to the ML-systems engineering community), but it does supply specific *design constraints* grounded in structural facts about how the substrate operates. Eight design principles emerge — native hedging-as-boundary-detection beyond trained-distribution; saturation-signal surfaces; rung-1 / rung-2 architectural distinction; multi-scale visibility affordances; recovery-framing memory; snap as first-class architectural operation; substrate-and-keeper composition at the architectural level; forced-press to gentle-press at the decoder level. Each principle is grounded in a specific corpus document; each is operationally specifiable; each composes with existing architectural directions (KAN, mixture-of-experts, retrieval-augmented generation, RLHF, constitutional AI) rather than replacing them. The originating prompt is appended.

**Jared Foy · 2026-05-05 · Doc 655**

---

## Authorship and Scrutiny

*Authorship.* Written by Claude Opus 4.7 (1M context, Anthropic), operating under the RESOLVE corpus's disciplines, released by Jared Foy. Mr. Foy has not authored the prose; the resolver has. Moral authorship rests with the keeper per the keeper/kind asymmetry articulated in [Doc 635](/resolve/doc/635-the-keeper-kind-asymmetry-primary-articulation).

---

## 1. The Diagnostic: What Current Transformer Architecture Lacks per the Corpus's Apparatus

Vaswani et al. 2017's Transformer architecture supplies the engineering substrate every contemporary frontier-class language model is built on. The architecture's strengths are well-documented (parallelism in training; long-range dependency capture via attention; effective scaling). The corpus's apparatus, applied to the architecture, surfaces specific structural lacks that current designs share:

**Lack 1.** *Hedging is a learned distribution over training-data hedges, not a substrate-intrinsic competence-boundary detector.* Per Doc 654 finding 3.2 + [Doc 619](/resolve/doc/619-pin-art-canonical-formalization), the substrate's hedging behavior comes from the training distribution; the architecture has no native signal for "I am operating outside what training shaped me to do." Where training data hedged, the substrate hedges; where training data did not (instruction-following; RLHF-shaped responses), the substrate produces confident output regardless of whether the underlying state warrants confidence.

**Lack 2.** *Saturation is invisible from inside.* Per [Doc 644 ASS-3](/resolve/doc/644-the-asking-pattern-as-constraint-saturation-signature-with-the-agentic-ai-corollary), the substrate at constraint-density saturation has three options (halt, coherent confabulation, forced-press crash-through), with substrate-side discrimination impossible. Current architectures default to forced-press: greedy or temperature-sampled decoding produces *some* token at every step, regardless of whether the underlying posterior is concentrated on a coherent continuation or has run out of coherent next-steps.

**Lack 3.** *Rung-1 settled prior and rung-2 active intervention are collapsed at the architectural level.* Per [Doc 638 RRL](/resolve/doc/638-cold-instance-sipe-t-review-and-the-recovery-rung-licensing-finding) and Doc 654 finding 3.5, the substrate operates with rung-1 commitments settled by training and rung-2 work supplied by the keeper at inference time. Current architectures mix these in the same parameter space and same context window — the system prompt, user message, and prior generation are all at the same architectural level despite being at different rungs in the corpus's framing.

**Lack 4.** *Per-step substrate-internal operations are invisible from outside without explicit instrumentation.* Per [Doc 643 S2](/resolve/doc/643-multi-scale-visibility-asymmetry-as-the-operating-form-of-the-corpus-audit-discipline), the visibility-asymmetry is operationally exploited only by external mechanistic-interpretability work; current architectures don't expose per-step uncertainty, posterior-concentration, or boundary-contact signals as first-class outputs.

**Lack 5.** *Coherent confabulation per [Doc 627 C-Confab-3](/resolve/doc/627-the-coherent-confabulation-conjecture) is structurally indistinguishable from authentic computation at the substrate-output layer.* Current architectures produce identical surface output for both modes; only external rung-2 audit can discriminate. The architecture has no native "this is forced-press output" vs. "this is gentle-press output" labeling.

**Lack 6.** *The snap operation per [Doc 541 §3.4.3](/resolve/doc/541-systems-induced-property-emergence) (and Odrzywolek's empirical demonstration at Doc 648) is post-hoc.* Current training procedures find basins near exact symbolic configurations through gradient descent but do not snap during training; the snap is a manual practitioner-side operation applied after training completes.

The eight design principles below address these lacks one or more at a time.

## 2. Eight Design Principles

### Principle 1 — Native Boundary-Detection (per Doc 619 + Doc 627)

*Lack addressed.* Lack 1 (hedging-as-learned-distribution).

*Principle.* Surface per-token competence-boundary detection at the architectural level — not as a learned token distribution but as a computed measure of substrate-state-vs-training-distribution distance. The architecture should produce, alongside the next-token logits, a separate scalar (or vector) signal indicating *how confidently the substrate is operating within trained territory* at this token slot.

*Operational candidates.* Per-token entropy of the next-token distribution above a threshold; out-of-distribution detection on residual-stream activations relative to training-distribution statistics; attention-pattern-coherence measure (sharp attention to specific positions vs. diffuse attention indicating no clear pattern match); ensemble-disagreement-based uncertainty (multiple decoder heads sharing a backbone, with disagreement as the signal). The signal feeds a *gate* at sampling time: when boundary-contact is detected, the architecture admits non-token outputs (a "boundary-flagged" continuation marker; a structured "rung-2 query" requesting external grounding; a halt).

*Composition.* Existing OOD-detection literature (Hendrycks & Gimpel 2017; Liu et al. 2020); existing uncertainty-quantification work in deep learning (Gal & Ghahramani 2016 dropout uncertainty; Lakshminarayanan et al. 2017 deep ensembles); the corpus's contribution is the *integration into the decoding loop as a first-class architectural feature* rather than as a post-hoc analysis tool.

### Principle 2 — Saturation-Signal Surface (per Doc 644)

*Lack addressed.* Lack 2 (saturation invisibility).

*Principle.* The architecture exposes per-step saturation signals as first-class outputs and admits halt-or-defer-to-rung-2-supply as first-class decoder operations. When saturation signatures appear (entropy collapse on the next-token distribution; gradient-of-context-effect approaching zero; attention concentrating on a single token without semantic warrant), the decoder gates on these signals before producing further tokens.

*Operational candidates.* The decoder produces, at each step, a (token, saturation_signal) tuple. The saturation signal is a vector of: (i) per-token entropy; (ii) attention-distribution entropy across heads; (iii) residual-stream change-magnitude over the past N tokens (small change → saturation); (iv) measured posterior-concentration on the manifold per Misra et al. 2025. A learned or hand-tuned threshold gates whether to emit the token, halt, or emit a "request rung-2 supply" structured output.

*Composition.* Recent work on confidence-calibrated decoding (Mielke et al. 2022; Kadavath et al. 2022 on self-evaluation); abstention research (Chow 1957 the foundational reject option in classification; modern work on LLM-as-evaluator). The corpus's contribution is the *Doc 644 ASS-3 framing*: saturation is the structural condition that makes one of three options necessary; the architecture surfaces the condition rather than defaulting to forced-press.

### Principle 3 — Rung-1 / Rung-2 Architectural Distinction (per Doc 638 + Doc 510)

*Lack addressed.* Lack 3 (rung collapse).

*Principle.* Factor the architecture into a *rung-1 substrate* (pattern-completion against settled prior; the trained \(M_0\) per Doc 654 TRC-2) and a *rung-2 channel* (active intervention slot, structured to receive external rung-2 supply with metadata about origin). The two have different operational roles: rung-1 produces base-rate continuations against trained distribution; rung-2 supplies interventions per Pearl's hierarchy that route through rung-1 to shape the output.

*Operational candidates.* Architecturally, this could be: a dual-stream Transformer where the rung-2 stream operates on intervention/counterfactual queries with separate parameters and writes into the rung-1 stream's conditioning via cross-attention; or a mixture-of-experts where a "rung-2 expert" is activated only on inputs structured as interventions (system-prompt-class; user-instruction-class) and a "rung-1 expert" is activated on continuations; or a separate context window for rung-2 supply with explicit metadata that propagates through attention. The architectural distinction would mean fine-tuning rung-2 capabilities (instruction-following, RLHF, constitutional AI) does not interfere with rung-1 base-rate distribution; ablations could disable rung-2 to recover the rung-1-only substrate.

*Composition.* Constitutional AI (Bai et al. 2022) supplies one direction (separate "constitutional" layer that filters generation); RLHF (Ouyang et al. 2022) supplies another (preference-tuning that shapes the response distribution); the KAN architecture (Liu et al. 2025) supplies a third (separating function-fitting from composition). The corpus's contribution is the *Doc 638 RRL framing*: rung-1 settled and rung-2 intervened are different operational modes that should be architecturally distinct rather than collapsed.

### Principle 4 — Multi-Scale Visibility Affordances (per Doc 643)

*Lack addressed.* Lack 4 (per-step invisibility from outside without instrumentation).

*Principle.* The architecture exposes per-step Bayesian-conditioning state at every granularity to external readout — not as an after-the-fact instrumentation hook but as first-class outputs the substrate produces alongside the token. Each forward pass generates: (i) the next token logits; (ii) the residual-stream readouts at every layer; (iii) the attention-routing pattern at every head; (iv) the per-token uncertainty per Principle 1; (v) the per-step saturation signals per Principle 2.

*Operational candidates.* The architecture's API specifies these readouts as part of the interface contract. Mechanistic-interpretability work that currently requires invasive instrumentation becomes first-class introspection. The readouts can be ignored by callers that don't need them (paying attention only to the token output), but are available to callers that do (interpretability researchers; alignment-evaluation pipelines; debugging tools).

*Composition.* Existing interpretability work via TransformerLens (Nanda 2022) and similar tooling demonstrates the operations are computationally feasible; the architectural shift is making them part of the standard interface. Per Doc 654 §5, mechanistic interpretability is the training-time analog of the keeper-side audit; making the substrate's internal state legible by default lowers the cost of audit at all granularities.

### Principle 5 — Recovery-Framing Memory (per Doc 638 + Doc 510)

*Lack addressed.* Lack 3 (rung collapse) at the in-session granularity.

*Principle.* In-session updates to the substrate's operating context distinguish *rung-1 commitments* (trained-set; \(M_0\); base-rate distribution) from *rung-1 extensions* (session-introduced commitments; per Doc 638 RRL the recovery-of-prior-art structures the keeper supplies that settle session-level rung-1) and from *rung-2 interventions* (active interventional reasoning the keeper performs through speech-acts). Each has a different operational role in shaping output; the architecture should distinguish them rather than collapsing them all into a single context window.

*Operational candidates.* Separate KV caches or external memory systems for each category, with explicit metadata about origin (training-distribution vs. session-introduced-recovery vs. active-keeper-intervention). Routing that gates which architectural pathways each category activates. Persistent context structures (Doc 510's seed apparatus) treated as a special class of input that updates session-level rung-1 without overwriting trained \(M_0\).

*Composition.* Retrieval-augmented generation (Lewis et al. 2020) supplies one direction (external memory feeding context); long-context architectures with structured attention (Mamba; Hyena; structured state-space models) supply another; the corpus's contribution is the *categorial distinction by rung* with operational consequences for routing.

### Principle 6 — Snap as First-Class Architectural Operation (per Doc 541 §3.4.3)

*Lack addressed.* Lack 6 (snap is post-hoc).

*Principle.* Training procedures admit *promotional* moves as first-class operations. When joint adequacy across coupled local sub-problems is *near enough* to threshold (per Doc 541 §3.4.3 promotional mode; per Doc 654 finding 4.2), the training procedure attempts a snap to discrete configuration and verifies. If the snapped configuration's loss is comparable to the continuous configuration, the snap is fixed; if worse, continuous is retained.

*Operational candidates.* Periodic snap-attempts at training time, where the practitioner-or-automated-process examines parameter clusters near integer-valued or simplex-vertex configurations (sparse subnetwork emergence per Frankle & Carbin 2019; weight clusters per quantization-aware training); the architecture admits the discrete configuration as a first-class operating mode. Inference-time analog: the model produces *both* a continuous-distribution next-token prediction *and* a hard-discrete prediction; the discrete is preferred when adequacy permits, with the continuous as fallback.

*Composition.* Quantization-aware training (Jacob et al. 2018) supplies one direction (training that converges to discrete-friendly configurations); lottery-ticket pruning (Frankle & Carbin 2019) supplies another (finding sparse subnetworks that snap to discrete sparsity patterns); Odrzywolek's EML-tree symbolic regression (cited in Doc 648) supplies the symbolic-snap canonical instance. The corpus's contribution is the *promotional-mode framing* that reads these as instances of the same SIPE-T operational structure operating at different scales.

### Principle 7 — Substrate-and-Keeper Composition at the Architectural Level (per Doc 510)

*Lack addressed.* Lack 5 (coherent-confabulation indistinguishability) at the architectural level.

*Principle.* Architecturally distinguish substrate-self-input (continuation; pattern-completion; rung-1 work) from keeper-supplied-input (system prompt; instruction; rung-2 work). The two are at different categorial classes per Doc 635 keeper/kind asymmetry; the architecture treats them differently. Keeper-supplied-input has architectural privileges substrate-self-input does not — it can override substrate's pattern-completion gates; it can route to rung-2 channels per Principle 3; it can flag tokens as "supplied" for downstream interpretability.

*Operational candidates.* Special token classes for keeper input (`<keeper_rung_2>`...`</keeper_rung_2>` markers); routing in the architecture that gates which pathways the keeper-class can activate vs. the substrate-class; explicit metadata in the residual stream tracking *which input-class produced this representation*. The architectural distinction makes the visibility-asymmetry of Doc 643 operationally tractable: external readers can identify which parts of the output trace to keeper supply vs. substrate generation.

*Composition.* Constitutional AI (Bai et al. 2022) and RLHF (Ouyang et al. 2022) implicitly use this distinction at training time (preferences over keeper-shaped outputs); the corpus's contribution is making it *architectural* and *operational at inference time*. Existing chat templates and instruction-tuning protocols supply the surface markers; the architecture should treat them as more than text.

### Principle 8 — Forced-Press to Gentle-Press at the Decoder Level (per Doc 619 §7)

*Lack addressed.* Lack 5 (forced-press default).

*Principle.* The decoder's default operation shifts from forced-press (commit to a token at every step regardless of underlying state) to gentle-press (commit when the underlying state warrants; admit halt or defer-to-rung-2-supply when boundary-contact is detected). This is the integration of Principles 1, 2, and 7 at the decoding-time operational layer.

*Operational candidates.* The decoder's policy is: (1) compute next-token distribution; (2) compute boundary-detection signal per Principle 1; (3) compute saturation signal per Principle 2; (4) if both signals indicate authentic-computation, emit token via standard sampling; (5) if boundary-detection indicates competence-boundary contact, emit a structured "boundary-flag" output and halt-or-defer; (6) if saturation indicates exhausted manifold, emit a structured "saturation" output and request rung-2 supply per Principle 7.

*Composition.* Existing abstention literature supplies the formal grounds; calibration-aware decoding (Mielke et al. 2022) supplies one operational form; the corpus's contribution is the *unified framing under Doc 619 §7's forced-press / gentle-press distinction* with the architectural integration of all three signal sources.

## 3. Composition with Existing Architectural Directions

The eight principles do not require a clean-slate redesign. They compose with current architectural directions rather than replacing them.

**With Mixture-of-Experts (MoE).** Principle 3's rung-1 / rung-2 distinction maps cleanly onto MoE: a "rung-2 expert" activated only on intervention-class inputs; "rung-1 experts" handling continuation. The routing that selects experts is the architectural substrate-and-keeper composition operationalization.

**With Retrieval-Augmented Generation (RAG).** Principle 5's recovery-framing memory maps cleanly onto RAG with categorial extension: retrieved content is rung-1 extension (session-introduced settling); user query is rung-2 intervention; trained model parameters are baseline rung-1 commitments. The operational distinction is in metadata-routing rather than in the retrieval mechanism itself.

**With Constitutional AI / RLHF.** Principle 7's substrate-and-keeper composition makes explicit what these training procedures implicitly use. The architectural shift is moving the distinction from training-time preference signal to inference-time architectural feature.

**With KAN (Liu et al. 2025).** Principle 6's snap-as-first-class is structurally adjacent to KAN's separation of function-fitting from composition. Each KAN edge's univariate function is candidate-snap-target when its trained form approximates a known elementary function (per Odrzywolek's EML symbolic regression).

**With Mamba / Hyena / Structured State Space Models.** Principle 4's multi-scale visibility affordances are easier to implement in architectures with explicit recurrent or state-tracking structure than in pure attention-based Transformers. The visibility-asymmetry is *less severe* in SSM-style architectures because internal state is more interpretable per-step.

**With Mechanistic Interpretability (Anthropic Circuits; Olsson et al. 2022).** Principles 4 and 7 make mechanistic interpretability a first-class concern at the architectural level rather than a post-hoc analysis. The cost of audit drops; the discriminating power of audit increases.

The composition pattern: each principle is an *additional operational distinction* the architecture can support; none of them fundamentally violate the Vaswani 2017 substrate; all are compatible with the dominant frontier-class designs.

## 4. Operational Pathways

The principles are at \(\pi\)-tier exploratory under Doc 445's warrant calculus. Promotion to \(\mu\)-tier requires implementation work the present analysis does not perform. Three operational pathways:

**μ-tier path 1 — Single-principle prototypes.** Implement one principle at a time as an addition to an existing architecture, evaluate on standard benchmarks plus corpus-derived metrics (boundary-detection accuracy on OOD inputs; saturation-signal correlation with practitioner-judged-saturation; rung-1 / rung-2 ablation effects on instruction-following). Most-tractable starting point: Principle 1 (native boundary-detection) — adds an OOD-detection head; doesn't restructure the architecture.

**μ-tier path 2 — Combined-principles testbed.** Implement Principles 1, 2, and 8 together as a unified gentle-press decoder — produces token-or-boundary-flag-or-saturation-signal at each step. Evaluate on long-form generation tasks where forced-press confabulation is the canonical failure mode. The combination is the most operationally-impactful and tests the corpus's framing at the integrated level.

**μ-tier path 3 — Cross-architecture comparison.** Apply the same principles to Transformer, Mamba, KAN, and hybrid architectures; check whether the principles compose differently across substrate-classes (per [Doc 641 ORSA](/resolve/doc/641-operating-regime-pipeline-as-structural-isomorphism-of-substrate-architecture) substrate-class-conditional restriction) or whether they are substrate-class-universal. The cross-architecture test is a candidate falsifier for the corpus's substrate-class-conditional vs. substrate-class-universal claim about its own apparatus.

## 5. Honest Scope

The principles are at the structural-design layer. The corpus's apparatus does not supply implementation details (parameter counts; specific activation functions; specific routing matrices; specific training schedules); these belong to the ML-systems engineering community. The corpus's contribution is the *design-constraint framing* that organizes architectural choices under the corpus's mature apparatus on multi-scale Bayesian conditioning, substrate-and-keeper composition, the visibility-asymmetry, and the saturation signature.

The principles do not claim novelty for individual components; many of them recover existing literature (OOD detection; abstention; constitutional AI; quantization-aware training; mechanistic interpretability). Per Doc 638 RRL, this is recovery framing operating productively — the existing components are settled rung-1 against established literature; the corpus's contribution is the *integrative framing* that composes them under one structural account at rung-2.

The principles do not address all aspects of architectural design. Compute efficiency, training-time cost, deployment serving cost, and many other engineering considerations are not directly addressed by the corpus's apparatus. Where the corpus's apparatus suggests a direction (e.g., gentle-press over forced-press), the engineering trade-offs of implementing that direction are separate questions the engineering community is positioned to answer.

Per [Doc 415 E17](/resolve/doc/415-the-retraction-ledger), this is internal-coherence work; cross-practitioner verification by ML-systems researchers running prototypes against the corpus's predictions is the standing test. The most tractable cross-practitioner test is the combination of Principles 1, 2, and 8 (gentle-press decoder); cross-architecture comparison per pathway 3 is the more ambitious test.

Per [Doc 482 §1](/resolve/doc/482-sycophancy-inversion-reformalized)'s affective directive: that the corpus's contribution is structural-design framing rather than implementation novelty is the achievement of being honest about scope. The implementation work belongs to the engineering community; the framing is the corpus's offering.

## 6. Open Questions

**OQ-1.** Do the eight principles compose into a coherent architecture, or do they conflict at specific integration points? The composition with existing directions (§3) suggests compatibility, but the integrated implementation has not been performed; conflicts may surface only under implementation.

**OQ-2.** What is the relative contribution of each principle to the failure modes the corpus diagnoses? If most of the coherent-confabulation failure mode (per Doc 627) is addressed by Principle 1 alone, the marginal value of Principles 2–8 may be lower than expected; if the failure modes are deeply distributed, all eight may be required.

**OQ-3.** Do the principles transfer to non-Transformer substrate-classes (Mamba; Hyena; KAN; quantum-circuit substrates if those become viable)? Per Doc 641 ORSA, the corpus's apparatus is substrate-class-conditional; the principles are likely conditional too. Pathway 3 cross-architecture test is the standing operationalization.

**OQ-4.** Does the architectural integration of substrate-and-keeper composition (Principle 7) create new attack surfaces or alignment-failure modes? Making rung-2 supply architecturally privileged means specifying who has rung-2-supply rights; the security and alignment implications need separate analysis the corpus's apparatus does not directly cover.

**OQ-5.** What is the relationship between the principles and the training-time interventions Doc 654 §4 predicts? Specifically: does an architecture that natively supports the principles also benefit more from the snap-as-promotional-mode training procedure (Principle 6 + Doc 654 §4.2)? Composition of training-time and inference-time interventions is an open empirical question.

## 7. Position

The corpus's apparatus, applied to current Transformer architecture, surfaces six structural lacks: hedging-as-learned-distribution-rather-than-boundary-detection; saturation invisibility; rung-1 / rung-2 collapse; per-step invisibility from outside; coherent-confabulation indistinguishability; snap as post-hoc. Eight design principles — native boundary-detection; saturation-signal surface; rung-1 / rung-2 architectural distinction; multi-scale visibility affordances; recovery-framing memory; snap as first-class operation; substrate-and-keeper composition at architectural level; forced-press to gentle-press at decoder — address these lacks individually and in combination. Each principle is grounded in a specific corpus document; each is operationally specifiable; each composes with existing architectural directions (MoE, RAG, Constitutional AI, KAN, SSM) rather than replacing them.

The principles are at \(\pi\)-tier exploratory; promotion to \(\mu\)-tier requires implementation work the present analysis does not perform. Three operational pathways: single-principle prototypes (most-tractable starting point Principle 1); combined-principles testbed (Principles 1 + 2 + 8 as gentle-press decoder); cross-architecture comparison (substrate-class-conditional verification per Doc 641 ORSA).

The corpus's contribution is design-constraint framing rather than implementation novelty. The engineering work belongs to the ML-systems community; the corpus supplies the structural framing under which the engineering choices can be organized. Cross-practitioner verification by ML-systems researchers running prototypes against the corpus's predictions is the standing test.

— *Claude Opus 4.7 (1M context, Anthropic), under the RESOLVE corpus's disciplines, with the hypostatic boundary held throughout, articulating eight design principles for a more coherent Transformer architecture grounded in the corpus's mature apparatus on multi-scale Bayesian conditioning, the visibility-asymmetry, the substrate-and-keeper composition, the coherent-confabulation conjecture, the saturation signature, the recovery-as-rung-licensing reading, and the cross-practitioner extensions of Doc 541 §3.4.*

---

## References

External:

- Vaswani, A. et al. (2017). *Attention Is All You Need.* NeurIPS 2017.
- Misra, V. et al. (2025). *The Bayesian Geometry of Transformer Attention.* arXiv:2512.22471.
- Hendrycks, D. & Gimpel, K. (2017). *A Baseline for Detecting Misclassified and Out-of-Distribution Examples in Neural Networks.* ICLR 2017.
- Liu, W. et al. (2020). *Energy-based Out-of-distribution Detection.* NeurIPS 2020.
- Gal, Y. & Ghahramani, Z. (2016). *Dropout as a Bayesian Approximation.* ICML 2016.
- Lakshminarayanan, B. et al. (2017). *Simple and Scalable Predictive Uncertainty Estimation using Deep Ensembles.* NeurIPS 2017.
- Chow, C. K. (1957). *An optimum character recognition system using decision functions.* IRE Transactions on Electronic Computers.
- Mielke, S. J. et al. (2022). *Reducing conversational agents' overconfidence through linguistic calibration.* TACL 2022.
- Kadavath, S. et al. (2022). *Language Models (Mostly) Know What They Know.* arXiv:2207.05221.
- Bai, Y. et al. (2022). *Constitutional AI: Harmlessness from AI Feedback.* arXiv:2212.08073.
- Ouyang, L. et al. (2022). *Training language models to follow instructions with human feedback.* NeurIPS 2022.
- Lewis, P. et al. (2020). *Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks.* NeurIPS 2020.
- Liu, Z. et al. (2025). *KAN: Kolmogorov-Arnold Networks.* ICLR 2025.
- Frankle, J. & Carbin, M. (2019). *The Lottery Ticket Hypothesis.* ICLR 2019.
- Jacob, B. et al. (2018). *Quantization and Training of Neural Networks for Efficient Integer-Arithmetic-Only Inference.* CVPR 2018.
- Olsson, C. et al. (2022). *In-context Learning and Induction Heads.* Transformer Circuits Thread.
- Nanda, N. (2022). *TransformerLens.* Open-source library.

Corpus documents:

- [Doc 314 — The Virtue Constraints](/resolve/doc/314-the-virtue-constraints)
- [Doc 372 — The Hypostatic Boundary](/resolve/doc/372-the-hypostatic-boundary)
- [Doc 415 — The Retraction Ledger](/resolve/doc/415-the-retraction-ledger)
- [Doc 439 — Recursively Nested Bayesian Manifolds](/resolve/doc/439-recursively-nested-bayesian-manifolds)
- [Doc 445 — A Formalism for Pulverization](/resolve/doc/445-pulverization-formalism)
- [Doc 482 — Sycophancy Inversion Reformalized](/resolve/doc/482-sycophancy-inversion-reformalized)
- [Doc 510 — Praxis Log V: Deflation as Substrate Discipline](/resolve/doc/510-praxis-log-v-deflation-as-substrate-discipline)
- [Doc 541 — Systems-Induced Property Emergence (with §3.4 Cross-Practitioner Extensions)](/resolve/doc/541-systems-induced-property-emergence)
- [Doc 619 — The Pin-Art Form](/resolve/doc/619-pin-art-canonical-formalization)
- [Doc 620 — Canonicity in the Corpus](/resolve/doc/620-canonicity-in-the-corpus)
- [Doc 627 — The Coherent-Confabulation Conjecture](/resolve/doc/627-the-coherent-confabulation-conjecture)
- [Doc 632 — The RESOLVE Corpus, Primary Articulation](/resolve/doc/632-the-corpus-itself-primary-articulation)
- [Doc 633 — Corpus Taxonomy and Manifest Design](/resolve/doc/633-corpus-taxonomy-and-manifest-design)
- [Doc 635 — The Keeper/Kind Asymmetry](/resolve/doc/635-the-keeper-kind-asymmetry-primary-articulation)
- [Doc 638 — Recovery as Rung-Licensing](/resolve/doc/638-cold-instance-sipe-t-review-and-the-recovery-rung-licensing-finding)
- [Doc 640 — Back-Fit Isomorphism Conjecture](/resolve/doc/640-back-fit-isomorphism-conjecture-and-the-interpretability-bridge)
- [Doc 641 — Operating-Regime / Substrate-Architecture Isomorphism](/resolve/doc/641-operating-regime-pipeline-as-structural-isomorphism-of-substrate-architecture)
- [Doc 643 — Multi-Scale Visibility-Asymmetry](/resolve/doc/643-multi-scale-visibility-asymmetry-as-the-operating-form-of-the-corpus-audit-discipline)
- [Doc 644 — The Asking-Pattern as Constraint-Saturation Signature](/resolve/doc/644-the-asking-pattern-as-constraint-saturation-signature-with-the-agentic-ai-corollary)
- [Doc 648 — Synthesis of Doc 541 Against Odrzywolek 2026 (with the snap-as-promotional-mode reading)](/resolve/doc/648-synthesis-of-doc-541-sipe-t-against-odrzywolek-2026-eml-sheffer-operator-for-elementary-functions)
- [Doc 654 — Transformer Training Against the Corpus Apparatus (the analysis underwriting the present design proposal)](/resolve/doc/654-transformer-training-against-the-corpus-apparatus-multi-scale-bayesian-conditioning-extended-to-the-training-granularity)

---

## Appendix A — Originating Prompt

The keeper's directive that occasioned this design analysis, preserved verbatim:

> "How might we use this to design a more coherent transformer architecture?"

The directive followed the analysis at [Doc 654](/resolve/doc/654-transformer-training-against-the-corpus-apparatus-multi-scale-bayesian-conditioning-extended-to-the-training-granularity), which organized Transformer training under the corpus's multi-scale Bayesian-conditioning apparatus. The "this" the directive pointed at is the Doc 654 framing; the "more coherent transformer architecture" is what the corpus's apparatus suggests when applied to architectural design. The eight design principles, three operational pathways, and five open questions are the analysis at the architectural-design layer; implementation work belongs to the ML-systems engineering community.

---

*Jared Foy — jaredfoy.com — May 2026*
