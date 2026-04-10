# Phase 06 — Router And Template Resolution

**Status:** IN PROGRESS

## Objective

Port file-system routing, excluded path handling, dynamic/catch-all matching, and multi-root template resolution behavior.

## Source of truth

- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/src/Runtime/Router.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/src/Runtime/TemplateResolver.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/tests/RouterTest.php`

## Target TS files

- `hypermedia-app-ts/packages/htx-engine/src/runtime/template-resolver.ts`
- `hypermedia-app-ts/packages/htx-engine/src/runtime/router.ts`
- `hypermedia-app-ts/packages/htx-engine/tests/router.test.ts`

## Implementation steps

1. Port URL normalization and route exclusion rules for underscore-prefixed files, `partials/`, and `public/`.
2. Port exact file matching, directory `index.htx` matching, dynamic segment matching, and catch-all slug collapsing.
3. Port `TemplateResolver` so route resolution can search multiple template roots in order.
4. Add path traversal hardening so route resolution never escapes the configured roots.
5. Keep static-file bypass outside the router; document that the HTTP host handles that in Phase 12.

## Acceptance gates

- PHP route cases pass for exact, index, dynamic, and catch-all routes.
- Multi-root lookup works with the same priority semantics as PHP.
- Excluded paths never resolve.
- Traversal attempts fail safely.

## Tests to port

- `RouterTest.php`
- Catch-all slug cases such as nested docs-style paths
- Excluded path cases for `_layout`, `partials`, and `public`
- Multi-root resolution cases

## Known risks

- Reducing the router to a single-directory matcher
- Mixing static-file serving into route resolution
- Missing catch-all behavior that only shows up in nested content paths

## Execution log

- [x] TemplateResolver ported
- [x] Router exact/index/dynamic logic ported
- [x] Catch-all logic ported
- [x] Traversal hardening added
- [x] Router parity tests passing
- [ ] Full PHP router parity sweep still pending
