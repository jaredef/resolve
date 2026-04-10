# Phase 15 — Dogfood App Port

**Status:** COMPLETE

## Objective

Port the PHP reference application so the TypeScript engine is exercised by a real app with public pages, admin flows, layouts, includes, and components.

## Source of truth

- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/app/public/index.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/app/config.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/app/public/css/style.css`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/app/templates/`

## Target TS files

- `hypermedia-app-ts/app/config.ts`
- `hypermedia-app-ts/app/public/index.ts`
- `hypermedia-app-ts/app/public/css/style.css`
- `hypermedia-app-ts/app/templates/_layout.htx`
- `hypermedia-app-ts/app/templates/admin/_layout.htx`
- `hypermedia-app-ts/app/templates/admin/index.htx`
- `hypermedia-app-ts/app/templates/admin/posts/[id]/delete.htx`
- `hypermedia-app-ts/app/templates/admin/posts/[id]/edit.htx`
- `hypermedia-app-ts/app/templates/admin/posts/index.htx`
- `hypermedia-app-ts/app/templates/admin/posts/new.htx`
- `hypermedia-app-ts/app/templates/blog/[slug].htx`
- `hypermedia-app-ts/app/templates/blog/index.htx`
- `hypermedia-app-ts/app/templates/components/card.htx`
- `hypermedia-app-ts/app/templates/index.htx`
- `hypermedia-app-ts/app/templates/partials/_footer.htx`
- `hypermedia-app-ts/app/templates/partials/_nav.htx`

## Implementation steps

1. Port the app bootstrap and config shape from PHP into Bun/TS conventions.
2. Port public pages first: root layout, partials, home page, and blog listing/detail pages.
3. Port shared components and verify slot/props behavior in the app context.
4. Port admin layout and admin listing pages.
5. Port admin mutation templates last: create, edit, and delete flows.
6. Reuse the same engine and SQLite adapter wiring that CLI and integration tests use.

## Acceptance gates

- The app serves static assets and template routes through the real handler path.
- Public read pages render correctly before admin mutations are attempted.
- Nested admin layout behavior matches PHP.
- Admin create, update, and delete flows work end to end with token-based mutation handling.

## Tests to port

- Request handler integration cases covering app templates
- Manual or automated smoke tests for home, blog, admin list, admin create, admin edit, and admin delete
- Layout/include/component behavior exercised through real app templates

## Known risks

- Porting mutation pages before the underlying runtime path is ready
- Treating the app as static template copy instead of a runtime validation surface
- Failing to verify nested layouts and HTMX partial behavior in the real app

## Execution log

- [x] App bootstrap ported
- [x] Public templates ported
- [x] Components and partials ported
- [x] Admin templates ported
- [x] End-to-end app flows validated
