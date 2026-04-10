HTX applications are configured through a combination of environment variables and a config object passed at startup. Secrets should always be loaded from environment variables — never hardcoded in source files.

## Environment Variables

### Required

| Variable | Description |
|----------|-------------|
| `HTX_SECRET_KEY` | Signing key for JWT action tokens (mutations). Must be a strong random string (32+ characters). Also used as the default auth secret if `HTX_AUTH_SECRET` is not set. |
| `HTX_BASE_URL` | The public URL of your site (e.g., `https://mysite.com`). Used by the auth module for origin validation and CORS. |

### Optional

| Variable | Default | Description |
|----------|---------|-------------|
| `HTX_AUTH_SECRET` | Falls back to `HTX_SECRET_KEY` | Separate signing secret for auth sessions. Only needed if you want auth tokens signed with a different key than action tokens. |
| `HTX_HOST` | `127.0.0.1` | Bind address for the HTTP server. Use `0.0.0.0` to listen on all interfaces. |
| `HTX_PORT` | `3000` | Listen port for the HTTP server. |
| `CONVEX_URL` | — | Convex deployment URL. If not set, the Convex adapter is not registered. |

### .env File

Bun automatically loads a `.env` file from the project root. Create one for local development:

```
HTX_SECRET_KEY=generate-a-random-32-char-string
HTX_BASE_URL=http://localhost:3000
```

A `.env.example` file should be committed to document required variables. The actual `.env` file must be in `.gitignore` — never commit secrets.

## Configuration Object

The config object is created in `app/config.ts` and passed to the engine at startup:

```typescript
import { createDogfoodAppConfig } from "../config";

const config = createDogfoodAppConfig();
// config.secretKey      → from HTX_SECRET_KEY
// config.templatesDir   → ./templates
// config.databasePath   → ./data/database.sqlite
```

### Config Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `templatesDir` | string | `./templates` | Root directory for .htx templates |
| `publicDir` | string | `./public` | Root directory for static assets |
| `databasePath` | string | `./data/database.sqlite` | Path to SQLite database |
| `secretKey` | string | from env | Secret key for JWT action tokens |

## Modules

Register modules in the RequestHandler options:

```typescript
const handler = new RequestHandler(
  router, parser, expressionEngine, hydrator, registry,
  layoutResolver, includeResolver, letResolver, componentResolver,
  getExecutor, config.templatesDir, setExecutor, deleteExecutor,
  {
    dev: true,
    modules: [
      new BetterAuthModule({
        databasePath: "./data/auth.sqlite",
        baseURL: config.baseURL,
        secret: config.adminSessionSecret,
      }),
      new CartModule(adapter),
    ],
  },
);
```

Modules register middleware, context providers, and template processors during their `boot()` call. See the [Module System](/docs/module-system) documentation for details.

## Development Mode

Set `dev: true` in options to enable:
- Detailed error pages with diagnostic context
- Stack traces and template source locations
- Expression evaluation context on errors

Production deployments should set `dev: false` for generic error pages.

## Security: Secret Key

The `HTX_SECRET_KEY` environment variable is the most important security configuration. It is used by the `ActionTokenService` to sign JWT tokens for CSRF protection on mutation forms.

**Requirements:**
- Must be a strong random string (32+ characters recommended)
- Must be consistent across all server processes for the same site
- Must not be committed to version control

**Generate a key:**

```bash
openssl rand -base64 32
```

If `HTX_SECRET_KEY` is not set, the app will refuse to start with an error: `Missing required environment variable: HTX_SECRET_KEY`.
