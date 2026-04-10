---
title: Hydrator
status: published
section: data-and-content
section_label: Data and Content
summary: Placeholder replacement, HTML escaping, dot notation, and trusted fields.
created_at: 2026-03-28 00:11:00
---

The Hydrator replaces `__placeholder__` tokens in rendered HTML with actual data from content rows. It is the final data-binding step before a page is sent to the browser.

## How It Works

Given a template string and a data record, the Hydrator scans for `__fieldname__` placeholders and substitutes them with the corresponding value from the record. Every substituted value is HTML-escaped by default to prevent cross-site scripting (XSS).

```ts
import { Hydrator } from "@htx/engine";

const hydrator = new Hydrator();
const html = hydrator.hydrate("<h1>__title__</h1>", { title: "Hello & Goodbye" });
// Result: <h1>Hello &amp; Goodbye</h1>
```

## HTML Escaping

All placeholder values pass through an escape function that converts the following characters:

| Character | Replacement |
|-----------|-------------|
| `&` | `&amp;` |
| `<` | `&lt;` |
| `>` | `&gt;` |
| `"` | `&quot;` |
| `'` | `&#039;` |

Objects and arrays are serialized with `JSON.stringify` before escaping. Null and undefined values are converted to an empty string.

## Trusted Fields

Some fields contain pre-sanitized HTML that should not be double-escaped. The Hydrator maintains an internal set of trusted field names that bypass escaping:

| Trusted Field | Purpose |
|---------------|---------|
| `body_html` | Pre-rendered HTML body content |

Trusted fields are injected as raw strings without any character replacement.

### The `__body__` Alias

As a convenience, the placeholder `__body__` is automatically resolved to the value of `body_html` (if present). This lets templates use the shorter `__body__` placeholder while still getting the pre-rendered HTML content. When this alias is used, both `body` and `body_html` are consumed from the data record so they are not processed a second time.

```html
<!-- Both of these produce the same output when body_html is present -->
<div>__body__</div>
<div>__body_html__</div>
```

## Placeholder Resolution

### System Fields

System fields are the top-level columns stored directly on the content row. They map one-to-one with `__placeholder__` tokens:

| Field | Placeholder | Example Value |
|-------|-------------|---------------|
| `id` | `__id__` | `42` |
| `type` | `__type__` | `post` |
| `slug` | `__slug__` | `hello-world` |
| `title` | `__title__` | `Hello World` |
| `body` | `__body__` | (resolved from `body_html`) |
| `status` | `__status__` | `published` |
| `created_at` | `__created_at__` | `2025-01-15 10:30:00` |
| `updated_at` | `__updated_at__` | `2025-01-16 08:00:00` |

### Custom Fields (from meta JSON)

Custom fields are stored in the `meta` JSON column and are flattened into the data record before hydration. They use the same `__fieldname__` syntax:

```html
<htx:type>post</htx:type>
<htx>
<article>
  <h2>__title__</h2>
  <span class="category">__category__</span>
  <span class="author">__author_name__</span>
</article>
</htx>
```

Here `category` and `author_name` are custom fields stored in the `meta` JSON, while `title` is a system column.

### Dot Notation

The Hydrator supports one level of dot notation to access properties of nested objects in the data record:

```html
<p>Author: __author.name__</p>
<p>Email: __author.email__</p>
```

Dot notation placeholders are resolved after flat-key placeholders. If the object key does not exist in the data, or the property is not found on the object, the placeholder is left in place for the unresolved cleanup pass.

Dot notation values are always HTML-escaped. There is no trusted-field exception for nested properties.

## Escaped Placeholders

To render a literal `__fieldname__` in the output without it being replaced, prefix it with a backslash:

```html
<code>\__title__</code>
<!-- Output: <code>__title__</code> -->
```

The Hydrator extracts escaped placeholders before processing, replaces them with HTML comment markers, and restores the original literal text after all substitutions are complete.

## Edge Cases

### Missing Fields

If a placeholder has no corresponding key in the data record, it is silently removed from the output. The Hydrator runs a final cleanup pass that strips any remaining `__placeholder__` tokens that were not matched by either flat-key or dot-notation resolution.

```html
<!-- If "subtitle" is not in the data record -->
<p>__subtitle__</p>
<!-- Output: <p></p> -->
```

### Null and Undefined Values

Null and undefined values are converted to an empty string. The placeholder is replaced, but no visible text appears in the output.

### Object and Array Values

If a field value is an object or array (and is not a trusted field), the Hydrator serializes it with `JSON.stringify` and then HTML-escapes the result.

### Processing Order

The Hydrator processes placeholders in this order:

1. Extract and protect escaped placeholders (`\__field__`)
2. Resolve the `__body__` alias from `body_html`
3. Replace flat-key placeholders from the data record
4. Resolve dot-notation placeholders from nested objects
5. Strip unresolved placeholders
6. Restore escaped placeholder literals
