<!-- chronological_ordinal: 14 -->
# Distributed Objects Constraint Analysis: From Fielding Through React

**Research document for the DO Seed project**
**April 2026**

---

## Part 1: Fielding's DO Style (Chapter 3)

Fielding defines DO as a system organized "as a set of components interacting as peers." An object encapsulates "private state information or data, a set of associated operations or procedures that manipulate the data, and possibly a thread of control, so that collectively they can be considered a single unit."

### Fielding's DO Constraints

1. **State encapsulation** -- all state is hidden inside objects, accessible only through defined operations
2. **Identity coupling** -- objects must know the identities of other objects to interact
3. **Custom per-object interfaces** -- each object defines its own operations (no uniform interface)
4. **Peer interaction model** -- objects interact as peers rather than through hierarchical client-server separation

### Properties DO Induces (Fielding's Evaluation)

| Property | Rating | Explanation |
|----------|--------|-------------|
| Efficiency | + | Local computation within an object can be efficient |
| Evolvability | + | Internal changes don't break external interface |
| Extensibility | + | New operations can be added |
| Configurability | + | Objects can be reconfigured at runtime |
| Reusability | + | Objects can be reused across systems |

### Properties DO Fails to Induce

| Property | Rating | Explanation |
|----------|--------|-------------|
| Network Performance | - | Fine-grained invocations degrade throughput |
| User-Perceived Performance | - | Chatty interactions |
| Scalability | - | Fine-grained coupling impedes scaling |
| Simplicity | - | Custom interfaces per object |
| Visibility | - | Hidden state prevents system-wide observation |
| Portability | - | Tied to specific runtime |
| Reliability | - | Action chains create cascading failures |

Fielding's verdict: "they fare poorly when compared to most other network-based architectural styles."

---

## Part 2: React as DO Realization

React exhibits every DO characteristic Fielding identified:

- **Encapsulation**: useState/useReducer. State hidden; access only through render output and callbacks.
- **Identity coupling**: Components reference each other by import paths. Renaming breaks all importers.
- **Custom per-object interfaces**: Each component has unique props. No uniform interface.
- **Action chains**: State change -> re-render -> child effects -> further state changes -> further re-renders.
- **Distributed state**: State distributed across component tree. DevTools exist because visibility is poor by default.

React inherits DO's negative properties and compensates:
- Poor visibility -> React DevTools
- Poor network performance -> SSR/SSG/ISR
- Poor reliability -> Error Boundaries
- Poor scalability -> Code splitting, lazy loading

---

## Part 3: React's Architectural Constraints (16 Identified)

### Level 1: DO Constraints (inherited)

**C1. Component as unit of encapsulation.**
Every UI element is a component. Components encapsulate state, rendering logic, and lifecycle.
*Induced property:* Composability.

### Level 2: React's Narrowing of DO

**C2. Unidirectional data flow.**
Data flows downward via props. Events flow upward via callbacks. No bidirectional binding.
*Induced property:* Predictability -- same props, same output.

**C3. Declarative rendering (state-to-UI mapping).**
Components declare what the UI should look like for a given state, not how to transition.
*Induced property:* Developer reasons about states, not transitions.

**C4. State as sole trigger for re-render.**
State changes are the sole mechanism triggering re-rendering of a component and its subtree.
*Induced property:* Deterministic render cycle given state.

### Level 3: Reconciliation Constraints

**C5. Virtual DOM reconciliation.**
Runtime maintains a virtual DOM. On state change, computes new virtual tree, diffs against previous, applies minimal mutations.
*Induced property:* Performance through batched, minimal mutations.

Two heuristic sub-constraints:
- **C5a. Type stability:** Different component types generate different trees. React replaces entire subtree on type change.
- **C5b. Key uniqueness:** Within sibling lists, keys must be stable, predictable, and unique.

Violating C5a/C5b produces: wrong element reuse, broken state, unnecessary remounts.

**C6. Separation of reconciliation from rendering.**
Reconciliation (computing diffs) is architecturally separated from rendering (applying to host environment).
*Induced property:* Same reconciler targets multiple hosts (DOM, Native, three.js, etc.).

**C7. Singular reconciliation context.**
The architecture assumes one virtual tree within one JavaScript runtime.
*Consequence:* Breaks in micro-frontend and distributed UI scenarios.

### Level 4: Fiber/Scheduling Constraints

**C8. Interruptible rendering.**
Rendering is broken into discrete fibers. Work is pausable, resumable, and abandonable without corrupting state.
*Induced property:* Responsiveness under load.

**C9. Two-phase commit.**
- Render/reconciliation phase: pure computation, interruptible, no side effects, may execute multiple times.
- Commit phase: imperative mutation, NOT interruptible, runs to completion atomically.

Violating this produces visual tearing.

**C10. Priority-based cooperative scheduling.**
Higher-priority updates (user input) preempt lower-priority (data fetching). React maintains control over when component functions execute (pull-based).
*Induced property:* UI remains interactive during expensive work.

**C11. Dual-fiber invariant.**
At most two fibers per component: current (flushed) and work-in-progress. Bidirectional alternate references. Only completed WIP trees may be committed.
*Consequence of violation:* Memory leaks or state inconsistency.

**C12. State consistency under concurrency (no tearing).**
All components in a render pass must see the same consistent snapshot of external data. If store mutates during yield, React falls back to synchronous re-execution.
*Induced property:* Consistent UI -- no component sees stale data while another sees fresh.

### Level 5: Hook Constraints

**C13. Hook state stored as positional linked list.**
Hooks are stored in a singly linked list traversed by call position. No name-based lookup.

Sub-constraints:
- **C13a. Hooks must be called in the same order on every render.** Conditional calls corrupt positional mapping.
- **C13b. Hooks may only be called from React functions** (components or other hooks).
- **C13c. Hooks must be called at top level, before any early returns.**

*Design rationale:* Ordered list avoids mapping overhead, increases reconciliation efficiency. The constraint is the price.

### Level 6: Purity Constraints

**C14. Component render functions must be idempotent.**
Same inputs -> same output, always. This is mandatory, not a style preference.
*Induced property:* Concurrent rendering, batched updates, and interruptible scheduling are safe.

**C15. Props and state are immutable snapshots.**
Cannot be mutated directly. Props frozen at render time. State updated only through setter functions.
*Induced property:* Memoization and dependency tracking work correctly.

**C16. Side effects excluded from render phase.**
No DOM mutation, no network I/O, no non-deterministic functions during render. Side effects declared via hooks (useEffect) that run after commit.
*Induced property:* Render phase is safe to pause, resume, or discard.

---

## Part 4: Essential vs. Contingent

The critical question for the seed: which constraints are essential to the DO-as-realized-in-React architecture, and which are contingent implementation choices?

### Likely Essential (the architecture breaks without them)

| Constraint | Why Essential |
|-----------|--------------|
| C1 Component encapsulation | Defines the unit of composition |
| C2 Unidirectional data flow | Predictability depends on it |
| C3 Declarative rendering | The developer mental model depends on it |
| C4 State as re-render trigger | The reconciliation model depends on it |
| C5 Virtual DOM reconciliation | Performance model depends on it |
| C9 Two-phase commit | Correctness of DOM updates depends on it |
| C13a Hook call ordering | State association depends on it |
| C14 Render purity | Concurrent safety depends on it |
| C15 Immutable props/state | Memoization depends on it |
| C16 No side effects in render | Interruptibility depends on it |

### Necessary Contingencies (the need is essential, the mechanism is contingent)

The seed must state these as abstract requirements, not as specific mechanisms.

| Constraint | The Essential Need | React's Contingent Mechanism |
|-----------|-------------------|------------------------------|
| C5a Type stability heuristic | The reconciler needs a rule for when to diff vs. replace a subtree | React replaces on type change. Another reconciler could use structural comparison. |
| C5b Key uniqueness | List reconciliation needs an identity mechanism for elements | React uses developer-supplied string keys. Another reconciler could use positional hashing, content fingerprinting, or structural identity. |
| C12 No-tearing invariant | Concurrent rendering needs a consistency guarantee for shared data | React falls back to synchronous re-execution via useSyncExternalStore. Another runtime could use snapshot isolation, MVCC, or transactional reads. |

### Important Contingencies (the architecture works without them but significantly degrades)

The seed should include these as recommended constraints — properties that a mature realization should exhibit but that a minimal conformant runtime may omit.

| Constraint | What Degrades Without It | Why Not Essential |
|-----------|-------------------------|-------------------|
| C6 Reconciler/renderer separation | Cannot target multiple host environments (DOM, Native, canvas) | A single-target runtime works without separation |
| C7 Singular reconciliation context | Cannot compose multiple independent React trees on one page | Single-tree applications work. The limitation surfaces in micro-frontends. |
| C8 Interruptible rendering | UI blocks during expensive renders. Responsiveness degrades under load. | React pre-Fiber (v15 and earlier) was fully synchronous and functionally correct. Interruptibility is an optimization, not a correctness requirement. |
| C10 Priority scheduling | All updates treated equally. User input competes with background work. | Synchronous rendering treats all work at the same priority and still produces correct output. |

### Truly Contingent (implementation details with no architectural weight)

The seed should omit these entirely. They are artifacts of React's specific implementation, not constraints of the DO style or even of React's architectural model.

| Constraint | Why It's Implementation, Not Architecture |
|-----------|------------------------------------------|
| C11 Dual-fiber invariant | How Fiber specifically bookkeeps work-in-progress. Another concurrent reconciler could use immutable snapshots, copy-on-write trees, or transactional state. The "two fibers with alternate references" is a data structure choice. |
| C13b/c Hook location restrictions | Consequences of storing hooks as a positional linked list. A name-based or map-based hook store would not require these restrictions. The ordering constraint (C13a) is essential; the location restrictions are artifacts of the storage mechanism. |

---

## Part 5: Properties REST Induces That React Abandons

| REST Property | How React Abandons It | Compensating Technology |
|--------------|----------------------|----------------------|
| Complete representations | Empty HTML shell + JS bundle | SSR |
| Statelessness | Component-local state | State management libraries |
| Uniform interface | Custom props per component | TypeScript/PropTypes |
| Server-mediated navigation | Client-side routing | React Router |
| Visibility | State hidden in component tree | DevTools |
| Cacheability | Client renders dynamically | ISR/SSG |

---

## Sources

- Fielding, R.T. (2000). Chapter 3, Section 3.6: Distributed Objects.
- Fielding, R.T. (2000). Chapter 5, Sections 5.2.1, 5.4.
- Clark, A. (2016). React Fiber Architecture. github.com/acdlite/react-fiber-architecture
- Markbage, S. (2019). The Rules of React. gist.github.com/sebmarkbage
- React Documentation: Components and Hooks Must Be Pure. react.dev/reference/rules
- React Design Principles. legacy.reactjs.org/docs/design-principles.html
- Journal of Information Systems Engineering and Management (2025). React's Architectural Limitations in Distributed UI Systems.
