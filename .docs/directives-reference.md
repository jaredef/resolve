# Directives Reference

HTX directives are special attributes on HTML elements that instruct the template engine how to fetch data, iterate over results, compose partial templates, and handle mutations. Every directive uses the `htx:` namespace prefix.

## Read Directives

Read directives appear on the root `<htx>` wrapper element. Together they describe a single data query.

### htx:type

Specifies the content type to query. Required for any data-fetching block.

```html
<htx htx:type="post">
  <!-- results of type "post" are available here -->
</htx>
```

The value must match a type registered with the data adapter. The engine passes this string verbatim to the adapter's `read` method.

### htx:slug

Fetches a single record by its unique slug. When present, `htx:howmany` is ignored and exactly zero or one record is returned.

```html
<htx htx:type="page" htx:slug="about">
  <h1>__title__</h1>
</htx>
```

You can also bind the slug to a route parameter:

```html
<htx htx:type="post" htx:slug="{{ route.slug }}">
  <article>__body_html__</article>
</htx>
```

### htx:where

Filters results with one or more conditions. Each condition follows the pattern `field operator value`. Multiple conditions are separated by commas and combined with AND logic.

```html
<htx htx:type="post" htx:where="status = published, category = news">
  ...
</htx>
```

#### Where Clause Operators

| Operator | Meaning                  | Example                      |
|----------|--------------------------|------------------------------|
| `=`      | Equal                    | `status = published`         |
| `!=`     | Not equal                | `status != draft`            |
| `>`      | Greater than             | `priority > 3`               |
| `<`      | Less than                | `priority < 10`              |
| `>=`     | Greater than or equal    | `priority >= 5`              |
| `<=`     | Less than or equal       | `priority <= 8`              |

Values are trimmed of whitespace. If a value contains a comma, the behavior is undefined since commas delimit conditions.

### htx:order

Controls the sort order of returned records.

| Value         | Description                              |
|---------------|------------------------------------------|
| `newest`      | Descending by `created_at` (default)     |
| `oldest`      | Ascending by `created_at`                |
| `alpha`       | Ascending alphabetical by `title`        |
| `alpha_desc`  | Descending alphabetical by `title`       |
| `updated`     | Descending by `updated_at`              |

```html
<htx htx:type="post" htx:order="alpha">
  ...
</htx>
```

### htx:howmany

Limits the number of records returned. Accepts a positive integer.

```html
<htx htx:type="post" htx:howmany="10">
  ...
</htx>
```

When omitted, the adapter's default limit applies. When `htx:slug` is present, this directive is ignored.

### htx:offset

Skips the first N records. Used together with `htx:howmany` for pagination.

```html
<htx htx:type="post" htx:howmany="10" htx:offset="10">
  <!-- page 2 -->
</htx>
```

### htx:fields

Requests only specific fields from the adapter, reducing payload size. Accepts a comma-separated list of field names.

```html
<htx htx:type="post" htx:fields="title, slug, created_at">
  ...
</htx>
```

The adapter may ignore this directive if it does not support field projection.

---

## Template Block Directives

### htx (Wrapper Element)

The `<htx>` element is the root container for a data-fetching block. It is stripped from the final HTML output. All read directives must appear on this element.

```html
<htx htx:type="post" htx:howmany="5" htx:order="newest">
  <htx:each>
    <article>
      <h2>__title__</h2>
    </article>
  </htx:each>
  <htx:none>
    <p>No posts found.</p>
  </htx:none>
</htx>
```

### htx:each

Iterates over every record in the result set. Must be a direct child of `<htx>`. Placeholders inside this block are hydrated per-record.

```html
<htx:each>
  <div class="card">
    <h3>__title__</h3>
    <time>__created_at__</time>
  </div>
</htx:each>
```

#### Loop Metadata

Inside `htx:each`, the following expression variables are available:

| Variable         | Type    | Description                            |
|------------------|---------|----------------------------------------|
| `loop.index`     | number  | Current iteration, 1-based             |
| `loop.index0`    | number  | Current iteration, 0-based             |
| `loop.first`     | boolean | True on the first iteration            |
| `loop.last`      | boolean | True on the last iteration             |
| `loop.length`    | number  | Total number of items in the set       |

```html
<htx:each>
  <div class="{{ loop.first ? 'card featured' : 'card' }}">
    <span class="count">{{ loop.index }} of {{ loop.length }}</span>
    <h3>__title__</h3>
  </div>
</htx:each>
```

### htx:none

Rendered only when the query returns zero results. Must be a direct child of `<htx>`.

```html
<htx htx:type="event" htx:where="status = upcoming">
  <htx:each>
    <p>__title__ — __date__</p>
  </htx:each>
  <htx:none>
    <p>No upcoming events.</p>
  </htx:none>
</htx>
```

---

## Composition Directives

### htx:include

Injects the contents of another template file. The included file is processed in full (directives, expressions, placeholders all resolve). Paths can be absolute (from project root) or relative (from the current file).

```html
<!-- absolute path from project root -->
<htx:include path="partials/header.html" />

<!-- relative path -->
<htx:include path="./sidebar.html" />
```

Includes are recursive but enforced with a depth limit (default: 10 levels). Exceeding the limit produces a render error rather than an infinite loop.

### htx:component

Declares a reusable component. Unlike `htx:include`, a component receives explicit props and renders its own slot content.

```html
<!-- definition: components/card.html -->
<div class="card {{ props.variant }}">
  <h3>{{ props.title }}</h3>
  <htx:slot />
</div>
```

```html
<!-- usage -->
<htx:component path="components/card.html" title="Hello" variant="featured">
  <p>This becomes the slot content.</p>
</htx:component>
```

### htx:slot and htx:fill

`htx:slot` marks where child content is injected inside a component. A component may declare multiple named slots.

```html
<!-- component definition -->
<header><htx:slot name="header" /></header>
<main><htx:slot /></main>
<footer><htx:slot name="footer" /></footer>
```

```html
<!-- usage -->
<htx:component path="components/layout.html">
  <htx:fill slot="header"><h1>Page Title</h1></htx:fill>
  <p>Main content goes into the default slot.</p>
  <htx:fill slot="footer"><small>Copyright 2026</small></htx:fill>
</htx:component>
```

The unnamed `<htx:slot />` receives any child content not wrapped in `htx:fill`.

### htx:props

Declares expected props for a component with optional defaults. Placed at the top of a component file.

```html
<htx:props title="" variant="default" show_icon="true" />
```

Props without a default value are required. The engine emits a warning if a required prop is missing at the call site.

### htx:let

Introduces a scoped variable binding. The variable is available to all descendant elements.

```html
<htx:let name="page_class" value="home dark-mode" />
<body class="{{ page_class }}">
  ...
</body>
```

---

## Mutation Directives

### htx:action

Specifies the mutation type for a form block. Valid values are `save`, `update`, and `delete`.

```html
<htx htx:type="comment" htx:action="save">
  <form method="post">
    ...
  </form>
</htx>
```

See the [Mutations and Action Tokens](/docs/mutations-tokens) article for the full two-phase flow.

### htx:recordId

Identifies the specific record to update or delete. Required for `update` and `delete` actions.

```html
<htx htx:type="post" htx:action="update" htx:recordId="{{ route.id }}">
  <form method="post">
    <input name="title" value="__title__" />
    <button type="submit">Update</button>
  </form>
</htx>
```

### htx:response

Defines named response blocks that render conditionally after a mutation completes.

```html
<htx:response name="success">
  <p>Your comment was saved.</p>
</htx:response>

<htx:response name="error">
  <p>Something went wrong. Please try again.</p>
</htx:response>
```

See [Mutations and Action Tokens](/docs/mutations-tokens) for the full list of response block names and their priority.

---

## Literal Output

### htx:raw

Outputs its content without processing any directives or expressions inside it. Useful for documenting HTX syntax or embedding client-side templates that use similar delimiters.

```html
<htx:raw>
  <p>This {{ expression }} is printed literally, not evaluated.</p>
  <p>Placeholders like __title__ also pass through unchanged.</p>
</htx:raw>
```

---

## Quick Reference Table

| Directive        | Context       | Purpose                                |
|------------------|---------------|----------------------------------------|
| `htx:type`       | `<htx>`       | Content type to query                  |
| `htx:slug`       | `<htx>`       | Fetch single record by slug            |
| `htx:where`      | `<htx>`       | Filter conditions                      |
| `htx:order`      | `<htx>`       | Sort order                             |
| `htx:howmany`    | `<htx>`       | Limit result count                     |
| `htx:offset`     | `<htx>`       | Skip N records                         |
| `htx:fields`     | `<htx>`       | Request specific fields                |
| `htx:each`       | inside `<htx>`| Iterate over results                   |
| `htx:none`       | inside `<htx>`| Render when zero results               |
| `htx:include`    | anywhere      | Include another template               |
| `htx:component`  | anywhere      | Render a component with props          |
| `htx:slot`       | component def | Mark injection point for child content |
| `htx:fill`       | component use | Target a named slot                    |
| `htx:props`      | component def | Declare expected props                 |
| `htx:let`        | anywhere      | Bind a scoped variable                 |
| `htx:action`     | `<htx>`       | Mutation type (save/update/delete)     |
| `htx:recordId`   | `<htx>`       | Target record for mutation             |
| `htx:response`   | inside `<htx>`| Conditional post-mutation block        |
| `htx:raw`        | anywhere      | Output content without processing      |
