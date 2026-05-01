<!-- chronological_ordinal: 28 -->
# SERVER: An Architectural Style for Engine Orchestration

> **Reader's Introduction**
>
> This document defines SERVER, an architectural style that governs how a web application's server-side engine is assembled before it ever processes a request. Where REST (Fielding's style for network transfer) governs how data moves across the wire, and PRESTO (the construction-level style) governs how pages are built from templates, SERVER governs the layer underneath: the bootstrap process that produces the engine itself. Five constraints are formalized -- including a namespace boundary between orchestration code and application code, fully consumed bootstrap directives, and self-embedded cryptographic authorization -- and the property they induce is called "recursive ambivalence with self-authorizing determinism," meaning the engine is provably correct by construction and carries its own proof of assembly integrity.

**Jared Foy**
**April 2026**

---

<div style="background: #fef3c7; border-left: 4px solid #dc2626; padding: 1rem 1.25rem; margin: 1.5rem 0; color: #7f1d1d; border-radius: 3px;">

**⚠️ SUPERSEDED — See the current SERVER dissertation**

This document has been superseded by [Doc 432 — SERVER: An Architectural Style for Engine Orchestration](/resolve/doc/432-server-an-architectural-style-for-engine-orchestration). Doc 432 restates the SERVER style in the formal register of Doc 426 (the current PRESTO dissertation), separates prior art from the formalization, catalogues prior art comprehensively in a dedicated §13, and traces conceptual foundations in §12. The pulverization findings from [Doc 431](/resolve/doc/431-pulverizing-server) are integrated into Doc 432's prior-art apparatus. This document is retained as a historical artifact; readers seeking the current framing should consult Doc 432.

</div>

---

## Authorship and Scrutiny

*Authorship.* Written by Claude Opus 4.7 (Anthropic), operating under the RESOLVE corpus's disciplines, released by Jared Foy. Mr. Foy has not authored the prose; the resolver has. Moral authorship rests with the keeper per the keeper/kind asymmetry of Docs 372–374.

*A companion style to PRESTO, governing the orchestration level where the construction engine itself is assembled.*

---

## Abstract

PRESTO formalizes constraints at the representation-construction level, where REST is silent. It composes with REST to induce ambivalent execution with agnostic determinism. Yet even a PRESTO-conformant engine is still implemented with ungoverned server-side code: routes, middleware, adapters, pipelines, registries. This code lies outside PRESTO's scope, creating an asymmetry -- the output obeys the bilateral model, but the machine that produces it does not.

SERVER identifies and formalizes a minimal set of constraints that operate strictly at the orchestration level: the space between the engine's authoring act and the moment the immutable runtime graph is emitted. These constraints do not modify, extend, or replace any PRESTO constraint. They compose alongside PRESTO (and therefore alongside REST), governing what PRESTO was silent about. The property they induce -- **recursive ambivalence with self-authorizing determinism** -- is distinct from PRESTO's property. Neither style provides the other's property. Their composition produces a design space that neither could open alone.

The style defined by these orchestration-level constraints is called **SERVER** (Server-Embedded Resolution and Verification Executed Runtime). It reflects the recursion: SERVER operates within a PRESTO-constrained construction model, adding constraints that govern how the construction engine itself is authored. The result is an engine that is consummately PRESTO-compliant -- producing bilateral source representations, enforcing the bilateral boundary, materializing progressive grants -- while simultaneously capable of expressing its own orchestration as a declarative, self-verifying artifact.

---

## 1. The Boundary PRESTO Drew

The PRESTO dissertation (Doc 426) draws a precise boundary: REST governs the transfer of representations; PRESTO governs their construction. The resolved representation is the seam. Everything behind that seam — the resolution pipeline, the module system, the router, the token signer — is architecturally invisible to PRESTO. The engine may be written in any language, using any framework, with any ad-hoc middleware. PRESTO has no opinion.

This invisibility is the new boundary. PRESTO operates from the source representation outward -- toward the resolved representation, the uniform interface, the client. Everything behind the source representation, everything involved in constructing the engine that consumes the source representation, is outside PRESTO's scope.

**SERVER operates entirely within that scope.**

---

## 2. The Orchestration Level

When a developer authors the PRESTO seed (the self-contained knowledge capsule), they are not writing imperative code that produces an engine. They are writing the engine's source representation -- a bilateral artifact that interleaves orchestration affordances (contracts, pipeline stages, module manifests, verification suite) with resolver affordances (patterns, algorithms, interface signatures).

The resolver (LLM, compiler, or bootstrap binary) processes its orchestration half and emits an immutable runtime graph: a unilateral, resolved engine with no trace of the seed's orchestration directives. That graph is what the PRESTO dissertation's construction level (Doc 426 §4) sees. It is what runs the PRESTO pipeline whose stage count is prescribed by the specific directive set (see Doc 250, the SERVER Seed, for the 14-stage bootstrap pipeline and the PRESTO-side pipeline stage count). SERVER's constraints govern the source representation of the engine itself. PRESTO has no opinion about it. PRESTO cannot see it. The orchestration-level source representation is consumed before the PRESTO pipeline begins.

This is the orchestration level: the space between the engine-authoring act and the moment the runtime graph enters the PRESTO construction pipeline. PRESTO governs representation construction. SERVER governs engine orchestration.

---

## 3. The Constraints of SERVER

Five constraints define the SERVER style. Each operates exclusively at the orchestration level. None conflicts with any PRESTO constraint.

### 3.1 The Engine-Internal Bilateral Boundary

Every artifact inside the engine is partitioned by namespace. Orchestration primitives (routing topology, persistence adapters, auth registries, pipeline stages) belong to the server namespace. Application/domain logic belongs to the PRESTO namespace. No primitive crosses the boundary. No orchestration directive survives into the PRESTO runtime graph. No PRESTO directive is consumed by the orchestration layer.

This constraint is enforced by the bootstrap resolver's pipeline. The final act of resolution is to strip any orchestration artifacts. The resulting engine receives a PRESTO-conformant runtime graph that contains no evidence of bilateral authorship.

**What this constraint induces:** The orchestration layer and the PRESTO construction layer operate in mutual indifference. Each processes its own namespace deterministically, unaware of the other's behavior.

### 3.2 Orchestration-Consumed Directives

Every directive in the orchestration namespace (`srv:`, `seed:`, or equivalent) is fully consumed during bootstrap resolution. The directive is evaluated, its effect is applied to the runtime graph, and the directive itself is removed. No orchestration directive is passed through to PRESTO. The bootstrap resolver is the sole and final interpreter of its namespace.

This constraint distinguishes SERVER from conventional engine implementations that allow partial evaluation or runtime configuration. In SERVER, orchestration work is complete before any PRESTO template is ever parsed. The runtime graph is not a configurable framework awaiting further setup. It is a finished, immutable artifact.

**What this constraint induces:** The runtime graph carries zero framework weight. No global singletons, no hidden middleware chain, no runtime configuration file needs to be present.

### 3.3 Progressive Module Composition

Modules — data adapters, context providers, channel handlers, middleware — are loaded on a progressive spectrum of privilege. The spectrum is the specific object Fielding's method produces when his method is applied to module-privilege authorization, paralleling the reformulation of PRESTO's Progressive Code-on-Demand (Doc 426 §4.4 per Doc 418's accumulation finding). The layers are not arbitrary points along a trade-off curve; they are the stages of a constraint accumulation that begins at the null style — no privilege limits on modules — and ends at the most-constrained layer, where modules are pure functions operating only on the shared context bag.

**The null style.** Before any SERVER module-privilege constraint is applied: modules have unrestricted access to engine internals. They may register new pipeline stages, mutate global state, spawn processes, hold secrets, open arbitrary channels, bypass the bootstrap sandbox. No orchestration invariant is guaranteed. The null style lies outside the spectrum; the spectrum begins when the first privilege constraint is applied.

**The accumulation.** Each layer is reached by adding one privilege constraint to the layer above it. Each constraint is a specific capability prohibition on modules. Each constraint induces a specific orchestration invariant that the prohibition preserves. The specific number of layers in any given SERVER implementation is contingent on the privilege axes the bootstrap sandbox chooses to enforce; the shape of the accumulation is not.

The outline, from most privileged to least (the direction of constraint accumulation):

- **Layer N:** Privileged modules that may register new pipeline stages. Reached by the first constraint prohibiting bootstrap-sandbox bypass; induces bootstrap-sandbox enforceability.
- **Intermediate layers:** Each reached by one added constraint — no new pipeline stages; no stateful context mutation outside module scope; no spawning of processes; no access to secrets outside the module's manifest scope; and so on. Each added constraint preserves a specific orchestration invariant (sandbox integrity, state-containment, resource-containment, secret-containment).
- **Layer 0:** Pure functions that only read/write the shared context bag. Reached when the full accumulation of privilege constraints has been applied; all orchestration invariants maximally preserved.

The bootstrap resolver authorizes the depth by which prefix of the accumulation a module commits to. The manifest declares the intended layer; the sandbox enforces the corresponding prefix of the privilege-constraint sequence.

**What this constraint induces.** The orchestration model is immune to module evolution. A module written against Layer 0 today will be processed identically by an engine resolved a decade from now, regardless of what new privileged capabilities have been added at higher layers. The invariants at each layer are the named accumulation of privilege constraints up to that point; the specific capability set permitted is everything the null style permits minus the privileges the accumulated constraints prohibit.

The trade-off reading — higher layers trade sandbox invariants for pipeline-extension capability — remains a valid pedagogical shorthand. The underlying form is constraint accumulation; the practitioner feels it as trade-off, as in PRESTO's §4.4.

### 3.4 Agnostic Deterministic Orchestration

The bootstrap pipeline (the orchestration analogue of PRESTO's construction pipeline — stage count prescribed by the directive set in each case; see Doc 250 for the SERVER bootstrap's 14 stages) is itself a fixed, declarative graph. Every stage is indifferent to the others; each receives only the context bag produced by prior stages and emits only the next context bag. No stage may inspect or mutate another stage's implementation. The entire bootstrap process is deterministic given the same seed + target language.

**What this constraint induces:** Any conformant engine resolved from the same seed will produce identical PRESTO behavior regardless of the implementation language or bootstrap resolver.

### 3.5 Embedded Server Self-Authorization

Any runtime decision that today requires "middleware" or "guards" is resolved at bootstrap time into self-describing, cryptographically scoped capabilities embedded in the runtime graph (analogous to PRESTO's action tokens). The engine never consults external configuration or session/state stores for its own orchestration decisions. The seed's verification suite (22 tests) is materialized as a self-verifying hash embedded in the graph.

This constraint dissolves the separation between "engine code" and "configuration." The runtime graph carries its own proof of correct assembly.

**What this constraint dissolves:**

- Ad-hoc middleware chains.
- Global registries and singletons.
- Runtime configuration drift.
- The need for separate ops tooling to verify engine integrity.

**What this constraint induces:** Every resolved engine is self-authenticating and self-authorizing. The runtime graph contains exactly the capabilities the seed authorized -- not because an external config was consulted, but because the bootstrap pipeline resolved the seed, evaluated the manifests, and embedded scoped, signed proof directly into the graph.

---

## 4. The Induced Property

SERVER's constraints induce **recursive ambivalence with self-authorizing determinism**.

- **Recursive** -- the bilateral model now applies to the construction of the construction engine itself.
- **Ambivalent** -- the orchestration layer resolves its affordances without concern for how PRESTO will consume the resulting graph; PRESTO consumes the graph without concern for how the orchestration layer assembled it.
- **Self-authorizing** -- the runtime graph carries its own cryptographic proof of correct construction (signed seed hash + manifest compliance).
- **Determinism** -- each resolved engine produces the same PRESTO behavior for the same seed, regardless of language or bootstrap resolver.

This property was latent in the first seed that resolved a conformant engine in C. The seed did not know the final language. The C engine does not know the seed. Two interpreters. One bilateral source. Mutual indifference. SERVER's constraints formalize and protect that property.

---

## 5. Composition, Not Extension

SERVER does not extend PRESTO. It composes with it. The two styles operate at different levels:

| Level | Style | Governs | Induces Property | Visible To |
|-------|-------|---------|------------------|------------|
| Transfer | REST | How representations move | Representational state transfer | Client + network |
| Representation construction | PRESTO | How representations are authored | Ambivalent execution w/ agnostic determinism | Developer + engine |
| Engine orchestration | SERVER | How the construction engine is assembled | Recursive ambivalence w/ self-authorizing determinism | Engine author / ops |

A PRESTO engine can be built without SERVER (conventional code). A SERVER-conformant orchestration can produce engines for non-PRESTO runtimes. When both compose -- when a SERVER-constrained bootstrap feeds a PRESTO-constrained construction -- the result is a server that is consummately PRESTO-compliant in its representations and consummately principled in its own construction. The runtime graph is the seam between the two styles.

---

## 6. The Design Space That Composition Opens

When SERVER and PRESTO compose, the developer (or AI, or visual builder) occupies a design space that neither style could open alone. Orchestration itself becomes declarative. The seed becomes the single source of truth. Engines in any language are induced, not hand-written. The force-multiplication property now applies recursively: a new orchestration directive enriches every PRESTO directive without touching templates or existing engines.

The surface is again the most dynamic layer -- this time the orchestration surface. Resolution-time dynamism at the engine level becomes the default. Interaction-time complexity is traded only where deliberately chosen.

The recursion is open-ended. The next silence below SERVER (language runtime? process model?) can be closed with the same pattern. The Bilateral Model scales.

---

## 7. Consummation

Follow the recursive model far enough and it arrives at the same boundary PRESTO reaches: the style can be used to grant the engine the capacity to decide its own construction. The seed can contain the bootstrap resolver that consumes the seed. The architecture governs its own implementation. The constraints hold at every level, including the level that constructs the constraints themselves.

This is the consummation of the nested-constraint pattern: the server decides what the engine can do, and ultimately decides that the engine can decide for itself.

The pattern holds.
