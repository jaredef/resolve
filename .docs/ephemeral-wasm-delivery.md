# Ephemeral WASM Delivery

Ephemeral WASM delivery is a pattern where a WebSocket connection opens, delivers a WebAssembly binary, and immediately closes. The connection is a code delivery mechanism — not a persistent pipe. The server transfers executable compute capability to the client, the client instantiates it, and the transport disappears.

This is Fielding's code-on-demand constraint in its purest form: the server extends the client's functionality by transferring executable code, then the interaction ends.

## The Pattern

```
Browser                                   Server
  │                                         │
  │  GET / (page load)                      │
  │ ──────────────────────────────────────→ │  Server renders HTML
  │ ←────────────────────────────────────── │
  │                                         │
  │  WebSocket /ws                          │
  │ ──────────────────────────────────────→ │  Connection upgraded
  │ ←────────────────────────────────────── │
  │                                         │
  │  { type: "request_wasm_module",         │
  │    name: "geometry" }                   │
  │ ──────────────────────────────────────→ │
  │                                         │
  │  { type: "wasm_manifest", ... }         │  Text frame (metadata)
  │ ←────────────────────────────────────── │
  │  [raw .wasm bytes]                      │  Binary frame (3.4KB)
  │ ←────────────────────────────────────── │
  │                                         │
  │  ws.close()                             │  Client closes immediately
  │ ──────────────────────────────────────→ │
  │                                         │
  │  ═══ No more network activity ═══       │
  │                                         │
  │  WebAssembly.instantiate(bytes)         │
  │  Animation runs at 60fps                │
  │  WASM computes every frame              │
  │  Zero network connections               │
```

After the WebSocket closes, the page has zero active network connections. The WASM binary is in memory, the animation runs entirely client-side, and the server's involvement is complete.

## Why WebSocket Instead of HTTP

A static `.wasm` file served over HTTP works. It's simpler. But it lacks three properties that WebSocket delivery provides:

### Server-Decided Selection

With HTTP, the client decides what to load:
```html
<script>
  fetch('/wasm/geometry.wasm')  // Client hardcodes the URL
</script>
```

With WebSocket delivery, the client requests a capability by name:
```javascript
ws.send(JSON.stringify({ type: 'request_wasm_module', name: 'geometry' }));
```

The server decides what "geometry" means. It could serve different WASM binaries based on:
- **User role** — a free user gets a basic module, a pro user gets the full toolkit
- **Device capability** — a mobile device gets a lighter module, a desktop gets the full version
- **A/B testing** — different users get different implementations
- **Feature flags** — new WASM modules roll out to a percentage of users

The client never knows the URL. It requests a name, and the server fulfills it.

### Binary Frame Transport

HTTP delivers WASM as a response body, which works. But WebSocket binary frames have a specific advantage: the browser receives an `ArrayBuffer` directly — the exact type that `WebAssembly.instantiate()` accepts. There's no response body streaming, no Content-Length parsing, no chunked transfer encoding. The frame boundary IS the message boundary.

For small modules (under 100KB), this eliminates HTTP overhead:
- No TCP handshake (the WebSocket is already open)
- No TLS negotiation (already established)
- No HTTP headers (Content-Type, Cache-Control, etc.)
- No CORS preflight (same-origin WebSocket)

### Authenticated Delivery

The WebSocket was authenticated during the upgrade handshake (JWT validation). Every message on the connection — including the WASM binary — is implicitly authenticated. There's no need for a separate auth header, no API key in the URL, no cookie validation.

For public pages (like a coming-soon landing page), the connection can be anonymous. The point is that the authentication infrastructure exists and applies uniformly — the same WebSocket ceremony that gates chat rooms and data channels also gates WASM delivery.

## The Ephemeral Part

Most WebSocket usage assumes persistence — chat connections, real-time dashboards, live feeds. The connection stays open for the duration of the user's session.

Ephemeral delivery inverts this. The WebSocket exists for milliseconds:

```javascript
ws.onopen = function() {
  ws.send(JSON.stringify({ type: 'request_wasm_module', name: 'geometry' }));
};

ws.onmessage = function(e) {
  if (typeof e.data !== 'string') {
    // Binary frame — got the WASM binary
    ws.close();  // Done. Close immediately.
    WebAssembly.instantiate(e.data, imports).then(function(result) {
      startAnimation(result.instance.exports);
    });
  }
};
```

The connection opens, delivers one binary, and closes. The server reclaims the WebSocket resources. The client has what it needs.

This is efficient for the server — especially on constrained hardware like a Raspberry Pi. A persistent WebSocket per visitor for a landing page animation would be wasteful. An ephemeral connection that delivers 3.4KB and closes is negligible.

## Implementation

### Server Side

The WASM module is loaded from disk at server startup and held in memory:

```typescript
const binary = new Uint8Array(readFileSync("app/wasm-modules/geometry.wasm"));
const hash = new Bun.CryptoHasher("sha256").update(binary).digest("hex").slice(0, 12);

WASM_MODULES.set("geometry", {
  name: "geometry",
  version: hash,
  binary: binary,
  glue: readFileSync("app/wasm-modules/geometry-glue.js", "utf-8"),
});
```

When a client requests the module, the server sends two messages:
1. JSON manifest (text frame) — name, version hash, byte size, glue code
2. Raw `.wasm` bytes (binary frame)

### Client Side

```javascript
var ws = new WebSocket(wsUrl);
ws.binaryType = 'arraybuffer';
var pendingManifest = null;

ws.onopen = function() {
  ws.send(JSON.stringify({ type: 'request_wasm_module', name: 'geometry' }));
};

ws.onmessage = function(e) {
  if (typeof e.data === 'string') {
    var msg = JSON.parse(e.data);
    if (msg.type === 'wasm_manifest') pendingManifest = msg;
    return;
  }

  // Binary frame — WASM bytes
  ws.close();  // Delivery complete

  WebAssembly.instantiate(e.data, { env: { abort: function(){} } })
    .then(function(result) {
      initAnimation(result.instance.exports);
    });
};
```

No client helper library needed. No `HtxRealtime` instance. Just a raw WebSocket that opens, receives, closes, and instantiates. 15 lines.

## Use Cases

**Landing page effects** — Background animations that add visual flair without persistent connections. The WASM computes geometry, physics, or procedural textures. The WebSocket is gone before the user notices it existed.

**One-shot computation** — Deliver a WASM module that processes something once (compress an image, encrypt a file, render a PDF) and doesn't need ongoing communication.

**Capability probing** — The server delivers a diagnostic WASM module that tests the client's compute capabilities, reports back, then closes. Future page loads can use the results to decide what to deliver.

**Install-free tools** — A code formatter, a regex tester, a unit converter. The WASM module is the tool. The WebSocket delivers it. No npm install, no CDN script tag, no build step. The server decides when and whether to offer it.

## What Makes It Novel

The individual pieces are well-established:
- WebSocket binary frames (RFC 6455, 2011)
- WebAssembly instantiation (W3C, 2017)
- Server-pushed code (Fielding's code-on-demand, 2000)

The composition is new: **authenticated WebSocket as an ephemeral binary delivery transport for server-decided WASM modules**. No existing framework, library, or platform delivers WASM this way. The standard approach is static file serving over HTTP — the client decides what to fetch, the URL is hardcoded, and the connection stays open until the response completes.

Ephemeral WASM delivery makes the server the authority over what compute capabilities the client receives, uses the most efficient binary transport available in the browser, and releases the connection the moment delivery is complete.
