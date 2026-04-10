# Phase 17 — Integration Parity And Release Gate

**Status:** COMPLETE

## Objective

Run the final parity, packaging, app, and documentation validation needed to treat the TypeScript port as a credible replacement for the PHP baseline.

## Source of truth

- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/Integration/RequestHandlerTest.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/tests/RuntimePipelineTest.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/tests/ExpressionEngineTest.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-adapter-sqlite/tests/SQLiteAdapterTest.php`
- `/Users/jaredfoy/Developer/hypermedia-app/README.md`

## Target TS files

- `hypermedia-app-ts/packages/htx-engine/tests/`
- `hypermedia-app-ts/packages/htx-adapter-sqlite/tests/`
- `hypermedia-app-ts/packages/htx-cli/tests/`
- `hypermedia-app-ts/app/`
- `hypermedia-app-ts/README.md`
- `hypermedia-app-ts/packages/*/README.md`
- `hypermedia-app-ts/.plans/ACTIONABLE/ts-port-master-plan.md`

## Implementation steps

1. Port the highest-signal integration and runtime pipeline tests that prove end-to-end behavior.
2. Assemble a parity matrix for expressions, parser, router, resolvers, executors, handler, adapter, CLI, and dogfood app flows.
3. Validate package installability and public exports from a clean consumer context.
4. Validate app boot, static assets, public read flows, and admin mutation flows.
5. Validate README/package documentation against the actual shipped commands and exports.
6. Update the master plan and phase execution logs with completion state once release gates are met.

## Acceptance gates

- End-to-end parity coverage exists for the major PHP runtime surfaces.
- Package exports and CLI entrypoints work from a clean install context.
- Dogfood app flows are verified, not assumed from unit tests.
- Documentation matches the final implementation.
- Any intentional deviations from PHP are listed explicitly.

## Tests to port

- `Integration/RequestHandlerTest.php`
- `RuntimePipelineTest.php`
- Remaining high-signal `ExpressionEngineTest.php` and adapter parity tests
- CLI black-box tests

## Known risks

- Declaring completion from unit tests alone
- Forgetting package/export validation outside the monorepo
- Leaving undocumented deviations hidden in scattered phase notes

## Execution log

- [x] Integration parity tests passing
- [x] Package installability validated
- [x] Dogfood app validated
- [x] Documentation validated
- [x] Master plan updated to reflect release readiness
