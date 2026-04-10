The SQLite adapter is the default content storage backend. It uses Bun's native `bun:sqlite` driver for zero-FFI-overhead database access.

## Setup

```typescript
import { SQLiteAdapter } from "@htx/adapter-sqlite";
const adapter = new SQLiteAdapter("app/data/database.sqlite");
```

The adapter creates the `content` table automatically if it does not exist. SQLite is configured with WAL journal mode for concurrent reads.

## Content Table Schema

| Column | Type | Description |
|--------|------|-------------|
| `id` | INTEGER | Auto-increment primary key |
| `type` | TEXT | Content type (e.g., "post", "documentation") |
| `slug` | TEXT | URL-friendly identifier |
| `title` | TEXT | Display title |
| `body` | TEXT | Raw content (markdown) |
| `status` | TEXT | Publication status |
| `meta` | TEXT | JSON column for custom fields |
| `created_at` | TEXT | Creation timestamp |
| `updated_at` | TEXT | Last update timestamp |

## The Meta JSON Pattern

Fields beyond the system columns are stored as JSON in the `meta` column. The adapter transparently encodes and decodes:

```typescript
// Writing: extra fields go into meta JSON
adapter.create("post", {
  title: "My Post",        // → title column
  slug: "my-post",         // → slug column  
  body: "# Hello",         // → body column
  status: "published",     // → status column
  category: "tech",        // → meta.category
  featured: true,          // → meta.featured
  author: "Jane",          // → meta.author
});

// Reading: meta fields are flattened into the result
const post = adapter.findBySlug("post", "my-post");
// { id: 1, type: "post", slug: "my-post", title: "My Post",
//   body: "# Hello", status: "published", category: "tech",
//   featured: true, author: "Jane", body_html: "<h1>Hello</h1>" }
```

## Markdown Rendering

When a record is created or updated with a `body` field, the adapter automatically renders it to HTML using `cmark-gfm` (a C markdown library). The rendered HTML is stored as `body_html` in the meta JSON.

- GFM tables, autolinks, and raw HTML are supported
- HTX syntax inside code blocks is auto-escaped (backslash prefix)
- Zero runtime cost for reads — `body_html` is pre-rendered at write time
- Requires `cmark-gfm` system package: `sudo apt install cmark-gfm`

## Querying

### Where Conditions

```html
<htx:where>status=published</htx:where>
<htx:where>status=published,category=tech</htx:where>
<htx:where>price>100</htx:where>
```

System columns are queried directly. Custom fields use `json_extract(meta, '$.field')`.

### JSON Indexes

For large datasets, create indexes on frequently queried JSON fields:

```sql
CREATE INDEX idx_product_category
ON content(type, json_extract(meta, '$.category_id'))
WHERE type = 'store-product';
```

This changes query performance from O(n) table scan to O(log n) B-tree lookup.

## API

```typescript
// Query with filters, ordering, pagination
adapter.query({ type: "post", where: "status=published", order: "newest", howmany: 10 });

// Find by ID or slug
adapter.find("post", 42);
adapter.findBySlug("post", "my-post");

// Create (auto-renders markdown, auto-generates slug)
adapter.create("post", { title: "New Post", body: "Content...", status: "draft" });

// Update (merges with existing data)
adapter.update("post", 42, { status: "published" });

// Delete
adapter.delete("post", 42);
```


## SQLite Adapter vs Context Provider

The SQLite adapter and a context provider can both serve data to templates, but they work differently:

**Use the adapter directly (via htx:type) when:**
- You need a simple query: list posts, get a page by slug
- You want mutations (create, update, delete via htx:action)
- One content type per template block is sufficient

```html
<!-- Adapter pattern: declarative, one query per block -->
<htx:type>post</htx:type>
<htx:where>status=published</htx:where>
<htx>
<htx:each>
  <h2>__title__</h2>
</htx:each>
</htx>
```

**Use a context provider backed by SQLite when:**
- You need data from multiple content types on one page
- You need pre-structured nested data (posts with their categories and tags)
- You want to batch queries with Promise.all for performance

```typescript
// Context provider pattern: programmatic, multiple queries
class BlogProvider extends BaseContextProvider {
  routes() {
    return {
      "/": () => this.resolveHomePage(),
    };
  }

  private async resolveHomePage() {
    const posts = this.db.query("SELECT * FROM content WHERE type = 'post'").all();
    const categories = this.db.query("SELECT * FROM content WHERE type = 'category'").all();
    return { posts, categories };
  }
}
```

**Both can coexist.** Simple pages use htx:type blocks (adapter). Complex pages use provider data via {{ expressions }}. The adapter handles mutations either way.

See [Architecture Overview](/docs/architecture-overview) for the full picture of how adapters, providers, and modules relate.
