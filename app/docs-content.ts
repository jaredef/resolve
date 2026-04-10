export interface DocumentationArticle extends Record<string, unknown> {
  title: string;
  slug: string;
  summary: string;
  section: string;
  section_label: string;
  order: number;
  status: "published";
  body: string;
  body_html: string;
  created_at: string;
  updated_at: string;
}

export const DOCUMENTATION_SECTIONS = [
  { id: "getting-started", label: "Getting Started" },
  { id: "core-concepts", label: "Core Concepts" },
  { id: "real-time", label: "Real-Time" },
  { id: "building-pages", label: "Building Pages" },
  { id: "engine-internals", label: "Engine Internals" },
  { id: "guides", label: "Guides" },
  { id: "operations", label: "Operations" },
] as const;

export const DOCUMENTATION_ARTICLES: DocumentationArticle[] = [
  // ═══════════════════════════════════════════════════
  //  GETTING STARTED
  // ═══════════════════════════════════════════════════
  {
    title: "What Is Hypermedia App?",
    slug: "what-is-hypermedia-app",
    summary: "Understand the hypermedia-driven application model, what HTX files are, and why server-rendered templates replace most frontend JavaScript.",
    section: "getting-started",
    section_label: "Getting Started",
    order: 1,
    status: "published",
    body: "Hypermedia App is a file-routed, template-driven full-stack application model.",
    body_html: `
<h2>The Model</h2>
<p>Hypermedia App is a <strong>file-routed, template-driven, full-stack application model</strong>. You write <code>.htx</code> files&mdash;HTML templates enriched with a small set of declarative directives&mdash;and the runtime handles routing, content queries, layout composition, mutations, and security automatically.</p>
<p>There is no build step, no bundler, and no client-side framework. Pages are server-rendered HTML. If you need interactivity, you add <code>htmx</code> attributes to your templates and the runtime handles the rest.</p>

<h2>Why Templates Instead of Components?</h2>
<p>Modern web development has converged on component trees that compile to JavaScript. HTX inverts this:</p>
<ul>
  <li><strong>Templates are the source of truth.</strong> A single <code>.htx</code> file defines the route, the data it needs, and the HTML it renders.</li>
  <li><strong>No hydration penalty.</strong> The server sends fully-rendered HTML. The browser paints immediately.</li>
  <li><strong>Progressive enhancement.</strong> Add <code>hx-get</code>, <code>hx-post</code>, or <code>hx-swap</code> attributes to any element to make it interactive without writing JavaScript.</li>
</ul>

<h2>What an HTX File Looks Like</h2>
<pre><code class="language-html">&lt;htx:type&gt;post&lt;/htx:type&gt;
&lt;htx:where&gt;status=published&lt;/htx:where&gt;
&lt;htx:order&gt;newest&lt;/htx:order&gt;
&lt;htx:howmany&gt;10&lt;/htx:howmany&gt;

&lt;htx&gt;
&lt;htx:each&gt;
  &lt;article&gt;
    &lt;h2&gt;&lt;a href="/blog/&#95;&#95;slug&#95;&#95;"&gt;&#95;&#95;title&#95;&#95;&lt;/a&gt;&lt;/h2&gt;
    &lt;p&gt;&#95;&#95;summary&#95;&#95;&lt;/p&gt;
  &lt;/article&gt;
&lt;/htx:each&gt;

&lt;htx:none&gt;
  &lt;p&gt;No posts yet.&lt;/p&gt;
&lt;/htx:none&gt;
&lt;/htx&gt;</code></pre>
<p>This single file:</p>
<ol>
  <li>Declares that it queries the <code>post</code> content type</li>
  <li>Filters to published posts, ordered newest-first, 10 at a time</li>
  <li>Renders each row as an <code>&lt;article&gt;</code> with hydrated placeholders</li>
  <li>Shows a fallback when the query returns zero results</li>
</ol>
<p>No JavaScript. No API layer. No GraphQL schema. The template <em>is</em> the page.</p>

<h2>The Runtime</h2>
<p>The HTX runtime is a 10-phase request pipeline:</p>
<ol>
  <li><strong>Include expansion</strong> &mdash; resolve <code>&lt;htx:include&gt;</code> directives</li>
  <li><strong>Component resolution</strong> &mdash; expand custom element tags into their template bodies</li>
  <li><strong>Let binding</strong> &mdash; evaluate <code>&lt;htx:let&gt;</code> variable definitions</li>
  <li><strong>Block parsing</strong> &mdash; parse <code>if</code>/<code>each</code>/<code>unless</code> control flow</li>
  <li><strong>Content execution</strong> &mdash; run adapter queries and mutations</li>
  <li><strong>Expression evaluation</strong> &mdash; resolve <code>&#123;&#123; &#125;&#125;</code> expressions with 40+ built-in functions</li>
  <li><strong>Hydration</strong> &mdash; replace <code>&#95;&#95;field&#95;&#95;</code> placeholders with content values</li>
  <li><strong>Meta stripping</strong> &mdash; remove directive tags from the output</li>
  <li><strong>Layout wrapping</strong> &mdash; inject the rendered page into its layout chain</li>
  <li><strong>Final pass</strong> &mdash; post-layout includes, final expression eval, escape stripping</li>
</ol>
<p>Every phase is deterministic and stateless. The same template with the same data always produces the same HTML.</p>

<h2>Implementations</h2>
<p>HTX is designed to be <strong>language-agnostic</strong>. The canonical implementation is TypeScript (Bun), but the specification is being implemented in Go and PHP as well. Templates written for one runtime work identically on all others.</p>
`,
    created_at: "2026-03-29 00:00:01",
    updated_at: "2026-03-29 00:00:01",
  },
  {
    title: "Project Structure",
    slug: "project-structure",
    summary: "How the monorepo is organized, where templates live, what each package does, and how data flows from request to response.",
    section: "getting-started",
    section_label: "Getting Started",
    order: 2,
    status: "published",
    body: "The monorepo is split into engine, SQLite adapter, CLI, app, and tests.",
    body_html: `
<h2>Monorepo Layout</h2>
<pre><code>hypermedia-app-ts/
├── packages/
│   ├── htx-engine/          # Core runtime
│   ├── htx-adapter-sqlite/  # SQLite content adapter
│   ├── htx-adapter-markdown/ # Filesystem markdown adapter
│   ├── htx-cli/             # CLI scaffolding and dev server
│   └── create-hypermedia-app/ # Project generator
├── app/                     # Dogfood application
│   ├── templates/           # HTX template files
│   ├── public/              # Static assets
│   ├── data/                # SQLite database
│   ├── config.ts            # App configuration
│   ├── admin-auth.ts        # Authentication service
│   └── admin-host.ts        # Admin middleware
└── tests/                   # Integration and smoke tests</code></pre>

<h2>Key Packages</h2>

<h3>htx-engine</h3>
<p>The engine is the core of everything. It provides:</p>
<ul>
  <li><strong>Router</strong> &mdash; maps URL paths to template files using filesystem conventions</li>
  <li><strong>DSLParser</strong> &mdash; parses <code>&lt;htx:*&gt;</code> directives from template source</li>
  <li><strong>ExpressionEngine</strong> &mdash; tokenizes, parses, and evaluates <code>&#123;&#123; &#125;&#125;</code> expressions</li>
  <li><strong>Hydrator</strong> &mdash; replaces <code>&#95;&#95;field&#95;&#95;</code> placeholders with content row values</li>
  <li><strong>RequestHandler</strong> &mdash; orchestrates the 10-phase rendering pipeline</li>
  <li><strong>LayoutResolver / IncludeResolver</strong> &mdash; handle template composition</li>
  <li><strong>ComponentResolver</strong> &mdash; expands custom element components</li>
  <li><strong>ContentExecutors</strong> &mdash; GET (query), SET (create/update), DELETE executors</li>
</ul>
<p>The engine is adapter-agnostic. It never touches a database directly&mdash;it calls the adapter interface.</p>

<h3>htx-adapter-sqlite</h3>
<p>Implements the <code>ContentAdapter</code> interface using SQLite (via Bun's native <code>bun:sqlite</code>). Features:</p>
<ul>
  <li>Auto-creates tables per content type on first write</li>
  <li>Schema introspection via <code>schema()</code></li>
  <li>Full CRUD: <code>query()</code>, <code>find()</code>, <code>create()</code>, <code>update()</code>, <code>delete()</code></li>
  <li>Supports filtering, ordering, pagination</li>
</ul>

<h3>htx-adapter-markdown</h3>
<p>A read-only adapter that indexes <code>.md</code> files with YAML front matter. Used for documentation sites and static content.</p>

<h3>htx-cli</h3>
<p>The CLI provides commands for scaffolding and serving:</p>
<pre><code class="language-bash">npx create-hypermedia-app my-app
cd my-app &amp;&amp; bun run dev</code></pre>
<p>Options: <code>--docs</code> (include documentation templates), <code>--local</code> (link to local packages).</p>

<h2>The App Directory</h2>
<p>Templates live in <code>app/templates/</code>. The directory structure <em>is</em> the routing table:</p>
<pre><code>app/templates/
├── _layout.htx              # Root layout (wraps every page)
├── index.htx                # GET /
├── blog/
│   ├── index.htx            # GET /blog
│   └── [slug].htx           # GET /blog/:slug
├── docs/
│   ├── _layout.htx          # Docs sub-layout
│   ├── index.htx            # GET /docs
│   └── [slug].htx           # GET /docs/:slug
├── admin/
│   ├── _layout.htx          # Admin shell layout
│   ├── index.htx            # GET /admin (dashboard)
│   └── posts/               # CRUD for posts
│       ├── index.htx
│       ├── new.htx
│       └── [id]/
│           ├── edit.htx
│           └── delete.htx
└── partials/
    ├── _nav.htx
    ├── _footer.htx
    └── _docs-nav.htx</code></pre>

<h2>Data Flow</h2>
<pre><code>Browser Request
    ↓
Router (match URL → template file)
    ↓
RequestHandler (10-phase pipeline)
    ↓
ContentAdapter (query/mutate data)
    ↓
Rendered HTML Response</code></pre>
<p>Every request follows this path. There are no controllers, no middleware chains, no dependency injection containers. The template declares what it needs, and the pipeline delivers it.</p>
`,
    created_at: "2026-03-29 00:00:02",
    updated_at: "2026-03-29 00:00:02",
  },

  // ═══════════════════════════════════════════════════
  //  CORE CONCEPTS
  // ═══════════════════════════════════════════════════
  {
    title: "Routing And Templates",
    slug: "routing-and-templates",
    summary: "How filesystem routing maps URL paths to .htx templates, how dynamic segments work, and how layouts nest automatically.",
    section: "core-concepts",
    section_label: "Core Concepts",
    order: 3,
    status: "published",
    body: "Routes are defined by template paths, including dynamic segments like [slug].",
    body_html: `
<h2>Filesystem Routing</h2>
<p>HTX uses <strong>convention-based routing</strong>. The file path relative to <code>templates/</code> becomes the URL path:</p>
<table>
  <thead><tr><th>File Path</th><th>URL</th></tr></thead>
  <tbody>
    <tr><td><code>templates/index.htx</code></td><td><code>/</code></td></tr>
    <tr><td><code>templates/about.htx</code></td><td><code>/about</code></td></tr>
    <tr><td><code>templates/blog/index.htx</code></td><td><code>/blog</code></td></tr>
    <tr><td><code>templates/blog/[slug].htx</code></td><td><code>/blog/:slug</code></td></tr>
    <tr><td><code>templates/admin/posts/[id]/edit.htx</code></td><td><code>/admin/posts/:id/edit</code></td></tr>
  </tbody>
</table>
<p>Rules:</p>
<ul>
  <li><code>index.htx</code> maps to the directory root</li>
  <li><code>[param].htx</code> creates a dynamic segment &mdash; the value is available as <code>route.param</code></li>
  <li>The <code>.htx</code> extension never appears in URLs</li>
  <li>Files starting with <code>_</code> are private (layouts, partials) and never directly routable</li>
</ul>

<h2>Dynamic Segments</h2>
<p>Dynamic segments capture URL parts into route parameters:</p>
<pre><code class="language-html">&lt;!-- templates/blog/[slug].htx --&gt;
&lt;htx:type&gt;post&lt;/htx:type&gt;
&lt;htx:slug&gt;&#123;&#123; route.slug &#125;&#125;&lt;/htx:slug&gt;

&lt;htx&gt;
&lt;htx:each&gt;
  &lt;h1&gt;&#95;&#95;title&#95;&#95;&lt;/h1&gt;
  &lt;div&gt;&#95;&#95;body_html&#95;&#95;&lt;/div&gt;
&lt;/htx:each&gt;
&lt;/htx&gt;</code></pre>
<p>When a user visits <code>/blog/hello-world</code>, the router sets <code>route.slug = "hello-world"</code>, the expression <code>&#123;&#123; route.slug &#125;&#125;</code> resolves to that value, and the adapter looks up the record with that slug.</p>
<p>You can nest dynamic segments:</p>
<pre><code>templates/admin/posts/[id]/edit.htx   →  route.id
templates/shop/[category]/[product].htx  →  route.category, route.product</code></pre>

<h2>Layout Resolution</h2>
<p>Layouts are templates named <code>_layout.htx</code>. They wrap pages automatically based on directory hierarchy:</p>
<pre><code>templates/
├── _layout.htx              # Root layout — wraps everything
├── index.htx                # Wrapped by root layout
├── docs/
│   ├── _layout.htx          # Docs layout — wraps docs pages
│   ├── index.htx            # Wrapped by: docs → root
│   └── [slug].htx           # Wrapped by: docs → root
└── admin/
    └── _layout.htx          # Admin layout — wraps admin pages</code></pre>
<p>Layout nesting is automatic. A page at <code>/docs/routing</code> is wrapped by <code>docs/_layout.htx</code>, which is then wrapped by <code>_layout.htx</code>. The <code>&#95;&#95;content&#95;&#95;</code> placeholder in each layout marks where the inner content is injected.</p>

<h3>Layout Example</h3>
<pre><code class="language-html">&lt;!-- _layout.htx (root) --&gt;
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;&lt;title&gt;My App&lt;/title&gt;&lt;/head&gt;
&lt;body&gt;
  &lt;nav&gt;...&lt;/nav&gt;
  &lt;main&gt;&#95;&#95;content&#95;&#95;&lt;/main&gt;
  &lt;footer&gt;...&lt;/footer&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>

<h2>Query Parameters</h2>
<p>Query string values are available through the <code>query</code> object:</p>
<pre><code class="language-html">&lt;!-- URL: /search?q=hello&amp;page=2 --&gt;
&lt;p&gt;Searching for: &#123;&#123; query.q &#125;&#125;&lt;/p&gt;
&lt;p&gt;Page: &#123;&#123; query.page &#125;&#125;&lt;/p&gt;</code></pre>

<h2>Template Anatomy</h2>
<p>Every HTX template is valid HTML with embedded directives. A typical page template has three sections:</p>
<ol>
  <li><strong>Content directives</strong> &mdash; what data to fetch (<code>&lt;htx:type&gt;</code>, <code>&lt;htx:where&gt;</code>, etc.)</li>
  <li><strong>Content block</strong> &mdash; how to render it (<code>&lt;htx&gt;</code> with <code>&lt;htx:each&gt;</code> and <code>&lt;htx:none&gt;</code>)</li>
  <li><strong>Static HTML</strong> &mdash; always rendered, outside any content block</li>
</ol>
<p>Content directives and <code>&lt;htx&gt;</code> blocks are stripped from the final output. Only the rendered HTML remains.</p>
`,
    created_at: "2026-03-29 00:00:03",
    updated_at: "2026-03-29 00:00:03",
  },
  {
    title: "Reads And Queries",
    slug: "reads-and-queries",
    summary: "How content directives query your adapter, how filtering and ordering work, and how to render lists and single records.",
    section: "core-concepts",
    section_label: "Core Concepts",
    order: 4,
    status: "published",
    body: "Read blocks query the adapter directly and render rows through HTX templates.",
    body_html: `
<h2>Content Directives</h2>
<p>Every read starts with directives that tell the runtime what to fetch:</p>
<table>
  <thead><tr><th>Directive</th><th>Purpose</th><th>Example</th></tr></thead>
  <tbody>
    <tr><td><code>&lt;htx:type&gt;</code></td><td>Content type to query</td><td><code>&lt;htx:type&gt;post&lt;/htx:type&gt;</code></td></tr>
    <tr><td><code>&lt;htx:where&gt;</code></td><td>Filter conditions</td><td><code>&lt;htx:where&gt;status=published&lt;/htx:where&gt;</code></td></tr>
    <tr><td><code>&lt;htx:order&gt;</code></td><td>Sort order</td><td><code>&lt;htx:order&gt;newest&lt;/htx:order&gt;</code></td></tr>
    <tr><td><code>&lt;htx:howmany&gt;</code></td><td>Result limit (default: 20)</td><td><code>&lt;htx:howmany&gt;10&lt;/htx:howmany&gt;</code></td></tr>
    <tr><td><code>&lt;htx:offset&gt;</code></td><td>Skip N results</td><td><code>&lt;htx:offset&gt;20&lt;/htx:offset&gt;</code></td></tr>
    <tr><td><code>&lt;htx:slug&gt;</code></td><td>Fetch single record by slug</td><td><code>&lt;htx:slug&gt;&#123;&#123; route.slug &#125;&#125;&lt;/htx:slug&gt;</code></td></tr>
  </tbody>
</table>
<p>These directives are parsed before any rendering happens. The runtime extracts them, builds a query, and sends it to the content adapter.</p>

<h2>List Rendering</h2>
<p>The <code>&lt;htx:each&gt;</code> block iterates over query results:</p>
<pre><code class="language-html">&lt;htx:type&gt;post&lt;/htx:type&gt;
&lt;htx:where&gt;status=published&lt;/htx:where&gt;
&lt;htx:order&gt;newest&lt;/htx:order&gt;
&lt;htx:howmany&gt;5&lt;/htx:howmany&gt;

&lt;htx&gt;
&lt;htx:each&gt;
  &lt;article&gt;
    &lt;h2&gt;&lt;a href="/blog/&#95;&#95;slug&#95;&#95;"&gt;&#95;&#95;title&#95;&#95;&lt;/a&gt;&lt;/h2&gt;
    &lt;time&gt;&#95;&#95;created_at&#95;&#95;&lt;/time&gt;
    &lt;p&gt;&#95;&#95;summary&#95;&#95;&lt;/p&gt;
  &lt;/article&gt;
&lt;/htx:each&gt;
&lt;/htx&gt;</code></pre>
<p>Inside <code>&lt;htx:each&gt;</code>, use <code>&#95;&#95;field&#95;&#95;</code> placeholders to insert values from each content row. The hydrator replaces these with actual values during rendering.</p>

<h3>System Fields</h3>
<p>Every content row has these built-in fields regardless of adapter:</p>
<table>
  <thead><tr><th>Field</th><th>Description</th></tr></thead>
  <tbody>
    <tr><td><code>&#95;&#95;id&#95;&#95;</code></td><td>Unique record identifier</td></tr>
    <tr><td><code>&#95;&#95;type&#95;&#95;</code></td><td>Content type name</td></tr>
    <tr><td><code>&#95;&#95;slug&#95;&#95;</code></td><td>URL-friendly identifier</td></tr>
    <tr><td><code>&#95;&#95;title&#95;&#95;</code></td><td>Record title</td></tr>
    <tr><td><code>&#95;&#95;body&#95;&#95;</code></td><td>Raw body content</td></tr>
    <tr><td><code>&#95;&#95;body_html&#95;&#95;</code></td><td>Body rendered as HTML</td></tr>
    <tr><td><code>&#95;&#95;status&#95;&#95;</code></td><td>Publication status</td></tr>
    <tr><td><code>&#95;&#95;created_at&#95;&#95;</code></td><td>Creation timestamp</td></tr>
    <tr><td><code>&#95;&#95;updated_at&#95;&#95;</code></td><td>Last modification timestamp</td></tr>
  </tbody>
</table>
<p>Custom fields defined in your content (like <code>summary</code>, <code>section</code>, <code>order</code>) are also available as placeholders.</p>

<h2>Single Record Queries</h2>
<p>To fetch a single record, use <code>&lt;htx:slug&gt;</code>:</p>
<pre><code class="language-html">&lt;htx:type&gt;post&lt;/htx:type&gt;
&lt;htx:slug&gt;&#123;&#123; route.slug &#125;&#125;&lt;/htx:slug&gt;

&lt;htx&gt;
&lt;htx:each&gt;
  &lt;article&gt;
    &lt;h1&gt;&#95;&#95;title&#95;&#95;&lt;/h1&gt;
    &lt;div&gt;&#95;&#95;body_html&#95;&#95;&lt;/div&gt;
  &lt;/article&gt;
&lt;/htx:each&gt;

&lt;htx:none&gt;
  &lt;p&gt;Post not found.&lt;/p&gt;
&lt;/htx:none&gt;
&lt;/htx&gt;</code></pre>

<h2>Filtering with Where</h2>
<p>The <code>&lt;htx:where&gt;</code> directive supports these operators:</p>
<table>
  <thead><tr><th>Operator</th><th>Meaning</th><th>Example</th></tr></thead>
  <tbody>
    <tr><td><code>=</code></td><td>Equals</td><td><code>status=published</code></td></tr>
    <tr><td><code>!=</code></td><td>Not equal</td><td><code>status!=draft</code></td></tr>
    <tr><td><code>&gt;</code></td><td>Greater than</td><td><code>order&gt;3</code></td></tr>
    <tr><td><code>&lt;</code></td><td>Less than</td><td><code>order&lt;10</code></td></tr>
    <tr><td><code>&gt;=</code></td><td>Greater or equal</td><td><code>price&gt;=100</code></td></tr>
    <tr><td><code>&lt;=</code></td><td>Less or equal</td><td><code>price&lt;=500</code></td></tr>
  </tbody>
</table>
<p>Combine conditions with commas (AND logic):</p>
<pre><code class="language-html">&lt;htx:where&gt;status=published,section=getting-started&lt;/htx:where&gt;</code></pre>

<h2>Ordering</h2>
<p>Built-in sort orders every adapter must support:</p>
<table>
  <thead><tr><th>Order</th><th>Behavior</th></tr></thead>
  <tbody>
    <tr><td><code>newest</code></td><td>By <code>created_at</code> descending (default)</td></tr>
    <tr><td><code>oldest</code></td><td>By <code>created_at</code> ascending</td></tr>
    <tr><td><code>alpha</code></td><td>By <code>title</code> A→Z</td></tr>
    <tr><td><code>alpha_desc</code></td><td>By <code>title</code> Z→A</td></tr>
    <tr><td><code>updated</code></td><td>By <code>updated_at</code> descending</td></tr>
  </tbody>
</table>

<h2>Empty States</h2>
<p>Always include <code>&lt;htx:none&gt;</code> to handle zero results gracefully:</p>
<pre><code class="language-html">&lt;htx:none&gt;
  &lt;div class="empty-state"&gt;
    &lt;h2&gt;Nothing here yet&lt;/h2&gt;
    &lt;p&gt;Create your first post to get started.&lt;/p&gt;
  &lt;/div&gt;
&lt;/htx:none&gt;</code></pre>
<p>This renders only when the query returns an empty result set.</p>
`,
    created_at: "2026-03-29 00:00:04",
    updated_at: "2026-03-29 00:00:04",
  },

  // ═══════════════════════════════════════════════════
  //  BUILDING PAGES
  // ═══════════════════════════════════════════════════
  {
    title: "Layouts, Includes, And Components",
    slug: "layouts-includes-and-components",
    summary: "How to compose pages from layouts, partials, and reusable components using includes, slots, and props.",
    section: "building-pages",
    section_label: "Building Pages",
    order: 5,
    status: "published",
    body: "HTX supports nested layouts, partial includes, props, and slots for reusable UI.",
    body_html: `
<h2>Layouts</h2>
<p>Layouts are templates named <code>_layout.htx</code> that wrap page content. Every directory can have its own layout, and they nest automatically.</p>

<h3>How Layouts Wrap Content</h3>
<p>The <code>&#95;&#95;content&#95;&#95;</code> placeholder marks where the child content is injected:</p>
<pre><code class="language-html">&lt;!-- _layout.htx (root) --&gt;
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;&lt;title&gt;My App&lt;/title&gt;&lt;/head&gt;
&lt;body&gt;
  &lt;nav&gt;
    &lt;a href="/"&gt;Home&lt;/a&gt;
    &lt;a href="/blog"&gt;Blog&lt;/a&gt;
  &lt;/nav&gt;
  &lt;main&gt;&#95;&#95;content&#95;&#95;&lt;/main&gt;
  &lt;footer&gt;&amp;copy; 2025&lt;/footer&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
<p>Every page rendered under this directory is automatically injected into <code>&#95;&#95;content&#95;&#95;</code>.</p>

<h3>Nested Layouts</h3>
<p>Subdirectories can define their own layouts that nest inside parent layouts:</p>
<pre><code class="language-html">&lt;!-- docs/_layout.htx --&gt;
&lt;div class="docs-grid"&gt;
  &lt;aside&gt;&lt;nav&gt;...&lt;/nav&gt;&lt;/aside&gt;
  &lt;div class="docs-content"&gt;&#95;&#95;content&#95;&#95;&lt;/div&gt;
&lt;/div&gt;</code></pre>
<p>A page at <code>/docs/routing</code> renders like this:</p>
<ol>
  <li>Page content → injected into <code>docs/_layout.htx</code> at <code>&#95;&#95;content&#95;&#95;</code></li>
  <li>Docs layout (with page inside) → injected into <code>_layout.htx</code> at <code>&#95;&#95;content&#95;&#95;</code></li>
  <li>Root layout sends the fully composed HTML to the browser</li>
</ol>

<h2>Includes</h2>
<p>Use <code>&lt;htx:include&gt;</code> to pull in reusable template fragments:</p>
<pre><code class="language-html">&lt;htx:include src="/partials/_nav.htx" /&gt;</code></pre>
<p>The path is relative to the templates directory root. Includes are resolved in Phase 1 of the pipeline, before any other processing.</p>

<h3>Key Behaviors</h3>
<ul>
  <li><strong>No scope inheritance</strong> &mdash; included templates do not receive <code>&lt;htx:let&gt;</code> bindings from the parent</li>
  <li><strong>Circular detection</strong> &mdash; the runtime detects and rejects circular includes with a fatal error</li>
  <li><strong>Nesting</strong> &mdash; included files can themselves include other files</li>
  <li><strong>Naming convention</strong> &mdash; prefix partials with <code>_</code> to prevent them from being directly routable</li>
</ul>

<h2>Components</h2>
<p>Components are reusable template blocks with props and slots. They live in a <code>components/</code> directory and are referenced as custom HTML elements.</p>

<h3>Defining a Component</h3>
<pre><code class="language-html">&lt;!-- templates/components/card.htx --&gt;
&lt;htx:props&gt;
  title: Untitled
  variant: default
&lt;/htx:props&gt;

&lt;div class="card card--&#123;&#123; variant &#125;&#125;"&gt;
  &lt;h3&gt;&#123;&#123; title &#125;&#125;&lt;/h3&gt;
  &lt;div class="card-body"&gt;
    &lt;htx:slot /&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>

<h3>Using a Component</h3>
<pre><code class="language-html">&lt;card title="Hello World" variant="featured"&gt;
  &lt;p&gt;This content fills the slot.&lt;/p&gt;
&lt;/card&gt;</code></pre>
<p>The runtime expands this into the component template, injecting prop values and slot content.</p>

<h3>Named Slots</h3>
<p><code>&lt;htx:slot /&gt;</code> marks where child content is injected. Named slots allow multiple injection points:</p>
<pre><code class="language-html">&lt;!-- Component definition --&gt;
&lt;div class="modal"&gt;
  &lt;div class="modal-header"&gt;&lt;htx:slot name="header" /&gt;&lt;/div&gt;
  &lt;div class="modal-body"&gt;&lt;htx:slot /&gt;&lt;/div&gt;
&lt;/div&gt;

&lt;!-- Usage --&gt;
&lt;modal&gt;
  &lt;htx:fill name="header"&gt;&lt;h2&gt;Confirm&lt;/h2&gt;&lt;/htx:fill&gt;
  &lt;p&gt;Are you sure?&lt;/p&gt;
&lt;/modal&gt;</code></pre>
<p>Content not wrapped in <code>&lt;htx:fill&gt;</code> goes into the default (unnamed) slot.</p>
`,
    created_at: "2026-03-29 00:00:05",
    updated_at: "2026-03-29 00:00:05",
  },
  {
    title: "Forms And Mutations",
    slug: "forms-and-mutations",
    summary: "How the prepare/execute mutation lifecycle works, how CSRF protection is built in, and how to build create, update, and delete forms.",
    section: "building-pages",
    section_label: "Building Pages",
    order: 6,
    status: "published",
    body: "Mutations use a prepare/execute flow with signed payloads and replay protection.",
    body_html: `
<h2>The Mutation Model</h2>
<p>HTX mutations follow a <strong>prepare → submit → execute</strong> lifecycle:</p>
<ol>
  <li><strong>GET request</strong> &mdash; the runtime renders the form template, generating a signed payload token</li>
  <li><strong>User fills out the form</strong> and submits it</li>
  <li><strong>POST request</strong> &mdash; the runtime validates the signed token, checks for replay attacks, then executes the mutation through the adapter</li>
</ol>
<p>This design means every mutation is protected by default. There's no way to submit a form without a valid token.</p>

<h2>Mutation Directives</h2>
<table>
  <thead><tr><th>Directive</th><th>Purpose</th><th>Values</th></tr></thead>
  <tbody>
    <tr><td><code>&lt;htx:action&gt;</code></td><td>Mutation type</td><td><code>save</code> (create), <code>update</code>, <code>delete</code></td></tr>
    <tr><td><code>&lt;htx:recordId&gt;</code></td><td>Target record</td><td>Expression like <code>&#123;&#123; route.id &#125;&#125;</code></td></tr>
    <tr><td><code>&lt;htx:response&gt;</code></td><td>Post-mutation behavior</td><td>Redirect path</td></tr>
  </tbody>
</table>

<h2>Create Form</h2>
<pre><code class="language-html">&lt;htx:type&gt;post&lt;/htx:type&gt;
&lt;htx:action&gt;save&lt;/htx:action&gt;
&lt;htx:response name="redirect"&gt;/admin/posts&lt;/htx:response&gt;

&lt;htx&gt;
&lt;form method="post"&gt;
  &lt;input type="hidden" name="htx-payload" value="&#95;&#95;payload&#95;&#95;" /&gt;

  &lt;label for="title"&gt;Title&lt;/label&gt;
  &lt;input type="text" id="title" name="title" required /&gt;

  &lt;label for="body"&gt;Body&lt;/label&gt;
  &lt;textarea id="body" name="body" rows="10"&gt;&lt;/textarea&gt;

  &lt;button type="submit"&gt;Create Post&lt;/button&gt;
&lt;/form&gt;
&lt;/htx&gt;</code></pre>
<p>Key elements:</p>
<ul>
  <li><code>&lt;htx:action&gt;save&lt;/htx:action&gt;</code> &mdash; tells the runtime this is a create operation</li>
  <li><code>&lt;htx:response&gt;</code> &mdash; where to redirect after success</li>
  <li><code>&#95;&#95;payload&#95;&#95;</code> &mdash; the signed token generated by the runtime on GET. This hidden field is <strong>required</strong>.</li>
</ul>

<h2>Update Form</h2>
<pre><code class="language-html">&lt;htx:type&gt;post&lt;/htx:type&gt;
&lt;htx:action&gt;update&lt;/htx:action&gt;
&lt;htx:recordId&gt;&#123;&#123; route.id &#125;&#125;&lt;/htx:recordId&gt;
&lt;htx:response name="redirect"&gt;/admin/posts&lt;/htx:response&gt;

&lt;htx&gt;
&lt;form method="post"&gt;
  &lt;input type="hidden" name="htx-payload" value="&#95;&#95;payload&#95;&#95;" /&gt;

  &lt;label for="title"&gt;Title&lt;/label&gt;
  &lt;input type="text" id="title" name="title" value="&#95;&#95;title&#95;&#95;" required /&gt;

  &lt;label for="body"&gt;Body&lt;/label&gt;
  &lt;textarea id="body" name="body" rows="10"&gt;&#95;&#95;body&#95;&#95;&lt;/textarea&gt;

  &lt;button type="submit"&gt;Update Post&lt;/button&gt;
&lt;/form&gt;
&lt;/htx&gt;</code></pre>

<h2>Delete Confirmation</h2>
<pre><code class="language-html">&lt;htx:type&gt;post&lt;/htx:type&gt;
&lt;htx:action&gt;delete&lt;/htx:action&gt;
&lt;htx:recordId&gt;&#123;&#123; route.id &#125;&#125;&lt;/htx:recordId&gt;
&lt;htx:response name="redirect"&gt;/admin/posts&lt;/htx:response&gt;

&lt;htx&gt;
&lt;div class="confirm-delete"&gt;
  &lt;p&gt;Delete &lt;strong&gt;&#95;&#95;title&#95;&#95;&lt;/strong&gt;?&lt;/p&gt;
  &lt;form method="post"&gt;
    &lt;input type="hidden" name="htx-payload" value="&#95;&#95;payload&#95;&#95;" /&gt;
    &lt;button type="submit"&gt;Delete&lt;/button&gt;
    &lt;a href="/admin/posts"&gt;Cancel&lt;/a&gt;
  &lt;/form&gt;
&lt;/div&gt;
&lt;/htx&gt;</code></pre>

<h2>Security: How It Works</h2>

<h3>Signed Payloads</h3>
<p>When the runtime renders a mutation form (GET request), it:</p>
<ol>
  <li>Serializes the mutation metadata (action, type, record ID) into a JSON payload</li>
  <li>Signs the payload with HMAC-SHA256 using the app's secret key</li>
  <li>Injects the signed token as <code>&#95;&#95;payload&#95;&#95;</code></li>
</ol>
<p>When the form is submitted (POST request), the runtime validates the signature and rejects forged payloads.</p>

<h3>Replay Protection</h3>
<p>Each signed payload includes a unique nonce. After use, the nonce is stored in the replay guard. Submitting the same payload twice is rejected &mdash; preventing double-submission and duplicate records.</p>

<h3>No Separate CSRF Tokens</h3>
<p>Traditional web apps need separate CSRF tokens. HTX's signed payload system handles both authentication (is this a valid mutation?) and replay protection (has this already been used?) in a single mechanism.</p>
`,
    created_at: "2026-03-29 00:00:06",
    updated_at: "2026-03-29 00:00:06",
  },

  // ═══════════════════════════════════════════════════
  //  OPERATIONS
  // ═══════════════════════════════════════════════════
  {
    title: "CLI And Local Development",
    slug: "cli-and-local-development",
    summary: "How to scaffold a new project, start the dev server, and iterate on templates with instant reload.",
    section: "operations",
    section_label: "Operations",
    order: 7,
    status: "published",
    body: "The workspace CLI can scaffold a project and serve it through the real runtime path.",
    body_html: `
<h2>Scaffolding a New Project</h2>
<p>The fastest way to start:</p>
<pre><code class="language-bash">npx create-hypermedia-app my-app
cd my-app
bun run dev</code></pre>
<p>This creates a working project with a root layout, an index page, a database, and a configuration file.</p>

<h3>Generator Options</h3>
<table>
  <thead><tr><th>Flag</th><th>Effect</th></tr></thead>
  <tbody>
    <tr><td><code>--docs</code></td><td>Include documentation templates and sample content</td></tr>
    <tr><td><code>--local</code></td><td>Link to local package sources (for development)</td></tr>
  </tbody>
</table>

<h2>Configuration</h2>
<p>The <code>htx.config.json</code> file configures the runtime:</p>
<pre><code class="language-json">{
  "appName": "my-app",
  "adapters": {
    "default": {
      "driver": "sqlite",
      "databasePath": "data/app.db"
    }
  }
}</code></pre>

<h3>Markdown Adapter Config</h3>
<pre><code class="language-json">{
  "adapters": {
    "default": {
      "driver": "markdown",
      "contentRoot": "content"
    }
  }
}</code></pre>
<p>Markdown files live in subdirectories under <code>content/</code>, organized by content type:</p>
<pre><code>content/
├── post/
│   ├── hello-world.md
│   └── second-post.md
└── documentation/
    └── getting-started.md</code></pre>
<p>Each file has YAML front matter:</p>
<pre><code class="language-markdown">---
title: Hello World
status: published
summary: My first blog post
---

# Hello World

This is the body content in Markdown.</code></pre>

<h2>Development Server</h2>
<pre><code class="language-bash">bun run dev</code></pre>
<p>The server listens on <code>http://127.0.0.1:3000</code> by default, renders templates on every request (no caching), and shows detailed error pages when something goes wrong.</p>

<h3>Environment Variables</h3>
<table>
  <thead><tr><th>Variable</th><th>Default</th><th>Purpose</th></tr></thead>
  <tbody>
    <tr><td><code>HTX_HOST</code></td><td><code>127.0.0.1</code></td><td>Server hostname</td></tr>
    <tr><td><code>HTX_PORT</code></td><td><code>3000</code></td><td>Server port</td></tr>
    <tr><td><code>HTX_ADMIN_USERNAME</code></td><td><code>admin</code></td><td>Admin login username</td></tr>
    <tr><td><code>HTX_ADMIN_PASSWORD</code></td><td><code>admin</code></td><td>Admin login password</td></tr>
  </tbody>
</table>

<h2>Development Workflow</h2>
<ol>
  <li><strong>Edit a template</strong> &mdash; change an <code>.htx</code> file in your editor</li>
  <li><strong>Refresh the browser</strong> &mdash; the server re-renders from source on every request</li>
  <li><strong>Check the error page</strong> &mdash; if something's wrong, the dev error page shows exactly what happened</li>
</ol>
<p>There's no build step, no compilation, no hot module replacement. You edit HTML, refresh, and see the result.</p>

<h2>Static Assets</h2>
<p>Place CSS, images, and other static files in the <code>public/</code> directory:</p>
<pre><code>public/
├── css/style.css        → /css/style.css
├── images/logo.png      → /images/logo.png
└── favicon.ico          → /favicon.ico</code></pre>
`,
    created_at: "2026-03-29 00:00:07",
    updated_at: "2026-03-29 00:00:07",
  },
  {
    title: "Using The Admin",
    slug: "using-the-admin",
    summary: "How to log in, create and edit content, manage publication state, and understand how the admin uses the same HTX primitives as the public site.",
    section: "operations",
    section_label: "Operations",
    order: 8,
    status: "published",
    body: "The admin section proves the runtime can handle real token-backed content management flows.",
    body_html: `
<h2>Accessing the Admin</h2>
<p>Navigate to <code>/admin</code> in your browser. If you're not logged in, you'll be redirected to <code>/admin/login</code>.</p>
<p>Default credentials:</p>
<ul>
  <li><strong>Username:</strong> <code>admin</code></li>
  <li><strong>Password:</strong> <code>admin</code></li>
</ul>
<p>These can be changed via <code>HTX_ADMIN_USERNAME</code> and <code>HTX_ADMIN_PASSWORD</code> environment variables.</p>

<h2>The Dashboard</h2>
<p>After login, the dashboard shows content counts for posts and documentation, plus quick links to common actions.</p>

<h2>Managing Content</h2>

<h3>Creating Content</h3>
<p>Click <strong>Create Post</strong> or <strong>Create Doc</strong> to open a form. Fill in the fields:</p>
<table>
  <thead><tr><th>Field</th><th>Required</th><th>Description</th></tr></thead>
  <tbody>
    <tr><td>Title</td><td>Yes</td><td>The headline</td></tr>
    <tr><td>Slug</td><td>No</td><td>Auto-generated from title if blank</td></tr>
    <tr><td>Summary</td><td>No</td><td>Brief description for listings</td></tr>
    <tr><td>Status</td><td>No</td><td><code>draft</code> or <code>published</code></td></tr>
    <tr><td>Body</td><td>No</td><td>Full content (Markdown supported)</td></tr>
  </tbody>
</table>
<p>Documentation has additional fields: <strong>Section ID</strong>, <strong>Section Label</strong>, and <strong>Order</strong> for organizing articles into groups.</p>

<h3>Editing Content</h3>
<p>Click <strong>Edit</strong> on any row. The form is pre-filled with current values. Change any field and submit to update.</p>

<h3>Deleting Content</h3>
<p>Click <strong>Delete</strong> to see a confirmation page. Confirm to permanently remove the record.</p>

<h2>How the Admin Works Internally</h2>
<p>The admin is not a separate application. It uses the exact same HTX primitives as the public site:</p>
<ul>
  <li><strong>Templates</strong> &mdash; admin pages are regular <code>.htx</code> files in <code>templates/admin/</code></li>
  <li><strong>Mutations</strong> &mdash; admin forms use the same signed-payload system as any other form</li>
  <li><strong>Layouts</strong> &mdash; the admin has its own <code>_layout.htx</code> with sidebar navigation</li>
  <li><strong>Authentication</strong> &mdash; handled by middleware outside the template system (JWT sessions in cookies)</li>
</ul>

<h3>Session Management</h3>
<p>Admin sessions use signed JWT tokens stored in an HTTP-only cookie (<code>htx_admin_session</code>). Sessions expire after 12 hours. The session secret should be changed in production via <code>HTX_ADMIN_SESSION_SECRET</code>.</p>

<h2>Adding New Content Types</h2>
<p>To add a new content type to the admin:</p>
<ol>
  <li>Create templates in <code>templates/admin/your-type/</code> following the posts pattern</li>
  <li>Add navigation links in the admin layout's sidebar</li>
  <li>The SQLite adapter auto-creates the table on first write &mdash; no migration needed</li>
</ol>
<p>The admin is just templates. Extending it means writing more <code>.htx</code> files.</p>
`,
    created_at: "2026-03-29 00:00:08",
    updated_at: "2026-03-29 00:00:08",
  },
];
