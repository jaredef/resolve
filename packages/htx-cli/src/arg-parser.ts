export class ArgParser {
  private readonly flags: Record<string, string> = {};
  private readonly positionalArgs: string[] = [];

  constructor(args: string[]) {
    for (let index = 0; index < args.length; index += 1) {
      const arg = args[index];

      if (!arg.startsWith("--")) {
        this.positionalArgs.push(arg);
        continue;
      }

      if (arg.includes("=")) {
        const [key, value] = arg.slice(2).split("=", 2);
        this.flags[key] = value;
        continue;
      }

      const nextArg = args[index + 1];
      if (nextArg && !nextArg.startsWith("--")) {
        this.flags[arg.slice(2)] = nextArg;
        index += 1;
        continue;
      }

      this.flags[arg.slice(2)] = "";
    }
  }

  get(key: string, defaultValue: string | null = null): string | null {
    return this.flags[key] ?? defaultValue;
  }

  has(key: string): boolean {
    return Object.hasOwn(this.flags, key);
  }

  positional(): string[] {
    return [...this.positionalArgs];
  }

  arg(index: number, defaultValue: string | null = null): string | null {
    return this.positionalArgs[index] ?? defaultValue;
  }

  allFlags(): Record<string, string> {
    return { ...this.flags };
  }
}
