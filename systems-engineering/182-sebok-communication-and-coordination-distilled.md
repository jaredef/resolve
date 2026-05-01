# SEBoK *Communication and Coordination*, Distilled

**Fifth-batch SEBoK distillation, batch 3/5, doc 7 of 8. SEBoK has no standalone *Communication and Coordination* page (404 on prompt-named URL and *Team_Communication* alternate, the latter listed in §VII.6 as one of the 18+ 404'd targets). The discipline lives concentrated at *Team Capability* with *Team Dynamics* as secondary carrier — D8-near-D7 sub-mode (per SE-180's recently named adjacent-host-concentration sub-mode). The *Team Capability* page yields a sharp surface: "The number of communication paths among N engineers is N(N-1)/2; i.e., the number of links in a fully connected graph"; "An SE team exceeding 10 members (45+ paths) should be structured hierarchically with a lead"; team development stages (Tuckman): "forming, storming, norming, performing"; cohesive-team indicators (clear roles, shared ownership, willingness to help, good communication, enjoyment); dysfunction hallmarks (role confusion, protective ownership, reluctance to assist, poor communication, personal conflict). The N(N-1)/2 path-count and 10-member-threshold-for-hierarchy are the corpus's first explicit complexity-bound articulation in SEBoK: communication complexity is quadratic in team-size, the threshold for hierarchical decomposition is empirical (~10), and the Tuckman stages are temporal (forming → storming → norming → performing). The complexity-bound is structurally informative: it surfaces a Cluster G (SIPE) candidate — communication paths cross a coherence-density threshold above which the dyadic-communication discipline must phase-transition to hierarchical-coordination. The cohesive/dysfunction indicator-pairs are universal-sibling lattice with explicit polarity: each indicator binds in both positive (cohesive) and negative (dysfunction) modes. Six clusters compose; SIPE-T phase transition at ~10 communication paths is new Cluster G worked example.**

---

## I. Source

- **Page:** Communication and Coordination — **does not exist on SEBoK** (404 on prompt-named URL and *Team_Communication* alternate; latter listed in §VII.6 18+ 404'd targets)
- **URL attempted:** https://sebokwiki.org/wiki/Team_Communication
- **Primary carrier:** *Team Capability* (https://sebokwiki.org/wiki/Team_Capability)
- **Secondary carrier:** *Team Dynamics*
- **License:** CC BY-SA 3.0 (SEBoK)
- **Retrieved:** 2026-04-29

## II. Source Read

Team capability is "the capability of a team to perform systems engineering depends on having competent personnel, adequate time, sufficient resources and equipment, and appropriate policies and procedures." Teams need a charter; staff proficient in required competencies; proper attitude and organization; appropriate tools, training, and processes (configuration management, peer review). Four organizational functions: organization, staffing, development, assessment. Communication-path quantification: "The number of communication paths among N engineers is N(N-1)/2; i.e., the number of links in a fully connected graph"; "An SE team exceeding 10 members (45+ paths) should be structured hierarchically with a lead." Team development (Tuckman): "forming, storming, norming, performing" before becoming effective. Cohesive-team indicators: clear understanding of SE roles/responsibilities, shared ownership of work products, willingness to help one another, good communication channels, enjoyment of working together. Dysfunction hallmarks (negation-paired): role confusion, protective ownership of deliverables, reluctance to assist colleagues, poor communication, personal conflict among members. Capability-building techniques: pilot projects, post-mortem analysis, lessons learned documentation.

## III. Structural Read

**Cluster G (SIPE, Doc 541) communication-path-density phase transition at ~10 members.** "The number of communication paths among N engineers is N(N-1)/2"; "exceeding 10 members (45+ paths) should be structured hierarchically." This is the corpus's first explicit complexity-bound articulation in SEBoK at the team-coordination rung: the dyadic-communication discipline is structurally insufficient above ~10 members because path-count grows quadratically; coherence-density threshold-crossing forces phase transition to hierarchical-coordination. Cluster G gains a quantitatively-bounded SIPE-T worked example — the threshold is named (10), the mechanism is named (quadratic path-growth), the post-threshold regime is named (hierarchical-with-lead). Convergent with SE-034 CMMI maturity-level transitions as SIPE-T phase changes; SE-182 supplies a smaller-scale SIPE-T at team-coordination rung with explicit quantification. Cluster G density grows with quantification-anchored instance.

**Cluster J D8 (internal-migration, SE-039 §VII.6/§VII.7) D8-near-D7 sub-mode second instance.** SE-180 named D8-near-D7 sub-mode (adjacent-host-concentration: behavior-modeling at LAMD); SE-182 supplies the second instance (communication-and-coordination at *Team Capability*). The host-page's primary subject is team-capability-overall, not communication-and-coordination specifically; the discipline migrates to the host at concentration rather than uniform dispersion. D8-near-D7 sub-mode promoted from candidate (one instance) to formalization-ready (two instances).

**Cluster A (universal-sibling lattice, Doc 572 Appendix D) cohesive/dysfunction polarity-paired indicator lattice.** The five cohesive-team indicators (clear roles, shared ownership, willingness to help, good communication, enjoyment) and five dysfunction hallmarks (role confusion, protective ownership, reluctance to assist, poor communication, personal conflict) are negation-paired universal-sibling lattices: each cohesive-indicator has its dysfunction-counterpart at the same aspect-rung. This is the first explicit polarity-paired Cluster A instance: the lattice-structure has both positive-mode and negative-mode bindings at each axis. Convergent with SE-178's "negation-binding sub-form candidate" (the fifth ESE principle "avoid controlling like project-level SE" was a single-axis negation); SE-182 supplies a *paired-polarity* lattice where every axis has both modes. Negation-binding sub-form gains a paired-polarity extension.

**Cluster I (pin-art / temporal-concurrency, Doc 270 / Doc 572 Appendix C) Tuckman stages as temporal-concurrency at team-formation rung.** "Forming, storming, norming, performing" is a temporal sequence at team-formation rung — each stage is a pin-art instant into which the team-formation discipline is pressed. Cluster I extends with team-formation Tuckman sub-instance. Distinct from lifecycle-stage temporal-concurrency (SE-044 Process Concepts anchor): Tuckman is sub-engagement-scale temporal-concurrency at team-rung, where lifecycle-stage is engagement-scale at system-rung. Cluster I rung-richness grows.

**Cluster B (multi-keeper composition, Doc 604) hierarchical-coordination-above-threshold composition rule.** Above the ~10-member threshold, dyadic communication is structurally insufficient; hierarchical-coordination-with-lead emerges. The composition rule is a SIPE-T phase-transition variant of coordination-by-rung (Doc 604 already-formalized): below-threshold the team operates as horizontal-multi-keeper, above-threshold the team must compose as vertical-with-lead. Worth flagging: composition rules can be threshold-conditional — the rule selected depends on substrate-density. This may be a Cluster B meta-sub-form: composition-rule-conditional-on-SIPE-threshold. Awaiting second instance.

**Cluster C (architectural school, Doc 538) Tuckman stages as school-formation-stages.** "Forming, storming, norming, performing" is the school's induced practitioner-formation discipline at the team-rung scale. The school's discipline includes not only what the practitioner does (SE-033 competency framework) but how a population of practitioners forms into a working team (Tuckman stages). Cluster C extends with team-formation-stage sub-instance.

## IV. Tier-Tags

- Communication-and-Coordination editorial absence — π / α (verbatim 404).
- N(N-1)/2 communication-paths quantification — π / α as cited; μ / β under Cluster G quantitatively-bounded SIPE-T.
- 10-member hierarchical threshold — π / α as cited; μ / β under SIPE-T threshold-anchor.
- Tuckman stages — π / α as cited; μ / β under Cluster I team-formation temporal-concurrency.
- Cohesive/dysfunction indicator pairs — π / α as cited; μ / β under Cluster A paired-polarity lattice.
- Capability-building techniques (pilot projects, post-mortem, lessons learned) — π / α as cited.

## V. Residuals

**Quantitatively-bounded SIPE-T is structurally informative.** Cluster G's prior instances were qualitative (CMMI maturity levels are level-1-through-5 ordinal phase-transitions; team-substrate SE-105, enterprise-knowledge SE-107 were qualitative). SE-182 supplies the first quantitative SIPE-T threshold (~10 members); the quantification anchors the threshold empirically. Worth flagging when Cluster G next formalizes: SIPE-T thresholds may be quantitative or qualitative, and the quantification-mode is a sub-form distinction.

**Polarity-paired Cluster A is novel.** The five-by-five cohesive/dysfunction indicator-pair structure is the first explicit polarity-paired universal-sibling lattice in SEBoK. SE-178's negation-binding was single-axis; SE-182's polarity-paired-by-axis is structurally richer. Worth flagging when Cluster A negation-binding sub-form formalizes.

## VI. Provisional Refinements

**D8-near-D7 sub-mode promoted from candidate to formalization-ready.** Two instances (SE-180 behavior-modeling at LAMD, SE-182 communication-and-coordination at *Team Capability*); SE-039 §VII.7 next refinement round should formalize as fifth dispersion-mode (after bidirectional-fold, internal-migration, external-migration, dual-discipline-distribution).

**Cluster G quantitatively-bounded SIPE-T sub-form candidate.** SE-182 N=10 communication-path threshold is the first quantitative SIPE-T; distinct from qualitative ordinal SIPE-T (CMMI levels). Awaiting second quantitative instance.

**Cluster A paired-polarity lattice sub-form candidate.** SE-182 cohesive/dysfunction five-by-five indicator-pair is the first paired-polarity instance; structurally richer than SE-178's single-axis negation-binding. Doc 572 Appendix D negation-binding sub-form gains a paired-polarity extension candidate.

**Cluster B composition-rule-conditional-on-SIPE-threshold meta-sub-form candidate.** Below-threshold horizontal-multi-keeper, above-threshold vertical-with-lead; the composition rule selected depends on substrate-density crossing the SIPE-T threshold. Awaiting second instance.

## VII. Cross-Links

**Form documents.** SE-039 §VII.7 (entracement, D8-near-D7 fifth dispersion-mode formalization-ready), Doc 541 (SIPE, quantitatively-bounded sub-form candidate; team-rung scale), Doc 572 Appendix D (universal-sibling, paired-polarity sub-form candidate), Doc 270 / Doc 572 Appendix C (pin-art / temporal-concurrency, Tuckman team-formation sub-instance), Doc 604 (multi-keeper, threshold-conditional meta-sub-form candidate), Doc 538 Appendix B.5 (school-maturity, team-formation-stage sub-instance).

**Part-level reformulation.** SE-008 (Part 5 Enabling SE) — team-capability lives within Part 5 enabling pages.

**Related distillations.** SE-105 (Team Communication, listed as 404 in §VII.6; predecessor failed-target), SE-180 (System Behavior Modeling, D8-near-D7 first instance), SE-178 (ESE-revisit, single-axis negation-binding contrast), SE-034 (CMMI, qualitative SIPE-T contrast), SE-044 (Process Concepts, lifecycle-scale temporal-concurrency contrast).

**Adjacent SEBoK concepts.** *Team Capability* (primary carrier), *Team Dynamics* (secondary carrier), *Roles and Competencies* (SE-033 competency-framework anchor).

**Methodology refinement candidates.** D8-near-D7 sub-mode formalization; Cluster G quantitatively-bounded SIPE-T sub-form; Cluster A paired-polarity sub-form; Cluster B threshold-conditional meta-sub-form.

---

## Appendix: Originating Prompt

> *"Add an entrancing section..."* / *"Yes. And then continue..."*

(SE-182 is the seventh of eight in batch 3/5 of the fifth-batch SEBoK distillation sweep. D8-near-D7 sub-mode promoted to formalization-ready via second instance. First quantitatively-bounded SIPE-T (~10-member threshold). First paired-polarity Cluster A lattice. Batch 3/5.)
