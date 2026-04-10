# Hypermedia App Documentation

Hypermedia App is a full-stack application framework built around `.htx` template files, file-system routing, pluggable data adapters, and JWT-backed secure mutations. The TypeScript implementation runs on Bun.

## Quick Start

```bash
bun create hypermedia-app my-app
cd my-app
bun install
bun run seed
bun run dev
```

Open `http://localhost:3000` and you have a working app with public pages, a docs section, and an admin area.

## Documentation

### Getting Started

- [What Is Hypermedia App?](./01-what-is-hypermedia-app.md) — The model, the philosophy, and what problems it solves.
- [Project Structure](./02-project-structure.md) — Packages, directories, and how the monorepo fits together.
- [Quick Start Guide](./03-quick-start.md) — From zero to running app in under a minute.

### Core Concepts

- [Routing](./04-routing.md) — File-system routing, dynamic segments, catch-all paths, and route exclusions.
- [Templates and the HTX DSL](./05-templates-and-dsl.md) — The `.htx` file format, meta directives, template blocks, and response blocks.
- [Expression Engine](./06-expression-engine.md) — The `{{ }}` expression language: syntax, operators, control flow, pipes, and built-in functions.
- [Layouts, Includes, and Components](./07-layouts-includes-components.md) — Composition primitives for reusable UI without a frontend framework.

### Data and Content

- [Reads and Queries](./08-reads-and-queries.md) — How `<htx:type>`, `<htx:where>`, `<htx:each>`, and the content adapter drive data-backed pages.
- [Content Adapter Contract](./09-content-adapter.md) — The 7-method interface that makes any data source work with HTX.
- [SQLite Adapter](./10-sqlite-adapter.md) — The reference adapter: schema, queries, JSON meta, and ordering.
- [Markdown Adapter](./19-markdown-adapter.md) — Read-only flat-file adapter for documentation, blogs, and content in version control.
- [Hydrator](./11-hydrator.md) — `__placeholder__` replacement, HTML escaping, dot notation, and trusted fields.

### Mutations and Security

- [Forms and Mutations](./12-forms-and-mutations.md) — The two-phase prepare/execute model for create, update, and delete.
- [Security Model](./13-security.md) — JWT action tokens, replay guards, tenant isolation, and CSRF-proof mutations.

### Tooling

- [CLI Reference](./14-cli.md) — `htx new`, `htx dev`, `htx serve`, and project configuration.
- [create-hypermedia-app](./15-create-hypermedia-app.md) — The `bun create` bootstrapper with showcase and minimal variants.

### Runtime Internals

- [Request Pipeline](./16-request-pipeline.md) — The full journey from HTTP request to HTML response.
- [Built-in Functions Reference](./17-functions-reference.md) — Every expression function with signatures and examples.
- [Configuration](./18-configuration.md) — `htx.config.json`, app config, environment variables, and secret management.
