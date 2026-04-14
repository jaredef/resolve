<!-- chronological_ordinal: 5 -->
# The Inverted Layer Model: Constraints as Depth, Properties as Surface

**Companion document to: An Architectural Style for Progressive Representational State Transfer with On-Demand Code**
**Jared Foy, April 2026**

## A Revision to the PRESTO Progressive Code-on-Demand Spectrum

---

## 1. The Error in the Original Presentation

The PRESTO paper presents its layer model as an ascending ladder:

> Layer 0 (no JavaScript) → Layer 1 (htmx) → Layer 2 (scoped scripts) → Layer 3 (pushed code) → Layer 4 (authenticated islands) → Layer 5 (full SPA) → Layer 6 (WASM compute)

The implicit message is that Layer 0 is the simplest and least capable, Layer 6 is the most powerful, and the developer climbs upward as their application demands more. This framing is wrong. It describes the layers by what they *send to the client* — an implementation-centric view that mistakes the delivery mechanism for the architectural property.

The correct framing inverts the model entirely.

---

## 2. The Inversion

Every architectural style induces properties through constraints. REST induces cacheability through the cache constraint. It induces scalability through statelessness. It induces simplicity and visibility through the uniform interface. The more constraints that hold, the more properties are induced. Remove a constraint and you lose the properties it provided.

The PRESTO layers are not steps upward in capability. They are steps downward in constraint — each layer accepting an additional restriction on the representation in order to induce a specific narrow property that the unconstrained representation cannot provide.

| Depth | Constraint Accepted | Property Induced | Properties Traded |
|-------|-------------------|-----------------|-------------------|
| Layer 0 | None beyond REST | Full cacheability, universal accessibility, server authority, intermediary transparency, search indexability, complete representations, graceful degradation, statelessness | None |
| Layer 1 | Declarative client-side attribute interpretation (htmx) | Partial page updates without full navigation | Marginal visibility reduction; dependency on a client library |
| Layer 2 | Scoped imperative code execution on the client | Client-side behavior that HTML alone cannot express | Reduced visibility; client behavior is no longer fully determined by the representation |
| Layer 3 | Server-pushed executable code over a persistent connection | Dynamic, server-authoritative code delivery; per-user capability differentiation | Statelessness partially traded (WebSocket is persistent); client execution environment is no longer fully predictable |
| Layer 4 | A second HTTP connection for module-scoped data access | REST-style data access from pushed code; standard HTTP debugging and caching of data requests | Additional connection overhead; client now fetches data independently of template rendering |
| Layer 5 | Client assumes rendering and routing authority within its boundary | Preserved client state across navigations; smaller per-navigation payloads; application-like interaction | Server authority over rendering is delegated within the boundary; SEO requires the Layer 0 shell; the client is responsible for its own state |
| Layer 6 | Binary computation modules executed in the client sandbox | Near-native computation speed; capabilities that JavaScript cannot efficiently provide | WASM compilation required; significant client-side computation; maximum distance from the REST baseline |

Reading this table from top to bottom: each row adds a constraint, gains a specific property, and trades away properties that were free at the layer above.

Reading from bottom to top: each row *removes* a constraint, loses a specific narrow capability, and *recovers* properties that the deeper layer suppressed.

---

## 3. Layer 0 Is the Surface

Layer 0 is not the starting point for beginners. It is the architectural surface — the position of maximum induced properties. A representation at Layer 0 has:

- **Full cacheability.** Any HTTP intermediary can cache the response without coordination. No cache invalidation strategy is required because the representation is self-contained.
- **Universal accessibility.** Any device that renders HTML can consume the representation. No JavaScript runtime is required. No WebSocket support is required. No WASM support is required.
- **Complete server authority.** The server controls everything the client sees. There is no client-side code to audit, no client-side state to manage, no client-side routing to coordinate.
- **Intermediary transparency.** Proxies, CDNs, load balancers, and firewalls can operate on the response without knowledge of the application. The representation is standard HTTP carrying standard HTML.
- **Search indexability.** The content is in the HTML. No JavaScript execution is required to discover it.
- **Graceful degradation.** There is nothing to degrade from because there is nothing beyond the HTML. The representation is the application.
- **Statelessness.** Each request is independent. No session, no persistent connection, no server-side process per client.
- **Complete representation.** The response contains everything needed to render the page. No subsequent requests are required.

These properties are not features that someone added. They are induced by the constraints of REST operating without additional restriction. They are free. They are the default. They are what you get when you do not constrain the representation further.

Every layer below Layer 0 trades some of these properties for a specific capability. The trade may be necessary — some features genuinely require client-side computation, persistent connections, or autonomous rendering. But the trade is always a trade. It is never free. And the developer's responsibility is to make that trade consciously, accepting only the constraints that the feature demands.

---

## 4. Depth, Not Height

The correct metaphor is depth, not height. The developer does not climb upward toward capability. The developer dives downward into constraint when a specific problem requires a property that the surface cannot induce.

**Layer 0 is the surface.** Open water. Maximum properties. The representation is complete, cacheable, universally accessible, and fully under server authority. Most features live here. More features than developers currently believe can live here.

**Layer 1 is shallow water.** The developer accepts a single additional constraint — a client-side library interprets declarative attributes — and gains partial page updates. The surface properties are almost entirely preserved. The cost is minimal.

**Layer 2 is moderate depth.** Scoped scripts execute after the document is assembled. The developer gains behavior that HTML cannot express. Visibility is reduced — the client's behavior is no longer fully determined by examining the HTML alone. But the scripts enhance a complete document; they do not construct one. The surface properties of completeness and server authority are preserved.

**Layer 3 is significant depth.** A persistent WebSocket connection exists. The server pushes executable code. The developer gains dynamic, per-user capability delivery. But statelessness is partially surrendered. The connection is persistent. The client's execution environment is shaped by what the server pushed, which is not visible in the initial representation.

**Layer 4 is deep water.** The pushed code opens its own data channel. The developer gains REST-style data access from within the client-side capability. But the client now fetches data independently — approaching (though not reaching) the thick-client model. The server still controls access via scoped tokens, but the interaction pattern is more complex.

**Layer 5 is the deep.** The client assumes rendering and routing authority within its boundary. The developer gains application-like interaction — preserved state, instant navigation, autonomous rendering. But within that boundary, the REST properties are suspended. The server's authority is delegated. The representation that initiated the dive is above; down here, the client is in control of its own space.

**Layer 6 is the floor.** Binary computation modules execute in the client sandbox. The developer gains native-speed computation. But the distance from the surface is maximum. Compilation is required. The client performs significant work. The properties of the surface — cacheability, simplicity, universality — are maximally traded.

The developer dives only as deep as the problem requires. And the moment the problem is solved, the developer surfaces.

---

## 5. The Escape Hatch Goes Up

In the original paper, escape hatches are presented as mechanisms for going deeper — ways to extend the architecture's capability when the current layer is insufficient. This framing is inverted.

The escape hatch goes up. Toward the surface. Toward more properties.

A developer working at Layer 5 (full SPA) who realizes that a particular view doesn't need client routing escapes upward to Layer 2. In doing so, they recover:

- Server authority over rendering (the server produces the complete HTML)
- Cacheability (the response can be cached by intermediaries)
- Search indexability (the content is in the HTML)
- Statelessness (no persistent connection is required for this view)

The developer didn't lose anything they needed. They gained properties that were suppressed by a constraint they didn't require for this particular feature.

A developer working at Layer 3 (pushed code over WebSocket) who realizes that a particular interaction can be expressed with htmx attributes escapes upward to Layer 1. The WebSocket connection is unnecessary for this interaction. The persistent channel is unnecessary. The developer surfaces, and the properties of the surface return.

This is the per-page architectural selection that PRESTO enables, but reframed correctly. It is not "choose the right layer for the feature." It is "surface as high as the feature allows." The default is the surface. Depth is the exception. Every constraint accepted must earn its place by inducing a property the feature cannot exist without.

---

## 6. The React Developer's Position

A developer working in the React ecosystem is at depth. They are at approximately Layer 5 — the client has assumed rendering authority, routing authority, and state management responsibility. The REST properties of the surface are almost entirely suppressed.

From this depth, the React ecosystem builds compensation mechanisms that attempt to recover the properties of higher layers:

- **SSR** is an attempt to surface toward Layer 0's complete representations — sending finished HTML before the client assumes control. But the surfacing is temporary; hydration pulls the developer back to depth.
- **ISR** is an attempt to surface toward Layer 0's cacheability — serving pre-rendered responses from a cache. But the cache is managed by framework-specific logic rather than HTTP's native semantics.
- **React Server Components** are an attempt to surface toward Layer 0's server-authoritative data resolution — allowing components to access server resources directly. But the surfacing is partial; the client/server boundary introduces serialization constraints.
- **Streaming SSR** is an attempt to surface toward Layer 0's progressive rendering — sending content as it resolves. But the surfacing requires Suspense boundaries and fallback UI, mechanisms that exist only because the client will eventually assume control.

Each compensation is a yearning for the surface. Each one partially succeeds — recovering one property while remaining at depth for everything else. The effort is enormous. The results are partial. And the underlying reason is structural: you cannot fully recover the properties of a less-constrained layer while remaining at a more-constrained layer. The properties are induced by the absence of constraint, and the constraints are still present.

PRESTO offers the React developer something different: actual escape hatches to the surface. Not compensations that simulate surface properties from depth, but architectural transitions that remove constraints entirely for the features that don't require them.

A React application under PRESTO doesn't need SSR for its content pages — those pages operate at Layer 0, where complete representations are the default. It doesn't need ISR for its cacheable routes — those routes return standard HTTP responses with standard Cache-Control headers. It doesn't need server components for its data-driven pages — those pages declare data requirements in the template and the engine resolves them.

The React runtime is used only for the features that genuinely require Layer 5's properties: preserved client state across interactions, autonomous rendering, application-like navigation. Those features exist in a bounded region of a Layer 0 representation. The rest of the application lives at the surface, where the properties are free.

---

## 7. The Developer's Discipline

The inverted model implies a discipline: **surface by default, dive by necessity.**

For each feature, the developer asks:

1. **Can this be expressed as HTML?** If yes, Layer 0. No JavaScript, no client-side code, no persistent connections. Maximum properties. Stop here.
2. **Does this need partial updates without full navigation?** If yes, Layer 1. Add htmx attributes. The cost is a 14KB library. The properties of the surface are almost fully preserved. Stop here.
3. **Does this need behavior that declarative attributes cannot express?** If yes, Layer 2. Add an `htx:script` block. The script enhances a complete document. The cost is reduced visibility. Stop here.
4. **Does this need server-pushed, per-user code?** If yes, Layer 3. Accept the WebSocket connection. The cost is partial statelessness. Stop here.
5. **Does this need its own data channel?** If yes, Layer 4. Accept the second connection and the token-scoped access pattern. The cost is additional connection overhead and independent data fetching. Stop here.
6. **Does this need client-controlled rendering and routing?** If yes, Layer 5. Accept the delegation of rendering authority within a bounded region. The cost is significant: server authority, cacheability, and accessibility are suspended within that region. Stop here.
7. **Does this need native-speed computation?** If yes, Layer 6. Accept WASM compilation and binary delivery. The cost is maximum distance from the surface. This is the deepest dive the architecture supports.

At each step, the developer stops at the shallowest depth that satisfies the requirement. There is no reason to dive deeper than necessary. Every unnecessary constraint suppresses properties that the feature could have benefited from.

The question is never "what layer do I need?" The question is "what is the shallowest depth at which this feature can exist?"

---

## 8. The Relationship to Encapsulation

The inverted model completes the encapsulation argument from section 4.9 of the paper.

When a developer places a Layer 5 capability (a React application, a full SPA) inside a Layer 0 representation (a complete HTML document), they are creating a bounded region of depth within a surface-level response. The Layer 0 properties hold at the HTTP boundary — the response is cacheable, complete, universally accessible, and server-authoritative. Within the bounded region, the Layer 5 properties hold — the client controls rendering, manages state, and handles navigation.

The encapsulation is not a workaround. It is the natural expression of the inverted model. The surface is the default. Depth exists only within bounded regions where specific features demand it. The developer surfaces everywhere they can and dives only in the specific DOM sub-tree where the deep capability is required.

This is why nesting direction matters. The surface must be the outer layer. If depth is the outer layer — as in a conventional React application where the entire page operates at Layer 5 — then the surface properties are globally suppressed. No amount of compensation can fully recover them because the constraints that suppress them are globally applied. The only way to recover surface properties is to make the surface the outer architecture and confine depth to bounded inner regions.

---

## 9. Revised Layer Terminology

The numerical layer model (0-6) may be retained for reference, but the developer's mental model should use the depth metaphor:

| Depth | Name | Core Question |
|-------|------|--------------|
| Layer 0 | **Surface** | Can this be HTML? |
| Layer 1 | **Shallows** | Does this need partial updates? |
| Layer 2 | **Wading depth** | Does this need scripted behavior? |
| Layer 3 | **Open water** | Does this need pushed code? |
| Layer 4 | **Mid-depth** | Does this need its own data channel? |
| Layer 5 | **The deep** | Does this need client-controlled rendering? |
| Layer 6 | **The floor** | Does this need native computation? |

The names are suggestive, not prescriptive. What matters is the orientation: the surface is the goal. Depth is the cost. The developer surfaces as soon as the feature allows.

---

## 10. Implications for the Paper

The PRESTO paper should be revised to reflect this inversion. The key changes:

**The layer model should be presented as a constraint depth spectrum, not a capability ladder.** Layer 0 is the most property-rich position, not the least capable. Each subsequent layer trades properties for a specific induced capability.

**The "progressive" in Progressive Code-on-Demand should be reframed.** The progression is not from simple to complex. It is from unconstrained to constrained, from property-rich to capability-specific. The developer progresses into constraint only as far as the problem demands.

**The comparison with React should be reframed.** React is not at a "higher layer" — it is at greater depth. The React ecosystem's compensation stack is a series of attempts to surface from depth. PRESTO provides actual escape hatches to the surface rather than simulated surface properties from depth.

**The escape hatch model should be inverted.** Escape hatches go up, not down. The developer escapes from constraint toward properties, from depth toward the surface. The REST representation is not the baseline from which you escape into capability — it is the destination to which you escape from unnecessary constraint.

**Section 4.8 (Granted Capability, Not Transferred Control) should be augmented.** The granted capability model is correct, but the grant should be understood as a grant of *constraint acceptance* — the server grants the client permission to operate at a specific depth within a bounded region of the representation. The client accepts the constraints of that depth and gains the properties they induce. The server controls how deep the client may dive.

**The bilateral affordance declaration should be reconnected.** The template author declares both server affordances and client affordances. The inverted model clarifies the relationship: server affordances resolve at the surface (data, composition, layout). Client affordances declare depth (scripts, WebSocket tokens, channel credentials). The template is a contract that specifies where the surface is and where bounded depth is permitted.

---

## 11. The Principle

The deepest insight of the inverted model is a principle that applies beyond web architecture:

**The most powerful position is the least constrained one. Constraints are accepted to induce specific properties, and every constraint accepted suppresses properties that were free without it. The discipline of architecture is to accept only the constraints that the problem requires and to escape them the moment they are no longer necessary.**

Layer 0 is powerful not because of what it does, but because of what it does not constrain. The REST representation, complete and unconstrained beyond the base REST constraints, induces more useful properties than any further-constrained layer. Each layer below it trades breadth for specificity — gaining a precise capability at the cost of architectural generality.

The developer's highest aspiration is the surface. Depth is not achievement. It is cost. The architecture that enables the developer to remain at the surface for the majority of their application, diving only into bounded regions of necessary depth, is the architecture that preserves the most properties across the most features for the most users.

This is what PRESTO provides. Not a ladder to climb, but a surface to inhabit — with the knowledge that when depth is necessary, the dive is bounded, the constraints are explicit, and the return to the surface is always available.
