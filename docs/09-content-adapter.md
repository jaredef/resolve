# Content Adapter

The `ContentAdapter` interface is the boundary between the HTX engine and your data store. The engine never touches SQL, files, or APIs directly -- it calls adapter methods and receives plain objects. Any backend that implements the 7-method contract works: SQLite, Postgres, a directory of markdown files, a REST API, or an in-memory store for testing.

Two adapters ship out of the box:

- **SQLite adapter** (`@htx/adapter-sqlite`) — Full read/write with CRUD support. See [SQLite Adapter](./10-sqlite-adapter.md).
- **Markdown adapter** (`@htx/adapter-markdown`) — Read-only, backed by a filesystem of `.md` files with YAML front matter. See [Markdown Adapter](./19-markdown-adapter.md).

## The Interface

```ts
interface ContentAdapter {
  query(meta: QueryMeta): QueryResult;
  find(type: string, id: ContentId): ContentRow | null;
  findBySlug(type: string, slug: string): ContentRow | null;
  create(type: string, data: Record<string, unknown>): ContentRow;
  update(type: string, id: ContentId, data: Record<string, unknown>): ContentRow;
  delete(type: string, id: ContentId): void;
  schema(type: string): ContentSchema | null;
}
```

## Supporting Types

### ContentId

```ts
type ContentId = string | number;
```

Record identifiers can be strings or numbers. The adapter decides which form it uses internally. The engine passes whatever it receives from route parameters or form data.

### ContentRow

```ts
type ContentRow = Record<string, unknown>;
```

A flat key-value object representing a single content record. System fields (`id`, `slug`, `title`, `body`, `status`, `created_at`, `updated_at`) and custom fields all appear at the top level. The engine does not impose a fixed schema -- any keys the adapter returns become available in templates.

### QueryMeta

```ts
interface QueryMeta {
  type: string;
  slug?: string;
  where?: string;
  order?: string;
  howmany?: number;
  offset?: number;
  fields?: string;
}
```

Describes a content query. Built from HTX meta directives by the `GetContentExecutor`. See [Reads and Queries](./08-reads-and-queries.md) for full details on each field.

### QueryResult

```ts
interface QueryResult {
  rows: ContentRow[];
  total: number;
}
```

The result of a `query()` call. `rows` contains the current page of results. `total` is the full count of matching records before pagination is applied.

### ContentSchema and ContentSchemaField

```ts
interface ContentSchemaField {
  type: string;
  required?: boolean;
  default?: unknown;
  options?: unknown[];
}

type ContentSchema = Record<string, ContentSchemaField>;
```

Describes the structure of a content type. Each key is a field name; the value describes its type, whether it is required, its default value, and any constrained options. Used for form generation and validation.

## Method Reference

### query(meta: QueryMeta): QueryResult

Fetch multiple records matching the query criteria.

- If `meta.slug` is set, return a single-record result (delegates to `findBySlug` internally in the reference adapter).
- Apply `where` filters, `order` sorting, and `howmany`/`offset` pagination.
- Return both the paginated `rows` and the `total` count of all matching records.

### find(type: string, id: ContentId): ContentRow | null

Fetch a single record by its primary key. Returns `null` if no record exists with that type and ID combination.

### findBySlug(type: string, slug: string): ContentRow | null

Fetch a single record by its slug. Returns `null` if no record exists with that type and slug combination. Slugs are unique within a content type.

### create(type: string, data: Record<string, unknown>): ContentRow

Insert a new record. The adapter is responsible for:

- Assigning a primary key
- Generating a slug if one is not provided
- Setting `created_at` and `updated_at` timestamps
- Separating system columns from custom fields (if applicable)

Returns the complete created record, including any generated values.

### update(type: string, id: ContentId, data: Record<string, unknown>): ContentRow

Update an existing record. The `data` object contains only the fields being changed -- the adapter merges them with the existing record. Throws an error if the record does not exist.

Returns the complete updated record.

### delete(type: string, id: ContentId): void

Remove a record by type and ID. Throws an error if the record does not exist.

### schema(type: string): ContentSchema | null

Return the field schema for a content type, or `null` if no schema information is available. This is optional -- the reference SQLite adapter returns `null` because it uses a schema-free JSON column for custom fields.

## Role in the Architecture

The adapter sits between the executors and the data store:

```
HTX Template
    |
    v
MetaExtractor  -->  QueryMeta
    |
    v
GetContentExecutor  -->  adapter.query(meta)
    |                         |
    v                         v
SetContentExecutor  -->  adapter.create() / adapter.update()
    |                         |
    v                         v
DeleteContentExecutor -> adapter.delete()
```

The engine never imports database drivers or constructs SQL. All data access goes through the adapter interface, making the engine fully portable across storage backends.

## Implementing a Custom Adapter

To connect a new data source, implement the `ContentAdapter` interface:

```ts
import type {
  ContentAdapter,
  ContentId,
  ContentRow,
  ContentSchema,
  QueryMeta,
  QueryResult,
} from "@htx/engine";

export class MyAdapter implements ContentAdapter {
  query(meta: QueryMeta): QueryResult {
    // Translate meta.type, meta.where, meta.order, etc. into your backend's query language.
    // Return { rows, total }.
  }

  find(type: string, id: ContentId): ContentRow | null {
    // Look up a record by primary key.
  }

  findBySlug(type: string, slug: string): ContentRow | null {
    // Look up a record by slug within the given type.
  }

  create(type: string, data: Record<string, unknown>): ContentRow {
    // Insert a record. Generate slug and timestamps if not provided.
    // Return the full created record.
  }

  update(type: string, id: ContentId, data: Record<string, unknown>): ContentRow {
    // Merge data into the existing record. Throw if not found.
    // Return the full updated record.
  }

  delete(type: string, id: ContentId): void {
    // Remove the record. Throw if not found.
  }

  schema(type: string): ContentSchema | null {
    // Return field definitions, or null if your backend is schema-free.
    return null;
  }
}
```

### Key Implementation Notes

1. **query() must return `total`** -- the engine uses it for pagination context (`result.total` in templates). This means you need a count query in addition to the data query.

2. **Slug uniqueness is per type** -- `findBySlug("post", "hello")` and `findBySlug("page", "hello")` are independent lookups.

3. **Custom fields should be flattened** -- `ContentRow` is a flat object. If your backend stores custom fields in a nested structure (JSON column, sub-document), flatten them into the top level before returning.

4. **Mutations must throw on missing records** -- `update()` and `delete()` should throw an `Error` if the target record does not exist, not silently succeed.

5. **The `fields` property is advisory** -- your adapter may use it for query optimization (selecting fewer columns) or ignore it entirely.

### Registering an Adapter

Pass the adapter to the request handler when bootstrapping the application:

```ts
import { RequestHandler } from "@htx/engine";
import { MyAdapter } from "./my-adapter";

const adapter = new MyAdapter(/* config */);
const handler = new RequestHandler({
  adapter,
  siteRoot: "app/templates",
  // ...other options
});
```

Alternatively, register it through the module system:

```ts
import type { Module, ModuleRegistry } from "@htx/engine";

export class MyAdapterModule implements Module {
  name() { return "my-adapter"; }

  boot(registry: ModuleRegistry) {
    registry.registerAdapter("default", new MyAdapter());
  }
}
```
