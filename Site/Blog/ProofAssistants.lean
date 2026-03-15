import VersoBlog
import Site.Categories
open Verso Genre Blog

set_option linter.verso.markup.emph false

#doc (Post) "Proof Assistants in the Age of AI" =>
%%%
authors := ["Leonardo de Moura"]
date := {year := 2026, month := 2, day := 18}
categories := [Site.blog]
%%%

AI is transforming how we write formal proofs. Language models can now generate thousands of lines of verified mathematics with minimal human guidance, and the cost keeps dropping. This is exciting, and it raises a natural question: what role does the choice of proof assistant play when AI is doing more of the work?

I believe the answer is that it matters more, not less.

A proof assistant is not just a tool for AI. It is the environment where humans and AI collaborate. The human needs to read definitions, understand theorem statements, guide proof strategy, and build on verified results. The AI needs to generate proofs efficiently, learn from feedback, and leverage automation. A well-designed proof assistant serves both, and the design choices that make this possible become more consequential as AI takes on a larger share of the work.

# AI Amplifies Your Foundation

When an AI generates proofs, it works within the constraints of the system it targets. If the system provides expressive types, powerful automation, and readable notation, the AI leverages all of that. Even the design of error messages matters: structured, actionable diagnostics help AI correct its mistakes efficiently, just as good error messages help human users. The representation shapes what the AI can express concisely, and conciseness matters when you're scaling to all of mathematics, not just a single textbook.

Think of it this way. A calculator does not make mathematics irrelevant. It lets you skip arithmetic so you can focus on the actual problem. But the calculator is only as useful as the mathematical framework you bring to it. The representation matters.

The same holds for AI and proof assistants. A language model targeting a system with dependent types, typeclasses, and a well-designed tactic language can express mathematical ideas at the right level of abstraction. The proofs are shorter, the structure is clearer, and the AI can work at a higher level of abstraction. This is a compounding advantage.

# Scalability Is the Real Test

Formalizing a chapter of topology is an impressive demonstration. Building a library that grows to hundreds of thousands of theorems and remains maintainable is a different challenge entirely. That is an engineering problem, and engineering problems are sensitive to design choices.

Compact, well-structured proofs are better training data for AI, which produces better proofs, which makes the library more useful, which attracts more users and contributors. This is a flywheel, and the proof assistant is what makes it spin. There is growing evidence for this: Google DeepMind built [AlphaProof](https://deepmind.google/blog/ai-solves-imo-problems-at-silver-medal-level/), the reinforcement-learning system that won silver at the 2024 International Mathematical Olympiad, on top of a proof assistant with a large, well-structured library. As Pushmeet Kohli from Google DeepMind noted, the system's "extensibility and verification capabilities" were key enablers. Independently, [Harmonic](https://harmonic.fun) built Aristotle, which achieved gold medal-level performance at the 2025 IMO, on the same foundation. [ByteDance's SEED Prover](https://seed.bytedance.com/en/blog/bytedance-seed-prover-achieves-silver-medal-score-in-imo-2025) achieved silver medal performance at the same competition, also on the same foundation. Three independent teams, solving the same problem at the highest level, all chose a proof assistant with expressive types, a large library, and a programmable ecosystem. They are not alone: companies like [Axiom Math](https://axiommath.ai), [Math Inc](https://www.math.inc), and [Logical Intelligence](https://logicalintelligence.com) are building on the same foundation. The choice of foundation was not incidental to their success.

Fast proof checking also matters. When AI explores thousands of proof attempts in a feedback loop, the speed of the kernel directly affects how much the AI can learn per unit of time. This is a real engineering constraint, and proof assistants should invest in it. But checking speed alone is not enough. A fast kernel with no automation and no expressive type system will check verbose proofs quickly, while a well-designed system produces proofs that are short enough that checking speed is rarely the bottleneck. The two investments are complementary.

Good automation, expressive types, and clean definitional reduction are what make compact proofs _possible_. They are the infrastructure that lets both humans and AI work at the right level of abstraction.

# From Theory to Practice

Any mathematics can, in principle, be formalized in set theory or any sufficiently expressive foundation. This is true in the same way that any program can be implemented on a Turing machine. The theoretical claim is not in dispute.

But the gap between "formalizable in principle" and "feasible in practice" is precisely where proof assistant design lives. Dependent types are what make it practical to formalize abstract algebra, category theory, and modern algebraic geometry without drowning in encoding overhead. Typeclasses are what make a large mathematical library navigable and composable. A proof assistant is not just a kernel that checks proofs. It is an entire environment that determines what is practical to express and maintain at scale.

# Readable Specifications: The Human Contract

Proof assistants guarantee that proofs are correct, but correctness alone is not enough. Someone has to read the theorem statements and confirm they capture the intended mathematics. This is the human contract that no amount of automation can eliminate.

The ability to write definitions and theorem statements that a mathematician can inspect and understand is a core requirement. It depends directly on the expressiveness of the type system and the quality of the notation mechanisms. Modern tooling amplifies this further: an IDE that lets you hover over terms to see their types, jump to definitions, and explore the library interactively makes formal mathematics accessible to people who could not write proofs themselves but can read and verify the statements. Learning to read formal specifications is much easier than learning to write them, and good tooling makes reading even more accessible. When the definitions are clear and the tooling is helpful, mathematicians can engage with the formal library directly. When they are obscured by encoding overhead, the gap between informal and formal mathematics remains, no matter how many theorems are verified.

This becomes even more important when AI is generating the proofs. A verified proof of a theorem whose _statement_ you cannot parse gives you very little. You need to trust not just the proof, but the specification.

One might argue that AI could translate between formal statements and natural language, letting humans read a friendly version regardless of the underlying formalism. But this introduces a new source of potential error at exactly the point where correctness matters most. The formal statement is the trust anchor. Consider an adversarial scenario: someone claims to have proved an important result. You need to inspect the actual formal statement, not an AI's summary of it. Readable formal specifications are not a convenience that AI can replace. They are the foundation of trust.

# Automation as Game Moves

Here is a way to think about proof automation that I find useful: each tactic or decision procedure available to the prover is a _game move_. A system with only basic moves (apply a lemma, rewrite a term, unfold a definition) requires long sequences of steps for even routine reasoning. A system with powerful automation gives you moves that accomplish in one step what would otherwise take hundreds.

This matters enormously for AI. Using a language model to work through hundreds of low-level proof steps is like using a language model to compute a long arithmetic expression: it can do it, but it is far more efficient to use the right tool. Powerful tactics let the AI skip routine work and focus on the mathematically interesting decisions: the high-level proof strategy, the choice of lemmas, the key case splits. The tool handles what the tool is good at.

This is why investing in proof automation (decision procedures, simplifiers, general-purpose tactics) is not just a quality-of-life improvement for human users. It directly improves the quality and efficiency of AI-generated proofs. Every powerful tactic you add to the system is a new capability the AI can leverage.

The best automation is both powerful and controllable. A tactic that can close a goal in one step is valuable, but even more valuable is one that can also be run interactively, letting the AI guide its decisions step by step. This gives AI the choice: use the tactic as a single powerful move when that suffices, or take finer-grained control when the problem requires it. Automation that is opaque is useful. Automation that is transparent and steerable is transformative.

# A Programmable Ecosystem

A proof assistant that is also a programming language has a compounding advantage that is easy to underestimate. When your tactics, your automation, your metaprograms, and your verified code all live in the same language, everything reinforces everything else. New automation can be written by anyone, including AI, without switching contexts or languages. The boundary between "using the system" and "extending the system" disappears.

This matters for AI integration specifically. When the AI can not only write proofs but also write new tactics, build custom decision procedures, and extend the system's capabilities, you get a feedback loop: the system gets better at helping the AI, and the AI gets better at improving the system.

# Looking Forward

The next great proof assistant will probably be built with massive AI assistance. At the [Lean FRO](https://lean-lang.org), we have already embraced AI as part of our development process. It is transformative, and we cannot imagine building Lean without it. You can already find many commits in our repositories co-authored by AI. This will only accelerate. AI will help us design, generate core libraries, write automation, and test ergonomics. But the criteria for what makes a proof assistant good do not change. It still needs expressive types, readable specifications, powerful automation, a programmable ecosystem, great tooling, and scalability. AI changes how we build proof assistants, not what makes them good.

The systems that exist today, their libraries, their design decisions, their accumulated knowledge about what works and what doesn't, become the training data and the design language for building those next-generation systems. The work is not wasted. It is the foundation.

No technology lasts forever, and that is a sign of progress, not failure. The goal is not to build a system that endures indefinitely. The goal is to push the trajectory forward, to make formal mathematics and verified software and hardware practical, accessible, and useful, so that what comes next starts from a higher place. If something genuinely superior emerges, that means the mission succeeded.

What I care about is that this trajectory is driven by real technical progress. The criteria for a good proof assistant in the age of AI are clear, and they matter more now than ever.
