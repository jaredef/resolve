import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { expect, test } from "bun:test";
import { HttpHost } from "@htx/engine";
import { SQLiteAdapter } from "@htx/adapter-sqlite";

import { ArgParser } from "../src";
import { createHandler, loadConfig } from "../src/commands/serve-command";

const binPath = path.resolve(import.meta.dir, "../bin/htx");
const bunBinDir = path.dirname(process.execPath);

function runCli(args: string[], cwd = path.resolve(import.meta.dir, "../../.."), env?: Record<string, string>) {
  const result = Bun.spawnSync({
    cmd: [process.execPath, binPath, ...args],
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

function captureProcessOutput(stream: ReadableStream<Uint8Array> | null | undefined) {
  let buffer = "";
  const decoder = new TextDecoder();
  const done = (async () => {
    if (!stream) {
      return "";
    }

    const reader = stream.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }

      buffer += decoder.decode(value);
    }

    return buffer;
  })();

  return {
    current(): string {
      return buffer;
    },
    done,
  };
}

function spawnCliProcess(
  args: string[],
  cwd = path.resolve(import.meta.dir, "../../.."),
  env?: Record<string, string>,
) {
  const processHandle = Bun.spawn({
    cmd: [process.execPath, binPath, ...args],
    cwd,
    stdout: "pipe",
    stderr: "pipe",
    env,
  });

  return {
    process: processHandle,
    stdout: captureProcessOutput(processHandle.stdout),
    stderr: captureProcessOutput(processHandle.stderr),
  };
}

async function waitForOutput(
  output: { current(): string },
  expected: string,
  timeoutMs = 10000,
): Promise<void> {
  const start = Date.now();

  while (Date.now() - start < timeoutMs) {
    if (output.current().includes(expected)) {
      return;
    }

    await Bun.sleep(25);
  }

  throw new Error(`Timed out waiting for output: ${expected}\nCurrent output:\n${output.current()}`);
}

function writeCmsSmokeScript(projectDir: string): string {
  const scriptPath = path.join(projectDir, "cms-smoke.ts");
  writeFileSync(
    scriptPath,
    `import { createCmsAppRuntime } from "./app/public/index";

const runtime = createCmsAppRuntime();

try {
  const homeResponse = await runtime.host.handle(new Request("http://example.test/"));
  const pageResponse = await runtime.host.handle(
    new Request("http://example.test/pages/about"),
  );
  const postsResponse = await runtime.host.handle(new Request("http://example.test/posts"));
  const postDetailResponse = await runtime.host.handle(
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
  const adminPostsResponse = await runtime.host.handle(
    new Request("http://example.test/admin/posts", {
      headers: { cookie: sessionCookie },
    }),
  );

  const homeHtml = await homeResponse.text();
  const pageHtml = await pageResponse.text();
  const postsHtml = await postsResponse.text();
  const postDetailHtml = await postDetailResponse.text();
  const adminPostsHtml = await adminPostsResponse.text();

  console.log(
    JSON.stringify({
      homeStatus: homeResponse.status,
      pageStatus: pageResponse.status,
      postsStatus: postsResponse.status,
      postDetailStatus: postDetailResponse.status,
      adminRedirectStatus: adminRedirectResponse.status,
      loginStatus: loginResponse.status,
      adminPostsStatus: adminPostsResponse.status,
      homeOk: homeHtml.includes("A real HTX app from the first install"),
      pageOk: pageHtml.includes("About") && pageHtml.includes("CMS starter"),
      postsOk: postsHtml.includes("A CMS Starter Should Feel Like An App"),
      postDetailOk: postDetailHtml.includes("Why Hypermedia App Starts With HTX Files"),
      adminPostsOk: adminPostsHtml.includes("All posts"),
    }),
  );
} finally {
  runtime.adapter.getDatabase().close(false);
}
`,
  );
  return scriptPath;
}

function writeProjectFile(projectDir: string, relativePath: string, content: string): void {
  const filePath = path.join(projectDir, relativePath);
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, content);
}

test("arg parser handles flags and positional arguments", () => {
  const parser = new ArgParser(["demo", "--adapter=sqlite", "--host", "127.0.0.1", "--dry-run"]);

  expect(parser.arg(0)).toBe("demo");
  expect(parser.get("adapter")).toBe("sqlite");
  expect(parser.get("host")).toBe("127.0.0.1");
  expect(parser.has("dry-run")).toBe(true);
});

test("cli prints version", () => {
  const result = runCli(["--version"]);

  expect(result.exitCode).toBe(0);
  expect(result.stdout).toContain("HTX v0.1.0");
});

test("cli scaffolds a local file-linked project by default", () => {
  const tempDir = mkdtempSync(path.join(os.tmpdir(), "htx-cli-new-"));

  try {
    const result = runCli(["new", "demo-app"], tempDir);
    const projectDir = path.join(tempDir, "demo-app");

    expect(result.exitCode).toBe(0);
    expect(existsSync(path.join(projectDir, "htx.config.json"))).toBe(true);
    expect(existsSync(path.join(projectDir, "app/public/index.ts"))).toBe(true);
    expect(existsSync(path.join(projectDir, "app/seed.ts"))).toBe(true);
    expect(existsSync(path.join(projectDir, "app/seed-content.ts"))).toBe(true);
    expect(existsSync(path.join(projectDir, "app/templates/index.htx"))).toBe(true);
    expect(existsSync(path.join(projectDir, "app/templates/posts/index.htx"))).toBe(true);
    expect(existsSync(path.join(projectDir, "app/templates/pages/[slug].htx"))).toBe(true);
    expect(existsSync(path.join(projectDir, "app/templates/admin/login/index.htx"))).toBe(true);
    expect(existsSync(path.join(projectDir, "app/templates/admin/posts/new.htx"))).toBe(true);
    expect(existsSync(path.join(projectDir, "app/templates/admin/pages/new.htx"))).toBe(true);
    expect(existsSync(path.join(projectDir, "app/public/css/style.css"))).toBe(true);

    const config = JSON.parse(readFileSync(path.join(projectDir, "htx.config.json"), "utf8")) as {
      appName: string;
      adapters: Record<string, unknown>;
    };
    const packageJson = JSON.parse(readFileSync(path.join(projectDir, "package.json"), "utf8")) as {
      dependencies: Record<string, string>;
      scripts?: Record<string, string>;
    };
    expect(config.appName).toBe("demo-app");
    expect(config.adapters).toEqual({
      default: {
        driver: "sqlite",
        databasePath: "app/data/content.sqlite",
      },
    });
    expect(packageJson.scripts?.dev).toBe("htx dev");
    expect(packageJson.scripts?.["dev:prod-errors"]).toBe("htx dev --prod-errors");
    expect(packageJson.scripts?.serve).toBe("htx serve");
    expect(packageJson.scripts?.["serve:prod-errors"]).toBe("htx serve --prod-errors");
    expect(packageJson.dependencies["@htx/adapter-markdown"]).toStartWith("file:");
    expect(packageJson.dependencies["@htx/cli"]).toStartWith("file:");
    expect(packageJson.dependencies["@htx/engine"]).toStartWith("file:");
    expect(packageJson.dependencies["@htx/adapter-sqlite"]).toStartWith("file:");

    const install = runCommand([process.execPath, "install"], projectDir);
    expect(install.exitCode).toBe(0);

    const firstSeed = runCommand([process.execPath, "run", "seed"], projectDir);
    const secondSeed = runCommand([process.execPath, "run", "seed"], projectDir);
    expect(firstSeed.exitCode).toBe(0);
    expect(firstSeed.stdout).toContain("Created:");
    expect(secondSeed.exitCode).toBe(0);
    expect(secondSeed.stdout).toContain("Created: 0");

    const smokeScript = writeCmsSmokeScript(projectDir);
    const smoke = runCommand([process.execPath, "run", smokeScript], projectDir);
    expect(smoke.exitCode).toBe(0);
    expect(smoke.stdout).toContain('"homeStatus":200');
    expect(smoke.stdout).toContain('"pageStatus":200');
    expect(smoke.stdout).toContain('"postDetailStatus":200');
    expect(smoke.stdout).toContain('"adminRedirectStatus":302');
    expect(smoke.stdout).toContain('"loginStatus":302');
    expect(smoke.stdout).toContain('"adminPostsStatus":200');
    expect(smoke.stdout).toContain('"homeOk":true');
    expect(smoke.stdout).toContain('"pageOk":true');
    expect(smoke.stdout).toContain('"postsOk":true');
    expect(smoke.stdout).toContain('"postDetailOk":true');
    expect(smoke.stdout).toContain('"adminPostsOk":true');

    const cli = runCommand([path.join(projectDir, "node_modules/.bin/htx"), "serve", "--dry-run", "--port", "4020"], projectDir, {
      ...process.env,
      PATH: `${bunBinDir}:${process.env.PATH ?? ""}`,
    });
    expect(cli.exitCode).toBe(0);
    expect(cli.stdout).toContain("http://127.0.0.1:4020");
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
});

test("cli can scaffold published package specs on demand", () => {
  const tempDir = mkdtempSync(path.join(os.tmpdir(), "htx-cli-published-"));

  try {
    const result = runCli(["new", "demo-app", "--published"], tempDir);
    const projectDir = path.join(tempDir, "demo-app");
    const packageJson = JSON.parse(readFileSync(path.join(projectDir, "package.json"), "utf8")) as {
      dependencies: Record<string, string>;
    };

    expect(result.exitCode).toBe(0);
    expect(packageJson.dependencies["@htx/adapter-markdown"]).toBe("0.0.0");
    expect(packageJson.dependencies["@htx/cli"]).toBe("0.0.0");
    expect(packageJson.dependencies["@htx/engine"]).toBe("0.0.0");
    expect(packageJson.dependencies["@htx/adapter-sqlite"]).toBe("0.0.0");
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
});

test("cli accepts --showcase as a legacy alias for the CMS starter", () => {
  const tempDir = mkdtempSync(path.join(os.tmpdir(), "htx-cli-showcase-alias-"));

  try {
    const result = runCli(["new", "demo-app", "--showcase"], tempDir);
    const projectDir = path.join(tempDir, "demo-app");

    expect(result.exitCode).toBe(0);
    expect(existsSync(path.join(projectDir, "app/templates/pages/[slug].htx"))).toBe(true);
    expect(existsSync(path.join(projectDir, "app/templates/admin/login/index.htx"))).toBe(true);
    expect(existsSync(path.join(projectDir, "app/templates/docs/index.htx"))).toBe(false);
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
});

test("cli can scaffold a minimal variant", () => {
  const tempDir = mkdtempSync(path.join(os.tmpdir(), "htx-cli-minimal-"));

  try {
    const result = runCli(["new", "demo-app", "--minimal"], tempDir);
    const projectDir = path.join(tempDir, "demo-app");
    const packageJson = JSON.parse(readFileSync(path.join(projectDir, "package.json"), "utf8")) as {
      scripts?: Record<string, string>;
    };

    expect(result.exitCode).toBe(0);
    expect(existsSync(path.join(projectDir, "app/templates/index.htx"))).toBe(true);
    expect(existsSync(path.join(projectDir, "app/templates/about.htx"))).toBe(true);
    expect(existsSync(path.join(projectDir, "app/templates/partials/_nav.htx"))).toBe(true);
    expect(existsSync(path.join(projectDir, "app/seed.ts"))).toBe(false);
    expect(existsSync(path.join(projectDir, "app/public/index.ts"))).toBe(false);
    expect(existsSync(path.join(projectDir, "app/templates/docs/index.htx"))).toBe(false);
    expect(existsSync(path.join(projectDir, "app/templates/admin/posts/new.htx"))).toBe(false);
    expect(packageJson.scripts?.seed).toBeUndefined();
    expect(packageJson.scripts?.["dev:prod-errors"]).toBe("htx dev --prod-errors");
    expect(packageJson.scripts?.["serve:prod-errors"]).toBe("htx serve --prod-errors");

    const install = runCommand([process.execPath, "install"], projectDir);
    expect(install.exitCode).toBe(0);

    const cli = runCommand(
      [path.join(projectDir, "node_modules/.bin/htx"), "serve", "--dry-run", "--port", "4022"],
      projectDir,
      {
        ...process.env,
        PATH: `${bunBinDir}:${process.env.PATH ?? ""}`,
      },
    );
    expect(cli.exitCode).toBe(0);
    expect(cli.stdout).toContain("http://127.0.0.1:4022");
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
});

test("cli can scaffold a blog variant with markdown content", async () => {
  const tempDir = mkdtempSync(path.join(os.tmpdir(), "htx-cli-blog-"));

  try {
    const result = runCli(["new", "demo-app", "--blog"], tempDir);
    const projectDir = path.join(tempDir, "demo-app");
    const config = JSON.parse(readFileSync(path.join(projectDir, "htx.config.json"), "utf8")) as {
      adapters: {
        default: {
          driver: string;
          contentRoot: string;
        };
      };
    };
    const packageJson = JSON.parse(readFileSync(path.join(projectDir, "package.json"), "utf8")) as {
      scripts?: Record<string, string>;
    };

    expect(result.exitCode).toBe(0);
    expect(config.adapters.default.driver).toBe("markdown");
    expect(config.adapters.default.contentRoot).toBe("content");
    expect(packageJson.scripts?.["dev:prod-errors"]).toBe("htx dev --prod-errors");
    expect(packageJson.scripts?.["serve:prod-errors"]).toBe("htx serve --prod-errors");
    expect(existsSync(path.join(projectDir, "content/post/why-flat-file-blogging-fits-htx.md"))).toBe(true);
    expect(existsSync(path.join(projectDir, "app/templates/posts/index.htx"))).toBe(true);
    expect(existsSync(path.join(projectDir, "app/templates/posts/[slug].htx"))).toBe(true);
    expect(existsSync(path.join(projectDir, "app/seed.ts"))).toBe(false);

    const install = runCommand([process.execPath, "install"], projectDir);
    expect(install.exitCode).toBe(0);

    const handler = createHandler(projectDir, loadConfig(projectDir));
    const host = new HttpHost(handler, path.join(projectDir, "app/public"));
    const home = await host.handle(new Request("http://example.test/"));
    const index = await host.handle(new Request("http://example.test/posts"));
    const detail = await host.handle(
      new Request("http://example.test/posts/why-flat-file-blogging-fits-htx"),
    );

    expect(home.status).toBe(200);
    expect(await home.text()).toContain("Publish from flat files");
    expect(index.status).toBe(200);
    expect(await index.text()).toContain("Why Flat File Blogging Fits HTX");
    expect(detail.status).toBe(200);
    expect(await detail.text()).toContain("body_html");
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
});

test("cli can scaffold a docs variant with markdown content", async () => {
  const tempDir = mkdtempSync(path.join(os.tmpdir(), "htx-cli-docs-"));

  try {
    const result = runCli(["new", "demo-app", "--docs"], tempDir);
    const projectDir = path.join(tempDir, "demo-app");
    const config = JSON.parse(readFileSync(path.join(projectDir, "htx.config.json"), "utf8")) as {
      adapters: {
        default: {
          driver: string;
          contentRoot: string;
        };
      };
    };
    const packageJson = JSON.parse(readFileSync(path.join(projectDir, "package.json"), "utf8")) as {
      scripts?: Record<string, string>;
    };

    expect(result.exitCode).toBe(0);
    expect(config.adapters.default.driver).toBe("markdown");
    expect(config.adapters.default.contentRoot).toBe("content");
    expect(packageJson.scripts?.["dev:prod-errors"]).toBe("htx dev --prod-errors");
    expect(packageJson.scripts?.["serve:prod-errors"]).toBe("htx serve --prod-errors");
    expect(existsSync(path.join(projectDir, "content/documentation/welcome.md"))).toBe(true);
    expect(existsSync(path.join(projectDir, "app/templates/docs/index.htx"))).toBe(true);
    expect(existsSync(path.join(projectDir, "app/templates/docs/[slug].htx"))).toBe(true);
    expect(existsSync(path.join(projectDir, "app/templates/partials/_docs-nav.htx"))).toBe(true);

    const install = runCommand([process.execPath, "install"], projectDir);
    expect(install.exitCode).toBe(0);

    const handler = createHandler(projectDir, loadConfig(projectDir));
    const host = new HttpHost(handler, path.join(projectDir, "app/public"));
    const home = await host.handle(new Request("http://example.test/"));
    const index = await host.handle(new Request("http://example.test/docs"));
    const detail = await host.handle(new Request("http://example.test/docs/welcome"));

    expect(home.status).toBe(200);
    expect(await home.text()).toContain("Docs from flat files");
    expect(index.status).toBe(200);
    expect(await index.text()).toContain("Product docs");
    expect(detail.status).toBe(200);
    expect(await detail.text()).toContain("Welcome to the docs starter.");
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
});

test("serve and dev commands dry-run the real runtime wiring", () => {
  const tempDir = mkdtempSync(path.join(os.tmpdir(), "htx-cli-serve-"));

  try {
    const scaffold = runCli(["new", "demo-app"], tempDir);
    expect(scaffold.exitCode).toBe(0);

    const projectDir = path.join(tempDir, "demo-app");
    const serveResult = runCli(["serve", "--dry-run", "--cwd", projectDir, "--port", "4010"], projectDir);
    const devResult = runCli(["dev", "--dry-run", "--cwd", projectDir, "--port", "4011"], projectDir);

    expect(serveResult.exitCode).toBe(0);
    expect(serveResult.stdout).toContain("http://127.0.0.1:4010");
    expect(serveResult.stdout).toContain("Errors:  dev");
    expect(serveResult.stdout).toContain("Dry run complete.");

    expect(devResult.exitCode).toBe(0);
    expect(devResult.stdout).toContain("http://127.0.0.1:4011");
    expect(devResult.stdout).toContain("Errors:  dev");
    expect(devResult.stdout).toContain("Dry run complete.");
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
});

test("serve supports explicit production error mode", () => {
  const tempDir = mkdtempSync(path.join(os.tmpdir(), "htx-cli-prod-errors-"));

  try {
    const scaffold = runCli(["new", "demo-app"], tempDir);
    expect(scaffold.exitCode).toBe(0);

    const projectDir = path.join(tempDir, "demo-app");
    const result = runCli(["serve", "--dry-run", "--cwd", projectDir, "--prod-errors"], projectDir);

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain("Errors:  prod");
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
});

test("serve rejects direct use of the internal watch-child flag", () => {
  const result = runCli(["serve", "--watch-child", "--dry-run"]);

  expect(result.exitCode).toBe(1);
  expect(result.stderr).toContain("--watch-child is reserved for the internal dev supervisor.");
});

test("serve rejects conflicting error mode flags", () => {
  const result = runCli(["serve", "--dry-run", "--dev-errors", "--prod-errors"]);

  expect(result.exitCode).toBe(1);
  expect(result.stderr).toContain("Choose only one of --dev-errors or --prod-errors.");
});

test("serve dry-run prints startup diagnostics for invalid markdown content roots", () => {
  const tempDir = mkdtempSync(path.join(os.tmpdir(), "htx-cli-diagnostics-"));

  try {
    writeProjectFile(
      tempDir,
      "htx.config.json",
      JSON.stringify(
        {
          appName: "Broken Markdown Demo",
          templatesDir: "app/templates",
          publicDir: "app/public",
          secretKey: "dev-secret-key-at-least-32-bytes-long",
          adapters: {
            default: {
              driver: "markdown",
              contentRoot: "missing-content",
            },
          },
        },
        null,
        2,
      ) + "\n",
    );
    writeProjectFile(tempDir, "app/public/.gitkeep", "");

    const result = runCli(["serve", "--dry-run", "--cwd", tempDir], tempDir);

    expect(result.exitCode).toBe(1);
    expect(result.stderr).toContain("MARKDOWN_CONTENT_ROOT_MISSING");
    expect(result.stderr).toContain("markdown-index");
    expect(result.stderr).toContain(path.join(tempDir, "missing-content"));
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
});

test("dev --no-watch uses the direct server path", () => {
  const tempDir = mkdtempSync(path.join(os.tmpdir(), "htx-cli-dev-nowatch-"));

  try {
    const scaffold = runCli(["new", "demo-app"], tempDir);
    expect(scaffold.exitCode).toBe(0);

    const projectDir = path.join(tempDir, "demo-app");
    const result = runCli(["dev", "--dry-run", "--cwd", projectDir, "--no-watch"], projectDir);

    expect(result.exitCode).toBe(0);
    expect(result.stdout).not.toContain("[htx:dev] Watching for changes");
    expect(result.stdout).toContain("Dry run complete.");
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
});

test("dev watches app files and restarts on change", async () => {
  const tempDir = mkdtempSync(path.join(os.tmpdir(), "htx-cli-watch-"));

  try {
    writeProjectFile(
      tempDir,
      "htx.config.json",
      JSON.stringify(
        {
          appName: "Watch Demo",
          templatesDir: "app/templates",
          publicDir: "app/public",
          secretKey: "dev-secret-key-at-least-32-bytes-long",
          adapters: {
            default: {
              driver: "sqlite",
              databasePath: "app/data/content.sqlite",
            },
          },
        },
        null,
        2,
      ) + "\n",
    );
    writeProjectFile(tempDir, "app/templates/_layout.htx", "__content__");
    writeProjectFile(tempDir, "app/templates/index.htx", "<p>Initial</p>");
    writeProjectFile(tempDir, "app/public/.gitkeep", "");
    writeProjectFile(tempDir, "app/data/.gitkeep", "");

    const dev = spawnCliProcess(["dev", "--cwd", tempDir, "--port", "4033"], tempDir, {
      ...process.env,
      PATH: `${bunBinDir}:${process.env.PATH ?? ""}`,
    });

    try {
      await waitForOutput(dev.stdout, "[htx:dev] Watching for changes");
      await waitForOutput(dev.stdout, "Press Ctrl+C to stop.");

      writeProjectFile(tempDir, "app/templates/index.htx", "<p>Updated</p>");

      await waitForOutput(dev.stdout, "[htx:dev] Change detected: app/templates/index.htx");
      await waitForOutput(dev.stdout, "[htx:dev] Server restarted.");
    } finally {
      dev.process.kill("SIGTERM");
      await dev.process.exited;
      await dev.stdout.done;
      await dev.stderr.done;
    }
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
});

test("cli runtime can serve markdown-backed content roots", async () => {
  const tempDir = mkdtempSync(path.join(os.tmpdir(), "htx-cli-markdown-"));

  try {
    writeProjectFile(
      tempDir,
      "htx.config.json",
      JSON.stringify(
        {
          appName: "Markdown Demo",
          templatesDir: "app/templates",
          publicDir: "app/public",
          secretKey: "dev-secret-key-at-least-32-bytes-long",
          adapters: {
            default: {
              driver: "markdown",
              contentRoot: "content",
            },
          },
        },
        null,
        2,
      ) + "\n",
    );
    writeProjectFile(
      tempDir,
      "app/templates/_layout.htx",
      `<!doctype html>
<html>
<body>
  __content__
</body>
</html>
`,
    );
    writeProjectFile(
      tempDir,
      "app/templates/posts/index.htx",
      `<htx:type>post</htx:type>
<htx:where>status=published</htx:where>
<htx>
<htx:each><article>__title__</article></htx:each>
</htx>
`,
    );
    writeProjectFile(
      tempDir,
      "app/templates/posts/[slug].htx",
      `<htx:type>post</htx:type>
<htx:slug>{{ route.slug }}</htx:slug>
<htx>
<article>__body__</article>
</htx>
`,
    );
    writeProjectFile(
      tempDir,
      "content/post/hello-world.md",
      `---
title: Hello World
status: published
---
This is **markdown**.
`,
    );
    writeProjectFile(tempDir, "app/public/.gitkeep", "");

    const config = loadConfig(tempDir);
    const handler = createHandler(tempDir, config);
    const host = new HttpHost(handler, path.join(tempDir, "app/public"));

    const indexResponse = await host.handle(new Request("http://example.test/posts"));
    const detailResponse = await host.handle(new Request("http://example.test/posts/hello-world"));

    expect(indexResponse.status).toBe(200);
    expect(await indexResponse.text()).toContain("<article>Hello World</article>");
    expect(detailResponse.status).toBe(200);
    expect(await detailResponse.text()).toContain("<strong>markdown</strong>");
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
});

test("cli runtime can route types across sqlite default and markdown overrides", async () => {
  const tempDir = mkdtempSync(path.join(os.tmpdir(), "htx-cli-mixed-adapters-"));

  try {
    writeProjectFile(
      tempDir,
      "htx.config.json",
      JSON.stringify(
        {
          appName: "Mixed Demo",
          templatesDir: "app/templates",
          publicDir: "app/public",
          secretKey: "dev-secret-key-at-least-32-bytes-long",
          adapters: {
            default: {
              driver: "sqlite",
              databasePath: "app/data/content.sqlite",
            },
            documentation: {
              driver: "markdown",
              contentRoot: "content",
            },
          },
        },
        null,
        2,
      ) + "\n",
    );
    writeProjectFile(tempDir, "app/templates/_layout.htx", "__content__");
    writeProjectFile(
      tempDir,
      "app/templates/posts/index.htx",
      `<htx:type>post</htx:type>
<htx>
<htx:each><article>__title__</article></htx:each>
</htx>
`,
    );
    writeProjectFile(
      tempDir,
      "app/templates/docs/[slug].htx",
      `<htx:type>documentation</htx:type>
<htx:slug>{{ route.slug }}</htx:slug>
<htx>
<article>__title__</article>
</htx>
`,
    );
    writeProjectFile(
      tempDir,
      "content/documentation/welcome.md",
      `---
title: Welcome
slug: welcome
status: published
---
Mixed docs
`,
    );
    writeProjectFile(tempDir, "app/public/.gitkeep", "");

    mkdirSync(path.join(tempDir, "app/data"), { recursive: true });
    const sqlite = new SQLiteAdapter(path.join(tempDir, "app/data/content.sqlite"));
    sqlite.create("post", { title: "SQLite Post", status: "published" });

    const config = loadConfig(tempDir);
    const handler = createHandler(tempDir, config);
    const host = new HttpHost(handler, path.join(tempDir, "app/public"));

    const postsResponse = await host.handle(new Request("http://example.test/posts"));
    const docsResponse = await host.handle(new Request("http://example.test/docs/welcome"));

    expect(postsResponse.status).toBe(200);
    expect(await postsResponse.text()).toContain("SQLite Post");
    expect(docsResponse.status).toBe(200);
    expect(await docsResponse.text()).toContain("Welcome");
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
});
