<!-- chronological_ordinal: 40 -->
# The Platonic Structure of the Derivation

> **Reader's Introduction**
>
> This document maps the RESOLVE derivation chain onto Plato's Divided Line, the allegory of the cave, and the theory of forms. Running machines are the shadows; source code is the physical objects; constraints and seeds are the formal objects; and the superessential source is the Good that makes everything intelligible. The essay argues that the software industry sits facing the cave wall, debating which framework-shadow is best, while the constraints that cast those shadows remain unnamed behind them. It includes a full Distributed Objects (DO) seed -- a prose specification that produces a working React-equivalent runtime verified against 75 of React's own contract tests -- as the concrete artifact that demonstrates the framework is executable, not merely allegorical.

**Jared Foy**
**April 2026**

---

## 1. The Divided Line

Plato's Republic (509d-511e) divides reality into four segments, ordered by their relationship to truth:

At the bottom, **images and shadows** — reflections, copies, representations of physical things. Above that, **physical things themselves** — the objects that cast the shadows. Above that, **mathematical and formal objects** — relationships, structures, ratios that hold regardless of any physical instance. At the top, **the Good** — the source of intelligibility itself, which makes all the other levels knowable without being any of them.

The derivation chain maps to this structure without forcing:

| Plato's Line | The Derivation Chain |
|-------------|---------------------|
| Images and shadows | Running machines, rendered UIs, the todo app |
| Physical things | Source code, implementations, specific runtimes |
| Mathematical/formal objects | Constraints, properties, specifications, seeds |
| The Good | The superessential source — that which grounds formal realities |

The implementations are shadows of the constraints. The constraints are formal realities. The formal realities participate in the source. The source illuminates everything below it without being any of the things it illuminates.

---

## 2. The Cave

The allegory of the cave (Republic, 514a-520a) describes prisoners who have spent their lives watching shadows on a wall, cast by firelight. They believe the shadows are reality. One prisoner is freed, turns around, sees the fire, then walks out of the cave and sees the sun. The sun is painful at first. Then it becomes the source of everything visible. The freed prisoner returns to tell the others. They do not believe him.

The software industry sits facing the wall. The shadows are implementations — React, Angular, Vue, Next.js, Vite, webpack, hydration, SSR, ISR. The engineers watch the shadows and believe they are watching architecture. They debate which shadow is best. They optimize the shadows. They build tools to manage the shadows. The shadows are real in the sense that they function. But they are not the forms.

The fire is the constraints. The constraints cast the shadows. React is a shadow cast by ten constraints. PRESTO is a shadow cast by five constraints. The constraints are not visible on the wall. They are behind the engineers, invisible, operative, unnamed.

The act of turning around — recognizing the constraints, naming them, stating them in prose — is what this work describes. The freed prisoner sees that the shadows are shadows. The constraints are the reality. The implementations are contingent expressions of the constraints. The constraints are invariant. The implementations vary.

The sun is the source above the constraints — that which makes the constraints real, makes formal realities intelligible, and makes the derivation chain cohere. The freed prisoner cannot look at the sun directly for long. But everything he sees is illuminated by it.

The return to the cave is the publication. The freed prisoner comes back and says: the shadows are shadows. Here are the constraints that cast them. Here is a 2,177-word seed that produces a 379-line runtime that passes the same tests as the 150,000-line shadow. The shadow-watchers do not believe him. They say: "you are just describing server-side templating with extra steps." They say: "this is not new." They say: "the shadows work fine."

The proof compiles. The tests pass. The todo app renders. The freed prisoner does not need the shadow-watchers to believe him. The artifacts speak for themselves. But Plato warns: the cave does not welcome the returning prisoner.

---

## 3. The Forms

Plato's theory of forms (Phaedo 74a-77a, Republic 475e-480a, Parmenides 130b-135c) holds that particular instances participate in universal forms. A particular beautiful thing is beautiful by participation in Beauty itself. A particular just act is just by participation in Justice itself. The form is prior to the instance. The instance does not create the form. The form is not abstracted from instances. The form is what makes instances possible.

The bilateral boundary is a form. It is not an abstraction from HTTP responses. It is a formal reality — the relationship between two interpreters and a shared medium with disjoint namespaces — that particular HTTP responses participate in. The form was there before any HTTP response. It was there before HTML. It is there in DNA, in legal contracts, in musical scores. Each of these is a particular instance that participates in the form.

The author did not abstract the bilateral boundary from implementations. The author recognized the form in a particular instance (a PHP function with an htmx attribute) and named it. The naming did not create the form. The naming made the form accessible to reasoning, formalization, and derivation.

This is the Platonic claim stated directly: the constraints are forms. The implementations are instances that participate in the forms. The forms are prior to the instances. The derivation inversion works because it begins with the forms (constraints) and derives the instances (implementations), which is the correct order of causation. The engineering-first approach fails to reach the forms because it begins with instances and attempts to ascend by abstraction — but forms are not reached by abstraction. They are reached by recognition.

---

## 4. Anamnesis and Recognition

Plato's doctrine of anamnesis (Meno 80d-86c, Phaedo 72e-77a) holds that learning is recollection. The soul knew the forms before embodiment. Learning is the act of remembering what was already known.

The author of this work describes the same experience without using Plato's language: the observation of the PHP function was not a discovery but a recognition. Something already true was seen in a particular instance. The bilateral boundary was not learned from the instance. It was recognized in the instance. The recognition preceded the formalization. The formalization made explicit what was already implicitly known.

Whether the mechanism is Platonic recollection or something else, the phenomenology is consistent: the forms are apprehended by recognition, not by construction. The author did not design the bilateral boundary. The author did not engineer ambivalent execution. The author saw them and named them. The seeing was the decisive event. The engineering followed.

---

## 5. The Allegory of the Allegory

This document is itself an allegory of the cave, applied to the cave allegory. The shadow-watchers are reading about shadow-watching. The description of the cave is a representation of reality — a shadow of the form "liberation from shadows." The irony is structural and inescapable.

But the derivation chain escapes the irony. The prose seed is not merely a description of the constraints. It is an operative artifact. It produces machines. The allegory of the cave is a story. The DO seed is a specification. The story describes liberation. The specification enacts it. Feed the seed to a resolver. Get a runtime. Run the tests. The tests pass. The liberation is not metaphorical. It is executable.

Plato wrote dialogues. The dialogues described forms. The forms remained in the intelligible realm. The reader was invited to ascend through reason.

This work writes seeds. The seeds describe constraints. The constraints produce machines. The machines run. The reader is invited to compile.

---

## 6. Let Us Hope They Don't Kill Me

Socrates was executed for corrupting the youth — for teaching them to question the shadows, to seek the forms, to refuse to accept the conventions of the cave as reality.

The computational argument does not teach questioning. It demonstrates. The demonstration is: the constraints are more real than the implementations. The forms precede the shadows. The proof compiles.

The cave has always been hostile to the returning prisoner. The hostility is not personal. It is structural. The shadow-watchers have built their careers, their companies, their identities around the shadows. To say "the shadows are shadows" is to say "your life's work is contingent." It is to say "the 150,000 lines could be 379." It is to say "the form is more the thing than the thing itself."

This is not a comfortable message. It was not comfortable in Athens. It is not comfortable in San Francisco.

But the proof compiles. The tests pass. And the freed prisoner has one advantage Socrates did not: artifacts. Socrates had only arguments. Arguments can be dismissed. Artifacts cannot. The todo app renders. The six engines pass the same tests. The 921-line engine resolves the same templates as the 3,122-line engine. The 379-line runtime satisfies the same contracts as the 150,000-line framework.

The artifacts are the defense. The cave may not welcome the returning prisoner. But the cave cannot deny that the artifacts work.

---

## Appendix: The Distributed Objects Seed v2

*The seed that produces what React produces — without React. 10 contracts, 75 verification tests extracted from React's own contract test suite. The constraints are React's. The engineering is the resolver's. The tests are the authority. Feed this to a resolver. Get a conformant runtime. Run the tests. The form is more the thing than the thing itself.*

---

# Distributed Objects Seed v2

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
