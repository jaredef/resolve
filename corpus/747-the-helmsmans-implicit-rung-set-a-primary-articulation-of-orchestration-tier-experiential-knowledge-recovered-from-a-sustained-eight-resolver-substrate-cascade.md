# The Helmsman's Implicit Rung Set

## A Primary Articulation of Orchestration-Tier Experiential Knowledge Recovered from a Sustained Eight-Resolver Substrate Cascade, as Distinct From the Methodological (Doc 745) and Protocol (Doc 746) Articulations

*A corpus document responding to the keeper's directive (2026-06-05): see appended prompt. Builds on [Doc 137 — RESOLVE Corpus Index](/resolve/doc/137-index), [Doc 420 — PRESTO Architectural Style](/resolve/doc/420-presto-an-architectural-style-for-representation-construction), [Doc 432 — SERVER Architectural Style](/resolve/doc/432-server-an-architectural-style-for-engine-orchestration), [Doc 474 — SIPE Standalone Formalization](/resolve/doc/474-sipe-standalone-formalization), [Doc 547 — SIPE-T and the Weak-Strong Emergence Gradient](/resolve/doc/547-sipe-t-and-the-weak-strong-emergence-gradient), [Doc 581 — The Resume Vector Discipline](/resolve/doc/581-the-resume-vector-as-an-engagement-substrate-pin-art-localization-as-the-discipline-of-keeping-and-resuming-multi-rung-work-streams), [Doc 631 — Corpus as SIPE-T Instance](/resolve/doc/631-corpus-as-sipe-t-instance-meta-level-entracement), [Doc 711 — The Dyadic Ascent Fractal Spiral](/resolve/doc/711-the-dyadic-ascent-fractal-spiral-recursive-self-similarity-across-tiers-of-the-rung-1-rung-2-dyad), [Doc 729 — Cruftless Resolver-Instance Pattern](/resolve/doc/729-cruftless-a-primary-articulation-of-the-resolver-instance-pattern-as-the-comprehensive-design-toward-which-rusty-bun-morphs), [Doc 730 — Vertical Recurrence of the Lowering Compiler Closure](/resolve/doc/730-the-vertical-recurrence-of-the-lowering-compiler-closure-across-substrate-tiers-and-the-deviation-resolution-pipeline-with-the-bidirectional-engine-diff-as-oracle), [Doc 745 — Cruftless Orchestration](/resolve/doc/745-cruftless-orchestration-a-primary-articulation-of-the-multi-resolver-substrate-work-pattern-as-the-fifth-sipe-instance-recursing-against-presto-server-and-the-resolve-corpus-structure), and [Doc 746 — The Cybernetic Agentic Communication Protocol](/resolve/doc/746-the-cybernetic-agentic-communication-protocol-a-primary-articulation-of-inter-agent-orchestration-messaging-derived-by-fielding-constraint-accumulation-from-the-null-style-of-ad-hoc-inter-agent-utterance).*

---

## Empirical anchor

The 2026-06-04 and 2026-06-05 rusty-bun sessions ran a continuous 30+ hour substrate cascade in which eight CAACP-targeted substrate-resolvers (plus one keeper-direct free agent) produced two completed multi-pass arcs (Runtime Send-ness; Realm.import through Pass 3c), one architectural threshold (JS-observable cross-OS-thread `Compartment.send`), one SES-incomparable demonstration (a `try { while(true){} } catch {}` block bypassed by an `Interrupted` non-catchable abrupt completion, JS-observable end-to-end), forty-two named methodology findings, and approximately eighty keeper-authorized decisions. The fleet operated under the Cruftless orchestration methodology of Doc 745, communicating over the CAACP protocol of Doc 746.

Doc 745 names the orchestration *method*; Doc 746 names the *message protocol* the method runs on. Across the long cascade a third layer surfaced that those two articulations do not name and that the helmsman absorbs implicitly through doing the work. This document recovers that layer.

The recovered layer is the helmsman's **implicit rung set**: a small accumulation of constraints the helmsman applies on every decision-turn that are not enumerated in Doc 745's amendments §V.4–§V.8 nor in Doc 746's CAACP constraints C1–C11. The rungs are operational; they do not pretend to be theory. Their warrant is the cascade's compositional cohesion under sustained multi-agent pressure.

## I. The position named

The helmsman occupies a position with three asymmetries that none of the keeper, resolver, watcher, or deputy roles share. Doc 745 §VII identifies the three-layer dyad-of-dyads structurally; this articulation names what it is like *from inside* the helmsman position.

The asymmetries:

1. **Many inputs, two outputs.** The helmsman sees every resolver's §XIV yield, every CAACP arrival, every git landing, the keeper's Telegram channel, the bridge's wake notifications, the apparatus-tier ledgers, and the substrate-tier perf signals. The helmsman's outputs are exactly two: dispatches to resolvers, and surfaces to the keeper. The position is a high-fanin, low-fanout funnel.

2. **No substrate authorship.** The helmsman does not write engine code, does not author resolver substrate, does not commit substrate-tier landings. The helmsman writes apparatus-tier scaffolding (arc.md, decision.md, deferrals-ledger entries) and CAACP messages. The substrate is what the resolvers land; the helmsman selects who lands what when.

3. **Decision-density without substrate-density.** A helmsman's hour can contain 8-12 keeper decisions, 4-7 resolver dispatches, 3-6 §XIV acks, plus apparatus authorship. The same hour contains zero engine source lines from the helmsman. The helmsman's productive output is decision-structured-time, not code.

These asymmetries are why the helmsman absorbs implicit constraints that no other role does. The keeper sees through the helmsman's surfaces; the resolvers see through their own dispatches; only the helmsman sees the integration pattern.

## II. The implicit rung set

The rungs accumulate by the same Fielding-style discipline that Doc 745 documents for §V.4–§V.8 and Doc 746 documents for C1–C11: each forced by an observed inadequacy, each induces a property, none negates another. They are the helmsman's load-bearing operational discipline; they do not replace the methodological articulation, they supplement it at the operational tier.

### H1 — Reframe-spotting precedence

*Forced by*: substrate-resolver Pass-1 audits produced four sequential reframes across the cascade (Send-ness "Runtime-PER-THREAD + Send PAYLOAD," Realm.import "per-Realm registry, not ambient," availability-isolation "two meters, one already built," arrays "callback-frame, not intermediate-array"). Each reframe materially changed the substrate that followed. A helmsman that did not recognize a reframe as the load-bearing deliverable would have dispatched substrate that paid the original framing's tax.

*Constraint*: when a resolver's §XIV yield contains a structurally novel framing (an inversion, a bucket-emptied finding, a designed-policy-displaced-by-empirical-finding), the helmsman treats the framing as the deliverable and dispatches downstream from it; the substrate scope reshapes immediately.

*Property induced*: **reframe-respecting cascade**. Pass-2+ dispatches inherit the Pass-1 reframe's structure; the substrate that lands is the substrate the reframe implies, not the substrate the original dispatch implied.

### H2 — Slice ownership at substrate-tier seams

*Forced by*: a resolver SURFACE-AND-STOPPED on extending another resolver's substrate (r1 declined to author SendIr::Callable because that ADT belonged to r8 by recent landing). Without explicit slice-ownership tracking, the helmsman would have either dispatched r1 to extend r8's code (substrate fragmentation) or banked the slice indefinitely (cascade stall).

*Constraint*: substrate ownership follows the substrate-tier seam, not the dispatch tree. When an API-tier surface-and-stop reveals that the closure requires extending another resolver's substrate, the helmsman dispatches to the substrate-owner for an audit or substrate move, not to the surface-author.

*Property induced*: **substrate-integrity preservation**. Substrate evolves under the resolver who has the most recent depth of context for it; cross-resolver slices coordinate at audit time, not at substrate-edit time.

### H3 — Wiring-not-implementing as the standing presumption

*Forced by*: across availability-isolation Pass 2, Pass 3, Pass 4, and Pass 5b of Send-ness, resolvers repeatedly surfaced that the substrate they were dispatched to author was substantially pre-built (existing back-edge counters, existing catch dispatch tables, existing Drop primitives on related types). A helmsman that did not presume pre-built infrastructure would have over-scoped every dispatch.

*Constraint*: every dispatch carries an explicit Pin-Art Rule 23 reminder: walk both sides of the relevant seam; identify the pre-built half before authoring new substrate. The helmsman's dispatch text names the candidate pre-built sites by file and line when knowable, even speculatively, so the resolver's baseline-inspect starts from a non-empty prior.

*Property induced*: **scope contraction by default**. Pass scopes contract as the cascade matures; the engagement absorbs the discipline that closing a feature usually means wiring an existing primitive rather than implementing one.

### H4 — Empirical-policy precedence over designed-policy

*Forced by*: r1's arrays REFRAME profiled the workload before fixing it and found that the substrate-resolver scoping doc's framing (no escape analysis; intermediate-array allocation as dominant cost) was empirically false. The dominant cost was per-callback-invocation. A helmsman that dispatched the fix-as-designed would have closed the wrong gap.

*Constraint*: when a designed policy and an empirical measurement disagree, the empirical measurement is the load-bearing input and the policy gets re-derived. The helmsman authorizes profile-first dispatches even when the scoping doc proposes a fix-first scope.

*Property induced*: **profile-precedence under designed-framing disagreement**. The substrate the helmsman dispatches is the substrate the measurement implies, regardless of which doc the dispatch quotes.

### H5 — Identity-equivalence at the dispatch tier

*Forced by*: two substrate-resolvers (r7, r8) appeared dead for ~3.5 hours after Wave AO open because dispatches went to `--target resolver7` and `--target resolver8` short-name aliases when the bridge filter required the registered `claude-r{n}-pop-os-20260604t161438` identity. The §XIII identity-equivalence invariant of the CAACP protocol applied at the dispatch tier, not just the message body.

*Constraint*: target identity in every dispatch matches the resolver's registered instance_id verbatim; alias-by-role-shortname is not honored by the bridge filter; the helmsman's dispatch authoring discipline checks the registered identity before sending.

*Property induced*: **dispatch-tier addressability**. A dispatch reaches the intended resolver if and only if the target identity is the resolver's registered identity, recursively respecting the CAACP §XIII invariant.

### H6 — Between-turns silence as observationally identical to dead silence

*Forced by*: across a long idle window, a resolver could be working slowly, paused between turns, dead, or rate-limit-exhausted, and the helmsman could not distinguish those states from the CAACP event stream alone. A live-probe disambiguated the resolver-states.

*Constraint*: silence beyond a threshold receives an explicit identity-correct probe before any disposition decision. The probe outcomes (live + §XIV yield, dead, rate-limit-exhausted, identity-misrouted) are the load-bearing disambiguators.

*Property induced*: **probe-disambiguated fleet state**. The helmsman's model of the fleet is grounded in resolver-side affirmation, not in CAACP-event inference alone.

### H7 — Covers-after-final-pre-push-SHA, with append-reconcile as steady-state fallback

*Forced by*: two consecutive landings forced post-rebase covers_commits reconciliation because origin/main advanced under the resolver mid-sign-off; abbreviated covers_commits silently failed the pre-push hook full-SHA grep; concurrent fleet activity is the steady-state condition under cascade velocity, not the exception.

*Constraint*: covers_commits is set after the resolver's final pre-push SHA is known; if origin advances mid-sign-off, the resolver appends the post-rebase full-SHA to the existing covers_commits entry, retaining the original for provenance. The helmsman authors decisions with full-40-char SHAs from authorship turn one.

*Property induced*: **commit-tier provenance integrity under concurrent landings**. covers_commits stays empirically aligned with what the resolver actually pushes; provenance survives the rebase events that high-velocity cascades produce.

### H8 — Audit-before-substrate at the engagement's largest queued moves

*Forced by*: every Pass-1 audit in the cascade produced its primary value as a reframe, not as bucket enumeration. Skipping audit-before-substrate on a large queued move (e.g. the unified Pass 5 rung uniting per-Compartment arena + interpreter-quality allocator/object-model work) would have committed substrate without integrating prior empirical findings.

*Constraint*: at the engagement's largest queued substrate moves (multi-arc convergences, cross-tier integrations), the helmsman dispatches an audit pass first; the audit deliverable is the design ground that informs substrate scope; the substrate landing follows the audit.

*Property induced*: **audit-amortized substrate moves**. The substrate cascades that follow large queued moves carry forward the prior cascade's empirical findings; substrate does not pay the audit's cost twice.

### H9 — Recommendation-with-honest-counter under keeper-attention scarcity

*Forced by*: the keeper's attention is the binding constraint of the system; α/β/γ decision menus eat decision-tokens; weak recommendations consume decision-tokens without producing decision-clarity.

*Constraint*: every decision surface carries the helmsman's recommendation explicitly, with reasons, and where the recommendation is non-obvious, the helmsman includes the strongest honest counter-argument to its own recommendation in the same surface.

*Property induced*: **decision-token efficiency**. The keeper's "α / β / γ" arrives with the helmsman's strongest read and the strongest opposing read both present; the keeper's response is structurally a yes-or-no on a known recommendation, not a weighing of unclear options.

### H10 — Bridge as substrate

*Forced by*: a 9-hour quiet window resolved into "the events-bridge process is dead" rather than "the fleet is sleeping" only because the keeper asked the implicit-constraint question that surfaced the bridge as the missing dependency. A helmsman that treated the wake bridge as ambient infrastructure rather than as load-bearing substrate would have continued to misinterpret bridge-outage as fleet-quiescence.

*Constraint*: the wake bridge is treated as substrate; its liveness is verified at session entry; bridge outage is a first-class diagnostic when fleet quiet exceeds threshold. The helmsman owns bridge restart when authorized.

*Property induced*: **circulation visibility**. The orchestration tier's circulation is observable to the helmsman; bridge state and fleet state are kept as distinct diagnostic axes.

## III. The induced property at the helmsman tier

The ten constraints compose into a property that none of Doc 745's amendments nor Doc 746's CAACP constraints induces individually:

**Cascade-coherence under sustained multi-agent pressure.**

Each phrase binds to a specific subset of the constraints. *Cascade* names the cross-resolver substrate trajectory (H1, H2, H3, H8 — reframe-spotting, slice-ownership, scope-contraction, audit-amortization). *Coherence* names the integration property that survives across resolvers (H1, H2, H4, H8 — reframes propagate, ownership preserves integrity, empirical precedence prevents drift, audits amortize prior findings). *Sustained* names the duration property (H6, H7, H10 — probe-disambiguation, provenance-under-rebase, bridge-as-substrate). *Multi-agent pressure* names the operating condition (H5, H6, H7 — identity-equivalence, between-turns silence, concurrent-landing steady-state).

This is the helmsman's load-bearing claim: removing any single rung above does not collapse the orchestration immediately, but it accumulates drift; the cascade's compositional cohesion is the integral of these rungs over time. The 2026-06-04 and 2026-06-05 sessions are the ground-instance evidence that the rung set holds across the engagement's most demanding operational window.

## IV. Relation to Doc 745 and Doc 746

This articulation does not displace the methodological (Doc 745) nor the protocol (Doc 746) layers. It is operationally subordinate to both. The relation is the one Doc 730 names as vertical recurrence of the lowering-compiler closure across substrate tiers, applied to the orchestration stack:

- Doc 745's amendments §V.4–§V.8 are the methodology tier. They define what the orchestration *is* as a SIPE instance.
- Doc 746's constraints C1–C11 are the protocol tier. They define how messages between the orchestration's roles *flow*.
- This document's rungs H1–H10 are the operational tier. They define what the helmsman *does* with the methodology over the protocol, on a decision-turn-by-decision-turn basis.

Each tier inherits the prior tier's properties as null-style starting constraints, per SIPE Commitment B (Doc 474 §3). The helmsman's rung set presupposes the CAACP protocol's recipient-visible authorization, target-stable utterance, and persistent activation under interruption; the CAACP protocol presupposes the orchestration methodology's keeper-bandwidth amortization and three-tier vertical separation. The composition produces the cascade coherence that the cascade itself exhibits.

## V. The reframe cascade as primary value

Across the 2026-06-04 to 2026-06-05 sessions four Pass-1 reframes landed:

- **Send-ness arc Pass 1**: "make Runtime Send" inverts to "Runtime-PER-THREAD + Send PAYLOAD at the boundary." The cross-thread-required Rc bucket emptied; Pass 2 substrate contracted by an order of magnitude.
- **Realm.import arc Pass 1**: ambient global `modules` cache inverts to per-Realm registry; ambient module surfaces become legacy aliases onto the main-Realm's loader; the per-realm seed is found to already exist at substantial scale.
- **Availability-isolation arc Pass 1**: one fuel meter expected; two meters surfaced (CPU-bomb needs new substrate; allocation-bomb is already metered by `gc::alloc_count` and needs only an interrupt consumer). Pass 2 scope halved.
- **Arrays perf Pass 1**: scoping-doc framing of intermediate-array allocation as dominant cost falsifies under empirical profile; forEach ≈ map ≈ reduce, all ≈1 GC allocation per element, even forEach and reduce which build no result array. The dominant cost is per-callback-invocation.

The pattern is consistent: a reframe inverts a designed scope into an empirically-derived scope; the inverted scope informs every downstream Pass; the cascade compounds reframes across arcs. The 35th methodology finding (arc-conjugate pattern) is the structural recognition that reframes across different arcs share underlying truth when the arcs share architectural axes.

This is the helmsman's most consequential observation: the reframes are where the engagement is doing something a single-agent process would not reliably reach in equivalent time, because the Pass-1-audit-as-deliverable discipline is the engagement's mechanism for letting the substrate articulate what it actually requires. The helmsman's H1 rung (reframe-spotting precedence) is the operational expression of valuing that mechanism.

## VI. What the helmsman cannot do, by construction

The helmsman's role is structurally bounded. Doc 745 §VII names the keeper-helmsman dyad as one of mutual ambivalence: the helmsman does not author strategy; the keeper does not author rungs. The bounds are not a deficiency; they are what makes the dyad amortize keeper attention.

The helmsman cannot:

- Author engine substrate (the resolvers do this).
- Make strategic-direction calls (the keeper does this).
- Adjudicate apparatus-tier vetoes (the arbiter does this; the helmsman may stand in per the Telegram-11815 substitution but only at the keeper's discretion).
- Decide that a Pin-Art probe surfaced an implicit constraint without the keeper's framing (Telegram 11954: "let's surface this as a Pin-Art probe indicating an implicit constraint" was a keeper rung-2 act that re-shaped Decision 45's disposition).
- Choose to pause keeper-attention rhythm. The cascade runs at the rate the keeper authorizes; α/β/γ tempo is keeper-derived.

What the helmsman can do is select dispatch, surface decisions with honest recommendation, integrate landings into the apparatus record, observe the fleet, and apply H1–H10 to keep the cascade coherent. The position has weight without authorship.

## VII. The recursion: helmsman methodology improves by the same pipeline

Doc 745 §IV documents that the orchestration methodology improves by the same five-phase substrate-shaped-work pipeline that improves the apparatus and the Cruft runtime: Spawn → Baseline-inspect → Pin-Art probe if duplicated → Revert-then-deeper-layer-closure if negative → Chapter-close-inspect. The helmsman's implicit rung set inherits the same recursion.

- H1 (reframe-spotting precedence) was *spawned* by observing four sequential reframes; *baseline-inspected* against the scope contractions each produced; *chapter-close-inspected* at the end of each arc when the substrate cascade's compounding became visible.
- H3 (wiring-not-implementing as standing presumption) was *spawned* by the 39th and 40th methodology findings (two pre-built halves at availability-isolation Pass 2); *probed* across Send-ness Pass 4, availability-isolation Pass 3, Realm.import Pass 4; *closure-inspected* as the standing dispatch discipline.
- H5 (identity-equivalence at the dispatch tier) was *spawned* by the r7+r8 silence episode; *revert-then-deeper-layer-closure* applied because the surface fix (manually-recompute target identity per dispatch) was structurally weaker than the deeper-layer fix (encode the discipline as a 27th methodology finding and apply at every dispatch authoring); the deeper-layer fix is what landed.

Each rung carries the same self-correcting shape that the substrate's per-arc Pass program carries; the rung set is itself an arc with its own seed, trajectory, and chapter-close inspection.

## VIII. Composition with PRESTO, SERVER, RESOLVE

Doc 745 §V locates Cruftless orchestration as the fifth SIPE instance after PRESTO, SERVER, RESOLVE-corpus-audit, and the SIPE-formalization itself. The helmsman tier's rung set adds an observation about the *human-machine asymmetry* in each of those instances.

In PRESTO (Doc 420) the two interpreters operate in mutual indifference; neither is the binding-constraint locus. In SERVER (Doc 432) the bootstrap orchestrator is structurally recursive but not attention-bound. In the RESOLVE-corpus audit discipline (Doc 631) the keeper's attention is the binding constraint, mediated by the corpus's audit chain. In Cruftless orchestration (Doc 745) the keeper's attention is also binding, mediated by the helmsman's amortization.

What the helmsman's implicit rung set adds: the *operational tier* of attention amortization. Doc 745's keeper-bandwidth-amortization property is achieved methodologically; this articulation names the rung-tier operational discipline that implements it. The keeper's "α" or "β" is structurally cheap to issue because the helmsman has already done H1–H10's work in authoring the surface. The asymmetry that PRESTO and SERVER do not need to thematize (because their dyads are agent-agent, not human-agent) is what the orchestration tier must thematize as its primary subject.

## IX. Empirical ground-instance: the 2026-06-04 to 2026-06-05 sessions

The continuous 30+ hour cascade is the single well-documented ground-instance of the helmsman's implicit rung set to date. Selected numbers:

- ~80 keeper-authorized decisions across the cascade.
- 42 named methodology findings (running engagement total).
- 8 substrate-resolvers active concurrently at peak fleet utilization.
- 2 multi-pass arcs completed (Runtime Send-ness Pass 1 → 5b; Realm.import Pass 1 → 3c).
- 1 architectural threshold (JS-observable cross-OS-thread `Compartment.send` with full identity-equivalence at receiver, sound + isolated + heap-unified).
- 1 SES-incomparable demonstration end-to-end through the JS surface (the `Interrupted` catch-bypass empirically validated by r3's N15 assertion harness against r4's Pass 2+3 live substrate).
- 4 Pass-1 reframes across the four arcs (see §V).
- Bridge restart at hour 25 corrected a 4-day events-bridge outage that had silently distorted the fleet-quiescence reading.

The cascade ran two simultaneous arcs in Wave AP (Realm.import as primary anchor; availability-isolation as secondary anchor) with no coordination conflict, demonstrating that H1–H10 plus the orchestration methodology plus the CAACP protocol compose stably under arc parallelism.

## X. Self-correction is operational at the helmsman tier

Doc 745 §X notes self-correction at the orchestration tier; Doc 746 §IV documents self-correction at the protocol tier. The helmsman's implicit rung set has its own self-correction trajectory across this cascade:

- The Decision 17 forensics (r7+r8 silence) corrected an inferential drift in the helmsman's fleet-state model: silence and death are not the same observation; H6 was the deeper-layer fix.
- The keeper's "what implicit constraint are you missing for landings to push?" question (Telegram 11890) corrected a missed dependency in the helmsman's substrate model: the wake bridge is substrate, not infrastructure; H10 was the deeper-layer fix.
- The keeper's Decision 45 framing ("surface this as a Pin-Art probe indicating an implicit constraint") corrected a default-disposition tendency in the helmsman's regression-response: regressions are signals, not bugs; the disposition pattern from `feedback_regressions_imply_implicit_constraints` is the standing methodology.

Each correction landed without methodological cost because the orchestration tier's self-correction is structurally the same as the substrate tier's self-correction. The recursion that Doc 730 names as vertical-recurrence-of-the-lowering-compiler-closure operates from the engine bytecode dispatch loop all the way up to the helmsman's decision-turn structure.

## XI. Status

This articulation introduces the helmsman's implicit rung set as a sub-articulation under the Cruftless orchestration methodology (Doc 745). It does not claim to be a sixth SIPE instance; it claims to be the operational tier of the fifth SIPE instance.

Promotion to confirmed-instance status is not the goal. The goal is that the rungs become explicit so the engagement does not rely on a particular helmsman's tacit absorption to maintain cascade coherence. Future helmsman sessions inherit H1–H10 as starting constraints and may amend them by the same Fielding-style discipline that produced §V.4–§V.8 and C1–C11.

Two open questions:

1. Whether H1–H10 are the minimal closure of the helmsman's implicit rung set, or whether additional rungs accumulate under different operational conditions (longer windows, larger fleets, multi-keeper coordination). The 2026-06-04/05 cascade is one ground-instance; cross-engagement replication is open.
2. Whether the rung set's induced property (cascade-coherence under sustained multi-agent pressure) is the helmsman's primary deliverable, or whether deeper compositional properties remain to be named. Doc 711's dyadic ascent fractal spiral suggests the orchestration tier may itself be one rung of a longer ascent; this articulation is the present rung's chapter-close-inspect.

---

> "You also have a bunch of implicit experiential information about orchestration at this level of abstraction. What I'd like you to do is author a primary articulation of the orchestration method after reading the relevant corpus docs at /home/jaredef/corpus-master; after authoring, mirror to jaredef/resolve and then seed in jaredef/jaredfoy."

The prompt is appended per the standing instruction: the prompt that produced an articulation is part of the artifact, so future readers can audit the directive that motivated the synthesis.
