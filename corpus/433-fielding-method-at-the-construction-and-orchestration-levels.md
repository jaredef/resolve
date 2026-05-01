# Fielding-Method Formalizations at the Construction and Orchestration Levels: A Survey

> **Reader's Introduction**
>
> This document tests, on formal grounds, whether PRESTO (Doc 426) and SERVER (Doc 432) have prior art for the specific methodological move their dissertations claim as contribution: the application of Fielding's Chapter 5 architectural-style-derivation method (null style → accumulate constraints → name induced property → evaluate composition) to the construction level and the orchestration level respectively. The previous pulverizations (Docs 425, 427–431) established that the patterns these dissertations describe are extensive prior art at the framework, library, and mechanism level. This survey tests the distinct question: does any published work apply Fielding's specific derivation method to these two levels? The survey finds that a well-established genre exists — the REST-successor dissertations emerging from UCI after 2000 — but no entry in that genre targets the construction or orchestration levels. ARRESTED (Khare and Taylor, ICSE 2004) extends Fielding's method to the decentralization level with four new building blocks. CREST (Erenkrantz and Taylor et al., ICSE 2009) extends it to computation-exchange with five axioms. COAST continues the lineage. The 2017 "Reflections on REST" paper with Fielding as a coauthor retrospectively surveys these as the derivation tree of REST. Doc 426 and Doc 432 sit in this genre — they extend Fielding's method to two tiers the genre has not previously covered. The specific methodological novelty claim is therefore the *tier of application*, not the method itself. The dissertations should explicitly position themselves within the REST-successor genre, cite ARRESTED / CREST / "Reflections on REST" as predecessors in method, and claim only tier-specific extension as contribution.

---

## 1. Context

This document continues the pulverization series begun by Doc 425. Previous passes established prior art at multiple levels:

- Doc 425 — PRESTO against the server-side templating tradition (framework-level).
- Doc 427 — §7 (REST-encloses-DO) against islands architecture and micro-frontends.
- Doc 428 — PRESTO constraints against formal PL/security literature (mechanism-level).
- Doc 429 — htxlang and the htx engine against the template-engine tradition.
- Doc 430 — authorial-intent lifecycle against Knuth, Qwik, Fielding HATEOAS.
- Doc 431 — SERVER against compiler bootstrapping, DI containers, capability systems, supply-chain attestation.

These passes found extensive prior art for the patterns but did not find prior art for the specific methodological move: the Fielding Chapter 5 style-derivation applied to the construction and orchestration tiers. Docs 426 and 432 claim only that methodological application as contribution. This survey tests whether even that claim has published precedent.

## 2. The Specific Question

"Fielding's method," in the sense used by Docs 426 and 432, is the Chapter 5 derivation pattern of the 2000 dissertation:

1. Begin with the null style — no constraints.
2. Add one constraint at a time.
3. State the property the added constraint induces.
4. Evaluate the composition of the accumulated style with enclosing styles.
5. Name the induced property set as the style's identity.

The question: does any published work apply this specific method at the construction level (how bilateral source representations are authored) or the orchestration level (how the construction engine is itself assembled)?

Two failure modes for the question must be avoided:

**Not in scope.** Framework-level formalisms (Thymeleaf dialect docs, Spring `ApplicationContext`, Kubernetes CRDs, Erlang OTP child specs, Nix derivation language). These were surveyed in Docs 425–431 as pattern prior art; they are not style-level formalizations in Fielding's specific method.

**Not in scope.** Mechanism-level formalisms in PL theory, security theory, or concurrency theory (two-level grammars, non-interference, CSP parallel composition). These provide foundations; they do not derive architectural styles.

**In scope.** Papers, books, or technical reports that explicitly apply Fielding's null-plus-incremental-constraint-accumulation derivation to introduce a new architectural style.

## 3. The REST-Successor Genre

The survey identifies a specific and well-established genre: dissertations and papers that apply Fielding's method to introduce new architectural styles by extending REST into new domains. The genre emerged from Fielding's own institution (UC Irvine) and his immediate intellectual circle.

**ARRESTED** (Khare and Taylor, *Extending the Representational State Transfer (REST) Architectural Style for Decentralized Systems*, ICSE 2004; Rohit Khare, UCI PhD dissertation 2003). [IEEE Xplore](https://ieeexplore.ieee.org/abstract/document/1317465); [UCI primary source](https://www.ics.uci.edu/~rohit/ARRESTED-ICSE.pdf). ARRESTED applies Fielding's method directly: it adds four new building blocks — events, routes, locks, estimates — as constraints on Asynchrony, Routing, Delegation, and Estimation. The derivation produces intermediate named styles (REST+E, REST+R, REST+D) and terminates at ARRESTED. This is Chapter 5's method applied at the decentralization level.

**CREST** (Erenkrantz, UCI PhD dissertation 2009; Taylor, Erenkrantz, Gorlick, Baquero, *CREST: A New Model for Decentralized Internet-Scale Applications*, ICSE 2009). [CREST primary source](https://www.erenkrantz.com/CREST/). CREST adds five axioms on top of REST — computation-as-representation, context-free exchange, among others — applying Fielding's method at the computation-exchange level.

**COAST** (Gorlick, post-2009). Continues the derivation lineage with further extensions targeting distributed computation and mobile code at internet scale.

**"Reflections on REST"** (Fielding, Taylor, Erenkrantz, Gorlick, Khare, Hartman, Baquero; ESEC/FSE 2017, Impact Paper Award). [ACM DL](https://dl.acm.org/doi/10.1145/3106237.3121282). Retrospective that surveys CREST, COAST, and ARRESTED explicitly as the derivation tree of REST. Establishes the genre as a named intellectual tradition. Fielding is a co-author.

These four works together constitute the REST-successor genre. Each applies Chapter 5's method. Each introduces a new architectural style by constraint accumulation. Each names induced properties. Each evaluates composition with REST.

**None of them targets the construction level or the orchestration level.** ARRESTED, CREST, and COAST operate peer to REST at the transfer-of-representations tier — extending it outward into decentralization and computation-exchange. They do not operate at the construction level (how representations are authored before transfer) or at the orchestration level (how the engine that constructs representations is itself assembled).

## 4. What the Other Candidate Branches Showed

Candidate works that might have applied Fielding's method but do not:

**Amundsen, Gross, Stepinski, Akşimşek, *Hypermedia Systems* (2023)** ([hypermedia.systems](https://hypermedia.systems/components-of-a-hypermedia-system/)). Treats REST as an already-given style and evaluates how existing hypermedia forms satisfy each pre-existing constraint. The text reads: "Let's go through each of these constraints in turn and discuss them in detail, looking at how (and to what extent) the web satisfies each of them." Expository and evaluative; not derivational. No new style is introduced by Fielding's method.

**Taylor, Medvidovic, Dashofy, *Software Architecture: Foundations, Theory, and Practice* (Wiley 2010).** Catalogs architectural styles and discusses composition but does not derive new styles by Fielding's null-plus-constraints sequence. Textbook-exposition register. [UNCERTAIN PROVENANCE — based on published chapter outlines, not full-text verification.]

**Shaw and Garlan, *Software Architecture: Perspectives on an Emerging Discipline* (1996).** Predates Fielding's 2000 method. Catalogs styles (pipe-and-filter, layered, event-based, blackboard) and discusses selection among them. Does not use Chapter 5's derivation because Chapter 5 had not yet been written.

**Richardson Maturity Model (2008; Fowler write-up 2010).** A *heuristic maturity scale* over Fielding's constraints, not a derivation of a new style. [martinfowler.com](https://martinfowler.com/articles/richardsonMaturityModel.html).

**Webber, Parastatidis, Robinson, *REST in Practice* (O'Reilly 2010).** Practitioner guide positioning REST against SOA. Enumerates Fielding's constraints and applies them to HTTP design. Does not derive a new construction-level style.

**Architecture Description Languages — Wright (Allen and Garlan), Rapide (Luckham), ACME (CMU), Darwin (Imperial), xADL (UCI).** Style specification and verification languages. They formalize styles once stated and check conformance; they do not use Chapter 5's null-plus-incremental-constraint derivation to introduce new styles. Representative: Medvidovic and Taylor, *A Classification and Comparison Framework for Software Architecture Description Languages*, IEEE TSE 2000 ([UCI PDF](https://ics.uci.edu/~taylor/documents/2000-ADLs-TSE.pdf)).

**Microservices and SOA literature** (Newman, Richardson, Erl). Samples checked include Nirmata's *Microservices: Five Architectural Constraints* (2015), which names five constraints and properties but — per direct fetch — "does not follow Fielding's systematic approach … treats microservices as a pre-existing architectural style requiring these constraints, rather than deriving the style from constraints."

**Process-calculus architectural-style papers** (Allen-Garlan Wright uses CSP connector compatibility; Daniel Jackson's Alloy). Formalize constraints in a specific logic but do not use Fielding's null-plus-accumulation derivation.

**W3C TAG and IETF IAB architecture notes.** Reference REST descriptively; do not introduce new Fielding-derived styles.

None of these works applies Fielding's Chapter 5 method in the sense specified in §2.

## 5. What This Means for PRESTO

No surveyed work applies Fielding's Chapter 5 method to the construction level — to how bilateral source representations are authored.

Doc 426 §4 derives PRESTO's five constraints from the null style via the Chapter 5 method and names the induced property (ambivalent execution with agnostic determinism) in Fielding's register. The derivation is in the REST-successor genre methodologically, but at a different tier. The ARRESTED / CREST / COAST line extends REST outward into decentralization and computation-exchange; PRESTO extends REST *inward*, into the construction pipeline that Fielding explicitly scoped out of his 2000 dissertation.

The methodological move (extending Fielding's Chapter 5 derivation to a new tier) is not novel — Khare-Taylor 2003 established it. The *specific tier of application* (construction of representations before transfer) is novel with respect to the surveyed genre. [UNCERTAIN PROVENANCE — absence in a bounded survey is weak evidence; the ICSE / FSE / ICSA 2000–2026 proceedings were not exhaustively searched.]

**Verdict for Doc 426.** The style-level contribution survives. The positioning should be revised: Doc 426 should cite ARRESTED, CREST, and "Reflections on REST" as methodological predecessors, describe the genre explicitly, and claim only the specific tier — the construction level — as novel application. The method itself is Fielding's, extended by Khare-Taylor-Erenkrantz-Gorlick-Baquero, and specialized here to a tier the genre has not covered.

## 6. What This Means for SERVER

No surveyed work applies Fielding's Chapter 5 method to the orchestration level — to how the construction engine is itself assembled.

Doc 432 §4 derives SERVER's five constraints from the null style via the Chapter 5 method and names the induced property (recursive ambivalence with self-authorizing determinism). Like PRESTO, the derivation is in the REST-successor genre methodologically but at a different tier. Doc 432 is explicitly framed as the application of Fielding's method one composed level outside where Doc 426 applies it, per Doc 424's recursive-Fielding-accumulation framework.

**Verdict for Doc 432.** The style-level contribution survives at the same level as Doc 426's. The positioning should similarly be revised: Doc 432 should cite ARRESTED, CREST, and "Reflections on REST" as methodological predecessors in the genre, and additionally cite Doc 424 as the explicit framework for applying Fielding's method at composed levels. The novelty is the specific tier of application — the orchestration of the construction engine — and the recursive application of Fielding's method through Doc 424's framework.

## 7. Implications for Positioning

The dissertations should be repositioned within the REST-successor genre rather than as novel methodological contributions. Specifically:

**The genre exists.** ARRESTED (2003), CREST (2009), COAST, "Reflections on REST" (2017) are peer works in a published tradition. Fielding himself is a coauthor on the 2017 retrospective. The genre has earned an ACM Impact Paper Award.

**PRESTO and SERVER extend the genre.** Both apply Chapter 5's method. Both name induced properties in Fielding's register. Both evaluate composition with REST and with each other. They differ from the existing genre entries in the specific tier of application — construction and orchestration of the construction pipeline, rather than decentralization or computation-exchange.

**The novelty claim should narrow accordingly.** The novelty is not methodological (Khare-Taylor-Erenkrantz-Gorlick-Baquero established the pattern of extending Fielding's method to new tiers). The novelty is the *two specific tiers* that the prior genre entries did not cover. That is a narrower claim, but it is defensible and positioned honestly within a recognized academic tradition.

**The recursive framework (Doc 424) becomes a methodological commentary on the genre.** Doc 424's recursive-Fielding-accumulation at composed levels is one way to systematize the extensions the genre has made ad-hoc. It sits as a potential methodological contribution alongside the tier-specific dissertations — generalizing what Khare-Taylor, Erenkrantz-Taylor, Gorlick, and the corpus have done piecemeal.

## 8. Specific Citations Docs 426 and 432 Should Add

To position PRESTO and SERVER honestly within the REST-successor genre, the dissertations should add citations and acknowledgments for:

- **Khare, R., & Taylor, R. N. (2004).** [*Extending the Representational State Transfer (REST) Architectural Style for Decentralized Systems.*](https://www.ics.uci.edu/~rohit/ARRESTED-ICSE.pdf) ICSE 2004. Cite in Doc 426 §12 Conceptual Foundations as the first published Fielding-method extension to a new tier. Cite in Doc 432 §12 for the same reason.
- **Erenkrantz, J. R. (2009).** *Computational REST: A New Model for Decentralized, Internet-Scale Applications.* UCI PhD dissertation. Cite as a second tier-extension in the REST-successor genre.
- **Taylor, R. N., Erenkrantz, J. R., Gorlick, M. M., & Baquero, C. (2009).** *CREST: A New Model for Decentralized Internet-Scale Applications.* ICSE 2009.
- **Fielding, R. T., Taylor, R. N., Erenkrantz, J. R., Gorlick, M. M., Khare, R., Hartman, H., & Baquero, C. (2017).** [*Reflections on REST.*](https://dl.acm.org/doi/10.1145/3106237.3121282) ESEC/FSE 2017, Impact Paper Award. Cite as the retrospective establishing the genre.

The Acknowledgments section of each dissertation should reference the REST-successor tradition explicitly. The Abstract and the "What This Dissertation Claims" section of each should narrow the methodological claim from "application of Fielding's method" to "application of Fielding's method, following the REST-successor tradition established by Khare, Taylor, Erenkrantz, Gorlick, Baquero, and Hartman, to a tier the genre has not previously covered."

## 9. Honest Verdict

Both dissertations' style-level contributions survive this specific scrutiny — with the important caveat that they now sit within a *named and established genre* rather than standing alone as methodological novelty. The novelty is the *tier of application*, not the method. The dissertations should cite the REST-successor genre explicitly and position themselves as extensions to previously uncovered tiers.

This finding is consistent with, and sharpens, the outcome of the previous pulverizations. The surviving residual across the full PRESTO stack was already narrow — Doc 424's methodology, the keeper-private reasoned-to gestalt, and a synthesis-as-framing claim. The new finding adds specificity: the dissertations extend a specific published genre that was previously unacknowledged in the corpus, and they should position themselves within it.

[UNCERTAIN PROVENANCE] flagged on negative findings for the Medvidovic-Taylor textbook, Shaw-Garlan 1996, the broader ADL corpus, and the full ICSE / FSE / ICSA 2000–2026 proceedings, which were not exhaustively surveyed.

## 10. Falsifiers

- If any paper is located in the ICSE / FSE / ICSA / ECSA 2000–2026 proceedings that applies Fielding's Chapter 5 method to the construction level or the orchestration level, the corresponding survival verdict narrows to partial or collapses.
- If the Medvidovic-Taylor textbook (2010) on full-text reading turns out to derive a construction-level style via Chapter 5's method, Doc 426's survival verdict narrows or collapses.
- If a technical report from UCI's REST-group — or from Gorlick's COAST lineage — specifically targets the construction level or the orchestration level, the corpus must subsume.
- If a framework-documentation source (Astro, Qwik, RSC, Phoenix LiveView) is found to include a Chapter-5-style derivation section that the Doc 425 and Doc 427 surveys missed, the construction-level verdict narrows.

---

## Appendix: The Prompt That Triggered This Document

> "Now I want to do a web fetch for any formal construction level architectural styles in the likeness of PRESTO or SERVER. I want to search and examine it on formal grounds. Create an artifact with your findings"

The survey was executed by a sub-agent. A first run hit an Anthropic API overload (HTTP 529) during synthesis after approximately thirty tool uses. A second run with a tightened scope completed, and its findings are integrated here.
