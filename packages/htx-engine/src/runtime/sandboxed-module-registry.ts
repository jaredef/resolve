import type { ChannelHandler } from "../contracts/channel-handler";
import type { ContentAdapter } from "../contracts/content-adapter";
import type { Middleware } from "../contracts/middleware";
import type { ModuleManifest } from "../contracts/module-manifest";
import type { ContextProvider, ModuleRegistry } from "../contracts/module-registry";
import type { MutationActionHandler } from "../contracts/mutation-action-handler";
import type { RouteSource } from "../contracts/route-source";
import type { TemplateProcessor } from "../contracts/template-processor";

export interface ManifestViolation {
  module: string;
  type: string;
  name?: string;
  message: string;
}

export class SandboxedModuleRegistry implements ModuleRegistry {
  private readonly inner: ModuleRegistry;
  private readonly manifest: ModuleManifest;
  private readonly moduleName: string;
  readonly violations: ManifestViolation[] = [];

  constructor(inner: ModuleRegistry, manifest: ModuleManifest, moduleName: string) {
    this.inner = inner;
    this.manifest = manifest;
    this.moduleName = moduleName;
  }

  registerFunction(name: string, handler: (...args: unknown[]) => unknown): void {
    if (!this.manifest.functions?.includes(name)) {
      this.deny("function", name, `Function "${name}" not declared in manifest`);
      return;
    }
    this.inner.registerFunction(name, handler);
  }

  registerMiddleware(middleware: Middleware): void {
    if (!this.manifest.middleware) {
      this.deny("middleware", undefined, "Middleware registration not permitted by manifest");
      return;
    }
    if (typeof this.manifest.middleware === "object" && this.manifest.middleware.pathPrefixes) {
      const prefixes = this.manifest.middleware.pathPrefixes;
      const original = middleware;
      this.inner.registerMiddleware({
        handle(request, next) {
          if (!prefixes.some((p) => request.path.startsWith(p))) return next(request);
          return original.handle(request, next);
        },
      });
      return;
    }
    this.inner.registerMiddleware(middleware);
  }

  registerAdapter(name: string, adapter: ContentAdapter): void {
    if (!this.manifest.adapters?.includes(name)) {
      this.deny("adapter", name, `Adapter "${name}" not declared in manifest`);
      return;
    }
    this.inner.registerAdapter(name, adapter);
  }

  registerContextProvider(name: string, provider: ContextProvider): void {
    if (!this.manifest.contextProviders?.includes(name)) {
      this.deny("contextProvider", name, `Context provider "${name}" not declared in manifest`);
      return;
    }
    this.inner.registerContextProvider(name, provider);
  }

  registerTemplateProcessor(processor: TemplateProcessor): void {
    if (!this.manifest.templateProcessors) {
      this.deny("templateProcessor", undefined, "Template processor registration not permitted");
      return;
    }
    this.inner.registerTemplateProcessor(processor);
  }

  registerMutationHandler(handler: MutationActionHandler): void {
    if (!this.manifest.mutationHandlers) {
      this.deny("mutationHandler", undefined, "Mutation handler registration not permitted");
      return;
    }
    this.inner.registerMutationHandler(handler);
  }

  registerChannelHandler(handler: ChannelHandler): void {
    const handlerName = handler.module();
    if (!this.manifest.channelHandlers?.includes(handlerName)) {
      this.deny("channelHandler", handlerName, `Channel handler "${handlerName}" not declared in manifest`);
      return;
    }
    this.inner.registerChannelHandler(handler);
  }

  registerRouteSource(source: RouteSource): void {
    if (!this.manifest.routeSources) {
      this.deny("routeSource", undefined, "Route source registration not permitted");
      return;
    }
    if (typeof this.manifest.routeSources === "object" && this.manifest.routeSources.pathPrefixes) {
      const prefixes = this.manifest.routeSources.pathPrefixes;
      const original = source;
      this.inner.registerRouteSource({
        async resolve(path) {
          if (!prefixes.some((p) => path.startsWith(p))) return null;
          return original.resolve(path);
        },
      });
      return;
    }
    this.inner.registerRouteSource(source);
  }

  private deny(type: string, name: string | undefined, message: string): void {
    this.violations.push({ module: this.moduleName, type, name, message });
  }
}
