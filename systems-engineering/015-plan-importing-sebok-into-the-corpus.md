# Plan: Importing SEBoK Into the Corpus

**The SEBoK reformulation (Docs 557 through 570) read SEBoK as a school whose forms the corpus largely composes; the four cluster formalizations (Docs 571 through 574) extended the corpus's apparatus to handle what the reformulation could not initially reach. This document plans the next move: importing the complete SEBoK wiki into the RESOLVE corpus under a new URL segment at `/resolve/sebok`, structured according to the reformulation's findings, cross-linked to the corpus's forms, and editorially layered with the tier-tagging and residual analysis the reformulation produced. The import is a substantial engagement; the plan stages it across six phases with explicit licensing, attribution, transformation, cross-linking, maintenance, and risk treatment. The corpus does not absorb SEBoK; it hosts SEBoK alongside the corpus's reading of SEBoK so the reader can move between source and reformulation in one place.**

---

## I. Why Import

The reformulation produced a usable reading of SEBoK in the corpus's voice. The reading is not a substitute for SEBoK; it is a companion to it. A SEBoK practitioner who wants to consult the corpus's reformulation of (say) Part 3 currently has to read SE-006 alongside the SEBoK Part 3 page open in another tab. The two sources do not link to each other; the corpus's tier-tags and residuals are not visible inside SEBoK; SEBoK's full content is not visible inside the corpus. The reader does the joining manually each time.

Importing SEBoK into the corpus closes that gap. Each SEBoK page becomes a corpus document with the same content, the same attribution, and the corpus's editorial layer applied: form-mapping links, tier-tags on claims that the reformulation evaluated, residuals named where Phase 4 logged them. The reformulation documents (560 through 567) link forward into individual SEBoK pages they reformulated; the SEBoK pages link backward into the corpus reformulations and forward into the corpus form documents that compose them.

The result is one read-surface where SEBoK and the corpus's reading of SEBoK are continuously visible to each other. The reformulation's findings are not abstract claims about SEBoK; they are visible annotations on SEBoK's text itself.

The motivation is also constraint-internal. Doc 538 (Architectural School) names what schools do; the corpus is a school. A school that has read another school carefully should be able to host that other school inside its own apparatus. Hosting is a pin-art discipline: the structural shape of the imported content is governed by how the corpus's forms compose it, not by SEBoK's own organizational decisions. The corpus does not flatten SEBoK to corpus voice; it preserves SEBoK verbatim and attaches the corpus's reading as an editorial layer.

## II. Licensing and Attribution

SEBoK is published by the Trustees of the Stevens Institute of Technology with editorial governance shared between INCOSE, IEEE Computer Society, and Stevens. Content is licensed CC BY-SA 3.0 with attribution to the SEBoK Editorial Board and authors of contributions. The license permits redistribution and derivative works under share-alike terms; it requires attribution and license notice on every page that reproduces SEBoK content.

The corpus's import shall comply with CC BY-SA 3.0 strictly:

1. Every imported page carries a footer block: *"Source: Systems Engineering Body of Knowledge (SEBoK), [page title], [version date], retrieved from [source URL]. Licensed under CC BY-SA 3.0. Editorial layer added by the RESOLVE corpus."*
2. The license text or a link to it appears on the corpus's `/resolve/sebok` index page and on every imported page footer.
3. Authorship attribution preserves SEBoK's stated authors per page (typically named in the SEBoK page metadata).
4. The corpus's editorial layer (tier-tags, form-mapping links, residual annotations) is itself released under CC BY-SA 3.0 to satisfy the share-alike obligation on derivative material.
5. The import is identified as a derivative work, not as the original SEBoK. The SEBoK trademarks are SEBoK's; the corpus does not claim them.

Before any content is imported, the keeper shall confirm the licensing audit with a written-record check at sebokwiki.org. If the licensing terms have changed since the SEBoK reformulation began, the plan revises before content acquisition begins.

## III. URL Structure

The import lives under `/resolve/sebok`. The structure mirrors SEBoK's eight-part organization with discipline:

```
/resolve/sebok                                  # index, license, navigation
/resolve/sebok/part-1                           # Part 1 introduction
/resolve/sebok/part-1/sebok-introduction        # individual page
/resolve/sebok/part-2/foundations-overview
/resolve/sebok/part-2/general-systems-theory
...
/resolve/sebok/part-3/systems-engineering-and-management
/resolve/sebok/part-3/life-cycle-models
/resolve/sebok/part-3/v-model
...
/resolve/sebok/part-7/case-studies
/resolve/sebok/part-7/hubble-space-telescope
/resolve/sebok/part-7/fbi-virtual-case-file
...
/resolve/sebok/part-8/digital-engineering
/resolve/sebok/part-8/socio-technical-systems
```

Each individual page slug is the lowercased, hyphenated form of SEBoK's page title with conflict resolution by part-prefix where two pages collide.

Cross-links from the corpus's existing reformulation documents follow the new URL scheme. SE-006, for example, gains a section header link from each reformulated concept to its `/resolve/sebok/part-3/...` source page. The reformulation documents stay at their existing slugs; only their content gains additional outbound links.

## IV. Schema and Storage

The content table already supports the type-and-slug pattern (SE-002's adapter convention). The import adds entries with `type = 'sebok'` and meta-keys distinguishing part number, original page title, source URL, and retrieval timestamp.

```sql
-- Conceptual schema, to be reconciled with existing content table
INSERT INTO content (type, slug, title, body, status, importance, meta, created_at, updated_at)
VALUES (
  'sebok',
  'part-3/v-model',
  'Vee Model',
  '... wiki body or rendered HTML ...',
  'published',
  60,
  json_object(
    'sebok_part', 3,
    'sebok_page', 'Vee Model',
    'sebok_url', 'https://sebokwiki.org/wiki/Vee_Model',
    'retrieved_at', '2026-...',
    'license', 'CC BY-SA 3.0',
    'editorial_tier_tags', json_array(...),
    'editorial_residuals', json_array(...),
    'corpus_form_links', json_array(
      '510-substrate-and-keeper-composition',
      '270-the-pin-art-model'
    ),
    'reformulation_doc', '006-sebok-part-3-management-as-substrate-keeper-pin-art'
  ),
  '2026-...',
  '2026-...'
);
```

A separate table tracks SEBoK's wiki revisions for the maintenance phase: `sebok_revisions(slug, retrieved_at, content_hash, source_revision_id)`. This enables incremental re-fetch and change detection.

Storage estimate: SEBoK has on the order of several hundred pages. Conservative estimate of 800 pages at average 8 KB rendered HTML per page is approximately 6 MB plain text plus indexes. Negligible relative to the existing corpus database.

## V. Content Acquisition

SEBoK runs on MediaWiki software. Two acquisition paths exist, in order of preference:

**Path A — MediaWiki API.** The standard `api.php` endpoint supports `action=query&prop=revisions&rvprop=content&titles=...` for wikitext and `action=parse&page=...&prop=text` for rendered HTML. The API allows batched fetches, respects robots.txt, and provides revision-id metadata for the maintenance phase. Path A is preferred.

**Path B — XML export.** MediaWiki's `Special:Export` produces XML dumps of selected pages or namespaces. Path B is a fallback if the API is rate-limited or unavailable.

Acquisition discipline:

1. Rate-limit to one request per second by default; respect any explicit rate limit the SEBoK servers communicate.
2. Fetch with a User-Agent that identifies the corpus and provides a contact address per Wikimedia convention.
3. Persist the raw response (wikitext or XML) before transformation; the raw record is the licensing-attribution source.
4. Acquisition is a one-shot bootstrap followed by periodic incremental re-fetch driven by revision-id checks; the maintenance phase elaborates this.
5. Failed fetches are logged with retryable error and timestamp; no page is silently skipped.

The acquisition tooling is a small TypeScript script in `app/sebok-import/` running under the existing `bun` runtime. No new dependencies beyond the MediaWiki client wrapping and a wikitext-to-HTML transformer.

## VI. Transformation

The import preserves SEBoK content verbatim and adds an editorial layer. Two transformation passes:

**Pass 1 — Source preservation.** Wikitext is transformed to HTML using a MediaWiki-compatible parser (`mwparserfromhell` family in TypeScript form, or a remote `action=parse` HTML render fetched directly). The output preserves SEBoK's headings, lists, tables, citations, and templates. SEBoK's internal links are rewritten from `[[Page Name]]` form to `/resolve/sebok/...` form, preserving redirects. SEBoK's external links are preserved unchanged.

**Pass 2 — Editorial layer.** For each imported page, the corpus applies four kinds of annotation, each marked as such so the source is never confused with the editorial gloss:

- **Form-mapping links.** Where the reformulation (Docs 560 through 567) named which corpus forms compose the page's content, link the page header to the corresponding form documents (Doc 510, Doc 270, etc.).
- **Tier-tags.** Where SE-012 logged a tier-tag for a SEBoK claim, attach the tag to the relevant paragraph as a margin annotation. The SEBoK text is not rewritten; the tag is metadata.
- **Residual annotations.** Where the reformulation logged a residual citing a specific SEBoK passage, mark that passage as a residual with a link to the cluster formalization (Docs 571 through 574) that handles it (or that holds it open as provisional, in the case of authority evacuation).
- **Reformulation back-link.** Every imported page links to the reformulation document that processed it (Docs 560 through 567).

The editorial layer is rendered visually distinct from the SEBoK content: source content uses the corpus's standard prose styling; editorial annotations appear in a sidebar or as inline markers with a different color and a hover-disclosure of the annotation text.

## VII. Cross-Linking Discipline

The import creates a three-way link structure for every SEBoK page that the reformulation evaluated:

- The SEBoK page links to the reformulation that processed it (SE-004-567).
- The SEBoK page links to the corpus form documents that the reformulation invoked (Docs 510, 270, 541, 548, etc., and the new Docs 571-574).
- The reformulation documents (560-567) link forward into the imported SEBoK pages they cite.
- The corpus form documents (510, 270, 541, 548, 571-574) gain an "Applied against external material" section listing the imported SEBoK pages where each form does work.

The cross-linking is not generated once and frozen. The maintenance phase keeps it current as both SEBoK and the corpus evolve.

The link discipline preserves attribution direction: links from SEBoK pages out to the corpus are clearly marked as "Editorial layer added by the RESOLVE corpus"; links from corpus documents into SEBoK are clearly marked as "Source: SEBoK". A reader is never uncertain which side of the import they are on.

## VIII. Editorial Layer

The editorial layer is the corpus's reading made continuously visible. Four components:

**Tier-tag annotations.** SEBoK pages with claims the reformulation evaluated under the novelty calculus (Doc 490) carry tier-tags as margin notes. Most claims will be untagged (the reformulation evaluated structural concepts, not every sentence). Tagged claims appear with a small visual indicator and the (warrant, novelty) pair on hover. SE-011's Part 8 evaluation produces the densest tagging; other parts have sparser coverage.

**Residual markers.** SEBoK passages that SE-012 logged as residuals carry a marker linking to the cluster formalization (Docs 571-574) that handles or holds-open the residual. The marker is unobtrusive (small icon in the margin) but persistent; readers who want to skip it can.

**Form-composition headers.** Each imported page's top metadata block names the corpus forms that compose its content per the macro-map and the reformulation. The reader sees, before reading SEBoK's text, which forms the corpus has read into it. This is the corpus's editorial frame on SEBoK; it does not modify SEBoK.

**Reformulation back-link.** Each imported page closes with a link to the reformulation document (Docs 560-567) that processed it. Readers can step from any SEBoK page directly to the corpus's reading of the corresponding SEBoK part.

The editorial layer is itself versioned. When a corpus form is refined (e.g., when Doc 571 gets its first operational extension), the editorial layer on imported SEBoK pages updates to point at the new version. SEBoK's content does not change with corpus changes; only the editorial layer does.

## IX. Maintenance and Re-Fetch

SEBoK is a living wiki. The corpus's import shall not stale into a frozen snapshot:

1. A scheduled re-fetch (initially monthly, adjustable) checks every imported page's source revision-id against SEBoK's current revision-id. Changed pages are re-fetched and re-transformed.
2. Pages new to SEBoK since the last fetch are imported on the same schedule.
3. Pages removed from SEBoK are kept in the corpus with a deprecation marker pointing at SEBoK's redirect target if one exists, or marked as "removed from source on [date]" if no redirect is provided.
4. The maintenance log is itself a corpus document, updated quarterly, listing the changes the import absorbed in the prior period.
5. Editorial layer updates happen independently of source changes; when a new corpus form refines a tier-tag or names a new residual, the editorial layer is regenerated for affected pages.

The maintenance phase is what distinguishes a hosted import from a one-time fork. The corpus commits to keeping the import current as long as SEBoK is current.

## X. Phased Rollout

**Phase A — Licensing and infrastructure (small).** Confirm CC BY-SA 3.0 at sebokwiki.org. Stand up `/resolve/sebok` as an empty index page with the license notice. Build the import script. Build the database schema additions. Build the transformation pipeline against three hand-picked SEBoK pages as a smoke test.

**Phase B — Bootstrap import of one part (medium).** Import all pages of SEBoK Part 1 (the smallest part). Render with the editorial layer. Verify cross-linking against SE-004. Iterate on the transformation pipeline against real content. Pulverize the imported result against the source SEBoK pages; the pulverization criterion is that no operational distinction in SEBoK is lost in transit.

**Phase C — Full bootstrap (large).** Import the remaining seven parts in macro-map order (Part 2 through Part 8). Each part's import generates approximately one hundred imported pages. The editorial layer's tier-tag and residual annotations follow the per-part reformulation documents (Docs 561 through 567). Phase C is the largest engineering phase.

**Phase D — Cross-linking pass (medium).** With all SEBoK pages imported, do the cross-linking pass: every reformulation document gains forward-links to specific SEBoK pages; every form document gains an "Applied against external material" section; every SEBoK page's editorial layer is finalized. The cross-link table is regenerated automatically from the reformulation documents' citations.

**Phase E — Maintenance harness (small).** Build the scheduled re-fetch, the change-detection logic, the editorial-layer regeneration, and the maintenance log. Schedule the first monthly re-fetch.

**Phase F — Editorial expansion (ongoing).** As future reformulations or future cluster work produces new tier-tags or new residuals, regenerate the editorial layer. As SEBoK pages change, re-transform and re-annotate. The phase has no end date; it is the steady-state operation of the import.

## XI. Open Questions and Risks

1. **Licensing review.** SEBoK's published terms must be confirmed, not assumed. A change in terms or a discovered restriction (e.g., proprietary content embedded in CC-licensed pages) would alter the plan.
2. **Wikitext parser choice.** No mature TypeScript wikitext-to-HTML parser exists with full template-handling fidelity. The likely fallback is to fetch SEBoK's rendered HTML directly via `action=parse` and post-process it for link rewriting and editorial annotation. This is more robust than parsing wikitext but couples the corpus to SEBoK's rendering decisions.
3. **Editorial-layer discoverability.** The annotations must be visible enough to be useful and unobtrusive enough to not dominate the SEBoK source. Phase B's smoke test should validate this against real readers before Phase C scales.
4. **Maintenance scope.** Monthly re-fetch is a guess. SEBoK's actual change rate determines whether this is too frequent or too sparse. Phase E's first run will calibrate.
5. **Storage growth over time.** Revision history is appendable. The corpus database can absorb it, but indexing and full-text search across versioned SEBoK content needs design before Phase E completes.
6. **Reformulation drift.** As the corpus refines its forms, old reformulations (Docs 560-567) may need updates to stay accurate. The editorial layer should reflect the current state, not a frozen state. Versioning of reformulations is the discipline.
7. **Two-way attribution risk.** SEBoK practitioners who land on a corpus-hosted SEBoK page must understand they are reading SEBoK content, not corpus content. The visual treatment must make this unambiguous in every render.
8. **Bandwidth and rate limits.** Bootstrap import of several hundred pages at one request per second takes most of an hour. SEBoK's rate-limit policies must be respected; the import script should back off on any HTTP 429.

## XII. Closing

The import is structurally simple — fetch, transform, render, cross-link, maintain — but operationally non-trivial because SEBoK is alive, the editorial layer must remain visible without overpowering the source, and the cross-linking has to stay current as both bodies of knowledge evolve. The plan stages the work in six phases of escalating scope, with explicit smoke tests, pulverization checks, and steady-state maintenance.

The result, when complete, is one read-surface in which SEBoK's full content and the corpus's reading of SEBoK are continuously visible to each other. The reformulation's findings (Docs 560-570) become persistent annotations on SEBoK itself. The cluster formalizations (Docs 571-574) become accessible from the SEBoK pages that motivated them. A SEBoK practitioner gains the corpus's apparatus without leaving SEBoK; a corpus reader gains SEBoK's full content without leaving the corpus.

The work is large but the boundaries are clear. The next move is the keeper's, in particular: confirm the licensing audit, then stand up Phase A.

---

## Appendix: Originating Prompt

> *"Create a plan to add the complete SEBoK wiki to the resolve corpus under a new url segment with /resolve based on the findings"*

(The plan draws on SE-014 — *SEBoK Through the Corpus — Canonical*, which subsumes the SEBoK reformulation; on Docs 571 through 574, which formalize the four cluster forms produced by the reformulation; and on the corpus's existing apparatus for tier-tagging, attribution, and editorial discipline.)
