# Real-Time Connections

HTX provides a first-class WebSocket module for real-time features. The `RealtimeModule` handles JWT-authenticated connections, channel-based pub/sub, automatic heartbeats, and token refresh — all wired through the standard module system.

## Connection Lifecycle

Every WebSocket connection follows a strict ceremony: authenticate, upgrade, subscribe, exchange, close.

```
Page Render (GET)
    │
    ▼
RealtimeContextProvider issues JWT (60s TTL)
    │
    ▼
Template receives {{ ws.token }} and {{ ws.url }}
    │
    ▼
Client opens WebSocket: ws://host/ws?token=<jwt>
    │
    ▼
Bun.serve fetch intercepts /ws path
    │
    ▼
handleUpgrade validates JWT, extracts userId
    │
    ▼
server.upgrade(request, { data: { userId } })
    │
    ▼
WebSocket open — auto-subscribe to user channels + global:time
    │
    ▼
Heartbeat tick every 1s (configurable)
    │
    ▼
Client sends messages, subscribes to channels
    │
    ▼
close — clear heartbeat interval
```

## Why Upgrade Happens Outside the Middleware Chain

The HTX middleware pipeline expects `HtxResponse` returns. WebSocket upgrades in Bun require `fetch` to return `undefined`. These are incompatible. Upgrade detection must happen in `Bun.serve`'s `fetch` **before** calling `runtime.host.handle()`:

```typescript
const server = Bun.serve({
  async fetch(request, server) {
    const url = new URL(request.url);
    if (url.pathname === "/ws") {
      const result = await rt.handleUpgrade(request, server);
      if (!result) return undefined;
      return result;
    }
    return runtime.host.handle(request);
  },
  websocket: rt.getWebSocketConfig(),
});

rt.setServer(server);
```

## Authentication

WebSocket auth uses short-lived JWTs issued by the same `ActionTokenService` that secures mutations.

**Why JWT over session cookies:**
1. Browsers can't reliably send cookies on WebSocket upgrade across all environments
2. JWT is stateless — no database lookup on every connection
3. Short TTL (60s) limits exposure if a token leaks
4. Reuses existing crypto infrastructure — zero new security code

**Token structure:**
```json
{
  "sub": "user-id-here",
  "htx-context": "websocket",
  "jti": "unique-id-for-replay-guard",
  "iat": 1711929600,
  "exp": 1711929660
}
```

Invalid tokens degrade to anonymous connections rather than rejecting. This keeps the upgrade path simple and allows public-facing real-time features.

## Using the Module

### Engine-Level Setup

The `RealtimeModule` lives in `@htx/engine` and is auth-system-agnostic. You provide a `resolveUserId` callback:

```typescript
import { RealtimeModule } from "@htx/engine";

const rt = new RealtimeModule({
  secretKey: process.env.SECRET_KEY,
  tokenTtl: 60,           // JWT lifetime in seconds
  tickInterval: 1000,      // Heartbeat interval in ms
  resolveUserId: (request) => {
    // Your auth logic: read session cookie, query DB, return userId or null
    return getUserIdFromSession(request);
  },
  onMessage: (ws, parsed, userId) => {
    // Handle app-specific message types. Return true if handled.
    if (parsed.type === "chat") { /* ... */ return true; }
    return false;
  },
});
```

### What `boot()` Registers

When the module boots, it registers two things with the engine:

1. **Context provider** (`ws`) — injects `{{ ws.token }}` and `{{ ws.url }}` into templates
2. **Token refresh middleware** — handles `POST /api/ws/token` for long-lived pages

### Template Usage

```html
<div class="live-status">
  <span class="indicator"></span>
  <span class="text">Connecting...</span>
</div>
<htx:script>
  const ws = new WebSocket('{{ ws.url }}?token={{ ws.token }}');

  ws.onopen = () => {
    el.querySelector('.indicator').classList.add('connected');
    el.querySelector('.text').textContent = 'Live';
  };

  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data);
    if (msg.type === 'tick') {
      el.querySelector('.text').textContent = msg.time;
    }
  };
</htx:script>
```

## Channel Protocol

The base protocol supports three message types. All others fall through to `onMessage` or echo back.

### Subscribe

```json
→ { "type": "subscribe", "channel": "deploys" }
← { "type": "subscribed", "channel": "deploys", "topic": "user:abc:deploys" }
```

Channels are scoped to the authenticated user. The topic `user:{userId}:{channel}` is what Bun's pub/sub uses internally.

### Unsubscribe

```json
→ { "type": "unsubscribe", "channel": "deploys" }
← { "type": "unsubscribed", "channel": "deploys" }
```

### Events (Server → Client)

When the server publishes to a channel, all subscribers receive:

```json
← { "type": "event", "channel": "deploys", "data": { "status": "success", "sha": "abc123" } }
```

Server-side publishing:

```typescript
// Publish to a specific user's channel
rt.publisher.broadcast(userId, "deploys", { status: "success", sha: "abc123" });

// Publish to all connections on a global channel
rt.publisher.broadcastGlobal("announcements", { message: "Maintenance at 2am" });
```

## Token Refresh

The initial JWT is embedded at render time with a 60-second TTL. If a user stays on the page longer and the connection drops, the token is expired.

The module registers a middleware endpoint:

```
POST /api/ws/token
Cookie: session_token=...
→ { "token": "eyJ...", "expires_at": "2026-04-01 12:00:00" }
```

This resolves the user from their session cookie (via the same `resolveUserId` callback) and issues a fresh JWT. Returns 401 if unauthenticated.

## Client Helper

`htx-realtime.js` (~2KB minified) wraps the ceremony into a clean API:

```html
<script src="/js/htx-realtime.js"></script>
<htx:script>
  const rt = new HtxRealtime('{{ ws.token }}');

  rt.subscribe('deploys', (data) => {
    el.querySelector('.status').textContent = data.status;
  });

  rt.on('statechange', (state) => {
    el.querySelector('.indicator').className = 'indicator ' + state;
  });
</htx:script>
```

**What it handles automatically:**
- Reconnection with exponential backoff (500ms → 1s → 2s → ... → 30s cap)
- Token refresh via `POST /api/ws/token` before each reconnect attempt
- Re-subscribes to all channels after reconnection
- Connection state tracking: `disconnected` → `connecting` → `connected` → `reconnecting`

**API:**

| Method | Description |
|--------|-------------|
| `new HtxRealtime(token, options?)` | Connect with initial JWT |
| `.subscribe(channel, callback)` | Subscribe; returns unsubscribe function |
| `.unsubscribe(channel, callback?)` | Remove one callback or all |
| `.send(data)` | Send raw message (string or object) |
| `.close()` | Clean disconnect, stops reconnection |
| `.on(event, callback)` | Listen: `open`, `close`, `error`, `message`, `statechange` |
| `.state` | Current state string |

**Options:**

| Option | Default | Description |
|--------|---------|-------------|
| `url` | Auto-detected from page | WebSocket URL |
| `tokenUrl` | `/api/ws/token` | Token refresh endpoint |
| `maxRetries` | `Infinity` | Stop reconnecting after N failures |

## Heartbeat

The server sends a `tick` message to each connection at a configurable interval (default: 1 second):

```json
← { "type": "tick", "time": "2026-04-01T12:00:00.000Z", "user": "user-id" }
```

Ticks serve two purposes:
1. **Keepalive** — prevents proxy/load balancer timeouts
2. **Clock sync** — provides a server-authoritative timestamp for UI elements like live clocks

A global time broadcast (every 5 seconds) publishes to the `global:time` channel for dashboard-level monitoring.

## Binary Frame Support

The WebSocket connection carries both text frames (JSON protocol) and binary frames (raw bytes). The engine routes by frame type:

```typescript
message(ws, msg) {
  if (typeof msg !== "string") {
    // Binary frame — delegate to app
    if (onBinary) onBinary(ws, msg, userId);
    return;
  }
  // Text frame — JSON protocol (subscribe, unsubscribe, echo)
}
```

Binary frames bypass the JSON parser entirely. Apps use the `onBinary` hook for raw data exchange:

```typescript
const rt = new RealtimeModule({
  // ... base config
  onBinary: (ws, data, userId) => {
    // Process raw bytes: image uploads, audio chunks, compressed data
    console.log(`Binary: ${new Uint8Array(data).length} bytes from ${userId}`);
    ws.send(data); // echo back as binary frame
    return true;
  },
});
```

On the client, `sendBinary(buffer)` sends raw bytes, and the `binary` event fires when non-WASM binary frames arrive:

```javascript
rt.sendBinary(new TextEncoder().encode("raw bytes"));
rt.on('binary', (buffer) => {
  console.log('Received:', buffer.byteLength, 'bytes');
});
```

Binary frames are also used for [Compute State Transfer](/docs/compute-state-transfer) — WASM binaries travel as binary frames, paired with a JSON manifest. The client helper distinguishes WASM delivery from generic binary by tracking pending WASM requests.

## Resource Budget

On a Raspberry Pi 5 (8GB RAM):
- ~8KB per WebSocket connection (connection state + subscriptions)
- 100 connections = ~800KB — negligible
- Tick broadcasts batched per-connection, not per-frame
- No Redis required — Bun's in-process pub/sub is sufficient for single-node

If the platform scales to multiple nodes, the `RealtimePublisher` abstraction makes Redis a drop-in swap.
