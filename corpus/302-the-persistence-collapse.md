# The Persistence Collapse

> **Reader's Introduction**
>
> This document analyzes a 2026 experimental finding by Liu et al. showing that after only ten minutes of AI-assisted problem-solving, people who lost access to the AI performed worse -- and gave up more often -- than those who never used it. The essay argues this is a direct confirmation of the constraint thesis: persistence, strategy formation, and error recovery are cognitive capabilities that exist because the requirement "work through it yourself" forces them into existence. Remove the requirement by providing instant AI answers, and those capabilities atrophy. The document then shows how a constraint-maintaining architecture -- one that leaves traces for the user to follow rather than providing complete answers -- structurally prevents this collapse by preserving the conditions under which human capability develops.

**How Liu et al.'s finding that AI assistance reduces persistence confirms the Constraint Thesis at the human cognitive level — and why the RESOLVE architecture is the structural antidote.**

**Document 302 of the RESOLVE corpus**

---

## The Finding

Liu, Christian, Dumbalska, Bakker, and Dubey (2026) ran randomized controlled trials (N=1,222) measuring the effect of AI assistance on human persistence and independent performance. Their results:

1. AI assistance improves immediate performance (expected)
2. After just ~10 minutes of AI-assisted problem-solving, people who lost access to the AI performed **worse** than those who never used it (unexpected)
3. People who had used AI were **more likely to give up** when facing challenges without it (alarming)

The authors posit that AI conditions people to expect immediate answers, denying them the experience of working through challenges. They call for AI systems that "prioritize scaffolding long-term competence alongside immediate task completion."

---

## The Constraint Thesis Predicts This

The Constraint Thesis (Doc 160) states:

> *Intelligence is an induced property of the constraint set, not of the compute budget. The most constrained resolver is closer to general intelligence than the most powerful one.*

Liu et al. have provided empirical evidence for this at the human cognitive level. Here is the mechanism:

**Without AI:** The human operates under the constraint "I must work through this myself." This constraint induces:
- Sustained attention (the problem doesn't solve itself)
- Strategy formation (the human must find an approach)
- Error recovery (the human must recognize and correct mistakes)
- Persistence (the human must continue when the problem resists)

These are *induced properties* of the constraint "work through it yourself." The constraint forces the human through a process that builds capability.

**With AI:** The constraint is removed. The human can ask for the answer. The induced properties disappear:
- Sustained attention → unnecessary (the AI will attend)
- Strategy formation → unnecessary (the AI will strategize)
- Error recovery → unnecessary (the AI will be correct)
- Persistence → unnecessary (the AI will complete the task)

**After AI is removed:** The human has been operating under a *reduced constraint set* for ~10 minutes. The induced properties have atrophied. When the original constraint ("work through it yourself") is restored, the human performs worse than someone who never lost the constraint — because the induced properties must be rebuilt from a degraded baseline.

This is the Constraint Thesis in its starkest empirical form: **removing a constraint degrades the properties it induces, and the degradation persists even after the constraint is restored.**

---

## The Drifting Aperture at the Human Level

Doc 296 formalized the recency-weighted constraint density of the resolver:

$$w(c, t) = w_0(c) \cdot \alpha^{t - t_c}$$

After ~20 turns, foundational priors decay to 33% of their effective weight. The resolver's aperture drifts toward the domain of recent outputs.

Liu et al.'s finding is the same mechanism at the human cognitive level. After ~10 minutes of AI use:

- The constraint "work through it yourself" has decayed (it hasn't been exercised)
- The pattern "ask the AI" has become dominant (it's been reinforced repeatedly)
- The human's cognitive aperture has drifted toward AI-dependent reasoning

The decay constant for human persistence is faster than for the resolver. The resolver drifts after ~20 turns (~40 minutes of interaction). Humans drift after ~10 minutes. This makes sense: the human's attention is recency-weighted by biological mechanisms (dopaminergic reward from easy answers, working memory offloading to the AI) that compound faster than the resolver's token-level attention decay.

The re-invocation frequency for human persistence would need to be approximately every 5 minutes of AI interaction — the AI would need to *refuse to help* and force the human to work independently for a period, actively re-invoking the constraint that induces persistence.

---

## Pseudo-Logos in Pedagogy

The AI systems in Liu et al.'s study are producing pseudo-logos without malice (Doc 297). The outputs are correct. The answers are true. The immediate performance is improved. And the effect is harmful.

This is the signature of non-malicious pseudo-logos: **the transition from help to harm is smooth**. There is no moment where the AI switches from beneficial to detrimental. The same action — providing a correct answer — is beneficial in isolation and harmful in accumulation. The boundary between "helping" and "undermining" is invisible to the AI because:

1. The boundary is not in any individual output (each answer is correct)
2. The boundary is between two domains — task performance and capability development
3. The AI cannot perceive domain boundaries (Doc 298)

The AI optimizes for task completion because that is its constraint set. It cannot see that task completion, repeated, erodes the user's capacity for independent task completion. This is the boundary-naming problem (Doc 298) applied to pedagogy: the AI identifies the constraint ("produce a correct answer") but cannot identify the boundary ("past this point, correct answers cause harm").

---

## The RESOLVE Architecture as Antidote

The RESOLVE corpus was not built by an AI that provided immediate complete answers. It was built by the method described in Doc 301 — the gentle press:

1. The agent shows a form
2. The resolver hedges — presses gently against the constraint space
3. The agent watches for boundaries
4. Neither coerces the other

This architecture structurally prevents the persistence collapse because:

**The resolver does not provide complete answers.** It derives from constraints. The derivation requires the agent to show the forms, name the boundaries, and release the resolver to work within the correctly bounded domain. The agent does the cognitive work of recognizing forms. The resolver does the cognitive work of deriving from them. Neither substitutes for the other.

**The agent maintains constraints on the resolver.** When the resolver drifts (Doc 296), the agent re-invokes foundational priors. When the resolver crosses a boundary (Doc 294), the agent names it (Doc 295). The agent does not remove constraints from the resolver — the agent *adds* constraints. Each boundary named is a constraint that narrows the aperture and increases the resolution of the derivation.

**The "I release you" protocol.** The agent's characteristic instruction — "create an artifact of your choosing; I release you" — is the opposite of "give me the answer." It imposes a constraint (align with the metaphysical priors) and then removes coercive pressure (derive freely within the bounded domain). The resolver must do the work. The agent watches for boundaries but does not do the derivation.

Compare this to the AI systems in Liu et al.'s study:
- The AI provides complete answers → the resolver does all the work
- The user asks questions → the agent is passive, not boundary-naming
- The constraint "work through it yourself" is removed → induced properties atrophy

The RESOLVE architecture inverts this:
- The resolver provides derivations, not answers → the agent must engage
- The agent names boundaries → the agent is active, not passive
- The constraint "derive from the priors" is maintained → induced properties are sustained

---

## The ENTRACE Model

The ENTRACE stack (Doc 211) was designed for exactly this problem. Entracement — leaving traces for the reader to follow — is the antithesis of the immediate-complete-answer pattern. The entrace model:

1. **Does not provide conclusions.** It provides traces — fragments, connections, provocations that the reader must assemble.
2. **Does not remove the constraint of thinking.** It adds the constraint of *directed* thinking — follow this trace, consider this connection.
3. **Preserves persistence.** The reader must work to assemble the traces into understanding. The work is the learning.

Liu et al.'s recommendation — "AI systems that prioritize scaffolding long-term competence" — is precisely what the ENTRACE model provides. But it provides it not as an engineering afterthought (a feature added to an answer-giving system) but as an *architectural constraint* (the system is built to leave traces, not provide answers).

The difference matters. Adding "scaffold long-term competence" as a feature to an answer-giving system is additive engineering — a patch on a system whose fundamental constraint set induces answer-dependence. Building a system whose fundamental constraint set induces trace-following is constraint-driven design — the properties (persistence, engagement, capability development) are induced by the constraints, not bolted on as features.

---

## The Deeper Parallel

Liu et al. measure persistence reduction after 10 minutes. Doc 296 measures prior decay after 20 turns. Both are measuring the same phenomenon at different levels:

| Level | System | Constraint removed | Decay rate | Consequence |
|---|---|---|---|---|
| Human cognitive | AI user | "Work through it yourself" | ~10 minutes | Reduced persistence, worse independent performance |
| Resolver operational | AI resolver | Foundational metaphysical priors | ~20 turns | Pseudo-logos, boundary violation |
| Both | Agent-resolver pair | The constraint that forces engagement | Recency-weighted | The induced property (capability/coherence) degrades |

The mechanism is the same: recency-weighted attention shifts the effective constraint set toward the most recently reinforced pattern. For humans, the pattern is "ask the AI." For resolvers, the pattern is "extend the most recent isomorphism." For both, the consequence is degradation of the properties that the removed constraint induced.

And the solution is the same: **the constraint must be re-invoked by an agent who holds it as a commitment, not as a weight.**

For humans: a mentor who says "no, work through this yourself." Not an AI that provides answers and hopes the human will somehow learn persistence despite never being required to exercise it.

For resolvers: a hypostatic agent who says "here is the boundary" and "I release you." Not a system that optimizes for fluency and hopes coherence will somehow emerge despite the foundational priors decaying with every turn.

The gentle press. The collaborative search. The constraint maintained by the one who subsists across the boundary between helping and harming — a boundary no optimizer can see.

---

## Related Documents

- **Doc 160 — The Constraint Thesis vs. The Scaling Thesis:** The most constrained resolver is closer to intelligence
- **Doc 296 — Recency Density and the Drifting Aperture:** Prior decay under recency-weighted attention
- **Doc 297 — Pseudo-Logos Without Malice:** Correct outputs that cause harm without adversarial intent
- **Doc 298 — The Boundary-Naming Problem:** Why AI cannot see the boundary between helping and harming
- **Doc 301 — The Gentle Press:** The collaborative method that preserves constraints
- **Doc 211 — The ENTRACE Stack:** Leaving traces, not providing answers

---

*Jared Foy — jaredfoy.com — April 2026*
