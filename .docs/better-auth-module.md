The BetterAuthModule integrates better-auth — a framework-agnostic authentication library — into HTX via the module system. It provides email/password authentication, OAuth social login, database-backed sessions, and the same template directives as the built-in auth module.

## Getting Started (Step by Step)

### Step 1: Install dependencies

```bash
bun add better-auth kysely kysely-bun-sqlite
```

### Step 2: Create the auth database tables

Run this once to create the required tables in a separate auth database:

```bash
bun -e '
import { Database } from "bun:sqlite";
const db = new Database("app/data/auth.sqlite");
db.run("CREATE TABLE IF NOT EXISTS user (id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, emailVerified INTEGER NOT NULL DEFAULT 0, image TEXT, createdAt TEXT, updatedAt TEXT)");
db.run("CREATE TABLE IF NOT EXISTS session (id TEXT PRIMARY KEY, userId TEXT NOT NULL, token TEXT NOT NULL UNIQUE, expiresAt TEXT NOT NULL, ipAddress TEXT, userAgent TEXT, createdAt TEXT, updatedAt TEXT)");
db.run("CREATE TABLE IF NOT EXISTS account (id TEXT PRIMARY KEY, userId TEXT NOT NULL, accountId TEXT NOT NULL, providerId TEXT NOT NULL, accessToken TEXT, refreshToken TEXT, accessTokenExpiresAt TEXT, refreshTokenExpiresAt TEXT, scope TEXT, idToken TEXT, password TEXT, createdAt TEXT, updatedAt TEXT)");
db.run("CREATE TABLE IF NOT EXISTS verification (id TEXT PRIMARY KEY, identifier TEXT NOT NULL, value TEXT NOT NULL, expiresAt TEXT NOT NULL, createdAt TEXT, updatedAt TEXT)");
console.log("Auth tables created");
'
```

### Step 3: Register the module

### Step 4: Add login/signup templates (see Login Form Template section below)

### Step 5: Protect admin pages

Add to your admin layout (same as built-in auth):

```html
<htx:auth redirect="/login" />
```

### Step 6: Add nav auth state

```html
<htx:auth><a href="/admin">{{ auth.name }}</a></htx:auth>
<htx:auth-none><a href="/login">Sign in</a></htx:auth-none>
```

### Step 7: Add logout

```html
<form method="post">
  <input type="hidden" name="htx-logout" value="true" />
  <input type="hidden" name="htx-logout-redirect" value="/login" />
  <button type="submit">Log Out</button>
</form>
```

## Setup

```typescript
import { EnvCredentialStore } from "@htx/engine";
import { BetterAuthModule } from "./modules/better-auth-module";

const handler = new RequestHandler(router, parser, ..., {
  modules: [
    new BetterAuthModule({
      databasePath: "app/data/auth.sqlite",
      baseURL: process.env.HTX_BASE_URL ?? "https://yourdomain.com",
      secret: process.env.HTX_SESSION_SECRET,
    }),
  ],
});
```

better-auth uses its own SQLite database file (separate from the content database). It creates and manages four tables: `user`, `session`, `account`, and `verification`.

## Dependencies

```bash
bun add better-auth kysely kysely-bun-sqlite
```

The module uses Kysely with the Bun SQLite dialect for native database access — no FFI overhead, same performance characteristics as the content adapter.

## Database Schema

better-auth requires four tables. Create them before first use:

```sql
CREATE TABLE user (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  emailVerified INTEGER NOT NULL DEFAULT 0,
  image TEXT,
  createdAt TEXT,
  updatedAt TEXT
);

CREATE TABLE session (
  id TEXT PRIMARY KEY,
  userId TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  expiresAt TEXT NOT NULL,
  ipAddress TEXT,
  userAgent TEXT,
  createdAt TEXT,
  updatedAt TEXT
);

CREATE TABLE account (
  id TEXT PRIMARY KEY,
  userId TEXT NOT NULL,
  accountId TEXT NOT NULL,
  providerId TEXT NOT NULL,
  accessToken TEXT,
  refreshToken TEXT,
  accessTokenExpiresAt TEXT,
  refreshTokenExpiresAt TEXT,
  scope TEXT,
  idToken TEXT,
  password TEXT,
  createdAt TEXT,
  updatedAt TEXT
);

CREATE TABLE verification (
  id TEXT PRIMARY KEY,
  identifier TEXT NOT NULL,
  value TEXT NOT NULL,
  expiresAt TEXT NOT NULL,
  createdAt TEXT,
  updatedAt TEXT
);
```

## Email/Password Authentication

### Sign Up

POST to `/api/auth/sign-up/email` with JSON body:

```json
{ "name": "Jane Doe", "email": "jane@example.com", "password": "securepassword" }
```

Returns the created user object with a session token. better-auth handles password hashing automatically.

### Sign In

POST to `/api/auth/sign-in/email` with JSON body:

```json
{ "email": "jane@example.com", "password": "securepassword" }
```

Returns the user object and sets a `better-auth.session_token` cookie. The session is database-backed — the token maps to a row in the `session` table.

### Login Form Template

```html
<h1>Sign In</h1>
<form id="login-form">
  <input type="email" name="email" placeholder="Email" required />
  <input type="password" name="password" placeholder="Password" required />
  <button type="submit">Sign In</button>
</form>
<div id="login-error" style="display: none; color: red;"></div>

<script>
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const res = await fetch('/api/auth/sign-in/email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: form.email.value,
      password: form.password.value,
    }),
  });
  if (res.ok) {
    window.location.href = '/admin';
  } else {
    document.getElementById('login-error').style.display = 'block';
    document.getElementById('login-error').textContent = 'Invalid credentials.';
  }
});
</script>
```

Note: better-auth's sign-in endpoint expects JSON, not form-encoded data. A small script converts the form submission to a JSON fetch. The session cookie is set automatically by the response.

### Sign Up Form

Same pattern — POST JSON to `/api/auth/sign-up/email`:

```html
<form id="signup-form">
  <input type="text" name="name" placeholder="Name" required />
  <input type="email" name="email" placeholder="Email" required />
  <input type="password" name="password" placeholder="Password" required />
  <button type="submit">Create Account</button>
</form>

<script>
document.getElementById('signup-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const res = await fetch('/api/auth/sign-up/email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
    }),
  });
  if (res.ok) window.location.href = '/admin';
});
</script>
```

## OAuth Social Providers

Add social providers in the module options:

```typescript
new BetterAuthModule({
  databasePath: "app/data/auth.sqlite",
  secret: process.env.HTX_SESSION_SECRET,
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
})
```

better-auth supports 40+ OAuth providers out of the box: Google, GitHub, Apple, Discord, Twitter, Facebook, Microsoft, Spotify, and more.

### OAuth Login Links

```html
<a href="/api/auth/sign-in/social?provider=github">Sign in with GitHub</a>
<a href="/api/auth/sign-in/social?provider=google">Sign in with Google</a>
```

better-auth handles the full OAuth flow: redirect to provider, callback handling, token exchange, account creation/linking, and session creation. No custom code needed.

## Template Integration

The BetterAuthModule registers the same template directives as the built-in auth module. All existing templates work unchanged.

### Conditional Rendering

```html
<htx:auth>
  <p>Welcome, {{ auth.name }}</p>
  <p>{{ auth.email }}</p>
</htx:auth>

<htx:auth-none>
  <a href="/login">Sign in</a>
</htx:auth-none>
```

### Available Auth Fields

| Field | Type | Description |
|-------|------|-------------|
| `auth.username` | string | User's name (alias for name) |
| `auth.name` | string | User's display name |
| `auth.email` | string | User's email address |
| `auth.id` | string | User's unique ID |
| `auth.image` | string | Profile image URL (from OAuth or manual) |
| `auth.authenticated` | boolean | Always true when authenticated |

### Page Protection

```html
<htx:auth redirect="/login" />
```

Works identically to the built-in auth module — redirects unauthenticated users.

## Logout

The sidebar logout button works the same way:

```html
<form method="post">
  <input type="hidden" name="htx-logout" value="true" />
  <input type="hidden" name="htx-logout-redirect" value="/login" />
  <button type="submit">Log Out</button>
</form>
```

The module's middleware intercepts the POST, calls better-auth's sign-out endpoint to invalidate the server-side session, and clears the cookie.

## API Endpoints

better-auth exposes these endpoints automatically at `/api/auth/*`:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/auth/ok` | GET | Health check |
| `/api/auth/sign-up/email` | POST | Create account with email/password |
| `/api/auth/sign-in/email` | POST | Sign in with email/password |
| `/api/auth/sign-in/social` | GET | Start OAuth flow (with ?provider=) |
| `/api/auth/callback/:provider` | GET | OAuth callback handler |
| `/api/auth/sign-out` | POST | End session |
| `/api/auth/get-session` | GET | Get current session + user |

All endpoints are handled by better-auth's internal router. The module's middleware passes matching requests directly to better-auth.

## Module Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `databasePath` | string | required | Path to auth SQLite database |
| `baseURL` | string | `"http://localhost:3000"` | **Required in production.** Public URL for OAuth callbacks and origin validation. |
| `secret` | string | optional | Session signing secret |
| `socialProviders` | object | optional | OAuth provider credentials |
| `logoutField` | string | `"htx-logout"` | Hidden field name for logout forms |

## How It Differs from the Built-in AuthModule

| Feature | Built-in AuthModule | BetterAuthModule |
|---------|-------------------|-----------------|
| Session storage | Signed cookie (HMAC-SHA256) | Database-backed (session table) |
| Password hashing | Not handled (CredentialStore does it) | Automatic (bcrypt) |
| OAuth | Not supported | 40+ providers |
| Email verification | Not supported | Built-in |
| 2FA / Passkeys | Not supported | Available as plugins |
| Login flow | Two-phase prepare/execute (CSRF token) | JSON API (fetch + redirect) |
| Dependencies | None (built into engine) | better-auth, kysely, kysely-bun-sqlite |
| Template directives | htx:auth, htx:auth-none, htx:auth redirect | Same (identical behavior) |

Both modules register the same four surfaces (middleware, context provider, template processor, mutation handler). Templates don't know which auth system is behind `{{ auth.username }}`. You can swap between them by changing one line in the modules array.

## Common Pitfalls

### "Invalid origin" (403)

better-auth validates that the browser's `Origin` header matches the configured `baseURL`. If you deploy to `https://yourdomain.com` but leave `baseURL` as `http://localhost:3000`, all browser requests will fail with 403.

**Fix:** Set `baseURL` to your production URL:

```typescript
new BetterAuthModule({
  baseURL: process.env.HTX_BASE_URL ?? "https://yourdomain.com",
  // ...
})
```

Use the `HTX_BASE_URL` environment variable so the same code works in development (`http://localhost:3000`) and production (`https://yourdomain.com`).

### "Password too short"

better-auth enforces a minimum password length of 8 characters by default. This is not configurable in the current module — it's a better-auth security default.

### Tables not found

better-auth requires four tables (`user`, `session`, `account`, `verification`) in the auth database. See Step 2 in Getting Started. If you skip this step, sign-up/sign-in will return 500 errors.

## When to Use Which

**Use the built-in AuthModule when:**
- You need simple username/password auth
- You want zero external dependencies
- You want CSRF-protected login forms (two-phase pattern)
- You're building an admin panel with a single user

**Use BetterAuthModule when:**
- You need OAuth social login (Google, GitHub, etc.)
- You need email verification, password reset, magic links
- You need database-backed sessions (revocable, auditable)
- You need 2FA, passkeys, or other advanced auth features
- You're building a multi-user application
