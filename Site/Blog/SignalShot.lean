import VersoBlog
import Site.Categories
open Verso Genre Blog

set_option linter.verso.markup.emph false

#doc (Post) "Signal Shot: The Platform Is Ready" =>
%%%
authors := ["Leonardo de Moura"]
date := {year := 2026, month := 4, day := 20}
categories := [Site.blog]
%%%

Signal Shot is a public moonshot to verify the Signal protocol and its Rust implementation using [Lean](https://lean-lang.org/). Not the math on paper. The actual code.

It is a joint effort of Signal (Rolfe Schmidt), the [Beneficial AI Foundation](https://www.beneficialaifoundation.org/) (Max Tegmark), and the [Lean FRO](https://lean-fro.org). BAIF's launch post is [here](https://www.beneficialaifoundation.org/blog/signal-shot).

The reference point is the [Liquid Tensor Experiment](https://leanprover-community.github.io/blog/posts/lte-final/). Nearly four years ago, Johan Commelin's team formalized the main theorem of liquid vector spaces by Clausen and Scholze in Lean. LTE is why Lean scales for modern mathematics. Signal Shot is the test of whether Lean now scales for deployed software. This time AI helps.

# Why it can work now

Not long ago this was impossible. Today all the pieces are on the same table.

**Aeneas.** [Son Ho](https://www.sonho.fr/)'s Rust-to-Lean functional translator, originally his INRIA PhD thesis _"Formal Verification of Rust Programs by Functional Translation"_ (accessit, Gilles Kahn PhD thesis award, French Academy of Science, 2025). Son is now a postdoc at Azure Research Cambridge, and Aeneas is already being used inside Microsoft on SymCrypt. It turns `libsignal`'s actual Rust into something we can prove things about, without asking Signal to maintain a second codebase.

**Mathlib and CSLib.** [Mathlib](https://github.com/leanprover-community/mathlib4) holds the mathematical foundations: elliptic curves, module lattices, the reductions that cryptographic proofs rely on. [CSLib](https://www.cslib.io/) aims to be for computer science what Mathlib is for mathematics, a shared Lean library of foundational definitions and theorems, and the cryptographic primitives and protocol-level definitions Signal Shot needs will live there.

**grind and SymM.** [`grind`](https://lean-lang.org/doc/reference/latest/The--grind--tactic/#grind-tactic) is our SMT-inspired tactic: congruence closure, E-matching, linear arithmetic, theory solvers. `SymM` is our new monadic framework for software verification. I say more about it below. Without them, verifying `libsignal` is manual and painful. With them, verification conditions get discharged efficiently.

**AI.** Teams are already doing serious mathematical formalization in Lean and Mathlib with heavy AI assistance. [Math Inc.](https://www.math.inc/sphere-packing) is one example: they recently autoformalized Viazovska's Fields-Medal proof on sphere packings in weeks, not years. Others are doing comparable work. I expect Signal Shot to look similar: the models do the autoformalization and the routine work, humans choose the abstractions and spot the subtle flaws.

No single piece is enough. All of them together, maybe.

# What Lean FRO brings

The tool that everyone else is building on, and the willingness to rebuild pieces of it when they do not scale.

The clearest current example is **SymM**, a new monadic framework I started in December 2025, right after the [Lean@Google Hackathon](https://sites.google.com/view/lean-at-googl-2025/home). SymM is built from the ground up for software verification. It implements maximally shared terms, efficient metavariable management and simplifiers, and several custom, efficient tactics required by verification condition generators. A dedicated canonicalizer caches the work that verification tactics repeat thousands of times per proof.

On our software-verification benchmarks, SymM is orders of magnitude faster than the standard `MetaM` infrastructure. It turns quadratic blowups into linear passes. It already gives roughly a 100x speedup on stress tests that were bringing the old machinery to a halt. Aeneas, the tool Signal Shot will lean on for `libsignal` verification conditions, is being ported onto it now.

I am giving a talk on this at the Lean Paris Hackathon on April 20, titled _[Scalable Software Verification in Lean 4](https://leodemoura.github.io/static/svil26/)_ at [SViL2026](https://beneficial-ai-foundation.github.io/SVIL2026/).
Most of the Signal Shot collaborators will be in the room. Scalability is the part of this moonshot we own, and when something in Signal Shot hits a wall, it is our job to move the wall.

The kernel stays small and stays sound. Multiple independent kernel implementations exist at [arena.lean-lang.org](https://arena.lean-lang.org/). A proof produced by Signal Shot is a proof any reviewer can check independently, without trusting the people who wrote it. That is the property the whole moonshot rests on. As Terence Tao [put it](https://www.youtube.com/watch?v=Q8Fkpi18QXU&t=3180s), reinforcement learning finds every backdoor in your verification pipeline, so there cannot be any. The kernel's soundness is AI safety infrastructure.

# What we need

Signal Shot is open. If you work on software verification, on cryptography, on protocol design, on Rust, or on Lean itself, there is a place for you.

- **Mathlib contributors.** The cryptographic primitives need you.
- **CSLib contributors.** The protocol specs need you.
- **Lean hackers.** Aeneas needs help scaling to `libsignal`. The verification pipeline around it needs benchmarks, regression tests, and glue.
- **Cryptographers.** We need your eyes on the definitions before anyone proves anything.

LTE proved mathematics scales in Lean. Signal Shot is the same question for deployed software.

I will have the first update at the Lean Paris Hackathon on April 20.
