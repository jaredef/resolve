# Phase 02 — Contracts And Runtime Types

**Status:** COMPLETE

## Objective

Port the core interfaces and shared runtime types before any parser, router, executor, or handler code is written.

## Source of truth

- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/src/Contracts/ContentAdapterInterface.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/src/Contracts/MiddlewareInterface.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/src/Contracts/ModuleInterface.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/src/Contracts/AuthProviderInterface.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/src/Contracts/ModuleRegistry.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/src/Runtime/Router.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/src/Security/ReplayGuardInterface.php`

## Target TS files

- `hypermedia-app-ts/packages/htx-engine/src/contracts/content-adapter.ts`
- `hypermedia-app-ts/packages/htx-engine/src/contracts/middleware.ts`
- `hypermedia-app-ts/packages/htx-engine/src/contracts/module.ts`
- `hypermedia-app-ts/packages/htx-engine/src/contracts/auth-provider.ts`
- `hypermedia-app-ts/packages/htx-engine/src/contracts/module-registry.ts`
- `hypermedia-app-ts/packages/htx-engine/src/runtime/types.ts`
- `hypermedia-app-ts/packages/htx-engine/src/parser/types.ts`
- `hypermedia-app-ts/packages/htx-engine/src/security/types.ts`
- `hypermedia-app-ts/packages/htx-engine/src/index.ts`

## Implementation steps

1. Define `QueryMeta` to preserve PHP semantics: `type`, `slug`, `where` as `string`, `order`, `howmany`, `offset`, and `fields`.
2. Define `QueryResult` as `{ rows: Record<string, unknown>[]; total: number }`.
3. Define `ContentAdapter` methods matching PHP behavior and argument ordering.
4. Define `HtxRequest`, `HtxResponse`, `RouteMatch`, and `ExecutionContext` for shared runtime use.
5. Define replay guard and token payload types used by security and mutation executors.
6. Define parsed block types reused by parser, executors, and handler so later phases do not invent local shapes.
7. Export everything through stable engine barrels.

## Acceptance gates

- `query()` returns `{ rows, total }` everywhere in the type system.
- `where` remains a string, not a structured object.
- Route and parsed-block types are shared imports, not duplicated interfaces.
- Future phases can reference one canonical `ExecutionContext`.

## Tests to port

- Minimal contract shape tests for compile-time usage.
- No PHP behavior tests beyond matching the documented interface signatures.

## Known risks

- Letting DSL parser or SQLite adapter redefine `QueryMeta`
- Creating multiple `HtxResponse` shapes in runtime and executors
- Hiding async/security uncertainty instead of expressing it in shared types

## Execution log

- [x] Contracts ported
- [x] Runtime shared types ported
- [x] Parser block/result types added
- [x] Security shared types added
- [x] Public exports stabilized
- [x] Bun contract test execution complete
