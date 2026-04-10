# PRESTO Test Fixtures

Input/output pairs for verifying htxlang engine conformance. Each fixture specifies source template, data context, and expected output.

## Fixture 1: Basic Expression

**Source:**
```html
<p><htx:v>name</htx:v></p>
```

**Data:** `{name: "Jared"}`

**Expected:**
```html
<p>Jared</p>
```

## Fixture 2: Expression with Pipe

**Source:**
```html
<span><htx:v>title | uppercase</htx:v></span>
```

**Data:** `{title: "presto"}`

**Expected:**
```html
<span>PRESTO</span>
```

## Fixture 3: Attribute Binding

**Source:**
```html
<a href="/blog/{htx:post.slug}"><htx:v>post.title</htx:v></a>
```

**Data:** `{post: {slug: "hello", title: "Hello World"}}`

**Expected:**
```html
<a href="/blog/hello">Hello World</a>
```

## Fixture 4: HTML Escaping

**Source:**
```html
<p><htx:v>content</htx:v></p>
```

**Data:** `{content: "<script>alert('xss')</script>"}`

**Expected:**
```html
<p>&lt;script&gt;alert('xss')&lt;/script&gt;</p>
```

## Fixture 5: Raw Output

**Source:**
```html
<div><htx:v raw>html</htx:v></div>
```

**Data:** `{html: "<b>bold</b>"}`

**Expected:**
```html
<div><b>bold</b></div>
```

## Fixture 6: Script Protection

**Source:**
```html
<p><htx:v>name</htx:v></p>
<script>var x = "{{ safe }}";</script>
```

**Data:** `{name: "Test"}`

**Expected:**
```html
<p>Test</p>
<script>var x = "{{ safe }}";</script>
```

## Fixture 7: htx:raw Block

**Source:**
```html
<htx:raw><htx:v>not.evaluated</htx:v></htx:raw>
```

**Data:** `{}`

**Expected:**
```html
<htx:v>not.evaluated</htx:v>
```

## Fixture 8: Include

**partials/nav.htx:**
```html
<nav>Home | About</nav>
```

**Source:**
```html
<htx:include src="/partials/nav.htx" />
<p>Content</p>
```

**Expected:**
```html
<nav>Home | About</nav>
<p>Content</p>
```

## Fixture 9: Component with Props and Slot

**components/card.htx:**
```html
<htx:props>
title = "Default"
</htx:props>
<div class="card"><h3>{{ title }}</h3><htx:slot /></div>
```

**Source:**
```html
<htx:component src="components/card.htx" title="Hello">
  <p>Slot content here.</p>
</htx:component>
```

**Expected:**
```html
<div class="card"><h3>Hello</h3>
  <p>Slot content here.</p>
</div>
```

## Fixture 10: Iteration

**Source:**
```html
<htx:each items="items" as="item">
<li><htx:v>item.name</htx:v></li>
</htx:each>
```

**Data:** `{items: [{name: "A"}, {name: "B"}, {name: "C"}]}`

**Expected:**
```html
<li>A</li>
<li>B</li>
<li>C</li>
```

## Fixture 11: Empty Collection

**Source:**
```html
<htx:each items="items" as="item">
<li><htx:v>item.name</htx:v></li>
<htx:empty>
<p>No items.</p>
</htx:each>
```

**Data:** `{items: []}`

**Expected:**
```html
<p>No items.</p>
```

## Fixture 12: Conditional (True)

**Source:**
```html
<htx:if test="user">
<p>Hello, <htx:v>user.name</htx:v></p>
</htx:if>
<htx:else>
<p>Sign in</p>
</htx:else>
```

**Data:** `{user: {name: "Jared"}}`

**Expected:**
```html
<p>Hello, Jared</p>
```

## Fixture 13: Conditional (False)

**Source:** (same as Fixture 12)

**Data:** `{user: null}`

**Expected:**
```html
<p>Sign in</p>
```

## Fixture 14: Variable Binding

**Source:**
```html
<htx:let greeting="Welcome" />
<p><htx:v>greeting</htx:v></p>
```

**Data:** `{}`

**Expected:**
```html
<p>Welcome</p>
```

## Fixture 15: Layout Wrapping

**_layout.htx:**
```html
<!DOCTYPE html><html><body>__content__</body></html>
```

**Source (page.htx):**
```html
<h1>Hello</h1>
```

**Expected:**
```html
<!DOCTYPE html><html><body><h1>Hello</h1></body></html>
```

## Fixture 16: Layout None

**Source:**
```html
<htx:layout none />
<h1>Raw</h1>
```

**Expected:**
```html
<h1>Raw</h1>
```

## Fixture 17: Auth Conditional (Unauthenticated)

**Source:**
```html
<htx:auth><p>Logged in</p></htx:auth>
<htx:unauth><p>Please sign in</p></htx:unauth>
```

**Data:** `{auth: {user: null}}`

**Expected:**
```html
<p>Please sign in</p>
```

## Fixture 18: Auth Conditional (Authenticated with Role)

**Source:**
```html
<htx:auth role="admin"><p>Admin panel</p></htx:auth>
```

**Data:** `{auth: {user: {name: "Admin", role: "admin"}}}`

**Expected:**
```html
<p>Admin panel</p>
```

---

## Interface Signatures

```
Module:
  name() → string
  manifest() → {trust: "first-party"|"restricted", contextProviders?: string[], channelHandlers?: string[], middleware?: string[]}
  boot(registry: ModuleRegistry) → void

ModuleRegistry:
  registerMiddleware(mw: Middleware) → void
  registerContextProvider(name: string, provider: ContextProvider) → void
  registerChannelHandler(handler: ChannelHandler) → void

Middleware:
  name() → string
  handle(request: HtxRequest, next: () → HtxResponse) → HtxResponse

ContextProvider:
  resolve(request: HtxRequest) → Record<string, any>

ChannelHandler:
  module() → string
  handle(subPath: string, query: Record<string, string>, userId: string, context: {method: string, body: Record<string, any>}) → {status: int, data: any}

ContentAdapter:
  query({type, where?, order?, limit?, offset?}) → Record[]
  get(type, {slug?: string, id?: string}) → Record | null
  create(type, data) → Record
  update(type, id, data) → boolean
  delete(type, id) → boolean
```

---

## Complete End-to-End Example

**_layout.htx:**
```html
<!DOCTYPE html>
<html>
<head><title>PRESTO</title></head>
<body>
<nav><htx:auth><htx:v>auth.user.name</htx:v></htx:auth><htx:unauth>Guest</htx:unauth></nav>
__content__
</body>
</html>
```

**partials/footer.htx:**
```html
<footer>Built with PRESTO</footer>
```

**components/post-card.htx:**
```html
<htx:props>
title = "Untitled"
</htx:props>
<article><h2>{{ title }}</h2><htx:slot /></article>
```

**index.htx:**
```html
<htx:data type="post" where="status = 'published'" order="id desc" limit="3" as="posts" />
<htx:let heading="Recent Posts" />

<h1><htx:v>heading</htx:v></h1>

<htx:each items="posts" as="post">
<htx:component src="components/post-card.htx" title="{htx:post.title}">
  <p><htx:v>post.body</htx:v></p>
</htx:component>
</htx:each>

<htx:include src="/partials/footer.htx" />
```

**Data context (after context providers + data resolution):**
```json
{
  "auth": {"user": {"name": "Jared"}},
  "posts": [
    {"id": 3, "title": "Third", "body": "Content 3", "status": "published"},
    {"id": 2, "title": "Second", "body": "Content 2", "status": "published"},
    {"id": 1, "title": "First", "body": "Content 1", "status": "published"}
  ],
  "heading": "Recent Posts"
}
```

**Expected output:**
```html
<!DOCTYPE html>
<html>
<head><title>PRESTO</title></head>
<body>
<nav>Jared</nav>
<h1>Recent Posts</h1>

<article><h2>Third</h2>
  <p>Content 3</p>
</article>
<article><h2>Second</h2>
  <p>Content 2</p>
</article>
<article><h2>First</h2>
  <p>Content 1</p>
</article>

<footer>Built with PRESTO</footer>

</body>
</html>
```

This example exercises: layout wrapping, auth conditionals in layout (post-layout pass), htx:let, htx:data, htx:each, htx:component with props + slot, htx:v with attribute binding, htx:include, and expression evaluation. A conformant engine producing this output from these inputs is exercising the core pipeline correctly.
