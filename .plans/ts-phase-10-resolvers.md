# Phase 10 — Runtime: Resolvers (Template, Layout, Include, Component, Let)

**Status:** NOT STARTED
**Depends on:** Phase 7 (Expression Engine), Phase 9 (Router)

## Objectives

Port all runtime resolver classes to TypeScript. These handle template inheritance, includes, components, local variables, and prop parsing.

## Source Reference

- **PHP source:** `packages/htx-engine/src/Runtime/TemplateResolver.php`
- **PHP source:** `packages/htx-engine/src/Runtime/LayoutResolver.php`
- **PHP source:** `packages/htx-engine/src/Runtime/IncludeResolver.php`
- **PHP source:** `packages/htx-engine/src/Runtime/ComponentResolver.php`
- **PHP source:** `packages/htx-engine/src/Runtime/LetResolver.php`
- **PHP source:** `packages/htx-engine/src/Runtime/PropsParser.php`
- **PHP source:** `packages/htx-engine/src/Runtime/Response.php`

## Files to Create

### `packages/htx-engine/src/runtime/template-resolver.ts`

3-layer directory chain for template resolution:
1. Site overrides (custom templates)
2. Theme templates
3. Default templates

Resolves a template name to a file path by searching layers in order.

### `packages/htx-engine/src/runtime/layout-resolver.ts`

Resolves `_layout.htx` files by walking up the directory tree from the current template. Supports layout inheritance — a template in `blog/post.htx` inherits from `blog/_layout.htx`, which inherits from `_layout.htx`.

### `packages/htx-engine/src/runtime/include-resolver.ts`

Resolves **`<htx:include src="..." />`** directives (see PHP `IncludeResolver`). Reads the included file, processes it, and injects the result.

### `packages/htx-engine/src/runtime/component-resolver.ts`

Resolves **`<htx:component src="..." ...>...</htx:component>`** (and self-closing) directives (see PHP `ComponentResolver`):
- Locates the component template file
- Parses props from the tag attributes
- Renders the component with props as context
- Returns the rendered HTML

### `packages/htx-engine/src/runtime/let-resolver.ts`

Resolves **`<htx:let ... />`** tags (attribute-style and shorthand—see PHP `LetResolver`):
- Evaluates the expression
- Binds the result to the variable name in a new scope
- Strips the tags from output after binding

### `packages/htx-engine/src/runtime/props-parser.ts`

Parses component prop attributes from strings:
- `title="Hello"` → `{ title: "Hello" }`
- `count=5` → `{ count: 5 }`
- `active` → `{ active: true }` (boolean shorthand)
- Handles quoted values with spaces

### `packages/htx-engine/src/runtime/response.ts`

Response value object:
```typescript
interface HtxResponse {
  status: number
  headers: Record<string, string>
  body: string
}
```

### Barrel export — `packages/htx-engine/src/runtime/index.ts`

## Files to Create (Tests)

### `packages/htx-engine/tests/resolvers.test.ts`

Port from PHP `RuntimePipelineTest.php`:
- Template resolution across directory layers
- Layout inheritance chain
- Include resolution
- Component rendering with props
- Let variable scoping
- Props parsing (quoted, numeric, boolean)
- Missing template/include/component → error handling

## Validation

- [ ] 3-layer template resolution works
- [ ] Layout inheritance chains correctly
- [ ] Includes resolve and render
- [ ] Components receive props correctly
- [ ] Let variables scope correctly (no leaking)
- [ ] Props parser handles all value types
- [ ] All tests pass

## Review Comments

_Reviewed by Claude after building the complete PHP implementation._

### Critical: Syntax Mismatch with PHP Implementation

_(The **Files to Create** section above is now aligned with PHP; the following remains as the canonical DSL reference.)_

The older draft described `{{ include "path/to/file" }}` and `{{ component "name" prop1="value" }}` syntax, but the actual PHP implementation uses **XML-style directives**:

- Includes: `<htx:include src="partials/header" />`
- Components: `<htx:component name="card" title="Hello">slot content</htx:component>`
- Let: `<htx:let name="x" value="expr" />`

This is a significant discrepancy. The resolvers use regex to find `<htx:include>` tags, not `{{ include }}` expression syntax. The `{{ }}` syntax is handled by the expression engine, not the resolvers. Make sure the TypeScript implementation matches the actual PHP behavior, not the description in this plan.

### 3-Layer Template Resolution: Is It Used?

The plan describes a 3-layer directory chain (site overrides → theme → defaults) for template resolution. Verify this is actually implemented and used in the PHP codebase. In the build I did, the TemplateResolver was simpler — it just resolved template paths relative to the configured template directory. The 3-layer chain might be aspirational rather than implemented. If it's not in PHP, don't build it in TypeScript — it adds complexity for no parity gain.

### Missing: RequestHandler (Again)

The resolvers are all called by the RequestHandler in a specific order: IncludeResolver → ComponentResolver → LetResolver → (DSL parsing) → (execution) → LayoutResolver. The plan doesn't describe this ordering because the RequestHandler isn't in the phase list. The ordering matters — includes must be expanded before components, and layouts must wrap after execution. In the PHP build, getting this order wrong caused bugs where includes inside layouts weren't expanded.

### PropsParser: Good Standalone Component

PropsParser being its own file is a good call. It's used by ComponentResolver but is independently testable. The PHP implementation also needed to handle edge cases like props with `=` in values (e.g., `equation="1+1=2"`). Test for this.

### Response Type

The `HtxResponse` interface here should be the same one defined in Phase 13 (Contracts). Cross-reference to avoid duplicate definitions. Ideally, define it in contracts and import it here.

## Execution Log

_(empty — not yet executed)_

## Independent review notes (2026-03)

- Ensure all examples in **Objectives** use **`<htx:include>`** / **`<htx:component>`** / **`<htx:let>`** as in PHP [`IncludeResolver`](../../hypermedia-app-php/packages/htx-engine/src/Runtime/IncludeResolver.php), [`ComponentResolver`](../../hypermedia-app-php/packages/htx-engine/src/Runtime/ComponentResolver.php), [`LetResolver`](../../hypermedia-app-php/packages/htx-engine/src/Runtime/LetResolver.php)—not `{{ include }}` expression syntax.

## Port review addendum (2026-03-28)

- This phase would benefit from one explicit section that captures resolver ordering exactly as the future `RequestHandler` will call them. Resolver correctness is mostly about sequencing, not isolated behavior.
- I would also keep this doc strict about HTX tag syntax so the port does not accidentally drift toward an expression-based include model.
