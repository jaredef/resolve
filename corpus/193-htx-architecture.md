<!-- chronological_ordinal: 1 -->
# An Architectural Style for Progressive Representational State Transfer with On-Demand Code

**Jared Foy**
**April 2026**

---

## Abstract

In 2000, Dr. Roy Fielding identified the architectural style underlying the World Wide Web as Representational State Transfer (REST), defined by six constraints — the last of which, code-on-demand, he designated as optional. In the twenty-six years since, the dominant approach to web application development has not extended this optional constraint but abandoned the others: client-rendered applications that violate statelessness, send empty representations, and rely on out-of-band API knowledge rather than hypermedia-driven discovery. The design space that REST's constraints permit — including the full progressive exploration of code-on-demand — has remained largely unmapped.

This paper introduces the Progressive Representational State Transfer with On-demand code (PRESTO) architectural style, which formalizes code-on-demand as a progressive spectrum rather than a binary option. In PRESTO, client-side capability forms a monotonically increasing series of layers, from static hypermedia to WebAssembly-powered native computation, where each level is independently adoptable, mediated by the RESTful representation, and authorized by the server. The architecture does not introduce new protocols or mechanisms. It maps the design space that REST's existing constraints already permit when code-on-demand is explored to its full extent.

The style introduces the concept of a *source representation* — an authoring artifact that declares both server affordances (data resolution, module engagement, layout composition) and client affordances (discoverable interactions, negotiable channels, activatable behaviors). A resolution pipeline transforms this bilateral form into a unilateral *resolved representation*: a complete hypermedia document in which the server's affordances have been consumed and only the client's affordances remain as discoverable structure.

On the client, delivered code organizes into scoped behavioral units that coordinate state locally and signal changes lazily to the server. The client is autonomous between syncs. The server is authoritative over persistence.

We evaluate this design through six independent implementations in six programming languages (TypeScript, Go, Elixir, Python, Rust, C), demonstrating that the specification is language-agnostic, converges through independent implementation, and produces conformant engines in as few as 3,122 lines of code operating within 11 megabytes of memory. The full progressive spectrum operates within the resource budget of a single-board computer with zero build infrastructure.

---

## 1. Introduction

A server-rendered HTML string is indifferent to the attributes it carries. A server that resolves a database query and populates an HTML template doesn't care whether that template contains declarative client-side attributes — the attributes are just characters in a string. The server's job is to resolve data and produce a complete representation. The client's job is to interpret what it receives. This separation — behavior embedded in a representation that only activates at the destination — is what REST calls code-on-demand. Dr. Fielding made it the only optional constraint in the style.

This paper explores what happens when it is no longer optional, but progressive: each layer of client capability building on the previous, from declarative attributes to scoped scripts to pushed code to authenticated data channels to WebAssembly binaries — all mediated by the same initial representation, all authorized by the server, none requiring the previous layer to be abandoned.

The five mandatory constraints (client-server, statelessness, cacheability, uniform interface, layered system) produced the properties that made the web successful: scalability, independent deployment, simplicity, and modifiability. The optional sixth was adopted in practice. JavaScript became ubiquitous. But its architectural implications were not explored progressively: code-on-demand was treated as a binary capability, present or absent, rather than as a spectrum of server-mediated client extension.

As client-side JavaScript matured, a class of applications emerged that prioritized rich interactivity: client-rendered interfaces, client-managed routing, client-side state, with the server providing structured data through API endpoints. This approach produced capable applications and a productive ecosystem.

It also shifted architectural authority from the server to the client. The server no longer controlled the representation, the interaction surface, or the code the client executed. The trade-off was accepted in exchange for instant navigation, optimistic updates, persistent client state, and rich interactive patterns that server-rendered HTML alone could not provide.

The architectural style presented here seeks not to critique the applications founded upon the prevailing technique. Rather, it observes that the design space within REST's constraints contains a progressive path that was not explored, one where code-on-demand is not binary (either the client runs no code or all the code) but a layered spectrum, server-mediated and independently adoptable.

The interactivity that motivated the client-authoritative approach becomes achievable along this path without the architectural concessions it required. The absence of this path from the design space was not a limitation of REST's constraints. It was an unexplored region within them.

Carson Gross, in *Hypermedia Systems* (2023), demonstrated a portion of this space: declarative HTML attributes that achieve interactive patterns without imperative JavaScript. The work presented here extends this observation across the full spectrum, from declarative attributes to WebAssembly computation, mapping the architectural space that REST's constraints permit when code-on-demand is explored to its progressive extent.

### 1.1 What This Paper Examines

The individual technologies are established. Server-rendered HTML has existed since the web's inception. WebSocket communication is mature. WebAssembly runs in production at scale. Code-on-demand was identified as a REST constraint in 2000. What has not existed is their *composition into a unified architecture derived from first principles*, one where each capability is formally layered, independently adoptable, and mediated by the RESTful representation.

Specifically, the PRESTO style introduces:

**Progressive code-on-demand.** A formal layering of client-side capability (Layers 0-6) where each layer is independently adoptable, the default is zero JavaScript, and the architecture supports a continuous spectrum from static hypermedia to native-speed client computation.

Existing approaches to code-on-demand tend toward two patterns: frameworks that require a client-side runtime for any functionality (coupling the simplest page to the most complex), and server-driven libraries that intentionally constrain their scope to a single mode of enhancement.

The progressive model provides neither a mandatory runtime nor a single mode, but seven independently-adoptable layers, independently selectable within a single application. The hypermedia-first philosophy demonstrated by declarative attribute libraries serves as the foundation; the layers beyond (pushed code, authenticated channels, binary delivery, full client applications) extend it without replacing it.

**Representation-mediated extensions.** The REST representation (HTML) explicitly authorizes non-RESTful extensions by embedding WebSocket tokens, channel credentials, and executable code. The client discovers capabilities by examining the representation: HATEOAS operating at the level of protocol negotiation, not just link-following. The REST representation is the root of authority. Every extended capability, whether a persistent connection, server-delivered code, a scoped data channel, or a binary delivery, traces its authorization to the initial HTTP response. The paths through which authority extends vary by use case, but the invariant holds: no extension exists that the representation did not mediate.

**Server-authoritative client applications.** Server-delivered code that creates rich interactive applications where the server controls what code runs, what data is accessible, and what compute capabilities exist. Different clients receive different capabilities based on context known to the server, decided at resolution time rather than build time.

**Latent binding as an architectural property.** The formal recognition that scripts executing after a complete HTML document is assembled can reach any element without state management, component communication patterns, or hydration, because the document *is* the shared state. This property is derived from REST's complete-representation constraint and eliminates entire categories of complexity that arise when the client constructs the document rather than enhancing it.

The constraints also permit non-RESTful channels to be scoped in time as well as in capability. A WebSocket that opens, delivers a binary, and closes is not prescribed by the architecture but is consistent with it.

The individual technologies are established. Their composition under a unified set of constraints derived from REST is what this paper examines.

### 1.2 Style, Specification, Syntax, and Implementation

Once constituted, an architecture is independent of its reasons for being. An architecture is the realization of an architectural design and not the design itself. To evaluate an architectural design, we examine the rationale behind the constraints it places on a system and compare the properties derived from those constraints to the target application's objectives. This means clarity requires distinguishing the levels of abstraction involved. The following layers are present in this work, and their separation is important for evaluating the design on its own terms.

**The Architectural Style (PRESTO)** describes the constraints and the properties they appear to induce. Extending the code-on-demand constraint Fielding identified into a progressive spectrum yields a coherent set of additional constraints: representation-mediated extension, granted capability, and monotonically increasing layers.

**The Specification (htxlang)** serves to advance a more precise description of the architectural style indicated within this work. It is a language-agnostic description of how a server should operate within a HATEOAS environment with progressive code-on-demand. It defines:

- *The rendering pipeline* — the ordered sequence of resolutions (includes → components → data queries → expression evaluation → placeholder hydration → layout composition) that resolves a template into a complete HTML representation
- *The module contract* — what an extension can register (middleware, context providers, channel handlers, template processors, content adapters, mutation handlers), the lifecycle guarantees the engine provides (boot order, error isolation, middleware chaining), and the optional manifest system that allows modules to declare their intended capabilities for sandboxed enforcement
- *The mutation protocol* — two-phase prepare/execute with signed action tokens, replay protection, and context scoping
- *The real-time protocol* — WebSocket ceremony (JWT authentication, upgrade, channels, pub/sub), the two-message WASM delivery format (JSON manifest + binary frame), channel token issuance and validation, and the `onMessage`/`onBinary` extension hooks
- *The progressive layer model* — the formal definition of Layers 0-6, their properties, their constraint costs, and the authority chain that connects them to the REST representation

The specification is not bound to any programming language. Conformant engines have been independently implemented in TypeScript, Go, Elixir, Python, Rust, and C, each passing the same verification suite. This cross-language validation is not incidental; it is the mechanism by which the specification discovers its own completeness. Each implementation, reasoning from the same constraints in a different language and paradigm, reveals consequences that previous implementations missed. The specification is then amended, and the next implementation receives a more complete set of rules.

**The Syntax (.htx file format)** is the concrete expression of the specification — the developer-facing language:

- *Directives* declare data requirements and control flow — content type, query filters, ordering, pagination
- *Expressions* evaluate dynamic values — field references, conditionals, pipe-based transformations
- *Placeholders* mark positions for hydrated content within template blocks
- *Composition* assembles pages from reusable parts — components with props and slots, includes for partials, layouts for page wrappers
- *Behavior* binds client-side scripts scoped to their component's DOM element
- *Mutations* declare what writes a page can perform, gated by signed action tokens
- *Auth* conditionally renders content based on authentication state

The syntax is declarative — it describes *what* the page needs, not *how* to resolve it. A template file is simultaneously a route declaration, a data query, a rendering template, a mutation handler, and a behavior binding. This colocation is a design choice of the syntax, not a requirement of the specification. An alternative syntax could separate these concerns and still conform to the specification's pipeline and contracts.

The syntax bridges three audiences:

1. **The developer** — who writes `.htx` files, declaring intent in a superset of HTML
2. **The engine** — which resolves them, consuming every directive and expression through the pipeline
3. **The user agent** — which receives the product: a plain HTML string with no trace of HTX

The engine is a *resolver*, not a compiler. A compiler translates from one language to a fundamentally different target (C → machine code). The HTX engine resolves a decorated form of HTML into a pure form of HTML — the input medium and the output medium are the same. Each stage of the pipeline (include resolution, component resolution, expression evaluation, placeholder hydration, layout composition) removes one layer of declarative augmentation until only standard HTML remains.

This has a formal consequence: the HTX syntax is consumed entirely at resolution time. Nothing leaks to the client. The user agent cannot inspect, depend on, or be coupled to the template structure. It receives a self-describing HTML document — the same representation format that every browser has understood since 1993. The fact that it was generated from an `.htx` template is invisible to the client, which is precisely why the RESTful contract is preserved: the representation is complete, standard, and self-contained.

**The Implementation (@htx/engine)** is the reference implementation of the specification, currently in TypeScript running on the Bun runtime. It uses:

- Bun's native SQLite driver for content storage
- Bun's native WebSocket for real-time connections
- The `jose` library for JWT signing and validation
- A hand-written lexer, parser, and evaluator for the expression engine
- AssemblyScript for compiling WASM modules (optional, for compute-heavy workloads)

These are implementation decisions, not specification requirements. The specification says "evaluate expressions" — the engine uses a recursive descent parser. Another engine could use a PEG parser, a regex-based evaluator, or compile expressions to native code. The specification says "authenticate WebSocket connections with short-lived tokens" — the engine uses HS256 JWTs. Another engine could use RS256, Ed25519, or opaque tokens validated against a database.

The distinction matters at each level. The PRESTO style can be evaluated independently of any specification, as a set of constraints and properties. The htxlang specification can be evaluated independently of its current implementation; a conformant engine in a different language would produce the same architectural properties. And the implementation can evolve without changing the specification or the style.

---

## 2. Architectural Constraints

An architectural style is defined by its constraints. Each constraint is a deliberate restriction on the system's design that induces desirable properties.

### 2.1 Client-Server

The client and server have distinct roles. The server is authoritative over data, templates, and application logic. The client is responsible for presentation and user interaction. This separation allows each to evolve independently.

**HTX application:** Templates are server-side files. The server resolves all data queries, evaluates all expressions, and composes the complete HTML response. The client receives a finished document. There is no "shared" rendering logic between client and server.

### 2.2 Statelessness

Each request from client to server contains all information necessary to understand the request. The server does not store client session state between requests.

**HTX application:** Action tokens (signed JWTs) encode the full context of a mutation — what action, what content type, what record — in the token itself. The server validates the token without consulting a session store. WebSocket connections use short-lived JWTs (60 seconds) for authentication, with stateless token refresh via a middleware endpoint.

### 2.3 Cacheability

Responses must implicitly or explicitly define themselves as cacheable or non-cacheable. When a response is cacheable, the client can reuse it for equivalent future requests.

**HTX application:** Because every response is a complete HTML representation, HTTP caching works at every level — browser cache, CDN, reverse proxy — without coordination. There is no cache invalidation problem caused by partial representations or client-side state that may be stale.

### 2.4 Uniform Interface

The uniform interface between components is the central feature that distinguishes REST from other network-based architectural styles. It simplifies architecture and improves visibility of interactions.

**HTX application:** The `.htx` template file is the uniform interface. One file declares the route, the data it needs, the HTML it renders, and the mutations it supports. There is no separate router configuration, no controller class, no view model. The template is the complete description of the resource's representation.

### 2.5 Layered System

The architecture is composed of hierarchical layers, each constrained to interact only with its immediate neighbors. This enables intermediaries (proxies, gateways, load balancers) and encapsulation of legacy systems.

**HTX application:** The engine is composed of discrete layers — Router, IncludeResolver, ComponentResolver, DSLParser, Executors, ExpressionEngine, Hydrator, LayoutResolver — each operating on the output of the previous. Modules extend the system by registering into specific layers (middleware, context providers, template processors) without knowledge of the full pipeline.

### 2.6 Code-on-Demand (Extended)

The original constraint allows servers to extend client functionality by transferring executable code. When this constraint is explored not as a binary option but as a progressive spectrum, a design space emerges in which each degree of extension makes specific properties available. These properties are not prescribed by the architecture. They emerge from the intersection of code-on-demand with the other five constraints.

| Degree of Extension | Available Property | What Becomes Negotiable |
|---|---|---|
| None | Complete representation | Content, navigation, mutation through hypermedia |
| Declarative attributes | Client-discovered behavior | Enhanced interactions without custom code |
| Scoped code execution | Latent binding | Behavior across disparate components of the assembled document |
| Server-delivered code | Granted capability | Server-authoritative client logic, differentiated by context |
| Authenticated data channels | Scoped data negotiation | Client-server data exchange within defined boundaries |
| Autonomous client navigation | Client state continuity | Persistent experience across state transitions |
| Binary execution | Native computation | Performance-critical operations at near-native speed |

Each degree of extension is independently adoptable. A resolved representation may utilize the properties available at one degree for one region of its affordance surface and a different degree for another, within the same application. The degrees are not sequential steps. They are regions of the design space.

This is the extended constraint: **progressive code-on-demand**. The system supports a monotonically increasing spectrum of client capability, where each degree adds properties without removing those available at lesser degrees. Moving further into the design space is purely additive. The developer gains capability without surrendering what the lower degrees provide.

---

## 3. The HTX Model

### 3.1 Templates as the Unit of Composition

In HTX, the `.htx` file is the atomic unit of a web application. A single file serves as:

- **Route declaration** — the file's path in the filesystem determines its URL
- **Data query** — directives like `<htx:type>` and `<htx:where>` declare what data the page needs
- **Rendering template** — HTML with expression placeholders (`{{ }}` and `__field__`) defines the output
- **Mutation handler** — `<htx:action>` directives declare what writes the page can perform
- **Client behavior** — `<htx:script>` blocks define scoped JavaScript that runs after rendering

This colocation is intentional. When a developer opens a file, they see the complete truth about that route — what data it reads, what HTML it produces, what mutations it accepts, what client behavior it includes. There is no need to trace through router configurations, controller classes, service layers, or component trees.

#### Routing Escape Hatches

The filesystem is the *default* route source, not the only one. The architecture provides three escape hatches for routing beyond the filesystem:

**Middleware routing** — Modules register middleware that intercepts requests before the filesystem router executes. The ChannelMiddleware claims `/api/channel/*`. The authentication middleware claims `/api/auth/*`. The tenant resolver middleware routes by subdomain. These are programmatic routes defined in module code, not `.htx` files on disk. The module contract explicitly supports this: middleware runs first, and any middleware can short-circuit the pipeline by returning a response without calling `next()`.

**Client-side routing** — At Layer 5, a pushed SPA implements its own router (typically hash-based). The filesystem provides the entry point (one `.htx` file); the client handles all subsequent navigation internally. The server sees one route; the client sees many.

**Dynamic route sources** — The specification defines a route source contract that allows modules to resolve URLs to template strings when the filesystem has no match. The engine iterates registered sources when the filesystem router returns null. The first source to produce a result wins. The template string enters the same resolution pipeline as a filesystem template — includes, components, expressions, layouts, and data queries all work identically.

This has a critical property: **composition is preserved across the boundary**. A database-stored template can reference filesystem resources — shared layouts, shared components, shared partials. The page-level route is dynamic; everything it references resolves from the filesystem. The resolution pipeline doesn't know or care whether the template came from a file or a database.

The implications for multi-tenancy are significant. Tenants can create custom pages without filesystem access, using the same declarative syntax available to file-based templates. The filesystem provides the base template set; the database provides tenant customization. The two coexist, with the filesystem taking priority — a developer can always "pin" a route by creating a file, overriding any dynamic source.

In each case, the filesystem remains the baseline — the simplest, most visible, most predictable routing model. Escape hatches exist for cases where filesystem routing is insufficient, but they are opt-in and do not disturb the default.

### 3.2 The Server as Authority

The server is the single authority over three concerns:

1. **What the client sees** — the server renders complete HTML representations
2. **What the client can do** — action tokens scope mutations; channel tokens scope data access
3. **What code the client runs** — Client State Transfer pushes executable code; the client does not choose what to download

This authority model has security implications. In a thick-client architecture, the client decides what API calls to make, what routes to render, and what code to execute. Security is enforced by API-level authorization checks — the server must validate every possible client action because the client is untrusted.

In HTX, the server controls the entire interaction surface. If a tenant shouldn't have access to a feature, the server simply doesn't render the template, doesn't push the module, doesn't issue the channel token. The absence of capability is the security model. There is nothing to exploit on the client because the client never received the capability.

### 3.3 Latent Binding

When an `htx:script` block is processed, the ComponentResolver extracts it from the template, wraps it in an Immediately Invoked Function Expression (IIFE), and places it before `</body>` in the final HTML. The script executes in the browser after the entire document has been parsed, laid out, and painted.

This timing is architecturally significant. By the time the script runs:

- The layout has been applied (navigation, sidebars, footers exist)
- All components have been resolved (sibling components are in the DOM)
- All data has been hydrated (expression values are rendered)
- The document is interactive (links and forms work)

The script enhances a complete, functioning document. It does not construct one. This is progressive enhancement in the original sense — the document works without the script. The script adds behavior that HTML alone cannot express.

Because the entire DOM exists when scripts execute, there is no "how do I communicate with a sibling component" problem. The document *is* the shared state. A script in the content area can query the sidebar. A portal component can write to a layout element. The architectural constraint that produces this property is the same one that makes REST work: the server sends complete representations.

### 3.4 REST as the Mediating Layer

Fielding's description of HATEOAS — Hypermedia as the Engine of Application State — defines the central principle of REST:

> The model application is therefore an engine that moves from one state to the next by examining and choosing from among the alternative state transitions in the current set of representations.
> — Fielding, §5.3.3, p. 103

In a web browser, this is concrete: the server sends HTML containing links and forms. The user examines them and chooses a transition. The browser follows it. The server sends the next representation. At no point does the client rely on knowledge obtained outside the current representation.

HTX preserves this principle. But it also extends the client with capabilities that REST cannot express: persistent bidirectional communication, binary data delivery, pushed executable code. These extensions use WebSocket — a protocol that violates REST's statelessness constraint (the connection is persistent), does not return representations (it exchanges JSON messages), and does not use the uniform interface (no URIs, no HTTP methods per message).

This raises an architectural question: if HTX uses non-RESTful protocols, is the architecture still RESTful?

Fielding addressed this directly in a 2008 clarification of the REST constraints:

> A REST API should be entered with no prior knowledge beyond the initial URI and set of standardized media types. From that point on, all application state transitions must be driven by client selection of server-provided choices that are present in the received representations or implied by the user's manipulation of those representations. The transitions may be determined (or limited by) the client's knowledge of media types and resource communication mechanisms, both of which may be improved on-the-fly (e.g., code-on-demand).
> — Fielding, "REST APIs must be hypertext-driven" (2008)

Two phrases are critical here: "server-provided choices that are present in the received representations" and "improved on-the-fly (e.g., code-on-demand)." HTX satisfies both. The WebSocket capability is a server-provided choice present in the received representation. The client's ability to use it is improved on-the-fly via code-on-demand (htx:script).

The answer lies in how the non-RESTful channel is established. The server embeds the WebSocket endpoint URL and a short-lived authentication token directly into the HTML representation — as expression values resolved at render time. The client does not discover them through an API specification, a configuration file, or a hardcoded constant. The server placed them in the hypermedia document, and the client followed them — exactly as HATEOAS prescribes.

The WebSocket is a **state transition advertised by the representation**. The client examines the current representation, finds the WebSocket capability embedded in it, and chooses to activate it. This is HATEOAS operating at a higher level: not just "here are links you can follow" but "here is an extended capability you can activate."

#### The Authority Chain

The relationship between REST and the WebSocket extension forms a strict authority chain. The REST representation contains the WebSocket credentials. Code-on-demand (delivered within the representation) activates the connection. The WebSocket enables extended capabilities: pushed code, binary delivery, and channel subscriptions. Each layer derives its authority from the one above:

1. **The REST representation is the entry point.** Every interaction begins with an HTTP request that returns a complete HTML document. HATEOAS is fully satisfied at this level.

2. **Code-on-demand is authorized by the representation.** The server chose to include `htx:script` in the HTML. If the server omits it, no client code executes. The representation controls what extensions exist.

3. **The WebSocket is authorized by code-on-demand.** The script that opens the WebSocket was delivered by the server as part of the representation. The token that authenticates it was minted by the server and embedded in the HTML. If the server doesn't render the token, the WebSocket cannot authenticate.

4. **Extended capabilities are authorized by the WebSocket.** What modules the server pushes, what channel tokens it issues, what WASM binaries it delivers — all flow through the authenticated WebSocket that was opened by code that was embedded in the representation that was returned by the REST interaction.

The REST layer is never abandoned. It remains the foundation. The page works without the WebSocket — content is visible, links function, forms submit. The non-RESTful extension is a *progressive addition* mediated by the RESTful baseline, not a replacement of it.

#### The Escape Hatch Model

This architecture can be understood as an escape hatch pattern:

- **REST is the default.** Complete representations, cacheable, stateless, self-describing.
- **The escape hatch is scoped.** The REST representation determines whether it exists (by including or omitting the WebSocket token).
- **The escape hatch is progressive.** Pages that don't need extended capabilities simply don't render the token. No WebSocket opens. The page is pure REST.
- **The escape hatch can be closed.** Ephemeral WASM delivery opens the WebSocket, receives the binary, and immediately closes the connection. The non-RESTful channel existed for milliseconds.
- **The page degrades without the escape hatch.** If JavaScript fails, if the WebSocket is blocked by a firewall, if the WASM module doesn't load — the server-rendered HTML is still there. The content is still readable. The forms still work.

This is distinct from thick-client architectures where the non-RESTful protocol (typically a JSON API) is the *primary* interface. In a React application, the REST-like API calls are not mediated by a hypermedia representation — they are hardcoded in the client bundle. If the API is unreachable, nothing renders. There is no graceful degradation because there was no baseline representation to degrade to.

In HTX, the baseline representation is always the HTML. Everything else is an extension that the representation itself authorizes.

#### Fielding's Code-on-Demand, Reconsidered

Fielding identified code-on-demand as the only optional constraint in REST, noting that it "reduces visibility" — the client's behavior is no longer fully determined by the representation alone. This is why he made it optional: the trade-off between extended functionality and reduced visibility is application-dependent.

HTX makes code-on-demand non-optional but *layered*. The visibility concern is addressed by the progressive model: at Layer 0, visibility is total (the representation fully describes the client's behavior). Each subsequent layer reduces visibility incrementally. A developer choosing Layer 2 (htx:script) accepts a small visibility reduction. A developer choosing Layer 5 (full SPA) accepts a large one.

Critically, the visibility reduction is *per-page*, not per-application. A content page at Layer 0 has full REST visibility. An admin dashboard at Layer 5 has reduced visibility. Both exist in the same application. The architecture does not force a global choice — it allows local decisions about the REST-visibility trade-off.

---

## 4. Progressive Code-on-Demand: Specification

The following sections describe how the htxlang specification realizes each degree of extension defined in §2.6. The architectural properties are restated here in terms of the specification's concrete mechanisms. These mechanisms are implementation choices that satisfy the architectural constraints; other specifications could satisfy the same constraints through different mechanisms.

### 4.1 Layer 0: Hypermedia

The default. A `.htx` template renders to HTML. No JavaScript is sent to the client. The page is a complete hypermedia document — links for navigation, forms for mutation, semantic markup for structure.

**Properties:** Maximum cacheability. Universal accessibility. Zero client-side failure modes. Search engine indexable. Works on any device that renders HTML.

**Constraint cost:** No dynamic behavior. No real-time updates. No client-side state.

### 4.2 Layer 1: Declarative Enhancement (htmx)

HTML attributes declare interactive behavior: `hx-get`, `hx-post`, `hx-swap`, `hx-trigger`. The htmx library (14KB gzipped) interprets these attributes and makes AJAX requests that swap HTML fragments into the page.

**Properties:** Interactive pages without custom JavaScript. The server still renders HTML — now in fragments as well as full pages. The uniform interface is preserved: requests return representations, not data.

**Constraint cost:** Requires the htmx library (code-on-demand). Cannot express behavior that isn't reducible to "request HTML, swap it somewhere."

### 4.3 Layer 2: Scoped Behavior (htx:script)

Component-scoped JavaScript executes after the document is assembled. Each script receives an `el` binding — a reference to its component's root DOM element. Scripts are extracted at render time and injected as IIFEs before `</body>`.

**Properties:** Latent binding — scripts can reach any element in the document. Component isolation — each script's `el` is scoped via `data-htx-id`. Progressive enhancement — the page renders before scripts execute.

**Constraint cost:** Custom JavaScript runs on the client. The server no longer has full control of client behavior. However, the code is static — defined in the template, not downloaded dynamically.

### 4.4 Layer 3: Client State Transfer

The server pushes executable JavaScript to the client over an authenticated WebSocket connection. The client executes it via `new Function('ws', 'el', code)`. The pushed code manages local state within a scoped container and syncs state back to the server.

**Properties:** Server-authoritative code delivery — the server decides what code the client runs. Dynamic capability — different users can receive different modules. Bidirectional state sync over WebSocket.

**Constraint cost:** The client executes server-provided code. The trust model shifts: the server must be trusted not to push malicious code (which it already is, since it controls all HTML). The client's execution environment is no longer fully predictable from the template alone.

### 4.5 Layer 4: Authenticated Islands

Pushed JavaScript opens a second HTTP connection to module-level JSON APIs. A scoped channel token (JWT) gates access. The ChannelMiddleware validates tokens and routes requests to registered ChannelHandlers.

**Properties:** REST-style data access from pushed code. Token scoping — a channel token for module A cannot access module B. Standard HTTP debugging (Network tab). Cacheable JSON responses.

**Constraint cost:** A second HTTP connection (in addition to the WebSocket). The client now fetches data independently of template rendering. This approaches — but does not reach — the thick-client model, because the server still controls what code makes the requests and what tokens grant access.

### 4.6 Layer 5: Full SPA

The pushed code implements a complete client-side router. All navigation happens without page reloads. Data is fetched via HTTP channels or WebSocket RPC.

**Properties:** Preserved client state across navigations. Smaller per-navigation payloads (JSON vs full HTML). Two transport options: HTTP (cacheable, debuggable) or WebSocket (low latency, optimistic updates).

**Constraint cost:** The initial page load is an empty shell — SEO requires the server-rendered version. Back/forward navigation must be managed by the client. The client is now responsible for rendering — though the server still controls what code it runs.

### 4.7 Layer 6: Native Compute (WASM)

The server delivers WebAssembly binaries over WebSocket. A two-message protocol — JSON manifest (text frame) followed by raw `.wasm` bytes (binary frame) — delivers the module. JS glue code bridges WASM exports to the DOM.

**Properties:** Near-native computation speed in the browser sandbox. Binary delivery (33% smaller than base64). Client-side caching via IndexedDB with version-hash invalidation. Combinable with any JavaScript library (Three.js, Canvas, Web Audio).

**Constraint cost:** WASM modules require compilation (AssemblyScript, Rust, C). The client performs significant computation. However, the server still controls delivery — it decides which WASM modules to push, and the WebSocket ceremony gates access.

### 4.8 Granted Capability, Not Transferred Control

At Layers 5 and 6, the architecture provides capabilities comparable to thick-client frameworks: client-side routing, optimistic state management, native-speed computation. A natural question arises: does progressive code-on-demand eventually converge with the React model?

It does not. The convergence is in *capability*, not in *authority*. Understanding why requires distinguishing between two fundamentally different models of client empowerment.

In the thick-client model, the server *transfers control* to the client. A React application ships its entire codebase — every route definition, every component, every API call, every rendering path — to every client, regardless of who the user is or what they need. Once the bundle arrives, the client is autonomous. It decides what to render, what data to fetch, and what state transitions to make. The server has relinquished architectural authority; it retains only data-level authorization (API endpoint checks). If the client has the code, it has the capability. The transfer is permanent and total.

In the HTX model, the server *grants capability* to the client. The distinction is precise:

- **At Layer 0**, the server grants the capability to view content (by sending HTML).
- **At Layer 2**, the server grants the capability to execute scoped behavior (by embedding htx:script in the representation).
- **At Layer 3**, the server grants the capability to run specific logic (by pushing a named module over WebSocket). The client did not request a URL — the server decided what code to send.
- **At Layer 4**, the server grants the capability to access specific data (by issuing a scoped channel token alongside the pushed code). The token is short-lived, module-scoped, and revocable.
- **At Layer 5**, the server grants the capability to route and render autonomously (by pushing a full SPA). But the SPA's data access is still gated by channel tokens or WebSocket RPC — the server controls what the autonomous client can see.
- **At Layer 6**, the server grants the capability to compute at native speed (by delivering a WASM binary). The binary was chosen by the server. A different user might receive a different binary — or none at all.

At every layer, the grant is:
- **Selective** — different users receive different capabilities based on role, subscription, or runtime conditions
- **Scoped** — channel tokens limit what data the granted code can access; module manifests limit what the granted module can register
- **Revocable** — tokens expire; WebSocket connections can be closed; the next page load may push different code
- **Auditable** — the server logs what it pushed, what tokens it issued, what manifests it enforced

None of this is true in the thick-client model. A React bundle is not selective (every user gets the same code). It is not scoped (the client has all routes and all API calls). It is not revocable (the code is cached in the browser). It is not auditable at the architectural level (the server doesn't know what the client is doing with the code it shipped).

This is not a difference of degree. It is a difference of kind. Transferring control and granting capability are architecturally distinct operations. The thick-client model transfers control once and hopes the API layer enforces boundaries. The HTX model grants capabilities incrementally, each grant scoped and revocable, with the server maintaining authority at every step.

This asymmetry is not a limitation of the progressive model. It is its defining property. The server remains the authority at every layer. The distance between Layer 0 and Layer 6 is a distance of granted capability, not of transferred control.

#### The Boundary of Granted Autonomy

The grant model raises a terminal question: what happens when the granted capability is sufficient for the client to operate outside the constraints entirely?

At the highest degree of extension, the server may grant the client autonomous navigation, full data access within a scoped channel, and native computation. The client operates independently. It renders its own interfaces, manages its own state transitions, computes at native speed. The server's constraints are no longer active in the client's execution. The client has been granted enough capability to transcend the style that granted it.

This is not a violation. It is the consummation of the grant model.

Every constraint was satisfied in the act of granting. The representation was complete. The extension was mediated. The capability was scoped, time-limited, and revocable. The server chose to grant this degree of autonomy to this client in this context. A different client, a different context, a different request might receive a different grant. The server's authority is expressed through the choice of what to grant, including the choice to grant full autonomy.

What distinguishes this from the client-authoritative model is that the autonomy was granted, not assumed. The client did not seize control. The server delegated it. And delegation, unlike transfer, preserves the delegator's authority to make a different choice on the next interaction.

The boundary between client autonomy and server authority remains negotiable. The channel token expires. The next page load produces a new resolved representation. The server reasserts authority at every interaction boundary. The client's autonomy exists between those boundaries, not in spite of them.

At the extreme, the granted capability could include the architecture itself: a client-side resolution engine capable of composing templates, evaluating expressions, and mediating its own extensions. The server seeds the client with the ability to be a server. Code-on-demand at its terminal expression: the demand was for the architecture.

This boundary condition is a property of any sufficiently complete grant-based style. A style that can express "grant the client the capability to transcend me" is more complete than one that cannot. The constraints are not abandoned at this boundary. They are fulfilled.

### 4.9 Architectural Encapsulation: Inner Styles Within the RESTful Boundary

The progressive code-on-demand model reveals a property more fundamental than the layered spectrum itself: the REST representation, because it is complete and self-describing, can serve as the enclosing boundary for any arbitrary client-side architecture — including architectures whose own constraints are incompatible with REST.

#### 4.9.1 The Encapsulation Principle

A server-rendered HTML document is a complete representation. Every element in the DOM exists because the server resolved it. When the server renders an empty `<div>` with a unique identifier and a `<script>` that bootstraps a client-side framework into that element, two architectures coexist in the same document:

- The **outer architecture** (REST) governs the HTTP exchange, the completeness of the representation, the cacheability of the response, and the server's authority over what the client receives.
- The **inner architecture** (whatever the script instantiates) governs the interaction model within its bounded DOM sub-tree.

The inner architecture inherits the outer architecture's properties at the boundary but is not constrained by them internally. A React component tree mounted into a server-rendered div operates as a distributed object (DO) architecture — components as objects, props as messages, a virtual DOM as the shared address space — entirely within the region the REST representation allocated for it. The DO model's constraints (shared mutable state, identity-based updates, synchronous message passing) apply within the sub-tree. The REST model's constraints (statelessness, complete representations, uniform interface) apply at the HTTP boundary.

This is not a workaround. It is the natural consequence of REST's complete-representation constraint. If the representation is complete, it may contain anything — including the bootstrapping instructions for an alternative architectural style. The representation is the delivery vehicle; what activates within it is a granted capability.

#### 4.9.2 Why Nesting Direction Matters

The encapsulation is asymmetric. A distributed object architecture can be nested within REST. REST cannot be nested within a distributed object architecture in a way that preserves REST's induced properties.

The reason is structural. REST's properties — cacheability, scalability, independent deployability, universal accessibility — are induced by constraints on the **outermost** interaction: the exchange between client and server. If the outer architecture is REST, these properties are guaranteed at the system boundary regardless of what operates within the representation. An intermediary (CDN, proxy, cache) can operate on the response without knowledge of the inner architecture. The representation is cacheable whether it contains a React application or a static paragraph.

If the outer architecture is the DO model — as in a conventional React application — the HTTP exchange serves a minimal shell (an empty `<div id="root">` and a script bundle). The representation is not complete. The content depends on subsequent API calls made by the client-side object graph. Cacheability is compromised: caching the shell is trivial but useless; caching the API responses requires per-endpoint strategies that the client controls. Server authority is transferred: the client determines what to render, what data to request, what transitions to make. The REST properties that depend on the outer boundary are structurally absent because the outer boundary does not enforce REST constraints.

This is why server-side rendering (SSR) in React is a compensating mechanism rather than a restoration of REST. SSR produces a complete HTML document — satisfying the representation constraint momentarily — but the client immediately discards the server's authority through hydration, replacing the server-rendered DOM with a client-controlled object graph. The REST-compatible representation existed for the duration of the initial paint. The architectural properties it could have induced (cacheability of the complete page, server authority over the interaction surface, intermediary transparency) are abandoned the moment the React runtime assumes control.

The asymmetry is therefore formal: the outer architecture's constraints dominate. Nesting DO within REST preserves REST's properties while gaining DO's interactivity within a bounded scope. Nesting REST within DO preserves nothing — the outer architecture's constraints (or lack thereof) determine the system's properties.

#### 4.9.3 React as a Special Case, Not a Counterexample

This reframes the relationship between PRESTO and React. The progressive code-on-demand model does not oppose React. It *encloses* it.

A React component mounted into a scoped region of a server-rendered HTML document is a Layer 2-5 capability operating within the REST boundary. The server decided that this user, on this page, at this time, receives a React island in a specific DOM location. The decision was made at resolution time, not build time. A different user might receive a simpler component, a different framework, or no client-side code at all. The representation carried the bootstrapping instructions as part of its complete, self-describing content. The React instance that activates within it is a granted capability — selective, scoped, revocable, and auditable.

In this model, React's strengths are preserved: declarative component composition, efficient DOM diffing, rich interactivity. React's weaknesses are dissolved: there is no empty shell problem (the page is complete before React mounts), no hydration mismatch (the React instance mounts fresh into a prepared region rather than attempting to reclaim server-rendered markup), no global complexity tax (pages that don't need React don't pay for it), and no loss of server authority (the server controls whether React is delivered at all).

The properties that React cannot independently produce — complete initial representations, server-authoritative capability control, per-page architectural selection, graceful degradation to pure HTML — are provided by the enclosing REST architecture. React does not need to produce them. It inherits them from the boundary it operates within.

#### 4.9.4 The Dissolution of Compensating Mechanisms

The React ecosystem has developed an extensive set of mechanisms that compensate for properties lost when the DO model operates as the outer architecture:

| Lost Property | Compensating Mechanism | Complexity Introduced |
|---------------|----------------------|----------------------|
| Complete representations | Server-Side Rendering (SSR) | Dual execution environments, serialization constraints |
| Server authority over rendering | Hydration | Mismatch bugs, "uncanny valley" of interactivity |
| Cacheability at the page level | Incremental Static Regeneration (ISR) | Cache invalidation strategies, stale content windows |
| Server-authoritative data flow | React Server Components (RSC) | Client/server component boundaries, serialization rules |
| Efficient initial payload | Code splitting, tree shaking | Build tooling complexity, chunk management |
| Streaming content delivery | Streaming SSR with Suspense boundaries | Fallback UI management, loading state coordination |

Each mechanism reintroduces — partially and with additional complexity — a property that REST induces natively through its constraints. SSR recovers complete representations but requires maintaining two rendering environments. Hydration reconnects client behavior to server-rendered markup but introduces an entirely new failure mode. ISR recovers cacheability but adds temporal uncertainty about content freshness. RSC recovers server-authoritative data flow but partitions the component model into two categories with different rules.

These are not problems to be solved within the DO model. They are symptoms of an inverted architectural relationship. When the DO model is enclosed by REST rather than enclosing it, the properties are present by default:

- **Complete representations** — the server sends a finished HTML document. No SSR is needed because server rendering is the baseline, not an optimization.
- **No hydration** — client-side code mounts into prepared regions of the complete document. There is nothing to reconcile because the server's representation and the client's mount target are not competing renderings of the same content.
- **Native cacheability** — the complete HTML response is cacheable by any HTTP intermediary. No ISR strategy is needed because the representation is self-contained.
- **Server authority** — the server decides what code, what data, and what capabilities the client receives. No server component model is needed because the server already controls the representation.
- **Minimal payload** — pages that need no client-side code send no client-side code. No tree shaking is needed because there is no global bundle to reduce.

The progressive code-on-demand model does not solve React's problems. It dissolves them by establishing the correct architectural encapsulation: REST as the outer style, DO as the inner style when and where interactivity demands it, with the representation as the mediating boundary between the two.

#### 4.9.5 Generality of the Encapsulation

The principle extends beyond React. Any client-side architectural style — Model-View-ViewModel, Entity-Component-System, the actor model, a dataflow architecture — can be encapsulated within a REST representation, provided:

1. The server renders a complete document that includes the bounded region and bootstrapping instructions for the inner architecture.
2. The inner architecture operates within its allocated DOM sub-tree without depending on capabilities the representation did not provide.
3. The outer REST constraints (statelessness, cacheability, uniform interface) are satisfied at the HTTP boundary independently of the inner architecture's behavior.

The REST representation is the universal carrier. Because HTML is the representation format, and because HTML can contain arbitrary structure, script, and data attributes, the source representation can express the bootstrapping conditions for any client-side architecture that the web platform supports. The author of the representation — the developer writing the template — exercises authorial intent over what inner architecture is instantiated, where it is bounded, and what context it receives from the enclosing document.

The progressive layer model (Layers 0-6) is therefore not a ladder of specific technologies but a spectrum of *encapsulated architectural grants*. Each layer describes a class of inner architecture that the REST representation can carry:

| Layer | Encapsulated Style | Boundary |
|-------|-------------------|----------|
| 0 | None (pure hypermedia) | The full document |
| 1 | Declarative event-driven (htmx) | Attribute-annotated elements |
| 2 | Scoped imperative (htx:script) | Component DOM sub-trees |
| 3 | Server-pushed procedural (CST) | WebSocket-delivered closures |
| 4 | Channel-backed modular (Islands) | Token-scoped data regions |
| 5 | Distributed object (SPA/React) | Full client application mount |
| 6 | Native compute (WASM) | Binary execution sandbox |

At every layer, the REST boundary holds. The properties it induces — complete representations, server authority, cacheability, graceful degradation — are available because they are properties of the outer architecture, not the inner one. The inner architecture gains capability without the outer architecture losing its constraints.

This is the completing observation: PRESTO does not compete with React, or with any other client-side architecture. It provides the enclosing architectural context within which any of them can operate — bounded, granted, and mediated by the representation that carried them into existence on the client.

### 4.10 Client-Side Organization: Maps, Topologies, and Islands

When the server pushes code to the client — whether via Client State Transfer, authenticated islands, or full SPAs — a structural question arises: how does the client organize what it receives?

The answer emerges from the delivery model itself. The server delivers code as named units — a trading dashboard, a kanban board, a document browser. Each unit arrives with its own channel token, its own state, its own DOM target. These are not components in the React sense (composable render functions). They are *topologies* — self-contained units of delivered behavior that the server assembled and the client activates.

A **topology** is the unit of server-delivered code. It corresponds to what the server pushes: a named JavaScript bundle (or TypeScript, compiled at delivery time) that receives a DOM element, a WebSocket reference, a channel token, and a `channelFetch` function. The topology manages everything within its DOM boundary — rendering, state, event handling, server communication. It is the client-side expression of a single module's granted capability.

An **island** is a region within a topology. A trading dashboard topology might contain five islands: a price ticker, a portfolio summary, a chart, an order entry form, and an alerts panel. Each island renders independently and manages its own DOM subtree, but all five share the topology's store, channel token, and communication channel. Islands are not delivered separately — they are organized internally by the topology's own code.

A **map** is the page-level aggregate of all topologies. When multiple topologies are active on the same page — a navigation topology, a content topology, a notification topology — the map is their shared context. The map is not an explicit construct the developer creates. It is the emergent result of multiple topologies operating on the same document.

This hierarchy — map contains topologies, topologies contain islands — mirrors the delivery model. The server delivers topologies (one push per topology). The topology organizes islands (internal structure). The page collects topologies into a map (emergent aggregation). Each level has a different scope and a different actor:

| Level | Scope | Actor | Delivery |
|-------|-------|-------|----------|
| Map | Entire page | Emergent | N/A (the page itself) |
| Topology | One module's UI | Server-pushed | WebSocket, HTTP, or SSE |
| Island | One DOM region | Topology code | Internal organization |

The vocabulary is precise because the boundaries are real. A topology cannot reach into another topology's DOM (it only has a reference to its own element). An island cannot use another topology's channel token (tokens are scoped per module). The map provides a read path across topologies but not a write path — each topology writes only to its own state.

### 4.11 Two-Tier Reactive State

Within a topology, islands need to coordinate. The price ticker updates; the chart should redraw. An order fills; the portfolio should recalculate. The pattern is reactive state — mutations propagate to subscribers.

The architectural constraint is this: delivered code units must be able to coordinate state on the client — within a topology and across topologies — and signal state changes lazily to the server. The client is autonomous between syncs; the server is authoritative over persistence. This constraint follows from server-authoritative delivery (the server controls what code runs) combined with client autonomy (the client operates without waiting for the server between interactions).

What follows is the reference implementation's expression of this constraint. The specific mechanisms — reactive subscriptions, two-tier stores, leader-coordinated flush — are implementation decisions. A conformant engine could satisfy the same constraint with signals, observables, a single flat store, or CRDTs. The constraint is the coordination model; the implementation is one realization of it.

The **TopologyStore** is the first tier. Each topology creates a store initialized with a state shape. Islands subscribe to branches of the state tree and receive synchronous callbacks when values change. The reactive flow follows a specific sequence:

1. An island calls `store.set('items', newItems)` — the value updates in memory (instant)
2. The branch is marked dirty
3. All subscribers to 'items' are notified synchronously — in the same tick
4. A debounced sync timer starts (configurable, default 500ms)
5. If no further mutations occur within the quiet period, dirty branches flush to the server via the topology's channelFetch

Steps 1-3 are synchronous. An island that subscribes to 'items' re-renders in the same tick as the mutation. There is no wait for the server. The server sync is a background concern that doesn't affect the UI.

Derived state follows the same path. A budget island subscribes to 'items' and computes a total. When items change, the subscription fires, computes the derived value, and sets it on the 'budget' branch — which in turn notifies the alerts island. The entire chain (items to budget to alerts) executes synchronously in a single tick.

The **MapStore** is the second tier. It coordinates state across topologies on the same page. Each topology registers its TopologyStore under a name. The MapStore provides a unified read path — any topology can read any other topology's state synchronously, without a server round-trip. Writes remain scoped: a topology can only set values in its own store.

The MapStore uses a leader pattern for server synchronization. The first topology to call `startSync()` becomes the leader. The leader runs a periodic flush cycle that triggers `sync()` on all registered stores. Each topology flushes its own dirty branches through its own channelFetch with its own channel token. The leader coordinates *when* to flush, but each topology flushes independently through its own authenticated channel. Token scoping is preserved across the sync boundary.

This two-tier model — TopologyStore for intra-topology coordination, MapStore for inter-topology coordination — has a specific architectural property: **mutations are instant on the client, and persistence is lazy to the server**. The client is the authority for display. The server is the authority for persistence. Between syncs, the client operates autonomously. On page reload, the server provides the persisted state, the client resumes. This is the same model as offline-first databases: autonomous local operation with periodic writeback.

The state management layer replaces two patterns that would otherwise be necessary:

*DOM events for island coordination.* Without a store, islands coordinate through CustomEvents on `document.body` — asynchronous and untyped. With the store, subscriptions are synchronous and path-scoped. The subscriber knows exactly what changed.

*Optimistic server round-trips for state updates.* Without lazy sync, every mutation requires a server request and a wait for the response before the UI updates. With the store, the UI updates in the same tick as the mutation. The server learns about the change on the next sync cycle — or never, if the page navigates before the sync fires. The client experience is never blocked by server latency.

The total client infrastructure for the two-tier state system, the declarative UI helper, and the WebSocket/HTTP/SSE delivery layer is under 20KB — less than the React runtime alone, before any application code.

### 4.12 Authoring Independence

At Layers 3-6, the developer authors topology code — JavaScript or TypeScript that the server compiles and delivers to the client. A natural question arises: must the developer's authoring syntax be coupled to the client's execution model?

In the thick-client paradigm, the answer is yes. A React developer writes JSX. The build pipeline compiles JSX to `React.createElement()` calls. The React runtime manages a virtual DOM, performs diffing, and patches the real DOM. The syntax (JSX), the compilation target (`createElement`), and the runtime (React) are a single welded system. The developer cannot use JSX without carrying React's 42KB runtime, its virtual DOM overhead, and its reconciliation model. The authoring experience *is* the execution model.

The progressive model permits a different answer. Because topology code is compiled by the server at boot time — not by a build pipeline at development time — the compilation target is a server decision, not a syntax decision. The server can compile any syntax to any target, provided the target produces valid DOM operations on the client.

This separation yields a formal property: **authoring independence** — the developer's syntax is decoupled from the client's execution model through server-side compilation. The authoring layer and the execution layer are connected only by the compilation boundary, and that boundary lives on the server.

The concrete expression: a developer authors topology code in TSX — the same JSX syntax used by React applications. The server's transpiler (operating at boot time, not build time) compiles JSX expressions to `h()` calls — a function that creates real DOM elements directly, with no virtual DOM, no diffing, no reconciliation. The developer writes `<div class="flex">` and the client executes `h('div', { class: 'flex' })`. The syntax is React's. The execution is direct DOM manipulation. The developer's experience is preserved; the architectural basis is entirely different.

The same principle extends to every layer of the authoring stack:

*Component libraries* can mirror existing ecosystems without carrying their dependencies. A component library that produces the same visual output as shadcn/ui — the same Tailwind classes, the same variant props, the same composition patterns — can be built on `h()` calls instead of Radix UI primitives. The developer sees familiar components. The client receives direct DOM operations.

*Hook systems* can provide React-like ergonomics backed by different primitives. A `useState` hook that triggers component re-render, a `useStore` hook that subscribes to TopologyStore paths, a `useChannel` hook that wraps `channelFetch` with loading states — these provide the same developer interface as React hooks while being backed by PRESTO's state management and channel architecture.

*Design systems* can generate CSS at boot time rather than build time. The server runs a CSS utility scanner (such as Tailwind CLI) against topology source files at startup, producing a static stylesheet. The compilation that traditionally requires a build pipeline collapses into the server's boot sequence. No webpack. No PostCSS configuration. The server starts, scans, generates, and serves.

The architectural consequence is that the build pipeline — the mandatory intermediate step in thick-client development — is absorbed into the server lifecycle. TypeScript compilation happens at boot. CSS generation happens at boot. JSX transformation happens at boot. The developer writes source files. The server compiles and delivers them. There is no build artifact, no `dist` directory, no CI step that must succeed before the application can run. The server *is* the build system.

This is not an optimization. It is a structural consequence of server-authoritative code delivery. Because the server controls what code the client runs (§4.8), the server is the natural location for compilation. The build pipeline was always a proxy for the server — an offline step that produced what the server would eventually deliver. When the server compiles at boot, the proxy is eliminated. The compilation and the delivery are the same system.

The implication for developer adoption is significant. A developer trained on React's syntax — JSX, hooks, component composition, Tailwind — can author PRESTO topologies with near-zero learning curve. The syntax is identical. The mental model (components receive props, hooks manage state, effects run after render) is preserved. What changes is invisible: the virtual DOM is gone, the framework runtime is gone, the build pipeline is gone, and the server controls delivery. The developer's fingers type the same code. The architecture underneath is fundamentally different.

---

## 5. Formal Properties

The constraints of the HTX architecture induce the following properties:

### 5.1 Security Through Absence

If the server doesn't render a template, the client never sees it. If the server doesn't push a module, the client can't execute it. If the server doesn't issue a channel token, the client can't access the data. Security is not enforced by checking permissions at API boundaries — it is enforced by the absence of capability on the client.

This is a stronger security model than API authorization. In a thick-client architecture, the client has the full application code and can attempt any API call. The server must defend every endpoint. In HTX, the attack surface is what the server explicitly provides. Unprovided capabilities don't exist on the client.

### 5.2 Progressive Complexity

Each layer adds capability without requiring understanding of higher layers. A developer building content pages (Layer 0) never encounters WebSocket concepts. A developer adding htx:script (Layer 2) doesn't need to understand channel tokens. The layers are not tightly coupled — they are independently comprehensible.

This property is distinct from "progressive enhancement" (which describes graceful degradation). Progressive complexity describes the *developer experience*: the cognitive load scales with the features used, not with the features available.

### 5.3 Compositional Independence

Different pages of the same application can operate at different layers. A marketing page at Layer 0, a dashboard at Layer 2, and a data explorer at Layer 5 share the same engine, module system, and deployment. No configuration change is required to use different layers on different pages.

This property is absent from thick-client frameworks. A React application cannot serve a page without React. A Next.js application cannot serve a page without the Next.js runtime. The framework's minimum complexity is the developer's minimum complexity. HTX's minimum is zero client-side JavaScript.

### 5.4 Server Authority

The server is the single point of control for:
- Template rendering (what HTML the client sees)
- Code delivery (what JavaScript the client runs)
- Token issuance (what data the client can access)
- WASM delivery (what compute capabilities the client has)

This authority is maintained at every layer. Even at Layer 6, the server decides which WASM binaries to deliver. The client is capable but leashed.

### 5.5 Three-Phase Lifecycle

The constraints induce a temporal structure that is not prescribed but emergent. The lifecycle of a PRESTO interaction passes through three distinct phases:

1. **Declaration** — the developer authors a source representation containing bilateral affordances: server affordances (data queries, module engagements, layout compositions) and client affordances (discoverable interactions, behavioral scripts, channel credentials) coexist as directives within a single artifact.

2. **Resolution** — the engine consumes the server's affordances, producing a resolved representation. Within this resolved form, two qualities coexist: *materialized artifacts* (tokens, evaluated values, computed URLs — static strings the server produced) and *latent behaviors* (scripts, declarative attributes — dormant in the document, not yet activated).

3. **Emergence** — the client activates the latent behaviors using the materialized artifacts. Scripts execute. Connections open. Modules load. Channels negotiate. The resulting state — a live WebSocket, a running WASM module, an authenticated data channel — was never specified in any representation. It emerges from the client realizing the potential that the source representation declared and the resolution pipeline prepared.

Each phase has a different actor (developer, engine, client), a different concern (declaration, resolution, activation), and a different product (source representation, resolved representation, emergent state). The phases are separated by well-defined boundaries: the resolution pipeline separates declaration from resolution; the moment of delivery separates resolution from emergence.

### 5.6 Module Sandboxing

The module system extends the capability-based security model inward — from the client-server boundary to the module-engine boundary.

Every module may declare a *manifest*: a static description of what the module intends to register during boot. The manifest specifies trust level (first-party, marketplace, or tenant) and an explicit enumeration of capabilities — which context providers it will register, which middleware path prefixes it will claim, which channel handler names it will use, which functions it will define.

When the engine boots a module with a non-first-party manifest, it wraps the module registry in a sandboxed proxy. The proxy allows declared registrations and silently drops undeclared ones. A marketplace module that declares only a context provider and a channel handler cannot register middleware that intercepts authentication routes. A tenant-authored module that declares only a context provider cannot register route sources that hijack arbitrary URL paths.

The enforcement is policy-driven. The engine reads a module policy at startup (strict, permissive, or audit). In strict mode, modules without manifests are rejected. In permissive mode, unmanifested modules receive full access — enabling gradual migration. The policy is an operational decision, not an architectural one; the manifest contract is the same regardless of enforcement posture.

This property — that modules declare their intentions and the engine enforces the declaration — mirrors the channel token model at a different layer. Channel tokens scope client access to specific module APIs. Module manifests scope module access to specific engine capabilities. Both are capability-based: the subject receives only the powers it was granted, and the grant is auditable.

### 5.7 Emergent Client Properties

The progressive model describes a spectrum of code-on-demand: each degree of extension makes architectural properties available. This spectrum runs along one axis, the degree to which the server extends the client's capability.

A second axis emerges when the granted capability is scoped on the client. When delivered code operates within trust boundaries, the boundaries themselves function as constraints, and constraints induce properties.

At the document level, no trust boundary exists between delivered code units. The assembled document is open. Any script can reach any element. The properties that emerge are those the paper has already described: latent binding, shared state through the DOM, and implicit coordination between code units that share the affordance surface. These properties exist because the boundary is absent.

At a scoped boundary, delivered code operates within a constrained region of the document. It cannot reach beyond its grant into the host DOM or into sibling code units. The properties that emerge are distinct from those at the document level. Interaction becomes contractual: code units that cannot implicitly observe each other must declare their interfaces explicitly. Portability follows: a code unit that depends on nothing outside its scope operates in any host document. Trust becomes composable: the host can place scoped and unscoped code on the same surface with formal separation.

At a quarantined boundary, delivered code operates in a sovereign execution context. Separate origin, separate memory, separate document. Communication is mediated entirely by the host. The properties that emerge at this level are those of orchestrated sovereignty: the host grants a context, the context executes independently, and all interaction passes through a mediating channel the host controls.

This last level mirrors the PRESTO model itself. The server grants capability to the client. The client executes autonomously within the grant. Communication is mediated by the representation. At the quarantined boundary on the client, the same relationship reappears: the host grants capability to the embedded context, the context executes autonomously, communication is mediated by the host. The architectural pattern replicates at a lower level of the system.

The three levels form a derivation chain that extends from the original constraints:

REST's constraints produced the web's architectural properties. Extending the optional constraint progressively produced the properties described in this paper. Scoping the granted capabilities on the client produced a further set of properties, emergent from the same constraint-based reasoning. Each level is derived from the previous. Each level's properties are traceable to the constraints that produced them.

The classes of applications enabled at each level differ correspondingly. At the document level: coordinating dashboards, real-time interfaces, collaborative views within a shared trust domain. At the scoped level: plugin ecosystems, marketplace extensions, embeddable components that declare their interface and operate within it. At the quarantined level: visual builders, design tools, and applications that contain other applications, where the host orchestrates sovereign embedded contexts.

These are not speculative extrapolations. They are properties induced by constraints, following the same derivation method applied throughout this paper. The trust boundary is the constraint. The emergent property is what the constraint induces. The class of application is what the property enables.

---

## 6. Evaluation

### 6.1 Implementation

The reference implementation is a TypeScript engine running on the Bun runtime. The engine is structured as a pipeline of resolvers, parsers, and executors. The module system allows arbitrary extensions via a registration API (middleware, context providers, channel handlers, template processors, content adapters).

To evaluate the architecture under resource constraints, the reference implementation runs on a Raspberry Pi 5 (8GB RAM, ARM64) — a single-board computer serving a multi-tenant SaaS platform (authentication, billing, real-time WebSocket, WASM delivery, authenticated islands, 3D visualization) and a documentation site (42 articles, sidebar navigation with htmx fragment swapping, portal component TOC). Both are served by a single Bun process per site through a tunneled connection to the public internet.

### 6.2 Cross-Language Verification

To validate that the specification is language-agnostic and complete, six independent implementations were built in six programming languages spanning different paradigms, type systems, and concurrency models:

| Engine | Language | Paradigm | Lines | Memory (RSS) | Throughput | Tests |
|--------|----------|----------|-------|-------------|------------|-------|
| presto-engine | TypeScript | OOP + async | ~4,000 | 112 MB | N/A (production) | 33/33 |
| presto-go | Go | Imperative + goroutines | 2,173 | 19.8 MB | 1,449-8,139 req/s | 22/22 |
| presto-elixir | Elixir | Functional + BEAM actors | 1,906 | 127 MB | 940-2,840 req/s | 22/22 |
| presto-python | Python | Dynamic + interpreted | 1,172 | 38 MB | 613-676 req/s | 22/22 |
| presto-rust | Rust | Ownership + zero-cost abstractions | 2,322 | N/A | N/A | 22/22 |
| presto-c | C | Manual memory + pointers | 3,122 | 11.2 MB | 2,434-3,789 req/s | 22/22 |

Each engine was built from the same specification document (the PRESTO seed, a 2,020-word self-contained knowledge capsule). Each passes the same 22-test verification suite covering routing, data binding, composition, expression evaluation, control flow, authentication conditionals, layout wrapping, grant materialization, channel authentication, and mutation token roundtrips.

The verification suite is not exhaustive. It is diagnostic: a conformant engine that passes all 22 tests has demonstrated correct behavior for every directive, every pipeline ordering dependency, and every security-critical operation. The tests are designed to be implementable from the specification alone, without reference to any existing implementation.

Three observations emerge from the cross-language verification:

**The engine is bounded.** The implementation ranges from 1,172 lines (Python) to 3,122 lines (C). The variation is explained by language expressiveness, not engine complexity. The specification defines a fixed-size problem. The engine does not grow with application complexity; a page with three posts and a page with three thousand posts traverse the same 22-stage pipeline. Template complexity is carried by the representation, not the machinery.

**The specification converges through implementation.** Each new implementation discovered consequences of the constraints that previous implementations had missed. The Go engine revealed that the layout directive must be extracted after expression evaluation but before directive stripping. The C engine revealed that where clauses resolved from user-controlled input create a SQL injection surface in any adapter that interpolates strings into queries. Each finding was promoted into the specification before the next implementation began. The specification improved with each iteration because independent intelligence, reasoning from the same constraints, found consequences the original intelligence had not considered.

**Resource requirements are minimal.** The C implementation operates within 11.2 megabytes of resident memory while serving the complete architectural spectrum. This is not a stripped-down subset; it is the full engine with all 16 directives, the 22-stage pipeline, HMAC-SHA256 token signing, SQLite data binding, and channel authentication. The engine can run on embedded devices, edge nodes, IoT hardware, or any system with a C compiler and a network socket.

### 6.3 Resource Utilization

The following measurements were taken from the TypeScript reference implementation under normal operation with all modules loaded:

| Metric | Value |
|--------|-------|
| Modules loaded | 14 |
| Runtime memory (resident) | 112 MB |
| Percentage of available RAM | 1.3% (of 8GB) |
| WASM modules in memory | 3 binaries, 10.2KB total |
| Database connections | 5 SQLite files (WAL mode) |
| Estimated WebSocket capacity | ~1000 concurrent (at ~8KB per connection) |
| Build step | None |
| Client-side dependencies | htmx (14KB gzipped), syntax highlighter (optional) |

These figures demonstrate that the full architectural spectrum — from static templates to WASM-powered 3D visualization — operates within the resource budget of a single-board computer costing approximately $80 for the board and $120 fully equipped. The architecture's memory efficiency derives from three factors: the server holds no per-client state (statelessness), templates are resolved on demand rather than pre-compiled (no build artifact cache), and WASM binaries are small because they are purpose-built modules, not bundled frameworks.

The cross-language benchmarks further demonstrate that this efficiency is not an artifact of the TypeScript implementation. The C engine achieves the same functionality in 11.2 MB. The Go engine achieves the highest throughput (8,139 req/s for static pages) in 19.8 MB. The resource floor for the complete PRESTO specification is approximately 11 MB of memory and 1,200 lines of code.

### 6.4 Expressiveness

We evaluate the architecture's expressiveness through implementations of increasing complexity:

**Live Chat (Layer 2-3)**
A WebSocket-powered multi-room chat with join/leave announcements, real-time message sync, and room switching. The page template is 20 lines of markup with one component reference. The component handles WebSocket connection, message rendering, and input handling.

Equivalent implementations in other frameworks require 150-500 lines across 6-10 files with build tooling.

**Kanban Board (Layer 4-5)**
A persistent project board with create, move, edit, and delete operations. Two variants: HTTP channel (channelFetch with Bearer tokens) and WebSocket RPC (pure WebSocket with optimistic updates and rollback). State persists in SQLite. The optimistic variant renders changes instantly and rolls back on server rejection.

**3D Visualization (Layer 6)**
A real-time particle visualization with Three.js rendering and WASM-computed geometry. The WASM module (3.4KB AssemblyScript) generates torus knots, spirals, and animated wave surfaces. Parameters are controlled by sliders and computed at < 0.5ms per frame. The complete implementation is 231 lines in a single `.htx` file with no build step.

**Distributed Affordance Coordination (Ephemeral Ceremony)**
Three coordinating islands — inventory management, budget computation, threshold alerts — delivered as a single module through one ephemeral WebSocket ceremony. The WebSocket opens, delivers the module code and a scoped channel token, and closes. Measured ceremony duration through a public internet tunnel to a Raspberry Pi 5: 662ms (456ms connection, 206ms delivery). After the ceremony closes, the three islands coordinate laterally through DOM events (zero network) and signal vertically to the server through stateless HTTP channel requests. Zero persistent connections in steady state. The entire coordination model — three independent state-aware regions, lateral communication, vertical persistence — was conceived, implemented, and measured within 30 minutes, requiring no changes to the engine or architecture. The constraints permitted it; the implementation followed.

### 6.5 Comparison

| Property | React/Next.js | Phoenix LiveView | htmx | HTX |
|----------|--------------|-----------------|------|-----|
| Default client JS | ~200KB | ~30KB | 14KB | 0KB (Layer 0); ~12KB for WebSocket helper (Layer 3+) |
| Build step required | Yes | Yes (Mix) | No | No |
| Server-rendered by default | Optional (SSR) | Yes | Yes | Yes |
| Client routing | Built-in | Server-driven | No | Layer 5 (opt-in) |
| WebSocket support | Manual | Built-in | SSE only | Built-in (raw WS is 0KB; helper is 12KB) |
| WASM delivery | Manual | Not native | No | Built-in |
| Progressive layers | No (all-or-nothing) | 2 (HTML or LiveView) | 2 (HTML or htmx) | 7 (0-6) |
| Files per feature | 6-10 | 2-3 | 1-2 | 1-3 (page + optional component + optional module) |

A note on the "0KB" claim: at Layer 0, HTX sends zero client-side JavaScript — the page is pure server-rendered HTML. At Layer 1, htmx adds 14KB (loaded from a CDN, browser-cached). At time of writing, htmx attributes are not part of the HTML specification — htmx is a third-party library that interprets custom attributes. When browsers natively adopt declarative hypermedia attributes, this dependency becomes zero. At Layer 2, htx:script adds inline IIFEs extracted by the engine — no additional file downloads. The WebSocket ceremony at Layer 3+ can operate with zero dependencies (the token and URL are server-rendered expressions; a raw WebSocket connection is five lines of inline script). The optional client helper (auto-reconnect, token refresh, channel subscriptions, WASM loading) is a 12KB file. Each layer's JS cost is independent and additive.

---

## 7. Related Work

### 7.1 Fielding's REST (2000)

HTX is a direct application of Fielding's architectural style to application development. The key extension is the progressive formalization of the code-on-demand constraint Fielding identified as optional. HTX explores this constraint as a layered spectrum while preserving the other five constraints.

### 7.2 Hypermedia Systems (Gross, 2023)

Carson Gross's work demonstrates that hypermedia-driven applications can replace much of what single-page applications provide. The htmx library implements this thesis with declarative HTML attributes for AJAX, WebSocket, and Server-Sent Events. HTX builds on this foundation: htmx attributes serve as Layer 1, and the HTX engine provides the server-side infrastructure that htmx-enhanced pages require. The extension beyond htmx is the formalization of Layers 2-6, which htmx does not address.

### 7.3 Phoenix LiveView (McCord, 2018)

LiveView pioneered server-rendered real-time applications by maintaining a WebSocket connection and diffing server-rendered HTML. It eliminates the need for client-side JavaScript in many cases. HTX differs in two ways: (1) HTX does not maintain a persistent server-side process per connection (statelessness is preserved), and (2) HTX provides a path to client-side rendering when server-rendering is insufficient, while LiveView requires staying within its server-rendering model.

### 7.4 Rails Hotwire (Heinemeier Hansson, 2020)

Hotwire (Turbo + Stimulus) provides HTML-over-the-wire page updates with minimal JavaScript. Like HTX Layers 0-1, it preserves server-rendered HTML as the primary representation. HTX extends beyond Hotwire's scope with Layers 3-6 (pushed code, authenticated islands, WASM).

### 7.5 Astro Islands (Astro, 2022)

Astro's "islands" architecture allows embedding interactive components within static HTML. Each island is a framework component (React, Vue, Svelte) that hydrates independently. HTX's Authenticated Islands differ fundamentally: the island code is not bundled at build time — it is pushed by the server at runtime over an authenticated WebSocket. This enables server-authoritative control over what islands a client receives.

### 7.6 Qwik Resumability (Hevery, 2022)

Qwik eliminates hydration by serializing component state into HTML and lazily loading event handlers. This is an optimization within the thick-client paradigm — the client still needs a JavaScript framework. HTX avoids the hydration problem entirely: there is no client-side component tree to resume. Scripts run against a complete DOM, not a serialized component state.

---

## 8. Mobile Development Under HTX Constraints

The most common objection to HATEOAS-driven architectures is mobile: "If you don't have any out-of-band knowledge about the service, you're basically reimplementing a web browser." This objection assumes that a HATEOAS client must interpret arbitrary hypermedia at runtime — that the mobile app must be a generic rendering engine.

HTX reframes the question. The architecture's core principle is not "render HTML" — it is "the server is authoritative over what the client sees, does, and runs." HTML is one representation format. The module contract, channel handlers, WebSocket ceremony, and progressive layer model are representation-format-agnostic. They work with any client that speaks HTTP and WebSocket.

### 8.1 WebView Shell

The simplest mobile implementation wraps the HTX server's output in a native WebView. The server renders HTML identically to desktop browsers. `htx:script` works. WebSocket works. WASM works (modern WebViews support `WebAssembly.instantiate`).

This is not a compromise — it is the Basecamp/HEY model that has proven commercially viable. The HTX progressive layers make it more powerful than a typical WebView wrapper: the server can push a mobile-optimized SPA via Client State Transfer, delivering a full client-routed application that feels native but is entirely server-controlled. Different mobile users can receive different UIs based on device capability, subscription tier, or feature flags.

The WebView approach preserves all HTX architectural properties: server authority, progressive layering, representation-mediated extensions, and the REST baseline.

### 8.2 Native Client with Channel API

A native iOS or Android application connects to the WebSocket, authenticates via the ceremony, and uses the channel API — the same `/api/channel/{module}/{path}` endpoints that Authenticated Islands use in the browser. The mobile app renders native UI (SwiftUI, Jetpack Compose) from JSON data returned by channel handlers.

The native app authenticates via the WebSocket ceremony, receives a scoped channel token, and uses the channel API — the same endpoints that Authenticated Islands use in the browser — to fetch JSON data. The native UI framework (SwiftUI, Jetpack Compose) renders the data using platform-native components.

The native app has "out-of-band knowledge" of the data schema — it knows what fields `items` contains and how to render them. But the *access* to that data is still mediated by the HTX architecture: the WebSocket ceremony authenticated the user, the channel token scoped the access, and the ChannelHandler controlled what data was returned. The server remains authoritative over *what* data the client receives, even though the client decides *how* to render it.

This model separates two concerns:
- **Data authority** — the server (HTX modules, channel handlers, token scoping)
- **Rendering authority** — the client (native UI framework)

The REST critic's concern — "you're reimplementing a browser" — doesn't apply because the native client doesn't interpret hypermedia. It consumes structured JSON from a server-controlled channel. The same ChannelHandler serves both the browser (where pushed JavaScript renders the data) and the native app (where SwiftUI renders it). The module system is client-agnostic.

### 8.3 Server-Driven Native UI

The frontier. Instead of the server returning raw data that the client renders with hardcoded layouts, the server pushes *UI descriptions* — structured schemas that declarative native frameworks interpret. A schema describes screens, components, data bindings, and interaction handlers in a declarative format. The native app receives this schema over WebSocket (Client State Transfer for native) and renders it using platform-native components. SwiftUI and Jetpack Compose are already declarative and data-driven — a `List` of `Card` views driven by server-provided structure is natural in both frameworks.

This is **Client State Transfer generalized beyond JavaScript**. The server doesn't push executable code (the native platform won't `eval` it). It pushes a declarative UI description — a representation of the interface, not the logic. The native runtime interprets the schema, maps it to native components, and renders.

The architectural properties are preserved:

- **Server authority** — the server decides the UI structure, the layout, and what actions are available
- **Progressive capability** — simple screens are static schemas; complex screens include conditional logic, animations, and real-time bindings
- **Representation-mediated** — the UI schema is delivered over the authenticated WebSocket, scoped by the same token system
- **No out-of-band knowledge** — the client interprets a schema format, not a specific API. A schema change on the server changes the UI on the client without an app update

Server-driven UI is already deployed at scale. Airbnb's server-driven UI system renders entire flows from server-provided schemas. Spotify uses a similar approach for its home screen. Instagram's feed is server-composed. What these systems lack is a formal architectural framework that connects server-driven UI to REST constraints.

HTX provides that framework. The progressive layer model extends naturally:

| Layer | Web Client | Native Client |
|-------|-----------|--------------|
| 0 | Server-rendered HTML | Server-driven UI schema |
| 1 | htmx attributes | Schema-driven interactions |
| 2 | htx:script | Custom native event handlers |
| 3 | Client State Transfer (JS) | Client State Transfer (UI schema) |
| 4 | Authenticated Islands | Channel-backed components |
| 5 | Full SPA | Server-driven app with client routing |
| 6 | WASM compute | Native compute (Metal, NEON) |

The specification's pipeline — resolve, compose, deliver, extend — applies to both HTML and UI schemas. The syntax differs. The architecture is the same.

### 8.4 The HATEOAS Answer

The critic asks: "How do you build a great mobile app under HATEOAS constraints?"

The answer: the same way HTX builds a great web app. The server sends complete representations (HTML or UI schemas). The client renders them with platform-native capabilities. Extended functionality (real-time, pushed logic, compute) is negotiated through the representation. The server remains authoritative. The client is capable but leashed.

The representation format changes. The architectural style does not.

---

## 9. Future Art

The meta-architectural design described in this paper maps a space of possibilities. The reference implementation explores a portion of that space. Several directions remain that the architecture clearly enables but that have not yet been realized.

### 9.1 Offline-First via Client-Side WASM SQLite

The ephemeral WASM delivery pattern can deliver a SQLite engine compiled to WebAssembly (such as wa-sqlite or sql.js) to the client. Combined with Client State Transfer, the pushed module gains a local relational database — readable and writable without network access. State synchronization between the client-side database and the server-side database can occur over the existing WebSocket when connectivity is available.

Every piece of this exists independently within the architecture: WASM binary delivery, pushed executable code, WebSocket bidirectional communication, and server-authoritative data via channel handlers. Combining them yields offline-first applications with no new architectural concepts — only a new composition of existing layers.

### 9.2 Content Negotiation Across Representation Formats

The same route, backed by the same data query and the same module system, could serve different representation formats based on the client's Accept header. A browser receives HTML. An API client receives JSON. A native mobile app receives a UI schema. The resolution pipeline branches at the representation layer; the data layer is shared.

This extends the uniform interface constraint to multi-platform delivery. A single route declaration — with its data query, its context providers, and its module integrations — becomes the source of truth for all clients. The template syntax produces HTML; an alternative serializer produces JSON or UI schemas from the same resolved data. The server decides the format; the client declares its preference through standard HTTP content negotiation.

### 9.3 Collaborative Multiplayer

The WebSocket pub/sub system that supports real-time channels and state synchronization extends naturally to multi-user collaboration. Multiple clients subscribe to the same channel; mutations broadcast to all subscribers; optimistic updates resolve conflicts locally before server confirmation. Shared cursors, live presence indicators, and collaborative editing are enabled by the existing channel + pub/sub model without additional architectural concepts.

The deeper question is conflict resolution. The current architecture's optimistic update pattern (mutate locally, confirm or rollback from server) handles single-user optimism. Multi-user collaboration requires the server to mediate concurrent mutations — a domain where CRDTs (Conflict-Free Replicated Data Types) or operational transformation provide formal solutions. A CRDT module, delivered as a WASM binary via Compute State Transfer, would enable the client to merge concurrent edits at native speed while the server maintains the authoritative state.

### 9.4 Distributed Affordance Coordination

The three-phase lifecycle repeats with each client interaction. Over many iterations, the client accumulates affordances — its state at any moment is a negotiated aggregate of every server response received and every local mutation applied. When multiple authenticated islands operate on the same page, each managing independent state through its own channel, a coordination question arises: can islands signal each other laterally (client-side) and communicate collective state vertically (to the server) in subsequent requests?

If so, the resolved representation is not the final form of the interaction but a snapshot in an ongoing negotiation — stateless on the server, stateful on the client, mediated through hypermedia. The server tailors each response to reported client state without storing it between exchanges. This pattern — distributed client-side state coordination with server-aware negotiation — may emerge naturally from authenticated islands operating within the iterative PRESTO lifecycle.

### 9.5 Streaming Resolution

The current resolution pipeline produces a complete HTML response before sending it. An alternative: stream the resolved HTML as each pipeline stage completes. The layout header and navigation could be sent immediately while data queries are still executing. The client receives the page skeleton first and the content fills in progressively — without JavaScript, without hydration, using only HTTP chunked transfer encoding. This is the browser's native progressive rendering model, applied to the HTX pipeline.

Server-pushed modules and dynamic route sources are agnostic to how their content is produced. A template string returned by a route source could be written by a developer, retrieved from a database, or generated by a large language model at request time.

An AI agent that produces valid template strings is, architecturally, a route source. It receives a path and a context. It returns a template. The engine resolves the template through the standard pipeline — evaluating expressions, resolving includes and components, applying layouts, enforcing authentication. The agent does not need direct database access, filesystem access, or WebSocket control. It provides a representation; the engine does the rest.

The trust model is inherent in the architecture. The engine controls what the agent's template can reference: layouts and components are resolved from the filesystem, data queries go through the content adapter, context providers supply scoped data. The agent's output is *resolved*, not *executed* — the template string passes through the same constrained pipeline as any developer-written template. The agent cannot bypass middleware, cannot access unprovided context, cannot push code that the engine's ComponentResolver doesn't extract.

### 9.6 AI-Generated Representations

Server-pushed modules and dynamic route sources are agnostic to how their content is produced. A template string returned by a route source could be written by a developer, retrieved from a database, or generated by a large language model at request time.

An AI agent that produces valid template strings is, architecturally, a route source. It receives a path and a context. It returns a template. The engine resolves the template through the standard pipeline — evaluating expressions, resolving includes and components, applying layouts, enforcing authentication. The agent does not need direct database access, filesystem access, or WebSocket control. It provides a representation; the engine does the rest.

The trust model is inherent in the architecture. The engine controls what the agent's template can reference: layouts and components are resolved from the filesystem, data queries go through the content adapter, context providers supply scoped data. The agent's output is *resolved*, not *executed* — the template string passes through the same constrained pipeline as any developer-written template. The agent cannot bypass middleware, cannot access unprovided context, cannot push code that the engine's ComponentResolver doesn't extract.

### 9.7 Agent-Mediated Route Sources and Multi-Agent Cooperation

Federated route sources — where one engine resolves a route from another engine's output — extend naturally to multi-agent architectures. Each agent is a route source responsible for a namespace of routes:

- Agent A provides analytical views under one path prefix
- Agent B provides personalized recommendations under another
- Agent C provides generated content under a third

The agents cooperate by composing into a single application without awareness of each other. The engine resolves all their outputs through the same pipeline, with the same layouts, the same authentication, the same module system. Each agent's representations are mediated by the same constraints that mediate human-authored templates.

The trust protocol follows the same pattern established by the module manifest system (§5.5). Each agent operates as a module with a declared manifest — its trust level, the route prefixes it may claim, the adapters it may query, the components it may reference. The engine enforces these declarations through the same sandboxed registry proxy that constrains third-party and tenant modules. An agent declared at the "tenant" trust level can produce templates but cannot register middleware, cannot access undeclared adapters, and cannot claim routes outside its declared prefix.

The access negotiation is policy-driven, mirroring `HTX_MODULE_POLICY` at the agent level. An engine operator configures how much authority agents receive — from "strict" (agents must declare every capability and the engine enforces all boundaries) to "permissive" (agents operate with broader access for development and experimentation). The same policy gradient that governs human-authored modules governs agent-authored representations. The mechanism is identical; the subject is different.

This suggests a broader principle: the constraints that govern human-client interaction — complete representations, server authority, mediated extensions — are the same constraints that govern agent-to-agent interaction. The representation is the contract. The pipeline is the trust boundary. The module manifest is the capability negotiation. The policy setting determines the posture. Whether the subject is a browser, a third-party plugin, or an AI agent, the architecture provides one consistent model for granting, scoping, and auditing capability.

### 9.8 Constrained Agent Harness

The agent-as-route-source model (§9.4) raises a practical question: how does the engine ensure that an agent's output conforms to the architecture's rules? An unconstrained agent may produce templates that violate assumptions — using directives in contexts where they aren't processed, referencing resources that don't exist, or generating markup that breaks the resolution pipeline.

The answer is a *constrained harness*: a wrapper around the agent that provides scoped context before generation and validates output after generation.

Before generation, the harness packages architectural context for the agent: which directives work in which contexts (page templates vs. component files), which CSS variables the theme provides, which client libraries are available, which file paths are writable, and which patterns existing templates follow. This context is not documentation — it is an operational constraint. The agent generates within the boundary the context defines.

After generation, the harness validates the output against the architecture's invariants: the template starts with a layout directive, page-level scripts use standard script tags (not component-scoped directives), CSS references theme variables rather than hardcoded colors, the markup is responsive, and no expressions appear inside script blocks where they would be evaluated unintentionally. Validation failures can trigger re-generation with the specific error as additional context — a self-correcting loop.

The harness itself is a module with a manifest. Its declared capabilities scope what it can register (route sources under a specific prefix, a channel handler for generation requests) and what the agent can write (template files in a designated directory, component files with a designated prefix). The module sandbox (§5.5) enforces these declarations. The agent cannot register middleware, cannot modify existing templates, cannot access databases directly.

This layered trust model — agent constrained by harness, harness constrained by manifest, manifest enforced by engine — mirrors the architecture's approach at every other boundary. The principle is consistent: capability is granted, scoped, and auditable. Whether the subject is a browser client, a third-party module, or an AI agent, the mechanism is the same.

### 9.9 Edge Deployment

The architecture's statelessness — no per-client session state, no persistent server-side processes per connection, templates resolved on demand — makes it naturally suited to edge deployment. An HTX engine running at edge locations resolves templates close to the user. Static templates (Layer 0-1) benefit immediately from edge proximity. Dynamic queries require edge-accessible data — a replicated SQLite file (via LiteFS or similar) or an edge-compatible data adapter. The module system's adapter abstraction means switching from a local SQLite adapter to an edge-replicated adapter requires changing one line in the module registration, not restructuring the application.

### 9.10 Optional Ahead-of-Time Compilation

While the architecture resolves templates on demand at request time, nothing prevents optional ahead-of-time compilation. A build step could pre-resolve static templates into cached HTML files, compile WASM modules from source, and bundle client-side JavaScript — all as an optimization, not a requirement. The key distinction from thick-client build systems: the build step is *optional and additive*. The application works without it. The build makes it faster, not functional. This inverts the conventional relationship where the build step is mandatory and its absence means the application doesn't run.

### 9.11 Template Marketplace

Dynamic route sources and the module system enable distributable template sets. A template pack — a collection of page templates, components, and stylesheets — could be published, installed, and resolved through the existing architecture. A tenant installs a template pack; the pack's templates become available as dynamic routes; the pack's components become available on the filesystem. The composition model (dynamic page-level templates referencing shared filesystem components) makes installation a matter of database writes and file copies, not application reconfiguration.

---

## 10. Conclusion

The web's architectural strength has always been the complete representation — a document sent in full, rendered immediately, navigable without JavaScript. Modern web development abandoned this strength in pursuit of application-like interactivity, creating a generation of frameworks that compensate for the problems their own architecture introduces.

HTX does not compensate. It restores.

The server sends complete documents. Templates declare their own data needs. Scripts enhance what already exists. Each layer of client capability is added only when the previous layer is insufficient. The architecture scales from static HTML to WASM-powered 3D visualization without changing frameworks, without introducing a build step, and without abandoning the RESTful contract.

The progressive code-on-demand model demonstrates that the tension between "simple content site" and "rich interactive application" is a false dichotomy created by frameworks that force a single level of complexity. When the architecture supports independent layers, the developer chooses the right layer for each feature — and most features need less than they think.

The cross-language verification confirms that this is not a framework-specific claim. Six implementations in six languages, spanning garbage-collected runtimes and manual memory management, object-oriented and functional paradigms, interpreted and compiled execution, all produce the same architectural properties from the same specification. The engine is bounded: it does not grow with application complexity. The specification is convergent: it improves through the act of being independently implemented. The resource floor is minimal: the complete specification operates within 11 megabytes of memory and 3,122 lines of C.

These properties suggest that PRESTO describes something closer to infrastructure than to a framework. Frameworks evolve with their ecosystems, accumulate features, and eventually require migration. An architectural style, once its constraints are correctly identified and its specification is complete, is stable. The constraints do not change because they are derived from the properties of the medium itself: HTTP, HTML, and the uniform interface that connects them.

The document is the foundation. The extensions are progressive. The server mediates both. The engine is finished.

---

## References

1. Fielding, R.T. (2000). *Architectural Styles and the Design of Network-based Software Architectures*. Doctoral dissertation, University of California, Irvine.

2. Gross, C., Stepinski, A., & Akşimşek, D. (2023). *Hypermedia Systems*. Big Sky Software.

3. Berners-Lee, T., Fielding, R., & Masinter, L. (2005). Uniform Resource Identifier (URI): Generic Syntax. RFC 3986.

4. Fielding, R., & Reschke, J. (2014). Hypertext Transfer Protocol (HTTP/1.1): Semantics and Content. RFC 7231.

5. McCord, C. (2018). Phoenix LiveView. https://github.com/phoenixframework/phoenix_live_view

6. Gross, C. (2020). htmx: High Power Tools for HTML. https://htmx.org

7. Heinemeier Hansson, D. (2020). Hotwire: HTML Over The Wire. https://hotwired.dev

8. Haas, A., et al. (2017). Bringing the Web up to Speed with WebAssembly. PLDI '17.

---

*This paper describes the HTX architecture as implemented in six conformant engines across TypeScript, Go, Elixir, Python, Rust, and C. The reference implementation, specification, documentation, and cross-language verification suite are available at the project repository (https://hypermediaapp.org).*
