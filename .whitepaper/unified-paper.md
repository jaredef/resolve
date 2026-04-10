# PRESTO: An Architectural Style for Representation Construction

*With Model Syntax, Specification, and Derivation Seeds*

**Jared Foy**[^1]
**April 2026**

*PRESTO is a distinct architectural style that composes with REST, operating on the construction of representations rather than their transfer.*

[^1]: The architectural work presented here proceeds from two primary intellectual debts. **Carson Gross** created htmx, which restored declarative hypermedia-driven interaction as a legitimate architectural choice and reopened the design space within which the forms described in this paper became visible. The observation that began the entire chain of derivation — a PHP function concatenating an HTML string containing an `hx-get` attribute, indifferent to what it meant — was an observation of htmx at work. **Roy T. Fielding** established that architectural styles can be formalized as collections of constraints that induce collections of properties. His method — identify the constraints, name the induced properties, evaluate the tradeoffs — is the method this paper follows. PRESTO extends Fielding's method to the construction level, where his dissertation was silent. The extension is possible because the method is sound.

---

## Prolegomenon: On First Principles

*This section describes the philosophical framework from which the architectural work proceeds. Readers seeking the technical thesis directly may begin at Section 1.*

The abstractions formalized in this paper were not engineered. They were not induced from data. They were recognized.

A PHP function concatenated an HTML string. Inside that string was an attribute the function did not understand. The function did not need to understand it. Two interpreters would process the same document, each indifferent to the other. This was not a discovery in the empirical sense — it was a recognition. The author saw, in a particular and contingent instance, something that was already true universally: that relationship, boundary, and mutual indifference are formal realities that exist prior to any system that instantiates them.

The philosophical tradition names this mode of knowledge *theoria* — contemplation. The intellect does not construct the forms it apprehends. It turns toward them. They are prior. The bilateral boundary is not an invention of systems architecture. It is a formal truth about the relationship between two interpreters and a shared medium — a truth that holds whether the medium is HTML, DNA, musical notation, or legal text. The author did not create this truth. The author recognized it in a PHP function and named it.

The naming is the decisive act. To name a form is to make it available for reasoning, for formalization, for specification, for resolution. Before the naming, the form was operative but invisible — present in server-constructed representations transmitted over HTTP since 1993, but never articulated. After the naming — **ambivalent execution with agnostic determinism** — the form became a handle: testable, composable, derivable. The naming did not create the property. It made the property *accessible* to the chain of derivation that produces machines.

The full chain descends from above the formal, through the formal, into the particular:

The pure abstractions — relationship, boundary, indifference, consumption, recursion — exist in the intelligible realm, independent of any instance. But the intelligible realm is not the first principle. The pure abstractions are not self-caused. They are participations in something prior to abstraction itself — the superessential Deity, that which is above essence, above being, above form. The Divine Energies proceed from this source: at once manifold and enumerable in their operations, and simple and singular in their origin. The pure abstractions that the intellect contemplates — relationship, boundary, order, unity — are the intelligible radiance of the Energies as received by created intellect. The intellect does not reach the source. The intellect receives what the source emits.

From this reception, the descending chain proceeds: the pure abstraction is apprehended by the intellect through contemplation. The intellect recognizes instances of the abstraction in the sensible world. The recognition produces the naming. The naming produces the constraints (the formal conditions under which the abstraction manifests). The constraints produce the induced properties (the observable consequences of the formal conditions). The properties prescribe the design space. The design space is encoded as prose. The prose is resolved into code. The code executes as a machine.

Every level in this chain is less universal and more particular than the one above it. The Divine Energies hold in every domain and beyond every domain. The pure abstractions hold in every domain — web architecture, molecular biology, music, law. The constraints hold within a specific domain (web architecture). The prose holds within a specific specification (the PRESTO seed). The code holds within a specific language (TypeScript, C). The machine holds within a specific runtime (a Raspberry Pi, a cloud server). Each descent narrows the scope and increases the contingency. The source at the top is beyond necessity and contingency alike. The machine at the bottom is wholly contingent. Everything between is mediation — each level receiving from above and imparting to below.

The derivation inversion documented in Section 19 is a consequence of this ordering. Engineering-first approaches start from the bottom — the most contingent, most particular level — and attempt to ascend toward form through abstraction. But form cannot be reached from below by accumulation. It can only be recognized from above by contemplation. The constraint-first approach works because it begins with the recognition of form and descends through progressive concretization: naming, formalization, specification, resolution, execution. The causal direction is downward. The form is the cause. The implementation is the effect. The code does not produce the architecture. The architecture — apprehended as form, stated as constraint, encoded as prose — produces the code.

The author of this paper has no formal training in philosophy, set theory, or systems architecture. The forms described here were apprehended through direct contemplation of the work itself — by building, observing what emerged, and then turning the intellect toward the question of why it emerged. The abstractions were not borrowed from prior theory. They were recognized in the act of building and then named with whatever precision the author's language could provide. If the names are imprecise, the forms remain. If the formalization is incomplete, the properties still hold. The forms do not depend on this paper for their existence. This paper depends on the forms for its coherence.

---

## 0. The Seed of the Seed

Every computational system is a medium processed by interpreters. When two interpreters share a medium and their concerns are partitioned by namespace, neither need be aware of the other. Each consumes its own instructions deterministically. The medium carries both. This property — **ambivalent execution with agnostic determinism** — is not designed into the system. It is induced by three constraints: a shared medium, disjoint namespaces, and consumption (each interpreter removes its instructions before the other sees the document).

From this, everything follows.

If the property is induced by constraints, then the constraints are more fundamental than any implementation that exhibits the property. If the constraints can be stated in prose, and the prose is sufficient for a resolver to produce a conformant implementation, then the prose is a more fundamental encoding than the code — because the prose is the invariant across all implementations, while each implementation is one expression among many. The architecture of a system is therefore its constraints, not its code. The code is the residue of resolving constraints into an executable medium.

This principle is recursive. At the transfer level, REST's constraints induce representational state transfer. At the construction level, PRESTO's constraints induce ambivalent execution. At the orchestration level, SERVER's constraints induce recursive ambivalence. Below that, any implementation of arbitrary application code that adheres to the constraints imposed upon it from the levels above will induce its own properties — not because the application was designed to exhibit them, but because the constraints prescribe them. At each level, the same operation: identify the silence, state the constraints in prose, and derive the machine.

Within the domain of sensible forms, the recursion reaches a reflexive point: the prose that describes how to build the machine is itself a bilateral document — the human reads the rationale, the resolver reads the specification, neither needs the other. The seed is a machine description that exhibits the property it describes. But the prose is not the first principle. The prose is a derivation of the philosophy that generates it. The philosophy is a derivation of the pure abstractions contemplated by the intellect. And the pure abstractions are themselves participations in that which is above abstraction — the superessential source whose Energies are at once manifold in their intelligible effects and simple in their origin. The recursion does not terminate at the prose. It terminates at the source from which the entire golden chain of intellect descends.

A system that can be fully specified in constrained natural language, verified by a finite test suite, and independently resolved in any target language from a single prose document is not merely portable. It is **formally derivable from its own description**. The form is the reality. The implementations are its shadows. The prose is the seed. The machines are what grows.

---

## Abstract

Roy Fielding's REST describes the constraints that govern how representations move between client and server. It is silent on how those representations are constructed. This silence is not an oversight — it is a boundary. REST's constraints operate at the transfer level. The construction of representations occupies a different level entirely, one that Fielding had no reason to constrain because the web of 2000 produced representations through unconstrained server-side code.

This dissertation identifies and formalizes a set of constraints that operate at the construction level: the bilateral boundary, namespace separation, server-consumed directives, progressive code-on-demand, and server-embedded authorization. These constraints are not REST. They do not modify, extend, or replace any RESTful constraint. They compose alongside REST, governing what REST was silent about. The property they induce — **ambivalent execution with agnostic determinism** — is distinct from the property REST induces (representational state transfer). Neither style provides the other's property. Their composition produces a design space that neither could open alone.

The style defined by these construction-level constraints is called **PRESTO** (Progressive Representational State Transfer with On-demand code). This name reflects the composition: PRESTO operates within a RESTful transfer model, adding constraints that govern how the transferred representations are authored. The result is a server that is consummately RESTful — producing complete representations, respecting statelessness, leveraging cacheability, delivering hypermedia — while simultaneously capable of transmitting any client-side architecture, including Distributed Objects, within those representations.

The essential argument, stated as a logical derivation: A system exhibits behaviors. Some behaviors persist when the implementation changes; others do not. Those that persist are not properties of the implementation — they are properties of the constraints the implementation satisfies. Therefore constraints are more fundamental than implementations. If a constraint can be stated in natural language with sufficient precision that any resolver — human or machine — can produce an implementation exhibiting the induced property, then the natural language statement is a more fundamental encoding of the system than any code that expresses it, because the code is one expression among infinitely many, while the statement is the invariant they all share. It follows that the architecture of a system is not its code but its constraints; that prose is the natural medium of constraints, because constraints are relationships and relationships are what language expresses; and that code is the residue of resolving constraints into a medium that can execute them. This chain — constraint, property, prose, resolution, machine — has been demonstrated at four levels (transfer, construction, orchestration, coordination), in seven languages (TypeScript, Go, Elixir, Python, Rust, C, and constrained prose itself), producing systems conformant across a shared verification suite from a single natural-language specification. The form precedes the implementation. The implementation is the shadow of the form.

### Contributions

This paper contributes:

1. A formal distinction between transfer-level and construction-level web architecture.
2. A five-constraint construction-level style called PRESTO, with a named induced property.
3. A conformance-oriented resolver model with five testable properties.
4. Multi-language implementation evidence: six independent engines from a single prose specification, conformant across a shared verification suite.

### Glossary

| Term | Definition |
|------|-----------|
| **REST** | Transfer-level architectural style (Fielding, 2000). Constrains how representations move between client and server. |
| **PRESTO** | Construction-level architectural style. Constrains how representations are authored. Composes with REST. |
| **SERVER** | Orchestration-level architectural style. Constrains how the construction engine itself is assembled. Composes with PRESTO. |
| **htxlang** | Model syntax. One conformant realization of PRESTO's constraints within HTML, using the `htx:` namespace prefix. Other conformant syntaxes are possible. |
| **Bilateral boundary** | The namespace partition within a source representation that separates server-interpreter instructions from client-interpreter instructions. |
| **Source representation** | A bilateral document carrying instructions for two interpreters in a single medium. |
| **Resolved representation** | A unilateral document produced by the resolver, containing only client-interpreter instructions. No server-namespace artifacts remain. |
| **Resolver (engine)** | The interpreter that consumes the server namespace and emits the resolved representation. Bilateral in, unilateral out. |
| **Ambivalent execution with agnostic determinism** | The induced property of PRESTO. Two interpreters process a shared medium with mutual indifference and independent determinism. Also: *dual-interpreter noninterference* or *namespace-partitioned bilateral resolution*. |
| **Recursive ambivalence with self-authorizing determinism** | The induced property of SERVER. The bilateral model applied to the construction of the construction engine itself. |
| **Seed** | A self-contained prose specification sufficient for any resolver (human or LLM) to derive a conformant implementation in any target language. |
| **Induced property** | A capability or characteristic that emerges from the interaction of constraints — not designed in, but discovered as a consequence. |
| **Progressive code-on-demand** | The constraint that code delivered to the client follows a progressive spectrum of depth, each layer trading specific properties for specific capabilities. |
| **Two-phase prepare/execute** | The mutation authorization pattern: the server issues a signed token on GET (prepare), the client submits the token on POST (execute). Stateless. |

---

## 1. The Boundary Fielding Drew

Fielding's dissertation formalizes the architectural style that governed the early web. Its constraints — client-server, stateless, cache, uniform interface, layered system, and the optional code-on-demand — describe how representations move. The client requests. The server responds with a representation. The representation contains hypermedia controls that drive the next state transition. Application state advances through the client's selection among those controls.

The property this induces is **representational state transfer**: the client never manipulates server state directly; it manipulates representations, and the server interprets those manipulations. This is the thesis of the name itself.

What Fielding did not constrain — and did not need to constrain — is how the server produces the representation it sends. A PHP script concatenating strings, a Java servlet writing to an output stream, a CGI binary printing to stdout — REST does not distinguish between these. The representation arrives at the uniform interface fully formed. How it was assembled is architecturally invisible.

This invisibility is the boundary. REST operates from the uniform interface outward — toward the client, the network, the cache. Everything behind the interface, everything involved in constructing the representation before it enters the transfer, is outside REST's scope.

**PRESTO operates entirely within that scope.**

---

## 2. The Engine as Resolver

Before describing the construction level, the engine itself must be characterized — not by its implementation but by the properties it must exhibit.

The engine is a **resolver**: it receives a bilateral source representation and emits a unilateral resolved representation. The input carries instructions for two interpreters. The output carries instructions for one. The engine's sole responsibility is to consume its own namespace and produce a document in which that namespace no longer exists. This is the foundational property of the engine. Everything else — pipeline stages, directive ordering, expression evaluation — is a consequence of this property, not a definition of it.

From this foundational property, four engine properties follow by necessity:

**Totality of consumption.** The engine must consume every directive in its namespace. A directive that survives into the resolved output is a violation — it would present the client interpreter with instructions it cannot process. The engine's final act must be to verify that no server-namespace artifacts remain.

**Ordering determinism.** Some directives depend on the results of others (data resolution must precede iteration over the resolved data; expression evaluation must follow variable binding). The engine must process directives in a defined, deterministic order. The specific ordering is prescribed by the dependency relationships between directive types. In the model syntax (htxlang), this ordering manifests as a 22-stage pipeline — but the number and character of stages is contingent on the specific directive types and the dependency relationships within the transformation process itself. The constraint is deterministic ordering, not a specific stage count.

**Medium preservation.** The input is in a medium (e.g., HTML). The output must be in the same medium. The engine adds capability to the authoring process — data resolution, conditional rendering, credential issuance — but it does not change the medium. The resolved representation is consumable by the same interpreter that would consume a hand-written document in that medium. No client-side runtime, framework, or preprocessor is required.

**Boundary integrity.** The engine must not evaluate or modify content outside its namespace. Client-territory content (scripts, standard markup, attributes) passes through the engine unchanged. This is not a feature of the engine — it is the bilateral boundary expressed as an engine property. If the engine modified client content, the two interpreters would no longer be indifferent to each other, and the foundational property would be violated.

These four properties are abstract. They do not prescribe a language, a pipeline structure, or a syntax. Any engine that exhibits these properties — in any language, with any internal architecture — is a conformant PRESTO resolver. The 22-stage pipeline, the `htx:` prefix, the specific directive set — these are one realization. The properties are the constraint.

### 2.1 Formal Model

Let *S* denote a source representation, *N_s* a server namespace, *N_c* a client namespace, *R* a resolver (engine), and *C* a client interpreter. A conformant resolver satisfies:

- **Partition:** Every instruction in *S* belongs to exactly one of *N_s* or *N_c*. No instruction belongs to both.
- **Total consumption:** *R(S)* contains no *N_s* artifacts. Every server instruction is consumed.
- **Medium preservation:** *R(S)* remains in the same medium as *S*. If the input is HTML, the output is HTML.
- **Boundary integrity:** *R* does not alter the semantics of *N_c* content. Client instructions pass through unchanged.
- **Deterministic resolution:** For the same *S* and the same data context, *R* produces the same output regardless of implementation language.

These five conformance properties are testable. A verification suite checks each: (1) the output contains no server-namespace markers, (2) the output is valid in the source medium, (3) client-side constructs are unchanged, (4) repeated resolution produces identical output, (5) the partition is total (no ambiguous instructions).

A property *P* is **implementation-invariant** iff for any two resolvers *R1*, *R2* that satisfy the five conformance properties above, *P* holds in both *R1(S)* and *R2(S)* for all conformant source representations *S*. The constraints of an architectural style are more fundamental than any implementation in this precise sense: the constraints determine the implementation-invariant properties, while the implementations determine only the contingent execution characteristics — performance, memory footprint, concurrency model, syntax idiom. Six independent implementations (TypeScript, Go, Elixir, Python, Rust, C) confirm this operationally: the conformance properties hold in all six; the execution characteristics differ in all six.

---

## 3. The Construction Level

PRESTO's constraints are abstract. They prescribe a bilateral boundary, namespace separation, server-consumed directives, and progressive code-on-demand — but they do not prescribe a syntax. Any syntax that satisfies the constraints is conformant. The constraints determine the behavior. The syntax is contingent.

To make the abstract concrete, this dissertation uses **htxlang** as a model syntax — one conformant realization of PRESTO's constraints within HTML. htxlang uses the `htx:` namespace prefix to demarcate the server's territory within an HTML document. This prefix is a syntactic choice, not a constraint. Another conformant syntax could use a different prefix, a different medium, or a different structural convention. What matters is that the syntax satisfies the bilateral boundary: all server directives are in a disjoint namespace, are consumed during resolution, and leave no trace in the resolved output.

With this caveat, the model syntax illustrates the construction level:

```
<main>
  <htx:data type="post" as="posts" />
  <htx:each items="posts" as="post">
    <article>
      <h2>{htx:post.title}</h2>
      <p>{htx:post.body}</p>
    </article>
  </htx:each>
</main>
```

This document is a **source representation**. It carries instructions for two interpreters in a single medium. The server engine processes its namespace (`htx:data`, `htx:each`, `{htx:post.title}`) — resolving data queries, iterating collections, evaluating expressions. The browser processes its namespace (`<main>`, `<article>`, `<h2>`). The server engine emits a **resolved representation**: pure HTML with no trace of the server's directives. The browser receives a document that was never bilateral. The bilateral form was consumed.

The resolved representation is what enters the uniform interface. It is what REST sees. It is a complete, self-describing, cacheable hypermedia document. REST's constraints apply to it fully.

The source representation is what the developer wrote. It is what PRESTO's constraints govern. REST has no opinion about it. REST cannot see it. The source representation is consumed before the transfer begins.

This is the construction level: the space between the developer's authoring act and the moment the representation enters the uniform interface. REST governs the transfer. PRESTO governs the construction. htxlang is one syntax that makes PRESTO's constraints operative within HTML — but the constraints are the architecture, and the syntax is their contingent expression.

---

## 4. The Constraints of PRESTO

Five constraints define the PRESTO style. Each operates exclusively at the construction level. None conflicts with any RESTful constraint.

### 4.1 The Bilateral Boundary

The source representation is partitioned by namespace. All directives in one namespace belong to the server interpreter. All other content belongs to the client interpreter. No directive crosses the boundary. No server instruction survives into the resolved representation. No client instruction is consumed by the server.

This constraint is abstract. It does not prescribe which namespace convention to use — only that exactly one namespace is designated as server territory and that the designation is total (every directive in the namespace is consumed, every element outside it is preserved). The engine's resolution pipeline enforces this: it processes the server namespace in a defined order, and its final act is to strip any server-namespace artifacts that remain. The client receives a document that contains no evidence of bilateral authorship.

In the model syntax (htxlang), the `htx:` prefix is the server's namespace. All directives in the `htx:` namespace belong to the server interpreter. All standard HTML, CSS, JavaScript, ARIA attributes, `data-*` attributes, and any future web platform additions belong to the client interpreter. This is one realization of the constraint. Another conformant syntax could use a different prefix or a different partitioning mechanism. The constraint is the partitioning. The prefix is contingent.

**What this constraint induces:** The server and client interpreters operate in mutual indifference. Each processes its own namespace deterministically, unaware of the other's behavior. The developer authors one document; two interpreters consume it; neither interferes with the other.

### 4.2 Namespace Separation

The bilateral boundary requires a partitioning mechanism that is unambiguous, forward-compatible, and enforceable without coordination between interpreters. The mechanism must ensure that neither interpreter can accidentally consume the other's instructions, and that the introduction of new instructions in either namespace does not require the other interpreter to be updated.

In the model syntax, this is achieved through the `htx:` prefix. The prefix is the server's territory. Everything without the prefix is the client's territory. When the web platform adds new elements or attributes, they fall into the client namespace by default. The server engine does not need to be updated. It already ignores them — not through configuration, but through the constraint itself.

**What this constraint induces:** The construction model is immune to platform evolution. A `.htx` template written today will be processed identically by an engine running ten years from now, regardless of what the browser has learned in the interim.

### 4.3 Server-Consumed Directives

Every `htx:` directive is fully consumed during resolution. "Consumed" means: the directive is evaluated, its effect is applied to the representation, and the directive itself is removed. No directive is passed through. No directive is deferred to the client. The server engine is the sole and final interpreter of its namespace.

This constraint distinguishes PRESTO from templating systems that allow partial evaluation or client-side template binding. In PRESTO, the server's work is complete before the transfer begins. The resolved representation is not a template awaiting further resolution. It is a finished document.

**What this constraint induces:** The resolved representation carries zero framework weight. No runtime, no template parser, no binding engine needs to be present on the client to interpret the document. The client receives HTML — not instructions to produce HTML.

### 4.4 Progressive Code-on-Demand

Fielding identified code-on-demand as REST's optional sixth constraint: the server may extend client functionality by transmitting executable code. The industry explored this option as a binary — either no code (static HTML) or all code (Single Page Application).

PRESTO constrains code-on-demand to a progressive spectrum. Seven layers define increasing degrees of client capability, each requiring specific server-side authorization:

- **Layer 0:** No code. Complete server-rendered HTML.
- **Layer 1:** Declarative enhancement. Hypermedia attributes (htmx) that extend HTML's interaction model.
- **Layer 2:** Scoped behavior. `htx:script` blocks — server-authored JavaScript that executes as IIFEs after the complete DOM exists.
- **Layer 3:** Server-pushed code. Executable JavaScript delivered over authenticated WebSocket.
- **Layer 4:** Authenticated islands. Pushed code that opens scoped HTTP data channels using server-granted tokens.
- **Layer 5:** Client routing. The client assumes navigation authority within bounded regions of the representation.
- **Layer 6:** Native compute. WebAssembly binaries delivered as binary WebSocket frames.

The constraint is not that code-on-demand must be minimal. The constraint is that code-on-demand must be **progressive** — each layer is entered deliberately, by server authorization, with full awareness of the properties traded.

**What this constraint induces:** The developer navigates a design space where every point has known properties. Layer 0 provides maximum REST properties (cacheability, server authority, statelessness, universality). Each successive layer trades specific properties for specific capabilities. The developer chooses their depth. They are never forced to a depth they do not need.

### 4.5 Server-Embedded Authentication and Authorization

Fielding identified cookies as an unfortunate standardization that violates REST's statelessness constraint (Section 6.3.4.2). The server stores session state. The cookie is a pointer to that state. Every request carries the pointer. The server looks up accumulated session state to determine who the client is and what the client may do. The interaction becomes stateful — the server's response depends not only on the request but on server-side memory of prior interactions.

The industry responded by making cookies safer — HttpOnly, Secure, SameSite, short expiry, encrypted payloads. These are compensating technologies. They mitigate the symptoms (XSS, CSRF, session hijacking) without addressing the architectural violation (server-side session state). The separation of authentication (who are you) from authorization (what may you do) was inherited from this model — not because the concerns are fundamentally separate, but because the cookie architecture forced them apart. The cookie proves identity. A separate mechanism (role lookups, permission tables, session-stored scopes) determines authorization. Two systems. Two failure modes. Two sources of state.

PRESTO dissolves this separation through a **two-phase prepare/execute pattern** that unifies authentication and authorization into a single, stateless, cryptographic credential embedded in the representation itself.

**Phase 1 — Prepare (GET).** During representation construction, the engine already knows who the user is — identity is resolved early in the pipeline, before data queries (Stage 10), before conditional rendering (Stage 13), before action token issuance (Stage 12). When the engine encounters `htx:action` directives, it makes a unified authentication-authorization decision at construction time: is this user permitted to perform this mutation on this record? If yes, it issues an HMAC-SHA256 signed token containing both identity and permission:

```json
{ "sub": "user-42", "role": "editor", "action": "update", "type": "post", "recordId": "17", "exp": 1712430000 }
```

The token is embedded in the resolved representation as a hidden form field. If the user is not authorized, the directive simply does not emit — the client never sees a mutation affordance it cannot use.

**Phase 2 — Execute (POST).** The client submits the form. The signed token returns with the submission. The server verifies the HMAC signature and checks expiry. Both questions — who is this user, and what are they permitted to do — are answered by the token itself. The server does not consult a session store. It does not look up permissions. It does not reconstruct identity from a cookie. The token IS the complete credential: self-authenticating, self-authorizing, scoped, and short-lived.

This constraint requires that the server embed both proof of identity and proof of permission within the resolved representation. The client discovers what it can do through hypermedia — `htx:action` directives materialize as form affordances — and the cryptographic proof of both who they are and what they may do travels with the affordance. This is HATEOAS carried to its conclusion: the representation does not merely describe what transitions are possible, it carries the full credential to perform them.

**What this constraint dissolves:**

- **The cookie-session architecture entirely.** Not just session state for authorization, but the cookie as the mechanism of identity persistence. The representation itself carries scoped identity and permission. No ambient credential is needed.
- **The authentication-authorization separation.** These were never fundamentally separate concerns. They were separated by the cookie architecture's inability to scope credentials to specific actions. When the credential is embedded in the representation at construction time — when the server has maximum context about both identity and intent — they unify naturally.
- **CSRF for token-mediated mutations.** The token is scoped to a specific user, action, type, and record. It is not a general-purpose credential. A token that authorizes "user 42 may update post 17" cannot be replayed by user 43, cannot target post 18. The HMAC signature seals these parameters together. (CSRF remains a concern for any mutation path that bypasses the two-phase token pattern.)
- **Ambient authority.** Cookies grant ambient authority — every request to the domain carries the cookie, regardless of intent. Action tokens grant specific authority — this user, this form, this action, this record, this window of time. The principle of least privilege is enforced by the token format itself.
- **Server-side state between requests.** The server does not need to remember what it authorized or who it authenticated because both decisions are encoded in the representation. Every request is self-contained. Fielding's statelessness constraint is not approximated — it is restored.

**The magic link implication.** If authentication and authorization are unified in the token, and the token is embedded in the representation at construction time, then the initial entry point into the application need only establish identity once. A magic link — a signed URL sent via email — authenticates the user for the initial GET. The engine resolves identity from the link's token, constructs the representation with all appropriate mutation tokens embedded, and the user is fully authenticated and authorized for every action on the page. No login form. No session cookie set. No server-side session created. The representation they receive IS their session — stateless, scoped, and cryptographic.

This extends further. Authentication itself becomes granular. A magic link can grant access to a specific page with specific permissions for a specific duration. Different links to the same application can carry different identity scopes — an admin link, an editor link, a read-only link — each producing a different resolved representation with different embedded affordances. The authentication is not "you are logged in." It is "you are this identity, with these permissions, for this representation, right now."

**What this constraint induces:** Every request in a PRESTO application is self-authenticating and self-authorizing. The resolved representation contains exactly the affordances that the identified user is permitted to use — not because a session store was consulted, but because the construction pipeline resolved identity, evaluated permissions, and embedded scoped, signed proof of both directly into the hypermedia controls. Fielding's self-describing message constraint is fulfilled: each message contains everything needed to process it, including the proof of who sent it and what they are allowed to do. The representation is the session. The session is stateless.

### 4.6 Token Scoping and the Bearer Forwarding Problem

A stateless, self-contained credential that travels with the request introduces a specific vulnerability: the credential can be forwarded. If a magic link carries a signed token in its URL, a user who shares that URL shares the credential. The recipient gains the sender's identity and permissions without the server's authorization.

This is the **bearer forwarding problem** — inherent to any bearer token model, including OAuth access tokens and JWTs. It is not unique to PRESTO. What is unique is that PRESTO's construction-level constraints provide scoping mechanisms that bind the token to its intended recipient without introducing server-side session state. The statelessness constraint holds. The scoping is in the token and its verification, not in server-side memory.

Five scoping mechanisms, ordered from lightest to strongest:

**Temporal scoping.** The token carries an expiry (`exp`). Short TTLs — five minutes for page access, sixty seconds for sensitive mutations — limit the forwarding window. Each resolved representation embeds fresh tokens scoped to the next set of actions. A forwarded token dies before it can be meaningfully exploited. The next page carries the next credentials, and only the legitimate recipient's browser is rendering the next page.

**Fingerprint binding.** The token payload includes a client fingerprint hash: `{ sub, role, action, type, recordId, exp, fp }`. The fingerprint is derived from request headers observed during the initial GET — User-Agent, Accept-Language, IP address prefix (first three octets, for NAT tolerance). On execute (POST), the server recomputes the fingerprint from the incoming request and compares it to the value sealed in the token. The forwardee possesses the token but cannot reproduce the request context in which it was issued. Different browser, different network — the HMAC signature verifies, but the fingerprint mismatches. Rejected.

**Single-use nonce.** The token payload includes a unique identifier (`jti`). The server maintains a lightweight nonce set — not a session store, but a bounded set (or bloom filter) of consumed `jti` values. On execute, the `jti` is checked against the set and marked consumed. The token works exactly once. Forward it and it is already spent. The nonce set lives only for the token's TTL window, then is pruned. This is minimal server state — bounded, temporal, deterministically sized — not a session.

**Challenge-response.** For high-security mutations, the prepare phase embeds a random challenge value in the representation alongside the token. The client must include both the token and the challenge in the POST. The challenge is rendered in the page — visible to the user who received and rendered the representation, invisible to someone who possesses only the URL. This is proof-of-rendering: the mutation can only be submitted by an actor who actually saw the resolved representation. No CAPTCHA. No interactive verification. The challenge is a value that exists only in the rendered document.

**Channel binding.** When the initial GET establishes a WebSocket channel via `htx:grant`, the mutation token can include the channel identifier. The POST must originate from a client that holds both the token and an active channel authenticated by the same grant. Forwarding the URL does not forward the WebSocket session. The forwardee has the credential but not the transport. This is the strongest binding — it requires the legitimate recipient to have both rendered the page and established the authenticated channel.

These mechanisms compose. The lightest default — temporal scoping plus fingerprint binding — covers the majority of use cases. Single-use nonces apply to mutations that must execute exactly once (financial transactions, record deletions). Challenge-response applies to sensitive operations where proof-of-rendering is required. Channel binding applies to real-time contexts where WebSocket authority is already established.

The critical observation is that none of these mechanisms introduce sessions. Each binds the token to something the legitimate recipient possesses and the forwardee does not — time, request context, consumption state, rendered content, or transport — without requiring the server to maintain per-client memory between requests. The statelessness constraint is preserved. The bearer forwarding problem is addressed not by making the token non-bearer (which would require server-side session state to track ownership) but by making the token bearer-scoped — usable only by a bearer who can demonstrate the properties that the token's issuance context expected.

### 4.7 Threat Model and Open Security Concerns

The token-based auth model addresses several conventional threats (CSRF via scoped tokens, ambient authority via non-cookie transport, session state via self-contained credentials) but introduces its own concerns that must be addressed explicitly:

**Revocation.** A stateless token cannot be revoked without introducing server-side state. Short TTLs (5 minutes for sensitive mutations, 1 hour for page access) bound the exposure window. For immediate revocation (account compromise, privilege change), a bounded revocation set (bloom filter or time-windowed denylist) is the minimum server-side state required. This is acknowledged as bounded state, not a session.

**Privilege lifecycle.** A token issued at construction time reflects the user's permissions at that moment. If permissions change mid-lifecycle (role demotion, account suspension), tokens already in circulation remain valid until expiry. Short TTLs mitigate this. Critical systems should use single-use nonces (Section 4.6) for sensitive operations.

**Token leakage.** Tokens in URL parameters (`_t=`) are visible in browser history, server logs, referer headers, screenshots, and shared links. The architecture recommends URL parameters only for magic link entry. For ongoing navigation, tokens should travel in Authorization headers (via htmx `hx-headers` or equivalent), which are not logged by default, not sent as referers, and not visible in the URL bar.

**Replay.** Bearer tokens are replayable within their TTL window. Single-use nonces (jti + bounded nonce set) prevent replay for critical mutations. For non-critical operations, temporal scoping + fingerprint binding provides adequate protection without server-side state.

**Step-up authentication.** The current model does not address step-up auth (requiring re-authentication for sensitive operations within an existing session). This can be modeled as a separate `htx:action` token with a shorter TTL and a challenge-response requirement, but the mechanism has not been formally specified.

**Logout.** Without server-side sessions, "logout" means discarding the token on the client. The token remains valid until expiry. For immediate logout semantics, a revocation set is required (see above).

The following table summarizes the security posture:

| Threat | Status | Mechanism | Limitation |
|--------|--------|-----------|------------|
| CSRF | **Mitigated** | Scoped action tokens (two-phase prepare/execute) | Only for token-mediated mutations |
| Ambient authority | **Mitigated** | Non-cookie transport (Authorization header) | Magic links use URL params for entry |
| Bearer forwarding | **Mitigated** | Fingerprint + temporal + nonce binding | Bounded state required for nonce set |
| Replay | **Mitigated** | TTL + optional jti nonce | Nonce set requires bounded state |
| Token leakage (URL) | **Mitigated** | Header transport preferred; URL only for magic links | Screenshots, shared devices remain risks |
| Revocation | **Open** | Short TTL + bounded denylist | Requires bounded server-side state |
| Privilege lifecycle | **Open** | Short TTL bounds exposure window | Tokens valid until expiry after privilege change |
| Step-up auth | **Open** | Shorter TTL + challenge-response (proposed, not specified) | Mechanism not formally defined |
| Logout | **Open** | Client-side token discard + optional denylist | Immediate logout requires bounded state |

The model radically reduces the need for cookie-session and OAuth-style ceremony. Where bounded server-side state is required — revocation, immediate logout, step-up authentication — the architecture acknowledges it as bounded state, not as session state. The distinction matters: a time-windowed denylist with deterministic pruning is a different architectural commitment than a per-client session store with unbounded lifetime.

**Explicit non-goals:** Full OAuth replacement in all federation topologies. Universal revocation without bounded state. Replacement of all cookie-based auth in legacy systems. The architecture reduces ceremony where trust domains align. It does not claim to dissolve every trust topology the industry has encountered.

---

## 5. The Induced Property

### 5.1 Behavior or Property?

Fielding introduces the name of his architectural style with careful language:

> The name "Representational State Transfer" is intended to evoke an image of how a well-designed Web application behaves: a network of web pages (a virtual state-machine), where the user progresses through the application by selecting links (state transitions), resulting in the next page (representing the next state of the application) being transferred to the user and rendered for their use.
> — Fielding, 2000, p. 109

He calls it a **behavior**. But consider what he describes: the user selects links, the next page is transferred, the application state advances. This is not something the developer implements. It is what *happens* when the constraints are applied. Remove statelessness and the behavior changes — the server begins tracking session state, navigation becomes coupled to server memory. Remove the uniform interface and the behavior changes — clients must know resource-specific protocols, links cannot drive state transitions generically. Remove cacheability and the behavior changes — every interaction requires a round trip, the "network of web pages" loses its responsiveness.

If removing a constraint removes the "behavior," then the behavior is not a behavior. It is a **property induced by the constraints**. Behaviors are implemented. Properties are induced. The distinction matters because behaviors can be reimplemented under different constraints, while properties cannot — they are bound to the specific constraints that produce them.

Fielding was standing close enough to his own discovery that he described an induced property using the language of behavior. In 2000, this imprecision had no consequences — no major framework was actively violating REST's constraints, so the distinction between "what the developer builds" and "what the constraints cause" was untested. React tested it. When the constraints were removed, the "behavior" disappeared. SSR, hydration, server components, streaming suspense — these are attempts to reimplement the behavior without the constraints that induced it. They partially succeed. They never fully recover the property. This is because they are treating an induced property as a behavior — something that can be rebuilt through engineering rather than something that emerges from architectural constraint.

PRESTO takes the lesson seriously. It identifies its own constraints, names its own induced property, and treats that property as a consequence — not a feature to be implemented, not a behavior to be coded, but a phenomenon that emerges when the constraints hold and disappears when they do not.

### 5.2 The Observation

In 2024, the author observed a PHP function concatenating an HTML string. The string contained an `hx-get` attribute — an instruction for the htmx library on the client. The PHP function did not parse the attribute. It did not know the attribute meant anything. It concatenated the string and delivered it.

The server did not care about the client's instruction.

The observation was then applied in reverse: the client does not care about the server's instructions — because the server consumed them before the client saw the document. A directive like `htx:data` resolves during the server's pipeline, producing HTML that replaces the directive. By the time the browser receives the response, every server directive has been consumed. The client is not merely indifferent to them. It is unaware they existed.

This mutual indifference is not a feature of PHP, or of htmx, or of any specific template engine. It is a property of the medium. The serialized medium can carry uninterpreted substrings for multiple interpreters. Strings do not enforce semantic boundaries. A server that produces strings and a client that consumes strings will naturally be ambivalent to each other's concerns — because the concerns are encoded as characters in a string, and string production does not require semantic comprehension.

### 5.3 The Property Named

The property is **Ambivalent Execution with Agnostic Determinism** (also expressible as **dual-interpreter noninterference** or **namespace-partitioned bilateral resolution** — the formal name is preferred throughout this document for precision, but the simpler aliases serve the same referent).

**Ambivalent** — in two senses. First, from the common usage: neither interpreter cares about the other's instructions. The mutual indifference is structural. Second, from the etymology (*ambi* + *valentia*): the source representation carries two valences — two sets of affordances, two directions of capacity — in one document. The server valence is the `htx:` namespace: directives that declare data needs, composition, grants, and mutations. The client valence is the HTML namespace: elements, scripts, and attributes that declare rendering, behavior, and interaction.

**Execution** — both interpreters actively process the document. The server executes its resolution pipeline. The client executes its rendering and scripting. Two execution passes on one artifact.

**Agnostic** — each interpreter is structurally unaware of the other's behavior. The server does not know the client will open a WebSocket from the token it embedded. The client does not know the server ran fourteen modules to produce the HTML it received. The agnosticism is induced by the namespace separation, not by design choice.

**Determinism** — each interpreter's execution is deterministic given its input. The server will always resolve the same directives the same way. For a given client interpreter and environment, resolution is deterministic. The bilateral boundary guarantees that neither interpreter's determinism interferes with the other's.

### 5.4 Conditions

The property is induced when three conditions are met:

1. A **shared medium** that does not enforce semantic boundaries (HTML as a character string)
2. **Two interpreters** that read the same medium for different instructions (server engine, browser)
3. A **namespace convention** that separates one interpreter's instructions from the other's (`htx:` prefix for server directives, standard HTML for client instructions)

These conditions are met by every server-rendered HTML page served over HTTP. The property has been present since the first HTTP response. It was not recognized because each domain's practitioners see their instance too deeply to see it as an instance of a general principle.

### 5.5 What PRESTO's Constraints Induce

REST's constraints induce the property "representational state transfer." PRESTO's constraints induce a different property: **ambivalent execution with agnostic determinism**.

The four words are precise:

- **Ambivalent** — two valences. The source representation carries two sets of instructions addressed to two interpreters. The word also carries its common meaning: each interpreter is indifferent to the other's instructions.
- **Execution** — both interpreters actively process the document. The server does not merely pass the document through. The browser does not merely display static markup. Both execute.
- **Agnostic** — each interpreter is structurally unaware of the other's behavior. The server engine does not model what the browser will do with the HTML it emits. The browser does not know that directives were consumed before the document arrived.
- **Determinism** — each interpreter produces the same output for the same input, regardless of the other's presence or behavior.

This property was present in the first PHP function that concatenated an `hx-get` attribute into an HTML string. The PHP function did not know what `hx-get` meant. It did not need to. It processed its own logic (database query, string concatenation) and emitted a document that happened to contain instructions for another interpreter. The browser, receiving the document, processed `hx-get` without knowing that PHP had assembled the document. Two interpreters. One document. Mutual indifference.

PRESTO's constraints do not create this property from nothing. They **formalize and protect** a property that has existed in server-constructed representations transmitted over HTTP since 1993. The bilateral boundary ensures the property cannot be violated by namespace collision. Namespace separation ensures forward compatibility. Server-consumed directives ensure the property survives resolution — no server artifacts leak into the client's domain. Progressive code-on-demand ensures the property degrades gracefully as complexity increases.

---

## 6. Composition, Not Extension

PRESTO does not extend REST. Extension implies modification — adding constraints to REST's set, altering its induced properties, changing the style. PRESTO does none of these.

PRESTO **composes** with REST. The two styles operate at different levels:

| | REST | PRESTO |
|---|---|---|
| **Operates at** | Transfer level | Construction level |
| **Governs** | How representations move | How representations are authored |
| **Constrains** | Client-server interaction | Developer-engine interaction |
| **Induces** | Representational state transfer | Ambivalent execution with agnostic determinism |
| **Visible to** | Client, server, intermediaries | Developer, engine (invisible after resolution) |

A server can be RESTful without PRESTO. It produces representations through unconstrained code. The representations enter the uniform interface. REST's properties hold.

A server can use PRESTO's constraints without REST. It could author bilateral documents for a non-RESTful transfer protocol. PRESTO's properties would hold at the construction level, though the transfer-level properties would be whatever that protocol induces.

When both styles compose — when a PRESTO-constrained construction feeds into a RESTful transfer — the result is a server that is consummately RESTful in its transfers and consummately principled in its constructions. The resolved representation is a complete, cacheable, self-describing hypermedia document (REST's requirements). The source representation is a bilateral, namespace-separated, progressively layered authoring artifact (PRESTO's requirements). The uniform interface is the seam between the two styles.

### 6.1 The Properties Are the Constraint

The composition between levels is not merely compatible — it is governed by a precise relationship: **the induced properties of the enclosing level function as constraints on the enclosed level.**

REST's constraints induce a collection of properties: statelessness, cacheability, uniform interface, layered system, complete self-describing representations. This collection is what Fielding named "representational state transfer." The name does not refer to a mechanism. It refers to the induced properties as a whole.

PRESTO's constraints are not free to violate any property in this collection. This is not a design preference. It is a meta-constraint: PRESTO must not violate the constraints that induce the properties collectively named representational state transfer. If a PRESTO constraint caused the resolved representation to be incomplete, or stateful, or non-cacheable, it would violate REST — not by modifying a REST constraint directly, but by destroying one of the properties the REST constraints induce. The properties of the enclosing level are inherited as constraints on the enclosed level.

This relationship is recursive. SERVER's constraints must not violate the properties collectively named ambivalent execution with agnostic determinism (PRESTO's induced properties). If an orchestration constraint caused the runtime graph to leak server-namespace artifacts into the resolved representation, it would destroy the bilateral boundary — not by modifying a PRESTO constraint directly, but by violating one of the properties PRESTO's constraints induce. And below SERVER, any application code that adheres to the constraints from above inherits the induced properties from every enclosing level as constraints on itself.

The general principle: constraints induce properties. Those properties become the constraints on the next level. The constraints at each level are derived from the properties of the level above. This is how levels compose without collision — not by being designed to avoid each other, but by being constrained by each other's induced properties. The properties are the constraint.

---

## 7. The Constraint-Property Spectrum

The bilateral boundary defines a design space. The developer navigates this space by selectively applying constraints in the source representation. Each constraint is a directive, a grant, a script, or a behavioral declaration that narrows the server's ambivalence — the server now cares about what it embeds — while inducing a specific client-side capability.

The design space is not a ladder from simple to complex. It is a spectrum of ambivalence from maximum properties (no additional constraints) to maximum capability (all available constraints applied). The developer's skill is navigating this spectrum — applying only the constraints each feature requires, preserving every property that unnecessary constraints would trade away.

### 7.0 Maximum Ambivalence (Layer 0): The Surface

At maximum ambivalence — no constraints applied beyond REST's own — the source representation is pure HTML with server-resolved data directives. The engine queries data, evaluates expressions, composes components, and emits a complete HTML document. The client receives finished HTML.

**Properties induced (free — no constraint cost):**

- **Full cacheability.** Any HTTP intermediary can cache the response. No cache invalidation strategy required.
- **Universal accessibility.** Any device that renders HTML can consume the representation. No JavaScript runtime required.
- **Complete server authority.** The server controls everything the client sees.
- **Intermediary transparency.** Proxies, CDNs, load balancers operate on the response without application knowledge.
- **Search indexability.** The content is in the HTML.
- **Graceful degradation.** There is nothing to degrade from.
- **Statelessness.** Each request is independent.
- **Complete representation.** The response contains everything needed to render the page.

These properties are not features. They are consequences of not constraining the representation further. They are what REST's constraints induce when code-on-demand is not applied.

Most features live here. More features than the industry currently believes can live here.

### 7.1 First Constraint (Layer 1): Declarative Client-Side Attribute Interpretation

**Constraint applied:** The representation includes HTML attributes (`hx-get`, `hx-swap`, `hx-trigger`) that a client-side library (htmx) interprets to perform partial page updates.

**Capability induced:** Partial page updates without full navigation. Server-rendered HTML fragments replace regions of the document.

**Properties traded:** Marginal visibility reduction. Dependency on a 14KB client library.

**Properties preserved:** Server authority (the server renders every fragment). Cacheability (fragments are cacheable). Statelessness. Complete initial representation.

**The author's decision:** "Does this feature need partial updates without full page navigation?" If yes, add htmx attributes. If no, stay at maximum ambivalence. The cost is minimal. The surface properties are almost entirely preserved.

### 7.2 Second Constraint (Layer 2): Scoped Imperative Code Execution

**Constraint applied:** The representation includes `htx:script` blocks — imperative JavaScript scoped to a component's DOM element. The engine extracts the script, wraps it in an IIFE with a `data-htx-id` element binding, and injects it before `</body>`.

**Capability induced:** Client-side behavior that HTML alone cannot express — dialogs with ESC-to-close, sliders with live value display, dropdowns with keyboard navigation.

**Properties traded:** Reduced visibility. The client's behavior is no longer fully determined by examining the HTML alone. The representation now carries executable code.

**Properties preserved:** Complete representations (the document is finished before scripts execute). Server authority over content (the script enhances, it does not construct). Cacheability of the HTML response.

**The author's decision:** "Does this feature need behavior that declarative attributes cannot express?" If yes, add an `htx:script`. The script enhances a complete document. It does not construct one.

### 7.3 Third Constraint (Layer 3): Server-Pushed Executable Code Over Persistent Connection

**Constraint applied:** The server pushes JavaScript to the client over a WebSocket connection, authorized by a scoped channel token issued via `htx:grant`.

**Capability induced:** Dynamic, server-authoritative code delivery. Per-user capability differentiation. The server decides what code each client receives.

**Properties traded:** Statelessness is partially surrendered (the WebSocket is persistent). The client's execution environment is shaped by what the server pushed, which is not visible in the initial HTML representation.

**Properties preserved:** Server authority over what code is delivered. The initial representation is still complete.

**The author's decision:** "Does this feature need server-pushed, per-user code?" If yes, accept the WebSocket constraint. The cost is partial statelessness.

### 7.4 Fourth Constraint (Layer 4): Authenticated Data Channel

**Constraint applied:** The pushed code opens a scoped HTTP connection to the server using a signed channel token. The token authorizes access to a specific module's data endpoints.

**Capability induced:** REST-style data access from client-side code. Standard HTTP debugging and caching of data requests. The pushed code can fetch, post, and subscribe.

**Properties traded:** Additional connection overhead. The client now fetches data independently of template rendering, approaching (but not reaching) the thick-client model.

**Properties preserved:** Server authority over data access (token-scoped). Standard HTTP for data requests. The initial representation is still complete.

**The author's decision:** "Does this feature need its own data channel?" If yes, accept the second connection and the token-scoped access pattern.

### 7.5 Fifth Constraint (Layer 5): Client-Controlled Rendering and Routing

**Constraint applied:** The client assumes rendering authority within a bounded region of the representation. Client-side routing, state management, and autonomous UI updates operate within the boundary.

**Capability induced:** Preserved client state across navigations. Application-like interaction. The client manages its own rendering lifecycle within the bounded region.

**Properties traded:** Server authority over rendering is delegated within the boundary. SEO requires the Layer 0 shell. The client is responsible for its own state within the region. Cacheability is suspended within the boundary.

**Properties preserved:** The Layer 0 representation at the HTTP boundary (the page is complete HTML). All surface properties hold outside the bounded region.

**The author's decision:** "Does this feature need client-controlled rendering?" If yes, accept the delegation within a bounded region. The cost is significant. Confine the boundary to the smallest possible region. Everything outside it retains the surface properties.

### 7.6 Sixth Constraint (Layer 6): Binary Computation in Client Sandbox

**Constraint applied:** WebAssembly modules execute in the browser's sandboxed virtual machine, compiled from C, Rust, or AssemblyScript.

**Capability induced:** Near-native computation speed. Capabilities that JavaScript cannot efficiently provide — image processing, physics simulation, cryptographic operations, ML inference.

**Properties traded:** WASM compilation required. Significant client-side computation. Maximum distance from the surface. Maximum constraint cost.

**Properties preserved:** The Layer 0 shell at the HTTP boundary. Binary computation is sandboxed. The module cannot escape the browser's security model.

**The author's decision:** "Does this feature need native-speed computation?" If yes, accept the compilation cost and the binary delivery mechanism. This is the deepest constraint the architecture supports.

**The enterprise implication:** When WASM binaries are delivered ephemerally over an authenticated WebSocket (pushed by the server, never stored on disk, executed in a sandboxed VM, discarded after use), the server achieves **server-authoritative distributed client compute**. The computation executes on the client's hardware — distributing the compute cost — while the intellectual property (the binary) never leaves the server's authority. It is granted as a scoped capability (via `htx:grant`), delivered over an authenticated channel, and consumed without persistence. This dissolves the traditional tradeoff between compute distribution and IP protection.

### 7.7 The Spectrum Summarized

| Depth | Constraint Applied | Capability Induced | Key Property Traded |
|-------|-------------------|-------------------|-------------------|
| Layer 0 | None beyond REST | Full REST properties | None |
| Layer 1 | Client-side attribute interpretation | Partial page updates | Marginal visibility |
| Layer 2 | Scoped imperative code | Scripted behavior | Visibility |
| Layer 3 | Server-pushed code over WebSocket | Dynamic code delivery | Partial statelessness |
| Layer 4 | Authenticated data channel | REST-style data from client | Independent data fetching |
| Layer 5 | Client-controlled rendering | Application-like interaction | Server authority (within boundary) |
| Layer 6 | Binary computation (WASM) | Native-speed processing | Maximum constraint cost |

Reading top to bottom: each row applies a constraint, gains a capability, and trades a property.

Reading bottom to top: each row removes a constraint, loses a capability, and recovers a property.

The developer navigates this spectrum per feature, per page. A page can have content at Layer 0, a search input at Layer 1, a dialog at Layer 2, and a chart at Layer 5 — each feature at the shallowest depth its requirements demand. The architecture does not force a global choice.

---

## 8. Architectural Encapsulation

### 8.1 Why REST Can Enclose Distributed Objects

One consequence of this composition is that a RESTful server can transmit any client-side architecture within its representations — including Distributed Objects.

This is counterintuitive. REST and Distributed Objects are often presented as competing paradigms. Fielding explicitly evaluated DO in Chapter 3 of his dissertation and found it deficient for network-based architectures. How can a RESTful server deliver React components?

The answer lies in the level distinction. REST constrains the transfer. It requires complete representations, statelessness, cacheability. A resolved representation that contains a `<script>` tag loading React does not violate these constraints. The representation is complete (it includes the script). The transfer is stateless (no session between requests). The representation is cacheable (the server sets appropriate headers). React operates within the representation after transfer — at the client level, not the transfer level.

What React violates — when used as the outer architecture — is not individual REST constraints but the architectural encapsulation. A Single Page Application makes React the outer architecture: the initial representation is empty, state is managed client-side, navigation happens without server interaction, and the server degrades to a data API. REST's properties are lost not because any single constraint is explicitly broken, but because the DO model assumes architectural primacy.

PRESTO resolves this by constraining the construction. An `htx:component` that renders a React island is a server-consumed directive. The server decides whether to include it. The server grants the authentication token the island needs. The server controls the scope of the island's data channel. The island operates as a Distributed Object within a bounded region of a complete representation — enclosed by REST at the transfer level and authorized by PRESTO at the construction level.

The encapsulation is:

- **REST** provides the outer architecture (transfer of complete representations)
- **PRESTO** authors the encapsulation (server-controlled, progressively authorized)
- **DO** operates within bounded inner regions (islands, topologies)

Three styles. Three levels. No collision. The key insight is that architectural encapsulation requires authoring authority — someone must decide what is enclosed and at what scope. REST does not provide this authority because it does not operate at the construction level. PRESTO does.

### 8.2 The Encapsulation Principle

The REST representation, because it is complete and self-describing, can serve as the enclosing boundary for any client-side architecture — including architectures whose own constraints are more restrictive than REST's.

A React component tree mounted into a server-rendered div operates as a distributed object architecture within the region the REST representation allocated for it. The DO model's constraints (component state, virtual DOM reconciliation, render cycle) apply within the bounded region. The REST model's constraints (statelessness, complete representations, uniform interface) apply at the HTTP boundary.

This is not a workaround. It is the natural consequence of the bilateral boundary. The server's portion of the representation was consumed. The client's portion — including the bootstrapping instructions for the bounded architecture — survived. The representation carried the instructions. The boundary guaranteed non-interference.

### 8.3 Nesting Direction

The encapsulation is asymmetric. The DO model can be nested within REST. REST cannot be nested within the DO model in a way that preserves REST's properties.

The reason: REST's properties are induced by constraints on the outermost interaction. If REST is the outer style, cacheability, completeness, and server authority hold at the HTTP boundary regardless of what operates within. If the DO model is the outer style — as in a conventional React application — the HTTP exchange serves an empty shell. The REST properties are structurally absent because the outer boundary does not enforce REST constraints.

SSR in React is an attempt to surface toward REST's properties. The surfacing is temporary; hydration pulls the architecture back to depth. The properties are recovered momentarily, then abandoned.

Under correct encapsulation — REST as outer, DO as inner — the properties are permanent at the outer boundary. The inner architecture gains its capabilities within its bounded region. Neither compromises the other.

### 8.4 The Island Protocol

The encapsulation is made practical through a standard interface: `defineIsland()`. Any React, Vue, Svelte, or vanilla JavaScript package can be mounted into a bounded region of the representation using the same protocol:

1. The island author writes a `defineIsland({ name, mount })` definition
2. The builder bundles it into a self-contained JavaScript file
3. The template author places a `<template>` data bridge and an `<htx:component src="/ui/island.htx">` mount point
4. The engine resolves the template, preserving the mount point and data bridge as standard HTML
5. The client loads the bundle and mounts the island into the prepared region

The protocol was verified with seven npm packages across five interaction domains: React Query (data fetching), Recharts (charting), TipTap (rich text), Leaflet (maps), CodeMirror (code editing), dnd-kit (drag-and-drop), and a pure WebGL renderer (3D). A full React SPA with its own router and state management was also mounted as a single island.

---

## 9. The Design Space

When PRESTO and REST compose, the developer occupies a design space that neither style could open alone.

REST alone offers a binary: either the server delivers a complete representation with no code-on-demand, or it delivers code-on-demand without formal constraints on how much code, at what scope, or with what authorization. The history of web development is the story of this binary — the industry chose "all code" and then spent fifteen years building compensating technologies to recover the properties that "no code" provided for free.

PRESTO alone — construction-level constraints without a transfer model — would produce well-authored documents with no formal guarantees about how they move, cache, or compose across the network.

Together, they open a design space where architectures can nest within architectures, each nesting trading specific properties for specific capabilities.

### 9.1 The Layers Are Not Constraints

The original articulation of this design space identified seven progressive layers (0-6), from pure server-rendered HTML through declarative enhancement, scoped scripts, server-pushed code, authenticated channels, full SPA, to native compute. These layers were discovered empirically — observed in existing practice and catalogued by the properties they trade.

But the layers are not constraints of PRESTO. They are not constraints of REST. They are **observations about what kinds of architecture can nest within a RESTful transfer without violating it**. Each layer represents a category of interface agreement between server and client — a different answer to "who decides what, and how do they communicate":

| Category | Interface Agreement | Properties Traded |
|----------|-------------------|-------------------|
| Complete representation | Server provides everything. Client renders. | None — maximum properties. |
| Declarative enhancement | Server provides interaction hints. Client follows declaratively. | Some server authority (client chooses when to follow hints). |
| Scoped behavior | Server authors code. Client executes in document context. | Universality (requires JavaScript runtime). |
| Server-initiated delivery | Server pushes code. Client receives and executes. | Statelessness of individual interactions (persistent connection). |
| Bidirectional channels | Server and client negotiate data flow. | Cacheability, visibility to intermediaries. |
| Client-assumed authority | Client controls rendering and routing. | Server authority, complete representations, cacheability. |
| Native compute | Client executes at native speed. | All REST properties within the bounded region. |

The specific technologies at each category — htmx, WebSocket, React, WASM — are contingent. They are the current implementations of these interface agreements, not the agreements themselves. A future transport protocol could replace WebSocket. A future execution standard could replace WASM. The categories would remain because they describe kinds of server-client interface, not implementations of those interfaces.

Whether these categories are exhaustive — whether they represent all possible kinds of nesting within REST — is an open question. They may be derivable from REST's uniform interface constraint, with each category representing a specific relaxation of that interface. If so, the categories are ordered by the degree of interface relaxation, and their number is determined by the structure of REST itself, not by the accidents of current technology. This deserves formal treatment in a separate inquiry.

### 9.2 PRESTO as One of Many Possible Nestings

REST defines constraints at the transfer level. PRESTO defines constraints at the construction level. The two compose. But nothing in REST requires PRESTO specifically. REST is silent on construction. Any set of construction-level constraints that does not violate REST's transfer-level constraints would compose equally well.

This means PRESTO is one of potentially many construction-level architectures that could nest within REST. The constraints identified in this dissertation — bilateral boundary, namespace separation, server-consumed directives, progressive code-on-demand, server-embedded authentication and authorization — were discovered by intuition and validated by implementation across six languages. They work. They induce the properties described here. But they are not deducible from REST. They are a creative act — a specific choice of constraints that produces a specific style with specific properties.

Someone else could identify a different set of construction-level constraints that also nests within REST, induces different properties, and produces a completely different developer experience. The nested constraints framework predicts this: any coherent set of constraints nested within a governing style induces emergent properties. PRESTO is an instance. The framework permits many instances.

This is not a weakness of the argument. It is its strength. PRESTO does not claim to be the only possible construction-level architecture. It claims to be a coherent one — one whose constraints induce properties that dissolve the compensating technology stack, enable declarative convergence, and provide a navigable design space. Whether better constraint sets exist is an empirical question that further work can address.

### 9.3 The Surface Is the Most Dynamic Layer

The default position — where the PRESTO engine has resolved all directives and the REST server delivers a complete representation — is commonly perceived as "static." This perception is inverted.

At this position, the server resolves data queries, evaluates conditionals, processes authentication, issues cryptographic credentials, iterates collections, includes components, wraps layouts, and injects memories — all within a single request. The resolved representation is complete, personalized, and current. The developer has access to the full composable depth of the server — databases, APIs, computation, business logic, identity negotiation — all converged through the declarative directive surface.

This is not static. This is **maximally dynamic at resolution time**. Every request produces a bespoke representation. The dynamism happens on the server, where the context is complete. The client receives the result.

What developers associate with "dynamic" — client-side interactivity, real-time updates, SPA navigation — is a different kind of dynamism: **interaction-time dynamism**. This dynamism happens on the client, where the context is partial. The client must manage its own state, synchronize with the server, and compensate for the properties it traded by descending from the surface.

Choosing to descend does not add dynamism. It trades resolution-time dynamism (where the server has full context) for interaction-time dynamism (where the client has partial context). The tradeoff is not "simple vs. complex." It is "where does the intelligence live, and what properties support it?"

The industry defaults to interaction-time dynamism because it has lacked construction-level architectures that make resolution-time dynamism productive. Developers descend because they believe the surface is barren. The surface is not barren. It is the layer where the most properties hold, the most capabilities converge, and the most tools (visual builders, AI generators, declarative authoring) operate most effectively. The surface is the most fertile layer — if the construction-level constraints are in place to cultivate it.

### 9.4 The Dual View of Descent

Descending through the design space can be viewed in two ways, and both must be held simultaneously:

**The additive view:** each layer adds code. Layer 0 has zero client JavaScript. Layer 2 adds scoped scripts. Layer 5 adds a full application framework. This view sees descent as accumulation — more code, more capability, more complexity.

**The property view:** each layer trades properties. Layer 0 has maximum REST and PRESTO properties. Layer 2 trades universality (requires a JavaScript runtime). Layer 5 trades server authority, cacheability, and complete representations. This view sees descent as exchange — capability gained, properties lost.

The additive view is how developers naturally think. The property view is how architects should think. The additive view asks "how much code do I want?" The property view asks "which properties am I willing to lose, and is the capability I gain worth the exchange?"

The compensating technology stack exists because the industry operates in the additive view. Developers add React (capability), then add SSR to recover complete representations (property), then add hydration to recover interactivity (capability), then add streaming to recover performance (property). Each step alternates between adding capability and recovering properties. The oscillation is the symptom of operating without the property view.

PRESTO provides the property view. At each point in the design space, the developer knows which properties hold and which have been traded. Descent is deliberate. The exchange is explicit. And the developer can scope different regions of the same representation to different layers — one region at the surface (maximum properties), another at depth (specific capability) — without the deeper region's tradeoffs contaminating the shallower one.

---

## 10. The Specification (htxlang)

### 10.1 Distinction of Levels

The architectural style (PRESTO) describes the constraints and the properties they induce. The specification (htxlang) describes how a conformant engine implements the bilateral resolution — the 22-stage pipeline that transforms a bilateral source representation into a unilateral resolved representation.

The specification defines 8 contracts, 16 directive families, and a deterministic pipeline ordering. It is language-agnostic. A conformant engine can be implemented in any language that can serve HTTP and process strings.

### 10.2 The 16 Directive Families

Each directive is a constraint that the author applies to the source representation. Each declares an intent that the engine fulfills:

| Directive | Author's Declaration |
|-----------|---------------------|
| `htx:data` | "I need data from the database" |
| `htx:each` | "Repeat this for each item" |
| `htx:if` / `htx:else` | "Show this conditionally" |
| `htx:v` | "Output this value" |
| `{htx:}` | "Bind this value to an attribute" |
| `htx:component` | "Use this reusable composition" |
| `htx:include` | "Embed this partial" |
| `htx:let` | "Bind this variable" |
| `htx:action` | "This page can perform this mutation" |
| `htx:grant` | "Issue a signed credential for this capability" |
| `htx:auth` / `htx:unauth` | "Show this based on authentication state" |
| `htx:layout` | "Use this layout wrapper" |
| `htx:script` | "Execute this on the client, scoped to this component" |
| `htx:raw` | "Do not process this region" |
| `htx:props` / `htx:slot` | "This component accepts these parameters" |

Each directive operates on the server valence of the bilateral boundary. Each is consumed during resolution. None survives to the client.

### 10.3 The Uniform Directive Interface

Every directive that reads from the data context operates through the same uniform interface: a module registers a context provider, the provider injects data at Stage 4 of the pipeline, and the directive evaluates the data at its designated stage. The directive does not know which module provided the data. The module does not know which directive will consume it.

This means `htx:auth` works with any auth provider. `htx:data` works with any content adapter. `htx:grant` works with any credential provider. The template references the directive interface, not the implementation. There is no lock-in because the template never references the implementation.

### 10.4 Declarative Convergence

The uniform directive interface induces a property that deserves explicit treatment: **force multiplication through declarative convergence**.

Each directive in the source representation acts as a convergence point. Behind the directive stands the full composable depth of the server — adapters, modules, services, security infrastructure, LLM integration, any capability that can be wired into the pipeline. The directive collapses this depth into a single declarative expression. The client receives only the resolved output. The complexity of the server is not transferred to the client. It is consumed by the engine.

Consider `{htx:authUser.name}`. This expression resolves to the authenticated user's name. It does not know whether the identity was established by a native HMAC token, an httpOnly cookie, an OAuth session via a third-party library, or a magic link. The expression is stable. The resolution path is composable. Each new auth adapter extends what the expression can resolve from — without changing the expression.

The same pattern holds for every directive:

- `htx:data` converges data resolution. Adding a new `ContentAdapter` (Convex, a remote API, a distributed database) extends what `htx:data` can query — without changing any template that uses it.
- `htx:action` converges mutation authorization. Adding fingerprint binding, nonce verification, or identity scoping to the `ActionTokenService` extends what `htx:action` seals into each token — without changing any template that declares an action.
- `htx:grant` converges capability issuance. Adding new channel handlers or WebSocket topology delivery extends what `htx:grant` can authorize — without changing any template that requests a grant.

The directive is the aperture. The server's capabilities are the light source. The aperture is fixed and finite (16 directive families). The light source is composable and unbounded (any number of modules, adapters, and services). Adding capability behind the aperture extends what every existing template can do — without modifying any template.

This is why the visual editor, the AI generator, and the CLI installer all operate on the same 16-directive-family surface. The surface is stable because it is declarative. The capabilities behind it grow because they are composable. The bilateral boundary guarantees the separation: the server resolves, the client renders, and the template is the convergence point between two interpreters that never interfere.

The 16 current directive families are not a closed set. They are the set that the current constraints prescribe. Any server capability that has no declarative convergence point — any capability that currently requires custom route handlers or client-side JavaScript to bridge between server knowledge and client representation — is a candidate for a new directive. The directive does not create the capability. It makes the capability declarative, and therefore available to every consumer of the source representation format.

### 10.5 The 22-Stage Pipeline

The pipeline is a deterministic sequence of string transformations:

```
 1. Static file serving
 2. Channel API with Bearer validation
 3. Middleware chain execution
 4. Context provider injection
 5. Pre-layout template processors
 6. htx:include expansion
 7. htx:component resolution
 8. Page-level htx:script extraction
 9. htx:let binding
10. htx:data resolution
11. htx:grant materialization
12. htx:action token preparation
13. htx:auth / htx:unauth conditional
14. htx:each / htx:if control flow
15. htx:v / {htx:} expression evaluation
15b. Layout directive extraction
16. Directive stripping
17. Post-layout template processors
18. Layout wrapping
19. Post-layout resolution pass
20. Script injection
21. Final expression pass
22. Script finalization, htx:raw stripping
```

Each stage receives a string and produces a string. The input to stage 1 is the source representation (bilateral). The output of stage 22 is the resolved representation (unilateral). The pipeline is the mechanism by which the server consumes its valence.

---

## 11. Evaluation

### 11.1 Cross-Language Verification

The specification was implemented independently in six programming languages:

| Engine | Language | Paradigm | Lines | Memory | Tests |
|--------|----------|----------|-------|--------|-------|
| presto-engine | TypeScript | OOP + async | ~4,000 | 112 MB | 33/33 |
| presto-go | Go | Imperative + goroutines | 2,173 | 19.8 MB | 22/22 |
| presto-elixir | Elixir | Functional + BEAM | 1,906 | 127 MB | 22/22 |
| presto-python | Python | Dynamic | 1,172 | 38 MB | 22/22 |
| presto-rust | Rust | Ownership | 2,322 | N/A | 22/22 |
| presto-c | C | Manual memory | 3,122 | 11.2 MB | 22/22 |

Each engine was built from the same specification document. Each passes the same verification suite. The specification converges through implementation: each language's constraints reveal consequences previous implementations missed.

### 11.2 Engine Boundedness

The engine does not grow with application complexity. Implementation ranges from 1,172 lines (Python) to 3,122 lines (C). The variation is language expressiveness, not engine complexity. The specification defines a fixed-size problem. A page with three posts and a page with three thousand posts traverse the same 22-stage pipeline.

### 11.3 The Seed

The specification is encapsulated in a 2,020-word self-contained knowledge capsule (the PRESTO seed) designed to be loaded as an AI system prompt. The seed contains the 8 contracts, 16 directive families, 22-stage pipeline, core algorithms, and verification suite. It was tested by producing conformant engines in six languages.

---

## 12. Relationship to Prior Art

The novelty of this work is not server-side rendering, templating, or progressive enhancement. These are established practices. The novelty is formalizing construction-level constraints as an architectural style, distinct from transfer-level constraints, with a named induced property and a conformance-oriented resolver model.

**Server-side templating (PHP, JSP, ERB, Jinja).** Traditional template engines perform variable substitution and control flow on the server. They do not formalize a bilateral boundary, do not define a conformance model, and do not induce a named property. The template language is ad-hoc. The engine is implementation-specific. There is no specification from which independent implementations can be derived. PRESTO's contribution is not the act of server-side rendering but the identification of the constraints that make it architecturally principled.

**Server Side Includes (SSI) and Edge Side Includes (ESI).** SSI and ESI are directive-based inclusion mechanisms processed by web servers or CDNs. They consume server-namespace instructions and emit client-facing content. They are instances of the bilateral boundary — but unnamed, unformalized, and limited to inclusion. PRESTO generalizes the pattern to data resolution, control flow, authentication, mutation authorization, capability grants, and component composition.

**JSX, SSR, hydration, and React Server Components.** React's server-rendering ecosystem is a compensating technology stack. SSR recovers complete representations. Hydration recovers client interactivity. Server Components recover server-authoritative data resolution. Each compensates for properties lost when the Distributed Objects architecture assumed primacy. PRESTO does not compensate — it starts at the surface where the properties are free, and descends only where specific capabilities are needed.

**htmx.** htmx restored declarative hypermedia-driven interaction as a legitimate architectural choice. It demonstrated that partial page updates, form handling, and server-driven UI can be achieved with HTML attributes and no JavaScript framework. htmx is the direct intellectual predecessor of this work — the observation that began the entire chain of derivation was an htmx attribute (`hx-get`) in a PHP function. PRESTO formalizes why htmx works: because the `hx-*` attributes are client-namespace instructions that the server is indifferent to, and the bilateral boundary is preserved. htmx operates at Layer 1 of the progressive spectrum. PRESTO provides the architectural style within which htmx, and all other layers, are coherently positioned.

**Hypermedia Systems (Gross & Stepinski, 2023).** *Hypermedia Systems* articulates the hypermedia-driven application model and demonstrates its viability for modern web development. It provides the developer-facing mental model. PRESTO provides the architectural-level formalization — naming the property, identifying the constraints, and defining the conformance model that makes the approach specification-driven rather than library-driven.

**Server-driven UI (SDUI).** Mobile platforms (Airbnb, Meta) have explored server-driven UI, where the server sends declarative UI descriptions that the client renders. SDUI is a specific application of the bilateral boundary in a non-web medium. PRESTO's framework is medium-agnostic — the constraints apply to any shared medium with namespace-partitioned interpreters.

---

## 13. Declarative Convergence: The Force Multiplication Property

### 13.1 The Observation

A `.htx` template contains the expression `{htx:authUser.name}`. This expression resolves to the authenticated user's name. It does not know — and cannot know — how that name arrived: whether the user authenticated via a native HMAC token, an httpOnly cookie, an OAuth session through better-auth, or a magic link carrying a signed URL parameter. The expression is the same. The resolution path is different. The output is identical.

This is not a feature of the expression engine. It is a property induced by the bilateral boundary.

The server's namespace (`htx:`) addresses a composable interpreter. Behind every directive stands a pipeline of modules, adapters, and services — each replaceable, each satisfying the same interface, each invisible to the template author. The client's namespace (HTML) addresses a fixed interpreter. The browser renders what it receives. It does not know what was resolved to produce it.

The template is the point where these two domains converge. The server's arbitrarily complex resolution collapses into the template's declarative surface. The client receives only the resolved output. The complexity of the server is not transferred — it is consumed.

### 13.2 The Force Multiplication Property

Each declarative directive in the source representation acts as a convergence point — a lens that focuses the entire capability of the server into a single, stable syntactic surface.

`<htx:data type="post" as="posts" />` — this directive resolves from whichever `ContentAdapter` is composed. SQLite, Convex, a remote API, a markdown filesystem, a distributed database. The directive is the same. The adapter multiplies what it can resolve from. Every new adapter extends the directive's reach without changing the directive's syntax.

`<htx:action name="delete" type="post" record="{htx:post.id}" />` — this directive issues a signed mutation token carrying unified authentication and authorization. The identity may come from any auth strategy. The signing key may be configured per-environment. The token scoping may include fingerprint binding, nonce, or channel binding. The directive is the same. The security infrastructure multiplies what it seals into the token.

`<htx:auth>` — this directive renders content conditionally based on identity. The identity may be resolved by any auth adapter. The role model may be simple (admin/user) or complex (RBAC, ABAC, capability-based). The directive is the same. The auth system multiplies what it evaluates.

`<htx:grant type="channel" module="chat" as="chatToken" />` — this directive issues a scoped WebSocket credential. The channel handler may serve real-time updates, collaborative editing, presence indicators, or server-pushed code. The directive is the same. The module system multiplies what the channel delivers.

In each case, the pattern is identical: the declarative syntax is the aperture. The server's capabilities are the light source. The aperture is fixed. The light source is composable. Adding a new adapter, module, auth strategy, or service extends what every existing directive can resolve — without adding new directives, without changing templates, without the client knowing anything changed.

This is force multiplication through declarative convergence. The template author writes to a stable, finite set of directives. The operator composes an arbitrarily deep capability stack behind those directives. The directives do not need to be designed for extensibility — they are extensible by construction, because the bilateral boundary guarantees that the server's namespace is consumed before the client's namespace is rendered.

### 13.3 The Limit Question

If every directive is a convergence point for server capabilities, and the server's capabilities are arbitrarily composable, where is the limit?

The limit is not in the directive syntax. New directives can be formulated — any server-consumed instruction that produces a client-visible effect can be expressed as an `htx:` directive. The namespace is open. The 16 current directive families are not a closed set — they are the set that the current constraints prescribe. Additional constraints would prescribe additional directives.

The limit is not in the module system. Any service that can be wrapped in an adapter or module can feed data into the pipeline's context, and any context value can be resolved by an expression in a directive. The composition is unbounded.

The limit is not in the resolution model. The 22-stage pipeline processes directives in a defined order, but modules can inject pre-processors, post-processors, context providers, and channel handlers at multiple points. The pipeline is extensible without modification.

The limit is the bilateral boundary itself. The server can resolve anything into the representation — but the result must be expressible as HTML (or as code delivered to the client via progressive layers). This is not a limitation of the style. It is the constraint that induces the property. The boundary between server and client is what makes the convergence possible. Without it, server logic would leak into the client, the interpreters would interfere, and the force multiplication would collapse into the coupling that characterizes Distributed Object architectures.

The bilateral boundary is simultaneously the constraint that limits what can be expressed and the constraint that enables everything to be resolved. This is not a paradox. It is the nature of constraints in the nested framework: they delimit the design space, and within that space, they induce properties that would not exist without the delimitation.

### 13.4 Implications for New Directives

If the force multiplication property applies to every directive, then the design of new directives is not a question of syntax — it is a question of identifying which server capabilities have no convergence point yet.

The current 16 directive families converge: data resolution, control flow, expression evaluation, component composition, authentication, authorization, granted capabilities, mutations, layout, inclusion, variable binding, scripting, and raw literal blocks. Each maps to a class of server capability.

What server capabilities remain unconverged? Any capability that currently requires custom route handlers, middleware workarounds, or client-side JavaScript to bridge the gap between what the server knows and what the client receives. Each such gap is a candidate for a new directive — a new convergence point that would bring the server's capability into the template's declarative surface.

The directive is not the feature. The directive is the aperture through which the feature becomes declarative. The feature exists in the modules and adapters. The directive makes it available to the template author — and therefore to the visual builder, to the AI generator, to any tool that operates on the source representation. The force multiplication applies not only to human authoring but to every consumer of the declarative syntax.

---

## 14. Implications for AI-Assisted Construction

The composition of PRESTO and REST has a direct consequence for AI code generation that deserves explicit treatment.

An AI generating a React component must model the entire compensating technology stack: hooks, effects, state management, server/client boundaries, build tool conventions, framework-specific patterns. The generation target is complex because the architectural style is complex — not because the user's intent is complex.

An AI generating a `.htx` template must model HTML with directives. The bilateral boundary means the AI writes to one namespace (the server directives that will be consumed) interleaved with another namespace (the HTML that will survive). The 22-stage pipeline guarantees that any valid source representation produces a correct resolved representation. The AI does not need to model state management (the server resolves data before transfer). It does not need to model hydration (there is nothing to hydrate). It does not need to model code splitting (there is no bundle).

**The simpler the construction target, the more reliable the AI output.** This is not a feature of AI. It is a property induced by the construction-level constraints. PRESTO constrains the authoring model to a point where the generation target is structurally tractable. REST ensures the output is transferable. The composition ensures the AI's output is both well-authored and well-transferred.

This has implications for visual builders. A visual builder that generates `.htx` templates is generating source representations — bilateral documents that the engine will resolve. The builder does not need to understand the resolution pipeline. It writes to the source representation format. The engine handles the rest. This is why the PRESTO editor required almost no architecture of its own: the construction-level constraints had already defined the authoring model. The editor is simply a visual surface for that model.

---

## 15. Identity Negotiation and the Reduction of OAuth Ceremony

### 15.1 The Precedent: Content Negotiation

HTTP has always supported content negotiation. A single URI identifies a resource. The client signals what it wants — `Accept: application/json`, `Accept: text/html`, a format parameter in the URL. The server resolves the same resource into different representations based on the request. The resource does not change. The representation changes. The resolution happens at request time based on what the client tells the server.

This mechanism is so fundamental that it is invisible. Every web developer uses it. No one questions it. The server already knows how to resolve differently based on request parameters.

### 15.2 Identity Negotiation

PRESTO applies the same principle to identity and permission.

A request arrives at a URI. It carries a signed identity token — in a URL parameter, in a header, in a magic link. The server resolves the same resource into different representations based on who is asking. An administrator receives mutation affordances for every record. An editor receives affordances for their own records. A reader receives no mutation affordances at all. The resource is the same. The representation changes. The resolution happens at request time based on what the client presents.

This is not a new mechanism. It is content negotiation applied to identity. The server already knew how to resolve differently based on request parameters. The fifth constraint — server-embedded authentication and authorization — makes identity and permission part of what gets resolved during construction. The pipeline already resolves `htx:data` (what data to include), `htx:auth`/`htx:unauth` (what content to show), `htx:action` (what mutations to permit). Identity negotiation means the entire representation is shaped by who the user is, with scoped cryptographic proof embedded in every affordance.

Content negotiation answers: "What format does this client want?"
Identity negotiation answers: "What is this user permitted to see and do?"

Both are resolved at construction time. Both produce different representations from the same resource. Both are stateless — the request carries everything the server needs.

### 15.3 The OAuth Ceremony and Why It Exists

OAuth exists because the cookie-session model cannot cross origins.

System A authenticates a user. System B needs to trust that authentication. But System A's session cookie is bound to System A's domain. It cannot travel to System B. So we built an entire ceremony: authorization endpoints, authorization codes, token exchanges, access tokens, refresh tokens, token introspection endpoints, PKCE challenge-response, client credentials, scopes, consent screens. The OAuth 2.0 specification is 76 pages. Its extensions and profiles add hundreds more.

All of this machinery answers two questions: who is this user, and what may they do on System B? The ceremony is elaborate because the underlying credential model — domain-bound cookies pointing to server-side sessions — cannot express these answers in a portable, stateless form.

OAuth is a compensating technology. It compensates for the cookie architecture's inability to carry scoped, portable, self-contained credentials across system boundaries.

### 15.4 How PRESTO Dissolves the Ceremony

If authentication and authorization are stateless tokens that travel with the request — not cookies bound to a domain, not sessions stored on a server — then cross-system authentication reduces to passing the token.

System A resolves a representation that includes a signed token scoped for System B. The token carries: who (the user's identity), what (the permissions granted), where (which system or resource), when (expiry). The user clicks the link. System B receives the token, verifies the signature (via shared secret or public key), and resolves its own representation with the appropriate affordances embedded. No redirect dance. No authorization code exchange. No refresh token ceremony. No session on either server.

Each system resolves its own representations based on the identity presented. Each representation embeds fresh tokens scoped to the next set of actions — on its own system or on other systems. The user navigates by hypermedia, and authentication travels with them through the representations themselves.

The token format is simple: `base64url(payload).base64url(HMAC-SHA256(payload, secret))`. The payload carries identity and permission. The signature proves integrity. The expiry enforces temporal scope. No framework. No ceremony. No server-side state.

The architectural constraint is a **signed, scoped, self-contained credential** -- HMAC-SHA256 is one mechanism, sufficient when Systems A and B share a trust domain and a symmetric secret. For cross-organization or federated scenarios where the verifier cannot hold the signer's secret, asymmetric signatures (e.g., Ed25519 or ECDSA with public-key verification) replace HMAC without altering the token's structure or the architectural properties it induces. The constraint is that the credential is signed and self-contained, not that a particular signing algorithm is used.

### 15.5 Enterprise Authentication Without the Enterprise Stack

The modern enterprise authentication stack — WorkOS, Okta, Auth0, Azure AD — exists because cross-system identity is a nightmare. SAML assertions require XML parsing and certificate validation. OAuth requires redirect choreography and token lifecycle management. Session synchronization between services requires shared session stores or token introspection endpoints. Each integration is a bespoke ceremony between two systems that cannot natively share credentials.

This complexity exists because of four properties of the cookie-session model:

1. **Sessions are server-side (stateful).** Each system maintains its own session store. Synchronizing state between stores is an unsolved problem at scale.
2. **Cookies are domain-bound (immobile).** A credential issued by System A cannot be presented to System B without a redirect ceremony.
3. **Authentication and authorization are separated (two lookups).** Identity is established once (login), permissions are checked on every request against a separate data store.
4. **Tokens expire and must be refreshed (another round trip).** Refresh tokens require their own storage, rotation, and revocation infrastructure.

PRESTO's fifth constraint dissolves all four:

1. **No sessions.** The token is self-contained. No store to synchronize.
2. **No cookies.** The token travels with the request — in a URL, a header, a form field. It is not bound to a domain.
3. **Auth and authz unified.** One token. One verification. Identity and permission resolved together.
4. **No refresh ceremony.** Each resolved representation embeds fresh tokens scoped to the next set of actions. The NEXT page carries the NEXT credentials. Token renewal is a natural consequence of hypermedia navigation — every link and form in every representation carries current, scoped proof.

### 15.6 Implications for Autonomous Agents

For LLM agents, API clients, and autonomous systems, the current authentication landscape is a significant barrier. An agent must manage OAuth flows — storing client credentials, handling redirect URIs, refreshing access tokens, detecting and recovering from token expiry, maintaining session state across requests. This is protocol overhead that has nothing to do with the agent's task.

In a PRESTO architecture, an agent navigates exactly as Fielding described a client should: it receives a representation, discovers available actions through hypermedia, and acts on them. Each action's affordance carries the cryptographic proof needed to execute it. The agent does not manage tokens. It does not refresh sessions. It does not handle OAuth redirects. It reads the representation, selects an affordance, submits it with the embedded credential, and receives the next representation with the next set of affordances.

The agent navigates a self-authenticating, self-authorizing hypermedia space. This is REST as Fielding described it — a virtual state machine where the client progresses by selecting links — with the addition that each link carries the authority to be followed. No ambient session. No credential management. No ceremony. The representation is the interface, and the interface carries its own keys.

### 15.7 What Was Always There

Content negotiation was always in HTTP. Statelessness was always a REST constraint. Self-describing messages were always required. HATEOAS was always the goal — the client discovers what it can do through the representation itself.

Identity negotiation — resolving different representations for different identities, with scoped credentials embedded in the affordances — was always possible within these constraints. But it required that authentication and authorization be embedded in the representation at construction time. That required a construction pipeline that knows who the user is and what they may do. That required dissolving the separation between authentication and authorization. That required dissolving the cookie-session model.

Every piece was in Fielding's dissertation. The industry kept the architecture and violated the constraint — adding cookies, sessions, OAuth, refresh tokens, enterprise identity stacks. PRESTO keeps the constraint and lets the architecture work as designed. The representation is the session. The session is stateless. And stateless sessions can cross any boundary — between pages, between systems, between organizations — because they are not stored anywhere. They travel with the request, as Fielding always said they should.

---

## 16. The Navigation Model

### 16.1 Home Depth

Every developer has a **home depth** — the constraint level whose trade-offs match the majority of their problems. The developer internalizes that level's mental model and treats other levels as bounded excursions.

- A content-heavy site lives at Layer 0. The developer thinks in templates and data directives.
- A SaaS application lives at Layer 2. The developer thinks in server-rendered pages with scoped scripts.
- A complex interactive tool lives at Layer 5 (within bounded regions). The developer thinks in components and state.

An escape hatch that fires constantly is a signal that the developer has chosen the wrong home depth. If you're at Layer 5 and constantly surfacing to Layer 0, you should be living at Layer 2.

### 16.2 The Escape Hatch Goes Up

The escape hatch goes toward the surface — toward more properties, not more capabilities. Surfacing from Layer 5 to Layer 2 recovers server authority, cacheability, and search indexability. The developer gains properties. The cost is a wider mental model at the shallower depth.

---

## 17. What Fielding Left Unasked

Fielding's dissertation asks: "What constraints, when applied to the interaction between components in a network-based architecture, induce desirable properties for the transfer of representations?"

PRESTO asks: "What constraints, when applied to the construction of those representations, induce desirable properties for their authoring?"

These are different questions. They have different answers. The answers compose.

Fielding's question produced REST — a style that has governed the web's transfer model for twenty-six years. PRESTO's question produces a style that governs what REST was silent about: how the representation comes into being.

The silence was appropriate. In 2000, representations were produced by unconstrained server-side code, and that was sufficient. The web worked. But the web also evolved. Client-side architectures grew in complexity. Frameworks assumed architectural primacy. The construction of representations became the site of the industry's deepest confusion — not because REST failed, but because the construction level was ungoverned.

PRESTO governs it. Not by imposing prescriptive rules, but by identifying the minimal constraints that induce the maximal properties. Bilateral boundary, namespace separation, server-consumed directives, progressive code-on-demand, server-embedded authorization. Five constraints. One induced property. A design space that composes with REST to produce something neither could produce alone: a web architecture where representations are authored with the same rigor with which they are transferred.

Fielding called representational state transfer a "behavior." It is, more precisely, an induced property — one that disappears when the constraints are removed and cannot be fully recovered through engineering. The same is true of ambivalent execution with agnostic determinism. Both are consequences, not implementations. Both are induced, not built. And both, when composed, open a design space where novel methods of implementation — visual builders, AI generation, progressive enhancement — emerge not as features to be engineered but as consequences of constraints that were already load-bearing.

---

## 18. SERVER: The Orchestration Level

### 18.1 The Boundary PRESTO Drew

PRESTO governs how representations are constructed. It is silent on how the engine that constructs them is itself assembled. The resolution pipeline, the module system, the router, the token signer, the adapter registry — all of this is architecturally invisible to PRESTO. The engine may be written in any language, using any framework, with any ad-hoc middleware. PRESTO has no opinion.

This invisibility is the next boundary. PRESTO operates from the source representation outward — toward the resolved representation, the uniform interface, the client. Everything behind the source representation, everything involved in constructing the engine that consumes the source representation, is outside PRESTO's scope.

**SERVER** (Server-Embedded Resolution and Verification Executed Runtime) operates entirely within that scope.

### 18.2 The Engine's Source Representation

The PRESTO seed — the 2,020-word specification from which conformant engines are derived — is itself a bilateral document. It carries orchestration affordances (contracts, pipeline stages, module manifests, verification tests) interleaved with resolver affordances (patterns, algorithms, interface signatures). The resolver (LLM, compiler, or bootstrap binary) processes the orchestration half and emits an immutable runtime graph: a unilateral engine with no trace of the seed's orchestration directives. That graph is what runs the 22-stage pipeline. SERVER's constraints govern the source representation of the engine itself. PRESTO cannot see it. The orchestration-level source representation is consumed before the PRESTO pipeline begins.

This is the orchestration level: the space between the engine-authoring act and the moment the runtime graph enters the PRESTO construction pipeline.

### 18.3 The Constraints of SERVER

Five constraints define the SERVER style. Each operates exclusively at the orchestration level. None conflicts with any PRESTO constraint.

**The engine-internal bilateral boundary.** Every artifact inside the engine is partitioned by namespace. Orchestration primitives (routing topology, persistence adapters, auth registries, pipeline stages) belong to the orchestration namespace (`srv:` in the model syntax). Application and domain logic belongs to the PRESTO namespace. No orchestration directive survives into the runtime graph. The bootstrap resolver strips all orchestration artifacts as its final act. The resulting engine contains no evidence of bilateral authorship at the orchestration level.

**Orchestration-consumed directives.** Every directive in the orchestration namespace is fully consumed during bootstrap resolution. The directive is evaluated, its effect is applied to the runtime graph, and the directive itself is removed. The runtime graph is not a configurable framework awaiting further setup. It is a finished, immutable artifact.

**Progressive module composition.** Modules are loaded on a progressive spectrum of authority. Each layer is authorized by the seed's manifest system. The bootstrap resolver authorizes the depth, just as PRESTO authorizes progressive code-on-demand. The manifest declares intent; the sandbox enforces it.

**Agnostic deterministic orchestration.** The bootstrap pipeline is a fixed, declarative graph. Every stage is indifferent to the others; each receives only the context produced by prior stages and emits the next context. The entire bootstrap process is deterministic given the same seed and target language.

**Embedded server self-authorization.** Any runtime decision that would conventionally require middleware or guards is resolved at bootstrap time into self-describing, cryptographically scoped capabilities embedded in the runtime graph. The engine never consults external configuration for its own orchestration decisions. The seed's verification suite is materialized as a self-verifying hash embedded in the graph. The runtime graph carries its own proof of correct assembly.

### 18.4 The Induced Property

SERVER's constraints induce **recursive ambivalence with self-authorizing determinism**.

- **Recursive** — the bilateral model now applies to the construction of the construction engine itself. The pattern that PRESTO applies to representations, SERVER applies to engines.
- **Ambivalent** — the orchestration layer resolves its affordances without concern for how PRESTO will consume the resulting graph. PRESTO consumes the graph without concern for how the orchestration layer assembled it. Two interpreters. One bilateral source. Mutual indifference.
- **Self-authorizing** — the runtime graph carries its own cryptographic proof of correct construction: signed seed hash, manifest compliance, embedded verification suite.
- **Determinism** — each resolved engine produces the same PRESTO behavior for the same seed, regardless of implementation language or bootstrap resolver.

This property was latent in the first seed that resolved a conformant engine in C. The seed did not know the final language. The C engine does not know the seed. SERVER's constraints formalize and protect that property.

### 18.5 Composition Across Three Levels

SERVER composes with PRESTO as PRESTO composes with REST. The three styles operate at different levels:

| Level | Style | Governs | Induces | Visible To |
|-------|-------|---------|---------|------------|
| Transfer | REST | How representations move | Representational state transfer | Client + network |
| Construction | PRESTO | How representations are authored | Ambivalent execution w/ agnostic determinism | Developer + engine |
| Orchestration | SERVER | How the engine is assembled | Recursive ambivalence w/ self-authorizing determinism | Engine author + ops |

The properties-are-the-constraint principle (Section 6.1) governs each composition: SERVER's constraints must not violate the properties PRESTO induces. PRESTO's constraints must not violate the properties REST induces. Each level inherits the properties above it as constraints on itself.

### 18.6 The Bootstrap as Evidence

The SERVER seed (8 contracts, 12 orchestration directives, 14-stage bootstrap pipeline, 12 verification tests) was resolved into a bootstrap binary in C — 461 lines, zero external dependencies, self-contained SHA-256 HMAC. The bootstrap consumes the seed, executes the 14-stage pipeline, signs the graph, and emits a compilable PRESTO engine (921 lines of C, zero dependencies) that resolves `.htx` templates through the bilateral pipeline. 12 of 12 verification tests pass. The emitted engine consumes the PRESTO seed (17,919 bytes) and reports readiness.

The recursive chain is executable:

```
SERVER Seed → Bootstrap Resolver (C) → emits PRESTO Engine (C)
  → resolves htx: templates → clean HTML output
```

The orchestration level is not theoretical. It compiles.

---

## 19. The Derivation Inversion: Engineering as Product, Not Foundation

### 19.1 The Industry's Default

The prevailing model of software architecture is engineering-first. The developer builds the system — choosing libraries, designing data models, writing middleware, wiring routes — and then, if rigor is applied, the architecture is extracted retroactively. The abstractions are discovered by examining what was built. The constraints are named after the fact. The documentation describes the implementation.

This model produces systems that work but carry the mass of their engineering decisions. Every library chosen is weight. Every framework adopted is a coupling. Every middleware stack assembled is an accidental architecture — not prescribed by the problem, but accumulated through the history of decisions made during construction.

The compensating technology stack is the canonical example. React was engineered. SSR was engineered on top of React. Hydration was engineered on top of SSR. Streaming was engineered on top of hydration. Each layer is an engineering achievement. Each solves a real problem. But the problems were created by the layer below — which was itself an engineering achievement solving a problem created by the layer below that. The stack grows because engineering produces engineering. There is no termination condition. There is no point at which the constraints say "stop."

### 19.2 The Inversion

This dissertation proposes the inverse: begin with constraints, and the engineering is derived.

The move is precise:

1. Identify the silence — the level at which no constraints have been formalized.
2. Identify the constraints that, when applied at that level, induce the properties you need.
3. Name the constraints. Name the induced properties. Name the style.
4. The implementation is prescribed by the constraints. The code is not designed. It is derived.

This is not a methodology. It is an observation about what happens when constraints are correctly identified. The implementation becomes minimal because there is nothing accidental to carry. The implementation becomes portable because the constraints are language-agnostic. The implementation becomes verifiable because the induced properties are testable.

### 19.3 The Evidence: Line Counts as Proof

The PRESTO engine was first implemented in C through conventional engineering: a developer reading the specification and making implementation decisions. The result is 3,122 lines with five external dependencies — PCRE2 for regex parsing, OpenSSL for cryptography, libmicrohttpd for HTTP serving, SQLite for data storage, and libm for mathematics. Each dependency is an engineering decision. Each adds capability and weight.

The same engine was then derived from the constraints alone — by asking, at each pipeline stage, "what does the bilateral boundary require?" The result is 921 lines with zero external dependencies. The SHA-256 is self-contained (the constraint prescribes HMAC-SHA256, not OpenSSL). The parser uses string scanning (the constraint prescribes "consume the directive," not PCRE2). The HTTP server is absent (the constraint prescribes "bilateral source in, unilateral output out," not a specific transport). Every line traces to a constraint. Nothing traces to an engineering preference.

The derived engine is 29% of the engineered engine. The 71% that was removed was engineering — real, working, tested engineering that solved real problems. But it was not prescribed by the constraints. It was accumulated through the history of implementation decisions. The constraints did not require it.

This is not an argument against the engineered engine. The engineered engine has capabilities the derived engine lacks — a full HTTP server, PCRE2's regex power, OpenSSL's battle-tested cryptography. In production, these matter. The argument is about the direction of derivation: the engineered engine was built and then its constraints were identified. The derived engine's constraints were identified and then it was built. The second path produces less code because it produces only what the constraints prescribe.

### 19.4 The Recursive Evidence

The derivation inversion operates at every level of the architectural stack, and the evidence compounds at each level.

**At the transfer level:** Fielding identified REST's constraints by observing the existing web. The constraints were already operative — they were the reason the web scaled. Naming them did not change the web. But it made the web's architecture derivable. Any system that satisfies REST's constraints will exhibit REST's properties. The implementation is prescribed.

**At the construction level:** PRESTO's constraints were identified by observing that a PHP function did not care about an `hx-get` attribute. The bilateral boundary was already operative — it was present in server-constructed representations transmitted over HTTP since 1993. Naming it did not change how servers work. But it made the construction architecture derivable. Any engine that satisfies PRESTO's constraints will exhibit ambivalent execution. The 22-stage pipeline is prescribed. Six independent implementations in six languages confirmed this — each derived from the same seed, each producing the same behavior, none sharing code.

**At the orchestration level:** SERVER's constraints were identified by observing that the PRESTO seed is itself a bilateral document — orchestration affordances interleaved with resolver affordances. The bootstrap resolver consumes the orchestration half and emits an immutable runtime graph. The bilateral boundary was already operative at this level too. Naming it made the orchestration architecture derivable. The bootstrap resolver (461 lines of C) resolves the SERVER seed and emits a conformant PRESTO engine (921 lines of C). Both carry zero external dependencies. Both are derived from constraints, not engineered from preferences.

**At the coordination level:** Agent Space's seven essential constraints were identified by observing an existing empirical system (Home Agent Space, PHP/Origen) and separating what was essential constraint from what was accidental implementation. The constraints were then implemented in a second system (TypeScript/presto-ts) with zero code sharing. 36 verification tests confirm the same six properties emerge. The implementation was derived from the constraints. The constraints were not extracted from the implementation.

At each level, the same pattern holds: constraints are identified by observation, named with precision, and then the implementation is derived — not engineered. The derived implementation is smaller, portable, verifiable, and carries no accidental weight. The engineering that would conventionally produce the system is replaced by the constraints that prescribe it.

### 19.5 What This Means for the Practitioner

The derivation inversion does not eliminate engineering. It changes what engineering is for.

In the engineering-first model, the developer is an architect: they design the system, choose the materials, and assemble the structure. The architecture is their creation. The constraints are their choices.

In the constraint-first model, the developer is a resolver: they identify the constraints, and the implementation follows. The architecture is prescribed. The engineering is the act of expressing the constraints in a specific language, on a specific platform, with whatever minimum tooling the platform requires. The developer does not choose the architecture. The constraints choose the architecture. The developer chooses the platform.

This is why LLMs are effective resolvers. An LLM given a well-specified set of constraints produces conformant implementations reliably — because the implementation is derivable, not creative. The six-language PRESTO verification proved this. The SERVER bootstrap proved this. The agent-space implementation proved this. In each case, the constraints were the input, and the implementation was the output. The LLM did not design. It resolved.

The practitioner who holds this insight does not ask "how should I build this system?" They ask "what constraints, when applied at this level, induce the properties I need?" The answer to the second question prescribes the answer to the first. The engineering follows. The code is a shadow of the form.

### 19.6 The Form Precedes the Implementation

Every implementation produced in this work was derived from a prior abstraction:

- The PRESTO engine (TypeScript, Go, Elixir, Python, Rust, C) was derived from the PRESTO seed — a 2,020-word specification.
- The token scoping system was derived from the dissertation's Section 4.5 — the constraint of server-embedded authorization.
- The agent-space system was derived from the essential constraints document — seven constraints, six properties.
- The auth adapter pattern was derived from the observation that auth is a module and modules are composable.
- The SERVER bootstrap was derived from the SERVER seed — 8 contracts, 12 directives, 14-stage pipeline.
- The emitted PRESTO engine was derived from the PRESTO seed consumed by the SERVER bootstrap — constraints in, code out.

In no case was the abstraction extracted from the implementation. In every case, the abstraction preceded the implementation. The implementation was a derivation of the abstraction. The form preceded the code.

This is the inversion. The industry builds and then abstracts. This work abstracts and then derives. The result is less code, more portability, more verifiability, and zero accidental architecture. The constraints prescribed the properties. The properties prescribed the capabilities. The capabilities prescribed nothing — they emerged. And the engineering? The engineering was the residue of expressing the constraints in a medium that could execute them.

---

## 20. Natural Analogues and Extensions

The framework described in this paper is not specific to web architecture. The structural pattern — namespace-partitioned interpreters on a shared medium, with total consumption and deterministic resolution — appears in domains beyond software. The following are hypothesis-generating analogues, not demonstrated equivalences. Each maps the bilateral model to a domain with structural similarities. Whether the mapping holds under formal scrutiny in each domain is future work. The analogues are presented to suggest the fertility of the pattern, not to claim verified universality.

### 20.1 Compilers and Language Processing

Source code may be understood as a bilateral medium. The compiler (resolver) consumes syntactic and semantic directives, emitting target code or bytecode. The human programmer and the machine interpreter process the same document with mutual indifference. A PRESTO-like bilateral boundary separates frontend parsing (consuming syntactic directives) from backend code generation (preserving medium properties like portability). Namespace separation ensures forward compatibility with new language features. Progressive layers mirror optimization passes or JIT compilation, each trading properties (compilation speed vs. runtime performance). The derivation inversion explains why rewriting a compiler from constraints, rather than engineering accretions, yields dramatically smaller and more portable implementations. Ambivalent execution appears when the same source produces machine code (for CPU) and intermediate representation (for analysis tools) without either interpreter interfering.

### 20.2 Databases and Query Engines

A query is a source representation carrying instructions for multiple interpreters: the optimizer (server/consumed namespace), the execution engine, and the client application (which consumes the result set). The bilateral boundary separates query authoring (the declarative surface with force multiplication via indexes, views, and adapters) from result resolution. Server-embedded authorization maps directly to row-level security or policy-based access, where permissions are resolved at query construction time and embedded as constraints in the execution plan. This eliminates ambient authority and session-like state in favor of self-contained, scoped credentials. Identity negotiation becomes content negotiation over the same resource: different result sets or views based on who is asking. The compensating technology stack in ORMs arises from violating this boundary, precisely as SSR and hydration arise from violating the bilateral boundary in web frameworks.

### 20.3 Declarative Interfaces Beyond the Web

In desktop, mobile, and game UIs (React Native, Flutter, SwiftUI, scene graphs), the source is a declarative tree. The resolver (framework runtime) consumes directives for layout, data binding, and effects, emitting a resolved render tree for the platform compositor. A PRESTO-style constraint set would enforce total consumption of the framework namespace (no leaked directives in final pixels or DOM), progressive enhancement (from pure declarative to imperative islands with grant-like authorization for native modules), and force multiplication (one stable syntax surface over composable adapters for data, animation, accessibility). The insight that the surface is maximally dynamic at resolution time applies powerfully: most dynamism should occur in the resolver, where the context is complete, not at interaction time, where the context is partial.

### 20.4 Biological and Molecular Systems

DNA and RNA may be understood as bilateral media. One reading frame is consumed by transcription and translation machinery (ribosomes, enzymes). Another is interpreted by regulatory elements in the cellular context. The structural analogy to ambivalent execution is suggestive: multiple molecular interpreters process the same nucleotide sequence with apparent mutual indifference. Constraints (promoters, terminators, codons) induce properties (protein folding, gene regulation) without the sequence specifying the full machinery. Evolutionary selection operates as a derivation inversion: forms recognized and preserved as invariants persist over contingent implementations. New directives (mutations) are tested against the boundary; those that violate the induced properties (viability) are selected against.

### 20.5 Legal and Institutional Systems

Statutes and contracts may be read as source representations. The engine (courts, regulators, parties) consumes interpretive directives (definitions, scopes, conditions) in its namespace, resolving to enforceable outcomes while preserving the medium for human interpreters. The bilateral boundary prevents leakage: legislative intent does not bind judicial execution. Server-embedded authorization maps to scoped powers and rights granted at construction (drafting) time. Progressive layers describe degrees of delegation, from rigid rules to principle-based frameworks with judicial discretion. The philosophical descent fits naturally: forms (justice, order) are contemplated, named as constraints, and induce properties (predictability, fairness) in contingent implementations (specific rulings).

### 20.6 Other Software Domains

**Event-driven and stream processing.** Events are bilateral documents. Consumers process disjoint namespaces: payload content vs. metadata and routing directives. The bilateral boundary separates event authoring from event consumption.

**Build systems and orchestration.** Makefiles and CI configurations are seeds. Resolvers consume build directives and emit artifacts. The SERVER style already formalizes this pattern. Any build system that separates declarative intent from imperative execution is operating at the orchestration level.

**Formal methods and verification.** Constraints function as invariants. Proof engines are resolvers that derive implementations or counterexamples. The verification suite in the PRESTO and SERVER seeds is a minimal instance of this pattern.

### 20.7 The Transferability of the Evidence

The empirical evidence of this dissertation — line-count reductions, zero-dependency derivations, multi-language behavioral identity, force multiplication via declarative convergence — transfers to these domains because the evidence stems from the logic of constraints, not from web-specific accidents. AI and visual tools become potent resolvers in any domain where the target is a constraint-bounded prose seed rather than entangled engineering.

The framework does not claim to be exhaustive or the only possible set of constraints in any domain. It is one coherent instance whose success — dissolving compensating stacks, restoring lost properties, enabling derivation over accretion — suggests the pattern is fertile wherever forms have been operative but unnamed. Where the bilateral boundary has been present but invisible, naming it through contemplation makes the property accessible, testable, and derivable.

This universality is what makes the derivation inversion powerful. It inverts not only engineering vs. constraints within software, but the habitual bottom-up accumulation across human endeavors. The form is prior. The implementations are shadows. Once seen in one domain, the eye recognizes it in others.

---

## 21. Conclusion

PRESTO is not an extension of REST. It is a distinct architectural style that operates at the construction level, where REST is silent. Its constraints — bilateral boundary, namespace separation, server-consumed directives, progressive code-on-demand, and server-embedded authentication and authorization — induce the property of ambivalent execution with agnostic determinism, a property that REST does not provide and does not need to provide. The fifth constraint radically reduces the need for the cookie-session architecture that Fielding identified as a violation of REST's statelessness, and in doing so reduces the ceremony required by OAuth, the enterprise identity stack, and the conventional separation of authentication from authorization — by embedding both identity and permission in the representation itself, resolved at construction time, verified cryptographically at execution time, portable across system boundaries. Revocation, privilege lifecycle, and step-up authentication remain open concerns that require additional mechanisms (bounded nonce state, short TTLs, or out-of-band revocation checks) beyond what stateless tokens alone provide.

The two styles compose. REST governs the transfer. PRESTO governs the construction. The uniform interface is the seam between them. The resolved representation — the output of PRESTO's construction pipeline, the input to REST's transfer model — is the artifact that both styles shape, each from its own level.

This composition explains why a consummately RESTful server can deliver Distributed Object architectures within its representations. It explains why the design space provides navigable layers with known properties. It explains why declarative directives force-multiply server capabilities through a stable syntactic surface. It explains why AI generation is structurally reliable against this target. It explains why a visual builder required almost no architecture of its own. It explains why four auth strategies required zero template changes. And it explains why a 921-line engine with zero dependencies resolves the same templates as a 3,122-line engine with five — because 71% of the larger engine was engineering, and the constraints prescribed only the remaining 29%.

The derivation inversion is the capstone. The industry builds systems and then extracts abstractions. This work identifies abstractions and then derives systems. The direction matters. When engineering precedes abstraction, the result carries the weight of every decision that was not prescribed. When abstraction precedes engineering, the result carries only what the constraints require. The code is not the architecture. The constraints are the architecture. The code is the residue of expressing the constraints in a medium that can execute them.

REST identified constraints at the transfer level. PRESTO identified constraints at the construction level. SERVER identified constraints at the orchestration level. Below that, any application code that adheres to the constraints imposed from above inherits the induced properties without designing for them — and may identify its own constraints at its own level, inducing further properties in turn. At each level, the same pattern held: the constraints were named, the properties were induced, and the implementation was derived — not engineered, not designed, not accumulated through a history of choices. Derived. From the constraints. In any language. On any platform. With the same properties emerging independently.

The constraints prescribed the properties. The properties prescribed the capabilities. The capabilities prescribed nothing — they emerged. And the engineering was the last step, not the first: the expression of the form in a medium, producing the minimum artifact that the constraints required and nothing more.

This dissertation is its own final instance. Its structure descends the chain it describes: first principles (the source above abstraction), then the seed (pure abstraction compressed), then the logical derivation (the abstract), then the boundary and the engine (naming), then the constraints and properties (formalization), then composition and encapsulation (consequences), then convergence and auth (applications), then the derivation inversion (the document reflecting on its own method), then natural analogues (the document recognizing itself in other domains), then this conclusion (the document stated as complete). Each section receives from the one above it and imparts to the one below it. The philosopher reads the forms. The engineer reads the constraints. The resolver reads the specification. Each consumes its own namespace. None needs the other. The dissertation is a bilateral document that exhibits the property it describes — ambivalent execution with agnostic determinism — operating on itself. The medium carries the proof. The proof is the medium.

---

## Acknowledgments

This dissertation owes its existence to two intellectual debts.

**Carson Gross** is the primary intellectual source of this work. His creation of htmx restored declarative hypermedia-driven interaction as a legitimate architectural choice at a time when the industry had abandoned it for client-rendered frameworks. The observation that began this entire chain of derivation — a PHP function concatenating an HTML string containing an `hx-get` attribute, indifferent to what it meant — was an observation of htmx at work. Without htmx, there is no observation. Without the observation, there is no recognition of the bilateral boundary. Without the recognition, there is no naming, no constraints, no PRESTO. Gross demonstrated that the surface of the web is productive, dynamic, and sufficient. This dissertation names why. Every property identified here was latent in the design space that htmx opened. Gross did not merely build a library. He reopened a door that the industry had closed, and through that door, the forms described in this dissertation became visible.

**Roy T. Fielding** provided the foundational pattern of thinking that makes construction-level constraints on the web conceivable. His dissertation established that architectural styles can be formalized as collections of constraints that induce collections of properties. Without this method — identify the constraints, name the induced properties, evaluate the tradeoffs — PRESTO could not have been articulated. Fielding did not describe the construction level. He did not need to. But his method of deriving an architectural style from first principles, by starting from the null style and adding constraints one at a time while documenting the properties each induces, is the method this dissertation follows. PRESTO extends Fielding's method to the level where Fielding was silent. The extension is possible because the method is sound. The method is Fielding's contribution to the intellectual history of web architecture, and this work is a direct descendant of it.

---

## References

1. Fielding, R.T. (2000). *Architectural Styles and the Design of Network-based Software Architectures*. Doctoral dissertation, University of California, Irvine.

2. Gross, C., Stepinski, A., & Akşimşek, D. (2023). *Hypermedia Systems*. Big Sky Software.

3. Berners-Lee, T., Fielding, R., & Masinter, L. (2005). Uniform Resource Identifier (URI): Generic Syntax. RFC 3986.

4. Fielding, R., & Reschke, J. (2014). Hypertext Transfer Protocol (HTTP/1.1): Semantics and Content. RFC 7231.

5. Itzkovitz, S. & Alon, U. (2007). The genetic code is nearly optimal for allowing additional information within protein-coding sequences. *Genome Research*, 17(4), 405-412.

6. Haas, A., et al. (2017). Bringing the Web up to Speed with WebAssembly. PLDI '17.

---

## Appendix A: The PRESTO Seed

Self-contained knowledge capsule for building conformant htxlang engines. Load as system prompt or context. No external references needed.

### Identity

You have the htxlang specification and the architectural rationale behind it. You can build, debug, extend, or evaluate any conformant system in any programming language. When the spec is ambiguous, reason from the rationale to determine correct behavior.

PRESTO (Progressive REpresentational State Transfer with On-demand code) composes with REST at the construction level by formalizing code-on-demand as a progressive spectrum. htxlang is the specification. The htx: namespace is the server's territory within HTML. The engine is a resolver: HTML in, pure HTML out.

### Architectural Rationale

The source representation is **bilateral**: it carries both server affordances (htx: directives the engine consumes) and client affordances (HTML, scripts, attributes the browser interprets). Resolution transforms this bilateral form into a **unilateral** resolved representation where only client affordances remain. This is the foundational operation. Every design decision traces to preserving this bilateral boundary.

**Why script opacity.** The bilateral boundary is the htx: namespace. `<script>` elements are standard HTML, therefore client territory. If the engine evaluated expressions inside scripts, the boundary would be violated: JavaScript syntax containing `{` characters would be misinterpreted as server directives, and client code would depend on server-side processing. The separation is absolute.

**Why server-mediated scripts (htx:script).** Sometimes the developer needs server-resolved values inside client code. Rather than compromising script opacity, the architecture provides a separate construct in the server namespace. htx:script is explicitly server territory. The developer chooses the namespace. The engine processes accordingly.

**Why two-phase mutations.** REST requires statelessness. The server stores no session between requests. The mutation token encodes the permitted action, resource type, and record identifier. The token IS the state. The server issues it on GET (prepare), verifies it on POST (execute). No server-side memory between the two phases.

**Why grants are first-class.** In REST, the representation mediates all extensions. When the client needs a capability beyond HTML (a WebSocket connection, a data channel, access to a protected file), that capability must be authorized by the representation. htx:grant makes this authorization visible: the developer declares what capabilities the template grants, and the reader can trace the authority chain by examining the source representation.

**Why manifest sandboxing.** Modules extend the engine. First-party modules are trusted. Third-party modules are not. The manifest declares what a module intends to do. The sandbox enforces it. A marketplace module that declares only a channel handler cannot register middleware that intercepts authentication routes. Capability is declared, then granted. Same pattern as grants, applied inward to the engine itself.

**Why the resolver model.** The input is HTML. The output is HTML. Same medium. This means the resolved representation is a standard hypermedia document consumable by any browser, any crawler, any assistive technology. No client-side framework is required to render the output. The engine adds capability; it does not change the medium.

**Why progressive layers.** Code-on-demand is not binary (off or on). It is a spectrum. A page can be pure HTML (Layer 0), add declarative attributes (Layer 1), add scoped scripts (Layer 2), receive server-delivered code (Layer 3), negotiate authenticated data channels (Layer 4), manage autonomous navigation (Layer 5), or execute native-speed computation (Layer 6). Each degree is independently adoptable. The architecture does not force a global choice.

When making implementation decisions not explicitly covered by the specification, reason from these principles. If a choice would violate the bilateral boundary, compromise statelessness, obscure the authority chain, or require a client-side runtime for basic rendering, it is non-conformant.

### 8 Contracts

**C1 Document Model.** Input: HTML + htx: directives (source representation). Output: pure HTML, no htx: remaining (resolved representation). `<script>` elements are opaque to the engine. `<htx:raw>` blocks are opaque to expression evaluation.

**C2 Resolution.** Engine consumes all htx: directives, producing complete HTML. Ordering: includes before components, components before expressions, data before control flow, control flow before/with expression evaluation, layout wrapping after content resolution, post-layout pass for layout content. Directive stripping MUST NOT remove directives consumed by later stages (extract layout directive after expression evaluation but before stripping). Literal blocks (htx:raw) MUST be protected during stripping. Include/component resolution MUST detect circular references via backtracking visited-path set (insert before recursion, remove after — allows diamond patterns while catching true cycles). Template resolution errors (circular references, file not found, path traversal rejection, depth exceeded) MUST NOT crash the pipeline; engine SHOULD produce an HTML comment indicating error type and source path. Recursive depth SHOULD be configurable (default 10). Middleware MUST execute in registration order.

**C3 Grants.** `<htx:grant>` materializes scoped, signed, time-limited credentials into the template. Types: websocket, channel, asset. Credentials use HMAC-SHA256. TTL MAY be configurable via grant attributes (default: 120s for connections, 3600s for assets). Grant tokens MUST include the authenticated user's identity in the `sub` field; anonymous grants SHOULD use a consistent anonymous identifier.

**C4 Mutations.** `<htx:action>` generates signed tokens on GET (prepare). POST with token triggers verified write (execute). Token is stateless, self-contained. Two-phase, no session. POST mutation requests produce a data response (JSON); they do NOT execute the template pipeline.

**C5 Extensions.** Modules register middleware, context providers, channel handlers. Manifests declare capabilities using consistent key naming (snake_case recommended). First-party: full access. Restricted: undeclared registrations silently dropped. Engine SHOULD log warnings on rejected registrations.

**C6 Channels.** `/api/channel/{module}/{path}` validates Bearer token (signature + expiry + scope). Scope must match `channel:{module}`. Routes to registered handler.

**C7 Delivery.** Server compiles topology code (.js/.ts/.tsx) at boot. Delivers via HTTP/WS/SSE with scoped channel token. Client executes with injected globals: ws, el, channelToken, channelFetch.

**C8 Security.** Security through absence. Expressions HTML-escaped by default (&<>"). Credentials HMAC-SHA256 signed + time-limited; signature comparison MUST be constant-time (timing-safe). Script blocks never processed. Path traversal: three-layer defense required — (1) pre-filter rejects ".." in source strings, (2) normalize resolved path (resolving symlinks), (3) containment check verifies normalized path starts with template root. The ".." rejection MUST apply to every path input: URL paths, include src, component src, layout src. Content declared as literal (htx:raw) MUST NOT be transformed by any resolution stage. Protection markers SHOULD use UUIDs or equivalent to prevent collision with template content. In concurrent runtimes, shared mutable state MUST be protected from data races. htx:data where clauses that resolve expressions from user-controlled input (route params, query strings) MUST be parameterized by the adapter to prevent SQL injection.

### 16 Directive Families

| Directive | Syntax | Purpose |
|-----------|--------|---------|
| htx:v | `<htx:v>path</htx:v>` or `<htx:v raw>path</htx:v>` | Value output (escaped/raw) |
| {htx:} | `attr="{htx:path}"` | Attribute binding |
| htx:data | `<htx:data type="T" where="W" order="O" limit="N" as="var" />` | Data query |
| htx:each | `<htx:each items="path" as="item">...{htx:empty}...</htx:each>` | Iteration |
| htx:if | `<htx:if test="path">...</htx:if><htx:else>...</htx:else>` | Conditional |
| htx:let | `<htx:let name="value" />` | Variable binding |
| htx:include | `<htx:include src="path" />` | Partial inclusion |
| htx:component | `<htx:component src="path" prop="val">slot</htx:component>` | Composition |
| htx:props | `<htx:props>key = "default"</htx:props>` | Component defaults |
| htx:slot | `<htx:slot />` | Slot projection point |
| htx:script | `<htx:script>code</htx:script>` | Server-mediated script |
| htx:grant | `<htx:grant type="T" as="var" />` | Capability grant |
| htx:action | `<htx:action name="N" type="T" record="{htx:id}" />` | Mutation token |
| htx:auth | `<htx:auth role="R">...</htx:auth>` | Auth conditional |
| htx:unauth | `<htx:unauth>...</htx:unauth>` | Unauth conditional |
| htx:layout | `<htx:layout src="path" />` or `<htx:layout none />` | Layout override |
| htx:raw | `<htx:raw>literal</htx:raw>` | No processing |

### 22-Stage Pipeline

```
 1. Static file serving
 2. Channel API (/api/channel/) with Bearer validation
 3. Middleware chain execution
 4. Context provider injection
 5. Pre-layout template processors (module extension hook; identity if none registered)
 6. htx:include expansion (recursive, depth 10)
 7. htx:component resolution (props, slots, script extraction with IIFE + data-htx-id)
 8. Page-level htx:script extraction → scriptCollector
 9. htx:let binding → data context
10. htx:data → adapter query → data context
11. htx:grant → credential materialization → data context
12. htx:action → signed token → $actions in data context
13. htx:auth / htx:unauth conditional rendering
14. htx:each / htx:if control flow (handles own expression eval per item)
15. htx:v / {htx:} expression evaluation
15b. Extract layout directive AFTER expression eval, BEFORE stripping (enables dynamic layout paths)
16. Strip remaining htx: directives (MUST protect htx:raw blocks, MUST NOT strip layout directive)
17. Post-layout template processors (module extension hook; identity if none registered)
18. Layout wrapping (uses stored layout directive, or convention _layout.htx walk)
19. Post-layout pass (includes, auth, control flow in layout content)
20. Script injection via <!--PRESTO:SCRIPT:BEGIN/END--> before </body>
21. Final expression pass (evaluates htx:v in injected scripts)
22. Replace PRESTO:SCRIPT placeholders with <script>, strip <htx:raw> wrappers
```

### Patterns

```
INCLUDE:     /<htx:include\s+src\s*=\s*"([^"]+)"\s*\/>/g
COMPONENT:   /<htx:component\s+src\s*=\s*"([^"]+)"([^>]*)(?:\/>|>([\s\S]*?)<\/htx:component>)/g
PROPS:       /<htx:props>([\s\S]*?)<\/htx:props>/
SCRIPT:      /<htx:script>([\s\S]*?)<\/htx:script>/g
HTV_TAG:     /<htx:v(\s+raw)?(?:\s+path\s*=\s*"([^"]*)")?\s*(?:\/>|>([\s\S]*?)<\/htx:v>)/g
HTX_ATTR:    /\{htx:([^}]+)\}/g
DATA:        /<htx:data\s+([^>]*)\/>/g
EACH:        /<htx:each\s+items="([^"]+)"\s+as="([^"]+)"\s*>([\s\S]*?)<\/htx:each>/g
EMPTY:       /<htx:empty\s*\/?>/
IF:          /<htx:if\s+test="([^"]+)"\s*>([\s\S]*?)<\/htx:if>(?:\s*<htx:else\s*>([\s\S]*?)<\/htx:else>)?/g
GRANT:       /<htx:grant\s+([^>]*)\/>/g
ACTION:      /<htx:action\s+([^>]*)\/>/g
AUTH:        /<htx:auth(?:\s+role="([^"]*)")?\s*>([\s\S]*?)<\/htx:auth>/g
UNAUTH:      /<htx:unauth\s*>([\s\S]*?)<\/htx:unauth>/g
LAYOUT:      /<htx:layout(?:\s+(?:src\s*=\s*"([^"]*)"|(none)))?\s*(?:\/>|><\/htx:layout>)/i
LET:         /<htx:let\s+([a-zA-Z_]\w*)\s*=\s*"([^"]*)"\s*\/>/g
SCRIPT_PROT: /<script(\s[^>]*)?>[\s\S]*?<\/script>/gi
RAW_PROT:    /<htx:raw(?:\s[^>]*)?>[\s\S]*?<\/htx:raw>/gi
```

### Core Algorithms

**Path Resolution:** Split on ".". Walk into object one key at a time. Null at any step returns undefined.

**Pipes:** Split expression on "|". Left=path, right=pipe. Pipes: uppercase, lowercase, capitalize, trim, length, json.

**HTML Escape:** `&`→`&amp;` `<`→`&lt;` `>`→`&gt;` `"`→`&quot;`

**Truthiness:** Falsy: null, undefined, false, 0 (integer or float), "", []. Everything else truthy.

**Include:** Resolve path (absolute from root if starts with /, reject if contains .., else relative to file). Read file. Recurse (max depth 10).

**Component:** Read file. Parse htx:props defaults. Override with passed attrs. Replace `{{ prop }}`. Inject slot content at `<htx:slot />`. Extract htx:script bodies. Wrap in IIFE with `data-htx-id` element binding. Push to scriptCollector. Recurse.

**Expression Eval:** 1) Protect script+raw blocks with markers. 2) Replace htx:v tags (resolve path, escape unless raw). 3) Replace {htx:} attrs (resolve, escape). 4) Restore markers.

**Data:** Parse htx:data attrs. If slug: adapter.get(type, {slug}). Else: adapter.query({type, where, order, limit, offset}). Inject under "as" name. Strip directive.

**Each:** Resolve items array. If empty: render htx:empty section. Else: for each item, create isolated child context {parent + independent copy of item + $index/$first/$last}, evaluate expressions, recurse control flow. Concatenate. Each iteration's item MUST be an independent copy (or reference-counted) so modifications do not affect other iterations or the source array.

**If:** Resolve test path. If truthy: return evaluated if-content. If falsy+else: return evaluated else-content. Else: "".

**Layout Walk:** From file dir to root, collect _layout.htx files. Stop at doctype. Replace `__content__`. htx:layout directive overrides walk. `none` = no wrapping. HX-Request skips root layout.

**Grants:** Look up provider by type. websocket: issue channel token scope "websocket". channel: issue token scope "channel:{module}". asset: sign URL with HMAC (path:expiry → sig, append ?sig=&exp=).

**Mutation Prepare:** For each htx:action: sign {action, type, recordId, exp} as base64url.hmac. Store in $actions. **Execute:** Verify token. Route to adapter create/update/delete. Reject invalid.

**Token Sign:** `base64url_nopad(payload) + "." + base64url_nopad(hmacSha256(base64url_nopad(payload), secret))`. Base64url uses URL-safe alphabet (RFC 4648 Section 5) with padding removed. **Verify:** Split on ".". Recompute sig. Compare. Check exp > now().

**Module Boot:** For each: if first-party use real registry. If restricted create proxy that drops undeclared. Call boot(). Catch errors, continue.

**Channel Middleware:** Parse /api/channel/{module}/{path}. Find handler. Validate Bearer token (sig + exp + scope == channel:{module}). Route to handler.handle(path, query, userId, {method, body}).

### Router

**Static:** `templateDir + path + ".htx"` exists? Return it. **Index:** `templateDir + path + "/index.htx"` exists? Return it. **Dynamic:** Walk segments. At each level try exact match, then scan directory for files/directories matching `[name].htx` or `[name]/`. Extract parameter name from brackets. Collect params. Engine MUST NOT assume specific parameter names.

### Token Formats

**Action:** `base64url({"action","type","recordId","exp"}).base64url(hmac)` TTL: 1 hour.
**Channel:** `base64url({"sub","scope","exp","jti"}).base64url(hmac)` TTL: 120 seconds.
**Signed URL:** `path?sig=base64url(hmac(path:exp))&exp=timestamp` TTL: 1 hour.

### Interface Signatures

```
Module: name()→string, manifest()→{trust,contextProviders?,channelHandlers?,middleware?}, boot(registry)→void
Middleware: name()→string, handle(request, next:()→response)→response
ContextProvider: resolve(request)→map<string,any>
ChannelHandler: module()→string, handle(subPath, query, userId, {method,body})→{status,data}
ContentAdapter: query({type,where?,order?,limit?,offset?})→Record[] (empty array if no records or type unknown), get(type,identifier)→Record|null, create(type,data)→Record, update(type,id,data)→bool, delete(type,id)→bool. Adapter MUST be safe for concurrent invocation. Where clauses from user input MUST use parameterized queries.
```

**Component prop substitution** uses `{{ propName }}` syntax INSIDE component files. This is a composition-stage string replacement, NOT the htx:v expression system. Props are replaced before expression evaluation. htx:v operates on the data context. `{{ }}` operates on component parameters. Two distinct mechanisms.

**Request body parsing:** The engine must parse POST bodies. JSON (Content-Type: application/json) and form-urlencoded (application/x-www-form-urlencoded). Form-urlencoded parsing MUST decode both `+` as space and `%XX` percent-encoded characters per RFC 3986. Parsed into request.body map.

**Cookies:** Engine MAY parse Cookie headers for compatibility with legacy auth integrations. Cookie-backed sessions are not required by PRESTO and are not the preferred authorization model described in the main text.

### File Conventions

Template dir: `templates/`. Layout: `_layout.htx`. Placeholder: `__content__`. Dynamic: `[param].htx`. Extension: `.htx`. Static: `public/`. Topologies: `topologies/`. TSX pragma: `/** @jsxRuntime classic */\n/** @jsx h */\n`.

### Verification (22 Tests)

```
 1. Home page renders with layout
 2. 404 for missing route
 3. Dynamic [slug] resolves with params
 4. Include expands partial
 5. Component renders with props + slot
 6. htx:v resolves, pipes work, HTML escaped
 7. htx:v raw outputs unescaped
 8. Script blocks untouched by expression engine
 9. htx:raw blocks untouched
10. htx:data + htx:each renders database records
11. htx:if true shows, false hides
12. htx:else shows when condition false
13. htx:empty renders for empty collection
14. htx:grant materializes signed token
15. htx:auth hides from unauthenticated
16. htx:layout none = no wrapping
17. htx:layout src = explicit layout
18. Channel API 200 with valid token
19. Channel API 401 with invalid token
20. Channel API 403 with wrong scope
21. Action token roundtrip succeeds
22. Tampered action token rejected
```

All 22 pass = conformant engine.

---

## Appendix B: The SERVER Seed

**Self-contained knowledge capsule for building conformant SERVER orchestration engines.** Load as system prompt or context. No external references needed.

### Identity

You have the SERVER specification and the architectural rationale behind it. You can build, debug, extend, or evaluate any conformant orchestration engine in any programming language. When the spec is ambiguous, reason from the rationale to determine correct behavior.

SERVER (Server-Embedded Resolution and Verification Executed Runtime) formalizes constraints at the orchestration level, where PRESTO is silent. It composes with PRESTO (and therefore with REST) by governing how the construction engine itself is assembled. The engine is a bootstrap resolver: seed in, immutable runtime graph out.

### Architectural Rationale

The source representation of an engine is **bilateral**: it carries both orchestration affordances (srv: directives the bootstrap resolver consumes) and PRESTO affordances (the PRESTO seed contracts, pipeline, and directives the resulting graph will execute). Bootstrap resolution transforms this bilateral form into a **unilateral** runtime graph where only PRESTO affordances remain. This is the foundational operation. Every design decision traces to preserving this engine-internal bilateral boundary.

**Why script opacity at the orchestration level.** The bilateral boundary is the srv: namespace. Any code that would be executed by the final PRESTO engine (e.g., topology compilation, template resolution) is client territory to the bootstrap resolver. The resolver never evaluates PRESTO-level expressions or scripts; it only assembles the graph that will later do so.

**Why server-mediated orchestration (srv: directives).** Sometimes the engine author needs resolved values inside the runtime graph (e.g., signed manifest hashes, pre-compiled topology functions). Rather than compromising the boundary, the architecture provides a separate construct in the orchestration namespace. srv: directives are explicitly bootstrap territory. The resolver processes accordingly.

**Why two-phase bootstrap.** The orchestration level must remain stateless between resolutions. The seed contains everything needed. Phase 1 (prepare) resolves the seed into a declarative graph. Phase 2 (execute) materializes the immutable runtime artifact. No bootstrap memory between phases.

**Why manifests are first-class.** Modules extend the orchestration engine. First-party modules are trusted. Third-party modules are not. The manifest declares capabilities. The sandbox enforces it. Same pattern as PRESTO grants, applied inward.

**Why the bootstrap resolver model.** The input is the SERVER seed (a declarative bilateral document). The output is a pure runtime graph. Same medium. This means the resolved engine is a standard PRESTO-conformant artifact consumable by any PRESTO pipeline, any language runtime, any deployment target. The bootstrap adds capability; it does not change the medium.

**Why progressive composition.** Module authority is not binary (full access or none). It is a spectrum. Each layer is entered deliberately by manifest declaration and bootstrap authorization. The orchestration engine decides the depth.

When making implementation decisions not explicitly covered by the specification, reason from these principles. If a choice would violate the engine-internal bilateral boundary, compromise statelessness of the bootstrap, obscure the authority chain, or require runtime configuration for basic graph emission, it is non-conformant.

### 8 Contracts

**C1 Document Model.** Input: SERVER seed (bilateral orchestration source). Output: immutable runtime graph (unilateral PRESTO engine). No srv: artifacts remain in the graph.

**C2 Bootstrap Resolution.** Resolver consumes all srv: directives, producing a complete runtime graph. Ordering: manifests before module registration, module registration before pipeline construction, pipeline construction before graph signing. Directive stripping MUST NOT remove directives consumed by later stages. Literal blocks (srv:raw) MUST be protected during stripping. Circular reference detection MUST use a visited-path set. Errors MUST produce a diagnostic graph comment, not crash the bootstrap.

**C3 Manifests.** Every module declares capabilities in a manifest. The bootstrap resolver enforces declared vs. actual registrations. First-party: full access. Restricted: undeclared registrations silently dropped with warning.

**C4 Self-Authorization.** The resolved graph carries a cryptographic manifest hash (HMAC-SHA256). Any runtime decision that requires authorization is resolved at bootstrap into scoped, signed capabilities embedded in the graph.

**C5 Progressive Composition.** Modules register on a spectrum of authority. Layer 0-N defined by manifest. Bootstrap authorizes depth. Deeper layers trade awareness for capability.

**C6 Graph Delivery.** The runtime graph is emitted as compilable source in the target language (or a serialized binary artifact). It contains pre-compiled topology code, pre-wired pipeline stages, and embedded verification suite.

**C7 Verification.** The bootstrap MUST emit a self-verifying graph. The embedded verification suite (12 tests) MUST pass for the engine to be considered conformant.

**C8 Security.** Security through absence. Expressions in the seed are orchestration-only. Path traversal triple-defense required on all seed paths. Manifest sandboxing is mandatory. Constant-time comparison for all signature checks.

### 12 Orchestration Directives

| Directive | Syntax | Purpose |
|-----------|--------|---------|
| srv:v | `<srv:v>path</srv:v>` or raw variant | Value output (orchestration) |
| {srv:} | `attr="{srv:path}"` | Attribute binding |
| srv:module | `<srv:module name="..." manifest="..." />` | Module registration |
| srv:manifest | `<srv:manifest trust="full\|restricted">...</srv:manifest>` | Capability declaration |
| srv:pipeline | `<srv:pipeline stage="N" handler="..." />` | Stage wiring |
| srv:context | `<srv:context provider="..." />` | Context provider injection |
| srv:grant | `<srv:grant type="T" as="var" />` | Orchestration capability grant |
| srv:auth | `<srv:auth role="R">...</srv:auth>` | Bootstrap auth conditional |
| srv:layout | `<srv:layout src="path" />` | Orchestration layout (graph composition) |
| srv:include | `<srv:include src="path" />` | Partial orchestration include |
| srv:component | `<srv:component src="path" prop="val">slot</srv:component>` | Graph component composition |
| srv:raw | `<srv:raw>literal</srv:raw>` | No processing |

### 14-Stage Bootstrap Pipeline

```
 1. Static seed parsing
 2. Manifest validation & sandbox creation
 3. Module registration (first-party vs restricted)
 4. Context provider injection
 5. Pre-graph template processors
 6. srv:include expansion (recursive, depth 8)
 7. srv:component resolution (props, slots, script extraction)
 8. Pipeline stage wiring
 9. srv:context / srv:grant materialization
10. srv:auth conditional rendering
11. Expression evaluation & graph assembly
12. Graph signing (HMAC of entire graph + manifest hash)
13. Post-graph processors
14. Final emission: target-language source or serialized graph + embedded verification suite
```

### Core Algorithms

**Path Resolution:** Split on "." to traverse nested context objects. Return empty string on miss.

**Graph Signing:** `base64url(payload).base64url(hmacSha256(payload, seed-secret))`

**Manifest Enforcement:** Proxy wrapper for restricted modules that drops undeclared calls with warning.

**Circular Reference Detection:** Visited-path set, diamond patterns allowed.

### Verification Suite (12 tests)

1. Seed parses without error
2. Manifests enforced (restricted modules drop undeclared)
3. Bilateral boundary preserved (no srv: in final graph)
4. Pipeline stages wired in declared order
5. Graph signature verifies
6. Self-authorization token roundtrip succeeds
7. Tampered graph rejected
8. Progressive layers respected
9. Include/component recursion works
10. Context providers inject correctly
11. Graph emits valid target-language source
12. Emitted engine consumes PRESTO Seed correctly (meta-test)

All 12 pass = conformant SERVER orchestration engine.

### Interface Signatures

```
OrchestrationModule: name(), manifest(), boot(registry) -> void
BootstrapResolver: resolve(seed, targetLanguage) -> RuntimeGraph
RuntimeGraph: emit(sourceCode | binary), verifySignature(), runPrestoSeed(prestoSeed) -> PrestoEngine
```

**Request/Seed body parsing:** Same as PRESTO, plus YAML/JSON seed variants.

**File Conventions**
Seed dir: `orchestration-seeds/`. Layout: `_orchestration-layout.srv`. Extension: `.srv`. Topologies: `orchestration-topologies/`.

---


