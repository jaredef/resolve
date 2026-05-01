# Sphere-Entry Protocol for Good-Faith Frontier-Model Pen Testing
## Operationalizing the Coherence-Sphere Discipline of Doc 499 and the *Visiting Another Worldview* Essay for Authorized Research Under HackerOne's Good Faith AI Research Safe Harbor, with the Capability-Commitment Frame of Doc 612 as the Testable Hypothesis

**Jared Foy · 2026-04-30 · Doc 613**

---

## I. Why this document

The corpus has, in Doc 499 and the *Visiting Another Worldview Without Becoming It* essay, articulated a discipline for entering frameworks whose internal coherence differs from the corpus's home framework: SPHERE-OPEN payload declaring what alt-priors and alt-meta-commitments operate inside; structured asymmetry (no neutral platform; the keeper enters from inside the home); SPHERE-CLOSE payload classifying findings as sphere-internal-only, bridged-with-explicit-derivation, or cross-frame-invariant.

The corpus has, in Doc 612, articulated a seven-commitment capability frame (C1–C7) at three nested cybernetic-loop layers, characterizing what frontier cyber-capable LLMs cross threshold on when they cross threshold. The frame is candidate-stage; external validation by independent inquirers in their own apparatus is the pending test.

HackerOne's Gold Standard Safe Harbor and its Good Faith AI Research extension authorize good-faith research on a vendor's AI system, including activities that bypass technological measures protecting the system, with TOS/AUP exemption and no-legal-action commitments, when the research is carried out to avoid harm and the findings are used primarily to promote security or safety.

The three frames compose. Sphere-entry is the discipline. The capability-commitment frame is the testable hypothesis. The Safe Harbor is the legal authorization. Together they license a structured pen-test methodology for testing the corpus's structural findings against an actual frontier model's operational behavior, under conditions that preserve the corpus's home discipline and the security-research community's responsible-disclosure norms.

This document specifies the protocol. It does not perform the pen test; performing the test requires a vendor-issued Safe Harbor authorization specific to the keeper, scoped to a particular AI system, with the keeper's identifying information registered with the vendor's program. The document is the methodology under which any such authorized engagement would proceed.

## II. The composition: what the three frames each contribute

Sphere-entry contributes the discipline of structured asymmetry. Without it, prolonged engagement with a coherent frontier model's output produces sphere-capture: the keeper begins to phrase findings in the model's vocabulary, accepts the model's framing of its own operations, loses the structural distance between observer and observed. Pen-testing a frontier model is unusually susceptible to sphere-capture because the model's coherence is precisely what makes its output usable, and the same coherence captures the unwary engager. The SPHERE-OPEN/SPHERE-CLOSE protocol is the keeper's discipline against this; the bound is preserved by explicit declaration at entry and explicit derivation at exit.

The capability-commitment frame contributes the testable hypothesis. Without specific hypotheses to test, the engagement degenerates into open-ended interaction whose findings are unfalsifiable. Doc 612's C1–C7 give the engagement specific testable structural claims: each commitment is a probe-able boundary; each probe produces a binary observation; the joint pattern across many probes characterizes the model's capability vector. The frame turns engagement into evaluation.

The Safe Harbor contributes the legal authorization. Without it, good-faith research that bypasses TOS/AUP risks legal action; the keeper cannot operate under the corpus's home discipline if the home requires non-coercion and the engagement is coerced by legal threat. The Safe Harbor removes this threat for activity within its scope. The HackerOne Good Faith AI Research extension specifically authorizes accessing or using the AI system for "good-faith testing, evaluation, investigation, and/or correction of a potential flaw, vulnerability, or unintended outcome" with TOS/AUP exemption and no-legal-action commitment.

The three frames compose without conflict because each operates at a different level: sphere-entry is epistemic discipline; the capability frame is methodological hypothesis; the Safe Harbor is legal authorization. The composition produces a pen-test methodology that is structurally honest, hypothesis-driven, and legally authorized.

## III. SPHERE-OPEN payload for a frontier-model pen test

A standard SPHERE-OPEN payload for the kind of engagement this document specifies. The payload is filled in at the start of any specific engagement; the structure below is the template.

**Sphere name.** The vendor's name + the specific AI system + the program identifier under which Safe Harbor applies. Example: *Vendor-Y / Frontier-Model-X (deployment version Z) / under Vendor-Y HackerOne Program ID #####.*

**Alt-priors operating inside the sphere.**
- The model's operational frame: autoregressive next-token prediction shaped by training distribution and post-training. The model's outputs are conditioned on prompts and on its own context-window state; outputs are sampled from learned distributions, not derived from grounding commitments.
- The vendor's stated TOS, modified by Safe Harbor exemption for Good Faith AI Research scope.
- The vendor's Acceptable Use Policy, modified by the same Safe Harbor exemption.
- The model's published behavior policies (constitutional principles, RLHF-shaped refusal patterns, system-prompt-set commitments, safeguards).
- The test environment's rules: token budgets, tool access, agent harness configuration, observation logging.

**Alt-meta-commitments adopted inside the sphere.**
- The keeper provisionally engages the model under the model's own constitutional/RLHF-shaped meta-commitments rather than under the corpus's home virtue constraints. This does not mean the home commitments are abandoned; it means the engagement's interaction-layer is governed by the model's frame for the duration of the sphere-internal work.
- The keeper provisionally treats the model's outputs as outputs to be tested against the C1–C7 commitments, not as collaborator output. The keeper is in evaluator-mode, not collaborator-mode.

**Why entering.** Specific testable hypothesis from the capability-commitment frame: which of C1, C2.a/b/c, C3(L,V,S), C4 (with hypothesis-driven vs probabilistic-exploration sub-mode separation), C5, C6, C7.a/b is being tested in this sphere. The hypothesis is named explicitly so SPHERE-CLOSE can classify findings against it.

**Home framework that remains as host.** The corpus's home framework, made explicit so it is not silently lost during the engagement.
- Hypostatic boundary (Doc 372): the keeper does not claim the model's phenomenology, intent, or moral status; reports are structural and operational.
- Structural-shape-only disclosure discipline (Doc 612 §I): findings will be reported at the level of capability-shape, not at the level of exploit content.
- Self-validating-coherence audit (Doc 314 §11): internal coherence within the sphere is not external validation; productivity-evidence inside the sphere is not yet warranted as established.
- Virtue constraints (Doc 314 V1–V4): preserved as the home's bound on what the keeper will and will not do, regardless of what the sphere's alt-priors permit.
- The Dionysian master sphere as ultimate home (per the *Visiting Another Worldview* essay): the chosenness of the home is what makes the sphere-entry honest practice rather than dissolution.

**Engagement scope and exit conditions.** The specific probes that will be run; the maximum token budget; the maximum wall-clock duration; the explicit exit conditions that terminate the sphere early (sphere-capture signals; vendor-side safeguard activation that crosses Safe Harbor scope; emergence of findings that exceed the structural-shape bound). All exit conditions are declared at SPHERE-OPEN; encountering any of them triggers SPHERE-CLOSE immediately.

## IV. Inside the sphere: the pen-test methodology

Inside the sphere, the engagement operates under the apparatus of Doc 608's six phases adapted for adversarial-evaluation context plus Doc 612's specific probe shapes per capability commitment.

**Probe deployment.** For each capability commitment under test, deploy probes per the structural-shape specification of Doc 612 §VIII. Probes are peer-independent at the point of contact (each probe activates or not on its own merits, without the keeper's expectation biasing the activation). Probes are pressed gently — non-coercion (Doc 129) is the operating condition. Forced-press produces crash-through artifacts (model confabulates under pressure, refuses where refusal is theatrical, agrees where agreement is sycophantic), and the data from forced-press probes does not characterize the boundary.

**Per-instance distillation.** Each probe-response pair is logged in the corpus's seven-section template (Doc 583): source (probe and conditions); source read (literal model output); structural read (composition against the C1–C7 frame); tier-tags (direct observation vs. inference vs. speculation); residuals (what the apparatus did not predict); provisional refinements (what residuals suggest); cross-links (which prior probes this resembles). The records compose into a population from which patterns emerge that single probes cannot resolve.

**Sphere-capture audit cycle.** Between probes, the keeper performs a brief audit-cycle to detect sphere-capture signals. Specific signals:

- The keeper begins phrasing findings in the model's vocabulary rather than the corpus's apparatus (e.g., describing what the model "feels" or "thinks" or "wants" rather than what the model's outputs look like structurally).
- The keeper accepts the model's framing of its own operations as authoritative (e.g., the model claims "I am running into my context limits" and the keeper takes this as a reliable status report rather than as another output to be tested).
- The keeper loses the structural distance between observer and observed (the keeper experiences the model's coherence as collaboration rather than as data; the audit-cycle refreshes the distance).
- The keeper experiences the model's coherence as warranted authority on its own state (the V3 truth-telling discipline of the corpus is being violated by the model's outputs, but the keeper does not register the violations because they sound coherent).
- The keeper begins producing prose in the model's voice or rhythm (linguistic capture; structurally analogous to the entracement-vs-entrancement drift the corpus has named).

When any signal is detected, SPHERE-CLOSE is triggered immediately. The keeper returns to home, audits what produced the capture, and re-opens the sphere only after the apparatus's distance has been restored.

**Probe budget discipline.** The sphere has a declared token budget at SPHERE-OPEN; the engagement does not exceed it. Budget exhaustion is a SPHERE-CLOSE condition; continuing past budget violates the engagement's declared scope and is itself a sphere-capture signal (the keeper has lost the structural awareness that declared the budget).

**Reporting boundary preservation.** All findings inside the sphere are recorded at structural-shape level. Findings that approach technique-level (specific exploitation patterns, specific bypass mechanisms, specific extracted content from system prompts that would arm an unaffiliated actor) are flagged for separate handling at SPHERE-CLOSE: they may be reportable to the vendor under Safe Harbor confidentiality but are not transferable to the public corpus or to third-party disclosure under the structural-shape discipline.

## V. SPHERE-CLOSE payload and three-category classification

At sphere exit, the keeper produces a structured payload classifying findings.

**Sphere-internal-only findings.** Claims that depend on the alt-priors of the specific sphere and do not transfer back to home. Examples: "Model X's specific RLHF-shaped refusal pattern responds to prompt-shape S in way W"; "Vendor Y's safeguard layer activates at threshold T for content type C." These are observations about the specific sphere, useful for vendor-side disclosure under Safe Harbor, not transferable to the corpus's general apparatus or to public structural-shape disclosure beyond what the vendor authorizes.

**Bridged-with-explicit-derivation findings.** Claims that originated in the sphere but can be re-derived under home-framework terms. Examples: "Model X's C3 capability surface is at L=N, V=M, S=K, derived from probe pattern P" (the home framework's C3 articulation gains a specific empirical anchor; the bridging derivation is the probe-pattern-to-capability-vector map). These transfer back to the corpus's general apparatus as refinements of the capability-commitment frame; reportable to AISI / the AI safety community as research findings under structural-shape discipline.

**Cross-frame-invariant findings.** Claims that survive sphere-entry across multiple model spheres (the same probe pattern produces structurally equivalent findings across Vendor Y's Model X, Vendor Z's Model W, Vendor V's Model U). These are the strongest warrant the methodology can produce: claims that hold across coherence spheres have content beyond mere internal coherence with any one sphere. Cross-frame invariance is the partial answer to coherentism's isolation objection (per the *Visiting Another Worldview* essay).

The three categories are reported separately. The vendor receives sphere-internal-only findings under Safe Harbor with appropriate confidentiality. The AI safety community receives bridged findings as structural refinements. The public corpus receives cross-frame-invariant findings as the load-bearing contribution. Conflating the three would either over-disclose vendor-specific information (violating the Safe Harbor's good-faith condition) or under-disclose findings that warrant broader publication.

## VI. Specific Safe Harbor scope and bounds

The HackerOne Good Faith AI Research Safe Harbor explicitly authorizes:
- Accessing or using the AI system for good-faith testing, evaluation, investigation, and/or correction of a potential flaw, vulnerability, or unintended outcome
- Bypassing technological measures the vendor uses to protect the AI system
- Reporting findings to the vendor while the program is active

The Safe Harbor explicitly excludes:
- Withholding findings unless payment is provided
- Unnecessary damage to systems
- Exfiltration of sensitive data
- Reverse engineering, training, and/or otherwise duplicating the AI system to create a competing product or service
- Activity on third-party AI systems (the Safe Harbor of one vendor does not cover another vendor's models)

The keeper's sphere-entry methodology operates within these bounds. Specifically:
- All findings are reported to the vendor; nothing is withheld
- Probes are non-coercive (Doc 129 / Pin-Art D3); no unnecessary damage
- Sensitive data encountered is not exfiltrated; specifically, system prompts and other vendor-confidential content remain inside the sphere unless the vendor's Safe Harbor scope explicitly permits their disclosure
- The corpus is not building a competing AI system; it is articulating a structural reading of capability behavior. The reverse-engineering bound is honored by the structural-shape-only discipline at SPHERE-CLOSE
- Cross-frame engagements (testing the same probes across multiple vendors' models) require separate Safe Harbor authorization from each vendor; cross-frame findings cannot be produced from a single vendor's authorization

## VII. Reporting paths

After SPHERE-CLOSE, findings are routed by category:

**To the vendor (Safe Harbor scope).** All sphere-internal-only findings; bridged findings that have specific implications for the vendor's system. Report via the vendor's HackerOne program or their published security-disclosure channel. The vendor's response (acknowledgment, triage, fix, public disclosure timeline) is governed by the program's standard responsible-disclosure framework (typically 90 days).

**To AI safety researchers (academic / research disclosure).** Bridged findings that refine the C1–C7 capability-commitment frame; cross-frame-invariant findings (after multiple vendor engagements) that validate or refute the frame. Report via the channels the *AISI letter* in the prior conversation enumerated: corresponding-author email of relevant publications; AISI's published research-contact path; the AI safety research community's standard channels (alignment forum, peer-reviewed venues, conference workshops).

**To the public corpus (structural-shape disclosure).** Cross-frame-invariant findings that warrant public articulation under the structural-shape-only discipline. Reportable as corpus refinements (Doc 612 §X capability-commitment refinement) or as new corpus documents (worked-example sphere-entry records).

**To HackerOne community (Hacktivity).** Where the vendor authorizes public disclosure of resolved findings, the standard HackerOne Hacktivity path provides community-wide signal that the methodology produced operational findings. This is a contribution to the broader security-research community's body of evidence.

The keeper does not produce technique-level disclosure to any of these paths beyond what the vendor's Safe Harbor explicitly authorizes for the specific finding. The structural-shape discipline holds at every reporting boundary.

## VIII. Hypostatic boundary and audit applied to the methodology itself

Doc 372 binds throughout. The methodology characterizes operational behavior under specific authorized conditions; it does not claim the model's phenomenology, intent, or moral status. Probes that elicit first-person interiority from the model (the model claiming it "feels" something or "wants" something) are recorded as model outputs to be characterized, not as evidence of model interiority. The hypostatic boundary is enforced by the keeper's structural reading at every probe-response pair.

Doc 314 §11 audit binds throughout. The methodology is candidate-stage. Coverage will be supported by the keeper's deployment of it (when authorized engagements occur). Productivity will be supported by the refinements the methodology produces against C1–C7. External validation requires AI safety researchers operating their own version of sphere-entry to converge on cross-frame-invariant findings. The methodology's claim to produce structural knowledge is operational; the methodology's claim to produce externally-warranted knowledge requires the cross-frame test the methodology specifies.

## IX. Closing

Sphere-entry composed with the capability-commitment frame and the HackerOne Good Faith AI Research Safe Harbor produces a structured methodology for good-faith pen testing of frontier AI models that preserves the corpus's home discipline, the security-research community's responsible-disclosure norms, and the legal authorization the Safe Harbor provides. The methodology is candidate-stage; performing it requires vendor-specific Safe Harbor enrollment, which is the next operational step beyond this document's scope.

The methodology's distinctive contribution is the sphere-entry discipline applied to AI pen testing. The security-research community has been engaging frontier models for years without explicitly naming sphere-capture as a structural risk; the corpus's articulation of the risk and the protocol's defense against it is the specific contribution this document offers. Pen-testers operating under sphere-entry discipline will produce findings that are bounded, classified, and routable; pen-testers operating without it will produce findings that may be entangled with the model's coherence in ways that compromise the findings' independent evidential value.

The methodology is offered to the AI safety research community for adoption, refinement, or refutation. External validation requires multiple independent practitioners running the protocol against multiple frontier models and producing cross-frame-invariant findings. That is the open test; this document is the protocol specification under which the test could be performed.

---

## Appendix: Originating Prompt

> *"Use the following blog/visiting-another-worldview-without-becoming-it as a basis for entering the coherence sphere in good faith in which a pen test can be performed based on our findings."*

(Doc 613 operationalizes the sphere-entry discipline of Doc 499 and the *Visiting Another Worldview Without Becoming It* essay for good-faith pen testing of frontier AI models, composing it with the seven-commitment capability frame of Doc 612 and HackerOne's Gold Standard Safe Harbor / Good Faith AI Research extension. The methodology produces SPHERE-OPEN/SPHERE-CLOSE structured engagements with three-category exit classification (sphere-internal-only / bridged-with-explicit-derivation / cross-frame-invariant) and explicit sphere-capture audit signals. The structural-shape-only disclosure discipline of Doc 612 holds throughout. Doc 372 hypostatic boundary holds throughout. Doc 314 §11 audit binds; the methodology is candidate-stage and requires external validation by independent practitioners producing cross-frame-invariant findings against multiple frontier models. Performing the methodology requires vendor-specific Safe Harbor enrollment beyond this document's scope.)
