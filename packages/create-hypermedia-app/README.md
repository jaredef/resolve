# create-hypermedia-app

Bun-first bootstrap package for starting a new HTX application.

## Usage

Once published, these commands are equivalent:

```bash
bun create hypermedia-app my-app
bunx create-hypermedia-app my-app
```

By default the generated app uses published package versions for:

- `@htx/engine`
- `@htx/adapter-sqlite`
- `@htx/cli`

The default scaffold is a CMS starter, not a blank shell. It includes:

- a public homepage
- posts routes at `/posts`
- page routes at `/pages/[slug]`
- admin login/logout plus CRUD flows for posts and pages
- a `bun run seed` script with starter content

Variants:

- `cms` is the default
- `showcase` remains supported as a compatibility alias for `cms`
- `minimal` creates a lean starter with a root layout, a couple of routes, and no seeded content
- `blog` creates a markdown-backed publishing starter
- `docs` creates a markdown-backed documentation starter

Typical flow:

```bash
bunx create-hypermedia-app my-app
cd my-app
bun install
bun run seed
bun run dev
```

Generated apps also include:

```bash
bun run dev:prod-errors
bun run serve:prod-errors
```

`bun run dev` now uses the watching development server and restarts when app files change.
Generated apps use the `adapters` map in `htx.config.json`, so CMS starters default to SQLite while blog/docs starters default to markdown.

Use the minimal variant when you want a lighter starting point:

```bash
bunx create-hypermedia-app my-app --minimal
```

Markdown-first variants are also available:

```bash
bunx create-hypermedia-app my-app --blog
bunx create-hypermedia-app my-app --docs
```

## Local Workspace Mode

For monorepo development, you can scaffold an app that links back to the local packages:

```bash
bunx create-hypermedia-app my-app --local
```

Local mode is intended for a workspace checkout where `packages/htx-engine`, `packages/htx-adapter-sqlite`, and `packages/htx-cli` are available.
