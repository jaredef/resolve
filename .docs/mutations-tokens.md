# Mutations & Action Tokens

HTX mutations allow templates to create, update, and delete records through standard HTML forms. The system uses a two-phase prepare/execute architecture with cryptographically signed action tokens to ensure every mutation is intentional, scoped, and replay-resistant.

## Two-Phase Flow

Every mutation passes through two distinct phases. This separation is a core architectural constraint, not an optimization that can be simplified away.

### Phase 1: Prepare

When the engine renders a template containing `htx:action`, it generates a signed JWT called an **action token**. This token encodes what the form is allowed to do (the action type, target content type, and record ID). The token is embedded as a hidden field in the rendered form.

```
Template Render
    │
    ▼
Engine reads htx:action, htx:type, htx:recordId
    │
    ▼
JWT is minted with claims (action, type, recordId, expiry)
    │
    ▼
Token embedded as hidden input: htx-payload
    │
    ▼
HTML sent to browser
```

### Phase 2: Execute

When the user submits the form, the server receives the POST request, validates the action token, and only then performs the mutation through the data adapter.

```
Form POST received
    │
    ▼
Extract htx-payload token from form data
    │
    ▼
Validate JWT (signature, expiry, jti, claims)
    │
    ▼
Extract remaining form fields as record data
    │
    ▼
Call adapter.save / adapter.update / adapter.delete
    │
    ▼
Render appropriate response block
```

The two-phase design means the server never trusts the client to specify what operation to perform. The client can only submit a token that the server itself created.

---

## Action Types

The `htx:action` directive accepts one of three values.

| Action   | Adapter Method  | Requires `htx:recordId` | Description                    |
|----------|-----------------|--------------------------|--------------------------------|
| `save`   | `adapter.save`  | No                       | Create a new record            |
| `update` | `adapter.update`| Yes                      | Modify an existing record      |
| `delete` | `adapter.delete`| Yes                      | Remove an existing record      |

---

## Form Template Example

A complete mutation form with response handling:

```html
<htx htx:type="comment" htx:action="save">
  <form method="post">
    <label for="author">Name</label>
    <input type="text" id="author" name="author" required />

    <label for="body">Comment</label>
    <textarea id="body" name="body" required></textarea>

    <button type="submit">Submit</button>
  </form>

  <htx:response name="success">
    <p>Thank you for your comment.</p>
  </htx:response>

  <htx:response name="error">
    <p>Something went wrong. Please try again.</p>
  </htx:response>
</htx>
```

Every mutation form needs a hidden input called `htx-payload` that carries the signed action token. The engine handles this for you automatically, but you can also declare it explicitly.

**Terse form (auto-injected):**

```html
<form method="post">
  <label for="author">Name</label>
  <input type="text" id="author" name="author" required />
  <button type="submit">Submit</button>
</form>
```

When the engine sees a `<form>` inside an `htx:action` block without a `name="htx-payload"` input, it **automatically injects** `<input type="hidden" name="htx-payload" value="..." />` after the opening `<form>` tag during the prepare phase. The value is filled with the signed JWT.

**Explicit form (developer-declared):**

```html
<form method="post">
  <input type="hidden" name="htx-payload" value="__payload__" />
  <label for="author">Name</label>
  <input type="text" id="author" name="author" required />
  <button type="submit">Submit</button>
</form>
```

When the engine detects that `name="htx-payload"` already exists in the form, it **does not inject** a second one. Instead, it replaces the `__payload__` placeholder in your declared input with the signed JWT.

Both forms produce identical rendered output. Use the terse version for convenience, or the explicit version when you need control over the hidden input's position in the form.

### Update Example

```html
<htx htx:type="post" htx:action="update" htx:recordId="{{ route.id }}" htx:slug="{{ route.id }}">
  <form method="post">
    <label for="title">Title</label>
    <input type="text" id="title" name="title" value="__title__" />

    <label for="body">Body</label>
    <textarea id="body" name="body">__body__</textarea>

    <button type="submit">Update</button>
  </form>

  <htx:response name="success">
    <p>Post updated.</p>
  </htx:response>
</htx>
```

The `htx:slug` fetches the current record so that form fields can be pre-populated with existing values via placeholders.

### Delete Example

```html
<htx htx:type="post" htx:action="delete" htx:recordId="{{ route.id }}">
  <form method="post">
    <button type="submit">Delete this post</button>
  </form>

  <htx:response name="redirect" url="/blog">
  </htx:response>

  <htx:response name="error">
    <p>Could not delete the post.</p>
  </htx:response>
</htx>
```

---

## Response Blocks

After a mutation executes, the engine selects which response block to render. Response blocks are defined using `htx:response` with a `name` attribute.

### Available Response Types

| Name       | Rendered When                                   | Attributes         |
|------------|--------------------------------------------------|-------------------|
| `redirect` | Mutation succeeds (takes priority over success)  | `url` (required)  |
| `success`  | Mutation succeeds and no redirect is defined      | none              |
| `error`    | Mutation fails (adapter throws or returns error)  | none              |
| `none`     | No mutation occurred (initial page load)          | none              |

### Priority Order

When a mutation succeeds, the engine checks response blocks in this order:

1. **redirect** -- If present, the server issues an HTTP 303 redirect to the specified URL. No HTML is rendered.
2. **success** -- If present (and no redirect block exists), the success block content is rendered.
3. **Fall through** -- If neither redirect nor success is defined, the form re-renders in its initial state.

When a mutation fails:

1. **error** -- If present, the error block content is rendered.
2. **Fall through** -- If no error block is defined, the form re-renders in its initial state with no feedback.

On initial GET requests (no mutation):

1. **none** -- If present, the none block is rendered instead of the form.
2. **Fall through** -- The form renders normally.

---

## How the Magic Works: Auto-Injected Payload

When the engine renders a form inside an `htx:action` block, it automatically handles the secure token plumbing. You don't need to add any hidden inputs or token fields — just write your form.

### What the Engine Does

During the **prepare phase**, the engine:

1. Detects any `<form>` tag inside the `htx:action` block
2. Checks if a `name="htx-payload"` hidden input already exists
3. If not, **automatically injects** the hidden input after the opening `<form>` tag
4. Fills the value with a signed JWT containing the action type, content type, and record ID

The browser receives a form with the token already embedded. When submitted, the server validates the token and performs the mutation.

### Explicit Override

If you manually include the hidden input, the engine will **not** double-inject. It detects the existing field and uses it as-is. This is useful if you need to control the exact position of the hidden input in the form.

### Why This Is Safe

- The token is **server-generated** during the prepare phase — the client cannot forge it
- The token is **cryptographically signed** with the server's secret key
- Each token has a **unique ID (jti)** for replay protection
- The token **expires** after 5 minutes by default
- The hidden input is injected **server-side** before the HTML reaches the browser

---

## JWT Claims

The action token is a signed JWT containing the following claims.

| Claim          | Type   | Description                                               |
|----------------|--------|-----------------------------------------------------------|
| `sub`          | string | Action type: `save`, `update`, or `delete`                |
| `jti`          | string | Unique token identifier (UUID v4) for replay protection   |
| `htx-context`  | string | Content type (value of `htx:type`)                        |
| `htx-recordId` | string | Target record ID (value of `htx:recordId`), null for save |
| `iat`          | number | Issued-at Unix timestamp                                  |
| `exp`          | number | Expiration Unix timestamp                                 |

Example decoded payload:

```json
{
  "sub": "update",
  "jti": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "htx-context": "post",
  "htx-recordId": "post_42",
  "iat": 1774900000,
  "exp": 1774903600
}
```

---

## Token Validation

During the execute phase, the server performs five checks on the submitted token. All checks must pass for the mutation to proceed.

### Check 1: Signature Verification

The JWT signature is verified using the server's secret key. If the signature is invalid, the token has been tampered with and the request is rejected with a 403 response.

### Check 2: Expiration

The `exp` claim is compared to the current server time. Expired tokens are rejected with a 403 response. The default token lifetime is 5 minutes.

### Check 3: Replay Protection

The `jti` (JWT ID) is checked against a server-side set of consumed token IDs. If the `jti` has already been used, the token is a replay and the request is rejected with a 403 response. After successful validation, the `jti` is added to the consumed set.

### Check 4: Claim Integrity

The `sub`, `htx-context`, and `htx-recordId` claims must be present and well-formed. The `sub` must be one of the three valid action types. The `htx-context` must be a non-empty string. For `update` and `delete` actions, `htx-recordId` must be non-null.



### Validation Failure Summary

| Check               | Failure Response | Reason                          |
|----------------------|------------------|---------------------------------|
| Signature            | 403 Forbidden    | Token tampered or forged        |
| Expiration           | 403 Forbidden    | Token has expired               |
| Replay               | 403 Forbidden    | Token already consumed          |
| Claim integrity      | 400 Bad Request  | Malformed or missing claims     |

---

## Form Data Mapping

When a valid POST is received, the engine separates the form data into internal fields and record data.

### Internal Fields

The following field names are extracted from the form data and consumed by the engine. They are never passed to the data adapter.

| Field Name      | Purpose                               |
|-----------------|---------------------------------------|
| `htx-payload`   | The signed action token (JWT)        |

### Record Data

All remaining form fields are passed to the data adapter as the record's data payload. Field names become record field names.

```html
<input name="title" value="My Post" />
<textarea name="body">Content here</textarea>
<input name="category" value="news" />
```

This produces the following data object for the adapter:

```json
{
  "title": "My Post",
  "body": "Content here",
  "category": "news"
}
```

The adapter receives the content type from the token's `htx-context` claim and the record ID from `htx-recordId`. The adapter is responsible for validating and sanitizing field values according to its own schema.

---

## Replay Protection

Replay protection prevents a captured form submission from being resubmitted. The mechanism relies on the `jti` claim in each action token.

### How It Works

1. Each action token is minted with a unique `jti` (UUID v4).
2. When the token is consumed during a successful mutation, the `jti` is stored in a server-side consumed set.
3. Subsequent submissions with the same `jti` are rejected.

### JTI Cleanup

The consumed set does not grow unboundedly. The engine periodically purges entries whose corresponding token has expired (based on the token's `exp` claim). Since tokens have a finite lifetime (default: 5 minutes), the consumed set is bounded by the rate of form submissions within the expiry window.

Cleanup runs on a configurable interval. The default is every 15 minutes.

### Storage

The consumed set must be shared across all server instances in a multi-process or clustered deployment. Supported backends include:

- **In-memory** -- Suitable for single-process deployments. Lost on restart.
- **Adapter-backed** -- Uses the data adapter's key-value or set storage. Persists across restarts.

The storage backend is configured at the engine level, not per-template.

---

## Secret Key Management

The JWT signing key is a symmetric secret used by the engine to sign and verify action tokens. It is passed to `ActionTokenService` as a constructor argument.

### Configuration

The secret key is set in your application's config and passed to the `ActionTokenService` when constructing the request handler:

```typescript
// app/config.ts
secretKey: process.env.HTX_SECRET_KEY ?? "change-me-in-production",

// app/public/index.ts
const tokenService = new ActionTokenService(config.secretKey);
```

### Requirements

- The key should be a strong random string (at least 32 characters recommended).
- The key must be consistent across all server processes handling the same site.
- The key must not be committed to version control — use an environment variable in production.

### In Production

Set the key via environment variable:

```
HTX_SECRET_KEY=your-strong-random-secret-here
```

If no environment variable is set and the default key is used, action tokens will still work but are not secure for production use.

---

## Complete Flow Diagram

```
┌──────────────────────────────────────────────┐
│              Phase 1: Prepare                │
│                                              │
│  1. Render template with htx:action          │
│  2. Mint JWT (sub, jti, context, recordId)   │
│  3. Embed token as htx-payload hidden input             │
│  4. Send HTML form to browser                │
│                                              │
└──────────────────────┬───────────────────────┘
                       │  User fills form,
                       │  clicks submit
                       ▼
┌──────────────────────────────────────────────┐
│              Phase 2: Execute                │
│                                              │
│  1. Receive POST with htx-payload + fields   │
│  2. Validate signature                       │
│  3. Check expiration                         │
│  4. Check replay (jti)                       │
│  5. Verify claims                            │
│  6. Extract record data from form fields     │
│  7. Call adapter method (save/update/delete)  │
│  8. Record jti as consumed                   │
│  9. Select response block (redirect/success/  │
│     error) and render                        │
│                                              │
└──────────────────────────────────────────────┘
```
