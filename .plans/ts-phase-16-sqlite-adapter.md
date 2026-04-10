# Phase 16 — SQLite Adapter

**Status:** NOT STARTED
**Depends on:** Phase 13 (Contracts)

## Objectives

Port the SQLite adapter to TypeScript using Bun's built-in `bun:sqlite`. This is the reference adapter implementation.

## Source Reference

- **PHP source:** `packages/htx-adapter-sqlite/src/SQLiteAdapter.php` (~287 LOC)

## Files to Create

### `packages/htx-adapter-sqlite/src/sqlite-adapter.ts`

**Key behaviors to port:**

1. **Database initialization:**
   - Open/create SQLite database file
   - Enable WAL mode (`PRAGMA journal_mode=WAL`)
   - Create `content` table if not exists: `id`, `type`, `slug`, `meta` (JSON), `created_at`, `updated_at`
   - Content fields stored as JSON in `meta` column

2. **`query(meta)` implementation:**
   - Build SELECT from `content` table
   - WHERE clause from `meta.where` — parse conditions, use `JSON_EXTRACT` for custom fields
   - ORDER BY from `meta.order` — map `newest`/`oldest`/field names
   - LIMIT from `meta.howmany`
   - OFFSET from `meta.offset`
   - All queries parameterized (no SQL injection)

3. **`find(type, id)`** — SELECT by id and type
4. **`findBySlug(type, slug)`** — SELECT by slug and type
5. **`create(type, data)`** — INSERT with auto-generated slug, JSON meta, timestamps
6. **`update(type, id, data)`** — UPDATE JSON meta, updated_at timestamp
7. **`delete(type, id)`** — DELETE by id and type
8. **`schema(type)`** — return null (schemas optional in SQLite adapter)

9. **Row decoding** — `JSON.parse(row.meta)` to expand JSON fields into flat record

**`bun:sqlite` specifics:**
```typescript
import { Database } from 'bun:sqlite'

const db = new Database('path/to/db.sqlite')
db.run('PRAGMA journal_mode=WAL')

// Queries are synchronous:
const rows = db.query('SELECT * FROM content WHERE type = ?').all(type)
const row = db.query('SELECT * FROM content WHERE id = ? AND type = ?').get(id, type)
db.run('INSERT INTO content (type, slug, meta, created_at) VALUES (?, ?, ?, ?)', [type, slug, json, now])
```

**Key difference from PHP:** `bun:sqlite` is synchronous. No promises, no callbacks. This matches the engine's sync-first design perfectly.

### `packages/htx-adapter-sqlite/src/index.ts`

Barrel export.

## Files to Create (Tests)

### `packages/htx-adapter-sqlite/tests/sqlite-adapter.test.ts`

Port from PHP `SQLiteAdapterTest.php`:
- Create record and verify returned data
- Find by ID
- Find by slug
- Query with type filter
- Query with where conditions
- Query with order (newest, oldest)
- Query with limit (howmany)
- Query with offset
- Update record and verify changes
- Delete record and verify removal
- JSON meta field storage and retrieval
- Auto-generated slug
- Timestamps set correctly
- Empty query results → empty array
- Find non-existent record → null

**Test setup:** Use in-memory SQLite database (`:memory:`) for test isolation.

## Validation

- [ ] All 7 ContentAdapter methods implemented
- [ ] WAL mode enabled
- [ ] JSON meta field correctly stored and decoded
- [ ] SQL injection prevented (parameterized queries)
- [ ] Timestamps accurate
- [ ] All tests pass

## Review Comments

_Reviewed by Claude after building the complete PHP implementation._

### Schema Missing System Columns

The plan shows the `content` table with `id`, `type`, `slug`, `meta`, `created_at`, `updated_at`. The PHP implementation also includes system columns: `title`, `body`, `status`. These are first-class columns (not in the JSON `meta`) because they're queried frequently and benefit from indexing. Verify the PHP schema and replicate it exactly.

### Where Clause Parsing: Underspecified

The plan says "parse conditions, use `JSON_EXTRACT` for custom fields" but doesn't detail the where clause format. In PHP, the where clause is a `Record<string, string>` where each value can be:
- Simple equality: `{ status: "published" }` → `WHERE status = ?`
- Comparison operators: `{ age: ">18" }` → `WHERE JSON_EXTRACT(meta, '$.age') > ?`
- LIKE: `{ title: "%hello%" }` → `WHERE title LIKE ?`

The parser needs to detect the operator prefix and build the correct SQL. This is non-trivial and should be documented in the plan.

### Order Clause: More Than Newest/Oldest

The plan mentions `newest`/`oldest`/field names. The PHP implementation also supports:
- `alphabetical` → `ORDER BY title ASC`
- `random` → `ORDER BY RANDOM()`
- Custom field ordering with direction: `created_at:desc`

Document all supported order values.

### Slug Generation

The plan mentions "auto-generated slug" but doesn't describe the algorithm. In PHP: lowercase → replace spaces with hyphens → remove non-alphanumeric chars → truncate → append numeric suffix for uniqueness. Consider using the `slugify()` utility suggested in the Phase 2 review.

### In-Memory Database for Tests: Perfect

Using `:memory:` for test isolation is the right call. Each test gets a fresh database with no cleanup needed. The PHP build used the same approach and it was reliable.

### Missing: Index Creation

The plan doesn't mention creating indexes. At minimum: `CREATE INDEX idx_content_type ON content(type)` and `CREATE INDEX idx_content_slug ON content(type, slug)`. The PHP Postgres adapter created a GIN index on `meta` — the SQLite adapter should create equivalent indexes for common query patterns.

## Execution Log

_(empty — not yet executed)_

## Independent review notes (2026-03)

- Replace the minimal schema in Objectives with **parity** to PHP [`ensureSchema()`](../../hypermedia-app-php/packages/htx-adapter-sqlite/src/SQLiteAdapter.php): columns `title`, `body`, `status`, `meta`, indexes, and **where-string** parsing in `query()` as implemented there.

## Port review addendum (2026-03-28)

- This phase should start from the PHP adapter as a specification, not from a simplified Bun-first schema. Any schema drift here will break parity in ways that look like runtime bugs.
- I would also pin the supported query semantics in writing before implementation, especially `where`, ordering, slug generation, and what counts as adapter-owned defaults.
