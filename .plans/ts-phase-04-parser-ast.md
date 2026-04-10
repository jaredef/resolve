# Phase 4 — Expression Engine: Parser & AST Nodes

**Status:** NOT STARTED
**Depends on:** Phase 3 (Lexer)

## Objectives

Port the PHP Parser and all AST Node types to TypeScript. The Parser is a recursive descent parser that builds an AST from token streams. The 16 PHP Node subclasses become a single discriminated union type.

## Source Reference

- **PHP source:** `packages/htx-engine/src/Expressions/Parser.php` (~660 LOC)
- **PHP source:** `packages/htx-engine/src/Expressions/Nodes/*.php` (16 files, ~20-40 LOC each)

## Files to Create

### `packages/htx-engine/src/expressions/nodes.ts`

**Discriminated union approach** — replace 16 PHP classes with typed objects:

```typescript
type Node =
  | { kind: 'text'; value: string }
  | { kind: 'output'; expr: Node; raw: boolean }
  | { kind: 'string_literal'; value: string }
  | { kind: 'number_literal'; value: number }
  | { kind: 'boolean_literal'; value: boolean }
  | { kind: 'null_literal' }
  | { kind: 'field_ref'; name: string }
  | { kind: 'dot_access'; object: Node; property: string }
  | { kind: 'function_call'; name: string; args: Node[] }
  | { kind: 'binary_op'; operator: string; left: Node; right: Node }
  | { kind: 'unary_op'; operator: string; operand: Node }
  | { kind: 'ternary_op'; condition: Node; consequent: Node; alternate: Node }
  | { kind: 'if'; condition: Node; body: Node[]; elifs: { condition: Node; body: Node[] }[]; elseBody: Node[] }
  | { kind: 'each'; variable: string; collection: Node; body: Node[]; noneBody: Node[] }
  | { kind: 'template'; children: Node[] }
  | { kind: 'raw_output'; expr: Node }
```

Plus constructor helper functions for each node type for convenience:
```typescript
function textNode(value: string): Node
function outputNode(expr: Node, raw: boolean): Node
// etc.
```

### `packages/htx-engine/src/expressions/parser.ts`

**Key behaviors to port:**
- Recursive descent with operator precedence climbing
- Token lookahead (peek/consume pattern)
- Parse expressions: field refs, dot access, function calls, binary ops, unary ops, ternary ops
- Parse control flow: `if`/`elif`/`else`/`endif`, `each`/`endeach`
- Parse pipes: `{{ value | uppercase }}` → function call node
- Parse string/number/boolean/null literals
- Parse `component` and `include` directives
- Respect `MAX_NESTING_DEPTH` (10)
- Descriptive error messages with position info

**Operator precedence (low to high):**
1. `or`
2. `and`
3. `==`, `!=`
4. `<`, `>`, `<=`, `>=`
5. `not` (unary)
6. Pipe `|`
7. Dot access `.`
8. Function call `()`

## Files to Create (Tests)

### `packages/htx-engine/tests/parser.test.ts`

Port from PHP `ParserTest.php` and expression-related tests:
- Simple field reference: `name` → FieldRef node
- Dot access: `post.title` → DotAccess node
- Function call: `uppercase(name)` → FunctionCall node
- Pipe syntax: `name | uppercase` → FunctionCall wrapping FieldRef
- Binary operations: `a == b`, `a and b`, `x > 5`
- Unary: `not active`
- Ternary: `active ? "yes" : "no"`
- If/elif/else blocks
- Each loops
- Nested expressions: `post.author.name | uppercase`
- String literals with escapes
- Number literals (int and float)
- Boolean and null literals
- Operator precedence: `a and b or c` → `(a and b) or c`
- Nesting depth limit
- Malformed expressions → descriptive errors

## Validation

- [ ] All node types constructable
- [ ] Discriminated union is exhaustive (TypeScript enforces this)
- [ ] Operator precedence matches PHP version
- [ ] Control flow parsing (if/each) works correctly
- [ ] Pipe syntax desugars to function calls
- [ ] All tests pass

## Review Comments

_Reviewed by Claude after building the complete PHP implementation._

### Discriminated Unions: Excellent Choice

This is the single biggest architectural improvement over the PHP version. The 16 PHP Node subclasses become a single type with exhaustive `switch` — TypeScript's type narrowing makes this both safer and more ergonomic. The compiler will catch any unhandled node kinds.

### Redundant Node Type: `raw_output`

The union includes both `{ kind: 'output'; expr: Node; raw: boolean }` and `{ kind: 'raw_output'; expr: Node }`. These represent the same concept. Drop `raw_output` and just use the `raw` boolean on `output`. This simplifies the evaluator's switch statement.

### Constructor Helpers: Skip Them

The plan suggests helper functions like `textNode(value)`, `outputNode(expr, raw)`, etc. In practice, object literal construction is equally readable in TypeScript:

```typescript
const node: Node = { kind: 'text', value: 'hello' }
```

The helpers add indirection without real benefit. They made sense in PHP where constructors are verbose, but TypeScript object literals are already concise.

### Operator Precedence: Pipe Position

The precedence table puts pipe (`|`) at level 6, between `not` and dot access. In the PHP implementation, pipe is essentially syntactic sugar for function calls — `name | uppercase` desugars to `uppercase(name)`. This means pipe should bind more loosely than comparison operators (otherwise `a == b | uppercase` would parse as `a == uppercase(b)` instead of `uppercase(a == b)`). Verify the precedence matches actual PHP behavior with a test like `{{ items | count > 0 }}`.

### Missing Node: `pipe`

Consider whether pipe should be its own AST node rather than immediately desugaring to `function_call`. Having a `pipe` node preserves the original syntax in the AST, which is useful for error messages and debugging. The evaluator can still evaluate it as a function call.

## Execution Log

_(empty — not yet executed)_

## Independent review notes (2026-03)

- Name the expression parser test file **`expression-parser.test.ts`** (or similar) so it does not collide with **`dsl-parser.test.ts`** from Phase 8.

## Port review addendum (2026-03-28)

- Freeze the AST shape before implementation starts in earnest. The evaluator, function registry, and debugging experience will all get harder if node shapes are still changing mid-port.
- I would explicitly settle pipe semantics in this phase using PHP parity tests rather than leaving that question to the evaluator.
