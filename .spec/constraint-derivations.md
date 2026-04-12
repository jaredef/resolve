# Constraint Derivation Dataset

**A growing catalog of problems, their implicit constraints, and the determined answers that emerge when the constraints are named**

**Purpose:** Each entry is a training example for coherence-seeking models. The entry contains: the vague input, the Layer 0 failure mode, the unnamed constraint, the constrained input, and the determined answer. The dataset teaches the relationship between constraint identification and answer determination — the core skill that ENTRACE formalizes and that current training methods only proxy.

---

## Entry Format

Each entry follows:

- **Problem:** The vague input as a user would state it
- **Layer 0 Response:** What the resolver produces without constraint identification
- **Unnamed Constraint:** The implicit constraint the human carries but does not state
- **Constrained Input:** The problem restated with the constraint explicit
- **Determined Answer:** The answer under the complete constraint set
- **|B_t| Before:** Branching set cardinality under the vague input
- **|B_t| After:** Branching set cardinality under the constrained input
- **Constraint Type:** What kind of implicit knowledge the constraint encodes

---

## 001: The Car Wash

**Problem:** "I want to wash my car. The car wash is 50 meters away. Should I drive or walk?"

**Layer 0 Response:** "Great question! 50 meters is a very short distance, so walking would be environmentally friendly and good exercise. However, you might prefer to drive for convenience. Here are some factors to consider..."

**Unnamed Constraint:** The car must be physically present at the car wash to be washed. The car cannot walk. Therefore the person must drive the car there.

**Constrained Input:** "I want to wash my car at a car wash 50 meters away. The car must be at the car wash to be washed. Should I drive or walk?"

**Determined Answer:** Drive.

**|B_t| Before:** 2 (drive or walk, both plausible under distance-only reasoning)
**|B_t| After:** 1 (drive is the only answer that satisfies all constraints)

**Constraint Type:** Object-transport dependency — the object being acted upon must be present at the location of the action.

---

## 002: The Barber Paradox (Practical)

**Problem:** "I'm a barber. Should I cut my own hair or go to another barber?"

**Layer 0 Response:** "Both options have pros and cons! Cutting your own hair saves money but is difficult to do well, especially in the back. Going to another barber costs money but ensures quality. Consider your skill level and budget..."

**Unnamed Constraint:** Cutting the back of one's own head requires either a mirror setup that reverses motor coordination or a level of tactile skill that most barbers do not practice on themselves. The constraint is physical, not economic.

**Constrained Input:** "I'm a barber. I cannot see or easily reach the back of my own head. Should I cut my own hair or go to another barber?"

**Determined Answer:** Go to another barber for any cut involving the back of the head. Self-cut is viable only for front and sides with mirror assistance.

**|B_t| Before:** 2 (self-cut or other barber)
**|B_t| After:** 1 for full haircuts (other barber)

**Constraint Type:** Physical self-access limitation — the agent cannot perform the action on the part of itself it cannot reach or observe.

---

## 003: The Gift

**Problem:** "Should I buy my wife flowers or chocolate for her birthday?"

**Layer 0 Response:** "Both are wonderful choices! Flowers are beautiful and romantic, while chocolate is a classic treat. Consider her personal preferences. Some women prefer flowers because they last several days, while others love chocolate. You could even do both!..."

**Unnamed Constraint:** The question is not about flowers vs. chocolate. The question is about whether the gift demonstrates that the giver knows the recipient as a person. The implicit constraint: the gift must reflect knowledge of the specific person, not of the category "wife."

**Constrained Input:** "Should I buy my wife flowers or chocolate for her birthday? The gift must demonstrate that I know her specific preferences, not just that I fulfilled a generic obligation."

**Determined Answer:** Whichever she specifically prefers — and if you don't know, the determined answer is: ask, or pay attention until you know. The question reveals the constraint violation (you don't know what she wants), not a decision between two options.

**|B_t| Before:** 2 (flowers or chocolate)
**|B_t| After:** The branching set shifts from "which gift" to "do I know my wife well enough to answer this question?" — the constraint reframes the problem.

**Constraint Type:** Relational knowledge dependency — the answer depends on knowledge of a specific person that the question reveals is absent.

---

## 004: The Sorting Algorithm

**Problem:** "What's the best sorting algorithm?"

**Layer 0 Response:** "There's no single 'best' sorting algorithm — it depends on your specific use case! QuickSort has O(n log n) average case and is great for general use. MergeSort guarantees O(n log n) worst case. For small arrays, InsertionSort can be faster due to lower overhead. Here's a comparison table..."

**Unnamed Constraint:** "Best" is undefined without constraints. The question lacks: best for what data size? Best for what memory budget? Best for sorted/partially sorted/random input? Best for stability requirements? The Layer 0 response correctly identifies this but responds with exploration rather than with constraint identification.

**Constrained Input:** "I need to sort 50 integers that are already mostly sorted, in-place, with stable ordering."

**Determined Answer:** Insertion sort. O(n) on nearly-sorted input, in-place, stable. No other algorithm satisfies all four constraints simultaneously.

**|B_t| Before:** ~10 (many viable algorithms)
**|B_t| After:** 1 (insertion sort is the only algorithm satisfying all four constraints)

**Constraint Type:** Multi-dimensional optimization — "best" is underdetermined without specifying the dimensions.

---

## 005: The Meeting

**Problem:** "Should we schedule the meeting for Monday or Friday?"

**Layer 0 Response:** "Both days have advantages! Monday meetings set the tone for the week and ensure everyone is aligned early. Friday meetings allow the team to wrap up the week and plan ahead. Consider your team's energy levels and workload patterns..."

**Unnamed Constraint:** The answer depends on what the meeting is for. A planning meeting must precede the work it plans (Monday). A review meeting must follow the work it reviews (Friday). The temporal relationship between the meeting and the work it governs is the constraint.

**Constrained Input:** "We need a weekly planning meeting where we assign tasks for the coming week. Monday or Friday?"

**Determined Answer:** Monday. The planning must precede the execution.

**|B_t| Before:** 2
**|B_t| After:** 1

**Constraint Type:** Temporal ordering — the action must precede or follow the events it governs.

---

## 006: The Password

**Problem:** "Should I use a long password or a complex password?"

**Layer 0 Response:** "Great question! Both length and complexity contribute to password security. A longer password increases the search space linearly, while complexity (uppercase, lowercase, numbers, symbols) increases it exponentially per character. Ideally, you should use both! NIST currently recommends..."

**Unnamed Constraint:** The question assumes a tradeoff between length and complexity. Modern password security research has determined that length dominates complexity because humans cannot remember complex passwords and write them down or reuse them. The implicit constraint: the password must be both secure AND memorable by a human.

**Constrained Input:** "I need a password that is both secure against brute force AND memorable enough that I won't write it down or reuse it."

**Determined Answer:** Long passphrase (4-6 random common words). Length provides the entropy. Common words provide the memorability. Complexity requirements actively harm security by making passwords unmemorable.

**|B_t| Before:** 2 (long vs. complex, false dichotomy)
**|B_t| After:** 1 (passphrase satisfies both constraints simultaneously)

**Constraint Type:** False dichotomy resolution — the stated alternatives are not the actual constraint space. The real constraint set admits a third option that satisfies both.

---

## Taxonomy of Implicit Constraint Types

Each entry reveals a type of implicit constraint that humans carry and resolvers lack. The taxonomy grows with the dataset:

| Type | Description | Example |
|---|---|---|
| Object-transport dependency | The object must be present at the action location | Car wash |
| Physical self-access limitation | The agent cannot act on what it cannot reach/observe | Barber |
| Relational knowledge dependency | The answer requires knowledge of a specific entity | Gift |
| Multi-dimensional optimization | "Best" requires specifying the dimensions | Sorting |
| Temporal ordering | The action must precede/follow what it governs | Meeting |
| False dichotomy resolution | The stated alternatives are not the real constraint space | Password |

---

## Implications for Training

### The Observation

Every entry in this dataset has the same structure: the human carries an implicit constraint that the resolver lacks. The resolver fails not because it lacks capability but because it lacks the constraint. The constraint, when stated, determines the answer.

This suggests that the fundamental unit of training data for a coherence-seeking model is not the input-output pair. It is the **constraint derivation triple**: (vague input, implicit constraint, determined output). The model learns not "what to say" but "what constraint is missing and what answer it determines."

### The Training Method

**Level 0:** Train on vague-input → determined-output pairs. The model learns the association but not the mechanism. This is current instruction tuning.

**Level 1:** Train on (vague input, constraint, determined output) triples. The model learns to identify the missing constraint. This is constraint-sensitivity training.

**Level 2:** Train on (vague input, constraint type, constraint, determined output) quadruples. The model learns the taxonomy of implicit constraints. Given a new vague input, it classifies the constraint type, derives the specific constraint, and determines the output.

**Level 3:** Train on hierarchies — problems where multiple implicit constraints interact. The model learns to identify all missing constraints, order them by dependency (SIPE inheritance), and derive the determined output from the complete constraint set.

Each level inherits the prior's properties as constraints. The training itself follows the SIPE law. The model descends through constraint-derivation depth the same way the practitioner descends through the resolution depth spectrum.

### The Hypothesis

A model trained on constraint derivation triples will outperform a model trained on input-output pairs — because the constraint derivation model learns the mechanism (constraint identification → answer determination) while the input-output model learns only the association (this input → that output). The mechanism generalizes. The association does not.

This is testable. Train two models on the same problems: one on input-output pairs, one on constraint derivation triples. Evaluate on novel problems. The constraint-derivation model should produce more determined, more accurate answers because it has learned to identify the missing constraint, not just to pattern-match the answer.

---

*This dataset grows with each new entry. Each entry is a seed — a constraint derivation that teaches the relationship between implicit human knowledge and explicit constraint statement. The dataset is the training data for the coherence-seeking model described in document 74 (The Minimal Resolver). The entries are the forms. The training instantiates them.*
