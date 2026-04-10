# Authenticated Islands

Authenticated Islands is a pattern for embedding rich, client-rendered interactive components within server-rendered HTX pages. The server pushes JavaScript via [Client State Transfer](/docs/client-state-transfer), and that JavaScript opens a second HTTP connection to a module-level JSON API — bypassing the HTX template rendering pipeline entirely.

The result: React-style client rendering in isolated islands, gated by the [Real-Time Connections](/docs/real-time-connections), with no build step, no framework, and no separate authentication flow.

## The Model

```
Server-Rendered Shell (HTX templates)
  └── Real-Time Connections (JWT authentication)
       └── Pushed JS Island (Client State Transfer)
            ├── Channel Token (scoped JWT, issued with module)
            └── Module HTTP Channel (/api/channel/{module}/{path})
                 ├── ChannelMiddleware (validates token, routes to handler)
                 └── ChannelHandler (returns JSON data)
```

Most of the page is server-rendered HTML. Specific regions are designated as "island hosts" — container elements where pushed JavaScript takes over, fetches data via authenticated HTTP, and renders DOM client-side.

## Channel Tokens

Channel tokens are JWTs separate from both the session cookie and the WebSocket token. They are:

- **Scoped** — issued for a specific module name. A token for `data-grid` cannot access `analytics`.
- **Short-lived** — 120-second TTL, refreshable via `POST /api/channel/{module}/token`.
- **Explicit** — delivered alongside the pushed code in the WebSocket `module` message.

Token claims:
```json
{
  "sub": "user-id",
  "htx-context": "channel:data-grid",
  "jti": "unique-id",
  "iat": 1711929600,
  "exp": 1711929720
}
```

**Why separate tokens?** The session cookie authenticates the user to the HTX application. The channel token authenticates the island to a specific module's API. Different scopes, different lifetimes, different revocation paths. If a channel token leaks, only that module's data is exposed — and only for 120 seconds.

## The ChannelHandler Interface

Modules serve JSON data by implementing `ChannelHandler`:

```typescript
import type { ChannelHandler } from "@htx/engine";

class AnalyticsChannelHandler implements ChannelHandler {
  module(): string {
    return "analytics";
  }

  async handle(subPath: string, query: Record<string, string>, userId: string) {
    if (subPath === "events") {
      const events = await this.fetchEvents(userId, query);
      return { status: 200, data: { events } };
    }

    if (subPath === "summary") {
      const summary = await this.computeSummary(userId);
      return { status: 200, data: summary };
    }

    return { status: 404, data: { error: "Not found" } };
  }
}
```

Register it during `boot()`:

```typescript
export class AnalyticsModule implements Module {
  name() { return "analytics"; }

  boot(registry: ModuleRegistry) {
    registry.registerChannelHandler(new AnalyticsChannelHandler());
  }
}
```

The engine's `ChannelMiddleware` automatically handles routing, token validation, and token refresh for all registered handlers.

## HTTP API

Channel endpoints follow the pattern `/api/channel/{moduleName}/{subPath}`:

```
GET /api/channel/data-grid/items?page=2&limit=10
Authorization: Bearer eyJ...

→ 200 { "items": [...], "page": 2, "total": 42 }
```

```
POST /api/channel/data-grid/token
Authorization: Bearer eyJ...

→ 200 { "token": "eyJ...", "expires_at": "2026-04-02 01:30:00" }
```

The middleware validates the Bearer token's `htx-context` claim against the URL's module name. A token scoped to `channel:analytics` cannot access `/api/channel/data-grid/items`.

## Writing the Pushed JavaScript

The server stores island code as strings in the `MODULES` registry, alongside existing Client State Transfer modules. When a client requests the module, the server sends the code plus a channel token.

The pushed code receives four bindings:

| Binding | Type | Description |
|---------|------|-------------|
| `ws` | `WebSocket` | The authenticated WebSocket connection |
| `el` | `HTMLElement` | The island host element |
| `channelToken` | `string` | The scoped JWT for HTTP API access |
| `channelFetch` | `function` | Pre-bound fetch wrapper for this module |

`channelFetch(subPath, options?)` is the primary way to access the channel API:

```javascript
// Fetches /api/channel/data-grid/items?page=1
channelFetch('items?page=1').then(function(res) {
  return res.json();
}).then(function(data) {
  // Render data into el
});
```

It automatically:
- Attaches the `Authorization: Bearer` header
- Refreshes the token proactively when 70% of TTL has elapsed
- Retries once on 401 with a fresh token

## Client Helper Integration

The `HtxRealtime` class provides `requestModule(name, el)` for the full lifecycle:

```html
<script src="/js/htx-realtime.js"></script>
<div id="island-host">Loading...</div>
<htx:script>
  var rt = new HtxRealtime('{{ ws.token }}');

  rt.on('open', function() {
    rt.requestModule('data-grid', el).then(function(result) {
      console.log('Island loaded, token:', result.channelToken ? 'yes' : 'no');
    });
  });
</htx:script>
```

`requestModule` handles: WebSocket request, response matching, channel token storage, code execution with all four bindings, and Promise resolution.

## Example: Data Grid Island

A complete island that fetches paginated data and renders a table:

**Server: ChannelHandler**
```typescript
class DataGridChannelHandler implements ChannelHandler {
  module() { return "data-grid"; }

  async handle(subPath, query, userId) {
    const page = parseInt(query.page ?? "1");
    const limit = parseInt(query.limit ?? "10");
    const rows = db.query("SELECT * FROM items LIMIT ? OFFSET ?")
      .all(limit, (page - 1) * limit);
    const total = db.query("SELECT COUNT(*) as c FROM items").get().c;

    return {
      status: 200,
      data: { items: rows, page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }
}
```

**Server: Pushed JS Module**
```javascript
// Receives: ws, el, channelToken, channelFetch
el.innerHTML = '';
var table = document.createElement('table');
var tbody = document.createElement('tbody');
table.appendChild(tbody);
el.appendChild(table);

var currentPage = 1;

function load(page) {
  channelFetch('items?page=' + page + '&limit=10').then(function(res) {
    return res.json();
  }).then(function(data) {
    tbody.innerHTML = '';
    data.items.forEach(function(item) {
      var tr = document.createElement('tr');
      tr.innerHTML = '<td>' + item.title + '</td>';
      tbody.appendChild(tr);
    });
    currentPage = data.page;
  });
}

load(1);
```

## When to Use This

**Use Authenticated Islands when:**
- You need rich client-side interactivity (data grids, drag-and-drop, complex forms)
- The component needs frequent data fetches without full page reloads
- You want the server to control what code runs and what data is accessible

**Use standard HTX templates when:**
- The page is read-heavy with occasional interactions
- htmx attributes (`hx-get`, `hx-post`, `hx-swap`) cover the interactivity needs
- Server-rendered HTML is sufficient

**Use htx:script when:**
- You need simple client-side behavior (click handlers, animations, counters)
- The component doesn't need its own data channel

The progression is: HTX templates → htx:script → Client State Transfer → Authenticated Islands. Each level adds capability and complexity. Most pages should stay at the template or htx:script level.

## Security

- **Channel tokens are scoped per-module.** A compromised token for one island cannot access another island's data.
- **120-second TTL limits exposure.** Even if intercepted, the window is narrow.
- **Token refresh requires a valid (non-expired) token.** You cannot refresh after expiry — the island must re-request from the WebSocket.
- **The ChannelMiddleware validates every request.** No path through to the handler without a valid, correctly-scoped token.
- **Pushed code runs with full DOM access.** Only push code you control. The `new Function` execution requires `unsafe-eval` CSP.
- **Channel handlers run server-side.** They have full access to databases and services. Validate all query parameters as untrusted input.

## Full-Page SPA Mode

An authenticated island isn't limited to a `<div>`. If the host element is `document.body`, the pushed JavaScript owns the entire page and can implement a full client-routed single-page application.

```html
<!-- app.htx — the thin server-rendered shell -->
<script src="/js/htx-realtime.js"></script>
<div id="app">Loading...</div>
<htx:script>
  var rt = new HtxRealtime('{{ ws.token }}');
  rt.on('open', function() {
    rt.requestModule('my-spa', document.getElementById('app'));
  });
</htx:script>
```

The pushed module implements its own client-side router:

```javascript
// Pushed via Client State Transfer — receives (ws, el, channelToken, channelFetch)
el.innerHTML = '<nav id="nav"></nav><main id="main"></main>';
var main = document.getElementById('main');

var routes = {
  '/':         function() { loadView('dashboard'); },
  '/settings': function() { loadView('settings'); },
  '/items':    function() { loadView('items'); },
};

function loadView(name) {
  main.innerHTML = '<p>Loading...</p>';
  channelFetch('views/' + name).then(function(r) { return r.json(); })
    .then(function(data) { main.innerHTML = renderView(name, data); });
}

window.addEventListener('hashchange', function() {
  var route = location.hash.slice(1) || '/';
  if (routes[route]) routes[route]();
});

// Boot
routes[location.hash.slice(1) || '/']();
```

### What This Achieves

The server-rendered HTX page is the shell — just enough HTML to load the client helper and authenticate. After the WebSocket ceremony, the entire application is pushed as a JavaScript string and takes over the page.

This is **not** a traditional SPA:

| | Traditional SPA | SPA Island |
|---|---|---|
| **Code delivery** | Static JS bundle via `<script src>` | Pushed over authenticated WebSocket |
| **Build step** | Webpack/Vite/esbuild required | None — raw JS string |
| **Updates** | Rebuild, deploy, CDN invalidation | Change the string, restart server |
| **Auth** | Separate API auth flow | Inherited from WebSocket ceremony |
| **Data access** | Public API endpoints | Scoped channel tokens per module |
| **Server control** | Client decides what runs | Server decides what to push |

### Code Delivery: No Compilation

Pushed modules are **raw JavaScript strings** — not compiled, not bundled, not minified. The server stores them as template literals and sends them verbatim. The client executes via `new Function()`.

```
Server: MODULES["my-spa"] = "var nav = document.createElement('nav'); ..."
  ↓ WebSocket text frame
Client: new Function('ws', 'el', 'channelToken', 'channelFetch', code)(...)
  ↓ Browser parses and executes
DOM: Full application rendered
```

This matches the HTX philosophy: no build step, no bundler, ship what you write. Change a module string, restart the server, and every new client gets the update immediately.

**If you need compilation** (TypeScript, minification, dependency bundling), the cleanest path is to compile at server startup:

```typescript
// At boot time:
import { buildSync } from "esbuild";

const result = buildSync({
  entryPoints: ["app/islands/my-spa.ts"],
  bundle: true,
  minify: true,
  write: false,
});

MODULES["my-spa"] = new TextDecoder().decode(result.outputFiles[0].contents);
```

The delivery mechanism stays identical — it's still a string sent over WebSocket. The compilation is a server-side concern that the client never sees.

### When to Use Full-Page SPA Mode

**Use SPA mode when:**
- The application is interaction-heavy with frequent view transitions (dashboards, admin panels, data explorers)
- You need preserved client state across navigations (open WebSocket, form data, scroll position)
- Different users or tiers should get different application code
- You want server-authoritative control over what the client can do

**Don't use SPA mode when:**
- The content is mostly static or read-heavy — standard HTX templates are simpler and faster
- SEO matters — pushed SPAs aren't crawlable (the initial HTML is an empty shell)
- The page needs to work without JavaScript — HTX server-rendered pages work by default

### Performance Characteristics

Client routing doesn't necessarily mean faster navigation. Each view still makes an HTTP round-trip (`channelFetch` to the server, wait for JSON, render). The network latency is the same as a full page load.

Where SPA mode wins:
- **No full DOM teardown** — the shell (nav, styles, WebSocket) stays intact, only the content area swaps
- **Smaller payloads** — JSON data (~2-3KB) vs complete HTML with layout (~10-20KB)
- **Preserved state** — the WebSocket connection, client-side caches, and UI state survive navigation
- **Optimistic UI** — show loading states instantly while fetching

Where it doesn't win:
- **Simple content pages** — server-rendered HTML on a fast server is already near-instant
- **First load** — the SPA has overhead: WebSocket connection, module transfer, initial data fetch. A server-rendered page is ready in one HTTP request.

The value of this pattern is not raw speed — it's **server-authoritative client applications with zero build infrastructure**.

## Next: HTTP SPA and WebSocket SPA

Authenticated Islands are components — scoped to a host element, fetching data for one concern. When you need multiple views with client-side navigation, the pattern scales to full single-page applications.

The [HTTP SPA](/docs/http-spa) builds directly on this foundation. The pushed JavaScript implements a client-side router, each "route" calls `channelFetch` for its data, and the result is a multi-view application where all data flows through the same authenticated channel API. The doc-browser at `/playground/spa` is a working example: dashboard, browse, search, and doc detail views — all driven by `channelFetch` with zero page reloads.

For write-heavy applications where sub-millisecond latency matters, the [WebSocket SPA](/docs/websocket-spa) replaces `channelFetch` with pure WebSocket RPC. Same pushed code, same client routing, but data flows over the existing WebSocket instead of HTTP. The Kanban board at `/playground/kanban-ws` demonstrates this with optimistic updates — the UI responds instantly and the server confirms in the background.
