# Paginator Composition with Expression Functions

## Pattern

Use page-number URLs (`/store/page/4`) and compute the offset inside the template with expression functions. This keeps URLs human-readable while the engine handles the math.

## Key Expression Functions

- `mult(a, b)` — multiply
- `sub(a, b)` — subtract
- `add(a, b)` — add
- `div(a, b)` — divide

## Template Structure

### Index page (page 1)

Page 1 uses a separate template with no offset. The paginator links use page numbers:

```html
<nav class="nf-pagination">
  <span class="current">1</span>
  <a href="/store/page/2">2</a>
  <a href="/store/page/3">3</a>
  <a href="/store/page/4">4</a>
  <a href="/store/page/5">5</a>
  <span class="ellipsis">&hellip;</span>
  <a href="/store/page/100">100</a>
  <a href="/store/page/2">Next &rarr;</a>
</nav>
```

### Paginated page (`/page/[page]`)

The route parameter `route.page` is the page number (2, 3, 4...). The offset is computed:

```html
<htx:type>my-content</htx:type>
<htx:howmany>99</htx:howmany>
<htx:offset>{{ mult(sub(route.page, 1), 99) }}</htx:offset>
```

Page 4 → `mult(sub(4, 1), 99)` → `mult(3, 99)` → offset 297.

### Prev/Next nav with conditional logic

```html
<nav class="nf-pagination">
  {{ if route.page > 2 }}
  <a href="/store/page/{{ sub(route.page, 1) }}">&larr; Prev</a>
  {{ endif }}
  {{ if route.page == 2 }}
  <a href="/store">&larr; Prev</a>
  {{ endif }}
  <a href="/store">1</a>
  <span class="ellipsis">&hellip;</span>
  <span class="current">{{ route.page }}</span>
  <span class="ellipsis">&hellip;</span>
  <a href="/store/page/{{ add(route.page, 1) }}">Next &rarr;</a>
</nav>
```

- Page 2: "Prev" links to the index (no `/page/1` route needed)
- Page 3+: "Prev" links to `/page/{n-1}`
- "Next" always links to `/page/{n+1}`

## Gotcha: Expressions in htx:offset

`<htx:offset>` and `<htx:howmany>` are converted to `Number()` during parsing, which happens **before** expression evaluation. This was fixed (see GitHub issue hypermediacms/hypermedia-app#43) to defer conversion when the value contains `{{ }}`. Without that fix, any expression in these tags silently becomes `NaN`.
