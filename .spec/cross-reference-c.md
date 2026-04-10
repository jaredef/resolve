# Cross-Reference Analysis: C Implementation

**Date:** 2026-04-05
**Subject:** presto-c engine (3,123 lines across engine.c/engine.h/main.c/test.c)
**Comparison base:** PRESTO Seed v6, Go/TS cross-reference, implementation-observations

---

## What C Reveals That Higher-Level Languages Mask

The C implementation is the sixth conformant htxlang engine. It surfaces 9 findings not visible in GC languages, primarily around ownership semantics, capacity limits, incomplete standard-library equivalents, and security gaps that raw string manipulation makes visible.

---

## 1. Memory Ownership Semantics

### 1.1 Caller-Owns-Result Protocol

Every pipeline stage function returns `char *` that the caller must free. The 22-stage pipeline is a cascade of `free(stageN)` calls between stages. This is invisible in GC languages where string concatenation is optimized (Go's `strings.Builder`, JS string interning).

### 1.2 Context-Owns-Value Protocol

When `htx_ctx_set` is called, the context takes ownership of the `HtxValue *`. The caller must NOT free it afterward. This creates a subtle trap: after inserting a value, the caller must re-fetch via `htx_ctx_get` if continued access is needed. In GC languages, shared references survive naturally.

**Finding:** The seed's "mutable key-value map" hides a critical design decision about value ownership. Values placed into the data context are consumed by it.

### 1.3 Deep Clone for htx:each

Each loop iteration does `htx_val_clone(items->d.arr.items[i])` before inserting into the child context. Without this, `htx_ctx_free(child)` destroys the original array element. Go and TypeScript never confront this.

**Finding:** "Create child context" is ambiguous about copy semantics. In C, it requires a deep clone of each array element.

---

## 2. SQL Injection Surface in Where Clauses

The `sqlite_query` function directly interpolates the `where_clause` into SQL via `snprintf`:

```c
if (where_clause && where_clause[0])
    pos += snprintf(sql + pos, sizeof(sql) - pos, " WHERE %s", where_clause);
```

The `htx_resolve_data` function resolves `{htx:}` expressions within the where clause before passing it to the adapter. If an expression resolves to user-controlled input (e.g., a route param), this is a SQL injection vector. Present in all implementations but most visible in C's raw string formatting.

**Finding:** Critical security gap. The spec says nothing about SQL injection in where clauses.

---

## 3. Dynamic Route Parameter Discovery

The router hardcodes `param_names[] = {"slug", "id", "param"}` instead of scanning the directory for `[bracket].htx` files. A template using `[category].htx` or `[username].htx` would silently fail. Go used `os.ReadDir` to scan for bracket-prefixed filenames.

**Finding:** The spec must require directory scanning, not assumed parameter names.

---

## 4. Grant Token Subject Identity

Grant tokens always use `"sub":"user"` — no actual authenticated user identity injected. Any grant token could be used by any user.

**Finding:** Grant tokens must include the authenticated user's identity.

---

## 5. Token Encoding Precision

The hand-rolled `htx_base64url_encode` explicitly strips padding. The decoder must re-add `=` padding to decode. The format is specifically base64url-nopad, not base64url-with-pad.

**Finding:** Spec should specify "base64url-nopad (RFC 4648 Section 5, padding removed)."

---

## 6. Form-Urlencoded Parsing Incomplete

The form parser only converts `+` to space. It does NOT decode `%XX` hex sequences. A form field containing `hello%20world` is stored literally.

**Finding:** Spec must require percent-decoding per RFC 3986.

---

## 7. POST Short-Circuits the Pipeline

POST requests bypass stages 3-22 entirely, going directly to mutation handling. Mutations do not render templates.

**Finding:** Spec should clarify POST produces JSON response and does not execute the template pipeline.

---

## 8. Fixed Capacity Limits

The C implementation uses compile-time limits:
- `HTX_MAX_SCRIPTS 128`
- `HTX_MAX_MARKERS 256`
- `HTX_MAX_ACTIONS 64`
- `HTX_MAX_PARAMS 32`

Exceeding these causes silent truncation. GC languages use dynamic collections.

**Finding:** Spec should recommend minimum capacities with warnings on overflow.

---

## 9. Float Truthiness Gap

The C value system has no float type. SQLite REAL columns fall through to string. The truthiness check for `0` applies only to integers. A float `0.0` would not be caught.

**Finding:** Truthiness should explicitly include float zero.

---

## 10. Additional Observations

### Pattern Compatibility
Every `pcre2_compile` call includes `PCRE2_DOTALL`. The seed's patterns use `[\s\S]` for multiline, which is equivalent. Patterns avoid backreferences and lookaround, making them RE2-compatible.

### Template Error Fallbacks
The C implementation produces HTML comments for ALL resolution failures (circular, not-found, path traversal, depth exceeded), not just circular references. This generalizes the spec's fallback requirement.

### Stage 15b After Expression Evaluation
Layout directive extraction occurs after expression evaluation (stage 15), meaning `<htx:layout src="{htx:somePath}" />` works with dynamic paths.

### Middleware Chain Not Implemented
Stage 3 is a placeholder. The middleware `handle(request, next)` chain-of-responsibility pattern was defined in the header but not wired up in the pipeline.

### No Per-Provider Error Isolation
Context providers execute in a bare loop with no error isolation. A segfault in one provider kills the process. Higher-level languages wrap in try/catch or defer/recover.

---

## Recommended Spec Amendments

| # | Priority | Amendment | Section |
|---|----------|-----------|---------|
| 1 | HIGH | Where clauses resolved from user input MUST be parameterized by the adapter | C8 Security |
| 2 | HIGH | Dynamic route [param] discovery MUST scan directory, not assume names | Router |
| 3 | HIGH | Grant tokens MUST include authenticated user identity in sub field | C3 Grants |
| 4 | MEDIUM | Each iteration MUST receive independent copy of item value | Core Algorithms |
| 5 | MEDIUM | Values placed into data context are owned by the context | Core Algorithms |
| 6 | MEDIUM | Specify base64url-nopad (RFC 4648 Section 5, no padding) | Token Formats |
| 7 | MEDIUM | Form-urlencoded parsing MUST decode %XX per RFC 3986 | Request body parsing |
| 8 | MEDIUM | POST mutations produce JSON, do NOT execute template pipeline | C4 Mutations |
| 9 | MEDIUM | All resolution errors SHOULD produce HTML comment fallbacks | C2 Resolution |
| 10 | MEDIUM | Stages 5/17 are module extension hooks (identity when empty) | Pipeline |
| 11 | MEDIUM | Stage 15b occurs after expression eval, enabling dynamic layouts | Pipeline |
| 12 | LOW | Patterns must be RE2-compatible, evaluated with DOTALL | Patterns |
| 13 | LOW | Recommend minimum capacities: 128 scripts, 64 actions, 256 markers | Guidance |
| 14 | LOW | Truthiness: "0 (integer or float)" | Core Algorithms |
| 15 | LOW | ContentAdapter.query returns empty array for nonexistent types | Interface |
| 16 | LOW | Handle resource exhaustion gracefully | C8 Security |
| 17 | LOW | Distinguish boot-time writes from request-time reads in concurrency | C8 Security |

---

## Comparison with Previous Findings

**Confirmed from Go/TS cross-reference:** Layout extraction before stripping, htx:raw protection during stripping, marker-based script protection.

**New from C:** Ownership semantics (#4, #5), capacity limits (#13), SQL injection surface (#1), incomplete percent-decoding (#7), route parameter hardcoding (#2), grant token identity gap (#3), float truthiness (#14), base64url padding precision (#6).

**Pattern:** Each language in the verification loop reveals findings proportional to how much infrastructure the language's standard library provides. C provides the least, therefore exposes the most implicit assumptions. The SQL injection finding is the most critical — it's a latent vulnerability present in every implementation but invisible behind ORM layers and prepared statement APIs that higher-level languages encourage.
