# Templates and the HTX DSL

An `.htx` file is an HTML template augmented with HTX directives. The directives declare what content the page needs, how to render it, and how to handle mutations.

## File Anatomy

A typical HTX file has three parts:

1. **Meta directives** — Declare the content type, filters, ordering, and action
2. **Template block** — The HTML wrapped in `<htx>...</htx>` that gets rendered with data
3. **Response blocks** — Optional response templates for mutation outcomes

```html
<!-- Meta directives -->
<htx:type>post</htx:type>
<htx:where>status=published</htx:where>
<htx:order>newest</htx:order>
<htx:howmany>10</htx:howmany>

<!-- Response block -->
<htx:response name="none">
<p>No posts found.</p>
</htx:response>

<!-- Template block -->
<htx>
<htx:each>
<article>
  <h2>__title__</h2>
  <p>__body__</p>
</article>
</htx:each>
</htx>
```

## Meta Directives

Meta directives are XML-style tags that configure the content query or mutation action. They are extracted by the `MetaExtractor` and removed from the final HTML output.

### Read Directives

| Directive | Purpose | Example |
|-----------|---------|---------|
| `<htx:type>` | Content type to query | `<htx:type>post</htx:type>` |
| `<htx:slug>` | Fetch a single record by slug | `<htx:slug>{{ route.slug }}</htx:slug>` |
| `<htx:where>` | Filter conditions (comma-separated) | `<htx:where>status=published,category=tech</htx:where>` |
| `<htx:order>` | Sort order | `<htx:order>newest</htx:order>` |
| `<htx:howmany>` | Limit (number of rows) | `<htx:howmany>10</htx:howmany>` |
| `<htx:offset>` | Pagination offset | `<htx:offset>{{ query.page }}</htx:offset>` |
| `<htx:fields>` | Field selection | `<htx:fields>title,slug,created_at</htx:fields>` |

### Mutation Directives

| Directive | Purpose | Example |
|-----------|---------|---------|
| `<htx:action>` | Mutation type: `save`, `update`, or `delete` | `<htx:action>save</htx:action>` |
| `<htx:recordId>` | Target record ID (supports expressions) | `<htx:recordId>{{ route.id }}</htx:recordId>` |

### Where Syntax

The `where` directive accepts comma-separated conditions. Each condition uses a field name, an operator, and a value:

```html
<htx:where>status=published</htx:where>
<htx:where>status=published,category=tech</htx:where>
<htx:where>created_at>=2024-01-01</htx:where>
```

Supported operators: `=`, `!=`, `>`, `<`, `>=`, `<=`

System columns (`id`, `type`, `slug`, `title`, `body`, `status`, `created_at`, `updated_at`) are queried directly. Custom fields are queried via JSON extraction from the `meta` column.

### Order Options

| Value | Sorting |
|-------|---------|
| `newest` | `created_at DESC` (default) |
| `oldest` | `created_at ASC` |
| `alpha` / `alphabetical` | `title ASC` |
| `alpha_desc` | `title DESC` |
| `updated` | `updated_at DESC` |

## Template Blocks

The `<htx>...</htx>` block contains the HTML that gets rendered with queried data. A file can have multiple template blocks, each with its own set of meta directives.

### Data Placeholders

Inside template blocks, `__fieldname__` placeholders are replaced with row values by the Hydrator:

```html
<h1>__title__</h1>
<p>By __author__ on __created_at__</p>
```

All placeholder values are HTML-escaped by default, except for fields in the trusted set (currently `body_html`).

### Iteration

Use `<htx:each>` inside a template block to render once per row:

```html
<htx>
<htx:each>
<article>
  <h2><a href="/blog/__slug__">__title__</a></h2>
</article>
</htx:each>
</htx>
```

Inside `<htx:each>`, the `loop` variable provides iteration metadata:

| Property | Type | Description |
|----------|------|-------------|
| `loop.index` | number | Zero-based index |
| `loop.count` | number | One-based count |
| `loop.first` | boolean | True for the first item |
| `loop.last` | boolean | True for the last item |
| `loop.length` | number | Total number of items |

### Empty State

Use `<htx:none>` as a sibling of `<htx:each>` to render when the query returns zero rows:

```html
<htx>
<htx:each>
  <article>__title__</article>
</htx:each>
<htx:none>
  <p>No content found.</p>
</htx:none>
</htx>
```

### Conditional Iteration

`<htx:each>` supports a `where` attribute for client-side filtering of rows:

```html
<htx:each where="status == 'published'">
  <article>__title__</article>
</htx:each>
```

The condition is evaluated by the expression engine against each row.

## Response Blocks

Response blocks define templates for mutation outcomes:

```html
<htx:response name="redirect">/admin/posts</htx:response>
<htx:response name="success"><div class="success">Saved!</div></htx:response>
<htx:response name="error"><div class="error">__error__</div></htx:response>
```

| Name | When Used |
|------|-----------|
| `redirect` | After a successful mutation, redirect to this URL |
| `success` | Render this HTML on success (if no redirect) |
| `error` | Render this HTML on failure |
| `none` | Render when a read query returns zero rows |

## Expression Interpolation

Both inside and outside template blocks, `{{ expression }}` syntax evaluates expressions:

```html
<p>Total posts: {{ result.total }}</p>
<p>Page {{ query.page | default:1 }}</p>
<p>{{ if result.total > 0 }}Found content{{ endif }}</p>
```

See [Expression Engine](./06-expression-engine.md) for the full expression language reference.

## Multiple Blocks Per File

A single HTX file can contain multiple independent blocks, each with its own meta directives and template:

```html
<h1>Dashboard</h1>

<htx:type>post</htx:type>
<htx>
<p>Total posts: {{ result.total }}</p>
</htx>

<htx:type>comment</htx:type>
<htx>
<p>Total comments: {{ result.total }}</p>
</htx>
```

Each block is parsed and executed independently. The results are spliced back into the page in order.
