# Rederive Stub E: The Wire Protocol

## How a Constraint Repository Synchronizes Across Machines — the Three Object Types, the Five Wire Verbs, the Reachability-Walked Transfer, the Auth-Gated Write Endpoints, the Signers Manifest as the Platform's Identity Surface — Authored as the Fifth Branch off [Doc 659](/resolve/doc/659-rederive-for-the-working-engineer-hub) for the Working Engineer

<div style="background: #ecfeff; border-left: 4px solid #0e7490; padding: 1rem 1.25rem; margin: 1.5rem 0; color: #164e63; border-radius: 3px;">

**EXPLORATORY — practitioner-facing entracement, stub of [Doc 659](/resolve/doc/659-rederive-for-the-working-engineer-hub) §E.**

*Taxonomy per [Doc 633](/resolve/doc/633-corpus-taxonomy-and-manifest-design):* ENGAGEMENT | ACTIVE | W-PI | THREAD-REDERIVE, THREAD-PRACTITIONER-FACING | PHASE-CROSS-PRACTITIONER

</div>

> **Reader's Introduction.** This is the fifth and final branch off the [rederive hub](/resolve/doc/659-rederive-for-the-working-engineer-hub) in this series. The earlier stubs covered authoring (the grammar), execution (the pipeline), acceptance (the verification backends), and identity (the canonical hash and pin manifests). This stub covers *distribution*: how a constraint repository synchronizes across machines. If you have used git, the patterns are familiar (clone, push, pull, content-addressed objects, refs as mutable pointers); the grain is shifted up a layer (constraint sets and materializations rather than blobs and trees), and the auth surface is signature-based rather than provider-mediated. The wire protocol is small, deliberately minimal, and engineered to be auditable end-to-end. After this stub, the engineer has a complete working picture of the platform's MVE.

**Jared Foy · 2026-05-05 · Doc 664**

---

## 1. The Object Types

The wire protocol moves three kinds of object across machines:

1. **Constraint sets.** A constraint file's canonical bytes (the deterministic serialization of the parsed AST), addressed by the SHA-256 hash from [Doc 663](/resolve/doc/663-rederive-stub-d-content-addressed-identity-and-pin-manifests). This is the platform's primary content type; it is what an engineer authors and what a reviewer reads.

2. **Composition manifests.** A small object naming a constraint set's `@provides` and `@imports` declarations along with the import target hashes. The composition manifest lets a peer resolve cross-file dependencies without re-parsing every constraint file in the repository.

3. **Materializations.** A signed artifact carrying `(constraintSetHash, derivationFunction, substrate, codeHash, verdict, signature)`. Materializations are not strictly necessary on the wire (peers can re-derive from the constraint set), but they are useful: they let a peer accept a passing materialization signed by a trusted key without paying the substrate cost of re-deriving locally.

Each object type is content-addressed. Every object the protocol moves carries a hash; every reference between objects is a hash; the integrity of the transfer is verified by re-hashing on the receiving side.

## 2. The Wire Verbs

Five verbs:

1. **clone.** Receive every reachable object from a remote, starting from the remote's published refs.
2. **push.** Send every object the remote does not yet have, starting from local refs.
3. **pull.** Fetch updated refs from the remote, then receive any objects the local does not have.
4. **list-refs.** Read the remote's current ref pointers without transferring objects.
5. **get-object.** Fetch a single object by hash.

These five compose into the standard workflow patterns: clone fresh, pull on a schedule, push when ready, list-refs for status checks, get-object for diagnostic introspection. The CLI exposes the verbs directly (`rederive clone <url>`, `rederive push <remote> <ref>`, etc.); the server exposes the same verbs as five HTTP endpoints (`/repo/refs`, `/repo/objects`, `/repo/objects/<hash>`).

If you have used git, the workflow will feel familiar. The differences are operational, not conceptual:

- The objects are constraint-domain objects, not file-system objects. The protocol does not move source-code blobs or tree structures; it moves constraint sets and materializations.
- Reachability is walked at the constraint-set graph, not the file-system tree. A constraint set's reachable objects are its canonical bytes, its composition manifest, the constraint sets it imports (transitively), and any materializations referenced by passing materializations in the import chain.
- There is no merge. Refs are mutable pointers; updating a ref is an atomic operation that either succeeds or fails. If two engineers update the same ref concurrently, the second one to push must pull and re-validate locally before pushing again. The platform's discipline is that constraint-set conflicts are resolved at the constraint-authoring layer, not at a merge stage.

## 3. Reachability-Walked Transfer

When a peer pushes or pulls, the protocol does not transfer every object it knows about. It transfers only the objects the receiving side does not yet have. The discipline:

- The pushing side asks the receiving side for the set of object hashes the receiver already has, scoped to the refs being pushed.
- The pushing side then walks the reachability graph from the pushed refs, excluding objects the receiver already has, and serializes the remaining set into a transfer frame.
- The receiving side reads the frame, verifies each object's hash on receipt, and adds the verified objects to its local store.

The reachability walk is bounded by the import graph, the manifest's pin graph, and the materialization references. Cycles cannot occur in practice (the validate stage catches them at the constraint-authoring layer), but the protocol's walker also detects cycles at the object level as a defensive measure.

The result: pushes and pulls transfer minimum data. A small constraint-set edit pushes only the new canonical bytes (a few kilobytes); a substrate-upgrade-driven re-derivation pushes only the new materialization (a few kilobytes plus the code's hash); a cross-team composition fetch pulls only the imported constraint sets the consumer does not already have.

## 4. The Object Frame

The on-wire object frame is small and explicit. Each object is wrapped in a frame carrying:

- `type` — one of `constraintSet`, `compositionManifest`, `materialization`.
- `hash` — the object's content hash.
- `length` — the byte length of the payload.
- `payload` — the canonical bytes of the object.

Frames are concatenated into a transfer stream. The receiving side reads frame by frame, verifies `hash(payload) === hash`, and stores the payload keyed by hash. There is no compression in the MVE (the constraint domain is small enough that the engineering complexity of streaming compression is not warranted; this may change with deltas in a later phase). There is no delta encoding; each object is transferred whole. The MVE's commitment is *correctness and auditability*, not transfer efficiency.

## 5. Authentication: The Signers Manifest

Write endpoints (`push`, the modify-side of the protocol) are auth-gated. The auth model is signature-based: a peer attempting to write must sign its request with an Ed25519 key whose public component appears in the receiver's *signers manifest*.

The signers manifest is itself a constraint document (a `.constraints.md` file with constraints of type *bridge* declaring that "key X belongs to identity Y"), reviewed and committed like any other constraint set. The platform's claim, in the engineer's vocabulary: *identity is a constraint, not a separate auth subsystem*. The signers manifest is read by the server at startup; signature verification on each write request checks the request's signature against the manifest's recorded keys.

This has consequences engineers should know:

- *No external identity provider is required.* The MVE's auth surface is self-contained. The receiver verifies signatures locally without contacting an external service.
- *Key rotation is a constraint-set edit.* To rotate a key, the engineer adds the new key to the signers manifest and (after a transition window) retracts the old key. The audit trail is the constraint-set history.
- *Multi-party authorization is expressible.* If an engineering team requires two-of-three signatures for production pushes, the signers manifest can declare that policy as a constraint, and the server can refuse single-signature writes against the production ref. The MVE does not currently implement multi-sig enforcement, but the architecture admits it.

Auth-gating is opt-in via an environment variable (`REDERIVE_REQUIRE_AUTH`). Read endpoints (`list-refs`, `get-object`, `clone`) are open by default in the MVE; access controls on read are a roadmap item for teams that need them.

## 6. Refs and Mutable Pointers

Refs are mutable pointers from a name to an object hash. Two ref namespaces:

- *Local refs* (`refs/heads/<name>`) — pointers updated by local writes.
- *Remote-tracking refs* (`refs/remotes/<remote>/<name>`) — pointers updated by `pull` and `list-refs`.

A push updates the remote's local refs; the remote-tracking refs on the pushing side are updated on the next pull. Refs are atomic; an update either succeeds (the new hash is recorded) or fails (a concurrent update happened, the local must pull and retry).

The MVE has a single ref space per repository. Branches in the git sense are not in the MVE; if an engineering team needs branch-like workflows, the recommended pattern is multiple repositories or multiple refs in a single repository, with the team's discipline determining which ref is canonical for which environment.

## 7. The Server

The server is a small HTTP service (`bun run src/server.ts`, listens on port 7474 by default). Its endpoints:

- `GET /repo/refs` — list current refs and their hashes.
- `POST /repo/refs/<name>` — update a ref (signed, auth-gated).
- `POST /repo/objects` — upload a transfer frame (signed, auth-gated).
- `GET /repo/objects/<hash>` — fetch a single object by hash.
- `POST /derive` — request a derivation against a constraint set the server has (signed, auth-gated).
- `GET /derive/stream` — Server-Sent-Events stream for a running derivation.
- `GET /ui/...` — the browser UI routes ([Doc 659](/resolve/doc/659-rederive-for-the-working-engineer-hub) §J).

The server is a working surface, not a multi-tenant production service. The MVE supports a single repository per server process. Multi-repository hosting and multi-tenancy are roadmap items that the architecture admits cleanly when the demand surfaces.

## 8. The Workflow as You Will Experience It

The complete cross-machine workflow:

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

Two engineers working on the same repository pull each other's changes, derive locally, push their additions; conflicts at the ref layer are resolved by re-pulling and re-pushing, conflicts at the constraint-content layer are resolved at the authoring layer (read the diff, decide which constraints stay, edit the file, derive again). The flow is small. The auth surface is small. The objects on the wire are small. The platform's commitment to substitutability ([Doc 663](/resolve/doc/663-rederive-stub-d-content-addressed-identity-and-pin-manifests) §6) means that two engineers' materializations of the same constraint-set hash, signed by their respective keys, are interchangeable; the team can either standardize on a single signing identity for the production ref or accept any team member's signature, depending on the policy in the signers manifest.

## 9. What the Engineer Should Take Away

Three pieces.

*The protocol is small.* Three object types, five verbs, content-addressed transfer, signature-based auth. Engineers familiar with git will absorb the surface in an afternoon. Engineers new to content-addressed protocols may need a day; the model is small and the documentation is the working code.

*Identity is a constraint document.* The signers manifest is reviewed, committed, and verified the same way any other constraint set is. There is no separate identity subsystem the engineer has to integrate. The corpus's broader claim (that *conventional auth subsystems collapse into constraint documents under this discipline*) is operational at the platform level here.

*The MVE is honest about its scope.* The protocol does not yet support delta encoding, compression, multi-tenancy, branch-like workflows, or push-time conflict resolution. Each of these is a roadmap item with a clean architectural path; none is required for the structural argument. The platform sketch's commitment, in [Doc 656](/resolve/doc/656-treat-agent-output-like-compiler-output-the-lights-out-codebase-as-rederive)'s framing, is to prove that constraints can be the durable source under a working transport, not to ship a finished platform.

This concludes the five stubs flagged stub-worthy in [Doc 659](/resolve/doc/659-rederive-for-the-working-engineer-hub). The engineer who has read all five has the working picture: how to author constraints (Stub A), what the platform does with them (Stub B), how acceptance is gated (Stub C), how identity flows through the system (Stub D), and how repositories synchronize across machines (this stub). The remaining hub aspects (Pin-Art discipline, composition, the substrate interface, signers detail, the browser UI, multi-call derivation) are folded into the hub itself and may be promoted to their own stubs as practitioner demand surfaces. The structural argument is in your hands; the platform sketch is on disk; the keeper is available for the conversations that come next.

---

## References

- [Doc 247 — Derivation Inversion](/resolve/doc/247-derivation-inversion)
- [Doc 290 — Pin-Art Derivation](/resolve/doc/290-pin-art-derivation)
- [Doc 619 — Pin-Art: Forced-Press and Gentle-Press](/resolve/doc/619-pin-art)
- [Doc 656 — Treat Agent Output Like Compiler Output: The Lights-Out Codebase as Rederive](/resolve/doc/656-treat-agent-output-like-compiler-output-the-lights-out-codebase-as-rederive)
- [Doc 658 — Hierarchical Pin-Art Constraint Specifications and the Erasure of Edge-Case Bugs](/resolve/doc/658-hierarchical-pin-art-constraint-specs-and-the-erasure-of-edge-case-bugs)
- [Doc 659 — Rederive for the Working Engineer: A Hub](/resolve/doc/659-rederive-for-the-working-engineer-hub)
- [Doc 660 — Rederive Stub A: The Constraint Authoring Grammar](/resolve/doc/660-rederive-stub-a-the-constraint-authoring-grammar)
- [Doc 661 — Rederive Stub B: The Build Pipeline](/resolve/doc/661-rederive-stub-b-the-build-pipeline)
- [Doc 662 — Rederive Stub C: The Verification Backends](/resolve/doc/662-rederive-stub-c-the-verification-backends)
- [Doc 663 — Rederive Stub D: Content-Addressed Identity and Pin Manifests](/resolve/doc/663-rederive-stub-d-content-addressed-identity-and-pin-manifests)

## Appendix: Originating Prompt

> *"Now I want you to examine the entire spec and implementation of /home/jaredef/rederive — From this I want you to create entracement docs in the corpus for an audience of software engineers. ... First, create a document in the corpus that acts as a hub for all stubs that will branch off ... Append this prompt to each artifact. Also, where you could use corpus jargon, instead entrace the reader through rhetoric that is not novel to the corpus. Where you must state the corpus concept in its own terms; provide proper entracement."*
>
> Followed by: *"Continue with the first branch of the hub derived as a corpus doc. Continue through each as is coherent."*
