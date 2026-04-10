# Client State Transfer

Client State Transfer is a pattern where the server sends executable JavaScript modules to the client over an authenticated WebSocket. The client runs the code, manages local state, and syncs changes back to the server. The server never touches the DOM — it only provides code and acknowledges state.

This is the inverse of server-side rendering: the server decides **what** runs, the client decides **when** and **how**.

## How It Works

```
Client                              Server
  │                                    │
  │  { type: "request_module",         │
  │    name: "notepad" }               │
  │ ──────────────────────────────────→ │
  │                                    │  Look up module by name
  │                                    │  in MODULES registry
  │  { type: "module",                 │
  │    name: "notepad",                │
  │    code: "const textarea = ..." }  │
  │ ←────────────────────────────────── │
  │                                    │
  │  Execute via new Function()        │
  │  Module builds its own DOM         │
  │  Module manages local state        │
  │                                    │
  │  { type: "sync",                   │
  │    module: "notepad",              │
  │    state: { text: "...", ... } }   │
  │ ──────────────────────────────────→ │
  │                                    │  Log/store state
  │  { type: "synced",                 │
  │    module: "notepad",              │
  │    time: "2026-04-01T..." }        │
  │ ←────────────────────────────────── │
```

## Module Execution

Server-pushed modules are plain JavaScript strings stored server-side. When the client requests one, the server sends it as a JSON payload. The client executes it in a controlled scope:

```javascript
new Function('ws', 'el', code)(websocket, containerElement);
```

The module receives two bindings:

| Binding | Type | Description |
|---------|------|-------------|
| `ws` | `WebSocket` | The authenticated WebSocket connection |
| `el` | `HTMLElement` | The container element to render into |

The module owns `el` — it can replace its contents, add event listeners, and manage its own DOM lifecycle. It uses `ws` to sync state back to the server.

## Writing a Module

A module is a JavaScript string. It runs once when loaded. Here's the minimal structure:

```javascript
// Clear container and build DOM
el.innerHTML = '';
const input = document.createElement('input');
input.placeholder = 'Type something...';
el.appendChild(input);

// Local state
let value = '';

// React to user input
input.addEventListener('input', () => {
  value = input.value;
  // Sync to server (debounce in production)
  ws.send(JSON.stringify({
    type: 'sync',
    module: 'my-module',
    state: { value }
  }));
});
```

## Registering Modules

Modules are registered as a `Record<string, string>` in your app's realtime configuration:

```typescript
const MODULES = {
  notepad: `
    const textarea = document.createElement('textarea');
    textarea.placeholder = 'Start typing...';
    el.innerHTML = '';
    el.appendChild(textarea);

    let syncTimer = null;
    textarea.addEventListener('input', () => {
      if (syncTimer) clearTimeout(syncTimer);
      syncTimer = setTimeout(() => {
        ws.send(JSON.stringify({
          type: 'sync',
          module: 'notepad',
          state: { text: textarea.value }
        }));
      }, 500);
    });
  `,

  counter: `
    let count = 0;
    const display = document.createElement('div');
    display.textContent = '0';
    el.innerHTML = '';
    el.appendChild(display);

    el.addEventListener('click', () => {
      count++;
      display.textContent = String(count);
      ws.send(JSON.stringify({
        type: 'sync',
        module: 'counter',
        state: { count }
      }));
    });
  `,
};
```

These are served through the `onMessage` handler in your `RealtimeModule` configuration:

```typescript
onMessage: (ws, parsed, userId) => {
  if (parsed.type === "request_module" && parsed.name) {
    const mod = MODULES[parsed.name];
    if (mod) {
      ws.send(JSON.stringify({ type: "module", name: parsed.name, code: mod }));
    } else {
      ws.send(JSON.stringify({ type: "error", message: `Unknown module: ${parsed.name}` }));
    }
    return true;
  }
  return false;
}
```

## Requesting a Module from the Client

Use `htx:script` to request and execute a server-pushed module:

```html
<div class="module-host">Loading module...</div>
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

Or with the client helper:

```html
<script src="/js/htx-realtime.js"></script>
<htx:script>
  const rt = new HtxRealtime('{{ ws.token }}');

  rt.on('open', () => {
    rt.send({ type: 'request_module', name: 'notepad' });
  });

  rt.on('message', (raw) => {
    const msg = JSON.parse(raw);
    if (msg.type === 'module') {
      new Function('ws', 'el', msg.code)(rt.ws, el);
    }
  });
</htx:script>
```

## State Sync Protocol

### Client → Server

```json
{
  "type": "sync",
  "module": "notepad",
  "state": {
    "text": "Hello world",
    "chars": 11,
    "words": 2
  }
}
```

The `state` object is freeform — each module defines its own schema. The server logs or stores it as needed.

### Server → Client (Acknowledgment)

```json
{
  "type": "synced",
  "module": "notepad",
  "time": "2026-04-01T12:00:00.000Z"
}
```

## Why This Pattern

**Server-rendered HTML is the default.** Most pages should use standard HTX templates with `htx:script` for interactivity. Client State Transfer is for a specific class of problem:

- **Rich editors** — text editors, drawing tools, config builders where the DOM is complex and state is local
- **Offline-capable widgets** — the client owns state and syncs when connected
- **Dynamic module loading** — the server chooses what code to send based on user role, feature flags, or A/B tests
- **Sandboxed execution** — module code is isolated in a `new Function` scope with only `ws` and `el` bindings

**What it is not:** This is not a client-side framework. There's no reactivity system, no virtual DOM, no component lifecycle. Each module is a one-shot script that builds DOM and sets up event listeners. If you need reactive data binding, use htmx attributes and server-rendered partials instead.

## Security Considerations

- Modules execute in the main thread with full DOM access. Only serve modules you control.
- The WebSocket connection is JWT-authenticated. Anonymous users can be excluded from module delivery.
- Module code is transmitted as strings, not files. There are no script tags to CSP-block, but the `new Function` call requires `unsafe-eval` if you have a strict CSP. Plan accordingly.
- State sync payloads should be validated server-side before storage. The server should treat `parsed.state` as untrusted input.

## Built-In Examples

The `.com` platform ships two demo modules:

**Notepad** — textarea with live character/word/line stats, debounced sync (500ms), server acknowledgment display.

**Counter** — increment/decrement buttons with an undo stack, optimistic local updates, sync on every change.

Both demonstrate the core pattern: the server sends code, the client runs it, state flows back over the same WebSocket.

## Beyond JavaScript: Compute State Transfer

Client State Transfer delivers JavaScript. For compute-heavy workloads — markdown rendering, image processing, encryption, data transformation — the same pattern extends to WebAssembly.

[Compute State Transfer](/docs/compute-state-transfer) delivers compiled `.wasm` binaries over the same authenticated WebSocket using a two-message protocol (JSON manifest + binary frame). The glue interface extends the JS module signature from `(ws, el)` to `(ws, el, instance, exports)`, giving the glue code access to the WASM instance's exported functions and linear memory.

The server decides what runs. The client decides when and how. Whether that's a JavaScript string or a WASM binary, the ceremony is the same — authenticated WebSocket, request by name, execute with scoped bindings, sync state back.

See the [Real-Time Implementation Guide](/docs/realtime-implementation-guide) for a step-by-step walkthrough of building with both patterns.
