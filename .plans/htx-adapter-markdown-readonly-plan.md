# Read-only Markdown Adapter Plan

**Status:** IN PROGRESS

## Goal

Add a read-only markdown-backed `ContentAdapter` for HTX that:

- reads content from `content/<type>/<slug>.md`
- parses simple YAML-style front matter
- returns rows with both `body` and rendered `body_html`
- supports the existing read-path query contract used by `GetContentExecutor`
- can be selected by the CLI/runtime without pretending to support CRUD

## Scope

In scope:

- new package `packages/htx-adapter-markdown`
- recursive file indexing
- `query`, `find`, `findBySlug`, `schema`
- explicit read-only `create` / `update` / `delete` errors
- CLI/project config switch for markdown content roots
- tests and docs

Out of scope:

- CRUD on markdown files
- git sync or tenant routing
- FTS/search indexing
- scaffolding a markdown-first starter

## Design Decisions

- Content root convention: `content/<type>/<slug>.md`
- Slug source: front matter `slug`, otherwise filename stem
- ID source: front matter `id`, otherwise stable fallback `${type}:${slug}`
- Row shape: align with `SQLiteAdapter` system columns where possible
- Markdown rendering: source markdown stays in `body`; rendered HTML goes in `body_html`
- Read-only enforcement: mutation methods throw clear errors

## Phases

### Phase 1

- create package scaffold
- export `MarkdownAdapter`
- add workspace/typecheck wiring

### Phase 2

- implement markdown file discovery
- parse front matter and body
- build in-memory indexes by type, slug, and id
- render markdown into `body_html`

### Phase 3

- implement `query`, `find`, `findBySlug`, `schema`
- mirror SQLite read semantics for `slug`, `where`, `order`, `howmany`, `offset`
- document any intentional deviations

### Phase 4

- implement explicit read-only mutation errors
- add focused adapter tests
- add executor-level read-path smoke coverage

### Phase 5

- extend CLI config with adapter selection and `contentRoot`
- wire `serve` / `dev` runtime to choose markdown vs sqlite adapter
- add integration coverage for markdown-backed serving

### Phase 6

- update package and root READMEs
- document directory layout, front matter shape, and read-only behavior

## Execution Log

- [ ] Phase 1 — Package scaffold
- [ ] Phase 2 — Index and parse markdown
- [ ] Phase 3 — Implement read API
- [ ] Phase 4 — Enforce read-only and test
- [ ] Phase 5 — CLI integration
- [ ] Phase 6 — Docs
