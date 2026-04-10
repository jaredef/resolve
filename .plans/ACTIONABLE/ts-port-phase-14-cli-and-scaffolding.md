# Phase 14 — CLI And Scaffolding

**Status:** COMPLETE

## Objective

Build the CLI around the real runtime path so `htx new`, `htx dev`, and `htx serve` consume the engine and app host rather than reimplement them.

## Source of truth

- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/bin/htx`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/src/Cli/Application.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/src/Cli/ArgParser.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/src/Cli/CommandInterface.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/src/Cli/Commands/NewCommand.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/src/Cli/Commands/DevCommand.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/src/Cli/Commands/ServeCommand.php`

## Target TS files

- `hypermedia-app-ts/packages/htx-cli/bin/htx`
- `hypermedia-app-ts/packages/htx-cli/src/application.ts`
- `hypermedia-app-ts/packages/htx-cli/src/arg-parser.ts`
- `hypermedia-app-ts/packages/htx-cli/src/command.ts`
- `hypermedia-app-ts/packages/htx-cli/src/commands/new-command.ts`
- `hypermedia-app-ts/packages/htx-cli/src/commands/dev-command.ts`
- `hypermedia-app-ts/packages/htx-cli/src/commands/serve-command.ts`
- `hypermedia-app-ts/packages/htx-cli/tests/cli.test.ts`

## Implementation steps

1. Port CLI argument parsing and command dispatch.
2. Implement `htx serve` and `htx dev` as thin wrappers around the host/runtime path from Phase 12.
3. Implement `htx new` using a scaffold layout that matches the Bun/TS monorepo conventions created in Phase 01.
4. Define config loading boundaries so CLI concerns do not leak into engine packages.
5. Export the CLI through the package `bin` field and verify executable behavior.

## Acceptance gates

- CLI command dispatch works without duplicating engine wiring.
- `htx dev` and `htx serve` run the same handler stack used by the dogfood app.
- `htx new` produces a scaffold that matches documented Bun paths and package names.
- CLI tests run commands as subprocesses or equivalent black-box flows.

## Tests to port

- CLI behavior from PHP command tests
- Command parsing cases
- Serve/dev invocation cases
- New-project scaffold structure validation

## Known risks

- Letting CLI create its own runtime path
- Under-specifying the generated scaffold
- Treating watch/dev behavior as more important than correct engine wiring

## Execution log

- [x] CLI application ported
- [x] Command parser ported
- [x] `new`, `dev`, and `serve` implemented
- [x] Package bin/export wiring complete
- [x] CLI tests passing
