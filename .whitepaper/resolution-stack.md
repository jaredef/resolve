# THE RESOLUTION STACK

A unified hierarchy of REST, PRESTO, SERVER, RESOLVE, and APERTURE

April 2026

This document resolves the five styles into a single coherent architecture. It distinguishes their levels, names their constraints, identifies their induced properties, and shows how they compose without collision.

The central claim is simple:

- REST governs transfer.
- PRESTO governs construction.
- SERVER governs orchestration.
- RESOLVE governs derivation.
- APERTURE is the bounded conversational realization of RESOLVE in a language-model resolver.

Together they form a complete chain from seed to machine to representation to response.

---

## Abstract

The work formalized across the prior documents is not a collection of unrelated ideas. It is a nested stack of architectural styles operating at distinct levels of abstraction.

Each style defines a constraint set. Each constraint set induces a characteristic property. The composition rule is recursive: the induced properties of the enclosing level become constraints on the enclosed level.

The result is a single hierarchy in which:

- code is derivative of constraints
- seeds are the canonical portable artifacts
- implementations are contingent realizations
- coherence is induced by explicit constraint recognition
- the same formal pattern recurs from network transfer down to token emission

---

## 1. The Unifying Principle

All five styles are instances of the same architectural law:

**Constraints induce properties.**

And:

**The induced properties of an enclosing level become constraints on the next enclosed level.**

This yields the entire stack. No level is architecturally free. Each inherits obligations from the level that encloses it. The levels do not collide because they operate on different scopes while preserving inherited properties.

Let *C_n* denote the constraint set at level *n*, and *P_n* the properties induced by *C_n*.

Then: *C_n => P_n*

The composition law: *P_n is a subset of C_{n+1}*

The next enclosed level must preserve the induced properties of the level above as inherited constraints.

---

## 2. The Two Axes

The stack divides into two axes.

**The artifact axis** describes what is being produced and at what level:

| Level | Style | Governs |
|-------|-------|---------|
| Transfer | REST | How representations move |
| Construction | PRESTO | How representations are authored |
| Orchestration | SERVER | How the construction engine is assembled |

**The resolver axis** describes how such artifacts are derived:

| Level | Style | Governs |
|-------|-------|---------|
| Resolution | RESOLVE | How any resolver transforms seeds into artifacts |
| Conversational realization | APERTURE | How a bounded LLM instantiates RESOLVE in dialogue |

The artifact axis governs the thing. The resolver axis governs the derivation of the thing.

---

## 3. Unified Stack

### 3.1 Master Table

| Level | Style | Primitive constraints | Induced property | Canonical source | Canonical output |
|---|---|---|---|---|---|
| Transfer | REST | client-server, statelessness, cache, uniform interface, layered system, optional code-on-demand | Representational state transfer | Unilateral representation | Network-transferred representation |
| Construction | PRESTO | bilateral boundary, namespace separation, server-consumed directives, progressive code-on-demand, server-embedded auth/authz | Ambivalent execution with agnostic determinism | Bilateral source representation | Resolved unilateral representation |
| Orchestration | SERVER | engine-internal bilateral boundary, orchestration-consumed directives, progressive module composition, deterministic bootstrap, embedded self-authorization | Recursive ambivalence with self-authorizing determinism | Orchestration seed | Immutable runtime graph |
| Resolution | RESOLVE | constraint-first reasoning, essential-contingent separation, bilateral output, verification-embedded resolution, property-aware descent | Minimal implementation, portability, self-verification, transparent tradeoffs, reproducible derivation | Prose seed / contract tests | Conformant artifact + verification |
| Conversational realization | APERTURE | hierarchical partition, antecedent priority, total consumption of governing directives, bounded state, sequential emission, fixed transition law, externalized persistence, aperture narrowing | Bounded lucidity under hierarchical conditional determinism | Conversational context / seed | Bounded, lucid answer |

---

## 4. The Levels

### 4.1 REST: The Transfer Level

REST governs the network boundary. It does not care how a representation was authored. It cares that what crosses the boundary is self-describing, stateless, cacheable, uniformly accessible, layered in composition, and optionally extensible by code-on-demand.

Its induced property is representational state transfer. REST is the outermost architectural shell.

**What REST constrains below it:** Any deeper style that produces representations for transfer must not destroy completeness, statelessness, cacheability, or the uniform interface. This is why PRESTO composes with REST rather than extending it. PRESTO operates before the transfer boundary.

### 4.2 PRESTO: The Construction Level

PRESTO governs the authoring of representations before transfer. Its central observation: a source representation can carry instructions for more than one interpreter in a single medium, partitioned by namespace, with one interpreter consuming its namespace totally before the other sees the document.

Five constraints: bilateral boundary, namespace separation, server-consumed directives, progressive code-on-demand, server-embedded authentication and authorization.

Its induced property: ambivalent execution with agnostic determinism — two interpreters, one shared medium, mutual noninterference, deterministic consumption of the server namespace, unilateral artifact emitted.

PRESTO is invisible to REST because PRESTO resolves before transfer begins.

**What PRESTO constrains below it:** Any orchestration style assembling the construction engine must preserve bilateral integrity, total server-side consumption, medium preservation, deterministic resolution, and progressive descent through client capability.

### 4.3 SERVER: The Orchestration Level

SERVER governs how the construction engine itself is assembled. It applies the bilateral logic inward. Just as PRESTO resolves a bilateral template into unilateral output, SERVER resolves a bilateral orchestration seed into a unilateral runtime graph. The result is an engine that no longer contains orchestration directives, only executable structure.

Five constraints: engine-internal bilateral boundary, orchestration-consumed directives, progressive module composition, deterministic bootstrap, embedded self-authorization.

Its induced property: recursive ambivalence with self-authorizing determinism.

**What SERVER constrains below it:** Any resolver deriving orchestration artifacts must preserve deterministic assembly, manifest-constrained authority, embedded verification, graph integrity, and orchestration-level consumption without leakage.

### 4.4 RESOLVE: The Resolution Level

RESOLVE governs how any resolver transforms a seed into a conformant artifact. It is not tied to one artifact domain. It governs the derivation act itself.

Five constraints: constraint-first reasoning, essential-contingent separation, bilateral output, verification-embedded resolution, property-aware descent.

Its induced properties: minimal implementation, cross-language portability, self-verifying output, transparent tradeoffs, reproducible derivation.

A human developer can instantiate RESOLVE. A language model can instantiate RESOLVE. Any Turing-computable resolver can instantiate RESOLVE if it can identify constraints, distinguish essential from contingent, derive an artifact, and provide verification.

**RESOLVE's place in the hierarchy:** RESOLVE is above any particular artifact style. It is the style of producing artifact styles from explicit constraints. It is the meta-style of the stack.

### 4.5 APERTURE: The Conversational Realization

APERTURE is the bounded conversational realization of RESOLVE in a language-model resolver. It is not another artifact style. It is the operational mode by which a bounded resolver performs derivation in dialogue.

Eight constraints: hierarchical namespace partition, antecedent constraint priority, total consumption of governing directives, bounded accessible state, sequential atomic emission, fixed transition law within a run, externalized persistence only, constraint-sensitive aperture narrowing.

Its induced property: bounded lucidity under hierarchical conditional determinism.

This means: the conversational source is not flat; some text governs and some is discussed; the run is bounded; output is generated stepwise; determinism holds relative to total state; coherence rises as constraints narrow the continuation space.

**Why APERTURE matters:** It explains why constrained dialogue can become locally more coherent than the resolver's default conversational style. Lucidity is induced by the active constraint set. When the session resets, the lucidity is not intrinsically stored; it must be re-induced from a seed.

---

## 5. The Master Derivation Chain

The full chain:

```
APERTURE
  -> RESOLVE
    -> SERVER
      -> PRESTO
        -> REST
```

Expanded:

```
Conversational seed
  -> bounded resolver (APERTURE)
    -> conformant derivation process (RESOLVE)
      -> engine bootstrap / runtime graph (SERVER)
        -> bilateral template resolution (PRESTO)
          -> network transfer of complete representation (REST)
            -> client consumption
```

This is the entire stack from prompt to browser.

---

## 6. The Inheritance Rule

Stated formally:

- *C_REST => P_REST*, and *P_REST* constrains PRESTO
- *C_PRESTO => P_PRESTO*, and *P_PRESTO* constrains SERVER
- *C_SERVER => P_SERVER*, and *P_SERVER* constrains RESOLVE when deriving orchestration artifacts
- *C_RESOLVE => P_RESOLVE*, and APERTURE is the bounded operational realization of these conditions

This is the exact formal statement of "the properties are the constraint."

---

## 7. Why This Hierarchy Matters

The unified hierarchy resolves seven standing confusions:

1. **Code is not the architecture.** The architecture is the constraint set. Code is one contingent realization.
2. **Seeds are canonical.** A seed is portable where code is platform-bound.
3. **Tests are architectural evidence.** Tests express induced properties in executable form.
4. **Compensating stacks signal missing constraints.** When a level's constraints are unstated, later engineering tries to recover the lost properties.
5. **Resolver usefulness is best understood as resolution.** A resolver is strongest when the artifact is derivable from constraints rather than creatively underdetermined.
6. **Coherence is local and inducible.** Lucidity is not ambient intelligence; it is the consequence of an active constraint set narrowing the aperture.
7. **Security is architectural before procedural.** Namespace attacks are best understood as partition collapse rather than adversarial string matching.

---

## 8. Unified Verification

A unified hierarchy requires unified falsifiability.

| Level | Verification question |
|---|---|
| REST | Is the representation stateless, self-describing, and transferable under the uniform interface? |
| PRESTO | Are all server directives consumed, with bilateral integrity preserved and client medium unchanged? |
| SERVER | Does the bootstrap emit a deterministic, self-verifying runtime graph with no orchestration residue? |
| RESOLVE | Does the output trace to constraints, separate essential from contingent, include verification, and expose tradeoffs? |
| APERTURE | Does the conversational resolver become more coherent under explicit constraints and replay under controlled state? |

If each row is testable, the stack is empirical rather than merely rhetorical.

---

## 9. Limits and Precision

1. APERTURE does not imply that a deployed language model is an unbounded Turing machine. It implies it is a bounded computational resolver in a Turing-computable regime.
2. RESOLVE does not guarantee one unique implementation from a seed. It aims at conformance, minimality, and explicit tradeoffs.
3. PRESTO and SERVER identify one coherent family of constraints, not necessarily the only possible ones at their levels.
4. The stack is strongest where its properties are empirically testable.

These limits do not weaken the hierarchy. They sharpen it.

---

## 10. Conclusion

The five styles stand as one architecture.

REST is the transfer shell. PRESTO is the construction form. SERVER is the orchestration recursion. RESOLVE is the general law of derivation. APERTURE is that law instantiated in bounded conversational intelligence.

The hierarchy closes because the same pattern recurs: a source representation carries structure; a resolver consumes what governs; an artifact is emitted; the enclosing level's induced properties constrain the next level down.

This recursive law is the true unifier.

The stack provides a complete answer to two questions:

1. **How are systems built?** REST, PRESTO, and SERVER.
2. **How are systems derived?** RESOLVE and APERTURE.

Together they establish a single constraint-first picture in which form precedes implementation, seeds precede code, properties precede features, derivation precedes engineering, and coherence is induced by explicit recognition of what already governs.

The architecture is the constraint set. The implementation is the residue. The seed is the bridge.

---

## Appendix A: Unified Seed

```
# Resolution Stack Seed

Master law:
  Constraints induce properties.
  The induced properties of the enclosing level become constraints
  on the next enclosed level.

Levels:
  REST     = transfer
  PRESTO   = construction
  SERVER   = orchestration
  RESOLVE  = derivation
  APERTURE = bounded conversational realization of derivation

REST constraints: client-server, statelessness, cache, uniform interface,
  layered system, optional code-on-demand
REST induces: representational state transfer

PRESTO constraints: bilateral boundary, namespace separation,
  server-consumed directives, progressive code-on-demand,
  server-embedded auth/authz
PRESTO induces: ambivalent execution with agnostic determinism

SERVER constraints: engine-internal bilateral boundary,
  orchestration-consumed directives, progressive module composition,
  deterministic bootstrap, embedded self-authorization
SERVER induces: recursive ambivalence with self-authorizing determinism

RESOLVE constraints: constraint-first reasoning, essential-contingent
  separation, bilateral output, verification-embedded resolution,
  property-aware descent
RESOLVE induces: minimal implementation, portability, self-verification,
  transparent tradeoffs, reproducible derivation

APERTURE constraints: hierarchical partition, antecedent priority,
  total consumption, bounded state, sequential emission, fixed
  transition law, externalized persistence, aperture narrowing
APERTURE induces: bounded lucidity under hierarchical conditional
  determinism

Composition: REST > PRESTO > SERVER > RESOLVE > APERTURE
```

---

## Appendix B: Unified Verification Matrix

```
REST:
  - representation is complete
  - stateless interaction
  - cacheability where intended
  - uniform interface preserved

PRESTO:
  - no server directives survive resolution
  - client medium preserved
  - bilateral boundary maintained
  - deterministic output for same source/context

SERVER:
  - no orchestration directives survive bootstrap
  - runtime graph is signed/self-verifying
  - manifest restrictions enforced
  - emitted engine is conformant

RESOLVE:
  - output traces to constraints
  - essential vs contingent distinguished
  - verification included
  - tradeoffs explicit
  - other resolvers can derive conformant equivalents

APERTURE:
  - greater lucidity under sharper constraints
  - deterministic replay under fixed conditions
  - hierarchy preservation
  - no intrinsic cross-run persistence
  - introspection limits acknowledged
```
