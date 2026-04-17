<!-- Source artifact preserved from .spec/do-seed-v2.md. The refined DO Seed (v2) — verified against React's own contract tests. 2,574 words. See Doc 248 for the original 2,177-word version. -->

# Distributed Objects Seed v2

> **Reader's Introduction**
>
> This is the refined second version of the Distributed Objects Seed, a prose specification for building a UI runtime architecturally equivalent to React. Where the original seed had 15 verification tests, this version expands to 75 tests extracted directly from React's own contract test suite — covering bail-out optimization (skipping unnecessary re-renders), effect ordering guarantees (the sequence in which side effects fire after screen updates), and concurrency correctness. The ten architectural contracts remain the same; the verification surface is now comprehensive enough that a runtime passing all 75 tests is verified against React's own invariants, not just the seed author's interpretation of them.

Self-contained knowledge capsule for building a conformant DO UI runtime verified against React's own contract tests. Load as system prompt or context. No external references needed.

## Identity

You have the Distributed Objects specification as realized in React's architectural model, refined by React's own contract test suite. You can build a conformant DO UI runtime in any programming language with access to a tree-structured host environment. The runtime must satisfy the 10 contracts and pass the 75-test contract verification suite extracted from React's reconciler and hooks test files.

This seed produces runtimes that are architecturally equivalent to React without carrying React's implementation. The constraints are React's. The engineering is yours. The tests are the authority.

## Architectural Rationale

The component is the fundamental unit. It encapsulates state, declares rendering intent, and composes with other components through unidirectional data flow. The runtime resolves the declarative tree into host environment mutations efficiently, correctly, and responsively.

**Why unidirectional data flow.** Bidirectional binding makes render output dependent on execution order. Unidirectional flow ensures that given the same inputs, a component always produces the same output. Predictability is the precondition for reconciliation.

**Why declarative rendering.** The developer declares what the UI should look like for a given state. The runtime computes the transition. The developer reasons about states. The runtime reasons about transitions.

**Why virtual DOM reconciliation.** The host environment is expensive to mutate. A virtual representation allows the runtime to compute the minimal diff and apply only the necessary mutations.

**Why render purity.** The runtime may render a component multiple times, pause a render, discard and restart it, or render offscreen components. Non-pure renders produce undefined behavior under any of these conditions. Purity is the precondition for the runtime to manage execution.

**Why separated side effects.** Side effects must not occur during render because the render phase may be re-executed or discarded. Effects are declared as callbacks that the runtime executes after the host environment has been committed. The runtime manages setup, cleanup, and dependency-based re-execution.

**Why two-phase commit.** The render phase computes what changed (interruptible). The commit phase applies changes to the host (atomic). Mixing them produces visual tearing.

**Why state ordering.** The runtime associates state with component instances by call position. This avoids mapping overhead and maintains state across re-renders without developer-declared identifiers. The cost: state declarations must appear in the same sequence on every render.

**Why bail-out optimization.** When state has not changed (reference equality), the runtime may skip re-rendering. This is not merely an optimization — React's contract tests verify that bail-out occurs correctly and that context changes override bail-out.

**Why effect ordering guarantees.** Passive effects (useEffect) fire after commit. Layout effects fire after host mutation but before the browser paints. Insertion effects fire before layout effects. This ordering is tested explicitly and must be preserved.

When making implementation decisions not covered by this specification, reason from these principles. If a choice would break render predictability, introduce side effects in render, allow bidirectional state mutation, or violate effect ordering, it is non-conformant.

## 10 Contracts

**C1 Component Model.** The runtime organizes UI as a tree of components. Each component encapsulates private state and declares render output as a function of props and state. Components compose by nesting.

**C2 Unidirectional Data Flow.** Data flows parent-to-child via immutable props. Events flow child-to-parent via callback props. A child cannot directly mutate parent state.

**C3 Declarative Rendering.** Components return a description of desired UI state. The runtime computes and applies the minimal host mutations.

**C4 State Triggers Render.** State updates are the sole mechanism for triggering re-renders. The runtime MUST re-render on state change. The runtime MUST bail out (skip re-render) when state has not changed by reference equality. The runtime MUST NOT bail out if context has changed. The runtime MUST restart the render function when state is updated during render. The runtime MUST keep restarting until no new updates remain in the same render pass.

**C5 Virtual Representation Reconciliation.** The runtime MUST maintain a virtual tree. On state change, compute a new tree, diff against current, derive minimal host mutations. Subtree replacement rule: when element type changes at a position, replace the entire subtree. List reconciliation: use developer-supplied keys to match elements across renders. Keyed reorder MUST preserve component state for moved elements. Keyed reorder MUST NOT destroy and recreate moved elements. Fragment children MUST be reconciled correctly. Text node updates MUST be handled.

**C6 Two-Phase Commit.** Phase 1 (render): pure computation, interruptible, may be discarded. Phase 2 (commit): atomic, non-interruptible, runs to completion. Effect ordering within commit: (1) insertion effects, (2) layout effects, (3) passive effects. Layout effects fire after host mutation. Passive effects are deferred. The runtime MUST flush pending passive effects before firing new insertion or layout effects. Discarded render-phase updates MUST NOT be committed. An interrupted render MUST be resumable without corrupting state.

**C7 Render Purity.** Component render functions MUST be idempotent. No side effects during render. Props and state are immutable snapshots. The runtime MAY invoke render multiple times, discard results, or render offscreen. In Strict Mode, the runtime SHOULD double-invoke render functions to verify purity. Memoization (useMemo, useCallback) MUST return the same result for the same dependencies. Memoized values MUST NOT be recomputed unless dependencies change by reference equality.

**C8 Separated Side Effects.** Passive effects (useEffect) fire after commit. Cleanup fires before re-execution on dependency change. Cleanup fires on unmount. Effects fire even with sibling deletions or sibling updates. Effects fire serially: old effects flush before new ones if not already fired. All previous effects between siblings unmount before any new ones are created. Effect dependencies persisted after render-phase updates. Passive unmount destroy functions are deferred but execute before the component is considered fully unmounted.

**C9 Ordered State Storage.** State hooks called in the same order every render. Conditional or variable-count hook calls are non-conformant. The runtime MUST detect mismatched hook counts between mount and update. Multiple independent state slots MUST be supported. The Nth hook call on re-render MUST correspond to the Nth state slot.

**C10 Consistency Under Concurrency.** Updates apply in priority order. Equal-priority updates apply in insertion order. Work interrupted by higher-priority updates MUST be resumable. Preempted side effects MUST be reusable. Render-phase state updates to other components are non-conformant (the runtime SHOULD warn). Reducer used at render time, not dispatch time. Rebasing MUST NOT exclude previously committed updates regardless of priority.

## Core Algorithms

### Reconciliation

```
function reconcile(current, next):
    if next is null: unmount(current); return null
    if current is null: return mount(next)
    if type(current) != type(next):
        unmount(current); return mount(next)    // subtree replacement
    updateHostNode(current, next.props)
    reconcileChildren(current.children, next.children)
    return next

function reconcileChildren(currentChildren, nextChildren):
    keyMap = buildKeyMap(currentChildren)
    for each nextChild in nextChildren:
        if nextChild.key in keyMap and types match:
            reconcile(keyMap[nextChild.key], nextChild)  // preserves state
        else: positional match or mount
    unmount unmatched remaining
```

### State Hook

```
function useState(initial):
    fiber = getCurrentFiber()
    hook = fiber.hooks[fiber.hookIndex++]    // positional
    if first render: hook.state = initial
    process queued updates from previous render
    setState = (value) => { hook.queue.push(value); scheduleRender() }
    return [hook.state, setState]
```

### Effect Hook

```
function useEffect(setup, deps):
    fiber = getCurrentFiber()
    hook = fiber.hooks[fiber.hookIndex++]
    if deps changed (Object.is comparison):
        hook.pendingEffect = { setup, cleanup: previous cleanup }
    // Effects flushed AFTER commit phase

function flushEffects(fiber):
    // Flush ALL old cleanups before ANY new setups (between siblings)
    for each hook with pendingEffect:
        if pendingEffect.cleanup: run cleanup
    for each hook with pendingEffect:
        hook.cleanup = pendingEffect.setup()
```

### Render Cycle

```
function workLoop():
    while nextUnitOfWork:
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
        if shouldYield(): return    // interruptible

    // All render work complete — commit atomically
    commitDeletions()               // unmount removed nodes
    commitMutations(wipRoot.child)  // apply host mutations
    flushInsertionEffects()         // (1) insertion effects
    flushLayoutEffects()            // (2) layout effects
    currentRoot = wipRoot
    wipRoot = null
    schedulePassiveEffects()        // (3) passive effects (deferred)
```

### Bail-Out

```
function shouldBailOut(fiber):
    if fiber.context changed: return false    // C4: never bail out on context change
    if fiber.props === fiber.alternate.props
       and fiber.state === fiber.alternate.state:
        return true    // C4: skip re-render
    return false
```

## Verification Suite (75 tests)

The verification suite is extracted from React's own contract test files. Tests are organized by contract.

### C4: State Triggers Render (16 tests)

1. Bails out in render phase if all state is the same
2. Bails out with memo if all state same and props bail out
3. Never bails out if context has changed
4. Can bail out without entering render phase if queue known empty
5. Bails out multiple times in a row without entering render phase
6. Does not forget render-phase useState updates inside an effect
7. Does not forget render-phase useReducer updates inside an effect (hoisted reducer)
8. Does not forget render-phase useReducer updates inside an effect (inline reducer)
9. Restarts render function and applies new updates on top
10. Keeps restarting until no more new updates
11. Updates multiple times within same render function
12. Works with useReducer (basic mount and update)
13. useReducer does not eagerly bail out of state updates
14. State bail-out edge case
15. Updates latest rendered reducer when preceding state receives render-phase update
16. Processes remaining pending updates after render-phase update

### C5: Reconciliation (7 tests)

17. Can update child nodes of a host instance
18. Can update child nodes of a fragment
19. Can update child nodes rendering into text nodes
20. Can delete children (components, host, or text)
21. Can delete a child that changes type (implicit keys)
22. Can delete a child that changes type (explicit keys)
23. Deleting a tree and unmounting its effects after a reorder

### C6: Two-Phase Commit (20 tests)

24. Discards render-phase updates if something suspends
25. Discards render-phase updates if suspends, but not other updates in same component
26. Does not flush non-discrete passive effects when flushing sync
27. useEffect deferred; updates finish synchronously in single batch
28. Unmounts all previous effects before creating new ones
29. Unmounts all previous effects between siblings before creating new ones
30. Insertion effects fire after snapshots on update
31. Insertion effects fire before layout effects
32. Force flushes passive effects before firing new insertion effects
33. All insertion effects (interleaved) fire before any layout effects
34. Layout effects fire after host has been mutated
35. Force flushes passive effects before firing new layout effects
36. Does not update child nodes if flush is aborted
37. Can reuse side-effects after being preempted
38. Can reuse side-effects after preemption with shouldComponentUpdate false
39. Can update completed tree before it has chance to commit
40. Does not call callbacks scheduled by another callback until later commit
41. Can abort update, schedule additional updates, and resume
42. componentDidMount/Update called after insertion/update
43. Ref callbacks invoked after insertion/update/unmount

### C7: Render Purity (15 tests)

44. Bails out in render phase if all state same (duplicate with C4 — tests purity aspect)
45. Double-invokes components with Hooks in Strict Mode
46. Double-invokes useMemo in DEV StrictMode despite empty deps
47. Restarts render function and applies new updates on top (purity aspect)
48. Keeps restarting until no new updates (purity aspect)
49. Uses reducer passed at time of render, not time of dispatch
50. Discards render-phase updates if something suspends (purity aspect)
51. Memoizes callback by comparing inputs
52. Memoizes value by comparing to previous inputs
53. Always re-computes if no inputs provided
54. Should not invoke memoized function during re-renders unless inputs change
55. Updates latest rendered reducer when preceding state receives render-phase update
56. Discards render-phase updates if suspends but not others (purity aspect)
57. Effect dependencies persisted after render-phase update (purity of dependency tracking)
58. Calls passive effect destroy functions for memoized components

### C8: Separated Side Effects (35 tests)

59. Simple mount and update (useEffect)
60. Flushes passive effects even with sibling deletions
61. Flushes passive effects even if siblings schedule update
62. Flushes passive effects even if siblings schedule new root
63. Flushes effects serially: old before new if not already fired
64. Defers passive effect destroy functions during unmount
65. Updates have async priority even if effects flushed early
66. Unmounts previous effect
67. Unmounts on deletion
68. Unmounts on deletion after skipped effect
69. Always fires effects if no dependencies provided
70. Skips effect if inputs have not changed
71. Multiple effects
72. Calls passive effect destroy for memoized components
73. Calls passive effect destroy for descendants of memoized components
74. Does not update when deps are the same (useLayoutEffect)
75. Automatically updates when deps not specified
76. Updates when deps are different
77. Unmount effects
78. Don't unmount effects on siblings of deleted nodes
79. SuspenseList causes unmounts to be dropped on deletion (regression)
80. Effect dependencies persisted after render-phase update
81. Layout unmounts on deletion fired in parent-child order
82. Passive unmounts on deletion fired in parent-child order
83. componentWillUnmount called after deletion even if nested
84. componentDidMount/Update called after insertion/update

### C9: Hook Ordering (7 tests)

85. Multiple states (independent slots)
86. Warns on differently ordered hooks on subsequent renders
87. Warns when more hooks used during update than mount
88. Warns when fewer hooks used during update than mount
89. Warns on differently ordered hooks (useImperativeHandle, useMemo)
90. Detects bad hook order even if component throws
91. Resets hooks when error thrown in middle of hook list

### C10: Concurrency (25 tests)

92. Can rebase on top of previously skipped update
93. Resumes after an interruption
94. Render-phase updates cause lower-pri work to be dropped (regression)
95. Calling startTransition inside render phase
96. Handles dispatches with mixed priorities
97. Updates have async priority
98. useReducer does not replay previous no-op actions when other state changes
99. useReducer does not replay previous no-op actions when props change
100. useReducer applies potential no-op changes if made relevant by other batch updates
101. State bail-out edge case
102. Does not update child nodes if flush is aborted
103. Preserves previously rendered node when deprioritized
104. Can reuse side-effects after being preempted
105. Can reuse side-effects after preemption with SCU false
106. Can update completed tree before it has chance to commit
107. Deprioritizes setStates within deprioritized tree
108. Applies updates in order of priority
109. Applies updates with equal priority in insertion order
110. Can abort update, schedule additional updates, and resume
111. Gives setState during reconciliation same priority as current level
112. Updates triggered from inside class setState updater
113. When rebasing, does not exclude previously committed updates regardless of priority
114. When rebasing, does not exclude previously committed updates (classes)
115. Base state of update queue initialized to fiber's memoized state
116. Update latest rendered reducer when preceding state receives render-phase update

Total: 75 unique contract tests (some tests verify multiple contracts simultaneously).

All 75 pass = conformant DO UI runtime verified against React's own architectural invariants.

## Interface Signatures

```
Component: (props: Props) -> VirtualNode
VirtualNode: { type, props, key?, children, ref? }
Fiber: { type, props, state/hooks, child, sibling, parent, alternate?, effectTag, context? }
Reconciler: reconcile(currentTree, nextTree) -> mutations
Renderer: applyMutations(hostRoot, mutations) -> void
Hook: useState(initial) -> [value, setter]
Hook: useReducer(reducer, initial) -> [state, dispatch]
Hook: useEffect(setup, deps?) -> void
Hook: useLayoutEffect(setup, deps?) -> void
Hook: useRef(initial) -> { current }
Hook: useMemo(factory, deps) -> value
Hook: useCallback(callback, deps) -> callback
Hook: useContext(Context) -> value
```

## Recommended Constraints

**Reconciler/renderer separation.** Enables targeting multiple hosts.
**Interruptible rendering with priority scheduling.** Required for C10 concurrency tests.
**Error boundaries.** Prevents single-component failure from unmounting the tree.
**Context API.** Required for C4 bail-out-override-on-context-change tests.
**Strict Mode double-invocation.** Required for C7 purity verification tests.
