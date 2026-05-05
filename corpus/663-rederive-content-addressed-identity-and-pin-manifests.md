# Rederive: Content-Addressed Identity and Pin Manifests

## A Comprehensive Entracement to How a Constraint Set Acquires Its Stable Identity — the Canonicalization Algorithm Stated Precisely with the Manifest-First Layout, the Lexicographic Constraint Sort, the Fixed Field Order, the Sorted Unknown Fields, the Body-Whitespace Normalization, the SHA-256 Hash and Where It Flows in the Platform — Together with the Pin Manifest Layer for Cross-Cutting Implementation Preservation, the Discipline of Pinning, the Substitutability Promise the Platform Makes, and a Worked Walk Through the Hash Computation from Source File to Sixty-Four Hex Characters — the Fourth Branch off [Doc 659](/resolve/doc/659-rederive-for-the-working-engineer-hub) for the Working Engineer

<div style="background: #ecfeff; border-left: 4px solid #0e7490; padding: 1rem 1.25rem; margin: 1.5rem 0; color: #164e63; border-radius: 3px;">

**EXPLORATORY — practitioner-facing entracement, branch §D of [Doc 659](/resolve/doc/659-rederive-for-the-working-engineer-hub).**

*Taxonomy per [Doc 633](/resolve/doc/633-corpus-taxonomy-and-manifest-design):* ENGAGEMENT | ACTIVE | W-PI | THREAD-REDERIVE, THREAD-PRACTITIONER-FACING | PHASE-CROSS-PRACTITIONER

</div>

> **Reader's Introduction.** This is the fourth branch off the [rederive hub](/resolve/doc/659-rederive-for-the-working-engineer-hub). The earlier documents covered authoring, execution, and acceptance. This document closes the loop on *identity*. A constraint set has a stable, content-addressed identity computed from its canonical form. That identity is what makes the platform's substitutability promise operational: *two materializations from the same constraint set are interchangeable under verification, even though the code may differ*. This document also covers the pin manifest, the cross-cutting layer that lets an engineer preserve specific implementation details across regenerations when intent depends on them. If you have used git's content-addressed object store, much of this will feel familiar; the difference is that rederive content-addresses *requirements* rather than source files, and the canonicalization is over a structured AST rather than a byte stream. By the end of the document, the engineer should be able to inspect a constraint file, predict the canonical form, and reason about whether a given edit will change the hash.

**Jared Foy · 2026-05-05 · Doc 663**

---

## Authorship and Scrutiny

*Authorship.* Written by Claude Opus 4.7 (Anthropic), operating under the RESOLVE corpus's disciplines, released by Jared Foy. The keeper has not authored the prose; the resolver has. Calibrated to a working-engineer audience. This document corrects a load-bearing claim from the earlier stub form of §D: constraint blocks in the canonical form are sorted lexicographically by id, *not* preserved in source order. The canonicalization source is the authority; the corrected statement is in §3 below.

---

## 1. Why Identity Matters

A working engineer has two reasons to care about identity at the constraint-set layer.

The first reason is *referential*. Composition (the platform's import-and-provide layer; [Doc 660 §2](/resolve/doc/660-rederive-the-constraint-authoring-grammar)) lets one constraint file import a property from another. The import names a target file and, optionally, a content hash pin. If the imported file changes (someone edits it), the pin no longer matches; the platform refuses to resolve and asks the consumer to either update the pin (you intended the change) or revert the import (you did not). Without content-addressed identity, this safety net does not exist; you would be back in the world of mutable references and silent drift.

The second reason is *substitutability*. The platform's promise is that a derivation against a constraint set is exchangeable for any other passing derivation against the same constraint set. If the substrate is upgraded next quarter and the new substrate produces different code that still passes verification, the new code is, structurally, the same artifact; you regenerate, you ship. The hash of the constraint set is what mediates this exchange. The code's hash is incidental; the constraint set's hash is durable.

This is what the corpus calls *derivation inversion* ([Doc 247](/resolve/doc/247-derivation-inversion)). In the engineer's vocabulary it is *content-addressing the source language rather than the binary*, with all the cache-coherence properties content-addressed source brings.

## 2. Canonicalization: The Goal

The constraint AST that emerges from the parse and validate stages of the build pipeline is a structured object. To compute a stable hash, the platform first turns it into *canonical bytes*: a deterministic serialization that is identical for any two semantically-equivalent constraint sets regardless of incidental authoring differences (whitespace, field order in the metadata, *constraint order in the source file*, line-ending style, trailing blank lines).

The goal is precise. *Identical canonical bytes for identical structural content.* Two files that differ only in incidental layout produce the same hash. Two files that differ in any structural way produce different hashes. The canonicalization rules are what make this goal operational; if the rules were arbitrary, the goal would not hold.

What follows is the rule set as the platform's `src/canonicalize.ts` actually implements. Engineers who want to verify by reading the source will find it under one hundred lines and will recognize each rule from the description below.

## 3. The Canonicalization Rules

### 3.1 Manifest emitted before constraints

The canonical form opens with the manifest section (if present), then a blank line, then the constraint blocks. The manifest is emitted in three subsections in fixed order: `@provides`, then `@imports`, then `@pins`.

A file with no manifest produces canonical bytes that begin directly with the first constraint block.

### 3.2 `@provides` subsection

```
@provides: <property>
  threshold: <constraint-id>
  interface: [<exported-symbol>,<exported-symbol>,...]
```

The interface symbols are sorted lexicographically before joining with comma-no-space inside square brackets. Source-order is forgotten.

### 3.3 `@imports` subsection

```
@imports:
  - property: <property>
    from: <from>
    pin: <pin-hash>          # only if the import declares a pin
    path: <relative-path>    # only if from: path
    as: <local-alias>        # only if declared
```

Imports are sorted lexicographically by `property` name. Within each import, the order of fields is fixed (property, from, pin, path, as) and optional fields are emitted only when present.

### 3.4 `@pins` subsection

```
@pins:
  - id: <pin-id>
    must-contain: <phrase>
    why: <one-line-reason>   # only if declared
```

Pins are sorted lexicographically by `id`. Note the canonical form's spelling: `must-contain` (kebab-case, matching the source-file convention).

### 3.5 Constraints sorted lexicographically by id

This is the rule that most surprises engineers familiar with file-order-preserving canonicalizers. *The platform does not preserve constraint order.* Constraint blocks in the canonical form are sorted by id with the smallest id first. A file with constraints written in the order `SLUG3, SLUG1, SLUG2` produces the same canonical bytes as a file with constraints written in the order `SLUG1, SLUG2, SLUG3`. The source's authoring order is forgotten at canonicalization.

The corollary: *renaming or renumbering a constraint changes the canonical form.* `SLUG1` and `SLUG2` produce one canonical sort; `BEACH1` and `BEACH2` (the same constraints with different ids) produce a different canonical sort because lexicographic order of `BEACH` differs from lexicographic order of `SLUG`. The hash changes accordingly. This is intentional; the constraint id is a structural anchor that other constraints depend on (`depends-on`), and changing it is a structural change.

### 3.6 Within each constraint, fields are emitted in fixed order

```
## <id>
id: <id>
type: <type>
authority: <authority>
scope: <scope>
status: <status>
depends-on: [<sorted-id>,<sorted-id>,...]
<unknown fields, sorted alphabetically by key>

<normalized body>
```

The known fields appear in the order `id, type, authority, scope, status, depends-on, body` with `body` separated from the metadata by a blank line. Unknown fields (any metadata keys the parser preserved into `unknownFields`) appear after the known fields, sorted alphabetically by key. Metadata field order in the *source file* does not matter; the canonical form ignores it.

### 3.7 `depends-on` ids sorted lexicographically

The dependency list is rendered as `[A,B,C]` with the constraint ids sorted lexicographically and joined with comma-no-space. Square brackets surround the list. An empty list is `[]`. Source-order of the dependency list is forgotten.

### 3.8 Body whitespace normalized

The constraint body is normalized before emission:

- Line endings are converted to `LF` (`\r\n` becomes `\n`).
- Trailing whitespace per line is stripped.
- Trailing blank lines are removed.
- The body ends with exactly one newline.

Internal whitespace (leading whitespace on continuation lines, paragraph breaks within the body) is preserved. The normalization is conservative enough that semantically-equivalent prose produces identical canonical bytes; it is not aggressive enough to merge lines or alter the prose's structure.

### 3.9 Concatenation

The pieces are joined with newlines into a single string. The string is encoded as UTF-8 to produce the canonical bytes. There is no trailing newline beyond what the body normalization produces.

## 4. From Canonical Bytes to Hash

The canonical bytes are hashed with SHA-256. The output is the *constraint-set hash*: a 64-character lowercase hex string that uniquely identifies this constraint set.

The platform's `sha256Hex` function uses Web Crypto's `crypto.subtle.digest("SHA-256", ...)` and renders the result as lowercase hex. Engineers integrating with rederive from any environment that supports SHA-256 (every language with a standard library) can compute the same hash from the same canonical bytes.

If you are familiar with git's object hashing, the analogy is close: a constraint set is to rederive what a tree object is to git, and the constraint-set hash is to a constraint file what `git hash-object` output is to a blob. The difference is that the canonicalization here is over a *structured AST*, not a byte stream. Two source files that author the same constraints differently (different whitespace, different metadata field order, different constraint order in the file) produce identical hashes, because the canonical form is the same.

## 5. Where the Hash Flows

The constraint-set hash flows through the platform in five places:

**(a) The materialization artifact.** Every signed materialization records `(constraintSetHash, derivationFunctionHash, substrateId, modelId, codeHash, verdict, timestamp)`. A peer reading the artifact knows precisely what was derived from what. ([Doc 661 §9](/resolve/doc/661-rederive-the-build-pipeline) on the sign stage.)

**(b) The import pin.** A consumer file's `@imports` directive may declare `pin: <hash>` next to the import, asserting that the import target's content matches a known good hash. If the target's hash changes, the platform refuses the import.

**(c) The derivation cache.** If you have already derived this constraint set against this substrate (and the cache is enabled), the platform may serve the materialization from cache rather than re-running the substrate. Cache lookup is hash-keyed; a constraint-set edit produces a new hash and invalidates the cache automatically.

**(d) The wire protocol.** Cloning, pushing, and pulling all transfer content-addressed objects keyed on these hashes. ([Doc 664](/resolve/doc/664-rederive-the-wire-protocol).)

**(e) The provenance ledger.** A team running rederive in production typically logs constraint-set hashes alongside CI run identifiers, so a postmortem six months later can ask "what materialization was deployed at time T against constraint-set hash H?" and find the artifact.

The hash is never a secret. It is fine to log, fine to print in CI output, fine to embed in commit messages. Treat it the way you treat git commit hashes: a stable identifier you can reference, that uniquely names a thing whose contents you can read.

## 6. The Pin Manifest

Even with derivation inversion in place, there are circumstances where an engineer needs to preserve a specific implementation detail across regenerations. Examples:

- An error message that a downstream consumer parses; rewording the message would silently break that consumer.
- A function name a third-party tool depends on (a CI hook, a code-coverage instrumenter, a debugger plugin) that is not under the engineer's control.
- A comment that flags a regulatory or safety requirement; the substrate may be tempted to "clean up" the comment in subsequent derivations and lose the auditable trail.
- A specific numeric default (a timeout, a buffer size) that has been tuned in production; the substrate may produce a different default that is technically correct but performance-regressive.
- A specific log format string that an operations dashboard parses; reformatting would silently break the dashboard's regex.

The platform's response to these cases is the *pin manifest*: an explicit list of phrases that must appear verbatim in the derived code, with a per-pin `why` field documenting the engineer's reason for preserving the detail. The pin manifest is parsed alongside the constraints (so it is part of the canonical hash) and verified by the pin-checker backend ([Doc 662 §6](/resolve/doc/662-rederive-the-verification-backends)) during the verify stage of the pipeline.

### 6.1 Pin manifest syntax

```
@pins:
  - id: <pin-id>
    must-contain: "<exact-phrase>"
    why: "<one-line-reason>"
```

The `id` is for traceability in the verification report. The `must-contain` is the literal phrase the derived code must include. The `why` is a one-line documentation string the engineer writes when adding the pin, and that the next engineer (or the engineer six months from now) reads when deciding whether the pin still matters.

### 6.2 What pin checking actually does

For each pin, the pin-checker backend runs a hard substring check: the derived code's source text either contains `must-contain` verbatim or it does not. There is no regex, there is no semantic equivalence, there is no whitespace tolerance. If you pin `'throw new Error("not found")'` and the substrate produces `"throw new Error('not found')"`, the pin fails on the quote style.

A pin failure is *hard*: the verification verdict reports fail, and the platform refuses to sign the materialization. Pins that fail block deployment. This is intentional; the engineer who added the pin meant the phrase to be present, and the platform refuses to silently produce code that violates the engineer's stated intent.

## 7. The Discipline of Pinning

Pins are powerful and easy to abuse. Five disciplines for the engineer authoring pins:

*Pin only what intent depends on.* If a derivation produces ten different equivalent implementations and you can ship any of them, do not pin. If one of those implementations carries information the other nine lose, pin the carrier.

*Document the why.* The `why` field is not optional in spirit, even though the parser treats it as optional. A pin with no documented reason becomes a fossil; a pin with a documented reason is reviewable. Six months from now, a reviewer reading a pin can assess whether the reason still holds.

*Prefer constraints over pins.* If you find yourself pinning a phrase that is really a behavioural commitment, the right move is to author a constraint with proper evidence, not to pin the phrase. Pins are for *the surface text*; constraints are for *the behaviour*. Pinning a behaviour produces brittle derivations that fail on semantically-equivalent rewrites.

*Retract pins that no longer matter.* The pin manifest is part of the canonical hash; retracting a pin changes the hash, which is correct, because the constraint set's identity has shifted. The pin's history is preserved in the file's git history; you do not need to keep stale pins in the active manifest.

*Keep pins small.* A pin's `must-contain` is typically a short, distinctive phrase. Pinning a multi-paragraph block produces brittle pins that fail on any whitespace change in the substrate's output. If you find yourself wanting to pin a long block, the right move is several small pins for the distinctive phrases within the block.

These disciplines are not platform-enforced. They are the engineer's craft. The pin layer is a tool whose value depends on how it is used.

## 8. The Substitutability Promise, Stated Plainly

The platform's central promise:

> *Two materializations of the same constraint set, signed by the platform with a `pass` verdict, are exchangeable. The code may differ. The verdict is the contract.*

This is what makes substrate upgrades safe (regenerate; if the new code passes, ship), what makes cross-team collaboration coherent (the constraint set is what is reviewed; the code is regenerated), what makes long-term maintenance ergonomic (the constraint set is small and durable; the code is large and ephemeral), and what makes content-addressing valuable (the hash names the durable thing, not the ephemeral thing).

The promise has its scope. It applies to materializations that *pass*. A *fail* materialization is signed too (for record-keeping), but it is not exchangeable for anything; it is a record that this particular substrate, on this particular run, did not produce passing code from this particular constraint set. The engineer either retries (substrate non-determinism may produce a passing run on retry) or refines the constraint set (the requirements were under-specified or ambiguous).

The promise also has its tolerance. Two materializations of the same constraint set with the same substrate may produce *byte-identical* code on small inputs (the slugify sample tends to produce stable output across runs), but at engine scope the substrate's non-determinism produces meaningfully-different code on each run. The platform does not guarantee byte-identity; it guarantees verification-equivalence. The engineer reasoning about substitutability must reason at the verification layer, not at the byte layer.

## 9. A Worked Walk: From Source to Hash

Consider the slugify sample from [Doc 660 §4.1](/resolve/doc/660-rederive-the-constraint-authoring-grammar). The source has three constraints in the order `SLUG1, SLUG2, SLUG3` with no manifest. Walk the canonicalization:

**Step 1.** The parser produces an AST with `manifest: { imports: [], pins: [] }` (no `@provides`, no `@imports`, no `@pins`) and three constraints. The unknown-fields map is empty for each constraint.

**Step 2.** The canonicalizer sees no manifest content, so it emits no manifest section. It proceeds directly to the constraints.

**Step 3.** The canonicalizer sorts constraints by id. The natural source order (`SLUG1, SLUG2, SLUG3`) happens to coincide with the lexicographic sort, so the canonical order matches the source order. The constraint after sorting is:

```
## SLUG1
id: SLUG1
type: specification
authority: human-authored
scope: module
status: active
depends-on: []

Export a single function named `slugify` that takes a string and returns
a string. The function must have signature
`export function slugify(input: string): string`. The module must
type-check under strict TypeScript with no errors.
```

**Step 4.** SLUG1 has no fenced evidence in the body (the `assert` blocks for SLUG2 and SLUG3 are part of *those* constraints' bodies; the parser already separated them). The body is normalized: line endings to LF, no trailing whitespace, ends with one newline.

**Step 5.** SLUG2 and SLUG3 are emitted in the same form, in lex order, with their `assert` blocks preserved as part of their bodies.

**Step 6.** The pieces are joined with newlines into a single string and encoded as UTF-8 bytes.

**Step 7.** The bytes are SHA-256 hashed and rendered as lowercase hex. The result is the constraint-set hash for the slugify file.

If the engineer reorders the source file to `SLUG3, SLUG1, SLUG2`, the canonical form is unchanged (the canonicalizer sorts by id), and the hash is unchanged. If the engineer renames `SLUG2` to `SLUG2-redux`, the canonical sort changes (the redux suffix sorts after SLUG2 but before SLUG3 in some collations and after SLUG3 in others, depending on the comparator), and the hash changes. If the engineer adds a blank line in SLUG2's body, the body normalizer absorbs it (trailing blank lines stripped); the hash is unchanged. If the engineer adds a sentence to SLUG2's body, the canonical form changes; the hash changes.

The discipline takes a few cycles to internalize. Engineers who have used git extensively will find the model intuitive (content drives identity); engineers used to file-order-preserving systems may need to suppress the intuition that "I changed the file order, so the hash should change."

## 10. What the Engineer Should Take Away

Three pieces.

*Identity is content-addressed at the constraint-set layer.* The hash names the requirements, not the code; not the file's incidental layout; not the source-file constraint order. Two engineers who author the same requirements differently produce the same hash. An engineer who edits the requirements produces a different hash. The hash flows through composition, caching, the wire protocol, and the materialization artifact.

*Canonicalization is small but precise.* The rules: manifest first (provides, imports, pins, each subsection sorted), constraints sorted lex by id, fields in fixed order with unknown fields sorted alphabetically, depends-on ids sorted, body whitespace normalized. Implemented in under a hundred lines; tested in the platform's regression suite; stable across versions in the platform's commitment.

*Pins are for preservation, not for behaviour.* Pin only what intent depends on. Document the why. Prefer constraints over pins. Retract stale pins. Keep pins small. Use the manifest layer for cross-cutting preservation; pins live in the manifest, not in fenced blocks within constraints.

The next document in the series ([Doc 664](/resolve/doc/664-rederive-the-wire-protocol)) covers how constraint repositories synchronize across machines: clone, push, pull, the content-addressed transfer, the auth-gated write endpoints, and the signers manifest as the platform's identity surface.

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

## Appendix: Originating Prompt

> *"Now I want you to examine the entire spec and implementation of /home/jaredef/rederive — From this I want you to create entracement docs in the corpus for an audience of software engineers. ... First, create a document in the corpus that acts as a hub for all stubs that will branch off ... Append this prompt to each artifact. Also, where you could use corpus jargon, instead entrace the reader through rhetoric that is not novel to the corpus. Where you must state the corpus concept in its own terms; provide proper entracement."*
>
> Followed by: *"Continue with the first branch of the hub derived as a corpus doc. Continue through each as is coherent."*
>
> Followed by: *"Now fill out stub A as a comprehensive entracement. Remove 'stub' from file name and any mention in the doc. Report back before doing likewise to the next doc."*
>
> Followed by: *"Continue."* (advancing through the build pipeline, verification backends, and arriving at this document on identity and pin manifests.)
