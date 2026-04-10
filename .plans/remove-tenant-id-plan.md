# Remove tenant_id — Master Plan

**Status:** COMPLETE
**Issue:** hypermediacms/hypermedia-app#30
**Prefix:** `rt`
**Started:** 2026-03-30
**Completed:** 2026-03-30
**Commit:** a1b2fa6

## Overview

Surgical removal of the vestigial tenant_id from the HTX engine. The multi-tenant
infrastructure was designed but never implemented — tenant_id is hardcoded to 1
throughout. Removing it simplifies the engine and makes the codebase honest about
its single-tenant-per-instance architecture.

Multi-tenancy is handled at the platform/deployment layer (e.g., HypermediaDocs.com
runs separate engine instances per tenant), not at the engine level.

## Execution Summary

All 4 phases were executed together in a single surgical pass. No separate phase
docs were created for phases 2-4 — the scope was small enough to complete atomically.
12 files modified, 75 tests pass, 0 fail. Committed as a1b2fa6.

## Phases

### Phase 1: ActionTokenService + ReplayGuard
**Status:** COMPLETE

Remove tenant_id from JWT claims, token issuance, token validation, and replay guard.
These are the core security interfaces that thread tenant_id through the system.

### Phase 2: Executors + RequestHandler
**Status:** COMPLETE (executed with Phase 1 in single pass)

Remove hardcoded tenant_id = 1 from SetContentExecutor, DeleteContentExecutor,
and RequestHandler. Simplify method signatures.

### Phase 3: ExecutionContext + Types
**Status:** COMPLETE (executed with Phase 1 in single pass)

Remove optional tenantId from ExecutionContext interface and any related types.

### Phase 4: Tests + Documentation
**Status:** COMPLETE (executed with Phase 1 in single pass)

Update all test fixtures that reference tenant_id. Update security documentation
to reflect single-tenant design. Remove misleading "multi-tenant" references.

## Files Affected

### Phase 1
- packages/htx-engine/src/security/action-token-service.ts
- packages/htx-engine/src/security/in-memory-replay-guard.ts
- packages/htx-engine/src/security/types.ts

### Phase 2
- packages/htx-engine/src/executors/set-content-executor.ts
- packages/htx-engine/src/executors/delete-content-executor.ts
- packages/htx-engine/src/runtime/request-handler.ts

### Phase 3
- packages/htx-engine/src/runtime/types.ts

### Phase 4
- packages/htx-engine/tests/hydrator.test.ts
- packages/htx-engine/tests/mutation-executors.test.ts
- packages/htx-engine/tests/request-handler.test.ts
- docs/13-security.md
- docs-site/content/documentation/security.md
