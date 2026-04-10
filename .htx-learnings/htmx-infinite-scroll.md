# htmx Infinite Scroll Pattern

## Overview

Replace traditional pagination with automatic infinite scrolling using htmx's `revealed` trigger. The engine's built-in `HX-Request` detection skips the root layout, so scroll endpoints return raw HTML fragments without any extra configuration.

## Structure

Two templates:

1. **Index page** — renders the first batch via context provider, includes a sentinel at the end of the grid
2. **Scroll endpoint** (`scroll/[page].htx`) — returns card HTML + next sentinel via htx:rel, no layout wrapping needed

## Index Page

The sentinel sits as the last child inside the grid. When it scrolls into view, htmx replaces it with the next batch of cards + a new sentinel.

```html
<div class="nf-grid">
{{ each item in fp.items }}
  <a href="/store/{{ item.slug }}" class="nf-card">
    <div class="nf-card-title">{{ item.title }}</div>
  </a>
{{ endeach }}
  <div class="nf-scroll-sentinel"
       hx-get="/store/scroll/2"
       hx-trigger="revealed"
       hx-swap="outerHTML">
    Loading&hellip;
  </div>
</div>
```

Key CSS for the sentinel — spans the full grid width:

```css
.nf-scroll-sentinel {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  grid-column: 1 / -1;
  color: var(--text-dim);
  font-size: 0.8rem;
}
```

## Scroll Endpoint (`scroll/[page].htx`)

Returns just the cards + next sentinel. No styles, no wrapper divs — this HTML is injected directly into the existing grid via `outerHTML` swap.

```html
<htx:type>my-content</htx:type>
<htx:howmany>99</htx:howmany>
<htx:offset>{{ mult(sub(route.page, 1), 99) }}</htx:offset>
<htx>
<htx:each>
  <a href="/store/__slug__" class="nf-card">
    <div class="nf-card-title">__title__</div>
  </a>
</htx:each>
<div class="nf-scroll-sentinel"
     hx-get="/store/scroll/{{ add(route.page, 1) }}"
     hx-trigger="revealed"
     hx-swap="outerHTML">
  Loading&hellip;
</div>
<htx:none>
<span class="nf-scroll-sentinel">End of results</span>
</htx:none>
</htx>
```

## Why It Works Without Layout Config

- htmx automatically sends `HX-Request: true` header on all requests
- The HTX engine detects this header and skips the root `<!DOCTYPE html>` layout
- The scroll endpoint returns only its template content — no `<html>`, `<head>`, or `<body>` wrapping
- No need for a blank `_layout.htx` or any special partial directive

## End of Data

Use `<htx:none>` to handle the empty result case. Return a sentinel `<span>` (not `<div>` with `hx-get`) so scrolling stops naturally. The "End of results" message replaces the loading sentinel and no further requests are made.

## Chain of Events

```
User scrolls → sentinel enters viewport
  → htmx fires GET /store/scroll/2 (with HX-Request header)
  → engine renders scroll/[page].htx, skips root layout
  → response: card HTML + new sentinel for /scroll/3
  → htmx replaces old sentinel (outerHTML) with response
  → new cards appear in grid, new sentinel waits at bottom
  → user scrolls more → cycle repeats
  → when no data: htx:none returns terminal span, no more requests
```
