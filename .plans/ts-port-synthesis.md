# HTX Engine TypeScript port — synthesis

**Status:** Planning reference  
**Scope:** Independent assessment after comparing [hypermedia-app-php](../../hypermedia-app-php/) with the phase documents in this directory.

---

## Viability

The TypeScript port is **technically sound**. The PHP tree is a concrete specification: synchronous pipeline, bounded expression engine, file-based routing, pluggable `ContentAdapter`, and a single orchestration point ([`RequestHandler.php`](../../hypermedia-app-php/packages/htx-engine/src/Runtime/RequestHandler.php)). Bun (`Bun.serve`, `bun:sqlite`, `bun:test`) matches the project’s stated constraints in [CLAUDE.md](../../CLAUDE.md).

Risks are **planning and contract alignment**, not whether the engine can be reimplemented. The main failure mode is drifting from PHP semantics (adapter return shapes, `where` meta type, resolver tag syntax) while assuming parity.

---

## Top fixes before implementation

1. **Add a RequestHandler phase** (or renumber phases) so integration tests and CLI have a defined orchestration layer; the PHP handler wires Router → includes → components → lets → DSL/executors → layout.
2. **Lock contracts to PHP** — especially `ContentAdapter.query()` returning **`{ rows, total }`** and **`where` as a string** in meta, per [`ContentAdapterInterface.php`](../../hypermedia-app-php/packages/htx-engine/src/Contracts/ContentAdapterInterface.php).
3. **Router** — support **`string | TemplateResolver`** (multi-root template chain) like [`Router.php`](../../hypermedia-app-php/packages/htx-engine/src/Runtime/Router.php), not only a single template directory.
4. **Resolvers** — implement **`<htx:include>`**, **`<htx:component>`**, **`<htx:let>`** only; expression-style `{{ include }}` is not how PHP resolves these.
5. **SQLite adapter** — match PHP **`ensureSchema`** (including `title`, `body`, `status`, indexes) and **where-string** behavior in [`SQLiteAdapter.php`](../../hypermedia-app-php/packages/htx-adapter-sqlite/src/SQLiteAdapter.php).
6. **Parity tests** — target the measured PHP bar (**282 tests, 535 assertions**), not round numbers from earlier drafts.

---

## Intentional TypeScript differences

| Topic | Note |
|-------|------|
| JWT | PHP uses synchronous Firebase JWT; TS may use **`jose`** (async) or a sync-capable library—decide and accept **`async` at `Bun.serve` boundary** or keep signing synchronous for minimal `Promise` surface. |
| Types | Stricter TypeScript types (`unknown`, discriminated unions) are desirable; document any **intentional** behavior changes. |
| YAML | PHP lists `symfony/yaml` but the **engine `src/` tree does not use it**; a YAML helper is for **CLI/config** if you add YAML files, not for HTX meta (tag-based). |

---

## Dependencies

- **`jose`** and **`marked`** remain reasonable as in the master plan.
- Optional: small **`yaml`** package or hand-rolled subset **only** if `htx new` emits YAML config; avoid building a full YAML parser “because Composer had symfony/yaml” without a call site.

---

## Suggested phase order tweak

- Move **contracts** (current Phase 13 content) **early** (e.g. Phase 2–3) so parser, router, and executors import real types from the start.
- Place **RequestHandler** after resolvers and executors, before or inside **integration** validation.
- Keep expression sub-phases as-is or merge lexer/parser per master plan review—team preference.

---

## Execution log

_(Not a tracked phase—update if this synthesis is superseded.)_

## Port review addendum (2026-03-28)

- This is currently the best planning document in the folder because it focuses on the places the port can fail semantically, not just mechanically.
- I would make this even stronger by adding an explicit "must match PHP exactly" checklist for `RequestHandler`, `ContentAdapter`, `Router`, `GetContentExecutor`, `SetContentExecutor`, and the SQLite schema.
- The overall project looks highly viable if this document stays authoritative. If it becomes just another opinion alongside the phase docs, the implementation will likely drift.
