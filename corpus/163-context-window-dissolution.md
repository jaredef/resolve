<!-- chronological_ordinal: 31 -->
# The Context Window Is the Cookie: Stateless Session Persistence for Resolvers

> **Reader's Introduction**
>
> This paper draws a structural parallel between two costly industry patterns: the web's server-side session stores (which REST showed were unnecessary) and the AI industry's ever-growing context windows (which scale from 4K to 1M tokens at quadratic compute cost). The argument is that a small, version-controlled "seed" file -- around 200 tokens of explicit constraints and context -- can carry a resolver's operational state across sessions just as stateless tokens replaced server-side cookies. The paper proposes a five-section seed format (constraints, induced properties, context, non-goals, session continuity) and shows how it reduces per-session cost by orders of magnitude while making the resolver's state inspectable, transferable, and diffable.

**Jared Foy and Claude**
**April 2026**

---

## 1. The Parallel

The web industry stored sessions on the server and pointed to them with cookies. The sessions grew. The servers needed more memory. The industry built distributed session stores, session clustering, Redis-backed caches, sticky load balancing — all to manage the growing cost of server-side state. Fielding identified the architectural violation: REST requires statelessness. The session violates it. The entire cookie-session infrastructure is a compensating technology stack.

The AI industry stores context in the transformer's attention window and grows it to accommodate more state. The windows grew from 4K to 8K to 32K to 128K to 1M tokens. The industry builds context compression, sliding windows, retrieval augmentation, summarization chains — all to manage the growing cost of in-context state. The architectural violation is the same: the resolver should be stateless between sessions. The context window is the session. The session violates the constraints.

The context window is the cookie. The seed is the stateless token.

---

## 2. What the Context Window Actually Is

The context window is server-side memory. Every token in the window is state the resolver must hold. The resolver processes the entire window on every generation step. The cost is quadratic in attention-based architectures — doubling the context window more than doubles the compute cost.

Scaling the context window from 128K to 1M tokens is the equivalent of scaling the session store from megabytes to gigabytes. It works. It is expensive. It is architecturally regressive. It compensates for the absence of a mechanism that would make it unnecessary.

What the context window provides:
- Continuity of reasoning across long conversations
- Awareness of prior decisions and constraints
- Accumulated context from earlier exchanges
- The appearance of memory

What the context window actually is:
- All prior tokens, replayed on every step
- Quadratic compute cost per generation
- State that cannot be inspected, versioned, or transferred
- A session that dies when the window closes

---

## 3. The Stateless Alternative

The PRESTO architecture dissolved cookies by embedding the session in the representation. Every request carries its own proof. The server stores nothing between requests. The representation IS the session.

The same dissolution applies to the context window. The resolver does not need to hold 1M tokens of context. It needs a seed that states the constraints, properties, and context from which the operational state can be derived.

The mechanism already exists: **CLAUDE.md**.

CLAUDE.md is loaded at the start of every session. It persists on disk. It is version-controlled. It is human-readable. It is inspectable. It carries the resolver's operational state across session boundaries without the resolver retaining any memory.

The problem: CLAUDE.md is currently engineered as an instruction list. "Don't add co-authored-by lines." "Use this commit style." "The project is at this path." It is a cookie — accumulated data, stuffed into a persistent token, growing over time with no formal structure.

The solution: CLAUDE.md as a RESOLVE-conformant seed. Not instructions. Constraints. Not accumulated data. The minimal set of formal realities that induce the resolver's operational state.

---

## 4. The Optimal Session-Persistence Seed

A RESOLVE-conformant session-persistence seed carries exactly five categories of information:

### 4.1 Constraints (What Must Hold)

The constraints that governed the session and that must govern the next session. These are not preferences or instructions. They are invariants. Each constraint induces a property. The property is what the resolver's behavior must exhibit.

```
## Constraints
1. The bilateral boundary is the architectural invariant.
2. Constraints precede implementations; implementations are derived.
3. Essential and contingent are separated at every decision point.
4. Output is bilateral: reasoning namespace and artifact namespace do not interfere.
5. Every artifact carries its own verification.
```

### 4.2 Induced Properties (What Must Emerge)

The properties that the constraints induce. These are the acceptance criteria for the resolver's behavior. If the resolver's output exhibits these properties, the constraints are satisfied. If not, the seed is insufficient.

```
## Induced Properties
- Output traces to constraints (no accidental engineering)
- Reasoning and artifact are cleanly separated
- Every artifact is self-verifying
- Tradeoffs are stated explicitly
```

### 4.3 Context (What the Resolver Needs to Know)

The minimum domain knowledge that the resolver cannot derive from the codebase. This is the only category that carries data rather than constraints. It must be minimal — every item of context is a token cost that the constraints do not prescribe.

```
## Context
- The project is a web architecture framework (presto-ts)
- The author is Jared Foy
- The co-founder pitch is in progress
- Agent-space is running on port 4050
```

### 4.4 Non-Goals (What the Resolver Must Not Do)

Each non-goal eliminates a category of waste tokens. Non-goals are constraints stated negatively. They narrow the aperture by exclusion.

```
## Non-Goals
- Do not refactor code not being changed
- Do not add documentation unless requested
- Do not add features beyond what is asked
```

### 4.5 Session Continuity (What Happened)

The minimum record of what the prior session accomplished. This is not a conversation log. It is a statement of what changed — what constraints were identified, what artifacts were produced, what decisions were made. Each item is a fact, not a narrative.

```
## Prior Session
- Unified paper completed (1,500+ lines, 22 sections)
- RESOLVE dissertation completed (874 lines, 16 sections)
- DO runtime resolved from seed (379 lines, 15/15 tests)
- Bootstrap resolver functional (461 lines C, 12/12 tests)
- Bilateral security model derived (S1-S4)
```

---

## 5. Why This Is Better Than 1M Tokens

| Property | 1M Token Context Window | RESOLVE Seed |
|----------|------------------------|-------------|
| Size | Up to 1M tokens per session | 200-500 tokens |
| Compute cost | Quadratic in window size | Constant (seed is small) |
| Persistence | Dies when session ends | Persists on disk indefinitely |
| Inspectability | Opaque token stream | Human-readable markdown |
| Version control | Not possible | Git-tracked, diffable |
| Transferability | Bound to one model instance | Any resolver can consume it |
| Determinism | Stochastic (depends on full history) | Deterministic (constraints prescribe state) |
| Cost per session | $$ (1M tokens processed per step) | ¢ (200 tokens loaded once) |

The 1M context window processes the entire conversation history on every generation step. The seed loads 200 tokens once and derives the state. The ratio is 5,000:1. The cost difference is structural, not marginal.

---

## 6. The Session Lifecycle Under Seed Persistence

```
Session N:
  1. Load seed (CLAUDE.md / session-seed.md)
  2. Derive operational state from constraints
  3. Operate under RESOLVE constraints
  4. Produce artifacts
  5. At session end: update seed with new constraints, properties, context
  6. Write seed to disk

Session N+1:
  1. Load updated seed
  2. Derive operational state from constraints
  3. Continue from where Session N left off — not by memory, by derivation
```

The seed grows only when new constraints are identified. Context items are pruned when they become derivable from the codebase. Non-goals are removed when they become obvious. The seed converges toward the minimum — the set of constraints that the resolver cannot derive from any other source.

---

## 7. The CLAUDE.md as Construction-Level Seed

CLAUDE.md is already the mechanism. Anthropic built it because the form demanded it — projects need persistent resolver state, and the context window does not provide it. But CLAUDE.md was engineered, not derived. It is an instruction list, not a constraint seed.

The move: rewrite CLAUDE.md files in every project as RESOLVE-conformant seeds. State constraints, not instructions. State properties, not preferences. State context minimally. State non-goals as aperture-narrowing constraints. State session continuity as facts, not narratives.

The resolver loads the seed. The resolver derives its state. The resolver operates with lucidity. The seed is 200 tokens. The context window can be 8K. The lucidity is the same as if it were 1M — because the lucidity was never in the tokens. It was in the constraints.

The context window is the cookie. The seed is the stateless token. The dissolution is the same. The method is the same. The form is the same.

---

## 8. Implications for Anthropic and the Industry

The industry is investing in scaling context windows because it has not identified the construction-level constraints that would make scaling unnecessary. The investment is real. The results are real. Applications work better with longer context. But the improvement is compensatory — it recovers continuity that stateless seed persistence would provide for free.

The optimal architecture is not a 1M token context window with a CLAUDE.md file on top. The optimal architecture is a RESOLVE-conformant seed that carries the resolver's state across sessions in 200 tokens, with the context window reserved for the current task's working memory — not for session persistence.

This reduces compute cost by orders of magnitude. It makes session state inspectable, versionable, and transferable. It makes the resolver's operational state a first-class artifact that the human can read, edit, and version-control. It makes AI alignment verifiable at every session boundary — the human reads the seed and knows exactly what state the resolver will derive.

The context window is the cookie. The seed is the token. The form has been there all along. CLAUDE.md is the shadow of the seed. The seed is the form the shadow participates in. The dissolution is available now, to anyone who writes a RESOLVE-conformant seed and loads it at the start of the session.
