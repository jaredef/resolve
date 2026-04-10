# How HTX Works

HTX is an **interpreter**, not a compiler. Your `.htx` templates are never converted to JavaScript — they're read as text, processed through a pipeline of string operations and AST walking, and assembled into HTML. Understanding this distinction is key to understanding what makes HTX different from other TypeScript frameworks.

## The Interpreter Model

Most web frameworks treat templates as code. JSX compiles to JavaScript function calls. Handlebars compiles templates to JavaScript functions. EJS evaluates embedded JavaScript. In all of these, the template eventually becomes executable JavaScript.

HTX breaks this assumption. A `.htx` file is **data**, not code. The HTX engine is a custom interpreter — written in TypeScript, compiled once by Bun at boot — that reads `.htx` files as plain text strings and processes them at request time.

The analogy is PHP and the Zend engine:

| | PHP / Zend | HTX / Bun |
|---|---|---|
| **Engine** | Zend engine (compiled C) | HTX engine (compiled TypeScript → JS via Bun) |
| **Templates** | `.php` files (interpreted at request time) | `.htx` files (interpreted at request time) |
| **Compiled?** | Engine: yes. Templates: no. | Engine: yes. Templates: no. |
| **Hot reload** | Edit `.php`, refresh, see changes | Edit `.htx`, refresh, see changes |

The engine is compiled. The templates are interpreted. This separation is fundamental.

## Request Pipeline: Template to HTML

Every request follows this path. No step converts the template to executable code.

```
1. READ         readFileSync(path) → raw string
2. INCLUDES     regex match <htx:include> → read + splice strings
3. PARSE BLOCKS regex match <htx:type>, <htx:action> → metadata objects
4. PROVIDERS    context providers resolve() → data objects
5. EXPRESSIONS  lexer → segments → parser → AST → evaluator walks AST → output string
6. HYDRATE      regex replace __placeholder__ with data values → string
7. LAYOUT       readFileSync(_layout.htx) → replace __content__ → wrapped string
8. RESPONSE     string → HTTP 200
```

### Step 1: Read from Disk

```typescript
let content = readFileSync(match.filePath, "utf8");
```

The template is read as a UTF-8 string. Fresh read on every request — no caching. This is why template changes are instant: edit the file, refresh the browser, see the change. No restart, no rebuild.

### Step 2: Include Expansion

```
/<htx:include src="partials/_nav.htx" \/>/g
```

The engine scans for `<htx:include>` tags via regex and replaces each one with the contents of the referenced file. The result is still a string.

### Step 3: Block Parsing

The DSL parser extracts metadata from `<htx:type>`, `<htx:where>`, `<htx:action>` and other directive tags using regex. It produces metadata objects (key-value pairs), not code.

```
Input:  "<htx:type>post</htx:type><htx:where>status=published</htx:where>"
Output: { type: "post", where: "status=published" }
```

No compilation. Just regex extraction of tag content into a plain object.

### Step 4: Context Providers

Each registered context provider's `resolve()` method runs with the current request. The returned objects are merged into the template's data scope for expression evaluation.

### Step 5: Expression Evaluation

This is the most complex step, and it's where the interpreter model is clearest. Three sub-stages:

**Lexer** — scans the string for `{{ }}` markers via `indexOf()`. Produces an array of segments (text vs expression). Not a tokenizer in the compiler sense — just string splitting.

**Parser** — walks the segments and builds an AST (Abstract Syntax Tree). The AST is a plain JavaScript object graph:

```
{{ if count > 0 }}

Becomes:
{
  kind: "if",
  condition: {
    kind: "binary_op",
    operator: ">",
    left: { kind: "field_ref", name: "count" },
    right: { kind: "literal", value: 0 }
  },
  body: [...]
}
```

This is an object, not a function. It's data that describes what to do, not code that does it.

**Evaluator** — walks the AST via recursive `switch` statements:

```typescript
switch (node.kind) {
  case "text":     return node.text;
  case "output":   return escapeHtml(String(this.resolveValue(node.expression)));
  case "if":       return this.evaluateIf(node);
  case "each":     return this.evaluateEach(node);
}
```

No `eval()`. No `new Function()`. No code generation. The evaluator reads the AST nodes and produces string output by looking up values in the data scope.

### Step 6: Hydration

The Hydrator replaces `__placeholder__` markers with data values using `String.replaceAll()`:

```typescript
for (const [key, value] of Object.entries(data)) {
  html = html.replaceAll(`__${key}__`, escapeValue(value));
}
```

Pure string replacement. Input string, output string.

### Step 7: Layout Wrapping

Layout files are read from disk (another `readFileSync()`) and the `__content__` marker is replaced with the accumulated output via `String.replace()`.

### Step 8: Response

The final string is wrapped in an HTTP response with `Content-Type: text/html`. The template was a string the entire time.

## What This Means

### Instant hot reload

Because templates are read from disk on every request, changes are immediate. No build step, no file watcher, no HMR WebSocket. Edit the file, refresh the browser.

### Templates are safe by design

Templates cannot execute arbitrary code because the interpreter only supports a fixed set of operations: output expressions, conditionals, loops, and data access. There is no `eval()`, no `import`, no filesystem access. This is an architectural constraint, not a convention.

### No build step

There is nothing to compile, bundle, or transpile. The engine is the only compiled artifact (TypeScript → JavaScript via Bun at boot). Templates go from disk to browser as-is.

## How HTX Differs from Other Frameworks

| Framework | Template Model | Compiled To |
|-----------|---------------|-------------|
| **Next.js / React** | JSX | JavaScript function calls |
| **Astro** | `.astro` components | JavaScript |
| **Svelte** | `.svelte` components | JavaScript + DOM ops |
| **Handlebars** | `.hbs` templates | JavaScript template functions |
| **EJS** | `.ejs` templates | JavaScript via string eval |
| **PHP** | `.php` files | Opcodes (Zend bytecode) |
| **HTX** | `.htx` templates | **Never compiled. Interpreted as text.** |

HTX is the only TypeScript web framework where templates remain text throughout the entire pipeline. Every other framework eventually converts its templates to executable code. HTX's engine interprets them without that transformation.

## The Three Differentiators

**1. The security boundary is architectural, not conventional.**
In most frameworks, you can accidentally put dangerous logic in a template. In HTX, you literally cannot — the interpreter won't execute it. This isn't a linting rule; it's a hard constraint enforced by the engine.

**2. No build step, instant feedback.**
Edit a `.htx` file, refresh the browser, see the change. No webpack, no Vite, no HMR. The interpreter reads the file fresh on every request. This is what PHP developers loved before the JavaScript ecosystem made everyone forget it was possible.

**3. The engine is the only compiled artifact.**
Your application's behavior is defined by templates (interpreted) and modules (compiled TypeScript). The separation is clean: modules are code, templates are data. The engine sits between them.
