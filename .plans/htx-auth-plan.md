# htx:auth — Pluggable Authentication Directive

**Status:** IN PROGRESS
**GitHub Issue:** hypermediacms/hypermedia-app#36
**Objective:** Template-driven authentication with pluggable providers, replacing application-level auth middleware

## Phases

### Phase 1: Contracts + Provider + Context Injection
**Status:** COMPLETE
**Plan:** `.plans/auth-phase-1-contracts.md`
- AuthProvider, AuthContext, CredentialStore interfaces
- SessionAuthProvider (port signing logic from AdminAuthService)
- EnvCredentialStore (current behavior)
- RequestHandler: optional authProvider, inject auth into expression context
- Response class: add cookies[] field for Set-Cookie passthrough
- HttpHost: append Set-Cookie headers from Response.cookies

### Phase 2: Directives + Login/Logout Actions
**Status:** COMPLETE
**Plan:** `.plans/auth-phase-2-directives.md`
- htx:auth / htx:auth-none conditional block rendering
- htx:auth redirect="..." for page-level gating
- htx:action login → calls provider.login(), sets session cookie
- htx:action logout → calls provider.logout(), clears cookie
- Strip auth directives from final output

### Phase 3: Templates + Migration + Tests
**Status:** IN PROGRESS
**Plan:** `.plans/auth-phase-3-migration.md`
- Login template (htx:action login)
- Protected admin pages (htx:auth redirect)
- Nav: htx:auth / htx:auth-none for sign in/out links
- Remove auth interception from DogfoodAppHost
- Tests: auth context, conditional rendering, login/logout flow
