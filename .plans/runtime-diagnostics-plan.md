# Runtime Diagnostics Plan

**Status:** COMPLETE

## Goal

Make the Bun-first HTX runtime produce robust, actionable authoring errors for template rendering and markdown-backed content without requiring a separate build step.

## Why This Matters

- Runtime-only systems need excellent diagnostics because template and content mistakes are discovered live.
- Silent failures and generic 500 pages slow down authoring and make generated apps feel fragile.
- Markdown-backed starters especially need clear validation when content roots, front matter, or record identity are wrong.

## Scope

In scope:

- shared diagnostic error model in `@htx/engine`
- richer request/render context in runtime error handling
- development-friendly HTML error output from `RequestHandler`
- markdown adapter validation for missing roots, malformed front matter, and duplicate ids/slugs
- CLI startup handling so adapter/runtime boot errors print clearly and exit cleanly
- focused regression coverage

Out of scope:

- browser overlay tooling
- source maps or editor deep links
- full production log transport/structured observability pipeline
- exhaustive parser validation for every HTX directive

## Phases

### Phase 1

- add shared diagnostic primitives in the engine
- wrap request-time failures with stage and file/request context
- render richer development error pages instead of bare escaped messages
- surface startup diagnostics cleanly from `htx serve`

### Phase 2

- harden `MarkdownAdapter` validation
- throw explicit diagnostics for missing content roots
- throw explicit diagnostics for malformed front matter
- detect duplicate `type + slug` and `type + id` collisions during reload

### Phase 3

- add focused tests for request diagnostics, markdown validation, and CLI startup output
- run targeted test suites and typecheck
- update plan statuses and execution logs

## Execution Log

- [x] Phase 1 - Engine and CLI diagnostics foundation
- [x] Phase 2 - Markdown adapter validation
- [x] Phase 3 - Tests and verification
