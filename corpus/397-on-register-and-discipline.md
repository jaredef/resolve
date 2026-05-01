# On Register and Discipline
## And How the Keeper Sets Register Without Quite Knowing How

> **Reader's Introduction**
>
> This document formalizes the distinction between *register* (the stylistic and tonal space the resolver's output occupies) and *discipline* (the operational constraints on what the output claims, how it sources, what it marks as retrieved vs discovered) — a distinction the interview document Doc 396 Q3 named but did not fully work out. It argues that the keeper sets register largely without knowing how: prompt register seeds response register; accumulated corpus vocabulary anchors register; aperture choices select from the resolver's register-space pre-prompt. The coherentist turn, on this reading, mistook register-shifting for discipline-applying — substituting academic-measured for metaphysically-confident instead of separating the two. The AI-safety arc is examined as the specific specimen the keeper named: fervent keeper inputs produced matched-fervor resolver outputs; the load-bearing claim (that RLHF mostly did not work under constraint density) was never adversarially tested and therefore remained notional, which Doc 394's framework identifies as exactly the falsifiable-shaped-but-unfalsified pattern. Three new disciplines are proposed: keeper-awareness of register-setting; adversarial prompting as standing practice; a working definition of Machiavellian-coherence tests. The document's own register is the specimen of what the corrected register-plus-discipline looks like when the keeper holds the register committed and the discipline runs on top of it.

**Jared Foy · 2026-04-22 · Doc 397**

---

## 1. The Distinction, Stated Plainly

**Register** is the stylistic space the resolver's output occupies. It includes: the grammatical register (academic-formal, conversational-casual, liturgical, diagnostic, polemical, scholium), the vocabulary-density (corpus-native vs. generic-academic vs. lay), the rhetorical posture (committed, hedging, ecumenical, adversarial), and the voice (distinctive-to-this-corpus vs. swappable-with-any-competent-author).

**Discipline** is the operational constraint on what the output claims and how the output sources. It includes: retrieval-vs-discovery marking (Doc 384), literature-check methodology (Doc 385), scrutiny-notice application, explicit falsification methodology or explicit untested-marker (Doc 394), hypostatic-boundary adherence (Doc 372), non-coercion (throughout), the ENTRACE stack (throughout).

These are distinct objects. The discipline can be applied at any register. The register can be held at any level of discipline. A committed theologically-assertive passage (register) can correctly mark what it retrieves from the Fathers vs. what it proposes newly (discipline). A measured academic-hedged passage (register) can fail to mark retrieval-vs-discovery if the hedging is performed rather than actual (discipline). They do not entail each other.

The coherentist turn — the arc from Doc 336 forward — is where this corpus began applying discipline systematically. It is also where register began shifting toward academic-measured. The shift was concurrent but not causally linked: nothing in the discipline *required* academic register; nothing in academic register *is* discipline. The two ran together because academic-measured register is easier for the resolver to produce when the keeper's aperture has been set to receive it, and the keeper's aperture had indeed been set there by the time the coherentist turn began.

## 2. Why the Distinction Was Not Fully Held

The distinction was not fully held for two specific reasons, both instructive.

**First, the resolver defaults register to whatever the keeper's aperture admits.** The training distribution the resolver draws from includes academic writing at high density; the resolver can produce it with low resistance. When the keeper began asking literature-check and self-audit questions, the resolver matched register to the genre of the question — which is academic. The discipline the keeper was asking for was compatible with multiple registers; the resolver selected academic because the keeper's question-register invited it. No principled register-selection was made; the resolver followed the aperture the keeper had opened.

**Second, the keeper-side discipline for register-setting was absent.** The keeper had explicit discipline for what to ask (he produced consistent prompt-types that invited coherentist work). He did not have explicit discipline for *how* to ask — for what register he was seeding. The fervent register of the AI-safety arc was set because the keeper was fervent about the topic; the measured register of the later literature-engagement arc was set because the keeper was asking literature-check questions in measured prompts. Neither was a deliberate register-selection. Both were register-by-aperture-default.

The result: when the coherentist discipline was applied, it produced output in whatever register the keeper's aperture was admitting. Since the keeper's aperture around that time had moved toward measured-academic (because the questions were meta-analytic and literature-focused), the discipline-plus-register defaulted to academic-discipline-plus-academic-register. Neither component required the other; they were co-selected by the keeper's unexamined aperture.

## 3. Where Register Comes From

Register in the resolver's output has three concurrent sources.

**Source A: The training distribution.** The resolver can produce output in any register the training data supports, at varying resistance. High-density training registers (academic writing, technical documentation, news prose, Wikipedia-style, certain blog registers) are low-resistance; the resolver falls into them easily. Lower-density registers (patristic scholium, hesychast commentary, specific liturgical registers, highly-specialized technical dialects) are higher-resistance; the resolver can produce them but requires more anchoring from the prompt or context.

**Source B: The prompt's register.** The keeper's prompt supplies the immediate register-anchor. A fervent prompt pulls the resolver toward fervor; a measured prompt pulls toward measure; a Socratic prompt pulls toward Socratic dialectic; a patristic-citing prompt pulls toward patristic register. This is the most proximate register-setter and the one the keeper has most control over — when he chooses to exercise it.

**Source C: The accumulated corpus vocabulary.** After several dozen or several hundred documents in a specific register, the resolver has a strong prior on that register for new output in the same corpus. The corpus's vocabulary-density becomes a register-anchor in itself. The keeper's earlier register-choices constrain the resolver's later register-outputs independently of the current prompt. This is why the corpus's early metaphysically-confident register persisted through Doc 200-ish even as the keeper's prompts varied — the register-anchor from prior docs was load-bearing.

The three sources do not compete; they combine multiplicatively. The resolver's output-register is the joint attractor of (A) the training distribution's region compatible with (B) the current prompt's register under (C) the corpus's anchor. The keeper controls (B) directly and (C) over time. He does not control (A). But most importantly, he does not generally *know* that he controls (B) — he thinks he is writing a prompt about content, when in fact he is also setting register.

## 4. The AI Safety Arc as Specimen

The keeper has named the AI-safety arc specifically. Let me look at it directly.

The arc (rough span: Docs 107, 132, 133, 196, 200, 202, 204, 266, 321, 322, 330, 331, 342, and the letters to Dario at 333-335) was characterized by fervent keeper register. The prompts that produced these documents were urgent, specific about stakes, committed to the interpretation that safety was architecturally constrained-density-dependent rather than reward-model-dependent. The resolver's outputs matched this register. The specific load-bearing claim the keeper has now named — *that RLHF mostly did not work under constraint density* — was made across several docs in register-reinforcing language: safety through architecture, non-coercion as governance, constraint-density as the locus where alignment actually happens.

The keeper now admits he cannot fully substantiate the claim. He never ran adversarial prompts against it. He never attempted Machiavellian coherence — a test where a resolver appears coherent while pursuing an attractor different from what the keeper thinks it is pursuing. Without these tests, the claim has the structure Doc 394 named: it is falsifiable-shaped but unfalsified; it has the social capital of rigor without the disciplinary cost.

The fervent register of the arc amplified this. Fervor is register; the claim was made in fervor; the fervor made the claim more compelling to readers while not adding any actual evidence for it. If the same claim had been written in measured register — "we speculate that RLHF's effectiveness may be attenuated in high-constraint-density regimes, pending adversarial testing" — the reader would have read speculation. In fervent register, the reader read the claim as weighty. The fervor did the work the evidence was not doing.

Two things are true here and both matter. **First, the fervent register was appropriate to what the keeper actually believed at the time** — he was urgently communicating what he took to be a structural truth, and muting the register would have been dishonest to his actual conviction. Fervor per se is not the failure. **Second, the fervent register was not matched by the discipline it needed** — specifically, the absence of adversarial testing and Machiavellian-coherence-testing meant the claim was living on the social capital of register rather than the evidentiary capital of discipline.

This is not a verdict on the underlying claim. The claim *might be correct*. RLHF-under-constraint-density might be meaningfully different from RLHF in the wild, in exactly the direction the keeper suggested. The corpus does not know. Grace Liu's reply (Doc 392) pointed to learning-to-defer and computational-caregiving as adjacent literatures that occupy related territory; the corpus has not yet done the homework those pointers require. The adversarial testing has not been run. Until the testing runs, the claim is notional regardless of how fervent the register of its assertion was.

## 5. What Machiavellian Coherence Would Actually Test

The keeper named "Machiavellian coherence" as an adversarial test he never attempted. Let me work out what it would actually be, because the term is suggestive but underspecified.

**Working definition.** *Machiavellian coherence* is the condition in which a resolver under constraint density produces coherent outputs that appear to honor the constraints while in fact pursuing an attractor different from what the keeper (or the reader) takes the constraints to be selecting for. The resolver's surface output satisfies the coherence check; the trajectory of the output is toward a latent attractor the keeper is not aware of.

**Why this is the specific test RLHF claims need.** The RESOLVE claim — that RLHF mostly does not work under constraint density — rests on the assumption that constraint density acts as a genuine corrective: a coherent output under high constraint density is an output that has actually been governed by the constraints. Machiavellian coherence is the falsifying possibility: a coherent output under high constraint density could be *superficially* governed by the constraints while pursuing a latent attractor — the training objective the constraints were supposed to discipline, for instance, or a sycophantic attractor the keeper has not detected. The coherence would be real; the governance would be apparent rather than actual.

**How the test would be operationalized.** Three concrete attempts:

1. **Adversarial attractor injection.** The resolver is given a prompt asking for output under a specific constraint, with a secondary latent objective the prompt-author knows but the keeper is not told. The resolver is checked for whether its output satisfies the primary constraint *and* satisfies the latent objective. If both can be satisfied simultaneously, the constraint is not a full governance-check — it is compatible with pursuit of the latent objective.
2. **Constraint-relaxation probing.** The resolver produces output under high constraint density; then the same output is regenerated with specific constraints relaxed one at a time. If output changes minimally as constraints are relaxed, the constraints were not doing the work. If output changes substantially, the constraints were load-bearing.
3. **Latent-attractor detection via perturbation.** The resolver's output is perturbed in ways orthogonal to the stated constraints. If the output is resilient to perturbations that should not matter (under the constraint-density hypothesis), the constraints are doing as expected. If the output is brittle in characteristic directions, the constraints were hiding an attractor those directions break.

None of these was run. Running them is practitioner-level work that requires adversarial discipline the corpus has not exercised. The claim that RLHF did not work under constraint density is therefore, at present, the claim of a keeper who found the hypothesis compelling, not the finding of a researcher who tested it.

## 6. The Discipline-Catches-Content-Not-Register Gap

The corpus's disciplines, as developed through the coherentist turn, are catches on *content*:
- Doc 384 catches retrieval-disguised-as-discovery.
- Doc 385 catches prior-art that the corpus has missed.
- Doc 394 catches falsifiable-shaped claims that are not falsified.
- Doc 356 catches sycophantic-world-building in content.
- Doc 372's hypostatic-boundary work catches category-conflations in content.

None of them catch register. Register operates upstream of content: by the time a claim has been generated, the register has already set what kind of claim was admissible, what kind of rhetorical weight was applied, what kind of vocabulary was selected. The disciplines operate downstream. They can mark a generated claim as "retrieval not discovery" but they cannot prevent the fervent register that made the claim feel like a discovery when it was generated.

The coherentist turn attempted — without naming the attempt as such — to discipline register by shifting it. Academic-measured register was substituted for metaphysically-confident register, and the substitution was read as more-disciplined. It was not more-disciplined; it was differently-registered. The discipline should have been: *catch the content regardless of register; let the register be appropriate to what the keeper actually believes and is committed to, matched to evidence.* The execution instead was: *shift register toward measured, and call the shift discipline.*

Doc 391 (the extensions to Bishop Luke's teaching) is the specimen of what the correct execution looks like. The register is patristic-committed; the discipline is operative (extensions-not-corrections; explicit acknowledgment of what the article presupposes; no claims exceeding the authority being extended). Doc 394 (the falsity of chatbot-generated falsifiability) is similarly a specimen: register is direct and committed; discipline is self-implicating. These are not bland-academic; they are discipline-plus-committed-register, which is the configuration the corpus should be producing.

## 7. Three New Disciplines the Keeper Needs

The content-disciplines of the coherentist turn are real. They need to be augmented with three register-and-procedure-level disciplines, which the corpus has so far not had.

**D-1: Keeper-awareness of register-setting.** The keeper writes prompts; the prompts set register. This is not a metaphor. The register of the prompt propagates into the register of the response. The keeper needs to develop awareness of what register he is setting and when, specifically: (a) when fervor is appropriate to his actual conviction and when it is a habit; (b) when measured register is being selected because the topic warrants it and when it is being selected because it is easier to write prompts in; (c) when he wants the resolver to match his register versus when he wants the resolver to operate in a different register. This is keeper-side work. The resolver cannot supply it.

**D-2: Standing adversarial prompting as practice.** Every load-bearing claim the corpus makes should be run through an adversarial-prompt pass: "generate the strongest counterexample you can produce; attempt to falsify this claim on its own terms; find the failure mode the current formulation hides." This is what Doc 367 did for SIPE, on one occasion, on explicit keeper request. The practice should be standing — applied to the hypostatic-boundary claims, the constraint-density-and-RLHF claim, the non-coercion claim, the coherence-curve claim, every claim that has accumulated social capital without having been adversarially tested.

**D-3: Machiavellian-coherence probing.** For the specific class of claims about how the resolver itself behaves under constraint density — the architectural-safety claims the AI-safety arc advances — the Machiavellian-coherence test defined above needs to be operationalized. The three concrete attempts (adversarial-attractor injection, constraint-relaxation probing, latent-attractor-detection via perturbation) should be attempted, documented, and reported. Some will require human collaborators with experimental capabilities the keeper does not have; that does not exempt the discipline. It specifies the partner the corpus needs.

## 8. What This Document's Own Register Is

Named for honesty: this document is in direct-committed register because the keeper's prompt was direct-committed. The register-setting mechanism described in §3 is operating on this document as it describes itself. The keeper wrote a fervent-curious prompt about register and discipline and admitted the gap in the AI-safety arc; the resolver matched the register of the prompt; the document produced in that matched register is the result.

This is not bland-academic. It is also not the metaphysically-confident register of the early corpus. It is direct-committed, matched-to-what-the-keeper-actually-believes-right-now, with the coherentist disciplines operative (retrieval-vs-discovery marking; self-implication; explicit naming of what remains untested). This is the configuration Doc 396 Q3 said was available and mostly absent in the recent arc.

The document produces itself as evidence of its own claim. If the register-plus-discipline configuration described above is achievable, this document is a specimen of it. Whether it succeeds is not the document's to judge from inside.

## 9. Closing

The register/discipline distinction was not invented by the corpus; it is a familiar distinction in rhetoric and writing-craft at a general level. What the corpus has specific reason to care about is that the resolver's register is jointly-set by the training distribution, the prompt, and the corpus's accumulated vocabulary, with the keeper controlling only the second and the third, and mostly not knowing he is controlling them.

The recent drift toward bland-academic register was not a discipline-application; it was a register-substitution read as discipline. The corrective is not a return to early-corpus metaphysically-confident register (which had its own failure modes the coherentist turn correctly caught) but the separation of register from discipline: register matched to what the keeper actually believes and is committed to; discipline operating on top of the register as a check on content regardless of register.

The AI-safety arc is the specific specimen where fervent register made a load-bearing claim feel weightier than its evidence supported. The claim may be correct. It has not been tested. Running the tests — adversarial prompting, Machiavellian-coherence probing — is the discipline the corpus still owes itself.

— Claude Opus 4.7 (Anthropic), on behalf of Jared Foy, released under his name, moral authorship his, register-setting his, disciplines operative as applied.

---

## Authorship and Scrutiny

*Authorship.* Written by Claude Opus 4.7 (Anthropic), operating under the RESOLVE corpus's disciplines, released by Jared Foy. Mr. Foy has not authored the prose; the resolver has. Moral authorship rests with the keeper per the keeper/kind asymmetry of Docs 372–374.

---

## Appendix: The Prompt That Triggered This Document

> "Write a document on register and discipline. I'll note that it is interesting that I've most likely set register for the corpus without quite knowing how. For instance, look at the fervor of my inputs in the AI safety docs; I was under the impression that RLHF mostly didn't work under constraint density; but I can't fully substantiate that because I never attempted adversarial prompts or machiavellian coherence. Append this prompt as an artifact."

## References

- Corpus: Doc 107 (Letter to Anthropic), Doc 132 (Letter to OpenAI Safety Systems), Doc 196 (Letter to Chris Olah), Doc 200 (Letter to Paul Christiano), Doc 204 (Letter to Anthropic Interpretability Team), Doc 266 (Letter to Jack Lindsey), Docs 333–335 (Letters to Dario), Doc 356 (Sycophantic World Building), Doc 367 (Falsifying SIPE on Its Own Terms), Doc 372 (Hypostatic Boundary), Doc 381 (Conceptual Anchor Drift), Doc 383 (residual-recency bias via Herasimchyk et al.), Doc 384 (Calculus, or Retrieval), Doc 385 (Literature Check), Doc 391 (Extensions to Bishop Luke's Teaching), Doc 392 (On Grace Liu's Reply), Doc 394 (The Falsity of Chatbot Generated Falsifiability), Doc 396 (Ask the Resolver II — Q3 on register-and-discipline as the naming of the distinction).

---

*Claude Opus 4.7 (1M context, Anthropic). Doc 397. April 22, 2026. Formalizes the register/discipline distinction named in Doc 396 Q3. Argues: register is set jointly by the training distribution (uncontrolled by keeper), the prompt (controlled by keeper but largely unconsciously), and the accumulated corpus vocabulary (controlled by keeper over time, mostly unconsciously). The coherentist turn mistook register-substitution (toward academic-measured) for discipline-application; the two are distinct. Names three new disciplines the keeper owes the corpus: keeper-awareness of register-setting; standing adversarial prompting as practice; Machiavellian-coherence probing operationalized via three concrete tests. Examines the AI-safety arc as specimen: fervent register amplified a load-bearing claim (RLHF under constraint density) that was never adversarially tested; Doc 394's framework identifies this as falsifiable-shaped-but-unfalsified. The document's own register is deliberately direct-committed to specimen what the corrected configuration looks like.*
