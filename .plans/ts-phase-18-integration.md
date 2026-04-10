# Phase 18 — Integration Tests & Final Validation

**Status:** NOT STARTED
**Depends on:** All previous phases

## Objectives

Full integration testing of the complete pipeline — from HTTP request to rendered HTML response. Verify parity with the PHP test suite. Clean up, finalize exports, and validate the complete package.

## Scope

### Integration Tests

#### `packages/htx-engine/tests/integration/full-pipeline.test.ts`

End-to-end tests that wire everything together:

1. **Read pipeline (GET request):**
   - Create test SQLite database with known data
   - Create test `.htx` template files
   - Route a request → resolve template → parse DSL → query adapter → hydrate → verify HTML output
   - Test with: single record, list, empty results, dynamic route params, query params

2. **Mutation pipeline (POST request):**
   - Prepare phase: verify form HTML contains valid JWT token
   - Execute phase: submit form data with token → verify record created/updated/deleted
   - Verify replay prevention (resubmit same token → error)
   - Verify IDOR prevention (wrong recordId → error)

3. **Layout inheritance:**
   - Template in subdirectory inherits from `_layout.htx`
   - Content injected into layout at correct position

4. **Include resolution:**
   - Template with `<htx:include src="/partials/header.htx" />` → partial rendered inline (matches PHP [`IncludeResolver`](../../hypermedia-app-php/packages/htx-engine/src/Runtime/IncludeResolver.php))

5. **Component rendering:**
   - Template with `<htx:component src="components/card.htx" title="Hello">...</htx:component>` → component rendered with props (matches PHP [`ComponentResolver`](../../hypermedia-app-php/packages/htx-engine/src/Runtime/ComponentResolver.php))

6. **Expression evaluation in templates:**
   - All expression features working in full pipeline context
   - Functions, conditionals, loops, pipes, raw output

7. **Static file serving:**
   - Requests to `/public/style.css` serve file directly
   - Requests to `/public/script.js` serve file directly

8. **Error handling:**
   - Missing template → 404
   - Adapter error → 500 with error template
   - Malformed template → descriptive error

### Parity Validation

#### `packages/htx-engine/tests/integration/parity.test.ts`

Port EVERY assertion from the PHP test suite and verify identical behavior:
- Cross-reference PHP `ExpressionEngineTest.php` → TS expression tests
- Cross-reference PHP `ParserTest.php` → TS parser tests
- Cross-reference PHP `RouterTest.php` → TS router tests
- Cross-reference PHP `GetContentExecutorTest.php` → TS executor tests
- Cross-reference PHP `MutationExecutorTest.php` → TS mutation tests
- Cross-reference PHP `SecurityTest.php` → TS security tests
- Cross-reference PHP `RuntimePipelineTest.php` → TS resolver tests
- Cross-reference PHP `SQLiteAdapterTest.php` → TS adapter tests

Document any intentional behavioral differences (there should be very few).

### Final Cleanup

1. **Barrel exports** — verify `packages/htx-engine/src/index.ts` exports complete public API
2. **Package.json** — verify `main`, `types`, `exports` fields correct
3. **TypeScript compilation** — `bun build` or `tsc --noEmit` passes cleanly
4. **No `any` types** — audit for untyped code
5. **Consistent naming** — camelCase throughout (no PHP snake_case leftovers)
6. **README** — basic usage examples (if requested)

### Test Coverage Audit

Run all tests and verify:
- Total test count comparable to PHP suite (**282 tests, 535 assertions** in the reference PHP build)
- All modules have test coverage
- Edge cases covered

## Validation Checklist

- [ ] Full read pipeline works end-to-end
- [ ] Full mutation pipeline works end-to-end
- [ ] Layout inheritance works
- [ ] Includes work
- [ ] Components work
- [ ] All expression features work in pipeline context
- [ ] Static file serving works
- [ ] Error responses correct
- [ ] All PHP test assertions ported and passing
- [ ] No `any` types in codebase
- [ ] Barrel exports complete
- [ ] `bun test` passes with 0 failures
- [ ] Package installable as dependency

## Review Comments

_Reviewed by Claude after building the complete PHP implementation._

### Critical Dependency: RequestHandler Must Exist First

This phase tests the full pipeline, but the pipeline orchestrator (RequestHandler) isn't defined in any phase. The PHP build's RequestHandler was ~360 LOC and the most complex class in the system — it chains Router → IncludeResolver → ComponentResolver → LetResolver → DSLParser → Executors → ExpressionEngine → Hydrator → LayoutResolver. Without it, these integration tests have no entry point to test.

**Action:** Add a Phase 14.5 (or renumber) for the RequestHandler before this phase. Or include it at the beginning of Phase 18 with the understanding that it's both implementation and testing.

### PHP Parity: What We Learned

The PHP build finished with **282 tests, 535 assertions**. The TypeScript target of "380+ assertions" in the plan may be low. Key test areas that generated the most assertions:
1. Expression engine: ~130 assertions (functions alone accounted for 80+)
2. Router: ~30 assertions
3. Integration/RequestHandler: ~50 assertions (27 tests)
4. SQLite adapter: ~60 assertions (23 conformance + 11 specific)
5. Security: ~25 assertions
6. CLI: ~26 tests

### Integration Test: Token Extraction is Tricky

In the PHP build, extracting tokens from rendered mutation forms for the "prepare → execute" test cycle required a helper function that: (1) found the hidden input's `value` attribute with regex, (2) HTML-decoded the value, (3) JSON-decoded the result to extract the JWT. This was a significant source of test debugging. Document this pattern early and build a shared test helper.

### Bugs to Watch For (From PHP Experience)

1. **`stripMetaDirectives` regex bug:** The PHP version tried to use a backreference to a non-capturing group, causing `preg_replace` to return `null`. The TypeScript version should use per-directive explicit patterns instead of backreferences.
2. **Layout includes ordering:** Includes inside `_layout.htx` files must be expanded AFTER layout wrapping, not before. The PHP build had this bug — add a specific test for it.
3. **Mutation type passthrough:** Don't strip the `type` field from form data before passing to the executor — it needs it to determine the content type.

### "No `any` Types" Audit

The validation checklist says "no `any` types." This is aspirational but realistic if you start with `strict: true` in tsconfig. Use `unknown` instead of `any` for adapter return types and expression evaluation results. The compiler will force proper type narrowing at use sites.

### Package Installable as Dependency

The checklist says "package installable as dependency." Test this by creating a separate project that `bun add`s the packages and imports the public API. This catches issues with barrel exports, missing type declarations, and circular dependencies that don't surface during development.

## Execution Log

_(empty — not yet executed)_

## Independent review notes (2026-03)

- **RequestHandler**-level tests are prerequisites for meaningful HTTP integration; add a dedicated RequestHandler phase or fold handler implementation into this phase’s scope (see master plan review).
- Includes/components in integration scenarios must use **`<htx:include>`** / **`<htx:component>`** (updated above); parity targets **282 tests / 535 assertions** for the PHP reference, not an ad-hoc “380+” figure.
- Cross-reference PHP [`Integration/RequestHandlerTest.php`](../../hypermedia-app-php/Integration/RequestHandlerTest.php) when porting end-to-end cases.

## Port review addendum (2026-03-28)

- This phase currently carries too much hidden scope because it assumes a RequestHandler already exists. I would either add that phase earlier or redefine this phase as "RequestHandler plus integration parity" so the deliverable is honest.
- The first integration target should be PHP parity, not Bun-specific enhancements. Extra runtime polish is easier once the reference behavior is proven.
