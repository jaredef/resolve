# Phase 1: Interface + Adapter Implementations

**Status:** COMPLETE
**Parent:** async-adapter-plan.md

## Objective
Change ContentAdapter interface to return MaybePromise<T> on all methods. Update all adapter implementations to match.

## Files to Modify

1. `packages/htx-engine/src/contracts/content-adapter.ts`
   - Import MaybePromise from runtime/types
   - Change all 7 method return types to MaybePromise<T>

2. `packages/htx-adapter-sqlite/src/sqlite-adapter.ts`
   - No functional changes needed — sync return values satisfy MaybePromise<T>
   - Verify TypeScript compiles cleanly

3. `packages/htx-adapter-markdown/src/markdown-adapter.ts`
   - Same as SQLite — verify compilation

4. `packages/htx-engine/tests/helpers/in-memory-adapter.ts`
   - Same as above — verify compilation

## Validation
- [x] TypeScript compiles with no errors
- [x] All 75 engine tests pass, 0 fail

## Execution Log
- Changed ContentAdapter interface: all 7 methods return MaybePromise<T>
- Existing adapters unchanged — sync values satisfy MaybePromise<T>
- Executors updated: GetContent (async execute/executeFromParsed/renderNestedBlocks), SetContent (await create/update), DeleteContent (await find/delete)
- RequestHandler: processBlocks uses runStageAsync for content queries, prepareMutationBlock awaits adapter.find()
- Tests: all get-content-executor tests made async, throw tests use rejects.toThrow()
- All phases executed in single coordinated pass
