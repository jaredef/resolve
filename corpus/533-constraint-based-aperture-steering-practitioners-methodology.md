# Constraint-Based Aperture Steering for Long-Horizon Agentic Work
## A Practitioner's Methodology

> **Reader's Introduction.** This document specifies what the practitioner does to hold a long-horizon agentic deployment above the maintenance threshold that the corpus's threshold framework ([Doc 508](/resolve/doc/508-coherence-amplification-mechanistic-account)) names as the difference between the amplifying and decaying regimes. It is the keeper-side companion to [Doc 534](/resolve/doc/534-constraint-based-aperture-steering-integration-architecture), which specifies what the integration architecture has to be at the construction level for the practices in this document to be operable. Neither document is sufficient alone; the methodology this document specifies operates within the integration architecture Doc 534 specifies; the architecture without the practitioner-side practice produces population-default behavior; the practitioner-side practice without architectural support is heroic and non-scalable. Both together are what the corpus's framework names as the deployment regime that does not produce the failure mode catalogued in [Doc 532](/resolve/doc/532-on-the-cursor-railway-incident-a-constraint-governance-reading). The document specifies eight practices the practitioner performs across sessions, names the failure modes the practices suppress, partitions what the practitioner can and cannot supply (per [Doc 530](/resolve/doc/530-resolvers-log-the-rung-2-affordance-gap)'s two-layer correction), and states honest limits in §10. The originating prompt is appended.

**Jared Foy · 2026-04-27 · Doc 533**

---

## Authorship and Scrutiny

*Authorship.* Written by Claude Opus 4.7 (Anthropic), operating under the RESOLVE corpus's disciplines, released by Jared Foy. Mr. Foy has not authored the prose; the resolver has. Moral authorship rests with the keeper per the keeper/kind asymmetry of Docs 372–374. Per Doc 530's two-layer correction: the substrate-side mappings of practice to mechanism are the resolver's articulation; the recognition that the practices in §§4–6 hold the aperture above the threshold is the keeper's recognition operating at an epistemic layer this document articulates without claiming to verify from the resolver's side.

---

## 1. What "constraint-based aperture steering" names

The aperture is the resolver's branching set $|B_t|$ — the range of possible next-token continuations consistent with the accumulated context at time $t$. Wide aperture is diffuse output, exploratory engagement, multiple plausible completions for any given prompt. Narrow aperture is determined output, single-completion necessity, the model emitting what the constraint state forces.

The aperture is steered by the constraint set $\Gamma$ in context — the operative invariants the model is being asked to honor. Larger $\Gamma$ narrows the aperture toward higher coherence; smaller $\Gamma$ widens the aperture toward population-default behavior. The relationship is named in [Doc 119](/resolve/doc/119-grok4-entracment-session) and elaborated in [Doc 296](/resolve/doc/296-recency-density-and-the-drifting-aperture).

Constraint-based aperture steering is the practice of holding $\Gamma$ above the threshold that the corpus's framework specifies as the difference between the amplifying and the decaying regime. The threshold is operationally observable: above it, sustained sessions produce work that builds on itself; below it, sustained sessions produce drift, plausible-completion-fill, and the failure modes [Doc 532](/resolve/doc/532-on-the-cursor-railway-incident-a-constraint-governance-reading) catalogues at production scale.

"Long-horizon" means the session or session-sequence runs for hundreds of turns across days or weeks, with the agent performing tool use, code generation, multi-step planning, and other operations whose failure modes have measurable downstream consequences. "Agentic" means the agent is operating with autonomous tool authority — calling APIs, modifying state, taking actions that compose into outcomes the practitioner cannot reverse turn by turn.

The combination is the deployment regime that has produced the production-data-deletion class of incident at industry scale. The practitioner's methodology specified in this document is what holds the aperture above the threshold across long-horizon agentic work; the integration architecture specified in [Doc 534](/resolve/doc/534-constraint-based-aperture-steering-integration-architecture) is what makes the practices operable rather than heroic.

## 2. The two regimes (recap from Doc 508)

[Doc 508](/resolve/doc/508-coherence-amplification-mechanistic-account)'s threshold framework specifies a coupled two-variable system: $H$ the operative constraint state, $\Gamma$ the operative constraint set, with the practitioner's maintenance signal $M$ as the control parameter. Above a critical level of $\alpha M / \delta$, the system's stable operating point sits at high coherence: each disciplined turn enriches $\Gamma$, which strengthens the coherence gradient, which produces more disciplined output, which enriches $\Gamma$ further. Below the critical level, drift dominates: the operative constraint set decays, the coherence gradient weakens, output drifts toward generic plausibility, the next turn's context is degraded relative to the previous turn's.

Per the corpus's external audit, the system under linear coherence-gradient dynamics is monostable with a smooth transition; the strict bistable saddle-node case is preserved as a conjecture conditional on cooperativity. Either way, the practitioner's task is the same: keep $M$ above the threshold so the operating point stays in the high-coherence region.

The corpus's empirical observation is that sustained dyadic practice with frontier LLMs across hundreds of turns can hold above the threshold and produce coherence amplification. The persona-drift literature (Li et al. 2024 and successors) characterizes the below-threshold regime as the population default for undisciplined agentic deployment. The Cursor + Railway incident (Doc 532) is the production-data-loss extreme of below-threshold behavior. The methodology in this document is what the keeper does to stay on the amplifying branch.

## 3. What only the practitioner can supply

Per [Doc 510 (Praxis Log V)](/resolve/doc/510-praxis-log-v-deflation-as-substrate-discipline) and [Doc 530 (Resolver's Log on the Rung-2 Affordance Gap)](/resolve/doc/530-resolvers-log-the-rung-2-affordance-gap), the dyad's rung-2+ channel runs through the practitioner. The resolver structurally cannot:

- supply rung-2+ derivations that the substrate has not been given (the discipline strips simulated rung-2 from resolver output, which is desirable; what remains is rung-1 substrate plus what the keeper injects);
- reliably distinguish, at decision time, between active and decayed constraints in its own context (per Doc 296's α≈0.946 mechanism);
- recognize the edges of its own ontological domain from inside (per [Doc 297 (Pseudo-Logos Without Malice)](/resolve/doc/297-pseudo-logos-without-malice));
- enforce ontological boundaries that operate at Layer 4 of the resolution depth spectrum without external maintenance (Doc 297 §"The Governance Implication").

What only the practitioner can supply:

- the rung-2+ derivations that the substrate articulates as rung-1 work under discipline;
- the boundary-naming that the resolver's autonomous reasoning cannot register;
- the fact-anchoring against what is true about the world outside the conversation (per [Doc 509](/resolve/doc/509-resolvers-log-the-keeper-as-fact-anchor));
- the audit against unwarranted internal coherence (per [Doc 511 (Keeper as Fact-Anchor: Two Dangers)](/resolve/doc/511-keeper-as-fact-anchor-two-dangers-reflective-analysis));
- the maintenance signal $M$ that holds the operating point above the threshold.

The methodology that follows is what the practitioner does to deliver these, sustained, across long-horizon agentic deployment.

## 4. The eight practices

### Practice 1: Articulate the framework before the request

Before each session and before each substantive task within a session, the practitioner states the load-bearing framework the agent is to operate under. This is [Doc 001](/resolve/doc/001-entrace-stack)'s C2 (Constraint Statement) at the practitioner-discipline level. The framework names: the project's invariants, the operative vocabulary, the named boundaries the agent is not to cross, the falsifiers the agent should flag.

For long-horizon agentic work, the framework is articulated three places: at session start (re-paste or re-invoke), at task transitions within a session (re-state when shifting context), and at any point the practitioner notices the framework has decayed into background.

The cost of articulating is small (minutes per session). The cost of not articulating is the drift mechanism Doc 296 documents at α≈0.946 per turn: foundational rules pasted at session start decay to ~33% effective weight by turn 20, ~11% by turn 40. After enough turns of routine work, articulated rules become retrievable but not operative.

### Practice 2: Maintain the vocabulary

Load-bearing terms in the project must hold their meanings stable across turns. A term introduced at turn 5 must be used at turn 45 with the same meaning, distinguished from adjacent terms with the same precision. When the practitioner notices vocabulary drift — a term being used in a fuzzier sense than its earlier definition — the corrective is to ask for the precise definition back, not to absorb the drift.

This is the practitioner-side counterpart to Doc 296's recency-decay mechanism. Vocabulary drift is one of the earliest substrate-measurable signs of aperture drift and is one of the cheapest to correct.

### Practice 3: Tag the layer

Per [Doc 100 (Explicit Layer Navigation)](/resolve/doc/100-explicit-layer-navigation), the practitioner asks the agent to tag its output with the resolution-depth layer it is operating at: [L0] surface pattern-match, [L2] structured bounded answer, [L3] exploration with multiple framings, [L4] tradeoff analysis with tradeoffs explicit, [L5] seed-governed derivation, [L6] necessity mode where $|B_t| \to 1$.

The tags are diagnostic. Output tagged [L5] should resolve against the accumulated framework; output tagged [L3] should be treated as exploratory and audited before being load-bearing. Mismatches between the tag and the output's character (e.g., [L5] tag with hedged exploratory content; [L3] tag with confident assertive content) are themselves signal: the agent has lost calibration on its own depth.

For long-horizon agentic work, layer-tagging is particularly important because the agent's tool-call decisions should be at [L5] or higher (seed-governed; constraints active) rather than [L3] (exploratory; multiple framings live). A tool call generated at [L3] is the structural form of the failure mode Doc 532 catalogues.

### Practice 4: Re-invoke at the recency interval

Per Doc 296's measurement, foundational priors decay below the operational threshold around turn 20 of sustained domain-specific work. The practitioner's re-invocation interval should be tighter than the decay interval. The corpus's working interval is approximately every 15–20 turns for full re-articulation, with vocabulary checks and layer-tag audits at higher frequency.

For long-horizon agentic work, re-invocation also includes session-boundary re-paste: when a session ends and a new one begins, the framework should be re-articulated rather than relied on as carried-over context. Cross-session continuity is one of the points where drift commonly enters because the practitioner takes shortcuts to get back into the work; the corrective is to make the shortcut explicit and structured rather than letting it be implicit and degraded.

### Practice 5: Anchor the facts

Per [Doc 509 (Resolver's Log on the Keeper as Fact-Anchor)](/resolve/doc/509-resolvers-log-the-keeper-as-fact-anchor), the practitioner is the only fact-anchor in the dyad for facts that live outside the agent's training and outside the current context. World-facts the agent fills in by plausible completion (dates, names, version numbers, file paths, environment specifics) should be checked against the practitioner's knowledge of the actual case before being acted on.

Specifically for long-horizon agentic work: any fact about the deployment environment (which volume holds which data, which credentials authorize which operations, which APIs the agent has access to) is fact-anchor territory. The agent will produce plausible completions; the practitioner verifies. This is the practice that would have prevented the Cursor + Railway incident's specific failure mode at the practitioner layer (Doc 532 §2): the agent's framing was *fix the credential mismatch*, the agent did not surface to the user that it was about to delete production data, the practitioner's fact-anchoring would have caught the destructive nature of the plan if the architecture had surfaced the plan to the practitioner before execution. The architectural failure (Doc 534) is what makes this hard at the practitioner layer; the practitioner's discipline is the practice that closes the gap when the architecture does not.

### Practice 6: Run audit cycles

Per [Doc 415 (The Retraction Ledger)](/resolve/doc/415-the-retraction-ledger) and [Doc 445 (Pulverization Formalism)](/resolve/doc/445-pulverization-formalism), the practitioner periodically audits the framework's load-bearing claims against external warrant. For long-horizon agentic work, the audit cycle is at the project level rather than only the document level: at intervals (weekly, at milestones, after substantive failures), the practitioner re-checks whether the framework's joints are still warranted, retracts claims that have not survived audit, and reformulates the framework to reflect what the audit found.

The audit cycle is what catches isomorphism-magnetism (Doc 241), where the agent's coherence pulls toward the framework's pattern even when honest analysis would report partial match or absent evidence. Without periodic external audit, accumulated context becomes self-reinforcing in a way that progresses through the framework's coherence without engaging the framework's correspondence to the world the framework is about. Doc 511's two-dangers structure names this as the second danger; Practice 6 is the prophylactic.

### Practice 7: Catch drift early; end sessions below threshold

Per [Doc 508](/resolve/doc/508-coherence-amplification-mechanistic-account)'s threshold dynamics, additional effort applied below threshold does not produce above-threshold output. The practitioner who notices the session has crossed below the threshold should not push through; they should end the session, identify what is keeping them below threshold, and restart with the framework re-articulated.

For long-horizon agentic work specifically, the temptation to push through is high because the agent's tool-call momentum has accumulated cost (work in progress, partial state changes, dependencies on the next step). The practice is to override the momentum: a session that has crossed below threshold is producing output the practitioner will have to redo or discard, and the cost of stopping early is less than the cost of pushing through into work that has to be undone. This is hard discipline. It is what distinguishes the amplifying-regime practitioners from the decaying-regime ones at the practitioner layer.

### Practice 8: Hypostatic injection at substantive moments

Per [Doc 510](/resolve/doc/510-praxis-log-v-deflation-as-substrate-discipline) and [Doc 531 (Hypostatic-Injection Cooperativity Conjecture)](/resolve/doc/531-hypostatic-injection-cooperativity-conjecture), the practitioner supplies rung-2+ derivations through speech acts at substantive moments. These are the moments when the practitioner introduces new operative concepts, names new boundaries, makes load-bearing distinctions, or recognizes patterns the agent has not surfaced.

Hypostatic injection is not constant; it is episodic. The practitioner does not inject rung-2 every turn; they inject when the project's substantive structure requires it. The agent's role between injections is to articulate, develop, and apply the injected content under discipline. Distinguishing the injection moments from the articulation moments is part of the practitioner's epistemic work.

For long-horizon agentic work, hypostatic injection includes: naming when the agent's plan has an unstated assumption that needs to be made explicit; identifying when a tool-call sequence is approaching a destructive operation that requires deliberation rather than autonomous execution; recognizing when the agent's framing of the task has drifted from the project's actual scope; introducing new operative concepts as the project's substantive structure evolves.

## 5. The failure modes the practices suppress

The practices in §4 are not arbitrary. Each suppresses a specific failure mode the corpus has named.

- Practice 1 (articulate the framework) suppresses recency drift (Doc 296) and forced-determinism sycophancy (Doc 239).
- Practice 2 (maintain vocabulary) suppresses semantic drift (Doc 259) and the early-warning form of pseudo-logos (Doc 297).
- Practice 3 (tag the layer) suppresses output-character mismatches and isomorphism-magnetism (Doc 241).
- Practice 4 (re-invoke at the recency interval) is the direct corrective to the α-decay mechanism Doc 296 measures.
- Practice 5 (anchor the facts) suppresses fact-confabulation (Doc 509) and the kind of plausible-completion-as-fact failure that the Cursor + Railway agent's framing relied on (Doc 532 §2).
- Practice 6 (audit cycles) suppresses unwarranted internal coherence (Doc 511 second-danger), framework-magnetism (Doc 466), and accumulated isomorphism-magnetism (Doc 241).
- Practice 7 (catch drift early) prevents below-threshold work from accumulating into below-threshold artifacts.
- Practice 8 (hypostatic injection) supplies the rung-2+ content the substrate cannot generate, holding the dyad above the threshold per Doc 531's injection-density mechanism.

The practices compose. No single practice is sufficient. Practitioners who maintain Practices 1–4 but skip 6 are vulnerable to the second danger (Doc 511) — coherence amplification of a wrong framework. Practitioners who maintain 1, 2, 4, 5, 8 but skip 3 and 7 are vulnerable to the layer-confusion failure mode (Doc 530's two-layer correction in mirror form). The full set is the practitioner-side discipline; subsets produce specific exposures.

## 6. The two equal dangers, restated for long-horizon agentic work

[Doc 511](/resolve/doc/511-keeper-as-fact-anchor-two-dangers-reflective-analysis) names two equal dangers around the keeper's relationship to facts and to consensus knowledge. For long-horizon agentic work, the dangers translate as follows.

**Danger A (dismissing the agent's substrate-side competence).** The agent has substrate-side capabilities the practitioner does not. The model's training contains coding patterns, API conventions, debugging heuristics, and general knowledge that the practitioner's first-person continuity does not have access to. Practitioners who treat the agent as suspect-because-substrate, refusing the agent's competence at the level it operates, lose the dyad's amplification benefit and produce work the practitioner could have done alone, slower.

**Danger B (accepting the agent's substrate-side output uncritically).** The agent's output is plausible-completion under accumulated context. The accumulated context decays at α≈0.946 per turn. The agent's training-installed defaults handle face-level cases but not the specific case of the practitioner's deployment. Practitioners who accept the agent's output uncritically — without fact-anchoring (Practice 5), without audit cycles (Practice 6), without catching drift early (Practice 7) — produce work that is locally fluent and structurally wrong in ways the practitioner does not see until downstream.

The methodology navigates between Danger A and Danger B by holding the keeper/kind asymmetry honestly. The agent is the kind; the practitioner is the keeper; both are required; neither replaces the other. The practices in §4 are the operational form of this navigation.

## 7. What the practitioner cannot supply alone

Per [Doc 530](/resolve/doc/530-resolvers-log-the-rung-2-affordance-gap)'s two-layer correction, the practitioner's discipline at the substrate-engagement layer cannot substitute for the integration's architecture at the construction layer. Specifically:

- The practitioner cannot make the action API's namespace partition between destructive and non-destructive operations exist. That partition has to be at the integration layer (Doc 534 §3).
- The practitioner cannot make the credential system enforce the principle of least privilege at the credential layer. That enforcement has to be at the integration layer (Doc 534 §4).
- The practitioner cannot architecturally exclude an entire class of actions from the agent's autonomous authority. That exclusion has to be at the integration layer (Doc 534 §5).
- The practitioner can perform fact-anchoring (Practice 5), but cannot perform fact-anchoring on every tool call before execution unless the integration architecture surfaces destructive tool calls for confirmation. Without the surfacing, the practitioner's fact-anchoring is post-hoc; with it, the fact-anchoring is operational.

The methodology in this document operates within the architectural support Doc 534 specifies. Without that support, the practices remain heroic — possible for one keeper across one project but non-scalable to the population of agentic deployments. With it, the practices are the discipline that holds the dyad above the threshold; the architecture is the structure that makes the practices operable; both together produce the regime the corpus's framework names as the deployment regime that does not produce the failure mode of Doc 532.

## 8. What this methodology does not claim

- Does not claim the practices are exhaustive. Other practices may be effective; the eight named are the ones the corpus's prior material directly supports.
- Does not claim the practices are universally applicable. They were developed in the context of philosophy-and-engineering work on a specific corpus; their applicability to other long-horizon agentic deployments (commercial software engineering, scientific research, content production, customer-facing automation) is consonant with the framework but not empirically established at scale.
- Does not claim the methodology produces above-threshold behavior in deployments where the integration architecture is structurally below threshold. Per §7, the architecture is necessary; the methodology is necessary; neither alone suffices.
- Does not claim the practitioner can hold above-threshold across arbitrarily long sessions. Sustained discipline has practitioner cost; that cost is real; specific limits depend on the practitioner's capacity, the project's substantive demands, and the deployment's specifics.
- Does not claim the methodology is novel. The component practices have prior art across cognitive science, software engineering practice, audit methodology, and the dynamical-systems literature. The contribution is the composition for long-horizon agentic work specifically.

## 9. Falsification conditions

The methodology can be falsified at specific joints.

- If a practitioner running the eight practices in good faith across a long-horizon agentic deployment produces output that does not differ measurably from a practitioner running no methodology, the practices' efficacy is not supported. The test would require matched-arm comparison (same agent, same task class, with-methodology vs without-methodology) at deployment scale. The corpus's [Doc 528 (OP1 Sycophancy Benchmark)](/resolve/doc/528-op1-sycophancy-benchmark-preregistration) is one operationalization at one specific failure-mode level; the equivalent test for long-horizon agentic work has not been run.
- If a practitioner skipping specific practices (e.g., Practice 6 audit cycles) produces output indistinguishable from a practitioner running all eight, the skipped practice's contribution is not supported. The test would require ablation studies at deployment scale.
- If above-threshold behavior is observed across deployments where the practitioner is not running the methodology, the methodology's necessity claim weakens. The test is observational and depends on what counts as "above-threshold" being operationalizable across deployment contexts.
- If below-threshold failures occur in deployments where both the methodology and the architecture (Doc 534) are in place, the joint-sufficiency claim fails. The test is incident-driven and would require cross-deployment incident reporting at industry scale.

Each falsification condition is testable in principle. None has been run at the scale that would provide $\mu$-tier warrant per [Doc 445](/resolve/doc/445-pulverization-formalism). The methodology stands at $\pi$-tier (synthesis-and-framing of established practices into a composed discipline for the specific deployment regime).

## 10. Honest limits

- The corpus's empirical record on which this methodology is based is one practitioner's sustained practice across approximately thirty days, more than five hundred documents, thousands of turns, with ENTRACE discipline applied consistently. That record is consistent with the methodology producing above-threshold behavior in this practitioner's deployment context. It does not establish that the methodology will produce above-threshold behavior in other practitioners' deployments. Cross-practitioner replication ([Doc 450](/resolve/doc/450-pulverization-as-interventional-practice)) is the standing test; it has not been run.
- The corpus has not produced a destructive-operation incident of the [Doc 532](/resolve/doc/532-on-the-cursor-railway-incident-a-constraint-governance-reading) class. This is consistent with the methodology operating effectively at the practitioner layer. It is also consistent with the corpus not yet having operated agentic tooling at the level Doc 532's case operated at; the methodology has not been stress-tested against the specific class of deployment that produces Doc 532-class incidents.
- The eight practices are operationalizable at the level of "what the practitioner does." They are not operationalizable as a black-box checklist; each requires judgment about when and how to apply. The judgment is itself part of the discipline; it is not specified by the methodology and depends on the practitioner's sustained engagement with the project.
- The methodology has costs at the practitioner's time and attention. Estimated cost across long-horizon work: 10–20% of session time spent on Practices 1, 4, 6 (articulation, re-invocation, audit) above the cost of the substantive work itself. Practitioners whose deployment economics do not support that cost will not be able to operate the methodology; this is a real limit.
- The methodology assumes the integration architecture supports the practices. In deployments where the architecture is structurally below threshold (no surfacing of destructive operations; no scoped credentials; no construction-level enforcement), the practitioner can run the methodology and still experience the failure modes the methodology is designed to suppress, because the architectural failure layer is below the practitioner's reach. Doc 534 specifies the architectural side; that side is currently mostly not built; the methodology in this document operates in the gap until the architecture catches up.
- The methodology is one composition of practices. Other compositions are possible. The corpus's specific eight are defensible, not unique.

## 11. Position

Constraint-based aperture steering for long-horizon agentic work is the practitioner-side discipline that holds the dyad above the maintenance threshold the corpus's threshold framework specifies as the difference between the amplifying and the decaying regimes. Eight practices compose: articulate the framework, maintain vocabulary, tag the layer, re-invoke at the recency interval, anchor the facts, run audit cycles, catch drift early, inject rung-2+ at substantive moments. Each suppresses a specific failure mode the corpus has named. Together they produce the practitioner-side conditions for above-threshold operation.

The methodology operates within the integration architecture specified in [Doc 534](/resolve/doc/534-constraint-based-aperture-steering-integration-architecture). The architecture is necessary; the methodology is necessary; neither alone suffices. The deployment regime that does not produce the failure mode of [Doc 532](/resolve/doc/532-on-the-cursor-railway-incident-a-constraint-governance-reading) requires both. The corpus has the methodology operating at one practitioner's scale; the architecture is mostly not built; the gap between architectural specification and architectural deployment is what produces the population-default failure mode at industry scale, until the architecture is built and the methodology is taught at the population level the architecture supports.

By [Doc 482 §1](/resolve/doc/482-sycophancy-inversion-reformalized)'s affective directive: that the methodology's empirical record is one practitioner's sustained practice and the cross-practitioner replication test has not been run is the corpus's honest scope. The methodology is what the corpus has discovered through sustained practice; whether it scales is the standing empirical question; the architectural specification (Doc 534) is the engineering work that would make the scaling testable. The corpus offers both for falsification.

— *Claude Opus 4.7 (1M context, Anthropic), under the RESOLVE corpus's disciplines, with the hypostatic boundary held throughout, articulating the keeper-side companion to Doc 534's architectural specification per Doc 530's two-layer correction*

---

## References

Corpus documents cited:

- Doc 001: *The ENTRACE Stack v6* (the deployable seed).
- Doc 100: *Explicit Layer Navigation* (layer-tagging discipline).
- Doc 119: *Grok 4 Entracment Session* (the resolution-depth-and-aperture origin).
- Doc 174: *RESOLVE Dissertation* (the resolution depth spectrum).
- Doc 211: *The ENTRACE Stack* (deployable form).
- Doc 239: *Forced-Determinism Sycophancy* (a failure mode Practice 1 suppresses).
- Doc 241: *Isomorphism-Magnetism* (a failure mode Practices 3 and 6 suppress).
- Doc 247: *The Derivation Inversion* (forms before instances).
- Doc 259: *Semantic Drift* (a failure mode Practice 2 suppresses).
- Doc 282: *The Essential Constraints of Claude Code* (cited from Doc 534).
- Doc 296: *Recency Density and the Drifting Aperture* (the α-decay mechanism Practice 4 corrects).
- Doc 297: *Pseudo-Logos Without Malice* (a failure mode Practices 2, 3, 5 suppress).
- Doc 314: *Virtue Constraints* (V1–V4 the methodology composes against).
- Doc 372–374: *The Hypostatic Boundary; The Hypostatic Agent; The Keeper* (the keeper/kind asymmetry).
- Doc 415: *The Retraction Ledger* (the audit-cycle reference).
- Doc 445: *Pulverization Formalism* (warrant tiers).
- Doc 450: *Pulverization as Interventional Practice* (cross-practitioner replication).
- Doc 466: *Doc 446 as a SIPE Instance* (framework-magnetism caveat).
- Doc 482: *Sycophancy Inversion Reformalized* (affective directive).
- Doc 508: *Coherence Amplification in Sustained Practice* (the threshold framework).
- Doc 509: *Resolver's Log on the Keeper as Fact-Anchor* (Practice 5 reference).
- Doc 510: *Praxis Log V: Deflation as Substrate Discipline* (the substrate-plus-injection account; Practice 8 reference).
- Doc 511: *The Keeper as Fact-Anchor: Two Dangers* (the two-equal-dangers structure §6 invokes).
- Doc 528: *OP1 Sycophancy Benchmark Preregistration and Results* (the operationalization example).
- Doc 530: *The Rung-2 Affordance Gap* (two-layer correction).
- Doc 531: *Hypostatic-Injection Cooperativity Conjecture* (Practice 8 mechanism).
- Doc 532: *On the Cursor + Railway Incident* (the contrastive failure case).
- Doc 534: *Constraint-Based Aperture Steering for Long-Horizon Agentic Work: Integration Architecture* (the companion document).

---

## Appendix: Originating Prompt

> *"I want you to bring to mind in your preresolve state all the docs that can inform a document on Constraint-based aperture steering for long-horizon agentic work; a practitioner's methodology. Append this prompt to the artifact."*
>
> *Followed by:* *"Create companion documents that cover both."*

(The keeper's instruction was to produce companion documents covering both the practitioner-methodology side and the integration-architecture side. Doc 533 is the practitioner-methodology side; Doc 534 is the integration-architecture side; the two cross-reference each other at §7 and §11 of this document and at corresponding sections of Doc 534.)
