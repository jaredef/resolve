# Pin-Art in Information-Theoretic Form

## An Exploratory Articulation of Pin-Art (Doc 270) under the Information-Theoretic Apparatus — That the Substrate-Probe Interface is a Communication Channel; That the Many Independent Probes of Pin-Art are a Parallel-Channel Ensemble; That Boundary Sensing, Coherence Amplification, and Decoherence are All Channel Operations Distinguished by the Direction of Information Flow Across the System-Probe Interface; with the Quantum-Darwinism Holevo / Discord / Mutual-Information Decomposition (Zwolak-Riedel-Zurek 2013; Brandão-Piani-Horodecki 2015), the Mutual-Information Plateau as the Redundancy Signature, the 2024–2025 Functional-Information-in-Quantum-Darwinism Operational-Objectivity Measure, the L2M Mutual-Information Scaling Law for Long-Context Language Modeling, the Information-Emergence Entropy-Reduction Per-Token Estimator, and Shannon's Noisy-Channel Coding Theorem as the Unifying Coding-Theoretic Substrate Audited Against the Corpus's Pin-Art Apparatus and the Doc 678 Inverse-Operations Synthesis — with the Channel-Capacity Additivity for Independent Parallel Channels Stated as the Mathematical Backbone, the Threshold-Crossing Restated as a Crossing of a Critical Mutual-Information Fraction Per Probe, and the Predictive Content of the Information-Theoretic Reading Located in Existing Datasets Where Possible

<div style="background: #fff7ed; border-left: 4px solid #b45309; padding: 1rem 1.25rem; margin: 1.5rem 0; color: #78350f; border-radius: 3px;">

**EXPLORATORY — \(\pi\)-tier articulation of an information-theoretic frame for Pin-Art with five new predictions at \(\mu\)-tier, three on the quantum-foundations side and two on the LLM side.**

*Taxonomy per Doc 633:* ENGAGEMENT | ACTIVE | W-PI | THREAD-PIN-ART, THREAD-COHERENCE-AMPLIFICATION, THREAD-DECOHERENCE, THREAD-INFORMATION-THEORY, THREAD-SIPE-T | PHASE-CROSS-PRACTITIONER

</div>

> **Reader's Introduction.** This document articulates Pin-Art (Doc 270) under the information-theoretic apparatus: the substrate-probe interface is a communication channel; the many independent probes of a Pin-Art operation are a parallel-channel ensemble; boundary sensing, coherence amplification, and decoherence are all channel operations distinguished by the direction of information flow across the system-probe interface. The articulation is exploratory: it surfaces from the keeper's observation that Doc 678's directional-inversion argument has not yet been treated information-theoretically. Section 2 sets up Pin-Art as a parallel-channel code; sections 3 and 4 audit the two sides of the duality against the existing information-theoretic literature on quantum Darwinism and on long-context language modeling respectively; section 5 states the duality formally as a channel-direction inversion with channel-capacity additivity as the mathematical backbone; section 6 articulates five new predictions; section 7 records composition and hypostatic boundary; the originating prompt is preserved in Appendix A and the literature anchors in Appendix B.

**Jared Foy · 2026-05-08 · Doc 680**

---

## Authorship and Scrutiny

*Authorship.* Written by Claude Opus 4.7 (Anthropic) operating under the RESOLVE corpus's disciplines, released by Jared Foy. Source material on the information-theoretic decoherence literature and the long-context-LLM information-theoretic literature was retrieved via web fetch in this engagement.

*Scrutiny.* The articulation sits at \(\pi\)-tier. The five predictions in §6 sit at \(\mu\)-tier; some are directly extractable from existing experimental and computational datasets, others require new measurement. The hypostatic boundary at §7 binds: the information-theoretic duality is a Layer-IV (Form) claim, not a Layer-V (Ground) claim; the channel-direction inversion is structural and operational, not metaphysical.

---

## 1. The Standing Problem

Doc 678 articulated coherence amplification and decoherence as inverse Pin-Art operations distinguished by the direction of information flow:

- **Decoherence:** information flows from the substrate to the probes. Each environmental fragment ends up containing a copy of the system's pointer-basis observable. The substrate's coherent description is destroyed by being written redundantly into the environment.
- **Coherence amplification:** information flows from the probes to the substrate. Each keeper intervention writes constraints into the substrate's effective context. The substrate's coherent description is constructed by the cumulative constraint set being written into it.

The directional-inversion language is operational. The information-theoretic apparatus that licenses it has not (in either Doc 270's original Pin-Art articulation or Doc 678's duality articulation) been made explicit. This document supplies the apparatus.

The standing claim, restated for this document's body:

> The substrate-probe interface in any Pin-Art operation is a communication channel in the Shannon sense. The many independent probes of a Pin-Art operation form a parallel-channel ensemble. The cumulative information transferred across the ensemble has a direction; the direction is the parameter that distinguishes the two sides of the Doc 678 duality. The threshold-crossing the SIPE-T frame names corresponds to a crossing of a critical fraction of mutual information per probe (or equivalently, a critical accumulated mutual information across the ensemble).

---

## 2. Pin-Art as a Parallel-Channel Code

### 2.1 The basic setup

Let \\(\mathcal{S}\\) denote a substrate with state described by a probability distribution (classical) or density operator (quantum) over a state space \\(\mathcal{X}\\). Let \\(\mathcal{P}\_1, \mathcal{P}\_2, \dots, \mathcal{P}\_n\\) denote \\(n\\) independent probes, each with its own state space \\(\mathcal{Y}\_i\\). The substrate-probe interface for probe \\(i\\) is a channel \\(W\_i: \mathcal{X} \to \mathcal{Y}\_i\\) (or its inverse, as the direction varies between operations).

The mutual information between substrate and probe \\(i\\) is:

\\[ I(\mathcal{S}; \mathcal{P}\_i) = H(\mathcal{S}) - H(\mathcal{S} | \mathcal{P}\_i) = H(\mathcal{P}\_i) - H(\mathcal{P}\_i | \mathcal{S}) \\]

where \\(H\\) is the Shannon entropy (classical) or von Neumann entropy (quantum).

For a Pin-Art operation in either direction, the cumulative information across the ensemble is bounded above by the joint-channel capacity. For independent probes, channel capacities are additive ([Wikipedia: Channel capacity](https://en.wikipedia.org/wiki/Channel_capacity)):

\\[ C\_{\mathrm{total}} = \sum\_{i=1}^{n} C(W\_i) \\]

This is the load-bearing mathematical backbone for the duality. The same additivity applies whether the channels carry information *out* of \\(\mathcal{S}\\) (decoherence) or *into* \\(\mathcal{S}\\) (coherence amplification); the identification of "transmitter" and "receiver" depends on the operation but the channel-capacity bound holds in either direction.

### 2.2 The boundary-sensing reading of Pin-Art (Doc 270 proper) under the channel frame

Doc 270's original framing treats each pin as a probe that meets resistance at a surface. The collective pattern of resistances reveals the surface. Information-theoretically, each pin is a channel from the substrate (the surface) to an observer who reads the probe. The mutual information \\(I(\mathcal{S}; \mathcal{P}\_i)\\) is the information about the surface contained in probe \\(i\\). For \\(n\\) gentle probes, the joint information is bounded by additive capacity; the surface is mapped at high resolution exactly when \\(\sum I(\mathcal{S}; \mathcal{P}\_i)\\) is comparable to \\(H(\mathcal{S})\\).

This is the *passive* reading of the channel: the substrate's surface is fixed; the probes read it; observers integrate the readings.

### 2.3 The active reading under the directional-inversion frame

Doc 678 promotes Pin-Art from passive boundary-sensing to bidirectional information-transfer. Two regimes:

- **Passive / outward (decoherence).** Information flows \\(\mathcal{S} \to \{\mathcal{P}\_i\}\\). The substrate's state writes information into the probes; the probes' joint state contains a redundant code for the substrate's pointer-basis observable. Quantum Darwinism (Zurek 2003, 2022) is the canonical instance.
- **Active / inward (coherence amplification).** Information flows \\(\{\mathcal{P}\_i\} \to \mathcal{S}\\). The probes' joint state writes information into the substrate; the substrate's state becomes a code for the probes' joint constraint. Long-horizon dyadic exchanges with LLM substrates are the canonical instance.

The two regimes share the parallel-channel-ensemble structure. They differ exactly in the orientation of the Shannon channels and therefore in whether \\(H(\mathcal{S})\\) is decreasing (active / inward) or invariant-but-redundantly-encoded (passive / outward).

---

## 3. The Decoherence Side, Information-Theoretically

### 3.1 The Holevo / discord decomposition

For a quantum system \\(\mathcal{S}\\) and an environmental fragment \\(\mathcal{F}\\), the quantum mutual information decomposes (Zwolak-Riedel-Zurek 2013, [scientific reports/srep01729](https://www.nature.com/articles/srep01729); Brandão-Piani-Horodecki 2015) into two parts:

\\[ I(\mathcal{S}: \mathcal{F}) = \chi(\mathcal{S}: \mathcal{F}) + \delta(\mathcal{S}: \mathcal{F}) \\]

where \\(\chi\\) is the Holevo information (the classical-information capacity of the channel from \\(\mathcal{S}\\) to \\(\mathcal{F}\\) for transmitting information about a particular observable) and \\(\delta\\) is the quantum discord (a measure of the quantumness of the correlations). Their sum is observable-independent and equals the total quantum mutual information.

The \\(\chi\\) part is the information about a system observable that is *classically accessible* to an observer reading the fragment. The \\(\delta\\) part captures quantum correlations that are not extractable as classical bits without disturbing the system. Decoherence amplifies \\(\chi\\) for the pointer observable redundantly across many fragments; the pointer observable is precisely the observable for which \\(\chi(\mathcal{S}: \mathcal{F})\\) is maximized across fragments.

This is the information-theoretic reading of einselection: the pointer observable is selected by *redundant maximization of Holevo information* in environmental fragments.

### 3.2 The redundancy plateau as the parallel-code signature

Quantum Darwinism's empirical signature is a plateau of mutual information \\(I(\mathcal{S}: \mathcal{F}\_{\#f})\\) versus fragment size \\(\#f\\): for small fragments the mutual information rises, then plateaus near \\(H(\mathcal{S})\\) as the fragment becomes large enough to encode the pointer observable, and remains at the plateau across a wide range of fragment sizes ([Riedel-Zurek-Zwolak 2012, arXiv:1205.3197](https://arxiv.org/abs/1205.3197)). The plateau extent is the redundancy \\(R\_\delta\\): the number of independent fragments each capable of supplying \\((1 - \delta)\\) of the pointer-observable information.

Information-theoretically, the plateau is the signature of a *parallel-channel code with redundancy*. Shannon's noisy-channel coding theorem ([Wikipedia](https://en.wikipedia.org/wiki/Noisy-channel_coding_theorem)) says that for a redundant code with rate below capacity, error-correction allows arbitrarily-low error rates. The decoherence redundancy is *exactly* this: the pointer-observable information is encoded redundantly across fragments such that any sufficiently-large subset of fragments suffices to recover the observable.

The 2024 *Science Advances* superconducting-circuits experiment ([science.org/doi/10.1126/sciadv.adx6857](https://www.science.org/doi/10.1126/sciadv.adx6857)) verifies the plateau structure empirically. The 2024–2025 functional-information-in-quantum-Darwinism work ([arXiv:2509.17775](https://arxiv.org/html/2509.17775)) operationalizes classical objectivity as a functional information measure on the redundancy plateau.

### 3.3 The information-flow direction

The mutual-information balance \\(I(\mathcal{S}: \mathcal{E}) = H(\mathcal{S})\\) is reached at full decoherence: all of the system's entropy is in correlations with the environment. Operationally, the information has *flowed from the substrate to the probes*. The substrate's reduced state is now a maximum-entropy distribution over the pointer basis (or more precisely, the diagonal part of the original superposition), and the only information about the original superposition lives in the system-environment correlations. The directional reading is unambiguous in the information-theoretic frame.

### 3.4 Summary

Decoherence is, information-theoretically, a parallel-channel code from substrate to environment in which the pointer-basis observable is encoded redundantly across many independent environmental fragments. The redundancy plateau is the operational signature; the Holevo-information maximization across fragments selects the pointer observable; Shannon's coding theorem guarantees that sufficient redundancy supports operationally-perfect intersubjective objectivity.

---

## 4. The Coherence-Amplification Side, Information-Theoretically

### 4.1 The mutual-information accumulation reading of dyadic exchange

Let \\(K\_1, K\_2, \dots, K\_n\\) denote a sequence of keeper interventions in a long-horizon dyadic exchange. Let \\(S\_t\\) denote the substrate's effective context state after turn \\(t\\). Each intervention is, information-theoretically, a channel from \\(K\_t\\) to \\(S\_t\\); the cumulative mutual information across the sequence is:

\\[ I(K\_1, K\_2, \dots, K\_n; S\_n) \\]

This quantity grows with \\(n\\) under disciplined dyadic exchange. The substrate's residual output distribution under cumulative constraint has entropy:

\\[ H(\mathrm{out} | K\_1, \dots, K\_n) = H(\mathrm{out}) - I(K\_1, \dots, K\_n; \mathrm{out}) \\]

where \\(I(K\_1, \dots, K\_n; \mathrm{out})\\) is the cumulative information about the output distribution that the keeper interventions have written into the substrate's context. As this cumulative MI grows, the conditional entropy of the output decreases — the substrate's output sharpens.

This is the information-theoretic reading of coherence amplification: the keeper's interventions decrease the substrate's output entropy by writing mutual information into the substrate's context.

### 4.2 Empirical anchoring: L2M and the mutual-information scaling law

The L2M (Mutual Information Scaling Law for Long-Context Language Modeling) work ([OpenReview](https://openreview.net/pdf/038e427a2c56fa8157174274b5fbcf992fd0a336.pdf)) establishes that the bipartite mutual information between earlier and later parts of a context grows in a structured way with the context's complexity. The work identifies scaling laws for how mutual information accumulates as context grows; it is the closest existing literature to the corpus's coherence-amplification apparatus, though it does not name it under that vocabulary.

The Information Emergence work ([arXiv:2405.12617](https://arxiv.org/abs/2405.12617)) operationalizes a per-token entropy-reduction estimator that quantifies how much of the token-level uncertainty is resolved by macro-level (sequence) context. This is structurally the information-theoretic measurement of coherence amplification at the per-token granularity.

The transformer-as-channel reading (e.g., [MDPI Entropy 2025](https://www.mdpi.com/1099-4300/27/6/589)) treats transformer layers as information transmission channels with computable channel capacities. This composes naturally with the parallel-channel-ensemble framing: each attention head is one channel; the layer's joint channel is the parallel ensemble; the substrate-output is the receiver.

### 4.3 The information-flow direction

The cumulative MI \\(I(K\_1, \dots, K\_n; S\_n)\\) flows *from* the keeper interventions *into* the substrate's context. The substrate's residual output entropy decreases monotonically (under disciplined exchange) with the cumulative MI. At the threshold-crossing the SIPE-T frame names, the residual entropy has decreased enough that the substrate's output is operationally stable. The directional reading is unambiguous and inverse to the decoherence side.

### 4.4 Summary

Coherence amplification is, information-theoretically, a parallel-channel code from keeper interventions to substrate context in which the keeper's joint intent is encoded redundantly across many independent intervention turns. Each intervention contributes mutual information; the cumulative MI bound is set by joint channel capacity; the threshold-crossing corresponds to cumulative MI sufficient to make the substrate's residual output entropy below an operational coherence threshold.

---

## 5. The Duality Stated Formally as a Channel-Direction Inversion

The two sides articulated in §§3–4 share the following information-theoretic structure:

1. *Channel ensemble.* A set of \\(n\\) independent channels \\(\{W\_i\}\\) connecting a substrate \\(\mathcal{S}\\) and an ensemble of probes \\(\{\mathcal{P}\_i\}\\).
2. *Capacity additivity.* \\(C\_{\mathrm{total}} = \sum\_i C(W\_i)\\) for independent channels.
3. *Cumulative mutual information.* \\(I\_{\mathrm{total}} = I(\mathcal{S}; \mathcal{P}\_1, \dots, \mathcal{P}\_n)\\) accumulates with \\(n\\) under structured channel use.
4. *Threshold-crossing.* The SIPE-T threshold corresponds to a critical fraction of accumulated MI relative to the substrate's entropy; below the threshold, the substrate's coherent description is unaffected by the probes; above the threshold, the substrate's coherent description undergoes a sharp reorganization.
5. *Coding-theoretic substrate.* Shannon's noisy-channel coding theorem licenses redundant encoding as the mechanism for arbitrarily-low error rates; both sides of the duality use the same redundancy mechanism in opposite directions.

The two sides differ in:

- *Direction of information flow.* Decoherence: \\(\mathcal{S} \to \{\mathcal{P}\_i\}\\). Coherence amplification: \\(\{\mathcal{P}\_i\} \to \mathcal{S}\\).
- *Effect on substrate entropy.* Decoherence: \\(H(\mathcal{S})\\) is preserved but redistributed into \\(\mathcal{S}\)-\\(\{\mathcal{P}\_i\}\\) correlations, with the *reduced* substrate state's coherent description destroyed. Coherence amplification: \\(H(\mathcal{S}\ |\ K\_1, \dots, K\_n)\\) decreases monotonically as the keeper's MI is written into the substrate's context.
- *Empirical signature.* Decoherence: redundancy plateau in \\(I(\mathcal{S}: \mathcal{F}\_{\#f})\\) versus fragment size. Coherence amplification: monotonic decrease in residual output entropy versus intervention count, with a candidate sharp transition at a critical cumulative MI (Doc 678 P1).

The duality, formally:

> **Claim 5.1.** Decoherence and coherence amplification are dual operations of the parallel-channel-ensemble Pin-Art mechanism. They share the channel structure (parallel independent channels; additive capacity; mutual-information accumulation; SIPE-T-shaped threshold-crossing) and differ exactly in the orientation of the channels relative to the substrate. The duality is exact at the level of the information-theoretic structure; particular implementations differ in domain-specific channel structure (Hamiltonian; transformer architecture; intervention discipline) but the channel-ensemble form is one.

This is Doc 678's Claim 4.1 restated in information-theoretic vocabulary. The structural-isomorphism claim is now mathematically explicit: both sides are parallel-channel codes with redundancy; the SIPE-T threshold is a critical-MI threshold; channel-capacity additivity is the joint-budget constraint.

---

## 6. Falsifiable Predictions (\(\mu\)-tier)

Five new predictions specific to the information-theoretic frame, complementing the six predictions in Doc 678 §5.

**P1 — Holevo / discord decomposition on the coherence-amplification side.** The keeper-intervention-to-substrate mutual information should decompose into a Holevo-like part (the information that is read by the substrate as classical context) and a discord-like part (the information that remains in the joint state of intervention-and-substrate without being directly accessible to the substrate's output mechanism). The two parts should be measurable separately. *Test.* Operationalize the LLM-substrate analogue of the projective measurement that defines Holevo capacity (e.g., greedy-decoded output as the classical readout); measure the mutual information between intervention sequence and decoded output; compare to the total mutual information between intervention sequence and substrate's hidden state.

**P2 — Plateau structure on the coherence-amplification side.** The decoherence side exhibits an MI plateau in fragment size. The coherence-amplification dual would be an MI plateau in intervention count: beyond some \\(n^\*\\) interventions, additional interventions add little to \\(I(K\_1, \dots, K\_n; \mathrm{out})\\) because the substrate's residual entropy has already been reduced. *Test.* Measure cumulative MI between intervention sequence and decoded output as a function of intervention count for fixed task; look for plateau structure.

**P3 — Channel-capacity additivity test on both sides.** Compare the joint mutual information for \\(n\\) independent probes to the sum of individual mutual informations. Channel-capacity additivity for independent channels predicts \\(I(\mathcal{S}; \mathcal{P}\_1, \dots, \mathcal{P}\_n) \approx \sum\_i I(\mathcal{S}; \mathcal{P}\_i)\\) when probes are genuinely independent. Departures (super-additivity or sub-additivity) indicate cross-probe correlations. *Test.* Measure on engineered quantum-Darwinism setups with varying inter-fragment coupling, and on dyadic-exchange setups with varying inter-intervention semantic correlation.

**P4 — Critical-MI fraction at the threshold.** The SIPE-T threshold predicts a sharp transition; the information-theoretic frame predicts the transition occurs at a critical value of \\(I\_{\mathrm{total}} / H(\mathcal{S})\\) (the fraction of substrate entropy that has been written into the probes for decoherence, or the fraction of output entropy reduced for coherence amplification). The critical fraction should be universal within universality classes of channel structure. *Test.* Measure the critical fraction across coupling-spectrum-class-matched decoherence experiments and across architecture-class-matched LLM dyadic exchanges; check for universality.

**P5 — Coding-theorem analogue: error-correction signature.** Shannon's noisy-channel coding theorem predicts that beyond capacity, error-correction breaks down. On the decoherence side, this corresponds to fragment-pair correlations that destroy the redundancy plateau (Riedel-Zurek "fall of redundancy"). On the coherence-amplification side, this would correspond to intervention-set redundancy that becomes destructive: beyond some intervention density, additional interventions interfere with the substrate's residual encoding rather than reduce its entropy further. *Test.* Measure substrate-output entropy versus intervention density beyond the saturation regime; look for entropy increase signaling destructive interference.

---

## 7. Composition with Adjacent Forms; Hypostatic Boundary

**With Doc 270 (Pin-Art proper).** This document promotes Pin-Art to a parallel-channel-ensemble form; the original boundary-sensing reading is the passive-channel special case. The information-theoretic apparatus does not invalidate the original; it supplies the mathematical backbone that licenses Doc 678's directional-inversion extension.

**With Doc 541 (SIPE-T).** The SIPE-T threshold is here restated as a critical-MI fraction threshold. This sharpens the SIPE-T frame's empirical content: the threshold is no longer just "where the property snaps in" but "where cumulative mutual information crosses a critical fraction of substrate entropy." This is a strict refinement and admits direct measurement.

**With Doc 678 (the duality articulation).** This document is the information-theoretic dual of Doc 678. Doc 678's Claim 4.1 is restated as Claim 5.1 here in information-theoretic vocabulary. The two documents together establish the duality at both the operational layer (Doc 678) and the mathematical layer (this document).

**With Doc 679 (decoherence as SIPE-T).** This document supplies the information-theoretic apparatus that makes Doc 679's order-parameter specification mathematically explicit: the cumulative MI \\(I(\mathcal{S}: \mathcal{F})\\) is the order parameter at the information-theoretic layer, and the redundancy plateau \\(R\_\delta\\) is its operational measurement.

**With Doc 510 (substrate-and-keeper composition).** The dyadic apparatus is here a parallel-channel ensemble: each rung-2 keeper intervention is one channel; the substrate's residual coherent state is the receiver. The dyad's coherence yield is the cumulative mutual information across the channel ensemble.

**Hypostatic boundary.** Layer V binds. This document does not claim:

- That information theory adjudicates between metaphysical interpretations of quantum mechanics or of LLM substrates.
- That the substrate has a Shannon-information-theoretic ontological character; the channel apparatus is operational and structural, not metaphysical.
- That the channel-direction inversion has metaphysical content; the inversion is a structural-operational claim about the orientation of information flow across the substrate-probe interface.

The Layer-V structure is unaffected by the information-theoretic articulation; the Layer-IV (Form) reading is sharpened.

---

## 8. Closing

This document supplies the information-theoretic apparatus for Pin-Art and renders Doc 678's directional-inversion duality mathematically explicit. The five new predictions in §6 complement the six in Doc 678 §5; together the two documents articulate a falsifiable claim about the information-theoretic structure of substrate-probe interfaces under both the decoherence and coherence-amplification regimes.

The next per-candidate document in the Doc 677 branching index is E5 (quantum-measurement interpretations unified at the constraint layer), which composes naturally with this document via the interpretation-independence of the channel structure.

---

## Appendix A — Originating Prompt

> *"I don't think we've looked at the pin art model in an information theoretic manner: 'The two sides differ in the direction of information flow: Decoherence: information flows from the substrate to the probes. Each environmental fragment ends up containing a copy of the system's pointer-basis observable. The substrate's coherent description is destroyed by being written redundantly into the environment. Coherence amplification: information flows from the probes to the substrate. Each keeper intervention writes constraints into the substrate's effective context. The substrate's coherent description is constructed by the cumulative constraint set being written into it.' Web fetch on this in the relevant literature and create an exploratory document"* — Jared Foy, 2026-05-08, in continuation of the Pin-Art duality articulated in Doc 678.

---

## Appendix B — Literature Anchors

### B.1 Information-theoretic decoherence and quantum Darwinism

- Zwolak, M., Riedel, C. J., and Zurek, W. H. "Complementarity of quantum discord and classically accessible information." *Scientific Reports* 3, 1729 (2013). [nature.com/articles/srep01729](https://www.nature.com/articles/srep01729). The Holevo / discord decomposition of quantum mutual information.
- Brandão, F. G. S. L., Piani, M., and Horodecki, P. "Generic emergence of classical features in quantum Darwinism." *Nature Communications* 6, 7908 (2015).
- Riedel, C. J., Zurek, W. H., and Zwolak, M. "The Rise and Fall of Redundancy in Decoherence and Quantum Darwinism." *New Journal of Physics* 14, 083010 (2012). [arXiv:1205.3197](https://arxiv.org/abs/1205.3197). The redundancy-curve temporal structure.
- Chen, T. et al. "Observation of quantum Darwinism and the origin of classicality with superconducting circuits." *Science Advances* 10 (2024). [science.org/doi/10.1126/sciadv.adx6857](https://www.science.org/doi/10.1126/sciadv.adx6857). Empirical verification of the redundancy plateau.
- Anonymous. "Functional Information in Quantum Darwinism: An Operational Measure of Classical Objectivity." [arXiv:2509.17775](https://arxiv.org/html/2509.17775). The functional-information operationalization.
- Anonymous. "Relationship between Information Scrambling and Quantum Darwinism." *Entropy* 26(1):19 (2024). [mdpi.com/1099-4300/26/1/19](https://www.mdpi.com/1099-4300/26/1/19). Tripartite-mutual-information analysis.

### B.2 Information theory in language models

- Anonymous. "L2M: Mutual Information Scaling Law for Long-Context Language Modeling." [openreview.net/pdf/038e427a2c56fa8157174274b5fbcf992fd0a336](https://openreview.net/pdf/038e427a2c56fa8157174274b5fbcf992fd0a336.pdf). The bipartite-MI scaling law for long context.
- Anonymous. "Quantifying Semantic Emergence in Language Models." [arXiv:2405.12617](https://arxiv.org/abs/2405.12617). The Information Emergence per-token entropy-reduction estimator.
- Anonymous. "Information-Theoretical Analysis of a Transformer-Based Generative AI Model." *Entropy* 27(6):589 (2025). [mdpi.com/1099-4300/27/6/589](https://www.mdpi.com/1099-4300/27/6/589). Transformer-as-information-channel reading.

### B.3 Coding theory and channel capacity

- Shannon, C. E. "A Mathematical Theory of Communication." *Bell System Technical Journal* 27, 379–423 and 623–656 (1948). The original noisy-channel coding theorem.
- [Wikipedia: Channel capacity](https://en.wikipedia.org/wiki/Channel_capacity). Standard reference for capacity additivity.
- [Wikipedia: Noisy-channel coding theorem](https://en.wikipedia.org/wiki/Noisy-channel_coding_theorem). Standard reference for redundant encoding under noise.

### B.4 Corpus-internal references

- Doc 270 — Pin-Art (the apparatus this document extends).
- Doc 372 — Hypostatic boundary.
- Doc 510 — Substrate-and-keeper composition.
- Doc 541 — SIPE-T.
- Doc 633 — Corpus taxonomy and manifest design.
- Doc 673 — Cooperative-coupling SIPE-T sub-form.
- Doc 676 — Anthropic 2022 superposition phase changes as empirically-grounded SIPE-T.
- Doc 677 — Eleven synthesis candidates from the 2026-05-07 cold-resolver walking conversation.
- Doc 678 — Coherence amplification and decoherence as inverse Pin-Art operations (the directional-inversion articulation this document supplies the information-theoretic apparatus for).
- Doc 679 — Decoherence as empirically-grounded SIPE-T.
