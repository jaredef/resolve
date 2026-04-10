# Trusted HTML Fields Are Evaluated by the Expression Engine

## The Problem

Content stored as `body_html` (a trusted HTML field) can contain `{{ expression }}` syntax — for example, documentation about HTX template expressions, or code examples showing `{{ each item in cart.items }}`. When the hydrator injects this content into the template, the expression engine evaluates it as real code, causing runtime errors like "Unclosed block — expected endeach".

## Why It Happens

The processing pipeline order:

1. **Block pass** — GetContentExecutor queries the database, hydrator replaces `__body_html__` with the article's HTML
2. **Expression evaluation** — runs on the FULL page content, including injected body_html
3. **Layout wrap** — layout applied

At step 1, the hydrator injects body_html without escaping (it's in `TRUSTED_HTML_FIELDS` — no HTML escaping). At step 2, the expression engine sees `{{ each item in cart.items }}` inside the article content and tries to evaluate it as a real expression block. Since there's no matching data context, it throws.

The expression engine has no way to know that `{{ }}` patterns in body_html are display content, not executable expressions.

## The Fix

The hydrator escapes `{{` to `\{{` in trusted HTML fields before injection:

```typescript
private static escapeExpressions(html: string): string {
  return html.replaceAll("{{", "\\{{");
}
```

Applied in two places:
1. The `__body__` → `body_html` alias (line 31)
2. The general trusted field replacement (line 40)

The expression engine already supports `\{{` as an escape — it skips expressions prefixed with backslash. `finalizeLiteralOutput` strips the backslash at the end of the pipeline, so `\{{ cart.count }}` displays as `{{ cart.count }}` in the final HTML.

## What This Means

- **body_html can safely contain any `{{ }}` syntax** — code examples, documentation about HTX, template snippets
- **No content-level workarounds needed** — no HTML entities, no manual escaping in markdown
- **The cmark-gfm code block protection** (backslash-prefixing in `<code>` tags) handles `__placeholder__` syntax. This hydrator fix handles `{{ expression }}` syntax. Together they cover all HTX syntax in documentation content.

## Related

- [cmark-gfm-placeholder-collision.md](cmark-gfm-placeholder-collision.md) — The `__placeholder__` version of this problem, solved at the markdown renderer level
