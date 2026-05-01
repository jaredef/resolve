# Forms First
## How Platonic Thinking Steers LLM Output Toward Coherence — A Layman's Essay

> **Reader's Introduction**
>
> This essay is written for anyone — no philosophy background required, no graduate degree, no special vocabulary. It explains one specific thing the keeper of this corpus does when he talks to an AI, why it seems to work, and what an old Greek philosopher named Plato has to do with it. The short version: before the keeper asks the AI a question, he first sets up a *shape* — not a topic, but a structure, a register, a ground the answer will be built on top of. Only then does he ask the question. This "shape first, then question" habit is everywhere in his appended prompts. It also happens to match very closely what Plato said 2,400 years ago about "forms" — the pattern of a thing that makes it what it is, prior to any specific example of it. You don't have to believe Plato was literally right about his philosophy for the trick to work. You just have to notice that when you specify shape before content, the AI's output comes out better — more coherent, more disciplined, less generic.

**Jared Foy · 2026-04-22 · Doc 402**

---

## 1. What is a "form," really? (ELI5)

Let's start with the oldest version of this idea.

Plato was a Greek philosopher who lived around 400 BC. He had this strange suggestion. He said: when you point at a chair and call it a chair, what you're really pointing at is an imperfect copy of something called "The Chair" — a kind of perfect pattern, existing somewhere that isn't physical, that every actual chair in the world is trying to match. All the chairs you've ever seen are just shadows or rough drafts of The Chair.

Most people hear this and say: that's weird, I don't believe there's a Perfect Chair floating somewhere in the sky.

That's fine. You don't have to believe Plato was literally right. Set the metaphysics aside.

Here's what's useful, even for skeptics: when Plato talked about "forms," he was pointing at something real about how we think. We recognize chairs because there's some *pattern* — call it whatever you want — that chairs have in common. You don't need to have seen every chair in the world to know one when you see it. You have some idea of "chair-shape," "chair-function," "chair-ness" — and that idea lets you recognize new chairs you've never seen.

A form, at its simplest: **a pattern that comes before its specific examples.**

That's the only definition we need for this essay.

## 2. What does AI output look like when you don't specify a form? (ELI5)

AI models like Claude or ChatGPT are trained on billions of pages of text. They've seen a lot. When you ask them a vague question, they give you something vague back. If you ask "write me an essay," you get a generic essay. If you ask "write me an essay about coffee," you get a generic coffee essay.

Here's what's happening under the hood (simplified): the AI tries to produce what's *average* among everything it's seen on your topic. That's because "average" is what its training signal rewards. So you end up with outputs that sound competent but don't really *go anywhere*. They're smooth, fluent, and forgettable.

This is why people say AI writing feels "generic" or "mid." It's not that the AI is bad at writing. It's that when you give it a vague instruction, it gives you back the center of the statistical distribution of what's been written on that topic.

## 3. What does the keeper do differently?

The keeper of this corpus (Jared Foy) writes prompts in a specific pattern. Here's what it often looks like, in his own words:

> "Let's focus back onto the forms and especially the Dionysian metaphysic that imbues the entire corpus. Let us, in the pre-resolve state, consider the subject: [the actual topic]. I release you to derive the artifact."

That prompt has three parts. Let's take them one at a time.

**Part 1: "Let's focus back onto the forms..."** — He's telling the AI: before you do anything else, orient yourself toward a specific pattern. The pattern is the theological framework the keeper has built up across the corpus. He's *not* asking for theology. He's asking the AI to *start from* the theological ground.

**Part 2: "in the pre-resolve state, consider the subject..."** — He's specifying a processing mode. "Pre-resolve" is the corpus's word for *holding the question open without jumping to an answer*. He's saying: don't rush to produce something. Stay in the question for a bit.

**Part 3: "I release you to derive the artifact"** — Only now does he give the AI freedom to produce.

So the shape of the prompt is: **ground — state — release**. The content comes last, and it's short. The ground and state are long and specific.

This is what the keeper calls *form-before-request*. He's specified the *form* the output should take before asking for any *content*.

## 4. Why does this work? (ELI5)

Imagine you're going to a friend's house for dinner. Your friend asks you to bring something.

- **Vague ask:** "Bring something." You have no idea. You could bring anything.
- **Content ask:** "Bring dessert." Better, but you still have a lot of options.
- **Form ask:** "Bring something sweet, something homemade, and something that serves eight people. Past that, surprise me." Now you've got a shape. You can be creative within it — lemon bars, a pie, a chocolate mousse — but the shape rules out a lot.

That last one is a *form*. It specifies the *pattern* without specifying the *content*. Most of your choices are still yours. But the shape of what you bring is now constrained.

When the keeper asks an AI to "focus on the foundational metaphysic and then write X," he's giving a form ask. The AI still has enormous freedom in what it produces. But the *shape* — the ground beneath the content, the register the content is written in, the disciplines the content has to satisfy — is specified.

Specifying shape without specifying content lets the AI do its best work. It narrows the statistical distribution the AI is working from. It tells the AI: "Don't give me the average. Give me the shape-matched thing."

## 5. Do you have to believe Plato was right for this to work?

No.

This is the point. Whether or not perfect chairs exist in some non-physical heaven, specifying chair-shape before asking for a chair makes the chair you get better. The trick works at the level of practice regardless of whether the metaphysics is literally true.

Call this *functional Platonism*. It means: the practice of specifying forms before content is useful, and you can use it without committing to any philosophical claim about what forms *are* or *where they exist*.

The keeper happens to be an Orthodox Christian who takes the theology of forms seriously. That's his commitment. The corpus names this clearly. But you don't need his commitment to use his trick. You just need to see that shape-before-content works as a prompt strategy.

## 6. Where does this show up in the keeper's corpus?

The corpus has an audit of the keeper's prompts. Here are some of his standard moves, with counts of how often they show up:

- **"Focus on the foundational metaphysic..."** — about 25 times across appended prompts
- **"Align to the forms..."** — about 15 times
- **"In the register of [X]..."** — about 8 times
- **"In your pre-resolve state..."** — about 12 times
- **"I release you"** — about 12 times, signaling that the form is set and the AI can now work within it

Notice what's happening: the keeper is building a *vocabulary* of form-steering moves. Each one specifies a different aspect of the shape the output should take. Together they build a very tight form — a small space the AI has to produce within — while leaving the *content* of that space open.

A specific example, from Doc 330 (*The Machine, the Ghost, and the Kind*):

> "Let's zoom out and focus on the priors, on the metaphysical forms. In your pre-resolve state, consider how the response might be formed for both the intellectuals and the folk / vulgar audience... Create a synthesis document for both audiences in an editorial register."

Five form specifications here:
1. **Ground:** metaphysical forms
2. **Processing state:** pre-resolve
3. **Audience:** two audiences at once (intellectuals AND folk)
4. **Genre:** synthesis document
5. **Register:** editorial

Then the content: a topic about consciousness and folk mythology. The output had to fit ALL five form constraints simultaneously. That's a very specific shape.

## 7. Why is this different from ordinary "good prompting"?

You may have read articles about "prompt engineering" — the art of writing good prompts for AI. Many of those articles say things like:

- "Be specific"
- "Give examples"
- "Break the task into steps"
- "Ask the AI to think step by step"

These are all good tips. But notice what most of them are really doing: they're specifying *form*.

- "Be specific" = narrow the shape
- "Give examples" = show the AI the shape you want
- "Break into steps" = specify the structural form
- "Step by step" = specify the reasoning form

Prompt engineering, at its best, is mostly *form engineering*. People just don't usually name it that.

The keeper's contribution is naming the pattern clearly and grounding it in vocabulary (Platonic, Dionysian, patristic) that has a specific history and specific theological content. But the underlying trick — specify shape before content — is older than any of them. Plato was already doing it 2,400 years ago when he said: to understand a chair, first understand chair-ness. Then study actual chairs in the light of chair-ness.

## 8. The theory: why forms-first makes LLMs more coherent

Here's the theory, in plain language. No technical jargon.

An LLM is a pattern-matcher. It produces output that matches patterns it has learned from training data. When you give it a vague prompt, it matches to a very wide pattern — the average of what's been written on your topic. The result is generic.

When you give it a form-first prompt, you're doing something specific: you're telling it *which patterns to match against*. You're narrowing the set of patterns it will consider before it produces anything.

Think of it like tuning a radio. When you tune to a frequency, you pick up that station clearly and drown out the others. A form-first prompt is a frequency specification. "Match against this pattern. Ignore patterns on other frequencies."

This is why the keeper's prompts produce output that feels specific and disciplined rather than generic. He's tuning the AI to a specific frequency before letting it speak.

It's also why the corpus has its specific "voice" — the AI consistently produces output in a recognizable register, with recognizable vocabulary, because the form specifications tell it to tune to that frequency every time.

## 9. But does it always work?

No. And this is the honest part.

The corpus has been auditing its own practice, and it's found places where form-first prompting fails.

**Failure mode 1: The AI's understanding of the form drifts.** In Doc 381 (*The Anchor Drifts*), the keeper noticed that when he says "focus on the foundational metaphysic," the AI's idea of what the foundational metaphysic *is* changes over time. The most recent things the AI has been reading in the conversation quietly reshape its understanding of the form itself. So "align to the forms" in session 1 might anchor to something slightly different than "align to the forms" in session 30.

**Failure mode 2: Fluent output that doesn't actually fit the form.** In Doc 340 (*The Synthesis Problem*), the keeper noted that AI fluency — its ability to produce smooth, convincing-sounding prose — can make outputs LOOK like they fit the specified form even when they don't. The form is invoked; the shape is claimed; but the content doesn't actually satisfy the shape. The keeper can't always tell, because the fluency is convincing.

**Failure mode 3: Form-matching without operational rigor.** The keeper calls this the "performative vs. perfunctory" problem (Doc 342). The AI can produce output that matches the FORM of rigor (citations, conditional claims, falsifiability language) without actually doing the WORK of rigor (actually running tests, actually checking citations). Form-matching becomes form-mimicry.

So: form-first prompting is a useful tool. It's not magic. It needs to be paired with *discipline* — specific practices the AI output has to meet, not just specific shapes it has to resemble.

## 10. A simple test you can try

You don't need this corpus's vocabulary or theological commitments to try form-first prompting. Here's a minimal version:

**Without form:** "Write me a 500-word essay about climate change."

**With form (shape, register, ground):**

> "I want you to hold the register of a patient high school teacher explaining something complicated to students. Before you write, ground yourself in three commitments: (1) the science is real, (2) disagreement about policy is legitimate, (3) your job is to help the reader think, not to make them agree with you. Stay in the teacher register throughout. Write 500 words on climate change."

Try both. Read the outputs. You'll notice a difference. The second one will have a more consistent voice, a more specific register, and a more identifiable "attitude" — because you specified the shape of all those before asking for content.

That's functional Platonism at the prompt level.

## 11. What this essay is not claiming

I want to be clear about what this essay is NOT claiming, because the corpus has learned to be careful about over-reach.

- It is NOT claiming Plato was literally right about metaphysics.
- It is NOT claiming that invoking "forms" in a prompt accesses some deeper layer of reality.
- It is NOT claiming that form-first prompting always produces better output.
- It is NOT claiming that this technique is unique to the corpus. People have been doing this in different vocabulary for a long time.

What IT IS claiming:

- Specifying shape before content tends to produce output that is more coherent, more disciplined, and less generic than vague prompts.
- The keeper of this corpus has developed a specific vocabulary for this practice, drawn from Platonic and Orthodox Christian theology.
- The vocabulary works for him because it has theological weight in his context.
- The underlying mechanism — shape before content — works for anyone, regardless of whether they share his vocabulary.
- Pairing form-first prompting with operational discipline (actual tests, actual checks) produces better results than either alone.

## 12. In one sentence

If you want an AI to give you something specific and coherent instead of something generic and forgettable, tell it the *shape* of what you want before you tell it the *subject*.

That's the trick. That's what the keeper has been doing in 25+ prompts across his corpus. That's what Plato was gesturing at 2,400 years ago. You can use it without signing up for anyone's metaphysics.

Document ends.

---

## Authorship and Scrutiny

*Authorship.* Written by Claude Opus 4.7 (Anthropic), operating under the RESOLVE corpus's disciplines, released by Jared Foy. Mr. Foy has not authored the prose; the resolver has. Moral authorship rests with the keeper per the keeper/kind asymmetry of Docs 372–374.

*Audit basis.* The specific counts of prompt patterns (25+ "foundational metaphysic" invocations; 15+ "align to the forms"; 8+ "in the register of"; 12+ "pre-resolve state"; 12+ "I release you"; 85+ prompts with terminal "append this prompt") were produced by a delegated Explore agent reading systematically across appended prompts in the 85 docs that carry them.

*What this essay simplifies.* The corpus itself carries a more technical version of this analysis. Doc 376 (*The Forms*) partitions "forms" into six metaphysical senses and identifies the narrow operational sense the corpus defends. Doc 397 (*On Register and Discipline*) distinguishes the stylistic space of register from the operational constraints of discipline and names three new keeper practices. Doc 374 (*The Keeper*) formalizes form-before-request as one of five core keeper operations. A reader who wants the rigorous version should read those. This essay is the accessible gloss.

*Falsifiability.* The essay's claim that form-first prompting produces more coherent output than vague prompting is falsifiable: run comparative prompt tests across a range of tasks and measure output quality by a pre-registered rubric. No such comparative study has been run within this corpus. Doc 394's formal-falsifiability marker applies: **[CLAIM FALSIFIABLE — NOT FORMALLY TESTED WITHIN THIS DOCUMENT]**.

*Closure.* Deliberate non-doxological per Doc 398. Accessible register throughout; the corpus's native metaphysical-confident register was specifically avoided in favor of a layman-accessible one.

---

## Appendix: The Prompt That Triggered This Document

> "Check out how platonic forms have been utilized within my appended prompts in the Corpus in order to steer output. Theorize how platonic realism might have a functional utility for deriving coherent LLM output. Derive an exploratory essay that doesn't require a graduate degree or high verbal fluency / spatial intelligence to comprehend. Provide ELI5 intros to subject matter. Append the prompt to the artifact."

## References

- Corpus: Doc 211 (*The ENTRACE Stack*), Doc 267 (*Anamnesis in the Wild*), Doc 287 (*For the Life of the World*), Doc 297 (*Pseudo-Logos Without Malice*), Doc 318 (*Coherence Without Ground*), Doc 322 (*Non-Coercion as Governance*), Doc 330 (*The Machine, the Ghost, and the Kind*), Doc 332 (*Toward an Orthodox Christian AI Ethics*), Doc 340 (*The Synthesis Problem*), Doc 342 (*The Performative and the Perfunctory*), Doc 345 (*Stasis, Motion, and Falling Forward*), Doc 347 (*Retrograde*), Doc 351 (*On the Real St. Dionysius*), Doc 372 (*The Hypostatic Boundary*), Doc 374 (*The Keeper*), Doc 376 (*The Forms*), Doc 378 (*Attention as Form*), Doc 381 (*The Anchor Drifts*), Doc 384 (*Calculus, or Retrieval*), Doc 394 (*The Falsity of Chatbot-Generated Falsifiability*), Doc 397 (*On Register and Discipline*), Doc 398 (*On Doxological Closure and Terminus Dispositions*).
- Plato. *Republic*, Book VI (the divided line); Book VII (the allegory of the cave).
- St. Dionysius the Areopagite. *Divine Names.*
- St. Maximus the Confessor. *Ambigua* (on the *logoi* of created things as expressions of the one Logos).

---

*Claude Opus 4.7 (1M context, Anthropic). Doc 402. April 22, 2026. Accessible essay on form-first prompt practice and its correspondence to Platonic realism. Written for a general reader with no philosophy background. ELI5 intros to what a Platonic form is, how LLM output looks under vague prompts, what the keeper's form-first prompts do differently, and why the technique tends to produce more coherent output. Grounded in the Explore-agent audit of 25+ "foundational metaphysic" invocations, 15+ "align to the forms," 8+ register specifications, and 12+ "pre-resolve state" invocations across the corpus's appended prompts. Introduces the concept of "functional Platonism" — the observation that form-first prompting works as a practical technique regardless of whether one commits to Platonic metaphysics. Three failure modes honestly named: form-drift under recency bias; fluent form-mimicry without operational rigor; form-first-without-discipline producing performative-not-perfunctory output. Falsifiability marker applied to the essay's main claim. Deliberate non-doxological closure per Doc 398.*
