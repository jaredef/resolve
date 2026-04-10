# Phase 1: Engine Hooks

**Status:** COMPLETE
**Parent:** auth-module-extraction-plan.md

## Files to Create
1. `packages/htx-engine/src/contracts/template-processor.ts` — TemplateProcessor + ProcessResult interfaces
2. `packages/htx-engine/src/contracts/mutation-action-handler.ts` — MutationActionHandler + MutationResult interfaces

## Files to Modify
3. `packages/htx-engine/src/contracts/module-registry.ts` — add registerTemplateProcessor(), registerMutationHandler()
4. `packages/htx-engine/src/runtime/engine-module-registry.ts` — store template processors + mutation handlers
5. `packages/htx-engine/src/runtime/request-handler.ts` — call template processors at pre/post-layout, call mutation handlers in processBlocks/handleMutationExecute
6. `packages/htx-engine/src/index.ts` — export new types

## Validation
- [ ] TypeScript compiles
- [ ] All 79 existing tests pass
- [ ] Existing auth still works (hooks are additive, not replacing yet)

## Execution Log
- [x] TemplateProcessor interface (template-processor.ts): process() with pre/post-layout phase + redirect
- [x] MutationActionHandler interface (mutation-action-handler.ts): actions(), prepare(), execute() with MutationResult
- [x] ModuleRegistry: registerTemplateProcessor() + registerMutationHandler()
- [x] EngineModuleRegistry: stores templateProcessors[] + mutationHandlers[]
- [x] RequestHandler: runTemplateProcessors() at pre-layout and post-layout points
- [x] RequestHandler: mutation handler dispatch in prepareMutationBlock, executeMutationBlock, handleMutationExecute
- [x] Error isolation: template processor errors caught and logged
- [x] Exported: TemplateProcessor, ProcessResult, MutationActionHandler, MutationResult
- [x] TypeScript clean, 79 tests pass, existing auth still works
