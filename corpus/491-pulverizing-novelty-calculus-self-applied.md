# Pulverizing the Novelty Calculus: Self-Applied Audit Against Scientometrics and Patent Novelty Assessment

## What this document does

[Doc 490](/resolve/doc/490-novelty-calculus-for-conjectures) §10 predicted that the novelty calculus, when audited against scientometrics and patent novelty assessment literatures, would substantially retire its own claim to methodological novelty. The keeper has approved running the prediction. This document executes it.

The discipline requires both a literature audit and a self-application: §1-3 audit Doc 490 against the relevant external literatures; §4 performs per-claim subsumption analysis; §5 applies Doc 490's own metric to itself; §6 reports whether the calculus self-deflates as predicted; §7 names honest limits; §8 states the position.

The audit returns substantial subsumption. The calculus applied to itself returns tier \(\beta\) (mostly subsumed, small residue) with confidence 0.7. This matches the prediction. The discipline holds: Doc 490 does not special-plead itself out of its own protocol.

## 1. The scientometric literature on scientific novelty measurement

WebSearch on 2026-04-25 identified a substantial scientometric literature spanning 2013 to 2025 on the formal measurement of scientific novelty. The canonical and recent items:

**Uzzi, Mukherjee, Stringer, & Jones (2013).** *Atypical Combinations and Scientific Impact*. *Science* 342(6157):468-472. Operationalizes novelty via the *atypicality of journal pair combinations* in a paper's references. Two summary measures: median z-score (central tendency of conventionality) and 10th-percentile z-score (tail novelty). Empirical finding: papers with high median conventionality plus high tail novelty are most likely to become highly cited. The two-dimensional decomposition (conventionality + atypicality) is a direct ancestor of any multi-dimensional novelty score.

**Wu, Wang, & Evans (2019).** *Large Teams Develop and Small Teams Disrupt Science and Technology*. *Nature* 566(7744):378-382. Introduces the *Consolidation-Disruption (CD) index*: a measure of whether a paper consolidates prior work or disrupts it. The disruption index has become a standard novelty-related measure. Funk & Owen-Smith (2017) provide an earlier disruption-style measure.

**Wang, Veugelers, & Stephan (2017).** *Bias against Novelty in Science*. *Research Policy* 46(8). Empirical work on how novelty is rewarded or penalized in scientific publication and citation. Informs how a novelty measure should be interpreted.

**Foster, Rzhetsky, & Evans (2015).** *Tradition and Innovation in Scientists' Research Strategies*. *American Sociological Review* 80(5). Distinguishes traditional (consolidating) from innovative (recombining or jumping) research strategies. Multi-strategy taxonomy.

**Lee, Walsh, & Wang (2015).** *Creativity in Scientific Teams: Unpacking Novelty and Impact*. *Research Policy* 44(3). Decomposes novelty empirically across team-level features.

**Trapido (2015).** *How Novelty in Knowledge Earns Recognition*. *Research Policy* 44(8). Reception-side analysis of what kinds of novelty are recognized.

**Lin, Wang, et al. (2025).** *A Review on the Novelty Measurements of Academic Papers*. *Scientometrics*. arXiv:2501.17456. Recent review of the field's novelty-measurement approaches. Surveys atypicality, disruption, recombination, knowledge-flow, and other categories.

**Wang, Z., Wang, Z., Zhang, Luczak-Roesch, & Chen (2025).** *A Hybrid Graph and LLM Approach for Measuring Scientific Novelty Via Knowledge Recombination and Propagation*. SSRN 5257437. Recent LLM-augmented novelty measurement.

**Novelpy.** Open-source Python package implementing multiple bibliometric novelty and disruptiveness measures across both bibliometric and patent data.

**Generative AI and the future of scientometrics** (arXiv:2507.00783, 2025). Recent overview of how LLMs are entering scientometric measurement specifically.

The scientometric literature has therefore developed: continuous numerical scoring systems (z-scores, CD index), multi-dimensional decompositions (Uzzi-Mukherjee's two dimensions), reception-side analyses (Trapido, Wang-Veugelers-Stephan), and (most recently) LLM-augmented hybrid approaches (Wang et al. 2025). Doc 490's calculus is operating in the territory this literature has charted.

## 2. The patent novelty assessment literature

WebSearch on 2026-04-25 identified the formal patent-novelty assessment frameworks at the major patent offices.

**USPTO.** Reviews claimed inventions for compliance with 35 U.S.C. 102 (novelty) and 35 U.S.C. 103 (non-obviousness). The protocol: compare the claimed subject matter to prior art; if no differences, reject for lack of novelty. Patent novelty is per-claim: each independent and dependent claim is examined separately against prior art. The *Manual of Patent Examining Procedure* §2103 provides the formal procedural specification.

**EPO.** Defines prior art per Article 54 EPC. The 2026 EPO Guidelines state the novelty standard: the claimed subject-matter must not be "clearly and unambiguously disclosed in the prior art." Per-claim assessment is standard. Only prior art whose technical teaching can be reproduced is destructive of novelty.

**WIPO.** Coordinates international patent novelty standards via the Patent Cooperation Treaty (PCT). International search reports identify prior art relevant to the claimed inventions.

**Three core patentability criteria.** Patent law decomposes patentability into three independent criteria: novelty (not previously disclosed), non-obviousness/inventive step (not trivially derivable from prior art), and utility/industrial applicability. The three are independent dimensions assessed separately.

**AI-generated prior art** (2024-2025 EPO and USPTO guidance). Recent updates address how AI-generated material is treated in prior-art analysis. Doc 490's calculus, which applies to AI-mediated dyadic-practice conjectures, intersects this active area.

The patent law tradition therefore provides: a formal per-claim audit protocol (centuries old, refined continuously), a multi-criteria decomposition (novelty, non-obviousness, utility), explicit standards for what counts as disclosure, and recent extensions to AI-generated content. Doc 490's calculus borrows the per-claim structure and the multi-criteria decomposition from this tradition without naming it.

## 3. Per-claim subsumption analysis on Doc 490

Doc 490 makes ten named claims. Each is now audited.

**C1: Novelty is multi-dimensional, with four specific dimensions (component, synthesis, application, methodology).**

The multi-dimensional framing is subsumed under Uzzi-Mukherjee's two-dimensional (conventionality + atypicality) framework, the patent-law three-criteria decomposition (novelty, non-obviousness, utility), Wu-Wang-Evans's disruption-consolidation distinction, and the Lin-Wang 2025 review's category survey. The specific four dimensions (component/synthesis/application/methodology) are distinct from the canonical decompositions but constitute a re-naming move rather than a structural advance. **Subsumption: \(s = 0.25\)** (substantially subsumed, small residue in the specific four-dimension naming).

**C2: Per-claim audit protocol assigning \(s\_i\), \(a\_i\), \(w\_i\).**

Patent law has been performing exactly per-claim novelty audit for over a century. The protocol decomposes a patent application into independent and dependent claims, audits each against prior art, and assigns a result per claim. Doc 490's per-claim protocol is the patent-law protocol applied to a different kind of artifact (corpus conjecture vs. patent application). **Subsumption: \(s = 0\)** (fully subsumed).

**C3: Five-point subsumption scale (\(s\_i \in \{0, 0.25, 0.5, 0.75, 1\}\)).**

Patent law uses binary novelty assessment (novel vs. anticipated). EPO uses "clearly and unambiguously disclosed" standard. Bibliometric measures are continuous (z-scores, CD index). Doc 490's specific five-point granularity is a corpus convention; the scoring concept itself is canonical, but the five-point operationalization is not in the literature surveyed. **Subsumption: \(s = 0.5\)** (partially subsumed; scoring concept canonical, granularity corpus-specific).

**C4: Three-point audit-thoroughness scale (\(a\_i\)).**

Patent law has "search reasonably calculated to identify" standards but no formal three-point thoroughness scale. Bibliometric work assumes thorough audit (full database coverage) and does not separate audit-thoroughness as an independent dimension. Doc 490's explicit treatment of audit-thoroughness as a separate dimension is somewhat distinctive within the surveyed literature. **Subsumption: \(s = 0.5\)** (partially subsumed).

**C5: Three-point importance-weight scale (\(w\_i\)).**

Patent law treats independent claims as weightier than dependent claims for invalidity purposes. Bibliometric work uses citation-count weighting and reference-pair weighting. Importance weighting per claim is standard in both literatures. Doc 490's specific three-point scale is a corpus convention. **Subsumption: \(s = 0.25\)** (substantially subsumed, granularity corpus-specific).

**C6: Aggregate \(\nu\) as weighted sum across dimensions.**

Linear weighted aggregation across multi-dimensional measures is standard in both bibliometrics and patent novelty assessment. The Uzzi-Mukherjee paper uses two dimensions; aggregating into a single hit-likelihood score is canonical practice. Doc 490's weighted-sum formula is not novel; it is standard linear aggregation. **Subsumption: \(s = 0\)** (fully subsumed).

**C7: Confidence formula \(\text{conf}(\nu) = 1 - \overline{1 - a\_i}\).**

Confidence intervals on novelty measurements exist in bibliometrics. The specific formula is a simple average of audit-thoroughness scores and is corpus-specific. The conceptual move (uncertainty modulated by audit completeness) is standard; the specific formula is not. **Subsumption: \(s = 0.5\)** (partially subsumed).

**C8: Five reporting tiers \(\alpha\) through \(\epsilon\).**

Patent novelty has binary reporting (novel/anticipated). Bibliometric novelty has continuous scores often reported as percentiles or rank. Five-tier reporting is a corpus presentation convention; not novel as a measurement decision, but a specific design choice. **Subsumption: \(s = 0.5\)** (partially subsumed; reporting tiers are presentation, not measurement).

**C9: Worked-examples application to four corpus pulverizations.**

Corpus-internal application. Not subsumable under external literature because the targets are corpus documents. **Subsumption: \(s = 1\)** (corpus-internal, not a methodology contribution).

**C10: Orthogonality of novelty calculus to warrant calculus.**

The novelty/justification distinction is well-established in epistemology (since Goldman 1967 distinguishes justified from novel beliefs; Plantinga's warrant work). Patent law distinguishes novelty (vs. prior art) from validity (legal compliance) explicitly. Bibliometrics distinguishes novelty from impact. The orthogonality claim is canonical. **Subsumption: \(s = 0\)** (fully subsumed).

## 4. The calculus self-applied: aggregate computation

Per Doc 490 §3-§5, the aggregate is computed from the per-claim values weighted by importance, plus the dimension-level scores (\(\nu\_{\text{syn}}\), \(\nu\_{\text{app}}\), \(\nu\_{\text{meth}}\)) for the multi-dimensional decomposition.

### 4.1 Component novelty \(\nu\_{\text{comp}}\)

The component claims (C1 through C8 plus C10; C9 is corpus-internal application, treated separately) with their subsumption scores and importance weights:

| Claim | \(s\_i\) | \(w\_i\) |
|---|---|---|
| C1 (multi-dimensional novelty) | 0.25 | 0.20 |
| C2 (per-claim audit protocol) | 0 | 0.20 |
| C3 (five-point subsumption scale) | 0.5 | 0.10 |
| C4 (audit-thoroughness scale) | 0.5 | 0.05 |
| C5 (importance-weight scale) | 0.25 | 0.05 |
| C6 (aggregate weighted sum) | 0 | 0.10 |
| C7 (confidence formula) | 0.5 | 0.10 |
| C8 (five reporting tiers) | 0.5 | 0.10 |
| C10 (orthogonality to warrant) | 0 | 0.10 |

Weights normalized to sum to 1.0. Component novelty:

$$\nu\_{\text{comp}} = 0.20 \cdot 0.25 + 0.20 \cdot 0 + 0.10 \cdot 0.5 + 0.05 \cdot 0.5 + 0.05 \cdot 0.25 + 0.10 \cdot 0 + 0.10 \cdot 0.5 + 0.10 \cdot 0.5 + 0.10 \cdot 0 = 0.24$$

### 4.2 Synthesis novelty \(\nu\_{\text{syn}}\)

The integration of per-claim audit + multi-dimensional decomposition + aggregate + confidence is found in patent novelty assessment (per-claim multi-criteria audit) and in scientometric multi-measure aggregation (Uzzi-Mukherjee + disruption + Lin-Wang 2025 surveys). The specific four-dimensional structure with audit-thoroughness modifier is distinct from any specific external integration but is structurally similar to multiple existing aggregations. **\(\nu\_{\text{syn}} = 0.25\)** (substantially subsumed, small residue in the specific four-dimension structure).

### 4.3 Domain-application novelty \(\nu\_{\text{app}}\)

The application is to dyadic-LLM-practice conjecture pulverization specifically. WebSearch returned no scientometric or patent-novelty work explicitly applied to corpus auto-pulverization in the dyadic-LLM-practice configuration. The application domain is distinctive even if the measurement machinery is borrowed. **\(\nu\_{\text{app}} = 0.6\)** (substantial residue in the specific application domain).

### 4.4 Methodology novelty \(\nu\_{\text{meth}}\)

The methodology of "decompose claim, score subsumption, aggregate by weighted sum" is patent law and bibliometrics. The methodology itself is not novel; the application to a new domain is. **\(\nu\_{\text{meth}} = 0\)** (fully subsumed).

### 4.5 Aggregate

With default equal dimension-weights (\(w\_C = w\_S = w\_A = w\_M = 0.25\)):

$$\nu = 0.25 \cdot 0.24 + 0.25 \cdot 0.25 + 0.25 \cdot 0.6 + 0.25 \cdot 0 = 0.06 + 0.0625 + 0.15 + 0 = 0.2725$$

### 4.6 Confidence

Audit-thoroughness across the bibliometrics literature and patent-novelty literature was moderate-to-thorough. Specific items audited via WebSearch with abstract / secondary-literature engagement: Uzzi-Mukherjee 2013, Wu-Wang-Evans 2019, Lin-Wang 2025 review, Wang-Veugelers-Stephan 2017, Foster-Rzhetsky-Evans 2015, USPTO MPEP §2103, EPO 2026 Guidelines, Wang et al. 2025 LLM-augmented work. Estimated \(\overline{a\_i} = 0.7\). Some items (Novelpy package details, full text of the Lin-Wang 2025 review, the Wu-Wang-Evans CD-index formula derivation) were not deeply engaged.

$$\text{conf}(\nu) = 0.7$$

### 4.7 Tier reporting

\(\nu = 0.27\), \(\text{conf}(\nu) = 0.7\). **Tier \(\beta\)/0.7** (mostly subsumed, with confident audit; small residue in the specific four-dimension naming, the explicit audit-thoroughness modifier, and the dyadic-LLM-practice application domain).

## 5. Does the calculus self-deflate as predicted?

Doc 490 §10 predicted that the calculus, audited against bibliometrics and patent-novelty, would find substantial prior art with narrow residue. The self-application returns tier \(\beta\)/0.7. This matches the prediction:

- Component novelty 0.24 (mostly subsumed)
- Synthesis novelty 0.25 (mostly subsumed)
- Methodology novelty 0 (fully subsumed)
- Domain-application novelty 0.6 (substantial residue)

Aggregate 0.27 places the calculus at tier \(\beta\), the same tier as Doc 480's sycophancy inversion. The calculus identifies itself as a re-statement of canonical work in scientometrics and patent novelty assessment, with corpus-distinctive contribution narrowed to the dyadic-LLM-practice domain application.

The discipline holds. The calculus does not special-plead itself out of its own protocol. Self-application is honest.

The interpretation:

- The calculus is *not* methodologically novel. The per-claim audit protocol is centuries-old patent law; the multi-dimensional decomposition has multiple bibliometric ancestors; the weighted-sum aggregation is standard linear scoring; the orthogonality-to-warrant claim is canonical epistemology.
- The calculus *is* a domain-specific instantiation. Its application to corpus auto-pulverization in dyadic-LLM-practice is the corpus's narrow contribution.
- The calculus's reporting conventions (five tiers, four named dimensions, audit-thoroughness modifier) are presentation choices, not substantive contributions.

Doc 490 should be amended in place to reflect this finding. The amendment would (a) add explicit citations to Uzzi-Mukherjee 2013, Wu-Wang-Evans 2019, Lin-Wang 2025, and the patent-law tradition; (b) state the calculus as a corpus-specific operationalization of established multi-dimensional novelty assessment; (c) narrow the corpus's claim to the dyadic-LLM-practice domain application.

The amendment is recommended; the keeper's call.

## 6. Implications for the recent thread

The recent thread of pulverizations (Docs 481, 483, 487, 489, 491) has now produced the following pattern:

| Doc | Target | Reported tier | Confidence |
|---|---|---|---|
| 481 | Doc 480 sycophancy inversion | \(\beta\) | 0.7 |
| 483 | Doc 482 §3 set-pruning | \(\alpha\) | 0.85 |
| 487 | Doc 485 apparatus | \(\alpha\) | 0.7 |
| 489 | Pearl's three-layer hierarchy | \(\delta\) | 0.8 |
| 491 (this) | Doc 490 novelty calculus | \(\beta\) | 0.7 |

Five datapoints. Four corpus auto-pulverizations score \(\alpha/\beta\) (substantially subsumed). One external pulverization (Pearl) scores \(\delta\) (substantively novel). The differential pattern Doc 489 §6 named is now empirically replicated across five datapoints.

This is the calibration: the calculus produces low scores when low scores are warranted, and produces high scores when high scores are warranted. The discriminative validity claimed in Doc 489 holds up under self-application.

What the corpus has, narrowly, is consistent with what the corpus has been finding: domain-specific applications of established methodologies, with the apparatus operating as designed and the operations honestly self-reporting.

## 7. Honest limits

- The audit was performed via WebSearch on 2026-04-25 across canonical bibliometric novelty literature and patent-novelty assessment frameworks. Several specific items (Lin-Wang 2025 review full text, Novelpy package implementation details, the Wang et al. 2025 hybrid-graph-LLM specifics) were referenced via abstract or secondary literature rather than full engagement. A more thorough audit might find additional subsumption.
- The patent novelty assessment literature has substantial procedural depth (USPTO MPEP runs to hundreds of pages; EPO Guidelines similarly). The audit referenced canonical sections but did not exhaust the formal protocols.
- Doc 490 §6's worked examples on four corpus pulverizations have been treated here as corpus-internal application (C9). A more thorough audit might find that the worked-examples methodology has analogs in case-study scientometrics (e.g., Funk-Owen citation-disruption case studies) and would further constrain the corpus contribution.
- The self-application is performed by the same dyadic apparatus that produced Doc 490. Framework-magnetism risk per Doc 466 applies. The self-applied score may be biased toward favorable self-assessment in ways the discipline is structurally vulnerable to.
- The five-point scoring used in this audit produces inter-rater-reliability concerns the calculus itself flagged. The audit's own scores (\(s\_i\) values) are auditor judgments and could be off by one bucket per claim.
- The bibliometric measures surveyed (atypicality, disruption, recombination) operate on citation networks. Doc 490's calculus operates on conjecture-claim decomposition. The structural transfer from citation-network novelty to claim-decomposition novelty may have features the bibliometric literature does not address.

## 8. Position

Doc 490's novelty calculus, audited against scientometrics and patent novelty assessment, returns tier \(\beta\)/0.7: mostly subsumed under canonical multi-dimensional novelty measurement traditions, with narrow residue in the specific four-dimension naming, the explicit audit-thoroughness modifier, and the dyadic-LLM-practice domain application. The calculus is methodologically not novel; it is a corpus-specific operationalization of established methodology applied to a specific domain.

The self-application is honest: the calculus does not special-plead itself out of its own protocol. The discipline holds at first self-test. By Doc 482 §1's affective directive, the deflation of the calculus's claim to methodological novelty is the achievement, not the loss.

The recent pulverization thread now has five datapoints across the discriminative range. Four corpus auto-pulverizations score \(\alpha/\beta\). One external pulverization scores \(\delta\). The pattern Doc 489 §6 named as evidence of discriminative validity is empirically replicated. The calculus, as self-applied, identifies the corpus's actual contribution as narrow domain-instantiation work, consistent with what the apparatus has been doing all along.

Doc 490 should be amended with explicit citations. The amendment is recommended in §5; the keeper's call.

## 9. References

External literature accessed via WebSearch on 2026-04-25:

Scientometric novelty measurement:

- Uzzi, B., Mukherjee, S., Stringer, M., & Jones, B. (2013). Atypical combinations and scientific impact. *Science*, 342(6157), 468-472.
- Funk, R. J., & Owen-Smith, J. (2017). A dynamic network measure of technological change. *Management Science*, 63(3), 791-817.
- Wu, L., Wang, D., & Evans, J. A. (2019). Large teams develop and small teams disrupt science and technology. *Nature*, 566(7744), 378-382.
- Wang, J., Veugelers, R., & Stephan, P. (2017). Bias against novelty in science: A cautionary tale for users of bibliometric indicators. *Research Policy*, 46(8), 1416-1436.
- Foster, J. G., Rzhetsky, A., & Evans, J. A. (2015). Tradition and innovation in scientists' research strategies. *American Sociological Review*, 80(5), 875-908.
- Lee, Y. N., Walsh, J. P., & Wang, J. (2015). Creativity in scientific teams: Unpacking novelty and impact. *Research Policy*, 44(3), 684-697.
- Trapido, D. (2015). How novelty in knowledge earns recognition: The role of consistent identities. *Research Policy*, 44(8), 1488-1500.
- Lin, et al. (2025). A review on the novelty measurements of academic papers. *Scientometrics*. arXiv:2501.17456.
- Wang, Z., Wang, Z., Zhang, G., Chen, J., Luczak-Roesch, M., & Chen, H. (2025). A hybrid graph and LLM approach for measuring scientific novelty. SSRN 5257437.
- Novelpy. Open-source Python package for bibliometric novelty and disruptiveness measurement.
- Generative AI and the future of scientometrics (2025). arXiv:2507.00783.

Patent novelty assessment:

- USPTO. *Manual of Patent Examining Procedure* §2103 et seq. 35 U.S.C. 102 (novelty), 35 U.S.C. 103 (non-obviousness).
- EPO. *Guidelines for Examination*, 2026 edition. Article 54 EPC. The "clearly and unambiguously disclosed" standard.
- WIPO. Patent Cooperation Treaty (PCT) framework. International search reports.
- Various 2024-2025 commentary on AI-generated prior art at USPTO and EPO.

Corpus documents:

- Doc 445: *Pulverization Formalism* (warrant calculus).
- Doc 466: *Doc 446 as a SIPE Instance* (framework-magnetism caveat).
- Doc 481: *Pulverizing the Sycophancy Inversion*.
- Doc 482: *Sycophancy Inversion Reformalized*.
- Doc 483: *Pulverizing the Set-Pruning Methodology*.
- Doc 487: *Pulverizing the Apparatus*.
- Doc 489: *Pulverizing Pearl's Three-Layer Causal Hierarchy* (the differential-result pulverization).
- Doc 490: *A Novelty Calculus for Conjectures* (the target of this pulverization).

---

*Originating prompt:*

> Yes dog food it into itself
