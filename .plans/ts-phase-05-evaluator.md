# Phase 5 — Expression Engine: Evaluator

**Status:** NOT STARTED
**Depends on:** Phase 4 (Parser & AST)

## Objectives

Port the PHP Evaluator to TypeScript. The Evaluator is a tree-walking interpreter that evaluates AST nodes against a data context. It manages a scope stack for nested contexts (loops, components) and enforces resource limits.

## Source Reference

- **PHP source:** `packages/htx-engine/src/Expressions/Evaluator.php` (~396 LOC)

## Files to Create

### `packages/htx-engine/src/expressions/evaluator.ts`

**Key behaviors to port:**

1. **Scope stack** — array of `Record<string, unknown>` objects, walked from innermost (top) to outermost (bottom) for variable resolution
2. **Node evaluation** — `switch` on `node.kind` (exhaustive with discriminated union)
3. **Value resolution:**
   - `field_ref` → walk scope stack for variable name
   - `dot_access` → resolve object, then access property
   - `function_call` → look up in FunctionRegistry, call with evaluated args
   - `binary_op` → evaluate left and right, apply operator
   - `unary_op` → evaluate operand, apply operator (only `not`)
   - `ternary_op` → evaluate condition, then consequent or alternate
   - Literals → return value directly
4. **Control flow:**
   - `if` → evaluate condition, choose branch, evaluate body nodes
   - `each` → evaluate collection, iterate with scope push/pop, inject `loop` metadata
5. **Loop metadata** — `loop.index`, `loop.first`, `loop.last`, `loop.length` (0-based index)
6. **Truthiness** — define `isTruthy()`: `false`, `null`, `undefined`, `0`, `""`, `[]` are falsy; everything else truthy
7. **Resource limits:**
   - `MAX_LOOP_ITERATIONS = 1000`
   - `MAX_NESTING_DEPTH = 10`
   - `MAX_OUTPUT_SIZE = 1_048_576` (1 MB)
8. **HTML escaping** — output nodes escape by default via `escapeHtml()` (from Phase 2); raw output nodes skip escaping
9. **Numeric comparison** — helper function that coerces to number for `<`, `>`, `<=`, `>=`
10. **String concatenation** — `+` operator on strings

**TypeScript-specific considerations:**
- PHP's `mixed` return type → TypeScript's `unknown` (with type narrowing at call sites)
- PHP's `is_array()` → `Array.isArray()`
- PHP's `is_numeric()` → custom `isNumeric()` check (or `typeof x === 'number'`)
- PHP's loose equality in comparisons → be explicit about coercion rules

## Files to Create (Tests)

### `packages/htx-engine/tests/evaluator.test.ts`

Port from PHP `ExpressionEngineTest.php` — evaluator-relevant tests:
- Simple variable resolution: `{{ name }}` with `{ name: "Alice" }` → `"Alice"`
- Dot access: `{{ post.title }}` with nested data
- Deep dot access: `{{ post.author.name }}`
- Missing variable → empty string (not error)
- Missing nested property → empty string
- Binary comparisons: `==`, `!=`, `<`, `>`, `<=`, `>=`
- Boolean operators: `and`, `or`, `not`
- Ternary: `{{ active ? "yes" : "no" }}`
- If/elif/else evaluation
- Each loop with array data
- Each loop with empty array → none body
- Loop metadata access (`loop.index`, `loop.first`, `loop.last`)
- Nested each loops (scope isolation)
- HTML escaping of output
- Raw output bypasses escaping
- MAX_LOOP_ITERATIONS enforcement
- MAX_NESTING_DEPTH enforcement
- Truthiness edge cases

## Validation

- [ ] All node types handled (exhaustive switch)
- [ ] Scope stack push/pop correct for nested contexts
- [ ] Loop metadata injected correctly
- [ ] HTML escaping applied to output nodes
- [ ] Raw output bypasses escaping
- [ ] Resource limits enforced with descriptive errors
- [ ] All tests pass

## Review Comments

_Reviewed by Claude after building the complete PHP implementation._

### Loop Index: Clarify 0-Based vs 1-Based

The plan says `loop.index` is 0-based. The PHP implementation uses 0-based indexing. However, most template languages (Twig, Jinja2, Liquid) use 1-based `loop.index` with a separate `loop.index0` for 0-based. Since HTX is a template language that non-programmers might use, consider matching the Twig/Jinja convention: `loop.index` = 1-based, `loop.index0` = 0-based. This is a behavioral decision that should be made explicitly and documented.

### Truthiness: Empty Array `[]` is Falsy — Good

This matches PHP's behavior where `empty([])` is true. Just make sure the implementation checks `Array.isArray(val) && val.length === 0` rather than just `!val`, since `[]` is truthy in JavaScript.

### MAX_OUTPUT_SIZE: How is it Enforced?

The plan lists `MAX_OUTPUT_SIZE = 1_048_576` (1 MB) but doesn't describe the enforcement mechanism. The evaluator needs to track cumulative output size as it concatenates strings. This means either: (a) wrapping the output buffer in a class that checks size on each append, or (b) checking after each node evaluation. Option (a) is cleaner. The PHP version may not have this limit — verify if it's actually implemented in PHP or just aspirational.

### Missing: `typeof` or Type-Checking Expression

The PHP version doesn't have this, but it would be useful to add a `typeof(val)` function or `is_array(val)` / `is_string(val)` checks. Template authors sometimes need to conditionally render based on whether a value is a list or a single item. This is a nice-to-have, not a blocker.

### Error Strategy: Silent vs Loud

The plan says "missing variable → empty string (not error)." This is correct for production rendering but makes debugging painful. Consider a debug mode that logs warnings for missing variables. The dev server (Phase 17) could enable this by default.

## Execution Log

_(empty — not yet executed)_

## Independent review notes (2026-03)

- Confirm **MAX_OUTPUT_SIZE** (and whether it exists) against PHP [`Evaluator.php`](../../hypermedia-app-php/packages/htx-engine/src/Expressions/Evaluator.php)—implement only if the reference does.

## Port review addendum (2026-03-28)

- This phase should include a short parity table for truthiness, null handling, missing variables, and loop metadata. Those small semantics will define whether templates feel "ported" or "rewritten."
- I would avoid adding new debugging behavior here until parity is proven. Extra developer niceties are better as a follow-up phase than as part of the core port target.
