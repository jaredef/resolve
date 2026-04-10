# Placeholders & Hydration

Placeholders are the mechanism by which record data is injected into rendered HTML. They use a double-underscore syntax and are resolved during the hydration phase of template processing.

## Placeholder Syntax

A placeholder is a field name surrounded by double underscores:

```html
<h1>__title__</h1>
<p>Published on __created_at__</p>
```

Placeholders appear inside `htx:each` blocks (where they are hydrated once per record) or directly inside an `<htx>` block that fetches a single record via `htx:slug`.

All placeholder output is HTML-escaped by default to prevent cross-site scripting. The sole exception is fields explicitly designated as trusted (see Trusted Fields below).

---

## System Fields

Every record exposes the following system fields regardless of the data adapter in use.

| Field          | Type      | Description                                 |
|----------------|-----------|---------------------------------------------|
| `id`           | string    | Unique identifier assigned by the adapter   |
| `type`         | string    | Content type (matches `htx:type` value)     |
| `slug`         | string    | URL-safe unique identifier                  |
| `title`        | string    | Display title                               |
| `body`         | string    | Raw body content (plain text or markup)     |
| `status`       | string    | Publication status (e.g. `published`, `draft`) |
| `created_at`   | string    | ISO 8601 creation timestamp                 |
| `updated_at`   | string    | ISO 8601 last-modified timestamp            |

System fields are always available. If a record does not have a value for a given system field, the placeholder resolves to an empty string.

```html
<htx htx:type="post" htx:slug="{{ route.slug }}">
  <article>
    <h1>__title__</h1>
    <time datetime="__created_at__">__created_at__</time>
    <div>__body__</div>
  </article>
</htx>
```

---

## Custom Fields

Fields beyond the system set come from the record's meta JSON object. The adapter stores arbitrary key-value pairs in meta, and they are surfaced as placeholders using the same double-underscore syntax.

If a record's meta contains:

```json
{
  "author": "Jane Doe",
  "category": "engineering",
  "featured_image": "/uploads/hero.jpg"
}
```

Then the following placeholders are valid:

```html
<p>By __author__</p>
<img src="__featured_image__" alt="__title__" />
<span class="tag">__category__</span>
```

Custom field names should use lowercase letters, numbers, and underscores. Other characters in field names may not resolve correctly.

---

## Dot Notation for Nested Access

When meta contains nested objects, use dot-separated paths inside the placeholder to access deeper values.

Given this meta:

```json
{
  "author": {
    "name": "Jane Doe",
    "avatar": "/img/jane.jpg"
  },
  "seo": {
    "description": "A deep dive into HTX templates.",
    "og_image": "/uploads/og.jpg"
  }
}
```

Access nested values:

```html
<p>By __author.name__</p>
<img src="__author.avatar__" />
<meta name="description" content="__seo.description__" />
```

If any segment in the dot path is missing or null, the entire placeholder resolves to an empty string. No error is thrown.

Dot notation supports arbitrary depth, but in practice nesting beyond 3-4 levels suggests the data model should be restructured.

---

## Trusted Fields

Most placeholder values are HTML-escaped before insertion. This means characters like `<`, `>`, `&`, and `"` are converted to their entity equivalents.

The exception is `body_html`. This field is designated as **trusted** and is inserted without escaping. It is intended for pre-rendered HTML content (e.g., Markdown converted to HTML by the adapter before storage).

```html
<htx htx:type="post" htx:slug="{{ route.slug }}">
  <article>
    <h1>__title__</h1>
    <!-- body_html is NOT escaped — HTML tags render as-is -->
    <div class="prose">__body_html__</div>
  </article>
</htx>
```

Only `body_html` is trusted by default. If your adapter provides other pre-rendered HTML fields, use the `{{! }}` raw expression syntax instead:

```html
<div>{{! result.custom_html_field }}</div>
```

The design principle: trust is explicit. Escaping is the default, and only specifically designated outputs bypass it.

---

## Escaping Placeholders

To display the literal text `__title__` in your rendered output without it being replaced by a record value, use the `htx:raw` directive:

```html
<htx:raw>
  <p>The __title__ placeholder inserts the record's title.</p>
</htx:raw>
```

Inside `htx:raw` blocks, no placeholder substitution occurs. This is the recommended approach for documentation pages or code examples that need to show placeholder syntax.

Alternatively, you can use a zero-width space or HTML entity between the underscores to break the pattern, though `htx:raw` is the cleaner solution.

---

## Hydrator Processing Order

The hydrator runs after the template has been parsed into a node tree and data has been fetched from the adapter. It processes each `<htx>` block through six ordered steps.

### Step 1: Data Fetch

The engine reads the `htx:type`, `htx:slug`, `htx:where`, `htx:order`, `htx:howmany`, `htx:offset`, and `htx:fields` directives from the `<htx>` element and issues a query to the data adapter. The adapter returns an array of records (possibly empty).

### Step 2: Block Selection

Based on the result count, the engine selects which child blocks to render:

- **One or more records**: The `htx:each` block is selected. The `htx:none` block is discarded.
- **Zero records**: The `htx:none` block is selected. The `htx:each` block is discarded.

If the query used `htx:slug` and returned one record, the record's fields are available directly without `htx:each` (though `htx:each` still works with a single-item set).

### Step 3: Loop Expansion

For each record in the result set, the engine clones the `htx:each` block's child nodes. Loop metadata variables (`loop.index`, `loop.first`, etc.) are computed and bound to each clone's scope.

### Step 4: Placeholder Substitution

Within each cloned block, every `__field__` placeholder is matched against the current record. System fields are checked first, then custom fields from meta. Matched placeholders are replaced with the field value (HTML-escaped unless trusted). Unmatched placeholders resolve to an empty string.

### Step 5: Expression Evaluation

After placeholder substitution, any `{{ }}` expressions in the block are evaluated. This includes conditionals, ternaries, filters, and variable references. Expression evaluation happens after placeholder substitution so that placeholders within expressions are resolved first.

### Step 6: Wrapper Removal

The `<htx>` element itself is removed from the output. Only its rendered children remain in the final HTML. This means `<htx>` blocks leave no trace in the DOM.

### Processing Order Diagram

```
Template Source
    │
    ▼
[1] Data Fetch ──────────────► Adapter
    │                              │
    ▼                              ▼
[2] Block Selection ◄──────── Result Set
    │
    ▼
[3] Loop Expansion
    │
    ▼
[4] Placeholder Substitution
    │
    ▼
[5] Expression Evaluation
    │
    ▼
[6] Wrapper Removal
    │
    ▼
Final HTML
```

---

## Placeholder vs. Expression Syntax

HTX provides two ways to insert dynamic values, and understanding when to use each is important.

| Feature               | Placeholders (`__field__`)       | Expressions (`{{ var }}`)        |
|-----------------------|----------------------------------|----------------------------------|
| Scope                 | Current record fields            | All scopes (route, query, etc.)  |
| Escaping              | Auto-escaped (except trusted)    | Auto-escaped (use `{{! }}` for raw) |
| Logic support         | None                             | Conditionals, filters, ternary   |
| Use case              | Simple field output              | Dynamic logic, cross-scope data  |
| Processing phase      | Step 4 (before expressions)      | Step 5 (after placeholders)      |

Use placeholders for straightforward record field output. Use expressions when you need logic, cross-scope references, or filters.

```html
<!-- Placeholder: simple field output -->
<h1>__title__</h1>

<!-- Expression: conditional logic -->
<span class="{{ status == 'published' ? 'live' : 'draft' }}">
  {{ status | uppercase }}
</span>
```
