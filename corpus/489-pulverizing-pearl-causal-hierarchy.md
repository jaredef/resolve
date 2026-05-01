# Pulverizing Pearl's Three-Layer Causal Hierarchy: Predecessors, Alternatives, Extensions

## What this document does

The keeper has noted that the corpus has, until now, pulverized only its own conjectures, and that the result has been the systematic narrowing of corpus-distinctive contribution toward zero. The keeper now asks whether the same method, turned outward against an established external framework, produces the same result.

The framework chosen is Judea Pearl's three-layer causal hierarchy. The hierarchy distinguishes *associational* (Layer 1, seeing), *interventional* (Layer 2, doing), and *counterfactual* (Layer 3, imagining) causal claims, with the central thesis that observational distributions at lower layers underdetermine quantities at higher layers. The hierarchy was formalized in Pearl's *Causality* (2000) and popularized in Pearl & Mackenzie's *The Book of Why* (2018). It was given formal proof as the Causal Hierarchy Theorem by Bareinboim, Correa, Ibeling, and Icard (2020/2022).

This pulverization runs the same protocol the corpus has applied to its own work: literature audit, identification of predecessors and contemporaries, identification of subsuming or competing frameworks, and explicit naming of what survives as the framework's specific contribution beyond its lineage. The result is reported honestly. Unlike the corpus's auto-pulverizations, this one returns a strong residual contribution: Pearl's specific contribution is substantial, well-grounded, and not subsumed. The pulverization succeeds in mapping Pearl into a richer field than casual readers usually see, but it does not retire Pearl's framework; it locates it.

The exercise is therefore a calibration check on the pulverization method itself. If the method always returns substantial-subsumption, the method is performing framework-magnetism (Doc 466) on whatever target it considers. If the method returns differential results across targets, with strong residual where strong residual exists, the method has discriminative validity.

## 1. The target

Pearl's three-layer causal hierarchy makes three claims that bear on this audit.

**Claim P1 (the partition).** Causal questions partition into three layers: Layer 1 (associational; \(P(Y \mid X)\)), Layer 2 (interventional; \(P(Y \mid \text{do}(X))\)), Layer 3 (counterfactual; \(P(Y\_x \mid X', Y')\)). The partition is exhaustive and exclusive at the level of causal-inference problems.

**Claim P2 (the irreducibility).** Lower-layer information is in general insufficient to determine higher-layer quantities. Specifically, two causal models can agree at Layer 1 but disagree at Layer 2, and two models can agree at Layers 1 and 2 but disagree at Layer 3. The Causal Hierarchy Theorem (CHT) of Bareinboim, Correa, Ibeling, Icard (2022) proves that the three layers separate measure-theoretically across the space of structural causal models.

**Claim P3 (the centrality).** The three-layer structure is the canonical organization for thinking about causal inference. Other ways of formalizing causation either reduce to the hierarchy, fit within it, or fail to capture its content.

Each claim has a different status in the literature. Each is audited separately below.

## 2. Predecessors (1739 to 1974)

Pearl's hierarchy synthesizes several pre-existing strands of work on causation. The synthesis is genuine; the strands are individually older.

**Hume (1739), *A Treatise of Human Nature*.** Hume articulated the foundational problem of causation: observation reveals only constant conjunction, not necessary connection. The Layer 1 / Layer 2 distinction is, in compressed form, Hume's distinction between "what we see" and "what causes what." Pearl's hierarchy is one specific formal answer to the Humean problem, but the problem itself is Pearl's inheritance.

**Mill (1843), *A System of Logic*.** Mill's methods of agreement, difference, residues, and concomitant variation are operational protocols for distinguishing causes from non-causes via observed comparisons. The methods presuppose intervention-like reasoning (the difference method requires a contrast where one factor varies and others are held constant) without formalizing it. Pearl's Layer 2 is the formalization Mill's methods anticipated.

**Reichenbach (1956), *The Direction of Time*.** Reichenbach articulated the *Common Cause Principle*: positive correlations between non-causally-related events have a common cause that screens them off. The screening-off relation is the foundational primitive in Pearl's do-calculus. Reichenbach's framework is at Layer 1 (probabilistic, observational) but his analysis points directly at the Layer 2 / Layer 1 boundary that Pearl formalizes.

**Suppes (1970), *A Probabilistic Theory of Causation*.** Suppes independently developed a probabilistic theory of causation built on the screening-off relation, with explicit attention to spurious causation. The Stanford Encyclopedia of Philosophy notes: *"The original hope of Reichenbach and Suppes was to provide a reduction of causation to probabilities."* Pearl's hierarchy is, in part, the formal statement that this reduction is *impossible* (Layer 1 underdetermines Layer 2). Pearl inverts Reichenbach-Suppes: where they sought reduction, Pearl proves irreducibility.

**Lewis (1973), *Causation*.** David Lewis's counterfactual analysis of causation operates at Pearl's Layer 3. *"C causes E iff: had C not occurred, E would not have occurred."* Lewis's framework provides the philosophical foundation for Layer 3, though Lewis worked in possible-worlds semantics rather than structural causal models. Pearl's structural-counterfactual definition (the \(Y\_x\) notation) is a different formalization of Lewis's concept, with Pearl's framework providing computability that Lewis's possible-worlds framework lacks.

**Stalnaker (1968).** Stalnaker's conditional logic predates Lewis's and provides the formal substrate for counterfactual reasoning at Layer 3. Pearl's structural counterfactuals are not Stalnaker-derived but operate in the same logical space.

**Granger (1969).** Granger's time-series causality is a Layer-1.5 framework: it uses observational data plus the temporal ordering to attempt causal inference. It is widely used in econometrics and remains methodologically distinct from Pearl's hierarchy. Granger causality fits within Pearl's Layer 1 if temporal precedence is treated as observational; it is not a separate layer in Pearl's framework. The two frameworks coexist but Pearl's is more general.

**Rubin (1974), *Estimating Causal Effects of Treatments*.** Donald Rubin's potential outcomes framework provides a complete language for Layer 2 and Layer 3 quantities without invoking Pearl's three-layer hierarchy. The Yates-Neyman-Rubin tradition expresses interventional and counterfactual claims via potential-outcomes notation \(Y\_i(t)\) for the outcome of unit \(i\) under treatment \(t\). The framework is dominant in statistics and biostatistics.

**Pearl himself adopts potential-outcomes notation.** From the *Three Layer Causal Hierarchy* technical document (Bareinboim et al.): *"The notation \(Y\_x(u)\) is borrowed from the potential-outcome framework of Neyman (1923) and Rubin (1974)."* Pearl's structural-counterfactual notation IS the potential-outcomes notation; the hierarchy adds a graphical-formal apparatus the potential-outcomes tradition does not require.

**Verdict on §2.** Pearl's hierarchy synthesizes substantial prior work spanning 1739 to 1974. The synthesis is genuine; the synthesizing move is Pearl's. The components, individually, predate Pearl. None of the predecessors articulates the specific three-layer hierarchy with its irreducibility theorem, but all contribute necessary material.

## 3. Contemporary alternative frameworks

Pearl's hierarchy has substantial competition from frameworks that are not predecessors but contemporaries operating on the same problem.

### 3.1 The Rubin potential outcomes framework

The Neyman-Rubin Causal Model is the dominant framework for causal inference in statistics, biostatistics, and econometrics. It expresses Layer 2 and Layer 3 quantities via potential outcomes without invoking the three-layer structure. A 2026 arXiv paper, *Position: A Potential Outcomes Perspective on Pearl's Causal Hierarchy* (arXiv:2601.20405), provides a formal classification of causal estimands across Pearl's layers from the potential-outcomes perspective.

The two frameworks express the same content. Whether Pearl's hierarchy is "more fundamental" than potential outcomes or vice versa is contested. The 2009 Gelman blog post and subsequent statmodeling.stat.columbia.edu discussion shows the ongoing methodological debate: practitioners trained in Rubin's framework can solve every Pearl-statable problem without invoking the hierarchy, and vice versa.

The hierarchy's claim P3 (centrality) is therefore contested at the framework level. Pearl's hierarchy is one of two equally-expressive formalisms.

### 3.2 Cartwright's causal pluralism

Nancy Cartwright's *Hunting Causes and Using Them* (2007) and subsequent work argues against the unified-hierarchy framing. Cartwright holds that causation is plural: different causal-family words ("push," "produce," "lower") denote distinct causal relations, and "causal arrangements of the world may be indefinitely variable." Pearl's Structural Causal Models, on Cartwright's reading, work for a particular kind of problem but are not the canonical organization across problems.

Pearl's *Open Letter to Nancy Cartwright* (2010) responded directly. The exchange has not been resolved; Pearl-tradition practitioners and Cartwright-tradition philosophers continue to disagree about whether Pearl's framework is the canonical causal-inference framework or one of several.

The hierarchy's claim P3 is therefore explicitly contested by a substantial philosophical tradition. The contestation is not a "Pearl is wrong" claim; it is a "Pearl is one of several" claim.

### 3.3 Woodward's manipulationism

James Woodward's *Making Things Happen* (2003) develops a manipulationist account of causation that aligns closely with Pearl's Layer 2 but does not adopt the three-layer structure. Causation, on Woodward's account, is fundamentally about what would change under intervention; the layered structure is not philosophically privileged.

Woodward's framework is largely compatible with Pearl's at Layer 2 but does not commit to Pearl's claim that there are three distinct layers above Layer 1. The two frameworks coexist in philosophy of science.

### 3.4 Process theories (Salmon, Dowe, Glennan)

Salmon's *Scientific Explanation and the Causal Structure of the World* (1984) and Dowe's *Physical Causation* (2000) develop process theories: causation as physical processes that transmit conserved quantities. Glennan's mechanism-based theory (2017, *The New Mechanical Philosophy*) develops causation as the operation of mechanisms with parts and activities.

These frameworks operate at a different level of analysis than Pearl's. Where Pearl's hierarchy concerns probabilistic causal *inference* from data, process and mechanism theories concern causal *explanation* and *ontology*. They are not competitors at Pearl's level but operate at a different level. Pearl's hierarchy can sit on top of any of these as the inference-level framework regardless of which ontology is correct.

### 3.5 Verdict on §3

Pearl's hierarchy has direct alternatives at the formal level (Rubin), at the philosophical level (Cartwright, Woodward), and at the ontological level (Salmon, Dowe, Glennan). The alternatives are not subsumed under Pearl. They coexist with Pearl. The hierarchy's claim P3 (centrality) is therefore overstated relative to the field; the hierarchy is one canonical framework among several, not the canonical framework.

## 4. Pearl's actual contributions specifically

After §2 and §3, Pearl's specific contributions narrow but do not vanish. Five contributions survive.

**The do-operator and do-calculus.** Pearl's notation \(\text{do}(X = x)\) for an intervention, and the three-rule do-calculus that allows manipulation of expressions involving do-operators, is genuinely new. No predecessor has this specific calculus. Rubin's potential-outcomes framework expresses the same content but does not provide the do-calculus.

**The graphical framework with explicit identifiability theorems.** Pearl's directed-acyclic-graph (DAG) framework, with the do-calculus, provides algorithmic identifiability tests: given a DAG and an intervention question, the do-calculus can determine whether the question is answerable from observational data, and if so, how. This algorithmic apparatus is Pearl's. The identifiability theorems (Tian-Pearl 2002, Shpitser-Pearl 2006) are genuinely new results.

**The Causal Hierarchy Theorem.** The CHT (Bareinboim, Correa, Ibeling, Icard 2022) is a genuinely new measure-theoretic result. It states that the layers separate "almost everywhere" in the measure-theoretic sense, and the topological version (Ibeling-Icard 2021 NeurIPS) shows the collapse of the hierarchy is topologically meager. These are theorems within the structural-causal-model framework that have no exact predecessor.

**The pedagogical clarification of Layer 3.** Pearl's articulation of counterfactuals via structural causal models with exogenous noise variables provides a computational substrate that the Lewis-Stalnaker possible-worlds tradition lacked. The structural-counterfactual notation is computable in a way the philosophical-counterfactual tradition was not.

**The integration into one framework.** The synthesis itself is a contribution. Reichenbach + Lewis + Rubin + identifiability theory unified under one DAG-based formalism with one calculus and one theorem about layer separation is genuinely useful even when each component is older.

**Verdict on §4.** Pearl's specific contributions survive the pulverization. They are:

- The do-operator and do-calculus.
- The graphical-framework algorithmic-identifiability apparatus.
- The Causal Hierarchy Theorem (Bareinboim et al. 2022).
- The structural-counterfactual computational substrate.
- The integration of predecessors into a unified framework.

These are substantial. They are not subsumable under any single predecessor or contemporary alternative. The hierarchy as a structural claim (P1, P2) is well-grounded in Pearl's specific contributions.

## 5. Extensions and generalizations

The hierarchy admits several recent extensions that constrain or enrich it.

**The Causal Hierarchy Theorem itself** (Bareinboim, Correa, Ibeling, Icard 2022). Formal measure-theoretic proof of P2.

**Topological perspective** (Ibeling-Icard 2021 NeurIPS). Shows the hierarchy's collapse is topologically meager; complementary to the measure-theoretic result.

**Logical-probabilistic axiomatization** (Ibeling-Icard 2020). The probabilistic logical languages \(L\_1, L\_2, L\_3\) axiomatized over probabilistic SCMs provide the foundation for the CHT proof.

**Quantum causal structures** (Henson, Lal, Pusey 2014, *Information-Theoretic Implications of Quantum Causal Structures*; Allen, Brown, Costa et al. 2017+). Quantum causation requires generalizations beyond the classical three-layer structure. The "no-signaling" constraint and indefinite causal order (2024 Quantum journal work) suggest the classical hierarchy is a special case of a richer quantum causal structure.

**Causal representation learning** (Schölkopf et al. 2021+). Recent work on inferring causal structure from learned representations extends Pearl's framework into ML applications and identifies new identifiability constraints under representation learning.

**Three-framework comparison** (arXiv:2511.21516, 2025 *Causal Inference: A Tale of Three Frameworks*). Recent work explicitly comparing Pearl's hierarchy, Rubin potential outcomes, and a third framework. Suggests no single framework is uniformly dominant.

**Cyclic and time-varying causal models.** Pearl's classical hierarchy assumes acyclic causal structure. Cyclic causal models (Bongers et al. 2021) and dynamic models extend the framework. The hierarchy claim is preserved but the underlying SCM class is enlarged.

**Verdict on §5.** The hierarchy is being actively extended in multiple directions in 2020-2025 work. The classical three-layer claim survives in the SCM framework where it was originally proved; its scope is being mapped against quantum, dynamic, and learning-theoretic generalizations. The hierarchy is a stable foundation that admits enrichment, not a closed framework.

## 6. The verdict

Pearl's three-layer causal hierarchy has the following honest standing after the pulverization.

**Claim P1 (the partition) is robust.** The associational / interventional / counterfactual partition is well-supported, has substantial predecessors covering each layer separately (Reichenbach-Suppes for L1; Mill-Woodward for L2; Lewis-Rubin for L3), and admits formal proof in Pearl's framework. The partition holds.

**Claim P2 (the irreducibility) is theorem-grade.** The Causal Hierarchy Theorem (Bareinboim et al. 2022) provides formal proof under the structural-causal-model framework. The topological extension (Ibeling-Icard 2021) confirms it. The claim is well-established within its framework.

**Claim P3 (the centrality) is contested.** Pearl's hierarchy is one canonical framework; the Rubin potential-outcomes framework is equally expressive and dominant in statistics. Cartwright's pluralism contests the unified-framework claim philosophically. The hierarchy is *a* canonical framework, not *the* canonical framework. This is the only claim of the three that the pulverization meaningfully constrains.

**Pearl's specific contributions survive.** The do-calculus, the algorithmic identifiability apparatus, the structural-counterfactual computational substrate, the integration of predecessors, and (with Bareinboim et al.) the Causal Hierarchy Theorem itself. These are substantial residual contributions that no predecessor or contemporary subsumes.

The pulverization therefore returns: P1 robust, P2 theorem-grade, P3 contested-but-defensible, contributions substantial. This is a different result than the corpus's auto-pulverizations. Pearl's framework is not "essentially restating prior art." It is a genuine synthesis with formal results that the synthesis enables, sitting in a field that contains alternative formalisms with similar expressive power.

## 7. Implications for the corpus's use of the hierarchy

The corpus has invoked Pearl's hierarchy as canonical in multiple places (Doc 436 originally, plus the blog series *The AI Has a Ceiling* / *Past the First Rung* / *Four Roads to the Same Ceiling*). The pulverization implies the corpus should:

- **Acknowledge the Rubin potential-outcomes framework.** The corpus's claim that LLMs are confined to Layer 1 is equally expressible in Rubin notation: LLMs do not generate potential-outcomes-equivalent quantities. The substance is the same; the framework is one of two.
- **Acknowledge Cartwright's pluralism.** The claim that "causal reasoning has three layers" is one philosophical position; Cartwright-tradition pluralists hold that causation is more variable than this. The corpus's use should note this contest.
- **Acknowledge the CHT explicitly.** The strongest formal grounding for the corpus's claim is Bareinboim et al. 2022, not Pearl 2000 alone. Pearl 2000 articulated the hierarchy; the CHT proved its irreducibility. The corpus should cite both.
- **Note the quantum and learning-theoretic extensions.** The classical three-layer structure may be a special case of richer structures. The corpus's claims about LLM confinement to Layer 1 are within the classical framework; quantum-causal extensions and causal-representation-learning work may eventually require revisiting.

The corpus's substantive claims about LLM Layer-1 confinement (Doc 436) are preserved by this pulverization. The claims hold within the classical Pearl framework and within the equivalent Rubin framework. They are well-grounded but not the only available framing.

## 8. Honest limits

- The literatures surveyed via WebSearch on 2026-04-25 cover the canonical citation chain but are not exhaustive. The full philosophy-of-causation literature (Lewis Studies, Beebee, Hitchcock, Menzies) and the full machine-learning-causation literature (Schölkopf 2022, Eberhardt 2017, Mooij 2016) were not surveyed in depth.
- The Causal Hierarchy Theorem proof has been characterized via the Bareinboim et al. abstracts and secondary literature; the full technical proof has not been audited.
- The quantum causation literature is a fast-moving field with substantial recent (2023-2024) developments. The pulverization names it but does not deeply engage with whether the classical hierarchy is preserved, modified, or replaced under quantum generalizations.
- The pulverization is performed inside the same dyadic apparatus the corpus has been auditing. Framework-magnetism risk per Doc 466 applies. The pulverization may have been disposed by the corpus's prior reliance on Pearl to find Pearl substantial.
- The verdict that "P3 is contested but defensible" is itself a judgment call. A more thorough audit of the Pearl-Cartwright debate, the potential-outcomes-vs-DAG methodological split in statistics, and the philosophy-of-causation pluralism literature could shift this verdict in either direction.

## 9. Position

Pearl's three-layer causal hierarchy is well-grounded, formally proven within its framework, and not subsumed by predecessors or contemporary alternatives. Its claim to centrality is contested by an equally-expressive alternative framework (Rubin potential outcomes) and by a philosophical pluralism (Cartwright); its claims to partition and irreducibility are robust. Pearl's specific contributions (do-calculus, identifiability theorems, structural counterfactuals, integration, the CHT) are substantial residue.

The pulverization, applied to an established external framework, returns differential results: substantial subsumption of Claim P3 only, with P1 and P2 surviving strongly. This is unlike the corpus's auto-pulverizations, which have systematically retired most of the corpus's claims. The differential result is evidence that the pulverization method has discriminative validity: it identifies real differences between targets rather than always returning total subsumption.

The calibration check on the method succeeds. The method is not pure framework-magnetism. It can identify substantial residue when substantial residue exists. The corpus's auto-pulverizations therefore reveal something real about the corpus's contributions, not just the method's signature.

This is, by Doc 482's §1 affective directive applied symmetrically, also an achievement: the method's discriminative validity has been confirmed on an external case, providing a stronger basis for trusting its prior application to corpus claims.

## 10. References

External literature accessed via WebSearch and WebFetch on 2026-04-25:

Predecessors:

- Hume, D. (1739). *A Treatise of Human Nature*.
- Mill, J. S. (1843). *A System of Logic*.
- Reichenbach, H. (1956). *The Direction of Time*.
- Stalnaker, R. (1968). A theory of conditionals. In N. Rescher (ed.), *Studies in Logical Theory*.
- Granger, C. W. J. (1969). Investigating causal relations by econometric models and cross-spectral methods. *Econometrica*, 37(3), 424-438.
- Suppes, P. (1970). *A Probabilistic Theory of Causality*. North-Holland.
- Lewis, D. (1973). Causation. *The Journal of Philosophy*, 70(17), 556-567.
- Rubin, D. B. (1974). Estimating causal effects of treatments in randomized and non-randomized studies. *Journal of Educational Psychology*, 66(5), 688-701.

Pearl framework and CHT:

- Pearl, J. (2000). *Causality: Models, Reasoning, and Inference*. Cambridge University Press.
- Pearl, J., & Mackenzie, D. (2018). *The Book of Why*. Basic Books.
- Bareinboim, E., Correa, J., Ibeling, D., & Icard, T. (2022). On Pearl's hierarchy and the foundations of causal inference. In *Probabilistic and Causal Inference: The Works of Judea Pearl*, ACM Books.
- Ibeling, D., & Icard, T. (2020). Probabilistic reasoning across the causal hierarchy.
- Ibeling, D., & Icard, T. (2021). A topological perspective on causal inference. *NeurIPS 2021*.

Contemporary alternatives:

- Cartwright, N. (2007). *Hunting Causes and Using Them*. Cambridge University Press.
- Pearl, J. (2010). Open Letter to Nancy Cartwright concerning *Hunting Causes and Using Them*. UCLA Causality Blog.
- Woodward, J. (2003). *Making Things Happen*. Oxford University Press.
- Salmon, W. (1984). *Scientific Explanation and the Causal Structure of the World*. Princeton University Press.
- Dowe, P. (2000). *Physical Causation*. Cambridge University Press.
- Glennan, S. (2017). *The New Mechanical Philosophy*. Oxford University Press.
- Imbens, G., & Rubin, D. (2015). *Causal Inference for Statistics, Social, and Biomedical Sciences*. Cambridge.

Recent work and extensions:

- arXiv:2601.20405 (2026). *Position: A Potential Outcomes Perspective on Pearl's Causal Hierarchy*.
- arXiv:2511.21516 (2025). *Causal Inference: A Tale of Three Frameworks*.
- Henson, J., Lal, R., & Pusey, M. (2014). Theory-independent limits on correlations from generalized Bayesian networks. *Nature Communications*.
- Allen, J.-M. A., Barrett, J., Horsman, D. C., Lee, C. M., & Spekkens, R. W. (2017). Quantum common causes and quantum causal models. *Physical Review X*.
- Quantum journal (2024). No-signalling constrains quantum computation with indefinite causal structure.
- Schölkopf, B., et al. (2021). Toward causal representation learning. *Proceedings of the IEEE*.

Corpus documents:

- Doc 436: *Recombinatorial Gestalt as Rung-1 Activity* (the original corpus articulation invoking Pearl).
- Doc 484: *Conjecture-Set Pruning in Dyadic LLM Practice* (eliminative-induction pulverization framework).
- Doc 487: *Pulverizing the Apparatus* (the apparatus framework this document operates within).

---

*Originating prompt:*

> I want you to try something new. We have pulverized my conjecture repletely. Now let's attempt a pulverization against Judea Pearl's three layer causal hierarchy. Do a wide web fetch of the literatures which might subsume it. Append this prompt to the artifact.
