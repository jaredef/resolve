import { ArgParser } from "../arg-parser";
import type { Command } from "../command";
import { type ScaffoldVariant, scaffoldProject } from "../scaffold";

function parseVariant(parsed: ArgParser): ScaffoldVariant {
  const variants: ScaffoldVariant[] = ["minimal", "cms", "blog", "docs"];
  const selected = variants.filter((variant) => parsed.has(variant));
  const legacySelected = parsed.has("showcase") ? ["showcase"] : [];

  if (selected.length + legacySelected.length > 1) {
    throw new Error("Choose only one of --minimal, --cms, --showcase, --blog, or --docs.");
  }

  return selected[0] ?? "cms";
}

export class NewCommand implements Command {
  name(): string {
    return "new";
  }

  description(): string {
    return "Create a new HTX project scaffold";
  }

  run(args: string[]): number {
    const parsed = new ArgParser(args);
    const projectName = parsed.arg(0);

    if (!projectName) {
      console.error("Error: Project name is required.");
      console.error("Usage: htx new <project-name> [--local|--published] [--minimal|--cms|--showcase|--blog|--docs]");
      return 1;
    }

    if (parsed.has("local") && parsed.has("published")) {
      console.error("Error: Choose either --local or --published, not both.");
      return 1;
    }

    try {
      const variant = parseVariant(parsed);
      scaffoldProject({
        projectName,
        dependencyMode: parsed.has("published") ? "published" : "local",
        variant,
      });
      return 0;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`Error: ${message}`);
      return 1;
    }
  }
}
