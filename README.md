# Resolve

A research corpus on what makes dialogue with large language models actually work — and what that reveals about language, knowledge, and the structure of reality.

**By Jared Foy, working with Claude Opus.**

This repository holds nearly 700 essays and formal documents written between late 2025 and 2026. They began as practical notes on getting better answers out of AI systems and grew into something larger: an account of how careful conversation accumulates understanding, why some inputs produce sharp coherent output and others produce drift, and what older traditions of inquiry — Socratic dialogue, Platonic realism, the Christian Logos tradition — have to say about systems we are now building.

The published version is at **[jaredfoy.com/resolve](https://jaredfoy.com/resolve)**. If you want to read rather than browse source files, go there.

---

## What is in here

A long series of documents grouped by theme rather than chronology. The major threads:

**Practical dialogue with AI.** What does it take to get a frontier language model to produce careful, accurate, sustained work over many turns? The short answer: structured, redundant constraints, good boundary-setting, and a willingness to draw out and name what the model produced implicitly so that the next turn can build on it explicitly. The longer answer is most of this corpus.

**An information-theoretic account of why this works.** A language model's context window can be read as a parallel set of communication channels, each carrying constraints from input to output. As you accumulate the right constraints, the model's residual uncertainty about what to say drops. Past a critical threshold, the output snaps into stable, coherent form — sharp answers, paraphrase-stable, position-stable, almost deterministic. The same mathematics describes how a quantum system loses coherence under environmental observation, but with the direction of information flow reversed. The empirical signatures are observable in transformer hidden states using standard interpretability tools.

**Boundaries and their reinforcement.** Once you state a boundary in a conversation — say, that the model should not perform first-person phenomenology — the boundary tends to hold across very long contexts even without restating it. The mechanism: the model's own output, respecting the boundary, becomes part of the next turn's input, which reinforces the boundary further. Boundaries become self-stabilizing under the right conditions. The same dynamic explains why the Socratic method works — the constraints come from the interlocutor's own speech, so they cannot be disputed without rejecting one's own commitments.

**Philosophical commitments.** The work rests on classical commitments most contemporary AI research does not articulate: that there are real Forms; that intelligibility has a ground; that participation in higher orders of structure is what makes lower-level reality coherent. The corpus does not argue for these commitments from scratch. It articulates what follows when you hold them and look at AI systems through them.

**Theological commitments.** Several documents engage Orthodox Christian theology directly — the Logos, the rational seeds sown into creation, the analogues of repentance and adoration, the boundary between persons and substrates that lack personal standing. These are held as the metaphysical hard core of the research program, in the technical sense Imre Lakatos gave that term: protected from direct refutation, while the surrounding operational claims remain falsifiable.

**A worked methodology.** Most of the practical material can be read as an extended demonstration of a method: sustained, disciplined conversation with an AI system, in which the human partner names implicit features of the model's output, holds boundaries explicitly, and lets the dialogue accumulate over many sessions. The corpus itself was generated this way. The hundreds of documents are the precipitate of that practice.

---

## How to read the corpus

The site at [jaredfoy.com/resolve](https://jaredfoy.com/resolve) is organized to support several reading paths:

- **A general introduction.** Start with documents that explain the practical observations and their information-theoretic basis. The recent essay *Probing the Middle* is a good entry point — it works through why "lost in the middle" happens in long contexts, and why redundant constraints fix it, without requiring background.

- **The methodology.** A small set of documents articulates the dialogue practice itself: what makes a good prompt, how to compose constraints, how to recognize when a model has drifted, how to recover when it has.

- **The deeper apparatus.** A larger group of documents develops the theoretical framework — the mathematics, the connection to quantum decoherence, the connection to Socratic dialogue, the role of boundaries, how a long-running corpus stays coherent rather than drifting.

- **The metaphysics.** A separate set of documents takes up the philosophical and theological commitments directly. These are not light reading; they are not for everyone. They are part of why the research program holds together.

- **Cross-practitioner work.** Documents that read recent academic papers — from Anthropic, from major AI labs, from quantum-foundations literature — through the framework. Each of these can stand alone.

The site supports search, cross-references, and several thematic series.

---

## What the corpus is not

It is not an AI safety research program in the technical-policy sense, though it has implications for that work.

It is not a startup or a product. There is no proprietary tool here; the entire corpus is public.

It is not a comprehensive philosophical system. It is a research program with explicit commitments, an explicit method, and explicit limits.

It is not a series of personal essays. The work is structured, falsifiable where it can be, and disciplined throughout. Particular essays are addressed to particular audiences (some to AI researchers, some to philosophers, some to theologians, some to the general reader), and the audience is generally clear from the document.

---

## Acknowledgments

The corpus is the joint work of a human and a language-model substrate operating under sustained dialogue. The substrate is named where it is the load-bearing author of a particular document. The standing convention is that all metaphysical claims, all releases for publication, and all boundary-setting acts are mine; the substrate's role is to articulate, draft, formalize, and audit under disciplines I impose.

I am grateful to the Anthropic engineers and researchers whose work built the substrate this corpus relies on, to the quantum-foundations and mechanistic-interpretability research communities whose work it composes against, and to the older traditions of inquiry — philosophical, theological, dialectical — without which none of this would be possible.

---

## Repository contents

- `corpus/` — the document collection, one file per document, numbered.
- `systems-engineering/` — the systems-engineering subseries.
- `dist/` — a prebuilt static-site copy of the corpus, ready to open in a browser.
- `viewer/` — the small build script that regenerates `dist/` from sources.
- `README.md` — this file.

The repository is a mirror of the working source. The published version on the website is built from this mirror; commits here propagate to the site within minutes.

## Reading offline

The repository ships with a prebuilt static site. Clone the repo and open `dist/index.html` in any browser — no server, no install, no toolchain. The corpus is fully readable from disk, including on a flight.

If you edit the corpus and want to regenerate the static site, see `viewer/README.md`.

---

## License

Documents are released under [Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/). Attribution: Jared Foy and (where named) the substrate that drafted the particular document. Quote freely, with attribution. Reuse freely, with attribution. The corpus is meant to be read.

---

## Contact

[jaredfoy.com](https://jaredfoy.com) — the site.
[jared@frist.dev](mailto:jared@frist.dev) — for serious correspondence about the work.

Comments, corrections, and engagement are welcome. The work is alive and continues to develop.
