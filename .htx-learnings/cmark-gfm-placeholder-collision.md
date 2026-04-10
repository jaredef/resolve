# cmark-gfm Renders __placeholder__ as Bold and {{ }} as Text

## The Problem

Documentation content about HTX written in markdown gets mangled by cmark-gfm:

1. `__slug__` renders as **slug** (markdown bold syntax)
2. `{{ expression }}` and `<htx:type>` survive as literal text but can collide with the engine's expression evaluator and hydrator when rendered in templates

## Why It Happens

cmark-gfm interprets `__text__` as bold (GFM convention). And when the rendered `body_html` contains literal `{{ }}` or `__placeholder__` syntax, the HTX engine tries to evaluate/hydrate them during template rendering.

## Solutions

### For __placeholder__ in prose
Wrap in backticks: `` `__slug__` `` renders as `<code>__slug__</code>`, which cmark-gfm doesn't interpret as bold.

### For HTX syntax in documentation
The SQLite adapter's `renderMarkdown()` function auto-escapes HTX syntax inside `<code>` blocks with backslash prefixes. This prevents the engine from processing them.

For body_html containing literal HTX syntax outside code blocks, the Hydrator's `TRUSTED_HTML_FIELDS` injects it without escaping — but the expression engine and placeholder hydrator still run on the surrounding template. Wrap `body_html` output in a context where expressions have already been evaluated.

### Write-time rendering
cmark-gfm runs at write time (during `adapter.create()` / `adapter.update()`), not at read time. The rendered HTML is stored in `meta.body_html`. Reads have zero markdown parsing cost.
