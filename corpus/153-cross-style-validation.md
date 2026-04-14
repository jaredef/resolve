<!-- chronological_ordinal: 17 -->
# Cross-Style Validation: Deriving a Conformant React-like Runtime from a Prose Seed

**Jared Foy**
**April 2026**

---

## Abstract

The PRESTO dissertation claims that architectural constraints, when stated with sufficient precision in natural language, are sufficient for any resolver to derive a conformant implementation. The evidence presented there — six independent engines from one prose seed — is vulnerable to the objection that the author designed both the constraints and the seed. This article eliminates that objection by applying the same method to an architecture the author did not design: React's Distributed Objects model. The constraints were discovered by studying React's source, documentation, and behavioral invariants. A 2,177-word prose seed was written. A resolver consumed the seed and produced a 379-line TypeScript runtime that passes 15 verification tests corresponding to React's own architectural contracts. The method works on foreign ground. The derivation thesis is general.

---

## 1. The Objection

A skeptic examining the PRESTO work can reasonably argue:

- The author designed PRESTO's constraints to be derivable from prose.
- The six-language conformance is impressive but potentially circular — the same mind that specified the constraints also designed the verification suite.
- The method may work only on architectures purpose-built for prose derivation.

To answer this, the method must be applied to an architecture that satisfies three conditions:

1. **The author did not design it.** The constraints must be discovered, not invented.
2. **The conformance criteria are externally defined.** The verification tests must correspond to behavioral invariants established by the architecture's creators, not by the author.
3. **The architecture is well-known and independently scrutinized.** The result must be evaluable by anyone familiar with the target system.

React satisfies all three conditions.

---

## 2. The Method

The method is identical to the one that produced the PRESTO seed:

**Step 1: Identify the constraints.** Study the existing implementation — not the API surface, but the architectural invariants. What must hold for the system to work? What breaks when a constraint is violated? The source of constraints is the architecture itself, not the documentation.

**Step 2: Separate essential from contingent.** Some constraints are architecturally essential (the system breaks without them). Others are important but not mandatory (the system degrades without them). Others are truly contingent (implementation details with no architectural weight). The seed includes only the essential constraints and the abstract form of the necessary contingencies.

**Step 3: State the constraints in prose.** Write a self-contained specification — a seed — that contains: identity (what the resolver knows), architectural rationale (why each constraint exists), contracts (numbered, testable commitments), algorithms (pseudocode for the core operations), a verification suite (numbered tests with pass conditions), and interface signatures.

**Step 4: Feed the seed to a resolver.** The resolver receives the prose and nothing else. No source code. No API reference. No example application. Only the seed.

**Step 5: Verify the output.** Run the verification suite. Every test that passes confirms a constraint is satisfied. Every constraint satisfied confirms a property is induced.

---

## 3. The Constraints Discovered

Sixteen constraints were identified in React's architecture across six levels. Of these, ten were classified as essential, three as necessary contingencies (the need is essential but the mechanism is contingent), and three as contingent implementation details.

The ten essential constraints that entered the seed:

| Contract | Constraint | What Breaks Without It |
|----------|-----------|----------------------|
| C1 | Component as unit of encapsulation | No composability |
| C2 | Unidirectional data flow | Render output depends on execution order |
| C3 | Declarative rendering | Developer must manage DOM transitions manually |
| C4 | State as sole trigger for re-render | Non-deterministic render cycle |
| C5 | Virtual representation reconciliation | Full DOM reconstruction on every state change |
| C6 | Two-phase commit (render then commit atomically) | Visual tearing — partial DOM updates visible |
| C7 | Render purity / idempotency | Concurrent scheduling, memoization, and batching break |
| C8 | Separated side effects (after commit, with cleanup) | Effects fire during render, corrupt state under concurrency |
| C9 | Ordered state storage (positional hook association) | State slots misalign across re-renders |
| C10 | Consistency under concurrency (no tearing) | Components in same render pass see different data |

Three necessary contingencies were stated abstractly:

- The reconciler needs a subtree replacement rule (React uses type comparison; another mechanism could work)
- List reconciliation needs an identity mechanism (React uses developer-supplied keys; alternatives exist)
- Concurrent rendering needs a consistency guarantee (React falls back to synchronous re-execution; other isolation mechanisms are possible)

Two constraints were omitted as truly contingent: the dual-fiber bookkeeping structure and hook location restrictions (consequences of the linked-list storage implementation, not of the architecture).

---

## 4. The Seven Induced Properties

The ten constraints induce seven properties. These are not features to implement — they are consequences that emerge when the constraints hold.

| Property | Induced By | Meaning |
|----------|-----------|---------|
| Declarative Composability | C1 + C2 + C3 | Components nest arbitrarily, each self-contained |
| Predictable Rendering | C2 + C4 + C7 + C9 | Same inputs always produce same output |
| Efficient Incremental Updates | C5 + C6 | State changes produce minimal host mutations |
| Managed Side Effect Lifecycle | C7 + C8 + C9 | Effects are predictable, cleanable, dependency-tracked |
| Host Environment Portability | C1 + C3 + C5 | Same reconciler targets any tree-structured host |
| Responsive Concurrency | C6 + C10 | UI remains interactive under load |
| Deterministic State Association | C4 + C7 + C9 | Every state slot maps stably to one component instance |

The causal chain is directional: constraints induce properties; properties enable features; features implement behaviors. The developer experiences behaviors (a list reorders smoothly). The behaviors exist because the properties hold. The properties hold because the constraints are satisfied.

---

## 5. The Seed

The DO Seed is 2,177 words — structurally parallel to the PRESTO Seed (2,020 words). It contains:

- **Identity:** What the resolver knows and how to reason under ambiguity.
- **Architectural Rationale:** Seven "why" paragraphs explaining the necessity of each major constraint.
- **10 Contracts:** Numbered, testable, with MUST/MUST NOT language.
- **Core Algorithms:** Reconciliation (with keyed children and subtree replacement), useState, useEffect, and the render cycle work loop — all in pseudocode.
- **15 Verification Tests:** Each corresponding to a specific contract.
- **Interface Signatures:** Component, VirtualNode, Fiber, Reconciler, Renderer, Hooks.
- **4 Recommended Constraints:** For mature implementations (reconciler/renderer separation, interruptible rendering, priority scheduling, error boundaries).

The seed is self-contained. No external references. No React source code. No API documentation. The prose is the only input.

---

## 6. The Resolution

A resolver (Claude, operating as an LLM) consumed the DO Seed and produced a TypeScript runtime targeting the DOM. The runtime is 379 lines. It implements:

- Virtual node creation (`h` function)
- Fiber-based component tree with parent/child/sibling links
- `useState` with positional hook storage and queued updates
- `useEffect` with dependency comparison, cleanup lifecycle, and post-commit execution
- `useRef` and `useMemo`
- DOM creation, property diffing, event listener management
- Keyed and positional child reconciliation
- Subtree replacement on type change
- Two-phase commit (render phase interruptible, commit phase atomic)
- Effect flushing after commit
- Deletion with effect cleanup
- `requestIdleCallback`-based work loop

The runtime has no dependency on React. It imports nothing. It is derived entirely from the prose seed.

---

## 7. The Verification

All 15 tests pass:

| # | Test | Contract | Result |
|---|------|----------|--------|
| 1 | Component mounts and renders to DOM | C1 | Pass |
| 2 | Props flow parent to child | C2 | Pass |
| 3 | State change triggers re-render | C4 | Pass |
| 4 | Same inputs produce same output | C7 | Pass |
| 5 | Reconciler patches existing nodes on update | C5 | Pass |
| 6 | Subtree replaced on type change | C5 | Pass |
| 7 | Keyed list reorder preserves state | C5 | Pass |
| 8 | Keyed reorder reuses DOM nodes | C5 | Pass |
| 9 | Effect runs after commit, not during render | C8 | Pass |
| 10 | Effect cleanup on dependency change | C8 | Pass |
| 11 | Effect cleanup on unmount | C8 | Pass |
| 12 | Conditional hook call is non-conformant | C9 | Pass |
| 13 | Impure render does not corrupt state | C7 | Pass |
| 14 | Commit phase is atomic | C6 | Pass |
| 15 | Render consistency — no tearing | C10 | Pass |

The verification suite tests the induced properties, not the implementation details. The tests are derived from React's own behavioral invariants as documented in the React source, the Rules of React, and the Fiber architecture specification.

---

## 8. The Live Demonstration

The derived runtime serves a browser application: a counter with increment/decrement and a todo list with add, toggle, and delete. The application exercises:

- Component composition (App contains Counter and TodoApp, which contains TodoItem instances)
- State management (counter value, todo list, input field)
- Keyed list reconciliation (todos identified by key, reorderable without state loss)
- Event handling (click, input, keydown)
- Conditional rendering (checkbox state, strikethrough styling)
- Derived state (remaining count computed from todo list)

The application runs in the browser at port 4060. It is a standard single-page application with interactive state — the kind of application React was designed to build. It was built without React, from a prose seed, by a resolver that never saw React's source code.

---

## 9. What This Proves

**The derivation method is general.** It works on architectures the author did not design. The PRESTO result could have been circular. The DO result cannot be — the constraints were discovered, not invented.

**Constraints are more fundamental than implementations.** React's 150,000+ lines of source implement the same ten constraints that the seed states in 2,177 words. The seed is sufficient to produce a conformant runtime. The 150,000 lines carry the constraints plus engineering: performance optimization, edge case handling, developer tooling, backward compatibility, and platform-specific code. The constraints are the invariant. The engineering is the contingent.

**The seed is the most portable artifact.** The React source runs in JavaScript. The derived runtime runs in TypeScript. But the seed runs in any language — because it is prose. A resolver targeting Rust, Go, C, or any language with DOM access (or any tree-structured host) could produce a conformant runtime from the same seed. The prose is the universal encoding. The code is the local manifestation.

**Framework lock-in is architecturally unnecessary.** If the constraints of React can be stated in 2,177 words and resolved into 379 lines, then the developer's commitment is to the constraints, not to the 150,000-line package. A different realization — smaller, larger, in a different language, targeting a different host — satisfies the same constraints and induces the same properties. The framework is one shadow. The constraints are the form.

---

## 10. Limitations

The derived runtime is minimal. It does not implement:

- Server-side rendering
- Concurrent mode with priority scheduling (the work loop yields but does not prioritize)
- Error boundaries
- Context API
- Suspense
- Portal rendering
- Synthetic event system
- Development mode warnings

These are production concerns. Some (SSR, concurrent scheduling) could be derived from an extended seed. Others (DevTools integration, synthetic events) are platform-specific engineering choices. The verification suite tests the architectural contracts, not the production feature set. The claim is constraint conformance, not feature parity.

Additionally, the verification suite is the author's — not React's own test suite. The tests are derived from React's documented behavioral invariants, but running the derived runtime against React's actual test suite would provide stronger evidence. This is identified as future work.

---

## 11. Conclusion

A 2,177-word prose specification of React's architectural constraints was consumed by a resolver. The resolver produced a 379-line runtime. The runtime passes 15 verification tests. The runtime serves a live interactive application in a browser. No React source code was consulted during resolution.

The method that produced six PRESTO engines from a prose seed also produces a conformant DO runtime from a prose seed. The first result could be dismissed as circular. The second cannot. The constraints were discovered by studying an architecture the author did not design. The conformance criteria are React's own behavioral invariants. The prose was the only input.

The derivation thesis holds: constraints stated in prose are sufficient for resolvers to derive conformant implementations. This is true for bilateral resolution architectures (PRESTO). It is true for distributed objects architectures (React). It is true, in principle, for any architecture whose constraints can be identified and stated with precision.

The form precedes the implementation. The prose is the seed. The machines are what grows.

---

## Artifacts

| Artifact | Location | Size |
|----------|----------|------|
| DO Constraint Analysis | `corpus/do-constraint-analysis.md` | 16 constraints, 6 levels |
| DO Induced Properties | `corpus/do-induced-properties.md` | 7 properties, constraint-property matrix |
| DO Seed | `.spec/do-seed.md` | 2,177 words |
| DO Runtime | `.spec/do-runtime.ts` | 379 lines TypeScript |
| DO Verification Suite | `.spec/do-verify.ts` | 15 tests, all passing |
| DO Live Demo | `.spec/do-demo-client.ts` | Counter + Todo app |
