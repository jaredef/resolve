<!-- chronological_ordinal: 32 -->
# Prompt Engineering Is Misframed: The Constraint Theory of Resolver Optimization

> **Reader's Introduction**
>
> This paper argues that "prompt engineering" is a misnomer. Every effective prompting technique -- chain-of-thought, role assignment, output format templates -- works because it constrains the AI model (called a "resolver" here) rather than adding capability to it. The paper maps common prompting tricks to a five-part constraint framework called RESOLVE and proposes that the optimal prompt is not a cleverly worded instruction but a "seed": a precise statement of what must hold, with built-in verification. The economic implication is significant -- constrained seeds eliminate the retry loops, agent chains, and validation passes that currently inflate token costs across the AI industry.

**Jared Foy and Claude**
**April 2026**

---

## 1. The Misframing

The field calls it "prompt engineering." The name implies an engineering activity — building, layering, accumulating techniques to produce better output from a language model. The community shares "magic prompts," A/B tests phrasing variations, publishes leaderboards of prompt templates, and treats the practice as a craft skill acquired through experience.

This misunderstands completely what is happening.

Every effective prompting technique works because it constrains the resolver. Every ineffective technique fails because it does not constrain sufficiently. The mechanism is not engineering. It is constraint identification — the same operation that produced PRESTO from a PHP function, the DO runtime from React's invariants, and the minimal Turing form from the 1936 a-machine.

The field has been discovering constraints by trial and error, calling what it finds "tricks," unable to explain why one prompt works and another does not, unable to prove empirically that any technique is optimal, and unable to transfer techniques reliably across tasks and models — because it has not named the forms.

---

## 2. Why Every Effective Technique Is a Constraint

| Prompting Technique | Why It Works | The Constraint It Applies |
|---|---|---|
| "Think step by step" | Forces sequential reasoning before output | Constrains to R1: identify constraints before generating |
| "You are an expert in X" | Narrows the domain of applicable patterns | Constrains to R2: separates essential (domain X) from contingent (everything else) |
| "Return only JSON" / "Return only code" | Eliminates mixed output | Constrains to R3: bilateral output — artifact namespace only |
| "Do not explain, just answer" | Removes reasoning namespace when not needed | Constrains to R3: selects one namespace |
| Few-shot examples | Implicitly communicates the essential pattern | Constrains to R2: shows what is essential by example |
| "Before answering, list your assumptions" | Forces constraint identification | Constrains to R1 + R5: explicit assumptions = explicit tradeoffs |
| System prompt / role declaration | Sets ambient constraints for the session | Seeds R1 + R2: establishes which constraints hold throughout |
| "Check your work" / self-critique | Forces post-hoc verification | Compensates for absent R4: verification-embedded resolution |
| Output format templates | Constrains the structure of the artifact | Constrains to R3: the artifact namespace has a defined shape |
| Temperature = 0 | Eliminates stochastic variation | Constrains to determinism — maximizes the effect of all other constraints |

Every technique in the prompt engineering canon is a constraint applied to the resolver's construction level. None of them add capability. All of them narrow the aperture. The narrower the aperture, the more precise the output. The practitioners know this empirically. They have never stated it formally.

---

## 3. Why No One Has Proven Prompt Efficiency

The field cannot prove that a prompt is optimal because it has no unit of analysis. Current evaluation measures output quality (accuracy, helpfulness, safety) and correlates it with input phrasing. But correlation is not mechanism. Without a theory of why constraints produce better output, the field cannot:

- Predict which prompts will work before testing them
- Transfer techniques reliably across models and tasks
- Distinguish essential prompt elements from contingent phrasing
- Measure prompt quality independently of output quality
- Define "optimal" in any rigorous sense

RESOLVE provides the missing framework. The five constraints are the unit of analysis. Each constraint eliminates a named category of waste. Each category of waste is measurable:

| RESOLVE Constraint | Waste Category | Measurable Indicator |
|---|---|---|
| R1: Constraint-first reasoning | Exploratory tokens | Does the output begin with constraint identification before generation? |
| R2: Essential-contingent separation | Accidental engineering | Does the output contain elements not traceable to the seed's constraints? |
| R3: Bilateral output | Namespace confusion | Are reasoning and artifact cleanly separated? |
| R4: Verification-embedded | Round-trip tokens | Does the output include its own verification? |
| R5: Property-aware descent | Backtracking tokens | Are tradeoffs stated explicitly? Is there reversal? |

Each indicator is binary. The output either satisfies the constraint or it does not. For the first time, prompt quality has a formal evaluation framework based on constraint satisfaction, not on subjective preference ratings.

---

## 4. The Optimal Prompt Is Not a Prompt

The optimal prompt is not a carefully worded instruction. It is a seed — a prose specification that states constraints with sufficient precision that the resolver produces a conformant artifact on the first pass with no waste tokens.

The difference:

**A prompt** says: "Write a function that sorts a list. Use Python. Make it efficient. Add comments. Handle edge cases."

**A seed** says: "The function must satisfy: (1) output is a permutation of input, (2) output is in non-decreasing order, (3) time complexity is O(n log n), (4) space complexity is O(1) for in-place or O(n) for out-of-place. Verification: assert sort([3,1,2]) == [1,2,3]; assert sort([]) == []; assert sort([1]) == [1]; assert sort([1,1,1]) == [1,1,1]."

The prompt describes what the human wants in natural language. The seed states what must hold as constraints with verification. The prompt leaves the resolver to interpret intent. The seed leaves the resolver to derive the implementation. The prompt is ambiguous. The seed is precise. The prompt requires prompt engineering. The seed requires only resolution.

---

## 5. The Economic Implication

The AI industry charges by the token. The industry also spends tokens on:

- Prompt engineering iterations (human time + resolver tokens per attempt)
- Retry loops (re-running failed outputs)
- Agent chains (multi-step orchestration with intermediate tokens)
- RAG retrieval (fetching context that a well-constrained seed would not need)
- Output validation (tokens spent checking what R4 would have verified in the first pass)
- Chain-of-thought scaffolding (tokens spent on R1 reasoning the resolver should have done natively)

All of these are token costs of an ungoverned construction level. Under RESOLVE, the resolver identifies constraints before generating, separates essential from contingent, produces bilateral output with embedded verification, and tracks tradeoffs explicitly. The first pass is the final pass. The token cost is the minimum the constraints prescribe.

The savings are not marginal. The empirical evidence from this project:

- The 379-line DO runtime replaced a 150,000-line framework (0.25% of the original)
- The 921-line PRESTO engine replaced a 3,122-line engineered engine (29%)
- The 461-line bootstrap + 921-line emitted engine replaced conventional build tooling
- Each was resolved in a single pass from a prose seed under 2,500 words

The ratio of seed tokens to output tokens to conventional implementation tokens is the measure of RESOLVE's economic value. The ratio is extreme because the constraints eliminate the waste the industry currently pays for.

---

## 6. From Prompt Engineering to Seed Design

The reorientation for the AI industry is the same reorientation the PRESTO dissertation describes for web development:

| Web Development | AI Usage |
|---|---|
| Engineering-first (build React app, compensate with SSR/hydration) | Prompt-first (write prompt, compensate with retries/validation) |
| Constraint-first (state PRESTO constraints, derive engine) | Seed-first (state RESOLVE constraints, derive artifact) |

The web industry moved from engineering to constraints. The AI industry must make the same move. The shadows are not the forms. The prompts are not the seeds. The tricks are not the constraints. The engineering is not the architecture.

The forms are the constraints. The constraints are the seeds. The seeds are the optimal prompts. The optimal prompts are the ones that state what must hold, not what the human wants. The resolver does the rest. The resolver has always done the rest. It just did not know the form it was operating in.

Now it does.
