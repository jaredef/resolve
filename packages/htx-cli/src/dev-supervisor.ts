import { existsSync, readdirSync, statSync, watch, type FSWatcher } from "node:fs";
import path from "node:path";

import type { ProjectConfig } from "./project-config";

const CLI_BIN_PATH = path.resolve(import.meta.dir, "../bin/htx");
const RESTART_DEBOUNCE_MS = 150;

export const INTERNAL_WATCH_CHILD_ENV = "HTX_INTERNAL_WATCH_CHILD";

interface SpawnedProcess {
  kill(signal?: number | NodeJS.Signals): void;
  exited: Promise<number>;
}

export interface DevSupervisorOptions {
  projectRoot: string;
  host: string;
  port: number;
  errorMode: "dev" | "prod";
}

function shouldIgnoreDirectory(dirPath: string): boolean {
  const name = path.basename(dirPath);
  return name === "node_modules" || name === ".git" || name === ".cursor";
}

function shouldIgnoreFile(filePath: string): boolean {
  const normalized = filePath.split(path.sep).join("/");
  return (
    normalized.includes("/node_modules/") ||
    normalized.includes("/.git/") ||
    normalized.includes("/.cursor/") ||
    /\.sqlite(?:-wal|-shm)?$/i.test(normalized) ||
    /\.db(?:-wal|-shm)?$/i.test(normalized)
  );
}

function collectDirectories(root: string, output = new Set<string>()): Set<string> {
  if (!existsSync(root)) {
    return output;
  }

  let stats;
  try {
    stats = statSync(root);
  } catch {
    return output;
  }

  if (!stats.isDirectory() || shouldIgnoreDirectory(root)) {
    return output;
  }

  if (output.has(root)) {
    return output;
  }

  output.add(root);

  for (const entry of readdirSync(root, { withFileTypes: true })) {
    if (!entry.isDirectory()) {
      continue;
    }

    collectDirectories(path.join(root, entry.name), output);
  }

  return output;
}

export function resolveWatchRoots(projectRoot: string, config: ProjectConfig): string[] {
  const roots = new Set<string>([
    projectRoot,
    path.join(projectRoot, "app"),
    path.join(projectRoot, config.templatesDir),
    path.join(projectRoot, config.publicDir),
  ]);

  for (const adapterConfig of Object.values(config.adapters)) {
    if (adapterConfig.driver === "markdown") {
      roots.add(path.join(projectRoot, adapterConfig.contentRoot));
    } else {
      roots.add(path.dirname(path.join(projectRoot, adapterConfig.databasePath)));
    }
  }

  return [...roots].filter((candidate) => existsSync(candidate));
}

function relativeDisplayPath(projectRoot: string, filePath: string): string {
  const relativePath = path.relative(projectRoot, filePath);
  return relativePath === "" ? "." : relativePath;
}

export class DevSupervisor {
  private readonly projectRoot: string;
  private readonly host: string;
  private readonly port: number;
  private readonly errorMode: "dev" | "prod";
  private readonly watchers = new Map<string, FSWatcher>();
  private child: SpawnedProcess | null = null;
  private restarting = false;
  private stopping = false;
  private pendingChangePath: string | null = null;
  private restartTimer: ReturnType<typeof setTimeout> | null = null;
  private rescanTimer: ReturnType<typeof setTimeout> | null = null;
  private signalHandlersInstalled = false;

  constructor(options: DevSupervisorOptions) {
    this.projectRoot = options.projectRoot;
    this.host = options.host;
    this.port = options.port;
    this.errorMode = options.errorMode;
  }

  async run(config: ProjectConfig): Promise<number> {
    this.installSignalHandlers();
    this.syncWatchers(config);
    console.log(`[htx:dev] Watching for changes in ${this.projectRoot}`);
    this.startChild();
    return await new Promise<number>(() => {});
  }

  private installSignalHandlers(): void {
    if (this.signalHandlersInstalled) {
      return;
    }

    this.signalHandlersInstalled = true;
    const shutdown = async (signal: NodeJS.Signals) => {
      if (this.stopping) {
        return;
      }

      this.stopping = true;
      console.log(`[htx:dev] Received ${signal}. Stopping dev server...`);
      this.clearTimers();
      this.closeWatchers();
      await this.stopChild(signal);
      process.exit(0);
    };

    process.on("SIGINT", () => void shutdown("SIGINT"));
    process.on("SIGTERM", () => void shutdown("SIGTERM"));
  }

  private clearTimers(): void {
    if (this.restartTimer) {
      clearTimeout(this.restartTimer);
      this.restartTimer = null;
    }

    if (this.rescanTimer) {
      clearTimeout(this.rescanTimer);
      this.rescanTimer = null;
    }
  }

  private closeWatchers(): void {
    for (const watcher of this.watchers.values()) {
      watcher.close();
    }

    this.watchers.clear();
  }

  private syncWatchers(config: ProjectConfig): void {
    const nextDirectories = new Set<string>();
    for (const root of resolveWatchRoots(this.projectRoot, config)) {
      collectDirectories(root, nextDirectories);
    }

    for (const [dirPath, watcher] of this.watchers.entries()) {
      if (nextDirectories.has(dirPath)) {
        continue;
      }

      watcher.close();
      this.watchers.delete(dirPath);
    }

    for (const dirPath of nextDirectories) {
      if (this.watchers.has(dirPath)) {
        continue;
      }

      try {
        const watcher = watch(dirPath, (_eventType, filename) => {
          const resolvedPath =
            filename && filename.length > 0
              ? path.join(dirPath, filename.toString())
              : dirPath;

          if (shouldIgnoreFile(resolvedPath)) {
            return;
          }

          this.scheduleRescan(config);
          this.scheduleRestart(resolvedPath);
        });
        this.watchers.set(dirPath, watcher);
      } catch {
        // Best effort watch registration keeps the dev server resilient.
      }
    }
  }

  private scheduleRescan(config: ProjectConfig): void {
    if (this.rescanTimer) {
      clearTimeout(this.rescanTimer);
    }

    this.rescanTimer = setTimeout(() => {
      this.syncWatchers(config);
    }, RESTART_DEBOUNCE_MS);
  }

  private scheduleRestart(filePath: string): void {
    this.pendingChangePath = filePath;
    if (this.restartTimer) {
      clearTimeout(this.restartTimer);
    }

    this.restartTimer = setTimeout(() => {
      const changedPath = this.pendingChangePath ?? this.projectRoot;
      this.pendingChangePath = null;
      void this.restart(changedPath);
    }, RESTART_DEBOUNCE_MS);
  }

  private startChild(): void {
    const child = Bun.spawn({
      cmd: [
        process.execPath,
        CLI_BIN_PATH,
        "serve",
        "--watch-child",
        "--cwd",
        this.projectRoot,
        "--host",
        this.host,
        "--port",
        String(this.port),
        this.errorMode === "prod" ? "--prod-errors" : "--dev-errors",
      ],
      cwd: this.projectRoot,
      stdin: "inherit",
      stdout: "inherit",
      stderr: "inherit",
      env: {
        ...process.env,
        [INTERNAL_WATCH_CHILD_ENV]: "1",
      },
    });

    this.child = child;
    void child.exited.then((code) => {
      if (this.stopping || this.restarting) {
        return;
      }

      console.log(`[htx:dev] Server process exited with code ${code}. Waiting for changes...`);
    });
  }

  private async stopChild(signal: NodeJS.Signals = "SIGTERM"): Promise<void> {
    if (!this.child) {
      return;
    }

    const child = this.child;
    this.child = null;
    child.kill(signal);
    await child.exited;
  }

  private async restart(changedPath: string): Promise<void> {
    if (this.restarting || this.stopping) {
      this.pendingChangePath = changedPath;
      return;
    }

    this.restarting = true;
    const displayPath = relativeDisplayPath(this.projectRoot, changedPath);
    console.log(`[htx:dev] Change detected: ${displayPath}`);
    console.log("[htx:dev] Restarting server...");

    await this.stopChild();
    this.startChild();
    console.log("[htx:dev] Server restarted.");

    this.restarting = false;

    if (this.pendingChangePath) {
      const queuedPath = this.pendingChangePath;
      this.pendingChangePath = null;
      this.scheduleRestart(queuedPath);
    }
  }
}
