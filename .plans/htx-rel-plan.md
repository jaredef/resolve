# htx:rel — Relational Query Directive

**Status:** IN PROGRESS
**GitHub Issue:** hypermediacms/hypermedia-app#32
**Objective:** Add `htx:rel` directive for parent-child relationship resolution in nested query blocks

## Phases

### Phase 1: Core Implementation
**Status:** COMPLETE
**Plan:** `.plans/rel-phase-1-core.md`
- Skip rel blocks in renderNestedBlocks()
- Add resolveRelationalBlocks() and resolveRelDirective()
- Make hydrateWithData() async, call resolveRelationalBlocks per row
- Add rel to stripMetaDirectives in request-handler
- Tests: single-level, multi-level, mixed, backward compat

### Phase 2: Benchmark + Article Update
**Status:** NOT STARTED
- Seed relational test data (categories → posts → comments)
- Benchmark N+1 relational queries at scale
- Update blog article with honest relational comparison
