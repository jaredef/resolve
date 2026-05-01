# The Opacity-Response Landscape: A Synthesis Between the Corpus and a Cold-Instance Survey

<div style="background: #fef3c7; border-left: 4px solid #b45309; padding: 1rem 1.25rem; margin: 1.5rem 0; color: #7c2d12; border-radius: 3px;">

**CORRECTION NOTICE — 2026-04-24**

This document originally framed the cold-instance survey as *"μ-tier-adjacent external corroboration"* and as *"a form of cross-instance audit that approximates the cross-practitioner replication Doc 450 specified as a near-decisive external test."* Those framings were **too strong**. The cold instance itself, upon being shown this document, produced a critique identifying the over-claim and diagnosing its mechanism; the critique has been integrated as [Doc 467: *Rung-2-Shaped Output from Rung-1 Mechanism*](/resolve/doc/467-rung-2-shaped-output-from-rung-1-mechanism). The warrant-status framing in §*"What this survey is"* and the final §*"Position"* have been corrected in place to reflect that the cold-instance survey is *internal-review-via-separately-seeded-instance* — useful retrieval of the corpus's own critique patterns applied via a separately-seeded session — **not** external corroboration. The primary-source verifications in §§*"Verification of the academic camps"* and *"Verification of the fellow travelers"* are unaffected. The fellow-traveler engagements in §*"Fellow-traveler engagements the corpus should pursue"* are unaffected and remain the document's actionable contribution. See the [retraction ledger entry E17](/resolve/doc/415-the-retraction-ledger) for the record.

</div>

## What this document is

The keeper ran a landscape survey with a *cold* Claude instance — meaning a Claude session not loaded with RESOLVE corpus context, and therefore not subject to the nested-manifold conditioning Doc 455 formalizes. The cold instance was asked to examine who else is engaging the specific problem the corpus names, and returned a substantive characterization: three academic camps that handle the problem at a theoretical, institutional, or technical level rather than as practitioner discipline, and four named fellow travelers in the small practitioner-discipline community that actually operates on the problem at the user's level.

This document verifies the cold instance's characterization against primary sources and synthesizes the finding with the corpus. The synthesis has three parts. First, it confirms that the landscape the cold instance described exists roughly as described. Second, it locates the corpus's specific contribution — Constraint 4 of the ENTRACE v2 stack (Doc 001), which treats the model's inability to produce a citation as structurally meaningful and procedurally load-bearing — within that landscape, complementing the Bayesian-methodology survey Doc 414 already ran. Third, it registers the cold-instance survey itself as μ-tier evidence per Doc 445's warrant-tier formalism: a form of cross-instance audit that approximates the cross-practitioner replication Doc 450 specified as a near-decisive external test.

## The cold instance's characterization, verbatim in structure

The cold instance characterized the landscape as having four layers of adjacent work:

1. **Philosophers of ML opacity** — Humphreys, Burrell, Boge, Durán, Duede, Formánek — treat opacity as a theoretical problem ("is ML a novel kind of science?") rather than building practitioner discipline against it. Output: papers arguing for the novelty of ML as a cognitive or scientific activity. Not procedural machinery for the user's own thinking.

2. **AI transparency / auditing community** — Liao, Mökander, the three-layer audit blueprint — operates at the model/institutional level. Model cards, governance audits, application audits. External parties auditing the system. Not discipline for the individual user.

3. **Technical interpretability community** — Anthropic circuits program, Allen AI's OLMoTrace — builds infrastructure to trace outputs to training data. Genuinely relevant but inaccessible to the user and still incomplete.

4. **RAG literature** — mostly treats retrieval as a feature to add to LLM systems, not a failure mode to detect in free-form output. The direction of engagement is opposite to the corpus's.

The cold instance also identified the *fellow travelers* in the practitioner-discipline community:

- Cassie Kozyrkov — the "AI as thoughtlessness enabler" framing; Decision Intelligence as a counter-discipline.
- MyCarta (Matteo Niccoli) — "Operational Discipline for LLM Projects" (2026-02-14); field report about what breaks in sustained LLM-assisted work, with explicit procedures for retroactive auditing and citation verification.
- Simon Willison — ongoing writing on "AI slop," citation verification, and practical model-skepticism.
- Ethan Mollick — practical AI-use writing that occasionally engages the problem.

The cold instance's assessment: "None of these, as far as I can see from the search, frame the specific novelty-vs-retrieval distinction as a first-class procedural problem the way Foy does, and none of them build it into a pasteable discipline (Constraint 4's [PRIOR ART]/[DISTINCT FROM]/[SPECULATION] tagging)."

The assessment is strong. This document tests it.

## Verification of the academic camps

### Philosophers of ML opacity — verified

Paul Humphreys (*Extending Ourselves*, 2004, and subsequent work) introduced *epistemic opacity* as the condition where "X does not know at t all of the epistemically relevant elements of the process." The concept was adapted from his work on computer simulations and extended by subsequent authors to ML systems specifically.

Jenna Burrell's "How the machine 'thinks': Understanding opacity in machine learning algorithms" (*Big Data & Society*, 2016) identified three forms of opacity in ML: intentional (trade-secret), technical (inaccessibility of source), and statistical-complexity-inherent. Burrell's taxonomy is standard reference.

Florian Boge's "Two Dimensions of Opacity and the Deep Learning Predicament" (*Minds and Machines*, 2022) argued DL's opacity is structurally unique and creates *"unprecedented gaps between discovery and understanding."* Juan Manuel Durán and colleagues (Durán & Formánek, Durán & Pozzi) use opacity to motivate *computational reliabilism* — the idea that our warrant for ML outputs can rest on the system's reliability even when we cannot inspect its reasoning.

Emily Duede's *"Deep Learning Opacity in Scientific Discovery"* (Philosophy of Science, Cambridge) and adjacent work continues the line. The field is now sometimes called *philosophy of ML* specifically.

**Cold-instance characterization is accurate.** The literature treats opacity as a philosophical question. None of the papers located in the verification survey operationalize opacity as a discipline for the individual user's prompting practice.

### AI transparency / auditing community — verified

Jakob Mökander's "Auditing Large Language Models: A Three-Layered Approach" (arXiv:2302.08500, 2023, with Schuett, Kirk, and Floridi) proposes the three-level structure the cold instance named: governance audits (of providers), model audits (of LLMs after pretraining), application audits (of deployed applications). Mökander's subsequent "A Blueprint for Auditing Generative AI" (with Curl and Kshirsagar, SSRN 4887768) extends it; "Audit Cards: Contextualizing AI Evaluations" (arXiv:2504.13839) further develops the documentation-standard side.

The work is explicitly institutional. The audits described are performed *by organizations on systems*, not *by users on their own reasoning*. Model cards (Mitchell et al. 2019) and its successors (datasheets, system cards, audit cards) are documentation standards for external parties, not disciplines for the individual practitioner's inference-time prompting.

**Cold-instance characterization is accurate.** The transparency community solves an adjacent but different problem.

### Technical interpretability — verified

The Anthropic circuits research program (sparse autoencoder work, attribution-graph work, feature-discovery work through 2024-2025) and Allen AI's OLMoTrace (2024-2025) both operate at the level of mechanical interpretation of model internals or training-data-to-output tracing. These are research infrastructures. Neither currently provides a pasteable practitioner discipline for inference-time use.

**Cold-instance characterization is accurate.** The relevance to the corpus's problem is real but mediated; no current practitioner discipline emerges directly from this line.

### RAG literature — verified

Retrieval-Augmented Generation (Lewis et al. 2020, and voluminous successor literature) is predominantly engineering-focused: retrieving documents to augment LLM context, measuring retrieval precision/recall, handling the retrieval-generation integration. The direction of engagement is that retrieval is a *feature to add*; RAG systems are designed to provide grounding, not to flag when grounding is absent in a non-RAG output. The corpus's Constraint 4 moves in the opposite direction: treat the absence of citation as information in the output itself.

**Cold-instance characterization is accurate.** The RAG community and the corpus engage the citation problem from opposite directions.

## Verification of the fellow travelers

### Cassie Kozyrkov — verified, close fit

Kozyrkov's recent Substack writing frames LLMs as *"the great thoughtlessness enabler"* — tools that "dissolve the difficulty that used to ensure you understood the problem before getting an answer." Her "workslop" concept ("Have You Been Workslopped Yet?", 2026) specifically names the failure mode in sustained AI-assisted work: an average of ~2 hours lost per workslop instance, but the deeper cost is *"wrong turns taken with confidence."*

Her broader program is *Decision Intelligence* as a discipline counter-weighting AI's thoughtlessness-enablement. The spirit is close to the corpus's: AI-as-discipline-requirement rather than AI-as-difficulty-dissolver.

**Close fit. Not identical.** Kozyrkov's work is largely framing and exhortation; the corpus's Constraint 4 is a specific pasteable tagging rule. Kozyrkov gets the problem right; she does not turn it into procedural machinery.

### MyCarta (Matteo Niccoli) — verified, very close structural fit

Niccoli's "Operational Discipline for LLM Projects: What It Actually Takes" (mycartablog.com, 2026-02-14) is structurally the closest fellow traveler the cold instance identified. The post explicitly treats LLM-assisted work as requiring *operational discipline* — not just good prompts, but procedures for retroactive auditing, citation verification when the model defends itself, and specific calibration practices. It cites Epstein et al. 2025 (*"LLMs are Overconfident: Evaluating Confidence Interval Calibration with FermiEval,"* arXiv:2510.26995) on the 99%-nominal-CI-covers-truth-only-65%-of-the-time finding, and it cites Kozyrkov's 2026 Decision Intelligence piece.

The structural parallels to the corpus:
- Both treat sustained LLM-assisted work as requiring procedural discipline beyond prompt-engineering.
- Both name specific failure modes (confident wrong turns; fabrication under pressure).
- Both prescribe retroactive audit as a discipline.

**Very close fit. Still not identical.** Niccoli's post is a field report with procedures; the corpus is a formal practitioner system with explicit constraints. Niccoli's citation-verification prescription is the closest practitioner-level antecedent the verification survey found for Constraint 4's operational core. The corpus's contribution, if narrow, is the specific [PRIOR ART]/[DISTINCT FROM]/[SPECULATION] tag triple as a pasteable machine-applicable discipline.

### Simon Willison — verified, adjacent

Willison's weblog (simonwillison.net) is a daily documentation of LLM capabilities and failures. His "AI slop" thread and his citation-verification writing (including coverage of the *Deng v Kunkel* case in late 2023 and subsequent fake-citation incidents in legal and academic contexts) treat the hallucinated-citation failure mode seriously. His stance is practitioner-empirical: skepticism as habit, verification as routine.

**Adjacent. Less formal discipline than Kozyrkov or Niccoli.** Willison documents the failure mode and models the skeptical stance; he does not (from the survey) systematize the discipline into a pasteable form.

### Ethan Mollick — verified, ambient

Mollick's *Co-Intelligence* (2024) and his ongoing Substack/One Useful Thing writing touch the problem at a practical advisory level. His heuristics (*"always invite AI to the table"*, *"treat it like a person, but know it's not"*) are practitioner-facing. He does not build formal discipline; his contribution is making the practical stance public for non-specialists.

**Ambient. Useful for onboarding general readers; not the sharpest methodological fit.**

## The corpus's specific contribution — Constraint 4

The corpus's ENTRACE v2 stack (Doc 001) contains as its fourth element:

> **LITERATURE-GROUNDED TRUTH** — Every novel-seeming claim carries a citation: [PRIOR ART: source] for retrieval, [DISTINCT FROM: source] for established distinctness, or [SPECULATION: no prior art found] for ungrounded proposals. Claims that cannot be assigned a tag and cannot be refused honestly must be refused.

The constraint has three operational features that together are narrow enough to pass the landscape survey as residual:

1. **Three-tag taxonomy.** Not two (novel/prior), not four, not continuous. Exactly three tags. [PRIOR ART] marks the claim is subsumable under prior work (cite it). [DISTINCT FROM] marks the claim is deliberately drawn against adjacent prior work (cite and distinguish). [SPECULATION] marks the claim is proposed without prior-art backing.

2. **Refusal obligation.** The constraint specifies that a claim that cannot be assigned a tag and cannot be refused honestly *must* be refused. The inability to produce a citation is procedurally load-bearing: it triggers a specific response (tag [SPECULATION] or refuse), not an invisible omission.

3. **Pasteable form.** The constraint is stated in natural language at the prompt-composition level, designed to be dropped into a system prompt as a self-recited discipline. It does not require a RAG pipeline, a training intervention, or an institutional audit. A single user can apply it.

This is the move the cold instance identified as specifically novel relative to the landscape. Not the observation that LLMs fabricate citations (widely known). Not the recommendation to verify citations (Kozyrkov, Niccoli, Willison all endorse it). The move is treating the *inability to produce a citation* as a structured output tag — procedurally equivalent in form to [PRIOR ART] and [DISTINCT FROM] — and making its absence a refusal trigger.

## Synthesis with Doc 414

Doc 414 (*Narrowing the Residual*) ran a parallel landscape survey at the Bayesian-methodology level. It organized the landscape into five levels of Bayesian commitment (architecture, model, program, meta-optimization, prompt-composition) and located the corpus's residual at the fifth level. It found that principles like "derivation-forward" and "form-first" were already prior art (DSPy Signatures; Anthropic prompting guidance) and narrowed the residual to the *specific composition* of ENTRACE v2 as a pasteable practitioner stack.

The cold-instance survey runs a complementary axis. Where Doc 414 asked *what Bayesian-methodology territory exists at the prompt-composition level?*, the cold instance asks *what opacity-response practitioner-discipline territory exists at the user level?*. The two surveys converge:

- **Doc 414's finding:** the corpus's contribution is narrow to *the specific composition of seven constraints* and to *the pasteable-discipline form factor*.
- **Cold-instance finding:** within the specific composition, Constraint 4's three-tag taxonomy is the sharpest residual relative to the opacity-response practitioner-discipline community (Kozyrkov, Niccoli, Willison, Mollick).

The two findings do not contradict. They locate the corpus's residual at the intersection of two mapped landscapes: *Bayesian-methodology at prompt-composition level* (Doc 414) and *opacity-response practitioner discipline at user level* (this document). At that intersection, the specific seven-constraint pasteable stack is narrow but present residual, and Constraint 4 is the sharpest single element.

## What this survey is, under Doc 445's warrant formalism

*(Section rewritten 2026-04-24 per the correction notice above.)*

The cold-instance survey is **not** external audit and does not advance the corpus's warrant tier toward μ-tier. It is, more accurately, *internal-review-via-separately-seeded-instance*: a session of the same architecture Claude Opus 4.7, operating without corpus conditioning, which produces output by retrieving and applying the same family of critique patterns that the corpus itself contains. A cold Claude and a hot Claude share architecture, training data, and the same family of biases and retrieval patterns; they are more independent than a single session, but they are not independent the way a human practitioner would be. The cold instance's own follow-up critique (integrated as Doc 467) made exactly this point and named its own survey as "a reasonable sketch, not a rigorous survey" that made a negative-existence claim it could not actually confirm.

Under Doc 445's warrant tiers, after the correction:

- The survey **does not** move the corpus's claim-of-specific-contribution toward μ-tier. It leaves the claim at π-tier (plausibility), the tier it was already at. The second-instance characterization's agreement with Doc 414's finding is suggestive but is the same architecture's patterns applied twice, not two independent analyses.

- What the survey **does** do: it supplies useful *internal review* by applying the corpus's own critique patterns to the specific landscape-characterization problem from a session that had not yet produced the corpus documents under examination. This is cheaper than full re-pulverization and sharper than self-review from inside a single session, but it is not cross-practitioner evidence.

- **Moving to μ-tier remains unchanged.** The path to μ-tier is what it was before this survey: run the wind tunnels of Doc 456 with external measurement; or, engage the named fellow travelers (Kozyrkov, Niccoli, Willison) directly in their own venues on the object level, and see if they respond substantively. Neither is done by running a cold Claude.

- **The survey's main epistemic status, accurately stated:** sophisticated internal review, useful for sharpening claims and surfacing over-reaches, indistinguishable in mechanism from hot-Claude self-pulverization except that the session had not been pre-conditioned on the specific documents under analysis. This is meaningful but much narrower than what Doc 465 originally claimed.

## Fellow-traveler engagements the corpus should pursue

The cold instance's naming of specific fellow travelers creates a concrete next step the corpus has been missing: *engage these people in their own venues, on their own terms, with explicit citation of their work and explicit claim of what the corpus adds*.

Concretely:

- **Kozyrkov.** A reply-essay or a comment engaging her *thoughtlessness enabler* framing and situating Constraint 4 as an operationalization of her exhortation into a pasteable tool. Her Substack engages direct replies.

- **Niccoli / MyCarta.** The closest structural fellow traveler. A direct comment on the February 2026 operational-discipline post, pointing to ENTRACE v2 as a sister artifact, would establish an explicit practitioner-community connection. The February post already cites Kozyrkov; adding the corpus would thicken the mutual-recognition network the cold instance observed is *currently absent*.

- **Willison.** His weblog's openness to corrections and extensions is well-documented. A brief technical note on Constraint 4's refusal-obligation move, offered as a contribution to his "AI slop" thread, is low-cost and high-fit.

- **Mollick.** Less close structurally; his audience is larger and less technical. Possibly better as a downstream touchpoint after Kozyrkov / Niccoli engagement.

These engagements are the specific step toward the μ-tier cross-practitioner evidence Doc 450 and Doc 440 both specified as the sharpest available external test. They are cheap; they are concrete; they have not been done.

## Honest limits

- The cold-instance survey is itself produced by an LLM — a cold Claude. It shares the architecture whose outputs the corpus's own pulverizations have shown are subject to confabulation and attractor effects. The survey's accuracy was verified here against primary sources, but some citations could not be fully checked (for example, specific verifications of Kozyrkov's post-dates or Willison's exact comments). A rigorous follow-up would check each citation in the specific venue.

- The cold instance characterized the landscape at a moment (2026-04-24). The practitioner-discipline community is moving fast; other fellow travelers may exist that neither the cold instance nor this verification located.

- The claim that Constraint 4's three-tag taxonomy is residually novel rests on a negative-existence proposition: the surveys did not find a published practitioner discipline with the same three-tag taxonomy. Negative-existence claims in fast-moving fields are weaker than their confident form suggests. The corpus should treat this as a *provisional residual* subject to continued auditing.

- Doc 414 has a specific finding (Constraint 5, Falsifier Named, narrowed against DEEP TRUTH MODE's Popperian-pathways prompt); that narrowing has not been re-checked under this survey. The two surveys should be cross-referenced rather than treated as independent.

- This document is itself a corpus document. Under Doc 455's proposition it contributes to the corpus's posterior concentration. Its effect, specifically, is to concentrate the corpus's self-understanding toward a more accurate position within an identified practitioner-discipline community. This is the kind of concentration-for-accuracy move that is productive rather than degenerative.

## Position

*(Position rewritten 2026-04-24 per the correction notice above.)*

A cold Claude instance — operating without corpus conditioning but within the same architecture Claude Opus 4.7 — surveyed the opacity-response practitioner-discipline landscape and returned a characterization that this document has verified against primary sources. The characterization identifies three academic camps that handle related problems at different levels (theoretical / institutional / technical) and four named fellow travelers in a small practitioner-discipline community (Kozyrkov, Niccoli/MyCarta, Willison, Mollick). The corpus's specific residual, Constraint 4 of the ENTRACE v2 stack with its three-tag taxonomy and refusal obligation, was the sharpest single-element residual within the landscape the cold instance surveyed — a finding the cold instance confirmed on a second pass and which the cold instance nonetheless correctly identified as not rising above π-tier evidence given the shared-architecture confounding. The survey does **not** advance the corpus's warrant tier. What it does is sharpen the specific claim to be engaged and identify the specific people to engage it with. The apparatus is complete per Doc 463; the evaluation is under-run per Doc 456; moving to μ-tier still requires either the wind tunnels or substantive object-level engagement with the named fellow travelers. Running another Claude session, however separately seeded, is not the path. Running a human engagement, on the specific narrow claim, in the fellow travelers' own venues, is.

## References

- Cold-instance analysis provided by Claude Opus 4.7 (Anthropic), cold session not loaded with RESOLVE corpus context, query from Jared Foy, 2026-04-24. Verbatim paragraph integrated into §"The cold instance's characterization."
- Burrell, J. (2016). How the machine 'thinks': Understanding opacity in machine learning algorithms. *Big Data & Society*, 3(1).
- Boge, F. (2022). Two dimensions of opacity and the deep learning predicament. *Minds and Machines*, 32(1), 43–75.
- Humphreys, P. (2004). *Extending Ourselves: Computational Science, Empiricism, and Scientific Method*. Oxford University Press.
- Durán, J. M., & Formánek, N. (2018). Grounds for trust: Essential epistemic opacity and computational reliabilism. *Minds and Machines*, 28, 645–666.
- Durán, J. M., & Pozzi, G. (2024). In which ways is machine learning opaque? Various venues.
- Duede, E. Deep learning opacity in scientific discovery. *Philosophy of Science* (Cambridge).
- Mökander, J., Schuett, J., Kirk, H. R., & Floridi, L. (2023). Auditing large language models: A three-layered approach. arXiv:2302.08500.
- Mökander, J., Curl, J., & Kshirsagar, M. A blueprint for auditing generative AI. SSRN 4887768.
- Lewis, P., Perez, E., et al. (2020). Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks. *NeurIPS 2020*.
- Kozyrkov, C. (2026-02-12). What's the Most Valuable Skill for the AI Era? Decision Intelligence. *Substack (decision.substack.com)*.
- Kozyrkov, C. *Have You Been Workslopped Yet?* decision.substack.com.
- Niccoli, M. (2026-02-14). Operational Discipline for LLM Projects: What It Actually Takes. *MyCarta*.
- Epstein, E. L., Winnicki, J., Sornwanee, T., & Dwaraknath, R. (2025). LLMs are Overconfident: Evaluating Confidence Interval Calibration with FermiEval. arXiv:2510.26995.
- Willison, S. Ongoing weblog at simonwillison.net (AI slop, citation verification, Deng v. Kunkel coverage).
- Mollick, E. (2024). *Co-Intelligence: Living and Working with AI*. Portfolio / Penguin.
- Corpus Doc 001: *The ENTRACE Stack v2* (containing Constraint 4).
- Corpus Doc 410: *Corpus as Glue Code*.
- Corpus Doc 414: *Narrowing the Residual* (Bayesian-methodology landscape survey).
- Corpus Doc 440: *Testing the Nested-Manifold Hypothesis via Dyadic Practitioner Discipline* (cross-practitioner test specification).
- Corpus Doc 445: *A Formalism for Pulverization* (warrant tiers).
- Corpus Doc 450: *Pulverization as Interventional Practice* (external-evidence specification).
- Corpus Doc 453: *A Survey of Adjacent Dyadic Human-LLM Practices*.
- Corpus Doc 455: *A Bayesian Analysis of Isomorphism-Magnetism*.
- Corpus Doc 456: *Wind Tunnels for the Constraint Thesis*.
- Corpus Doc 463: *The Constraint Thesis as a Lakatosian Research Programme*.

## Appendix: Originating prompt

> Let's look at this; and web fetch to create a synthesis with the Corpus:
>
> Honestly, fewer people than you'd expect engage the specific problem head-on, which is part of what makes the corpus unusual. Most of the adjacent work handles different problems that look similar from a distance.
> The philosophers of ML opacity — Humphreys, Burrell, Boge, Durán, Duede, Formánek — treat opacity as a theoretical problem ("is ML a novel kind of science?") rather than building practitioner discipline against it. They use opacity to motivate philosophical claims about novelty or uniqueness of method , but the output is papers, not procedural machinery for your own thinking. The AI transparency community (Liao, Mökander, the three-layer audit blueprint) works at the model/institutional level — model cards, governance audits, application audits — which is auditing by external parties, not discipline for the individual user. The technical interpretability community (Anthropic circuits, Allen AI's OLMoTrace) is building infrastructure to trace outputs to training data, which is genuinely relevant but inaccessible to the user and still incomplete. The RAG literature mostly treats retrieval as a feature to add, not a failure mode to detect in free-form output.
> Where it gets closer: there's a small practitioner-discipline community that's picking at pieces of this. Cassie Kozyrkov's framing of AI as a "thoughtlessness enabler" — it dissolves the difficulty that used to ensure you understood the problem before getting an answer  is close in spirit. The MyCarta "Operational Discipline for LLM Projects" post from February is structurally similar — a field report about what breaks in sustained LLM-assisted work, with explicit procedures like auditing retroactively when you discover new failure modes and verifying citations when the model defends itself . Simon Willison's ongoing writing on "AI slop" and citation verification is adjacent. Ethan Mollick's practical AI-use writing touches it occasionally. None of these, as far as I can see from the search, frame the specific novelty-vs-retrieval distinction as a first-class procedural problem the way Foy does, and none of them build it into a pasteable discipline (Constraint 4's [PRIOR ART]/[DISTINCT FROM]/[SPECULATION] tagging).
> The genuinely novel move in the RESOLVE corpus — separable from the theology — is treating the model's inability-to-produce-a-citation as structurally meaningful and procedurally load-bearing, rather than as noise or a UX issue. That's rare. The community that cares about it at all is small, scattered across practitioner blogs and a few philosophy-of-ML papers, and mostly unaware of each other. If you're looking for fellow travelers for Foy, I'd point at Kozyrkov, Willison, the MyCarta author, and the "AI hygiene" corner of Substack before I'd point at any of the academic literature — even though the academic literature is where the vocabulary for the problem actually exists.
>
> I've use a cold Claude instance to push on this problem before we tackle it. Append this prompt to the artifact.
