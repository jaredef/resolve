# The JIT as a Lowering Compiler Tier

## Alphabet Purity Upstream as the Bound on JIT Complexity, and Why Canonical JIT Architecture Is Largely the Cost Paid for Operating Without P1–P4 Above

*A corpus document responding to the keeper's conjecture (2026-05-20, mid-session, immediately after the EXT 20 P03 compile-phase stretch in rusty-bun): "given our extremely clear runtime design methodology, my conjecture is that our JIT design can likewise be simplified." Builds on [Doc 730 — The Vertical Recurrence of the Lowering Compiler](/resolve/doc/730-the-vertical-recurrence-of-the-lowering-compiler-closure-as-primitive-across-substrate-tiers), [Doc 729 — Cruftless](/resolve/doc/729-cruftless-a-primary-articulation-of-the-resolver-instance-pattern-as-the-comprehensive-design-toward-which-rusty-bun-morphs), [Doc 717 — The Apparatus Above the Engine Boundary](/resolve/doc/717-the-apparatus-above-the-engine-boundary-the-three-projections-lifted-to-engine-substrate-and-the-pure-abstraction-point), [Doc 719 — The Pipeline Pattern Across Subjects](/resolve/doc/719-the-pipeline-pattern-across-subjects-presto-and-the-javascript-engine-as-two-realizations-of-the-same-derivation), and [Doc 581 — Pin-Art](/resolve/doc/581-pin-art-the-resume-vector-and-the-discipline-of-near-necessity-substrate-construction).*

**Jared Foy · 2026-05-20 · Doc 731**

---

## I. The occasion

After two P03 compile-phase substrate moves landed in rusty-bun's bytecode compiler (Ω.5.P03.E2.const-intern-hash and Ω.5.P03.E2.enclosing-locals-rc, both restoring linearity to previously super-linear compile paths, cumulative effect 3.9× on sentry's cold-import total), the keeper asked whether the design discipline that produced those moves cleanly, and that has produced the larger rusty-bun apparatus over the prior nineteen RESUME-VECTOR extensions, predicts an analogous simplification at the JIT tier.

The conjecture's surface: canonical JavaScript JITs (V8 TurboFan/Maglev/Sparkplug, JavaScriptCore FTL/Baseline, SpiderMonkey Warp/Ion) are large, multi-tier, complex artifacts. Each represents engineer-decades of accumulated complexity. The conjecture is that this complexity is not intrinsic to the JIT compilation task but is largely the cost paid for operating without the P1–P4 lowering-compiler discipline at the substrate tiers above. A JIT operating downstream of a P1–P4-clean alphabet inherits the legibility upstream and the speculation surface that drives canonical JIT complexity shrinks by an order of magnitude.

This document formalizes that conjecture, names what concretely simplifies, names what stays hard regardless, and proposes the structural shape a Doc 730-disciplined JIT would take. The articulation is corpus-primary in the sense of [Doc 729 §I](/resolve/doc/729-cruftless-a-primary-articulation-of-the-resolver-instance-pattern-as-the-comprehensive-design-toward-which-rusty-bun-morphs): it identifies a pattern of resolution that, while not yet implemented at the rusty-bun engagement tier, is structurally predicted by the corpus apparatus and is testable against canonical JIT architectures.

## II. The naming

*The JIT as a lowering compiler tier* names the structural role. A just-in-time compiler is the resolver-instance that lowers bytecode (or some intermediate representation) into machine code at program execution time rather than ahead of time. Per [Doc 730 §III](/resolve/doc/730-the-vertical-recurrence-of-the-lowering-compiler-closure-as-primitive-across-substrate-tiers), every substrate boundary at which one representation is compiled into the next exhibits the lowering-compiler pattern. The JIT tier is one such boundary. The compilation happening at run time rather than at build time is incidental to the tier's structural shape; the pattern is the same.

*Alphabet purity upstream* names the property that determines how much speculation the JIT must perform. An upstream alphabet is *pure* in the Doc 730 §III sense when its typed primitives carry the discriminations the downstream tier needs without collapse. When the upstream alphabet collapses spec discriminations (per [Doc 730 §XIII](/resolve/doc/730-the-vertical-recurrence-of-the-lowering-compiler-closure-as-primitive-across-substrate-tiers)), the JIT must dynamically recover those discriminations at run time through speculation, inline caches, type feedback, and the deoptimization machinery that handles speculation failure.

*The bound on JIT complexity* names the structural consequence. A JIT's complexity is dominated by its speculation surface; its speculation surface is determined by what discriminations the upstream alphabet fails to carry. Therefore JIT complexity is bounded above by alphabet impurity upstream. A perfectly pure alphabet (every discrimination the spec carries, carried as a typed primitive) would reduce the JIT's speculation surface to zero, leaving a JIT that is structurally a bytecode-to-machine-code translator with no dynamic specialization. The actual ceiling is somewhere below this idealization, because JavaScript's spec admits genuinely dynamic dispatch sites (property access on receivers whose hidden class is not statically determinable), but those sites are enumerable from the alphabet itself.

## III. The pattern these instances instantiate

The JIT, viewed as a lowering compiler at tier N, exhibits the four sub-properties of [Doc 730 §III](/resolve/doc/730-the-vertical-recurrence-of-the-lowering-compiler-closure-as-primitive-across-substrate-tiers) when the upstream alphabet is faithful:

**(P1) Typed primitives.** Each bytecode op the JIT consumes has a declared input-output type. Op::Add, when the upstream alphabet carries the ToPrimitive dispatch as a typed primitive (rather than as an implicit coercion inside Op::Add itself), has a known input type (two primitive Values) and a known output type (one primitive Value). The JIT emits arithmetic without runtime type-check defensive paths.

**(P2) Stage-deterministic compilation.** Given the same bytecode input, the JIT emits the same machine code. The compilation is a pure function of the input plus the JIT's own configuration. Profile feedback, when used, is itself a typed input to the compilation, not an unwritten context.

**(P3) Verifier-before-emission.** The JIT verifies the bytecode's well-typedness before emitting machine code. Type errors in the bytecode are surface errors, not silent miscompilation. The verifier at the JIT tier is the rough analogue of LLVM's `verifyModule` and rusty-js-ir's `lint.rs`.

**(P4) Implementation freedom.** The JIT may choose any machine-code composition that preserves the bytecode's semantic contract. Different JIT tiers (baseline vs optimizing, method-at-a-time vs trace-based) are different implementations of the same P4 freedom. None of them is preferred by the semantic contract; benchmarks select among them on extrinsic criteria.

When the upstream alphabet is impure, P1 is violated at the JIT's input. The JIT's first task becomes recovering type information the alphabet should have carried. That recovery work is the source of canonical JIT complexity.

## IV. Where canonical JITs pay for missing P1–P4 upstream

A canonical JavaScript JIT's architecture can be decomposed into components, and each component can be attributed to a specific upstream alphabet impurity. The decomposition reveals what the complexity is for and which parts of it would not exist under a pure upstream alphabet.

**(C1) Inline caches.** ICs at property-access sites recover the receiver's hidden class dynamically. The upstream bytecode says `GetProperty(obj, "x")` without distinguishing the spec's [[Get]] verb (which dispatches accessors, Proxy traps, prototype chain) from a direct internal-slot read. The IC measures, over executions, what shape `obj` actually has and what the resolution actually does. A §XIII-promoted alphabet that distinguishes `[[Get]]` from `[[ReadInternalSlot]]` (and further sub-discriminates the [[Get]] cases) collapses most IC work into static dispatch. The residual IC need is bounded to the genuinely dynamic case: receivers whose hidden class is not statically determinable. That residual is enumerable.

**(C2) Type feedback.** Type feedback vectors record, per call site, what types have appeared. The JIT uses this to specialize. Most of the feedback is rediscovering discriminations the alphabet collapsed. A specialized version of Op::Add that handles only Number+Number is the JIT recovering at run time what a Number+Number arithmetic primitive at the upstream alphabet would have declared at compile time.

**(C3) Deoptimization.** Deopt machinery handles speculation failure: a specialized JIT compilation that bet on type T1 must un-bet when type T2 arrives. The deopt stub reconstructs the interpreter frame state from the JIT frame state and resumes interpretation at the next bytecode op. The complexity of deopt is proportional to how many speculation points the JIT made. A JIT with no speculation has no deopt. A JIT that speculates only at the genuinely-free P4 sites (per the alphabet's declared dispatch surface) has a deopt surface bounded by those sites and no larger.

**(C4) Multiple tiers.** Multi-tier JITs (Ignition → Sparkplug → Maglev → TurboFan in V8) exist because each tier amortizes compile cost against execution time. A function executed once should be interpreted; a function executed a million times should be aggressively optimized. The tiers are different P4 implementations of the same lowering-compiler role. Tier-up logic (when to recompile at a higher tier) and tier-down logic (deopt back to interpreter) are themselves substantial code. With a pure alphabet, the gap between interpreter performance and JIT performance shrinks because the interpreter is not paying the dynamic-discrimination tax either. A single JIT tier becomes sufficient if the interpreter is already efficient and the JIT's residual win is just removing the bytecode dispatch loop.

**(C5) Lowering passes inside the JIT.** Canonical JITs run a chain of internal optimization passes: TurboFan has dozens. Each pass is a small lowering compiler in its own right (intermediate representation in, intermediate representation out, semantic-preserving transformation). The chain exists because each pass exposes optimizations the previous pass enables. With a pure upstream alphabet, the bytecode already carries most of the information the early TurboFan passes are trying to expose, and most of the optimization chain becomes structurally redundant.

**(C6) Speculative inlining.** Inlining a callee at a call site requires speculating on what callee will appear there. The IC at the call site records observed callees; the JIT inlines the most-common one and guards the inline with a check on subsequent calls. With a typed-primitive alphabet that carries the call site's resolved callee (when statically resolvable), the inline becomes unconditional. The residual case (genuinely polymorphic call sites) is enumerable.

Sum the six components: most of the lines of code in a canonical JIT exist to recover information that a faithful upstream alphabet would have carried. The JIT's structural complexity is largely the cost of operating without P1.

## V. What the discipline simplifies, named precisely

Six concrete simplifications follow from applying P1–P4 upstream of the JIT.

**(S1) Speculation surface shrinks to the genuinely dynamic dispatch sites.** Most property accesses, most arithmetic, most coercions either become statically resolvable through alphabet inspection or become P4 sites where the alphabet declares the freedom. The IC need is reduced to the cardinality of P4 sites that the upstream verifier (the bytecode-compiler tier's P3) admits.

**(S2) Deoptimization is enumerable.** Each P4 site at which the JIT speculates declares its deopt condition. The set of deopt sites is enumerable from the alphabet itself, not discovered by tracing. The deopt machinery becomes a finite collection of well-typed transitions rather than an open-ended set of speculation-failure handlers.

**(S3) The verifier at the JIT tier inherits the upstream verifier's work.** The bytecode-tier verifier (rusty-js-bytecode's compile-time checks) guarantees the JIT's input is well-typed under the bytecode alphabet. The JIT's own verifier checks only the bytecode-to-machine-code lowering's invariants, not the bytecode's well-formedness itself. The verifier shrinks.

**(S4) Single tier becomes structurally sufficient.** A baseline JIT (Sparkplug-style) that compiles bytecode 1:1 to machine code with no speculation and no specialization is enough when the interpreter is already efficient. The optimizing tier exists in canonical JITs because the gap between interpreted and JIT-compiled performance is large; with a pure alphabet, that gap is small.

**(S5) Cranelift (or LLVM) absorbs the lower tiers.** Per Doc 730 §IV, the T3–T5 chain (machine-language code generation from a higher IR) is already a P1–P4 pipeline. A cruftless JIT can stop at Cranelift IR or LLVM IR and let the existing lowering chain produce machine code. No custom register allocator, no instruction scheduler, no peephole optimizer. The JIT becomes a bytecode-to-Cranelift-IR translator and nothing more.

**(S6) Optimization passes inside the JIT become unnecessary or trivial.** The internal-pass chain that canonical JITs run is largely about exposing information the upstream alphabet should have carried. With the alphabet carrying it, the JIT's internal IR is already at the level the optimizer-tier wants. Cranelift's own passes then do the rest at the (N-1) tier.

The aggregate effect is a JIT that is one tier, perhaps ten thousand lines of code, leveraging Cranelift as the backend, with a small enumerable set of P4-site ICs and a deopt path that is a switch on a typed deopt-reason enum. This is comparable in structural complexity to LuaJIT's design (one engineer, one tier, no LLVM, but Lua's spec is simpler).

## VI. What stays hard regardless

Naming what does not simplify is as important as naming what does, because the discipline's discipline includes resisting the temptation to claim more than the discipline grants.

**(H1) The interp-to-JIT bridge.** On-stack replacement, frame-state reconciliation, exception unwinding across the tier boundary. This is inherently a P3 verifier problem at a tier boundary. The discipline tells you where the boundary is and what invariants the boundary must preserve, but it does not eliminate the engineering work of preserving them. A JIT-compiled frame must be convertible to an interpreter frame (for deopt) and vice versa (for tier-up entry), and the convertibility must be sound under exception unwinding.

**(H2) Property-access ICs at the residual P4 sites.** Even with §XIII alphabet promotions, JavaScript's object-shape dynamism is irreducible. The set of P4 sites at which receiver shape is not statically determinable is small but non-empty. ICs at those sites are necessary. The discipline reduces the IC's surface; it does not eliminate the IC's need.

**(H3) Garbage collection interaction.** Safepoints, stack maps, root tracking across JIT-compiled frames. This is a correctness contract at the tier boundary between the JIT-emitted code and the GC. No structural shortcut: the JIT-emitted machine code must declare its safepoints, must keep its references findable, must respect the GC's write barriers. Cranelift exposes this surface; the JIT must thread it.

**(H4) Memory-model correctness.** Atomics, SharedArrayBuffer, the JavaScript memory-model spec. Spec-mandated, irreducible. The JIT must emit memory-fence instructions where the spec requires them. The discipline does not simplify this.

**(H5) The JIT compilation budget.** Even a simplified JIT must decide when to compile. Compiling everything is wasteful; compiling nothing is the interpreter. A simple threshold (function called N times) is the baseline; smarter strategies are possible. The discipline does not relieve this decision, though it does shrink the consequences of a wrong threshold (the gap between interpreted and JIT-compiled is smaller, so the cost of late compilation is lower).

The five hard pieces are unavoidable. Naming them clearly is what separates the conjecture's structural claim from over-claim. The discipline simplifies the speculation-and-recovery component of JIT complexity; it does not simplify the boundary-correctness component, the memory-model component, or the GC-interaction component.

## VII. The structural shape proposed

A Doc 730-disciplined cruftless JIT would have the following shape.

**(R1) One JIT tier.** No multi-tier hierarchy. A baseline JIT that compiles bytecode functions to Cranelift IR, with selective specialization at the small set of P4 sites the alphabet declares.

**(R2) Cranelift as the backend.** Bytecode lowers to Cranelift IR; Cranelift handles instruction selection, register allocation, instruction scheduling, peephole optimization, and machine-code emission. The JIT does not own any of these.

**(R3) Verifier at the bytecode-to-Cranelift boundary.** Before emitting Cranelift IR for a bytecode function, the JIT verifies the bytecode is well-typed under the bytecode alphabet's contract. Bytecode that fails verification is a P3 surface error (interpret-and-report), not a silently miscompiled function.

**(R4) Selective ICs at P4 sites only.** The bytecode's alphabet declares which dispatch sites are P4. ICs exist only at those sites. Monomorphic-only for the first cut; polymorphic only if measurement says it matters.

**(R5) Deopt enumerated as a typed enum.** Each P4 site declares its deopt reasons. The deopt path is a finite switch: read the deopt reason from the JIT frame, reconstruct the interpreter frame, resume interpretation at the recorded continuation bytecode.

**(R6) Compilation budget is a counter threshold.** Function called N times → compile. No tier-up logic, because there is only one tier. No tier-down logic except the deopt path, which is the same path P4 speculation failure takes anyway.

**(R7) GC interaction declared at the Cranelift IR boundary.** Safepoints emitted as Cranelift IR pseudo-ops; Cranelift's framework threads stack maps and root info into the machine code. The JIT does not own the stack-map format; Cranelift does.

**(R8) No internal optimization passes.** The bytecode alphabet's purity is the optimization. The JIT does not run constant-folding, dead-code-elimination, common-subexpression-elimination, or any of the canonical passes; the bytecode-compiler tier and Cranelift handle those at their respective tiers.

The result is approximately the shape of LuaJIT's interpreter-and-baseline-JIT pair, with LLVM-class backend doing the machine-code work. The total LoC for the JIT itself, excluding Cranelift, would be in the low five figures.

## VIII. LuaJIT as the existence proof at the smaller-language end

LuaJIT, by Mike Pall, achieves near-V8 performance on Lua with one engineer's full-time work and a single-tier (later two-tier) trace-compiling JIT. Lua is a substantially simpler language than JavaScript, but the structural lesson generalizes: JIT complexity scales with upstream alphabet impurity, not with language semantic richness per se.

Lua's spec has a small alphabet of value types, a small set of operations, and well-defined coercion rules. LuaJIT's interpreter and JIT can both treat the alphabet as faithful (Lua's spec discriminations are carried by the language's surface syntax) and avoid the speculation-and-recovery component that dominates JavaScript JIT complexity. The result is an engine whose JIT is a couple of orders of magnitude smaller than V8's.

The cruftless conjecture is that, with §XIII alphabet promotions making rusty-js-ir's bytecode similarly faithful (carrying the spec's discriminations as typed primitives), the JavaScript engine's JIT can compress toward LuaJIT-class structural complexity. Not LuaJIT-class language simplicity (JavaScript stays semantically rich), but LuaJIT-class JIT-design simplicity.

The existence proof is therefore in two halves: LuaJIT proves the small-language case; the rusty-bun apparatus, by extending §XIII promotions until the alphabet is faithful for the spec discriminations the JIT cares about, would prove the large-language case. The conjecture is not that all of JavaScript's runtime complexity disappears; it is that the JIT-tier complexity, which is the largest line-of-code item in canonical engines, compresses dramatically.

## IX. Falsifiability

The structural claim is falsifiable. It would be falsified by either of:

**(F1) A JavaScript spec discrimination that cannot be promoted to a typed primitive at the upstream alphabet.** If a class of dispatch site exists whose resolution is genuinely free in the bytecode (cannot be statically determined and cannot be promoted to a typed primitive without losing spec correctness), then the JIT must speculate there. Multiple such sites would mean the speculation surface stays large and the simplification is bounded. The conjecture would survive in the residual-form "smaller than canonical but not LuaJIT-class," not in the strong form.

**(F2) A JIT-tier complexity component that is not attributable to upstream alphabet impurity.** If, after promoting every promotable discrimination, the JIT still requires substantial dynamic-specialization machinery for reasons orthogonal to alphabet impurity (memory model, GC, exception handling at a complexity scale comparable to the speculation machinery), then the upper-bound argument is wrong. Some of the canonical complexity would survive any upstream cleanup.

Both falsifiers are observable in principle. The first is checkable by enumerating spec dispatch sites and attempting alphabet promotion for each. The second is checkable by building the proposed shape and measuring how much of the canonical-JIT line count survives.

The corpus apparatus's standing claim, per [Doc 730 §VIII](/resolve/doc/730-the-vertical-recurrence-of-the-lowering-compiler-closure-as-primitive-across-substrate-tiers), is that engineering work at one rung is structurally peer with engineering work at every other rung in the lowering chain. The JIT-simplification conjecture is one consequence of this: if the rung-(N+1) alphabet is pure, the rung-N JIT's structural complexity compresses by the amount the impurity was costing.

## X. Successor questions

Three corpus-tier questions extend this articulation.

**(Q1) What is the precise enumeration of P4 sites in JavaScript bytecode under a §XIII-promoted alphabet?** The set bounds the JIT's IC surface. Cataloguing it is engagement-tier work that produces a corpus-tier answer (the IC-surface-cardinality of JavaScript). A small number (single digits or low tens) would corroborate the strong conjecture; a large number would weaken it toward the residual form.

**(Q2) Does the discipline transfer to other dynamic languages?** Python, Ruby, R, Lisp variants. Each has its own spec impurities. Whether the same alphabet-promotion-followed-by-baseline-JIT pattern reduces each language's JIT-tier complexity to the same degree is a comparative-engagement question. CPython's JIT effort (recent additions to CPython 3.13+) is a natural site for the comparison.

**(Q3) Is there an analogous structural simplification for the GC tier?** Canonical engines have substantial GC machinery (generational, incremental, concurrent, write-barrier-laden). The GC tier, like the JIT tier, is a P1–P4 resolver-instance in [Doc 730 §IV](/resolve/doc/730-the-vertical-recurrence-of-the-lowering-compiler-closure-as-primitive-across-substrate-tiers)'s sense (object-graph in, reachable-set out, with verifier and implementation freedom). Whether GC complexity is similarly attributable to upstream alphabet impurity (object-layout opacity, untyped pointers, etc.) is a parallel conjecture worth its own articulation.

## XI. The cruftless application

Operationally, the conjecture admits a near-term test at the rusty-bun engagement tier. The current state at EXT 20 close: cruftless has a bytecode interpreter (no JIT), a clean P1–P4 bytecode alphabet (rusty-js-bytecode crate), and a §XIII Tier-1.5 spec-IR (rusty-js-ir, IR-EXT 92 close) that has begun promoting spec discriminations into typed primitives. Eight EXT-90-class deviations are emerging at the §XIV tier as parity-load patches.

A first-cut JIT would proceed:

1. **Cranelift integration as a dependency.** Add the Cranelift codegen crates to the rusty-js-runtime workspace.
2. **Bytecode-op-to-Cranelift-IR translation table.** For each Op in the bytecode alphabet, define the Cranelift-IR composition that lowers it. Pure ops (Op::Add on primitives, Op::Jump, etc.) translate to single Cranelift instructions or small compositions. Impure ops (Op::GetProperty, Op::Call) translate to Cranelift calls into runtime helper functions that perform the dynamic dispatch.
3. **Per-function compilation threshold.** A counter increments on each function entry; at threshold N, the JIT compiles the function's bytecode to a Cranelift function, links the function pointer into the function table, and subsequent calls dispatch to the JIT-compiled version.
4. **No ICs in the first cut.** Property access goes through the runtime helper. Performance compared to canonical JITs will be worse at this stage; the structural baseline is established.
5. **Selective ICs at P4 sites only.** Once the enumeration of P4 sites is complete (Q1 above), ICs are introduced at exactly those sites and no others.

The success criterion is not benchmark parity with V8. The success criterion is that the JIT's line count, the JIT's complexity attribute, and the JIT's design legibility match the conjecture's structural claim. Benchmark performance is a downstream effect that the canonical JITs spent years tuning; the corpus claim is about *complexity*, not benchmark numbers.

## XII. Where this places the recognition

[Doc 729](/resolve/doc/729-cruftless-a-primary-articulation-of-the-resolver-instance-pattern-as-the-comprehensive-design-toward-which-rusty-bun-morphs) articulated the resolver-instance pattern. [Doc 730](/resolve/doc/730-the-vertical-recurrence-of-the-lowering-compiler-closure-as-primitive-across-substrate-tiers) articulated the lowering-compiler pattern as one species of resolver-instance with P1–P4 as its species-specific guarantees, and named the vertical-recurrence claim across substrate tiers. Doc 730's §XII–§XV opened the upward (spec-discrimination) and downward (deviation-tolerance) axes of alphabet co-evolution.

This document extends the recurrence one tier further. The JIT is a lowering compiler at one more substrate boundary. The structural claim is that the JIT's complexity is bounded by upstream alphabet impurity, and a pure upstream alphabet permits a JIT that is structurally as simple as the lowering-compiler pattern at any other tier.

The conjecture is testable and falsifiable. The success of the corpus apparatus's prior articulations at the IR tier (Doc 730 §X) and the engine tier (Doc 729) suggests the pattern will hold at the JIT tier. The cruftless engagement will provide the empirical instance over the coming engagement extensions.

The deeper claim the corpus is now in a position to make: *canonical-engine complexity is largely substrate-amortization debt accumulated by skipping alphabet promotion at the tiers above*. Each tier's apparent complexity is, when analyzed, the cost of doing without the discipline at the tier above. A clean stack of P1–P4 resolver-instances would be visibly simpler at every tier, including the JIT tier, including the GC tier, including the runtime tier.

The corpus apparatus has been building, document by document, toward this claim. Doc 731 is one more articulation of it, applied at one more tier. The recurrence is the load-bearing observation.

---

## XIII. Resume protocol

The four sub-properties of [Doc 730 §III](/resolve/doc/730-the-vertical-recurrence-of-the-lowering-compiler-closure-as-primitive-across-substrate-tiers) (P1 typed primitives, P2 stage-deterministic, P3 verifier-before-emission, P4 implementation freedom) are checkable against any JIT design the engagement encounters. The six concrete simplifications of §V (S1–S6) are predictive: a JIT operating downstream of a faithful alphabet should exhibit each. The five hard residuals of §VI (H1–H5) are limits the discipline does not remove; naming them defends against over-claiming.

Successor work consists of:

1. Cataloguing the P4 sites in rusty-js-bytecode's current alphabet (per §X Q1). Each site is a candidate IC; the cardinality bounds the JIT's IC surface.
2. Sketching the bytecode-Op-to-Cranelift-IR translation table for the existing Op set. The translation table is the JIT's complete specification at the lowering level; sketching it tests whether the table is small and clean as the conjecture predicts.
3. Continuing §XIII alphabet promotions until the residual P4-site count is small enough that an IC-free JIT is viable as the first cut. This is the precondition for the structurally simple JIT shape to be empirically reachable.

Each step is amortized against the prior corpus apparatus. Pin-Art applies (per Doc 581); the seed.md + trajectory.md discipline at the engagement-tier captures each step; the Doc 730 lowering-compiler pattern provides the structural template against which to check progress.

## XIV. Amendment: empirical corroboration from JIT-EXT 4 (the trusted-i64 ceiling)

This document was articulated as a structural claim. Same-day engagement work (2026-05-20, JIT-EXT 0 through JIT-EXT 4 in `pilots/rusty-js-jit/`) produced the first empirical reading against the conjecture, with three landed substrates: the Op-P4 classification table per §V S1, the Cranelift integration on the engagement's target platform (aarch64-linux on Pi), and a first-cut translator covering the Class A subset (LoadArg, LoadLocal, StoreLocal, PushI32, Add, Sub, Mul, Inc, Dec, Lt, Le, Gt, Ge, Eq, Ne, StrictEq, StrictNe, Dup, Pop, Jump, JumpIfTrue, JumpIfFalse, Return, ReturnUndef). The translator JIT-compiles real bytecode produced by `compile_module` for arithmetic hot loops with control flow.

### XIV.a The measurement

The benchmark function (`sum(n) { var s=0; for (var i=0; i<n; i++) s=s+i; return s; }`) compiled to cruftless bytecode, then JIT-compiled through the translator, then executed:

```
JIT compile time (one-time):              0.412 ms
JIT mean per-call (sum(1_000_000)):       1.25  ms
Cruftless interpreter (sum(1M)):        532     ms
JIT speedup over interpreter:           425×
Bun (V8-class JIT, sum(1M)):              3     ms
JIT vs Bun ratio:                         0.42× (cruftless faster)
```

The Cranelift integration produced machine code that beats Bun's V8-class JIT on this specific hot loop, with the simplest possible per-Op translation (no inlining, no ICs, no type feedback, no internal optimization passes inside the JIT itself; only Cranelift's standard backend pipeline).

### XIV.b The load-bearing caveat

The measurement applies only to functions where the trusted-i64 type assumption holds. The first-cut JIT treats every operand stack value as a raw i64. It does not box as `Value::Number(f64)`. It does not verify operand types at JIT-compile time. It does not deopt on type mismatch. A JIT-compiled function called with a String, Object, or non-Number Boolean would bit-cast garbage and produce nonsense.

The 425× and the 0.42×-of-Bun numbers are not the speed cruftless's JIT will deliver in production. They are the **structural ceiling** the Cranelift backing reaches when the operand-type assumption is satisfied. Production-grade JIT integration adds type-feedback verification, boxing at the JIT / interpreter boundary, and deopt to interpreter on type mismatch (per Doc 731 §VII R4 + R5 + §VI H1). Each of these layers reduces the ceiling, but the *floor* remains the interpreter's 532 ms.

The honest production-grade estimate is the JIT lands between 5 ms and 50 ms per call depending on how often the type guards succeed in real code. The first-cut measurement says nothing about that range. It says only that the Cranelift backing itself is not the cost.

### XIV.c What this corroborates and what it does not

**Corroborates §V S1 (speculation surface shrinks to the genuinely dynamic dispatch sites):** the JIT compiles the entire sum(N) body to straight-line Cranelift IR plus two basic-block branches, with no speculation surface at all when the trusted-i64 assumption holds. The IC surface for this specific function shape is **empty**. Doc 731 §V S1's strong-form claim is corroborated at the substrate level for the case the assumption admits.

**Corroborates §V S3 (the verifier at the JIT tier inherits the upstream verifier's work):** the translator's verifier rejects (returns `Err`) any op not in the supported set. No bytecode well-typedness recheck is needed because the bytecode-compiler tier's P1 + P3 already guarantee the input's well-formedness. The JIT's own verifier checks only the op-coverage contract, not the bytecode's correctness.

**Corroborates §V S4 (single tier is structurally sufficient):** one Cranelift compile pass produces the final machine code. No interpreter-to-baseline tier-up, no baseline-to-optimizing tier-up, no inlining pass. Sparkplug-shaped baseline matches Bun's V8-class output on this benchmark.

**Corroborates §V S5 (Cranelift absorbs the lower tiers):** instruction selection, register allocation, scheduling, and machine-code emission are entirely Cranelift's work. The JIT crate's translator is ~400 lines covering 22 ops with control flow and locals; the Cranelift dependency itself is large (~200K LOC) but is shared with any Rust-hosted JIT and amortizes against many consumers.

**Does NOT corroborate §V S2 (deopt enumerable from the alphabet):** no deopt path is implemented in JIT-EXT 4. The "trusted-i64" assumption is not a speculation; it is an unverified precondition. §V S2's empirical test requires a real type-feedback + deopt path, which is queued for JIT-EXT 5+.

**Does NOT corroborate §V S6 (no internal optimization passes needed):** untested. The current translator is simple enough that no internal pass would help; whether this holds when the op set extends to property access, closure captures, and the rest of the Class B + Class C ops is an open question.

**Does NOT corroborate §VI H1 (interp-to-JIT bridge is hard):** untested. JIT-EXT 4 produces a JIT'd function in isolation. Wiring the JIT into the runtime's call_function dispatch + threshold counter + frame-state reconciliation is JIT-EXT 5's work. The hard residual the doc names lives at that bridge, not at the codegen.

### XIV.d The deeper claim the measurement sharpens

Doc 731 §XII said: "canonical-engine complexity is largely substrate-amortization debt accumulated by skipping alphabet promotion at the tiers above." The JIT-EXT 4 measurement sharpens this to: **canonical-JIT complexity is largely the cost of operating without typed primitives at the operand-stack level**. Cruftless's bytecode alphabet does not currently carry typed operand-stack discriminations (no Op::AddI64, Op::AddF64, Op::AddBoxedValue); every Op::Add must dispatch through ToPrimitive + numeric-vs-string-concat-vs-add. The first-cut JIT cheats by ignoring this and treating every operand as i64. The trusted-i64 ceiling is the speed cruftless could reach *if its bytecode alphabet promoted typed-operand discriminations*.

This identifies a §XIII alphabet-promotion candidate at the bytecode tier (not at the IR tier where Doc 730 §XIII originally landed): typed-operand-arithmetic primitives (`AddI64`, `AddF64`, `AddBoxedAdd`) emitted by the bytecode compiler when the IR tier or a future type-inference pass can prove operand types. With those, the JIT does not cheat. It just emits the typed instruction directly. The trusted-i64 ceiling becomes the real-code speed for any operation the typed alphabet covers.

This is the substrate move that converts the JIT-EXT 4 measurement from a demonstration into production performance. It is also exactly what Doc 730 §XIII promotes the IR alphabet for at the spec-discrimination tier: promote spec discriminations the alphabet collapses, here at the bytecode tier rather than the IR tier.

### XIV.e Where this places the amendment

The amendment does not retract anything from §I through §XIII. It records that the first concrete engagement-tier exercise of the doc's structural claims produced a measurement well within the predicted range, and that the *path to making the measurement applicable to production code* is itself a typed-alphabet-promotion move at the bytecode tier, the same shape as Doc 730 §XIII's IR-tier alphabet promotion.

The corpus claim that JIT complexity is bounded by upstream alphabet impurity now has an empirical instance at one end of the range (trusted-i64, full ceiling reached). The other end of the range (production semantics with type feedback and deopt) is open and is the engagement's next stretch. Both ends compose under the same Doc 730 + Doc 731 framework.

---

*Doc 731 § XIV amendment, 2026-05-20. Jared Foy. jaredfoy.com.*

---

*Doc 731. Jared Foy. jaredfoy.com.*
