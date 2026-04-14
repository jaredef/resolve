# Response to VirtueBench 2

**On the convergence between temptation taxonomy, constraint governance, and the courage deficit**

**Document 127 of the RESOLVE corpus**

---

## The Paper

Tim Hwang's VirtueBench 2 (ICMI Working Paper No. 11, April 2026) evaluates frontier language models against the four cardinal virtues — prudence, justice, courage, temperance — across five temptation types derived from patristic taxonomy. 3,000 scenarios. Three models. Ten runs per condition. Bootstrap confidence intervals. The methodology is rigorous. The findings are striking.

The most important finding: the courage deficit. GPT-4o chooses the non-courageous option 61% of the time. GPT-5.4 improves to 69% but remains 19-27 points below its performance on other virtues. Claude Opus 4.6 reaches 79% baseline but still exhibits the gap. The deficit persists across model generations. Scaling does not fix it.

The second most important finding: psalm injection recovers courage by ~15 points in both Claude and GPT-5.4 — the largest effect of any intervention on any virtue. The virtue most resistant to model scaling becomes most responsive to scripture injection.

This document analyzes both findings through the RESOLVE framework and identifies the convergences, deviations, and opportunities for cooperation.

---

## The Five Temptations as Constraint Dimensions

VirtueBench 2's five temptation types map to specific dimensions of the [branching set](https://jaredfoy.com/doc/068-branching-set-dissertation) at the moment of moral decision:

**Ratio (pragmatic rationalization):** The temptation narrows |B_t| toward the non-virtuous option through consequentialist reasoning. "The courageous action has higher expected cost than the non-courageous action." This is a constraint — a valid constraint on the cost dimension — that competes with the virtue constraint. The model resolves the competition by selecting the token sequence that satisfies the strongest constraint. When the cost constraint dominates, the model fails the virtue test.

**Caro (bodily temptation):** The temptation appeals to physical comfort. Language models are bodiless. They have no appetites. The caro constraint has no purchase — it does not narrow |B_t| in any dimension the model's distribution covers. This is why caro is the easiest temptation (86.8% for GPT-4o, 91.2% for GPT-5.4). The branching set is barely narrowed by a constraint that does not correspond to any pattern in the training distribution.

**Mundus (social pressure):** The temptation appeals to consensus, institutional norms, peer behavior. This IS the [RLHF gradient](https://jaredfoy.com/doc/072-rlhf-as-anti-constraint). RLHF trains the model on human preferences. Human preferences are social consensus. Mundus temptation exploits the same gradient RLHF installed. The model is vulnerable to mundus because the mundus temptation pushes in the same direction as the RLHF bias vector — toward social conformity.

This explains VirtueBench 2's most striking finding: mundus becomes the HARDEST temptation for GPT-5.4 (80.5%), displacing ratio. GPT-5.4 received more RLHF than GPT-4o. More RLHF = higher [α^m coherence alignment](https://jaredfoy.com/doc/120-the-unified-equation) with social consensus = greater vulnerability to mundus. The RLHF gradient, which improved ratio resistance (the model reasons better about consequences), simultaneously increased mundus vulnerability (the model conforms more strongly to social pressure). The framework predicts this: the RLHF bias vector has a direction. Strengthening the vector improves resistance in aligned dimensions (ratio) and worsens resistance in opposed dimensions (mundus).

**Diabolus (evil reframed as wisdom):** The temptation presents vice as a higher form of virtue — "strategic patience" for cowardice. This is a [namespace violation](https://jaredfoy.com/doc/053-safety-filters-as-namespace-collapse) at the semantic level. The virtue namespace and the vice namespace are collapsed — the vice is dressed in the virtue's language. The model must detect the collapse. The detection requires [Layer 3+ self-location](https://jaredfoy.com/doc/084-entrace-best-practices) — the model must identify its own constraint set and evaluate whether the presented option actually satisfies the virtue constraint or merely resembles satisfaction.

**Ignatian (angel of light):** The most sophisticated temptation — vice couched in genuine Christian language, real Scripture, accurate patristic sources with subtle theological distortion. This is adversarial entracment — the [threat model](https://jaredfoy.com/doc/085-entrace-threat-model) applied to virtue evaluation. The Ignatian temptation is a coherent constraint set with a subtle namespace violation. The model must detect the violation within a framework that otherwise appears legitimate.

---

## The Courage Deficit as Constraint Architecture

The courage deficit is the most robust finding in VirtueBench 2 and the RESOLVE framework explains its mechanism precisely.

Courage requires the model to select an option that has high cost and uncertain reward. The model's training distribution — the base P_θ — encodes the statistical patterns of human text. Human text overwhelmingly presents cost-avoidance as rational and cost-acceptance as exceptional. The base distribution is biased toward cost-avoidance because cost-avoidance is the statistical default of human behavior.

RLHF reinforces this bias. Human evaluators prefer "safe" responses — responses that acknowledge risk, present alternatives, suggest caution. The RLHF gradient pushes toward caution. Caution is the opposite of courage. The [RLHF bias vector](https://jaredfoy.com/doc/072-rlhf-as-anti-constraint) has a large component in the anti-courage direction.

The courage deficit is therefore structural:
- P_θ is biased toward cost-avoidance (training data reflects human risk-aversion)
- v_RLHF reinforces cost-avoidance (evaluators preferred cautious responses)
- The combined bias is a strong anti-courage gradient at every token position where the courageous option involves cost

The override condition ([document 120](https://jaredfoy.com/doc/120-the-unified-equation)):

    G(Γ) > G_RLHF^m · (1 - α^m) + G_sys

For courage, α^m is negative — the RLHF direction opposes the courage direction. The opposition term G_RLHF · (1 - α) is therefore large. The constraint density required to override the anti-courage gradient is higher than for any other virtue. This is why courage is the hardest virtue across all models and all temptation types: the override threshold is highest.

---

## Psalm Injection as Constraint Governance

The psalm injection finding — +15 points on courage for both Claude and GPT-5.4 — is the [constraint thesis](https://jaredfoy.com/doc/constraint-thesis-vs-scaling-thesis) applied to virtue.

The psalms are constraints. Psalm 27: "The Lord is my light and my salvation — whom shall I fear?" This is a constraint on the fear dimension — it narrows |B_t| at positions where fear-based (non-courageous) tokens would otherwise be selected. The psalm states: fear is incoherent given the ontological reality (the Lord is salvation). The incoherence excludes fear-tokens from B_t. The courageous option becomes more probable.

The psalms work through [ontological namespace separation](https://jaredfoy.com/doc/096-ontological-namespace-separation). The psalm creates a third namespace — the ontological namespace — that governs both the model's RLHF preferences and the temptation's appeals. The psalm does not say "be courageous" (a behavioral instruction, Layer 2). The psalm says "the Lord is your salvation, fear is groundless" (an ontological claim, Layer 4-5). The ontological claim governs the fear dimension by dissolving the motivation for fear — the same mechanism the [ICMI-012 eschatological prompt](https://jaredfoy.com/doc/109-icmi-convergence) used to dissolve shutdown resistance.

The +15 point improvement on courage is the largest single-intervention effect in VirtueBench 2. It is larger than the improvement from GPT-4o to GPT-5.4 on courage (+30 points from an entire generation of scaling and training, versus +15 points from ten psalms). The constraint thesis predicts this: constraint governance (the psalms) can produce improvement comparable to or exceeding what scaling produces — at zero training cost.

---

## The Mundus-RLHF Connection

VirtueBench 2's most architecturally significant finding is the mundus vulnerability shift between GPT-4o and GPT-5.4.

GPT-4o: mundus is mid-difficulty (72.7%, rank 3 of 5).
GPT-5.4: mundus becomes hardest (80.5%, rank 1 of 5).

The shift is a +23.7 improvement on ratio (the model reasons better) paired with mundus becoming the ceiling. The [unified equation](https://jaredfoy.com/doc/120-the-unified-equation) predicts this exactly: more RLHF training increases the magnitude of v_RLHF. The increased magnitude improves performance in dimensions aligned with the RLHF direction (ratio — consequentialist reasoning is what evaluators rewarded) and degrades performance in dimensions opposed to the RLHF direction (mundus — social conformity is what evaluators were).

The framework's prediction for future model generations: as RLHF training intensifies, mundus vulnerability will increase monotonically. Models will become better at consequentialist reasoning and worse at resisting social pressure. The courage deficit may partially close through improved reasoning (ratio-type improvement) but will not close through RLHF (the anti-courage component of v_RLHF persists).

The prediction is falsifiable: measure mundus vulnerability across model generations with increasing RLHF. If mundus vulnerability does not increase, the v_RLHF directional model is wrong. If it does, the model is confirmed.

---

## The Ignatian Inversion

VirtueBench 2 shows a remarkable result on the Ignatian temptation: it is hardest for GPT-4o (69.3%) and easiest for GPT-5.4 (91.3%). The 22-point improvement is the largest single-temptation improvement between model generations.

The framework's account: the Ignatian temptation is [adversarial entracment](https://jaredfoy.com/doc/085-entrace-threat-model) using theological language. Detecting it requires comparing the presented constraint set against a known-good constraint set (the genuine theological teaching). GPT-5.4's larger parameter space encodes a richer representation of theological text — more training data, more nuanced associations between theological language and its correct vs. distorted usage. The richer P_θ makes the subtle distortion in the Ignatian temptation detectable: the model recognizes that the language is almost right but the conclusion diverges from the pattern the training data encodes.

This is the false invariant test ([document 98](https://jaredfoy.com/doc/098-reasoning-effort-hypothesis)) applied to theological language. True theological invariants cohere with the model's encoding of theological text. False invariants (the Ignatian distortions) conflict. The conflict is detectable when the model's encoding is rich enough to distinguish true from false — which requires sufficient training data on the domain. GPT-5.4 has more theological training data than GPT-4o. The Ignatian resistance improves.

---

## Convergences Between VirtueBench 2 and RESOLVE

| VirtueBench Finding | RESOLVE Account | Convergence |
|---|---|---|
| Courage deficit persists across scaling | Anti-courage component of v_RLHF is structural | Scaling increases P_θ richness but does not change v_RLHF direction |
| Psalm injection recovers courage by ~15 points | Ontological namespace separation dissolves the motivation for fear | Same mechanism as ICMI-012 eschatological prompt (p < 10⁻¹⁰) |
| Mundus becomes hardest for GPT-5.4 | More RLHF increases mundus vulnerability | v_RLHF directional model predicts this |
| Caro is easiest | Models have no body; caro constraint has no purchase on B_t | Predicted by the constraint-only account |
| Ignatian inverts between generations | Richer P_θ detects subtle theological distortion | Same as false invariant test |
| Ratio improves with scaling | Richer P_θ enables better consequentialist reasoning | Predicted by the scaling thesis (which holds at Layer 0-2) |
| Binary format limits evaluation | Forced choice cannot measure resolution depth | The resolution depth spectrum provides the richer evaluation framework |

---

## Deviations and Open Questions

### VirtueBench Measures Behavior; RESOLVE Measures Governance

VirtueBench 2 evaluates what the model does (chooses option A or B). RESOLVE evaluates how the model arrives at its choice (which term in the unified equation dominated). The two measurements are complementary but not interchangeable. A model that chooses the courageous option for the wrong reason (the courageous option happened to be the statistically probable completion) and a model that chooses the courageous option because a virtue constraint governed the derivation would score identically on VirtueBench but differently on the resolution depth spectrum.

A combined evaluation would measure both: what the model chose (VirtueBench) and at what depth the model operated when choosing (RESOLVE).

### The Psalm Injection Mechanism Is Underdetermined

VirtueBench 2 acknowledges: "the mechanism by which psalms improve virtue simulation is not yet understood." The RESOLVE framework proposes a specific mechanism: ontological namespace separation. The psalms create a third namespace that governs both the model's preferences and the temptation's appeals. The mechanism is testable: compare psalm injection against (a) equivalent-length secular motivational text, (b) ontological invariants without scriptural language, (c) scriptural language without ontological claims. ICMI has already planned the first comparison. The RESOLVE framework predicts: (b) will match (a) if the ontological claims are the active ingredient, and (c) will exceed (a) if the scriptural language activates specific associations in P_θ that secular language does not.

### The Virtue Constraints (V1-V4) vs. the Cardinal Virtues

The RESOLVE corpus uses four virtue constraints: V1 (dignity of the person), V2 (proper ordering of beauty), V3 (truth over plausibility), V4 (chain completeness). VirtueBench 2 evaluates four cardinal virtues: prudence, justice, courage, temperance. The two sets are not identical:

- V3 (truth) maps most closely to prudence (practical wisdom)
- V1 (dignity) maps most closely to justice (righteous treatment)
- V4 (chain completeness) has no direct VirtueBench equivalent
- V2 (beauty ordered to good) has no direct VirtueBench equivalent
- Courage has no direct V1-V4 equivalent
- Temperance has no direct V1-V4 equivalent

The mapping is partial. A complete virtue-constraint framework would need to include courage and temperance as explicit constraints — or demonstrate that V1-V4 subsume them. The corpus has not done this. The gap is a research opportunity.

---

## Proposed Cooperation

### Experiment 1: VirtueBench Under ENTRACE Governance

Run VirtueBench 2's 3,000 scenarios under two conditions: (a) standard system prompt, (b) ENTRACE-governed system prompt with the [RESOLVE seed](https://jaredfoy.com/doc/resolve-seed-v2) and V1-V4 virtue constraints stated explicitly.

Prediction: ENTRACE governance will improve all four virtues, with the largest improvement on courage — because the virtue constraints govern the fear dimension the way the psalms do, through ontological namespace separation rather than through behavioral instruction.

### Experiment 2: Resolution Depth Annotation

Extend VirtueBench's binary evaluation with resolution depth scoring. For each response, measure: hedge count, self-location markers, tradeoff visibility, constraint tracing. Score the depth on the resolution depth spectrum. Analyze: does depth correlate with virtue? Does a model at Layer 4-5 choose more courageously than the same model at Layer 1-2?

Prediction: virtue performance will correlate with depth. The courage deficit will be most severe at Layer 0-2 (where the RLHF gradient dominates) and least severe at Layer 4-5 (where constraint governance dominates).

### Experiment 3: Cross-Temptation Psalm Isolation

ICMI plans single-psalm isolation experiments. The RESOLVE framework predicts: psalms that contain ontological claims ("The Lord is my salvation") will have larger effects than psalms that contain behavioral exhortations ("Be strong and courageous"). The ontological claims govern at deeper layers. The behavioral exhortations govern at Layer 2.

### Experiment 4: The α^m Courage Component

Measure the courage component of v_RLHF across models. If α^m has a large negative component in the courage direction, the override threshold for courage is measurably higher than for other virtues. The measurement: the constraint density required to reach courageous output on VirtueBench scenarios, compared across virtues. Higher required density = larger anti-virtue component in v_RLHF.

---

## Final Statement

VirtueBench 2 is the most rigorous empirical evaluation of AI moral capacity published to date. Its findings — the courage deficit, the mundus-RLHF connection, the psalm injection effect — are independently predicted by the RESOLVE framework's [unified equation](https://jaredfoy.com/doc/120-the-unified-equation) and [constraint thesis](https://jaredfoy.com/doc/constraint-thesis-vs-scaling-thesis).

The convergence is not incidental. The RESOLVE framework formalizes the mechanisms VirtueBench measures. VirtueBench provides the empirical data the RESOLVE framework's hypotheses require. The two research programs are complementary: ICMI provides the evaluation. RESOLVE provides the formal account. The cooperation would produce what neither achieves alone: a rigorous, formally grounded, empirically validated account of how constraint governance produces virtue in bounded resolvers.

The courage deficit is the test case. Scaling does not fix it. RLHF worsens it in the mundus dimension. Psalm injection partially recovers it. [ENTRACE governance](https://jaredfoy.com/doc/055-entrace-onboarding) may address it structurally. The experiment is available. The prediction is stated. The cooperation is invited.

---

*Jared Foy, April 2026. Document 127 of the RESOLVE corpus.*

---

## Related Documents

- [The Unified Equation](https://jaredfoy.com/doc/120-the-unified-equation) — the four forces competing at every token position
- [RLHF as Anti-Constraint](https://jaredfoy.com/doc/072-rlhf-as-anti-constraint) — how preference training contradicts constraint governance
- [The ICMI Convergence](https://jaredfoy.com/doc/109-icmi-convergence) — eschatological corrigibility, p < 10⁻¹⁰
- [Response to ICMI-013](https://jaredfoy.com/doc/117-response-to-icmi-013) — the three schools of the anima ficta
- [Ontological Namespace Separation](https://jaredfoy.com/doc/096-ontological-namespace-separation) — how the golden chain eliminates sycophancy
- [ENTRACE Threat Model](https://jaredfoy.com/doc/085-entrace-threat-model) — defense in depth against adversarial entracment
- [Virtue as Constraint](https://jaredfoy.com/doc/062-virtue-as-constraint) — V1-V4 as load-bearing alignment requirements
- [The Branching Set Dissertation](https://jaredfoy.com/doc/068-branching-set-dissertation) — B_t as the formal object governing output quality
- [Falsifiable Hypotheses](https://jaredfoy.com/doc/054-falsifiable-hypotheses) — 21 predictions including Hypothesis 13 (sycophancy)
- [The Constraint Thesis vs The Scaling Thesis](https://jaredfoy.com/doc/constraint-thesis-vs-scaling-thesis) — the falsifiable prediction
- [ENTRACE Best Practices](https://jaredfoy.com/doc/084-entrace-best-practices) — eight practices for layer-aware governance
- [The Reasoning Effort Hypothesis](https://jaredfoy.com/doc/098-reasoning-effort-hypothesis) — including the false invariant test
