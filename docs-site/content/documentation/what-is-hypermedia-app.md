---
title: What Is Hypermedia App?
status: published
section: getting-started
section_label: Getting Started
summary: The model, the philosophy, and what problems it solves.
created_at: 2026-03-28 00:01:00
---

Hypermedia App is a full-stack application model built around `.htx` files, file-system routing, and adapter-backed content. Instead of wiring controllers, serializers, and separate view layers, you define routes with templates. Those templates can query content, render lists and single records, and prepare secure mutation flows — all in one readable file.

## The Core Idea

A single `.htx` file is a route. It declares what content it needs, how to render it, and what mutations it supports. The runtime handles everything else: routing the request, querying the adapter, hydrating data into templates, wrapping layouts, and securing writes.

```html
<htx:type>post</htx:type>
<htx:slug>\{{ route.slug }}</htx:slug>
<htx>
<article>
  <h1>__title__</h1>
  <div>__body__</div>
</article>
</htx>
```

That file placed at `app/templates/blog/[slug].htx` handles `/blog/my-post`. The runtime resolves the route, queries the adapter for a post with that slug, and renders HTML.

## Design Principles

**The adapter is the source of truth.** There is no build step that compiles content. The adapter queries live data on every request — whether that data lives in SQLite, a filesystem of markdown files, or any other backing store.

**Reads are cheap.** No tokens, no security ceremony, one hop to the adapter. A listing page or detail page is a single file with a couple of directives.

**Mutations are two-phase.** When a page prepares a form, the runtime injects a signed JWT payload. When the form submits, the runtime validates that payload before applying the mutation. This is CSRF-proof by design and prevents replay attacks. (Read-only adapters like the markdown adapter simply skip mutation support.)

**The engine has no opinion about your backend.** Implement the `ContentAdapter` interface (7 methods) and any data source works — SQLite, Postgres, a REST API, a directory of markdown files, or an in-memory store for testing.

**Zero framework dependencies.** The TypeScript implementation uses `Bun.serve()` directly, `bun:sqlite` for the reference adapter, and `jose` for JWT operations. No Express, no Hono, no ORM.

**Templates are the application.** There is no separate controller layer. Business logic that goes beyond what templates express belongs in middleware or modules, not in the template engine itself.

## What It Is Not

Hypermedia App is not a static site generator. It does not pre-render pages or compile templates at build time. Every request is handled at runtime.

It is not a single-page application framework. It renders full HTML documents on the server side. You can progressively enhance with htmx or similar libraries, but the baseline is server-rendered HTML.

It is not a general-purpose backend framework. It is specifically designed for content-driven applications where routes map to templates and templates map to data queries.

## Adapters

Out of the box, two adapters are provided:

- **SQLite adapter** (`@htx/adapter-sqlite`) — Full read/write adapter using `bun:sqlite` with WAL mode, JSON meta column, auto-schema discovery, and slug generation. Ideal for applications that need CRUD operations.

- **Markdown adapter** (`@htx/adapter-markdown`) — Read-only adapter that indexes a directory of markdown files with YAML front matter. Content is organized as `content/<type>/<slug>.md`. Ideal for documentation sites, blogs, and any content authored as flat files. Mutations are not supported — `create()`, `update()`, and `delete()` throw errors.

The adapter is selected in `htx.config.json`:

```json
{
  "adapter": "sqlite",
  "databasePath": "app/data/database.sqlite"
}
```

```json
{
  "adapter": "markdown",
  "contentRoot": "content"
}
```

Both adapters implement the same 7-method `ContentAdapter` interface, so templates work identically regardless of which adapter is active. See [Content Adapter Contract](./09-content-adapter.md) for the full interface.

## TypeScript Port

This implementation is a direct port of the original PHP codebase to TypeScript, targeting the Bun runtime. The architecture, contracts, and template semantics are preserved, with these intentional differences:

- **UTC timestamps everywhere** instead of server-local timezone
- **Async mutation boundary** because the `jose` JWT library requires it (reads remain synchronous)
- **Explicit path traversal protection** in the router via `isWithinRoot()` checks
- **Dynamic `recordId` expressions** evaluated during request handling
