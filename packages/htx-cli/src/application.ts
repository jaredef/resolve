import type { Command } from "./command";

export class Application {
  private readonly name: string;
  private readonly version: string;
  private readonly commands = new Map<string, Command>();

  constructor(name = "HTX", version = "0.1.0") {
    this.name = name;
    this.version = version;
  }

  register(command: Command): this {
    this.commands.set(command.name(), command);
    return this;
  }

  async run(argv: string[]): Promise<number> {
    const commandName = argv[1] ?? null;
    const args = argv.slice(2);

    if (!commandName || commandName === "help" || commandName === "--help") {
      console.log(this.helpText());
      return 0;
    }

    if (commandName === "--version" || commandName === "version") {
      console.log(`${this.name} v${this.version}`);
      return 0;
    }

    const command = this.commands.get(commandName);
    if (!command) {
      console.error(`Error: Unknown command: ${commandName}`);
      console.log("");
      console.log(this.helpText());
      return 1;
    }

    try {
      return await command.run(args);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`Error: ${message}`);
      return 1;
    }
  }

  getCommand(name: string): Command | undefined {
    return this.commands.get(name);
  }

  getCommands(): Command[] {
    return [...this.commands.values()];
  }

  private helpText(): string {
    const commands = [...this.commands.values()];
    const maxLength = commands.reduce((length, command) => Math.max(length, command.name().length), 0);

    const lines = [
      `${this.name} v${this.version}`,
      "The declarative hypermedia engine",
      "",
      "Usage: htx <command> [options] [arguments]",
      "",
      "Available commands:",
      ...commands.map(
        (command) => `  ${command.name().padEnd(maxLength + 2)}${command.description()}`,
      ),
      "",
    ];

    return lines.join("\n");
  }
}
