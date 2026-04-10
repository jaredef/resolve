# TypeScript Port Parity Matrix

**Date:** 2026-03-28  
**Scope:** Bun/TypeScript replacement for the PHP HTX runtime

## Runtime Surfaces

| Surface | TypeScript status | Verification |
|---|---|---|
| Expression engine core | Ported | `packages/htx-engine/tests/expression-engine-core.test.ts`, `expression-engine-parity.test.ts`, function suites |
| DSL parser and block model | Ported | `packages/htx-engine/tests/dsl-parser.test.ts` |
| Router and template resolution | Ported | `packages/htx-engine/tests/router.test.ts` |
| Includes, components, layouts, let | Ported | `packages/htx-engine/tests/runtime-resolvers.test.ts` |
| Hydration and response primitives | Ported | `packages/htx-engine/tests/hydrator.test.ts`, `response.test.ts` |
| Action tokens and replay guard | Ported | `packages/htx-engine/tests/security.test.ts` |
| Read executor | Ported | `packages/htx-engine/tests/get-content-executor.test.ts` |
| Mutation executors | Ported | `packages/htx-engine/tests/mutation-executors.test.ts` |
| Request handler and HTTP host | Ported | `packages/htx-engine/tests/request-handler.test.ts`, `http-host.test.ts` |
| SQLite adapter | Ported | `packages/htx-adapter-sqlite/tests/sqlite-adapter.test.ts` |
| CLI | Ported | `packages/htx-cli/tests/cli.test.ts` |
| Dogfood app | Ported | `tests/dogfood-app.test.ts` |
| Clean consumer install/export validation | Validated | `tests/consumer-install.test.ts` |

## Release Gate Checks

| Gate | Status | Evidence |
|---|---|---|
| Engine parity tests pass | Complete | `bun test packages/htx-engine/tests` |
| SQLite adapter parity tests pass | Complete | `packages/htx-adapter-sqlite/tests/sqlite-adapter.test.ts` |
| CLI black-box tests pass | Complete | `packages/htx-cli/tests/cli.test.ts` |
| Dogfood app routes and mutations pass | Complete | `tests/dogfood-app.test.ts` |
| Clean consumer install works | Complete | `tests/consumer-install.test.ts` |
| Docs match implementation | Complete | root and package README pass implementation review in Phase 16/17 |

## Resolved Parity Gaps (Completion Audit — 2026-03-28)

| Gap | Resolution |
|-----|-----------|
| Per-row error tolerance in `<htx:each>` | Fixed — try-catch per row, logs and continues (matches PHP) |
| Layout file read errors crash request | Fixed — try-catch around `readFileSync`, skip unreadable layouts (matches PHP) |
| No error logging in RequestHandler catch blocks | Fixed — `console.error("[HTX]...")` in both `handle()` and `handleMutationExecute()` |
| Router accepts invalid dynamic segment names | Fixed — regex validation `DYNAMIC_FILE_RE` / `DYNAMIC_DIR_RE` (matches PHP) |
| Circular include errors don't show path chain | Fixed — relative path chain with ` -> ` separator (matches PHP) |
| Nests parameter ignored | Audited — PHP also does not use nests in executor. Placeholder for future work in both. |
| Consumer install test CLI binary not found | Fixed — invoke via `process.execPath` instead of shebang |
| UTC timestamps | Intentional deviation — documented in code |
| Expression eval in `meta.recordId` | Intentional improvement — documented |
| Path traversal protection in Router | Intentional improvement — documented |

## Intentional Deviations From PHP

- JWT token issue/validate is async at the request boundary because the Bun implementation uses `jose`.
- CLI `dev` and `serve` run on `Bun.serve()` instead of PHP's built-in web server.
- CLI `--dry-run` support was added to enable black-box verification of runtime wiring without starting a long-running process.
- Current package consumption is validated through local `file:` installs and workspace usage; published registry distribution is future scope.

## Current Validation Commands

```bash
bun run typecheck
bun x tsc --noEmit -p tsconfig.json
bun test
```
