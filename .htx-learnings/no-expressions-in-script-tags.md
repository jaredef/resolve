# Never Put {{ }} Patterns in Script Tags

## The Problem

The HTX expression engine processes the entire template string — including content inside `<script>` tags. If your JavaScript contains `{{ }}` patterns (even in comments), the expression engine will try to evaluate them.

```html
<!-- This will ERROR — engine sees {{ }} as an expression -->
<script>
  // Handle expressions {{ }}
  var pattern = /\{\{(.*?)\}\}/g;
</script>
```

## Why It Happens

The HTX engine is an interpreter that operates on the template as a raw string. It doesn't parse HTML structure — it scans for `{{ }}` patterns anywhere in the template text. Script tags are not treated differently from any other content.

## The Fix

Move JavaScript to external files in the `public/` directory:

```html
<!-- Good: JS in external file, expression engine never sees it -->
<script src="/js/app.js" defer></script>
```

The engine only processes `.htx` template files. Static files served from `public/` are never interpreted.

## If You Must Inline

Use `\{{ }}` (backslash-escaped) if you absolutely need the pattern inline:

```html
<script>
  var pattern = /\{\{(.*?)\}\}/g; // escaped with backslash prefix
</script>
```

But this is fragile — prefer external files.
