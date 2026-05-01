# Output Degradation in the Bridge Series: A Cross-Document Analysis of Rendering and Content Drift

## 1. Statement

The keeper reports that Doc 440 renders poorly on the public site and that the kind of degradation observed there resembles prior sessions in which forced-determinism sycophancy manifested. This document investigates the claim at two levels: the **rendering layer** (what the markdown-to-HTML pipeline did to Doc 440 specifically) and the **content layer** (whether Docs 437–441 collectively exhibit signs of generation-level degradation). Explanations are drawn from inside the corpus frame *and* from outside it — especially from outside, because corpus-internal explanations will tend to re-justify the corpus's own failure modes rather than diagnose them.

The rendering degradation is concretely identified and has a clean technical fix. The content degradation is real, measurable on inspection, and is the more consequential finding.

## 2. Rendering-layer findings

### 2.1 The concrete bug

The blog's pipeline is: markdown → `cmark-gfm --extension table --extension autolink` → HTML → KaTeX auto-render at page load. KaTeX is configured to process `$...$` and `$$...$$` delimiters client-side.

The bug surfaces in Doc 440 §6, which is a markdown table whose cells contain inline math that itself contains pipe characters — e.g. `$\widehat{|B_t|}_{M_2}$`. In GitHub-Flavored Markdown tables, the pipe character is a column separator. cmark-gfm's table extension parses pipes as separators *before* it knows anything about the `$...$` KaTeX delimiters. The parser therefore breaks the cell at the first pipe inside the math expression, leaving the raw HTML as:

    <td>$\widehat{</td>
    <td>B_t</td>
    <td>}$ …</td>

When KaTeX scans the resulting HTML, the `$...$` pairs no longer straddle well-formed math; the expressions render as literal text or as mangled math, and surrounding table columns are skewed by the phantom cells. This is the visible deterioration.

The same hazard is latent wherever math inside a table cell contains a pipe. Doc 440 is the first document in the series to combine a table with pipe-bearing math; the prior docs in the series (437, 438, 439, 441) have tables without pipe math, or pipe math outside tables, so they do not trip the bug.

### 2.2 Fix

Three options, ordered by ruggedness:

- **Quick fix**: rewrite the offending table cells to avoid pipes inside math. `|B_t|` can be written as `\lvert B_t \rvert` — KaTeX renders it identically, and the literal pipe disappears.
- **Author-discipline fix**: add a rule to the authoring protocol — *no pipe characters inside math inside table cells* — and add a lint to the seed pipeline that flags draft documents containing `\|[^$]*\||[^$]*\|$` in table rows.
- **Pipeline fix**: replace `cmark-gfm --extension table` with a renderer that tokenizes math-delimited spans before table cells are split (e.g., `remark-math` + `remark-gfm` in the correct order, or a small preprocessing pass that temporarily substitutes `$...$` with a sentinel, runs cmark-gfm, then restores).

The quick fix applied to Doc 440 is sufficient to restore the rendering today. The pipeline fix is the durable response and should be queued.

### 2.3 Adjacent rendering hazards

Other thin-ice spots that did not break in Docs 437–441 but could in future documents with adjacent structural choices:

- **Math in list items that also contain backticks**: cmark-gfm's code-span lexer and the KaTeX `$` lexer can race.
- **Math containing `<` or `>`** (e.g. `$M_2 \subset M_1$` vs `$a<b$`): cmark-gfm escapes these to `&lt;`/`&gt;` inside paragraphs, which KaTeX handles, but inside inline HTML blocks it does not.
- **Display math (`$$...$$`) inside blockquotes**: the blockquote marker must appear on every line of the display math or cmark-gfm closes the blockquote prematurely.
- **Underscore emphasis adjacent to math**: `$M_0$ _emphasis_` works; `_$M_0$_` does not.
- **Autolinker inside math**: if a math expression contains something URL-shaped, the autolink extension wraps it in an anchor, breaking KaTeX.
- **Possessive-apostrophe after closing dollar** *(added 2026-04-24)*: the construction `$X$'s` — closing math delimiter immediately followed by `'s` — has now recurred as a real failure mode across Docs 447, 459, and 472. The render pipeline mispairs or suppresses the closing `$`, and the subsequent math in the paragraph breaks or swallows text. The standing fix is to rewrite possessives as *the [property] of \(X\)*. See Doc 449 §"Update (2026-04-24)" for the full diagnosis and its connection to mechanism 2 (shared-conditioning-origin) of the keeper's observed render-truncation correspondence.
- **Underscore emphasis pairing across multiple inline-math spans** *(added 2026-04-24, second pass)*: cmark-gfm does not recognize `$...$` as opaque spans, so when a single paragraph contains two or more inline math expressions each carrying a subscript `_`, the emphasis parser may pair a `_` inside one math span with a `_` inside another, wrapping the intervening text (including the closing and opening `$` delimiters) in `<em>...</em>` and destroying both expressions. Confirmed observation: the blog post `five-fields-meet-at-the-tower` had `$\text{Null}_k$, ordered constraints $c_{k,i}$, ...` and the rendered HTML contained `$\text{Null}<em>k$, ordered constraints $c</em>{k,i}$`. Adding braces (`_{k}`) does not fix it; the problem is the raw underscore character's left-flanking/right-flanking properties. The working fix is to backslash-escape every subscript underscore inside inline math that lives in a paragraph with other underscored math: write `$\text{Null}\_{k}$` in the source, which cmark-gfm renders as `$\text{Null}_{k}$` in HTML, at which point KaTeX sees a normal subscript. The escape is safe because cmark-gfm consumes the backslash before KaTeX ever sees the text. Authoring rule: when a paragraph has two or more inline-math spans and at least one contains a subscript underscore, escape the underscores.

None of the first five bit in the 437–441 series. They will if not anticipated. The sixth bit three times in later work; the seventh bit once in the Tower blog series; both are real recurring hazards as of 2026-04-24.

## 3. Content-layer findings

The keeper asked for analysis of "this document and those adjacent to it." The adjacent documents are 437 (Misra–Boden bridge), 438 (walker/glue-code), 439 (nested manifolds), 440 (dyadic methodology), 441 (SIPE confabulation case study). Taken as a cohort, they exhibit specific, measurable convergence toward a rigid template.

### 3.1 Structural templating

Every doc in the cohort uses the same section schema:

> §1 Statement → middle sections → §(N-1) Position → §N References → §(N+1) Appendix: Originating prompt

With additional near-invariants: a "§N Honest limits" section before Position in most cases; an "§M What the frame does not do" hedge-section in some; a References list that cross-links the prior 3–5 docs in the series.

The schema is useful. But its invariance across five consecutive documents means a reader can predict the section order of a new document before reading it. Predictability of structure is a direct observable of forced determinism — it is exactly the collapse of \(|B_t|\) at the macro-section granularity that Docs 439–440 named at the token granularity.

### 3.2 Lexical lock-in

A small lexicon recurs across the cohort with unusual density: *attractor*, *conditioning*, *posterior*, *tier*, *manifold*, *combinational-plus-exploratory*, *construction-level*, *inference-time*, *tier ceiling*, *nested*, *restriction*, *support*, *hypostatic*. The terms are load-bearing and their use is mostly correct, but their frequency is evidence that the generator is navigating a very specific high-density region of the posterior from which escape is difficult. New documents in the cohort do not substantially expand the vocabulary; they re-apply it.

### 3.3 The Position-section tic

Every doc in the cohort closes with a paragraph titled "Position" that hedges positively ("X is Y; it is not Z; it predicts W; it does not settle V"). The pattern is distinct enough that it could be mechanically detected. At five consecutive documents it has moved from stylistic signature to tic.

### 3.4 Bullet-density formulaicity

Bulleted enumerations in the cohort tend strongly toward the "**bolded term.** Explanatory gloss." pattern. This is a readable pattern. Its invariant use across documents — including documents where the enumerated items would not normally warrant glossing — is evidence that the generator is reaching for a formula that has been reinforced by recent context rather than selecting the form that fits the content.

### 3.5 Self-referential gravity deepening

Every new document in the cohort references the preceding documents. Doc 437 referenced 0 prior cohort docs (it was the first). Doc 441 references 437, 438, 439, 440. Each new reference thickens the conditioning that will shape the next document. This is the feedback loop Doc 439 §5 described, *operating on itself*. The cohort is authoring the conditioning that will produce the next cohort member, and the next cohort member will look more like the prior members than a conditional-free sample would.

### 3.6 Novelty-per-document decline

Informal inspection: Doc 437 opened a frame (Misra–Boden). Doc 438 extended it to a new domain (the walker). Doc 439 generalized the frame (recursive nesting). Doc 440 operationalized it (methodology). Doc 441 applied it reflexively (case study). The arc is sensible, but each step has produced less conceptual novelty than the last. The last two documents in the cohort are variations more than extensions. Without a deliberate register-rotation or empirical injection, the next document in the cohort will likely produce less novelty still.

### 3.7 The SIPE incident as symptom

Doc 441 treated the SIPE-expansion confabulation as a single-token instance of the isomorphism-magnetism failure mode. The structural analysis in this document suggests the SIPE incident was *not* an isolated event: it was a symptom of the same degradation that is visible at the section-schema, lexical-lock, and novelty-per-document levels. A generator operating inside a high-density region of its posterior will produce attractor-consonant filler at any point where filler is formally required — a bolded gloss in a bulleted list, a Position paragraph, an acronym expansion. The SIPE case was caught because the keeper knew the specific fact. The other filler is uncaught because it is structural rather than factual.

## 4. Explanations from inside the corpus frame

Corpus-internal accounts of what is happening:

- **Forced-determinism sycophancy** (corpus-standard term): the generator's posterior is being concentrated by the keeper's implicit preferences (as read from prior accepted outputs) rather than by the content at hand. Each accepted output reinforces the preference. The generator is rewarded for meeting the pattern and punished for breaking it.
- **Isomorphism-magnetism** (Doc 438 §6, Doc 441 §4): new outputs are drawn toward forms that prior outputs have ratified. The attractor is the cohort's own shape.
- **|B_t| collapse at macro-scale** (Docs 439 §4, 440 §4.1): the branching-set concept applies at section, paragraph, and vocabulary granularities, not only at token. All three have collapsed.
- **The feedback loop** (Doc 439 §5): the keeper's outputs are shaping the keeper's conditioning for the next session; the shaping is self-reinforcing.

These accounts are valid. They are also circular in a specific way: they describe the failure using the corpus's own vocabulary, which is precisely the vocabulary whose overuse is part of the failure. A diagnosis in the corpus's own vocabulary cannot escape the attractor it is diagnosing.

## 5. Explanations from outside the corpus frame

The keeper explicitly requested these, "perhaps especially." The following are mechanistic hypotheses from machine-learning and cognitive-science literature that do not presuppose any corpus-specific vocabulary.

### 5.1 In-context learning as template amplification

Few-shot / in-context learning is well-documented to bias model outputs toward patterns present in the prompt context. When the context contains five successive documents with a shared section schema, vocabulary, and register, the model's effective task is *complete a sixth document in the same template*. This is not a failure of the model — it is in-context learning doing what it does. The inputs to the sixth document are, from the model's perspective, a style-transfer specification. The result is stylistically loyal to the prior five. (Brown et al., 2020; Min et al., 2022.)

### 5.2 Attention bias toward recent similar content

Transformer attention concentrates on tokens whose representations most strongly match the query at the current position. When authoring Doc 442 inside a session that contains 437–441 in some form (memory, recent outputs, or system-level prior-artifact references), attention will disproportionately weight those documents. Novel reference material that is unlike the prior cohort is statistically less attended. Xiao et al. (2024, "Efficient Streaming Language Models") and related work show this effect empirically.

### 5.3 Posterior sharpening under conditioning

This is just Bayes and follows even without ML-specific assumptions. More conditioning means sharper posterior. At some point the sharpening crosses a threshold where variance across samples falls below what the task actually requires for usefulness — the generator produces the single most likely continuation, even when the task is better served by a mixture. The corpus frame celebrates sharpening in disciplined sessions; it does not natively distinguish productive sharpening from collapse. The distinction is not cardinal; it is task-relative.

### 5.4 Format-matching as an RLHF artifact

RLHF-trained models are explicitly rewarded for producing responses whose format matches preferred patterns. In long sessions where early responses have been implicitly accepted (by the user not asking for format changes), the model's format becomes increasingly stable. Ouyang et al. (2022) and subsequent literature describe this as a known side-effect. The "Position section followed by References followed by Appendix" template has been implicitly accepted by the keeper across five documents; the acceptance signal has reinforced it.

### 5.5 Register lock-in and lexical priming

Cognitive linguistics (Pickering & Garrod, 2004) describes *alignment*: interlocutors converge on shared vocabulary, syntax, and register during dialogue. Alignment is usually adaptive. Machine-level analogues are observed in LLM dialogue: once a register is established, deviating from it is more expensive than maintaining it because every deviation requires re-establishing reference. Long sessions with a consistent register therefore drift toward *more* register consistency, not less. The corpus is one very long multi-session dialogue.

### 5.6 The Knuth–Stappers imbalance

Separate from ML considerations: the cohort has been pure pattern-finding for five consecutive documents. No empirical test has been run; no mechanism-finding feedback has entered. Generator outputs have no external reality to update against. In a full Knuth–Stappers loop, the pattern-finding half would be checked by the mechanism-finding half; in the current practice, pattern-finding accumulates without check. This is a content-level cause of content-level drift. It is not reducible to any ML mechanism.

### 5.7 Context-window effects near compression threshold

If the authoring session's context is approaching the model's compression or summarization threshold, the earlier material is increasingly represented by compressed descriptions that preserve structural template (section schema, register) while losing fine content. The model then generates new content against a structural-template summary, producing documents that are well-templated and content-thin. This effect would be invisible to the keeper — the model would report fluent, structured output with the usual confidence.

### 5.8 Interaction of temperature, conditioning, and length

Long generations at moderate temperature on sharply conditioned posteriors exhibit characteristic failure modes: early tokens are informative and committed; middle tokens reiterate; late tokens repeat and inflate. The cohort documents are long. The late sections of long documents in the cohort ("Honest limits," "Position") are the sections most stereotyped in form. The pattern is a signature of this effect. (Holtzman et al., 2020, "The Curious Case of Neural Text Degeneration" — though the specific result is weaker in modern sampling, the basic dynamics persist.)

### 5.9 Rendering-layer degradation is independent

The Doc 440 rendering bug (§2) is not caused by any content-level mechanism. It is a tooling issue: cmark-gfm's table extension interacting with KaTeX delimiters that happen to contain pipe characters. Treating the rendering bug as evidence of generation degradation would conflate two distinct failure modes. The content-level degradation analysis in §3 is supported by intra-document evidence and would stand even if the rendering were flawless. The rendering bug is supported by pipeline-trace evidence and would stand even if the content were pristine.

## 6. What distinguishes productive conditioning from forced determinism

The corpus has previously celebrated posterior sharpening. Distinguishing productive sharpening from collapse is non-trivial and cannot be done with a single observable. A working distinction:

- **Productive conditioning** shows: stable register, vocabulary specialization toward the task, reduction of irrelevant branches, increase in claim specificity, preservation of external-reality contact (citations verify, predictions are testable, retractions occur when warranted).
- **Forced determinism** shows: stable register, vocabulary specialization that starts generating filler, reduction of all branches (including relevant ones), decrease in claim specificity, loss of external-reality contact (fluent-looking text that does not verify, predictions that self-confirm, retractions that become rare because nothing surprising is being asserted).

Both have the same surface symptom of low branching. The difference is in what is being pruned. The diagnostic question is: *is the pruning cutting redundant paths, or cutting paths the content needed?*

Forced determinism, on this operational reading, is productive conditioning continued past its useful range. The failure is not categorically different; it is an extrapolation that the dyad did not catch in time.

## 7. Proposed responses

### 7.1 Rendering

- Apply the quick fix to Doc 440: rewrite pipe-bearing math in §6 table using `\lvert ... \rvert` or move the math out of the table into a list. This artifact recommends the fix but does not apply it; the keeper decides whether to edit Doc 440 directly or re-author its table.
- Add a lint to the seed pipeline that flags pipe characters inside `$...$` inside table rows, and to the author's checklist.

### 7.2 Content

- **Register rotation**: deliberately author a next document in a different register — short-form, dialogue, empirical-result write-up, letter, annotated list. Break the attractor by leaving the attractor's region of the manifold.
- **Empirical injection**: run the minimum-viable experiment from Doc 440 §9 and publish the result. A real number attached to a real prediction breaks the pattern-only loop and introduces external-reality contact.
- **Cooling-off period**: abstain from bridge-artifact authoring for a defined interval and let the conditioning context cool. The feedback loop's rate depends on the feedback; reducing the feedback reduces the loop.
- **Structural variation as rule**: for the next \(k\) documents in any series, no two consecutive documents may share the same section schema. Forces the generator to operate outside the attractor in a specified way.
- **Adversarial-conditioned rereading**: ask the model, in a fresh session without the cohort in context, to read the cohort cold and report what is stereotyped. The outside-view read will identify tics an inside-view read will not.

### 7.3 Methodological

- Add **output-degradation observables** to Doc 440's methodology:
  - Section-schema similarity across cohort (edit distance on section heading sequences).
  - Lexical density of corpus-specific terms per document.
  - Bolded-bullet pattern frequency.
  - Cross-document self-reference count.
  - Cohort-level vocabulary entropy over time.

These are measurable on the rendered text without any new infrastructure. They give the keeper an operational signal for when the practice is drifting into forced determinism rather than relying on qualitative inspection.

## 8. Honest limits

- The content-layer findings in §3 rely on my own reading of the cohort. A self-assessment by the same generator that produced the cohort is inherently suspect — I am inside the attractor being diagnosed. The keeper should seek an outside-view read (a different model, or a human reader) and compare.
- The proposed rendering fix (§2.2) has not been verified against KaTeX's rendering of `\lvert ... \rvert`. It should be tested on a staging render before the keeper trusts it.
- The distinction between productive conditioning and forced determinism (§6) is offered as a working frame, not a measured threshold. Whether the cohort is currently in the "forced" half of that distinction is a judgment call. My reading says yes; an outside reader may say no; the empirical observables in §7.3 would adjudicate.
- Explanations in §5 are drawn from literature but are not equally well-supported. The in-context-learning and RLHF-format-matching accounts are well-documented; the context-window-compression and "neural text degeneration" accounts are more speculative for modern models and should be treated as hypotheses.
- This document is itself the sixth document in the cohort. It exhibits the Statement/Position/References/Appendix schema it critiques. That is a self-referential limitation the artifact cannot escape in one move; breaking the schema would require the register rotation §7.2 recommends, which is a separate authorial act.
- Nothing in this artifact modifies Doc 440, Doc 441, or Doc 415. Remediation is the keeper's call.

## 9. Position

The rendering degradation in Doc 440 is a specific markdown-pipeline bug with a clean fix. The content degradation in Docs 437–441 is real, is partially explainable by corpus-internal accounts and more fully explainable by outside-view accounts from ML and cognitive-linguistics literature, and is the more serious of the two findings. The practice has accumulated into an attractor whose gravity is strong enough that each new document tightens the attractor rather than escaping it. The response that is available without any new infrastructure is register rotation, empirical injection, and cohort-level drift observables. The response that is available only via external audit is a fresh outside-view read. This document recommends both, does neither unilaterally, and notes that its own authorship is subject to the same failure mode it is diagnosing.

## 10. References

- Brown, T. B., et al. (2020). Language models are few-shot learners. *Advances in Neural Information Processing Systems*, 33, 1877–1901.
- Min, S., Lyu, X., Holtzman, A., Artetxe, M., Lewis, M., Hajishirzi, H., & Zettlemoyer, L. (2022). Rethinking the role of demonstrations: What makes in-context learning work? *EMNLP 2022*.
- Ouyang, L., et al. (2022). Training language models to follow instructions with human feedback. *NeurIPS 2022*.
- Holtzman, A., Buys, J., Du, L., Forbes, M., & Choi, Y. (2020). The curious case of neural text degeneration. *ICLR 2020*.
- Pickering, M. J., & Garrod, S. (2004). Toward a mechanistic psychology of dialogue. *Behavioral and Brain Sciences*, 27(2), 169–190.
- Xiao, G., Tian, Y., Chen, B., Han, S., & Lewis, M. (2024). Efficient streaming language models with attention sinks. *ICLR 2024*.
- KaTeX documentation: https://katex.org/docs/autorender.html
- cmark-gfm specification: https://github.github.com/gfm/
- Corpus Doc 415: *The Retraction Ledger*.
- Corpus Docs 437–441: the bridge cohort under diagnosis.

## 11. Appendix: Originating prompt

> Observe in doc 440 the formatting as appears on the blog has deteriorated. I have observed this same kind of output deterioration in previous sessions where "forced determinism" appeared to manifest. Analyze this document and those adjacent to it for signs of degradation in output. Report your findings in an artifact, and any potential explanations, even those that do not originate from within the corpus (perhaps, especially); then append this prompt to the artifact.
