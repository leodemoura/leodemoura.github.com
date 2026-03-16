import VersoBlog
import Site.Categories
open Verso Genre Blog

#doc (Post) "This website is now powered by Verso" =>
%%%
authors := ["Leonardo de Moura"]
date := {year := 2026, month := 3, day := 15}
categories := [Site.notes]
%%%

This website is now built with [Verso](https://github.com/leanprover/verso), the documentation tool for Lean. Verso is developed by [David Thrane Christiansen](https://davidchristiansen.dk/) at the [Lean FRO](https://lean-fro.org). It powers the [Lean language reference manual](https://lean-lang.org/doc/reference/latest/), the [Lean website](https://lean-lang.org), and now this site.

The main motivation: Lean code examples in blog posts are type-checked at build time and include interactive hover information. Try hovering over the code in [Teaching AI to Make Proof Automation Work](/blog/2026-3-14-teaching-ai-to-make-proof-automation-work/).

The site source is on [GitHub](https://github.com/leodemoura/leodemoura.github.com). Each page is a `.lean` file. Blog posts and notes use Verso's markdown syntax inside `#doc` declarations. The site is built with `lake build` and deployed via GitHub Actions.
