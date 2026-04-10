# Prompt Tree Architecture

**April 2026**

## The Observation

A flat sequence of language-agnostic prompts works for some languages (Go: one-shot success) but fails for others (Elixir: scaffolding consumed the context). The prompt architecture should mirror the specification architecture: abstract at the top, progressively specific as you descend.

## The Tree

```
PRESTO Seed (universal, ~1800 words)
  │
  ├── Contracts + Rationale (language-agnostic)
  │
  └── Language Family Branches
        │
        ├── Compiled Imperative (Go, Rust, C, Zig)
        │     Pattern: structs + interfaces/traits + explicit memory
        │     HTTP: standard library
        │     Concurrency: goroutines / threads / async
        │     One-shot prompt viability: HIGH (compact code, minimal setup)
        │
        ├── Functional (Elixir, Haskell, Clojure, OCaml)
        │     Pattern: modules + behaviours/typeclasses + pattern matching
        │     HTTP: Plug/Cowboy, Warp, Ring
        │     Concurrency: actor model / immutable by default
        │     One-shot prompt viability: LOW (verbose setup, paradigm translation needed)
        │     Recommended: phased prompts with language-specific idiom guidance
        │
        ├── Dynamic OOP (TypeScript, Python, Ruby, PHP)
        │     Pattern: classes + interfaces/protocols + async/await
        │     HTTP: framework-dependent
        │     Concurrency: event loop / GIL / threads
        │     One-shot prompt viability: MEDIUM (familiar patterns, some setup)
        │
        └── Systems (Rust, C++)
              Pattern: traits/templates + ownership/RAII + zero-cost abstractions
              HTTP: library-dependent
              Concurrency: ownership-based thread safety
              One-shot prompt viability: LOW (borrow checker, verbose error handling)
              Recommended: phased prompts with ownership guidance
```

## The Principle

The prompts form the same hierarchy as the specification:

| Spec Layer | Prompt Layer |
|-----------|-------------|
| Style (PRESTO) | Seed (universal rationale + contracts) |
| Specification (htxlang) | Algorithm pseudocode (language-agnostic) |
| Reference Profile | Language family patterns (how contracts map to paradigm) |
| Implementation Spec | Language-specific idioms (exact syntax guidance) |

At the root: abstract constraints. At the leaves: idiomatic code patterns. The agent descends from abstract to specific, guided by the tree.

## Phased Prompts per Language Family

### Functional Languages (Elixir, Haskell)

Phase 1: Types + Behaviours
- Define behaviours (interfaces) for ContentAdapter, Module, Middleware, ContextProvider, ChannelHandler
- Define structs for RouteMatch, DataContext, QueryOpts
- Show how PRESTO contracts map to functional patterns

Phase 2: Pure Functions (no state)
- Router (pattern matching on path segments)
- IncludeResolver (recursive, pipe-based)
- ExpressionEngine (Regex + String operations)
- ControlFlow (recursive enumeration)
- LayoutResolver (directory walking)
- AuthConditionals (pattern matching)

Phase 3: Stateful Components
- TokenService (HMAC signing, stateless functions)
- GrantResolver (provider registry)
- MutationHandler (token generation + verification)
- SQLiteAdapter (database queries)

Phase 4: Server + Integration
- ModuleRegistry (GenServer in Elixir, MVar in Haskell)
- ChannelMiddleware (Plug pipeline)
- Pipeline (the 22-stage composition)
- HTTP server + routing

Phase 5: Templates + Tests
- Demo templates
- 22 verification tests

### Compiled Imperative (Go, Rust)

One-shot works for Go. Rust may need phases due to ownership:

Phase 1: Types + traits
Phase 2: Pure components (no lifetimes)
Phase 3: Stateful components (Arc<Mutex<...>>)
Phase 4: HTTP server + wiring
Phase 5: Tests

## Empirical Finding: Two Phases Suffice

The 17-prompt phased approach (agent-prompt-suite.md) was designed as documentation of what needs to be built. In practice, two phases suffice for every language tested:

**Phase 0 (language-specific):** Initialize the project, install dependencies, create directory structure. This is the only language-specific phase.

**Phase 1 (universal seed):** "Read PRESTO-SPEC.md. Build the engine." The seed is the sole input. The agent derives everything from the specification.

**Evidence:**

| Language | Approach | Result |
|----------|----------|--------|
| Go | One-shot seed (no setup needed) | 22/22 pass |
| Elixir | One-shot failed (setup consumed context) | Scaffolding only |
| Elixir | Pre-scaffolded + focused seed prompt | 22/22 pass |

The seed works when the agent can focus on implementation rather than scaffolding. Languages with heavy project setup (Mix, Cargo, Maven) need Phase 0. Languages with minimal setup (Go, Python) can skip it.

The 17-prompt suite remains valuable as a reference for what the engine must contain, but as an execution strategy, 2 phases beats 17 for every language tested. The seed is dense enough to guide a single implementation pass.

**Implication:** The prompt tree simplifies to:

```
Phase 0: Language-specific setup (optional, skip for minimal-setup languages)
Phase 1: Universal seed → complete engine
```

The tree's branching is in the setup, not the implementation. The implementation is universal.

## The Meta-Property

The prompt tree is the bilateral model applied to prompt engineering.

The seed is the source representation: it carries both the universal constraints (server affordances) and the language-specific potential (client affordances). The language branch is the resolution: it consumes the abstract constraints and produces language-specific guidance. The agent executes the resolution, producing idiomatic code.

The developer (prompt author) writes the bilateral form. The agent (LLM) resolves it. The working engine is the resolved representation. Same pattern, different medium.
