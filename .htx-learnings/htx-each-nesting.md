# htx:each Regex Matching Breaks with Nested Tags

## The Problem

The original `hydrateWithData()` used a non-greedy regex to find `<htx:each>` blocks:

```typescript
const eachMatches = [...template.matchAll(/<htx:each(?:\s+where="([^"]*)")?\s*>(.*?)<\/htx:each>/gs)];
```

The `(.*?)` matches up to the FIRST `</htx:each>` it finds. When a template has nested `htx:each` tags (e.g., an `htx:rel` block inside an outer `htx:each`), the inner closing tag matches the outer's — truncating the item template.

```html
<htx:each>                          <!-- outer open -->
  <h2>__title__</h2>
  <htx:type>post</htx:type>
  <htx:rel>category_id=parent.id</htx:rel>
  <htx>
  <htx:each><li>__title__</li></htx:each>  <!-- inner — regex matches THIS close -->
  </htx>
</htx:each>                        <!-- outer close — never reached -->
```

## The Fix

Replaced the regex with `findEachBlocks()` — a balanced matcher that tracks nesting depth:

```typescript
private findEachBlocks(template) {
  // Counts depth: each <htx:each increments, each </htx:each> decrements
  // Only captures blocks at depth 0 (top-level)
  // Sets openPattern.lastIndex past the balanced block to skip nested matches
}
```

This correctly matches the outer `</htx:each>` even when inner `htx:each` tags exist inside `htx:rel` blocks.

## When This Matters

Only when using `htx:rel` — relational blocks inside `htx:each` contain their own `htx:each` for iterating child rows. Without `htx:rel`, nested `htx:each` tags don't occur because `renderNestedBlocks` resolves independent nested blocks before the parent `htx:each` runs.
