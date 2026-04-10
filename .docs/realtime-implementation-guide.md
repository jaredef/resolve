# Real-Time Implementation Guide

This guide walks through adding real-time features to an HTX application — from basic WebSocket connections to WASM-powered compute running client-side. Each section builds on the previous, and everything runs through the standard module system.

## Prerequisites

- A working HTX application with `@htx/engine`
- Bun runtime (WebSocket support is native)
- An authentication module that provides a `resolveUserId` function (e.g., BetterAuth, session cookies, JWT)

## Step 1: Boot the RealtimeModule

The `RealtimeModule` ships with the engine. Import it and wire it into your module list.

```typescript
import { RealtimeModule } from "@htx/engine";

const realtimeModule = new RealtimeModule({
  secretKey: process.env.SECRET_KEY,
  tokenTtl: 60,        // WebSocket JWT lives 60 seconds
  tickInterval: 1000,   // heartbeat every second
  resolveUserId: (request) => {
    // Return the authenticated user's ID, or null for anonymous
    const cookie = request.headers?.cookie ?? "";
    const session = parseSessionFromCookie(cookie);
    return session?.userId ?? null;
  },
});
```

Register it like any other module — the engine calls `boot()` automatically:

```typescript
const handler = new RequestHandler(router, parser, /* ... */, {
  modules: [authModule, realtimeModule],
});
```

On boot, the module registers:
- A **context provider** (`ws`) — templates get `{{ ws.token }}` and `{{ ws.url }}`
- A **middleware** — `POST /api/ws/token` refreshes expired JWTs

## Step 2: Wire WebSocket into Bun.serve

WebSocket upgrades happen outside the HTX middleware chain. Bun's `fetch` handler must intercept `/ws` before passing to the HTX host:

```typescript
const server = Bun.serve({
  hostname: "0.0.0.0",
  port: 3000,
  async fetch(request, server) {
    const url = new URL(request.url);

    // WebSocket upgrade — must happen before HTX handles the request
    if (url.pathname === "/ws") {
      const result = await realtimeModule.handleUpgrade(request, server);
      if (!result) return undefined;
      return result;
    }

    // Everything else goes through HTX
    return host.handle(request);
  },
  websocket: realtimeModule.getWebSocketConfig(),
});

// Give the publisher access to the server for broadcasting
realtimeModule.setServer(server);
```

**Why outside the middleware chain?** Bun's WebSocket upgrade requires `fetch` to return `undefined`. The HTX middleware chain expects `HtxResponse` objects. These are incompatible, so the upgrade check comes first.

## Step 3: Use WebSocket in Templates

Every template now has access to `{{ ws.token }}` and `{{ ws.url }}` via the context provider. Use them in `htx:script`:

```html
<div class="live-status">
  <span class="dot"></span>
  <span class="label">Offline</span>
</div>
<htx:script>
  const dot = el.querySelector('.dot');
  const label = el.querySelector('.label');
  const ws = new WebSocket('{{ ws.url }}?token={{ ws.token }}');

  ws.onopen = () => {
    dot.style.background = '#34d399';
    label.textContent = 'Live';
  };

  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data);
    if (msg.type === 'tick') {
      label.textContent = new Date(msg.time).toLocaleTimeString();
    }
  };

  ws.onclose = () => {
    dot.style.background = '#ef4444';
    label.textContent = 'Offline';
  };
</htx:script>
```

The token is embedded at render time. It's a short-lived JWT (60 seconds) — enough to establish the connection. For long-lived pages, the client helper handles token refresh automatically.

## Step 4: Use the Client Helper

For production use, include `htx-realtime.js` instead of managing WebSocket manually:

```html
<script src="/js/htx-realtime.js"></script>
```

Then in your component:

```html
<div class="deploy-status">
  <span class="state">Connecting...</span>
  <ul class="events"></ul>
</div>
<htx:script>
  const state = el.querySelector('.state');
  const events = el.querySelector('.events');

  const rt = new HtxRealtime('{{ ws.token }}');

  rt.on('statechange', (s) => {
    state.textContent = s;
    state.className = 'state ' + s;
  });

  rt.subscribe('deploys', (data) => {
    const li = document.createElement('li');
    li.textContent = data.status + ': ' + data.sha;
    events.prepend(li);
  });
</htx:script>
```

**What the helper handles for you:**
- Reconnection with exponential backoff (500ms → 30s)
- Token refresh via `POST /api/ws/token` before each reconnect
- Re-subscribes to all channels after reconnection
- State tracking (`disconnected` → `connecting` → `connected` → `reconnecting`)

## Step 5: Publish Events from the Server

The `RealtimePublisher` lets any module push events to connected clients:

```typescript
// In a module's middleware or API handler:
realtimeModule.publisher.broadcast(userId, "deploys", {
  status: "success",
  sha: "abc123",
  time: new Date().toISOString(),
});

// Global broadcast (all connections):
realtimeModule.publisher.broadcastGlobal("announcements", {
  message: "Scheduled maintenance at 2am UTC",
});
```

Channel topics are scoped to users by default: `broadcast(userId, "deploys", data)` publishes to `user:{userId}:deploys`. The client subscribes to `deploys` and the engine maps it to the correct topic.

## Step 6: Add Custom Message Handlers

The `onMessage` hook lets your app handle custom message types beyond the base protocol (subscribe/unsubscribe/echo):

```typescript
const realtimeModule = new RealtimeModule({
  // ... base config
  onMessage: (ws, parsed, userId) => {
    // Chat messages
    if (parsed.type === "chat" && parsed.room) {
      const topic = `room:${parsed.room}`;
      ws.publish(topic, JSON.stringify({
        type: "event",
        channel: `chat:${parsed.room}`,
        data: { user: userId, message: parsed.message },
      }));
      return true; // handled
    }

    // Custom sync from client modules
    if (parsed.type === "sync" && parsed.module) {
      console.log(`State sync: ${parsed.module}`, parsed.state);
      ws.send(JSON.stringify({ type: "synced", module: parsed.module }));
      return true;
    }

    return false; // not handled — let engine process it
  },
});
```

Return `true` to indicate you handled the message. Return `false` to let the engine's base protocol (subscribe/unsubscribe/echo) take over.

## Step 7: Server-Pushed JavaScript Modules (Client State Transfer)

Push executable JavaScript to the client on demand. The server stores module code as strings and sends them over WebSocket:

```typescript
const MODULES = {
  notepad: `
    const textarea = document.createElement('textarea');
    textarea.placeholder = 'Type here...';
    el.innerHTML = '';
    el.appendChild(textarea);

    textarea.addEventListener('input', () => {
      ws.send(JSON.stringify({
        type: 'sync', module: 'notepad',
        state: { text: textarea.value }
      }));
    });
  `,
};

// In onMessage:
if (parsed.type === "request_module" && parsed.name) {
  const code = MODULES[parsed.name];
  if (code) {
    ws.send(JSON.stringify({ type: "module", name: parsed.name, code }));
  }
  return true;
}
```

The client requests and executes:

```html
<div id="host">Loading...</div>
<htx:script>
  const ws = new WebSocket('{{ ws.url }}?token={{ ws.token }}');
  ws.onopen = () => {
    ws.send(JSON.stringify({ type: 'request_module', name: 'notepad' }));
  };
  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data);
    if (msg.type === 'module') {
      new Function('ws', 'el', msg.code)(ws, el);
    }
  };
</htx:script>
```

**When to use this:** Rich editors, configuration builders, or any UI where the DOM is complex and state is local. The server decides what code runs; the client manages state and syncs back.

## Step 8: WebAssembly Modules (Compute State Transfer)

For compute-heavy work, deliver WASM binaries over the same WebSocket:

### Compile a WASM Module

Using AssemblyScript:

```bash
bun add -d assemblyscript
npx asc src/my-module.ts --outFile my-module.wasm --optimize --runtime stub --noAssert
```

### Register on the Server

Place `.wasm` and `-glue.js` files in a `wasm-modules/` directory. Load them at startup:

```typescript
import { readFileSync, readdirSync, existsSync } from "node:fs";

const WASM_MODULES = new Map();

for (const file of readdirSync(wasmDir)) {
  if (!file.endsWith(".wasm")) continue;
  const name = file.replace(".wasm", "");
  const binary = new Uint8Array(readFileSync(path.join(wasmDir, file)));
  const gluePath = path.join(wasmDir, `${name}-glue.js`);
  const glue = existsSync(gluePath) ? readFileSync(gluePath, "utf-8") : "";
  const hash = new Bun.CryptoHasher("sha256").update(binary).digest("hex").slice(0, 12);
  WASM_MODULES.set(name, { name, version: hash, binary, glue });
}
```

### Handle Requests

In `onMessage`, deliver the two-message sequence (JSON manifest + binary frame):

```typescript
if (parsed.type === "request_wasm_module" && parsed.name) {
  const entry = WASM_MODULES.get(parsed.name);
  if (!entry) {
    ws.send(JSON.stringify({ type: "error", message: "Unknown module" }));
    return true;
  }

  // Client cache check
  if (parsed.cached_version === entry.version) {
    ws.send(JSON.stringify({ type: "wasm_cached", name: entry.name, version: entry.version }));
    return true;
  }

  // Full delivery: manifest (text) + binary
  ws.send(JSON.stringify({
    type: "wasm_manifest",
    name: entry.name,
    version: entry.version,
    size: entry.binary.byteLength,
    glue: entry.glue,
  }));
  ws.send(entry.binary);
  return true;
}
```

### Load from the Client

```html
<script src="/js/htx-realtime.js"></script>
<div id="editor">Loading WASM module...</div>
<htx:script>
  const rt = new HtxRealtime('{{ ws.token }}');
  rt.on('open', () => {
    rt.requestWasmModule('markdown', el).then((result) => {
      console.log('Loaded:', result.manifest.name);
    });
  });
</htx:script>
```

The client helper handles: manifest parsing, binary frame pairing, `WebAssembly.instantiate()`, glue execution with `(ws, el, instance, exports)` bindings, and IndexedDB caching by version hash.

## Step 9: Binary Frame Support

For raw binary data exchange (image uploads, audio chunks, compressed data), use the `onBinary` hook:

```typescript
const realtimeModule = new RealtimeModule({
  // ... base config
  onBinary: (ws, data, userId) => {
    const bytes = new Uint8Array(data);
    console.log(`Binary from ${userId}: ${bytes.length} bytes`);

    // Echo back with metadata
    ws.send(JSON.stringify({
      type: "binary_ack",
      size: bytes.length,
      time: new Date().toISOString(),
    }));
    ws.send(data); // echo the binary frame back
    return true;
  },
});
```

On the client:

```javascript
// Send binary
const encoder = new TextEncoder();
rt.sendBinary(encoder.encode("hello in bytes"));

// Receive binary
rt.on('binary', (buffer) => {
  const text = new TextDecoder().decode(buffer);
  console.log('Got binary:', text, buffer.byteLength, 'bytes');
});
```

Binary frames bypass the JSON protocol entirely. The engine routes by frame type: `typeof msg !== "string"` goes to `onBinary`, everything else goes through the JSON parser to `onMessage`.

## Step 10: Putting It All Together

A complete real-time HTX application uses these pieces in layers:

```
┌─────────────────────────────────────────────┐
│  Templates (.htx files)                     │
│  {{ ws.token }}, {{ ws.url }}, htx:script   │
├─────────────────────────────────────────────┤
│  Client Helper (htx-realtime.js)            │
│  subscribe, requestWasmModule, sendBinary   │
├─────────────────────────────────────────────┤
│  WebSocket Connection (JWT authenticated)   │
│  text frames (JSON) + binary frames (raw)   │
├─────────────────────────────────────────────┤
│  Engine: RealtimeModule                     │
│  context provider, token refresh middleware │
│  base protocol: subscribe/unsubscribe/echo  │
├─────────────────────────────────────────────┤
│  App: onMessage + onBinary hooks            │
│  chat, sync, request_module, WASM delivery  │
├─────────────────────────────────────────────┤
│  RealtimePublisher                          │
│  broadcast(userId, channel, data)           │
│  broadcastGlobal(channel, data)             │
└─────────────────────────────────────────────┘
```

Each layer has a clear responsibility. The engine handles ceremony (auth, protocol, reconnection). The app handles domain (what messages mean, what code to push, what binary to process). Templates consume it all through `{{ ws.token }}` and `htx:script`.

**The key principle:** The server decides what the client can do. The client decides when and how to do it. Whether that's subscribing to a channel, executing a pushed JS module, running a WASM compute kernel, or sending binary data — the server is always the authority, and the WebSocket is always the pipe.

## What's Next: Authenticated Islands

When pushed JS modules need their own data channel, the pattern extends to [Authenticated Islands](/docs/authenticated-islands). The server issues a scoped channel token alongside the pushed code, and the JavaScript opens a second HTTP connection to a module-level JSON API. This gives you React-style client rendering within the server-rendered HTX shell — without a separate auth flow, without a build step, and without leaving the module system.
