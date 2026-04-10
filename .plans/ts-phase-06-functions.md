# Phase 6 — Function Registry & Built-in Functions

**Status:** NOT STARTED
**Depends on:** Phase 5 (Evaluator)

## Objectives

Port the FunctionRegistry and all four built-in function modules (String, Array, Date, Number) to TypeScript. 50+ functions total.

## Source Reference

- **PHP source:** `packages/htx-engine/src/Expressions/FunctionRegistry.php` (~42 LOC)
- **PHP source:** `packages/htx-engine/src/Expressions/Functions/StringFunctions.php`
- **PHP source:** `packages/htx-engine/src/Expressions/Functions/ArrayFunctions.php`
- **PHP source:** `packages/htx-engine/src/Expressions/Functions/DateFunctions.php`
- **PHP source:** `packages/htx-engine/src/Expressions/Functions/NumberFunctions.php`

## Files to Create

### `packages/htx-engine/src/expressions/function-registry.ts`

Simple map of name → function:

```typescript
type ExpressionFunction = (...args: unknown[]) => unknown

class FunctionRegistry {
  private functions: Map<string, ExpressionFunction>
  register(name: string, fn: ExpressionFunction): void
  call(name: string, args: unknown[]): unknown
  has(name: string): boolean
  registerDefaults(): void  // registers all built-in functions
}
```

### `packages/htx-engine/src/expressions/functions/string-functions.ts`

Port all string functions. Key mappings:
| PHP Function | TS Implementation |
|---|---|
| `truncate(str, len, suffix)` | `str.slice(0, len) + suffix` |
| `split(str, delimiter)` | `str.split(delimiter)` |
| `join(arr, delimiter)` | `arr.join(delimiter)` |
| `trim(str)` | `str.trim()` |
| `uppercase(str)` | `str.toUpperCase()` |
| `lowercase(str)` | `str.toLowerCase()` |
| `capitalize(str)` | Custom (first char upper) |
| `replace(str, search, repl)` | `str.replaceAll(search, repl)` |
| `contains(str, sub)` | `str.includes(sub)` |
| `starts_with(str, prefix)` | `str.startsWith(prefix)` |
| `length(str)` | `str.length` |
| `default(val, fallback)` | `val ?? fallback` (or truthy check) |
| `slug(str)` | Custom slugify |
| `prepend(str, prefix)` | `prefix + str` |
| `append(str, suffix)` | `str + suffix` |
| `nl2br(str)` | `str.replace(/\n/g, '<br>')` |
| `md(str)` | `marked.parse(str)` — uses `marked` dependency |
| `match(str, pattern)` | `new RegExp(pattern).test(str)` |
| `regex(str, pattern, repl)` | `str.replace(new RegExp(pattern, 'g'), repl)` |
| `regex_capture(str, pattern)` | `str.match(new RegExp(pattern))` |
| `coalesce(...vals)` | First non-null/undefined value |

### `packages/htx-engine/src/expressions/functions/array-functions.ts`

Port all array functions:
| PHP Function | TS Implementation |
|---|---|
| `first(arr)` | `arr[0]` |
| `last(arr)` | `arr[arr.length - 1]` |
| `reverse(arr)` | `[...arr].reverse()` |
| `keys(obj)` | `Object.keys(obj)` |
| `values(obj)` | `Object.values(obj)` |
| `merge(a, b)` | `[...a, ...b]` or `{ ...a, ...b }` |
| `chunk(arr, size)` | Custom chunking |
| `unique(arr)` | `[...new Set(arr)]` |
| `flatten(arr)` | `arr.flat()` |
| `find(arr, key, val)` | `arr.find(item => item[key] === val)` |
| `filter(arr, key, val)` | `arr.filter(item => item[key] === val)` |
| `map(arr, key)` | `arr.map(item => item[key])` — same as pluck |
| `pluck(arr, key)` | `arr.map(item => item[key])` |
| `sort(arr, key, dir)` | Custom sort with direction |
| `group_by(arr, key)` | Custom grouping |
| `empty(val)` | Check for null/undefined/empty string/empty array |
| `count(val)` | `Array.isArray(val) ? val.length : 0` |

### `packages/htx-engine/src/expressions/functions/date-functions.ts`

Port date functions — use native `Date` and `Intl.RelativeTimeFormat`:
| PHP Function | TS Implementation |
|---|---|
| `now()` | `new Date().toISOString()` |
| `format(date, fmt)` | `Intl.DateTimeFormat` or custom format |
| `ago(date)` | `Intl.RelativeTimeFormat` |
| `between(date, start, end)` | Date comparison |

### `packages/htx-engine/src/expressions/functions/number-functions.ts`

Port number functions — mostly direct mappings:
| PHP Function | TS Implementation |
|---|---|
| `round(n, precision)` | `Number(n.toFixed(precision))` |
| `floor(n)` | `Math.floor(n)` |
| `ceil(n)` | `Math.ceil(n)` |
| `abs(n)` | `Math.abs(n)` |
| `min(...vals)` | `Math.min(...vals)` |
| `max(...vals)` | `Math.max(...vals)` |
| `sum(arr)` | `arr.reduce((a, b) => a + b, 0)` |
| `avg(arr)` | `sum / length` |

### Barrel export — `packages/htx-engine/src/expressions/functions/index.ts`

## Files to Create (Tests)

### `packages/htx-engine/tests/functions.test.ts`

Comprehensive tests for all 50+ functions, organized by category. Port from PHP test assertions. Each function needs:
- Happy path
- Edge cases (empty input, null, wrong type)
- Type coercion behavior

## Validation

- [ ] All 50+ functions registered and callable
- [ ] `md()` function works with `marked` dependency
- [ ] Type coercion matches PHP behavior where it matters
- [ ] Edge cases handled gracefully (no thrown errors for bad input)
- [ ] All tests pass

## Review Comments

_Reviewed by Claude after building the complete PHP implementation._

### Snake_Case Function Names

Several function names use snake_case: `starts_with`, `regex_capture`, `group_by`, `nl2br`. The master plan says "camelCase throughout (no PHP snake_case leftovers)." Decide one way or the other:

- **Option A:** camelCase in the registry (`startsWith`, `regexCapture`, `groupBy`). Clean, consistent with TS conventions.
- **Option B:** Keep snake_case as the template-facing API (since template authors type these). Templates with `{{ name | starts_with("A") }}` read more naturally than `{{ name | startsWith("A") }}`.

My recommendation: Keep snake_case for template-facing function names. The function registry is an internal detail — template authors shouldn't need to know or care about TypeScript naming conventions. This is the one place where snake_case is actually the right choice.

### `md()` Function: Lazy-Load the Dependency

Rather than importing `marked` at the top of `string-functions.ts` (which loads it even when `md()` is never called), lazy-load it:

```typescript
let marked: typeof import('marked') | null = null
function md(str: unknown): string {
  marked ??= require('marked')
  return marked.parse(String(str))
}
```

This keeps the startup cost zero for applications that don't use Markdown.

### `default()` Function: Name Conflict

`default` is a reserved word in JavaScript/TypeScript. The function registry maps names to functions, so the string `"default"` is fine as a registry key, but make sure you're not trying to use it as an export name or variable name anywhere.

### Missing Functions from PHP

Cross-reference with the actual PHP `StringFunctions.php` to make sure nothing is missed. The PHP build ended up with functions like `wordcount`, `excerpt`, `repeat`, and `pad` that aren't listed here. Audit the PHP source during execution.

### Test Strategy: One File May Be Too Large

50+ functions × (happy path + edge cases) = easily 150+ test cases. Consider splitting into `string-functions.test.ts`, `array-functions.test.ts`, `date-functions.test.ts`, `number-functions.test.ts` to keep files manageable and make it easy to run a subset.

## Execution Log

_(empty — not yet executed)_

## Independent review notes (2026-03)

- **Parity audit:** copy the exported function list from PHP `StringFunctions.php`, `ArrayFunctions.php`, `DateFunctions.php`, and `NumberFunctions.php` into this phase doc as an explicit checklist before declaring Phase 6 complete.

## Port review addendum (2026-03-28)

- The main improvement needed here is a source-of-truth checklist copied directly from PHP. Without that, this phase is likely to miss "small" functions that later break templates.
- I would also document the template-facing naming convention here once, so there is no drift between registry keys, TypeScript exports, and docs.
