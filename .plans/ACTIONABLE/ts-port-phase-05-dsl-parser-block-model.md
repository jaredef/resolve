# Phase 05 — DSL Parser And Block Model

**Status:** IN PROGRESS

## Objective

Port the HTX DSL parser so templates produce PHP-compatible block metadata, response mappings, nested query structures, and string regions for handler replacement.

## Source of truth

- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/src/Parser/DSLParser.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/src/Parser/MetaExtractor.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/src/Parser/TemplateExtractor.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/src/Parser/ResponseExtractor.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/src/Parser/NestTreeBuilder.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/tests/ParserTest.php`

## Target TS files

- `hypermedia-app-ts/packages/htx-engine/src/parser/meta-extractor.ts`
- `hypermedia-app-ts/packages/htx-engine/src/parser/template-extractor.ts`
- `hypermedia-app-ts/packages/htx-engine/src/parser/response-extractor.ts`
- `hypermedia-app-ts/packages/htx-engine/src/parser/nest-tree-builder.ts`
- `hypermedia-app-ts/packages/htx-engine/src/parser/dsl-parser.ts`
- `hypermedia-app-ts/packages/htx-engine/tests/dsl-parser.test.ts`

## Implementation steps

1. Port meta extraction for `type`, `slug`, `where`, `fields`, `action`, `recordId`, `order`, `howmany`, `offset`, and related directives.
2. Port template block extraction and preserve block-local content exactly.
3. Port response extraction and response naming semantics for mutation flows.
4. Port nest parsing so nested content blocks remain compatible with the read executor.
5. Preserve `regionStart`, `startPos`, and `endPos` offsets so `RequestHandler` can replace blocks in reverse order.
6. Ensure multi-block parsing works on one template file, not only single-block templates.

## Acceptance gates

- Parsed block output matches PHP shape closely enough that Phase 10 and Phase 12 can consume it without local adapters.
- `where` and `fields` stay string-based where PHP expects strings.
- Multi-block templates preserve correct region offsets.
- Parser tests include at least one realistic template with meta + responses + nested content.

## Tests to port

- `ParserTest.php`
- Templates with multiple `<htx>` blocks
- Templates containing mutation metadata and response blocks
- Templates containing nested query directives

## Known risks

- Treating the DSL as one canonical template block instead of many blocks
- Breaking reverse-order replacement by changing string offset semantics
- Quietly normalizing metadata into non-PHP shapes

## Execution log

- [x] Meta extraction ported
- [x] Template extraction ported
- [x] Response extraction ported
- [x] Nest parsing ported
- [x] Multi-block parser tests passing
- [ ] Full PHP parser parity sweep still pending
