import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { expect, test } from "bun:test";

import { createDogfoodAppRuntime } from "../app/public/index";
import { seedDocumentationContent } from "../app/seed-docs";

function decodeHtmlEntities(input: string): string {
  return input
    .replaceAll("&quot;", '"')
    .replaceAll("&#039;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&amp;", "&");
}

function extractPayload(html: string): string {
  const match = html.match(/name="htx-payload" value="([^"]+)"/);
  if (!match) {
    throw new Error("Could not find htx-payload input.");
  }

  return decodeHtmlEntities(match[1]);
}

function extractSessionCookie(response: Response): string {
  const sessionCookie = response.headers.get("set-cookie");
  if (!sessionCookie) {
    throw new Error("Could not find session cookie.");
  }

  const [cookie] = sessionCookie.split(";");
  return cookie;
}

async function loginAsAdmin(runtime: ReturnType<typeof createDogfoodAppRuntime>): Promise<string> {
  const response = await runtime.host.handle(
    new Request("http://example.test/admin/login", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        username: "admin",
        password: "secret",
        next: "/admin",
      }),
    }),
  );

  expect(response.status).toBe(302);
  expect(response.headers.get("location")).toBe("/admin");
  return extractSessionCookie(response);
}

function authenticatedRequest(url: string, cookie: string, init: RequestInit = {}): Request {
  const headers = new Headers(init.headers);
  headers.set("cookie", cookie);
  return new Request(url, { ...init, headers });
}

test("dogfood app serves public routes and static assets through the real host", async () => {
  const tempDir = mkdtempSync(path.join(os.tmpdir(), "htx-dogfood-app-"));
  const runtime = createDogfoodAppRuntime({
    databasePath: path.join(tempDir, "dogfood.sqlite"),
    adminUsername: "admin",
    adminPassword: "secret",
  });

  try {
    runtime.adapter.create("post", {
      title: "Published Post",
      body: "Visible body",
      status: "published",
    });
    runtime.adapter.create("post", {
      title: "Draft Post",
      body: "Hidden body",
      status: "draft",
    });
    runtime.adapter.create("documentation", {
      title: "Admin Managed Doc",
      slug: "admin-managed-doc",
      summary: "Documentation summary",
      section: "operations",
      section_label: "Operations",
      order: 9,
      status: "published",
      body: "Documentation body",
    });

    const home = await runtime.host.handle(new Request("http://example.test/"));
    const blog = await runtime.host.handle(new Request("http://example.test/blog"));
    const detail = await runtime.host.handle(new Request("http://example.test/blog/published-post"));
    const css = await runtime.host.handle(new Request("http://example.test/css/style.css"));

    expect(home.status).toBe(200);
    expect(await home.text()).toContain("HTX Dogfood App");
    expect(blog.status).toBe(200);
    expect(await blog.text()).toContain("Published Post");
    expect(detail.status).toBe(200);
    expect(await detail.text()).toContain("Visible body");
    expect(css.status).toBe(200);
    expect(await css.text()).toContain(".admin-shell");
  } finally {
    runtime.adapter.getDatabase().close(false);
    rmSync(tempDir, { recursive: true, force: true });
  }
});

test("dogfood admin requires login and supports logout", async () => {
  const tempDir = mkdtempSync(path.join(os.tmpdir(), "htx-dogfood-auth-"));
  const runtime = createDogfoodAppRuntime({
    databasePath: path.join(tempDir, "dogfood.sqlite"),
    adminUsername: "admin",
    adminPassword: "secret",
  });

  try {
    const protectedResponse = await runtime.host.handle(new Request("http://example.test/admin"));
    expect(protectedResponse.status).toBe(302);
    expect(protectedResponse.headers.get("location")).toBe("/admin/login?next=%2Fadmin");

    const loginPage = await runtime.host.handle(
      new Request("http://example.test/admin/login?next=%2Fadmin"),
    );
    expect(loginPage.status).toBe(200);
    expect(await loginPage.text()).toContain("Sign in");

    const sessionCookie = await loginAsAdmin(runtime);
    const adminResponse = await runtime.host.handle(
      authenticatedRequest("http://example.test/admin", sessionCookie),
    );
    expect(adminResponse.status).toBe(200);
    expect(await adminResponse.text()).toContain("Content backend");

    const logoutResponse = await runtime.host.handle(
      authenticatedRequest("http://example.test/admin/logout", sessionCookie, {
        method: "POST",
      }),
    );
    expect(logoutResponse.status).toBe(302);
    expect(logoutResponse.headers.get("location")).toBe("/admin/login");
    expect(logoutResponse.headers.get("set-cookie")).toContain("Max-Age=0");
  } finally {
    runtime.adapter.getDatabase().close(false);
    rmSync(tempDir, { recursive: true, force: true });
  }
});

test("dogfood admin create, update, and delete flows mutate data end to end", async () => {
  const tempDir = mkdtempSync(path.join(os.tmpdir(), "htx-dogfood-admin-"));
  const runtime = createDogfoodAppRuntime({
    databasePath: path.join(tempDir, "dogfood.sqlite"),
    adminUsername: "admin",
    adminPassword: "secret",
  });

  try {
    const sessionCookie = await loginAsAdmin(runtime);
    const newPage = await runtime.host.handle(
      authenticatedRequest("http://example.test/admin/posts/new", sessionCookie),
    );
    const createPayload = extractPayload(await newPage.text());

    const createResponse = await runtime.host.handle(
      authenticatedRequest("http://example.test/admin/posts/new", sessionCookie, {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          title: "Created Post",
          slug: "created-post",
          summary: "Created summary",
          body: "Created body",
          status: "published",
          "htx-payload": createPayload,
        }),
      }),
    );

    expect(createResponse.status).toBe(200);
    const created = runtime.adapter.findBySlug("post", "created-post");
    expect(created).not.toBeNull();

    const createdId = String(created?.id ?? "");
    const editPage = await runtime.host.handle(
      authenticatedRequest(`http://example.test/admin/posts/${createdId}/edit`, sessionCookie),
    );
    const editPayload = extractPayload(await editPage.text());

    const editResponse = await runtime.host.handle(
      authenticatedRequest(`http://example.test/admin/posts/${createdId}/edit`, sessionCookie, {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          title: "Updated Post",
          slug: "updated-post",
          summary: "Updated summary",
          body: "Updated body",
          status: "draft",
          "htx-payload": editPayload,
        }),
      }),
    );

    expect(editResponse.status).toBe(200);
    const updated = runtime.adapter.find("post", createdId);
    expect(updated?.title).toBe("Updated Post");
    expect(updated?.slug).toBe("updated-post");
    expect(updated?.summary).toBe("Updated summary");
    expect(updated?.status).toBe("draft");

    const deletePage = await runtime.host.handle(
      authenticatedRequest(`http://example.test/admin/posts/${createdId}/delete`, sessionCookie),
    );
    const deletePayload = extractPayload(await deletePage.text());

    const deleteResponse = await runtime.host.handle(
      authenticatedRequest(`http://example.test/admin/posts/${createdId}/delete`, sessionCookie, {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "htx-payload": deletePayload,
        }),
      }),
    );

    expect(deleteResponse.status).toBe(200);
    expect(runtime.adapter.find("post", createdId)).toBeNull();
  } finally {
    runtime.adapter.getDatabase().close(false);
    rmSync(tempDir, { recursive: true, force: true });
  }
});

test("dogfood admin manages documentation content end to end", async () => {
  const tempDir = mkdtempSync(path.join(os.tmpdir(), "htx-dogfood-admin-docs-"));
  const runtime = createDogfoodAppRuntime({
    databasePath: path.join(tempDir, "dogfood.sqlite"),
    adminUsername: "admin",
    adminPassword: "secret",
  });

  try {
    const sessionCookie = await loginAsAdmin(runtime);
    const docsIndex = await runtime.host.handle(
      authenticatedRequest("http://example.test/admin/docs", sessionCookie),
    );
    expect(docsIndex.status).toBe(200);
    expect(await docsIndex.text()).toContain("All docs");

    const newPage = await runtime.host.handle(
      authenticatedRequest("http://example.test/admin/docs/new", sessionCookie),
    );
    const createPayload = extractPayload(await newPage.text());

    const createResponse = await runtime.host.handle(
      authenticatedRequest("http://example.test/admin/docs/new", sessionCookie, {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          title: "Operations Guide",
          slug: "operations-guide",
          summary: "How the admin manages docs",
          section: "operations",
          section_label: "Operations",
          order: "12",
          status: "published",
          body: "Manage documentation through the HTX admin.",
          "htx-payload": createPayload,
        }),
      }),
    );

    expect(createResponse.status).toBe(200);
    const created = runtime.adapter.findBySlug("documentation", "operations-guide");
    expect(created).not.toBeNull();
    expect(created?.section_label).toBe("Operations");

    const createdId = String(created?.id ?? "");
    const liveDoc = await runtime.host.handle(
      new Request("http://example.test/docs/operations-guide"),
    );
    expect(liveDoc.status).toBe(200);
    expect(await liveDoc.text()).toContain("Manage documentation through the HTX admin.");

    const editPage = await runtime.host.handle(
      authenticatedRequest(`http://example.test/admin/docs/${createdId}/edit`, sessionCookie),
    );
    const editPayload = extractPayload(await editPage.text());

    const editResponse = await runtime.host.handle(
      authenticatedRequest(`http://example.test/admin/docs/${createdId}/edit`, sessionCookie, {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          title: "Operations Guide Updated",
          slug: "operations-guide-updated",
          summary: "Updated admin docs summary",
          section: "building-pages",
          section_label: "Building Pages",
          order: "15",
          status: "draft",
          body: "Updated documentation body.",
          "htx-payload": editPayload,
        }),
      }),
    );

    expect(editResponse.status).toBe(200);
    const updated = runtime.adapter.find("documentation", createdId);
    expect(updated?.title).toBe("Operations Guide Updated");
    expect(updated?.slug).toBe("operations-guide-updated");
    expect(updated?.section).toBe("building-pages");
    expect(updated?.status).toBe("draft");

    const deletePage = await runtime.host.handle(
      authenticatedRequest(`http://example.test/admin/docs/${createdId}/delete`, sessionCookie),
    );
    const deletePayload = extractPayload(await deletePage.text());

    const deleteResponse = await runtime.host.handle(
      authenticatedRequest(`http://example.test/admin/docs/${createdId}/delete`, sessionCookie, {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "htx-payload": deletePayload,
        }),
      }),
    );

    expect(deleteResponse.status).toBe(200);
    expect(runtime.adapter.find("documentation", createdId)).toBeNull();
  } finally {
    runtime.adapter.getDatabase().close(false);
    rmSync(tempDir, { recursive: true, force: true });
  }
});

test("dogfood docs seed idempotently and render docs routes", async () => {
  const tempDir = mkdtempSync(path.join(os.tmpdir(), "htx-dogfood-docs-"));
  const runtime = createDogfoodAppRuntime({
    databasePath: path.join(tempDir, "dogfood.sqlite"),
    adminUsername: "admin",
    adminPassword: "secret",
  });

  try {
    const firstSeed = seedDocumentationContent(runtime.adapter);
    const secondSeed = seedDocumentationContent(runtime.adapter);

    expect(firstSeed.total).toBeGreaterThan(5);
    expect(secondSeed.created).toBe(0);
    expect(secondSeed.updated).toBe(firstSeed.total);

    const docsIndex = await runtime.host.handle(new Request("http://example.test/docs"));
    const docsArticle = await runtime.host.handle(
      new Request("http://example.test/docs/what-is-hypermedia-app"),
    );

    expect(docsIndex.status).toBe(200);
    expect(await docsIndex.text()).toContain("Hypermedia App Documentation");
    expect(await runtime.host.handle(new Request("http://example.test/docs")).then((response) => response.text())).toContain("Reads And Queries");

    expect(docsArticle.status).toBe(200);
    const articleHtml = await docsArticle.text();
    expect(articleHtml).toContain("What Is Hypermedia App?");
    expect(articleHtml).toContain("file-system routing");
    expect(articleHtml).toContain("CLI And Local Development");
  } finally {
    runtime.adapter.getDatabase().close(false);
    rmSync(tempDir, { recursive: true, force: true });
  }
});
