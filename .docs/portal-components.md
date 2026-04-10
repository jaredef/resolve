# Portal Components

A portal component is an `htx:component` that renders in one place but writes to another part of the DOM. The component lives in a page template (where the ComponentResolver processes it), but its `htx:script` populates an element defined in the layout.

This solves a specific problem: layouts are applied after component resolution, so `htx:component` tags inside layouts aren't processed. Portal components bridge this gap — the component is declared in the page template, but its effect targets the layout.

## The Pattern

**Layout** — defines the shell with a known ID:

```html
<!-- docs/_layout.htx -->
<div class="shell">
  <aside class="sidebar">
    <htx:include src="/partials/_nav.htx" />
  </aside>
  <div class="main">
    __content__
  </div>
  <aside class="toc" id="toc-root">
    <div class="toc-label">On this page</div>
    <ul class="toc-list"></ul>
  </aside>
</div>
```

**Page template** — declares the component:

```html
<!-- docs/[slug].htx -->
<div class="doc-fragment">
  <!-- ... page content ... -->
  <htx:component src="components/toc.htx" target=".main"></htx:component>
</div>
```

**Component** — renders hidden, writes to the layout element:

```html
<!-- components/toc.htx -->
<htx:props>
target = ".main"
</htx:props>
<span style="display:none;"></span>
<htx:script>
  var root = document.getElementById('toc-root');
  if (!root) return;
  var list = root.querySelector('.toc-list');

  // Query headings from the target area
  var headings = document.querySelectorAll('{{ target }} h2, {{ target }} h3');
  headings.forEach(function(h) {
    if (!h.id) h.id = h.textContent.trim().toLowerCase()
      .replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.href = '#' + h.id;
    a.textContent = h.textContent;
    li.appendChild(a);
    list.appendChild(li);
  });
</htx:script>
```

## Why This Works

The HTX rendering pipeline processes templates in this order:

1. **IncludeResolver** — expands `<htx:include>` tags
2. **ComponentResolver** — resolves `<htx:component>`, extracts `<htx:script>` into IIFEs
3. **DSL Parser** — processes `<htx:type>`, queries, etc.
4. **Executors** — fetch data
5. **Expression Engine** — evaluate `{{ }}` expressions
6. **Hydrator** — replace placeholders
7. **LayoutResolver** — wrap with layout (last step)

Components are resolved at step 2. Layouts are applied at step 7. This means:

- `htx:component` in a **page template** → resolved at step 2 (works)
- `htx:component` in a **layout** → never reaches the ComponentResolver (doesn't work)

The portal pattern puts the component in the page template (step 2) but targets a DOM element that only exists after the layout wraps the content (step 7). The `htx:script` runs in the browser after the full HTML is assembled, so `document.getElementById('toc-root')` finds the layout element.

## Props as Configuration

The component accepts props to configure its behavior:

```html
<htx:component src="components/toc.htx" target=".main"></htx:component>
```

The `target` prop becomes `'{{ target }}'` inside the script — the expression engine evaluates it at render time and embeds the value as a string literal in the IIFE.

This makes the component reusable. The same TOC component could target different content areas:

```html
<!-- On a docs page -->
<htx:component src="components/toc.htx" target=".docs-main"></htx:component>

<!-- On a blog page -->
<htx:component src="components/toc.htx" target=".blog-content"></htx:component>
```

## The Hidden Anchor

Every `htx:component` needs a root HTML element for the `el` binding and `data-htx-id` attribute. Portal components render a hidden element since their visible output goes elsewhere:

```html
<span style="display:none;"></span>
```

This is the component's DOM anchor. The `htx:script` receives `el` pointing to this span, but the script ignores `el` and writes to the portal target instead.

## Real Example: Table of Contents

The documentation site uses a portal component for the "On this page" sidebar:

**Layout** (`docs/_layout.htx`) renders a three-column grid:
- Left: navigation sidebar
- Center: page content
- Right: empty TOC shell with `id="docs-toc-root"`

**Page template** (`docs/[slug].htx`) includes the component after the article content. The ComponentResolver extracts the `htx:script` and injects it as an IIFE before `</body>`.

**Component** (`components/docs-toc.htx`) runs at page load:
1. Finds `#docs-toc-root` in the layout
2. Queries all `h2` and `h3` headings in `.docs-main`
3. Auto-generates IDs from heading text
4. Builds anchor links in the TOC list
5. Attaches a scroll listener for active section tracking
6. Rebuilds on `htmx:afterSwap` when content changes via sidebar navigation

The result: a server-rendered layout with a client-populated TOC, using the standard component architecture.

## When to Use Portals

**Use a portal component when:**
- You need client behavior that targets a layout element (sidebars, headers, footers)
- The component needs props from the page context
- You want the behavior scoped and reusable via `htx:component`

**Don't use a portal when:**
- The target element is inside the same template — use a regular component with `el`
- The behavior is layout-level with no page-specific configuration — use a plain `<script>` in the layout
- The content should be server-rendered — use a context provider instead
