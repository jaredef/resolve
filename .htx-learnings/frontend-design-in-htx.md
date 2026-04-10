# Frontend Design in HTX Templates

## Why It Works Well

HTX templates are plain HTML with scoped `<style>` tags. There's no component abstraction, no build step, no CSS-in-JS runtime, and no hydration boundary to design around. The template IS the page — what you write is exactly what the browser receives.

This makes frontend design straightforward:
- CSS goes in a `<style>` tag at the top of the template
- HTML structure follows immediately
- No framework-specific patterns (no JSX, no className, no styled-components)
- No client/server split to reason about
- No bundler configuration

## Template Structure for Marketing/Landing Pages

```html
<style>
  /* Scope all styles with a prefix to avoid collisions */
  .mk-hero { ... }
  .mk-section { ... }

  /* Responsive breakpoints */
  @media (max-width: 900px) { ... }
  @media (max-width: 640px) { ... }

  /* Animations (respect user preference) */
  @media (prefers-reduced-motion: no-preference) {
    .mk-hero > * { animation: mk-rise 0.6s ease-out both; }
    @keyframes mk-rise { ... }
  }
</style>

<!-- Sections follow as plain HTML -->
<section class="mk-hero">
  <h1 class="mk-headline">...</h1>
</section>
```

## Design Techniques

### Typography
Import distinctive fonts via Google Fonts `@import` in the `<style>` tag. Use CSS variables for font families so they're reusable:

```css
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;700;800&family=Crimson+Pro:ital@1&display=swap');

:root {
  --mk-display: 'Outfit', sans-serif;
  --mk-serif: 'Crimson Pro', Georgia, serif;
}
```

Pair a bold display font (headlines) with a serif italic (subheads) and a monospace (code/labels) for three distinct voices on one page.

### Gradient Text
```css
.headline em {
  background: linear-gradient(135deg, #4d8eff 0%, #8bb8ff 40%, #f0a848 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Ambient Glow Effects
Use `::before` pseudo-elements with radial gradients for subtle atmospheric lighting behind hero/CTA sections:

```css
.hero::before {
  content: '';
  position: absolute;
  top: -40%;
  left: 50%;
  transform: translateX(-50%);
  width: 140%;
  height: 100%;
  background: radial-gradient(ellipse at center, rgba(77,142,255,0.15) 0%, transparent 60%);
  pointer-events: none;
}
```

### Alternating Feature Sections
Use CSS grid with an order swap class to alternate text/visual sides:

```css
.section { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; }
.section.flip > .section-text { order: 2; }
.section.flip > .section-visual { order: 1; }

/* Reset on mobile */
@media (max-width: 900px) {
  .section { grid-template-columns: 1fr; }
  .section.flip > .section-text { order: 1; }
}
```

### Terminal Mockup
A realistic terminal block (with macOS-style dots) adds developer credibility:

```html
<div class="terminal">
  <div class="terminal-bar">
    <span class="dot" style="background:#ff5f57"></span>
    <span class="dot" style="background:#ffbd2e"></span>
    <span class="dot" style="background:#28c840"></span>
  </div>
  <div class="terminal-body">
    <span class="prompt">$</span> bun create hypermedia-app my-site
  </div>
</div>
```

### Staggered Entrance Animations
Apply increasing `animation-delay` to hero children for a polished load sequence:

```css
@media (prefers-reduced-motion: no-preference) {
  .hero .kicker    { animation: rise 0.6s ease-out 0.05s both; }
  .hero .headline  { animation: rise 0.6s ease-out 0.10s both; }
  .hero .subhead   { animation: rise 0.6s ease-out 0.15s both; }
  .hero .ctas      { animation: rise 0.6s ease-out 0.20s both; }
}
```

## Advantages Over React/SPA Approaches

| Concern | HTX | React |
|---------|-----|-------|
| Styling | `<style>` tag, done | CSS modules, styled-components, Tailwind, or CSS-in-JS — pick one and configure |
| Component boundaries | Not needed — HTML sections | Must decide component tree, props, re-render boundaries |
| Fonts | `@import` in style tag | Configure in `_app.tsx`, `next/font`, or global CSS |
| Animations | CSS `@keyframes` + `animation-delay` | CSS or Framer Motion dependency |
| Responsive | Media queries | Same, but also responsive state hooks for conditional rendering |
| Code examples | Raw HTML in template | JSX escaping, dangerouslySetInnerHTML, or MDX |
| Build time | Zero | Bundler, transpiler, tree-shaking, chunk splitting |
| FOUC risk | None (server-rendered) | Possible during hydration |

## Key Principle

The template is the source of truth. No abstraction layer sits between your design intent and the browser's rendering. This makes iteration fast — edit the `.htx` file, refresh, see the result.
