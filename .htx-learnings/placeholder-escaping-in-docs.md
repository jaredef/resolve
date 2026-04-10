# Escaping __placeholder__ Syntax in Documentation Content

## The Problem

Documentation about HTX often needs to show `__placeholder__` syntax (like `__title__`, `__body__`, `__payload__`) in code examples. The Hydrator matches `__word__` patterns and replaces them with data values — including inside `body_html` content injected from the database.

This means code examples showing `__payload__` get their content silently eaten, rendering as empty strings or broken HTML.

## Why Backslash Escaping Doesn't Work Here

The HTX literal syntax (`\__placeholder__`) works for `{{ expression }}` escaping via `finalizeLiteralOutput`, but `__placeholder__` hydration happens at a different pipeline stage. The backslash prefix is not recognized by the Hydrator — it matches `__word__` regardless of a preceding backslash, leaving a stray `\` in the output.

## The Fix: HTML Entities in body_html

When rendering markdown to `body_html` via cmark-gfm, post-process the rendered HTML to replace `__placeholder__` patterns with HTML entity-encoded underscores:

```typescript
// After cmark-gfm renders markdown to HTML:
bodyHtml = bodyHtml.replace(/__([a-zA-Z_]+)__/g, '&#95;&#95;$1&#95;&#95;');
```

This converts `__payload__` → `&#95;&#95;payload&#95;&#95;` in the HTML source.

**Result:**
- Browser renders it visually as `__payload__` (HTML entities decode to underscores)
- Hydrator's regex can't match it (sees `&#95;` not `_`)
- No data replacement, no empty strings, no stray backslashes

## When to Apply

Apply this entity escaping whenever you write `body_html` that contains HTX placeholder syntax in code examples:

```typescript
import { spawnSync } from "bun";

// 1. Render markdown to HTML
const result = spawnSync({
  cmd: ["cmark-gfm", "--extension", "table", "--extension", "autolink", "-t", "html", "--unsafe"],
  stdin: Buffer.from(markdownBody),
});
let bodyHtml = result.stdout.toString();

// 2. Escape __placeholder__ patterns
bodyHtml = bodyHtml.replace(/__([a-zA-Z_]+)__/g, '&#95;&#95;$1&#95;&#95;');

// 3. Store as body_html
meta.body_html = bodyHtml;
```

## Three Layers of HTX Syntax Escaping in Docs

| Syntax | Problem | Solution | Where |
|--------|---------|----------|-------|
| `__placeholder__` | Hydrator replaces with data | HTML entities (`&#95;&#95;`) | body_html post-processing |
| `{{ expression }}` | Expression engine evaluates it | Hydrator auto-escapes `{{` to `\{{` in trusted fields | Built into Hydrator |
| `<htx:type>` etc. | DSL parser processes it | cmark-gfm `renderMarkdown()` backslash-prefixes in `<code>` blocks | Write-time in SQLite adapter |
