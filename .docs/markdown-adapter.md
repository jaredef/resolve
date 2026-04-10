The Markdown adapter reads content from flat `.md` files with YAML-style frontmatter. It is read-only — content is authored as files on disk.

## Setup

```typescript
import { MarkdownAdapter } from "@htx/adapter-markdown";
const adapter = new MarkdownAdapter("content/");
```

The adapter recursively scans the content directory for `.md` files at construction time.

## File Structure

```
content/
  documentation/
    getting-started.md
    routing.md
    templates.md
  blog/
    hello-world.md
    benchmarks.md
```

The first directory segment becomes the content `type`. The filename (without `.md`) becomes the `slug`.

## Frontmatter

Each file can include YAML-style frontmatter:

```markdown
---
title: Getting Started
slug: getting-started
status: published
section: core-concepts
order: 1
---

Your markdown content here...
```

### Supported Fields

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Display title (overrides filename) |
| `slug` | string | URL slug (overrides filename) |
| `status` | string | Publication status |
| `id` | string/number | Custom ID (overrides auto-generated) |
| `created_at` | string | Creation date |
| `updated_at` | string | Last update date |
| Any other key | any | Stored as custom metadata |

## Querying

The adapter supports the same query interface as SQLite:

```html
<htx:type>documentation</htx:type>
<htx:where>status=published,section=core-concepts</htx:where>
<htx:order>oldest</htx:order>
<htx>
<htx:each>
  <a href="/docs/__slug__">__title__</a>
</htx:each>
</htx>
```

## Read-Only

The Markdown adapter does not support `create()`, `update()`, or `delete()`. These methods throw errors. Content is managed by editing files on disk.

## Multi-Adapter Setup

Use both adapters together with the AdapterRegistry:

```typescript
const registry = new AdapterRegistry({
  default: new SQLiteAdapter("data/database.sqlite"),
  documentation: new MarkdownAdapter("content/"),
});
```

Templates querying `<htx:type>documentation</htx:type>` route to the Markdown adapter. All other types use SQLite.
