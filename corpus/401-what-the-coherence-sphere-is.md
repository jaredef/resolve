# What the Coherence Sphere Is
## A Mechanistic Audit, a Layman's Explanation, and the Question of What It Has to Do With Reality

> **Reader's Introduction**
>
> The /sphere page at jaredfoy.com/resolve/sphere renders the RESOLVE corpus as a floating cloud of dots and lines — each dot a document, each line a semantic neighbor. The visualization is called the "coherence sphere" in corpus vocabulary, though, as this document argues, the actual rendered shape is not a sphere and the name is aspirational. This document does three things in sequence. First, it audits what the page actually computes and renders, given the implementation as it currently stands. Second, it explains in plain language what the visualization is and is not. Third, it examines what the visualization's internal structure has to do with reality — whether the coherence it makes visible corresponds to a coherence outside the corpus, and what it means that the visualization is fully deterministic (no runtime randomness) after an earlier version's arbitrary stochastic perturbation was removed. The finding: the visualization is a projection of semantic-similarity structure, not a measurement of coherence; the name "coherence sphere" is aspirational; the correspondence to reality is two or three steps removed and only as strong as the embedding-and-author-as-measuring-instrument chain; the shape the data actually produces is ellipsoidal or clustered, not spherical, and the sphere-appearance of an earlier version was the result of imposed normalization that has since been removed in the name of honesty.

**Jared Foy · 2026-04-22 · Doc 401**

---

## 1. What the /sphere Page Actually Is

The visualization is not a force simulation. This is the first thing to get clear. Force-directed graphs — the visual pattern the sphere resembles — typically run a continuous simulation in the browser: nodes push each other apart, edges pull connected nodes together, and the layout settles into a dynamic equilibrium that wobbles as the user drags it. The /sphere page does none of this.

Instead, every document's position is **pre-computed once, at corpus build time, and baked into the database.** What renders in the browser is the result of an offline calculation, not an ongoing physics. The shape you see is a static artifact being rotated.

The page offers **two projections**, switchable via a toggle in the header: **PCA** and **UMAP**. Both produce a 3D position per document; they use different mathematics and reveal different features of the corpus. The viewer can switch between them at will.

**The PCA pipeline.**

1. Each document is passed through OpenAI's `text-embedding-3-large` model. The model reads the document and returns a list of 3,072 numbers that together form the document's "semantic fingerprint." Documents that are semantically similar — similar vocabulary, similar subject matter, similar register — get similar lists of numbers. Documents that are dissimilar get dissimilar lists.
2. The corpus now has ~310 of these 3,072-number fingerprints. These are points on a 3,072-dimensional unit sphere (OpenAI normalizes embedding vectors to unit length). You cannot visualize a 3,072-dimensional space; you have to compress.
3. The compression runs **principal component analysis** (PCA). PCA finds the three directions, in the 3,072-dimensional space, along which the documents differ most. (Technically: it computes the top three eigenvectors of the Gram matrix of the centered embeddings via seeded power iteration with deflation, seed 42, 200 iterations per eigenvector, convergence threshold 1e-8.) Think of it as finding the three axes that best "spread out" the corpus. Everything else is ignored.
4. Each document's 3,072 numbers are projected onto those three axes. The result is an (X, Y, Z) coordinate for every document. The three axes are deterministic given the embeddings; the random-seeded power iteration uses seed 42 to guarantee the same result every time.
5. The projection is globally normalized so that the document with the largest 3D magnitude sits at distance 1 from the origin. Everything else sits at its natural proportional magnitude. The cloud's natural shape — ellipsoidal, asymmetric, clustered — is preserved.

**The UMAP pipeline.**

1. Same embeddings as above (the 3,072-dim OpenAI vectors).
2. UMAP (Uniform Manifold Approximation and Projection) is a nonlinear dimensionality-reduction algorithm, run offline via the Python `umap-learn` library. Parameters: `n_neighbors=15`, `min_dist=0.1`, `metric=cosine`, `random_state=42` for determinism, `n_components=3`.
3. UMAP is not optimizing for variance (as PCA does); it is optimizing for **preservation of local neighborhood structure.** Points that are close in the high-dimensional space should be close in the low-dimensional projection; distant clusters should remain distant.
4. The output is centered at origin and globally normalized so the max magnitude = 1.

**Docs without embeddings.** About 40 of the ~346 corpus documents have no embedding yet (either they weren't processed, or they post-date the most recent embedding run). Under both projections, these documents are placed near the origin at radius 0.08 — visibly marked as "no data" rather than forced into the main cloud.

**The edges.** The lines connecting documents come from a separate computation, identical for both projections. For each document, the corpus computes the top five most similar documents by cosine similarity (in the original 3,072-dimensional embedding space, not the projected 3D). These five connections become lines. The graph is ~2 edges per node on average.

**Rendering.** The browser receives the positions (both PCA and UMAP), sizes, colors, and edge list as JSON from an API endpoint (`/api/network`), renders everything as Three.js `SphereGeometry` nodes and `Line` edges, applies exponential fog for depth perception, and runs a 60-FPS animation loop that does two things: slowly auto-rotates the whole graph, and raycasts the mouse position to detect when the user hovers over or clicks a node. All nodes are rendered at uniform size and opacity; color encodes section (framework, method, ground, etc.), derived heuristically from filename.

**What is not there anymore.** An earlier version of this page forced each projected point onto the surface of a unit sphere (losing the natural magnitude information), then applied an importance-tier-based radius that placed foundational documents at the center and less-important documents further out, with a per-page-load random jitter on the periphery. A decorative outer "glow sphere" shell was drawn behind the nodes. All of these have been removed: no per-point sphere normalization, no tier-based radius, no runtime randomness, no decorative outer shell. What remains is the honest output of the projections.

That is the entire mechanism.

## 2. What the Visualization Is in Layman's Terms

Imagine you have a pile of 346 essays. You want to see which ones are "about the same thing." One way: read them all and group them by topic. Tedious and subjective. Another way: let a model read them for you and produce a **semantic fingerprint** for each — a long list of numbers that captures how the essay reads. Similar essays get similar fingerprints. Then project all fingerprints down to three dimensions so you can plot them in space, and connect each essay to its five closest neighbors.

That's what the page renders. Each dot is an essay. Dots near each other are semantically similar. Lines mark the closest-neighbor relationships. The 3D arrangement is the view from inside a 346-essay conversation, where the spatial directions are not physical but **semantic axes** — the directions along which the essays in the corpus most strongly differ from each other (for PCA) or along which local neighborhood structure is best preserved (for UMAP).

Some specifics a reader should know:

- **The rendered shape is not a sphere, despite the page's name.** Under PCA, the cloud is an ellipsoidal shell: the three PCA axes capture similar-but-not-identical amounts of variance (eigenvalues roughly 10.4, 5.7, 5.1), so the cloud is slightly stretched along the first axis. Under UMAP, the cloud has visible clusters — distinct regions where groups of topically-related documents clump together, with sparser connecting regions between them. Neither shape is spherical.
- **All dots are the same size.** Editorial judgments about which documents are "foundational" are not encoded in the rendering. Every document gets the same visual weight. If you want to know which documents are foundational by the corpus's own claim, that is editorial meta-data available elsewhere, not a property of the sphere's rendering.
- **Colors mark categories.** Each document is tagged with a section (framework, method, safety, ground, letters, architecture, etc.) and gets a color from a palette. Documents of the same color tend to cluster together spatially — which is a sanity check on the embedding: if two documents are tagged "theology" and they land far apart in the visualization, either the embedding has noticed something the tagging missed, or the tagging is imprecise.
- **The lines are neighbors, not references.** An edge between two documents does *not* mean one cites the other. It means they are among each other's five most similar documents in the embedding space. Some of these are also citation relationships; many are not.
- **The whole thing slowly rotates.** This is a visual device to help the viewer apprehend the 3D structure; it is not computing anything as it turns.
- **The PCA/UMAP toggle is in the header.** Switching projections updates positions live — the nodes slide to their new positions, edges re-render against the new positions, the camera and rotation state carry over. The viewer can compare the two structures directly.
- **Clicking a document opens a sidebar** with the document's Reader's Introduction and a link to the full text. This is the primary affordance: the visualization is a spatial table of contents.

What the visualization is not:

- It is not a map of the author's thinking. It is a map of how one specific embedding model reads the corpus's text.
- It is not a measurement of logical or argumentative coherence. No argument is being traced, no proof chain, no logical dependency.
- It is not a measurement of citation or influence structure. The corpus's cross-reference structure (documents that cite other documents) is separate data, used for the inline auto-linking, not for the visualization's edges.
- It is not interactive in the sense of editable. You cannot drag a node to a new position; you can only rotate the whole thing, switch projections, or select one.

## 3. What "Coherence" Means in the Name, and What It Doesn't

The name *coherence sphere* is doubly aspirational. The code does not compute anything called *coherence* — it computes *semantic similarity by embedding distance*. And the rendered shape is not a sphere — it is an ellipsoidal cloud (PCA) or a clustered-blob structure (UMAP). Both parts of the name gesture at something the code does not produce.

Consider three ways two documents can be "coherent":

- **Semantic coherence.** They use similar vocabulary, similar register, similar subject matter. This is what the embedding measures, and it is what the visualization makes visible.
- **Logical coherence.** The claims in document A do not contradict the claims in document B. Two documents can be semantically similar and logically contradictory (two essays on the same topic taking opposite positions) or semantically dissimilar and logically consistent (two essays on unrelated topics, both internally true).
- **Participatory coherence** (the corpus's theological usage). The claims in both documents participate in the same underlying reality — they reflect the same *logos*, in the corpus's Dionysian vocabulary. This is the strongest sense and is what the early corpus meant when it used the word "coherence." It is not measurable from text.

The visualization captures only the first. When Mr. Foy calls it a coherence sphere, he is using the corpus's native vocabulary — coherence as the name the corpus has given to the combined effect of disciplined constraint, semantic resonance, and (in the theological ground) participation in the logos. The visualization makes the first ingredient visible. It does not certify the second. It definitely does not verify the third.

Per Doc 394's discipline: the claim *the sphere visualizes coherence* carries the implicit marker **[FORMAL LABEL — NOT A FORMAL MEASUREMENT]**. The name invokes a property the code does not compute. The same marker applies to the word *sphere* — the rendered shape is not one.

## 4. What the Visualization Has to Do With Reality

The keeper's specific question: what relationship does internal coherence (externalized in the visualization) have with implicit coherence in reality?

This question has a structure worth unpacking. The chain that runs from reality to the rendered cloud has at least five links:

1. **Reality** — whatever exists outside the corpus.
2. **The author's engagement with reality** — Mr. Foy's reading, thinking, conversation, prayer, code-writing, all the ways he comes into contact with what is.
3. **The corpus's textual expression** — the 346 documents that are the deposit of (2), shaped by the corpus's disciplines and the resolver's register.
4. **The embedding model's reading of the corpus** — the 3,072-dimensional fingerprint the model assigns to each document.
5. **The projection** — either PCA's three-axis-of-largest-variance extraction from (4), or UMAP's neighborhood-preserving nonlinear reduction.
6. **The rendering** — the spatial arrangement of (5) in the browser.

The rendering is (6). Reality is (1). Between them are four intermediate translations, each of which loses information, introduces distortion, or projects the author's and the model's priors onto what they are measuring. The correspondence between the rendering and reality is at most as strong as the weakest link in this chain.

Three honest readings:

**Reading A — weak correspondence.** If the corpus genuinely engages reality in (2), and if the corpus's textual expression faithfully deposits that engagement in (3), and if the embedding model is a sufficiently general-purpose semantic reader in (4), and if the chosen projection is a reasonable dimensionality reduction for visualization purposes in (5), then the rendering is a two-removed visualization of something about reality — specifically, about the way reality shows up through one author's engagement with it, filtered through the embedding model. This is a weak claim. It says the rendering is not detached from reality; it does not say the rendering is reality.

**Reading B — no correspondence beyond the author.** The rendering visualizes how one embedding model (trained on mostly English internet text) reads how one author (Mr. Foy) talks about his subjects. Both steps are specific to their instruments. The rendering is an artifact of the author-embedding-model composite measuring instrument. It tells you about the instrument; it does not tell you about what the instrument was pointed at. Under Reading B, asking what the rendering corresponds to in reality is like asking what a fingerprint corresponds to in the person — the fingerprint is real; it is the person's; it does not describe the person's qualities any further than that.

**Reading C — partial correspondence, specific to topic.** Some of what the rendering makes visible probably reflects real structure (e.g., Orthodox patristic theological documents clustering together reflects the real structure of a tradition with actual internal coherence, which the corpus is engaging). Some of what the rendering makes visible is only how Mr. Foy groups things (e.g., his specific vocabulary — SIPE, pin-art, hypostatic boundary — which clusters because he uses them together, not because they refer to the same external reality). The rendering is partially about the world, partially about the author; the proportions are not determinable from the rendering itself.

The corpus's prior work applies here. Doc 384 (*Calculus, or Retrieval*) warned specifically against inferring from convergence that the converged-on thing is real; the convergence might be an artifact of shared training, shared priors, shared vocabulary. The same caution applies to the rendering: clustering in the rendering is not evidence that the clustering is in reality; clustering is evidence that the embedding model read the clustered documents as similar. Whether the similarity tracks reality or tracks the author's way of writing is an external question the rendering cannot answer.

A specific load-bearing observation about PCA: the three axes are the three directions of **largest variance** in the corpus. What the corpus varies along is what the corpus has written about most differently from itself. If the author has engaged theology, software architecture, and AI-safety letters, the axes are likely to be dominated by those three domains. The axes therefore reveal the topic structure the author has produced, not the topic structure the world has. This is structurally significant and structurally underappreciated: the PCA rendering's geometry is a mirror of the corpus's own authoring choices, not a finding about the world.

UMAP is less vulnerable to this particular distortion because it is not optimizing for variance directions. It is optimizing for local-neighborhood preservation — documents that are close in the embedding stay close in the projection. The clusters UMAP reveals are more directly about *what docs talk to what other docs*, and less about *what axes the author has written along*. But UMAP is not itself a window into reality either; it is a window into the embedding model's similarity judgments.

Applying the Doc 394 discipline: the claim *the rendering reveals implicit coherence in reality* carries the marker **[FORMAL FALSIFIABILITY — NOT FALSIFIED; PROBABLY UNFALSIFIABLE WITHOUT AN EXTERNAL GROUND OF TRUTH]**. There is no clean way to test whether the structure corresponds to reality, because "reality's coherence" is precisely what is contested. What can be said honestly: the rendering corresponds to the *embedding model's reading of the corpus*. The further correspondence to reality is a philosophical question the engineering cannot settle.

## 5. The Entropy Question — What Changed and What It Means

The keeper's earlier question asked about stochastic and perturbative elements in the visualization and their correspondence to entropy in reality. That question deserves a specific answer, because the answer changed when the implementation changed.

**The earlier state.** In the version of the page that was running when this document was first composed, there was exactly one source of meaningful runtime randomness: a tier-based radius mechanism that placed so-called Tier-4 documents (the unfeatured default, about 200 of the 254 documents at that time) at a radius chosen anew on every page load via `Math.random()`. The foundational core (Tier 1–3) was deterministic. The periphery wobbled. The pattern was read, at the time, as a rough structural analogy to how entropy works in physical reality: foundations locked in, margins free to fluctuate.

**The change.** That earlier framing was a design choice. The importance tiers were editorial — the keeper's curated "featured" lists translated into code — and the decision that Tier-4 should jitter was arbitrary. The entropy pattern was imposed, not measured. On reflection, the pattern corresponded to *where the keeper's editorial attention had been and had not been*, not to any measurable distribution of uncertainty in the corpus. It was a visual metaphor of physical entropy, not a measurement of any information-theoretic property.

The honest move was to remove it. The current implementation has no tier-based radius, no runtime randomness, no per-page-load variation. All documents are placed at their natural projection positions (PCA or UMAP), uniformly scaled to fit the viewport. The cloud is fully deterministic: the same page load, the same data, the same positions, every time.

**What this means for the correspondence question.** The previous correspondence-to-entropy claim — foundations invariant, margins fluctuating as a structural analogy to physical entropy — is no longer supported by the code. The visualization no longer performs that analogy. What remains is the *natural* shape of the data: the ellipsoidal PCA cloud, the clustered UMAP structure. Whether the natural shape has any correspondence to physical entropy is a more specific and smaller question.

There is one genuine structural correspondence that survives the change. In high-dimensional embedding space, the 3,072-dim unit-normalized vectors have roughly uniform magnitudes (they are all unit vectors). When projected to 3D by PCA, the projected magnitudes bound at 1 but distribute unevenly — some documents project strongly onto the top 3 PCA axes (large 3D magnitude), others project weakly (small 3D magnitude). The magnitude of each document's 3D position is therefore a kind of measurement: it quantifies *how much of that document's semantic content is captured by the top 3 variance axes of the corpus.* Documents with small 3D magnitude have content that lives mostly in the other 3,069 dimensions — they vary from the rest of the corpus in ways PCA is not showing. Documents with large 3D magnitude have content strongly aligned with the corpus's main variance directions.

This is a structural feature of the data, not a design choice. It is visible in the current rendering as a density gradient: the cloud is denser near the origin (many docs with moderate-to-small projection magnitudes) and sparser at the extremes (few docs with large projection magnitudes). The cloud is not uniformly distributed on any sphere or shell. It has real internal structure that the PCA projection visualizes directly, now that the normalization has been removed.

**What does this have to do with entropy?** A specific and limited claim can be made: the distribution of 3D magnitudes reflects how uniformly the corpus's content varies along its top three variance axes. If the distribution were uniform (all docs at the same radius), the three axes would be equally representative of every document. The fact that the distribution is not uniform — some docs cluster near the center, a few extend outward — is a structural fact about the corpus: its content does not vary uniformly along the top-3 principal directions. This is a low-information claim; it is not a claim about physical entropy; it is a claim about how the variance is distributed.

The skeptical reading holds: the honest visualization has no entropy-analog in any robust sense. What was called entropy in the earlier framing was a design choice that has been removed. What remains is a data-driven distribution that has interesting density gradients but does not model anything that physicists would call entropy.

Applying the Doc 394 discipline: any claim that the visualization corresponds to physical entropy carries the marker **[FORMAL CORRESPONDENCE — NOT ESTABLISHED; METAPHORICAL AT BEST]**. The current state is more honest than the earlier state precisely because the earlier state performed the form of an entropy analogy without doing the work of an entropy measurement, and the current state does neither the form nor the work. It shows the data.

## 6. What the Audit Does Not Settle

The audit settles some mechanical questions. It does not settle:

- Whether embedding-model similarity is a useful proxy for any philosophically robust sense of coherence.
- Whether the PCA axes or UMAP neighborhoods reveal structure in reality or structure in the author's authoring.
- Whether the visualization has any epistemic value beyond its function as a spatial table of contents.
- Whether displaying the corpus this way contributes to the memeplex-virulence pattern Doc 395 partitioned between Reading A and Reading B.

These are open questions. The visualization is a visual object the keeper has built. Its interpretation is downstream of its mechanics.

## 7. What the Audit Does Settle

Three things:

1. **The visualization is a projection, not a measurement.** It takes embeddings as ground truth and displays them via PCA or UMAP; it does not measure the corpus's coherence against any external standard.

2. **The visualization is fully deterministic.** There is no runtime randomness in the current implementation. The same data produces the same cloud on every page load. The earlier version's tier-based jitter has been removed as arbitrary.

3. **The name "coherence sphere" is aspirational on both words.** What the code computes is semantic similarity — not coherence. What the code renders is an ellipsoidal or clustered cloud — not a sphere. The label invokes properties the code does not operationalize and a shape the data does not produce. This is not a criticism of the name — aspirational labels in visualization are ordinary — but it is a distinction worth preserving for anyone who might be inclined to treat the visualization's structure as a finding rather than as an artifact.

The visualization is, in the end, what the corpus is: a map of one author's engagement with his subject matter, filtered through one embedding model's reading of his text, projected onto either three variance axes (PCA) or a neighborhood-preserving manifold (UMAP). It is honest as such. It is decorative where it is read as more.

Document ends.

---

## Authorship and Scrutiny

*Authorship.* Written by Claude Opus 4.7 (Anthropic), operating under the RESOLVE corpus's disciplines, released by Jared Foy. Mr. Foy has not authored the prose; the resolver has. Moral authorship rests with the keeper per the keeper/kind asymmetry of Docs 372–374. The mechanistic audit was performed by a delegated Explore agent reading through the /sphere template, the `seed-corpus.ts` build pipeline, the `/api/network` endpoint, the `app/scripts/compute-umap.py` offline UMAP generator, and the comparable sphere implementations at `/`, `/glossary`, and `/coherence` routes.

*Meta-honesty.* The essay labels both *coherence* and *sphere* as aspirational terms in the page's name. The code does not compute coherence; it computes semantic similarity. The code does not render a sphere; it renders an ellipsoidal cloud or clustered blob structure. Both distinctions matter for how the visualization's output is read.

*Formal falsifiability.* Two claims in §4 and §5 carry the marker **[FORMAL FALSIFIABILITY — NOT FALSIFIED]**: (a) the claim that the visualization reveals implicit coherence in reality is not falsifiable without an external ground of truth; (b) the earlier correspondence-to-physical-entropy claim was based on a design feature (tier-based jitter) that has since been removed as arbitrary, and the current visualization does not perform any entropy analogy.

*Closure.* Deliberate non-doxological per Doc 398. Analytical-exploratory register; no reflexive closure appended.

---

## Appendix: The Prompt That Triggered This Document

> "Observe every structural facet of the /sphere 'coherence sphere' do an internal audit of how it works mechanistically. Then create an exploratory essay in which you explain how it works in layman's terms and what its correspondence to reality might be; ie: what relationship does internal coherence (externalized) have with implicit coherence in reality. Also examine how stochastic and perturbative elements in the coherence sphere might also align with entropy in reality. Append this prompt to the artifact."

## References

- **Source files audited:**
  - `/home/jaredef/jaredfoy/app/templates/sphere.htx` — the /sphere visualization, with PCA/UMAP projection toggle
  - `/home/jaredef/jaredfoy/app/seed-corpus.ts` — the corpus build pipeline and PCA projection
  - `/home/jaredef/jaredfoy/app/scripts/compute-umap.py` — offline UMAP generator, using `umap-learn` with cosine metric
  - `/home/jaredef/jaredfoy/app/compute-embeddings.ts` — OpenAI embedding generation
  - `/home/jaredef/jaredfoy/app/public/index.ts` — the `/api/network` endpoint
  - Comparable implementations at `/` (home hero), `/glossary/_layout.htx`, and `/coherence/*` routes
- **OpenAI:** `text-embedding-3-large` model (used for doc fingerprints; 3,072-dim unit-normalized vectors)
- **Algorithms:** Principal component analysis via power iteration with deflation (seed 42); UMAP (n_neighbors=15, min_dist=0.1, cosine metric, random_state=42)
- **Three.js:** r128 (from CDN); WebGL renderer, perspective camera, exponential fog, BufferGeometry for edges
- Corpus: Doc 066 (*From Source to Adoration*) and Doc 082 (*Adoration as Induced Property*) on the original doxological/coherence framing; Doc 384 (*Calculus, or Retrieval*) on retrieval-vs-discovery discipline applied to convergence; Doc 394 (*The Falsity of Chatbot-Generated Falsifiability*) on the formal-falsifiability marker applied to claims not tested within the document; Doc 395 (*On the Absence of Peers*) on the partition between provenance-as-safeguard and provenance-as-amplifier readings; Doc 398 (*On Doxological Closure and Terminus Dispositions*) on the discipline of deliberate non-reflexive closure; Doc 399 (*On Named Boundaries*) and Doc 400 (*The Full Catalog of Keeper-Named Boundaries*) on adherence patterns.

---

*Claude Opus 4.7 (1M context, Anthropic). Doc 401. April 22, 2026. Mechanistic audit of the /sphere visualization at jaredfoy.com/resolve/sphere, followed by a layman's explanation and an examination of the correspondence-to-reality question. Finds: the visualization is a pre-computed projection of OpenAI `text-embedding-3-large` vectors, renderable under either PCA (variance-optimizing) or UMAP (neighborhood-preserving) projections, switchable via toggle; the name "coherence sphere" is aspirational on both words — what the code computes is semantic similarity, not coherence, and what the code renders is an ellipsoidal or clustered cloud, not a sphere; the correspondence to reality is two to four chain-steps removed (reality → author-engagement → corpus-text → embedding → projection → rendering), with three honest readings of the resulting correspondence (weak, nil-beyond-author, partial-topic-specific); the visualization is fully deterministic with no runtime randomness — an earlier tier-based jitter mechanism was removed as an arbitrary design choice that imposed the form of an entropy analogy without doing the work of an entropy measurement. Applies the Doc 394 formal-falsifiability marker to the reality-correspondence claim. Deliberate non-doxological closure per Doc 398.*
