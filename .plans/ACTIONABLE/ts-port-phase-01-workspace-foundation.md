# Phase 01 — Workspace Foundation

**Status:** COMPLETE

## Objective

Create the Bun workspace, package boundaries, shared TypeScript configuration, and test scaffolding so every later phase builds on stable package and path conventions.

## Source of truth

- `/Users/jaredfoy/Developer/hypermedia-app/CLAUDE.md`
- `/Users/jaredfoy/Developer/hypermedia-app/README.md`

## Target TS files

- `hypermedia-app-ts/package.json`
- `hypermedia-app-ts/bunfig.toml`
- `hypermedia-app-ts/tsconfig.base.json`
- `hypermedia-app-ts/packages/htx-engine/package.json`
- `hypermedia-app-ts/packages/htx-engine/tsconfig.json`
- `hypermedia-app-ts/packages/htx-adapter-sqlite/package.json`
- `hypermedia-app-ts/packages/htx-adapter-sqlite/tsconfig.json`
- `hypermedia-app-ts/packages/htx-cli/package.json`
- `hypermedia-app-ts/packages/htx-cli/tsconfig.json`
- `hypermedia-app-ts/packages/*/src/index.ts`
- `hypermedia-app-ts/packages/htx-engine/tests/helpers/in-memory-adapter.ts`
- `hypermedia-app-ts/app/.gitignore`

## Implementation steps

1. Create the root workspace manifest with Bun workspaces and shared scripts for test, typecheck, and package-level execution.
2. Create `tsconfig.base.json` with strict settings, path aliases, and package-safe module targets for Bun.
3. Create each package manifest with stable names, entrypoints, type exports, and test scripts.
4. Create empty but importable `src/index.ts` entrypoints in all packages.
5. Establish a shared test helper location inside `htx-engine/tests/helpers/`.
6. Define the initial `app/` skeleton so CLI scaffolding and dogfood port phases target fixed paths.

## Acceptance gates

- `bun install` succeeds at the repo root.
- Each package resolves through the workspace without path hacks.
- A smoke test can import each package entrypoint.
- Shared test helpers are available from engine tests without circular imports.
- No phase-specific runtime code is introduced yet.

## Tests to port

- None from PHP directly.
- Add Bun smoke tests that only verify workspace/package loadability.

## Known risks

- Workspace drift if each package defines its own TypeScript conventions
- Missing shared helper paths causing later executor tests to invent local stubs
- CLI package layout diverging from the runtime packages it will depend on

## Execution log

- [x] Root workspace created
- [x] Package manifests created
- [x] Shared TS config created
- [x] Shared test helper path created
- [x] Import smoke tests passing
- [x] `bun install` verification complete
