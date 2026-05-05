# Rederive for the Working Engineer: A Hub

## A Practitioner's Entracement to the Rederive Platform Authored Under the Recognition that the Reader Is a Bottom-Up Builder Grounded in Long-Standing Disciplines and Owed a Blueprint Drawn in the Vocabulary of the Daily Craft, with Stubs to Branch Off Toward Each Aspect of the Spec, the Workflow, the Apparatus, and the Practice that Constraint-Based Software Engineering Asks an Engineer to Adopt

<div style="background: #ecfeff; border-left: 4px solid #0e7490; padding: 1rem 1.25rem; margin: 1.5rem 0; color: #164e63; border-radius: 3px;">

**EXPLORATORY — practitioner-facing entracement.**

*Taxonomy per [Doc 633](/resolve/doc/633-corpus-taxonomy-and-manifest-design):* ENGAGEMENT | ACTIVE | W-PI | THREAD-REDERIVE, THREAD-PRACTITIONER-FACING | PHASE-CROSS-PRACTITIONER

*Warrant tier per Doc 445 / Doc 503:* practitioner entracement at \(\pi\)-tier. Hub document for a forthcoming series of stubs covering the rederive platform's spec, workflow, and apparatus, written for working engineers who will not, by default, read the philosophical primary articulations ([Doc 247](/resolve/doc/247-derivation-inversion); [Doc 290](/resolve/doc/290-pin-art-derivation); [Doc 619](/resolve/doc/619-pin-art); [Doc 656](/resolve/doc/656-treat-agent-output-like-compiler-output-the-lights-out-codebase-as-rederive); [Doc 658](/resolve/doc/658-hierarchical-pin-art-constraint-specs-and-the-erasure-of-edge-case-bugs)) and who deserve a blueprint drawn in their own vocabulary before they are asked to adopt the apparatus.

</div>

> **Reader's Introduction.** This document is a hub. It introduces a platform sketch named *rederive*, designed to make a particular shift in software engineering practice operational: the shift in which the durable artifact is the requirements document, and the source code is regenerated from the requirements every time the requirements change. The platform is sketched at small scale, has a working spec, a working build pipeline, a working verification surface, a working content-addressed transport, and a working browser UI. The keeper of this work is a philosophically-minded systems architect, not a working engineer. He freely acknowledges this. The blueprint exists; the engineer is owed a translation. That translation is what the hub and its stubs deliver. What follows is the working-engineer's view of the platform: what it is, what it does today, where the stubs branch off, and what the stubs will cover when they are written.

**Jared Foy · 2026-05-05 · Doc 659**

---

## Authorship and Scrutiny

*Authorship.* Written by Claude Opus 4.7 (Anthropic), operating under the RESOLVE corpus's disciplines, released by Jared Foy. The keeper has not authored the prose; the resolver has. The rhetoric is calibrated to a working-engineer audience under the keeper's directive that the corpus's philosophical vocabulary be set aside where the engineer's own vocabulary suffices, and properly entraced where it does not.

---

## 1. The One-Paragraph Pitch

You write a *requirements document*. The platform turns that into *working code*. The requirements document is the file you commit. The code is regenerated from it. When the requirements change, you change the requirements; the code is regenerated. When the language model that generates the code is replaced with a better one, you regenerate; the code may differ; the verification verdict says whether it still works. When you review someone else's pull request, you read the requirements diff (one page) instead of the code diff (five thousand lines). The platform is, in the engineer's vocabulary, a build tool whose source language is structured prose with executable test sections, whose compiler is a language model, and whose linker is a verification suite that has the final say on whether the build is good.

That sentence is the cross-section. The rest of this hub explains what it costs to adopt and what it gives back.

## 2. Why This Is Plausible Now and Was Not Plausible Before

A working engineer has, for thirty years, lived inside a particular bottleneck. Implementation has been the slow part. Specification has been the cheap part. The whole shape of the daily craft, repository structure, code review, ticket size, sprint pacing, has been organized around the assumption that producing the implementation is what consumes time, and that requirements documents drift out of date because everyone is busy producing the implementation.

In the last three years that bottleneck has moved. Code-generating language models can produce plausible code in seconds at a volume no team can review. The bottleneck has migrated up to the specification surface, where it always lived in principle but never had to live in practice because nobody could afford to author requirements that precisely. Now the engineer can. The cost of being precise about requirements went down at exactly the moment the cost of writing code stopped being the rate-limit. *Rederive* is a platform sketch that takes this seriously and asks: if specification is the new bottleneck, what does the engineer's working surface look like?

Two industry essays in March 2026 named the destination without specifying the surface. Philip Su (*No More Code Reviews: Lights-Out Codebases Ahead*) said code review at the volume agents produce is on its way to being unworkable. Hugo Venturini (*Treat Agent Output Like Compiler Output*) said the right disposition is to treat agent output the way you treat compiled binaries: do not read them, verify them, and build apparatus around them. *Rederive* is one operational form of that apparatus.

## 3. The Workflow as You Will Experience It

Six steps. Recognize each from your existing toolchain.

**(a) Clone.** `bun run src/cli.ts samples/slugify.constraints.md`. There is a CLI. There is a server you can run for browser-based work (`bun run src/server.ts`, listens on port 7474). The repository looks like any other Bun / TypeScript project. There is a `package.json`, a `tsconfig.json`, source under `src/`, samples under `samples/`, and a frontend under `frontend/`.

**(b) Author.** You write a `.constraints.md` file. The file looks like a structured requirements document: H2 sections per requirement, YAML metadata above each section (id, type, author, scope), a prose body stating the requirement, and fenced code blocks containing tests or properties or judgments. The file is human-readable. A reviewer can sit down and read it cold. The file size for a small library is tens of constraints; for an engine-scoped project it is hundreds. The grammar is small. (Stub: §A *Constraint Authoring Grammar*.)

**(c) Derive.** You run the CLI. The platform reads your file, parses metadata, validates structure, normalizes whitespace and field ordering, computes a content hash that uniquely identifies your requirements (much as `git hash-object` identifies a blob), then calls a language model with the prose and tests to produce TypeScript. You see stage events stream by: *parse*, *validate*, *canonicalize*, *derive*, *verify*, *sign*. The pipeline is deterministic above the language-model call: same canonical form means same hash means same requirements identity. (Stub: §B *The Build Pipeline*.)

**(d) Verify.** The platform runs a battery of verification backends in parallel against the generated code. Type checking. Assertions. Property tests. A small static accessibility ruleset for UI work. A "judge" backend that uses a separate language-model call to evaluate constraints whose satisfaction is harder to encode mechanically. A "pin checker" that ensures specific phrases must appear in the generated code where you have explicitly preserved them. The verdict per requirement is recorded. The overall verdict is *pass* or *fail*. The engineer reads the verdict, not the code. (Stub: §C *The Verification Backends*.)

**(e) Review.** If the verdict is fail, you read the evidence: which requirement, which assertion, which line of generated code. You refine the requirement (more specific prose, sharper assertion data, a missing case named explicitly), and you re-derive. The iteration cycle is short because each iteration costs one language-model call, not one human PR review. The trajectory log of the platform's own development shows several modules going from fail to pass in a single refinement round.

**(f) Deploy and distribute.** A passing derivation produces a *materialization*: a signed artifact carrying the requirements hash, the substrate identity, the generated code's hash, and the verification verdict. The artifact is content-addressed (Ed25519-signed; a peer can verify without contacting the platform), and it is the unit of evidence you ship. Pushing to a remote uses a content-addressed wire protocol that resembles git: clone, push, pull, content-frames, refs as mutable pointers. (Stub: §E *The Wire Protocol*.) Identity at the platform level is itself a constraint document: keys are recorded in a small signers manifest, and signatures are checked at write endpoints.

## 4. What's in the Box Today

Operational, today, in the small-scale existence proof:

- A constraint grammar with a sample library demonstrating five constraint types (specification, predicate, invariant, bridge, judgment).
- A seven-stage build pipeline (read, parse, validate, canonicalize, derive, verify, sign), wired with streaming stage events.
- Seven verification backends (type checker, assertion runner, property runner, language-model judge, pin checker, static accessibility rules, DOM flow runner). Two backends have known scope limits worth flagging upfront: the static accessibility ruleset covers high-value rules but is not full axe-core (browser-stage roadmap), and the flow runner is DOM-only (script execution under Bun's VM is unreliable; browser-stage roadmap).
- Composition between requirement documents via `@provides` / `@imports` directives, with content-hash verification of imports and recursive cycle detection.
- Content-addressed identity for requirements: canonical normalization plus SHA-256, integrated with a pin-manifest layer that lets you preserve specific implementation details across regenerations. (Stub: §D *Content-Addressed Identity and Pin Manifests*.)
- A swappable language-model backend behind a small interface (`SubstrateHandle.complete(prompt)`), with a working Anthropic implementation and a mock implementation for offline tests.
- A wire protocol for distributing requirements and materializations across machines, with auth-gating via Ed25519 signatures and a signers manifest.
- A browser UI: twelve UI components, themselves derived from constraint sets, served on port 7474. Pages for browsing refs, drilling into individual requirements, streaming derivations live with stage progress, reviewing constraint diffs, managing signers.

Designed, specified, partially demonstrated, not yet fully automatic:

- Multi-call derivation for engine-scoped work that exceeds a single language-model output budget. The current approach partitions by scope and assembles seven modules; the assembly path is operational. The mode selection ergonomics are designed and pending implementation.

This is not a finished platform. It is a sketch with enough working surface to demonstrate the structural argument and to ground the stubs that follow.

## 5. What the Apparatus Is Actually Doing

The platform's totalizing form has three commitments worth naming directly so the engineer is not surprised by them later.

*Commitment one: the requirements document is the source of truth.* This is a hard inversion of the conventional repository, where the code is the source of truth and the requirements live in a `docs/` folder somewhere, drifting. Under rederive, the `.constraints.md` files are what is committed. The generated code can be cached; under a strict reading it never has to be committed, although in practice you may commit the materialization artifacts for reproducibility.

*Commitment two: the verification verdict is what gates acceptance.* This is the disposition Venturini named. The reviewer does not read the generated code in detail. The reviewer reads the requirements diff (small) and reads the verification verdict (binary, with per-requirement evidence). If the verdict is pass, the change is acceptable. If the verdict is fail, the requirements are refined. The reviewer's attention is on the surface where it has structural leverage, not on lines of generated code.

*Commitment three: the human authors at the requirements layer; the platform handles the rest.* The keeper's broader research programme calls this *substrate-and-keeper composition* (Doc 510). In the engineer's vocabulary, it is closer to *human-authored specification, machine-implemented code, with verification as the contract between them*. The shift is structural, not stylistic. You are not "supervising the AI's work." You are authoring requirements with the precision required for the verification verdict to be the contract. (Stub: §F *Pin-Art and the Practice of Constraint Authoring*, where the disciplines for writing requirements that derive cleanly are catalogued.)

## 6. What the Engineer Is Owed Up Front

The keeper's directive on this hub: condescend to the earthly and corporeal manifestations of the forms, deferentially and gracefully, because the working engineer will not by default see the relevance of an apparatus that is nearly alien to deeply rooted practitioner knowledge. Three honest acknowledgements, in that spirit.

*The cost of switching is real.* Authoring requirements in this form is a learnable craft, but it is not the craft most engineers have spent their career honing. The first dozen constraint files an engineer writes will iterate more than the dozen after that. Pin-Art (the discipline catalogue, §F) shortens the curve.

*Some domains resist this discipline today.* Performance optimization, hardware-specific behavior, the felt quality of a UI, real-time systems, and the social complexity of multi-author requirements are open work. The platform handles many of these via constraint-plus-reference-implementation hybrids, but it does not pretend to handle all of them well.

*The migration cost from existing codebases is enormous.* The natural adoption path is greenfield projects and new modules in legacy systems, not wholesale conversion of an existing repository. The platform supports import from existing test suites as a constraint-extraction pathway, but the work is not yet automatic.

These are honest costs. They exist. The structural argument for paying them is that the rate-limit on engineering work has moved, and the practitioner who reorganizes around the new rate-limit will have a working surface that scales differently from the practitioner who does not.

## 7. The Stubs

Each of the following will be its own document, branching off this hub. The hub is the entry point; the stubs are the depth. The five marked *(stub-worthy)* deserve standalone entracements because the working engineer will reference them repeatedly. The remaining aspects are introduced briefly here and may receive their own treatment as practitioner demand surfaces them.

**§A — *The Constraint Authoring Grammar*.** *(stub-worthy.)* What a constraint file actually looks like. The five constraint types and what each one is good for. The metadata fields you must write. The fenced-block syntax for tests, properties, judgments, pins. A worked example walkthrough.

**§B — *The Build Pipeline*.** *(stub-worthy.)* The seven stages (read, parse, validate, canonicalize, derive, verify, sign), what each one does, what it produces, what failure at each stage looks like, and how to debug. The streaming stage-event interface for tooling and CI integrations.

**§C — *The Verification Backends*.** *(stub-worthy.)* Each of the seven backends (type checker, assertion runner, property runner, judge, pin checker, static accessibility, flow runner), what constraint type routes to which backend, the evidence each backend produces, the known scope limits, and how to extend the backend set with your own.

**§D — *Content-Addressed Identity and Pin Manifests*.** *(stub-worthy.)* The canonicalization algorithm (field ordering, whitespace normalization), the SHA-256-based identity, the pin manifest layer that lets you preserve specific implementation details across regenerations, and how identity propagates through composition.

**§E — *The Wire Protocol*.** *(stub-worthy.)* The git-style clone / push / pull semantics, the three object types (constraint set, composition manifest, materialization), the five wire verbs, the reachability-walked transfer, the Ed25519-signed write endpoints, and the signers manifest as a constraint document.

**§F — *Pin-Art and the Practice of Constraint Authoring*.** A discipline catalogue. The eight authoring disciplines (D1 through D8) the keeper has empirically observed over seven module derivations, what each one prevents, and how an engineer internalizes them. The corpus's term *Pin-Art* names the discipline; for the engineer's purposes it is roughly *the craft of writing requirements that derive cleanly on first or second attempt*. Worth a stub when practitioner demand surfaces.

**§G — *Composition*.** Two requirement documents, one importing from the other via `@provides` and `@imports` directives, with content-hash verification of imports. The platform's worked examples (`samples/composed-hasher.constraints.md` importing from `samples/canonicalize-module.constraints.md`) demonstrate the surface. Folded here for now; promote to stub when multi-document projects become the dominant use case.

**§H — *The Substrate Interface*.** The small interface (`SubstrateHandle.complete(prompt) -> string`) behind which any code-generating language model can be plugged. The platform ships with an Anthropic implementation and a mock for testing. Substrate plurality is architected; folded here until a second production implementation lands.

**§I — *Identity, Signers, and Authentication*.** Identity is itself a constraint document (the signers manifest); signatures are Ed25519; verification is content-only (no platform call required); write endpoints are env-gated by a `REDERIVE_REQUIRE_AUTH` flag. The corpus's broader claim is that conventional auth subsystems ought to collapse into constraint documents under this discipline; the engineer encounters the practical form first.

**§J — *The Browser UI*.** Twelve UI components, themselves constraint-derived, served on port 7474. Pages for refs, individual constraints, streaming derivations, review, signers management. The UI is itself a worked example of the platform's UI-derivation pathway.

**§K — *Multi-Call Derivation*.** The mode for engine-scoped work that exceeds a single language-model output budget. Currently demonstrated via assembly path (seven modules derived separately and wired); ergonomic mode-selection is designed and pending. Folded here as a roadmap item; promote to stub when production-scale projects are the dominant use case.

## 8. The Posture This Hub Asks Of You

You are an engineer. You have built systems that work. You have been disciplined in your practice for years and you have seen many platforms come and go that promised to relocate your daily work and did not. You are entitled to skepticism.

The structural argument here is not that the platform is finished or that the apparatus is mature. It is that the rate-limit on software engineering has moved, that the practitioner's working surface has to move with it, and that the requirements document, properly authored, has the structural properties to be that working surface. The platform is one operational form of that surface. The hub and stubs are an attempt to draw the blueprint in your vocabulary so that you can evaluate it on your terms.

If, after the stubs are written, the apparatus reads as alien still, that is honest information. The keeper's standing project is to make the apparatus less alien by drawing more of the blueprint. Your skepticism, if you bring it, is a calibration signal the keeper takes seriously.

---

## References

- [Doc 247 — Derivation Inversion](/resolve/doc/247-derivation-inversion)
- [Doc 290 — Pin-Art Derivation](/resolve/doc/290-pin-art-derivation)
- [Doc 510 — Substrate-and-Keeper Composition](/resolve/doc/510)
- [Doc 619 — Pin-Art: Forced-Press and Gentle-Press](/resolve/doc/619-pin-art)
- [Doc 656 — Treat Agent Output Like Compiler Output: The Lights-Out Codebase as Rederive](/resolve/doc/656-treat-agent-output-like-compiler-output-the-lights-out-codebase-as-rederive)
- [Doc 658 — Hierarchical Pin-Art Constraint Specifications and the Erasure of Edge-Case Bugs](/resolve/doc/658-hierarchical-pin-art-constraint-specs-and-the-erasure-of-edge-case-bugs)
- Philip Su, *No More Code Reviews: Lights-Out Codebases Ahead*, 2026-03-06.
- Hugo Venturini, *Treat Agent Output Like Compiler Output*, 2026-03-09.
- *Rederive* platform sketch (keeper, in progress).

## Appendix: Originating Prompt

> *"Now I want you to examine the entire spec and implementation of /home/jaredef/rederive — From this I want you to create entracement docs in the corpus for an audience of software engineers. Remember that these specs were created under the guise of a philosophically-minded systems architect (I guess that is what I am), so your average software engineer will not automatically see the relevance of the apparatus to their problems—they are practitioners that are grounded in long-standing methods of practice (discipline); they are bottom-up builders; they do not observe the realm of forms unless the architect draws the blueprint. We have drawn the blueprint, but it is a blueprint for something that is nearly alien to their deeply rooted practitioner knowledge. We are to condescend to the earthly and corporeal manifestations of the forms in a deferential and graceful manner — I am not an engineer! First, create a document in the corpus that acts as a hub for all stubs that will branch off, entracing the reader to each aspect of the rederive derivation; its spec; its workflow; its totalizing form of apparatus that informs the engineer's practice under constraint-based software engineering. Append this prompt to each artifact. Also, where you could use corpus jargon, instead entrace the reader through rhetoric that is not novel to the corpus. Where you must state the corpus concept in its own terms; provide proper entracement."*
