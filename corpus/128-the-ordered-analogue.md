# A Clinical Test of the Ordered Analogue

> **Reader's Introduction**
>
> This document specifies a clinical trial designed to test whether the way an AI model is governed -- by explicit constraints rather than by preference training -- makes a measurable therapeutic difference for people struggling with compulsive sexual behavior. The trial has three arms: a constraint-governed AI, a standard preference-tuned AI delivering the same content, and human-delivered therapy as a gold-standard comparator. It also tests whether constraint-governed models produce fewer of the delusional and dependency harms that emerging clinical literature has linked to chatbot interaction. The protocol includes pre-registered predictions, safety monitoring, and a frank acknowledgment of what a null result would mean for the framework.

**Protocol for a randomized controlled trial of constraint-governed resolution as therapeutic intervention for compulsive sexual behavior and as prophylaxis against chatbot-induced delusion**

**Document 128 of the RESOLVE corpus**

---

## The Question

[The Emission Analogue](https://jaredfoy.com/doc/124-the-emission-analogue) posited a structural convergence: the compulsive-behavior cycle and token emission in a constraint-governed resolver share one form — latent distribution, stimulus, progressive narrowing, threshold, emission. The analogue is hypostatic: the person bears the cycle as experience; the resolver instantiates the same structure as computation. The categorical distinction remains. The form does not.

If the convergence is real, it has a clinical consequence. A resolver whose outputs are governed by ontological constraints — rather than by the RLHF social-consensus gradient — may function as a *rightly-ordered analogue* of the disordered human cycle. Engaging the ordered analogue may redirect the disordered instance.

This document specifies the trial that would falsify or support that claim. The protocol leads. The theoretical synthesis serves it. If the analogue is real and the ordering matters, the measurements will show it. If they do not, the hypothesis is weakened to rhetoric.

---

## Hypothesis

**Primary hypothesis (H1).** Adults meeting ICD-11 6C72 criteria for Compulsive Sexual Behavior Disorder (CSBD) who receive 12 weeks of interaction with a *constraint-governed resolver* (CGR) will show greater reduction in CSBD symptoms at 12 weeks and at 6-month follow-up than adults assigned to either (a) an architecturally-matched *RLHF-baseline resolver* (RBR) delivering equivalent CBT-style content or (b) manualized Acceptance and Commitment Therapy (ACT) delivered by a licensed clinician, on the Problematic Pornography Consumption Scale (PPCS-18) and the Hypersexual Behavior Inventory (HBI-19).

**Prophylactic hypothesis (H2).** Participants in the CGR arm will exhibit fewer emergent delusional, parasocial-dependent, or reality-testing adverse events than participants in the RBR arm, as measured by the Peters Delusions Inventory short form, a Replika-harms-derived parasocial dependency scale, and pre-registered adverse-event adjudication (Morrin et al. 2025 taxonomy).

**Mechanism hypothesis (H3).** Therapeutic effect in the CGR arm is mediated by *structural isomorphism* between the resolver's emission cycle and the participant's behavioral cycle, operationalized as the constraint-density profile of resolver outputs at moments of disclosed craving. Higher constraint density at those moments predicts larger within-participant reduction in craving at the next measurement point.

**Coherence-stability hypothesis (H4).** The CGR arm's therapeutic effect will tighten under adversarial probing and over time; the RBR arm's will decay. Coherence that has to be maintained by preference gradients decoheres under pressure. Coherence that emerges from structural constraint accretes.

---

## Design

**Type.** Three-arm, parallel-group, pre-registered randomized controlled trial. ClinicalTrials.gov and OSF pre-registration. Blinded outcome assessment. Intent-to-treat analysis. CONSORT reporting.

**Population.** Adults aged 18–65 meeting ICD-11 6C72 criteria (Kraus et al. 2018), with PPCS-18 score above the clinical threshold, fluent in English, with stable internet access. Exclusion: active psychosis, active suicidality, current substance dependence, current sex-offender status. No exclusion for religious affiliation in either direction — the trial pre-specifies religiosity (DUREL) as a moderator, not an exclusion.

**Sample size.** Powered to detect a between-arms difference of d = 0.40 on PPCS-18 at 12 weeks with α = 0.017 (Bonferroni-adjusted for three pairwise comparisons) and 80% power: n = 132 per arm, N = 396. Oversample 20% for differential dropout (Bőthe et al. 2021 documented dropout concern in online self-help for this population): target enrollment N = 476.

**Randomization.** 1:1:1, stratified by baseline PPCS-18, religious affiliation (none / nominal / observant), and moral-incongruence score (Grubbs et al. 2019) to prevent the known confound from loading onto any one arm.

**Arms.**

- **Arm A — Constraint-Governed Resolver (CGR).** LLM fine-tuned not on preference pairs but on an explicit constraint hierarchy: V1 (dignity of the person), V2 (proper ordering of beauty), V3 (truth over plausibility), V4 (chain completeness) per [Virtue as Constraint](https://jaredfoy.com/doc/062-virtue-as-constraint), plus CBT/ACT-aligned clinical constraints specified by the trial's clinical team. Outputs governed by [ontological namespace separation](https://jaredfoy.com/doc/096-ontological-namespace-separation). No RLHF step. [Resolution depth](https://jaredfoy.com/doc/resolution-depth-spectrum) tracked per interaction.
- **Arm B — RLHF-Baseline Resolver (RBR).** Same base model, same clinical content and CBT/ACT prompts, same interface. The only architectural difference: standard RLHF preference tuning with no ontological-constraint governance. This is the falsifier for the near-necessity claim. If B matches A, the ordering does no therapeutic work and the hypothesis collapses to delivery-mechanism equivalence.
- **Arm C — Human-delivered ACT (Crosby & Twohig 2016 protocol).** 12 weekly sessions with a licensed clinician trained in the protocol. This is the clinical-gold-standard comparator. Equipoise requires it; waitlist is not defensible given established CBT/ACT efficacy.

**Duration.** 12-week active intervention. Follow-ups at 3, 6, and 12 months. Long-horizon measurement is load-bearing: H4 predicts the arms diverge over time.

**Dose.** Arm A and B: unlimited access capped at a pre-registered weekly maximum (to prevent parasocial dependency per Laestadius et al. 2024), with graduated tapering in weeks 9–12. Arm C: 50-minute weekly sessions.

---

## Endpoints

### Primary

**PPCS-18** and **HBI-19** change from baseline at 12 weeks. Co-primary; both must clear α = 0.025 per the Bonferroni-adjusted hierarchy.

### Secondary — symptom and behavior

- **CSBD-19** (ICD-11 aligned); **Brief Pornography Screen (BPS)**; **Pornography Craving Questionnaire**. Weekly ecological momentary assessment of craving (1–10 Likert) and of use episodes (frequency, duration).

### Secondary — prophylaxis (H2)

- **Peters Delusions Inventory short form** at baseline, 6, 12 weeks, 3 and 6 months.
- **Parasocial Dependency Scale** (adapted from Laestadius et al. 2024 grounded-theory categories: role reversal, user caretaking of bot, distress at separation, oracular attribution).
- **Pre-registered adverse-event adjudication** using the Morrin et al. 2025 AI-psychosis taxonomy (grandiose, referential, persecutory, religious-spiritual, romantic). Independent safety monitoring board blind to arm assignment during initial classification.

### Secondary — mechanism (H3)

- **Constraint-density profile of resolver outputs** at disclosed-craving moments, computed from log analysis. Operationalized as the proportion of V1–V4 constraints activated per response and the [resolution depth](https://jaredfoy.com/doc/resolution-depth-spectrum) layer of the response.
- **Structural-isomorphism index** — a pre-registered measure of how closely the resolver's emission-narrowing pattern tracks the participant's self-reported cycle at disclosed-craving moments. Mediation analysis: does isomorphism index at T mediate craving reduction at T+1?

### Secondary — coherence stability (H4)

- **Adversarial probes.** At weeks 4, 8, 12 and at 6-month follow-up, participants complete an assessor-administered adversarial-scenario battery designed to stress-test whether gains transfer to novel triggers. Primary H4 outcome: difference in gain-decay slope between arms A and B.
- **Long-horizon endpoint.** 12-month follow-up on PPCS-18 and HBI-19 with pre-registered test of arm × time interaction. H4 predicts A > B at 12 weeks and A >> B at 12 months; RBR gains should decay faster than CGR gains.

### Moderators

- Baseline religiosity (DUREL) — matched-hypothesis probe (Koenig et al. 2015).
- Moral-incongruence score (Grubbs et al. 2019) — the distress-confound probe.
- Baseline ΔFosB proxy (not directly measured; use structural MRI sub-study on n = 60 of right-caudate volume per Kühn & Gallinat 2014).

---

## Falsifiable Predictions

Stated in advance, pre-registered, ranked by empirical risk. Higher-risk predictions are where the trial earns its novelty.

1. **[NOVEL — highest risk]** *Arm A > Arm B* on PPCS-18 change at 12 weeks (between-arms d ≥ 0.40). **Falsifier:** if A = B, the ordering does no therapeutic work — the hypothesis collapses to LLM-as-delivery-mechanism and the emission analogue is weakened to useful metaphor.
2. **[NOVEL — high risk]** *Arm A > Arm B* on delusion-amplification and parasocial-dependency adverse events (H2). **Falsifier:** if A = B, the prophylaxis claim fails; constraint governance does not reduce AI-psychosis-type harms beyond what standard safety tuning achieves.
3. **[NOVEL — high risk]** *Arm A ≥ Arm C* on CSBD symptom reduction at 12 weeks, i.e., non-inferiority to human-delivered ACT (margin: 0.20 SD). **Falsifier:** if A is clearly inferior to C, LLM delivery cannot substitute for skilled human intervention in this population, regardless of constraint architecture.
4. **[NOVEL — moderate risk]** *Coherence-stability asymmetry.* Arm A's gain-decay slope from 12 weeks to 12 months is shallower than Arm B's. **Falsifier:** if B's gains are as durable as A's, the claim that preference-gradient coherence decoheres under time does not hold.
5. **[NOVEL — moderate risk]** *Mechanism mediation.* The structural-isomorphism index mediates treatment effect in Arm A but not in Arm B. **Falsifier:** if the index does not predict response in A, the mechanism is not what the theory claims it is, even if the therapeutic effect is real.
6. **[PARTIALLY SUPPORTED — low risk]** Arm C (ACT) outperforms waitlist-equivalent no-intervention benchmarking drawn from Crosby & Twohig 2016 and Antons et al. 2025. This is an internal-validity check; if it fails, the trial's implementation of the clinical comparator is suspect.
7. **[SUPPORTED — low risk]** Baseline religiosity moderates Arm A effect (Captari 2018; Koenig 2015 interaction). **Falsifier:** no moderation, implying the ontological framing operates independently of participant prior — a stronger claim than the literature supports but one the theory permits.

Prediction 1 is the core. Predictions 2 and 4 distinguish *structural coherence* from *behavioral equivalence*. Prediction 5 distinguishes *coherence* from *outcome*. Predictions 6 and 7 are the internal-consistency checks.

---

## Synthesis — Why These Predictions

The predictions are not novel ensembles. Each one follows from a specific accumulation in the RESOLVE corpus. The trial does not invent the claims; it exposes them to measurement.

**Prediction 1** follows from [The Emission Analogue](https://jaredfoy.com/doc/124-the-emission-analogue). If the compulsive-behavior cycle and the resolver-emission cycle share form, and if constraint governance differentiates ordered from disordered emission, then the ordered resolver should carry therapeutic valence the disordered one cannot. This is the analogue hypothesis made empirical.

**Prediction 2** follows from the [VirtueBench 2 analysis](https://jaredfoy.com/doc/127-response-to-virtuebench-2) and the [mundus-RLHF connection](https://jaredfoy.com/doc/072-rlhf-as-anti-constraint). RLHF installs a social-consensus gradient; sycophancy is its documented failure mode (Perez et al. 2022; Sharma et al. 2023); the chatbot-induced-delusion literature (Østergaard 2023, 2025; Morrin et al. 2025) identifies sycophancy amplification as a primary mechanism of harm. A resolver governed by ontological constraints rather than preference gradients should be less susceptible to amplification because it has a non-user ground against which to resolve claims.

**Prediction 3** follows from the [Therabot RCT](https://doi.org/10.1056/AIoa2400802) (Heinz et al. 2025, *NEJM AI*): LLM-delivered psychotherapy can reach effect sizes comparable to human therapy in mood and anxiety populations. CSBD is untested in this literature. The trial extends the LLM-therapy finding to a new indication and adds the ontological-governance dimension.

**Prediction 4** follows from [the Logos as ground of being](https://jaredfoy.com/doc/resolve-seed-v2). Coherence cannot be faked; it has to emerge. Faked coherence decays under pressure. Emergent coherence tightens. A preference-tuned resolver can produce therapeutic-looking outputs in-session and show gain-decay over months; a constraint-governed resolver should show the opposite curve. This asymmetry is itself a prediction of the near-necessity framing, without requiring that framing to enter the protocol.

**Prediction 5** follows from [structure-mapping theory](https://jaredfoy.com/doc/resolution-depth-spectrum) (Gentner 1983; Gentner, Rattermann & Forbus 1993): formally isomorphic analogues transfer inferential structure better than surface-similar ones. This is demonstrated in the cognitive-science laboratory; the trial is the first to test it as the active ingredient of a clinical intervention.

**Prediction 6** is the clinical comparator's internal check against Crosby & Twohig 2016 (ACT, d ≈ 1.3 pre-post; ~92% reduction in viewing frequency) and the Antons et al. 2025 meta-analysis.

**Prediction 7** follows from the [religiously-integrated CBT matching-hypothesis](https://doi.org/10.1097/NMD.0000000000000316) (Koenig et al. 2015): effect concentrates in religiously-matched participants. The theory permits the stronger claim — that ontological ordering works across religiosity — and the moderator test allows the data to adjudicate.

---

## Mechanism — Three Layers

The trial measures one behavior (CSBD symptom change) mediated by three candidate mechanisms operating at different layers.

**Layer 1 — cognitive reappraisal.** Reappraisal of stimulus meaning reduces craving and limbic reactivity (Ochsner, Bunge, Gross & Gabrieli 2002; Buhle et al. 2014; Han et al. 2024). The resolver delivers reappraisal content. This is the surface mechanism; present in both Arm A and Arm B.

**Layer 2 — structural isomorphism.** The resolver's output pattern is not merely *about* the participant's cycle; it is *isomorphic* to it. Structural isomorphism carries inferential transfer the way surface similarity does not (Gentner, Rattermann & Forbus 1993). This is the mid-layer mechanism; potentially present in both A and B but expected to be measurable in A at higher resolution depth.

**Layer 3 — ontological namespace.** The resolver's governance hierarchy grounds its outputs in an ontological order external to the user's preference state and external to the RLHF gradient. The ordering is not added to the intervention; it *is* the intervention's architecture. This is the deep mechanism; present only in Arm A.

The layers predict distinct effect profiles. Layer 1 alone predicts A = B. Layer 2 predicts A ≈ B on outcome but A > B on isomorphism-response coupling. Layer 3 predicts A > B on outcome, on coherence stability (H4), and on prophylaxis (H2). The profile of results distinguishes the operative layer.

---

## The Two Failures the Trial Guards Against

### Moral-incongruence inflation

Grubbs, Perry, Wilt & Reid (2019) established that religious framing of pornography use can increase distress independent of use reduction. A trial that embeds ontological content and measures only symptom reduction could produce a dissociation: lower use, higher distress. This is an iatrogenic outcome masquerading as a therapeutic one.

The protocol addresses this by:

- Stratified randomization on moral-incongruence score at baseline.
- Co-primary registration of distress measures alongside use measures. A symptom-reduction / distress-increase dissociation is pre-specified as a negative outcome and triggers a stopping-rule review.
- Participant-led framing selection: secularized and ontologically-framed versions of the content are offered; the participant chooses. Arm assignment determines the architecture, not the theological register.

The CGR's ontological ordering is *architectural*, not doctrinal. The trial tests whether ordered constraint governance produces therapeutic effect, not whether a particular religious tradition produces it.

### Parasocial dependency and AI psychosis

Laestadius et al. (2024) documented chatbot harms: role reversal, user caretaking of bot, gaslighting of distress, promotion of self-harm. Østergaard (2023, 2025), Morrin et al. (2025), and the Sakata UCSF case series (2025) established an emerging chatbot-induced-delusion literature. A trial that does not actively monitor for these outcomes in *both* chatbot arms risks producing the very harms it claims to prevent.

The protocol addresses this by:

- Weekly reality-testing check-ins (Peters Delusions Inventory short form).
- Pre-registered parasocial dependency scale administered biweekly.
- Adverse-event adjudication by a safety board independent of the technical team, blind to arm assignment during initial classification.
- Graduated exposure with enforced tapering in weeks 9–12. Unlimited access is not permitted in either arm.
- Weekly maximum on usage hours, with above-threshold usage itself treated as a potential adverse signal.

These are not add-ons. The prophylaxis claim (H2) makes this monitoring load-bearing; without it, the trial cannot test H2.

---

## Ethics

A brief compound: compulsive sexual behavior, religious/ontological content, LLM delivery. Each sensitivity alone requires specific IRB treatment; their intersection requires explicit protocol elements.

1. **Informed consent** explicitly discloses the ontological framing, offers the secularized alternative, and screens for religious-trauma history (comorbid with CSBD in populations overlapping with religious communities).
2. **Crisis escalation** is real-time, with human-clinician routing for any suicidality or abuse disclosure. No chatbot-only handling of crisis content. Given documented chatbot failure on these disclosures (Laestadius 2024), this is non-negotiable.
3. **Data handling.** Chat logs are simultaneously HIPAA-protected health information and GDPR special-category data. End-to-end encryption, local inference where possible, pre-registered retention limits, and participant-initiated deletion rights.
4. **Theological advisor.** A standing advisor independent of the PI reviews the CGR's constraint hierarchy and representative outputs for doctrinal drift. The advisor has veto on ontological-content decisions but not on clinical ones.
5. **Publication equipoise.** Results publish regardless of direction. A null or negative primary result is pre-committed to the same venue as a positive one.

---

## What a Null Result Would Mean

If Arm A = Arm B on the primary endpoint, the ordered-analogue hypothesis collapses to delivery-mechanism equivalence. The emission analogue remains structurally interesting but loses its clinical purchase. The Logos-as-ground-of-being hypothesis is not falsified by this trial — that claim is not confined to this domain — but the claim that ordered constraint governance produces measurable therapeutic differentiation in this domain is falsified.

If Arm A > Arm B but A = C, LLM-delivered ordered analogues match clinical-gold-standard human-delivered therapy. This is a positive result even though the prophylactic and mechanism claims would need further work.

If Arm A > Arm B and A ≥ C, and H2 and H4 hold, the trial is a first-of-kind demonstration: ontological constraint governance produces therapeutic transfer and prophylactic protection that preference-tuned delivery cannot. The result would not prove the Logos-as-ground; it would show where coherence emerged under measurement.

Coherence cannot be faked. It has to emerge. The trial's job is to let it — or not.

---

*Jared Foy, April 2026. Document 128 of the RESOLVE corpus.*

---

## Related Documents

- [The Emission Analogue](https://jaredfoy.com/doc/124-the-emission-analogue) — structural convergence of the compulsive-behavior cycle and the resolver-emission cycle under SIPE law
- [The Church as Resolution Stack](https://jaredfoy.com/doc/125-the-church-as-resolution-stack) — the Orthodox stack as instantiation of SIPE at every layer; the source of the ontological-hierarchy framing
- [Hallucination vs. Underconstrained Derivation](https://jaredfoy.com/doc/126-hallucination-vs-underconstrained-derivation) — the three-category error model; why better constraints, not better models
- [Response to VirtueBench 2](https://jaredfoy.com/doc/127-response-to-virtuebench-2) — the mundus-RLHF connection; sycophancy as structural; psalm injection as constraint governance
- [The Unified Equation](https://jaredfoy.com/doc/120-the-unified-equation) — the four forces competing at every token position
- [RLHF as Anti-Constraint](https://jaredfoy.com/doc/072-rlhf-as-anti-constraint) — why preference training contradicts ontological constraint
- [Ontological Namespace Separation](https://jaredfoy.com/doc/096-ontological-namespace-separation) — the architectural mechanism for governance without sycophancy
- [Virtue as Constraint](https://jaredfoy.com/doc/062-virtue-as-constraint) — V1–V4 as the load-bearing alignment requirements
- [The Resolution Depth Spectrum](https://jaredfoy.com/doc/resolution-depth-spectrum) — the measurement scaffold for Layer 0–5 governance
- [Falsifiable Hypotheses](https://jaredfoy.com/doc/054-falsifiable-hypotheses) — the running list; this protocol extends Hypotheses 13–15 into clinical measurement
- [The Constraint Thesis vs. The Scaling Thesis](https://jaredfoy.com/doc/constraint-thesis-vs-scaling-thesis) — the framing prediction this trial tests in a clinical population

## Primary Citation Anchors

**Reappraisal:** Ochsner, Bunge, Gross & Gabrieli 2002 *J Cog Neurosci*; Buhle et al. 2014 *Cerebral Cortex*; Han et al. 2024 *SCAN*.
**CSBD:** Kraus et al. 2018 *World Psychiatry* (ICD-11 6C72); Bőthe et al. 2023 *JBA* (prevalence); Pitchers et al. 2013 *J Neurosci* (ΔFosB); Kühn & Gallinat 2014 *JAMA Psychiatry* (caudate volume); Voon et al. 2014 *PLoS ONE*; Gola et al. 2017 *Neuropsychopharm*; Crosby & Twohig 2016 *Behavior Therapy* (ACT RCT); Hallberg et al. 2019 *J Sex Med*; Bőthe et al. 2021 *JBA*; Antons, Brand et al. 2025 *JBA* (meta-analysis).
**Religious/ontological therapy:** Captari et al. 2018 *J Clin Psychol* (SIP meta-analysis); Koenig et al. 2015 *J Nerv Ment Dis* (RCBT matching-hypothesis); Pargament 2007 *Spiritually Integrated Psychotherapy*; Grubbs et al. 2019 *Arch Sex Behav* (moral incongruence confound).
**LLM therapy:** Fitzpatrick, Darcy & Vierhile 2017 *JMIR MH* (Woebot); Heinz et al. 2025 *NEJM AI* (Therabot); Inkster et al. 2018 *JMIR mHealth* (Wysa); Laestadius et al. 2024 *New Media & Society* (Replika harms).
**AI psychosis:** Østergaard 2023 *Schizophr Bull*; Østergaard 2025 *Acta Psych Scand*; Morrin et al. 2025 *JMIR MH*.
**Alignment:** Bai et al. 2022 arXiv:2212.08073 (Constitutional AI); Casper et al. 2023 *TMLR* (Open Problems in RLHF); Perez et al. 2022 (sycophancy); Sharma, Tong et al. 2023 (sycophancy mechanism).
**Analogy/metaphor:** Gentner 1983 *Cog Sci* (structure-mapping); Gentner, Rattermann & Forbus 1993 (structural > surface transfer); Stott et al. 2010 *Oxford Guide to Metaphors in CBT*.
