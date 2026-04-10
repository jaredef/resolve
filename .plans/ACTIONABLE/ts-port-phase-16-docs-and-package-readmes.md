# Phase 16 — Docs And Package READMEs

**Status:** COMPLETE

## Objective

Port and update the documentation surfaces that explain how to install, use, and develop the TypeScript/Bun version of HTX.

## Source of truth

- `/Users/jaredfoy/Developer/hypermedia-app/README.md`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/README.md`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-adapter-sqlite/README.md`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-adapter-postgres/README.md`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/.plans/htx-phase-12-docs.md`

## Target TS files

- `hypermedia-app-ts/README.md`
- `hypermedia-app-ts/packages/htx-engine/README.md`
- `hypermedia-app-ts/packages/htx-adapter-sqlite/README.md`
- `hypermedia-app-ts/packages/htx-cli/README.md`

## Implementation steps

1. Port the root project narrative to Bun/TypeScript while preserving the product model from the PHP README.
2. Port package READMEs for engine, SQLite adapter, and CLI with TS/Bun examples.
3. Update quick-start, install, and request-lifecycle examples to reference the new packages and runtime path.
4. Document only implemented features and clearly mark deferred adapters or docs-site work as future scope.
5. Keep API examples aligned with the actual contracts and app bootstrap introduced in earlier phases.

## Acceptance gates

- Root and package docs match the implemented Bun/TS API surface.
- No README example uses obsolete PHP-only paths or commands.
- Deferred work is labeled as future work, not implied to exist.
- Documentation is sufficient for a clean-room consumer to install and run the stack.

## Tests to port

- Manual verification of code snippets against actual package exports
- Quick-start walkthrough using the new CLI or app bootstrap

## Known risks

- Documenting desired architecture instead of implemented behavior
- Copying PHP instructions without adapting package names and commands
- Letting docs drift from the final contract and runtime shape

## Execution log

- [x] Root README ported
- [x] Engine README ported
- [x] SQLite adapter README ported
- [x] CLI README ported
- [x] Docs verified against implementation
