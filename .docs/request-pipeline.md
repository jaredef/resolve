Every HTTP request passes through a 20-step pipeline in the RequestHandler. Understanding this order is essential for debugging template behavior.

## The Pipeline

1. **Parse request** — Extract method, path, headers, body, query params, cookies
2. **Middleware chain** — Run module middleware. Short-circuit if response returned.
3. **Route resolution** — File-system router matches URL to .htx template. 404 if no match.
4. **Template read** — Load .htx file from disk
5. **Include expansion** — Expand `<htx:include>` directives (recursive)
6. **Auth resolution** — Call `authProvider.resolve()`, inject `auth` context
7. **Auth redirect** — Check `<htx:auth redirect="">`, return 302 if unauthenticated
8. **Auth blocks** — Strip `<htx:auth>` or `<htx:auth-none>` based on auth state
9. **Module context** — Call all registered context providers, inject into data
10. **Component resolution** — Replace `<htx:component>` with slot content
11. **Let resolution** — Process `<htx:let>` variable definitions
12. **Block pass** — Parse and render `<htx:type>...<htx>...</htx>` blocks (queries, mutations)
13. **Mutation handling** — If POST with htx-token and no blocks, execute standalone mutation
14. **Expression evaluation** — Evaluate all remaining `{{ }}` expressions
15. **Hydration** — Replace `__placeholder__` tokens with data values
16. **Meta stripping** — Remove leftover `<htx:type>`, `<htx:where>`, etc.
17. **Layout wrapping** — Apply `_layout.htx` (skipped for htmx requests)
18. **Post-layout auth** — Re-check auth redirect for directives in layout
19. **Post-layout blocks** — Second block pass for blocks in layout includes
20. **Finalization** — Strip `<htx:raw>`, unescape backslash markers, check redirect markers

## Key Implications

**Templates read from disk on every request.** Changes to .htx files take effect immediately. No restart needed.

**Module code compiles once at startup.** Changes to context providers, middleware, or adapters require a server restart.

**Expression evaluation runs twice** — once after the initial block pass, once after layout wrapping. This means expressions in layout files work correctly.

**The hydrator runs after expressions.** Placeholders (`__title__`) are resolved after expressions (`{{ title }}`). Both access the same data context.

**htmx requests skip the layout.** When the `HX-Request` header is present, step 17 is skipped. The response is content-only — smaller and faster for fragment swaps.
