# Phase 1 — Project Scaffolding

**Status:** NOT STARTED
**Depends on:** Nothing

## Objectives

Set up the Bun workspace monorepo structure, TypeScript configuration, and package manifests. No application code yet — just the skeleton that everything builds on.

## Files to Create

- `packages/htx-engine/package.json` — name: `@htx/engine`, type: module, main/types pointing to src/index.ts
- `packages/htx-engine/tsconfig.json` — strict mode, target ESNext, module ESNext, moduleResolution bundler
- `packages/htx-engine/src/index.ts` — empty barrel export
- `packages/htx-adapter-sqlite/package.json` — name: `@htx/adapter-sqlite`, depends on `@htx/engine`
- `packages/htx-adapter-sqlite/tsconfig.json` — extends engine config or own strict config
- `packages/htx-adapter-sqlite/src/index.ts` — empty barrel export
- Root `bunfig.toml` or root `package.json` with workspaces config
- Root `tsconfig.json` — project references

## Key Decisions

1. **Package naming**: `@htx/engine`, `@htx/adapter-sqlite` (scoped packages)
2. **tsconfig strictness**: `strict: true`, `noUncheckedIndexedAccess: true`, `exactOptionalPropertyTypes: true`
3. **Module format**: ESM only (no CJS)
4. **Test location**: `tests/` directory in each package (mirrors PHP structure)
5. **Source maps**: Enabled for development
6. **Bun workspaces**: Defined in root `package.json`

## Validation

- [ ] `bun install` completes without errors
- [ ] `bun run --filter '@htx/engine' build` works (even if empty)
- [ ] `bun test` runs (even with no tests yet)
- [ ] TypeScript compilation passes with strict mode

## Review Comments

_Reviewed by Claude after building the complete PHP implementation._

### Looks Solid — Minor Additions

This phase is straightforward and well-scoped. A few additions worth considering:

1. **Add a `bunfig.toml`** for test configuration — Bun's test runner can be configured here (e.g., test timeout, coverage thresholds). Worth setting up from day one rather than retrofitting.

2. **Consider adding `"sideEffects": false`** to `package.json` — enables tree-shaking if anyone bundles the engine.

3. **Add `.gitignore` entries** — `node_modules/`, `*.db`, `*.sqlite`, `.env`. The dogfood app will eventually create SQLite databases.

4. **Root `tsconfig.json` with project references** — Good call. Make sure `composite: true` is set in each package's `tsconfig.json` for project references to work properly.

5. **Consider a shared `tsconfig.base.json`** — Both packages will want the same strict settings. Extract common config to `tsconfig.base.json` at the root and have each package extend it. Avoids drift.

6. **Test helper location** — The PHP build ended up needing an `InMemoryAdapter` test helper used across multiple test files. Consider creating `packages/htx-engine/tests/helpers/` from the start.

## Execution Log

_(empty — not yet executed)_

## Independent review notes (2026-03)

- Add **`packages/htx-engine/tests/helpers/in-memory-adapter.ts`** (or equivalent shared test helper) to the scaffold so Phase 14 executor tests are not blocked waiting for ad-hoc types.

## Port review addendum (2026-03-28)

- This phase should also lock the workspace ergonomics: shared scripts, base tsconfig, package naming, and test helper layout. Those choices will ripple through every later phase.
- I would treat "can import every package and run one smoke test" as the real exit criterion here, not just directory creation.
