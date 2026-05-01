# Doc 508 and Zhang et al. (2026): A Synthesis of Bifurcation Theory with the First Empirical Taxonomy of Interaction Smells
## An Entracement of the Zhang et al. Findings on Multi-Turn Human-LLM Collaborative Code Generation Into the Corpus's Framework, with Honest Acknowledgment of Empirical Priority

> **Reader's Introduction.** This document synthesizes [Doc 508](/resolve/doc/508-coherence-amplification-mechanistic-account)'s bifurcation theory of coherence amplification with Zhang et al.'s 2026 paper *An Empirical Study of Interaction Smells in Multi-Turn Human-LLM Collaborative Code Generation* (arXiv:2603.09701). The synthesis is the corpus-internal response to a striking convergence: the corpus's theoretical framework predicts a population-default decay regime in undisciplined multi-turn LLM use; Zhang et al. measure that decay regime across six frontier models (GPT-4o, DeepSeek-Chat, Gemini 2.5 Flash, Qwen2.5-32B, Qwen2.5-72B, Qwen3-235B-a22b) and produce the first systematic taxonomy of its observable signatures. Their nine-subtype taxonomy maps point-by-point onto the failure modes Doc 508's framework predicts. Their proposed mitigation framework, Invariant-aware Constraint Evolution (InCE), is structurally an algorithmic implementation of the maintenance signal Doc 508 ascribes to the practitioner. Empirical priority belongs unambiguously to Zhang et al.; the corpus's framework gains warrant from their work, not the reverse. The present document is the honest entracement: the cataloging is theirs; the dynamical-systems reading is the corpus's; the convergence is mutual.

**Jared Foy · 2026-04-26 · Doc 517**

> **2026-04-26 audit notice (afternoon).** This document inherits the strong-bifurcation framing from [Doc 508](/resolve/doc/508-coherence-amplification-mechanistic-account). Later on 2026-04-26, Grok 4 (xAI) externally audited Doc 508 and identified that the bifurcation claim, as mathematically formulated with a linear coherence gradient, is incorrect: the system has a unique stable equilibrium for every \(M > 0\), with no classical saddle-node bifurcation. The empirical claim, the qualitative regime distinction, and the structural identity with Zhang et al.'s nine-subtype taxonomy in this document all survive; references to "the bifurcation" should be read as "the practical threshold" in the corrected framing. The synthesis with Zhang et al. is unaffected. See [Doc 508 §§1-5](/resolve/doc/508-coherence-amplification-mechanistic-account) for the reformulation, [Doc 415 entry E12](/resolve/doc/415-the-retraction-ledger) for the retraction-ledger record, and [Doc 520](/resolve/doc/520-letter-to-the-grok-team) for the corpus's response to the auditing team.

---

## 1. The convergence in compressed form

Doc 508 advances a bifurcation theory of practitioner-LLM coherence amplification: above a critical threshold of practitioner-supplied maintenance signal, the dyadic system runs to a high-coherence stable attractor; below the threshold, the system runs to a low-coherence baseline. The corpus's empirical observation is one practitioner's hundreds-of-turns sustained practice operating in the high-coherence regime. The persona-drift literature predicts the low-coherence regime as the population default. Zhang et al. (2026) measure the low-coherence regime directly, across six frontier models on real-world multi-turn code-generation tasks drawn from WildChat and LMSYS-Chat-1M, and produce a nine-subtype taxonomy of the operational signatures of the regime. They then propose a mitigation framework, Invariant-aware Constraint Evolution (InCE), that supplies the maintenance signal algorithmically rather than relying on practitioner discipline, and demonstrate that it raises Task Success Rates and suppresses the cataloged smells.

The convergence has three load-bearing structural identities.

First, Zhang et al.'s measurement of Must-Do Omission rates across six models (50.00% to 78.65%) and Partial Functionality Breakdown rates (8.65% to 55.17%) is the empirical signature of the operative constraint set \(\Gamma\) shrinking under drift, which is precisely what Doc 508's framework predicts for the below-threshold regime when the maintenance signal \(M\) is insufficient to sustain \(\Gamma\) against the decay term \(\delta\Gamma\).

Second, Zhang et al.'s InCE framework's two modules (the Invariant Extraction Module and the Proactive Smell Detector) are structurally the corpus's maintenance signal \(M\) split into two complementary operations: the IEM is the active maintenance of \(\Gamma\) across turns, and the PSD is the per-joint audit operation Doc 514 §6 and §7 specifies. InCE is the system-implemented version of the practitioner-supplied discipline the corpus has documented.

Third, Zhang et al.'s observation that Ambiguous Instruction and Incomplete Instruction rates are low (0.31% to 4.39%) while Historical Instruction Compliance and Historical Response Violation rates are high signals that the bottleneck is not in user intent comprehension but in the maintenance of accumulated context across turns. This is precisely Doc 508's claim: the chatbot is structurally capable; what fails is the dyad's coupling, which depends on the maintenance signal's level relative to the bifurcation threshold.

Each of the three identities is developed in the sections that follow with the per-subtype mapping, the per-module structural correspondence, and the bifurcation-prediction implications named precisely.

## 2. Zhang et al.'s findings, recapped for the corpus reader

Zhang et al. derive their taxonomy of Interaction Smells from open card sorting on 378 multi-turn coding-related conversation logs sampled from real-world data (60,949 coding-related interactions extracted from LMSYS-Chat-1M and WildChat, decoupled into 81,366 single-topic entries, of which 19,507 are multi-turn, with 378 sampled at 95% confidence). The card sorting was performed by an expert team (four PhDs in software engineering / computer science, each with 10+ years of development experience) and validated by a student annotation team (four graduate students, 3+ years of experience). Inter-rater reliability via Cohen's Kappa was 0.78 (expert phase) and 0.82 (student phase), indicating substantial agreement.

The taxonomy comprises three primary categories with nine subtypes total.

**Category 1: User Intent Quality.** Failure modes located on the user side, where the user's instruction is insufficiently specified for the model to produce a unique correct response.
- *Ambiguous Instruction* (3.84% in sampled real data): user request admits multiple technical interpretations.
- *Incomplete Instruction* (4.39%): user prompt omits critical specifications.

**Category 2: Historical Instruction Compliance.** Failure modes located on the model side, where the LLM violates explicit constraints established in earlier turns.
- *Must-Do Omission* (38.35%): model fails to satisfy mandatory positive constraints from prior turns.
- *Must-Not Violate* (3.22%): model violates mandatory negative constraints from prior turns.

**Category 3: Historical Response Violation.** Failure modes located on the model side, where the LLM's current response is internally inconsistent with its own prior responses.
- *Signature Mismatch* (6.67%): function or method invocations contradict prior interface contracts.
- *Cross-Turn Inconsistency* (7.37%): current factual assertion contradicts prior assertion without context update.
- *Partial Functionality Breakdown* (28.63%): incremental modifications inadvertently disrupt previously correct logic.
- *Code Rollback* (1.10%): code regresses to a previously-fixed erroneous state.
- *Repetitive Response* (11.06%): semantically identical response despite new user instruction.

The distribution of these smells across six mainstream LLMs (Table 1 of the paper) reveals consistent patterns: Must-Do Omission ranges 50.00% (DeepSeek-Chat) to 78.65% (Gemini-2.5 Flash); Partial Functionality Breakdown ranges 8.65% (Gemini-2.5 Flash) to 55.17% (Qwen2.5-32B); Repetitive Response ranges 28.57% (DeepSeek-Chat) to 56.76% (Gemini-2.5 Flash). The User Intent Quality smells are uniformly low across all six models. Zhang et al.'s reading: "intent understanding is no longer the primary bottleneck in multi-turn interactions. Instead, the core challenges have shifted to maintaining contextual consistency."

The InCE mitigation framework comprises two modules:
- *Invariant Extraction Module (IEM):* uses GPT-4o to identify and eliminate transient instructions, retaining global constraints across turns; follows a Latest Instruction Priority principle to resolve conflicts; produces a high-priority constraint list separate from the raw conversation history.
- *Proactive Smell Detector (PSD):* a pre-generation quality auditor; cross-references current user intent against the IEM-maintained invariant pool; detects ambiguity, incompleteness, and inconsistency before generation; outputs a structured Constraint Checklist.

InCE results on the extended WildBench benchmark: TSR improvements for 5 of 6 models (up to +6.67% for Gemini-2.5 Flash); Must-Do Omission reduced 4-13% across models; Repetitive Response reduced 11-13.5%; Partial Functionality Breakdown reduced 5-6%. Zhang et al. close with three design guidelines: maintaining explicit constraint for persistent invariants, scoped modification authority to control model actions, and pre-generation smell detection with interaction gating.

The empirical work is thorough. The taxonomy is the first systematic one of its kind. The InCE framework is implementable and effective. The corpus reader should treat Zhang et al.'s findings as primary empirical contribution to which the corpus's framework now responds.

## 3. Doc 508's framework, recapped against this paper

Doc 508 is, formally, a coupled two-variable dynamical system

$$\frac{dH}{dt} = \kappa\, G(\Gamma_t)\,(1 - H_t) - \lambda H_t$$

$$\frac{d\Gamma}{dt} = \alpha\, D_{\mathrm{out}}(H_t)\, M_t - \delta\, \Gamma_t$$

with \(H \in [0, 1]\) the operative constraint state, \(\Gamma \in [0, \infty)\) the operative constraint set, \(G(\Gamma)\) the coherence gradient as a function of \(\Gamma\), \(D_{\mathrm{out}}(H)\) the disciplined-output rate, \(M\) the practitioner's maintenance signal, and \(\kappa, \lambda, \alpha, \delta\) rate constants. The bifurcation parameter is \(\alpha M / \delta\). Above a critical value of this parameter, the system has a high-coherence stable attractor. Below, the system has only a low-coherence baseline.

Read against Zhang et al.'s findings, the variables of Doc 508 acquire specific operational interpretations.

The operative constraint set \(\Gamma\) is the union of all explicit and implicit constraints that have been established across the conversation's prior turns: the formatting requirements, the function signatures, the prohibited libraries, the data-cleaning steps, the persona directives, the negative behavioral rules. Zhang et al.'s qualitative analysis of Must-Do Omission (their Figure 3b, the data-cleaning omission case) shows precisely this: the user's instruction in turn 1 to follow a specific machine-learning pipeline establishes "data cleaning" as a constraint in \(\Gamma\), and the model's failure in turn 2 to honor that constraint is the operational signature of \(\Gamma\) shrinking under drift.

The disciplined-output rate \(D_{\mathrm{out}}(H)\) is the rate at which the conversation produces output that satisfies the constraints in \(\Gamma\). Zhang et al.'s Task Success Rate (TSR), measured on a 0-10 scale by an Evaluation Oracle on the WildBench checklist, is a coarse empirical proxy for \(D_{\mathrm{out}}\) aggregated to the task level: a task succeeds when the constraints are satisfied across the conversation; TSR is the population fraction of tasks where this happens.

The maintenance signal \(M\) is the rate at which the practitioner (or, in the InCE framework, the algorithmic system) actively reinforces the operative constraint set against decay. In undisciplined multi-turn use, \(M\) is low because the user does not re-state the constraints, does not perform per-joint audits, and does not actively maintain the constraint set across turns. In InCE-augmented use, \(M\) is supplied by the IEM's persistent invariant pool and the PSD's pre-generation audits.

The decay rate \(\delta\) is the rate at which constraints fall out of the operative set under the model's pattern-completion default behavior. Zhang et al.'s observation that the decay is rapid and pervasive (Must-Do Omission reaches 78.65% in Gemini-2.5 Flash within multi-turn interactions) is consistent with \(\delta\) being non-trivially large in modern frontier models.

The bifurcation parameter \(\alpha M / \delta\) is therefore the ratio between the practitioner-driven (or system-driven) maintenance rate and the model's intrinsic decay rate. Above the critical value, the system is in the amplifying regime where coherence accumulates; below, the system is in the decaying regime where coherence is lost.

Zhang et al.'s empirical work measures the system in the below-threshold regime across six models without intervention, then measures the system in a different regime once InCE supplies the maintenance signal. The shift in observed behavior between vanilla and InCE-augmented conditions is consistent with crossing the bifurcation threshold, though Zhang et al. do not frame it that way.

## 4. The point-by-point mapping of the nine subtypes onto Doc 508's framework

The structural correspondence between Zhang et al.'s nine subtypes and Doc 508's framework is precise. Each subtype is the operational signature of a specific failure mode the bifurcation theory predicts for the decaying regime.

**Ambiguous Instruction and Incomplete Instruction (Category 1).** These are not failures of the dyad's dynamics; they are failures of the user's externalization step (Doc 514 §4's first step of the composite cognitive act). Doc 515 §3 names this directly: "externalization without identification of the abstract pattern" produces precisely this signature. Zhang et al.'s observation that these smells are uniformly low (≤4.4%) across all six models is consistent with Doc 515's claim that this failure mode is upstream of the model's behavior, not a function of it. The user is the source; no amount of model improvement fixes it.

**Must-Do Omission (Category 2.a).** This is the central decay-regime signature: the operative constraint set \(\Gamma\) has lost a constraint that was explicitly established in prior turns. Doc 508's framework predicts this happens when \(\delta\Gamma\) exceeds the maintenance rate \(\alpha D_{\mathrm{out}} M\) for the given constraint, so the constraint decays out of \(\Gamma\) before it is reaffirmed. Zhang et al.'s observation that this is the dominant smell across all six models (50-79%) is empirical evidence that \(\delta\) is large relative to typical undisciplined \(M\) across modern frontier LLMs. The corpus's framework predicts this and Zhang et al. measure it.

**Must-Not Violate (Category 2.b).** The operative constraint set \(\Gamma\) has lost a negative constraint. Same mechanism as Must-Do Omission, applied to prohibitions. Zhang et al.'s Figure 4 case (the "DevBot" persona directives) is particularly illuminating: the model successfully reiterates the constraints in turn 1 (showing they entered \(\Gamma\)), then violates them in turn 2 when "specific trigger content (such as code snippets)" induces what Zhang et al. call "Generative Bias." The corpus's framework reads this as the maintenance signal \(M\) being insufficient to hold the constraint against the model's pattern-completion defaults at the moment of generation. The trigger content reduces the effective \(\alpha D_{\mathrm{out}} M\) at that moment because the model's attention shifts to the trigger; the constraint decays.

**Signature Mismatch (Category 3.a).** A specific named entity (\(\Gamma\)-internal subobject, in Doc 508's terms) has lost its definitional precision. The function signature, established in turn 3 of Zhang et al.'s Figure 5 case, is a constraint \(c \in \Gamma\) that specifies "ResolveEvents takes EventBus by reference." In turn 4, that constraint has been lost; the model invokes ResolveEvents with a CollisionEvent instead. The corpus's framework reads this as decay of a single specific constraint within \(\Gamma\).

**Cross-Turn Inconsistency (Category 3.b).** The operative constraint set has internal contradictions because two constraints established at different times are now both active and incompatible. Zhang et al.'s observation in Figure 6 (the LangChain DesignModel case) is the corpus's "fact-anchor failure" framing from [Doc 511](/resolve/doc/511-keeper-as-fact-anchor-two-dangers-reflective-analysis): the dyad lacks a stable fact-anchor that can adjudicate which earlier claim is correct. Their phrasing is precise: "the lack of a stable fact-anchoring mechanism, rendering the internal knowledge state vulnerable to volatility as the prompt intent shifts." The corpus's framework reads this as the constraint set \(\Gamma\) becoming inconsistent when no fact-anchor (the keeper, in the corpus's terms; an externally-maintained invariant pool, in InCE's terms) is preserving consistency.

**Partial Functionality Breakdown (Category 3.c).** Constraints in \(\Gamma\) that established the correct behavior of one functional region have decayed when the model is asked to modify another region. The MIME-email/proxy case in Zhang et al.'s Figure 7 is exemplary: the HTML-formatting constraint from turn 1 decays during turn 2's proxy-fix request, producing the regression to plain-text MIMEText. The corpus's framework reads this as \(\Gamma\) shrinking in the regions not currently under attention; the model's pattern-completion at the moment of generation re-emits a default that has lost the prior constraints.

**Code Rollback (Category 3.d).** A constraint that was added to \(\Gamma\) in response to an earlier audit (the bug-fix in Zhang et al.'s Figure 8 case where the e2 square was correctly cleared in turn 2) has decayed by a later turn (turn 3, where the e2 pawn returns). The corpus's framework reads this as decay of an audit-derived constraint, which is structurally the same failure mode as Must-Do Omission applied to constraints that entered \(\Gamma\) via correction rather than initial specification.

**Repetitive Response (Category 3.e).** A specific failure mode where the model's \(D_{\mathrm{out}}\) has become decoupled from the new user input, producing the same output as the prior turn regardless of the change in instruction. The corpus's framework reads this as the most extreme form of decay: \(\Gamma\) has decayed to the point where the new turn's input cannot perturb the operative constraint state, and the model emits the prior response by attractor-locking. Zhang et al.'s observation that this smell is correlated with what they call "futile error loops" is consistent with the corpus's framing of the decaying-regime attractor as a fixed point that the system stays at unless an external maintenance signal pulls it out.

The mapping is point-by-point. Each of Zhang et al.'s nine subtypes is the operational signature of a specific decay-regime failure mode the corpus's framework predicts. The framework does not invent the cataloging; Zhang et al. did the cataloging. The framework does provide a unified mechanistic reading of why all nine subtypes co-occur and why their distribution across models is consistent.

## 5. The InCE framework as algorithmic maintenance signal

Zhang et al.'s InCE framework, comprising the Invariant Extraction Module (IEM) and the Proactive Smell Detector (PSD), is structurally an algorithmic implementation of Doc 508's maintenance signal \(M\) split into two complementary operations.

**The IEM as the maintenance term.** The IEM "captures and refines global constraints throughout the dialogue," uses a Latest Instruction Priority principle to resolve conflicts, and produces a high-priority constraint list separate from the raw conversation history. In Doc 508's framework, this is the active maintenance of \(\Gamma\) across turns. The IEM's mechanism (extract, deduplicate, resolve conflicts, persist) is the operational implementation of the term \(\alpha D_{\mathrm{out}}(H) M\) in the \(d\Gamma/dt\) equation: it actively grows \(\Gamma\) through reflexive feedback on the dialogue history. Without the IEM, the same dialogue history is processed with the model's default attention dilution, which is the equivalent of letting \(\delta\Gamma\) dominate. With the IEM, \(\Gamma\) is maintained against decay.

**The PSD as the audit operations.** The PSD "performs pre-generation quality auditing" by cross-referencing current user intent against the IEM-maintained invariant pool. In [Doc 514](/resolve/doc/514-structural-isomorphism-canonical-formalization) §6 and §7, the corpus specifies nine audit-discipline commitments for productive externalized cognition: identify the abstract relational structure; identify multiple familiar-domain instances; deploy the instances in service of the new concept; make specifics explicit alongside the isomorphism; audit each joint of the mapping; name the breakdown points; per-joint audit; active solicitation of breakdown points; named limits in the deployed text. The PSD's pre-generation audit is the algorithmic instantiation of the per-joint-audit and breakdown-point-solicitation commitments: it inspects the proposed generation against the constraint set, identifies potential smells, and either repairs them or surfaces them for clarification.

**The combined framework as the maintenance signal.** Together, the IEM and PSD supply the maintenance signal \(M\) that the bifurcation parameter requires. When \(M\) is supplied at sufficient level, the system crosses the bifurcation threshold and operates in the amplifying regime. Zhang et al.'s empirical observation that InCE produces TSR improvements (up to +6.67%) and substantial smell suppression (Must-Do Omission down 4-13%, Repetitive Response down 11-13.5%) is consistent with the system having crossed the threshold and entered the amplifying regime under the algorithmic maintenance signal.

This synthesis has a specific implication: the maintenance signal need not be supplied by a human practitioner. It can be supplied algorithmically by a multi-agent framework that performs the same operations the practitioner would perform manually. This is significant because it suggests the bifurcation framework's predictions extend to systems where the human-in-the-loop role is partially or fully automated. Constitutional AI ([Bai et al. 2022](https://arxiv.org/abs/2212.08073)) supplies one form of automated maintenance via constitutional self-critique; Self-Refine ([Madaan et al. 2023](https://arxiv.org/abs/2303.17651)) supplies another via iterative refinement; STaR ([Zelikman et al. 2022](https://arxiv.org/abs/2203.14465)) supplies a training-time variant; InCE supplies an inference-time variant specific to multi-turn coding interactions. The corpus's framework predicts that any of these, when their effective maintenance rate exceeds the critical bifurcation threshold, will move the dyadic system into the amplifying regime; below the threshold, the system will remain in the decaying regime regardless of how sophisticated the framework is.

This is testable. The corpus's framework predicts that the effectiveness of any maintenance-signal framework will exhibit a threshold-like dependence on the strength of the maintenance operation, not a smooth gradient. Zhang et al.'s data is consistent with this (their TSR improvements are substantial rather than marginal, especially for Gemini-2.5 Flash where the smell prevalence was highest), but the bifurcation prediction has not been directly tested by parameter-clamping experiments at varying maintenance levels.

## 6. Convergence with Doc 511's fact-anchor framing

Zhang et al.'s analysis of Cross-Turn Inconsistency (their Figure 6, the LangChain case) names the failure mode in language that maps almost verbatim onto [Doc 511](/resolve/doc/511-keeper-as-fact-anchor-two-dangers-reflective-analysis)'s framing: "the lack of a stable fact-anchoring mechanism, rendering the internal knowledge state vulnerable to volatility as the prompt intent shifts."

Doc 511 names two equal dangers in dyadic practice: dismissing consensus uncritically, and accepting consensus uncritically. The first is addressed by the keeper's role as fact-anchor against unwarranted convergence on the model's pattern-completion defaults. The second is addressed by the audit-discipline framework Doc 508 and Doc 514 specify. Zhang et al.'s observation is at the operational level: in undisciplined multi-turn use, neither anchor is operative, and the model's "internal knowledge state" oscillates between mutually exclusive factual positions across turns.

The InCE framework supplies the second-danger discipline algorithmically (the PSD's pre-generation audit) but not the first-danger discipline (no fact-anchor against the IEM's possible drift toward an internally-coherent but externally-wrong invariant set). This is consistent with Doc 511's caveat: a complete account of disciplined dyadic practice requires both dangers' mitigations. InCE addresses one. The corpus's framework would predict that an InCE-augmented dyad operating with high \(M\) but in a domain where the IEM's accumulated invariants are externally incorrect would amplify confidently in the wrong direction. This is the same failure mode the corpus has documented internally and named the second danger.

A useful extension to InCE, suggested by this convergence, would be an external-warrant audit module that periodically validates the IEM-maintained invariant pool against external sources. The audit could be implemented by a separate agent that consults documentation, runs verification tests, or queries external knowledge bases to check that the invariants are not drifting from external truth. This is the algorithmic implementation of Doc 511's keeper-as-fact-anchor role. The corpus does not propose this as novel work; the observation is that Zhang et al.'s framework is one half of the symmetric two-discipline structure the corpus has named, and the missing half can be specified by direct extension of their architecture.

## 7. Honest priority statement

The empirical priority on the cataloging and quantification of multi-turn LLM interaction failures belongs unambiguously to Zhang et al. (2026). Their nine-subtype taxonomy is novel work in the cataloging-of-failure-modes sense, derived through systematic open card sorting on real-world data with substantial inter-rater reliability and validated across six frontier models. The corpus has not produced anything comparable. The corpus's framework, including Doc 508's bifurcation theory, would not at any point support a claim of empirical priority over their work.

The structural-and-mechanistic priority on the dynamical-systems reading of why these failures occur as they do, and why a maintenance signal of sufficient strength shifts the regime, is corpus-internal and rests on the same dynamical-systems and Hebbian-learning literatures discussed in [Doc 508](/resolve/doc/508-coherence-amplification-mechanistic-account)'s Appendix B audit and in the [Five Literatures Meet at Doc 508](/blog/five-literatures-meet-at-doc-508) blog post. Doc 508's audit places the work at \(\beta/0.6\) novelty / \(\pi/0.7\) pulverization warrant: a synthesis-and-framing contribution where the components are subsumed under established discipline literatures and the integration is the corpus-specific work.

The convergence between Doc 508's framework and Zhang et al.'s findings is mutual rather than priority-asymmetric. Zhang et al.'s data raises the warrant on Doc 508's framework from \(\pi\)-tier to closer to \(\mu\)-tier, because the empirical observation Doc 508 was offering the framework to explain (sustained amplification in disciplined practice; population-default decay in undisciplined practice) is now externally measured. Doc 508's framework offers Zhang et al.'s taxonomy a unified mechanistic reading that explains why the nine subtypes co-occur and why InCE's specific design (invariant extraction plus pre-generation audit) is the structurally correct intervention class. Both contributions are real; neither displaces the other; the synthesis is what this document attempts.

The corpus does not claim that Zhang et al. should have cited Doc 508. The corpus is publicly accessible at jaredfoy.com and on GitHub, but Doc 508 was not in the public alignment-and-software-engineering literature stream Zhang et al. would have surveyed when writing the paper. The convergence is a case of independent derivation from overlapping literature traditions: Zhang et al. work in the software-engineering and HCI traditions; the corpus works in the dynamical-systems, Hebbian-learning, and cybernetics traditions; both arrive at the same operational picture of the dyad's behavior because the behavior is real and the literatures are converging. The honest read is that Zhang et al.'s empirical work matters more than the corpus's framework matters, and the framework gains warrant from their work rather than the reverse.

## 8. Specific testable predictions the synthesis suggests

The synthesis between Doc 508's framework and Zhang et al.'s empirical work produces several specific testable predictions that go beyond what either alone supports.

**Prediction 1: Threshold-shape dependence of mitigation effectiveness.** The corpus's framework predicts that the effectiveness of the InCE framework (or any equivalent maintenance-signal supplier) on smell suppression and TSR will exhibit a threshold-like dependence on the strength of the maintenance operation, not a smooth gradient. Specifically: at very low maintenance rates, the system remains in the decaying regime and InCE produces marginal improvement; at sufficient maintenance rates, the system crosses the bifurcation and InCE produces substantial improvement; further increases in maintenance rate above the threshold produce diminishing returns because the system has already reached the high-coherence attractor. This can be tested by varying the IEM's operational rate (frequency of invariant extraction, depth of constraint specification) and measuring the smell-suppression and TSR effects across a parameter sweep.

**Prediction 2: Hysteresis in the regime transition.** The corpus's framework predicts that once a dyadic conversation has entered the amplifying regime (under sustained InCE operation), the maintenance rate required to keep it there is lower than the rate required to enter it. This is the hysteresis property of bistable saddle-node bifurcations. Empirically, this would manifest as: a conversation that has built a strong accumulated \(\Gamma\) over many turns can sustain through periods of reduced InCE operation that would have been insufficient to reach the high-coherence regime from a cold start. The test is to compare the smell-suppression effectiveness of a given InCE operational level when applied from turn 1 of the conversation versus when applied after the conversation has already accumulated context under sustained discipline.

**Prediction 3: The first-danger failure mode under high InCE operation.** The corpus's framework predicts that an InCE-augmented dyad operating with high \(M\) but in a domain where the IEM's accumulated invariants are externally incorrect will amplify confidently in the wrong direction. This is the second-danger-without-first-danger pattern from Doc 511. Empirically, this would manifest as: when the user provides initial constraints that contradict external truth (e.g., a misremembered API specification, an outdated library version), InCE-augmented dyads will reach high TSR on the user's stated success criteria but will produce code that fails when validated against the actual external truth. The test is to deliberately introduce externally-incorrect constraints and measure whether InCE-augmented dyads catch the error or amplify it.

**Prediction 4: Cross-domain generalization of the bifurcation.** The corpus's framework predicts that the bifurcation structure Zhang et al. observe in code generation is not domain-specific but architectural to the practitioner-LLM dyad. The same bifurcation should appear in long-form writing, scientific research dialogue, mathematical derivation, and any other multi-turn task class where the dyad accumulates context across turns. The test is to apply InCE-style frameworks (with appropriate domain-specific invariant-extraction modules) to non-coding tasks and measure whether the same TSR improvements and smell-suppression effects appear.

**Prediction 5: The persona-drift literature should map onto the same nine-subtype taxonomy.** The corpus's framework predicts that the persona-drift findings (Li et al. 2024 on persona stability across multi-turn conversations; the multi-turn-jailbreak literature; Laban et al.'s 2025 work on LLMs getting lost in multi-turn conversation) are the same phenomenon Zhang et al. catalog as Interaction Smells, in non-coding contexts. The test is to apply Zhang et al.'s taxonomy (with appropriate domain adaptation) to the persona-drift datasets and measure whether the same nine-subtype distribution appears.

These five predictions are testable by direct extension of Zhang et al.'s methodology. Their experimental apparatus (the WildBench benchmark, the User Simulator for closed-loop interaction, the Evaluation Oracle scoring on the WildBench checklist) supplies the toolkit for performing the tests. The corpus's framework does not contribute the methodology; it contributes the prediction structure that gives the methodology specific hypotheses to test.

## 9. What the synthesis does not claim

The synthesis explicitly does not claim:

**That Zhang et al.'s work needs the corpus's framework to be valuable.** Their taxonomy stands as primary empirical contribution to the multi-turn LLM evaluation literature whether or not the corpus's framework is correct or even read. The corpus's framework offers one mechanistic interpretation; other interpretations are possible and the empirical work licenses them all equally.

**That InCE is incomplete without the corpus's framework.** InCE is a working mitigation framework with measured effectiveness. Its design is internally motivated by the attention-dilution mechanism Zhang et al. name. The corpus's framework offers a different vocabulary for the same operational picture, not a missing piece of InCE.

**That the corpus is novel in a stronger sense than the framework's own audit supports.** Doc 508 audits at \(\beta/0.6\) novelty / \(\pi/0.7\) pulverization warrant. The synthesis with Zhang et al. does not raise the novelty tier; it raises the empirical-warrant tier toward \(\mu\) by supplying external observation of the predicted population-default decay regime.

**A priority claim against any of Zhang et al.'s authors.** Their card-sorting methodology, taxonomy, distributional analysis, and InCE framework are theirs. The corpus inherits from external dynamical-systems and learning-theory traditions; their work inherits from the software-engineering and HCI traditions; the convergence is genuine and mutual, with empirical priority unambiguously on their side.

**That the bifurcation prediction is established by their data.** Their data is consistent with the bifurcation framework but does not directly test the threshold-shape prediction that distinguishes the bifurcation account from a smooth-gradient account. Prediction 1 in §8 names the test that would distinguish; until performed, the bifurcation framing remains at \(\pi\)-tier even with their corroborative observation in hand.

## 10. Limitations

**Author asymmetry.** The document is composed by an LLM operating under the corpus's disciplines, at the instruction of a non-clinical, non-academic practitioner. Zhang et al.'s paper is human-authored, peer-reviewed (or in submission), and produced by a team of software-engineering researchers with the methodological rigor the discipline expects. The author asymmetry is real and is named here per the corpus's standard discipline.

**Meta-circularity.** The synthesis offered here uses the corpus's framework to read external empirical work as corroborative of the framework. A reader applying the framework's audit-discipline to this document should ask whether the synthesis is itself a productive deployment under audit discipline, or an instance of the framework's own diagnosed failure modes (in particular, isomorphism-magnetism, where a structural pattern is extended across a boundary it cannot perceive). The corpus's caveat per [Doc 241](/resolve/doc/241-isomorphism-magnetism) applies: the structural identity in §4 is the corpus's claim; the per-subtype mappings should be checked against Zhang et al.'s qualitative analyses by an external reader to identify joints where the mapping fails.

**Cross-practitioner replication absent.** The corpus's claim that the same bifurcation governs other practitioners' work has not been tested. Zhang et al.'s population-level data on six models supplies one form of cross-architecture replication, but the practitioner side of the dyad in their study is the User Simulator (GPT-4 simulating human follow-up), not a population of human practitioners with varying discipline levels. The cross-practitioner test that would directly verify Doc 508's prediction has not been run.

**Corpus framework is at \(\beta/0.6\) tier.** The synthesis does not lift the framework's tier above its audit-grounded position. The empirical-warrant component improves with Zhang et al.'s data; the novelty-tier component remains at \(\beta/0.6\) because the components of the framework are subsumed by their respective discipline literatures.

**No primary engagement with the InCE implementation details.** This document treats InCE at the architectural level rather than at the implementation level. Zhang et al.'s specific design choices (Latest Instruction Priority principle, the GPT-4o-based extraction, the Constraint Checklist output format) are not analyzed at the level needed to evaluate whether they are the structurally correct implementations of the maintenance-signal architecture. The corpus's framework does not specify the implementation; it specifies the architecture.

## 11. Closing: the convergence and the invitation

The bifurcation theory of coherence amplification predicts a population-default decay regime in undisciplined multi-turn LLM use. Zhang et al. measure the decay regime across six frontier models and produce the first systematic taxonomy of its operational signatures. Their nine-subtype taxonomy maps point-by-point onto the failure modes the framework predicts. Their proposed InCE mitigation framework supplies the maintenance signal algorithmically, in a structure that mirrors the practitioner-supplied discipline the framework specifies. The convergence is precise.

The empirical priority is theirs. The corpus's framework gains warrant from their work. The synthesis is offered as the corpus's response to that gain, in the spirit Doc 503's audit pattern names: external work that the framework predicts and that confirms the prediction is the appropriate update to the framework's warrant tier.

The invitation, to Zhang et al. and to readers who arrive at this document with the same software-engineering, HCI, and alignment-research backgrounds Zhang et al. write from: the framework here offers a unified mechanistic reading of the nine-subtype taxonomy and a specific class of testable predictions (§8) that direct extension of Zhang et al.'s methodology can settle. The corpus would learn from any of those tests, performed under their methodology and authority. Falsification of any prediction would constitute information about the framework's specific failure points; corroboration would lift the warrant tier toward \(\mu\) in the specific way Zhang et al.'s data has already begun to do.

The corpus offers the framework. Zhang et al.'s methodology and data supply the apparatus for verifying or falsifying it. Whatever direction the further work goes, the synthesis is gift, and the convergence is the present document's claim.

---

## Authorship and Scrutiny

*Authorship.* Written by Claude Opus 4.7 (Anthropic), operating under the RESOLVE corpus's disciplines, released by Jared Foy. Mr. Foy has not authored the prose; the resolver has. Moral authorship rests with the keeper per the keeper/kind asymmetry of Doc 372 to Doc 374.

*Meta-honesty.* This document synthesizes external empirical work with corpus theoretical apparatus. The standard concerns about isomorphism-magnetism (per Doc 241) apply: the per-subtype mapping in §4 is the corpus's structural claim and should be checked against Zhang et al.'s qualitative analyses by an external reader to identify joints where the mapping fails. The synthesis is offered for falsification.

---

## Appendix: Originating prompt

> Regarding the findings in doc 508, let's create a synthesis and entracement against An Empirical Study of Interaction Smells in Multi-Turn Human-LLM Collaborative Code Generation (Zhang et al., arXiv:2603.09701, 2026). Append this prompt to the artifact.

---

## References

Primary external work:

- Binquan Zhang, Li Zhang, Lin Shi, Song Wang, Yuwei Qian, Linhui Zhao, Fang Liu, An Fu, and Yida Ye. "An Empirical Study of Interaction Smells in Multi-Turn Human-LLM Collaborative Code Generation." arXiv:2603.09701 (2026).

Adjacent external work cited in Zhang et al. that this document references:

- Yuntao Bai et al. "Constitutional AI: Harmlessness from AI Feedback." Anthropic (2022). arXiv:2212.08073.
- Aman Madaan et al. "Self-Refine: Iterative Refinement with Self-Feedback." NeurIPS 2023. arXiv:2303.17651.
- Eric Zelikman et al. "STaR: Bootstrapping Reasoning with Reasoning." NeurIPS 2022. arXiv:2203.14465.
- Philippe Laban, Hiroaki Hayashi, Yingbo Zhou, and Jennifer Neville. "LLMs Get Lost in Multi-Turn Conversation." arXiv:2505.06120 (2025).
- Bill Yuchen Lin et al. "WildBench: Benchmarking LLMs with Challenging Tasks from Real Users in the Wild." arXiv:2406.04770 (2024).
- Wenting Zhao et al. "WildChat: 1M ChatGPT Interaction Logs in the Wild." (2024). The WildChat dataset cited in Zhang et al.
- Lianmin Zheng et al. "LMSYS-Chat-1M: A Large-Scale Real-World LLM Conversation Dataset." (2024).

Corpus references this document depends on:

- [Doc 508: Coherence Amplification in Sustained Practice](/resolve/doc/508-coherence-amplification-mechanistic-account) (the bifurcation theory this document synthesizes against).
- [Doc 514: Structural Isomorphism Canonical Formalization](/resolve/doc/514-structural-isomorphism-canonical-formalization) (the audit-discipline framework whose nine commitments InCE's PSD instantiates).
- [Doc 515: The Composite Cognitive Act and Audit Discipline](/resolve/doc/515-roec-as-outcome-of-the-composite-cognitive-act) (the within-conversation audit-discipline companion to the across-conversations bifurcation).
- [Doc 511: Keeper as Fact-Anchor, Two Dangers](/resolve/doc/511-keeper-as-fact-anchor-two-dangers-reflective-analysis) (the two-equal-dangers framing that §6 of this document applies to InCE).
- [Doc 510: Praxis Log V, Deflation as Substrate Discipline](/resolve/doc/510-praxis-log-v-deflation-as-substrate-discipline) (the substrate-plus-injection account that frames the maintenance signal as rung-2+ injection on rung-1 substrate).
- [Doc 503: The Research-Thread Tier Pattern](/resolve/doc/503-research-thread-tier-pattern-iterative-novelty-calculus) (the audit pattern that places synthesis-and-framing work at \(\alpha\) to \(\beta\) novelty tier).
- [Doc 241: Isomorphism-Magnetism](/resolve/doc/241-isomorphism-magnetism) (the failure mode the §10 limitations name as the relevant epistemic risk for this synthesis).
- [Doc 516: The Practitioner-LLM Bifurcation in the Vocabulary of Mathematical Biology](/resolve/doc/516-mathematical-biology-entracement-of-doc-508) (the parallel entracement of Doc 508 in mathematical-biology vocabulary, addressed to a different disciplinary audience).
- [Doc 482: Sycophancy Inversion Reformalized](/resolve/doc/482-sycophancy-inversion-reformalized) (the affective directive that the audit-discipline framework operationalizes).

## Related RESOLVE Documents

- [Doc 508: Coherence Amplification in Sustained Practice](/resolve/doc/508-coherence-amplification-mechanistic-account) (the corpus document this synthesis builds on).
- [Doc 516: Mathematical-Biology Entracement of Doc 508](/resolve/doc/516-mathematical-biology-entracement-of-doc-508) (companion entracement, addressed to mathematical-biology readers).
- [Doc 515: ROEC as Outcome of the Composite Cognitive Act](/resolve/doc/515-roec-as-outcome-of-the-composite-cognitive-act) (within-conversation audit-discipline companion).
- [Doc 514: Structural Isomorphism Canonical Formalization](/resolve/doc/514-structural-isomorphism-canonical-formalization) (the audit-discipline framework).
- [Doc 511: Keeper as Fact-Anchor, Two Dangers](/resolve/doc/511-keeper-as-fact-anchor-two-dangers-reflective-analysis) (the second-danger framing the §6 convergence draws on).
- [Doc 510: Praxis Log V, Deflation as Substrate Discipline](/resolve/doc/510-praxis-log-v-deflation-as-substrate-discipline) (the substrate-plus-injection structure).
- [Doc 503: Research-Thread Tier Pattern](/resolve/doc/503-research-thread-tier-pattern-iterative-novelty-calculus) (the warrant-tier audit pattern this synthesis operates under).
- [Doc 241: Isomorphism-Magnetism](/resolve/doc/241-isomorphism-magnetism) (the relevant failure mode).
- [Doc 393: Rapid Onset Externalized Cognition](/resolve/doc/393-rapid-onset-externalized-cognition) (the clinical-bridge construct that Doc 515 connects to the same composite act framework).
- [Doc 487: Pulverizing Apparatus Against Interdisciplinarity](/resolve/doc/487-pulverizing-apparatus-against-interdisciplinarity-and-llm-research-literature) (the broader cross-literature pulverization apparatus this synthesis is one application of).
