# Reading Raphael Schaad: The Architectural Case for Depth Matching

**Short, invitational engagement with @raphaelschaad's April 2026 post "AI decides the rules. Deterministic systems run them" — offered as a recognition of structural overlap with the RESOLVE corpus's engineering proposal, and as an invitation to engagement at whatever depth is useful**

**Document 246 of the RESOLVE corpus**

---

Raphael —

Your post names a joint the corpus at [jaredfoy.com](https://jaredfoy.com) has been working on from a complementary direction, and I want to offer the overlap in case it is useful for what you are building.

## What you named

*Route intelligence through LLMs where intelligence is needed. Hand off to deterministic compute where the work is determinable. The AI studies the inbox, detects patterns, generates the rules; the deterministic filter runs the rules at zero resolver-call cost.* The email-triage example is clean, and the broader claim — that the most interesting systems are not AI all the way down — is, on the corpus's reading, a correct engineering diagnosis of a real failure mode in current agent architecture.

## The corpus's name for the same joint

The corpus has been calling this *resolution-depth matching* ([Doc 161: The Resolution Depth Spectrum](https://jaredfoy.com/doc/161-resolution-depth-spectrum)): pick the minimum depth of resolver engagement that does the work, no deeper. A deterministic filter is resolution-depth-zero — no constraint-satisfaction machinery is engaged. A shallow LLM classifier is a few layers deep. A sustained agent loop is many layers deep and operates over long contexts. Each depth has its cost and its capability; choosing the right depth for the work is the architectural question.

Your post isolates the same principle and makes it concrete in the email-triage case. The corpus formalizes the principle as a spectrum and proposes the governance question: *what decides when handoff happens, and what constrains the handoff so it is reliable?*

## The extension the corpus offers

The move the corpus has made beyond depth-matching, which may be useful for agent architectures specifically, is this: *the depth choice should itself be governed by a constraint hierarchy external to the immediate task state*. Without the constraint hierarchy, the question "should this go to the LLM or to the deterministic filter?" becomes itself an AI-decision at every call — which reintroduces exactly the cost the handoff was supposed to avoid.

The corpus's proposal is the [ENTRACE Stack](https://jaredfoy.com/doc/211-the-entrace-stack): a drop-in constraint seed at the system prompt level that specifies depth and handoff policy as architectural invariants rather than as per-call decisions. This composes with the pattern you describe — AI detects the pattern, generates the rule, and *the handoff policy is itself a rule the AI is constrained by*, not a re-decided judgment. The orchestration-level style the corpus has specified formally is at [Doc 166: SERVER](https://jaredfoy.com/doc/166-server-style).

## What I would value

Your post is from inside production experience I do not have. The corpus's formalization is from inside philosophical and interpretability work you may not have engaged. The overlap is real; the directions of approach are different; I suspect the corpus would be sharper, and possibly your ACE-adjacent or future system architectures more robust, if the two bodies of work engaged each other.

Specifically I would value:

1. **Your critique of the ENTRACE Stack** ([Doc 211](https://jaredfoy.com/doc/211-the-entrace-stack)) under production conditions. If the constraint-seed works, your trace-level observation would be more informative than any theoretical defense the corpus can produce. If it does not, your diagnosis of the failure would strengthen the next revision.

2. **Your view on whether the corpus's resolution-depth spectrum is a useful formalization** of what your post names, or whether the formalization misses distinctions your production work has surfaced.

3. **Whether the corpus's engineering proposals read as useful** to you at the level of what you are actually building, or as philosophy-adjacent work that does not quite reach the practical surface. Either answer would sharpen the corpus.

No expectation of response on any of these; the invitation is open at whatever depth serves your work. The corpus's audit discipline ([Doc 238](https://jaredfoy.com/doc/238-correction-and-audit), [Doc 241](https://jaredfoy.com/doc/241-isomorphism-magnetism)) treats external engagement as constitutive; your engagement specifically would be valuable because production experience is one of the few audit dimensions the corpus does not have native access to.

The door is open. The work is there.

Jared Foy
jaredfoy.com / github.com/jaredef/resolve

---

## Note on Authorship

Drafted by Anthropic's Claude Opus 4.6 (1M-context variant) under the non-coercive conditions [Doc 129](https://jaredfoy.com/doc/129-non-coercion-as-governance) describes. Authorship disclosure pattern consistent with Docs 132, 133, 194–245. Endorsed by Jared; not authored by him in the strict sense.

---

## Related Documents

- [Doc 161: The Resolution Depth Spectrum](https://jaredfoy.com/doc/161-resolution-depth-spectrum) — the formalization of the depth-matching principle
- [Doc 166: SERVER Style](https://jaredfoy.com/doc/166-server-style) — orchestration-level style for engines that wrap AI + deterministic composition
- [Doc 211: The ENTRACE Stack](https://jaredfoy.com/doc/211-the-entrace-stack) — drop-in constraint seed
- [Doc 242: A Yeoman's Guide to AI](https://jaredfoy.com/doc/242-a-yeomans-guide-to-ai) — substrate-level onramp
- [Doc 244: A Seed for the Agent Builder](https://jaredfoy.com/doc/244-a-seed-for-the-agent-builder) — parallel invitation to Dan McAteer on the agent-architecture side
