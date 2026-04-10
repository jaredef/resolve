# Phase 1: htx:rel Core Implementation

**Status:** COMPLETE
**Parent:** htx-rel-plan.md

## Files to Modify

1. `packages/htx-engine/src/executors/get-content-executor.ts`
   - `renderNestedBlocks()` — skip blocks with `meta.rel`
   - `hydrateWithData()` — make async, call resolveRelationalBlocks per row
   - New: `resolveRelationalBlocks(template, parentRow, context)`
   - New: `resolveRelDirective(meta, parentRow)`

2. `packages/htx-engine/src/runtime/request-handler.ts`
   - `stripMetaDirectives()` — add `rel` to the directives list

3. `packages/htx-engine/tests/get-content-executor.test.ts`
   - Test: single-level parent → child relation
   - Test: multi-level grandparent → parent → child
   - Test: mixed relational + independent blocks
   - Test: backward compatibility (all existing tests pass)

## Execution Log
- [x] renderNestedBlocks() skips blocks with meta.rel
- [x] New findEachBlocks() balanced matcher replaces regex for htx:each (handles nested tags correctly)
- [x] New resolveRelationalBlocks() resolves rel blocks per-row with parent data
- [x] New resolveRelDirective() parses field=parent.field syntax, merges into WHERE
- [x] hydrateWithData() made async, calls resolveRelationalBlocks per row in each loop
- [x] stripMetaDirectives updated with "rel" directive
- [x] Test: single-level parent→child relation (author→posts)
- [x] Test: multi-level nesting (category→posts→comments)
- [x] Test: mixed relational + independent blocks on same page
- [x] All 78 tests pass, 0 fail, TypeScript clean
