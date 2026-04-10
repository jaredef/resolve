import { existsSync, mkdirSync, readFileSync } from "node:fs";
import path from "node:path";

import {
  AdapterRegistry,
  ActionTokenService,
  ComponentResolver,
  DeleteContentExecutor,
  DSLParser,
  ExpressionEngine,
  formatDiagnosticLog,
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
  toDiagnosticError,
} from "@htx/engine";
import { MarkdownAdapter } from "@htx/adapter-markdown";
import { SQLiteAdapter } from "@htx/adapter-sqlite";

import { ArgParser } from "../arg-parser";
import type { Command } from "../command";
import { INTERNAL_WATCH_CHILD_ENV } from "../dev-supervisor";
import { defaultConfig, type AdapterConfig, type ProjectConfig } from "../project-config";

type ErrorMode = "dev" | "prod";

function findProjectRoot(startDir: string): string | null {
  let currentDir = path.resolve(startDir);

  while (true) {
    if (existsSync(path.join(currentDir, "htx.config.json"))) {
      return currentDir;
    }

    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) {
      return null;
    }
    currentDir = parentDir;
  }
}

function loadConfig(projectRoot: string): ProjectConfig {
  const configPath = path.join(projectRoot, "htx.config.json");
  const raw = JSON.parse(readFileSync(configPath, "utf8")) as Partial<ProjectConfig>;
  if (!raw.adapters || typeof raw.adapters !== "object") {
    throw new Error('htx.config.json must define an "adapters" object.');
  }
  return { ...defaultConfig(), ...raw };
}

function parseErrorMode(parsed: ArgParser): ErrorMode {
  const devErrors = parsed.has("dev-errors");
  const prodErrors = parsed.has("prod-errors");

  if (devErrors && prodErrors) {
    throw new Error("Choose only one of --dev-errors or --prod-errors.");
  }

  return prodErrors ? "prod" : "dev";
}

function assertInternalWatchChildAccess(parsed: ArgParser): void {
  if (!parsed.has("watch-child")) {
    return;
  }

  if (process.env[INTERNAL_WATCH_CHILD_ENV] === "1") {
    return;
  }

  throw new Error("--watch-child is reserved for the internal dev supervisor.");
}

function adapterPaths(projectRoot: string, config: AdapterConfig): string[] {
  if (config.driver === "sqlite") {
    return [path.join(projectRoot, config.databasePath)];
  }

  return [path.join(projectRoot, config.contentRoot)];
}

function createRegistry(projectRoot: string, config: ProjectConfig): AdapterRegistry {
  const entries = Object.fromEntries(
    Object.entries(config.adapters).map(([key, adapterConfig]) => {
      if (adapterConfig.driver === "sqlite") {
        const databasePath = path.join(projectRoot, adapterConfig.databasePath);
        mkdirSync(path.dirname(databasePath), { recursive: true });
        return [
          key,
          {
            driver: adapterConfig.driver,
            adapter: new SQLiteAdapter(databasePath),
          },
        ];
      }

      return [
        key,
        {
          driver: adapterConfig.driver,
          adapter: new MarkdownAdapter(path.join(projectRoot, adapterConfig.contentRoot)),
        },
      ];
    }),
  );

  return new AdapterRegistry(entries);
}

function createHandler(projectRoot: string, config: ProjectConfig, options: { dev?: boolean } = {}): RequestHandler {
  const templatesDir = path.join(projectRoot, config.templatesDir);
  const parser = new DSLParser();
  const expressionEngine = new ExpressionEngine();
  const hydrator = new Hydrator();
  const router = new Router();
  const layoutResolver = new LayoutResolver();
  const includeResolver = new IncludeResolver();
  const letResolver = new LetResolver(expressionEngine);
  const componentResolver = new ComponentResolver(templatesDir, expressionEngine, includeResolver);
  const registry = createRegistry(projectRoot, config);
  const tokenService = new ActionTokenService(config.secretKey);
  const replayGuard = new InMemoryReplayGuard();
  const getExecutor = new GetContentExecutor(parser, registry, hydrator, expressionEngine, {
    dev: options.dev,
  });
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

  return new RequestHandler(
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
    templatesDir,
    setExecutor,
    deleteExecutor,
    { dev: options.dev },
  );
}

export class ServeCommand implements Command {
  name(): string {
    return "serve";
  }

  description(): string {
    return "Start the direct server";
  }

  protected watchByDefault(): boolean {
    return false;
  }

  async run(args: string[]): Promise<number> {
    const parsed = new ArgParser(args);
    assertInternalWatchChildAccess(parsed);
    const host = parsed.get("host", "127.0.0.1") ?? "127.0.0.1";
    const port = Number(parsed.get("port", "3000") ?? "3000");
    const cwd = parsed.get("cwd", process.cwd()) ?? process.cwd();
    const dryRun = parsed.has("dry-run");
    const errorMode = parseErrorMode(parsed);
    const devDiagnostics = errorMode === "dev";

    const projectRoot = findProjectRoot(cwd);
    if (!projectRoot) {
      console.error("Error: Could not find project root (no htx.config.json found).");
      console.error("Run this command from within an HTX project directory.");
      return 1;
    }

    const config = loadConfig(projectRoot);
    const publicDir = path.join(projectRoot, config.publicDir);
    if (!existsSync(publicDir)) {
      console.error(`Error: No public directory found in ${projectRoot}`);
      return 1;
    }

    let handler: RequestHandler;
    let hostAdapter: HttpHost;

    try {
      handler = createHandler(projectRoot, config, { dev: devDiagnostics });
      hostAdapter = new HttpHost(handler, publicDir);
    } catch (error) {
      console.error(
        formatDiagnosticLog(
          toDiagnosticError(error, {
            code: "RUNTIME_STARTUP_ERROR",
            stage: "serve-startup",
            sourcePath: projectRoot,
          }),
        ),
      );
      return 1;
    }

    console.log("");
    console.log("HTX Server");
    console.log(`Local:   http://${host}:${port}`);
    console.log(`Root:    ${projectRoot}`);
    console.log(`Public:  ${publicDir}`);
    console.log(`Errors:  ${errorMode}`);
    console.log("Adapters:");
    for (const [key, adapterConfig] of Object.entries(config.adapters)) {
      const resolvedPaths = adapterPaths(projectRoot, adapterConfig).map((value) => path.relative(projectRoot, value));
      const locationLabel =
        adapterConfig.driver === "sqlite"
          ? `db=${resolvedPaths[0]}`
          : `content=${resolvedPaths[0]}`;
      console.log(`  ${key}: ${adapterConfig.driver} (${locationLabel})`);
    }

    if (dryRun) {
      console.log("Dry run complete.");
      return 0;
    }

    Bun.serve({
      hostname: host,
      port,
      fetch(request) {
        return hostAdapter.handle(request);
      },
    });

    console.log("Press Ctrl+C to stop.");
    return await new Promise<number>(() => {});
  }
}

export { createHandler, defaultConfig, findProjectRoot, loadConfig, parseErrorMode };
