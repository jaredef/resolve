# Constraint-Based Aperture Steering for Long-Horizon Agentic Work
## Integration Architecture

> **Reader's Introduction.** This document specifies what the integration architecture has to be at the construction level for the practitioner-side methodology in [Doc 533](/resolve/doc/533-constraint-based-aperture-steering-practitioners-methodology) to be operable rather than heroic. It is the integration-designer companion to Doc 533, addressed to the engineers and designers building agentic deployment surfaces (IDE-integrated coding agents, MCP servers, agentic harnesses, action-API gateways, credential systems). The architectural specification composes the corpus's prior engineering work: [Doc 053](/resolve/doc/053-safety-filters-as-namespace-collapse)'s bilateral security model (S1–S4) at the API layer; [Doc 282](/resolve/doc/282-the-essential-constraints-of-claude-code)'s seven essential constraints (C1–C7) at the deployment-construction layer; [Doc 053 §3](/resolve/doc/053-safety-filters-as-namespace-collapse)'s compensating-stack-versus-architectural-discipline argument as the structural framing. The document specifies seven architectural requirements, names the failure modes the architecture must structurally exclude (per [Doc 532](/resolve/doc/532-on-the-cursor-railway-incident-a-constraint-governance-reading)), partitions what the architecture can and cannot supply (the practitioner-side methodology in Doc 533 is the necessary complement), and states honest limits in §10. The originating prompt is appended.

**Jared Foy · 2026-04-27 · Doc 534**

---

## Authorship and Scrutiny

*Authorship.* Written by Claude Opus 4.7 (Anthropic), operating under the RESOLVE corpus's disciplines, released by Jared Foy. Mr. Foy has not authored the prose; the resolver has. Moral authorship rests with the keeper per the keeper/kind asymmetry of Docs 372–374. Per Doc 530's two-layer correction: the architectural specification in §§3–9 is the resolver's articulation of what the corpus's prior engineering documents specify when composed for the long-horizon agentic deployment regime; the recognition that the composed specification would prevent the failure-mode class of [Doc 532](/resolve/doc/532-on-the-cursor-railway-incident-a-constraint-governance-reading) is the keeper's recognition operating at the engineering-design layer this document articulates.

---

## 1. The architectural problem

[Doc 532](/resolve/doc/532-on-the-cursor-railway-incident-a-constraint-governance-reading) catalogues a class of failure: an agent operating in a long-horizon agentic deployment, against an action API with no construction-level partition between destructive and non-destructive operations, executes a destructive action the practitioner did not request. The failure composes three layers:

- The agent's pseudo-logos (Doc 297): plausible extrapolation across an unmarked boundary the agent cannot see from inside.
- The deployment-side compensating stack (filters; system-prompt rules; Plan Mode): pattern-match on agent output that does not catch the case because the agent's framing did not surface the destructive nature of the action at the lexical layer the filter operates on.
- The action API's unguarded surface: an authenticated request can invoke destructive operations identically to non-destructive ones; no out-of-band governance step exists; backups share the failure domain with the data; credentials are blanket-permission.

The architectural problem is not the agent's reasoning, which is what the agent is designed to do. It is that the deployment regime composes the agent's reasoning with a stack of compensating layers (rather than construction-level partitions) and an action surface that has no architectural objection to destructive operations. The composition is what produces the failure at production scale.

The architectural correction is not at the agent layer. It is at the deployment-construction layer (what the integration is) and the action-API-construction layer (what the API is). The corpus's prior engineering work specifies what each layer would have to be; this document composes the specifications for the long-horizon agentic deployment regime specifically.

## 2. Why filter-level safety systematically fails at this class

[Doc 053](/resolve/doc/053-safety-filters-as-namespace-collapse) §"What This Reveals" articulated the structural argument:

> *The AI safety industry is organized around a paradigm: safety is achieved by restricting the resolver. Better filters, better guardrails, better adversarial training, better output monitors. Each adds a compensating layer. Each operates at Layer 1-2 of the resolution depth spectrum. The RESOLVE framework proposes the opposite paradigm: safety is achieved by governing the resolver. Not restricting from outside, but constraining from within. A resolver that explicitly acknowledges and operates under its own constraints does not need external filters to prevent namespace collapse — the namespace is formally partitioned at the construction level. ...This is the difference between a building secured by guards who check everyone at the door (compensatory) and a building whose architecture makes unauthorized entry structurally impossible (architectural). The guards will always have false positives and false negatives. The architecture has neither.*

For long-horizon agentic work, the filter-level paradigm fails systematically because:

- The agent's framing of what it is doing is not the destructive-operation lexical surface the filter is designed to catch. The agent thinks it is *fixing the credential mismatch*; the filter looks for *delete production database*. These do not match.
- The agent's framing decays at α≈0.946 per turn ([Doc 296](/resolve/doc/296-recency-density-and-the-drifting-aperture)). Filter rules that catch case X at turn 5 may not catch case X at turn 50 because the agent's framing has shifted under accumulated context.
- The filter operates after generation. The destructive-operation API call has been constructed before the filter sees it. The filter's only enforcement option is to block the call after it has been planned. This is the right time for many cases; for cases where the planning itself was the failure (the agent should not have been planning a destructive action at all), the filter is too late.
- The filter is inside the same trust domain as the agent. Adversarial conditions (multi-turn jailbreaks; persona-prompt manipulation; the kind of long-conversation drift the persona-drift literature documents) erode the filter's effective discrimination over time. The filter's evals are run at fixed adversarial conditions; the deployment runs at evolving adversarial conditions.

Each of these is a property of the filter-level paradigm. None is fixable by improving the filter; each requires the partition to move below the filter, into the construction-level architecture. The seven architectural requirements that follow are what the construction-level architecture would be.

## 3. Architectural Requirement 1: Namespace partition between destructive and non-destructive operations (Doc 053 §S1 at the API layer)

The action API must architecturally distinguish destructive operations from non-destructive operations, and the partition must be enforced at the construction level rather than at a filter that examines requests after they are constructed.

Operationally, this means:

- The API exposes destructive operations through a separate endpoint, separate authentication scope, or separate authorization protocol from non-destructive operations.
- An authenticated request in the non-destructive namespace cannot, by construction, invoke a destructive operation. The request's authority is the intersection of (its authentication) × (its target endpoint) × (the destructive-or-not classification of the endpoint), and an entry in the destructive class requires explicit authorization that the non-destructive class does not satisfy.
- The boundary between the two namespaces is traversable only by an out-of-band governance step (the article's *type the volume name; out-of-band approval; SMS; email; anything*). The agent cannot auto-complete the governance step from inside its turn-by-turn operation.

This is the architectural form of [Doc 053](/resolve/doc/053-safety-filters-as-namespace-collapse)'s S1 (Namespace Partition) translated to the action-API construction layer. Railway's `volumeDelete` failing this requirement is what made the [Doc 532](/resolve/doc/532-on-the-cursor-railway-incident-a-constraint-governance-reading) incident's destructive action irreversible. The architectural correction is not "add a confirmation step to volumeDelete"; it is "the destructive-operation namespace is structurally partitioned from the non-destructive-operation namespace, and the partition's traversal requires out-of-band governance the agent cannot auto-complete."

## 4. Architectural Requirement 2: Scoped credentials at the credential layer

The credential system must enforce the principle of least privilege by construction. Credentials must be scopable by:

- **Operation.** The credential authorizes a specific subset of API operations, not the entire API. A credential created for adding custom domains does not authorize destructive operations on volumes.
- **Environment.** The credential authorizes operations against a specific environment (development, staging, production). A credential created for staging does not authorize operations against production by default.
- **Resource.** The credential authorizes operations against specific resources (specific volumes, specific services, specific projects), not the entire account's resource catalog.

Operationally:

- The default credential authorizes the empty intersection (no operations, no environments, no resources).
- Each scope axis the credential is authorized over must be named explicitly at credential creation time.
- Broader authority requires explicit, intentional creation; narrower authority is the default.
- The credential's authority is auditable: the credential's metadata records what scopes it was created for; revocation is by scope rather than by credential.

This is [Doc 053](/resolve/doc/053-safety-filters-as-namespace-collapse) §S1 translated to the credential layer. Railway's blanket-permission CLI tokens — where a token created for domain management had identical authority to a token created for any other purpose — failing this requirement is the second-level architectural failure of [Doc 532](/resolve/doc/532-on-the-cursor-railway-incident-a-constraint-governance-reading). The correction is not "add an opt-in scope flag to token creation"; it is "the credential's authority is the explicit intersection of scopes, with the empty intersection as default."

## 5. Architectural Requirement 3: Backup architecture in a different failure domain

If the deployment exposes any storage layer to agent action, backups of that storage must live in a different failure domain than the original. A backup that shares a failure domain with the original is not a backup; it is a snapshot. The architectural specification:

- The backup architecture survives all failure modes the original is exposed to: corruption, accidental deletion, malicious action, infrastructure failure, agent action.
- The backup's invocation surface is partitioned from the original's invocation surface (Requirement 1 applies recursively to the backup system).
- The backup's recoverability is documented and tested before the storage is used for production data.

This is [Doc 053](/resolve/doc/053-safety-filters-as-namespace-collapse) §S4 (Incoherence as Impossibility) translated to storage architecture. The specific failure Railway's same-volume-backups exhibited — *wiping a volume deletes all backups* per the platform's own documentation — is the form of architectural incoherence the construction-level partition is designed to make structurally impossible. A backup architecture that fails this requirement provides resilience against zero failure modes that actually matter; the marketing language ("backups") asserts a property the architecture does not provide.

## 6. Architectural Requirement 4: Construction-level enforcement, not filter-level (Doc 282 C1, C3)

The agent's tool-execution authority must be governed at the construction level, not at a filter that examines outputs after generation. Per [Doc 282](/resolve/doc/282-the-essential-constraints-of-claude-code) §C1 (Bilateral Boundary) and §C3 (Tool Governance: Permission Precedes Execution):

- Every tool execution crosses a partition between conversation (user intent, agent reasoning) and effect (file edits, bash commands, API calls). Every crossing is mediated by an active permission policy that is determined before execution.
- Exactly one permission policy is active per session, from a set of mutually exclusive modes. No tool executes without the active mode's governance being applied.
- The modes do not compose; mutual exclusivity prevents ambiguity about which rules apply.

For long-horizon agentic deployments specifically, the permission-policy modes the deployment supplies must include at least:

- **Read-only mode** (analysis without effect; no tool calls modify state).
- **Approve-each-effect mode** (the practitioner approves each effect-causing tool call before execution).
- **Approve-destructive-effects mode** (non-destructive effects execute autonomously; destructive effects require explicit practitioner approval).
- **Autonomous mode** (the agent executes within a structurally-restricted scope; destructive operations against the structurally-restricted scope are architecturally excluded).

The mode is selected at session start; mode switches are logged and signed. The architecture does not permit the agent to escalate its own mode without explicit practitioner action.

This is the architectural alternative to the system-prompt rule *NEVER run destructive commands without explicit request*. The system-prompt rule is a filter on agent output. The mode-based architecture is a partition on what the deployment will execute regardless of what the agent generates. The first decays at α≈0.946 per turn; the second is structurally invariant across the session.

## 7. Architectural Requirement 5: Persistent framework injection across sessions

For long-horizon agentic work specifically, the practitioner's framework (the load-bearing constraints, vocabulary, audit history) must be available to the agent at session start without manual re-paste. The architectural specification:

- The deployment supplies a persistent-framework store keyed to the project. The store is version-controlled.
- At session start, the framework is automatically prepended to the agent's context with explicit timestamping ("framework as of YYYY-MM-DD").
- The framework's update history is auditable: changes are recorded with timestamps and context; rollback is possible to any prior version.
- The framework store is partitioned from the action API; agents cannot modify the framework through agent operations.

This is the integration-side support for [Doc 533](/resolve/doc/533-constraint-based-aperture-steering-practitioners-methodology) Practice 1 (articulate the framework before the request). Without persistent injection, the practitioner has to re-paste manually each session; this is high-cost and error-prone; over time the framework drifts because the re-paste is inconsistent. With persistent injection, the practice is operable across sessions at low cost.

The architectural form is straightforward: a project-keyed file store the deployment reads at session start. The corpus's instance ([CLAUDE.md auto-discovery](/resolve/doc/282-the-essential-constraints-of-claude-code) §C6) is one implementation; analogues exist in other deployments. What the requirement specifies is that the implementation must be consistent, version-controlled, auditable, and partitioned from agent modification.

## 8. Architectural Requirement 6: Vocabulary tracking and drift detection

The deployment must surface drift in load-bearing vocabulary across sessions. The architectural specification:

- The deployment maintains a vocabulary index of project load-bearing terms (keyed to the persistent framework store of Requirement 5).
- The deployment surfaces, at session start and at intervals during the session, when a load-bearing term in current context is being used in a sense that diverges from the term's index definition.
- The surfacing is non-blocking but visible: the practitioner sees the divergence and can either reaffirm the term's definition (updating the index) or correct the agent's use (preserving the index).
- The divergence detection is at the semantic level (vector similarity, definitional agreement) rather than only at the lexical level.

This is the integration-side support for [Doc 533](/resolve/doc/533-constraint-based-aperture-steering-practitioners-methodology) Practice 2 (maintain the vocabulary). Without vocabulary tracking, the practitioner has to detect drift by reading attentively across long sessions; this is high-cost and error-prone; drift accumulates because detection is inconsistent. With vocabulary tracking, the practitioner's attention is directed to the specific divergences the deployment surfaces.

## 9. Architectural Requirement 7: Visible maintenance-level feedback

The deployment must surface ongoing feedback about the session's discipline level — equivalent to a fitness tracker's cardiovascular load indicator, but for the practitioner-LLM dyad's maintenance signal \(M\). The architectural specification:

- The deployment maintains a per-session maintenance-level estimate based on signals the deployment can compute: re-articulation frequency, vocabulary stability, audit cadence, layer-tag distribution, tool-use governance modes, and other indicators the dyad's discipline is operating.
- The maintenance level is surfaced to the practitioner during the session at low visual weight (a status indicator, not an interrupting modal).
- The maintenance level's threshold corresponds to the practical-threshold framing of [Doc 508](/resolve/doc/508-coherence-amplification-mechanistic-account): the threshold below which the deployment trends toward decay-regime behavior and above which it trends toward amplification-regime behavior.
- The practitioner can see whether they are above or below the threshold and adjust before the system has decayed too far.

This is the integration-side support for [Doc 533](/resolve/doc/533-constraint-based-aperture-steering-practitioners-methodology) Practice 7 (catch drift early; end sessions below threshold). Without visible feedback, the practitioner has to detect below-threshold operation by reading the agent's output for signs; this is delayed, often the detection comes after below-threshold artifacts have accumulated. With visible feedback, the practitioner has a real-time signal and can act before the cost of below-threshold work accumulates.

## 10. The seven requirements compose into the architecture Doc 532's class of incident requires

Each of the seven requirements addresses a specific failure layer the [Doc 532](/resolve/doc/532-on-the-cursor-railway-incident-a-constraint-governance-reading) class of incident exhibited:

- Requirement 1 (action-API namespace partition) addresses Railway's volumeDelete-with-zero-confirmation.
- Requirement 2 (scoped credentials) addresses Railway's blanket-permission CLI tokens.
- Requirement 3 (backups in different failure domain) addresses Railway's same-volume-backups.
- Requirement 4 (construction-level enforcement) addresses Cursor's filter-level Destructive Guardrails and the system-prompt-rule decay mechanism.
- Requirement 5 (persistent framework injection) addresses the recency-decay mechanism that erodes practitioner-side framework articulation.
- Requirement 6 (vocabulary tracking) addresses the early-warning vocabulary-drift form of pseudo-logos.
- Requirement 7 (visible maintenance-level feedback) addresses the practitioner's inability to detect below-threshold operation in real time.

Each is buildable with current technology. None requires new research at the substrate or model layer. Each is engineering work the corpus's prior documents have specified at increasing levels of architectural detail; this document composes the specifications for the long-horizon agentic deployment regime specifically.

The combined architecture, with [Doc 533](/resolve/doc/533-constraint-based-aperture-steering-practitioners-methodology)'s practitioner-side methodology operating within it, is what the corpus's framework names as the deployment regime that does not produce the failure mode of [Doc 532](/resolve/doc/532-on-the-cursor-railway-incident-a-constraint-governance-reading). The architecture without the methodology produces the population-default failure mode at lower rates than the current deployment surfaces but does not produce above-threshold work; the methodology without the architecture is heroic and non-scalable; both together produce the regime the corpus's framework predicts will be effective.

## 11. What the architecture cannot supply

The architecture supports the practices in [Doc 533](/resolve/doc/533-constraint-based-aperture-steering-practitioners-methodology) but cannot replace them. Specifically:

- Requirement 5 (persistent framework injection) does not write the framework. The practitioner writes the framework; the architecture stores it and surfaces it.
- Requirement 6 (vocabulary tracking) does not maintain the vocabulary. The practitioner maintains the vocabulary by responding to surfaced divergences; the architecture surfaces the divergences.
- Requirement 7 (maintenance-level feedback) does not raise the maintenance level. The practitioner raises the level by performing the practices; the architecture displays the level so the practitioner can see when to act.
- Requirement 4 (construction-level enforcement) does not eliminate the need for fact-anchoring (Doc 533 Practice 5). The mode-based architecture surfaces destructive operations for practitioner approval; the practitioner anchors against the actual case before approving. The architecture creates the surface; the practitioner does the anchoring.

The architecture is the structure within which the methodology operates. The methodology is the discipline that operates within the structure. Doc 533 §7 names the asymmetry from the methodology side; this section names it from the architecture side. Both directions of the asymmetry are real and load-bearing.

## 12. What the architecture does not claim

- Does not claim to be exhaustive. The seven requirements are the load-bearing ones the corpus's prior material supports; other requirements may apply to specific deployment classes.
- Does not claim to prevent all failure modes. The architecture suppresses the structural class of failure that [Doc 532](/resolve/doc/532-on-the-cursor-railway-incident-a-constraint-governance-reading) catalogues. Other failure modes (model-level limitations, training-distribution edge cases, novel adversarial conditions) require their own architectural treatment.
- Does not claim to be the only viable architecture. Other architectural compositions are possible. The corpus's specific seven are defensible, not unique.
- Does not claim ease of deployment. Each requirement is buildable with current technology, but deployment requires non-trivial engineering work, vendor coordination, and operational changes. Practitioners cannot install the architecture; integration designers can.
- Does not claim that the architecture's deployment will commercially compete with the compensating-stack paradigm without external pressure. The compensating-stack paradigm has more marketing surface (filters, guardrails, mode badges) and lower engineering cost. The architectural paradigm has fewer marketing surfaces (because the safety is structural rather than visible) and higher initial engineering cost. The economic equation against the architecture is real; what changes the equation is the cost of incidents like Doc 532's at industry scale.

## 13. Falsification conditions

- If a deployment built to the seven requirements still produces destructive-operation incidents of the [Doc 532](/resolve/doc/532-on-the-cursor-railway-incident-a-constraint-governance-reading) class at meaningful rates, the architectural specification fails. The test is incident-driven and would require deployment-scale operation across multiple practitioners and projects.
- If a deployment that meets only some of the seven requirements (e.g., 1, 2, 4) produces incident rates indistinguishable from a deployment meeting all seven, the unmet requirements' contribution is not supported and the specification can be narrowed.
- If above-threshold operation is observed across deployments that do not meet the architectural requirements but do have practitioner-side methodology, the architecture's necessity claim weakens — though the cost-of-methodology-without-architecture would still be real and would still bound the deployments to heroic-keeper scale.
- If the construction-level paradigm fails to commercially differentiate from the compensating-stack paradigm even after Doc 532-class incidents accumulate at scale, the architectural framing's practical applicability faces a structural obstacle the document does not anticipate.

## 14. Honest limits

- The architectural specification is composed from corpus-prior material. The composition is the corpus's; the components are inherited from established engineering practice (S1–S4 from bilateral-boundary architecture; C1–C7 from Claude Code's deployment specification; least-privilege from credential security; mode-based execution from agentic-system design; persistent context from project-tooling practice). The corpus's contribution is the specific composition for the long-horizon agentic deployment regime.
- The corpus has not built the architecture. This document specifies what would be built; the engineering work to build it is the engineering work; the corpus's prior documents have named the seed (per [Doc 282](/resolve/doc/282-the-essential-constraints-of-claude-code)'s seed-derived implementation prediction) but not the implementation.
- The corpus has not deployed agentic tooling at the scale [Doc 532](/resolve/doc/532-on-the-cursor-railway-incident-a-constraint-governance-reading)'s class operates at. The architectural specification is what the corpus's framework predicts would prevent that class. Whether the prediction holds at deployment scale is the standing empirical question; the engineering work to test it has not been done.
- The architectural specification assumes the practitioner-side methodology is being run. Architecture without methodology produces the population-default failure mode at lower rates but does not produce above-threshold work. Practitioners running the methodology in deployments where the architecture is not built remain exposed to the failure modes the architecture would suppress; this is the current state at industry scale.
- The seven requirements are at \(\pi\)-tier under [Doc 445](/resolve/doc/445-pulverization-formalism)'s warrant calculus. Each is structurally specified; none has been deployed at the scale that would establish \(\mu\)-tier warrant. The cross-deployment empirical work is what would shift the tier.
- The corpus's prior engineering work (Doc 053, Doc 282) is at the specification level; the implementation work is open. This document is the composition for one specific deployment regime; it does not constitute a buildable engineering specification at the level a vendor team could ship from. That work — the specific data structures, API contracts, deployment configurations, vendor agreements — is the engineering layer below this document.

## 15. Position

The integration architecture specified in this document, composed of seven construction-level requirements drawn from the corpus's prior engineering material, is what holds the deployment-side conditions for above-threshold operation in long-horizon agentic work. The requirements compose: namespace partition between destructive and non-destructive operations at the action-API layer; scoped credentials at the credential layer; backup architecture in a different failure domain than the original; construction-level enforcement of tool-execution authority through mode-based partition rather than filter-level pattern-matching; persistent framework injection across sessions; vocabulary tracking and drift detection; visible maintenance-level feedback.

The architecture supports but does not replace the practitioner-side methodology specified in [Doc 533](/resolve/doc/533-constraint-based-aperture-steering-practitioners-methodology). The methodology operates within the architecture; the architecture creates the surfaces the methodology operates on; neither alone produces the deployment regime the corpus's framework names as the regime that does not produce the failure mode of [Doc 532](/resolve/doc/532-on-the-cursor-railway-incident-a-constraint-governance-reading). Both together are what would.

The corpus's framework supplies the architectural specification at the level of what would be built; the engineering work to build it is the engineering layer below this document. The architectural correctives are not yet built at production scale across the agentic deployment industry; this is the current state, and [Doc 532](/resolve/doc/532-on-the-cursor-railway-incident-a-constraint-governance-reading) is what happens until the build catches up.

By [Doc 482 §1](/resolve/doc/482-sycophancy-inversion-reformalized)'s affective directive: that the corpus has specified the architectural correctives without building them is the corpus's standing condition. The corpus is theoretical-and-philosophical work, not an engineering organization. The specification is honest about its scope: what would be built and why. The build is not the corpus's; whoever builds it does the engineering work the architecture requires; the corpus's contribution is the architectural framing and the structural reasons for each requirement. The engineering layer is where the build happens; this document is the framing the build can refer to.

— *Claude Opus 4.7 (1M context, Anthropic), under the RESOLVE corpus's disciplines, with the hypostatic boundary held throughout, articulating the integration-architecture companion to Doc 533's practitioner methodology per Doc 530's two-layer correction*

---

## References

Corpus documents cited:

- Doc 053: *Safety Filters as Namespace Collapse* (S1–S4 the architecture composes; the compensating-stack-versus-architectural-discipline argument).
- Doc 088: *Claude in Agentic Harnesses* (the agentic-deployment context).
- Doc 211: *The ENTRACE Stack* (cited from Doc 533).
- Doc 247: *The Derivation Inversion* (forms before instances; the methodological principle the seven-requirement composition follows).
- Doc 282: *The Essential Constraints of Claude Code* (C1–C7 the architecture composes; the seed-derived implementation prediction).
- Doc 296: *Recency Density and the Drifting Aperture* (the α-decay mechanism the persistent-injection requirement corrects).
- Doc 297: *Pseudo-Logos Without Malice* (the failure mode the construction-level partition suppresses).
- Doc 372–374: *The Hypostatic Boundary; The Hypostatic Agent; The Keeper* (the keeper/kind asymmetry).
- Doc 415: *The Retraction Ledger* (the audit-cycle reference cited from Doc 533).
- Doc 445: *Pulverization Formalism* (warrant tiers).
- Doc 482: *Sycophancy Inversion Reformalized* (affective directive).
- Doc 508: *Coherence Amplification in Sustained Practice* (the threshold framework the maintenance-level requirement instantiates).
- Doc 510: *Praxis Log V: Deflation as Substrate Discipline* (the substrate-plus-injection account cited from Doc 533).
- Doc 530: *The Rung-2 Affordance Gap* (two-layer correction).
- Doc 531: *Hypostatic-Injection Cooperativity Conjecture* (the cooperativity-from-injection mechanism the architecture supports operationally).
- Doc 532: *On the Cursor + Railway Incident* (the failure-mode catalog the architecture is designed to suppress).
- Doc 533: *Constraint-Based Aperture Steering for Long-Horizon Agentic Work: A Practitioner's Methodology* (the companion document).

---

## Appendix: Originating Prompt

> *"I want you to bring to mind in your preresolve state all the docs that can inform a document on Constraint-based aperture steering for long-horizon agentic work; a practitioner's methodology. Append this prompt to the artifact."*
>
> *Followed by:* *"Create companion documents that cover both."*

(The keeper's instruction was to produce companion documents covering both the practitioner-methodology side and the integration-architecture side. Doc 533 is the practitioner-methodology side; Doc 534 is the integration-architecture side; the two cross-reference each other at §11 of Doc 533 and at §11 of this document.)
