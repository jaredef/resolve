# Phase 07 — Resolvers, Layouts, And Components

**Status:** IN PROGRESS

## Objective

Port include expansion, component rendering, prop parsing, slot handling, let bindings, and layout stacking in a form compatible with the future `RequestHandler`.

## Source of truth

- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/src/Runtime/IncludeResolver.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/src/Runtime/ComponentResolver.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/src/Runtime/LayoutResolver.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/src/Runtime/LetResolver.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/src/Runtime/PropsParser.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/packages/htx-engine/tests/RuntimePipelineTest.php`
- `/Users/jaredfoy/Developer/hypermedia-app/hypermedia-app-php/app/templates/`

## Target TS files

- `hypermedia-app-ts/packages/htx-engine/src/runtime/include-resolver.ts`
- `hypermedia-app-ts/packages/htx-engine/src/runtime/component-resolver.ts`
- `hypermedia-app-ts/packages/htx-engine/src/runtime/layout-resolver.ts`
- `hypermedia-app-ts/packages/htx-engine/src/runtime/let-resolver.ts`
- `hypermedia-app-ts/packages/htx-engine/src/runtime/props-parser.ts`
- `hypermedia-app-ts/packages/htx-engine/tests/runtime-resolvers.test.ts`

## Implementation steps

1. Port `<htx:include>` expansion against single and multi-root template lookup.
2. Port component resolution with props, default values, slots, and nested template content.
3. Port `PropsParser` carefully, including values containing `=`.
4. Port `<htx:let>` evaluation using the expression engine.
5. Port layout discovery and stacking, including nested layouts and the stop condition for full-document layouts.
6. Document the exact runtime order this phase expects the handler to use: include -> component -> let -> later layout wrap.

## Acceptance gates

- Includes, components, and let bindings use HTX tags only, not expression syntax.
- Layout stacking behaves like the PHP app templates, including nested admin layouts.
- Props and slot behavior match the component examples in the PHP app.
- Runtime tests cover resolver ordering assumptions.

## Tests to port

- Relevant `RuntimePipelineTest.php` cases
- Component prop parsing and slot rendering cases
- Layout stacking cases from `app/templates/_layout.htx` and `app/templates/admin/_layout.htx`
- Include expansion cases

## Known risks

- Resolver order drifting from the PHP handler pipeline
- Accidentally supporting non-HTX include syntax
- Under-testing nested layouts, which the dogfood app depends on

## Execution log

- [x] IncludeResolver ported
- [x] ComponentResolver ported
- [x] PropsParser ported
- [x] LetResolver ported
- [x] LayoutResolver ported
- [x] Resolver parity tests passing
- [ ] Full PHP resolver parity sweep still pending
