Context providers inject server-side data into your templates before rendering. They are the bridge between any data source and the HTX expression engine — whatever a provider returns shows up in `{{ }}` expressions.

## How It Works

A context provider is registered with a name (e.g., "store") and implements a single method: `resolve(request)`. Whatever object it returns is available in templates under that name.

```
HTTP Request
    |
    v
Context Providers resolve (per-request)
    |  store.resolve()     -> { products: [...], count: 42 }
    |  analytics.resolve() -> { views_today: 100 }
    |
    v
Template Rendering
    |  {{ store.count }} -> 42
    |  {{ each prod in store.products }} -> iterates
    |
    v
HTML Response
```

## The Interface

```typescript
interface ContextProvider {
  resolve(request: HtxRequest): MaybePromise<Record<string, unknown>>;
}
```

One method. Return an object. The keys become template variables. That's it.

## BaseContextProvider

The engine ships `BaseContextProvider` — an abstract class that handles route matching, parameter extraction, and error isolation. Extend it instead of implementing the raw interface.

```typescript
import { BaseContextProvider } from "@htx/engine";

class ProductProvider extends BaseContextProvider {
  routes() {
    return {
      "/products": () => this.listProducts(),
      "/products/:slug": (params) => this.getProduct(params.slug),
      "/categories": () => this.listCategories(),
      "/categories/:slug": (params) => this.getCategory(params.slug),
    };
  }

  private async listProducts() {
    const products = await db.query("SELECT * FROM products").all();
    return { products, count: products.length };
  }

  private async getProduct(slug) {
    const product = await db.query("SELECT * FROM products WHERE slug = ?").get(slug);
    const related = await db.query("SELECT * FROM products WHERE category_id = ?").all(product.category_id);
    return { product, related };
  }

  private async listCategories() {
    return { categories: await db.query("SELECT * FROM categories").all() };
  }

  private async getCategory(slug) {
    const category = await db.query("SELECT * FROM categories WHERE slug = ?").get(slug);
    const products = await db.query("SELECT * FROM products WHERE category_slug = ?").all(slug);
    return { category, products };
  }
}
```

### What BaseContextProvider Handles

| Feature | Description |
|---------|-------------|
| **Route matching** | URL patterns with `:param` extraction |
| **Error isolation** | Failed resolve returns `{}`, logs error, doesn't crash the request |
| **Route scoping** | Only calls data methods for matching paths |
| **Param extraction** | `/products/:slug` extracts `{ slug: "cool-widget" }` from `/products/cool-widget` |
| **Async support** | Handlers can be sync or async |

## Registering a Provider

Providers are registered through the module system:

```typescript
import type { Module, ModuleRegistry } from "@htx/engine";

class ProductModule implements Module {
  name() { return "product-data"; }

  boot(registry: ModuleRegistry) {
    registry.registerContextProvider("store", new ProductProvider());
  }
}
```

The first argument to `registerContextProvider` is the template scope name. Here, `"store"` means the provider's data is accessed as `{{ store.products }}`, `{{ store.count }}`, etc.

## Using Provider Data in Templates

Once registered, the data is available in any template via the expression engine:

```html
<!-- /products page -->
<h1>Products ({{ store.count }})</h1>

{{ each prod in store.products }}
  <div class="product-card">
    <h2>{{ prod.title }}</h2>
    <p>${{ prod.price }}</p>
    <a href="/products/{{ prod.slug }}">View</a>
  </div>
{{ endeach }}

<!-- /products/cool-widget page -->
<h1>{{ store.product.title }}</h1>
<p>${{ store.product.price }}</p>
<p>{{ store.product.description }}</p>

<h2>Related Products</h2>
{{ each rel in store.related }}
  <a href="/products/{{ rel.slug }}">{{ rel.title }}</a>
{{ endeach }}
```

## Data Source Examples

Context providers work with any data source. The template doesn't know or care where the data comes from.

### SQLite
```typescript
private async listProducts() {
  const rows = db.query("SELECT * FROM products WHERE status = 'published'").all();
  return { products: rows };
}
```

### Convex (Cloud Database)
```typescript
private async listProducts() {
  const result = await convexClient.query(api.content.filtered, { type: "product" });
  return { products: result.rows };
}
```

### REST API
```typescript
private async listProducts() {
  const res = await fetch("https://api.example.com/products");
  const products = await res.json();
  return { products };
}
```

### In-Memory / Computed
```typescript
private async resolveStats() {
  return {
    uptime: process.uptime(),
    memory: process.memoryUsage().heapUsed,
    timestamp: new Date().toISOString(),
  };
}
```

## Performance: Batching with Promise.all

For pages that need multiple data queries, use `Promise.all` to run them in parallel:

```typescript
private async resolveHomePage() {
  const [products, categories, featured] = await Promise.all([
    this.fetchProducts(),
    this.fetchCategories(),
    this.fetchFeatured(),
  ]);
  return { products, categories, featured };
}
```

This is especially important for network-backed providers (Convex, REST APIs) where sequential queries add latency.

## Context Providers vs htx:type Queries

Both fetch data for templates. When to use which:

| | htx:type (Declarative) | Context Provider |
|---|---|---|
| **Defined in** | Template (.htx file) | TypeScript module |
| **Data source** | Registered adapters only | Any source |
| **Query style** | Declarative tags | Programmatic |
| **Nesting** | One query per block | Pre-structured nested data |
| **Performance** | Sequential per block | Parallel with Promise.all |
| **Best for** | Simple single-type queries | Complex multi-source pages |

Use `htx:type` for straightforward queries (list posts, get a page by slug). Use context providers when you need data from multiple sources, complex joins, or pre-structured nested objects.

## Multiple Providers

You can register multiple providers — each gets its own namespace:

```typescript
registry.registerContextProvider("store", new ProductProvider());
registry.registerContextProvider("analytics", new AnalyticsProvider());
registry.registerContextProvider("auth", new AuthProvider());
```

In templates:
```html
<p>Welcome, {{ auth.name }}</p>
<p>{{ analytics.views_today }} views today</p>
<p>{{ store.count }} products</p>
```
