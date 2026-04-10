# Built-in Functions Reference

The HTX expression engine includes a set of built-in functions organized into four categories: string, number, date, and array/utility. Functions are registered on the `FunctionRegistry` and called via the `registerDefaults()` method when the `ExpressionEngine` is constructed.

## Calling Conventions

Functions can be called in two ways:

**Direct call syntax:**

```
{{ truncate(title, 50) }}
{{ format_date(created_at, "Y-m-d") }}
```

**Pipe syntax** (the left-hand value becomes the first argument):

```
{{ title | truncate:50 }}
{{ created_at | format_date:"Y-m-d" }}
```

Both forms are equivalent. Pipe syntax is often more readable for single-value transformations. Pipes can be chained:

```
{{ title | lowercase | truncate:30 | append:"..." }}
```

---

## String Functions

### truncate

Truncates a string to a maximum length, appending a suffix if truncated.

| | |
|---|---|
| **Syntax** | `truncate(value, length, suffix?)` or `value \| truncate:length:suffix` |
| **Parameters** | `value` -- the input string; `length` -- maximum character count; `suffix` -- appended when truncated (default `"..."`) |
| **Returns** | String |

```
{{ title | truncate:50 }}
{{ truncate(description, 100, " [more]") }}
```

### split

Splits a string into an array by a delimiter.

| | |
|---|---|
| **Syntax** | `split(value, delimiter)` or `value \| split:delimiter` |
| **Parameters** | `value` -- the input string; `delimiter` -- the separator string |
| **Returns** | Array of strings. Returns an empty array if the input is empty. |

```
{{ tags | split:"," }}
```

### join

Joins an array into a string with a delimiter.

| | |
|---|---|
| **Syntax** | `join(array, delimiter)` or `array \| join:delimiter` |
| **Parameters** | `array` -- the input array; `delimiter` -- the separator string |
| **Returns** | String. Returns empty string if the input is not an array. |

```
{{ categories | join:", " }}
```

### trim

Removes leading and trailing whitespace.

| | |
|---|---|
| **Syntax** | `trim(value)` or `value \| trim` |
| **Parameters** | `value` -- the input string |
| **Returns** | String |

```
{{ username | trim }}
```

### uppercase

Converts a string to uppercase.

| | |
|---|---|
| **Syntax** | `uppercase(value)` or `value \| uppercase` |
| **Parameters** | `value` -- the input string |
| **Returns** | String |

```
{{ status | uppercase }}
```

### lowercase

Converts a string to lowercase.

| | |
|---|---|
| **Syntax** | `lowercase(value)` or `value \| lowercase` |
| **Parameters** | `value` -- the input string |
| **Returns** | String |

```
{{ email | lowercase }}
```

### capitalize

Capitalizes the first character of a string.

| | |
|---|---|
| **Syntax** | `capitalize(value)` or `value \| capitalize` |
| **Parameters** | `value` -- the input string |
| **Returns** | String |

```
{{ name | capitalize }}
```

### replace

Replaces all occurrences of a search string with a replacement.

| | |
|---|---|
| **Syntax** | `replace(value, search, replacement)` or `value \| replace:search:replacement` |
| **Parameters** | `value` -- the input string; `search` -- the substring to find; `replacement` -- the replacement string |
| **Returns** | String |

```
{{ slug | replace:"-":" " }}
```

### contains

Tests whether a string contains a substring.

| | |
|---|---|
| **Syntax** | `contains(value, search)` or `value \| contains:search` |
| **Parameters** | `value` -- the input string; `search` -- the substring to look for |
| **Returns** | Boolean |

```
{{ if title | contains:"draft" }}[DRAFT]{{ endif }}
```

### starts_with

Tests whether a string starts with a prefix.

| | |
|---|---|
| **Syntax** | `starts_with(value, prefix)` or `value \| starts_with:prefix` |
| **Parameters** | `value` -- the input string; `prefix` -- the prefix to check |
| **Returns** | Boolean |

```
{{ if url | starts_with:"/admin" }}Admin area{{ endif }}
```

### length

Returns the length of a string or array.

| | |
|---|---|
| **Syntax** | `length(value)` or `value \| length` |
| **Parameters** | `value` -- a string or array |
| **Returns** | Number. For strings, returns the character count. For arrays, returns the element count. |

```
{{ title | length }}
{{ items | length }}
```

### default

Returns a fallback value when the input is null, empty string, or false.

| | |
|---|---|
| **Syntax** | `default(value, fallback)` or `value \| default:fallback` |
| **Parameters** | `value` -- the input value; `fallback` -- the value to use when input is empty |
| **Returns** | The original value or the fallback |

```
{{ subtitle | default:"No subtitle" }}
{{ query.page | default:1 }}
```

### slug

Converts a string to a URL-friendly slug (lowercase, alphanumeric, hyphens).

| | |
|---|---|
| **Syntax** | `slug(value)` or `value \| slug` |
| **Parameters** | `value` -- the input string |
| **Returns** | String. Non-alphanumeric characters are replaced with hyphens. Leading and trailing hyphens are removed. |

```
{{ title | slug }}
```

### prepend

Prepends a string to the input.

| | |
|---|---|
| **Syntax** | `prepend(value, prefix)` or `value \| prepend:prefix` |
| **Parameters** | `value` -- the input string; `prefix` -- the string to prepend |
| **Returns** | String |

```
{{ path | prepend:"/" }}
```

### append

Appends a string to the input.

| | |
|---|---|
| **Syntax** | `append(value, suffix)` or `value \| append:suffix` |
| **Parameters** | `value` -- the input string; `suffix` -- the string to append |
| **Returns** | String |

```
{{ filename | append:".html" }}
```

### nl2br

Converts newline characters to `<br>` tags.

| | |
|---|---|
| **Syntax** | `nl2br(value)` or `value \| nl2br` |
| **Parameters** | `value` -- the input string |
| **Returns** | String with `\n` replaced by `<br>\n` |

```
{{ bio | nl2br }}
```

### md

Converts a subset of Markdown to HTML. Supports bold (`**text**`), italic (`*text*`), inline code (`` `code` ``), and links (`[text](url)`).

| | |
|---|---|
| **Syntax** | `md(value)` or `value \| md` |
| **Parameters** | `value` -- the input string with Markdown syntax |
| **Returns** | String with Markdown converted to HTML tags |

```
{{ description | md }}
```

### match

Pattern matching against a value. Takes a value followed by pairs of `(candidate, result)` and an optional default.

| | |
|---|---|
| **Syntax** | `match(value, candidate1, result1, candidate2, result2, ..., default?)` |
| **Parameters** | `value` -- the value to match; pairs of candidate and result; optional trailing default |
| **Returns** | The result corresponding to the first matching candidate, or the default, or empty string |

```
{{ match(status, "draft", "Draft", "published", "Published", "Unknown") }}
```

### regex

Tests whether a string matches a regular expression pattern.

| | |
|---|---|
| **Syntax** | `regex(value, pattern)` or `value \| regex:pattern` |
| **Parameters** | `value` -- the input string; `pattern` -- the regular expression pattern |
| **Returns** | Boolean |

```
{{ if email | regex:"^[^@]+@[^@]+$" }}Valid{{ endif }}
```

### regex_capture

Extracts a capture group from a regular expression match.

| | |
|---|---|
| **Syntax** | `regex_capture(value, pattern, group?)` or `value \| regex_capture:pattern:group` |
| **Parameters** | `value` -- the input string; `pattern` -- the regular expression; `group` -- capture group index (default `1`) |
| **Returns** | String. The captured group content, or empty string if no match. |

```
{{ url | regex_capture:"^/blog/(.+)$" }}
```

### coalesce

Returns the first non-empty, non-null, non-false argument.

| | |
|---|---|
| **Syntax** | `coalesce(value1, value2, ...)` |
| **Parameters** | Any number of values |
| **Returns** | The first truthy value, or empty string if all are empty |

```
{{ coalesce(custom_title, title, "Untitled") }}
```

---

## Number Functions

### clamp

Constrains a number to a range.

| | |
|---|---|
| **Syntax** | `clamp(value, min, max)` or `value \| clamp:min:max` |
| **Parameters** | `value` -- the number; `min` -- lower bound; `max` -- upper bound |
| **Returns** | Number |

```
{{ page | clamp:1:100 }}
```

### round

Rounds a number to a specified number of decimal places.

| | |
|---|---|
| **Syntax** | `round(value, decimals?)` or `value \| round:decimals` |
| **Parameters** | `value` -- the number; `decimals` -- decimal places (default `0`) |
| **Returns** | Number |

```
{{ price | round:2 }}
```

### floor

Rounds a number down to the nearest integer.

| | |
|---|---|
| **Syntax** | `floor(value)` or `value \| floor` |
| **Parameters** | `value` -- the number |
| **Returns** | Number |

```
{{ score | floor }}
```

### ceil

Rounds a number up to the nearest integer.

| | |
|---|---|
| **Syntax** | `ceil(value)` or `value \| ceil` |
| **Parameters** | `value` -- the number |
| **Returns** | Number |

```
{{ rating | ceil }}
```

### abs

Returns the absolute value of a number.

| | |
|---|---|
| **Syntax** | `abs(value)` or `value \| abs` |
| **Parameters** | `value` -- the number |
| **Returns** | Number |

```
{{ difference | abs }}
```

### min

Returns the smaller of two numbers.

| | |
|---|---|
| **Syntax** | `min(a, b)` |
| **Parameters** | `a` -- first number; `b` -- second number |
| **Returns** | Number |

```
{{ min(stock, 10) }}
```

### max

Returns the larger of two numbers.

| | |
|---|---|
| **Syntax** | `max(a, b)` |
| **Parameters** | `a` -- first number; `b` -- second number |
| **Returns** | Number |

```
{{ max(count, 0) }}
```

### add

Adds two numbers.

| | |
|---|---|
| **Syntax** | `add(a, b)` or `a \| add:b` |
| **Parameters** | `a` -- first number; `b` -- second number |
| **Returns** | Number |

```
{{ page | add:1 }}
```

### sub

Subtracts the second number from the first.

| | |
|---|---|
| **Syntax** | `sub(a, b)` or `a \| sub:b` |
| **Parameters** | `a` -- first number; `b` -- second number |
| **Returns** | Number |

```
{{ total | sub:discount }}
```

### mult

Multiplies two numbers.

| | |
|---|---|
| **Syntax** | `mult(a, b)` or `a \| mult:b` |
| **Parameters** | `a` -- first number; `b` -- second number |
| **Returns** | Number |

```
{{ price | mult:quantity }}
```

### div

Divides the first number by the second. Returns `0` if the divisor is zero.

| | |
|---|---|
| **Syntax** | `div(a, b)` or `a \| div:b` |
| **Parameters** | `a` -- dividend; `b` -- divisor |
| **Returns** | Number |

```
{{ total | div:count }}
```

### number_format

Formats a number with decimal places and thousands separators.

| | |
|---|---|
| **Syntax** | `number_format(value, decimals?, thousandsSep?)` or `value \| number_format:decimals:thousandsSep` |
| **Parameters** | `value` -- the number; `decimals` -- decimal places (default `0`); `thousandsSep` -- thousands separator (default `","`) |
| **Returns** | String |

```
{{ price | number_format:2 }}
{{ population | number_format:0:"." }}
```

### percent

Calculates a percentage of a value relative to a total. Returns `0` if total is zero.

| | |
|---|---|
| **Syntax** | `percent(value, total)` or `value \| percent:total` |
| **Parameters** | `value` -- the numerator; `total` -- the denominator |
| **Returns** | Number (the percentage, e.g. `75` for 75%) |

```
{{ completed | percent:total | round:1 }}%
```

### int

Truncates a number to an integer (rounds toward zero).

| | |
|---|---|
| **Syntax** | `int(value)` or `value \| int` |
| **Parameters** | `value` -- the input value |
| **Returns** | Number (integer) |

```
{{ "42.9" | int }}
```

### float

Converts a value to a floating-point number. Returns `0` for non-numeric inputs.

| | |
|---|---|
| **Syntax** | `float(value)` or `value \| float` |
| **Parameters** | `value` -- the input value |
| **Returns** | Number |

```
{{ input_price | float }}
```

### bool

Converts a value to a boolean. Strings `""`, `"0"`, `"false"`, and `"no"` are treated as false.

| | |
|---|---|
| **Syntax** | `bool(value)` or `value \| bool` |
| **Parameters** | `value` -- the input value |
| **Returns** | Boolean |

```
{{ if bool(is_active) }}Active{{ endif }}
```

---

## Date Functions

All date functions accept timestamps as Unix epoch seconds (numeric), numeric strings, or ISO 8601 date strings. String dates are parsed and converted to seconds automatically.

### format_date

Formats a timestamp using a format string.

| | |
|---|---|
| **Syntax** | `format_date(value, format)` or `value \| format_date:format` |
| **Parameters** | `value` -- timestamp or date string; `format` -- format pattern |
| **Returns** | String |

Format tokens:

| Token | Meaning | Example |
|-------|---------|---------|
| `Y` | Four-digit year | `2025` |
| `m` | Month (zero-padded) | `03` |
| `d` | Day (zero-padded) | `07` |
| `H` | Hour, 24-hour (zero-padded) | `14` |
| `i` | Minutes (zero-padded) | `05` |
| `s` | Seconds (zero-padded) | `09` |

All values are UTC.

```
{{ created_at | format_date:"Y-m-d" }}
{{ updated_at | format_date:"d/m/Y H:i" }}
```

### time_ago

Returns a human-readable relative time string ("3 days ago", "in 2 hours").

| | |
|---|---|
| **Syntax** | `time_ago(value)` or `value \| time_ago` |
| **Parameters** | `value` -- timestamp or date string |
| **Returns** | String. Returns "just now" for differences under 60 seconds. |

Units used: minute, hour, day, month, year.

```
{{ created_at | time_ago }}
```

### days_since

Returns the number of whole days between a timestamp and now.

| | |
|---|---|
| **Syntax** | `days_since(value)` or `value \| days_since` |
| **Parameters** | `value` -- timestamp or date string |
| **Returns** | Number. Returns `0` if the value cannot be parsed. |

```
{{ published_at | days_since }} days old
```

### is_past

Tests whether a timestamp is in the past.

| | |
|---|---|
| **Syntax** | `is_past(value)` or `value \| is_past` |
| **Parameters** | `value` -- timestamp or date string |
| **Returns** | Boolean |

```
{{ if deadline | is_past }}Expired{{ endif }}
```

### is_future

Tests whether a timestamp is in the future.

| | |
|---|---|
| **Syntax** | `is_future(value)` or `value \| is_future` |
| **Parameters** | `value` -- timestamp or date string |
| **Returns** | Boolean |

```
{{ if event_date | is_future }}Upcoming{{ endif }}
```

### year

Extracts the four-digit year from a timestamp.

| | |
|---|---|
| **Syntax** | `year(value)` or `value \| year` |
| **Parameters** | `value` -- timestamp or date string |
| **Returns** | String (the year), or empty string if unparseable |

```
Copyright {{ created_at | year }}
```

---

## Array and Utility Functions

### count

Returns the length of an array or string. Identical to `length` but conventionally used for arrays.

| | |
|---|---|
| **Syntax** | `count(value)` or `value \| count` |
| **Parameters** | `value` -- an array or string |
| **Returns** | Number. Returns `0` for non-array, non-string values. |

```
{{ posts | count }} posts
```

### first

Returns the first element of an array.

| | |
|---|---|
| **Syntax** | `first(array)` or `array \| first` |
| **Parameters** | `array` -- the input array |
| **Returns** | The first element, or `null` if the array is empty or not an array. |

```
{{ tags | first }}
```

### last

Returns the last element of an array.

| | |
|---|---|
| **Syntax** | `last(array)` or `array \| last` |
| **Parameters** | `array` -- the input array |
| **Returns** | The last element, or `null` if the array is empty or not an array. |

```
{{ breadcrumbs | last }}
```

### reverse

Reverses the order of an array. Does not modify the original.

| | |
|---|---|
| **Syntax** | `reverse(array)` or `array \| reverse` |
| **Parameters** | `array` -- the input array |
| **Returns** | A new array in reverse order. Returns an empty array for non-array inputs. |

```
{{ items | reverse }}
```

### sort

Sorts an array alphabetically by string comparison. Does not modify the original.

| | |
|---|---|
| **Syntax** | `sort(array)` or `array \| sort` |
| **Parameters** | `array` -- the input array |
| **Returns** | A new sorted array. Returns an empty array for non-array inputs. |

```
{{ tags | sort }}
```

### unique

Removes duplicate values from an array.

| | |
|---|---|
| **Syntax** | `unique(array)` or `array \| unique` |
| **Parameters** | `array` -- the input array |
| **Returns** | A new array with duplicates removed (using Set-based deduplication). |

```
{{ categories | unique }}
```

### slice

Extracts a portion of an array.

| | |
|---|---|
| **Syntax** | `slice(array, start, length?)` or `array \| slice:start:length` |
| **Parameters** | `array` -- the input array; `start` -- starting index; `length` -- number of elements (optional, defaults to rest of array) |
| **Returns** | A new array. Returns an empty array for non-array inputs. |

```
{{ items | slice:0:5 }}
{{ items | slice:2 }}
```

### empty

Tests whether a value is "empty-like" (null, empty string, `"0"`, `"false"`, `false`, `0`, or empty array).

| | |
|---|---|
| **Syntax** | `empty(value)` or `value \| empty` |
| **Parameters** | `value` -- the value to test |
| **Returns** | Boolean |

```
{{ if items | empty }}No items{{ endif }}
```

### defined

Tests whether a value is non-null. A value of `""` (empty string) is considered defined.

| | |
|---|---|
| **Syntax** | `defined(value)` or `value \| defined` |
| **Parameters** | `value` -- the value to test |
| **Returns** | Boolean |

```
{{ if subtitle | defined }}{{ subtitle }}{{ endif }}
```

### in_list

Tests whether a value exists in a comma-separated list string.

| | |
|---|---|
| **Syntax** | `in_list(needle, haystack)` or `needle \| in_list:haystack` |
| **Parameters** | `needle` -- the value to search for; `haystack` -- a comma-separated string of values |
| **Returns** | Boolean. Comparison is done after trimming whitespace from each list item. |

```
{{ if status | in_list:"draft,review,pending" }}Not published{{ endif }}
```

---

## Function Summary

| Function | Category | Description |
|----------|----------|-------------|
| `truncate` | String | Truncate to length with suffix |
| `split` | String | Split string into array |
| `join` | String | Join array into string |
| `trim` | String | Remove leading/trailing whitespace |
| `uppercase` | String | Convert to uppercase |
| `lowercase` | String | Convert to lowercase |
| `capitalize` | String | Capitalize first character |
| `replace` | String | Replace all occurrences |
| `contains` | String | Test for substring |
| `starts_with` | String | Test for prefix |
| `length` | String | String or array length |
| `default` | String | Fallback for empty values |
| `slug` | String | URL-friendly slug |
| `prepend` | String | Prepend a string |
| `append` | String | Append a string |
| `nl2br` | String | Newlines to `<br>` tags |
| `md` | String | Basic Markdown to HTML |
| `match` | String | Pattern matching |
| `regex` | String | Regular expression test |
| `regex_capture` | String | Regex capture group extraction |
| `coalesce` | String | First non-empty value |
| `clamp` | Number | Constrain to range |
| `round` | Number | Round to decimal places |
| `floor` | Number | Round down |
| `ceil` | Number | Round up |
| `abs` | Number | Absolute value |
| `min` | Number | Smaller of two numbers |
| `max` | Number | Larger of two numbers |
| `add` | Number | Addition |
| `sub` | Number | Subtraction |
| `mult` | Number | Multiplication |
| `div` | Number | Division (safe) |
| `number_format` | Number | Format with separators |
| `percent` | Number | Calculate percentage |
| `int` | Number | Truncate to integer |
| `float` | Number | Convert to float |
| `bool` | Number | Convert to boolean |
| `format_date` | Date | Format timestamp |
| `time_ago` | Date | Relative time string |
| `days_since` | Date | Days elapsed |
| `is_past` | Date | Test if in the past |
| `is_future` | Date | Test if in the future |
| `year` | Date | Extract year |
| `count` | Array | Array/string length |
| `first` | Array | First element |
| `last` | Array | Last element |
| `reverse` | Array | Reverse order |
| `sort` | Array | Sort alphabetically |
| `unique` | Array | Remove duplicates |
| `slice` | Array | Extract sub-array |
| `empty` | Array | Test for empty-like value |
| `defined` | Array | Test for non-null |
| `in_list` | Array | Test membership in CSV list |
