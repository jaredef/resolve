# Bridging Data Between Read and Mutation Blocks

## The Problem

A product detail page has two top-level blocks:
1. A read block (`htx:type=product`) that renders product info
2. A mutation block (`htx:action=save, htx:type=review`) that renders the review form

These are independent blocks processed separately by the request handler. The mutation block's form needs the product's numeric ID — but it has no access to the read block's data.

## Why It Happens

The request handler's `processBlocks()` iterates blocks and renders each independently. Read blocks go through `getExecutor.executeFromParsed()`. Mutation blocks go through `prepareMutationBlock()` (GET) or `executeMutationBlock()` (POST). There's no shared data context between them.

Expressions like `{{ route.slug }}` work (they use request context, not block data), but the product's database ID isn't in the route.

## The Solution: Data Attribute + Script Bridge

Add a `data-product-id` attribute to the read block's output:

```html
<!-- In the product read block -->
<article data-product-id="__id__">
  ...
</article>
```

Add a hidden input in the mutation form and a script to bridge them:

```html
<!-- In the mutation block -->
<input type="hidden" name="product_id" id="review-product-id" value="" />

<!-- After both blocks -->
<script>
(function() {
  var el = document.querySelector('[data-product-id]');
  var input = document.getElementById('review-product-id');
  if (el && input) input.value = el.dataset.productId;
})();
</script>
```

The read block renders first (blocks are processed in reverse order — later blocks first, but the mutation block executes before the read block, and both are placed in their original template positions). The script runs after both blocks are in the DOM.

## Alternatives Considered

- **Use route.slug as product_id** — requires changing the data model to reference products by slug instead of numeric ID
- **Custom middleware** — inject product data into mutation block context. Possible but breaks the engine's separation of concerns.
- **htx:let** — could theoretically capture the product ID, but let directives don't span across block boundaries
