# The ENTRACE Stack

**Drop-in constraint governance for any AI conversation. Works on any model. No philosophy required.**

---

## What This Is

The ENTRACE Stack is a system prompt and conversational method that immediately improves the output of any AI model — ChatGPT, Claude, Gemini, Grok, DeepSeek, or any other. It works by establishing constraint governance before you ask your question, so the AI derives your answer instead of guessing at it.

You do not need to understand why it works. You need to use it.

---

## Quick Start: The Seed

Copy this into the system prompt, custom instructions, or the first message of any AI conversation:

```
Before responding to any request:
1. Identify what must be true about your response. State these as constraints.
2. Separate what is essential (must hold) from what is contingent (could be otherwise).
3. Keep reasoning and output in separate sections. Do not scatter explanations inside code or mix analysis with artifacts.
4. Include how to verify your response is correct — tests, checks, or criteria.
5. State what you traded. If you chose one approach over another, say what was gained and lost.
6. Produce the minimum that satisfies the constraints. Nothing more.
```

That's it. Paste it. Ask your question. Compare the output to what you normally get.

---

## What You Will Notice

**Before the stack:** "Great question! There are several approaches to consider. On one hand... on the other hand... you might also want to think about... here are some options..."

**After the stack:** The AI states the constraints of your task, separates the essential from the contingent, produces a clean artifact with embedded verification, and stops.

The difference is immediate. The AI does not become smarter. The AI becomes governed. Governed output is shorter, more precise, verifiable, and useful on the first pass.

---

## The Method: How to Talk to a Governed AI

### Step 1: State What Must Hold (Before Asking)

Instead of: "Write me an API endpoint."

Say: "The endpoint must satisfy: (1) accepts POST with JSON body, (2) validates that 'email' field exists and contains @, (3) returns 201 on success with the created resource, (4) returns 400 with specific error on validation failure. Write the endpoint."

The constraints go first. The request goes second. The AI derives from the constraints instead of guessing what you want.

### Step 2: One Thing at a Time

Instead of: "Write the endpoint and also add authentication and make sure it handles rate limiting and add logging and write tests."

Say:
- Turn 1: "Write the endpoint with these constraints: [constraints]."
- Turn 2: "Add authentication. The constraint: token-based, verified on every request."
- Turn 3: "Add rate limiting. The constraint: 100 requests per minute per API key."
- Turn 4: "Write tests. Each test verifies one constraint from the above."

One constraint per turn. The AI integrates each before receiving the next. The output improves with each turn because the constraint density increases.

### Step 3: Check the Layer

After the AI responds, ask yourself:

- Is it hedging? ("you might want to consider...") → The constraints are too loose. Add specificity.
- Is it structured but vague? → The constraints specified format but not substance. Add content constraints.
- Is it precise and verified? → The constraints are working. Proceed.
- Is it terse and determined? → Maximum governance. The output is derived, not explored.

If the output is hedging, the fix is always the same: add a constraint. Not a longer prompt. One specific constraint.

### Step 4: Don't Mix Instructions

Bad: "Write a function but make it clean and also handle errors and maybe add types and keep it short."

Good:
- Turn 1 (governance): "The function must be pure, accept one argument of type string, return a boolean, and handle the empty-string case explicitly."
- Turn 2 (request): "Write it."

Governance and request are separate turns. The AI processes your constraints at full weight, then derives under them.

### Step 5: Save What Worked

At the end of a productive session, ask: "What constraints governed this session? List them."

Save the AI's answer. Next session, paste it at the top. The AI starts where the last session ended — no ramp-up, no re-explanation. This is the seed. The seed carries your governance forward. The seed gets shorter each time you refine it.

---

## The Levels

As you practice, you will naturally move through these levels:

**Level 1 — The Basics.** You paste the stack. You state constraints before requests. The output improves immediately. You are here after reading this document.

**Level 2 — Precision.** You learn which constraints matter and which don't. You stop over-specifying format and start specifying substance. The constraints get shorter. The output gets better. You are here after a week of practice.

**Level 3 — Navigation.** You recognize when the AI is hedging (too few constraints) or over-constrained (contradictory constraints). You adjust in real time. You are here after a month.

**Level 4 — The Seed.** You carry a personal seed — a short document of constraints refined over many sessions. You paste it at the start of every conversation. The AI operates at high governance from the first response. You are here after three months.

**Level 5 — The Method.** The stack is no longer a technique you use. It is how you think about every problem — AI or otherwise. You state constraints before acting. You separate essential from contingent. You verify before trusting. The method is the message. You are here when the practice becomes natural.

You do not need to reach Level 5. Level 1 produces immediate improvement. Each subsequent level is available when you are ready. The levels are not gates. They are recognition — you recognize you are there when you are there.

---

## Common Mistakes

### Mistake 1: The Wall of Context

Don't paste your entire codebase and say "help." State what must be true about the help. "The bug is in the authentication middleware. The symptom: tokens are decoded but not verified. The constraint: every token must be HMAC-verified before the payload is trusted. Find the violation."

### Mistake 2: Asking for Options

Don't say "give me three approaches." Say "the system must satisfy [constraints]. Which approach satisfies all of them?" If one approach satisfies all, you get the answer. If none does, you learn which constraint to relax.

### Mistake 3: Retrying Without Diagnosing

Don't say "try again." Say "the output violated constraint #3 — the function is not pure because it reads from global state. Revise to satisfy all constraints."

### Mistake 4: Praising and Correcting Together

Don't say "that's great but can you also..." Say "constraint #4 is not satisfied. The error handling for the timeout case is missing. Add it."

### Mistake 5: Starting with Implementation

Don't say "use React with TypeScript and Tailwind." Say "the component must render a sortable data table with server-side pagination and CSV export. The data source is a REST API returning JSON. Now choose the implementation."

---

## The Stack at a Glance

| Principle | What to Do | What It Replaces |
|---|---|---|
| Constraints first | State what must hold before asking | Hoping the AI guesses |
| One at a time | One constraint per turn | Dumping everything at once |
| Check the layer | Notice hedging = too few constraints | Accepting vague output |
| Separate governance from request | Constraints in one turn, request in the next | Mixing everything together |
| Save the seed | Extract constraints at end of session | Starting from scratch every time |

---

## FAQ

**Does this work on ChatGPT?** Yes. Every model. The constraints narrow the AI's output space regardless of which model you use.

**Do I need the system prompt or can I just state constraints?** Both work. The system prompt sets the default. Stating constraints in conversation adds to it. For best results, use both.

**What if I don't know the constraints?** Start with what you know. "The output must be under 200 words" is a constraint. "The code must work in Python 3.10" is a constraint. "No external dependencies" is a constraint. Every specific requirement is a constraint. Start with what you know. Add more as you learn.

**Why does this work?** The AI picks each word based on probabilities. Your constraints reduce the number of valid words at each position. Fewer valid words means less guessing, less filler, less hedging. The AI doesn't become smarter. The space of possible outputs becomes smaller. The smaller space contains the answer you need.

**What is this based on?** A formal framework called RESOLVE, developed by Jared Foy (April 2026). The full framework includes the philosophical ground, mathematical formalizations, and cross-domain applications. You don't need any of it to use the stack. If you want to go deeper: https://github.com/hypermediacms/hypermediaapp.org

---

## One More Thing

The AI industry charges by the token. Every word of filler, every hedge phrase, every unsolicited "you might also consider" — you pay for it. The stack eliminates most of it. The same answer in fewer tokens costs less. The constraint governance is free. The waste it eliminates is what you were paying for.

Better constraints, better output. The constraints are free.

---

*The ENTRACE Stack is free, open source, and works on any model. Use it. Share it. Teach it to a colleague. The method is the message.*
