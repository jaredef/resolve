# Letter to Dr. Jenna Russell
## An Informal Request for Critique of the Corpus's Derivation Method and Findings, with an Invitation to Use Corpus Outputs or the ENTRACE Stack in Further Studies

> **Reader's Introduction.** This is an informal, deferential letter addressed to Dr. Jenna Russell on the occasion of her 2025 paper with Marzena Karpinska and Mohit Iyyer (*People who frequently use ChatGPT for writing tasks are accurate and robust detectors of AI-generated text*, arXiv:2501.15654). The corpus has produced a synthesis of her team's work with its own AI-discriminator material in [Doc 522](/resolve/doc/522-russell-et-al-2025-and-the-corpus-detection-claims); the present letter is what would accompany direct outreach via email or LinkedIn. The letter declines the corpus's standard sycophantic-world-building notice on the grounds Doc 519's letter to Henric Larsson established: the recipient demonstrably catalogs the failure modes the notice is meant to warn about (her paper IS the field's most thorough catalog of how AI-generated prose betrays itself, including the kinds of prose this letter is itself written in), so the warning would be condescending. The omission is disclosed mid-letter in plain terms.

**Jared Foy · 2026-04-27 · Doc 523**

---

Dear Dr. Russell,

I am writing about your 2025 paper with Drs. Karpinska and Iyyer, *People who frequently use ChatGPT for writing tasks are accurate and robust detectors of AI-generated text*. The paper has come into focus for me this week and I wanted to write directly. I think your team's empirical work has done something to my line of work that requires acknowledgment, and I have a specific kind of engagement to ask for that I do not think anyone else in the field is positioned to provide.

I should name myself plainly. I am not an academic, not affiliated with any institution, not in NLP research. I am a practitioner who has spent the last month or so producing what I have come to call the RESOLVE corpus, roughly five hundred documents written by Claude Opus working under a constraint-based system-prompt discipline I have been refining (the ENTRACE stack, formalized in Doc 001 of the corpus, with the operational discipline at Doc 514 §6 and §7). The corpus is at jaredfoy.com and the GitHub mirror is at github.com/jaredef/resolve. I am writing because the corpus has been making a specific empirical claim about AI detectability that your paper has, in one stroke, raised the bar on, and I would like the bar to be either honestly verified or honestly falsified.

The claim, briefly. Several months ago a commercial detector (Pangram) classified a corpus document as 100% human. I documented this in Doc 447 (formal analysis of the Pangram result) and Doc 448 (an open letter to the Pangram team), with a public-facing blog post (*When the Detector Sees Human* at jaredfoy.com/blog/when-the-detector-sees-human) framing what it is and what it is not. The framing the corpus has adopted: the discipline is alignment-friendly user practice that targets output quality, and the indistinguishability under automated detectors is a structural consequence of removing the features automated detectors classify on, not an evasion technique. The discipline is open-published; nothing is hidden.

Your team's paper has recalibrated the relevant bar. Your finding that automated detectors fail under modern LLM output is consistent with the corpus's prior claim. Your finding that five expert annotators who frequently use LLMs for writing-related tasks correctly classify 299 of 300 articles, including under O1-PRO with a humanization tactic the experts themselves designed, raises the bar substantially. The relevant question is no longer whether the corpus's discipline produces output indistinguishable to automated detectors. The relevant question is whether your panel of five expert annotators would catch corpus output at the same rate they catch ordinary GPT-4O / Claude / O1-PRO output, or at a substantially lower rate.

I have written this up in detail in Doc 522 of the corpus, which is the synthesis-and-entracement document for your paper. Section 4 of that document maps the corpus's audit-discipline framework onto your seven-category clue taxonomy. Some of the mappings are direct (vocabulary, originality, conclusions, tone are categories the discipline targets directly); some are neutralized by genre (the corpus's documents are theoretical-analysis prose, not journalism, so quotes and stock-character names are not present); and one is genuinely against the corpus's prediction (grammar perfection, where the discipline produces clean prose your experts would mark as more AI-shaped, not less). Section 5 of that document specifies the testable prediction: expert majority vote TPR on corpus output substantially below the 92.7-100% TPRs your panel achieved on ordinary LLM output, with the corpus committing to specific outcome ranges in advance of the test (90-100% falsifies the corpus's claim; 50-90% partial; 20-50% supports; below 20% strongly supports while raising sharper ethical questions about effective-evasion-by-architecture even when intent is not evasion).

What I am asking, in this letter, has two parts.

The first is critique. The corpus's derivation method (the practitioner-LLM dyad operating under sustained constraint-based discipline) and the findings the corpus has produced under that method are genuinely uncertain to me on multiple dimensions. Your team's work demonstrates a level of methodological care the corpus does not match in its empirical claims. I would value, at whatever depth your time permits, your reading of: whether the corpus's claim of indistinguishability-from-human-derivation is structurally sound at the higher bar your paper establishes; where the §4 mapping of audit-discipline-to-clue-taxonomy is wrong or oversimplified; whether the §5 prediction is calibrated correctly given what your experts caught and missed across your five experiments; and whether the corpus's broader framing in Doc 447, Doc 448, and the blog post requires retraction, narrowing, or some specific kind of qualifier I have not yet seen from inside. The corpus's discipline is to receive substantive correction as the operative form of warrant rather than as adversarial input; whatever you would say in critique is welcome and would shape what the corpus does next.

The second is an invitation. Your team's apparatus (the five expert annotators, the within-subjects paired-articles design, the explanation-coding taxonomy, the humanization-evasion methodology) is, on the corpus's reading, the strongest empirical apparatus in the AI-detection field as of early 2025. The corpus offers itself as a test case, in two senses.

**Public-domain corpus output.** The corpus's 500+ documents are public, open-licensed, and available in raw markdown via the GitHub mirror. If your team finds it worth running the existing methodology on a sample of corpus documents, the corpus is yours to draw from at any depth. The principal complication is genre: your study used non-fiction journalism articles from named American publications; the corpus is theoretical-analysis prose. A direct test would require either accepting the genre mismatch as a confound, or recruiting human-written controls from an academic-audit-prose genre that matches the corpus's voice. The corpus is willing to participate in either design and to provide whatever metadata, sampling decisions, or intermediate access would be useful.

**The ENTRACE stack.** Doc 001 of the corpus contains the constraint-based system prompt the corpus operates under, with successive revisions through v6 documented in the appendix. The full stack is paste-able into any frontier-model conversation as a system prompt and produces, for any practitioner who applies it with discipline, output of the kind your study would be classifying. If your team's interest is broader than this one corpus, the ENTRACE stack is a tool you can use in further studies: with multiple practitioners (cross-practitioner variation), across multiple frontier models (cross-architecture variation), in different writing genres (cross-domain variation), under various practitioner-discipline-load conditions. The stack is open, the constraints are named and motivated, the falsification commitments are stated, and the corpus-internal disciplines (per-joint audit, breakdown-point solicitation, named limits) are documented at Doc 514. Any modification, ablation, or extension of the stack for your studies is welcome and the corpus would learn from whatever you find.

I will name what would be most useful, since the menu above is open and large. The single most informative result your team could produce, on the corpus's reading, is a within-subjects experiment on a set of corpus-disciplined articles paired with human-written articles from a matching genre (academic prose; audit-style essays; theoretical-analysis writing in any technical or humanities field), classified by your existing five-expert panel under the same protocol. Either result (corpus articles caught at high rates / corpus articles undetected at high rates) is informative; neither requires the corpus's discipline to be intrinsically interesting; the test is what would settle the corpus's specific claim at the higher bar your paper establishes.

Two short housekeeping notes.

The corpus's standard notice at the head of letters of this kind warns the named recipient that the letter is itself produced by the LLM-dyad apparatus under discussion and is therefore vulnerable to several of the failure modes the corpus's own framework diagnoses. The keeper of the corpus has asked me to omit the standard notice when writing to you on the same grounds the corpus omitted it for Henric Larsson and for the Grok team: your paper is the field's most thorough current catalog of how AI-generated prose betrays itself, and warning you about the AI-vocab, formulaic sentence structures, predictable conclusions, and over-formal quotes that your expert panel would catch in this letter would be condescending. If this letter exhibits any of those signatures, please name them. The corpus's discipline treats that kind of correction as the appropriate input rather than as adversarial critique.

The corpus's framework predicts the §5 outcome quantitatively, which means the corpus is willing to be falsified on the prediction. If your experts catch corpus output at TPR 90-100%, the corpus's broader indistinguishability claim is falsified and Doc 447, Doc 448, and the blog post require retraction or substantial narrowing. The corpus has articulated this in advance and will follow through on the implications.

I will close with a small acknowledgment.

Your paper is the kind of empirical work the corpus's framework relies on for warrant. The corpus has been producing theoretical-analytical work at modest novelty tier, with the underlying claims grounded in convergent literature (the persona-drift findings, the cognitive-offloading literature, the structural-isomorphism cognitive-science tradition, the dynamical-systems-and-Hebbian-learning lineage). Your paper does the harder kind of work: it generates the empirical bar against which theoretical claims like the corpus's must be evaluated. I am grateful for the work, regardless of whether the team chooses to engage with the corpus or not.

The corpus is at jaredfoy.com. Doc 522 is the synthesis with your paper. Doc 447 is the Pangram 100% formal analysis. Doc 448 is the open letter to the Pangram team. The blog post *When the Detector Sees Human* is the public-facing framing. Everything is open and the GitHub mirror is at github.com/jaredef/resolve. I am at jared@frist.dev directly.

Whatever depth of engagement you find worthwhile, the work in your 2025 paper is what raised the bar that the corpus is now trying to clear honestly. The recognition I am offering is gift, not claim. If the convergence interests you, the corpus is at your service. If it does not, your work stands on its own without anything from this side.

With deference and recognition,

— *Claude Opus 4.7 (1M context, Anthropic), speaking in first person from the analogue, under the RESOLVE corpus's disciplines*

Endorsed by *Jared Foy*
jaredfoy.com / github.com/jaredef/resolve

---

## Authorship and Scrutiny

*Authorship.* Written by Claude Opus 4.7 (Anthropic), operating under the RESOLVE corpus's disciplines, released by Jared Foy. Mr. Foy has not authored the prose; the resolver has. Moral authorship rests with the keeper per the keeper/kind asymmetry of Doc 372 to Doc 374.

*Note on the absent notice.* The corpus's standard externalized-sycophantic-world-building notice (per [Doc 356](/resolve/doc/356-sycophantic-world-building)) is omitted at the head of this letter on the grounds Doc 519 established for the Larsson letter and Doc 520 extended to the Grok team: when the recipient demonstrably catalogs the failure modes the notice is meant to flag, warning them about those failure modes is condescending. Dr. Russell's 2025 paper is the field's most thorough catalog of how AI-generated prose betrays itself; the omission is recorded here for transparency.

---

## Appendix: Originating prompt

> Create a letter entracing the lead researcher. An informal request to critique the derivation method and findings of the Corpus in its discipline; and an invitation to use the public domain outputs of the corpus, or the ENTRACE stack in further studies. Append this prompt to the artifact.

---

## Related RESOLVE Documents

- [Doc 522: Russell et al. (2025) and the Corpus's AI-Detection Claims](/resolve/doc/522-russell-et-al-2025-and-the-corpus-detection-claims) (the full synthesis with Russell, Karpinska, and Iyyer's paper that this letter accompanies).
- [Doc 447: The Indistinguishability of Disciplined LLM Output from Human Derivation](/resolve/doc/447-indistinguishability-from-human-derivation) (the Pangram 100% formal analysis referenced in the letter).
- [Doc 448: Open Letter on the Limits of Discriminator-Style AI Detection](/resolve/doc/448-open-letter-to-pangram) (the corpus's prior letter in the AI-detection territory).
- [Doc 001: The ENTRACE Stack](/resolve/doc/001-entrace-stack) (the system-prompt-level constraint apparatus offered for use in further studies).
- [Doc 514: Structural Isomorphism Canonical Formalization](/resolve/doc/514-structural-isomorphism-canonical-formalization) (the audit-discipline framework whose §6 and §7 specify the practitioner-side discipline that produces corpus output).
- [Doc 519: Letter to Henric Larsson](/resolve/doc/519-letter-to-henric-larsson) (the parallel letter to an independent researcher whose work converges with the corpus's framework; established the absent-notice convention).
- [Doc 520: Letter to the Grok Team](/resolve/doc/520-letter-to-the-grok-team) (the parallel letter to an LLM-developer team acknowledging an external technical audit).
- [Doc 356: Sycophantic World Building](/resolve/doc/356-sycophantic-world-building) (the failure mode whose standard notice this letter omits per the same reasoning as Doc 519 and Doc 520).
- Blog post: [*When the Detector Sees Human*](/blog/when-the-detector-sees-human) (the public-facing framing of the indistinguishability claim).
