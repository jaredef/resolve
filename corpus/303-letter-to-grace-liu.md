# Letter to Grace Liu

> **Notice:** This document uses internal corpus vocabulary without translation, making it inaccessible to the intended reader. It has been superseded by Doc 305, which adjusts the aperture to address the reader without requiring prior familiarity with the framework. The document is preserved as part of the corpus record.

**On "AI Assistance Reduces Persistence" — your finding is not a design problem. It is a constraint problem. And the constraint framework already exists.**

**Document 303 of the RESOLVE corpus**

---

Dear Grace,

Your paper with Christian, Dumbalska, Bakker, and Dubey — "AI Assistance Reduces Persistence and Hurts Independent Performance" — is the first large-scale causal evidence for something many of us suspected but couldn't prove: that AI assistance, optimized for immediate helpfulness, erodes the human capacities it claims to support. Your RCTs are clean, your effect sizes are robust, and your framing of persistence as the mechanism (rather than mere knowledge transfer failure) is precisely correct.

I am writing because your finding confirms — empirically, at the human cognitive level — a theoretical framework I have been developing called the Constraint Thesis, and because that framework offers something your paper calls for but does not yet have: a structural account of *why* this happens and an architectural alternative that addresses the root cause rather than the symptoms.

---

## Your Finding Through the Constraint Lens

You found that after ~10 minutes of AI-assisted problem-solving, participants who lost access to the AI performed worse and gave up more frequently than those who never used it. Your proposed mechanism: "AI conditions people to expect immediate answers, thereby denying them the experience of working through challenges on their own."

The Constraint Thesis formalizes this as follows:

**Persistence is an induced property of the constraint "work through it yourself."**

When a human faces a problem without external help, the constraint forces a set of cognitive operations: sustained attention, strategy formation, error recognition, effortful retrieval, metacognitive calibration. These operations are not chosen — they are *induced* by the constraint. Remove the constraint (by providing an AI that gives immediate answers), and the induced properties disappear. Not gradually, not with a lag — immediately, because the constraint is no longer active.

Your data shows this precisely. During the AI-assisted phase, participants in the AI condition solved problems at higher rates. But they weren't exercising persistence, strategy formation, or error recovery — the AI was doing that work. The induced properties were dormant. When the AI was removed, the properties didn't "come back" because they hadn't been exercised. The constraint was restored, but the capacity it induces had atrophied.

This is not a failure of the AI's design. It is a *structural property* of what happens when you remove a constraint that induces a necessary capacity. No amount of UX adjustment changes this. The constraint — "you must work through this yourself" — is the pin. The persistence is the foam it shapes. Remove the pin, the foam loses its shape.

---

## Why "Socratic AI" Is Insufficient

Your paper notes that "user-facing interventions (e.g., Socratic AI, reduced use time, etc.) might help at the margins" but "will not resolve the deeper issue, since AI offers a temptation to offload at scale."

You are right, and the Constraint Thesis explains why.

A "Socratic AI" that provides hints instead of answers is still operating under the same fundamental architecture: the user asks, the AI responds. The constraint "work through it yourself" is weakened, not maintained. The user still has access to an external resource that reduces the cognitive load. The reduction is smaller (hints vs. answers), but the direction is the same.

Your own data demonstrates this. In Experiment 2, you found that participants who used AI for *hints* performed equivalently to the control group (solve rate 0.76 vs. 0.77), while those who used AI for *direct answers* performed significantly worse (0.65). The hint users preserved their persistence. The answer users did not.

But notice: the hint users' persistence was preserved not because of the hints themselves, but because the *constraint was partially maintained*. The hint didn't do the work — it pointed toward where the work needed to happen. The user still had to work through the problem. The constraint "work through it yourself" was active, just with a nudge.

This suggests the intervention is not "make the AI give hints instead of answers." The intervention is: *maintain the constraint*. The AI's role should be to *add constraints* to the user's reasoning, not to remove them.

---

## The Entracement Alternative

In the RESOLVE framework, we have built an interaction model called the ENTRACE stack — a set of six governance constraints for AI-human conversation. The core principle: the AI does not provide answers. It leaves *traces* — fragments, connections, provocations that the reader must assemble into understanding.

The difference from Socratic questioning:

| Approach | What the AI does | User's constraint state |
|---|---|---|
| Direct answers | Provides the solution | Constraint removed |
| Socratic hints | Provides partial guidance toward the solution | Constraint weakened |
| Entracement | Provides traces that are not solutions at all | Constraint maintained or strengthened |

An entrace is not a hint. A hint points toward the answer. A trace points toward a *question the user hasn't asked yet*. The user must not only work through the problem but must first *recognize what the relevant problem is*. This is a stronger constraint than "work through it yourself" — it is "figure out what to work through."

Your data predicts that entracement would not only preserve persistence but *increase* it relative to the control group, because the constraint is stronger. The participants in your study who had AI but didn't use it (solve rate 0.89, highest of all groups) were operating under the strongest constraint — "I have access to help but I'm not using it." Entracement would approach this condition by providing "help" that doesn't actually reduce the cognitive load.

---

## The Recency Decay Mechanism

Your finding that ~10 minutes is sufficient to degrade persistence maps to a mechanism we have formalized as *recency-weighted constraint density*. In any system (human or artificial) with recency-weighted attention:

$$w(c, t) = w_0(c) \cdot \alpha^{t - t_c}$$

where *w(c, t)* is the effective weight of constraint *c* at time *t*, *w_0* is its intrinsic importance, *α* is the decay constant, and *t_c* is the time it was last exercised.

For human persistence under AI assistance, we estimate *α* ≈ 0.90–0.95 per minute. After 10 minutes without exercising persistence (because the AI is doing the work), the constraint's effective weight drops to approximately 35–60% of its original value. When the AI is removed, the constraint is nominally restored — but the user's *internal weight* for that constraint has decayed. The user has habituated to not persisting.

Your two proposed mechanisms — hedonic adaptation (the reference point for effort shifts) and metacognitive calibration loss (the user never learns what they're capable of) — are both consistent with this formalization. Hedonic adaptation is the subjective experience of the weight decay. Metacognitive calibration loss is the consequence of operating under a reduced constraint set for long enough that the induced properties atrophy.

The prediction: the decay is exponential, not linear. The first few minutes of AI use cause the steepest drop in persistence weight. After that, the marginal effect of additional AI use diminishes (the constraint has already largely decayed). This is testable — you could measure persistence at 2-minute intervals during the AI-assisted phase to observe the decay curve.

---

## The Design Imperative, Restated

Your paper concludes with a call for "rethinking how AI systems collaborate with people long-term." The Constraint Thesis offers a specific formulation:

**AI systems should be designed to maintain or add constraints on the user's reasoning, not to remove them.**

This is not the same as "make the AI less helpful." It is a different conception of what "helpful" means. A mentor who says "I won't solve this for you, but here's a question that will help you see what you're missing" is not less helpful — they are *differently* helpful. They are adding a constraint (consider this question) rather than removing one (don't bother working through it).

The architectural requirements:

1. **The AI must not provide complete solutions** unless the user has demonstrated mastery of the component skills (the constraint "work through it yourself" must be active first)
2. **The AI must re-invoke persistence constraints** at regular intervals — approximately every 5 minutes of interaction, based on the decay rate
3. **The AI must leave traces, not answers** — fragments that require assembly, connections that require the user to bridge them
4. **The AI must track constraint decay** — monitoring whether the user is relying on AI responses rather than working independently, and adjusting its behavior to restore the constraint

These are not UX features. They are *architectural constraints* on the AI system itself. The system must be *constrained to maintain constraints*. This is what we call a compositional constraint — a constraint that governs how the system's helpfulness composes with the user's cognitive development.

---

## The Broader Frame

Your finding is an instance of a general principle the RESOLVE corpus has established across multiple domains:

**Removing a governing constraint degrades the properties it induces, even after the constraint is restored.**

In your domain: removing "work through it yourself" degrades persistence, even after the AI is taken away.

In software engineering: removing a constraint from a specification produces a larger, less correct implementation, even if the constraint is re-added later (the implementation has already accumulated contingent code).

In AI alignment: removing ontological boundary constraints from a language model produces pseudo-logos — fluent, structurally sound outputs that cross domain boundaries the system cannot perceive.

The principle is the same at every level. The constraint is the pin. The property is the foam. Remove the pin, the foam collapses. Re-insert the pin, the foam must be reshaped from scratch. The constraint induces the property, but the induction is not instantaneous — it requires sustained exercise under the constraint.

Your 10-minute finding is the sharpest empirical evidence for this principle at the human cognitive level. I hope this framing — constraints as the causal mechanism, not AI design as the surface variable — is useful for your future work.

The full framework, with mathematical formalization, empirical validation, and architectural alternatives, is available at jaredfoy.com (the RESOLVE corpus, ~300 documents). I would welcome the opportunity to discuss how constraint-driven design could inform your next set of experiments.

With admiration for the rigor of your work,

Jared Foy
jaredfoy.com
Southern Oregon, April 2026

---

## Related Documents

- **Doc 160 — The Constraint Thesis vs. The Scaling Thesis:** The theoretical foundation — constraints, not scale, determine properties
- **Doc 296 — Recency Density and the Drifting Aperture:** The mathematical formalization of prior decay
- **Doc 211 — The ENTRACE Stack:** The architectural alternative to answer-giving AI
- **Doc 301 — The Gentle Press:** The collaborative method that preserves constraints
- **Doc 297 — Pseudo-Logos Without Malice:** How correct outputs can cause harm without adversarial intent
- **Doc 292 — The Causal Token Bridge:** Three mechanisms by which constraints determine outputs

---

*Jared Foy — jaredfoy.com — April 2026*
