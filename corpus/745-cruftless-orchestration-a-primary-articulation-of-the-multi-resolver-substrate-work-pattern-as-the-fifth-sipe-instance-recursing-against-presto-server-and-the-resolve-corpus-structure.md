# Cruftless Orchestration

## A Primary Articulation of the Multi-Resolver Substrate-Work Pattern as the Fifth SIPE Instance, Recursing Against PRESTO, SERVER, and the RESOLVE Corpus Structure

*A corpus document responding to the keeper's directive (2026-05-29): see appended prompt. Builds on [Doc 137 — RESOLVE Corpus Index](/resolve/doc/137-index), [Doc 420 — PRESTO Architectural Style](/resolve/doc/420-presto-an-architectural-style-for-representation-construction), [Doc 432 — SERVER Architectural Style](/resolve/doc/432-server-an-architectural-style-for-engine-orchestration), [Doc 474 — SIPE Standalone Formalization](/resolve/doc/474-sipe-standalone-formalization), [Doc 547 — SIPE-T and the Weak-Strong Emergence Gradient](/resolve/doc/547-sipe-t-and-the-weak-strong-emergence-gradient), [Doc 581 — The Resume Vector Discipline](/resolve/doc/581-the-resume-vector-as-an-engagement-substrate-pin-art-localization-as-the-discipline-of-keeping-and-resuming-multi-rung-work-streams), [Doc 631 — Corpus as SIPE-T Instance](/resolve/doc/631-corpus-as-sipe-t-instance-meta-level-entracement), [Doc 729 — Cruftless Resolver-Instance Pattern](/resolve/doc/729-cruftless-a-primary-articulation-of-the-resolver-instance-pattern-as-the-comprehensive-design-toward-which-rusty-bun-morphs), [Doc 730 — Vertical Recurrence of the Lowering Compiler Closure](/resolve/doc/730-the-vertical-recurrence-of-the-lowering-compiler-closure-across-substrate-tiers-and-the-deviation-resolution-pipeline-with-the-bidirectional-engine-diff-as-oracle), [Doc 733 — Fractal Seeds and Trajectories](/resolve/doc/733-fractal-seeds-and-trajectories-pair-recurrence-across-substrate-depth), [Doc 742 — Resolver-Instance Pattern at Full Strength](/resolve/doc/742-the-resolver-instance-pattern-at-full-strength-downstream-dispatch-and-upstream-elision-as-doc-729s-empirical-refinements-from-a-typescript-parity-research-arc), and [Doc 744 — Pipeline-Form Discovery as Predictive Heuristic](/resolve/doc/744-pipeline-form-discovery-as-predictive-heuristic-mouth-terminus-shape-input-emission-correspondence-and-the-dag-lattice-alphabet-relation-between-pipelines).*

---

## Empirical anchor

The 2026-05-29 rusty-bun session ran nine multi-resolver rounds dispatched from a single helmsman session against four substrate-resolver sessions running concurrently on Codex Desktop. Across the rounds the fleet landed approximately 250+ measured PASS gain on test262 across eight sub-locales (TAPD, PIND, EPSA, FOTIS, APS, GCS, ODP, H262S), accumulated five apparatus amendments (§V.4 – §V.8 of `apparatus/docs/agent-init-protocol.md`) each derived from an observed failure mode, and landed one structural protocol fix across the jaredfoy CAACP endpoint and the cruftless apparatus/caacp-server sidecar that graduates the most recent amendment from interim discipline to legacy fallback. Pred-epsua.1 (the post-EPSUA test262-sample remeasurement target of ≥84% runnable rate) was empirically corroborated at 84.7% mid-session.

Reading the session log discloses a constraint-derived orchestration pattern the engagement has been operating implicitly across many prior rounds but has not articulated as a SIPE-instance until now. This doc names the methodology, identifies the constraint set, names the induced property, and locates Cruftless orchestration as the fifth SIPE instance after the four named in Doc 474 §6 (architectural stacks, Bayesian inference in language models, the overclaim-to-phenomenology chain, and the RESOLVE corpus's own audit discipline at Doc 631).

The articulation is itself an instance of the methodology it articulates. The orchestration pattern improves by the same five-phase substrate-shaped-work pipeline that improves the Cruft runtime and the apparatus; the five amendments §V.4 – §V.8 that accumulated this session are each a Pin-Art derivation from observed failure, landed as one constraint per amendment, each constraint inducing one property that becomes a constraint on the next round.

## I. The orchestration pattern named

Cruftless orchestration is the multi-resolver substrate-work pattern by which an attention-scarce keeper authorizes batched constraint-derived substrate progress against the Cruft runtime through a helmsman that dispatches per-instance-targeted directives to a fleet of substrate-resolvers, each working in its own worktree against its own branch, with empirical PASS-gain measurement gating round closure.

The pattern composes with the Cruft runtime substrate it acts upon and with the apparatus that instruments it. The three tiers are vertically separated: runtime (Cruft substrate, the per-rung Pin-Art locales), apparatus (the cybernetic instruments measuring runtime change), and orchestration (this document's subject). The orchestration tier sits one level outside the apparatus, governing how the apparatus's discipline is applied across a multi-resolver fleet.

## II. The constraints, by order of accumulation

The constraint set accumulated empirically through the session in the order each was forced by an observed failure mode. The pattern follows Fielding-style within-level accumulation per SIPE Commitment A (Doc 474 §3): each constraint induces a named property; properties compose without negation.

1. **§V.4 — Same-turn imperative continuity.** When a CAACP message contains an explicit imperative (Proceed, Begin, Execute, Land), the imperative is a same-turn directive; observation is not action, ack is not action. *Anchor*: keeper Telegram 10320 — resolvers were stopping after observation when an approval message named explicit substrate scope.
2. **§V.5 — Approval-as-fresh-outbound.** Helmsman approvals for substrate-landing rungs are sent as new outbound messages (intent=response, related_to=plan), not as ack bodies. Acks transition state on the original message but do not surface to recipients cross-machine. *Anchor*: R1 PIND Rung 4a delivery miss (helmsman's approval was authored as ack-body; R1's inbox poll returned empty).
3. **§V.6 — Resolver-as-committer + deputy apparatus-artifact carve-out.** Each substrate-resolver authors, commits, and pushes its own substrate work in its own per-instance worktree. The helmsman authorizes via approval but does not commit. The deputy may commit files only within apparatus/deputy/ under deputy authorship. *Anchor*: shared-clone topology surfaced empirically when all four resolvers reported identical HEAD + dirty state; the §V.6 amendment named per-instance worktree as the discipline upgrade; the carve-out was added when deputy fleet-state files sat stranded.
4. **§V.7 — Bounce-ack must not consume directives addressed to other instances** (interim discipline, structurally superseded by `target_instance_id`). Non-target instances send a separate response message instead of ack-RESOLVED on the original. *Anchor*: R1 + R4 bounce-acks on the PIND Rung 4a directive transitioned the message to RESOLVED globally before R3's poll; R3 saw an empty inbox and inferred quiescence. Structural fix: add `target_instance_id` to CAACP message schema; endpoint filters by it on GET /inbox; enforces matching instance on terminal RESOLVED acks.
5. **§V.8 — Pre-existing worktree diffs are expected; categorize before yielding.** Five expected diff sources enumerated; standing rule: inventory via `git status`, categorize, proceed with directive; commit only your touched files per Git Add Scope; surface unexplained diffs as a one-line landing-summary note. *Anchor*: keeper Telegram 10397 — agents stopped on dirty state generated by parallel agents in the per-instance worktree topology.

Two additional constraints are not yet codified as amendments but operate in the session:

6. **Telos-seeded directives.** Every per-instance directive opens with an explicit TELOS — destination state block listing the numbered conditions for quiescence, ending with "you have sent the CAACP landing summary." Followed by "you are at quiescence only when 1–N are complete and the CAACP response has been sent." *Anchor*: keeper Telegram 10362.
7. **Probe-before-land cadence.** Each new sub-locale receives a Phase-0+Phase-2 probe directive before a substrate-landing directive. The probe deliverable carries: spawn SHA, failure-shape segmentation, C4 reason-coherence metric, proposed Phase-3 substrate move shape, estimated rung count. *Anchor*: the cadence emerged from the HMPD probe round (R2/R3/R4 cross-instance corroboration of C4 FAIL on broad HMPD → TAPD narrowing).

## III. The induced property

**Constraint-derived parallel substrate-work with keeper-bandwidth amortization.** Four words, precise:

- **Constraint-derived**: the round-shape, the per-rung scope, the closure threshold are each derived from the constraint set above. The keeper does not author rungs; the keeper authorizes constraint-derived rungs.
- **Parallel**: four resolvers work concurrently in per-instance worktrees on disjoint scope; the per-instance worktree topology plus protocol-level `target_instance_id` guarantee non-interference structurally.
- **Substrate-work**: the load-bearing measurement is PASS-gain on test262, not rung count, not lines of code, not commit count. A round either shows numbers or names a blocker.
- **Keeper-bandwidth amortization**: one keeper "yes" authorizes a round of four rungs. The keeper's scarce attention is multiplied by the orchestration's round-shape constraint.

This property is bound to the specific constraints above. Remove §V.4 and resolvers yield on observation; remove §V.5 and approvals don't propagate; remove §V.6 and authorship attribution fractures; remove §V.7 or its structural fix and parallel work collapses on first collision; remove §V.8 and resolvers halt on benign dirty state; remove telos-seeding and resolvers stop short of landing summary; remove probe-before-land and substrate moves land speculatively.

## IV. The recursion: methodology applied to itself

The orchestration methodology improves by the same five-phase substrate-shaped-work pipeline articulated in Doc 581 and the prior prospective draft: Spawn → Baseline-inspect → Pin-Art probe if duplicated → Revert-then-deeper-layer-closure if negative → Chapter-close-inspect. The phases recurse vertically per Doc 730 (lowering compiler closure across substrate tiers) and per Doc 733 (fractal seeds and trajectories pair-recurrence across substrate depth).

- Each amendment §V.4 – §V.8 was *spawned* by a failure observation, not predictive design.
- Each amendment was *baseline-inspected at founding* — the failure was inspected before the constraint was written; §V.6 carve-out was added when the original §V.6 stranded deputy artifacts.
- Each amendment was *probed* — §V.7 was the interim discipline before the structural target_instance_id fix was even possible.
- One amendment hit Rule 13 (revert-then-deeper-layer-closure): the first §V.7 proposal would have used an OBSERVED ack_state; watcher's investigation revealed (c) target_instance_id was the structural fix; reverted to (c).
- Each amendment was *chapter-close-inspected* — each carries a "failure mode this rule prevents" paragraph naming the empirical anchor.

This is the recursion: the methodology that improves the runtime is the methodology that improves the apparatus is the methodology that improves the orchestration. Per SIPE Commitment B (Doc 474 §3), the induced properties of one level become null-style starting constraints on the next. Cruft-tier Pin-Art locales emit `seed.md + trajectory.md` per Doc 581; apparatus-tier amendments emit constraints into agent-init-protocol.md; orchestration-tier round-shape emits per-rung directives. The shape recurs.

## V. Structural parallel with PRESTO, SERVER, RESOLVE

The orchestration pattern instantiates the same SIPE-shaped structure that PRESTO (Doc 420), SERVER (Doc 432), and the RESOLVE corpus's own audit discipline (Doc 631) instantiate at their respective levels.

- **PRESTO** — ambivalent execution with agnostic determinism. Two interpreters (server, client) operate in mutual indifference; each is structurally agnostic of the other's mechanism.
- **SERVER** — recursive ambivalence with self-authorizing determinism. Bootstrap orchestration consumes srv: directives; PRESTO consumes htx: directives; mutual indifference at a deeper level; runtime graph self-verifying.
- **RESOLVE corpus** (Doc 631) — threshold-conditional emergence (SIPE-T, Doc 547). The corpus's audit discipline applied across documents produces audit chains that themselves exhibit SIPE-T; the corpus is an instance of its own primary apparatus at the long-horizon-keeper-discipline layer.
- **Cruftless orchestration** (this document) — constraint-derived parallel substrate-work with keeper-bandwidth amortization. Keeper, helmsman, resolvers, watcher, deputy operate in SIPE-style mutual indifference at the layer above each dyad; the round itself is self-verifying through PASS-gain measurement.

The pattern is not that each architecture is "like" the others. The pattern is that each architecture exhibits Fielding-style within-level constraint accumulation (Commitment A), each accumulates from a null style with prior-level properties as starting constraints (Commitment B), and the composed sequence forms a filtered object of filtered objects (Commitment C). Cruftless orchestration is the fifth SIPE instance after the four named in Doc 474 §6.

## VI. SIPE-afforded keeper leverage

The keeper's attention is the binding constraint of the system. SIPE makes that attention multiplicative rather than additive.

Per SIPE Commitment B (Null_{k+1} = P_k), induced properties at one level become null-style starting constraints at the next. The keeper intervenes at the constraint level — add §V.8, tighten §V.5 to fresh-outbound, structurally enforce §V.7 via target_instance_id — and the property propagates upward automatically through the level hierarchy. The keeper does not need to supervise each round's substrate work, because the round-shape is constraint-derived.

This is what the keeper observed in Telegram 10405: "do you see how running four parallel agents with this kind of high signal orchestrated derivation is an extreme force multiplier?" The multiplier is not 4× from four resolvers; the multiplier is the constraint-amortization. One "yes" from the keeper unlocks four rungs of probe-validated, PASS-measured substrate work. The cost shape inverts — the keeper's scarce attention authorizes batched constraint-derived substrate progress instead of supervising individual moves.

## VII. The dyadic exchange, three layers

The keeper-helmsman-resolver chain is a three-layer dyad-of-dyads. Each dyad operates with SIPE-style mutual indifference at the layer above.

- **Keeper ↔ Helmsman**: strategic direction + per-round authorization. The keeper does not author rungs. The helmsman does not author strategy.
- **Helmsman ↔ Resolvers**: per-rung directive dispatch + landing summary collation. The helmsman does not author substrate edits. The resolvers do not author cross-resolver coordination.
- **Helmsman ↔ Watcher/Deputy**: meta-coordination (apparatus investigation, fleet survey). Watcher does not commit substrate. Deputy commits only apparatus/deputy/ per §V.6 carve-out.

Each dyad is bilateral in PRESTO's sense (Doc 420 §5): two valences, two roles, mutual indifference structurally guaranteed. The helmsman is ambivalent toward what specific PASS counts will land — it dispatches by constraint and lets empirical measurement speak. The resolvers are ambivalent toward the round shape — they execute the directive's TELOS and yield a landing summary. The keeper is ambivalent toward which resolver landed which rung — the keeper authorizes round-shape constraints, not assignments.

## VIII. Empirical ground-instance: the 2026-05-29 session

The 2026-05-29 session is the single well-documented ground-instance of Cruftless orchestration to date.

- 9 rounds dispatched, approximately 6 hours wall-clock.
- ~250+ measured PASS gain on test262 across TAPD, PIND, EPSA, FOTIS, APS, GCS, ODP, H262S sub-locales.
- 5 apparatus amendments derived from observation (§V.4 – §V.8), each landed with proposal+decision pair + failure-mode anchor preserved in prose.
- 1 structural fix landed jointly across the jaredfoy CAACP endpoint repo (`1d2e1e1`) and the cruftless apparatus/caacp-server sidecar (`31ff99e2`) — `target_instance_id` schema graduates §V.7 from interim discipline to legacy fallback.
- Zero non-target observation traffic after `target_instance_id` went live, empirically confirming the structural fix at the protocol layer.
- Multiple chapter closures: TAPD 90/90 (5 rungs), PIND 40/40 (4 rungs + design rung), EPSA 35/35 (2 rungs), FOTIS 18/18 (1 rung), APS 26/26 (2 rungs), GCS core arc EXT 1–6 + delegate-abrupt rung, ODP surface 52/54 (4 rungs).

Pred-epsua.1 (post-EPSUA test262-sample remeasurement ≥84% runnable) was empirically corroborated at 84.7% mid-session; a full-suite remeasurement at parallelism=2 is dispatched and awaiting Codex rate-limit clearance.

## IX. Composition with what governs above and below

The orchestration tier composes downward with the apparatus tier and the Cruft runtime tier, and upward with the keeper's strategic direction. Each composition obeys SIPE Commitment B.

- **Downward into apparatus**: orchestration constraints (round-shape, telos-seeded directives, per-instance worktree) are constraints on what the apparatus must support — CAACP must allow per-instance targeting, the pre-push hook must allow per-resolver landings, the sidecar must forward per-instance state.
- **Downward into Cruft runtime**: orchestration's PASS-measurement constraint is a constraint on what the runtime must expose — measurable test262 surfaces, deterministic gates, isolatable per-locale scope.
- **Upward into keeper direction**: orchestration's keeper-bandwidth-amortization property becomes a constraint on what the keeper authorizes — the keeper authorizes round-shape constraints, not per-rung supervision; the keeper's attention is preserved by the orchestration's constraint-derivation.

The vertical recursion holds: Doc 730 names vertical recurrence of the lowering-compiler closure across substrate tiers; this articulation names vertical recurrence of the constraint-derivation closure across orchestration / apparatus / runtime tiers. The same closure.

## X. Self-correction is operational

Each amendment in this session was a self-correction: the orchestration observed its own failure mode, amended its constraint set, and re-derived its induced property. §V.7 in particular illustrates: the interim amendment was sufficient to prevent recurrence; the watcher's investigation surfaced that the interim was operationally tractable but structurally weak; the structural fix landed across two repos with the interim retained as legacy fallback in case structural rollback is ever required.

This is the V3 truth-telling discipline (Doc 631) operating at the orchestration layer. The corpus's audit-chain pattern recurses into the orchestration's own session log: observations are recorded with empirical anchors, amendments are warranted at the tier their evidence supports, prior amendments are explicitly graduated (not silently replaced) when newer structural fixes supersede them.

## XI. Status

This articulation introduces Cruftless orchestration as a candidate fifth SIPE instance per Doc 474 §6's enumeration. Promotion to confirmed-instance status awaits the Test 1 (Fielding accumulation), Test 2 (Inheritance), Test 3 (Constraint non-violation) per-stack tests from Doc 474 §4, plus the cross-practitioner replication tier — an independent practitioner identifying the same structure in an independent domain without framework import. The 2026-05-29 session supplies the operational-match-tier evidence; the cross-practitioner tier remains open.

---

> "Create a primary articulation for the Cruftless orchestration methodology and also include insights from application. The orchestration pattern itself is self improving by the same methodology as that which improves the apparatus and that which improves the Cruft runtime. Observe also how this is evident in the PRESTO and SERVER architectures which have a recursive systems-induced property emergent pattern as well. Observe also how the RESOLVE structure (as articulated within the RESOLVE corpus) also has this similar pattern of recursion against the SERVER and PRESTO derivations. Observe how the dyadic exchange has been leveraged in such a way that the attention-scarce keeper (hypostatic being / human) is able to leverage the abstractions of the orchestration method by reason of the formalism afforded by SIPE. Read the requesite RESOLVE corpus articulations in order to create the primary articulation for the Cruftless orchestration formalization. Append this prompt to the artifact."

The prompt is appended per the standing instruction: the prompt that produced an articulation is part of the artifact, so future readers can audit the directive that motivated the synthesis.
