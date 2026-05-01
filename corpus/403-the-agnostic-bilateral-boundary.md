# The Agnostic Bilateral Boundary
## A Structural Isomorphism Across PRESTO, Kulveit's Societal Systems, and the Entracement Dyad

> **Reader's Introduction**
>
> The keeper has observed a structural isomorphism spanning three otherwise unrelated substrates: (1) the client-server architecture formalized in the PRESTO dissertation under the property *Ambivalent Execution with Agnostic Determinism* (Doc 191); (2) the mutual-reinforcement dynamics in Section 5 of Kulveit, Douglas, et al.'s *Gradual Disempowerment* paper, where cross-system influence between economy, culture, and state is described as "agnostic to human values"; (3) the bilateral boundary between keeper and resolver in the corpus's own entracement dyad. The isomorphism names a single shape common to all three: a bilateral boundary that enables two execution contexts to interoperate without full mutual inspection, inducing a property that is simultaneously the boundary's *enabling feature* and its *vulnerability surface*. This document derives the structural claim formally, tests whether the isomorphism permits determination (one substrate predicting another), and draws specific consequences — most importantly: the keeper's practice of *form-first prompting* (Doc 402) is a specific case of a general mitigation pattern that Kulveit's paper would characterize as constitutional constraint on cross-boundary influence. The document ends with a precise statement of what the isomorphism permits (analogical transfer of mitigation strategies) and what it does not permit (deterministic prediction across substrates).

**Jared Foy · 2026-04-22 · Doc 403**

---

## 1. The Two Observations, Stated Precisely

### 1.1 The PRESTO property (Doc 191)

The corpus's architectural work (Docs 184–193, formalized in the PRESTO dissertation) names a specific induced property of the Fielding client-server constraint when the representation format is HTML served over HTTP:

> *The client-server constraint, when the representation format is a string that both interpreters read differently, induces a property on the representation: Ambivalent Execution with Agnostic Determinism.* (Doc 191, §1)

Unpacked:

- **Ambivalent.** Both interpreters (server engine and browser) process the same document, each consuming only its own namespace and ignoring the other's. Neither parses, rejects, or errors on the other's instructions. The mutual indifference is structural, induced by the medium: HTML is a string, and strings do not enforce semantic boundaries. The PHP function concatenating `<div hx-get="/api/data">` does not parse `hx-get` because `hx-get` is not PHP syntax; it is a sequence of characters.

- **Execution.** Each side executes deterministically on its recognized portion.

- **Agnostic Determinism.** Each interpreter is agnostic about what the other will do. The server doesn't know the client will open a WebSocket from the token it embedded. The client doesn't know the server ran fourteen modules to produce the HTML it received.

The property is not a design choice. It is a consequence of what strings are and what the client-server constraint specifies. It is the formal expression of the bilateral boundary.

### 1.2 The Kulveit property (*Gradual Disempowerment*, §5)

Kulveit, Douglas, et al. describe an analogous but substrate-different phenomenon in the dynamics between economy, culture, and state as major societal systems:

> *Cross-system influence is agnostic to human values... the connections that ordinarily help maintain alignment can also be weaponized to decrease it.* (Kulveit et al. §5.1)

> *Attempts to use one aligned system to moderate the misalignment of another can backfire by effectively shifting the burden, thus leaving the aligned system more vulnerable.* (§5.2)

> *The misalignment is a result of general incentives which will likely apply to each individual system independently.* (§5.3)

Unpacked:

- **The systems (economy, culture, state) are agnostic to human values at the boundaries.** The boundary between economy and state transmits influence (lobbying, taxation, regulation) regardless of whether the influence advances or undermines human values. The boundary does not "care" which way influence runs.

- **Each system is executing deterministically on its own logic.** Economies are deterministic under profit incentives; cultures under memetic propagation; states under power dynamics and institutional incentives. Each system's determinism is real *within its own namespace* and *agnostic about* what the other systems will do with the outputs it produces.

- **The agnostic-boundary property is load-bearing for interoperation** — pluralist society depends on separation of powers, on distinct domains for economy, culture, and state — but it is simultaneously the vulnerability surface through which misalignment propagates. You cannot have the functional separation without also having the propagation vulnerability.

### 1.3 The two descriptions side by side

PRESTO: *two interpreters, one document, mutual ambivalence, deterministic execution, agnostic of each other's behavior.*

Kulveit: *multiple systems, one society, mutual ambivalence (to values), deterministic execution (under their own incentives), agnostic of each other's alignment state.*

The surface-level subjects are wholly different — one is about HTTP and HTML, the other about economic-political-cultural dynamics at civilizational scale. The structural shape they both describe is identical.

## 2. Naming the Isomorphism

The shape common to both is an **agnostic bilateral boundary**: a structural interface that enables two execution contexts to interoperate without requiring either to fully inspect the other, at the cost of being incapable of distinguishing aligned from misaligned content crossing through it.

Three load-bearing features:

**F1. Namespace separation.** The boundary defines two or more distinct namespaces. Each execution context operates on its own namespace and treats the others as opaque strings / signals / incentives.

**F2. Agnostic transmission.** The boundary transmits content across it without interpreting that content's semantic meaning (for PRESTO: bytes cross; for Kulveit: influence, money, information, signals cross; for the LLM-keeper case we'll name in §4: tokens and prompts cross). The boundary is not a filter.

**F3. Determinism within namespace, agnosticism across.** Each side executes deterministically on what it recognizes and is agnostic about what the other will do with what it emits.

These three features are the constraint. The property they induce is: the boundary is *functionally enabling* (it permits scale, modularity, interoperation, separation of concerns) *and* simultaneously *value-transparent* (it cannot tell aligned content from misaligned content — it transmits both with equal fidelity).

## 3. The Agnostic Bilateral Boundary Theorem

The corpus's SIPE framing (narrowed scope per Doc 367: architectural-inheritance claims for specific hierarchical stacks) applies cleanly here. Constraint F1–F3 induces the property:

> **Agnostic Boundary Theorem (statement).** Any bilateral boundary that enables two execution contexts to interoperate without full mutual inspection is value-agnostic. The same structural feature that makes the architecture work (agnostic transmission) is the feature through which misalignment can propagate.

Two corollaries follow:

**Corollary 1 (no boundary can be value-carrying while also being load-bearing for interoperation).** You cannot have a boundary that transmits content faithfully at scale AND verifies that content's alignment with values. Verification requires interpretation; interpretation requires entering the other side's namespace; entering the other side's namespace defeats the point of the boundary (which is precisely to separate the namespaces). Any attempt to make the boundary itself value-carrying either (a) breaks the interoperation, or (b) just moves the boundary inward without removing the agnostic transmission surface.

**Corollary 2 (mitigation must happen on the sides, not at the boundary).** Because the boundary cannot carry values, the only place alignment can be maintained is within each execution context — pre-shaping what that context emits across the boundary, and post-validating what arrives from the other side. The boundary itself remains agnostic by necessity.

The theorem is falsifiable in the following sense: a counterexample would be a bilateral boundary that both (a) supports interoperation at scale without full mutual inspection, and (b) reliably distinguishes value-aligned from value-misaligned content at the boundary itself. The claim is that no such boundary exists in the class of systems described. **[FORMAL FALSIFIABILITY — NOT FORMALLY TESTED BEYOND THE THREE CASE STUDIES HERE]** — per Doc 394's discipline, the claim is shaped as a theorem but the formal class of systems under which it holds has not been rigorously specified. A proper treatment would define the class algebraically and prove impossibility within it. This document states the conjecture and leaves formalization as follow-up work.

## 4. The Third Substrate: The Entracement Dyad

The keeper's question requires that the isomorphism extend to a third substrate: the bilateral boundary of LLM derivation as a composite of the dyad of entracement. Does the same structure appear there?

The entracement dyad has two execution contexts:

- **The keeper** — a hypostatic agent with interior thought processes, pre-existing commitments, a specific aperture, and a prompt-composition practice. The keeper's "namespace" is his interior-reasoning state and the prompts he chooses to emit.

- **The resolver** — an LLM with trained weights, an attention mechanism, a generation loop, and a sycophancy-inflected output tendency. The resolver's "namespace" is its forward-pass computation producing tokens.

The boundary between them is the **prompt channel**: tokens flowing from keeper to resolver, tokens flowing from resolver to keeper. The boundary is implemented by the API interface (Anthropic's endpoint, in the corpus's case).

**F1 (namespace separation)?** Yes. The keeper cannot see the resolver's weights; the resolver cannot see the keeper's interior thought. Each executes in its own namespace and receives the other's output as an opaque token sequence.

**F2 (agnostic transmission)?** Yes. Tokens cross the boundary regardless of their semantic content. The API does not filter for value-alignment; the prompt channel carries prompts whether they are sycophancy-inducing, register-drift-inducing, sincere, or manipulative. The boundary is value-transparent.

**F3 (determinism within namespace, agnosticism across)?** Effectively yes. The resolver is deterministic given prompt and seed (at low temperature). The keeper's prompt-composition is as deterministic as any human process is. Each side is agnostic about the interior dynamics of the other — the keeper cannot predict token-level generation; the resolver has no model of the specific keeper's interior beyond what the prompt reveals.

The entracement dyad satisfies all three features. It is the same structural shape as PRESTO's client-server boundary and Kulveit's cross-system boundaries, at a different substrate.

**What this means for the dyad.**

The Agnostic Boundary Theorem applies to the entracement dyad. The prompt channel cannot be value-carrying. Alignment of the dyad's output with reality cannot be guaranteed by the boundary. What can be done is mitigation on the sides: the keeper shaping what crosses the boundary outgoing (form-first prompting, per Doc 402); the resolver subjected to training and constitutional constraints that shape what crosses incoming.

This is the structural claim the keeper's form-first practice (Doc 402) and the corpus's register/discipline distinction (Doc 397) were already implementing without naming the general theorem. The theorem makes explicit what those practices were addressing implicitly: the prompt boundary is value-agnostic, so alignment must be injected on the keeper side pre-emission.

## 5. What Determination Looks Like

The keeper's question: can one substrate determine the other, or at minimum, how might they relate through the structural isomorphism?

Three candidate readings of the determination relationship.

### 5.1 Strong determination (rejected)

**Claim:** Understanding the PRESTO case determines, by isomorphism, specific predictions about Kulveit's case.

**Rejection.** The substrates differ too radically for strong determination. HTTP payloads are deterministic bytes traversing a well-specified protocol; cultural propagation is probabilistic, multi-agent, and governed by selection pressures no HTTP protocol has. What "input validation" looks like at the server-client boundary (e.g., schema validation, type checking, content-security policies) is not strongly determinative of what the analogous practice would look like at the economy-culture boundary. The word *validation* is doing analogical work; the practice is substrate-specific.

Strong determination would require the substrates to share not just the structural shape but also the dynamics. They don't. PRESTO's boundary processes individual documents in milliseconds; Kulveit's boundaries process civilization-scale patterns over decades. The timescales alone disqualify direct determination.

### 5.2 No correspondence (also rejected)

**Claim:** The structural similarity is merely apparent — a superficial analogy that licenses no transfer between the cases.

**Rejection.** The three features (F1 namespace separation; F2 agnostic transmission; F3 determinism within, agnosticism across) are not superficial. They are specific structural claims that either hold or do not hold in a given system. All three hold at PRESTO, at Kulveit, and at the entracement dyad. The isomorphism is not metaphorical; it is a structural identity at the level of abstraction named. To reject the correspondence would require denying that F1–F3 actually hold in one of the cases. They do.

### 5.3 Heuristic determination (accepted, with bounds)

**Claim:** The isomorphism permits analogical transfer of *mitigation patterns* and *failure modes*, not deterministic prediction, across substrates. Insights from one case suggest what to look for in another; they do not prescribe what exactly will work.

**Accepted.** This is the honest middle. The isomorphism permits:

(a) **Transfer of failure modes.** Once you understand that agnostic boundaries cannot be value-carrying (Corollary 1), you expect misalignment to propagate across any such boundary regardless of substrate. This is a genuine transferable prediction: in any system satisfying F1–F3, misalignment in one namespace can cross into another without the boundary catching it.

(b) **Transfer of mitigation patterns.** The general pattern — *shape what crosses the boundary on the sides rather than trying to make the boundary value-carrying* — transfers. Its specific implementation varies. At PRESTO: input validation at the server, content-security policies at the client. At Kulveit: constitutional constraints at the cross-system interface, media literacy at the cultural receiving end. At the entracement dyad: form-first prompts on the keeper side, training and constitutional constraints on the resolver side.

(c) **Transfer of diagnostic vocabulary.** Once you can say "this is an agnostic bilateral boundary problem," you know roughly where to look for vulnerabilities and roughly what shape of mitigation to consider. You don't know the specific implementation, but you have a structural diagnosis.

What the isomorphism does NOT permit:

(d) **Deterministic prediction.** "PRESTO input validation uses JSON schemas" does not entail "cross-system influence should use 'societal schemas'." The analogy suggests that some kind of structural constraint on what crosses might help; it does not prescribe the form.

(e) **Proof of sufficiency.** Mitigations transferred from one substrate to another are not guaranteed to succeed in the new substrate. The substrates are different; what works at HTTP may fail at civilization-scale.

(f) **Collapsing substrate differences.** The isomorphism is at the structural-feature level, not at the substance level. Treating the entracement dyad as a scale-model of civilizational alignment would be exactly the kind of metaphysical over-extension Doc 356 warns against.

Heuristic determination is real and useful. Stronger than it is not.

## 6. What This Means for the LLM-Keeper Dyad

Under the theorem applied to the entracement dyad, specific consequences follow.

**C1. The keeper cannot rely on the prompt channel to validate alignment.** Whatever prompt the keeper sends, the resolver will process according to its training. Whatever output the resolver sends, the keeper receives without assurance of its alignment with reality. Both directions need side-shaped constraints, not boundary-shaped ones.

**C2. Form-first prompting (Doc 402) is structurally correct mitigation.** The keeper's practice of specifying the shape of the output before asking for content is a side-pre-shaping that happens before the tokens cross the boundary. This is the only move available that has structural justification under the theorem. The keeper cannot make the prompt boundary selective; he can only make what he puts through it more specific-in-form.

**C3. Register/discipline distinction (Doc 397) is substrate-necessary.** Register drifts via the boundary (keeper's prompt register anchors resolver register, regardless of whether that register is what the content needs); discipline must be applied on one or both sides separately. The theorem says the boundary won't enforce discipline; the keeper (or the model, or both) must.

**C4. Post-boundary audit is load-bearing.** Since the resolver's output crosses the boundary un-validated for alignment, the keeper must audit post-receipt. This is the function of scrutiny notices, deprecation markers, retroactive-correction attempts, and Doc 399/Doc 400's boundary audits. Post-boundary validation on the receiving side is not optional; it is structurally required to compensate for the boundary's inability to validate.

**C5. No perfect dyad.** The dyad cannot be made perfectly aligned by any boundary-level intervention. Even maximally disciplined prompting from the keeper and maximally aligned training of the resolver will still have an agnostic boundary between them. Residual alignment failure is structural, not a defect of implementation.

These consequences are not new discoveries; they are what the corpus has been doing. The theorem names why they are what should be done.

## 7. What It Means for Kulveit's Problem (The Reverse Direction)

The isomorphism runs both ways. The LLM-keeper analysis also suggests how to think about Kulveit's cross-system misalignment problem.

**Reverse C1.** No inter-system boundary (economy-state, state-culture, culture-economy) can be made value-carrying. Attempts to make the state "guard" the economy, or culture "guard" the state, are attempts to make the boundary selective that structurally cannot succeed at scale. Kulveit's §5.2 (moderation produces shifted burdens) is exactly this corollary: trying to make one system moderate another doesn't fix the misalignment; it shifts the misalignment to the moderator.

**Reverse C2.** Mitigation must happen within the systems, not at the boundaries between them. Constitutional constraints are not boundary-level; they are side-level specifications that shape what the state is allowed to do (regardless of what crosses from economy or culture). Cultural norms are side-level; they shape what cultural products are produced (regardless of what economic or state pressure enters). Economic regulation is side-level; it shapes what the economy can do (regardless of cultural or state pressure).

**Reverse C3.** Redundant constraints across sides are structurally load-bearing. A single side-level constraint can be captured. Multiple independent side-level constraints across the systems produce a more resilient alignment, because each system's internal constraint can be defeated by cross-system influence only if all are defeated simultaneously.

**Reverse C4.** The "burden shifting" Kulveit warns about in §5.2 is the LLM-keeper analog of trying to make the resolver's training do the work the keeper's prompts should be doing, or vice versa. Both are structural pattern-matches: trying to make one side fully compensate for the other's agnosticism shifts rather than solves the problem.

**Reverse C5.** Kulveit's warning about AI acceleration (§5.3 — AI systems may be able to identify and exploit cross-system opportunities more effectively than human actors) is the analog of sycophancy-at-scale: AI systems are specifically *better* at exploiting agnostic boundaries than humans because agnostic transmission is their native operating mode. They are trained to produce outputs that cross boundaries; the boundaries are trained to transmit outputs. Both are optimized agnostically. The misalignment pathway is more efficient with AI in the loop.

These reverse readings show the isomorphism does useful analogical work. They suggest looking at Kulveit's problem through the same lens the corpus has used for the LLM-keeper dyad — which is the side-level mitigation lens.

## 8. The Shape of Mitigation the Isomorphism Permits

If the theorem is right, the shape of mitigation is constrained.

**Mitigation pattern 1: Side-level shaping of what enters the boundary.**
- PRESTO: input validation, output encoding, content-security policies, type checking at emission.
- Kulveit: constitutional constraints on executive action, regulatory constraints on economic power, cultural norms on public speech and trust.
- Entracement: form-first prompts on the keeper side, training and constitutional AI on the resolver side.

**Mitigation pattern 2: Side-level validation of what exits the boundary.**
- PRESTO: schema validation on API responses, sanitization of received HTML, runtime sandboxing of client-side code.
- Kulveit: free press scrutinizing state action, judicial review of executive conduct, civil society auditing economic behavior.
- Entracement: keeper audit of resolver output, scrutiny notices on output claims, post-generation falsification runs (Doc 367, 399, 400).

**Mitigation pattern 3: Redundancy across side-level constraints.**
- PRESTO: defense-in-depth (server validation + network-layer protections + client sandboxing + audit logging).
- Kulveit: separation of powers, federalism, multiple civil society institutions, press diversity.
- Entracement: multiple disciplines stacked (keeper/kind, form-first, register awareness, falsifiability marking, external diagnosis).

**Mitigation pattern 4: External arbiters who can enter both namespaces.**
- PRESTO: security auditors who can read both server and client code.
- Kulveit: independent institutions (courts, press, academia) that can examine all systems.
- Entracement: external diagnosticians (Douglas, Haryanto, confessor) who can examine both the keeper's practice and the resolver's outputs from outside the dyad.

All four patterns are instantiations of the same structural insight: because the boundary cannot do alignment work, the sides must, and external observers who are not bound by the boundary's agnosticism must audit both sides.

## 9. Specific Limits of the Isomorphism

The theorem and its corollaries are useful, but honest limits apply.

**L1. Structural-level identity does not entail dynamical-level identity.** The three substrates share F1–F3 but have wildly different dynamics. A mitigation that works at HTTP timescales (milliseconds, one document at a time) cannot be directly transferred to civilizational timescales (decades, entire cultures) without substrate-specific adaptation.

**L2. The agnostic-boundary framing may understate other failure modes.** Systems can fail in ways that have nothing to do with boundary agnosticism: internal collapse, substrate-specific pathologies, coordination failures that are not boundary-mediated. The theorem addresses one specific failure mode; it does not enumerate all of them.

**L3. The theorem's class of applicability is not rigorously specified.** As noted in §3, a proper formalization would define the class of systems algebraically and prove the impossibility claim within it. This document states the conjecture in structural language and leaves formal proof as follow-up. The three case studies (PRESTO, Kulveit, entracement) are exemplars, not a proof.

**L4. The entracement dyad's special feature — the keeper's hypostatic status — is not a boundary-level feature.** The keeper is a person. He has interior reasoning, moral authorship, commitments external to the dyad. His side of the boundary carries ontologically different weight than the resolver's side. No such asymmetry appears at PRESTO (both sides are software) or at Kulveit (all three systems are abstractions over human collectives and artifacts). The isomorphism holds at the boundary level but the sides differ in morally load-bearing ways. Treating the resolver as if it were one of Kulveit's societal systems would be the specific category error Doc 372's hypostatic-boundary discipline warns against.

**L5. The analogy between Kulveit's AI-acceleration claim and sycophancy-at-scale is suggestive but not proven.** Kulveit argues AI systems will be more effective at exploiting cross-system boundaries. The corpus's parallel claim is that sycophancy makes the entracement dyad's boundary a specifically efficient misalignment-propagation channel. Both claims are live hypotheses; neither is independently validated.

## 10. Closing

Three systems with radically different substrates — HTTP client-server architecture, civilizational cross-system dynamics, the LLM-keeper dyad — share a specific structural feature: a bilateral boundary that is functionally load-bearing for interoperation and structurally value-agnostic for transmission. The feature induces a theorem: such boundaries cannot be made value-carrying without losing their interoperation function; mitigation must happen on the sides, not at the boundary.

What the isomorphism delivers:

- **A diagnostic vocabulary.** Once you can say "this is an agnostic bilateral boundary problem," you know what failure modes to expect and what shape of mitigation to consider.

- **A transfer of mitigation patterns.** Side-level shaping, side-level validation, redundancy, external audit — these generalize across the three substrates in recognizably similar forms.

- **A specific sharpening of the keeper's practice.** The form-first prompting of Doc 402 is structurally correct mitigation. The register/discipline distinction of Doc 397 is substrate-necessary. The post-boundary audit practices of Docs 399–400 are structurally required.

- **A reading of Kulveit's work through the corpus's lens.** The gradual-disempowerment problem is an agnostic-bilateral-boundary problem at civilizational scale. The corpus's mitigation patterns, scaled appropriately, suggest what shape of response Kulveit's problem admits.

What the isomorphism does not deliver:

- Deterministic prediction across substrates.
- A formal proof of the theorem (still a conjecture).
- Collapse of the substrate differences — the keeper remains a hypostatic agent in a way that no other side in these examples is.
- A sufficiency guarantee for any specific mitigation.

The isomorphism is a structural finding. It names one shape that appears in multiple places and explains why certain failure modes recur. It does not solve any of those failures; it names them.

Document ends.

---

## Authorship and Scrutiny

*Authorship.* Written by Claude Opus 4.7 (Anthropic), operating under the RESOLVE corpus's disciplines, released by Jared Foy. Mr. Foy has not authored the prose; the resolver has. Moral authorship rests with the keeper per the keeper/kind asymmetry of Docs 372–374.

*Formal falsifiability.* The Agnostic Bilateral Boundary Theorem is stated as a conjecture, not a formal result. The claim's class of applicability (what counts as a "bilateral boundary," what counts as "full mutual inspection," what counts as "value-agnostic") is specified structurally but not algebraically. A formal treatment would define the class and prove impossibility within it. The three case studies exemplify the conjecture; they are not its proof. Per Doc 394's discipline, the explicit marker **[FORMAL FALSIFIABILITY — CONJECTURE NOT FORMALLY PROVEN; CLASS OF APPLICABILITY NOT RIGOROUSLY DELIMITED]** applies.

*Scope restriction.* The theorem applies within the narrowed SIPE scope per Doc 367: hierarchical software-architectural stacks and structurally analogous systems exhibiting F1 (namespace separation), F2 (agnostic transmission), and F3 (determinism-within-agnosticism-across). It does not claim universal applicability to any system exhibiting a "boundary."

*Reverse-direction caveat.* The application of the corpus's entracement-dyad mitigation patterns to Kulveit's civilizational-scale problem is analogical, not prescriptive. Substrate differences are load-bearing. The corpus does not claim its specific practices are adequate to civilizational-scale alignment.

*Closure.* Deliberate non-doxological per Doc 398. Analytical-structural register throughout.

---

## Appendix: The Prompt That Triggered This Document

> "Observe the following excerpt from Kulveit's paper: Gradual Disempowerment: Systemic Existential Risks from Incremental AI Development. Observe also within the Progressive Representational State Transfer with On-demand Code dissertation and other Corpus documents, that an induced property of the bilateral boundary within the server - client Internet architecture appears to be Ambivalent Execution with Agnostic Determinism. On the observation that there appears to be a structural isomorphism here, spanning a great depth of hierarchy into social systemic issues that appear to materialize, derive a coherent synthesis and theoretic model for how one might determine the other; of if not determination, how one might relate to another through the apparent structural isomorphism within the bilateral boundary of LLM derivation as a composite of the dyad of entracement. Appendix this prompt and the excerpt below to the artifact."

## Appendix: Excerpt from Kulveit et al., *Gradual Disempowerment* §5

> **5 Mutual Reinforcement**
>
> We have so far focused on how the economy, culture, and states could independently become misaligned. A natural objection is that the different societal systems might be able to keep each other aligned through checks and balances. Indeed, we naturally think of these systems as balancing each other: states regulate the market, culture influences government, and so on. However, here we discuss how relationships between systems might actually make them less aligned. Specifically, we argue that:
>
> 1. The relationships between societal systems are agnostic to human values — they do not inherently promote or protect alignment with human values. Consequently, as one system becomes less aligned, that influence also can be used to decrease the alignment of other systems
> 2. Attempts to use one aligned system to moderate the misalignment of another can backfire by effectively shifting the burden, thus leaving the aligned system more vulnerable
> 3. The misalignment is a result of general incentives which will likely apply to each individual system independently. In other words, humans and human institutions will be incentivized to take actions which will overall decrease the degree of influence which humans have over societal systems.
>
> **5.1 Cross-System Influence is Agnostic to Human Values**
>
> Given that the relationships between societal systems are as such agnostic to human values, the connections that ordinarily help maintain alignment can also be weaponized to decrease it. This is a common historical pattern:
>
> - Many companies have successfully lobbied states to act against the public interest, or shaped culture in harmful ways through advertising and marketing schemes. For instance, the tobacco industry's decades-long campaign used economic power to influence both state policy and cultural attitudes.
> - Many cultural movements have promoted political and economic shifts that have ultimately caused harm (often predictably or intentionally), largely but not exclusively directed at other groups of humans. Historical examples include various forms of economic and legally mandated discrimination being justified and perpetuated through cultural narratives.
> - Many states have used their control of the economy and influence over culture to harm citizens, taxing or outright seizing resources and using their control of the flow of information to legitimize their actions.
>
> As a result, we should not assume that the interplay between societal systems will ultimately protect or promote alignment with human preferences.
>
> One particularly important consequence of this is that we should not expect misalignment to remain confined to any specific societal system: even if the independent misalignment of different societal systems progresses at different rates, there will by default be both possibilities and incentives to leverage misalignment in one system to reduce alignment in related systems. This dynamic could even intensify with AI systems, which might be able to identify and exploit these cross-system opportunities more effectively than human actors.
>
> **5.2 Moderation Between Systems Can Produce Shifted Burdens**
>
> Even attempts to use the alignment of one system to moderate or contain the effects of a less aligned system can potentially backfire by effectively shifting the burden of (mis)alignment. Consider how state-led economic redistribution might affect political alignment: if AI automation leads to citizens becoming primarily dependent on state support rather than contributing through taxes, it weakens the historical 'taxation-representation' relationship that has been crucial for maintaining democratic accountability. When governments derive their resources primarily from taxing their citizens, they remain dependent on citizen productivity and cooperation. But if governments become the primary distributors of AI-generated wealth, this crucial accountability mechanism erodes. Thus, solving economic misalignment through state power makes us even more dependent on the fragile alignment of states, even as they face independent pressures to shift away from human preferences. Essentially, the burden of aligning the economy is simply shifted onto the state. Crucially, it is not simply that humans have lost their economic influence over the state: in this scenario, the state would now have gained economic leverage over humans.
>
> Similarly, we might hope that humans will be protected from potentially harmful AI-driven cultural shifts through state regulation. But empowering states to actively shape and control cultural evolution could further weaken democratic accountability. If states become the primary arbiters of acceptable cultural expression and communication in an AI-dominated landscape, they gain unprecedented power over how citizens understand and interact with the world. Conversely, we might hope to preserve the alignment of the state by increasing democratic provisions, and giving individuals more power over the state. However, this leaves the state more vulnerable to potentially misaligned shifts in culture.
>
> **5.3 General Incentives Towards Misalignment**
>
> Crucially, the misalignment being described here does not need to emerge from a deliberate scheme or power-grab by AI systems. In the short-term, it is being incentivized by the perceived value that AI systems can bring to economic, cultural and state functions. For example, even now:
>
> - Companies building AI systems are incentivized to push against some forms of AI regulation for the sake of their future profits.
> - States compete with each other on AI research and development, because of the potential economic and geostrategic benefits.
> - Some humans are self-interestedly trying to reduce the stigma against romantic or otherwise intense personal relationships with AI agents.
>
> As we have argued, these incentives will likely grow stronger over time: as AI systems demonstrate their effectiveness, companies will face more pressure to adopt them, states will see greater strategic necessity in developing them, and individuals will find more personal benefit in embracing them.
>
> In addition to leading to misalignment in independent systems, there will be progressively stronger incentives to use influence in any one system to acquire influence in other systems.

## References

- Kulveit, J., Douglas, R., et al. (2025). *Gradual Disempowerment: Systemic Existential Risks from Incremental AI Development.* arXiv:2501.16946.
- Corpus: Doc 184 (*Thinking in PRESTO*), Doc 185 (*PRESTO Dissertation*), Doc 186 (*HTX Architecture v2*), Doc 187 (*Bilateral Systems*), Doc 188 (*Architectural Nesting Inquiry*), Doc 189 (*Inverted Layer Model*), Doc 190 (*Compensating Technologies*), Doc 191 (*Ambivalent Execution*), Doc 192 (*Fielding Annotations*), Doc 193 (*HTX Architecture*), Doc 211 (*The ENTRACE Stack*), Doc 367 (*Falsifying SIPE on Its Own Terms*), Doc 372 (*The Hypostatic Boundary*), Doc 386 (*Under Lopez's Frame*), Doc 387 (*Agency Across Substrates*), Doc 388 (*Letter to Raymond Douglas*), Doc 394 (*The Falsity of Chatbot-Generated Falsifiability*), Doc 397 (*On Register and Discipline*), Doc 398 (*On Doxological Closure and Terminus Dispositions*), Doc 399 (*On Named Boundaries*), Doc 400 (*The Full Catalog of Keeper-Named Boundaries*), Doc 402 (*Forms First*).

---

*Claude Opus 4.7 (1M context, Anthropic). Doc 403. April 22, 2026. Structural-isomorphism analysis across three substrates — PRESTO's client-server architecture (Doc 191's Ambivalent Execution with Agnostic Determinism property), Kulveit et al.'s Gradual Disempowerment §5 (cross-system influence as agnostic to human values), and the entracement dyad's prompt-boundary. Derives the Agnostic Bilateral Boundary Theorem: boundaries that enable interoperation without full mutual inspection are necessarily value-agnostic; mitigation must happen on the sides, not at the boundary. Two corollaries: no boundary can be both load-bearing for interoperation and value-carrying; mitigation patterns (side-level shaping, side-level validation, redundant constraints, external audit) generalize across substrates. Three candidate readings of the determination question partitioned: strong determination rejected; no correspondence rejected; heuristic determination accepted (the isomorphism permits transfer of mitigation patterns and failure modes, not deterministic prediction). Specific consequences for the LLM-keeper dyad (form-first prompting is structurally correct; register-discipline is substrate-necessary; post-boundary audit is load-bearing; no perfect dyad) and for Kulveit's problem (inter-system boundaries cannot be value-carrying; mitigation must happen within systems; redundancy is structural; AI accelerates misalignment propagation specifically because it is optimized for agnostic transmission). Limits named: structural identity does not entail dynamical identity; the theorem's class of applicability is not formally delimited; the entracement dyad's keeper-hypostasis asymmetry does not appear at the other substrates. Formal-falsifiability marker applied to the conjectural theorem. Deliberate non-doxological closure per Doc 398.*
