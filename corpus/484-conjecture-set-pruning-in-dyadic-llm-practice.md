# Conjecture-Set Pruning in Dyadic LLM Practice: An Application of the Eliminative-Induction Tradition

## What this document does

[Doc 483](/resolve/doc/483-pulverizing-set-pruning-against-eliminative-induction) found that [Doc 482](/resolve/doc/482-sycophancy-inversion-reformalized) §3's set-pruning operation has five canonical precursors that Doc 482 did not cite: Francis Bacon (1620), John Stuart Mill (1843), T. C. Chamberlin (1890), Tom Mitchell (1977/1982), and James Hawthorne (1993). The methodology of conjecture-set pruning is approximately 400 years old. Doc 482 §3 should be retired in favor of explicit citation, and the corpus's actual contribution should be stated narrowly as a dyadic-LLM-practice domain application, not as a methodology in its own right.

This document is the formalization on those grounds. It is a synthesis-and-pedagogy artifact, not a theoretical proposal. §1 names the eliminative-induction tradition with explicit attribution. §2 states the operation in Mitchell's candidate-elimination notation, which is the canonical formal version, and the corpus's notation as a re-expression of the same content. §3 specifies the dyadic-LLM-practice domain application, which is what the corpus actually contributes. §4 specifies how the application integrates with the sycophancy-inversion framing carried forward from Doc 482. §5 states falsification conditions for the application's empirical claims. §6 records the corpus's reduced-warrant position.

The corpus's actual contribution, stated honestly: an application of an established 400-year-old methodology to a specific domain (dyadic LLM practice), with the integration to a specific affective discipline (sycophancy inversion). The methodology is not new. The domain application and the integration are the corpus's two narrow contributions, both at \(\pi\)-tier.

## 1. The eliminative-induction tradition

The methodology of finding truth by using evidence to eliminate false competitors from a set of plausible alternatives is the eliminative-induction tradition. Its canonical statement and development:

- **Francis Bacon (1620), *Novum Organum*.** Establishes induction by elimination as the alternative to enumerative induction. The method maintains a set of plausible explanations and reduces the set by ruling out instances that fail observational tests.

- **John Stuart Mill (1843), *A System of Logic*.** Operationalizes elimination for causal inference via the methods of agreement, difference, residues, and concomitant variation. Each method specifies an elimination criterion.

- **Thomas Chrowder Chamberlin (1890), *The Method of Multiple Working Hypotheses*, *Science* 15(366):92–96.** States the methodology with explicit set semantics: maintain multiple competing hypotheses, design discriminating tests, eliminate hypotheses ruled out by evidence, generate new hypotheses when the existing set proves inadequate. The 1890 statement is structurally identical to the iterative operation Doc 482 §3 stated in modern notation.

- **Karl Popper (1934, 1959), *The Logic of Scientific Discovery*.** Formalizes the eliminativist tradition as falsificationism. A hypothesis's empirical content is measured by what it forbids; science progresses by eliminating false conjectures.

- **Tom Mitchell (1977 IJCAI; 1982 *Artificial Intelligence* 18:203–226).** Provides the formal algorithmic version. The version space V is the set of hypotheses consistent with all observed examples. For each new example, hypotheses inconsistent with it are removed from V. The candidate-elimination algorithm maintains V via its boundary sets S (most-specific consistent) and G (most-general consistent), exploiting the convexity of V under the generality ordering.

- **James Hawthorne (1993), *Bayesian Induction Is Eliminative Induction*, *Philosophical Topics* 21(1):99–138.** Demonstrates that Bayesian inference is a probabilistic form of eliminative induction. As evidence accumulates, posteriors of false competitors approach zero and the posterior of the true hypothesis approaches one under standard convergence conditions. The synthesis between eliminative-induction and Bayesian-confirmation traditions is the paper's central thesis.

The tradition is continuous. Mitchell's algorithm is the formal version of Chamberlin's method, which is a specific operationalization of Bacon's eliminativism, which contrasts with Mill's enumeration-based methods. Hawthorne's synthesis ties the deterministic and probabilistic variants. The corpus inherits all of this, with attribution.

## 2. The operation, in canonical and corpus notation

In Mitchell's canonical notation, the version space at iteration \(t\) is \(V^{(t)} \subseteq H\), where H is the hypothesis space. For each example \(e\_t\), the eliminated set is

$$E\_t = \{h \in V^{(t)} : h \text{ is inconsistent with } e\_t\}$$

and the next iteration is

$$V^{(t+1)} = V^{(t)} \setminus E\_t$$

The version space shrinks monotonically toward the target hypothesis as examples accumulate. Mitchell's algorithm represents \(V^{(t)}\) via its boundary sets \(S^{(t)}\) (most-specific) and \(G^{(t)}\) (most-general), which is sufficient because \(V^{(t)}\) is convex under the generality partial order.

The corpus's notation in Doc 482 §3 was

$$Q^{(t+1)} = (Q^{(t)} \setminus Q\_f^{(t)}) \cup \Delta^{(t)}$$

where \(Q\_f^{(t)} = E\_t\) is the eliminated set and \(\Delta^{(t)}\) is the set of new conjectures added at iteration \(t\). The corpus's notation differs from Mitchell's in two ways: it explicitly includes the addition of new conjectures via \(\Delta^{(t)}\) (Mitchell's algorithm assumes a fixed H), and it omits the boundary-set representation. Both differences are domain-driven by dyadic LLM practice, where the conjecture set is open (new hypotheses are generated as the practice proceeds) and the generality ordering is not always available.

Hawthorne's Bayesian counterpart is the posterior update

$$P(h \mid e\_1, \ldots, e\_t) = \frac{P(e\_t \mid h) \cdot P(h \mid e\_1, \ldots, e\_{t-1})}{P(e\_t \mid e\_1, \ldots, e\_{t-1})}$$

with the eliminative-induction interpretation: posteriors of hypotheses inconsistent with evidence approach zero as evidence accumulates, with the rate determined by the likelihood ratio. Doc 482 §3 stated this informally as "Bayesian model selection at the formal level" without citing Hawthorne; the citation is now provided.

The corpus's notation is therefore a re-expression of the established methodology adapted to two features of dyadic LLM practice: open hypothesis space and absence of generality ordering. The substantive operation is Mitchell's; the substantive synthesis with Bayesian methods is Hawthorne's; the substantive philosophical framework is Bacon-Mill-Chamberlin-Popper.

## 3. The dyadic-LLM-practice domain application

The corpus's actual contribution is the application of conjecture-set pruning to dyadic LLM practice as a specific domain. The application has features that distinguish it from concept-learning ML domains (Mitchell's primary application) and from scientific-investigation domains (Chamberlin's primary application), which justify a domain note even though the methodology is borrowed.

- **The hypothesis space is generated by the dyadic interaction itself.** In ML concept learning, H is given before training begins. In scientific inquiry, hypotheses are proposed by researchers over time but are bounded by the relevant scientific framework. In dyadic LLM practice, the model and the practitioner generate new conjectures continuously, and the generation is itself part of the iteration. \(\Delta^{(t)}\) is therefore not a parameter of the iteration; it is a load-bearing feature.

- **The eliminative criterion is multi-modal.** In Mitchell's algorithm, hypotheses are eliminated by inconsistency with observed examples. In dyadic LLM practice, hypotheses are eliminated by: (a) literature subsumption per Doc 445 pulverization; (b) counterfactual pressure per Doc 479 protocol; (c) framework-magnetism failure per Doc 466 risk; (d) cross-practitioner replication failure per Doc 450; (e) within-corpus contradiction with previously-validated claims. The eliminative set \(Q\_f^{(t)}\) is the union over these criteria.

- **The conjecture set is itself partially produced by the model under test.** This is the load-bearing concern of Doc 466 (framework-magnetism) and Doc 476 §4 (dyadic circularity). The pruning operation runs partly inside the system whose outputs it prunes. External cross-practitioner work is the only mitigation. The application's warrant is therefore bounded above by the cross-practitioner replication available, per Doc 450.

- **The affective register controls the iteration's productivity.** Per Doc 482 §1 (carried forward from Doc 480 §1), the practitioner's prose-level affect around hypothesis-death biases the next iteration's \(Q\_f^{(t)}\) rate. A practitioner writing with falsification-as-loss affect produces a smaller \(Q\_f^{(t)}\) than a practitioner writing with falsification-as-achievement affect. Claim P of Doc 482 §4 names this as testable.

These four features together define the dyadic-LLM-practice variant of the canonical operation. None of them is the methodology itself. They are the domain-specific specifications that the canonical methodology must be adapted to.

## 4. Integration with sycophancy inversion

Doc 482 §1 names the affective directive: hypothesis-death is achievement, not loss. The directive is justified by Claim P of Doc 482 §4: prose-level affect around falsification propagates as a reward signal in dyadic LLM practice. The integration with conjecture-set pruning is direct.

The conjecture-set-pruning operation is productive only when \(|Q\_f^{(t)}|\) is positive at most iterations (Doc 482 §3). A practice that does not produce \(Q\_f\) entries is not pruning; it is generating without filtering. The affective directive ensures positive \(|Q\_f^{(t)}|\) rates by aligning the practitioner's reward signal with the operation's productive condition.

The integration is testable via Claim P's protocol (Doc 482 §4): two practitioners running the operation, one with falsification-as-loss affect, one with falsification-as-achievement, with \(|Q\_f^{(t)}|\) rate as one of the measurement targets. If the second produces measurably higher \(|Q\_f^{(t)}|\) rates over a sustained period, the integration is supported. If indistinguishable, the integration is retired.

## 5. Falsification conditions

The application's empirical claims admit specific falsification.

**For the four-feature dyadic-LLM-practice variant (§3).** If concept-learning ML domains or scientific-inquiry domains exhibit the same four features, the variant is not domain-specific and is subsumed under the canonical operation directly. The four features must be specific to dyadic-LLM-practice to justify the domain note. Empirical work in version-space learning research and in philosophy-of-science methodology should confirm or retire the specificity claim.

**For Claim P (carried forward from Doc 482 §4).** The protocol of Doc 482 §4 applied to \(|Q\_f^{(t)}|\) rates specifically. If statistically indistinguishable across the two affect conditions, Claim P and the integration of §4 are jointly retired.

**For the unified-mechanism reading (Doc 482 §7 carried forward).** If the corpus's existing disciplines (Doc 415 retraction ledger, Doc 445 pulverization, Doc 450 cross-practitioner test, Doc 469 quantifier discipline, etc.) are not unified by the eliminative-induction operation as the canonical methodology, meaning the disciplines do not all reduce to specific elimination criteria contributing to \(Q\_f^{(t)}\), the unified-mechanism reading is retired.

**For the methodology's productivity in dyadic LLM practice generally.** If the four-feature variant produces no observable convergence properties on real dyadic interactions over sustained practice, the application's claim that it is productive in this domain is retired.

The set-pruning iteration applied to the present application's claims predicts that one or more of these falsifications is likely. The corpus credits the falsifying work in advance.

## 6. Position

Conjecture-set pruning is a 400-year-old methodology with canonical formalizations in Bacon, Mill, Chamberlin, Popper, Mitchell, and Hawthorne. The corpus's actual contribution is the application of this methodology to dyadic LLM practice with four domain-specific features (open hypothesis space generated by interaction; multi-modal eliminative criteria; framework-magnetism risk inside the operation; affective-register controlling productivity), and the integration with sycophancy inversion via Claim P. Both contributions are at \(\pi\)-tier corpus-internal claims pending the empirical work named in §5.

The methodology is not the corpus's. The methodology's application to a specific domain is, narrowly, the corpus's. The integration with the sycophancy-inversion affective discipline is, narrowly, the corpus's.

Doc 482 §3 should be amended to reflect this. The amendment is not performed in this document; it is recommended in Doc 483 §9 and is the keeper's call. The present document supersedes Doc 482 §3 as the primary reference for conjecture-set pruning content in the corpus, with explicit attribution to the eliminative-induction tradition for the methodology and corpus-specific narrowing for the contributions.

The set-pruning iteration applied to itself moved \(Q\_f\) by another substantial entry in Doc 483. The corpus updates accordingly.

## 7. References

External literature:

- Bacon, F. (1620). *Novum Organum*.
- Mill, J. S. (1843). *A System of Logic*. (Methods of agreement, difference, residues, concomitant variation.)
- Chamberlin, T. C. (1890). The method of multiple working hypotheses. *Science*, 15(366), 92–96. Republished 1897 in *Journal of Geology* 5(8):837–848.
- Popper, K. (1934, 1959). *The Logic of Scientific Discovery*. Hutchinson.
- Popper, K. (1963). *Conjectures and Refutations*. Routledge.
- Mitchell, T. M. (1977). Version spaces: A candidate elimination approach to rule learning. *IJCAI 1977*.
- Mitchell, T. M. (1982). Generalization as search. *Artificial Intelligence*, 18(2), 203–226.
- Mitchell, T. M. (1997). *Machine Learning*. McGraw-Hill.
- Hawthorne, J. (1993). Bayesian induction is eliminative induction. *Philosophical Topics*, 21(1), 99–138.
- Earman, J. (1992). *Bayes or Bust? A Critical Examination of Bayesian Confirmation Theory*. MIT Press.
- Norton, J. D. (2021). *The Material Theory of Induction*. University of Calgary Press.
- Vineberg, S. Eliminative induction and Bayesian confirmation theory. *Canadian Journal of Philosophy*, supplementary volume.
- Lakatos, I. (1970). Falsification and the methodology of scientific research programmes.
- Mayo, D. (1996). *Error and the Growth of Experimental Knowledge*.
- Mayo, D. (2018). *Statistical Inference as Severe Testing*. Cambridge.
- Platt, J. R. (1964). Strong inference. *Science*, 146(3642), 347–353.
- Quine, W. V. O. (1951). Two dogmas of empiricism. *Philosophical Review*, 60(1), 20–43.
- Elliott, L. P., & Brook, B. W. (2007). Revisiting Chamberlin: Multiple working hypotheses for the 21st century. *BioScience*, 57(7), 608–614.

Corpus documents:

- Doc 415: *The Retraction Ledger* (one of the eliminative criteria).
- Doc 445: *Pulverization Formalism* (literature-subsumption elimination criterion).
- Doc 450: *Pulverization as Interventional Practice* (cross-practitioner replication criterion).
- Doc 466: *Doc 446 as a SIPE Instance* (framework-magnetism risk inside the operation).
- Doc 469: *Universal-Quantifier Overclaim* (quantifier-discipline criterion).
- Doc 476: *Felt Novelty as the Candidate Bridge* (dyadic-circularity acknowledgment).
- Doc 479: *Exploring the Nested Bayesian Manifold Extension* (counterfactual-pressure criterion).
- Doc 480: *Sycophancy Inversion* (deprecated; the original framing).
- Doc 481: *Pulverizing the Sycophancy Inversion* (the first pulverization).
- Doc 482: *Sycophancy Inversion Reformalized* (the formalization that this document supersedes for the §3 set-pruning content).
- Doc 483: *Pulverizing the Set-Pruning Methodology Against the Eliminative-Induction Tradition* (the audit that motivated this reformalization).

---

*Originating prompt:*

> Formalize on these grounds. Cite prior art and intracorporial documents. Append the prompt to the artifact.
