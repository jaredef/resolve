export interface SqliteAdapterConfig {
  driver: "sqlite";
  databasePath: string;
}

export interface MarkdownAdapterConfig {
  driver: "markdown";
  contentRoot: string;
}

export type AdapterConfig = SqliteAdapterConfig | MarkdownAdapterConfig;

export interface ProjectConfig {
  appName: string;
  templatesDir: string;
  publicDir: string;
  secretKey: string;
  adapters: Record<string, AdapterConfig>;
}

export function defaultConfig(): ProjectConfig {
  return {
    appName: "HTX App",
    templatesDir: "app/templates",
    publicDir: "app/public",
    secretKey: "dev-secret-key-at-least-32-bytes-long",
    adapters: {
      default: {
        driver: "sqlite",
        databasePath: "app/data/content.sqlite",
      },
    },
  };
}
