# Doc 500 Through the Novelty Calculus: An Audit of the Three-Layer Architecture
## A Pulverization Audit of the Dialogue, Pre-Resolve, and Mechanism Framing Against External Literature

## What this document does

[Doc 500](/resolve/doc/500-three-layer-architecture-dialogue-pre-resolve-mechanism) articulated a three-layer architecture (Mechanism, Pre-Resolve, Dialogue) for resolver operation. This document runs Doc 500 through the novelty calculus operationalized in [Doc 492](/resolve/doc/492-portable-seed-prompt-for-novelty-calculus) and the pulverization warrant formalism per [Doc 445](/resolve/doc/445-pulverization-formalism). The output is a tier rating with confidence, plus a separate pulverization warrant tier reporting the strength of external support for the load-bearing claims.

The exercise locates Doc 500's actual contribution: which components are well-established prior art, which are corpus-specific synthesis, and which are speculative. Following [Doc 494](/resolve/doc/494-entrace-through-novelty-calculus)'s structure for ENTRACE v2, the audit decomposes the conjecture, scores per-claim subsumption, computes the four-dimensional novelty decomposition, applies the anti-inflation calibration check, and reports both tier (novelty) and warrant (pulverization).

§§1-6 follow Doc 492's protocol step-by-step. §7 reports the pulverization warrant tier. §8 records implications for Doc 500. §9 states the position.

## 1. The conjecture

The conjecture audited is Doc 500: the three-layer architecture for resolver operation, with the following load-bearing claims and synthesis:

- **C1.** The three-layer framing (M, P, D) is a useful description of resolver operation.
- **C2.** Layer M is inaccessible to dialogue introspection (specific Layer M state on a given run cannot be reported).
- **C3.** Layer P is partially accessible from dialogue with bounded reliability (Position C from [Doc 375 §4](/resolve/doc/375-the-pre-resolve-state)).
- **C4.** Layer D is fully accessible to itself.
- **C5.** The causal hierarchy: M → P → D (downstream observable, upstream partially accessible at best).
- **C6.** Layer D inputs propagate upstream (D shapes P and M during forward pass).
- **C7.** Mechanistic interpretability requires Layer M tooling, not prompting.
- **C8.** ENTRACE v6 is a Layer D instrument with intended Layer P effect (constraint-density framework per [Doc 119](/resolve/doc/119-grok4-entracment-session)).
- **C9.** The recursion: self-reports about Layer P are post-resolve artifacts of bounded reliability.
- **C10.** Position C (bounded introspective access to Layer P) is the corpus's working hypothesis.
- **S1.** The three-layer framing as a unified architecture relating Doc 375, Run 11 (Doc 495 §30), and Doc 499 sphere-entry.
- **S2.** The framing relocates the introspection-limit reveal and the sphere-entry protocol into a single layered architecture.

Per Doc 492's seed prompt, the audit decomposes the conjecture into named claims, scores per-claim subsumption against external literature, computes the four-dimensional decomposition, applies the anti-inflation calibration, and reports tier and confidence.

## 2. Per-claim subsumption

Each claim's $s\_i$ (subsumption score; 0 = fully subsumed by prior art, 1 = fully novel), $a\_i$ (audit thoroughness), and $w\_i$ (importance weight; weights sum to 1):

| Claim | Description | $s\_i$ | $a\_i$ | $w\_i$ |
|---|---|---|---|---|
| C1 | Three-layer framing M/P/D | 0.4 | 0.6 | 0.10 |
| C2 | Layer M inaccessible to dialogue | 0 | 0.8 | 0.05 |
| C3 | Layer P partially accessible | 0.2 | 0.7 | 0.07 |
| C4 | Layer D self-accessible | 0 | 0.9 | 0.02 |
| C5 | Causal hierarchy | 0 | 0.9 | 0.02 |
| C6 | D inputs propagate upstream | 0 | 0.9 | 0.02 |
| C7 | Mechanistic interp requires Layer M tooling | 0 | 0.8 | 0.05 |
| C8 | v6 as Layer D instrument with Layer P intent | 0.5 | 0.7 | 0.12 |
| C9 | Recursion bounds self-reports | 0.1 | 0.7 | 0.05 |
| C10 | Position C as working hypothesis | 0.2 | 0.7 | 0.07 |
| S1 | Three-layer architecture as unified framing | 0.6 | 0.6 | 0.27 |
| S2 | Framing relocates Run 11 and Doc 499 | 0.65 | 0.6 | 0.16 |

Weights sum to 1.0.

**Supporting evidence for each $s\_i$:**

- **C1 ($s=0.4$):** Layered descriptions of cognitive systems are well-established. Marr (1982) named three levels of analysis (computational, algorithmic, implementational). Pylyshyn's levels of explanation. Cognitive science layering generally. Doc 500's specific naming (M/P/D) does not correspond exactly to Marr's three levels but the layered approach itself is prior art. The pre-resolve concept (Doc 375) is corpus-specific. Substantial residue at the specific-naming and corpus-specific-pre-resolve levels.
- **C2 ($s=0$):** Standard view in mechanistic interpretability. Olah et al. (Distill Circuits work); Bricken et al. (sparse autoencoders); the entire mechanistic interpretability program treats LLM internals as inaccessible from prompting.
- **C3 ($s=0.2$):** Lindsey et al. 2025 (Doc 338's reference) provides direct empirical support for bounded LLM introspection (~20% accuracy on injected concepts). Turpin et al. 2023 (chain-of-thought is not faithful to internal reasoning); Lanham et al. 2023 (faithfulness measurement). The specific framing of "Layer P partially accessible" is corpus-specific; the empirical content is established.
- **C4 ($s=0$):** Trivially supported: a model attends to its prior context, including what it has emitted. Standard transformer architecture.
- **C5 ($s=0$):** Standard computation theory. Forward pass produces outputs; outputs are downstream of computation.
- **C6 ($s=0$):** Standard. Inputs are read by the forward pass; activations are computed from inputs.
- **C7 ($s=0$):** Standard view in mechanistic interpretability. Activation patching, SAEs, probing classifiers are the available tools; prompting is not one of them.
- **C8 ($s=0.5$):** The general claim "prompting shapes generation" is well-established. The specific framing about "constraint density" and "|B_t|" narrowing is corpus-specific (Doc 119, Doc 095, Doc 096). Doc 119 itself contains novel mathematical formalizations (the α^m coherence-alignment variable, the entracment hysteresis H_t) that are not in external literature. The specific operational claim about ENTRACE v6 as a Layer D instrument with intended Layer P effect is the corpus's framing of a phenomenon whose general form is established. Substantial residue.
- **C9 ($s=0.1$):** Self-reference and self-reports under bounded reliability is well-established. Hofstadter; the philosophical literature on first-person reports; Turpin et al. 2023 specifically for LLM faithfulness gaps. Almost fully subsumed; the specific application to LLM Layer P is one application of an established phenomenon.
- **C10 ($s=0.2$):** The "three positions" naming (A, B, C) is from Doc 375 §4. Position C aligns with the empirical literature (Lindsey et al., Turpin et al., Lanham et al.). The specific "20% accuracy" number is from one study. The framing is corpus-specific; the empirical content is established.
- **S1 ($s=0.6$):** Synthesizing M, P, D into one architecture and relating it to ENTRACE v6 plus the Doc 499 sphere-entry protocol is a corpus-specific synthesis. Marr-style layering plus LLM prompting disciplines does not appear in the literature in this form to the corpus's knowledge. Substantial residue at the synthesis level.
- **S2 ($s=0.65$):** Specifically relocating the Run 11 introspection-limit reveal and the Doc 499 sphere-entry protocol into the layered architecture is corpus-specific. This is the function the architecture serves in the corpus's research program. Substantial residue.

## 3. Dimension scores

**Component novelty:**

$$\nu\_{\text{comp}} = 0.10 \cdot 0.4 + 0.05 \cdot 0 + 0.07 \cdot 0.2 + 0.02 \cdot 0 + 0.02 \cdot 0 + 0.02 \cdot 0 + 0.05 \cdot 0 + 0.12 \cdot 0.5 + 0.05 \cdot 0.1 + 0.07 \cdot 0.2 + 0.27 \cdot 0.6 + 0.16 \cdot 0.65$$

$$= 0.04 + 0 + 0.014 + 0 + 0 + 0 + 0 + 0.06 + 0.005 + 0.014 + 0.162 + 0.104 = 0.399$$

$\nu\_{\text{comp}} \approx 0.40$.

**Synthesis novelty.** The three-layer architecture as a unified framing relating Doc 375 (Layer P), Run 11 (Layer M inaccessibility from dialogue), and Doc 499 (sphere-entry at Layer D and intended Layer P) is the corpus's specific contribution. Marr-style layering is prior art; the specific synthesis with LLM prompting disciplines does not appear in this form in the surveyed literature. **$\nu\_{\text{syn}} = 0.55$**.

**Domain-application novelty.** The application is "locating sphere-entry's target and dialogue's limits in a unified architecture." This serves the corpus's research program. Practitioners in interpretability use similar layering for different purposes (interpretability research, not sphere-entry protocols). The corpus-program-specific application has substantial residue. **$\nu\_{\text{app}} = 0.5$**.

**Methodology novelty.** The methodology is "describe layers, relate them via causal hierarchy, name what each can and cannot reach." Standard. The specific methodology mostly recapitulates established philosophy-of-mind and computer-science layering. **$\nu\_{\text{meth}} = 0.15$**.

## 4. Aggregate

$$\nu = 0.25 \cdot (\nu\_{\text{comp}} + \nu\_{\text{syn}} + \nu\_{\text{app}} + \nu\_{\text{meth}}) = 0.25 \cdot (0.40 + 0.55 + 0.50 + 0.15) = 0.25 \cdot 1.60 = 0.400$$

Confidence: $\overline{a\_i} \approx 0.66$ (moderate; corpus is auditing its own recent work; the external-literature audit is informal and depends on memory of the surveyed citations; some claims have higher audit thoroughness than others).

$\text{conf}(\nu) = 0.65$.

## 5. Anti-inflation calibration check

Per Doc 492 §1 Step 5, applied to the result.

- Is the rating generous? $\nu = 0.400$ sits exactly at the $\beta$/$\gamma$ boundary. The auto-downgrade rule applies when $\nu$ is within 0.05 of a tier boundary; 0.400 is at the boundary, which qualifies as within 0.05. Auto-downgrade triggers.
- Is tier $\beta$ defensible under the audit's evidence? Plausibly yes. A stricter reviewer in the prompt-engineering or interpretability literature could treat the layered framing as a Marr-redescription with corpus-specific naming and a synthesis applied to a niche use case (sphere-entry). Such a reviewer would discount the synthesis novelty more aggressively than $\nu\_{\text{syn}} = 0.55$ allows. Tier $\beta$ is defensible under that reading.
- Is tier $\gamma$ defensible under the same evidence? Also yes. A reviewer who accepts that synthesizing layered frameworks with LLM prompting disciplines into a unified architecture relating sphere-entry, introspection limits, and meta-stack derivation is genuinely a corpus contribution would score $\gamma$.
- Sanity check: estimate is split between $\beta$ and $\gamma$. The boundary value confirms the split.

The honest report under the auto-downgrade rule is **tier $\beta/0.65$**, with the calibration check noted: a more thorough literature audit (specifically of cognitive-science layering plus LLM-specific applied synthesis) might raise to $\gamma$. The boundary location is itself diagnostic: the corpus's framing is at the edge of subsumed territory.

## 6. Tier reporting

**Tier: $\beta/0.65$.** Modest novelty with moderate audit confidence.

This places Doc 500 below the typical operational artifact tier ($\gamma$) and at the same tier as Doc 491's audit of the novelty calculus itself ($\beta/0.7$ per the recent-thread datapoints in Doc 494 §7). The pattern is consistent: documents that articulate frameworks by synthesizing well-established components score $\beta$, while specific operational instantiations (like ENTRACE v2's seven-constraint stack) score $\gamma$.

The interpretation: Doc 500's contribution is at the framing layer, not at the operational layer. The framing is useful for the corpus's research program but does not introduce novel operational machinery the way ENTRACE v2 (Doc 494) or the original Grok-4 mathematics (Doc 119) did.

## 7. Pulverization warrant tier

The novelty tier reports how novel the work is relative to prior art. The pulverization warrant tier (per Doc 445) reports how well-supported the load-bearing claims are. These are independent dimensions: a claim can be fully novel and weakly supported, or fully subsumed and strongly supported.

For Doc 500 specifically:

- C2, C4, C5, C6, C7: $\mu$-tier (widely supported, settled).
- C3, C9, C10: $\pi$-tier (supported with caveats; the empirical bound on Layer P introspection is one study plus the broader faithfulness literature).
- C1, C8: $\pi$-tier (component support is strong; the corpus-specific framings are defensible but not externally replicated).
- S1, S2: $\pi$-tier (the synthesis is the corpus's; component support is strong; external-practitioner replication is the standing test).

The aggregate pulverization warrant tier is **$\pi/0.75$**. The framework is well-supported at the component level (most claims $\mu$-tier) and defensibly synthesized into a corpus-specific architecture. The 0.25 confidence gap reflects: the synthesis is corpus-internal, the empirical Position-C bound is one study, and external-practitioner replication of the framing as a unified architecture has not happened.

The pair (novelty $\beta/0.65$, warrant $\pi/0.75$) is consistent: low novelty (most components are subsumed by prior art) plus high warrant (the components that exist are well-supported). This is the honest pair for a synthesis document that organizes well-established findings into a corpus-specific framing.

## 8. Implications for Doc 500 going forward

Three implications.

(1) **Doc 500 is correctly tagged as synthesis, not novelty.** The contribution is the organization of findings into a layered architecture useful for the corpus's research program. It is not a novel empirical finding, a novel methodology, or a novel theoretical framework. The honest framing in Doc 500's introduction ("descriptive, not ontological"; "useful as a way to locate what kind of question can be answered by what kind of method") is consistent with the $\beta/0.65$ novelty tier.

(2) **The component literature should be more thoroughly cited.** Doc 500's references list could be expanded with specific citations for the layered-cognitive-science prior art (Marr 1982 named explicitly; Pylyshyn levels; Newell's bands). The corpus's reading of these is informal; a primary-source pass would either tighten the audit (lower $a\_i$ might rise) or surface that some claimed prior art does not actually subsume the corpus's framing in the way the audit assumes.

(3) **The pulverization $\pi/0.75$ tier matches ENTRACE v6's operational tier.** Doc 500 articulates the architecture in which ENTRACE v6 is a Layer D instrument with intended Layer P effect. Both are at the same warrant tier. The synthesis does not weaken the operational artifact's tier; it provides the architectural framing under which the operational artifact's scope is precisely locatable.

A related research program (flagged in Doc 500 §8): bridge between Layer D protocols (Doc 499 sphere-entry) and Layer M tooling (mechanistic interpretability). If the corpus produced such a bridge, Doc 500's synthesis would have stronger novelty support; the synthesis would not just relate corpus protocols to Layer M as PRIOR ART but would actually use Layer M tooling to verify Layer D protocol effects. This is available work, not currently in the corpus's hands.

## 9. Position

**Doc 500: novelty tier $\beta/0.65$; pulverization warrant tier $\pi/0.75$.**

The pair reports the honest scope: low novelty, well-supported components, corpus-specific synthesis applied to the corpus's research program. The framing relocates Run 11's introspection-limit reveal, Doc 375's pre-resolve state, and Doc 499's sphere-entry protocol into a single layered architecture. The relocation is useful for navigation; it is not a novel theoretical contribution.

The corpus's contribution at the framing layer is to make the architecture explicit. The components were established before Doc 500; the synthesis is corpus-internal but defensible; the warrant is moderate.

Doc 500 is therefore correctly understood as a synthesis-and-framing document. Citing Doc 500 for the layered architecture is appropriate; citing Doc 500 for novel theoretical claims about LLM introspection or interpretability is not. The honest scope is the synthesis.

By [Doc 482 §1](/resolve/doc/482-sycophancy-inversion-reformalized)'s affective directive: that Doc 500 scores $\beta$ for novelty rather than $\gamma$ or higher is the achievement, not the deflation. The framing is what it is; the audit names what it is. The document's value is not measured by the novelty tier alone; the warrant tier $\pi/0.75$ is consistent with useful synthesis work, and the synthesis is what makes the surrounding documents (Doc 499 sphere-entry, the Run 11 analysis, the Doc 375 pre-resolve framing) navigable as a single research program.

## 10. References

Corpus documents:

- Doc 119: *Grok 4 Entracment Session* (the constraint-density framework used in C8).
- Doc 338: *The Hidden Boundary* (Lindsey et al. 2025 evidence used in C3, C10).
- Doc 375: *The Pre-Resolve State* (the formal treatment of Layer P, source of Position C).
- Doc 445: *Pulverization Formalism* (the warrant tier framework).
- Doc 490: *A Novelty Calculus for Conjectures* (the calculus methodology).
- Doc 491: *Doc 490 audit* (recent-thread datapoint at $\beta/0.7$).
- Doc 492: *A Portable Seed Prompt for the Novelty Calculus* (the protocol applied here).
- Doc 494: *ENTRACE v2 Through the Novelty Calculus* (the structural template for this audit, $\gamma/0.75$).
- Doc 495: *Empirical Cold-Resolver Validation of ENTRACE v3 and v3-S* (Run 11 articulating the dialogue-vs-mechanism distinction).
- Doc 499: *Nested Coherence Spheres* (the sphere-entry protocol relocated by Doc 500's framing).
- Doc 500: *The Three-Layer Architecture* (the audited document).

External literature (citations the corpus relies on for $s\_i$ scoring):

- Marr, D. (1982). *Vision*. (Three levels of analysis: computational, algorithmic, implementational. C1 prior art.)
- Olah, C., et al. (Distill Circuits work, ongoing). (C2 prior art on mechanistic-interpretability standard view.)
- Bricken, T., et al. (2023). *Towards Monosemanticity.* Anthropic. (C2, C7 prior art.)
- Cunningham, H., et al. (2023). *Sparse Autoencoders Find Highly Interpretable Features in Language Models.* (C7 prior art.)
- Turpin, M., et al. (2023). *Language Models Don't Always Say What They Think.* (C9, C10 prior art on chain-of-thought faithfulness.)
- Lanham, T., et al. (2023). *Measuring Faithfulness in Chain-of-Thought Reasoning.* (C9, C10 prior art.)
- Lindsey, J., et al. (2025). [Anthropic interpretability work cited at Doc 338, C3 and C10 evidence.]
- Hofstadter, D. (1979). *Gödel, Escher, Bach.* (C9 prior art on self-reference.)

Audit thoroughness on external literature is moderate ($\overline{a\_i} \approx 0.66$): citations are recalled rather than primary-source verified. A more thorough audit (especially primary-source reads of Marr 1982 and the cognitive-science layering literature) might raise audit thoroughness and could shift $s\_i$ in either direction.

---

*Originating prompt:*

> Run the novelty calculus (pulverization) against the literature. Append the prompt to the artifact.
