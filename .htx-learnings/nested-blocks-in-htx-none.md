# Nested Query Blocks Inside htx:none Resolve Prematurely

## The Problem

Placing a query block inside `<htx:none>` causes it to execute even when the parent query returns results.

```html
<htx:type>store-category</htx:type>
<htx:slug>{{ route.slug }}</htx:slug>
<htx>
<htx:each>
  <!-- Category found — renders products -->
</htx:each>
<htx:none>
  <!-- PROBLEM: This inner block runs BEFORE the parent query -->
  <htx:type>store-collection</htx:type>
  <htx:slug>{{ route.slug }}</htx:slug>
  <htx>
  <htx:each>...</htx:each>
  <htx:none>Category not found.</htx:none>
  </htx>
</htx:none>
</htx>
```

## Why It Happens

`renderNestedBlocks()` runs on the FULL template content (between `<htx>` and `</htx>`) BEFORE the parent query executes. It discovers all nested query blocks — including those inside `<htx:none>` — and resolves them. The inner block's rendered output replaces its region in the template.

When the parent query then succeeds, `hydrateWithData()` renders `htx:each` and strips `<htx:none>` blocks with regex. But the inner block's output is already rendered inline, and can leak into the visible page.

## The Fix

Don't nest query blocks inside `<htx:none>`. Use a simple static fallback instead:

```html
<htx:none>
  <p>Category not found.</p>
</htx:none>
```

If you need conditional fallback logic (try type A, then type B), use separate routes or handle it at the application level.
