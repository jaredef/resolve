The Convex adapter connects HTX to Convex — a cloud-hosted reactive database. Content queries, mutations, and all CRUD operations work through Convex's deployed server functions, giving you real-time sync, automatic caching, and global distribution.

## Architecture

Unlike SQLite (in-process) or a traditional database (network connection), Convex uses a split architecture:

1. **Convex functions** — query and mutation functions deployed to Convex's cloud
2. **ConvexHttpClient** — Bun-side adapter calls those functions via HTTP

```
HTX Template → ContentAdapter → ConvexHttpClient → Convex Cloud → Your Functions → Database
```

Templates use the same directives — `<htx:type>`, `<htx:where>`, `<htx:each>` — regardless of whether the data comes from SQLite or Convex.

## Setup

### Step 1: Install dependencies

```bash
bun add convex
```

### Step 2: Initialize Convex project

```bash
bunx convex dev
```

This authenticates with Convex, creates a project, and generates the `convex/` directory. You'll get a deployment URL like `https://small-mouse-123.convex.cloud`.

### Step 3: Deploy the content schema and functions

Copy the provided `convex/schema.ts` and `convex/content.ts` files into your project's `convex/` directory. These define the content table schema and the query/mutation functions that the adapter calls.

```bash
bunx convex deploy
```

### Step 4: Register the adapter

```typescript
import { ConvexAdapter } from "@htx/adapter-convex";
import { api } from "./convex/_generated/api";

const convexAdapter = new ConvexAdapter(
  { url: process.env.CONVEX_URL! },
  api,
);

const registry = new AdapterRegistry({
  default: sqliteAdapter,           // Keep SQLite for local content
  posts: convexAdapter,             // Use Convex for posts
  products: convexAdapter,          // Use Convex for products
});
```

Or use Convex as the default adapter for everything:

```typescript
const registry = new AdapterRegistry({
  default: convexAdapter,
});
```

## Template Usage

Templates work identically — the adapter is transparent:

```html
<htx:type>post</htx:type>
<htx:where>status=published</htx:where>
<htx:order>newest</htx:order>
<htx:howmany>10</htx:howmany>
<htx>
<htx:each>
  <article>
    <h2>__title__</h2>
    <p>__summary__</p>
  </article>
</htx:each>
</htx>
```

The engine calls `convexAdapter.query()`, which calls the deployed Convex function, which queries the cloud database and returns rows. The template doesn't know the data came from the cloud.

## The Content Schema

The Convex content table mirrors the SQLite adapter's schema:

| Field | Type | Description |
|-------|------|-------------|
| `type` | string | Content type (post, product, etc.) |
| `slug` | string | URL-friendly identifier |
| `title` | string | Display title |
| `body` | string | Raw content |
| `status` | string | Publication status |
| `meta` | object | Custom fields (same as SQLite's JSON meta column) |
| `createdAt` | string | Creation timestamp |
| `updatedAt` | string | Last update timestamp |
| `_id` | string | Convex auto-generated ID |
| `_creationTime` | number | Convex auto-generated timestamp |

Indexes are defined on `type`, `type+slug`, and `type+status` for fast queries.

## Custom Fields (Meta)

Just like the SQLite adapter, custom fields are stored in the `meta` object and flattened into the content row on read:

```typescript
// Creating a product with custom fields
adapter.create("product", {
  title: "Widget Pro",
  slug: "widget-pro",
  price: "29.99",      // → stored in meta.price
  category: "tools",    // → stored in meta.category
  status: "published",
});

// Reading — meta fields are flattened
const product = await adapter.findBySlug("product", "widget-pro");
// { id: "...", type: "product", slug: "widget-pro", title: "Widget Pro",
//   price: "29.99", category: "tools", status: "published", ... }
```

## Where Conditions

The adapter translates HTX where conditions into Convex filter expressions:

```html
<htx:where>status=published,category=tools</htx:where>
```

Supported operators: `=`, `!=`, `>`, `<`, `>=`, `<=`

## Ordering

| HTX Order | Convex Behavior |
|-----------|----------------|
| `newest` | `_creationTime` descending |
| `oldest` | `_creationTime` ascending |
| `updated` | `_creationTime` descending (approximation) |
| `alpha` | Post-query sort (Convex doesn't support arbitrary field ordering without indexes) |

## Pagination

The adapter supports `howmany` and `offset` via Convex's `.take()` and post-query slicing. For large datasets, Convex's native cursor-based pagination is more efficient — but the adapter handles the translation transparently.

## Multi-Adapter Setup

Use Convex for some content types and SQLite for others:

```typescript
const registry = new AdapterRegistry({
  default: new SQLiteAdapter("app/data/database.sqlite"),
  products: convexAdapter,   // Products in the cloud
  orders: convexAdapter,     // Orders in the cloud
  // documentation, posts, etc. stay in local SQLite
});
```

Templates query by type — the engine routes to the correct adapter automatically.

## Why Convex

| Feature | SQLite | Convex |
|---------|--------|--------|
| Latency | <1ms (in-process) | 5-50ms (network) |
| Deployment | Single file | Cloud-hosted |
| Multi-instance | Single writer | Multi-writer safe |
| Real-time | None | Built-in subscriptions |
| Scaling | Single server | Automatic |
| Cost | Free | Free tier, then paid |
| Offline | Works offline | Requires internet |

**Use SQLite when:** Single-server deployment, maximum performance, offline capability, zero infrastructure.

**Use Convex when:** Multi-instance deployments, real-time collaboration, global distribution, managed infrastructure.

## Convex Functions

The adapter requires these deployed functions in your `convex/content.ts`:

- `content.list` — query by type with optional status filter and ordering
- `content.getById` — find by Convex document ID
- `content.getBySlug` — find by type + slug (indexed)
- `content.filtered` — query with arbitrary where conditions, ordering, pagination
- `content.create` — insert new content row
- `content.update` — patch existing row
- `content.remove` — delete row

Schema and function files are provided in the `packages/htx-adapter-convex/convex/` directory.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `CONVEX_URL` | Convex deployment URL (e.g., `https://small-mouse-123.convex.cloud`) |


## Convex Adapter vs Context Provider

The Convex adapter supports two access patterns. Understanding when to use each is important for performance.

### Pattern 1: Adapter via htx:type (Declarative)

Each `htx:type` block makes one Convex API call. Simple, but sequential — three blocks means three network round-trips.

```html
<!-- Each block = one network request to Convex -->
<htx:type>fp-collection</htx:type>
<htx:where>status=published</htx:where>
<htx>
<htx:each>
  <h2>__title__</h2>
</htx:each>
</htx>
```

**Best for:** Simple pages with one or two queries. Category pages, single product views.

### Pattern 2: Context Provider (Programmatic)

A context provider batches multiple Convex queries with `Promise.all`, resolving them in parallel before the template renders.

```typescript
class ConvexStoreProvider extends BaseContextProvider {
  routes() {
    return {
      "/store": () => this.resolveHomePage(),
      "/store/collections/:slug": (params) => this.resolveCollection(params.slug),
    };
  }

  private async resolveHomePage() {
    // All three queries run in parallel — one round-trip window
    const [collections, categories, featured] = await Promise.all([
      this.query("fp-collection", [{ field: "status", op: "eq", value: "published" }]),
      this.query("fp-category", [{ field: "status", op: "eq", value: "published" }]),
      this.query("fp-product", [{ field: "featured", op: "eq", value: "true" }]),
    ]);
    return { collections, categories, featured };
  }
}
```

Template uses `{{ expression }}` syntax instead of `htx:type`:

```html
{{ each coll in fp.collections }}
  <h2>{{ coll.title }}</h2>
  {{ each cat in coll.categories }}
    <a href="/store/{{ cat.slug }}">{{ cat.title }}</a>
  {{ endeach }}
{{ endeach }}
```

**Best for:** Pages that need multiple content types, nested data, or maximum performance. Home pages, dashboards, collection views.

### Performance Comparison

| | Adapter (htx:type) | Context Provider |
|---|---|---|
| 3 queries | ~150-600ms (sequential) | ~50-200ms (parallel) |
| Nested data | Not possible (flat per block) | Pre-structured in resolve() |
| Network calls | 1 per htx:type block | Batched via Promise.all |
| Template syntax | __placeholder__ hydration | {{ expression }} evaluation |

### Using Both Together

The adapter handles mutations (htx:action). The provider handles reads. This is the recommended pattern for Convex-backed applications:

- **Reads:** Context provider with `Promise.all` batching
- **Writes:** `htx:action` with the Convex adapter (save, update, delete)

See [Architecture Overview](/docs/architecture-overview) for the full picture of how adapters, providers, and modules relate.
