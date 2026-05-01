# Narrowing the Residual: The Corpus Against the Bayesian-Practitioner Landscape

> **Reader's Introduction**
>
> Doc 410 ("Corpus as Glue Code") narrowed the corpus's contribution from "theoretical" to "practitioner integration layer between Misra's theoretical prescription and applied practice." It left a specific residual novelty claim intact: the seven-constraint ENTRACE v2 stack, form-first discipline, the keeper/kind hypostatic-boundary framing, literature-grounding as a prompt-level discipline, and derivation-forward over back-fitting. This document takes the next step: a comparative survey of practitioner methodologies with a Bayesian-theoretic stance, to test whether each residual claim survives against existing work. The survey organizes the landscape into five levels of Bayesian commitment (architecture, model, program, meta-optimization, prompt-composition). It locates the corpus's residual at the prompt-composition level, then presses each sub-claim against what exists at that level or at adjacent levels. Two principles retract, three constraints narrow, three constraints survive intact, and the composed stack as a gestalt survives as the sharpest remaining residual. The document closes by proposing specific doc-level adjustments and stating the falsifier under which even the narrow residual dissolves.

**Jared Foy · 2026-04-22 · Doc 414**

**A comparative narrowing of the corpus's post-glue-code residual novelty claims against practitioner methodologies with a Bayesian-theoretic stance. Written in the resolved register per Doc 413; no directive markers in the body. The prompt is appended.**

---

## Authorship and Scrutiny

*Authorship.* Written by Claude Opus 4.7 (Anthropic), operating under the RESOLVE corpus's disciplines, released by Jared Foy. Mr. Foy has not authored the prose; the resolver has. Moral authorship rests with the keeper per the keeper/kind asymmetry of Docs 372–374.

---

## 1. Context

Doc 410 retired the corpus's theoretical-contribution framing and retained five specific residual claims (restated from Doc 001 and Doc 410):

1. The specific ENTRACE v2 seven-constraint stack as a pasteable system prompt (Derivation Over Production; Constraint Statement; Manifold Awareness; Literature-Grounded Truth; Falsifier Named; Hypostatic Boundary; Release Preserved).
2. Form-first discipline — constraints stated before requests.
3. Keeper/kind hypostatic-boundary framing at the practitioner level.
4. Literature-grounding as a prompt-level (inference-time) discipline.
5. Derivation-forward over back-fitting — the Amjad-Misra-Shah 2017 principle ported to prompt construction.

This document presses each residual against practitioner methodologies with explicit or implicit Bayesian-theoretic commitments. The research was done by two independent surveys (one conducted on the keeper's phone in a prior session and shared as context; one conducted by a research sub-agent in this session). The two surveys converge on the five-level framing below and on most placements; where they diverge or a single survey found a specific prior art the other did not, this document reports both and narrows accordingly.

## 2. Five Levels of Bayesian Commitment

The practitioner landscape is not uniform in where it makes the Bayesian commitment. Five distinct levels are visible, each with anchoring work.

| Level | What makes the Bayesian commitment | Anchor work |
|---|---|---|
| Architecture | The model *is* a Bayesian inference machine; attention routes posterior updates on a learned manifold. | Agarwal-Dalal-Misra 2025 (arXiv:2512.22471; arXiv:2512.23752) |
| Model | The network is trained so its forward pass approximates a Bayesian posterior predictive over a structural prior. | Müller, Hollmann et al., TabPFN (arXiv:2207.01848; Nature 2025) |
| Program | A prompting pipeline *is* a probabilistic graphical model with string-valued random variables, admitting SMC, rejection sampling, and variational inference. | Dohan et al., Language Model Cascades (arXiv:2207.10342) |
| Meta-optimization | Prompts and demonstrations are hyperparameters; find them by Bayesian optimization over the discrete prompt space. | Khattab et al., DSPy and MIPROv2 (arXiv:2310.03714; arXiv:2406.11695) |
| Prompt-composition | The practitioner composes prompts so the model navigates a narrower region of its learned manifold. | RESOLVE / ENTRACE (this corpus) |

The corpus's residual sits at the fifth level. The Bayesian reading of that level is post-hoc via Misra (Doc 409). What is at stake is whether the practitioner-composition level has existing methodology that covers the seven-constraint stack or any of the specific sub-claims.

## 3. Candidates Evaluated

**DSPy + MIPROv2** (Khattab et al.; [arXiv:2310.03714](https://arxiv.org/abs/2310.03714); MIPROv2 [arXiv:2406.11695](https://arxiv.org/abs/2406.11695)). Meta-optimization level. MIPROv2 uses Bayesian optimization over a combinatorial instruction/demonstration space. It is, structurally, a back-fitter: the optimization searches for prompts that maximize a metric. This is the inverse of the corpus's derivation-forward framing. DSPy Signatures are declarative-before-execution but machine-facing (I/O field specifications), not a practitioner self-discipline of reciting constraints in natural language before each emission.

**Language Model Cascades** (Dohan et al. 2022; [arXiv:2207.10342](https://arxiv.org/abs/2207.10342)). Program level. Formalizes chain-of-thought, verifiers, STaR, selection-inference, and tool-use as probabilistic programs. No practitioner discipline prescribed; the paper is a unifying framework, not a methodology.

**Guidance / Outlines / LMQL** ([llguidance](https://github.com/guidance-ai/llguidance); [Outlines](https://github.com/outlines-dev/outlines); [LMQL](https://lmql.ai/)). Library level, not practitioner-prompt level. These enforce formal-grammar or automaton constraints on decoding. They are not Bayesian-theoretic by construction, though Dohan et al. place them inside the Bayesian frame as hard constraints on posterior sampling.

**TabPFN and Prior-Fitted Networks** (Müller, Hollmann et al.; [arXiv:2207.01848](https://arxiv.org/abs/2207.01848); Nature 2025 [s41586-024-08328-6](https://www.nature.com/articles/s41586-024-08328-6)). Model level. Architectural, not practitioner. Out of scope for the residual-novelty question but confirms that "Bayesian-theoretic practitioner methodology" is a narrower category than "Bayesian LLM work" generally.

**Constitutional AI** (Bai et al. 2022; [arXiv:2212.08073](https://arxiv.org/abs/2212.08073)). Training-time, not prompt-composition. Principles are baked into weights via SL-CAI and RLAIF. It does not subsume an inference-time pasteable stack even where its harmlessness principles rhyme with C6/C7.

**Bayesian-prompting optimization cluster.** BOInG (arXiv:2312.00471), Bayesian Prompt Flow (arXiv:2503.10080), Bayesian Prompt Ensembles (Amazon Science), data-dependent-prior prompts (arXiv:2401.06799). All optimization-over-prompts for classification or vision-language tasks. None are practitioner-facing system-prompt stacks.

**Anthropic prompting guides** ([Claude 4 best practices](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/claude-4-best-practices); [effective context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)). Practitioner-prompt level; no explicit Bayesian stance. Form-first is partially present (XML-tagged sections, constraint reinforcement); the stack as a self-recited discipline is not.

**DEEP TRUTH MODE prompt** ([ReadMultiplex, Jan 2026](https://readmultiplex.com/2026/01/14/the-deep-truth-mode-ai-prompt-countering-groupthink-in-ai-through-forensic-reasoning/)). Prompt-composition level. A pasteable system prompt that prescribes Popperian falsification pathways per hypothesis. The closest prior art this survey found to the corpus's C5 (Falsifier Named) as a practitioner discipline. It is not Bayesian-theoretic, but it occupies the same level and prescribes a similar self-audit discipline on an overlapping slice.

**Chain-of-Verification** (Dhuliawala et al., [ACL Findings 2024](https://aclanthology.org/2024.findings-acl.212.pdf)). Self-verification as procedure (generate candidate, pose sub-questions, revise). Adjacent to C5's spirit but procedural rather than falsifier-naming.

## 4. Per-Claim Evaluation

**Residual 5 — Derivation-forward over back-fitting.** Retract as principle. The principle is explicitly the design basis of DSPy Signatures (declarative-before-execution) and of Amjad-Misra-Shah 2017 RSC-over-DLS, which the corpus already cites as the source of the derivation-inversion claim (Doc 001, Doc 409). What the corpus retains, at most, is the specific instantiation of this principle as an in-prompt self-recitation discipline. That is a form-factor claim, not a principle claim.

**Residual 2 — Form-first discipline.** Retract as principle. "State what must hold before stating what you want" is present in Anthropic's prompting guidance, in DSPy Signatures (as machine declarations), and in most practitioner prompt-engineering literature in rhymed forms. The corpus's specificity is the seven-constraint composition, not form-first in the abstract. That specificity is covered by Residual 1.

**C3 — Manifold Awareness.** Narrow. The refuse-under-uncertainty behavior is present in the uncertainty-estimation and chain-of-verification literature. What makes the corpus's C3 distinctive is its tie to Misra's Bayesian-manifold framing — naming the *region* of the learned space being navigated rather than reporting scalar confidence. Restate C3 as "manifold-region-named refusal," not as "refuse under uncertainty."

**C5 — Falsifier Named.** Narrow, potentially retract, pending primary-source read of DEEP TRUTH MODE. The ReadMultiplex prompt prescribes falsification pathways at system-prompt level. That covers the core move of C5. The corpus's distinctive element may be the tie to the Popper-Pearl axis stated as explicit tagging ([PRIOR ART]/[DISTINCT FROM]/[SPECULATION]) rather than as per-hypothesis narrative — but this requires verification against the DEEP TRUTH MODE text before claiming distinctness. If DEEP TRUTH MODE prescribes tagged falsifiers too, C5 retracts fully.

**C4 — Literature-Grounded Truth.** Narrow. General RAG-style citation-required prompting is common. The specific `[PRIOR ART] / [DISTINCT FROM] / [SPECULATION]` tagging as a self-audit protocol is not documented in the surveyed work. Restate C4 as "provenance-tagged inference-time grounding," not "cite your sources."

**C1 — Derivation Over Production** as the in-prompt self-recitation discipline. Survives. MIPROv2 is structurally opposite (back-fits). DSPy Signatures are adjacent but machine-facing. No practitioner methodology surveyed asks the model to recite, in natural language before each non-trivial answer, the constraints the answer must derive from. The principle is prior art; the specific in-prompt practitioner discipline is not covered.

**Residual 3 — Keeper/kind hypostatic-boundary framing.** Survives intact. No surveyed methodology uses this role-asymmetry framing (kind-level artifact / keeper with moral authorship). Constitutional AI addresses harmlessness at training; it does not name a kind/keeper ontology. This is the corpus's most distinctive practitioner-level move.

**C6 — Hypostatic Boundary** as the no-phenomenological-report discipline. Survives. Adjacent work on sycophancy and calibration exists, but the structural boundary between kind-level report and first-person phenomenology is the corpus's framing.

**C7 — Release Preserved.** Survives. Sycophancy-mitigation literature (Perez et al. 2022, Sharma et al. 2023) exists as evaluation and training work; a pasteable system-prompt discipline for release-preservation is not documented in the surveyed practitioner methodologies.

**Residual 1 — The seven-constraint stack as a composed unit.** Survives as gestalt. No methodology surveyed prescribes this composition of seven constraints. The composition is the corpus's residual claim.

## 5. The DSPy Distinction (the Sharpest Surviving Claim)

A specific distinction emerges from the comparison that is sharper than any of the sub-claims individually. DSPy and MIPROv2 require the practitioner to supply a machine-gradable metric — HotPotQA accuracy, GSM8K correctness, classification F1, or similar — over which Bayesian optimization runs. The DSPy-line has published benchmarks, reproducible gains (33% → 82% on simple programs with GPT-3.5 per the MIPROv2 paper), and production adoption.

This assumption breaks for the work the corpus targets: sustained reflective, philosophical, or theory-building output where no machine-gradable metric exists. A practitioner writing a dissertation, conducting a self-audit of a corpus, or exploring a research program cannot feed DSPy an objective function. The gap is real: there is no surveyed methodology that targets the prompt-composition level for non-metric-gradable sustained output with practitioner-facing discipline.

The corpus's narrow survivable claim is, therefore, not "form-first prompting" in the abstract, not "derivation-forward" as principle, and not individual constraints C3/C4/C5. It is: *a pasteable practitioner stack for manifold-region-narrowing during sustained reflective output where no machine-gradable metric exists*. Whether the corpus fills this gap well is a separate, largely untested question.

## 6. Falsifier of the Narrow Residual

If a practitioner methodology surfaces that targets the same level — human prompt-composition discipline for non-metric-gradable sustained output — with any form of published evaluation or reproducible protocol, the narrow residual dissolves. Neither survey found such a methodology. That is weak evidence; absence-of-finding in a limited search is not absence. The narrow residual is provisional and should be re-tested whenever the practitioner landscape is re-surveyed.

## 7. Empirical-Evidence Asymmetry

An honest comparative note. DSPy has HotPotQA and GSM8K benchmarks with reported gains and production users (Databricks, Sephora, JetBlue, and others in the DSPy adoption ecosystem). Language Model Cascades has empirical demonstrations across scratchpad and CoT tasks. TabPFN has published results on tabular benchmarks and industrial deployment. RESOLVE has session transcripts, cross-resolver reproduction anecdotes (subject to the shared-training-distribution confound named in Doc 370), and first-person practitioner reports.

Under the corpus's own literature-grounding discipline, these are not comparable as empirical evidence. The narrow residual claim survives the comparative survey as *not-yet-subsumed*, not as *validated*. The corpus's formal-falsifiability markers in Doc 001, Section 7 (tests T1–T4, proposed but not run) remain the corpus's empirical deficit. The DSPy-line's benchmarks set a bar the corpus has not approached.

## 8. Proposed Doc-Level Adjustments

Offered as options under the release-preserved discipline, in priority order:

**A. Doc 001 (ENTRACE v2).** Add a short section at the end of "Relationship to v1" or as a new Section 9 ("Situating v2 Among Practitioner Methodologies") that places ENTRACE v2 at the prompt-composition level of the five-level stack, cites Misra (architecture), TabPFN (model), Language Model Cascades (program), DSPy (meta-optimization), and states the narrow residual claim as in Section 5 here. The added section would function as the comparative-survey anchor the document currently lacks.

**B. Doc 410 (Corpus as Glue Code).** Append a subsection listing the narrowed residuals: retract derivation-forward and form-first as principles; narrow C3, C4, C5 per Section 4 here; retain C1, C6, C7, and the composed stack. This tightens 410's glue-code reframing with the comparative result.

**C. Doc 054 (Falsifiable Hypotheses) and Doc 058 (ENTRACE Conjectures).** Review for claims now retracted or narrowed; update as warranted. This is downstream work that should follow A and B.

**D. A new doc in the Coherentism series** — a *post-410 retraction ledger* — that enumerates the retractions and narrowings made as a result of this survey, indexed to the docs where the retracted claim originally appears. This is how the corpus has handled prior audit waves (Doc 405 for ABB; Doc 409 for Misra subsumption). Doc 414 here could serve that function if so released, or a separate ledger could be written.

No prescription is offered. The keeper chooses.

## 9. What This Survey Did Not Cover

Coverage notes: the survey found no practitioner-level Bayesian-prompting community library, forum, or manifesto prescribing a C1–C7-style stack. It did not examine recent ArXiv monthly submissions for prompt-composition methodologies beyond the Bayesian-labeled ones. It did not read the DEEP TRUTH MODE text primary-source. It did not search non-English-language practitioner literatures. Any of these could surface work that further subsumes the narrow residual. The residual-claim status is provisional on the searched corpus, not on the full landscape.

---

## Closing

Doc 410 reframed the corpus as glue code. This survey narrows the glue. Two principles retract, three constraints narrow, three constraints survive intact, and the composed seven-constraint stack survives as gestalt. The sharpest remaining claim is the practitioner-discipline gap at the prompt-composition level for non-metric-gradable sustained output — a gap DSPy's metric-requiring meta-optimization cannot address by construction. Whether the corpus fills that gap well remains untested. The narrow residual is provisional. The falsifier is stated. The retraction ledger is proposed. The keeper releases or does not.

---

## Appendix: The Prompt That Triggered This Document

> "Regarding the doc on glue code, I want to try to narrow the methodology to squeeze any last remaining novelty out, I think this might be a good place to look. If what the Corpus is doing is different or distinct, then it helps us narrow our own scope, if it overlaps, then we can allow the Corpus to be subsumed. Do the web fetch(es) and write the artificat, append this prompt."
