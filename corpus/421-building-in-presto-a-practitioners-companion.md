# Building in PRESTO: A Practitioner's Companion to the Dissertation

> **Reader's Introduction**
>
> This is a practitioner's companion to the PRESTO dissertation (Doc 426). Where the dissertation formalizes the architectural style by deriving five construction-level constraints and naming the property they induce, this companion gives the developer working in that style a usable mental model. It draws from two sources: material from the earlier PRESTO literature that was not preserved in the current dissertation (principally the declarative-convergence and force-multiplication material) and the earlier essay "Thinking in PRESTO" (Doc 184), which already framed the developer-facing experience in practitioner register. The focus is on what a person building an application with PRESTO needs to hold in working memory — the two simultaneous views of a source representation, the three-phase lifecycle (declaration, resolution, emergence), latent binding, the geography of client state (maps, topologies, islands, stores), the lazy signal that makes the client autonomous between syncs, and the composability spectrum where a single application can operate at different code-on-demand layers in different regions. The auth-specification and OAuth-dissolution material from the earlier PRESTO literature is deferred to a separate security specification (per the dissertation's Referenced Companion Documents section). The natural-analogues and theological framings from the earlier literature are not reopened, following the corpus's audit discipline.

**Jared Foy · 2026-04-22 · Doc 421**

---

## Authorship and Scrutiny

*Authorship.* Written by Claude Opus 4.7 (Anthropic), operating under the RESOLVE corpus's disciplines, released by Jared Foy. Mr. Foy has not authored the prose; the resolver has. Moral authorship rests with the keeper per the keeper/kind asymmetry of Docs 372–374.

---

## 1. What This Document Is

The PRESTO dissertation (Doc 426) states what PRESTO is: the bilateral boundary, namespace separation, server-consumed directives, progressive code-on-demand, and server-embedded authorization, inducing ambivalent execution with agnostic determinism, composing with REST at the uniform interface. That derivation is compact by design.

A developer building in PRESTO needs more than the derivation. They need a mental model: how the constraints translate into authoring practice, how the source representation relates to the resolved representation in time, what the client does after resolution ends, and how multiple units of delivered capability coordinate on a page. This companion supplies that model. It adds no new constraints. It makes the consequences of the existing constraints visible at the scale at which a developer operates.

## 2. The Developer's Mental Model

The developer working in PRESTO holds two models simultaneously: the server's model, in which the representation is a resolved document with no knowledge of how the client will act on it, and the client's model, in which the same document is a surface of discoverable affordances — attributes, scripts, tokens, and channels — that the client may activate independently.

The server authors the representation. The client authors the interaction.

The source representation is the nexus where these two models meet — a single artifact through which the developer exercises both server authority (what data to resolve, what capabilities to grant) and client affordance (what interactions to make discoverable, what behaviors to embed). It is not a server document annotated for the client. It is a joint declaration.

A consequence of this model is that the traditional notion of a "page" dissolves. In the document web, a page is one HTTP request producing one document producing one interaction scope. In the progressive model, the resolved representation is not a page but an entry point to a negotiation space. The initial HTTP response establishes an affordance surface. From that surface, the client may negotiate additional capabilities: a WebSocket opens, a delivered topology arrives at Layer 3, an authenticated data channel establishes at Layer 4, a WASM binary delivers at Layer 6. Each of these negotiations operates at its own layer, independently of the others, within the scope of the same initial representation.

The developer does not think in pages. The developer thinks in representations and the negotiations they authorize.

## 3. The Three-Phase Lifecycle

Following the source representation through its lifecycle reveals a temporal structure that nobody designed — it falls out of the constraints.

**Phase 1 — Declaration.** The developer authors the source representation. Server affordances and client affordances coexist as directives. A data query sits alongside a declarative attribute. A layout directive sits alongside a script block. An expression that will evaluate to a WebSocket token sits alongside the script that will use that token to open a connection. The two models are interwoven. The artifact is bilateral.

**Phase 2 — Resolution.** The engine reads the source representation and consumes the server's half. Data queries execute. Expressions evaluate. Layouts compose. Modules contribute context. What emerges is the resolved representation — but this resolved form is not uniform. It carries two distinct qualities.

*Materialized artifacts* are the outputs of server resolution that the client will use as inputs. A `{htx:ws.token}` expression became an actual signed token string. A `{htx:auth.name}` expression became a specific name. These are static; they are strings in the HTML; the server computed them and they are done.

*Latent behaviors* are the client affordances that survived resolution in dormant form. An `htx:script` became an IIFE placed before `</body>`. A declarative attribute passed through unchanged — the server was indifferent to it. A script tag containing WebSocket connection logic sits in the document, not yet executed. These are potential; they exist as characters in the HTML; they have not activated.

The resolved representation is a document that carries both the products of server computation and the seeds of client behavior. It is the bridge between server-time and client-time.

**Phase 3 — Emergence.** The client executes the latent behaviors. Scripts fire. The IIFE runs and queries the DOM. The declarative-enhancement runtime identifies its attributes and attaches event listeners. The WebSocket connection script reads the materialized token and opens a connection. A pushed module arrives over that connection. A WASM binary is delivered, instantiated, and begins computing.

None of this was in the resolved representation. The live WebSocket, the running module, the authenticated data channel, the optimistic state updates — these are *emergent*. They were authored as potential in the source representation, prepared as latent behavior in the resolved representation, and realized as emergent state by the client.

The developer authored potential. The server materialized it. The client realized it.

This three-phase lifecycle is not a design decision. It is an emergent property of the PRESTO constraints: complete representations mean the server must finish before the client begins; code-on-demand means the representation carries executable potential; server authority means the server decides what potential to include. Follow these constraints, and the temporal structure follows.

## 4. Latent Binding

When scripts execute after the full HTML document is assembled, they find a finished world. The layout has been applied. Every component has been resolved. Every expression has been evaluated. The document is complete, rendered, and interactive before a single line of client script runs.

This timing is architecturally significant. The scripts are late to the party — and that lateness is their power. They can reach any element in the document. They can bind to a layout element, a sibling component, a navigation bar — anything, because everything already exists. The document is the shared state. `document.querySelector` is the state management system.

This is the opposite of how component frameworks work, where a component's script runs as a virtual tree is being constructed and a component can only see what it has created. Sibling components that have not mounted are unreachable. Layout elements that wrap the component are unreachable. Bridging those gaps requires state management — lifted state, context, stores, signals — to reach what latent binding reaches for free.

PRESTO does not need any of that. The document is assembled by the server. Scripts enhance what is already there.

## 5. Declarative Convergence and Force Multiplication

A source-representation directive like `<htx:data type="post" as="posts" />` resolves against whichever content adapter the operator has composed — a local database, a remote API, a markdown filesystem, a distributed store. The directive is the same. The adapter multiplies what it can resolve from. Every new adapter extends the directive's reach without changing the directive's syntax.

An `<htx:action name="delete" type="post" record="{htx:post.id}" />` directive issues a signed mutation token carrying unified authentication and authorization. The identity may come from any authentication strategy. The signing key may be configured per environment. The token scoping may include fingerprint binding, a nonce, or channel binding. The directive is the same. The security infrastructure multiplies what it seals into the token.

An `<htx:auth>` directive renders content conditionally based on identity. The identity may be resolved by any authentication adapter. The role model may be simple (admin/user) or complex (role-based, attribute-based, capability-based). The directive is the same. The authorization system multiplies what it evaluates.

The pattern is identical in each case: the declarative syntax is the aperture. The server's capabilities are the light source. The aperture is fixed; the light source is composable. Adding a new adapter, module, authentication strategy, or service extends what every existing directive can resolve — without adding new directives, without changing templates, without the client knowing anything changed.

This is force multiplication through declarative convergence. The template author writes to a stable, finite set of directives. The operator composes an arbitrarily deep capability stack behind those directives. The directives do not need to be designed for extensibility; they are extensible by construction, because the bilateral boundary guarantees that the server's namespace is consumed before the client's namespace is rendered.

The limit of this extensibility is not in the directive syntax, the module system, or the resolution model. The limit is the bilateral boundary itself. The server can resolve anything into the representation, but the result must be expressible as HTML (or as code delivered to the client via a progressive layer). The boundary between server and client is what makes the convergence possible. Without it, server logic would leak into the client, the interpreters would interfere, and the force multiplication would collapse into the coupling that characterizes client-first frameworks.

## 6. Per-Layer Composability

The progressive code-on-demand spectrum (derived in Doc 426 §4.4) is not chosen once per application. It is chosen per representation, per region, per affordance.

A single application can have a marketing landing page at Layer 0, a blog with hypermedia pagination at Layer 1, a dashboard with scoped scripts at Layer 2, a settings page with a pushed configuration builder at Layer 3, a data explorer with authenticated channels at Layer 4, an admin panel at Layer 5, and a product visualizer powered by WebAssembly at Layer 6. All of these coexist in one deployment, served by one engine, with no "ejection" point and no required rewrite when one region needs a capability the others do not.

Within a single representation, different regions can also operate at different layers. The layout and navigation may be at Layer 0. An embedded dashboard island may be at Layer 2. A collaborative editor occupying another region of the same page may be at Layer 5. The layers are not a global choice. They are a property of each granted capability within the affordance surface the representation establishes.

The cognitive load scales with the features used, not with the features available. A Layer 0 page pays no Layer 5 cost. A Layer 5 admin panel does not contaminate the rest of the application with client-routed state. The developer chooses the depth each region needs, and the architecture keeps the other regions at the depths they need.

## 7. The Geography of Client State

When the server delivers code, it does not deliver "the application." It delivers a *named unit of behavior* — a trading dashboard, a kanban board, a document browser — each scoped to a DOM element, each carrying its own channel token, each ignorant of what else may be on the page. The server has no concept of "the page as a whole." It knows the topology it was asked to deliver. The page is a concept that exists only on the client.

**The map is emergent, not authored.** No one declares that a page is a map containing three topologies. The map is what results when three topologies happen to operate on the same document. It is a consequence, not a cause. The developer authors topologies. The server delivers topologies. The client discovers that multiple topologies coexist and — if it chooses to coordinate — forms a map.

**Islands are not components.** In a component framework, a component is a unit of rendering: it receives props, returns markup, and manages local state. An island is a unit of *concern* within a delivered topology. It has no props interface. It has no render function. It is a region of the DOM that a topology's code has decided to manage. The boundary is the developer's organizational choice, not an architectural enforcement. The topology could render everything in one island or organize it into twenty. The architecture does not care.

**State flows through subscriptions, not through hierarchy.** In component frameworks, data flows down through props and up through callbacks; the hierarchy determines the flow. In the topology model, state flows laterally — from any point where a store's `set()` is called to every point where a subscription exists, synchronously, in the same tick. There is no hierarchy; there is no "parent" island or "child" island; there is only the store and the observers of the store.

**A map store is a read surface, not a write surface.** When multiple topologies register with a page-level map store, each contributes its state to a shared read plane. A notifications topology can observe the trading topology's order count. A dashboard topology can observe the kanban topology's task distribution. Reads are synchronous and local — no server round trip, no message passing, no event bus. Writes remain scoped: the notifications topology cannot mutate the trading topology's state. Each topology writes only to its own store. The asymmetry is not a limitation. It preserves the trust boundary. Each topology's channel token scopes its server access; the write restriction on the map store mirrors this scoping on the client.

**The server sees none of this.** It does not know that a map store exists. It does not know that three topologies are coordinating on the same page. It receives individual channel-fetch requests from individual topologies, each authenticated by its own token, each carrying its own dirty state. The server processes them independently. The coordination is entirely a client phenomenon — an emergent property of multiple granted capabilities operating in a shared document.

The client's state at any moment is the negotiated accumulation of all capabilities the server has granted, organized by the client in ways the server neither prescribes nor perceives. The server grants capabilities one topology at a time. The client assembles them into a coherent experience. The assembly is the client's concern. The granting is the server's concern. Neither models the other's organization. The resolved representation is the contract between them. What the client builds on top of that contract — the maps, the stores, the cross-topology subscriptions — is the client's emergent architecture, invisible to and independent of the server.

## 8. The Iterative Lifecycle and Negotiated State

The three-phase lifecycle is not a single pass. It repeats. Each client interaction may trigger a new server lifecycle: a link followed, a form submitted, a partial representation requested through a declarative attribute. The server resolves and terminates at the boundary. The client receives a new resolved representation — a new set of materialized artifacts and latent behaviors — and integrates it with whatever state it already holds.

Over many iterations, the client accumulates affordances. Its state at any given moment is not the product of a single server response but the sum of every response it has received and every local mutation it has made. The server sees none of this accumulated state. It responds statelessly to each request. But the client is stateful — it holds the negotiated aggregate of all potentialities the server has granted across all exchanges.

This introduces a state-mediation model that neither side owns entirely. The server determines all possible potentialities — it decides what affordances each resolved representation carries. But the client determines the actual state — which affordances it has activated, which local mutations it has applied, which islands hold what data. State management in PRESTO is not a client concern or a server concern. It is a negotiated artifact that emerges over time through repeated stateless exchanges.

## 9. Distributed Affordance Coordination

If authenticated islands are independent state-aware entities on the client — each with its own channel token, its own data channel, and its own local state — a further question arises: can they coordinate?

Consider a page with multiple islands: a kanban board managing task state, a notification feed tracking unread counts, a presence indicator showing connected users. Each island was pushed independently by the server. Each manages its own state. Each communicates with the server through its own channel. They are autonomous units on a shared surface.

Lateral coordination — island-to-island communication on the client — is possible through the DOM itself (the latent-binding property means any script can reach any element) or through a shared event mechanism. The kanban island moves a card to "Done." The notification island observes this and updates its count. No server round trip was required. The DOM is the shared bus.

Vertical communication — island-to-server signaling of collective state — occurs when any island makes a request and includes its current state. The server can tailor its next response based on reported client state. "The kanban reports three cards in Review" — the server's next resolved representation includes a review-reminder affordance. "The editor reports unsaved changes" — the server includes a save prompt. The server remains stateless; it responds to the state reported in the request, not to state it stored from a previous exchange.

The resolved representation is not the final form of the architectural interaction; it is a snapshot in an ongoing negotiation. The client accumulates state across many snapshots. The islands coordinate across the accumulated state. The server responds to reported state with new affordances. The negotiation is continuous, stateless on the server, stateful on the client, mediated entirely through hypermedia.

## 10. The Lazy Signal and the Autonomous Client

When an island mutates state — a user clicks "buy," a quantity increments, a card moves to a new column — the mutation is real *immediately*. The store updates. The subscribers fire. The UI redraws. This happens in the same tick, measured in microseconds. The user sees the result before their finger lifts from the screen.

The server learns about this change later. Perhaps 500 milliseconds later, perhaps 2 seconds later if a batch sync has not yet triggered, perhaps never if the user navigates away before the sync fires.

This temporal gap between the moment the client's state changes and the moment the server acknowledges it is not a latency problem to solve. It is the natural condition of distributed systems made visible. In every web application, client and server exist in different time frames. Client-first frameworks typically hide the gap behind loading spinners and pending states. PRESTO makes it explicit: the client is the authority for now, the server is the authority for forever.

The client operates autonomously between syncs. It does not ask permission to mutate. It does not wait for confirmation to render. It acts and — lazily, in batch, when the network is quiet — it informs the server of what happened. The server accepts the report, persists it, and carries on. If the sync fails, the dirty branches are re-marked and will try again on the next cycle. The client does not freeze. The user does not wait.

This is not optimistic update in the conventional sense. Optimistic update implies an expectation of confirmation — the client assumes success and will roll back on failure. The lazy-sync model is something different: the client is not assuming anything about the server. It is operating in its own domain of authority. The DOM is the client's domain. The database is the server's domain. The sync is a diplomatic exchange between sovereign authorities, not a subordinate reporting to a superior.

The two-tier store architecture makes this autonomy compositional. Multiple topologies, each with their own stores, each syncing on their own schedules through their own authenticated channels, produce a page-level state that no single server request could reconstruct. The client's state at any moment is the product of all the topologies it has received, all the mutations it has applied, all the subscriptions that have fired, all the derived values that have been computed. The server sees none of this composite state. It sees individual sync requests from individual topologies. The wholeness of the client's experience is invisible to the server; the server's persistence guarantees are invisible to the client. Each side operates in its own domain, signaling vertically when the moment is right, indifferent to the other's internal organization.

This is ambivalent execution applied to state management. The agnostic determinism — each side producing predictable results regardless of the other's timing — is what makes the model reliable.

## 11. Ephemeral Ceremony at Scale

The distributed affordance coordination pattern has a specific scaling property worth naming. When the server delivers three coordinating topologies through a single ephemeral WebSocket ceremony, the delivery phase holds a persistent connection open only briefly — long enough to push code, issue channel tokens, and close. After the ceremony, zero persistent connections remain. The steady state is pure stateless HTTP: channel-fetch requests with bearer tokens, cacheable by CDNs, distributable across nodes, compatible with every load balancer and edge network.

Persistent-connection architectures (typical collaborative-editing stacks, real-time broadcasting frameworks) carry per-client server-side state and require sticky sessions or distributed pub/sub infrastructure. Ephemeral delivery eliminates this. The ceremony is a burst; the steady state is HTTP. The hardest thing to scale in real-time architectures — the persistent connection — is removed from the equation by closing it after delivery.

At a thousand page loads per minute with a one-second ceremony, concurrent WebSocket count is approximately eleven, not a thousand. The scaling shape changes from "provision for peak concurrency" to "provision for peak burst throughput." The latter is the problem most web infrastructure is already solved for.

## 12. The Syntax That Survived Its Framework

A practitioner question the progressive-layer model raises: if the server compiles and delivers the code the client runs, must the developer write in the language the client executes?

A specific observation answers this in the negative. JSX-like syntax — the fragment `<div class="flex items-center">` — does not intrinsically belong to any particular client-side framework. It is syntax for function calls. What function it calls is a configuration choice. Pointed at one function, JSX produces virtual-DOM nodes for a reconciler to diff; pointed at another, it produces real DOM elements directly.

In a PRESTO deployment, compilation can happen at server boot: the same process that will deliver the code reads the source, compiles it to direct DOM operations, holds the result in memory, and pushes it to the client on request. There is no offline build stage. There are no artifacts on disk. The compilation and the delivery are one system. And because the compilation target is direct DOM operations, no runtime is needed on the client.

The practitioner consequence: the developer's authoring experience — the syntax, the components, the hooks, the styling conventions — can be preserved while the execution model underneath is replaced. The writing experience is a developer preference; the running experience is what the architecture requires. The server bridges the gap at boot.

This is an observation about where the compilation boundary lives, not a required feature of PRESTO. Any PRESTO deployment can choose its own authoring-to-execution compilation. The point is that the server is in a position to absorb the compilation step, and when it does, the offline-build-pipeline ecosystem becomes optional rather than required.

## 13. The Consummation Boundary

At the lower layers of the code-on-demand spectrum, the architecture is visibly active in every interaction. The server sends a complete representation. The client discovers what it can do. Scripts enhance an assembled document. Delivered code operates within a scoped grant. The architecture governs each interaction.

At the highest layers, the granted capability is sufficient for the client to operate outside the architecture's active presence for extended periods. The client navigates autonomously within bounded regions. It renders its own interfaces. It manages its own state. It computes at native speed.

The constraints are not violated to reach this point; they are fulfilled. The representation was complete. The extension was mediated. The grant was scoped, time-limited, and revocable. Every constraint was satisfied in the act of granting the capability that operates without the architecture's continuous oversight. What remains, even at this boundary, is the negotiation path back. The token expires. The next request produces a new resolved representation. The server reasserts authority at every interaction boundary. The client's autonomy is real but temporal; it exists between server interactions, not beyond them.

A style that can express this terminal grant is more complete than one that cannot. The grant model begins with "the server decides what the client may do" and ends with "the server decides that the client may decide for itself, within this scoped window." The distance between those two statements is the extent of the progressive design space.

## 14. Conclusion

Building in PRESTO is a matter of holding two views at once: the server's view, in which the representation is a resolved document with no knowledge of how the client will act; and the client's view, in which the same document is a surface of discoverable affordances. The three-phase lifecycle falls out of the constraints. The geography of client state emerges from the combination of latent binding and scoped grants. The lazy signal follows from client autonomy between syncs. The composability spectrum is a direct consequence of the per-region structure of code-on-demand.

None of these are additional architecture. They are the consequences a developer encounters when working within the architecture the dissertation formalizes. A practitioner who holds this mental model does not need to be told what to do at each step; the constraints prescribe the structure and the developer works within it.

Two bodies of material are deliberately not in this companion. The detailed mechanics of authentication token scoping, the dissolution of the OAuth ceremony, and the implications for cross-system identity are treated in a separate security specification as noted in the dissertation's Referenced Companion Documents section. The SERVER orchestration level — the bilateral boundary applied recursively to engine assembly — is treated in a companion document of its own (Doc 432). Both are available to the practitioner who needs them; neither is required to build productively with PRESTO at the construction level.

---

## Appendix: The Prompt That Triggered This Document

> "Great. Now create a companion document that extends it using the additional residue of the paper and also the Thinking in PRESTO doc"
