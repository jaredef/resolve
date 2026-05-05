# Rederive: The Verification Backends

## A Comprehensive Entracement to the Seven Backends — TypeScript Compiler, Assertion Runner, Property Runner, Language-Model Judge, Pin Checker, Static Accessibility Rules, DOM Flow Runner — with the Hard-vs-Soft Classification that Determines What Blocks Sign, the Per-Backend Inputs and Evidence Format, the Constraint-Type-to-Backend Routing Convention, the Honest Scope Limits on Each, and the Small Extension Surface for Team-Specific Backends — the Third Branch off [Doc 659](/resolve/doc/659-rederive-for-the-working-engineer-hub) for the Working Engineer

<div style="background: #ecfeff; border-left: 4px solid #0e7490; padding: 1rem 1.25rem; margin: 1.5rem 0; color: #164e63; border-radius: 3px;">

**EXPLORATORY — practitioner-facing entracement, branch §C of [Doc 659](/resolve/doc/659-rederive-for-the-working-engineer-hub).**

*Taxonomy per [Doc 633](/resolve/doc/633-corpus-taxonomy-and-manifest-design):* ENGAGEMENT | ACTIVE | W-PI | THREAD-REDERIVE, THREAD-PRACTITIONER-FACING | PHASE-CROSS-PRACTITIONER

</div>

> **Reader's Introduction.** This is the third branch off the [rederive hub](/resolve/doc/659-rederive-for-the-working-engineer-hub). The first two documents covered authoring ([Doc 660](/resolve/doc/660-rederive-the-constraint-authoring-grammar)) and execution ([Doc 661](/resolve/doc/661-rederive-the-build-pipeline)). This document explains the verification layer, the place where the platform's contract with the engineer is enforced. The verification verdict is what gates acceptance of a derivation; the backend system is what produces the verdict. There are seven backends. Six are *hard* (a failure blocks sign; the materialization is rejected). One is *soft* (a failure is recorded as evidence but does not block sign). Each backend reads a specific kind of fenced evidence from the constraint file and produces a per-constraint pass / fail result with concrete evidence. This document names each backend, what it consumes, what evidence it produces, the constraint type it conventionally serves, and the honest scope limits a working engineer should know about before depending on the platform for production work. By the end, the engineer should be able to read a verification report and locate any failure to a specific backend, a specific constraint, and a specific recovery.

**Jared Foy · 2026-05-05 · Doc 662**

---

## Authorship and Scrutiny

*Authorship.* Written by Claude Opus 4.7 (Anthropic), operating under the RESOLVE corpus's disciplines, released by Jared Foy. The keeper has not authored the prose; the resolver has. The rhetoric is calibrated to a working-engineer audience.

---

## 1. The Backend Set, Named

Seven backends, each with a clear remit and a hard / soft classification:

1. **TypeScript Compiler** *(hard)* — runs `tsc` over the derived code under strict TypeScript settings.
2. **Assertion Runner** *(hard)* — wraps each line of an `assert` block in an executable harness and runs it against the derived module.
3. **Property Runner** *(hard)* — fuzzes inputs against a property predicate and reports counterexamples.
4. **Language-Model Judge** *(soft)* — calls a separate substrate to evaluate prose criteria against the derived code.
5. **Pin Checker** *(hard)* — confirms the derived code contains required phrases verbatim.
6. **Static Accessibility Rules** *(hard)* — applies a small high-value rule set against derived UI markup.
7. **DOM Flow Runner** *(hard)* — instantiates the derived UI in a DOM and observes user-flow assertions.

The hard / soft classification is consequential. A *hard* backend's failure blocks sign; the engine reports verify as failed and the materialization is not produced. A *soft* backend's failure is recorded in the verification evidence but does not block sign; the engineer can read the soft signal at review time, but the materialization is still emitted. Only the language-model judge is soft; this is by design (the judge is non-deterministic and prose-evaluated, and the platform refuses to gate acceptance on it).

Each backend reads its evidence from a fenced block in the constraint file (the `assert`, `property`, `judgment`, `pin`, `a11y`, `flow` fences from [Doc 660 §3.4](/resolve/doc/660-rederive-the-constraint-authoring-grammar)). The platform routes per fence and runs all backends in parallel where possible. Per-constraint verdicts are the conjunction of every hard backend's outcome on that constraint's blocks; soft backends contribute evidence without affecting the per-constraint verdict.

## 2. The TypeScript Compiler Backend

*Class:* hard.
*Consumes:* the derived code, the resolved imports' code (so cross-module imports type-check), strict TypeScript settings.
*Produces:* either a clean compile (no type errors) or a list of `tsc` errors with file, line, column, and message.
*Reads which fence:* none directly. The compiler runs over the derived module unconditionally; it serves every constraint implicitly.
*Constraint types it serves:* primarily *specification* constraints, which often have no fenced evidence and rely on the type checker as their verification surface.

The compiler is the cheap-and-fast first pass. The platform writes the derived code to a temporary directory, writes a `tsconfig.json` with strict settings (`strict: true`, `noUncheckedIndexedAccess`, `noImplicitAny`, etc.), and invokes `tsc`. If the compile fails, none of the runtime backends will produce useful evidence (the code does not execute), so the platform short-circuits and reports the compiler errors as the constraint's evidence.

*Evidence format:* the standard `tsc` output. If you have read TypeScript compiler errors, the format is familiar: `<file>:<line>:<col> - error TS<code>: <message>`.

*Scope limits:* the type checker is as strong as your TypeScript types are. If your constraint says "the function takes a string and returns a string" and the derived code has correct types, the checker will not catch a runtime bug; that is what the assertion and property runners are for. The compiler also does not check semantic correctness against your prose; a function that type-checks but does the wrong thing is the assertion runner's territory.

## 3. The Assertion Runner Backend

*Class:* hard.
*Consumes:* an `assert` block (each non-comment line an executable expression that should evaluate true) and the compiled module.
*Produces:* per-line pass / fail with the failing expression's value when fail.
*Reads which fence:* ` ```assert` or ` ```assertion`.
*Constraint types it serves:* *predicate* and *invariant* constraints, and any constraint whose evidence is a set of canonical examples. The assertion runner is the workhorse of constraint verification at small scale.

The runner extracts the `assert` block's lines, strips trailing line comments, filters out blank and comment-only lines, and wraps each remaining line in a small harness. The default harness is *expression-as-assertion*: each line is treated as a boolean expression that must evaluate true. There is also an explicit form: `__assert(<expr>, <label>)` if you want to attach a label to a particular check (the label appears in the failure evidence).

The harness imports the derived module under test, defines `__assert`, and executes each assertion in sequence. Any thrown exception is reported with the assertion's source line and message. The first failure in an `assert` block reports the failure; subsequent assertions in the same block are still executed (so the engineer sees all failures, not just the first).

*Evidence format:* the failing assertion's source line and the actual value produced. Standard "expected true, got X" output, with the assertion's source text rendered for readability.

*Scope limits:* an assertion exercises one input at a time. The slugify sample's six assertions cover six concrete inputs; if the function fails on a seventh input you did not write down, the assertion runner will not catch it. Use property runner for quantified evidence; use the assertion runner for the canonical examples a reviewer needs to read to understand the requirement.

## 4. The Property Runner Backend

*Class:* hard.
*Consumes:* a `property` block (a property predicate over typed inputs) and the compiled module.
*Produces:* either a clean run (no counterexample found within the iteration budget) or a counterexample (the input that falsified the property), shrunk to minimal form.
*Reads which fence:* ` ```property` or ` ```properties`.
*Constraint types it serves:* *invariant* constraints (a property that must always hold) and *predicate* constraints whose input space is large enough to reward fuzzing.

The runner uses a deterministic seeded pseudo-random generator (`__makeRand(seed)`, with a stable seed derived from the constraint id and the property index, so reruns are reproducible). It generates inputs of declared types, evaluates the property predicate against each, and looks for a counterexample. On finding a counterexample, it shrinks (iteratively reduces the input toward minimal form) and reports the smallest falsifying input.

The property block's contract is small. The block is treated as a function body that returns a boolean property; the harness invokes it many times with generated inputs; failure is any false return or thrown exception.

*Evidence format:* the smallest counterexample, with the failing property's source text rendered. If no counterexample is found within the budget, the runner reports `pass` with the iteration count and the seed.

*Scope limits:* the runner has a budget per property (typically a few thousand iterations). If your property has a very narrow failure region, fuzzing may not find it. Pair property runs with hand-picked assertion examples for the regions you know matter. The runner also generates inputs of types it can reason about (primitives, arrays, simple records); complex domain types may require explicit generators in the property block.

## 5. The Language-Model Judge Backend

*Class:* **soft**.
*Consumes:* a `judgment` block (a prose criterion) and the derived code.
*Produces:* a verdict (pass / fail) with prose reasoning and an optional confidence score.
*Reads which fence:* ` ```judgment` or ` ```judgement`.
*Constraint types it serves:* *bridge* and *methodology* constraints, and any constraint whose criterion resists mechanical encoding.

The judge is the platform's safety valve for criteria the other backends cannot encode. It exists because the alternative would be to leave those criteria unspecified, which is the failure mode (the corpus calls this *implicit form*; in engineering terms, *the requirement that lives in the developer's head and never reaches the codebase*) the platform is designed to eliminate.

The runner constructs a prompt from the criterion and the derived code, calls the substrate (typically the same substrate used for derivation, though the platform admits a separate judge substrate), parses the response into a verdict and reasoning, and records both. The prompt-shaping is small and stable (`buildJudgePrompt`); the response-parsing is permissive (the parser accepts several phrasings of "pass" / "fail" plus optional reasoning).

*Evidence format:* the judge's prose reasoning, with the verdict prefixed (`[judgment:fail (soft)] <reasoning>`). If the judge's response did not parse, the evidence reports the parse failure.

**Soft classification, named explicitly.** A judgment failure does not block sign. The verification evidence carries the judge's reasoning, the engineer reads it, the engineer decides whether to refine the criterion or accept the soft signal. The platform refuses to gate acceptance on a non-deterministic prose evaluation by design; if you want a hard gate, encode the criterion as an assertion or property.

*Scope limits:* the judge is a substrate call. It costs a substrate-call's worth of latency and tokens per judgment block. It is not deterministic in the same way the type checker or assertion runner is; the same code with the same criterion may produce slightly different reasoning across runs, though the verdict is generally stable. Use the judge for criteria that are genuinely prose-y; do not abuse it for things the assertion runner would handle better.

## 6. The Pin Checker Backend

*Class:* hard.
*Consumes:* the pin manifest (`@pins` entries from the file's manifest header) and the derived code.
*Produces:* per-pin pass / fail with the missing phrase named when fail.
*Reads which fence:* none. Pins live in the manifest header, not in fenced blocks within constraints.
*Constraint types it serves:* any constraint whose authored intent depends on a specific implementation detail being preserved across regenerations.

The pin checker is small. For each pin entry, it confirms that the derived code contains the `mustContain` string verbatim. If the substring is found, the pin passes; if not, the pin fails and the missing phrase is named in the evidence.

*Evidence format:* pin id, the missing phrase, and the pin's `why` field (so the reviewer reading the failure understands what the pin was preserving).

*Scope limits:* pins are exact-match. They are not regular expressions and they are not semantic. If you pin `'throw new Error("not found")'` and the substrate produces `"throw new Error('not found')"`, the pin fails on the quote style. Use pins sparingly and for phrases that genuinely matter (an error message a downstream consumer parses, a function name a third-party tool depends on, a comment that flags a regulatory requirement).

The pin-discipline principles (pin only what intent depends on; document the why; prefer constraints over pins; retract stale pins) are documented in [Doc 663 §5](/resolve/doc/663-rederive-stub-d-content-addressed-identity-and-pin-manifests).

## 7. The Static Accessibility Rules Backend

*Class:* hard.
*Consumes:* an `a11y` block (an expression that returns rendered HTML) and the compiled module.
*Produces:* per-rule pass / fail with the violating element identified when fail.
*Reads which fence:* ` ```a11y` or ` ```accessibility`.
*Constraint types it serves:* UI specification and invariant constraints whose body declares accessibility requirements.

The runner executes the `a11y` block (which evaluates to a rendered HTML fragment), then applies the static rule set against the result. The MVE rule set covers five common high-leverage WCAG-aligned rules:

- **`img-alt`** — every `<img>` must have an `alt` attribute.
- **`button-name`** — every `<button>` must have non-empty text content, an `aria-label`, or an `aria-labelledby`.
- **`link-name`** — every `<a href>` must have non-empty text content or an `aria-label`.
- **`input-label`** — every form control (`<input>`, `<select>`, `<textarea>`) must have an accessible name (a `<label for=>` referent, an `aria-label`, an `aria-labelledby`, or a `title`).
- **`lang-attr`** — if the rendered fragment is a full `<html>` document, it must have a `lang` attribute.

These five rules cover the common-case errors a reasonable reviewer would catch on inspection. The discipline of separating *structural patterns* (which are testable with regex assertions) from *accessibility rules* (which are testable with this backend) is worth absorbing; the two surfaces are different and both useful.

*Evidence format:* the failing rule name, the offending element's source text (truncated), and a one-line message describing the violation.

*Scope limits:* the rule set is intentionally small. Full axe-core coverage (color contrast, ARIA reference correctness, focus-trap detection, role-conflict checks) requires a real browser environment, which is on the platform's roadmap but not in the MVE. If your project has accessibility requirements beyond the small ruleset, the recommended path is to author additional pins or judgments for the specific WCAG criteria you care about until the browser-stage backend lands.

## 8. The DOM Flow Runner Backend

*Class:* hard.
*Consumes:* a `flow` block (a sequence of user actions and observation points) and the compiled UI module.
*Produces:* per-step pass / fail with the failing observation named when fail.
*Reads which fence:* ` ```flow` or ` ```interaction`.
*Constraint types it serves:* UI behavioural constraints whose body declares an interaction pattern.

The runner uses a JSDOM-style DOM library under Bun rather than a real browser. It loads the derived UI's HTML into a window, exposes `window` and `document` to the flow block's code, and executes the flow's steps in sequence. Pure-DOM assertions (element exists, element has class, element text matches) work reliably.

*Evidence format:* the failing step number, the actual DOM state at that step (truncated), and the assertion that failed.

*Scope limits:* script execution under the runner is unreliable because Bun's VM has restrictions on some patterns common in derived UI code (specifically: scripts that depend on full browser globals, scripts that manipulate `<script>` elements, scripts that use APIs not present in the DOM library). The recommended discipline is to author flows that observe DOM state without relying on heavy client-side scripting until the browser-stage backend lands. Engineers working on heavy-script UIs should carry the limit in mind when authoring; the platform does not silently fail, but it does not catch errors that would only manifest under a real browser's full execution.

## 9. Routing: Constraint Type to Backend

The platform routes each fenced block to its backend by the fence language tag. The metadata `type:` field on the constraint is informational for review; it does not change routing. A single constraint may have several fenced blocks of different types, in which case all relevant backends run in parallel and the constraint's verdict is the conjunction of all *hard* backend results (with soft backends contributing evidence without affecting the verdict).

A useful default mapping for the engineer authoring constraints:

| Constraint type | Conventional backend |
|---|---|
| *specification* | TypeScript compiler (no fenced block needed) |
| *predicate* | Assertion runner (canonical examples) and / or property runner (fuzzed) |
| *invariant* | Property runner (the invariant must hold across the input space) and / or assertion runner for boundary cases |
| *bridge* | Language-model judge (the criterion is prose) |
| *methodology* | Language-model judge, sometimes with pin manifest entries |
| *example* | Assertion runner (the example is its own evidence) |
| *counterexample* | Assertion runner (the assertion frames the negative case) |

This is convention, not enforcement. The platform does not police your choices.

## 10. The Verification Report

The verify stage produces a `VerificationReport` containing:

```typescript
interface VerificationReport {
  verdict: "pass" | "fail";              // overall
  results: ConstraintVerification[];     // one per constraint
}

interface ConstraintVerification {
  constraintId: string;
  status: "pass" | "fail" | "skip";
  evidence: string;
}
```

Each constraint's evidence is a multi-line string of the form `[<kind>:<status>] <evidence>` per backend that ran, with soft results annotated `(soft)`. A skipped constraint (its dependencies failed) reports `status: skip` with no backend evidence; the report explains the skip in its evidence string.

The CLI renders the report at the end of a build; the browser UI renders it as a structured page; the materialization artifact records it for downstream consumers. The report is the engineer's primary debugging surface when a build fails. Read it top to bottom, locate the first hard failure, refine the constraint, re-run.

## 11. Extending the Backend Set

The verification subsystem is designed for extension. A new backend implements a small interface (consume the derived code and the constraint, produce a `ConstraintVerification` with evidence), registers itself with the verifier, claims a fence language tag, and declares its hard / soft classification. Common extensions an engineering team might write:

- A *contract checker* backend for backend-to-frontend API contracts (consume an OpenAPI document, verify the derived server matches).
- A *performance budget* backend (consume a benchmark threshold, run the derived code under load, verify the threshold holds).
- A *security linter* backend (consume a CWE rule set, scan derived code for known anti-patterns).
- A *regulatory* backend (consume a compliance checklist, run the derived code against a third-party validator).
- A *snapshot* backend (consume a reference output, verify the derived module produces matching output for given inputs).

The pattern is the same in each case: the constraint file gains a new fence type, the backend reads its blocks, and the verdict integrates into the per-constraint evidence the engineer already reads. No core platform changes are required; the backend registry is the extension surface.

The MVE does not yet expose the backend registration interface as a public API; engineering teams can patch the verifier directly to add backends, which is fine for sketch-stage work but will be replaced with a stable extension API in a later phase.

## 12. Reading a Verification Failure, Concretely

Consider a constraint file with three constraints (SLUG1, SLUG2, SLUG3 from the slugify sample), where the substrate has produced an implementation that handles ASCII correctly but throws on Unicode whitespace. The build run:

```
[verify] start constraintCount=3 pinCount=0
[verify] complete verdict=fail results=3
ERROR: VERIFY_FAILED
  SLUG1: pass [tsc: clean]
  SLUG2: pass [assert: 6/6 passed]
  SLUG3: fail [assert: 1 failed]
    line 39: !slugify("foo  bar  baz").includes("--")
    expected: true
    actual:   false (slugify produced "foo--bar--baz" — the second space-run was not collapsed)
```

The engineer reads the failure: SLUG3 (the invariant against double hyphens) failed on a specific input. The implementation passed the canonical examples in SLUG2 but missed the case where multiple consecutive whitespace characters appear. Recovery: refine SLUG2's prose to name the multiple-whitespace case explicitly, add an `assert` for it (`slugify("foo  bar") === "foo-bar"`), re-derive. The next derivation will see the new evidence and produce code that handles the case.

This is the iteration loop the platform makes operational. The engineer did not edit the implementation; the engineer refined the constraint. The implementation is regenerated.

## 13. What the Engineer Should Take Away

Three pieces.

*The verification verdict is the contract.* The platform's discipline is that an accepted derivation is one that passes verification; reading the derived code is not how the engineer judges acceptance. If you do not trust the verdict, the work is to author stronger evidence in the constraint file, not to read the derived code line by line.

*Each backend has a clear remit and a hard / soft classification.* Use the right backend for the right kind of evidence. Type checks for shapes. Assertions for canonical examples. Properties for quantified coverage. Judgments for prose criteria (with the *soft* caveat: judgments do not block sign). Pins for preservation. Static accessibility for UI basics. Flow runner for DOM behaviour. The mapping is small; learn it once and the constraint files write themselves.

*Scope limits are honest.* The MVE has scope limits in the static accessibility ruleset (five rules covered; full axe-core requires real browser) and the DOM flow runner (script execution under Bun's VM is unreliable). The platform does not pretend otherwise. The roadmap names the browser-stage backend that will lift those limits; until it lands, the engineer authors around them with judgments and pins.

The next document ([Doc 663](/resolve/doc/663-rederive-stub-d-content-addressed-identity-and-pin-manifests)) covers how the constraint set's content hash is computed and how the cross-cutting pin manifest works. That document closes the loop on identity, preservation, and the substitutability promise the platform makes.

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

## Appendix: Originating Prompt

> *"Now I want you to examine the entire spec and implementation of /home/jaredef/rederive — From this I want you to create entracement docs in the corpus for an audience of software engineers. ... First, create a document in the corpus that acts as a hub for all stubs that will branch off ... Append this prompt to each artifact. Also, where you could use corpus jargon, instead entrace the reader through rhetoric that is not novel to the corpus. Where you must state the corpus concept in its own terms; provide proper entracement."*
>
> Followed by: *"Continue with the first branch of the hub derived as a corpus doc. Continue through each as is coherent."*
>
> Followed by: *"Now fill out stub A as a comprehensive entracement. Remove 'stub' from file name and any mention in the doc. Report back before doing likewise to the next doc."*
>
> Followed by: *"Continue."* (twice; once advancing to the build pipeline, once advancing to the verification backends.)
