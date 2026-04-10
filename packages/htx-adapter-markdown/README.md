# @htx/adapter-markdown

Read-only markdown file adapter for the Bun + TypeScript HTX stack.

## Purpose

This adapter lets HTX read content from a filesystem tree instead of SQLite.
It is designed for blog, docs, and marketing-style content where markdown files
are the source of truth and runtime writes are not needed.

## Directory Layout

```text
content/
  post/
    hello-world.md
  page/
    about.md
```

- `type` maps to the top-level directory under `content/`
- `slug` comes from front matter `slug`, otherwise the filename
- `id` comes from front matter `id`, otherwise `${type}:${slug}`

## Front Matter

The adapter supports simple YAML-style front matter:

```md
---
title: Hello World
status: published
category: tech
created_at: 2026-03-29 12:00:00
---
This is **markdown** content.
```

Supported scalar parsing in v1:

- strings
- booleans
- numbers
- `null`
- simple inline arrays like `[docs, featured]`

## Row Shape

Rows align with the HTX read pipeline and include:

- `id`
- `type`
- `slug`
- `title`
- `body`
- `body_html`
- `status`
- `created_at`
- `updated_at`

Any extra front matter keys are merged onto the returned row.

## Read Semantics

Implemented:

- `query`
- `find`
- `findBySlug`
- `schema` returning `null`

Read-path behavior mirrors the SQLite adapter where practical for:

- `slug`
- `where`
- `order`
- `howmany`
- `offset`

This package is intentionally read-only:

- `create` throws
- `update` throws
- `delete` throws

## CLI Usage

Set these values in `htx.config.json`:

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

Then run:

```bash
bun run dev
```

The HTX CLI will serve templates from `app/templates` and content from `content/`.
For mixed projects, keep SQLite as `adapters.default` and add a type-specific markdown override such as `"documentation"`.
