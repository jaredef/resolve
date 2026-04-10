Get a Hypermedia App running in 30 seconds.

## Prerequisites

- [Bun](https://bun.sh) 1.x or later
- `cmark-gfm` for markdown rendering: `sudo apt install cmark-gfm`

## Create a New App

```bash
bun create hypermedia-app my-app
cd my-app
bun run dev
```

The dev server starts on `http://localhost:3000`.

## Project Structure

```
my-app/
  app/
    templates/        # .htx template files
      _layout.htx     # Site layout (nav, footer)
      index.htx       # Home page
      docs/
        index.htx     # Docs listing
        [slug].htx    # Single doc page
    public/           # Static assets (CSS, JS, images)
    data/
      database.sqlite # Content database
  packages/
    htx-engine/       # The template engine
    htx-adapter-sqlite/  # SQLite content adapter
```

## Your First Template

Create `app/templates/hello.htx`:

```html
<h1>Hello, HTX!</h1>
<p>This page was rendered at {{ "now" | format_date : "Y-m-d H:i:s" }}.</p>
```

Visit `http://localhost:3000/hello` to see it.

## Query Content

```html
<htx:type>post</htx:type>
<htx:where>status=published</htx:where>
<htx:order>newest</htx:order>
<htx>
<htx:each>
  <article>
    <h2><a href="/posts/__slug__">__title__</a></h2>
    <p>__summary__</p>
  </article>
</htx:each>
<htx:none>
  <p>No posts yet.</p>
</htx:none>
</htx>
```

The engine queries SQLite, iterates results, hydrates placeholders, and returns HTML. No API layer, no client-side rendering.

## Add Content

```typescript
import { SQLiteAdapter } from "@htx/adapter-sqlite";
const adapter = new SQLiteAdapter("app/data/database.sqlite");

adapter.create("post", {
  title: "My First Post",
  slug: "my-first-post",
  body: "Hello world in **markdown**.",
  status: "published",
});
```

The adapter auto-renders markdown to `body_html` via cmark-gfm.

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `HTX_HOST` | `127.0.0.1` | Bind address |
| `HTX_PORT` | `3000` | Listen port |
| `HTX_SECRET_KEY` | dev default | JWT signing key for action tokens |
