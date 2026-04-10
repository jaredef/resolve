// DO Demo Client — bundled for browser by Bun
import { h, render, useState, useEffect } from "./do-runtime";

// === Components ===

function TodoItem(props: { text: string; done: boolean; onToggle: () => void; onDelete: () => void }) {
  return h("li", {
    style: "display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid #eee;" +
      (props.done ? "text-decoration:line-through;color:#999" : "color:#111"),
  },
    h("input", { type: "checkbox", ...(props.done ? { checked: "checked" } : {}), onchange: props.onToggle }),
    h("span", { style: "flex:1" }, props.text),
    h("button", {
      onclick: props.onDelete,
      style: "background:none;border:none;color:#e55;cursor:pointer;font-size:14px"
    }, "x"),
  );
}

function TodoApp() {
  const [todos, setTodos] = useState([
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

  const remaining = todos.filter((t: any) => !t.done).length;

  return h("div", { style: "max-width:500px;margin:0 auto;font-family:system-ui" },
    h("h1", { style: "font-size:24px;margin-bottom:4px" }, "DO Runtime"),
    h("p", { style: "color:#666;font-size:14px;margin-bottom:16px" },
      "Derived from the Distributed Objects Seed. No React. 379 lines."),

    h("div", { style: "display:flex;gap:8px;margin-bottom:16px" },
      h("input", {
        type: "text",
        value: input,
        placeholder: "Add a todo...",
        oninput: (e: any) => setInput(e.target.value),
        onkeydown: (e: any) => { if (e.key === "Enter") addTodo(); },
        style: "flex:1;padding:8px;border:1px solid #ddd;border-radius:4px;font-size:14px",
      }),
      h("button", {
        onclick: addTodo,
        style: "padding:8px 16px;background:#6366f1;color:#fff;border:none;border-radius:4px;cursor:pointer",
      }, "Add"),
    ),

    h("ul", { style: "list-style:none;padding:0;margin:0" },
      ...todos.map((t: any) =>
        h(TodoItem, {
          key: String(t.id),
          text: t.text,
          done: t.done,
          onToggle: () => toggleTodo(t.id),
          onDelete: () => deleteTodo(t.id),
        })
      ),
    ),

    h("p", { style: "color:#999;font-size:12px;margin-top:12px" },
      remaining + " remaining"),
  );
}

function Counter() {
  const [count, setCount] = useState(0);

  return h("div", { style: "text-align:center;padding:20px 0;border-bottom:1px solid #eee;margin-bottom:20px" },
    h("p", { style: "font-size:48px;margin:0" }, String(count)),
    h("div", { style: "display:flex;gap:8px;justify-content:center;margin-top:8px" },
      h("button", {
        onclick: () => setCount((n: any) => n - 1),
        style: "padding:8px 20px;font-size:18px;border:1px solid #ddd;border-radius:4px;cursor:pointer;background:#fff",
      }, "-"),
      h("button", {
        onclick: () => setCount((n: any) => n + 1),
        style: "padding:8px 20px;font-size:18px;border:1px solid #ddd;border-radius:4px;cursor:pointer;background:#fff",
      }, "+"),
    ),
  );
}

function App() {
  return h("div", { style: "padding:20px" },
    h(Counter, null),
    h(TodoApp, null),
  );
}

// === Mount ===
render(h(App, null), document.getElementById("root")!);
