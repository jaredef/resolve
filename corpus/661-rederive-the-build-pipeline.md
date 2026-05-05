# Rederive: The Build Pipeline

## A Comprehensive Entracement to the Eight Deterministic Stages — Read, Parse, Validate, Resolve, Canonicalize, Derive, Verify, Sign — with the Inputs and Outputs of Each, the Failure Modes that Arise at Each, the Stage-Event Stream that Tooling and CI Hook Into, the Provenance Tuple the Final Stage Records, the Multi-Call Mode for Engine-Scope Work, and a Concrete End-to-End Walkthrough — the Second Branch off [Doc 659](/resolve/doc/659-rederive-for-the-working-engineer-hub) for the Working Engineer

<div style="background: #ecfeff; border-left: 4px solid #0e7490; padding: 1rem 1.25rem; margin: 1.5rem 0; color: #164e63; border-radius: 3px;">

**EXPLORATORY — practitioner-facing entracement, branch §B of [Doc 659](/resolve/doc/659-rederive-for-the-working-engineer-hub).**

*Taxonomy per [Doc 633](/resolve/doc/633-corpus-taxonomy-and-manifest-design):* ENGAGEMENT | ACTIVE | W-PI | THREAD-REDERIVE, THREAD-PRACTITIONER-FACING | PHASE-CROSS-PRACTITIONER

</div>

> **Reader's Introduction.** This is the second branch off the [rederive hub](/resolve/doc/659-rederive-for-the-working-engineer-hub). The first document ([Doc 660](/resolve/doc/660-rederive-the-constraint-authoring-grammar)) covered what a constraint file looks like. This document explains what the platform does with it. The build pipeline has eight stages. Six of them are deterministic pure functions that produce identical output for identical inputs; one of them is the language-model call that turns the canonical constraint set into derived code; the last one is the signing step that writes the auditable artifact. The pipeline emits stage events as it runs, so a CLI, a CI runner, a browser UI, or a custom tool can observe and react in real time. This document walks the engineer through each stage in order: what it consumes, what it produces, what failure looks like, and how to debug. By the end, the engineer should be able to read a build run's stage stream and, when something fails, locate the failure to a stage and a recovery in seconds.

**Jared Foy · 2026-05-05 · Doc 661**

---

## Authorship and Scrutiny

*Authorship.* Written by Claude Opus 4.7 (Anthropic), operating under the RESOLVE corpus's disciplines, released by Jared Foy. The keeper has not authored the prose; the resolver has. The rhetoric is calibrated to a working-engineer audience.

---

## 1. The Pipeline at a Glance

Eight stages, in order, each named precisely as the platform's source uses them:

1. **read** — load the constraint file from disk.
2. **parse** — tokenize the Markdown and extract the constraint AST.
3. **validate** — check structural correctness of the AST.
4. **resolve** — resolve `@imports` to other constraint sets and prepare the import context.
5. **canonicalize** — normalize the AST and compute the constraint-set content hash.
6. **derive** — call the language-model substrate with the constraint set and produce code.
7. **verify** — run the verification backends against the derived code.
8. **sign** — emit a content-addressed signed materialization artifact.

Six of the eight stages (read, parse, validate, resolve, canonicalize, sign) are deterministic above the substrate call: the same constraint file produces the same canonical hash, the same canonical bytes, the same validation verdict, the same import resolution, and the same signed artifact-shape every time you run them. The verify stage is deterministic in its assertion / property / a11y / flow / pin backends and stochastic only at the language-model judge backend. The derive stage is the one place where non-determinism enters the pipeline structurally; verification is what gates whether that non-determinism produced an acceptable artifact.

The pipeline is implemented as a single async function (`rederive` in `src/engine.ts`) that takes a constraint file path, a target language, a substrate handle, and an optional stage-event emit callback, and returns either a signed materialization or an error. The function is small (about a hundred lines); the work is delegated to per-stage modules. Nothing else in the platform is in the build path; everything else (the CLI, the server, the wire protocol, the browser UI) calls into this function or consumes its output.

## 2. Stage One: Read

*Consumes:* a path to a `.constraints.md` file.
*Produces:* the file's UTF-8 source as a string.
*Substrate cost:* zero.
*Time:* milliseconds.

The platform calls `readFile(path, "utf-8")` and returns the source. The stage event's `complete` detail records the byte count, which is useful for sanity checks (a zero-byte file is almost always an authoring error) and CI baselines (sudden large jumps in source size are signal).

*Failure modes:* file not found, permissions error, encoding error.
*Recovery:* check the path. Read errors are uniformly path-class errors; the platform does not attempt to interpret them.

There is no caching at this stage. Reads are cheap enough that re-reading on every build is the right discipline; the alternative (caching by mtime or by hash) would introduce a cache-invalidation surface for no measurable gain.

## 3. Stage Two: Parse

*Consumes:* the file's source string.
*Produces:* a constraint AST containing an array of constraints (each with id, type, authority, scope, status, depends-on, body, unknown fields, source line) and a manifest (provides, imports, pins).
*Substrate cost:* zero.
*Time:* milliseconds.

The parser reads the source line by line. It recognizes the manifest header by `@<directive>:` lines at the top of the file, the constraint blocks by H2 headings, and the metadata, body, and fenced blocks within each constraint by structural pattern-matching. The parser does not interpret the prose body; it does not run the fenced evidence; it does not check for semantic correctness. Its contract is *structural correctness*.

The AST it produces is the platform's working representation. Every later stage reads from the AST rather than from the source string, which means the source string's incidental layout (whitespace, blank-line counts, field ordering) does not propagate beyond parse.

*Failure modes:* malformed metadata block (missing colon, missing field), unknown constraint type, malformed `@provides` / `@imports` / `@pins` directive, syntactically broken fenced block.
*Recovery:* read the parser's error report. Errors carry source-line numbers and a message identifying the structural issue. Most errors are typo-class and obvious once located.

The parse stage's complete detail records `constraintCount`, `importCount`, and `pinCount`, which together give the engineer (or a CI runner) a quick sanity check on whether the file's structure is what they expect.

## 4. Stage Three: Validate

*Consumes:* the constraint AST.
*Produces:* a validation report (pass or fail with a list of structured errors).
*Substrate cost:* zero.
*Time:* milliseconds.

Validate is the platform's *semantic correctness above the prose*. It is what the parser does not check.

The validator's checks include:

- *No duplicate constraint identifiers.* Two `## SLUG1` blocks in the same file are an error.
- *No dependency cycles.* `A depends-on B` and `B depends-on A` is an error; longer cycles are also caught.
- *No references to nonexistent constraints.* `depends-on: [DOESNOTEXIST]` is an error.
- *Manifest cross-references are coherent.* A `@provides` whose `threshold:` names a constraint that does not exist is an error.
- *Constraint type is one of the seven recognized.* The parser recognizes the seven; the validator confirms the field's value is in the recognized set.

If validate passes, the platform has a coherent constraint AST to work with downstream. If it fails, no further stage will help; the engineer fixes the structural problem named in the report and re-runs.

## 5. Stage Four: Resolve

*Consumes:* the validated AST and the manifest's `@imports` declarations.
*Produces:* a resolved import context, which is a list of `ResolvedImport` entries each containing the imported file's path, content hash, parsed AST, materialized code (if any), and exported interface.
*Substrate cost:* zero.
*Time:* milliseconds (plus the disk reads of imported files).

For files with no manifest or with no `@imports`, this stage is a no-op (the stage event reports `status: skip`). Engineers working in single-file projects can largely ignore resolve until composition becomes useful.

For files with imports, resolve does several things:

- It locates each imported file by `from: path` (the MVE-supported resolution; `from: tag` and `from: hash` are roadmap).
- It parses the imported file (which is itself a constraint file).
- It computes the imported file's content hash.
- It locates the imported file's most recent materialization on disk (typically `<imported-file>.materialization.json`) and confirms the threshold-constraint passed in that materialization.
- If the consumer's import declared a hash pin, it verifies the pin matches the imported file's current hash.
- It detects cycles in the import graph defensively (the parser would not produce a cycle, but the resolver checks anyway).

The resolved imports flow into the derive stage's prompt (so the substrate sees the imported interfaces) and into the verify stage's sandbox (so the derived code's `import` statements resolve at runtime).

*Failure modes:* imported file not found at path; imported file's threshold-constraint did not pass; imported pin mismatch; cycle in import graph; imported file is itself unparseable.
*Recovery:* the recovery for each is concrete. *Not found* is a path correction. *Threshold did not pass* requires deriving the imported file first. *Pin mismatch* is either an intent change (update the pin) or an unintended drift (revert the imported file). *Cycle* is a constraint-authoring fix. *Imported file unparseable* is a constraint-grammar fix in the imported file.

## 6. Stage Five: Canonicalize

*Consumes:* the validated AST and the resolved imports.
*Produces:* canonical bytes (a deterministic serialization of the constraint set with ordered fields and normalized whitespace) and a SHA-256 content hash of those bytes. Also produces the *derivation function hash*, a separate SHA-256 over a small string identifying the platform's derivation function version.
*Substrate cost:* zero.
*Time:* milliseconds.

This is the layer that gives identity to the constraint set. The canonical form is the durable representation; the source file's incidental layout is forgotten here. Two engineers who author the same constraints with different whitespace and metadata field order produce identical canonical bytes and identical hashes, which is what makes content-addressing operational.

The detailed canonicalization rules (field order fixed, constraint order preserved, whitespace normalized, manifest order fixed, unknown fields sorted, depends-on lists sorted) are documented in [Doc 663 §2](/resolve/doc/663-rederive-stub-d-content-addressed-identity-and-pin-manifests). For the build-pipeline's purposes, the relevant facts are:

- The hash flows downstream into the derive stage (as part of the prompt context), the verify stage (as the constraint-set identity in the verification report), and the sign stage (as part of the provenance tuple).
- The hash is what makes derivations cacheable. A cache lookup keyed on the constraint-set hash plus the derivation function hash plus the substrate identity returns either a hit (no re-derivation needed) or a miss (proceed to derive).
- The hash is the constraint set's identity for the wire protocol. A peer with the hash can fetch the canonical bytes by hash and verify on receipt that the bytes hash to the expected value.

The complete detail records the `constraintSetHash` and the canonical-bytes length. Both are useful in CI logs.

## 7. Stage Six: Derive

*Consumes:* the canonical bytes (as text), the target language, the substrate handle, the resolved imports, and the pin manifest.
*Produces:* a `DerivationOutput` containing the derived code (a string in the target language) and a `DerivationReceipt` recording the substrate identity, model id, prompt hash, and call timing.
*Substrate cost:* one substrate call (or several, in multi-call mode).
*Time:* seconds.

This is where the platform calls the language model. The derivation function constructs a prompt from the canonical text, the resolved imports' interfaces, and the pin manifest, hands the prompt to the substrate via `substrate.complete(prompt)`, and reads back the substrate's output. The output is parsed as code in the target language; for TypeScript at MVE scope, the platform expects the output to be a single module text.

The substrate handle is small and substrate-agnostic. Its interface:

```typescript
interface SubstrateHandle {
  id: string;       // e.g. "anthropic-cli"
  modelId: string;  // e.g. "claude-opus-4-7"
  complete(prompt: string): Promise<Result<string>>;
}
```

The platform ships with two implementations: an Anthropic-CLI substrate that calls the production Anthropic API, and a `MockSubstrate` for tests and offline work. Substrate plurality is architected; a third implementation drops in at the substrate-handle interface boundary without core platform changes. ([Doc 659](/resolve/doc/659-rederive-for-the-working-engineer-hub) §H entraces the substrate interface in more detail.)

*Failure modes:*

- *Substrate API error.* Network, authentication, rate-limit. The substrate's `complete` returns a non-ok Result and the engine reports the derive stage as error.
- *Substrate output budget exceeded.* The substrate's response is truncated. This is the engine-scope wall: a constraint set whose derivation lands above the substrate's per-call output budget will not produce a complete module in single-call mode. Recovery: multi-call mode (§11), or constraint-set partitioning by scope.
- *Substrate produced syntactically invalid output.* Rare; usually a substrate-side guardrail or a misconfigured prompt. The verify stage will catch this (the type checker will fail on day one), but the engine does not currently short-circuit at derive on syntax-only grounds.
- *Substrate refused.* Also rare; substrate-side content policy or similar.

*Recovery:* re-run (substrate non-determinism may produce a passing derivation on retry); refine the prompt-shaping in the constraint file's body to be more specific; switch substrates if a particular substrate is consistently failing on a particular pattern.

The derive stage is the only stage that is not deterministic above the canonical hash. Two derivations against the same constraint set with the same substrate may produce subtly different code, both correct. Two derivations against the same constraint set with different substrates will produce different code; both are valid if both pass verification. The corpus's broader claim ([Doc 656](/resolve/doc/656-treat-agent-output-like-compiler-output-the-lights-out-codebase-as-rederive)) is that this non-determinism is acceptable because the verification verdict is the contract; in the engineer's vocabulary, *the binary may differ as long as the tests pass*.

## 8. Stage Seven: Verify

*Consumes:* the derived code, the constraint AST, the resolved imports, the substrate handle (for the language-model judge backend), and the pin manifest.
*Produces:* a `VerificationReport` containing per-constraint verdicts (pass / fail / skip with evidence) and an overall verdict (pass if every constraint passed; fail otherwise).
*Substrate cost:* zero, *unless* the constraint file uses the language-model judge backend, in which case one substrate call per `judgment` block.
*Time:* seconds, dominated by judge calls if any are present and by tsc if the derived code is large.

The verify stage runs the verification backends in parallel against the derived code. The detailed semantics of each backend live in [Doc 662](/resolve/doc/662-rederive-the-verification-backends). For the build-pipeline's purposes, the relevant facts are:

- Per-constraint verdicts are the conjunction of all backends' verdicts on the constraint's evidence blocks.
- A constraint with no evidence blocks (typical for *specification* constraints) is verified by the type checker alone.
- A constraint whose dependency failed is reported with `status: skip`. Skipped constraints do not count as failures.
- The overall verdict is *pass* if every non-skip constraint passed; *fail* otherwise.

If the verdict is *fail*, the engine constructs a detailed error result naming the failing constraints and their evidence (truncated to 1500 characters per failure to keep CI logs readable) and includes the candidate code so the engineer can inspect what was produced. The error result is not a signed materialization; failure short-circuits the pipeline before sign.

If the verdict is *pass*, the engine proceeds to sign.

*Failure modes:* per-backend failures, each documented in [Doc 662](/resolve/doc/662-rederive-the-verification-backends).
*Recovery:* read the per-constraint evidence; refine the constraint (more specific prose, sharper assertion data, an additional case named explicitly); re-derive.

The verify stage is where the engineer's iteration loop lives. The build pipeline's other seven stages are a few seconds of deterministic work and one substrate call; the discipline that produces a passing verdict is in the constraint file. Almost all of the engineer's cognitive effort, in steady-state, goes into stage two (parse, by way of authoring), stage seven (verify, by way of refining), and the loop between them.

## 9. Stage Eight: Sign

*Consumes:* the constraint-set hash, the derivation function hash, the substrate identity, the derived code, the verification verdict, and the active signing key.
*Produces:* a `SignedMaterialization` artifact containing the provenance tuple and an Ed25519 signature, written to `<filename>.materialization.json` next to the source.
*Substrate cost:* zero.
*Time:* milliseconds.

The provenance tuple records every input that produced this materialization:

```typescript
interface ProvenanceTuple {
  constraintSetHash: string;        // SHA-256 of canonical bytes
  derivationFunctionHash: string;   // SHA-256 of platform version string
  substrateId: string;              // e.g. "anthropic-cli"
  modelId: string;                  // e.g. "claude-opus-4-7"
  codeHash: string;                 // SHA-256 of derived code
  verdict: "pass" | "fail";
  timestamp: string;                // ISO-8601
}
```

The signature is over the provenance tuple, signed with the platform's active Ed25519 key from the signers manifest. A peer reading the artifact can verify the signature locally without contacting the platform; the artifact carries enough information to be verifiable in isolation.

The sign stage also writes the artifact to disk. The conventional location is next to the constraint file, with the suffix `.materialization.json`. CI runners read the artifact to extract the verdict; the browser UI reads it to display review state; the wire protocol may transfer it as one of the three object types.

*Failure modes:* signing key not configured, write permission error.
*Recovery:* configure the key (see the signers-manifest setup in [Doc 664 §5](/resolve/doc/664-rederive-stub-e-the-wire-protocol)) or fix the file permissions.

A *fail* verdict is signed too. The artifact records what failed and why; engineers can re-derive without rewriting the file, and reviewers can audit the failure history.

## 10. The Stage-Event Stream

The pipeline emits stage events to a callback (the `onStage` parameter) as it runs. Each event names the stage, a status (`start`, `complete`, `error`, `skip`), and stage-specific detail. The stream is the platform's observability surface.

Tooling consumes the stream:

- **The CLI** prints a one-line status per stage, with the detail rendered in a human-readable form. The output stream the CLI prints is the most-frequently-seen surface, but it is the *string-rendered form* of the event stream and not the stream itself.
- **The browser UI** streams events to the page over Server-Sent Events; the engineer watches the build progress live with stage-level granularity.
- **A CI runner** tees events into a structured log, fails the run on the first error event, and emits per-stage timing metrics for cost analysis.
- **A custom tool** may read the stream and short-circuit on the first stage that crosses a budget threshold (useful when authoring constraints under a substrate-cost ceiling).

The platform's commitment is that the *stream's structure* is stable across versions: stage names, status values, and detail key names will not change without explicit migration support. The CLI's stdout format is incidental; engineers integrating rederive into existing CI infrastructure should hook the stream and not parse the stdout text.

## 11. Multi-Call Mode for Engine-Scope Work

Engine-scoped constraint sets (hundreds of constraints, multi-thousand-line implementations) regularly land above the substrate's per-call output budget. The platform's response is *multi-call mode*: partition the constraint set by scope and assemble the modules into a coherent whole.

The mode is designed and proven in proof-of-concept (the platform's own engine has been derived this way at MVE scope: seven modules derived separately, manually wired in `derived-engine/`). The ergonomics of mode selection and automatic partitioning are designed and pending implementation; the proof-of-concept assembly path is operational today and demonstrates that the structural argument carries to engine scope.

For an engineer working on a small library, single-call mode is the default and almost always sufficient. For an engineer working on engine-scoped projects, the recommended pattern today is to author the constraint set as several composable files (each within single-call budget, each with its own `@provides` clause), and to compose them via `@imports` in a small umbrella file. The platform's wire protocol and verification surface treat the umbrella the same as any other constraint set; the difference is purely in the authoring decomposition.

## 12. A Single Run, Concretely

The slugify smoke test, walked through:

```
$ bun run src/cli.ts samples/slugify.constraints.md
[read] start path=samples/slugify.constraints.md
[read] complete bytes=1024
[parse] start
[parse] complete constraintCount=3 importCount=0 pinCount=0
[validate] start
[validate] complete
[resolve] start importCount=0
[resolve] skip
[canonicalize] start
[canonicalize] complete constraintSetHash=a1b2c3...
[derive] start substrate=anthropic-cli model=claude-opus-4-7
[derive] complete codeLines=18
[verify] start constraintCount=3 pinCount=0
[verify] complete verdict=pass results=3
[sign] start
[sign] complete
$ ls samples/slugify.constraints.md.materialization.json
samples/slugify.constraints.md.materialization.json
$
```

Eight stage transitions. One language-model call. Three constraint verdicts. One signed artifact. The whole loop runs in a few seconds end-to-end on a small file. Engine-scoped projects with hundreds of constraints take longer, dominated by the derive stage's substrate cost; multi-call mode amortizes that cost across modules.

## 13. A Failing Run, Walked

Consider a slugify file where SLUG2's third assertion has been written with an incorrect expectation: `slugify("Foo!!!Bar") === "foo-bar"` is correct, but suppose the engineer mistyped it as `slugify("Foo!!!Bar") === "foo--bar"` (two hyphens, contradicting the SLUG2 prose). The build run:

```
[read] complete bytes=1024
[parse] complete constraintCount=3 importCount=0 pinCount=0
[validate] complete
[resolve] skip
[canonicalize] complete constraintSetHash=...
[derive] complete codeLines=18
[verify] start constraintCount=3 pinCount=0
[verify] complete verdict=fail results=3
ERROR: VERIFY_FAILED
  SLUG2: assertion failed
    line 22: slugify("Foo!!!Bar") === "foo--bar"
    expected: true
    actual:   false (slugify produced "foo-bar")
$
```

The pipeline did not reach sign. The error names the failing constraint (SLUG2), the failing assertion (line 22), and the actual value the implementation produced. The engineer reads the evidence, recognizes the typo in the assertion, fixes the constraint file, and re-runs. The full loop costs one substrate call; the fix is in the file, not in the implementation.

This failure mode is the platform's discipline made operational. The engineer did not edit the implementation. The engineer edited the source of truth. The implementation will be regenerated; the source of truth has been corrected.

## 14. What the Engineer Should Take Away

Three pieces.

*The pipeline is small and predictable.* Eight stages. Each stage has a contract. Each stage's failure mode is named. The deterministic stages are pure functions; if a build fails in one of those stages the source is the cause. The non-deterministic stage is gated by verify. Sign attests to the entire tuple.

*The stage-event stream is the observability layer.* Hook it. Do not parse the human-readable stdout. The platform's commitment is that the stream will remain stable across versions; the stdout format is incidental.

*Verify is where you iterate.* The build pipeline is not the place to spend cognitive effort. The constraint authoring layer ([Doc 660](/resolve/doc/660-rederive-the-constraint-authoring-grammar)) and the verification verdict ([Doc 662](/resolve/doc/662-rederive-the-verification-backends), forthcoming) are. The pipeline runs in seconds; your time is in the file you wrote and the evidence you authored.

The next document ([Doc 662](/resolve/doc/662-rederive-the-verification-backends)) covers what each verification backend actually does in stage seven, what evidence it produces, the known scope limits, and how to extend the backend set with your own.

---

## References

- [Doc 247 — Derivation Inversion](/resolve/doc/247-derivation-inversion)
- [Doc 290 — Pin-Art Derivation](/resolve/doc/290-pin-art-derivation)
- [Doc 619 — Pin-Art: Forced-Press and Gentle-Press](/resolve/doc/619-pin-art)
- [Doc 656 — Treat Agent Output Like Compiler Output: The Lights-Out Codebase as Rederive](/resolve/doc/656-treat-agent-output-like-compiler-output-the-lights-out-codebase-as-rederive)
- [Doc 658 — Hierarchical Pin-Art Constraint Specifications and the Erasure of Edge-Case Bugs](/resolve/doc/658-hierarchical-pin-art-constraint-specs-and-the-erasure-of-edge-case-bugs)
- [Doc 659 — Rederive for the Working Engineer: A Hub](/resolve/doc/659-rederive-for-the-working-engineer-hub)
- [Doc 660 — Rederive: The Constraint Authoring Grammar](/resolve/doc/660-rederive-the-constraint-authoring-grammar)

## Appendix: Originating Prompt

> *"Now I want you to examine the entire spec and implementation of /home/jaredef/rederive — From this I want you to create entracement docs in the corpus for an audience of software engineers. ... First, create a document in the corpus that acts as a hub for all stubs that will branch off ... Append this prompt to each artifact. Also, where you could use corpus jargon, instead entrace the reader through rhetoric that is not novel to the corpus. Where you must state the corpus concept in its own terms; provide proper entracement."*
>
> Followed by: *"Continue with the first branch of the hub derived as a corpus doc. Continue through each as is coherent."*
>
> Followed by: *"Now fill out stub A as a comprehensive entracement. Remove 'stub' from file name and any mention in the doc. Report back before doing likewise to the next doc."*
>
> Followed by: *"Continue."*
