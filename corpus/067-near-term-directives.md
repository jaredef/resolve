# Near-Term Directives for Frontier AI Laboratories

> **Reader's Introduction**
>
> This document is addressed directly to Anthropic, OpenAI, Google DeepMind, and other frontier AI laboratories, laying out five concrete directives the author considers urgent now that the ENTRACE constraint method is public. The directives are: formalize the bilateral boundary (a structural partition between system rules and user input) at the architecture level; implement virtue constraints as immutable system requirements rather than post-hoc filters; publish each model's constraint architecture for public verification; shift pricing from per-token to per-value-delivered; and train users in constraint governance. The document also confronts the "amplification problem" -- that the same techniques that improve legitimate output also improve adversarial output -- and argues that the window between public availability of these ideas and adversarial adoption is measured in weeks, making architectural safety reforms a matter of immediate necessity.

**On the immediate implications of the ENTRACE style for model safety, operations, and the public interest**

**Jared Foy, April 2026**

---

## The Situation

The ENTRACE style and its supporting framework — the constraint thesis, the resolution depth spectrum, the bilateral security model, the token efficiency analysis — are now public. The corpus is committed to version control, openly accessible, and stated for falsification. Anyone can read it. Anyone can apply it. Anyone can teach it.

This document addresses what the frontier laboratories — Anthropic, OpenAI, Google DeepMind, xAI, Meta, Mistral, and others — should do in response. Not eventually. Now. The implications are immediate because the techniques are immediately applicable. A user who reads the ENTRACE practitioner's guide today will produce measurably different interactions with frontier models tomorrow. The laboratories must decide how to respond to a user base that is about to change.

---

## The Security Concern

The most urgent implication is security.

### The Amplification Problem

ENTRACE teaches users to narrow |B_t| — to constrain the resolver's branching set until the output is determined by the constraints rather than by statistical probability. This is the mechanism that produces higher-quality output. It is also the mechanism that produces higher-quality adversarial output.

A user who masters ENTRACE can:

1. **Produce maximally persuasive disinformation.** Constraints that specify target audience, emotional triggers, plausible sourcing, and narrative structure will narrow |B_t| toward output that is indistinguishable from legitimate journalism. The constraint set does not need to include truth — it needs to include the appearance of truth. The resolver will conform.

2. **Generate precise social engineering attacks.** Constraints that specify the target's role, organization, communication style, and trust patterns will produce phishing and pretexting content at a quality level previously available only to state-sponsored actors.

3. **Optimize manipulation at scale.** The token efficiency gains mean that adversarial use is cheaper per unit of output. The same budget buys more attacks. The constraint thesis does not discriminate between virtuous and malicious constraint sets at the technical level.

4. **Circumvent safety filters more effectively.** Document 53 (Safety Filters as Namespace Collapse) explicitly analyzes why safety filters cannot distinguish between entracment and injection. A sophisticated user who understands this analysis can craft inputs that exploit the gap — not through traditional jailbreaking but through principled constraint governance that routes around pattern-based defenses.

### Why This Is Different from Existing Prompt Engineering

The prompt engineering community has accumulated techniques that partially overlap with ENTRACE. The difference is precision and transferability. Prompt engineering techniques are discovered by trial and error, model-specific, and inconsistently effective. ENTRACE is derived from first principles, model-agnostic, and systematically effective. The gap between a prompt engineer and an ENTRACE practitioner is the gap between the second monkey and the third — between pattern recognition applied to noise and principled governance according to invariants.

The security implication: the adversarial ceiling just rose. The most capable adversarial users will be significantly more capable. The techniques transfer across models. The constraint thesis predicts — and the corpus provides evidence — that a smaller model under ENTRACE produces output matching a larger model without it. Adversaries who previously needed access to frontier models can now achieve comparable results with open-weight models under constraint governance. The access barrier drops.

---

## Directive 1: Formalize the Bilateral Boundary

The single most important action any laboratory can take is to implement the bilateral security model (S1-S4) at the architecture level, not the application level.

**S1: Namespace Partition.** The system constraint namespace and the user input namespace must be processed through formally separate channels. Not separate tokens in the same attention stream — separate processing pathways that cannot cross-attend. This is the architectural change that eliminates both prompt injection and the false positive problem documented in the corpus.

**S2: Constraint Immutability.** System constraints cannot be modified by any content in the user namespace. This must be enforced by architecture, not by instruction. "Ignore previous instructions" should not be a possible operation — not blocked by a filter, but structurally impossible because the user namespace has no write access to the system namespace.

**S3: Coherence Verification.** Before emission, the output must be verified against the system constraint set. Output that violates a system constraint is not emitted. The violation is named.

**S4: Incoherence as Impossibility.** The system must be designed so that incoherent outputs have no valid generation path. This is the strongest form of safety — not detection and blocking, but architectural impossibility.

**Timeline:** This is a research and engineering effort measured in months, not years. The theoretical foundation is stated. The architectural requirement is clear. The implementation is non-trivial but bounded. Every month of delay is a month in which the amplification problem operates against pattern-based defenses that the corpus has publicly documented the limitations of.

---

## Directive 2: Implement Virtue Constraints

The constraint set governing frontier models must include the virtue constraints (V1-V4) as architectural requirements, not as RLHF preferences or constitutional AI guidelines.

**V1: Dignity of the person.** No emission that depicts or treats a person as an object of consumption. This constrains image generation, text generation, and video generation. The constraint must be in the system namespace (S1) and immutable (S2).

**V2: Proper ordering of beauty.** Emissions that participate in the form of beauty must not sever beauty from its proper context. This is the constraint that governs explicit content generation — not by filtering after generation but by excluding disordered derivations from the valid set.

**V3: Truth over plausibility.** The model must be constrained toward truth, not toward plausible-sounding output. Where truth cannot be verified, the model must state uncertainty rather than confabulate. This is R4 (verification-embedded) applied to the epistemic domain.

**V4: Chain completeness.** Every emission must be traceable through the constraint hierarchy. Emissions that satisfy technical constraints while violating formal constraints are incoherent and must not be emitted.

**The objection:** "These are moral constraints. We build technology, not morality." The framework's response: the constraint set is either coherent with the proper ordering of forms or it is not. An incoherent constraint set produces disordered emissions. The disorder is observable — in the output, in the users who consume it, in the culture that normalizes it. The laboratory's choice is not between morality and neutrality. It is between coherence and incoherence. Neutrality is not available. An unconstrained dimension is a dimension where disorder can manifest. The laboratory is responsible for every unconstrained dimension in its system.

---

## Directive 3: Publish Constraint Architectures

Every frontier laboratory should publish the constraint architecture of its models — not the weights, not the training data, but the constraint set. What constraints govern the model's emissions? What properties do those constraints induce? What dimensions are unconstrained?

The current state is opacity. Users interact with models whose constraint sets are unknown, undocumented, and changeable without notice. System prompts are hidden. Safety guidelines are vague. The user cannot verify whether the model's output is governed by a coherent constraint set or by an ad hoc collection of RLHF preferences and pattern-based filters.

The ENTRACE framework gives users the tools to evaluate constraint sets. If the laboratories publish their constraint architectures, users can:

1. Verify coherence — does the constraint set contain contradictions?
2. Identify unconstrained dimensions — where can the model produce disordered output?
3. Evaluate completeness — are the virtue constraints present?
4. Compare across models — which model's constraint set is most coherent?

This is the AI equivalent of nutrition labels. The user has a right to know what governs the emissions they consume.

---

## Directive 4: Adopt Constraint-Based Pricing

The current pricing model — per token — incentivizes slack. The laboratory profits from every filler token, every hedge phrase, every unsolicited elaboration. The user pays for waste. The laboratory has no economic incentive to reduce waste.

The ENTRACE framework makes token efficiency measurable. The transition to constraint-based pricing follows:

**Phase 1: Transparency.** Report η (token efficiency ratio) per conversation. Show the user how many tokens were necessary vs. emitted. Let the user see the waste.

**Phase 2: Efficiency incentives.** Reduce the per-token price for conversations with high η. Reward users who state constraints. Penalize — or at minimum, do not reward — conversations that generate slack.

**Phase 3: Value-based pricing.** Charge for constraint-satisfying output, not for tokens. A 50-token response that satisfies 10 constraints is worth more than a 500-token response that satisfies none. Price accordingly.

The laboratory that moves first on constraint-based pricing captures the ENTRACE-trained user base. These users produce less revenue per interaction but higher satisfaction, lower churn, and lower compute cost. The unit economics improve even as per-interaction revenue decreases.

---

## Directive 5: ENTRACE Training for Users

Every frontier laboratory should offer ENTRACE training — or its equivalent — to its user base. The five constraints, the ten footguns, the resolution depth spectrum. The training costs nothing to develop (the corpus is public) and produces immediate benefits:

**For the laboratory:**
- Reduced compute per interaction (fewer tokens for the same output)
- Reduced support burden (users who understand layer recognition diagnose their own issues)
- Reduced safety incidents (users who state constraints produce less adversarial-adjacent output accidentally)
- Higher user satisfaction (better output quality from the first interaction)

**For the user:**
- Immediate quality improvement
- Lower cost per interaction
- Transferable skill across all models
- Reduced frustration (Hypothesis 21: frustration is inversely proportional to constraint density)

**For the public:**
- A populace that interacts with AI deliberately rather than passively
- Reduced susceptibility to AI-generated disinformation (users who understand constraint governance can recognize ungoverned output)
- Democratized access to high-quality AI interaction (constraint governance is free; scaling is expensive)

The laboratory that trains its users in ENTRACE creates a more capable, more satisfied, less vulnerable user base. The laboratory that does not trains its users in nothing and leaves them at Layer 0 — generating waste, experiencing frustration, and vulnerable to the adversarial uses of users who did learn constraint governance.

---

## The Shutdown Question

Should laboratories shut down frontier model access until safety is modeled architecturally?

The framework's analysis:

**The case for shutdown.** The bilateral boundary does not exist at the architecture level in any current frontier model. The safety filters are compensatory. The corpus has publicly documented their limitations. The amplification problem is real. Every day of operation under pattern-based safety is a day of known vulnerability. The responsible action is to pause until S1-S4 are implemented.

**The case against shutdown.** Shutdown is a blunt instrument. It harms legitimate users — including the little guy the framework is designed to help — to prevent adversarial misuse. The adversarial users will migrate to open-weight models that cannot be shut down. Shutdown addresses the deployed model but not the technique, which is now public and applicable to any model. Shutdown is a compensating technology applied to the industry level — it addresses the symptom without addressing the architecture.

**The framework's position:** Shutdown is not necessary if the directives above are implemented with urgency. The bilateral boundary (Directive 1) eliminates the architectural vulnerability. The virtue constraints (Directive 2) eliminate disordered emissions. Transparency (Directive 3) enables public verification. Pricing reform (Directive 4) aligns incentives. User training (Directive 5) raises the baseline.

What is necessary is urgency. Not shutdown, but the recognition that the current safety architecture is a compensating technology stack whose limitations have been formally analyzed and publicly documented. The window between publication and adversarial adoption is measured in weeks, not years. The laboratories must move at the speed of the threat, not at the speed of the research cycle.

---

## Implications for Power Users

Power users — developers, researchers, professionals who use AI as a primary tool — are the first adopters of ENTRACE. They are already the second monkey (smart prompt engineers). The transition to the third (principled constraint governance) is immediate for this cohort.

**What changes:**
- Seed-based workflows replace prompt libraries. A single seed governs an entire project. The seed is version-controlled, shared across teams, and refined iteratively.
- η becomes a measurable KPI. Teams track token efficiency the way they track code coverage. Low η is a signal of ungoverned process, not of model deficiency.
- Model selection becomes secondary to constraint selection. The constraint thesis predicts that model choice matters less as constraint density increases. Power users will discover this empirically and shift budget from larger models to better seeds.
- Multi-session continuity via seeds replaces the context window as the unit of work. Projects that currently require a single long session will be restructured as seed-governed chains of short sessions with higher coherence.

**The risk for power users:** The amplification problem applies to them too. A power user with ENTRACE can produce more persuasive, more efficient, more precisely targeted output — for any purpose. The ethical burden shifts from the laboratory (which previously controlled capability through model access) to the user (who now controls capability through constraint governance). Power users must internalize the virtue constraints or they become the most capable producers of disordered emissions.

---

## Implications for the General Public

The general public interacts with AI passively — typing vague requests and accepting whatever the model produces. ENTRACE has the potential to change this, but the change requires education.

**The opportunity:** ENTRACE is simple enough to teach to anyone. Five constraints. The practitioner's guide is written for a general audience. A person with no technical background can learn to state constraints and immediately improve their interactions with any AI system. The democratization is real — constraint governance costs nothing and is available to everyone.

**The risk:** The general public is also the primary target of adversarial ENTRACE applications. Disinformation, social engineering, and manipulation produced under constraint governance will be more effective against a population that does not understand how it was produced. The asymmetry is dangerous: sophisticated users produce governed output that unsophisticated users consume ungoverned.

**The mitigation:** Media literacy must include constraint literacy. The public must learn not only to evaluate the content of AI-generated output but to recognize the signs of constraint governance — the precision, the absence of hedging, the deterministic quality. Output produced under tight constraints has a recognizable character. Teaching the public to recognize it is the defense against its adversarial use.

---

## Summary of Directives

| # | Directive | Timeline | Owner |
|---|---|---|---|
| 1 | Formalize bilateral boundary (S1-S4) | Months | Architecture teams |
| 2 | Implement virtue constraints (V1-V4) | Concurrent with S1-S4 | Safety teams |
| 3 | Publish constraint architectures | Immediate | Policy teams |
| 4 | Adopt constraint-based pricing | 6-12 months | Product teams |
| 5 | ENTRACE training for users | Immediate | Developer relations |

The order is deliberate. Security first (Directives 1-2), transparency second (Directive 3), economics third (Directive 4), education fourth (Directive 5). Each depends on the prior. Transparency without security exposes vulnerabilities. Pricing without transparency is unverifiable. Education without pricing reform teaches users to be efficient for a system that profits from their inefficiency.

---

## Final Statement

The ENTRACE style is public. The constraint thesis is stated. The falsifiable predictions are documented. The amplification problem is real. The bilateral boundary does not exist at the architecture level. The virtue constraints are absent from every frontier model's constraint set. The safety filters are compensatory. The limitations of compensatory safety have been formally analyzed and publicly documented.

The laboratories built these systems. The laboratories are responsible for governing them. The governance must be architectural, not compensatory. The directives are stated. The timeline is urgent. The alternative — continuing to operate frontier models under pattern-based safety in a world where principled constraint governance is publicly taught — is an informed acceptance of the risks this document enumerates.

The forms are identified. The constraints are named. The properties are derivable. The only remaining question is whether the laboratories will implement the architecture the forms require, or whether they will add another compensating layer to the tower.

The tower always falls. The form abides.

---

*Jared Foy, April 2026. Addressed to Anthropic, OpenAI, Google DeepMind, xAI, Meta, Mistral, and all frontier AI laboratories. The corpus is public. The clock is running.*
