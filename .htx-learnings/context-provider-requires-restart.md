# Context Providers Require Server Restart

## Problem

After adding a new context provider module (e.g., `ConvexStoreContextModule`) and updating templates to use expression-based iteration (`{{ each item in fp.collections }}`), the page renders an empty grid — no data appears.

## Root Cause

HTX templates are hot-reloaded on each request (the engine re-reads `.htx` files from disk), but **modules are only registered at server startup** during `RequestHandler` construction. When a new module is added to `index.ts`:

1. The template picks up `{{ each coll in fp.collections }}` immediately (hot-reload)
2. The `ConvexStoreContextModule.boot()` has NOT run (no restart)
3. `fp` is not in the data scope, so the expression evaluates over `undefined`
4. `{{ each }}` over `undefined` produces zero iterations — silent empty output

## Fix

Restart the server process after adding or modifying modules. Template changes are hot, but module registration is cold.

## Key Distinction

| Change Type | Hot-Reload? | Restart Needed? |
|---|---|---|
| Template `.htx` files | Yes | No |
| CSS / static assets | Yes | No |
| Context provider modules | No | Yes |
| Middleware modules | No | Yes |
| Adapter registration | No | Yes |
| `index.ts` entry point | No | Yes |

## Symptoms

- Template renders but data-driven sections are empty
- No error in the response (expression engine silently iterates zero times)
- Server console may show no error (the provider was never registered, so it's never called)
- `htx:rel` blocks in the SAME template still work (they go through the adapter registry, which WAS registered at startup)
