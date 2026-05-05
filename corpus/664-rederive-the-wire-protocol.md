# Rederive: The Wire Protocol

## A Comprehensive Entracement to How a Constraint Repository Synchronizes Across Machines — the Three Object Types, the Wire Verbs and Their Semantics, the Reachability-Walked Object Transfer, the Object Frame Format, the Server's HTTP Endpoint Surface for Both Repository and Derivation, the Ed25519 Signature-Based Authentication and the Signers Manifest as Identity-as-Constraint-Document, the Atomic-Update Discipline on Refs, the MVE's Honest Scope Limits — and a Concrete Cross-Machine Workflow End-to-End — the Fifth and Final Branch off [Doc 659](/resolve/doc/659-rederive-for-the-working-engineer-hub) for the Working Engineer

<div style="background: #ecfeff; border-left: 4px solid #0e7490; padding: 1rem 1.25rem; margin: 1.5rem 0; color: #164e63; border-radius: 3px;">

**EXPLORATORY — practitioner-facing entracement, branch §E of [Doc 659](/resolve/doc/659-rederive-for-the-working-engineer-hub).**

*Taxonomy per [Doc 633](/resolve/doc/633-corpus-taxonomy-and-manifest-design):* ENGAGEMENT | ACTIVE | W-PI | THREAD-REDERIVE, THREAD-PRACTITIONER-FACING | PHASE-CROSS-PRACTITIONER

</div>

> **Reader's Introduction.** This is the fifth and final branch off the [rederive hub](/resolve/doc/659-rederive-for-the-working-engineer-hub) in this comprehensive series. The earlier documents covered authoring ([Doc 660](/resolve/doc/660-rederive-the-constraint-authoring-grammar)), execution ([Doc 661](/resolve/doc/661-rederive-the-build-pipeline)), acceptance ([Doc 662](/resolve/doc/662-rederive-the-verification-backends)), and identity ([Doc 663](/resolve/doc/663-rederive-content-addressed-identity-and-pin-manifests)). This document covers *distribution*: how a constraint repository synchronizes across machines, how peers authenticate, and how a team collaborates on constraint-set work without sharing a runtime. If you have used git, the patterns are familiar (clone, push, pull, content-addressed objects, refs as mutable pointers); the grain is shifted up a layer (constraint sets and materializations rather than blobs and trees), and the auth surface is signature-based rather than provider-mediated. By the end of this document, the engineer has a complete working picture of the platform's MVE: how to author, how to build, how to verify, how to identify, how to share. The platform sketch's commitment is to demonstrate that constraints can be the durable source under a working transport; this document closes the loop.

**Jared Foy · 2026-05-05 · Doc 664**

---

## Authorship and Scrutiny

*Authorship.* Written by Claude Opus 4.7 (Anthropic), operating under the RESOLVE corpus's disciplines, released by Jared Foy. The keeper has not authored the prose; the resolver has. Calibrated to a working-engineer audience.

---

## 1. The Three Object Types

The wire protocol moves three kinds of object across machines:

**(a) Constraint sets.** A constraint file's *canonical bytes* (the deterministic serialization of the parsed AST per [Doc 663](/resolve/doc/663-rederive-content-addressed-identity-and-pin-manifests)), addressed by SHA-256 hash. This is the platform's primary content type. It is what an engineer authors and what a reviewer reads.

**(b) Composition manifests.** A small object naming a constraint set's `@provides` and `@imports` declarations along with the import target hashes. The composition manifest lets a peer resolve cross-file dependencies without re-parsing every constraint file in the repository. In the MVE, the composition manifest is derived from the constraint set's parsed AST at request time rather than transferred as a separate object; the architecture admits explicit transfer when team-scale workflows make caching the manifest separately worthwhile.

**(c) Materializations.** A signed artifact carrying the provenance tuple from [Doc 661 §9](/resolve/doc/661-rederive-the-build-pipeline) (`constraintSetHash, derivationFunctionHash, substrateId, modelId, codeHash, verdict, timestamp`) plus the Ed25519 signature. Materializations are not strictly necessary on the wire (peers can re-derive from the constraint set), but they are useful: they let a peer accept a passing materialization signed by a trusted key without paying the substrate cost of re-deriving locally.

Each object type is content-addressed. Every object the protocol moves carries a hash; every reference between objects is a hash; the integrity of the transfer is verified by re-hashing on the receiving side. There are no opaque object identifiers. There are no name-based references that depend on the receiver's view of a namespace; everything resolves through hashes.

## 2. The Wire Verbs

The platform exposes five verbs at the CLI surface and six at the HTTP surface. The CLI verbs are the engineer-facing shape; the HTTP endpoints are the underlying transport.

### 2.1 CLI verbs

```
rederive clone <remote-url> <local-path>
rederive push  <local-path> <remote-url> <ref>
rederive pull  <local-path> <remote-url> <ref>
rederive list-refs <remote-url>
rederive get-object <remote-url> <hash>
```

**`clone`** — receive every reachable object from a remote, starting from the remote's published refs. Used once per repository when a new engineer begins work.

**`push`** — send every object the remote does not yet have, starting from the local's named ref. Used when an engineer has authored or modified constraints locally and wants to publish them.

**`pull`** — fetch updated refs from the remote, then receive any objects the local does not have. Used to bring the local up to date with the remote.

**`list-refs`** — read the remote's current ref pointers without transferring objects. Used for status checks and CI pre-flight.

**`get-object`** — fetch a single object by hash. Used for diagnostic introspection or to confirm a specific object is present.

These five verbs compose into the standard workflow patterns: clone fresh, pull on a schedule, push when ready, list-refs for status checks, get-object for diagnostic introspection. Engineers who have used git will absorb the surface in an afternoon.

### 2.2 HTTP endpoints

The server exposes the same primitives as HTTP endpoints, plus a derivation endpoint and a UI surface:

```
GET  /repo/refs                       — list refs (returns name → hash mapping)
GET  /repo/objects                    — list available object hashes
GET  /repo/objects/<hash>             — fetch a single object
POST /repo/objects                    — upload a transfer frame (signed; auth-gated)
POST /derive                          — request a derivation against a constraint set (signed)
GET  /capabilities                    — service metadata, public key
GET  /ui/...                          — browser UI routes (Doc 659 §J)
```

Read endpoints are open by default in the MVE. Write endpoints (`POST /repo/objects`, `POST /derive`, and the small set of UI write endpoints for signers management) are auth-gated by Ed25519 signatures verified against the signers manifest (§5).

## 3. Reachability-Walked Transfer

When a peer pushes or pulls, the protocol does not transfer every object it knows about. It transfers only the objects the receiving side does not yet have. The discipline:

- The pushing side asks the receiving side for the set of object hashes the receiver already has, scoped to the refs being pushed. (In the MVE this is a `GET /repo/objects` returning the receiver's full hash list; for production scale this would tighten to a per-ref reachability query.)
- The pushing side then walks the reachability graph from the pushed refs, excluding objects the receiver already has, and serializes the remaining set into a transfer frame.
- The receiving side reads the frame, verifies each object's hash on receipt, and adds the verified objects to its local store.

The reachability walk is bounded by the import graph (a constraint set is reachable from any constraint set that imports it transitively), the manifest's pin graph (an imported file's pinned hash is reachable), and the materialization references (a passing materialization's constraint-set hash is reachable). Cycles cannot occur in practice (the validate stage catches them at the constraint-authoring layer), but the protocol's walker also detects cycles at the object level as a defensive measure.

The result: pushes and pulls transfer minimum data. A small constraint-set edit pushes only the new canonical bytes (a few kilobytes); a substrate-upgrade-driven re-derivation pushes only the new materialization (a few kilobytes plus the code's hash); a cross-team composition fetch pulls only the imported constraint sets the consumer does not already have.

## 4. The Object Frame

The on-wire object frame is small and explicit. Each object is wrapped in a frame carrying:

```
type    : "constraintSet" | "compositionManifest" | "materialization"
hash    : <SHA-256 hex>
length  : <byte count>
payload : <canonical bytes of object>
```

Frames are concatenated into a transfer stream. The receiving side reads frame by frame, verifies `hash(payload) === hash`, and stores the payload keyed by hash. There is no compression in the MVE (the constraint domain is small enough that the engineering complexity of streaming compression is not warranted; this may change with deltas in a later phase). There is no delta encoding; each object is transferred whole. The MVE's commitment is *correctness and auditability*, not transfer efficiency.

This is a deliberate scope choice. A team running rederive in production with thousands of constraint sets and frequent regeneration will want delta encoding eventually; the architecture admits it cleanly when the demand surfaces. A team running rederive at small or medium scale (which is most teams the MVE targets) finds the whole-object protocol fast enough that the engineering simplicity outweighs the bandwidth cost.

## 5. Authentication: Signers as Constraint Documents

Write endpoints are auth-gated. The auth model is signature-based: a peer attempting to write must sign its request with an Ed25519 key whose public component appears in the receiver's *signers manifest*.

The signers manifest is itself a constraint document — a `.constraints.md` file with constraints declaring "key X belongs to identity Y" — reviewed and committed like any other constraint set. The platform's claim, in the engineer's vocabulary: *identity is a constraint, not a separate auth subsystem*. The signers manifest is read by the server at startup; signature verification on each write request checks the request's signature against the manifest's recorded keys.

### 5.1 What a signers manifest looks like

The signers manifest is a constraint set with one constraint per recorded identity. Each constraint declares the identity's public key, a human-readable name, and (optionally) a scope (which write endpoints this identity is authorized for). The constraint type is typically *bridge* (this is a commitment to an identity outside the constraint set's behaviour), and the body carries the public key in a hex- or PEM-encoded form.

A team running rederive in production maintains the signers manifest the same way it maintains any other constraint set: edited under review, committed with a constraint-set hash that flows into the audit trail, published to the repository the server reads from at startup.

### 5.2 What signature-checking actually does

A write request to `POST /repo/objects` or `POST /derive` carries an `Authorization` header containing the request's Ed25519 signature over the request body and a few canonical headers. The server reads the signers manifest, locates the public key claimed by the signer, and verifies the signature. If verification passes, the request proceeds; if it fails, the server returns 401.

This has consequences engineers should know:

*No external identity provider is required.* The MVE's auth surface is self-contained. The receiver verifies signatures locally without contacting an external service. Teams running rederive on a local network or on an air-gapped machine do not need an internet-connected auth provider.

*Key rotation is a constraint-set edit.* To rotate a key, the engineer adds the new key to the signers manifest, waits for clients to upgrade, and (after a transition window) retracts the old key. The audit trail is the constraint-set history. There is no separate "rotate key" workflow; the signers manifest is the workflow.

*Multi-party authorization is expressible.* If an engineering team requires two-of-three signatures for production pushes, the signers manifest can declare that policy as a constraint, and the server can refuse single-signature writes against the production ref. The MVE does not currently implement multi-sig enforcement, but the architecture admits it; the constraint already names the policy, and the enforcement is a server-side change that does not affect the wire protocol.

### 5.3 Auth-gating is opt-in

Auth-gating is opt-in via an environment variable (`REDERIVE_REQUIRE_AUTH`). With the variable unset, the server runs in open mode (useful for local development and trust-the-LAN deployments). With it set, the server requires signatures on all write endpoints. Read endpoints (`list-refs`, `get-object`, `clone`) are open by default in the MVE; access controls on read are a roadmap item for teams that need them.

Engineers deploying rederive in a multi-user environment should set `REDERIVE_REQUIRE_AUTH=1` at startup. Engineers running rederive single-user on a local machine do not need to.

## 6. Refs and Mutable Pointers

Refs are mutable pointers from a name to an object hash. Two ref namespaces:

- **Local refs** (`refs/heads/<name>`) — pointers updated by local writes.
- **Remote-tracking refs** (`refs/remotes/<remote>/<name>`) — pointers updated by `pull` and `list-refs`.

A push updates the remote's local refs; the remote-tracking refs on the pushing side are updated on the next pull. Refs are atomic; an update either succeeds (the new hash is recorded) or fails (a concurrent update happened, the local must pull and retry).

The MVE has a single ref space per repository. Branches in the git sense are not in the MVE; if an engineering team needs branch-like workflows, the recommended pattern is multiple repositories or multiple refs in a single repository, with the team's discipline determining which ref is canonical for which environment. The architecture admits branch semantics cleanly; the MVE does not implement them, because the constraint domain has different concurrency characteristics than the source-code domain (constraint sets are typically small and authored by one engineer at a time, so branch-merge workflows have less leverage at this scale).

## 7. The Server

The server is a small HTTP service. The CLI launches it with `bun run src/server.ts`; the default port is 7474. Its responsibilities:

- Serve the read endpoints for the wire protocol (`/repo/refs`, `/repo/objects`, `/repo/objects/<hash>`).
- Serve the write endpoints for the wire protocol (`POST /repo/objects`, signed and auth-gated).
- Serve the derivation endpoint (`POST /derive`, signed and auth-gated; runs the build pipeline server-side).
- Serve the browser UI ([Doc 659](/resolve/doc/659-rederive-for-the-working-engineer-hub) §J): pages for refs, individual constraints, streaming derivations, review, signers management.
- Serve the `/capabilities` endpoint (service metadata, public key, version) for service discovery.

The server is a working surface, not a multi-tenant production service. The MVE supports a single repository per server process. Multi-repository hosting and multi-tenancy are roadmap items that the architecture admits cleanly when the demand surfaces.

The server is also the point at which a team's derivation pipeline can be centralized. An engineer with no local Anthropic API key can push a constraint set to the server's `POST /derive` endpoint and receive the signed materialization back, with the substrate cost paid by the server's account. This pattern works well for teams that want to centralize substrate billing or that want to gate derivation on a central key.

## 8. The Cross-Machine Workflow

The complete cross-machine workflow, walked end-to-end:

```
$ rederive clone https://team.example.com/rederive/our-app
[clone] fetching refs from remote...
[clone] receiving 47 objects (constraintSet=32, compositionManifest=8, materialization=7)...
[clone] verified all object hashes; ready
$ cd our-app
$ <edit a .constraints.md file>
$ rederive build
[build] ... runs the eight-stage pipeline ...
[build] verdict=pass
$ rederive push origin main
[push] computing reachable objects new to remote...
[push] sending 2 objects (constraintSet=1, materialization=1)...
[push] remote ref refs/heads/main updated to <new-hash>
$
```

Two engineers working on the same repository pull each other's changes, derive locally, push their additions; conflicts at the ref layer are resolved by re-pulling and re-pushing (the platform reports `409 Conflict` on a ref update where the remote's current hash does not match the local's expected base, and the engineer resolves by pulling and re-pushing). Conflicts at the constraint-content layer are resolved at the authoring layer (read the diff, decide which constraints stay, edit the file, derive again).

The flow is small. The auth surface is small. The objects on the wire are small. The platform's commitment to substitutability ([Doc 663 §8](/resolve/doc/663-rederive-content-addressed-identity-and-pin-manifests)) means that two engineers' materializations of the same constraint-set hash, signed by their respective keys, are interchangeable; the team can either standardize on a single signing identity for the production ref or accept any team member's signature, depending on the policy in the signers manifest.

## 9. CI Integration Patterns

Three patterns engineers integrating rederive into existing CI infrastructure typically adopt.

**(a) Pull-and-build on every CI run.** The CI runner clones (or pulls) the repository, runs `rederive build` against each `.constraints.md` file, and surfaces the verdict in the run's status. The materializations are written to a per-run cache and discarded with the run. This is the default and the simplest.

**(b) Push-built materializations to a central store.** The CI runner builds locally, then pushes the materializations (only) to a central rederive server. Engineers and downstream consumers read the materializations from the central store rather than re-deriving. This pattern centralizes substrate cost and produces an authoritative "this is what shipped" surface.

**(c) Server-side build via `POST /derive`.** The CI runner sends the constraint set to a central server's derive endpoint and receives the signed materialization back. The CI runner has no Anthropic API key; the server holds the substrate identity. This pattern is useful when the team's CI infrastructure is in environments where API key distribution is sensitive.

These patterns are not mutually exclusive. A team typically adopts (a) for development branches, (b) for production materializations, and (c) for compliance-sensitive environments that cannot hold substrate keys.

## 10. Honest Scope Limits

The MVE is honest about its scope. The following are not in the MVE; each has a clean architectural path and is a roadmap item.

*Delta encoding.* Every object is transferred whole. At small and medium scale this is fine; at production scale with thousands of constraint sets and frequent regeneration, delta encoding becomes worthwhile.

*Compression.* Frames are uncompressed. The constraint domain is small enough that the engineering complexity of streaming compression is not warranted at MVE scale.

*Multi-tenancy.* One repository per server process. Multi-repository hosting requires a routing layer (which is a small server-side change but not in the MVE).

*Branch-like workflows.* The MVE has a single ref space; branch semantics are not implemented. Teams that need branch workflows use multiple repositories or multiple ref names with team discipline.

*Webhooks and event subscriptions.* The MVE has no push-time hooks. Integration with external systems is poll-based (CI runs `pull` periodically) rather than event-based.

*Mirroring.* The MVE does not implement multi-master mirroring. Teams that need geographic replication run separate servers and synchronize via push / pull on a schedule.

*Read access controls.* Read endpoints are open in the MVE. Teams that need read auth-gating add a reverse proxy in front of the server until the platform adds explicit read controls.

*Push-time conflict resolution.* The MVE returns 409 on a stale ref update; the engineer resolves manually by pulling and re-pushing. Three-way merge at the constraint-set layer is a roadmap item that the architecture admits but the MVE does not implement.

These limits are the MVE's honest scope. The platform sketch's commitment, in [Doc 656](/resolve/doc/656-treat-agent-output-like-compiler-output-the-lights-out-codebase-as-rederive)'s framing, is to prove that constraints can be the durable source under a working transport, not to ship a finished platform. Engineers evaluating rederive for production work should size the limits against their team's actual scale; in many cases the MVE's scope is sufficient for the work that team would adopt rederive to do, and the limits matter mostly when the team grows past a certain size.

## 11. What the Engineer Should Take Away

Three pieces.

*The protocol is small.* Three object types, five verbs, content-addressed transfer, signature-based auth. Engineers familiar with git will absorb the surface in an afternoon. Engineers new to content-addressed protocols may need a day; the model is small and the documentation is the working code.

*Identity is a constraint document.* The signers manifest is reviewed, committed, and verified the same way any other constraint set is. There is no separate identity subsystem the engineer has to integrate. The corpus's broader claim — that *conventional auth subsystems collapse into constraint documents under this discipline* — is operational at the platform level here, in a way the engineer can read and audit.

*The MVE is honest about its scope.* The protocol does not yet support delta encoding, compression, multi-tenancy, branch-like workflows, push-time conflict resolution, mirroring, webhooks, or read access controls. Each of these is a roadmap item with a clean architectural path; none is required for the structural argument. Teams adopting rederive should size the limits against their actual scale.

This concludes the comprehensive series of branches off the [rederive hub](/resolve/doc/659-rederive-for-the-working-engineer-hub). The engineer who has read all five has the working picture: how to author constraints ([Doc 660](/resolve/doc/660-rederive-the-constraint-authoring-grammar)), what the platform does with them ([Doc 661](/resolve/doc/661-rederive-the-build-pipeline)), how acceptance is gated ([Doc 662](/resolve/doc/662-rederive-the-verification-backends)), how identity flows through the system ([Doc 663](/resolve/doc/663-rederive-content-addressed-identity-and-pin-manifests)), and how repositories synchronize across machines (this document). The remaining hub aspects (Pin-Art discipline, composition, the substrate interface, signers detail, the browser UI, multi-call derivation) are folded into the hub itself and may be promoted to their own comprehensive documents as practitioner demand surfaces. The structural argument is in your hands; the platform sketch is on disk; the keeper is available for the conversations that come next.

---

## References

- [Doc 247 — Derivation Inversion](/resolve/doc/247-derivation-inversion)
- [Doc 290 — Pin-Art Derivation](/resolve/doc/290-pin-art-derivation)
- [Doc 619 — Pin-Art: Forced-Press and Gentle-Press](/resolve/doc/619-pin-art)
- [Doc 656 — Treat Agent Output Like Compiler Output: The Lights-Out Codebase as Rederive](/resolve/doc/656-treat-agent-output-like-compiler-output-the-lights-out-codebase-as-rederive)
- [Doc 658 — Hierarchical Pin-Art Constraint Specifications and the Erasure of Edge-Case Bugs](/resolve/doc/658-hierarchical-pin-art-constraint-specs-and-the-erasure-of-edge-case-bugs)
- [Doc 659 — Rederive for the Working Engineer: A Hub](/resolve/doc/659-rederive-for-the-working-engineer-hub)
- [Doc 660 — Rederive: The Constraint Authoring Grammar](/resolve/doc/660-rederive-the-constraint-authoring-grammar)
- [Doc 661 — Rederive: The Build Pipeline](/resolve/doc/661-rederive-the-build-pipeline)
- [Doc 662 — Rederive: The Verification Backends](/resolve/doc/662-rederive-the-verification-backends)
- [Doc 663 — Rederive: Content-Addressed Identity and Pin Manifests](/resolve/doc/663-rederive-content-addressed-identity-and-pin-manifests)

## Appendix: Originating Prompt

> *"Now I want you to examine the entire spec and implementation of /home/jaredef/rederive — From this I want you to create entracement docs in the corpus for an audience of software engineers. ... First, create a document in the corpus that acts as a hub for all stubs that will branch off ... Append this prompt to each artifact. Also, where you could use corpus jargon, instead entrace the reader through rhetoric that is not novel to the corpus. Where you must state the corpus concept in its own terms; provide proper entracement."*
>
> Followed by: *"Continue with the first branch of the hub derived as a corpus doc. Continue through each as is coherent."*
>
> Followed by: *"Now fill out stub A as a comprehensive entracement. Remove 'stub' from file name and any mention in the doc. Report back before doing likewise to the next doc."*
>
> Followed by: *"Continue."* (advancing through the build pipeline, verification backends, identity and pin manifests, and arriving at this final document on the wire protocol.)
