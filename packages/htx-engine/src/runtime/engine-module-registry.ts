import type { ChannelHandler } from "../contracts/channel-handler";
import type { RouteSource } from "../contracts/route-source";
import type { ContentAdapter } from "../contracts/content-adapter";
import type { Middleware } from "../contracts/middleware";
import type { Module } from "../contracts/module";
import type { ModulePolicy } from "../contracts/module-manifest";
import type { ContextProvider, ModuleRegistry } from "../contracts/module-registry";
import type { MutationActionHandler } from "../contracts/mutation-action-handler";
import type { TemplateProcessor } from "../contracts/template-processor";
import { SandboxedModuleRegistry, type ManifestViolation } from "./sandboxed-module-registry";

export interface ModuleBootError {
  module: string;
  error: Error;
}

export class EngineModuleRegistry implements ModuleRegistry {
  readonly functions = new Map<string, (...args: unknown[]) => unknown>();
  readonly middleware: Middleware[] = [];
  readonly adapters = new Map<string, ContentAdapter>();
  readonly contextProviders = new Map<string, ContextProvider>();
  readonly templateProcessors: TemplateProcessor[] = [];
  readonly mutationHandlers: MutationActionHandler[] = [];
  readonly channelHandlers = new Map<string, ChannelHandler>();
  readonly routeSources: RouteSource[] = [];
  readonly bootErrors: ModuleBootError[] = [];
  readonly manifestViolations: ManifestViolation[] = [];

  registerFunction(name: string, handler: (...args: unknown[]) => unknown): void {
    if (this.functions.has(name)) {
      console.warn(`[HTX] Module warning: function "${name}" is being overwritten by another module`);
    }
    this.functions.set(name, handler);
  }

  registerMiddleware(middleware: Middleware): void {
    this.middleware.push(middleware);
  }

  registerAdapter(name: string, adapter: ContentAdapter): void {
    if (this.adapters.has(name)) {
      console.warn(`[HTX] Module warning: adapter "${name}" is being overwritten by another module`);
    }
    this.adapters.set(name, adapter);
  }

  registerContextProvider(name: string, provider: ContextProvider): void {
    if (this.contextProviders.has(name)) {
      console.warn(`[HTX] Module warning: context provider "${name}" is being overwritten by another module`);
    }
    this.contextProviders.set(name, provider);
  }

  registerTemplateProcessor(processor: TemplateProcessor): void {
    this.templateProcessors.push(processor);
  }

  registerMutationHandler(handler: MutationActionHandler): void {
    this.mutationHandlers.push(handler);
  }

  registerRouteSource(source: RouteSource): void {
    this.routeSources.push(source);
  }

  registerChannelHandler(handler: ChannelHandler): void {
    const name = handler.module();
    if (this.channelHandlers.has(name)) {
      console.warn(`[HTX] Module warning: channel handler "${name}" is being overwritten by another module`);
    }
    this.channelHandlers.set(name, handler);
  }

  bootAll(modules: Module[]): void {
    const policy: ModulePolicy = (process.env.HTX_MODULE_POLICY as ModulePolicy) || "strict";

    for (const mod of modules) {
      try {
        const manifest = mod.manifest?.();

        if (!manifest) {
          // No manifest
          if (policy === "strict") {
            console.error(`[HTX] Module "${mod.name()}" has no manifest. Required by HTX_MODULE_POLICY=strict. Set HTX_MODULE_POLICY=permissive to bypass.`);
            this.bootErrors.push({ module: mod.name(), error: new Error("No manifest (policy: strict)") });
            continue;
          }
          // permissive or audit: allow full access
          mod.boot(this);
          console.log(`[HTX] Module booted: ${mod.name()} (unmanifested, policy: ${policy})`);
          continue;
        }

        // Has manifest — sandbox non-first-party modules
        if (manifest.trust === "first-party") {
          mod.boot(this);
          console.log(`[HTX] Module booted: ${mod.name()}`);
        } else {
          const sandbox = new SandboxedModuleRegistry(this, manifest, mod.name());
          mod.boot(sandbox);

          if (sandbox.violations.length > 0) {
            for (const v of sandbox.violations) {
              this.manifestViolations.push(v);
              console.warn(`[HTX] Manifest violation in "${v.module}": ${v.message}`);
            }
          }
          console.log(`[HTX] Module booted: ${mod.name()} (${manifest.trust}, ${sandbox.violations.length} violations)`);
        }
      } catch (error) {
        const resolved = error instanceof Error ? error : new Error(String(error));
        this.bootErrors.push({ module: mod.name(), error: resolved });
        console.error(`[HTX] Module boot failed: ${mod.name()} - ${resolved.message}`);
      }
    }

    if (this.bootErrors.length > 0) {
      console.warn(`[HTX] ${this.bootErrors.length} module(s) failed to boot. App may be degraded.`);
    }
    if (this.manifestViolations.length > 0) {
      console.warn(`[HTX] ${this.manifestViolations.length} manifest violation(s). Violating registrations were dropped.`);
    }
  }
}
