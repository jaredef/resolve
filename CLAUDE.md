# CLAUDE.md — hypermediaapp.org

## Repository

https://github.com/hypermediacms/hypermediaapp.org

## Phased Planning & Execution Loop

All significant work follows a phased planning and execution loop, tracked in `/.plans/`:

1. **Master plan**: Write a markdown file at `/.plans/{feature}-plan.md` with all phases listed (status: NOT STARTED)
2. **Phase planning**: For each phase, create `/.plans/{prefix}-phase-{n}-{name}.md` with objectives, files to modify, and an execution log
3. **Execute**: Implement the phase, run tests, validate
4. **Update**: Mark the phase doc as COMPLETE, fill in the execution log with what was done
5. **Commit**: `git add -A && git commit && git push` after each phase completes
6. **Notify**: Push a status update to Telegram at each phase boundary
7. **Repeat**: Move to the next phase and repeat steps 2-6
8. **Final review**: After all phases complete, run full test suite, validate all templates, update the GitHub issue with detailed implementation reference

Plans live in `/.plans/` and are committed to the repo. Each plan doc has a `**Status:**` field (NOT STARTED / IN PROGRESS / COMPLETE) and an `## Execution Log` section with checkboxes.

## What This Is

This is the public-facing site for Hypermedia App (the HTX engine SDK). It's a fork of `hypermedia-app-ts` from the `hypermediacms/hypermedia-app` repo, customized with branding, documentation content, and the Intercooler-style dark theme.

## Upstream Sync

This site syncs code from `hypermedia-app/hypermedia-app-ts` but has local customizations that must NOT be overwritten.

**To sync upstream changes:**
```bash
rsync -av --exclude-from=.local-overrides --exclude='.git' --exclude='node_modules' --exclude='app/data' \
  /home/jaredef/hypermedia-app/hypermedia-app-ts/ \
  /home/jaredef/hypermediaapp.org/
```

**Protected files** (listed in `.local-overrides`):
- `app/templates/_layout.htx` — branding: `<htx> Hypermedia App`, title, footer
- `app/templates/index.htx` — hero with gradient text, 6 feature cards, benchmark stats
- `app/templates/partials/_nav.htx` — nav links (Docs, Blog, GitHub)
- `app/templates/partials/_footer.htx` — footer text
- `app/public/css/style.css` — Intercooler-style dark theme CSS
- `app/data/` — SQLite database with 20 docs + benchmark blog post

**Never overwrite these during sync.** If the upstream layout changes structurally, merge manually.

## Running

```bash
HTX_HOST=0.0.0.0 HTX_PORT=3000 bun app/public/index.ts
```

Live at https://app.hypermediadocs.com via Cloudflare Tunnel (port 3000).

## Content

Content is in SQLite at `app/data/database.sqlite`. The cmark-gfm C library renders markdown → HTML at write time (stored as `body_html` in the meta JSON column).

**To add/update docs:** Use the SQLite adapter which auto-renders markdown:
```typescript
import { SQLiteAdapter } from "./packages/htx-adapter-sqlite/src/index.ts";
const adapter = new SQLiteAdapter("app/data/database.sqlite");
adapter.create("documentation", { title, slug, body, status: "published", section, ... });
```

**To re-render all docs** (if body_html is missing):
```bash
bun -e 'import Database from "bun:sqlite"; import { spawnSync } from "bun"; ...'
```
See the renderMarkdown pattern in the sqlite-adapter.

## Sections

Docs are organized by section (matches the index.htx template queries):
- `getting-started` — What Is, Project Structure, Quick Start
- `core-concepts` — Routing, Templates, Expression Engine, Literal Syntax, etc.
- `building-pages` — Layouts, Hydrator, Forms, Security
- `operations` — CLI, Create App, Request Pipeline, Configuration

## Markdown Rendering

Uses `cmark-gfm` (C library) via `Bun.spawnSync()` at write time:
- GFM tables, autolinks, raw HTML supported
- HTX syntax inside `<code>` blocks is auto-escaped (backslash prefix) to prevent the Hydrator from replacing it
- Zero runtime cost for reads — body_html is pre-rendered

**System dependency:** `sudo apt install cmark-gfm`

**IMPORTANT: Escaping `__placeholder__` in documentation content.** When writing docs that show HTX placeholder syntax (`__title__`, `__payload__`, etc.) in code examples, the Hydrator will eat them. After rendering markdown to HTML with cmark-gfm, post-process the body_html to escape underscores with HTML entities:

```typescript
bodyHtml = bodyHtml.replace(/__([a-zA-Z_]+)__/g, '&#95;&#95;$1&#95;&#95;');
```

Do NOT use backslash escaping (`\__payload__`) — it doesn't work for placeholder hydration. See `.htx-learnings/placeholder-escaping-in-docs.md` for details.

## Cloudflare Tunnel

Config at `/home/jaredef/.cloudflared/hypermediadocs.yml`:
- `app.hypermediadocs.com` → port 3000 (this site)
- DNS CNAME: `app` → tunnel UUID `.cfargotunnel.com`
