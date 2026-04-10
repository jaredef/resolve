# Module System Activation

**Status:** IN PROGRESS
**GitHub Issue:** hypermediacms/hypermedia-app#37
**Objective:** Wire the dormant module system into the runtime, then migrate cart into a pluggable module

## Phases

### Phase 1: ModuleRegistry + Middleware Chain
**Status:** NOT STARTED
- Implement ModuleRegistry class (registerFunction, registerMiddleware, registerAdapter, registerContextProvider)
- RequestHandler accepts modules[] option, boots them
- Wire middleware chain into handle() — middleware runs before template pipeline
- Middleware can short-circuit with custom responses (API routes)

### Phase 2: Context Providers
**Status:** NOT STARTED
- ContextProvider interface
- registerContextProvider() on ModuleRegistry
- RequestHandler resolves context per-request, injects into template data
- {{ moduleName.field }} works in expressions

### Phase 3: Cart Module
**Status:** NOT STARTED
- Create CartModule implementing Module interface
- CartMiddleware handles /api/cart/add, /api/cart/remove
- CartContextProvider injects { count, items, total } per-request
- Remove cart code from DogfoodAppHost
- Cart page rendered via template with {{ cart.* }} expressions
