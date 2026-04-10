# Phase 09 — Security And Action Tokens

**Status:** IN PROGRESS

## Objective

Port mutation token issuance, verification, replay protection, and failure behavior, and lock the async strategy for request handling.

## Source of truth

- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/src/Security/ActionTokenService.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/src/Security/ReplayGuardInterface.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/src/Security/InMemoryReplayGuard.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/tests/SecurityTest.php`

## Target TS files

- `hypermedia-app-ts/packages/htx-engine/src/security/action-token-service.ts`
- `hypermedia-app-ts/packages/htx-engine/src/security/in-memory-replay-guard.ts`
- `hypermedia-app-ts/packages/htx-engine/src/security/replay-guard.ts`
- `hypermedia-app-ts/packages/htx-engine/tests/security.test.ts`

## Implementation steps

1. Port token payload fields, issue/verify flow, and replay guard usage from PHP.
2. Decide and document whether the top-level request path becomes async because of JWT tooling, or whether a synchronous signing path is used.
3. Port in-memory replay protection and cleanup semantics.
4. Preserve token TTL defaults and define expired-token failure behavior.
5. Keep token payload and validation errors consumable by mutation executors and the handler.

## Acceptance gates

- Async strategy is explicit in this phase doc and in the implementation.
- Security tests cover valid, expired, replayed, and tampered tokens.
- Replay guard behavior matches PHP for single-use mutation protection.
- Later phases do not need to reinterpret token payload structure.

## Tests to port

- `SecurityTest.php`
- Expired token cases
- Replay attempts
- Wrong record binding or wrong action cases

## Known risks

- Deferring the async decision until handler implementation
- Allowing token shape drift between prepare and execute code
- Treating replay guard persistence questions as core parity work for v1

## Execution log

- [x] Token service ported
- [x] Replay guard contract and in-memory implementation ported
- [x] Async strategy locked
- [x] Security parity tests passing
- [ ] Full PHP security parity sweep still pending
