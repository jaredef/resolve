# Phase 10 — Read Executor

**Status:** COMPLETE

## Objective

Port `GetContentExecutor` so HTX read blocks query the adapter, render rows, handle empty states, and feed the runtime pipeline exactly as PHP does.

## Source of truth

- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/src/Executors/GetContentExecutor.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/tests/GetContentExecutorTest.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/tests/RuntimePipelineTest.php`

## Target TS files

- `hypermedia-app-ts/packages/htx-engine/src/executors/get-content-executor.ts`
- `hypermedia-app-ts/packages/htx-engine/tests/get-content-executor.test.ts`
- `hypermedia-app-ts/packages/htx-engine/tests/helpers/in-memory-adapter.ts`

## Implementation steps

1. Port `execute` and `executeFromParsed` entrypoints, preserving the split between raw DSL and parsed metadata flows if both exist in PHP.
2. Port route param and query param injection methods used by the handler.
3. Port adapter query invocation using the shared `QueryMeta` contract.
4. Port row rendering, `each` block handling, `none` block handling, response metadata use, and nested query support.
5. Port interaction with the expression engine and hydrator for row-level rendering.
6. Preserve error behavior: query-level failures should bubble, while any PHP row-level resilience should be matched intentionally.

## Acceptance gates

- `adapter.query()` is consumed as `{ rows, total }`.
- `each` and `none` behavior matches PHP templates and tests.
- Executor output is compatible with reverse-order block replacement in `RequestHandler`.
- Execution context fields required from the handler are explicit and stable.

## Tests to port

- `GetContentExecutorTest.php`
- Relevant `RuntimePipelineTest.php` read-path cases
- Nested query rendering cases if present
- Pagination/meta propagation cases

## Known risks

- Re-inventing execution context fields inside the executor
- Converting parsed meta into a different contract than the adapter expects
- Losing compatibility with multi-block replacement in the handler

## Execution log

- [x] GetContentExecutor ported
- [x] Route/query context setters ported
- [x] Read-path rendering behavior matched
- [x] Read executor tests passing
