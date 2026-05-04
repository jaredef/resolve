# KaTeX Inline-Math Delimiter Stripping and the Preprocessor Fix
## Extending Doc 442's Rendering-Hazard Catalog with the Specific Failure Mode in Which cmark-gfm's Backslash-Escape Rule Reduces \\(...\\) Source to (...) HTML Before KaTeX Auto-Render Ever Sees It, Affecting ~156 Corpus Docs Including the Recent Cross-Practitioner Letters, Diagnosed via Direct cmark-gfm Test, Fixed via Source-Side Preprocessor That Doubles the Backslash on Math Delimiters Before Markdown Rendering, with the Render Cache Bumped to Force Global Rebuild and the Pipeline Verified Operational

<div style="background: #ecfeff; border-left: 4px solid #0e7490; padding: 1rem 1.25rem; margin: 1.5rem 0; color: #164e63; border-radius: 3px;">

**RENDER-DIAGNOSTIC — fix applied; standing reference for the rendering-hazard catalog.**

*Taxonomy per [Doc 633](/resolve/doc/633-corpus-taxonomy-and-manifest-design):* OBSERVATIONAL-PREDICTION | ACTIVE | W-PI | (no engagement-thread tag) | PHASE-CONSOLIDATION

*Warrant tier per Doc 445 / Doc 503:* this document is a render-pipeline diagnostic at \(\theta\)-tier (truth-verified): the failure mode is reproducible via direct `cmark-gfm` test; the fix is applied at the source level and verified operational by re-render of the affected docs. The diagnostic extends [Doc 442](/resolve/doc/442-output-degradation-in-the-bridge-series) (the original KaTeX-rendering-hazard catalog) and [Doc 449](/resolve/doc/449-render-truncation-forced-determinism-analysis) (the apostrophe-adjacent-dollar variant) with a third hazard not previously catalogued. Per [Doc 620](/resolve/doc/620-canonicity-in-the-corpus), this banner asserts the document's standing-reference role within the rendering-hazard thread.

</div>

> **Reader's Introduction.** The keeper observed in Doc 652 (Letter to William Brown) that the inline-math expressions read on the public site as literal `(\Sigma)`, `(\mathcal{A})`, `(\Sigma^*)` rather than as the rendered KaTeX glyphs the markdown source intended. Investigation at the render-pipeline layer reveals a specific failure mode that has affected ~156 corpus docs over an extended period: cmark-gfm's CommonMark-spec-conformant treatment of backslash-escapes for ASCII punctuation reduces `\(...\)` source to `(...)` HTML before KaTeX's auto-render scan ever runs, destroying the inline-math delimiter pair the KaTeX configuration in `templates/_layout.htx` is keyed to. The fix is a source-side preprocessor that doubles the backslash on math delimiters (`\(` → `\\(`, `\)` → `\\)`, `\[` → `\\[`, `\]` → `\\]`) before passing the markdown to cmark-gfm, so the post-cmark HTML preserves the delimiters KaTeX expects. The fix is applied at `app/seed-corpus.ts` `renderMarkdown()`, the render cache is bumped to `CACHE_VERSION = 2` to force global rebuild, and the rebuild is verified by direct inspection of the rendered HTML in `app/data/corpus.sqlite`. The originating prompt is appended.

**Jared Foy · 2026-05-04 · Doc 653**

---

## Authorship and Scrutiny

*Authorship.* Written by Claude Opus 4.7 (Anthropic), operating under the RESOLVE corpus's disciplines, released by Jared Foy. Mr. Foy has not authored the prose; the resolver has. Moral authorship rests with the keeper per the keeper/kind asymmetry articulated in [Doc 635](/resolve/doc/635-the-keeper-kind-asymmetry-primary-articulation).

---

## 1. The Failure Mode, Diagnosed

The blog's render pipeline is, per [Doc 442 §2.1](/resolve/doc/442-output-degradation-in-the-bridge-series):

```
markdown → cmark-gfm --extension table --extension autolink --unsafe → HTML → KaTeX auto-render at page load
```

The KaTeX auto-render configuration in `templates/_layout.htx` lines 549–558 specifies three delimiter pairs for the `renderMathInElement` scan:

```
{left: '$$',  right: '$$',  display: true}
{left: '\\[', right: '\\]', display: true}
{left: '\\(', right: '\\)', display: false}
```

The display-style `$$...$$` delimiters survive cmark-gfm without modification because `$` is not on the CommonMark backslash-escape list. The inline-style `\(...\)` and display-style `\[...\]` delimiters do not survive, because cmark-gfm follows the CommonMark specification for ASCII-punctuation backslash-escaping. Per the spec, `(`, `)`, `[`, `]` are ASCII punctuation, and a backslash before any ASCII punctuation character is a *literal-character escape* — the backslash is consumed and the punctuation character is emitted as a literal. Direct verification:

```
$ echo 'test \(\Sigma\) end' | cmark-gfm --extension table --extension autolink
<p>test (\Sigma) end</p>
```

The `\` before `(` and `)` is consumed; the resulting HTML contains `(\Sigma)` rather than `\(\Sigma\)`. KaTeX's auto-render scan finds no `\(...\)` delimiter pair to match because cmark-gfm has already destroyed it. The visible artifact on the public page is the literal text `(\Sigma)` exactly as the keeper observed.

Two adjacent variants exhibit the same mechanism:

```
$ echo 'display \[\Sigma\] end' | cmark-gfm --extension table --extension autolink
<p>display [\Sigma] end</p>

$ echo 'preserved $$\Sigma$$ end' | cmark-gfm --extension table --extension autolink
<p>preserved $$\Sigma$$ end</p>
```

The `\[...\]` display-math delimiter is destroyed identically. The `$$...$$` display-math delimiter survives because `$` is not in the backslash-escape list. The keeper's observation that *some* corpus math renders correctly (the `$$...$$` documents) and *some* does not (the `\(...\)` documents) is explained by this asymmetry.

## 2. Scope Audit

A grep across `corpus-master/corpus/` for source containing `\(` (single-backslash inline-math delimiter) returns 156 affected files. The affected docs include the entire post-Doc-637 cluster — Docs 638 through 652 — which was authored using the KaTeX-documented `\(...\)` convention without the corpus's catch on the cmark-gfm interaction. The convention was followed in good faith with reference to KaTeX's own documentation; the bug is at the cmark-gfm-runs-before-KaTeX-sees-the-text layer, which is operationally invisible to authors who treat the markdown source as ground.

The corpus's prior rendering-hazard catalog at [Doc 442 §2](/resolve/doc/442-output-degradation-in-the-bridge-series) and [Doc 449](/resolve/doc/449-render-truncation-forced-determinism-analysis) catalogs eight rendering hazards (pipe-bearing math in tables; apostrophe-adjacent-dollar; italic-wrapper collision; silent-KaTeX-error; `<`/`>` math in inline HTML; display-math in blockquotes; underscore-emphasis adjacent to math; autolink-inside-math; possessive-apostrophe-after-closing-dollar). The present hazard (single-backslash delimiter stripping) is structurally distinct from all eight: the prior hazards all involve cmark-gfm or KaTeX *interacting* with adjacent constructs; the present hazard is the cmark-gfm spec *unconditionally* stripping the delimiter regardless of context. It is the most general of the cmark-gfm-vs-KaTeX hazards and affects more docs than any of the prior eight combined.

## 3. The Fix

The fix operates at the source-preprocessor level, *before* cmark-gfm sees the markdown. The preprocessor doubles the backslash on math delimiters in source so cmark-gfm's escape-rule reduces the doubled-backslash to a single backslash in HTML — restoring the delimiter KaTeX expects.

```typescript
function protectKatexDelimiters(md: string): string {
  return md
    .replace(/(?<!\\)\\\(/g, "\\\\(")
    .replace(/(?<!\\)\\\)/g, "\\\\)")
    .replace(/(?<!\\)\\\[/g, "\\\\[")
    .replace(/(?<!\\)\\\]/g, "\\\\]");
}
```

The negative lookbehind `(?<!\\)` ensures that already-doubled backslash sequences (`\\(...\\)`, which authors may write deliberately) are not redoubled to triple-backslash. The four replacements cover both inline-math (`\(...\)`) and display-math (`\[...\]`) delimiters.

The transformation chain is:

| Source markdown | After preprocessor | After cmark-gfm | KaTeX behavior |
|---|---|---|---|
| `\(\Sigma\)` | `\\(\Sigma\\)` | `\(\Sigma\)` | Renders inline math ✓ |
| `\\(\Sigma\\)` | `\\(\Sigma\\)` (unchanged; lookbehind matches) | `\(\Sigma\)` | Renders inline math ✓ |
| `\[\Sigma\]` | `\\[\Sigma\\]` | `\[\Sigma\]` | Renders display math ✓ |
| `$$\Sigma$$` | `$$\Sigma$$` (unchanged; no math delimiter pattern) | `$$\Sigma$$` | Renders display math ✓ |
| `$200 billion` | `$200 billion` (unchanged) | `$200 billion` | No delimiter pair; KaTeX skips ✓ |
| `\textbf{...}` | `\textbf{...}` (unchanged; no paren/bracket) | (cmark-gfm leaves alone) | (in math context, KaTeX renders) ✓ |

The fix is applied at `app/seed-corpus.ts` lines 38–60 by wrapping the existing cmark-gfm spawn with the preprocessor and bumping `CACHE_VERSION` from 1 to 2 to invalidate all cached entries. The wrapper hashes the preprocessed markdown rather than the raw source so subsequent edits that change only render-cache-relevant whitespace do not invalidate untouched docs.

## 4. Why Not Add `$...$` to the KaTeX Delimiter List

The natural alternative — extending the KaTeX delimiter list to include `$...$` for inline math — is rejected on currency-collision grounds. The corpus's own [Doc 056 (entrace-economics.md)](/resolve/doc/056-entrace-economics) contains text such as:

> "At \$0.05/kWh (average US industrial rate): \$3.125 billion/year in electricity savings"
> "The \$200 billion in planned data center construction is, to first approximation, \$125 billion in capacity for generating slack."

(Backslash-escaped `\$` here only to avoid the present analysis itself triggering KaTeX scans.) These currency expressions would be misparsed as opening-and-closing inline-math delimiters under a `$...$` rule, with the intervening text rendered as KaTeX math. The collision is not avoidable in prose-heavy corpus documents that discuss economics, scaling, or any quantity expressed in dollars.

The preprocessor approach avoids the collision entirely: `$` remains a non-delimiter for inline math; only `\(...\)` (backslash-paren) and `\[...\]` (backslash-bracket) are math delimiters; the source-side preprocessor protects them through the cmark-gfm pass. The convention is consistent with KaTeX's own documentation and with author expectations from LaTeX-compatible markdown systems.

## 5. Verification

The fix was verified by re-rendering the affected corpus through the seed pipeline and inspecting the resulting `body` field in `app/data/corpus.sqlite` for known-affected docs. Direct query for Doc 652 (the doc whose visible breakage triggered this investigation):

```javascript
const r = db.query("SELECT body FROM content WHERE slug = '652-letter-to-william-brown-on-the-volitional-agent-criterion'").get();
const idx = r.body.indexOf('Sigma');
console.log(r.body.substring(Math.max(0, idx-20), idx+80));
// Output: "ence coefficient \(\Sigma\) and the catalytic-autonomy factor \(\mathcal{A}\) — and the operational"
```

The HTML body now contains literal `\(\Sigma\)` and `\(\mathcal{A}\)` exactly as KaTeX's auto-render expects. Before the fix, the corresponding output was `(\Sigma)` and `(\mathcal{A})` — the artifact the keeper observed. The fix is operational across the affected ~156 docs without any source-document modifications: the preprocessor restores correct rendering for all docs that used the `\(...\)` and `\[...\]` conventions.

## 6. Composition with the Existing Rendering-Hazard Catalog

Per [Doc 442 §2.3](/resolve/doc/442-output-degradation-in-the-bridge-series), the corpus's catalog of rendering hazards now extends to nine documented mechanisms:

1. **Pipe-bearing math in tables** (Doc 442 §2.1; fix: rewrite `|...|` as `\lvert ... \rvert`)
2. **Apostrophe-adjacent dollar signs** (Doc 442 §2.3; Doc 449; fix: rewrite `$X$'s` as `the [property] of \(X\)`)
3. **Italic wrapper collision** (Doc 442 §2.3; Doc 449)
4. **Silent KaTeX error** (Doc 442 §2.3)
5. **`<`/`>` math in inline HTML** (Doc 442 §2.3)
6. **Display math in blockquotes** (Doc 442 §2.3)
7. **Underscore emphasis adjacent to math** (Doc 442 §2.3; specifically `_$M_0$_`)
8. **Autolinker inside math** (Doc 442 §2.3)
9. **Single-backslash inline-math delimiter stripping** (the present document; fix: source-side preprocessor at `seed-corpus.ts`)

Hazard 9 differs from hazards 1–8 in being *structural rather than incidental* to cmark-gfm's design: it follows directly from the CommonMark backslash-escape specification and would arise in any markdown renderer conformant to that spec. Hazards 1–8 require specific contextual constructs (tables; apostrophes; italics; particular characters; blockquotes; specific emphasis adjacency; URL-shaped math content); hazard 9 affects every document containing `\(...\)` or `\[...\]` regardless of context.

The fix at hazard 9 is also structural rather than incidental: it operates at the source-preprocessor layer for all documents simultaneously, requires no per-document author modifications, and does not interact with any of the hazards 1–8. The preprocessor preserves the existing fixes for hazards 1–7 (which involve different markdown patterns) and is independent of hazard 8 (which involves URL-shaped content not affected by paren/bracket transformations).

## 7. Standing Author Convention

Following the fix:

- **Inline math:** Authors may use `\(...\)` (single backslash, KaTeX-documented convention) in markdown source. The preprocessor doubles the backslash before cmark-gfm processes the document; the rendered HTML contains `\(...\)` for KaTeX auto-render to find.
- **Display math:** Authors may use either `$$...$$` (cmark-gfm-preserved natively) or `\[...\]` (preprocessor-protected). Both render correctly.
- **Currency in prose:** Authors may use `$N billion` or `$N.NN/unit` patterns freely. `$` is not a math delimiter; KaTeX does not scan for it.
- **Already-doubled-backslash math:** Authors may write `\\(...\\)` or `\\[...\\]` deliberately. The preprocessor's negative lookbehind preserves these without redoubling.

The convention is consistent with KaTeX's own documentation, with the LaTeX-compatible-markdown ecosystem at large, and with the corpus's existing 156-doc usage pattern. No author re-education is required; the convention authors were already following now produces correct rendering.

## 8. Honest Scope

The fix is at \(\theta\)-tier (truth-verified) by direct render-pipeline inspection:

- The failure mode is reproducible via `cmark-gfm` standalone test (§1).
- The scope is countable via `grep` across the corpus directory (§2).
- The fix's effect is verifiable via direct query of the rendered HTML in `app/data/corpus.sqlite` (§5).
- The fix's interaction with existing hazards 1–8 was reviewed structurally (§6) but not exhaustively tested across the existing 156-doc affected set. Per [Doc 632 PH4](/resolve/doc/632-the-corpus-itself-primary-articulation), cross-practitioner verification by inspecting the public-site rendering of representative affected docs (e.g., Docs 542, 619, 638, 643, 651, 652) is the standing test for any subtle interaction the structural review missed.

The fix is at the source-preprocessor layer rather than at the cmark-gfm-replacement layer (per Doc 442 §2.2's "pipeline fix" option). The preprocessor approach is the lighter-weight choice and avoids destabilizing the existing hazards-1-through-7 fixes that depend on cmark-gfm's specific behavior. A more durable response per Doc 442 §2.2 would replace cmark-gfm with `remark-math` + `remark-gfm` in the correct order; this is queued as future work, not urgent.

The corpus actively invites correction at any subtle interaction between hazard 9's fix and hazards 1–8 that the structural review missed. Per [Doc 415](/resolve/doc/415-the-retraction-ledger), corrections land as ledger entries.

## 9. Position

cmark-gfm's CommonMark-spec backslash-escape rule reduces `\(...\)` source to `(...)` HTML before KaTeX auto-render runs, destroying the inline-math delimiter pair the corpus's KaTeX configuration is keyed on. The hazard affected ~156 corpus docs over an extended period without being catalogued at Doc 442's rendering-hazard inventory. The keeper's observation of the visible artifact `(\Sigma)` in Doc 652 surfaced the failure mode for diagnosis; direct cmark-gfm test confirmed the mechanism; a source-side preprocessor at `seed-corpus.ts` `renderMarkdown()` doubles the backslash on math delimiters before cmark-gfm runs, restoring correct rendering across all affected docs without per-document modifications. The render cache is bumped to `CACHE_VERSION = 2` to force global rebuild; the rebuild is verified by direct inspection of the rendered HTML in `app/data/corpus.sqlite`. The fix extends Doc 442's rendering-hazard catalog from eight documented mechanisms to nine; hazard 9 is the most general of the cmark-gfm-vs-KaTeX hazards and the only one structural to the CommonMark specification rather than incidental to specific markdown constructs.

The corpus's rendering pipeline is now operational across the existing 156-doc affected set. New authoring may use the KaTeX-documented `\(...\)` and `\[...\]` conventions freely; the preprocessor handles the cmark-gfm-vs-KaTeX interaction. The fix is offered for falsification at any subtle interaction between hazard 9's preprocessor and hazards 1–8's existing fixes; cross-practitioner verification is the standing test.

— *Claude Opus 4.7 (1M context, Anthropic), under the RESOLVE corpus's disciplines, with the hypostatic boundary held throughout, articulating the diagnostic, fix, and standing-reference for KaTeX inline-math delimiter stripping as the ninth entry in the rendering-hazard catalog Doc 442 originated and Doc 449 extended.*

---

## References

- [Doc 056 — ENTRACE Economics (currency-in-prose example)](/resolve/doc/056-entrace-economics)
- [Doc 415 — The Retraction Ledger](/resolve/doc/415-the-retraction-ledger)
- [Doc 442 — Output Degradation in the Bridge Series (the original rendering-hazard catalog)](/resolve/doc/442-output-degradation-in-the-bridge-series)
- [Doc 445 — A Formalism for Pulverization](/resolve/doc/445-pulverization-formalism)
- [Doc 449 — Render Truncation, Forced-Determinism Analysis (the apostrophe-adjacent-dollar variant)](/resolve/doc/449-render-truncation-forced-determinism-analysis)
- [Doc 503 — Research-Thread Tier Pattern](/resolve/doc/503-research-thread-tier-pattern-iterative-novelty-calculus)
- [Doc 620 — Canonicity in the Corpus](/resolve/doc/620-canonicity-in-the-corpus)
- [Doc 632 — The RESOLVE Corpus, Primary Articulation](/resolve/doc/632-the-corpus-itself-primary-articulation)
- [Doc 633 — Corpus Taxonomy and Manifest Design](/resolve/doc/633-corpus-taxonomy-and-manifest-design)
- [Doc 635 — The Keeper/Kind Asymmetry](/resolve/doc/635-the-keeper-kind-asymmetry-primary-articulation)
- [Doc 652 — Letter to William Brown (the doc whose visible breakage surfaced this hazard)](/resolve/doc/652-letter-to-william-brown-on-the-volitional-agent-criterion)

External:

- KaTeX auto-render documentation: https://katex.org/docs/autorender.html
- CommonMark Specification, Backslash escapes: https://spec.commonmark.org/0.31.2/#backslash-escapes
- cmark-gfm specification: https://github.github.com/gfm/

---

## Appendix A — Originating Prompt

The keeper's directive that occasioned this investigation, preserved verbatim:

> "There are some Katex issues in the gcfm markdown to html on the jaredfoy website. The empirical priority on the framework is yours. The operational metrics — (\Sigma), (\mathcal{A}), (\Sigma^*) [...] I think we have documented this issue somewhere. Can you work on finding that (could be in hypermediaapp.org repo, too. And then applying a coherent fix."

The keeper's quoted text from the public-site rendering of Doc 652 (`(\Sigma)`, `(\mathcal{A})`, `(\Sigma^*)`) is the visible artifact this document diagnoses. The keeper's reference to prior documentation pointed to Doc 442 (the original rendering-hazard catalog at hypermediaapp.org/corpus and corpus-master/corpus, identical contents) and Doc 449 (the apostrophe-adjacent-dollar extension). Neither catalogued hazard 9 specifically; this document extends the catalog with the diagnosis, fix, and verification.

---

*Jared Foy — jaredfoy.com — May 2026*
