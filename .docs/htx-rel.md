The `htx:rel` directive enables parent-child relationship resolution in nested query blocks. When a block has `htx:rel`, the engine resolves parent field references per-row during iteration, merging them into WHERE conditions.

## Syntax

```html
<htx:type>post</htx:type>
<htx:rel>author_id=parent.id</htx:rel>
```

The left side is the child field to filter on. The right side uses `parent.` to reference the current parent row's data. Multiple conditions are comma-separated.

## Single-Level Example

An author page that lists each author's posts:

```html
<htx:type>author</htx:type>
<htx:where>status=active</htx:where>
<htx>
<htx:each>
  <h2>__title__</h2>

  <htx:type>post</htx:type>
  <htx:rel>author_id=parent.id</htx:rel>
  <htx:where>status=published</htx:where>
  <htx>
  <htx:each>
    <article>__title__</article>
  </htx:each>
  </htx>

</htx:each>
</htx>
```

For each author row, the engine resolves `parent.id` to that author's ID and queries posts where `author_id` matches. The inner `htx:each` iterates the child results.

## Multi-Level Nesting

Nesting is recursive. Each level's `parent.*` refers to its immediate parent:

```html
<htx:type>category</htx:type>
<htx>
<htx:each>
  <h1>__title__</h1>

  <htx:type>product</htx:type>
  <htx:rel>category_id=parent.id</htx:rel>
  <htx>
  <htx:each>
    <h2>__title__</h2>

    <htx:type>review</htx:type>
    <htx:rel>product_id=parent.id</htx:rel>
    <htx>
    <htx:each>
      <p>__body__ — __author__</p>
    </htx:each>
    </htx>

  </htx:each>
  </htx>

</htx:each>
</htx>
```

Three levels: categories, products, reviews. Each resolved per-row from its parent.

## How It Works

1. `renderNestedBlocks()` discovers blocks with `meta.rel` and **skips** them — they are NOT resolved during the initial pass
2. During `hydrateWithData()`, the `htx:each` loop iterates parent rows
3. For each row, `resolveRelationalBlocks()` finds child blocks with `htx:rel`
4. `resolveRelDirective()` parses `field=parent.field`, looks up the parent row's value, and merges the resolved condition into the block's WHERE clause
5. The child block executes as a normal query with the resolved filter

## Performance Model

`htx:rel` produces N+1 queries per nesting level. For 5 categories with 10 products each and 3 reviews per product:

- 1 category query
- 5 product queries (one per category)
- 50 review queries (one per product)
- Total: 56 queries

This is the honest cost of template-level relationship resolution — no JOINs, but declarative and composable. The e-commerce store on this site resolves 41 queries for a full collection page at 24 requests per second on a Raspberry Pi 5.

## Mixed Blocks

`htx:rel` blocks and independent blocks can coexist in the same template. Independent blocks resolve during `renderNestedBlocks()` (before the parent query). Relational blocks resolve per-row during iteration.

## Combining with htx:where

`htx:rel` conditions merge with any existing `htx:where`:

```html
<htx:type>post</htx:type>
<htx:rel>author_id=parent.id</htx:rel>
<htx:where>status=published</htx:where>
```

The resolved query filters by both `author_id = [parent's id]` AND `status = published`.
