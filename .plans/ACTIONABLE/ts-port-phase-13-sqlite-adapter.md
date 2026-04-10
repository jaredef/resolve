# Phase 13 — SQLite Adapter

**Status:** COMPLETE

## Objective

Port the PHP SQLite adapter as the Bun reference adapter, preserving schema, query semantics, CRUD behavior, and testability.

## Source of truth

- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-adapter-sqlite/src/SQLiteAdapter.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-adapter-sqlite/tests/SQLiteAdapterTest.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/app/templates/`

## Target TS files

- `hypermedia-app-ts/packages/htx-adapter-sqlite/src/sqlite-adapter.ts`
- `hypermedia-app-ts/packages/htx-adapter-sqlite/src/index.ts`
- `hypermedia-app-ts/packages/htx-adapter-sqlite/tests/sqlite-adapter.test.ts`

## Implementation steps

1. Port schema creation with the same core columns, defaults, uniqueness, and indexes as PHP.
2. Port `query()` with slug shortcut behavior, `where` string parsing, total counting, ordering, limit/offset, and JSON meta flattening.
3. Port `find`, `findBySlug`, `create`, `update`, `delete`, and `schema`.
4. Port slug generation and uniqueness behavior from PHP.
5. Support `:memory:` for tests and file-backed databases for the dogfood app.
6. Verify the adapter against executor and app templates, not only isolated adapter tests.

## Acceptance gates

- Query semantics match PHP for slug, where, order, limit, and offset.
- Returned rows flatten `meta` JSON like PHP.
- Schema includes `title`, `body`, `status`, `meta`, timestamps, and indexes.
- Adapter works in isolated tests and through real engine execution.

## Tests to port

- `SQLiteAdapterTest.php`
- App-template-driven read and mutation cases
- `:memory:` database cases
- Slug generation and duplicate handling cases

## Known risks

- Simplifying the schema and calling it close enough
- Changing `where` semantics to a richer TS shape the engine does not expect
- Treating adapter tests as sufficient without exercising the runtime path

## Execution log

- [x] Schema ported
- [x] Query semantics ported
- [x] CRUD methods ported
- [x] Slug generation matched
- [x] SQLite adapter parity tests passing
