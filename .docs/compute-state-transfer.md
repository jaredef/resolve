# Compute State Transfer

Compute State Transfer extends the [Client State Transfer](/docs/client-state-transfer) pattern to deliver WebAssembly modules over authenticated WebSocket. The server sends compiled `.wasm` binaries alongside JS glue code. The client instantiates the binary, executes the glue, and runs near-native computation without a single HTTP request for code delivery.

This turns the HTX server from a compute workhorse into an orchestrator. Heavy work — markdown rendering, image processing, encryption, data transformation — runs on the client at native speed while the server decides what capabilities to grant.

## Protocol

The delivery uses a two-message sequence over an existing authenticated WebSocket connection.

### Request

Client sends a text frame:

```json
{ "type": "request_wasm_module", "name": "markdown" }
```

With client-side caching:

```json
{ "type": "request_wasm_module", "name": "markdown", "cached_version": "f5a2b0cec17c" }
```

### Response (Full Transfer)

Server sends two messages in sequence:

1. **Text frame** — JSON manifest with metadata and glue code:
```json
{
  "type": "wasm_manifest",
  "name": "markdown",
  "version": "f5a2b0cec17c",
  "size": 6751,
  "glue": "var textarea = document.createElement('textarea'); ..."
}
```

2. **Binary frame** — Raw `.wasm` bytes (no base64, no JSON wrapping)

### Response (Cache Hit)

If the client's `cached_version` matches the server's current version:

```json
{ "type": "wasm_cached", "name": "markdown", "version": "f5a2b0cec17c" }
```

No binary frame follows. The client instantiates from its IndexedDB cache.

## Why Binary Frames

WASM binaries travel as native WebSocket binary frames rather than base64-encoded JSON:

- **33% smaller** — base64 encoding inflates binary data by one-third
- **Zero decode cost** — the client receives an `ArrayBuffer` directly, ready for `WebAssembly.instantiate()`
- **WebSocket native** — the protocol already distinguishes text (opcode 0x1) from binary (opcode 0x2) frames
- **Pi-friendly** — on a resource-constrained server, avoiding base64 encoding saves CPU

The client sets `ws.binaryType = "arraybuffer"` and checks `typeof event.data !== 'string'` to route binary frames to the WASM loader.

## Glue Interface

The glue code bridges WASM exports to the browser DOM and WebSocket. It runs as:

```javascript
new Function('ws', 'el', 'instance', 'exports', glueCode)(websocket, hostElement, wasmInstance, wasmInstance.exports)
```

Four bindings are available:

| Binding | Type | Description |
|---------|------|-------------|
| `ws` | `WebSocket` | The authenticated WebSocket connection |
| `el` | `HTMLElement` | The container element to render into |
| `instance` | `WebAssembly.Instance` | The instantiated WASM module |
| `exports` | `object` | `instance.exports` (convenience alias) |

This extends the JS module signature `(ws, el)` with WASM-specific bindings. Glue code is responsible for:
- Reading from and writing to WASM linear memory
- Calling exported functions
- Building DOM elements and handling events
- Syncing state back to the server via `ws`

## Server-Side Registry

WASM modules are stored as files on disk and loaded into memory at server start:

```
app/wasm-modules/
  hello.wasm           # 41 bytes — add(a, b)
  hello-glue.js        # JS glue for hello module
  markdown.wasm        # 6.7KB — markdown to HTML
  markdown-glue.js     # live editor glue
  markdown-src/        # AssemblyScript source (optional)
    index.ts
```

The server scans for `.wasm` files at startup, reads the matching `-glue.js` file, computes a SHA-256 content hash for versioning, and stores everything in a `Map`:

```typescript
interface WasmModuleEntry {
  name: string;        // filename without .wasm
  version: string;     // first 12 chars of SHA-256 hash
  binary: Uint8Array;  // the .wasm bytes
  glue: string;        // JS glue code
}
```

The `request_wasm_module` message handler in the app's `onMessage` callback looks up the entry and sends the two-message sequence.

## Client Helper API

The `HtxRealtime` class handles the full lifecycle:

```javascript
var rt = new HtxRealtime(token);

rt.on('open', function() {
  rt.requestWasmModule('markdown', document.getElementById('editor'))
    .then(function(result) {
      console.log('Loaded:', result.manifest.name, result.manifest.version);
      console.log('Exports:', Object.keys(result.instance.exports));
    });
});
```

`requestWasmModule(name, hostElement)` returns a Promise that resolves with `{ instance, manifest }` after the WASM is instantiated and the glue has executed.

**Under the hood:**
1. Check IndexedDB for a cached version
2. Send `request_wasm_module` with `cached_version` if found
3. If server responds with `wasm_cached`, instantiate from IndexedDB
4. If server sends manifest + binary, instantiate fresh and cache in IndexedDB
5. Execute glue code with `(ws, el, instance, exports)` bindings
6. Resolve the Promise

## Client-Side Caching

WASM binaries are cached in IndexedDB (`htx-wasm-cache` database, `modules` object store). Each entry stores:

```javascript
{
  version: "f5a2b0cec17c",   // content hash from server
  binary: ArrayBuffer,        // raw .wasm bytes
  glue: "var textarea = ..."  // JS glue code
}
```

**Cache invalidation** is version-based. When the server updates a WASM module, the hash changes. The client sends the old hash, the server sees a mismatch, and sends the full payload. The client stores the new version.

**Graceful degradation** — if IndexedDB is unavailable (private browsing, storage quota), the client falls back to always requesting the full binary. No functionality is lost, only caching.

## Writing a WASM Module

### AssemblyScript (Recommended)

AssemblyScript compiles TypeScript-like code to WASM. It runs on Bun via npm.

```bash
bun add -d assemblyscript
npx asc app/wasm-modules/my-module-src/index.ts \
  --outFile app/wasm-modules/my-module.wasm \
  --optimize --runtime stub --noAssert
```

The `--runtime stub` flag produces a minimal binary with no GC overhead. The `--noAssert` flag removes runtime assertions.

**Memory exchange pattern:**

```typescript
const INPUT_OFFSET: u32 = 1024;
const OUTPUT_OFFSET: u32 = 65536;
let outputLen: u32 = 0;

export function getInputOffset(): u32 { return INPUT_OFFSET; }
export function getOutputOffset(): u32 { return OUTPUT_OFFSET; }
export function getOutputLen(): u32 { return outputLen; }

export function process(inputLen: u32): void {
  // Read input from linear memory at INPUT_OFFSET
  // Write output to OUTPUT_OFFSET
  // Set outputLen
}
```

The glue code writes input to linear memory, calls the exported function, and reads output:

```javascript
var encoder = new TextEncoder();
var decoder = new TextDecoder();
var memory = exports.memory;

var encoded = encoder.encode(inputText);
new Uint8Array(memory.buffer, exports.getInputOffset(), encoded.length).set(encoded);
exports.process(encoded.length);
var html = decoder.decode(new Uint8Array(memory.buffer, exports.getOutputOffset(), exports.getOutputLen()));
```

### Other Languages

Any language that compiles to `wasm32-unknown-unknown` works:
- **Rust** — `cargo build --target wasm32-unknown-unknown --release`
- **C/C++** — via Emscripten (`emcc -O3 -s STANDALONE_WASM`)
- **Zig** — `zig build-lib -target wasm32-freestanding`
- **Go** — `GOOS=js GOARCH=wasm go build`

The only requirement is that the WASM module's imports are satisfied by the `{ env: { abort: () => {} } }` object the client provides.

## Use Cases

**Compute offloading** — The server (Raspberry Pi 5) is resource-constrained. Client devices often have more CPU available. WASM modules move computation to where resources are abundant.

**Markdown rendering** — Live preview without server round-trips. The 6.7KB WASM renderer handles headings, bold, italic, code blocks, lists, and links.

**Image processing** — Resize, crop, filter images client-side before upload. The server never handles raw pixel data.

**Client-side SQLite** — Deliver `wa-sqlite` or `sql.js` over WebSocket. The client gets a local database for offline-first editing with sync.

**End-to-end encryption** — WASM crypto module encrypts content before sync. The server orchestrates but never sees plaintext.

**Dynamic capability grants** — The server decides which WASM modules to offer based on user role, subscription tier, or feature flags. The same WebSocket ceremony gates both access and delivery.

## Security

- WASM modules run in the browser's sandbox. They have no direct DOM, network, or filesystem access — the glue code mediates all interaction.
- The WebSocket is JWT-authenticated. Anonymous users can be excluded from WASM module delivery.
- `WebAssembly.instantiate()` does not require `unsafe-eval` CSP (unlike `new Function()` for JS glue). If you need strict CSP, the WASM execution itself is safe — but the glue code still needs `unsafe-eval` or must be restructured as a separate script file.
- Content hashes ensure the client runs exactly the binary the server intended. Version mismatch triggers a fresh download.
- Treat all state sync payloads from the client as untrusted input, regardless of whether they originate from JS or WASM modules.
