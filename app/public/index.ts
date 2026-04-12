import { mkdirSync } from "node:fs";
import path from "node:path";

import {
  AdapterRegistry,
  ActionTokenService,
  ComponentResolver,
  DeleteContentExecutor,
  DSLParser,
  ExpressionEngine,
  GetContentExecutor,
  HttpHost,
  Hydrator,
  IncludeResolver,
  InMemoryReplayGuard,
  LayoutResolver,
  LetResolver,
  RequestHandler,
  Router,
  SetContentExecutor,
} from "@htx/engine";
import { SQLiteAdapter } from "@htx/adapter-sqlite";
import { ConvexAdapter } from "../../packages/htx-adapter-convex/src/index";
import { api } from "../../packages/htx-adapter-convex/convex/_generated/api";

import { createDogfoodAppConfig, type DogfoodAppConfig } from "../config";
import { CartModule } from "../modules/cart-module";
import { StoreContextModule } from "../modules/store-context-module";
import { ConvexStoreContextModule } from "../modules/convex-store-context-module";
import { BetterAuthModule } from "../modules/better-auth-module";
import { DocsContextModule } from "../modules/docs-context-module";

export interface DogfoodAppRuntime {
  config: DogfoodAppConfig;
  adapter: SQLiteAdapter;
  handler: RequestHandler;
  host: HttpHost;
}

export function createDogfoodAppRuntime(
  overrides: Partial<DogfoodAppConfig> = {},
): DogfoodAppRuntime {
  const config = createDogfoodAppConfig(overrides);
  mkdirSync(path.dirname(config.databasePath), { recursive: true });

  const adapter = new SQLiteAdapter(config.databasePath);
  const expressionEngine = new ExpressionEngine();
  const hydrator = new Hydrator();
  const parser = new DSLParser();
  const router = new Router();
  const layoutResolver = new LayoutResolver();
  const includeResolver = new IncludeResolver();
  const letResolver = new LetResolver(expressionEngine);
  const componentResolver = new ComponentResolver(config.templatesDir, expressionEngine, includeResolver);
  const tokenService = new ActionTokenService(config.secretKey);
  const replayGuard = new InMemoryReplayGuard();
  const convexUrl = process.env.CONVEX_URL;
  if (!convexUrl) {
    throw new Error(
      "CONVEX_URL is required (Convex deployment URL). Example: export CONVEX_URL=https://your-deployment.convex.cloud — see packages/htx-adapter-convex/.env.local.example",
    );
  }
  const convexAdapter = new ConvexAdapter({ url: convexUrl }, api);
  const registry = new AdapterRegistry({
    default: adapter,
    convex_test: convexAdapter,
    "fp-collection": convexAdapter,
    "fp-category": convexAdapter,
    "fp-product": convexAdapter,
  });

  const getExecutor = new GetContentExecutor(parser, registry, hydrator, expressionEngine, { dev: true });
  const setExecutor = new SetContentExecutor(
    parser,
    registry,
    hydrator,
    expressionEngine,
    tokenService,
    replayGuard,
  );
  const deleteExecutor = new DeleteContentExecutor(
    parser,
    registry,
    hydrator,
    tokenService,
    replayGuard,
  );

  const handler = new RequestHandler(
    router,
    parser,
    expressionEngine,
    hydrator,
    registry,
    layoutResolver,
    includeResolver,
    letResolver,
    componentResolver,
    getExecutor,
    config.templatesDir,
    setExecutor,
    deleteExecutor,
    {
      dev: true,
      modules: [
        new BetterAuthModule({
          databasePath: path.resolve(path.dirname(config.databasePath), "auth.sqlite"),
          baseURL: process.env.HTX_BASE_URL ?? "http://127.0.0.1:3000",
          secret: config.adminSessionSecret,
          requireAuth: true,
          loginPath: "/admin/login",
          disableSignup: true,
        }),
        new CartModule(adapter),
        new StoreContextModule(adapter, config.databasePath),
        new DocsContextModule(config.databasePath),
        new ConvexStoreContextModule(convexUrl, api),
      ],
    },
  );

  return {
    config,
    adapter,
    handler,
    host: new HttpHost(handler, config.publicDir),
  };
}

export async function handleDogfoodRequest(
  request: Request,
  overrides: Partial<DogfoodAppConfig> = {},
): Promise<Response> {
  const runtime = createDogfoodAppRuntime(overrides);
  return runtime.host.handle(request);
}

if (import.meta.main) {
  const runtime = createDogfoodAppRuntime();
  const hostname = process.env.HTX_HOST ?? "127.0.0.1";
  const port = Number(process.env.HTX_PORT ?? "3000");

  console.log(`HTX Dogfood App listening on http://${hostname}:${port}`);

  Bun.serve({
    hostname,
    port,
    fetch(request) {
      return runtime.host.handle(request);
    },
  });
}
