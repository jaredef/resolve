The authentication system is a pluggable module — not baked into the engine. It provides session management, login forms, logout, route protection, and conditional template rendering through four module registrations.

## Choosing an Auth Module

HTX ships with two auth modules. Both use the same template directives — you can swap between them without changing templates.

| Module | Best For | OAuth | Dependencies |
|--------|---------|-------|-------------|
| **AuthModule** (this page) | Simple admin panels, single user | No | None |
| **BetterAuthModule** | Multi-user apps, OAuth, email verification | 40+ providers | better-auth, kysely |

See [BetterAuth Module](/docs/better-auth-module) for the OAuth-capable alternative.

## Getting Started

### Step 1: Import and register

No dependencies to install — AuthModule uses the engine's built-in SessionAuthProvider.

### Step 2: Add to modules array

## Setup

```typescript
import { EnvCredentialStore } from "@htx/engine";
import { AuthModule } from "./modules/auth-module";

const handler = new RequestHandler(router, parser, ..., {
  modules: [
    new AuthModule(
      new EnvCredentialStore("admin", "secretpassword"),
      {
        secret: process.env.HTX_SESSION_SECRET,
        cookieName: "htx_session",
        ttlSeconds: 43200, // 12 hours
      },
      setExecutor, // needed for login form token issuance
    ),
  ],
});
```

The module registers four surfaces with the engine:

| Registration | Class | Purpose |
|-------------|-------|---------|
| Middleware | AuthMiddleware | Handles logout POST requests |
| Context Provider | AuthContextProvider | Resolves session, injects auth data |
| Template Processor | AuthTemplateProcessor | Conditional block rendering |
| Mutation Handler | AuthMutationHandler | Login form prepare/execute |

## Conditional Rendering

Show or hide content based on authentication state:

```html
<htx:auth>
  <p>Welcome, {{ auth.username }}</p>
  <p>Role: {{ auth.role }}</p>
  <a href="/admin">Dashboard</a>
</htx:auth>

<htx:auth-none>
  <a href="/admin/login">Sign in</a>
</htx:auth-none>
```

When the user has a valid session cookie, the context provider resolves their identity and the template processor renders the `<htx:auth>` block. When not authenticated, the `<htx:auth-none>` block renders instead.

The `auth` object in expressions contains whatever fields the credential store returns. The built-in `EnvCredentialStore` returns `{ username, role: "admin" }`. A custom credential store can return any fields — email, avatar, permissions, tenant.

## Page-Level Protection

Redirect unauthenticated users to a login page:

```html
<htx:auth redirect="/admin/login" />
```

Place this in a layout file to protect all pages that use that layout. The template processor checks auth state — if not authenticated, it returns a 302 redirect. This runs at both pre-layout and post-layout phases, so it works whether the directive is in the page template or the layout.

Example: the admin layout protects all admin pages with one line:

```
templates/admin/
  _layout.htx     ← Line 1: <htx:auth redirect="/admin/login" />
  index.htx       ← Protected (inherits layout)
  posts/
    index.htx     ← Protected (inherits layout)
    new.htx       ← Protected
  login/
    _layout.htx   ← Own layout (no auth redirect)
    index.htx     ← Public (login form)
```

## Login Form

Login uses the two-phase prepare/execute pattern with CSRF protection:

```html
<htx:action>login</htx:action>

<htx:response name="redirect">/admin</htx:response>
<htx:response name="error">
  <div class="error">Invalid username or password.</div>
</htx:response>

<htx>
<form method="POST">
  <input type="hidden" name="htx-payload" value="__payload__" />
  <input type="text" name="username" required />
  <input type="password" name="password" required />
  <button type="submit">Sign In</button>
</form>
</htx>
```

**Phase 1 (GET):** The mutation handler calls `SetContentExecutor.prepare()` to issue a CSRF token. The token is embedded in the `__payload__` hidden field.

**Phase 2 (POST):** The mutation handler receives the form data, calls `SessionAuthProvider.login()` with the credentials. On success: sets the session cookie and redirects to the URL in `<htx:response name="redirect">`. On failure: renders the error response template.

The login action is registered as a mutation handler — the engine dispatches it through the same mechanism as save/update/delete, but the auth module handles it instead of the content executors.

## Logout

Logout is handled by the auth middleware — no separate page or template needed. Any form that POSTs with a `htx-logout=true` hidden field triggers a logout:

```html
<form method="post" action="/admin">
  <input type="hidden" name="htx-logout" value="true" />
  <input type="hidden" name="htx-logout-redirect" value="/admin/login" />
  <button type="submit">Log Out</button>
</form>
```

The middleware intercepts the POST before it reaches the template pipeline. It calls `SessionAuthProvider.logout()`, which returns a `Set-Cookie` header that clears the session cookie (Max-Age=0). The response redirects to the URL in `htx-logout-redirect`.

No CSRF token is required for logout — logging someone out is not a destructive data action.

## How It Works Internally

### AuthMiddleware

Registered as middleware. Runs before the template pipeline on every request.

For POST requests with `htx-logout=true`: clears the session cookie and redirects. For all other requests: calls `next(request)` to pass through.

### AuthContextProvider

Registered as a context provider with the name `"auth"`. Runs per-request before template processing.

Reads the session cookie from the request, validates the signature and expiration via `SessionAuthProvider.resolve()`. Returns the auth context (username, role, etc.) or an empty object.

The data is available in templates as `{{ auth.username }}`, `{{ auth.role }}`, `{{ if auth.username }}`, etc.

### AuthTemplateProcessor

Registered as a template processor. Runs at both pre-layout and post-layout phases.

Reads `auth` from the data context. If authenticated (auth has keys):
- Removes `<htx:auth-none>...</htx:auth-none>` blocks
- Unwraps `<htx:auth>...</htx:auth>` tags (keeps content, removes tags)
- Removes `<htx:auth redirect="...">` directives

If not authenticated:
- Checks for `<htx:auth redirect="...">` — returns redirect if found
- Removes `<htx:auth>...</htx:auth>` blocks
- Unwraps `<htx:auth-none>...</htx:auth-none>` tags

### AuthMutationHandler

Registered as a mutation action handler for the `"login"` action.

**prepare():** Uses `SetContentExecutor.prepare()` to issue a CSRF token and render the login form template with the token embedded.

**execute():** Calls `SessionAuthProvider.login()` with the form data. Returns a `MutationResult` with either the error template HTML or a redirect URL + session cookie.

## Session Format

Sessions are signed JWTs using HMAC-SHA256:

```
base64url(JSON payload) . hmac-sha256(payload, secret)
```

The payload contains:
- `sub` — username
- `exp` — expiration timestamp (Unix seconds)
- Any additional fields from the credential store

Validation checks:
1. Signature verification (timing-safe comparison)
2. Expiration check
3. Payload structure validation

The cookie is HttpOnly, SameSite (configurable: Lax or Strict), with optional Secure flag for HTTPS.

## Credential Store

The credential store is pluggable — it validates username/password and returns an auth context:

```typescript
interface CredentialStore {
  validate(username: string, password: string): MaybePromise<AuthContext | null>;
}
```

### Built-in: EnvCredentialStore

Validates against constructor arguments (typically from environment variables):

```typescript
new EnvCredentialStore("admin", process.env.ADMIN_PASSWORD)
```

Uses timing-safe comparison to prevent timing attacks. Returns `{ username, role: "admin" }` on success.

### Custom: Database-Backed Store

```typescript
class SqliteCredentialStore implements CredentialStore {
  constructor(private db: Database) {}

  validate(username: string, password: string): AuthContext | null {
    const user = this.db.query("SELECT * FROM users WHERE username = ?").get(username);
    if (!user || !verifyPassword(password, user.password_hash)) return null;
    return { username: user.username, role: user.role, email: user.email };
  }
}
```

## Module Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `secret` | string | required | HMAC-SHA256 signing key (min 32 bytes) |
| `cookieName` | string | `"htx_session"` | Session cookie name |
| `ttlSeconds` | number | `43200` (12h) | Session lifetime |
| `secureCookies` | boolean | `false` | Set Secure flag (HTTPS only) |
| `sameSite` | `"Lax" \| "Strict"` | `"Lax"` | SameSite cookie attribute |
| `logoutField` | string | `"htx-logout"` | Hidden field name for logout forms |

## Why Auth Is a Module

The authentication system uses the same four module hooks as any other feature:

- **Middleware** — the cart module uses it for `/api/cart/*` routes. Auth uses it for logout.
- **Context Provider** — the cart module injects `{{ cart.count }}`. Auth injects `{{ auth.username }}`.
- **Template Processor** — a subscription module could use `<htx:premium>`. Auth uses `<htx:auth>`.
- **Mutation Handler** — a payment module could handle `<htx:action>checkout</htx:action>`. Auth handles `<htx:action>login</htx:action>`.

The engine has zero auth-specific code. The `RequestHandler` does not import, reference, or know about authentication. If you remove the AuthModule from the modules array, auth simply doesn't exist — no errors, no dead code, no unused interfaces.

This means auth is replaceable. You can write your own auth module that uses OAuth, API keys, magic links, or any other mechanism — as long as it registers the same four surfaces, templates work identically.
