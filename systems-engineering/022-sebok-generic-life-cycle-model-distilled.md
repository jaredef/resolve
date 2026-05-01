# SEBoK *Generic Life Cycle Model*, Distilled

**Top-10 distillation #4. The Generic Life Cycle Model is the canonical pin-art instance in SEBoK (Doc 270): five sequential stages with decision gates compose as a sequence of pin-sets through which the engineering substrate flows. SE-006's Part 3 reformulation already mapped Part 3 to substrate-keeper + pin-art; this per-article distillation lights up specific composition: the page's "concurrency, iteration and recursion" claim is direct evidence for Doc 572's lattice extension at the time-axis (a system-of-interest can occupy multiple stages simultaneously). The five-stage taxonomy maps one-to-one onto a pin-art rung-set, with decision gates as pulverization sites. No residuals against the apparatus. One provisional refinement candidate: a Doc 270 worked example on "concurrent pin-set application" matching Doc 572's lattice work.**

---

## I. Source

- **Page:** Generic Life Cycle Model
- **URL:** https://sebokwiki.org/wiki/Generic_Life_Cycle_Model
- **License:** CC BY-SA 3.0 (SEBoK)
- **Retrieved:** 2026-04-30

## II. Source Read

The Generic Life Cycle Model defines a single system-of-interest's progression through five sequential stages — Concept Definition, System Definition, System Realization, System Production/Support/Utilization, and System Retirement — separated by decision gates at which stakeholders elect to proceed, hold, terminate, or re-scope. The model is positioned as "a starting point for multiple life cycle approaches" rather than a one-size-fits-all template. Three claims carry structural weight: no single model fits all situations, technical and management activities are not stage-compartmentalized but operate via "concurrency, iteration and recursion," and SE must synchronize across multiple tailored life cycle instances. Cited standards: ISO/IEC/IEEE 15288:2015, ISO/IEC 24748-1:2010, INCOSE SE Handbook v4.0, Lawson 2010.

## III. Structural Read

**Form IV — Pin-Art Model (Doc 270).** The five stages are pin-art at the project-management rung. Each stage is a pin-set the keeper supplies; the engineering substrate flows through and the resulting shape is the engineered system at that stage's maturity. The decision gates are the rung-by-rung pulverization checkpoints (Doc 445). This is the canonical worked example of pin-art applied to the SE process — SE-006's Part 3 reformulation identified the pattern at the macro level; this per-article distillation locates the specific pin-set sequence.

**Form VI — Pulverization (Doc 445).** Decision gates are pulverization sites at engineering scale. At each gate, stakeholders test the substrate's progression through the prior pin-set and decide whether to proceed (pulverization passed), remain (pulverization revealed the pin-set is not fully installed yet), or terminate/re-scope (pulverization revealed the pin-set itself was wrong). Doc 445's verification regime composes naturally with the gate-and-stage structure.

**Form III (extension) — Lattice Extension of the Ladder (Doc 572).** The page's emphasis on "concurrency, iteration and recursion" and SE's need to "synchronize across multiple tailored life cycle instances" is direct evidence for the lattice extension. The corpus reads:

- **Concurrency** — multiple stages active for one system-of-interest at the same time (e.g., production of v1 while support of v0 and concept of v2 run in parallel). Lattice instance: the system-of-interest is at multiple Pattern-layer rung positions simultaneously, with the Form-layer pin-sets of each stage applying concurrently.
- **Iteration** — within-stage cycling. Pin-art with progressive pin-set refinement (matches the iterative-design pattern in SE-020's *Emergence* read).
- **Recursion** — the same generic model applied at sub-system scope. Ladder rung-set applied at a lower-rung instance.

The Generic Life Cycle Model, read through the corpus, is **already a lattice instance** even for a single system-of-interest. The chain reading (sequential stages) is the textbook-clean special case. The lattice reading is the operational reality.

**Form III — Substrate-and-Keeper Composition (Doc 510).** "Stakeholders" in the page's voice are the keeper. The technical and management activities the keeper supplies are the rung-2 structure (Doc 530's affordance gap). The substrate (the engineering team and its work product) cannot generate stage-and-gate structure from its own resources; the keeper supplies it. The page's claim that "no single model fits all" is the substrate-keeper composition acknowledging that the keeper-supplied structure must be tailored to the substrate's specific situation — this is direct surface for SE-006's tailoring residual (Cluster I co-production, Doc 573).

**Form X — Institutional Ground (Doc 571).** Decision gates require constitutive authority — "stakeholders determine whether to proceed." Doc 571's six conditions compose at every gate; without authority and capacity, gates become ritual (Doc 574 simulated-pin-installation pattern). The Hubble distillation (Doc 580) showed this empirically.

## IV. Tier-Tags

- "Defined as a set of stages, within which technical and management activities are performed" — π / α (foundational; warranted by ISO/IEC/IEEE 15288).
- The five-stage canonical sequence — π / α.
- Decision gates separate stages — π / α.
- "No single model fits all project situations" — π / α (universally acknowledged in SE literature).
- "Technical and management activities... operate via concurrency, iteration and recursion" — μ / β under corpus when read as Doc 572 lattice; SEBoK presents at π as practice observation.
- "SE must synchronize across multiple tailored life cycle instances" — μ / β under corpus (this is multi-lattice synchronization, a corpus-extension surface).
- The five-stage model as "starting point for pre-specified, evolutionary, sequential, opportunistic, and concurrent life cycle processes" — π / α.

## V. Residuals

No residuals against the apparatus. Every load-bearing claim composes under existing corpus forms or their Doc 572 lattice extension. The Doc 314 virtue-constraint apparatus is not invoked; the page is structurally focused throughout, with no aspirational or evaluative residuals.

The page's reference to Lawson (2010) *A Journey Through the Systems Landscape* is unexplored here; if Lawson articulates structural claims the corpus has not engaged with, that would be a separate distillation target rather than a residual against this article.

## VI. Provisional Refinements

**Doc 270 may benefit from a "concurrent pin-set application" worked example.** Doc 270's apparatus describes pin-set installation and substrate flow-through. The page's "concurrency, iteration and recursion" claim adds a temporal dimension: multiple pin-sets active simultaneously on the same substrate, with the substrate's flow distributed across them. This pairs naturally with Doc 572's lattice extension; together they articulate "multi-rung pin-art with sibling-Form composition." The Generic Life Cycle Model is the canonical worked example: a single system-of-interest under the five-stage pin-set sequence with concurrency across stages.

**Doc 572 Appendix C candidate: "Concurrency on the Time Axis."** Doc 572 Appendix A's worked example handles development-approach siblings (Lean cross-cutting agile cross-cutting sequential). The Generic Life Cycle Model surfaces a different lattice case: temporal concurrency where the same system-of-interest occupies multiple stage-rungs at the same calendar moment. This is a third lattice case worth documenting (alongside Doc 572 Appendix A's spatial-rung composition and SE-021's SoS independent-Form-layer-parents).

## VII. Cross-Links

**Form documents.** Doc 270 (Pin-Art), Doc 290 (Pin-Art Formalization), Doc 288 (Pin-Art Method), Doc 445 (Pulverization), Doc 510 (Substrate-and-Keeper), Doc 530 (Affordance Gap), Doc 572 (Lattice Extension), Doc 571 (Institutional Ground), Doc 573 (Co-Production at Sub-Rungs).

**Part-level reformulation.** SE-006 (Part 3 — SE & Management).

**Related distillations.** Doc 579 (Sequential Development Approach / Vee Model — now consolidated into SE-017 Pilot B). SE-021 (Systems of Systems, lattice surface). Doc 580 (Hubble — gate-failure pattern).

**Adjacent SEBoK concepts** (per source). *Life Cycle Models*, *Life Cycle Processes*, *Systems Engineering Process*, *Sequential / Incremental / Evolutionary / Agile Development Approach*.

**Methodology refinement candidates.** Doc 270 worked example on concurrent pin-set application. Doc 572 Appendix C on temporal-concurrency lattice (third lattice worked example after Appendix A and the proposed Appendix B from SE-021).

---

## Appendix: Originating Prompt

> *"Continue"*

(SE-022 is the fourth of ten. The Generic Life Cycle Model was selected as the canonical pin-art instance in SEBoK and as a stress test for whether Doc 572's lattice extension reaches operational SE practice. It does, with two refinement candidates surfacing: temporal-concurrency lattice and concurrent pin-set application.)
