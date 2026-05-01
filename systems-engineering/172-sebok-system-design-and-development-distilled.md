# SEBoK *System Design and Development*, Distilled

**Fifth-batch SEBoK distillation, batch 2/5 doc 5 (SE-172). The named *System Design and Development* page is editorially absent (404); the discipline carries on the *System Definition* page (front-end SE activities anchored at concept stage), the *System Realization* page (Vee-model integration up + four realization processes: implementation, integration, verification, validation), and the *Generic Life Cycle Model* (concept-definition / system-definition / system-realization / PSU / retirement stages, per SE-022). The 404 is itself load-bearing under §VII.7's saturated D8 dispersed-instrument pattern; system design and development is a canonical *internal-migration* case where the discipline name lives across three SEBoK carriers without a dedicated page. The structural read foregrounds: (i) the Vee-model as Cluster A two-axis universal-sibling lattice (rung × design-down/integration-up direction) at the lifecycle-execution rung, (ii) the four realization processes (implementation, integration, verification, validation) as a Cluster A four-axis lattice at the realization-activity rung, and (iii) "concurrently, iteratively and recursively" as the canonical Cluster I pin-art / temporal-concurrency reading from SE-044's anchor. The two Cluster A lattices co-bind at the design-and-development rung as a *paired-parallel-lattice* — convergent with §VII.7 candidate #10 (SE-135 MBSE Properties × Criteria); SE-172 supplies the second instance (Vee-axes × realization-processes), promoting paired-parallel-lattice from candidate to formalization-ready. Five clusters compose; §VII.7 candidate #10 reaches formalization threshold.**

---

## I. Source

- **Page:** *System Design and Development* (404 on direct URL); read on three SEBoK carriers — *System Definition*, *System Realization*, *Generic Life Cycle Model*.
- **URL:** https://sebokwiki.org/wiki/System_Design_and_Development (404, 2026-04-29); carriers https://sebokwiki.org/wiki/System_Definition and https://sebokwiki.org/wiki/System_Realization
- **License:** CC BY-SA 3.0 (SEBoK)
- **Retrieved:** 2026-04-29

## II. Source Read

Named page returns 404. *System Definition* page: "A set of core technical activities of systems engineering, including the activities that are completed primarily in the front-end portion of the system design," covering definition of system requirements, design of logical and physical architectures, analysis and selection among solution options. *System Realization* page: four main processes executed iteratively and concurrently — System Implementation (building system elements), System Integration (combining elements), System Verification (alignment with requirements and architecture), System Validation (meets stakeholder needs). "The outputs of system definition are used during system implementation to create system elements and during system integration to provide plans and criteria for combining these elements." Vee model, verbatim: Left side (Design Down) develops system element specifications, design descriptions, V&V plans, and flows down requirements to lower-level models; Right side (Integration Up) assembles elements, verifies against specifications, validates against stakeholder requirements, integrates continuously / incrementally / iteratively. "These activities are not sequential, but are performed concurrently, iteratively and recursively depending on the selected life cycle model."

## III. Structural Read

**Cluster J D8 (dispersed-instrument).** The 404 is the discipline's editorial signature. System design and development lives across at least three SEBoK carriers (System Definition front-end, System Realization back-end, Generic Life Cycle Model staging). Per §VII.7's four-mode dispersion taxonomy, this is *internal-migration* dominant (SE-138 mode). Worth flagging: the discipline name combines two adjacent KAs ("System Definition" + "System Realization"); the 404 is structurally a *combined-name-without-combined-page* sub-instance of internal-migration.

**Cluster A two-axis Vee-model lattice (Doc 572 D.5.2).** The Vee model is canonical two-axis universal-sibling at the lifecycle-execution rung: rung-axis (system / subsystem / component / element) × direction-axis (design-down / integration-up). Each cell binds a specific activity (e.g., system-rung × design-down = system-element specification; component-rung × integration-up = component verification). Doc 572 D.5.2 (two-axis sub-form) records 4 instances at §VII.7 formalization-readiness; SE-172 supplies the fifth, with the Vee model as the SEBoK-side canonical anchor for two-axis Cluster A.

**Cluster A four-axis realization-process lattice.** Implementation × Integration × Verification × Validation is a four-axis universal-sibling lattice at the realization-activity rung. Each axis binds the realization aspect-wise: every realization engagement involves implementation, integration, verification, validation activities concurrently. Convergent with SE-029 (System Validation) and SE-025 (System Verification) per-axis distillations.

**Paired-parallel-lattice (§VII.7 candidate #10).** §VII.7 records SE-135 MBSE (Properties × Criteria as paired N=10 lattices co-bound at the modeling rung) as the first paired-parallel-lattice instance. SE-172 supplies the second: Vee-axes (rung × direction) × realization-processes (implementation/integration/V&V) co-bound at the design-and-development rung. The two lattices are not independent — Vee positions specify *where* in lifecycle each realization process executes. Two instances now exist; the candidate is formalization-ready. New refinement: paired-parallel-lattice as Cluster A sub-form where two co-located lattices structurally co-bind (one provides positioning, the other provides activity).

**Cluster I (pin-art / temporal-concurrency, SE-044 anchor).** "Concurrently, iteratively and recursively" is the canonical SE-044 anchor formulation reproduced verbatim at the realization rung. SE-044 is the SEBoK-side anchor for Cluster I per §VII.6 D7; SE-172 reads as the realization-rung instance bound to that anchor. The concurrency-iteration-recursion ground composes with the two Cluster A lattices: the lattices specify *what*, the concurrency specifies *how-temporal*.

**Cluster F (longitudinal-pulverization, SE-114) at requirements-flow-down sub-rung.** "Flow-down of requirements to lower-level models" reads as Cluster F at the rung-decomposition pulverization sub-rung. The Vee's left side is *requirement pulverization across rungs*; the Vee's right side is *integration recomposition across rungs*. Cluster F gains a clean rung-pulverization instance distinct from time-pulverization (CI/CD, LCC).

**Cluster D (co-production at sub-rungs, Doc 573).** "The outputs of system definition are used during system implementation" articulates co-production: definition-keeper produces specifications consumed by implementation-substrate, which co-produces the realization-output. Convergent with Doc 573's co-production form at the definition-realization handoff.

## IV. Tier-Tags

- System design and development page absence (404) — π / α as observed; μ / β under Cluster J D8 internal-migration (combined-name-without-combined-page sub-instance).
- "Front-end portion of the system design" + "completed primarily" — π / α as cited; μ / β under Cluster F rung-pulverization.
- Four realization processes (Implementation / Integration / Verification / Validation) — π / α as cited; μ / β under Cluster A four-axis realization-activity lattice.
- Vee-model design-down / integration-up structure — π / α as cited; μ / β under Cluster A two-axis Vee lattice.
- "Concurrently, iteratively and recursively" — π / α as cited; μ / β under Cluster I SE-044 anchor reproduced verbatim.

## V. Residuals

**Combined-name internal-migration sub-instance.** "System Design and Development" combines "System Design" (front-end definition) + "Development" (back-end realization). The 404 is the editorial signature of a discipline that SEBoK splits at the carrier rung but the practitioner literature combines at the discipline rung. Worth flagging as a D8 sub-instance: combined-discipline-name without combined-page is a recognizable migration pattern.

**Paired-parallel-lattice formalization-readiness reached.** Two instances now (SE-135 + SE-172). The next refinement round should formalize.

## VI. Provisional Refinements

**§VII.7 candidate #10 (paired-parallel-lattice) reaches formalization-readiness.** Two instances confirmed: SE-135 MBSE (Properties × Criteria, both N=10) and SE-172 System Design and Development (Vee-axes × realization-processes). The sub-form is formalization-ready.

**Cluster J D8 *combined-name-without-combined-page* sub-instance.** New internal-migration sub-pattern. Watch for additional combined-name 404s in the remaining SE-160 batches.

**Cluster A two-axis sub-form gains SEBoK-side canonical anchor.** The Vee model is the SEBoK-side canonical two-axis universal-sibling anchor. Doc 572 D.5.2 should name Vee as anchor article.

**Alignment with §VII.7 candidate refinements.** Aligns with #10 paired-parallel-lattice (formalization-ready); composition-rule-stacking (J + A + I + F + D bind at single carrier triplet); multi-rung lattice (Vee model rung-axis); cadence-lattice (concurrent / iterative / recursive temporal cadence axis).

## VII. Cross-Links

**Form documents.** Doc 530 / §VII.6 D8 (dispersed-instrument, internal-migration combined-name sub-instance), Doc 572 D.5.2 (two-axis universal-sibling, Vee-model canonical anchor), Doc 572 Appendix D (four-axis realization-activity lattice; paired-parallel-lattice sub-form), SE-044 / Doc 270 (pin-art, concurrency-iteration-recursion at realization rung), SE-114 (forward-pulverization, rung-decomposition sub-rung), Doc 573 (co-production at definition-realization handoff).

**Part-level reformulation.** SE-005 (Part 2 Foundations), SE-006 (Part 3 Management).

**Related distillations.** SE-040 (System Definition). SE-041 (System Realization). SE-044 (Process Concepts, Cluster I anchor). SE-022 (Generic Life Cycle Model). SE-025 (System Verification). SE-029 (System Validation). SE-135 (MBSE paired-parallel-lattice first instance).

**Adjacent SEBoK concepts.** *System Definition*, *System Realization*, *Generic Life Cycle Model*, *System Implementation*, *System Integration*, *Vee Model*, *Process Concepts*.

**Methodology refinement candidates.** Paired-parallel-lattice formalization (second instance confirmed). Combined-name-without-combined-page D8 sub-instance. Vee-model as SEBoK-side two-axis anchor.

---

## Appendix: Originating Prompt

> *"Add an entrancing section to the /resolve landing page that navigates to the systems engineering page... continue the SEBoK entracement of the next articles"* / *"Yes. And then continue..."*

(SE-172 is the fifth of eight in batch 2/5 of the fifth-batch SEBoK distillation sweep. Stress-test: paired-parallel-lattice second instance promotes §VII.7 candidate #10 to formalization-ready. Batch 2/5.)
