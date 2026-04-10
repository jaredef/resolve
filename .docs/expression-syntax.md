# Expression Syntax

HTX expressions are evaluated at render time and produce string output that is inserted into the HTML document. Expressions appear in two contexts: inside template text using the `{{ }}` delimiter, and within certain directive attribute values.

## Output Syntax

### Standard Output

Wrap an expression in double curly braces to evaluate and insert it. The result is HTML-escaped by default.

```html
<p>{{ result.title }}</p>
```

If `result.title` contains `<script>alert(1)</script>`, the output is `&lt;script&gt;alert(1)&lt;/script&gt;`.

### Raw (Unescaped) Output

Use `{{! }}` to output a value without HTML escaping. Only use this with content you trust.

```html
<div>{{! result.body_html }}</div>
```

### Escaped Delimiters

To output a literal `{{ }}` sequence without triggering expression evaluation, prefix the opening braces with a backslash.

```html
<p>Use \{{ variable }} syntax in your templates.</p>
```

This renders as: Use `{{ variable }}` syntax in your templates.

---

## Literals

Expressions support four literal types:

| Type    | Examples                     |
|---------|------------------------------|
| String  | `"hello"`, `'world'`         |
| Number  | `42`, `3.14`, `-1`           |
| Boolean | `true`, `false`              |
| Null    | `null`                       |

Strings can use single or double quotes. There is no string interpolation inside quoted literals.

---

## Variable References

Variables are resolved from named scopes. A bare name (no prefix) is resolved against the current record context first, then falls back to component props.

### Scope Prefixes

| Prefix      | Description                                       | Example                   |
|-------------|---------------------------------------------------|---------------------------|
| `route.*`   | URL path parameters from dynamic segments          | `{{ route.slug }}`        |
| `query.*`   | URL query string parameters                        | `{{ query.page }}`        |
| `result.*`  | Fields from the current data query result          | `{{ result.title }}`      |
| `loop.*`    | Loop metadata inside `htx:each`                   | `{{ loop.index }}`        |
| `props.*`   | Component props                                    | `{{ props.variant }}`     |

Route parameters are populated from dynamic path segments. A file at `pages/blog/[slug].html` makes `route.slug` available. Query parameters come from the URL query string: `/search?q=hello` makes `query.q` available.

### Dot Notation

Nested values are accessed with dots. This works for structured fields stored in a record's meta JSON.

```html
{{ result.author.name }}
{{ result.meta.og_image }}
```

If any segment in the chain is null or undefined, the entire expression resolves to an empty string.

---

## Operators

### Comparison Operators

| Operator | Description              |
|----------|--------------------------|
| `==`     | Equal (loose comparison) |
| `!=`     | Not equal                |
| `>`      | Greater than             |
| `<`      | Less than                |
| `>=`     | Greater than or equal    |
| `<=`     | Less than or equal       |

Comparisons return boolean values. Strings are compared lexicographically. A number compared to a numeric string will coerce the string to a number.

### Logical Operators

| Operator | Description        |
|----------|--------------------|
| `and`    | Logical AND        |
| `or`     | Logical OR         |
| `not`    | Logical NOT (unary)|

```html
{{ status == "active" and not archived }}
```

### Truthiness Rules

The following values are considered **falsy**:

- `false`
- `null`
- `0`
- `""` (empty string)
- `undefined` / missing variable

Everything else is truthy, including empty arrays and empty objects.

---

## Ternary Expressions

The ternary operator selects between two values based on a condition.

```html
{{ published ? "Live" : "Draft" }}
```

Ternaries can be nested, but deep nesting hurts readability. Prefer `if/elif/else` blocks for complex branching.

```html
<span class="{{ loop.first ? 'first' : loop.last ? 'last' : 'middle' }}">
```

---

## Pipe Syntax (Filters)

Pipes transform a value through one or more filter functions. Filters are applied left to right.

```html
{{ title | uppercase }}
{{ created_at | date "YYYY-MM-DD" }}
{{ body | truncate 200 | escape }}
```

Filter arguments follow the filter name, separated by spaces. Filters are pure functions; they do not modify the source value. The set of available filters depends on the engine configuration.

### Common Filters

| Filter       | Arguments        | Description                          |
|--------------|------------------|--------------------------------------|
| `uppercase`  | none             | Converts to uppercase                |
| `lowercase`  | none             | Converts to lowercase                |
| `truncate`   | length           | Truncates to N characters with "..." |
| `date`       | format string    | Formats a date/timestamp             |
| `escape`     | none             | HTML-escapes the value               |
| `default`    | fallback value   | Returns fallback if value is falsy   |
| `json`       | none             | Serializes to JSON string            |
| `slugify`    | none             | Converts to URL-safe slug            |

---

## Function Call Syntax

Functions are invoked by name with parenthesized arguments.

```html
{{ len(items) }}
{{ min(a, b) }}
{{ range(1, 10) }}
```

Functions differ from filters in that they take explicit arguments rather than piping a value. The available function set depends on the engine configuration.

---

## Control Flow

### if / elif / else / endif

Conditional blocks render their content only when the condition evaluates to truthy.

```html
{{ if status == "published" }}
  <span class="badge green">Published</span>
{{ elif status == "draft" }}
  <span class="badge yellow">Draft</span>
{{ else }}
  <span class="badge gray">Unknown</span>
{{ endif }}
```

Conditions support the full expression syntax including comparisons, logical operators, and function calls.

### each / endeach

Iterates over an array value. The `key` attribute provides a hint for stable iteration identity.

```html
{{ each items key="id" }}
  <li>{{ title }} — {{ price }}</li>
{{ endeach }}
```

Inside an `each` block, the `loop.*` metadata variables are available (see Variable References above). If the iterable is empty, the block produces no output.

Expression-level `each` is distinct from the `htx:each` directive. The directive iterates over data query results at the block level; expression-level `each` iterates over any array value within the expression context.

---

## Operator Precedence

Operators are evaluated in the following order, from lowest to highest precedence:

| Precedence | Operator(s)                | Description          |
|------------|----------------------------|----------------------|
| 1 (lowest) | `or`                       | Logical OR           |
| 2          | `and`                      | Logical AND          |
| 3          | `not`                      | Logical NOT (unary)  |
| 4          | `==`, `!=`                 | Equality             |
| 5          | `>`, `<`, `>=`, `<=`       | Comparison           |
| 6          | `?` `:`                    | Ternary              |
| 7          | `\|`                       | Pipe (filter)        |
| 8 (highest)| `()`, `.`                  | Grouping, dot access |

Use parentheses to override default precedence:

```html
{{ (a or b) and c }}
```

---

## Safety Limits

The expression evaluator enforces hard limits to prevent abuse and runaway templates.

| Limit              | Default    | Description                                        |
|--------------------|------------|----------------------------------------------------|
| Expression length  | 1024 chars | Maximum character length of a single expression     |
| Nesting depth      | 16 levels  | Maximum depth of nested sub-expressions             |
| Loop iterations    | 1000       | Maximum iterations per `each` block                 |
| Output size        | 1 MB       | Maximum total rendered output per template          |
| Filter chain       | 10 filters | Maximum number of piped filters in one expression   |
| Function arguments | 8          | Maximum arguments per function call                 |

When a limit is exceeded, the engine halts evaluation of that expression and emits an empty string along with a warning in the server log. The rest of the template continues to render normally.
