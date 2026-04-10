import { ArgParser } from "../arg-parser";
import { DevSupervisor } from "../dev-supervisor";
import { ServeCommand } from "./serve-command";
import { findProjectRoot, loadConfig, parseErrorMode } from "./serve-command";

export class DevCommand extends ServeCommand {
  override name(): string {
    return "dev";
  }

  override description(): string {
    return "Start the watching development server";
  }

  protected override watchByDefault(): boolean {
    return true;
  }

  override async run(args: string[]): Promise<number> {
    const parsed = new ArgParser(args);
    if (parsed.has("watch-child")) {
      return await super.run(args);
    }

    const dryRun = parsed.has("dry-run");
    const noWatch = parsed.has("no-watch");

    if (!dryRun && this.watchByDefault() && !noWatch) {
      const cwd = parsed.get("cwd", process.cwd()) ?? process.cwd();
      const host = parsed.get("host", "127.0.0.1") ?? "127.0.0.1";
      const port = Number(parsed.get("port", "3000") ?? "3000");
      const errorMode = parseErrorMode(parsed);
      const projectRoot = findProjectRoot(cwd);

      if (!projectRoot) {
        return await super.run(args);
      }

      const config = loadConfig(projectRoot);
      const supervisor = new DevSupervisor({
        projectRoot,
        host,
        port,
        errorMode,
      });
      return await supervisor.run(config);
    }

    return await super.run(args);
  }
}
