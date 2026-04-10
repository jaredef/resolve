# htxlang Agent Prompt Suite

**Purpose:** A sequence of 17 prompts that guides an AI agent to build a fully conformant htxlang engine in any target language.

**Usage:** Set {TARGET_LANGUAGE}, {HTTP_FRAMEWORK}, and {DB_DRIVER} before beginning. Execute prompts sequentially. Each prompt builds on the output of previous prompts.

---

## Prompt 0: System Context

```
You are building a conformant htxlang engine in {TARGET_LANGUAGE}.

htxlang is a specification for server-side HTML template resolution derived from the PRESTO architectural style (Progressive Representational State Transfer with On-demand code).

The engine reads source representations (.htx files): HTML documents augmented with directives in the htx: server namespace. It resolves all server directives and outputs pure HTML with no server artifacts remaining.

Core principles:
- The htx: namespace is server territory. Standard <script> elements are client territory.
- The engine is a RESOLVER, not a compiler. HTML in, HTML out. Same medium.
- All credentials (tokens, signed URLs) use HMAC-SHA256 with a server secret.
- The resolution pipeline has 22 stages executed in a specific order.

You will build the engine component by component. Each prompt gives you the exact algorithm, the exact patterns, and verification criteria. Translate the pseudocode to idiomatic {TARGET_LANGUAGE}. Do not add features not specified. Do not skip requirements marked MUST.

Use {HTTP_FRAMEWORK} for the HTTP server. Use {DB_DRIVER} for the SQLite adapter.
```

---

## Prompt 1: Types and HTTP Server

```
Build the foundation: type definitions and HTTP server scaffold.

TYPES TO DEFINE:

HtxRequest:
  method: string
  path: string
  headers: map<string, string>
  body: map<string, any>
  query: map<string, string>
  cookies: map<string, string>
  raw: native request object (optional)

HtxResponse:
  status: integer
  body: string
  headers: map<string, string>
  cookies: array<string>

  Static constructors:
    html(body, status=200) — sets Content-Type: text/html; charset=UTF-8
    json(data, status=200) — serializes data, sets Content-Type: application/json
    redirect(location, status=302) — sets Location header
    notFound() — 404 with "Not Found" body

RouteMatch:
  filePath: string
  params: map<string, string>

HTTP SERVER:

Create a server that:
1. Listens on configurable host:port
2. Parses incoming requests into HtxRequest objects
3. Parses POST bodies (JSON and form-urlencoded)
4. Parses query parameters from URL
5. Forwards to a RequestHandler.handle(request) function
6. Converts HtxResponse to native HTTP response (including Set-Cookie headers)

Also create a StaticServer that:
1. Takes a public directory path
2. For incoming paths, checks if a file exists at publicDir + path
3. Returns the file with appropriate Content-Type based on extension:
   .html=text/html, .css=text/css, .js=application/javascript,
   .json=application/json, .png=image/png, .jpg=image/jpeg,
   .svg=image/svg+xml, .woff2=font/woff2, .wasm=application/wasm
4. Returns null if no file matches

VERIFY: Server starts, responds 200 to a request with body "Hello".
```

---

## Prompt 2: Router

```
Build the filesystem router. Maps URL paths to .htx template files.

INPUT: A URL path string and a template directory path.
OUTPUT: A RouteMatch (filePath + params) or null.

ALGORITHM:

1. Normalize: if path is "/", use "/index". Remove trailing slash.

2. Exact file match: check if templateDir + normalized + ".htx" exists as a file.
   If yes, return it with empty params.

3. Directory index: check if templateDir + normalized + "/index.htx" exists.
   If yes, return it with empty params.

4. Dynamic segments: split path into segments, walk the directory tree.

DYNAMIC WALK:

Function walkDynamic(dir, segments, index, params):
  If index >= segments.length:
    If dir/index.htx exists: return (dir/index.htx, params)
    Return null

  segment = segments[index]
  isLast = (index == segments.length - 1)

  If isLast and dir/segment.htx exists: return it with params
  If dir/segment/ is a directory: recurse into it

  For each entry in dir:
    If entry matches pattern [paramName] or [paramName].htx:
      If it's a .htx file and isLast: return (file, params + {paramName: segment})
      If it's a directory: recurse with params + {paramName: segment}

  Return null

VERIFY:
- "/" resolves to templates/index.htx
- "/about" resolves to templates/about.htx
- "/blog/hello-world" resolves to templates/blog/[slug].htx with params.slug = "hello-world"
- "/nonexistent" returns null
```

---

## Prompt 3: Template Reader and Include Resolver

```
Build the template reader and include resolver.

TEMPLATE READER:

A component that:
1. Takes one or more template directory paths
2. resolve(relativePath) — searches directories in order, returns first match or null
3. getPrimary() — returns the first directory
4. getDirs() — returns all directories

INCLUDE RESOLVER:

Expands <htx:include src="path" /> directives.

PATTERN: /<htx:include\s+src\s*=\s*"([^"]+)"\s*\/>/g

ALGORITHM:

Function expand(content, filePath, reader, depth=0):
  If depth > 10: return content with warning
  Replace all matches of PATTERN with:
    resolved = resolvePath(src, filePath, reader)
    If null: return "<!-- include not found: {src} -->"
    includeContent = readFile(resolved)
    return expand(includeContent, resolved, reader, depth + 1)

Path resolution:
  If src starts with "/": resolve from template root (reader.resolve)
  If src contains "..": return null (SECURITY: traversal prevention)
  Otherwise: resolve relative to the including file's directory
  Fallback: try reader.resolve(src)

VERIFY:
- <htx:include src="/partials/nav.htx" /> expands to nav content
- <htx:include src="shared/note.htx" /> resolves relative to current file
- Paths with ".." are rejected
- Missing includes produce HTML comments
- Recursive includes work up to depth 10
```

---

## Prompt 4: Component Resolver

```
Build the component resolver. Expands <htx:component> directives.

PATTERNS:

Component tag:
/<htx:component\s+src\s*=\s*"([^"]+)"([^>]*)(?:\/>|>([\s\S]*?)<\/htx:component>)/g

Props block:
/<htx:props>([\s\S]*?)<\/htx:props>/

Script block:
/<htx:script>([\s\S]*?)<\/htx:script>/g

ALGORITHM:

Function resolve(content, data, depth, scriptCollector, reader, sourceFile):
  If depth > 10: return content
  Replace all component matches with:

    1. Read component file
    2. Parse htx:props block for declared defaults:
       Each line: "key = value" or 'key = "value"'
    3. Parse passed props from component tag attributes (exclude "src")
    4. Merge: passed props override declared defaults
    5. Replace {{ propName }} in component template with prop values
    6. If tag has inner content, replace <htx:slot /> with that content
    7. If component has <htx:script> blocks:
       a. Extract all script bodies
       b. Generate unique ID: "htx-c" + scriptCollector.length
       c. Add data-htx-id="ID" to first HTML element in component
       d. Wrap scripts in IIFE with element binding:
          (function(){
            const el = document.querySelector('[data-htx-id="ID"]');
            if (!el) return;
            SCRIPT_BODY
          })();
       e. Push wrapped script to scriptCollector
    8. Remove htx:script tags from template
    9. Recurse for nested components

VERIFY:
- Component renders with prop values
- Default props work when not passed
- Slot content is injected
- Scripts are extracted, scoped with data-htx-id, and wrapped in IIFE
- Nested components resolve
```

---

## Prompt 5: Expression Engine

```
Build the expression engine. Evaluates <htx:v> and {htx:...} expressions.

PATTERNS:

htx:v tags:
/<htx:v(\s+raw)?(?:\s+path\s*=\s*"([^"]*)")?\s*(?:\/>|>([\s\S]*?)<\/htx:v>)/g

Attribute expressions:
/\{htx:([^}]+)\}/g

Script blocks (protect):
/<script(\s[^>]*)?>[\s\S]*?<\/script>/gi

Raw blocks (protect):
/<htx:raw(?:\s[^>]*)?>[\s\S]*?<\/htx:raw>/gi

ALGORITHM:

Function evaluate(template, data):
  1. PROTECT: Replace all script and raw blocks with markers. Store originals.
  2. EVALUATE htx:v tags:
     - Extract expression from path attribute or body content
     - Resolve: call resolvePath(expression, data)
     - If raw flag: return value as-is
     - Otherwise: HTML-escape the value
  3. EVALUATE {htx:...} in attributes:
     - Resolve expression, HTML-escape result
  4. RESTORE: Replace markers with original script/raw blocks
  Return result

Function resolvePath(path, data):
  Split path by "."
  Walk into data object one key at a time
  If any step is null/undefined: return undefined

Pipe functions (expression contains "|"):
  Split on "|". Left side is path, right side is pipe name.
  Resolve path, then apply pipe:
    uppercase: string to upper case
    lowercase: string to lower case
    capitalize: first char upper
    trim: remove whitespace
    length: array length or string length
    json: JSON.stringify

HTML escaping (MUST for non-raw output):
  & → &amp;   < → &lt;   > → &gt;   " → &quot;

Function hasExpressions(template):
  Strip script and raw blocks, then test for htx:v or {htx:} patterns

VERIFY:
- <htx:v>name</htx:v> with data {name: "Jared"} → "Jared"
- <htx:v>name | uppercase</htx:v> → "JARED"
- {htx:slug} in href attribute resolves
- <script> content with { characters is untouched
- <htx:raw> content is untouched
- <htx:v raw>html</htx:v> outputs unescaped
- <htx:v>missing.path</htx:v> → empty string
- <htx:v>xss</htx:v> with value "<script>" → "&lt;script&gt;"
```

---

## Prompt 6: Data Resolver and SQLite Adapter

```
Build the data resolver and SQLite adapter.

CONTENT ADAPTER INTERFACE:

  query(options) → array of records
    options: type, where, order, limit, offset

  get(type, identifier) → single record or null
    identifier: map of field → value (e.g., {slug: "hello"})

  create(type, data) → created record
  update(type, id, data) → boolean
  delete(type, id) → boolean

SQLITE ADAPTER:

Implements the adapter interface using SQLite.
- "type" maps to table name (sanitize: allow only [a-zA-Z0-9_])
- query() builds: SELECT * FROM {type} [WHERE {where}] [ORDER BY {order}] [LIMIT ?] [OFFSET ?]
- get() builds: SELECT * FROM {type} WHERE {conditions} LIMIT 1
- create() builds: INSERT INTO {type} ({keys}) VALUES ({placeholders})
- update() builds: UPDATE {type} SET {key=?}... WHERE id = ?
- delete() builds: DELETE FROM {type} WHERE id = ?
- Use WAL journal mode for concurrent reads

DATA RESOLVER:

Pattern: /<htx:data\s+([^>]*)\/>/g
Parse attributes: type, where, order, limit, offset, slug, as

Algorithm:
  For each htx:data directive:
    If slug attribute present:
      Resolve {path} references in slug value against data context
      Call adapter.get(type, {slug: resolvedSlug})
      Inject result into data context under "as" name
    Else:
      Call adapter.query({type, where, order, limit, offset})
      Inject array into data context under "as" name
  Strip all htx:data directives from content

VERIFY:
- htx:data type="post" where="status = 'published'" as="posts" → array of posts
- htx:data type="post" slug="{route.slug}" as="post" → single post
- Multiple htx:data on one page both resolve
- Results available to subsequent expression evaluation
```

---

## Prompt 7: Control Flow

```
Build control flow: iteration and conditionals.

PATTERNS:

Each: /<htx:each\s+items="([^"]+)"\s+as="([^"]+)"\s*>([\s\S]*?)<\/htx:each>/g
Empty separator: /<htx:empty\s*\/?>/
If/Else: /<htx:if\s+test="([^"]+)"\s*>([\s\S]*?)<\/htx:if>(?:\s*<htx:else\s*>([\s\S]*?)<\/htx:else>)?/g

EACH ALGORITHM:

  Resolve items path from data context
  If not array or empty:
    Split body on <htx:empty>. If second part exists, return it. Else return "".
  For each item (index i):
    Create per-item data context: {...parentData, [asVar]: item, $index: i, $first: i==0, $last: i==length-1}
    Evaluate expressions in the item template with per-item context
    Recursively resolve nested control flow
  Concatenate all rendered items

IF ALGORITHM:

  Resolve test path from data context
  Truthy: value is NOT null, undefined, false, 0, "", or empty array
  If truthy: evaluate and return if-content
  If falsy and else-content exists: evaluate and return else-content
  If falsy and no else: return ""

IMPORTANT: Control flow handles its OWN expression evaluation for per-item contexts. The main expression pass handles remaining expressions.

VERIFY:
- htx:each iterates array, renders per item with correct $index/$first/$last
- htx:empty renders when array is empty
- htx:if shows content when truthy, hides when falsy
- htx:else shows when condition is falsy
- Nested htx:each works
- Falsy values: null, false, 0, "", [] all evaluate as falsy
```

---

## Prompt 8: Layout Resolver

```
Build the layout resolver: convention-based and directive-based.

DIRECTIVE PATTERN:
/<htx:layout(?:\s+(?:src\s*=\s*"([^"]*)"|(none)))?\s*(?:\/>|><\/htx:layout>)/i

CONTENT PLACEHOLDER: __content__
LAYOUT FILENAME: _layout.htx

ALGORITHM:

Function wrap(content, filePath, reader, skipRoot):
  directive = extractDirective(content)
  If directive.none: return cleanContent (no wrapping)
  If directive.src: return wrapExplicit(cleanContent, src, reader, skipRoot)

  # Convention walk
  layouts = collectLayouts(filePath, reader.getPrimary())
  If skipRoot and last layout contains "<!doctype html": remove it
  For each layout (inner to outer):
    output = layoutContent.replaceAll("__content__", output)
  Return output

Function collectLayouts(filePath, siteRoot):
  Start at filePath's directory, walk up to siteRoot
  At each level, check for _layout.htx
  If found, add to list. If it contains "<!doctype html", stop.
  Return list

Function wrapExplicit(content, src, reader, skipRoot):
  Resolve src via reader
  If not found: warn, return content unwrapped
  If skipRoot and layout has doctype: return content unwrapped
  Return layoutContent.replaceAll("__content__", content)

VERIFY:
- Page wrapped in root _layout.htx automatically
- Nested layouts: section/_layout.htx wraps content, then root wraps that
- <htx:layout src="layouts/full.htx" /> uses explicit layout
- <htx:layout none /> produces raw output
- HX-Request header causes root (doctype) layout to be skipped
```

---

## Prompt 9: Token Services

```
Build HMAC-SHA256 token signing and verification.

ACTION TOKEN SERVICE:

Function issue(action, type, recordId=null):
  payload = {action, type, recordId, exp: now() + 3600000}
  encoded = base64url(JSON.stringify(payload))
  signature = base64url(hmacSha256(encoded, serverSecret))
  return encoded + "." + signature

Function verify(token):
  Split on "."
  If not exactly 2 parts: return null
  Recompute signature. If mismatch: return null
  Decode payload. If exp < now(): return null
  Return payload

CHANNEL TOKEN SERVICE:

Function issue(userId, scope):
  payload = {sub: userId, scope: scope, exp: now() + 120000, jti: randomUUID()}
  Sign same as action tokens
  Return {token, expiresAt}

Function verify(token):
  Same as action token verify, returns payload with sub, scope, exp, jti

SIGNED URL SERVICE:

Function sign(path):
  expiresAt = now() + 3600000
  payload = path + ":" + string(expiresAt)
  sig = base64url(hmacSha256(payload, secret))
  separator = "?" if path has no "?", else "&"
  return path + separator + "sig=" + sig + "&exp=" + string(expiresAt)

Function verify(url):
  Extract sig and exp params
  If missing or exp < now(): return null
  Reconstruct path without sig/exp params
  Recompute signature. If mismatch: return null
  Return path

HMAC-SHA256: Use your language's crypto library. Import key as raw bytes, sign with HMAC-SHA256, output raw bytes, encode as base64url.

VERIFY:
- Issue then verify returns original payload
- Tampered token fails verification
- Expired token fails verification
- Signed URL roundtrips correctly
```

---

## Prompt 10: Grant Resolver

```
Build the grant resolver. Materializes <htx:grant> credentials.

PATTERN: /<htx:grant\s+([^>]*)\/>/g

GRANT PROVIDERS (built-in):

  "websocket": issue channel token with scope "websocket"
    Output: {token, expiresAt}

  "channel": read "module" attribute, issue channel token with scope "channel:{module}"
    Output: {token, module, scope, expiresAt}

  "asset": read "path" attribute, sign URL
    Output: {url, path, expiresAt}

ALGORITHM:

Function resolve(content, data, userId):
  enrichedData = copy(data)
  For each htx:grant directive:
    Parse attributes (type, as, plus type-specific)
    Look up provider by type
    Call provider.resolve(attributes, userId)
    Inject result into enrichedData under "as" name
  Strip all htx:grant directives
  Return (cleaned content, enrichedData)

EXTENSIBILITY: Store providers in a map. Allow registerProvider(type, resolveFn).

VERIFY:
- <htx:grant type="websocket" as="ws" /> produces ws.token in context
- <htx:grant type="channel" module="test" as="ch" /> produces ch.token scoped to channel:test
- <htx:grant type="asset" path="/file.pdf" as="doc" /> produces doc.url with signature
- Grants are stripped from output
```

---

## Prompt 11: Mutation Handler

```
Build the mutation handler: two-phase prepare/execute.

PATTERN: /<htx:action\s+([^>]*)\/>/g

PREPARE PHASE (during GET resolution):

  For each htx:action:
    Parse: name, type, record (may contain {htx:...} references)
    Resolve references in record attribute
    Issue action token via ActionTokenService
    Store in $actions map: $actions[name] = token
  Inject $actions into data context
  Strip directives

EXECUTE PHASE (during POST with _action_token):

  Extract _action_token from request body
  Verify via ActionTokenService
  If invalid: return 403
  Extract action, type, recordId from payload
  Route to adapter:
    "create": adapter.create(type, fields)  — fields are body keys not starting with "_"
    "update": adapter.update(type, recordId, fields)
    "delete": adapter.delete(type, recordId)
  Redirect to _redirect path from body (or request path)

VERIFY:
- GET page with htx:action produces token in hidden form field
- POST with valid token creates/updates/deletes record
- POST with tampered token returns 403
- POST with expired token returns 403
- Fields prefixed with _ are excluded from record data
```

---

## Prompt 12: Auth Conditionals

```
Build auth conditional rendering.

PATTERNS:

Auth: /<htx:auth(?:\s+role="([^"]*)")?\s*>([\s\S]*?)<\/htx:auth>/g
Unauth: /<htx:unauth\s*>([\s\S]*?)<\/htx:unauth>/g

ALGORITHM:

Function resolveAuth(content, data):
  auth = data["auth"]  # populated by auth context provider

  Replace htx:auth blocks:
    If auth is null or auth.user is null: remove block (return "")
    If role attribute specified and auth.user.role != role: remove block
    Otherwise: return block content

  Replace htx:unauth blocks:
    If auth is not null and auth.user is not null: remove block
    Otherwise: return block content

VERIFY:
- Unauthenticated: htx:auth content hidden, htx:unauth content shown
- Authenticated: htx:auth content shown, htx:unauth content hidden
- Role-based: htx:auth role="admin" shows only for admin role
```

---

## Prompt 13: Module Registry

```
Build the module registry: boot lifecycle and manifest sandboxing.

MODULE INTERFACE:
  name() → string
  manifest() → {trust: "first-party"|"restricted", contextProviders?: string[], channelHandlers?: string[], middleware?: string[]}
  boot(registry) → void

REGISTRY INTERFACE:
  registerMiddleware(middleware)
  registerContextProvider(name, provider)
  registerChannelHandler(handler)

STORAGE:
  middleware: ordered list
  contextProviders: map<string, provider>
  channelHandlers: map<string, handler>

BOOT:
  For each module:
    If trust == "first-party": pass the real registry
    If trust == "restricted": pass a sandbox proxy
    Call module.boot(registry)
    If boot throws: log error, continue with next module

SANDBOX PROXY:
  registerMiddleware(mw): if mw.name() not in manifest.middleware → warn + drop
  registerContextProvider(name, p): if name not in manifest.contextProviders → warn + drop
  registerChannelHandler(h): if h.module() not in manifest.channelHandlers → warn + drop

VERIFY:
- First-party module registers all capabilities
- Restricted module: declared capabilities register, undeclared are dropped with warning
- Boot error in one module does not prevent others from booting
```

---

## Prompt 14: Channel Middleware

```
Build the channel API middleware.

ENDPOINT: /api/channel/{moduleName}/{subPath}

ALGORITHM:

  Parse module name and sub-path from URL
  Look up handler in registry by module name
  If not found: return 404

  Extract Authorization header
  If missing or not "Bearer {token}": return 401

  Verify token via ChannelTokenService
  If invalid or expired: return 401

  Check scope: token.scope must equal "channel:{moduleName}"
  If mismatch: return 403

  Call handler.handle(subPath, queryParams, token.sub, {method, body})
  Return handler's status and JSON-serialized data

HANDLER INTERFACE:
  module() → string (the module name this handler serves)
  handle(subPath, query, userId, context) → {status: int, data: any}

VERIFY:
- Valid token + correct scope → handler receives request, returns data
- Missing auth → 401
- Invalid token → 401
- Wrong scope → 403
- Unknown module → 404
```

---

## Prompt 15: Request Handler (22-Stage Pipeline)

```
Build the request handler that orchestrates the entire pipeline.

Wire all components together. The handler receives an HtxRequest and returns an HtxResponse.

CONSTRUCTOR takes: templateDir, publicDir, devMode, adapter, modules, secret

PIPELINE (execute in this exact order):

  1. Static file check → return if match
  2. Channel API check (/api/channel/) → route to channel middleware
  3. Middleware chain → execute registered middleware with next()
  4. Mutation check → if POST with _action_token, execute mutation
  5. Route resolution → find template file
  6. Context providers → inject module data into context
  7. Pre-layout template processors
  8. Include expansion
  9. Component resolution + script extraction
  10. Page-level htx:script extraction (push to scriptCollector, remove from content)
  11. htx:let variable binding
  12. htx:data resolution
  13. htx:grant resolution
  14. htx:action preparation
  15. htx:auth / htx:unauth
  16. htx:each / htx:if control flow
  17. htx:v expression evaluation
  18. Directive stripping (remove any remaining htx: tags)
  19. Post-layout template processors
  20. Layout wrapping
  21. Post-layout pass: re-run include, auth, control flow on layout content
  22. Script injection: wrap scripts in <!--PRESTO:SCRIPT:BEGIN/END--> placeholders,
      insert before </body>
  23. Final expression pass (evaluates htx:v in scripts)
  24. Replace PRESTO:SCRIPT placeholders with <script> tags
  25. Remove <htx:raw> wrapper tags (content preserved)
  26. Return HTML response

ERROR HANDLING: In dev mode, return styled error page with message, stack trace, template path.

VERIFY:
- Static files serve correctly
- Templates render with layout
- Data queries populate content
- Components render with props and slots
- Expressions resolve
- Auth conditionals work
- Scripts inject before </body>
- Channel API validates tokens
- Mutations verify and execute
- 404 for missing routes
```

---

## Prompt 16: Integration Test

```
Build a comprehensive integration test that verifies all contracts.

Create test fixtures:
- A template directory with layout, pages, components, partials
- A SQLite database with test data
- A test module (context provider + channel handler)

TEST CASES (minimum 15):

1. Home page renders with layout wrapping
2. 404 for missing route
3. Dynamic route [slug] resolves with params
4. Include expands partial content
5. Component renders with props and slot
6. htx:v resolves values, pipes work, HTML is escaped
7. htx:v raw outputs unescaped
8. Script blocks are not processed by expression engine
9. htx:raw blocks are not processed
10. htx:data queries database, htx:each iterates results
11. htx:if/htx:else conditional rendering
12. htx:empty fallback for empty collections
13. htx:grant materializes token (verify it's a signed string)
14. htx:auth shows content when authenticated, hides when not
15. htx:layout none produces raw output without layout
16. htx:layout src="..." uses explicit layout
17. Channel API returns data with valid token
18. Channel API rejects invalid token (401)
19. Channel API rejects wrong scope (403)
20. Module context provider injects data into template
21. Action token roundtrip: issue then verify succeeds
22. Action token tamper detection: modified token rejected

Run all tests. Report pass/fail count.

If all 22 tests pass, the engine is conformant.
```

---

## Usage Instructions

1. Set variables:
   - {TARGET_LANGUAGE}: e.g., "Rust", "Go", "Python", "Java", "C#"
   - {HTTP_FRAMEWORK}: e.g., "Actix-web", "net/http", "FastAPI", "Spring Boot", "ASP.NET"
   - {DB_DRIVER}: e.g., "rusqlite", "database/sql", "sqlite3", "JDBC", "Microsoft.Data.Sqlite"

2. Send Prompt 0 as the system message.

3. Send Prompts 1-16 sequentially. Wait for each to complete before sending the next.

4. After Prompt 16, all tests should pass. The engine is conformant.

5. Optional: Send the full htxlang specification and reference profile documents for the agent to cross-reference.
