# PRESTO: Co-Founder Pitch Outline

*Prepared for slide deck creation. Target audience: Webflow developer considering co-founding.*

---

## Slide 1: The Question Nobody Asked

In 2000, Roy Fielding described the architecture of the web. He identified six constraints. Five were mandatory. One — code-on-demand — was optional.

Twenty-six years later, the industry explored that option exactly once: ship the entire application to the browser. React, Vue, Angular. The "Single Page Application."

**Nobody asked: what if code-on-demand were a spectrum?**

---

## Slide 2: The Problem Everyone Feels

Every Webflow developer knows this moment: the client needs authentication, real-time data, personalized content, or a dashboard. Webflow can't do it. So you bolt on:

- A backend API
- A JavaScript framework
- A state management layer
- A build pipeline
- Authentication middleware
- A hosting platform that understands all of it

**The visual builder gets you 60% there. The last 40% costs 400% of the effort.**

React developers know the inverse: they can build anything, but the complexity tax is relentless. SSR, hydration, code splitting, tree shaking, server components, streaming suspense — each solving a problem created by the previous solution.

---

## Slide 3: The Observation

A PHP function concatenates an HTML string. Inside that string is an `hx-get` attribute — an instruction for the browser. The PHP function doesn't know what `hx-get` means. It doesn't need to. It just writes the string.

The server is *indifferent* to the client's instructions. The browser is *indifferent* to the server's directives (they've already been consumed). Two interpreters. One document. Mutual indifference.

**This property has existed in every HTTP response since 1993. It was never named.**

We named it: **Ambivalent Execution with Agnostic Determinism.**

---

## Slide 4: The Insight

If the server can embed client instructions it doesn't understand, we can go further. Much further.

A single `.htx` template file addresses two interpreters simultaneously:

```
<main>
  <htx:data query="SELECT * FROM posts ORDER BY created_at DESC" as="posts" />
  <htx:each items="posts" as="post">
    <article>
      <h2>{htx:post.title}</h2>
      <p>{htx:post.body}</p>
    </article>
  </htx:each>
</main>
```

The server resolves `htx:data`, `htx:each`, and `{htx:...}` expressions. What reaches the browser is pure, clean HTML. No framework. No hydration. No JavaScript. The server's instructions are consumed and erased before the browser ever sees the document.

**The template IS the application. One file. Two interpreters. Zero framework artifacts in the output.**

---

## Slide 5: The Layer Model

Code-on-demand isn't binary. It's a depth gauge.

| Layer | What's Delivered | What's Added |
|-------|-----------------|--------------|
| **0** | Pure server-rendered HTML | Nothing. Full REST properties. |
| **1** | + htmx attributes | Partial page updates without JS |
| **2** | + scoped script blocks | Client behavior (dropdowns, modals) |
| **3** | + server-pushed code | Real-time updates via WebSocket |
| **4** | + authenticated islands | Scoped data channels per component |
| **5** | + client routing | SPA navigation within bounded regions |
| **6** | + WebAssembly | Native-speed compute in the browser |

**The discipline: stay at the surface by default. Dive only when necessary. Every layer below 0 trades properties for capabilities.**

A blog post is Layer 0. A dashboard is Layer 2. A collaborative editor is Layer 4. A video processor is Layer 6. They all live in the same application, on the same page, each at exactly the depth it needs.

---

## Slide 6: Why React's Complexity Is Structural

This is not an opinion. It's an architectural analysis.

React operates as a Distributed Object system — every component manages its own state, communicates through props and context, and couples to its runtime. When you put a DO system as the *outer* architecture of a web application, you lose REST's properties: cacheability, server authority, statelessness, complete representations.

Then you spend years building compensating technologies to get them back:

| Compensating Technology | What It Recovers |
|------------------------|------------------|
| SSR | Complete representations |
| SSG | Performance lost to SSR |
| ISR | Freshness lost to SSG |
| Hydration | Client interactivity after SSR |
| React Server Components | Server-authoritative data |
| Redux/Zustand | Shared state across components |
| React Query/SWR | Server data synchronization |
| Code Splitting | Payload reduction |
| Tree Shaking | Payload reduction |
| Route Guards | Server-side access control |

**Every one of these recovers a property that Layer 0 provides for free.**

PRESTO doesn't compete with these technologies. It dissolves the conditions that require them.

---

## Slide 7: What We Built

### The Engine
A 22-stage resolution pipeline that transforms `.htx` templates into pure HTML. Implemented in TypeScript (production), Go, Elixir, Python, Rust, and C — all from a single 2,020-word specification seed. The C implementation runs in 11.2 MB of memory.

### The Module System
14 production-ready modules: authentication, sessions, rate limiting, CORS, security headers, caching, health checks, static assets, error handling, and more. Plug in what you need. Each module can provide middleware, data context, API channels, and template processing hooks.

### The Component Library
34 `.htx` UI components organized by layer depth. Buttons, cards, forms, tables, dialogs, tabs, accordions, data tables, live feeds, presence indicators — all installable via CLI (`presto add button card dialog`).

### The Visual Editor
A browser-based page builder with:
- **Drag-and-drop palette** organized by document grammar (landmarks, regions, content blocks)
- **Live preview** — every edit runs through the full 22-stage pipeline in real-time
- **Component tree** — bidirectional navigation between source, tree, and canvas
- **AI assistant** — describe what you want, get architecturally correct `.htx` output
- **Save-as-component** — extract any selection into a reusable component file
- **Undo/redo** with tagged history (visual edits vs. AI edits)

---

## Slide 8: The Editor Is the Proof

Here's what's remarkable about the editor: it required almost no architecture of its own.

- The **canvas** is an iframe that receives clean HTML. No framework bridge needed — the engine already produces pure HTML.
- **Builder IDs** use byte offsets into the source string. The source IS the model. No synthetic node graph.
- The **AI integration** sends the current source + component registry to Claude, gets back an `.htx` block, and sets it as the new source. The 22-stage pipeline handles the rest. No AST transforms. No reconciliation.
- The **signal system** (signal, effect, bind) replaces an entire state management layer in ~150 lines — because the server already resolved the data. Client state is genuinely minimal.
- **Save-as-component** works because `htx:component` is already a first-class pipeline stage. Extracting a selection into a file is just using the system as designed.

**The editor didn't need to be architected. The constraints prescribed it.** Every feature is a natural consequence of properties that were already present.

---

## Slide 9: Why This Is a Webflow-Shaped Opportunity

Webflow proved the market: visual builders that output real code. $4B valuation. Millions of users. But Webflow hits a ceiling:

| Webflow | PRESTO Editor |
|---------|---------------|
| Static HTML/CSS output | Full server-rendered applications |
| Needs external CMS for dynamic content | `htx:data` queries built into templates |
| No authentication | `htx:auth` / `htx:unauth` conditional rendering |
| No real-time features | WebSocket channels with signed tokens |
| No backend logic | Server-side data resolution, mutations, middleware |
| Export locks you into Webflow hosting | `.htx` files are portable text files |
| JavaScript required for interactivity | Layer 0 delivers complete HTML with zero JS |

**PRESTO's editor is Webflow without the ceiling.** The visual builder generates the same kind of output a Webflow developer already understands — clean, semantic HTML — but the output is a complete server-rendered application. Authentication, real-time data, personalized content, dashboards — all from the same visual tool.

---

## Slide 10: The AI Advantage

Current AI code generation is limited by the frameworks it targets. Generate a React component and you get: imports, hooks, state management, effect cleanup, error boundaries, suspense boundaries, client/server delineation. The AI has to understand and reproduce the entire compensating technology stack.

Generate `.htx` and you get: HTML with directives. The AI doesn't need to understand state management because there isn't any. It doesn't need to manage hydration because there's nothing to hydrate. It doesn't need to split code because there's no bundle.

**The simpler the generation target, the more reliable the AI output.**

The editor already demonstrates this. Claude generates architecturally correct `.htx` output consistently because the format is constrained enough to be reliable but expressive enough to build real applications. The 22-stage pipeline guarantees that any valid `.htx` input produces correct output.

---

## Slide 11: What Exists Today

| Asset | Status |
|-------|--------|
| PRESTO architectural style (white papers) | Complete — 8 documents, ~328KB of original theory |
| htxlang specification | Complete — 8 contracts, 16 directives, 22-stage pipeline |
| TypeScript engine (presto-ts) | Working — full pipeline, module system, demo app |
| Visual editor | Working — drag-drop, live preview, AI chat, component tree |
| Component library | 34 components across all 7 layers |
| CLI installer | Working — shadcn-style `presto add` |
| Cross-language verification | 6 implementations (TS, Go, Elixir, Python, Rust, C) passing 22 tests |
| Go implementation | Working — independent from spec |
| Documentation | 55 technical docs, 22 learnings docs, 15 spec docs |

---

## Slide 12: The Ask

**Co-founder role.** You bring:
- Deep understanding of the visual builder market (Webflow, Framer, Squarespace)
- Design sensibility for the editor UX
- Knowledge of what designers and non-technical builders actually need
- Business development in the no-code/low-code space

I bring:
- The architectural style and its intellectual property
- The working engine, editor, and component library
- The specification that enables multi-language implementation
- The AI integration pipeline
- Two years of research and six cross-language implementations

**Together:** We build the visual builder that has no ceiling — where the output isn't a static site that needs a backend bolted on, but a complete, server-rendered, real-time-capable web application. Where AI doesn't fight the framework — it writes directly to a format so constrained that correctness is structural.

---

## Slide 13: The Vision

The web was designed as a hypermedia system. For 15 years, the industry has been building against that grain — shipping entire applications to the browser and then spending enormous effort recovering the properties that were free all along.

PRESTO doesn't fight the web. It *is* the web — with the one optional constraint Fielding identified in 2000 finally explored as the spectrum it always was.

**The question isn't whether this works. It's already working. The question is who builds the company around it.**
