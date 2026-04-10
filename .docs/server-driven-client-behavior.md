# Server-Driven Client Behavior

The HTX expression engine processes the entire template — including script tags and event handler attributes. This means server-side expressions can inject values directly into client-side JavaScript, creating a seamless bridge between server state and client behavior.

## How It Works

The HTX engine is a text interpreter. It doesn't parse HTML structure — it scans for `{{ }}` patterns in the raw template string. Script tags and attributes are just text to the engine.

When a component declares a prop and uses it inside an onclick handler:

```html
<htx:props>
step = "1"
</htx:props>
<button onclick="counter += {{ step }}">+</button>
```

The expression engine replaces `{{ step }}` with the prop value before the HTML reaches the browser:

```html
<button onclick="counter += 5">+</button>
```

The browser never sees the expression — it gets resolved, static JavaScript.

## Patterns

### Injecting Config into Scripts

Server state becomes client JavaScript with zero serialization:

```html
<script>
  window.CONFIG = {
    authenticated: {{ if auth.authenticated }}true{{ endif }}{{ if not auth.authenticated }}false{{ endif }},
    plan: "{{ billing.plan }}",
    siteCount: {{ tenant.site.count }}
  };
</script>
```

No API call, no hydration, no fetch-on-mount. The client gets exactly what it needs in the initial HTML.

### Components That Ship Behavior

Components can define both structure and client-side behavior through props:

```html
<!-- components/counter.htx -->
<htx:props>
initial = "0"
step = "1"
</htx:props>
<div>
  <button onclick="adjust(-{{ step }})">-</button>
  <span>{{ initial }}</span>
  <button onclick="adjust(+{{ step }})">+</button>
</div>
```

Usage: `<htx:component src="components/counter.htx" initial="100" step="5" />`

The server renders the initial state AND bakes the step configuration into the event handlers. No client framework needed.

### Conditional Script Loading

Load client-side code only for users who need it:

```html
{{ if billing.canUseModules }}
<script src="/js/module-editor.js" defer></script>
{{ endif }}

{{ if auth.authenticated }}
<script src="/js/dashboard-widgets.js" defer></script>
{{ endif }}
```

### htmx Attribute Configuration

Context providers and props inject values into htmx directives:

```html
<!-- components/live-stat.htx -->
<htx:props>
endpoint
interval = "5000"
</htx:props>
<span hx-get="{{ endpoint }}"
      hx-trigger="every {{ interval }}ms"
      hx-swap="innerHTML">
  Loading...
</span>
```

The server determines what to poll and how often. The client just follows the htmx attributes.

### Dynamic Class Selection

Server state drives client-side appearance with no JavaScript:

```html
<div class="alert alert-{{ if error }}destructive{{ endif }}{{ if not error }}success{{ endif }}">
  {{ message }}
</div>
```

## Important: External Files for Non-Expression JavaScript

Since the expression engine processes ALL `{{ }}` patterns in the template, JavaScript that contains literal `{{ }}` (regex patterns, template literals, comments) must be placed in external files:

```html
<!-- BAD: this will error — engine sees {{ }} as an expression -->
<script>
  var pattern = /\{\{(.*?)\}\}/g;  // Empty expression error!
</script>

<!-- GOOD: JS in external file, never processed by engine -->
<script src="/js/app.js" defer></script>
```

The engine only processes `.htx` template files. Static files served from `public/` are never interpreted.

## Security Considerations

The default expression mode (`{{ expr }}`) applies HTML escaping. Inside script contexts, be aware:

- `{{ expr }}` escapes `< > & " '` — safe for HTML content, but inside a JavaScript string that's already in quotes, a value containing `"` could break out
- `{{ html expr }}` skips all escaping — never use inside script tags
- For user-controlled values in script contexts, consider JSON encoding or external API endpoints instead of inline injection

## Comparison

| Framework | Server → Client | Approach |
|-----------|----------------|----------|
| Next.js | getServerSideProps → JSON → hydration | Complex serialization layer |
| Rails | ERB inside script tags | Works but no expression sandboxing |
| PHP | echo inside script tags | Same pattern, no security model |
| HTX | Expressions inside script tags | Native to the interpreter, sandboxed |

## See Also

- [How HTX Works](/docs/how-htx-works) — why the interpreter processes everything
- [Components](/docs/context-providers) — how context providers supply data
- [Architecture Overview](/docs/architecture-overview) — the security model
