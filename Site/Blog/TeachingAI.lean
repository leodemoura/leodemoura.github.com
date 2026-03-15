import VersoBlog
import Site.Categories
open Verso Genre Blog

set_option linter.verso.markup.emph false

#doc (Post) "Teaching AI to Make Proof Automation Work" =>
%%%
authors := ["Leonardo de Moura"]
date := {year := 2026, month := 3, day := 14}
categories := [Site.blog]
%%%

```leanInit demo
```

```lean demo -show
open Lean.Grind
```

Consider this goal:

```lean demo
example {α} [CommRing α] [IsCharP α 0] [NoNatZeroDivisors α]
    (d t d_inv : α)
    (Δ40 : d * (d + t + d * t) = 0)
    (Δ41 : d^2 * (d + d * t - 2 * d * t^2 + d * t^4 + d^2 * t^4) = 0)
    (_ : d * d_inv = 1) :
    t + 2 * t^2 - t^3 - 2 * t^4 + t^5 = 0 := by
  grind
```

The proof term behind that `grind` is thousands of lines: every rewrite, every associativity permutation, every ring normalization. `grind` produces it in milliseconds using Gröbner basis techniques from the 1960s. Yet AI systems routinely generate 20-step manual proofs for goals like this, because they don't know the tool exists or how to configure it. Training AI to synthesize proof terms is training it to simulate algorithms we already have. It's like training a model to output x86 assembly instead of Python.

AI should learn _which tools to invoke and how to configure them_. The tools do the mechanical work. And this creates a flywheel:

1. Better annotations → `grind` closes more goals automatically
2. AI uses `grind` more effectively → shorter proofs, faster synthesis
3. AI observes what `grind` solves → learns what annotations enabled it
4. AI proposes better annotations → repeat

The bottleneck is _annotations_: metadata attached to theorems that tell the automation how to use them. `[simp]` marks a lemma for the simplifier. `[grind]` marks it for the `grind` tactic, with optional modifiers for fine-grained control (see the [reference manual](https://lean-lang.org/doc/reference/latest/The--grind--tactic/#grind-tactic)). `grind_pattern` specifies trigger patterns and constraints for quantifier instantiation.

*Most mathematicians can write proofs, but they can't write good annotations.* It requires understanding E-matching internals, instantiation cascades, and automation behavior—specialist knowledge that doesn't scale. Mathlib has 200,000+ theorems. A small fraction have good annotations. Every missing or misconfigured annotation is a proof that `grind` could have solved but didn't.

Current AI-for-math benchmarks ask: _can AI prove theorems?_ We're asking something different: _can AI make the theorem prover's automation better?_

# What We're Offering

## A Reward Signal: `#grind_lint`

`#grind_lint check` analyzes all theorems annotated for E-matching and reports how many instantiations each triggers. It creates artificial goals to detect long or unbounded instantiation chains—exactly what makes automation fail.

```
#grind_lint check                              -- analyze all annotated theorems
#grind_lint check (min:=10) (detailed:=50)     -- configure reporting thresholds
#grind_lint check in Array HashMap             -- restrict to specific namespaces
#grind_lint inspect Array.back?_empty          -- focus on a specific theorem
```

This is a dense reward signal, not just "proof found" but "how expensive was the search?"

## A Plug-in Point: `grind +suggestions`

`grind` has an extensible suggestion mechanism. It queries an oracle for additional theorems that might help close the goal. Currently heuristic-based. *You can replace it with a neural model.*

Every invocation gives your model the current goal state, the solver's internal state (known equalities, disequalities, etc.), and the available theorems in scope. Your model returns a ranked list of theorems to try. Reward: did `grind` close the goal?

This is a gym environment inside the theorem prover.

## Fine-Grained Diagnostics

Every `grind` invocation can report exactly what happened:

```lean demo
theorem ex (a b : Array Int) (h : i < a.size) : b = a.set i v → b[i]? = some v := by
  set_option diagnostics true in
  grind
```

For every successful proof, you know which theorems were used and how often. This is labeled data.

## Mathlib as Training Data

200,000+ theorems with existing human-written annotations. Your supervised learning baseline. The annotations aren't perfect, but they're a starting point.

# The Hard Part: Constraints

Annotations aren't just "use this theorem." They include constraints that control _when_ and _how_ quantifiers are instantiated.

Without constraints:

```lean demo -show
opaque f : Nat → Nat
```

```lean demo
axiom fMono : x ≤ y → f x ≤ f y
grind_pattern fMono => f x, f y
```

Result: 25 instantiations, combinatorial explosion.

With constraints:

```lean demo
grind_pattern fMono => f x, f y where
  guard x ≤ y
  x =/= y
```

Result: 3 instantiations, exactly what's needed.

The constraint language is simple—guards and disequalities. But predicting _which_ constraints to add requires understanding the e-matching algorithm: why does `guard x ≤ y` prevent useless instantiations? Why does `x =/= y` eliminate symmetric redundancy?

Current LLMs can probably guess `[simp]` vs. not with reasonable accuracy. Predicting optimal constraints is genuinely hard. This is the frontier.

# Benchmark Levels

*Level 1 (Easy):* Given a lemma, predict whether it should have `[simp]` or `[grind]`.

*Level 2 (Medium):* Given a lemma marked `[grind]`, predict good trigger patterns.

*Level 3 (Hard):* Predict patterns _with_ optimal constraints that minimize instantiations while preserving completeness.

*Level 4 (Research Frontier):* Given a goal that `grind` fails on, diagnose whether the failure is due to missing annotations or bad constraints, and propose a fix.

*Functional Benchmark:* Given a library and a test suite of goals, produce annotations such that `grind` closes the maximum number of goals with minimum instantiation count. Evaluate on the Pareto frontier.

# The Experiment We Want To See

Run `grind +suggestions` across all of Mathlib. For every proof it closes, log which suggestions were needed. Those theorems are candidates for `[grind]` annotation, and the trace tells you what patterns and constraints would work. This is automated annotation discovery—mining labels from successful proofs, not asking humans to label.

Then train a model on this data. Deploy it as the suggestion oracle. Measure whether it improves `grind` success rate on held-out goals.

# What We Need From You

1. *Dataset extraction pipeline:* Extract (lemma, annotation, trace) tuples from Mathlib at scale.
2. *Baselines:* How well does GPT-5.4 / Claude 4.6 / Gemini 3.1 do zero-shot on annotation prediction? This sets the bar.
3. *RL experiments:* Can you train an agent with `#grind_lint` as reward that learns to write good constraints?
4. *Suggestion oracle:* Can you build a neural model that, plugged into `grind +suggestions`, improves success rate on held-out goals?
5. *The hard version:* Given a _new_ library the model hasn't seen, can it produce annotations matching expert quality?

Current Mathlib annotations were written by humans through trial and error over years. Can an AI, given the same feedback signals we use, learn to annotate a new library in hours instead of years? We don't know if this is solvable with current methods. That's why we're bringing it to you.

# Contact

- Zulip: [https://leanprover.zulipchat.com/](https://leanprover.zulipchat.com/) (Machine Learning for Theorem Proving stream)
- Lean FRO: [https://lean-lang.org/fro](https://lean-lang.org/fro)
- Email: [contact@lean-fro.org](mailto:contact@lean-fro.org)
