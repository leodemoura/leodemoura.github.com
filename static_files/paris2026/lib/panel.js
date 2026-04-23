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
        docsJson = {"9": "<code>odd (n : Nat) : Prop</code>",
 "8":
 "<code>Nat : Type</code><span class=\"sep\"></span><code class=\"docstring\">The natural numbers, starting at zero.\n\nThis type is special-cased by both the kernel and the compiler, and overridden with an efficient\nimplementation. Both use a fast arbitrary-precision arithmetic library (usually\n[GMP](https://gmplib.org/)); at runtime, `Nat` values that are sufficiently small are unboxed.\n</code>",
 "7":
 "<code class=\"docstring\">`by tac` constructs a term of the expected type by running the tactic(s) `tac`. </code>",
 "6":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.1676&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;20&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;21&quot;:{&quot;binding&quot;:&quot;sort-14430969920833713138&quot;,&quot;cssClass&quot;:&quot;sort&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-odd&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;odd&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;n&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,20,&quot;Nat&quot;]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,21,&quot;Prop&quot;]]]]]]]]]]]}\">odd (n : Nat) : Prop</code>",
 "5":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1365&quot;:{&quot;binding&quot;:&quot;var-_uniq.1676&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.1676&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;20&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;336&quot;:{&quot;binding&quot;:&quot;const-odd&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;337&quot;:{&quot;binding&quot;:&quot;var-_uniq.1676&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;340&quot;:{&quot;binding&quot;:&quot;const-odd&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-square_of_odd_is_odd&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5457&quot;:{&quot;binding&quot;:&quot;var-_uniq.1676&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;square_of_odd_is_odd&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;n&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,20,&quot;Nat&quot;]]],&quot;}&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,336,&quot;odd&quot;]]],[4,1,[6,[3,2,[7,337,&quot;n&quot;]]]]]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,340,&quot;odd&quot;]]],[4,1,[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,5457,&quot;n&quot;]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[7,1365,&quot;n&quot;]]]]]]]],&quot;)&quot;]]]]]]]]]]]]]]]]]]]]]}\">square_of_odd_is_odd {n : Nat} : odd n → odd (n * n)</code>",
 "4": "<code>Nat</code>",
 "3":
 "<code class=\"docstring\">The universe of propositions. `Prop ≡ Sort 0`.\n\nEvery proposition is propositionally equal to either `True` or `False`. </code>",
 "22":
 "<code class=\"docstring\">`decide` attempts to prove the main goal (with target type `p`) by synthesizing an instance of `Decidable p`\nand then reducing that instance to evaluate the truth value of `p`.\nIf it reduces to `isTrue h`, then `h` is a proof of `p` that closes the goal.\n\nThe target is not allowed to contain local variables or metavariables.\nIf there are local variables, you can first try using the `revert` tactic with these local variables to move them into the target,\nor you can use the `+revert` option, described below.\n\nOptions:\n- `decide +revert` begins by reverting local variables that the target depends on,\n  after cleaning up the local context of irrelevant variables.\n  A variable is *relevant* if it appears in the target, if it appears in a relevant variable,\n  or if it is a proposition that refers to a relevant variable.\n- `decide +kernel` uses kernel for reduction instead of the elaborator.\n  It has two key properties: (1) since it uses the kernel, it ignores transparency and can unfold everything,\n  and (2) it reduces the `Decidable` instance only once instead of twice.\n- `decide +native` uses the native code compiler (`#eval`) to evaluate the `Decidable` instance,\n  admitting the result via an axiom. This can be significantly more efficient than using reduction, but it is at the cost of increasing the size\n  This can be significantly more efficient than using reduction, but it is at the cost of increasing the size\n  of the trusted code base.\n  Namely, it depends on the correctness of the Lean compiler and all definitions with an `@[implemented_by]` attribute.\n  Like with `+kernel`, the `Decidable` instance is evaluated only once.\n\nLimitation: In the default mode or `+kernel` mode, since `decide` uses reduction to evaluate the term,\n`Decidable` instances defined by well-founded recursion might not work because evaluating them requires reducing proofs.\nReduction can also get stuck on `Decidable` instances with `Eq.rec` terms.\nThese can appear in instances defined using tactics (such as `rw` and `simp`).\nTo avoid this, create such instances using definitions such as `decidable_of_iff` instead.\n\n## Examples\n\nProving inequalities:\n```lean\nexample : 2 + 2 ≠ 5 := by decide\n```\n\nTrying to prove a false proposition:\n```lean\nexample : 1 ≠ 1 := by decide\n/-\ntactic 'decide' proved that the proposition\n  1 ≠ 1\nis false\n-/\n```\n\nTrying to prove a proposition whose `Decidable` instance fails to reduce\n```lean\nopaque unknownProp : Prop\n\nopen scoped Classical in\nexample : unknownProp := by decide\n/-\ntactic 'decide' failed for proposition\n  unknownProp\nsince its 'Decidable' instance reduced to\n  Classical.choice ⋯\nrather than to the 'isTrue' constructor.\n-/\n```\n\n## Properties and relations\n\nFor equality goals for types with decidable equality, usually `rfl` can be used in place of `decide`.\n```lean\nexample : 1 + 1 = 2 := by decide\nexample : 1 + 1 = 2 := by rfl\n```\n</code>",
 "21":
 "<code>Exists.intro.{u} {α : Sort u} {p : α → Prop} (w : α) (h : p w) : Exists p</code><span class=\"sep\"></span><code class=\"docstring\">Existential introduction. If `a : α` and `h : p a`,\nthen `⟨a, h⟩` is a proof that `∃ x : α, p x`. </code>",
 "20":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.39&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;20&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;21&quot;:{&quot;binding&quot;:&quot;sort-14430969920833713138&quot;,&quot;cssClass&quot;:&quot;sort&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-odd&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;odd&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;n&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,20,&quot;Nat&quot;]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,21,&quot;Prop&quot;]]]]]]]]]]]}\">odd (n : Nat) : Prop</code>",
 "2":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;4&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;sort-7243200735919010059&quot;,&quot;cssClass&quot;:&quot;sort&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;Nat&quot;]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,5,&quot;Type&quot;]]]]]]]]]}\">Nat : Type</code><span class=\"sep\"></span><code class=\"docstring\">The natural numbers, starting at zero.\n\nThis type is special-cased by both the kernel and the compiler, and overridden with an efficient\nimplementation. Both use a fast arbitrary-precision arithmetic library (usually\n[GMP](https://gmplib.org/)); at runtime, `Nat` values that are sufficiently small are unboxed.\n</code>",
 "19":
 "<code class=\"docstring\">`lia` solves linear integer arithmetic goals.\n\nIt is a implemented as a thin wrapper around the `grind` tactic, enabling only the `lia` solver.\nPlease use `grind` instead if you need additional capabilities.\n</code>",
 "18":
 "<code class=\"docstring\">`exists e₁, e₂, ...` is shorthand for `refine ⟨e₁, e₂, ...⟩; try trivial`.\nIt is useful for existential goals.\n</code>",
 "17":
 "<code>Exists.{u} {α : Sort u} (p : α → Prop) : Prop</code><span class=\"sep\"></span><code class=\"docstring\">Existential quantification. If `p : α → Prop` is a predicate, then `∃ x : α, p x`\nasserts that there is some `x` of type `α` such that `p x` holds.\nTo create an existential proof, use the `exists` tactic,\nor the anonymous constructor notation `⟨x, h⟩`.\nTo unpack an existential, use `cases h` where `h` is a proof of `∃ x : α, p x`,\nor `let ⟨x, hx⟩ := h` where `.\n\nBecause Lean has proof irrelevance, any two proofs of an existential are\ndefinitionally equal. One consequence of this is that it is impossible to recover the\nwitness of an existential from the mere fact of its existence.\nFor example, the following does not compile:\n```\nexample (h : ∃ x : Nat, x = x) : Nat :=\n  let ⟨x, _⟩ := h  -- fail, because the goal is `Nat : Type`\n  x\n```\nThe error message `recursor 'Exists.casesOn' can only eliminate into Prop` means\nthat this only works when the current goal is another proposition:\n```\nexample (h : ∃ x : Nat, x = x) : True :=\n  let ⟨x, _⟩ := h  -- ok, because the goal is `True : Prop`\n  trivial\n```\n</code>",
 "16":
 "<code class=\"docstring\">The `simp` tactic uses lemmas and hypotheses to simplify the main goal target or\nnon-dependent hypotheses. It has many variants:\n- `simp` simplifies the main goal target using lemmas tagged with the attribute `[simp]`.\n- `simp [h₁, h₂, ..., hₙ]` simplifies the main goal target using the lemmas tagged\n  with the attribute `[simp]` and the given `hᵢ`'s, where the `hᵢ`'s are expressions.-\n- If an `hᵢ` is a defined constant `f`, then `f` is unfolded. If `f` has equational lemmas associated\n  with it (and is not a projection or a `reducible` definition), these are used to rewrite with `f`.\n- `simp [*]` simplifies the main goal target using the lemmas tagged with the\n  attribute `[simp]` and all hypotheses.\n- `simp only [h₁, h₂, ..., hₙ]` is like `simp [h₁, h₂, ..., hₙ]` but does not use `[simp]` lemmas.\n- `simp [-id₁, ..., -idₙ]` simplifies the main goal target using the lemmas tagged\n  with the attribute `[simp]`, but removes the ones named `idᵢ`.\n- `simp at h₁ h₂ ... hₙ` simplifies the hypotheses `h₁ : T₁` ... `hₙ : Tₙ`. If\n  the target or another hypothesis depends on `hᵢ`, a new simplified hypothesis\n  `hᵢ` is introduced, but the old one remains in the local context.\n- `simp at *` simplifies all the hypotheses and the target.\n- `simp [*] at *` simplifies target and all (propositional) hypotheses using the\n  other hypotheses.\n</code>",
 "15":
 "<code>HAdd.hAdd.{u, v, w} {α : Type u} {β : Type v} {γ : outParam (Type w)} [self : HAdd α β γ] : α → β → γ</code><span class=\"sep\"></span><code class=\"docstring\">`a + b` computes the sum of `a` and `b`.\nThe meaning of this notation is type-dependent. \n\nConventions for notations in identifiers:\n\n * The recommended spelling of `+` in identifiers is `add`.</code>",
 "14":
 "<code>Eq.{u_1} {α : Sort u_1} : α → α → Prop</code><span class=\"sep\"></span><code class=\"docstring\">The equality relation. It has one introduction rule, `Eq.refl`.\nWe use `a = b` as notation for `Eq a b`.\nA fundamental property of equality is that it is an equivalence relation.\n```\nvariable (α : Type) (a b c d : α)\nvariable (hab : a = b) (hcb : c = b) (hcd : c = d)\n\nexample : a = d :=\n  Eq.trans (Eq.trans hab (Eq.symm hcb)) hcd\n```\nEquality is much more than an equivalence relation, however. It has the important property that every assertion\nrespects the equivalence, in the sense that we can substitute equal expressions without changing the truth value.\nThat is, given `h1 : a = b` and `h2 : p a`, we can construct a proof for `p b` using substitution: `Eq.subst h1 h2`.\nExample:\n```\nexample (α : Type) (a b : α) (p : α → Prop)\n        (h1 : a = b) (h2 : p a) : p b :=\n  Eq.subst h1 h2\n\nexample (α : Type) (a b : α) (p : α → Prop)\n    (h1 : a = b) (h2 : p a) : p b :=\n  h1 ▸ h2\n```\nThe triangle in the second presentation is a macro built on top of `Eq.subst` and `Eq.symm`, and you can enter it by typing `\\t`.\nFor more information: [Equality](https://lean-lang.org/theorem_proving_in_lean4/quantifiers_and_equality.html#equality)\n\n\nConventions for notations in identifiers:\n\n * The recommended spelling of `=` in identifiers is `eq`.</code>",
 "13": "<code>n = 2 * k₁ + 1</code>",
 "12":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;17&quot;:{&quot;binding&quot;:&quot;var-_uniq.182&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;325&quot;:{&quot;binding&quot;:&quot;var-_uniq.211&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,17,&quot;n&quot;]]],[4,[4,&quot; =&quot;,1],[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,1297,&quot;2&quot;]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[7,325,&quot;k₁&quot;]]]]]]],[4,[4,&quot; +&quot;,1],[6,[3,2,[7,21,&quot;1&quot;]]]]]]]]]]]]}\">n = 2 * k₁ + 1</code>",
 "11":
 "<code class=\"docstring\">Introduces one or more hypotheses, optionally naming and/or pattern-matching them.\nFor each hypothesis to be introduced, the remaining main goal's target type must\nbe a `let` or function type.\n\n* `intro` by itself introduces one anonymous hypothesis, which can be accessed\n  by e.g. `assumption`. It is equivalent to `intro _`.\n* `intro x y` introduces two hypotheses and names them. Individual hypotheses\n  can be anonymized via `_`, given a type ascription, or matched against a pattern:\n  ```lean\n  -- ... ⊢ α × β → ...\n  intro (a, b)\n  -- ..., a : α, b : β ⊢ ...\n  ```\n* `intro rfl` is short for `intro h; subst h`, if `h` is an equality where the left-hand or right-hand side\n  is a variable.\n* Alternatively, `intro` can be combined with pattern matching much like `fun`:\n  ```lean\n  intro\n  | n + 1, 0 =&gt; tac\n  | ...\n  ```\n</code>",
 "10":
 "<code>HMul.hMul.{u, v, w} {α : Type u} {β : Type v} {γ : outParam (Type w)} [self : HMul α β γ] : α → β → γ</code><span class=\"sep\"></span><code class=\"docstring\">`a * b` computes the product of `a` and `b`.\nThe meaning of this notation is type-dependent. \n\nConventions for notations in identifiers:\n\n * The recommended spelling of `*` in identifiers is `mul`.</code>",
 "1":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[7,1,&quot;Nat&quot;]]]]}\">Nat</code>",
 "0":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.138&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;20&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;21&quot;:{&quot;binding&quot;:&quot;sort-14430969920833713138&quot;,&quot;cssClass&quot;:&quot;sort&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-odd&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;odd&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;n&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,20,&quot;Nat&quot;]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,21,&quot;Prop&quot;]]]]]]]]]]]}\">odd (n : Nat) : Prop</code>"};

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
