# Runtime Diagnostics Phase 1

**Status:** COMPLETE

## Objective

Introduce a shared runtime diagnostic model and improve request-time/dev-server error output so template/render failures explain where and why they happened.

## Files To Modify

- `packages/htx-engine/src/runtime/*`
- `packages/htx-engine/src/executors/get-content-executor.ts`
- `packages/htx-engine/src/index.ts`
- `packages/htx-cli/src/commands/serve-command.ts`

## Tasks

- add a reusable diagnostic error type and formatting helpers
- attach request path, template path, stage, and optional block context
- render richer development HTML error responses
- keep production-safe fallback output available
- catch startup-time runtime creation failures in the CLI

## Execution Log

- [x] Added shared diagnostic primitives
- [x] Wrapped request/render failures with context
- [x] Improved dev error HTML
- [x] Improved CLI startup output
