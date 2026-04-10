# HTX Template Learnings

Hard-won patterns, pitfalls, and architectural decisions discovered while building real pages with the HTX engine. Each file documents a specific lesson — what went wrong, why, and the correct approach.

## Index

- [nested-blocks-in-htx-none.md](nested-blocks-in-htx-none.md) — Nested query blocks inside htx:none resolve before the parent query
- [htx-each-nesting.md](htx-each-nesting.md) — Regex-based htx:each matching breaks with nested tags
- [htx-rel-execution-order.md](htx-rel-execution-order.md) — How htx:rel blocks are skipped by renderNestedBlocks and resolved per-row
- [router-dynamic-directories.md](router-dynamic-directories.md) — Dynamic directory resolution priority and index.htx matching
- [body-html-and-htx-raw.md](body-html-and-htx-raw.md) — Why htx:raw prevents hydration of placeholders
- [cmark-gfm-placeholder-collision.md](cmark-gfm-placeholder-collision.md) — Markdown rendering of __placeholder__ and {{ expression }} syntax
- [mutation-form-across-blocks.md](mutation-form-across-blocks.md) — Bridging data between read and mutation blocks
- [htmx-swap-after-mutation.md](htmx-swap-after-mutation.md) — htmx form submission with server-rendered response swaps
- [benchmark-verification.md](benchmark-verification.md) — Always verify response content before trusting throughput numbers
- [nested-block-hydration-conflict.md](nested-block-hydration-conflict.md) — Independent nested blocks with shared placeholders break parent hydration
- [ambiguous-route-slugs.md](ambiguous-route-slugs.md) — When two content types share a URL space, namespace the routes
- [trusted-html-expression-evaluation.md](trusted-html-expression-evaluation.md) — Trusted HTML fields must escape {{ to prevent expression evaluation
