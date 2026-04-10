# Quick Start Guide

Get a working HTX application running in under a minute.

## Prerequisites

- [Bun](https://bun.sh/) v1.1 or later

## Create a New App

The fastest path is `bun create`:

```bash
bun create hypermedia-app my-app
cd my-app
bun install
bun run seed
bun run dev
```

This scaffolds a **showcase** project with a homepage, docs section, posts listing, admin CRUD flows, and seeded content. Open `http://localhost:3000` to see it running.

### Minimal Variant

If you want a leaner starting point:

```bash
bun create hypermedia-app my-app --minimal
cd my-app
bun install
bun run dev
```

The minimal variant gives you a root layout, two pages (home and about), shared navigation, and lightweight CSS. No seeded content, no admin, no docs section.

## Project Layout After Scaffolding

```
my-app/
  htx.config.json           # Project configuration
  package.json              # Dependencies and scripts
  app/
    config.ts               # Runtime configuration
    public/
      index.ts              # Bun.serve entrypoint
      css/style.css          # Styles
    templates/
      _layout.htx           # Root layout
      index.htx              # Homepage
      ...                    # More routes depending on variant
    data/
      .gitkeep               # SQLite database created at runtime
```

## Key Scripts

| Script | Purpose |
|--------|---------|
| `bun run dev` | Start the development server on port 3000 |
| `bun run serve` | Alias for `dev` |
| `bun run seed` | Seed the database with starter content (showcase only) |

## Adding a New Page

Create a new `.htx` file in `app/templates/`:

```html
<!-- app/templates/about.htx -->
<section>
  <h1>About Us</h1>
  <p>This page is available at /about.</p>
</section>
```

Save the file and visit `/about`. That's it — no route registration, no controller, no restart needed.

## Adding a Data-Driven Page

Create a page that queries content from the database:

```html
<!-- app/templates/articles/index.htx -->
<h1>Articles</h1>

<htx:type>article</htx:type>
<htx:where>status=published</htx:where>
<htx:order>newest</htx:order>
<htx:howmany>10</htx:howmany>
<htx>
<htx:each>
<article>
  <h2><a href="/articles/__slug__">__title__</a></h2>
  <p>__body__</p>
</article>
</htx:each>
<htx:none>
<p>No articles yet.</p>
</htx:none>
</htx>
```

The `<htx:type>` directive tells the runtime what content type to query. The `<htx:each>` block renders once per row. `__title__` and `__slug__` are replaced with values from each row.

## Adding a Dynamic Route

Use `[param]` in the filename for dynamic segments:

```html
<!-- app/templates/articles/[slug].htx -->
<htx:type>article</htx:type>
<htx:slug>{{ route.slug }}</htx:slug>
<htx>
<article>
  <h1>__title__</h1>
  <div>__body__</div>
</article>
</htx>
```

A request to `/articles/my-post` sets `route.slug` to `my-post`, queries the adapter for an article with that slug, and renders the result.

## Choosing an Adapter

HTX ships with two content adapters:

| Adapter | Config | Use Case |
|---------|--------|----------|
| `sqlite` (default) | `"adapter": "sqlite"` | Full CRUD apps with admin interfaces |
| `markdown` | `"adapter": "markdown"` | Docs, blogs, and content authored as flat files |

To use the markdown adapter, set your `htx.config.json`:

```json
{
  "adapter": "markdown",
  "contentRoot": "content"
}
```

Then create content files at `content/<type>/<slug>.md` with YAML front matter. See [Markdown Adapter](./19-markdown-adapter.md) for details.

## Next Steps

- Read [Routing](./04-routing.md) to understand how file paths map to URLs
- Read [Templates and the HTX DSL](./05-templates-and-dsl.md) to learn the full directive vocabulary
- Read [Expression Engine](./06-expression-engine.md) to see what's possible inside `{{ }}`
- Read [Forms and Mutations](./12-forms-and-mutations.md) to build admin flows
- Read [Markdown Adapter](./19-markdown-adapter.md) to serve content from flat files
