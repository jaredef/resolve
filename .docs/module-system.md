The HTX module system lets you extend the engine with pluggable features — cart, analytics, comments, search — without writing application code. Modules register middleware, context providers, template functions, and content adapters. Templates consume the data with standard expressions.

## The Module Interface

A module is a class with a name and a boot method:

```typescript
import type { Module, ModuleRegistry } from "@htx/engine";

export class CartModule implements Module {
  name() { return "cart"; }

  boot(registry: ModuleRegistry) {
    registry.registerMiddleware(new CartMiddleware());
    registry.registerContextProvider("cart", new CartContextProvider());
    registry.registerFunction("formatPrice", (v) => "$" + Number(v).toFixed(2));
  }
}
```

Register modules when creating the request handler:

```typescript
const handler = new RequestHandler(router, parser, ..., {
  modules: [new CartModule(adapter), new AnalyticsModule()],
});
```

The engine calls `boot()` for each module at startup. The module registers its resources with the registry. If a module's boot fails, the error is caught and logged — other modules continue booting. The app starts in a degraded state with a console warning.

## Lifecycle Hooks

Beyond `boot()`, modules can implement optional lifecycle hooks:

```typescript
export class DatabaseModule implements Module {
  name() { return "database"; }

  boot(registry: ModuleRegistry) {
    // Register resources
  }

  onReady() {
    // Called after all modules boot. Run migrations, warm caches.
  }

  onShutdown() {
    // Called on process exit. Close connections, flush buffers.
  }
}
```

Both hooks support async (return a Promise).

## Context Providers

A context provider injects data into every template on every request. Register with a namespace:

```typescript
class CartContextProvider implements ContextProvider {
  resolve(request: HtxRequest): Record<string, unknown> {
    const items = readCartFromCookie(request);
    return { count: items.length, items, total: sumPrices(items) };
  }
}

registry.registerContextProvider("cart", new CartContextProvider());
```

Templates access the data via dot notation:

```
Cart: {{ cart.count }} items, ${{ cart.total }}

{{ each item in cart.items }}
  {{ item.title }} — ${{ item.price }}
{{ endeach }}
```

Chained dot access works: `{{ cart.shipping.address.city }}`.

### Error Isolation

If a context provider throws an error, the engine catches it, logs a warning, and injects an empty object (`{}`) for that namespace. Other providers and the rest of the template pipeline continue normally. The page renders — it just lacks the failed provider's data.

### Performance

Context providers run per-request. Keep them fast:
- Use indexed database queries
- Return early for paths your module does not handle
- Cache expensive computations if the data does not change per-request

```typescript
resolve(request: HtxRequest): Record<string, unknown> {
  // Early return for irrelevant routes
  if (!request.path.startsWith("/store")) return {};

  // Fast indexed query
  return { products: this.db.query("SELECT ...").all() };
}
```

## Middleware

Middleware intercepts requests before the template pipeline. It can handle API routes, set cookies, modify requests, or pass through to the template.

```typescript
class CartMiddleware implements Middleware {
  handle(request: HtxRequest, next: NextMiddleware) {
    if (request.path === "/api/cart/add" && request.method === "POST") {
      const slug = String(request.body.slug);
      const setCookie = addToCart(request, slug);
      return {
        status: 200,
        body: '<div>Added to cart!</div>',
        headers: { "Content-Type": "text/html" },
        cookies: [setCookie],
      };
    }

    // Not a cart route — pass to next middleware or template pipeline
    return next(request);
  }
}
```

### Middleware Chain

Middleware runs in registration order. Each middleware either:
- Returns an HtxResponse (short-circuits — the template pipeline does not run)
- Calls `next(request)` to pass through to the next middleware or the template pipeline

```
Request → Middleware A → Middleware B → Template Pipeline → Response
              ↓                ↓
         (short-circuit)  (short-circuit)
```

### Error Isolation

If a middleware throws, the engine catches the error, logs it, and passes the request through to the next middleware. The request is not killed by one bad middleware.

### Setting Cookies

Middleware can set cookies via the `cookies` field on the response. Each entry is a raw `Set-Cookie` header string:

```typescript
return {
  status: 200,
  body: "...",
  headers: { "Content-Type": "text/html" },
  cookies: ["session=abc123; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400"],
};
```

### Setting Headers

Any standard HTTP header can be set on the response:

```typescript
return {
  status: 200,
  body: "...",
  headers: {
    "Content-Type": "application/json",
    "X-Request-Id": crypto.randomUUID(),
    "Cache-Control": "no-cache",
  },
};
```

## Template Functions

Modules can register functions callable from expressions:

```typescript
registry.registerFunction("formatPrice", (value: unknown) =>
  "$" + Number(value).toFixed(2)
);

registry.registerFunction("timeAgo", (date: unknown) => {
  // Return human-readable time difference
});
```

Templates use them with pipe syntax:

```
{{ price | formatPrice }}
{{ created_at | timeAgo }}
```

### Conflict Detection

If two modules register a function with the same name, the engine logs a warning. The second registration overwrites the first. To avoid conflicts, prefix function names with your module namespace:

```typescript
registry.registerFunction("cart_formatPrice", ...);
```

## Content Adapters

Modules can register content adapters for custom data sources:

```typescript
registry.registerAdapter("products", new ShopifyAdapter(apiKey));
```

Templates query the adapter with the matching type:

```html
<htx:type>products</htx:type>
<htx:where>status=active</htx:where>
<htx>
<htx:each>
  <div>__title__ — $__price__</div>
</htx:each>
</htx>
```

The engine routes the query to the registered adapter. If no adapter matches the type, the default adapter handles it.

## ModuleRegistry API

| Method | Purpose | Template Access |
|--------|---------|----------------|
| `registerContextProvider(name, provider)` | Per-request data injection | `{{ name.field }}` in expressions |
| `registerMiddleware(middleware)` | Request interception / API routes | Runs before templates |
| `registerFunction(name, handler)` | Expression functions | `{{ value \| name }}` in expressions |
| `registerAdapter(name, adapter)` | Content data sources | `<htx:type>name</htx:type>` |

## Error Handling Summary

| Surface | Error Behavior |
|---------|---------------|
| Module boot | Caught, logged, other modules continue. App warns about degraded state. |
| Middleware | Caught, logged, request passes through to next middleware. |
| Context provider | Caught, logged, empty object injected. Template renders without that data. |
| Template function | Caught by expression engine, renders empty or error inline. |

## Creating a Module: Step by Step

1. Create a class implementing the `Module` interface
2. In `boot()`, register your middleware, context providers, functions, and adapters
3. Add the module to the `modules` array in the request handler options
4. Write templates that use your module's data

```typescript
// 1. Define the module
export class AnalyticsModule implements Module {
  name() { return "analytics"; }

  boot(registry: ModuleRegistry) {
    // 2. Register resources
    registry.registerMiddleware(new TrackingMiddleware());
    registry.registerContextProvider("analytics", new AnalyticsProvider());
    registry.registerFunction("formatNumber", (v) => Number(v).toLocaleString());
  }
}

// 3. Register in the app
const handler = new RequestHandler(router, parser, ..., {
  modules: [new AnalyticsModule()],
});
```

```html
<!-- 4. Use in templates -->
<p>{{ analytics.pageViews | formatNumber }} page views today</p>
```

No configuration files. No plugin discovery. No magic. The module registers what it provides, templates consume what they need.

## Built-in Example: Cart Module

The e-commerce cart on this site is a module with three registrations:

**Middleware** — Handles `/api/cart/add` and `/api/cart/remove` POST requests. Reads and writes a JSON cookie. Returns htmx-compatible HTML fragments.

**Context Provider** — On every request, reads the cart cookie, queries SQLite for product details, computes totals. Injects `{{ cart.count }}`, `{{ cart.items }}`, `{{ cart.total }}`.

**Template Function** — `formatPrice(value)` for currency formatting.

The cart page at `/store/cart` is a pure HTX template. The "Add to Cart" button is an htmx form posting to the middleware route. The nav cart badge reads `{{ cart.count }}` from the context provider. Zero application code.


## Modules vs Adapters vs Context Providers

A common question: when do I write a module, when do I write an adapter, and when do I write a context provider?

**A module is the container.** It doesn't directly serve data to templates. It registers the things that do.

**An adapter is a data backend.** It implements CRUD for a specific storage system. Templates access it declaratively via `htx:type` tags.

**A context provider is a data pre-fetcher.** It runs arbitrary code to gather data from any source and injects it into template expressions.

A typical module registers one or more of these:

```typescript
class EcommerceModule implements Module {
  name() { return "ecommerce"; }

  boot(registry: ModuleRegistry) {
    // Adapter: handles CRUD for products in SQLite
    registry.registerAdapter("product", new SQLiteAdapter(productDb));

    // Context provider: pre-fetches cart, categories, featured products
    registry.registerContextProvider("shop", new ShopProvider(productDb));

    // Middleware: handles /api/cart/* endpoints
    registry.registerMiddleware(new CartApiMiddleware());

    // Helper function: format currency in templates
    registry.registerFunction("formatPrice", (cents) => "$" + (cents / 100).toFixed(2));
  }
}
```

### What Each Registration Does

| Registration | Purpose | Template Access |
|---|---|---|
| `registerAdapter` | Adds a data backend for htx:type queries | `<htx:type>product</htx:type>` |
| `registerContextProvider` | Pre-fetches data into expression scope | `{{ shop.cart.count }}` |
| `registerMiddleware` | Intercepts requests (APIs, auth, routing) | Indirect (modifies request/response) |
| `registerTemplateProcessor` | Transforms template HTML | `<htx:auth>`, `<htx:auth-none>` |
| `registerMutationHandler` | Custom mutation actions | `htx:action="custom-action"` |
| `registerFunction` | Helper functions for expressions | `{{ formatPrice(product.price) }}` |

### Security Implications

Modules, context providers, and middleware all run **server-side TypeScript** — they can execute arbitrary code. This is why:

- In shared environments, restrict access to templates only (declarative, safe)
- In isolated environments, custom modules can run arbitrary server-side code safely

Templates themselves are always safe. They can only access data through the declarative adapter interface or the expression scope populated by providers.

See [Architecture Overview](/docs/architecture-overview) for the full request lifecycle and decision matrix.

### Advanced Example: The RealtimeModule

The `RealtimeModule` demonstrates how a single module can register multiple surfaces to provide a complete feature:

```typescript
import { RealtimeModule } from "@htx/engine";

const rt = new RealtimeModule({
  secretKey: process.env.SECRET_KEY,
  tokenTtl: 60,
  resolveUserId: (request) => getUserFromSession(request),
  onMessage: (ws, parsed, userId) => { /* app handlers */ return false; },
  onBinary: (ws, data, userId) => { /* binary frames */ return false; },
});
```

On `boot()`, it registers:

1. **Context provider** (`ws`) — injects `{{ ws.token }}` and `{{ ws.url }}` into every template, enabling WebSocket connections from `htx:script` blocks
2. **Middleware** — handles `POST /api/ws/token` for JWT refresh, allowing long-lived pages to reconnect without a full reload

Beyond `boot()`, the module exposes methods that wire into `Bun.serve` directly:
- `handleUpgrade()` — validates JWT tokens and upgrades HTTP to WebSocket
- `getWebSocketConfig()` — returns Bun's open/message/close handlers
- `publisher` — lets other modules broadcast events to connected clients

This pattern — registering standard surfaces in `boot()` while exposing additional methods for server-level integration — is useful for features that span both the HTX request pipeline and the underlying runtime.

See the [Real-Time Connections](/docs/real-time-connections) and [Real-Time Implementation Guide](/docs/realtime-implementation-guide) for full usage.
