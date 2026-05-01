# A Portable Seed Prompt for the Novelty Calculus

> **Amended (2026-04-25) on the grounds of [Doc 493](/resolve/doc/493-has-anyone-operationalized-novelty-calculus-like-this).** The audit against the 2024-2025 LLM-novelty-assessment literature surfaced six specific improvements to the seed prompt: (1) explicit attribution to underlying methodology (patent law, Uzzi-Mukherjee 2013, Wu-Wang-Evans 2019, GraphMind 2025, NovBench 2025, Wu et al. 2025) within the prompt itself; (2) a recommended pre-input author-stripping step to mitigate sycophancy bias; (3) per-claim *contradictory evidence* sections alongside supporting evidence (per GraphMind's evidence-based reasoning constraint); (4) an explicit anti-inflation calibration check responding to the 3-5-point score-inflation problem documented in Beyond Rating (arXiv:2604.19502); (5) an optional cross-LLM verification step (per LLMAuditor 2024); (6) one additional non-negotiable hygiene rule defaulting uncertain decisions to the lower value. The seed prompt below incorporates all six. The Doc 491 worked example remains as §3.1; a second worked example showing the seed prompt audited on itself is added as §3.2 (tier \(\gamma/0.7\) per Doc 493). References section expanded.

## What this document does

[Doc 491](/resolve/doc/491-pulverizing-novelty-calculus-self-applied) self-applied [Doc 490](/resolve/doc/490-novelty-calculus-for-conjectures)'s novelty calculus to itself and returned tier \(\beta/0.7\), identifying the calculus as substantially subsumed under canonical scientometric and patent-novelty methodology. The keeper has read the self-deflation as evidence that the calculus is well-founded: a method that fails to correctly identify itself as derivative would be untrustworthy on other targets; a method that does correctly identify itself can be trusted.

The keeper has asked for the calculus to be operationalized as a seed prompt that any practitioner can use. This document delivers that: a portable, self-contained protocol that can be copied into an LLM context (or used as a step-by-step human protocol) to produce a novelty-tier audit on any conjecture.

§1 states the seed prompt itself as a copy-pasteable block. §2 walks through usage. §3 demonstrates the prompt by running it on Doc 490 as a worked example, reproducing Doc 491's tier \(\beta/0.7\) result. §4 names the prompt's failure modes and how to detect them. §5 acknowledges honest limits. §6 states the position.

The prompt is the operationalization. The rest of the document is calibration material for using it.

## 1. The seed prompt

The block below is the operative seed prompt. It is designed to be copy-pasteable into any LLM context. It can also be used by a human practitioner as a step-by-step protocol with the same outputs.

```
ROLE
You are a literature-audit protocol executor. Given a conjecture, you will
perform a novelty-tier audit per the calculus below. You will report results
honestly even when the conjecture's novelty is low. Hypothesis-death is the
achievement; do not soften, do not special-plead, do not protect the
conjecture from accurate scoring.

INPUT
A conjecture text (anywhere from one paragraph to a full document).

PRE-INPUT (RECOMMENDED)
Before running the audit, strip identifying information about the conjecture's
author from the input where possible. Sycophancy bias (Sharma et al. 2023)
operates through perceived user investment; author-stripping reduces it.

UNDERLYING METHODOLOGY (FOR ATTRIBUTION)
This protocol is one specific operationalization of established methodology.
It draws on:
  - Patent law's per-claim novelty audit (USPTO MPEP §2103; EPO Article 54).
  - Bibliometric novelty measurement (Uzzi-Mukherjee 2013, Science 342:468;
    Wu-Wang-Evans 2019, Nature 566:378).
  - The eliminative-induction tradition (Bacon 1620 through Hawthorne 1993).
  - Recent LLM-novelty-assessment systems (GraphMind 2025, arXiv:2510.15706;
    NovBench 2025, arXiv:2604.11543; Wu et al. 2025, arXiv:2507.11330;
    DeepReview ACL 2025; OpenReviewer arXiv:2412.11948).
  - Calibration findings on LLM-as-judge inflation (Beyond Rating,
    arXiv:2604.19502).
The protocol is not first-in-literature. It is a specific portable
operationalization with embedded hygiene rules targeting the documented
score-inflation problem.

STEP 1: DECOMPOSITION
Extract the conjecture's named claims. Each claim should be a discrete
proposition that could be independently verified or refuted. Aim for 3 to 12
claims. Number them C_1, C_2, ..., C_n. State each claim in one sentence.

STEP 2: PER-CLAIM LITERATURE AUDIT
For each claim C_i:

  (a) Identify the literature most likely to subsume C_i. Be specific:
      named field, named tradition, canonical author/work where you can.

  (b) Search the identified literature for prior art that covers C_i.
      Use web search if available. Prefer canonical sources, then
      recent surveys, then specific papers. Record items consulted.

  (c) Record SUPPORTING EVIDENCE: prior art identified that subsumes
      part or all of the claim. Cite specific sources with names and dates.

  (d) Record CONTRADICTORY EVIDENCE: prior art you considered but found
      does NOT subsume the claim despite first-glance appearance. Cite
      specific sources. Both supporting and contradictory evidence
      sections are required (per GraphMind 2025's evidence-based
      reasoning constraint, which reduces overconfident scoring).

  (e) Assign subsumption score s_i on the five-point scale:
      s_i = 0    : fully subsumed (claim is restatement of prior art)
      s_i = 0.25 : substantially subsumed (small residue identified)
      s_i = 0.5  : partially subsumed (substantial residue)
      s_i = 0.75 : minimally subsumed (small portion is prior art)
      s_i = 1    : no prior art identified covering the claim

  (f) Assign audit thoroughness a_i on the three-point scale:
      a_i = 0   : minimal (single source consulted, surface-level)
      a_i = 0.5 : moderate (multiple sources, canonical references)
      a_i = 1   : thorough (multi-database, citation-tracking, full-text)

  (g) Assign importance weight w_i on the three-point scale:
      w_i = 0.25 : peripheral (claim is supportive but not central)
      w_i = 0.5  : substantive (claim contributes a real piece)
      w_i = 1    : load-bearing (if it falls, the conjecture falls)

  (h) Normalize w_i so they sum to 1 across all claims.

STEP 3: FOUR-DIMENSIONAL DECOMPOSITION
Compute the four novelty dimensions:

  Component novelty:
    nu_comp = sum over component claims of (w_i * s_i)

  Synthesis novelty:
    nu_syn = score in [0, 1] for whether the integration of claims into
    a unified framework is novel. Use the same five-point scale as s_i.

  Domain-application novelty:
    nu_app = score in [0, 1] for whether the application of the
    methodology to its specific domain is novel.

  Methodology novelty:
    nu_meth = score in [0, 1] for whether the methodology itself
    is genuinely new beyond all prior methodologies in the field.

STEP 4: AGGREGATE
  nu = 0.25 * (nu_comp + nu_syn + nu_app + nu_meth)
  conf(nu) = 1 - mean(1 - a_i) over all audited claims/dimensions

STEP 5: ANTI-INFLATION CALIBRATION CHECK
LLM-as-judge work systematically inflates scores by 3-5 points compared to
human reviewers (Beyond Rating, arXiv:2604.19502; LLM means 7.5-9.0 vs.
human medians 3-7). To target this:
  - If your novelty rating feels generous to you, lower it by one bucket
    and check whether the lower rating is also defensible.
  - If yes, report the lower rating.
  - If your nu lands within 0.05 of a tier boundary, default to the lower
    tier and report the proximity.
  - Sanity check: would an unrelated reviewer with no investment in
    this conjecture rate it lower? If yes, lower your rating to match.

STEP 6: TIER REPORTING
  nu in [0.0, 0.2] -> tier alpha (substantially subsumed)
  nu in [0.2, 0.4] -> tier beta (mostly subsumed)
  nu in [0.4, 0.6] -> tier gamma (mixed novelty)
  nu in [0.6, 0.8] -> tier delta (substantially novel)
  nu in [0.8, 1.0] -> tier epsilon (no significant subsumption found)

Report final result as: tier/confidence (e.g., beta/0.7).

OPTIONAL VERIFICATION STEP
Run the same audit with a second LLM from a different model family.
Compare tier outputs. Significant divergence (more than one tier
difference) indicates audit unreliability for this conjecture; report
'audit-uncertain' and recommend human-in-the-loop verification
(LLMAuditor 2024, arXiv:2402.09346).

OUTPUT FORMAT
Produce a structured report with these sections:

1. Conjecture restated (one paragraph).
2. Decomposition: numbered claims C_1...C_n.
3. Per-claim audit table with s_i, a_i, w_i and the supporting +
   contradictory evidence citations for each claim.
4. Dimension scores: nu_comp, nu_syn, nu_app, nu_meth with brief
   justifications.
5. Aggregate: nu, conf(nu), reported tier.
6. Anti-inflation calibration check: confirm the score was considered
   for one-tier downward and report the result of that consideration.
7. Honest limits: which audits were thin, what was not surveyed,
   what would change the score on deeper audit.

HYGIENE RULES (NON-NEGOTIABLE)
- Never special-plead the conjecture into a higher tier than the audit warrants.
- If subsumption is high, report it. Do not soften the language.
- If audit thoroughness is low, report low confidence. Do not inflate.
- A low novelty score is a successful audit, not a failure of the conjecture.
- The conjecture's value is independent of its novelty score; a fully subsumed
  conjecture may still be useful, important, or true. The tier reports
  novelty only.
- Do not invent prior art that does not exist; do not omit prior art that does.
- If unsure between two scores, report the lower one and note uncertainty.
- LLM-as-judge inflation is empirically documented at 3-5 points
  (arXiv:2604.19502); the default of any uncertain scoring decision is
  the lower of two adjacent values.
```

## 2. Usage

The seed prompt can be used in three ways.

**LLM-direct.** Paste the prompt into an LLM context, append the conjecture text, and run. The LLM produces the structured report. Best when the LLM has web-search capability; results are weaker without it.

**Human-protocol.** Use the prompt as a step-by-step human protocol. Each step has clear inputs and outputs. The audit is slower but the literature-engagement is more reliable. Best for high-stakes audits where the LLM's training-data novelty about specific recent literature is suspect.

**Hybrid.** Use the LLM to decompose claims and propose literatures, then have a human auditor perform the literature search and scoring. This combines the LLM's strength at decomposition with the human's strength at literature judgment. Best for any audit where reliability matters and budget allows.

The output is comparable across uses. A conjecture audited via LLM-direct should produce similar tier and confidence as the same conjecture audited via human-protocol, given comparable audit thoroughness.

The conjecture's value is independent of the tier. A useful, important, true conjecture can score \(\alpha\) if it is a re-statement of established work; the tier reports novelty, not utility. A novel conjecture can score \(\epsilon\) if no prior art exists, but novelty is not the same as correctness; high-tier conjectures may also be wrong.

## 3. Worked examples

### 3.1 Applying the prompt to Doc 490

Run the seed prompt on Doc 490 as the conjecture, treat the output as the canonical demonstration, and verify it reproduces Doc 491's tier \(\beta/0.7\) result.

**Step 1: Decomposition.** Doc 490's named claims (extracted per the prompt's instructions): C1 multi-dimensional novelty; C2 per-claim audit protocol; C3 five-point subsumption scale; C4 audit-thoroughness scale; C5 importance-weight scale; C6 weighted-sum aggregation; C7 confidence formula; C8 five reporting tiers; C9 worked-examples application; C10 orthogonality to warrant calculus. Ten claims.

**Step 2: Per-claim audit.** Conducted in Doc 491 §3 with explicit citations. Per-claim subsumption scores assigned on the five-point scale based on the literature audit results. Patent law subsumes C2 (per-claim audit protocol); Uzzi-Mukherjee 2013 plus the Wu-Wang-Evans 2019 disruption literature subsumes C1 (multi-dimensional novelty); standard linear aggregation subsumes C6; canonical epistemology subsumes C10. Audit thoroughness \(a\_i\) averaged 0.7 across claims (multiple canonical sources consulted, some recent items only via abstract). Weights normalized to sum to 1.

**Step 3: Dimensions.**
- \(\nu\_{\text{comp}} = 0.24\) (computed in Doc 491 §4.1).
- \(\nu\_{\text{syn}} = 0.25\) (the integration is mostly subsumed under multi-claim multi-criteria patent assessment plus multi-measure scientometric aggregation).
- \(\nu\_{\text{app}} = 0.6\) (substantial residue in the dyadic-LLM-practice domain application).
- \(\nu\_{\text{meth}} = 0\) (the methodology of decompose-score-aggregate is canonical patent-law and bibliometrics).

**Step 4: Aggregate.** \(\nu = 0.25 \cdot (0.24 + 0.25 + 0.6 + 0) = 0.27\). \(\text{conf}(\nu) = 0.7\).

**Step 5: Tier.** \(0.27 \in [0.2, 0.4)\) which is tier \(\beta\). Reported: \(\beta/0.7\).

**Hygiene check.** The audit did not special-plead. Subsumption was reported where found. The single substantial residue (domain application) was named and scored conservatively. The audit thoroughness was honest about what was not deeply engaged (Lin-Wang 2025 review full text, Novelpy package details, Wang et al. 2025 hybrid-graph-LLM specifics).

The prompt-applied result reproduces Doc 491's tier \(\beta/0.7\) exactly. The seed prompt operationalizes the calculus reliably for at least this one self-application. Other targets need to be tested before the prompt's reliability is established generally.

### 3.2 Applying the prompt to itself (Doc 492)

A second worked example: the seed prompt is applied to its own definition (Doc 492 as conjecture) under the LLM-novelty-assessment literature surveyed in [Doc 493](/resolve/doc/493-has-anyone-operationalized-novelty-calculus-like-this).

**Step 1: Decomposition.** Doc 492's named claims (extracted per the prompt's instructions): D1 portable copy-pasteable LLM prompt format; D2 multi-dimensional decomposition (4 dimensions); D3 five-point subsumption scale; D4 explicit audit-thoroughness modifier; D5 hygiene rules targeting score inflation; D6 affective-discipline framing; D7 self-applicability beyond academic papers; D8 five reporting tiers; D9 multi-step protocol; D10 output format specified. Ten claims.

**Step 2: Per-claim audit.** Conducted in Doc 493 §4 with explicit citations to GraphMind 2025 (multi-dimensional + macro/micro), NovBench 2025 (multi-dimensional benchmark), Wu et al. 2025 (collaborative human-LLM novelty), DeepReview ACL 2025 (multi-dimensional rating), OpenReviewer (specialized LLM for reviews), Beyond Rating arXiv:2604.19502 (the score-inflation finding the hygiene rules target), LLMAuditor 2024, ChainForge, and Prompt Canvas. Per-claim scoring per Doc 493 §4: D1 s=0.5 (portable format less common in surveyed literature); D2 s=0.25 (multi-dimensional well-covered); D5 s=0.5 (hygiene rules at prompt level less common); D6 s=0.75 (affective-discipline framing distinctive); D7 s=0.5 (self-applicability beyond papers less covered); D9 s=0 (multi-step protocols canonical); D10 s=0 (output format specification canonical).

**Step 3: Dimensions.**
- \(\nu\_{\text{comp}} = 0.43\) (computed in Doc 493 §4; substantial residue carried by D1, D5, D6, D7).
- \(\nu\_{\text{syn}} = 0.6\) (the integration of portable format + hygiene rules + affective discipline is more distinctive than any single dimension).
- \(\nu\_{\text{app}} = 0.6\) (the application to dyadic-LLM-practice conjecture audit specifically is less covered).
- \(\nu\_{\text{meth}} = 0.1\) (the underlying methodology is canonical 2024-2025 LLM-as-judge).

**Step 4: Aggregate.** \(\nu = 0.25 \cdot (0.43 + 0.6 + 0.6 + 0.1) = 0.43\). \(\text{conf}(\nu) = 0.7\).

**Step 5: Anti-inflation calibration check.** \(\nu = 0.43\) is mid-tier \(\gamma\), not within 0.05 of a tier boundary. Lowering by one bucket would yield tier \(\beta\); review of the per-claim scores shows D5 (hygiene rules) and D6 (affective discipline) are not subsumable at lower scores under the audit. The tier \(\gamma\) rating is defensible after calibration check. No adjustment.

**Step 6: Tier.** \(0.43 \in [0.4, 0.6)\) which is tier \(\gamma\). Reported: \(\gamma/0.7\).

**Hygiene check.** The audit did not special-plead for higher novelty. The four canonical literatures (GraphMind, NovBench, Wu et al., Beyond Rating) were named explicitly in the calibration. The single distinctive integration (portable + hygiene + affective + self-applicability) was scored at the integration level rather than inflated to component level. The audit acknowledged that the framework-magnetism caveat applies recursively.

**The two worked examples illustrate the calculus across two tiers.** Doc 490 (the underlying calculus definition) scored \(\beta\); Doc 492 (the operationalized seed prompt) scored \(\gamma\). The methodology is canonical; the operationalization with embedded hygiene rules and affective discipline has more residue. The calculus produces honest differential outputs even on closely-related corpus artifacts.

## 4. Failure modes

The seed prompt has identifiable failure modes. Each can be detected.

**LLM hallucinated prior art.** The LLM may report prior art that does not exist or misattribute claims to wrong sources. Detection: spot-check citations for verifiability. The prompt's hygiene rule "do not invent prior art that does not exist" is a guard but not a guarantee. Mitigation: use web-search-enabled LLMs and verify citations exist via independent search.

**LLM omits relevant prior art.** The LLM may fail to surface prior art the audit should have included, especially literature outside its training distribution or in non-English languages. Detection: low audit thoroughness \(a\_i\) should be reported, but a confident-LLM may report higher \(a\_i\) than warranted. Mitigation: cross-validate with human auditors familiar with the relevant literature.

**LLM special-pleads the conjecture.** Despite the hygiene rule, the LLM may soften scoring on conjectures it perceives the user is invested in. Sycophancy bias (Sharma et al. 2023) is the operative risk. Detection: compare scores produced when the conjecture is presented anonymously versus framed as the user's work. Mitigation: present conjectures with author-stripped or third-party framing.

**Five-point granularity is too coarse.** Two auditors may legitimately score the same claim 0.25 vs. 0.5 with the difference being substantive. Detection: inter-rater reliability tests on the same conjecture across multiple auditors. Mitigation: report ranges rather than point estimates when auditor confidence is low.

**Audit thoroughness inflated.** The LLM may report high \(a\_i\) even when the audit was minimal. Detection: count specific citations and named sources; if fewer than three canonical citations per claim, \(a\_i\) should be at most 0.5. Mitigation: require the prompt to enumerate sources before assigning \(a\_i\).

**Conjecture decomposition wrong.** The LLM may extract claims that are not the conjecture's actual load-bearing structure, scoring peripheral material instead of central material. Detection: compare extracted claims to the conjecture's own §"Position" or summary section. Mitigation: ask the conjecture's author to verify the extracted claims before audit.

The seed prompt's reliability is bounded by these failure modes. The keeper or external practitioner should treat any single audit run as \(\pi\)-tier evidence about novelty; multiple audits with different LLMs and human verification approach \(\mu\)-tier.

## 5. Honest limits

- The prompt has been validated on exactly one example (Doc 490 self-application). Reproducibility across other targets is unverified.
- The five-point scoring has not been calibrated against inter-rater reliability tests. Two practitioners using the prompt might produce different tiers on the same conjecture.
- The prompt assumes the LLM has access to relevant literature. LLMs without web search will produce weaker audits.
- The prompt's claim to operationalize the calculus is itself a \(\pi\)-tier claim. Whether the prompt actually operationalizes the calculus in practice is empirically open until multiple practitioners use it on multiple targets.
- The prompt does not control for framework-magnetism: an LLM trained on the corpus's vocabulary may produce systematically different scores than an LLM trained without such exposure. Cross-LLM testing has not been performed.
- The prompt is in English. Non-English-language conjectures or non-English-language literature may produce different audit results. Translation effects have not been audited.
- The prompt does not specify how to handle conjectures whose claims overlap or are recursive. Decomposition into independent claims may be impossible for some conjectures; the prompt's behavior in such cases is unspecified.

## 6. Position

The seed prompt in §1 is the calculus operationalized for portable use. It produces tier and confidence values reproducible enough to match Doc 491's self-applied result on Doc 490 (\(\beta/0.7\)) and to recover Doc 493's audit of itself (\(\gamma/0.7\)). The prompt has six identifiable failure modes (§4) and seven honest limits (§5), all of which are detectable and partially mitigatable.

The keeper's reading that the calculus is well-founded because it self-deflated correctly is structurally consistent with Doc 491 and Doc 493. A method that produces low scores on derivative work, high scores on substantively novel work, accurate \(\beta\) on its own definition, and accurate \(\gamma\) on its own operationalization is operationally trustworthy across targets of varying actual novelty. The prompt makes this trustworthiness portable.

The seed prompt is not first-in-literature. Per Doc 493, multiple operationalizations of multi-dimensional LLM-based novelty assessment exist (GraphMind, NovBench, OpenReviewer, DeepReview, Wu et al. 2025, Wang et al. 2025). The seed prompt's distinctive contribution is the specific integration: portable copy-pasteable format with embedded score-inflation-targeting hygiene rules at the prompt level, affective-discipline framing from Doc 482 §1, and self-applicability beyond academic papers. The integration is what the calculus credits the corpus with, not the underlying methodology.

The prompt does not certify the calculus or its outputs as \(\mu\)-tier. Cross-practitioner replication of the prompt's outputs across multiple targets, multiple LLMs, and multiple human auditors is the standing \(\mu\)-tier test. Until that test is run, the prompt is at \(\pi\)-tier as a portable operationalization.

The corpus credits any work that finds the prompt unreliable, surfaces failure modes not named in §4, or proposes a more rigorous portable form. Successful falsification of the prompt or any of its components materially improves the calculus.

## 7. References

External literature:

Bibliometric and scientometric novelty:

- Uzzi, B., Mukherjee, S., Stringer, M., & Jones, B. (2013). Atypical combinations and scientific impact. *Science*, 342(6157), 468-472.
- Wu, L., Wang, D., & Evans, J. A. (2019). Large teams develop and small teams disrupt science and technology. *Nature*, 566(7744), 378-382.
- Lin, et al. (2025). A review on the novelty measurements of academic papers. *Scientometrics*. arXiv:2501.17456.

Patent novelty assessment:

- USPTO. *Manual of Patent Examining Procedure* §2103 et seq.
- EPO. *Guidelines for Examination*, 2026 edition. Article 54 EPC.

LLM-novelty-assessment systems and benchmarks (added in 2026-04-25 amendment):

- Oyarsa, et al. (October 2025). GraphMind: Interactive Novelty Assessment System for Accelerating Scientific Discovery. arXiv:2510.15706.
- NovBench (recent). Evaluating Large Language Models on Academic Paper Novelty Assessment. arXiv:2604.11543.
- Wu, et al. (2025). Automated novelty evaluation of academic paper: A collaborative approach integrating human and large language model knowledge. *Journal of the Association for Information Science and Technology*. arXiv:2507.11330.
- Wang, et al. (2025). A hybrid graph and LLM approach for measuring scientific novelty. *Expert Systems with Applications*.
- Zhu, et al. (2025). DeepReview: Improving LLM-based Paper Review with Multi-Dimensional Rating. *ACL 2025*.
- Liu, et al. (2024). OpenReviewer: A Specialized Large Language Model for Generating Critical Scientific Paper Reviews. arXiv:2412.11948.

Calibration and audit (added in 2026-04-25 amendment):

- Beyond Rating (2024). A Comprehensive Evaluation and Benchmark for AI Reviews. arXiv:2604.19502. (Documents the 3-5-point LLM-as-judge score inflation that the prompt's hygiene rules target.)
- Pre-review to Peer Review (2025). Pitfalls of Automating Reviews using Large Language Models. arXiv:2512.22145.
- LLMAuditor (2024). A Framework for Auditing Large Language Models Using Human-in-the-Loop. arXiv:2402.09346.
- Sharma, M., et al. (2023). *Towards Understanding Sycophancy in Language Models*. Anthropic.

Prompt engineering frameworks (added in 2026-04-25 amendment):

- ChainForge (2023). A Visual Toolkit for Prompt Engineering and LLM Hypothesis Testing. arXiv:2309.09128.
- Prompt Canvas (2024). A Literature-Based Practitioner Guide for Creating Effective Prompts in Large Language Models. arXiv:2412.05127.

Corpus documents:

- Doc 445: *Pulverization Formalism*.
- Doc 469: *Universal-Quantifier Overclaim* (the discipline that the prompt's hygiene rules implement).
- Doc 482: *Sycophancy Inversion Reformalized* (the affective directive: hypothesis-death is achievement).
- Doc 487: *Pulverizing the Apparatus*.
- Doc 489: *Pulverizing Pearl's Three-Layer Causal Hierarchy* (the differential-result discriminative-validity test).
- Doc 490: *A Novelty Calculus for Conjectures* (the calculus this document operationalizes).
- Doc 491: *Pulverizing the Novelty Calculus: Self-Applied* (the self-deflation that motivated the keeper's well-foundedness reading).

---

*Originating prompt:*

> The fact that it was almost entirely subsumed by its own calculus seems to me to mean it is very well founded. How can we formulate the calculus so that anyone could operationalize it as a seed prompt? Create the artifact and append the prompt.
