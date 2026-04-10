# Ambiguous Route Slugs: When Two Content Types Share a URL Space

## The Problem

A single dynamic route like `/store/[slug]` needs to resolve slugs from two different content types — collections ("painting") and categories ("gesso-primers"). The template doesn't know which type the slug belongs to.

### Approaches Tried and Why They Failed

**1. Dual-lookup with nested query in htx:none**

```html
<htx:type>store-category</htx:type>
<htx:slug>{{ route.slug }}</htx:slug>
<htx>
<htx:each>...category content...</htx:each>
<htx:none>
  <!-- Fallback: try as collection -->
  <htx:type>store-collection</htx:type>
  <htx:slug>{{ route.slug }}</htx:slug>
  <htx><htx:each>...collection content...</htx:each></htx>
</htx:none>
</htx>
```

**Failed because:** Nested query blocks inside `<htx:none>` are resolved by `renderNestedBlocks` BEFORE the parent query runs. The inner block executes unconditionally — its output renders alongside the parent's content. See [nested-blocks-in-htx-none.md](nested-blocks-in-htx-none.md).

**2. Two sibling blocks with empty htx:none + JS fallback**

```html
<!-- Try as collection -->
<htx:type>store-collection</htx:type>
<htx:slug>{{ route.slug }}</htx:slug>
<htx><htx:each>...collection...</htx:each><htx:none></htx:none></htx>

<!-- Try as category -->
<htx:type>store-category</htx:type>
<htx:slug>{{ route.slug }}</htx:slug>
<htx><htx:each>...category...</htx:each><htx:none></htx:none></htx>

<!-- JS: show "not found" if neither rendered content -->
<script>
if (!document.querySelector('.collection-header, .cat-header')) {
  document.getElementById('store-fallback').style.display = 'block';
}
</script>
```

**Worked but was messy:** Both blocks always execute. The non-matching block renders nothing (empty `htx:none`). The JS fallback handles the true 404 case. This adds client-side logic for something that should be server-decided.

## The Solution: Namespaced Routes

Give each content type its own URL namespace:

```
/store                              → homepage (all collections)
/store/collections/[collection]     → collection page (unambiguous: queries store-collection)
/store/[category]                   → category page (unambiguous: queries store-category)
/store/[category]/[product]         → product detail (unambiguous: queries store-product)
```

Each route has exactly one query. No fallback logic needed. A missing slug returns the `htx:none` block directly.

```
store/
  index.htx                         → /store
  collections/
    [collection].htx                 → /store/collections/painting
  [collection]/
    index.htx                        → /store/gesso-primers (category)
    [product].htx                    → /store/gesso-primers/gesso-primers-1
```

## Would an Engine Change Help?

Yes. Two possible features would make dual-lookup viable without namespacing:

**1. Conditional block execution (`htx:if-empty`)**

A directive that says "only render this block if the previous block returned no results":

```html
<htx:type>store-category</htx:type>
<htx:slug>{{ route.slug }}</htx:slug>
<htx>...category content...</htx>

<htx:if-empty>
<htx:type>store-collection</htx:type>
<htx:slug>{{ route.slug }}</htx:slug>
<htx>...collection content...</htx>
</htx:if-empty>
```

This would require the engine to track whether the previous sibling block produced output, and conditionally skip the `htx:if-empty` block.

**2. Deferred htx:none resolution**

Instead of resolving nested blocks inside `htx:none` during `renderNestedBlocks`, defer them. Only resolve if the parent query returns zero rows. This would make the original nested-query-in-htx:none pattern work correctly.

Implementation: `renderNestedBlocks` would need to detect when a block is inside `<htx:none>` and skip it, similar to how it skips `htx:rel` blocks. Then `handleEmptyResult` would resolve the deferred blocks.

**3. Multi-type query (`htx:type` with fallback)**

```html
<htx:type>store-category</htx:type>
<htx:type-fallback>store-collection</htx:type-fallback>
<htx:slug>{{ route.slug }}</htx:slug>
```

The adapter tries the primary type first, falls back to the secondary if no results. Single block, no nesting.

## The Lesson

When two content types share a URL space, the cleanest solution is to give them separate URL namespaces. Engine-level fixes (conditional blocks, deferred htx:none, multi-type queries) would be valuable but add complexity. Namespaced routes are a zero-cost architectural solution that makes every template simpler.
