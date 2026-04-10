# @htx/cli

CLI for the Bun + TypeScript HTX stack.

Current commands:

- `htx new`
- `htx dev`
- `htx serve`

The scaffold now supports two dependency modes:

- local workspace mode via `file:` links for repo development
- published package mode for create-app style bootstrapping

The runtime supports adapter routing through an `adapters` map in `htx.config.json`:

- `driver: "sqlite"` with `databasePath`
- `driver: "markdown"` with `contentRoot`

It also supports starter variants:

- `cms` (default) for the full seeded CMS app
- `showcase` as a compatibility alias for `cms`
- `minimal` for a leaner route-and-layout starter
- `blog` for a markdown-backed publishing starter
- `docs` for a markdown-backed documentation starter

## Commands

### `htx new`

Scaffold a new HTX app structure:

```bash
bun packages/htx-cli/bin/htx new demo-app
```

Use `--published` to emit published package specs instead of local file links:

```bash
bun packages/htx-cli/bin/htx new demo-app --published
```

Use `--minimal` when you want a much smaller generated app:

```bash
bun packages/htx-cli/bin/htx new demo-app --minimal
```

Use markdown-backed starters when you want flat-file content immediately:

```bash
bun packages/htx-cli/bin/htx new demo-app --blog
bun packages/htx-cli/bin/htx new demo-app --docs
```

Use `--showcase` only when you need compatibility with the older starter name:

```bash
bun packages/htx-cli/bin/htx new demo-app --showcase
```

Generated structure includes:

- `htx.config.json`
- `app/config.ts`
- `app/public/index.ts`
- `app/seed.ts`
- `app/seed-content.ts`
- `app/templates`
- `app/public`
- `app/data`
- CMS homepage, public pages, posts, admin auth, and admin templates
- seedable SQLite-backed starter content
- shared components, partials, and CMS CSS

Minimal variant includes:

- `htx.config.json`
- `app/templates/_layout.htx`
- `app/templates/index.htx`
- `app/templates/about.htx`
- `app/templates/partials/_nav.htx`
- `app/public/css/style.css`

Blog and docs variants include:

- `adapters.default.driver = "markdown"` in `htx.config.json`
- `content/` with starter markdown files
- HTX templates tailored to posts or documentation
- no `seed` script because the content already lives in files

Default generated routes include:

- `/`
- `/posts`
- `/posts/[slug]`
- `/pages/[slug]`
- `/admin`
- `/admin/login`
- `/admin/posts`
- `/admin/pages`

Typical local flow:

```bash
bun packages/htx-cli/bin/htx new demo-app
cd demo-app
bun install
bun run seed
bun run dev
```

Generated apps also include companion scripts for testing the production-safe error surface locally:

```bash
bun run dev:prod-errors
bun run serve:prod-errors
```

### `htx dev`

Start the watching Bun development server using the real HTX runtime stack:

```bash
bun packages/htx-cli/bin/htx dev --cwd ./demo-app --port 3000
```

Error output modes:

```bash
bun packages/htx-cli/bin/htx dev --cwd ./demo-app --dev-errors
bun packages/htx-cli/bin/htx dev --cwd ./demo-app --prod-errors
```

`--dev-errors` is the default and renders rich diagnostic pages. `--prod-errors` keeps the runtime on the production-safe error surface while still logging server-side diagnostics.

`htx dev` watches the app project and restarts the server when files change. Use `--no-watch` when you want the direct server path without reload supervision:

```bash
bun packages/htx-cli/bin/htx dev --cwd ./demo-app --no-watch
```

### `htx serve`

Start the direct non-watching server path:

```bash
bun packages/htx-cli/bin/htx serve --cwd ./demo-app --port 3000
```

## Dry Run

`dev` and `serve` support `--dry-run` for validation without starting a long-running server:

```bash
bun packages/htx-cli/bin/htx serve --cwd ./demo-app --dry-run
```

You can combine dry-run with an explicit error mode:

```bash
bun packages/htx-cli/bin/htx serve --cwd ./demo-app --dry-run --prod-errors
```

## Config

The CLI looks for `htx.config.json` by walking upward from the working directory.

Current config shape:

```json
{
  "appName": "HTX App",
  "templatesDir": "app/templates",
  "publicDir": "app/public",
  "secretKey": "dev-secret-key-at-least-32-bytes-long",
  "adapters": {
    "default": {
      "driver": "sqlite",
      "databasePath": "app/data/content.sqlite"
    }
  }
}
```

Markdown-backed projects can switch the default adapter:

```json
{
  "adapters": {
    "default": {
      "driver": "markdown",
      "contentRoot": "content"
    }
  }
}
```

Mixed projects can route specific content types to different adapters:

```json
{
  "adapters": {
    "default": {
      "driver": "sqlite",
      "databasePath": "app/data/content.sqlite"
    },
    "documentation": {
      "driver": "markdown",
      "contentRoot": "content"
    }
  }
}
```

## Testing

```bash
bun test packages/htx-cli/tests/cli.test.ts
```

The current CLI tests cover:

- argument parsing
- version output
- local and published scaffold generation
- seed flow and generated route smoke coverage
- `dev` and `serve` runtime wiring through dry-run execution
