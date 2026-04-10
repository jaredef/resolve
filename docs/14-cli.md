# CLI

The `@htx/cli` package provides the `htx` command-line tool for creating and serving HTX projects.

## Installation

The CLI is included as a dependency when you scaffold a project. You can also install it directly:

```bash
bun add @htx/cli
```

## Available Commands

| Command | Description |
|---------|-------------|
| `htx dev` | Start the development server |
| `htx serve` | Alias for `dev` -- start the development server |
| `htx new <name>` | Create a new HTX project scaffold |
| `htx help` | Show available commands |
| `htx --version` | Print the CLI version |

## The `new` Command

Scaffolds a new HTX project in a subdirectory of the current working directory.

```bash
htx new my-app
htx new my-app --minimal
htx new my-app --cms             # default
htx new my-app --published       # use published npm packages
htx new my-app --local           # use local workspace packages (default for htx new)
```

### Options

| Flag | Description |
|------|-------------|
| `--minimal` | Scaffold the minimal variant (two pages, no admin, no seeded content) |
| `--cms` | Scaffold the CMS variant (default). Includes posts, pages, admin auth, and seed data |
| `--showcase` | Compatibility alias for `--cms` |
| `--local` | Resolve `@htx/*` dependencies as `file:` links to the local monorepo. Default for `htx new` |
| `--published` | Resolve `@htx/*` dependencies as versioned registry packages. Default for `bun create` |

The `--local` and `--published` flags are mutually exclusive, as are `--minimal`, `--cms`, `--showcase`, `--blog`, and `--docs`.

### Default Dependency Mode

When invoked through `htx new`, the default dependency mode is `local`. This assumes you are working inside the monorepo and want `file:` links to sibling packages. When invoked through `bun create hypermedia-app`, the default is `published`, which references versioned packages from the registry.

## The `dev` / `serve` Commands

Both commands start the HTX development server. `dev` is the primary command; `serve` is an alias.

```bash
htx dev
htx dev --port 8080
htx dev --host 0.0.0.0
htx dev --cwd /path/to/project
htx dev --dry-run
```

### Options

| Flag | Default | Description |
|------|---------|-------------|
| `--host` | `127.0.0.1` | Hostname to bind |
| `--port` | `3000` | Port to listen on |
| `--cwd` | Current directory | Working directory to search for the project root |
| `--dry-run` | -- | Print configuration and exit without starting the server |

### Project Root Discovery

The server walks up from the working directory looking for an `htx.config.json` file. The first directory containing this file becomes the project root. If no config file is found, the command exits with an error.

### Runtime Assembly

The `serve` command assembles the full HTX runtime from the project configuration:

1. Reads `htx.config.json` and merges it with defaults.
2. Creates the DSL parser, expression engine, hydrator, router, and resolvers.
3. Opens the SQLite database (creating the directory if needed).
4. Creates the `ActionTokenService` and `InMemoryReplayGuard`.
5. Wires up `GetContentExecutor`, `SetContentExecutor`, and `DeleteContentExecutor`.
6. Builds a `RequestHandler` and wraps it in an `HttpHost`.
7. Starts a Bun HTTP server.

## Project Configuration

The `htx.config.json` file defines project-level settings:

```json
{
  "appName": "HTX App",
  "templatesDir": "app/templates",
  "publicDir": "app/public",
  "databasePath": "app/data/content.sqlite",
  "secretKey": "dev-secret-key-at-least-32-bytes-long"
}
```

### Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `appName` | `string` | `"HTX App"` | Display name for the application |
| `templatesDir` | `string` | `"app/templates"` | Path to the templates directory, relative to project root |
| `publicDir` | `string` | `"app/public"` | Path to the static assets directory, relative to project root |
| `databasePath` | `string` | `"app/data/content.sqlite"` | Path to the SQLite database file, relative to project root |
| `secretKey` | `string` | `"dev-secret-key-at-least-32-bytes-long"` | Secret key for signing action tokens. Replace before production use |

All paths are resolved relative to the project root (the directory containing `htx.config.json`).

## Argument Parser

The CLI uses a built-in `ArgParser` that supports positional arguments and `--flag` options:

```bash
htx new my-app --minimal --port 3000 --host=0.0.0.0
```

Flag formats:

- `--flag` -- Boolean flag (value is empty string)
- `--flag value` -- Flag with a space-separated value
- `--flag=value` -- Flag with an equals-separated value

Positional arguments are any arguments that do not start with `--`.

## Relationship to `bun create`

The `htx new` command and `bun create hypermedia-app` both call the same `scaffoldProject()` function. The difference is the default dependency mode:

| Entry point | Default mode | Use case |
|-------------|-------------|----------|
| `htx new my-app` | `local` | Developing inside the monorepo |
| `bun create hypermedia-app my-app` | `published` | Starting a new standalone project |

Both accept the same `--minimal`, `--cms`, `--showcase`, `--blog`, `--docs`, `--local`, and `--published` flags to override defaults. See the [create-hypermedia-app](./15-create-hypermedia-app.md) documentation for details on the bootstrapper package.
