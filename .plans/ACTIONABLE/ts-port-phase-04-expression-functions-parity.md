# Phase 04 — Expression Functions Parity

**Status:** IN PROGRESS

## Objective

Port the function registry and all PHP-backed built-in expression functions, preserving template-facing names and behavior.

## Source of truth

- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/src/Expressions/FunctionRegistry.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/src/Expressions/Functions/StringFunctions.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/src/Expressions/Functions/ArrayFunctions.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/src/Expressions/Functions/DateFunctions.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/src/Expressions/Functions/NumberFunctions.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/tests/ExpressionEngineTest.php`

## Target TS files

- `hypermedia-app-ts/packages/htx-engine/src/expressions/function-registry.ts`
- `hypermedia-app-ts/packages/htx-engine/src/expressions/functions/string-functions.ts`
- `hypermedia-app-ts/packages/htx-engine/src/expressions/functions/array-functions.ts`
- `hypermedia-app-ts/packages/htx-engine/src/expressions/functions/date-functions.ts`
- `hypermedia-app-ts/packages/htx-engine/src/expressions/functions/number-functions.ts`
- `hypermedia-app-ts/packages/htx-engine/src/expressions/expression-engine.ts`
- `hypermedia-app-ts/packages/htx-engine/tests/string-functions.test.ts`
- `hypermedia-app-ts/packages/htx-engine/tests/array-functions.test.ts`
- `hypermedia-app-ts/packages/htx-engine/tests/date-functions.test.ts`
- `hypermedia-app-ts/packages/htx-engine/tests/number-functions.test.ts`
- `hypermedia-app-ts/packages/htx-engine/tests/expression-engine-parity.test.ts`

## Implementation steps

1. Copy the PHP function inventory into this phase doc during execution as a checklist and keep it in sync while porting.
2. Port the registry shape and function lookup behavior.
3. Implement string, array, date, and number helpers with PHP-equivalent template names.
4. Decide whether markdown rendering uses `marked` lazily or as a hard runtime import; document the decision in code comments and README updates later.
5. Finish the `ExpressionEngine` facade with `evaluate`, `render`, and `hasExpressions`.
6. Port the remaining expression tests once function support exists.

## Acceptance gates

- Every PHP function has a corresponding TypeScript implementation or an intentional omission note.
- Function names exposed to templates match PHP names exactly.
- `ExpressionEngineTest.php` parity coverage is substantially complete.
- Any markdown behavior difference is documented as intentional.

## Tests to port

- All function-driven cases from `ExpressionEngineTest.php`
- Per-module function tests grouped by function family
- `hasExpressions()` cases

## Known risks

- Losing functions by relying on memory instead of a copied checklist
- Registry key naming drift between TS exports and template names
- Treating markdown as core if it is only marginally used

## Execution log

- [x] Function inventory checklist added
- [x] Registry ported
- [x] Function modules ported
- [x] Expression facade finalized
- [x] Function/module tests passing
- [ ] Full PHP expression parity sweep still pending
