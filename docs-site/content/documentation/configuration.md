---
title: Configuration
status: published
section: runtime-internals
section_label: Runtime Internals
summary: htx.config.json, app config, environment variables, and secret management.
created_at: 2026-03-28 00:18:00
---

HTX projects are configured through a `htx.config.json` file at the project root and, in showcase projects, a runtime `app/config.ts` file. This document covers both, along with server options and environment considerations.

## htx.config.json

Every HTX project has a `htx.config.json` file in its root directory. The CLI looks for this file to identify the project root and loads all settings from it.

### Full Structure

```json
{
  "appName": "My App",
  "templatesDir": "app/templates",
  "publicDir": "app/public",
  "databasePath": "app/data/content.sqlite",
  "adapter": "sqlite",
  "contentRoot": "content",
  "secretKey": "replace-this-secret-before-production-use!"
}
```

### Field Reference

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `appName` | `string` | `"HTX App"` | Display name for the application. Used in scaffolded templates and logging. |
| `templatesDir` | `string` | `"app/templates"` | Path to the template directory, relative to the project root. Contains `.htx` files and layout/partial/component subdirectories. |
| `publicDir` | `string` | `"app/public"` | Path to the static assets directory, relative to the project root. Files here are served directly without template processing. |
| `databasePath` | `string` | `"app/data/content.sqlite"` | Path to the SQLite database file, relative to the project root. Used when `adapter` is `"sqlite"`. The parent directory is created automatically if it does not exist. |
| `adapter` | `"sqlite" \| "markdown"` | `"sqlite"` | The content adapter to use. `"sqlite"` stores content in a SQLite database with JSON meta. `"markdown"` reads content from Markdown files on disk. |
| `contentRoot` | `string` | `"content"` | Path to the content directory, relative to the project root. Used when `adapter` is `"markdown"`. |
| `secretKey` | `string` | `"dev-secret-key-at-least-32-bytes-long"` | Secret used for signing JWT action tokens. Must be at least 32 characters. Replace the default before deploying to production. |

### ProjectConfig Interface

The TypeScript interface that defines the configuration shape:

```ts
export interface ProjectConfig {
  appName: string;
  templatesDir: string;
  publicDir: string;
  databasePath: string;
  adapter: "sqlite" | "markdown";
  contentRoot: string;
  secretKey: string;
}
```

### Default Values

The `defaultConfig()` function returns the full set of defaults. Any field present in `htx.config.json` overrides the corresponding default:

```ts
export function defaultConfig(): ProjectConfig {
  return {
    appName: "HTX App",
    templatesDir: "app/templates",
    publicDir: "app/public",
    databasePath: "app/data/content.sqlite",
    adapter: "sqlite",
    contentRoot: "content",
    secretKey: "dev-secret-key-at-least-32-bytes-long",
  };
}
```

The config loader merges the file contents over defaults:

```ts
const raw = JSON.parse(readFileSync(configPath, "utf8"));
const config = { ...defaultConfig(), ...raw };
```

This means you can specify only the fields you want to change:

```json
{
  "appName": "My Blog",
  "secretKey": "a-real-secret-key-for-production-use-here"
}
```

All other fields will use their defaults.

## Runtime Configuration (Showcase Projects)

Showcase projects scaffolded with `htx new --variant showcase` include an `app/config.ts` file that provides a programmatic configuration object used by the application runtime:

```ts
import path from "node:path";

export interface ShowcaseAppConfig {
  appName: string;
  templatesDir: string;
  publicDir: string;
  databasePath: string;
  secretKey: string;
}

export function createShowcaseAppConfig(
  overrides: Partial<ShowcaseAppConfig> = {},
): ShowcaseAppConfig {
  return {
    appName: "Hypermedia App",
    templatesDir: path.resolve(import.meta.dir, "templates"),
    publicDir: path.resolve(import.meta.dir, "public"),
    databasePath: path.resolve(import.meta.dir, "data", "content.sqlite"),
    secretKey: "replace-this-secret-before-production-use!",
    ...overrides,
  };
}
```

This config is used by the `app/public/index.ts` entry point to wire up the engine. It resolves all paths as absolute paths relative to the app directory.

The runtime config and `htx.config.json` serve different purposes:

| | `htx.config.json` | `app/config.ts` |
|---|---|---|
| **Used by** | CLI commands (`htx dev`, `htx serve`) | Application runtime entry point |
| **Format** | JSON | TypeScript |
| **Paths** | Relative to project root | Absolute (resolved at runtime) |
| **Required** | Always | Only in showcase projects |

## Server Configuration

The development server is configured through CLI flags passed to `htx dev` or `htx serve`.

### CLI Flags

| Flag | Default | Description |
|------|---------|-------------|
| `--host` | `127.0.0.1` | Hostname to bind the server to. Use `0.0.0.0` to listen on all interfaces. |
| `--port` | `3000` | Port number for the HTTP server. |
| `--cwd` | Current directory | Working directory. The CLI walks upward from this directory to find `htx.config.json`. |
| `--dry-run` | (flag) | Print configuration and exit without starting the server. |

### Examples

```bash
# Start on default host and port
htx dev

# Custom port
htx dev --port 8080

# Bind to all interfaces
htx dev --host 0.0.0.0 --port 4000

# Verify configuration without starting
htx serve --dry-run
```

### Server Output

When the server starts, it prints the active configuration:

```
HTX Server
Local:   http://127.0.0.1:3000
Root:    /path/to/project
Public:  /path/to/project/app/public
Adapter: sqlite
DB:      /path/to/project/app/data/content.sqlite
```

For markdown adapter projects, the output shows the content directory instead of the database path:

```
Adapter: markdown
Content: /path/to/project/content
```

## Database Configuration

### SQLite Adapter

When `adapter` is `"sqlite"`, the `databasePath` field determines where the SQLite database is stored. The CLI creates the parent directory automatically:

```json
{
  "adapter": "sqlite",
  "databasePath": "app/data/content.sqlite"
}
```

The SQLite adapter creates the database and required tables on first access. No manual schema setup is needed.

### Markdown Adapter

When `adapter` is `"markdown"`, the `contentRoot` field determines where content files are stored:

```json
{
  "adapter": "markdown",
  "contentRoot": "content"
}
```

Content is organized as Markdown files with YAML frontmatter under `{contentRoot}/{type}/` directories.

## Secret Key Management

The `secretKey` field is used to sign JWT action tokens that protect mutations (create, update, delete). The default value is only suitable for development.

### Requirements

- Must be at least 32 characters
- Must be unique per deployment
- Must be kept secret (do not commit production keys to version control)

### Recommendations

Generate a production key:

```bash
openssl rand -base64 48
```

For production deployments, set the secret key in `htx.config.json` or pass it through your deployment configuration. The config file should be excluded from version control if it contains production secrets, or the secret should be injected at deploy time.

```json
{
  "secretKey": "your-production-secret-key-generated-above"
}
```

## Project Root Discovery

The CLI finds the project root by walking upward from the current (or `--cwd`) directory, looking for `htx.config.json`. This means you can run CLI commands from any subdirectory of the project:

```bash
cd my-project/app/templates
htx dev   # Still works -- finds htx.config.json in my-project/
```

If no `htx.config.json` is found, the CLI prints an error and exits:

```
Error: Could not find project root (no htx.config.json found).
Run this command from within an HTX project directory.
```

## Minimal Configuration

The smallest valid `htx.config.json` is an empty object, since all fields have defaults:

```json
{}
```

A typical minimal configuration for a new project:

```json
{
  "appName": "My Project"
}
```

A production-ready configuration:

```json
{
  "appName": "My Project",
  "secretKey": "a-cryptographically-random-string-at-least-32-chars"
}
```
