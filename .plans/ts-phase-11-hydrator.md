# Phase 11 — Services: Hydrator

**Status:** NOT STARTED
**Depends on:** Phase 2 (Utilities — escapeHtml)

## Objectives

Port the Hydrator service to TypeScript. The Hydrator replaces `__placeholder__` tokens in HTML with actual values, handling escaping and dot notation.

## Source Reference

- **PHP source:** `packages/htx-engine/src/Services/Hydrator.php`

## Files to Create

### `packages/htx-engine/src/services/hydrator.ts`

**Key behaviors:**
1. **Placeholder replacement** — find `__fieldName__` patterns in template HTML and replace with values from a data record
2. **Dot notation** — `__author.name__` resolves to `data.author.name`
3. **HTML escaping** — values are escaped by default via `escapeHtml()`
4. **Trusted fields** — certain fields (e.g., `body_html`) are pre-sanitized and should NOT be escaped
5. **Cleanup** — any unreplaced placeholders are removed from output (no `__leftover__` in rendered HTML)
6. **Null handling** — null/undefined values become empty string

**Public API:**
```typescript
class Hydrator {
  hydrate(template: string, data: Record<string, unknown>, trustedFields?: string[]): string
}
```

**Implementation approach:**
- Use regex to find `__([a-zA-Z0-9_.]+)__` patterns
- For each match, resolve the field path (splitting on `.`)
- Apply `escapeHtml()` unless field is in trustedFields list
- Replace all instances
- Final pass: remove any remaining `__...__` placeholders

## Files to Create (Tests)

### `packages/htx-engine/tests/hydrator.test.ts`

- Simple field replacement: `__title__` → "Hello"
- Dot notation: `__post.title__` → nested value
- HTML escaping applied: `__name__` with `<script>` in value → escaped
- Trusted field bypasses escaping: `__body_html__` with HTML → raw
- Missing field → empty string
- Unreplaced placeholders cleaned up
- Multiple placeholders in one template
- Same placeholder used twice
- Null/undefined data values → empty string

## Validation

- [ ] Placeholder regex matches correctly
- [ ] Dot notation resolves nested values
- [ ] HTML escaping applied by default
- [ ] Trusted fields bypass escaping
- [ ] Unreplaced placeholders removed
- [ ] All tests pass

## Review Comments

_Reviewed by Claude after building the complete PHP implementation._

### Clarify: Hydrator vs Expression Engine

The plan describes the Hydrator replacing `__placeholder__` patterns, while the ExpressionEngine handles `{{ expression }}` patterns. This is correct — they're two different systems:
- **Hydrator:** Simple token replacement for pre-processed data (used after adapter query, within `<htx:each>` loops)
- **ExpressionEngine:** Full expression evaluation with functions, conditionals, loops

Make sure this distinction is clear during implementation. In the PHP build, the RequestHandler calls the Hydrator inside each loops to inject row data, then calls the ExpressionEngine on the result to evaluate any remaining expressions.

### Trusted Fields: Define the List

The plan mentions "certain fields (e.g., `body_html`) are pre-sanitized." But who defines which fields are trusted? In the PHP implementation, the Hydrator accepts a `trustedFields` parameter. The question is: where does this list come from? Options:
1. Convention-based: any field ending in `_html` is trusted
2. Schema-based: the adapter's `schema()` method marks fields as trusted
3. Template-based: a directive like `<htx:trusted>body_html</htx:trusted>`

The plan should specify the approach. Convention-based (#1) is simplest and matches the PHP behavior.

### Performance: Regex Compilation

The placeholder regex `/__([a-zA-Z0-9_.]+)__/g` is used on every hydration call. Pre-compile it as a class property rather than creating a new RegExp each time.

### Edge Case: Nested Placeholders

What happens with `__post.__title____`? The regex should be greedy enough to match the inner `__title__` first, but test this explicitly.

## Execution Log

_(empty — not yet executed)_

## Independent review notes (2026-03)

- Cross-check **trusted fields** with the convention described in the Review Comments section (`_html` suffix or explicit `trustedFields` list)—no further structural change needed if that matches PHP.

## Port review addendum (2026-03-28)

- This phase looks straightforward, but it should explicitly document where hydration sits relative to expression evaluation and layout wrapping. The PHP port will feel brittle if those passes move around silently.
- I would also define trusted-html behavior as a single source of truth here, because that decision affects both security and content rendering expectations.
