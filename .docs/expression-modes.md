# Expression Modes

HTX expressions support four output modes that control how values are escaped when rendered into the template.

## Modes

### Default: HTML Escaping

```html
{{ title }}
```

Escapes `< > & " '` for safe HTML content. This is the default and should be used for rendering text into HTML elements.

### Raw: No Escaping

```html
{{ html body_html }}
{{! body_html }}
```

No escaping applied. Use only for trusted, pre-rendered HTML (like `body_html` from the database). Never use with user input.

### JavaScript String Escaping

```html
{{ js auth.name }}
```

Escapes for safe embedding inside JavaScript strings:
- Backslash-escapes `\ " '`
- Escapes newlines, tabs, carriage returns
- Escapes `/ < >` to prevent script injection

Use inside script tags and event handler attributes when embedding string values:

```html
<script>
  var userName = "{{ js auth.name }}";
  var greeting = '{{ js welcomeMessage }}';
</script>

<button onclick="confirm('Delete {{ js item.title }}?')">Delete</button>
```

### JSON Serialization

```html
{{ json config }}
```

Calls `JSON.stringify()` on the value. Use for embedding objects, arrays, numbers, and booleans into JavaScript:

```html
<script>
  var config = {{ json siteConfig }};
  var items = {{ json cart.items }};
  var count = {{ json tenant.site.count }};
</script>
```

## When to Use Which

| Context | Mode | Example |
|---------|------|---------|
| HTML element content | `{{ expr }}` | `<h1>{{ title }}</h1>` |
| HTML attribute value | `{{ expr }}` | `<a href="{{ url }}">` |
| Trusted HTML injection | `{{ html expr }}` | `{{ html doc.body_html }}` |
| JS string value | `{{ js expr }}` | `var x = "{{ js name }}";` |
| JS object/array/number | `{{ json expr }}` | `var data = {{ json items }};` |
| Event handler string | `{{ js expr }}` | `onclick="alert('{{ js msg }}')"` |
| htmx attribute | `{{ expr }}` | `hx-get="{{ endpoint }}"` |

## Security Notes

- `{{ expr }}` (default) is always safe for HTML contexts
- `{{ js expr }}` is safe for JavaScript string contexts — prevents quote breakout and script injection
- `{{ json expr }}` is safe for JavaScript value contexts — produces valid JSON that can't break out of an assignment
- `{{ html expr }}` skips ALL escaping — use only for content you control (database body_html, not user input)
- Never use `{{ html }}` inside `<script>` tags — use `{{ js }}` or `{{ json }}` instead
