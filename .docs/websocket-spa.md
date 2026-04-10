# WebSocket SPA

A WebSocket SPA is a single-page application delivered entirely over an authenticated WebSocket. The server pushes the application code via [Client State Transfer](/docs/client-state-transfer), and all subsequent data exchange — reads, writes, deletes — flows over the same WebSocket connection as JSON messages. No HTTP after page load.

This is the most aggressive use of the HTX real-time stack: the server renders a minimal shell, pushes the SPA, and then the WebSocket becomes the only pipe between client and server.

## Architecture

```
Browser                                   Server
  │                                         │
  │  GET /playground/kanban-ws              │
  │ ──────────────────────────────────────→ │  HTX renders shell (< 1KB HTML)
  │ ←────────────────────────────────────── │
  │                                         │
  │  WebSocket /ws?token=JWT                │
  │ ──────────────────────────────────────→ │  JWT validated, connection upgraded
  │ ←────────────────────────────────────── │
  │                                         │
  │  { type: "request_module",              │
  │    name: "kanban-ws" }                  │
  │ ──────────────────────────────────────→ │  Look up module, issue channel token
  │                                         │
  │  { type: "module", name: "kanban-ws",   │
  │    code: "...", channelToken: "..." }   │
  │ ←────────────────────────────────────── │  Client executes, SPA takes over
  │                                         │
  │  ═══════ All further I/O ═══════        │
  │                                         │
  │  { type: "kanban", action: "list" }     │
  │ ──────────────────────────────────────→ │  Query SQLite
  │  { type: "kanban_result", data: {...} } │
  │ ←────────────────────────────────────── │
  │                                         │
  │  { type: "kanban", action: "create",    │
  │    title: "Ship v2" }                   │
  │ ──────────────────────────────────────→ │  INSERT INTO kanban_cards
  │  { type: "kanban_result", data: {...} } │
  │ ←────────────────────────────────────── │
```

After the initial page load and WebSocket handshake, the browser never makes another HTTP request. Every interaction — listing data, creating records, moving items, deleting — is a JSON message on the existing WebSocket.

## Why WebSocket Instead of HTTP Channels

[Authenticated Islands](/docs/authenticated-islands) use HTTP `channelFetch` calls for data. A WebSocket SPA uses the same WebSocket for everything. The trade-offs:

| | HTTP Channel | WebSocket RPC |
|---|---|---|
| **Latency** | TCP + TLS + HTTP overhead per request | Single persistent connection, sub-millisecond framing |
| **Connections** | New connection per fetch (or HTTP/2 multiplex) | One connection for everything |
| **Auth** | Bearer token header per request | Authenticated once at upgrade |
| **Caching** | HTTP cache headers work naturally | No browser caching (manage client-side) |
| **Debugging** | Network tab shows each request | WebSocket frame inspector needed |
| **Offline** | Requests fail cleanly, retry is standard | Connection drops, need reconnection logic |

**Use HTTP channels** when you want standard REST semantics, HTTP caching, and simple debugging. **Use WebSocket RPC** when you want minimal latency, single-connection simplicity, and real-time bidirectional flow.

## The RPC Pattern

The client sends a request with a `reqId`, the server echoes it back. This lets the client match responses to callbacks:

```javascript
var pendingCallbacks = {};
var reqCounter = 0;

function rpc(action, params, callback) {
  var reqId = ++reqCounter;
  pendingCallbacks[reqId] = callback;
  ws.send(JSON.stringify(
    Object.assign({ type: "kanban", action: action, reqId: reqId }, params)
  ));
}

// In ws.onmessage:
if (msg.type === "kanban_result" && pendingCallbacks[msg.reqId]) {
  var cb = pendingCallbacks[msg.reqId];
  delete pendingCallbacks[msg.reqId];
  cb(msg.data);
}
```

This is deliberately minimal — no Promise wrapper, no middleware chain, no serialization framework. It's a callback map with integer keys. The WebSocket guarantees message ordering, so responses arrive in request order.

## Server-Side Handler

The server handles kanban messages in the `onMessage` hook:

```typescript
if (parsed.type === "kanban" && parsed.action) {
  let result = null;

  if (parsed.action === "list") {
    const rows = db.query("SELECT * FROM kanban_cards ORDER BY position").all();
    // Group by column...
    result = { columns, total };
  }
  else if (parsed.action === "create") {
    db.run("INSERT INTO kanban_cards ...", parsed.title, parsed.color);
    result = db.query("SELECT * FROM kanban_cards WHERE id = ?").get(lastId);
  }
  else if (parsed.action === "move") {
    db.run("UPDATE kanban_cards SET col = ? WHERE id = ?", parsed.col, parsed.id);
    result = db.query("SELECT * FROM kanban_cards WHERE id = ?").get(parsed.id);
  }
  else if (parsed.action === "delete") {
    db.run("DELETE FROM kanban_cards WHERE id = ?", parsed.id);
    result = { deleted: true, id: parsed.id };
  }

  ws.send(JSON.stringify({
    type: "kanban_result",
    action: parsed.action,
    data: result,
    reqId: parsed.reqId,
  }));
  return true;
}
```

Each action is a direct SQLite operation. No REST routing, no middleware, no token validation (the WebSocket is already authenticated). The `reqId` is echoed back so the client can match the response.

## Optimistic Updates

The real power of a WebSocket SPA is optimistic rendering. Instead of waiting for the server to confirm before updating the UI, the client mutates its local state immediately and renders. The server confirmation either promotes the optimistic state to confirmed, or triggers a rollback.

### Client-Side State

The SPA maintains its own state object — this is the source of truth for rendering:

```javascript
var state = { columns: { backlog: [], "in-progress": [], review: [], done: [] }, total: 0 };
```

Every `render()` call reads from `state`, not from the server. The server is the source of truth for persistence, but the client is the source of truth for display.

### Create (Optimistic)

```javascript
function createCard(title, color) {
  // 1. Optimistic: add to state with a temporary negative ID
  var tempId = nextTempId--;
  var tempCard = { id: tempId, title: title, color: color, col: "backlog", _optimistic: true };
  state.columns["backlog"].push(tempCard);
  render();  // Card appears instantly at 70% opacity

  // 2. Send to server
  rpc("create", { title: title, color: color }, function(realCard) {
    // 3. Confirm: replace temp card with real server data
    removeCardFromState(tempId);
    state.columns[realCard.col].push(realCard);
    render();  // Card solidifies with real ID
  });
}
```

The user sees the card appear the instant they press Enter. The server round-trip happens in the background. The card renders at 70% opacity with "saving..." until the server confirms.

### Move (Optimistic with Rollback)

```javascript
function moveCard(id, toCol) {
  var found = findCard(id);
  var fromCol = found.col;

  // 1. Optimistic: move in state immediately
  removeCardFromState(id);
  found.card.col = toCol;
  found.card._optimistic = true;
  state.columns[toCol].push(found.card);
  render();  // Card jumps to new column instantly

  // 2. Send to server
  rpc("move", { id: id, col: toCol }, function(realCard) {
    if (!realCard) {
      // 3a. Rollback: server rejected, snap card back
      removeCardFromState(id);
      found.card.col = fromCol;
      delete found.card._optimistic;
      state.columns[fromCol].push(found.card);
      render();
      showToast("Move failed — rolled back");
      return;
    }
    // 3b. Confirm: update with server data
    removeCardFromState(id);
    state.columns[realCard.col].push(realCard);
    render();
  });
}
```

The card moves instantly. If the server rejects (validation error, concurrent edit, permission denied), the card snaps back to its original column. The user sees a brief flash of the card in the new position, then a rollback toast.

### Delete (Optimistic with Rollback)

```javascript
function deleteCard(id) {
  var found = findCard(id);
  var backup = { card: found.card, col: found.col };

  // 1. Optimistic: remove immediately
  removeCardFromState(id);
  render();  // Card vanishes instantly

  // 2. Send to server
  rpc("delete", { id: id }, function(result) {
    if (!result || !result.deleted) {
      // Rollback: card reappears
      state.columns[backup.col].push(backup.card);
      render();
      showToast("Delete failed — rolled back");
    }
  });
}
```

## Visual Feedback

Optimistic state needs visual cues so users understand what's confirmed vs. pending:

```css
.kb-card.optimistic { opacity: 0.7; }
```

```javascript
var metaEl = document.createElement("div");
metaEl.textContent = card._optimistic ? "saving..." : "#" + card.id + " · " + card.updated_at;
```

Cards in optimistic state render at 70% opacity with "saving..." instead of their ID and timestamp. Once the server confirms, the card renders at full opacity with real metadata.

## Latency Tracking

Every RPC call measures round-trip time:

```javascript
function timedRpc(action, params, callback) {
  var t0 = performance.now();
  rpc(action, params, function(data) {
    var ms = (performance.now() - t0).toFixed(1);
    latencyDisplay.textContent = action + ": " + ms + "ms";
    callback(data);
  });
}
```

This surfaces the actual server latency separately from the perceived latency (which is zero for optimistic updates). Typical values on a Raspberry Pi 5 over LAN:

- `list`: 1-3ms
- `create`: 2-4ms
- `move`: 1-3ms
- `delete`: 1-2ms

The user never waits for these numbers. They see the result instantly. The latency counter is a performance dashboard, not a loading indicator.

## When to Use This Pattern

**WebSocket SPA with optimistic updates** is the right choice when:

- **Every millisecond of perceived latency matters** — drag-and-drop interfaces, collaborative editors, gaming-style interactions
- **The app is write-heavy** — many mutations per session (kanban boards, todo lists, form builders)
- **Real-time sync is needed** — changes from other users should appear without polling
- **The connection is persistent** — users stay on the page for extended sessions

**Don't use this when:**

- **The app is read-heavy** — server-rendered HTML is simpler and faster for content pages
- **SEO matters** — WebSocket SPAs render an empty shell on first load
- **Offline support is critical** — WebSocket requires an active connection. For offline-first, consider [Compute State Transfer](/docs/compute-state-transfer) with client-side SQLite (wa-sqlite)
- **The interaction is simple** — if `hx-post` and `hx-swap` handle it, don't over-engineer

## The Full Stack

A WebSocket SPA sits at the top of HTX's capability spectrum:

```
Simplest ─────────────────────────────────────────── Most Capable

HTX Templates   htx:script   Client State   Authenticated   WebSocket SPA
                             Transfer       Islands         (Optimistic)
│               │            │              │               │
│ Server HTML   │ + client   │ + pushed JS  │ + HTTP API    │ + WS RPC
│ hx-get/post   │   behavior │   over WS    │   + channel   │   + optimistic
│               │            │              │   tokens      │   + client state
```

Each level adds capability. Most pages should live on the left. Move right only when the use case demands it. The architecture supports the full spectrum without changing frameworks — it's all HTX modules, WebSocket ceremony, and pushed JavaScript.
