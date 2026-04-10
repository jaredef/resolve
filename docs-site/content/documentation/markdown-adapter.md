---
title: Markdown Adapter
status: published
section: data-and-content
section_label: Data and Content
summary: Read-only flat-file adapter for documentation, blogs, and content in version control.
created_at: 2026-03-28 00:10:30
---

The markdown adapter (`@htx/adapter-markdown`) is a read-only `ContentAdapter` that serves content from a directory tree of markdown files. It is designed for documentation sites, blogs, and marketing pages where content is authored as flat files and runtime writes are not needed.

## Directory Layout

Content is organized by type. Each top-level directory under the content root becomes a content type, and each `.md` file within it becomes a record:

```
content/
  post/
    hello-world.md
    second-post.md
  page/
    about.md
    contact.md
  documentation/
    quick-start.md
    routing.md
```

In this example, querying `<htx:type>post</htx:type>` returns the two post records. Querying `<htx:type>documentation</htx:type>` returns the two documentation records.

## Front Matter

Each markdown file can include YAML-style front matter between `---` delimiters:

```markdown
---
title: Hello World
status: published
category: tech
tags: [intro, tutorial]
created_at: 2026-03-28 12:00:00
---

This is the **markdown** body content.
```

### Supported Value Types

| Type | Example | Result |
|------|---------|--------|
| String | `title: Hello World` | `"Hello World"` |
| Quoted string | `title: "Hello: World"` | `"Hello: World"` |
| Boolean | `featured: true` | `true` |
| Number | `order: 3` | `3` |
| Float | `rating: 4.5` | `4.5` |
| Null | `subtitle: null` | `null` |
| Array | `tags: [intro, tutorial]` | `["intro", "tutorial"]` |
| Empty array | `tags: []` | `[]` |

### Field Derivation

When front matter fields are missing, the adapter derives sensible defaults:

| Field | Front Matter Key | Fallback |
|-------|-----------------|----------|
| `slug` | `slug` | Filename without `.md` extension |
| `id` | `id` | `"<type>:<slug>"` (e.g., `"post:hello-world"`) |
| `title` | `title` | The slug value |
| `status` | `status` | `"draft"` |
| `created_at` | `created_at` | File birth time (or mtime if unavailable) |
| `updated_at` | `updated_at` | File modification time |

## Row Shape

Every record returned by the adapter includes these system fields:

| Field | Type | Description |
|-------|------|-------------|
| `id` | string or number | From front matter or `"<type>:<slug>"` |
| `type` | string | Directory name under content root |
| `slug` | string | From front matter or filename |
| `title` | string | From front matter or slug |
| `body` | string | Raw markdown content (after front matter) |
| `body_html` | string | Rendered HTML from markdown |
| `status` | string | From front matter or `"draft"` |
| `created_at` | string | ISO-ish timestamp (`YYYY-MM-DD HH:MM:SS`) |
| `updated_at` | string | ISO-ish timestamp |

Any additional front matter keys are merged onto the row as custom fields. For example, `category: tech` in front matter makes `__category__` available in templates and `category` available in expressions.

## Read Operations

The adapter supports the full read path:

### query(meta)

Queries records by type with filtering, sorting, and pagination:

```html
<htx:type>post</htx:type>
<htx:where>status=published,category=tech</htx:where>
<htx:order>newest</htx:order>
<htx:howmany>10</htx:howmany>
```

Where conditions support the same operators as the SQLite adapter: `=`, `!=`, `>`, `<`, `>=`, `<=`.

Order options: `newest` (default), `oldest`, `alpha`, `alphabetical`, `alpha_desc`, `updated`.

Default page size is 20 records.

### find(type, id)

Looks up a record by its ID.

### findBySlug(type, slug)

Looks up a record by its slug within a content type.

### schema(type)

Always returns `null`. The markdown adapter has no schema discovery.

## Mutations Are Not Supported

The adapter is intentionally read-only. Calling `create()`, `update()`, or `delete()` throws an error:

```
Error: MarkdownAdapter is read-only. create() is not supported.
```

If you need write operations, use the SQLite adapter or implement a custom adapter.

## Indexing

The adapter reads and indexes all markdown files at startup:

1. Recursively walks the content root directory
2. Parses front matter and renders markdown for each `.md` file
3. Builds in-memory indexes by type, slug, and id
4. All subsequent queries operate on the in-memory index

The `reload()` method re-reads the filesystem and rebuilds all indexes. This can be called to pick up content changes without restarting the server.

## Configuration

Set the adapter in `htx.config.json`:

```json
{
  "adapter": "markdown",
  "contentRoot": "content"
}
```

The `contentRoot` path is resolved relative to the project root (the directory containing `htx.config.json`).

## When to Use the Markdown Adapter

Use it when:

- Content is authored as markdown files (docs, blog posts, marketing pages)
- You want content in version control alongside your templates
- You do not need runtime CRUD operations
- You want zero database setup

Use the SQLite adapter instead when:

- You need create, update, and delete operations
- Content is managed through an admin interface
- You need auto-generated slugs, schema discovery, or dynamic content types
