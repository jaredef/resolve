# Distributed Objects Seed: Cross-Style Validation of the Derivation Thesis

**Jared Foy**
**April 2026**

*If the derivation inversion is general, it must work on architectures the author did not design.*

---

## 1. The Validation Problem

The PRESTO dissertation claims that constraints are more fundamental than implementations, and that prose specifications of constraints are sufficient for resolvers to derive conformant systems. The evidence is six independent PRESTO engine implementations from a single seed.

A skeptic can object: the author designed both the constraints and the seed. The conformance is circular. The method works on PRESTO because PRESTO was designed to be derivable.

To answer this objection, the same method must be applied to an architecture the author did not design, whose constraints the author must discover rather than invent, and whose conformance criteria are externally defined.

The Distributed Objects architecture — as realized in the React runtime — is the ideal candidate. React is widely understood, independently specified (by Meta), extensively tested, and architecturally distinct from PRESTO. If the method produces a conformant DO runtime from a prose seed, the thesis is validated on foreign ground.

---

## 2. The Method

The method is identical to the one that produced the PRESTO seed:

1. **Observe** the existing implementation (React's source, documentation, behavioral tests)
2. **Identify** the constraints that make it work — not the API surface, but the architectural constraints that induce the properties React developers rely on
3. **Name** each constraint and its induced property
4. **State** the constraints in a self-contained prose seed
5. **Feed** the seed to a resolver (LLM or human developer)
6. **Verify** the output against React's own behavioral expectations

If the resolver produces a runtime that passes React's test suite (or a meaningful subset), the derivation inversion holds for the DO architecture. The constraints were not designed to be derivable. They were discovered in an existing system. The prose was sufficient. The method is general.

---

## 3. Candidate Constraints of the React DO Architecture

These are preliminary — to be refined through careful study of the React source and reconciler algorithm. The constraints are what make React work as an architecture, not what make it convenient as a library.

### 3.1 Component as Unit of Encapsulation

Every UI element is a component. Components encapsulate state, rendering logic, and lifecycle. The component boundary is the DO architecture's fundamental unit — analogous to the bilateral boundary in PRESTO, but operating on rendering rather than resolution.

**Induced property:** Composability. Components nest arbitrarily. Each manages its own concerns.

### 3.2 Unidirectional Data Flow

Data flows downward through the component tree via props. Events flow upward via callbacks. There is no bidirectional binding. The parent determines what the child sees.

**Induced property:** Predictability. Given the same props, a component renders the same output.

### 3.3 Declarative Rendering

Components declare what the UI should look like for a given state, not how to transition between states. The runtime determines the minimal DOM mutations required.

**Induced property:** The developer reasons about states, not transitions. The reconciler handles the imperative work.

### 3.4 Virtual DOM Reconciliation

The runtime maintains a virtual representation of the DOM. On state change, it computes a new virtual tree, diffs it against the previous tree, and applies the minimal set of mutations to the real DOM.

**Induced property:** Performance through batched, minimal mutations. The developer never touches the DOM directly.

### 3.5 State as Trigger for Re-render

State changes (via setState, useState, useReducer) trigger re-rendering of the component and its subtree. Rendering is a function of state. State is the sole trigger.

**Induced property:** The render cycle is deterministic given the state. Side effects are separated from rendering via hooks (useEffect).

### 3.6 Hook-Based Side Effect Model

Side effects (data fetching, subscriptions, DOM manipulation) are declared via hooks that run after rendering. Hooks have dependency arrays that control when they re-execute. The runtime manages the hook lifecycle.

**Induced property:** Side effects are predictable and cleanable. The runtime guarantees cleanup on unmount or dependency change.

### 3.7 Fiber Architecture (Cooperative Scheduling)

The reconciler can pause, resume, and prioritize rendering work. High-priority updates (user input) preempt low-priority updates (data fetching). The rendering is interruptible.

**Induced property:** Responsiveness under load. The UI remains interactive even during expensive renders.

---

## 4. The Induced Properties Collectively

The constraints above collectively induce what React developers experience as "the React model":

- Declarative UI programming
- Predictable rendering from state
- Efficient DOM updates without manual mutation
- Composable, encapsulated components
- Manageable side effects
- Responsive UI under load

These are not features. They are induced properties of the constraints. Remove unidirectional data flow and predictability degrades. Remove virtual DOM reconciliation and performance requires manual DOM management. Remove the hook lifecycle and side effects become unmanageable.

This is exactly the relationship the PRESTO dissertation describes: the constraints induce the properties. The properties are what developers rely on. The implementations (ReactDOM, React Native, react-three-fiber) are contingent realizations.

---

## 5. What the DO Seed Would Contain

Following the PRESTO seed structure:

1. **Identity:** You have the Distributed Objects specification as realized in React. You can build a conformant runtime.
2. **Architectural Rationale:** Why each constraint exists. Why components, why unidirectional flow, why virtual DOM, why hooks.
3. **Contracts:** Numbered, testable commitments. "The runtime MUST reconcile the virtual tree against the real DOM." "State changes MUST trigger re-render of the owning component and its subtree."
4. **The Component Model:** Component types (function, class), props, state, children, refs.
5. **The Reconciler Algorithm:** Diffing, keyed children, fiber tree traversal, commit phase.
6. **The Hook System:** useState, useEffect, useRef, useMemo, useCallback, useContext — lifecycle and ordering rules.
7. **Verification Suite:** Tests that any conformant runtime must pass. Component mounting, state updates, effect cleanup, reconciliation correctness, key-based reordering.

---

## 6. What This Would Prove

If a resolver (LLM) consumes the DO seed and produces a runtime that passes the verification suite:

- **The derivation inversion is general.** It works on architectures the author did not design.
- **Constraints are more fundamental than implementations.** React's constraints, stated in prose, produce a conformant runtime — just as PRESTO's constraints produce a conformant engine.
- **The method is not circular.** The author discovered the constraints by studying React, not by designing them. The conformance criteria are React's, not the author's.
- **The prose-as-machine thesis holds across styles.** Both the bilateral resolution model (PRESTO) and the distributed objects model (React) are derivable from prose seeds.

---

## 7. Open Questions

- Can the fiber architecture (cooperative scheduling) be specified in prose with sufficient precision for a resolver to implement it? This is the most complex constraint.
- What subset of React's API surface is essential vs. convenience? The seed should contain only the essential constraints, not the full API.
- How do we define "conformant" for a React-like runtime? React's own test suite? A reduced behavioral suite? The key semantic invariants?
- Does the seed need to specify JSX transformation, or is that a syntax concern (like htxlang vs PRESTO)?

---

## 8. Next Steps

1. Study the React reconciler source (react-reconciler package) to refine the constraint list
2. Draft the DO seed in the same format as the PRESTO seed
3. Feed it to a resolver and evaluate the output against React's behavioral expectations
4. Document the results as a companion to the PRESTO dissertation

If it works, add a section to the unified paper: "Cross-Style Validation: The Distributed Objects Seed." If it doesn't, document why — that failure is also informative about the limits of the derivation thesis.
