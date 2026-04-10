# Phase A — Fix Critical Parity Gaps

**Status:** COMPLETE
**Depends on:** Nothing

## Objectives

Fix the four behavioral differences that could cause production failures or data inconsistency.

---

## 1. Per-Row Error Tolerance in GetContentExecutor

**PHP behavior (GetContentExecutor.php ~line 178):**
```php
foreach ($rows as $index => $row) {
    try {
        // ... evaluate and hydrate row ...
        $itemsHtml .= $rendered;
    } catch (\Throwable $e) {
        error_log('[HTX] Row render error: ' . $e->getMessage());
        continue;
    }
}
```

**Current TS behavior:** No try-catch — one bad row throws and kills the entire `<htx:each>` output.

**Fix in `packages/htx-engine/src/executors/get-content-executor.ts`:**
Wrap the `.map()` callback in the `hydrateWithData` method (around lines 117-131) in a try-catch that logs the error and returns an empty string for that row.

**Test to add:**
```
describe("GetContentExecutor per-row fault tolerance")
  - Create adapter data where one row has a field that causes an expression error
  - Verify that the other rows still render
  - Verify the bad row is silently skipped (or renders empty)
```

---

## 2. Layout File Read Error Handling

**PHP behavior (LayoutResolver.php ~line 44):**
```php
$layoutContent = file_get_contents($layoutPath);
if ($layoutContent === false) {
    continue;  // Skip unreadable layout, don't crash
}
```

**Current TS behavior:** `readFileSync()` throws on unreadable files — entire request crashes.

**Fix in `packages/htx-engine/src/runtime/layout-resolver.ts`:**
Wrap `readFileSync()` calls in try-catch blocks. On failure, skip that layout and continue.

**Test to add:**
```
describe("LayoutResolver missing file resilience")
  - Set up a layout chain where one file doesn't exist
  - Verify the resolver skips it and continues with remaining layouts
```

---

## 3. Error Logging in RequestHandler

**PHP behavior:** `error_log('[HTX] Request handler error: ' . $e->getMessage())` before returning error response.

**Current TS behavior:** Silently constructs error response without logging.

**Fix in `packages/htx-engine/src/runtime/request-handler.ts`:**
Add `console.error("[HTX]", message)` in the catch block of `handle()` (line 131) and in `handleMutationExecute()` (line 308).

**No new test needed** — this is logging behavior, not output behavior.

---

## 4. Document UTC Timestamp Decision

**PHP behavior:** `date('Y-m-d H:i:s')` — uses server's local timezone.
**TS behavior:** `new Date().toISOString().slice(0, 19).replace("T", " ")` — always UTC.

**Decision:** TS is correct. UTC is the right default for a database-first framework. PHP was inconsistent (timezone depended on server config).

**Fix:** Add a comment in `packages/htx-adapter-sqlite/src/sqlite-adapter.ts` at the `timestampNow()` function documenting this as an intentional deviation. Update parity matrix.

---

## Validation

- [ ] Per-row error in `<htx:each>` doesn't crash the loop
- [ ] Missing layout file doesn't crash the request
- [ ] Error catch blocks log to console.error
- [ ] UTC timestamp documented as intentional
- [ ] All existing tests still pass
- [ ] New tests pass

## Execution Log

- [x] Per-row try-catch added to GetContentExecutor `hydrateWithData` — logs error, returns empty string, continues loop
- [x] Layout resolver: wrapped all `readFileSync` calls in try-catch across `wrap()`, `collectLayoutsChained()`, and `collectLayouts()` — unreadable layouts are skipped
- [x] RequestHandler: added `console.error("[HTX]...")` in both `handle()` and `handleMutationExecute()` catch blocks
- [x] SQLiteAdapter: added JSDoc comment on `timestampNow()` documenting UTC as intentional deviation from PHP
- [x] New test: GetContentExecutor continues rendering when a row causes an error (8 tests pass, 21 assertions)
- [x] New test: LayoutResolver skips unreadable layout files gracefully (7 tests pass, 26 assertions)
- [x] Full suite: 74 pass, 1 pre-existing fail (consumer-install), 259 assertions
- [x] TypeScript strict-mode passes across all packages

### Post-Review Fix

Code review caught an infinite loop bug in `collectLayoutsChained()`: the `catch { continue; }` would restart the `while(true)` loop without advancing `relativeDir`, hanging forever on unreadable chained layouts. Fix: removed `continue` so execution falls through to the directory-walking logic. Added test: "layout resolver chained mode skips unreadable layouts and keeps walking upward."
