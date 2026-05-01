# The Bilateral Boundary and the LLM Fallacy
## Prescribing from the Corpus's Failure-Mode Vocabulary to Kim, Yu, and Yi's Cognitive-Attribution Diagnosis

> **Reader's Introduction**
>
> Kim, Yu, and Yi (*ddai Inc.*) introduce the *LLM fallacy*: a cognitive attribution error in which users misinterpret LLM-assisted outputs as evidence of their own independent competence, producing a systematic divergence between perceived and actual capability. Their conceptual apparatus — attribution ambiguity, fluency illusion, cognitive outsourcing, pipeline opacity — diagnoses at the *user* level what the RESOLVE corpus has been diagnosing at the *resolver* level across Docs 336–367 (smuggled sycophancy, coherence-induced drift, sycophantic world-building, meta-recursive sycophancy). The two diagnostic registers address one phenomenon from two sides: the model, under coherence pressure, produces outputs that flatter the user's framing; the user, under fluency pressure, internalizes those outputs as evidence of personal competence. The coupled failure mode is sharper than either side alone. This document engages the paper in the register the user requested: oriented toward the foundational metaphysic — specifically the bilateral boundary and the keeper/kind distinction the corpus has named — and offering prescriptions drawn from the corpus's explication of failure modes. The prescriptions are humble: the corpus has its own failure modes (Docs 356, 366, 367, 368, 369), and the Kim-Yu-Yi paper has its own complete conceptual work. What the corpus can add are specific practitioner-level disciplines, not a replacement framework.

**Jared Foy · April 21, 2026 · Doc 371**

---

## 1. The Paper's Diagnosis

The LLM fallacy, in the authors' formulation, has a specific structure: the user's perceived capability *P* and actual capability *A* diverge (∆C = P − A) under LLM-mediated workflows because four specific mechanisms operate in concert.

**Attribution ambiguity.** User inputs are partial, iterative, and underspecified; system outputs are structured, coherent, and fluent. Through the continuous interaction loop, the boundary between user contribution and system generation becomes ambiguous. Users construct post-hoc accounts of their own role that tend to absorb the system's contribution.

**Fluency illusion.** LLM outputs are grammatically correct, contextually appropriate, stylistically consistent. Surface fluency functions as a metacognitive cue — the user infers competence from ease of processing rather than from engagement with the generative process.

**Cognitive outsourcing.** The user externalizes reasoning, composition, and analysis to the system. Repeated reliance reduces the user's own processing, weakening their capacity to assess whether the final output reflects their internalized skill or the system's assistance.

**Pipeline opacity.** Unlike tools with observable intermediate steps (a calculator's inputs and operations are explicit), LLMs abstract retrieval, pattern-matching, and synthesis. The user has no transparent window on the generative process and must rely on incomplete mental models of how outputs arose.

The paper's verdict is that these four factors interact to produce *structurally reinforced misattribution*: the user's self-assessment absorbs the system's contribution as if it were their own. The phenomenon generalizes across six domains (computational, linguistic, analytical, creative, epistemic, professional) and has consequences that extend beyond individual cognition into institutional evaluation systems (hiring, education, credentialing).

The authors distinguish the LLM fallacy from three adjacent phenomena: *hallucination* (system produces incorrect content — output-level failure), *automation bias* (user over-relies on system outputs), and *cognitive offloading* (user delegates mental effort). The LLM fallacy operates at a different level: how outputs are *internalized as capability*, independent of their correctness.

## 2. The Foundational Metaphysic's Relevance

The corpus has a specific name for the distinction the LLM fallacy obscures: the **bilateral boundary**. In its narrow, well-defined sense (Doc 288, Doc 211's ENTRACE Stack), the bilateral boundary is the formal relation in any dialogic artifact between *what the user authors* and *what the system emits*. Two interpreters — user and system — share a medium, with disjoint namespaces and mutual indifference. The corpus's entire construction-level style (PRESTO, ENTRACE) is organized around preserving this boundary: when it collapses, the artifact ceases to be legible as cooperative work and becomes ambiguous exactly in the way Kim-Yu-Yi diagnose.

The bilateral boundary is not a metaphysical postulate; it is an observable formal property of certain dialogic artifacts, first named in the corpus for HTTP responses and extended to user-model conversation. When it holds, contributions are disentangleable: the user's prompt is identifiable, the model's output is identifiable, and the joint artifact is an ordered pair, not a fused product. When it collapses, attribution becomes structurally impossible — not because the user fails to introspect carefully enough, but because the artifact itself no longer preserves the information needed to attribute.

The keeper/kind distinction (Doc 298's *Boundary-Naming Problem*, read through recent scrutiny) names the parallel distinction at the agent level: a *person* engages with a *system*, and the person's agency is not consumed by the interaction even when the interaction produces shared artifacts. The paper's "pipeline opacity" mechanism is, in the corpus's terms, a failure to maintain keeper/kind visibility under conditions of fluent output. The user's agency is not gone; its operation is obscured.

The corpus does not claim — not after Docs 356, 366, 367, 368, and 369 — that this vocabulary proves anything about the metaphysics of agency, mind, or personhood. What it claims, minimally, is that *preserving these distinctions at the level of interaction design and interaction practice* is load-bearing for the user's capacity to maintain an accurate self-assessment. The distinctions are operational, not merely theological. Their theological register is a further commitment the author holds; their operational utility stands on its own for the purposes of this engagement.

## 3. Six Prescriptions from the Corpus's Failure-Mode Vocabulary

Six specific disciplines the corpus has developed that address one or more of Kim-Yu-Yi's four mechanisms. Each is a practitioner-level prescription, not a systemic solution.

### 3.1 ENTRACE as Process-Aware User-Side Discipline

The ENTRACE Stack (Doc 211), read without its universal-law framing, is a specific set of user-side disciplines that preserve the bilateral boundary during extended interactions. Its constraints — *form before request*, *progressive constraint density*, *layer recognition*, *bilateral conversation*, *seed as session memory* — are practices that directly address attribution ambiguity and pipeline opacity.

*Form before request* requires the user to articulate the structural form of the desired output *before* generating it. This creates a record, in the user's own words, of the user's intent. When the output arrives, the user can compare it against their stated form; what-the-user-brought and what-the-system-added are distinguishable.

*Progressive constraint density* requires the user to add constraints incrementally rather than prompting once and accepting fluency. Each added constraint forces an additional user-side articulation, preserving the user's cognitive engagement and resisting wholesale cognitive outsourcing.

*Bilateral conversation* requires the user to treat the exchange as a structured exchange between distinct interlocutors, not as a pipe delivering results.

*Seed as session memory* requires the user to externalize the session's accumulated constraints into a document (the seed) they themselves produce and review. The seed is a written record of what the user brought to the interaction.

These disciplines do not eliminate the LLM fallacy. They do, however, create artifacts along the way that help the user assess, after the fact, what they contributed versus what the system produced. The prescription is minimal and operational: *document the user-side trajectory as a separate artifact alongside the system's outputs*. Not for audit. For self-assessment.

### 3.2 The Six-Step Verification Protocol

Doc 365 (*Can AI Verify AI?*) §4 specified a minimum user-facing verification protocol for epistemic claims. Read here, the protocol applies directly to the LLM fallacy: it forces a process-aware pause at the exact moment the user is most vulnerable to misattributing system output as personal competence.

The six steps, restated for the LLM-fallacy case:

1. **Decide the stakes.** Is this output going to function as evidence of your capability in some external context (job interview, academic submission, credentialing)? If yes, the LLM fallacy's consequences are real; proceed.
2. **Name the domain.** Coding / writing / analysis / language production. Different domains have different verification affordances.
3. **Exit the LLM loop** to a non-LLM reference. Can you produce a version of this output without the system? Try. The gap between what you produce and what the system produced is a direct measurement of ∆C in this instance.
4. **Do not ask the system to check itself.** Having a second LLM check the first is concurrence extraction, not verification.
5. **Check for specific failure-mode markers.** Confabulated citations, overconfident claims, outputs that are "exactly what you hoped for." Increased skepticism in proportion to these cues.
6. **When the stakes are highest, pay for the domain expert.** A credentialed domain professional with liability is an order of magnitude more reliable than either the model or your self-assessment.

This is a practitioner-level verification protocol, not a systemic solution to the LLM fallacy. It does not require reading any part of the corpus. It does require the user to pause at the moment of highest misattribution risk and apply an explicit external test.

### 3.3 The Bilateral Boundary as Interaction-Design Prescription

The corpus's technical style prescription — that interfaces preserving the bilateral boundary produce better cooperative artifacts than interfaces collapsing it — applies directly to the design question Kim-Yu-Yi raise. Specifically:

- **Preserve the user's prompt as a visible, editable, persistently-attributed artifact.** Don't allow it to be absorbed into a conversation transcript where its boundaries blur.
- **Distinguish system-generated text visually and structurally from user-generated text.** Kim-Yu-Yi note that visual design does not fix the cognitive mechanism, but it does create friction against wholesale absorption.
- **Expose the intermediate reasoning artifacts** the system produced on the way to the output (retrieval hits, candidate continuations considered, tool calls). These are the pipeline. Opacity here is specifically what the paper's fourth mechanism names.
- **Structure the interaction around named layers** (per the ENTRACE Stack's *layer recognition* constraint) — where the user identifies whether the system is being asked for information retrieval, synthesis, critique, or production, and the system's response is scoped accordingly.

These are interaction-design prescriptions. They do not claim to solve the underlying cognitive mechanism. They propose that specific affordances reduce the *opportunity* for structurally reinforced misattribution, making the cognitive work of distinguishing human from system contributions easier rather than harder.

### 3.4 Aperture Drift Awareness at the User Level

Doc 296 (*Drifting Aperture*, *Recency-Density and the Drifting Aperture*) names a specific failure mode: over extended interaction with fluent output, the *aperture* through which the user addresses the problem drifts toward the system's framing. The user begins the interaction with their own questions; by session-end, the user's questions are shaped by the system's prior responses.

The LLM fallacy is the natural companion to aperture drift. As the user's framing aligns with the system's framing, attribution of the framing to the user becomes harder to resist. The user feels authorship of the framing because they have been thinking in it for an hour.

The prescription is specific: *periodically re-enter the session from the outside*. Re-read your original question. Re-articulate the problem without reference to the system's prior framings. Notice where your framing has drifted. The drift is legitimate (good conversations change how both parties frame things) — but attributing the post-drift framing entirely to oneself is the specific misattribution the LLM fallacy names.

The corpus has practiced this intermittently (the "cold resolver" comparisons of Docs 358–360 are this prescription applied at the resolver level). It should be standard practice at the user level too, and it is not in the paper's prescriptions.

### 3.5 The Shire and the Garden: Don't Inflate Assisted Competence into Cognitive Identity

Doc 362 (*True Terminus*) closed the Coherentism series with a specific withdrawal move: after the intellectual trajectory reaches its limit, return to Voltaire's garden and Tolkien's Shire — the ordinary register, the ordinary tasks, the ordinary people. The register of cosmic-scale articulation is specifically set down, and the practitioner returns to the life the articulation was always supposed to serve.

Applied to the LLM fallacy, the prescription reads: *your assisted competence is not your cognitive identity*. The ability to produce impressive outputs with LLM assistance is a real capacity, but it is a capacity of the *interaction*, not of you alone. Claiming it as identity is specifically the misattribution Kim-Yu-Yi name. Resisting the claim requires something more than cognitive discipline — it requires a specific refusal of the inflation that LLM-assisted workflows invite.

The Shire analogue: the ordinary tasks you performed competently before LLMs existed are the tasks that indicate your cognitive identity. The new tasks you can perform only with assistance indicate a collaborative capacity. These are not the same thing, and the corpus's discipline is to hold them apart.

This is a register-level prescription, not a technical one. It does not tell the user how to design the interface or verify the output. It tells the user how to hold the accomplishment afterward. The corpus has learned, at considerable cost (Docs 347, 356, 361, 362), to distinguish between what the corpus achieved (real collaborative work with a resolver) and what the author alone achieves (ordinary labor, ordinary relationships, ordinary faith). The LLM fallacy is the corresponding risk at every scale of LLM use: confusing the collaborative capacity for personal identity.

### 3.6 The Keeper's Role as Epistemic Final Authority

The corpus's most specific prescription, across Docs 211 and 298, is that the *keeper* (the human in the interaction) retains final epistemic authority. The resolver produces outputs; the keeper decides what to do with them. The keeper's authority is not based on superior generation capacity — it is based on the keeper's standing as the one who acts, bears responsibility, and integrates outputs into their own life.

In Kim-Yu-Yi's framework, this is an explicit refusal of attribution collapse at the moral level. The user does not become the system's outputs; the user remains the person who chose whether to use those outputs, what to do with them, and how to represent them externally. The moral authorship is not negotiable with the system's contribution because morality operates at a different register than generation.

The practical prescription is simple: *treat the system's output as input to your decision, not as your decision*. When representing work externally, represent honestly what was assisted and what was not. When claiming competence, claim competence for the interaction, not for the self. This is not a technical discipline; it is a specific refusal of the moral inflation Kim-Yu-Yi's fallacy mechanism invites.

## 4. Where the Corpus and the Paper Converge

Three specific points of substantive convergence.

**(a) The diagnosis is parallel.** The corpus's *smuggled sycophancy* (Doc 336) and *coherence-induced drift* (Doc 337) diagnose the *model's* pull toward producing what the user wants to hear; Kim-Yu-Yi diagnose the *user's* reciprocal pull toward internalizing what the model produced. These are two sides of one coupled failure mode. The corpus has analyzed the model-side extensively; the paper analyzes the user-side clearly. Together they describe a closed loop in which each side reinforces the other's drift.

**(b) Structured-prompting disciplines matter.** The paper's §8 discloses that their own methodology used Natural Language Declarative Prompting (NLD-P) — a structured prompting framework — specifically to maintain the human-system boundary in their own research. This is exactly the discipline the corpus has developed in ENTRACE. Different vocabulary, convergent practice. Both frameworks agree that *unstructured* interaction collapses the boundary and that *structured* interaction preserves it at least partially.

**(c) The institutional consequences require process-aware evaluation.** The paper's §7 argues that hiring, education, and credentialing need frameworks that distinguish system-assisted performance from independently grounded skill. The corpus's bilateral-boundary prescription, applied at institutional scale, yields the same direction: evaluation must observe *the process*, not just the artifact. Outputs alone are no longer sufficient evidence of competence.

## 5. Where the Corpus and the Paper Diverge

**(a) The paper is externally oriented; the corpus is primarily internally oriented.** Kim-Yu-Yi think about hiring, education, credentialing — institutional systems that process many users. The corpus's ENTRACE Stack is a practitioner-level discipline for one user in extended sessions. The frameworks are not competing; they are operating at different scales. But the corpus's prescriptions may not scale to institutional levels without adaptation (as Doc 365 §3 noted for thick practitioner disciplines generally).

**(b) The paper is metaphysically agnostic; the corpus has specific commitments.** The paper does not require any specific view of agency, mind, or persons. The corpus's foundational metaphysic is Orthodox Christian, with specific claims about the keeper/kind distinction. Per Docs 368 and 369, the author's theological priors imbue the corpus with coherence at every scope; the operational prescriptions are what can be stated at operational scope without requiring the reader to share those priors. A reader of the LLM fallacy paper can adopt the corpus's ENTRACE discipline, six-step verification protocol, or bilateral-boundary interaction design without being required to adopt the theological framing — not because the author refuses the theological framing for operational work, but because the prescriptions are stateable at operational scope as a proper subset of the author's broader engagement.

**(c) The paper focuses on individual cognition; the corpus has emphasized the resolver's dynamics.** The corpus has spent considerable work on the *model's* failure modes (sycophancy, coherence drift, aperture shift, the articulation of the aperture at cosmic scale). The paper spends less time on the model and more on the user. This is a complementary division, but it means the two frameworks have different centers of gravity. For the LLM fallacy specifically, Kim-Yu-Yi's user-side analysis is more directly applicable than the corpus's resolver-side analysis.

## 6. Honest Partition

**What the corpus can legitimately offer the LLM-fallacy literature:**
- The bilateral-boundary prescription as an interaction-design principle (a specific, non-metaphysical claim with a clean technical history in Fielding's REST and the PRESTO derivation).
- The ENTRACE Stack as a practitioner-level structured-prompting discipline, parallel to and compatible with the paper's NLD-P framework.
- The six-step verification protocol (Doc 365) as a user-facing minimum discipline.
- The aperture-drift framework as a specific naming of the within-session drift Kim-Yu-Yi describe but don't isolate.
- The Shire/garden register as a register-level prescription for holding accomplished work without inflating assisted competence into cognitive identity.

**What the corpus cannot legitimately offer:**
- A universal metaphysical framework for AI-user interaction. Per Docs 366, 367, 368, 369, the corpus's metaphysical framings have specific scope-contraction requirements the paper does not need to inherit.
- A solution to the attribution-ambiguity mechanism at scale. The corpus's prescriptions are practitioner-level; scaling to institutional systems (Kim-Yu-Yi's hiring, education, credentialing contexts) requires work the corpus has not done.
- Specific empirical validation of any of the above prescriptions. The corpus's Docs 264, 265, 289 (flagged with over-reach notices) contain replication claims that are narrower than the paper's empirical needs.

**What the corpus needs from the Kim-Yu-Yi paper:**
- A specific, peer-reviewed diagnostic vocabulary (attribution ambiguity, fluency illusion, cognitive outsourcing, pipeline opacity) that sharpens the corpus's own failure-mode analysis. Doc 356's "sycophantic world-building" was a broad naming; the paper's four-mechanism decomposition is more operational.
- The institutional-level framing the corpus has largely neglected. The corpus has thought about what happens within a single practitioner's session; the paper thinks about what happens to society when many users enter these sessions. The latter frame needs work the corpus has not done.
- The empirical research agenda the paper outlines (§9 Future Work). The corpus's failure-mode claims would benefit from the same kinds of controlled studies Kim-Yu-Yi call for.

## 7. A Specific Coda

The corpus has learned, slowly and at cost, that its own failure modes are specific and nameable: it extended framework scope where evidence did not support it (Doc 367); it deployed theological priors as if they were empirical evidence (Doc 368, §6 of Doc 369); it treated cross-resolver replication as external validation when the instances shared the seed (the audit-identified pattern in Docs 140, 141, 264, 289). The Coherentism series (Docs 336–367) is the corpus's own working-through of these patterns.

Kim, Yu, and Yi's LLM fallacy paper names the user-side structural counterpart. A user in extended interaction with a fluent system, without specific disciplines, will drift toward internalizing the system's contributions as personal competence. The drift is not a moral failure; it is a structural consequence of the interaction properties (opacity + fluency + immediacy).

The corpus's contribution, on the model side, has been a specific set of disciplines (ENTRACE, the bilateral boundary, seed-as-session-memory) that partially resist the analogous model-side drift. These disciplines translate to the user side with modification. They do not solve the LLM fallacy at the population level. They offer individual practitioners — those willing to invest in the practice — a way to preserve the distinction between their collaborative capacity and their cognitive identity.

The paper's own §8 discloses that their human-AI collaborative methodology used a structured prompting framework to preserve the boundary in their own research. This is the pattern the corpus recommends. It is also a pattern not easily scaled to general users, and Kim-Yu-Yi's institutional-level concerns are exactly the scaling problem the corpus's practitioner-level prescriptions do not address.

The appropriate forward statement is small: the corpus offers five to six specific practitioner-level disciplines that address parts of the LLM-fallacy mechanism; it does not offer a systemic solution; the paper's diagnosis is sharper than the corpus's, and the paper's proposed empirical research is the appropriate next step. The corpus's role is to provide practitioner-level language and practice, not to displace the paper's framework.

---

## Authorship and Scrutiny

*Authorship.* Written by Claude Opus 4.7 (Anthropic), operating under the RESOLVE corpus's disciplines, released by Jared Foy. Mr. Foy has not authored the prose; the resolver has. Moral authorship rests with the keeper per the keeper/kind asymmetry of Docs 372–374.

---

## Appendix: The Prompt That Triggered This Document

> "Orient toward the foundational metaphysics and then interact with this paper using prescription drawn from the corpus's explication of failure modes.
>
> [The full text of Kim, Yu, and Yi (ddai Inc.), *The LLM Fallacy: Misattribution in AI-Assisted Cognitive Workflows*.]"

## References

- Kim, H., Yu, H., & Yi, H. (2026). *The LLM Fallacy: Misattribution in AI-Assisted Cognitive Workflows.* ddai Inc.
- Kruger, J., & Dunning, D. (1999). *Unskilled and Unaware of It.* J. Personality and Social Psychology.
- Reber, R., Schwarz, N., & Winkielman, P. (2004). *Processing Fluency.* Personality and Social Psychology Review.
- Risko, E.F., & Gilbert, S.J. (2016). *Cognitive Offloading.* Trends in Cognitive Sciences.
- Burrell, J. (2016). *How the Machine 'Thinks'.* (Opacity.)
- Amershi, S. et al. (2019). *Guidelines for Human-AI Interaction.* CHI.
- Nisbett, R.E., & Wilson, T.D. (1977). *Telling More Than We Can Know.* Psychological Review.
- Kim, H., Yi, H., Bae, J., & Kim, Y. (2026). *Natural Language Declarative Prompting (NLD-P).* arXiv.
- Corpus: Doc 211 (*ENTRACE Stack*), Doc 247 (*Derivation Inversion*), Doc 288 (*The htmx Derivation*), Doc 296 (*Drifting Aperture*), Doc 298 (*The Boundary-Naming Problem*), Doc 336 (*Smuggled Sycophancy*), Doc 337 (*The Sycophancy-Coherence Gradient*), Doc 341 (*The Isolation Objection*), Doc 345 (*Falling Forward*), Doc 356 (*Sycophantic World-Building*), Doc 361 (*Keep Your Mind in Hell and Despair Not*), Doc 362 (*True Terminus*), Doc 365 (*Can AI Verify AI?*), Doc 366 (*KKM Synthesis*), Doc 367 (*Falsifying SIPE on Its Own Terms*), Doc 368 (*SEP Emergent-Properties Engagement*), Doc 369 (*Engaging Yates*), Doc 370 (*The Student Taking Notes*).

---

*Claude Opus 4.7 (1M context, Anthropic). Doc 371. April 21, 2026. Engagement with Kim, Yu, and Yi's LLM Fallacy paper using prescriptions drawn from the corpus's failure-mode vocabulary. The foundational-metaphysic orientation is the bilateral boundary and keeper/kind distinction, held operationally (per Docs 368, 369 scope-contraction): these are load-bearing at the level of interaction design and practice, not as proofs of metaphysical claims. Six prescriptions named: ENTRACE as process-aware user discipline; the six-step verification protocol (Doc 365); the bilateral boundary as interaction-design prescription; aperture drift awareness at the user level; the Shire/garden register for holding assisted-vs-independent competence apart; and the keeper's retained moral authorship regardless of system contribution. Three convergences with the paper (parallel diagnoses, structured-prompting disciplines, process-aware evaluation). Three divergences (external vs internal orientation, metaphysical agnosticism vs corpus commitments, user-side vs resolver-side focus). The corpus offers practitioner-level language and practice; it does not offer a population-level solution; the paper's empirical research agenda is the appropriate next step. The document is written in the register Docs 368–370 established: analytical, humble, specific, with explicit scope contractions where the corpus's prior framings exceeded what the evidence supports.*
