# Routing Rules

HTX uses file-system routing where the directory structure of your template files directly determines the URL paths of your site. There is no separate routing configuration file.

## File-System Routing

Every `.html` file in the pages directory corresponds to a URL. The file path relative to the pages root becomes the URL path, with the `.html` extension stripped.

| File Path                      | URL                     |
|--------------------------------|-------------------------|
| `pages/index.html`            | `/`                     |
| `pages/about.html`            | `/about`                |
| `pages/blog/index.html`       | `/blog`                 |
| `pages/blog/archive.html`     | `/blog/archive`         |
| `pages/contact.html`          | `/contact`              |

Files named `index.html` resolve to the directory path without a trailing segment. This is the only special filename in the routing system.

---

## Dynamic Segments

Square brackets in a filename or directory name create a dynamic route segment that matches any value. The matched value is captured as a route parameter.

| File Path                           | URL Pattern              | Parameter      |
|-------------------------------------|--------------------------|----------------|
| `pages/blog/[slug].html`           | `/blog/:slug`            | `route.slug`   |
| `pages/users/[id].html`            | `/users/:id`             | `route.id`     |
| `pages/[category]/[slug].html`     | `/:category/:slug`       | `route.category`, `route.slug` |

Dynamic segments match a single path component. The segment `[slug]` matches `my-post` but does not match `my/nested/post`.

### Catch-All Segments

A segment prefixed with `...` matches one or more remaining path components.

| File Path                          | URL Pattern              | Parameter         |
|------------------------------------|--------------------------|-------------------|
| `pages/docs/[...path].html`       | `/docs/*`                | `route.path`      |

The captured value for a catch-all segment is the full remaining path as a string, including slashes. For the URL `/docs/api/v2/users`, `route.path` would be `api/v2/users`.

### Accessing Route Parameters

Route parameters are available in templates through the `route.*` expression scope.

```html
<htx htx:type="post" htx:slug="{{ route.slug }}">
  <h1>__title__</h1>
</htx>
```

```html
<nav>
  <a href="/{{ route.category }}">Back to {{ route.category }}</a>
</nav>
```

---

## Route Exclusions

Not every file in the project becomes a routable URL. The following naming conventions exclude files from the router.

### Underscore Prefix

Files and directories starting with an underscore are excluded. This convention is used for layout files, shared fragments, and internal templates.

```
pages/_layout.html        ← excluded
pages/_shared/header.html ← excluded (entire directory)
pages/about.html          ← routed to /about
```

### Reserved Directories

The following top-level directories are never routed, regardless of their contents:

| Directory      | Purpose                                      |
|----------------|----------------------------------------------|
| `partials/`    | Reusable template fragments for `htx:include` |
| `components/`  | Component definitions for `htx:component`     |
| `public/`      | Static files served directly                   |

```
partials/header.html     ← not routable, used via htx:include
components/card.html     ← not routable, used via htx:component
public/style.css         ← served as static file at /style.css
pages/index.html         ← routed to /
```

### Summary of Exclusion Rules

| Pattern             | Excluded? | Reason                    |
|---------------------|-----------|---------------------------|
| `_filename.html`    | Yes       | Underscore prefix         |
| `_directory/`       | Yes       | Underscore prefix         |
| `partials/**`       | Yes       | Reserved directory        |
| `components/**`     | Yes       | Reserved directory        |
| `public/**`         | Yes       | Static file directory     |
| `pages/about.html`  | No        | Normal routed page        |

---

## Resolution Priority

When multiple files could match a given URL, the router resolves ambiguity using a fixed priority order.

| Priority | Match Type      | Example File                  | Matches              |
|----------|-----------------|-------------------------------|----------------------|
| 1 (highest) | Exact match | `pages/blog/featured.html`    | `/blog/featured`     |
| 2        | Static segment   | `pages/blog/archive.html`     | `/blog/archive`      |
| 3        | Dynamic segment  | `pages/blog/[slug].html`      | `/blog/anything`     |
| 4 (lowest) | Catch-all     | `pages/blog/[...path].html`   | `/blog/a/b/c`        |

If two files have the same specificity (e.g., two dynamic segments at the same path depth), the behavior is undefined. Avoid overlapping dynamic routes.

---

## Resolution Algorithm

The router resolves a URL to a template file in four steps.

### Step 1: Normalize the Path

The incoming URL path is cleaned:

- Leading and trailing slashes are trimmed.
- Double slashes are collapsed to single slashes.
- Percent-encoded characters are decoded.
- The result is split into path segments.

`/blog//my-post/` becomes `["blog", "my-post"]`.

### Step 2: Walk the File Tree

Starting from the pages root, the router walks the directory tree segment by segment. At each level, it checks for matches in this order:

1. An exact-match file or directory with the segment name.
2. A dynamic-segment file or directory (bracket-delimited name).
3. A catch-all file (bracket-delimited with `...` prefix).

When an exact match exists at any level, it takes priority over dynamic matches at the same level. The router backtracks if an exact match at one level leads to no valid match at a deeper level.

### Step 3: Parameter Extraction

For each dynamic or catch-all segment in the matched path, the router extracts the corresponding value from the URL and binds it to the parameter name.

URL `/blog/my-post` matched against `pages/blog/[slug].html`:

```
route.slug = "my-post"
```

URL `/docs/api/v2/users` matched against `pages/docs/[...path].html`:

```
route.path = "api/v2/users"
```

### Step 4: Template Selection

The matched file is loaded and passed to the template engine for rendering. If no file matches the URL, the router returns a 404 response. If a custom `pages/404.html` file exists, it is rendered for the 404 response.

---

## Static File Serving

Files in the `public/` directory are served as static assets. The router checks for a static file match before attempting template resolution.

| File                          | Served At               |
|-------------------------------|-------------------------|
| `public/style.css`           | `/style.css`            |
| `public/js/app.js`           | `/js/app.js`            |
| `public/images/logo.png`     | `/images/logo.png`      |
| `public/favicon.ico`         | `/favicon.ico`          |

Static files are served with appropriate MIME types based on file extension. No template processing occurs on static files.

If a static file path and a template route would resolve to the same URL, the static file takes precedence.

---

## Path Security

The router includes protections against directory traversal and other path-based attacks.

### Traversal Prevention

Path segments containing `..` are rejected. The router never resolves a path that would escape the project root.

```
/blog/../../etc/passwd  → 400 Bad Request
/blog/../secret.html    → 400 Bad Request
```

### Null Byte Rejection

Paths containing null bytes (`%00`) are rejected immediately.

### Segment Length Limits

Individual path segments are limited to 255 characters. The total URL path is limited to 2048 characters. Paths exceeding these limits receive a 414 response.

### Allowed Characters

Route parameter values captured from dynamic segments are URL-decoded but not further sanitized. When using route parameters in data queries (e.g., `htx:slug="{{ route.slug }}"`), the data adapter is responsible for safe handling. The engine does not perform SQL injection prevention or similar data-layer sanitization since it operates above the data layer.

---

## Examples

### Blog with Index and Single Post

```
pages/
  blog/
    index.html       → /blog
    [slug].html       → /blog/my-first-post, /blog/hello-world, etc.
```

In `pages/blog/index.html`:

```html
<htx htx:type="post" htx:howmany="10" htx:order="newest">
  <htx:each>
    <a href="/blog/__slug__">__title__</a>
  </htx:each>
</htx>
```

In `pages/blog/[slug].html`:

```html
<htx htx:type="post" htx:slug="{{ route.slug }}">
  <article>
    <h1>__title__</h1>
    <div>__body_html__</div>
  </article>
</htx>
```

### Documentation with Catch-All

```
pages/
  docs/
    index.html           → /docs
    [...path].html        → /docs/getting-started, /docs/api/reference, etc.
```

In `pages/docs/[...path].html`:

```html
<htx htx:type="doc" htx:slug="{{ route.path }}">
  <htx:include path="partials/doc-nav.html" />
  <main>__body_html__</main>
</htx>
```
