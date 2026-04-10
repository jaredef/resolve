# htx:rel Execution Order

## How htx:rel Blocks Are Processed

Relational blocks (`htx:rel`) follow a different execution path than independent nested blocks.

### Independent blocks (no htx:rel)
```
renderNestedBlocks() → finds block → executeFromParsed() → renders → replaces in template
```
Resolved BEFORE the parent query. The rendered output becomes part of the parent's template.

### Relational blocks (with htx:rel)
```
renderNestedBlocks() → finds block with meta.rel → SKIPS it
parent query executes → hydrateWithData() iterates rows
  → resolveRelationalBlocks(itemTemplate, currentRow) → resolves parent.* refs → executes block
```
Resolved PER ROW during `htx:each` iteration. Each row's `htx:rel` block gets its own query with `parent.field` resolved to the current row's data.

## Key Implications

1. **htx:rel blocks must be INSIDE `htx:each`** — they need a parent row context to resolve `parent.*` references. A `htx:rel` block outside `htx:each` will never be resolved.

2. **Nesting is recursive** — a child `htx:rel` block can contain its own `htx:each` with deeper `htx:rel` blocks. Each level's `parent.*` refers to its immediate parent.

3. **N+1 query pattern** — each parent row triggers a separate query for its children. 5 categories × 10 products = 5 + 50 = 55 queries. This is the honest cost.

4. **Independent and relational blocks can coexist** — a template can have both. Independent blocks resolve first (during `renderNestedBlocks`), relational blocks resolve per-row (during `hydrateWithData`).

## Example: Mixed Blocks

```html
<htx:type>author</htx:type>
<htx>
<htx:each>
  <h2>__title__</h2>

  <!-- Relational: resolved per author row -->
  <htx:type>post</htx:type>
  <htx:rel>author_id=parent.id</htx:rel>
  <htx>
  <htx:each><p>__title__</p></htx:each>
  </htx>
</htx:each>

<!-- Independent: resolved before the author query -->
<aside>
  <htx:type>sidebar</htx:type>
  <htx:where>status=active</htx:where>
  <htx>
  <htx:each><div>__title__</div></htx:each>
  </htx>
</aside>
</htx>
```
