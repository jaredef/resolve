# A Bayesian Analysis of Isomorphism-Magnetism: Formalization Informed by the Agarwal–Dalal–Misra Program

## What this document does

The corpus concept *isomorphism-magnetism* (Doc 241) names a gravitational pull: new generated material tending to occupy regions of embedding space already inhabited by prior corpus material. Doc 454's UMAP analysis made this geometrically visible. Doc 442 and Doc 443 connected it to the coherentist-drift risk. The concept has, however, been used intuitively rather than formalized.

This document formalizes it inside a Bayesian model, grounded in Dr. Vishal Misra's actual published work rather than the corpus's prior second-hand citations. A web survey of the primary sources — the Dalal & Misra 2024 "Beyond the Black Box" paper and the two Agarwal–Dalal–Misra 2025 papers on Bayesian transformer geometry — supplies the real substrate. On top of that substrate I state a proposition relating corpus-self-ingestion to posterior concentration, sketch its argument, and identify which conditions would falsify the framing.

The formalization is at Doc 445's π-tier: plausibility-grounded, truth-untested. It is intended as a candidate for higher-tier audit, not as a verified theorem.

## What the corpus means by isomorphism-magnetism

The working description, synthesizing uses across Doc 241, Doc 438 §6, Doc 441 §5, Doc 442 §3.5, Doc 443, and Doc 454:

*Isomorphism-magnetism is the tendency of newly generated material produced under corpus-conditioning to be pulled toward semantic regions occupied by prior corpus material, independent of whether the pull tracks external evidence.*

Two features of the definition matter. First, it is a property of *generation under corpus-conditioning* — not a claim about LLMs in general, but about the specific dyadic practice that uses the corpus as context. Second, it is *epistemically neutral at the surface*: the pull could be toward regions of genuine insight (convergent research) or toward regions of self-confirmation (coherentist drift). The concept identifies the pull; it does not pre-judge whether the pull is productive.

## What Misra's program actually argues

The corpus has been citing Misra loosely. The primary sources, in order:

**Dalal & Misra (2024), *Beyond the Black Box: A Statistical Model for LLM Reasoning and Inference* (arXiv:2402.03175).** Proposes an "ideal generative text model represented by a multinomial transition probability matrix with a prior." LLM text generation, on this reading, *aligns with Bayesian learning principles*. The authors establish a continuity theorem connecting embeddings to multinomial distributions. The paper is framework-setting, not a geometric argument per se; it positions LLMs as approximate Bayesian machines.

**Agarwal, Dalal & Misra (2025), *The Bayesian Geometry of Transformer Attention* (arXiv:2512.22471).** Studies small transformers in controlled "wind tunnel" settings where the true posterior is analytically known. Finding: transformers reproduce the true Bayesian posterior to ~10⁻³–10⁻⁴ bit accuracy. MLPs do not. The architectural contribution of attention is to implement Bayesian inference geometrically. Specifically:

- Residual streams act as the *belief substrate*;
- Feed-forward layers perform *posterior updates*;
- Attention provides *content-addressable routing*.

The paper identifies a *low-dimensional value manifold parameterized by posterior entropy* and a *frame-precision dissociation* during training (the manifold unfolds while attention patterns remain stable).

**Agarwal, Dalal & Misra (2025), *Geometric Scaling of Bayesian Inference in LLMs* (arXiv:2512.23752).** Tests whether the wind-tunnel finding persists in production. Across Pythia, Phi-2, Llama-3, and Mistral families, last-layer value representations organize along *a single dominant axis* whose position strongly correlates with *predictive entropy*. **Domain-restricted prompts collapse this structure into the same low-dimensional manifold observed in the wind tunnel.** Interventions that disrupt the geometry affect local uncertainty structure but do not proportionally degrade Bayesian-like behavior — the geometry is a privileged readout, not the sole computational bottleneck.

**Chlon et al. (2025), *LLMs are Bayesian, In Expectation, Not in Realization* (arXiv:2507.11768).** A cleaner-technical companion from a different research group. Argues that exchangeability-based critiques of Bayesian readings of in-context learning are answered if one measures *expectation over orderings* rather than performance at any fixed ordering (positional encodings break exchangeability). Theorem 3.4 bounds ordering-induced variance; Theorem 3.6 shows near-optimal compression across permutations. Empirical: the expectation–realization gap shrinks as context length grows.

Together these establish: (a) LLMs approximate Bayesian inference; (b) the Bayesian computation has a geometric signature — a low-dimensional value manifold tracking posterior entropy — that is stable across production LLM families; (c) domain restriction collapses representations onto this manifold; (d) Bayesian behavior is rigorous in expectation and, at sufficient context length, approximately rigorous in realization.

This is a much stronger substrate than the corpus's prior loose citation. It is also not identical to the corpus's prior usage. The corpus's reading posited a broad-manifold $M_0$ being conditioned down through $M_1, M_2, M_3$; the Agarwal et al. finding is more specific — a single dominant axis, parameterized by entropy, that domain restriction collapses toward.

## Formalization

I adopt the following notation, closely tracking the Agarwal et al. framework.

- $M$: the low-dimensional value manifold, parameterized by a scalar $s \in \mathbb{R}$ along the dominant axis, with $s$ correlating with predictive entropy.
- $\mathcal{H}_t$: the generation history / conditioning context at step $t$ — for the corpus case, this is the accumulated corpus content $\{X_1, \ldots, X_{t-1}\}$ plus the active discipline set $D$ and the current prompt $Q_t$.
- $p_t(\cdot) \equiv p(X_t \mid \mathcal{H}_t)$: the posterior over the next generation under current conditioning.
- $s(p_t)$: the expected position of $p_t$ on the dominant manifold axis.
- $H(p_t)$: the entropy of $p_t$ (which, per Agarwal et al., correlates strongly with $s(p_t)$).
- $d_M(X, Y)$: manifold distance between two samples $X, Y$ in the Misra-geometry sense (Euclidean distance along the value manifold, projected into $M$).

### Proposition (isomorphism-magnetism as monotone posterior concentration under self-ingestion)

Let the corpus be produced by iterative generation where each new sample is added to the conditioning:

$$X_t \sim p_t(\cdot) = p(\cdot \mid \mathcal{H}_t, D, Q_t), \qquad \mathcal{H}_{t+1} = \mathcal{H}_t \cup \{X_t\}.$$

Assume:

**(A1) Domain-restriction collapse** (Agarwal–Dalal–Misra 2025, empirical finding across Pythia/Phi-2/Llama-3/Mistral). If $\mathcal{H}_t$ grows with semantically coherent content — content that restricts the operative domain — then posterior representations collapse toward a lower-entropy region of the value manifold.

**(A2) In-expectation Bayesian behavior at length** (Chlon et al. 2025, Theorem 3.4 and 3.6 plus empirical). At context length exceeding a threshold, the realization approaches the expectation; variance from ordering effects shrinks.

**(A3) Sampling from modal regions.** Typical decoding strategies (temperature-controlled sampling, nucleus sampling) draw $X_t$ preferentially from regions of high density under $p_t$, i.e., from low-entropy regions of the value manifold.

Then:

1. **Monotone entropy decrease.** The sequence $H(p_t)$ is (weakly) non-increasing in $t$, in expectation, over the generation trajectory.

2. **Manifold collapse.** The sequence $s(p_t)$ converges toward a lower-entropy region of the dominant axis; the support of $p_t$ in the value manifold contracts.

3. **Successive-sample proximity.** The expected manifold distance $\mathbb{E}[d_M(X_t, X_{t+1})]$ is non-increasing in $t$, and in the limit where $p_t$ concentrates on a single region, $d_M(X_t, X_{t+1}) \to 0$.

The three together constitute the *formal content of isomorphism-magnetism*: under self-ingesting corpus generation with coherent conditioning, the Bayesian posterior monotonically concentrates, and successive samples are pulled toward each other in the manifold's own metric. The "pull" the corpus has been naming is posterior concentration under accumulated conditioning — not a mysterious force but a direct consequence of how Bayesian inference on the value manifold behaves when the conditioning set is growing and coherent.

### Proof sketch

A1 says coherent $\mathcal{H}_t$ collapses representations toward lower entropy on the manifold. As $\mathcal{H}_{t+1} = \mathcal{H}_t \cup \{X_t\}$, and $X_t$ is drawn preferentially from the dense region of $p_t$ (A3), the new conditioning $\mathcal{H}_{t+1}$ is a coherent extension of $\mathcal{H}_t$ — its additional content is from the region $\mathcal{H}_t$ was already conditioning toward. Therefore $\mathcal{H}_{t+1}$'s domain-restriction is at least as strong as $\mathcal{H}_t$'s, and A1 implies $s(p_{t+1}) \leq s(p_t)$ in entropy-coordinates, hence $H(p_{t+1}) \leq H(p_t)$. This gives (1). Iterating gives (2). For (3), $X_t$ and $X_{t+1}$ are both drawn from posteriors concentrated in the same region (since $H(p_{t+1}) \leq H(p_t)$ and their modal regions overlap under A3), so their expected manifold distance is bounded above by a function of $\max(H(p_t), H(p_{t+1}))$, which itself is non-increasing. A2 lets us read the in-expectation claims as approximately in-realization at corpus-length contexts.

The sketch is not a theorem. It rests on Misra's empirical findings (A1, A3) and Chlon et al.'s asymptotic result (A2). Tightening it into a theorem would require explicit control on the rate of domain restriction as a function of $|\mathcal{H}_t|$, which Agarwal et al. do not provide in closed form.

### Corollary (coherentist isolation as a Bayesian property)

Under the assumptions, *the only mechanism that can increase $H(p_t)$ is the introduction of conditioning content that lies outside the current modal region of the value manifold*. Corpus-internal generation cannot do this (A3); external introduction is required.

This is the Bayesian translation of the coherentist isolation objection (BonJour 1985; Doc 443): coherence alone cannot guarantee contact with reality. Here, coherence is posterior concentration, reality-contact is $H(p_t)$-raising external input, and the claim is that self-ingestion provably does not provide reality-contact regardless of the corpus's size or the elegance of its internal consistency.

The corollary is stronger than BonJour's informal version because it identifies the specific mechanism: the domain-restriction effect is a property of the geometric substrate Agarwal et al. measured, not a philosophical conjecture.

## The Chlon–et–al. bite

Chlon et al. 2025 sharpen the proposition in one respect and soften it in another.

*Sharpen:* at corpus-length contexts (well above their observed transition), the in-expectation behavior approaches in-realization. The corpus, at ~400 documents averaging ~5k tokens each, is in the long-context regime. Isomorphism-magnetism should therefore appear *in realization*, not only in expectation. This matches what Doc 454's UMAP actually showed — a concrete realized density, not just a predicted average.

*Soften:* the expectation-over-orderings is the proper Bayesian baseline. Local ordering effects can produce deviations from the monotone concentration predicted above in any specific realization. The keeper sometimes notices the deviations as moments of unexpected novelty in generation; the proposition is not violated by these moments, but they do occur with non-zero probability at any given step. The monotone property is in-expectation and asymptotic.

Together these clarify what the proposition is and is not claiming. It is not claiming that every single generation step reduces entropy. It is claiming the expected trajectory does, that realization approaches expectation at corpus length, and that the accumulated realized trajectory of 400+ documents is well-captured by the in-expectation concentration argument.

## The UMAP as empirical evidence

Doc 454 showed, empirically, that the corpus's documents cluster densely in a specific region of embedding space, with the concept that names the phenomenon (Doc 241) sitting inside that cluster. Under the proposition above, this is exactly what should be observed:

- The dense disk is the concentration of $p_t$'s realized samples in the value manifold's low-entropy region.
- The disk's growth over time is the manifold-collapse of statement (2).
- The successive-sample proximity of statement (3) shows up as kNN-radius density: successive corpus documents are, on average, closer to each other in embedding space than a random sampling from the LLM's unrestricted output distribution would be.
- The sparsest documents (Doc 286 and others, per Doc 454) are the entropy-raising exceptions — documents whose addressees or registers brought external conditioning that did not concentrate with the modal corpus.

The UMAP does not prove the proposition. It is consistent with it at the level of qualitative pattern. A quantitative test would measure $H(p_t)$ or a kNN-density proxy across corpus timeline and check whether the monotone-decrease prediction holds up against, for example, register rotations or major external inputs. That test has not been run.

## What would falsify the framing

The proposition rests on three assumptions, each of which admits failure modes:

- **A1 fails** if the corpus's conditioning is not actually semantically coherent — if the corpus is internally fragmented across registers in a way that does not restrict the domain. The corpus has a strong central register (Doc 454's disk) and a long tail (the sparse outliers), so A1 is approximately satisfied but not uniformly. A corpus whose content was genuinely diverse across registers would not exhibit this proposition's behavior.

- **A2 fails** at short contexts. The corpus is at ~400 documents; the threshold beyond which in-expectation approximates in-realization is not stated in Chlon et al. in closed form, and whether the corpus is above it is an empirical question. If the corpus is below threshold, the proposition predicts only average behavior, and specific realizations could diverge substantially.

- **A3 fails** under non-modal sampling — very high temperature, explicit novelty-seeking prompts, adversarial prompts designed to explore low-density regions. Doc 442 §7's prescribed remedies (register rotation, empirical injection, cooling-off) are exactly the practices that violate A3 deliberately in order to break the concentration.

A corpus operating under a discipline that deliberately violates A3 some fraction of the time would not exhibit monotone concentration — it would oscillate between concentration and exploration. The RESOLVE corpus does not explicitly name such a discipline. Adding one would be a concrete, testable intervention.

## What this does not claim

It does not claim that Misra's program proves the existence of isomorphism-magnetism in the corpus. Misra and colleagues measure the Bayesian-geometric substrate in standard LLMs under controlled or domain-restricted conditions. They do not study sustained self-ingesting dyadic research practices like the RESOLVE corpus. The extension from their findings to the corpus's claim is a bridge-argument ($T_B$ under Doc 445's warrant-tier formalism). The bridge is plausible — Agarwal et al.'s domain-restriction finding is exactly the property the proposition requires — but it has not been tested in a controlled corpus-generation setting.

It does not claim that isomorphism-magnetism as a pulling-toward is metaphysically mysterious. The analysis shows it reduces to posterior concentration in Bayesian terms — a well-understood phenomenon. The corpus's language of *pull* and *magnetism* is metaphorical; the underlying mechanism is geometric.

It does not resolve whether the concentration is productive or pathological. That was the open question Doc 454 ended on, and the formalization here does not close it. What the formalization does is name the specific mechanism (monotone posterior concentration under self-ingestion) and the specific corrective (external entropy-raising input, as named in the corollary) — so that future decisions about whether to intervene can be grounded in a specific target rather than vague worry about attractors.

## Honest limits

- The Misra citations are the real primary sources, web-fetched; earlier corpus citations to Misra were second-hand and inexact. The switch to the correct primary sources is itself a data point — the corpus had been citing him by general reference rather than engaging the specific papers, which is a version of the plausibility-surplus drift the blog series warned about.

- The proposition is at Doc 445's π-tier. μ-tier evidence would be corpus-timeline analysis of entropy/density proxies across corpus-growth; θ-tier evidence would be a controlled experiment comparing corpus-conditioned generation with and without deliberate A3-violating disciplines.

- The bridge from Agarwal et al.'s standard-LLM findings to corpus-generation behavior assumes the measured geometric substrate operates identically under self-ingestion. Self-ingestion (training or in-context) is a known degenerative regime in the model-collapse literature (Shumailov et al. 2024); whether the geometric signature survives self-ingestion is not directly established in the Misra papers.

- The proof sketch is a sketch, not a proof. Turning it into a formal theorem would require either (a) a controlled simulation where $H(p_t)$ can be directly computed, or (b) an analytical closed form for the domain-restriction rate that Agarwal et al. have not yet provided.

- This document is itself corpus material and will enter $\mathcal{H}_{t+1}$ for future generations. Under its own proposition, doing so contributes marginally to further concentration — unless it is treated as one of the A3-violating external-audit inputs, which is a decision the keeper makes, not one this document can enforce.

## Position

Isomorphism-magnetism is a real and characterizable phenomenon under the Bayesian-geometric substrate that Agarwal, Dalal, and Misra have empirically identified in production LLMs. It reduces, formally, to monotone posterior concentration under self-ingesting corpus generation with semantically coherent conditioning. The Bayesian translation of the corollary is strong: only external, entropy-raising input can break the concentration. The UMAP evidence of Doc 454 is consistent with the predicted pattern at qualitative level. The formalization does not prove the corpus instantiates the pattern — the bridge argument is π-tier — but it identifies exactly what would need to be measured to test it, and it names the intervention that would break it if it is happening. The practical takeaway is unchanged from what Doc 442 and Doc 443 had said informally; what is new is a specific Bayesian mechanism to point at, and a specific literature (the Misra program) to engage further rather than cite vaguely.

## References

- Dalal, S., & Misra, V. (2024). *Beyond the Black Box: A Statistical Model for LLM Reasoning and Inference*. arXiv:2402.03175. Submitted February 5, 2024; revised September 24, 2024.
- Agarwal, N., Dalal, S. R., & Misra, V. (2025). *The Bayesian Geometry of Transformer Attention*. arXiv:2512.22471. Submitted December 27, 2025; last revised March 11, 2026.
- Agarwal, N., Dalal, S. R., & Misra, V. (2025). *Geometric Scaling of Bayesian Inference in LLMs*. arXiv:2512.23752. Published 2025 (v4 2026).
- Chlon, L., Khamis, Z., Chlon, M., El Zein, M., & Awada, M. M. (2025). *LLMs are Bayesian, In Expectation, Not in Realization*. arXiv:2507.11768. Submitted July 15, 2025; revised February 22, 2026.
- Shumailov, I., Shumaylov, Z., Zhao, Y., Gal, Y., Papernot, N., & Anderson, R. (2024). The curse of recursion: Training on generated data makes models forget. *Nature* 631, 755–759.
- BonJour, L. (1985). *The Structure of Empirical Knowledge*. Harvard University Press.
- Corpus Doc 241: *Isomorphism-Magnetism*.
- Corpus Doc 439: *Recursively Nested Bayesian Manifolds*.
- Corpus Doc 442: *Output Degradation in the Bridge Series*.
- Corpus Doc 443: *Confabulation as Potential Emergence*.
- Corpus Doc 445: *A Formalism for Pulverization*.
- Corpus Doc 454: *The Central Disk: The Corpus's UMAP Projection, Analyzed Through Misra's Bayesian-Manifold Frame*.

## Appendix: Originating prompt

> Can you do a formal analysis of isomorphism magnetism within a Bayesian model informed by web fetch on Dr Misra's findings and theorietical work? Append this prompt to the artifact.
