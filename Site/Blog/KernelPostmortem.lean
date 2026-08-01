import VersoBlog
import Site.Categories
open Verso Genre Blog

set_option linter.verso.markup.emph false

#doc (Post) "Postmortem for Kernel Soundness Bug #14576" =>
%%%
authors := ["Leonardo de Moura"]
date := {year := 2026, month := 8, day := 1}
categories := [Site.blog]
%%%

A soundness bug in the Lean kernel ([#14576](https://github.com/leanprover/lean4/issues/14576)) was reported and fixed during the week of July 27. It has had visibility on Zulip and social media (e.g., X, LinkedIn, and Mastodon).

# What happened

On July 25, Ramana Kumar published a repository containing a sorry-free "disproof" of the Collatz conjecture, produced with LLM assistance. It is not a valid proof because it exploits a bug in the kernel's handling of nested inductive types. On July 28, Kiran Gopinathan reduced it to a small proof of False and opened issue [#14576](https://github.com/leanprover/lean4/issues/14576). We pushed a fix one hour after the report ([#14577](https://github.com/leanprover/lean4/pull/14577)). [Joachim Breitner](https://www.joachim-breitner.de/) reviewed it and suggested improvements, and it was merged. New patch releases are out.

The bug: when the kernel eliminates a nested occurrence under an inductive type `T` with parameters `Ds`, and these parameters are phantom (not mentioned in constructor fields), they disappear from the generated auxiliary type and thus escape type checking. An ill-typed argument in that position could be used to make the kernel accept a proof of `False`. The bug is only reachable through metaprogramming, by sending the inductive declaration to the kernel directly. The frontend checks the arguments and catches the ill-typed term. This is an implementation bug, not a hole in Lean's meta-theory.

# Why nanoda did not catch it

The original Collatz repository also passed a week-old version of [nanoda](https://github.com/ammkrn/nanoda_lib), the main external checker. nanoda is an independent kernel (aka proof/type checker) for Lean implemented in Rust by [Chris Bailey](https://christopherabailey.com/). The surprising part is that there are two unrelated bugs involved. The official kernel had a missing check in the nested inductive type support, as explained above. nanoda did check that spot, but did not verify the type name in a projection node. The nanoda bug was reported by Jeremy Chen and fixed a week before the Lean bug was reported. The proof was built so that the expression the kernel never inspects is one that the old nanoda accepted.

Ramana believes the timing was coincidental, but cannot rule out that the model had seen the nanoda report. Joachim proposed the hypothesis that the timing coincidence is due to the availability of strong models able to find this bug.

The practical consequence: checking with an independent kernel still works, since it required two distinct bugs in two implementations, but users who rely on it need current versions of both. [lean4lean](https://github.com/digama0/lean4lean) is affected by the kernel bug, since its handling of inductives is a port of the reference implementation.

# Verification

Mario Carneiro's [lean4lean](https://github.com/digama0/lean4lean) is a Lean formalization of Lean's type theory together with a proof that the kernel implements it. The work is ongoing, the proof of consistency does not cover inductive types yet, and the to-be-verified implementation suffered from the same bug as the official kernel. The bug would have been found when attempting to conclude the verification of this part.

# On removing metaprogramming

One suggestion in the discussion is to remove or restrict metaprogramming so that this attack is not expressible. This is misguided. The elaborator is untrusted by design. Soundness cannot depend on an untrusted component refusing to build a bad term. An attacker who wants to submit a malicious proof can also write `.olean` files directly or modify memory, both of which bypass the elaborator entirely. The kernel has to reject ill-typed declarations on its own, in its own process. **This separation and isolation of concerns is one of the main advantages of proof terms.**

# What the FRO is doing

- Regression tests for the exploit, and for a related non-uniform-parameter case raised by Arthur Adjedj, are in the Kernel Arena.

- A follow-up PR ([#14582](https://github.com/leanprover/lean4/pull/14582)) makes the kernel check that the parameters of a nested occurrence actually behave as parameters, rather than only re-type-checking them.

- Daniel Selsam at OpenAI assisted the Lean FRO with an AI specialized in cybersecurity, and found other programming mistakes in the Lean kernel. All of them have been fixed. All of them were caught by nanoda. These bugs are also only reachable through metaprogramming. PRs: [#14607](https://github.com/leanprover/lean4/pull/14607), [#14608](https://github.com/leanprover/lean4/pull/14608), [#14609](https://github.com/leanprover/lean4/pull/14609), [#14613](https://github.com/leanprover/lean4/pull/14613), [#14615](https://github.com/leanprover/lean4/pull/14615), [#14616](https://github.com/leanprover/lean4/pull/14616).

- We have also hardened kernel invariants. PRs: [#14621](https://github.com/leanprover/lean4/pull/14621), [#14631](https://github.com/leanprover/lean4/pull/14631), [#14632](https://github.com/leanprover/lean4/pull/14632).

- [comparator.live](https://comparator.live.lean-lang.org/) now runs nanoda by default, and nanoda is tracked daily so lean-eval and comparator stay current after upstream fixes.

- We are reaching out to and supporting experts who can find further bugs, develop new kernels, and work on the theory or on verified kernels.

# Acknowledgments

I am grateful to [Joachim Breitner](https://www.joachim-breitner.de/) and [Sebastian Ullrich](https://sebasti.a.nullri.ch/) for their revisions and suggestions on this post.
