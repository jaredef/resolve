# Independent Nested Blocks Can Break Parent Hydration

## The Problem

Placing an independent query block inside `htx:each` that uses the same placeholder names as the parent row causes the parent's placeholders to hydrate as empty.

```html
<htx:type>product</htx:type>
<htx:slug>{{ route.slug }}</htx:slug>
<htx>
<htx:each>
  <!-- This nested block uses __title__ and __slug__ -->
  <htx:type>collection</htx:type>
  <htx:slug>{{ route.collection }}</htx:slug>
  <htx><htx:each><a href="/store/__slug__">__title__</a></htx:each></htx>

  <!-- These parent placeholders become EMPTY -->
  <h1>__title__</h1>
  <p>$__price__</p>
</htx:each>
</htx>
```

## Why It Happens

`renderNestedBlocks()` runs BEFORE the parent query executes. It resolves the nested collection block, which hydrates `__title__` and `__slug__` within its block region with collection data. But the hydrator's replacement pass may also consume or interfere with the same placeholders in the surrounding template.

The resolved collection block's output replaces its region, but the parent template's `__title__` and `__price__` placeholders end up empty after hydration — the hydrator has already seen `__title__` during the nested block's resolution pass.

## The Fix

Don't nest independent query blocks inside `htx:each` that share placeholder names with the parent data. Instead:

1. **Use `htx:rel`** for child data that relates to the parent row
2. **Move the independent block outside `htx:each`** if it doesn't depend on per-row data
3. **Use CSS or expression tricks** for display-only needs (e.g., `text-transform: capitalize` for route slugs)

## Related

- [htx-rel-execution-order.md](htx-rel-execution-order.md) — `htx:rel` blocks are resolved per-row and don't conflict with parent hydration
- [nested-blocks-in-htx-none.md](nested-blocks-in-htx-none.md) — Another case where nested blocks resolve prematurely
