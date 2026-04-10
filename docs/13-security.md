# Security

HTX provides several layers of security by default: signed action tokens for mutation protection, replay guards to prevent token reuse, HTML escaping to block injection, path traversal checks in the router, and resource limits in the expression evaluator.

## Action Tokens (JWT)

Mutations in HTX follow a two-phase prepare/execute pattern. During the prepare phase (GET request), the runtime issues a signed JWT called an **action token**. The token is embedded in a hidden form field (`htx-payload`). When the form is submitted (POST request), the runtime validates the token before executing the mutation.

The `ActionTokenService` uses the [jose](https://github.com/panva/jose) library to sign and verify tokens with HMAC-SHA256.

### Token Structure

Each action token carries these claims:

| Claim | Type | Description |
|-------|------|-------------|
| `sub` | `string` | Subject identifier (user or session) |
| `tenant_id` | `number` | Tenant scope for multi-tenant deployments |
| `htx-context` | `string` | The content type being mutated (e.g. `"post"`) |
| `htx-recordId` | `string \| null` | The record being updated or deleted, `null` for creates |
| `jti` | `string` | Unique token identifier (UUID v4), used for replay protection |
| `iat` | `number` | Issued-at timestamp (Unix seconds) |
| `exp` | `number` | Expiration timestamp (Unix seconds) |

### Issuing Tokens

```ts
import { ActionTokenService } from "@htx/engine";

const tokenService = new ActionTokenService("your-secret-key-at-least-32-bytes", 300);

const { token, jti, expires_at } = await tokenService.issue(
  "user-123",       // sub
  1,                // tenant_id
  "post",           // htx-context
  "42",             // htx-recordId (null for creates)
);
```

The constructor accepts a secret key string and an optional TTL in seconds (default: 300, i.e. five minutes). The key is encoded to `Uint8Array` internally and used with the `HS256` algorithm.

The returned `IssuedActionToken` contains the signed JWT string, the `jti` for replay tracking, and a formatted `expires_at` timestamp.

### Validating Tokens

```ts
const claims = await tokenService.validate(
  token,
  1,               // expected tenant_id
  "post",          // expected htx-context
  "42",            // expected htx-recordId
);
```

Validation performs these checks in order:

1. **Signature verification** -- The JWT signature is verified against the secret key using `HS256`. Invalid or tampered tokens throw immediately.
2. **Expiration** -- The `jose` library checks `exp` automatically. Expired tokens are rejected.
3. **Tenant match** -- The `tenant_id` claim must match the expected value.
4. **Context match** -- The `htx-context` claim must match the expected content type.
5. **Record ID match** -- When an expected record ID is provided, the `htx-recordId` claim must match.

Any mismatch throws an `Error` with a descriptive message.

### Decoding Without Verification

For debugging or logging, `decode()` returns claims without verifying the signature:

```ts
const claims = tokenService.decode(token);
```

This should never be used to make authorization decisions.

## Replay Protection

Action tokens are single-use. After a token is validated and the mutation executes, the token's `jti` is recorded in a **replay guard**. Any subsequent attempt to use the same token is rejected.

### The ReplayGuard Interface

```ts
interface ReplayGuard {
  isReplayed(jti: string): MaybePromise<boolean>;
  markUsed(jti: string, tenantId: number, expiresAt: string): MaybePromise<void>;
  cleanup(): MaybePromise<number>;
}
```

All three methods accept `MaybePromise` return types, so implementations can be synchronous (in-memory) or asynchronous (database-backed).

### InMemoryReplayGuard

The built-in `InMemoryReplayGuard` stores used token JTIs in a `Map`. It is suitable for single-process deployments:

```ts
import { InMemoryReplayGuard } from "@htx/engine";

const guard = new InMemoryReplayGuard();

guard.isReplayed("some-jti");                          // false
guard.markUsed("some-jti", 1, "2026-03-28 12:05:00");
guard.isReplayed("some-jti");                          // true
```

The `cleanup()` method removes entries whose `expires_at` timestamp has passed, returning the number of entries removed. This prevents the map from growing unbounded in long-running processes.

For multi-process or distributed deployments, implement `ReplayGuard` with a shared store (e.g. Redis or a database table).

## CSRF Protection

HTX uses the two-phase prepare/execute pattern as its CSRF defense:

1. The GET request renders the form and embeds a freshly signed action token in a hidden `htx-payload` field.
2. The POST request reads the `htx-payload` value and validates the token before executing any mutation.

Because the token is scoped to a specific content type, record, and tenant, and because it expires after a short window, a cross-site attacker cannot forge a valid payload. The token acts as both a CSRF token and a mutation authorization proof.

In templates, the pattern looks like this:

```html
<htx:type>post</htx:type>
<htx:action>save</htx:action>
<htx:response name="redirect">/admin/posts</htx:response>
<htx>
<form method="post">
  <input type="hidden" name="htx-payload" value="__payload__" />
  <!-- form fields -->
  <button type="submit">Create</button>
</form>
</htx>
```

The `__payload__` placeholder is replaced with the signed token during the prepare phase.

## Path Traversal Protection

The router validates that every resolved file path stays within the configured site root directory. The `isWithinRoot()` method computes the relative path from the site root to the candidate and rejects it if the relative path starts with `..` or is absolute:

```ts
private isWithinRoot(candidate: string, siteRoot: string): boolean {
  const relative = path.relative(siteRoot, candidate);
  return relative !== ".."
    && !relative.startsWith(`..${path.sep}`)
    && !path.isAbsolute(relative);
}
```

This check runs on every candidate file and directory during route resolution, including dynamic segment matches. Requests that attempt directory traversal receive no match and fall through to a 404 response.

## HTML Escaping

HTX applies HTML escaping at two levels to prevent cross-site scripting (XSS).

### Expression Engine

The expression evaluator escapes all `{{ expression }}` output by default. The `escapeHtml` function replaces the five dangerous characters:

| Character | Replacement |
|-----------|-------------|
| `&` | `&amp;` |
| `<` | `&lt;` |
| `>` | `&gt;` |
| `"` | `&quot;` |
| `'` | `&#039;` |

Raw (unescaped) output is available through `{{{ expression }}}` triple-brace syntax, which renders through the `raw_output` AST node and bypasses escaping. Use this only for trusted HTML content.

### Hydrator

The `Hydrator` applies the same five-character escape to all `__placeholder__` values before injecting them into templates. The only exception is the `body_html` field, which is in the `TRUSTED_HTML_FIELDS` set and is injected without escaping. This allows pre-rendered HTML content to pass through while all other fields are escaped.

## Expression Evaluator Limits

The expression evaluator enforces hard limits to prevent denial-of-service through template abuse:

| Limit | Value | Description |
|-------|-------|-------------|
| `MAX_LOOP_ITERATIONS` | 1,000 | Total loop iterations across all `each` blocks in one evaluation |
| `MAX_NESTING_DEPTH` | 10 | Maximum depth of nested `if` and `each` blocks |
| `MAX_FUNCTION_CALL_DEPTH` | 5 | Maximum depth of nested function calls |
| `MAX_OUTPUT_SIZE` | 1,048,576 (1 MB) | Maximum total output bytes from a single evaluation |

Exceeding any limit throws an `ExpressionLimitError`, which prevents the template from completing and returns an error response.

## Configuration

The secret key used for token signing is configured in `htx.config.json`:

```json
{
  "appName": "My App",
  "templatesDir": "app/templates",
  "publicDir": "app/public",
  "databasePath": "app/data/content.sqlite",
  "secretKey": "replace-this-secret-before-production-use!"
}
```

The default secret key (`dev-secret-key-at-least-32-bytes-long`) is intended for local development only. Replace it with a strong random string before deploying to production.
