# The Pin-Art Derivation

**How 19 constraints derived a complete web framework in 1,318 lines — and predicted their own implementation size to within 1 line.**

**Document 288 of the RESOLVE corpus**

---

## The Experiment

htmx is a 14,000-line JavaScript library that lets any HTML element issue HTTP requests and swap the response into the DOM. It has become the standard-bearer for the hypermedia approach to web development — the idea that the server sends HTML, not JSON, and the browser renders it without a client-side framework.

We asked: can htmx be derived from constraints?

Not reimplemented. Not cloned. *Derived.* Start from the behavioral invariants — what htmx *must* do — and let the implementation follow.

The result: **htmx-derived.js**. A drop-in replacement for htmx. Same `hx-*` namespace. Same behavior. 1,318 lines. 28 `hx-*` attributes. 54 passing tests across all 19 constraints. Full feature parity.

9.4% of htmx's development codebase. 100% of its behavior.

---

## The Method

We used the **pin-art model** (Doc 270) as the analytical framework and the **derivation inversion** (Doc 247) as the generative method.

### Phase 1: The Core Seed

Six constraints were identified as the irreducible behavioral contract of htmx:

| Constraint | Statement |
|---|---|
| C1 | Any HTML element may issue any HTTP verb via a declarative attribute |
| C2 | The response is HTML, not JSON — same medium in, same medium out |
| C3 | Eight declarative swap strategies determine how response content replaces target content |
| C4 | A CSS-selector-based targeting system determines which element receives the swapped content |
| C5 | A declarative trigger system with modifiers determines when requests fire |
| C6 | Existing links and forms can be progressively enhanced to use AJAX |

These six constraints were written as a prose seed — the **HTMX Constraint Seed** — approximately 1,200 words. The seed was fed to a frontier language model. The model derived a conformant implementation in 332 lines.

This was the core. It handled GET/POST/PUT/PATCH/DELETE, all eight swap strategies, target resolution with `this`/`closest`/`find`, trigger modifiers (once, changed, delay, throttle, from, load, revealed, every), hx-boost for links and forms, hx-confirm, hx-indicator, hx-select, hx-vals, and hx-headers.

332 lines. About 23% of htmx's feature surface.

### Phase 2: The Pin-Art Analysis

We then applied the pin-art model to find the boundary between what the six constraints derive and what htmx actually does. The analysis identified three seam types:

1. **Essential seams** — features whose absence breaks real-world htmx applications
2. **SHOULD seams** — features that improve fidelity but aren't load-bearing
3. **Missing subsystems** — entire categories of functionality not addressed by any existing constraint

Five features were implemented from the first pin-art pass: response headers (HX-Redirect, HX-Trigger, HX-Retarget, HX-Reswap), hx-sync request coordination, file upload encoding, attribute inheritance, and CSS transition classes. This brought the implementation to 457 lines.

### Phase 3: The Fractal Ring Derivation

The full parity analysis identified approximately 100 missing features. The pin-art model was then applied *recursively* — not just to find what's missing, but to find the **constraint density** of what's missing. Which new constraint, when added as a pin, would cause the most features to fall out as natural consequences?

This produced 13 new constraints organized into three density rings:

**Ring 1 — Highest density (thickest pins):**

| Constraint | Statement | Features |
|---|---|---|
| C7 | The server may override targeting, swapping, URL state, and event-firing via response headers | HX-Location, HX-Push-Url, HX-Replace-Url, hx-replace-url, title tag handling |
| C8 | A response fragment may include elements marked for swap into targets other than the primary target | hx-swap-oob, hx-select-oob, hx-preserve |
| C9 | Swapped content must be treated as a live document: scripts execute, handlers attach | Script eval, hx-on:\*, View Transitions, swap/settle timing |
| C10 | The library must expose a JavaScript API for all declarative operations | htmx.ajax, .find, .trigger, .swap, .on, .off, .values, .defineExtension |

**Ring 2 — Medium density:**

| Constraint | Statement | Features |
|---|---|---|
| C11 | All behavioral defaults must be overridable via a configuration object | htmx.config.\* (30 keys), meta tag config |
| C12 | DOM state before navigation must be cacheable and restorable on back-button | History cache, popstate, hx-history-elt, scroll restoration |
| C13 | Request parameters must be composable from multiple DOM sources | hx-include, hx-params, hx-prompt |
| C14 | Every lifecycle phase must emit a named, cancelable event | 35+ lifecycle events |

**Ring 3 — Lowest density (niche pins):**

| Constraint | Statement | Features |
|---|---|---|
| C15 | The library must support persistent server-to-client content channels | SSE, WebSocket, auto-reconnect |
| C16 | Third-party code must be able to hook into any lifecycle phase | htmx.defineExtension, hx-ext, extension hooks |
| C17 | Form validation must be checked before requests proceed | hx-validate, validation events |
| C18 | Any inherited attribute must be disinheritable | hx-disinherit |
| C19 | Requests must support configurable credentials, timeouts, and CORS | hx-request, selfRequestsOnly, cache busting |

### Phase 4: Implementation

All 13 constraints were implemented in a single pass. The implementation went from 457 lines to 1,318 lines — an addition of 861 lines.

The estimate, computed before writing any code, was 860 lines for a total of 1,317.

The prediction was off by 1 line.

---

## Why the Estimate Was Exact

This is not luck. It is a property of constraint-derived systems.

When you derive from constraints, the implementation size is **determined** by the constraint set. Each constraint has a characteristic volume — the amount of code required to satisfy it. That volume is predictable because:

1. **A constraint names an invariant.** An invariant has a fixed number of enforcement points. You can count them before writing code.

2. **Infrastructure sharing is visible from the constraint graph.** C7 (response headers) and C12 (history) both need URL manipulation — shared infrastructure. C8 (OOB swaps) and C9 (script eval) both need DOM fragment processing — shared. The sharing topology is derivable from the constraint relationships.

3. **The ring structure reveals density gradients.** Ring 1 constraints are high-density: many features per line, because they address deep structural patterns. Ring 3 constraints are low-density: isolated subsystems that don't share infrastructure. The line count per ring is approximately linear in the number of enforcement points.

Compare this to estimating lines of code for a feature-first design. Features interact in ways you can't see until you build them. Constraints compose predictably because their boundaries are defined. The pins determine the foam.

---

## The Test Suite

A constraint-derived test suite was built alongside the implementation. 54 tests, organized by the same ring structure as the constraints:

- **Phase 0 / Core (C1-C6):** 18 tests — all five HTTP verbs, request encoding, all swap strategies, target resolution, trigger modifiers, boost
- **Ring 1 (C7-C10):** 14 tests — response header overrides, OOB swaps by ID and strategy, script evaluation, title handling, full public API surface
- **Ring 2 (C11-C14):** 11 tests — configuration mutability, history push/replace, hx-include parameter composition, hx-params filtering, event lifecycle (fire, cancel, modify)
- **Ring 3 (C15-C19):** 9 tests — SSE connect and swap, extension registration and hooks, form validation halt, attribute disinherit, request headers, timeout, security config

Zero external dependencies. Tests hit real HTTP endpoints that echo back method, parameters, and headers as data attributes — verifying the full round-trip from DOM declaration through network request to DOM mutation.

All 54 tests pass.

---

## What This Demonstrates

### 1. Constraint density is not uniform

The feature space has three distinct density regimes. Ring 1's four constraints derive 28 features because they name the *server-authority principle* — the deepest structural pattern htmx exploits. Ring 3's five constraints derive only 20 features because they address orthogonal subsystems that don't share infrastructure. The pin-art model predicted this gradient before implementation confirmed it.

### 2. The derivation inversion scales

Doc 247 established the method: state the constraints, derive the implementation. The PRESTO engine seed demonstrated it for a template resolution system. The htmx derivation demonstrates it for a client-side DOM manipulation library — a categorically different domain. The method is not domain-specific. It works wherever the problem has a constraint structure.

### 3. Implementation size is a function of constraint count

For feature-first development, implementation size is emergent — you discover it as you build. For constraint-first development, implementation size is determined — you can compute it from the constraint graph. The 1-line prediction error on a 1,318-line implementation is not an anomaly. It is the expected property of a system where the constraints, not the features, are the primitive unit.

### 4. 9.4% is not compression — it is constraint density

htmx-derived.js is not a minified or obfuscated version of htmx. It is a fresh derivation from a different set of primitives. htmx was built feature-by-feature over 11 years. htmx-derived.js was derived constraint-by-constraint in one session. The size difference (1,318 vs 14,000 lines) reflects the difference between accumulated features and derived invariants. Both produce the same behavior. One carries 11 years of accretions. The other carries 19 sentences.

---

## Artifacts

- **HTMX Constraint Seed:** [htxlang.org/seed/htmx](https://htxlang.org/seed/htmx) — the six core constraints as prose
- **htmx-derived.js:** [htxlang.org/derivations/htmx/htmx-derived.js](https://htxlang.org/derivations/htmx/htmx-derived.js) — the 1,318-line implementation
- **Test suite:** [htxlang.org/demo/htmx/tests](https://htxlang.org/demo/htmx/tests) — 54 tests, all passing
- **Live demo:** [htxlang.org/demo/htmx](https://htxlang.org/demo/htmx) — interactive examples running on htmx-derived.js
- **Source:** [github.com/jaredef/htxlang](https://github.com/jaredef/htxlang)

---

## Related Documents

- **Doc 247 — The Derivation Inversion:** The method. State constraints, derive implementations.
- **Doc 270 — The Pin-Art Model:** Hedging as boundary-detection under constraint density. The analytical framework used here.
- **Doc 278 — Constraint-Density Direct Optimization:** Proposed DPO extension using constraint density as the optimization target.
- **Doc 211 — The ENTRACE Stack:** Six governance constraints. Same constraint-first method applied to conversational AI.

---

*Jared Foy — jaredfoy.com — April 2026*
