# Phase 15 — Executors: SetContentExecutor & DeleteContentExecutor

**Status:** NOT STARTED
**Depends on:** Phase 12 (Security), Phase 14 (GetContentExecutor)

## Objectives

Port the two mutation executors — SetContent (create/update) and DeleteContent (delete). Both use the two-phase prepare/execute pattern with JWT action tokens.

## Source Reference

- **PHP source:** `packages/htx-engine/src/Executors/SetContentExecutor.php` (~193 LOC)
- **PHP source:** `packages/htx-engine/src/Executors/DeleteContentExecutor.php`

## Files to Create

### `packages/htx-engine/src/executors/set-content-executor.ts`

**Two-phase pattern:**

**Phase 1 — `prepare()`:**
1. Parse DSL template
2. Determine action context from meta (`create:post`, `update:post`)
3. Issue JWT via ActionTokenService (includes context, recordId, tenantId)
4. Inject token into the form template (replace `__htx_token__` placeholder)
5. Render and return the HTML form

**Phase 2 — `execute()`:**
1. Extract token from submitted form data
2. Validate token (signature, expiry, tenant, context, recordId)
3. Check replay guard (is JTI already used?)
4. Mark JTI as used in replay guard
5. Call `adapter.create()` or `adapter.update()` with form data
6. Render response template:
   - Success → `<htx:responsesuccess>` template
   - Error → `<htx:responseerror>` template
   - Redirect → `<htx:responseredirect>` URL (return redirect response)

**Constructor dependencies:**
```typescript
class SetContentExecutor {
  constructor(
    private parser: DSLParser,
    private adapter: ContentAdapter,
    private hydrator: Hydrator,
    private expressionEngine: ExpressionEngine,
    private tokenService: ActionTokenService,
    private replayGuard: ReplayGuard,
  )

  prepare(templateSource: string, context: ExecutionContext): string
  execute(templateSource: string, formData: Record<string, unknown>, context: ExecutionContext): HtxResponse
}
```

**Note on async:** `ActionTokenService.issue()` and `.validate()` use `jose` which is async. This means `prepare()` and `execute()` will be `async` methods. This is acceptable — mutations are infrequent compared to reads, and the async boundary stays at the executor level.

### `packages/htx-engine/src/executors/delete-content-executor.ts`

Same two-phase pattern as SetContent but simpler:
- `prepare()` — render confirmation form with token
- `execute()` — validate token, call `adapter.delete()`, render response

### Barrel export — `packages/htx-engine/src/executors/index.ts`

## Files to Create (Tests)

### `packages/htx-engine/tests/mutation-executor.test.ts`

Port from PHP `MutationExecutorTest.php`:

**SetContent tests:**
- Prepare phase renders form with token
- Execute phase creates record on valid token
- Execute phase updates record on valid token
- Expired token → error response
- Replayed token → error response
- Wrong context → error response
- Wrong recordId → error response
- Success response template rendered
- Error response template rendered
- Redirect response returned

**DeleteContent tests:**
- Prepare phase renders confirmation with token
- Execute phase deletes record on valid token
- Expired/replayed/wrong context → error response
- Success response after deletion

**Test setup:** InMemoryAdapter + InMemoryReplayGuard + real ActionTokenService with test secret.

## Validation

- [ ] Prepare phase produces valid HTML with embedded token
- [ ] Execute phase validates token correctly
- [ ] Replay prevention works
- [ ] IDOR prevention works (recordId binding)
- [ ] Success/error/redirect responses rendered correctly
- [ ] All tests pass

## Review Comments

_Reviewed by Claude after building the complete PHP implementation._

### Async Propagation: Accept It

Both `prepare()` and `execute()` are async because of `jose`. The plan acknowledges this ("mutations are infrequent compared to reads, and the async boundary stays at the executor level"). This is the right tradeoff. However, be explicit that the RequestHandler's `handle()` method will need to be `async` because of this — or alternatively, make only the mutation path async with a type-level split:

```typescript
handle(request: HtxRequest): HtxResponse | Promise<HtxResponse>
```

### Token Injection: Be Specific About the Mechanism

The plan says "replace `__htx_token__` placeholder." In the PHP build, the token was injected differently — it was embedded as a JSON-encoded value in a hidden form field's `value` attribute, which required HTML entity encoding. The extraction in tests required `html_entity_decode()` + `json_decode()`. Document the exact injection format:

```html
<input type="hidden" name="__htx_token" value="eyJhbGciOi..." />
```

This detail matters because it affects both the prepare phase (how the token is injected) and the execute phase (how the token is extracted from form data).

### `HtxResponse` for Mutations: Needs Redirect Support

The plan mentions `<htx:responseredirect>` returning a redirect response. Make sure `HtxResponse` supports this:

```typescript
// Redirect response
{ status: 302, headers: { 'Location': '/blog/new-post' }, body: '' }
```

The PHP build added static factory methods: `Response.redirect(url)`, `Response.notFound()`, `Response.error(message)`. These were very convenient — replicate them.

### Missing: Form Data Validation

The plan doesn't mention validating form data before creating/updating records. In the PHP build, the executor passed form data directly to the adapter. Consider whether the executor should strip internal fields (`__htx_token`, `_method`, etc.) before passing to the adapter. The PHP build had a bug where the `type` field was being stripped from form data — document this pitfall.

### IDOR Prevention: Good

The recordId binding in the JWT token prevents IDOR attacks. This was one of the key security features tested in the PHP build. Make sure the test covers: (a) token issued for record 1, submitted for record 2 → rejection, and (b) token issued without a recordId, submitted with a recordId → rejection.

## Execution Log

_(empty — not yet executed)_

## Independent review notes (2026-03)

- Align **hidden field name**, **encoding**, and **extraction** of `__htx_token` (or PHP equivalent) with the reference PHP prepare/execute flow so tests and browsers behave identically.

## Port review addendum (2026-03-28)

- This phase needs one exact, end-to-end example of prepare and execute using real field names and token payload expectations. Right now the intent is clear, but the browser-facing details are still a little too implicit.
- I would also make payload normalization explicit here: strip only HTX internals, and preserve user/domain fields unless PHP proves otherwise.
