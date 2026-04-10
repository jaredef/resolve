# Router: Dynamic Directory Resolution Priority

## The Problem

The file-system router had two bugs with dynamic directories (`[param]/`):

### Bug 1: Catch-all file matches before dynamic directory walking

For `/store/brushes/kolinsky-round-4`, the router matched `store/[collection].htx` with `{collection: "brushes/kolinsky-round-4"}` instead of `store/[collection]/[product].htx` with `{collection: "brushes", product: "kolinsky-round-4"}`.

The `walkSegments()` method checked catch-all file matches (joining remaining segments into one slug) BEFORE trying to walk into dynamic directories. The catch-all greedily consumed multi-segment paths.

### Bug 2: Dynamic directory index.htx not resolved for last segments

For `/store/brushes`, the router returned NO MATCH when `store/[collection]/index.htx` existed. The last-segment handler checked dynamic files (`[param].htx`) but never checked dynamic directories with `index.htx`.

## The Fix (router.ts)

**Change 1:** Moved dynamic directory walking loop BEFORE catch-all file match in the non-last-segment path. Directories get priority; catch-all is the fallback.

**Change 2:** Added a scan for dynamic directories with `index.htx` in the last-segment path, between the dynamic file check and the return null.

## Resolution Order (After Fix)

For non-last segments:
1. Exact directory match
2. Dynamic directory walking (NEW: checked first)
3. Catch-all file match (demoted to fallback)

For last segments:
1. Exact file (`brushes.htx`)
2. Index file (`brushes/index.htx` — literal directory)
3. Dynamic directory index (`[collection]/index.htx`) (NEW)
4. Dynamic file (`[collection].htx`)

## Template Structure That Requires This

```
store/
  index.htx                    → /store
  [collection]/
    index.htx                  → /store/brushes (category page)
    [product].htx              → /store/brushes/kolinsky-round-4
```

Without the fix, `/store/brushes` returns 404 and `/store/brushes/kolinsky-round-4` matches the wrong template.
