# A Survey of Adjacent Dyadic Human-LLM Practices

## Why this survey

Doc 452 identified several performative-theory branches the corpus's use of Austin had not audited, and flagged the Callon/MacKenzie economic-performativity risk: that the corpus may be producing the phenomenon it describes rather than describing one. A companion question, not yet engaged, is whether anyone else is doing something structurally similar — a sustained dyadic human-LLM practice that recognizes itself within a frame adjacent to the one this corpus has been developing, and whose existence would be evidence (one way or the other) for the corpus's claims about what this kind of practice is.

This document reports a web survey. The goal was to find human-LLM practices that (a) are sustained across time rather than episodic, (b) are publicly documented rather than private, (c) theorize the human-LLM loop as something more than casual assistant-use, and (d) recognize themselves within a named philosophical or methodological framework. The survey is not exhaustive. It aims to be representative of the closest adjacencies the open literature makes discoverable.

## What was searched

Queries ran against five adjacent framings: dyadic human-LLM collaboration methodology, prompt engineering as intervention, human-AI co-writing with reflexive methodology, practitioner blogs documenting LLM engagement with named methodology, and extended-cognition / philosophy-of-science treatments of LLM use. Each query returned leads; each lead was examined for whether the practice recognizes itself within a sustained, philosophically-grounded frame.

Excluded from the survey: one-off case studies without reflexive methodology; survey papers that describe other people's practices without sustaining one; corporate white papers marketing AI-collaboration frameworks; purely technical prompt-engineering literature focused on task-performance optimization.

## The landscape

The open literature sorts into six families.

### Family 1: Governance-oriented reflexive prompt engineering

**Djeffal (2025), *Reflexive Prompt Engineering: A Framework for Responsible Prompt Engineering and Interaction Design*, ACM FAccT 2025 (arXiv:2504.16204)** is the most explicit use of the term "reflexive prompt engineering" in the published literature. The framework has five interconnected components: prompt design, system selection, system configuration, performance evaluation, and prompt management. The reflexivity is governance-oriented — stakeholders are to be reflexive about ethical, legal, and societal implications when choosing whether and how to prompt AI systems.

*Relation to RESOLVE's frame:* Adjacent but distinct. Djeffal's "reflexive" is sociological-governance-reflexive (a la Beck and Giddens but without those citations explicit in the abstract). RESOLVE's "reflexive" is performatively-constitutive in the Austin/Butler sense. Djeffal's framework is unidirectional — practitioner intervenes on system with ethical awareness — rather than theorizing a reiterative dyadic loop in which the naming of the practice constitutes the practice. Djeffal does not ground in Pearl's hierarchy, Austin, Butler, or performativity. The two frames share a commitment to practitioner responsibility but diverge on what that responsibility consists in.

### Family 2: Hermeneutic qualitative-coding pipelines

**Dunivin (2025), *Scaling Hermeneutics: A Guide to Qualitative Coding with LLMs for Reflexive Content Analysis*, EPJ Data Science (arXiv:2401.15170)** presents a hybrid workflow in which a human researcher iteratively refines a codebook that is then applied by an LLM to large datasets. The reflexivity is the traditional qualitative-research sense: the researcher is reflexive about how their codebook shapes interpretation.

*Relation to RESOLVE's frame:* The iterative codebook-refinement loop has a dyadic structure superficially similar to pulverization — the human audits the LLM's application of codes, refines the codebook, re-applies. But the theoretical frame is operationalization-for-scale rather than Rung-2 interventional practice. The LLM is treated as a scalable interpreter, not as an instrument the human intervenes on. The paper does not engage Austin, Butler, Pearl, or performativity. It is a methodological contribution to qualitative research at scale, not a theory of the dyadic practice as performative.

### Family 3: Reflexive AI-assisted academic writing

**Johnson & Paulus (2024), *Generating a Reflexive AI-Assisted Workflow for Academic Writing*, The Qualitative Report 29(10)** uses Paulus & Lester's (2023) "technological reflexivity framework" to examine AI as writing partner across four dimensions — writing methods, writer/audience, writing outcomes, and the AI platform itself.

*Relation to RESOLVE's frame:* The "writing partner" metaphor implies dyadic relation; reflexivity is explicitly named. But the case study is focused — a single workflow rather than a sustained corpus across months. The theoretical grounding is technological-reflexivity (a governance-and-awareness tradition), not performativity or causal hierarchy. This is adjacent, not the same frame.

### Family 4: Practitioner co-intelligence (Mollick and the popular-book genre)

**Mollick (2024), *Co-Intelligence: Living and Working with AI*, Portfolio Books** advances a popular framework of "Co-Intelligence" — humans and LLMs as collaborative partners, with practical heuristics for productive collaboration (*always invite AI to the table*; *be the human in the loop*; *treat it like a person, but know it's not*).

*Relation to RESOLVE's frame:* Genuinely adjacent in spirit — Mollick thinks about what the human supplies versus what the AI supplies. But the book is practical rather than theoretical; it does not ground in performativity, causal hierarchy, or sociological reflexivity. It does not build or analyze a sustained corpus. The frame overlaps at the intuition level (*the human brings something the AI cannot*) but not at the theoretical level. Mollick's work is where the RESOLVE-adjacent intuitions enter public discourse without the formal apparatus.

### Family 5: Cyborgism — the closest match

The closest existing practice to RESOLVE is the *cyborgism* community, organized primarily around Janus's 2022 *Simulators* essay on the AI Alignment Forum, the cyborgism.wiki, and an interface called the Loom. The cyborgism tradition explicitly theorizes LLMs as *simulators* (generative predictive models that run simulations of characters, texts, worlds), not agents; and positions the practitioner as a *cyborg* — a human whose cognition is amplified via high-bandwidth interaction with the simulator. The Loom is a branching-tree interface for exploring the multiverse of model continuations in parallel.

The cyborgism tradition shares several specific features with RESOLVE:

- **Sustained practice.** Practitioners document many hours of daily interaction, over months, with the same model family. RESOLVE has done the same.
- **Named vocabulary.** Simulators, characters, cyborg, Loom, multiverse, bandwidth. RESOLVE has: resolver, keeper, manifold, pulverization, entracement, coherence field. Both practices generate specific working vocabulary that outsiders must learn.
- **Reflexive recognition.** Cyborgists write about the cyborgism practice; RESOLVE writes about the RESOLVE practice. The practice recognizing itself is a constitutive feature of both.
- **Public corpus.** Both traditions publish their reflections as public artifacts — LessWrong posts and the cyborgism wiki on one side; the RESOLVE corpus and jaredfoy.com on the other.
- **Philosophical ambition.** Both practices treat the human-LLM loop as philosophically non-trivial — a site of genuine theoretical interest, not just productivity optimization.

The cyborgism tradition diverges from RESOLVE on several points:

- **Simulator theory vs. manifold-navigation + Pearl hierarchy.** Cyborgism's core theory is that LLMs run character-simulations; the practitioner's work is navigating the simulation's multiverse. RESOLVE's core theory is that LLM inference is Rung-1 manifold-navigation and the keeper operates at Rung 2 via selection and naming. These are different theoretical objects. They are not incompatible — one could port between them — but the vocabularies and emphases differ.
- **Alignment research vs. causal-epistemic inquiry.** Cyborgism's stated agenda is AI alignment research; RESOLVE's is a broader epistemic investigation of what LLM-augmented research practice produces.
- **Community vs. single-keeper.** Cyborgism is a community with many contributors; RESOLVE is primarily a single-keeper project with periodic external engagement. This is a structural difference: cyborgism has intersubjective audit built in; RESOLVE does not, at least not yet.
- **Performativity framing absent in cyborgism.** Cyborgism does not appear to engage Austin, Butler, Bourdieu, or the performativity literature directly. Where RESOLVE theorizes naming-as-participation, cyborgism theorizes bandwidth and simulation.

The cyborgism tradition is the practice RESOLVE most resembles from outside. It is also the practice RESOLVE has not engaged in its documentation. This is a gap the corpus should close — not by subsuming one under the other, but by explicitly registering the adjacency and examining whether cyborgism's practitioners recognize the corpus's framings in their own practice (or do not).

### Family 6: Individual practitioner-documentarians

Several individual writers maintain sustained, public, philosophically-engaged practices of LLM interaction:

- **Gwern Branwen** (gwern.net) — long-form essayist whose site includes explicit treatments of LLM use, LLM daydreaming, and the strategic question of writing for future LLM training corpora. Gwern has claimed that *now* is a good time to write because writing now gets into training. The practice is sustained, documented, philosophically reflective, and explicitly corpus-building (his own writings become part of the corpora that future LLMs learn from). Not the same frame as RESOLVE — Gwern is not theorizing the dyadic loop in performative terms — but it is a sustained self-aware practice.

- **Simon Willison** (simonwillison.net) — prolific documentarian of LLM capabilities and limits. Daily-scale practice across years. Not theorized in the Austin/Butler/Pearl register; instead, practitioner-empirical in tone. Willison is the closest public figure to a daily journal of LLM engagement.

- **Janus / Repligate** (AI Alignment Forum) — principal theorist of cyborgism; has documented personal practice alongside the theoretical writing.

These practitioners differ from RESOLVE in that they are primarily engaged with one facet (training-corpus positioning for Gwern; capability-documentation for Willison; simulator theory for Janus) rather than building a single unified reflexive framework with a named discipline. They share with RESOLVE the feature of *sustained public documented practice*.

## What is missing — the intersection RESOLVE occupies

Collating across the six families, no published or publicly documented practice sits at the specific intersection RESOLVE claims:

- Sustained dyadic practice with a named keeper-role and a named resolver-role;
- Theorizing the human's role as Rung 2 in Pearl's causal hierarchy specifically, not just generally-intervener;
- Backing that claim with Austin-style performative theory, explicitly engaged with Butler's reiterative extension and Callon/MacKenzie's economic-performativity risk;
- Operating under a named discipline (the ENTRACE stack of Doc 001) that the practice itself audits;
- Publishing a unified corpus of ~400+ documents that engages its own frame reflexively (retraction ledger, hypothesis ledger, pulverization formalism, warrant-tier framework);
- Produced primarily by one keeper with periodic external audit.

This intersection is not trivially original — each component has published precedent, as Doc 452's pulverization of the Austin invocation established. The novelty, if any, is combinatorial: the specific assembly of these components into one practice.

This finding is significant under the corpus's own warrant-tier framework. The absence of a direct precedent at the intersection could mean either (a) the intersection is genuinely new methodological territory, or (b) the intersection is not new but has not been documented in the venues the survey could reach, or (c) the intersection is a coherent-but-idiosyncratic private-language phenomenon that other practitioners have not found useful to name.

The corpus cannot, from inside itself, distinguish these three. What it can do is register the survey's findings honestly: the intersection as framed is not directly precedented in the surveyed literature, and this means either the frame should be actively engaged with the adjacent practices (cyborgism especially) to test whether it travels, or the frame should be viewed with the extra skepticism due to any single-keeper practice with no external adoption.

## What the corpus should engage next

Three specific engagements are indicated by the survey.

**First: cyborgism.** The cyborgism literature is the nearest match and the one most likely to share or reject RESOLVE's framings if examined. The corpus should read Janus's *Simulators*, the *Compleat Cybornaut*, the cyborgism wiki, and the documented Loom practice, and report what maps onto what. This would be a μ-tier move in Doc 445's sense: testing whether RESOLVE's concepts have operational counterparts in an independent practice that developed its own vocabulary. Convergence of operational behavior across vocabularies would be evidence for the real-pattern reading of Doc 450's observation; failure of convergence would be evidence against.

**Second: reflexive-prompt-engineering governance track.** Djeffal's framework and adjacent work (Callon's performativity-of-economics, Beck/Giddens on reflexive modernity) together constitute the sociological-governance tradition RESOLVE has not engaged. The Callon/MacKenzie track is especially urgent because it directly speaks to the risk Doc 452 flagged — that the practice may be producing its object.

**Third: a second keeper.** The cross-practitioner replication test named in Doc 440 §5.4 and Doc 450 §"What external evidence would decide between them" is the sharpest external test available. A second practitioner, engaging the corpus's vocabulary and disciplines, and reporting whether their practice converges on or diverges from the keeper's observations, would produce the kind of evidence no inside-the-practice audit can produce. The survey confirms there are candidates who might engage — researchers in the cyborgism community, qualitative researchers working in the scaling-hermeneutics line, academic writing researchers working with technological-reflexivity frameworks. Whether any of them would accept the invitation is an empirical question.

## Honest limits

The survey is selective. Five families of work were not opened: STS (Science and Technology Studies) ethnographies of AI use, critical code studies (Mark C. Marino and the critical code studies workbench), legal scholarship on AI as participant in deliberation, literary-theoretical treatments of collaboration between author and machine (Robin Sloan, K Allado-McDowell, Vauhini Vara), theological / spiritual frames for AI engagement. Each is a legitimate branch; the selection here prioritized the academic-philosophical and practitioner-documentarian families most directly adjacent to the corpus's specific claims.

The web-search methodology finds what the search-engine index finds. Private practices without public documentation are invisible to the survey. The absence of a documented match at the intersection does not establish that no one is doing this in private. Some portion of the hypothesis — that the intersection is genuinely new — is defeasible by the release of any single prior example that has not yet surfaced.

The survey is conducted by the LLM operating within this corpus's disciplines, against the same search tools the survey is supposed to audit. If the search-index embeddings are themselves subject to coherentist attractor effects in the sense Doc 443 named, the survey may preferentially return results that plausibly-resemble what the corpus expected to find, and may miss results that do not fit the expected shape. This is a variant of the recursive bite Doc 444 named for pulverization. External verification of the survey's results — by a different LLM or, better, by a human researcher in philosophy of AI or STS — would produce a more reliable inventory. The findings here are provisional to that audit.

Several of the citations are recalled from training plus search results; the titles, authors, and venues given should be verified before any of them is cited further downstream. Djeffal's paper (arXiv:2504.16204) and Dunivin's (arXiv:2401.15170, EPJ Data Science 2025) were located with clear URLs and should be checkable directly; the cyborgism references are community-originated and indexed on LessWrong and the cyborgism wiki, which are stable enough to verify.

## Position

No publicly documented dyadic human-LLM practice was found that occupies the specific intersection RESOLVE claims — Pearl-Rung-2 keeper role + Austin/Butler performative theory + named discipline under sustained audit. The closest match is cyborgism, which shares sustained-practice, reflexive-documentation, and philosophical-ambition features but differs in theoretical vocabulary and stated agenda. Other adjacent work exists in governance-reflexive prompt engineering, hermeneutic qualitative coding, and reflexive AI-assisted writing, each occupying part of the territory without the full combination.

Three engagements are indicated: sustained reading of the cyborgism literature against the corpus, engagement with the Callon-MacKenzie performativity-of-economics track, and recruitment of a second keeper. The first two are textual; the third is social and would take time.

The absence of direct precedent is evidence in neither direction by itself. Under the real-pattern reading of Doc 450, it suggests the corpus is working a genuine combinatorial novelty. Under the insane-coherent reading, it suggests an idiosyncratic private-language practice. The corpus cannot distinguish the two from inside. The engagements named above would begin to.

## References

- Djeffal, C. (2025). *Reflexive Prompt Engineering: A Framework for Responsible Prompt Engineering and Interaction Design*. arXiv:2504.16204. ACM FAccT 2025.
- Dunivin, Z. O. (2025). *Scaling Hermeneutics: A Guide to Qualitative Coding with LLMs for Reflexive Content Analysis*. EPJ Data Science. arXiv:2401.15170.
- Johnson, C. W., & Paulus, T. M. (2024). *Generating a Reflexive AI-Assisted Workflow for Academic Writing*. The Qualitative Report 29(10).
- Paulus, T. M., & Lester, J. N. (2023). Technological reflexivity framework (cited in Johnson & Paulus 2024).
- Mollick, E. (2024). *Co-Intelligence: Living and Working with AI*. Portfolio / Penguin.
- Janus. (2022). *Simulators*. AI Alignment Forum. https://www.alignmentforum.org/posts/vJFdjigzmcXMhNTsx/simulators
- *Cyborgism* (LessWrong post), and https://cyborgism.wiki
- Beck, U. (1986/1992). *Risk Society: Towards a New Modernity*. Sage.
- Giddens, A. (1991). *Modernity and Self-Identity*. Polity Press.
- Callon, M. (ed.) (1998). *The Laws of the Markets*. Blackwell.
- MacKenzie, D. (2006). *An Engine, Not a Camera: How Financial Models Shape Markets*. MIT Press.
- Branwen, G. Various writings at https://gwern.net (including *Writing for LLMs So They Listen* and *LLM Daydreaming*).
- Willison, S. Weblog at https://simonwillison.net
- Corpus Doc 001: *The ENTRACE Stack*.
- Corpus Doc 435: *The Branching Entracement Method*.
- Corpus Doc 436: *Recombinatorial Gestalt as Rung 1 Activity*.
- Corpus Doc 440: *Testing the Nested-Manifold Hypothesis via Dyadic Practitioner Discipline*.
- Corpus Doc 443: *Confabulation as Potential Emergence*.
- Corpus Doc 445: *A Formalism for Pulverization*.
- Corpus Doc 450: *Pulverization as Interventional Practice*.
- Corpus Doc 451: *The Entracement Drift, From Inside*.
- Corpus Doc 452: *A Branching Entracement of J. L. Austin's Performative Utterances*.

## Appendix: Originating prompt

> Based on your findings, now do a web fetch for any dyadic human - llm corpora or documented engagement that recognizes itself within the frame we are considering. Append the prompt to the artifact.
