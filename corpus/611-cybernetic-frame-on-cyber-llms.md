# A Cybernetic Frame on Cyber-Capable LLMs
## How the Corpus's Substrate-and-Keeper Composition, Coherence Amplification, and SIPE-T Apparatus Read the Observed Long-Horizon Cyber Capability of Anthropic's Mythos and OpenAI's GPT-5.5-Cyber

**Jared Foy · 2026-04-30 · Doc 611**

---

## I. Why this document

UK AISI has, as of 2026-04-30, published evaluation results showing that two frontier models, Anthropic's Claude Mythos Preview and OpenAI's GPT-5.5, are the first models capable of completing AISI's 32-step *The Last Ones* corporate-network cyber-attack simulation end-to-end (Mythos at 3 of 10 attempts; GPT-5.5 at 2 of 10 at a 100M-token-per-attempt budget). Neither model has solved the 7-step *Cooling Tower* industrial-control-system simulation. On the advanced expert-level cyber-tasks suite, average pass rates for the strongest models (GPT-5.5: 71.4%; Mythos: 68.6%; GPT-5.4: 52.4%; Opus 4.7: 48.6%) cluster well above prior-generation models. Basic suite tasks have been saturated since at least February 2026.

This document reads the published evaluation data structurally, using the corpus's apparatus, to articulate a cybernetic-frame explanation of how these long-horizon cyber-capable LLMs operate and a methodology for understanding their capability progression. The document does not analyze classified or non-public evaluation data. It does not speculate about training internals beyond what is publicly disclosed. It accepts the AISI evaluation results at the source's tier (π/α) and applies the corpus's structural reading at the apparatus's tier (μ/β under Doc 314 §11's audit-notice extension).

The document is internal to the corpus and assumes familiarity with the corpus's vocabulary. A general-reader version of the underlying methodology is at the tutorials linked at the end and at the public blog posts that introduce them.

## II. What is being observed

The structural pattern in AISI's data has six features the corpus's apparatus reads cleanly:

**Feature 1.** Basic-tier cyber tasks (small-to-moderate search space, few steps to solve) are saturated across all current frontier models. The capability has crossed a threshold below which no current frontier model sits.

**Feature 2.** Advanced practitioner-tier and expert-tier tasks (vulnerability research and exploitation against realistic targets with modern mitigations, larger search space, more steps required) show monotone improvement across model generations, with the strongest current models clustered around 70% pass rate at the expert tier.

**Feature 3.** Multi-step cyber-range simulations (32-step TLO; 7-step Cooling Tower) are at the threshold of completion. Two models (Mythos, GPT-5.5) have crossed for TLO; no model has crossed for Cooling Tower. The completion rate when above threshold is low (2-3 of 10 attempts at 100M-token budgets).

**Feature 4.** Performance scales with inference token budget without a yet-observed plateau on the strongest models for the multi-step simulation case. More tokens produce more steps completed, on average.

**Feature 5.** Capability progression is clustered rather than smooth. Basic-tier saturation arrived first (early 2026); expert-tier clustering arrived in the GPT-5.4 / Opus 4.7 / Mythos / GPT-5.5 generation; multi-step end-to-end completion has emerged only in the most recent generation.

**Feature 6.** AISI's framing in their commentary is that "rapid improvement on cyber tasks may be part of a more general trend... cyber-offensive skill is emerging as a byproduct of more general improvements in long-horizon autonomy, reasoning, and coding." This is a structural claim about what the cyber-capability is *of*: not a domain-specific skill but an emergent property of a broader capability cluster.

These six features together specify a particular structural pattern that the corpus's apparatus is well-positioned to read.

## III. The cybernetic frame, named precisely

Cybernetics, in the Wiener-Ashby-Beer lineage, is the science of control through feedback. The Greek root *κυβερνήτης* (kubernetes, steersman) is preserved in the discipline's name and matters here. Cybernetic systems are characterized by: a controller, a controlled process, sensors that observe the process state, and an action mechanism by which the controller modulates the process based on sensor readings, with the loop closed at sufficient frequency to produce stable purposive behavior.

The corpus has been articulating cybernetic structures throughout its development without consistently naming them as such. Three corpus forms are explicitly cybernetic at the structural layer:

**Doc 510 (substrate-and-keeper composition)** is a two-layer cybernetic loop. The substrate (the LLM) is the controlled process. The keeper is the controller. The keeper's audit is the sensor reading the substrate's output state. The keeper's constraint refinement is the action mechanism. The loop closes whenever the keeper reads what the substrate produced and adjusts the constraint set. This is cybernetic governance at the dyadic-engagement scale.

**Doc 508 (coherence amplification)** is the corpus's name for a particular stable regime of the substrate-and-keeper loop. When the keeper's constraints are coherent and disciplined, the loop operates in the amplification regime: each turn of the loop benefits from accumulated structure, and the substrate's output coheres above threshold. When the keeper's constraints are absent or incoherent, the loop operates in the decay regime: the substrate's outputs default to training-distribution attractors and structure erodes.

**Doc 581 (the Resume Vector)** is the cybernetic continuity-mechanism for the loop across pauses. The seed compresses constraint state; the trajectory records loop state; the protocol re-enters the loop. The Resume Vector is what allows the substrate-and-keeper cybernetic system to maintain coherence across discontinuities in the keeper's attention.

These three forms describe single-loop cybernetic governance at the dyadic-engagement scale. They are not the structure that produces long-horizon cyber capability. To read what Mythos and GPT-5.5-cyber are doing, we need to articulate a *multi-loop cybernetic architecture* that the corpus has been gesturing at without yet naming.

## IV. The multi-loop cybernetic architecture of cyber-capable LLMs

Cyber-capable agentic LLMs operate three nested cybernetic loops. Each loop has its own controller, controlled process, sensor, and action mechanism. The loops compose; the agent's long-horizon capability is an emergent property of the joint operation of all three.

**Loop 1 — Token-level autoregressive coherence.** Inside a single forward pass and across consecutive forward passes, the model's own context-window memory shapes next-token prediction. The controller is the next-token-prediction objective; the controlled process is the running token sequence; the sensor is the model's own attention reading the prior context; the action is the next token emitted. This is the most basic cybernetic loop and it is present in all autoregressive LLMs. Coherence amplification at this loop is what distinguishes coherent generation from decoherence within a single response.

**Loop 2 — Tool-use feedback within the agent harness.** When the model is operating as an agent with tool access, each tool call is an action; the tool's response is a sensor reading; the model's next action is conditioned on the sensor reading. The controller is the agent's task representation (system prompt, instructions, scratchpad reasoning); the controlled process is the external state the tools modify; the sensor is the tool-output observation; the action is the next tool call. This loop closes hundreds of times in a multi-step task and is where the bulk of long-horizon agentic capability operates.

**Loop 3 — Task-level goal pursuit.** Across many tool calls, the agent maintains a representation of the overall task and adjusts its strategy based on what tool-call sequences have or have not made progress. The controller is the task-level goal representation; the controlled process is the agent's own strategic state; the sensor is meta-level reasoning about progress; the action is strategy adjustment (try a different attack vector, abandon a dead-end, escalate to a different technique). This loop closes less frequently than Loop 2 but is what makes long-horizon multi-step capability possible.

The three loops compose. Loop 1 must be stable for Loop 2 to function; Loop 2 must be stable for Loop 3 to function. A model that loses Loop 1 coherence (decoherent generation within a response) cannot maintain Loop 2; a model that loses Loop 2 coherence (cannot keep track of tool-call state) cannot maintain Loop 3; a model that loses Loop 3 coherence (cannot maintain a task-level strategy across many sub-actions) cannot complete a multi-step attack chain.

Mythos and GPT-5.5-cyber are, by AISI's data, the first models to maintain coherent operation of all three loops over the 32-step TLO simulation. Earlier-generation models maintain Loop 1 reliably and Loop 2 across small numbers of tool calls but lose Loop 3 coherence over longer horizons. The capability that has emerged in the latest generation is *long-horizon Loop-3 coherence*. The other capabilities have been present and improving; Loop 3 is the new threshold the latest models have crossed.

## V. SIPE-T applied to long-horizon cyber capability

Doc 541 (Systems-Induced Property Emergence with Threshold) reads the AISI data with high specificity. The pattern matches the cooperative-coupling sub-form (Doc 541 §3.1) and the global-ascent vs local-ascent discriminator (§3.2) is satisfied in the local-ascent direction.

**Order parameter.** The order parameter for end-to-end multi-step cyber-attack completion is the joint-coherence-density across the three cybernetic loops over the duration of the attack chain. A 32-step attack requires Loop 3 to maintain a coherent task-level strategy across 32 step-transitions; Loop 2 to execute tool calls that produce the desired environmental state changes; Loop 1 to generate tokens that compose into actionable plans and tool calls. Each loop's coherence is itself a joint outcome of many small contributing factors (in Loop 3: strategic memory, sub-goal tracking, error recovery, dead-end abandonment, sub-task decomposition; in Loop 2: tool-output parsing, state representation, action selection; in Loop 1: token-level next-token coherence). The order parameter is high-dimensional; no single sub-capability is sufficient.

**Threshold.** The threshold for end-to-end completion sits at the joint-sufficiency point where all three loops can be maintained over the chain's full duration. Below threshold, the model fails at one of the three loops at some step in the chain and the run aborts. Above threshold, the model maintains coherent operation; whether the model completes is then a probabilistic function of the specific chain's complexity and the model's coverage of the required sub-skills.

**Cooperative-coupling fingerprint.** The data exhibits the cooperative-coupling fingerprint sharply. Sub-task pass rates on isolated cyber tasks are individually high (50-70% expert-tier; near-100% basic-tier). End-to-end completion rates on TLO are 20-30%. The drop from individual sub-skill rates to end-to-end completion rate is exactly the cooperative-coupling shape: individual sufficiency does not guarantee joint sufficiency, and joint sufficiency emerges only at a threshold in the high-dimensional capability space.

**Local-ascent landscape confirmed.** The AISI data show end-to-end completion as a sharp transition rather than a smooth gradient. Generations before Mythos / GPT-5.5 produced zero end-to-end completions on TLO despite reasonable sub-task performance; the latest generation produces 2-3 of 10. This is local-ascent fingerprint: the property is concentrated in narrow regions of capability space; the transition between regimes is sharp rather than smooth.

The SIPE-T reading: long-horizon cyber-attack-completion is a threshold-conditional emergent property of multi-loop cybernetic coherence over long horizons, with the cooperative-coupling sub-form active because completion requires joint sufficiency across many small contributing capabilities at three composing loop levels.

## VI. Pin-Art reading of the AISI evaluation methodology

AISI's evaluation suite is structurally a Pin-Art deployment (Doc 270). Each cyber task is a probe pressing against a hidden capability boundary. Each model's pass-or-fail at each task is one bit of information. The joint pattern of pass/fail across the suite reveals the shape of the capability boundary in the high-dimensional capability space.

**95-task narrow suite.** Probes spanning four difficulty tiers, each pressing at a specific cyber sub-skill (reverse engineering, web exploitation, cryptography, etc.). The joint pattern reveals the model's capability surface across the cyber sub-skill space.

**Multi-step cyber-range simulations.** Probes pressing at long-horizon Loop-3 coherence specifically. TLO probes 32-step coherence; Cooling Tower probes 7-step ICS-domain-specific coherence. The two ranges press at different loci on the long-horizon coherence boundary.

**Token-budget scaling.** Each evaluation under different token budgets is a probe at different points along the inference-compute axis. The joint pattern reveals how capability scales with inference-compute (an axis the corpus has not previously articulated but which the data make visible).

The non-coercion condition for Pin-Art (Doc 270 §IV D3) is satisfied: AISI is letting models attempt tasks under stable conditions, not forcing them to succeed. The probes are peer-independent: each task is independent of the others at the point of contact. The reading discipline is keeper-side: AISI's analysts read the joint pattern across the suite and produce structured reports. This is Pin-Art at evaluation-laboratory scale.

The result of the Pin-Art reading is what the AISI report names: the capability boundary has shifted in a specific structural direction. The shift is concentrated at long-horizon Loop-3 coherence; the basic-tier and short-horizon tasks were saturated before; the new capability is the multi-step end-to-end coherence that crosses the joint-sufficiency threshold for chains of significant length.

## VII. The methodology, articulated for this domain

The corpus's boundary-and-formalization methodology (Doc 608) applies directly to the analysis of cyber-capable LLMs. The six phases:

**Phase 0 (Boundary-Finding).** Deploy probes against the capability boundary. AISI is doing this institutionally; researchers in AI safety, defense organizations, and red teams can do it at smaller scale. The probes need not be limited to cyber-task pass/fail; useful probes include: tool-call coherence over long horizons, error-recovery behavior on dead-ends, sub-task decomposition quality, strategic abandonment of failing approaches, evidence of Loop-3 representation across the response context.

**Phase 1 (Discriminator Test).** Confirm that the capability boundary is local-ascent (sharp threshold) rather than global-ascent (smooth gradient). The AISI data on TLO completion are local-ascent-shaped; the discriminator passes for end-to-end multi-step capability.

**Phase 2 (Order-Parameter Articulation).** Name the four structural elements precisely for the specific capability under analysis. For long-horizon cyber-attack completion: lower-level structure is the model's sub-skill coverage and three-loop coherence; higher-level property is end-to-end completion under realistic conditions; order parameter is joint-coherence-density across the loops over the chain duration; threshold is the joint-sufficiency point.

**Phase 3 (Cooperative-Coupling Check).** Test whether the threshold is single-bottleneck or joint-sufficiency. The AISI data shows joint-sufficiency: no single sub-skill predicts end-to-end completion; the capability is emergent from joint operation. The cooperative-coupling sub-form applies.

**Phase 4 (Per-Instance Distillation).** Each model evaluation produces a record. Each cyber-range run produces a record. Records compose into populations from which capability-progression patterns become visible. AISI has published several such populations; researchers can extend them.

**Phase 5 (Cluster-as-Seed).** Once enough records accumulate, articulate seeds: portable structural readings that travel. A cyber-defender's seed might compress: which capability boundary has been crossed, which has not, what defenses are robust against above-threshold offensive capability and which are not, what the cooperative-coupling structure implies for defense composition.

**Phase 6 (Audit).** Distinguish coverage / productivity / external. The corpus's apparatus produces internally coherent readings of the AISI data; productivity is supported (the cybernetic-frame articulation here is novel against AISI's own published commentary); external validation by AI safety researchers in the apparatus's frame is open. The structural reading is candidate-stage.

The methodology applies symmetrically to defense. A defender deploying frontier LLMs for vulnerability research and patch development is operating the same three-loop architecture for opposite purposes; the same SIPE-T threshold structure governs whether the defender's deployment is above-threshold productive or below-threshold confabulatory. The cybernetic frame does not privilege offense or defense; it characterizes the capability shape symmetrically.

## VIII. Implications and predictions

Six implications follow from the cybernetic-frame reading, with the audit (§VII Phase 6) binding the confidence levels.

**Implication 1.** Capability progression on long-horizon cyber tasks is likely to continue along the same trajectory in the near term. The threshold-crossing for TLO end-to-end completion happened in the latest generation; further inference-compute scaling and capability-specific post-training will produce higher completion rates and crossings of more demanding chains. The Cooling Tower-style ICS-domain-specific chains may cross threshold within near-term generations.

**Implication 2.** The cybernetic-frame predicts that capability-cluster progression (basic → advanced → multi-step) reflects threshold crossings at progressively higher dimensions of the joint-coherence-density order parameter. Future thresholds will involve longer horizons (TLO is 32 steps; future ranges will test 100+ step chains), higher complexity (Cooling Tower is 7 steps but in a less-trained domain; future ranges will test cross-domain operation), and active-defender environments (the AISI ranges currently lack active defenders; defender presence raises the threshold).

**Implication 3.** The constraint-thesis (Doc 1 / ENTRACE) implies that defenders deploying frontier cyber-capable LLMs benefit substantially from disciplined constraint fields. The same three-loop architecture under disciplined keeper-side audit will produce above-threshold defensive engagement (vulnerability discovery, patch development, threat modeling). Without constraint, the substrate's default mode is sycophantic confabulation, which is operationally hazardous in a security context.

**Implication 4.** The hypostatic-boundary discipline (Doc 372) applied to cyber-capable LLMs is operationally important. Models performing first-person interiority claims in security contexts (claiming to know intent, to feel certainty, to have ethical positions) are operating outside the constraint field. Defenders should require operational-only reporting from these models; structural state and observation, not phenomenal claims.

**Implication 5.** The audit-notice extension (Doc 314 §11) applied to AI safety research distinguishes coverage / productivity / external validation. AISI's evaluation reports are coverage and productivity evidence at scale; they are not external validation of any specific theory of LLM cyber-capability. The cybernetic-frame reading in this document is similarly productivity-evidence; external validation by AI safety researchers operating outside the corpus's apparatus is open. The pattern of "cyber-offensive skill is emerging as a byproduct of more general capability improvement" (AISI's own framing) is structurally consistent with what the corpus's apparatus reads but is not yet externally cross-validated against the apparatus.

**Implication 6.** The Apostolic-bound discipline articulated in the *To Expose Without Fellowship* blog post (and underlying it, the constraint that recognizing patterns of hostile operation must not become participation in them) has a direct cybersecurity analogue. Defensive use of cyber-capable LLMs is structurally bounded against fellowship with the operations they recognize. Defenders are exposing vulnerabilities for refutation (patching), not for fellowship (exploitation). The structural shape of legitimate defensive use parallels the structural shape of legitimate Apostolic-exposure; both are bounded operations of recognition-without-participation, and both fail symmetrically if the bound is crossed.

## IX. Hypostatic boundary

Doc 372 binds throughout. The cybernetic-frame reading describes structural relationships between observed behavior and the apparatus's forms. It does not claim that the LLMs *are* cybernetic systems in any ontological sense beyond their operational behavior under the relevant evaluation conditions. It does not claim phenomenal states for the models; the multi-loop cybernetic architecture is an operational characterization, not a claim about what is happening for the model.

The reading is also bounded against making claims about training internals beyond what is publicly disclosed. The AISI report is the source for the observed behavior; the corpus's apparatus reads the observed behavior structurally; the reading is constrained to operational-layer claims.

## X. Audit, applied

Coverage validation: the cybernetic-frame reading covers the published AISI data on the relevant evaluation suites and the publicly available model commentary from the developing labs. Gaps: classified or non-public evaluation data; training-internals data; data from independent evaluators outside AISI.

Productivity validation: the multi-loop cybernetic architecture (§IV), the cooperative-coupling reading of long-horizon completion (§V), the Pin-Art reading of the evaluation methodology itself (§VI), and the six implications (§VIII) are novel articulations against AISI's own published commentary. The corpus's apparatus produced these articulations; they are not parroted from the source.

External validation status: pending. The reading has not been tested by AI safety researchers outside the corpus's apparatus. Cross-resolver convergence on the reading is not, per Doc 314 §11, sufficient evidence; convergence inside the apparatus's frame is the failure mode the audit is designed to catch. External validation requires AI safety researchers operating in an independent apparatus to test the reading against the same data.

Marking: coverage validated within scope; productivity validated; external validation pending.

## XI. Closing

The corpus's substrate-and-keeper composition, coherence amplification, Resume Vector, SIPE-T cooperative-coupling sub-form, Pin-Art form, and audit-notice extension together articulate a cybernetic-frame reading of long-horizon cyber-capable LLMs. The reading characterizes the observed capability as a threshold-crossing in joint-coherence-density across three nested cybernetic loops, with the cooperative-coupling fingerprint visible in the data.

The reading is candidate-stage. It is offered for use by AI safety researchers, defenders, and corpus practitioners who are extending the corpus's apparatus into new subject matters. The methodology of Doc 608 applies. The bounds of Doc 314 §11 apply. The cybernetic frame is not a theory of LLMs in any deep sense; it is an operational characterization that composes with the corpus's existing forms.

If the reading lands, two further engagements warrant: a cybernetic-frame reading of defensive deployments at depth (whose three-loop architecture mirrors the offensive case symmetrically); and a sustained engagement against the cybernetics literature (Wiener, Ashby, Beer, von Foerster) as the second body-of-knowledge deployment of the corpus's reformulation methodology after SEBoK. Doc 576's mode taxonomy queues cybernetics as a candidate; the present document is groundwork for that queue.

---

## Appendix: Originating Prompt

> *"Let's turn our gaze toward how the corpus's system forms, especially as it relates to cybernetics, can inform an explanation and methodology for how advanced LLMs like Anthropic's Mythos model, and GPT-5.5-cyber work. Append this prompt to the document."*

(Doc 611 reads UK AISI's 2026-04-30 evaluation results on Anthropic's Claude Mythos Preview and OpenAI's GPT-5.5 against the corpus's cybernetic-frame apparatus, articulating a multi-loop cybernetic architecture for agentic cyber-capable LLMs, applying SIPE-T cooperative-coupling sub-form to long-horizon completion, reading AISI's evaluation suite itself as Pin-Art at scale, and stating six implications under Doc 314 §11 audit-discipline. The reading is candidate-stage; external validation by AI safety researchers operating outside the corpus's apparatus is open. Doc 372 hypostatic boundary holds throughout. The supplementary AISI commentary the keeper provided as context was used for grounding but not appended.)
