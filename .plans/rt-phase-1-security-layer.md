# Phase 1: ActionTokenService + ReplayGuard

**Status:** COMPLETE
**Master Plan:** remove-tenant-id-plan.md
**Completed:** 2026-03-30
**Commit:** a1b2fa6

## Objectives

Remove tenant_id from the core security interfaces:
1. ActionTokenService — remove from issue() and validate() signatures, remove from JWT claims
2. InMemoryReplayGuard — remove tenant_id from markUsed() storage
3. ReplayGuard interface (types.ts) — remove tenant_id parameter

## Files to Modify

- packages/htx-engine/src/security/action-token-service.ts
- packages/htx-engine/src/security/in-memory-replay-guard.ts
- packages/htx-engine/src/security/types.ts

## Execution Log

All 4 phases (security layer, executors, runtime/handler, tests) were executed in a
single surgical pass rather than sequentially. 12 files modified total. 75 tests pass,
0 fail.

- [x] Remove tenant_id from ActionTokenClaims interface
- [x] Simplify issue() signature: remove tenantId param, remove from claims
- [x] Simplify validate() signature: remove tenantId param, remove tenant check
- [x] Remove tenant_id from ReplayGuard.markUsed() interface
- [x] Remove tenant_id from InMemoryReplayGuard storage
- [x] Remove tenant_id from SetContentExecutor, DeleteContentExecutor
- [x] Remove tenant_id from RequestHandler
- [x] Remove tenantId from ExecutionContext
- [x] Update all test fixtures
- [x] Run tests — 75 pass, 0 fail
- [x] Commit a1b2fa6
