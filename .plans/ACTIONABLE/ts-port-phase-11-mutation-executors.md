# Phase 11 — Mutation Executors

**Status:** COMPLETE

## Objective

Port the prepare/execute mutation flow for create, update, and delete, including token binding, payload normalization, and response handling.

## Source of truth

- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/src/Executors/SetContentExecutor.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/src/Executors/DeleteContentExecutor.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/tests/MutationExecutorTest.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/tests/SecurityTest.php`

## Target TS files

- `hypermedia-app-ts/packages/htx-engine/src/executors/set-content-executor.ts`
- `hypermedia-app-ts/packages/htx-engine/src/executors/delete-content-executor.ts`
- `hypermedia-app-ts/packages/htx-engine/tests/mutation-executors.test.ts`

## Implementation steps

1. Port prepare flow for create/update/delete pages, including loading existing records where PHP does.
2. Preserve the token field name and extraction rules used between prepare and execute.
3. Port execute flow for create, update, and delete using token validation and replay protection.
4. Define payload normalization explicitly: strip HTX internal fields only, preserve user fields, and match PHP behavior around `type` and record identifiers.
5. Port redirect and named response behavior from the parsed response metadata.
6. Ensure record binding protects against IDOR by verifying token record identity and action identity.

## Acceptance gates

- Prepare and execute paths share one token payload contract.
- Internal field stripping is explicit and tested.
- Update and delete refuse mismatched record IDs.
- Mutation executor tests prove single-use and IDOR protection behavior.

## Tests to port

- `MutationExecutorTest.php`
- `SecurityTest.php` mutation-related cases
- Create/update/delete prepare and execute cases
- Response redirect cases

## Known risks

- Hiding browser-facing field names in helper methods without tests
- Stripping domain fields accidentally while normalizing payloads
- Letting handlers or adapters own security logic that belongs in the executors

## Execution log

- [x] SetContentExecutor ported
- [x] DeleteContentExecutor ported
- [x] Prepare/execute flow matched
- [x] Internal field normalization tested
- [x] Mutation parity tests passing
