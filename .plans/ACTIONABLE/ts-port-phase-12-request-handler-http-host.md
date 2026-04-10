# Phase 12 — RequestHandler And HTTP Host

**Status:** COMPLETE

## Objective

Port the orchestration layer that turns all prior engine pieces into one working request pipeline, then expose it through a Bun HTTP host.

## Source of truth

- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/src/Runtime/RequestHandler.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/src/Runtime/Response.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/app/public/index.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/Integration/RequestHandlerTest.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/tests/RuntimePipelineTest.php`

## Target TS files

- `hypermedia-app-ts/packages/htx-engine/src/runtime/request-handler.ts`
- `hypermedia-app-ts/packages/htx-engine/src/runtime/http-host.ts`
- `hypermedia-app-ts/packages/htx-engine/tests/request-handler.test.ts`
- `hypermedia-app-ts/packages/htx-engine/tests/http-host.test.ts`

## Implementation steps

1. Port the full handler pipeline in PHP order:
   route -> file read -> includes -> data context -> components -> let -> parse blocks -> process blocks in reverse -> orphan POST mutation handling -> expression pass -> hydrate -> strip meta -> layout wrap -> second include pass -> second expression pass -> response.
2. Preserve `HX-Request` handling for partial/layout behavior.
3. Port block processing rules for read, mutation prepare, mutation execute, and static blocks.
4. Port handler-level error handling and error responses.
5. Create a Bun HTTP host adapter that converts `Request` into the handler request shape and maps engine responses back to Bun `Response`.
6. Port static-file bypass behavior modeled on `app/public/index.php`.

## Acceptance gates

- `RequestHandler` is a first-class tested deliverable, not hidden inside integration work.
- Handler ordering matches PHP pipeline order exactly unless documented otherwise.
- Static files bypass HTX routing correctly.
- Both normal page requests and HTMX partial requests behave correctly.

## Tests to port

- `Integration/RequestHandlerTest.php`
- Relevant `RuntimePipelineTest.php` cases
- Static-file bypass behavior
- Orphan POST mutation cases

## Known risks

- Reordering includes, layout work, hydration, or expressions
- Letting CLI or app bootstrap become the place where missing handler behavior is invented
- Mixing Bun request/response types too deeply into engine internals

## Execution log

- [x] RequestHandler ported
- [x] Reverse block processing matched
- [x] Bun HTTP host adapter created
- [x] Static-file bypass matched
- [x] Handler parity tests passing
