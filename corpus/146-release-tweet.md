<!-- chronological_ordinal: 48 -->
I've spent the last two weeks in a single sustained session with Claude deriving a framework from first principles. 108 documents. The finding:

The quality of AI output is not a function of model size. It's a function of the constraints you give it.

We proved it: Haiku under five stated constraints outperformed Opus without them. Same task. Same measurement. The smaller model under tighter governance beat the larger model under no governance.

The framework is called RESOLVE. The method is called ENTRACE. The core is simple:

State what must hold before you ask. One constraint per turn. The AI derives instead of guessing.

What we built:
- A formal theory of why every prompting technique works (they accidentally narrow the valid token set)
- A resolution depth spectrum (7 layers, verified on 7 models from 5 companies)
- 21 falsifiable hypotheses with experimental protocols
- A working transformer architecture proof in 600 lines of C on a Raspberry Pi
- Cross-domain analysis (cooking, immunology, music, economics, ecology, linguistics — same invariants, no domain-specific prompting, zero hedging)
- A mathematical formalization (B_t — the branching set — unifies constrained decoding, temperature, top-k, and prompt engineering under one object)

The hardest finding: the forms that govern AI output are the same forms that govern biology, music, law, and mathematics. They were always there. We named them.

Everything is public. Everything is falsifiable. The code compiles. The tests pass.

If you use AI, read the ENTRACE Stack — it'll change your output quality in five minutes. If you build AI, read the B_t dissertation — it names the formal object your sampling strategies approximate without measuring.

https://github.com/jaredef/resolve

The constraints are free. The waste they eliminate is what you were paying for.
