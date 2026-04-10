# Phase 3 — Expression Engine: Lexer

**Status:** NOT STARTED
**Depends on:** Phase 1 (scaffolding)

## Objectives

Port the PHP Lexer to TypeScript. The Lexer tokenizes template strings, splitting them into text segments and expression segments delimited by `{{ }}` (and `{{! }}` for raw/unescaped output).

## Source Reference

- **PHP source:** `packages/htx-engine/src/Expressions/Lexer.php` (~162 LOC)

## Files to Create

### `packages/htx-engine/src/expressions/lexer.ts`

**Key behaviors to port:**
- Scan input string for `{{` and `}}` delimiters
- Distinguish between `{{ expr }}` (escaped) and `{{! expr }}` (raw/unescaped)
- Emit tokens: `text`, `expression`, `raw_expression`
- Handle nested braces in string literals within expressions
- Respect `MAX_EXPRESSION_LENGTH` limit (2000 chars)
- Throw `ExpressionParseError` when limits exceeded or delimiters are unbalanced

**Token type definition:**
```typescript
type TokenType = 'text' | 'expression' | 'raw_expression'

interface Token {
  type: TokenType
  value: string
}
```

**Design notes:**
- The PHP version is a finite state machine scanning character by character
- Port the same FSM approach — don't try to be clever with regex
- Keep the same safety limits (MAX_EXPRESSION_LENGTH = 2000)

### `packages/htx-engine/src/expressions/errors.ts`

Custom error classes:
- `ExpressionParseError` (replaces `ExpressionParseException`)
- `ExpressionLimitError` (replaces `ExpressionLimitException`)

Both extend `Error` with descriptive messages.

## Files to Create (Tests)

### `packages/htx-engine/tests/lexer.test.ts`

Port from PHP `ExpressionEngineTest.php` — the lexer-relevant tests:
- Plain text (no expressions) → single text token
- Single expression: `{{ name }}` → expression token
- Mixed text and expressions: `Hello {{ name }}!`
- Raw expression: `{{! html }}`
- Multiple expressions in one string
- Nested braces in string literals: `{{ func("a}b") }}`
- Empty expression: `{{ }}` → error or empty expression
- Unclosed delimiter: `{{ name` → error
- Expression exceeding MAX_EXPRESSION_LENGTH → ExpressionLimitError
- Edge cases: `{{`, `}}`, `{{ }}`, consecutive expressions

## Validation

- [ ] All token types correctly identified
- [ ] Raw vs escaped expressions distinguished
- [ ] Safety limits enforced
- [ ] Error messages are descriptive
- [ ] All tests pass

## Review Comments

_Reviewed by Claude after building the complete PHP implementation._

### FSM Approach is Correct

Agree with the recommendation to port the FSM character-by-character approach rather than trying regex tricks. The lexer needs to handle string literals containing `}}` (e.g., `{{ func("a}}b") }}`), which makes regex-based approaches fragile.

### Consider: Merge with Phase 4

The Lexer in isolation produces tokens that can't be meaningfully tested without parsing. While you can test "does it emit the right token types," the real validation comes from parser tests that consume those tokens. In the PHP build, the lexer and parser were always tested together through the ExpressionEngine. Consider merging Phases 3 and 4 — the lexer is ~162 LOC and the parser is ~660 LOC, totaling ~820 LOC which is very doable in one phase.

### Token Position Information

The current `Token` interface only has `type` and `value`. Consider adding `position` (or `line`/`column`) to tokens — this makes error messages from the parser dramatically more useful. "Unexpected token at line 5, column 23" is much more helpful than "Unexpected token in expression." The PHP version may not have this, but it's a cheap improvement for the TypeScript rewrite.

```typescript
interface Token {
  type: TokenType
  value: string
  position: number  // character offset in source
}
```

### Edge Case: Template Literals with Backticks

If template strings ever contain JavaScript template literal syntax (`` ` ``), the lexer needs to not get confused. Worth a test case.

## Execution Log

_(empty — not yet executed)_

## Independent review notes (2026-03)

- Optional: add **character offset** (or line/column) on tokens so parser/evaluator errors reference position—cheap win for template authors (already suggested in prior review).

## Port review addendum (2026-03-28)

- This phase is only worth keeping separate if the lexer contract is truly stable on its own. Otherwise I would merge it with the parser phase to reduce rework and duplicated fixtures.
- However it is split, malformed delimiter coverage matters more than token-count coverage. I would prioritize edge cases that could desynchronize the parser.
