# better-auth Module Integration

**Status:** IN PROGRESS
**Objective:** Create a BetterAuthModule that wraps better-auth for OAuth, email/password, and session management via the module system

## Phases

### Phase 1: Install + Module Scaffold
**Status:** NOT STARTED
- Install better-auth and better-sqlite3 dependencies
- Create app/modules/better-auth-module.ts
- BetterAuthMiddleware: mount better-auth handler on /api/auth/*
- BetterAuthContextProvider: resolve session via auth.api.getSession()
- Reuse AuthTemplateProcessor from existing auth-module for htx:auth directives
- Wire into app/public/index.ts alongside existing auth (both can coexist)

### Phase 2: Login/Signup Templates
**Status:** NOT STARTED
- Create login template that POSTs to /api/auth/sign-in/email
- Create signup template that POSTs to /api/auth/sign-up/email
- Update admin layout to use better-auth session
- Test email/password flow end-to-end

### Phase 3: Documentation
**Status:** NOT STARTED
- Document BetterAuthModule setup, configuration, OAuth providers
- Save to .docs/ and SQLite
