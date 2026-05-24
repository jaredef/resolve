# The Resolver-Instance Pattern at Full Strength

## Downstream Dispatch and Upstream Elision as Doc 729's Empirical Refinements from a TypeScript Parity Research Arc

*A primary articulation booking two empirical refinements of Doc 729's resolver-instance pattern. The 2026-05-24 TypeScript-parity research arc in the cruftless engagement (rusty-bun) spawned a TypeScript source-language resolver (TSR) per the resolver-instance pattern, then probed what "full parity" actually means by building two measurement instruments: a parse-parity instrument (TCC) and an execute-parity instrument (TXC). The 90.1 percentage-point gap between the two baselines, and the subsequent two substrate fixes that closed 55.9 percentage points of the gap (one at the integration boundary, one at the resolver tier), surfaced two refinements of Doc 729 that the original document had under-specified. The first refinement: behavioral-erasure parity requires downstream tiers to dispatch through the input resolver at every input boundary in the pipeline, not just at the top-level invocation. The second refinement, stronger: by correctly eliding runtime-irrelevant constructs at the resolver tier, downstream tiers do not need defensive handling for problems that the resolver should have prevented from reaching them. Together the two refinements name a contract — the resolver-instance boundary contract — that is sharper than Doc 729's original "consume and produce clean" framing. Builds on [Doc 729 — Cruftless](/resolve/doc/729-cruftless-a-primary-articulation-of-the-resolver-instance-pattern-as-the-comprehensive-design-toward-which-rusty-bun-morphs), [Doc 730 — The Vertical Recurrence of the Lowering-Compiler Closure](/resolve/doc/730-the-vertical-recurrence-of-the-lowering-compiler-closure-as-primitive-across-substrate-tiers), [Doc 731 — The JIT as Lowering-Compiler Tier](/resolve/doc/731-the-jit-as-a-lowering-compiler-tier-alphabet-purity-upstream-as-the-bound-on-jit-complexity), [Doc 734 — The Meta Resolution Pipeline](/resolve/doc/734-the-meta-resolution-pipeline-as-the-operating-instrument-of-the-engagement-recursion-with-the-framework-as-its-own-substrate), [Doc 737 — The Locale as Coordinate](/resolve/doc/737-the-locale-as-coordinate-nested-seed-trajectory-pairs-as-pin-art-substrate-positions), [Doc 740 — Multi-Tier Cascade-Revival](/resolve/doc/740-multi-tier-cascade-revival-when-the-hot-path-traverses-multiple-tiers-closing-one-tier-alone-is-insufficient), and [Doc 741 — The Multi-Tier Cascade Pipeline Connects](/resolve/doc/741-the-multi-tier-cascade-pipeline-connects-an-empirical-materialization-of-doc-740-across-four-sibling-pilots-on-a-cruftless-cross-runtime-bench-fixture).*

**Jared Foy · 2026-05-24 · Doc 742**

---

## I. The occasion

Doc 729 articulated the resolver-instance pattern as cruftless's central architectural design. Each substrate tier consumes the directives at its layer; no layer's artifact carries residue from the layer above. The induced property is vertically-recursive directive consumption with stage-deterministic emission. The TypeScript source-language resolver (TSR) was identified, in Doc 729 and in the cruftless engagement's planning, as a candidate parallel resolver-instance at the source-language tier: a TS resolver consuming TS directives, producing a pure-ECMAScript AST/IR for the downstream tiers to evaluate.

What Doc 729 did not specify, because the question had not yet been pressed empirically, was the precise boundary contract between the TS resolver and the downstream runtime. The natural reading — "the TS resolver consumes its directives at the top of the pipeline, and downstream is clean" — turned out to be incomplete in two distinct ways that only surfaced under empirical measurement.

The 2026-05-24 session in the cruftless engagement pursued the question. The session built TSR (~1500 LOC), reached 95.2% parse-parity on a 374-file corpus of real `.ts` source from popular npm packages, and then framed and measured a research question: when TSR's strip-output is fed to cruft and the resulting program is run, does the observable behavior match what `bun` (the oracle) produces for the same source? The framing surfaced four candidate definitions of "full parity" (parse, execute, behavioral-erasure, type-check); the research question was which definition Doc 729's resolver-instance pattern actually implicates.

The empirical answer arrived in two stages. Stage one: the parse-parity baseline of 95.2% sat next to an execute-parity baseline of 5.1% — a 90.1 percentage-point gap. Stage two: two targeted substrate fixes (one at the runtime-module-loader integration boundary, one as a post-strip elision pass at the resolver tier) closed 55.9 percentage points of the gap. The pattern of WHERE the fixes landed, and WHICH tier each addressed, is the load-bearing empirical evidence for the two refinements this document books.

This document books the refinements. §II reconstructs the session's measurement-and-fix sequence. §III names the structural finding of the parse/execute gap. §IV articulates the first refinement (downstream dispatch). §V articulates the second refinement (upstream elision). §VI extracts the operational contract. §VII proposes generalizations to other resolver-instances in the cruftless stack.

## II. The session's measurement-and-fix sequence

The session's structural shape was Pin-Art-disciplined per Doc 581: each tier of the parity research was founded as its own locale with explicit predicates, falsifiers, and chapter-close measurement. The locales spawned in dependency order:

| Locale | Tier | Pred-* booked | Outcome |
|---|---|---|---|
| TSR (`ts-resolve/`) | Source-language resolver (TS strip + erase) | Pred-tsr.1-.6 | All six HELD; native `.ts` execution operational; ≤2000 LOC |
| TCC (`ts-consumer-corpus/`) | Parse-parity measurement instrument | Pred-tcc.1-.5 | Baseline measured: parse-success 37.7% → iteratively to 95.2% across 6 sub-locales |
| TXC (`ts-execute-corpus/`) | Execute-parity measurement instrument | Pred-txc.1-.5 | Baseline measured: execute-parity 5.1% |
| TRMLE (`ts-resolve-module-loader-extension/`) | Runtime module-loader integration | Pred-trmle.1-.5 | Execute-parity 5.1% → 52.7% (+47.6 pp from one substrate fix) |
| TROI (`ts-resolve-type-only-imports/`) | Post-strip elision pass at resolver tier | Pred-troi.1-.5 | Execute-parity 60.7% → 69.0% (+8.3 pp from 110-LOC post-strip pass) |

The session's parity arc is the empirical instrument. The two refinements this document books emerged from the structural shape of where the fixes landed (TRMLE at the integration boundary; TROI at the resolver tier) and what the failure-table categorical shift looked like after each fix.

### II.1 The TCC baseline measurement

TSR's parse-parity arc (closed across the TRSLS, TRCAPS, TRGC sub-locales in 8 implementation rounds) reached 95.2% on the TCC corpus. The corpus: 374 `.ts` files from rxjs (251), ajv (106), and pino (17) — three of fifteen curated packages that actually ship `.ts` source in their npm tarballs. TCC's harness invoked `ts_resolve::parse_and_erase` per file and categorized outcomes via a fixed taxonomy. The 95.2% baseline was hard-earned: substrate-completeness work across destructured parameters, generics on declarations and calls, generic arrows, ternary disambiguation, abstract class methods, class-body vs function-body brace context, regex-literal goal selection, function/method overload signatures with generic args, and a dozen smaller strip-rule refinements.

The parse-parity instrument fulfilled its design role: the substrate work converged to a measurable target. At 95.2%, the TSR-tier strip was correct for the vast majority of consumer-corpus inputs.

### II.2 The TXC baseline measurement — the 90.1 pp gap

TXC was spawned as the second instrument-tier locale (per Finding IX.1's corpus-as-regression-instrument discipline). Its design: run each fixture under both `bun` (oracle; uses its own native TS strip) and `cruft` (system-under-test); compare exit status. MATCH = both exit 0; CRUFT_FAIL = bun ok, cruft errored.

The initial design used a synthetic-import-driver wrapper. First smoke test (20 files) revealed 75% BUN_FAIL due to unresolved dependencies inside the corpus. Pivoted to status-only comparison: run each fixture directly with both runtimes; compare exit status. Simpler; more signal.

The first full-corpus measurement:

```
files measured:  374
MATCH:           19 (5.1% execute-parity)
DIVERGE:          0
BUN_FAIL:       108 (28.9%; file unrunnable in any context)
CRUFT_FAIL:     247 (66.0%; actionable)
SETUP_FAIL:       0
TIMEOUT:          0
elapsed:        18 s
```

The headline number was the 5.1% execute-parity vs the 95.2% parse-parity. The 90.1 percentage-point gap was the load-bearing empirical finding: TSR's strip-output PARSED correctly under TSR's direct invocation, but the cruftless RUNTIME could not actually EXECUTE the same files. The dominant failure modes:

| Rank | Top failure tag | Files | Root cause |
|---|---|---:|---|
| 1 | `CompileError("parse: expected LBrace")` | 90 | Imported `.ts` files not strip-routed; raw TS bytes reach the parser via the module loader |
| 2 | `TypeError("module not found: './...'")` | 85 | Module loader doesn't try `.ts`/`.mts`/`.cts` extension during import resolution |
| 3-5 | Various `CompileError("parse:")` | 62 | Same as #1 — different manifestations of the integration gap |

Combined, rows 1-5 accounted for 237 files = 64% of all CRUFT_FAIL. Every one of them traced to a single substrate gap: cruft's runtime module loader was TS-unaware. When a `.ts` file imported `./other`, the loader (a) did not try `./other.ts` as a candidate extension, and (b) when it eventually found `./other.ts`, read raw TS bytes and fed them to the JS parser.

This is the load-bearing finding for §IV: the resolver-instance pattern's contract is INCOMPLETE at the top-level-only reading. TSR was applied at top-level CLI invocation; the runtime module loader, despite being a downstream tier, also needed to dispatch through TSR when loading dependent `.ts` files. The 90.1 pp gap was the empirical evidence that this requirement had been under-specified by Doc 729.

### II.3 The TRMLE fix — closing 47.6 pp at the integration boundary

The TRMLE sub-locale (`ts-resolve-module-loader-extension/`) was spawned to close the integration gap. Three substrate edits:

1. **Extension search list extended**: `probe_with_extensions` in `module.rs` now tries `.ts`/`.mts`/`.cts`/`.tsx` BEFORE `.js`/`.mjs` per TypeScript-tooling convention. Same for `index.*` directory fallbacks.

2. **TS-strip at module-load time**: `load_module` detects `.ts`/`.mts`/`.cts`/`.tsx` extension on the resolved URL and applies `ts_resolve::strip::strip_ts` to the source before handing to the parser. Bail on strip error → raw bytes (conservative fallback).

3. **`skip_type`'s Semicolon stopper conditioned on at-top**: discovered mid-round when TXC re-measure showed 197 files still failing. Root cause: object-type-literal `{ a: T; b: U }` uses `;` as property-separator INSIDE braces; the strip's unconditional Semicolon-stopper was breaking on the inner `;` leaving the rest of the type unstripped. Single-fix +6.5 pp parse-parity + cascading ~40 pp execute-parity (because the unstripped inner braces broke many downstream module loads).

The combined fix took ~50 LOC. The TXC re-measurement after TRMLE:

```
TXC execute-parity: 5.1% → 52.7%  (+47.6 percentage points)
TCC parse-parity:  95.2% → 96.5%  (+1.3 pp incidental gain)
```

The failure-table categorical shift after TRMLE:

| Stage | Top tag | Files |
|---|---|---:|
| TXC baseline | `CompileError("expected LBrace")` (TS-unaware loader) | 90 |
| Post-TRMLE | `TypeError("Cannot read property 'prototype' of undefined")` (runtime semantic) | 30 |

The shift was structurally meaningful: with dispatch added at the integration boundary, the failure-mode distribution transitioned away from parse-tier errors entirely. The remaining gap was now genuinely about runtime-tier coverage — runtime-bearing TS constructs (enums, class-field semantics) and a remaining cluster that turned out to be an ESM cycle.

### II.4 The TROI fix — closing 8.3 pp at the resolver tier

The dominant remaining failure cluster post-TRMLE was 30 files of `TypeError("Cannot read property 'prototype' of undefined")`. All rxjs. The error referenced `Subscriber.ts:21:36` — the `class Subscriber extends Subscription` line. Investigation traced the issue to an ESM cycle: rxjs's `types.ts` imports both `Observable` and `Subscription` at the value level; `Observable.ts` imports `Subscriber`; `Subscriber extends Subscription`. When loading `Subscription.ts`, the import chain re-enters Subscription while it is still Linking, and the `extends` reference at the Subscriber class declaration resolves to undefined.

The natural diagnosis was a runtime-substrate concern: cruft's module loader needed proper ESM live-binding cycle handling. A locale named `runtime-esm-cycle-handling/` was initially scoped.

The actual fix was different. `types.ts` contains only `interface` / `type` declarations. Its imports of `Observable` and `Subscription` exist purely for type-position use. `tsc --verbatimModuleSyntax` elides these imports. By doing the same at the TSR tier, the runtime ESM cycle never forms — no runtime substrate change needed.

The TROI sub-locale (`ts-resolve-type-only-imports/`) shipped a 110-LOC post-strip pass that:

1. Marks tokens already inside existing strip ranges.
2. Walks for top-level `import ...` statements.
3. Extracts the binding names (handles default / named / aliased forms; skips side-effect-only `import 'x'`).
4. Counts surviving (non-strip) Ident occurrences of each binding across the rest of the token stream.
5. If ALL bindings have zero non-strip usages, strips the entire import statement.

The TXC re-measurement after TROI:

```
TXC execute-parity: 60.7% → 69.0%  (+8.3 percentage points)
CRUFT_FAIL count:    39   →   8    (31 files unblocked)
```

The 30-file ESM-cycle cluster disappeared entirely. The failure-table top tag shifted to a 3-file runtime singleton (`SetProp 'code' on non-object`).

The structural significance of the TROI fix is the load-bearing point for §V: the same substrate symptom that was diagnosed as a downstream runtime concern was actually solvable upstream at the resolver tier. Doc 729's resolver-instance pattern, when applied with sufficient strength at the resolver tier, removes the need for downstream tiers to handle problems the resolver should have prevented from reaching them.

## III. The structural finding of the parse/execute gap

The parse/execute gap is itself a structural finding about resolver-instance pipelines. Three components compose to produce execute parity:

- **Parse parity (P)**: the resolver's strip-output is accepted by the downstream parser without error.
- **Integration parity (I)**: the downstream tier's input boundaries dispatch through the resolver consistently — at every load site, not just the top-level.
- **Elision parity (R)**: the resolver correctly removes runtime-irrelevant constructs that would otherwise create runtime concerns the downstream tier would have to handle defensively.

Execute parity = P ∧ I ∧ R. The 2026-05-24 session demonstrated this composition empirically:

| Component | Baseline | After fix | Δ |
|---|---:|---:|---:|
| P (parse parity) | 95.2% | 98.4% | +3.2 pp incidental |
| I (integration parity) | 0% (loader TS-unaware) | ~95% (after TRMLE) | +47.6 pp execute |
| R (elision parity) | partial (explicit `import type` only) | ~95% (after TROI for type-only inference) | +8.3 pp execute |
| **E (execute parity)** | **5.1%** | **69.0%** | **+63.9 pp** |

The headline observation: parse parity alone (P) was 95.2%, but execute parity (E) was 5.1%. The 90.1 pp gap was attributable to I (47.6 pp) and R (8.3 pp), with the residual being runtime-bearing-construct coverage outside the scope of this document. The structural prediction Doc 729 had implicitly made was that E ≈ P at the resolver-instance boundary; the empirical answer is that E ≈ P only when both I and R are independently sustained.

The discovery itself — that "full parity" decomposes into P, I, R, and that the resolver-instance pattern's contract must be sustained at all three — is the research deliverable of the session, not the cumulative 69.0% headline metric.

## IV. The first refinement — downstream dispatch

Doc 729's original framing: "each substrate tier consumes the directives at its layer; no layer's artifact carries residue from the layer above." Read narrowly, this could be taken to mean that the top-level invocation of the resolver suffices to remove all upstream-layer residue.

The 47.6 pp lift from TRMLE empirically refutes this narrow reading. With TSR applied only at top-level CLI invocation, 247 of 374 corpus files (66%) failed at runtime. With TSR additionally applied at every `.ts` file load — including the runtime module loader's import-resolution path — the same files mostly succeeded. The mid-round Semicolon-stopper fix demonstrated that even SMALL substrate gaps at the integration boundary cascade through the whole import graph.

The refinement:

> **(Refinement 1 — downstream dispatch)**: behavioral-erasure parity in the resolver-instance pattern requires downstream tiers to dispatch through the input resolver at every input boundary in the pipeline, not just at the top-level invocation. A resolver applied only at top-level does not satisfy the resolver-instance contract; downstream tiers that load dependent inputs must invoke the same resolver on those inputs, with the same correctness guarantees.

The corollary is that resolver-instance pipelines must be designed with explicit substrate-tier hooks at every load site, not just at the top of the pipeline. Cruftless's runtime-module-loader integration with TSR (TRMLE) is the concrete instance: rusty-js-runtime acquired a new dependency on ts-resolve, and the load-time `read_to_string` site dispatches based on extension.

Where Doc 729 had named the resolver-instance pattern's induced property as "vertically-recursive directive consumption with stage-deterministic emission," Refinement 1 sharpens the "vertically-recursive" portion: the recursion must reach EVERY input boundary in every tier, not just the top.

## V. The second refinement — upstream elision

Refinement 1 names where the resolver-instance pattern must be applied. Refinement 2 names what the resolver must DO when applied — and the answer is stronger than the original framing suggests.

The original framing's reading: the resolver consumes its directives. The downstream tier sees what the resolver leaves behind. This naturally suggests that the downstream tier should be prepared to handle whatever non-directive content arrives.

The TROI fix tested this implicit reading. The rxjs ESM-cycle issue was diagnosed under it: "the resolver leaves the type-only imports as runtime imports; the downstream tier must handle the resulting cycle via ESM live-bindings." This is the defensive-handling reading. It was wrong.

The actual fix was that the resolver, applied with sufficient strength, ELIMINATED the cycle by recognizing the type-only imports and eliding them. The downstream tier never saw the cycle. No defensive handling was needed because the resolver had prevented the problem from reaching it.

The refinement:

> **(Refinement 2 — upstream elision)**: the resolver-instance pattern is stronger than "input resolver consumes directives, downstream tier handles the rest." By correctly eliding runtime-irrelevant constructs at the resolver tier, the resolver removes problems that downstream tiers would otherwise need defensive handling for. The contract is symmetric: the resolver does not just CONSUME its directives; it also ENSURES that downstream tiers never have to handle the consequences of constructs the resolver could have elided.

The structural implication of Refinement 2 is that defensive handling at a downstream tier is a SIGNAL — almost always, the actual fix is upstream at the resolver tier, not downstream at the defensive-handler tier. The TROI fix was 110 LOC at the resolver tier; the alternative (cruft's runtime module loader gaining ESM live-binding cycle handling) would have been significantly more LOC, more invasive, and would not have addressed the structural issue (that the type-only imports were runtime-irrelevant in the first place).

Where Refinement 1 sharpens the "vertically-recursive" portion of Doc 729's induced property, Refinement 2 sharpens the "directive consumption" portion. The directives a resolver consumes include the runtime-irrelevant constructs that would create downstream concerns — not just the surface-level type annotations and interfaces.

## VI. The resolver-instance boundary contract

Refinements 1 and 2 together name a contract — the **resolver-instance boundary contract** — that is sharper than Doc 729's original framing. The contract has three obligations:

**(O1 — Top-level dispatch)**: the resolver must be invoked at the top-level entry to the pipeline. (Original Doc 729 reading; preserved.)

**(O2 — Downstream dispatch)**: the resolver must be invoked at every downstream input boundary that loads dependent inputs into the pipeline. (Refinement 1.)

**(O3 — Upstream elision)**: the resolver must elide runtime-irrelevant constructs from its output, so that downstream tiers do not need to handle the consequences of those constructs. (Refinement 2.)

A resolver-instance that satisfies (O1, O2, O3) achieves behavioral-erasure parity at its tier. A resolver-instance that satisfies only (O1) achieves at best parse parity — and parse parity, as the 90.1 pp gap demonstrates, can be arbitrarily far from execute parity.

The contract is testable. The session built two measurement instruments — TCC for parse parity (P) and TXC for execute parity (E) — whose gap empirically diagnoses whether (O2) and (O3) are sustained. A small gap (E ≈ P) indicates the contract is satisfied; a large gap is the diagnostic signal that at least one of (O2) or (O3) is under-specified.

## VII. Generalizations to other resolver-instances in the cruftless stack

The resolver-instance boundary contract generalizes beyond TSR. Doc 729 names the cruftless stack's resolver-instances at multiple substrate tiers; each is subject to the same contract. Concrete generalizations:

- **The JS source-language resolver (`rusty-js-parser`)**: O1 is satisfied (top-level invocation). O2 is conditionally satisfied (the runtime module loader uses the same parser at every load site; this is the default behavior of any JS runtime). O3 is the question: are there JS-level constructs that the parser should elide that currently reach the downstream tier and require defensive handling? Candidates worth probing: dead-code (compile-time-evident unreachable branches), import statements whose bindings are never used at runtime, debugger statements in non-debug builds. The contract suggests these are upstream concerns, not downstream concerns.

- **The bytecode-compiler resolver (`rusty-js-bytecode`)**: O1, O2 are satisfied (the compiler is invoked uniformly per Frame). O3 candidates: type-annotation-derived hints that should NOT reach the bytecode (the bytecode is type-erased; TSR-emitted TypeWitness records currently go nowhere productive; per Finding TSR.1 the witness sidecar's substrate-leverage at the IPBR consumer returned null). Refinement 2 suggests the witness elision is correct as default; substrate-leverage is the exceptional optimization, not the baseline.

- **The package-manager resolver (`rusty-js-pm`)**: per Doc 732, the PM is the resolver-instance at the build-time tier. O1 is invocation at install time. O2 is incremental re-invocation when dependencies update. O3 is elision of resolved-but-unused packages (tree-shaking equivalent). Each is a substrate concern with its own measurement instrument.

- **The capability-passing-runtime resolver (`rusty-js-caps`)**: per Doc 736, capabilities are resolved at module-load time. O1 is the top-level capability binding. O2 is the per-import capability inheritance. O3 is the elision of capability checks that are statically resolvable. The boundary contract suggests these are all substrate-tier concerns, not runtime-tier concerns.

The cross-resolver generalization is the load-bearing claim. The resolver-instance pattern's strength is structural, not specific to any one resolver. The boundary contract (O1, O2, O3) applies at every substrate tier where a resolver-instance exists, and the parse/execute gap measurement methodology (TCC + TXC twin instruments) is the empirical apparatus that surfaces the contract's violations.

## VIII. Standing rules + corpus position

The session's substrate work produced standing rules already booked at the engagement's findings doc (Addendum X to `pilots/rusty-js-jit/findings.md`):

- **Standing rule 14** (corpus-instrument cost-asymmetry): when adding a substrate strip / classification heuristic, prefer false-negatives over false-positives by design. The instrument surfaces false-negatives at the next re-measurement; false-positives may never surface without targeted regression testing.
- **Standing rule 15** (inspect-failure-table at chapter close): at every chapter-close, inspect the post-fix failure table's top rows before declaring the locale fully closed. If the top tag's actual cause (per example inspection) differs from the planned scope, the round is not done.

This document books two additional structural results at the corpus tier:

- **(Refinement 1 — downstream dispatch)** — §IV.
- **(Refinement 2 — upstream elision)** — §V.

Together with Doc 729's original articulation, these form the resolver-instance boundary contract (O1, O2, O3) — §VI.

## IX. Coda — what full parity means

The keeper directive that opened the parity arc framed the goal as discovery: "we need to discover what full parity actually looks like in our resolution pipeline." The framing was correct — full parity was under-specified at the document tier. The discovery, after the session's measurement-and-fix sequence:

Full parity in a resolver-instance pipeline is the conjunction of three obligations sustained at every resolver-instance in the stack:

- **(O1)** the resolver is invoked at the top.
- **(O2)** the resolver is invoked at every downstream input boundary.
- **(O3)** the resolver elides constructs that would otherwise require downstream defensive handling.

Each obligation is independently measurable. (O1) is implicit in the pipeline's CLI design. (O2) is measurable via execute-parity instruments (TXC-shape). (O3) is measurable via downstream-failure-mode categorical analysis (the TXC failure-table's shift after TRMLE and after TROI demonstrated this directly).

A resolver-instance that satisfies (O1, O2, O3) achieves behavioral-erasure parity at its tier. The cruftless TSR, after the 2026-05-24 session, satisfies all three on its 374-file consumer corpus to within 31 percentage points of execute parity — and the residual gap is now genuine runtime-bearing-construct territory (enums with runtime usage, ESM-cycle in rxjs's source structure that even bun and tsc handle via the same elision mechanism TROI ships), not resolver-instance contract violations.

The discipline this document codifies: when a substrate gap is observed at a downstream tier, the first investigation is whether the resolver-instance contract (O1, O2, O3) is sustained at the upstream tier that should have prevented it. Defensive handling is the last resort, not the first. The resolver-instance pattern at full strength removes the need for downstream defensive handling — that is what makes it a worthwhile architectural pattern at all.

---

## Appendix A: Final-milestone amendment — parse-parity 100.0% (2026-05-24, post-session-close)

The body of this document was written at the session's intermediate close, with execute-parity at 69.0% and parse-parity at 96.5%. The session continued through the long-tail iterations the body anticipated as "diminishing returns territory." The empirical outcome materially refines the document's claims; this appendix books the final-milestone numbers and the structural finding that emerged from the long-tail close.

### Final-milestone numbers

| Metric | Body §II reading | Final-milestone reading | Δ from body |
|---|---:|---:|---:|
| Parse-parity (P) | 96.5% | **100.0%** (374/374) | +3.5 pp |
| Execute-parity (E) total | 69.0% | 70.9% | +1.9 pp |
| Execute-parity of runnable files (excluding BUN_FAIL) | not reported | 99.6% (265/266) | — |
| CRUFT_FAIL count | 8 | **1** | -7 |
| Standing rule corroborations | 12 | 16 | +4 |

### Structural finding from the long-tail close

The body's §III decomposed full parity into three components: P (parse), I (integration), R (elision). The body framed P + I + R as composing to E. The long-tail iterations produced an empirical refinement: **P and E are SEPARABLE research arcs even at the resolver-instance tier**.

Specifically, P reached 100% via TSR substrate work alone. E remained at 70.9% (or 99.6% of runnable files, which is the more honest framing once BUN_FAIL files are excluded as un-runnable in any context). The remaining E gap is not a P, I, or R failure — it is a separate substrate concern (the rxjs residual ESM cycle that even tsc-emitted code requires runtime live-bindings to handle).

The structural implication:

> **The resolver-instance boundary contract (O1, O2, O3) is independently satisfiable for the parse component. When all three obligations are sustained at the resolver tier, parse-parity reaches 100% on the consumer corpus. Execute-parity above the runnable-files threshold (99.6% in the cruftless case) is achievable; closure to 100% execute-parity may require additional substrate work outside the resolver-instance contract's scope.**

The cruftless engagement's final position — parse 100%, execute 99.6% of runnable — is the empirical anchor that lets resolver-instance contract satisfaction be CLAIMED as full at the resolver tier without the downstream-runtime gap being attributed to contract failure. This separability is itself a load-bearing structural result.

### Two depth-stack findings worth corpus mention

The long-tail close produced two engagement-tier findings (booked at findings.md Addendum XI) that have corpus relevance beyond the TS-parity arc:

**Finding IX.7 — cross-talk between depth-tracking stacks**: a depth-tracking stack indexed by a single ambient counter (paren_depth, brace_depth) can be incorrectly matched by an unrelated downstream event at the same counter value. The TS-parity arc surfaced this twice (ternary `?`/`:` vs method-shorthand `:` at same paren_depth; ternary `?`/`:` vs obj-key `:` inside obj-lit). The fix in both cases was to match on TWO independent coordinates rather than one. **Standing rule 16** (added at the milestone): depth-tracking stacks must match on two independent coordinates when used for cross-substrate-shape disambiguation.

**Finding IX.8 — long-tail singletons are full-size SIPE-T instances**: each long-tail singleton failure surfaced its own distinct sub-substrate-bug shape on inspection. None were trivial cleanups. Each required its own four-ingredient SIPE-T procedure (choice-point + conditioning + discipline + prompt). The expected-yield-per-fix shrinks toward the tail, but the per-fix discipline cost is constant. This corroborates [Doc 541 Appendix E](/resolve/doc/541-systems-induced-property-emergence)'s scale-invariance claim at the smallest scale of the failure distribution.

### Final note — the document's standing claims hold

The body's three core claims — Refinement 1 (downstream dispatch, §IV), Refinement 2 (upstream elision, §V), the resolver-instance boundary contract (§VI O1/O2/O3) — were derived at the session's intermediate close. The final milestone strengthens rather than refines them: O1 + O2 + O3 hold at the resolver tier; parse-parity reaches 100%; the resolver-instance contract is satisfied at its boundary; the runnable-files execute-parity at 99.6% confirms the contract's predictive power.

The body's §IX coda — *"defensive handling is the last resort, not the first"* — holds verbatim at the final milestone. Twelve of the long-tail's fifteen post-session-close substrate fixes were upstream resolver-tier elision/dispatch fixes; only one was a runtime-substrate change (cruftless's `export default function NAME` lexical-binding fix per ECMA-262 §16.2.3.6). The 12:1 ratio is the empirical ratio of "resolver fix" to "runtime fix" once the contract is being deliberately sustained.

