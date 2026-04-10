# HTX for Bun + TypeScript

HTX is a declarative hypermedia engine for building full-stack applications with `.htx` templates, file-system routing, pluggable adapters, and token-backed mutations.

This repository is the Bun/TypeScript port of the original PHP codebase. The current implementation includes:

- `@htx/engine` for parsing, routing, rendering, mutations, and the Bun HTTP host
- `@htx/adapter-markdown` for read-only markdown-backed content trees
- `@htx/adapter-sqlite` as the reference data adapter
- `@htx/cli` for `htx new`, `htx dev`, and `htx serve`
- `create-hypermedia-app` for `bun create hypermedia-app`
- `app/` as the dogfood reference application

The generated app scaffold is now a CMS starter with:

- a public homepage
- posts list/detail routes at `/posts`
- page routes at `/pages/[slug]`
- an authenticated admin for posts and pages
- seeded SQLite content and a built-in `seed` script

Scaffold variants:

- `cms` is the default and includes public pages, posts, admin auth, and seed data
- `showcase` remains supported as a compatibility alias for the CMS starter
- `minimal` gives you a much smaller HTX starter with a root layout, a couple of routes, and light CSS
- `blog` creates a markdown-backed publishing starter with post list/detail routes
- `docs` creates a markdown-backed documentation starter with grouped docs pages

## Status

Implemented now:

- Bun runtime request pipeline
- HTX parser, expressions, layouts, includes, components, and `htx:let`
- Read and mutation executors
- JWT-backed prepare/execute mutation flow
- SQLite adapter
- Markdown adapter
- Per-type multi-adapter routing through `htx.config.json`
- CLI scaffolding and local serving
- Dogfood app with public and admin flows

Future scope:

- standalone docs site
- release automation

## Monorepo Layout

```text
packages/
  htx-engine/
  htx-adapter-markdown/
  htx-adapter-sqlite/
  htx-cli/
  create-hypermedia-app/
app/
tests/
```

## Quick Start

```bash
bun install
bun run typecheck
bun test
```

Run the workspace CLI:

```bash
bun packages/htx-cli/bin/htx --version
bun packages/htx-cli/bin/htx new demo-app
```

Create an app through the dedicated Bun bootstrap package:

```bash
bun packages/create-hypermedia-app/bin/create-hypermedia-app demo-app
```

Once published, the intended public command is:

```bash
bun create hypermedia-app demo-app
```

Use the minimal variant when you want a leaner starter:

```bash
bun create hypermedia-app demo-app --minimal
```

Markdown-focused starters are also available:

```bash
bun create hypermedia-app demo-app --blog
bun create hypermedia-app demo-app --docs
```

The generated project flow is:

```bash
cd demo-app
bun install
bun run seed
bun run dev
```

Run the dogfood app directly:

```bash
bun app/public/index.ts
```

## HTX Model

HTX files route themselves:

```html
<htx:type>post</htx:type>
<htx:slug>{{ route.slug }}</htx:slug>
<htx>
<article>
  <h1>__title__</h1>
  <div>__body__</div>
</article>
</htx>
```

`/blog/my-post` resolves the file, queries the adapter, and renders HTML.

Reads are single-hop and token-free. Mutations are two-phase:

1. `GET` prepares a form and injects a signed action payload.
2. `POST` validates that payload, applies the mutation, and returns HTML or a redirect target.

For local serving, `htx dev` and `htx serve` now support explicit diagnostics modes:

```bash
htx dev --dev-errors
htx serve --prod-errors
```

`--dev-errors` is the default and renders rich authoring diagnostics. `--prod-errors` keeps the safer production-style response surface while preserving server-side logs.

Scaffolded apps also include companion scripts so this mode is easy to try locally:

```bash
bun run dev
bun run dev:prod-errors
```

`bun run dev` now runs the watching development server and restarts on app file changes. Use `htx dev --no-watch` when you want the direct non-restarting server path during local debugging.

## Runtime Shape

At the engine level, the request pipeline is:

```text
route -> file read -> includes -> components -> let -> parse blocks
-> execute blocks -> expression pass -> hydrate -> layout -> response
```

The Bun host maps `Request` objects into that handler and serves static files from `public/` before HTX routing.

## Packages

- `packages/htx-engine/README.md`
- `packages/htx-adapter-markdown/README.md`
- `packages/htx-adapter-sqlite/README.md`
- `packages/htx-cli/README.md`
- `packages/create-hypermedia-app/README.md`

## Verification

Current repo verification:

```bash
bun run typecheck
bun test
```
