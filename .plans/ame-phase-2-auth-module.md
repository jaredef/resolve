# Phase 2: Auth Module

**Status:** IN PROGRESS
**Parent:** auth-module-extraction-plan.md

## Files to Create
1. `app/modules/auth-module.ts` — AuthModule, AuthMiddleware, AuthContextProvider, AuthTemplateProcessor, AuthMutationHandler

## Files to Modify
2. `app/public/index.ts` — Replace authProvider option with AuthModule in modules array

## Validation
- [ ] Login flow works (GET form with token → POST validates → redirect + cookie)
- [ ] Logout flow works (POST from sidebar → cookie cleared → redirect)
- [ ] htx:auth / htx:auth-none conditional rendering works
- [ ] htx:auth redirect works (pre-layout and post-layout)
- [ ] {{ auth.username }} available in templates
- [ ] All 79 engine tests pass
- [ ] Existing templates unchanged

## Execution Log
