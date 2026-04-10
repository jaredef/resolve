# Request Pipeline

This document traces the full lifecycle of an HTTP request through the HTX engine, from the moment it arrives to the final HTML response.

## Overview

The `RequestHandler` orchestrates every stage of the pipeline. It receives a normalized request object, runs it through a fixed sequence of processing steps, and returns a `Response`. The pipeline is synchronous except for mutation execution, which is async due to content adapter operations.

```
Request
  |
  v
Router.resolve()
  |
  v
Read template file
  |
  v
Include expansion (first pass)
  |
  v
Component resolution
  |
  v
Let variable resolution
  |
  v
Block parsing (DSLParser.parseBlocks)
  |
  v
Block processing (query or mutation)
  |
  v
Expression evaluation (first pass)
  |
  v
Hydrator placeholder replacement
  |
  v
Strip remaining meta directives
  |
  v
Layout wrapping
  |
  v
Include expansion (second pass)
  |
  v
Expression evaluation (second pass)
  |
  v
Response assembly
```

## Stage 1: Route Resolution

The `Router` maps the incoming URL path to a `.htx` template file using file-system routing.

```ts
const match = this.router.resolve(requestPath, this.templateRoot);
if (!match) {
  return Response.notFound();
}
```

The router checks candidates in this order:

1. Exact file match (`{path}.htx`)
2. Index file match (`{path}/index.htx`)
3. Dynamic segment match (walking `[param]` directories)
4. Catch-all match (parent directories with dynamic files)

If no match is found, the handler returns a `404 Not Found` response immediately. The `RouteMatch` object carries the resolved file path, extracted route parameters, and the site root.

**Error handling:** Path traversal attempts (using `..`) and excluded paths (underscore-prefixed, `partials`, `public`) are rejected by the router before reaching the handler.

## Stage 2: Template File Reading

The matched `.htx` file is read from disk synchronously:

```ts
let content = readFileSync(match.filePath, "utf8");
```

The raw file content is a mix of HTML, meta directives, expression syntax, and HTX tags. All subsequent stages operate on this string.

**Error handling:** If the file cannot be read (permissions, deleted between resolution and read), the error is caught by the top-level try/catch and returns a `500` response.

## Stage 3: Include Expansion (First Pass)

The `IncludeResolver` replaces `<htx:include>` tags with the contents of the referenced partial files:

```ts
content = this.includeResolver.expand(content, match.filePath, this.templateRoot);
```

Includes support both absolute paths (from site root) and relative paths (from the current file). The resolver enforces:

- A maximum nesting depth of 10
- Circular include detection
- Path containment within the site root

This first pass runs before block parsing so that included content can contain its own meta directives and template blocks.

## Stage 4: Component Resolution

The `ComponentResolver` processes `<htx:component>` tags, which are self-contained UI units with their own templates, props, and slots:

```ts
content = this.componentResolver.resolve(content, data);
```

Component resolution involves:

1. Parsing the `src` attribute and any props from the tag
2. Reading the component template file
3. Extracting and validating prop declarations
4. Expanding includes within the component
5. Resolving `<htx:slot>` and `<htx:fill>` tags for content projection
6. Evaluating expressions within the component scope
7. Recursively resolving nested components (up to depth 10)

At this point, the `data` context contains route parameters and query parameters:

```ts
const data: Record<string, unknown> = {
  ...query,
  ...match.params,
  route: match.params,
  $route: match.params,
  query,
  $query: query,
};
```

## Stage 5: Let Variable Resolution

The `LetResolver` processes `<htx:let>` tags, which define computed variables that are added to the data context:

```ts
content = this.letResolver.resolve(content, data);
```

Each `<htx:let>` tag is evaluated and removed from the content. The computed value is added to the `data` object and is available to all subsequent stages. Let tags support two syntaxes:

```html
<htx:let name="pageTitle" value="route.slug | capitalize" />
<htx:let pageTitle = route.slug | capitalize />
```

## Stage 6: Block Parsing

The `DSLParser.parseBlocks()` method finds all `<htx>...</htx>` template blocks in the content, along with their associated meta directives:

```ts
const blocks = this.parser.parseBlocks(content);
```

Each `ParsedBlock` contains:

| Field | Description |
|-------|-------------|
| `meta` | Extracted directives (`type`, `where`, `order`, `howmany`, etc.) |
| `responses` | Named response templates (`success`, `error`, `redirect`, `none`) |
| `template` | The HTML inside the `<htx>` block |
| `nests` | Nested content queries within the block |
| `startPos` / `endPos` | Character positions in the source string |
| `regionStart` | Start of the associated meta directive region |

A single file can contain multiple independent blocks. Each is parsed and processed separately.

## Stage 7: Block Processing

Blocks are processed in reverse order (last to first) to preserve character positions as content is spliced:

```ts
for (const block of [...blocks].reverse()) {
  // ...
  output = output.slice(0, regionStart) + rendered + output.slice(block.endPos);
}
```

The processing path depends on the block type and HTTP method:

### Read Blocks (GET with `type` directive)

When a block has a `type` meta directive and the request is a GET, the `GetContentExecutor` queries the content adapter:

1. Route and query parameters are passed to the executor
2. The meta directives (`type`, `where`, `order`, `howmany`, `offset`, `slug`, `fields`) are normalized into a `QueryMeta` object
3. The content adapter executes the query
4. The template is rendered with query results via the Hydrator
5. Nested queries are resolved recursively
6. Response templates (`none`) handle empty result sets

### Mutation Blocks (GET with `action` directive)

On GET requests, mutation blocks (those with an `action` directive like `save`, `update`, or `delete`) are prepared:

1. The `SetContentExecutor` or `DeleteContentExecutor` generates a form with a JWT action token
2. For `update` actions, existing record data is fetched and pre-filled
3. The prepared HTML includes hidden fields for the token, context, and record ID

### Mutation Execution (POST with token)

On POST requests that include an `htx-token` field, the mutation is executed:

1. The action token is verified (signature, expiry, replay protection)
2. Form data is extracted and cleaned (HTX-prefixed fields are removed)
3. The content adapter performs the create, update, or delete operation
4. Response templates are rendered based on the outcome
5. Redirect responses return a `302` with the `Location` header

**Error handling:** Mutation errors return a `422` response with the error message HTML-escaped.

## Stage 8: Expression Evaluation (First Pass)

After block processing, expressions in the remaining content are evaluated:

```ts
if (this.expressionEngine.hasExpressions(content)) {
  content = this.expressionEngine.evaluate(content, data);
}
```

The `ExpressionEngine` processes `{{ expression }}` syntax through three stages:

1. **Lexer** -- Tokenizes the template into text segments and expression segments
2. **Parser** -- Builds an AST from expression tokens (literals, field refs, operators, function calls, if/each blocks)
3. **Evaluator** -- Walks the AST and produces output strings

Expression output is HTML-escaped by default. Use `{{{ expression }}}` for raw (unescaped) output.

The evaluator enforces safety limits:

| Limit | Value |
|-------|-------|
| Maximum loop iterations | 1,000 |
| Maximum nesting depth | 10 |
| Maximum function call depth | 5 |
| Maximum output size | 1 MB |

## Stage 9: Hydrator Placeholder Replacement

The `Hydrator` replaces `__fieldname__` placeholders with values from the data context:

```ts
content = this.hydrator.hydrate(content, data);
```

Hydration rules:

- All values are HTML-escaped except fields in the trusted set (`body_html`)
- Dot notation is supported: `__object.property__`
- The special placeholder `__body__` maps to `body_html` when available
- Escaped placeholders (`\__name__`) are preserved literally
- Unresolved placeholders are removed (replaced with empty string)

## Stage 10: Meta Directive Stripping

Any remaining meta directive tags are removed from the output:

```ts
content = this.stripMetaDirectives(content);
```

This catches directives that were not consumed by block processing -- for example, directives in included files or after component resolution. The stripped directives are: `type`, `where`, `order`, `howmany`, `offset`, `slug`, `fields`, `action`, `recordId`, and `response`.

Consecutive blank lines left behind are collapsed to a single blank line.

## Stage 11: Layout Wrapping

The `LayoutResolver` wraps the content in layout templates by walking up the directory tree:

```ts
content = this.layoutResolver.wrap(content, match.filePath, this.templateRoot, isHtmx);
```

Layout resolution:

1. Starting from the template's directory, look for `_layout.htx` files
2. Walk up to the site root, collecting layout files at each level
3. Apply layouts from innermost to outermost, replacing the `__content__` placeholder
4. Stop walking when a layout containing `<!doctype html` is found (it is the root layout)

For HTMX requests (identified by the `HX-Request` header), the root layout is skipped. This allows partial responses that replace only a portion of the page.

## Stage 12: Include Expansion (Second Pass)

A second include pass catches `<htx:include>` tags that were introduced by layout files:

```ts
if (content.includes("<htx:include")) {
  content = this.includeResolver.expand(content, match.filePath, this.templateRoot);
}
```

This is conditional -- it only runs if include tags are actually present in the output.

## Stage 13: Expression Evaluation (Second Pass)

A second expression pass handles expressions introduced by layouts or second-pass includes:

```ts
if (this.expressionEngine.hasExpressions(content)) {
  content = this.expressionEngine.evaluate(content, data);
}
```

## Stage 14: Response Assembly

The final HTML is wrapped in a `Response` object with a `200` status and `text/html` content type:

```ts
return new Response(200, content, { "Content-Type": "text/html; charset=UTF-8" });
```

### Response Types

| Status | When |
|--------|------|
| `200` | Successful page render or mutation result |
| `302` | Mutation with a `redirect` response template |
| `404` | No route match |
| `422` | Mutation validation or execution error |
| `500` | Unhandled error during processing |

## Static File Serving

Before the pipeline runs, the `HttpHost` checks whether the request matches a static file in the public directory. Static files are served directly with the appropriate content type, bypassing the entire template pipeline.

Supported content types: CSS, JavaScript, JSON, SVG, PNG, JPEG, WebP.

## HTMX Integration

The pipeline detects HTMX requests via the `HX-Request` header. When present:

- The root layout (the one containing `<!doctype html`) is skipped
- The response contains only the page fragment, suitable for DOM swapping

This allows the same template files to serve both full-page loads and HTMX partial updates.

## Error Handling Summary

| Stage | Error Type | Result |
|-------|-----------|--------|
| Route resolution | No match | `404 Not Found` |
| File reading | IO error | `500 Internal Server Error` |
| Include expansion | Circular reference, depth exceeded, path escape | `500` with message |
| Component resolution | Missing component, depth exceeded, unclosed tag | `500` with message |
| Expression evaluation | Limit exceeded (loops, nesting, output size) | `500` with message |
| Block processing | Adapter query failure | `500` with message |
| Mutation execution | Token invalid, replay detected, adapter error | `422` with error HTML |

All error messages are HTML-escaped before being included in the response body.
