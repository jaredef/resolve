# Module Manifests

Module manifests are a capability-based security model for the HTX module system. A module declares what engine capabilities it intends to use, and the engine enforces the declaration at boot time. Undeclared capabilities are silently dropped.

This extends the same security principle that operates at the client-server boundary — where channel tokens scope what data a client can access — inward to the module-engine boundary, where manifests scope what capabilities a module can register.

## The Problem

Without manifests, every module receives the full ModuleRegistry during boot. A module can register middleware that intercepts any HTTP path, context providers under any namespace, channel handlers under any name, and route sources that claim any URL. For first-party modules authored by the application developer, this is appropriate. For third-party modules — marketplace plugins, tenant-authored extensions, agent-generated modules — this is a security gap.

A marketplace analytics module should not be able to register middleware that intercepts authentication routes. A tenant's custom module should not be able to register route sources that serve pages under another tenant's URL space. An AI agent providing a route source should not be able to register mutation handlers.

## Declaring a Manifest

A module declares its capabilities by implementing the optional `manifest()` method on the Module interface:

The manifest specifies a trust level and an explicit enumeration of what the module will register during boot. The method is optional — modules without it behave according to the active policy. The method is synchronous — a manifest is a static declaration, not a runtime computation (though it can be derived from constructor configuration).

### Trust Levels

**first-party** — The application developer's own modules. The manifest is documentation only. No enforcement. The module receives the full registry.

**marketplace** — Third-party distributed modules. The manifest is enforced. Undeclared registrations are silently dropped and logged. The module's valid registrations still proceed — a violation in one capability does not prevent the module from using its other declared capabilities.

**tenant** — User-authored extensions. The manifest is strictly enforced with a minimal capability surface. Designed for modules created through an admin UI or by AI agents.

### Capability Declarations

Each field in the manifest corresponds to a registration method on the ModuleRegistry:

**Named capabilities** are declared as string arrays. A module declaring `contextProviders: ["weather"]` can only register a context provider named `"weather"`. Attempting to register `"auth"` is a violation.

- `functions` — expression function names
- `adapters` — content adapter names
- `contextProviders` — context provider namespace names
- `channelHandlers` — channel handler module names

**Path-scoped capabilities** are declared as boolean or with explicit path prefixes. A module declaring `middleware: { pathPrefixes: ["/api/weather/"] }` can register middleware, but the engine wraps it in a proxy that only activates for requests matching the declared prefixes. Requests to `/api/auth/` pass through unintercepted.

- `middleware` — boolean or `{ pathPrefixes: string[] }`
- `routeSources` — boolean or `{ pathPrefixes: string[] }`

**Boolean capabilities** are simple gates:

- `templateProcessors` — boolean
- `mutationHandlers` — boolean

Omitted fields default to denied for marketplace and tenant trust levels.

## Enforcement

### The Sandboxed Registry

When the engine boots a module with a non-first-party manifest, it wraps the ModuleRegistry in a SandboxedModuleRegistry proxy. The proxy implements the same interface but checks every registration against the manifest before delegating to the real registry.

The proxy enforces three behaviors:

1. **Allow** — the registration is declared in the manifest. The proxy delegates to the real registry.
2. **Scope** — the registration is declared with path prefixes. The proxy wraps the middleware or route source in a path-checking proxy before delegating.
3. **Deny** — the registration is not declared. The proxy silently drops it, logs a warning, and records the violation.

Silent drop (rather than throwing) is deliberate. A module that legitimately needs a context provider but incorrectly tries to register middleware still gets its context provider. The violation is logged and auditable but does not cascade to the module's valid registrations.

### HTX_MODULE_POLICY

The enforcement posture is controlled by a single environment variable read at startup:

**strict** (default when absent) — Modules without manifests are rejected at boot. The engine logs an error and skips the module. All manifested modules are enforced per their trust level.

**permissive** — Modules without manifests receive full access (current behavior). Manifested modules are still sandboxed per their trust level. This enables gradual migration: add manifests to modules one by one, then switch to strict.

**audit** — (Reserved) Log all violations without blocking. For monitoring production behavior before switching to strict.

### Migration Path

1. Set `HTX_MODULE_POLICY=permissive` (preserves current behavior)
2. Add `manifest()` to modules one at a time
3. Remove the env var (defaults to strict) — all modules must now declare capabilities

## Capability Layers

The manifest system creates a layered capability model that mirrors the architecture's other security boundaries:

**Client → Server:** The REST representation controls what the client can see (HTML), do (forms with action tokens), and extend (WebSocket credentials in the representation).

**Client → Module API:** Channel tokens scope what data the client can access from a specific module's channel handler. A token for "kanban" cannot access "analytics."

**Module → Engine:** The manifest scopes what capabilities a module can register. A marketplace module declaring only a context provider cannot register middleware.

Each layer applies the same principle: the subject receives only the powers it was granted, and the grant is auditable. The grant mechanism differs (HTML representation, JWT token, manifest declaration) but the security model is consistent throughout.

## Use Cases

### Marketplace Modules

A template marketplace distributes modules as packages. Each package includes a manifest. The platform operator reviews the manifest before installation — a manifest that declares `middleware: true` without path scoping raises a flag. The engine enforces the declaration at runtime regardless of what code the module contains.

### Tenant-Authored Modules

In a multi-tenant platform, tenants create custom modules through an admin UI. The platform assigns `trust: "tenant"` to all tenant modules. The manifest is auto-generated from the admin UI's capability selection — if the tenant only selects "context provider," the manifest only declares `contextProviders`. The tenant's module cannot register middleware, route sources, or channel handlers even if the code attempts to.

### Agent-Generated Modules

An AI agent provides a route source for dynamic pages. The agent's module is assigned `trust: "tenant"` or `trust: "marketplace"` with a tightly scoped manifest. The engine sandboxes the module: the agent's templates go through the full resolution pipeline, but the agent cannot register middleware, cannot access unprovided adapters, and cannot claim URL paths outside its declared prefix.

## Relationship to Module Contract

The manifest is an extension of the module contract described in the specification. The module contract defines *what* a module can register (the eight registration methods). The manifest constrains *which specific instances* of those registrations a module is permitted to make. The contract is the interface; the manifest is the permission model.

Modules without manifests operate under the full contract — all eight methods, unrestricted. Modules with manifests operate under a restricted subset of the contract, enforced by the engine at boot time.
