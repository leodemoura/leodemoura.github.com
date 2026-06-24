// @ts-check
/* Interactive info panel for Lean code blocks in reveal.js slides. */
(function () {
    "use strict";

    /**
     * @typedef {HTMLElement & { _activeSource: Element | null }} PanelBlock
     * @typedef {HTMLElement & { _richFormatSource: Element | null }} InfoPanel
     */

    /** @type {Record<string, *> | null} */
    var docsJson = null; // fetched once on init

    function init() {
        // Fetch the hover-docs JSON
        docsJson = {"9":
 "<code class=\"docstring\">`by tac` constructs a term of the expected type by running the tactic(s) `tac`. </code>",
 "8":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.713&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;336&quot;:{&quot;binding&quot;:&quot;const-List&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;337&quot;:{&quot;binding&quot;:&quot;var-_uniq.713&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;340&quot;:{&quot;binding&quot;:&quot;const-List&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;341&quot;:{&quot;binding&quot;:&quot;var-_uniq.713&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;reverse&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u_1&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u_1&quot;]]]]]],&quot;}&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,336,&quot;List&quot;]]],[4,1,[6,[3,2,[7,337,&quot;α&quot;]]]]]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,340,&quot;List&quot;]]],[4,1,[6,[3,2,[7,341,&quot;α&quot;]]]]]]]]]]]]]]]]]]]]}\">reverse.{u_1} {α : Type u_1} : List α → List α</code>",
 "7":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.713&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;List&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]]]]]]]]]]}\">List.{u} (α : Type u) : Type u</code><span class=\"sep\"></span><code class=\"docstring\">Linked lists: ordered lists, in which each element has a reference to the next element.\n\nMost operations on linked lists take time proportional to the length of the list, because each\nelement must be traversed to find the next element.\n\n`List α` is isomorphic to `Array α`, but they are useful for different things:\n* `List α` is easier for reasoning, and `Array α` is modeled as a wrapper around `List α`.\n* `List α` works well as a persistent data structure, when many copies of the tail are shared. When\n  the value is not shared, `Array α` will have better performance because it can do destructive\n  updates.\n</code>",
 "6":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;4&quot;:{&quot;binding&quot;:&quot;const-List&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;var-_uniq.389&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;List&quot;]]],[4,1,[6,[3,2,[7,5,&quot;α&quot;]]]]]]]]}\">List α</code>",
 "5":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1360&quot;:{&quot;binding&quot;:&quot;const-List&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;1361&quot;:{&quot;binding&quot;:&quot;var-_uniq.713&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.713&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;21845&quot;:{&quot;binding&quot;:&quot;var-_uniq.714&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;349265&quot;:{&quot;binding&quot;:&quot;var-_uniq.714&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;349456&quot;:{&quot;binding&quot;:&quot;const-reverse&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;8&quot;:{&quot;binding&quot;:&quot;var-_uniq.715&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;87312&quot;:{&quot;binding&quot;:&quot;const-reverse&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;87317&quot;:{&quot;binding&quot;:&quot;var-_uniq.715&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;87365&quot;:{&quot;binding&quot;:&quot;var-_uniq.715&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;87376&quot;:{&quot;binding&quot;:&quot;const-reverse&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;reverse_append&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u_1&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u_1&quot;]]]]]],&quot;}&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[4,&quot;xs&quot;,1],[4,[7,8,&quot;ys&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,1360,&quot;List&quot;]]],[4,1,[6,[3,2,[7,1361,&quot;α&quot;]]]]]]],&quot;)&quot;]]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,87312,&quot;reverse&quot;]]],[4,1,[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,349265,&quot;xs&quot;]]],[4,[4,&quot; ++&quot;,1],[6,[3,2,[7,87317,&quot;ys&quot;]]]]]]]],&quot;)&quot;]]]]]]]],[4,[4,&quot; =&quot;,1],[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,349456,&quot;reverse&quot;]]],[4,1,[6,[3,2,[7,87365,&quot;ys&quot;]]]]]]],[4,[4,&quot; ++&quot;,1],[6,[3,2,[4,[6,[3,2,[7,87376,&quot;reverse&quot;]]],[4,1,[6,[3,2,[7,21845,&quot;xs&quot;]]]]]]]]]]]]]]]]]]]]]]]]]}\">reverse_append.{u_1} {α : Type u_1} (xs ys : List α) : reverse (xs ++ ys) = reverse ys ++ reverse xs</code>",
 "4":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;4&quot;:{&quot;binding&quot;:&quot;const-List&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;var-_uniq.15&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;List&quot;]]],[4,1,[6,[3,2,[7,5,&quot;α&quot;]]]]]]]]}\">List α</code>",
 "33":
 "<code>False : Prop</code><span class=\"sep\"></span><code class=\"docstring\">`False` is the empty proposition. Thus, it has no introduction rules.\nIt represents a contradiction. `False` elimination rule, `False.rec`,\nexpresses the fact that anything follows from a contradiction.\nThis rule is sometimes called ex falso (short for ex falso sequitur quodlibet),\nor the principle of explosion.\nFor more information: [Propositional Logic](https://lean-lang.org/theorem_proving_in_lean4/propositions_and_proofs.html#propositional-logic)\n</code>",
 "32":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.634&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;336&quot;:{&quot;binding&quot;:&quot;const-List&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;337&quot;:{&quot;binding&quot;:&quot;var-_uniq.634&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;340&quot;:{&quot;binding&quot;:&quot;const-List&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;341&quot;:{&quot;binding&quot;:&quot;var-_uniq.634&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;reverse&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u_1&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u_1&quot;]]]]]],&quot;}&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,336,&quot;List&quot;]]],[4,1,[6,[3,2,[7,337,&quot;α&quot;]]]]]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,340,&quot;List&quot;]]],[4,1,[6,[3,2,[7,341,&quot;α&quot;]]]]]]]]]]]]]]]]]]]]}\">reverse.{u_1} {α : Type u_1} : List α → List α</code>",
 "31": "<code>Nat</code>",
 "30":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.4291&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;336&quot;:{&quot;binding&quot;:&quot;const-List&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;337&quot;:{&quot;binding&quot;:&quot;var-_uniq.4291&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;340&quot;:{&quot;binding&quot;:&quot;const-List&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;341&quot;:{&quot;binding&quot;:&quot;var-_uniq.4291&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;reverse&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u_1&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u_1&quot;]]]]]],&quot;}&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,336,&quot;List&quot;]]],[4,1,[6,[3,2,[7,337,&quot;α&quot;]]]]]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,340,&quot;List&quot;]]],[4,1,[6,[3,2,[7,341,&quot;α&quot;]]]]]]]]]]]]]]]]]]]]}\">reverse.{u_1} {α : Type u_1} : List α → List α</code>",
 "3":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1&quot;:{&quot;binding&quot;:&quot;var-_uniq.15&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[7,1,&quot;α&quot;]]]]}\">α</code>",
 "29":
 "<code class=\"docstring\">`#eval e` evaluates the expression `e` by compiling and evaluating it.\n\n* The command attempts to use `ToExpr`, `Repr`, or `ToString` instances to print the result.\n* If `e` is a monadic value of type `m ty`, then the command tries to adapt the monad `m`\n  to one of the monads that `#eval` supports, which include `IO`, `CoreM`, `MetaM`, `TermElabM`, and `CommandElabM`.\n  Users can define `MonadEval` instances to extend the list of supported monads.\n\nThe `#eval` command gracefully degrades in capability depending on what is imported.\nImporting the `Lean.Elab.Command` module provides full capabilities.\n\nDue to unsoundness, `#eval` refuses to evaluate expressions that depend on `sorry`, even indirectly,\nsince the presence of `sorry` can lead to runtime instability and crashes.\nThis check can be overridden with the `#eval! e` command.\n\nOptions:\n* If `eval.pp` is true (default: true) then tries to use `ToExpr` instances to make use of the\n  usual pretty printer. Otherwise, only tries using `Repr` and `ToString` instances.\n* If `eval.type` is true (default: false) then pretty prints the type of the evaluated value.\n* If `eval.derive.repr` is true (default: true) then attempts to auto-derive a `Repr` instance\n  when there is no other way to print the result.\n\nSee also: `#reduce e` for evaluation by term reduction.\n</code>",
 "28":
 "<code>List.cons.{u} {α : Type u} (head : α) (tail : List α) : List α</code><span class=\"sep\"></span><code class=\"docstring\">The list whose first element is `head`, where `tail` is the rest of the list.\nUsually written `head :: tail`.\n\n\nConventions for notations in identifiers:\n\n * The recommended spelling of `::` in identifiers is `cons`.\n\n * The recommended spelling of `[a]` in identifiers is `singleton`.</code>",
 "27": "<code>reverse (xs ++ ys) = reverse ys ++ reverse xs</code>",
 "26": "<code>α</code>",
 "25":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1105&quot;:{&quot;binding&quot;:&quot;var-_uniq.634&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;1296&quot;:{&quot;binding&quot;:&quot;const-reverse&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;272&quot;:{&quot;binding&quot;:&quot;const-reverse&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;277&quot;:{&quot;binding&quot;:&quot;var-_uniq.395&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;325&quot;:{&quot;binding&quot;:&quot;var-_uniq.395&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;336&quot;:{&quot;binding&quot;:&quot;const-reverse&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;85&quot;:{&quot;binding&quot;:&quot;var-_uniq.634&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,272,&quot;reverse&quot;]]],[4,1,[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,1105,&quot;xs&quot;]]],[4,[4,&quot; ++&quot;,1],[6,[3,2,[7,277,&quot;ys&quot;]]]]]]]],&quot;)&quot;]]]]]]]],[4,[4,&quot; =&quot;,1],[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,1296,&quot;reverse&quot;]]],[4,1,[6,[3,2,[7,325,&quot;ys&quot;]]]]]]],[4,[4,&quot; ++&quot;,1],[6,[3,2,[4,[6,[3,2,[7,336,&quot;reverse&quot;]]],[4,1,[6,[3,2,[7,85,&quot;xs&quot;]]]]]]]]]]]]]]]]}\">reverse (xs ++ ys) = reverse ys ++ reverse xs</code>",
 "24":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1&quot;:{&quot;binding&quot;:&quot;var-_uniq.478&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[7,1,&quot;α&quot;]]]]}\">α</code>",
 "23":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1360&quot;:{&quot;binding&quot;:&quot;const-List&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;1361&quot;:{&quot;binding&quot;:&quot;var-_uniq.719&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;1364&quot;:{&quot;binding&quot;:&quot;const-List&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;1365&quot;:{&quot;binding&quot;:&quot;var-_uniq.719&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.719&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;3&quot;:{&quot;binding&quot;:&quot;var-_uniq.720&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;8&quot;:{&quot;binding&quot;:&quot;var-_uniq.721&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;84&quot;:{&quot;binding&quot;:&quot;var-_uniq.719&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;List.cons&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]],&quot;}&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,3,&quot;head&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,84,&quot;α&quot;]]],&quot;)&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,8,&quot;tail&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,1360,&quot;List&quot;]]],[4,1,[6,[3,2,[7,1361,&quot;α&quot;]]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,1364,&quot;List&quot;]]],[4,1,[6,[3,2,[7,1365,&quot;α&quot;]]]]]]]]]]]]]]]]]]]}\">List.cons.{u} {α : Type u} (head : α) (tail : List α) : List α</code><span class=\"sep\"></span><code class=\"docstring\">The list whose first element is `head`, where `tail` is the rest of the list.\nUsually written `head :: tail`.\n\n\nConventions for notations in identifiers:\n\n * The recommended spelling of `::` in identifiers is `cons`.\n\n * The recommended spelling of `[a]` in identifiers is `singleton`.</code>",
 "22":
 "<code class=\"docstring\">The `simp` tactic uses lemmas and hypotheses to simplify the main goal target or\nnon-dependent hypotheses. It has many variants:\n- `simp` simplifies the main goal target using lemmas tagged with the attribute `[simp]`.\n- `simp [h₁, h₂, ..., hₙ]` simplifies the main goal target using the lemmas tagged\n  with the attribute `[simp]` and the given `hᵢ`'s, where the `hᵢ`'s are expressions.-\n- If an `hᵢ` is a defined constant `f`, then `f` is unfolded. If `f` has equational lemmas associated\n  with it (and is not a projection or a `reducible` definition), these are used to rewrite with `f`.\n- `simp [*]` simplifies the main goal target using the lemmas tagged with the\n  attribute `[simp]` and all hypotheses.\n- `simp only [h₁, h₂, ..., hₙ]` is like `simp [h₁, h₂, ..., hₙ]` but does not use `[simp]` lemmas.\n- `simp [-id₁, ..., -idₙ]` simplifies the main goal target using the lemmas tagged\n  with the attribute `[simp]`, but removes the ones named `idᵢ`.\n- `simp at h₁ h₂ ... hₙ` simplifies the hypotheses `h₁ : T₁` ... `hₙ : Tₙ`. If\n  the target or another hypothesis depends on `hᵢ`, a new simplified hypothesis\n  `hᵢ` is introduced, but the old one remains in the local context.\n- `simp at *` simplifies all the hypotheses and the target.\n- `simp [*] at *` simplifies target and all (propositional) hypotheses using the\n  other hypotheses.\n</code>",
 "21":
 "<code>List.nil.{u} {α : Type u} : List α</code><span class=\"sep\"></span><code class=\"docstring\">The empty list, usually written `[]`. \n\nConventions for notations in identifiers:\n\n * The recommended spelling of `[]` in identifiers is `nil`.</code>",
 "20":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.715&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;84&quot;:{&quot;binding&quot;:&quot;const-List&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;85&quot;:{&quot;binding&quot;:&quot;var-_uniq.715&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;List.nil&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]],&quot;}&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,84,&quot;List&quot;]]],[4,1,[6,[3,2,[7,85,&quot;α&quot;]]]]]]]]]]]]]]]}\">List.nil.{u} {α : Type u} : List α</code><span class=\"sep\"></span><code class=\"docstring\">The empty list, usually written `[]`. \n\nConventions for notations in identifiers:\n\n * The recommended spelling of `[]` in identifiers is `nil`.</code>",
 "2":
 "<code data-rich-format=\"{&quot;annotations&quot;:{},&quot;fmt&quot;:[6,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u_1&quot;]]]]]]]}\">Type u_1</code>",
 "19":
 "<code class=\"docstring\">After `with`, there is an optional tactic that runs on all branches, and\nthen a list of alternatives.\n</code>",
 "18":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;4&quot;:{&quot;binding&quot;:&quot;const-List&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;var-_uniq.478&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;List&quot;]]],[4,1,[6,[3,2,[7,5,&quot;α&quot;]]]]]]]]}\">List α</code>",
 "17":
 "<code class=\"docstring\">Assuming `x` is a variable in the local context with an inductive type,\n`induction x` applies induction on `x` to the main goal,\nproducing one goal for each constructor of the inductive type,\nin which the target is replaced by a general instance of that constructor\nand an inductive hypothesis is added for each recursive argument to the constructor.\nIf the type of an element in the local context depends on `x`,\nthat element is reverted and reintroduced afterward,\nso that the inductive hypothesis incorporates that hypothesis as well.\n\nFor example, given `n : Nat` and a goal with a hypothesis `h : P n` and target `Q n`,\n`induction n` produces one goal with hypothesis `h : P 0` and target `Q 0`,\nand one goal with hypotheses `h : P (Nat.succ a)` and `ih₁ : P a → Q a` and target `Q (Nat.succ a)`.\nHere the names `a` and `ih₁` are chosen automatically and are not accessible.\nYou can use `with` to provide the variables names for each constructor.\n- `induction e`, where `e` is an expression instead of a variable,\n  generalizes `e` in the goal, and then performs induction on the resulting variable.\n- `induction e using r` allows the user to specify the principle of induction that should be used.\n  Here `r` should be a term whose result type must be of the form `C t`,\n  where `C` is a bound variable and `t` is a (possibly empty) sequence of bound variables\n- `induction e generalizing z₁ ... zₙ`, where `z₁ ... zₙ` are variables in the local context,\n  generalizes over `z₁ ... zₙ` before applying the induction but then introduces them in each goal.\n  In other words, the net effect is that each inductive hypothesis is generalized.\n- Given `x : Nat`, `induction x with | zero =&gt; tac₁ | succ x' ih =&gt; tac₂`\n  uses tactic `tac₁` for the `zero` case, and `tac₂` for the `succ` case.\n</code>",
 "16":
 "<code>Eq.{u_1} {α : Sort u_1} : α → α → Prop</code><span class=\"sep\"></span><code class=\"docstring\">The equality relation. It has one introduction rule, `Eq.refl`.\nWe use `a = b` as notation for `Eq a b`.\nA fundamental property of equality is that it is an equivalence relation.\n```\nvariable (α : Type) (a b c d : α)\nvariable (hab : a = b) (hcb : c = b) (hcd : c = d)\n\nexample : a = d :=\n  Eq.trans (Eq.trans hab (Eq.symm hcb)) hcd\n```\nEquality is much more than an equivalence relation, however. It has the important property that every assertion\nrespects the equivalence, in the sense that we can substitute equal expressions without changing the truth value.\nThat is, given `h1 : a = b` and `h2 : p a`, we can construct a proof for `p b` using substitution: `Eq.subst h1 h2`.\nExample:\n```\nexample (α : Type) (a b : α) (p : α → Prop)\n        (h1 : a = b) (h2 : p a) : p b :=\n  Eq.subst h1 h2\n\nexample (α : Type) (a b : α) (p : α → Prop)\n    (h1 : a = b) (h2 : p a) : p b :=\n  h1 ▸ h2\n```\nThe triangle in the second presentation is a macro built on top of `Eq.subst` and `Eq.symm`, and you can enter it by typing `\\t`.\nFor more information: [Equality](https://lean-lang.org/theorem_proving_in_lean4/quantifiers_and_equality.html#equality)\n\n\nConventions for notations in identifiers:\n\n * The recommended spelling of `=` in identifiers is `eq`.</code>",
 "15":
 "<code>HAppend.hAppend.{u, v, w} {α : Type u} {β : Type v} {γ : outParam (Type w)} [self : HAppend α β γ] : α → β → γ</code><span class=\"sep\"></span><code class=\"docstring\">`a ++ b` is the result of concatenation of `a` and `b`, usually read \"append\".\nThe meaning of this notation is type-dependent. \n\nConventions for notations in identifiers:\n\n * The recommended spelling of `++` in identifiers is `append`.</code>",
 "14": "<code>reverse.{u_1} {α : Type u_1} : List α → List α</code>",
 "13":
 "<code>List.{u} (α : Type u) : Type u</code><span class=\"sep\"></span><code class=\"docstring\">Linked lists: ordered lists, in which each element has a reference to the next element.\n\nMost operations on linked lists take time proportional to the length of the list, because each\nelement must be traversed to find the next element.\n\n`List α` is isomorphic to `Array α`, but they are useful for different things:\n* `List α` is easier for reasoning, and `Array α` is modeled as a wrapper around `List α`.\n* `List α` works well as a persistent data structure, when many copies of the tail are shared. When\n  the value is not shared, `Array α` will have better performance because it can do destructive\n  updates.\n</code>",
 "12": "<code>List α</code>",
 "11":
 "<code class=\"docstring\">A type universe. `Type ≡ Type 0`, `Type u ≡ Sort (u + 1)`. </code>",
 "10": "<code>Type u_1</code>",
 "1":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.221&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;List&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]]]]]]]]]]}\">List.{u} (α : Type u) : Type u</code><span class=\"sep\"></span><code class=\"docstring\">Linked lists: ordered lists, in which each element has a reference to the next element.\n\nMost operations on linked lists take time proportional to the length of the list, because each\nelement must be traversed to find the next element.\n\n`List α` is isomorphic to `Array α`, but they are useful for different things:\n* `List α` is easier for reasoning, and `Array α` is modeled as a wrapper around `List α`.\n* `List α` works well as a persistent data structure, when many copies of the tail are shared. When\n  the value is not shared, `Array α` will have better performance because it can do destructive\n  updates.\n</code>",
 "0":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.221&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;336&quot;:{&quot;binding&quot;:&quot;const-List&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;337&quot;:{&quot;binding&quot;:&quot;var-_uniq.221&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;340&quot;:{&quot;binding&quot;:&quot;const-List&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;341&quot;:{&quot;binding&quot;:&quot;var-_uniq.221&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;reverse&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u_1&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u_1&quot;]]]]]],&quot;}&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,336,&quot;List&quot;]]],[4,1,[6,[3,2,[7,337,&quot;α&quot;]]]]]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,340,&quot;List&quot;]]],[4,1,[6,[3,2,[7,341,&quot;α&quot;]]]]]]]]]]]]]]]]]]]]}\">reverse.{u_1} {α : Type u_1} : List α → List α</code>"};

        document.querySelectorAll(".code-with-panel").forEach(setupBlock);

        Reveal.on("fragmentshown", onFragmentShown);
        Reveal.on("fragmenthidden", onFragmentHidden);
        Reveal.on("slidechanged", onSlideChanged);
    }

    // ---- Per-block setup ----

    /** @param {Element} blockEl */
    function setupBlock(blockEl) {
        var block = /** @type {PanelBlock} */ (blockEl);
        var codeEl = /** @type {Element} */ (block.querySelector("code.hl.lean.block"));
        var panel = /** @type {InfoPanel} */ (block.querySelector(".info-panel"));
        if (!block.querySelector("code.hl.lean.block") || !block.querySelector(".info-panel"))
            return;

        block._activeSource = null;

        // Click handler on code element
        codeEl.addEventListener("click", function (e) {
            var chain = findClickableChain(/** @type {Element} */ (e.target), codeEl);
            var chosen = cycleClickable(block, chain);
            if (chosen) {
                clearHoverPreview(codeEl);
                updatePanel(panel, chosen, block);
            }
        });

        // Hover preview — show what would be selected on click
        codeEl.addEventListener("mouseover", function (e) {
            var chain = findClickableChain(/** @type {Element} */ (e.target), codeEl);
            var chosen = cycleClickable(block, chain);
            if (chosen && chosen !== block._activeSource) {
                clearHoverPreview(codeEl);
                chosen.classList.add("panel-hover");
            } else {
                clearHoverPreview(codeEl);
            }
        });
        /** @type {HTMLElement} */ (codeEl).addEventListener("mouseout", function (e) {
            if (!e.relatedTarget || !codeEl.contains(/** @type {Node} */ (e.relatedTarget))) {
                clearHoverPreview(codeEl);
            }
        });

        // Binding highlighting — works across code and panel
        /** @param {Event} e */
        function onBindingOver(e) {
            var tok = /** @type {Element} */ (e.target).closest(".token[data-binding]");
            if (!tok) return;
            var binding = tok.getAttribute("data-binding");
            if (!binding) return;
            var sel = '.token[data-binding="' + binding + '"]';
            codeEl.querySelectorAll(sel).forEach(function (t) {
                t.classList.add("binding-hl");
            });
            panel.querySelectorAll(sel).forEach(function (t) {
                t.classList.add("binding-hl");
            });
        }
        /** @param {Event} e */
        function onBindingOut(e) {
            var tok = /** @type {Element} */ (e.target).closest(".token[data-binding]");
            if (!tok) return;
            codeEl.querySelectorAll(".token.binding-hl").forEach(function (t) {
                t.classList.remove("binding-hl");
            });
            panel.querySelectorAll(".token.binding-hl").forEach(function (t) {
                t.classList.remove("binding-hl");
            });
        }
        codeEl.addEventListener("mouseover", onBindingOver);
        codeEl.addEventListener("mouseout", onBindingOut);
        panel.addEventListener("mouseover", onBindingOver);
        panel.addEventListener("mouseout", onBindingOut);

        // Divider drag
        var divider = block.querySelector(".panel-divider");
        if (divider) setupDividerDrag(block, /** @type {HTMLElement} */ (divider));

        // ResizeObserver for reflowing rich format content
        if (typeof ResizeObserver !== "undefined") {
            /** @type {ReturnType<typeof setTimeout> | null} */
            var reflowTimer = null;
            new ResizeObserver(function () {
                if (reflowTimer) clearTimeout(reflowTimer);
                reflowTimer = setTimeout(function () {
                    reflowPanel(panel);
                }, 100);
            }).observe(panel);
        }
    }

    /** @param {Element} codeEl */
    function clearHoverPreview(codeEl) {
        codeEl.querySelectorAll(".panel-hover").forEach(function (el) {
            el.classList.remove("panel-hover");
        });
    }

    // ---- Clickable element discovery ----

    /**
     * @param {Element} el
     * @return {boolean}
     */
    function isClickable(el) {
        return (
            el.classList.contains("tactic") ||
            el.classList.contains("has-info") ||
            el.hasAttribute("data-verso-hover")
        );
    }

    /**
     * Collect clickable ancestors from target up to codeEl, outermost first.
     * @param {Element} target
     * @param {Element} codeEl
     * @return {Element[]}
     */
    function findClickableChain(target, codeEl) {
        /** @type {Element[]} */
        var chain = [];
        /** @type {Element | null} */
        var el = target;
        while (el && el !== codeEl) {
            if (isClickable(el)) chain.push(el);
            el = el.parentElement;
        }
        chain.reverse(); // outermost first
        return chain;
    }

    /**
     * Pick which element to select: outermost if nothing active in this chain,
     * otherwise cycle inward from the active element toward the click target.
     * @param {PanelBlock} block
     * @param {Element[]} chain
     * @return {Element | null}
     */
    function cycleClickable(block, chain) {
        if (chain.length === 0) return null;
        var active = block._activeSource;
        var idx = active ? chain.indexOf(active) : -1;
        if (idx >= 0 && idx < chain.length - 1) {
            return chain[idx + 1];
        }
        return chain[0];
    }

    // ---- Panel update ----

    /**
     * @param {InfoPanel} panel
     * @param {Element} el
     * @param {PanelBlock} block
     */
    function updatePanel(panel, el, block) {
        // Clear previous focus
        var codeEl = block.querySelector("code.hl.lean.block");
        if (codeEl) {
            codeEl.querySelectorAll(".panel-focus").forEach(function (f) {
                f.classList.remove("panel-focus");
            });
        }

        block._activeSource = el;
        el.classList.add("panel-focus");

        // Store the source element for reflow on resize
        panel._richFormatSource = null;

        /** @type {string | null} */
        var html = "";

        if (el.classList.contains("tactic")) {
            var ts = el.querySelector(".tactic-state");
            if (ts) {
                var richFmt = ts.getAttribute("data-rich-format");
                if (richFmt && typeof goalsToHtml === "function") {
                    panel._richFormatSource = ts;
                    try {
                        var goalsData = JSON.parse(richFmt);
                        var result = goalsToHtml(goalsData);
                        // Pass 1: insert structural HTML so table layout computes cell widths
                        panel.innerHTML = '<span class="hl lean">' + result.html + "</span>";
                        // Pass 2: measure actual .type cell widths and format expressions
                        var measurer = getPanelMeasurer(panel);
                        fillReflowedSpans(panel, result.formats, measurer);
                        html = null; // already set innerHTML
                    } catch (e) {
                        html = '<span class="hl lean">' + ts.innerHTML + "</span>";
                        panel._richFormatSource = null;
                    }
                } else {
                    html = '<span class="hl lean">' + ts.innerHTML + "</span>";
                }
            }
        } else if (el.classList.contains("has-info")) {
            var msgs = el.querySelector(".hover-info.messages");
            if (msgs) html = '<span class="hl lean">' + msgs.innerHTML + "</span>";
        } else if (el.hasAttribute("data-verso-hover")) {
            var id = el.getAttribute("data-verso-hover");
            html = lookupHoverDoc(id);
        }

        if (html !== null) panel.innerHTML = html;

        // Check for reflowable signature format data in hover content
        var sigCode = panel.querySelector("code[data-rich-format]");
        if (sigCode && typeof formatToHtml === "function") {
            try {
                var fmtData = JSON.parse(sigCode.getAttribute("data-rich-format") || "{}");
                panel._richFormatSource = sigCode;
                var measurer = getPanelMeasurer(panel);
                var width =
                    panel.clientWidth -
                    parseFloat(getComputedStyle(panel).paddingLeft || "0") -
                    parseFloat(getComputedStyle(panel).paddingRight || "0");
                var rendered = formatToHtml(fmtData.fmt, fmtData.annotations, width, measurer);
                sigCode.innerHTML = '<span class="reflowed">' + rendered + "</span>";
            } catch (e) {
                // Fall back to plain text signature on error
                panel._richFormatSource = null;
            }
        }

        // Render docstrings with marked
        if (typeof marked !== "undefined") {
            var m = /** @type {typeof marked} */ (marked);
            panel.querySelectorAll(".docstring").forEach(function (ds) {
                ds.innerHTML = /** @type {string} */ (m.parse(ds.textContent || ""));
            });
        }
    }

    /**
     * Create a DOM measurer for text and element width measurement.
     * @param {HTMLElement} panel
     * @return {DOMMeasurer}
     */
    function getPanelMeasurer(panel) {
        return createDOMMeasurer(panel);
    }

    /**
     * Reflow the panel's rich format content at current width.
     * @param {InfoPanel} panel
     */
    function reflowPanel(panel) {
        var source = panel._richFormatSource;
        if (!source) return;
        var richFmt = source.getAttribute("data-rich-format");
        if (!richFmt) return;
        try {
            var parsed = JSON.parse(richFmt);
            // Detect whether this is goal data (array) or signature format data (has "fmt" key)
            if (Array.isArray(parsed) && typeof goalsToHtml === "function") {
                var result = goalsToHtml(parsed);
                panel.innerHTML = '<span class="hl lean">' + result.html + "</span>";
                var measurer = getPanelMeasurer(panel);
                fillReflowedSpans(panel, result.formats, measurer);
            } else if (parsed.fmt && typeof formatToHtml === "function") {
                var measurer = getPanelMeasurer(panel);
                var width =
                    panel.clientWidth -
                    parseFloat(getComputedStyle(panel).paddingLeft || "0") -
                    parseFloat(getComputedStyle(panel).paddingRight || "0");
                source.innerHTML =
                    '<span class="reflowed">' +
                    formatToHtml(parsed.fmt, parsed.annotations, width, measurer) +
                    "</span>";
            }
        } catch (e) {
            // Fall back to pre-rendered HTML on error
        }
    }

    /**
     * @param {string | null} id
     * @return {string}
     */
    function lookupHoverDoc(id) {
        if (!docsJson || !id) return "";
        var entry = docsJson[id];
        if (!entry) return "";
        // entry is the HTML string from verso hover data
        if (typeof entry === "string") {
            return '<span class="hl lean">' + entry + "</span>";
        }
        // Could be an object with .hover field
        if (entry.hover) {
            return '<span class="hl lean">' + entry.hover + "</span>";
        }
        return "";
    }

    // ---- Fragment automation ----

    /** @param {{ fragment: HTMLElement }} evt */
    function onFragmentShown(evt) {
        var frag = evt.fragment;
        if (!frag || !frag.classList.contains("slide-click-only")) return;

        var block = /** @type {PanelBlock | null} */ (frag.closest(".code-with-panel"));
        if (!block) return;

        var panel = /** @type {InfoPanel | null} */ (block.querySelector(".info-panel"));
        if (!panel) return;

        // Find the clickable element targeted by this fragment
        var target = frag.querySelector(".tactic, .has-info, [data-verso-hover]");
        if (target) updatePanel(panel, target, block);
    }

    /** @param {{ fragment: HTMLElement }} evt */
    function onFragmentHidden(evt) {
        var frag = evt.fragment;
        if (!frag || !frag.classList.contains("slide-click-only")) return;

        var block = /** @type {PanelBlock | null} */ (frag.closest(".code-with-panel"));
        if (!block) return;

        syncPanelToLastVisible(block);
    }

    function onSlideChanged() {
        var slide = Reveal.getCurrentSlide();
        if (!slide) return;
        slide.querySelectorAll(".code-with-panel").forEach(function (el) {
            syncPanelToLastVisible(/** @type {PanelBlock} */ (el));
        });
    }

    /** @param {PanelBlock} block */
    function syncPanelToLastVisible(block) {
        var panel = /** @type {InfoPanel | null} */ (block.querySelector(".info-panel"));
        if (!panel) return;

        // Find the last visible slide-click-only fragment
        var frags = block.querySelectorAll(".fragment.slide-click-only.visible");
        if (frags.length > 0) {
            var last = frags[frags.length - 1];
            var target = last.querySelector(".tactic, .has-info, [data-verso-hover]");
            if (target) {
                updatePanel(panel, target, block);
                return;
            }
        }

        // No visible fragments — clear panel
        var codeEl = block.querySelector("code.hl.lean.block");
        if (codeEl) {
            codeEl.querySelectorAll(".panel-focus").forEach(function (f) {
                f.classList.remove("panel-focus");
            });
        }
        block._activeSource = null;
        panel.innerHTML = "";
    }

    // ---- Divider drag ----

    /**
     * @param {HTMLElement} block
     * @param {HTMLElement} divider
     */
    function setupDividerDrag(block, divider) {
        var dragging = false;

        divider.addEventListener("mousedown", function (e) {
            e.preventDefault();
            dragging = true;
            document.body.style.cursor = "col-resize";
            document.body.style.userSelect = "none";
        });

        document.addEventListener("mousemove", function (e) {
            if (!dragging) return;
            var rect = block.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var pct = x / rect.width;

            if (pct > 0.95) {
                // Collapse panel
                block.classList.add("panel-collapsed");
            } else {
                block.classList.remove("panel-collapsed");
                var codeFr = Math.max(0.2, Math.min(0.9, pct));
                var panelFr = 1 - codeFr;
                block.style.setProperty("--code-ratio", codeFr + "fr");
                block.style.setProperty("--panel-ratio", panelFr + "fr");
            }
        });

        document.addEventListener("mouseup", function () {
            if (!dragging) return;
            dragging = false;
            document.body.style.cursor = "";
            document.body.style.userSelect = "";
        });
    }

    // ---- Entry point ----
    Reveal.on("ready", init);
})();
