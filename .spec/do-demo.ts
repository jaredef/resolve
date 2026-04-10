// DO Runtime Demo — A live application resolved from the DO Seed
// Serves a counter + todo list app using the derived DO runtime.
// No React. No framework. Just the seed-derived runtime + Bun.serve.

import { h, render, useState, useEffect, useRef } from "./do-runtime";

// === Components ===

function TodoItem(props: { text: string; done: boolean; onToggle: () => void; onDelete: () => void }) {
  return h("li", {
    style: {
      display: "flex", alignItems: "center", gap: "8px", padding: "8px 0",
      borderBottom: "1px solid #eee", textDecoration: props.done ? "line-through" : "none",
      color: props.done ? "#999" : "#111",
    }
  },
    h("input", { type: "checkbox", checked: props.done ? "checked" : undefined, onChange: props.onToggle }),
    h("span", { style: { flex: "1" } }, props.text),
    h("button", {
      onClick: props.onDelete,
      style: { background: "none", border: "none", color: "#e55", cursor: "pointer", fontSize: "14px" }
    }, "x"),
  );
}

function TodoApp() {
  const [todos, setTodos] = useState<{ id: number; text: string; done: boolean }[]>([
    { id: 1, text: "Read the PRESTO dissertation", done: true },
    { id: 2, text: "Verify the DO seed produces a conformant runtime", done: true },
    { id: 3, text: "Run the derived runtime in a browser", done: false },
  ]);
  const [input, setInput] = useState("");
  const [nextId, setNextId] = useState(4);

  function addTodo() {
    if (!input.trim()) return;
    setTodos((prev: any) => [...prev, { id: nextId, text: input, done: false }]);
    setNextId((n: any) => n + 1);
    setInput("");
  }

  function toggleTodo(id: number) {
    setTodos((prev: any) => prev.map((t: any) => t.id === id ? { ...t, done: !t.done } : t));
  }

  function deleteTodo(id: number) {
    setTodos((prev: any) => prev.filter((t: any) => t.id !== id));
  }

  const remaining = todos.filter(t => !t.done).length;

  return h("div", { style: { maxWidth: "500px", margin: "0 auto", fontFamily: "system-ui" } },
    h("h1", { style: { fontSize: "24px", marginBottom: "4px" } }, "DO Runtime"),
    h("p", { style: { color: "#666", fontSize: "14px", marginBottom: "16px" } },
      "Derived from the Distributed Objects Seed. No React. 379 lines."),

    h("div", { style: { display: "flex", gap: "8px", marginBottom: "16px" } },
      h("input", {
        type: "text",
        value: input,
        placeholder: "Add a todo...",
        onInput: (e: any) => setInput(e.target.value),
        onKeydown: (e: any) => { if (e.key === "Enter") addTodo(); },
        style: { flex: "1", padding: "8px", border: "1px solid #ddd", borderRadius: "4px", fontSize: "14px" },
      }),
      h("button", {
        onClick: addTodo,
        style: { padding: "8px 16px", background: "#6366f1", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" },
      }, "Add"),
    ),

    h("ul", { style: { listStyle: "none", padding: "0", margin: "0" } },
      ...todos.map(t =>
        h(TodoItem, {
          key: String(t.id),
          text: t.text,
          done: t.done,
          onToggle: () => toggleTodo(t.id),
          onDelete: () => deleteTodo(t.id),
        })
      ),
    ),

    h("p", { style: { color: "#999", fontSize: "12px", marginTop: "12px" } },
      remaining + " remaining"),
  );
}

function Counter() {
  const [count, setCount] = useState(0);

  return h("div", { style: { textAlign: "center", padding: "20px 0", borderBottom: "1px solid #eee", marginBottom: "20px" } },
    h("p", { style: { fontSize: "48px", margin: "0" } }, String(count)),
    h("div", { style: { display: "flex", gap: "8px", justifyContent: "center", marginTop: "8px" } },
      h("button", {
        onClick: () => setCount((n: any) => n - 1),
        style: { padding: "8px 20px", fontSize: "18px", border: "1px solid #ddd", borderRadius: "4px", cursor: "pointer", background: "#fff" },
      }, "-"),
      h("button", {
        onClick: () => setCount((n: any) => n + 1),
        style: { padding: "8px 20px", fontSize: "18px", border: "1px solid #ddd", borderRadius: "4px", cursor: "pointer", background: "#fff" },
      }, "+"),
    ),
  );
}

function App() {
  return h("div", { style: { padding: "20px" } },
    h(Counter, null),
    h(TodoApp, null),
  );
}

// === Server ===

const HTML = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>DO Runtime Demo</title></head>
<body style="margin:0;background:#f8f8fa">
<div id="root"></div>
<script type="module">
${Bun.file(import.meta.dir + "/do-runtime.ts").text().then ? "" : ""}
</script>
</body>
</html>`;

// For a live demo we need to serve the runtime + app as browser JS.
// Bundle the app with Bun's bundler:

const bundleResult = await Bun.build({
  entrypoints: [import.meta.dir + "/do-demo-client.ts"],
  outdir: "/tmp/do-demo-build",
  target: "browser",
  minify: false,
});

if (!bundleResult.success) {
  console.error("Build failed:", bundleResult.logs);
  process.exit(1);
}

const bundledJS = await Bun.file("/tmp/do-demo-build/do-demo-client.js").text();

const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>DO Runtime — Resolved from Seed</title>
</head>
<body style="margin:0;background:#f8f8fa">
  <div id="root"></div>
  <script>${bundledJS}</script>
</body>
</html>`;

Bun.serve({
  port: 4060,
  fetch(req) {
    return new Response(html, { headers: { "Content-Type": "text/html" } });
  },
});

console.log(`
  DO Runtime Demo
  http://localhost:4060
  Derived from the Distributed Objects Seed. No React. 379 lines.
`);
