# Project Structure

The HTX TypeScript implementation is organized as a Bun workspace monorepo with three publishable packages and a reference application.

## Directory Layout

```
hypermedia-app-ts/
  packages/
    htx-engine/              # Core engine — everything needed to parse, route, render, and mutate
    htx-adapter-sqlite/      # SQLite adapter using bun:sqlite (read/write)
    htx-adapter-markdown/    # Markdown flat-file adapter (read-only)
    htx-cli/                 # CLI tool: htx new, htx dev, htx serve
    create-hypermedia-app/   # bun create bootstrapper
  app/                       # Dogfood reference application
    config.ts                # App configuration
    docs-content.ts          # Seed data for documentation pages
    seed-docs.ts             # Seed script
    public/
      index.ts               # App entrypoint (Bun.serve bootstrap)
      css/style.css           # Stylesheet
    templates/               # HTX template files (routes)
      _layout.htx            # Root layout
      index.htx              # Homepage
      blog/                  # Blog routes
      docs/                  # Docs routes
      admin/                 # Admin routes
      components/            # Reusable components
      partials/              # Include partials
    data/                    # SQLite database directory
  tests/                     # Integration and smoke tests
  docs/                      # This documentation
```

## Packages

### `@htx/engine`

The core engine. Everything needed to handle an HTTP request through the HTX pipeline:

- **Expressions:** Lexer, parser, evaluator, function registry, and 40+ built-in functions
- **DSL Parser:** Extracts meta directives, response blocks, template content, and nest trees from `.htx` files
- **Router:** File-system routing with static, dynamic `[param]`, and catch-all resolution
- **Runtime:** Request handler, layout/include/component/let resolvers, template resolver, HTTP host
- **Executors:** `GetContentExecutor` for reads, `SetContentExecutor` and `DeleteContentExecutor` for mutations
- **Security:** JWT action token service, replay guard interface, in-memory replay guard
- **Services:** Hydrator for `__placeholder__` replacement

Only external dependency: `jose` (JWT signing and verification).

### `@htx/adapter-sqlite`

The read/write content adapter. Uses `bun:sqlite` with WAL mode, automatic schema creation, and a JSON `meta` column for custom fields. Implements all 7 methods of the `ContentAdapter` interface including full CRUD.

No external dependencies beyond `@htx/engine` (for the type contract).

### `@htx/adapter-markdown`

A read-only content adapter that indexes a directory tree of markdown files with YAML front matter. Content is organized as `content/<type>/<slug>.md`. The adapter parses front matter for metadata, renders markdown to HTML with `marked`, and supports the full read path (query, find, findBySlug). Mutations throw errors — this adapter is designed for documentation sites, blogs, and other content authored as flat files.

External dependency: `marked` (markdown rendering).

### `@htx/cli`

The command-line tool for local development:

- `htx new <name>` — Scaffold a new project
- `htx dev` — Start the development server
- `htx serve` — Alias for `dev`

Also exports the `scaffoldProject()` function and project config types used by the `create-hypermedia-app` package.

### `create-hypermedia-app`

The `bun create` bootstrapper. Delegates to `@htx/cli`'s scaffold function with support for:

- **Showcase** variant (default): Full app with homepage, docs, posts, admin, seed script, and CSS
- **Minimal** variant: Lean starter with a layout, two routes, and lightweight styles
- `--local` or `--published` dependency modes

## App Directory

The `app/` directory is the dogfood reference application. It uses the same runtime wiring as a scaffolded project and demonstrates:

- Public routes (homepage, blog listing, blog detail)
- Documentation section with seeded content
- Admin area with create, edit, and delete flows
- Nested layouts, includes, and components
- Static asset serving

## Workspace Configuration

The root `package.json` defines the Bun workspace:

```json
{
  "workspaces": ["packages/*"],
  "dependencies": {
    "@htx/adapter-sqlite": "workspace:*",
    "@htx/cli": "workspace:*",
    "@htx/engine": "workspace:*"
  }
}
```

TypeScript path aliases in `tsconfig.base.json` map `@htx/*` imports to local source during development.

## Verification

```bash
bun run typecheck    # Type-check all packages and the app
bun test             # Run all tests
bun run test:smoke   # Quick workspace smoke test
bun run check        # typecheck + smoke test
```
