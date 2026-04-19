import VersoBlog
import Site.Categories
open Verso Genre Blog

#doc (Post) "Why Lean?" =>
%%%
authors := ["Leonardo de Moura"]
date := {year := 2026, month := 4, day := 2}
categories := [Site.blog]
%%%

Markus de Medeiros wanted to understand [garbled circuits](https://www.markusde.ca/pages/leanrocks.html). He had no formal training in cryptography. He spent an afternoon in [Lean](https://lean-lang.org/): a circuit evaluator in functional style, a custom DSL via metaprogramming, OpenSSL bindings via FFI, a correctness proof for his serializer, and a mutable garbling algorithm in imperative style. All in one tool.

His conclusion: "I genuinely do not know of another tool that can do all of the following." And then: "*I fucking love this shit.*"

That reaction keeps happening. This post is about why.

# Lean is implemented in Lean

One decision. Everything else follows from it. The compiler, elaborator, proof automation, parser, pretty printer, build system, and documentation system are all Lean. There are no band-aids. No glue between OCaml and Ltac. No obscure compiler for a dead language.

Because smart people can reach into Lean's internals using Lean itself, they build things we never planned. The [Mathlib](https://github.com/leanprover-community/mathlib4) community wrote over 50,000 lines of extensions (custom tactics, linters, automation) with no coordination from us. [Verso](https://verso.lean-lang.org/), our documentation system, is built on Lean. [Ilya Sergey](https://ilyasergey.net/)'s students at NUS built [Veil](https://veil.dev/) and [Velvet](https://github.com/verse-lab/velvet) on top of Lean's metaprogramming layer.

None of this was planned. We just made it possible.

# Scalability

Mathlib has over 200,000 theorems and 2.2 million lines of code. It keeps growing. Build times keep decreasing.

We are willing to throw away designs that don't work. We have replaced the type class resolution system, the simplifier infrastructure, the old compiler, the canonicalizer in our new proof automation. *Not because they were broken, but because they didn't scale.*

Since the [Lean FRO](https://lean-lang.org/fro/) launched in August 2023, scalability has been an integral part of our mission.

# Soundness without compromise

Lean has a small trusted kernel. Multiple independent implementations exist. Proofs can be exported and checked by any of them. We built [Comparator](https://github.com/leanprover/comparator), a tool that cross-checks proofs across kernel implementations. Anyone can build their own kernel and submit it to [arena.lean-lang.org](https://arena.lean-lang.org).

What this gives you is the freedom to hack without fear. Build wild metaprograms. Write custom tactics that rewrite your goal in ways you barely understand. The kernel still checks everything at the end. *If your proof type-checks, it's correct.* If it doesn't, you get an error immediately. Users who've been burned by unsoundness in other tools come to Lean because the kernel catches mistakes. Always.

[Terence Tao's point](https://www.youtube.com/watch?v=Q8Fkpi18QXU&t=3180s) is that RL will find every backdoor in your verification pipeline, so there can't be any: "reinforcement learning is just so good at finding these backdoors." The kernel's soundness isn't just a theoretical property. It's AI safety infrastructure.

# What Lean is bad at

Backward compatibility. We break things. We break them deliberately, because scaling matters more than stability of interfaces that weren't right. If you wrote Lean code two years ago, it probably doesn't compile today without changes. This is a real cost, and we don't pretend otherwise.

If you need a system where code written in 2020 still compiles unchanged in 2026, Lean is not that system.

# Listening to users

When I started Lean, I wanted to use HOL (higher-order logic). [Jeremy Avigad](https://www.andrew.cmu.edu/user/avigad/) and I went back and forth on this (he still has the messages, and they show me pushing hard against dependent type theory). Higher-order logic is simpler to automate, and the kernel could be even smaller. I hate complexity.

But dependent type theory was what users needed. I found constructivism beautiful, and had fun learning about it at the beginning of the project, but it is not practical. When the [Aeneas](https://github.com/AeneasVerif/aeneas) team tells you what's slow, you fix it. When a software verification team explains how your tactics need to scale, you redesign.

*I could have built a purer system. I built a useful one.*
