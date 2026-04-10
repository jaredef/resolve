The HTX engine operates in composable layers. Each layer builds on the ones below it. You only pay for what you use — a static page is just as fast as if the query engine didn't exist. Layers activate only when a template contains their directives.

## Layer 1: Static Templates

At its simplest, HTX is a layout and partial system. Write HTML, compose with includes and components.

**Directives:** htx:include, htx:component, htx:slot, htx:fill, htx:props

A root layout wraps every page. Partials are shared across routes. Components accept props and slots. No data, no queries — just HTML composition with inheritance.

This layer alone replaces what most static site generators do: consistent layouts, shared navigation, reusable UI pieces. The difference is that it's server-rendered on every request, so changes are instant — no build step.

## Layer 2: Read Queries

Add a data query and the template becomes dynamic. One query per page, iterate over results.

**Directives:** htx:type, htx:slug, htx:where, htx:order, htx:howmany, htx:offset, htx:each, htx:none

The query is declarative — you describe WHAT you want (content type, filters, ordering, pagination), not HOW to get it. The content adapter handles the actual database or filesystem lookup. The template receives rows and renders them.

Most documentation sites, blogs, and content-heavy applications live at this layer. One query fetches the data, htx:each renders each row, htx:none handles the empty case.

## Layer 3: Multi-Query Composition

Templates and included partials can each make their own independent queries. A page can run one query while its sidebar partial runs four more — all in a single render pass.

**Mechanism:** Nested htx blocks in htx:include partials, resolved by the balanced template scanner.

This enables data-driven navigation sidebars, related content widgets, "also in this section" links, and any cross-cutting concern that needs its own data independent of the page's primary query.

The engine's balanced scanner identifies top-level htx blocks across the full template (including expanded includes), then the executor resolves each block against the adapter independently.

## Layer 4: Expressions and Computed Properties

Inside any template, expressions add logic without requiring a programming language.

**Syntax:** {{ variable }}, {{ if condition }}, {{ each items }}, htx:let

Expressions evaluate variables, conditionals, ternary operators, function calls, and dot-notation property access. The htx:let directive creates computed properties that downstream content can reference.

The expression engine supports a full function library: string manipulation, date formatting, array operations, number formatting, and more. But it's intentionally not Turing-complete — there are no loops with side effects, no variable reassignment, no arbitrary code execution. Templates describe presentation, not business logic.

## Layer 5: Mutations (Prepare / Execute)

Forms that create, update, and delete content. The engine handles the full lifecycle: render the form, validate the submission, execute the mutation, return the appropriate response.

**Directives:** htx:response (named response blocks: success, error, none, validation)
**Security:** Action tokens (JWT-based CSRF protection with replay guard)

A mutation page defines multiple response templates — one for each outcome. The prepare phase issues a time-limited JWT token embedded in the form. The execute phase validates the token (signature, expiry, tenant, context, record binding, replay) before performing the mutation.

This is full CRUD without JavaScript. The server renders the form, receives the submission, mutates the data, and returns a new HTML fragment. htmx swaps it in.

## Layer 6: Fragments

Server-rendered interactive components that respond to htmx requests with HTML.

**Endpoint:** /fragments/{path} maps to .htx template files
**Data flow:** Request parameters (GET query + POST body) become template variables

Fragments are the bridge between documentation and application. A docs page can embed a live interactive demo that hits real server endpoints — no mock server, no client-side simulation. State travels through the HTML itself (form values, query parameters, hx-vals).

Any htx:include, htx:let, htx:component, and expression feature works inside fragments. They render through the full engine pipeline, minus the root layout (fragment mode skips the HTML shell).

## Layer 7: Literal Syntax (htx:raw)

The escape hatch. Content inside htx:raw is preserved as literal text — no placeholder replacement, no expression evaluation.

**Directive:** htx:raw

This exists because the engine is powerful enough to need documentation about itself. A tutorial showing double-underscore placeholder syntax (like the slug or title placeholders) would have them replaced with actual data values. Wrapping content in htx:raw tells the engine "this is an example, not an instruction."

The literal syntax system operates in two phases: protect (escape syntax before processing) and finalize (restore syntax at render boundaries). Manual escaping with backslash prefixes is also supported for inline cases.

## The Composition Principle

Each layer is independent but composable. A template can use any combination:

- **Static docs site:** Layers 1 + 2 (layouts + read queries)
- **Blog with sidebar:** Layers 1 + 2 + 3 (add multi-query navigation)
- **Dynamic dashboard:** Layers 1 + 2 + 4 (add computed properties and conditionals)
- **Admin CRUD:** Layers 1 + 2 + 4 + 5 (add mutations with action tokens)
- **Interactive docs:** Layers 1 + 2 + 6 (add server-rendered fragments)
- **Self-documenting:** All layers including 7 (the docs about HTX, rendered by HTX)

You never configure which layers are "enabled." The engine detects what each template needs by scanning for directives. A page with no htx: directives renders as pure static HTML with zero overhead. A page with nested multi-query partials activates the balanced scanner. The cost is proportional to what the template actually uses.
