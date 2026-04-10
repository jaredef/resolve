# Phase 14 — Executors: GetContentExecutor

**Status:** NOT STARTED
**Depends on:** Phase 7 (Expression Engine), Phase 8 (DSL Parser), Phase 11 (Hydrator), Phase 13 (Contracts)

## Objectives

Port the GetContentExecutor — the read-only pipeline that goes from parsed DSL template to rendered HTML. This is the most commonly used executor.

## Source Reference

- **PHP source:** `packages/htx-engine/src/Executors/GetContentExecutor.php` (~252 LOC)

## Files to Create

### `packages/htx-engine/src/executors/get-content-executor.ts`

**Pipeline:**
```
Parse DSL → Evaluate meta expressions → adapter.query(meta) → Hydrate template with rows → HTML
```

**Key behaviors:**
1. **DSL parsing** — call `DSLParser.parse()` on the template source
2. **Meta expression evaluation** — meta directives can contain expressions (e.g., `<htx:offset>{{ page * 10 }}</htx:offset>`), evaluate them against request context
3. **Adapter query** — call `adapter.query(meta)` to get rows
4. **Each loop rendering** — iterate over rows, render `<htx:each>` block for each row with:
   - Row data injected into scope
   - Loop metadata (`loop.index`, `loop.first`, `loop.last`, `loop.length`)
   - Expression evaluation within the block
5. **None block** — if no rows returned, render `<htx:none>` block instead
6. **Single record** — if meta has `slug` or only expects one record, render main template with single row data
7. **Error handling** — per-row errors are logged, not thrown (graceful degradation)

**Constructor dependencies:**
```typescript
class GetContentExecutor {
  constructor(
    private parser: DSLParser,
    private adapter: ContentAdapter,
    private hydrator: Hydrator,
    private expressionEngine: ExpressionEngine,
  )

  execute(templateSource: string, context: ExecutionContext): string
}

interface ExecutionContext {
  routeParams: Record<string, string>
  queryParams: Record<string, string>
  [key: string]: unknown
}
```

## Files to Create (Tests)

### `packages/htx-engine/tests/get-content-executor.test.ts`

Port from PHP `GetContentExecutorTest.php`:
- Simple single-record rendering
- List rendering with `<htx:each>`
- Empty results → `<htx:none>` block
- Loop metadata access
- Meta expression evaluation (dynamic offset)
- Where clause filtering
- Order directive
- Howmany limit
- Slug-based single record lookup
- Nested data access in templates
- Expression functions in templates
- Per-row error graceful handling
- Missing adapter data → empty/none

**Test setup:** Use InMemoryAdapter (from test helpers) with known data sets.

## Validation

- [ ] Single record rendering works
- [ ] List rendering with each blocks works
- [ ] Empty results show none block
- [ ] Loop metadata correct
- [ ] Meta expressions evaluated
- [ ] Error handling graceful
- [ ] All tests pass

## Review Comments

_Reviewed by Claude after building the complete PHP implementation._

### This is the Core Pipeline — Get It Right

The GetContentExecutor is the most-used code path. Every page load goes through it. The pipeline (Parse → Evaluate Meta → Query → Hydrate → HTML) is straightforward but the devil is in the details.

### Missing: Block Processing Logic

The plan describes a single linear pipeline, but in the PHP implementation, a template can have **multiple** `<htx:type>` blocks. The executor (or the RequestHandler — which is missing from the plan) needs to:
1. Find all DSL blocks in the template
2. Process each block independently (parse meta, query adapter, hydrate)
3. Replace each block in the template with its rendered output
4. Process blocks in **reverse order** to preserve string offsets

This reverse-order processing was a subtle but critical detail in the PHP build. When you replace a block early in the string, all subsequent block positions shift. Processing in reverse avoids this.

### InMemoryAdapter: Define It Properly

The test plan references an "InMemoryAdapter" from test helpers, but it's never formally defined anywhere in the phase plans. This should be a well-tested test utility:

```typescript
class InMemoryAdapter implements ContentAdapter {
  private store: Map<string, Record<string, unknown>[]> = new Map()
  seed(type: string, records: Record<string, unknown>[]): void
  // ... implement all 7 methods
}
```

Define it in Phase 1's test helpers directory, or add a note to Phase 13 about creating test implementations of the contracts.

### `ExecutionContext`: Needs More Fields

The interface shows `routeParams` and `queryParams`, but the PHP RequestHandler passes more context: `formData` (for POST), `method` (GET/POST), `tenantId`, `currentPath`. Expand this interface or document what gets added later.

### Error Handling: Per-Row vs Per-Query

The plan mentions "per-row errors are logged, not thrown." This is good for rendering resilience, but make sure query-level errors (e.g., adapter throws because the table doesn't exist) ARE thrown — those are not recoverable and should bubble up to a 500 error page.

## Execution Log

_(empty — not yet executed)_

## Independent review notes (2026-03)

- Mirror PHP [`GetContentExecutor`](../../hypermedia-app-php/packages/htx-engine/src/Executors/GetContentExecutor.php): **`execute` / `executeFromParsed`**, setters for route/query params, and consume **`adapter.query()` → `rows` + `total`**.

## Port review addendum (2026-03-28)

- This phase should say much more clearly that block replacement order matters. PHP's reverse-order replacement strategy is one of the easiest places for a TS port to introduce subtle rendering bugs.
- I would also make the shared execution context concrete before this phase starts; otherwise executor behavior will become the place where missing request semantics get improvised.
