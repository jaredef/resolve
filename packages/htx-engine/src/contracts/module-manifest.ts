export type ModuleTrustLevel = "first-party" | "marketplace" | "tenant";

export type ModulePolicy = "strict" | "permissive" | "audit";

export interface ModuleManifest {
  trust: ModuleTrustLevel;
  functions?: string[];
  middleware?: boolean | { pathPrefixes: string[] };
  adapters?: string[];
  contextProviders?: string[];
  templateProcessors?: boolean;
  mutationHandlers?: boolean | { actions: string[] };
  channelHandlers?: string[];
  routeSources?: boolean | { pathPrefixes: string[] };
}
