# Phase 08 — Hydrator And Response Primitives

**Status:** IN PROGRESS

## Objective

Port placeholder hydration and define the response primitives that the engine, executors, handler, and host will share.

## Source of truth

- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/src/Services/Hydrator.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/src/Runtime/Response.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/tests/RuntimePipelineTest.php`

## Target TS files

- `hypermedia-app-ts/packages/htx-engine/src/services/hydrator.ts`
- `hypermedia-app-ts/packages/htx-engine/src/runtime/response.ts`
- `hypermedia-app-ts/packages/htx-engine/tests/hydrator.test.ts`
- `hypermedia-app-ts/packages/htx-engine/tests/response.test.ts`

## Implementation steps

1. Port placeholder replacement for `__field__` style bindings, including nested field access if PHP supports it.
2. Define the trusted-HTML rule from PHP and keep it documented in code and tests.
3. Port `Response` factories such as success, redirect, not-found, and error helpers if present in PHP.
4. Define the serialization boundary between engine response objects and Bun `Response`.
5. Document that normal pipeline order is: expression pass first, then hydrate, then meta stripping and layout work in the handler.

## Acceptance gates

- Hydration escapes untrusted content consistently with PHP.
- Trusted content behavior is explicit and tested.
- Runtime responses can be converted to Bun HTTP responses without losing headers or status.
- No later phase needs to redefine response shapes.

## Tests to port

- Hydrator behavior cases from runtime tests
- Placeholder escaping cases
- Response helper cases used by handler and executors

## Known risks

- Confusing hydration with expression evaluation
- Allowing trusted HTML without one explicit rule
- Creating a Bun-only response type that later leaks into engine internals

## Execution log

- [x] Hydrator ported
- [x] Trusted HTML rule documented
- [x] Response primitives ported
- [x] Bun response conversion path defined
- [x] Hydrator/response tests passing
- [ ] Full PHP hydrator/response parity sweep still pending
