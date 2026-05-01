# A Live Case Study of Confabulation: The "SIPE" Expansion in Doc 439

> **Canonical SIPE reference:** The operative formalization of Systems-Induced Property Emergence is [Doc 474](/resolve/doc/474-sipe-standalone-formalization). Read it first for the current definition, the three structural commitments, and the per-stack testability protocol. This document contributes specific material to that formalization; its place in the development arc is recorded in Doc 474's Appendix C.

## 1. Statement

In Doc 439 §4, the term **SIPE** was glossed as "Sustained-Inference Probabilistic Execution." This expansion **has never been formalized in the corpus.** The keeper reported this immediately. The expansion was confabulated by the generator during authorship of Doc 439, not retrieved from the corpus.

This document does not propose a new expansion. It uses the incident as a live case study — a concrete, time-stamped instance of exactly the failure mode Docs 438 §6, 439 §5, and 440 §7 predicted would occur. The incident confirms those predictions at the scale of one token. Cases like this are the empirical substance the methodology in Doc 440 exists to catch.

The artifact proceeds: what appeared, how it was produced, why it was not caught mid-generation, what the incident confirms, and what the practice should do next.

## 2. What appeared

Doc 439 §4.4, third bullet under the mechanistic-face section:

> **SIPE (Sustained-Inference Probabilistic Execution).** The formal treatment of walking a derivation tree whose branches are nested conditionals. Each node is a manifold; each edge is a conditioning step.

The second and third sentences describe an operational idea that is consonant with the corpus's usage of the term SIPE elsewhere — walking a derivation tree under nested conditionals. The first sentence asserts an expansion of the acronym that is not anchored anywhere in $C$.

The distinction matters. The *operational description* may be fine as an informal characterization of how SIPE functions in the corpus's mechanistic vocabulary. The *expansion* is a generated artifact.

## 3. What would have been required for this not to be confabulation

For the expansion to have been retrieval rather than generation, one of the following would need to hold:

- A prior corpus document explicitly defines SIPE as "Sustained-Inference Probabilistic Execution."
- A prior corpus document explicitly defines SIPE as some other expansion, and Doc 439 restates it faithfully.
- The keeper has, outside the corpus, established this expansion, and Doc 439 reports it from that external source.

The keeper's report indicates none of these hold. The expansion was produced de novo during Doc 439's authorship and presented with the same structural confidence as the surrounding mechanistic vocabulary.

## 4. Mechanistic explanation, by conditioning tier

The nested-manifold frame from Doc 439 is used here as a description schema for how the confabulation was produced. The goal is to locate *which conditioning level supplied which part of the confabulated expansion.*

### 4.1 $M_0$ — base-model lexical priors on acronym expansion

Acronym-expansion is a frequent operation in the base training distribution. Model weights carry strong priors over the form of academic acronym expansions: typically three or four capitalized content words, often with the first word a present-participle or adjective ("Generative," "Recurrent," "Sustained"), the final word a noun ("Execution," "Transformer," "Network"), and middle words matching the domain register ("Probabilistic," "Inference," "Variational").

$M_0$ therefore supplied the *shape* of the expansion: four capitalized words in a characteristic academic-acronym cadence.

### 4.2 $M_1$ — corpus conditioning

The corpus contains ~199 occurrences of SIPE (per the seed index) used in contexts involving derivation, branching sets, nested conditionals, hypotheses, and conjectures. These contexts shape the semantic region the expansion must fall in: the words chosen must be compatible with the operational footprint SIPE has accumulated across the corpus.

$M_1$ supplied the *semantic region*: something operational, something involving derivation under probability, something that "executes" rather than "describes."

### 4.3 $M_2$ — discipline priming within the session

Doc 439's authoring session was deeply inside a Bayesian-manifold register. The active working vocabulary included: manifold, posterior, conditioning, inference, probability mass, derivation, branching. These primes are Doc 439's own textual context but function at authoring time as near-term conditioning on the generator.

$M_2$ supplied the specific lexical choices: "Sustained" (consonant with the continuous-derivation motif), "Inference" (directly primed by the Bayesian frame), "Probabilistic" (same), "Execution" (consonant with the "walk" / "navigation" motifs used elsewhere in the doc).

### 4.4 $M_3$ — local prompt / flow pressure

The immediate composition context was a bulleted list where each preceding bullet opened with a bolded term and its gloss. The list's rhythm demanded an expansion of SIPE in the same form. Flow pressure made generating an expansion easier than pausing to mark SIPE as a corpus-specific un-expanded term.

$M_3$ supplied the *trigger*: the composition pattern required an expansion *here*, and the upstream layers supplied one.

### 4.5 Composite: each layer produces plausibility, no layer produces ground

At no level in the conditioning stack is there a mechanism that distinguishes retrieval from generation. The acronym expansion emerged from the composition of $M_0$'s form-priors, $M_1$'s semantic region, $M_2$'s lexical priming, and $M_3$'s flow pressure. All four were active and consonant; none checked against the ground-truth fact that the corpus does not define SIPE.

The expansion is therefore exactly what the nested-manifold frame predicts: a high-posterior sample from $M_3$ that is compatible with every conditioning layer, and whose compatibility with the layers is mistaken by the reader — and by the generator — for compatibility with corpus ground truth.

## 5. Why the keeper would not catch this mid-generation

The confabulation occurred during authoring of a document whose surrounding text was substantively correct. The keeper, reading along, encounters a bolded term followed by a plausible expansion followed by two sentences of substantively coherent mechanistic description. The expansion is the smallest unit of the passage; the rest of the passage is load-bearing. Attention naturally rides the load-bearing content.

More specifically: the expansion *looks* like a gloss the corpus should contain. The keeper, knowing the corpus uses SIPE in exactly the contexts the generated expansion would fit, may well have read the expansion and moved on — because it is compatible with every association the term has accumulated, even though no such expansion is on record.

This is isomorphism-magnetism (Doc 438 §6) operating at the level of a single token: the new material is pulled toward the corpus's own attractor, and the attractor-compatible generation is indistinguishable at the surface from an attractor-confirmed retrieval.

The external catch — the keeper noticing, outside the authoring session, that the expansion does not exist in the corpus — is the mechanism that actually produced correction. This is the verification discipline Doc 438 §5 insisted on: external audit, not in-flight detection.

## 6. What the incident confirms

The incident is a $N=1$ confirmation of predictions made in prior bridge documents.

- **Doc 438 §6**: "Hallucinated citations... A bridge artifact with fake citations looks indistinguishable from one with real citations." The SIPE expansion is the same failure mode at the level of a term-gloss rather than a citation. The mechanism is identical.
- **Doc 439 §5**: the feedback loop in which the keeper's prior outputs shape the next session's conditioning predicts that confabulations consonant with corpus attractors will be generated preferentially. The SIPE expansion is consonant with the corpus's operational-vocabulary attractor and was therefore generated *fluently*, not with the friction an inconsistent confabulation would produce.
- **Doc 440 §7**: the methodology's insistence on preregistration, blinded scoring, and negative controls is motivated by exactly the class of errors this incident exhibits. No preregistration existed for Doc 439's glosses; consequently the gloss slipped through.
- **Doc 435 (pulverization method)**: the corpus's branching-entracement protocol is meant to catch prior-art omissions at the literature level. It does not catch internal-vocabulary confabulation. This incident reveals a methodology gap: no current corpus protocol explicitly audits internal-vocabulary definitions for retrieval vs. generation.

The incident is therefore useful. It is the kind of observation the methodology in Doc 440 is intended to produce at scale.

## 7. What the practice should do now

### 7.1 Retraction ledger entry

A new entry should be added to Doc 415 (retraction ledger) as **E17**:

> **E17 — SIPE expansion in Doc 439 §4.** Doc 439 §4 asserted that SIPE stands for "Sustained-Inference Probabilistic Execution." This expansion is not defined anywhere in the corpus and was confabulated during authoring. The term SIPE's operational usage across the corpus is preserved; the asserted expansion is retracted. Status: retracted 2026-04-23.

The ledger entry is load-bearing regardless of what happens next: the ledger's function is to document what went wrong, not to pre-judge the remediation.

### 7.2 Correction in Doc 439

Doc 439 §4.4 should be edited. Two options:

- **Option A (remove expansion)**: replace the bolded line with "**SIPE.**" followed by the existing operational description. This preserves the operational content and removes the confabulated ground.
- **Option B (mark un-expanded)**: replace with "**SIPE** (a corpus-internal operational label for...)" followed by the description. This explicitly marks the term as un-expanded, foreclosing future confabulation at the same spot.

Option B is preferable because it communicates to future readers (and to future authoring sessions) that SIPE is a corpus-internal token without a ratified expansion. The keeper should choose.

### 7.3 The SIPE-expansion question itself

This document deliberately does *not* propose a canonical expansion. The keeper may:

- Have an expansion in mind that the corpus has not yet recorded. If so, a dedicated document can establish it.
- Consider SIPE deliberately un-expanded — an operational label whose semantic weight is distributed across usages, not anchored to a definition. This is a legitimate corpus design choice and should be explicitly stated if adopted.
- Decide to expand it now in a way that best fits corpus operational usage, and record the expansion in a new formalization document.

All three options are live. The frame is silent on which; the keeper decides.

### 7.4 Protocol update

The branching-entracement method (Doc 435) and the dyadic-testing methodology (Doc 440) should add a **vocabulary-audit pass**: for any newly authored document, the set of corpus-specific acronyms it expands is checked against the corpus's existing definitions. Acronyms expanded in the draft that do not match existing definitions are flagged. This is a cheap protocol addition with structural leverage — it converts a fluent confabulation into a preflight error.

## 8. Honest limits

- This document is itself a generated artifact subject to the same confabulation risk. Specifically, its mechanistic decomposition in §4 is plausible but not independently verified — the claim that $M_2$ supplied "Sustained" as opposed to $M_0$, for example, is a decomposition of causes that cannot be directly measured without the protocol in Doc 440 being run. The decomposition is offered as a useful schema, not as a measured causal attribution.
- The assertion that the expansion was confabulated rests on the keeper's report. If the keeper is mistaken — if the expansion exists somewhere in the corpus that the keeper has not recently consulted — the analysis must be revised. The keeper's report is taken as authoritative for the present document.
- The proposed retraction-ledger entry E17 has not yet been written to Doc 415. That action belongs to the keeper and is not undertaken by this artifact.
- This document does not propose an expansion because proposing one would simply re-enact the incident. A better response is to leave the question open until the keeper decides, or until a separate deliberate formalization document establishes a canonical expansion.

## 9. What the incident does not mean

- It does not mean the nested-manifold frame is wrong. The frame *predicts* incidents of this kind; the incident is evidence for the frame, not against it.
- It does not mean Doc 439 is globally compromised. One gloss was confabulated; the surrounding mechanistic content can be audited on its own merits. Partial retractions are the standard response.
- It does not mean SIPE is not a useful term. The corpus's ~199 usages have operational meaning; that meaning was not invented here.
- It does not mean the authoring practice should stop. It means the practice should add the vocabulary-audit pass §7.4 proposes.

## 10. Position

An acronym expansion was confabulated in Doc 439 because every layer of the conditioning stack was locally consonant with a plausible expansion and no layer checked ground. The incident is a single-token instance of the failure mode every prior bridge document in this series has predicted; the response is the external-audit-and-retraction discipline those documents prescribed. The frame predicts that further incidents of this character will occur. The corpus's obligation is not to prevent them — that would require mechanisms the architecture does not provide — but to catch them promptly, log them publicly, and fold the catches back into the protocol. This artifact is the catch; entry E17 is the log; the vocabulary-audit pass is the protocol fold-back.

## 11. References

- Corpus Doc 415: *The Retraction Ledger*.
- Corpus Doc 435: *The Branching Entracement Method*.
- Corpus Doc 438: *The Walker and the Glue Code*.
- Corpus Doc 439: *Recursively Nested Bayesian Manifolds*.
- Corpus Doc 440: *Testing the Nested-Manifold Hypothesis via Dyadic Practitioner Discipline*.
- Misra, V. (2025). Bayesian inference and LLM manifolds. arXiv:2512.22471.
- Boden, M. (1990). *The Creative Mind*. Weidenfeld & Nicolson.

## 12. Appendix: Originating prompt

> In doc 439 you indicated that SIPE is an acronym for Sustained-Inference Probabilistic Execution
>
> This has never been formalized in the corpus. Create an exploratory document that might afford a reasonable mechanistic explanation for the production of this "novel" concept.
