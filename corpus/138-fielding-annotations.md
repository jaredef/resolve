<!-- chronological_ordinal: 2 -->
# Annotations on Fielding's REST Dissertation

**Companion document to: An Architectural Style for Progressive Representational State Transfer with On-Demand Code**
**Jared Foy, April 2026**

This document collects observations made while reading Fielding's dissertation alongside the development of the PRESTO architectural style and the htxlang specification. Each entry pairs a passage or concept from the dissertation with an observation about how it relates to, is extended by, or is left unaddressed by the work presented in the white paper.

---

## 1. Constraints and Induced Properties

**Fielding (Chapter 5):**
> "REST consists of a set of architectural constraints chosen for the properties they induce on candidate architectures."

**Observation:**

The key phrase is "candidate architectures." REST is not an architecture. It is an architectural style — a set of constraints that defines a design space. Within that design space, specific architectures can be instantiated. Each candidate architecture that satisfies the constraints inherits the properties those constraints induce: scalability, visibility, reliability, independent evolution.

htxlang is a candidate architecture within this design space. It does not introduce new constraints. It instantiates a specific set of design decisions — a 22-stage resolution pipeline, 16 directives, a bilateral source representation, a grant-based capability system, a two-phase mutation protocol — all of which operate within the constraints REST defines. The properties htxlang exhibits (server authority, progressive capability, compositional independence) are not invented by the specification. They are induced by the constraints. The specification is the means by which the developer accesses those properties.

This is the relationship between the picnic table and the chess game. The table (REST's constraints) induces properties on the activities that can occur at it (flat surface, stability, two-sided seating). Chess (htxlang) is an activity that takes advantage of those properties. The game is not a property of the table. But the game would not be possible without the properties the table induces.

---

## 2. The Authorial Mental Model (Novel Observation)

**Fielding's perspective:**

Fielding's dissertation is written from the perspective of the software architect evaluating network-based systems. The mental model is evaluative and comparative: given a set of constraints, what properties emerge? Given two architectural styles, which induces properties better suited to the target application? The reader of the dissertation is the architect who selects constraints.

**What Fielding did not address:**

The dissertation does not provide a mental model for the developer who works *within* the constraints. It describes the design space but not the experience of designing within it. It describes the properties that constraints induce on architectures but not the cognitive experience of the author who writes representations that inhabit those architectures.

**The bilateral authorial model:**

In PRESTO, the developer writes a source representation that simultaneously addresses two interpreters:

1. **The engine** — which reads the htx: namespace, resolves directives, queries data, evaluates expressions, and produces a complete HTML document
2. **The user agent** — which reads the HTML, executes scripts, renders the document, and provides the interactive surface to the user

The developer must hold both audiences in mind simultaneously. The htx: directives are instructions to the first interpreter. The HTML, scripts, and attributes are instructions to the second. The first interpreter will consume its own instructions entirely — erasing every trace of htx: from the output — before the second interpreter ever sees the document.

This is the bilateral boundary. The developer writes on both sides of it. The resolution pipeline is the mechanism that collapses the bilateral form into a unilateral form. The developer's mental model must account for this collapse: they must understand what will survive resolution and what will be consumed by it.

No prior work has formalized this authorial perspective. Fielding formalized the architectural perspective (constraint selection and property induction). Framework documentation describes API surfaces (what functions to call, what props to pass). Template language documentation describes syntax (how to write loops and conditionals). But the mental model of bilateral authorship — "I am writing a document that addresses two interpreters simultaneously, and one interpreter will erase its own instructions before the other interpreter sees the document" — appears to be novel.

**Implications:**

If this observation is correct, it suggests that the contribution of PRESTO is not only architectural (formalizing progressive code-on-demand) but also cognitive: it provides a coherent mental model for what it means to author within REST's constraints. The developer is not writing code that runs on a server. The developer is not writing code that runs on a client. The developer is writing a representation that will be resolved by the server and then interpreted by the client, and the authorial act spans both phases simultaneously.

This may explain why REST-based development has historically felt incoherent to application developers. The constraints exist. The properties are induced. But without a mental model for the authorial experience — without a way to think about bilateral authorship — the developer has no framework for understanding what they are doing when they write a template. They fall back to the mental models of the frameworks they know: "I am writing a React component" or "I am writing a Rails view." These models are implementation-specific. The bilateral model is architectural.

---

## 3. Temporal Latency, Concerted Contribution, and Recursive Potentiality

**Fielding (Chapter 5, on code-on-demand):**

Fielding designates code-on-demand as an optional constraint. He notes that it reduces visibility — the server cannot know what the client will do with delivered code. He treats this as a cost. He does not examine the temporal dimension of that cost, or the authorial consequences of it.

**Observation: Time as an induced dimension**

When the server embeds resolved values into client code — a signed token inside an htx:script block, a channel URL in an attribute binding, an action token in a hidden form field — it authors an instruction that does not execute at authoring time. The instruction is latent. It exists in the resolved representation as potential energy. The client may activate it immediately, seconds later, minutes later, or never. The author cannot determine when.

Time is not a parameter the author controls. It is a dimension the author must reason about. The signed token will expire. The DOM may have changed. The user may have navigated away. The channel may have closed. All of these temporal contingencies are present at authoring time as possibilities the author must comprehend, even though none of them have occurred yet.

This is an induced property of the constraints. Statelessness means the server retains no memory of the representation it sent. Code-on-demand means the client receives executable instructions. The combination induces temporal latency: a gap between the moment the server authors the instruction and the moment the client executes it. The server cannot observe the execution. The client cannot query the authoring context. The representation is the only bridge, and it was frozen at resolution time.

**Observation: The resolved representation as concerted performance**

The source representation is not authored by a single agent. It is the product of a concert of server-side affordances, each authorized to contribute:

- The **template** contributes structure and directives
- The **data adapter** contributes content from persistent storage
- The **context providers** contribute ambient state (authentication, configuration, request metadata)
- The **grant system** contributes signed capabilities (WebSocket tokens, channel tokens, signed URLs)
- The **mutation system** contributes action tokens (two-phase prepare/execute authorization)
- The **module middleware** contributes request/response transformations
- The **layout system** contributes page-level structural wrapping

Each of these affordances writes into the data context or transforms the template content. The resolution pipeline orchestrates their contributions in a defined order (the 22 stages). The resolved representation is the product of all of their contributions, collapsed into a single HTML document.

The authorial mental model must account for all contributing voices. The question is not "what did I write in the template" but "what did every authorized server affordance contribute to the document the client will receive, and what will the client do with all of those contributions at some future moment."

This is the source representation as musical score. The template is the composition. The server affordances are the instruments. The resolution pipeline is the conductor. The resolved representation is the performance. And the client is the audience that experiences the performance after an unbounded delay.

**Observation: Recursive potentiality**

The resolved representation does not merely carry instructions for the client to execute. It carries the potential for the client to mediate further representations. This is the recursive structure:

1. The server resolves a source representation into a resolved representation
2. The resolved representation grants the client a capability (e.g., a WebSocket token)
3. The client activates the capability (opens the WebSocket)
4. The server delivers code through the channel
5. The delivered code executes and navigates to a new URL
6. The navigation requests a new representation from the server
7. The server resolves a new source representation (return to step 1)

Each resolved representation is both an endpoint (a document the client renders) and a starting point (a set of granted capabilities that enable the next representation in the chain). The progressive layers are degrees of how far into this recursive chain the author can reach from a single source representation:

- **Layer 0** — The representation is terminal. No client-side code. No further representations mediated.
- **Layer 1** — The representation can enhance itself (htmx swaps content from the server)
- **Layer 2** — The representation carries scoped scripts that may modify the document
- **Layer 3** — The representation grants a channel for the server to deliver additional code
- **Layer 4** — The delivered code can open authenticated HTTP connections, mediating further representations
- **Layer 5** — The client manages its own navigation, autonomously requesting new representations
- **Layer 6** — The client executes native-speed computation, potentially generating local representations

Each layer extends the recursive depth. The author of a Layer 0 page reasons about one representation. The author of a Layer 5 page reasons about an unbounded chain of representations, each mediated by the client's granted capabilities, each resolving a new set of server contributions, each carrying new latent potential.

**The mental model constraint:**

The authorial mental model must be simple and pure enough in its abstractions to circumscribe all of these potentialities. If the model is too complex, the author cannot navigate the lifecycle. If it is too narrow, the author cannot reason about temporal latency, concerted contribution, or recursive potentiality.

The bilateral boundary serves this purpose. It is a single, irreducible abstraction: everything in the htx: namespace is consumed at resolution; everything outside it survives to the client. From this single distinction, the author can derive all three dimensions:

- **Temporal latency** — What survives resolution may execute at any future time. The author reasons about the gap by understanding what the engine consumed (server instructions) and what it left behind (client instructions with resolved values frozen into them).
- **Concerted contribution** — Every server affordance writes into the htx: namespace or the data context. The author traces contributions by understanding which pipeline stages produced which parts of the resolved output.
- **Recursive potentiality** — Granted capabilities (tokens, URLs, channel connections) survive resolution as client-territory values. The author reasons about the chain by understanding which grants enable which further interactions.

One boundary. Three dimensions. The model is as simple as the architecture permits and no simpler.

---

## 4. The Client-Server Boundary as Negotiation Surface, and the Constraint Inversion of Client-Side Frameworks

**Fielding (Chapter 5, on client-server):**

The client-server constraint separates user interface concerns from data storage concerns. Fielding motivates this with scalability and independent evolution. The boundary is architectural: the server provides representations, the client interprets them.

**Observation: The boundary as negotiation surface**

The client-server boundary in REST is more than a separation of concerns. It is the surface across which all capability is negotiated. Every grant, every token, every delivered script, every channel connection crosses this boundary. The shape of the boundary dictates the shape of everything that can manifest on the client.

In classical REST, the vocabulary of negotiation is limited to hypermedia controls: links (what the client can navigate to) and forms (what the client can submit). This is HATEOAS. PRESTO extends the negotiation vocabulary to include granted code (htx:script, topology delivery), granted channels (htx:grant type="websocket"), granted computation (Layer 6 WASM delivery), and granted mutations (htx:action tokens). The negotiation surface is the same hard boundary Fielding described. The vocabulary of what can be negotiated across it is larger.

This reframing has a consequence: the bilateral source representation is the author's instrument for writing on both sides of the negotiation surface simultaneously. The htx: namespace is the server's side. The HTML, scripts, and attributes are the client's side. The resolution pipeline is the act of negotiation — the server deciding, based on the source representation and the request context, exactly what capabilities to deliver across the boundary.

**Observation: The constraint inversion of client-side frameworks**

The common perception is that frameworks like React provide "more freedom" than server-rendered approaches. The reality is the inverse: React's architectural constraints are more restrictive than REST's, not less. Each of React's core assumptions is a constraint that narrows the design space:

| React Constraint | REST Equivalent | Restrictiveness |
|-----------------|----------------|-----------------|
| Requires a build step | No build step required | More restrictive |
| Requires a JavaScript runtime | Requires only a user agent that understands the representation format | More restrictive |
| Assumes client-side routing by default | Assumes server-mediated navigation | More restrictive |
| Component-local state as primary model | Representation as primary state | More restrictive |
| Virtual DOM reconciliation | Server sends the final document | More restrictive |
| Hydration required for server-rendered content | No hydration; document is complete | More restrictive |

React's constraints are not derived from the properties of the network. They are derived from the properties of a specific execution model: client-side JavaScript component trees rendered into a virtual DOM. When a developer adopts React, they adopt these constraints. The design space they can explore is the space that React's constraints permit — which is a strict subset of the space that REST's constraints permit.

REST's constraints are derived from the properties of the medium itself: statelessness from scalability requirements, uniform interface from independent evolution, code-on-demand from extensibility. These constraints are less restrictive because they are more fundamental. They permit more candidate architectures. React is one candidate architecture within the web's design space — one that happens to abandon several of the constraints it inherits from the medium it operates on (statelessness, complete representations, server-mediated navigation).

**Observation: The mental model gap**

React succeeded not because its constraints are architecturally correct but because it provided a coherent mental model for its constraints. "Thinking in React" describes components, props, state, effects, and the unidirectional data flow. A developer who has internalized this model can reason about every potential interaction within React's constraint set. The model is derived from incorrect constraints (more restrictive than the medium requires), but it is complete within its own terms.

REST has never had an equivalent authorial model. Fielding provided the architectural evaluation model: how to analyze constraints, derive properties, and compare styles. Framework documentation provides API surface models: how to call functions and pass configuration. Template language documentation provides syntax models: how to write loops and conditionals. But no prior work has provided a complete authorial model for what it means to design and build applications within REST's actual constraints — a model that accounts for the full lifecycle from source representation through resolution through client execution through recursive further representations.

This is the gap PRESTO must fill. The specification and the engine are necessary but not sufficient. The developer also needs a mental model — a "Think in PRESTO" — that is:

- **Simple enough** to hold in working memory (the bilateral boundary is one concept)
- **Complete enough** to circumscribe all potential induced properties (temporal latency, concerted contribution, recursive potentiality)
- **Derived from constraints**, not from implementation details (it must survive any conformant engine, in any language)
- **Less restrictive** than the models it replaces (it must open the design space, not narrow it)

The evangelism case is not "PRESTO is better than React." The case is: REST's constraints are less restrictive than React's constraints, and they induce properties (scalability, independent evolution, visibility, progressive capability) that React's constraints do not. PRESTO provides the authorial mental model that makes REST's full design space navigable for application developers. The framework is not the product. The comprehension of the design space is the product. The engine is the tool that makes the comprehension practical.

---

## 5. React as Distributed Objects: Fielding's Evaluation Applied

**Fielding (Chapter 3, Section 3.6.3):**
> "The distributed objects style organizes a system as a set of components interacting as peers. An object is an entity that encapsulates some private state information or data, a set of associated operations or procedures that manipulate the data, and possibly a thread of control, so that collectively they can be considered a single unit."

**Fielding's evaluation of Distributed Objects:**

| Property | DO Score | Meaning |
|----------|----------|---------|
| Network Performance | - | Poor throughput due to fine-grained invocations |
| Visibility | - | State hidden inside objects; system-wide observation difficult |
| Reliability | - | Action chains create cascading failure modes |
| Efficiency | + | Local computation can be efficient |
| Evolvability | + | Internal changes don't break external interface |
| Extensibility | + | New operations can be added |

**Fielding's verdict:**
> "In spite of all the interest associated with distributed objects, they fare poorly when compared to most other network-based architectural styles."

**Observation: React is the Distributed Objects style instantiated on the client**

React implements every defining characteristic of Fielding's Distributed Objects:

- **Encapsulation**: Each React component encapsulates private state via useState/useReducer. State is hidden; the only access is through the component's render output and exposed callbacks.
- **Identity coupling**: Components reference each other by identity (import paths). Renaming or moving a component breaks all importers. This is the identity coupling problem Fielding identified.
- **Custom per-object interfaces**: Each component has unique props. There is no uniform interface; every component defines its own contract. This is the antithesis of REST's uniform interface constraint.
- **Action chains**: A state change triggers a re-render, which triggers child effects, which may trigger further state changes, which trigger further re-renders. This is Fielding's "chain of related invocations" — the action chain pattern that degrades reliability.
- **Distributed state**: State is distributed across the component tree. Observing the full application state requires traversing the tree (React DevTools exists precisely because visibility is poor by default).

React inherits exactly the properties Fielding predicted for DO: poor visibility (you cannot inspect system state from outside the tree), poor network performance (the virtual DOM reconciliation compensates for the absence of server-rendered representations), and poor reliability (a single component error cascades through the action chain and unmounts the subtree — hence Error Boundaries as a compensating mechanism).

**Fielding (Chapter 5, Section 5.2.1) — the fundamental inversion:**
> "Unlike the distributed object style, where all data is encapsulated within and hidden by the processing components, the nature and state of an architecture's data elements is a key aspect of REST."

REST inverts the Distributed Objects model. Data flows openly through a uniform interface. The representation IS the data — complete, self-describing, navigable. No encapsulated state. No identity coupling. No action chains. No custom per-component interfaces.

PRESTO follows this inversion: templates declare data needs openly (htx:data). Components have a uniform composition model (props, slots). The resolved representation contains all data the client needs. Nothing is hidden behind operations the client must invoke.

**Fielding (Chapter 5, Section 5.4):**
> "Several attempts have been made to model the Web architecture as a form of distributed object system. However, they exclude various Web resource types or implementation strategies as being 'not interesting,' when in fact their presence invalidates the assumptions that underlie such models."

This passage, written in 2000, describes with uncanny precision what happened when React was adopted as the default model for web development. The Web was modeled as a distributed object system (component trees with encapsulated state). Web resource types that didn't fit (static HTML, server-rendered pages, hypermedia-driven navigation) were excluded as "not interesting." And the assumptions that underlie the model (client-side rendering as default, JavaScript as required, build steps as necessary) were invalidated by the very medium they operated on — but the industry adopted them anyway.

**Observation: The compensating ecosystem**

React's ecosystem exists to compensate for the properties that the Distributed Objects style fails to induce:

| Missing Property | Compensating Tool | What REST Already Provides |
|-----------------|-------------------|---------------------------|
| Server rendering | Next.js SSR/SSG | The server sends complete representations by default |
| Routing | React Router / Next.js router | The server maps URLs to resources; links are hypermedia controls |
| State management | Redux / Zustand / TanStack | The representation carries the state; statelessness eliminates client-side state coordination |
| Data fetching | SWR / React Query / TanStack | htx:data resolves data needs declaratively at the template level |
| Form handling | React Hook Form / Formik | htx:action provides two-phase mutations with signed tokens |
| Authentication | NextAuth / Auth.js | htx:auth/htx:unauth are first-class directives |
| Real-time | Socket.io / Pusher | htx:grant materializes signed channel tokens |

Each row represents a gap in the DO model that the ecosystem fills. In REST, these properties are already induced by the constraints. The ecosystem is compensating for the choice to use the wrong architectural style.

---

## 6. The Three-Tier Authorial Model: Library, Framework, and the Curated Design Space

**The problem: breadth vs. comprehension**

REST's constraints are less restrictive than the Distributed Objects constraints. This is architecturally advantageous (more induced properties, larger design space) but cognitively expensive. The developer who works within REST's full design space must reason about temporal latency, concerted contribution, recursive potentiality, and the full progressive layer spectrum. Most developers are implementers, not architects. They build with tools that have been provided. They are willing — eager, even — to trade capability for composability.

React provides this trade: a narrow design space with a complete mental model. The developer sacrifices the properties REST would induce (visibility, network performance, reliability) in exchange for a model they can hold in working memory (components, props, state, effects).

PRESTO must provide an equivalent trade without sacrificing the properties. This requires not a single mental model but a tiered one — progressively more detailed, each tier sufficient for a class of developer.

**Tier 1: The Authorial Model (the bilateral boundary)**

The foundational mental model. One concept: the htx: namespace is server territory; everything else is client territory. The engine consumes server territory and emits pure HTML.

Every developer needs Tier 1 regardless of what libraries or frameworks they use. It is the irreducible minimum for working within the PRESTO design space. From this single concept, the developer can reason about:

- What will be resolved at request time (htx: directives)
- What will survive to the client (HTML, scripts, attributes with resolved values)
- What capabilities the client receives (grants, tokens, delivered code)
- What temporal gap exists between authoring and execution

Tier 1 is "Think in PRESTO." It is analogous to "Thinking in React" but derived from REST's constraints rather than DO's.

**Tier 2: The Library Model (composition within the design space)**

Libraries provide reusable artifacts that compose within the bilateral model. The library author understands Tier 1 thoroughly and provides components that a developer can use without reasoning about every implication of the design space. Libraries narrow choices without narrowing constraints.

Examples in PRESTO:
- **Component libraries** (presto-ui): Pre-built .htx components — cards, forms, dialogs, navigation patterns — that compose via props and slots
- **Behavior libraries**: Client-side utilities — signal systems, topology helpers, channel abstractions — delivered as scripts
- **Data pattern libraries**: Pagination components, search patterns, filter interfaces — built on htx:data and htx:each

The developer composing with Tier 2 libraries does not need to reason about the full recursive potentiality of Layer 5 autonomous navigation. They use components that have been designed by someone who did.

In React's ecosystem: React itself is Tier 2. It provides composition primitives (components, hooks). TanStack Query is Tier 2 (data fetching patterns). Shadcn is Tier 2 (UI components).

**Tier 3: The Framework Model (opinionated conventions)**

A framework provides conventions, guard rails, and deployment opinions. It curates the design space: selecting which parts to use and how to compose them. The framework trades capability for velocity.

A PRESTO framework would provide:
- **Project structure conventions**: Where templates go, how routes map to files, where components live
- **Default behaviors**: Which layout conventions to follow, how authentication gates work, what error pages look like
- **Layer recommendations**: Which progressive layers to use for which patterns (forms → Layer 0, live search → Layer 2, dashboards → Layer 4)
- **CLI tooling**: Scaffold a project, generate components, seed a database, run the development server
- **Deployment opinions**: How to build, how to serve, how to configure for production

In React's ecosystem: Next.js is Tier 3. It provides project structure (app/ directory), default behaviors (SSR, ISR), guard rails (middleware, route handlers), CLI (create-next-app), and deployment (Vercel).

**The fundamental difference:**

In React's ecosystem, the framework (Next.js) compensates for deficiencies in the DO model. SSR compensates for the absence of server-rendered representations. The file-based router compensates for the absence of server-mediated routing. API routes compensate for the absence of a uniform interface. The framework fills gaps in the architecture.

In PRESTO's ecosystem, a framework would not fill gaps. The architectural properties are already induced by the constraints. A framework would provide navigation aids — opinionated choices about which parts of the complete design space to use and how to compose them. Not compensating machinery. Curated paths through a space that is already well-formed.

This is the distinction: **compensating frameworks** (filling gaps left by insufficient constraints) vs. **curating frameworks** (navigating a design space whose properties are already complete).

---

## 7. Progressive Escape: The Asymmetry of Constrained Libraries

**Fielding (Chapter 5, on code-on-demand as optional):**

Fielding designates code-on-demand as the only optional constraint in REST. His reasoning: "allowing features to be downloaded after deployment improves system extensibility." The optionality itself is a form of escape hatch — the architect can adopt the constraint or not, per deployment.

**Observation: Structural constraints vs. curated constraints**

There are two fundamentally different kinds of constraints a library can impose on a developer:

**Structural constraints** are embedded in the execution model. They cannot be removed without leaving the library entirely. React's constraints are structural: the virtual DOM is the rendering model, component-local state is the state model, the JavaScript runtime is required. A developer who needs to escape these constraints must abandon React. The migration cost is total. "Rewriting from React" is a phrase that exists precisely because structural constraints admit no partial escape.

**Curated constraints** are opinions layered above the architectural constraints. They can be removed independently, per feature, without leaving the architecture. A PRESTO library's constraints are curated: the library provides components, conventions, and abstractions that simplify the mental model, but the developer can always drop to the bilateral boundary (Tier 1) and write raw htx: directives, HTML, and scripts. No migration. No rewrite. Just fewer opinions, more design space.

The asymmetry is directional:
- React's escape hatch would need to go *upward* — to a broader architectural style with more induced properties. But React sits within the Distributed Objects style, which is more restrictive than REST. There is no upward escape within DO. The developer can only compensate within the existing constraints (add SSR, add routing, add state management).
- A PRESTO library's escape hatch goes *downward* — to the broader design space that REST's constraints already define. The library's opinions are removed. REST's constraints remain. The full progressive layer spectrum is available.

**Observation: Progressive escape as a formal property**

A library within the PRESTO style exhibits *progressive escape* if:

1. It imposes curated constraints that simplify the authorial mental model
2. Those constraints are removable without leaving the architectural style
3. Removing a constraint exposes the next broader level of the design space
4. The developer can adopt and shed library constraints independently per feature, per page, per component

This property is exhibited by construction. Because the PRESTO style's constraints are derived from REST (which is less restrictive than DO), any library that adds opinions above those constraints creates a layer that can be peeled back without abandoning the architecture.

The progressive layers are the mechanism of progressive escape. A Layer 0 library (pure HTML components, no scripts) simplifies the mental model maximally. When the developer needs interactivity, they escape to Layer 2 (add a script tag). When they need real-time data, they escape to Layer 4 (request a channel grant). At every level, the escape is visible: go one layer deeper into the design space. The developer never leaves the architecture. They use more of it.

**The comprehension spectrum:**

The progressive layers are not only a technical spectrum of client capability. They are a comprehension spectrum of authorial reasoning:

| Layer | Technical Capability | Authorial Reasoning Required |
|-------|---------------------|------------------------------|
| 0 | Static HTML | What does the server render? |
| 1 | Declarative enhancement | What interactions does the HTML declare? |
| 2 | Scoped scripts | What behavior executes after resolution? |
| 3 | Server-delivered code | What code does the server push, and when? |
| 4 | Authenticated channels | What data flows in real time, with what authority? |
| 5 | Autonomous navigation | What representations does the client request independently? |
| 6 | Native computation | What computation runs at native speed in the browser? |

A library can target any row. A framework can recommend which rows to use for which patterns. The developer starts where they can reason about the system and escapes downward when they need more. The ceiling is never fixed. The design space was always there. The library was showing the well-lit paths through it.

**Contrast with the compensating ecosystem:**

In React's ecosystem, each added tool (Next.js, React Router, Redux) compensates for a missing property by adding complexity. The mental model grows with each compensation. The developer must learn React + Next.js + React Query + Zustand — each with its own mental model, its own constraints, its own failure modes.

In PRESTO's ecosystem, each library simplifies the mental model by curating the design space. The developer learns less, not more. When they need to escape, they remove the library's opinions and reason from the bilateral boundary. The foundational mental model (Tier 1) is always sufficient. The library was convenience, not compensation.

---

## 8. (Reserved for further annotations)

*Entries will be added as the reading continues through Chapters 5 and 6 of the dissertation.*

---
