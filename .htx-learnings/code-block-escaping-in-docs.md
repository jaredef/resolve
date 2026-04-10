# Code Block Escaping in Documentation

## Problem

When documentation articles contain HTX syntax in code examples, the Hydrator processes them as live expressions/placeholders, destroying the code examples.

Two patterns are affected:
- `__placeholder__` patterns (e.g., `__title__`, `__slug__`) — the Hydrator replaces these with data values
- `{{ expression }}` patterns (e.g., `{{ ws.token }}`, `{{ doc.title }}`) — the Expression Engine evaluates these

## What cmark-gfm Does

The SQLite adapter's `renderMarkdown()` function auto-escapes HTX syntax inside `<code>` blocks:
- `__placeholder__` → `\__placeholder__`
- `{{` → `\{{`
- `}}` → `\}}`

This prevents the Hydrator and Expression Engine from matching them. BUT the backslashes render visibly in the browser: `\__title__` and `\{{ ws.token }}`.

## The Fix: HTML Entities

After cmark-gfm renders markdown to body_html, post-process to replace backslash escapes with HTML entities:

### For `__placeholder__` patterns:
```
\__slug__  →  &#95;&#95;slug&#95;&#95;
```

The regex:
```javascript
bodyHtml = bodyHtml.replace(/\\__([a-zA-Z_][a-zA-Z0-9_.]*?)__/g, '&#95;&#95;$1&#95;&#95;');
```

### For `{{ }}` expression patterns:
Replace `{{` and `}}` inside `<code>` blocks with HTML entities:
```
{{  →  &#123;&#123;
}}  →  &#125;&#125;
```

The regex (scoped to code blocks):
```javascript
bodyHtml = bodyHtml.replace(/<code[^>]*>[\s\S]*?<\/code>/g, function(block) {
  return block
    .replace(/\{\{/g, '&#123;&#123;')
    .replace(/\}\}/g, '&#125;&#125;');
});
```

## Why HTML Entities Work

- `&#95;` renders as `_` in the browser but the Hydrator's regex (`/__([a-zA-Z_]+)__/g`) doesn't match HTML entities
- `&#123;` renders as `{` in the browser but the Expression Engine's lexer doesn't match HTML entities
- The visual output is correct: users see `__title__` and `{{ ws.token }}`
- The Hydrator and Expression Engine skip them entirely

## When to Apply

Apply after every cmark-gfm render — in the seed script, in the SQLite adapter's create() path, or as a bulk fix on existing body_html.

## DO NOT use backslash escaping

`\__payload__` shows a visible backslash in the browser. The backslash escaping only works for the Expression Engine's literal syntax mode, not for the Hydrator's placeholder replacement. Always use HTML entities for documentation content.
