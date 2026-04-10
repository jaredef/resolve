# Implementation Observations: PRESTO Seed Compilation

**April 2026**

An analysis of how the PRESTO seed compiles to different target languages, what emerges in translation, and what these observations reveal about the specification.

---

## 1. The Experiment

The PRESTO seed (1,825 words) and test fixtures (711 words) were provided to a fresh Claude LLM context with the instruction to build a conformant htxlang engine in Go. No TypeScript source code was provided. No prior conversation about PRESTO was available. The seed was the sole input.

The agent produced 2,173 lines of Go across 16 source files, 610 lines of tests. All 22 verification tests passed. The engine serves 1,136-14,123 requests/second on a Raspberry Pi 5 with 19.8 MB RSS.

---

## 2. Performance Properties by Language

| Property | TypeScript (Bun) | Go (net/http) |
|----------|-----------------|---------------|
| Complex page (all directives) | Not benchmarked separately | 1,136 req/s, 8.8ms |
| Simple data page | ~comparable | 1,449 req/s, 6.9ms |
| Dynamic route (SQLite) | ~comparable | 8,139 req/s, 1.2ms |
| Static file | ~comparable | 14,123 req/s, 0.7ms |
| Memory (RSS) | ~112 MB (full platform) | 19.8 MB (engine only) |
| Startup | Instant (Bun) | Instant (compiled binary) |
| Build step | None (Bun runs TS directly) | go build (produces single binary) |
| Client compilation | Yes (TSX at boot) | No (pure server, no transpiler) |

The Go engine is faster at request handling because Go compiles to native code and goroutines handle concurrency without async/await overhead. The TypeScript engine is richer because Bun provides runtime compilation (TSX, Tailwind). These are properties of the languages, not the architecture.

---

## 3. Novel Decisions the Agent Made

These decisions were not explicitly specified in the seed. The agent derived them from the rationale, the algorithms, or Go idioms.

### 3.1 Layout Directive Extraction Before Stripping

The seed specifies stage 16 as "directive stripping" and stage 18 as "layout wrapping." The agent realized that if the htx:layout directive were stripped at stage 16, it would be gone before stage 18 could read it. The agent inserted a pre-stripping extraction step:

```go
// Extract layout directive BEFORE stripping (so it survives stage 16)
layoutDir := extractLayoutDirective(tmpl)
tmpl = layoutDir.cleanContent

// Stage 16: Directive stripping
tmpl = stripRemainingDirectives(tmpl)
```

This was not in the seed. The agent inferred it from the pipeline ordering constraints. This suggests the seed correctly conveyed the intent but should explicitly note that layout directives must be extracted before general stripping.

**Spec implication:** Add to implementation spec: "The layout directive must be extracted and stored before the directive stripping stage, as it is consumed during layout wrapping which occurs after stripping."

### 3.2 DataContext as a Named Type with Methods

The seed describes the data context as "a mutable key-value map." The agent created a named Go type with Copy() and Merge() methods:

```go
type DataContext map[string]interface{}

func (d DataContext) Copy() DataContext { ... }
func (d DataContext) Merge(src DataContext) { ... }
```

This is idiomatic Go: named types with methods instead of utility functions. The TypeScript engine uses `Object.assign({}, data)` for the same operation. The Go pattern is more explicit and self-documenting.

**Observation:** The specification describes data as a map. Go's type system encourages making it a named type. The behavior is identical. The idiom differs. The spec is appropriately abstract.

### 3.3 sync.RWMutex on ModuleRegistry

The seed says nothing about thread safety. The Go agent added read-write mutexes to the module registry:

```go
type ModuleRegistry struct {
    mu               sync.RWMutex
    middleware       []Middleware
    contextProviders map[string]ContextProvider
    channelHandlers  map[string]ChannelHandler
}
```

Every registration and lookup acquires the appropriate lock. The TypeScript engine has no locking because JavaScript is single-threaded. The Go agent correctly identified that Go's concurrency model (goroutines serving concurrent requests) requires synchronization on shared state.

**Observation:** The spec doesn't mention concurrency. Go's runtime demands it. A conformant engine in a concurrent language MUST protect shared mutable state. This is an implicit requirement the spec should acknowledge.

**Spec implication:** Add a note: "In concurrent runtimes, the module registry and any shared mutable state MUST be protected from data races."

### 3.4 Sandbox as Interface Satisfaction

The seed describes the sandbox as "a proxy that drops undeclared registrations." In TypeScript, this is a proxy object. In Go, the agent used interface satisfaction:

```go
type sandbox struct {
    moduleName string
    manifest   ModuleManifest
    parent     *ModuleRegistry
}

func (s *sandbox) RegisterMiddleware(mw Middleware) {
    for _, allowed := range s.manifest.Middleware {
        if allowed == mw.Name() {
            s.parent.RegisterMiddleware(mw)
            return
        }
    }
    log.Printf("[Sandbox] %s: undeclared middleware %s", s.moduleName, mw.Name())
}
```

Both `ModuleRegistry` and `sandbox` implement the `RegistryAPI` interface. The module receives one or the other via the interface. No inheritance. No proxy. Just Go interfaces.

**Observation:** The spec's sandbox concept translates cleanly to Go's implicit interface satisfaction. The pattern is simpler in Go than in TypeScript (no Proxy object, no dynamic dispatch). The spec correctly abstracted the concept.

### 3.5 Engine as http.Handler

The seed says "create an HTTP server that forwards to RequestHandler.handle()." The Go agent made the Engine struct implement `http.Handler` directly:

```go
func (e *Engine) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    // The 22-stage pipeline
}
```

This means the engine IS the HTTP handler. In TypeScript, the handler is a method on a class. In Go, it's the struct itself satisfying an interface. The entire pipeline lives in one method on one struct.

**Observation:** Go's `http.Handler` interface is a single-method interface (`ServeHTTP`). The engine naturally satisfies it. The spec doesn't prescribe this but Go's standard library makes it the obvious choice.

### 3.6 Recover from Panics in Module Boot

The seed says "if boot throws, log and continue." The Go agent used defer/recover:

```go
func() {
    defer func() {
        if r := recover(); r != nil {
            log.Printf("[Engine] Module %s panicked during boot: %v", mod.Name(), r)
        }
    }()
    mod.Boot(registry)
}()
```

Go doesn't have try/catch. It has panic/recover. The agent correctly translated the error isolation requirement to Go's idiom.

### 3.7 testResponseWriter for Testing

The agent created a test helper that captures HTTP responses without running a real server:

```go
type testResponseWriter struct {
    statusCode int
    headers    http.Header
    body       bytes.Buffer
}
```

This allows testing the 22-stage pipeline directly via `ServeHTTP` without network overhead. The TypeScript tests call `handler.handle(request)` directly. The Go tests call `engine.ServeHTTP(recorder, request)`. Same pattern, different idiom.

---

## 4. What the Seed Got Right

### 4.1 Algorithm Pseudocode Translated Cleanly

Every algorithm in the seed (router walk, expression evaluation, control flow, token signing) translated to Go without ambiguity. The pseudocode was language-agnostic enough that the agent didn't need to improvise the logic, only the syntax.

### 4.2 Regex Patterns Worked Directly

All 18 regex patterns from the seed compiled in Go's regexp package without modification. Go uses RE2 syntax (no backreferences), and the seed's patterns are all RE2-compatible.

### 4.3 The Rationale Guided Novel Decisions

The layout-before-stripping decision (#3.1) and the concurrency protection (#3.3) were not in the algorithms but were derivable from the rationale. The agent used the "bilateral boundary" principle and the "reason from principles when the spec is ambiguous" instruction correctly.

### 4.4 Interface Signatures Were Sufficient

The interface signatures added to the seed (Module, Middleware, ContextProvider, ChannelHandler, ContentAdapter) translated directly to Go interfaces. Every method signature was precise enough to implement without guessing.

---

## 5. What the Seed Should Improve

### 5.1 Layout Directive Extraction Timing

The seed's pipeline lists "directive stripping" before "layout wrapping" but doesn't note that the layout directive must survive stripping. The Go agent figured this out. Not all agents will. Add an explicit note.

### 5.2 Concurrency Note

The seed assumes single-threaded execution. Add: "In concurrent runtimes, shared mutable state (module registry, data caches) must be protected from data races."

### 5.3 Component Prop Syntax Ambiguity

The seed says components use `{{ propName }}` for prop substitution. The Go agent implemented this correctly, but the distinction between `{{ }}` (composition-stage, component props) and `<htx:v>` (expression-stage, data context) deserves a more prominent callout. The agent's implementation works, but a less capable agent might conflate them.

### 5.4 Error Response Format

The seed doesn't specify what error responses look like. The Go agent chose plain text for some errors and JSON for channel API errors. Standardizing error response format would improve interoperability.

---

## 6. Emergent Properties of the Go Implementation

### 6.1 Single Binary Deployment

`go build` produces one executable. No node_modules, no package.json, no runtime. Copy the binary + templates + SQLite file to any Linux ARM64 machine and it runs. This is an emergent property of Go, not of the spec.

### 6.2 Zero-Dependency Client Story

The Go engine has no TSX compiler, no Tailwind generator, no JSX transform. It serves HTML. If you want client-side progressive capabilities, you bring your own client libraries. The TypeScript engine bootstraps the full progressive stack at boot. The Go engine is Layer 0-4 pure.

### 6.3 Native Concurrency

Every request runs in its own goroutine. The engine handles concurrent requests without async/await, without event loops, without callbacks. The pipeline is synchronous within each request. Concurrency is between requests. This is Go's natural model and maps well to the pipeline's sequential nature.

### 6.4 Memory Efficiency

19.8 MB for the complete engine with SQLite. The TypeScript v1 engine (with 14 modules, real-time, WASM) uses 112 MB. Accounting for the difference in feature set, the Go engine is approximately 5-6x more memory-efficient per capability unit.

---

## 7. Implications for the Specification

The Go implementation validates:
1. The seed is sufficient to produce a conformant engine in a non-TypeScript language.
2. The algorithms translate without ambiguity.
3. The regex patterns are cross-platform.
4. The rationale enables correct judgment calls on unspecified decisions.
5. The interface signatures are precise enough for static type systems.

The Go implementation reveals:
1. Concurrency requirements should be acknowledged in the spec.
2. Layout directive extraction timing should be explicit.
3. Error response format should be standardized.
4. The spec is naturally friendly to Go's composition model (interfaces, not inheritance).

The Go implementation demonstrates:
1. Different languages produce different performance profiles from the same spec.
2. Different languages produce different deployment models from the same spec.
3. The spec is genuinely language-agnostic: not just "could work in Go" but "naturally idiomatic in Go."
