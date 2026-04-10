HTX uses a two-phase mutation system to handle content creation, updates, and deletion. Phase 1 (GET) prepares a signed action token and embeds it directly in the rendered HTML — the client never makes a separate request to obtain a token. When the browser receives the initial HTTP response, the form already contains the signed token as a hidden field. Phase 2 (POST) validates that token and executes the mutation. This design provides CSRF protection and replay prevention without requiring session state or additional round-trips.

## Two-Phase Mutation Flow

### Phase 1: Prepare (GET Request)

When a user visits a page containing a mutation block, the `RequestHandler` detects the `<htx:action>` directive and calls the appropriate executor's `prepare` method. This method:

1. Parses the DSL block to extract meta directives and the template
2. Issues a signed JWT action token via `ActionTokenService`
3. Injects the token and endpoint into the template as hidden fields
4. If editing an existing record, hydrates the form with current field values
5. Returns the rendered HTML form

### Phase 2: Execute (POST Request)

When the form is submitted, the `RequestHandler` detects the `htx-token` field in the POST body and calls the executor's `execute` method. This method:

1. Validates the JWT signature, expiration, context, and record ID
2. Checks the replay guard to ensure the token has not been used before
3. Marks the token as used in the replay guard
4. Executes the mutation (create, update, or delete) via the content adapter
5. Returns a response based on the configured response templates

## The `<htx:action>` Directive

The `<htx:action>` directive declares the mutation type for a block. It accepts three values:

| Action | Operation | Executor |
|--------|-----------|----------|
| `save` | Create a new record | `SetContentExecutor` |
| `update` | Update an existing record | `SetContentExecutor` |
| `delete` | Delete an existing record | `DeleteContentExecutor` |

The action value is embedded in the JWT token as the `htx-context` claim and validated on submission.

## The `<htx:recordId>` Directive

For update and delete operations, `<htx:recordId>` identifies the target record. It supports expression interpolation:

```html
<htx:recordId>\{{ route.id }}</htx:recordId>
```

If `<htx:recordId>` is not specified, the engine falls back to `route.id` from the URL parameters. For delete operations, a record ID is required and the executor throws an error if none is found.

## Form Rendering

### Hidden Token Fields

During Phase 1, the executor injects a JSON payload into the template. The payload is available as the `__payload__` placeholder and contains:

| Field | Purpose |
|-------|---------|
| `htx-token` | The signed JWT action token |
| `htx-context` | The action type (`save`, `update`, or `delete`) |
| `htx-recordId` | The target record ID (if applicable) |
| `type` | The content type |

A typical form template uses a hidden input to carry this payload:

```html
<htx:type>post</htx:type>
<htx:action>save</htx:action>

<htx>
<form method="POST">
  <input type="hidden" name="htx-payload" value="__payload__">
  <input type="text" name="title" placeholder="Title">
  <textarea name="body"></textarea>
  <button type="submit">Save</button>
</form>
</htx>
```

The `__endpoint__` placeholder is also available and resolves to the mutation API path (e.g., `/api/content/save`).

### Pre-filling Edit Forms

When `<htx:action>` is `update`, the executor loads the existing record from the content adapter and hydrates the template with its values. Standard `__placeholder__` tokens are replaced with the record's current data:

```html
<htx:type>post</htx:type>
<htx:action>update</htx:action>
<htx:recordId>\{{ route.id }}</htx:recordId>

<htx>
<form method="POST">
  <input type="hidden" name="htx-payload" value="__payload__">
  <input type="text" name="title" value="__title__">
  <textarea name="body">__body__</textarea>
  <select name="status">
    <option value="draft">Draft</option>
    <option value="published">Published</option>
  </select>
  <button type="submit">Update</button>
</form>
</htx>
```

## How Form Data Maps to Content Fields

When a form is submitted, the POST body is processed as follows:

1. **Internal fields are extracted and removed:** `htx-token`, `htx-context`, `htx-recordId`, and `htx-payload` are consumed by the mutation system and stripped from the data.
2. **The `type` field is preserved:** Used to determine the content type for the adapter call.
3. **Remaining fields become content data:** Every other form field is passed to the adapter's `create` or `update` method.

The content adapter is responsible for deciding which fields are system columns and which are stored in the `meta` JSON column. The mutation system does not distinguish between them.

### Payload Merging

If the form includes an `htx-payload` hidden field (a JSON string), the handler merges its contents into the POST body. This allows the token, context, and record ID to be carried in a single hidden input rather than multiple fields.

## Response Blocks

Response blocks define what happens after a mutation completes. They are declared as siblings of the `<htx>` template block:

```html
<htx:response name="redirect">/admin/posts</htx:response>
<htx:response name="success"><div class="success">Post saved.</div></htx:response>
<htx:response name="error"><div class="error">__error__</div></htx:response>
```

### Response Types

| Name | When Used | Default |
|------|-----------|---------|
| `redirect` | Successful mutation; the engine returns an HTTP redirect to this URL | None |
| `success` | Successful mutation when no redirect is configured; rendered as HTML | `<div class="success">Operation completed.</div>` |
| `error` | Failed mutation; rendered as HTML with the error message | `<div class="error">__error__</div>` |

### Response Priority

If a `redirect` response is defined, it takes precedence over `success`. The engine returns an HTTP redirect response (status 302) with the redirect URL.

### Placeholders in Responses

Response templates support the same `__placeholder__` syntax as regular templates. After a successful mutation, placeholders are resolved against the created or updated record. After a failed mutation, `__error__` contains the error message.

Response templates also support `%%field%%` percent-delimited placeholders as a secondary replacement pass. These are HTML-escaped and resolved against the same record values.

## CSRF Protection

Every mutation form includes a signed JWT action token that serves as a CSRF token. The token binds the form to:

- **Subject** (`sub`): The identity of the user or session
- **Context** (`htx-context`): The action type (`save`, `update`, `delete`)
- **Record ID** (`htx-recordId`): The specific record being mutated (for updates and deletes)
- **Expiration** (`exp`): Default TTL of 300 seconds (5 minutes)

The token is signed with HS256 using a server-side secret key. On submission, the `ActionTokenService` verifies:

1. The JWT signature is valid
2. The token has not expired
3. The context matches the expected action
4. The record ID matches (for updates and deletes)

If any check fails, the mutation is rejected with an error.

### Token Claims

| Claim | Type | Purpose |
|-------|------|---------|
| `sub` | string | Subject identifier |
| `jti` | string | Unique token ID (UUID) |
| `htx-context` | string | Action type |
| `htx-recordId` | string or null | Target record ID |
| `iat` | number | Issued-at timestamp |
| `exp` | number | Expiration timestamp |

## Replay Guards

To prevent form double-submission and token reuse, every token includes a unique `jti` (JWT ID). After a token is validated and the mutation executes, the `jti` is marked as used in the replay guard.

If the same token is submitted again, the replay guard detects it and the mutation is rejected with the error: "Token has already been used (replay detected)."

### InMemoryReplayGuard

The default implementation stores used token IDs in a `Map` in process memory. It provides a `cleanup` method that removes expired entries.

```ts
import { InMemoryReplayGuard } from "@htx/engine";

const guard = new InMemoryReplayGuard();

guard.isReplayed("some-jti");          // false
guard.markUsed("some-jti", "2025-01-15 10:35:00");
guard.isReplayed("some-jti");          // true

guard.cleanup();                       // Removes expired entries
```

### Custom Replay Guards

Implement the `ReplayGuard` interface to use a persistent store (e.g., a database table):

```ts
interface ReplayGuard {
  isReplayed(jti: string): MaybePromise<boolean>;
  markUsed(jti: string, expiresAt: string): MaybePromise<void>;
  cleanup(): MaybePromise<number>;
}
```

All methods accept either synchronous or asynchronous return values via `MaybePromise`.

## Example: Complete CRUD Flow

The following examples show how to build a full create/edit/delete workflow for a `post` content type.

### Create (New Post)

**File:** `templates/admin/posts/new.htx`

```html
<htx:type>post</htx:type>
<htx:action>save</htx:action>

<htx:response name="redirect">/admin/posts</htx:response>
<htx:response name="error"><div class="error">__error__</div></htx:response>

<htx>
<h1>New Post</h1>
<form method="POST">
  <input type="hidden" name="htx-payload" value="__payload__">

  <label>Title</label>
  <input type="text" name="title" required>

  <label>Slug</label>
  <input type="text" name="slug">

  <label>Body</label>
  <textarea name="body"></textarea>

  <label>Status</label>
  <select name="status">
    <option value="draft">Draft</option>
    <option value="published">Published</option>
  </select>

  <button type="submit">Create Post</button>
</form>
</htx>
```

**Flow:**

1. GET `/admin/posts/new` -- the engine sees `<htx:action>save</htx:action>`, calls `SetContentExecutor.prepare`, issues a token, and renders the empty form with the token injected into `__payload__`.
2. POST `/admin/posts/new` -- the engine detects `htx-token` in the body, calls `SetContentExecutor.execute`, validates the token, creates the record, and redirects to `/admin/posts`.

### Edit (Update Post)

**File:** `templates/admin/posts/[id]/edit.htx`

```html
<htx:type>post</htx:type>
<htx:action>update</htx:action>
<htx:recordId>\{{ route.id }}</htx:recordId>

<htx:response name="redirect">/admin/posts</htx:response>
<htx:response name="error"><div class="error">__error__</div></htx:response>

<htx>
<h1>Edit Post</h1>
<form method="POST">
  <input type="hidden" name="htx-payload" value="__payload__">

  <label>Title</label>
  <input type="text" name="title" value="__title__" required>

  <label>Slug</label>
  <input type="text" name="slug" value="__slug__">

  <label>Body</label>
  <textarea name="body">__body__</textarea>

  <label>Status</label>
  <select name="status">
    <option value="draft">Draft</option>
    <option value="published">Published</option>
  </select>

  <button type="submit">Update Post</button>
</form>
</htx>
```

**Flow:**

1. GET `/admin/posts/5/edit` -- the engine resolves `route.id` to `5`, loads the existing record from the adapter, hydrates the form fields with current values, issues a token bound to record ID `5` and context `update`, and renders the pre-filled form.
2. POST `/admin/posts/5/edit` -- the engine validates the token (checking that it was issued for an `update` on record `5`), updates the record with the submitted form data, and redirects to `/admin/posts`.

### Delete (Remove Post)

**File:** `templates/admin/posts/[id]/delete.htx`

```html
<htx:type>post</htx:type>
<htx:action>delete</htx:action>
<htx:recordId>\{{ route.id }}</htx:recordId>

<htx:response name="redirect">/admin/posts</htx:response>
<htx:response name="error"><div class="error">__error__</div></htx:response>

<htx>
<h2>Delete "__title__"?</h2>
<p>This action cannot be undone.</p>
<form method="POST">
  <input type="hidden" name="htx-payload" value="__payload__">
  <button type="submit">Confirm Delete</button>
  <a href="/admin/posts">Cancel</a>
</form>
</htx>
```

**Flow:**

1. GET `/admin/posts/5/delete` -- the engine loads the record to display its title in the confirmation prompt, issues a token bound to record ID `5` and context `delete`, and renders the confirmation form.
2. POST `/admin/posts/5/delete` -- the engine validates the token (checking context `delete` and record `5`), deletes the record, and redirects to `/admin/posts`.

## Error Handling

Mutation errors are handled at two levels:

1. **Token validation errors** (invalid signature, expired token, context/record mismatch, replay) throw exceptions that the `RequestHandler` catches and returns as HTTP 422 responses.
2. **Adapter errors** (database failures, constraint violations) are caught by the executor and rendered using the `error` response template. The `__error__` placeholder contains the error message.

If no `error` response template is defined, the executor falls back to the default: `<div class="error">__error__</div>`.