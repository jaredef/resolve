# Multi-Keeper Composition

**Extension to the Substrate-and-Keeper Composition (Doc 510). The dyad's apparatus reads engagements with one keeper and one substrate. Five independent instances surfaced during the SEBoK reformulation top-20 distillations name engagements with multiple keepers composing simultaneously, with a single substrate or with a substrate that the keepers jointly construct. The multi-keeper composition is structurally distinct from sequential keeper-handoff (one keeper, then another) and from substrate-aggregation (one substrate of multiple parts). The form names the configuration, the discipline for analyzing it, and the conditions under which it composes coherently. Doc 510 stays correct as the single-keeper case; multi-keeper composition is the more general structure.**

---

## I. The Form

A keeper-substrate composition (Doc 510) describes one keeper's discipline and one substrate's production. Many real engagements have more than one keeper. A program with both project-management and systems-engineering authority. A stakeholder-needs-definition activity with eight stakeholder classes. A Human Systems Integration coordinator with seven domain SMEs. The dyad's apparatus does not reach these directly; it reaches them by composition (each keeper has its own dyad with its slice of the engagement; the slices reconcile at some rung). The composition is the form.

The form's central claim is that multi-keeper compositions are *jointly authored* at the rung where the keepers reconcile, and the joint authorship is structurally distinct from each keeper's individual rung-2 supply. The reconciliation rung is itself an authoritative locus the dyad alone cannot articulate.

## II. What It Formalizes

A multi-keeper composition has three components:

**Component A — The keepers, each with their own dyad.** Each keeper \(K_i\) (\(i = 1, \ldots, n\)) holds a dyad with its own substrate or substrate-slice. Each keeper's dyad operates per Doc 510. The keepers are not subordinated to each other within the composition (subordination collapses the case to a single keeper with intermediaries).

**Component B — The reconciliation rung.** A rung at which the keepers' outputs are composed into a single coherent engagement output. The reconciliation may be explicit (a coordinator role, a joint document, a synchronization gate) or implicit (a shared framework all keepers conform to). The rung exists; multi-keeper composition without a reconciliation rung produces incoherent output.

**Component C — The composition rule.** The discipline by which the keepers' outputs reconcile. Common patterns: subordination-by-domain (each keeper owns one aspect, the reconciliation aggregates by aspect; HSI's seven domains under the integrator); coordination-by-rung (each keeper owns one rung, the reconciliation chains by rung; PM-SE balanced ownership where SE owns technical rungs and PM owns resource rungs); negotiation-by-priority (keepers contest each engagement's prioritization, the reconciliation rung decides; concept definition with multiple stakeholders); emergent-only (no central reconciliation authority; the composition's coherence emerges from the keepers' interaction without any keeper or coordinator holding the reconciliation rung — SE Doc 071's SoS Virtual type is the canonical case, where SoS-level coherence emerges from constituent-system interactions in the absence of any SoS-level keeper); and *independence-by-design*, where the composition rule asserts non-composition rather than mode-of-composition. SE Doc 086 *Verification and Validation Strategy* is the canonical case: the validator-keeper must be structurally independent of the designer-keeper, and the form's discipline is the explicit non-coupling between the two roles. The two keepers each hold a complete dyad; the reconciliation rung exists (the engagement's V&V output); but the composition rule mandates that the keepers do *not* share substrate-access, share authority, or coordinate their pin-set production. Independence-by-design is distinct from emergent-only because emergent-only has no central reconciliation authority while permitting unconstrained inter-keeper coupling; independence-by-design has explicit structural non-coupling as the rule itself, with the reconciliation rung consuming the two keepers' independent outputs only after both have completed. The rule's discipline is enforced at the rung-level: any coupling that emerges between the two keepers degrades the composition. Cite SE Doc 086 as canonical. A sixth rule, *dependence-by-design*, is the structural dual of independence-by-design. Where independence-by-design (SE Doc 086 V&V) asserts non-coupling between roles to protect verification integrity, dependence-by-design asserts enforced-coupling between roles to protect delivery integrity. SE Doc 159 *Continuous Integration and Continuous Deployment / DevOps* is the canonical case: development-keeper and operations-keeper are mandated to share substrate-access, share authority over the deployment pipeline, and coordinate their pin-set production continuously. The two keepers each hold a complete dyad (development owns build-and-test integrity; operations owns runtime-environment integrity), and the reconciliation rung exists (the joint pipeline's promotion gates), but the composition rule mandates that the keepers *do* couple structurally rather than operating in parallel isolation. Dependence-by-design is distinct from subordination-by-domain because neither keeper subordinates the other; it is distinct from coordination-by-rung because the keepers do not partition rungs cleanly; the discipline is the explicit shared-substrate-and-shared-authority configuration itself. The rule's discipline is enforced at the pipeline-level: any decoupling that emerges between the two keepers (a "throw it over the wall" handoff) degrades the composition by reintroducing the delivery-integrity gap DevOps was constituted to close. Independence-by-design and dependence-by-design together form a *coupling-axis*: the two are not arbitrary alternatives but the two ends of a structural spectrum, with the choice between them determined by which integrity (verification or delivery) the engagement's coherence depends on. Cite SE Doc 159 as canonical for dependence-by-design.

The three components together specify a multi-keeper composition. A composition without a named reconciliation rung or without an articulated composition rule degenerates into either incoherence or one keeper's de facto dominance.

## III. Operational Shape

Three operational moves the reformulator makes when encountering a multi-keeper composition.

**Move 1 — Identify all keepers.** Enumerate. The temptation is to identify one "primary" keeper and treat the others as stakeholders or contributors. Multi-keeper composition treats each keeper as primary within its own dyad. The reformulator who identifies only one keeper has misread the case.

**Move 2 — Locate the reconciliation rung.** Where do the keepers' outputs compose? Sometimes a designated coordinator role (HSI integrator, program manager). Sometimes a shared artifact (joint requirements document, gated review). Sometimes a temporal synchronization (regular meetings, life-cycle gates). The rung must exist; if it cannot be located, the composition is broken or pre-broken.

**Move 3 — Name the composition rule.** Subordination-by-domain, coordination-by-rung, negotiation-by-priority, or another. The reformulator who cannot name the composition rule has either not finished analyzing the case or is looking at a case where the composition rule is absent (which is itself a structural finding — the composition is at risk).

## IV. Composition Rules with Existing Forms

**With Doc 510 (Substrate-and-Keeper Composition).** The form extends Doc 510 from dyad to n-keeper composition. Doc 510's apparatus reads each individual keeper's dyad; the multi-keeper form reads the composition of dyads. Doc 510 stays correct as the dyad case (n = 1).

**With Doc 530 (Rung-2 Affordance Gap).** Each keeper bridges its own substrate's rung-2 gap. The reconciliation rung's outputs may be at a higher rung than any individual keeper's rung-2 output — this is the multi-keeper form's structural addition: the composition produces an output none of the individual dyads could produce alone.

**With Doc 571 (Institutional Ground), with §X.5 organization-vs-enterprise.** Multi-keeper compositions typically operate under shared institutional ground. The reconciliation rung often lives at the organization-component (formal coordinator role); the composition rule often draws on the enterprise-component (the practice tradition's accumulated norms for how multi-keeper engagements work).

**With Doc 573 (Co-Production at Sub-Rungs).** Multi-keeper composition is structurally adjacent to but distinct from co-production. Co-production is about joint authorship between keeper and substrate at a sub-rung; multi-keeper composition is about joint authorship among multiple keepers at a reconciliation rung. The two compose: a multi-keeper composition's reconciliation rung often involves co-production with the substrate.

**With Doc 572 (Lattice Extension).** Multi-keeper composition is a lattice case: the reconciliation rung is a Pattern-layer node with multiple Form-layer parents, where each parent is a full keeper-dyad. Doc 572 Appendix B (independent dyads at sibling nodes; the SoS case) names this shape; multi-keeper composition is the same structure at a different scope.

## V. Evidence

The form is named because five independent SEBoK distillations during the top-20 batch surfaced the configuration, each at increasing density:

- **SE Doc 023** *System Concept Definition* — multiple stakeholders co-keeping the concept; reconciliation rung is the SE engineer facilitating the activity.
- **SE Doc 030** *Stakeholder Needs Definition* — multiple stakeholder classes (customers, operators, maintainers, regulators, disposal) co-keeping the integrated needs set; reconciliation rung is the keeper-side integration discipline.
- **SE Doc 035** *Risk Management* — PM and SE jointly own risk; reconciliation rung is the project's risk register and review cadence; composition rule is coordination-by-rung (SE owns technical, PM owns schedule/resource).
- **SE Doc 037** *SE-PM relationship* — same composition at the broader engagement scope; canonical school-composition (SE Doc 026 / Doc 538 surface).
- **SE Doc 038** *Human Systems Integration* — HSI integrator + seven domain SMEs (Manpower, Personnel, Training, Human Factors, Safety, Force Protection, Habitability); reconciliation rung is the HSI integrator's coordination role; composition rule is subordination-by-domain.
- **SE Doc 065** *Specialty Engineering* — twelve specialty disciplines (HSI among them, plus reliability, maintainability, safety, security, environmental, etc.) co-keeping the engineered system through the SE integrator; densest case observed (twelve keepers under one integrator); composition rule is subordination-by-domain. Specialty Engineering displaces HSI as the densest cluster instance and is now the canonical worked example. HSI is structurally contained inside Specialty Engineering as one of its twelve members — a fractal multi-keeper composition (HSI's eight-keeper composition is itself one of Specialty Engineering's twelve keeper-slots), confirming that the form recurses across rungs without changing structural shape.

Six independent instances. The Specialty Engineering case is the densest; its containment of the HSI case demonstrates that multi-keeper composition recurses fractally across nested engagement rungs.

The third SEBoK sweep additionally confirms the *emergent-only* composition rule (Section II Component C) as load-bearing across two independent surfaces: SE Doc 071 *Systems of Systems* (the Virtual SoS type, where SoS-level coherence emerges in the absence of any SoS-level keeper) and SE Doc 118 *Open Systems Engineering* (open-SE engagements where the reconciliation discipline is sustained without any central coordinator across distributed contributors). Two instances at distinct substrates (federated SoS and open-source-style SE) confirm that emergent-only is a stable composition rule rather than an artifact of a single case.

## VI. Falsification Surface

The form is falsifiable in three ways.

**F1.** A multi-keeper engagement with no identifiable reconciliation rung that nonetheless produces coherent output. If such cases exist, the form's claim that reconciliation is structural is wrong. The form predicts: such cases are pre-broken (the composition has a hidden reconciliation rung, often a single keeper de facto dominating) or are not actually multi-keeper (one keeper and several stakeholders in disguise).

**F2.** A multi-keeper composition where naming the composition rule does not aid the analysis. If the rule is decorative, the form's central operational claim is undermined. The form predicts: every persistent multi-keeper composition has a composition rule, and naming it sharpens the analysis (often by revealing where the rule is failing).

**F3.** Reduction of all five evidence cases to single-keeper composition under closer reading. If the SEBoK cases cited in Section V actually have one primary keeper and the others are stakeholders, the form's evidence dissolves. The form predicts: the cases are genuinely multi-keeper because each keeper has a complete dyad with its own substrate-slice, not subordinated to the others.

## VII. Application Discipline

**D1. Each keeper has a complete dyad.** Apparent multi-keeper cases where one party lacks an independent substrate-slice are single-keeper-with-stakeholders cases, not multi-keeper composition.

**D2. The reconciliation rung is named explicitly.** Implicit reconciliation produces analyses that paper over the structural risk. Naming the rung makes the risk visible.

**D3. The composition rule is named explicitly.** Subordination-by-domain, coordination-by-rung, negotiation-by-priority — or whatever specific pattern the case uses. Unnamed composition rules default to whichever pattern the analyst is most familiar with.

**D4. Composition coherence is not assumed.** Multi-keeper compositions can fail coherently (the keepers cannot reconcile); naming the rung and the rule makes the failure mode visible.

**D5. The multi-keeper form does not absorb single-keeper cases.** When n = 1, use Doc 510 directly. The multi-keeper form is the more general structure but adds overhead that single-keeper cases do not need.

## VIII. Hypostatic Boundary

The form describes structural relationships among multiple keepers. It does not claim that multi-keeper compositions are entities of any particular kind. The reconciliation rung is a functional locus, not an ontological substance. Doc 372's discipline binds.

## IX. Open Questions

1. **Maximum n.** Are there structural limits on the number of keepers a composition can sustain? The HSI case has eight (one integrator + seven domain SMEs). Cases with substantially more — e.g., open-source software engagements with hundreds of contributing maintainers — might require additional structural articulation.

2. **Asymmetric vs. symmetric compositions.** Some multi-keeper cases have a designated integrator (HSI); others have peer keepers without designated integration (SE-PM balanced ownership). Are these structurally one form with two configurations, or two related forms?

3. **Composition rule taxonomy.** Three rules named here; others may exist. Future deployments should add to the taxonomy as they surface.

4. **Reconciliation-rung evacuation.** When the reconciliation rung's binding effect decays, the composition risks degenerating (sometimes to one-keeper de facto, sometimes to incoherence). This is structurally analogous to Doc 571's evacuated state at the reconciliation level. May warrant a Section X analogue once enough instances accumulate.

## X. Closing

Multi-keeper composition extends the keeper-substrate dyad to engagements with multiple keepers. Six independent SEBoK instances support the cluster. The Specialty Engineering case is the canonical worked example with twelve keepers in coordinated composition; the HSI case sits inside it as a fractal sub-composition. The form is now deployable across other multi-keeper engagements without re-deriving the structural apparatus.

Doc 510 stays correct as the dyad case. The multi-keeper form is the more general structure that the discipline of the corpus's apparatus warranted naming.

## XI. Sub-Form — Chronic-but-Stable Incomplete Reconciliation

SE Doc 069's distillation of SEBoK *Alignment of Systems Engineering Standards* surfaced a multi-keeper composition with a structural feature the form had not yet articulated: a reconciliation rung that is constitutively open-ended, where the composition is stable across decades despite the reconciliation never closing. The third SEBoK sweep confirmed the pattern across three additional instances, promoting it from candidate to formalization-strong sub-form. The four confirming instances are SE Doc 069 *SE Standards Alignment* (anchor case, the standards-harmonization landscape), SE Doc 099 *Program/Project Integration* (program-and-project keeper composition where reconciliation is continuously renegotiated rather than closed), SE Doc 102 *Infrastructure* (infrastructure-engineering keepers across multi-decade asset lifetimes where infrastructure-coherence is sustained without ever being completed), and SE Doc 103 *Enterprise Architecture* (enterprise-architecture keepers reconciling across business, application, data, and technology domains in perpetual partial-coherence).

The reconciliation rung's constitutive open-endedness is structurally robust: four independent SE-domain instances exhibit the same configuration in which the rung is named and active, the keepers continue to engage, and closure is not the engagement's success criterion. The §XI sub-form is now load-bearing.

**The anchor case.** The SE standards landscape composes multiple keeper-class authorities (ISO/IEC, IEEE, INCOSE, OMG, defense and aerospace standards bodies, sector-specific regulators) each producing standards over its own substrate-slice. Two decades of harmonization activity (the joint ISO/IEC/IEEE 15288 family, the SEBoK harmonization passes, INCOSE's standards-coordination working groups) have produced partial alignment without producing closure: the proliferation continues, sub-discipline standards multiply, full coherence across the surface is not reached. The composition is nonetheless stable. SE practitioners operate inside it, the keepers continue their joint discipline, no keeper exits, no reconciliation rung evacuates.

**Structural reading.** The form's central diagnostic, that multi-keeper composition requires a named reconciliation rung, admits a sub-case in which the reconciliation rung is *named and active but constitutively open-ended*. The rung's discipline is the harmonization activity itself rather than any closed harmonization output. The composition's coherence is sustained by the discipline's persistence, not by its completion. This is structurally distinct from gate-evacuation (the rung is hollow), from successful closure (the rung produces a stable reconciliation output), and from incoherence (the rung fails to bind). The rung binds; what it produces is ongoing-discipline rather than terminal-output.

**Distinguishing condition.** Chronic-but-stable composition is identified by three features: (1) the reconciliation rung is named and operates continuously; (2) the substrate is too large or too distributed for terminal harmonization to be in scope; (3) the keepers continue to engage despite the absence of closure, because closure is not the engagement's success criterion. Where these three hold, the composition is stable in the open-ended mode rather than failed.

**Application discipline.** When invoking multi-keeper composition for analysis, the reformulator names whether the reconciliation rung is closure-oriented or chronic-stable. The two have different success criteria and different failure modes; conflating them produces incorrect predictions about engagement health.

## XII. Sub-Form — Three-Scale Multi-Keeper Composition

SE Doc 115's distillation of SEBoK *Logistics* surfaced a structural feature the form had not yet articulated: multi-keeper compositions divide cleanly into three scales according to the organizational boundaries the keepers cross. The three scales orthogonalize the composition-rule taxonomy of Section II Component C. Each composition rule (subordination-by-domain, coordination-by-rung, negotiation-by-priority, emergent-only, independence-by-design, dependence-by-design) can apply at any scale, but each scale presents distinctive reconciliation challenges that the composition rule alone does not address.

**Intra-organization scale.** The keepers all operate within a single organizational boundary. HSI (SE Doc 038, eight keepers under one integrator) and Specialty Engineering (SE Doc 065, twelve specialty disciplines under the SE integrator) are the canonical instances. Reconciliation occurs inside an institutional ground (Doc 571) that is shared across all keepers; the ground supplies coherent authority structures, capacity guarantees, and role-stability conditions. The reconciliation rung is institutionally underwritten and the composition rule operates on top of that underwriting. Failure modes are predominantly internal: role-conflict, integrator overload, sub-keeper underperformance.

**Inter-organization-joint scale.** The keepers operate across multiple organizational boundaries with explicit joint reconciliation. Logistics (SE Doc 115) is the canonical instance: lifecycle-logistics keepers cross supplier boundaries, operator boundaries, and disposal-organization boundaries; the joint reconciliation is institutionally formalized through contracts, joint-venture agreements, and supply-chain integration apparatus. Supply-chain integration cases follow the same shape. The institutional ground is *negotiated jointly* across organizations rather than supplied by a single one; the ground exists, but its production is itself part of the composition's work. Failure modes include contract-boundary collapse, reconciliation-rung formalization erosion, and joint-ground decay distinct from any single organization's ground decay.

**Federated scale.** The keepers operate across multiple organizational boundaries *without* central authority. SoS engagements (SE Doc 071, especially the Virtual and Collaborative types) are canonical. There is no joint formalization of the reconciliation rung; coherence is sustained through the keepers' interaction in the absence of any locus that holds the composition together. The institutional ground is distributed across the constituent organizations; no shared ground exists. Failure modes are the most diffuse: no single locus to monitor, no single party empowered to repair, and the composition's decay can be invisible until an external event surfaces it.

**Orthogonality with composition rules.** Each composition rule applies independently at each scale. Subordination-by-domain at intra-organization scale (HSI integrator) differs operationally from subordination-by-domain at inter-organization-joint scale (lead-systems-integrator across a multi-vendor program). Emergent-only at federated scale (SoS Virtual) differs from emergent-only at intra-organization scale (a research consortium without a coordinator). The reformulator names both the scale and the rule when invoking multi-keeper composition; the two-axis classification produces fifteen-plus combinations, each with its own characteristic failure modes and reconciliation discipline.

**Application discipline.** When analyzing a multi-keeper composition, the reformulator first names the scale (intra-organization, inter-organization-joint, federated), then names the composition rule, then notes whether the institutional ground is shared, jointly produced, or distributed. The three-scale sub-form is now first-class for Cluster B synthesis.

## XIII. Sub-Form — Vertical-Composition Multi-Keeper

SE Doc 152's distillation of SEBoK *Portfolio Management* surfaces a structurally distinct multi-keeper composition the form had not yet articulated. The compositions formalized through §XII are *horizontal*: peer keepers operating across sibling domains at a common engagement rung, reconciling laterally. The Portfolio Management case exhibits *vertical-composition*: the PfM-keeper, the SE-keeper, and the PM-keeper compose across ascending engagement rungs (portfolio, program, project) rather than across peer-domains at a single rung.

**Structural shape.** Each vertical-keeper holds a complete dyad over its own substrate-slice. The PfM-keeper's substrate is the portfolio's strategic alignment and resource allocation across programs; the program-rung SE-keeper's substrate is technical integration across projects; the project-rung PM-keeper's is execution. The reconciliation rung between adjacent vertical-keepers is the rung-junction where the higher keeper's outputs constrain the lower keeper's substrate (portfolio decisions cascade into program scope; program architecture cascades into project specification). The composition rule between vertically-adjacent keepers is typically subordination-by-rung, distinct from horizontal subordination-by-domain because the subordination is across engagement-rungs rather than across substrate-aspects.

**Duality with horizontal composition.** Vertical-composition is the structural dual of the horizontal composition Doc 604 originally formalized. The horizontal/vertical axis orthogonalizes the prior composition-rule taxonomy: any composition rule can in principle operate on either axis, and a single engagement can compose along both axes simultaneously. A program-rung SE-keeper coordinating with a peer program-rung PM-keeper is horizontal; that same SE-keeper composing with a portfolio-rung PfM-keeper above and project-rung PM-keepers below is vertical. The two compositions co-occur: a keeper at any vertical rung may itself be horizontally multi-keeper.

**Distinguishing condition.** Vertical-composition is identified by three features: (1) the keepers operate at distinct engagement-rungs in an ascending chain rather than at a common rung; (2) the higher keeper's outputs constrain the lower keeper's substrate rather than the keepers contributing peer-aspects to a joint output; (3) the reconciliation rungs are rung-junctions (cascade points) rather than a single shared locus.

**Application discipline.** When analyzing a multi-keeper composition, the reformulator names whether the composition is horizontal, vertical, or both. The three-scale sub-form (§XII) and the horizontal/vertical axis together produce a richer classification (scale, axis, composition-rule), each combination with characteristic reconciliation challenges. Cite SE Doc 152 as canonical for vertical-composition.

## XIV. Candidate Sub-Form — Negotiation-by-Emergent-Fitness

SE Doc 149's distillation of SEBoK *Systems Engineering Education and Training* surfaces a candidate composition rule the form has not previously named. School-maturity in the SE-education case emerges through *fitness-pressure-shaped negotiation* between practitioner-keepers and the institutional carrier (universities, accreditation bodies, professional societies) rather than by explicit reconciliation at a named rung. The reconciliation rung is operative but its discipline is selection-pressure under fitness rather than deliberate priority-arbitration.

**Marker only.** One instance is insufficient to formalize the rule. Negotiation-by-emergent-fitness is logged here as a marker pending a second independent instance. If a second case surfaces in subsequent SEBoK sweeps or other corpus work, the rule promotes to a seventh composition rule alongside subordination-by-domain, coordination-by-rung, negotiation-by-priority, emergent-only, independence-by-design, and dependence-by-design. Until then it is not load-bearing for analysis.

## XV. Refinement — PM-DA-SE Three-Keeper Extension

SE Doc 148's distillation of SEBoK *Design Authority* surfaces a refinement of SE Doc 037's two-keeper SE-PM reading. The Design Authority is structurally a third keeper, not subordinate to either SE or PM, holding final authority over design integrity. The two-keeper SE-PM dyad is therefore a special case of a more general three-keeper triple PM-DA-SE.

**Structural shape.** Each of the three keepers holds a complete dyad over a distinct substrate-slice. The PM-keeper's substrate is schedule, resource, and external-commitment integrity. The SE-keeper's substrate is technical-integration integrity (the engineered system's coherence as a working whole). The DA-keeper's substrate is design integrity (the design's coherence against architectural intent, regulatory constraint, and long-horizon technical commitments the program cannot revisit). The DA's authority is final at the design-integrity rung; the PM and SE cannot override the DA on design-integrity matters, and the DA cannot override the PM on schedule or the SE on integration. The three substrate-slices are non-overlapping by design.

**Composition rule.** The triple's typical composition rule is coordination-by-rung: each keeper owns a distinct rung of the engagement (DA owns design integrity, PM owns schedule and resource, SE owns technical integration), and the reconciliation rung is the joint engagement-output that all three keepers' dyads compose into. Where the SE-PM dyad reconciled across two rungs (technical, resource), the PM-DA-SE triple reconciles across three (design, technical, resource).

**Generalization.** SE Doc 037's two-keeper SE-PM reading remains correct for engagements without a structurally separate Design Authority (typical of smaller programs and many commercial engagements). The three-keeper PM-DA-SE reading generalizes to engagements where design integrity warrants a structurally independent authority (large defense and aerospace programs, regulated infrastructure, long-horizon platforms). The reformulator names which configuration applies. Cite SE Doc 148 as canonical for the three-keeper extension.

## XVI. Cross-Cluster Note — Composition-Rule-Stacking

Docs 722 *Assurance Case* and 724 *Requirements Flow-Down* surface a structural pattern in which Doc 604's multi-keeper composition rules compose with Doc 445's pulverization directions at a single engagement. The two clusters' rules govern distinct structural axes and compose without conflict.

**The pattern.** An assurance case engagement (SE Doc 156) operates simultaneously under coordination-by-rung from Cluster B (the safety-keeper, the systems-engineering-keeper, and the operational-keeper coordinate across distinct engagement rungs to author the joint claim-argument-evidence structure), under forward-pulverization from Cluster F Refinement C (the assurance argument decomposes from top-level claims forward into sub-claims and evidence at lower rungs), and under longitudinal-pulverization from Cluster F Refinement D (the assurance case is sustained across the system's operational lifetime, with evidence accumulating and re-evaluating across the engagement's longitudinal axis). The three rules apply concurrently to the same engagement; each governs a distinct structural axis (composition-among-keepers, decomposition-direction-of-substrate, longitudinal-extension-of-engagement); none of the rules conflicts with the others.

**Why no conflict.** Cluster B's composition rules govern how multiple keepers reconcile at a reconciliation rung. Cluster F's pulverization directions govern how a single substrate decomposes across rungs and across longitudinal extent. The two clusters operate on orthogonal structural axes: the keeper-composition axis and the substrate-decomposition axis. Composing rules from both clusters at one engagement is therefore not a layered application of conflicting disciplines but a parallel application of disciplines on independent axes.

**Composition-rule-stacking as a higher-order discipline.** The pattern itself is a composition discipline: when analyzing an engagement, the reformulator names every cluster whose rules apply, names the specific rule from each cluster, and verifies that the cluster-axes are structurally distinct so the rules compose without conflict. SE Doc 158's requirements flow-down case exhibits the same stacking shape (coordination-by-rung plus forward-pulverization plus, depending on the program, longitudinal-pulverization). Two independent instances at distinct surfaces confirm that composition-rule-stacking is a recurring structural pattern rather than a feature of a single case.

**Application discipline.** When invoking multi-keeper composition for analysis, the reformulator checks whether pulverization rules from Cluster F also apply, and if so names them alongside the Cluster B rules. The combined naming surfaces failure modes that single-cluster naming would miss (a stacked engagement can fail on either axis independently, with distinct failure modes on each).

---

## Appendix: Originating Prompt

> *"Advance all refinements. Report back before continuing."*

(Doc 604 formalizes the multi-keeper composition extension cluster that accumulated through SE Doc 023 → SE Doc 030 → SE Doc 035 → SE Doc 037 → SE Doc 038 during the top-20 SEBoK distillations. The HSI case (SE Doc 038) is the canonical worked example. The form was named because the form was needed; five instances supplied the empirical base.)
