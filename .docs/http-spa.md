# HTTP SPA

An HTTP SPA is a single-page application delivered via [Client State Transfer](/docs/client-state-transfer) that uses [Authenticated Islands](/docs/authenticated-islands) HTTP channels for all data access. The server pushes the application code over WebSocket, and the pushed JavaScript fetches data via `channelFetch` — standard HTTP requests with scoped Bearer tokens to module-level JSON APIs.

This sits between Authenticated Islands (single-component islands) and [WebSocket SPA](/docs/websocket-spa) (pure WebSocket RPC). The WebSocket delivers the code; HTTP delivers the data.

## Architecture

```
Browser                                    Server
  │                                          │
  │  GET /playground/spa                     │
  │ ───────────────────────────────────────→ │  HTX renders shell
  │ ←─────────────────────────────────────── │
  │                                          │
  │  WebSocket /ws?token=JWT                 │
  │ ───────────────────────────────────────→ │  Authenticated, upgraded
  │ ←─────────────────────────────────────── │
  │                                          │
  │  { type: "request_module",               │
  │    name: "doc-browser" }                 │
  │ ───────────────────────────────────────→ │  Push code + channel token
  │ ←─────────────────────────────────────── │  SPA takes over the page
  │                                          │
  │  ═══ Data flows over HTTP ═══            │
  │                                          │
  │  GET /api/channel/doc-browser/sections   │
  │  Authorization: Bearer eyJ...            │
  │ ───────────────────────────────────────→ │  ChannelMiddleware validates
  │  { "sections": [...] }                   │  ChannelHandler returns JSON
  │ ←─────────────────────────────────────── │
  │                                          │
  │  GET /api/channel/doc-browser/doc/slug   │
  │  Authorization: Bearer eyJ...            │
  │ ───────────────────────────────────────→ │
  │  { "title": "...", "body_html": "..." }  │
  │ ←─────────────────────────────────────── │
```

The WebSocket stays open for the module push and token refresh, but all data fetching is standard HTTP. This means the Network tab in browser DevTools shows every request, responses are cacheable, and the data layer behaves like a REST API.

## The channelFetch Wrapper

Pushed modules receive a pre-bound `channelFetch` function as their fourth argument:

```javascript
// Signature: new Function('ws', 'el', 'channelToken', 'channelFetch', code)

// channelFetch(subPath, options?) → Promise<Response>
channelFetch('sections').then(function(res) { return res.json(); })
  .then(function(data) { renderSections(data.sections); });

channelFetch('items?page=2&section=core-concepts')
  .then(function(res) { return res.json(); })
  .then(function(data) { renderItems(data); });

channelFetch('doc/websocket-ceremony')
  .then(function(res) { return res.json(); })
  .then(function(doc) { renderDoc(doc); });
```

Under the hood, `channelFetch` does three things:

1. **Attaches the Bearer token** — `Authorization: Bearer {channelToken}` header on every request
2. **Proactive refresh** — if the token is past 70% of its TTL (84 seconds of 120), refreshes via `POST /api/channel/{module}/token` before the request
3. **Transparent retry** — on 401, refreshes the token and retries once

You never manage tokens manually. The wrapper handles the full lifecycle.

## Client-Side Routing

The pushed SPA implements hash-based routing. Each "route" maps to a function that calls `channelFetch` and renders the result:

```javascript
var routes = {
  '/':         function() { dashboardView(); },
  '/browse':   function() { browseView(''); },
  '/search':   function() { searchView(); },
};

// Match routes with parameters
function navigate() {
  var hash = location.hash.slice(1) || '/';

  if (hash === '/') return dashboardView();
  if (hash === '/browse') return browseView('');
  if (hash.startsWith('/browse/')) return browseView(hash.slice(8));
  if (hash === '/search') return searchView();
  if (hash.startsWith('/doc/')) return docView(hash.slice(5));

  main.innerHTML = '<p>Not found</p>';
}

window.addEventListener('hashchange', navigate);
navigate(); // Boot
```

Each view function fetches data and renders DOM:

```javascript
function dashboardView() {
  main.innerHTML = '<p>Loading...</p>';

  Promise.all([
    channelFetch('sections').then(function(r) { return r.json(); }),
    channelFetch('recent').then(function(r) { return r.json(); }),
  ]).then(function(results) {
    var sections = results[0].sections;
    var recent = results[1].items;
    main.innerHTML = renderDashboard(sections, recent);
  });
}
```

Navigation is instant — `hashchange` fires synchronously, the view function starts fetching immediately, and a loading state shows while data arrives.

## Building the ChannelHandler

The server-side handler serves JSON for each endpoint the SPA needs:

```typescript
class DocBrowserChannelHandler implements ChannelHandler {
  module() { return "doc-browser"; }

  async handle(subPath, query, userId, context) {
    if (subPath === "sections")  return this.getSections();
    if (subPath === "items")     return this.listItems(query);
    if (subPath === "recent")    return this.getRecent();
    if (subPath === "search")    return this.search(query);
    if (subPath.startsWith("doc/")) return this.getDoc(subPath.slice(4));
    return { status: 404, data: { error: "Not found" } };
  }

  private getSections() {
    const rows = this.db.query(`
      SELECT json_extract(meta, '$.section') as section,
             json_extract(meta, '$.section_label') as label,
             COUNT(*) as count
      FROM content WHERE type = 'documentation' AND status = 'published'
      GROUP BY section ORDER BY count DESC
    `).all();
    return { status: 200, data: { sections: rows } };
  }

  private getDoc(slug) {
    const row = this.db.query(`
      SELECT slug, title, json_extract(meta, '$.body_html') as body_html,
             json_extract(meta, '$.section_label') as section_label, updated_at
      FROM content WHERE type = 'documentation' AND slug = ?
    `).get(slug);
    if (!row) return { status: 404, data: { error: "Not found" } };
    return { status: 200, data: row };
  }
}
```

Register it in `boot()`:

```typescript
export class DocBrowserModule implements Module {
  name() { return "doc-browser"; }
  boot(registry) {
    registry.registerChannelHandler(new DocBrowserChannelHandler(this.dbPath));
  }
}
```

The `ChannelMiddleware` handles routing, token validation, and token refresh automatically. Your handler just returns `{ status, data }`.

## Mutations Over HTTP

For write operations, `channelFetch` supports all HTTP methods:

```javascript
// Create
channelFetch('cards', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'New card', color: '#5b96d5' }),
}).then(function(r) { return r.json(); })
  .then(function(card) { console.log('Created:', card.id); });

// Update
channelFetch('cards/42', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'Updated title' }),
});

// Delete
channelFetch('cards/42', { method: 'DELETE' });
```

The server handler receives the method and body via the `context` parameter:

```typescript
async handle(subPath, query, userId, context) {
  const method = context?.method ?? "GET";
  const body = context?.body ?? {};

  if (subPath === "cards" && method === "POST") return this.createCard(body, userId);
  if (subPath.startsWith("cards/") && method === "PUT") return this.updateCard(id, body);
  if (subPath.startsWith("cards/") && method === "DELETE") return this.deleteCard(id);
}
```

## HTTP SPA vs WebSocket SPA

Both are pushed over WebSocket. The difference is how data flows after the push:

| | HTTP SPA | WebSocket SPA |
|---|---|---|
| **Data transport** | HTTP requests via `channelFetch` | WebSocket JSON messages via `rpc()` |
| **Browser DevTools** | Full visibility in Network tab | Need WebSocket frame inspector |
| **Caching** | Browser HTTP cache works naturally | Must manage client-side cache |
| **Token management** | Bearer header per request, auto-refresh | Authenticated once at upgrade |
| **Offline resilience** | Individual requests fail/retry cleanly | Connection drop affects everything |
| **Optimistic updates** | Possible but awkward (fetch is async) | Natural fit (fire-and-forget RPC) |
| **Latency** | HTTP overhead per request (~5-15ms) | Sub-millisecond framing (~1-3ms) |
| **Best for** | Read-heavy SPAs, standard tooling | Write-heavy SPAs, real-time sync |

**Choose HTTP SPA when:**
- The app is mostly reads with occasional writes (doc browsers, dashboards, settings panels)
- You want standard REST debugging and HTTP caching
- The team is more comfortable with fetch than WebSocket messaging
- You might later expose the same API to other clients (mobile apps, CLI tools)

**Choose WebSocket SPA when:**
- The app is write-heavy with frequent mutations (kanban boards, editors, chat)
- Sub-millisecond latency matters for perceived responsiveness
- You need optimistic updates with rollback
- Real-time sync between users is a core feature

## The Progression

An HTTP SPA builds on the Authenticated Islands foundation:

```
Authenticated Island          HTTP SPA                    WebSocket SPA
(single component)            (full page, HTTP data)      (full page, WS data)
│                             │                           │
│ channelFetch in             │ channelFetch +             │ ws.send/onmessage +
│ one host element            │ client router +            │ client router +
│                             │ multi-view rendering       │ optimistic state
```

All three use the same primitives: WebSocket ceremony for auth, Client State Transfer for code delivery, and scoped channel tokens for data access. The difference is scope (component vs page) and transport (HTTP vs WebSocket).

Start with an Authenticated Island for a single interactive component. When you need multiple views with client-side navigation, promote it to an HTTP SPA. When you need sub-millisecond writes and optimistic state, switch the data layer to WebSocket RPC.
