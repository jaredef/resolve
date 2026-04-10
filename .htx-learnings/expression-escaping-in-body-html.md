# Escaping {{ }} in body_html Content

## The Problem

Documentation content stored as `body_html` often contains `{{ expression }}` syntax in code examples. When injected via `{{ html doc.body_html }}`, these patterns get evaluated by the expression engine on the final rendering pass.

The processing order:
1. `{{ html doc.body_html }}` outputs the raw HTML (no escaping)
2. The expression engine runs a final pass on the complete page
3. `{{ variant }}` in a code example gets evaluated as a real expression → error or empty output

## What Doesn't Work

**Backslash escaping (`\{{`)** — fails because:
1. The seed script writes `\{{ variant }}` into body_html
2. `{{ html }}` outputs it raw: `\{{ variant }}`
3. `finalizeLiteralOutput()` un-escapes `\{{` back to `{{ variant }}`
4. The final expression pass evaluates `{{ variant }}` → error

## What Works: HTML Entities

Use `&#123;` (HTML entity for `{`) instead of literal `{`:

```typescript
// In the seed/render script:
html = html.replace(/\{\{/g, "&#123;&#123;");
```

This produces `&#123;&#123; variant }}` in the body_html. The expression engine sees `&#123;` (not `{`) and ignores it. The browser decodes the entity and displays `{{ variant }}` correctly.

## Three Escaping Layers for Documentation Content

| Syntax | Problem | Solution | Why It Works |
|--------|---------|----------|--------------|
| `__placeholder__` | Hydrator replaces with data | `&#95;&#95;` HTML entities | Hydrator matches `_` not `&#95;` |
| `{{ expression }}` | Expression engine evaluates | `&#123;&#123;` HTML entities | Engine matches `{` not `&#123;` |
| `<htx:type>` | DSL parser processes | cmark-gfm auto-escapes in `<code>` | Parser matches `<htx:` not `&lt;htx:` |

All three use the same principle: the engine operates on the raw string, but HTML entities are decoded by the browser after the engine is done.
