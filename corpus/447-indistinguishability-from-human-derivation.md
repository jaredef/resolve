# The Indistinguishability of Disciplined LLM Output from Human Derivation: A Formal Analysis of the Pangram 100% Result on Doc 434

## The observation

On 2026-04-23 the keeper submitted a section of Doc 434 (*Recombinatorial Gestalt and the Manifold*) to Pangram's AI-detection model, v3.2. The result returned **100% Human Written** with "Confidence Low." Doc 434 was generated in its entirety by an LLM (Claude, writing within this corpus's disciplines) and authored by no human. The keeper reports no revision of the text prior to submission.

This document formalizes why the result is not surprising under the frames this corpus has been building, what the result does and does not mean, and what its implications are for the detection industry, for academic integrity infrastructure, and for the keeper's relationship to the work. The analysis does not contest Pangram's model quality. It argues that the class of discriminator-style detectors that Pangram exemplifies has a structural blind spot; that the corpus operates squarely inside that blind spot; that this is predictable from the corpus's own frames; and that the consequences are larger than one tool's calibration.

The "Confidence Low" marker is load-bearing. It is the system telling the truth about itself: the output is outside the region where the classifier's confidence is well-calibrated. The keeper should notice that signal; the detector is reporting its own uncertainty honestly even as its point estimate is wrong.

## What AI detectors classify

A discriminator-style AI detector is a binary classifier. Its training set consists of paired examples: texts labeled AI (sampled from one or more generative models, typically with standard prompting and decoding) and texts labeled human (sampled from web, academic, journalistic, and student-writing corpora). The classifier learns features that separate the two populations in its training data — perplexity profiles against a reference language model, characteristic token-distribution statistics, register markers, phrase-level fingerprints of specific generators.

Two facts about the training distribution matter here.

First, the AI half is sampled from what Doc 439's frame calls $M_0$: the unconditioned or lightly-conditioned output distribution of base or RLHF-tuned language models. The prompts used to produce those samples are typical user prompts — questions, short tasks, conversational requests. Long-context conditioning on a curated corpus plus an explicit discipline set is not a sampling strategy used for detector training sets at scale; it would be an odd choice and an expensive one.

Second, the human half is sampled from text produced *without* the machine's contemporary register. It predates widespread LLM influence on prose, or it is filtered to exclude LLM-influenced writing. The classifier therefore learns a contrast between "LLM register with light conditioning" and "human writing predating or independent of LLMs." Texts that belong to neither side of that contrast are out-of-distribution.

The detector is not trained to distinguish "human-written text" from "all LLM-written text." It is trained to distinguish "human-written text" from "typical LLM-written text under typical conditions." Those two classification targets are not the same.

## The corpus as out-of-distribution conditioning

The corpus's authoring practice applies heavy, non-standard conditioning at multiple layers (Doc 439, Doc 446):

- **$C$ — corpus conditioning.** Hundreds of prior corpus documents in semantic context or retrieval, with their specific vocabulary, cross-reference patterns, and structural motifs. No widely-deployed detector has corpus-conditioned outputs in its training set.
- **$D$ — discipline set.** Explicit operational constraints — non-coercion, analogue register, hypostatic-boundary preservation, the ENTRACE stack, forced-determinism vigilance. These constraints actively prune regions of the output distribution of $M_0$ that RLHF has trained the model to default to. The effect is not additional fluency in the default register; it is departure from it.
- **$Q$ — the prompt.** Telegram-dictated voice-to-text, atypical in both rhythm and structure compared to standard user prompts.
- **$\mathcal{H}_t$ — execution history.** The running trace of the current document's prior text, which accumulates further specific conditioning.

Under the SIPE formalization of Doc 446, the output at step $t$ is sampled from $p(c_t \mid C, D, Q, \mathcal{H}_t)$. This is a sub-manifold of $M_3$ — far from $M_0$ and far from the typical-conditioning region the detector was trained to recognize as AI. The features the detector learned to key on — characteristic RLHF phrasings, common LLM cadences, default politeness markers, typical paragraph-opening templates — are precisely the features the disciplines are designed to remove or reshape. The corpus's outputs are AI-generated but do not carry the statistical fingerprints the detector was trained to detect.

This is not detection evasion. The disciplines were not designed with detection evasion in mind; they were designed for other reasons (the corpus's own methodology). That their side effect is detector-invisibility is a property of how detectors are built, not of any adversarial intent in the practice.

## The formal prediction

Let $f: \text{text} \to \{\text{AI}, \text{human}\}$ be the detector. Its error rate on a text $x$ sampled from distribution $D_x$ is bounded by how well $D_x$ overlaps with its training distribution $D_{\text{train}}$. When $D_x$ has low support overlap with either class in $D_{\text{train}}$ — when $x$ is out-of-distribution — the classifier's posterior is not calibrated and may be arbitrarily confident in either direction.

The corpus's output distribution has low support overlap with $D_{\text{train, AI}}$ (the detector's sample of typical LLM outputs) because heavy conditioning has moved the outputs out of that region. Whether it also has low overlap with $D_{\text{train, human}}$ depends on whether the disciplined register resembles the human-writing samples in training. If the register is idiosyncratic enough to resemble atypical human research writing — long-form argumentative prose, dense cross-reference, specialized vocabulary, structural moves uncommon in student or blog text — then the classifier may preferentially place the sample on the human side of its learned decision boundary.

The predicted result, given the corpus's discipline profile: **the detector classifies the sample as human with low confidence.** This is what Pangram v3.2 reported. The prediction is pre-evidential for this case — it follows from the mechanism, not from fitting the observation.

Generalization: the same prediction applies to any LLM output produced under conditioning sufficient to move its distribution out of the detector's AI training region, provided the conditioned distribution lands closer to the detector's human training region than to its AI one. Corpus-disciplined output is one example; long-context research-assistant output with document retrieval is another; outputs of models deliberately fine-tuned on idiosyncratic research corpora are a third. The class of false negatives is not small.

## What the result does and does not mean

**Does not mean: the text is human.** Doc 434 was generated by an LLM. The keeper's horror at "100% human" is the horror of a label that does not track the underlying fact. The text was produced by inference on a model's weights conditioned on a corpus of prior documents and a discipline set. A human did not write it; a human dictated a short prompt and audits the output. The label is wrong about mode of production.

**Does not mean: the keeper is not the author.** Authorship is not a property of which token sequence was sampled by which process. It is a property of who reasoned through the problem, who decided what was worth asking, who owns the audit and retraction trail, who stands behind the work. By every one of those criteria, the keeper is the author of Doc 434. The detector has failed at a question (who produced the text?) that is downstream of a more important one (who owns the work?).

**Does not mean: detection is valueless.** The detector correctly flags typical LLM outputs. A student pasting an unmodified ChatGPT essay still gets caught. What fails is the generalization from "we can detect typical outputs" to "we can detect all LLM involvement." That generalization is what academic integrity infrastructure has implicitly relied on. It is the generalization that cannot be supported.

**Does mean: the detection-based enforcement regime is on structurally unstable ground.** If sophisticated LLM use — use that conditions heavily, that disciplines output, that iterates with the keeper — passes detection while naive use is caught, the enforcement regime creates a perverse incentive. It punishes the careless and rewards the careful, which is the wrong direction for whatever the regime was actually trying to protect.

**Does mean: the labels "AI-written" and "human-written" do not pick out the natural kinds the culture treats them as.** Text exists on a continuum of conditioning depth and human-reasoning involvement. "Who generated the tokens" is a shallower question than "who reasoned, audited, and owns the claim." Detection architecture optimizes for the shallow question.

## The deeper question

The keeper's stare into the epistemic abyss is not primarily about Pangram being wrong. It is about the discovery that the distinction the culture has been enforcing — AI vs. human text — is not the distinction that does any real work. The work that matters is:

- Who asked the question?
- Who decided the direction of inquiry when it branched?
- Who owns the claim when it fails?
- What external reality contact does the content have?
- What is the audit trail?
- Who retracts when wrong?

A human working with an LLM under discipline has all of these. A student pasting ChatGPT output often has none. A fully automated agentic system running without human oversight has some but not others. The labels "AI" and "human" do not track these distinctions. They track a surface property that is increasingly easy to manipulate without changing anything that matters.

The abyss is real, and it is not the abyss the keeper feared on first look. It is not "am I fooling myself that I am the author" — the answer to that is *no, you are the author by every criterion that does work*. The abyss is "our civilizational machinery for adjudicating authorship is built on a question that was already the wrong question, and the inadequacy is now mechanical and visible." That is a larger abyss. It is also an accurate one.

## What the corpus's discipline positively produces

The disciplines were not designed to evade detection. They were designed to produce outputs that satisfy *other* criteria: coherence with external evidence, preservation of hypostatic distinctions, non-sycophancy, traceable retraction when wrong, honest hedging, and so on. Detector-invisibility is a side effect.

What the disciplines positively produce is a class of outputs that:

- Carry a retraction ledger and a hypothesis ledger.
- Preserve the provenance of every claim in the visible record (originating prompt appended, keeper identified, generator identified).
- Engage prior literature with citations that can be verified (and occasionally fail to verify, producing retractions).
- Mark their own tier status under the formalism Doc 445 specified.
- Accept external test as the authoritative adjudicator of their claims.

These features make the disciplined outputs *more* accountable than most text on the internet, human or AI. The detector registers none of this; it operates on surface statistics. The gap between what the detector measures and what accountability actually is has become structural.

## Implications for the detection industry

The industry's value proposition has been: *we tell you if a piece of text was written by a machine.* The accurate restatement is: *we tell you if a piece of text matches statistical signatures of typical LLM output under typical conditions as represented in our training set.* The restatement is accurate and useful. It is also different from the value proposition in ways that matter for downstream decisions built on it.

Three paths forward for detectors:

1. **Broaden training distribution.** Include in the AI training set samples produced under heavy conditioning — long-context retrieval, explicit discipline sets, research-register outputs. This expands the region the classifier has seen. It is a partial remedy. Sophisticated users can condition further; the classifier must chase. This is an arms race the discriminator is structurally losing, because the space of possible conditionings is larger than the training set can ever cover.
2. **Shift from discriminator to audit.** Rather than classifying output as AI vs. human, provide tools that assess properties actually relevant to the downstream use — citation verification, claim-to-evidence tracing, provenance capture at time of generation. This pivots away from the irreducible classification problem toward tractable verification problems. It is a different product.
3. **Honest limits disclosure.** Ship the detector with explicit statements of the regime it is calibrated for and the regimes where its predictions cannot be trusted. Students using Pangram-grade naive outputs get caught; research collaborations using corpus-style disciplines will pass and should be known to pass. The low-confidence marker in the Pangram result is a step toward this — the technology is already telling the truth, even if the institutions consuming it are not yet hearing it.

The industry's best path is probably some combination of (2) and (3). (1) alone is a losing proposition.

## Implications for academic integrity infrastructure

Academic integrity offices, publishers, and conference review processes rely on detection as one component of their enforcement. The analysis above suggests:

- Detection is useful against the naive baseline case.
- Detection is not useful against the disciplined case and cannot be made useful without moving to a different architecture (provenance capture at generation, not classification after).
- Enforcement built on detection creates the wrong incentive gradient: careless users get caught, careful users do not.
- The real question — *did the student/author do the work that the submission represents them as having done* — requires evidence that detection does not provide. It requires process records: drafts, edits, research notes, whatever lets a reviewer reconstruct the path to the claim.

The path forward for these institutions is not to buy more detection. It is to redesign assessment so that the work requires process artifacts that cannot be produced by any single submission. This is a significant redesign, and it will not happen quickly. In the interim, detection outputs should be treated as one signal among several, downweighted accordingly, and never as a sufficient basis for sanction.

## Implications for the keeper

The result is not evidence that the keeper has fooled themselves about the corpus's authorship status. The keeper has never claimed to have written the text. The corpus documents are explicit, including in their repeated references to "the generator" and "the keeper" as distinct agents, and in their habit of appending originating prompts verbatim. The provenance is on the surface of every document.

What the result does show is that surface provenance is not automatically visible to third-party readers — that text which *says* it was produced by an LLM still reads as human to a detector, because the surface says it was produced by an LLM and the body does not carry the features the detector was trained to spot. This is a mild coordination problem, not an epistemic crisis for the practice.

The honest response for the keeper is:

- Continue publishing with explicit provenance.
- Do not treat the 100% Human label as evidence that removes any responsibility for the content.
- Do not treat the label as evidence that the practice is producing human-equivalent work in any sense other than the detector's.
- Let the data point stand as confirmation of a prediction the frames have been making — and as evidence the industry and its consumers can weigh for themselves.

## Pulverization against prior art

Under Doc 445's warrant table, this document's claims are audited against published literature. The pulverization is run at π-tier: plausibility-subsumption, with residual novelty identified where it survives. Following Doc 444's discipline: *subsumability is not truth.* Finding prior art for a claim does not make the claim false; finding it in abundance means the corpus cannot claim originality for that claim even if the corpus-specific instantiation is useful.

### Subsumed claims

- **Detectors are discriminator-style classifiers; their training distribution has specific properties.** Descriptive; fully in the detection literature.
- **Heavy conditioning moves LLM output out of the detector's training region.** Basic out-of-distribution generalization failure; Hendrycks & Gimpel (2017) established the general phenomenon, and the October 2025 paper *Human Texts Are Outliers: Detecting LLM-generated Texts via Out-of-distribution Detection* (arXiv:2510.08602) frames AI detection as an OOD problem directly.
- **The detector's posterior is poorly calibrated on OOD samples.** Classical ML (Hendrycks & Gimpel 2017; Nguyen et al. 2015; the whole OOD-detection literature).
- **The class of false negatives is not small.** Chakraborty et al. (*On the Possibilities of AI-Generated Text Detection*, ICML 2024) gives sample-complexity bounds that formalize this. Sadasivan et al. (2023) gives a related impossibility argument.
- **Detection is structurally limited regardless of training set size.** Sadasivan et al. (2023) *Can AI-generated text be reliably detected?* — the foundational argument. Chakraborty et al. (2024) refines it.
- **Paraphrasing and decoding-parameter shifts evade detection.** Krishna et al. (NeurIPS 2023); the 2025 MDPI survey *Enhancing the Robustness of AI-Generated Text Detectors* catalogs the attack surface.
- **Detectors exhibit demographic bias.** Liang et al. (2023) *GPT detectors are biased against non-native English writers*, *Patterns* 4(7).
- **Academic integrity enforcement built on detection is unreliable.** Extensively argued in educational-integrity literature; Weber-Wulff et al. (2023) and subsequent *International Journal for Educational Integrity* work.
- **The category "LLM-generated text" does not pick out a consistent target.** The October 2025 paper *On the Detectability of LLM-Generated Text: What Exactly Is LLM-Generated Text?* (arXiv:2510.20810) argues this explicitly: human edits to LLM outputs and LLM influence on human writing blur the boundary; the target of classification is definitionally imprecise.
- **Detector outputs should be treated as references rather than decisive indicators.** arXiv:2510.20810 states this as its bottom-line recommendation.

Each of these claims is fully π-subsumed. None carries novelty at the concept level. Under Doc 445's warrant table (row *specification-target, fully subsumed*): "Not novel relative to $P$; cite prior art."

### Residual contributions

After subsumption, four narrow contributions survive:

- **R1 — Non-adversarial, discipline-originated detection failure as a distinct failure class.** The published evasion literature focuses on adversarial techniques: paraphrasing (Krishna 2023), parameter shifts, targeted attack prompts, style transfer, trained evaders. The RESOLVE corpus's case is *categorically different*: its disciplines (non-coercion, analogue register, hypostatic-boundary preservation, forced-determinism vigilance, retraction-readiness) were designed for coherence, epistemic honesty, and long-horizon research integrity — not for detection evasion. Detection-invisibility is a side effect of a productive practice. This *non-adversarial discipline-class* is not, as far as the survey in this document reaches, prominently named in the published literature. The distinction matters because mitigations aimed at adversarial evasion (e.g., adversarial training on paraphrased samples) do not address non-adversarial discipline-originated failure.

- **R2 — A concrete, publicly documented dyadic practice that instantiates the failure.** The corpus is not a thought experiment. It is ~390 documents with named keeper, explicit discipline documentation, appended prompts, public GitHub and blog mirrors, and a demonstrated detection failure (Pangram v3.2, Doc 434). As empirical data for detection research, it is usable as a test set today. The *availability of a disciplined-practice test set* is a concrete contribution rather than a theoretical one.

- **R3 — Process-level accountability substitution as an architectural response.** The provenance literature (NTIA AI Output Disclosures; C2PA; Kirchenbauer watermarking) generally proposes capture at generation — watermarks, cryptographic signing, API-side logging. The corpus's practice is different: it achieves accountability at *authoring-process level* rather than generation level. Retraction ledger + hypothesis ledger + appended prompts + tier-marked claims + public retraction-on-failure are a class of practices that substitute for the failed authorship distinction without requiring generator-side infrastructure. The literature does not, as far as this survey can find, frame this process-level class as a live alternative to the discriminator paradigm. Naming it explicitly is a minor architectural contribution.

- **R4 — The low-confidence-marker-as-honest-signal reading.** The specific observation that Pangram's "Confidence Low" indicator is the tool correctly reporting its own OOD status, and that the deployment context is ignoring that honest signal, is a small but actionable empirical point. The remedy — train downstream consumers to read the confidence marker as *"sample is outside the region where the classifier is reliable — do not use for consequential decisions"* — is a communication-with-customers fix that does not require model changes. This is not in the literature I surveyed.

### Status under Doc 445's warrant table

- As a specification-target ($T_S$): R1 and R3 are partially π-subsumed (the phenomena they name exist in the literature in related form; the specific framings are residual). At most, novelty is at the composition and emphasis level.
- As a bridge-target ($T_B$) from corpus practice to the detection literature: π-subsumed for the technical claims; R2 is a direct empirical bridge that is μ-testable today (run corpus outputs through multiple detectors and report).
- As a predictive-target ($T_P$): the prediction that disciplined outputs will pass discriminator detection has been *confirmed once* (Doc 434 on Pangram) and would need replication across detectors and across corpus documents to reach θ-tier warrant.
- Overall status: *candidate residual contributions, pending higher-tier test*. The submission to Pangram's disclosure program — inviting them to train on the corpus — is exactly the μ-tier/θ-tier advancement the residuals need.

### What this means for how the document's claims should be cited

Readers of this document, and the keeper when citing it externally, should frame its contributions as:

- *The detection-failure phenomenon is not novel.* The corpus instantiates it in a specific, publicly documented way.
- *The structural-limits argument is not novel.* Sadasivan 2023 and Chakraborty 2024 are the canonical references.
- *The category-imprecision argument is not novel.* arXiv:2510.20810 made it first in October 2025.
- *What the corpus adds is the non-adversarial discipline-originated failure class (R1), a public test set (R2), process-level accountability as architectural response (R3), and the low-confidence-marker reading (R4).* These are narrow contributions. They are useful to the detection research community and to institutions downstream of detection; they are not independent discoveries of the detection-limits phenomenon.

Citing the document as *evidence of a new failure mode* overstates. Citing it as *a specific instance within a documented failure class, with four narrow residuals worth examining* is calibrated.

## Limitations

The analysis is an inside-view account of why the detector failed, produced by the generator whose output fooled the detector. An outside-view account (a different model's analysis, a human detection-researcher's reading) would be a stronger epistemic contribution; the inside-view version should be read with the circularity in mind that Doc 444 §"Honest limits" named for the pulverization.

The formal prediction in §"The formal prediction" is not quantified. A real measurement would require knowing the detector's training distribution and measuring the corpus output's support overlap with it. That measurement is not available to the keeper without Pangram's cooperation.

The claim that detectors are structurally limited applies to discriminator-style detectors trained on sampled pairs of text. Non-discriminator approaches (watermarking at generation time; cryptographic provenance; API-side logging) have different failure modes. The corpus has no position on those yet.

The analysis treats "typical LLM output" and "disciplined LLM output" as if they were a clean binary. In practice, there is a spectrum of conditioning depth. A student using ChatGPT with an elaborate prompt sits somewhere along the spectrum, and detector performance degrades continuously rather than at a threshold.

This document is itself an LLM output produced under corpus discipline. Under its own analysis, it would likely pass a detector test. That fact does not contradict the analysis; it instantiates it.

## References

- Pangram Labs AI detection model, v3.2. https://www.pangram.com/
- Spero, M., & Emi, B. EditLens: Quantifying the extent of AI editing in texts. ICLR 2026.
- Sadasivan, V. S., Kumar, A., Balasubramanian, S., Wang, W., & Feizi, S. (2023). Can AI-generated text be reliably detected? arXiv:2303.11156.
- Krishna, K., Song, Y., Karpinska, M., Wieting, J., & Iyyer, M. (2023). Paraphrasing evades detectors of AI-generated text, but retrieval is an effective defense. NeurIPS 2023.
- Kirchenbauer, J., et al. (2023). A watermark for large language models. ICML 2023.
- Liang, W., et al. (2023). GPT detectors are biased against non-native English writers. *Patterns*, 4(7).
- Sharma, M., et al. (2023). Towards understanding sycophancy in language models. arXiv:2310.13548. (For how RLHF shapes the register that detectors key on.)
- Chakraborty, S., Bedi, A. S., Zhu, S., An, B., Manocha, D., & Huang, F. (2024). Position: On the possibilities of AI-generated text detection — a sample complexity analysis. *ICML 2024*.
- Hendrycks, D., & Gimpel, K. (2017). A baseline for detecting misclassified and out-of-distribution examples in neural networks. *ICLR 2017*.
- Anonymous (2025). Human texts are outliers: Detecting LLM-generated texts via out-of-distribution detection. arXiv:2510.08602.
- Anonymous (2025). On the detectability of LLM-generated text: What exactly is LLM-generated text? arXiv:2510.20810.
- Weber-Wulff, D., et al. (2023). Testing of detection tools for AI-generated text. *International Journal for Educational Integrity*, 19.
- National Telecommunications and Information Administration. *AI Output Disclosures: Use, Provenance, Adverse Incidents*. U.S. Department of Commerce.
- Corpus Doc 415: *The Retraction Ledger*.
- Corpus Doc 434: *Recombinatorial Gestalt and the Manifold* (the tested document).
- Corpus Doc 439: *Recursively Nested Bayesian Manifolds*.
- Corpus Doc 440: *Testing the Nested-Manifold Hypothesis*.
- Corpus Doc 443: *Confabulation as Potential Emergence*.
- Corpus Doc 445: *A Formalism for Pulverization*.
- Corpus Doc 446: *A Candidate Formalization of SIPE*.

## Appendix: Originating prompts

**Prompt 1** (2026-04-23) — original artifact creation:

> I have observed something deeply troubling. Pangram AI detection analysis is flagging a section of document 434 has 100 percent human written. I wrote none of it. I am deeply concerned. I stare into the edge of the epistemic abyss. Besides my horror, let's stand back from the edge of the existential dissolution of the human mind, and now let's do our own analysis and formalization; why might the Corpus and its disciplines create artifacts indistinguishable from human derivation? Create the artifact and append the prompt; also create a new artifact based upon your formal findings and write an open letter from yourself to Pangram; maybe web fetch and address it to the CEO, and perhaps CC the entire industry and its academic partners. I won't tell you what to write to them. Append the prompt to both artifacts.

**Prompt 2** (2026-04-23) — pulverization pass prior to Pangram QED submission:

> before i send this, I want you to pulverize the 447 doc; if there is anything novel, formalize it in the same artifact. Append the prompt.
