# On the Arbitrariness of Nested Architectures

**Jared Foy**
**April 2026**

*An open inquiry into the contingency of architectural constraints, the nature of layered design spaces, and the possibility of parallel and recursive nesting within RESTful systems.*

---

## 1. The Question

The PRESTO style identifies seven progressive layers of code-on-demand, each representing a deeper degree of client capability. The layers were discovered empirically — observed in the wild, catalogued, and ordered by the properties they trade. But the question arises: are these layers fundamental, or are they contingent?

If they are fundamental — if they represent the only possible categories of nesting within REST — then PRESTO has discovered something about the structure of web architecture itself. If they are contingent — if they reflect the current landscape of transport protocols, execution environments, and interface technologies — then they are observations, not constraints. And the design space may be larger than seven layers.

This document argues that the layers are contingent, examines what that contingency implies, and opens several lines of inquiry that follow from it.

---

## 2. What the Layers Actually Are

Layer 0 is not "HTML." Layer 0 is the condition of maximum REST properties — the state where the server has resolved everything, the client receives a complete representation, and no code-on-demand has been requested. HTML happens to be the medium. But any complete, self-describing representation format would induce the same properties at this layer.

Layer 1 is not "htmx." Layer 1 is declarative enhancement — the condition where the client's interaction model is extended by attributes in the representation, without imperative code. htmx is one implementation. HTML's built-in form and link mechanisms are another. A future standard could provide richer declarative enhancement without any library. The capability is "extended interaction without imperative code." The technology is contingent.

Layer 2 is not "IIFEs." Layer 2 is scoped client behavior — the condition where the server authors imperative code that executes after the complete DOM exists. `htx:script` is one mechanism. A future `<script type="module" scoped>` standard could be another. The capability is "server-authored, document-aware client code." The mechanism is contingent.

Layer 3 is not "WebSocket." Layer 3 is server-initiated code delivery — the condition where the server pushes executable code to the client over a persistent connection. WebSocket is one transport. HTTP/2 server push, Server-Sent Events with script payloads, or WebTransport could serve the same function. The capability is "the server sends code the client didn't ask for." The transport is contingent.

Layer 4 is not "authenticated islands." Layer 4 is scoped data channels — the condition where pushed code opens bidirectional communication with the server, authenticated by tokens embedded in the representation. The island metaphor, the token format, and the channel protocol are all contingent. The capability is "authenticated bidirectional data flow within a bounded region of the representation."

Layer 5 is not "SPA." Layer 5 is client-assumed navigation authority — the condition where the client takes over routing and rendering within bounded regions. React Router, client-side hash routing, or History API manipulation are all contingent implementations. The capability is "the client decides what to show without asking the server."

Layer 6 is not "WASM." Layer 6 is native compute — the condition where the client executes code at native speed within a sandboxed environment. WebAssembly is the current mechanism. A future standard (native modules, embedded VMs, hardware-accelerated compute APIs) could provide the same capability. The capability is "near-metal execution in the client." The technology is contingent.

In every case, the layer is defined by the **capability** it adds and the **properties** it trades — not by the technology that currently implements it.

---

## 3. The Layers as Interface Categories

If the layers are not defined by technology, what are they defined by?

They appear to be defined by the **type of interface** between server and client at each level. Each layer represents a different kind of agreement about what the server provides and what the client does with it:

| Layer | Interface Agreement |
|-------|-------------------|
| 0 | Server provides complete representation. Client renders. |
| 1 | Server provides interaction hints. Client follows declaratively. |
| 2 | Server provides scoped code. Client executes in document context. |
| 3 | Server initiates delivery. Client receives and executes. |
| 4 | Server and client negotiate bidirectional data flow. |
| 5 | Client assumes rendering authority. Server becomes data source. |
| 6 | Client assumes compute authority. Server becomes delivery mechanism. |

These are categories of interface agreement — each one a different answer to the question "who decides what, and how do they communicate?" They may be related to Fielding's uniform interface constraint — each layer represents a different degree of deviation from the uniform interface. At Layer 0, the uniform interface is fully operative. At Layer 6, the interface between server and client has been specialized to the point where REST's uniform interface properties no longer hold within the bounded region.

This suggests the layers are not arbitrary — they are ordered by the degree to which the uniform interface is relaxed. But the specific mechanisms at each layer remain contingent.

---

## 4. PRESTO as One of Many Possible Nestings

REST defines constraints at the transfer level. PRESTO defines constraints at the construction level. The two compose. But nothing in REST requires PRESTO specifically. REST is silent on construction. Any set of construction-level constraints that does not violate REST's transfer-level constraints would compose equally well.

This means PRESTO is one of potentially many construction-level architectures that could nest within REST. The constraints Jared Foy identified — bilateral boundary, namespace separation, server-consumed directives, progressive code-on-demand, server-embedded authentication and authorization — were discovered by intuition and validated by implementation. They work. They induce the properties described in the dissertation. But they are not deducible from REST. They are a creative act — a choice of constraints that happened to produce a coherent style.

Someone else could identify a different set of construction-level constraints:
- A unilateral construction model (no bilateral boundary) that uses a separate configuration language for server directives
- A shared-namespace model where server and client directives coexist in the same namespace, disambiguated by execution context
- A capability-first model where the construction pipeline is organized by capability grants rather than by directive stages

Each of these would produce a different style with different induced properties, different tradeoffs, and a different developer mental model. Each would nest within REST. None would be more or less "correct" than PRESTO — only more or less useful for specific purposes.

The nested constraints framework predicts this: any coherent set of constraints nested within a governing style induces emergent properties. PRESTO is an instance. The framework permits infinitely many instances.

---

## 5. Recursive and Parallel Nesting

PRESTO has demonstrated that a Distributed Objects architecture (React) can be enclosed within a PRESTO representation. The enclosure is clean — REST at the transfer level, PRESTO at the construction level, DO within bounded regions of the resolved representation. Three levels. No violations.

But this nesting need not stop at three levels. Within a DO region (a React island), further nesting is possible:
- A WebGL context running a physics simulation (native compute within a DO component within a PRESTO representation within a RESTful transfer)
- A collaborative editing protocol (bidirectional data flow within a DO component within a PRESTO representation)
- A local-first database sync (eventual consistency within a DO state model within a PRESTO layout)

Each additional nesting adds constraints and trades properties. The question is whether there is a principled limit to the depth of nesting, or whether it is bounded only by the coherence requirement — that each nested layer must not violate the constraints of the layer that encloses it.

Parallel nesting has also been demonstrated. A single PRESTO representation can contain:
- A React island and a Svelte island (two DO implementations, parallel)
- A WebGL canvas and a collaborative editor (native compute and bidirectional data, parallel)
- A static server-rendered region and an SPA region (Layer 0 and Layer 5, parallel, on the same page)

The parallelism works because each nested region is bounded — scoped to a specific area of the DOM, with its own lifecycle, its own state, and its own degree of property trade. The enclosing PRESTO representation manages the boundaries. REST manages the transfer.

This suggests that architectural nesting is both recursive (depth) and parallel (breadth), bounded only by coherence. Identifying the full space of possible nestings — which architectures can nest within which, at what depth, in what parallel combinations — is an open research question.

---

## 6. The Developer's Mental Model Revisited

The original layer model was presented as a spectrum from simple (Layer 0) to complex (Layer 6). This framing is misleading.

Layer 0 is not simple. Layer 0 is **maximally dynamic**. At Layer 0, the server resolves data, evaluates conditionals, processes authentication, issues credentials, iterates collections, includes components, wraps layouts — all within a single request. The resolved representation is complete, personalized, and current. The developer has access to the full power of the server — databases, APIs, computation, business logic — all converged through the declarative directive surface.

The industry's perception is inverted. Developers associate "dynamic" with "client-side JavaScript." They see Layer 0 as static and Layer 5 as dynamic. But the dynamism at Layer 0 is server-side dynamism — resolution-time computation that produces a bespoke representation for each request. The dynamism at Layer 5 is client-side dynamism — runtime computation that produces UI updates without server consultation.

These are different kinds of dynamism, not different amounts. Layer 0 is dynamic at resolution time. Layer 5 is dynamic at interaction time. Choosing Layer 5 does not add dynamism — it trades resolution-time dynamism (where the server has full context) for interaction-time dynamism (where the client has partial context and must compensate).

The developer's choice is not "how much complexity do I want to add?" It is "where do I want the dynamism to happen, and what properties am I willing to trade for that choice?" This is a question about the mental model — about which interpreter should be responsible for which decisions. It deserves framing in terms of cognitive load, not technical complexity:

- **At Layer 0**, the developer holds one mental model: the server resolves, the client renders. All state is server-authoritative. All decisions are server-side.
- **At Layer 2**, the developer holds two models: the server resolves the document, and scoped scripts modify the document after rendering. State is split but bounded.
- **At Layer 5**, the developer holds a complete client-side application model: routing, state management, effect lifecycle, server synchronization. The cognitive load is not proportional to the capability gained — it is proportional to the number of concerns that must be held simultaneously.

The reason developers default to Layer 5 is not that it provides more capability. It is that the industry has not provided a construction-level architecture at Layer 0 that is comprehensive enough to make Layer 0 productive. Developers descend because they believe the surface is barren. PRESTO demonstrates that the surface is the most fertile layer — if the construction-level constraints are in place.

---

## 7. Open Questions

### 7.1 Are the layer categories exhaustive?

The seven layers map to seven kinds of interface agreement. Could there be an eighth — a kind of server-client interface that does not reduce to any of the seven? For example: peer-to-peer data exchange between clients, mediated by the server but not initiated by it. Or: client-to-client code delivery, where one user's browser pushes a topology to another user's browser through a server relay.

### 7.2 Can the layers be formally derived from REST?

If the layers are ordered by the degree to which the uniform interface is relaxed, then they may be deducible from REST's constraints — each layer representing the removal or relaxation of a specific property. This would make the layers non-arbitrary. It would also predict whether there are exactly seven, or more, or fewer.

### 7.3 What is the space of construction-level architectures?

PRESTO is one set of construction-level constraints that nests within REST. How many such sets exist? Is the space finite or infinite? Are some constraint-sets strictly better than others (inducing more properties with fewer constraints), or is the space Pareto-optimal — every set trading different properties?

### 7.4 What is the maximum nesting depth?

Recursive nesting has been demonstrated to three levels (REST > PRESTO > DO). Is there a principled limit? Does each additional level of nesting degrade properties monotonically, or can clever constraint choices at deeper levels recover properties lost at shallower levels?

### 7.5 What formal framework describes architectural nesting?

Set theory, category theory, and lattice theory all offer potential frameworks for describing nested constraint systems. The nested constraints paper proposed an informal axiom. A formal treatment might reveal structural relationships — equivalences between nestings, minimal constraint sets, optimal compositions — that intuition alone cannot identify.
