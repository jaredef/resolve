---
title: Layouts, Includes, and Components
status: published
section: core-concepts
section_label: Core Concepts
summary: Composition primitives for reusable UI without a frontend framework.
created_at: 2026-03-28 00:07:00
---

HTX provides four composition primitives that let you share markup across pages, extract reusable fragments, and build parameterized components. All four are resolved at render time before expression evaluation and content hydration.

## Processing Order

When a request hits a page, the engine processes composition directives in this order:

1. **Includes** -- `<htx:include>` tags are expanded first, inlining partial files
2. **Components** -- `<htx:component>` tags are resolved, rendering component templates with props and slots
3. **Let bindings** -- `<htx:let>` tags are evaluated, adding variables to the template data
4. **DSL blocks** -- Content query blocks (`<htx>...</htx>`) are executed
5. **Expressions and hydration** -- `\{{ }}` expressions and `__field__` placeholders are evaluated
6. **Layouts** -- The page content is wrapped in `_layout.htx` files from innermost to outermost
7. **Post-layout includes** -- Any `<htx:include>` tags introduced by layout files are expanded

This order matters. Because layouts wrap the content last, layout files can contain `<htx:include>` tags that reference shared partials (navigation, footer, etc.).

---

## Layouts

Layout files provide shared page shells. A file named `_layout.htx` in any template directory applies to all pages in that directory and its subdirectories.

### The `__content__` Placeholder

Every layout file must contain the literal string `__content__`. The engine replaces it with the rendered page content:

```html
<!-- templates/_layout.htx -->
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Site</title>
</head>
<body>
    <htx:include src="/partials/_nav.htx" />
    <main>
        __content__
    </main>
    <htx:include src="/partials/_footer.htx" />
</body>
</html>
```

When a user visits `/about`, the engine renders `templates/about.htx`, then replaces `__content__` in the layout with the result.

### Nested Layouts

Layouts nest from the page's directory upward to the site root. Each directory level can have its own `_layout.htx`. The engine collects all layout files from the page's directory up to the root, then wraps the content from innermost to outermost:

```
templates/
  _layout.htx              <-- Root layout (outermost)
  admin/
    _layout.htx            <-- Admin layout (wraps admin pages)
    posts/
      index.htx            <-- Page content
```

For a request to `/admin/posts`:

1. `templates/admin/posts/index.htx` is rendered
2. The result is inserted into `templates/admin/_layout.htx` at `__content__`
3. That result is inserted into `templates/_layout.htx` at `__content__`

The admin layout does not need a full HTML document. It only needs to provide the admin-specific shell:

```html
<!-- templates/admin/_layout.htx -->
<div class="admin-shell">
    <aside class="admin-nav">
        <h3>Admin</h3>
        <ul>
            <li><a href="/admin">Dashboard</a></li>
            <li><a href="/admin/posts">Posts</a></li>
        </ul>
    </aside>
    <div class="admin-content">
        __content__
    </div>
</div>
```

### Stopping at the Document Root

Layout collection stops early when a layout file contains `<!doctype html` (case-insensitive). This prevents walking past the root HTML shell. In practice, only the top-level `_layout.htx` should contain the doctype declaration.

### HTMX Fragment Responses

When the request includes an `HX-Request` header (indicating an htmx partial request), the engine skips the outermost layout if it contains a doctype. This returns just the page fragment without the full HTML shell, which is what htmx expects.

### Layout Files Are Not Routable

Files named `_layout.htx` are excluded from routing. A request to `/_layout` returns a 404.

---

## Includes

The `<htx:include>` directive inlines the contents of another file at the point of use. It is the simplest composition primitive -- a direct textual substitution.

### Syntax

```html
<htx:include src="/partials/_nav.htx" />
```

The `src` attribute specifies the file to include. The tag must be self-closing (ending with `/>`) or use the `>` form without a closing tag.

### Path Resolution

Include paths are resolved using two strategies depending on whether the path starts with `/`:

| Path Style | Resolution |
|------------|------------|
| `/partials/_nav.htx` | Absolute -- resolved from the site root (templates directory) |
| `shared/note.htx` | Relative -- resolved from the directory of the current file |

Absolute paths always start with `/` and are anchored to the templates root directory. Relative paths are resolved from the directory containing the file that has the `<htx:include>` tag.

### Security

The include resolver enforces two safety constraints:

- **Path traversal prevention:** Include paths that escape the site root (e.g., `../../etc/passwd`) throw an error.
- **Circular include detection:** If file A includes file B which includes file A, the engine throws an error with the full circular chain.

The maximum include depth is **10 levels**. Exceeding this limit throws an error.

### Includes in Layouts

Layout files can contain `<htx:include>` tags. These are expanded after the layout wrapping step, so a root layout can include shared navigation and footer partials:

```html
<!-- templates/_layout.htx -->
<!doctype html>
<html>
<body>
    <htx:include src="/partials/_nav.htx" />
    __content__
    <htx:include src="/partials/_footer.htx" />
</body>
</html>
```

### Naming Convention

Include files are conventionally placed in a `partials/` directory and prefixed with an underscore. Both the `partials` directory and underscore-prefixed files are excluded from routing, so they cannot be accessed as standalone pages.

---

## Components

Components are reusable template fragments that accept props and slots. They are more powerful than includes because they support parameterization and content projection.

### Basic Usage

```html
<htx:component src="components/btn.htx" variant="danger">
  Delete
</htx:component>
```

The `src` attribute is required and specifies the component file path, resolved the same way as include paths (from the templates root). All other attributes are passed as props to the component.

### Self-Closing Components

Components with no children can be self-closing:

```html
<htx:component src="components/hr.htx" />
```

### Component Files

A component file is a regular `.htx` file. It can optionally declare its props using an `<htx:props>` block at the top of the file:

```html
<!-- components/card.htx -->
<htx:props>
title
variant = "default"
</htx:props>
<div class="card card-\{{ variant }}">
    <h3>\{{ title }}</h3>
    <div class="card-body">
        <htx:slot>No content provided.</htx:slot>
    </div>
</div>
```

### Props Declaration

The `<htx:props>` block declares the props a component accepts. Each line declares one prop:

| Syntax | Meaning |
|--------|---------|
| `title` | Required prop (no default) |
| `variant = "default"` | Optional prop with a string default |
| `disabled = false` | Optional prop with a boolean default |
| `max = 100` | Optional prop with a numeric default |

Lines starting with `#` or `//` are treated as comments and ignored. Blank lines are skipped.

If a required prop is not provided by the caller, the engine throws an error. If an optional prop is not provided, its default value is used. Extra props not declared in `<htx:props>` are still passed through to the component.

The `<htx:props>` block is stripped from the component's output.

### Slots

Slots define where the component's children are inserted. A component uses `<htx:slot>` to mark insertion points.

**Default slot** -- captures all children not inside a named `<htx:fill>`:

```html
<!-- Component definition -->
<button class="\{{ variant }}"><htx:slot /></button>

<!-- Usage -->
<htx:component src="components/btn.htx" variant="primary">
  Save Changes
</htx:component>

<!-- Output -->
<button class="primary">Save Changes</button>
```

**Default slot with fallback** -- if the caller provides no children, the fallback content is used:

```html
<!-- Component definition -->
<div class="alert"><htx:slot>Default message</htx:slot></div>

<!-- Usage with no children -->
<htx:component src="components/alert.htx"></htx:component>

<!-- Output -->
<div class="alert">Default message</div>
```

### Named Slots

Components can define multiple named slots using the `name` attribute on `<htx:slot>`. Callers fill named slots using `<htx:fill>` tags:

```html
<!-- components/card.htx -->
<div class="card">
    <div class="card-header">
        <htx:slot name="header" />
    </div>
    <div class="card-body">
        <htx:slot />
    </div>
</div>
```

```html
<!-- Usage -->
<htx:component src="components/card.htx">
    <htx:fill name="header">
        <h2>Card Title</h2>
    </htx:fill>
    This is the card body text.
</htx:component>
```

```html
<!-- Output -->
<div class="card">
    <div class="card-header">
        <h2>Card Title</h2>
    </div>
    <div class="card-body">
        This is the card body text.
    </div>
</div>
```

Named slots can also have fallback content:

```html
<htx:slot name="footer">Default footer text</htx:slot>
```

Content outside any `<htx:fill>` tag goes into the default (unnamed) slot.

### Expression Evaluation in Slots

Expressions inside slot content (`<htx:fill>` or default children) are evaluated in the **parent** scope, not the component scope. This means slot content has access to the calling template's data, not the component's props.

Props and parent data are merged when evaluating the component template itself -- props take precedence.

### Component Nesting

Components can contain other components. The maximum nesting depth is **10 levels**. The engine resolves components iteratively, making multiple passes until no `<htx:component>` tags remain (up to 100 iterations as a safety limit).

### Components Are Not Routable

Files in the `components/` directory are excluded from routing.

---

## Let Bindings

The `<htx:let>` directive declares a template-local variable. The variable is added to the template's data context and is available to all expressions that follow it in the template.

### Syntax

There are two equivalent syntaxes:

**Shorthand syntax** (recommended):

```html
<htx:let greeting = "Hello, World!" />
<htx:let is_admin = role == "admin" ? "yes" : "no" />
<htx:let total = items.length />
```

**Attribute syntax:**

```html
<htx:let name="label" value="name" />
```

In the attribute syntax, `name` is the variable name and `value` is the expression to evaluate. Note that `value` is evaluated as an expression, so `value="name"` resolves the existing variable `name`, not the literal string.

### Expression Evaluation

The value expression is evaluated by the expression engine at the time the `<htx:let>` tag is encountered. This means:

- Variables declared earlier are available to later `<htx:let>` tags (dependency chaining)
- Route params, query params, and other context data are available
- The full expression language (ternary operators, function calls, etc.) can be used

```html
<htx:let is_admin = role == "admin" ? "yes" : "no" />
<htx:let greeting = is_admin == "yes" ? "Welcome back" : "Hello" />
<p>\{{ greeting }}, \{{ name }}!</p>
```

### Tag Removal

The `<htx:let>` tag is removed from the output. If the tag is followed by a newline, that newline is also stripped to avoid leaving blank lines.

---

## Multi-Directory Resolution

All four composition primitives support the `TemplateResolver` chain. When the engine is configured with multiple template directories, includes, components, and layouts are resolved by checking each directory in order:

```ts
const resolver = new TemplateResolver([
  "app/templates",       // Project-specific (checked first)
  "theme/templates",     // Theme (fallback)
]);
```

This enables override patterns. A project can override a theme's navigation partial by placing its own version at the same relative path in the project templates directory.

For layouts, the chained resolver walks upward from the page's directory, checking each template directory at each level. This means a project can override a specific level's layout while inheriting others from the theme.

---

## Composition Patterns

### Page with Shared Chrome

The most common pattern: a root layout provides the HTML shell, partials provide navigation and footer, and pages provide the content.

```
templates/
  _layout.htx           <!-- HTML shell with __content__ -->
  partials/
    _nav.htx             <!-- Shared navigation -->
    _footer.htx          <!-- Shared footer -->
  index.htx              <!-- Home page content -->
  blog/
    index.htx            <!-- Blog listing -->
    [slug].htx           <!-- Blog detail -->
```

### Section-Specific Layouts

Subdirectories can add their own layout layer for section-specific UI:

```
templates/
  _layout.htx            <!-- HTML shell -->
  docs/
    _layout.htx           <!-- Docs sidebar + content area -->
    getting-started.htx
    api-reference.htx
  admin/
    _layout.htx           <!-- Admin sidebar + content area -->
    index.htx
    posts/
      index.htx
```

### Reusable UI Components

Extract repeated UI patterns into components with props and slots:

```html
<!-- Page using components -->
<htx:component src="components/card.htx" title="Featured Post" variant="highlight">
    <p>This is the card content.</p>
</htx:component>

<htx:component src="components/card.htx" title="Recent Post">
    <p>Another card with the default variant.</p>
</htx:component>
```

### Computed Variables

Use `<htx:let>` to precompute values that are used multiple times or to simplify complex expressions:

```html
<htx:let page_title = query.q ? "Search: " + query.q : "All Posts" />
<htx:let show_filters = query.category ? true : false />

<h1>\{{ page_title }}</h1>
\{{ if show_filters }}
<p>Filtering by: \{{ query.category }}</p>
\{{ endif }}
```

---

## Quick Reference

| Directive | Purpose | Max Depth |
|-----------|---------|-----------|
| `_layout.htx` | Wraps page content in a shared shell | Unlimited (stops at doctype) |
| `<htx:include src="...">` | Inlines a partial file | 10 |
| `<htx:component src="...">` | Renders a parameterized component | 10 |
| `<htx:let name = expr />` | Declares a template-local variable | N/A |
| `<htx:slot />` | Marks where children are inserted (inside components) | N/A |
| `<htx:fill name="...">` | Provides content for a named slot (at call site) | N/A |
| `<htx:props>` | Declares component props with defaults (inside components) | N/A |
