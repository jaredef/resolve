# Async ContentAdapter: MaybePromise Interface

**Status:** COMPLETE
**GitHub Issue:** hypermediacms/hypermedia-app#31
**Objective:** Change all ContentAdapter method return types to MaybePromise<T>, enabling remote database adapters (Convex, Turso, etc.)

## Phases

### Phase 1: Interface + Adapter Implementations
**Status:** COMPLETE
**Plan:** `.plans/aa-phase-1-interface-adapters.md`
- Change ContentAdapter interface return types to MaybePromise<T>
- Update SQLiteAdapter, MarkdownAdapter, InMemoryAdapter (test helper)
- Sync adapters continue returning plain values (satisfies MaybePromise<T>)

### Phase 2: Executors + Request Handler
**Status:** COMPLETE
**Plan:** `.plans/aa-phase-2-executors-handler.md`
- Add await to all adapter calls in GetContentExecutor (make execute/executeFromParsed async)
- Add await to adapter calls in SetContentExecutor and DeleteContentExecutor
- Update RequestHandler processBlocks() and prepareMutationBlock() to await async flows

### Phase 3: Tests + Validation
**Status:** COMPLETE
**Plan:** `.plans/aa-phase-3-tests-validation.md`
- Update get-content-executor tests (await executor.execute() calls)
- Update mutation-executors tests (ReadOnlyAdapter async)
- Add async adapter mock test
- Full test suite pass, TypeScript compilation clean
