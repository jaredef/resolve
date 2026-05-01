# SEBoK *Risk Management*, Distilled

**Top-20 distillation #17. *Risk Management* is the SEBoK page that operationalizes pulverization (Doc 445) at the pre-event rung — pulverizing potential failure modes before they manifest. The four risk treatment options (Assumption / Avoidance / Control / Transfer) are sibling-pin-set composition (Doc 572 Appendix A pattern) at the response rung. The opportunity-vs-threat asymmetry ("positive utility from improving expected outcomes is considerably less than negative utility from failing to meet expectations") is empirical evidence for an asymmetric SIPE pattern (SE-020 negative-property SIPE candidate confirmed). The "lack of continuity" pitfall is canonical authority-evacuation pattern (Doc 574). Six corpus forms compose; one provisional refinement candidate (Doc 445 worked example: forward-pulverization vs backward-pulverization).**

---

## I. Source

- **Page:** Risk Management
- **URL:** https://sebokwiki.org/wiki/Risk_Management
- **License:** CC BY-SA 3.0 (SEBoK)
- **Retrieved:** 2026-04-30

## II. Source Read

Two risk definitions: "the effect of uncertainty on objectives" (ISO/IEC/IEEE 15288, ISO 31000) — allows positive or negative; and "the combination of the probability of occurrence of harm and the severity of that harm" (ISO Guide 51, ISO 14971) — negative-only, used in safety. Five integrated activities: Planning (RMP) → Identification (WBS, brainstorming, taxonomies, if-then descriptions) → Analysis (decision trees, Monte Carlo, payoff matrices, qualitative scales) → Treatment (Assumption / Avoidance / Control / Transfer) → Monitoring. Opportunity management mirrors risk management but the asymmetry favors loss-aversion. Pitfalls: lack of continuity, process over-reliance, "Sea of Green," band-aid treatments. Standards: ISO 15288:2023, ISO 31000:2018, ISO/IEC/IEEE 16085:2021, ISO 31010:2019, ISO 31073, ISO Guide 51, ISO 22367, ISO 14971, ISO 27000, SAE J3307. Position: Part 3 SE & Management > Technical Management Processes > between Requirements Management and Configuration Management.

## III. Structural Read

**Form VI — Pulverization (Doc 445), forward-pulverization mode.** Risk management is pulverization applied before the failure occurs rather than after. Conventional pulverization (Doc 445) tests an artifact against its references and surfaces residuals. Risk identification surfaces *candidate failure modes* — residuals of a hypothetical future state — before the engagement encounters them. Risk analysis pulverizes each candidate (probability × consequence). Risk treatment pre-empts the residual by shifting the engagement away from the failure mode. This is the same form's apparatus run forward in time; the "if-then" or "condition-consequence" risk descriptions are exactly residual statements with their causal antecedents made explicit.

**Form III (extension) — Lattice Extension of the Ladder (Doc 572), with Appendix A pin-set siblings at the response rung.** The four risk treatment options (Assumption / Avoidance / Control / Transfer) are sibling pin-sets at the response rung. An engagement may *Assume* low-impact risks while *Controlling* technical risks while *Transferring* schedule risks while *Avoiding* high-uncertainty paths altogether. Doc 572 Appendix A's pin-set sibling pattern applies: the discriminator is per-risk classification (each risk gets one treatment), not rung-of-application. Hybrid strategies are explicitly named in SE practice; the corpus reads them as natural lattice composition.

**Form I — SIPE with Threshold (Doc 541), with SE-020 negative-property worked example confirmed.** The opportunity-vs-threat asymmetry — "positive utility from improving expected outcomes is considerably less than negative utility from failing to meet expectations" — is direct evidence for the asymmetric structure of SIPE SE-020 surfaced as a candidate. Negative-property SIPE (system-wide failure crossing into operational nameability) carries different structural properties than positive-property SIPE (system-wide capability crossing into operational nameability). The asymmetry is empirical: the same probability of magnitude favors the negative side under prospect-theoretic loss aversion. SE-020's candidate refinement is now well-supported with two empirical instances (the 2003 blackout from SE-020 and the systemic loss-aversion pattern named here).

**Form XII — Authority Evacuation (Doc 574 / Doc 571 evacuated state).** "Lack of continuity" as a major pitfall — risk management "will be ineffective if it's done just to satisfy project reviews" — is canonical authority evacuation. The risk management role exists formally; its binding effect is hollow because the discipline is performed only at gate reviews rather than continuously. The "Sea of Green" pitfall (treatment plan indicators appearing acceptable while actual risk remains unaddressed) is simulated-pin installation (Doc 574 Pattern B): the pin-set is documented; the substrate routes around it.

**Form XI — Co-Production at Sub-Rungs (Doc 573).** "Balanced ownership... between project management and systems engineering" is co-production at the risk management rung. Two co-keepers (PM and SE) hold the risk management discipline jointly; neither owns it alone. This is another instance of the multi-keeper composition extension candidate (Doc 510 / SE-023 / SE-030).

**Form IV — Pin-Art Model (Doc 270).** The five integrated activities (Planning → Identification → Analysis → Treatment → Monitoring) are pin-art at the risk discipline. Each activity's outputs constrain the next; the substrate (the project's accumulated risk knowledge) flows through; the resulting shape is the project's risk-managed posture. The cited 41 risk assessment techniques (ISO 31010:2019) are method-set diversity within the analysis activity.

## IV. Tier-Tags

- Two risk definitions (ISO 15288 vs ISO Guide 51) — π / α (well-cited).
- Five-activity process (Planning / Identification / Analysis / Treatment / Monitoring) — π / α.
- Four treatment options (Assumption / Avoidance / Control / Transfer) — π / α as cited; μ / β under corpus when read as Doc 572 Appendix A pin-set siblings.
- Opportunity-threat asymmetry (loss aversion) — π / α as cited; μ / β under corpus when read as confirmation of SE-020 negative-property SIPE asymmetry.
- "Lack of continuity" pitfall — π / α as cited; μ / β under corpus when read as Doc 574 authority evacuation.
- "Sea of Green" pitfall — π / α; μ / β under corpus when read as Doc 574 simulated-pin installation.
- "Balanced ownership between PM and SE" — π / α; μ / β under corpus as multi-keeper composition.
- 41 risk assessment techniques — π / α as cited (ISO 31010).

## V. Residuals

No structural residuals against the apparatus. The page provides confirmations:

- SE-020 negative-property SIPE candidate — second instance now in hand.
- Doc 572 Appendix A pin-set siblings — fifth instance.
- Doc 574 authority evacuation patterns — third independent confirmation (Hubble, FBI VCF, now risk-management pitfalls).
- Multi-keeper composition extension — third independent instance.

## VI. Provisional Refinements

**Doc 445 worked example: forward-pulverization vs backward-pulverization.** Pulverization as articulated in Doc 445 operates after the artifact exists. Risk management is pulverization applied to potential future states — *forward-pulverization*. The "if-then" risk format is structurally a residual statement with its causal antecedent made explicit. This is a temporal generalization of pulverization that the SE discipline has been doing for decades and the corpus has not explicitly named. Worth a Doc 445 worked example or extension articulating the forward / backward distinction:

- *Backward-pulverization* (Doc 445 canonical): test artifact against references; surface residuals.
- *Forward-pulverization* (this distillation): test candidate future failure modes against current substrate; surface preemptive residuals; treat to shift the engagement away from the failure mode.

The form is the same; the temporal direction differs. Forward-pulverization composes naturally with Doc 445 Refinement A's two-anchor pattern (forward-verification and forward-validation are both possible) and Refinement B's six rigor levels.

## VII. Cross-Links

**Form documents.** Doc 445 (Pulverization, Refinement A and B; forward-pulverization candidate), Doc 572 (Lattice Extension, Appendix A pin-set siblings), Doc 541 (SIPE with Threshold, asymmetric / negative-property worked example), Doc 574 (Authority Evacuation), Doc 573 (Co-Production), Doc 270 (Pin-Art).

**Part-level reformulation.** SE-006 (Part 3 — SE & Management).

**Related distillations.** SE-020 (Emergence — negative-property SIPE first instance). Doc 580 (Hubble — risk-realized failure case). SE-036 (Decision Management — companion technical management process).

**Adjacent SEBoK concepts** (per source). *Decision Management*, *Configuration Management*, *Project Assessment and Control*, *Requirements Management*, *System Theoretic Process Analysis (STPA)*.

---

## Appendix: Originating Prompt

> *"Continue with next 10"*

(SE-035 is the seventeenth of twenty. *Risk Management* was selected as the canonical operational instance of pulverization-applied-forward-in-time. The structural reformulation surfaces a clean refinement candidate — forward-pulverization vs backward-pulverization — and provides three independent confirmations of recently-landed refinements.)
