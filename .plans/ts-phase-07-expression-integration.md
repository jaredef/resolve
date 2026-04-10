# Phase 7 — Expression Engine Integration

**Status:** NOT STARTED
**Depends on:** Phase 6 (Functions)

## Objectives

Create the `ExpressionEngine` facade that wires together the Lexer, Parser, Evaluator, and FunctionRegistry into a single public API. This is the class the rest of the engine uses.

## Source Reference

- **PHP source:** `packages/htx-engine/src/Expressions/ExpressionEngine.php` (~106 LOC)

## Files to Create

### `packages/htx-engine/src/expressions/expression-engine.ts`

**Public API:**
```typescript
class ExpressionEngine {
  constructor(functionRegistry?: FunctionRegistry)

  // Evaluate a template string with expressions against data
  render(template: string, data: Record<string, unknown>): string

  // Evaluate a single expression and return the raw value (not stringified)
  evaluate(expression: string, data: Record<string, unknown>): unknown

  // Check if a string contains any {{ }} expressions
  hasExpressions(template: string): boolean

  // Access the function registry for extension
  getFunctionRegistry(): FunctionRegistry
}
```

**Key behaviors:**
- `render()` — tokenize (Lexer) → parse each expression token (Parser) → build template AST → evaluate (Evaluator) → concatenate output
- `evaluate()` — parse a single expression → evaluate → return raw value
- `hasExpressions()` — quick regex check for `{{` presence
- Default-construct with all built-in functions registered

### Barrel export — `packages/htx-engine/src/expressions/index.ts`

Export: `ExpressionEngine`, `FunctionRegistry`, `Node` type, error classes.

## Files to Create (Tests)

### `packages/htx-engine/tests/expression-engine.test.ts`

End-to-end expression engine tests (port from PHP `ExpressionEngineTest.php`):
- Full template rendering: `"Hello {{ name }}!"` + `{ name: "World" }` → `"Hello World!"`
- Multiple expressions in one template
- Nested data access: `{{ post.author.name }}`
- Function calls: `{{ name | uppercase }}`
- Conditionals: `{{ if active }}yes{{ else }}no{{ endif }}`
- Loops: `{{ each item in items }}{{ item.name }}{{ endeach }}`
- Raw output: `{{! htmlContent }}`
- `hasExpressions()` true/false cases
- `evaluate()` returning non-string values (numbers, booleans, arrays)
- Error handling for malformed expressions

## Validation

- [ ] `render()` produces identical output to PHP version for all test cases
- [ ] `evaluate()` returns correct typed values
- [ ] `hasExpressions()` is accurate
- [ ] Custom functions can be registered and called
- [ ] All tests pass

## Review Comments

_Reviewed by Claude after building the complete PHP implementation._

### Solid Design — This is the Right Facade

The `ExpressionEngine` facade with `render()`, `evaluate()`, and `hasExpressions()` is exactly the right API. The PHP version works identically and it's clean to use from the executor and resolver layers.

### Consider: Caching Parsed Templates

If the same template string is rendered multiple times with different data (common in `<htx:each>` loops), re-parsing the expression on every iteration is wasteful. Consider a simple `Map<string, Node>` cache on the ExpressionEngine:

```typescript
private parseCache = new Map<string, Node>()
```

The PHP version likely parses each iteration independently. This is an easy performance win for the TypeScript rewrite. LRU eviction at ~1000 entries prevents memory leaks.

### `hasExpressions()`: Regex vs Lexer

Using a quick regex check (`/\{\{/`) for `hasExpressions()` is correct — it avoids the overhead of full lexing for a simple presence check. Just make sure it doesn't false-positive on literal `{{` in HTML content that isn't an expression (rare edge case, acceptable to ignore).

### Test: Expression Engine as Integration Point

This phase's tests should be the **parity checkpoint** for the expression system. Every assertion from PHP's `ExpressionEngineTest.php` should be ported here, not spread across Phases 3-6. The earlier phases' tests verify internal behavior; this phase's tests verify external behavior matches PHP.

## Execution Log

_(empty — not yet executed)_

## Independent review notes (2026-03)

- If adding a **parse cache** on `ExpressionEngine`, cap size (e.g. LRU) to avoid unbounded memory on dynamic templates.

## Port review addendum (2026-03-28)

- This should be the expression-system parity gate: if PHP's end-user expression behavior is not matched here, later runtime phases will only hide the mismatch.
- Cache work is optional, but a full port of the PHP expression tests is not. I would make that explicit in the completion criteria.
