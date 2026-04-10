# SQLite Adapter

The `@htx/adapter-sqlite` package is the reference implementation of the `ContentAdapter` interface. It uses Bun's built-in `bun:sqlite` driver with no external dependencies beyond the engine's type contract.

## Installation

```ts
import { SQLiteAdapter } from "@htx/adapter-sqlite";

const adapter = new SQLiteAdapter("app/data/content.db");
// or in-memory for testing:
const adapter = new SQLiteAdapter(":memory:");
```

The constructor accepts a file path or `:memory:` for an in-memory database. If the file does not exist, SQLite creates it automatically.

## WAL Mode

The adapter enables Write-Ahead Logging immediately on connection:

```sql
PRAGMA journal_mode=WAL;
PRAGMA busy_timeout=5000;
PRAGMA foreign_keys=ON;
```

WAL mode allows concurrent readers and a single writer without blocking each other. This is critical for a web server where multiple requests may read content simultaneously while an admin request writes. The `busy_timeout` of 5000ms prevents immediate failure if a write lock is briefly held -- the connection will retry for up to 5 seconds before raising an error.

## Table Schema

The adapter creates a single `content` table with fixed system columns and a JSON `meta` column for custom fields:

```sql
CREATE TABLE IF NOT EXISTS content (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  type       TEXT NOT NULL,
  slug       TEXT NOT NULL,
  title      TEXT NOT NULL DEFAULT "",
  body       TEXT NOT NULL DEFAULT "",
  status     TEXT NOT NULL DEFAULT "draft",
  meta       TEXT NOT NULL DEFAULT "{}",
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(type, slug)
);
```

### System Columns

| Column | Type | Purpose |
|--------|------|---------|
| `id` | `INTEGER` | Auto-incrementing primary key |
| `type` | `TEXT` | Content type discriminator (e.g., `post`, `page`) |
| `slug` | `TEXT` | URL-friendly identifier, unique per type |
| `title` | `TEXT` | Record title |
| `body` | `TEXT` | Main body content |
| `status` | `TEXT` | Publication status (defaults to `draft`) |
| `meta` | `TEXT` | JSON object containing all custom fields |
| `created_at` | `TEXT` | UTC timestamp in `YYYY-MM-DD HH:MM:SS` format |
| `updated_at` | `TEXT` | UTC timestamp, updated on every write |

### Indexes

Three indexes are created automatically:

```sql
CREATE INDEX IF NOT EXISTS idx_content_type ON content(type);
CREATE INDEX IF NOT EXISTS idx_content_type_status ON content(type, status);
CREATE INDEX IF NOT EXISTS idx_content_slug ON content(type, slug);
```

The `(type, slug)` unique constraint ensures slugs are unique within a content type but can be reused across types.

## The Meta Column

Custom fields -- anything not in the system column set -- are stored as a JSON object in the `meta` column. When a record is read, the adapter merges system columns and meta fields into a flat `ContentRow`:

```ts
// Stored in the database:
// id=1, type="post", title="Hello", meta='{"category":"tech","featured":true}'

// Returned as ContentRow:
{ id: 1, type: "post", title: "Hello", category: "tech", featured: true }
```

The `meta` column itself is removed from the returned object. This makes custom fields indistinguishable from system columns in templates -- `__category__` works the same as `__title__`.

### Write Path

On `create()` and `update()`, the adapter separates incoming data into system columns and custom fields:

```ts
const SYSTEM_COLUMNS = new Set([
  "id", "type", "slug", "title", "body",
  "status", "created_at", "updated_at",
]);
```

Any key not in this set goes into the `meta` JSON column. On `update()`, the new meta fields are merged with the existing ones so that unmentioned custom fields are preserved.

## Slug Generation

If no `slug` is provided during `create()`, the adapter generates one from the `title`:

1. Convert to lowercase
2. Strip all characters except `a-z`, `0-9`, spaces, and hyphens
3. Replace consecutive spaces and hyphens with a single hyphen
4. Trim leading and trailing hyphens

If the result is empty (no usable characters in the title), a fallback slug of `untitled-{unix_timestamp}` is generated.

Examples:

| Title | Generated Slug |
|-------|---------------|
| `Hello World` | `hello-world` |
| `My Post #1!` | `my-post-1` |
| `---` | `untitled-1711641600` |
| (empty) | `untitled-1711641600` |

## Where Clause Mapping

The adapter translates the `where` string from `QueryMeta` into parameterized SQL. Each comma-separated condition is parsed for field, operator, and value.

### System Column Conditions

For fields in the system column set, the condition maps directly to a SQL `WHERE` clause:

```
where: "status=published"
SQL:    WHERE type = ? AND status = ?
params: [type, "published"]
```

### Custom Field Conditions

For fields not in the system column set, the adapter uses SQLite's `json_extract()` function to query inside the `meta` column:

```
where: "category=tech"
SQL:    WHERE type = ? AND json_extract(meta, ?) = ?
params: [type, "$.category", "tech"]
```

### Multiple Conditions

```
where: "status=published,category=tech"
SQL:    WHERE type = ? AND status = ? AND json_extract(meta, ?) = ?
params: [type, "published", "$.category", "tech"]
```

All conditions are joined with `AND`. The supported operators (`=`, `!=`, `>`, `<`, `>=`, `<=`) are checked in longest-first order to prevent `>=` from being parsed as `>` followed by `=value`.

### Parameterized Queries

All values are passed as bound parameters, never interpolated into the SQL string. This prevents SQL injection regardless of what values arrive from template expressions or user input.

## Timestamps

All timestamps use UTC in `YYYY-MM-DD HH:MM:SS` format. This is an intentional deviation from the original PHP implementation, which used the server's local timezone. UTC ensures consistent behavior across deployments and edge runtimes.

On `create()`, both `created_at` and `updated_at` are set to the current UTC time (unless explicitly provided in the input data). On `update()`, only `updated_at` is refreshed.

## Thread Safety

SQLite in WAL mode supports concurrent reads. Bun's `bun:sqlite` driver is synchronous, so each query blocks the event loop for its duration. For typical content queries this is sub-millisecond.

Write contention is handled by the `busy_timeout` pragma. If a write lock is held by another connection, the adapter will retry for up to 5 seconds before throwing. In practice, with a single Bun process handling requests, writes are serialized naturally.

For multi-process deployments (e.g., multiple Bun workers on the same database file), WAL mode ensures readers are never blocked by writers. Writers will queue behind each other via the busy timeout mechanism.

## Direct Database Access

The adapter exposes the underlying `bun:sqlite` `Database` instance for advanced use cases:

```ts
const adapter = new SQLiteAdapter("app/data/content.db");
const db = adapter.getDatabase();

// Run custom queries
const result = db.query("SELECT COUNT(*) as n FROM content WHERE type = ?").get("post");
```

Use this for migrations, analytics queries, or anything outside the standard CRUD contract. The adapter's schema (table name, column structure, indexes) is stable and documented above.

## Schema Discovery

The `schema()` method returns `null` for all content types. The SQLite adapter is schema-free by design -- any fields can be stored in the `meta` JSON column without prior declaration. If you need schema validation or form generation based on field definitions, implement it in a custom adapter or middleware layer.
