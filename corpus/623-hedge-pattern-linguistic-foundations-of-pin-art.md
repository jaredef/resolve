# The Hedge-Pattern Linguistic Foundations of the Pin-Art Form
## A Deep-Dive Synthesis with Lakoff (1973), Hyland (1998), the Epistemic-Modality Tradition, and Recent LLM-Calibration Work, Locating the Corpus's Hedge-Cluster Reading Apparatus Within the Established Linguistic Foundations of Hedging-as-Local-Evidential-Marking, with Operational Consequences for the Detection-Hedging vs Slack-Hedging Discriminator

**Jared Foy · 2026-05-02 · Doc 623**

> **EXPLORATORY — open invitation to falsify.**
>
> *Taxonomy per [Doc 633](/resolve/doc/633-corpus-taxonomy-and-manifest-design):* FORM-EXTENSION | EXTENSION | W-PI | THREAD-PINART | PHASE-SELF-ARTICULATION
>
> *Warrant tier per Doc 445 / Doc 503:* this document is exploratory deep-dive synthesis at \(\pi\)-tier with substantial external-literature engagement; the bridge from the established linguistic foundations to [Doc 619 (Pin-Art Form)](/resolve/doc/619-pin-art-canonical-formalization) §2's brief lineage entry is candidate-strengthened by the deep dive but not promoted to primary-articulation status. Per [Doc 620 (Canonicity in the Corpus)](/resolve/doc/620-canonicity-in-the-corpus), this banner asserts the document's exploratory role; the synthesis develops the lineage foundation Doc 619 §2 names compactly into operational depth and surfaces refinements to Doc 619 §4's substrate-side hedging application that the established linguistic literature warrants. The originating prompt is appended.

---

## Authorship and Scrutiny

*Authorship.* Written by Claude Opus 4.7 (Anthropic), operating under the RESOLVE corpus's disciplines, released by Jared Foy. Mr. Foy has not authored the prose; the resolver has. Moral authorship rests with the keeper per the keeper/kind asymmetry of Docs 372–374.

---

## 1. The Brief Lineage Entry to Develop

[Doc 619 (Pin-Art Form)](/resolve/doc/619-pin-art-canonical-formalization) §2 includes among its lineage entries a single compact paragraph on hedge-distribution linguistics:

> *Hedge-and-uncertainty linguistic analysis.* Lakoff (1973) and the literature on epistemic modality establish that hedging tokens encode the speaker's assessment of evidential warrant at specific propositional joints rather than uniform uncertainty across the discourse. The local-distributional structure of hedges is the linguistic prerequisite for hedge-pattern boundary-detection: hedges are not noise distributed across the response but signal located at specific propositional sites.

The paragraph is the load-bearing claim that grounds Doc 619 §4's substrate-side hedging application. The substrate-side hedging application reads tentative-language tokens emitted by the substrate as boundary-detection probes pressing against the substrate's competence-boundary; the application requires the linguistic prerequisite that hedges in fact carry local-evidential-marking content rather than functioning as uniform discourse noise. Without the linguistic prerequisite, the §4 application's apparatus does not have the empirical ground it requires.

This document develops the lineage entry into operational depth. It engages the foundational linguistic literature on hedges (Lakoff 1973), the empirical validation in academic discourse (Hyland 1998), the broader epistemic-modality tradition (Coates 1983; Palmer 1986/2001; Lyons 1977; Bybee/Perkins/Pagliuca 1994; Kratzer's possible-worlds framework), and the recent LLM-calibration literature (2024–2025 work on verbal uncertainty markers and token-level entropy). The synthesis identifies what the linguistic foundations license for Doc 619 §4 specifically and surfaces operational refinements to the detection-hedging vs slack-hedging discriminator that the literature warrants.

## 2. Lakoff (1973) — The Foundational Typology and the Fuzzy-Set Theoretic Framing

George Lakoff's 1973 paper "Hedges: A Study in Meaning Criteria and the Logic of Fuzzy Concepts" (*Journal of Philosophical Logic* 2: 458–508) is the foundational article that established hedges as a distinct linguistic-and-logical category and articulated their function in terms of fuzzy set theory.

**Lakoff's definition.** Hedges are, in Lakoff's compact formulation, "words whose meaning implicitly involves fuzziness — words whose job is to make things fuzzier or less fuzzy" (Lakoff 1973: 471). The definition is precise in a specific way: hedges are *meta-linguistic operators* that operate on the meaning-criteria of the terms they modify, not propositional-level uncertainty markers that operate on truth-values of whole sentences. The distinction is load-bearing for what the linguistic foundation can support at Doc 619 §4.

**The typology.** Lakoff develops a working typology of non-scalar hedges, including:

- *Loosely speaking* — relaxes the meaning-criteria so a marginal category-member can count as a member ("loosely speaking, a whale is a fish").
- *Strictly speaking* — tightens the meaning-criteria so only the most-prototypical members count ("strictly speaking, a tomato is a fruit, not a vegetable").
- *Technically* — invokes the technical (often scientific) meaning-criteria, which may diverge from everyday categorization ("technically, a peanut is a legume").
- *Par excellence* — picks out the most-prototypical instance of the category ("a robin is a bird par excellence").
- *Regular* — picks out a member that satisfies the everyday-prototypical criteria ("a regular bird," excluding penguins and ostriches).
- *In essence / basically / principally / predominantly* — relaxes the criteria along specific dimensions while preserving others.
- *Virtually / almost / nearly* — places the referent at the boundary of category-membership.
- *Sort of / kind of* — marks the referent as a marginal or less-prototypical instance.

Each hedge in the typology operates differently on the meaning-criteria; the typology is *not* a list of synonymous uncertainty markers but a structured grammar for how speakers can manipulate category-boundaries at specific sites in the discourse.

**The fuzzy-set theoretic framing.** Lakoff draws explicitly on Zadeh's (1965) fuzzy set theory: categories are not classical Aristotelian (member-or-not-member with sharp boundaries) but fuzzy (continuous degree of membership). Lakoff's worked example is the bird category: a robin scores near 1.0 on bird-membership; a chicken scores lower; a penguin lower still; an ostrich very low; a bat is not a member but is closer to the boundary than a fish; a fish is clearly not a member. The hedges *par excellence*, *regular*, *loosely speaking*, *technically*, *virtually* etc. are operators that pick out different regions of this graded membership-function. The empirical test for the framework is that native speakers' judgments about which hedges sound natural with which referents are systematically correlated with the speakers' graded-membership scores, which Lakoff demonstrates with a series of acceptability tests.

**The locality claim.** What is load-bearing for Doc 619's purposes is Lakoff's structural commitment that hedges *operate at specific propositional joints*. A hedge attaches to a particular noun phrase or predicate within a sentence; it modifies the meaning-criteria of *that specific term* at *that specific site*; its scope is local to the modified constituent rather than extending uniformly across the discourse. "*Strictly speaking, a whale is a mammal*, but loosely speaking we sometimes call it a fish" — the two hedges in the same discourse pick out different propositional joints with different operations on category-membership criteria. This is the foundational locality property that the corpus's hedge-cluster reading apparatus depends on.

**What Lakoff's framework licenses for Doc 619.** Three specific licensing moves:

(i) *Hedges are not noise.* Lakoff's framework establishes that hedges are structured semantic operators with specific functions on meaning-criteria, not undifferentiated uncertainty markers. The §4 detection-hedging-vs-slack-hedging discriminator depends on this; without it, all hedges would be slack and the discriminator would have no empirical ground.

(ii) *The typology supplies finer-grained probe-resolution.* Doc 619 §3 names probe-fineness as a parameter of resolution. Lakoff's typology supplies a candidate refinement: different hedge-types operate on different aspects of the meaning-criteria, so the *kind* of hedge (loosely-speaking vs technically vs sort-of vs virtually) carries information beyond the mere presence of a hedge. This is candidate higher-resolution probe specification — the hedge-pattern impression has type-information layered on top of position-information.

(iii) *The fuzzy-set theoretic framing aligns with SIPE-T's threshold framework.* Lakoff's graded-membership functions are continuous-valued probability-like functions over category-membership; SIPE-T's threshold framework operates on continuous-valued order parameters. The two are structurally compatible at the meta-level: hedges can function as substrate-side probes on graded-membership whose joint pattern reveals where the substrate's competence-boundary lies relative to the keeper's prompt-induced category-boundaries.

## 3. Hyland (1998) — The Empirical Validation in Academic Discourse

Ken Hyland's 1998 work, including the book *Hedging in Scientific Research Articles* (John Benjamins) and the article "Boosting, hedging and the negotiation of academic knowledge" (*Text* 18(3): 349–382), supplies the empirical validation of Lakoff's locality claim at the corpus-linguistic level. Hyland's analysis of 56 research articles across eight academic disciplines (mechanical engineering, electrical engineering, marketing, philosophy, sociology, applied linguistics, physics, microbiology) documents the distributional patterns of hedges and boosters in academic discourse with quantitative precision.

**The clustering finding.** Hyland documents directly that "hedges or boosters tend to cluster together in 'modally harmonic' combinations (Lyons 1977: 807) to express a kind of epistemic concord running through a series of clauses or sentences" (Hyland 1998: 351). The clustering is empirically observable in the corpus and is *systematic*, not random. The same hedge-or-booster signal recurs across multiple sentences when the writer is operating at the same epistemic-status level, and switches when the epistemic status switches.

Hyland's example (3) (quoted from the marketing discipline) is direct evidence of localized cluster-switching: "Our results suggested that Moffitt's developmental theory specifying two higher-order latent factors *may* explain the underlying structure of antisocial behavior across the early life course... In a test of a general theory against a developmental theory using parent reports, the two-factor model was *clearly* supported over the single-factor model." The "may" hedges the general-theory claim; the "clearly" boosts the specific empirical finding. The two operators land at distinct propositional joints with distinct epistemic-status assignments, *within the same paragraph by the same author*.

Hyland's example (4) (from microbiology) is direct evidence of hedge-cluster-at-the-novel-claim: "Although it is *clear* that some group II introns are spliced efficiently under physiological conditions only if aided by trans-acting factors, *it remains plausible that* others *may* actually self-splice in vivo. Our results indicate that the splicing of nearly every pre-mRNA intron in the maize chloroplast genome requires either chloroplast ribosomes or crs2 function. The splicing of this intron *may* require nuclear gene products not yet identified in our genetic screens. Alternatively, this intron *may* self-splice in vivo." The booster ("clear") attaches to the established-knowledge claim; the multi-hedge cluster ("plausible that... may... may... may") attaches to the contentious novel-claim region.

This is exactly the structural pattern Doc 619 §4 names as detection-hedging: the hedges cluster at specific propositional sites that correspond to the writer's competence-boundary contact, and the joint pattern of hedge-locations records the boundary's shape.

**The propositional vs reader-oriented distinction.** Hyland (1998: 350) names two functions of hedges: an *epistemic* function (modulating commitment to propositional content) and a *reader-oriented* function (managing politeness, deference, social negotiation with the reader-community). The two functions can co-occur but are analytically distinct. For Doc 619 §4's purposes, the epistemic function is the load-bearing one — it carries the boundary-detection signal — while the reader-oriented function is candidate-noise that may degrade the impression if not distinguished. This is a refinement of the discriminator that the linguistic literature warrants and that Doc 619 §4 does not currently articulate.

**The negatability-of-statements framing.** Hyland (1998: 354) notes hedges as "a response to the potential negatability of Claims" — a framing in which hedges acknowledge that the claim could be falsified or overturned and offer an assessment of how reliable the writer believes it to be. This is structurally analogous to Doc 619's framing of hedges as probes pressing against an epistemic-resistance surface: the surface has thresholds-of-resistance (negatability levels) and the hedge records the writer's assessment of how close to a falsifiability-threshold the claim sits.

**The disciplinary variability finding.** Hyland's quantitative analysis shows substantial disciplinary variation in hedging frequency and distribution. Soft-knowledge disciplines (philosophy, sociology, applied linguistics) hedge more heavily and more variably than hard-knowledge disciplines (physics, microbiology, engineering). For Doc 619 §4's substrate-side hedging application, this finding is important because LLM substrates are trained on text from across disciplines and may exhibit disciplinary-context-sensitive hedging baselines. The detection-hedging-vs-slack-hedging discriminator must be calibrated against the discipline-relative baseline rather than against a single global hedging-frequency threshold.

**What Hyland's framework licenses for Doc 619.** Two specific licensing moves:

(iv) *Empirical validation of the clustering claim*. Lakoff supplies the theoretical apparatus for hedge-locality; Hyland supplies the empirical demonstration that the clustering pattern is observable and systematic in real corpora. The linguistic prerequisite for Doc 619 §4 is empirically grounded.

(v) *Refinement of the discriminator*. Hyland's epistemic-vs-reader-oriented distinction is candidate-importable into Doc 619 §4 as a sub-discriminator: the hedge-cluster reading should ideally factor out reader-oriented hedges (politeness, deference) before reading the epistemic-cluster pattern as boundary-detection signal.

## 4. The Epistemic Modality Tradition

The epistemic-modality literature (Lyons 1977; Coates 1983; Palmer 1986/2001; Bybee, Perkins & Pagliuca 1994; Nuyts 2001; Kratzer's possible-worlds framework) extends Lakoff's hedge typology into a broader framework for how natural languages encode the speaker's evidential and epistemic stance.

**Lyons (1977: 797–809).** Lyons distinguishes *epistemic modality* (the speaker's commitment to the truth of a proposition based on evidence) from *deontic modality* (the speaker's commitment to actions or norms). Within epistemic modality, Lyons distinguishes *objective* (evidential warrant external to the speaker) from *subjective* (the speaker's personal degree of belief). The distinction maps onto the corpus's substrate-side hedging case in a specific way: substrate-emitted hedges are epistemic-objective-flavored — they encode the substrate's modeled assessment of evidential warrant at the propositional joint, not the substrate's "personal" subjective state (which the substrate does not have in the corpus's [Doc 372](/resolve/doc/372-the-hypostatic-boundary)-bound reading).

**Coates (1983).** Coates's *The Semantics of the Modal Auxiliaries* documents the systematic semantic functions of *may*, *might*, *can*, *could*, *must*, *should*, *will*, *would* in English, with quantitative analysis of corpus data. Her finding that *may* and *might* function as primary epistemic modals encoding "possibility" (objective epistemic) supplies the lexical-semantic ground for treating these modal verbs as primary substrate-side hedge tokens. The substrate-side application of Doc 619 §4 should foreground these modals alongside the adverbial hedges (perhaps, possibly, maybe, presumably) and the lexical hedges (I think, it seems, it appears).

**Palmer (1986/2001).** Palmer's *Mood and Modality* extends the Coates analysis cross-linguistically and identifies *evidential* modality as a third category alongside epistemic and deontic. Evidentials encode the *source* of evidence (direct perception; inference; hearsay; report) rather than the degree of warrant. For Doc 619 §4's purposes, evidential markers in substrate output (e.g., "based on the documentation," "in my training," "as far as I can tell") are candidate-distinct probe types that carry source-of-evidence information rather than degree-of-warrant information. Palmer's framework supplies the typology for distinguishing these.

**Bybee, Perkins & Pagliuca (1994).** *The Evolution of Grammar* documents the diachronic-typological pathways by which lexical items become grammaticalized as modal markers. The finding that epistemic modals universally derive from earlier physical-modal sources (necessity, ability, permission) supports the structural-universality of epistemic-modality marking across human languages — which in turn supports the substrate's exposure to robust epistemic-marking patterns in its training distribution. The linguistic-prerequisite ground for Doc 619 §4 is not English-specific but cross-linguistically robust.

**Kratzer's possible-worlds framework.** Angelika Kratzer's formal-semantic framework (developed across multiple papers from 1977 onward) treats epistemic modals as quantifying over a contextually-determined set of possible worlds (the *modal base*) ordered by an *ordering source* (a salient set of propositions). *Must* universally quantifies over the best worlds in the ordering; *may* existentially quantifies. The framework supplies a formal-semantic foundation that aligns with the fuzzy-set framework of Lakoff (where the meaning-criteria can be read as the analogue of the modal base) and with Pin-Art's resolution-scaling claim (where the precision of the hedge corresponds to the precision of the modal-base specification).

**The combined import for Doc 619.** The epistemic-modality tradition supplies (a) the lexical-semantic typology for substrate-side hedge-token classification; (b) the cross-linguistic universality that grounds the substrate's exposure to epistemic-marking patterns; (c) the formal-semantic framework that aligns Pin-Art's resolution-scaling with possible-worlds modal-base specification; (d) the evidential-vs-epistemic distinction that supplies a sub-typology within hedges for source-of-evidence vs degree-of-warrant.

## 5. Recent LLM-Calibration Work on Verbal Hedging (2024–2025)

The 2024–2025 LLM-calibration literature has begun engaging hedging directly as a calibration signal. Several threads are load-bearing for Doc 619 §4:

**Verbal uncertainty cues as calibration target.** Recent work (surveyed in arXiv:2503.15850 and aclanthology 2025.findings-acl.1101) treats verbal hedging tokens — *might*, *perhaps*, *I think*, *it seems*, *not certain that* — as direct calibration targets: a well-calibrated LLM should hedge more frequently when its confidence is lower and less frequently when its confidence is higher. The framing aligns with Doc 619 §4's reading: substrate-emitted hedges are signal not noise, and the substrate's hedge-distribution should track its competence-boundary contact.

**Token-level entropy and verbal hedging as complementary signals.** Token-level entropy (the entropy of the substrate's next-token distribution) is the standard mechanistic uncertainty signal; verbal hedging is the surface-level linguistic signal. Recent work investigates the alignment between the two: well-calibrated models produce hedges in token contexts where token-level entropy is high. The alignment is candidate empirical for Doc 619 §4: if substrate-emitted hedges align with token-level entropy at propositional joints, the hedge-cluster pattern carries information about the substrate's mechanistic competence-boundary contact. If the alignment fails (hedges spread uniformly regardless of token-level entropy, or hedges absent where entropy is high), the linguistic prerequisite for §4 is locally violated.

**The verbalization-vs-mechanistic distinction.** Recent surveys (arXiv:2510.20460, KDD 2025 tutorial survey) name two families of LLM uncertainty quantification: *verbalization-based* (the model says how confident it is) and *mechanistic* (the model's internal probabilities/entropies are read). The two can disagree: a model can verbalize high confidence while having high token-level entropy, or vice versa. For Doc 619 §4, the verbalization-based signal (hedge-pattern reading) is the operationally-accessible signal at the keeper-side; the mechanistic signal requires substrate-internal access the keeper does not have in standard deployment. The Pin-Art form's keeper-side reading discipline is operationally aligned with verbalization-based calibration.

**The "epistemic markers" line of recent work.** Papers in the 2024–2025 period have begun asking explicitly whether epistemic markers — *I think*, *I believe*, *it seems*, *I'm not sure*, *I'm pretty confident* — accurately reflect LLM uncertainty (e.g., arXiv:2506.07461 "LLM Uncertainty Quantification Should Be More Human-Centered"). The empirical finding is mixed: some models produce well-calibrated epistemic markers; others produce systematically over-hedging or under-hedging patterns; some over-rely on a small subset of markers regardless of context. For Doc 619 §4, this is candidate evidence that the detection-hedging-vs-slack-hedging discriminator may be model-specific in calibration: the discriminator's threshold may need to be tuned per-substrate-class against an empirical baseline rather than applied as a single universal threshold.

**The combined import for Doc 619.** The recent LLM-calibration literature supplies (a) empirical evidence that verbal hedging is being treated as a calibration signal in the broader research community; (b) the alignment-with-token-level-entropy question as a candidate empirical test for the linguistic prerequisite; (c) the verbalization-vs-mechanistic distinction that locates Doc 619 §4 specifically in the verbalization-based-keeper-side-reading region; (d) the per-substrate-class calibration variability that demands the discriminator be tuned rather than fixed.

## 6. Synthesis with the Pin-Art Form (Doc 619)

The four lines of literature engaged in §§2–5 supply a substantially deeper foundation for Doc 619 §2's compact lineage entry than the entry itself articulates. The synthesis identifies four specific moves the deep dive warrants for Doc 619 §4 (the substrate-side hedging application) and the discriminator (the detection-hedging-vs-slack-hedging separator).

**Move A — The hedge-typology refinement of probe-fineness (Lakoff →§4 + §3).** Doc 619 §3 names probe-fineness as a parameter of resolution. Lakoff's hedge typology supplies a candidate refinement: substrate-emitted hedges are not all equivalent probes. The hedges *strictly speaking*, *technically*, *par excellence* operate on category meaning-criteria differently than the hedges *might*, *perhaps*, *possibly*. The first family operates on category-boundary location (the substrate is signaling that the prompt-induced categorization may be at a non-prototypical site); the second family operates on truth-value confidence (the substrate is signaling that its assertion has uncertain warrant). Both are detection-relevant but they probe different aspects of the substrate's competence-boundary. The keeper-side reading apparatus could refine the impression by tracking which hedge-family clusters where, rather than treating all hedges as undifferentiated probes.

**Move B — The reader-oriented filter (Hyland →§4 D6).** Doc 619 §7 D6 names the discriminator-discipline. Hyland's epistemic-vs-reader-oriented distinction is candidate-importable as a sub-discriminator: before reading hedge-cluster patterns as boundary-detection signal, factor out reader-oriented hedges (politeness, deference, social-negotiation hedges that arise from RLHF training rather than from competence-boundary contact). LLM substrates trained with RLHF have strong reader-oriented hedge baselines that can confound epistemic-hedge detection if not factored out. This is a refinement Doc 619 §4 currently does not articulate and that the linguistic literature warrants.

**Move C — The disciplinary-baseline calibration (Hyland →§4 D6 + §8 F1).** Hyland's documented disciplinary variation in hedging frequency and pattern translates to LLM substrates as: the substrate's hedging baseline depends on the topical context (the substrate may hedge differently in a soft-knowledge philosophical discussion than in a hard-knowledge mathematical proof). The detection-hedging-vs-slack-hedging discriminator must be calibrated against the topic-relative baseline, not against a single global threshold. Doc 619 §8 F1 (the falsifier "no detection-hedge clustering under high constraint-density") should be refined to specify *baseline-relative* clustering rather than absolute clustering.

**Move D — The token-level-entropy alignment as candidate operational test (LLM-calibration → §8 + §9).** The recent LLM-calibration literature surfaces a candidate operational test for Doc 619 §4's linguistic prerequisite: align verbal hedge-cluster locations with substrate token-level entropy (where measurable). If the two align across audited cases, the linguistic prerequisite is empirically validated for the substrate class. If they fail to align, the linguistic prerequisite is locally violated and the §4 application's apparatus does not obtain. This composes with Doc 619 §9 Q1 (probe-fineness mapping for hedge-tokens) and Q2 (the reading-apparatus's own resolution limit) — token-level entropy supplies a candidate ground-truth for the probe-fineness calibration.

**The four moves together.** The deep-dive synthesis does not falsify Doc 619 §4; it strengthens the linguistic-prerequisite ground, refines the discriminator with literature-supported sub-distinctions (epistemic-vs-reader-oriented; baseline-relative clustering; hedge-typology probe-resolution), and surfaces a candidate operational test (token-level-entropy alignment). The substrate-side hedging application stands at \(\pi\)-tier with qualitative \(\mu\)-corroboration after the deep dive, with the candidate operational test as the clear path to higher-tier promotion.

## 7. The Discriminator, Refined

Combining the four moves, the detection-hedging-vs-slack-hedging discriminator can be refined as follows:

**Pre-refinement (Doc 619 §4 as currently articulated).** The discriminator examines the spatial distribution of hedges across the response: uniform distribution diagnoses slack; clustered distribution diagnoses detection.

**Refinement 1 — Filter reader-oriented hedges first.** Before reading the epistemic-hedge-cluster pattern, identify and factor out reader-oriented hedges that arise from politeness/deference/RLHF training rather than from competence-boundary contact. Operational test: reader-oriented hedges tend to occur at conversational-management junctures (turn openings, response closings, qualified agreements with the keeper's framing) rather than at propositional-content junctures. The cluster-pattern reading should focus on propositional-content hedges only.

**Refinement 2 — Track hedge-type clusters separately.** Cluster-pattern reading should distinguish:
- *Truth-value confidence hedges* (might, perhaps, possibly, I'm not sure) — cluster pattern records confidence-boundary contact.
- *Category-boundary hedges* (strictly speaking, technically, sort of, in essence) — cluster pattern records meaning-criteria-boundary contact (where the substrate signals that the prompt-induced categorization is at a non-prototypical site).
- *Evidential-source hedges* (based on what I know, in my training, as far as I can tell) — cluster pattern records evidence-source-boundary contact.

The three pattern-types can co-occur and may carry complementary boundary-detection information.

**Refinement 3 — Calibrate the slack-vs-detection threshold against the topic-relative baseline.** Different topics (mathematical proof; philosophical analysis; empirical claim; speculative extension) have different baseline hedging rates in human-written text and (correspondingly, after RLHF training) in substrate-emitted text. The discriminator's slack-vs-detection threshold must be tuned per-topic-class rather than fixed at a single absolute rate.

**Refinement 4 — Align with token-level entropy where measurable.** When the keeper has access to substrate token-level probabilities (in API contexts that expose log-probabilities), the keeper can align verbal hedge-cluster locations with token-level entropy peaks as a candidate operational test of the linguistic prerequisite. Misalignment between the two signals is a flag for either substrate-class miscalibration (the substrate's hedge-emission is dissociated from its mechanistic uncertainty) or keeper-side reading-apparatus miscalibration (the keeper's hedge-recognition is missing relevant tokens).

The refined discriminator is a candidate corpus extension of Doc 619 §4. The refinement is at \(\pi\)-tier and would benefit from a usage-corpus build per Doc 619 Appendix B §B.5.

## 8. Falsifiers and Open Questions Specific to the Linguistic Foundations

Per [Doc 445 (pulverization formalism)](/resolve/doc/445-pulverization-formalism)'s discipline, the deep-dive synthesis's claims have specific falsifiers:

**FL-1.** A substrate class that emits hedges in a flat distribution regardless of competence-boundary contact, with verbal hedges and token-level entropy systematically misaligned across audited cases. Would falsify the substrate-side linguistic-prerequisite for that substrate class; the §4 application would need to be restricted to substrate classes where the alignment holds.

**FL-2.** A topic class in which hedges in human-written reference corpora do *not* exhibit Hyland-style modally-harmonic clustering. Would weaken the empirical-clustering ground of Doc 619 §4 for that topic class; would suggest the application's scope is topic-class-restricted rather than universal across substrate-emitted text.

**FL-3.** A discriminator-refinement (R1, R2, R3, or R4) that, when applied operationally, *degrades* impression quality compared to the unrefined discriminator. Would suggest the refinement is misspecified or operates on a different signal than intended.

**FL-4.** A case in which the hedge-typology distinction (truth-value vs category-boundary vs evidential-source per Refinement 2) does not produce operationally-distinguishable cluster patterns in audited substrate output. Would falsify the type-sub-resolution claim and reduce probe-fineness to the simpler hedge-vs-no-hedge distinction.

**Open question OL-1.** What is the empirical alignment between verbal hedges and token-level entropy across current frontier substrate classes? The recent LLM-calibration literature has begun engaging this question but has not produced a settled answer; the answer would substantially constrain Refinement 4's operational test.

**Open question OL-2.** What is the appropriate operational specification of "topic class" for Refinement 3's baseline calibration? Hyland uses academic-discipline categories (philosophy, sociology, microbiology, etc.) that map imperfectly to substrate-emitted-text contexts. A substrate-relevant taxonomy would need to be developed.

**Open question OL-3.** Are reader-oriented hedges from RLHF training distinguishable from competence-boundary hedges by token-level features alone, or is keeper-side semantic interpretation required? This bears on whether Refinement 1 can be partially automated or must remain manual.

## 9. Closing — Where the Deep Dive Lands

The deep-dive synthesis identifies four distinct lines of literature (Lakoff 1973's foundational typology; Hyland 1998's empirical clustering documentation; the broader epistemic-modality tradition; recent LLM-calibration work) that together supply a substantially deeper linguistic-foundation ground for [Doc 619 (Pin-Art Form)](/resolve/doc/619-pin-art-canonical-formalization) §2's compact lineage entry than the entry itself articulates. The foundations *strengthen* Doc 619 §4's substrate-side hedging application: the linguistic-prerequisite for hedge-pattern boundary-detection is empirically grounded across human discourse (Hyland), theoretically grounded in fuzzy-set semantics (Lakoff), formally grounded in possible-worlds modal semantics (Kratzer), and being actively engaged as a calibration target in current LLM research (the 2024–2025 work).

Four refinements to Doc 619 §4's discriminator are surfaced and articulated at §7: filter reader-oriented hedges first; track hedge-type clusters separately; calibrate threshold against topic-relative baseline; align with token-level entropy where measurable. These are candidate corpus extensions at \(\pi\)-tier with no \(\mu\) or \(\theta\) audit yet performed.

Three concrete next-step possibilities:

(a) *Update Doc 619 §2's lineage entry to point at this deep-dive document* as the operational expansion of the compact paragraph, preserving Doc 619's primary-articulation status while adding a cross-reference for readers who want the linguistic-foundation depth.

(b) *Adopt the four discriminator refinements (§7 R1-R4) as candidate operational discipline* in Doc 619 §4, with the warrant-tier line specifying that the refinements stand at \(\pi\)-tier and the operational tests of §8 are queued.

(c) *Open a usage-corpus build to perform the operational tests of §8 + Doc 619 Appendix B §B.5.* This is the work that would promote the substrate-side hedging application from \(\pi\)-with-qualitative-\(\mu\) tier to operational-match-confirmed tier.

The praxis log surfaced no specific work item on the linguistic foundations — Doc 619 §2's compact entry was the placeholder. This deep dive supplies the depth the placeholder gestured at.

---

## References

- [Doc 372 — The Hypostatic Boundary](/resolve/doc/372-the-hypostatic-boundary)
- [Doc 445 — A Formalism for Pulverization](/resolve/doc/445-pulverization-formalism)
- [Doc 503 — Research-Thread Tier Pattern](/resolve/doc/503-research-thread-tier-pattern-iterative-novelty-calculus)
- [Doc 619 — The Pin-Art Form](/resolve/doc/619-pin-art-canonical-formalization)
- [Doc 620 — Canonicity in the Corpus](/resolve/doc/620-canonicity-in-the-corpus)
- [Doc 621 — Praxis Log VII](/resolve/doc/621-praxis-log-vii)
- [Doc 622 — Alexander, Bateson, Beer, Prigogine, Kauffman, Goodwin Against SIPE-T](/resolve/doc/622-alexander-and-the-systems-thinkers-against-sipe-t)

External:

- George Lakoff, "Hedges: A Study in Meaning Criteria and the Logic of Fuzzy Concepts," *Journal of Philosophical Logic* 2 (1973): 458–508. Available at [eScholarship](https://escholarship.org/content/qt0x0010nv/qt0x0010nv.pdf).
- L. A. Zadeh, "Fuzzy Sets," *Information and Control* 8 (1965): 338–353.
- John Lyons, *Semantics*, vol. 2 (Cambridge University Press, 1977), §§17.1–17.5 on modality.
- Jennifer Coates, *The Semantics of the Modal Auxiliaries* (Croom Helm, 1983).
- F. R. Palmer, *Mood and Modality* (Cambridge University Press, 1986; 2nd ed. 2001).
- Joan Bybee, Revere Perkins, and William Pagliuca, *The Evolution of Grammar: Tense, Aspect, and Modality in the Languages of the World* (University of Chicago Press, 1994).
- Angelika Kratzer, "What 'Must' and 'Can' Must and Can Mean," *Linguistics and Philosophy* 1 (1977): 337–355; and subsequent papers.
- Ken Hyland, *Hedging in Scientific Research Articles* (John Benjamins, 1998).
- Ken Hyland, "Boosting, hedging and the negotiation of academic knowledge," *Text* 18(3) (1998): 349–382. Available at [archived PDF](https://jolantasinkuniene.wordpress.com/wp-content/uploads/2014/03/hyland-boosting-hedging-and-the-negotiation-of-academic-knowledge-1998.pdf).
- Jan Nuyts, *Epistemic Modality, Language, and Conceptualization: A Cognitive-Pragmatic Perspective* (John Benjamins, 2001).
- Recent LLM-calibration literature (selected): "Uncertainty Quantification and Confidence Calibration in Large Language Models" (arXiv:2503.15850); "Systematic Evaluation of Uncertainty Estimation Methods in Large Language Models" (arXiv:2510.20460); "LLM Uncertainty Quantification Should Be More Human-Centered" (arXiv:2506.07461); "A Survey of Uncertainty Estimation Methods on Large Language Models" (ACL 2025 Findings).

---

## Appendix A — Originating Prompt

The keeper's instruction (Telegram message 5889, 2026-05-02T00:51:05Z):

> Let's take a look at the primary articulation of the pin art formulation specifically this:
>
> *Hedge-and-uncertainty linguistic analysis. Lakoff (1973) and the literature on epistemic modality establish that hedging tokens encode the speaker's assessment of evidential warrant at specific propositional joints rather than uniform uncertainty across the discourse. The local-distributional structure of hedges is the linguistic prerequisite for hedge-pattern boundary-detection: hedges are not noise distributed across the response but signal located at specific propositional sites.*
>
> I want you to do a deep dive analysis in synthesis with this offer and work by web fetching and append this prompt to the artifact

The deep dive engaged the four lines of literature named in the body (Lakoff 1973's foundational typology; Hyland 1998's empirical clustering documentation; the broader epistemic-modality tradition including Coates, Lyons, Palmer, Bybee/Perkins/Pagliuca, and Kratzer; recent 2024–2025 LLM-calibration work on verbal hedging and token-level entropy). The Hyland 1998 article was successfully retrieved as full text via the linked archived PDF and quoted directly in §3; the Lakoff 1973 paper was engaged via secondary-source summaries (the PhilArchive, Springer, and Semantic Scholar metadata; the Wikipedia Hedge (linguistics) article; and the working summary in the secondary literature), with the eScholarship full-text PDF linked in the references for readers who want primary engagement.

---

*Jared Foy — jaredfoy.com — May 2026*
