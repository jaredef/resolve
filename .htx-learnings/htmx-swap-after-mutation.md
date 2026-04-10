# htmx Form Submission with Server-Rendered Response Swaps

## The Pattern

Use htmx to submit a mutation form via AJAX, then swap the server's response into the page — no full page reload, no browser resubmission dialog, no replay errors.

```html
<form method="POST" class="review-form"
      hx-post=""
      hx-target="main"
      hx-swap="innerHTML">
  <input type="hidden" name="htx-payload" value="__payload__" />
  ...
</form>
```

## How It Works

1. **GET** — Engine issues JWT token, renders form with `__payload__` replaced
2. **Submit** — htmx POSTs via AJAX with `HX-Request: true` header
3. **Server** — Validates token, executes mutation, renders the FULL page content
4. **Layout skip** — Engine detects `HX-Request` header, skips layout wrapping. Response is just the page content (~8KB vs ~25KB with layout).
5. **htmx swaps** — `hx-target="main"` replaces the `<main>` element's innerHTML with the response

## Why hx-target="main" and Not a Fragment

The mutation response replaces the mutation block with the success/error message. But other parts of the page also change — the review list now includes the new review (the product read block re-renders with fresh data from SQLite).

Swapping `<main>` gives you everything:
- Updated review list (includes the new review)
- Success message where the form was
- Product details (unchanged but re-rendered)

Fragment-level swapping (`hx-select`) requires the target element to wrap both the read block output and mutation block output — which is hard when they're separate top-level blocks.

## Key Details

- **`hx-post=""`** — empty string posts to the current page URL
- **No browser resubmission** — htmx uses XHR, so refreshing the page does a GET (with a fresh form and token), not a POST resubmission
- **No replay errors** — each page load generates a fresh token. The old token was consumed by the htmx POST.
- **The form disappears after submission** — the mutation block is replaced by the success response. User reloads to get a fresh form. This is fine for reviews.

## What Doesn't Work

- **`hx-select` across block boundaries** — can't select a div that wraps both the read block output and mutation block output, because they're rendered as separate top-level blocks
- **Partial swaps without layout** — if the htmx response includes the layout (non-htmx request), `hx-target="main"` would inject an entire HTML document inside `<main>`. The `HX-Request` header is critical.
