# Phase 13 — Contracts & Interfaces

**Status:** NOT STARTED
**Depends on:** Phase 1 (scaffolding)

## Objectives

Port all contract interfaces to TypeScript. These define the plugin boundaries — any adapter, middleware, or module just implements these interfaces.

## Source Reference

- **PHP source:** `packages/htx-engine/src/Contracts/ContentAdapterInterface.php` (~100 LOC)
- **PHP source:** `packages/htx-engine/src/Contracts/MiddlewareInterface.php`
- **PHP source:** `packages/htx-engine/src/Contracts/AuthProviderInterface.php`
- **PHP source:** `packages/htx-engine/src/Contracts/ModuleInterface.php`
- **PHP source:** `packages/htx-engine/src/Contracts/ModuleRegistry.php`

## Files to Create

### `packages/htx-engine/src/contracts/content-adapter.ts`

The central abstraction — 7 methods:

```typescript
interface ContentAdapter {
  query(meta: QueryMeta): Record<string, unknown>[]
  find(type: string, id: string | number): Record<string, unknown> | null
  findBySlug(type: string, slug: string): Record<string, unknown> | null
  create(type: string, data: Record<string, unknown>): Record<string, unknown>
  update(type: string, id: string | number, data: Record<string, unknown>): Record<string, unknown>
  delete(type: string, id: string | number): void
  schema(type: string): SchemaDefinition | null
}

interface QueryMeta {
  type: string
  where?: Record<string, unknown>
  order?: string
  howmany?: number
  offset?: number
  slug?: string
}

interface SchemaDefinition {
  fields: Record<string, FieldDefinition>
}

interface FieldDefinition {
  type: string
  required?: boolean
  // ... other field constraints
}
```

### `packages/htx-engine/src/contracts/middleware.ts`

```typescript
interface HtxRequest {
  method: string
  path: string
  params: Record<string, string>
  query: Record<string, string>
  body?: Record<string, unknown>
  headers: Record<string, string>
}

type NextFunction = (request: HtxRequest) => HtxResponse

interface Middleware {
  handle(request: HtxRequest, next: NextFunction): HtxResponse
}
```

### `packages/htx-engine/src/contracts/auth-provider.ts`

```typescript
interface AuthProvider {
  authenticate(request: HtxRequest): AuthUser | null
  authorize(user: AuthUser, action: string, resource: string): boolean
}

interface AuthUser {
  id: string | number
  [key: string]: unknown
}
```

### `packages/htx-engine/src/contracts/module.ts`

```typescript
interface Module {
  name: string
  boot(registry: ModuleRegistry): void
}
```

### `packages/htx-engine/src/contracts/module-registry.ts`

```typescript
class ModuleRegistry {
  registerFunction(name: string, fn: ExpressionFunction): void
  registerMiddleware(middleware: Middleware): void
  registerAdapter(name: string, adapter: ContentAdapter): void
}
```

### Barrel export — `packages/htx-engine/src/contracts/index.ts`

## Files to Create (Tests)

### `packages/htx-engine/tests/contracts.test.ts`

Minimal tests — mostly type-level verification:
- InMemoryAdapter (test helper) implements ContentAdapter correctly
- ModuleRegistry registers and retrieves functions/middleware/adapters
- Type compatibility checks (TypeScript compiler handles most of this)

## Validation

- [ ] All interfaces defined and exported
- [ ] TypeScript compiler validates implementations
- [ ] ModuleRegistry works for registration/retrieval
- [ ] Interfaces match PHP contract semantics

## Review Comments

_Reviewed by Claude after building the complete PHP implementation._

### This Phase Should Be Phase 2 (or 3)

Contracts define the boundaries that everything else depends on. `ContentAdapter`, `QueryMeta`, `HtxRequest`, `HtxResponse`, and `Middleware` are referenced across Phases 8-17. By putting contracts at Phase 13, every earlier phase either: (a) defines ad-hoc types that get replaced later, or (b) uses `any`/`unknown` as a placeholder. Moving this to Phase 2 or 3 means every subsequent phase can import the real interfaces from day one.

### `ContentAdapter.query()` Return Type

The interface shows `query(meta: QueryMeta): Record<string, unknown>[]` — returning just the rows. Consider whether a richer return type is needed:

```typescript
interface QueryResult {
  rows: Record<string, unknown>[]
  total?: number  // total count before limit/offset (for pagination)
}
```

The PHP version returns just the array, and pagination in the dogfood app was done with separate count queries. A `total` field would save a round-trip. This is an intentional improvement over PHP, not a parity concern.

### `ModuleRegistry` as a Class, Not Interface

The plan defines `ModuleRegistry` as a concrete class rather than an interface. This limits extensibility — what if someone wants a custom registry? Make it an interface with a default implementation:

```typescript
interface ModuleRegistry {
  registerFunction(name: string, fn: ExpressionFunction): void
  registerMiddleware(middleware: Middleware): void
  registerAdapter(name: string, adapter: ContentAdapter): void
}

class DefaultModuleRegistry implements ModuleRegistry { ... }
```

### Missing: `ExecutionContext` Interface

The executors (Phases 14-15) reference an `ExecutionContext` interface that contains `routeParams`, `queryParams`, and other request context. This should be defined here in Contracts, not ad-hoc in the executor files.

### `HtxRequest`: Align with Web Standards

The `HtxRequest` interface is a custom object. Consider aligning it with the Web `Request` standard (which Bun supports natively) instead of inventing a new shape. You could have a thin wrapper:

```typescript
interface HtxRequest {
  raw: Request           // the original Web Request
  params: Record<string, string>   // route params
  query: Record<string, string>    // parsed query string
}
```

This way, middleware can access the full Web Request while HTX code uses the simplified interface.

## Execution Log

_(empty — not yet executed)_

## Independent review notes (2026-03)

- **Must match PHP:** `ContentAdapter.query(meta)` returns **`{ rows: Record<string, unknown>[]; total: number }`**, not a bare array. **`QueryMeta.where`** should be **`string | undefined`** (comma-separated), aligned with [`ContentAdapterInterface`](../../hypermedia-app-php/packages/htx-engine/src/Contracts/ContentAdapterInterface.php). Add **`ExecutionContext`** (or equivalent) here if executors and handler share it.

## Port review addendum (2026-03-28)

- This is the most important phase to fix before implementation begins. As written, it arrives too late and has too much power to invalidate earlier work.
- I would move this near the top of the plan and require every interface snippet in this file to be checked line-by-line against PHP before any dependent phase is started.
