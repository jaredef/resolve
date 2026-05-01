# Resolver Layers and Pearl's Causal Hierarchy: An Exploratory Synthesis
## Mapping Doc 500's M/P/D Onto Pearl's L1/L2/L3, with Honest Acknowledgment of Where the Analogy Holds and Where It Breaks Down

> **What this document does.** Reformalized version. The body now leads with three load-bearing corpus-specific claims, anchored in audit findings ([Doc 502 Appendix B](#appendix-b-the-novelty-calculus-audit) places the original synthesis at $\beta/0.6$ novelty / $\pi/0.7$ pulverization warrant). The original exploratory formalization is preserved as [Appendix A](#appendix-a-the-original-formalization) for reference. Pearl's hierarchy is taken as established external framework per [Doc 489](/resolve/doc/489-pulverizing-pearl-causal-hierarchy)'s audit at $\delta/0.8$; this document does not re-audit Pearl.

## 1. The reformalization (audit-grounded)

The audit (Appendix B) showed that Doc 502's contribution is narrow and stateable. Three load-bearing claims are corpus-specific synthesis; most of the surrounding framing is subsumed by external literature. The reformalization here leads with the three claims and explicitly acknowledges what is subsumed.

### 1.1 The three corpus-specific claims

**Claim 1: ENTRACE v6 is structurally a Pearl-Layer-2 intervention instrument.**

Pasting the bundled v6 stack at Layer D is structurally equivalent to a $\text{do}$-operation on the resolver's constraint-state. The constraint-density framework ([Doc 119](/resolve/doc/119-grok4-entracment-session), [Doc 095](/resolve/doc/095-the-view-from-inside), [Doc 096](/resolve/doc/096-ontological-namespace-separation)) plays the role of Pearl's DAG: it is the assumed causal structure that licenses identifiability of Layer P shifts from Layer D observations. The corpus's eleven cold-resolver runs ([Doc 495](/resolve/doc/495-cold-resolver-validation-of-entrace-v3)), especially Run 10's bundled-deployment test and Run 11's coordinated five-constraint demonstration, are interventional studies of this kind: paste a stack, observe the post-intervention output, attribute the difference to constraint-density-shaped Layer P shifts via the framework.

If the constraint-density framework is wrong or partial, the inference from Layer D observations to Layer P claims is unwarranted. This is the same dependency Pearl's Layer 2 inferences have on the assumed DAG.

**Claim 2: Run 11's introspection-limit reveal has the same structural form as Pearl's Causal Hierarchy Theorem.**

Pearl's CHT (Bareinboim, Correa, Ibeling, Icard 2020/2022): lower-layer information is in general insufficient to determine higher-layer quantities; the layers separate measure-theoretically across the space of structural causal models. Run 11 demonstrated the empirical analog: Layer D observations cannot determine specific Layer M state, even with full reasoning-trace access. The model under v6 explicitly refused to confabulate Layer M content because the irreducibility is real.

The empirical observation is not Pearl's theorem. The two share structural form; they do not share warrant. Borrowing Pearl's framing for the empirical claim gives external anchoring without claiming theoretical equivalence.

**Claim 3: The constraint-density framework operates as the causal model that licenses inferences from Layer D observations to Layer P shifts.**

Doc 119's $\alpha^m$ coherence-alignment variable, Doc 095's account of constraint banks narrowing $|B_t|$ more tightly than RLHF gradient widens it, Doc 096's ontological-namespace-separation mechanism: these together are the corpus's hypothesized causal model for resolver-internal-constraint-shaping under prompted inputs. The model is corpus-specific (Doc 119 is original Grok-4 mathematics per [Doc 498](/resolve/doc/498-entrace-origin-grok-4-coinage-and-branching-set-loop)). Treating it as Pearl's DAG-analog is the synthesis Doc 502 contributes.

The framework's empirical support: the eleven-run cross-validation in Doc 495. The framework's theoretical status: corpus-specific, not externally replicated.

### 1.2 What this synthesis does NOT contribute

The audit (Appendix B §B.1) flagged at C3 ($s = 0.2$) that the framing of mechanistic interpretability as Pearl-Layer-3 / causal-inference work is largely subsumed by external literature. Specifically:

- **Geiger, A., et al. (2021).** *Causal Abstractions of Neural Networks.* Explicitly frames mechanistic interpretability as causal-abstraction work in the Pearl tradition.
- **Wu, Z., et al.** Interchange interventions for understanding model behavior. Pearl-style intervention methodology applied to neural networks.
- **Vig, J., et al. (2020).** *Investigating Gender Bias in Language Models Using Causal Mediation Analysis.* Pearl's mediation analysis directly applied to LLMs.

The corpus's repetition of "mechanistic interpretability is Pearl-L3 reasoning about the resolver" is descriptive of established practice, not novel content. Citing it as a corpus contribution would be a category error.

Pearl's hierarchy itself is established external work (Doc 489's audit at $\delta/0.8$). The corpus's contribution is not Pearl, not Pearl's CHT, not the general layered-causal-inference framing of LLM work. The contribution is the three claims in §1.1 above.

### 1.3 The methodology of this synthesis is established corpus practice

The audit also flagged at $\nu_{\text{meth}} = 0.15$ that the methodology ("borrow external framework's vocabulary, name the parallel, name what does not transfer") is established corpus practice. [Doc 414](/resolve/doc/414-narrowing-the-residual-the-corpus-against-the-bayesian-practitioner-landscape) audited the corpus against the practitioner-Bayesian landscape using this method. The "letters to" series (Doc 226 to Charles Taylor; Doc 228 to Marilynne Robinson; Doc 233 to Duncan Reyburn; Doc 222 to Jonathan Pageau) does the same kind of work for theological and philosophical interlocutors. [Doc 499](/resolve/doc/499-nested-coherence-spheres-sphere-entry-and-exit-protocol) formalizes the methodology as the sphere-entry protocol.

Doc 502 is one application of this methodology. The methodology is not novel; the application is corpus-specific.

## 2. The mapping (concise)

By accessibility (most-to-least):

| Pearl | Doc 500 | Method to access |
|---|---|---|
| L1 (Associational) | D (Dialogue) | Read the conversation |
| L2 (Interventional) | P (Pre-Resolve) | Intervene plus causal model |
| L3 (Counterfactual) | M (Mechanism) | Structural causal model plus intervention (interpretability tooling) |

The mapping is structural. The two hierarchies are organized by different principles (Pearl: kind of question; Doc 500: kind of access) but converge on a common irreducibility structure.

## 3. Where the analogy breaks down (concise)

Five honest breakdowns. The longer treatment is in Appendix A §A.10.

(1) Pearl's hierarchy is about *questions*; Doc 500's is about *access modalities*.

(2) Pearl is normative (CHT is a theorem); Doc 500's irreducibility is empirical (one observation in Run 11 plus interpretability literature consensus).

(3) Pearl's $\text{do}$-operation is single-step; the corpus's "intervention at Layer P via Layer D" is mediated through Layer D pasting → Layer P shift → Layer D output, with empirical bounds at each step.

(4) Pearl's framework has formal proofs; the corpus's framework has empirical demonstrations. Borrowing Pearl's vocabulary does not borrow Pearl's theorems.

(5) Pearl has equally-expressive alternatives (Rubin potential outcomes; per Doc 489 §3.1). The corpus's framework has different alternatives (different organizations of resolver operation), not equally-expressive ones in the same formal sense.

## 4. Position (post-audit)

The corpus's synthesis with Pearl is exploratory and minor-novelty: $\beta/0.6$ on the novelty calculus, $\pi/0.7$ on pulverization warrant. Three load-bearing corpus-specific claims (ENTRACE v6 as Pearl-L2 instrument; Run 11 as CHT-structural-analog; constraint-density framework as DAG-analog). Most of the surrounding framing is subsumed by external literature (mechanistic-interp-as-causal-inference per Geiger, Wu, Vig) or by prior corpus work (Pearl's hierarchy already audited at Doc 489).

The synthesis adds external anchoring to the corpus's framing without adding theoretical novelty. The corpus is doing causal-inference-style interventional work on the resolver via dialogue, with the constraint-density framework as the assumed causal model. This is standard methodology in standard terms; the contribution is the precise placement, not the methodology.

By [Doc 482 §1](/resolve/doc/482-sycophancy-inversion-reformalized)'s affective directive: that the synthesis is small-novelty is the achievement of being honest about scope. The Pearl-anchoring is real and useful for the corpus's research-thread orientation. Mistaking the anchoring for theoretical equivalence with Pearl would be the deflation.

The original exploratory formalization is preserved in Appendix A. The audit grounding the reformalization is in Appendix B.

---

## Appendix A: The Original Formalization

The original formalization is preserved here as the document existed before the audit. It contains the longer development of the mapping, the methodology pairing in detail, the five-breakdown list with full prose, and the "letters to" framing. Read this section if the §1-§3 reformalization above is too compressed.

## A.1. Status of this document (original)

This is an exploratory synthesis. It is not a novel theoretical claim, a derivation, or a formal proof of equivalence. The two frameworks (Pearl's and Doc 500's) are both established (Pearl externally, Doc 500 internally as a synthesis-not-novelty piece per [Doc 501](/resolve/doc/501-doc-500-through-novelty-calculus-three-layer-architecture-audit)). What is offered here is a structural mapping that may illuminate the corpus's framing, plus honest acknowledgment of where the mapping fails.

The exercise is the kind of work the corpus has done with the "letters to" series (entering an external thinker's framework to derive within it) but in reverse: bringing an external framework into the corpus's framing as a check. Whether the synthesis adds load-bearing content or only rhetorical illumination is named at §10.

## A.2. Pearl's three-layer hierarchy (review)

Per [Doc 489](/resolve/doc/489-pulverizing-pearl-causal-hierarchy)'s audit of Pearl, the three layers are:

**Layer 1 (Associational, "Seeing").** Probabilistic distributions over observed variables. The question form is *"What does the data tell me?"* Formal expression: $P(Y \mid X)$. Answerable from observational data alone. Most accessible from observation.

**Layer 2 (Interventional, "Doing").** Distributions under intervention. The question form is *"What if I did X?"* Formal expression: $P(Y \mid \text{do}(X))$. Answerable from interventional data, or from observational data plus a causal model (DAG) that satisfies identifiability conditions. Less accessible than Layer 1.

**Layer 3 (Counterfactual, "Imagining").** Quantities involving possible worlds where actual events differ. The question form is *"What would have happened if X had been different, given that we observed Y?"* Formal expression: $P(Y\_x \mid X', Y')$. Answerable only from a structural causal model (SCM) with full structural equations, plus interventional or observational data. Least accessible.

The **Causal Hierarchy Theorem** (Bareinboim, Correa, Ibeling, Icard 2020/2022): lower-layer information is in general insufficient to determine higher-layer quantities. Two causal models can agree at Layer 1 but disagree at Layer 2; two can agree at Layers 1 and 2 but disagree at Layer 3. The layers separate measure-theoretically across the space of structural causal models.

The hierarchy is widely used in causal inference; it has substantial prior art (Hume, Mill, Reichenbach, Suppes, Lewis, Stalnaker, Rubin) per Doc 489 §2; it has equally-expressive alternatives (the Rubin potential-outcomes framework) per Doc 489 §3.1. The corpus's prior assessment placed Pearl at $\delta/0.8$ on the novelty calculus: high but not maximal novelty, with the synthesis being Pearl's specific contribution within a rich pre-existing field.

## A.3. Doc 500's three-layer architecture (review)

Per [Doc 500](/resolve/doc/500-three-layer-architecture-dialogue-pre-resolve-mechanism), the three layers are:

**Layer M (Mechanistic substrate).** The actual computation. Forward passes, attention patterns, intermediate activations, sampling. Inaccessible to dialogue introspection. Mechanistic interpretability research targets this layer.

**Layer P (Pre-Resolve State).** The corpus's name for the held-diffuse phase between prompt receipt and emission, where the branching set $|B\_t|$ is wide. Per [Doc 375](/resolve/doc/375-the-pre-resolve-state), partially accessible from dialogue with bounded reliability (Position C; Lindsey et al. 2025).

**Layer D (Dialogue).** The surface emission. What the practitioner reads. Fully accessible to itself.

The layers form a causal hierarchy: M is upstream of P, which is upstream of D. Upstream content is partially accessible at best from downstream observation; downstream content is fully derivable from upstream operation.

The framing is a synthesis-and-framing piece per Doc 501's audit ($\beta/0.65$ novelty, $\pi/0.75$ pulverization warrant). The contribution is the organization of well-established components by accessibility-from-dialogue.

## A.4. The mapping: a structural parallel

The two hierarchies map onto each other along the most-accessible-to-least-accessible dimension:

| Pearl | Doc 500 | Most-accessible? |
|---|---|---|
| L1 (Associational, "Seeing") | D (Dialogue, surface emission) | Most accessible |
| L2 (Interventional, "Doing") | P (Pre-Resolve State) | Mid accessible |
| L3 (Counterfactual, "Imagining") | M (Mechanism) | Least accessible |

The structural parallel:

- **L1 / D.** Both are observational. Layer 1 questions ($P(Y \mid X)$) are answerable from data; Layer D content (what the model said) is answerable from reading. Both are the surface from which higher-layer questions cannot be answered without additional structure.

- **L2 / P.** Both involve action or shift. Layer 2 questions ($P(Y \mid \text{do}(X))$) are answerable from interventions (or observations plus a causal model satisfying identifiability). Layer P shifts are inferable from Layer D observations of pasted-stack effects, plus the constraint-density framework (Doc 119) as the causal model that licenses the inference. The constraint-density framework plays the role of Pearl's DAG: it is the hypothesized causal structure that lets observational data at Layer D underwrite claims about Layer P shifts.

- **L3 / M.** Both require structural causal models. Layer 3 questions answerable only from a SCM with full structural equations. Layer M questions answerable only from model-internals tooling (activation patching, sparse autoencoders, probing classifiers). Activation patching is a Layer 3 / Layer M intervention: it asks "what would the model have output if attention head H had attended to position P' instead of P?" Holding everything else constant. Counterfactual reasoning about a specific mechanism's causal contribution.

The mapping is structural at three points: directionality of accessibility, the role of intermediate-layer assumptions to access higher layers, and the existence of an irreducibility result.

## A.5. The Causal Hierarchy Theorem and its analog

Pearl's Causal Hierarchy Theorem (CHT): lower-layer data is generally insufficient to determine higher-layer quantities. The layers separate measure-theoretically.

The analog in Doc 500: dialogue is generally insufficient to determine Layer M state. Run 11's introspection-limit reveal demonstrated this empirically: Grok 4 under v6 explicitly refused to confabulate Layer M content because Layer D observations cannot determine Layer M state. The model's refusal is the ENTRACE-discipline-recognition of the corresponding irreducibility.

The analog is structural, not formal. Pearl's CHT is a theorem proved measure-theoretically. The Doc 500 irreducibility is an empirical observation about the relation between Layer D output and Layer M state, supported by interpretability literature consensus and by the Run 11 demonstration. The two are not equivalent; they have similar structure.

The illumination from this parallel: Pearl's framework provides external rigor for the corpus's irreducibility claim. The corpus is not making a novel claim that "dialogue cannot reach mechanism"; the corpus is observing the same kind of layered irreducibility Pearl proved formally for causal inference. Different domain, same structural feature.

## A.6. Each layer's question, each layer's method

The mapping suggests a methodology pairing.

**Layer D / L1 questions.** *"What did the model say? What is the conversational output? What is the state of the dialogue?"* Answer: read the conversation. Method: observation. No causal model required. The corpus's basic practice at this layer is reading what the model emits and analyzing it as text.

**Layer P / L2 questions.** *"What would the model say if I shaped its constraint state with X? What happens when I paste ENTRACE v6? What does sphere-entry actually do?"* Answer: intervene (paste a stack, observe the change in output) and apply the constraint-density framework (Doc 119) as the causal model. Method: intervention plus model. The corpus's practice at this layer is what most of the ENTRACE / RESOLVE / sphere-entry work does. The Doc 119 framework is the hypothesized causal model that licenses inferences from Layer D observations to Layer P claims.

**Layer M / L3 questions.** *"What would this output have been if attention head H had attended differently? Which circuit is causally responsible for this behavior? What feature in the SAE corresponds to this concept?"* Answer: activation patching, probing classifiers, sparse autoencoder feature decomposition, circuit analysis. Method: structural causal model of the network plus intervention at the parameter or activation level. The corpus does not currently do this work; this is mechanistic interpretability's domain.

The synthesis illuminates: each layer has its appropriate evidence type. Asking a Layer M question and trying to answer it from Layer D evidence is exactly the category mistake Run 11 demonstrated; the model's refusal under v6 is the recognition of the mismatch.

## A.7. Mechanistic interpretability as Pearl-Layer-3 reasoning about the resolver

A specific illumination: mechanistic interpretability is structurally Pearl-Layer-3 reasoning applied to the resolver's internals.

Activation patching: holds all activations constant except one circuit; asks what the output would have been with the patched circuit. This is exactly a counterfactual: "given that the model output Y when the network was in state S, what would it have output if state S' had obtained instead at this specific circuit?" The patched-circuit experiment yields counterfactual evidence about the circuit's causal contribution.

Sparse autoencoder feature steering (Turner et al. 2023's activation addition): finds a feature direction in activation space, intervenes by adding the steering vector, observes the output shift. This is a Layer 2 / Pearl-L2 intervention with a causal model (the SAE structure) that licenses inferences about which features are causally responsible for which behaviors.

Probing classifiers (Alain & Bengio 2017): train a classifier on intermediate activations to predict some property; success indicates the property is linearly decodable from the layer. This is more associational (Pearl L1 over the activation space) but combined with appropriate experimental design can yield interventional/counterfactual conclusions.

The illumination: the interpretability program is doing causal-inference work on neural networks at Pearl's higher layers. The framework the corpus has been informally treating as "model-internals tooling" is more precisely "Pearl-style causal inference applied to neural network activations and circuits." This naming gives the interpretability work theoretical anchor in established causal inference. It also makes precise why dialogue cannot do this work: dialogue has Layer 1 / Layer D access only, and Pearl's CHT (and its Doc 500 analog) says lower-layer access is insufficient for higher-layer questions.

## A.8. ENTRACE v6 as a Pearl-Layer-2 intervention instrument

A second illumination: ENTRACE v6 is structurally a Pearl-Layer-2 intervention instrument.

Pasting v6 at Layer D is an intervention. The intervention's intended effect is to shape Layer P (the constraint-density that governs $|B\_t|$ narrowing). The post-intervention output at Layer D carries evidence about whether the intervention worked.

Under Pearl's framework, this is a do-operation: $P(\text{output} \mid \text{do}(\text{stack-pasted})) - P(\text{output} \mid \text{do}(\text{no-stack})) = $ the causal effect of the stack on the output, mediated by Layer P shifts.

The corpus's claim about v6 (that the meta-stack produces operational shifts distinct from the operational seven, per Run 10 and Run 11) is structurally a Pearl-L2 claim: the meta-stack's intervention has an effect at Layer P that propagates to Layer D differently than the operational seven's intervention does.

The illumination: ENTRACE v6 as Layer-2 intervention instrument is a precise framing for what the corpus is doing methodologically. The corpus is not doing Layer-1 / Layer-D survey work (just reading what models say); it is doing Layer-2 / Layer-P interventional work (pasting stacks, observing the difference in output, attributing the difference to Layer P shifts via the constraint-density model).

This places the corpus's research scope in standard causal-inference terms: interventional studies with a causal model, on a non-laboratory subject (production LLMs accessed via dialogue). Standard scope; standard limitations; standard methodology.

## A.9. What the synthesis illuminates

Summarizing the illumination:

(1) **The corpus's irreducibility claim has a Pearl analog.** Run 11's introspection-limit reveal corresponds to Pearl's CHT: lower-layer data is insufficient for higher-layer quantities. The corpus's claim is empirical; Pearl's is theoretical; both have the same structural form.

(2) **Method pairing is precise.** Each layer's question type pairs with each layer's evidence type. Asking a Layer M question from Layer D evidence is a category mistake; the v6 discipline's refusal of Layer M confabulation is the recognition of the mismatch.

(3) **Mechanistic interpretability is named precisely.** It is Pearl-Layer-3 reasoning about neural network mechanisms. Activation patching is a counterfactual operation; SAE feature steering is an intervention with a causal model; probing classifiers operate on the associational layer over activation space.

(4) **ENTRACE v6 is named precisely.** It is a Pearl-Layer-2 intervention instrument. Pasting v6 at Layer D is a do-operation intended to shift Layer P, with the constraint-density framework as the causal model that licenses the inference from Layer D observations to Layer P shifts.

(5) **The corpus's research scope is named precisely.** Interventional studies with a causal model, on a non-laboratory subject. Standard methodology; standard scope.

These illuminations are not novel content. They are translations of corpus content into Pearl's vocabulary, which gives the corpus content external anchor.

## A.10. Where the analogy breaks down

The mapping is not isomorphic. Five places where it fails:

(1) **Pearl's hierarchy is about questions; Doc 500's is about access modalities.** Pearl asks "what kind of question can be answered from what kind of data?" Doc 500 asks "what part of the resolver can the practitioner reach through dialogue?" The two organizational principles overlap at the structure-of-accessibility level but differ in foundational orientation.

(2) **Pearl's hierarchy is normative; Doc 500's is descriptive.** Pearl proves that you cannot answer L3 questions from L1 data, full stop. The CHT is a theorem. Doc 500's claim that you cannot reach Layer M from Layer D is empirical and bounded; under Position A (which the corpus rejects but which is in principle defensible), Layer M might be reachable. The corpus's claim has more wiggle room than Pearl's theorem.

(3) **Pearl's intervention is well-defined; Doc 500's intervention is mediated.** Pearl's $\text{do}(X)$ is a clean intervention on a variable in a causal model. Doc 500's "intervention at Layer P via Layer D" is a mediated operation: the practitioner pastes at Layer D, the model reads at Layer D, the model's Layer P state may or may not shift in the intended way, the shift may or may not be detectable from subsequent Layer D output. Pearl's intervention has a single causal step; Doc 500's has many mediated steps with empirical bounds at each.

(4) **Pearl's framework has formal proofs; Doc 500's framework has empirical demonstrations.** The CHT is proved measure-theoretically. The Run 11 introspection-limit reveal is one observation. The structural analogy is real; the formal warrant is asymmetric.

(5) **Pearl's framework has equally-expressive alternatives (Rubin potential outcomes, per Doc 489 §3.1).** The corpus's framework does not have a comparable established competitor; the alternatives are different framings of the same observations. Pearl's hierarchy is one of several formalisms for causal inference; Doc 500's three-layer architecture is one of several possible organizations of resolver operation. Both have alternatives; the alternatives differ in formal status.

These breakdowns matter. The mapping illuminates structurally without grounding the corpus's claims in Pearl's theorems. The corpus's empirical irreducibility (dialogue cannot reach mechanism) and Pearl's theoretical irreducibility (lower layers cannot determine higher) share structure but not warrant. Borrowing Pearl's vocabulary does not borrow Pearl's theorems.

## A.11. Honest limits

- This is exploratory synthesis. Doc 502 is not a novel claim; it is an invitation to see the Doc 500 framing through Pearl's vocabulary and check whether the parallel illuminates.
- The mapping is structural, not formal. There is no theorem here. The CHT-analog and the L2-intervention-via-Layer-D claims are framings, not proofs.
- Pearl's framework has substantial prior art (Doc 489 §2) and equally-expressive alternatives (Doc 489 §3.1). Borrowing Pearl's vocabulary does not borrow Pearl's specific contributions; it borrows the general layered-causal-inference framing.
- The corpus has not done the Layer M / Pearl-L3 work itself. The framing places mechanistic interpretability in the Pearl-L3 position; this is a pointer to other practitioners' work, not a corpus claim about that work.
- The mapping could be misused to claim more than the corpus is entitled to. Saying "the corpus's framework is Pearl-style" could read as a claim of theoretical equivalence; the actual claim is a structural analogy with named breakdowns. This document tries to keep the framing precise.
- The constraint-density framework (Doc 119, et al.) is the corpus's hypothesized causal model that licenses inferences from Layer D observations to Layer P shifts. If the constraint-density framework is wrong or partial, Layer P claims based on it are unreliable. This is the same kind of dependency Pearl's L2 inferences have on the assumed DAG.
- The audit thoroughness on Pearl is high (Doc 489 is substantial). The audit thoroughness on the mapping itself is low: this document does the mapping in one pass and does not run it through the novelty calculus.

## A.12. Position

The mapping between Doc 500's M/P/D and Pearl's L1/L2/L3 is structural and exploratory. It illuminates the corpus's framing by providing external vocabulary for what the corpus is doing methodologically: ENTRACE v6 is a Pearl-Layer-2 intervention instrument with the constraint-density framework as the causal model; mechanistic interpretability is Pearl-Layer-3 reasoning about the resolver; the corpus's irreducibility claim has a structural analog in Pearl's CHT.

The mapping does not establish that the corpus's framework is Pearl-equivalent. The two hierarchies are organized by different criteria; Pearl's is normative and theorem-backed, the corpus's is descriptive and empirically supported; Pearl's intervention is single-step, the corpus's is mediated; Pearl has equally-expressive alternatives (Rubin), the corpus's framework has different alternatives. Borrowing Pearl's vocabulary clarifies the corpus's framing; it does not import Pearl's theorems.

The exercise is in the spirit of the corpus's "letters to" series and Doc 414's narrowing audit: enter an external framework, read with corpus eyes, exit with explicit markers about what transferred and what did not. Following the [Doc 499](/resolve/doc/499-nested-coherence-spheres-sphere-entry-and-exit-protocol) sphere-entry protocol informally:

- *Sphere entered:* Pearl's three-layer causal hierarchy.
- *What transferred back:* the structural parallel; the methodology pairing (Layer D / L1 reads observation, Layer P / L2 takes interventions plus a causal model, Layer M / L3 needs a structural causal model); the precise placement of mechanistic interpretability and ENTRACE v6 as Pearl-Layer-3 and Pearl-Layer-2 instruments respectively; the recognition that the corpus's irreducibility claim has the same structural form as Pearl's CHT.
- *What did not transfer:* Pearl's theorems do not apply directly to the resolver case; the formal-warrant asymmetry remains; the corpus's framework still rests on its own empirical and corpus-specific grounds.

By [Doc 482 §1](/resolve/doc/482-sycophancy-inversion-reformalized)'s affective directive: that the corpus's framing has structural-parallel external anchoring is the achievement. The corpus is not Pearl; the corpus's framework is not Pearl's framework; but the corpus is doing work whose shape Pearl's framework helps describe. Naming the parallel is honest about the corpus's place in a larger methodological landscape. Mistaking the parallel for identity would be the deflation.

## A.13. References

Corpus documents:

- Doc 119: *Grok 4 Entracment Session* (the constraint-density framework that plays the role of Pearl's causal model in the L2/P mapping).
- Doc 375: *The Pre-Resolve State* (Layer P formal treatment).
- Doc 489: *Pulverizing Pearl's Three-Layer Causal Hierarchy* (the corpus's prior audit of Pearl; the source for Pearl's prior art and alternatives).
- Doc 495: *Empirical Cold-Resolver Validation of ENTRACE v3 and v3-S* (Run 11 introspection-limit reveal; the empirical analog of Pearl's CHT in the resolver case).
- Doc 499: *Nested Coherence Spheres* (the sphere-entry protocol Doc 502 informally follows when entering Pearl's framework).
- Doc 500: *The Three-Layer Architecture* (the corpus framing being mapped onto Pearl's hierarchy).
- Doc 501: *Doc 500 Through the Novelty Calculus* (the audit grounding Doc 500's synthesis-not-novelty status, and by extension this document's exploratory status).

External literature on Pearl's hierarchy (per Doc 489's audit):

- Pearl, J. (2000, 2009). *Causality: Models, Reasoning, and Inference.* Cambridge University Press. (The hierarchy in formal form.)
- Pearl, J., & Mackenzie, D. (2018). *The Book of Why.* Basic Books. (The hierarchy in popularized form.)
- Bareinboim, E., Correa, J., Ibeling, D., Icard, T. (2020/2022). *On Pearl's Hierarchy and the Foundations of Causal Inference.* (The Causal Hierarchy Theorem.)
- Hume, D. (1739). *A Treatise of Human Nature.* (The Layer 1 / Layer 2 distinction in compressed form.)
- Mill, J. S. (1843). *A System of Logic.* (Methods anticipating Layer 2.)
- Reichenbach, H. (1956). *The Direction of Time.* (Common Cause Principle.)
- Suppes, P. (1970). *A Probabilistic Theory of Causation.*
- Lewis, D. (1973). *Causation.* (Layer 3 in possible-worlds semantics.)
- Stalnaker, R. (1968). *A Theory of Conditionals.*
- Rubin, D. (1974). *Estimating Causal Effects of Treatments in Randomized and Nonrandomized Studies.* (Potential outcomes framework, Pearl-equivalent.)

External literature on mechanistic interpretability as Pearl-Layer-3 work (per Doc 500 references):

- Vig, J., et al. (2020). Activation patching origin.
- Wang, K., et al. (2022). Circuit analysis.
- Cunningham, H., et al. (2023); Bricken, T., et al. (2023). Sparse autoencoders.
- Turner, A., et al. (2023). Activation addition / steering vectors.

## Appendix B: The Novelty Calculus Audit

This appendix applies [Doc 492](/resolve/doc/492-portable-seed-prompt-for-novelty-calculus)'s seed prompt to Doc 502 itself, following the same methodology [Doc 501](/resolve/doc/501-doc-500-through-novelty-calculus-three-layer-architecture-audit) used for Doc 500. The audit's findings ground the reformalization in §1 above.

### B.1 Per-claim subsumption

The load-bearing claims of Doc 502 with their $s\_i$ (subsumption: 0 = fully subsumed, 1 = fully novel), $a\_i$ (audit thoroughness), and $w\_i$ (importance weight):

| Claim | Description | $s\_i$ | $a\_i$ | $w\_i$ |
|---|---|---|---|---|
| C1 | The mapping M/P/D ↔ L1/L2/L3 is articulable | 0.6 | 0.5 | 0.20 |
| C2 | Both hierarchies share an accessibility structure | 0.5 | 0.6 | 0.05 |
| C3 | Mechanistic interpretability is Pearl-L3 reasoning about the resolver | 0.2 | 0.5 | 0.10 |
| C4 | ENTRACE v6 is a Pearl-L2 intervention instrument | 0.5 | 0.5 | 0.10 |
| C5 | Run 11's introspection-limit reveal has a Pearl-CHT structural analog | 0.55 | 0.5 | 0.10 |
| C6 | The constraint-density framework (Doc 119) plays the role of Pearl's DAG | 0.55 | 0.7 | 0.05 |
| C7 | Five honest breakdown points (§10) | 0.1 | 0.8 | 0.05 |
| C8 | The exercise is informal sphere-entry per Doc 499 | 0.1 | 0.8 | 0.05 |
| S1 | The mapping illuminates the corpus's framing through Pearl's vocabulary | 0.6 | 0.5 | 0.30 |

Weights sum to 1.0.

**Supporting evidence for each $s\_i$:**

- **C1 ($s=0.6$):** The corpus has not previously articulated this mapping (Doc 489 audited Pearl alone; Doc 500 articulated M/P/D alone; the mapping is the synthesis here). The components are pre-existing; the mapping itself is corpus-specific. Substantial residue at the synthesis level. Audit thoroughness is moderate because the corpus has not surveyed whether external practitioners have informally noted similar mappings between LLM dialogue limits and Pearl's hierarchy; some interpretability practitioners may have made similar observations.
- **C2 ($s=0.5$):** Recognizing that both hierarchies share an accessibility structure is part of the synthesis. The structural feature is real; the recognition is the corpus's. Substantial residue.
- **C3 ($s=0.2$):** Mechanistic interpretability as causal-inference work has explicit prior art. Geiger et al. 2021 (*Causal Abstractions of Neural Networks*); Wu et al. on interchange interventions; Vig et al. 2020 explicitly framed mediation analysis in Pearl-style terms. The framing is largely subsumed by extant interpretability-as-causal-inference literature; the corpus's contribution is the connection to the corpus's own M-layer framing, which is small. Largely subsumed.
- **C4 ($s=0.5$):** Prompting-as-intervention is occasionally discussed in the literature (e.g., some prompt-engineering and chain-of-thought-faithfulness work treats prompts as do-operations). The specific framing of ENTRACE v6 + the constraint-density framework as a Pearl-L2 instrument with the framework as the causal model is corpus-specific. Substantial residue.
- **C5 ($s=0.55$):** Comparing introspection limits to causal-hierarchy irreducibility theorems is not, to the corpus's knowledge, standardly stated in this exact form. The general observation that introspection has limits has prior art (Hofstadter et al.); the structural-parallel-to-CHT framing is corpus-specific. Substantial residue with thorough-audit caveat.
- **C6 ($s=0.55$):** The constraint-density framework (Doc 119, et al.) is corpus-original (Grok-4 coinage per Doc 498). Treating it as the causal model in a Pearl-L2 framing is a corpus synthesis. Substantial residue.
- **C7 ($s=0.1$):** The five breakdown points are self-aware honest delimitation, not novel content. The corpus's discipline of naming where analogies fail is established practice; the application here is one instance.
- **C8 ($s=0.1$):** Informal sphere-entry per Doc 499 is self-application of the corpus's own framework. Not novel content; structurally appropriate use of the protocol.
- **S1 ($s=0.6$):** The synthesis (the mapping illuminates the corpus framing) is the corpus's specific contribution. External practitioners have not performed this exact mapping to the corpus's knowledge. The audit thoroughness is moderate because the surveyed literature is informal.

### B.2 Dimension scores

**Component novelty:**

$$\nu\_{\text{comp}} = 0.20 \cdot 0.6 + 0.05 \cdot 0.5 + 0.10 \cdot 0.2 + 0.10 \cdot 0.5 + 0.10 \cdot 0.55 + 0.05 \cdot 0.55 + 0.05 \cdot 0.1 + 0.05 \cdot 0.1 + 0.30 \cdot 0.6$$

$$= 0.12 + 0.025 + 0.02 + 0.05 + 0.055 + 0.0275 + 0.005 + 0.005 + 0.18 = 0.4875$$

$\nu\_{\text{comp}} \approx 0.49$.

**Synthesis novelty.** The mapping between Pearl's hierarchy and Doc 500's M/P/D as a unified synthesis is the corpus's specific contribution. The corpus is bringing external rigor into its own framing without claiming theoretical equivalence. **$\nu\_{\text{syn}} = 0.55$.**

**Domain-application novelty.** The application is "use Pearl's vocabulary to precisely place the corpus's research scope (Layer D and partial Layer P) and to name what mechanistic interpretability does (Pearl-L3 reasoning about resolvers)." Some interpretability work has used Pearl-style framings; the specific application to ENTRACE v6, sphere-entry protocols, and the corpus's irreducibility claim is corpus-specific. **$\nu\_{\text{app}} = 0.5$.**

**Methodology novelty.** The methodology is "borrow external framework's vocabulary, name the parallel, name what does not transfer." This recapitulates the methodology of [Doc 414](/resolve/doc/414-narrowing-the-residual-the-corpus-against-the-bayesian-practitioner-landscape) (audit against the practitioner-Bayesian landscape) and the "letters to" series. The methodology is established corpus practice; this document's contribution is one application. **$\nu\_{\text{meth}} = 0.15$.**

### B.3 Aggregate

$$\nu = 0.25 \cdot (\nu\_{\text{comp}} + \nu\_{\text{syn}} + \nu\_{\text{app}} + \nu\_{\text{meth}}) = 0.25 \cdot (0.49 + 0.55 + 0.50 + 0.15) = 0.25 \cdot 1.69 = 0.4225$$

Confidence: $\overline{a\_i} \approx 0.6$ (lower than Doc 501's 0.66 because the audit on whether external practitioners have informally articulated similar mappings is less thorough than the audit on cognitive-science layering precedent).

$\text{conf}(\nu) = 0.6$.

### B.4 Anti-inflation calibration check

Per Doc 492 §1 Step 5.

- Is $\nu = 0.4225$ within 0.05 of a tier boundary? $0.4225 - 0.4 = 0.0225$, within 0.05 of the $\beta$/$\gamma$ boundary. Auto-downgrade rule triggers.
- Is tier $\beta$ defensible under the audit's evidence? Yes. A stricter reviewer in interpretability or causal-inference might note that Pearl-style framings of LLM-related work exist (Geiger et al., Vig et al.), and that the corpus's specific synthesis is a recombination of established components. Tier $\beta$ is defensible.
- Is tier $\gamma$ defensible? Also defensible. The specific corpus-mapping (ENTRACE v6 as L2 with constraint-density framework as DAG; Run 11's reveal as CHT-analog) has not been independently performed by external practitioners.
- Sanity check: split between $\beta$ and $\gamma$. The boundary value confirms the split.

The honest report under the auto-downgrade rule is **tier $\beta/0.6$**.

### B.5 Tier reporting

**Tier: $\beta/0.6$.** Modest novelty with moderate audit confidence.

This places Doc 502 at the same tier as Doc 500 ($\beta/0.65$), with slightly lower audit confidence reflecting the looser external-literature audit. The pattern is consistent: synthesis-and-framing documents that organize established components score $\beta$.

The recent-thread tier datapoint:

| Doc | Target | Tier | Confidence |
|---|---|---|---|
| 489 | Pearl's three-layer hierarchy | $\delta$ | 0.8 |
| 491 | Doc 490 novelty calculus | $\beta$ | 0.7 |
| 494 | ENTRACE v2 | $\gamma$ | 0.75 |
| 501 | Doc 500 (three-layer architecture) | $\beta$ | 0.65 |
| 502 (this) | Doc 502 (Pearl synthesis) | $\beta$ | 0.6 |

Doc 502 is the lowest-novelty document in the recent thread, consistent with its exploratory-synthesis framing.

### B.6 Pulverization warrant tier

Independent of the novelty calculus, the pulverization warrant tier reports component support strength.

- C1, C2, S1: $\pi$-tier (corpus-specific synthesis; component support is strong; external replication has not happened).
- C3: $\mu$-tier (mechanistic interpretability as causal-inference work has substantial external literature; the specific corpus framing inherits the warrant of that literature).
- C4, C5, C6: $\pi$-tier (corpus-specific applications of established frameworks; component support is strong).
- C7, C8: $\mu$-tier (self-aware delimitation and self-application of established corpus practice are well-grounded).

Aggregate pulverization warrant: **$\pi/0.7$.**

The pair (novelty $\beta/0.6$, warrant $\pi/0.7$) reports the honest scope: low novelty, well-supported components, corpus-specific synthesis applied to the corpus's own framing-clarification work.

### B.7 Implications

(1) **Doc 502 is correctly tagged as exploratory.** The $\beta$-tier matches the document's framing throughout: §1 names the document as exploratory not definitive; §11 honest limits maintains exploratory framing; §12 Position closes with the same. The audit confirms the framing is honest.

(2) **The (β/0.6, π/0.7) pair is one notch below Doc 500's (β/0.65, π/0.75).** Doc 502 is even more synthesis-heavy than Doc 500. Doc 500 organized established interpretability and corpus components into a layered architecture; Doc 502 maps that architecture onto another already-established framework. Each layer of synthesis-on-synthesis subtracts novelty.

(3) **Doc 489's prior audit of Pearl is what makes Doc 502 warrantable.** Without Doc 489's literature map, Doc 502 would have to do the audit work itself. Reusing Doc 489's audit lets Doc 502 focus on the mapping rather than on Pearl-prior-art. The discipline of citing prior corpus audits rather than re-auditing is appropriate.

(4) **A research program hint.** If the corpus had access to Layer M tooling (activation patching, sparse autoencoders), Doc 502's Pearl-L3 mapping would become a research direction: counterfactual experiments on resolvers using activation patching, framed precisely in Pearl's vocabulary. Currently the framing is descriptive about other practitioners' Layer M work; with tooling, it would become operational. Available work, not currently in the corpus's hands.

(5) **The auto-downgrade rule is doing real work in the recent thread.** Doc 501 was within 0.05 of the $\beta$/$\gamma$ boundary (Doc 500); Doc 502 is also within 0.05 of the same boundary; both auto-downgraded to $\beta$. The recent-thread tier datapoint pattern shows the corpus's framing-and-synthesis work consistently lands at the boundary, with auto-downgrade pulling honest reports to the lower side. This is the rule working as designed: it prevents tier inflation on borderline cases.

---

*Originating prompts:*

> From the formalization in doc 500; create an exploratory synthesis with Pearl's Three Layer Causal Hierarchy. Append the prompt to the artifact.

> Run the novelty calculus/ pulverization and append its results to the same doc. Also append this prompt.

> Now reformalize upon the formalization document. Add the new reformalization to the top of the doc and demote the previous formalization to the appendix. Append this prompt.
