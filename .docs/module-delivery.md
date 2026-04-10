# Module Delivery

Pushed modules are transport-agnostic. The same JavaScript code executes identically whether it arrived over a WebSocket, an HTTP response, or a Server-Sent Events stream. Only the delivery pipe changes — the module's bindings (`ws`, `el`, `channelToken`, `channelFetch`) and execution via `new Function` are identical in all three cases.

Three transports are available. Choose based on what your page already needs.

## WebSocket Delivery

```javascript
rt.requestModule('analytics', el);
```

This is the default. The client sends a `request_module` message over the existing WebSocket connection. The server responds with a `module` message containing the code and a scoped `channelToken`.

WebSocket delivery is part of the [Real-Time Connections](/docs/real-time-connections) ceremony — the same connection that handles pub/sub, sync, and channel messaging. Use it when the page already has a WebSocket open or when the module needs bidirectional communication after loading.

```
Client                              Server
  │  { type: "request_module",        │
  │    name: "analytics" }            │
  │ ────────────────────────────────→ │
  │                                    │
  │  { type: "module",                │
  │    name: "analytics",             │
  │    code: "...",                    │
  │    channelToken: "eyJ..." }       │
  │ ←──────────────────────────────── │
```

## HTTP Delivery

```javascript
rt.requestModule('analytics', el, { transport: 'http' });
```

A simple GET request to `/api/modules/analytics`. The server returns JSON with the module code and a channel token. No persistent connection required.

HTTP delivery is the simplest transport. The response is cacheable and CDN-friendly — module code rarely changes between deploys. Use it for modules that don't need real-time features after loading.

```
Client                              Server
  │                                    │
  │  GET /api/modules/analytics       │
  │  Authorization: Bearer {jwt}       │
  │ ────────────────────────────────→ │
  │                                    │
  │  200 OK                            │
  │  { code: "...",                    │
  │    channelToken: "eyJ..." }       │
  │ ←──────────────────────────────── │
```

## SSE Delivery

```javascript
rt.requestModule('analytics', el, { transport: 'sse' });
```

A GET request to `/api/modules/stream?names=analytics,data-grid,notepad` opens an SSE connection. The server streams each module as a separate event, then closes the connection.

SSE delivery is optimized for batch loading. Request multiple modules in a single connection, receive them as they compile, and execute each one as it arrives — no waiting for the entire batch.

```
Client                              Server
  │                                    │
  │  GET /api/modules/stream           │
  │    ?names=analytics,data-grid      │
  │ ────────────────────────────────→ │
  │                                    │
  │  event: module                     │
  │  data: {"name":"analytics",...}    │
  │ ←──────────────────────────────── │
  │                                    │
  │  event: module                     │
  │  data: {"name":"data-grid",...}    │
  │ ←──────────────────────────────── │
  │                                    │
  │  event: done                       │
  │ ←──────────────────────────────── │
  │  Connection closes                 │
```

## Ephemeral Delivery

Any of the three transports can operate ephemerally. The transport opens, delivers the module, and closes. What persists is not the connection but the `channelToken` — stored in the client's module scope.

After delivery, the module coordinates laterally (with other modules on the page) through the DOM, and vertically (with the server) through `channelFetch`, which is a plain HTTP call authenticated by the channel token. No WebSocket required.

This follows the same ephemeral pattern described in [Ephemeral WASM Delivery](/docs/ephemeral-wasm-delivery): the connection is a delivery mechanism, not a runtime dependency.

## Unified Execution

All three transports converge on the same execution path:

1. Extract `code` and `channelToken` from the transport response
2. Build `channelFetch` — a function that calls `/api/channel/{module}/{path}` with the token in the Authorization header
3. Execute the module: `new Function('ws', 'el', 'channelToken', 'channelFetch', code)(ws, el, token, fetchFn)`

For HTTP and SSE delivery, `ws` is `null`. Modules that need to work across all transports should check for `ws` before using it and prefer `channelFetch` for server communication.

## When to Use Which

| Transport | Best for | Trade-off |
|-----------|----------|-----------|
| **WebSocket** | Real-time modules, pub/sub, live collaboration | Requires persistent connection |
| **HTTP** | Static modules, cacheable islands, CDN distribution | One module per request |
| **SSE** | Batch loading multiple modules, progressive rendering | One-shot connection, no bidirectional messaging |

Start with HTTP. Move to WebSocket when you need real-time. Use SSE when you're loading three or more modules on a single page and want them to stream in progressively.
