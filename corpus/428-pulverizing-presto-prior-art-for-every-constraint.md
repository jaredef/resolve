# Pulverizing PRESTO: Prior Art for Every Constraint

> **Reader's Introduction**
>
> Doc 425 deflated the PRESTO dissertation against the 25-year server-side templating tradition. Doc 426 rewrote the dissertation under that narrower scope. Doc 427 deflated §7 specifically against the islands-architecture and micro-frontends literature. This document runs the deflation to the bottom: a constraint-by-constraint search for prior art across ten adjacent formal literatures — information-flow security, two-level grammars, multi-stage programming, hygienic macros, aspect-oriented programming, partial evaluation, progressive-enhancement literature, capability-token systems, CSP and confluence, architectural-style composition. The instruction from the keeper was explicit: pulverize. Find every piece of prior art. Only what genuinely survives should remain; if the dissertation can be built back up after that, it will be built back up. This document reports what the pulverization found. Five of ten pulverization branches return full subsumption of the claim under a named formal framework from an earlier decade. Three return partial subsumption where the mechanism is prior art but the web-architectural-style register is not. Two return no clear prior, both [UNCERTAIN PROVENANCE]. The honest verdict: measured against its own stated claim (terminological-formal contribution), the dissertation survives intact. Measured against any stronger claim of conceptual or mechanistic novelty, almost nothing survives. Six specific prior-art citations that Doc 426 does not currently include — and should — are identified in §6 (Goguen-Meseguer 1982; Jones-Gomard-Sestoft 1993; Flatt 2002; Filman-Friedman 2000; Birgisson et al. 2014 on macaroons; SPKI/SDSI RFC 2693 1999).

**Doc 428** · scoped to the full PRESTO constraint set

---

## 1. Context

Three deflation passes precede this one. Doc 425 deflated the high-level PRESTO claim against the server-side templating tradition (JSP custom tags, XSLT, Thymeleaf, Razor, Blade, ERB, htmx). Doc 426 rewrote the dissertation applying Doc 425's findings — prior-art acknowledgment throughout, platform-contingent layer boundaries marked, JWT trade-offs explicitly named. Doc 427 deflated §7 specifically against islands-architecture and micro-frontends literature.

Doc 426 already states the contribution narrowly: terminological-formal — naming and formalizing at the architectural-style level a pattern that has been in standard practice for decades. This document tests whether even that narrow claim has been stated elsewhere, constraint by constraint, in adjacent formal literatures the previous deflations did not cover.

The keeper's instruction for this pass: pulverize. Err on the side of finding prior art, not preserving novelty.

## 2. Method

Ten branches were surveyed. Each branch targets a specific constraint, induced property, or methodological move in Doc 426, and searches the corresponding adjacent formal literature for prior art — not just for the pattern as-practiced (Doc 425's work) but for the pattern as-formalized in a named framework. The branches are:

1. C1 bilateral boundary as a formal mechanism (grammar, staging, aspect, partial-evaluation literatures)
2. C1's induced property "mutual indifference" as a named formal property (information-flow security, concurrency theory)
3. C2 namespace separation as a formal partitioning mechanism (W3C, PL module systems)
4. C3 server-consumed directives as a formal invariant (partial evaluation, macro systems, preprocessor semantics)
5. C4 progressive code-on-demand as a spectrum (progressive-enhancement literature)
6. C4's specific 7-layer decomposition of client runtime capability
7. C5 server-embedded authentication (JWT, macaroons, capability tokens, signed URLs, CSRF tokens)
8. The composite induced property "ambivalent execution with agnostic determinism"
9. Architectural-style composition (Shaw-Garlan, Perry-Wolf, feature-oriented programming)
10. Hypermedia-specific theory at the construction level (Gross, Amundsen, Webber)

## 3. Findings

### C1 — The Bilateral Boundary (mechanism)

**Prior art.**

- *Two-level grammars* (Adriaan van Wijngaarden, 1968, Algol 68 formal definition). The Algol 68 Report defines its syntax via a grammar generating terminals that serve as nonterminals of a second grammar. Two grammars, one document, by construction. ([Wikipedia](https://en.wikipedia.org/wiki/Van_Wijngaarden_grammar); [CWI](https://homepages.cwi.nl/~steven/vw.html))
- *Multi-stage programming, MetaML/MetaOCaml* (Taha & Sheard 1997; Kiselyov). Formally distinguishes code at stage N from code at stage N+1 in one program text; cross-stage persistence is the named formalism for values crossing the boundary. ([Kiselyov MetaOCaml](https://okmij.org/ftp/ML/MetaOCaml.html); [Staged calculi](https://okmij.org/ftp/meta-programming/calculi.html))
- *Hygienic macros with phase separation* (Matthew Flatt, "Composable and Compilable Macros: You Want it When?", ICFP 2002). Explicitly formalizes compile-time phase consuming macro forms; runtime phase sees the document with macros fully removed. ([PDF](https://www-old.cs.utah.edu/plt/publications/macromod.pdf))
- *Aspect-oriented programming* (Robert Filman & Daniel Friedman, 2000, "Aspect-Oriented Programming is Quantification and Obliviousness"). The base program is written by programmers oblivious to aspect assertions; aspects and base code are two programs over one text. ([PDF](https://homepages.cwi.nl/~storm/teaching/reader/FilmanFriedman00.pdf))

**Status: partially subsumed at the mechanism level.** Two-level grammars, staged calculi, hygienic macros, and AOP all formalize "two concerns, one text, phase-separated processing." Doc 426 §4.1 admits the pattern is long-practiced but does not cite any of the PL-side prior art that has formalized it. The web-architectural-style register ("bilateral boundary as REST-composing construction-level constraint") is not prefigured in these sources, but the mechanism is.

### C1 — "Mutual Indifference" (induced property)

**Prior art.**

- *Non-interference* (Joseph Goguen & José Meseguer, 1982, "Security Policies and Security Models," IEEE S&P). The canonical formalization of the property. "A system has the non-interference property iff any sequence of low inputs produces the same low outputs regardless of high inputs." Maps directly onto PRESTO's claim that each interpreter produces the same output regardless of content in the other namespace. ([Wikipedia](https://en.wikipedia.org/wiki/Non-interference_(security)); [Purdue CS526 notes](https://www.cs.purdue.edu/homes/ninghui/courses/526_Fall14/handouts/14_526_topic18.pdf))
- *Obliviousness* (Filman & Friedman 2000). "The base program is written by oblivious programmers." Exactly PRESTO's "mutual unawareness."
- *Confluence / Church-Rosser* (Alonzo Church & J. Barkley Rosser, 1936). For disjoint redexes, reduction order is irrelevant; the diamond property is the canonical formalization of "deterministic resolution under independent operators." ([Wikipedia](https://en.wikipedia.org/wiki/Church%E2%80%93Rosser_theorem))
- *Parallel composition over disjoint alphabets in CSP* (C.A.R. Hoare, 1978). `P ‖ Q` with `alpha(P) ∩ alpha(Q) = ∅` is the canonical model of two processes with no interference. ([Wikipedia](https://en.wikipedia.org/wiki/Communicating_sequential_processes))

**Status: fully subsumed.** "Mutual indifference" is non-interference (Goguen-Meseguer 1982) plus obliviousness (Filman-Friedman 2000). Doc 426 §5 does not cite Goguen-Meseguer. The 44-year-old name is the canonical one.

### C2 — Namespace Separation

**Prior art.**

- *W3C Namespaces in XML* (Tim Bray, Dave Hollander, Andrew Layman, 1999). Literal formalization: names in an XML namespace belong to "disjoint traditional namespaces, called namespace partitions"; forward compatibility across platform evolution. ([W3C spec](https://www.w3.org/TR/xml-names/))
- *Ada packages* (Ichbiah et al., 1980), *C++ namespaces* (ISO 1998), *Python modules* (van Rossum 1991). Same word, different level (language vs. document).
- *HTML5 `data-*` custom attributes* (WHATWG, 2008). Author-space partition reserved by spec.
- *Web Components custom element names* (Hickson et al., 2014). Name-with-hyphen as partition rule.

**Status: fully subsumed.** Doc 426 §4.2 already admits this: "W3C XML Namespaces (1999) and every server-side templating framework since. The contribution here is statement at the architectural-style level." No residual novelty at this constraint.

### C3 — Server-Consumed Directives

**Prior art.**

- *Partial evaluation and binding-time analysis* (Neil Jones, Carsten Gomard, Peter Sestoft, 1993, *Partial Evaluation and Automatic Program Generation*). The canonical formalization of "some directives are static (consumed at specialization time), others dynamic (residual in output)." Binding-time analysis is literally a formal treatment of which directives get consumed at which phase. ([PDF](https://www.cs.utexas.edu/~novak/jonesgomardsestoft.pdf))
- *C preprocessor semantics* (Kernighan-Ritchie era, standardized in C89). "The final output of the preprocessor contains no directives — only the output of the processed directive is passed to the compiler." Literally C3 at the language level. ([cppreference](https://en.cppreference.com/cpp/preprocessor))
- *Hygienic macros with phase separation* (Flatt 2002). "The compile-time runtime and runtime runtime are strictly separated." Macros are consumed at compile-time; output has no macros.
- *M4 macro processor* (Brian Kernighan & Dennis Ritchie, 1977). General-purpose macro processor; directives consumed and removed.
- *XSLT* (W3C 1999). The entire `xsl:` namespace is consumed in transformation.
- *Kohlbecker-Friedman-Felleisen-Duba (KFFD) algorithm* (1986). Hygienic macro expansion; consumed forms.

**Status: fully subsumed at the mechanism level.** The invariant "every directive in namespace N fully consumed during phase P" is exactly what offline partial evaluation and hygienic-macro systems formalize. PL theory has been stating this as a correctness invariant since KFFD 1986 and Jones-Gomard-Sestoft 1993. Doc 426 adds no formal content; it re-registers the property in Fielding's vocabulary.

### C4 — Progressive Code-on-Demand (the idea of a spectrum)

**Prior art.**

- *Progressive enhancement* (Steve Champeon & Nick Finck, SXSW Interactive 2003). The canonical layered decomposition: content (HTML) → presentation (CSS) → behavior (JS). ([A List Apart](https://alistapart.com/article/understandingprogressiveenhancement/))
- *Resilient Web Design* (Jeremy Keith, 2016). Three layers formalized with layered peeling as a principle. ([Book](https://resilientwebdesign.com/chapter5/))
- *Cut the Mustard* (Tom Maslen, BBC Responsive News, 2012). Two-tier capability split (core/enhanced) with a specific feature-detection test. ([BBC blog](https://responsivenews.co.uk/post/18948466399/cutting-the-mustard))
- *Graded Browser Support* (Nate Koechley & Nicholas Zakas, Yahoo YUI, 2006). A-grade / C-grade / X-grade explicit tiering.
- *Richardson Maturity Model* (Leonard Richardson, 2008; written up by Fowler 2010). REST-specific 0-3 level accumulation (POX → Resources → Verbs → HATEOAS). ([martinfowler.com](https://martinfowler.com/articles/richardsonMaturityModel.html))
- *Fielding himself* (2000, §5.1.7). Evaluated code-on-demand with tradeoffs (user-perceived performance vs. visibility); did not decompose into layers but established the tradeoff framing.

**Status: partially subsumed.** The *idea* of a progressive spectrum is Champeon-Finck 2003 and predates PRESTO by 23 years. Keith's three-layer formalization, BBC's two-tier, and Zakas's graded-support tiering all precede. What is *not* prefigured is the decomposition of *client-side runtime capability specifically* into layers matching PRESTO's cut points.

### C4 — The Specific 7-Layer Decomposition

**Prior art (adjacent but materially different):**

- *Astro client directives* (`client:load`, `client:idle`, `client:visible`, `client:media`, `client:only`). Five discrete hydration strategies per component. ([Astro Islands Architecture](https://docs.astro.build/en/concepts/islands/))
- *Qwik resumability levels* (Hevery). Per-component lazy-loading as an evolution beyond islands. ([Builder.io](https://www.builder.io/blog/astro-qwik))
- *Hypermedia-Driven Applications* (Gross, htmx essays). Two-constraint formalization; does not layer-decompose beyond two. ([HDA essay](https://htmx.org/essays/hypermedia-driven-applications/))
- *Richardson Maturity Model* 4-level tiering as nearest Fielding-register precedent.

**Status: no clear prior found for an exactly-7 decomposition at these specific cut points.** Island architecture (Miller 2020; Astro), resumability (Qwik), and RMM's 4-level progression are adjacent but materially different. **This is a strong candidate for residual novelty at the practitioner-decomposition level** — though Doc 426 §4.4 explicitly discounts two of the seven transitions (C₂ on WASM/JS; parts of C₄ on WebSocket/HTTP) as platform-contingent, which narrows the novelty to "a particular choice of cut points reflecting 2024-era web-platform state." [UNCERTAIN PROVENANCE — absence in a bounded search is weak evidence.]

### C5 — Server-Embedded Authentication and Authorization

**Prior art.**

- *JWT* (RFC 7519, 2015; BCP RFC 8725, 2020). The dissertation's own citation.
- *Macaroons* (Arnar Birgisson, Joe Politz, Úlfar Erlingsson, Ankur Taly, Michael Vrable, Mark Lentczner, NDSS 2014). Bearer credentials with contextual caveats, chained HMAC, attenuation and delegation. Directly anticipates PRESTO's "scoped signed credentials inside affordances." ([Google Research](https://research.google/pubs/macaroons-cookies-with-contextual-caveats-for-decentralized-authorization-in-the-cloud/); [PDF](https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/41892.pdf))
- *Biscuit tokens* (Clément Delafargue, 2020). Public-key-signed, Datalog-programmable, attenuable. ([Fly.io](https://fly.io/blog/api-tokens-a-tedious-survey/))
- *PASETO* (Scott Arciszewski, Paragonie, 2018); *Fernet tokens* (Heroku/Keystone); *Branca* — modern alternatives to JWT with documented trade-offs.
- *SPKI/SDSI* (RFC 2693, Ellison et al., 1999). Capability certificates, delegation, authorization chains without centralized CA. Directly a prior formalization of "identity and permission in a single signed credential." ([RFC](https://datatracker.ietf.org/doc/html/rfc2693))
- *CloudFront / S3 signed URLs* (2010s). The literal pattern: scoped cryptographic credential embedded in the affordance (URL), validated statelessly, with expiry. ([AWS](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-signed-urls.html))
- *Object-capability systems* (Mark Miller et al., E language, Waterken). Canonical capability tradition; "the credential *is* the authorization."
- *Double-submit CSRF token / synchronizer token pattern* (OWASP). Server-embedded cryptographic token in rendered affordances is decades-old practice. ([OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html))

**Status: fully subsumed.** Every aspect PRESTO §4.5 names — scoped signed credential, stateless validation, embedded-in-affordance, attenuation, expiry — has named prior art. The macaroon paper (Birgisson 2014) is particularly strong: its abstract literally describes "contextual caveats" scoping *where/when/by-whom/for-what* a credential authorizes — the PRESTO §4.5 formulation is a subset. SPKI/SDSI 1999 formalized the capability-certificate pattern at the infrastructure level. Doc 426 does not cite macaroons or SPKI/SDSI.

### Composite Induced Property — "Ambivalent Execution with Agnostic Determinism"

**Prior art.**

- *Non-interference + confluence + obliviousness, composed.* The compound property is just the intersection of these three named properties.
- *Parallel composition over disjoint alphabets in CSP* (Hoare 1978). `P ‖ Q` with `alpha(P) ∩ alpha(Q) = ∅` yields exactly "two processes, mutual non-interference, compositionally deterministic."
- *Two-level grammar semantics* (van Wijngaarden). Metanotions and hyperrules operate in two stages; the result is deterministic given uniform replacement.
- *Actor-model isolation* (Hewitt; Agha). Agents with private state, no shared memory, deterministic under message order.
- *Aspectual obliviousness + confluence.* The exact composition PRESTO names, under other words.

**Status: fully subsumed as composition of prior properties, novel only as a compound name.** The four-word phrase "ambivalent execution with agnostic determinism" does not appear in the surveyed literature — the *name* is new. But the property it names is (non-interference ∩ confluence ∩ obliviousness) applied to a document-construction pipeline. Doc 426 §5 concedes the point: "The naming does not create the property; it makes the property available for architectural reasoning."

### Architectural-Style Composition

**Prior art.**

- *Shaw & Garlan* (1996, *Software Architecture: Perspectives on an Emerging Discipline*). Formalizes heterogeneous/hybrid style composition. "A component of a system organized in one architectural style may have an internal structure developed in a completely different style." Direct prior art for PRESTO's composition-with-REST. ([MIT PDF](http://sunnyday.mit.edu/16.355/intro_softarch.pdf); [CMU PDF](http://www.cs.cmu.edu/~Compose/toward_boxology.pdf))
- *Feature-Oriented Programming / Mixin Layers* (Don Batory 2002, TOSEM). Stepwise constraint accumulation with layered refinement. ([PDF](https://www.se.cs.uni-saarland.de/publications/docs/ICSE2006.pdf))
- *Perry & Wolf* (1992, "Foundations for the Study of Software Architecture"). Original architectural-style formalization; composition implicit.

**Status: partially subsumed.** Hierarchical/heterogeneous style composition is a Shaw-Garlan staple. The *specific* recursive Fielding-accumulation-with-emission-as-next-Null (Doc 424) may be the narrow methodological residual, but the meta-move of composed styles predates it by 30 years.

### Hypermedia-Specific Theory

**Prior art.**

- *Hypermedia-Driven Applications* (Carson Gross, htmx essays). Two-constraint formalization: declarative HTML-embedded + hypermedia wire format. Does not formalize the bilateral boundary. ([HDA essay](https://htmx.org/essays/hypermedia-driven-applications/))
- *Hypermedia Systems* (Gross, Stepinski, Akşimşek 2023). Practitioner treatment; does not reach architectural-style-level formalization of the construction level.
- *Amundsen, Building Hypermedia APIs* (2011); *Webber et al., REST in Practice* (2010). Construction mentioned but not formalized at style level.

**Status: no clear prior found for the bilateral boundary as a named architectural-style constraint in the hypermedia literature specifically.** The Gross HDA formalization is adjacent but distinct — it constrains *wire format and interactivity mechanism*, not *construction-level namespace partitioning*. This leaves the Fielding-register formalization of the construction level as a plausible narrow residual, consistent with Doc 426's own self-assessment. [UNCERTAIN PROVENANCE.]

## 4. Tally

- **Fully subsumed** (5 of 10 branches): C1-induced "mutual indifference" (non-interference + obliviousness); C2 namespace separation (W3C 1999); C3 server-consumed directives (partial evaluation + phase separation + C preprocessor); C5 server-embedded authentication (JWT/macaroons/biscuit/PASETO/SPKI/signed URLs/CSRF); composite property (CSP disjoint-alphabet + confluence + non-interference).
- **Partially subsumed** (3 of 10): C1 bilateral boundary as mechanism (two-level grammars + staged calculi + AOP + partial evaluation — prior at the mechanism level, not the web-architectural-style register); C4 progressive code-on-demand idea (Champeon-Finck 2003 + Keith + BBC + Zakas — the *spectrum* idea is 23 years old, the specific *domain* of client runtime capability layered this way is newer); architectural-style composition (Shaw-Garlan 1996).
- **No clear prior found** (2 of 10, both [UNCERTAIN PROVENANCE]): C4's specific 7-layer decomposition at these exact cut points; bilateral-boundary-as-constraint specifically in the hypermedia-architectural-style register.

## 5. What Actually Survives

Measured against Doc 426's own stated claim — that the dissertation's contribution is *terminological-formal*, naming a long-practiced pattern at the architectural-style level in Fielding's method — the dissertation survives this pass intact. Doc 426 §10 already enumerates what is and is not claimed, and the claims are all modest.

Measured against any stronger claim of conceptual or mechanistic novelty, almost nothing survives:

- The bilateral-boundary *mechanism* is van Wijngaarden two-level grammars (1968), Flatt's phase-separated macro systems (2002), Filman-Friedman AOP (2000), Jones-Gomard-Sestoft partial evaluation (1993).
- "Mutual indifference" is Goguen-Meseguer non-interference (1982) almost verbatim.
- Namespace separation is W3C XML Namespaces (1999).
- Server-consumed directives is binding-time analysis / phase separation since KFFD 1986.
- Signed scoped credentials in affordances is macaroons (2014), SPKI/SDSI (1999), signed URLs, CSRF tokens.
- Progressive enhancement as a layered spectrum is Champeon-Finck 2003.

**The two narrow residuals that the pulverization leaves standing:**

1. **The specific 7-cut decomposition of web client runtime capability.** Platform-contingent on current web-platform state, as Doc 426 §4.4 already admits for C₂ and parts of C₄. The methodological move (decomposition by Fielding-accumulation) is Fielding's; the specific 7-point application appears not to be prefigured in the surveyed literature. [UNCERTAIN PROVENANCE.]

2. **The application of Fielding's exact constraint-accumulation *method* at the construction level.** A methodological move within Fielding's framework rather than a new formalism. The hypermedia-theory literature (Amundsen, Webber, Gross) has not applied Fielding's method to construction-level constraints in this way.

Both residuals are narrow, and both are methodological rather than conceptual. Neither introduces a new formalism.

## 6. Missing Citations in Doc 426

Doc 426 claims only a terminological-formal contribution but does not cite the nearest formal prior art for its core induced properties and constraints. Adding the following would make the modest claim watertight rather than implicit:

- **Goguen, J. A. & Meseguer, J. (1982).** *Security Policies and Security Models.* IEEE Symposium on Security and Privacy. Cite at §5 (The Induced Property) as the formal origin of non-interference, which "mutual indifference" renames.
- **Jones, N. D., Gomard, C. K., & Sestoft, P. (1993).** *Partial Evaluation and Automatic Program Generation.* Prentice Hall. Cite at §4.3 (Server-Consumed Directives) as the formal origin of binding-time analysis.
- **Flatt, M. (2002).** *Composable and Compilable Macros: You Want it When?* ICFP 2002. Cite at §4.3 and §4.1 as the formal treatment of phase-separated compile-time vs. runtime.
- **Filman, R. E. & Friedman, D. P. (2000).** *Aspect-Oriented Programming is Quantification and Obliviousness.* Cite at §4.1 (Bilateral Boundary) and §5 (Induced Property) as the formal origin of "obliviousness."
- **Birgisson, A., Politz, J. G., Erlingsson, Ú., Taly, A., Vrable, M., & Lentczner, M. (2014).** *Macaroons: Cookies with Contextual Caveats.* NDSS 2014. Cite at §4.5 (Server-Embedded Authentication) as specific prior art for the scoped-credential-with-caveats pattern.
- **Ellison, C., et al. (1999).** *SPKI Certificate Theory.* RFC 2693. Cite at §4.5 as specific prior art for capability-certificate-style authorization.

These six additions would move Doc 426 from "terminological contribution with implicit prior-art acknowledgment" to "terminological contribution with explicit prior-art genealogy." No claim needs to be strengthened or weakened; the changes are purely citational.

## 7. Proposed Path Forward

Three options, for the keeper's decision.

**Option A — Minimal.** Update Doc 426 to add the six citations identified in §6. The dissertation's claims are unchanged; the prior-art trail becomes explicit. Smallest edit; preserves the artifact.

**Option B — Substantial.** Rewrite Doc 426 a second time to integrate the PL-theory prior art into the main derivation, not just the references. Each constraint introduced with its formal-literature antecedent named inline (e.g., "§4.1. The Bilateral Boundary. The formal mechanism — two namespaces, one medium, phase-separated processing — is prior art in van Wijngaarden's two-level grammars (1968), Flatt's phase-separated macro systems (2002), Filman-Friedman aspect obliviousness (2000), and Jones-Gomard-Sestoft partial evaluation (1993). The contribution here is the restatement at the web-architectural-style level in Fielding's method..."). Larger edit; more honest; produces a dissertation that reads like a *legitimate formal-literature synthesis* rather than a practitioner dissertation.

**Option C — Terminal narrowing.** Accept that what survives the pulverization is narrow enough that a full dissertation is the wrong artifact. Replace Doc 426 with a short paper (~2000 words) that states precisely: (1) a long-practiced server-side-templating pattern can be formalized at the architectural-style level in Fielding's method; (2) two narrow residuals appear to survive (the 7-cut decomposition and the Fielding-method-at-construction-level methodological move); (3) the corpus's main contribution is the recursive Fielding-accumulation framework (Doc 424) rather than the specific PRESTO derivation. The PRESTO-specific material becomes a worked example in service of the methodological contribution rather than the headline artifact.

Each option is defensible. Option A is cheapest and preserves continuity. Option B is intellectually cleanest. Option C is the most honest about the scale of the contribution after pulverization.

## 8. Falsifiers

- If any of the six citations identified in §6 turns out, on careful reading, not to actually establish the property this document claims it establishes, the citation is wrong and should be removed rather than added.
- If a primary-source read of the Gross/Stepinski/Akşimşek *Hypermedia Systems* book (2023) shows that the bilateral-boundary pattern is in fact formalized there at the architectural-style level, the second narrow residual retracts and Doc 426 subsumes into that book's framing.
- If a published article can be located that decomposes web client runtime capability into exactly seven layers matching PRESTO's cut points, the first narrow residual retracts.
- If the phrase "architectural-style-level formalization of the construction level" is itself found to be a distinction without a difference — if every named architectural-style formalization implicitly covers the construction level, or if the distinction between "mechanism-level prior art" and "architectural-style-level formalization" collapses under scrutiny — the modest claim Doc 426 actually makes is itself too strong.

## 9. What This Document Does Not Settle

- Which of Options A, B, C in §7 the keeper should choose. That is a dissertation-shape decision.
- Whether the recursive Fielding-accumulation framework in Doc 424 survives its own parallel pulverization. Doc 423 already did a literature survey for Doc 424; that survey was narrower than this one and may warrant extension under the same discipline.
- Whether any of the [UNCERTAIN PROVENANCE] findings in §3 are in fact resolvable on a more careful search. They are flagged for follow-up, not settled.

---

## Appendix: The Prompt That Triggered This Document

> "Do A. Also I want you to do a branching literature for all the constraints. I want to pulverize this dissertation. If it can be built back up, we will after finding every single piece of prior art"

The "Do A" directed the scoped §7 deflation (Doc 427); this document addresses the second half of the instruction.
