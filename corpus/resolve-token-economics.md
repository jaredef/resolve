# RESOLVE Token Economics and Optimal Seed Design

**April 2026**

---

## 1. Token Economics Under RESOLVE

Every token the resolver emits that does not trace to a constraint is waste. RESOLVE's five constraints eliminate the five categories of waste:

| Waste Category | Tokens Spent On | RESOLVE Constraint That Eliminates It |
|---|---|---|
| Exploratory generation | Wandering toward a solution rather than deriving one | R1: Constraint-first reasoning |
| Accidental engineering | Contingent implementation choices not prescribed by the seed | R2: Essential-contingent separation |
| Namespace confusion | Interleaving reasoning into code and code into reasoning | R3: Bilateral output |
| Verification round trips | Follow-up passes where the human asks "does it work?" | R4: Verification-embedded resolution |
| Backtracking | Reversing unconscious architectural decisions | R5: Property-aware descent |

The savings compound. Under RESOLVE, the resolver:

- Identifies constraints before generating (no wandering)
- Generates only what is essential (no accidental engineering)
- Separates reasoning from artifact (no interleaving)
- Emits verification with the artifact (no round trips)
- Tracks tradeoffs explicitly (no reversal)

The token count under RESOLVE converges on the minimum required to express the constraints as a conformant artifact plus its verification suite. This is the optimum. There is no configuration that uses fewer tokens and still satisfies the constraints.

## 2. The Aperture-Token Relationship

The seed's constraints are the aperture. The resolver's capability is the light. The relationship is inverse:

- **Wide aperture (unconstrained prompt):** The resolver scatters across the possibility space. Tokens are spent on coverage — exploring what the human might want, hedging between interpretations, generating alternatives. The output is diffuse.
- **Narrow aperture (well-constrained seed):** The resolver emits only what the constraints prescribe. Tokens are spent on precision — deriving the minimum conformant artifact. The output is focused.

Token cost is inversely proportional to constraint precision. The more precisely the seed states what must hold, the fewer tokens are needed to resolve it.

This is the economic argument against prompt engineering. Prompt engineering attempts to narrow the aperture by manipulating surface phrasing — "think step by step," "you are an expert in X," "do not include Y." These are compensating techniques. They narrow the aperture indirectly. A RESOLVE-conformant seed narrows the aperture directly by stating the constraints the output must satisfy.

## 3. The Optimal CLAUDE.md

A CLAUDE.md file is a seed. It is the source representation from which the resolver derives its behavior for a given project. Most CLAUDE.md files are written as engineering checklists — accumulated rules, style preferences, tool instructions, and behavioral directives. They grow over time. They compensate for the resolver's ungoverned construction level.

A RESOLVE-conformant CLAUDE.md states constraints that induce the desired properties. It is minimal. Every line traces to a property the project requires.

### The Structure

```markdown
# Project Seed

## Constraints
State only what must hold. Each constraint induces a property.
Do not state preferences. Do not state conventions. State invariants.

## Induced Properties
Name the properties the constraints induce. These are what the
resolver's output must exhibit. They are the acceptance criteria.

## Verification
State how to verify each property. The resolver includes
verification in its output.

## Context
State what the resolver needs to know that it cannot derive
from the codebase. Domain knowledge, architectural decisions
already made, external system interfaces.

## Non-Goals
State what the resolver must not do. Each non-goal eliminates
a category of waste tokens.
```

### An Example: The Optimal CLAUDE.md for This Project

```markdown
# RESOLVE

## Constraints
1. The bilateral boundary is the foundational architectural invariant.
   All code must preserve namespace separation between server (htx:)
   and client (HTML) interpreters.
2. The 22-stage pipeline is the construction-level constraint.
   Template resolution follows the defined stage order.
3. Mutations use the two-phase prepare/execute pattern.
   Action tokens are HMAC-signed, scoped, and short-lived.
4. Modules satisfy the HtxModule interface.
   Composition is the extension mechanism.
5. The prose seed is the canonical specification.
   Implementations are derived from it, not the reverse.
6. Author: Jared Foy. Never add Co-Authored-By lines to commits.

## Induced Properties
- Templates resolve to clean HTML with zero framework artifacts.
- Any conformant engine produces the same output for the same input.
- Auth is stateless — tokens in headers, not cookies.
- The editor, AI generator, and CLI all operate on the same
  16-directive-family surface.

## Verification
- 238 tests in presto-ts (bun test)
- 36 tests in agent-space (bun test tests/verification.test.ts)
- 15 tests for DO runtime (bun test ./.spec/do-verify.ts)

## Context
- presto-ts is the canary engine at /home/jaredef/presto-ts
- agent-space is at /home/jaredef/agent-space (port 4050)
- RESOLVE dev server (port 3000)
- Telegram plugin may be active for communication

## Non-Goals
- Do not add features beyond what is asked.
- Do not refactor code that is not being changed.
- Do not add comments, docstrings, or type annotations
  to code you did not write.
- Do not create documentation files unless requested.
```

### Why This Is Optimal

Six constraints. Four induced properties. Three verification commands. Five context facts. Four non-goals. Every line eliminates tokens. The constraints tell the resolver what must hold — no wandering. The induced properties tell it what to verify — no round trips. The non-goals tell it what to skip — no accidental engineering.

A resolver operating under this CLAUDE.md does not need skills, prompt engineering tricks, or retry loops. The seed is precise enough that the aperture focuses the resolver's full capability into conformant output on the first pass.

## 4. The Industry Implication

The AI industry charges by the token. Every prompt engineering trick, every retry loop, every agent harness step, every RAG retrieval, every chain-of-thought scaffold — these all spend tokens compensating for an ungoverned construction level.

RESOLVE governs the construction level. The token spend under RESOLVE is the minimum required to satisfy the constraints. Everything the industry currently spends above that minimum is the cost of not having named the constraints.

The savings are not marginal. The 379-line DO runtime was resolved in a single pass. The 921-line PRESTO engine was resolved in a single pass. The 461-line bootstrap was resolved in a single pass. Each replaced artifacts that conventional engineering produced at 5-100x the size. The token ratio mirrors the line ratio. The constraints are the lens. The lens is the savings.
