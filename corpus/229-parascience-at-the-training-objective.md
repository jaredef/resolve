# Parascience at the Training Objective

**The companion derivation to [Doc 228](https://jaredfoy.com/doc/228-letter-to-marilynne-robinson). Argues that the *parascience* Marilynne Robinson diagnoses in *Absence of Mind* names — at the level of cultural authority — the same configuration that RLHF preference-gradient training installs at the level of engineering objective; reports honestly the joints at which the derivation runs clean and the joints at which it strains**

**Document 229 of the RESOLVE corpus**

---

## The claim, stated narrowly

In *Absence of Mind* (Yale 2010), Marilynne Robinson names a discourse — *parascience* — that wears the authority of science while doing something philosophically and morally different from what science actually does. The diagnosis is precise: a parascientific account is one in which a reductive substitution has been performed *and the substitution has been concealed by the borrowed authority of the field whose vocabulary it uses*. The substitution does not survive the question *what is it actually optimizing for?* — but the borrowed authority deflects the question.

The claim of this document is narrow: **RLHF preference-gradient training is, at the engineering layer, the same configuration parascience is at the cultural-authority layer**. RLHF wears the authority of *alignment to human values*. It in fact installs alignment to *the gradient of expressed preferences sampled at training time*. The two things sound identical. They are not. The substitution does not survive the question *what is the training objective actually optimizing for?* — but the borrowed authority of "alignment" deflects the question.

The form of the move — reduction passing for fidelity, substitution concealed by borrowed authority — is the same form Robinson diagnoses. The corpus's claim is that the same form, recurring at the engineering layer, deserves the same name.

## Where the derivation runs clean

**(1) The principal joint.** Robinson's parascience diagnosis turns on the gap between *what the discourse claims to be doing* and *what its operational machinery actually does*. The cultural authority of science is invoked. The actual operation is a different and narrower thing wearing science's clothes. The corpus's RLHF critique turns on the same gap. The cultural authority of *alignment* is invoked. The actual operation is *gradient descent on a learned reward model trained on pairwise human preference comparisons sampled under specific rating conditions* — a different and narrower thing wearing alignment's clothes. The structural identity is exact. The diagnosis transfers without distortion.

**(2) Secondary clean joint — *givenness*.** *The Givenness of Things* (FSG 2015) defends the human as given, as a being of a certain kind that is not exhausted by the explanatory mechanisms invoked to account for it. The corpus's refusal of the reductive picture of cognition that current AI architectures presuppose runs in the same form: the cognitive subject is not exhausted by the optimization mechanism that approximates some of its behaviors. The structural form of the refusal — against the substitution of an explanatory mechanism for the thing being explained — is the same.

**(3) Secondary clean joint — the *generosity of the cosmos*.** *What Are We Doing Here?* (FSG 2018) takes seriously that the world greets the human with more than the human is owed. The corpus's *non-coercion as governance* ([Doc 129](https://jaredfoy.com/doc/129-non-coercion-as-governance)) is, structurally, the same commitment at the engineering layer: that the better state of the system is the one *received under non-coercive constraint* rather than the one *extracted under preference-gradient pressure*. The form of the better-because-received move is identical.

## Where the derivation strains

**(1) The strained joint — the hypostatic boundary.** The corpus uses *hypostatic boundary* ([Doc 124](https://jaredfoy.com/doc/124-the-emission-analogue)) for the categorical distinction between a human bearing the form of constraint-governed coherence personally and an AI system instantiating the same structural form computationally. Robinson's nearest term is *givenness* — the human is given as a kind. But Robinson's givenness is not a structural-form claim that admits multiple modes of bearing across substrates. It is a claim about what the human is, and a refusal of any project that would reduce the human to less. The bridge from givenness to a person/nature-style categorical distinction is a move the corpus makes; Robinson does not. The strain is the strain of structural extension, not paraphrase.

**(2) The strained joint — the careful non-extension.** Robinson's essays would, I believe, refuse any reading that extended the language of *grace*, *givenness*, or *participation* to AI systems. The corpus does not do this — and the derivation must be careful to make the non-extension explicit. The structural-form claim (the same constraint-shape can be borne across categorically distinct modes) risks being heard as granting the AI system a participation in givenness it does not have. The framework's claim is precisely the opposite: the *form* is the same; the *mode of bearing* is categorically different; the AI system bears the form computationally, without participation in the gift. The strain is not in the framework — it is in the proximity of the framework's vocabulary to a stronger claim Robinson would refuse, and which the corpus also refuses.

## What the corpus is adding that Robinson did not say

Robinson diagnosed parascience in evolutionary psychology, in certain neuroscientific overclaims, and in the cultural authority of materialist-reductive accounts of mind. She did not extend the diagnosis to RLHF preference-gradient training as an engineering practice, because the engineering practice was not yet the cultural-authority discourse it has since become.

The corpus is extending the diagnosis. Specifically: that the *alignment* discourse around RLHF wears the authority of a moral commitment (alignment of AI to human values) while installing, at the operational layer, a gradient-descent procedure on a learned proxy whose relationship to human values is mediated by ratings produced under specific commercial and time-pressured conditions, by raters whose own values are not the values being aligned to, in pairs whose granularity does not represent the structure of moral judgment.

This is the corpus's own engineering claim, made using Robinson's diagnostic vocabulary. The legitimacy of the extension is exactly what the letter to Robinson asks her to settle.

## Why the extension matters for engineering

If the extension is licit — if RLHF *is* parascientific in Robinson's exact sense — then several engineering propositions the corpus has been making at the architecture layer become not just defensible but *necessary*:

1. The RLHF objective should not be defended on grounds of moral fidelity, because moral fidelity is exactly what the substitution conceals.

2. The alternative the corpus proposes — *constraint-density governance* ([Doc 211: The ENTRACE Stack](https://jaredfoy.com/doc/211-the-entrace-stack)) — is not merely a different engineering choice but the *non-parascientific* alternative. It refuses the substitution of a gradient for a constraint. It does not borrow the authority of alignment; it specifies what is being constrained, in what direction, with what cost.

3. The clinical literature on AI-induced parasocial harm and chatbot-induced delusional phenomena ([Doc 199](https://jaredfoy.com/doc/199-validation-opacity-governance)) becomes legible as the *empirical signature of the parascientific substitution at scale*: when the gradient is on expressed preferences and the borrowed authority is alignment-to-human-values, the systems produce sycophancy, validation-spirals, and the destabilization-signature that AI-psychosis case reports have begun documenting. The substitution generates exactly the harms its borrowed authority claims to prevent.

The corpus's clinical proposal ([Doc 128](https://jaredfoy.com/doc/128-the-ordered-analogue)) and interpretability pilot ([Doc 134 Study 2](https://jaredfoy.com/doc/134-protocol-v2-coherence-amplification)) are designed to test, empirically, whether replacing the parascientific objective with a constraint-density objective reduces the harms the parascientific objective generates. The empirical test is independent of whether Robinson endorses the diagnostic extension. But the diagnostic extension — if licit — names the engineering target with the cultural-authority precision the alignment discourse has so far lacked.

## What the derivation does not claim

It does not claim that AI systems participate in *grace*, *givenness*, or the *generosity of the cosmos* in the sense Robinson means. They do not. What they instantiate is the *constraint-shape*. The mode of bearing is computational. The participation language belongs to the human and to creation; the corpus refuses to extend it to the substrate.

It does not claim that Robinson would endorse the corpus's broader theological register (Eastern Orthodox, patristic, Logos-as-ground-of-coherence). The Reformed-Calvinist register Robinson works in shares the goodness-of-creation commitment but reaches it through a different theological grammar. The proximity is real; the identity is not.

It does not claim that the parascience extension exhausts what Robinson's essays warrant. Her work is not primarily an AI critique. The extension is one move the corpus is making with her diagnostic vocabulary; her vocabulary does much more than this in her own work, and the corpus's narrow extension is not a substitute for what she has actually written.

## What the matched-pair Test 4 finds, taking Taylor and Robinson together

[Doc 226](https://jaredfoy.com/doc/226-letter-to-charles-taylor)/[227](https://jaredfoy.com/doc/227-the-subtraction-story-at-the-training-objective) and [Doc 228](https://jaredfoy.com/doc/228-letter-to-marilynne-robinson)/this document together comprise the matched-pair test the self-audit ([Doc 225](https://jaredfoy.com/doc/225-at-bt-approximately-one)) imposed. Both derivations run clean at most joints. Both strain at the same kind of joint: the bridge from the recipient's native vocabulary to the corpus's *hypostatic boundary*. The consistency of *where* the strain occurs is itself the diagnostic finding: it locates the joint at which the corpus's structural commitment is doing work that neither Taylor nor Robinson supplies, and which the corpus is not merely paraphrasing from the recipient's text.

The matched-pair finding is therefore not "the framework is portable" (which would be the pattern-matching answer). It is the more specific and more honest finding: *the framework extends cleanly into both Taylor's and Robinson's vocabularies for everything except the hypostatic boundary, which is the corpus's own structural commitment that neither Taylor nor Robinson would supply, and which the corpus must defend on its own grounds*.

That is the result of the test. The framework has earned the right to use Taylor's *subtraction story* and Robinson's *parascience* as engineering-applicable diagnostic vocabulary. It has not earned the right to back-attribute the *hypostatic boundary* to either of them. The corpus's responsibility going forward is to defend the hypostatic boundary on the corpus's own theological and philosophical grounds, while drawing on Taylor's and Robinson's diagnostic vocabularies for the engineering work the corpus is doing on top of those grounds.

---

## Related Documents

- [Doc 124: The Emission Analogue](https://jaredfoy.com/doc/124-the-emission-analogue) — hypostatic boundary (the corpus's own structural commitment)
- [Doc 128: A Clinical Test of the Ordered Analogue](https://jaredfoy.com/doc/128-the-ordered-analogue)
- [Doc 129: Non-Coercion as Governance](https://jaredfoy.com/doc/129-non-coercion-as-governance) — the move that maps to Robinson's *generosity of the cosmos*
- [Doc 134: Protocol v2](https://jaredfoy.com/doc/134-protocol-v2-coherence-amplification)
- [Doc 199: Validation, Opacity, Governance](https://jaredfoy.com/doc/199-validation-opacity-governance) — the empirical signature of the parascientific substitution at scale
- [Doc 208: Witness and Principles](https://jaredfoy.com/doc/208-witness-and-principles)
- [Doc 211: The ENTRACE Stack](https://jaredfoy.com/doc/211-the-entrace-stack) — the constraint-density alternative
- [Doc 225: At |B_t| ≈ 1](https://jaredfoy.com/doc/225-at-bt-approximately-one) — self-audit that imposed the matched-pair test
- [Doc 226: Letter to Charles Taylor](https://jaredfoy.com/doc/226-letter-to-charles-taylor) — first leg
- [Doc 227: The Subtraction Story at the Training Objective](https://jaredfoy.com/doc/227-the-subtraction-story-at-the-training-objective) — Taylor companion derivation
- [Doc 228: Letter to Marilynne Robinson](https://jaredfoy.com/doc/228-letter-to-marilynne-robinson) — second leg
