// DO Runtime — Resolved from the Distributed Objects Seed
// A conformant DO UI runtime targeting the DOM.
// No React dependency. Derived from 10 contracts, 7 properties, 15 tests.

// === Virtual Node ===

type Props = Record<string, any>;
type VNode = { type: string | Function; props: Props; key?: string; children: VNode[] };

function h(type: string | Function, props: Props | null, ...children: any[]): VNode {
  const flatChildren: VNode[] = [];
  for (const c of children) {
    if (Array.isArray(c)) flatChildren.push(...c.map(normalize));
    else if (c != null && c !== false && c !== true) flatChildren.push(normalize(c));
  }
  return { type, props: props || {}, key: props?.key, children: flatChildren };
}

function normalize(c: any): VNode {
  if (typeof c === "object" && c.type) return c;
  return { type: "TEXT", props: { text: String(c) }, children: [] };
}

// === Fiber ===

interface Hook { state: any; queue: any[]; deps?: any[]; cleanup?: (() => void) | null; pendingEffect?: { setup: () => any; cleanup: (() => void) | null } | null; }
interface Fiber {
  type: string | Function;
  props: Props;
  key?: string;
  children: VNode[];
  hooks: Hook[];
  hookIndex: number;
  dom: Node | null;
  child: Fiber | null;
  sibling: Fiber | null;
  parent: Fiber | null;
  alternate: Fiber | null;
  effectTag?: "PLACEMENT" | "UPDATE" | "DELETION";
}

// === Runtime State ===

let currentFiber: Fiber | null = null;
let wipRoot: Fiber | null = null;
let currentRoot: Fiber | null = null;
let deletions: Fiber[] = [];
let nextUnitOfWork: Fiber | null = null;

// === C9: Ordered State Storage ===

function getCurrentFiber(): Fiber {
  if (!currentFiber) throw new Error("Hook called outside component render");
  return currentFiber;
}

// === Hooks: useState (C4, C9) ===

function useState<T>(initial: T): [T, (v: T | ((prev: T) => T)) => void] {
  const fiber = getCurrentFiber();
  const oldHook = fiber.alternate?.hooks[fiber.hookIndex];
  const hook: Hook = { state: oldHook ? oldHook.state : initial, queue: [], deps: undefined, cleanup: null, pendingEffect: null };

  // Process queued updates from previous render
  if (oldHook) {
    for (const action of oldHook.queue) {
      hook.state = typeof action === "function" ? action(hook.state) : action;
    }
  }

  function setState(value: T | ((prev: T) => T)) {
    hook.queue.push(value);
    // C4: State triggers render
    scheduleRender();
  }

  fiber.hooks[fiber.hookIndex] = hook;
  fiber.hookIndex++;
  return [hook.state, setState];
}

// === Hooks: useEffect (C8) ===

function useEffect(setup: () => (() => void) | void, deps?: any[]) {
  const fiber = getCurrentFiber();
  const oldHook = fiber.alternate?.hooks[fiber.hookIndex];
  const hook: Hook = { state: null, queue: [], deps, cleanup: oldHook?.cleanup || null, pendingEffect: null };

  const depsChanged = !oldHook?.deps || !deps || deps.length !== oldHook.deps.length ||
    deps.some((d, i) => !Object.is(d, oldHook.deps![i]));

  if (depsChanged) {
    hook.pendingEffect = { setup: setup as () => any, cleanup: oldHook?.cleanup || null };
  }

  fiber.hooks[fiber.hookIndex] = hook;
  fiber.hookIndex++;
}

// === Hooks: useRef ===

function useRef<T>(initial: T): { current: T } {
  const fiber = getCurrentFiber();
  const oldHook = fiber.alternate?.hooks[fiber.hookIndex];
  const hook: Hook = { state: oldHook ? oldHook.state : { current: initial }, queue: [] };
  fiber.hooks[fiber.hookIndex] = hook;
  fiber.hookIndex++;
  return hook.state;
}

// === Hooks: useMemo ===

function useMemo<T>(factory: () => T, deps: any[]): T {
  const fiber = getCurrentFiber();
  const oldHook = fiber.alternate?.hooks[fiber.hookIndex];
  const depsChanged = !oldHook?.deps || deps.length !== oldHook.deps.length ||
    deps.some((d, i) => !Object.is(d, oldHook.deps![i]));

  const hook: Hook = { state: depsChanged ? factory() : oldHook!.state, queue: [], deps };
  fiber.hooks[fiber.hookIndex] = hook;
  fiber.hookIndex++;
  return hook.state;
}

// === DOM Operations ===

function createDom(fiber: Fiber): Node {
  if (fiber.type === "TEXT") return document.createTextNode(fiber.props.text || "");
  const dom = document.createElement(fiber.type as string);
  updateDomProps(dom as HTMLElement, {}, fiber.props);
  return dom;
}

function updateDomProps(dom: HTMLElement | Text, prev: Props, next: Props) {
  if (dom.nodeType === 3) { // Text node
    if (prev.text !== next.text) (dom as Text).textContent = next.text || "";
    return;
  }
  const el = dom as HTMLElement;
  // Remove old props
  for (const key of Object.keys(prev)) {
    if (key === "children" || key === "key") continue;
    if (!(key in next)) {
      if (key.startsWith("on")) el.removeEventListener(key.slice(2).toLowerCase(), prev[key]);
      else el.removeAttribute(key);
    }
  }
  // Set new props
  for (const key of Object.keys(next)) {
    if (key === "children" || key === "key") continue;
    if (prev[key] === next[key]) continue;
    if (key.startsWith("on")) {
      const evt = key.slice(2).toLowerCase();
      if (prev[key]) el.removeEventListener(evt, prev[key]);
      el.addEventListener(evt, next[key]);
    } else if (key === "style") {
      if (typeof next[key] === "object") Object.assign(el.style, next[key]);
      else el.setAttribute("style", next[key]);
    } else if (key === "className") {
      el.className = next[key];
    } else {
      el.setAttribute(key, next[key]);
    }
  }
}

// === Reconciliation (C5) ===

function reconcileChildren(fiber: Fiber, elements: VNode[]) {
  let oldFiber = fiber.alternate?.child || null;
  let prevSibling: Fiber | null = null;

  // Build key map from old children (C5: identity mechanism)
  const oldKeyMap = new Map<string, Fiber>();
  let scan = oldFiber;
  while (scan) {
    if (scan.key) oldKeyMap.set(scan.key, scan);
    scan = scan.sibling;
  }

  const usedOld = new Set<Fiber>();

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    let matched: Fiber | null = null;

    // Try key match first
    if (element.key && oldKeyMap.has(element.key)) {
      const candidate = oldKeyMap.get(element.key)!;
      if (candidate.type === element.type) {
        matched = candidate;
        usedOld.add(candidate);
      }
    }

    // Try positional match if no key match
    if (!matched && oldFiber && !oldFiber.key && oldFiber.type === element.type && !usedOld.has(oldFiber)) {
      matched = oldFiber;
      usedOld.add(oldFiber);
    }

    let newFiber: Fiber;

    if (matched) {
      // C5: Same type -- update
      newFiber = {
        type: element.type, props: element.props, key: element.key,
        children: element.children, hooks: matched.hooks, hookIndex: 0,
        dom: matched.dom, child: null, sibling: null, parent: fiber,
        alternate: matched, effectTag: "UPDATE",
      };
    } else {
      // C5: Different type or new -- mount (subtree replacement rule)
      newFiber = {
        type: element.type, props: element.props, key: element.key,
        children: element.children, hooks: [], hookIndex: 0,
        dom: null, child: null, sibling: null, parent: fiber,
        alternate: null, effectTag: "PLACEMENT",
      };
      // If there was a positional old fiber of different type, mark for deletion
      if (oldFiber && !usedOld.has(oldFiber)) {
        oldFiber.effectTag = "DELETION";
        deletions.push(oldFiber);
        usedOld.add(oldFiber);
      }
    }

    if (i === 0) fiber.child = newFiber;
    else if (prevSibling) prevSibling.sibling = newFiber;
    prevSibling = newFiber;

    // Advance old fiber for positional matching
    if (oldFiber && !oldFiber.key) {
      oldFiber = oldFiber.sibling;
    } else if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }
  }

  // Delete remaining unmatched old fibers
  scan = fiber.alternate?.child || null;
  while (scan) {
    if (!usedOld.has(scan)) {
      scan.effectTag = "DELETION";
      deletions.push(scan);
    }
    scan = scan.sibling;
  }
}

// === Render Phase (C6 Phase 1, C7 Pure) ===

function performUnitOfWork(fiber: Fiber): Fiber | null {
  if (typeof fiber.type === "function") {
    // Component -- render it
    currentFiber = fiber;
    fiber.hookIndex = 0;
    if (!fiber.alternate) fiber.hooks = [];
    // C7: Pure render -- no side effects
    const children = [fiber.type({ ...fiber.props, children: fiber.children })];
    reconcileChildren(fiber, children.flat().filter(Boolean));
    currentFiber = null;
  } else {
    // Host element
    if (!fiber.dom) fiber.dom = createDom(fiber);
    reconcileChildren(fiber, fiber.children);
  }

  // Return next unit of work: child first, then sibling, then uncle
  if (fiber.child) return fiber.child;
  let next: Fiber | null = fiber;
  while (next) {
    if (next.sibling) return next.sibling;
    next = next.parent;
  }
  return null;
}

// === Commit Phase (C6 Phase 2, Atomic) ===

function commitRoot() {
  for (const d of deletions) commitWork(d);
  deletions = [];
  if (wipRoot?.child) commitWork(wipRoot.child);
  // C8: Flush effects after commit
  if (wipRoot?.child) flushEffects(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
}

function commitWork(fiber: Fiber) {
  if (!fiber) return;

  // Find parent DOM node
  let parentFiber = fiber.parent;
  while (parentFiber && !parentFiber.dom) parentFiber = parentFiber.parent;
  const parentDom = parentFiber?.dom;

  if (fiber.effectTag === "PLACEMENT" && fiber.dom && parentDom) {
    parentDom.appendChild(fiber.dom);
  } else if (fiber.effectTag === "UPDATE" && fiber.dom) {
    updateDomProps(fiber.dom as any, fiber.alternate?.props || {}, fiber.props);
  } else if (fiber.effectTag === "DELETION") {
    commitDeletion(fiber, parentDom!);
    return; // Don't recurse into deleted children
  }

  if (fiber.child) commitWork(fiber.child);
  if (fiber.sibling) commitWork(fiber.sibling);
}

function commitDeletion(fiber: Fiber, parentDom: Node) {
  // Clean up effects on deletion (C8: cleanup on unmount)
  for (const hook of fiber.hooks || []) {
    if (hook.cleanup) hook.cleanup();
  }
  if (fiber.dom) parentDom.removeChild(fiber.dom);
  else if (fiber.child) commitDeletion(fiber.child, parentDom);
}

// === Effect Flushing (C8: After Commit) ===

function flushEffects(fiber: Fiber) {
  for (const hook of fiber.hooks || []) {
    if (hook.pendingEffect) {
      if (hook.pendingEffect.cleanup) hook.pendingEffect.cleanup();
      const cleanup = hook.pendingEffect.setup();
      hook.cleanup = typeof cleanup === "function" ? cleanup : null;
      hook.pendingEffect = null;
    }
  }
  if (fiber.child) flushEffects(fiber.child);
  if (fiber.sibling) flushEffects(fiber.sibling);
}

// === Work Loop ===

function workLoop(deadline?: IdleDeadline) {
  while (nextUnitOfWork) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    // Yield if needed (recommended: interruptible rendering)
    if (deadline && deadline.timeRemaining() < 1) {
      requestIdleCallback(workLoop);
      return;
    }
  }
  // C6: Commit atomically when all render work is done
  if (wipRoot) commitRoot();
}

function scheduleRender() {
  wipRoot = {
    type: currentRoot!.type, props: currentRoot!.props, key: undefined,
    children: currentRoot!.children, hooks: [], hookIndex: 0,
    dom: currentRoot!.dom, child: null, sibling: null, parent: null,
    alternate: currentRoot, effectTag: undefined,
  };
  deletions = [];
  nextUnitOfWork = wipRoot;
  requestIdleCallback(workLoop);
}

// === Public API: render() ===

function render(element: VNode, container: HTMLElement) {
  wipRoot = {
    type: "ROOT", props: {}, key: undefined,
    children: [element], hooks: [], hookIndex: 0,
    dom: container, child: null, sibling: null, parent: null,
    alternate: currentRoot, effectTag: undefined,
  };
  deletions = [];
  nextUnitOfWork = wipRoot;
  requestIdleCallback(workLoop);
}

// === Exports ===

export { h, render, useState, useEffect, useRef, useMemo };
export type { VNode, Props };
