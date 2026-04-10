# Pushed Modules

Pushed modules are JavaScript and TypeScript files that the server delivers to the client at runtime. Unlike static scripts, they are authored as individual files on the server, compiled at boot, and sent over any transport — WebSocket, HTTP, or SSE. Each module executes with four bindings: `ws`, `el`, `channelToken`, and `channelFetch`.

This is file-based [Client State Transfer](/docs/client-state-transfer). You write code in a directory, the server loads it, and [Authenticated Islands](/docs/authenticated-islands) receive it on demand.

## File-Based Authoring

Modules live in `app/modules/pushed/`. Each `.js` or `.ts` file becomes a module whose name matches the filename (without extension):

```
app/modules/pushed/
  analytics.ts       → module "analytics"
  notepad.js         → module "notepad"
  data-grid.ts       → module "data-grid"
```

At startup, `loadPushedModules()` reads the directory and populates the `MODULES` registry — the same `Record<string, string>` used by the WebSocket handler to serve module requests.

## TypeScript Compilation

Files ending in `.ts` are compiled to JavaScript at boot via `Bun.Transpiler`. Compilation errors surface immediately at startup rather than at runtime in the browser:

```typescript
const transpiler = new Bun.Transpiler({ loader: "ts" });
const js = transpiler.transformSync(tsSource);
```

If a `.ts` file fails to compile, the server logs the error and skips that module. Fix the file, restart (or let hot reload catch it), and the module becomes available.

## Type Definitions

The file `htx-module.d.ts` provides ambient types for the module authoring environment. It declares the four execution bindings and the component library:

- `ws` — the WebSocket connection (or null for HTTP/SSE transport)
- `el` — the container element the module renders into
- `channelToken` — scoped JWT for authenticated channel requests
- `channelFetch(path, options?)` — pre-authenticated fetch against the module's channel API
- `h(tag, props?, ...children)` — DOM element helper from the component library
- `UI.*` — the full set of htx-ui.js components

Drop this file in your editor's include path and TypeScript modules get full autocomplete.

## Hot Module Reload

A file watcher monitors `app/modules/pushed/` for changes. When a file is saved:

1. The watcher detects the change and reads the updated source
2. If `.ts`, the source is recompiled via `Bun.Transpiler`
3. The `MODULES` registry is updated with the new code
4. An SSE event is broadcast to `/dev/hmr` with the module name

Connected development clients receive the event and re-request the updated module. The feedback loop is save-to-render with no manual reload.

## The htx-ui.js Component Library

Pushed modules can use `htx-ui.js`, a 3.2KB (minified) component library that ships alongside the module runtime. It provides:

**`h(tag, props?, ...children)`** — a hyperscript-style DOM builder. Returns a real DOM element.

**UI components:**

| Component | Purpose |
|-----------|---------|
| `UI.Card` | Container with header, body, and optional footer |
| `UI.Button` | Styled button with variants (primary, secondary, danger) |
| `UI.Input` | Text input with label and validation |
| `UI.Badge` | Inline status indicator |
| `UI.Alert` | Dismissible notification bar |
| `UI.Table` | Data table from array of objects |
| `UI.Progress` | Determinate/indeterminate progress bar |
| `UI.Stack` | Vertical flex layout with gap |
| `UI.Row` | Horizontal flex layout with gap |
| `UI.Text` | Paragraph with size/color props |
| `UI.Heading` | h1–h6 with consistent sizing |
| `UI.Divider` | Horizontal rule |
| `UI.Spinner` | Loading indicator |

All components return DOM elements. Compose them with `h()` or call them directly:

```javascript
el.appendChild(
  UI.Card({
    header: UI.Heading({ level: 3 }, 'Dashboard'),
    body: UI.Stack({},
      UI.Text({}, 'Loading metrics...'),
      UI.Spinner()
    )
  })
);
```

## Module Execution

Regardless of how the module arrives (see [Module Delivery](/docs/module-delivery)), it executes the same way:

```javascript
new Function('ws', 'el', 'channelToken', 'channelFetch', code)(
  websocket, container, token, fetchFn
);
```

The module owns `el`. It builds DOM, attaches listeners, and uses `channelFetch` to communicate with its server-side channel handler. The `channelToken` is a scoped JWT — see [Authenticated Islands](/docs/authenticated-islands) for the security model.

## Adding a New Module

1. Create a file in `app/modules/pushed/` — e.g., `my-widget.ts`
2. Write the module code using the `ws`, `el`, `channelToken`, and `channelFetch` bindings
3. Save the file
4. In development, hot reload picks it up automatically. In production, restart the server.
5. Request it from the client: `rt.requestModule('my-widget', targetElement)`

No build step. No bundler configuration. No import maps. The file is the module.
