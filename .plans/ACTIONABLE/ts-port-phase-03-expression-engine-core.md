# Phase 03 — Expression Engine Core

**Status:** IN PROGRESS

## Objective

Port the lexer, parser, AST, evaluator, and core rendering semantics of the HTX expression engine.

## Source of truth

- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/src/Expressions/ExpressionEngine.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/src/Expressions/Lexer.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/src/Expressions/Parser.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/src/Expressions/Evaluator.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/src/Expressions/Nodes/`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/tests/ExpressionEngineTest.php`

## Target TS files

- `hypermedia-app-ts/packages/htx-engine/src/expressions/token.ts`
- `hypermedia-app-ts/packages/htx-engine/src/expressions/lexer.ts`
- `hypermedia-app-ts/packages/htx-engine/src/expressions/ast.ts`
- `hypermedia-app-ts/packages/htx-engine/src/expressions/parser.ts`
- `hypermedia-app-ts/packages/htx-engine/src/expressions/evaluator.ts`
- `hypermedia-app-ts/packages/htx-engine/src/expressions/errors.ts`
- `hypermedia-app-ts/packages/htx-engine/tests/expression-engine-core.test.ts`

## Implementation steps

1. Define token types and token position metadata for parse errors.
2. Port the PHP lexer rules for literals, identifiers, operators, delimiters, and nested expression boundaries.
3. Define a discriminated-union AST that covers all PHP node variants without changing semantics.
4. Port the recursive-descent parser, operator precedence, and pipe handling.
5. Port evaluator behavior for truthiness, null handling, field access, dot access, ternaries, loops, and missing variables.
6. Port any implemented resource limits from PHP only after confirming the reference behavior.
7. Add a thin `ExpressionEngine` facade only if needed to support the parity tests in this phase; function registry work belongs to Phase 04.

## Acceptance gates

- Core PHP expression tests pass except those blocked only by missing built-in functions.
- Missing variable, truthiness, and escaping behavior match PHP.
- AST and parser semantics are frozen before function work begins.
- No TypeScript-only conveniences change expression output.

## Tests to port

- High-signal cases from `ExpressionEngineTest.php`
- Parser precedence cases
- Lexer malformed input cases
- Loop metadata and conditional rendering cases

## Known risks

- Changing pipe precedence while translating to TS
- Splitting expression semantics across too many helper abstractions
- Adding debug behavior that changes production rendering

## Execution log

- [x] Lexer ported
- [x] AST defined
- [x] Parser ported
- [x] Evaluator ported
- [x] Core expression tests added and passing
- [ ] Full PHP expression parity coverage still pending
