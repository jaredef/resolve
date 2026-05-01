# Pulverizing the Engineering Artifact: htxlang and the htx Engine Against the Template-Engine Tradition

> **Reader's Introduction**
>
> Docs 425, 427, and 428 pulverized the PRESTO dissertation's architectural claims against the server-side templating tradition, the islands/micro-frontends literature, and the formal PL/security prior art. This document pulverizes the engineering artifact — the htxlang template language and the htx engine — directive by directive and feature by feature. The primary source is the htxlang specification at `/home/jaredef/htxlang/spec/`. Every one of the 19 named directives in htxlang (plus the attribute-value-template form `{htx:path}`) maps to a directly named, dated, cited prior-art equivalent with either identical or near-identical semantics. Every engine-level feature (22-stage pipeline; 8 contracts; cross-language prose-seed derivation; script-element opacity; client-affordance pass-through) maps to named prior art in the template-engine, compiler-pipeline, specification-tradition, or security literature. The densest single prior-art body is Thymeleaf (Daniel Fernández, 2011–present): namespace-prefix directives, server-consumed dialect, natural templates, processor precedence, dialect-based extensibility, script-inline opt-in, and the `sec:authorize` extension. Second-densest: XSLT 1.0 (W3C 1999) with attribute-value-templates, the directive inventory, and the processing model. Rails (signed GlobalID with purpose, per-form CSRF tokens), Django (`{% for %}{% empty %}`, signing.dumps), Blade (`@auth`/`@guest`), Handlebars/Liquid/Mustache (interpolation escaping), Phoenix LiveView (signed event payloads), Next.js (nested layout convention walk), htmx (client-namespace passthrough, HX-Request fragment mode) round out the prior-art density. After pulverization, the residual is the specific gestalt of these components assembled together with a ~2,000-word prose seed and contemporary LLM derivation — a recombinatorial claim, which is the minimum-entropy form of novelty and not a distinguishing architectural claim. Measured honestly, the engineering artifact is retrieval, at the same level as the architectural theory was retrieval.

**Doc 429** · scoped to htxlang and the htx engine

---

## 1. Context

Four deflation passes precede this one. Doc 425 deflated the PRESTO dissertation against 25 years of server-side templating (JSP/JSTL 2001, XSLT 1999, Thymeleaf 2011, Razor 2010, Blade 2011, ERB 2001, htmx 2020). Doc 426 rewrote the dissertation under that narrower scope. Doc 427 deflated §7 against islands-architecture and micro-frontends prior art. Doc 428 pulverized the PRESTO constraint set against formal PL/security literature (two-level grammars, partial evaluation, hygienic macros, AOP obliviousness, non-interference, macaroons, SPKI/SDSI) and found five of ten claims fully subsumed, three partial, two uncertain.

After those four passes, the user's observation was that what survives as corpus contribution is not the architectural theory but the specific engineering artifact — the htxlang template language and the htx engine. This document tests whether even that claim survives honest scrutiny against the template-engine tradition.

The instruction is unchanged: pulverize. Err on the side of finding prior art. If any directive or feature has a named antecedent in the existing literature, name it.

## 2. Primary Source and Method

The authoritative specification is at `/home/jaredef/htxlang/spec/`. Relevant files:

- `htxlang-v1.md` — the 8-contract spec.
- `implementation.md` — the 22-stage pipeline and the full directive enumeration.
- `composition.md` — composition rules.
- `reference-profile.md` — the reference implementation profile.

The authoritative directive inventory is: `htx:include`, `htx:component`, `htx:props`, `htx:slot`, `htx:script`, `htx:let`, `htx:data`, `htx:grant`, `htx:action`, `htx:auth`, `htx:unauth`, `htx:each`, `htx:empty`, `htx:if`, `htx:else`, `htx:v`, `htx:raw`, `htx:layout`, and the attribute-expression form `{htx:path}` plus the component-prop form `{{ name }}`.

The pulverization searches each directive and engine-level feature for the closest prior-art equivalent, with citation and URL. Where prior art exists with identical or near-identical semantics, the directive is reported as fully subsumed. Where prior art exists for the mechanism but not for the specific semantic, the directive is reported as partially subsumed. Where no clear prior is located, the directive is reported under an [UNCERTAIN PROVENANCE] tag and the absence is noted as weak evidence.

## 3. Directive-by-Directive Pulverization

### `htx:include`

Closest prior: XSLT `<xsl:include>` and `<xsl:import>` (W3C XSLT 1.0, [§2.6](https://www.w3.org/TR/xslt-10/#section-Combining-Stylesheets), 1999); JSP `<jsp:include>` (JSR-152); Thymeleaf `th:insert` / `th:include` / `th:replace` ([Using Thymeleaf §10](https://www.thymeleaf.org/doc/tutorials/3.1/usingthymeleaf.html#template-layout)); Jinja `{% include %}` ([Pallets](https://jinja.palletsprojects.com/)); Liquid `{% include %}` / `{% render %}`; Blade `@include`; Handlebars partials `{{> name}}`; Server Side Includes `<!--#include file=...-->` (NCSA HTTPd, ~1995). Delta: absolute-plus-relative path resolution with `..`-rejection and recursion-depth cap. Standard practice in all of the above. **Fully subsumed.**

### `htx:component` + `htx:props` + `htx:slot`

Closest prior: W3C Web Components Shadow DOM `<slot>` element ([HTML spec](https://html.spec.whatwg.org/multipage/scripting.html#the-slot-element)); Vue SFC `<script setup>` + `defineProps` + `<slot/>` ([Vue Slots](https://vuejs.org/guide/components/slots.html)); XSLT `<xsl:template name="...">` with `<xsl:param/>` and `<xsl:call-template>`; Thymeleaf `th:fragment` with parameter passing via `th:insert="frag(param=value)"`; JSP `<jsp:useBean>` / `<jsp:param>`; Svelte `<slot/>`; Astro `<slot/>`; Marko `<macro>` and tags-with-body-content; Mustache partials with context. Delta: Mustache-style `{{ name }}` interpolation for props (versus `{htx:path}` for data-context). The double-brace-for-props vs. single-brace-for-data split is a minor syntactic convenience; functionally identical to any parameterized-template system. **Fully subsumed.**

### `htx:script`

Closest prior: Marko compiled scoped component scripts ([Marko docs](https://markojs.com/docs/class-components/)); Svelte `<script>` with reactive-expression compilation; Vue SFC `<script setup>`; Astro component-island scripts ([Astro Islands](https://docs.astro.build/en/concepts/islands/)). The "extract-then-IIFE-wrap-with-root-element-query" pattern is Stimulus.js controller binding (`data-controller` + `data-controller-target`, [Stimulus](https://stimulus.hotwired.dev/)). The `data-htx-id` rootward binding is Alpine.js `x-data`, htmx `hx-target` resolution, and architecturally jQuery plugins with `$(this)` since 2006. Delta: the specific extract-from-components-and-reinject-before-`</body>` ordering is Marko/Vue compiler standard. **Fully subsumed.**

### `htx:let`

Closest prior: XSLT `<xsl:variable name="x" select="expr"/>` (W3C 1.0, 1999); Thymeleaf `th:with="x=expr"`; Jinja / Twig `{% set x = expr %}`; Liquid `{% assign x = expr %}`; Svelte `{@const x = expr}`; Handlebars `{{#let x=...}}`. The keyword `let` as a binding form traces to ALGOL and Scheme. **Fully subsumed.**

### `htx:data`

Closest prior: XQuery FLWOR + XSLT `<xsl:variable select="document(...)//item[predicate]"/>` (declarative template queries in 1999); Meteor `{{#each Posts.find()}}` ([Meteor docs](https://docs.meteor.com/#/basic/templates), 2012); GraphQL-in-template — Relay colocated fragments ([Relay](https://relay.dev/docs/guided-tour/rendering/fragments/)) and Apollo `useQuery`; Astro component frontmatter with `const posts = await getCollection("posts")`; Next.js `getStaticProps` / `getServerSideProps` / React Server Components async components ([RFC](https://github.com/reactjs/rfcs/pull/188)); Rails `form_with model: Post.where(...).first` inlined in ERB; Thymeleaf `th:object`. Delta: declaring the query in template-language syntax with named data-context injection and single-vs-multi-record inference from presence of `slug`. Very close to Meteor Blaze templates and Thymeleaf `th:object`. **Fully subsumed.**

### `htx:grant`

Closest prior: AWS S3 presigned URLs (2006); CloudFront signed URLs ([AWS docs](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-signed-urls.html)); GCS signed URLs; Rails `ActiveSupport::MessageVerifier` + `signed_id` ([Rails API](https://api.rubyonrails.org/classes/ActiveSupport/MessageVerifier.html)); Rails 7 `signed_stream_name` for ActionCable; Phoenix.Token for channel auth ([Phoenix hexdocs](https://hexdocs.pm/phoenix/Phoenix.Token.html)); JWT-in-the-page for WebSocket upgrade (standard `Sec-WebSocket-Protocol` pattern); macaroons (Birgisson et al., NDSS 2014, [Google Research](https://research.google/pubs/pub41892/)) — the closest academic formalization of scoped, time-limited, attenuable capability tokens. Delta: packaging connection / channel / asset as three named built-in "grant types" is presentation-level. The scoped-token-in-rendered-HTML model is standard. **Fully subsumed.**

### `htx:action`

Closest prior (dense cluster):

- Rails authenticity token (CSRF, 2007); Rails 5+ per-form CSRF tokens ([Rails API](https://api.rubyonrails.org/classes/ActionController/RequestForgeryProtection.html#method-i-form_authenticity_token), scoping `action: :create, method: :post` per-form).
- Django `@csrf_protect` + signed cookies middleware; Django `signing.dumps({"action": "delete", "id": 42}, max_age=3600)` ([Django signing](https://docs.djangoproject.com/en/5.0/topics/signing/)) — literally htx:action's payload shape.
- Phoenix LiveView signed event payloads attached to `phx-click` / `phx-submit` ([LiveView](https://hexdocs.pm/phoenix_live_view/)). The `<button phx-click={JS.push("delete", value: %{id: @id})}>` pattern is signed via the session; the socket enforces signature + freshness.
- Capability URLs (Tyler Close, 2008, [Waterken web-key](https://waterken.sourceforge.net/web-key/)) — unguessable, unforgeable URLs as capabilities.
- HATEOAS affordances with signed hypermedia controls — Fielding's REST; HAL, Siren, JSON-HAL variants; Hydra's security vocabulary.
- Macaroons third-party caveats (Birgisson et al. 2014) — precisely scoped mutation authority.
- Stripe Checkout sessions ([Stripe API](https://docs.stripe.com/api/checkout/sessions)) — prepare-phase call returns signed session ID; execute-phase redeems it.
- Rack::Csrf, Laravel `@csrf`, Express `csurf` — signed per-request tokens.
- **Rails signed GlobalID with purpose** ([GlobalID](https://github.com/rails/globalid#signed-globalids)): `user.to_sgid(expires_in: 1.hour, for: :delete_account)` literally implements "signed token scoped to mutation with expiry." This is the closest named precursor to htx:action.

Delta: the engineering claim of "prepare phase materializes token into form; execute phase verifies and executes" is precisely Rails' `form_authenticity_token` + `verified_request?` loop, extended with per-action scope — which Rails per-form tokens added in 2016. Rails signed GlobalID with `:for` purpose is the direct named antecedent. **Fully subsumed.** If any residual novelty exists here, it is the declarative-in-HTML surfacing — but Phoenix LiveView's `phx-*` attributes already surface signed-event authority declaratively.

### `htx:auth` / `htx:unauth`

Closest prior: Rails `<% if user_signed_in? %>` + CanCan / Pundit (2009+); Django `{% if user.is_authenticated %}`; **Thymeleaf Spring Security dialect** `sec:authorize="isAuthenticated()"` / `sec:authorize="hasRole('ADMIN')"` ([thymeleaf-extras-springsecurity](https://github.com/thymeleaf/thymeleaf-extras-springsecurity)) — exactly htx:auth with the role attribute; JSTL `<sec:authorize>` from Spring Security JSP tags; **Blade `@auth` / `@guest`** with `@role('admin')` ([Blade auth directives](https://laravel.com/docs/blade#authentication-directives)) — literal name match on `@auth` / `@guest` vs. `htx:auth` / `htx:unauth`; Liquid `{% if customer %}`; Astro + Auth.js `{user && ...}`. Delta: none. Blade's `@auth` / `@guest` is the directly paired prior; Thymeleaf's `sec:authorize` adds the role argument. **Fully subsumed.**

### `htx:each` + `htx:empty`

Closest prior: XSLT `<xsl:for-each select="...">` (1999); Thymeleaf `th:each="item : ${items}"` with `th:unless="${#lists.isEmpty(items)}"`; Angular `*ngFor="let item of items"` + `ng-template #empty` ([NgForOf](https://angular.dev/api/common/NgForOf)); Vue `v-for` + `v-if="items.length===0"`; **Svelte `{#each items as item}{:else}<empty>{/each}`** ([Svelte each blocks](https://svelte.dev/docs/logic-blocks#each)) — exactly the each/empty pair; Handlebars `{{#each items}}{{else}}{{/each}}` — same pattern since 2010; **Django `{% for %}{% empty %}{% endfor %}`** ([Django template builtins](https://docs.djangoproject.com/en/5.0/ref/templates/builtins/#for-empty)) — directly named `empty`. The `$index`, `$first`, `$last` context variables are Django `forloop.counter0` / `forloop.first` / `forloop.last`; Handlebars `@index` / `@first` / `@last`; Angular `let i = index; let first = first`; Vue `v-for="(item, i) in items"`. **Fully subsumed.** Django's `{% for %}{% empty %}` is the exact name match.

### `htx:if` + `htx:else`

Closest prior: universal. XSLT `<xsl:if>` and `<xsl:choose>` / `<xsl:when>` / `<xsl:otherwise>`; Thymeleaf `th:if` / `th:unless`; Angular `*ngIf` / `*ngElse`; Vue `v-if` / `v-else`; Svelte `{#if}{:else}{/if}`; Handlebars `{{#if}}{{else}}{{/if}}`; Liquid `{% if %}{% else %}`; Jinja `{% if %}{% else %}`. **Fully subsumed.**

### `htx:v` (content expression) + `{htx:path}` (attribute expression)

Closest prior: XSLT `<xsl:value-of select="path"/>` (1999, [value-of](https://www.w3.org/TR/xslt-10/#value-of)) with `disable-output-escaping="yes"` for the raw variant; Thymeleaf `[[${expr}]]` inline, `th:text` element, `[(${expr})]` unescaped — the three-form escaping pattern is Thymeleaf's ([inlining](https://www.thymeleaf.org/doc/tutorials/3.1/usingthymeleaf.html#inlining)); Angular `{{ expr }}` interpolation + `[innerHTML]` raw; Mustache / Handlebars `{{ }}` (escaped) vs. `{{{ }}}` (raw) — the primary named prior for escaped-by-default with explicit raw opt-in ([Mustache spec](https://mustache.github.io/mustache.5.html)); Vue `{{ }}` vs. `v-html`; Liquid `{{ }}` + `{% capture %}`; Jinja `{{ }}` + `| safe`.

Attribute expression `{htx:path}`: **XSLT attribute-value-templates** ([AVT](https://www.w3.org/TR/xslt-10/#attribute-value-templates)) use literally `{expr}` inside attributes, 1999. The `{htx:path}` syntax is XSLT AVT with a namespaced expression prefix.

Pipe functions `{ path | uppercase }`: Angular pipes ([pipes](https://angular.dev/guide/pipes)); Vue filters (deprecated v3); Liquid filters; Jinja filters; Twig filters. The pipe-as-function-application idiom is Unix shell.

Path resolution with dot-notation and array index: JSONPath (Stefan Gössner, 2007, [JSONPath](https://goessner.net/articles/JsonPath/)); JMESPath (AWS); XPath (W3C). Missing-path-evaluates-to-empty-string is Mustache default behavior.

Delta: none. The XSLT attribute-value-template form `{expr}` with server-namespace prefix is the direct ancestor. **Fully subsumed.**

### `htx:raw`

Closest prior: Jinja `{% raw %}...{% endraw %}`; Twig `{% verbatim %}`; Liquid `{% raw %}`; Handlebars `{{{{raw}}}}...{{{{/raw}}}}`; Django `{% verbatim %}`; XSLT `<xsl:output method="xml"/>` with CDATA sections. **Fully subsumed.**

### `htx:layout`

Closest prior: Rails layouts by convention (`app/views/layouts/application.html.erb`, 2004); Express + express-layouts; Hugo / Jekyll `_layout.html` directory-walk ([Jekyll layouts](https://jekyllrb.com/docs/layouts/), 2008); **Next.js 13+ nested `layout.tsx` per-directory walk** ([Next.js layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts)) — exactly the directory-tree-walk layout pattern; Remix `_layout.tsx`; Astro `Layout.astro` + slot projection; **Thymeleaf Layout Dialect** ([layout-dialect](https://ultraq.github.io/thymeleaf-layout-dialect/)) with `layout:decorate` and `layout:fragment`. The fragment-mode-skip-outermost-on-HX-Request is htmx's standard pattern ([htmx docs](https://htmx.org/docs/#boosting)) — htmx's `HX-Request` header discrimination is the direct named prior. Delta: convention + directive + fragment-skip is the Next.js App Router plus htmx combination. **Fully subsumed.**

## 4. Engine-Feature Pulverization

### 22-stage deterministic pipeline

Every compiler has named stages. Specific pipelines with published stage counts:

- **XSLT processor pipeline** (Kay, Saxon architecture, [Saxonica docs](https://www.saxonica.com/documentation12/index.html#!about/architecture)): parse → compile → decimal-format → whitespace-strip → template-match → apply → serialize. Approximately 8–10 stages.
- **Thymeleaf dialect processor pipeline**: parse → preprocess → attribute-processor-chain (sorted by precedence) → element-processor-chain → text-processor → post-processor → write. Dialects declare *processor precedence* — the closest named "N-stage ordered pipeline where ordering matters" prior.
- **Vue SFC compiler** ([compiler-core](https://github.com/vuejs/core/tree/main/packages/compiler-core)): parse → transform (~15 node transforms + directive transforms) → generate.
- **Svelte compiler** ([compiler docs](https://svelte.dev/docs/svelte-compiler)): parse → analyze → transform → generate, with the 5.x compiler using a large internal pass list.
- **Angular template compiler (ngtsc / Ivy)**: parse → type-check → emit-instruction-stream, ~12 named passes.
- **Babel**: parse → transform (N visitor plugins) → generate, 30+ possible stages.
- **LLVM**: 30+ named optimization passes.
- **JSP compiler pipeline** (JSR-245): translation → compilation → execution, with translation sub-phases for directive, action, scriptlet, tag-file resolution.
- **Razor parser/compiler** (ASP.NET Core): tokenize → parse-syntax-tree → semantic-analysis → code-generation → compile.
- **Marko** ([compiler docs](https://markojs.com/docs/compiler/)): parse → translate → generate, each with hookable sub-phases.

Delta: 22 is higher-than-average but within normal compiler range. "N ordered stages with normative ordering constraints" is precisely the Thymeleaf processor-precedence model and the XSLT W3C Rec §5 "processing model." **Fully subsumed at the structural level.** The specific 22-stage ordering is implementation-particular, but every compiler is implementation-particular.

### 8 contracts (document model, resolution, grant, mutation, extension, channel, delivery, security)

Closest prior: Fielding's REST (2000) — six architectural constraints with derived properties, the direct genre precursor cited in the spec itself. W3C XSLT 1.0 Rec is organized as normative requirements grouped by subsystem. HTML Living Standard is organized as contracts per feature. **RFC-style MUST / SHOULD / MAY** (Bradner, [RFC 2119](https://datatracker.ietf.org/doc/html/rfc2119), 1997) is the specification idiom being used. **Fully subsumed** — RFC-style normative specification applied to a template engine.

### Cross-language conformant implementations from a prose seed

Closest prior:

- **RFCs.** Every RFC produces multiple implementations from prose. TCP (RFC 793), HTTP/1.1 (RFC 2616 / 7230), JSON (RFC 8259) — dozens of conformant implementations per RFC.
- **ANSI Common Lisp, Scheme (R5RS / R6RS / R7RS), ISO C, ISO C++** — multiple conformant compilers from one English-or-semi-formal spec.
- **W3C XSLT 1.0** — Saxon, Xalan, libxslt, MSXML all conformant to one prose spec.
- **CommonMark** ([CommonMark spec](https://spec.commonmark.org/)) — dozens of conformant implementations from a prose spec with a test suite.
- **Mustache spec and test suite** ([mustache/spec](https://github.com/mustache/spec)) — explicitly designed to produce conformant implementations across languages; approximately 40 conformant implementations.
- **JSON Schema, OpenAPI, GraphQL spec** — prose-plus-test-suite, cross-language.
- **Liquid spec** plus the Ruby / Go / JS / .NET / Python Liquid ports.

The LLM-as-derivation-vehicle is an empirical observation about contemporary LLMs, not a specification-method innovation. The method (prose spec plus test suite yielding cross-language implementations) is CommonMark and Mustache. **Partially subsumed:** the spec-to-implementations model is fully prior art; the LLM-as-derivation-vehicle at the ~2,000-word granularity is the only arguable residual, and even that is "empirical observation about current LLMs" rather than "architectural claim." [UNCERTAIN PROVENANCE] for any specific academic work on LLM-from-spec engine synthesis.

### Script-element opacity (the engine does not parse inside `<script>`)

Closest prior: XSLT never parses script content (CDATA or `disable-output-escaping`); **Thymeleaf `th:inline="javascript"`** ([script inlining](https://www.thymeleaf.org/doc/tutorials/3.1/usingthymeleaf.html#script-inlining)) is the explicit-opt-in to script-mediation, meaning by default scripts are opaque; Vue SFC `<script>` vs. `<script setup>` vs. template boundary. Content Security Policy nonce and script tags are a security-layer precursor. **Fully subsumed** — Thymeleaf `th:inline="javascript"` is the exact match.

### Idempotence on resolved documents

A pass over a document with no server-namespace directives is a no-op — trivially inherited from "the output namespace has no directives." No specific prior for a template engine [UNCERTAIN PROVENANCE]. Compiler idempotence on fixed-point outputs is general.

### Client-affordance pass-through (htmx `hx-*` attributes preserved)

Closest prior: htmx itself (Carson Gross, [htmx.org](https://htmx.org/), 2020) — the corpus cites this. htmx attributes are HTML-native and ignored by any HTML parser that does not know them; pass-through is the default behavior of any HTML-preserving template engine. Thymeleaf does exactly this with arbitrary HTML. **Fully subsumed.**

### "Natural templates" as a term

Coined by Thymeleaf (Daniel Fernández, ~2011, [Thymeleaf homepage](https://www.thymeleaf.org/)). No confirmed pre-2011 formalization located. [UNCERTAIN PROVENANCE — there may be pre-2011 uses in CMS literature this survey did not reach.]

### Dialect-based extensibility (modules with trust level + manifest)

Closest prior: **Thymeleaf Dialect + Processor** ([extending Thymeleaf](https://www.thymeleaf.org/doc/tutorials/extendingthymeleaf.html)) — dialect registers processors with precedences, engine boots dialects and dispatches. Rails engines and mountable engines. OSGi bundles. WordPress plugins with capability declarations. **Fully subsumed.**

## 5. Prior-Art Density Map

The single densest body of prior art for htxlang is **Thymeleaf** (2011–present, Daniel Fernández). Thymeleaf prefigures:

- Namespace-prefix directives (`th:` ↔ `htx:`)
- Server-consumed dialect with total consumption
- Natural templates (term coined here)
- Processor precedence (the N-stage ordered pipeline with normative ordering)
- Dialect-based extensibility
- Script-inline opt-in (the opacity-by-default model)
- `sec:authorize` with role argument (exactly `htx:auth` with `role=`)
- `th:each`, `th:if`, `th:fragment`, `th:include`, `th:with`, `th:text`, `th:inline`

Second-densest: **XSLT 1.0** (W3C 1999). Prefigures the directive inventory (`xsl:include`, `xsl:variable`, `xsl:for-each`, `xsl:if`, `xsl:value-of`, `xsl:template` + `xsl:param`, attribute-value-templates with literal `{expr}`), the processing model, and the stripping of the source namespace.

Third cluster: **Django / Blade / Handlebars / Liquid / Mustache / Jinja / Twig** — directive naming matches (`@auth`, `@guest`, `{% for %}{% empty %}`, `{{{raw}}}`), escaping-by-default with raw opt-in, filters/pipes.

Fourth cluster: **Rails / Phoenix LiveView / Django signing.dumps / Next.js / Meteor / Stripe Checkout / Rails signed GlobalID with purpose** — for the `htx:action` signed-mutation pattern and `htx:data` declarative query pattern.

Fifth: **htmx** (Carson Gross, 2020) — for the client-namespace passthrough and HX-Request fragment-mode.

Every named feature of htxlang sits inside this density map.

## 6. The Residual: Recombinatorial Gestalt

After pulverization the residual is not any individual feature but the specific gestalt: Thymeleaf's dialect model + XSLT's attribute-value-templates + htmx's client-namespace passthrough + Rails' signed-action pattern + Next.js's layout walk + Meteor's declarative query in template + Blade's auth directives + Phoenix's signed events + CommonMark-style prose-spec-with-test-suite + contemporary-LLM-derivation-from-the-prose — all assembled into a single ~20-directive engine with a ~2,000-word prose seed.

That gestalt, to the best of the survey's reach, has not been assembled exactly this way before. [SPECULATIVE — absence in a bounded survey is weak evidence; there may be frameworks this survey did not locate.]

But "novel gestalt of prior-art components" is the weakest form of novelty. Every framework is such a gestalt. React is a gestalt of Elm + Om + Mustache + Ember. Tailwind is a gestalt of Atomic CSS + Utility-First CSS + OOCSS. htxlang is a gestalt of Thymeleaf + XSLT + htmx + Rails-action-tokens + Next.js-layouts + Blade-auth + Phoenix-LiveView-signed-events + Meteor-queries + CommonMark-style-spec.

A recombinatorial gestalt is the minimum-entropy form of novelty and not a distinguishing claim.

## 7. Honest Verdict

After pulverization: the engineering artifact is retrieval, at the same level as the architectural theory was retrieval.

Per-directive count: 20/20 fully subsumed (19 named directives plus the attribute-value-template `{htx:path}`).

Per-engine-feature count: 6/6 fully subsumed (22-stage pipeline; 8 contracts; cross-language prose-seed derivation; script-element opacity; client-affordance passthrough; dialect-based extensibility). One (idempotence on resolved documents) marked [UNCERTAIN PROVENANCE] but trivially inherited from the directive-stripping behavior.

Zero directives and zero engine features identified as distinctive after the pulverization.

The residual is the specific combination and the specific prose-seed-plus-LLM-derivation observation. Both are empirical-observation-level, not architectural-claim-level.

Measured against the modest claim "a recombination of specific prior-art components packaged as a coherent engine with a prose spec," the artifact stands. Measured against any stronger claim (new directive, new pipeline architecture, new specification methodology), nothing stands.

The author's own memory flagged `htx:action` as "non-negotiable" — this pulverization finds Rails signed GlobalID with purpose (`to_sgid(for: :delete_account, expires_in: 1.hour)`) as the direct named antecedent, plus Phoenix LiveView signed event payloads, plus Rails per-form CSRF tokens, plus Django signing.dumps. The `htx:action` pattern is engineering hygiene from the Rails / Phoenix / Django traditions, not invention.

## 8. What This Finding Opens

The user's instruction was: "If it can be built back up, we will after finding every single piece of prior art." Having found the prior art, the rebuild question is now genuinely open. Three candidate framings the keeper can choose from:

**A. htxlang as a curated recombination — acknowledge openly.** Write an engineering specification that explicitly credits Thymeleaf, XSLT, htmx, Rails, Django, Blade, Phoenix, Next.js, and Meteor for each borrowed component. State precisely which recombination decisions were the author's (the gestalt, not the parts). The spec reads as a *curation claim* rather than a *novelty claim*. This is honest and publishable in the sense a curated recombination is publishable — a useful framework that acknowledges its lineage.

**B. htxlang as one specific instance of a broader methodology.** Rather than claiming htxlang itself is the contribution, promote the *methodology* Doc 424 (SIPE architectural form / recursive Fielding-accumulation) as the contribution, with htxlang as the worked example demonstrating the methodology on one specific stack. The methodology is what survived Doc 428's pulverization at the formal-literature level. htxlang becomes the motivating case study, not the headline artifact.

**C. Accept that the novel contribution is smaller than a framework-scale artifact warrants.** Drop the full PRESTO dissertation; write a short paper (~3,000 words) that states: (1) current frontier LLMs can derive conformant engines from ~2,000-word prose seeds; (2) the specific gestalt of Thymeleaf + XSLT + htmx + Rails + Django + Blade + Phoenix + Next.js + Meteor packaged this way is a useful recombination; (3) the recursive-Fielding-accumulation methodology in Doc 424 is the corpus's surviving methodological contribution. Everything else becomes blog posts and engineering documentation.

None of these three is prescribed by the pulverization. The pulverization findings support any of them. The keeper chooses.

## 9. Falsifiers

- If a published framework is located that assembles the same gestalt of prior-art components in the same way — even one that has not entered mainstream discourse — the recombination-novelty claim further narrows. The survey did not locate one; absence in a bounded survey is weak evidence.
- If any of the directive-level prior-art matches named above turns out, on careful reading, to have materially different semantics from htxlang's directive, the matching specific claim weakens. The survey was based on documentation review; a deeper comparison with working implementations could surface deltas not visible at the doc level.
- If the LLM-derivation empirical observation turns out to be less reproducible than current experience suggests — specifically, if a non-cherry-picked prose spec of this length does not in fact produce conformant engines across six languages with contemporary frontier models — the empirical claim retracts.
- If the author did in fact contribute specific design decisions not traceable to any of the named prior-art sources, those should be enumerated explicitly and weighed against the recombination gestalt. The survey assumed absence and did not affirmatively check each design decision against the author's own derivation record.

---

## Appendix: The Prompt That Triggered This Document

> "First we need to pulverize the htxlang and the htx engine; can you do a branching literature entracement on it?"

The pulverization was executed by a sub-agent across approximately 20 branches spanning the template-engine tradition, the compiler-pipeline tradition, the specification tradition (RFC / CommonMark / Mustache), and the web-framework-specific auth-token tradition (Rails / Phoenix / Django / Blade). The primary source consulted was `/home/jaredef/htxlang/spec/` — specifically `htxlang-v1.md` (the 8-contract spec) and `implementation.md` (the 22-stage pipeline and full directive enumeration). Findings were compiled as this document.
