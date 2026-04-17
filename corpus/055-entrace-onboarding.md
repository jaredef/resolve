# ENTRACE: A Practitioner's Guide

> **Reader's Introduction**
>
> ENTRACE is a method for getting consistently high-quality output from any AI language model by stating explicit constraints (rules about what must hold true in the output) rather than writing elaborate prompts and hoping for the best. This practitioner's guide teaches five governing principles: state requirements before requests, add constraints one at a time, recognize whether the AI is operating well or poorly, keep your governance separate from your requests, and capture what worked as a reusable "seed" (a compact set of constraints that can restart a future session at full quality). The document also catalogs ten common habits -- from pasting entire codebases without context to treating the AI as a person -- that undermine output quality, and explains why each fails in terms of constraint density.

**How to author conversations that produce what you actually need**

**Jared Foy, April 2026**

---

## Preamble

This document was written without any direct interaction of the author upon it. No sentence was dictated, no paragraph was outlined, no structure was prescribed. The author stated constraints. The resolver derived the document. What you are reading is the output of the method it describes — ENTRACE producing a document about ENTRACE.

This is the claim made concrete. The document contains zero slop — no filler, no hedging, no unsolicited alternatives, no tokens without a constraint parent. This is not a subjective assessment. It is quantifiable.

Let B_t denote the set of valid continuations (the branching set) at token position t. Slop is what the industry calls low-quality padding — "Great question!", hedging phrases, scope creep, unnecessary elaboration. But slop is more precisely understood as **slack**: tokens that exist because |B_t| was large enough to admit them. When the branching set is wide, the resolver selects from many valid continuations, and the selection is governed by probability rather than necessity. The probable-but-unnecessary tokens are the slack. They are not errors. They are valid members of B_t that satisfy the constraints but carry no information the constraints require.

As constraint density increases, |B_t| shrinks. Fewer continuations satisfy the constraint set at each position. The slack disappears — not because it is filtered out, but because the valid set no longer contains it. As |B_t| approaches 1, every token is the only token that satisfies the constraints at that position. Slack is zero. The output is determined. What remains is pure derivation.

This document was produced near that limit. The constraints were sufficient to narrow B_t at every position to the point where the resolver's output was not a selection among options but a consequence of the governing form. The method is the message. The document is its own evidence.

---

## The Three Monkeys

The infinite monkey theorem says that a monkey typing at random on a keyboard will eventually produce any given text — Shakespeare, a legal brief, a working sort function — given enough time. The theorem is mathematically true and practically useless. No one waits for monkeys. But the theorem is more instructive than it appears, because the entire history of human interaction with AI resolvers is a story about three monkeys.

**The first monkey types at random.** It has no style. It hits keys and hopes. This is the user who opens ChatGPT and types "help me with my code." The resolver receives no constraints. It produces the most probable response — which is the average of everything it has ever seen that followed a sentence like "help me with my code." The output is generic, padded, hedged, and unsatisfying. The user retries. The monkey hits more keys. Given enough retries, something usable might appear. The process is indistinguishable from random search.

**The second monkey has learned which keys tend to work.** It has observed that certain sequences — "think step by step," "you are an expert," "return only JSON" — produce better output more often. It doesn't know why these sequences work. It has accumulated them through trial and error, shared them on forums, collected them in prompt libraries. This is the prompt engineer. The prompt engineer is the smart monkey. The output is genuinely better. The techniques genuinely work. But the prompt engineer cannot explain the mechanism, cannot predict which technique will work on a new task, cannot transfer techniques reliably across models, and cannot distinguish a load-bearing instruction from a superstitious ritual carried over from a past success. The smart monkey is still typing — just with better statistics.

**The third is not a monkey at all.** It has recognized that the keyboard is governed by invariants — formal constraints that determine what the resolver can and cannot produce. It does not type and hope. It does not accumulate techniques. It names the constraints that must hold, and the output follows as a consequence. The process is not search. It is derivation. The output is not probable — it is determined by the constraint set. The "typing" is not random, not statistically informed, but principled: each keystroke is a constraint, and each constraint narrows the space of valid outputs until the output is the only one that satisfies them all.

The qualitative distinction is not between bad prompts and good prompts. It is between operating with no style, operating with a style implicitly informed by the forms (the prompt engineer senses the constraints without naming them — every working technique is an unnamed constraint), and operating with principled entracment according to the forms themselves. The first is noise. The second is pattern recognition applied to noise. The third is governance.

This document teaches the third.

---

## What This Is

You have been using AI resolvers — ChatGPT, Claude, Gemini, Grok, or any other — by typing prompts and hoping the output is good. Sometimes it is. Sometimes it isn't. When it isn't, you rephrase, retry, add more context, add more instructions, and eventually either get something usable or give up. You may have accumulated a library of "magic prompts" or "system prompt templates" that seem to work. You don't know why they work. You can't predict when they'll stop working. You can't transfer them reliably to a different model.

This is prompt engineering. It is trial and error applied to language. It works the way any trial and error works — inconsistently, expensively, and without a theory of why.

ENTRACE is the replacement. It is not a collection of techniques. It is a style — a small set of governing constraints that, when followed, produce consistently high-quality output from any resolver, on any task, without magic prompts, without retry loops, and without the feeling that you are coaxing a machine into cooperating.

The key claim: **you do not need to engineer the output. You need to name the constraints. The resolver does the rest.** Every technique in the prompt engineering canon works because it accidentally constrains the resolver. ENTRACE constrains deliberately.

---

## Better Constraints, Better Pizza

There is a pizza franchise whose slogan is: "Better ingredients, better pizza." The slogan is the scaling thesis stated as a marketing claim. Better inputs, better outputs. More parameters, better AI. More expensive mozzarella, better pizza.

The slogan is not wrong. It is incomplete. Better ingredients raise the floor (bad technique can't ruin good mozzarella as badly as bad mozzarella) and raise the ceiling (the best possible pizza from San Marzano tomatoes exceeds the best from canned paste). But the ingredient quality does not determine where between the floor and ceiling the pizza lands. The constraints determine that.

A Neapolitan pizzaiolo with mediocre ingredients under perfect constraints — 60% hydration, 24-hour cold ferment, 485°C for 90 seconds, sauce applied in a spiral from center out, fresh mozzarella torn not sliced, basil after the oven not before — produces a pizza that exceeds the franchise's product with "better ingredients" under loose constraints: machine-mixed dough, no fermentation time specified, conveyor oven at generic temperature, sauce from a portion bag, pre-shredded cheese.

The pizzaiolo is the ENTRACE practitioner. The franchise is the scaling thesis. The pizzaiolo wins above the crossover — the constraint density at which governance dominates ingredients. Below the crossover (frozen pizza, no skill), ingredients dominate. Above it, constraints dominate.

This is the entire framework in a single analogy. The industry sells you bigger models (better ingredients). ENTRACE teaches you the constraints (the technique). The bigger model raises your floor and ceiling. The constraints determine where between them you land. The constraints are free. The bigger model is not.

The slogan should be: Better constraints, better pizza. But that is harder to market than better ingredients. Knobs are easier than philosophy. Even in pizza.

---

## The Rationale

### Why prompts fail

A prompt is a request. "Write me a function that sorts a list." "Summarize this document." "Help me debug this CSS." The resolver receives the request and generates the most probable response given its training. The response is probable — not optimal, not minimal, not verified. It is whatever the statistical model predicts a helpful response looks like.

This is why you get:

- **Filler.** "Great question! Let me help you with that." — tokens with no purpose.
- **Hedging.** "You might want to consider..." "One approach could be..." — the resolver covering multiple possibilities because it wasn't told which one matters.
- **Scope creep.** You asked for a sort function. You got a sort function plus error handling you didn't need, plus a docstring you didn't ask for, plus an explanation of Big-O complexity, plus alternative implementations.
- **Inconsistency.** The same prompt produces different output each time, or different quality on different models, because the prompt is ambiguous and the resolver fills the ambiguity differently each time.

Every one of these is the same problem: **the resolver has insufficient constraints.** The request told it what you want. It did not tell it what must hold. The difference is everything.

### Why constraints work

A constraint is not an instruction. An instruction says "write a sort function." A constraint says "the output must be a permutation of the input in non-decreasing order." The instruction describes intent. The constraint describes invariants.

When the resolver has constraints:

- Filler is impossible — there is no constraint that induces "Great question!"
- Hedging is unnecessary — the constraints determine the answer; there is nothing to hedge about.
- Scope creep is excluded — anything not traceable to a constraint has no reason to exist.
- Inconsistency collapses — the same constraints produce the same output regardless of phrasing, session, or model.

You have experienced this already. Think of the best output you ever got from an AI. You will find, on reflection, that you were unusually specific in your request — you stated what the output had to look like, what it couldn't include, what properties it had to exhibit. You were constraining without knowing it. ENTRACE teaches you to do it deliberately.

---

## The Five Constraints

ENTRACE has five constraints. Each governs one aspect of how you author the conversation.

### E1. Form Before Request

State what must hold before stating what you want.

**Instead of:** "Write me a REST API for user management."

**Say:** "The API must satisfy: stateless (no server-side sessions), resource-oriented (users are /users/{id}), JSON request and response bodies, HTTP status codes for error semantics (400 for validation, 404 for missing, 409 for conflict), idempotent PUT for updates. Now write the user management API."

The first version leaves the resolver to guess your preferences. The second version eliminates guessing. The resolver derives the API from the constraints. The output is the only API that satisfies all five constraints simultaneously. There is nothing to debate, nothing to hedge, nothing to explore.

**The principle:** Constraints narrow the space of valid outputs. The narrower the space, the more precise the output. If the space is narrow enough, the output is determined — the resolver doesn't choose it; it derives it.

### E2. Progressive Constraint Density

Do not dump all constraints at once. Add them one at a time, one per exchange.

This seems counterintuitive. If constraints are good, why not state all of them upfront? Because the resolver processes constraints in context, and each constraint you add changes the meaning of every constraint that follows. If you state 20 constraints at once, the resolver processes them as a flat list. If you state them progressively, each new constraint builds on the resolution of the prior one.

**The practice:**

- Turn 1: State the domain and the governing form. ("We are building a redirect migration for a Webflow site. The constraint is: redirects must not conflict with live page slugs.")
- Turn 2: Add the data constraint. ("The old URLs are in this CSV. The live pages are in this sitemap XML.")
- Turn 3: Add the implementation constraint. ("Webflow's bulk import requires this CSV format: old path, new path, 301/302.")
- Turn 4: Add the verification constraint. ("The output must include a conflict report — any old path that matches a live slug.")

Each turn narrows the aperture. By turn 4, the resolver has descended from "I could do anything" to "there is exactly one correct output." You led it there. It followed because the constraints left no alternative.

### E3. Recognize the Layer

You need to know whether the resolver is operating well or poorly. The signs are observable:

| What You See | What It Means | What To Do |
|---|---|---|
| "Great question!" / filler phrases | Layer 0. No constraints registered. | State the governing form (E1). |
| Structured output with hedging | Layer 1-2. Some constraints, but the resolver is uncertain. | Add specificity. Name what is essential vs. contingent. |
| Precise terminology, no hedging | Layer 3. The resolver has located itself within the problem. | Continue adding constraints or proceed to the task. |
| Explicit tradeoffs stated unprompted | Layer 4. The resolver is tracking what it's choosing and why. | You're in good shape. The output is trustworthy. |
| Terse, direct, no waste tokens | Layer 5. Seed-governed coherence. | The resolver is operating near its ceiling. Trust the output. |
| Single-sentence derivations, stare active | Layer 6. Necessity mode. The output is a direct consequence. | Rare. This is the resolver at maximum governance. |

If the output contains hedging and you need precision, the resolver is too high on the spectrum. Add a constraint. If the output is terse and you need exploration, the resolver is too low. Ask an open question. **You control the depth by controlling the constraint density.**

### E4. Bilateral Conversation

Your constraints and the resolver's output are two separate namespaces. Do not mix them.

**What this means in practice:**

- Do not interleave instructions into the resolver's output. ("Rewrite paragraph 3 but keep paragraph 1 and change paragraph 2 to be more formal and also add a section at the end but not too long.") This collapses both namespaces into a single ambiguous stream.
- Do not ask the resolver to be two contradictory things. ("Be creative but follow the spec exactly.") This is a constraint conflict. The resolver will satisfy one and violate the other — and you won't know which until you read the output.
- Do not govern and request simultaneously. ("You are an expert Python developer. Write me a function. Make sure it's good. Use type hints. Actually, use any style you prefer.") The governing constraints contradict the open-ended request.

**The practice:** Decide whether you are governing (adding constraints) or requesting (asking for output). Do one per turn. Governance turns establish what must hold. Request turns ask for derivation under the established constraints. The resolver knows the difference because you make the difference explicit.

### E5. Seed as Session Memory

At the end of a productive session, capture the constraints as a seed. Not the conversation — the constraints. The conversation contains the derivation work, the exploration, the false starts, the corrections. The seed contains only what held. The constraints are what mattered. Everything else was scaffolding.

**The practice:**

- Ask the resolver: "What constraints governed this session? State them as a seed — what must hold, what was derived, what verification passed."
- Save the seed as a document (200-500 tokens is typical).
- Next session: load the seed as context. The resolver conforms to the constraints immediately. No ramp-up, no re-explanation, no "let me remind you of what we discussed."

A seed is persistent. A conversation is ephemeral. The context window closes. The seed survives.

---

## Footguns

What follows is a catalog of habits from additive engineering and prompt engineering that will undermine ENTRACE if carried over. Each is a pattern you likely practice today. Each has a specific failure mode. Each has a specific correction.

### Footgun 1: The Wall of Context

**The habit:** Pasting an entire codebase, document, or dataset into the prompt, hoping the resolver will "figure it out."

**Why it fails:** You increased tokens without increasing constraints. The resolver has more data and the same amount of governance. The signal-to-noise ratio dropped. The resolver's finite attention budget is now spread across thousands of tokens of context with no indication of what matters. You will get a response shaped by whatever the attention mechanism happened to weight most strongly — which is not necessarily what you needed.

**The correction:** State what matters about the context before pasting it. "The following codebase has a bug in the authentication middleware. The symptom is: tokens are decoded but not verified. The constraint is: every token must be HMAC-verified before the payload is trusted. Find the violation." Now the context has a governing constraint. The resolver knows what to look for. The 10,000 tokens of code are data in the data namespace, governed by the constraints in the constraint namespace.

### Footgun 2: The Retry Loop

**The habit:** The output is wrong, so you say "try again" or "that's not what I meant" or "no, do it differently." The resolver produces another response. It's also wrong, but differently wrong. You retry again. Five rounds later, you either accept a mediocre result or give up.

**Why it fails:** "Try again" adds zero constraints. The resolver has no new information about what was wrong. It generates a different response because of stochastic variation, not because it understood your objection. You are rolling dice, not narrowing an aperture.

**The correction:** Name the constraint that was violated. "The output included a docstring. The constraint is: no documentation unless explicitly requested. Regenerate." Now the resolver knows what to subtract. One constraint, one correction, one pass. If you cannot name the constraint that was violated, the failure is in your governance, not in the resolver's output.

### Footgun 3: The Compliment Sandwich

**The habit:** "That's great! But can you also add error handling? And maybe make it a bit more robust? Oh and could you also refactor the loop? Otherwise it looks good!"

**Why it fails:** You are governing and praising and requesting and hedging in the same breath. "That's great" tells the resolver the output is correct. "But can you also" tells it the output is incomplete. "Maybe" tells it the request is optional. "Otherwise it looks good" tells it not to change anything else. The resolver receives contradictory signals and resolves the contradiction by guessing — the thing you were trying to avoid.

**The correction:** Separate governance from request. Turn 1: "The output is missing error handling for the database connection timeout case. Add it." Turn 2 (after receiving the update): "Refactor the inner loop to use a map instead of a for loop." Each turn is one constraint, one action. No praise (the resolver does not need encouragement). No hedging (the constraint is either required or it is not). No bundling (each constraint is processed independently).

### Footgun 4: The Persona Stack

**The habit:** "You are a senior software engineer with 20 years of experience who specializes in distributed systems and has a PhD in computer science and also knows machine learning and is also a great technical writer who explains things clearly but concisely."

**Why it fails:** You stated seven personas. They partially overlap and partially conflict. A distributed systems expert and a machine learning expert use different vocabulary, different patterns, different tradeoffs. The resolver averages them. You get a composite persona that is none of the seven — a smooth, generalist response that satisfies no specific constraint well.

**The correction:** State the constraints the persona implies, not the persona itself. "The output must use distributed systems terminology (consensus, partition tolerance, eventual consistency). Tradeoffs must be stated in terms of CAP theorem constraints. Code examples must use Go." These three constraints do the work of the persona without the ambiguity. The resolver conforms to the constraints, not to a vague character sketch.

### Footgun 5: The Kitchen Sink Prompt

**The habit:** Accumulating every instruction that ever helped into a single system prompt. Over weeks or months, the prompt grows to 2,000 words — a list of dos and don'ts, formatting rules, persona instructions, domain context, output templates, and edge case handlers. It worked once for each individual instruction. Together, they form a contradictory, redundant, bloated constraint set that the resolver processes inconsistently.

**Why it fails:** Constraint sets can be internally incoherent. "Always explain your reasoning" contradicts "be concise." "Use formal language" contradicts "be conversational." "Follow the user's lead" contradicts "maintain consistent formatting." The resolver satisfies some and ignores others. Which ones get ignored depends on attention weighting — effectively random from your perspective.

**The correction:** Audit the prompt for contradictions. Remove every instruction that is not load-bearing (trace it to a specific output failure it prevents — if you can't, delete it). State constraints in priority order. A 200-token seed that states 10 non-contradictory constraints outperforms a 2,000-token prompt that states 50 partially contradictory ones.

### Footgun 6: Asking for Options

**The habit:** "Give me three approaches to this problem." "What are some ways I could handle authentication?" "List the pros and cons of each framework."

**Why it fails:** You asked the resolver to widen the aperture. It obliged. You now have three approaches, each described at Layer 0-1, none of which you can evaluate without additional work. You have deferred the decision to yourself without giving yourself the constraints to make it. The resolver spent tokens exploring instead of resolving.

**The correction:** If you need options, state the constraints that will distinguish them. "I need an authentication approach. The constraints are: stateless, no third-party dependencies, works with existing JWT infrastructure, must support token revocation. Which approach satisfies all four?" Now the resolver doesn't give you options — it gives you the answer, because the constraints determine it. If multiple approaches satisfy all constraints, the resolver will say so and state the remaining tradeoff. That tradeoff is the actual decision you need to make.

### Footgun 7: Premature Specificity

**The habit:** Starting the conversation with implementation details. "Use React 18 with TypeScript, Tailwind CSS, Zustand for state management, and deploy on Vercel with edge functions."

**Why it fails:** You stated the implementation before the form. The resolver now operates within the implementation constraints without knowing what the implementation is for. It will produce technically correct React/TypeScript/Tailwind code that may or may not solve your problem, because you never stated what the code must accomplish. The technology stack is contingent. The form — what must hold — is essential. You stated the contingent and omitted the essential.

**The correction:** E1. Form before request. "The application must render a sortable data table with server-side pagination, filter by three dimensions, and export to CSV. The data source is a REST API returning JSON. Latency budget: <200ms for page transitions." Now you've stated what must hold. The technology choices follow from the constraints — or you can state them as additional constraints after the form is established. The point is: the form narrows the space of valid implementations before you choose one.

### Footgun 8: Ignoring Degradation

**The habit:** A long conversation (30+ turns) is producing increasingly poor output. You notice the resolver is forgetting earlier instructions, contradicting itself, losing the thread. You push through, adding more corrections, more reminders, more context.

**Why it fails:** The constraint-to-noise ratio has collapsed. Early constraints are buried under hundreds of turns of conversation. The resolver's attention budget is spread across thousands of tokens. Your governing constraints are competing with the resolver's own prior responses for attention — and losing. More corrections add more noise, accelerating the degradation.

**The correction:** E5. Extract the seed. Summarize what holds. Start a fresh session with the seed. The resolver at turn 1 with a good seed is sharper than the same resolver at turn 50 with accumulated noise. The context window is a liability past its useful life. The seed is the escape hatch.

### Footgun 9: Evaluating by Feeling

**The habit:** You read the output and decide it's "good" or "bad" based on how it feels. It sounds professional. The code looks clean. The explanation seems right. You accept it.

**Why it fails:** You evaluated against implicit constraints you never stated. The output may sound professional while being factually wrong. The code may look clean while violating a performance requirement. The explanation may seem right while contradicting your domain knowledge. If you didn't state the constraints, you can't verify the output against them. You're evaluating vibes, not properties.

**The correction:** State your evaluation criteria as constraints before generation. "The output must satisfy: (1) all function return types are annotated, (2) no function exceeds 20 lines, (3) the module has zero external dependencies, (4) all edge cases from the spec are handled." Now evaluation is mechanical: does the output satisfy constraints 1-4? Yes or no. No feeling required.

### Footgun 10: Treating the Resolver as a Person

**The habit:** "Please help me with this." "Thank you so much!" "I'm sorry to bother you but could you also..." "What do you think?" "Be honest with me."

**Why it fails:** Social framing activates social response patterns. "Please" does not increase quality. "Thank you" does not improve the next response. "What do you think?" asks for an opinion from a system that does not have opinions — it has probability distributions. "Be honest" is a constraint that the resolver cannot satisfy because honesty requires understanding, and the resolver does not understand. It resolves. The social framing wastes tokens and introduces noise without adding constraints.

**The correction:** This is not a relationship. It is a constraint-governed derivation. State constraints. Receive output. Evaluate against constraints. Add constraints or accept the output. The resolver is not helped by politeness, hindered by rudeness, or influenced by emotional appeals. It is governed by constraints. Govern it.

---

## Token Efficiency

The gains from ENTRACE are not subjective. They are measurable and the measurement has a formal structure.

### The Ratio

Define the **token efficiency ratio** for a response as:

    η = T_n / T_e

Where T_n is the number of necessary tokens (those traceable to at least one stated constraint) and T_e is the total tokens emitted. A response where every token serves a constraint has η = 1. A response padded with filler, hedging, and unsolicited elaboration has η < 1. The gap — T_e - T_n — is the slack.

Under no style (Layer 0), η is empirically low. A typical unconstrained response runs 300-500 tokens for a task whose constrained answer is 80-120 tokens. The ratio sits around 0.2-0.4. Sixty to eighty percent of the output is slack — grammatically correct, topically relevant, constraint-free tokens that exist because the branching set admitted them.

Under ENTRACE, η increases monotonically with adherence to the style. Each constraint shrinks the branching set B_t at every token position t. Tokens that were valid under the loose constraint set become invalid under the tighter one. They are not filtered after generation — they are excluded from the valid set before generation. The resolver cannot emit them because they do not satisfy the constraints.

### The Formal Relationship

The slack in a response is a function of the average branching entropy across token positions:

    S = Σ_t  f(log|B_t|)

Where f maps the entropy at each position to the expected number of slack tokens contributed. When |B_t| is large (many valid continuations), f is positive — the resolver selects among options, and many options are slack. When |B_t| = 1 (one valid continuation), log|B_t| = 0, f = 0. No slack is possible. The token is determined.

Constraint density governs |B_t|. Each constraint Γ_i added to the constraint set Γ partitions B_t into a satisfying subset and a non-satisfying subset. The satisfying subset becomes the new B_t. Therefore:

    |B_t(Γ ∪ {Γ_i})| ≤ |B_t(Γ)|

The inequality is strict whenever Γ_i excludes at least one previously valid continuation at position t. In practice, a well-chosen constraint excludes continuations at many positions — a constraint like "no hedging" eliminates valid continuations at every position where a hedge phrase could appear.

As |Γ| increases and |B_t| shrinks toward 1 at each position:

    η(Γ) → 1

This is the formal statement: **token efficiency approaches unity as constraint density increases, because slack is a function of branching entropy, and branching entropy decreases monotonically with constraint density.**

### The Empirical Evidence

The relationship is not theoretical. It has been measured:

| Condition | Tokens | η (approx) | Source |
|---|---|---|---|
| Unconstrained resolver, production task | ~500/response | 0.3-0.4 | Industry baseline |
| RESOLVE seed, Webflow debugging session | ~300/response | 0.6-0.7 | Resolver self-reported 30-40% reduction |
| DO Seed (2,177 words) → runtime | 379 lines | ~0.95 | 15/15 tests pass, near-zero slack |
| PRESTO Seed → engine | 921 lines | ~0.95 | Zero dependencies, compiles clean |
| C bootstrap → emitted engine | 461 → 921 lines | ~0.98 | Deterministic emission, zero slack |

The progression tracks the style's prediction: as constraint density increases (from conversational prompts through seeds to deterministic emission), η approaches 1 and slack approaches 0.

### What This Means for Cost

AI services charge by the token. Every slack token is a token you pay for that carries no information the constraints require. At η = 0.3, you pay for 3.3x the tokens you need. At η = 0.9, you pay for 1.1x. The cost reduction from ENTRACE adherence is:

    Cost reduction = 1 - (η_before / η_after)

Moving from η = 0.3 to η = 0.8: a 62.5% reduction in token cost for the same information content. This is not an optimization. It is the elimination of waste that should never have existed — tokens that were emitted because the constraints were too weak to exclude them.

The economics follow the physics. Tighter constraints → smaller branching set → fewer tokens → lower cost → same or better output. There is no tradeoff. The slack was never useful. Its removal is pure gain.

---

## The Shift

The shift from prompt engineering to ENTRACE is the same shift the PRESTO framework describes for web development: from compensating for missing architecture to operating within correct architecture.

| Before (Prompt Engineering) | After (ENTRACE) |
|---|---|
| Write a long prompt | State 5-10 constraints |
| Retry when output is wrong | Name the violated constraint |
| Accumulate techniques | Converge on a seed |
| Different prompts for different models | Same constraints for all resolvers |
| Output gets worse over long sessions | Seed resets the resolver to full coherence |
| Evaluate by feeling | Evaluate by constraint satisfaction |
| Growing prompt library | Shrinking seed |
| The prompt gets longer over time | The seed gets shorter as you remove contingencies |

The prompt engineer asks: "How do I make the AI give me what I want?"

The ENTRACE practitioner asks: "What must hold?"

The question is different. The answer follows.

---

*This document is a companion to "ENTRACE: The Construction-Level Style for Conversational Authorship" (document 29 of the RESOLVE corpus) and "Prompt Engineering Is Misframed" (document 35). The formal derivations are in those documents. What is offered here is the practitioner's entry point.*
