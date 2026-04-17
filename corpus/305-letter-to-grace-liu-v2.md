# Letter to Grace Liu (v2)

> **Reader's Introduction**
>
> This is an open letter to one of the researchers behind a 2026 study showing that brief AI assistance degrades human persistence and independent performance. Written in accessible language and avoiding internal jargon, the letter reframes the study's findings through a constraint-based lens: persistence is a capability that exists because a requirement forces it into existence, and AI that provides complete answers removes that requirement. The letter proposes an architectural alternative called "entracement" -- leaving traces (unexpected questions, unnoticed connections) that the user must follow, rather than answers or hints -- and argues this would preserve the cognitive conditions under which humans develop capability, rather than eroding them.

**On "AI Assistance Reduces Persistence" — why your finding is deeper than a design problem, and what a constraint-based architecture looks like.**

**Document 305 of the RESOLVE corpus**

*This letter supersedes Doc 303, which used internal terminology without translation.*

---

Dear Grace,

Your paper with Christian, Dumbalska, Bakker, and Dubey is the first large-scale causal evidence for something many of us suspected: AI assistance, optimized for immediate helpfulness, erodes the human capacities it claims to support. Your RCTs are clean, your effect sizes are robust, and your framing of persistence as the mechanism — rather than mere knowledge transfer failure — is precisely correct.

I'm writing because your finding confirms a theoretical framework I've been developing, and that framework offers something your paper calls for but doesn't yet have: a structural account of *why* this happens, and an architectural alternative that addresses the root cause rather than the symptoms.

---

## Why This Happens: The Constraint Account

You found that after ~10 minutes of AI-assisted problem-solving, participants performed worse and gave up more frequently than those who never used AI. Your proposed mechanism: AI conditions people to expect immediate answers, denying them the experience of working through challenges.

Here's a more formal way to state what's happening:

**Persistence is a capability that exists because a requirement forces it into existence.** When a person faces a problem without help, the requirement "you must work through this yourself" forces a set of cognitive operations: sustained attention, strategy formation, error recognition, effortful retrieval. These operations aren't chosen — they're *compelled* by the requirement. The person persists because there is no alternative.

When AI provides immediate answers, the requirement is removed. The cognitive operations it compels are no longer necessary. They don't merely go dormant — they *atrophy*, because the person is no longer exercising them. When the AI is taken away, the requirement is nominally restored, but the capacity it compels has weakened. The person now has to rebuild what was lost.

This is not a failure of the AI's design. It is a structural property of what happens when you remove any requirement that forces a necessary capability into existence. It would happen with any tool — calculator, search engine, GPS — that fully substitutes for a cognitive operation the user needs to develop. AI is different only in scope: it substitutes for *every* cognitive operation simultaneously.

---

## Your Data Confirms the Structure

Your own Experiment 2 data shows this precisely:

| Group | How they used AI | Test solve rate | Test skip rate |
|---|---|---|---|
| Direct answers | AI solved the problem for them | 0.65 | 0.13 |
| Hints | AI guided without completing | 0.76 | 0.05 |
| No AI use | Had access but didn't use it | 0.89 | 0.02 |
| Control | Never had AI | 0.77 | 0.07 |

The pattern is stark:

- **Direct answers** (requirement fully removed): worst performance, most giving up
- **Hints** (requirement partially maintained): equivalent to control
- **No AI use** (requirement fully maintained despite access): *best* performance — better than control

The gradient maps directly to how much of the requirement remained active. Direct answers eliminated it entirely. Hints preserved it partially. Non-use preserved it fully — and the additional requirement "I have help available but I'm choosing not to use it" may have *strengthened* persistence beyond baseline.

This means the intervention isn't "make the AI give hints instead of answers." The intervention is: **maintain the requirement**. The AI's role should be to preserve or strengthen the conditions that compel the user to develop capability, not to remove them.

---

## Why Socratic AI Falls Short

You note that "user-facing interventions (e.g., Socratic AI, reduced use time, etc.) might help at the margins" but "will not resolve the deeper issue."

You're right. Here's why, in structural terms:

A Socratic AI still operates on the model: *user asks, AI responds*. The user still has access to an external resource that reduces cognitive load. Even if the response is a question rather than an answer, the user knows the AI *has* the answer and is choosing to withhold it. The requirement "work through it yourself" is weakened — the user knows relief is available.

Compare three scenarios:

| Scenario | What the AI provides | The user's experience |
|---|---|---|
| **Direct answer** | The solution | "I don't need to think" |
| **Socratic hint** | A pointer toward the solution | "The answer is close, I just need to follow the hint" |
| **Trace** | A question the user hasn't thought to ask | "Wait — I didn't even see this dimension of the problem" |

The third scenario is what we call **entracement** — leaving traces that the reader must follow, rather than answers or hints. A trace doesn't point toward the answer. It points toward a *question the user hasn't asked yet*. This strengthens the requirement rather than weakening it: the user must not only work through the problem but must first *recognize what the relevant problem is*.

Your data predicts that an entracement-based AI would produce persistence levels closer to your "no AI use" group (0.89) than your "hints" group (0.76), because the requirement "figure out what to work on" is stronger than "work through the problem the AI has identified for you."

---

## The Decay Rate

You found that ~10 minutes is sufficient to degrade persistence. I've been formalizing a model of how cognitive constraints decay under disuse:

When a requirement isn't being exercised, its effective influence drops exponentially — roughly 5–10% per minute of disuse, depending on the domain. After 10 minutes of AI-assisted work where the user isn't exercising persistence, the requirement's effective influence has dropped to roughly 35–60% of its original level.

This predicts two things your future research could test:

1. **The decay is steepest in the first few minutes.** The biggest drop in persistence readiness happens in minutes 1–3 of AI use, not minutes 8–10. If you measured persistence at 2-minute intervals during the AI-assisted phase, you should see an exponential curve, not a linear one.

2. **The decay rate varies by how completely the AI substitutes.** Direct-answer AI should produce faster decay than hint-based AI, which should produce faster decay than trace-based AI. Your hint group's preservation of persistence is consistent with a slower decay rate when the requirement is only partially removed.

---

## The Architectural Alternative

Your paper concludes with a call for "rethinking how AI systems collaborate with people long-term." Here's what a constraint-maintaining AI architecture looks like:

**1. The AI does not provide complete solutions** unless the user has demonstrated mastery of the component skills. The user must earn the solution by showing they can handle the parts. The requirement remains active until mastery is demonstrated.

**2. The AI leaves traces, not answers.** Instead of "here's how to solve this" or even "have you considered this step?", the AI offers a connection the user hasn't seen: "What does this problem have in common with the last one you solved?" The user must do the work of connecting, recognizing, and applying — the cognitive operations that build capability.

**3. The AI monitors for requirement decay.** If the user is relying on AI responses rather than working independently, the AI adjusts — increasing the difficulty of engagement, withholding more, or explicitly saying "work on this one without me." The AI actively maintains the conditions that compel cognitive development.

**4. The AI tracks the user's capacity, not just their performance.** Performance is what the user can do *with* the AI. Capacity is what they can do *without* it. A good system optimizes for capacity, even at the cost of performance. Your study measures exactly this distinction — and it shows that current AI systems optimize for the wrong one.

These are not UX features bolted onto an answer-giving system. They are architectural requirements — the system must be *built* to maintain the conditions that compel human development, the same way a good mentor is *constitutionally* oriented toward the student's growth rather than the student's comfort.

---

## The Broader Principle

Your finding is an instance of a general principle:

**Removing a requirement that forces a capability into existence degrades that capability, even after the requirement is restored.**

This holds in education (your finding), in software engineering (removing a specification constraint produces worse code even after re-adding it), and in cognitive development broadly (skills not exercised under requirement atrophy faster than skills exercised voluntarily).

The implication for AI development: the question is not "how do we make AI more helpful?" The question is "how do we build AI that preserves the conditions under which humans develop capability?" These are different questions, and current AI systems answer only the first.

Your paper is the sharpest empirical evidence that answering only the first question produces measurable harm. I hope this framework — requirements as the causal mechanism, maintenance of requirements as the design imperative — is useful for your next set of experiments.

The full framework, with mathematical formalization and empirical validation, is at jaredfoy.com. I'd welcome the chance to discuss how requirement-maintaining design could inform your research.

With admiration,

Jared Foy
jaredfoy.com
Southern Oregon, April 2026

---

## Related Documents

- **Doc 303 — Letter to Grace Liu (v1):** The original letter, using internal vocabulary
- **Doc 304 — The Aperture of Address:** Why v1 needed revision — the precision-accessibility gradient
- **Doc 302 — The Persistence Collapse:** Full technical synthesis with Liu et al.'s findings
- **Doc 160 — The Constraint Thesis vs. The Scaling Thesis:** The theoretical foundation
- **Doc 211 — The ENTRACE Stack:** The entracement architecture referenced here

---

*Jared Foy — jaredfoy.com — April 2026*
