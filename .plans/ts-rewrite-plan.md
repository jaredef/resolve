# HTX Engine TypeScript Rewrite — Master Plan

**Status:** NOT STARTED
**Runtime:** Bun
**Source:** PHP 8.2 monorepo (`packages/htx-engine/`, `packages/htx-adapter-sqlite/`)
**Target:** TypeScript monorepo (`packages/htx-engine/`, `packages/htx-adapter-sqlite/`)

---

## Overview

Rewrite the HTX engine from PHP to TypeScript targeting Bun. The PHP architecture ports directly — interfaces, DI, composition, no framework coupling. The engine stays synchronous. Only two external dependencies: `jose` (JWT) and `marked` (Markdown). HTML escaping and YAML parsing are hand-rolled.

---

## Phases

| # | Phase | Status | Scope |
|---|-------|--------|-------|
| 1 | Project Scaffolding | NOT STARTED | Bun workspace, tsconfig, package.json, directory structure |
| 2 | Utilities (HTML Escape + YAML Parser) | NOT STARTED | Hand-rolled `he()` and YAML parser |
| 3 | Expression Engine — Lexer | NOT STARTED | Tokenizer with `{{ }}` delimiters |
| 4 | Expression Engine — Parser & AST | NOT STARTED | Recursive descent parser, discriminated union nodes |
| 5 | Expression Engine — Evaluator | NOT STARTED | Tree-walking interpreter, scope stack, resource limits |
| 6 | Function Registry & Built-in Functions | NOT STARTED | Registry + String/Array/Date/Number function modules |
| 7 | Expression Engine Integration | NOT STARTED | ExpressionEngine facade, wiring lexer/parser/evaluator/functions |
| 8 | DSL Parser | NOT STARTED | MetaExtractor, TemplateExtractor, ResponseExtractor, NestTreeBuilder, DSLParser |
| 9 | Runtime — Router | NOT STARTED | File-system routing with dynamic segments |
| 10 | Runtime — Template, Layout, Include, Component, Let Resolvers | NOT STARTED | All runtime resolvers + PropsParser |
| 11 | Services — Hydrator | NOT STARTED | Placeholder replacement with escaping |
| 12 | Security — ActionTokenService & ReplayGuard | NOT STARTED | JWT tokens, JTI tracking, replay prevention |
| 13 | Contracts & Interfaces | NOT STARTED | ContentAdapter, Middleware, Module, AuthProvider, ModuleRegistry |
| 14 | Executors — GetContentExecutor | NOT STARTED | Read-only pipeline |
| 15 | Executors — SetContentExecutor & DeleteContentExecutor | NOT STARTED | Two-phase mutation pipeline |
| 16 | SQLite Adapter | NOT STARTED | `bun:sqlite` implementation of ContentAdapter |
| 17 | CLI | NOT STARTED | `htx new`, `htx dev`, `htx serve` commands |
| 18 | Integration Tests & Final Validation | NOT STARTED | Full pipeline tests, edge cases, parity with PHP test suite |

---

## Architecture Notes

### PHP → TypeScript Mapping

| PHP | TypeScript |
|-----|-----------|
| Interface + class implements | `interface` + `class implements` |
| Constructor DI (verbose) | Constructor DI (same, or factory functions) |
| `match` expression | `switch` with exhaustiveness, or object map |
| `preg_match` / `preg_replace_callback` | `RegExp`, `.match()`, `.replace()` |
| `array_map`, `array_filter` | `.map()`, `.filter()` |
| Node class hierarchy (16 classes) | Discriminated union: `type Node = OutputNode \| TextNode \| ...` |
| `htmlspecialchars()` | Hand-rolled `escapeHtml()` |
| `symfony/yaml` | Hand-rolled YAML parser |
| `firebase/php-jwt` | `jose` library |
| `league/commonmark` | `marked` library |
| PDO SQLite | `bun:sqlite` (synchronous) |
| `php -S` dev server | `Bun.serve()` |
| PHPUnit | `bun:test` |
| Composer workspaces | Bun workspaces |

### Sync-First Design

The entire pipeline is synchronous. No `async/await` anywhere in the core engine. The adapter interface methods are synchronous. If a future adapter needs async (e.g., Postgres over the network), that adapter can use Bun's synchronous wrappers or the executor layer can be made async *only for that adapter* — the expression engine, parser, router, and hydrator never change.

### File Structure Target

```
packages/
  htx-engine/
    src/
      contracts/        # Interfaces
      expressions/      # Lexer, Parser, Evaluator, Nodes, Functions, Registry
      parser/           # DSLParser, MetaExtractor, TemplateExtractor, etc.
      runtime/          # Router, Resolvers
      security/         # ActionTokenService, ReplayGuard
      services/         # Hydrator
      utils/            # escapeHtml, yamlParse
      cli/              # Commands
      index.ts          # Public API barrel export
    tests/
    package.json
    tsconfig.json
  htx-adapter-sqlite/
    src/
      sqlite-adapter.ts
      index.ts
    tests/
    package.json
    tsconfig.json
```

---

## Review Comments

_Reviewed by Claude after building the complete PHP implementation (12 phases, 282 tests, 535 assertions)._

### Critical Gap: Missing RequestHandler Phase

The biggest omission in this plan is the **RequestHandler** — the orchestration layer that ties everything together. In the PHP build, this was the most complex single class (~360 LOC) and the hardest to get right. It chains: Router → IncludeResolver → ComponentResolver → LetResolver → DSLParser → Executors → ExpressionEngine → Hydrator → LayoutResolver into a single `handle(request) → Response` flow. None of the 18 phases cover this. It should be its own phase (probably Phase 14.5 or a new Phase 15, shifting mutation executors and later phases forward). Without it, Phase 18 integration tests have nothing to test against — there's no pipeline orchestrator.

### Phase Ordering: Contracts Should Come First

Phase 13 (Contracts & Interfaces) defines all the boundaries that the rest of the system depends on. In practice, `ContentAdapter`, `Middleware`, `HtxRequest`, `HtxResponse`, and `QueryMeta` are needed by almost every phase from Phase 8 onward. Moving Contracts to Phase 2 or 3 would prevent having to define ad-hoc types that later get replaced when the real interfaces land.

### Sync-First Claim Needs an Asterisk

The plan correctly identifies `jose` as the async exception, but underestimates the propagation impact. In the PHP build, `prepare()` and `execute()` on mutation executors call `ActionTokenService`, which means the RequestHandler's `handle()` method must also be async for mutation routes. This means either: (a) the entire `handle()` becomes `async` (simple but breaks the sync promise), or (b) you split the handler into `handleRead()` (sync) and `handleMutation()` (async). The plan should address this architectural decision explicitly.

### Missing `executors/` Directory in File Structure

The file structure target doesn't show `executors/` — the directory that houses GetContentExecutor, SetContentExecutor, and DeleteContentExecutor. Add it alongside `services/` and `security/`.

### Consider: Do We Need 18 Phases?

Phases 3-7 (Expression Engine) could realistically be 2-3 phases instead of 5. The lexer, parser, and AST nodes are tightly coupled — splitting them across 3 phases means the first two phases can't be meaningfully tested in isolation. Consider: Phase 3 = Lexer + Parser + AST Nodes, Phase 4 = Evaluator + Functions, Phase 5 = ExpressionEngine facade. This reduces context-switching overhead during execution.

### Dependency: `marked` vs Alternatives

The plan specifies `marked` for Markdown. Consider `markdown-it` as an alternative — it's more extensible and has better TypeScript types. Or, since this is Bun, evaluate whether the Markdown function is even heavily used. In the PHP dogfood app, `md()` was used exactly once. If it's a rarely-used function, it might be better as an optional peer dependency rather than a hard requirement.

## Independent review notes (2026-03)

- Treat **RequestHandler** and **Router + TemplateResolver** (multi-root resolution) as first-class deliverables in the phase list; update any examples so **ContentAdapter.query** returns `{ rows, total }`, not a bare array.
- **symfony/yaml** is listed in PHP `composer.json` but **not imported** under `packages/htx-engine/src/`; a YAML utility is optional and mainly relevant if the TS CLI or scaffold emits YAML config—it is not required for the HTX DSL (meta is tag-based).

## Port review addendum (2026-03-28)

- This plan is viable, but it still reads like a package inventory more than an execution-safe porting sequence. The PHP app has one dominant integration surface: `RequestHandler`, and the plan should revolve around preserving that behavior.
- Add a per-phase parity rule: no phase is complete until the matching PHP tests or behaviors are explicitly named and checked off. That will reduce semantic drift more than adding more implementation detail.
- I would also add a short "non-goals" section so the port does not silently become a redesign. The current risk is not Bun or TypeScript, it is accidentally changing contracts while the code still "looks right."
