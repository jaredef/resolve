# HTX TypeScript port viability review

**Status:** Planning feedback  
**Date:** 2026-03-28  
**Scope:** Whole-project assessment after reviewing `hypermedia-app-php` and every current plan in `hypermedia-app-ts/.plans/`.

---

## Verdict

The port is **highly viable**.

The PHP codebase is not vague framework code; it is a fairly well-bounded specification with a clear request pipeline, a testable expression engine, explicit adapter contracts, and a concrete reference adapter. Bun is also a strong runtime fit for the project's stated goals.

The main risk is **not technical feasibility**. The main risk is **planning drift**: implementing a TypeScript version that looks structurally similar while changing the contracts, block model, router behavior, or mutation flow in small ways that accumulate into incompatibility.

---

## What Must Change First

1. Add a dedicated `RequestHandler` phase.
2. Move contracts near the start of the project.
3. Lock PHP parity for `ContentAdapter`, `Router`, `GetContentExecutor`, `SetContentExecutor`, and the SQLite adapter before implementation.
4. Decide whether JWT handling makes the top-level request path async.
5. Treat `ts-port-synthesis.md` as the canonical planning guardrail, not just an advisory note.

---

## Biggest Planning Gaps

### 1. Missing orchestration phase

The PHP implementation is held together by `RequestHandler`. That is where routing, include expansion, component resolution, let bindings, DSL parsing, executors, expressions, hydration, layout wrapping, and response production become one system. Without a first-class plan for that layer, the later phases are under-specified.

### 2. Contracts arrive too late

Several plans depend on request/response types, query metadata, adapter return shapes, and execution context semantics before the contracts phase currently appears. That invites temporary types that later become permanent drift.

### 3. Too many "probably the same" assumptions

The current plans sometimes assume parity on details that should be verified directly from PHP, especially:

- DSL block shape and multi-block replacement behavior
- Router/template resolution model
- SQLite schema and query semantics
- Exact mutation token field names and request payload normalization

### 4. Sync-first promise is unresolved

The project wants a synchronous core, but the current JWT plan still leaves open whether request handling becomes async. That decision should be made deliberately, early, and once.

---

## Recommended Working Rules

- Use the PHP codebase as the specification until a difference is declared intentional in writing.
- Add a short parity checklist to every phase doc before implementation begins.
- Do not introduce "nice to have" TypeScript improvements into core phases until PHP parity is passing.
- Prefer one authoritative type or contract definition over repeated snippets spread across phase docs.

---

## Suggested Execution Order

1. Scaffolding
2. Contracts
3. Utilities
4. Expressions
5. DSL parser
6. Router
7. Resolvers
8. Hydrator
9. Security
10. Get executor
11. Mutation executors
12. RequestHandler
13. SQLite adapter
14. CLI
15. Integration parity

This does not require rewriting every current plan, but it does require updating dependencies and completion criteria so the work follows the real runtime shape.

---

## Final Take

If the team stays disciplined about **PHP parity first, TypeScript ergonomics second**, this project should succeed.

If the team treats the port as an opportunity to quietly redesign contracts and execution flow while also changing language and runtime, it will almost certainly slow down and lose confidence halfway through.
