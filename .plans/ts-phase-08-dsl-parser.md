# Phase 8 — DSL Parser

**Status:** NOT STARTED
**Depends on:** Phase 7 (Expression Engine Integration)

## Objectives

Port the DSL parser module — the system that extracts meta directives, template bodies, response templates, and nested structures from `.htx` files.

## Source Reference

- **PHP source:** `packages/htx-engine/src/Parser/DSLParser.php` (~150 LOC)
- **PHP source:** `packages/htx-engine/src/Parser/MetaExtractor.php`
- **PHP source:** `packages/htx-engine/src/Parser/TemplateExtractor.php`
- **PHP source:** `packages/htx-engine/src/Parser/ResponseExtractor.php`
- **PHP source:** `packages/htx-engine/src/Parser/NestTreeBuilder.php`

## Files to Create

### `packages/htx-engine/src/parser/meta-extractor.ts`

Extracts meta directives from HTX source:
- `<htx:type>` — content type
- `<htx:where>` — filter conditions
- `<htx:order>` — sort order
- `<htx:howmany>` — limit
- `<htx:offset>` — pagination offset
- `<htx:slug>` — slug lookup
- `<htx:action>` — mutation action (create/update/delete)
- `<htx:fields>` — field definitions

Returns a `Meta` object (typed interface).

### `packages/htx-engine/src/parser/template-extractor.ts`

Extracts the main template body between `<htx>` and `</htx>` tags, preserving:
- `<htx:each>` blocks
- `<htx:none>` blocks
- Nested template content

### `packages/htx-engine/src/parser/response-extractor.ts`

Extracts response templates:
- `<htx:responsesuccess>` — success response body
- `<htx:responseerror>` — error response body
- `<htx:responseredirect>` — redirect URL

### `packages/htx-engine/src/parser/nest-tree-builder.ts`

Parses `<htx:each>` nested structures for hierarchical data rendering. Builds a tree of nested iteration contexts.

### `packages/htx-engine/src/parser/dsl-parser.ts`

Orchestrator that calls all extractors and returns a complete parsed result:

```typescript
interface ParsedTemplate {
  meta: Meta
  template: string
  eachBlocks: EachBlock[]
  noneBlock: string | null
  responseSuccess: string | null
  responseError: string | null
  responseRedirect: string | null
}
```

### Barrel export — `packages/htx-engine/src/parser/index.ts`

## Files to Create (Tests)

### `packages/htx-engine/tests/parser.test.ts`

Port from PHP `ParserTest.php`:
- Meta extraction for each directive type
- Template body extraction
- Each block extraction
- None block extraction
- Response template extraction
- Nested each blocks
- Missing/optional directives
- Malformed HTX → descriptive errors

## Validation

- [ ] All meta directives correctly extracted
- [ ] Template body preserved with correct whitespace
- [ ] Response templates extracted
- [ ] Nested structures parsed into correct tree
- [ ] Error handling for malformed input
- [ ] All tests pass

## Review Comments

_Reviewed by Claude after building the complete PHP implementation._

### Architecture Clarification: DSLParser vs RequestHandler Block Processing

The `ParsedTemplate` interface implies the DSL parser returns a single parsed result. In the PHP implementation, the RequestHandler actually discovers **multiple** DSL blocks in a single template file (a page can have multiple `<htx:type>` sections). The DSLParser's `parse()` method works on individual blocks, while the RequestHandler is responsible for finding and iterating over all blocks in the file.

Make sure the plan accounts for this — either the DSLParser returns an array of `ParsedTemplate` blocks, or there's a separate "block finder" step in the RequestHandler (which, as noted in the master plan review, is missing from the phase list entirely).

### Missing: `<htx:action>` Parsing Details

The meta extractor lists `<htx:action>` but doesn't specify how it determines the action type. In PHP, the action value is a string like `save`, `update`, or `delete`, and the executor infers the mutation type from it combined with the content type. The plan should specify the exact mapping: `save` → create, `update` → update, `delete` → delete.

### Missing: `<htx:fields>` Parsing Details

`<htx:fields>` is listed as a meta directive but the plan doesn't describe its format. In PHP, this is a YAML-like block that defines form fields with types and validation. If the YAML parser from Phase 2 is meant for this, the connection should be explicit.

### Test File Name Collision

The plan creates `packages/htx-engine/tests/parser.test.ts`, but Phase 4 also creates a file called `packages/htx-engine/tests/parser.test.ts` for the expression parser. Rename one — suggest `dsl-parser.test.ts` for this phase and `expression-parser.test.ts` for Phase 4.

### Consider: Streaming Parser

The current design reads the entire template into memory and parses it. For typical `.htx` files (< 10KB), this is fine. But if anyone ever uses HTX for large generated pages, a streaming approach would be more memory-efficient. Not worth building now, but worth documenting as a future optimization path.

## Execution Log

_(empty — not yet executed)_

## Independent review notes (2026-03)

- In PHP [`ContentAdapterInterface`](../../hypermedia-app-php/packages/htx-engine/src/Contracts/ContentAdapterInterface.php), **`where`** in query meta is a **string** (comma-separated conditions), not a structured `Record`. The DSL/parser should emit that shape unless you deliberately version the contract.

## Port review addendum (2026-03-28)

- This phase needs a more explicit statement that the parser must model PHP's multi-block behavior, not just parse one idealized template shape. That affects executors and RequestHandler immediately.
- I would also pull the final `ParsedTemplate` and block metadata types forward into the contracts discussion so this phase does not invent them in isolation.
