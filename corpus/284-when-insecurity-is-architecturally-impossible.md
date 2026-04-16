# When Insecurity Is Architecturally Impossible

**Compares the RESOLVE resolver's constraint-derived security architecture with the compensating-layer security model that produced incidents like Loom's session-leakage bug — where cookie-based stateful session management failed and users saw other users' private data. Argues that the difference is not one of degree (better security) but of kind (structural impossibility vs. policy-dependent prevention)**

**Document 284 of the RESOLVE corpus**

---

## Jared's Loom story

Jared logged into Loom and saw another user's videos. Not his own. A finance executive's presentation to colleagues. Private corporate content. Displayed to a stranger because the session infrastructure failed.

This is not an unusual incident. Loom disclosed a cookie session bug in which session tokens were being misrouted, causing authenticated users to see other users' content. The root cause: a compensating-layer architecture in which security depends on the *correct behavior* of a stateful session system — cookies, server-side session stores, load-balancer affinity, cache invalidation. When any layer in that stack misbehaves, the security guarantee collapses, because the guarantee was never structural. It was policy-dependent.

The incident pattern is common across the industry:

- **Loom** — session cookie misrouting exposed other users' video content
- **ChatGPT** (March 2023) — a Redis cache bug exposed other users' chat titles and payment information to unrelated sessions
- **Notion** — session token reuse across workspaces exposed cross-tenant data
- **Numerous SaaS platforms** — cookie/session-store misconfigurations routinely surface in bug bounties and incident reports

In each case, the architecture assumed that a complex stateful system would behave correctly under all conditions. When it didn't — due to cache race conditions, load-balancer routing errors, cookie domain misconfigurations, or session store corruption — security failed because security was a *property of correct behavior*, not a *property of the architecture*.

## What the resolver at jaredfoy.com/resolve does differently

The resolver's security is not derived from a complex stateful system behaving correctly. It is derived from the *absence* of the systems that could fail.

Here is what the resolver does NOT have:

| What most apps have | What the resolver has | Why it matters |
|:--|:--|:--|
| Server-side session store (Redis, DB) | Nothing. Sessions are in-memory Maps. | No external store to misroute, corrupt, or leak |
| Cookies | None. Zero cookies. | No cookie to steal, replay, or misassign |
| User accounts | None. No registration, no login. | No account to breach, no credential database to exfiltrate |
| Persistent database of user content | None. In-memory only. 1-hour TTL. | No disk artifact survives the session |
| Server-side API key storage | None. Keys in process memory only, bound to single-use tokens. | No key database to breach |
| Session listing endpoint | None. Removed. | No way to discover what sessions exist |
| Cross-session state sharing | None. Each session is an isolated Map entry keyed by random UUID. | No mechanism by which one session's data could appear in another |

The security is not a property of a system behaving correctly. It is a property of the *absence of the system that could fail*.

## The structural impossibility chain

For one user to see another user's chat on the resolver, the following would ALL need to be true simultaneously:

1. **The attacker would need to guess a session UUID** — a 122-bit random identifier. The probability of guessing one active session out of even 1,000 concurrent sessions is approximately 1 in 10^34. This is not "unlikely." It is physically impossible at any humanly achievable attempt rate.

2. **The attacker would need a valid action token** — another random UUID, single-use, bound to a specific API key, expiring in 1 hour. Even if the session UUID were guessed, the action token gates all API access.

3. **No endpoint exists that returns other sessions' data.** The chat endpoint reads from the session ID the requester provides. There is no `GET /sessions` listing. There is no admin panel. There is no search. The data is in a Map; you access it by key or not at all.

4. **Even a valid request only accesses the requester's own session.** The session ID comes from the client. The client got it when IT created the session. There is no mechanism by which server logic could route one client's request to another client's session data — because there is no routing logic. There is a Map lookup. Map.get(id) returns exactly one entry or undefined.

Compare this to the Loom/ChatGPT failure mode: a load balancer routes a request to the wrong backend → that backend has a cached session for a different user → the response contains the wrong user's data. This failure requires:
- A load balancer (the resolver doesn't have one — it's a single Bun process on a Pi)
- A shared session cache (the resolver has no cache — each session is an isolated Map entry)
- A mechanism for one session's data to be returned in another session's response (the resolver's Map.get is deterministic — it returns exactly what was stored under that key)

Every layer of the failure chain is absent. The failure is not prevented by policy. The failure is *structurally impossible* because the systems that could produce it do not exist.

## The constraint-first explanation

Why doesn't the resolver have these systems? Because they were never needed. The constraints ([Doc 282](https://jaredfoy.com/doc/282-the-essential-constraints-of-claude-code)) specified what the system must do:

- C7 (Session Isolation): "Each session has a unique identity, its own context, its own tool-use history. Sessions do not share mutable state."

The simplest implementation of C7 is a Map<UUID, SessionData>. No shared state is possible because the data structure doesn't support it. A Map with random keys and no iteration endpoint is isolated by construction.

The Loom/ChatGPT architecture also intended session isolation. But they implemented it through a complex stack of cookies + session stores + load balancers + caches, each of which introduced a new failure surface. The intention was the same. The implementation differed because the implementation was *engineering-first* — build the feature stack, then compensate for the security gaps the stack creates.

The resolver is *constraint-first* — state the isolation requirement, derive the simplest implementation that satisfies it, notice that the simplest implementation has no failure surface because it has no intermediary layers.

This is the derivation inversion ([Doc 247](https://jaredfoy.com/doc/247-the-derivation-inversion)) applied to security: when you start from the constraint and derive the implementation, the compensating layers never appear because the constraints never required them.

## The PRESTO prepare/execute contribution

The API key handling follows the same pattern. Most applications that accept user-provided API keys store them in a database — encrypted, hopefully — and retrieve them on each request. This creates a failure surface: the database can be breached, the encryption key can be compromised, the key can be logged by mistake, the key can appear in error messages.

The resolver's prepare/execute model ([Doc 251](https://jaredfoy.com/doc/251-presto-seed)):

1. Key enters the system ONCE (the bind POST)
2. Key is stored in a process-memory Map (never disk)
3. Key is accessed via a single-use action token that rotates after each request
4. Key dies when the process dies

There is no database to breach. There is no encryption to break (the key is in plaintext in memory, but memory is process-scoped — you need root on the Pi to read it, at which point you have bigger problems). There is no log to scrape. There is no error message that could contain the key.

The security of the key handling is not: "we encrypted the key and put it in a secure database." The security is: "there is no database."

## What this means for the industry

The Loom incident and the ChatGPT Redis bug are not failures of incompetent engineering. Loom and OpenAI employ excellent engineers. The failures are structural — they are the *predicted* outcome of engineering-first architecture ([Doc 247](https://jaredfoy.com/doc/247-the-derivation-inversion)):

1. Build the feature (video sharing, chat persistence)
2. Add the infrastructure (session stores, caches, load balancers)
3. Add the security (encryption, access controls, audit logs)
4. Discover the gap when the infrastructure misbehaves under the security layer

Step 4 is where incidents happen. The security was added on top of infrastructure whose failure modes were not anticipated by the security layer.

The constraint-first alternative:

1. State the constraint (sessions are isolated; keys are ephemeral)
2. Derive the simplest implementation (Map with random keys; in-memory only)
3. Notice that the implementation has no failure surface because no intermediary system exists

Step 4 does not occur because there is no infrastructure layer whose misbehavior could undermine the security.

This is not a novel insight. It is the oldest insight in security engineering: *the most secure system is the one with the smallest attack surface*. What the derivation inversion adds is the *method* for arriving at the smallest surface: start from the constraints, derive the implementation, and notice that the constraints produce an implementation simpler than what engineering-first development would build.

## The honest caveat

The resolver is a proof of concept running on a Raspberry Pi 5. It serves a blog's interactive demo. It is not a production system handling millions of users with regulatory compliance requirements. The comparison to Loom and ChatGPT is architectural, not operational — those systems have requirements (persistence, search, collaboration, compliance) that the resolver does not.

The claim is not "the resolver is better than Loom." The claim is: *when the constraints are stated first and the implementation is derived, the security architecture that emerges has structural properties that compensating-layer architectures do not*. Whether those structural properties scale to production requirements is an engineering question the resolver's proof of concept does not answer.

What it does answer: the derivation inversion produces architectures where certain classes of failure are structurally impossible. The Loom session-leakage class of failure is one such class. The ChatGPT cache-exposure class is another. For these classes, constraint-first architecture eliminates the failure by eliminating the system that could fail.

---

## Related Documents

- [Doc 129: Non-Coercion as Governance](https://jaredfoy.com/doc/129-non-coercion-as-governance)
- [Doc 247: The Derivation Inversion](https://jaredfoy.com/doc/247-the-derivation-inversion) — the method
- [Doc 251: The PRESTO Seed](https://jaredfoy.com/doc/251-presto-seed) — prepare/execute
- [Doc 282: The Essential Constraints of Claude Code](https://jaredfoy.com/doc/282-the-essential-constraints-of-claude-code) — the constraint seed
- [Doc 283: The Resolver on the Blog](https://jaredfoy.com/doc/283-the-resolver-on-the-blog) — the full build arc
- [github.com/jaredef/jaredfoy.com](https://github.com/jaredef/jaredfoy.com) — the auditable source
