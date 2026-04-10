import type { ModuleManifest } from "./module-manifest";
import type { ModuleRegistry } from "./module-registry";
import type { MaybePromise } from "../runtime/types";

export interface Module {
  name(): string;
  boot(registry: ModuleRegistry): void;
  manifest?(): ModuleManifest;
  onReady?(): MaybePromise<void>;
  onShutdown?(): MaybePromise<void>;
}
