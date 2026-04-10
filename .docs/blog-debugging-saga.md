We spent an afternoon building an e-commerce store on a Raspberry Pi with the Hypermedia App stack. Along the way, every assumption we had about how the engine works was tested — and several broke. Here is every bug we hit, every file we touched, and what we learned.

## The Cast of Characters

Five engine files absorbed most of the changes. None of them are application code — they are the HTX engine itself:

| File | What It Does | What We Changed |
|------|-------------|----------------|
| packages/htx-engine/src/executors/get-content-executor.ts | Renders content queries and template blocks | htx:rel directive, balanced htx:each matcher, async adapter calls, relational block resolution |
| packages/htx-engine/src/runtime/request-handler.ts | The request pipeline — auth, blocks, expressions, hydration, layout | Auth context injection, middleware chain, context providers, login/logout actions, auth directives, cookie passthrough |
| packages/htx-engine/src/parser/dsl-parser.ts | Parses HTX template blocks and meta directives | Backreference fix in directive region regex |
| packages/htx-engine/src/services/hydrator.ts | Replaces __placeholder__ tokens with data | Expression escaping in trusted HTML fields |
| packages/htx-engine/src/expressions/evaluator.ts | Evaluates expressions inside templates | Loop iteration limit bump (symptom of shared mutable state) |

## Bug 1: The Inflated Benchmark (6,654 was actually 404s)

We benchmarked the blog post page at 6,654 req/sec and published it. Then we ran a battery test that verified the response content — and discovered the server was returning 22-byte 404 responses, not 26KB pages. The stale server process had not picked up the async adapter changes, so blog routes failed to resolve.

**The real number:** 850 req/sec. We corrected the article and published the methodology for verifying benchmarks before trusting throughput numbers.

**Lesson:** Always check Document Length in ab output. If it is tiny, you are benchmarking error pages.

## Bug 2: The Parser Ate the Nav Tag (regionStart too wide)

When we nested an independent query block inside htx:each, the surrounding HTML disappeared. The product detail page lost its nav breadcrumb and all placeholder values rendered empty.

**Root cause:** The DSL parser's directive region regex matched htx:each as an opening tag paired with a differently-named closing tag. The regex /htx:NAME...htx:NAME/ matched htx:each...htx:type because both start with htx:. The lazy quantifier consumed everything between them — including the nav tag.

**Fix:** One character. Added a backreference so the closing tag must match the opening tag name: changed htx:[a-zA-Z] to htx:([a-zA-Z][\w-]*) with \1 for the close.

**File:** dsl-parser.ts line 46

## Bug 3: The Hydrator Consumed the Redirect Marker

After implementing htx:action login, the login form POST returned 200 with an error message instead of 302 with a redirect. The auth provider validated correctly and set the session cookie — but the page did not redirect.

**Root cause:** The redirect marker __htx_redirect__/admin was consumed by the hydrator. The hydrator's __placeholder__ replacement pattern matched __htx_redirect__ as a placeholder called htx_redirect, replaced it with empty string (no such field in the data), and the redirect marker disappeared before the response handler could detect it.

**Fix:** Changed the redirect marker from __htx_redirect__ to %%HTX_REDIRECT%% — a format the hydrator does not recognize.

**File:** request-handler.ts (5 occurrences)

## Bug 4: Expressions in body_html Evaluated as Code

A blog post about the HTX template language contained code examples with expression syntax. The expression engine evaluated these as real expressions, causing "Unclosed block — expected endeach" errors.

**Root cause:** The hydrator injects body_html (trusted HTML, no escaping) before the expression engine runs. Any expression syntax in the article content — written as documentation about HTX — gets evaluated as live code.

**Fix:** The hydrator now escapes double-braces to backslash-double-braces in trusted HTML fields before injection. The expression engine skips backslash-prefixed expressions. finalizeLiteralOutput strips the backslash for clean display.

**File:** hydrator.ts — new escapeExpressions() static method, applied to trusted field injection

## Bug 5: htx:each Regex Breaks with Nested Tags

When htx:rel blocks (which contain their own htx:each) were inside a parent htx:each, the regex-based each matching truncated the item template at the inner closing tag instead of the outer one.

**Root cause:** The regex /<htx:each...>(.*?)<\/htx:each>/gs uses non-greedy matching. The first </htx:each> it finds — the inner one from the rel block — matches the outer opening tag. The item template is truncated.

**Fix:** Replaced the regex with findEachBlocks() — a balanced matcher that tracks nesting depth. It counts htx:each opens and closes, only capturing blocks at depth zero. It also sets the regex lastIndex past the balanced block to prevent inner matches from being returned as separate blocks.

**File:** get-content-executor.ts — new findEachBlocks() method replacing the regex

## Bug 6: Nested Blocks in htx:none Resolve Prematurely

Placing a fallback query block inside htx:none caused it to execute even when the parent query returned results. The store page showed both the category content AND a "not found" message.

**Root cause:** renderNestedBlocks() runs on the full template before the parent query executes. It discovers blocks inside htx:none and resolves them. The resolved output replaces the block region. When the parent query succeeds, hydrateWithData strips htx:none tags — but the inner block's rendered output is already embedded.

**Fix:** Architectural — do not nest query blocks inside htx:none. Use namespaced routes or static fallback content instead. Engine-level fix (deferred htx:none resolution) proposed in RFC issue #35.

## Bug 7: Expression Evaluator Loop Counter Leak

The htx-faster store home page intermittently failed with "Maximum loop iterations of 1000 exceeded" despite having only ~120 iterations in its expression loops. First request after restart worked; subsequent requests failed.

**Root cause:** The Evaluator is a singleton with mutable instance fields (loopIterations, scopeStack, etc.). The counter resets at the start of each evaluate() call, but the RequestHandler is async — two concurrent requests can interleave at await points, corrupting each other's counter state.

**Fix (temporary):** Bumped MAX_LOOP_ITERATIONS from 1000 to 10000. This masks the issue. The proper fix is eliminating shared mutable state — either per-evaluation scoped counters or a new Evaluator instance per call. Filed as issue #39.

**File:** evaluator.ts line 13

## Bug 8: Stale Server Process (The Ghost in the Machine)

Multiple debugging sessions were extended by hours because the running Bun server did not reflect code changes. Template files (.htx) reload from disk on every request, but TypeScript module code (context providers, middleware, auth providers) is compiled once at startup.

This caused:
- The async adapter changes not taking effect (Bug 1)
- Context provider data appearing empty when it was correct in isolation (Bug 7's investigation)
- Auth directives not being recognized after adding them to the layout

**Lesson:** Always restart the server after changing any .ts file. Templates are live. Code is compiled.

## The Pattern

Every bug fell into one of three categories:

**1. Shared mutable state** — The evaluator singleton, the hydrator's global replaceAll, the parser's regex state. Single-threaded does not mean single-context when async/await allows interleaving.

**2. Ordering assumptions** — renderNestedBlocks before the query. Expression evaluation after hydration. The layout applied between two expression passes. Every time we assumed "A happens before B so B can use A's output," we found a case where the ordering broke.

**3. Pattern collision** — __placeholder__ matching the redirect marker. The directive regex matching different tag names. The htx:each regex matching nested tags. Every string-based pattern in the engine is a potential collision with content that looks similar but means something different.

## What We Changed in the Engine

Total engine changes across the session:

- **htx:rel** — New relational query directive for parent-child resolution
- **Balanced htx:each** — Replaced regex with depth-tracking matcher  
- **Async ContentAdapter** — MaybePromise return types, await in all executors
- **Router priority** — Dynamic directories before catch-all files
- **Parser backreference** — Matching tag names in directive regions
- **htx:auth** — Pluggable auth with SessionAuthProvider
- **Module system** — Middleware chain, context providers, template functions
- **Response cookies** — Set-Cookie passthrough for auth and cart
- **Hydrator expression escaping** — Protect trusted HTML from evaluation
- **Loop limit bump** — 1000 to 10000 (temporary)

None of these are application code. They are all engine-level changes that any HTX application benefits from. The e-commerce store was the stress test that found them.
