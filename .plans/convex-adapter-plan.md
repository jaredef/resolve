# Convex DB Content Adapter

**Status:** Phase 1 COMPLETE

## Overview

Cloud database adapter enabling HTX to use Convex DB as a content backend, unlocking multi-instance deployments and real-time sync.

## Phases

### Phase 1: Adapter Implementation — COMPLETE
- [x] Create `packages/htx-adapter-convex/` package structure
- [x] Implement ConvexAdapter class (ContentAdapter interface)
- [x] Create Convex schema (`convex/schema.ts`)
- [x] Create Convex server functions (`convex/content.ts`)
- [x] Write comprehensive documentation (`.docs/convex-adapter.md`)
- [x] Seed documentation into SQLite database

### Phase 2: Project Setup & Testing — NOT STARTED
- [ ] Initialize Convex project (`bunx convex dev`)
- [ ] Deploy schema and functions
- [ ] Create integration test with real Convex deployment
- [ ] Verify all CRUD operations end-to-end
- [ ] Test where conditions and ordering
- [ ] Benchmark latency vs SQLite adapter

### Phase 3: Multi-Adapter Registry — NOT STARTED
- [ ] Implement AdapterRegistry for per-type adapter routing
- [ ] Wire into engine module system
- [ ] Test hybrid SQLite + Convex configuration
- [ ] Document multi-adapter setup patterns

## Execution Log

### Phase 1 (2026-03-30)
- Created `packages/htx-adapter-convex/src/convex-adapter.ts` — ConvexAdapter with query, find, findBySlug, create, update, delete
- Created `packages/htx-adapter-convex/src/index.ts` — barrel export
- Created `packages/htx-adapter-convex/convex/schema.ts` — content table with by_type, by_type_slug, by_type_status indexes
- Created `packages/htx-adapter-convex/convex/content.ts` — 7 deployed functions (list, getById, getBySlug, filtered, create, update, remove)
- Written `.docs/convex-adapter.md` — full documentation (199 lines)
- Seeded documentation into SQLite (id: 117522, section: adapters)
- Added `convex` dependency to package.json
