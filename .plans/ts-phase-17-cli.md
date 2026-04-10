# Phase 17 — CLI

**Status:** NOT STARTED
**Depends on:** Phase 16 (SQLite Adapter), all engine phases

## Objectives

Port the CLI tool to TypeScript. Three commands: `htx new`, `htx dev`, `htx serve`. Use Bun's native capabilities instead of PHP's built-in server.

## Source Reference

- **PHP source:** `packages/htx-engine/src/Cli/Application.php`
- **PHP source:** `packages/htx-engine/src/Cli/ArgParser.php`
- **PHP source:** `packages/htx-engine/src/Cli/CommandInterface.php`
- **PHP source:** `packages/htx-engine/src/Cli/Commands/NewCommand.php`
- **PHP source:** `packages/htx-engine/src/Cli/Commands/DevCommand.php`
- **PHP source:** `packages/htx-engine/src/Cli/Commands/ServeCommand.php`

## Files to Create

### `packages/htx-engine/src/cli/index.ts`

Main entry point — parse `process.argv`, dispatch to command.

**Approach:** Hand-roll argument parsing (matching PHP's zero-dependency approach). Only 3 commands with simple args — no need for `commander` or `yargs`.

```typescript
const [command, ...args] = process.argv.slice(2)

switch (command) {
  case 'new': return newCommand(args)
  case 'dev': return devCommand(args)
  case 'serve': return serveCommand(args)
  default: printHelp()
}
```

### `packages/htx-engine/src/cli/commands/new-command.ts`

Scaffold a new HTX project:
- Create directory structure (`templates/`, `public/`, etc.)
- Generate starter `index.htx`
- Generate config file
- Initialize SQLite database
- Print success message with next steps

### `packages/htx-engine/src/cli/commands/dev-command.ts`

Development server with hot reload:
- Use `Bun.serve()` for HTTP server
- Watch template directory for changes (Bun's `fs.watch()`)
- Route requests through the engine pipeline
- Serve static files from `public/`
- Console output with request logging

### `packages/htx-engine/src/cli/commands/serve-command.ts`

Production server:
- Use `Bun.serve()` with production settings
- No file watching
- Configurable port and host

### `packages/htx-engine/bin/htx`

Executable entry point:
```
#!/usr/bin/env bun
import '../src/cli/index.ts'
```

## Files to Create (Tests)

### `packages/htx-engine/tests/cli.test.ts`

Port from PHP `CliTest.php`:
- Argument parsing for each command
- `htx new` creates correct directory structure
- Unknown command shows help
- Dev server starts on correct port
- Serve command respects port/host args

**Note:** Server start/stop tests may need subprocess spawning. Keep tests focused on argument parsing and scaffolding logic — don't test HTTP serving (that's integration test territory for Phase 18).

## Validation

- [ ] `bun run packages/htx-engine/bin/htx new test-project` scaffolds correctly
- [ ] `bun run packages/htx-engine/bin/htx dev` starts dev server
- [ ] `bun run packages/htx-engine/bin/htx serve` starts production server
- [ ] `bun run packages/htx-engine/bin/htx` shows help
- [ ] All tests pass

## Review Comments

_Reviewed by Claude after building the complete PHP implementation._

### `Bun.serve()` is a Great Fit

The PHP version used `php -S` (built-in server) which has limitations (single-threaded, no hot reload). Bun's `Bun.serve()` is production-capable out of the box with HTTP/2, TLS, and excellent performance. This is a genuine upgrade from the PHP version.

### Dev Server: File Watching

The plan mentions `fs.watch()` for hot reload. Bun also has `Bun.FileSystemWatcher` which may be more reliable. However, for a dev server, "hot reload" in a hypermedia context is simpler than SPA hot reload — you just need to invalidate the router cache and re-render on the next request. No WebSocket needed. Consider a simple approach: on file change, clear any caches (route table, template cache). The browser refresh gives you the new content.

### `htx new` Scaffolding: Replicate the Dogfood App

The PHP build created a comprehensive dogfood app (`app/` directory) with blog, admin CRUD, components, partials, and layouts. `htx new` should scaffold something similar but simpler — a minimal working app that demonstrates the key features:
- `index.htx` with a query
- `_layout.htx` with includes
- A `partials/_nav.htx`
- One create form
- `public/style.css`

This gives new users something that works immediately and teaches them the DSL.

### Missing: `htx build` Command?

The PHP version doesn't have a build command, but for the TypeScript version, consider whether a `htx build` command would be useful — pre-compiling templates, generating a static route manifest, etc. Not essential for v1, but worth listing as a future enhancement.

### Shebang Line

The `#!/usr/bin/env bun` shebang is correct. Make sure `package.json` has a `"bin"` field pointing to this file, and that the file has execute permissions (`chmod +x`).

### Testing CLI: Use `Bun.spawn()`

For testing CLI commands, `Bun.spawn()` or `Bun.spawnSync()` can run the CLI as a subprocess and capture stdout/stderr. This is cleaner than trying to mock process.argv.

## Execution Log

_(empty — not yet executed)_

## Independent review notes (2026-03)

- Set **`package.json` `"bin"`** and executable bit on `bin/htx` so `bun link` / global install matches the documented `htx` command (see prior review).

## Port review addendum (2026-03-28)

- The CLI should not become a second integration surface with its own wiring. I would explicitly state that `dev` and `serve` are thin wrappers around the same RequestHandler/runtime path used everywhere else.
- This phase also needs a hard prerequisite on RequestHandler readiness, otherwise "CLI complete" can be true while the actual app pipeline is still undefined.
