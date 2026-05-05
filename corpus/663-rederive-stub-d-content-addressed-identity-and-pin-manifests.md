# Rederive Stub D: Content-Addressed Identity and Pin Manifests

## How a Constraint Set Gets Its Stable Identity — the Canonicalization Algorithm, the SHA-256 Hash, the Pin Manifest Layer for Preservation Across Regenerations, the Substitutability Promise the Platform Makes — Authored as the Fourth Branch off [Doc 659](/resolve/doc/659-rederive-for-the-working-engineer-hub) for the Working Engineer

<div style="background: #ecfeff; border-left: 4px solid #0e7490; padding: 1rem 1.25rem; margin: 1.5rem 0; color: #164e63; border-radius: 3px;">

**EXPLORATORY — practitioner-facing entracement, stub of [Doc 659](/resolve/doc/659-rederive-for-the-working-engineer-hub) §D.**

*Taxonomy per [Doc 633](/resolve/doc/633-corpus-taxonomy-and-manifest-design):* ENGAGEMENT | ACTIVE | W-PI | THREAD-REDERIVE, THREAD-PRACTITIONER-FACING | PHASE-CROSS-PRACTITIONER

</div>

> **Reader's Introduction.** This is the fourth branch off the [rederive hub](/resolve/doc/659-rederive-for-the-working-engineer-hub). The earlier stubs covered authoring (the grammar), execution (the pipeline), and acceptance (the verification backends). This stub closes the loop on *identity*. A constraint set has a stable, content-addressed identity computed from its canonical form. That identity is what makes the platform's substitutability promise operational: *two materializations from the same constraint set are interchangeable under verification, even though the code may differ*. This stub also covers the pin manifest, the cross-cutting layer that lets an engineer preserve specific implementation details across regenerations when intent depends on them. If you have used git's content-addressed object store, much of this will feel familiar; the difference is that rederive content-addresses the requirements rather than the source files.

**Jared Foy · 2026-05-05 · Doc 663**

---

## 1. Why Identity Matters

A working engineer has two reasons to care about identity at the constraint-set layer.

The first reason is *referential*. Composition (§G of the hub) lets one constraint file import a property from another. The import names a target file and, optionally, a content hash pin. If the imported file changes (someone edits it), the pin no longer matches; the platform refuses to resolve and asks the consumer to either update the pin (you intended the change) or revert the import (you did not). Without content-addressed identity, this safety net does not exist; you would be back in the world of mutable references and silent drift.

The second reason is *substitutability*. The platform's promise is that a derivation against a constraint set is exchangeable for any other passing derivation against the same constraint set. If the substrate is upgraded next quarter and the new substrate produces different code that still passes verification, the new code is, structurally, the same artifact; you regenerate, you ship. The hash of the constraint set is what mediates this exchange. The code's hash is incidental; the constraint set's hash is durable.

This is what the corpus calls *derivation inversion* ([Doc 247](/resolve/doc/247-derivation-inversion)). In the engineer's vocabulary it is content-addressing the source language rather than the binary, with all the cache-coherence properties content-addressed source brings.

## 2. Canonicalization

The constraint AST that emerges from the parse and validate stages of the pipeline is a structured object. To compute a stable hash, the platform first turns it into *canonical bytes*, a deterministic serialization that is identical for any two semantically-equivalent constraint sets regardless of incidental authoring differences (whitespace, field order in the metadata, trailing newlines, the order of unknown fields).

The canonicalization is small but precise. The discipline:

- *Field order is fixed.* Within each constraint block, the platform emits `id`, `type`, `authority`, `scope`, `status`, `dependsOn`, `body`, `unknownFields`, `sourceLine` in exactly that order. The engineer's source file may write the metadata fields in any order; the canonical form does not preserve that order.
- *Constraint order is preserved.* The constraints appear in the canonical bytes in the order they appeared in the file. Reordering constraints in your source file changes the hash; this is intentional, because constraint order is observable to the substrate during derivation and to the reviewer reading the file.
- *Whitespace is normalized.* Internal whitespace in the body is preserved; leading and trailing whitespace per line is trimmed; blank-line counts are normalized; the file's terminal newline is normalized.
- *Manifest fields are emitted in fixed order.* `provides`, then `imports`, then `pins`. Each list is emitted in the order the source declared.
- *Unknown fields are preserved with their key sorted alphabetically.* Internal-team metadata under a constraint heading does not affect identity unless the team chooses to include it; sorting deterministically lets it participate in the hash without depending on authoring order.

The canonical bytes are then hashed with SHA-256. The output is the *constraint-set hash*: a 64-character lowercase hex string that uniquely identifies this constraint set.

If you are familiar with git's object hashing, the analogy is close: a constraint set is to rederive what a tree object is to git, and the constraint-set hash is to a constraint file what `git hash-object` output is to a blob. The difference is that the canonicalization here is over a *structured AST*, not a byte stream. Two source files that author the same constraints differently (different whitespace, different metadata field order) produce identical hashes, because the canonical form is the same.

## 3. The Hash in Practice

The constraint-set hash flows through the platform in several places:

- It is recorded on every signed materialization. The artifact carries `(constraintSetHash, derivationFunction, substrate, codeHash, verdict, signature)`. A peer reading the artifact knows precisely what was derived from what.
- It is the value an `@imports` directive may pin to. A consumer file may declare `pin: <hash>` next to the import, asserting that the import target's content matches a known good hash. If the target's hash changes, the platform refuses the import.
- It is the cache key for derivation. If you have already derived this constraint set against this substrate, the platform may serve the materialization from cache rather than re-running the substrate. (Cache lookup is hash-keyed; a constraint-set edit produces a new hash and invalidates the cache automatically.)
- It is the identity used by the wire protocol ([Doc 659](/resolve/doc/659-rederive-for-the-working-engineer-hub) §E, the next stub). Cloning, pushing, and pulling all transfer content-addressed objects keyed on these hashes.

The hash is never a secret. It is fine to log, fine to print in CI output, fine to embed in commit messages. Treat it the way you treat git commit hashes: a stable identifier you can reference, that uniquely names a thing whose contents you can read.

## 4. The Pin Manifest

Even with derivation inversion in place, there are circumstances where an engineer needs to preserve a specific implementation detail across regenerations. Examples:

- An error message that a downstream consumer parses; rewording the message would silently break that consumer.
- A function name a third-party tool depends on (a CI hook, a code-coverage instrumenter, a debugger plugin) that is not under the engineer's control.
- A comment that flags a regulatory or safety requirement; the substrate may be tempted to "clean up" the comment in subsequent derivations and lose the auditable trail.
- A specific numeric default (a timeout, a buffer size) that has been tuned in production; the substrate may produce a different default that is technically correct but performance-regressive.

The platform's response to these cases is the *pin manifest*: an explicit list of phrases that must appear verbatim in the derived code, with a per-pin `why` field documenting the reason the engineer is preserving the detail. The pin manifest is parsed alongside the constraints (so it is part of the canonical hash) and verified by the pin-checker backend ([Doc 662](/resolve/doc/662-rederive-stub-c-the-verification-backends) §6) during stage seven of the pipeline.

Pin syntax in the manifest header:

```
@pins:
  - id: <pin-id>
    mustContain: "<exact-phrase>"
    why: "<one-line-reason>"
```

The `id` is for traceability in the verification report. The `mustContain` is the literal phrase the derived code must include. The `why` is a one-line documentation string the engineer writes when adding the pin and that the next engineer (or the engineer six months from now) reads when deciding whether the pin still matters.

## 5. The Discipline of Pinning

Pins are powerful and easy to abuse. The platform's discipline:

*Pin only what intent depends on.* If a derivation produces ten different equivalent implementations and you can ship any of them, do not pin. If one of those implementations carries information the other nine lose, pin the carrier.

*Document the why.* The `why` field is not optional in spirit. A pin with no documented reason becomes a fossil; a pin with a documented reason is reviewable. Six months from now, a reviewer reading a pin can assess whether the reason still holds.

*Prefer constraints over pins.* If you find yourself pinning a phrase that is really a behavioural commitment, the right move is to author a constraint with proper evidence, not to pin the phrase. Pins are for *the surface text*; constraints are for *the behaviour*.

*Retract pins that no longer matter.* The pin manifest is part of the canonical hash; retracting a pin changes the hash, which is correct, because the constraint set's identity has shifted. The pin's history is preserved in the file's git history; you do not need to keep stale pins in the active manifest.

These disciplines are not platform-enforced. They are the engineer's craft. The pin layer is a tool whose value depends on how it is used.

## 6. Substitutability, Stated Plainly

The platform's central promise:

> Two materializations of the same constraint set, signed by the platform with a *pass* verdict, are exchangeable. The code may differ. The verdict is the contract.

This is what makes substrate upgrades safe (regenerate; if the new code passes, ship), what makes cross-team collaboration coherent (the constraint set is what is reviewed; the code is regenerated), what makes long-term maintenance ergonomic (the constraint set is small and durable; the code is large and ephemeral), and what makes content-addressing valuable (the hash names the durable thing, not the ephemeral thing).

The promise has its scope. It applies to materializations that *pass*. A *fail* materialization is signed too (for record-keeping), but it is not exchangeable for anything; it is a record that this particular substrate, on this particular run, did not produce passing code from this particular constraint set. The engineer either retries (substrate non-determinism may produce a passing run on retry) or refines the constraint set (the requirements were under-specified or ambiguous).

## 7. What the Engineer Should Take Away

Three pieces.

*Identity is content-addressed.* The constraint-set hash names the requirements, not the code. Two engineers who author the same requirements differently (different whitespace, different field order) get the same hash. An engineer who edits the requirements gets a different hash. The hash is what flows through composition, caching, the wire protocol, and the materialization artifact.

*Canonicalization is small but precise.* The rules are few (field order fixed, constraint order preserved, whitespace normalized, manifest order fixed, unknown fields sorted). They are documented; they are tested in the platform's regression suite; they are stable across versions in the platform's commitment.

*Pins are for preservation, not for behaviour.* Pin only what intent depends on. Document the why. Prefer constraints over pins. Retract stale pins. Use the manifest layer for cross-cutting preservation; use in-block pins ([Doc 660](/resolve/doc/660-rederive-stub-a-the-constraint-authoring-grammar) §2(d)) for the constraint's local pinning.

The next and final stub in this series ([§E *The Wire Protocol*](#)) covers how constraint repositories synchronize across machines: clone, push, pull, the content-addressed transfer, the auth-gated write endpoints, and the signers manifest as the platform's identity surface.

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

## Appendix: Originating Prompt

> *"Now I want you to examine the entire spec and implementation of /home/jaredef/rederive — From this I want you to create entracement docs in the corpus for an audience of software engineers. ... First, create a document in the corpus that acts as a hub for all stubs that will branch off ... Append this prompt to each artifact. Also, where you could use corpus jargon, instead entrace the reader through rhetoric that is not novel to the corpus. Where you must state the corpus concept in its own terms; provide proper entracement."*
>
> Followed by: *"Continue with the first branch of the hub derived as a corpus doc. Continue through each as is coherent."*
