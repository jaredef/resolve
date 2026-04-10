export interface Command {
  name(): string;
  description(): string;
  run(args: string[]): number | Promise<number>;
}
