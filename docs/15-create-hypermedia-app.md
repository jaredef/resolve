# create-hypermedia-app

The `create-hypermedia-app` package is the bootstrapper for new HTX projects. It is designed to work with `bun create` so that a single command produces a ready-to-run application.

## Usage

```bash
bun create hypermedia-app my-app
cd my-app
bun install
bun run seed
bun run dev
```

Open `http://localhost:3000` to see the running application.

### Options

| Flag | Description |
|------|-------------|
| `--minimal` | Scaffold the minimal variant instead of the default CMS starter |
| `--cms` | Scaffold the CMS variant (default) |
| `--showcase` | Compatibility alias for `--cms` |
| `--local` | Use `file:` links to local monorepo packages instead of published versions |
| `--published` | Use published registry packages (default for `bun create`) |

```bash
bun create hypermedia-app my-app --minimal
bun create hypermedia-app my-app --local
```

The `--local` and `--published` flags are mutually exclusive, as are `--minimal`, `--cms`, `--showcase`, `--blog`, and `--docs`.

## Scaffold Variants

### CMS (default)

The CMS variant produces a full writable application with public posts, content-managed pages, seeded data, reusable components, admin login/logout, and CRUD interfaces for posts and pages.

### Minimal

The minimal variant produces a lean starting point with a root layout, two pages, shared navigation, and lightweight CSS. No database seeding, no admin, no docs section.

## Scaffolded File Listing

### CMS Variant

```
my-app/
  package.json
  htx.config.json
  .gitignore
  app/
    admin-auth.ts
    admin-host.ts
    config.ts
    seed-content.ts
    seed.ts
    public/
      index.ts
      css/
        style.css
    data/
      .gitkeep
    templates/
      _layout.htx
      index.htx
      posts/
        index.htx
        [slug].htx
      pages/
        [slug].htx
      admin/
        _layout.htx
        login/
          _layout.htx
          index.htx
        index.htx
        posts/
          index.htx
          new.htx
          [id]/
            edit.htx
            delete.htx
        pages/
          index.htx
          new.htx
          [id]/
            edit.htx
            delete.htx
      components/
        card.htx
        page-header.htx
      partials/
        _nav.htx
        _footer.htx
```

### Minimal Variant

```
my-app/
  package.json
  htx.config.json
  .gitignore
  app/
    templates/
      _layout.htx
      index.htx
      about.htx
      partials/
        _nav.htx
    public/
      css/
        style.css
      .gitkeep
    data/
      .gitkeep
```

## Generated package.json

The scaffold produces a `package.json` with scripts wired to the CLI:

```json
{
  "name": "my-app",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "htx dev",
    "serve": "htx serve",
    "seed": "bun app/seed.ts"
  },
  "dependencies": {
    "@htx/adapter-sqlite": "0.1.0",
    "@htx/cli": "0.1.0",
    "@htx/engine": "0.1.0"
  }
}
```

The minimal variant omits the `seed` script since there is no seeded content.

## Generated htx.config.json

```json
{
  "appName": "my-app",
  "templatesDir": "app/templates",
  "publicDir": "app/public",
  "databasePath": "app/data/content.sqlite",
  "secretKey": "dev-secret-key-at-least-32-bytes-long"
}
```

## The --local Flag

The `--local` flag switches dependency resolution from published registry packages to `file:` links pointing at sibling packages in the monorepo. This is useful during development of HTX itself.

When `--local` is active, the scaffold:

1. Locates the monorepo workspace root by walking up from the CLI package directory.
2. Verifies that `packages/htx-engine`, `packages/htx-adapter-sqlite`, and `packages/htx-cli` each contain a `package.json`.
3. Writes `file:` relative paths into the generated `package.json` dependencies.
4. Adds an `overrides` block so that Bun resolves transitive references to the same local copies.

If the local packages cannot be found, the scaffold exits with an error.

When using `bun create`, the default mode is `published`. When using `htx new`, the default mode is `local`.

## How the Scaffold Renders Templates

The scaffold does not use a template engine. Each generated file is produced by a dedicated render function inside the `@htx/cli` package (e.g. `renderRootLayout()`, `renderHomePage()`, `renderAdminPostsEdit()`). These functions return plain strings. The `scaffoldProject()` function collects the file list for the chosen variant, writes each file to disk with `writeFileSync`, and creates directories as needed with `mkdirSync`.

The project name is interpolated into the layout title, navigation links, and config file. Package names are sanitized to lowercase alphanumeric characters and hyphens.

## Showcase Seed Data

The showcase variant includes a seed script at `app/seed.ts` and seed content at `app/seed-content.ts`. The seed content defines records for two content types:

| Content Type | Records | Description |
|-------------|---------|-------------|
| `post` | 4 | Three published posts and one draft, with title, slug, summary, body, author, and status |
| `documentation` | 5 | Docs entries grouped into sections (getting-started, core-concepts, building-pages, operations) |

Running `bun run seed` opens the SQLite database, upserts all records (creating new ones or updating existing ones by slug), and reports the results.

## Post-Scaffold Steps

After scaffolding completes, the CLI prints the recommended next steps:

```
cd my-app
bun install
bun run seed      # showcase only
bun run dev
```

1. **`bun install`** -- Installs the three `@htx/*` dependencies (engine, adapter-sqlite, cli).
2. **`bun run seed`** -- (Showcase only) Populates the SQLite database with sample posts and documentation records.
3. **`bun run dev`** -- Starts the development server on `http://127.0.0.1:3000`.
