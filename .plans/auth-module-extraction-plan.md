# Auth Module Extraction — Engine Hooks + Module Migration

**Status:** IN PROGRESS
**GitHub Issue:** hypermediacms/hypermedia-app#42
**Objective:** Extract all auth-specific code from RequestHandler into a pluggable AuthModule using three new generic engine hooks

## Phases

### Phase 1: Engine Hooks
**Status:** NOT STARTED
**Plan:** `.plans/ame-phase-1-hooks.md`
- TemplateProcessor interface + registerTemplateProcessor() on ModuleRegistry
- MutationActionHandler interface + registerMutationHandler() on ModuleRegistry
- Wire template processors into request pipeline (pre-layout + post-layout)
- Wire mutation handlers into processBlocks() and handleMutationExecute()
- Move context provider resolution earlier (before template processing)
- All existing tests pass

### Phase 2: Auth Module
**Status:** NOT STARTED
**Plan:** `.plans/ame-phase-2-auth-module.md`
- AuthModule implementing Module
- AuthMiddleware: handles logout POST
- AuthContextProvider: resolves sessions from cookies
- AuthTemplateProcessor: handles htx:auth, htx:auth-none, htx:auth redirect
- AuthMutationHandler: handles login/logout actions
- Wire into app/public/index.ts

### Phase 3: Engine Cleanup
**Status:** NOT STARTED
**Plan:** `.plans/ame-phase-3-cleanup.md`
- Remove authProvider from RequestHandler
- Remove resolveAuthBlocks(), resolveAuthRedirect()
- Remove login/logout from executeMutationBlock and handleMutationExecute
- Remove htx-logout early handler
- Remove "auth" from stripMetaDirectives
- Move auth contracts out of engine
- All tests pass, templates unchanged
