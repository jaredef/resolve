# Phase 2 — Utilities (HTML Escape + YAML Parser)

**Status:** NOT STARTED
**Depends on:** Phase 1 (scaffolding)

## Objectives

Hand-roll the two utilities we're not pulling from npm: HTML entity escaping and a minimal YAML parser. These are intentionally small — we don't need full-spec implementations, just what HTX actually uses.

## Files to Create

### HTML Escaping — `packages/htx-engine/src/utils/escape-html.ts`

**Port of:** PHP's `htmlspecialchars($str, ENT_QUOTES, 'UTF-8')`

Scope:
- Replace `&` → `&amp;`
- Replace `<` → `&lt;`
- Replace `>` → `&gt;`
- Replace `"` → `&quot;`
- Replace `'` → `&#039;`
- Accept `string` input, return `string`
- Handle `null`/`undefined` gracefully (return empty string)
- ~10-15 lines of code total

### YAML Parser — `packages/htx-engine/src/utils/yaml-parse.ts`

**Port of:** `symfony/yaml` usage in the PHP codebase

Audit the PHP codebase first to determine *exactly* which YAML features are used. Expected subset:
- Key-value pairs: `key: value`
- Nested maps (indentation-based)
- String values (plain, single-quoted, double-quoted)
- Numeric values
- Boolean values (`true`/`false`, `yes`/`no`)
- Null values (`null`, `~`)
- Arrays/lists (`- item`)
- Comments (`# comment`)

What we do NOT need:
- Anchors and aliases (`&anchor`, `*alias`)
- Multi-document streams (`---`)
- Flow collections (`{key: value}`, `[item]`)
- Tags (`!!str`, `!!int`)
- Complex multiline scalars (`|`, `>`)

Target: ~80-120 lines of code. Recursive descent on indented lines.

### Barrel export — `packages/htx-engine/src/utils/index.ts`

Export both utilities.

## Files to Create (Tests)

- `packages/htx-engine/tests/escape-html.test.ts`
  - Basic escaping of each character
  - Null/undefined input
  - Already-escaped input (no double-escaping)
  - Empty string
  - String with no special characters (passthrough)
  - Mixed content

- `packages/htx-engine/tests/yaml-parse.test.ts`
  - Simple key-value pairs
  - Nested maps
  - Lists
  - Quoted strings
  - Booleans, numbers, null
  - Comments
  - Mixed structures
  - Edge cases: empty document, whitespace-only, trailing newlines

## Validation

- [ ] `escapeHtml()` passes all tests
- [ ] `yamlParse()` passes all tests
- [ ] No external dependencies added

## Review Comments

_Reviewed by Claude after building the complete PHP implementation._

### YAML Parser: Verify Actual Usage First

Before building a hand-rolled YAML parser, **audit the PHP codebase to confirm YAML is actually used**. In the PHP implementation I built, YAML parsing was not a significant feature — the DSL uses its own `<htx:meta>` directive format, not YAML frontmatter. If YAML is only used for configuration files (like `htx.config.yaml`), a 3-line `JSON.parse()` approach or a simple key-value parser might suffice. If YAML isn't used at all, skip this entirely and save ~120 LOC of hand-rolled parsing code.

If YAML IS needed, consider just using the `yaml` npm package (~25KB) rather than hand-rolling. The "no dependencies" philosophy is admirable for the core engine, but a well-tested YAML parser for config-only usage is a reasonable exception.

### HTML Escaping: Consider Performance

The naive approach (5 chained `.replace()` calls) works fine for small strings but could be slow for large templates with many escape operations. An alternative is a single-pass approach:

```typescript
function escapeHtml(str: string): string {
  return str.replace(/[&<>"']/g, ch => entities[ch])
}
```

This is a minor optimization but it's also fewer lines of code, so it's a win-win.

### Missing Utility: `slugify()`

The PHP codebase uses slug generation in the SQLite adapter (`create()` auto-generates slugs). This utility will be needed by Phase 16. Consider adding it here alongside `escapeHtml`.

### Test: Double-Escaping Prevention

Good that this is called out in the test plan. Make sure the implementation does NOT double-escape — `escapeHtml("&amp;")` should return `"&amp;amp;"` which is actually correct behavior (escaping an already-escaped string is valid HTML). The PHP `htmlspecialchars()` has a `double_encode` flag — document explicitly whether we match that behavior or not.

## Execution Log

_(empty — not yet executed)_

## Independent review notes (2026-03)

- Scope **YAML** to **CLI/app config** if the scaffold reads a config file; otherwise ship the smallest viable subset or defer—full hand-rolled YAML is not justified by engine-only usage (PHP engine does not call Symfony Yaml in `src/`).
- Add **`slugify()`** (or equivalent) here for parity with PHP [`SQLiteAdapter`](../../hypermedia-app-php/packages/htx-adapter-sqlite/src/SQLiteAdapter.php) slug generation in create paths.

## Port review addendum (2026-03-28)

- The biggest improvement here is to convert "YAML parser" from an assumption into a decision backed by real call sites. If no phase truly needs YAML, do not build it yet.
- I would also define the exact escaping contract in this doc, including whether behavior intentionally matches PHP's default `htmlspecialchars()` semantics or differs.
