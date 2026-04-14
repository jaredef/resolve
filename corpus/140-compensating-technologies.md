<!-- chronological_ordinal: 4 -->
# Compensating Technologies of the Distributed Object Ecosystem: A Survey and Reframing Under PRESTO

**Companion document to: An Architectural Style for Progressive Representational State Transfer with On-Demand Code**
**Jared Foy, April 2026**

## Introduction

The React ecosystem has produced a generation of engineering solutions of remarkable sophistication. Each solves a real problem that developers encounter in production. What has not been widely recognized is that these problems share a common origin: they are induced by the architectural inversion that occurs when a distributed object (DO) model operates as the outer architecture rather than being enclosed within a RESTful boundary.

This document maps each major compensating technology to the REST property it recovers, identifies the PRESTO layer where that property exists natively, and describes the developer experience at that layer. The purpose is not to diminish the engineering — much of it is brilliant — but to show that each solution points, by its very existence, toward the architectural property it is trying to restore. PRESTO provides these properties by default. The developer's task shifts from compensation to selection: choosing the right layer for the right feature.

---

## 1. Rendering Compensations

### 1.1 Server-Side Rendering (SSR)

**What it is:** The React component tree is rendered to HTML on the server before being sent to the client. Introduced to recover the complete-representation property that server-rendered architectures provide natively.

**What it compensates for:** The loss of complete representations. A default React application sends an empty shell (`<div id="root"></div>`) and constructs the page entirely in the browser. SSR recovers the property that the initial HTTP response contains visible, meaningful content.

**Complexity introduced:** The application must execute in two environments (Node.js and browser). Code must be written to avoid browser-only APIs during server execution. Serialization constraints govern what can pass from server to client. The mental model splits: the developer must reason about which code runs where.

**PRESTO layer:** Layer 0 (Hypermedia). Server rendering is not a feature in PRESTO — it is the default and only rendering model at the base layer. The `.htx` template declares data requirements via directives. The engine resolves all queries, evaluates all expressions, and composes the complete HTML document. The response is a finished page. There is no client-side rendering to compensate for because the architecture never surrendered rendering authority to the client.

**Developer experience:** The developer writes an `.htx` template. It contains HTML with data directives and expression placeholders. The engine resolves it into a complete HTML document. There is no SSR configuration, no `renderToString`, no server/client code boundary. The template is the page.

---

### 1.2 Static Site Generation (SSG)

**What it is:** Pages are pre-rendered to HTML at build time rather than on each request. Used for content that doesn't change between deployments.

**What it compensates for:** The performance cost of SSR on every request — itself a compensation for the absence of complete representations. SSG is a compensation for a compensation.

**Complexity introduced:** A build step is required. Content changes require a rebuild and redeployment. The developer must classify each page as static or dynamic at build time. Hybrid approaches (mixing SSG and SSR) introduce configuration complexity.

**PRESTO layer:** Layer 0 with optional ahead-of-time resolution. The engine can optionally pre-resolve static templates into cached HTML, but this is an optimization, not a requirement. The application works identically without it. The decision to cache is operational, not architectural — it does not change the template, the data model, or the developer's mental model.

**Developer experience:** The developer writes the same `.htx` template regardless of whether it will be served dynamically or from cache. If caching is desired, it is an infrastructure decision (e.g., a reverse proxy or CDN caching the response). The template is unaware of the distinction.

---

### 1.3 Incremental Static Regeneration (ISR)

**What it is:** A Next.js feature that allows statically generated pages to be regenerated in the background after a specified revalidation period, combining the performance of SSG with the freshness of SSR.

**What it compensates for:** The staleness problem introduced by SSG — itself a compensation for the performance cost of SSR — itself a compensation for the absence of complete representations. ISR is a compensation for a compensation for a compensation.

**Complexity introduced:** The developer must specify revalidation intervals per page. Stale content is served during regeneration windows. Cache invalidation strategies must be reasoned about. On-demand revalidation adds API routes for programmatic cache busting. The mental model now includes temporal reasoning about content freshness alongside rendering concerns.

**PRESTO layer:** Layer 0. The engine resolves templates on each request by default. For pages where this is insufficient, standard HTTP caching (Cache-Control headers, CDN configuration, reverse proxy caching) provides equivalent behavior using infrastructure the web already has. The revalidation concern is handled by HTTP's native cache semantics, which predate React by two decades.

**Developer experience:** The developer sets Cache-Control headers on routes that benefit from caching. The template is unchanged. There is no ISR configuration, no revalidation interval in the page code, no on-demand revalidation API. The caching layer is orthogonal to the application layer — as HTTP always intended.

---

### 1.4 Streaming SSR with Suspense

**What it is:** The server streams HTML to the client as components resolve, using Suspense boundaries to mark regions that may load asynchronously. Content appears progressively rather than waiting for the entire page to resolve.

**What it compensates for:** The latency of SSR when data sources have variable response times. Rather than blocking the entire response on the slowest query, streaming sends what's ready immediately.

**Complexity introduced:** The developer must reason about Suspense boundaries — where to place them, what fallback UI to show, how nested boundaries interact. Loading states become part of the component architecture. The order in which content appears is a design concern that didn't exist when the server sent complete documents.

**PRESTO layer:** Layer 0 with streaming resolution. The HTX resolution pipeline can stream HTML as each stage completes — the layout header and navigation are sent via HTTP chunked transfer encoding while data queries are still executing. This uses the browser's native progressive rendering capability. No Suspense boundaries, no fallback UI, no JavaScript. The browser renders what it receives as it receives it — the behavior HTML has supported since the 1990s.

**Developer experience:** The developer writes the same template. Streaming is an engine-level optimization, not a template-level concern. There are no boundary markers to place, no loading states to design, no component-level decisions about streaming granularity.

---

### 1.5 React Server Components (RSC)

**What it is:** A paradigm that divides React components into "server components" (which render only on the server and send their output as a serialized payload) and "client components" (which hydrate and run in the browser). Server components can access databases, file systems, and other server resources directly.

**What it compensates for:** The loss of server-authoritative data resolution. In the original React model, all data fetching happens on the client via API calls. RSC recovers the ability for the rendering layer to access server resources directly — a property that server-rendered architectures never lost.

**Complexity introduced:** The component model is partitioned. Server components cannot use state or effects. Client components cannot access server resources directly. The boundary between them must be managed explicitly (`"use client"` directives). Serialization rules constrain what can pass across the boundary. The developer must classify every component and reason about the implications of that classification.

**PRESTO layer:** Layer 0. In PRESTO, every template is a "server component" in the sense that it has direct access to data through directives. The `htx:data`, `htx:v`, and expression placeholders resolve data on the server as part of the rendering pipeline. There is no client/server component distinction because the server renders everything by default. Client-side behavior is added via `htx:script` (Layer 2) or higher layers — but these are additions to a complete server-rendered document, not a partition of the rendering model.

**Developer experience:** The developer writes data directives in the template. The engine resolves them. There is no `"use client"` directive, no serialization boundary, no classification of components into server and client categories. The template accesses data; the engine resolves it; the client receives HTML.

---

## 2. Hydration and Reconciliation

### 2.1 ReactDOM.hydrate / hydrateRoot

**What it is:** After the server renders HTML and the client receives it, React "hydrates" the document — attaching event listeners and reconstructing the internal component tree to match the server-rendered DOM. This makes the static HTML interactive.

**What it compensates for:** The fundamental split between server-rendered markup and client-side control. The server produced HTML; the client needs a component tree. Hydration bridges the two — reconciling the server's output with the client's object model.

**Complexity introduced:** Hydration mismatches — when the server-rendered HTML differs from what the client would render — produce bugs that are notoriously difficult to diagnose. The developer must ensure that server and client produce identical output, which constrains what the server can do (no request-time personalization that the client can't replicate) and what the client can do (no immediate DOM modifications before hydration completes). The "uncanny valley" period between HTML arrival and hydration completion produces a page that appears interactive but isn't.

**PRESTO layer:** Hydration does not exist in PRESTO. It is not at any layer because the problem it solves does not arise. At Layer 0, the page is complete HTML with no client-side framework to attach. At Layer 2, `htx:script` blocks execute after the document is fully parsed and painted — they enhance a complete document rather than reclaiming it. At Layer 5, if a full SPA is pushed, it mounts into a prepared region of the DOM rather than attempting to reconcile with server-rendered markup.

**Developer experience:** There is no hydration step. There are no hydration mismatches. There is no uncanny valley. The page is interactive when it arrives (links work, forms submit). Scripts that enhance it run after it is complete. The concept of "hydration" is absent from the developer's vocabulary.

---

### 2.2 Selective Hydration

**What it is:** React 18's ability to hydrate different parts of the page independently, prioritizing interactive regions based on user input (e.g., hydrating a clicked component before others).

**What it compensates for:** The performance cost of hydrating the entire page at once — itself a consequence of hydration existing at all.

**PRESTO layer:** Does not apply. There is no hydration to selectively perform. At Layer 2, scoped scripts are already independent — each `htx:script` receives a reference to its own component's DOM element and executes independently. The isolation is structural, not an optimization over a monolithic process.

**Developer experience:** Each `htx:script` is self-contained. There is no hydration queue, no prioritization logic, no reasoning about which parts of the page become interactive first. Everything is interactive upon arrival; enhancements execute independently.

---

### 2.3 Resumability (Qwik)

**What it is:** Qwik's approach serializes the component tree's state into HTML attributes, allowing the client to "resume" from the server's state without re-executing component logic. Event handlers are lazily loaded only when triggered.

**What it compensates for:** The cost of hydration by eliminating the re-execution phase entirely. The client doesn't rebuild the component tree — it picks up where the server left off.

**Complexity introduced:** The framework must serialize all component state into the HTML. Event handlers require a global listener that lazy-loads the correct handler on first interaction. The developer must reason about serialization boundaries and what state survives the server-to-client transfer.

**PRESTO layer:** Layer 2. The property Qwik seeks — scripts that activate without reconstructing a component tree — is what latent binding provides natively. An `htx:script` executes after the entire document exists. It doesn't need to resume from serialized state because the document *is* the state. The DOM contains the data (rendered by the server), the structure (composed by the engine), and the element references (queryable by the script). There is nothing to serialize and nothing to resume.

**Developer experience:** The developer writes a script block inside a component. It runs after the page is complete. It queries the DOM for what it needs. There is no serialization, no resumability framework, no lazy-loading infrastructure for event handlers.

---

## 3. Routing

### 3.1 Client-Side Routing (React Router, Next.js App Router)

**What it is:** The client intercepts navigation events and renders new content without a full page reload. URL changes are handled by the client-side router, which maps URLs to component trees and manages history state.

**What it compensates for:** The loss of server-authoritative navigation. In a server-rendered architecture, clicking a link requests a new page from the server. Client-side routing recovers the "instant" navigation feel by avoiding the round trip — at the cost of the client managing URL-to-content mapping.

**Complexity introduced:** Route definitions must be maintained in client code. Nested routes, parallel routes, intercepting routes, and catch-all routes add configuration complexity. Code splitting per route requires dynamic imports and loading states. The browser's back/forward behavior must be managed manually. Deep linking and server-side rendering of arbitrary routes require the router to work on both client and server.

**PRESTO layer:** Filesystem routing is Layer 0 — the file's path is the URL. No router configuration exists. For pages that require client-side navigation (single-page applications), client routing is available at Layer 5 as an opt-in capability pushed by the server. The developer chooses per-page: most pages use filesystem routing (zero configuration); pages that need preserved client state across navigations use the Layer 5 SPA model.

**Developer experience:** For most pages: create a file at the desired path. The file is the route. For SPA pages: the server pushes a client router as part of the Layer 5 grant. The entry point is still a server-rendered `.htx` file. The transition to client routing is a local decision that doesn't affect other pages.

---

### 3.2 File-Based Routing with Client Navigation (Next.js)

**What it is:** Next.js combines file-based route declaration (the file's path determines the URL) with client-side navigation (transitions between routes avoid full page reloads). This attempts to combine the simplicity of filesystem routing with the speed of client-side transitions.

**What it compensates for:** The developer experience cost of maintaining explicit route configurations — combined with the performance cost of full page reloads.

**Complexity introduced:** Special file conventions (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`) partition what was previously a single concern into multiple files. Route groups, parallel routes, and intercepting routes add filesystem conventions that must be learned. The hybrid model means the developer must understand both server-side and client-side routing behavior.

**PRESTO layer:** Layer 0. A single `.htx` file is the route declaration, the layout reference, the data query, the error boundary, and the rendering template. The file's path is the URL. There are no special file conventions. For pages that benefit from partial updates without full reloads, htmx attributes (Layer 1) swap HTML fragments — achieving the same perceived performance as client-side navigation while preserving full server authority over each fragment.

**Developer experience:** One file per route. The file declares everything about that route. Partial updates use htmx attributes on the elements that should swap. There is no `loading.tsx`, no `error.tsx`, no route groups, no parallel routes. The filesystem is the router. The template is the page.

---

## 4. State Management

### 4.1 Redux / Zustand / Jotai / Recoil

**What it is:** External state management libraries that provide centralized or atomic state stores for React applications. They exist because React's built-in state management (useState, useContext) doesn't scale to complex application state shared across many components.

**What it compensates for:** The absence of shared state across the component tree. In the DO model, each component owns its own state. When multiple components need the same data, an external coordination mechanism is required. These libraries provide that mechanism — stores, atoms, selectors, subscriptions — to synchronize state that the component model cannot share natively.

**Complexity introduced:** The developer must learn a state management paradigm (flux, atomic, proxy-based). Actions, reducers, selectors, subscriptions, and middleware add conceptual overhead. State normalization is required for relational data. Stale state, race conditions, and subscription leaks are ongoing concerns. The choice of library is itself a significant decision with ecosystem implications.

**PRESTO layer:** Layers 0-2. The server-rendered document *is* the shared state. When the server resolves a template, every data value is rendered into the HTML. An `htx:script` in one component can query a sibling component's DOM element because the entire document exists when scripts execute. There is no coordination problem because there is no distributed object graph — there is a document, and scripts read from it.

At Layer 3+, when client-side state is necessary for interactive features, the server pushes scoped modules via Client State Transfer. State lives in the pushed module's closure, not in a global store. Different features receive different state containers, each scoped to its concern. There is no global state management library because there is no global client-side application.

**Developer experience:** At Layers 0-2, the developer reads state from the DOM. `el.querySelector('[data-price]').textContent` is the state access pattern. At Layer 3+, the pushed module manages its own state internally. The developer does not choose a state management library, configure a store, or reason about state normalization. The architecture eliminates the problem that state management libraries exist to solve.

---

### 4.2 React Query / TanStack Query / SWR

**What it is:** Libraries that manage server state — data fetched from APIs — separately from client state. They provide caching, background refetching, stale-while-revalidate patterns, optimistic updates, and automatic retry. They exist because fetching and caching server data in a client-side application is surprisingly complex.

**What it compensates for:** The loss of server-authoritative data delivery. In a server-rendered architecture, the server resolves data and includes it in the response. The client never "fetches" data — it receives a document that already contains it. React Query and SWR recover server-data management for a client that has been given responsibility for fetching its own data.

**Complexity introduced:** Cache keys, invalidation strategies, stale times, refetch intervals, query dependencies, mutation callbacks, optimistic rollback, and garbage collection of unused queries. The developer must reason about a client-side cache that mirrors server state — including when the mirror is stale and how to update it.

**PRESTO layer:** Layer 0 for initial data; Layer 4 for dynamic data needs. The template's data directives resolve server data at render time — it arrives in the HTML. For interactive features that require fresh data after the initial load, Authenticated Islands (Layer 4) use channel tokens to fetch scoped JSON from server-controlled endpoints. The server determines what data is available; the client requests it through a mediated channel.

**Developer experience:** Initial data is in the HTML — the developer writes a data directive, and the value appears in the rendered page. For dynamic data, `channelFetch` retrieves JSON from a scoped endpoint. There is no client-side cache to configure, no stale-while-revalidate policy, no cache key management. The server is the source of truth; the client accesses it through a controlled channel.

---

### 4.3 Context API / Provider Hell

**What it is:** React's built-in mechanism for passing data through the component tree without prop drilling. In practice, complex applications wrap the root component in dozens of nested providers (theme, auth, router, query client, store, intl, feature flags), creating "provider hell."

**What it compensates for:** The DO model's lack of ambient context. Each component is an isolated object; sharing context requires explicit wiring. Providers create pseudo-global scope within the component tree, approximating the ambient availability that server-rendered templates have natively.

**PRESTO layer:** Layer 0. In PRESTO, context is not threaded through a component tree — it is resolved by the engine and rendered into the HTML. Context providers (registered by modules) make data available to every template in the resolution pipeline. Authentication state, theme values, feature flags, and application configuration are available as expression values. The template accesses them directly: `{htx:auth.user.name}`, `{htx:flags.newFeature}`. There is no wrapping, no nesting, no provider ordering.

**Developer experience:** Context values are expression variables. The developer uses them in templates with `{htx:}` syntax. There is no provider component, no useContext hook, no provider ordering concern. Modules register context providers; the engine makes them available; templates consume them.

---

## 5. Data Fetching

### 5.1 getServerSideProps / getStaticProps / Server Actions

**What it is:** Next.js mechanisms for fetching data on the server and making it available to the page component. `getServerSideProps` runs per request; `getStaticProps` runs at build time; Server Actions handle mutations via form submissions or programmatic calls.

**What it compensates for:** The loss of server-side data resolution in a client-rendered framework. These functions recover the ability to access databases, file systems, and APIs on the server — a capability that server-rendered architectures never lost.

**Complexity introduced:** Data fetching is separated from the component that uses the data. The developer writes a component in one mental model (declarative React) and a data function in another (imperative async I/O). Props must be serialized across the server-client boundary. Server Actions introduce a new RPC-like pattern with its own error handling, validation, and security model.

**PRESTO layer:** Layer 0. Data directives (`htx:data` with type, where, order attributes) declare what data the template needs. The engine resolves them during the rendering pipeline. Data and markup coexist in the same file — there is no separation between "data fetching function" and "rendering component." Mutations use `htx:action` directives with signed action tokens. The template declares what writes it supports; the engine validates and executes them.

**Developer experience:** Data requirements are declared inline with the markup. The engine resolves the query. The template renders the results with expression placeholders. Mutations are declared alongside the form that triggers them. There is no separate data function, no serialization boundary, no RPC mechanism. The template declares intent; the engine fulfills it.

---

### 5.2 API Routes / Route Handlers / tRPC

**What it is:** Server-side endpoints that handle HTTP requests within the framework. API routes (Next.js pages router), Route Handlers (Next.js app router), and tRPC (type-safe RPC layer) provide mechanisms for the client to communicate with the server beyond page rendering.

**What it compensates for:** The need for a server communication channel in a client-rendered application. Because the client manages rendering and state, it needs endpoints to fetch data and perform mutations. These mechanisms provide that — effectively rebuilding the server interaction layer that server-rendered architectures provide through forms and links.

**Complexity introduced:** API design, request validation, response formatting, error handling, authentication middleware, CORS configuration, and type synchronization between client and server. tRPC addresses the type synchronization problem but introduces its own abstraction layer (routers, procedures, contexts, middleware).

**PRESTO layer:** Layer 0 for standard interactions (links navigate, forms mutate). Layer 4 for features that require programmatic data access — channel handlers provide scoped JSON endpoints authenticated by channel tokens. The server defines what endpoints exist through the module system; the client accesses them through the representation-mediated channel.

**Developer experience:** Most interactions are HTML-native: links for navigation, forms for mutation. For programmatic access, a module registers a channel handler. The handler serves JSON from a scoped endpoint. The client accesses it with a channel token issued by the server. There is no API route configuration, no CORS setup, no type synchronization library. The module defines the endpoint; the token scopes the access; the handler returns the data.

---

## 6. Build Tooling

### 6.1 Bundlers (webpack, Vite, turbopack, esbuild)

**What it is:** Tools that process, transform, and package the application's JavaScript, CSS, and assets into optimized bundles for delivery to the client. They resolve imports, transform JSX, apply polyfills, split code into chunks, and generate source maps.

**What it compensates for:** The cost of shipping a complete application to the client. Because the DO model sends all application code to every client, bundlers exist to make that code as small and efficient as possible. They are logistics optimizations for a supply chain that only exists because the architecture chose to ship the entire warehouse to every customer.

**Complexity introduced:** Configuration files, plugin ecosystems, loader chains, module resolution rules, build times, development server complexity, hot module replacement, and debugging across source maps. Build tooling failures are a common source of developer frustration — tools that exist to solve a problem the architecture introduced.

**PRESTO layer:** None. There is no build step. The engine resolves templates at request time. Client-side code is either inline (`htx:script`), loaded from a CDN (htmx), or pushed by the server (Client State Transfer). There is nothing to bundle because there is no client-side application to package. The WASM compilation step (Layer 6) is the only case where ahead-of-time processing is required, and it applies only to pages that use native compute — not to the application as a whole.

**Developer experience:** The developer saves a file. The next request serves the updated content. There is no build step, no dev server to restart, no waiting for compilation. The feedback loop is: edit, save, reload.

---

### 6.2 Transpilers and Compilers (Babel, SWC, TypeScript Compiler)

**What it is:** Tools that transform modern JavaScript and TypeScript into code that browsers can execute. Babel transforms JSX and modern syntax to ES5. SWC does the same faster. The TypeScript compiler type-checks and transpiles.

**What it compensates for:** The gap between the language the developer writes and the language the browser executes. JSX is not JavaScript — it must be transformed. TypeScript is not JavaScript — it must be compiled. Modern syntax may not be supported in target browsers — it must be transpiled.

**PRESTO layer:** Layer 0-2 require no transpilation. Templates are HTML. Expressions use the engine's syntax, not JavaScript. `htx:script` blocks contain standard JavaScript that runs in the browser directly. At Layer 3+, pushed code is standard JavaScript authored on the server. At Layer 6, AssemblyScript compiles to WASM — but this is a per-module concern, not an application-wide build requirement.

**Developer experience:** The developer writes HTML with expressions and standard JavaScript. There is no JSX, no TypeScript compilation step for the application, no transpilation target to configure. The code the developer writes is the code that runs.

---

### 6.3 Tree Shaking and Dead Code Elimination

**What it is:** Build-time analysis that removes unused code from the bundle. If a module exports ten functions and the application imports three, tree shaking eliminates the other seven from the output.

**What it compensates for:** The bloat introduced by shipping an entire application to the client. Because the DO model bundles everything, unused code must be actively removed. Tree shaking is a compensating optimization for an architecture that includes too much by default.

**PRESTO layer:** None. The architecture includes nothing by default. Layer 0 sends zero JavaScript. Each subsequent layer adds only what that specific page requires. There is no bundle to shake because there is no bundle. The progressive model is *additive by design* — you include what you need, not exclude what you don't.

**Developer experience:** The developer does not think about bundle size, unused imports, or side effects that prevent tree shaking. Each page declares its own requirements. The engine and the progressive layer model ensure that only relevant code reaches the client.

---

## 7. Performance Recovery

### 7.1 Code Splitting and Dynamic Imports

**What it is:** Dividing the application bundle into smaller chunks that load on demand. `React.lazy(() => import('./Component'))` defers loading a component until it's needed.

**What it compensates for:** The initial load cost of shipping the entire application at once. Code splitting recovers the property of sending only what's needed — a property that server-rendered architectures have by default because each page response contains only that page's content.

**PRESTO layer:** Layer 0. Every page response contains exactly what that page needs — its rendered HTML, its data, its scoped scripts. Nothing more. There is no application bundle to split because there is no application bundle. The "splitting" is inherent in the architecture: each request returns one page's representation.

**Developer experience:** The developer does not think about code splitting. Each `.htx` file produces a self-contained response. The concept of "loading a component lazily" does not arise because components are resolved on the server during rendering — they are HTML by the time they reach the client.

---

### 7.2 Suspense Boundaries and Loading States

**What it is:** React's mechanism for declaratively specifying loading UI while asynchronous content resolves. `<Suspense fallback={<Spinner />}>` wraps components that may not be ready immediately.

**What it compensates for:** The visible latency of client-side data fetching and code loading. Because the client must fetch data after mounting, there are periods where content isn't available. Suspense provides a pattern for managing these periods — replacing absent content with loading indicators.

**Complexity introduced:** The developer must decide where to place Suspense boundaries, what fallback UI to show, how nested Suspense boundaries interact, and how to avoid layout shift when content loads. Loading states become a first-class design concern.

**PRESTO layer:** Layer 0. The server resolves all data before sending the response. The client receives a complete document with all content present. There is no loading state because there is nothing to wait for — the page is complete when it arrives. For features that update content dynamically (htmx swaps at Layer 1), the htmx library provides configurable indicators without Suspense boundaries or fallback components.

**Developer experience:** The developer does not design loading states for initial page content. The page arrives complete. For dynamic updates (e.g., an htmx-powered search), a CSS class on the triggering element can show a spinner. This is CSS, not a component architecture concern.

---

### 7.3 Image Optimization (next/image)

**What it is:** An image component that automatically optimizes images — resizing, converting to modern formats (WebP/AVIF), lazy loading, and serving responsive sizes based on viewport.

**What it compensates for:** The complexity of serving optimized images in a web application. This is a genuine concern independent of architectural style — though the build-centric model of thick-client frameworks makes it a framework-level feature rather than an infrastructure concern.

**PRESTO layer:** This is a legitimate concern at every layer. Image optimization in PRESTO is handled by middleware or a content adapter — a module that processes image requests, resizes and converts on demand, and caches the results. The template references images with standard `<img>` tags; the middleware intercepts the request and serves an optimized version. This is infrastructure, not application architecture.

**Developer experience:** Standard `<img>` tags with `srcset` and `sizes` attributes for responsive images. If an image optimization module is installed, it handles the rest transparently. There is no special image component, no framework-specific API. HTML's native image features, enhanced by server-side middleware when needed.

---

## 8. Security Compensations

### 8.1 API Middleware Authentication

**What it is:** Middleware that intercepts API requests and validates authentication tokens (JWTs, session cookies, API keys) before allowing the request to reach the handler.

**What it compensates for:** The loss of server authority over the interaction surface. Because the client has the full application code and makes arbitrary API calls, every endpoint must independently verify that the caller is authorized. The server must defend every door because the client has access to every hallway.

**PRESTO layer:** Layer 0 inherits security through absence. If the server doesn't render the template, the client doesn't see the page. If the server doesn't push the module, the client can't execute it. If the server doesn't issue the channel token, the client can't access the data. Unprovided capabilities don't exist on the client. For explicit authorization at Layer 4+, channel tokens scope access to specific module endpoints. The channel middleware validates tokens before routing to handlers. But the primary security model is architectural: the server controls what exists on the client.

**Developer experience:** The developer uses conditional rendering in templates (`htx:auth`, `htx:unauth`) to control what the user sees. Action tokens are signed by the engine and validated automatically. Channel tokens are issued by the server and scoped to specific modules. The developer does not write authentication middleware for each endpoint — the architecture's authority model handles it.

---

### 8.2 Route Guards and Protected Routes

**What it is:** Client-side checks that redirect unauthenticated users away from protected pages. Implemented as wrapper components or router middleware that verify auth state before rendering.

**What it compensates for:** The fact that in a client-rendered application, all routes are delivered to all users in the JavaScript bundle. The routing code for `/admin/users` exists in the client even for unauthenticated users. Route guards prevent rendering, but the route's existence is visible in the client code.

**PRESTO layer:** Layer 0. Protected routes are server-rendered templates that check authentication state during resolution. An unauthenticated user requesting `/admin/users` receives a redirect response — not the page template, not a loading state, not a client-side redirect. The template for that route never reaches the client. There is nothing to guard because there is nothing to protect against — the unauthorized user never received the capability.

**Developer experience:** The template uses auth directives or conditional rendering. The engine checks authentication during resolution. Unauthorized requests are redirected at the server level. There is no client-side route guard, no auth wrapper component, no flash of protected content before redirect.

---

### 8.3 Server-Only Modules / "use server" / Tainted Data

**What it is:** Mechanisms to ensure that certain code or data never reaches the client. `"use server"` marks functions as server-only. React's experimental taint API marks objects as unsafe for client transfer. These exist to prevent accidental exposure of server secrets in the client bundle.

**What it compensates for:** The risk inherent in a shared-execution model where server and client code coexist in the same files. When the boundary between server and client is a directive rather than a physical separation, accidental leakage of secrets, database queries, or internal logic becomes a real concern.

**PRESTO layer:** Layer 0. There is no shared-execution model. The server and client are physically separated. Templates are server-side files that the client never sees. The engine resolves all expressions, directives, and data queries before producing HTML. The output contains no trace of the template's structure, the engine's logic, or the server's configuration. There is nothing to taint because there is no mechanism by which server code could reach the client. The separation is not enforced by a directive — it is enforced by the architecture.

**Developer experience:** The developer does not think about what code might accidentally reach the client. All template logic is server-side by definition. The `.htx` file is resolved entirely on the server; the client receives HTML. There is no `"use server"` directive because there is no alternative.

---

## 9. Summary: The Compensation Stack

Each category of compensation in the React ecosystem traces back to a single architectural decision: placing the distributed object model outside the RESTful boundary rather than inside it. The compensating technologies form a stack — each layer of compensation introducing problems that require further compensation:

1. **The DO model renders on the client** → the server sends an empty shell
2. **The shell has no content** → SSR compensates by rendering on the server
3. **SSR is slow per-request** → SSG compensates by pre-rendering at build time
4. **SSG produces stale content** → ISR compensates by regenerating in the background
5. **SSR produces non-interactive HTML** → hydration compensates by attaching the DO model
6. **Hydration is expensive** → selective hydration, streaming SSR, and resumability compensate by deferring or eliminating re-execution
7. **The client needs data** → API routes, React Query, and server actions compensate by providing data channels
8. **Data channels need caching** → stale-while-revalidate, cache invalidation, and optimistic updates compensate by managing client-side data mirrors
9. **All code ships to all users** → code splitting, tree shaking, and bundle optimization compensate by reducing what's delivered
10. **All routes exist on the client** → route guards compensate by hiding what the user shouldn't see
11. **Server and client share code** → "use server," server-only modules, and taint APIs compensate by marking boundaries in shared files

Each step is a rational engineering response to the problem introduced by the previous step. Each is executed with skill and ingenuity. And each is unnecessary when the architectural encapsulation is correct.

PRESTO does not solve these problems. It dissolves them by restoring the encapsulation that prevents them from arising. The server renders complete representations. The client receives finished documents. Code-on-demand is progressive — added per-page, per-feature, as needed. The DO model, when required, operates within a bounded region of the REST representation, inheriting the properties it cannot produce on its own.

The developer's path is not from React to PRESTO. It is from the compensating stack to the correct layer — discovering, at each step, that the property they were working to recover was available by default at the layer where the architecture provides it natively.
