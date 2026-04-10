The `<htx:raw>` directive tells the engine to treat its content as literal text — no placeholder replacement, no expression evaluation. This is essential for documentation pages that show HTX template code in examples.

## The Problem

When a page contains HTX placeholder syntax inside code blocks, the Hydrator replaces them with actual data values:

```html
<!-- You write this in a code example -->
<a href="/articles/__slug__">__title__</a>

<!-- But the Hydrator turns it into -->
<a href="/articles/quick-start">Quick Start Guide</a>
```

The same happens with `{{ expression }}` syntax — the Expression Engine evaluates it even inside code fences.

## The Solution

Wrap literal content in `<htx:raw>`:

```html
<htx:raw>
<pre><code>
<a href="/articles/__slug__">__title__</a>
<p>{{ user.name }}</p>
</code></pre>
</htx:raw>
```

The engine preserves `__slug__`, `__title__`, and `{{ user.name }}` as literal text. The `<htx:raw>` tags are stripped from the final output — only the content inside remains.

## How It Works

The literal syntax system operates in two phases:

### Phase 1: Protect (early in the pipeline)

`protectRawBlocks()` runs before expression evaluation and hydration. It finds all `<htx:raw>` blocks and escapes the syntax inside them:

- `__placeholder__` becomes `\__placeholder__`
- `{{ expression }}` becomes `\{{ expression }}`

The escaped forms are invisible to the Hydrator and Expression Engine — they skip right over them.

### Phase 2: Finalize (at render boundaries)

`finalizeLiteralOutput()` runs at the final render step. It:

1. Strips all `<htx:raw>` and `</htx:raw>` tags
2. Unescapes `\{{` back to `{{`
3. Unescapes `\}}` back to `}}`
4. Unescapes `\__` back to `__`

The result is clean HTML with literal placeholder and expression syntax preserved.

## Where It Runs

The protection and finalization are wired into every rendering path:

| Component | Protection | Finalization |
|-----------|-----------|--------------|
| ExpressionEngine | `protectRawBlocks()` before evaluation | — |
| Hydrator | `protectRawBlocks()` before placeholder replacement | — |
| RequestHandler | — | `finalizeLiteralOutput()` at response boundary |
| GetContentExecutor | — | `finalizeLiteralOutput()` at response boundary |
| SetContentExecutor | — | `finalizeLiteralOutput()` at response boundary |
| DeleteContentExecutor | — | `finalizeLiteralOutput()` at response boundary |

This ensures that intermediate processing passes (layout wrapping, include expansion, component resolution) keep the escaped forms intact, and only the final render step restores the literal syntax.

## Markdown Adapter Integration

The Markdown Adapter automatically protects placeholder and expression syntax in `body_html` during content ingestion. When markdown files are read and converted to HTML, any `__placeholder__` or `{{ expression }}` patterns in code blocks are pre-escaped so they survive the rendering pipeline.

This means markdown documentation files don't need explicit `<htx:raw>` blocks — the adapter handles it automatically for code fences.

## Usage Examples

### Documenting Template Directives

```html
<htx:raw>
<pre><code>
<htx:type>article</htx:type>
<htx:where>status=published</htx:where>
<htx:order>newest</htx:order>
<htx>
<htx:each>
  <h2>__title__</h2>
  <p>{{ summary }}</p>
</htx:each>
</htx>
</code></pre>
</htx:raw>
```

### Showing Expression Syntax

```html
<htx:raw>
<code>{{ if count > 0 }}{{ count }} items{{ endif }}</code>
</htx:raw>
```

### Protecting Non-Code Content

`<htx:raw>` works outside code blocks too — useful for any content that should be literal:

```html
<htx:raw>
<p>The __slug__ placeholder is replaced with the page's URL slug.</p>
</htx:raw>
```

## Manual Escaping

You can also escape individual instances without `<htx:raw>`:

- `\__slug__` renders as `__slug__`
- `\{{ expression }}` renders as `{{ expression }}`

This is useful for inline mentions in prose text where wrapping in `<htx:raw>` would be verbose.