# Phase D — Document Intentional Deviations

**Status:** COMPLETE
**Depends on:** Phases A, B, C

## Objectives

Update documentation to reflect the final state. Document every intentional deviation from PHP behavior. Update the parity matrix.

## Files to Update

### `.plans/ACTIONABLE/ts-port-parity-matrix.md`

Add a new section: **Resolved Parity Gaps (from completion audit)**

| Gap | Resolution |
|-----|-----------|
| Per-row error tolerance | Fixed in Phase A — matches PHP |
| Layout file read errors | Fixed in Phase A — matches PHP |
| Error logging | Fixed in Phase A — matches PHP |
| Router param validation | Fixed in Phase B — matches PHP |
| Circular include messages | Fixed in Phase B — matches PHP |
| Consumer install test | Fixed in Phase C |
| UTC timestamps | Intentional deviation — documented |
| Expression eval in recordId | Intentional improvement — documented |
| Path traversal protection | Intentional improvement — documented |
| Async mutation boundary | Architectural necessity — documented |

### `packages/htx-engine/README.md`

Add section: **Differences from PHP HTX**

Brief, factual list:
1. Timestamps are UTC (PHP used server timezone)
2. Mutation executors are async (JWT library requires it)
3. Router has explicit path traversal protection
4. Expression evaluation works in `meta.recordId` values
5. Runs on Bun, not PHP — `Bun.serve()` replaces `php -S`

### Update ts-port-master-plan.md

Add a final entry to the execution log noting the completion audit and Phase A-E work.

## Validation

- [ ] Parity matrix reflects actual state
- [ ] README lists all deviations
- [ ] No undocumented behavioral differences remain

## Execution Log

- [x] Parity matrix updated with "Resolved Parity Gaps" table (10 items, all resolved)
- [x] Engine README updated with "Differences from PHP HTX" section (4 documented deviations)
- [x] Master plan execution log updated with Phase A-D entries and final metrics
