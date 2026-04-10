# Architecture Overview

HTX has three extension points that work together to handle data, logic, and integration. Understanding when to use each is the key to building well-structured applications.

## The Three Layers

```
┌─────────────────────────────────────────────────────────┐
│                     MODULE                              │
│  The container. Registers adapters, providers,          │
│  middleware, and template processors at boot time.      │
│                                                         │
│  ┌───────────────────┐  ┌───────────────────────────┐   │
│  │     ADAPTER        │  │    CONTEXT PROVIDER        │  │
│  │                    │  │                            │  │
│  │ Data storage       │  │ Data pre-fetching          │  │
│  │ CRUD operations    │  │ Any source → template      │  │
│  │ Declarative access │  │ Programmatic access        │  │
│  │ (htx:type tags)    │  │ ({{ expression }} syntax)  │  │
│  └───────────────────┘  └───────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### Adapters — The Data Storage Layer

Adapters implement a standard CRUD interface for a specific storage backend. They are the only way templates can read and write data using declarative `htx:type` tags.

**What they do:**
- Query content (`adapter.query()`)
- Create records (`adapter.create()`)
- Update records (`adapter.update()`)
- Delete records (`adapter.delete()`)

**How templates use them:**
```html
<htx:type>post</htx:type>
<htx:where>status=published</htx:where>
<htx:order>newest</htx:order>
<htx>
<htx:each>
  <h2>__title__</h2>
  <p>__summary__</p>
</htx:each>
</htx>
```

**Available adapters:**
- **SQLite Adapter** — queries a local SQLite database
- **Convex Adapter** — queries Convex cloud database
- **Markdown Adapter** — reads `.md` files from disk

**Key characteristic:** Templates access adapters declaratively. The template says *what* data it needs, not *how* to get it. No arbitrary code runs in the template layer.

### Context Providers — The Data Pre-Fetching Layer

Context providers run server-side TypeScript that resolves data before template rendering. Whatever they return is injected into the `{{ expression }}` scope.

**What they do:**
- Fetch data from any source (database, API, computed values)
- Structure complex nested data
- Run multiple queries in parallel
- Inject results into template expressions

**How templates use them:**
```html
{{ each product in store.products }}
  <h2>{{ product.title }}</h2>
  <p>{{ product.price }}</p>
  {{ each review in product.reviews }}
    <blockquote>{{ review.text }}</blockquote>
  {{ endeach }}
{{ endeach }}
```

**Key characteristic:** Providers run arbitrary TypeScript on the server. They can call APIs, join data from multiple sources, compute values, and return pre-structured objects. The template only sees the final data.

### Modules — The Extension Container

Modules are the packaging layer. They don't directly interact with templates — they register the things that do.

**What they register:**
- **Adapters** — data storage backends
- **Context Providers** — data pre-fetching
- **Middleware** — request/response interception (auth, routing, API endpoints)
- **Template Processors** — transform template HTML (conditional blocks like `htx:auth`)
- **Mutation Handlers** — custom actions beyond standard CRUD
- **Helper Functions** — utility functions available in expressions

**How they work:**
```typescript
class MyModule implements Module {
  name() { return "my-module"; }

  boot(registry: ModuleRegistry) {
    registry.registerAdapter("my-db", new MyAdapter());
    registry.registerContextProvider("data", new MyProvider());
    registry.registerMiddleware(new MyMiddleware());
  }
}
```

**Key characteristic:** Modules run at boot time, not per-request. They wire up the system once, and the registered components handle individual requests.

## Request Lifecycle

Here's exactly when each layer runs during a request:

```
HTTP Request arrives
    │
    ▼
1. MIDDLEWARE (from modules)
    │  Auth checks, API route handling, request interception
    │  Can short-circuit the request (return early)
    │
    ▼
2. ROUTE MATCHING
    │  File-system router finds the .htx template
    │
    ▼
3. CONTEXT PROVIDERS (from modules)
    │  Each provider's resolve() runs with the request
    │  Results merged into template data scope
    │  store.* , auth.* , analytics.* become available
    │
    ▼
4. TEMPLATE PROCESSING
    │  a. Template processors run (htx:auth, htx:auth-none)
    │  b. htx:type blocks → ADAPTER queries (declarative)
    │  c. {{ expressions }} → evaluated with provider data
    │  d. __placeholders__ → hydrated from adapter results
    │
    ▼
5. LAYOUT WRAPPING
    │  _layout.htx applied
    │
    ▼
HTML Response
```

**Steps 3 and 4 are where adapters and providers differ.** Providers run in step 3 (before template processing). Adapters run in step 4b (during template processing, per `htx:type` block).

## When To Use Which

### Use an Adapter when:

- You need standard CRUD (create, read, update, delete)
- Your data lives in one storage backend (SQLite, Convex, markdown files)
- Templates should declare what data they need (declarative pattern)
- You want mutations via `htx:action` (save, update, delete)
- The query is simple: one content type, optional filters, ordering

### Use a Context Provider when:

- You need data from an external API (REST, GraphQL, third-party service)
- You need to join data from multiple sources in one page
- You need complex nested/structured data (products with categories with reviews)
- You want to batch multiple queries in parallel (`Promise.all`)
- Performance matters and you want to control the query strategy
- The data source doesn't fit the ContentAdapter CRUD interface

### Use both together when:

- An adapter handles the storage (SQLite for content)
- A provider pre-fetches and structures related data for complex pages
- Simple pages use `htx:type` directly, complex pages use provider data

This is the pattern used by the HTX Faster store: the Convex adapter handles individual queries via `htx:type`, while the `ConvexStoreContextProvider` batches multiple queries for the home page and collection pages.

## Security Model

| Layer | Runs | Arbitrary Code? | Template Access |
|-------|------|-----------------|-----------------|
| **Adapter** | Per htx:type block | No — implements fixed interface | Declarative (htx:type, htx:action tags) |
| **Context Provider** | Per request (step 3) | Yes — server-side TypeScript | Expression ({{ provider.data }}) |
| **Module** | At boot (once) | Yes — server-side TypeScript | Indirect (registers components) |
| **Template (.htx)** | Per request (step 4) | No — declarative HTML + expressions | Is the access point |
| **Middleware** | Per request (step 1) | Yes — server-side TypeScript | Can intercept/modify requests |

**The security boundary is the template.** Templates are declarative — they cannot execute arbitrary code, import modules, or access the filesystem. They can only:
- Query adapters via `htx:type`
- Read provider data via `{{ expressions }}`
- Submit mutations via `htx:action` (validated by action tokens)

This means templates can be safely rendered in shared environments — they cannot access the filesystem, run shell commands, or import modules. Modules and providers require server-side TypeScript and should only be loaded from trusted sources.

## Comparison Table

| | Adapter | Context Provider | Module |
|---|---|---|---|
| **Purpose** | Data storage CRUD | Data pre-fetching from any source | Extension container |
| **Interface** | `ContentAdapter` (query, create, update, delete) | `ContextProvider` (resolve) or `BaseContextProvider` (routes) | `Module` (name, boot) |
| **Template syntax** | `htx:type`, `htx:action`, `__placeholder__` | `{{ expression }}`, `{{ each }}` | None (indirect) |
| **Runs when** | During template processing (per block) | Before template processing (per request) | At app startup (once) |
| **Data source** | One specific backend | Any source | N/A |
| **Mutations** | Yes (save, update, delete) | No (read-only) | Can register mutation handlers |
| **Arbitrary code** | No (fixed interface) | Yes (server-side) | Yes (server-side) |
| **Examples** | SQLiteAdapter, ConvexAdapter, MarkdownAdapter | StoreContextProvider, ConvexStoreContextProvider, AuthProvider | BetterAuthModule, CartModule, TenantModule |

## See Also

- [Context Providers](/docs/context-providers) — BaseContextProvider, route patterns, data source examples
- [Module System](/docs/module-system) — registering components, middleware, lifecycle
- [SQLite Adapter](/docs/sqlite-adapter) — local database adapter
- [Convex Adapter](/docs/convex-adapter) — cloud database adapter
- [Markdown Adapter](/docs/markdown-adapter) — file-based content adapter
