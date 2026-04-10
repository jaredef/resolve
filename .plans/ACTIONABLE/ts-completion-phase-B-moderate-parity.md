# Phase B — Fix Moderate Parity Gaps

**Status:** COMPLETE
**Depends on:** Phase A

## Objectives

Fix router validation strictness, improve error messages, and audit the nests parameter.

---

## 1. Router Dynamic Segment Validation

**PHP behavior:** Validates dynamic segments with regex: `/^\[([a-zA-Z_][a-zA-Z0-9_]*)\]\.htx$/`
This rejects `[123].htx`, `[foo bar].htx`, `[].htx`.

**Current TS behavior:** Uses `startsWith("[") && endsWith("].htx")` — accepts anything between brackets.

**Fix in `packages/htx-engine/src/runtime/router.ts`:**
Replace string-based checks with regex matching:
```typescript
const DYNAMIC_FILE_RE = /^\[([a-zA-Z_][a-zA-Z0-9_]*)\]\.htx$/;
const DYNAMIC_DIR_RE = /^\[([a-zA-Z_][a-zA-Z0-9_]*)\]$/;
```

Apply to both `matchDynamicFile` and `matchDynamicDirectory` methods.

**Tests to add:**
```
describe("Router rejects invalid dynamic segments")
  - [123].htx → not matched as dynamic route
  - [foo bar].htx → not matched as dynamic route
  - [].htx → not matched as dynamic route
  - [valid_name].htx → matched correctly
  - [camelCase].htx → matched correctly
```

---

## 2. Circular Include Error Messages

**PHP behavior:** Builds a chain of relative paths:
```
Circular include detected: partials/header.htx -> partials/nav.htx -> partials/header.htx
```

**Current TS behavior:** Simpler message without relative path formatting.

**Fix in `packages/htx-engine/src/runtime/include-resolver.ts`:**
In the circular detection branch, map each path in the stack to a relative path (relative to the template root), then join with ` -> ` and include the circular target at the end.

**Test to add:**
```
describe("IncludeResolver circular error shows path chain")
  - Create templates A includes B, B includes A
  - Verify error message contains "A -> B -> A" (relative paths)
```

---

## 3. Nests Parameter Audit

**Current state:** `GetContentExecutor.executeFromParsed()` accepts `nests` but does `void nests`.

**Action:** Read the PHP `GetContentExecutor.php` to determine if nests are actually used in the execution path.

**Possible outcomes:**
- If PHP also doesn't use nests in the executor (they're used elsewhere, like the RequestHandler or a different code path): document and close.
- If PHP uses nests for hierarchical data rendering: implement the same behavior.

**No test until audit determines the answer.**

---

## Validation

- [ ] Invalid dynamic segment names rejected by router
- [ ] Circular include errors show full relative path chain
- [ ] Nests parameter audited and either implemented or documented
- [ ] All existing tests still pass
- [ ] New tests pass

## Execution Log

- [x] Router: added `DYNAMIC_FILE_RE` and `DYNAMIC_DIR_RE` regex constants matching PHP strictness
- [x] Router: replaced `startsWith("[")` checks with regex validation in `findDynamicFile` and `walkSegments`
- [x] IncludeResolver: circular error now maps paths to relative (using `path.relative(siteRoot, p)`) and joins with ` -> `
- [x] Nests audit: PHP also accepts `$nests` but never uses it in execution — placeholder for future hierarchical data. TS behavior (`void nests`) is correct parity.
- [x] New test: Router rejects `[123].htx`, `[foo bar].htx`, `[].htx` as dynamic segments
- [x] Full suite: 75 pass, 1 pre-existing fail (consumer-install), 261 assertions
- [x] TypeScript strict-mode passes across all packages
