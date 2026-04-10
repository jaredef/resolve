---
title: Routing
status: published
section: core-concepts
section_label: Core Concepts
summary: File-system routing, dynamic segments, catch-all paths, and route exclusions.
created_at: 2026-03-28 00:04:00
---

HTX uses file-system routing. The path to a `.htx` file inside `app/templates/` determines what URL it handles.

## Basic Rules

| File Path | URL |
|-----------|-----|
| `templates/index.htx` | `/` |
| `templates/about.htx` | `/about` |
| `templates/blog/index.htx` | `/blog` |
| `templates/blog/archive.htx` | `/blog/archive` |

The router normalizes the URL path, strips query strings, and looks for matching files in this order:

1. **Exact file match:** `{path}.htx`
2. **Index file match:** `{path}/index.htx`
3. **Dynamic segment match:** Walk the directory tree looking for `[param]` segments
4. **Catch-all match:** Walk parent directories looking for dynamic files that can absorb remaining segments

## Dynamic Segments

Wrap a filename or directory name in square brackets to capture a URL segment as a route parameter:

```
templates/blog/[slug].htx        →  /blog/:slug
templates/admin/posts/[id]/edit.htx  →  /admin/posts/:id/edit
```

Inside the template, route parameters are available as:

- `\{{ route.slug }}` or `\{{ $route.slug }}`
- `__slug__` (hydrator placeholder)
- `\{{ slug }}` (top-level variable)

### Dynamic Directories

Directories can also be dynamic:

```
templates/users/[userId]/posts/index.htx  →  /users/:userId/posts
```

Both `route.userId` and the hydrator placeholder `__userId__` are available in the template.

## Route Exclusions

Certain paths are automatically excluded from routing:

- **Underscore-prefixed segments:** `_layout.htx`, `_anything/`, `partials/_nav.htx`
- **The `partials` directory:** Any path containing a `partials` segment
- **The `public` directory:** Reserved for static assets
- **The `components` directory:** Accessible via `<htx:component>` but not as direct routes

These exclusions prevent layout files, includes, and components from being routable as pages.

## Static Files

Static files in `app/public/` are served before HTX routing. If a request matches a file in the public directory, it is served directly with the appropriate content type.

Supported content types include CSS, JavaScript, JSON, SVG, PNG, JPEG, and WebP.

## Path Security

The router validates that all resolved file paths stay within the site root directory. Path traversal attempts (using `..`) are rejected. This is enforced by the `isWithinRoot()` check on every candidate path.

## Resolution Priority

When multiple matches are possible, the router prefers:

1. Exact static file matches over index files
2. Static paths over dynamic segments
3. Deeper directory matches over shallower catch-all matches

For example, given both `templates/blog/featured.htx` and `templates/blog/[slug].htx`, a request to `/blog/featured` uses the exact match, not the dynamic one.

## Multi-Directory Resolution

The `TemplateResolver` supports multiple template directories. When configured with an array of directories, it checks each one in order and returns the first match. This enables template override patterns where a project-specific directory takes precedence over a shared base.

```ts
const resolver = new TemplateResolver([
  "app/templates",          // Project-specific (checked first)
  "shared/templates",       // Shared base (fallback)
]);
```

## The Router Class

The router is a standalone class with no dependencies on the rest of the engine:

```ts
import { Router } from "@htx/engine";

const router = new Router();
const match = router.resolve("/blog/hello-world", "app/templates");

if (match) {
  console.log(match.filePath);   // "app/templates/blog/[slug].htx"
  console.log(match.params);     // { slug: "hello-world" }
  console.log(match.siteRoot);   // "app/templates"
}
```
