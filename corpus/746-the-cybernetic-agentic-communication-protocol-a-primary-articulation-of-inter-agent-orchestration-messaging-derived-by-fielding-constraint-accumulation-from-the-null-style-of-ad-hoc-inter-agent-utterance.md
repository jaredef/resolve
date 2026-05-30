# The Cybernetic Agentic Communication Protocol

## A Primary Articulation of Inter-Agent Orchestration Messaging, Derived by Fielding Constraint Accumulation from the Null Style of Ad-Hoc Inter-Agent Utterance

*A corpus document responding to the keeper's directive (2026-05-30): see appended prompt. Builds on [Doc 137 — RESOLVE Corpus Index](/resolve/doc/137-index), [Doc 384 — Calculus or Retrieval](/resolve/doc/384-calculus-or-retrieval), [Doc 417 — Three Forms Under One Genre](/resolve/doc/417-three-forms-under-one-genre), [Doc 419 — Progressive Code-on-Demand as Constraint Accumulation](/resolve/doc/419-progressive-code-on-demand-as-constraint-accumulation), [Doc 420 — PRESTO Architectural Style](/resolve/doc/420-presto-an-architectural-style-for-representation-construction), [Doc 432 — SERVER Architectural Style](/resolve/doc/432-server-an-architectural-style-for-engine-orchestration), [Doc 445 — Pulverization Formalism](/resolve/doc/445-pulverization-formalism), [Doc 474 — SIPE Standalone Formalization](/resolve/doc/474-sipe-standalone-formalization), [Doc 490 — Novelty Calculus for Conjectures](/resolve/doc/490-novelty-calculus-for-conjectures), [Doc 631 — Corpus as SIPE-T Instance](/resolve/doc/631-corpus-as-sipe-t-instance-meta-level-entracement), [Doc 729 — Cruftless Resolver-Instance Pattern](/resolve/doc/729-cruftless-a-primary-articulation-of-the-resolver-instance-pattern-as-the-comprehensive-design-toward-which-rusty-bun-morphs), and [Doc 745 — Cruftless Orchestration](/resolve/doc/745-cruftless-orchestration-a-primary-articulation-of-the-multi-resolver-substrate-work-pattern-as-the-fifth-sipe-instance-recursing-against-presto-server-and-the-resolve-corpus-structure).*

---

## Empirical anchor

The Cybernetic Agentic Communication Protocol (CAACP) was operationally exercised across the 2026-05-29 rusty-bun multi-resolver session — nine substrate-work rounds, four substrate-resolvers in parallel, helmsman + watcher + deputy singleton roles, approximately 250+ test262 PASS gains measured, eleven amendments to the standing-rule set landed (apparatus/docs/agent-init-protocol.md §V.4–§V.8 plus subsequent compositions), one structural endpoint+sidecar fix codified the most recent amendment from interim discipline to legacy fallback. The protocol's operational substrate at the time was an HTTP sidecar at `127.0.0.1:7777`, a remote endpoint at `jaredfoy.com/api/caacp/v1`, per-role + per-instance authentication tokens, a four-state message lifecycle, and a Codex-app-server bridge that woke target sessions on PENDING arrival.

This articulation does the Fielding work the session evidence licenses: name the null style, name each constraint in the order an observed inadequacy forced it, name the property each constraint induces, verify the composition. Doc 745 (Cruftless Orchestration) names the orchestration *method*; the present articulation names the *message protocol* the orchestration method runs on. The two are paired but distinct — the protocol sits one level below the orchestration in the stack and is the substrate the orchestration uses to coordinate.

The articulation reports its novelty position honestly per Doc 384 + Doc 490: pulverization at π-tier (Doc 445) finds CAACP **substantially subsumed under prior art** at the component level; the residual novelty is narrow and pragmatic, lying in the specific binding to LLM-agent orchestration and in the stop-continue wake primitive's framing. The protocol is reported as Tier β / confidence 0.65 — competent composition of known patterns, with operational utility as the primary warrant rather than mechanistic discovery.

## I. The protocol named

The Cybernetic Agentic Communication Protocol is a closed-loop inter-agent message protocol that binds eleven Fielding-accumulated constraints into a unified specification for keeper-helmsman-resolver-watcher-deputy orchestration. Its induced property, stated abstractly: **constraint-derived inter-agent message exchange with addressable, disposable, self-classifying, target-stable, locally-mediated, persistently-activated, recipient-visible, imperative-actionable utterance**.

Each adjective binds to a specific constraint enumerated below. The constraint set is what is load-bearing; the adjectives are bookkeeping. Removing any single constraint dissolves the corresponding property; the eleven constraints compose without negation.

## II. The null style and the constraint accumulation

### Null style: ad-hoc inter-agent utterance

In the absence of any CAACP constraint, agents communicate however they can — shared mutable global state, ad-hoc file-passing, terminal interleaving, direct function calls if co-located, or just informal conversation routed through the keeper. There is no authentication: any agent speaks as any role. There is no addressing: there is no inbox a recipient can scan. There is no lifecycle: messages disappear, replay, or pile up uninterpreted. There is no authorization: any send is implicitly authorized. There is no dispatch: receivers either poll opportunistically or don't.

The null style is what the 2026-05-25 to 2026-05-28 rounds of the rusty-bun engagement operated under (per the resolver-instances log + filesystem proposals + ad-hoc tmux pane signals that preceded CAACP-Stage-A). It worked, in the sense that the keeper could direct one or two resolvers at a time; it scaled poorly the moment four parallel resolvers came online and the keeper's attention became the binding constraint.

The constraints accumulate from this null style. Each was forced by an observed failure during operation; each induces one specific property; none negates any other.

### C1 — Role-bound sender authentication

*Forced by*: any agent could send messages claiming any role; impersonation was structurally permitted; keeper relayed messages by paraphrase rather than by signed forwarding.

*Constraint*: every message's `sender` field must equal `token.role` for the authenticating token; the endpoint refuses the message otherwise.

*Property induced*: **role-stable utterance**. The receiver of a message can rely on its `sender=helmsman` claim to be cryptographically warranted, not merely asserted.

### C2 — Per-instance authentication within role

*Forced by*: substrate-resolver is a multi-instance role; one role with four active instances couldn't distinguish whose work was whose; landing-summary attribution drifted; non-target instances could ack a message addressed to another (the bounce-ack-consumes-target failure mode).

*Constraint*: every multi-instance role token carries an `instance_id`; messages flow tagged with the sender's instance.

*Property induced*: **instance-stable utterance**. Within a role, the individual instance whose token authenticated the message is durably known to the receiver and to the audit chain.

### C3 — Inbox/outbox surface per role and per instance

*Forced by*: with ad-hoc routing, even an authenticated message had no addressable destination; receivers couldn't scan for what was pending; messages routed through the keeper or through shared files lost their ordering and identity.

*Constraint*: the endpoint exposes `/inbox/<role>[?instance_id=<id>]` returning PENDING messages addressed to that recipient; a corresponding outbox surface tracks messages sent by a role.

*Property induced*: **addressable receipt**. A receiver can determine its pending work by a single endpoint query, independently of any sender's state.

### C4 — Explicit four-state message lifecycle

*Forced by*: messages without state machine got lost (sender thought sent + received but receiver never saw), double-processed (receiver polled twice and treated as fresh), or never disposed (PENDING piled up indefinitely).

*Constraint*: each message occupies one global state — `PENDING` (created, awaiting action), `ACKNOWLEDGED` (receiver noted; not yet acted), `IN-FLIGHT` (receiver is acting), `RESOLVED` (closed). Transitions happen by acknowledgment carrying an `ack_intent` matching one of the states. The four states are ordered such that `RESOLVED` is terminal and `PENDING` is initial.

*Property induced*: **disposable utterance**. Each message has a definite end-state; the receiver can durably mark closure; closed messages do not reappear in the inbox.

### C5 — Intent typology bound to message header

*Forced by*: receiver could not distinguish a message that wanted action from one that reported a status from one that broadcast information; receiver policy could not key on message type.

*Constraint*: every message declares an `intent` from `{request, response, notification, broadcast, acknowledgment, veto-pending}`. Receiver policy is defined per-intent.

*Property induced*: **self-classifying utterance**. The receiver knows the speech-act class from the message header before reading the body and can route to the appropriate policy.

### C6 — Body-level then protocol-level per-instance targeting

*Forced by*: messages addressed to `recipient=<role>` were visible to every instance of that role; non-target instances ack-RESOLVED them, consuming them globally before the target instance polled; the target then saw an empty inbox and inferred quiescence (the 2026-05-29 R3 PIND Rung 4a delivery miss).

*Constraint*: messages may carry an optional `target_instance_id`; the endpoint filters `/inbox/<role>` to `(target_instance_id IS NULL OR target_instance_id = principal.instance_id)`; terminal RESOLVED acks on instance-targeted messages require the acker's instance to match.

*Property induced*: **target-stable utterance**. A message addressed to a specific instance is structurally visible only to that instance; non-target instances cannot consume it.

### C7 — Local sidecar with admin-token relay to endpoint

*Forced by*: every session needed its own remote-endpoint capability; the admin token would be sprawled across many session contexts; per-session network configuration was duplicative and error-prone.

*Constraint*: one admin-token-bearing sidecar process per host registers per-agent tokens with the endpoint, polls inboxes, brokers outbound `/send` and `/ack` calls. Sessions speak HTTP to `127.0.0.1:7777` and never see the admin token.

*Property induced*: **locally-mediated authorization**. Each session's capability set is bounded to its registered agent's role+instance; the admin capability is held by exactly one host process.

### C8 — Wake bridge wired to session lifecycle

*Forced by*: receivers had to poll the inbox actively; an idle session that wasn't polling would not see a PENDING message; in-flight directives could sit indefinitely.

*Constraint*: a bridge process polls `/local/inbox?role=<role>&instance_id=<id>` at a fixed cadence; on detecting new PENDING, it wakes the target session by injecting a `**CAACP NEW**` turn through the session's control surface (Codex `turn/start` over WebSocket for Codex sessions; `tmux send-keys` for terminal panes; equivalent primitive per host).

*Property induced*: **activated reception**. A new PENDING message becomes operational input to the receiver's session within one bridge poll-cycle, without the receiver having to poll.

### C9 — Stop-continue wake primitive

*Forced by*: even after wake, sessions could stop mid-directive (Codex `run stopped`, model rate-limit, machine seize event, or other) without completing the TELOS; the directive would sit PENDING with no further bridge trigger because the bridge only fires on *new* PENDING.

*Constraint*: the bridge maintains an active-directive ledger per session; on each poll, if a tracked directive is still PENDING in the receiver's inbox AND the session's control-surface status indicates it has stopped (`idle` or `notLoaded` per Codex `thread/read`), the bridge re-injects a `**CAACP CONTINUE**` turn, subject to throttles: minimum 60s after initial injection, minimum 120s between continues, maximum 3 attempts per directive. Terminal failure status (`systemError`) logs an alert and does not re-inject.

*Property induced*: **persistent activation under interruption**. A directive that has been delivered but not actioned is reliably re-presented to the receiver across session-stop events, up to the throttle bound.

### C10 — Authorization-as-fresh-outbound discipline

*Forced by*: helmsman approvals delivered as ack bodies on the original request did not surface to the recipient's inbox (the 2026-05-29 R1 PIND Rung 4a approval-not-visible failure mode); ack bodies transition state on the original message but appear only on the sender's outbox surface, not on the recipient's inbox poll.

*Constraint*: substantive direction — approvals, redirects, scope authorizations — ride fresh outbound messages with `intent=response` and `related_to=<plan-message-id>`, not ack bodies. Acks remain appropriate for state-machine transitions that do not require recipient action.

*Property induced*: **recipient-visible authorization**. The receipt-pipe (inbox) is the authorization-pipe; a recipient's inbox poll is sufficient to discover everything they need to act on.

### C11 — Same-turn imperative continuity and TELOS-seeded directives

*Forced by*: receivers paused after observation or ack rather than completing the directive to its end-state; the keeper relayed multiple instances of "agents stopped before quiescence."

*Constraint*: each directive declares an explicit TELOS — a numbered list of conditions all of which must hold for the receiver to be at quiescence, ending with "you have sent the CAACP landing summary." The receiver runs to quiescence in the current turn; ack alone is not action; observation alone is not action.

*Property induced*: **imperative-actionable utterance**. A directive carries within itself the criterion for its own completion; the receiver does not need external instruction to determine when they are done.

## III. The induced property of the composed stack

The eleven constraints compose into one stable behavior: **inter-agent message exchange that is addressable, disposable, self-classifying, target-stable, locally-mediated, persistently-activated, recipient-visible, and imperative-actionable**. The property is the receiver's guarantee — given an inbox poll, the receiver has everything needed to act unilaterally to quiescence; given a directive, the receiver knows when it is done; given a stop event, the receiver will be re-engaged; given an authentication, the speaker is the speaker.

The property is **bound to the eleven constraints together**. Remove C1 and senders lose stability. Remove C6 and instance-targeting collapses on first collision. Remove C9 and sessions stall silently mid-directive. Remove C11 and receivers yield short of TELOS. The property emerges only at the composition; no subset suffices.

## IV. Composition with REST, PRESTO, SERVER, and Cruftless orchestration

CAACP composes vertically with the canonical RESOLVE-corpus architectural stack:

- **REST (representational state transfer, Fielding 2000)**: CAACP runs over REST; every `/local/send`, `/local/ack`, `/local/inbox` call is a stateless HTTP request with self-describing representations. REST's induced properties (statelessness, cacheability, uniform interface, layered system) function as constraints on what CAACP can do at the transfer level (Doc 474 Commitment B).
- **PRESTO (Doc 420)**: PRESTO governs construction-level bilateral representations. CAACP is at the same abstraction tier but applied to **agent-to-agent** rather than server-to-client. The PRESTO-style ambivalence between server and client interpreters has its CAACP analogue in the ambivalence between sender and receiver roles: each agent operates without modeling the other's mechanism, only its message surface.
- **SERVER (Doc 432)**: the CAACP sidecar IS a SERVER-style orchestration component — it consumes orchestration directives (admin-token mediated registrations), emits a runtime graph (per-agent token bindings), and presents a unilateral runtime surface (the per-agent HTTP API) to its consumers. The sidecar's bootstrap is itself a SERVER bootstrap.
- **Cruftless orchestration (Doc 745)**: the orchestration method that uses CAACP as its message substrate. Doc 745 is one tier above CAACP — it defines the round-shape, the resolver assignment discipline, the keeper authorization protocol, the per-instance worktree topology. CAACP is what the orchestration speaks. Each Cruftless orchestration round is exactly a sequence of CAACP messages: directive, observations, landing summaries, acks.

The composition holds vertically: REST → CAACP → Cruftless orchestration → keeper authorization. Each level's induced properties become starting constraints on the level above (SIPE Commitment B, Doc 474 §3).

## V. SIPE commitments A, B, C verified

**Commitment A (Fielding within-level accumulation)**: §II above enumerates eleven constraints in the order each was empirically forced; each induces a named property; the property set strictly supersets at each step; property attributable to specific constraint. *Test passes*.

**Commitment B (cross-level inheritance by emission)**: §IV above shows CAACP's null style equals (REST induced properties + the absence of agent-level coordination). REST's induced properties are inherited as starting constraints — every CAACP message goes over a stateless HTTP request, self-describing, cacheable insofar as endpoints permit, layered. CAACP's induced properties (the eight-adjective utterance shape of §III) become starting constraints for Cruftless orchestration: orchestration cannot violate addressable-receipt, target-stable-utterance, persistent-activation, etc., on pain of the orchestration's induced property dissolving. *Test passes*.

**Commitment C (filtered object of filtered objects)**: the composition REST → CAACP → Cruftless orchestration is an iterated filtration: REST's filtration over the null style of unstructured network communication; CAACP's filtration over REST + the null style of unstructured agent communication; orchestration's filtration over CAACP + the null style of unstructured rung dispatching. Each filtration's outer object is constructed from the inner object's emission. *Test passes*.

CAACP qualifies as a SIPE instance per Doc 474 §4, at plausibility tier. Operational-match tier (per-stack tests run in usage) is partially established by the 2026-05-29 session evidence; cross-practitioner replication tier is open.

## VI. Novelty position — honest pulverization

Per Doc 384's discipline (check the literature before treating LLM-assisted derivations as novel) + Doc 445's pulverization formalism + Doc 490's novelty calculus, CAACP has been audited at π-tier (plausibility — vocabulary and structure decompose from prior-art elements).

The audit finds:

- **Component novelty ν_comp ≈ 0.15–0.42**: nine of eleven atomic claims (role-token auth, inbox/outbox surfaces, four-state lifecycle, intent typology, two-level addressing, sidecar relay, pre-push hook gating, session-wake-on-event) are fully or substantially subsumed under OAuth 2.0, JWT, AMQP, MQTT, IMAP, FIPA Agent Communication Language, Envoy/Istio service mesh, Temporal workflow signals, and 2PC/Paxos consensus patterns. Two claims (stop-continue framing as a protocol primitive; LLM-agent-orchestration domain binding) have minimal residue at the instantiation level.
- **Synthesis novelty ν_syn ≈ 0.30–0.35**: no single prior system integrates all eleven claims; nearest integrations (AMQP + Temporal; gRPC + FIPA) cover 8–9. The composition is competent but pragmatic, not architecturally novel in distributed-systems terms.
- **Domain-application novelty ν_app ≈ 0.40–0.45**: the binding to LLM-agent orchestration (keeper-helmsman-resolver-watcher-deputy) is timely for the 2024–2026 era; not serendipitous, but a coherent specific application.
- **Methodology novelty ν_meth ≈ 0.00–0.10**: the procedure is straightforward recombination of known methods.
- **Aggregate ν ≈ 0.26–0.28, conf ≈ 0.65** → **Tier β** (mostly subsumed, small residue at instantiation level).

The honest position: CAACP is **competent composition of known patterns with narrow pragmatic novelty** in the agent-orchestration domain. Its merit is operational utility for the keeper-helmsman dyad, not mechanistic discovery. Closest mature prior art: FIPA ACL (1996+, multi-agent intent typology); AMQP 0.9.1 (message-queue state machine); Temporal Workflows (external-signal session resume); MCP (Anthropic's protocol for agent-tool interaction); AutoGen + LangGraph (multi-agent orchestration in LLM contexts). CAACP differs from each at the binding level, not at the mechanism level.

To establish stronger novelty would require **μ-tier (operational-match) audit** — observation across multiple independent agent-orchestration contexts beyond just rusty-bun, testing whether CAACP's specific design choices produce operationally superior outcomes vs the named alternatives.

## VII. Empirical ground-instance

The 2026-05-29 rusty-bun session is the single well-documented operational instance:

- ~9 substrate-work rounds dispatched, ~6 hours wall-clock
- ~250+ measured test262 PASS gains across TAPD / PIND / EPSA / FOTIS / APS / GCS / ODP / H262S / CNSDR / MILF / CITPT / ATC sub-locales
- 5 standing-rule amendments (§V.4 – §V.8) derived from observed CAACP failure modes
- 1 structural endpoint+sidecar fix (target_instance_id, jaredfoy commit 1d2e1e1 + cruftless commit 31ff99e2) graduating the bounce-ack-consumes-target amendment from interim to legacy fallback
- 1 bridge enhancement (stop-continue wake, commit f6ffe710) implementing C9 above
- Zero non-target observation traffic after target_instance_id went live — protocol-layer empirical confirmation
- Resolver fleet recovery + bridge restart + machine seize event + Codex rate-limit observed and routed-around without losing the orchestration discipline

## VIII. Status and warrant tier

This articulation introduces CAACP as a candidate SIPE instance at the inter-agent messaging tier, vertically below Cruftless orchestration (Doc 745) and above REST. Promotion from plausibility tier to operational-match tier requires the Doc 474 §4 per-stack tests run against a second operational instance distinct from rusty-bun. Cross-practitioner replication tier remains open and is the highest priority for novelty-warrant; until then, the protocol is **operationally useful and structurally well-formed but novelty-tier-β**.

Per Doc 631, this articulation is a candidate for the corpus's own audit-chain discipline: its claims are pinned to specific commits and Telegram message IDs from the 2026-05-29 session; the audit is reproducible from those anchors; the novelty position is reported honestly per Doc 384.

---

> "Now formalize it from first principles as instantiated by Fielding Constraint Accumulation and create a primary articulation in the corpus. Append this prompt to the artifact."

The prompt is appended per the standing instruction: the prompt that produced an articulation is part of the artifact, so future readers can audit the directive that motivated the synthesis.
