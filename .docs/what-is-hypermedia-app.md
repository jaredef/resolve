Hypermedia App is a server-rendered web framework built on Bun and SQLite. It uses a declarative template engine — the HTX engine — that interprets `.htx` template files at request time without compiling them to JavaScript.

## How It's Different

Most web frameworks treat templates as code. JSX compiles to JavaScript functions. Svelte components compile to DOM operations. Even server-side template engines like Handlebars compile templates to JavaScript functions.

HTX doesn't. A `.htx` template is a text file that the engine reads, interprets, and renders to HTML — it never becomes JavaScript. This gives you:

- **Instant hot reload** — edit a template, refresh the browser, see the change. No build step.
- **Safe by design** — templates can't execute arbitrary code. The interpreter only supports expressions, conditionals, loops, and data access.
- **Simple mental model** — templates are HTML with data directives. What you write is what the browser gets.

For a deep technical explanation, see [How HTX Works](/docs/how-htx-works).

## The Stack

| Layer | Technology |
|-------|------------|
| **Runtime** | Bun (TypeScript → JavaScript at boot) |
| **Database** | SQLite (embedded, WAL mode) |
| **Templates** | `.htx` files (interpreted, never compiled) |
| **Interactivity** | htmx (HTML over the wire) |
| **Mutations** | JWT action tokens (CSRF protection) |

## Key Concepts

**Templates declare what data they need.** A template says "give me published posts" and the engine queries the database, iterates the results, and renders HTML.

```html
<htx:type>post</htx:type>
<htx:where>status=published</htx:where>
<htx>
<htx:each>
  <h2>__title__</h2>
  <p>__summary__</p>
</htx:each>
</htx>
```

**Modules extend the engine.** Adapters connect to data sources. Context providers pre-fetch data from any source. Middleware intercepts requests. All written in TypeScript, all compiled at boot. See [Architecture Overview](/docs/architecture-overview).

**No client-side framework.** Pages are server-rendered HTML. Interactivity comes from htmx — the server returns HTML fragments, htmx swaps them into the page. No React, no virtual DOM, no hydration.

## Getting Started

```bash
bun create hypermedia-app my-app
cd my-app
bun run dev
```

See the [Quick Start](/docs/quick-start) guide.
