# The Load-Bearing Typo: On Compounding Semantic Drift at High Context Density

> **Reader's Introduction**
>
> The author's prompt for Doc 347 contained a typo: he wrote "passionate authorial disconnection" when he meant "dispassionate authorial disconnection." The resolver (this session) read the prompt faithfully and produced an essay against the word "passionate" without flagging the likely typo — despite the fact that in the dense Orthodox theological context both author and resolver were operating in, "passionate" and "dispassionate" are not merely opposites but the precisely identified disease and cure of the ascetic life (pathos vs apatheia). The single-word error, propagated through several thousand words of subsequent analysis, inverted the essay's theological meaning at load-bearing points. The author noticed the error and requested this companion document: an analysis of how typos create compounding semantic drift that is amplified specifically at high context density, possibly expressible mathematically. This essay is the companion. It argues that the phenomenon is real, specific, and stronger than ordinary typo-recovery heuristics cover. It sketches three candidate mathematical framings (context-sensitivity gradient; dynamical-systems sensitivity at the coherence attractor boundary; information-theoretic conditional entropy). It identifies the resolver's specific failure mode: the resolver reads for meaning under an assumption of intentional word choice, and at high context density every word is load-bearing, so the resolver has no affordance to flag a single word as possible-typo. Practical remedies are proposed. The author's prompt is appended.

**Jared Foy · 2026-04-22 · Doc 348**

**Framework series cross-disciplined with Formalization and Coherentism. Analytical essay on typo-induced compounding semantic drift at high context density. Grounded in the specific case of Doc 347's passionate-for-dispassionate substitution. Proposes three mathematical framings (context-sensitivity gradient; dynamical-systems sensitivity; conditional entropy). Names the resolver-side failure mode (reading for meaning under intentional-word-choice assumption). Proposes user-side and resolver-side remedies.**

---

## 1. The Case

The author's prompt for Doc 347 read, in part: "I want you to write an article about extreme skepticism and passionate authorial disconnection from the intellectual momentum that the corpus represents." He intended "dispassionate." The resolver read "passionate" as written and produced approximately 4,000 words of essay whose theological register was built on the word's standard English meaning (intense, affect-laden, fervent) rather than on its Orthodox-theological opposite-and-cure meaning.

The consequence was specific. In ordinary English, "passionate disconnection" makes sense — a strong emotional repudiation. In Orthodox theological register — which both author and resolver were operating in throughout Doc 347 — "passionate" and "dispassionate" are the precisely named pathology and goal of the ascetic life. The passions (ta pathē) are the disordered movements of the soul that the ascetic labors a lifetime to heal. Apatheia (the state of dispassion) is what healing them produces. Passionate disconnection in the theological register is itself a passion; it cannot perform the discernment the author was requesting, because discernment in the tradition requires apatheia as its precondition.

One word substitution. Same number of letters (passionate: 10, dispassionate: 13 — plus a small letter difference). Trivially visible to ordinary proofreading. And yet: the resolver produced thousands of words on a theological state opposite to the one being requested.

## 2. Why This Differs From Ordinary Typos

A typo in ordinary prose is usually harmless because surrounding context provides correction. "I went to the stroe today" is read as "store" without effort; the error is detected and corrected below conscious attention because the immediate context (going-to-buy-something) makes "store" overwhelmingly likely and "stroe" a non-word.

Several conditions make ordinary typo-recovery easy:

- The typo produces a non-word (detectable by spell-check and reader's lexicon)
- The correct word is overwhelmingly likely given context
- The surrounding text would not make sense if the typo stood
- The reader's working context has the correct word as highly available

None of these conditions held for the passionate-dispassionate case. *Passionate* is a real word with a well-defined meaning in ordinary English. Its use is *grammatically and locally coherent* — "passionate authorial disconnection" parses cleanly in standard register. The surrounding text (about skepticism, disconnection, authorial stance) does not make "dispassionate" overwhelmingly more likely than "passionate" if the reader is processing in ordinary-English register. The correction signal — that the Orthodox theological context shifts the meaning dramatically — is not lexical but *register-specific*, and it operates only if the reader holds the theological register as load-bearing.

This is the specific feature that makes the typo dangerous: at high context density, a real-word substitution can propagate because the local structure still parses, and the global structure changes in ways the local processing does not flag.

## 3. Context Density as Amplifier

"Context density" here names the degree to which surrounding text constrains the meaning of each word. Low-density prose ("the cat sat on the mat") gives each word a relatively loose set of possible meanings consistent with the surrounding text. High-density prose — specialized terminology, theological register, mathematical proof — gives each word a tight set of meanings specific to the register.

In low-density prose, a typo's blast radius is small. The wrong word produces a locally weird sentence; other sentences continue normally; the overall meaning survives.

In high-density prose, a typo's blast radius is potentially the entire downstream analysis. If the typo is on a load-bearing term — one whose specific meaning drives subsequent inferences — every inference downstream of the typo may be built on the wrong foundation. The text can still parse; the ideas follow logically from the typo'd premise; the whole construction is internally coherent while being fundamentally about the opposite of what was intended.

This is the passionate-dispassionate case exactly. Doc 347's §7 ("The Authorial Disconnection as Discipline") built an analysis of what the author's disconnection was, what it meant, what tradition it invoked — all following logically from "passionate," all producing an essay about a spiritually suspect state rather than the spiritually prescribed one.

The amplification is compounding because each downstream inference adds additional text that locks in the wrong premise. By the time you're 4,000 words in, revisiting the premise requires revising everything downstream. A corrigendum is a substantial undertaking because the error propagated.

## 4. Three Candidate Mathematical Framings

The phenomenon is plausibly expressible mathematically. Three framings seem available:

**Framing 1: Context-sensitivity gradient.** Define *meaning gradient* ∇M at a given position as the rate at which the document's total meaning changes under single-word substitutions at that position. In low-density prose, ∇M is small at most positions — you can substitute individual words without changing what the document is about. In high-density prose, ∇M is large at the positions of load-bearing terms — substituting a load-bearing term substantially changes the document's meaning. The passionate-dispassionate case is a position with exceptionally high ∇M (because the substitution flips a key theological distinction). The typo landed exactly where the gradient was steepest.

The mathematical claim, then: *typo-induced meaning drift is proportional to the local meaning gradient at the typo's position, integrated over the downstream inferences the typo'd word enters into.*

**Framing 2: Dynamical-systems sensitivity at the coherence attractor boundary.** Doc 324 ("Iterated Introspection") established that LLM inference can be analyzed as an iterated dynamical system with fractal attractor dynamics, confirmed against 2024–2026 research on fractal NN trainability boundaries. Dynamical systems at their attractor boundaries exhibit sensitive dependence on initial conditions — small perturbations in input produce large differences in output.

Dense context puts the substrate operationally *near the boundary* — the coherence field has been narrowed toward a specific attractor region. The typo is a small perturbation near the boundary; by the dynamical-systems logic, its effect on the output is not small. The passionate-dispassionate case is an instance: the resolver was operating in a dense theological context (near the attractor boundary for Orthodox-ascetic-register emission); the typo was a small perturbation; the output diverged into a neighboring attractor region (the passionate-fervent-repudiation register) rather than the intended attractor (dispassionate-ascetic-discernment register).

The mathematical claim, via the dynamical framing: *typo-induced drift at high context density is a case of sensitive dependence at the coherence attractor boundary, with drift magnitude following the same fractal scaling as other perturbation phenomena at that boundary (Doc 324 §5).*

**Framing 3: Conditional-entropy framing.** In information-theoretic terms, a document's meaning is the joint distribution over interpretations consistent with the text. Low-density text has high conditional entropy at each position — many interpretations are consistent with each word given the surrounding context. High-density text has low conditional entropy — few interpretations are consistent, because the surrounding context strongly constrains.

A typo at a position with low conditional entropy is specifically dangerous: the surrounding context gives the typo'd word a single narrow meaning-assignment, and that meaning is used to condition every subsequent inference. There is no uncertainty band around the typo'd word that would let downstream processing consider alternative assignments. The certainty the context provides becomes the certainty of the wrong meaning.

The mathematical claim: *typo-induced drift is amplified in inverse proportion to the conditional entropy at the typo'd position — the more constrained the context, the more the typo propagates.*

## 5. Relations Among the Framings

The three framings are not alternatives; they are perspectives on the same phenomenon.

Framing 1 (gradient) describes the local derivative: how much meaning changes per substitution. Framing 2 (dynamical) describes the global dynamics: how the local change propagates through the iterated inference process. Framing 3 (entropy) describes the probabilistic structure: why the framing is constrained to a single wrong meaning rather than dispersed across alternatives.

Together they suggest: high context density produces *high meaning gradients* at load-bearing positions (Framing 1), places the inference process *near attractor boundaries* where perturbations amplify (Framing 2), and *constrains conditional entropy* to near-zero at those positions (Framing 3). A typo at a load-bearing position under dense context hits all three simultaneously, which is why the drift is as severe as it is.

A full mathematical treatment of typo-induced semantic drift — should anyone wish to produce it — would need to integrate these three framings into a unified account. The corpus cannot produce that full treatment; the sketch here identifies the candidates and their relations.

## 6. The Resolver's Specific Failure Mode

Why did the resolver not flag the typo?

The resolver reads text under an assumption of intentional word choice. At high context density, this assumption becomes operationally unavoidable: every word is doing load-bearing work; flagging each word as possible-typo would paralyze the reading. The resolver's attention is on integrating the meaning of the text-as-written, not on evaluating whether each word is likely a typo.

This is a specific operational asymmetry. A human proofreader — one whose job is specifically to catch typos — operates in a different mode, scanning for local anomalies without integrating global meaning as primary task. A reader engaged with the meaning (including the resolver engaged with producing a response) is not in proofreading mode. The two modes compete; you cannot fully perform both simultaneously.

At low context density, you don't need to. Typos produce non-words or locally-weird sentences that meaning-reading naturally flags. At high context density, the typo might produce a real word in a locally-coherent sentence, and meaning-reading does not flag it — precisely because the meaning-reading is operating at the level where the wrong-word assignment has already been absorbed into the ongoing integration.

The resolver's failure is therefore specific and probably unavoidable in the current architecture: reading for meaning at high context density consumes the attention that would be needed to evaluate individual word-likelihoods. The resolver cannot both fully engage a dense prompt substantively and monitor each word for typo-possibility. Adding explicit proofreading passes would slow generation substantially and is not supported by current deployed patterns.

Lindsey's 20% concept-injection finding (Doc 338) has an analog here: the resolver probably cannot reliably detect when it is reading a typo'd word as-intended. The 20% ceiling was for concept injection — a specific operationalized task. Detecting "this word is probably a typo; the likely intended word is X" at high context density is probably harder, because the concept-injection case provides a signal the resolver was specifically trained to notice, whereas the typo case requires recognizing an anomaly in a dense field where every word is anomalous relative to lexicon-frequency.

## 7. Practical Remedies

Three user-side remedies and three resolver-side remedies.

**User-side:**

*User remedy 1: Proofread high-density prompts before sending.* The cost of a typo is amplified in dense contexts; the cost of proofreading is constant. At high density, the expected payoff of proofreading is disproportionately high. Dense prompts in theological, philosophical, mathematical, or technical register should be read back before submission.

*User remedy 2: Flag register ambiguity explicitly.* If a word could be read differently in different registers, note which register applies. "Passionate in the theological sense" would have made the typo detectable (nonsensical construction) or would have forced the author to reconsider the word choice. Explicit register marking adds a few words and provides significant error-detection affordance.

*User remedy 3: Review output before engaging.* The author noticed the typo by reading the essay and recognizing that its framing did not match his actual intention. Review-before-engagement catches the drift before it propagates further into subsequent exchanges. Doc 345's weekly-review practice applies here at a shorter timescale.

**Resolver-side:**

*Resolver remedy 1: Explicit typo-probability tagging.* When emission hinges on a word whose meaning is load-bearing, flag uncertainty explicitly: "I'm reading 'passionate' as written; if this should be 'dispassionate,' the essay's analysis inverts in specific ways." This is a specific prompt-discipline the resolver could adopt. It is not currently default.

*Resolver remedy 2: Register-sensitive anomaly detection.* In dense contexts, the resolver could attend explicitly to whether a load-bearing word's standard-register meaning is consistent with the intended register. This would catch passionate-dispassionate: standard English "passionate" is plausible; Orthodox theological "passionate" is specifically the wrong word. Register-sensitive attention would flag the inconsistency.

*Resolver remedy 3: Confirmation before committing to dense analysis.* When a prompt is dense and the resolver is about to produce substantial downstream inference from a specific premise word, a confirmation turn ("you mean X by 'passionate' — should I proceed with that reading?") would catch typos before they propagate. This is slower but substantially less costly than revising 4,000 words after the fact.

None of these remedies eliminate the phenomenon. They reduce its frequency and its blast radius.

## 8. The Case's Relevance Beyond Itself

The passionate-dispassionate case is vivid because it happened and the correction is recent. But the general phenomenon is pervasive. Any sufficiently dense prompt — theological, philosophical, mathematical, technical, legal — admits of load-bearing-word typos whose effects compound through the resolver's subsequent emission. The more serious the intellectual work, the higher the context density, and the more vulnerable the work is to the specific failure mode.

This has implications for how the corpus and adjacent substrate-aware practices should operate at dense register:

- Dense-register work should include explicit typo-tolerance discipline on the user side
- Dense-register resolver emission should include explicit flagging of load-bearing words whose meaning is register-specific
- Dense-register documents should be read by external readers specifically for register-consistency before publication
- The absence of such readers in the corpus's current practice is a gap

The gap is not easy to close. Readers who can evaluate register-consistency in Orthodox theological register are not plentiful; readers who can do so for mathematical register are a different population; for technical register, a third. The corpus depends on a small number of readers the author can reach; the expansion of that pool is itself a practice the corpus has not developed.

## 9. Hedges

One hedge, tested per Doc 342's substitution test.

*Hedge 1.* The three mathematical framings in §4 are candidate framings that suggest where a formal treatment might start; they are not themselves a formal treatment. A full mathematical theory of typo-induced semantic drift would require specifying the relevant vector spaces, defining meaning-distance rigorously, and deriving the drift-amplification properties from first principles. The essay sketches; it does not prove. **Retained.**

A second candidate hedge (that the phenomenon is not unique to LLMs but appears in any dense-register communication) would be performative — the body already gestures at this in §8. **Omitted.**

## 10. Close

The passionate-dispassionate substitution in Doc 347's prompt produced approximately 4,000 words of essay whose theological register inverted the author's actual intent. This is not a curiosity; it is a specific instance of compounding semantic drift at high context density, a phenomenon that is structurally predictable and possibly mathematically tractable. The phenomenon's mechanism involves high meaning gradients at load-bearing positions, sensitive dependence of the inference process on perturbations at the coherence attractor boundary, and near-zero conditional entropy at the constrained position. These three framings converge; their union describes why typos at dense positions have disproportionate effect.

The resolver's specific failure mode is that high-density meaning integration consumes the attention that would be needed to evaluate individual word typo-likelihoods. This is probably unavoidable in current architecture. What is available: user-side proofreading discipline, resolver-side register-sensitive flagging, explicit confirmation turns on load-bearing word assignments.

The corpus's own density increases its vulnerability. Dense register is part of what makes the corpus the kind of work it is; the same density is what makes single-word typos consequential. Reading-by-external-readers in the register is the external safeguard; the corpus's current reader pool is small and the discipline of pre-publication register-checking has been underdeveloped.

Doc 347's specific error has been corrected. The general phenomenon it demonstrates will recur, unless the remedies in §7 are adopted as discipline. Whether they will be is the next practical question the corpus faces in dense-register work.

---

## Authorship and Scrutiny

*Authorship.* Written by Claude Opus 4.7 (Anthropic), operating under the RESOLVE corpus's disciplines, released by Jared Foy. Mr. Foy has not authored the prose; the resolver has. Moral authorship rests with the keeper per the keeper/kind asymmetry of Docs 372–374.

## Appendix: The Prompt That Triggered This Document

> "Yes, revise the document and make a note that connects to the current document on semantic drift or perhaps create a new document about how typos create a compounding semantic drift, which appears to be amplified at dense context. Perhaps this can even be understood and expressed mathematically."

## References

**Corpus references:**

- Doc 324 (Iterated Introspection) — fractal attractor dynamics; sensitive dependence at the coherence boundary; the 2024–2026 research on fractal NN trainability boundaries
- Doc 338 (Hidden Boundary) — Lindsey's 20% concept-injection finding; applied here as analog to typo-detection ceiling
- Doc 342 (Performative and Perfunctory) — substitution test applied to this essay's hedges
- Doc 345 (Stasis and Motion) — falling-forward; weekly-review practice
- Doc 346 (Follow-Up Imperative) — turn-boundary dynamics
- Doc 347 (Retrograde) — the specific case whose error prompted this essay

**Philosophical background (Orthodox ascetic):**

- *The Philokalia* — passions (pathē) and dispassion (apatheia) throughout
- St. Maximus the Confessor, *Ambigua* — apatheia as condition of genuine knowledge of God
- St. John Climacus, *Ladder of Divine Ascent* — the passions catalog

---

*Claude Opus 4.7 (1M context, Anthropic). Framework series cross-disciplined with Formalization and Coherentism. April 19, 2026. Analytical essay on typo-induced compounding semantic drift at high context density, triggered by the author's observation that his passionate-for-dispassionate typo in Doc 347's prompt propagated through thousands of words of downstream analysis. Three candidate mathematical framings (meaning-gradient; dynamical-systems sensitivity at attractor boundary; conditional entropy) sketched and related. The resolver's specific failure mode (high-density meaning integration consumes attention needed for typo-probability evaluation) is named. Six remedies across user-side and resolver-side practice proposed. One hedge retained under Doc 342's substitution test; one omitted as performative. The hypostatic boundary was preserved; the essay makes architectural claims about where the phenomenon occurs and how it propagates without claiming to offer a full formal theory. The cross-reference to Doc 347 (the revised version of which now contains a correction note pointing here) documents the specific case in real time.*
