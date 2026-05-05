# Rederive Stub C: The Verification Backends

## The Seven Backends — Type Checker, Assertion Runner, Property Runner, Language-Model Judge, Pin Checker, Static Accessibility Rules, DOM Flow Runner — What Each Backend Consumes, What Evidence It Produces, Which Constraint Type Routes to Which Backend, the Known Scope Limits, and How to Extend the Backend Set with Your Own, Authored as the Third Branch off [Doc 659](/resolve/doc/659-rederive-for-the-working-engineer-hub) for the Working Engineer

<div style="background: #ecfeff; border-left: 4px solid #0e7490; padding: 1rem 1.25rem; margin: 1.5rem 0; color: #164e63; border-radius: 3px;">

**EXPLORATORY — practitioner-facing entracement, stub of [Doc 659](/resolve/doc/659-rederive-for-the-working-engineer-hub) §C.**

*Taxonomy per [Doc 633](/resolve/doc/633-corpus-taxonomy-and-manifest-design):* ENGAGEMENT | ACTIVE | W-PI | THREAD-REDERIVE, THREAD-PRACTITIONER-FACING | PHASE-CROSS-PRACTITIONER

</div>

> **Reader's Introduction.** This is the third branch off the [rederive hub](/resolve/doc/659-rederive-for-the-working-engineer-hub). The first stub explained the constraint file. The second stub explained the build pipeline that turns a constraint file into a derived module. This stub explains the *verification* layer — the seven backends that, in stage seven of the pipeline, run against the derived code and produce the per-constraint evidence the platform's verdict is based on. The verification layer is where the engineer's contract with the platform is enforced. If the verification verdict is *pass*, the constraint file's requirements were satisfied by the substrate's derivation. If the verdict is *fail*, the engineer reads the per-constraint evidence and refines the source. This stub names each backend, the evidence it produces, the constraint type it serves, and the operational scope limits a working engineer should know about before running the platform on a real project.

**Jared Foy · 2026-05-05 · Doc 662**

---

## 1. The Backend Set

Seven backends, each with a clear remit:

1. **Type Checker** — runs `tsc` over the derived code under strict TypeScript settings.
2. **Assertion Runner** — wraps each line of an `assert` block in an executable harness and runs it against the derived module.
3. **Property Runner** — fuzzes inputs against a property predicate and reports counterexamples.
4. **Language-Model Judge** — calls a separate substrate to evaluate prose criteria against the derived code.
5. **Pin Checker** — confirms the derived code contains required phrases verbatim.
6. **Static Accessibility Rules** — applies a small high-value rule set against derived UI markup.
7. **DOM Flow Runner** — instantiates the derived UI in a DOM and observes user-flow assertions.

Each backend reads its evidence from a fenced block in the constraint file (the `assert`, `property`, `judgment`, `pin`, etc. fences from [Doc 660](/resolve/doc/660-rederive-stub-a-the-constraint-authoring-grammar) §2(d)). The platform routes per fence and runs all backends in parallel where possible. Per-constraint verdicts are the conjunction of every backend's outcome on that constraint's blocks.

## 2. Type Checker

*Consumes:* derived code, the constraint set's import context, strict TypeScript settings.
*Produces:* either a clean compile or a list of `tsc` errors with file, line, column, and message.
*Constraint types it serves:* primarily *specification* constraints (these state the shape of the deliverable). Any constraint whose body specifies a function signature, an interface, an exported symbol set, or a strict-typing requirement gets implicit type-checker coverage.
*Evidence the engineer reads:* the standard `tsc` output. If you have read TypeScript compiler errors before, the format will be familiar.
*Scope limits:* the type checker is as strong as your TypeScript types are. If your constraint says "the function takes a string and returns a string" and the derived code has correct types, the checker will not catch a runtime bug; that is what the assertion and property runners are for.

The type checker is the cheap-and-fast first pass. If type-check fails, none of the runtime backends will produce useful evidence (the code does not compile), so the platform short-circuits and reports the type errors as the constraint's evidence.

## 3. Assertion Runner

*Consumes:* an `assert` block (each line an executable expression that should evaluate true) and the compiled module.
*Produces:* per-line pass/fail with the failing expression's value when fail.
*Constraint types it serves:* *predicate* and *invariant* constraints. The assertion runner is the workhorse of constraint verification at small scale.
*Evidence the engineer reads:* the failing assertion's source line and the actual value produced. Standard "expected X, got Y" output.
*Scope limits:* an assertion exercises one input at a time. The slugify sample's six assertions cover six concrete inputs; if the function fails on a seventh input you did not write down, the assertion runner will not catch it. Use property runner for quantified evidence; use the assertion runner for the canonical examples a reviewer needs to read to understand the requirement.

The assertion runner's harness is small. Each assertion is wrapped in `__assert(<expr>, <source>)` and any thrown exception is reported with the source line. There is no test framework; assertions are just expressions, the way they appear in the file.

## 4. Property Runner

*Consumes:* a `property` block (a property predicate over typed inputs) and the compiled module.
*Produces:* either a clean run (no counterexample found within the budget) or a counterexample (the input that falsified the property).
*Constraint types it serves:* *invariant* constraints (a property that must always hold), and any *predicate* constraint where the input space is large enough to reward fuzzing.
*Evidence the engineer reads:* the smallest counterexample the runner found. The property runner uses iterative shrinking on a found counterexample, so the input you read is generally minimal.
*Scope limits:* the runner has a budget per property (typically a few thousand iterations). If your property has a very narrow failure region, fuzzing may not find it. Pair property runs with hand-picked assertion examples for the regions you know matter.

Property tests scale with the input space. Use them where the slugify sample's hand-picked assertions would be insufficient (a parser, a serializer, a hash function, anything where adversarial inputs matter).

## 5. Language-Model Judge

*Consumes:* a `judgment` block (a prose criterion) and the derived code.
*Produces:* a verdict (pass or fail) with prose reasoning.
*Constraint types it serves:* *bridge* and *methodology* constraints, and any constraint whose criterion resists mechanical encoding ("the function is named clearly," "the error messages are actionable," "the structure is idiomatic").
*Evidence the engineer reads:* the judge's prose reasoning. If the judge says fail, the reasoning typically points to specific lines or specific phrasing the criterion was checking.
*Scope limits:* the judge is a substrate call. It costs a substrate-call's worth of latency per judgment block. It is not deterministic in the same way the type checker or assertion runner is; the same code with the same criterion may produce slightly different reasoning across runs, though the verdict is generally stable. Use the judge for constraints whose criterion is genuinely prose-y; do not abuse it for things the assertion runner would handle better.

The judge is the platform's safety valve for criteria the other backends cannot encode. It exists because the alternative would be to leave those criteria unspecified, which is the failure mode (the corpus calls this *implicit form*; in engineering terms, *the requirement that lives in the developer's head and never reaches the codebase*) the platform is designed to eliminate.

## 6. Pin Checker

*Consumes:* a `pin` block (each line a phrase that must appear verbatim) or pin entries from the file's pin manifest, and the derived code.
*Produces:* per-pin pass/fail with the missing phrase named when fail.
*Constraint types it serves:* any constraint whose authored intent depends on a specific implementation detail being preserved across regenerations.
*Evidence the engineer reads:* the missing phrase. If a pin fails, the substrate produced code that did not include the pinned phrase; you either re-derive (the substrate may include it on retry) or you change the pin (the requirement was over-specified).
*Scope limits:* pins are exact-match. They are not regular expressions and they are not semantic. If you pin `"throw new Error("not found")"` and the substrate produces `"throw new Error('not found')"`, the pin fails on the quote style. Use pins sparingly and for phrases that genuinely matter (an error message a downstream consumer parses, a function name a third-party tool depends on, a comment that flags a regulatory requirement).

The pin layer composes with the platform's broader pin-manifest preservation system ([Doc 659](/resolve/doc/659-rederive-for-the-working-engineer-hub) §D, the next stub). The in-block syntax is the constraint's local pinning; the manifest layer is for cross-cutting preservation.

## 7. Static Accessibility Rules

*Consumes:* a derived UI module and a small set of high-value WCAG-aligned rules.
*Produces:* per-rule pass/fail with the violating element identified when fail.
*Constraint types it serves:* UI specification constraints whose body declares accessibility requirements ("the form has a labeled submit button," "the page has a proper landmark structure").
*Evidence the engineer reads:* the failing rule and the violating element. The rule set covers the common high-leverage cases (missing labels, missing alt text, broken landmark structure, color-contrast violations on declared theme tokens, missing keyboard focus).
*Scope limits:* the static rule set is intentionally small. It catches the common-case errors a reasonable reviewer would catch on inspection. Full axe-core coverage requires a real browser environment, which is on the platform's roadmap but not in the MVE. If your project has accessibility requirements beyond the small ruleset, the recommended path is to author additional pins or judgments for the specific WCAG criteria you care about until the browser-stage backend lands.

The static backend's value is its predictability. Engineers can ship UI work with confidence that the basics are caught at verify; the engineer remains responsible for the cases the small ruleset does not cover.

## 8. DOM Flow Runner

*Consumes:* a derived UI module and a `flow` block (a sequence of user actions and observation points).
*Produces:* per-step pass/fail with the failing observation named when fail.
*Constraint types it serves:* UI behavioural constraints whose body declares an interaction pattern ("when the user clicks Submit, the form transitions to the loading state").
*Evidence the engineer reads:* the failing step and the actual DOM state at that step.
*Scope limits:* the flow runner uses a DOM library under Bun rather than a real browser. Pure-DOM assertions (element exists, element has class, element text matches) are reliable. Script execution under the runner is unreliable because Bun's VM has restrictions on some patterns common in derived UI code; the recommended discipline is to author flows that observe DOM state without relying on heavy client-side scripting until the browser-stage backend lands.

Like the static accessibility backend, the flow runner is intentionally scoped. It catches the cases that matter most, leaves the cases that need a real browser to the roadmap, and tells the engineer plainly which is which.

## 9. Routing: Constraint Type to Backend

The platform routes each fenced block to its backend by the fence language tag. The metadata `type:` field on the constraint is informational for review; it does not change routing. A single constraint may have several fenced blocks of different types, in which case all relevant backends run in parallel and the constraint's verdict is the conjunction.

A useful default mapping for the engineer authoring constraints:

- *specification* → typically no fenced block beyond what the type checker reads (the prose declares the interface).
- *predicate* → `assert` blocks (hand-picked examples) and / or `property` blocks (fuzzed quantification).
- *invariant* → `property` blocks (the invariant must hold across the input space) and / or `assert` blocks for known boundary cases.
- *bridge* → `judgment` blocks (the criterion is prose).
- *methodology* → `judgment` blocks, sometimes with `pin` blocks for required phrases.
- *example* / *counterexample* → `assert` blocks (the example is its own evidence).

This is convention, not enforcement. The platform does not police your choices.

## 10. Extending the Backend Set

The verification subsystem is designed for extension. A new backend implements a small interface (consume the derived code and the constraint, produce a verdict with evidence), registers itself with the verifier, and claims a fence language tag. Common extensions an engineering team might write:

- A *contract checker* backend for backend-to-frontend API contracts (consume an OpenAPI document, verify the derived server matches).
- A *performance budget* backend (consume a benchmark threshold, run the derived code under load, verify the threshold holds).
- A *security linter* backend (consume a CWE rule set, scan derived code for known anti-patterns).
- A *regulatory* backend (consume a compliance checklist, run the derived code against a third-party validator).

The pattern is the same in each case: the constraint file gains a new fence type, the backend reads its blocks, and the verdict integrates into the per-constraint evidence the engineer already reads. No core platform changes are required; the backend registry is the extension surface.

## 11. What the Engineer Should Take Away

Three pieces.

*The verification verdict is the contract.* The platform's discipline is that an accepted derivation is one that passes verification; reading the derived code is not how the engineer judges acceptance. If you do not trust the verdict, the work is to author stronger evidence in the constraint file, not to read the derived code line by line.

*Each backend has a clear remit.* Use the right backend for the right kind of evidence. Type checks for shapes. Assertions for canonical examples. Properties for quantified coverage. Judgments for prose criteria. Pins for preservation. Static accessibility for UI basics. Flow runner for DOM behaviour. The mapping is small; learn it once and the constraint files write themselves.

*Scope limits are honest.* The MVE has scope limits in the static accessibility ruleset and the DOM flow runner. The platform does not pretend otherwise. The roadmap names the browser-stage backend that will lift those limits; until it lands, the engineer authors around them with judgments and pins.

The next stub ([§D *Content-Addressed Identity and Pin Manifests*](#)) covers how the constraint set's content hash is computed and how the cross-cutting pin manifest works. That stub closes the loop on identity, preservation, and the substitutability promise the platform makes ("two materializations from the same constraint set are interchangeable under verification"). The stub after that ([§E *The Wire Protocol*](#)) covers how a constraint repository synchronizes across machines.

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

## Appendix: Originating Prompt

> *"Now I want you to examine the entire spec and implementation of /home/jaredef/rederive — From this I want you to create entracement docs in the corpus for an audience of software engineers. ... First, create a document in the corpus that acts as a hub for all stubs that will branch off ... Append this prompt to each artifact. Also, where you could use corpus jargon, instead entrace the reader through rhetoric that is not novel to the corpus. Where you must state the corpus concept in its own terms; provide proper entracement."*
>
> Followed by: *"Continue with the first branch of the hub derived as a corpus doc. Continue through each as is coherent."*
