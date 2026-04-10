# Thinking in HTX

HTX is built on a simple premise: the server sends complete documents, and the browser renders them. This is how the web was designed to work. Everything else — client-side routing, component trees, virtual DOMs, hydration — is compensation for abandoning that premise.

This guide explains the mental model behind HTX before you write a single line of code. It's not about syntax or APIs. It's about why the architecture is shaped this way, and how to work with it instead of against it.

## The RESTful Contract

HTTP makes a promise: you request a resource, the server sends a complete representation of it. Not a skeleton. Not a loading spinner. Not a bundle of JavaScript that will eventually construct the page. A finished document.

```
GET /docs/routing-and-templates HTTP/1.1

→ 200 OK
Content-Type: text/html

<!DOCTYPE html>
<html>
  <head>...</head>
  <body>
    <nav>...</nav>
    <article>
      <h1>Routing and Templates</h1>
      <p>HTX routes are files. A file at...</p>
    </article>
    <footer>...</footer>
  </body>
</html>
```

The browser receives this and paints it. No second request for data. No waiting for JavaScript to execute. No flash of empty content. The page is immediately readable, scrollable, and interactive via native HTML (links, forms, buttons).

HTX preserves this contract. A `.htx` template declares what data it needs, and the server resolves everything — queries, layouts, includes, expressions, components — into a single HTML response. One request, one complete document.

This sounds obvious. But most modern web development starts by breaking this contract: the server sends an empty `<div id="root">`, a JavaScript bundle constructs the page in the browser, and a second round of API calls fetches the data. The user stares at a loading spinner while the client rebuilds what the server could have sent in the first place.

## Latent Binding

When an HTX template includes an `htx:script`, something interesting happens. The script is extracted at render time, wrapped in an IIFE, and placed before `</body>`. It doesn't run on the server. It doesn't run during HTML parsing. It runs after the browser has painted the entire document.

By that point, every element exists. The layout has been applied. The navigation, sidebar, content, and footer are all in the DOM. The script arrives late — and that lateness is its power.

```html
<div class="live-feed">
  <ul class="items"></ul>
</div>
<htx:script>
  // When this runs, the entire page is assembled.
  // The layout, the sidebar, the nav — everything exists.
  // This script just enhances what's already there.
  var list = el.querySelector('.items');
  var ws = new WebSocket('{{ ws.url }}?token={{ ws.token }}');
  ws.onmessage = function(e) {
    var li = document.createElement('li');
    li.textContent = JSON.parse(e.data).message;
    list.prepend(li);
  };
</htx:script>
```

The server built the page. The browser painted it. The script then binds behavior to what already exists. It can reach any element in the document — not just its own component, but the sidebar, the header, a sibling component. The DOM is a fully assembled world, and the script is free to traverse it.

This is the opposite of how component frameworks work. In React, a component's JavaScript runs as the virtual DOM is being constructed. The component can only see what it has created. It cannot reach a sibling that hasn't mounted yet. It cannot bind to a layout element that wraps it. If it needs data from elsewhere, it must use state management — lifted state, context, stores, signals — to bridge the gap.

HTX doesn't need any of that. The document is the shared state. `document.querySelector` is the state management system. Every element is available because the server already assembled the complete representation.

> *In the time of their visitation they will shine forth, and will run like sparks through the stubble.*
> — Wisdom of Solomon 3:7

That's latent binding. Scripts that lie dormant in the assembled document, then fire and propagate through the DOM.

## Progressive Layering

Most frameworks ask you to buy the whole stack upfront. Install the CLI, configure the bundler, set up the router, choose a state management library, add a data fetching layer, pick a styling solution. You carry all of this complexity whether you need it or not. A simple content page pays the same cost as a real-time collaborative editor.

HTX inverts this. The default is the simplest possible thing: a server-rendered HTML page with zero JavaScript. Every layer of client capability is opt-in, added only when the use case demands it.

### Layer 0: Pure Templates

A `.htx` file is a route. It declares what data it needs, and the server renders it into HTML. No JavaScript is involved. No build step. No client-side runtime.

```html
<htx:type>post</htx:type>
<htx:where>status=published</htx:where>
<htx>
<htx:each>
  <article>
    <h2><a href="/blog/__slug__">__title__</a></h2>
    <p>__summary__</p>
  </article>
</htx:each>
</htx>
```

This page loads instantly, works without JavaScript, is crawlable by search engines, and renders identically on every device. Most content pages should stay here.

### Layer 1: htmx Attributes

When a page needs interactivity beyond links and forms, add htmx attributes. No custom JavaScript — just declarative attributes on HTML elements.

```html
<button hx-get="/api/load-more" hx-target="#items" hx-swap="beforeend">
  Load More
</button>
```

The server still renders HTML. The client just knows how to request fragments and swap them into the page. The mental model doesn't change — it's still "server sends HTML, browser renders it" — but now it happens without full page reloads.

### Layer 2: htx:script

When you need behavior that htmx attributes can't express — animations, timers, WebSocket connections, custom event handling — add an `htx:script` to a component.

```html
<div class="countdown">
  <span class="value">10</span>
</div>
<htx:script>
  var value = el.querySelector('.value');
  var count = parseInt(value.textContent);
  var interval = setInterval(function() {
    count--;
    value.textContent = count;
    if (count <= 0) clearInterval(interval);
  }, 1000);
</htx:script>
```

The server renders the initial state (`10`). The script enhances it with live behavior. If JavaScript fails to load, the page still shows `10` — it just doesn't count down. Progressive enhancement by default.

### Layer 3: Client State Transfer

When the server needs to push executable logic to the client — rich editors, configuration builders, dynamic widgets — it sends JavaScript over WebSocket.

```javascript
// Server pushes this code; client executes it
var textarea = document.createElement('textarea');
el.innerHTML = '';
el.appendChild(textarea);
textarea.addEventListener('input', function() {
  ws.send(JSON.stringify({ type: 'sync', state: { text: textarea.value } }));
});
```

The server decides what code runs. The client manages local state. State syncs back over the same WebSocket. This is the first layer where the client does real DOM construction — but only within a scoped container (`el`), and only with code the server explicitly pushed.

### Layer 4: Authenticated Islands

When pushed code needs its own data channel, the server issues a scoped channel token alongside the code. The JavaScript fetches JSON from module-level API endpoints — bypassing the template pipeline entirely.

```javascript
// channelFetch auto-attaches the Bearer token
channelFetch('items?page=1').then(function(r) { return r.json(); })
  .then(function(data) { renderTable(data.items); });
```

This is React-style client rendering, but within the HTX architecture: the server controls what code runs, what data is accessible, and who's authenticated. The page shell is still server-rendered. The island is an opt-in escape hatch.

### Layer 5: Full SPA

When the entire page should be a client-routed application, the server pushes a full SPA over WebSocket. The client manages its own state, implements its own router, and renders everything client-side.

Two data transport options:

- **HTTP SPA** — data flows via `channelFetch` (standard HTTP requests with Bearer channel tokens). Visible in the browser Network tab, cacheable, REST-style debugging.
- **WebSocket SPA** — data flows as JSON messages on the same WebSocket. Sub-millisecond latency, no HTTP overhead, natural fit for optimistic updates.

```javascript
var routes = { '/': dashboard, '/browse': browse, '/search': search };
window.addEventListener('hashchange', function() {
  routes[location.hash.slice(1) || '/']();
});
```

This is the thickest client HTX supports in pure JavaScript. But even here, the server is the authority — it decided to push this SPA, it controls what modules are available, and it authenticated the connection. The client is powerful but leashed. Choose HTTP for read-heavy apps with standard tooling; choose WebSocket for write-heavy apps with real-time sync.

### Layer 6: Native Compute (WASM + Libraries)

When JavaScript isn't fast enough — 3D rendering, physics simulation, image processing, cryptography — the server delivers WebAssembly binaries over the same WebSocket. WASM runs at near-native speed in the browser's sandbox.

But WASM doesn't replace JavaScript. It augments it. The pattern combines multiple layers:

- The server renders the HTML shell (Layer 0)
- A WASM module is delivered as a binary WebSocket frame ([Compute State Transfer](/docs/compute-state-transfer))
- The WASM computes data (geometry vertices, transformed pixels, encrypted bytes)
- JavaScript libraries (Three.js, Canvas APIs, Web Audio) consume that data and render it
- htx:script or pushed modules wire everything together

```javascript
// WASM computes 1000 vertices of a torus knot in < 0.5ms
var vertices = wasmGeometry.torusKnot(1000, 1.0, 0.3, 2.0, 3.0);
// Three.js renders them as a 3D particle system at 60fps
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
```

This is where HTX meets the frontier. A 231-line `.htx` file can deliver a real-time 3D visualization with WASM-computed geometry, orbit camera controls, and parameter sync — no build step, no bundler, no framework. The server pushes the WASM binary over WebSocket, Three.js loads from a CDN, and the browser does the rest.

The key: you only reach for this when you need it. A blog post doesn't need WASM. A data grid doesn't need Three.js. But when a feature demands native-speed computation or a specialized rendering library, the architecture supports it without requiring you to restructure anything else.

## The Composability Spectrum

Here's the key insight: **you don't choose a layer when you start a project. You choose a layer per component, per page, per feature.**

A single HTX application can have:
- A marketing homepage that's pure server-rendered HTML (Layer 0)
- A blog with htmx-powered infinite scroll (Layer 1)
- A dashboard with live charts via htx:script (Layer 2)
- A settings page with a pushed configuration builder (Layer 3)
- A data explorer with authenticated channel fetch (Layer 4)
- An admin panel delivered as a full SPA over HTTP or WebSocket (Layer 5)
- A 3D product viewer powered by WASM + Three.js (Layer 6)

All of these coexist in one application, served by one engine, using one module system. There's no "ejecting" from the framework. There's no point where you have to rewrite everything because you need one rich interactive feature.

This is what thick-stack frameworks get wrong. React doesn't have a "just send HTML" mode. If you use React, every page is a React page — even the ones that don't need it. The framework's floor is your ceiling's complexity.

HTX's floor is zero JavaScript. Its ceiling is WASM-powered 3D rendering. And you can be at different heights on different pages of the same application.

## Working With the Grain

HTTP is a request-response protocol. The server is authoritative. The document is the unit of transfer. These aren't limitations to work around — they're the load-bearing walls of the web.

When you work with this grain:
- Pages load fast because the server sends finished HTML
- SEO works because crawlers see real content
- Accessibility works because the DOM is semantic from the start
- Caching works because responses are complete representations
- Back/forward navigation works because each URL is a real page

When you work against this grain:
- You need a loading spinner because the server sent an empty shell
- You need SSR/SSG because the client-rendered page isn't crawlable
- You need hydration because the server-rendered HTML needs to "wake up"
- You need a router because the browser's native navigation was bypassed
- You need state management because components can't see each other

HTX doesn't need any of these patches because it never created the problems they solve. The server sends complete documents. Scripts enhance what's already there. Each layer of client capability is added only when needed. The architecture respects the medium it runs on.

That's the mental model. Start with the simplest thing that works. Layer on complexity only where the use case demands it. Let the server do what servers are good at. Let the browser do what browsers are good at. And let the document be the document.
