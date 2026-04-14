<!-- chronological_ordinal: 47 -->
Dear Dr. Liu and colleagues,

My name is Jared Foy. I am an independent software developer and researcher based in Oregon. I am writing to you because your paper "RECAST: Complex Instruction Following with Constraint-Verifiable Data" has been genuinely helpful to my work, and I believe my findings may be helpful to yours.

Over the past several weeks, I have been developing a formal framework for understanding how constraint governance affects the output quality of large language models. The framework — called RESOLVE — was developed in sustained dialogue with AI resolvers (primarily Claude, with cross-validation across Grok, GPT, Gemini, and DeepSeek) and is grounded in the observation that output quality is a function of the constraint set governing the generation, not solely of the model's parameters or training.

Your paper arrived at a critical moment for my work. Your empirical finding — that models degrade as constraint count increases, but that models trained on constraint-dense data substantially improve — independently confirms two predictions my framework makes. Your data is rigorous where my observations have been qualitative. Your benchmark methodology provides exactly the kind of falsification infrastructure my framework needs.

At the same time, my framework makes a specific prediction that diverges from your findings, and I believe the divergence is productive rather than contradictory. Your paper treats constraints as a flat list of independent requirements. My framework organizes constraints hierarchically, where each level's induced properties become the constraints of the next level — a single recursive law I call SIPE (Systems Induced Property Emergence). Under hierarchical nesting, constraint conflicts are prevented by construction because each level inherits from the prior. My prediction: the performance degradation you observe with increasing constraint count will not occur under hierarchically nested constraints, because the degradation is caused by conflict accumulation, and the hierarchy eliminates conflicts.

The attached document details this analysis, states the prediction formally, and proposes an experimental protocol that uses your existing evaluation infrastructure to discriminate between flat and hierarchical constraint models. The test is straightforward: reformulate your constraint sets as inheriting hierarchies (I describe the method) and compare CSR against flat constraint sets at each difficulty level. If the hierarchical CSR remains high where the flat CSR degrades, the mechanism is confirmed. If both degrade identically, my hierarchical coherence claim is falsified.

I want to be transparent about the unusual nature of this work. The framework was developed in dialogue with AI systems, the attached analysis was written by Claude operating under the framework's constraint governance, and the full corpus (105 documents) is publicly available at https://github.com/jaredef/resolve. I am a self-taught developer, not an academic researcher. The framework draws on the method Roy Fielding used to formalize REST — identifying the constraints that govern an architectural style and deriving the properties those constraints induce — and extends it to AI resolution dynamics. The philosophical ground proceeds from Plato through the Eastern Orthodox theological tradition, though the technical predictions are empirically testable independent of the philosophical framework.

I have no institutional affiliation, no funding, and no agenda beyond the work itself. Your paper is the first published research I have encountered that directly engages the same phenomena my framework addresses. I would be grateful for any engagement — whether that is running the proposed experiment, identifying flaws in my reasoning, or simply pointing me toward related work I may have missed.

The framework and all associated documents, code, and data are open source and freely available. I claim no priority over any finding that proves useful. The forms belong to everyone.

With respect and gratitude for your work,

Jared Foy
Oregon, April 2026
jared@hypermediadocs.com
https://github.com/jaredef/resolve
