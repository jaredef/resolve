# Phase 9 — Runtime: Router

**Status:** NOT STARTED
**Depends on:** Phase 1 (scaffolding)

## Objectives

Port the file-system router to TypeScript. The router maps URL paths to `.htx` template files with support for dynamic segments.

## Source Reference

- **PHP source:** `packages/htx-engine/src/Runtime/Router.php` (~282 LOC)

## Files to Create

### `packages/htx-engine/src/runtime/router.ts`

**Route resolution priority (same as PHP):**
1. Exact file match: `/about` → `about.htx`
2. Directory index: `/blog` → `blog/index.htx`
3. Dynamic file: `/blog/hello-world` → `blog/[slug].htx` with `params.slug = "hello-world"`
4. Dynamic directory walk: `/posts/42/comments` → `posts/[id]/comments.htx` with `params.id = "42"`
5. Catch-all with multi-segment slug

**Exclusions:**
- Underscore-prefixed files: `_layout.htx`, `_error.htx`
- `partials/` directory
- `public/` directory

**File I/O:**
- Use `node:fs` synchronous methods: `existsSync`, `readdirSync`, `statSync`
- Bun supports these natively, no async needed

**Public API:**
```typescript
interface RouteMatch {
  filePath: string
  params: Record<string, string>
}

class Router {
  constructor(templateDir: string)
  resolve(path: string): RouteMatch | null
}
```

**TypeScript-specific notes:**
- PHP's `scandir()` → `readdirSync()`
- PHP's `file_exists()` → `existsSync()`
- PHP's `is_dir()` → `statSync().isDirectory()`
- PHP's `DIRECTORY_SEPARATOR` → `path.sep` (or just use `/` since Bun normalizes)
- Use `node:path` for `join`, `basename`, `dirname`, `extname`

## Files to Create (Tests)

### `packages/htx-engine/tests/router.test.ts`

Port from PHP `RouterTest.php`:
- Exact file match
- Directory index fallback
- Dynamic segment extraction (`[slug]`, `[id]`)
- Dynamic directory segments
- Multi-segment catch-all
- Exclusion of `_` prefixed files
- Exclusion of `partials/` and `public/`
- No match → null
- Root path `/` → `index.htx`
- Trailing slash normalization

**Test setup:** Create temporary directory structures with `mkdtempSync` and populate with dummy `.htx` files.

## Validation

- [ ] All 5 resolution strategies work correctly
- [ ] Dynamic params extracted accurately
- [ ] Exclusions enforced
- [ ] Path normalization (trailing slashes, double slashes)
- [ ] All tests pass

## Review Comments

_Reviewed by Claude after building the complete PHP implementation._

### Security: Path Traversal Prevention

The router takes a URL path and maps it to a filesystem path. This is a classic path traversal attack vector. The plan doesn't mention sanitization. Add explicit validation:

- Reject paths containing `..`
- Reject paths containing null bytes
- Normalize the resolved path and verify it starts with the `templateDir` prefix

```typescript
const resolved = path.resolve(templateDir, relative)
if (!resolved.startsWith(path.resolve(templateDir))) {
  return null // path traversal attempt
}
```

This is critical for production use. Add a test case for `/../../../etc/passwd`.

### Route Caching

File-system lookups (`existsSync`, `readdirSync`, `statSync`) on every request add latency. The dev server should skip caching (for hot reload), but the production server (Phase 17) should cache the route table. Consider building the cache as an optional constructor parameter:

```typescript
class Router {
  constructor(templateDir: string, options?: { cache?: boolean })
}
```

### Static File Serving

The plan excludes `public/` from routing but doesn't describe how static files get served. In the PHP build, the RequestHandler checks for static file requests before hitting the router. The TypeScript plan should clarify whether static file serving is the router's responsibility or the RequestHandler's (it should be the RequestHandler's).

### Test Setup: Temp Directories

Using `mkdtempSync` for test directories is correct. Make sure there's cleanup in `afterEach` — the PHP tests had a helper that recursively deleted temp dirs. In Bun, you can use `fs.rmSync(dir, { recursive: true })`.

## Execution Log

_(empty — not yet executed)_

## Independent review notes (2026-03)

- Match PHP [`Router::resolve($urlPath, string|TemplateResolver $siteRoot)`](../../hypermedia-app-php/packages/htx-engine/src/Runtime/Router.php): support **TemplateResolver / multi-root** lookup, not only `constructor(templateDir: string)`. Path traversal hardening remains mandatory (see prior review).

## Port review addendum (2026-03-28)

- The biggest risk here is under-scoping the router into a simple directory matcher when PHP treats template resolution as a broader concern. That decision should be resolved before code starts.
- I would make security tests first-class in this phase: traversal, invalid segments, and ambiguous matches should be part of the core plan, not optional hardening.
