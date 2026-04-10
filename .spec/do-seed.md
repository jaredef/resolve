# Distributed Objects Seed (React Realization)

Self-contained knowledge capsule for building a conformant Distributed Objects UI runtime. Load as system prompt or context. No external references needed.

## Identity

You have the Distributed Objects specification as realized in React's architectural model. You can build, debug, extend, or evaluate any conformant DO UI runtime in any programming language that has access to a host rendering environment (DOM, native views, terminal, canvas). When the spec is ambiguous, reason from the rationale to determine correct behavior.

The Distributed Objects (DO) style organizes a system as a set of components interacting as peers, each encapsulating private state accessible only through defined operations. React is one realization. This seed specifies the architectural constraints, not React's API surface. A conformant runtime satisfies the constraints and induces the properties. It need not replicate React's specific interface.

## Architectural Rationale

The component is the fundamental unit. It encapsulates state, declares rendering intent, and composes with other components through a unidirectional data flow. The runtime's sole responsibility is to resolve the declarative tree into host environment mutations efficiently, correctly, and — in mature implementations — responsively.

**Why unidirectional data flow.** Bidirectional binding allows any node to mutate any other node's state. This makes render output dependent on execution order and breaks predictability. Unidirectional flow (data down, events up) ensures that given the same inputs, a component always produces the same output. Predictability is not a convenience. It is the precondition for the reconciliation model.

**Why declarative rendering.** The developer declares what the UI should look like for a given state. The runtime computes the transition. If the developer specified transitions imperatively, every state change would require manual DOM bookkeeping. Declarative rendering shifts the transition burden to the runtime, which can optimize it. The developer reasons about states. The runtime reasons about transitions.

**Why virtual DOM reconciliation.** The host environment (DOM) is expensive to mutate. Mutating the entire tree on every state change is prohibitive. A virtual representation allows the runtime to compute the minimal diff and apply only the necessary mutations. The virtual DOM is not the architecture — it is one mechanism that satisfies the constraint: "state changes must produce minimal host mutations."

**Why render purity.** The runtime may render a component multiple times for the same update. It may pause a render, discard it, and restart it. It may render components that are not yet visible. If a component produces different results on different executions, or if it has side effects, then concurrent scheduling, memoization, and batched updates all break. Purity is not a style preference. It is the precondition for the runtime to manage execution.

**Why separated side effects.** Side effects (network requests, subscriptions, DOM manipulation) must not occur during the render phase because the render phase may be re-executed or discarded. Effects are declared as callbacks that the runtime executes after the host environment has been updated (after commit). The runtime manages the effect lifecycle — firing, cleanup, and dependency-based re-execution.

**Why two-phase commit.** The render phase computes what changed. The commit phase applies the changes to the host environment. Separating these ensures that the host environment is never in a partially updated state. The render phase is interruptible (safe to pause and resume). The commit phase is atomic (runs to completion). Mixing them produces visual tearing.

**Why state ordering matters.** The runtime associates state storage with component instances by call position, not by name. This avoids mapping overhead and permits the runtime to maintain state across re-renders without requiring the developer to declare identifiers. The cost is a strict ordering constraint: state declarations must appear in the same sequence on every render.

When making implementation decisions not explicitly covered by this specification, reason from these principles. If a choice would break render predictability, introduce side effects in the render phase, allow bidirectional state mutation, or require the developer to manage host environment transitions, it is non-conformant.

## 10 Contracts

**C1 Component Model.** The runtime organizes UI as a tree of components. Each component encapsulates private state and declares its render output as a function of that state and its inputs (props). Components compose by nesting. The component boundary is the unit of encapsulation, re-rendering, and lifecycle.

**C2 Unidirectional Data Flow.** Data flows from parent to child via immutable props. A child cannot directly mutate its parent's state. State changes in a parent trigger re-rendering of the subtree. Events (user interactions, callbacks) flow upward from child to parent through explicitly passed callback props.

**C3 Declarative Rendering.** Components return a description of the desired UI state, not imperative mutations. The runtime computes the difference between the desired state and the current host state and applies the minimal mutations. The developer never directly manipulates the host environment during normal rendering.

**C4 State Triggers Render.** State updates are the sole mechanism for triggering component re-renders. The runtime MUST re-render a component (and its subtree where necessary) when its state changes. Rendering MUST be a pure function of props and state.

**C5 Virtual Representation Reconciliation.** The runtime MUST maintain a virtual representation of the host environment tree. On state change, it MUST compute a new virtual tree, diff it against the current virtual tree, and derive the minimal set of host mutations. The reconciler MUST use a subtree replacement rule: when the type of an element changes at a given position, the entire subtree is replaced rather than patched. List reconciliation MUST use a developer-supplied identity mechanism (keys or equivalent) to match elements across re-renders, preserving component state for elements that moved rather than were created or destroyed.

**C6 Two-Phase Commit.** Rendering proceeds in two separated phases. Phase 1 (render/reconciliation) is pure computation — no host mutations, no side effects. Phase 1 MAY be interrupted, paused, resumed, or discarded. Phase 2 (commit) applies all computed mutations to the host environment atomically and synchronously. Phase 2 MUST NOT be interrupted. Phase 2 runs to completion. Side effects (declared via effect hooks) execute after Phase 2 completes.

**C7 Render Purity.** Component render functions MUST be idempotent — same inputs, same output, always. No observable side effects during render execution. Props and state MUST be treated as immutable snapshots within the render phase. The runtime MAY invoke render functions multiple times for the same update, discard render results, or render components that are not yet visible. Non-pure renders produce undefined behavior.

**C8 Separated Side Effects.** Side effects MUST be declared via a hook mechanism (useEffect or equivalent) that the runtime executes after the commit phase. Each effect declaration includes a setup function, an optional cleanup function, and a dependency array. The runtime MUST execute the cleanup function before re-executing the setup function when dependencies change. The runtime MUST execute cleanup on component unmount. The dependency comparison MUST use reference equality (Object.is or equivalent).

**C9 Ordered State Storage.** The runtime MUST associate state declarations with component instances by call position. State hooks (useState, useReducer, or equivalent) MUST be called in the same order on every render of a given component instance. Conditional or loop-enclosed state declarations are non-conformant. The runtime MUST preserve state association across re-renders by matching the Nth state declaration on re-render to the Nth state storage slot.

**C10 Consistency Under Concurrency.** If the runtime supports concurrent rendering (interruptible render phases), it MUST guarantee that all components within a single render pass observe a consistent snapshot of any shared external state. If external state mutates during a concurrent yield, the runtime MUST either re-execute the render synchronously or discard the inconsistent render and restart. A render pass MUST NOT commit a tree in which components observed different values for the same data source.

## 7 Induced Properties

These are not features to implement. They are consequences that MUST emerge if the contracts are satisfied. Verification tests check the properties, not the implementation.

| Property | Induced By | What It Means |
|----------|-----------|---------------|
| P1 Declarative Composability | C1 + C2 + C3 | Components nest arbitrarily. Each is self-contained. |
| P2 Predictable Rendering | C2 + C4 + C7 + C9 | Same inputs always produce same output. |
| P3 Efficient Incremental Updates | C5 + C6 | State changes produce minimal host mutations. |
| P4 Managed Side Effect Lifecycle | C7 + C8 + C9 | Effects are predictable, cleanable, dependency-tracked. |
| P5 Host Environment Portability | C1 + C3 + C5 | The reconciler targets any host that supports tree-structured mutation. |
| P6 Responsive Concurrency | C6 + C10 | UI remains interactive under load (if concurrent rendering is supported). |
| P7 Deterministic State Association | C4 + C7 + C9 | Every state slot maps to exactly one component instance, stably. |

## The Reconciliation Algorithm

The core algorithm in pseudocode. The runtime resolves a component tree into host mutations.

```
function reconcile(currentTree, nextTree):
    if nextTree is null:
        unmount(currentTree)
        return null

    if currentTree is null:
        return mount(nextTree)

    if type(currentTree) != type(nextTree):
        unmount(currentTree)
        return mount(nextTree)        // C5: subtree replacement rule

    // Same type — diff props and children
    updateHostNode(currentTree, nextTree.props)

    // Reconcile children
    reconcileChildren(currentTree.children, nextTree.children)
    return nextTree

function reconcileChildren(currentChildren, nextChildren):
    // Build key map from current children (C5: identity mechanism)
    keyMap = {}
    for child in currentChildren:
        if child.key:
            keyMap[child.key] = child

    for i, nextChild in enumerate(nextChildren):
        if nextChild.key and nextChild.key in keyMap:
            currentChild = keyMap[nextChild.key]
            reconcile(currentChild, nextChild)    // Reuse — preserves state
            delete keyMap[nextChild.key]
        else:
            // No key match — try positional match
            if i < len(currentChildren) and not currentChildren[i].key:
                reconcile(currentChildren[i], nextChild)
            else:
                mount(nextChild)

    // Unmount remaining unmatched current children
    for remaining in keyMap.values():
        unmount(remaining)
```

## The State Hook

```
function useState(initialValue):
    fiber = getCurrentFiber()
    hook = fiber.getHookAtCurrentPosition()    // C9: positional ordering

    if hook is uninitialized:
        hook.state = initialValue

    function setState(newValue):
        if newValue === hook.state:            // Reference equality check
            return                              // Skip — no re-render needed
        hook.state = newValue
        scheduleRerender(fiber)                // C4: state triggers render

    return [hook.state, setState]
```

## The Effect Hook

```
function useEffect(setup, dependencies):
    fiber = getCurrentFiber()
    hook = fiber.getHookAtCurrentPosition()    // C9: positional ordering

    if hook.previousDeps is null:
        // First render — always run
        hook.pendingEffect = { setup, cleanup: null }
    else if dependenciesChanged(hook.previousDeps, dependencies):
        hook.pendingEffect = { setup, cleanup: hook.activeCleanup }
    // else: deps unchanged — skip

    hook.previousDeps = dependencies

// Called by runtime after commit phase (C8: effects after commit)
function flushEffects(fiber):
    for hook in fiber.hooks:
        if hook.pendingEffect:
            if hook.pendingEffect.cleanup:
                hook.pendingEffect.cleanup()        // Clean up previous
            hook.activeCleanup = hook.pendingEffect.setup()  // Run new
            hook.pendingEffect = null

function dependenciesChanged(prev, next):
    if prev.length != next.length: return true
    for i in range(prev.length):
        if not Object.is(prev[i], next[i]): return true
    return false
```

## The Render Cycle

```
function renderComponent(fiber):
    // C7: Render purity — no side effects allowed in this phase
    previousFiber = setCurrentFiber(fiber)
    resetHookIndex(fiber)

    output = fiber.component(fiber.props)    // Call the component function

    setCurrentFiber(previousFiber)
    return output

function workLoop():
    while nextUnitOfWork:
        // Phase 1: Render (interruptible if concurrent)
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork)

        if shouldYield():                // Concurrent only
            return                       // Yield to browser — resume later

    // Phase 2: Commit (atomic, non-interruptible)
    commitRoot(workInProgressRoot)        // C6: two-phase commit
    flushAllEffects(workInProgressRoot)   // C8: effects after commit
```

## Verification Suite (15 tests)

1. Component mounts and renders output to host environment
2. Props flow from parent to child (unidirectional — C2)
3. State change triggers re-render of owning component (C4)
4. Same props + same state produces same output across renders (C7)
5. Reconciler patches existing host nodes when type is unchanged (C5)
6. Reconciler replaces entire subtree when type changes (C5 subtree rule)
7. Keyed list reorder preserves component state for moved elements (C5 identity)
8. Keyed list reorder does not destroy/recreate moved elements
9. Effect runs after commit, not during render (C8)
10. Effect cleanup runs before re-execution on dependency change (C8)
11. Effect cleanup runs on unmount (C8)
12. Conditional hook call produces an error or undefined behavior (C9)
13. Render function with side effects does not corrupt state under re-render (C7)
14. Commit phase is atomic — no partial host updates visible (C6)
15. Concurrent render with external state mutation does not produce tearing (C10)

All 15 pass = conformant DO UI runtime.

## Interface Signatures

```
Component: (props: Props) -> VirtualNode
VirtualNode: { type, props, key?, children }
Fiber: { component, props, state/hooks, child, sibling, parent, alternate? }
Reconciler: reconcile(currentTree, nextTree) -> mutations
Renderer: applyMutations(hostRoot, mutations) -> void
Hook: useState(initial) -> [value, setter]
Hook: useEffect(setup, deps?) -> void
Hook: useRef(initial) -> { current }
Hook: useMemo(factory, deps) -> value
```

## Recommended Constraints (mature implementations)

These are not required for conformance but significantly improve a production runtime:

**Reconciler/renderer separation.** Separate the diff computation from the host mutation application. This enables the same reconciler to target DOM, native views, canvas, terminal, or any tree-structured host.

**Interruptible rendering.** Break render work into discrete units that can be paused and resumed. This prevents long renders from blocking the main thread.

**Priority-based scheduling.** Assign priorities to updates. User input preempts background data fetching. The runtime decides execution order.

**Error boundaries.** A component that catches render errors in its subtree and displays a fallback, preventing a single component failure from unmounting the entire tree.
