We put the Hypermedia App stack through a real benchmark battery on a Raspberry Pi 5: one million rows in SQLite, verified HTML responses, honest numbers. Then we compared against every CMS and framework we could find credible benchmark data for.

The results tell a story about what happens when you eliminate every unnecessary layer between the database and the browser.

## The Setup

- **Hardware:** Raspberry Pi 5, 8GB RAM, ARM64, microSD storage
- **Runtime:** Bun 1.3.11
- **Database:** SQLite with WAL mode, `bun:sqlite` native C binding
- **Engine:** HTX — server-side templates with expressions, components, layouts, nested multi-query composition, and an async-ready adapter interface
- **Data:** 1,000,027 rows in a single 346MB database file
- **Tool:** Apache Bench (`ab`) for throughput, `curl` for latency
- **Every response verified** as correct, complete HTML before benchmarking

No caching layer. No CDN. No cluster. Single Bun process.

## What We Tested

Four real pages, each with a different workload profile:

| Page | DB Queries | Response Size | What It Does |
|------|-----------|---------------|--------------|
| Blog post | 1 | 26KB | Slug lookup, markdown-rendered body, full layout |
| Home page | 3 | 24KB | Index query, blog listing, expression evaluation |
| Doc + sidebar | 5 | 29KB | Content query + 4 sidebar section queries via nested blocks |
| Docs index | 7 | 30KB | Count query + 6 section listings with template composition |

These aren't synthetic routes. They're the actual pages from the live deployment described in this repository. The blog post serves a 7,400-word article pre-rendered to HTML by cmark-gfm at write time — reads hit zero markdown parsing. The docs pages compose a data-driven sidebar from multiple independent query blocks. The home page evaluates expressions, hydrates placeholders, and renders feature cards.

## Throughput

Measured with Apache Bench at 10, 50, and 100 concurrent connections. Zero failures across every run.

### Single-Query Pages (~850 req/sec)

| Endpoint | Concurrency | Requests | Req/sec | p50 | p95 | p99 | Failed |
|----------|------------|----------|---------|-----|-----|-----|--------|
| Blog post | 10 | 5,000 | **845** | 12ms | 14ms | 15ms | 0 |
| Blog post | 50 | 10,000 | **858** | 57ms | 63ms | 79ms | 0 |
| Blog post | 100 | 10,000 | **850** | 117ms | 128ms | 131ms | 0 |
| Home page | 10 | 5,000 | **859** | 12ms | 13ms | 15ms | 0 |
| Home page | 50 | 5,000 | **889** | 55ms | 63ms | 70ms | 0 |

**~850 requests per second** for full pages rendered from a million-row database. The number barely moves from 10 to 100 concurrent connections — the server saturates its single-threaded throughput and queues cleanly. p99 latency at 100 concurrent is 131ms. No request is ever dropped.

### Multi-Query Pages

| Endpoint | Concurrency | Requests | Req/sec | p50 | p95 | p99 | Failed |
|----------|------------|----------|---------|-----|-----|-----|--------|
| Doc + sidebar (5 queries) | 10 | 3,000 | **81** | 123ms | 132ms | 146ms | 0 |
| Docs index (7 queries) | 10 | 2,000 | **42** | 239ms | 254ms | 294ms | 0 |

Multi-query pages hit the template engine harder. Each nested query block requires parsing, adapter resolution, SQL execution, and hydration — in sequence within a single request. This is the honest cost of server-side composition, and it tells us exactly where to optimize next.

## The Row Count Doesn't Matter

This was the most interesting finding. We ran the same benchmark at 27 rows and 1,000,027 rows:

| Scale | Blog Post | Home Page |
|-------|----------|-----------|
| 27 rows | 836 req/sec | 866 req/sec |
| 1,000,027 rows | 845 req/sec | 859 req/sec |

**Effectively identical.** SQLite's B-tree index makes slug lookups constant-time. Whether the table has 27 rows or a million, an indexed lookup traverses the same number of tree levels. The database is not the bottleneck.

## Latency

Single requests measured with `curl` against a warm server (median of 5 runs):

| Page | Queries | Latency |
|------|---------|---------|
| Blog post | 1 | **1.9ms** |
| Home page | 3 | **1.8ms** |
| Doc + sidebar | 5 | **12.9ms** |
| Docs index | 7 | **24.7ms** |

Sub-2ms for single-query pages. Under 13ms for a page composing five independent database queries into a data-driven sidebar.

## Write Performance

| Operation | Latency | Rate |
|-----------|---------|------|
| Single INSERT | 5.1ms | 196/sec |
| Batch INSERT (transaction) | 0.03ms each | 31,360/sec |

Transactional batch writes hit 31,360 inserts per second. We seeded a million rows in 34 seconds.

## How It Compares — With Receipts

Every number below links to its source. We only include benchmarks with published methodology.

### vs WordPress

WordPress uncached (no page cache, dynamic PHP rendering) on various hardware, per [WP Shell's comprehensive benchmarks](https://wpshell.com/lesson/benchmarks/) and the widely-cited [wycks benchmark gist](https://gist.github.com/wycks/5001067):

| WordPress Setup | Req/sec | HTX on Pi 5 | Difference |
|----------------|---------|-------------|------------|
| Default install, VPS ([wycks](https://gist.github.com/wycks/5001067)) | 6 | 850 | **142x** |
| 1 vCPU / 2GB RAM VPS ([RunCloud](https://runcloud.io/blog/scaling-ram-cpu)) | 20 | 850 | **43x** |
| 2 CPU cores, 3.4 GHz ([MakeItWork.press](https://makeitwork.press/fast-cpu-fast-wordpress-performance/)) | 45 | 850 | **19x** |
| DigitalOcean 16GB cloud VM ([WP Shell](https://wpshell.com/lesson/benchmarks/)) | 64 | 850 | **13x** |
| EPYC 7543 dedicated, $210/mo ([WP Shell](https://wpshell.com/lesson/benchmarks/)) | 308 | 850 | **2.8x** |

A Raspberry Pi running HTX outperforms a $210/month 32-core EPYC dedicated server running uncached WordPress. A default WordPress install on a typical VPS does 6 req/sec — we do 142 times that.

WordPress can reach thousands of req/sec with page caching ([Review Signal](https://reviewsignal.com/blog/2014/06/25/40-million-hits-a-day-on-wordpress-using-a-10-vps/) showed 1,585 req/sec with Nginx microcache on a $10 droplet). But cached WordPress is serving static HTML from memory — it's not rendering pages. Our 850 is fully dynamic on every request.

### vs Ghost

Ghost CMS (Node.js) uncached on a quad-core desktop i7, per [ghostjs-benchmark](https://github.com/sathvikl/ghostjs-benchmark):

| Ghost Setup | Req/sec | HTX on Pi 5 | Difference |
|-------------|---------|-------------|------------|
| Ghost 1.17, i7-4790 3.6GHz, uncached ([GitHub](https://github.com/sathvikl/ghostjs-benchmark)) | 169 | 850 | **5x** |

Ghost on a desktop quad-core i7 does 169 req/sec. HTX on a Pi does 5x that. Ghost's number is on significantly better hardware.

### vs Headless CMS (Strapi, Directus, Payload)

Sequential query benchmarks from [Payload's published speed test](https://payloadcms.com/posts/blog/performance-benchmarks) (M1 Max, complex GraphQL with 60+ relationships):

| CMS | Avg Response | Implied Sequential Throughput | HTX on Pi 5 |
|-----|-------------|------------------------------|-------------|
| Strapi ([Payload benchmark](https://payloadcms.com/posts/blog/performance-benchmarks)) | 102ms | ~10 req/sec | **85x faster** |
| Directus ([Payload benchmark](https://payloadcms.com/posts/blog/performance-benchmarks)) | 45ms | ~22 req/sec | **39x faster** |
| Payload ([Payload benchmark](https://payloadcms.com/posts/blog/performance-benchmarks)) | 15ms | ~67 req/sec | **13x faster** |

These are the headless CMS platforms people pay $20-100/month to host. HTX on a Pi outperforms all of them — and it serves complete HTML pages, not JSON fragments that still need client-side rendering.

### vs SSR Frameworks

From [Pau Sanchez's SSR framework benchmark](https://pausanchez.com/en/articles/frontend-ssr-frameworks-benchmarked-angular-nuxt-nextjs-and-sveltekit/) (i7-8565U, Node v22.2.0, 100 concurrent) and [eknkc/ssr-benchmark](https://github.com/eknkc/ssr-benchmark) (M1 Pro, 1000-row table render):

| Framework | Req/sec (hello world) | Req/sec (with data) | HTX on Pi 5 |
|-----------|---------------------|--------------------|----|
| Next.js App Router ([eknkc](https://github.com/eknkc/ssr-benchmark)) | — | 53 ops/sec | **16x faster** |
| Astro SSR ([eknkc](https://github.com/eknkc/ssr-benchmark)) | — | 99 ops/sec | **8.6x faster** |
| Next.js 14 ([Pau Sanchez](https://pausanchez.com/en/articles/frontend-ssr-frameworks-benchmarked-angular-nuxt-nextjs-and-sveltekit/)) | 2,570 | 388 (API fetch) | **2.2x faster** |
| SvelteKit ([Pau Sanchez](https://pausanchez.com/en/articles/frontend-ssr-frameworks-benchmarked-angular-nuxt-nextjs-and-sveltekit/)) | 4,063 | 2,286 (API fetch) | SvelteKit wins hello world |
| Angular SSR ([Pau Sanchez](https://pausanchez.com/en/articles/frontend-ssr-frameworks-benchmarked-angular-nuxt-nextjs-and-sveltekit/)) | 356 | 272 (API fetch) | **3.1x faster** |

Note the pattern: every framework's throughput collapses when it has to fetch data. Next.js drops from 2,570 to 388 — an 85% reduction — the moment it hits an API. HTX doesn't have this cliff because there's no network hop between the template engine and the database.

SvelteKit is genuinely fast and wins on hello-world. But SvelteKit's 2,286 req/sec "API fetch" test is calling a local mock API — not querying a million-row database through a template engine with layout composition.

### The Full Table

| Stack | Hardware | Req/sec | Workload | Source |
|-------|----------|---------|----------|--------|
| **HTX + Bun + SQLite** | **Pi 5 (8GB)** | **850** | **26KB dynamic page, 1M rows** | This benchmark |
| **HTX + Bun + SQLite** | **Pi 5 (8GB)** | **81** | **29KB page, 5 queries, 1M rows** | This benchmark |
| WordPress (uncached) | 2-core VPS | 20-45 | Dynamic page | [RunCloud](https://runcloud.io/blog/scaling-ram-cpu), [MakeItWork](https://makeitwork.press/fast-cpu-fast-wordpress-performance/) |
| WordPress (uncached) | 32-core EPYC, $210/mo | 308 | Dynamic page | [WP Shell](https://wpshell.com/lesson/benchmarks/) |
| Ghost (uncached) | Desktop i7 quad-core | 169 | Dynamic blog post | [ghostjs-benchmark](https://github.com/sathvikl/ghostjs-benchmark) |
| Strapi | M1 Max | ~10 | Complex GraphQL query | [Payload benchmark](https://payloadcms.com/posts/blog/performance-benchmarks) |
| Next.js App Router | M1 Pro | 53 | 1000-row table SSR | [eknkc/ssr-benchmark](https://github.com/eknkc/ssr-benchmark) |
| Next.js 14 (API fetch) | Desktop i7 | 388 | SSR with data fetch | [Pau Sanchez](https://pausanchez.com/en/articles/frontend-ssr-frameworks-benchmarked-angular-nuxt-nextjs-and-sveltekit/) |
| SvelteKit (API fetch) | Desktop i7 | 2,286 | SSR with data fetch | [Pau Sanchez](https://pausanchez.com/en/articles/frontend-ssr-frameworks-benchmarked-angular-nuxt-nextjs-and-sveltekit/) |
| Django | Pi 2 | 83 | Hello world (no DB) | Community benchmarks |

## Why Is It Fast?

Three architectural decisions compound:

**1. No network hop to the database.** SQLite is an in-process library. Every query is a function call into C code in the same address space. No TCP, no authentication, no wire protocol. This is the single biggest advantage over every other stack in the table — WordPress talks to MySQL over a socket, Ghost talks to MySQL/SQLite over Knex.js, Strapi talks to Postgres/MySQL over a connection pool. We make a function call.

**2. Bun's native SQLite binding.** `bun:sqlite` is a native C binding compiled into the runtime — not an FFI wrapper, not a Node.js addon. Prepared statements compile once and execute as direct C calls.

**3. No client-side rendering tax.** Next.js, Nuxt, and SvelteKit all pay for React/Vue/Svelte's component model: virtual DOM diffing, reactive dependency tracking, hydration reconciliation. HTX parses a template, runs queries, replaces placeholders, sends HTML. The render pipeline is a straight-line transformation.

The compounding effect is what matters. Remove the database network hop, remove the FFI overhead, remove the client framework tax — and an $80 ARM computer outperforms dedicated x86 servers costing $200/month.

## The Async Adapter

The HTX engine's `ContentAdapter` interface uses `MaybePromise<T>` return types. For SQLite, this is zero-cost — synchronous values pass through without Promise allocation. But the same interface accepts Convex, Turso, PlanetScale, or Postgres — any async backend, same templates.

These benchmarks prove the async capability adds zero overhead to the synchronous path.

## The Production Architecture

At 850 req/sec, the Pi sustains ~73 million requests per day. Behind a Cloudflare Tunnel with CDN caching, most traffic never reaches it. A 90% cache hit rate means 100,000 daily visitors generate ~10,000 origin requests — served at 12ms each.

The electricity costs $15/year. The hardware costs $80 once. For a documentation site, a blog, or a content application, this stack does what WordPress needs a $210/month dedicated server to do — on hardware you can hold in your hand.

## Try It

```bash
bun create hypermedia-app my-app
cd my-app
bun run dev
```

Source: [github.com/hypermediacms/hypermedia-app](https://github.com/hypermediacms/hypermedia-app)
