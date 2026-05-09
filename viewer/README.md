# Resolve Corpus Viewer

A small static-site builder that turns this repo's `corpus/` and `systems-engineering/` directories into a browsable static website at `dist/`.

The pre-built `dist/` is checked into the repository, so most readers do not need to install anything. **Just open `dist/index.html` in any browser.** No server, no toolchain.

This `viewer/` directory is only needed if you are editing the corpus and want to regenerate `dist/`.

## Rebuilding

```sh
cd viewer
bun install
bun run build
```

This regenerates `dist/` from the current state of `corpus/` and `systems-engineering/`. After running, commit the updated `dist/` so other readers see the new content.

If you do not have Bun installed, the [Bun install instructions](https://bun.sh) take roughly thirty seconds.

## What the build does

- Reads every `*.md` file from `corpus/` and `systems-engineering/`.
- Extracts the document number, title, and subtitle.
- Runs the same KaTeX-delimiter source preprocessor the published site uses (so `\(...\)` inline math survives the markdown→HTML pass).
- Rewrites internal cross-references of the form `/resolve/doc/SLUG` to relative paths so the static site is fully self-contained.
- Renders each document through GitHub-flavored markdown.
- Wraps each in a minimal layout with a sticky header, search box, and KaTeX auto-render config matching the published site.
- Generates `dist/index.html` (the corpus listing), `dist/systems-engineering.html`, and `dist/search-index.json` for client-side search.

## Footprint

- Dependency: a single npm package (`marked`) for the markdown→HTML pass.
- Output size: roughly 20 MB for the full corpus (one HTML file per document plus a small search index).
- No server is required at runtime; the static `dist/` works when opened directly in a browser, including over `file://` URLs.

## Customizing

- Layout template: `templates/layout.html`.
- Styles: `static/style.css`.
- Client-side search: `static/search.js`.
- Build script: `build.ts`.

The viewer is intentionally minimal. It is a reading interface, not the published site at [jaredfoy.com/resolve](https://jaredfoy.com/resolve), which has additional features (cross-reference graph, taxonomy navigation, blog series).
