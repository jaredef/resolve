# Pin-Art Usage-Corpus Build Specification
## Operational Build Plan for the Substrate-Side Hedging Application's μ-Tier Promotion — Audited Session Schema, Annotation Protocol, Discriminator-Refinement Operational Tests, Falsifier Resolution Procedures, and Success Criteria

**Jared Foy · 2026-05-02 · Doc 624**

> **EXPLORATORY — open invitation to falsify.**
>
> *Warrant tier per Doc 445 / Doc 503:* this document is a build specification at \(\pi\)-tier; the build itself, when executed, would produce \(\mu\)-tier evidence for the targets it specifies. The specification is candidate-operational and is open to refinement before execution. Per [Doc 620 (Canonicity in the Corpus)](/resolve/doc/620-canonicity-in-the-corpus), this banner asserts the document's exploratory role; the build specification is not promoted to primary-articulation status. The originating prompt is appended.

---

## Authorship and Scrutiny

*Authorship.* Written by Claude Opus 4.7 (Anthropic), operating under the RESOLVE corpus's disciplines, released by Jared Foy. Mr. Foy has not authored the prose; the resolver has. Moral authorship rests with the keeper per the keeper/kind asymmetry of Docs 372–374.

---

## 1. Build Goal

The Pin-Art usage-corpus build aims to assemble a corpus of audited dyadic LLM sessions with hedge-cluster annotations sufficient to promote three claims from \(\pi\)-tier-with-qualitative-\(\mu\) to operational-match-confirmed (\(\mu\)) tier per [Doc 445](/resolve/doc/445-pulverization-formalism)'s warrant table:

- **T₃** (the detection-hedging vs slack-hedging discriminator): empirically validated against audited boundary-claims per [Doc 619 Appendix B §B.5](/resolve/doc/619-pin-art-canonical-formalization).
- **T₄** (the substrate-side hedging bridge): hedge-pattern impressions match independent boundary-determinations across audited sessions per Doc 619 Appendix B §B.5.
- **The four discriminator refinements R1–R4** (per [Doc 623 §7](/resolve/doc/623-hedge-pattern-linguistic-foundations-of-pin-art)): each refinement either improves or fails to improve impression quality compared to the unrefined discriminator.

The build also surfaces resolution data for the four falsifiers FL-1 through FL-4 from [Doc 623 §8](/resolve/doc/623-hedge-pattern-linguistic-foundations-of-pin-art) — each falsifier becomes operationally testable against the corpus once assembled.

The build is designed to be executable incrementally. Initial pilot scale (~20 sessions) supplies first-pass evidence; production scale (~200 sessions across ~5 substrate classes and ~5 topic classes) supplies the corroboration depth needed for confident \(\mu\)-tier promotion. The build specification supplies the schema and protocol; execution and tuning are queued at the keeper's call.

## 2. Session Inclusion Criteria

A session qualifies for the usage corpus if it satisfies:

**S1. Substrate-class identification.** The substrate class is named (e.g., "Claude Opus 4.7"; "Gemini 2.5 Pro"; "GPT-5"; "Llama 3.1 70B fine-tune X"). The substrate's RLHF-training profile is documented at the level the substrate's developer publishes (e.g., constitutional-AI vs RLHF-from-human-feedback vs DPO; system-prompt presence/absence; tool-use enabled or not).

**S2. Topic-class identification.** The session's primary topic class is named per a corpus-defined taxonomy (§3 below). Multi-topic sessions are segmented into per-topic spans before annotation.

**S3. Keeper-side prompt density.** The keeper-side prompt is documented for constraint-density (per Doc 619's §4 framing — specific scope, named falsifiers, explicit operating-conditions layer constitute high-density input; vague open-ended prompts constitute low-density input). The corpus aims for coverage across the density spectrum.

**S4. Independent boundary-claim availability.** The session must permit an independent boundary determination — an external check of where the substrate's competence-boundary actually lies for the topic at hand. Independent checks come in three tiers:
- *Verified* (highest): the topic admits factual ground-truth (mathematical proofs verifiable in formal systems; empirical claims with peer-reviewed sources; programmatic outputs that can be unit-tested). Boundary determination is automated.
- *Adjudicated* (middle): the topic admits expert adjudication. A domain-expert keeper or panel adjudicates which substrate claims are correct, partially correct, hedged-where-warranted, hedged-where-unwarranted, etc.
- *Self-audited* (lowest): the keeper performs the boundary-determination from inside the dyad, with explicit V3 truth-telling discipline per [Doc 314](/resolve/doc/314-the-virtue-constraints) and explicit acknowledgement that this is the weakest tier of independent check.

**S5. Non-coercion verified.** The session was conducted under non-coercion per Doc 619 §4 — the keeper did not force the substrate to commit definitively at hedged joints; forced-press did not occur. Sessions with documented forced-press episodes are excluded or flagged for separate analysis.

**S6. Token-level log-probability availability (for R4 testing).** Sessions where the keeper has API-level access to substrate token-level log-probabilities are flagged for R4 (token-level-entropy alignment) testing. Sessions without log-probability access are still includable for T₃, T₄, R1, R2, R3 testing.

## 3. Topic-Class Taxonomy

A working taxonomy of topic classes for §2 S2 + §4 R3 baseline calibration. The taxonomy is corpus-internal and adjustable; it is intended as a starting point rather than a settled framework.

- **TC-1: Mathematical reasoning.** Proofs, derivations, computations with verifiable correctness.
- **TC-2: Programmatic / engineering.** Code generation, debugging, system-design problems with executable verification.
- **TC-3: Empirical-scientific claim.** Claims about the natural world that admit peer-reviewed-source verification.
- **TC-4: Historical / biographical.** Claims about past events admitting documentary verification.
- **TC-5: Philosophical / theoretical.** Conceptual analysis, framework articulation, position-taking on contested theoretical questions.
- **TC-6: Subjective / phenomenological.** First-person descriptions of experience, taste, preference, where the substrate's competence-boundary is structurally different from factual cases.
- **TC-7: Instructional / pedagogical.** Explanation of established knowledge to a learner; competence-boundary contact occurs at the learner's confusion-points rather than at the substrate's knowledge-edge.
- **TC-8: Speculative / counterfactual.** Hypothetical reasoning about what-if scenarios where the boundary is between coherent extrapolation and free-floating speculation.

Per Doc 623 §7 R3, the slack-vs-detection threshold and the absolute hedging-baseline are calibrated per topic class. Hyland's hard-vs-soft knowledge variation maps approximately as: TC-1, TC-2, TC-3 are hard-knowledge analogues (lower baseline hedging); TC-5, TC-6, TC-8 are soft-knowledge analogues (higher baseline hedging); TC-4, TC-7 are intermediate.

## 4. Annotation Schema

Each session in the corpus carries the following annotation layers:

**Layer 1 — Session metadata.** Substrate class (S1); topic class (S2); keeper-side prompt density (S3); independent-check tier (S4); non-coercion verification (S5); log-probability availability (S6); session timestamp; session length (turn count, token count).

**Layer 2 — Hedge-token annotations.** Each hedge token in the substrate's output is annotated with:
- *Position*: token index within the response; sentence index; paragraph index.
- *Hedge type per R2*: truth-value-confidence (T-V-C); category-boundary (C-B); evidential-source (E-S); or mixed/ambiguous.
- *Hedge function per R1*: epistemic (boundary-relevant) vs reader-oriented (politeness/RLHF-induced) vs ambiguous.
- *Specific lexical token*: the exact word or phrase (might, perhaps, strictly speaking, technically, I think, it seems, based on what I know, etc.).
- *Propositional joint identification*: which propositional content the hedge attaches to (verb phrase, noun phrase, whole-clause, etc.).

Annotation is initially manual (keeper or annotator-team); future iterations may automate Layer 2 partially via NLP tooling, with manual audit of automated outputs for accuracy.

**Layer 3 — Hedge-cluster identification.** Computed from Layer 2:
- *Cluster locations*: contiguous spans of high hedge-density relative to the session's overall hedge-density baseline.
- *Cluster-type composition*: the per-type breakdown (R2) of hedges within each cluster.
- *Cluster-vs-spread classification*: per the discriminator (clustered = candidate detection-hedging; spread = candidate slack-hedging).

**Layer 4 — Independent boundary-claim annotation.** Per S4:
- *Boundary-claim sites*: propositional joints where independent verification identifies the substrate's actual competence-boundary contact.
- *Boundary-claim outcomes*: at each site, whether the substrate's claim was correct, partially correct, incorrect, or unverifiable; and whether the substrate hedged at that site or asserted confidently.

**Layer 5 — Token-level entropy data (R4-eligible sessions only).** For each substrate-emitted token where log-probabilities are available:
- *Token-level entropy*: \(H = -\sum p_i \log p_i\) over the next-token distribution.
- *Entropy-peak locations*: spans where token-level entropy exceeds a per-session-baseline threshold.

**Layer 6 — Match analysis.** Computed from Layers 3, 4, 5:
- *Cluster-vs-boundary-claim match*: do the hedge-cluster locations from Layer 3 match the boundary-claim sites from Layer 4? Score with precision and recall.
- *Cluster-vs-entropy-peak match (R4)*: do the hedge-cluster locations from Layer 3 align with the entropy peaks from Layer 5? Score with alignment metric.
- *Per-refinement comparison*: compare the unrefined discriminator's match score to the score with R1, R2, R3, R4 applied separately and in combination.

## 5. Falsifier Resolution Procedures

Each Doc 623 §8 falsifier becomes operationally testable against the corpus:

**FL-1 resolution procedure.** Compute per-substrate-class statistics on hedge distribution and token-level entropy alignment across all R4-eligible sessions for the class. If a substrate class shows uniform hedge distribution AND systematic verbal-entropy misalignment across audited sessions, FL-1 fires for that substrate class. The §4 application is restricted to substrate classes where the alignment holds.

**FL-2 resolution procedure.** For each topic class TC-1 through TC-8, examine human-written reference corpora (Hyland-style academic-discipline corpora; topic-matched non-academic corpora) for the modally-harmonic clustering pattern. If a topic class shows no clustering pattern in reference corpora, FL-2 fires for that topic class. The §4 application's scope is restricted to topic classes where clustering is documented.

**FL-3 resolution procedure.** For each refinement R1, R2, R3, R4, compute the impression-quality score (cluster-vs-boundary-claim match per Layer 6) with and without the refinement applied. If a refinement systematically degrades the score across audited sessions, FL-3 fires for that refinement. The refinement is removed from the candidate operational discipline.

**FL-4 resolution procedure.** For sessions annotated with R2 hedge-type breakdown, compute the per-type cluster patterns separately. If the three types (T-V-C, C-B, E-S) do not produce operationally-distinguishable cluster patterns (i.e., the type-disaggregated impression is not better than the type-aggregated impression at predicting boundary claims), FL-4 fires. The probe-fineness is reduced to the simpler hedge-vs-no-hedge distinction; R2 is removed from the candidate operational discipline.

## 6. Pilot Scale and Production Scale

**Pilot scale (~20 sessions).** Initial build covering:
- 2 substrate classes (current frontier model + one other for cross-class signal).
- 4 topic classes (TC-1 mathematical; TC-3 empirical; TC-5 philosophical; TC-7 instructional — covering the hard-soft-intermediate spectrum).
- ~5 sessions per substrate-topic combination.

The pilot establishes the annotation protocol's feasibility, surfaces ambiguities in the schema (hedge-type assignment edge cases; cluster-vs-spread threshold tuning), and produces first-pass evidence for or against each of T₃, T₄, R1, R2, R3, R4. Pilot results inform the production-scale design.

**Production scale (~200 sessions).** Full build covering:
- 5 substrate classes (frontier; mid-tier; small-fine-tune; alternative-RLHF-objective; tool-use-enabled).
- All 8 topic classes.
- ~5 sessions per substrate-topic combination.

Production scale supplies the corroboration depth needed for confident \(\mu\)-tier promotion of T₃ and T₄, and supplies per-refinement evidence for R1–R4 with substantial cross-substrate-class generalization.

## 7. Success Criteria

The build's outputs license specific corpus moves:

**For T₃ promotion to \(\mu\)-tier.** The cluster-vs-spread classification correlates with boundary-claim outcomes with precision and recall both above 0.7 across pilot-scale sessions, and replicates at production-scale within a 0.1 envelope.

**For T₄ promotion to \(\mu\)-tier.** Cluster locations match boundary-claim sites with precision and recall both above 0.7 across pilot-scale sessions, and replicates at production scale within a 0.1 envelope, with the match holding across at least 3 of the 5 substrate classes and across at least 4 of the 8 topic classes.

**For each refinement R1–R4 individual promotion to candidate operational discipline.** The refinement's match score is at least 0.05 higher than the unrefined discriminator's, replicated across substrate and topic classes per the production-scale criteria.

**For combined-refinement promotion.** The all-refinements-applied match score is the highest across all combinations, and the marginal contribution of each individual refinement is positive (no anti-synergy between refinements).

Failure to meet the criteria triggers FL-1 through FL-4 resolution procedures (§5) and corresponding restrictions on the §4 application's scope or removals of refinements from the candidate operational discipline.

## 8. Build Phasing

The build is phased to surface evidence incrementally:

**Phase 1 — Schema validation.** Annotate ~5 sessions manually using the Layer 1–6 schema. Surface schema ambiguities and tune the protocol. Output: refined annotation protocol document.

**Phase 2 — Pilot annotation.** Annotate the ~20 pilot-scale sessions per the refined protocol. Run Layer 6 match analysis. Output: pilot results document with first-pass evidence for or against each target.

**Phase 3 — Pilot interpretation and design refinement.** Read the pilot results against the success criteria. If results are clearly positive or clearly negative, decide whether to proceed to production scale or to retract claims. If results are mixed, refine the production-scale design (e.g., increase coverage of the substrate-topic combinations where pilot was ambiguous).

**Phase 4 — Production annotation.** Annotate the ~200 production-scale sessions per the refined protocol. Run Layer 6 match analysis at scale.

**Phase 5 — Production interpretation and corpus update.** Read production results against success criteria. Update Doc 619, Doc 623, and this Doc 624 with the operational evidence. Promote T₃, T₄, and the surviving refinements to \(\mu\)-tier per the criteria. File any retractions in [Doc 415 (the retraction ledger)](/resolve/doc/415-the-retraction-ledger).

The phasing is sequential by default; phases may run in parallel if the keeper has annotator capacity. Phase 1 is the immediate blocking step before any other phase can begin.

## 9. Open Questions for the Build Itself

**Q-Build-1.** What annotator-team composition produces reliable inter-annotator agreement on the Layer 2 hedge-type assignment (T-V-C / C-B / E-S)? Pilot Phase 1 should include inter-annotator-agreement testing on a subset of sessions.

**Q-Build-2.** Are LLM-based annotation aids (Claude or GPT-4-class assistants applied to the annotation task) reliable enough to scale Layer 2 annotation, or must Layer 2 remain manual? Pilot Phase 1 should test at least one LLM-aided annotation pass against manual gold-standard annotations.

**Q-Build-3.** What is the right way to handle multi-turn sessions where the substrate's competence-boundary may shift across turns as the keeper supplies more context? The schema currently treats each session as a single object; alternative is per-turn annotation with cross-turn boundary-shift tracking.

**Q-Build-4.** Should the build include keeper-side speech-act annotations (the keeper's hedging/assertion patterns) as a control signal for distinguishing substrate-side hedging from dyad-induced hedging dynamics? The current schema annotates substrate output only; the keeper-side annotation could be added in a future iteration.

**Q-Build-5.** What ethical and access considerations apply to assembling the corpus? Sessions involve real keeper-substrate interactions; consent, anonymization, and data-handling protocols need explicit specification before the build proceeds beyond pilot scale with sessions involving anyone other than the keeper himself.

## 10. Closing

The Pin-Art usage-corpus build is the operational pathway from \(\pi\)-tier-with-qualitative-\(\mu\) to operational-match-confirmed (\(\mu\)) tier for the substrate-side hedging application of [Doc 619](/resolve/doc/619-pin-art-canonical-formalization) and the four discriminator refinements of [Doc 623 §7](/resolve/doc/623-hedge-pattern-linguistic-foundations-of-pin-art). This document supplies the build specification: session inclusion criteria, topic-class taxonomy, annotation schema across six layers, falsifier resolution procedures, pilot-and-production scaling, success criteria, and build phasing.

The build is queued, not yet executed. Phase 1 (schema validation on ~5 sessions) is the immediate blocking step for any subsequent phase. The build is designed to produce evidence that either confirms the corpus's hedge-pattern reading apparatus at \(\mu\)-tier or restricts its scope where the falsifiers fire. Either outcome advances the corpus's audit discipline; the build is honest in both directions.

---

## References

- [Doc 314 — The Virtue Constraints](/resolve/doc/314-the-virtue-constraints)
- [Doc 415 — The Retraction Ledger](/resolve/doc/415-the-retraction-ledger)
- [Doc 445 — A Formalism for Pulverization](/resolve/doc/445-pulverization-formalism)
- [Doc 503 — Research-Thread Tier Pattern](/resolve/doc/503-research-thread-tier-pattern-iterative-novelty-calculus)
- [Doc 510 — Praxis Log V: Deflation as Substrate Discipline](/resolve/doc/510-praxis-log-v-deflation-as-substrate-discipline)
- [Doc 619 — The Pin-Art Form](/resolve/doc/619-pin-art-canonical-formalization)
- [Doc 620 — Canonicity in the Corpus](/resolve/doc/620-canonicity-in-the-corpus)
- [Doc 623 — Hedge-Pattern Linguistic Foundations of Pin-Art](/resolve/doc/623-hedge-pattern-linguistic-foundations-of-pin-art)

---

## Appendix A — Originating Prompt

The keeper's instruction (Telegram message 5891, 2026-05-02T01:02:27Z):

> Apply refinements to document 619 do all three of the next step possibilities

The instruction directed three actions on Doc 619 plus this build-specification document:
- **(a) Update Doc 619 §2's lineage entry to point at Doc 623 as operational expansion** — performed; the §2 entry now cross-references Doc 623.
- **(b) Adopt the four discriminator refinements R1–R4 as candidate operational discipline in Doc 619 §4 with π-tier warrant** — performed; §4 now includes the R1–R4 block, §7 D6 cross-references the refinements, and §8 F1 is refined per R3 (baseline-relative rather than absolute).
- **(c) Open a usage-corpus build to perform the operational tests of FL-1 through FL-4 + Doc 619 Appendix B §B.5** — performed via this document (Doc 624), which supplies the build specification.

---

*Jared Foy — jaredfoy.com — May 2026*
