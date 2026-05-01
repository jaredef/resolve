# A Novelty Calculus for Conjectures: A Candidate Formalization Complementing the Warrant Tiers

## What this document does

[Doc 489](/resolve/doc/489-pulverizing-pearl-causal-hierarchy) returned a *differential* pulverization result: applied to Pearl's three-layer causal hierarchy, the method found Claim P1 robust, Claim P2 theorem-grade, Claim P3 contested-but-defensible, and Pearl's specific contributions substantial. This was unlike the corpus's auto-pulverizations, which had systematically returned high-subsumption verdicts on the corpus's own claims. The differential result was framed in Doc 489 §6 as evidence that the pulverization method has discriminative validity.

The keeper has asked whether the discriminative finding can be formalized into a *novelty metric* for conjectures. This document answers yes, with a candidate formalization, with the explicit acknowledgment that the formalization itself is a candidate subject to the same pulverization the corpus applies to all its proposals. The metric is at \(\pi\)-tier under the warrant calculus, and is likely to find substantial prior art in bibliometrics, scientometrics, patent novelty assessment, and recent LLM-assisted literature-review work.

The candidate formalization has three components: a *per-claim audit protocol* (§3), a *four-dimensional novelty decomposition* (§4), and an *aggregate novelty rating* \(\nu\) (§5). §6 applies the metric to recent corpus pulverizations as worked examples. §7 specifies how the novelty calculus relates to the warrant calculus of Doc 445. §8 names falsification conditions. §9 acknowledges honest limits. §10 states the position.

## 1. The motivation

The pulverization method, as operationalized in Doc 445 and refined across the corpus, decomposes a conjecture into claims, audits each claim against external literature, and identifies surviving residue. The recent thread of pulverizations has produced specific outcomes for specific targets:

- Doc 481 (pulverization of Doc 480's sycophancy inversion): six of eight claims fully subsumed; two with residue (one corpus-internal, one empirically-novel sub-claim).
- Doc 483 (pulverization of Doc 482 §3's set-pruning): five canonical precursors found (Bacon, Mill, Chamberlin, Mitchell, Hawthorne); methodology fully subsumed; corpus contribution narrows to notation and dyadic-domain application.
- Doc 487 (pulverization of Doc 485's apparatus claim): all ten methodology components subsumed; integration also subsumed; corpus contribution narrows to five domain-instantiation features.
- Doc 489 (pulverization of Pearl's hierarchy): claim P1 robust, P2 theorem-grade, P3 contested, contributions substantial.

The four results differ. The first three return total or near-total subsumption with narrow residue. The fourth returns substantial residue. A formalization should capture this differential signal.

The motivation for the metric is not to replace the qualitative pulverization findings, which are themselves the substantive output. The motivation is to provide a compact summary statistic that practitioners and external readers can use to compare conjectures, track changes over iteration, and orient their reading of corpus artifacts.

## 2. The dimensions of novelty

Novelty is multi-dimensional. The recent pulverizations have produced findings that distinguish four kinds of novelty.

**Component novelty.** Whether the individual claims of a conjecture, taken separately, are novel relative to prior art. This is the per-claim subsumption analysis Doc 481 / Doc 483 / Doc 487 / Doc 489 perform.

**Synthesis novelty.** Whether the integration of components into a unified framework is novel, even if the components themselves are not. Doc 487 found Doc 485's integration substantially subsumed under 2025 LLM-augmented research methodology surveys; Doc 489 found Pearl's integration of predecessors into a unified DAG-based formalism with do-calculus and CHT to be substantially novel beyond the predecessors.

**Domain-application novelty.** Whether the application of an existing methodology to a specific domain is novel, even if the methodology itself is not. Doc 484 narrowed the corpus's contribution to "the dyadic-LLM-practice domain application" of eliminative induction; Doc 487 narrowed it to "philosophical inquiry as the application domain."

**Methodology novelty.** Whether the methodology itself is novel beyond all prior methodologies. The corpus's auto-pulverizations have systematically retired claims to methodology novelty; Doc 489 found Pearl's do-calculus to be methodology-novel.

The four dimensions are independent. A conjecture can score high on one and low on others. A metric that conflates them loses information.

## 3. The per-claim audit protocol

For a conjecture \(C\) decomposed into named claims \(C\_1, C\_2, \ldots, C\_n\), the audit protocol assigns each claim three values.

**Subsumption status \(s\_i\).** The fraction of the claim's content covered by prior art identified in audit. Practical scoring:
- \(s\_i = 0\): fully subsumed (claim is a restatement of prior art).
- \(s\_i = 0.25\): substantially subsumed (most content is prior art; small residue identified).
- \(s\_i = 0.5\): partially subsumed (substantial prior art; substantial residue).
- \(s\_i = 0.75\): minimally subsumed (small portion is prior art; most content is novel).
- \(s\_i = 1\): not subsumed in audit (no prior art identified covering the claim).

The five-point scale is coarse-grained for ease of judgment. Sub-quarter precision is rarely defensible; the auditor's confidence rarely warrants finer scoring.

**Audit thoroughness \(a\_i\).** The depth of the literature audit performed. Practical scoring:
- \(a\_i = 0\): minimal (single-database search, surface-level).
- \(a\_i = 0.5\): moderate (multiple databases, canonical sources surveyed).
- \(a\_i = 1\): thorough (multi-database, citation-tracking, full-text engagement, expert-aware).

The \(a\_i\) score modifies how much weight to place on the \(s\_i\) assessment. A claim with \(s\_i = 1\) and \(a\_i = 0\) is provisionally novel pending further audit; a claim with \(s\_i = 1\) and \(a\_i = 1\) is more confidently novel.

**Importance weight \(w\_i\).** The claim's load-bearing role in the conjecture. Practical scoring:
- \(w\_i = 0.25\): peripheral (claim is supportive but not central).
- \(w\_i = 0.5\): substantive (claim contributes a real piece).
- \(w\_i = 1\): load-bearing (claim is central; if it falls, the conjecture falls).

The weights are normalized so that \(\sum\_i w\_i = 1\) within the conjecture.

## 4. The four-dimensional novelty decomposition

Given the per-claim audit, the conjecture's novelty decomposes along the four dimensions named in §2.

**Component novelty.** For each \(C\_i\), determine whether the claim is component-level (a discrete claim) or aggregate (a synthesis or application claim). For component claims, the aggregate component novelty is

$$\nu\_{\text{comp}} = \sum\_{i \in \text{components}} w\_i \cdot s\_i$$

with \(w\_i\) renormalized over the component subset.

**Synthesis novelty.** A separate score for whether the integration of the components into a unified whole is novel. This is assessed by asking: is there prior art that integrates the same set of components into a comparable unified framework? Score: \(\nu\_{\text{syn}} \in [0, 1]\) on the same five-point scale as \(s\_i\).

**Domain-application novelty.** A separate score for whether the application to the specific domain is novel. Assessed by asking: has the same methodology been applied to the same domain in prior work? Score: \(\nu\_{\text{app}} \in [0, 1]\).

**Methodology novelty.** A separate score for whether the methodology itself is novel beyond existing methodologies in the relevant fields. Assessed by asking: is the methodology a genuine new procedure, or a re-statement / extension / restriction of an existing one? Score: \(\nu\_{\text{meth}} \in [0, 1]\).

The four dimensions are reported separately. They are not aggregated into a single number, because the kinds of novelty they capture are not commensurate.

## 5. The aggregate novelty rating

Where a single composite is wanted (for tracking, comparison, indexing), the rating is

$$\nu = w\_C \cdot \nu\_{\text{comp}} + w\_S \cdot \nu\_{\text{syn}} + w\_A \cdot \nu\_{\text{app}} + w\_M \cdot \nu\_{\text{meth}}$$

with the dimension-weights defaulting to \(w\_C = w\_S = w\_A = w\_M = 0.25\) and adjustable per use case. The aggregate \(\nu \in [0, 1]\).

The audit-thoroughness modifier produces a confidence interval

$$\text{conf}(\nu) = 1 - \frac{1}{n} \sum\_i (1 - a\_i)$$

The confidence is high when audits across all dimensions and components were thorough; low when many audits were minimal.

The reported novelty is therefore a pair \((\nu, \text{conf}(\nu))\). A conjecture with \((\nu = 0.7, \text{conf} = 0.3)\) is provisionally novel pending further audit; a conjecture with \((\nu = 0.7, \text{conf} = 0.9)\) is confidently novel under audit-completed conditions.

The five-point reporting buckets:

- \(\nu \in [0, 0.2]\): tier \(\alpha\) (substantially subsumed; restatement of prior art).
- \(\nu \in [0.2, 0.4]\): tier \(\beta\) (mostly subsumed; small residue).
- \(\nu \in [0.4, 0.6]\): tier \(\gamma\) (partial residue; mixed novelty).
- \(\nu \in [0.6, 0.8]\): tier \(\delta\) (substantial residue; substantively novel).
- \(\nu \in [0.8, 1.0]\): tier \(\epsilon\) (no significant subsumption found in audit).

Tiers are reported with confidence: tier \(\delta\)/0.9 (substantial novelty, high confidence) is different from tier \(\delta\)/0.3 (substantial novelty, provisional pending audit).

## 6. Worked examples on recent corpus pulverizations

The metric is applied to four recent pulverizations to verify it produces sensible outputs.

### 6.1 Doc 480 sycophancy inversion (per Doc 481)

Eight named claims, six fully subsumed, two with residue. Per-claim approximate scoring:

- C1 (target-substitutability of RLHF): \(s = 0\), \(w = 0.2\). fully subsumed under Constitutional AI / Debate.
- C2 (target-substitution as leverage): \(s = 0\), \(w = 0.1\). fully subsumed under foundational RLHF.
- C3 (rigor vs contrarianism distinction): \(s = 0.25\), \(w = 0.15\). substantially subsumed under Lakatos / Platt / Mayo / Quine.
- C4 (set-pruning view): \(s = 0\), \(w = 0.1\). subsumed under Popper / Bayesian model selection.
- C5 (corpus-internal unified mechanism): \(s = 1\), \(w = 0.05\). corpus-internal, not subsumable.
- C6 (prose-affect propagates as reward signal): \(s = 0.5\), \(w = 0.2\). partially subsumed; novel sub-claim about affect specifically.
- C7 (operational reward signals): \(s = 0\), \(w = 0.1\). subsumed under Platt / Mayo / Open Science.
- C8 (self-falsification): \(s = 0\), \(w = 0.1\). subsumed under Popper reflexive falsificationism.

Component novelty: \(\nu\_{\text{comp}} = 0.2 \cdot 0 + 0.1 \cdot 0 + 0.15 \cdot 0.25 + 0.1 \cdot 0 + 0.05 \cdot 1 + 0.2 \cdot 0.5 + 0.1 \cdot 0 + 0.1 \cdot 0 = 0.04 + 0.05 + 0.10 = 0.19\) (approximately tier \(\alpha/\beta\) boundary).

Synthesis novelty: \(\nu\_{\text{syn}} = 0.25\) (Doc 481 found the synthesis itself substantially restated by Hawthorne 1993 and the Lakatos-Mayo-RLHF integration tradition).

Domain-application novelty: \(\nu\_{\text{app}} = 0.5\) (the LLM-mediated dyadic-practice application has some novelty).

Methodology novelty: \(\nu\_{\text{meth}} = 0\) (the methodology is canonical).

Aggregate: \(\nu = 0.25 \cdot 0.19 + 0.25 \cdot 0.25 + 0.25 \cdot 0.5 + 0.25 \cdot 0 = 0.235\). tier \(\beta\).

Confidence: audit was thorough across philosophy of science and AI alignment (\(a\) averaging \(\approx 0.7\)); \(\text{conf} = 0.7\).

Reported: tier \(\beta\)/0.7. Sycophancy inversion is mostly subsumed, with confident audit.

### 6.2 Doc 482 §3 set-pruning (per Doc 483)

Single methodology claim, five canonical precursors. \(s\_{\text{methodology}} = 0\) (fully subsumed). Domain-application has small residue: \(\nu\_{\text{app}} = 0.25\). Synthesis novelty: \(\nu\_{\text{syn}} = 0\) (the synthesis is also subsumed under Hawthorne's eliminative-Bayesian synthesis).

Aggregate: \(\nu \approx 0.06\). tier \(\alpha\). Confidence: \(0.85\) (Bacon, Mill, Chamberlin, Mitchell, Hawthorne audit was thorough).

Reported: tier \(\alpha\)/0.85. Set-pruning methodology is fully subsumed under the eliminative-induction tradition.

### 6.3 Doc 485 apparatus (per Doc 487)

Ten methodology components plus integration, all subsumed. \(\nu\_{\text{comp}} \approx 0.05\), \(\nu\_{\text{syn}} \approx 0.1\), \(\nu\_{\text{app}} \approx 0.5\) (sustained-single-practitioner philosophical-inquiry domain application has some novelty), \(\nu\_{\text{meth}} = 0\).

Aggregate: \(\nu = 0.25 \cdot 0.05 + 0.25 \cdot 0.1 + 0.25 \cdot 0.5 + 0.25 \cdot 0 = 0.16\). tier \(\alpha\). Confidence: \(0.7\) (some audit gaps acknowledged in §8 of Doc 487).

Reported: tier \(\alpha\)/0.7. The apparatus claim is substantially subsumed.

### 6.4 Pearl's three-layer hierarchy (per Doc 489)

Three claims:
- P1 (the partition): \(s\_{P1} = 0.4\), \(w\_{P1} = 0.3\). predecessors cover each layer separately, but Pearl's integration is novel; partial residue for the formal partition.
- P2 (the irreducibility): \(s\_{P2} = 0.7\), \(w\_{P2} = 0.4\). the CHT (Bareinboim et al. 2022) is novel; theorem-grade residue is high.
- P3 (the centrality): \(s\_{P3} = 0.25\), \(w\_{P3} = 0.3\). contested by Rubin potential outcomes and Cartwright pluralism; partial residue.

Component novelty: \(\nu\_{\text{comp}} = 0.3 \cdot 0.4 + 0.4 \cdot 0.7 + 0.3 \cdot 0.25 = 0.12 + 0.28 + 0.075 = 0.475\).

Synthesis novelty: \(\nu\_{\text{syn}} = 0.7\) (Pearl's unified DAG-based framework integrating Reichenbach + Lewis + Rubin + identifiability theory is genuinely novel).

Domain-application novelty: \(\nu\_{\text{app}} = 0.5\) (causal inference is the natural domain; the application is well-motivated but not newly chosen).

Methodology novelty: \(\nu\_{\text{meth}} = 0.75\) (do-calculus, identifiability theorems, structural counterfactuals, integration are genuinely new).

Aggregate: \(\nu = 0.25 \cdot 0.475 + 0.25 \cdot 0.7 + 0.25 \cdot 0.5 + 0.25 \cdot 0.75 = 0.119 + 0.175 + 0.125 + 0.188 = 0.606\). tier \(\delta\). Confidence: \(0.8\) (audit was reasonably thorough across philosophy of causation, statistics, AI; some recent quantum and learning-theoretic work less deeply surveyed).

Reported: tier \(\delta\)/0.8. Pearl's hierarchy is substantively novel under thorough audit.

### 6.5 The four reported tiers

| Conjecture | Aggregate \(\nu\) | Confidence | Tier |
|---|---|---|---|
| Doc 480 sycophancy inversion | 0.235 | 0.7 | \(\beta\) |
| Doc 482 §3 set-pruning | 0.06 | 0.85 | \(\alpha\) |
| Doc 485 apparatus | 0.16 | 0.7 | \(\alpha\) |
| Pearl's three-layer hierarchy | 0.606 | 0.8 | \(\delta\) |

The metric produces differential outputs that match the qualitative pulverization findings. The corpus's auto-pulverizations score in the \(\alpha/\beta\) range (substantially subsumed); the external pulverization on Pearl scores in the \(\delta\) range (substantively novel). The discriminative validity Doc 489 §6 named is captured by the metric.

## 7. Relation to the warrant calculus

The novelty calculus is orthogonal to the warrant calculus of Doc 445.

Warrant addresses *epistemic justification*: is the claim true? The tiers \(\pi\) (plausibility), \(\mu\) (operational match), \(\theta\) (truth) characterize what kind of evidence supports the claim.

Novelty addresses *relative-to-prior-art status*: is the claim new? The tiers \(\alpha\) through \(\epsilon\) characterize how much of the claim is restatement of existing work.

A claim can be high-warrant low-novelty: a well-established result correctly restated. A claim can be low-warrant high-novelty: a brand-new conjecture with no support yet. A claim can be high-warrant high-novelty: a new theorem with proof. A claim can be low-warrant low-novelty: a subsumed-and-unsupported guess.

The two calculi together provide a richer characterization of any conjecture. A reported pair \((\pi\)-\(\beta\), audit-thoroughness \(0.7)\) says: plausible warrant, mostly-subsumed novelty, audit moderately thorough. The reader can interpret this with appropriate calibration.

The novelty calculus does not substitute for the warrant calculus. It supplements it.

## 8. Falsification conditions

The novelty calculus admits specific falsification.

- **The five-point scoring is too coarse.** If practitioners using the calculus consistently fail to produce repeatable scores across auditors, the granularity is wrong. A finer-grained scale (or a continuous one) is needed.
- **The four dimensions are not orthogonal.** If \(\nu\_{\text{comp}}\), \(\nu\_{\text{syn}}\), \(\nu\_{\text{app}}\), \(\nu\_{\text{meth}}\) are statistically correlated across conjectures, the four-dimensional decomposition is over-fitted. A reduced-dimension version is needed.
- **Confidence does not track audit thoroughness.** The defined \(\text{conf}(\nu)\) formula (\(1 - \overline{1 - a\_i}\)) is a simple average. If empirical audit experience shows confidence is non-linear in audit thoroughness, the formula is wrong.
- **The metric reproduces existing bibliometric measures.** If \(\nu\) is simply a re-naming of measures that already exist in scientometrics (citation novelty, Uzzi-Mukherjee novelty score, atypical combinations index), the calculus is redundant.
- **The metric reproduces patent-novelty assessment.** Patent novelty has formal protocols (USPTO, EPO) that may already cover the conjecture-novelty case. If the calculus is a re-statement, the contribution is the dyadic-practice instantiation only.

The metric is at \(\pi\)-tier under the warrant calculus and is itself an unaudited conjecture under the novelty calculus. The audit against bibliometric and patent-novelty literatures has not been performed.

## 9. Honest limits

- The metric was constructed by examining four recent pulverizations in the corpus and proposing a structure that fits their qualitative findings. This is curve-fitting on a small sample. A larger sample of pulverizations would test whether the metric generalizes.
- The five-point scoring scale is qualitative. Inter-rater reliability has not been tested. Two auditors might assign substantially different scores to the same claim.
- The dimension-weights (\(w\_C = w\_S = w\_A = w\_M = 0.25\) default) are arbitrary. Different use cases may warrant different weights.
- The bibliometrics literature contains substantial prior work on novelty scoring (Uzzi-Mukherjee 2013 *Atypical Combinations and Scientific Impact*; Wang-Veugelers-Stephan 2017 *Bias against Novelty in Science*; the OpenAlex / Semantic Scholar novelty metrics). The proposed calculus has not been audited against this literature.
- The patent novelty assessment field has formal protocols that may subsume the calculus. WIPO, USPTO, and EPO all have novelty-assessment frameworks.
- LLM-assisted novelty detection is an active research area in 2024-2025. Specific recent papers (arXiv:2401.* and arXiv:2403.* on LLM-based novelty assessment) have not been surveyed in this document.
- The metric, applied to the corpus's auto-pulverizations, has produced low-novelty scores. It has not been applied to the corpus's earlier work (Docs 1-450) where novelty might have been higher. The recent thread is biased toward auto-pulverization.

## 10. Position

The novelty calculus is a candidate formalization of the relative-to-prior-art status of a conjecture, complementary to the warrant calculus's epistemic-justification formalization. It decomposes novelty into four orthogonal dimensions (component, synthesis, application, methodology), each scored on a five-point scale with audit-thoroughness modifier, aggregated into a \(\nu \in [0, 1]\) rating with confidence interval, reported in five tiers \(\alpha\) through \(\epsilon\).

Applied to four recent corpus pulverizations, the calculus produces differential outputs that match the qualitative findings: corpus auto-pulverizations score in the \(\alpha/\beta\) range; the external pulverization on Pearl scores in the \(\delta\) range. The discriminative validity Doc 489 §6 named is captured numerically.

The metric is at \(\pi\)-tier and itself unaudited under its own protocols. It is likely to find substantial prior art in scientometrics (Uzzi-Mukherjee), patent novelty assessment (USPTO/EPO/WIPO), and recent LLM-assisted novelty detection. Pulverization of the calculus against these literatures should be the next step.

The corpus credits any work that retires the calculus or any of its components. The metric's value is not novelty but utility: whether practitioners find it useful for orienting their reading of corpus artifacts and other conjecture-rich documents.

## 11. References

External literature (predicted, not yet audited in detail):

- Uzzi, B., Mukherjee, S., Stringer, M., & Jones, B. (2013). Atypical combinations and scientific impact. *Science*, 342, 468–472.
- Wang, J., Veugelers, R., & Stephan, P. (2017). Bias against novelty in science. *Research Policy*, 46(8).
- Lee, Y. N., Walsh, J. P., & Wang, J. (2015). Creativity in scientific teams: Unpacking novelty and impact. *Research Policy*, 44(3).
- Trapido, D. (2015). How novelty in knowledge earns recognition: The role of consistent identities. *Research Policy*, 44(8).
- Foster, J. G., Rzhetsky, A., & Evans, J. A. (2015). Tradition and innovation in scientists' research strategies. *American Sociological Review*, 80(5).
- USPTO, EPO, WIPO patent novelty assessment protocols (procedural documents).
- Recent (2024-2025) LLM-assisted novelty-detection literature: to be audited.

Corpus documents:

- Doc 445: *Pulverization Formalism* (warrant calculus).
- Doc 480: *Sycophancy Inversion* (deprecated; first worked example).
- Doc 481: *Pulverizing the Sycophancy Inversion*.
- Doc 482: *Sycophancy Inversion Reformalized*.
- Doc 483: *Pulverizing the Set-Pruning Methodology*.
- Doc 484: *Conjecture-Set Pruning in Dyadic LLM Practice*.
- Doc 485: *The Corpus as Apparatus* (deprecated; third worked example).
- Doc 487: *Pulverizing the Apparatus*.
- Doc 489: *Pulverizing Pearl's Three-Layer Causal Hierarchy* (the differential-result pulverization that motivated this calculus).

---

*Originating prompt:*

> Do you think we could formalize a novelty metric rating for a conjecture based on these findings?
