# Cross-Reference: Go Implementation → TypeScript v2 Improvements

**April 2026**

Findings from comparing the agent-built Go engine against the TypeScript v2 engine. Improvements identified through distillation of the Go agent's implementation decisions against the PRESTO style constraints.

---

## Critical Fixes for TypeScript v2

### 1. Layout Directive Must Be Extracted Before Stripping

**The bug:** `stripDirectives()` runs at stage 16, before `layout.wrap()` at stage 18. The `<htx:layout>` directive is stripped before the layout resolver can read it.

**Why Go caught it:** The Go agent, reasoning from the pipeline ordering constraints, realized the layout directive must survive stripping. It inserted an explicit extraction step before the stripping stage.

**Fix:** Extract the layout directive and store it before `stripDirectives()` runs. Pass the stored directive to `layout.wrap()`.

**Severity:** High. Any template using `<htx:layout src="...">` will silently fall back to the convention walk because the directive is stripped before it's read.

### 2. htx:raw Content Must Be Protected During Directive Stripping

**The bug:** `stripDirectives()` removes all `<htx:` tags indiscriminately. If a `<htx:raw>` block contains `<htx:data>` or `<htx:v>` as literal examples, those will be stripped even though they should be preserved as literal text.

**Why Go caught it:** The Go engine protects raw blocks during directive stripping using a placeholder strategy: replace raw blocks with markers, strip directives, restore raw blocks.

**Fix:** In `stripDirectives()`, protect `<htx:raw>` blocks before stripping, then restore them after.

**Severity:** Medium. Affects templates that show htx directive examples inside raw blocks (documentation pages, code samples).

---

## Improvements Inspired by Go Patterns

### 3. Typed DataContext

**Go pattern:** `type DataContext map[string]interface{}` with `Copy()` and `Merge()` methods.

**TS current:** Plain `Record<string, unknown>` with `Object.assign()`.

**Improvement:** Create a `DataContext` class or utility with explicit `copy()` and `merge()` methods. Improves readability and prevents accidental mutation of shared state.

### 4. Conditional Stage Execution

**Go pattern:** Every stage runs unconditionally. Simple, predictable.

**TS current:** Most stages have `if (content.includes("<htx:..."))` guards. Saves processing but adds complexity.

**Assessment:** The TS approach is correct for performance (skip regex scanning on content without matching directives). No change needed, but the guards should be consistent: either guard every stage or guard none.

### 5. Engine as Single Struct

**Go pattern:** One `Engine` struct holds all resolvers, config, and the pipeline. `ServeHTTP` is the single entry point.

**TS current:** `RequestHandler` holds all resolvers. `handle()` is the entry point.

**Assessment:** Equivalent. No change needed.

---

## Where TypeScript v2 is Superior

### 6. Error Handling

**TS strength:** Global try/catch around the pipeline, per-provider error isolation, dev mode error pages with stack traces and template paths.

**Go gap:** No error recovery at pipeline level. Template errors crash the request.

**Assessment:** TS error handling is exemplary. No change needed. The Go implementation should learn from TS here.

### 7. Async Context Provider Safety

**TS strength:** Each context provider is wrapped in try/catch with fallback to empty object. One provider failing doesn't break the page.

**Go:** Synchronous, no isolation.

**Assessment:** TS is correct. No change needed.

### 8. Module Boot Error Isolation

**TS strength:** try/catch around each module's `boot()` call. One module crashing doesn't prevent others from booting.

**Go:** defer/recover (equivalent, different idiom).

**Assessment:** Both correct. Different idioms, same behavior.

---

## Summary: Changes to Apply to TypeScript v2

| Priority | Change | Source |
|----------|--------|--------|
| HIGH | Extract layout directive before stripDirectives() | Go agent discovery |
| MEDIUM | Protect htx:raw blocks during directive stripping | Go agent pattern |
| LOW | Consider typed DataContext utility | Go idiom |
