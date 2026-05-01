# Deflating §7: Islands Architecture and Micro-Frontends as Prior Art for REST-Encloses-DO

> **Reader's Introduction**
>
> Doc 426 §7 ("Why REST Can Enclose Distributed Objects") claims that a RESTful server can enclose Distributed Object architectures within its representations, with PRESTO providing "the missing authoring authority" that makes the enclosure viable. A branching literature entracement across ten branches (Fielding Chapter 3, islands architecture, micro-frontends, backend-for-frontend, Module Federation, Web Components, Qwik containers, CORBA/DCOM/RMI, SOA/microservices, and Fowler/ThoughtWorks patterns) tested the claim against prior art. The structural pattern is well-named in the literature under vocabularies that do not use the word "enclose" or the phrase "Distributed Objects" but describe the same architectural shape: *islands architecture* (Katie Sylor-Miller 2019, Jason Miller 2020), *micro-frontends* (Michael Geers 2020, Cam Jackson 2019, ThoughtWorks Technology Radar 2016), *Qwik containers* (Miško Hevery 2022–), and *ESI transclusion* (Akamai circa 2001). §7's framing therefore overstates what is corpus-native. This document applies the deflation. §7 should acknowledge the prior art, drop the pattern-identification claim, weaken the "missing authoring authority" claim against Qwik's container protocols and Geers' server-side composition, and retain only the narrow methodological contribution — submission of the enclosure pattern to Fielding's architectural-style evaluation method. The revision to Doc 426 §7 is proposed in §6 of this document; no Doc 426 edit is made without the keeper's approval, following the pattern that produced Doc 426 from Doc 425.

**Doc 427** · scoped to Doc 426 §7

---

## 1. The Claim Under Test

Doc 426 §7 claims, in summary:

1. A RESTful server can transmit any client-side architecture within its representations, including Distributed Objects (DO).
2. What DO-as-outer-architecture violates is not individual REST constraints but the architectural encapsulation.
3. PRESTO resolves this by constraining the construction: an `htx:component` that renders a DO-style island is a server-consumed directive; the server decides whether to include it, grants the authentication token the island needs, controls the scope of the island's data channel.
4. The island operates as a Distributed Object within a bounded region of a complete representation — enclosed by REST at the transfer level and authorized by PRESTO at the construction level.
5. Three styles, three levels, no collision. REST provides the outer architecture; PRESTO authors the encapsulation; DO operates within bounded inner regions. The key insight is that architectural encapsulation requires authoring authority — someone must decide what is enclosed and at what scope. REST does not provide this authority because it does not operate at the construction level. PRESTO does.

The claim therefore has two specific sub-claims: (a) the enclosure pattern is identifiable and the corpus identifies it; (b) PRESTO provides the missing authoring authority that makes the enclosure viable.

## 2. What the Literature Names

The ten-branch survey (see Doc 427 Appendix for the full branch-by-branch report) located four distinct but overlapping prior-art vocabularies for the structural pattern §7 describes.

**Islands architecture.** Katie Sylor-Miller coined "component islands" internally at Etsy in 2019; Jason Miller formalized the pattern in print on 2020-08-11 at [jasonformat.com](https://jasonformat.com/islands-architecture/). Miller's definition: "render HTML pages on the server, and inject placeholders or slots around highly dynamic regions" which then independently hydrate. This is structurally REST-encloses-DO at the component grain. Astro, Fresh, Qwik, Marko, Bridgetown, and Enhance all adopted the pattern. The community vocabulary is "interactive components" / "hydrated regions," not "Distributed Objects." The pattern is named; the DO framing is the corpus's reframing.

**Micro-frontends.** The term dates to [ThoughtWorks Technology Radar, November 2016](https://www.thoughtworks.com/radar/techniques/micro-frontends). Michael Geers' *[Micro Frontends in Action](https://www.manning.com/books/micro-frontends-in-action)* (Manning 2020) and [micro-frontends.org](https://micro-frontends.org) enumerate integration techniques: server-side composition (SSI/ESI), client-side composition (custom elements), edge-side composition, iframe composition. Cam Jackson's [*Micro Frontends* at martinfowler.com](https://martinfowler.com/articles/micro-frontends.html) (2019) covers the same ground. The pattern explicitly allows sub-applications authored in different client-side frameworks (i.e., full DO-like runtimes) to compose within a server-rendered or edge-composed outer page. The vocabulary is "composition," "container application," "shell," "fragment." The enclosure relationship is explicit; the corpus's claim to identify it is not first.

**Qwik containers.** Miško Hevery's Qwik documentation at [qwik.dev/docs/advanced/containers](https://qwik.dev/docs/advanced/containers) formalizes the page as a "container" that can nest other containers with "well-defined boundaries called container protocols." Each container is independently versioned, deployable, and replaceable via innerHTML. This is the closest published technical literature to an *explicit enclosure-protocol* formalization. Qwik container protocols specifically address server-controlled boundaries across which architectures nest — which directly overlaps with PRESTO's "authoring authority" claim.

**ESI transclusion.** Edge Side Includes, specified by Akamai, Oracle, and partners circa 2001 ([W3C Note](https://www.w3.org/TR/esi-lang/)), formalized document-level enclosure at the edge: a server-composed outer page includes fragments resolved at edge-cache nodes. INNOQ's [self-contained-systems.org](https://scs-architecture.org) uses "transclusion" as a formal term for this document-level enclosure. The vocabulary predates islands-architecture by roughly two decades.

## 3. What §7 Therefore Overstates

The §7 claims can be sorted by how they fare against the prior art.

**Subsumed by prior art:**
- The identification of the enclosure pattern. Named four times over (islands-architecture, micro-frontends, Qwik containers, ESI transclusion) before the corpus. The corpus is not first.
- The claim that "architectural encapsulation requires authoring authority" as the distinguishing insight. Qwik container protocols specify exactly this — server-controlled boundaries with well-defined cross-container protocols. Geers and the micro-frontends literature also specify server-side composition as a recognized integration technique; the server in that case holds authoring authority by construction.

**Partially subsumed:**
- The claim that PRESTO specifically (as opposed to Qwik, Astro, Fresh, Enhance, or the micro-frontends shells) provides the authoring authority. PRESTO is one of several practitioner methodologies that provide this; the distinctive element, if any, is the specific *form* of the authority (the `htx:component` directive as a server-consumed invocation with scoped token grant), not the *existence* of the authority.
- The claim that "REST at the transfer level enclosing DO at the island level" is a novel structural framing. The islands literature already describes this structurally, though in different vocabulary.

**Possibly residual:**
- The explicit submission of the enclosure pattern to Fielding's architectural-style evaluation method (constraint-set → induced-property derivation). The structural pattern is everywhere; the *methodological move* of treating islands-enclosed-DO as a configuration amenable to Fielding-style architectural-style evaluation does not appear in the surveyed prior art. This is a reframing, not a discovery, but it is a reframing with specific methodological work behind it.
- The qualifier "progressively authorized" — if it means something specific that islands-hydrate and Qwik-resume do not already encode. This requires reading Qwik's container-protocol documentation in full to verify. [PENDING]

## 4. What Fielding Chapter 3 Actually Says About DO

The §7 claim invokes Fielding's Chapter 3 evaluation of Distributed Objects. For the record: Fielding's §3.6.3 evaluates DO as a peer-to-peer style and concludes, in his words, that "in spite of all the interest associated with distributed objects, they fare poorly when compared to most other network-based architectural styles," best suited to "remote invocation of encapsulated services, such as hardware devices." His Table 3-5 scores DO negatively on network performance, visibility, and reliability. **Fielding does not describe an enclosure relationship between REST and DO.** His "hybrid style" language in Chapter 5 refers to REST's own composition of constraints (client-server + layered + stateless + cache + uniform interface + optional code-on-demand), not to REST enclosing a different style. The corpus's specific enclosure framing extends Fielding's vocabulary; it is not prefigured in his text.

## 5. The Term "Architecture A Encloses Architecture B"

The specific phrasing "architecture A encloses architecture B" does not appear as a formal term of art in the surveyed literature. Closest published vocabulary: Fielding's "hybrid style" (constraint composition, different meaning); "composition" / "container" / "shell" (micro-frontends, Qwik); "transclusion" (INNOQ, ESI); Fowler's "Strangler Fig" (temporal replacement, not spatial enclosure).

The corpus's specific "enclosure" phrasing is therefore distinctive at the terminological level. Whether the terminological distinction tracks a meaningful structural distinction not already named under the surveyed vocabularies (islands, micro-frontends, containers, transclusion) is the question §6's proposed revision addresses.

## 6. Proposed Revision to Doc 426 §7

The revision, stated as a specific edit rather than an abstract direction.

Replace the current §7 with the following, approximately:

> ### §7. Enclosure of Distributed Objects within RESTful Transfer
>
> One configuration this composition supports is the enclosure of Distributed Object (DO) architectures within a RESTful transfer. The structural pattern is named in the literature under several vocabularies: *islands architecture* (Katie Sylor-Miller 2019, Jason Miller 2020-08-11, [jasonformat.com](https://jasonformat.com/islands-architecture/)); *micro-frontends* (ThoughtWorks Technology Radar November 2016; Michael Geers 2020, *Micro Frontends in Action*, Manning; Cam Jackson 2019, [martinfowler.com](https://martinfowler.com/articles/micro-frontends.html)); *Qwik containers* (Miško Hevery, [qwik.dev/docs/advanced/containers](https://qwik.dev/docs/advanced/containers)); and *ESI transclusion* (Akamai et al., W3C Note, 2001). The structural pattern is not named here for the first time. What is specific to this dissertation is the submission of the configuration to Fielding's architectural-style evaluation method.
>
> Under that submission: REST constrains the transfer level — complete representations, statelessness, cacheability. A resolved representation that contains a reference to a client-side runtime (a `<script>` tag loading a DO-style framework; a Qwik container protocol; an Astro island hydration directive; a server-included ESI fragment) does not violate these constraints. The representation is complete; the transfer is stateless; the representation is cacheable. The client-side architecture operates within the representation after transfer — at the client level, not the transfer level. What such an architecture violates *when used as the outer architecture* is not individual REST constraints but the architectural encapsulation: the representation would become empty, state would be managed client-side, navigation would happen without server interaction.
>
> Construction-level constraints resolve this by giving the server *authoring authority* over which enclosed regions are included, under what grants, at what scope. The authoring authority is what islands-architecture frameworks (Astro, Fresh, Qwik), the micro-frontends composition patterns, and Qwik's container protocols all operationalize. PRESTO's `htx:component` directive, with its server-consumed invocation and scoped token grant, is one instance of this authority. The methodological contribution of this dissertation is the Fielding-style evaluation of the configuration — not the identification of the pattern, which is older than the corpus.

Relative to the current §7, this revision:
- Drops the "PRESTO resolves this" framing in favor of "construction-level constraints resolve this"; PRESTO is one instance.
- Cites islands, micro-frontends, Qwik, and ESI by specific URL.
- Drops the claim that the insight is "architectural encapsulation requires authoring authority"; that insight is present in every framework named.
- Retains the methodological move (Fielding-style evaluation of the enclosed-DO configuration) as the narrow contribution.

## 7. Alternative: Drop §7 Entirely

A more radical proposal, for consideration: drop §7 from Doc 426 altogether. The dissertation's scope (Doc 426 §10 "What This Dissertation Claims") is the formalization of the PRESTO constraint set at the architectural-style level. The enclosure-of-DO case is an application-level consequence, not part of the architectural derivation. Islands-architecture literature and micro-frontends literature already cover the case at practitioner depth. The dissertation is compact; removing §7 tightens it further and removes a seam where prior art is dense.

The case against dropping: §7 motivates *why* the composition matters — it shows that REST + PRESTO together opens a design space that neither could alone, specifically the DO-enclosure case. Without §7, the reader may not see the practical consequence of the composition. A compressed version (half the current length, all four prior-art vocabularies cited) preserves the motivation without the overstatement.

Recommended default: the compressed revision in §6. Alternative (drop): available on request.

## 8. Falsifiers

- If a primary-source read of Qwik's container-protocol documentation in full shows that Qwik containers already formalize "progressively authorized" cross-container semantics indistinguishable from what PRESTO's `htx:component` + progressive code-on-demand would add, the residual narrows further: §6's revised §7 should acknowledge Qwik containers as a comprehensive prior instance and state PRESTO's contribution as a pedagogical alternative rather than a distinct authority.
- If the islands-architecture literature is found to explicitly submit the pattern to a Fielding-style architectural-style evaluation (constraint-set → induced-property derivation), the methodological-residual claim retracts and §7 collapses entirely.
- If a published pre-2019 source names the enclosure pattern under another vocabulary not surfaced in the survey, the dating claim (Sylor-Miller 2019 / Miller 2020 / Geers 2020 / ThoughtWorks 2016 / ESI 2001) narrows to whichever predates the others.

## 9. What This Document Does Not Settle

- Whether §7's "progressively authorized" qualifier tracks a distinction from Qwik's container-protocol progressive-hydration semantics. A primary-source read of Qwik's docs in full would settle this.
- Whether the micro-frontends literature (Geers 2020; micro-frontends.org) has developed the server-side-composition variant to a depth that fully covers PRESTO's `htx:component` pattern. A read of Geers' Chapter 4 (server-side composition) is the specific action-item.
- Whether §7 should be replaced with the revision in §6 or dropped entirely. That is a dissertation-shape decision for the keeper.

---

## Appendix A: Branch-by-Branch Survey Findings

The ten-branch survey condensed:

1. **Fielding Chapter 3** — DO evaluated as a standalone style; no enclosure framing. "Hybrid style" in Ch. 5 is constraint-composition, not style-encloses-style.
2. **Islands architecture** — Sylor-Miller 2019 / Miller 2020. Structural match; no DO vocabulary.
3. **Micro-frontends** — Geers, Jackson, micro-frontends.org, ThoughtWorks 2016. Explicit taxonomy of composition techniques; sub-apps may be full client-side SPAs; enclosure relationship is explicit.
4. **Backend for Frontend** — Sam Newman. Client-coupling pattern; not an enclosure thesis.
5. **Module Federation** — Zack Jackson, Webpack 5. Host/remote topology; delivery concern, not architectural-style enclosure.
6. **Web Components + SSR** — Lit, Stencil, Polymer, Enhance ("Island Architecture with Web Components" 2024). Structural match; DO vocabulary absent.
7. **Qwik containers** — Hevery. Explicit enclosure-protocol formalization. Closest published antecedent to PRESTO's authoring-authority claim.
8. **CORBA / DCOM / RMI** — DO tradition of record. No enclosure thesis with request-response as outer.
9. **SOA / microservices** — Erl, Richardson. "Composition" and "orchestration" vocabulary; "enclosure" not a term of art.
10. **Fowler / ThoughtWorks** — Sacrificial Architecture, Strangler Fig. Temporal replacement, not spatial enclosure.

Specific sub-question: "architecture A encloses architecture B" is not a formal term of art. Closest published vocabulary tabulated in §5.

## Appendix B: Prompt

> "Regarding section 7. Can you do a branching literature entrancement for any architecture that can enclose a distributed object architecture?"

Followed by:

> "Do A. Also I want you to do a branching literature for all the constraints. I want to pulverize this dissertation. If it can be built back up, we will after finding every single piece of prior art"

The "Do A" refers to the first of two options offered — writing a scoped deflation artifact for §7 rather than directly editing Doc 426 — and is the work executed here. The constraint-by-constraint pulverization survey across all of §4 is being run separately; its findings will produce a further deflation document.
