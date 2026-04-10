# Phase 3: Engine Cleanup

**Status:** IN PROGRESS
**Parent:** auth-module-extraction-plan.md

## Remove from request-handler.ts
- authProvider field, import, constructor option
- resolveAuthRedirect() method
- resolveAuthBlocks() method
- authContext resolution block
- auth: authContext in data object (module context handles it)
- htx-logout early POST handler
- login/logout in executeMutationBlock
- login/logout in handleMutationExecute
- login/logout in prepareMutationBlock
- "auth" from stripMetaDirectives
- pendingCookies usage for auth (keep generic pendingCookies)

## Remove files
- packages/htx-engine/src/contracts/auth-provider.ts (move to module)
- packages/htx-engine/src/security/session-auth-provider.ts (already in module)
- packages/htx-engine/src/security/env-credential-store.ts (already in module)

## Update
- packages/htx-engine/src/index.ts — remove auth exports

## Validation
- [ ] TypeScript compiles
- [ ] 79 tests pass
- [ ] Auth still works via module
- [ ] Zero auth-specific code in request-handler.ts

## Execution Log
