// Resolve corpus viewer — minimal LAN server.
// Serves the prebuilt dist/ over HTTP so the corpus is reachable from any
// device on the local network.
//
// Run with: bun run serve  (from the viewer/ directory)

import { join, normalize, resolve as pathResolve } from "path";
import { statSync, readFileSync } from "fs";

const PORT = Number(process.env.PORT) || 8765;
const HOST = process.env.HOST || "0.0.0.0";
const DIST_DIR = pathResolve(import.meta.dir, "..", "dist");

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function mimeFor(path: string): string {
  const i = path.lastIndexOf(".");
  if (i < 0) return "application/octet-stream";
  return MIME[path.slice(i).toLowerCase()] || "application/octet-stream";
}

function safeJoin(root: string, urlPath: string): string | null {
  // Strip query / hash already removed by URL parser; resolve against dist
  // and reject any traversal outside the root.
  const decoded = decodeURIComponent(urlPath);
  const joined = pathResolve(root, "." + decoded);
  if (!joined.startsWith(root)) return null;
  return joined;
}

const server = Bun.serve({
  hostname: HOST,
  port: PORT,
  fetch(req) {
    const url = new URL(req.url);
    let pathname = url.pathname;
    if (pathname === "/") pathname = "/index.html";

    const fs = safeJoin(DIST_DIR, pathname);
    if (!fs) return new Response("Forbidden", { status: 403 });

    let stats;
    try { stats = statSync(fs); }
    catch { return new Response("Not found", { status: 404 }); }

    if (stats.isDirectory()) {
      // Try index.html in directory
      try {
        const idx = join(fs, "index.html");
        statSync(idx);
        return serveFile(idx);
      } catch {
        return new Response("Not found", { status: 404 });
      }
    }
    return serveFile(fs);
  },
});

function serveFile(fs: string): Response {
  try {
    const data = readFileSync(fs);
    return new Response(new Uint8Array(data), {
      headers: { "Content-Type": mimeFor(fs) },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}

console.log(`Resolve corpus viewer serving on http://${HOST}:${PORT}`);
console.log(`  dist root: ${DIST_DIR}`);
