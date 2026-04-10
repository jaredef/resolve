---
title: Expression Engine
status: published
section: core-concepts
section_label: Core Concepts
summary: The expression language with operators, control flow, pipes, and built-in functions.
created_at: 2026-03-28 00:06:00
---

The expression engine powers all dynamic content in HTX templates. Any text between `\{{ }}` delimiters is parsed and evaluated at render time, producing safe, HTML-escaped output by default.

## Pipeline Overview

Every expression passes through three stages:

1. **Lexer** -- Scans the template string and splits it into segments: plain text, expression blocks (`\{{ expr }}`), raw expression blocks (`\{{! expr }}` or `\{{ html expr }}`), and control-flow blocks (`\{{ if ... }}`, `\{{ each ... }}`, etc.).
2. **Parser** -- Converts each expression segment into an Abstract Syntax Tree (AST). The parser validates syntax, resolves function names against the function registry, and enforces a maximum nesting depth of 10.
3. **Evaluator** -- Walks the AST, resolves variable references from the scope stack, calls registered functions, and produces the final string output. The evaluator enforces runtime safety limits on output size, loop iterations, and call depth.

```
Template string
    |
    v
 [Lexer]  -->  Segment[]  (text, expression, block_open, block_close)
    |
    v
 [Parser] -->  TemplateNode (AST)
    |
    v
[Evaluator] + data  -->  rendered HTML string
```

The `ExpressionEngine` class ties all three stages together and provides the public API:

```typescript
const engine = new ExpressionEngine();
const output = engine.evaluate("Hello, \{{ name }}!", { name: "World" });
// => "Hello, World!"
```

## Expression Syntax

### Basic Output

Use double curly braces to output a value:

```html
<p>\{{ title }}</p>
<p>\{{ result.total }}</p>
```

All output is **HTML-escaped by default**. The characters `&`, `<`, `>`, `"`, and `'` are replaced with their HTML entity equivalents.

### Raw (Unescaped) Output

To output a value without HTML escaping, use either form:

```html
<!-- Bang syntax -->
\{{! body_html }}

<!-- Keyword syntax -->
\{{ html body_html }}
```

Use raw output only for values you trust (e.g., pre-sanitized HTML from a CMS field).

### Escaping Expressions

To output a literal `\{{ }}` in the rendered HTML, prefix the opening braces with a backslash:

```html
<p>\\{{ this will not be evaluated }}</p>
<!-- renders as: \{{ this will not be evaluated }} -->
```

## Literals

| Type | Examples | Notes |
|------|----------|-------|
| String | `'hello'`, `"hello"` | Single or double quotes. Backslash escapes are supported (`\"`, `\'`, `\\`). |
| Number | `42`, `3.14` | Integers and decimals. |
| Boolean | `true`, `false` | Case-sensitive keywords. |
| Null | `null` | Represents an absent value. |

## Variable References

### Simple References

A bare identifier resolves against the current scope:

```html
\{{ title }}
\{{ status }}
```

### Dot Access

Use dot notation to access properties of objects:

```html
\{{ route.slug }}
\{{ query.page }}
\{{ loop.index }}
```

Dot access works on objects and arrays. If the object is `null`, `undefined`, or not an object, the expression evaluates to `null` rather than throwing an error.

### Variable Scopes

The evaluator maintains a scope stack. Inner scopes (such as loop bodies) shadow outer scopes. Variables are resolved from the innermost scope outward.

| Scope | Description | Example |
|-------|-------------|---------|
| `route` | Route parameters extracted from the URL | `\{{ route.slug }}`, `\{{ route.id }}` |
| `query` | Query string parameters | `\{{ query.page }}`, `\{{ query.search }}` |
| `result` | Metadata about the query result | `\{{ result.total }}` |
| `loop` | Iteration metadata inside `each` blocks | `\{{ loop.index }}`, `\{{ loop.first }}` |
| Template data | Row fields from content queries | `\{{ title }}`, `\{{ body }}` |

The `loop` scope is only available inside `\{{ each }}` blocks and provides:

| Property | Type | Description |
|----------|------|-------------|
| `loop.index` | number | Zero-based index of the current item |
| `loop.count` | number | One-based count of the current item |
| `loop.first` | boolean | `true` for the first item |
| `loop.last` | boolean | `true` for the last item |

## Operators

### Comparison Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `==` | Equal (string comparison) | `\{{ if status == 'published' }}` |
| `!=` | Not equal | `\{{ if type != 'draft' }}` |
| `>` | Greater than | `\{{ if count > 0 }}` |
| `<` | Less than | `\{{ if price < 100 }}` |
| `>=` | Greater than or equal | `\{{ if age >= 18 }}` |
| `<=` | Less than or equal | `\{{ if score <= 50 }}` |

Equality (`==`, `!=`) converts both operands to strings before comparing. Ordering operators (`>`, `<`, `>=`, `<=`) use numeric comparison when both operands are numeric, and fall back to string comparison otherwise.

### Logical Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `and` | Logical AND (short-circuit) | `\{{ if logged_in and is_admin }}` |
| `or` | Logical OR (short-circuit) | `\{{ if draft or archived }}` |
| `not` | Logical NOT (unary) | `\{{ if not published }}` |

Logical operators use short-circuit evaluation. `and` returns `false` immediately if the left side is falsy. `or` returns `true` immediately if the left side is truthy.

### Truthiness

The following values are considered **falsy**:

- `null`
- `""` (empty string)
- `"0"` (string zero)
- `"false"` (string false)
- `false`
- `0` / `0.0`
- `[]` (empty array)

Everything else is truthy.

### Parentheses

Use parentheses to control evaluation order:

```html
\{{ if (status == 'published') and (category == 'tech' or category == 'science') }}
```

## Ternary Expressions

The ternary operator provides inline conditional output:

```html
\{{ status == 'published' ? 'Live' : 'Draft' }}
\{{ count > 0 ? count : 'none' }}
```

Ternary expressions can be nested, though readability should be considered:

```html
\{{ role == 'admin' ? 'Full access' : role == 'editor' ? 'Edit access' : 'Read only' }}
```

## Pipe Syntax (Filters)

The pipe operator passes a value through a registered function. The value becomes the first argument to the function.

### Basic Pipe

```html
\{{ title | uppercase }}
\{{ name | trim }}
\{{ body | truncate:100 }}
```

### Pipe with Argument

Use a colon to pass a single argument after the function name:

```html
\{{ created_at | format_date:'YYYY-MM-DD' }}
\{{ price | default:0 }}
\{{ tags | join:', ' }}
```

### Chained Pipes

Pipes can be chained left to right:

```html
\{{ title | trim | uppercase }}
\{{ body | truncate:200 | default:'No content' }}
```

Each pipe receives the output of the previous pipe as its first argument.

## Function Call Syntax

Functions can also be called with parentheses, which allows passing multiple arguments:

```html
\{{ truncate(title, 100, '...') }}
\{{ replace(body, 'foo', 'bar') }}
\{{ clamp(score, 0, 100) }}
\{{ min(price, budget) }}
```

Pipe syntax and function call syntax are interchangeable for single-argument functions. Use function call syntax when you need to pass more than one extra argument.

For the full list of built-in functions, see [Functions Reference](./17-functions-reference.md).

## Control Flow

### if / elif / else / endif

Conditional blocks control which parts of the template are rendered:

```html
\{{ if result.total > 0 }}
  <p>Found \{{ result.total }} items.</p>
\{{ elif result.total == 0 }}
  <p>No items found.</p>
\{{ else }}
  <p>Something went wrong.</p>
\{{ endif }}
```

The `elif` and `else` clauses are optional. You can have multiple `elif` clauses:

```html
\{{ if status == 'published' }}
  <span class="badge green">Published</span>
\{{ elif status == 'draft' }}
  <span class="badge yellow">Draft</span>
\{{ elif status == 'archived' }}
  <span class="badge gray">Archived</span>
\{{ else }}
  <span class="badge">Unknown</span>
\{{ endif }}
```

Conditions support any expression that resolves to a truthy or falsy value, including comparisons, logical operators, function calls, and simple variable references:

```html
\{{ if title }}         <!-- truthy check -->
\{{ if not empty(tags) }}
\{{ if count > 0 and status == 'published' }}
```

### each / endeach

The `each` block iterates over an array, rendering its body once per element:

```html
\{{ each post in posts }}
  <article>
    <h2>\{{ post.title }}</h2>
    <p>\{{ post.body }}</p>
  </article>
\{{ endeach }}
```

The syntax is `each <variable> in <expression>`. The variable name is pushed onto the scope stack for each iteration, along with the `loop` metadata object.

#### Key Attribute

An optional `key` clause injects a `data-htx-key` attribute on the first HTML element in each iteration, useful for DOM diffing:

```html
\{{ each item in items key item.id }}
  <li>\{{ item.name }}</li>
\{{ endeach }}
<!-- renders: <li data-htx-key="1">...</li> -->
```

#### Non-Array Values

If the iterable expression resolves to a non-array value, the behavior is:

- `null` or `""` (empty string) -- the loop body is skipped (zero iterations)
- Any other value -- treated as a single-element array

## Safety Limits

The expression engine enforces several limits to prevent runaway templates from consuming excessive resources:

| Limit | Default | Error Type | Description |
|-------|---------|------------|-------------|
| Expression length | 2,000 characters | `ExpressionParseError` | Maximum length of a single `\{{ }}` expression body |
| Nesting depth (parser) | 10 levels | `ExpressionParseError` | Maximum depth of nested `if`/`each` blocks during parsing |
| Nesting depth (evaluator) | 10 levels | `ExpressionLimitError` | Maximum depth of nested `if`/`each` blocks during evaluation |
| Loop iterations | 1,000 | `ExpressionLimitError` | Total iterations across all `each` blocks in a single render |
| Function call depth | 5 | `ExpressionLimitError` | Maximum depth of nested function calls |
| Output size | 1,048,576 bytes (1 MB) | `ExpressionLimitError` | Maximum total output size from a single template render |

### Error Types

| Error | When |
|-------|------|
| `ExpressionParseError` | Syntax errors, unknown functions, unterminated strings, unclosed blocks, exceeded parse-time limits |
| `ExpressionLimitError` | Runtime limits exceeded (output size, loop iterations, nesting depth, function call depth) |

## Token Types

The expression tokenizer recognizes the following token types:

| Token Type | Examples | Description |
|------------|----------|-------------|
| `string` | `'hello'`, `"world"` | Quoted string literals |
| `number` | `42`, `3.14` | Numeric literals |
| `identifier` | `title`, `route`, `uppercase` | Variable names and function names |
| `keyword` | `and`, `or`, `not`, `true`, `false`, `null` | Reserved words |
| `operator` | `==`, `!=`, `>`, `<`, `>=`, `<=` | Comparison operators |
| `pipe` | `\|` | Filter/pipe separator |
| `colon` | `:` | Pipe argument separator |
| `comma` | `,` | Function argument separator |
| `question` | `?` | Ternary condition |
| `dot` | `.` | Property access |
| `paren` | `(`, `)` | Grouping and function calls |

Identifiers may start with a letter, underscore, or dollar sign, followed by letters, digits, or underscores.

## Operator Precedence

From lowest to highest:

1. Pipe (`|`)
2. Ternary (`? :`)
3. Logical OR (`or`)
4. Logical AND (`and`)
5. Comparison (`==`, `!=`, `>`, `<`, `>=`, `<=`)
6. Unary NOT (`not`)
7. Primary (literals, identifiers, dot access, function calls, parenthesized expressions)

## Complete Example

```html
\{{ if not empty(posts) }}
  <h2>\{{ result.total }} Post\{{ result.total != 1 ? 's' : '' }}</h2>
  <ul>
    \{{ each post in posts key post.id }}
      <li class="\{{ loop.first ? 'first' : '' }}">
        <a href="/blog/\{{ post.slug }}">
          \{{ post.title | truncate:60 }}
        </a>
        <time>\{{ post.created_at | time_ago }}</time>
        \{{ if post.status != 'published' }}
          <span class="badge">\{{ post.status | capitalize }}</span>
        \{{ endif }}
      </li>
    \{{ endeach }}
  </ul>
\{{ else }}
  <p>No posts yet.</p>
\{{ endif }}
```
