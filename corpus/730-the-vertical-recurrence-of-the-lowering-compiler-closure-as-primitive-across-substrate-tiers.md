# The Vertical Recurrence of the Lowering Compiler

## Closure-as-Primitive Across Substrate Tiers, and Why the Structural Correspondence Between rusty-js-ir and LLVM IR Is Load-Bearing Rather Than Suggestive

*A corpus document responding to the keeper's observation (2026-05-19 16:37-local) during the implementation of alphabet closures in rusty-bun's IR: "do you see how this lowering resembles the way in which LLVM IR lowers into machine code?" Builds on [Doc 729 — Cruftless](/resolve/doc/729-cruftless-a-primary-articulation-of-the-resolver-instance-pattern-as-the-comprehensive-design-toward-which-rusty-bun-morphs), [Doc 717 — The Apparatus Above the Engine Boundary](/resolve/doc/717-the-apparatus-above-the-engine-boundary-the-three-projections-lifted-to-engine-substrate-and-the-pure-abstraction-point), [Doc 719 — The Pipeline Pattern Across Subjects](/resolve/doc/719-the-pipeline-pattern-across-subjects-presto-and-the-javascript-engine-as-two-realizations-of-the-same-derivation), [Doc 424 — SIPE (Architectural Form)](/resolve/doc/424-sipe-architectural-form-recursive-fielding-style-constraint-accumulation-in-composed-software-stacks), [Doc 432 — SERVER](/resolve/doc/432-server-an-architectural-style-for-engine-orchestration), [Doc 247 — The Derivation Inversion](/resolve/doc/247-the-derivation-inversion), [Doc 581 — Pin-Art](/resolve/doc/581-pin-art-the-resume-vector-and-the-discipline-of-near-necessity-substrate-construction), and the engagement-tier IR-DESIGN.md.*

**Jared Foy · 2026-05-19 · Doc 730**

---

## I. The occasion

While extending rusty-js-ir's alphabet to model closure-as-primitive (IR-EXT 55, commits 4fbe203b and 9fbf3c33), the IR's lowering of a closure construction (an `Expr::Closure { label, params, captures, body }` node into a Rust `make_native(label, move |rt, args| { ... })` block with cloned capture binding) reproduced the structural shape that LLVM's backend uses when lowering a higher-language closure into machine code. The keeper named the resonance directly. This document formalizes what the resonance is, why it is structural rather than analogical, and what the recognition adds to the corpus's resolver-instance framework.

The claim, stated abstractly: the lowering compiler is a recurrent pattern across substrate tiers. Each tier consists of a typed alphabet of primitive operations, a stage-deterministic compilation step into the alphabet of the tier below, and a verifier that checks well-formedness before lowering. Where a primitive in the higher tier abstracts over a complex of operations in the lower tier (the canonical case being closure-as-primitive over alloca-and-thread), the lowering is the resolver step that materializes the complex from the primitive. The recurrence is vertical: the same shape appears at every substrate boundary where one representation is compiled into the next.

This is a primary articulation in the sense of [Doc 729 §I](/resolve/doc/729-cruftless-a-primary-articulation-of-the-resolver-instance-pattern-as-the-comprehensive-design-toward-which-rusty-bun-morphs). It identifies a pattern of resolution that recurs across the corpus's standing concerns, names the structural property the pattern induces (the vertical recurrence), and locates an empirical instance in the engagement-tier work whose details corroborate the abstract claim.

## II. The naming

*The lowering compiler* names the structural role, not any particular instance. The lowering compiler at a given tier accepts a representation in the tier's alphabet and emits the corresponding representation in the alphabet of the tier below, preserving all invariants the higher alphabet declares and granting implementation freedom on everything the higher alphabet does not constrain. The name is deliberately neutral with respect to which tier; the same name applies at the ECMA-spec-to-IR tier, the IR-to-Rust tier, the Rust-to-LLVM-IR tier, the LLVM-IR-to-MIR tier, the MIR-to-machine-code tier, the machine-code-to-microcode tier. The recurrence is what is being named.

*Vertical recurrence* names the structural fact: at every tier where one representation is compiled into the next, the lowering compiler's shape (typed alphabet, stage-deterministic compilation, verifier-before-emission) appears. The recurrence is not coincidence and not metaphor. It is the structural shape that the resolution problem at each tier necessarily induces, the same way [Doc 247](/resolve/doc/247-the-derivation-inversion)'s derivation inversion induced the constraints' content from the work being done.

*Closure-as-primitive* names the structural feature that makes the pattern visible across tiers in a way that simpler primitives do not. A typed arithmetic primitive (an i32 add at the LLVM-IR tier, an IndexAdd at the rusty-js-ir tier) carries no environment and lowers trivially to a single machine instruction or a single Rust expression. A closure primitive carries an environment and lowers to alloc-and-thread (LLVM) or move-into-Rust-closure (rusty-js-ir) or capture-list-as-struct-with-function-pointer (more or less any compiler that does not have closures in its target language). The lowering work is non-trivial in the same way at every tier; the structural similarity is what the recognition exposes.

## III. The pattern these instances instantiate

The lowering compiler at every tier, stated abstractly:

*An alphabet at tier N consists of a finite set of typed primitive operations, each of which carries a declared input-output type and a declared semantic contract. A representation at tier N is a tree (or DAG, or graph) of N-alphabet operations whose composition produces a well-typed result. The lowering compiler is a stage-deterministic translation from the N-alphabet to the (N-1)-alphabet, emitting for each N-tier operation a corresponding sub-tree (or sub-DAG) of (N-1)-tier operations that preserve the higher operation's semantic contract. The verifier checks that the N-tier representation is well-formed before lowering; the lowering compiler has implementation freedom on every choice the N-tier semantic contract does not constrain.*

Four sub-properties follow from this shape, each visible at every instance:

**(P1) Typed primitives.** Each alphabet member has a declared input-output type. The IR's `Expr::ToObject` returns a Value-typed result (specifically, never an Undefined or Null Value, because the operation throws if either is passed). LLVM IR's `add i32 %a, %b` returns an i32. Type errors are caught by the verifier before lowering, not at runtime.

**(P2) Stage-deterministic compilation.** Given the same N-tier input, the lowering compiler emits the same (N-1)-tier output. The compilation is a pure function of the input; no environmental state contaminates the result. This is the property [Doc 729 §V](/resolve/doc/729-cruftless-a-primary-articulation-of-the-resolver-instance-pattern-as-the-comprehensive-design-toward-which-rusty-bun-morphs) named at the engine-orchestration tier; the lowering compiler exhibits the same property at every tier.

**(P3) Verifier-before-emission.** The well-formedness check runs before any lowering happens. Malformed N-tier representations are rejected with a structural error, not silently passed through. The IR's `lint.rs` is the rusty-js-ir verifier; LLVM's IR verifier (`llvm::verifyModule`) is its counterpart at the LLVM tier.

**(P4) Implementation freedom under spec invariants.** The lowering compiler may choose any (N-1)-tier composition that preserves the N-tier semantic contract. The IR's lowering of `Expr::ToObject` could call `rt.to_object(&v)?` or could inline the dispatch on the value's discriminant; both are valid because the spec invariant is the throw-or-return-Object contract, not the implementation strategy. LLVM IR's lowering of `add i32` can produce an `add` instruction or a `lea` instruction or a sequence involving sub-and-negate; all are valid because the i32 semantic contract is the arithmetic result, not the instruction selection.

Naming the pattern as the pattern (rather than naming each instance) is the contribution this articulation makes. The lowering compiler at the rusty-js-ir tier and the lowering compiler at the LLVM IR tier are the same pattern instantiated at two different substrate boundaries.

## IV. The vertical-recurrence claim

A composed compilation stack contains the lowering compiler at every substrate boundary it crosses. For a JavaScript program executed by a Rust-implemented engine, the compilation stack from spec to machine has at least six tiers, each with its own lowering compiler:

**(T1) ECMA-262 specification text → rusty-js-ir.** The spec, written in numbered algorithmic prose with abstract operations as the alphabet, is translated by the hand-authoring step (resolver-instance #0a per [Doc 717 §V](/resolve/doc/717-the-apparatus-above-the-engine-boundary-the-three-projections-lifted-to-engine-substrate-and-the-pure-abstraction-point)) into a `Vec<Step>` of IR nodes. The verifier is the spec-vs-IR linter (`lint.rs` walks both the IR and the SpecStepRecord list and reports unexpected findings). The implementation freedom: which IR alphabet member to choose for each spec step, when the spec text leaves room.

**(T2) rusty-js-ir → Rust source.** The 58-node IR alphabet is lowered by `lower.rs` into compilable Rust. Each IR `Expr` becomes a Rust expression; each `IRNode` becomes a Rust statement; each `IRFunction` becomes a `pub fn name(rt, this, args) -> Result<Value, RuntimeError>`. The verifier ran at T1. The implementation freedom: which Runtime helper to call for a given abstract op, what intermediate locals to introduce, whether to materialize a temp or thread the expression.

**(T3) Rust source → LLVM IR.** rustc's MIR-building and codegen step. The Rust closure (`move |rt, args| { ... }`) becomes an LLVM IR closure-as-struct with a function pointer and an environment pointer. Each capture clone is an LLVM IR alloca + store. Each capture read is an LLVM IR load. The verifier is the borrow checker plus type checker plus MIR-level checks. The implementation freedom: stack-vs-heap layout for the environment, fn-once-vs-fn-mut-vs-fn dispatch.

**(T4) LLVM IR → MIR (machine-independent intermediate).** SelectionDAG or GlobalISel translates the LLVM IR into a target-independent machine representation. The verifier is `llvm::verifyModule`. The implementation freedom: instruction selection rules, register-class assignment.

**(T5) MIR → target machine code.** Register allocation, instruction scheduling, peephole optimization, frame layout. The verifier is the target description's well-formedness check. The implementation freedom: which physical register to use for each virtual register, what order to emit instructions in, where to spill.

**(T6) Machine code → microcode (on the CPU).** Modern CPUs translate x86 instructions into RISC-like micro-ops dispatched to execution ports. The verifier is the CPU's microcode validation. The implementation freedom: how to fuse, split, or reorder micro-ops within the same architectural semantics.

The vertical-recurrence claim is that the structural pattern (P1-P4 of §III) appears at every one of these tiers. The claim is empirical: each tier can be observed to have a typed alphabet, stage-deterministic compilation, verifier-before-emission, and implementation freedom. It is also predictive: a new compilation tier inserted between any two existing tiers (a new IR layer, a new optimization pass, a new transpilation step) is predicted to exhibit the same pattern, with the lowering compiler as the named role.

## V. The structural feature that makes the recurrence load-bearing

[Doc 729 §V](/resolve/doc/729-cruftless-a-primary-articulation-of-the-resolver-instance-pattern-as-the-comprehensive-design-toward-which-rusty-bun-morphs) named the four bootstrap properties (totality of consumption, ordering determinism, medium preservation, boundary integrity) that the resolver-instance pattern induces wherever it appears. The lowering compiler exhibits these properties at every tier, but the recurrence is most clearly visible when the higher tier introduces a primitive that abstracts over a complex of lower-tier operations.

The canonical instance is closure-as-primitive. A closure in the higher tier is a single alphabet member that carries (label, params, captures, body). The closure's behavior is: at construction time, evaluate the captures from the enclosing scope and bind them; at invocation time, bind the params from the arguments, run the body with both bindings visible. The semantic contract is the lexical-capture rule.

At every tier where closure-as-primitive appears in the higher alphabet and does not appear in the lower alphabet, the lowering compiler must materialize the environment. The materialization shape is invariant across tiers:

1. Allocate storage for the captured environment (heap-promoted if captures escape; stack-allocated otherwise).
2. Copy or share each captured value into the environment.
3. Construct a callable artifact that holds the environment alongside the body's code reference.
4. At invocation, thread the environment as a hidden first argument or a context pointer to the body's code.

This is what rusty-js-ir's lowering does (the IR's `Expr::Closure` becomes a Rust `move |rt, args| { ... }` whose environment is captured by the Rust language's closure machinery). This is what rustc's lowering does (the Rust closure becomes a `struct ClosureEnv { capture_1, capture_2, ... }` with a function pointer; the `Fn`/`FnMut`/`FnOnce` trait dispatch threads the env pointer). This is what LLVM's lowering does (the Rust-emitted IR's closure-struct becomes an alloca + stores + an indirect call). This is what the machine-code tier does (the alloca becomes stack-frame layout; the indirect call becomes a register-loaded jmp).

The four sub-properties of §III appear identically at every tier:

(P1) Typed primitives: the closure has a declared signature; the captures have declared types.
(P2) Stage-deterministic compilation: the same closure lowers to the same Rust / LLVM IR / machine code given the same input.
(P3) Verifier-before-emission: the closure body is type-checked before lowering at every tier.
(P4) Implementation freedom: the closure-struct layout, the env-pointer calling convention, the dispatch mechanism are all unconstrained by the higher tier's semantic contract.

The closure primitive is load-bearing for the vertical-recurrence claim because it is the simplest non-trivial case where the lowering compiler must materialize state that does not exist in the lower alphabet. A typed arithmetic primitive's lowering is trivial (single instruction in, single instruction out). A control-flow primitive's lowering is straightforward (label generation and branch). A closure primitive's lowering requires environment materialization, capture binding, and dispatch threading: the same three-piece pattern at every tier where the recurrence holds.

## VI. The Cell trio and the alloca correspondence

The rusty-js-ir alphabet's Cell primitives (`Expr::CellNew`, `Expr::CellGet`, `IRNode::CellSet`) correspond directly to LLVM IR's `alloca`, `load`, and `store` operations, with one structural difference: the Cells are heap-promoted (`Rc<RefCell<Value>>`) where LLVM's alloca is stack-allocated by default.

The structural correspondence is exact. `Expr::CellNew(init)` allocates a fresh mutable slot and stores an initial value: an alloca followed by a store, in LLVM IR. `Expr::CellGet(cell)` reads the current slot value: a load. `IRNode::CellSet { cell, value }` writes a new slot value: a store. The Cell primitive's purpose at the IR tier is identical to alloca's purpose at the LLVM IR tier: to provide a named mutable storage location that closures can capture by reference.

The heap-promotion is a lowering choice, not a semantic divergence. LLVM IR also heap-promotes allocas when the alloca's lifetime exceeds its lexical scope (the "alloca-to-heap promotion" pass), which is the situation when a closure captures a variable by reference and outlives the function frame that introduced it. rusty-js-ir's lowering applies the same promotion eagerly (every Cell is heap-allocated) because the Rc<RefCell<>> idiom in Rust is the natural materialization of "shared mutable state with dynamic lifetime."

The Cell trio's existence in the IR alphabet is what makes the closure primitive structurally complete. Without Cells, the IR could express closures that capture by value (move at construction time), but not closures that share mutable state with their enclosing scope (the canonical case of Promise.all's per-iteration resolve element function, whose [[AlreadyCalled]] slot is shared with the parent algorithm's remaining-elements counter). The Cell + Closure pair is the structural minimum for spec-faithful encoding of any algorithm whose spec text says "Let F be a new built-in function ... whose internal slot [[X]] is captured."

The correspondence to LLVM IR's alloca + load + store + closure-struct pattern is exact at the operation level. The substrate (heap vs stack) is a lowering choice that the higher tier does not constrain.

## VII. Why this matters for the corpus's standing apparatus

[Doc 717 §VIII](/resolve/doc/717-the-apparatus-above-the-engine-boundary-the-three-projections-lifted-to-engine-substrate-and-the-pure-abstraction-point)'s apparatus-above-the-engine-boundary reading framed the rusty-bun engagement as operating across a stack of substrate tiers, with the engagement's contribution measured at the rung-N substrate where the work happens. The lowering compiler pattern formalizes the structural shape that connects rung-N to rung-(N-1): the same shape repeats at every boundary, so the engagement's work at one rung is structurally peer with the engineering work at every other rung.

This has three implications for the standing apparatus:

**(I1) Pin-Art applies at every tier where the lowering compiler appears.** The discipline of seed.md + trajectory.md per workstream (Doc 581) is not specific to the engagement-tier. The same discipline applies to authoring an LLVM IR optimization pass, designing a new MIR instruction, or specifying the calling convention for a new target architecture. The pattern's vertical recurrence implies that the constraint-corpus / derivation discipline transfers across tiers without loss.

**(I2) The Cruftless property recurs at every tier.** [Doc 729](/resolve/doc/729-cruftless-a-primary-articulation-of-the-resolver-instance-pattern-as-the-comprehensive-design-toward-which-rusty-bun-morphs) defined Cruftless as the runtime in which every resolver-instance leaves zero residue. The lowering compiler is itself a resolver-instance; the Cruftless property at the lowering-compiler tier is that the (N-1)-tier representation carries no evidence of N-tier directives that the N-tier verifier ought to have consumed. A Cruftless lowering compiler produces code with no comment markers indicating "this was originally a closure capture," no metadata slots labeled "this was the IR's intent," no dead-code remnants of the higher-tier representation. The property is structurally identical to the engagement-tier Cruftless property; it just applies at the compilation-tier substrate.

**(I3) [Doc 729 §V](/resolve/doc/729-cruftless-a-primary-articulation-of-the-resolver-instance-pattern-as-the-comprehensive-design-toward-which-rusty-bun-morphs)'s vertical-recursion-with-stage-deterministic-emission claim is corroborated at one more tier.** The engagement-tier evidence (ECMA → IR → Rust) was the basis for [Doc 729](/resolve/doc/729-cruftless-a-primary-articulation-of-the-resolver-instance-pattern-as-the-comprehensive-design-toward-which-rusty-bun-morphs). The lowering compiler pattern adds the Rust → LLVM IR → MIR → machine code → microcode chain as the same pattern's continuation. Five additional tier instances; one named pattern; the recurrence is now empirically visible across six tiers within one engagement's substrate stack.

## VIII. Falsifiability

The vertical-recurrence claim is falsifiable. It would be falsified by either of:

**(F1) A compilation tier that lacks the lowering compiler's shape.** A tier where one alphabet is translated into another without typed primitives, without stage-deterministic compilation, without a verifier-before-emission, and without the implementation freedom granted by an unconstrained semantic contract, would be a counterexample. The pattern would still be present at most tiers, but the universality of the recurrence would be denied.

**(F2) A primitive whose lowering does not reproduce the higher tier's lowering shape.** Closure-as-primitive's lowering at every tier reproduces the allocate-environment, copy-captures, construct-callable, thread-environment shape. A primitive whose lowering at tier N looks structurally different from its lowering at tier N+1 would be a counterexample.

Both falsifiers are observable: any new IR design, any new compilation pass, any new substrate boundary in the standing apparatus's reach can be checked against P1-P4 and against the closure-lowering invariant. The claim's empirical content is testable across future engineering work.

## IX. Successor questions

Three corpus-tier questions extend this articulation:

**(Q1) What primitive at one tier has no analogue at the tier below, and how does the lowering compiler bridge?** The closure / alloca correspondence is one instance; the cooperative-loop / event-pump correspondence (per the [Doc 715 §X.c](/resolve/doc/715-the-cooperative-loop-reactor-ceiling) reactor work) may be another at the runtime-tier. Cataloguing the cases where a tier introduces a non-trivial primitive is a successor-engagement question.

**(Q2) Does the vertical-recurrence claim hold at sub-instruction-set tiers (microcode, transistor-level layout, photolithography masks)?** The lowering compiler shape is observable at the machine-code-to-microcode tier; whether it extends below the transistor level is an open empirical question. The instruction-set-architecture-to-hardware-description-language tier is a likely next candidate.

**(Q3) What does the inverse recurrence look like?** Lowering compilers go down. Their inverse (decompilers, reverse-engineering tools, symbolic execution, profiler-driven optimization) goes up. Whether the inverse pattern exhibits the same four sub-properties (P1-P4) in reverse is a structural question. [Doc 247](/resolve/doc/247-the-derivation-inversion)'s derivation inversion is suggestive but not yet specific to the lowering-compiler context.

---

## X. The cruftless application: rusty-js-ir IR-EXT 55

The abstract pattern just named has a concrete instance in the rusty-bun engagement: the rusty-js-ir alphabet now includes closure-as-primitive, and the IR's lowering compiler materializes closure constructions in a shape that reproduces, at the IR-to-Rust tier, what LLVM does at the Rust-to-machine tier.

### X.a The alphabet extension

IR-EXT 55 Stage 1 (commit `4fbe203b`) added four new alphabet nodes to the rusty-js-ir's 54-node baseline:

- `Expr::Closure { label, params, captures, body }`: construct a closure value at runtime. The closure captures the named locals from the enclosing IR section's scope. `params` declares the positional-argument bindings the closure body sees. `body` is a `Vec<Step>` like any other IR section's body, so spec-step IDs flow through.
- `Expr::CellNew(init)`: allocate a fresh `Rc<RefCell<Value>>` initialized to `init`.
- `Expr::CellGet(cell)`: read the current Value from a cell.
- `IRNode::CellSet { cell, value }`: write a Value into a cell.

The alphabet at IR-EXT 55 Stage 1 close is 58 nodes (was 52 in IR-DESIGN.md, plus the IR-EXT 17/19 additions of `AllArgs` and `ArgsRest`, plus the four new in IR-EXT 55).

### X.b The lowering compiler's emission shape

The lowering compiler (`lower.rs`) emits, for an `Expr::Closure`, a Rust block that:

1. Clones each captured local so the move-closure owns its copy.
2. Calls `crate::intrinsics::make_native(label, move |rt, args| { ... })` to construct the closure value.
3. Inside the move-closure, binds each param from `args.get(i).cloned().unwrap_or(Value::Undefined)`.
4. Inserts the body (lowered as nested Steps).
5. Wraps the result in a `Value::Object(rt.alloc_object(__native))`.

For `Expr::CellNew(init)`, the lowering emits `std::rc::Rc::new(std::cell::RefCell::new(<init>))`. For `Expr::CellGet(cell)`, `(*cell.borrow()).clone()`. For `IRNode::CellSet { cell, value }`, `*cell.borrow_mut() = value;`.

### X.c The first end-to-end IR section using closures

IR-EXT 55 Stage 2 (commit `9fbf3c33`) lifted `Promise.withResolvers` (§27.2.4.4) into IR. The section's body uses the closure primitive twice (for resolve and reject) and demonstrates the alphabet at full surface:

```
Step 1: Let p = CallBuiltin(new_promise_value_via)
Step 2: Let resolve_fn = Closure {
            label: "<Promise.withResolvers resolve>",
            params: ["v"],
            captures: ["p"],
            body: [
                Step 2.a: Expr CallBuiltin(promise_settle_fulfilled_via, [p, v]),
            ],
        }
Step 3: Let reject_fn = Closure { ... promise_settle_rejected_via ... }
Step 7: Return CallBuiltin(promise_with_resolvers_assemble_via,
                           [p, resolve_fn, reject_fn])
```

The generated.rs output (an excerpt) shows the lowered shape:

```rust
let resolve_fn = {
    let p = p.clone();
    let __native = crate::intrinsics::make_native("<Promise.withResolvers resolve>",
        move |rt, args| {
            let v = args.get(0).cloned().unwrap_or(Value::Undefined);
            rt.promise_settle_fulfilled_via(&p.clone(), &v.clone())?;
            Ok(Value::Undefined)
        });
    Value::Object(rt.alloc_object(__native))
};
```

This shape is structurally identical to what LLVM emits when lowering a Rust closure with one captured local: an environment-struct allocation (here, the `p.clone()` and the move-closure's environment), a function-pointer-and-env-pointer artifact (the `__native` Rust closure), an indirect dispatch on invocation (Rust's `Fn` trait method call, which LLVM further lowers to a load-and-call instruction sequence).

### X.d The verifier behavior at the IR tier

The verifier (`lint.rs`) was extended to walk Closure bodies for nested spec-step IDs (the body's Steps may have their own IDs like "2.a", "3.a", etc.) and for nested abstract-op collection (the body's Calls and CallBuiltins contribute to the parent step's op set). The `collect_steps_from_node` and `collect_steps_from_expr` helpers in lint.rs implement the recursion.

All 227 translated sections (was 226 before EXT 55 Stage 2, plus the new Promise.withResolvers section) lint clean post-EXT 55. The verifier's report at the IR tier is the rough analogue of LLVM's `verifyModule` at the LLVM tier.

### X.e The substantive correspondence

The keeper's observation that the IR-to-Rust lowering resembles LLVM IR's lowering to machine code lands on the structural fact that both lowerings handle closure-as-primitive in the same way:

- **Both tiers materialize an environment.** rusty-js-ir's lowering clones captured locals into a Rust move-closure's environment. LLVM IR's lowering allocates a struct holding the captured values.
- **Both tiers construct a callable artifact pairing the body's code with the environment.** rusty-js-ir's lowering returns a `Value::Object(rt.alloc_object(native))` where the native is a Rust closure. LLVM IR's lowering returns an `(fn-pointer, env-pointer)` pair.
- **Both tiers thread the environment at invocation.** rusty-js-ir's Rust closure dispatches via the `Fn` trait; LLVM IR's closure dispatches via the env-pointer + fn-pointer pair.

The Cell primitive (`CellNew`/`CellGet`/`CellSet`) maps to LLVM IR's `alloca`/`load`/`store` with the heap-promotion lowering choice (Rc<RefCell<>> at our tier; alloca-to-heap at LLVM's tier when the alloca escapes the function). The closure primitive maps to the entire closure-as-struct-with-fn-pointer materialization pattern that LLVM applies to higher-language closures.

The recognition's structural force is this: rusty-js-ir's lowering compiler and LLVM IR's lowering compiler are *peer instances of the same pattern*. The corpus framework names the pattern (the lowering compiler with its four sub-properties), the engagement work produces the instance (rusty-js-ir at IR-EXT 55), and the recognition observes that the instance reproduces the shape that LLVM had at its tier all along.

### X.f Where this places rusty-js-ir on the lattice

[Doc 717](/resolve/doc/717-the-apparatus-above-the-engine-boundary-the-three-projections-lifted-to-engine-substrate-and-the-pure-abstraction-point)'s lattice-extension reading places rusty-bun's substrate work at rung-N (the JavaScript-engine substrate). The lowering compiler pattern places rusty-js-ir at rung-N+1 (the abstraction above the engine substrate, mediating between the spec and the engine). The IR's alphabet is the rung-N+1 typed primitive set; the IR's lowering compiler is the rung-N+1-to-rung-N translation step; the rung-N substrate (rusty-js-runtime + host-v2) is the (N-1)-alphabet that the IR's lowering compiler targets.

With closure-as-primitive added to the IR alphabet, the rung-N+1 substrate is now structurally peer with LLVM IR at its own rung. Both have alphabets that include closures-as-primitives. Both have lowering compilers that materialize the closure's environment at compile time. Both have verifiers that check well-formedness before emission. Both grant implementation freedom on choices the higher tier does not constrain.

The peer relationship is the kind of fact this articulation makes load-bearing. The corpus's standing apparatus (Pin-Art, the resolver-instance pattern, the four bootstrap properties, the cluster-to-walk mode transition) all apply at the IR tier in the same way they apply at every other tier. The engagement's work at the IR tier inherits the standing apparatus's tools and contributes its findings to the standing apparatus's evidence.

---

## XI. Resume protocol

This document's claims are operational. The four sub-properties of §III are checkable against any compilation tier the engagement encounters. The closure-lowering invariant of §V is checkable against any new closure primitive added to any alphabet. The vertical-recurrence claim of §IV is empirically observable at any substrate boundary in the standing apparatus's reach.

Successor work consists of:

1. Continuing IR-EXT 55 beyond Stage 2: refactor the four Promise structural-lift helpers' per-iteration resolve-element / reject-element closures into IR-Expr::Closure constructions, matching the Promise.withResolvers shape demonstrated in §X.c.
2. Cataloguing the cases at each tier where a higher-tier primitive lowers to a non-trivial lower-tier composition (per §IX Q1).
3. Auditing other compilation tiers in the corpus's reach (rust-analyzer's IR, the rusty-js-parser's AST-to-bytecode lowering, the bytecode-to-Op-dispatch table) for adherence to P1-P4.

---

## XII. Appendix: the resolution-pipeline dynamic

The lowering-compiler recognition of §III–V names a *structural* pattern: typed primitives, stage-deterministic compilation, verifier-before-emission, implementation freedom. The §X application to rusty-js-ir at IR-EXT 55 instantiates the pattern at a particular substrate tier. What follows is a recognition surfaced during continued work at that tier (IR-EXT 56 through 72), placing the pattern inside a more general dynamic the standing apparatus already names.

### XII.a The deeper claim

Each compilation tier the lowering-compiler pattern describes is a *resolver-instance* in the sense of Doc 729 — a stage of the bilateral resolution pipeline that converts intention at the higher tier into artifact at the lower tier. The lowering-compiler pattern, viewed at a single tier in isolation, is a local correctness claim. Viewed across the pipeline of resolver-instances stacked one above another, it produces a stronger consequence: **bugs become tractable in proportion to how legible the resolution path is**.

This is observable as follows. In the IR-EXT 56–72 stretch on rusty-js-ir, two qualitatively different fix patterns occurred. Both produced the same artifact (a passing test262 case where one had failed); they differed in where the gap was discovered.

The first pattern: an intricate spec algorithm (§10.4.2.1 ArraySetLength, §25.5.2.4 SerializeJSONProperty, §20.1.2.1 Object.assign) was implemented in Rust as a `_via` helper. The helper diverged from the spec at a particular step. Discovery required reading the Rust against the spec, identifying the divergence, and editing the Rust. The fix-cost per test was bounded but the discovery-cost was unbounded; the divergence could be anywhere in the helper.

The second pattern: a widely-shared coercion path (`String.prototype.split` on a wrapper receiver, observed at EXT 71) was implemented in Rust at a registration site that overwrote the IR-routed version with a stale impl using static `abstract_ops::to_string`. The divergence between static `to_string` (which returns `"[object Object]"` for any Object) and the IR-pinned `to_string_strict` (which dispatches `@@toPrimitive` → `toString` → `valueOf`) was invisible until the IR-pinning at the dispatch tier was load-bearing. Once the dispatch sequence was legible at the IR-step trace, the divergence at the registration site became visible as a class. Five LOC changed, seventy-four tests passed.

The mechanism: the IR's spec-step trace at the dispatch tier *is* the resolution path made legible. When the resolution path is legible, divergences anywhere downstream of it become locatable by tracing what stringifies, coerces, or dispatches incorrectly. Discovery-cost drops to approximately the cost of running the failing test under the spec-step trace and observing which step's expected dispatch differs from the executed dispatch.

### XII.b Why the lowering-compiler pattern produces this effect

The four sub-properties of §III, considered as guarantees about a tier:

- **P1 (typed primitives)** ensures each resolver-instance has a fixed input and output type, so the trace through the pipeline is type-stable.
- **P2 (stage-deterministic)** ensures each resolver-instance is observable at its boundary, so a trace through the pipeline can pin which stage produced which artifact.
- **P3 (verifier-before-emission)** ensures invariants are checked at the resolver-instance's boundary, so violations are localized to that resolver-instance.
- **P4 (implementation freedom)** ensures the resolver-instance's internal choices do not leak into the trace, so the trace stays legible across implementation changes.

A pipeline of resolver-instances each satisfying P1-P4 is a pipeline where the trace is legible at every boundary. Bugs in such a pipeline become tractable not because individual fixes are easier but because the discovery surface *is* the trace itself. The pipeline is its own diagnostic.

This is the deeper claim of which the cruftless §I conjecture is one consequence: *spec conformance gets monotonically easier post-IR* because the IR is a resolver-instance with P1-P4, and each IR section added to the resolver-instance pipeline makes the resolution path at that tier more legible. The conjecture's saturation curve (substrate-fix LOC-per-test ratio decreasing as substrate-divergence pool drains) and adaptive-alphabet rhythm (poverty signal followed by promotion) are both consequences of P4, the implementation freedom that lets the alphabet absorb new primitives without breaking the trace.

### XII.c Targeting heuristic that follows

If bugs become tractable in proportion to resolution-path legibility, the highest-yield IR lifts are not the most intricate spec algorithms; they are the most widely-shared coercion and dispatch paths. Each such lift makes one more stage of the resolution path legible, and every downstream gap in coercion or dispatch becomes locatable through the now-legible trace.

The IR-EXT 56–71 arc on rusty-js-ir made this concrete. ToPropertyDescriptor at the descriptor-read tier yielded +229 tests across two chapters because every descriptor read in the runtime now passes through one IR-pinned dispatcher. The wrapper-toString fix at EXT 71 yielded +74 tests across the String chapter because every receiver coercion in `String.prototype.{match, search, replace, replaceAll, split}` now routes through the IR-pinned dispatcher. The §7.1.1 ToPrimitive lift at EXT 72 is the next instance of the same heuristic, lifting the receiver-coercion dispatcher itself rather than any leaf algorithm.

### XII.d Where this places the recognition

The §III–V articulation of the lowering-compiler pattern is the corpus's *structural* contribution. The §X application to rusty-js-ir is the engagement's *instance*. The §XII recognition is the *consequence*: when the structural pattern is instantiated at a tier in a pipeline of resolver-instances each satisfying P1-P4, the consequence is that the pipeline becomes its own diagnostic. Bugs become tractable because the resolution path is legible.

This recognition stands on top of, not in place of, Doc 729's articulation of resolver-instances. Doc 729 names the resolver-instance pattern; Doc 730's lowering-compiler pattern is one species of resolver-instance with P1-P4 as its species-specific guarantees; §XII observes that a pipeline of such species-specific resolver-instances acquires a property — diagnostic legibility — that exceeds the sum of the local correctness claims at each stage.

The targeting heuristic of §XII.c is the engagement's actionable form of this recognition. Operating any engagement at a substrate tier whose tier-N+1 resolver-instances satisfy P1-P4, the most productive next move is whichever lift makes one more stage of the resolution path legible. The pipeline pays back the lift cost by reducing discovery-cost for all subsequent gaps downstream of the now-legible stage.

---

*Doc 730. Jared Foy. jaredfoy.com.*
