# SEBoK *System Integration*, Distilled

**Top-20 distillation #14. *System Integration* is the SEBoK page that operationalizes SIPE at the composition rung. The act of integration is canonical SIPE: implemented elements (substrate) under integration constraint produce the integrated SoI's emergent capability (threshold-crossing into nameability). Six integration strategies (Big-Bang / Incremental / Top-Down / Bottom-Up / Subsets / Criterion-Driven) are alternative pin-sets at the integration rung; Doc 572 Appendix A's development-approach worked example pattern applies. The integration-vs-assembly distinction is a structural distinction the corpus apparatus reaches via the substrate-keeper composition. Five corpus forms compose; no new residuals.**

---

## I. Source

- **Page:** System Integration
- **URL:** https://sebokwiki.org/wiki/System_Integration
- **License:** CC BY-SA 3.0 (SEBoK)
- **Retrieved:** 2026-04-30

## II. Source Read

System Integration "involves taking delivery of the implemented system elements which compose the system-of-interest (SoI), assembling these implemented elements together, and performing verification and validation actions in the course of the assembly." Distinguished from production-line assembly: integration encompasses both assembly and V&V; production-line assembly is sequenced for manufacturing efficiency rather than developmental verification. Six integration strategies (often combined): Big-Bang/Global, Incremental, Top-Down, Bottom-Up, Subsets, Criterion-Driven. Process: establish plans → obtain means → take delivery with config checks → assemble per procedures → verify each aggregate. Standards: ISO/IEC 15288:2015. Position: Part 3 SE & Management, System Realization KA, between System Implementation and System Verification in the Vee bottom-up branch.

## III. Structural Read

**Form I — SIPE with Threshold (Doc 541).** Integration is canonical SIPE at the composition rung. The substrate is the set of implemented system elements (each with its own internal coherence). The constraint is the integration architecture (interface specifications, assembly procedures, expected aggregate behavior). The threshold-crossing is the moment the integrated aggregate's capability becomes nameable as the SoI's intended function — the system "operates as one" rather than as a collection. Doc 541's apparatus reads each integration step as a small SIPE producing a slightly larger nameable system, with the full SoI emerging at the final assembly threshold.

**Form III (extension) — Lattice Extension of the Ladder (Doc 572), with Appendix A pin-set siblings.** The six integration strategies are alternative pin-sets at the integration rung. Doc 572 Appendix A's development-approach worked example pattern applies precisely: an engagement may use *Top-Down at the architectural rung, Bottom-Up at the implementation rung, Criterion-Driven for risk-critical components*, with the strategies sibling-composing via rung-of-application discrimination. The corpus reads SEBoK's "often combined" framing as direct evidence for the lattice composition.

**Form III — Substrate-and-Keeper Composition (Doc 510).** The integration-vs-assembly distinction is a substrate-keeper composition distinction. Production-line assembly is keeper-supplied procedure operating on substrate-output (the elements produced by manufacturing); the keeper's discipline at this rung is throughput optimization. Integration is keeper-supplied procedure operating on substrate-output where the keeper's discipline is verification and the substrate's outputs are tested for fitness. SEBoK names them as different activities; the corpus reads them as substrate-keeper compositions with different keeper-side disciplines. Manufacturing keeper optimizes; engineering integration keeper verifies.

**Form VI — Pulverization (Doc 445), with Refinement A paired pulverization at integration.** "V&V actions in the course of the assembly" is paired pulverization in real time. Each integration step is followed by both verification (does the aggregate match its design references? — $T_I$) and validation (does the aggregate accomplish its intended sub-function? — $T_E$). Doc 445 Refinement A's notation $T = \langle T_I, T_E \rangle$ applies at every aggregate. Integration is pulverization-during-composition, distinct from end-of-life-cycle V&V (which pulverizes the completed system).

**Form IV — Pin-Art Model (Doc 270).** The integration plan, integration procedures, integration tools, integration aggregates compose pin-art at the integration activity rung. Each integration action is a pin; the plan is the pin-set sequence; the substrate (the elements being assembled) flows through the pin-set and the resulting aggregates are the shape. Pin-art at this rung is recursive: pin-art applied to the act of integration is itself a pin-art instance.

## IV. Tier-Tags

- Integration definition — π / α (well-cited; 15288).
- Integration-vs-assembly distinction — π / α (well-warranted by SE practice and INCOSE).
- Six integration strategies — π / α as cited; μ / β under corpus when read as Doc 572 Appendix A pin-set siblings.
- "V&V actions in the course of the assembly" — π / α; μ / β under corpus when read as Doc 445 Refinement A paired pulverization at every aggregate.
- Process steps (plan / means / delivery / assembly / verify) — π / α.
- "Often combined" strategy framing — π / α; μ / β under corpus when read as lattice composition with rung-of-application discrimination.

## V. Residuals

No residuals against the apparatus. The page composes cleanly with multiple confirmations of recently-landed refinements:

- Doc 572 Appendix A pin-set sibling pattern (six integration strategies).
- Doc 445 Refinement A paired pulverization (integration-time V&V).
- Doc 510 substrate-keeper composition with two distinct keeper disciplines (integration vs. assembly).

## VI. Provisional Refinements

No new candidates unique to this distillation. The page is structurally clean and provides confirmation rather than refinement surface.

The integration-vs-assembly distinction is itself an interesting structural pattern that may warrant naming separately at some point — "same substrate-keeper structure, different keeper disciplines" — but the cluster strength (one instance) does not yet warrant a refinement. Defer until a second case independent of integration/assembly supplies the second instance.

## VII. Cross-Links

**Form documents.** Doc 541 (SIPE with Threshold), Doc 572 (Lattice Extension, Appendix A pin-set siblings), Doc 510 (Substrate-and-Keeper), Doc 445 (Pulverization, Refinement A paired anchors), Doc 270 (Pin-Art).

**Part-level reformulation.** SE-006 (Part 3 — SE & Management).

**Related distillations.** SE-031 (System Architecture Design Definition — upstream; integration realizes the architecture). SE-025 (System Verification — paired in V&V). SE-029 (System Validation — paired in V&V).

**Adjacent SEBoK concepts** (per source). *System Implementation*, *System Verification*, *System Validation*, *System Transition*.

---

## Appendix: Originating Prompt

> *"Continue with next 10"*

(SE-032 is the fourteenth of twenty. *System Integration* was selected as the canonical SIPE-at-composition-rung instance and as a stress test for whether Doc 572 Appendix A's pin-set siblings reach SE realization practice. It does. No new residuals.)
