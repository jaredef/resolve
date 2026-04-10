# Phase 12 — Security: ActionTokenService & ReplayGuard

**Status:** NOT STARTED
**Depends on:** Phase 1 (scaffolding)

## Objectives

Port the security layer to TypeScript: JWT-based action tokens for mutation signing and replay guard for single-use token enforcement.

## Source Reference

- **PHP source:** `packages/htx-engine/src/Security/ActionTokenService.php` (~130 LOC)
- **PHP source:** `packages/htx-engine/src/Security/ReplayGuardInterface.php`
- **PHP source:** `packages/htx-engine/src/Security/InMemoryReplayGuard.php`

## Files to Create

### `packages/htx-engine/src/security/action-token-service.ts`

**Dependencies:** `jose` (npm package for JWT)

**Key behaviors:**
1. **Issue tokens** — create signed JWT with claims:
   - `sub` — subject (action type)
   - `tenant_id` — tenant isolation
   - `htx-context` — action context (e.g., "create:post")
   - `htx-recordId` — bound record ID (IDOR prevention)
   - `jti` — unique token ID (UUID v4)
   - `iat` — issued at
   - `exp` — expiration (5 minutes default)

2. **Validate tokens** — verify:
   - Signature validity
   - Expiration not passed
   - Tenant ID matches
   - Context matches expected context
   - Record ID matches expected record (if applicable)

3. **UUID generation** — use `crypto.randomUUID()` (built into Bun)

**TypeScript-specific notes:**
- `jose` library uses `SignJWT` and `jwtVerify` — different API from Firebase JWT but same concepts
- `jose` supports `HS256` symmetric signing (same as PHP version)
- Secret key: `new TextEncoder().encode(secret)` for `jose`

**Public API:**
```typescript
interface TokenClaims {
  sub: string
  tenantId: string
  context: string
  recordId?: string
}

class ActionTokenService {
  constructor(secret: string, ttlSeconds?: number)
  issue(claims: TokenClaims): string          // returns signed JWT
  validate(token: string, expected: TokenClaims): TokenPayload  // throws on invalid
}
```

### `packages/htx-engine/src/security/replay-guard.ts`

Interface + in-memory implementation:

```typescript
interface ReplayGuard {
  isReplayed(jti: string): boolean
  markUsed(jti: string, tenantId: string, expiresAt: Date): void
}

class InMemoryReplayGuard implements ReplayGuard {
  // Map<jti, { tenantId, expiresAt }>
  // Periodic cleanup of expired entries
}
```

### Barrel export — `packages/htx-engine/src/security/index.ts`

## Files to Create (Tests)

### `packages/htx-engine/tests/security.test.ts`

Port from PHP `SecurityTest.php`:
- Issue and validate a token (happy path)
- Expired token → rejection
- Wrong tenant ID → rejection
- Wrong context → rejection
- Wrong record ID → rejection
- Tampered signature → rejection
- Replay guard: first use → not replayed
- Replay guard: second use of same JTI → replayed
- Replay guard: different JTI → not replayed
- Replay guard: expired entries cleaned up

**Note:** `jose` JWT operations are async (`await signJWT()`, `await jwtVerify()`). This is the ONE place where async is unavoidable, but it's isolated to the security layer. The token is issued during `prepare()` and validated during `execute()` — both at the executor boundary, not inside the expression engine.

## Validation

- [ ] Tokens issued with correct claims
- [ ] Validation rejects invalid tokens with descriptive errors
- [ ] UUID generation produces unique values
- [ ] Replay guard tracks JTIs correctly
- [ ] Expired entry cleanup works
- [ ] All tests pass

## Review Comments

_Reviewed by Claude after building the complete PHP implementation._

### Async Boundary: Well-Documented, But Plan the Propagation

The plan correctly identifies that `jose` is async and isolates it to the security layer. However, the propagation impact needs more planning:

- `ActionTokenService.issue()` → async → called by `SetContentExecutor.prepare()` → async → called by `RequestHandler.handle()` → async
- `ActionTokenService.validate()` → async → called by `SetContentExecutor.execute()` → async → called by `RequestHandler.handle()` → async

This means `RequestHandler.handle()` must be `async` (or at least return `Promise<Response> | Response`). Since the RequestHandler is the top-level entry point, this forces `Bun.serve()` to use `async fetch()`. This is fine — Bun handles async fetch natively — but the plan should explicitly call this out as an accepted consequence.

**Alternative:** Use `jose`'s sync alternatives if they exist, or use a different JWT library that supports sync operations. HMAC-SHA256 signing is fundamentally a synchronous operation — the only reason `jose` is async is for WebCrypto compatibility. Look into whether `jsonwebtoken` (the classic Node JWT library) offers sync `sign()` and `verify()`. If so, it might be a better fit for the sync-first architecture.

### ReplayGuard: Production Persistence

The `InMemoryReplayGuard` works for development and testing but loses state on server restart. For production, you need a persistent replay guard — either SQLite-backed (since we already have `bun:sqlite`) or a simple file-based approach. Consider defining this as a future enhancement in the plan, or add it to Phase 16 (SQLite Adapter) as a `SqliteReplayGuard`.

### Token TTL: Make Configurable

The 5-minute default TTL is reasonable, but some deployments may need longer (e.g., slow forms, accessibility needs). The constructor already accepts `ttlSeconds` as optional — good. Make sure the default is documented and the dev server logs warn when a token expires.

### Missing: Token Refresh Strategy

What happens when a user opens a form, walks away for 6 minutes, and submits? The token is expired. The PHP version doesn't handle this gracefully — the user just gets an error. Consider documenting this as a known limitation and suggesting client-side JavaScript to refresh the token before expiry (an HTMX extension could do this elegantly).

## Execution Log

_(empty — not yet executed)_

## Independent review notes (2026-03)

- Decide explicitly: **`async` top-level handler** with `jose`, or a **synchronous** JWT sign/verify path (e.g. library with sync API) to mirror PHP Firebase JWT and reduce `Promise` leakage.

## Port review addendum (2026-03-28)

- This phase should force the architectural async decision, not just mention it. Otherwise every later phase will carry uncertainty about whether the core pipeline is sync or promise-based.
- I would also record the expected expired-token UX here so integration and CLI behavior do not each invent their own failure handling.
