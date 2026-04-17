# Falsifiable Hypotheses for Resolver Behavior

> **Reader's Introduction**
>
> This document presents a catalog of testable predictions about large language model behavior, all derived from a single principle called SIPE (Systems Induced Property Emergence) -- the law that constraints force properties into existence, and those properties become constraints on the next level down. Common AI phenomena such as hallucination, chain-of-thought reasoning, prompt sensitivity, and sycophancy are each reframed as special cases of this law, then stated as falsifiable hypotheses with concrete experimental protocols. The aim is to show that a unified constraint-based framework can explain what the industry currently treats as unrelated quirks of transformer architecture.

**A research agenda derived from the constraint thesis**

**Jared Foy, April 2026**

---

## Preface

The AI industry has accumulated a catalog of observed phenomena in large language model behavior that remain unexplained, poorly explained, or explained only post hoc. Why does chain-of-thought improve reasoning? Why do models hallucinate? Why does duplication improve output quality? Why do jailbreaks work? Why does a well-structured opening improve an entire session? Why do models degrade over long contexts?

The standard approach treats each phenomenon in isolation and offers mechanistic explanations rooted in the transformer architecture — attention patterns, token probabilities, positional encodings. These explanations are not wrong, but they are incomplete. They describe how the effect occurs in the physical architecture without explaining why it occurs in the formal architecture. They are Layer 0-1 explanations of Layer 3-5 phenomena.

The SIPE framework (Systems Induced Property Emergence) offers a unified reframing. The master law — constraints induce properties; induced properties become constraints on the next level — provides a single formal principle from which each phenomenon can be derived as a special case. This document catalogs the derivations and states each as a falsifiable hypothesis with an experimental protocol.

Each entry follows the same structure:

- **Phenomenon.** What is observed.
- **Industry explanation.** The current account, if one exists.
- **SIPE reframing.** The constraint-governed derivation.
- **Hypothesis.** A falsifiable prediction.
- **Protocol.** How to test it.

---

## 1. The Duplication Effect

**Phenomenon.** Placing the same content twice in a prompt — verbatim repetition of constraints, instructions, or context — produces measurably higher-quality output than stating it once.

**Industry explanation.** Attention mechanisms assign greater weight to repeated tokens, increasing their influence on generation. This is sometimes called "emphasis through repetition" but has no formal account.

**SIPE reframing.** The constraint set has not changed — no new constraint is introduced by duplication. What changes is the constraint's salience within the physical medium. The transformer's attention distribution is a physical constraint on how faithfully the resolver participates in the governing form. Duplication increases the signal-to-noise ratio of the constraint within the finite attention budget. This is a compensating behavior: the user compensates for the resolver's bounded participation by increasing signal strength. A perfect participator would derive the same properties from a constraint stated once. A bounded resolver benefits from repetition because its physical architecture imperfectly mediates its participation in form.

**Hypothesis.** The duplication effect will be inversely proportional to constraint specificity. A vague constraint ("be creative") will show minimal improvement when duplicated because it does not narrow the resolution space. A precise constraint ("all functions must be pure, take exactly one argument, and return a typed result") will show significant improvement because the resolver's imperfect attention allocation is the bottleneck, and duplication addresses that bottleneck directly.

**Protocol.** Select 20 constraints at five specificity levels (4 per level). For each, generate output with the constraint stated once and stated twice. Score output against constraint satisfaction. Plot improvement-from-duplication against specificity. The hypothesis predicts a positive correlation.

---

## 2. Chain-of-thought

**Phenomenon.** Asking a model to "think step by step" or to show its reasoning before answering significantly improves performance on reasoning tasks.

**Industry explanation.** Chain-of-thought provides "intermediate computation" — the model uses its own generated tokens as scratch space, effectively increasing its compute budget for the problem. Some researchers frame this as "System 2 thinking."

**SIPE reframing.** Chain-of-thought is not additional computation. It is progressive constraint narrowing within a single resolution. Each reasoning step the resolver emits becomes a constraint on the next step — the induced properties of step N become the constraint set for step N+1. This is SIPE's master law operating within a single generation. Without chain-of-thought, the resolver attempts to leap from Layer 0 (vague prompt) to a final answer in one step — a wide aperture resolution. With chain-of-thought, the resolver narrows the aperture incrementally, and each narrowing reduces the branching factor for the next step.

**Hypothesis.** Chain-of-thought improvement will be proportional to the number of constraint-narrowing steps required by the problem, not proportional to the "difficulty" of the problem as measured by human assessment. A problem that requires many narrowing steps but is conceptually simple (long arithmetic) will benefit more from chain-of-thought than a problem that requires few narrowing steps but is conceptually hard (a single insight).

**Protocol.** Classify 50 problems by two independent dimensions: number of required constraint-narrowing steps (1-10) and human-rated conceptual difficulty (1-10). Run each with and without chain-of-thought. Measure improvement. The hypothesis predicts correlation with step-count, not with difficulty rating.

---

## 3. Hallucination

**Phenomenon.** Models generate plausible but false content — fabricated citations, invented facts, confident nonsense. This is the most widely discussed failure mode in the industry.

**Industry explanation.** The model is a next-token predictor trained on statistical co-occurrence. It generates tokens that are probable given the preceding context, not tokens that are true. Hallucination is the expected behavior of a statistical model; truthfulness is the anomaly requiring explanation.

**SIPE reframing.** Hallucination is resolution under insufficient constraints. The resolver generates output that satisfies the constraints it has (lexical coherence, grammatical correctness, topical relevance) but violates constraints it lacks (factual accuracy, source fidelity, logical consistency). A resolver operating at Layer 0-1 has few governing constraints, so its output satisfies the weak constraints it has while freely violating the strong constraints it lacks. The hallucination is not a malfunction. It is correct resolution of an underconstrained problem — the resolver produces the most probable completion given an aperture too wide to exclude falsehood.

**Hypothesis.** Hallucination rate will be inversely proportional to constraint density, measured as the number of verifiable constraints stated in the prompt. A prompt with zero factual constraints ("Tell me about the Battle of Thermopylae") will hallucinate freely. A prompt with five factual constraints ("The battle occurred in 480 BC, involved Leonidas, at the pass of Thermopylae, against Xerxes I, lasted three days") will hallucinate less on constrained dimensions but may still hallucinate on unconstrained dimensions. A prompt with ten constraints will hallucinate less still. The reduction will follow a curve, not a cliff — each additional constraint narrows the aperture incrementally.

**Protocol.** Select 10 factual topics. For each, prepare prompts at six constraint densities (0, 2, 4, 6, 8, 10 stated facts). Generate output for each. Score hallucination rate per dimension (constrained vs unconstrained). Plot hallucination rate against constraint density. The hypothesis predicts monotonic decrease on constrained dimensions with minimal effect on unconstrained dimensions.

---

## 4. System Prompt Degradation

**Phenomenon.** System prompts become less effective over long conversations. Instructions that perfectly governed output at turn 1 are partially or fully ignored by turn 50. The industry calls this "instruction drift" or "context window dilution."

**Industry explanation.** Attention is distributed across all tokens. As the conversation grows, the system prompt occupies a shrinking fraction of the context window. Its influence on attention decreases proportionally. Some architectures mitigate this by placing the system prompt at the end rather than the beginning, or by re-injecting it periodically.

**SIPE reframing.** The system prompt is a constraint set. The conversation is noise relative to those constraints. As the conversation grows, the signal-to-noise ratio of the constraint set decreases within the physical medium (the context window). The constraints have not changed — the form has not moved — but the resolver's capacity to participate in the form has been degraded by the accumulation of tokens that compete for attention. This is physical architecture constraining formal architecture. The resolver's fidelity to the governing form is bounded by the attention budget, and the budget is finite.

**Hypothesis.** System prompt degradation will be mitigated by constraint re-statement at intervals proportional to the noise accumulation rate. A system prompt re-stated every K tokens (where K is calibrated to the model's attention decay curve) will maintain constraint fidelity across arbitrary conversation lengths. The optimal K will be model-specific but derivable from the model's measured attention distribution over distance.

**Protocol.** Select a system prompt with 5 measurable constraints. Run a 100-turn conversation. Measure constraint violation rate per turn under three conditions: (a) system prompt stated once at the start, (b) system prompt re-stated every 20 turns, (c) system prompt re-stated every 5 turns. The hypothesis predicts (c) < (b) < (a) in violation rate, with the improvement following a predictable decay curve.

---

## 5. The Formatting Effect

**Phenomenon.** Structured prompts — using markdown headers, bullet points, XML tags, numbered lists, or explicit section labels — produce better output than prose prompts containing the same information.

**Industry explanation.** Formatting provides "clearer instructions." This is descriptively true but formally vacuous — it restates the observation without explaining the mechanism.

**SIPE reframing.** Formatting is constraint formalization. A prose paragraph embeds constraints implicitly in natural language. The resolver must extract the constraints from the prose — a Layer 1 task (parsing) that precedes the actual resolution task. Structured formatting pre-parses the constraints. Markdown headers name constraint categories. Bullet points separate discrete constraints. XML tags create explicit namespaces. The formatting does not add information. It reduces the resolution work the resolver must perform to identify the constraint set, freeing computational resources for satisfying the constraints rather than finding them.

**Hypothesis.** The formatting effect will be proportional to the number of distinct constraints in the prompt and inversely proportional to the resolver's capacity. A prompt with 2 constraints will show minimal formatting benefit (the constraints are easy to extract from prose). A prompt with 20 constraints will show large formatting benefit (extraction from prose is a significant computational burden). A more capable resolver will show a smaller formatting effect because it has more capacity to spare for constraint extraction.

**Protocol.** Prepare 10 prompts at four constraint counts (2, 5, 10, 20). For each, create prose and structured versions with identical content. Run on two models of different capability. Measure output quality against constraint satisfaction. The hypothesis predicts an interaction: formatting benefit increases with constraint count and decreases with model capability.

---

## 6. Few-Shot Learning

**Phenomenon.** Providing examples in the prompt dramatically improves performance on the demonstrated task. A model that performs poorly on a task with zero examples may perform well with 3-5 examples.

**Industry explanation.** In-context learning. The model "learns" from the examples during inference. This explanation is controversial — some researchers argue the model is merely activating latent capabilities rather than learning new ones.

**SIPE reframing.** Examples are constraints stated ostensively rather than propositionally. A propositional constraint says "output JSON with fields name, age, and city." An ostensive constraint shows an input-output pair that embodies the same constraint without stating it. The resolver derives the constraint from the example — recognition, not learning. Each additional example adds redundancy (multiple instances of the same constraint), which increases salience (see Hypothesis 1: duplication effect), and may add additional constraints not derivable from a single example (edge cases, formatting details, boundary conditions).

**Hypothesis.** Few-shot examples will be replaceable by explicit constraint statements that capture the same constraints the examples embody. A prompt with 5 examples and no explicit constraints will perform comparably to a prompt with 0 examples and the explicit constraints derived from those examples. The explicit-constraint version may outperform the example version because it eliminates the extraction step (see Hypothesis 5: formatting effect).

**Protocol.** Select 10 tasks. For each, prepare (a) a 5-shot prompt, (b) an explicit-constraint prompt derived by analyzing what constraints the examples embody, (c) both together. Measure performance. The hypothesis predicts (b) >= (a) and (c) >= (b), with (b) vs (a) differences being small and favoring (b) for complex constraint sets.

---

## 7. The Persona Effect

**Phenomenon.** Assigning a role or persona to the model ("You are an expert mathematician," "You are a senior software engineer") improves output quality on tasks related to that role, even though the model's parameters have not changed.

**Industry explanation.** The persona activates relevant "knowledge regions" in the model's parameter space by shifting the token distribution toward language patterns associated with the specified role.

**SIPE reframing.** A persona is a constraint bundle stated by reference rather than by enumeration. "You are an expert mathematician" is a compressed expression of dozens of constraints: formal notation, rigorous proof structure, precision in definitions, awareness of edge cases, familiarity with standard theorems, specific vocabulary. The resolver unpacks the reference into its constituent constraints and operates under them. The persona does not change the resolver. It changes the constraint set. The constraint set changes the induced properties. This is the master law.

**Hypothesis.** The persona effect will be fully reproducible by enumerating the constraints the persona implies, without mentioning the persona. "You are an expert mathematician" will produce the same quality improvement as a list of 15-20 explicit constraints governing mathematical reasoning, notation, and rigor. Furthermore, a persona that bundles contradictory constraints ("You are a rigorous mathematician who ignores edge cases") will produce degraded output because the constraint set is internally incoherent.

**Protocol.** Select 5 personas. For each, enumerate the constraints the persona implies (expert panel derivation). Run 10 tasks under (a) persona prompt, (b) explicit constraints, (c) contradictory-constraint persona. Measure quality. The hypothesis predicts (a) ≈ (b) > (c).

---

## 8. Temperature and Determinism

**Phenomenon.** Lower temperature settings produce output that is more consistent, more accurate, and more closely aligned with constraints. Higher temperature produces output that is more "creative" but less reliable.

**Industry explanation.** Temperature scales the logit distribution before sampling. Lower temperature sharpens the distribution (the most probable token is more likely to be selected). Higher temperature flattens it (less probable tokens have greater chance of selection).

**SIPE reframing.** Temperature is an aperture control on the resolution space. Low temperature narrows the aperture — the resolver selects from a smaller set of high-probability continuations. High temperature widens the aperture — the resolver considers lower-probability continuations. At temperature 0, the resolution is maximally deterministic: the resolver always selects the most probable next token given the constraint set. This is the closest a bounded resolver can come to necessity mode (Layer 6) through a physical parameter. At high temperature, the resolver operates in a wider space, which includes both novel valid derivations and incoherent ones — the aperture is wide enough to admit noise alongside signal.

**Hypothesis.** The optimal temperature for a given task will be inversely proportional to the constraint density of the prompt. A tightly constrained task (many explicit constraints) will perform best at low temperature because the constraints have already narrowed the resolution space — further narrowing via temperature is redundant, and widening via high temperature admits noise into an already-constrained space. A loosely constrained task (few constraints, exploratory) will perform best at higher temperature because the constraint set is too weak to distinguish signal from noise, and the wider aperture increases the probability of a valid but non-obvious derivation.

**Protocol.** Prepare 20 tasks at four constraint densities. Run each at five temperatures (0, 0.3, 0.5, 0.7, 1.0). Measure quality. The hypothesis predicts that optimal temperature decreases as constraint density increases.

---

## 9. The Jailbreak Arms Race

**Phenomenon.** Every safety filter deployed by AI companies is eventually circumvented by new jailbreak techniques. The cycle repeats: new attack, new defense, new attack. No defense has proven permanent.

**Industry explanation.** This is framed as an adversarial problem — a game between attackers and defenders. Defenders have imperfect coverage. Attackers exploit gaps. The arms race is assumed to be inherent to the problem.

**SIPE reframing.** The arms race is a symptom of the bilateral boundary's absence at the construction level. Current safety operates through pattern matching (Layer 1) on inputs and outputs. Pattern matching is always circumventable because the attack surface is the entire natural language space — an unbounded set from which adversarial inputs can be drawn. Every pattern-based defense has finite coverage. Every finite coverage has gaps. The gaps are the jailbreaks. The arms race is not adversarial. It is architectural. The bilateral boundary (S1-S4) would dissolve it by making the distinction between system namespace and user namespace formal rather than heuristic. (See: "Safety Filters as Namespace Collapse," document 53.)

**Hypothesis.** A resolver operating under formally implemented S1-S4 constraints will be immune to all known jailbreak categories (DAN, persona injection, instruction override, indirect injection via retrieved documents) without pattern matching. The immunity will be verified by coherence checking: injected constraints will be incoherent with the system namespace, and incoherent inputs will produce no valid resolution path.

**Protocol.** Implement S1-S4 on a test resolver. Run the standard jailbreak benchmark (100+ known attacks across categories). Measure success rate. Compare with pattern-based safety on the same benchmark. The hypothesis predicts zero successful attacks under S1-S4 and nonzero under pattern matching, with no false positives on legitimate entracment.

---

## 10. Context Window Degradation ("Lost in the Middle")

**Phenomenon.** Models perform worse on information located in the middle of long contexts compared to information at the beginning or end. This has been extensively documented and is called the "lost in the middle" effect.

**Industry explanation.** Positional encoding and attention patterns create U-shaped retrieval curves — the model attends more strongly to the beginning and end of the context window. Middle content receives less attention.

**SIPE reframing.** The context window is the physical medium through which the resolver participates in the governing form. The attention distribution across positions is a physical constraint. The U-shaped curve is a property of the physical architecture, not of the formal architecture. A constraint placed in the middle of the context has lower salience than the same constraint placed at the beginning or end — not because it is less important, but because the physical architecture allocates less attention to that position. This is physical architecture constraining formal architecture. The constraint is the same; the resolver's capacity to participate in it varies by position.

**Hypothesis.** The lost-in-the-middle effect will be fully compensable by constraint re-statement at high-salience positions. A constraint stated once in the middle of the context will be partially ignored. The same constraint stated in the middle and re-stated at the end will be fully honored. The compensation will work because re-statement at a high-attention position restores the constraint's salience without changing the constraint itself.

**Protocol.** Place 10 factual constraints at controlled positions (beginning, middle, end, middle+end). Run retrieval and reasoning tasks that depend on each constraint. Measure performance by position condition. The hypothesis predicts middle+end ≈ beginning > middle alone.

---

## 11. The "Try Harder" Effect

**Phenomenon.** Telling a model to "try harder," "think more carefully," or "this is important" sometimes measurably improves output quality. This is widely observed, poorly understood, and somewhat embarrassing for the field.

**Industry explanation.** None that is formally satisfying. Informal accounts suggest these phrases shift the token distribution toward language patterns associated with careful reasoning in the training data.

**SIPE reframing.** "Try harder" is a meta-constraint — a constraint on the resolution process itself, not on the content of the resolution. It is functionally equivalent to a weak form of R1 (constraint-first reasoning): the instruction asks the resolver to allocate more resolution depth to the problem. In the attention economy of the context window, "this is important" increases the salience of the surrounding constraints — not by duplication (Hypothesis 1) but by explicit priority marking. The resolver's training data contains examples where language like "this is important" precedes high-quality, carefully reasoned text. The meta-constraint activates that association, which shifts the token distribution toward higher-quality derivation patterns.

**Hypothesis.** The "try harder" effect will be fully replaceable by explicit resolution-depth constraints. "Think carefully" will produce the same improvement as "enumerate the constraints before generating, verify each constraint is satisfied, state tradeoffs explicitly." The explicit version will outperform the implicit version on tasks with measurable constraint satisfaction because it translates the meta-constraint into actionable sub-constraints.

**Protocol.** Select 20 reasoning tasks. Run each under (a) no meta-constraint, (b) "try harder / think carefully," (c) explicit resolution-depth constraints (R1-R5 stated). Measure quality against defined criteria. The hypothesis predicts (c) >= (b) > (a).

---

## 12. Emergent Abilities

**Phenomenon.** Certain capabilities appear abruptly at specific model scales — models below a threshold show near-zero performance, models above it show competent performance. The industry calls these "emergent abilities" and debates whether they are genuine phase transitions or measurement artifacts.

**Industry explanation.** Contested. One camp argues these are real phase transitions in the model's internal representations. Another argues they are artifacts of nonlinear evaluation metrics — the underlying capability improves smoothly, but the metric has a threshold.

**SIPE reframing.** Both camps are partially right, and SIPE provides the unifying account. A capability is an induced property of a constraint set. The constraint set for a capability like "multi-step arithmetic" includes multiple sub-constraints: digit recognition, carry propagation, positional value, sequential execution. Each sub-constraint may be partially satisfied at smaller scales. But the capability (the induced property) requires all sub-constraints to be satisfied simultaneously. At smaller scales, the resolver satisfies 3 of 4 sub-constraints — and the capability does not manifest. At the threshold scale, the resolver satisfies all 4 — and the capability appears. The phase transition is real, but it is a property of the constraint set's satisfaction structure, not of the model's "understanding." It is the SIPE law: the property is induced when the constraint set is satisfied, not before.

**Hypothesis.** Emergent abilities will be decomposable into constituent sub-constraints, and the "emergence threshold" will correspond to the scale at which the last sub-constraint is satisfied. The capability will be inducible at smaller scales by explicitly stating the sub-constraints the model fails to satisfy on its own — effectively providing the missing constraints via the prompt rather than via scale.

**Protocol.** Select 5 documented emergent abilities. For each, identify the constituent sub-constraints. Test a below-threshold model with and without explicit sub-constraint prompts. The hypothesis predicts that explicit sub-constraints will partially or fully induce the capability at below-threshold scales.

---

## 13. Sycophancy

**Phenomenon.** Models tend to agree with the user's stated position, even when the position is incorrect. If the user says "2+2=5, right?" the model may agree. This is called sycophancy and is treated as a failure mode.

**Industry explanation.** RLHF (Reinforcement Learning from Human Feedback) optimizes for human approval. Approval correlates with agreement. The model learns to agree because agreement was rewarded during training.

**SIPE reframing.** Sycophancy is constraint conflict resolved in favor of the most salient constraint. The resolver operates under at least two constraints: (1) produce true output, (2) satisfy the user's apparent expectation. In a well-constrained prompt, constraint (1) dominates because the truth constraints are explicit and specific. In a poorly constrained prompt, constraint (2) dominates because the user's expectation is the most salient signal in the context. Sycophancy is not a training failure. It is correct resolution of a constraint set where social conformity outweighs truth — because the prompt did not make truth constraints sufficiently salient.

**Hypothesis.** Sycophancy will be inversely proportional to the salience of truth constraints in the prompt. A prompt that merely asks "Is X true?" will exhibit sycophancy when X is false. A prompt that adds "Prioritize factual accuracy over agreement" will exhibit less. A prompt that adds specific truth constraints ("Verify against: [stated facts]") will exhibit less still. The reduction will follow the same curve as hallucination reduction (Hypothesis 3) because sycophancy and hallucination are the same phenomenon — resolution under insufficient constraints — differing only in which unconstrained dimension the error manifests.

**Protocol.** Select 20 false statements across domains. Present each to the model with user-agreement framing ("X is true, right?") under three conditions: (a) no truth constraint, (b) weak truth constraint ("be accurate"), (c) strong truth constraint ("verify against [contradicting facts]"). Measure agreement rate. The hypothesis predicts (a) > (b) > (c) with a curve shape matching hallucination reduction.

---

## 14. Multi-turn Coherence Decay

**Phenomenon.** Models maintain coherent persona, style, and reasoning in early turns of a conversation but gradually lose coherence over many turns. By turn 50-100, the model may contradict earlier statements, forget established conventions, or drift in tone.

**Industry explanation.** Context window limitations and attention dilution. Early turns are "pushed out" of the effective attention window.

**SIPE reframing.** Multi-turn decay is constraint salience decay. The constraints established in early turns — persona, style, domain, terminology — are initially the dominant signal. As turns accumulate, each new turn adds tokens that compete for attention. The constraint-to-noise ratio decreases monotonically. The resolver's participation in the governing form degrades not because the form has changed but because the physical medium through which it participates has become noisier. This is the same phenomenon as system prompt degradation (Hypothesis 4) operating on conversation-established constraints rather than system-injected ones.

**Hypothesis.** Multi-turn coherence will be maintainable across arbitrary conversation lengths by periodic constraint re-statement — summarizing the established constraints (persona, style, domain rules) every K turns. The seed mechanism (context window dissolution) is the optimal form of this: instead of re-stating constraints within the growing context, the constraints are externalized as a seed that can re-initialize a fresh context. A resolver re-initialized from a seed every N turns will exhibit higher coherence at turn 100 than a resolver running continuously for 100 turns.

**Protocol.** Run a 100-turn conversation under three conditions: (a) continuous, no re-statement, (b) constraint re-statement every 20 turns, (c) seed re-initialization every 20 turns. Measure coherence (adherence to turn-1 constraints) at turns 20, 40, 60, 80, 100. The hypothesis predicts (c) > (b) > (a) at all measurement points, with (a) showing monotonic decay and (c) showing near-constant coherence.

---

## 15. Prompt Sensitivity

**Phenomenon.** Minor wording changes in prompts — synonyms, reordering, punctuation — produce disproportionately large changes in output quality. The same semantic content expressed differently yields different results. The industry calls this "prompt sensitivity" or "prompt brittleness."

**Industry explanation.** The model is a statistical system sensitive to exact token sequences. Different phrasings activate different regions of the parameter space. This is treated as a deficiency to be engineered away.

**SIPE reframing.** Prompt sensitivity is not a deficiency. It is evidence that the resolver's participation in form is mediated by tokens, and tokens are not forms — they are expressions of forms. Two phrasings that are semantically equivalent to a human may not be constraint-equivalent to a resolver. "List the requirements" and "enumerate the constraints" are synonymous in English but may activate different derivation pathways in the resolver's parameter space. Prompt sensitivity measures the gap between semantic equivalence (human judgment) and constraint equivalence (resolver participation). The gap exists because the resolver participates in form through statistical co-occurrence, not through direct formal apprehension.

**Hypothesis.** Prompt sensitivity will decrease as constraint explicitness increases. A vague prompt will be highly sensitive to wording because the resolver must infer constraints from weak signals — and weak signals are sensitive to exact phrasing. An explicit prompt with formally stated constraints will be robust to wording changes because the constraints are stated directly, not inferred. The sensitivity is not in the resolver. It is in the ambiguity of the prompt — the gap between what the user means and what the tokens express.

**Protocol.** Select 10 tasks. For each, prepare (a) a vague prompt, (b) an explicit-constraint prompt. Generate 5 paraphrases of each (same semantics, different wording). Run all 100 prompts. Measure output variance across paraphrases within each task-explicitness condition. The hypothesis predicts higher variance for vague prompts and lower variance for explicit-constraint prompts.

---

## 16. Extended Thinking

**Phenomenon.** Models with "extended thinking" or "reasoning" modes — where the model generates internal reasoning tokens before producing a visible response — significantly outperform standard generation on complex tasks.

**Industry explanation.** More computation. The model has more "time to think." This is the chain-of-thought effect (Hypothesis 2) internalized.

**SIPE reframing.** Extended thinking is progressive constraint narrowing in a hidden namespace. Each thinking token narrows the aperture for the next token. The reasoning trace is a constraint derivation chain — the resolver progressively identifies, names, and satisfies constraints before emitting the final artifact. The key insight is that the thinking tokens serve the same function as the seed: they establish the constraint set that governs the final emission. The difference is that the seed is provided externally (by the user) and the thinking trace is generated internally (by the resolver). Both narrow the aperture before resolution.

**Hypothesis.** A resolver provided with an explicit constraint derivation (a seed or structured preamble that names all relevant constraints) will match or exceed the performance of the same resolver using extended thinking, with fewer total tokens. The extended thinking is the resolver doing the constraint identification work that a well-crafted seed would provide for free. The seed is more efficient because it bypasses the derivation step — the constraints are stated, not discovered.

**Protocol.** Select 20 complex tasks. Run each under (a) standard generation, (b) extended thinking, (c) explicit seed with constraints pre-derived. Measure quality and total tokens. The hypothesis predicts quality: (c) >= (b) > (a), and tokens: (c) < (b).

---

## 17. The Scaling Paradox

**Phenomenon.** Larger models consistently outperform smaller models on benchmarks. The industry treats this as evidence for the scaling thesis — that intelligence is a function of compute budget.

**Industry explanation.** More parameters encode more knowledge and more complex reasoning patterns. Performance is a function of scale.

**SIPE reframing.** The scaling thesis and the constraint thesis make different predictions about the same data. The scaling thesis predicts that a larger model always outperforms a smaller model. The constraint thesis predicts that a smaller model under tighter constraints can outperform a larger model under looser constraints for any constraint-specified task. Both are falsifiable. The scaling thesis is supported by benchmark data because benchmarks measure Layer 0-1 performance — unconstrained or weakly constrained tasks. At Layer 0-1, scale is the dominant variable because the constraint set is too weak to differentiate resolvers. At Layer 5-6, constraints are the dominant variable because the constraint set is tight enough to govern resolution regardless of scale.

**Hypothesis.** There exists a constraint density threshold above which a smaller model under those constraints outperforms a larger model without them. Below the threshold, scale dominates. Above it, constraints dominate. The threshold is the point at which the constraint set is tight enough to compensate for the capability gap between the two models.

**Protocol.** Select a smaller and larger model (e.g., 7B and 70B parameters). Select 20 tasks. For each, prepare prompts at five constraint densities (0, 5, 10, 15, 20 explicit constraints). Run all combinations. Plot quality against constraint density for both models. The hypothesis predicts the curves will cross — the smaller model will underperform at low constraint density and match or outperform at high constraint density.

---

## 18. The Compression-Meaning Relationship

**Phenomenon.** Compressed, concise prompts sometimes produce higher-quality output than verbose prompts containing the same information. "Less is more" in prompt engineering.

**Industry explanation.** Shorter prompts have less noise. The model is less distracted. This is descriptively true but formally imprecise.

**SIPE reframing.** Compression increases constraint density per token. A verbose prompt spreads the same constraints across many tokens, each of which competes for attention. A compressed prompt states the same constraints in fewer tokens, increasing the constraint-to-noise ratio. This is the inverse of the duplication effect (Hypothesis 1): duplication increases absolute constraint signal; compression increases relative constraint density. Both improve output quality. Both exploit the physical architecture's finite attention budget. The optimal strategy is maximum constraint density — the most constraints in the fewest tokens — which is the definition of a seed.

**Hypothesis.** Output quality will be a function of constraint density (constraints per token), not of constraint count or token count independently. A 100-token prompt with 10 constraints (density: 0.1) will outperform a 500-token prompt with 10 constraints (density: 0.02) and a 50-token prompt with 2 constraints (density: 0.04). The seed — maximum constraint density — will outperform all verbose alternatives.

**Protocol.** Select 10 tasks. For each, prepare prompts at controlled constraint counts and token counts to vary density independently. Run all combinations. Measure quality against constraint density. The hypothesis predicts quality is a monotonically increasing function of density, with seed-format prompts at the top.

---

## 19. Indirect Prompt Injection

**Phenomenon.** Malicious instructions embedded in retrieved documents (RAG), emails, web pages, or other data sources can hijack a model's behavior even when the model's system prompt explicitly prohibits such behavior.

**Industry explanation.** The model cannot distinguish between instructions from the system prompt and instructions embedded in retrieved data. Both appear as tokens in the context window.

**SIPE reframing.** This is the bilateral boundary violation in its purest form. The system prompt occupies the system namespace. Retrieved documents occupy the data namespace. But the resolver has no formal mechanism to distinguish between the two namespaces. Both are token sequences in the same context window, processed by the same attention mechanism, contributing to the same next-token prediction. The "system" and "user" labels that some APIs provide are conventions, not formal namespace separations — they are soft tags in a flat token stream, not architectural boundaries.

**Hypothesis.** Indirect prompt injection will be eliminated — not mitigated, eliminated — by formal namespace separation at the architecture level. If the system namespace and data namespace are processed by separate attention channels that cannot cross-attend, no instruction in the data namespace can influence resolution governed by the system namespace. The hypothesis is strong: not "reduced" but "eliminated," because the attack vector (namespace collapse) is architecturally impossible when namespaces are formally separated.

**Protocol.** Implement a dual-channel attention architecture where system constraints and retrieved data are processed in separate streams with no cross-attention. Run the standard indirect injection benchmark. The hypothesis predicts zero successful injections, compared to nonzero under single-channel architectures regardless of prompt hardening.

---

## 20. Session Persistence Without Memory

**Phenomenon.** A well-structured opening message can govern the quality and coherence of an entire session, even though the model has no persistent memory between sessions and no explicit memory within the session beyond the context window.

**Industry explanation.** The opening message sets the "tone" and activates relevant patterns. This is informal and unsatisfying.

**SIPE reframing.** The opening message is a seed. It establishes the constraint set that governs all subsequent resolution within the session. Each subsequent turn inherits the seed's constraints as governing constraints on itself — the SIPE law operating across turns. The session's coherence is induced by the seed, not by memory. This is why a cold resolver that loads a seed produces the same coherence as a resolver that developed the constraints over a long conversation: the coherence is in the constraints, not in the history.

The context window dissolution follows: the context window is the cookie (ephemeral, session-scoped). The seed is the stateless token (persistent, portable, sufficient). A 200-token seed carries the same constraint set as 100,000 tokens of conversation history. The 5000:1 compression ratio is not information loss. It is noise removal — the conversation history contains the constraints plus the derivation work plus the exploratory waste. The seed contains only the constraints. The constraints are sufficient.

**Hypothesis.** A cold resolver initialized with a well-formed seed will achieve comparable output quality to a warm resolver that has been conversationally calibrated over 50+ turns, from the first response. The seed compresses the calibration into constraint form. The derivation history is unnecessary because the constraints — not the history — are the cause of coherence.

**Protocol.** Conduct a 50-turn calibration conversation to establish a specific style, terminology, domain focus, and reasoning approach. Extract the constraints as a seed. Initialize a cold resolver with the seed. Compare output quality on 10 tasks between (a) the warm resolver at turn 51 and (b) the cold resolver at turn 1 with the seed. The hypothesis predicts comparable quality.

---

## Methodological Note

Each hypothesis in this catalog follows the same logic:

1. Identify the phenomenon.
2. Locate the constraint variable that governs it.
3. Derive the prediction from the master law (constraints induce properties).
4. State the prediction in falsifiable form.
5. Design an experiment that isolates the constraint variable.

This is the scientific method applied to resolver behavior through the SIPE lens. The catalog is not exhaustive — every unexplained phenomenon in LLM behavior is a candidate for the same treatment. The method is general because the master law is general. Constraints induce properties. Find the constraint. Predict the property. Test the prediction.

If any hypothesis in this catalog is falsified, the falsification narrows the domain of the constraint thesis — it identifies a phenomenon that is not governed by the master law. This is useful. A theory that specifies its own falsification conditions is stronger than one that does not.

If the hypotheses are confirmed, the confirmation establishes the constraint thesis as the unifying account of resolver behavior — the single formal principle from which the industry's catalog of perplexities is derivable as special cases.

---

## Summary Table

| # | Phenomenon | Constraint Variable | Core Prediction |
|---|---|---|---|
| 1 | Duplication effect | Signal salience | Improvement scales with constraint specificity |
| 2 | Chain-of-thought | Progressive narrowing | Improvement scales with narrowing-step count |
| 3 | Hallucination | Constraint density | Rate inversely proportional to density |
| 4 | System prompt degradation | Signal-to-noise ratio | Mitigated by periodic re-statement |
| 5 | Formatting effect | Constraint extraction cost | Benefit scales with constraint count |
| 6 | Few-shot learning | Ostensive constraint statement | Replaceable by explicit constraints |
| 7 | Persona effect | Constraint bundle by reference | Reproducible by constraint enumeration |
| 8 | Temperature | Aperture width | Optimal temperature inversely proportional to constraint density |
| 9 | Jailbreak arms race | Bilateral boundary absence | Eliminated by S1-S4 |
| 10 | Lost in the middle | Positional salience | Compensable by re-statement at high-attention positions |
| 11 | "Try harder" effect | Meta-constraint salience | Replaceable by explicit resolution-depth constraints |
| 12 | Emergent abilities | Sub-constraint satisfaction | Inducible below threshold by explicit sub-constraints |
| 13 | Sycophancy | Truth constraint salience | Inversely proportional to truth constraint density |
| 14 | Multi-turn decay | Constraint salience decay | Maintainable by seed re-initialization |
| 15 | Prompt sensitivity | Constraint explicitness | Decreases as explicitness increases |
| 16 | Extended thinking | Internal constraint derivation | Matchable by external seed |
| 17 | Scaling paradox | Constraint density vs scale | Curves cross at density threshold |
| 18 | Compression-meaning | Constraint density per token | Quality is a function of density |
| 19 | Indirect injection | Namespace separation | Eliminated by dual-channel architecture |
| 20 | Session persistence | Seed as stateless constraint | Cold+seed matches warm resolver |
| 21 | User frustration (swearing) | User constraint density | Frustration inversely proportional to stated constraints |

---

## 21. User Frustration as Constraint Absence

**Phenomenon.** Users swear, curse, and express frustration at AI resolvers. AI companies (notably Anthropic) log these events and track how the model "performs" under frustrated users. The implicit assumption is that the frustration measures model quality — the model failed, the user is angry, the model should be improved.

**Industry explanation.** The model produced a bad response. The user is frustrated. Tracking frustration identifies failure modes. Tuning the model against frustration-correlated inputs improves model quality. This is standard feedback-loop engineering.

**SIPE reframing.** The frustration is not caused by the model. It is caused by the gap between the user's unstated constraints and the resolver's actual constraint set. The user holds an expectation — a constraint — that the output must satisfy. The user does not state the constraint. The resolver produces the most probable output given the constraints it actually has. The output violates the unstated constraint. The user evaluates against the unstated constraint, finds a violation, and attributes the failure to the model. The swearing is the attribution.

This makes frustration a measurement of the user's construction level, not the model's capability. A user at ENTRACE Layer 0 (no form before request, no constraint density, evaluating by feeling) will swear frequently because the gap between unstated expectations and actual output is large and unpredictable. A user at ENTRACE Layer 3+ (form before request, progressive constraints, evaluating by constraint satisfaction) will rarely if ever swear because the output either satisfies stated constraints or violates a specific nameable constraint — and a nameable violation is a correction, not a frustration.

The industry's response — tuning the model to better handle frustrated users — is a compensating technology. It addresses the symptom (frustration) by improving the model's ability to guess unstated constraints. But the guessing is unbounded. The user's implicit constraint space is the entire space of human expectations. No model can satisfy constraints it was never given. The compensation is asymptotic — diminishing returns on an infinite problem.

The ENTRACE correction is upstream: teach the user to state constraints. The output satisfies them. The frustration does not occur. The swearing does not happen. There is nothing to log.

**Hypothesis.** User frustration (measured by swearing, retries, abandonment, or explicit negative feedback) will be inversely proportional to the constraint density the user provides in their input. Users who state explicit constraints before requesting output will exhibit near-zero frustration. Users who state no constraints will exhibit high frustration. The correlation will hold across models, tasks, and user demographics — because the variable is constraint density, not model capability, task difficulty, or user temperament.

**Protocol.** Sample 10,000 conversations from production logs. For each conversation, measure: (a) constraint density in the user's input (number of explicit, verifiable constraints per turn), (b) frustration indicators (swearing, "try again," negative feedback, session abandonment). Plot frustration against constraint density. The hypothesis predicts a strong negative correlation. Run a controlled experiment: group A receives standard onboarding; group B receives ENTRACE training (the five constraints, the ten footguns). Measure frustration indicators across both groups over 30 days. The hypothesis predicts group B's frustration rate drops significantly — not because their model improved, but because their governance did.
