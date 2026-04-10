# htx:raw Prevents Placeholder Hydration

## The Problem

Wrapping `__body_html__` in `<htx:raw>` causes it to render literally as the text "body_html" instead of the HTML content:

```html
<!-- BROKEN: __body_html__ is never hydrated -->
<div class="post-body">
  <htx:raw>__body_html__</htx:raw>
</div>
```

## Why It Happens

`<htx:raw>` tells the engine to protect its content from ALL processing — expressions, placeholders, and hydration. The `__body_html__` placeholder inside `htx:raw` is never seen by the Hydrator.

## The Correct Approach

Use `__body_html__` directly without `htx:raw`. The Hydrator has a `TRUSTED_HTML_FIELDS` set that includes `body_html`. Fields in this set are injected WITHOUT HTML escaping — raw HTML passes through safely.

```html
<!-- CORRECT: body_html is in TRUSTED_HTML_FIELDS, injected without escaping -->
<div class="post-body">
  __body_html__
</div>
```

You can also use `__body__` — the Hydrator has a special alias that maps `__body__` to `body_html` when `body_html` exists in the data.

## When to Use htx:raw

Use `htx:raw` for literal content that contains HTX-like syntax you want to display as text (e.g., documentation about HTX). Don't use it around placeholders you want the engine to resolve.
