---
title: Reads and Queries
status: published
section: data-and-content
section_label: Data and Content
summary: How meta directives, the content adapter, and the hydrator drive data-backed pages.
created_at: 2026-03-28 00:08:00
---

Every HTX template that displays content starts with a read. Meta directives in the `.htx` file declare what content to fetch, and the engine translates those directives into a `QueryMeta` object, passes it to the content adapter, and makes the results available for rendering.

## From Directives to Queries

When the engine processes an HTX file, the `MetaExtractor` scans for `<htx:*>` tags outside of template blocks. Each tag maps to a field on the `QueryMeta` type:

```html
<htx:type>post</htx:type>
<htx:where>status=published</htx:where>
<htx:order>newest</htx:order>
<htx:howmany>10</htx:howmany>
<htx:offset>0</htx:offset>
<htx:fields>title,slug,created_at</htx:fields>
```

The `GetContentExecutor` converts extracted meta into a typed `QueryMeta` object and calls `adapter.query(meta)`.

## The QueryMeta Type

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

| Field | Type | Purpose |
|-------|------|---------|
| `type` | `string` | Content type to query (required). Maps to a table or collection. |
| `slug` | `string` | If set, fetch a single record by slug. Short-circuits the full query path. |
| `where` | `string` | Comma-separated filter conditions. See [Where Clause Processing](#where-clause-processing). |
| `order` | `string` | Sort order keyword. Defaults to `newest`. See [Order Options](#order-options). |
| `howmany` | `number` | Maximum number of rows to return. Defaults to 20 in the SQLite adapter. |
| `offset` | `number` | Number of rows to skip. Used for pagination. Defaults to 0. |
| `fields` | `string` | Comma-separated list of fields to return. Reserved for adapter-level projection. |

### Expression Evaluation in Meta

Meta values can contain `\{{ expression }}` syntax. The `GetContentExecutor` evaluates these before passing the meta to the adapter:

```html
<htx:slug>\{{ route.slug }}</htx:slug>
<htx:offset>\{{ query.page }}</htx:offset>
<htx:where>category=\{{ query.cat }}</htx:where>
```

Route parameters (`route.*`), query string values (`query.*`), and any other context variables are resolved at request time.

## QueryResult Structure

The adapter returns a `QueryResult`:

```ts
interface QueryResult {
  rows: ContentRow[];
  total: number;
}
```

| Field | Type | Purpose |
|-------|------|---------|
| `rows` | `ContentRow[]` | The matching records for the current page. Each row is a flat key-value object. |
| `total` | `number` | Total number of matching records across all pages, before `howmany`/`offset` are applied. |

`ContentRow` is `Record<string, unknown>` -- a flat object where keys are field names and values can be strings, numbers, booleans, or nested objects.

## Where Clause Processing

The `where` directive accepts comma-separated conditions. Each condition consists of a field name, an operator, and a value with no spaces around the operator:

```html
<htx:where>status=published</htx:where>
<htx:where>status=published,category=tech</htx:where>
<htx:where>created_at>=2024-01-01</htx:where>
```

### Supported Operators

| Operator | Meaning |
|----------|---------|
| `=` | Equal |
| `!=` | Not equal |
| `>` | Greater than |
| `<` | Less than |
| `>=` | Greater than or equal |
| `<=` | Less than or equal |

### System Columns vs. Custom Fields

The adapter distinguishes between system columns and custom fields:

- **System columns** (`id`, `type`, `slug`, `title`, `body`, `status`, `created_at`, `updated_at`) are queried directly against table columns.
- **Custom fields** (anything not in the system column set) are queried via JSON extraction from the `meta` column. In the SQLite adapter this uses `json_extract(meta, '$.fieldname')`.

Multiple conditions are joined with `AND`. There is no `OR` support in the where string syntax.

### Operator Parsing Order

The parser checks operators in this order: `!=`, `>=`, `<=`, `>`, `<`, `=`. This ensures multi-character operators are matched before their single-character prefixes. The first match wins for each condition.

## Order Options

The `order` directive accepts a keyword string:

| Value | SQL Equivalent | Description |
|-------|---------------|-------------|
| `newest` | `ORDER BY created_at DESC` | Most recent first (default) |
| `oldest` | `ORDER BY created_at ASC` | Earliest first |
| `alpha` | `ORDER BY title ASC` | Alphabetical by title |
| `alphabetical` | `ORDER BY title ASC` | Alias for `alpha` |
| `alpha_desc` | `ORDER BY title DESC` | Reverse alphabetical by title |
| `updated` | `ORDER BY updated_at DESC` | Most recently updated first |

If no `order` directive is present, the adapter defaults to `newest`.

## Pagination

Use `howmany` and `offset` together for pagination:

```html
<htx:type>post</htx:type>
<htx:howmany>10</htx:howmany>
<htx:offset>\{{ query.page * 10 }}</htx:offset>
```

The `total` field in `QueryResult` provides the full count for building pagination controls:

```html
<p>Showing \{{ result.count }} of \{{ result.total }} posts</p>
```

The `MetaExtractor` coerces `howmany` and `offset` to numbers during extraction. The `GetContentExecutor` also handles string-to-number conversion for these fields when they come from expression evaluation.

## Field Selection

The `fields` directive declares which fields the template needs:

```html
<htx:fields>title,slug,created_at</htx:fields>
```

This is passed through to the adapter as a string. Whether the adapter uses it for projection (selecting fewer columns) is an implementation detail. The SQLite reference adapter does not currently filter columns based on this value -- it always returns all fields.

## Single Record Lookups

There are two ways to fetch a single record:

### By Slug

```html
<htx:type>post</htx:type>
<htx:slug>\{{ route.slug }}</htx:slug>
```

When `slug` is present in the `QueryMeta`, the adapter calls `findBySlug()` and wraps the result in a `QueryResult` with `total: 1` (or `total: 0` if not found). The `where`, `order`, `howmany`, and `offset` fields are ignored.

### By ID via Where

```html
<htx:type>post</htx:type>
<htx:where>id=\{{ route.id }}</htx:where>
<htx:howmany>1</htx:howmany>
```

This uses the standard query path with a filter on the `id` system column.

## How Results Reach Templates

The `GetContentExecutor` makes query results available to templates through two mechanisms:

### 1. Hydrator Placeholders

Row fields are injected as `__fieldname__` placeholders:

```html
<h1>__title__</h1>
<p>__body__</p>
<span>__created_at__</span>
```

All values are HTML-escaped by default. The `body_html` field is the only trusted (unescaped) field. If a template contains `__body__` and the row has a `body_html` field, the hydrator substitutes the HTML version automatically.

### 2. Expression Context

Row fields and result metadata are available in `\{{ expression }}` blocks:

```html
<p>\{{ title }}</p>
<p>Total: \{{ result.total }}</p>
<p>\{{ if result.count > 0 }}Found content\{{ endif }}</p>
```

The following context objects are injected:

| Variable | Contents |
|----------|----------|
| `result.total` | Total matching records |
| `result.count` | Number of rows in the current page |
| `route.*` | Route parameters from the URL |
| `query.*` | Query string parameters |
| `loop.*` | Iteration metadata (inside `<htx:each>` only) |

### Single vs. Multiple Records

- **Without `<htx:each>`:** The first row is used as the data context. All its fields are available as placeholders and expression variables.
- **With `<htx:each>`:** Each row is rendered independently with the item template. The `loop` variable provides iteration metadata (`index`, `count`, `first`, `last`, `length`).
- **Zero rows:** The `<htx:none>` block renders, or the `none` response block, or a default "No content found" message.
