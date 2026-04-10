# Runtime Diagnostics Phase 2

**Status:** COMPLETE

## Objective

Make markdown-backed projects fail fast with clear content diagnostics instead of silently behaving like empty sites.

## Files To Modify

- `packages/htx-adapter-markdown/src/markdown-adapter.ts`
- `packages/htx-adapter-markdown/tests/markdown-adapter.test.ts`

## Tasks

- detect missing configured content root
- reject malformed front matter with file-specific errors
- detect duplicate `type + slug` collisions
- detect duplicate `type + id` collisions

## Execution Log

- [x] Added content root validation
- [x] Added front matter validation
- [x] Added duplicate identity validation
- [x] Added coverage
