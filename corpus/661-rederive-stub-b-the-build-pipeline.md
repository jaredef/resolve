# Rederive Stub B: The Build Pipeline

## The Eight Deterministic Stages — Read, Parse, Validate, Resolve, Canonicalize, Derive, Verify, Sign — What Each Stage Consumes and Produces, What Failure Looks Like at Each, the Stage-Event Stream that Tooling and CI Hook Into, and a Walk-Through of a Single Run from Constraint File to Signed Materialization, Authored as the Second Branch off [Doc 659](/resolve/doc/659-rederive-for-the-working-engineer-hub) for the Working Engineer

<div style="background: #ecfeff; border-left: 4px solid #0e7490; padding: 1rem 1.25rem; margin: 1.5rem 0; color: #164e63; border-radius: 3px;">

**EXPLORATORY — practitioner-facing entracement, stub of [Doc 659](/resolve/doc/659-rederive-for-the-working-engineer-hub) §B.**

*Taxonomy per [Doc 633](/resolve/doc/633-corpus-taxonomy-and-manifest-design):* ENGAGEMENT | ACTIVE | W-PI | THREAD-REDERIVE, THREAD-PRACTITIONER-FACING | PHASE-CROSS-PRACTITIONER

</div>

> **Reader's Introduction.** This is the second branch off the [rederive hub](/resolve/doc/659-rederive-for-the-working-engineer-hub). The first stub ([Doc 660](/resolve/doc/660-rederive-stub-a-the-constraint-authoring-grammar)) explained what a constraint file looks like. This stub explains what the platform does with it. The build pipeline has eight stages. Each stage is a pure function in the deterministic upper layers and a single language-model call in the derivation layer; the eight together turn a constraint file on disk into a signed materialization artifact carrying full provenance. The pipeline emits stage events as it runs, so a CLI, a CI runner, a browser UI, or a downstream tool can observe and react in real time. This stub walks the engineer through each stage in order: what it consumes, what it produces, what failure looks like, how to debug. The hub's earlier "seven stages" framing was a working-engineer's simplification; the actual implementation has eight, and this stub names them precisely.

**Jared Foy · 2026-05-05 · Doc 661**

---

## 1. The Stage Set, Named

Eight stages, in order:

1. **Read** — load the constraint file from disk.
2. **Parse** — tokenize the Markdown and extract the constraint AST.
3. **Validate** — check structural correctness of the AST.
4. **Resolve** — resolve `@imports` to other constraint sets and prepare the import context.
5. **Canonicalize** — normalize the AST and compute the constraint-set content hash.
6. **Derive** — call the language-model substrate with the constraint set and produce code.
7. **Verify** — run the verification backends against the derived code.
8. **Sign** — emit a content-addressed materialization artifact with an Ed25519 signature.

Stages 1 through 5 and 7 and 8 are deterministic above the language-model call: same constraint file produces same canonical hash, same hash with same substrate produces (in expectation) equivalent code under verification, and the signature attests to the precise tuple of inputs that produced this materialization. Stage 6 is where non-determinism enters; verification gates whether that non-determinism produced an acceptable artifact.

## 2. Stage One: Read

*Consumes:* a path to a `.constraints.md` file.
*Produces:* the file's UTF-8 source as a string.
*Failure mode:* file not found, permissions error, encoding error.
*What the engineer does:* nothing, usually. The error messages name the file path; you check the path.

The platform records the byte count of the source on the stage event, which is useful for sanity checks and CI baselines. There is no caching at this stage; reads are cheap enough that re-reading on every build is the right discipline.

## 3. Stage Two: Parse

*Consumes:* the file's source string.
*Produces:* a constraint AST containing an array of constraints (each with id, type, authority, scope, status, depends-on, body, unknown fields, source line) and a manifest (provides, imports, pins).
*Failure mode:* malformed metadata block, missing required fields, malformed manifest header, unrecognized constraint type, syntactically broken fenced block.
*What the engineer does:* read the parser's error report. Errors carry source-line numbers. Most errors are typo-class (a missing colon in a metadata line, a misspelled type value) and are obvious once located.

The parser does not interpret the prose body. It also does not run the fenced evidence; that is the verifier's job in stage seven. The parser's contract is *structural correctness*, which is a cheap and reliable predicate to check before more expensive stages run.

## 4. Stage Three: Validate

*Consumes:* the constraint AST.
*Produces:* a validation report (pass or fail with a list of errors).
*Failure mode:* duplicate constraint IDs, dependency cycles in `depends-on`, references to nonexistent constraint IDs, malformed manifest provides / imports cross-references.
*What the engineer does:* fix the structural problem the validator named. A typical first-time error is forgetting to add a constraint to `depends-on` after introducing it; the validator does not catch missing dependencies (it cannot read your mind), but it does catch typos in the dependency graph.

Validation is the platform's *semantic correctness above the prose*. The discipline is small: if your file passes validate, the platform has a coherent constraint AST to work with. If it does not, no further stage will help.

## 5. Stage Four: Resolve

*Consumes:* the validated AST and the manifest's `@imports` declarations.
*Produces:* a resolved import context (each imported constraint set's interface, its content hash, the path to its materialized code on disk).
*Failure mode:* imported file not found, imported file's threshold-constraint did not pass in its materialization, imported pin (a content hash assertion in the import) did not match the file's actual hash, recursive cycle in the import graph.
*What the engineer does:* if the imported file's threshold did not pass, you derive that file first. If a hash pin does not match, you either update the pin (you intended the change) or revert the imported file (you did not).

For files with no manifest, this stage is a no-op (the stage event reports `status: skip`). Engineers working in single-file projects can largely ignore resolve until composition becomes useful.

## 6. Stage Five: Canonicalize

*Consumes:* the validated AST.
*Produces:* canonical bytes (a deterministic serialization of the constraint set with ordered fields and normalized whitespace) and a SHA-256 content hash of those bytes.
*Failure mode:* none in normal operation; canonicalization is a pure function over a validated AST.
*What the engineer does:* nothing. The canonical hash is what makes the constraint set content-addressable. The hash flows downstream into the materialization artifact and into pinned imports; identical files on two engineers' machines produce identical hashes.

Canonicalize is the layer that gives identity to the constraint set. The corpus's broader argument (that *constraints are durable and code is ephemeral*; [Doc 656](/resolve/doc/656-treat-agent-output-like-compiler-output-the-lights-out-codebase-as-rederive) names this in the engineer's vocabulary as the source-language vs. binary distinction) is operational right here. The hash is the constraint set's identity. Two derivations against the same hash are interchangeable under verification.

## 7. Stage Six: Derive

*Consumes:* the canonical AST, the resolved import context, and a substrate handle (the language-model interface).
*Produces:* a derived code string (TypeScript by default at MVE scope; the substrate interface admits other targets when extended).
*Failure mode:* substrate API error, substrate output budget exceeded (truncation), substrate produced syntactically invalid output, substrate refused (rare; usually a misconfigured prompt or a substrate-side guardrail).
*What the engineer does:* if the output is truncated for engine-scope work, partition by scope (the multi-call mode; [Doc 659](/resolve/doc/659-rederive-for-the-working-engineer-hub) §K). If the substrate produced syntactically invalid output, the verify stage will catch it; you typically do not need to debug derive directly.

This is the only stage that is not deterministic above the canonical hash. The derivation function (substrate identity, model id, prompt template) is itself recorded in the materialization artifact, so the provenance tuple captures *why* this code was produced from this constraint set. Two derivations against the same constraint set with different substrates are different code; both are valid if both pass verification.

## 8. Stage Seven: Verify

*Consumes:* the derived code, the constraint AST, the import context, and the pin manifest.
*Produces:* a verification report — per-constraint verdicts (pass or fail with evidence) and an overall verdict (pass if every constraint passed; fail otherwise).
*Failure mode:* type-checker error, assertion failed, property fuzzer found a counterexample, language-model judge ruled fail, pin-checker did not find the pinned phrase, accessibility static rule violated, flow runner observed a divergence.
*What the engineer does:* read the per-constraint evidence. The verdict identifies the constraint and the backend; the backend's evidence is the line number, the failing assertion, the counterexample input, the missing pin phrase, or whatever the backend produces. You either refine the constraint (you under-specified) or refine the prose body (you specified ambiguously); you re-derive.

Verify is where the engineer's iteration loop lives. The discipline catalogue ([Doc 659](/resolve/doc/659-rederive-for-the-working-engineer-hub) §F: Pin-Art) covers what you change at each round to converge faster. The next stub ([Doc 662, *The Verification Backends*](#)) covers what each backend actually does.

## 9. Stage Eight: Sign

*Consumes:* the constraint-set hash, the substrate identity, the derived code, the verification verdict, and the active signing key.
*Produces:* a signed materialization artifact, written to `<filename>.constraints.md.materialization.json` next to the source. The artifact carries the provenance tuple and the Ed25519 signature.
*Failure mode:* signing key not configured, signing key invalid, write permission error.
*What the engineer does:* if signing fails, you check the key configuration. The signing layer is the platform's identity boundary; a signed materialization can be transferred to another machine and verified without contacting the platform.

Sign is also where the verdict is recorded for downstream tooling. CI checks, review tools, and the browser UI read the materialization artifact to know whether this constraint set's current materialization is acceptable. A *fail* verdict is signed too; the artifact records what failed and why, and the engineer can re-derive without rewriting the file.

## 10. The Stage-Event Stream

The pipeline emits stage events to a callback (the `onStage` parameter) as it runs. Each event names the stage, a status (`start`, `complete`, `error`, `skip`), and stage-specific detail. Tooling consumes the stream:

- The CLI prints a one-line status per stage.
- The browser UI streams events to the page over Server-Sent Events; the engineer watches the build progress live.
- A CI runner tees events into a structured log, fails the run on the first error event, and emits per-stage timing metrics for cost analysis.
- A custom tool may read the stream and short-circuit on the first stage that crosses a budget threshold (useful when authoring constraints under a substrate-cost ceiling).

The stream is the platform's observability surface. Engineers integrating rederive into existing CI infrastructure should hook the stream and not the stdout text; the text format is for humans, the stream is for machines.

## 11. A Single Run, Concretely

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

## 12. What the Engineer Should Take Away

Three pieces.

*The pipeline is small and predictable.* Eight stages. Each stage has a contract. Each stage's failure mode is named. The deterministic stages (read, parse, validate, resolve, canonicalize, sign) are pure functions; if a build fails in one of those stages the source is the cause. The non-deterministic stage (derive) is gated by verify. Sign attests to the entire tuple.

*The stage-event stream is the observability layer.* Hook it. Do not parse the human-readable stdout. The platform's commitment is that the stream will remain stable across versions; the stdout format is incidental.

*Verify is where you iterate.* The build pipeline is not the place to spend cognitive effort. The constraint authoring layer (stub A) and the verification verdict (stub C, next) are. The pipeline runs in seconds; your time is in the file you wrote and the evidence you authored.

The next stub ([§C *The Verification Backends*](#)) covers what each backend actually does in stage seven, what evidence it produces, and how to extend the backend set with your own.

---

## References

- [Doc 247 — Derivation Inversion](/resolve/doc/247-derivation-inversion)
- [Doc 290 — Pin-Art Derivation](/resolve/doc/290-pin-art-derivation)
- [Doc 619 — Pin-Art: Forced-Press and Gentle-Press](/resolve/doc/619-pin-art)
- [Doc 656 — Treat Agent Output Like Compiler Output: The Lights-Out Codebase as Rederive](/resolve/doc/656-treat-agent-output-like-compiler-output-the-lights-out-codebase-as-rederive)
- [Doc 658 — Hierarchical Pin-Art Constraint Specifications and the Erasure of Edge-Case Bugs](/resolve/doc/658-hierarchical-pin-art-constraint-specs-and-the-erasure-of-edge-case-bugs)
- [Doc 659 — Rederive for the Working Engineer: A Hub](/resolve/doc/659-rederive-for-the-working-engineer-hub)
- [Doc 660 — Rederive Stub A: The Constraint Authoring Grammar](/resolve/doc/660-rederive-stub-a-the-constraint-authoring-grammar)

## Appendix: Originating Prompt

> *"Now I want you to examine the entire spec and implementation of /home/jaredef/rederive — From this I want you to create entracement docs in the corpus for an audience of software engineers. ... First, create a document in the corpus that acts as a hub for all stubs that will branch off ... Append this prompt to each artifact. Also, where you could use corpus jargon, instead entrace the reader through rhetoric that is not novel to the corpus. Where you must state the corpus concept in its own terms; provide proper entracement."*
>
> Followed by: *"Continue with the first branch of the hub derived as a corpus doc. Continue through each as is coherent."*
