# htx:script — Component-Scoped JavaScript

`<htx:script>` lets a component ship client-side behavior alongside its HTML. The script is stripped from inline output, and injected as an IIFE before `</body>` with an `el` binding that references the component's root DOM element.

## Basic Example

```html
<!-- components/toggle.htx -->
<htx:props>
label = "Toggle"
</htx:props>
<button class="toggle">{{ label }}</button>
<htx:script>
  el.addEventListener('click', () => {
    el.classList.toggle('active');
  });
</htx:script>
```

Usage: `<htx:component src="components/toggle.htx" label="Dark Mode" />`

Output:
```html
<button data-htx-id="htx-c0" class="toggle">Dark Mode</button>
<!-- before </body>: -->
<script>
(function(){
  const el = document.querySelector('[data-htx-id="htx-c0"]');
  if (!el) return;
  el.addEventListener('click', () => {
    el.classList.toggle('active');
  });
})();
</script>
```

## How It Works

1. During component resolution, `<htx:script>` blocks are extracted from the component template
2. The component's first HTML element gets a `data-htx-id` attribute (auto-generated)
3. Expressions inside the script are evaluated with the component's scoped data (props + parent context)
4. The script is wrapped in an IIFE with `const el` pointing to the component's root element
5. All collected scripts are injected as a single `<script>` block before `</body>`

## The `el` Binding

Every htx:script gets a local `el` variable — a reference to the component's root DOM element. Use it to scope DOM queries:

```html
<div class="counter">
  <span class="count">0</span>
  <button class="inc">+</button>
  <button class="dec">-</button>
</div>
<htx:script>
  const count = el.querySelector('.count');
  el.querySelector('.inc').addEventListener('click', () => {
    count.textContent = Number(count.textContent) + 1;
  });
  el.querySelector('.dec').addEventListener('click', () => {
    count.textContent = Number(count.textContent) - 1;
  });
</htx:script>
```

`el` is scoped to your component — it won't accidentally select elements from other components on the page.

## Using Expressions in Scripts

Since the expression engine processes the entire template, you can use `{{ }}` expressions inside `<htx:script>`. Use `{{ js }}` for string values and `{{ json }}` for objects/numbers:

```html
<htx:props>
step = "1"
api_url = "/api/count"
config = ""
</htx:props>
<div class="stepper">
  <button>+{{ step }}</button>
</div>
<htx:script>
  const step = {{ json step }};
  const apiUrl = "{{ js api_url }}";

  el.querySelector('button').addEventListener('click', () => {
    fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify({ increment: step })
    });
  });
</htx:script>
```

## Multiple Components

When multiple components with `<htx:script>` render on the same page, each gets its own IIFE with its own `el`. Scripts are independent:

```html
<htx:component src="components/toggle.htx" label="Feature A" />
<htx:component src="components/toggle.htx" label="Feature B" />
```

Produces two separate scripts, each scoped to its own button via `data-htx-id="htx-c0"` and `data-htx-id="htx-c1"`.

## Nested Components

When components contain other components, scripts are collected depth-first. Inner component scripts run before outer component scripts:

```html
<!-- components/outer.htx -->
<div class="outer">
  <htx:component src="components/inner.htx" />
</div>
<htx:script>
  // Runs second — inner is already initialized
  console.log('outer ready');
</htx:script>
```

## Limitations

- **htmx partial swaps**: Scripts injected via innerHTML don't execute. `<htx:script>` works on full-page renders. For htmx-swapped content, use external JS files or inline event handlers (`onclick`).
- **Template literals**: JavaScript `${}` inside backtick strings won't conflict (the expression engine only matches `{{ }}`), but literal `{{ }}` in JavaScript will be parsed as expressions. Move any JS that needs literal `{{ }}` to external files.
- **No deduplication**: If a component renders 5 times, 5 scripts emit. Each is scoped to its own instance.

## When to Use What

| Need | Solution |
|------|----------|
| Simple click handler | `onclick="{{ js expr }}"` |
| Component-scoped behavior | `<htx:script>` |
| Real-time updates | `<htx:script>` + WebSocket |
| Complex app logic | External `<script src="...">` |
| htmx-swapped content | External JS + `htmx:afterSwap` |

## WebSocket Integration

`htx:script` pairs naturally with the [Real-Time Connections](/docs/real-time-connections). The context provider injects `{{ ws.token }}` and `{{ ws.url }}` into templates, so components can open authenticated connections:

```html
<div class="live-feed">
  <ul class="items"></ul>
</div>
<htx:script>
  const list = el.querySelector('.items');
  const ws = new WebSocket('{{ ws.url }}?token={{ ws.token }}');

  ws.onopen = () => {
    ws.send(JSON.stringify({ type: 'subscribe', channel: 'activity' }));
  };

  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data);
    if (msg.type === 'event') {
      const li = document.createElement('li');
      li.textContent = msg.data.message;
      list.prepend(li);
    }
  };
</htx:script>
```

For production, use the `HtxRealtime` client helper (include `htx-realtime.js` on the page) for automatic reconnection and token refresh:

```html
<div class="deploy-monitor">
  <span class="status">Connecting...</span>
</div>
<htx:script>
  const status = el.querySelector('.status');
  const rt = new HtxRealtime('{{ ws.token }}');

  rt.on('statechange', (state) => { status.textContent = state; });
  rt.subscribe('deploys', (data) => {
    status.textContent = data.status + ': ' + data.sha;
  });
</htx:script>
```

This pattern — `htx:script` for DOM binding, `HtxRealtime` for connection management — keeps real-time components server-rendered on first load with live updates after connection.

See the [Client State Transfer](/docs/client-state-transfer) pattern for pushing executable JavaScript modules over the same WebSocket, and [Compute State Transfer](/docs/compute-state-transfer) for WASM delivery.
