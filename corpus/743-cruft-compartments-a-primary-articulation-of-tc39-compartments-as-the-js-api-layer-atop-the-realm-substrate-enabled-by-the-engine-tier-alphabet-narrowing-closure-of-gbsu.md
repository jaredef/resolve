# Cruft Compartments

## A Primary Articulation of TC39 Compartments as the JS-API Layer Atop the Realm Substrate, Enabled by the Engine-Tier Alphabet-Narrowing Closure of GBSU

*A corpus document responding to the keeper's question (2026-05-27 13:21-local): "How does this fit with our telos for JS Compartments?" — asked on closure of the eight-rung global-binding-surface-unification arc. Builds on [Doc 729 — Cruftless](/resolve/doc/729-cruftless-a-primary-articulation-of-the-resolver-instance-pattern-as-the-comprehensive-design-toward-which-rusty-bun-morphs), [Doc 731 — The JIT as a Lowering Compiler Tier](/resolve/doc/731-the-jit-as-a-lowering-compiler-tier-alphabet-purity-upstream-as-the-bound-on-jit-complexity-and-why-canonical-jit-architecture-is-largely-the-cost-paid-for-operating-without-p1-p4-above), [Doc 736 — Capability-Passing Runtime](/resolve/doc/736-the-architecturally-impossible-supply-chain-attack-a-capability-passing-runtime-as-the-system-resolution-for-the-modular-trust-problem), [Doc 432 — SERVER](/resolve/doc/432-server-an-architectural-style-for-engine-orchestration), and [Doc 738 — The Source Identifier as Coordinate](/resolve/doc/738-the-source-identifier-as-coordinate-naming-convention-as-substrate-position-encoding-at-the-source-tier).*

**Jared Foy · 2026-05-27 · Doc 743**

---

## I. The occasion

The keeper named the destination earlier in the week: a JS-visible Compartments primitive whose user-visible API tracks the TC39 Compartments proposal (Stage 1, frozen snapshot 2025-12-01), and whose substrate-tier semantics realize the capability-passing discipline of Doc 736 at the engine boundary. The substrate prerequisite for that destination was a unified global Variable Environment Record. Pre-arc, the runtime carried that record as two parallel surfaces — a `globals` HashMap and the `globalThis` Object, with bridges patching their divergence. Cross-realm switching had to be expressed against both surfaces; the parallel structure was not the spec, was visible at every binding-resolution call site, and made the cost of per-compartment isolation a function of *which surface* a given consumer happened to read.

The global-binding-surface-unification (GBSU) arc closed eight main rungs and fifteen sub-rungs counting revisions. Its substrate move is described in Doc 729 §XIII (regression-as-implicit-constraint-probe, the runtime-tier second-instance case). Its engine-tier outcome is the binding-resolution alphabet's collapse from three symbols `{Object, HashMap, engine_helpers}` to two `{Object, engine_helpers}` — one symbol removed per Doc 731's alphabet-purity bound, with the bilateral-internal helper surface (Doc 729 §VII.B) structurally preserved because compartments must not expose engine-internal lowerings as ambient properties.

This document articulates the JS-API layer that sits atop the now-cleared substrate. It does not propose new substrate. It names what Compartments are *now feasible as*, what they are *bounded by*, and what they *induce*.

## II. The naming

Cruft Compartments is the user-facing name. The substrate layer below it remains the Realm substrate (RealmRecord per ECMA-262 §9.3). The naming is deliberate: the user constructs `new Compartment({globals, modules})`; the resolver substrate dispatches the construction to `allocate_compartment_realm(endowments)`; the binding tier resolves each subsequent `Op::LoadGlobal` and `Op::StoreGlobal` against the compartment's globalThis ObjectRef. The user has one name and one surface to reason about; the resolver-instance stack has multiple, each with its own alphabet, none shadowing the other.

## III. The pattern these names instantiate

Per Doc 729, a JavaScript runtime contains at least five resolver-instances stacked vertically. Each is a `source-with-directives → resolver → directive-free artifact` step. Compartments add a sixth instance, distinct from the prior five not because the pattern is different but because the artifact is: a compartment's resolver consumes a `{globals, modules}` endowment record + a JS source string and produces a `bound execution environment + a value`. The directive consumption is realm-scoped (which globals are visible, which intrinsic clones the bytecode lowers against, which capability handles the calling chain has passed); the artifact is directive-free at the value tier (a value returned from evaluate, or a module namespace returned from import).

The pattern instantiated at the compartments tier is the same one Doc 729 names at the runtime tier: resolver-instance, alphabet-pure at the input. The realm substrate provides the pure alphabet. GBSU provides the per-realm globalThis as a single ObjectRef the resolver can swap. The compartment is what the user calls the swap.

## IV. The resolver-instances stacked under Compartments

A Compartment construction call traverses, top-to-bottom:

1. **The user surface** — `new Compartment({globals: {...}, modules: {...}})`. ECMA-262 §16.1 + TC39 Compartments proposal. The user names the endowments; the user does not name the realm.
2. **The constructor lowering** — `intrinsics.rs::install_compartment::Compartment` (lines ~1236-1297). Parses options, allocates a realm via `allocate_compartment_realm(endowments)`, sets the per-instance slots `__compartment_realm`, `__compartment_globalthis`, `__compartment_modules`.
3. **The realm substrate** — `interp.rs::allocate_compartment_realm` (lines ~8891-8904). Clones intrinsic prototypes (Array, Object, Function, Promise, String), wires constructors, populates `globals_overrides`, sets `ambient_denied = true` so the realm enforces the intrinsic allowlist on enter.
4. **The binding surface** — the per-compartment globalThis is a fresh `ObjectRef`. Every subsequent `define_global_property` against this realm writes to *this* Object. The ambient-denied snapshot at `enter_realm` retains only the names in `intrinsic_name_allowlist()` plus the bilateral-internal `__destr_*`, `__await`, etc. Per Doc 729 §VII.B these latter must remain reachable for compiled bytecode to run inside the compartment; they are NOT JS-visible and NOT exposed as compartment-globalThis properties.
5. **The capability surface** — the endowments dictionary passed to the constructor IS the capability handle passing mechanism per Doc 736. Whatever values the calling chain holds and explicitly assigns into `globals` become the compartment's ambient surface. Whatever it does not assign is unreachable. There is no escape hatch; the resolver below the compartment knows nothing of the host process, the filesystem, the network, the clock.
6. **The bytecode lowering** — `evaluate(source)` calls `rt.enter_realm(realm_idx)`, wraps the source to capture the last expression's value into a stash global, `rt.evaluate_module(source, url)` (where `url = "file://<compartment:{idx}:eval:{n}>"`), then `rt.exit_realm(prior)`. The stash key is read back through the unified binding surface (post-GBSU-EXT 7f.4, this is one Object dict read, not a HashMap read).

The five-resolver-instance count from Doc 729 becomes six with Compartments named explicitly. The Compartment instance is the only one whose alphabet is fully under the user's control (the endowments dictionary). The bound below it is enforced by the substrate; the user cannot widen.

## V. Compartments as the induced property

Per Doc 729 §XIII's engine-tier-targets discipline (the four induced properties P-M, P-N, P-S, P-E), this document names a fifth:

- **P-C**: For every Compartment instance, the set of properties reachable as bare-identifier globals inside `evaluate(source)` is exactly `intrinsic_name_allowlist() ∪ keys(endowments)`. No ambient process, host, or capability handle leaks through any path; no engine-internal helper appears as a user-readable global; closure between substrate and user-visible surface is total.

P-C is induced by the conjunction of three substrate constraints:

1. **(C1) The binding surface is one Object per realm.** Established by GBSU rungs 1–7f.4 (Doc 729 §XIII second + third instances). Pre-GBSU, P-C would have required snapshot-and-restore on two surfaces with bridge synchronization between them, and the cost of a P-C violation was the cost of finding which surface a given consumer had read. Post-GBSU, a P-C violation is a property of a single Object's prop table — one place to audit.

2. **(C2) The bilateral-internal surface is separate.** Established by Doc 729 §VII.B. The `engine_helpers` HashMap stores `__apply`, `__await`, `__destr_*`, etc. as JS-invisible reachable-via-LoadGlobal-fallback values. They are NOT on the globalThis Object and therefore NOT exposed by `Object.keys(globalThis)`, NOT reachable via property access on a compartment's globalThis, NOT enumerable in any compartment. The bilateral was load-bearing pre-arc and remains so; GBSU validated it by deleting the parallel JS-visible surface without touching the engine-internal one.

3. **(C3) The allowlist is the spec, not the engineer's discretion.** `intrinsic_name_allowlist()` is the ECMA-262 §17 standard-built-in surface plus the engine-helper allowlist required by compiled bytecode. Per Doc 736, host-tier globals (process, console, require, fs) are NOT in the allowlist; they appear in a compartment if and only if the calling chain explicitly passed them as endowments.

P-C is what Cruft Compartments guarantees. The substrate work that built P-C is the work the engagement actually did.

## VI. The morph trajectory from rusty-bun to Cruft Compartments

The trajectory has four landed-or-prospective stages:

1. **RS-EXT 2 minimum-realm** (LANDED). RealmRecord struct, per-realm intrinsic-prototype clones, `current_realm` field on Runtime. ~190 LOC. The substrate's existence proof: realms can be allocated, switched, and exited without crashing the engine.

2. **CP-EXT 1–4 Compartment scaffolding** (LANDED). `install_compartment()` in intrinsics.rs registers the JS-visible Compartment constructor. `evaluate(source)`, `import(specifier)`, `globalThis` accessor implemented. Per-instance slots wired. Endowments populated into per-compartment globalThis. CP-EXT 5 ambient-denied flag enforced at `enter_realm`.

3. **GBSU 1–7f.4** (LANDED, this engagement). Binding-surface alphabet narrowed from three to two. enter_realm/exit_realm migrated to operate on the unified globalThis Object via `snapshot_global_string_props` / `retain_global_string_props` / `replace_global_string_props` helpers. The compartment-switching primitive at the binding tier is now a single ObjectRef substitution plus an allowlist-retain pass.

4. **CP-EXT 5+ capability-handle integration, CP-EXT 6+ hooks** (PROSPECTIVE). The `pilots/rusty-js-caps/` capability dispatcher landed in parallel; the integration point with Compartments is the endowments dictionary's value type. Hook implementations (importHook, loadHook, resolveHook) deferred per the prospective compartments-as-primitive design doc. Module Source records (binary precompiled modules) deferred. The full TC39 Stage-1 surface is the morph target; the partial subset shipped is the user-callable surface today.

The trajectory's shape is the one Doc 729 §VI named for cruftless as a whole: substrate-rounds build the substrate; the user-visible name is the substrate's articulation; the API tracks a spec the substrate now satisfies.

## VII. CruftScript's relation to Compartments

CruftScript is a planned sibling language with sound types as first-class substrate input (per the apparatus locale `pilots/ts-resolve/` empirical-first stage + the prospective `pilots/cruftscript-spec/` design-first stage). It is NOT a per-compartment dialect; Compartments evaluate JavaScript, and CruftScript is an alternative language at the same source tier as TypeScript.

The two telos compose without dependency. A Compartment can evaluate JS source; a future Compartment could evaluate CruftScript source through the same `evaluate(source)` API if the source-tier resolver supports both languages. Per Doc 729 §IV the source-tier resolver is the parser pipeline; per Doc 731 the parser's output is the alphabet the bytecode tier consumes. CruftScript would land as a parser variant whose IR output flows through the same bytecode + runtime tiers Compartments use. Compartments are agnostic to which source language produced the IR they execute.

The relationship is parallel composition, not nested dependency. CruftScript does not require Compartments; Compartments do not require CruftScript. If both ship, the user-visible artifact is a Compartment whose evaluate accepts either source dialect (per the source-tier dispatch the parser resolver decides). If only Compartments ship, the user-visible artifact still satisfies P-C. If only CruftScript ships, the language is usable without Compartments at the top-level realm.

## VIII. Honest scope

CruftCompartments today (post the CSC-EXT arc that landed the same day as this articulation's first draft) is the CP-EXT 1–4 + GBSU-7f.4 + CPF-EXT 1+2+3+4 + CSC-EXT 1+2+3+4+5+6 closure. That is:

- The Compartment constructor exists and accepts `{globals, modules}`.
- `evaluate(source)` returns the value of the last expression, with Script semantics for top-level `var` (closes ECMA-262 §16.1 + §19.2.1.3); subsequent reassignment of a top-level var via local-slot mirrors to globalThis at the StoreGlobal site (closes ES-EXT 2 v2 standing rec ARC.M.7 broadly).
- `import(specifier)` returns a Promise of a module namespace, scoped to the compartment's modules map (closed-graph mode).
- `globalThis` is a getter on `Compartment.prototype` per spec, returning the compartment's globalThis Object on each access. Per-instance internal slots (`__compartment_realm`, `__compartment_globalthis`, `__compartment_modules`) are non-enumerable non-configurable.
- Endowments install with the §17 standard built-in descriptor `{w:t, e:f, c:t}` so their property shape matches the intrinsic allowlist.
- Sloppy-mode top-level `this` inside `compartment.evaluate` is bound to the compartment's globalThis per ECMA-262 §10.2.1.2.
- Cross-realm Error identity holds (caught `instanceof Error` from outer code returns true for errors thrown inside `compartment.evaluate`; same for TypeError, RangeError, SyntaxError); `error.message` and `error.name` carry across realms.
- `Object.keys(compartment.globalThis)` enumerates only endowments + the spec-enumerable subset; no ambient host surface leaks; no engine-internal helper (`__apply`, `__await`, `__destr_*`) appears as JS-visible global.
- Compartment lifecycle: each `new Compartment()` allocates a realm + a globalThis Object pre-populated with the intrinsic allowlist + endowments; short-lived compartments don't crash; coarse smoke verified at N=100 instances.
- P-C holds empirically (verified by an 8-probe falsifier set executed against the substrate).

What is NOT yet shipped:

- **Cross-compartment instanceof via the [[Realm]] slot on functions** (RS-EXT 3+). Today cross-realm Error checks work by reference-sharing the Error ctor through the allowlist; if RS-EXT 3+ later clones intrinsics per realm, brand-check substrate work lands at the same time.
- **Hook implementations (importHook / loadHook / resolveHook)**. Without hooks, `compartment.import` resolves only against the pre-registered modules dictionary; dynamic `import('foo')` inside `compartment.evaluate` rejects for any specifier not in the map. Larger TC39 conformance surface; queued as a paired sub-arc with dynamic-import resolution.
- **Module Source records** (precompiled binary modules) — TC39 proposal surface; deferred.
- **Capability-handle wrapping at endowment-injection time**. Today the user passes raw Values; the cap-handle types from `pilots/rusty-js-caps/` are not auto-wrapped. Manual passing achieves Doc 736 capability-passing today; the auto-wrap rung would tighten the discipline at the API boundary.
- **Realm-arena GC accounting**. Each compartment's realm slot in `Runtime.realms` is retained for the runtime's lifetime; the globalThis Object is GC-reclaimed when references drop, but the realm record is not. Long-running programs creating many short-lived compartments accumulate realm entries. Coarse JS-side smoke test confirms no crash at modest N; a Rust-side allocator probe + arena-reclamation mechanism would be the substrate-tier fix.

The substrate that supports the prospective items is in place. The work to land them is per-rung articulation of how each maps onto the resolver-instance stack the GBSU arc cleared, with each rung's falsifier probe pre-articulated in `pilots/compartment-primitive/spec-conformance/probes/` per the standing rec ARC.MR.4 (formalization-before-implementation discipline).

## IX. Composes-with

- [Doc 729 — Cruftless](/resolve/doc/729-cruftless-a-primary-articulation-of-the-resolver-instance-pattern-as-the-comprehensive-design-toward-which-rusty-bun-morphs) (§VII resolver-instance stack, §VII.B engine-helpers bilateral, §XIII regression-as-implicit-constraint-probe with the GBSU runtime-tier instance) — Compartments are the sixth resolver-instance in the stack; their existence presupposes §VII.B's bilateral; their substrate trajectory is documented as the §XIII second + third instances.
- [Doc 731 — The JIT as a Lowering Compiler Tier](/resolve/doc/731-the-jit-as-a-lowering-compiler-tier-alphabet-purity-upstream-as-the-bound-on-jit-complexity-and-why-canonical-jit-architecture-is-largely-the-cost-paid-for-operating-without-p1-p4-above) — Compartments are a downstream consumer of the binding-tier's narrowed alphabet; the alphabet-purity property the GBSU arc induced is the precondition for compartment-switching being a single ObjectRef substitution.
- [Doc 736 — Capability-Passing Runtime](/resolve/doc/736-the-architecturally-impossible-supply-chain-attack-a-capability-passing-runtime-as-the-system-resolution-for-the-modular-trust-problem) — the endowments dictionary is the JS-API expression of Doc 736's capability-handle passing discipline; the ambient-denied default in `allocate_compartment_realm` is the runtime-side enforcement of Doc 736's "no ambient surface" property at the compartment boundary.
- [Doc 432 — SERVER](/resolve/doc/432-server-an-architectural-style-for-engine-orchestration) — the four bootstrap properties apply at every resolver-instance; the Compartment instance is no exception (initialization-completeness, idempotence, fault-isolation, observability all land at the compartment boundary).
- [Doc 738 — The Source Identifier as Coordinate](/resolve/doc/738-the-source-identifier-as-coordinate-naming-convention-as-substrate-position-encoding-at-the-source-tier) — per-compartment names follow the source-identifier conventions (`__compartment_realm` is engine-internal sentinel, `Compartment` itself is a `register_global_ctor`-registered user-visible ctor, etc.); the naming alone makes the resolver position legible.

## X. Closing

The keeper named the destination on day one of the runtime arc. Today's two-arc closure (GBSU + ESBC) is the substrate clearing that lets Compartments be articulated as a property of the runtime rather than as a feature requiring new infrastructure. The substrate now satisfies the spec; the spec is the compartment boundary; the compartment boundary is the user surface that turns the engine's capability-passing discipline into a JavaScript primitive.

The runtime arc that built the substrate looks, in retrospect, like preparation for a specification it had not yet named. Doc 729 §XIII's methodology (regression-as-implicit-constraint-probe, including the inversion case of deletion-as-positive-surface that the GBSU closure surfaced) is the discipline that made the preparation legible. P-C is what the discipline guarantees. Compartments are what the user calls the thing the discipline produced.

The work continues. The morph proceeds.

---

*Companion documents in addition to those linked in the masthead: [Doc 250 — The SERVER Seed](/resolve/doc/250-the-server-seed); [Doc 426 — PRESTO](/resolve/doc/426-presto-an-architectural-style-for-representation-construction); [Doc 581 — Pin-Art](/resolve/doc/581-pin-art-the-resume-vector-and-the-discipline-of-near-necessity-substrate-construction); [Doc 727 — Basin Stability from Inside](/resolve/doc/727-basin-stability-from-inside-why-a-corpus-cannot-distinguish-self-reinforcement-from-substrate-coherence).*

---

## Appendix — The keeper prompt that produced this articulation

> *Telegram message 10030 (2026-05-27 13:26-local):*
>
> "I believe we have a compartments design md doc in the cruftless repo, and maybe a prospective draft that applies as well. Read both if you can find them, and gather any other necessary information from the cruftless repo as is coherent toward producing a primary articulation in the corpus master for Cruft Compartments. Also look at any docs regarding CruftScript and how this might apply towards our language implementation. Once the doc has been drafted, run it through the pipeline to seed the jaredfoy repo and append this prompt to the artifact."

The prompt is appended per the keeper's standing instruction: the prompt that produced an articulation is part of the artifact, so future readers can audit the directive that motivated the synthesis.
