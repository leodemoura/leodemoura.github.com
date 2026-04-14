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
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1360&quot;:{&quot;binding&quot;:&quot;var-_uniq.1352&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;1361&quot;:{&quot;binding&quot;:&quot;var-_uniq.1353&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.1352&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;3&quot;:{&quot;binding&quot;:&quot;var-_uniq.1353&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;5456&quot;:{&quot;binding&quot;:&quot;const-Tree&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5457&quot;:{&quot;binding&quot;:&quot;var-_uniq.1352&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;5460&quot;:{&quot;binding&quot;:&quot;const-Tree&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5461&quot;:{&quot;binding&quot;:&quot;var-_uniq.1353&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;9&quot;:{&quot;binding&quot;:&quot;var-_uniq.1355&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;Tree.map&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u_1&quot;]],[4,&quot;,&quot;,[4,1,[4,[6,[3,2,&quot;u_2&quot;]],&quot;}&quot;]]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u_1&quot;]]]]]],&quot;}&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,3,&quot;β&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u_2&quot;]]]]]],&quot;}&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,9,&quot;f&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,1360,&quot;α&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,1361,&quot;β&quot;]]]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,5456,&quot;Tree&quot;]]],[4,1,[6,[3,2,[7,5457,&quot;α&quot;]]]]]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,5460,&quot;Tree&quot;]]],[4,1,[6,[3,2,[7,5461,&quot;β&quot;]]]]]]]]]]]]]]]]]]]]]]]]}\">Tree.map.{u_1, u_2} {α : Type u_1} {β : Type u_2} (f : α → β) : Tree α → Tree β</code>",
 "8":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1&quot;:{&quot;binding&quot;:&quot;var-_uniq.2&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[7,1,&quot;α&quot;]]]]}\">α</code>",
 "78":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1360&quot;:{&quot;binding&quot;:&quot;var-_uniq.166&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;1361&quot;:{&quot;binding&quot;:&quot;var-_uniq.167&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.166&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;21829&quot;:{&quot;binding&quot;:&quot;var-_uniq.167&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;21840&quot;:{&quot;binding&quot;:&quot;const-Tree&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;21841&quot;:{&quot;binding&quot;:&quot;var-_uniq.167&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;21844&quot;:{&quot;binding&quot;:&quot;const-Tree&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;21845&quot;:{&quot;binding&quot;:&quot;var-_uniq.167&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;3&quot;:{&quot;binding&quot;:&quot;var-_uniq.167&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;5456&quot;:{&quot;binding&quot;:&quot;const-List&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;87312&quot;:{&quot;binding&quot;:&quot;const-Tree.Frame&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;87313&quot;:{&quot;binding&quot;:&quot;var-_uniq.166&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;9&quot;:{&quot;binding&quot;:&quot;var-_uniq.169&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;Tree.Tree.applyStack&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u_1&quot;]],[4,&quot;,&quot;,[4,1,[4,[6,[3,2,&quot;u_2&quot;]],&quot;}&quot;]]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u_1&quot;]]]]]],&quot;}&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,3,&quot;β&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u_2&quot;]]]]]],&quot;}&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,9,&quot;f&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,1360,&quot;α&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,1361,&quot;β&quot;]]]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,5456,&quot;List&quot;]]],[4,1,[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,87312,&quot;Frame&quot;]]],[4,1,[4,[6,[3,2,[7,87313,&quot;α&quot;]]],[4,1,[6,[3,2,[7,21829,&quot;β&quot;]]]]]]]]]],&quot;)&quot;]]]]]]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,21840,&quot;Tree&quot;]]],[4,1,[6,[3,2,[7,21841,&quot;β&quot;]]]]]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,21844,&quot;Tree&quot;]]],[4,1,[6,[3,2,[7,21845,&quot;β&quot;]]]]]]]]]]]]]]]]]]]]]]]]]]]]]}\">Tree.Tree.applyStack.{u_1, u_2} {α : Type u_1} {β : Type u_2} (f : α → β) : List (Frame α β) → Tree β → Tree β</code>",
 "77":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;10&quot;:{&quot;binding&quot;:&quot;var-_uniq.172&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;11&quot;:{&quot;binding&quot;:&quot;var-_uniq.173&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;1360&quot;:{&quot;binding&quot;:&quot;var-_uniq.166&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;1361&quot;:{&quot;binding&quot;:&quot;var-_uniq.167&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;1398033&quot;:{&quot;binding&quot;:&quot;var-_uniq.172&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;1398081&quot;:{&quot;binding&quot;:&quot;var-_uniq.169&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;1398097&quot;:{&quot;binding&quot;:&quot;var-_uniq.169&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.166&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;21829&quot;:{&quot;binding&quot;:&quot;var-_uniq.167&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;21840&quot;:{&quot;binding&quot;:&quot;const-Tree&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;21841&quot;:{&quot;binding&quot;:&quot;var-_uniq.166&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;22369280&quot;:{&quot;binding&quot;:&quot;const-Tree.Tree.applyStack&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;22369536&quot;:{&quot;binding&quot;:&quot;const-Tree.map&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;3&quot;:{&quot;binding&quot;:&quot;var-_uniq.167&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;349509&quot;:{&quot;binding&quot;:&quot;var-_uniq.173&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;349521&quot;:{&quot;binding&quot;:&quot;var-_uniq.172&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;349525&quot;:{&quot;binding&quot;:&quot;var-_uniq.173&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;5456&quot;:{&quot;binding&quot;:&quot;const-List&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5592129&quot;:{&quot;binding&quot;:&quot;var-_uniq.169&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;87312&quot;:{&quot;binding&quot;:&quot;const-Tree.Frame&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;87313&quot;:{&quot;binding&quot;:&quot;var-_uniq.166&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;89474048&quot;:{&quot;binding&quot;:&quot;const-Tree.Tree.mapGo&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;9&quot;:{&quot;binding&quot;:&quot;var-_uniq.169&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;Tree.Tree.mapGo_spec&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u_1&quot;]],[4,&quot;,&quot;,[4,1,[4,[6,[3,2,&quot;u_2&quot;]],&quot;}&quot;]]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u_1&quot;]]]]]],&quot;}&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,3,&quot;β&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u_2&quot;]]]]]],&quot;}&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,9,&quot;f&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,1360,&quot;α&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,1361,&quot;β&quot;]]]]]]]],&quot;)&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,10,&quot;stack&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,5456,&quot;List&quot;]]],[4,1,[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,87312,&quot;Frame&quot;]]],[4,1,[4,[6,[3,2,[7,87313,&quot;α&quot;]]],[4,1,[6,[3,2,[7,21829,&quot;β&quot;]]]]]]]]]],&quot;)&quot;]]]]]]]],&quot;)&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,11,&quot;t&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,21840,&quot;Tree&quot;]]],[4,1,[6,[3,2,[7,21841,&quot;α&quot;]]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,89474048,&quot;mapGo&quot;]]],[4,1,[4,[6,[3,2,[7,5592129,&quot;f&quot;]]],[4,1,[4,[6,[3,2,[7,1398033,&quot;stack&quot;]]],[4,1,[6,[3,2,[7,349509,&quot;t&quot;]]]]]]]]]]],[4,[4,&quot; =&quot;,1],[6,[3,2,[4,[6,[3,2,[7,22369280,&quot;applyStack&quot;]]],[4,1,[4,[6,[3,2,[7,1398081,&quot;f&quot;]]],[4,1,[4,[6,[3,2,[7,349521,&quot;stack&quot;]]],[4,1,[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,22369536,&quot;map&quot;]]],[4,1,[4,[6,[3,2,[7,1398097,&quot;f&quot;]]],[4,1,[6,[3,2,[7,349525,&quot;t&quot;]]]]]]]]]],&quot;)&quot;]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]}\">Tree.Tree.mapGo_spec.{u_1, u_2} {α : Type u_1} {β : Type u_2} (f : α → β) (stack : List (Frame α β)) (t : Tree α) :\n  mapGo f stack t = applyStack f stack (map f t)</code>",
 "76":
 "<code>Tree.map.{u_1, u_2} {α : Type u_1} {β : Type u_2} (f : α → β) : Tree α → Tree β</code>",
 "75":
 "<code>Eq.{u_1} {α : Sort u_1} : α → α → Prop</code><span class=\"sep\"></span><code class=\"docstring\">The equality relation. It has one introduction rule, `Eq.refl`.\nWe use `a = b` as notation for `Eq a b`.\nA fundamental property of equality is that it is an equivalence relation.\n```\nvariable (α : Type) (a b c d : α)\nvariable (hab : a = b) (hcb : c = b) (hcd : c = d)\n\nexample : a = d :=\n  Eq.trans (Eq.trans hab (Eq.symm hcb)) hcd\n```\nEquality is much more than an equivalence relation, however. It has the important property that every assertion\nrespects the equivalence, in the sense that we can substitute equal expressions without changing the truth value.\nThat is, given `h1 : a = b` and `h2 : p a`, we can construct a proof for `p b` using substitution: `Eq.subst h1 h2`.\nExample:\n```\nexample (α : Type) (a b : α) (p : α → Prop)\n        (h1 : a = b) (h2 : p a) : p b :=\n  Eq.subst h1 h2\n\nexample (α : Type) (a b : α) (p : α → Prop)\n    (h1 : a = b) (h2 : p a) : p b :=\n  h1 ▸ h2\n```\nThe triangle in the second presentation is a macro built on top of `Eq.subst` and `Eq.symm`, and you can enter it by typing `\\t`.\nFor more information: [Equality](https://lean-lang.org/theorem_proving_in_lean4/quantifiers_and_equality.html#equality)\n\n\nConventions for notations in identifiers:\n\n * The recommended spelling of `=` in identifiers is `eq`.</code>",
 "74":
 "<code>Tree.Tree.mapTR.{u_1, u_2} {α : Type u_1} {β : Type u_2} (f : α → β) (t : Tree α) : Tree β</code>",
 "73": "<code>Tree α</code>",
 "72": "<code>α → β</code>",
 "71":
 "<code class=\"docstring\">`by tac` constructs a term of the expected type by running the tactic(s) `tac`. </code>",
 "70":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1360&quot;:{&quot;binding&quot;:&quot;var-_uniq.166&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;1361&quot;:{&quot;binding&quot;:&quot;var-_uniq.167&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.166&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;3&quot;:{&quot;binding&quot;:&quot;var-_uniq.167&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;5456&quot;:{&quot;binding&quot;:&quot;const-Tree&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5457&quot;:{&quot;binding&quot;:&quot;var-_uniq.166&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;5460&quot;:{&quot;binding&quot;:&quot;const-Tree&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5461&quot;:{&quot;binding&quot;:&quot;var-_uniq.167&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;9&quot;:{&quot;binding&quot;:&quot;var-_uniq.169&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;Tree.map&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u_1&quot;]],[4,&quot;,&quot;,[4,1,[4,[6,[3,2,&quot;u_2&quot;]],&quot;}&quot;]]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u_1&quot;]]]]]],&quot;}&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,3,&quot;β&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u_2&quot;]]]]]],&quot;}&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,9,&quot;f&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,1360,&quot;α&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,1361,&quot;β&quot;]]]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,5456,&quot;Tree&quot;]]],[4,1,[6,[3,2,[7,5457,&quot;α&quot;]]]]]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,5460,&quot;Tree&quot;]]],[4,1,[6,[3,2,[7,5461,&quot;β&quot;]]]]]]]]]]]]]]]]]]]]]]]]}\">Tree.map.{u_1, u_2} {α : Type u_1} {β : Type u_2} (f : α → β) : Tree α → Tree β</code>",
 "7":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;4&quot;:{&quot;binding&quot;:&quot;const-Tree&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;var-_uniq.2&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;Tree&quot;]]],[4,1,[6,[3,2,[7,5,&quot;α&quot;]]]]]]]]}\">Tree α</code>",
 "69":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;10&quot;:{&quot;binding&quot;:&quot;var-_uniq.170&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;1360&quot;:{&quot;binding&quot;:&quot;var-_uniq.166&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;1361&quot;:{&quot;binding&quot;:&quot;var-_uniq.167&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.166&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;3&quot;:{&quot;binding&quot;:&quot;var-_uniq.167&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;5456&quot;:{&quot;binding&quot;:&quot;const-Tree&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5457&quot;:{&quot;binding&quot;:&quot;var-_uniq.166&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;5460&quot;:{&quot;binding&quot;:&quot;const-Tree&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5461&quot;:{&quot;binding&quot;:&quot;var-_uniq.167&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;9&quot;:{&quot;binding&quot;:&quot;var-_uniq.169&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;Tree.Tree.mapTR&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u_1&quot;]],[4,&quot;,&quot;,[4,1,[4,[6,[3,2,&quot;u_2&quot;]],&quot;}&quot;]]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u_1&quot;]]]]]],&quot;}&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,3,&quot;β&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u_2&quot;]]]]]],&quot;}&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,9,&quot;f&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,1360,&quot;α&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,1361,&quot;β&quot;]]]]]]]],&quot;)&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,10,&quot;t&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,5456,&quot;Tree&quot;]]],[4,1,[6,[3,2,[7,5457,&quot;α&quot;]]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,5460,&quot;Tree&quot;]]],[4,1,[6,[3,2,[7,5461,&quot;β&quot;]]]]]]]]]]]]]]]]]]]]]}\">Tree.Tree.mapTR.{u_1, u_2} {α : Type u_1} {β : Type u_2} (f : α → β) (t : Tree α) : Tree β</code>",
 "68":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.166&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;Tree&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]]]]]]]]]]}\">Tree.{u} (α : Type u) : Type u</code>",
 "67":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;10&quot;:{&quot;binding&quot;:&quot;var-_uniq.170&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;1360&quot;:{&quot;binding&quot;:&quot;var-_uniq.166&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;1361&quot;:{&quot;binding&quot;:&quot;var-_uniq.167&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;1398016&quot;:{&quot;binding&quot;:&quot;const-Tree.map&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.166&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;21845&quot;:{&quot;binding&quot;:&quot;var-_uniq.170&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;3&quot;:{&quot;binding&quot;:&quot;var-_uniq.167&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;349457&quot;:{&quot;binding&quot;:&quot;var-_uniq.169&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;5456&quot;:{&quot;binding&quot;:&quot;const-Tree&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5457&quot;:{&quot;binding&quot;:&quot;var-_uniq.166&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;5591296&quot;:{&quot;binding&quot;:&quot;const-Tree.Tree.mapTR&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;87365&quot;:{&quot;binding&quot;:&quot;var-_uniq.170&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;87377&quot;:{&quot;binding&quot;:&quot;var-_uniq.169&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;9&quot;:{&quot;binding&quot;:&quot;var-_uniq.169&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;Tree.Tree.mapTR_eq_map&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u_1&quot;]],[4,&quot;,&quot;,[4,1,[4,[6,[3,2,&quot;u_2&quot;]],&quot;}&quot;]]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u_1&quot;]]]]]],&quot;}&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,3,&quot;β&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u_2&quot;]]]]]],&quot;}&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,9,&quot;f&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,1360,&quot;α&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,1361,&quot;β&quot;]]]]]]]],&quot;)&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,10,&quot;t&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,5456,&quot;Tree&quot;]]],[4,1,[6,[3,2,[7,5457,&quot;α&quot;]]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,5591296,&quot;mapTR&quot;]]],[4,1,[4,[6,[3,2,[7,349457,&quot;f&quot;]]],[4,1,[6,[3,2,[7,87365,&quot;t&quot;]]]]]]]]],[4,[4,&quot; =&quot;,1],[6,[3,2,[4,[6,[3,2,[7,1398016,&quot;map&quot;]]],[4,1,[4,[6,[3,2,[7,87377,&quot;f&quot;]]],[4,1,[6,[3,2,[7,21845,&quot;t&quot;]]]]]]]]]]]]]]]]]]]]]]]]]]]}\">Tree.Tree.mapTR_eq_map.{u_1, u_2} {α : Type u_1} {β : Type u_2} (f : α → β) (t : Tree α) : mapTR f t = map f t</code>",
 "66": "<code>β</code>",
 "65": "<code>Tree.{u} (α : Type u) : Type u</code>",
 "64": "<code>Tree β</code>",
 "63":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;21&quot;:{&quot;binding&quot;:&quot;var-_uniq.612&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-List&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;80&quot;:{&quot;binding&quot;:&quot;const-Tree.Frame&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;81&quot;:{&quot;binding&quot;:&quot;var-_uniq.611&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;List&quot;]]],[4,1,[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,80,&quot;Frame&quot;]]],[4,1,[4,[6,[3,2,[7,81,&quot;α&quot;]]],[4,1,[6,[3,2,[7,21,&quot;β&quot;]]]]]]]]]],&quot;)&quot;]]]]]]]]]}\">List (Frame α β)</code>",
 "62":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;4&quot;:{&quot;binding&quot;:&quot;const-Tree&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;var-_uniq.191&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;Tree&quot;]]],[4,1,[6,[3,2,[7,5,&quot;β&quot;]]]]]]]]}\">Tree β</code>",
 "61":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1360&quot;:{&quot;binding&quot;:&quot;const-Tree&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;1361&quot;:{&quot;binding&quot;:&quot;var-_uniq.5931&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;1364&quot;:{&quot;binding&quot;:&quot;var-_uniq.5931&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.5930&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;21840&quot;:{&quot;binding&quot;:&quot;const-Tree.Frame&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;21841&quot;:{&quot;binding&quot;:&quot;var-_uniq.5930&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;3&quot;:{&quot;binding&quot;:&quot;var-_uniq.5931&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;5461&quot;:{&quot;binding&quot;:&quot;var-_uniq.5931&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;8&quot;:{&quot;binding&quot;:&quot;var-_uniq.5932&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;9&quot;:{&quot;binding&quot;:&quot;var-_uniq.5933&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;Tree.Frame.done&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u&quot;]],[4,&quot;,&quot;,[4,1,[4,[6,[3,2,&quot;v&quot;]],&quot;}&quot;]]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]],&quot;}&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,3,&quot;β&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;v&quot;]]]]]],&quot;}&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,8,&quot;left&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,1360,&quot;Tree&quot;]]],[4,1,[6,[3,2,[7,1361,&quot;β&quot;]]]]]]],&quot;)&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,9,&quot;val&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,1364,&quot;β&quot;]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,21840,&quot;Frame&quot;]]],[4,1,[4,[6,[3,2,[7,21841,&quot;α&quot;]]],[4,1,[6,[3,2,[7,5461,&quot;β&quot;]]]]]]]]]]]]]]]]]]]]]]]}\">Tree.Frame.done.{u, v} {α : Type u} {β : Type v} (left : Tree β) (val : β) : Frame α β</code>",
 "60":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;4&quot;:{&quot;binding&quot;:&quot;var-_uniq.190&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;var-_uniq.191&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;α&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,5,&quot;β&quot;]]]]]]]]]}\">α → β</code>",
 "6":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.1113&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;3&quot;:{&quot;binding&quot;:&quot;var-_uniq.1114&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;336&quot;:{&quot;binding&quot;:&quot;const-Tree&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;337&quot;:{&quot;binding&quot;:&quot;var-_uniq.1113&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;340&quot;:{&quot;binding&quot;:&quot;var-_uniq.1113&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;5456&quot;:{&quot;binding&quot;:&quot;const-Tree&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5457&quot;:{&quot;binding&quot;:&quot;var-_uniq.1113&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;5460&quot;:{&quot;binding&quot;:&quot;const-Tree&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5461&quot;:{&quot;binding&quot;:&quot;var-_uniq.1113&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;8&quot;:{&quot;binding&quot;:&quot;var-_uniq.1115&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;9&quot;:{&quot;binding&quot;:&quot;var-_uniq.1116&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;Tree.node&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]],&quot;}&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,3,&quot;left&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,336,&quot;Tree&quot;]]],[4,1,[6,[3,2,[7,337,&quot;α&quot;]]]]]]],&quot;)&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,8,&quot;a&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,340,&quot;α&quot;]]],&quot;)&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,9,&quot;right&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,5456,&quot;Tree&quot;]]],[4,1,[6,[3,2,[7,5457,&quot;α&quot;]]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,5460,&quot;Tree&quot;]]],[4,1,[6,[3,2,[7,5461,&quot;α&quot;]]]]]]]]]]]]]]]]]]]]]}\">Tree.node.{u} {α : Type u} (left : Tree α) (a : α) (right : Tree α) : Tree α</code>",
 "59":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;4&quot;:{&quot;binding&quot;:&quot;const-Tree&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;var-_uniq.190&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;Tree&quot;]]],[4,1,[6,[3,2,[7,5,&quot;α&quot;]]]]]]]]}\">Tree α</code>",
 "58":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1&quot;:{&quot;binding&quot;:&quot;var-_uniq.191&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[7,1,&quot;β&quot;]]]]}\">β</code>",
 "57":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;21&quot;:{&quot;binding&quot;:&quot;var-_uniq.191&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-List&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;80&quot;:{&quot;binding&quot;:&quot;const-Tree.Frame&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;81&quot;:{&quot;binding&quot;:&quot;var-_uniq.190&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;List&quot;]]],[4,1,[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,80,&quot;Frame&quot;]]],[4,1,[4,[6,[3,2,[7,81,&quot;α&quot;]]],[4,1,[6,[3,2,[7,21,&quot;β&quot;]]]]]]]]]],&quot;)&quot;]]]]]]]]]}\">List (Frame α β)</code>",
 "56":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;4&quot;:{&quot;binding&quot;:&quot;const-Tree&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;var-_uniq.36&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;Tree&quot;]]],[4,1,[6,[3,2,[7,5,&quot;β&quot;]]]]]]]]}\">Tree β</code>",
 "55":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;21&quot;:{&quot;binding&quot;:&quot;var-_uniq.36&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-List&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;80&quot;:{&quot;binding&quot;:&quot;const-Tree.Frame&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;81&quot;:{&quot;binding&quot;:&quot;var-_uniq.30&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;List&quot;]]],[4,1,[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,80,&quot;Frame&quot;]]],[4,1,[4,[6,[3,2,[7,81,&quot;α&quot;]]],[4,1,[6,[3,2,[7,21,&quot;β&quot;]]]]]]]]]],&quot;)&quot;]]]]]]]]]}\">List (Frame α β)</code>",
 "54":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;4&quot;:{&quot;binding&quot;:&quot;var-_uniq.30&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;var-_uniq.36&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;α&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,5,&quot;β&quot;]]]]]]]]]}\">α → β</code>",
 "53":
 "<code class=\"docstring\">The `omega` tactic, for resolving integer and natural linear arithmetic problems.\n\nIt is not yet a full decision procedure (no \"dark\" or \"grey\" shadows),\nbut should be effective on many problems.\n\nWe handle hypotheses of the form `x = y`, `x &lt; y`, `x ≤ y`, and `k ∣ x` for `x y` in `Nat` or `Int`\n(and `k` a literal), along with negations of these statements.\n\nWe decompose the sides of the inequalities as linear combinations of atoms.\n\nIf we encounter `x / k` or `x % k` for literal integers `k` we introduce new auxiliary variables\nand the relevant inequalities.\n\nOn the first pass, we do not perform case splits on natural subtraction.\nIf `omega` fails, we recursively perform a case split on\na natural subtraction appearing in a hypothesis, and try again.\n\nThe options\n```\nomega +splitDisjunctions +splitNatSub +splitNatAbs +splitMinMax\n```\ncan be used to:\n* `splitDisjunctions`: split any disjunctions found in the context,\n  if the problem is not otherwise solvable.\n* `splitNatSub`: for each appearance of `((a - b : Nat) : Int)`, split on `a ≤ b` if necessary.\n* `splitNatAbs`: for each appearance of `Int.natAbs a`, split on `0 ≤ a` if necessary.\n* `splitMinMax`: for each occurrence of `min a b`, split on `min a b = a ∨ min a b = b`\nCurrently, all of these are on by default.\n</code>",
 "52":
 "<code>HAdd.hAdd.{u, v, w} {α : Type u} {β : Type v} {γ : outParam (Type w)} [self : HAdd α β γ] : α → β → γ</code><span class=\"sep\"></span><code class=\"docstring\">`a + b` computes the sum of `a` and `b`.\nThe meaning of this notation is type-dependent. \n\nConventions for notations in identifiers:\n\n * The recommended spelling of `+` in identifiers is `add`.</code>",
 "51":
 "<code>HMul.hMul.{u, v, w} {α : Type u} {β : Type v} {γ : outParam (Type w)} [self : HMul α β γ] : α → β → γ</code><span class=\"sep\"></span><code class=\"docstring\">`a * b` computes the product of `a` and `b`.\nThe meaning of this notation is type-dependent. \n\nConventions for notations in identifiers:\n\n * The recommended spelling of `*` in identifiers is `mul`.</code>",
 "50":
 "<code>LT.lt.{u} {α : Type u} [self : LT α] : α → α → Prop</code><span class=\"sep\"></span><code class=\"docstring\">The less-than relation: `x &lt; y` \n\nConventions for notations in identifiers:\n\n * The recommended spelling of `&lt;` in identifiers is `lt`.</code>",
 "5":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.1113&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;84&quot;:{&quot;binding&quot;:&quot;const-Tree&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;85&quot;:{&quot;binding&quot;:&quot;var-_uniq.1113&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;Tree.leaf&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]],&quot;}&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,84,&quot;Tree&quot;]]],[4,1,[6,[3,2,[7,85,&quot;α&quot;]]]]]]]]]]]]]]]}\">Tree.leaf.{u} {α : Type u} : Tree α</code>",
 "49":
 "<code>Tree.stackWeight.{u_1, u_2} {α : Type u_1} {β : Type u_2} : List (Frame α β) → Nat</code>",
 "48":
 "<code>Tree.Frame.{u, v} (α : Type u) (β : Type v) : Type (max u v)</code>",
 "47":
 "<code>List.{u} (α : Type u) : Type u</code><span class=\"sep\"></span><code class=\"docstring\">Linked lists: ordered lists, in which each element has a reference to the next element.\n\nMost operations on linked lists take time proportional to the length of the list, because each\nelement must be traversed to find the next element.\n\n`List α` is isomorphic to `Array α`, but they are useful for different things:\n* `List α` is easier for reasoning, and `Array α` is modeled as a wrapper around `List α`.\n* `List α` works well as a persistent data structure, when many copies of the tail are shared. When\n  the value is not shared, `Array α` will have better performance because it can do destructive\n  updates.\n</code>",
 "46": "<code>List (Frame α β)</code>",
 "45": "<code>Type u_2</code>",
 "44": "<code>Type u_1</code>",
 "43":
 "<code class=\"docstring\">The `simp` tactic uses lemmas and hypotheses to simplify the main goal target or\nnon-dependent hypotheses. It has many variants:\n- `simp` simplifies the main goal target using lemmas tagged with the attribute `[simp]`.\n- `simp [h₁, h₂, ..., hₙ]` simplifies the main goal target using the lemmas tagged\n  with the attribute `[simp]` and the given `hᵢ`'s, where the `hᵢ`'s are expressions.-\n- If an `hᵢ` is a defined constant `f`, then `f` is unfolded. If `f` has equational lemmas associated\n  with it (and is not a projection or a `reducible` definition), these are used to rewrite with `f`.\n- `simp [*]` simplifies the main goal target using the lemmas tagged with the\n  attribute `[simp]` and all hypotheses.\n- `simp only [h₁, h₂, ..., hₙ]` is like `simp [h₁, h₂, ..., hₙ]` but does not use `[simp]` lemmas.\n- `simp [-id₁, ..., -idₙ]` simplifies the main goal target using the lemmas tagged\n  with the attribute `[simp]`, but removes the ones named `idᵢ`.\n- `simp at h₁ h₂ ... hₙ` simplifies the hypotheses `h₁ : T₁` ... `hₙ : Tₙ`. If\n  the target or another hypothesis depends on `hᵢ`, a new simplified hypothesis\n  `hᵢ` is introduced, but the old one remains in the local context.\n- `simp at *` simplifies all the hypotheses and the target.\n- `simp [*] at *` simplifies target and all (propositional) hypotheses using the\n  other hypotheses.\n</code>",
 "42":
 "<code class=\"docstring\">`all_goals tac` runs `tac` on each goal, concatenating the resulting goals.\nIf the tactic fails on any goal, the entire `all_goals` tactic fails.\n\nSee also `any_goals tac`.\n</code>",
 "41":
 "<code class=\"docstring\">Manually prove that the termination measure (as specified with `termination_by` or inferred)\ndecreases at each recursive call.\n\nBy default, the tactic `decreasing_tactic` is used.\n\nForces the use of well-founded recursion and is hence incompatible with\n`termination_by structural`.\n</code>",
 "40":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;21&quot;:{&quot;binding&quot;:&quot;var-_uniq.450&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-List&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;80&quot;:{&quot;binding&quot;:&quot;const-Tree.Frame&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;81&quot;:{&quot;binding&quot;:&quot;var-_uniq.449&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;List&quot;]]],[4,1,[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,80,&quot;Frame&quot;]]],[4,1,[4,[6,[3,2,[7,81,&quot;α&quot;]]],[4,1,[6,[3,2,[7,21,&quot;β&quot;]]]]]]]]]],&quot;)&quot;]]]]]]]]]}\">List (Frame α β)</code>",
 "4": "<code class=\"docstring\">The universe parameter u</code>",
 "39":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1360&quot;:{&quot;binding&quot;:&quot;const-List&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.5930&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;21776&quot;:{&quot;binding&quot;:&quot;const-Tree.Frame&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;21777&quot;:{&quot;binding&quot;:&quot;var-_uniq.5930&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;3&quot;:{&quot;binding&quot;:&quot;var-_uniq.5931&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;341&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5445&quot;:{&quot;binding&quot;:&quot;var-_uniq.5931&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;Tree.stackWeight&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u_1&quot;]],[4,&quot;,&quot;,[4,1,[4,[6,[3,2,&quot;u_2&quot;]],&quot;}&quot;]]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u_1&quot;]]]]]],&quot;}&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,3,&quot;β&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u_2&quot;]]]]]],&quot;}&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,1360,&quot;List&quot;]]],[4,1,[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,21776,&quot;Frame&quot;]]],[4,1,[4,[6,[3,2,[7,21777,&quot;α&quot;]]],[4,1,[6,[3,2,[7,5445,&quot;β&quot;]]]]]]]]]],&quot;)&quot;]]]]]]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,341,&quot;Nat&quot;]]]]]]]]]]]]]]]]]]}\">Tree.stackWeight.{u_1, u_2} {α : Type u_1} {β : Type u_2} : List (Frame α β) → Nat</code>",
 "38":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.5930&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;336&quot;:{&quot;binding&quot;:&quot;const-Tree&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;337&quot;:{&quot;binding&quot;:&quot;var-_uniq.5930&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;85&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;Tree.size&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u_1&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u_1&quot;]]]]]],&quot;}&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,336,&quot;Tree&quot;]]],[4,1,[6,[3,2,[7,337,&quot;α&quot;]]]]]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,85,&quot;Nat&quot;]]]]]]]]]]]]]]]]}\">Tree.size.{u_1} {α : Type u_1} : Tree α → Nat</code>",
 "37":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;4&quot;:{&quot;binding&quot;:&quot;const-Tree&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;var-_uniq.449&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;Tree&quot;]]],[4,1,[6,[3,2,[7,5,&quot;α&quot;]]]]]]]]}\">Tree α</code>",
 "36": "<code>Nat</code>",
 "35":
 "<code class=\"docstring\">Specify a termination measure for recursive functions.\n```\ntermination_by a - b\n```\nindicates that termination of the currently defined recursive function follows\nbecause the difference between the arguments `a` and `b` decreases.\n\nIf the function takes further argument after the colon, you can name them as follows:\n```\ndef example (a : Nat) : Nat → Nat → Nat :=\ntermination_by b c =&gt; a - b\n```\n\nBy default, a `termination_by` clause will cause the function to be constructed using well-founded\nrecursion. The syntax `termination_by structural a` (or `termination_by structural _ c =&gt; c`)\nindicates the function is expected to be structural recursive on the argument. In this case\nthe body of the `termination_by` clause must be one of the function's parameters.\n\nIf omitted, a termination measure will be inferred. If written as `termination_by?`,\nthe inferred termination measure will be suggested.\n\n</code>",
 "34":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;10&quot;:{&quot;binding&quot;:&quot;var-_uniq.5936&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;11&quot;:{&quot;binding&quot;:&quot;var-_uniq.5937&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;1360&quot;:{&quot;binding&quot;:&quot;var-_uniq.5930&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;1361&quot;:{&quot;binding&quot;:&quot;var-_uniq.5931&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.5930&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;21829&quot;:{&quot;binding&quot;:&quot;var-_uniq.5931&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;21840&quot;:{&quot;binding&quot;:&quot;const-Tree&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;21841&quot;:{&quot;binding&quot;:&quot;var-_uniq.5931&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;21844&quot;:{&quot;binding&quot;:&quot;const-Tree&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;21845&quot;:{&quot;binding&quot;:&quot;var-_uniq.5931&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;3&quot;:{&quot;binding&quot;:&quot;var-_uniq.5931&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;5456&quot;:{&quot;binding&quot;:&quot;const-List&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;87312&quot;:{&quot;binding&quot;:&quot;const-Tree.Frame&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;87313&quot;:{&quot;binding&quot;:&quot;var-_uniq.5930&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;9&quot;:{&quot;binding&quot;:&quot;var-_uniq.5933&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;Tree.Tree.mapBack&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u_1&quot;]],[4,&quot;,&quot;,[4,1,[4,[6,[3,2,&quot;u_2&quot;]],&quot;}&quot;]]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u_1&quot;]]]]]],&quot;}&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,3,&quot;β&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u_2&quot;]]]]]],&quot;}&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,9,&quot;f&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,1360,&quot;α&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,1361,&quot;β&quot;]]]]]]]],&quot;)&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,10,&quot;stack&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,5456,&quot;List&quot;]]],[4,1,[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,87312,&quot;Frame&quot;]]],[4,1,[4,[6,[3,2,[7,87313,&quot;α&quot;]]],[4,1,[6,[3,2,[7,21829,&quot;β&quot;]]]]]]]]]],&quot;)&quot;]]]]]]]],&quot;)&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,11,&quot;result&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,21840,&quot;Tree&quot;]]],[4,1,[6,[3,2,[7,21841,&quot;β&quot;]]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,21844,&quot;Tree&quot;]]],[4,1,[6,[3,2,[7,21845,&quot;β&quot;]]]]]]]]]]]]]]]]]]]]]]]}\">Tree.Tree.mapBack.{u_1, u_2} {α : Type u_1} {β : Type u_2} (f : α → β) (stack : List (Frame α β)) (result : Tree β) :\n  Tree β</code>",
 "33":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.5930&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;84&quot;:{&quot;binding&quot;:&quot;const-Tree&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;85&quot;:{&quot;binding&quot;:&quot;var-_uniq.5930&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;Tree.leaf&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]],&quot;}&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,84,&quot;Tree&quot;]]],[4,1,[6,[3,2,[7,85,&quot;α&quot;]]]]]]]]]]]]]]]}\">Tree.leaf.{u} {α : Type u} : Tree α</code>",
 "32":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;21&quot;:{&quot;binding&quot;:&quot;var-_uniq.54&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-List&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;80&quot;:{&quot;binding&quot;:&quot;const-Tree.Frame&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;81&quot;:{&quot;binding&quot;:&quot;var-_uniq.53&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;List&quot;]]],[4,1,[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,80,&quot;Frame&quot;]]],[4,1,[4,[6,[3,2,[7,81,&quot;α&quot;]]],[4,1,[6,[3,2,[7,21,&quot;β&quot;]]]]]]]]]],&quot;)&quot;]]]]]]]]]}\">List (Frame α β)</code>",
 "31":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.5930&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;21840&quot;:{&quot;binding&quot;:&quot;const-Tree.Frame&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;21841&quot;:{&quot;binding&quot;:&quot;var-_uniq.5930&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;3&quot;:{&quot;binding&quot;:&quot;var-_uniq.5931&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;340&quot;:{&quot;binding&quot;:&quot;var-_uniq.5931&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;5456&quot;:{&quot;binding&quot;:&quot;const-Tree&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5457&quot;:{&quot;binding&quot;:&quot;var-_uniq.5930&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;5461&quot;:{&quot;binding&quot;:&quot;var-_uniq.5931&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;8&quot;:{&quot;binding&quot;:&quot;var-_uniq.5932&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;9&quot;:{&quot;binding&quot;:&quot;var-_uniq.5933&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;Tree.Frame.visit&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u&quot;]],[4,&quot;,&quot;,[4,1,[4,[6,[3,2,&quot;v&quot;]],&quot;}&quot;]]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]],&quot;}&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,3,&quot;β&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;v&quot;]]]]]],&quot;}&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,8,&quot;val&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,340,&quot;β&quot;]]],&quot;)&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,9,&quot;right&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,5456,&quot;Tree&quot;]]],[4,1,[6,[3,2,[7,5457,&quot;α&quot;]]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,21840,&quot;Frame&quot;]]],[4,1,[4,[6,[3,2,[7,21841,&quot;α&quot;]]],[4,1,[6,[3,2,[7,5461,&quot;β&quot;]]]]]]]]]]]]]]]]]]]]]]]}\">Tree.Frame.visit.{u, v} {α : Type u} {β : Type v} (val : β) (right : Tree α) : Frame α β</code>",
 "30":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;4&quot;:{&quot;binding&quot;:&quot;var-_uniq.53&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;var-_uniq.54&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;α&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,5,&quot;β&quot;]]]]]]]]]}\">α → β</code>",
 "3":
 "<code class=\"docstring\">A type universe. `Type ≡ Type 0`, `Type u ≡ Sort (u + 1)`. </code>",
 "29":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1&quot;:{&quot;binding&quot;:&quot;var-_uniq.53&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[7,1,&quot;α&quot;]]]]}\">α</code>",
 "28":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.5930&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;3&quot;:{&quot;binding&quot;:&quot;var-_uniq.5931&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;336&quot;:{&quot;binding&quot;:&quot;const-Tree&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;337&quot;:{&quot;binding&quot;:&quot;var-_uniq.5930&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;340&quot;:{&quot;binding&quot;:&quot;var-_uniq.5930&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;5456&quot;:{&quot;binding&quot;:&quot;const-Tree&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5457&quot;:{&quot;binding&quot;:&quot;var-_uniq.5930&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;5460&quot;:{&quot;binding&quot;:&quot;const-Tree&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5461&quot;:{&quot;binding&quot;:&quot;var-_uniq.5930&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;8&quot;:{&quot;binding&quot;:&quot;var-_uniq.5932&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;9&quot;:{&quot;binding&quot;:&quot;var-_uniq.5933&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;Tree.node&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]],&quot;}&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,3,&quot;left&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,336,&quot;Tree&quot;]]],[4,1,[6,[3,2,[7,337,&quot;α&quot;]]]]]]],&quot;)&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,8,&quot;a&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,340,&quot;α&quot;]]],&quot;)&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,9,&quot;right&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,5456,&quot;Tree&quot;]]],[4,1,[6,[3,2,[7,5457,&quot;α&quot;]]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,5460,&quot;Tree&quot;]]],[4,1,[6,[3,2,[7,5461,&quot;α&quot;]]]]]]]]]]]]]]]]]]]]]}\">Tree.node.{u} {α : Type u} (left : Tree α) (a : α) (right : Tree α) : Tree α</code>",
 "27":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;4&quot;:{&quot;binding&quot;:&quot;const-Tree&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;var-_uniq.53&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;Tree&quot;]]],[4,1,[6,[3,2,[7,5,&quot;α&quot;]]]]]]]]}\">Tree α</code>",
 "26":
 "<code class=\"docstring\">Pattern matching. `match e, ... with | p, ... =&gt; f | ...` matches each given\nterm `e` against each pattern `p` of a match alternative. When all patterns\nof an alternative match, the `match` term evaluates to the value of the\ncorresponding right-hand side `f` with the pattern variables bound to the\nrespective matched values.\nIf used as `match h : e, ... with | p, ... =&gt; f | ...`, `h : e = p` is available\nwithin `f`.\n\nWhen not constructing a proof, `match` does not automatically substitute variables\nmatched on in dependent variables' types. Use `match (generalizing := true) ...` to\nenforce this.\n\nSyntax quotations can also be used in a pattern match.\nThis matches a `Syntax` value against quotations, pattern variables, or `_`.\n\nQuoted identifiers only match identical identifiers - custom matching such as by the preresolved\nnames only should be done explicitly.\n\n`Syntax.atom`s are ignored during matching by default except when part of a built-in literal.\nFor users introducing new atoms, we recommend wrapping them in dedicated syntax kinds if they\nshould participate in matching.\nFor example, in\n```lean\nsyntax \"c\" (\"foo\" &lt;|&gt; \"bar\") ...\n```\n`foo` and `bar` are indistinguishable during matching, but in\n```lean\nsyntax foo := \"foo\"\nsyntax \"c\" (foo &lt;|&gt; \"bar\") ...\n```\nthey are not.\n</code>",
 "25":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.4303&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;Tree&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]]]]]]]]]]}\">Tree.{u} (α : Type u) : Type u</code>",
 "24":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;4&quot;:{&quot;binding&quot;:&quot;const-Tree&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;var-_uniq.5&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;Tree&quot;]]],[4,1,[6,[3,2,[7,5,&quot;α&quot;]]]]]]]]}\">Tree α</code>",
 "23":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.4303&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;3&quot;:{&quot;binding&quot;:&quot;var-_uniq.4304&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;Tree.Frame&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u&quot;]],[4,&quot;,&quot;,[4,1,[4,[6,[3,2,&quot;v&quot;]],&quot;}&quot;]]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]],&quot;)&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,3,&quot;β&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;v&quot;]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,[4,&quot;(&quot;,[4,[6,[3,2,[4,&quot;max&quot;,[4,1,[4,[6,[3,2,&quot;u&quot;]],[4,1,[6,[3,2,&quot;v&quot;]]]]]]]],&quot;)&quot;]]]]]]]]]]]]]]]]]]}\">Tree.Frame.{u, v} (α : Type u) (β : Type v) : Type (max u v)</code>",
 "22":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.4303&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;List&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]]]]]]]]]]}\">List.{u} (α : Type u) : Type u</code><span class=\"sep\"></span><code class=\"docstring\">Linked lists: ordered lists, in which each element has a reference to the next element.\n\nMost operations on linked lists take time proportional to the length of the list, because each\nelement must be traversed to find the next element.\n\n`List α` is isomorphic to `Array α`, but they are useful for different things:\n* `List α` is easier for reasoning, and `Array α` is modeled as a wrapper around `List α`.\n* `List α` works well as a persistent data structure, when many copies of the tail are shared. When\n  the value is not shared, `Array α` will have better performance because it can do destructive\n  updates.\n</code>",
 "21":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;21&quot;:{&quot;binding&quot;:&quot;var-_uniq.11&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-List&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;80&quot;:{&quot;binding&quot;:&quot;const-Tree.Frame&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;81&quot;:{&quot;binding&quot;:&quot;var-_uniq.5&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;List&quot;]]],[4,1,[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,80,&quot;Frame&quot;]]],[4,1,[4,[6,[3,2,[7,81,&quot;α&quot;]]],[4,1,[6,[3,2,[7,21,&quot;β&quot;]]]]]]]]]],&quot;)&quot;]]]]]]]]]}\">List (Frame α β)</code>",
 "20":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;4&quot;:{&quot;binding&quot;:&quot;var-_uniq.5&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;var-_uniq.11&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;α&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,5,&quot;β&quot;]]]]]]]]]}\">α → β</code>",
 "2":
 "<code data-rich-format=\"{&quot;annotations&quot;:{},&quot;fmt&quot;:[6,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]]]}\">Type u</code>",
 "19":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;10&quot;:{&quot;binding&quot;:&quot;var-_uniq.4309&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;11&quot;:{&quot;binding&quot;:&quot;var-_uniq.4310&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;1360&quot;:{&quot;binding&quot;:&quot;var-_uniq.4303&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;1361&quot;:{&quot;binding&quot;:&quot;var-_uniq.4304&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.4303&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;21829&quot;:{&quot;binding&quot;:&quot;var-_uniq.4304&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;21840&quot;:{&quot;binding&quot;:&quot;const-Tree&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;21841&quot;:{&quot;binding&quot;:&quot;var-_uniq.4303&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;21844&quot;:{&quot;binding&quot;:&quot;const-Tree&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;21845&quot;:{&quot;binding&quot;:&quot;var-_uniq.4304&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;3&quot;:{&quot;binding&quot;:&quot;var-_uniq.4304&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;5456&quot;:{&quot;binding&quot;:&quot;const-List&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;87312&quot;:{&quot;binding&quot;:&quot;const-Tree.Frame&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;87313&quot;:{&quot;binding&quot;:&quot;var-_uniq.4303&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;9&quot;:{&quot;binding&quot;:&quot;var-_uniq.4306&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;Tree.Tree.mapGo&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u_1&quot;]],[4,&quot;,&quot;,[4,1,[4,[6,[3,2,&quot;u_2&quot;]],&quot;}&quot;]]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u_1&quot;]]]]]],&quot;}&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,3,&quot;β&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u_2&quot;]]]]]],&quot;}&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,9,&quot;f&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,1360,&quot;α&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,1361,&quot;β&quot;]]]]]]]],&quot;)&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,10,&quot;stack&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,5456,&quot;List&quot;]]],[4,1,[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,87312,&quot;Frame&quot;]]],[4,1,[4,[6,[3,2,[7,87313,&quot;α&quot;]]],[4,1,[6,[3,2,[7,21829,&quot;β&quot;]]]]]]]]]],&quot;)&quot;]]]]]]]],&quot;)&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,11,&quot;t&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,21840,&quot;Tree&quot;]]],[4,1,[6,[3,2,[7,21841,&quot;α&quot;]]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,21844,&quot;Tree&quot;]]],[4,1,[6,[3,2,[7,21845,&quot;β&quot;]]]]]]]]]]]]]]]]]]]]]]]}\">Tree.Tree.mapGo.{u_1, u_2} {α : Type u_1} {β : Type u_2} (f : α → β) (stack : List (Frame α β)) (t : Tree α) : Tree β</code>",
 "18":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;4&quot;:{&quot;binding&quot;:&quot;var-_uniq.1138&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;var-_uniq.1139&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;α&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,5,&quot;β&quot;]]]]]]]]]}\">α → β</code>",
 "17":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1&quot;:{&quot;binding&quot;:&quot;var-_uniq.1138&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[7,1,&quot;α&quot;]]]]}\">α</code>",
 "16":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;4&quot;:{&quot;binding&quot;:&quot;const-Tree&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;var-_uniq.1138&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;Tree&quot;]]],[4,1,[6,[3,2,[7,5,&quot;α&quot;]]]]]]]]}\">Tree α</code>",
 "15":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.1558&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;3&quot;:{&quot;binding&quot;:&quot;var-_uniq.1559&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;336&quot;:{&quot;binding&quot;:&quot;const-Tree&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;337&quot;:{&quot;binding&quot;:&quot;var-_uniq.1558&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;340&quot;:{&quot;binding&quot;:&quot;var-_uniq.1558&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;5456&quot;:{&quot;binding&quot;:&quot;const-Tree&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5457&quot;:{&quot;binding&quot;:&quot;var-_uniq.1558&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;5460&quot;:{&quot;binding&quot;:&quot;const-Tree&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5461&quot;:{&quot;binding&quot;:&quot;var-_uniq.1558&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;8&quot;:{&quot;binding&quot;:&quot;var-_uniq.1560&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;9&quot;:{&quot;binding&quot;:&quot;var-_uniq.1561&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;Tree.node&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]],&quot;}&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,3,&quot;left&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,336,&quot;Tree&quot;]]],[4,1,[6,[3,2,[7,337,&quot;α&quot;]]]]]]],&quot;)&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,8,&quot;a&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,340,&quot;α&quot;]]],&quot;)&quot;]]]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,9,&quot;right&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,[6,[3,2,[7,5456,&quot;Tree&quot;]]],[4,1,[6,[3,2,[7,5457,&quot;α&quot;]]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,5460,&quot;Tree&quot;]]],[4,1,[6,[3,2,[7,5461,&quot;α&quot;]]]]]]]]]]]]]]]]]]]]]}\">Tree.node.{u} {α : Type u} (left : Tree α) (a : α) (right : Tree α) : Tree α</code>",
 "14":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.1558&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;84&quot;:{&quot;binding&quot;:&quot;const-Tree&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;85&quot;:{&quot;binding&quot;:&quot;var-_uniq.1558&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;Tree.leaf&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]],&quot;}&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,84,&quot;Tree&quot;]]],[4,1,[6,[3,2,[7,85,&quot;α&quot;]]]]]]]]]]]]]]]}\">Tree.leaf.{u} {α : Type u} : Tree α</code>",
 "13":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.1352&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;Tree&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]]]]]]]]]]}\">Tree.{u} (α : Type u) : Type u</code>",
 "12":
 "<code data-rich-format=\"{&quot;annotations&quot;:{},&quot;fmt&quot;:[6,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u_2&quot;]]]]]]]}\">Type u_2</code>",
 "11":
 "<code data-rich-format=\"{&quot;annotations&quot;:{},&quot;fmt&quot;:[6,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u_1&quot;]]]]]]]}\">Type u_1</code>",
 "10":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;4&quot;:{&quot;binding&quot;:&quot;var-_uniq.1117&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;var-_uniq.1123&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;α&quot;]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[7,5,&quot;β&quot;]]]]]]]]]}\">α → β</code>",
 "1":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.1113&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,&quot;Tree&quot;]],[4,&quot;.{&quot;,[4,[6,[3,2,&quot;u&quot;]],&quot;}&quot;]]]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;α&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,&quot;Type&quot;,[4,1,[6,[3,2,&quot;u&quot;]]]]]]]]]]]]]]}\">Tree.{u} (α : Type u) : Type u</code>",
 "0":
 "<code class=\"docstring\">In Lean, every concrete type other than the universes\nand every type constructor other than dependent arrows\nis an instance of a general family of type constructions known as inductive types.\nIt is remarkable that it is possible to construct a substantial edifice of mathematics\nbased on nothing more than the type universes, dependent arrow types, and inductive types;\neverything else follows from those.\nIntuitively, an inductive type is built up from a specified list of constructors.\nFor example, `List α` is the list of elements of type `α`, and is defined as follows:\n```\ninductive List (α : Type u) where\n| nil\n| cons (head : α) (tail : List α)\n```\nA list of elements of type `α` is either the empty list, `nil`,\nor an element `head : α` followed by a list `tail : List α`.\nSee [Inductive types](https://lean-lang.org/theorem_proving_in_lean4/inductive_types.html)\nfor more information.\n</code>"};

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
