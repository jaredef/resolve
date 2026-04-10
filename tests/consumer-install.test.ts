import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { expect, test } from "bun:test";

const rootDir = path.resolve(import.meta.dir, "..");
const engineDir = path.join(rootDir, "packages/htx-engine");
const markdownDir = path.join(rootDir, "packages/htx-adapter-markdown");
const sqliteDir = path.join(rootDir, "packages/htx-adapter-sqlite");
const cliDir = path.join(rootDir, "packages/htx-cli");
const createDir = path.join(rootDir, "packages/create-hypermedia-app");
const bunBinDir = path.dirname(process.execPath);

function runCommand(cmd: string[], cwd: string, env?: Record<string, string>) {
  const result = Bun.spawnSync({
    cmd,
    cwd,
    stdout: "pipe",
    stderr: "pipe",
    env,
  });

  return {
    exitCode: result.exitCode,
    stdout: new TextDecoder().decode(result.stdout),
    stderr: new TextDecoder().decode(result.stderr),
  };
}

function writePackageJson(filePath: string, data: unknown): void {
  writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n");
}

function writeCmsSmokeScript(projectDir: string): string {
  const scriptPath = path.join(projectDir, "cms-smoke.ts");
  writeFileSync(
    scriptPath,
    `import { createCmsAppRuntime } from "./app/public/index";

const runtime = createCmsAppRuntime();

try {
  const homeResponse = await runtime.host.handle(new Request("http://example.test/"));
  const pageResponse = await runtime.host.handle(new Request("http://example.test/pages/about"));
  const postResponse = await runtime.host.handle(
    new Request("http://example.test/posts/why-hypermedia-app-starts-with-htx-files"),
  );
  const adminRedirectResponse = await runtime.host.handle(
    new Request("http://example.test/admin/posts"),
  );
  const loginResponse = await runtime.host.handle(
    new Request("http://example.test/admin/login", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        username: "admin",
        password: "admin",
        next: "/admin/posts",
      }),
    }),
  );
  const sessionCookie = loginResponse.headers.get("set-cookie")?.split(";")[0] ?? "";
  const adminResponse = await runtime.host.handle(
    new Request("http://example.test/admin/posts", {
      headers: { cookie: sessionCookie },
    }),
  );

  const homeHtml = await homeResponse.text();
  const pageHtml = await pageResponse.text();
  const postHtml = await postResponse.text();
  const adminHtml = await adminResponse.text();

  console.log(
    JSON.stringify({
      homeStatus: homeResponse.status,
      pageStatus: pageResponse.status,
      postStatus: postResponse.status,
      adminRedirectStatus: adminRedirectResponse.status,
      loginStatus: loginResponse.status,
      adminStatus: adminResponse.status,
      homeOk: homeHtml.includes("A real HTX app from the first install"),
      pageOk: pageHtml.includes("About") && pageHtml.includes("CMS starter"),
      postOk: postHtml.includes("Why Hypermedia App Starts With HTX Files"),
      adminOk: adminHtml.includes("All posts"),
    }),
  );
} finally {
  runtime.adapter.getDatabase().close(false);
}
`,
  );
  return scriptPath;
}

test("workspace packages install and run from a clean consumer project", () => {
  const projectDir = mkdtempSync(path.join(os.tmpdir(), "htx-consumer-"));

  try {
    writePackageJson(path.join(projectDir, "package.json"), {
      name: "htx-consumer",
      private: true,
      type: "module",
      dependencies: {
        "@htx/engine": `file:${engineDir}`,
        "@htx/adapter-sqlite": `file:${sqliteDir}`,
        "@htx/cli": `file:${cliDir}`,
      },
      overrides: {
        "@htx/adapter-markdown": `file:${markdownDir}`,
        "@htx/engine": `file:${engineDir}`,
        "@htx/adapter-sqlite": `file:${sqliteDir}`,
        "@htx/cli": `file:${cliDir}`,
      },
    });

    writeFileSync(
      path.join(projectDir, "index.ts"),
      `import { ExpressionEngine } from "@htx/engine";
import { SQLiteAdapter } from "@htx/adapter-sqlite";

const engine = new ExpressionEngine();
const adapter = new SQLiteAdapter(":memory:");
adapter.create("post", { title: "Hello World", status: "published" });

const html = engine.evaluate("{{ title }}", { title: "Consumer" });
const row = adapter.findBySlug("post", "hello-world");

console.log(JSON.stringify({ html, title: row?.title }));
`,
    );

    const install = runCommand([process.execPath, "install"], projectDir);
    expect(install.exitCode).toBe(0);

    const run = runCommand([process.execPath, "run", "index.ts"], projectDir);
    expect(run.exitCode).toBe(0);
    expect(run.stdout).toContain('"html":"Consumer"');
    expect(run.stdout).toContain('"title":"Hello World"');

    const cliBin = path.join(projectDir, "node_modules/.bin/htx");
    const cli = runCommand([cliBin, "--version"], projectDir, {
      ...process.env,
      PATH: `${bunBinDir}:${process.env.PATH ?? ""}`,
    });
    expect(cli.exitCode).toBe(0);
    expect(cli.stdout).toContain("HTX v0.1.0");
  } finally {
    rmSync(projectDir, { recursive: true, force: true });
  }
});

test("create-hypermedia-app scaffolds published deps by default and generated app runs with local overrides", () => {
  const projectDir = mkdtempSync(path.join(os.tmpdir(), "htx-create-consumer-"));

  try {
    writePackageJson(path.join(projectDir, "package.json"), {
      name: "htx-create-consumer",
      private: true,
      type: "module",
      dependencies: {
        "create-hypermedia-app": `file:${createDir}`,
      },
      overrides: {
        "create-hypermedia-app": `file:${createDir}`,
        "@htx/adapter-markdown": `file:${markdownDir}`,
        "@htx/cli": `file:${cliDir}`,
        "@htx/engine": `file:${engineDir}`,
        "@htx/adapter-sqlite": `file:${sqliteDir}`,
      },
    });

    const installCreate = runCommand([process.execPath, "install"], projectDir);
    expect(installCreate.exitCode).toBe(0);

    const create = runCommand(
      [path.join(projectDir, "node_modules/.bin/create-hypermedia-app"), "demo-app"],
      projectDir,
      {
        ...process.env,
        PATH: `${bunBinDir}:${process.env.PATH ?? ""}`,
      },
    );
    expect(create.exitCode).toBe(0);

    const generatedDir = path.join(projectDir, "demo-app");
    const generatedPackagePath = path.join(generatedDir, "package.json");
    const generatedPackage = JSON.parse(readFileSync(generatedPackagePath, "utf8")) as {
      dependencies: Record<string, string>;
      scripts?: Record<string, string>;
      overrides?: Record<string, string>;
    };

    expect(generatedPackage.dependencies["@htx/adapter-markdown"]).toBe("0.0.0");
    expect(generatedPackage.scripts?.["dev:prod-errors"]).toBe("htx dev --prod-errors");
    expect(generatedPackage.scripts?.["serve:prod-errors"]).toBe("htx serve --prod-errors");
    expect(existsSync(path.join(generatedDir, "app/public/index.ts"))).toBe(true);
    expect(existsSync(path.join(generatedDir, "app/seed.ts"))).toBe(true);
    expect(existsSync(path.join(generatedDir, "app/templates/posts/index.htx"))).toBe(true);
    expect(existsSync(path.join(generatedDir, "app/templates/pages/[slug].htx"))).toBe(true);
    expect(existsSync(path.join(generatedDir, "app/templates/admin/login/index.htx"))).toBe(true);
    expect(existsSync(path.join(generatedDir, "app/templates/admin/posts/new.htx"))).toBe(true);
    expect(existsSync(path.join(generatedDir, "app/templates/admin/pages/new.htx"))).toBe(true);
    expect(generatedPackage.dependencies["@htx/cli"]).toBe("0.0.0");
    expect(generatedPackage.dependencies["@htx/engine"]).toBe("0.0.0");
    expect(generatedPackage.dependencies["@htx/adapter-sqlite"]).toBe("0.0.0");

    writePackageJson(generatedPackagePath, {
      ...generatedPackage,
      overrides: {
        "@htx/adapter-markdown": `file:${markdownDir}`,
        "@htx/cli": `file:${cliDir}`,
        "@htx/engine": `file:${engineDir}`,
        "@htx/adapter-sqlite": `file:${sqliteDir}`,
      },
    });

    const installGenerated = runCommand([process.execPath, "install"], generatedDir);
    expect(installGenerated.exitCode).toBe(0);

    const firstSeed = runCommand([process.execPath, "run", "seed"], generatedDir);
    const secondSeed = runCommand([process.execPath, "run", "seed"], generatedDir);
    expect(firstSeed.exitCode).toBe(0);
    expect(secondSeed.exitCode).toBe(0);
    expect(secondSeed.stdout).toContain("Created: 0");

    const smokeScript = writeCmsSmokeScript(generatedDir);
    const smoke = runCommand([process.execPath, "run", smokeScript], generatedDir);
    expect(smoke.exitCode).toBe(0);
    expect(smoke.stdout).toContain('"homeStatus":200');
    expect(smoke.stdout).toContain('"pageStatus":200');
    expect(smoke.stdout).toContain('"postStatus":200');
    expect(smoke.stdout).toContain('"adminRedirectStatus":302');
    expect(smoke.stdout).toContain('"loginStatus":302');
    expect(smoke.stdout).toContain('"adminStatus":200');
    expect(smoke.stdout).toContain('"homeOk":true');
    expect(smoke.stdout).toContain('"pageOk":true');
    expect(smoke.stdout).toContain('"postOk":true');
    expect(smoke.stdout).toContain('"adminOk":true');

    const serve = runCommand(
      [path.join(generatedDir, "node_modules/.bin/htx"), "serve", "--dry-run", "--port", "4021"],
      generatedDir,
      {
        ...process.env,
        PATH: `${bunBinDir}:${process.env.PATH ?? ""}`,
      },
    );
    expect(serve.exitCode).toBe(0);
    expect(serve.stdout).toContain("http://127.0.0.1:4021");
  } finally {
    rmSync(projectDir, { recursive: true, force: true });
  }
});

test("create-hypermedia-app can scaffold a published minimal variant", () => {
  const projectDir = mkdtempSync(path.join(os.tmpdir(), "htx-create-minimal-"));

  try {
    writePackageJson(path.join(projectDir, "package.json"), {
      name: "htx-create-minimal",
      private: true,
      type: "module",
      dependencies: {
        "create-hypermedia-app": `file:${createDir}`,
      },
      overrides: {
        "create-hypermedia-app": `file:${createDir}`,
        "@htx/adapter-markdown": `file:${markdownDir}`,
        "@htx/cli": `file:${cliDir}`,
        "@htx/engine": `file:${engineDir}`,
        "@htx/adapter-sqlite": `file:${sqliteDir}`,
      },
    });

    const installCreate = runCommand([process.execPath, "install"], projectDir);
    expect(installCreate.exitCode).toBe(0);

    const create = runCommand(
      [path.join(projectDir, "node_modules/.bin/create-hypermedia-app"), "demo-app", "--minimal"],
      projectDir,
      {
        ...process.env,
        PATH: `${bunBinDir}:${process.env.PATH ?? ""}`,
      },
    );
    expect(create.exitCode).toBe(0);

    const generatedDir = path.join(projectDir, "demo-app");
    const generatedPackage = JSON.parse(readFileSync(path.join(generatedDir, "package.json"), "utf8")) as {
      scripts?: Record<string, string>;
      dependencies: Record<string, string>;
    };

    expect(existsSync(path.join(generatedDir, "app/templates/index.htx"))).toBe(true);
    expect(existsSync(path.join(generatedDir, "app/templates/about.htx"))).toBe(true);
    expect(existsSync(path.join(generatedDir, "app/seed.ts"))).toBe(false);
    expect(existsSync(path.join(generatedDir, "app/public/index.ts"))).toBe(false);
    expect(existsSync(path.join(generatedDir, "app/templates/docs/index.htx"))).toBe(false);
    expect(generatedPackage.dependencies["@htx/adapter-markdown"]).toBe("0.0.0");
    expect(generatedPackage.scripts?.seed).toBeUndefined();
    expect(generatedPackage.scripts?.["dev:prod-errors"]).toBe("htx dev --prod-errors");
    expect(generatedPackage.scripts?.["serve:prod-errors"]).toBe("htx serve --prod-errors");
    expect(generatedPackage.dependencies["@htx/cli"]).toBe("0.0.0");

    writePackageJson(path.join(generatedDir, "package.json"), {
      ...generatedPackage,
      overrides: {
        "@htx/adapter-markdown": `file:${markdownDir}`,
        "@htx/cli": `file:${cliDir}`,
        "@htx/engine": `file:${engineDir}`,
        "@htx/adapter-sqlite": `file:${sqliteDir}`,
      },
    });

    const installGenerated = runCommand([process.execPath, "install"], generatedDir);
    expect(installGenerated.exitCode).toBe(0);

    const serve = runCommand(
      [path.join(generatedDir, "node_modules/.bin/htx"), "serve", "--dry-run", "--port", "4023"],
      generatedDir,
      {
        ...process.env,
        PATH: `${bunBinDir}:${process.env.PATH ?? ""}`,
      },
    );
    expect(serve.exitCode).toBe(0);
    expect(serve.stdout).toContain("http://127.0.0.1:4023");
  } finally {
    rmSync(projectDir, { recursive: true, force: true });
  }
});

test("create-hypermedia-app can scaffold published blog and docs variants", () => {
  const projectDir = mkdtempSync(path.join(os.tmpdir(), "htx-create-markdown-"));

  try {
    writePackageJson(path.join(projectDir, "package.json"), {
      name: "htx-create-markdown",
      private: true,
      type: "module",
      dependencies: {
        "create-hypermedia-app": `file:${createDir}`,
      },
      overrides: {
        "create-hypermedia-app": `file:${createDir}`,
        "@htx/adapter-markdown": `file:${markdownDir}`,
        "@htx/cli": `file:${cliDir}`,
        "@htx/engine": `file:${engineDir}`,
        "@htx/adapter-sqlite": `file:${sqliteDir}`,
      },
    });

    const installCreate = runCommand([process.execPath, "install"], projectDir);
    expect(installCreate.exitCode).toBe(0);

    for (const [variant, expectedFile, port] of [
      ["blog", "content/post/why-flat-file-blogging-fits-htx.md", "4024"],
      ["docs", "content/documentation/welcome.md", "4025"],
    ] as const) {
      const appName = `demo-${variant}`;
      const create = runCommand(
        [path.join(projectDir, "node_modules/.bin/create-hypermedia-app"), appName, `--${variant}`],
        projectDir,
        {
          ...process.env,
          PATH: `${bunBinDir}:${process.env.PATH ?? ""}`,
        },
      );
      expect(create.exitCode).toBe(0);

      const generatedDir = path.join(projectDir, appName);
      const generatedPackagePath = path.join(generatedDir, "package.json");
      const generatedConfig = JSON.parse(readFileSync(path.join(generatedDir, "htx.config.json"), "utf8")) as {
        adapters: {
          default: {
            driver: string;
            contentRoot: string;
          };
        };
      };
      const generatedPackage = JSON.parse(readFileSync(generatedPackagePath, "utf8")) as {
        scripts?: Record<string, string>;
        dependencies: Record<string, string>;
      };

      expect(generatedConfig.adapters.default.driver).toBe("markdown");
      expect(generatedConfig.adapters.default.contentRoot).toBe("content");
      expect(existsSync(path.join(generatedDir, expectedFile))).toBe(true);
      expect(generatedPackage.dependencies["@htx/adapter-markdown"]).toBe("0.0.0");
      expect(generatedPackage.scripts?.seed).toBeUndefined();
      expect(generatedPackage.scripts?.["dev:prod-errors"]).toBe("htx dev --prod-errors");
      expect(generatedPackage.scripts?.["serve:prod-errors"]).toBe("htx serve --prod-errors");

      writePackageJson(generatedPackagePath, {
        ...generatedPackage,
        overrides: {
          "@htx/adapter-markdown": `file:${markdownDir}`,
          "@htx/cli": `file:${cliDir}`,
          "@htx/engine": `file:${engineDir}`,
          "@htx/adapter-sqlite": `file:${sqliteDir}`,
        },
      });

      const installGenerated = runCommand([process.execPath, "install"], generatedDir);
      expect(installGenerated.exitCode).toBe(0);

      const serve = runCommand(
        [path.join(generatedDir, "node_modules/.bin/htx"), "serve", "--dry-run", "--port", port],
        generatedDir,
        {
          ...process.env,
          PATH: `${bunBinDir}:${process.env.PATH ?? ""}`,
        },
      );
      expect(serve.exitCode).toBe(0);
      expect(serve.stdout).toContain(`http://127.0.0.1:${port}`);
      expect(serve.stdout).toContain("default: markdown");
    }
  } finally {
    rmSync(projectDir, { recursive: true, force: true });
  }
});
