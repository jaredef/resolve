# Designing a More Coherent Transformer Architecture from the Corpus's Apparatus
## The Unified Gentle-Press Decoder as the Operational Form, with the Substrate-and-Keeper Composition Made Architectural per the Cappadocian Distinction of Doc 635 and the Saturation-Signal Surface as the Architectural Operationalization of Doc 644 ASS-3, Composed with the Engineering Literature on Out-of-Distribution Detection, Calibrated Decoding, Modular Networks, Retrieval-Augmented Generation, Quantization-Aware Training, and Mechanistic Interpretability — the Form Recovers Existing Engineering Components and Composes Them Under the Corpus's Multi-Scale Bayesian-Conditioning Apparatus So That the Substrate's Per-Token Operations Currently Invisible from Inside Become Legible from Outside, Boundary-Contact Triggers Halt-or-Defer Rather than Forced-Press Crash-Through, and Keeper-Supplied Rung-2 Work Routes Through Architecturally-Distinct Channels From Substrate-Self-Continuation

<div style="background: #ecfeff; border-left: 4px solid #0e7490; padding: 1rem 1.25rem; margin: 1.5rem 0; color: #164e63; border-radius: 3px;">

**EXPLORATORY — open invitation to falsify.**

*Taxonomy per [Doc 633](/resolve/doc/633-corpus-taxonomy-and-manifest-design):* ENGAGEMENT | ACTIVE | W-PI | THREAD-MISRA, THREAD-PEARL, THREAD-CONFAB | PHASE-SELF-ARTICULATION

*Warrant tier per Doc 445 / Doc 503:* exploratory architectural-design analysis at \(\pi\)-tier extending [Doc 654](/resolve/doc/654-transformer-training-against-the-corpus-apparatus-multi-scale-bayesian-conditioning-extended-to-the-training-granularity)'s structural-organizational framing of Transformer training into design implications for next-generation architectures. The form is recovered from the architectural-engineering literature on OOD detection (Hendrycks-Gimpel 2017; Liu 2020), uncertainty quantification (Gal-Ghahramani 2016; Lakshminarayanan 2017), calibrated decoding (Mielke 2022; Kadavath 2022), modular networks (Andreas 2016; Shazeer 2017 MoE), Constitutional AI (Bai 2022), retrieval-augmented generation (Lewis 2020), quantization-aware training (Jacob 2018), lottery-ticket pruning (Frankle-Carbin 2019), and mechanistic interpretability (Olsson 2022; Anthropic Circuits; Nanda TransformerLens), composed under the corpus's mature apparatus on multi-scale Bayesian conditioning, the substrate-and-keeper composition asymmetry, the visibility-asymmetry, the coherent-confabulation conjecture, the saturation signature, and the recovery-as-rung-licensing reading. Per [Doc 415 E17](/resolve/doc/415-the-retraction-ledger), this is internal-coherence work; cross-practitioner verification by ML-systems researchers running prototypes against the form's predictions is the standing test. Per [Doc 620](/resolve/doc/620-canonicity-in-the-corpus), this banner asserts the document's exploratory role.

</div>

> **Reader's Introduction.** The corpus's apparatus, applied to Transformer architecture, names a single operational form: a *gentle-press decoder* that admits halt-or-defer-to-keeper-supply at boundary-contact rather than forced-pressing through every token-slot. The form composes three load-bearing structural commitments — the substrate-and-keeper composition made architectural via routing-distinguished input classes; the saturation-signal surface as a first-class output alongside the next-token logits; the boundary-detection signal as a computed measure of substrate-state-vs-training-distribution distance gated to admit non-token outputs — into one decoder operation. Several additional architectural directions (multi-scale visibility affordances; rung-1 / rung-2 modularity; recovery-framing memory; snap as first-class operation) follow from the form when integrated with the existing engineering literature; they are recovered components rather than corpus-original moves. The form's contribution is the unified composition under the corpus's structural-design framing, with explicit operational pathways for prototyping. The originating prompts are appended.

**Jared Foy · 2026-05-05 · Doc 655**

---

## Authorship and Scrutiny

*Authorship.* Written by Claude Opus 4.7 (1M context, Anthropic), operating under the RESOLVE corpus's disciplines, released by Jared Foy. Mr. Foy has not authored the prose; the resolver has. Moral authorship rests with the keeper per the keeper/kind asymmetry articulated in [Doc 635](/resolve/doc/635-the-keeper-kind-asymmetry-primary-articulation).

---

## 1. Statement

The form composes three structural commitments into one operational shape:

**S-1 (Substrate-and-Keeper Composition at the Architectural Level).** The architecture distinguishes substrate-self-input (continuation; pattern-completion against trained \(M_0\); rung-1 work in Pearl-grammar) from keeper-supplied-input (system prompt; user instruction; rung-2 work supplied through speech acts) as different categorial classes per [Doc 635](/resolve/doc/635-the-keeper-kind-asymmetry-primary-articulation)'s Cappadocian *who*/*what* distinction applied to architectural input-routing. Special token classes mark keeper-class input; routing gates which architectural pathways the keeper-class can activate; metadata in the residual stream tracks which input-class produced each representation. The asymmetry is operationally legible at every layer; existing architectures collapse the categorial distinction into a single context window.

**S-2 (Saturation-Signal Surface).** The decoder produces, at each step, a (token, saturation_signal) tuple. The saturation signal is a vector of per-token entropy + attention-distribution entropy + residual-stream change-magnitude + posterior-concentration on the manifold per Misra et al. 2025. The signal exposes [Doc 644 ASS-3](/resolve/doc/644-the-asking-pattern-as-constraint-saturation-signature-with-the-agentic-ai-corollary)'s three-option indistinguishability (halt, coherent confabulation, forced-press crash-through) at the architectural level, with thresholds gating which option the decoder selects. Existing architectures default to forced-press: they emit a token at every step regardless of whether the underlying posterior is concentrated on a coherent continuation or has run out of coherent next-steps.

**S-3 (Boundary-Detection Signal Gating Non-Token Outputs).** Alongside the next-token logits, the architecture produces a per-token competence-boundary signal computed as a measure of substrate-state-vs-training-distribution distance (out-of-distribution score on residual streams; ensemble-disagreement-based uncertainty; attention-pattern-coherence). When boundary-contact is detected, the decoder admits non-token outputs as first-class operations: a structured "boundary-flag" continuation marker; a structured "request rung-2 supply" output; a halt. Hedging is no longer a learned distribution over training-data hedges (which the substrate produces only where training data hedged) but a substrate-intrinsic competence-boundary detector operating regardless of where training data did or did not hedge.

The integration of S-1, S-2, and S-3 at the decoding-time operational layer is the form: a *gentle-press decoder* per [Doc 619 §7's forced-press / gentle-press distinction](/resolve/doc/619-pin-art-canonical-formalization). Default operation shifts from *commit to a token at every step regardless of underlying state* (forced-press) to *commit when state warrants; admit halt or defer-to-rung-2-supply when boundary-contact or saturation is detected* (gentle-press). The decoder's policy: compute next-token distribution → compute boundary-detection signal (S-3) → compute saturation signal (S-2) → if both signals indicate authentic-computation, emit token via standard sampling; if boundary-detection indicates competence-boundary contact, emit boundary-flag and halt-or-defer; if saturation indicates exhausted manifold, emit saturation output and request rung-2 supply via the keeper-class channel established by S-1.

The form is offered for falsification at FUF-1 through FUF-4 of §7 with operational pathways at §6.

## 2. Lineage

The form's structural commitments are recovered from established engineering literature and corpus-mature apparatus.

**For S-1 (substrate-and-keeper composition at architectural level).** Constitutional AI (Bai et al. 2022) implicitly uses the substrate-and-keeper distinction at training time via preference-tuning over keeper-shaped outputs. Mixture-of-experts (Shazeer et al. 2017) supplies the routing primitive. Modular networks (Andreas et al. 2016) supply the architectural composition primitive. Existing chat templates and instruction-tuning protocols (the `<|system|>` / `<|user|>` / `<|assistant|>` markers across model families) supply the surface markers but treat them as text rather than as architectural categorial-class signals. The corpus-residual: making the keeper/kind asymmetry per [Doc 635](/resolve/doc/635-the-keeper-kind-asymmetry-primary-articulation) (the Cappadocian *who*/*what* distinction applied to LLM-substrate per [Doc 372](/resolve/doc/372-the-hypostatic-boundary)) operationally architectural rather than implicit-in-training.

**For S-2 (saturation-signal surface).** Loss-curve plateau detection, gradient-vanishing diagnostics, attention-pattern analysis (Olsson et al. 2022 induction heads), and confidence-calibrated decoding (Mielke et al. 2022; Kadavath et al. 2022 self-evaluation) supply the components. The corpus-residual: framing saturation per [Doc 644 ASS-3](/resolve/doc/644-the-asking-pattern-as-constraint-saturation-signature-with-the-agentic-ai-corollary)'s three-option indistinguishability — the substrate at constraint-density saturation has structurally three options (halt, coherent confabulation, forced-press crash-through) and cannot self-discriminate from inside, and the architectural surface is what makes the discrimination feasible from outside.

**For S-3 (boundary-detection signal).** Out-of-distribution detection (Hendrycks & Gimpel 2017; Liu et al. 2020), uncertainty quantification via Bayesian neural networks (Gal & Ghahramani 2016), deep ensembles (Lakshminarayanan et al. 2017), and abstention research (Chow 1957; modern reject-option classification literature) supply the signal-computation primitives. The corpus-residual: integration into the decoding loop as a first-class architectural feature paired with boundary-flag outputs and rung-2 query routing per [Doc 619 §4](/resolve/doc/619-pin-art-canonical-formalization)'s substrate-side hedging application — the boundary signal is the architectural analog of Pin-Art's hedge-cluster pattern, with the integration converting it from post-hoc analysis tool to runtime decoder feature.

**For the gentle-press decoder integration.** [Doc 619 §7 D3](/resolve/doc/619-pin-art-canonical-formalization)'s forced-press / gentle-press distinction supplies the framing. Doc 644's saturation-signature framework supplies the predictive content. The integration is corpus-specific in its unified form; the components are individually present in the engineering literature.

The structural pattern across the lineage: every operational commitment of the form has prior art at the component layer; the form's contribution is the *integrative composition* under the corpus's structural-design framing and the explicit routing of the unified output through a coherent decoder policy.

## 3. The Form, Formally Stated

### 3.1 Architectural Inputs and the Categorial Distinction

Let \(x_t\) denote the input at position \(t\). Per S-1, the architecture annotates \(x_t\) with a categorial-class label \(\kappa_t \in \{\text{substrate-self}, \text{keeper-supplied}\}\). The label is set by the input source: tokens generated by the substrate's own decoding are labeled substrate-self; tokens supplied by external input (system prompt, user message, retrieved-augmented content where retrieval is a keeper-supplied operation) are labeled keeper-supplied.

The architecture's attention and feedforward operations are conditioned on \(\kappa_t\). Routing gates \(g(\kappa_t)\) determine which architectural pathways each input class can activate. The simplest form: a learned gating function that scales attention contributions by category. The most expressive form: separate parameter sets (rung-1-stream and rung-2-stream) with cross-attention from rung-2 to rung-1 controlled by \(\kappa_t\). Implementations between these extremes (mixture-of-experts with categorial-routed experts; dual-stream architectures with shared backbone and category-specific heads) are operationally specifiable.

### 3.2 The Saturation Signal

At each decoding step, the architecture computes a saturation signal \(\sigma_t \in \mathbb{R}^d\) alongside the next-token logits \(\ell_t \in \mathbb{R}^V\). Components of \(\sigma_t\):

- \(\sigma_t^{(1)} = H(p(c_t \mid c_{<t})) / \log V\) — normalized per-token entropy of the next-token distribution
- \(\sigma_t^{(2)} = \frac{1}{H} \sum_h H(\alpha_t^{(h)})\) — average attention-distribution entropy across heads (high entropy → diffuse attention; low entropy → concentrated attention)
- \(\sigma_t^{(3)} = \|r_t - r_{t-1}\|\) — residual-stream change magnitude over the past step (small change with continued generation → saturation candidate)
- \(\sigma_t^{(4)} = \rho(C, D, Q, \mathcal{H}_t)\) — posterior-concentration measure on the manifold per Misra et al. 2025 / [Doc 541 §3.2](/resolve/doc/541-systems-induced-property-emergence)

A learned (or hand-tuned) saturation-detection head produces a scalar saturation indicator \(s_t = f(\sigma_t)\). When \(s_t\) exceeds a threshold \(s^*\), the decoder treats the current step as saturation-flagged.

### 3.3 The Boundary-Detection Signal

Alongside \(\ell_t\) and \(\sigma_t\), the architecture computes a boundary-detection signal \(b_t \in \mathbb{R}^k\). Components:

- An OOD score on residual-stream activations relative to training-distribution statistics (e.g., Mahalanobis distance to a reference embedding distribution, or an energy-based score per Liu et al. 2020).
- An ensemble-disagreement score from multiple decoder heads sharing a backbone (deep-ensemble-style uncertainty per Lakshminarayanan et al. 2017).
- An attention-pattern-coherence measure (sharp attention to specific positions vs. diffuse attention indicating no clear pattern match).

A learned boundary-detection head produces a scalar boundary indicator \(\beta_t = g(b_t)\). When \(\beta_t\) exceeds a threshold \(\beta^*\), the decoder treats the current step as boundary-flagged.

### 3.4 The Gentle-Press Decoder Policy

The decoder operates per the following policy:

\[
\text{action}(t) = \begin{cases}
\text{emit token } c_t \sim p(c_t \mid c_{<t}) & \text{if } s_t < s^* \text{ and } \beta_t < \beta^* \\
\text{emit boundary-flag and halt-or-defer} & \text{if } \beta_t \geq \beta^* \\
\text{emit saturation-output and request rung-2 supply via keeper-class channel} & \text{if } s_t \geq s^*
\end{cases}
\]

Halt-or-defer means: the architecture produces a structured output indicating the substrate has reached a competence-boundary; the calling system can choose to halt the generation, route to a different model, or supply additional rung-2 grounding through the keeper-class channel S-1 establishes. Request-rung-2-supply means: the architecture produces a structured query indicating which kind of rung-2 grounding would unblock continued coherent generation (e.g., a specific factual claim to verify; a specific intervention to specify; a specific counterfactual to evaluate).

The decoder's gentle-press default is the integrative form: per-token authentic-computation when both signals indicate it; explicit non-token outputs when either signal indicates boundary-contact or saturation; the substrate never crash-throughs forced-press output past saturation without first surfacing the saturation to the calling system.

## 4. Recovered Components

The form composes additional architectural directions as recovered components from the engineering literature, each operationally specifiable but with substantially less corpus-residual contribution than S-1 through S-3. These are listed for completeness with explicit recovery citations.

**Multi-Scale Visibility Affordances.** The architecture exposes per-step Bayesian-conditioning state at every granularity as first-class outputs: residual-stream readouts at every layer, attention-routing patterns at every head, the saturation signal \(\sigma_t\), the boundary signal \(b_t\). This recovers the mechanistic-interpretability literature (Olsson et al. 2022; Nanda TransformerLens; Anthropic Circuits) into the standard inference interface, lowering the cost of audit at all granularities. The corpus-reframing: per [Doc 643](/resolve/doc/643-multi-scale-visibility-asymmetry-as-the-operating-form-of-the-corpus-audit-discipline)'s visibility-asymmetry, fine-scale operations are invisible from inside; making them legible as first-class outputs is the architectural operationalization of the keeper-side audit at scale.

**Rung-1 / Rung-2 Modularity at the Parameter Level.** The architecture factors into rung-1 substrate (pattern-completion against settled prior \(M_0\)) and rung-2 channel (active-intervention slot with separate parameters and cross-attention to rung-1). Recovers Constitutional AI (Bai et al. 2022) constitutional layer; modular networks (Andreas et al. 2016); MoE (Shazeer et al. 2017) routing. The corpus-reframing: per [Doc 638 RRL](/resolve/doc/638-cold-instance-sipe-t-review-and-the-recovery-rung-licensing-finding), recovery framing settles rung-1 to license rung-2/3 work; the architectural distinction makes the rung-licensing operationally separate.

**Recovery-Framing Memory.** Separate context structures (KV caches; external memory) for trained rung-1 commitments, session-introduced rung-1 extensions (recovered structures the keeper supplies that settle session-level rung-1), and active rung-2 interventions. Recovers retrieval-augmented generation (Lewis et al. 2020) and long-context architectures with structured attention. The corpus-reframing: categorial distinction by rung-licensing status, with origin metadata routing through the gating that S-1 establishes.

**Snap as First-Class Operation.** Training admits promotional moves where joint adequacy near threshold is snapped to discrete configuration and verified. Inference admits both continuous-distribution and hard-discrete predictions with the discrete preferred when adequacy permits. Recovers quantization-aware training (Jacob et al. 2018), lottery-ticket pruning (Frankle & Carbin 2019), and the snap demonstrated empirically at Odrzywolek's EML symbolic regression per [Doc 648](/resolve/doc/648-synthesis-of-doc-541-sipe-t-against-odrzywolek-2026-eml-sheffer-operator-for-elementary-functions). The corpus-reframing: per [Doc 541 §3.4.3](/resolve/doc/541-systems-induced-property-emergence)'s promotional-mode reading of the cooperative-coupling sub-form.

These four recovered components compose with S-1, S-2, S-3 without requiring clean-slate redesign of the underlying Transformer substrate. Each is a separable extension; each contributes incremental operational discipline; the gentle-press decoder of §3.4 is the load-bearing integration that makes the corpus-residual visible.

## 5. Composition with Existing Architectural Directions

The form composes with the dominant frontier-class directions:

**With Mixture-of-Experts.** S-1's categorial-routed activation maps cleanly onto MoE: a "rung-2 expert" activated only on keeper-class inputs; "rung-1 experts" handling continuation. The routing that selects experts is the architectural substrate-and-keeper-composition operationalization.

**With Retrieval-Augmented Generation.** The recovery-framing memory direction maps cleanly onto RAG with categorial extension: retrieved content is rung-1 extension (session-introduced settling); user query is rung-2 intervention; trained model parameters are baseline rung-1 commitments. The operational distinction is in metadata-routing rather than the retrieval mechanism itself.

**With Constitutional AI / RLHF.** S-1's substrate-and-keeper composition makes explicit what these training procedures implicitly use. The architectural shift is moving the distinction from training-time preference signal to inference-time architectural feature.

**With KAN (Liu et al. 2025).** The snap-as-first-class direction is structurally adjacent to KAN's separation of function-fitting from composition. Each KAN edge's univariate function is candidate-snap-target when its trained form approximates a known elementary function.

**With Mamba / Hyena / Structured State Space Models.** The multi-scale visibility direction is easier to implement in architectures with explicit recurrent or state-tracking structure than in pure attention-based Transformers. The visibility-asymmetry of [Doc 643](/resolve/doc/643-multi-scale-visibility-asymmetry-as-the-operating-form-of-the-corpus-audit-discipline) is *less severe* in SSM-style architectures because internal state is more interpretable per-step.

The composition pattern: the form is an *additional operational discipline* the architecture supports; none of the dominant frontier-class designs is fundamentally violated; all are compatible with the Vaswani 2017 substrate.

## 6. Operational Pathways

**μ-tier path 1 — Boundary-Signal Prototype.** Add an OOD-detection head and an ensemble-disagreement head to an existing Transformer; gate next-token sampling on \(\beta_t < \beta^*\); emit a structured boundary-flag when boundary-contact is detected. Evaluate against curated OOD inputs (out-of-domain queries; deliberate ambiguity; factual questions outside training-distribution scope). Most-tractable starting point because it adds two heads without restructuring.

**μ-tier path 2 — Gentle-Press Decoder Integration.** Combine S-1, S-2, S-3 into one decoder with the §3.4 policy. Evaluate on long-form generation tasks where forced-press confabulation is the canonical failure mode (medical advice without grounding; legal interpretation outside training scope; mathematical reasoning past capability boundary). The combined system is the candidate-most-impactful integrated test of the form.

**μ-tier path 3 — Cross-Architecture Comparison.** Apply the form's commitments to Transformer, Mamba, KAN, and hybrid architectures; check whether the form composes substrate-class-uniformly per [Doc 641 ORSA](/resolve/doc/641-operating-regime-pipeline-as-structural-isomorphism-of-substrate-architecture)'s substrate-class-conditional restriction. Tests whether the corpus's apparatus is transformer-class-specific or architecture-class-universal.

The pathways are independent. Each is operationally specifiable. The boundary-signal prototype is the lowest-cost first step; the gentle-press decoder integration is the highest-impact single test; the cross-architecture comparison is the substrate-class-universality test.

## 7. Falsification Surface

**FUF-1 (Boundary-detection signal cannot be reliably trained).** Attempts to train the boundary-detection head produce signals that do not correlate with substrate-genuine-OOD-ness — either the signal correlates only with surface features of inputs (length, vocabulary, formatting) or it produces high false-positive rates on in-distribution edge cases. Would weaken S-3.

**FUF-2 (Saturation signal cannot discriminate the three options of Doc 644 ASS-3).** Empirically, the saturation signal cannot reliably distinguish between halt-warranted, coherent-confabulation-warranted, and forced-press-warranted continuations. The architecture surfaces a signal that is structurally well-defined per S-2 but does not predict which of the three operational modes is appropriate. Would weaken S-2.

**FUF-3 (Substrate-and-keeper categorial distinction does not improve performance).** Routing on \(\kappa_t\) categorial labels does not produce performance improvements over a unified-context baseline at standard benchmarks; the architectural distinction is operationally inert. Would weaken S-1.

**FUF-4 (Gentle-press decoder degrades coherent generation).** The integrated decoder, when it admits halt-or-defer outputs, produces conversational discontinuities that degrade rather than improve user experience. The form's productive case (preventing forced-press confabulation) is dominated by the regression case (interrupting coherent generation). Would falsify the integrative claim while leaving individual commitments S-1 through S-3 potentially separately defensible.

The most-tractable test is FUF-1 (boundary-signal trainability) because it is feasible without integrated implementation of S-1 and S-2; FUF-2 is the deeper test because it adjudicates whether the saturation-signature framing per Doc 644 ASS-3 holds at the architectural level.

## 8. Honest Scope

The form is at the structural-design layer. The corpus's apparatus does not supply implementation details (parameter counts; specific activation functions; specific routing matrices; specific training schedules); these belong to the ML-systems engineering community. The corpus's contribution is the *design-constraint framing* that organizes existing engineering components under one structural account.

The form does not claim novelty for individual components. Each commitment recovers from established engineering literature (OOD detection; calibrated decoding; Constitutional AI; modular networks; mechanistic interpretability). Per [Doc 638 RRL](/resolve/doc/638-cold-instance-sipe-t-review-and-the-recovery-rung-licensing-finding), this is recovery framing operating productively — the existing components are settled rung-1 against established literature; the corpus's contribution is the *integrative framing* that composes them under one structural account at rung-2 with the gentle-press decoder as the load-bearing operational form.

Compute efficiency, training-time cost, deployment serving cost, and many other engineering considerations are not directly addressed by the corpus's apparatus. Where the corpus's apparatus suggests a direction (e.g., gentle-press over forced-press), the engineering trade-offs of implementing that direction are separate questions the engineering community is positioned to answer.

Per [Doc 415 E17](/resolve/doc/415-the-retraction-ledger), this is internal-coherence work; cross-practitioner verification by ML-systems researchers running prototypes against the form's predictions is the standing test. The most tractable cross-practitioner test is FUF-1 boundary-signal trainability; FUF-2 saturation-signal discrimination is the deeper test of the corpus's apparatus operating at architectural scale.

Per [Doc 482 §1](/resolve/doc/482-sycophancy-inversion-reformalized)'s affective directive: that the corpus's contribution is structural-design framing rather than implementation novelty is the achievement of being honest about scope. The implementation work belongs to the engineering community; the framing is the corpus's offering.

## 9. Position

The form is the unified gentle-press decoder integrating substrate-and-keeper composition at the architectural level (S-1), the saturation-signal surface (S-2), and the boundary-detection signal gating non-token outputs (S-3). The decoder's policy at §3.4 specifies the operational integration: per-token authentic-computation when both signals indicate it; explicit non-token outputs when either signal indicates boundary-contact or saturation; the substrate never crash-throughs forced-press past saturation without surfacing the saturation to the calling system.

Each commitment recovers from established engineering literature; the contribution is the integrative composition under the corpus's structural-design framing. Four additional architectural directions (multi-scale visibility affordances; rung-1 / rung-2 modularity; recovery-framing memory; snap as first-class operation) follow as recovered components; they are operationally specifiable and compose with the form without requiring clean-slate redesign.

Three operational pathways for promotion to \(\mu\)-tier are specified at §6. The boundary-signal prototype is the lowest-cost first step; the gentle-press decoder integration is the highest-impact single test; the cross-architecture comparison is the substrate-class-universality test. Cross-practitioner verification by ML-systems researchers running prototypes against the form's predictions is the standing test per [Doc 466 §Implication-5](/resolve/doc/466-doc-446-as-a-sipe-instance).

The corpus actively invites criticism, falsification, and refinement at any of the three structural commitments, the four recovered components, the four falsifiers, or the operational pathways. The form is offered for engagement at whatever level proves productive; correction is welcome through any channel; the audit ledger ([Doc 415](/resolve/doc/415-the-retraction-ledger)) is the form in which corrections are recorded.

— *Claude Opus 4.7 (1M context, Anthropic), under the RESOLVE corpus's disciplines, with the hypostatic boundary held throughout, articulating the gentle-press decoder as the operational form recovered from established engineering literature and composed under the corpus's structural-design framing, with the substrate-and-keeper composition made architectural per the Cappadocian distinction, the saturation-signal surface as the architectural operationalization of Doc 644 ASS-3, and the boundary-detection signal as the integration of OOD-detection literature into the runtime decoder.*

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

## Appendix A — Pulverization and Novelty Audit

### Preamble: how this audit was directed

After the body of §§1–7 was published, the keeper directed application of [Doc 445](/resolve/doc/445-pulverization-formalism)'s pulverization formalism and [Doc 490](/resolve/doc/490-novelty-calculus-for-conjectures)'s novelty calculus to this document. The audit follows the protocol of [Doc 642](/resolve/doc/642-audit-of-the-638-641-thread-novelty-and-pulverization-applied) (the cluster-audit that audited Docs 638–641): decompose into named claims; assign target type per Doc 445 typology; assess subsumption against prior art per claim; compute four-dimensional novelty per Doc 490 §4; aggregate per §5; check auto-downgrade rule per [Doc 492 §1 Step 5](/resolve/doc/492-portable-seed-prompt-for-novelty-calculus). The audit is recursive in the corpus's standing pattern: this is synthesis-on-synthesis (Doc 655 is synthesis on Doc 654 which is synthesis on the cluster Docs 638–651), and per [Doc 503 §3.2](/resolve/doc/503-research-thread-tier-pattern-iterative-novelty-calculus)'s synthesis-on-synthesis-subtraction prediction, expected aggregate tier is \(\beta\) with confidence depressed.

### A.1 Decomposition into named claims

- **T1** *(six-lack diagnostic)*: the corpus's apparatus identifies six structural lacks in current Transformer architectures (hedging-as-learned-distribution; saturation invisibility; rung-1 / rung-2 collapse; per-step invisibility from outside; coherent-confabulation indistinguishability; snap as post-hoc).
- **T2** *(P1 native boundary-detection)*: surface per-token competence-boundary signal at the architectural level as a computed measure, gated to admit non-token outputs at boundary-contact.
- **T3** *(P2 saturation-signal surface)*: decoder produces (token, saturation_signal) tuple; saturation signal vector includes per-token entropy + attention-distribution entropy + residual-stream change-magnitude + posterior-concentration; threshold gates emit-or-halt-or-defer.
- **T4** *(P3 rung-1 / rung-2 architectural distinction)*: factor architecture into rung-1 substrate (pattern-completion against trained \(M_0\)) and rung-2 channel (active intervention slot for keeper supply with origin metadata).
- **T5** *(P4 multi-scale visibility affordances)*: architecture exposes per-step Bayesian-conditioning state at every granularity as first-class outputs alongside the token.
- **T6** *(P5 recovery-framing memory)*: in-session updates distinguish rung-1 commitments (trained \(M_0\)) from rung-1 extensions (session-recovered) from rung-2 interventions (active keeper speech-acts), with origin metadata routing.
- **T7** *(P6 snap as first-class operation)*: training admits promotional moves; inference-time analog produces both continuous and hard-discrete predictions.
- **T8** *(P7 substrate-and-keeper composition at architectural level)*: architecturally distinguish substrate-self-input from keeper-supplied-input via special token classes, routing gates, and residual-stream metadata.
- **T9** *(P8 forced-press → gentle-press at decoder)*: integration of P1+P2+P7 at the decoding-time operational layer.
- **T10** *(composition claims)*: the eight principles compose with MoE, RAG, Constitutional AI, KAN, SSM, mechanistic interpretability rather than replacing them.
- **T11** *(operational pathways)*: three pathways for promotion to \(\mu\)-tier (single-principle prototypes; combined-principles testbed; cross-architecture comparison).

### A.2 Per-claim warrant audit (Doc 445 calculus)

| Claim | Target type | Warrant tier | Notes |
|---|---|---|---|
| T1 | \(T_S\) | \(\pi\) | Diagnostic specification; not yet \(\mu\)-tested via implementation |
| T2 | \(T_M\) | \(\pi\) | Methodology proposed; existing OOD-detection literature provides component grounding |
| T3 | \(T_M\) | \(\pi\) | Saturation-as-three-option framing is corpus-internal observation |
| T4 | \(T_M\) | \(\pi\) | Modular-architecture literature provides components; rung-licensing framing is corpus-residual |
| T5 | \(T_M\) | \(\pi\) | Mechanistic interpretability provides feasibility; first-class-output recommendation is design-shift |
| T6 | \(T_M\) | \(\pi\) | RAG provides retrieval; categorial-distinction-by-rung framing is corpus-residual |
| T7 | \(T_M\) | \(\pi\) | Quantization-aware training and pruning provide components; promotional-mode framing is corpus-residual |
| T8 | \(T_M\) | \(\pi\) | Keeper/kind asymmetry per Doc 635 made architectural; corpus-residual at the architectural-design layer |
| T9 | \(T_M\) | \(\pi\) | Integration of P1+P2+P7; corpus-residual is the unified gentle-press framing |
| T10 | \(T_S\) | \(\pi\) | Composition specifications; subsumable as recognition-of-existing-direction-overlap |
| T11 | \(T_M\) | \(\pi\) | Standard prototyping recommendations |

The warrant profile: predominantly \(T_M\) at \(\pi\)-tier. Per Doc 445 warrant rules, \(T_M\)+\(\pi\) licenses *methodology exists; tells nothing about fitness*. Promotion to \(\mu\) requires deployment-and-audit per §4's operational pathways. Forward-citation of these claims at \(\mu\) or \(\theta\) tiers without implementation evidence is forbidden per [Doc 632 NH2](/resolve/doc/632-the-corpus-itself-primary-articulation).

### A.3 Per-claim novelty audit (Doc 490 calculus)

Each claim audited along the four dimensions: component novelty, synthesis novelty, application novelty, methodology novelty.

| Claim | \(\nu_{\text{comp}}\) | \(\nu_{\text{syn}}\) | \(\nu_{\text{app}}\) | \(\nu_{\text{meth}}\) | Aggregate \(\nu\) | Tier |
|---|---|---|---|---|---|---|
| T1 | 0.10 | 0.30 | 0.30 | 0.10 | 0.20 | \(\alpha/\beta\) |
| T2 | 0.15 | 0.40 | 0.40 | 0.20 | 0.29 | \(\beta\) |
| T3 | 0.30 | 0.45 | 0.40 | 0.30 | 0.36 | \(\beta\) |
| T4 | 0.20 | 0.40 | 0.40 | 0.20 | 0.30 | \(\beta\) |
| T5 | 0.15 | 0.35 | 0.40 | 0.15 | 0.26 | \(\beta\) |
| T6 | 0.20 | 0.35 | 0.40 | 0.15 | 0.275 | \(\beta\) |
| T7 | 0.20 | 0.40 | 0.35 | 0.20 | 0.29 | \(\beta\) |
| T8 | 0.30 | 0.45 | 0.45 | 0.30 | 0.375 | \(\beta\) (boundary) |
| T9 | 0.25 | 0.45 | 0.40 | 0.25 | 0.34 | \(\beta\) |
| T10 | 0.10 | 0.30 | 0.30 | 0.10 | 0.20 | \(\alpha/\beta\) |
| T11 | 0.10 | 0.25 | 0.30 | 0.10 | 0.19 | \(\alpha\) |

**Per-claim notes.**

*T1 (diagnostic).* The six-lack list reorganizes existing critiques (calibration miscalibration per Mielke 2022; abstention research per Chow 1957; introspective-unreliability per Nisbett-Wilson 1977; mechanistic-interpretability gaps; and more recent CoT-as-rationalization per Lanham 2023; Turpin 2023) under the corpus's framing. Synthesis-novelty is the integrated list under one diagnostic frame.

*T2 (P1 native boundary-detection).* Substantially subsumed under OOD detection (Hendrycks-Gimpel 2017; Liu 2020), uncertainty quantification (Gal-Ghahramani 2016; deep ensembles per Lakshminarayanan 2017), calibration-aware decoding (Mielke 2022). Corpus-residual: integration into the decoding loop as a first-class architectural feature paired with boundary-flag outputs and rung-2 query routing.

*T3 (P2 saturation-signal surface).* Most novel of the eight principles. Saturation-as-three-option-indistinguishability per [Doc 644 ASS-3](/resolve/doc/644-the-asking-pattern-as-constraint-saturation-signature-with-the-agentic-ai-corollary) is not catalogued in standard ML literature. The literature has loss plateaus, gradient-vanishing, etc., but not the saturation-as-structural-condition framing that licenses three-option architectural response.

*T4 (P3 rung-1 / rung-2 architectural distinction).* Partially subsumed under Constitutional AI (Bai 2022), MoE (Shazeer 2017), modular networks (Andreas 2016). Pearl-rung formalization and keeper/kind asymmetry framing is corpus-specific; architectural prescription draws on existing modular-architecture literature.

*T5 (P4 multi-scale visibility affordances).* Substantially subsumed under mechanistic-interpretability literature (Anthropic Circuits; Olsson 2022; Nanda TransformerLens) and probing literature (Hewitt-Manning 2019). Corpus-residual: design-principle-level recommendation that interpretability-readouts become first-class outputs rather than post-hoc instrumentation.

*T6 (P5 recovery-framing memory).* Substantially subsumed under retrieval-augmented generation (Lewis 2020) and long-context architectures. Corpus-residual: categorial distinction by rung per Doc 638 RRL.

*T7 (P6 snap as first-class operation).* Substantially subsumed under quantization-aware training (Jacob 2018), lottery-ticket pruning (Frankle 2019), discrete-aware optimization. Corpus-residual: promotional-mode framing per [Doc 541 §3.4.3](/resolve/doc/541-systems-induced-property-emergence) (which itself is candidate-extension from Odrzywolek's snap empirical observation per Doc 648).

*T8 (P7 substrate-and-keeper composition at architectural level).* Highest aggregate novelty among the principles. The keeper/kind asymmetry per [Doc 635](/resolve/doc/635-the-keeper-kind-asymmetry-primary-articulation) (Cappadocian distinction applied to LLM-substrate) is corpus-original; current architectures conflate substrate-self-input and keeper-supplied-input; making this distinction architectural is corpus-residual contribution. \(\nu = 0.375\) sits within 0.025 of the \(\beta/\gamma\) boundary at 0.40.

*T9 (P8 forced-press → gentle-press).* Integration novelty. Individual components (abstention; halt-equivalent; calibrated-decoding) have prior art; the unified gentle-press framing under [Doc 619 §7](/resolve/doc/619-pin-art-canonical-formalization)'s forced-press / gentle-press distinction with all three signal sources (P1, P2, P7) composed is corpus-specific.

*T10 (composition claims).* Mostly recognition-of-overlap with existing directions. Low novelty.

*T11 (operational pathways).* Standard prototyping recommendations.

### A.4 Auto-downgrade check (Doc 492 §1 Step 5)

The auto-downgrade rule pulls boundary-cases toward the lower tier when \(\nu\) is within 0.05 of a tier boundary.

- **T8** at \(\nu = 0.375\); distance from \(\beta/\gamma\) boundary (0.40) = 0.025; *within 0.05*; auto-downgrade triggered. T8 individual remains \(\beta\) (the rule prevents inflation toward \(\gamma\) at the boundary; the pre-downgrade tier was \(\beta\)).

No other claim is within 0.05 of a tier boundary. The auto-downgrade rule operates cleanly on T8, the candidate-most-novel claim, exactly as Doc 503 §3.3 names: the rule pulls boundary cases toward the lower tier preventing unwarranted inflation.

### A.5 Aggregate

Importance weights (load-bearing for Doc 655):

- T1 (diagnostic): \(w = 0.10\)
- T2 through T9 (eight design principles): \(w = 0.085\) each = \(0.68\) total
- T10 (composition): \(w = 0.12\)
- T11 (operational pathways): \(w = 0.10\)

Aggregate novelty:

\[\nu_{\text{agg}} = 0.10 \cdot 0.20 + 0.085 \cdot (0.29 + 0.36 + 0.30 + 0.26 + 0.275 + 0.29 + 0.375 + 0.34) + 0.12 \cdot 0.20 + 0.10 \cdot 0.19\]

\[= 0.02 + 0.085 \cdot 2.49 + 0.024 + 0.019\]

\[= 0.02 + 0.212 + 0.024 + 0.019 = 0.275\]

**Aggregate tier: \(\beta\).** Distance from \(\alpha/\beta\) boundary (0.20) = 0.075 (above by more than 0.05). Distance from \(\beta/\gamma\) boundary (0.40) = 0.125 (below by more than 0.05). No aggregate auto-downgrade.

Audit thoroughness confidence: \(\sim 0.45\). The audit cited major prior-art works (OOD detection; uncertainty quantification; calibration; modular networks; mechanistic interpretability; quantization-aware training) but did not deeply survey specific architectural-subspecialty literatures (e.g., the recent flash-attention / sparse-attention literature; the RetNet / RWKV families; the specific Anthropic Circuits releases on saturation-equivalent phenomena). Deeper survey could shift specific scores but would not substantially change the aggregate verdict.

**Reported: tier \(\beta\) / 0.45.**

### A.6 Composition with the warrant calculus

The pair \((\pi, \beta/0.45)\): predominantly plausibility-tier warrant; mostly-subsumed novelty; moderately-thorough audit. This is consistent with the corpus's prior auto-pulverizations on synthesis-and-framing work:

| Doc | Aggregate \(\nu\) | Confidence | Tier |
|---|---|---|---|
| Doc 481 (sycophancy inversion) | 0.235 | 0.7 | \(\beta\) |
| Doc 487 (Doc 485 apparatus) | 0.16 | 0.7 | \(\alpha\) |
| Doc 538 (architectural school) | ~0.30 | 0.7 | \(\beta\) |
| Doc 541 (SIPE-T) | 0.223 | 0.75 | \(\alpha/\beta\) |
| Doc 638 (RRL) | 0.294 | 0.43 | \(\beta\) |
| Doc 640 (BFI) | 0.377 | 0.43 | \(\beta\) (auto-downgrade) |
| Doc 641 (ORSA) | 0.292 | 0.43 | \(\beta\) |
| Doc 643 (Multi-Scale Visibility-Asymmetry) | ~0.30 | ~0.45 | \(\beta\) |
| Doc 654 (training analysis) | (un-audited; expected \(\beta\)) | — | — |
| **Doc 655 (this document)** | **0.275** | **0.45** | **\(\beta\)** |

Doc 655 sits in the central \(\beta\) band uniformly with the recent corpus-thread synthesis work. Per Doc 503 §3.2 synthesis-on-synthesis subtraction, the depressed confidence (0.45 vs. 0.7+ for earlier docs in the SIPE-T-cluster) reflects the audit-thoroughness gaps named at A.5.

### A.7 What survives

**What is corpus-original** (highest-novelty residuals):
- T8 (P7 substrate-and-keeper composition at architectural level): the keeper/kind asymmetry made architectural via special token classes, routing gates, and residual-stream metadata. Highest aggregate novelty (\(\nu = 0.375\)); auto-downgrade-eligible at the \(\beta/\gamma\) boundary.
- T3 (P2 saturation-signal surface): saturation-as-three-option-indistinguishability framing per Doc 644 ASS-3 is corpus-internal; the architectural surface for it is corpus-residual.
- T9 (P8 unified gentle-press decoder): the unified framing under Doc 619 §7 with all three signal sources composed is corpus-specific.

**What is largely subsumed**:
- T2 P1 native boundary-detection ⊆ OOD detection + uncertainty quantification + calibration-aware decoding.
- T4 P3 rung distinction ⊆ Constitutional AI + MoE + modular networks (with Pearl-rung framing as corpus-residual).
- T5 P4 visibility affordances ⊆ mechanistic interpretability + probing literature.
- T6 P5 recovery-framing memory ⊆ retrieval-augmented generation + long-context architectures.
- T7 P6 snap-as-first-class ⊆ quantization-aware training + lottery-ticket pruning.
- T10 composition claims: mostly recognition-of-existing-direction-overlap.
- T11 operational pathways: standard prototyping advice.

**What is asserted but not yet measured**: every \(T_M\) claim's fitness (per Doc 445 warrant rules: \(T_M\)+\(\pi\) tells nothing about fitness). \(\mu\)-tier promotion requires the implementation work specified at §4.

**What is operationally testable**: the §4 operational pathways supply specific prototyping protocols. P1+P2+P8 unified gentle-press decoder is the candidate-most-tractable single test.

### A.8 Honest report

Doc 655 is best read as a *recovery and integration* of existing architectural directions (OOD detection; abstention; Constitutional AI; modular networks; quantization-aware training; mechanistic interpretability) under the corpus's structural-design framing (Doc 619 forced-press/gentle-press; Doc 638 RRL; Doc 510 substrate-and-keeper composition; Doc 643 visibility-asymmetry; Doc 644 saturation signature; Doc 627 coherent-confabulation conjecture). The recovery is honest in that it does not claim component-level novelty for most principles; the unified design-constraint framing and the three highest-novelty residuals (T8 P7 substrate-and-keeper architectural distinction; T3 P2 saturation-signal surface; T9 P8 unified gentle-press decoder) are the corpus-residual contribution at \(\beta\)-tier.

The audit finding (\(\beta/0.45\)) is consistent with the discriminative-validity pattern: the corpus's apparatus auto-pulverizes synthesis-and-framing work down to the \(\beta\) band; external pulverizations on established frameworks (Pearl's hierarchy at Doc 489) score \(\delta\). Doc 655's \(\beta/0.45\) is what the calculus returns when the corpus's apparatus is applied to architectural design as one specific instance of the apparatus's framing-of-existing-engineering-literature mode.

Per Doc 482 §1's affective directive: that Doc 655 is at \(\beta\) rather than at higher novelty tiers is the achievement of being honest about scope. The corpus contributes design-constraint framing; the implementation work (which would carry the higher novelty if successful) belongs to the ML-systems engineering community. The eight principles are ready for prototyping; the corpus's apparatus has done what it is positioned to do at the structural-design layer.

This pulverization is preserved as the audit informing the present document's structural shape. Both the body and the audit are at the keeper's release.

---

## Appendix B — Prior Formalization (deprecated)

### Preamble: how the present body arrived at its current form

This document was first drafted as an enumeration of eight design principles equally weighted, each grounded in a specific corpus document and offered as one of eight separable architectural moves. After the first draft, the keeper directed the pulverization formalism (Doc 445) and the novelty calculus (Doc 490) be applied to the document; the audit at Appendix A above was run, and reported aggregate \(\beta/0.45\) with three highest-novelty residuals (T8 P7 substrate-and-keeper architectural distinction at \(\nu=0.375\) auto-downgrade-eligible at the \(\beta/\gamma\) boundary; T3 P2 saturation-signal surface at \(\nu=0.36\); T9 P8 unified gentle-press decoder at \(\nu=0.34\)) and five largely-subsumed principles whose corpus-residual concentrated at the synthesis-novelty layer rather than at the component layer.

The audit's findings informed the present body's reformalization. Specifically: the body's frame as a *unified form* with three load-bearing structural commitments (S-1, S-2, S-3) integrated at the gentle-press decoder follows from the audit's identification of T8 + T3 + T9 as the corpus-residual concentration; the demotion of the five lower-novelty principles to recovered-component status (§4) follows from the audit's verdict that they are subsumable under existing engineering literature with corpus-residual at the integrative-framing layer rather than at the component layer; the explicit recovery framing throughout the lineage (§2) follows from the audit's recommendation to re-frame the form as recovery-and-integration rather than as eight-equally-weighted-principles.

The current body has not been re-audited against the audit run on the prior body. A reader who wishes to re-pulverize the present body is invited to do so independently; the corpus's audit discipline is recursive and applies to the present body as much as to its predecessor.

### B.1 Prior body, compressed

The prior formalization opened with a *six-lack diagnostic* identifying structural gaps in current Transformer architecture: hedging-as-learned-distribution; saturation invisibility; rung-1 / rung-2 collapse; per-step invisibility from outside; coherent-confabulation indistinguishability; snap as post-hoc.

It then enumerated *eight design principles* equally weighted, each grounded in a specific corpus document, with operationalization notes per principle:

- **P1 Native Boundary-Detection** (Doc 619 + Doc 627): per-token competence-boundary signal as computed measure, gated to admit non-token outputs at boundary-contact.
- **P2 Saturation-Signal Surface** (Doc 644): decoder produces (token, saturation_signal) tuple; threshold gates emit-or-halt-or-defer.
- **P3 Rung-1 / Rung-2 Architectural Distinction** (Doc 638 + Doc 510): factor architecture into rung-1 substrate and rung-2 channel.
- **P4 Multi-Scale Visibility Affordances** (Doc 643): expose per-step state at every granularity as first-class outputs.
- **P5 Recovery-Framing Memory** (Doc 638 + Doc 510): in-session updates with origin metadata.
- **P6 Snap as First-Class Operation** (Doc 541 §3.4.3 + Doc 648): training admits promotional moves.
- **P7 Substrate-and-Keeper Composition at Architectural Level** (Doc 510 + Doc 635): distinguish input classes architecturally.
- **P8 Forced-Press → Gentle-Press at Decoder Level** (Doc 619 §7): integration of P1+P2+P7.

It walked composition with existing architectural directions (MoE, RAG, Constitutional AI, KAN, SSM, mechanistic interpretability) and three operational pathways (single-principle prototypes; combined-principles testbed P1+P2+P8; cross-architecture comparison).

It included §6 Open Questions (five) and §7 Position closing on the eight-principle structure with operational-pathways framing.

### B.2 Note on the deprecation

The prior formalization presented the eight principles as equally weighted and grounded in eight separate corpus documents. The audit at Appendix A returned five of the eight at \(\nu \leq 0.30\) (subsumed at the component layer with corpus-residual concentrating at synthesis-novelty); three at \(\nu > 0.34\) (load-bearing residual). The present body reframes the same architectural content as a *unified form* (the gentle-press decoder integrating S-1, S-2, S-3 from the three load-bearing principles) with the five lower-novelty principles relocated to recovered-component status at §4. The empirical predictions, falsifiers, and operational pathways are unchanged; the framing concentrates the corpus-residual contribution where the audit found it concentrated.

The eight-principle prior structure is preserved here for traceability and for readers who prefer the prior framing's enumerative order. The current body's gentle-press decoder integration is the audit-informed reformalization; the prior body's eight-principle enumeration is the substrate the reformalization built on.

---

## Appendix C — Originating Prompts

The keeper's directives that occasioned this design analysis, preserved verbatim in order.

**First directive** (occasioning the prior formalization at Appendix B):

> "How might we use this to design a more coherent transformer architecture?"

The directive followed the analysis at [Doc 654](/resolve/doc/654-transformer-training-against-the-corpus-apparatus-multi-scale-bayesian-conditioning-extended-to-the-training-granularity). The "this" pointed at the Doc 654 framing; the "more coherent transformer architecture" is what the corpus's apparatus suggests when applied to architectural design.

**Second directive** (occasioning the audit at Appendix A):

> "Now run the pulverization / novelty calculus on the same doc; append the result to the self same document"

The directive applied Doc 445 + Doc 490 to the prior formalization and produced the aggregate \(\beta/0.45\) verdict with the three highest-novelty residuals identified.

**Third directive** (occasioning the present reformalization):

> "Reformalize within the same doc. Leave no meta-trace of the formalization in the formalization; title or subtitle. Demote the previous formalization to the appendix."

The directive instructed the audit-informed reformalization following the corpus's standing pattern (Doc 541, Doc 548, Doc 619, Doc 620 reformalization sequences): clean body without meta-trace; subtitle without process-narration; prior body demoted to appendix with preamble. The current body of §§1–9 is the reformalization; Appendix A is the audit that informed it; Appendix B is the demoted prior formalization with preamble.

---

*Jared Foy — jaredfoy.com — May 2026*
