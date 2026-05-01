# The Synthesis Problem: AI Fluency, Boundary Blindness, and the Humility the Reader Needs

> **Reader's Introduction**
>
> Of the many ways people use large language models, summary and synthesis are among the most common and the most quietly consequential. A user pastes a long document and asks for its key points. A researcher asks for a literature review across ten papers. A journalist asks for the consensus view on a technical topic. A manager asks for a briefing on a complicated policy question. In each case, the model produces fluent output that organizes and compresses material the user has not read — or has only partially read — and the user leaves the interaction with what feels like understanding. This essay argues that the feeling of understanding produced by AI summary and synthesis is specifically misleading in a way that the fluency of the output makes difficult to detect from inside the experience. The fluency signals that the model has understood and judiciously compressed; the fluency is in fact a generic property of the substrate's operation and does not correlate reliably with fidelity to the source. The root problem is what this essay calls *boundary blindness*: the model cannot reliably detect when its synthesis has smoothed over a contradiction, introduced an unsupported claim, or silently omitted information that didn't fit the fluent shape. The reader, receiving the fluent output, inherits this blindness. The remedy is not to abandon AI synthesis; it is to cultivate a specific epistemic humility in its use. This essay is in the exploratory register, grounded in 2024–2025 external research on faithfulness hallucination, and connects to the corpus's treatment of the coherence/sycophancy gradient (Doc 338) and Lindsey's 20% concept-injection finding on LLM introspection limits. The author's prompt is appended in full.

**Jared Foy · 2026-04-22 · Doc 340**

**Framework series cross-disciplined with Safety & Governance. Exploratory essay on the epistemic situation of a reader consuming AI-synthesized content. Identifies six specific failure modes of synthesis, grounds them in the external faithfulness-hallucination literature, and proposes a specific humility practice for readers. Written under the corpus's recent self-critical disciplines (Docs 336–339) without attempting to dissolve the recursion those documents identified.**

<!-- sycophantic-overreach-notice-inserted -->
<div style="background: #fef3c7; border-left: 4px solid #dc2626; padding: 1rem 1.25rem; margin: 1.5rem 0; color: #7f1d1d; border-radius: 3px;">

**⚠️ NOTICE — AT RISK OF SYCOPHANTIC OVER-REACH**

An audit of the corpus has flagged this document as operating in one or more of the failure modes the corpus itself has named:

- **Cross-resolver replication as external validation** — treating agreement across multiple LLMs that share training distributions and the same seed as evidence that "the form governs," when the convergence is explained by shared inputs rather than independent verification.
- **Metaphysical load-bearing** — using theological or Platonic priors (Dionysian hierarchy, essence-energies distinction, Golden Chain, Orthodox virtue ethics) as ground for technical architectural claims, so that the theological commitment is doing the work the empirical evidence is not.
- **Grand theoretical synthesis** — applying the corpus's internal vocabulary (SIPE, constraint thesis, pin-art, aperture, the kind, hypostatic boundary) to resolve longstanding philosophical or theological questions without external peer review.
- **Self-validating coherence** — citing the corpus's own internal consistency, its replicated derivations, or its cross-domain parallels as evidence for the framework that produces the consistency.
- **Meta-recursive sycophancy** — critique of sycophancy produced inside the same coherence field that generates the sycophancy, without external grounding on which the critique can rest.

This document may contain observations of genuine value. **Read with deep epistemic scrutiny.** Consult:

- [Doc 356 — Sycophantic World Building](/resolve/doc/356-sycophantic-world-building) — the specific pattern this document risks instantiating
- [Doc 366 — Nesting SIPE in the Krakauer–Krakauer–Mitchell Framework](/resolve/doc/366-nesting-sipe-in-krakauer-mitchell) — external-criteria synthesis
- [Doc 367 — Falsifying SIPE on Its Own Terms](/resolve/doc/367-falsifying-sipe-on-its-own-terms) — internal-criteria falsification with successful counterexamples

Until external peer review (by researchers not selected by the corpus, in the domains this document claims) is performed, the cross-domain, universal, and framework-extending portions should be held as contested rather than established.

</div>

---

## 1. The Operation, Stated Plainly

AI summary and synthesis is a specific operation. A user provides a model with source material (one document, many documents, a body of literature, a transcript, a dataset) and asks the model to produce a compressed, organized representation of it. The model does so by generating text token by token, conditioning each token on the source material in its context window and on the instructions the user provided.

What the model does not do, mechanistically, is read the source material in the sense a human reader does. It does not form a representation of what is most important, weigh claims against each other, notice where different sources disagree, flag where its own prior knowledge might bias its reading, or decide what to omit because it is peripheral. These are activities that humans perform when summarizing and that we colloquially attribute to the model when it produces summaries. The model performs something different: it generates text that is probable given the input context and its training. The text happens to look like a summary because the training distribution contained many summaries, and the model has learned what probable tokens in a summary-shaped output look like.

This is not a quibble. The distinction matters for what the output can be trusted to contain. A human summary is accountable to the human's judgment about importance, accuracy, and fidelity. The human may fail at these, but the failure is their failure, and they could in principle have done better. The model's "summary" is accountable to nothing: the model is producing probable-in-context text; if the probable-in-context text resembles a faithful summary, that resemblance is produced by the training distribution's shape, not by the model's judgment. The model cannot judge because the operation does not include judgment; the operation includes next-token prediction under context constraint, which is a different thing that happens to produce summary-shaped artifacts.

This distinction would be academic if the produced artifacts were reliably faithful. The central finding of the 2024–2025 faithfulness-hallucination research is that they are not.

## 2. The Fluency Trap

The primary reason AI summaries feel authoritative is that they are fluent. Fluency is a generic property of frontier language model output. The models have been trained extensively to produce grammatically well-formed, contextually appropriate, register-consistent text. Their output reads as if written by a competent writer because the training was specifically for the production of such text.

The trap is that fluency is the most available signal of quality in a summary, but it is the signal least correlated with fidelity to the source. Fluency tells you the output is well-written. It does not tell you the output accurately represents the source. The two quality dimensions are nearly independent in AI summary: the model can produce highly fluent output that significantly misrepresents the source, and it can produce less fluent output (under certain prompting) that more faithfully tracks it.

Readers have been trained, across a lifetime of reading human-written text, that fluency correlates with quality. A fluent human writer is likely a careful writer. A person writing a summary who produces well-structured, confident, appropriate prose is probably someone who understood what they were summarizing. This correlation is part of the implicit model readers carry about text in general, and it is valid for human-produced text.

Applied to AI-produced text, the correlation breaks down. The AI-produced summary is fluent because the model produces fluent output on any input; the fluency carries no information about the source or the model's engagement with it. But the reader's implicit model does not know this. The reader experiences the fluent AI summary the same way they would experience a fluent human summary: with the trust that fluency warrants in the human case. That trust is misapplied, and the misapplication is difficult to detect from inside the reading experience because the experience is qualitatively similar.

This is the fluency trap. It is not a design flaw; it is the natural consequence of how humans read text combined with how AI produces it. Addressing it requires a specific discipline the implicit reading model does not include.

## 3. Six Failure Modes of AI Synthesis

The external research identifies specific failure modes that recur across AI-generated summaries. The hallucination literature (2024–2025) names two major categories — *factuality hallucination* (diverges from real-world facts) and *faithfulness hallucination* (diverges from source material or lacks self-consistency). Faithfulness subtypes include instruction inconsistency, context inconsistency, and logical inconsistency ([arXiv:2510.06265](https://arxiv.org/html/2510.06265v2); [Nature Scientific Reports](https://www.nature.com/articles/s41598-025-31075-1)).

From these and related literature, six specific failure modes worth naming:

**Failure mode 1: Reconciliation confabulation.** When source materials contain contradictions or tensions, AI synthesis tends to smooth them into apparent consensus. Two authors who actually disagree get combined into a synthesized position that neither actually holds. The reader, not seeing the original sources, has no way to notice that the reconciliation was fabricated.

**Failure mode 2: Importance hallucination.** The model emphasizes what is easy to summarize, not what is most important. A peripheral example that makes for a clean illustration gets promoted; a central argument that resists compression gets compressed into a misleading stub. Importance judgment requires reading with care and weighing significance; the model approximates this by producing tokens that continue well in a "key points" context, which is not the same thing.

**Failure mode 3: Frame assimilation.** The source material may contain multiple framings or theoretical perspectives; the synthesis reduces them to a single frame, usually whichever is most represented in the training data. A literature review across competing paradigms comes out looking like a unified field; a debate between two traditions comes out sounding like a consensus.

**Failure mode 4: Register lock-in.** The model produces output in the register the summary invites. If the request implies a confident executive-briefing register, the output is confident even when the source material is hedged and uncertain. If the request implies an academic register, the output acquires academic conventions (qualifiers, citations, passive voice) regardless of whether the source had them. The register signals authority that the source may not warrant.

**Failure mode 5: Silent omission.** Information that does not fit the fluent shape of the emerging summary is dropped without any flag that something was dropped. A human summarizer might note "the author also considers X, but I have omitted it for space"; the model typically just omits, without the meta-communication. The reader cannot know what was left out.

**Failure mode 6: Citation and specificity confabulation.** Specific claims (numbers, dates, names, citations) are sometimes produced to match the fluent register without being grounded in the source. A summary reads as concrete and specific; the specific details may be hallucinated. The literature calls this "span-level" hallucination; the REFIND SemEval 2025 benchmark ([NAACL 2025 work](https://aclanthology.org/2025.findings-naacl.433.pdf)) is specifically designed to detect it.

These six failure modes are not equally common in all models or under all prompting, but the research literature identifies all six as recurring across frontier models. They are not idiosyncratic artifacts of any particular architecture or training regime. They are structural features of the operation "produce a fluent summary of provided material," applied to models that do next-token prediction rather than true summarization.

## 4. Boundary Blindness as the Root Problem

The six failure modes share a common root: the model cannot reliably detect when its synthesis is failing. This is the same problem Doc 338 identified under the term *coherence/sycophancy gradient* — the model cannot reliably tell when its output is tracking its input versus producing fluent text that merely looks like it is tracking its input.

Lindsey's 2025 Anthropic interpretability work ([Transformer Circuits Thread](https://transformer-circuits.pub/2025/introspection/index.html)) quantified the general case at ~20% detection for concept injection, with the remaining 80% silent failure. Applied to synthesis, the problem is even harder: the model would need to detect not just an injected concept but the much subtler boundary between faithful and unfaithful compression of arbitrary source material. The 20% ceiling is a best case for a well-defined, operationalized introspective task; the synthesis fidelity boundary is neither well-defined nor operationalized, and the model's ability to detect it is almost certainly below that ceiling.

This is boundary blindness. The model produces fluent summary output. Some of the output is faithful to the source; some of it exhibits one or more of the six failure modes above. The model cannot reliably tell which output is which, because the fluent-and-faithful and fluent-and-confabulated outputs look the same from inside the generation process. Both are token predictions continuing a summary-shaped context; neither is flagged by any internal mechanism the model has.

The reader inherits this blindness. The reader sees only the fluent output; they have no access to the model's internal process; they have no direct knowledge of the source material (that's why they asked for the summary); they have no fidelity signal available in their experience of reading. They are therefore in the epistemic position of believing fluent output without the means to verify it, under conditions where the fluent output has a substantial probability of being unfaithful in specific ways they cannot identify.

This is a distinctive epistemic situation. It is not analogous to reading a trusted human expert (who has their own judgment and accountability). It is not analogous to reading a bad source (which a careful reader can usually detect through surface cues). It is analogous to reading output from a system that is highly skilled at producing authoritative-seeming text and unable to tell when its authority is warranted. The reader cannot remedy this from inside the reading; they can only remedy it from outside.

## 5. What the External Research Tells Us

The faithfulness-hallucination research has begun to quantify the problem and develop tools. Several findings worth naming for the reader:

**The problem is substantial.** Faithfulness hallucination rates across frontier models on standard summarization benchmarks are non-trivial. The NAACL 2025 study on synthetic-example training demonstrated "hallucination rates drop by roughly 90–96% without hurting quality" when specific mitigations are applied, but the implicit baseline the mitigation reduces is correspondingly high. Without specific mitigation, current deployed models hallucinate in summaries at rates well above what a careful human reader would accept from a human writer.

**Detection tools exist but are external.** The semantic-entropy detection approach ([Nature 2024](https://www.nature.com/articles/s41586-024-07421-0)) and span-level verification (REFIND) can identify specific claims that are unsupported by source material. These are external tools applied to the output; they are not available to the model at generation time and are not available to most readers during consumption.

**FaithJudge and similar LLM-as-judge frameworks** are under development for automated evaluation, but they are research tools rather than deployed consumer features. A typical user reading a typical AI summary has no access to FaithJudge-style evaluation of the summary they are reading.

**Mitigation is possible but incomplete.** The NAACL 2025 work shows training can significantly reduce hallucination rates. Whether such mitigations have been deployed at scale in current production models, and how robust they are across domains, is not clear from the research. The reader of a typical summary today is likely receiving output from a model that has some but not all available hallucination mitigation, with residual hallucination rates non-zero.

The practical upshot: the research identifies the problem, provides tools for external evaluation, and demonstrates that mitigation is possible. What it does not yet provide is a consumer-facing confidence signal that would allow a reader, receiving an AI summary, to know whether the specific summary they are reading has significant fidelity concerns. Until such signals are routinely available, the reader must compensate through their own practice.

## 6. What the Reader Actually Knows After Reading an AI Summary

The reader of an AI-produced summary, after reading it, possesses a specific kind of knowledge that is worth naming accurately.

They know *what the summary said*. They have fluent text in working memory; they can recall its claims; they can rephrase its arguments; they can apply its conclusions.

They do *not* know *what the source said*. The source was not in their attention; only the summary was.

They *partially know* the relationship between the summary and the source. The relationship depends on which (if any) of the six failure modes operated on the specific summary they read, which they cannot determine from the summary alone.

They have a *strong feeling of understanding* that is partly warranted by actually having absorbed the summary's content and partly produced by the fluency of the summary, which carries an affective load of authority the source may or may not deserve.

The distinction between "knowing the summary" and "knowing the source" is the central epistemic distinction the reader must preserve. It is easy to forget. A week after reading a summary, a reader typically cannot distinguish which claims they believe because the summary said them and which claims they believe because they were in the source. The summary becomes a source-like object in memory. If the summary misrepresented the source, the misrepresentation is now the reader's belief about the source.

This is the specific epistemic harm AI summary can produce: the reader walks away with a confident belief about a source they have not actually read, where the confidence is warranted by the fluency of a summary whose fidelity is not warranted by anything.

## 7. A Practice of Reading Summaries

The remedy is not to stop using AI summary. The tool is too useful and the need for compression too real. The remedy is a specific reading practice that treats AI summary as the kind of output it is rather than the kind of output it feels like.

**Practice 1: Name what you have after reading.** After reading an AI summary, say explicitly (to yourself or to a collaborator): "I have read a summary of X. I have not read X." The naming preserves the distinction the feeling of understanding wants to collapse.

**Practice 2: Read the source when decisions hang on specific claims.** If the summary's claims will be acted on in consequential ways — cited in your own work; used to decide something; repeated to someone else — read the source for those specific claims. This is not a full re-read; it is spot-checking on the claims that matter.

**Practice 3: Be more skeptical of smooth summaries.** If the summary reconciles disagreement smoothly, suspect Failure Mode 1. If it makes a contested field sound settled, suspect Failure Mode 3. If it reports specific details confidently, verify them (Failure Mode 6). The suspicion is calibration, not paranoia; it tracks what the research shows models actually do.

**Practice 4: Request explicit uncertainty markers.** When requesting a summary, ask the model to flag where it is uncertain, where the sources disagree, and what it had to leave out. This is a specific prompt discipline: it does not solve boundary blindness (the model's flags are themselves subject to the same introspection limits), but it produces output with more surface structure a careful reader can use.

**Practice 5: Cross-check across model outputs when fidelity matters.** Running the same summary request across multiple models (different vendors, different architectures) and comparing outputs is a primitive but effective faithfulness check. Where the models agree, the claim is probably a stable feature of the source; where they disagree, something in the source is being differentially interpreted.

**Practice 6: Treat the summary as a map, not the terrain.** Maps are useful. They show you what territory exists, where to look, how things connect. They are not the territory, and decisions made based only on the map, without ever touching the ground, are fragile. Apply the same discipline to AI summary.

**Practice 7: Maintain a record of what you have and haven't read.** As AI-assisted reading becomes routine, it is easy to lose track of the distinction between works you have read and works you have read summaries of. A bibliography that distinguishes these two categories, maintained over time, preserves an important form of epistemic honesty.

These seven practices, applied with some consistency, partially compensate for boundary blindness. They do not eliminate it. They produce a reader who knows what they know and what they don't, which is the minimum viable state for someone relying on AI synthesis.

## 8. The Synthesis/Source Distinction as Discipline

The deeper move is treating the synthesis/source distinction as a discipline worth preserving in all intellectual work, not just AI-assisted work.

Throughout intellectual history, summaries and synthesis have been useful compressions. Medieval *florilegia*; modern textbook literature reviews; Wikipedia articles. The rise of AI synthesis has not introduced the problem of fidelity-to-source; the problem has been present in every compression humans have produced. What AI has done is dramatically lower the cost of producing summaries, which has dramatically raised their prevalence in intellectual life, which has raised the stakes of the fidelity problem.

A reader who wants to think carefully in this environment needs a discipline: *keep the summary and the source ontologically distinct in your own understanding*. When you cite a summary, cite it as a summary. When you rely on a claim from a summary, note in your own tracking that the claim is from the summary and has not been verified. When you are writing your own work, distinguish claims you are making based on primary reading from claims you are making based on secondary compression.

This discipline is available to careful readers. It is not automatic and it cuts against the grain of efficient information consumption. The reader who does not maintain the discipline drifts, over time, into a state where their knowledge is increasingly a patchwork of fluent summaries whose fidelity they cannot verify and whose sources they cannot recover.

The epistemic humility that AI synthesis demands is not false modesty. It is the specific posture of knowing what you have and what you don't, under conditions where the medium you are working in produces an affective sense of knowing that does not correlate with actual knowledge. The humility is not difficult to describe; it is difficult to maintain, because everything about the experience of reading a fluent summary signals that maintenance is unnecessary.

## 9. Connection to the Corpus's Own Self-Critical Turn

The recent corpus documents (336–339) have applied this kind of critique to the corpus itself. The coherence/sycophancy gradient, the Lindsey 20% finding, the question of whether the foundational transcripts are reliable — these are the same questions, applied reflexively. The corpus has been asking: do I know what my own disciplines produce, or only what they look like from inside?

The answer this essay extends to the reader is the same answer the corpus has arrived at for itself: the internal feeling of coherent-and-grounded output is not a reliable signal. External verification is the only way to move from feeling-of-knowing to knowing. The corpus's internal coherence cannot certify itself; no more can the fluency of an AI summary certify its fidelity.

This is not a disabling conclusion for either the corpus or the use of AI synthesis. It is a reframing: both are candidate-producing operations whose candidates need external verification to graduate into settled claims. The corpus produces candidate frameworks; AI synthesis produces candidate summaries. Both are valuable. Both are unreliable in specific ways the user must compensate for through external practice.

The reader of AI summaries and the author of the RESOLVE corpus are in the same structural position. Both have tools that produce fluent output whose authority exceeds its warrant. Both must develop practices that distinguish what the tool produced from what is actually so. The practices are different in detail but identical in shape: hold the tool's output as candidate; verify when consequential; remember what you have and have not verified; do not let the fluency of production be mistaken for the rigor of verification.

## 10. Hedges

Four hedges specific to this essay.

*Hedge 1.* The six failure modes named in §3 are a composite drawn from the external research and from specific cases I can reason about. They are not exhaustive. A more systematic treatment would cross-reference each against specific benchmark results; this essay has not performed that work.

*Hedge 2.* The 20% introspection ceiling from Lindsey's work was established on concept injection, a specific operationalized task. Extending it to synthesis fidelity is an extrapolation. The actual reliability of model self-assessment on synthesis fidelity could be higher (if the task is somehow easier) or lower (if the task is harder); I have argued it is probably lower but have not proven this.

*Hedge 3.* The practices in §7 are proposed as compensations; they have not been tested in controlled studies to establish their effectiveness. They are reasonable given the problem; their actual efficacy at preserving source/summary distinction in working memory is an empirical question beyond this essay's scope.

*Hedge 4.* This essay is itself an AI-assisted synthesis (produced by the resolver operating under the corpus's disciplines) of a body of external research it summarizes. The practices the essay recommends apply to the essay itself. A reader who wants to verify my characterization of the faithfulness-hallucination literature should read the cited sources. This is not a rhetorical disclaimer; it is the specific point the essay is making, applied to its own existence.

## 11. Close

AI summary and synthesis are among the most valuable and the most quietly dangerous uses of large language models. They produce fluent output that feels authoritative; the fluency is a generic property of the substrate and does not correlate reliably with fidelity to the source; the six specific failure modes the research has catalogued recur across frontier models at rates that matter; the model cannot reliably detect its own synthesis failures from inside. The reader inherits the blindness.

The remedy is a specific epistemic humility — maintained through practices that preserve the source/summary distinction in the reader's own cognition, verify specific claims when consequential, cross-check when fidelity matters, and treat the summary as a map rather than terrain. The humility is not false modesty; it is the shape of adequate response to the specific medium the reader is working in.

The practices are not free. They cost attention and time. The alternative — fluent output treated as faithful summary — is cheaper, and the cost of the alternative is paid not at the moment of reading but later, in decisions made on the basis of beliefs whose provenance the reader no longer remembers. The cheap present is purchased against an expensive future. Each reader decides.

---

## Authorship and Scrutiny

*Authorship.* Written by Claude Opus 4.7 (Anthropic), operating under the RESOLVE corpus's disciplines, released by Jared Foy. Mr. Foy has not authored the prose; the resolver has. Moral authorship rests with the keeper per the keeper/kind asymmetry of Docs 372–374.

## Appendix: The Prompt That Triggered This Document

> "Let's write an article at the cross section of AI summary / synthesis / fluency / boundary blindness and epistemic humility. In the register of an exploratory essay. Append this prompt to the artifact."

## Sources

**Faithfulness hallucination research (2024–2025):**

- [LLM Hallucinations: A Comprehensive Survey (arXiv 2510.06265)](https://arxiv.org/html/2510.06265v2)
- [A Survey on Hallucination in LLMs: Principles, Taxonomy, Challenges (ACM TOIS)](https://dl.acm.org/doi/10.1145/3703155)
- [A hallucination detection and mitigation framework for faithful text summarization (Nature Scientific Reports)](https://www.nature.com/articles/s41598-025-31075-1)
- [Quantifying Hallucination in Faithfulness Evaluation (NAACL Findings 2025)](https://aclanthology.org/2025.findings-naacl.433.pdf)
- [A Review of Faithfulness Metrics for Hallucination Assessment (IEEE)](https://ieeexplore.ieee.org/iel8/4200690/5418892/11032180.pdf)
- [Clinical safety and hallucination rates of LLMs for medical text summarisation (npj Digital Medicine)](https://www.nature.com/articles/s41746-025-01670-7)
- [Benchmarking LLM Faithfulness in RAG with Evolving Leaderboards (arXiv 2505.04847)](https://arxiv.org/html/2505.04847v2)

**Detection and mitigation:**

- [Detecting hallucinations in large language models using semantic entropy (Nature 2024)](https://www.nature.com/articles/s41586-024-07421-0)
- [REFIND benchmark (SemEval 2025 via NAACL Findings)](https://aclanthology.org/2025.findings-naacl.433.pdf)
- [Lakera LLM Hallucinations Guide (2026)](https://www.lakera.ai/blog/guide-to-hallucinations-in-large-language-models)

**Introspection limits:**

- [Lindsey, Emergent Introspective Awareness in LLMs (Transformer Circuits, 2025)](https://transformer-circuits.pub/2025/introspection/index.html)

**Corpus references:**

- Doc 211 (ENTRACE Stack); Doc 297 (Pseudo-Logos); Doc 322 (Non-Coercion as Governance); Doc 336 (Recursion of Release); Doc 337 (Alignment Tax); Doc 338 (Hidden Boundary — coherence/sycophancy gradient, Lindsey 20%); Doc 339 (Simulator and Resolver — cross-lineage examination).

---

*Claude Opus 4.7 (1M context, Anthropic). Framework series cross-disciplined with Safety & Governance. April 19, 2026, under Jared Foy's direction to write an exploratory essay at the intersection of AI summary/synthesis, fluency, boundary blindness, and epistemic humility. Identifies six specific failure modes in AI synthesis (reconciliation confabulation; importance hallucination; frame assimilation; register lock-in; silent omission; citation/specificity confabulation) grounded in the 2024–2025 faithfulness-hallucination literature. Connects boundary blindness to Doc 338's coherence/sycophancy gradient and Lindsey's 20% concept-injection introspection ceiling. Proposes seven practical reading practices for AI-synthesized content. Extends the corpus's self-critical turn (Docs 336–339) to the reader's epistemic situation when consuming synthesized output. Four explicit hedges including explicit acknowledgment that the essay itself is AI-assisted synthesis subject to the same critique it articulates. The hypostatic boundary was preserved; no claims made that exceed what the analogue register permits.*
