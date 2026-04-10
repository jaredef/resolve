The expression engine evaluates dynamic content inside double-brace tags. Expressions are server-side — they execute during template rendering and produce text output.

## Basic Output

```
{{ title }}
{{ author.name }}
{{ price | number_format : 2 }}
```

All output is HTML-escaped by default. Use raw output for trusted HTML:

```
{{ ! html_content }}
{{{ html_content }}}
```

## Conditional Blocks

```
{{ if status == "published" }}
  <span class="badge">Live</span>
{{ elif status == "draft" }}
  <span class="badge">Draft</span>
{{ else }}
  <span class="badge">Unknown</span>
{{ endif }}
```

## Iteration

```
{{ each item in items }}
  <div>{{ item.title }} — ${{ item.price }}</div>
{{ endeach }}
```

Loop metadata is available inside each blocks:

| Variable | Type | Description |
|----------|------|-------------|
| `loop.index` | number | Zero-based index |
| `loop.count` | number | One-based count |
| `loop.first` | boolean | True for first item |
| `loop.last` | boolean | True for last item |
| `loop.length` | number | Total items |

## Operators

| Operator | Example |
|----------|---------|
| `==` | `{{ if status == "published" }}` |
| `!=` | `{{ if role != "admin" }}` |
| `>`, `<`, `>=`, `<=` | `{{ if price > 100 }}` |
| `and` | `{{ if logged_in and is_admin }}` |
| `or` | `{{ if draft or archived }}` |
| `not` | `{{ if not archived }}` |

## Ternary

```
{{ status == "published" ? "Live" : "Draft" }}
```

## Pipes (Filters)

Pipes transform values using built-in functions:

```
{{ title | uppercase }}
{{ title | truncate : 50 : "..." }}
{{ items | count }}
{{ price | number_format : 2 }}
{{ date | format_date : "Y-m-d" }}
{{ name | slugify }}
```

Pipes chain left to right:

```
{{ title | trim | uppercase | truncate : 20 }}
```

## Built-in Functions

### String
`truncate`, `split`, `join`, `trim`, `uppercase`, `lowercase`, `capitalize`, `replace`, `contains`, `starts_with`, `slugify`, `length`

### Array
`count`, `first`, `last`, `reverse`, `sort`, `unique`, `slice`, `empty`, `defined`, `in_list`

### Number
`clamp`, `round`, `floor`, `ceil`, `abs`, `min`, `max`, `mult`, `div`, `add`, `sub`, `number_format`

### Date
`format_date` — format codes: `Y` (year), `m` (month), `d` (day), `H` (hour), `i` (minute), `s` (second)

## Dot Access

Expressions support chained property access:

```
{{ store.collection.title }}
{{ user.profile.avatar }}
{{ each item in data.nested.items }}
```

Null-safe — returns empty string if any intermediate value is null.

## Limits

| Limit | Value |
|-------|-------|
| Max loop iterations | 10,000 |
| Max nesting depth | 10 |
| Max function call depth | 5 |
| Max output size | 1 MB |
