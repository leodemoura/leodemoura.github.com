
window.addEventListener('load', () => {

    // Don't show hovers inside of closed tactic states
    function blockedByTactic(elem) {
      let parent = elem.parentNode;
      while (parent && "classList" in parent) {
        if (parent.classList.contains("tactic")) {
          const toggle = parent.querySelector("input.tactic-toggle");
          if (toggle) {
            return !toggle.checked;
          }
        }
        parent = parent.parentNode;
      }
      return false;
    }

    // Track whether any tippy is visible (O(1) check instead of DOM scan)
    let visibleTippyCount = 0;
    function blockedByTippy(elem) {
      return visibleTippyCount > 0;
    }

    // Binding highlights via event delegation with cached lookups
    const bindingCache = new Map(); // context+binding -> [token elements]
    let highlightedTokens = [];
    function getBindingTokens(context, binding) {
      const key = context + "\0" + binding;
      let tokens = bindingCache.get(key);
      if (!tokens) {
        tokens = [];
        for (const example of document.querySelectorAll(".hl.lean")) {
          if (example.dataset.leanContext == context) {
            for (const tok of example.querySelectorAll(".token[data-binding=\"" + CSS.escape(binding) + "\"]")) {
              tokens.push(tok);
            }
          }
        }
        bindingCache.set(key, tokens);
      }
      return tokens;
    }
    for (const container of document.querySelectorAll(".hl.lean")) {
      container.addEventListener("mouseover", (event) => {
        const c = event.target.closest(".token");
        if (!c || !c.dataset.binding || c.dataset.binding === "" || !container.contains(c)) return;
        if (blockedByTactic(c)) return;
        const tokens = getBindingTokens(container.dataset.leanContext, c.dataset.binding);
        for (const tok of tokens) {
          tok.classList.add("binding-hl");
        }
        highlightedTokens = tokens;
      });
      container.addEventListener("mouseout", (event) => {
        const c = event.target.closest(".token");
        if (!c || !container.contains(c)) return;
        for (const tok of highlightedTokens) {
          tok.classList.remove("binding-hl");
        }
        highlightedTokens = [];
      });
    }
    /* Render docstrings */
    if ('undefined' !== typeof marked) {
        for (const d of document.querySelectorAll("code.docstring, pre.docstring")) {
            const str = d.innerText;
            const html = marked.parse(str);
            const rendered = document.createElement("div");
            rendered.classList.add("docstring");
            rendered.innerHTML = html;
            d.parentNode.replaceChild(rendered, d);
        }
    }
    // Add hovers
    let docsJson = "-verso-docs.json";
    Promise.resolve({"9": "<code>odd (n : Nat) : Prop</code>",
 "8":
 "<code>Nat : Type</code><span class=\"sep\"></span><code class=\"docstring\">The natural numbers, starting at zero.\n\nThis type is special-cased by both the kernel and the compiler, and overridden with an efficient\nimplementation. Both use a fast arbitrary-precision arithmetic library (usually\n[GMP](https://gmplib.org/)); at runtime, `Nat` values that are sufficiently small are unboxed.\n</code>",
 "7":
 "<code class=\"docstring\">`by tac` constructs a term of the expected type by running the tactic(s) `tac`. </code>",
 "6":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.1676&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;20&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;21&quot;:{&quot;binding&quot;:&quot;sort-14430969920833713138&quot;,&quot;cssClass&quot;:&quot;sort&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-odd&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;odd&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;n&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,20,&quot;Nat&quot;]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,21,&quot;Prop&quot;]]]]]]]]]]]}\">odd (n : Nat) : Prop</code>",
 "5":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1365&quot;:{&quot;binding&quot;:&quot;var-_uniq.1676&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.1676&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;20&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;336&quot;:{&quot;binding&quot;:&quot;const-odd&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;337&quot;:{&quot;binding&quot;:&quot;var-_uniq.1676&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;340&quot;:{&quot;binding&quot;:&quot;const-odd&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-square_of_odd_is_odd&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5457&quot;:{&quot;binding&quot;:&quot;var-_uniq.1676&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;square_of_odd_is_odd&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;n&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,20,&quot;Nat&quot;]]],&quot;}&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,336,&quot;odd&quot;]]],[4,1,[6,[3,2,[7,337,&quot;n&quot;]]]]]]],[4,&quot; →&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,340,&quot;odd&quot;]]],[4,1,[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,5457,&quot;n&quot;]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[7,1365,&quot;n&quot;]]]]]]]],&quot;)&quot;]]]]]]]]]]]]]]]]]]]]]}\">square_of_odd_is_odd {n : Nat} : odd n → odd (n * n)</code>",
 "47": "<code>Solution.large : Nat</code>",
 "46":
 "<code>LT.lt.{u} {α : Type u} [self : LT α] : α → α → Prop</code><span class=\"sep\"></span><code class=\"docstring\">The less-than relation: `x &lt; y` \n\nConventions for notations in identifiers:\n\n * The recommended spelling of `&lt;` in identifiers is `lt`.</code>",
 "45":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;21&quot;:{&quot;binding&quot;:&quot;const-Solution.large&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-Solution.large_lt&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;Solution.large_lt&quot;]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,81,&quot;37&quot;]]],[4,[4,&quot; <&quot;,1],[6,[3,2,[7,21,&quot;large&quot;]]]]]]]]]]]]]}\">Solution.large_lt : 37 &lt; large</code>",
 "44":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;4&quot;:{&quot;binding&quot;:&quot;const-Solution.large&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;Solution.large&quot;]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,5,&quot;Nat&quot;]]]]]]]]]}\">Solution.large : Nat</code>",
 "43":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;21&quot;:{&quot;binding&quot;:&quot;const-large&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-large_lt&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;large_lt&quot;]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[7,81,&quot;37&quot;]]],[4,[4,&quot; <&quot;,1],[6,[3,2,[7,21,&quot;large&quot;]]]]]]]]]]]]]}\">large_lt : 37 &lt; large</code>",
 "42":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;4&quot;:{&quot;binding&quot;:&quot;const-large&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;large&quot;]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,5,&quot;Nat&quot;]]]]]]]]]}\">large : Nat</code>",
 "41":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1365&quot;:{&quot;binding&quot;:&quot;var-_uniq.15641&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;21777&quot;:{&quot;binding&quot;:&quot;var-_uniq.15641&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;3&quot;:{&quot;binding&quot;:&quot;var-_uniq.15642&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-Nat.mul_comm&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5445&quot;:{&quot;binding&quot;:&quot;var-_uniq.15642&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;5457&quot;:{&quot;binding&quot;:&quot;var-_uniq.15642&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;84&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;Nat.mul_comm&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[4,&quot;n&quot;,1],[4,[7,3,&quot;m&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,84,&quot;Nat&quot;]]],&quot;)&quot;]]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,21777,&quot;n&quot;]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[7,5445,&quot;m&quot;]]]]]]],[4,[4,&quot; =&quot;,1],[6,[3,2,[4,[6,[3,2,[7,5457,&quot;m&quot;]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[7,1365,&quot;n&quot;]]]]]]]]]]]]]]]]]]]}\">Nat.mul_comm (n m : Nat) : n * m = m * n</code>",
 "40":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1365&quot;:{&quot;binding&quot;:&quot;var-_uniq.15641&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;21777&quot;:{&quot;binding&quot;:&quot;var-_uniq.15641&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;3&quot;:{&quot;binding&quot;:&quot;var-_uniq.15642&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-Nat.add_comm&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5445&quot;:{&quot;binding&quot;:&quot;var-_uniq.15642&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;5457&quot;:{&quot;binding&quot;:&quot;var-_uniq.15642&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;84&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;Nat.add_comm&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[4,&quot;n&quot;,1],[4,[7,3,&quot;m&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,84,&quot;Nat&quot;]]],&quot;)&quot;]]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,21777,&quot;n&quot;]]],[4,[4,&quot; +&quot;,1],[6,[3,2,[7,5445,&quot;m&quot;]]]]]]],[4,[4,&quot; =&quot;,1],[6,[3,2,[4,[6,[3,2,[7,5457,&quot;m&quot;]]],[4,[4,&quot; +&quot;,1],[6,[3,2,[7,1365,&quot;n&quot;]]]]]]]]]]]]]]]]]]]}\">Nat.add_comm (n m : Nat) : n + m = m + n</code>",
 "4": "<code>Nat</code>",
 "39":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1397009&quot;:{&quot;binding&quot;:&quot;var-_uniq.15641&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;21829&quot;:{&quot;binding&quot;:&quot;var-_uniq.15643&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;21845&quot;:{&quot;binding&quot;:&quot;var-_uniq.15643&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;340&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;349253&quot;:{&quot;binding&quot;:&quot;var-_uniq.15642&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;349457&quot;:{&quot;binding&quot;:&quot;var-_uniq.15641&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-Nat.add_mul&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;8&quot;:{&quot;binding&quot;:&quot;var-_uniq.15643&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;87365&quot;:{&quot;binding&quot;:&quot;var-_uniq.15643&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;87377&quot;:{&quot;binding&quot;:&quot;var-_uniq.15642&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;Nat.add_mul&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[4,&quot;n&quot;,1],[4,[4,&quot;m&quot;,1],[4,[7,8,&quot;k&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,340,&quot;Nat&quot;]]],&quot;)&quot;]]]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,1397009,&quot;n&quot;]]],[4,[4,&quot; +&quot;,1],[6,[3,2,[7,349253,&quot;m&quot;]]]]]]]],&quot;)&quot;]]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[7,21829,&quot;k&quot;]]]]]]],[4,[4,&quot; =&quot;,1],[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,349457,&quot;n&quot;]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[7,87365,&quot;k&quot;]]]]]]],[4,[4,&quot; +&quot;,1],[6,[3,2,[4,[6,[3,2,[7,87377,&quot;m&quot;]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[7,21845,&quot;k&quot;]]]]]]]]]]]]]]]]]]]]]]]}\">Nat.add_mul (n m k : Nat) : (n + m) * k = n * k + m * k</code>",
 "38":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;21845&quot;:{&quot;binding&quot;:&quot;var-_uniq.15643&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;340&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;349265&quot;:{&quot;binding&quot;:&quot;var-_uniq.15642&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;349457&quot;:{&quot;binding&quot;:&quot;var-_uniq.15641&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-Nat.mul_add&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;8&quot;:{&quot;binding&quot;:&quot;var-_uniq.15643&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;87313&quot;:{&quot;binding&quot;:&quot;var-_uniq.15641&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;87317&quot;:{&quot;binding&quot;:&quot;var-_uniq.15643&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;87365&quot;:{&quot;binding&quot;:&quot;var-_uniq.15642&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;87377&quot;:{&quot;binding&quot;:&quot;var-_uniq.15641&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;Nat.mul_add&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[4,&quot;n&quot;,1],[4,[4,&quot;m&quot;,1],[4,[7,8,&quot;k&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,340,&quot;Nat&quot;]]],&quot;)&quot;]]]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,87313,&quot;n&quot;]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,349265,&quot;m&quot;]]],[4,[4,&quot; +&quot;,1],[6,[3,2,[7,87317,&quot;k&quot;]]]]]]]],&quot;)&quot;]]]]]]]],[4,[4,&quot; =&quot;,1],[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,349457,&quot;n&quot;]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[7,87365,&quot;m&quot;]]]]]]],[4,[4,&quot; +&quot;,1],[6,[3,2,[4,[6,[3,2,[7,87377,&quot;n&quot;]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[7,21845,&quot;k&quot;]]]]]]]]]]]]]]]]]]]]]]]}\">Nat.mul_add (n m k : Nat) : n * (m + k) = n * m + n * k</code>",
 "37":
 "<code class=\"docstring\">`rw` is like `rewrite`, but also tries to close the goal by \"cheap\" (reducible) `rfl` afterwards.\n</code>",
 "36":
 "<code>HSub.hSub.{u, v, w} {α : Type u} {β : Type v} {γ : outParam (Type w)} [self : HSub α β γ] : α → β → γ</code><span class=\"sep\"></span><code class=\"docstring\">`a - b` computes the difference of `a` and `b`.\nThe meaning of this notation is type-dependent.\n* For natural numbers, this operator saturates at 0: `a - b = 0` when `a ≤ b`. \n\nConventions for notations in identifiers:\n\n * The recommended spelling of `-` in identifiers is `sub` (when used as a binary operator).</code>",
 "35":
 "<code>ite.{u} {α : Sort u} (c : Prop) [h : Decidable c] (t e : α) : α</code><span class=\"sep\"></span><code class=\"docstring\">`if c then t else e` is notation for `ite c t e`, \"if-then-else\", which decides to\nreturn `t` or `e` depending on whether `c` is true or false. The explicit argument\n`c : Prop` does not have any actual computational content, but there is an additional\n`[Decidable c]` argument synthesized by typeclass inference which actually\ndetermines how to evaluate `c` to true or false. Write `if h : c then t else e`\ninstead for a \"dependent if-then-else\" `dite`, which allows `t`/`e` to use the fact\nthat `c` is true/false.\n</code>",
 "34":
 "<code class=\"docstring\">* `unfold id` unfolds all occurrences of definition `id` in the target.\n* `unfold id1 id2 ...` is equivalent to `unfold id1; unfold id2; ...`.\n* `unfold id at h` unfolds at the hypothesis `h`.\n\nDefinitions can be either global or local definitions.\n\nFor non-recursive global definitions, this tactic is identical to `delta`.\nFor recursive global definitions, it uses the \"unfolding lemma\" `id.eq_def`,\nwhich is generated for each recursive definition, to unfold according to the recursive definition given by the user.\nOnly one level of unfolding is performed, in contrast to `simp only [id]`, which unfolds definition `id` recursively.\n</code>",
 "33": "<code>2 * sum n = n * (n + 1)</code>",
 "32":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;276&quot;:{&quot;binding&quot;:&quot;const-SumExample.sum&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;277&quot;:{&quot;binding&quot;:&quot;var-_uniq.15358&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;337&quot;:{&quot;binding&quot;:&quot;var-_uniq.15358&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;81&quot;:{&quot;binding&quot;:&quot;var-_uniq.15358&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,273,&quot;2&quot;]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[4,[6,[3,2,[7,276,&quot;sum&quot;]]],[4,1,[6,[3,2,[7,277,&quot;n&quot;]]]]]]]]]]],[4,[4,&quot; =&quot;,1],[6,[3,2,[4,[6,[3,2,[7,81,&quot;n&quot;]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,337,&quot;n&quot;]]],[4,[4,&quot; +&quot;,1],[6,[3,2,[7,85,&quot;1&quot;]]]]]]]],&quot;)&quot;]]]]]]]]]]]]]}\">2 * sum n = n * (n + 1)</code>",
 "31":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.15641&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;20&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;21&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-Nat.succ&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;Nat.succ&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;n&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,20,&quot;Nat&quot;]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,21,&quot;Nat&quot;]]]]]]]]]]]}\">Nat.succ (n : Nat) : Nat</code><span class=\"sep\"></span><code class=\"docstring\">The successor of a natural number `n`.\n\nUsing `Nat.succ n` should usually be avoided in favor of `n + 1`, which is the [simp normal\nform](https://lean-lang.org/doc/reference/4.30.0-rc2/find/?domain=Verso.Genre.Manual.section&name=simp-normal-forms).\n</code>",
 "30":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;4&quot;:{&quot;binding&quot;:&quot;const-Nat.zero&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;Nat.zero&quot;]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,5,&quot;Nat&quot;]]]]]]]]]}\">Nat.zero : Nat</code><span class=\"sep\"></span><code class=\"docstring\">Zero, the smallest natural number.\n\nUsing `Nat.zero` explicitly should usually be avoided in favor of the literal `0`, which is the\n[simp normal form](https://lean-lang.org/doc/reference/4.30.0-rc2/find/?domain=Verso.Genre.Manual.section&name=simp-normal-forms).\n</code>",
 "3":
 "<code class=\"docstring\">The universe of propositions. `Prop ≡ Sort 0`.\n\nEvery proposition is propositionally equal to either `True` or `False`. </code>",
 "29":
 "<code class=\"docstring\">After `with`, there is an optional tactic that runs on all branches, and\nthen a list of alternatives.\n</code>",
 "28":
 "<code class=\"docstring\">Assuming `x` is a variable in the local context with an inductive type,\n`induction x` applies induction on `x` to the main goal,\nproducing one goal for each constructor of the inductive type,\nin which the target is replaced by a general instance of that constructor\nand an inductive hypothesis is added for each recursive argument to the constructor.\nIf the type of an element in the local context depends on `x`,\nthat element is reverted and reintroduced afterward,\nso that the inductive hypothesis incorporates that hypothesis as well.\n\nFor example, given `n : Nat` and a goal with a hypothesis `h : P n` and target `Q n`,\n`induction n` produces one goal with hypothesis `h : P 0` and target `Q 0`,\nand one goal with hypotheses `h : P (Nat.succ a)` and `ih₁ : P a → Q a` and target `Q (Nat.succ a)`.\nHere the names `a` and `ih₁` are chosen automatically and are not accessible.\nYou can use `with` to provide the variables names for each constructor.\n- `induction e`, where `e` is an expression instead of a variable,\n  generalizes `e` in the goal, and then performs induction on the resulting variable.\n- `induction e using r` allows the user to specify the principle of induction that should be used.\n  Here `r` should be a term whose result type must be of the form `C t`,\n  where `C` is a bound variable and `t` is a (possibly empty) sequence of bound variables\n- `induction e generalizing z₁ ... zₙ`, where `z₁ ... zₙ` are variables in the local context,\n  generalizes over `z₁ ... zₙ` before applying the induction but then introduces them in each goal.\n  In other words, the net effect is that each inductive hypothesis is generalized.\n- Given `x : Nat`, `induction x with | zero =&gt; tac₁ | succ x' ih =&gt; tac₂`\n  uses tactic `tac₁` for the `zero` case, and `tac₂` for the `succ` case.\n</code>",
 "27": "<code>SumExample.sum (n : Nat) : Nat</code>",
 "26":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.15641&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;20&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;21&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-SumExample.sum&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;SumExample.sum&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;n&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,20,&quot;Nat&quot;]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,21,&quot;Nat&quot;]]]]]]]]]]]}\">SumExample.sum (n : Nat) : Nat</code>",
 "25":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;1361&quot;:{&quot;binding&quot;:&quot;var-_uniq.15641&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.15641&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;20&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-SumExample.sum_eq&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5396&quot;:{&quot;binding&quot;:&quot;const-SumExample.sum&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;5397&quot;:{&quot;binding&quot;:&quot;var-_uniq.15641&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;5457&quot;:{&quot;binding&quot;:&quot;var-_uniq.15641&quot;,&quot;cssClass&quot;:&quot;var&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;SumExample.sum_eq&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;{&quot;,[4,[7,2,&quot;n&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,20,&quot;Nat&quot;]]],&quot;}&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[4,[6,[3,2,[4,[6,[3,2,[7,5393,&quot;2&quot;]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[4,[6,[3,2,[7,5396,&quot;sum&quot;]]],[4,1,[6,[3,2,[7,5397,&quot;n&quot;]]]]]]]]]]],[4,[4,&quot; =&quot;,1],[6,[3,2,[4,[6,[3,2,[7,1361,&quot;n&quot;]]],[4,[4,&quot; *&quot;,1],[6,[3,2,[4,&quot;(&quot;,[4,[3,-2,[6,[3,2,[4,[6,[3,2,[7,5457,&quot;n&quot;]]],[4,[4,&quot; +&quot;,1],[6,[3,2,[7,1365,&quot;1&quot;]]]]]]]],&quot;)&quot;]]]]]]]]]]]]]]]]]]]]}\">SumExample.sum_eq {n : Nat} : 2 * sum n = n * (n + 1)</code>",
 "24":
 "<code class=\"docstring\">`if c then t else e` is notation for `ite c t e`, \"if-then-else\", which decides to\nreturn `t` or `e` depending on whether `c` is true or false. The explicit argument\n`c : Prop` does not have any actual computational content, but there is an additional\n`[Decidable c]` argument synthesized by typeclass inference which actually\ndetermines how to evaluate `c` to true or false. Write `if h : c then t else e`\ninstead for a \"dependent if-then-else\" `dite`, which allows `t`/`e` to use the fact\nthat `c` is true/false.\n</code>",
 "23":
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.14991&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;20&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;21&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-SumExample.sum&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;SumExample.sum&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;n&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,20,&quot;Nat&quot;]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,21,&quot;Nat&quot;]]]]]]]]]]]}\">SumExample.sum (n : Nat) : Nat</code>",
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
 "<code data-rich-format=\"{&quot;annotations&quot;:{&quot;2&quot;:{&quot;binding&quot;:&quot;var-_uniq.138&quot;,&quot;cssClass&quot;:&quot;var&quot;},&quot;20&quot;:{&quot;binding&quot;:&quot;const-Nat&quot;,&quot;cssClass&quot;:&quot;const&quot;},&quot;21&quot;:{&quot;binding&quot;:&quot;sort-14430969920833713138&quot;,&quot;cssClass&quot;:&quot;sort&quot;},&quot;4&quot;:{&quot;binding&quot;:&quot;const-odd&quot;,&quot;cssClass&quot;:&quot;const&quot;}},&quot;fmt&quot;:[6,[6,[3,2,[4,[6,[3,2,[7,4,&quot;odd&quot;]]],[4,1,[4,[6,[3,2,[4,&quot;(&quot;,[4,[7,2,&quot;n&quot;],[4,&quot; :&quot;,[4,1,[4,[6,[3,2,[7,20,&quot;Nat&quot;]]],&quot;)&quot;]]]]]]],[4,&quot; :&quot;,[4,1,[6,[3,2,[7,21,&quot;Prop&quot;]]]]]]]]]]]}\">odd (n : Nat) : Prop</code>"}).then((versoDocData) => {

      function hideParentTooltips(element) {
        let parent = element.parentElement;
        while (parent) {
          const tippyInstance = parent._tippy;
          if (tippyInstance) {
            tippyInstance.hide();
          }
          parent = parent.parentElement;
        }
      }



      const defaultTippyProps = {
        /* DEBUG -- remove the space: * /
        onHide(any) { return false; },
        trigger: "click",
        // */
        /* theme: "lean", */
        maxWidth: "none",
        appendTo: () => document.body,
        interactive: true,
        delay: [100, null],
        /* ignoreAttributes: true, */
        followCursor: 'initial',
        onShow(inst) {
          if (inst.reference.className == 'tactic') {
            const toggle = inst.reference.querySelector("input.tactic-toggle");
            if (toggle && toggle.checked) {
              return false;
            }
            hideParentTooltips(inst.reference);
            if (blockedByTippy(inst.reference)) { return false; }

          } else if (inst.reference.querySelector(".hover-info") || "versoHover" in inst.reference.dataset) {
            if (blockedByTactic(inst.reference)) { return false };
            if (blockedByTippy(inst.reference)) { return false; }
          } else { // Nothing to show here!
            return false;
          }
        },
        onShown(inst) { visibleTippyCount++; },
        onHidden(inst) { visibleTippyCount = Math.max(0, visibleTippyCount - 1); },
        content (tgt) {
          const content = document.createElement("span");
          if (tgt.className == 'tactic') {
            const state = tgt.querySelector(".tactic-state").cloneNode(true);
            state.style.display = "block";
            content.appendChild(state);
            content.style.display = "block";
            content.className = "hl lean popup";
          } else {
            content.className = "hl lean";
            content.style.display = "block";
            content.style.maxHeight = "300px";
            content.style.overflowY = "auto";
            content.style.overflowX = "hidden";
            const hoverId = tgt.dataset.versoHover;
            const hoverInfo = tgt.querySelector(".hover-info");
            if (hoverId) { // Docstrings from the table
              // TODO stop doing an implicit conversion from string to number here
              let data = versoDocData[hoverId];
              if (data) {
                const info = document.createElement("span");
                info.className = "hover-info";
                info.style.display = "block";
                info.innerHTML = data;
                content.appendChild(info);
                /* Render docstrings - TODO server-side */
                if ('undefined' !== typeof marked) {
                    for (const d of content.querySelectorAll("code.docstring, pre.docstring")) {
                        const str = d.innerText;
                        const html = marked.parse(str);
                        const rendered = document.createElement("div");
                        rendered.classList.add("docstring");
                        rendered.innerHTML = html;
                        d.parentNode.replaceChild(rendered, d);
                    }
                }
              } else {
                content.innerHTML = "Failed to load doc ID: " + hoverId;
              }
            } else if (hoverInfo) { // The inline info, still used for compiler messages
              content.appendChild(hoverInfo.cloneNode(true));
            }
            const extraLinks = tgt.parentElement.dataset['versoLinks'];
            if (extraLinks) {
              try {
                const extras = JSON.parse(extraLinks);
                const links = document.createElement('ul');
                links.className = 'extra-doc-links';
                extras.forEach((l) => {
                  const li = document.createElement('li');
                  li.innerHTML = "<a href=\"" + l['href'] + "\" title=\"" + l.long + "\">" + l.short + "</a>";
                  links.appendChild(li);
                });
                content.appendChild(links);
              } catch (error) {
                console.error(error);
              }
            }
          }
          return content;
        }
      };


      document.querySelectorAll('.hl.lean .const.token, .hl.lean .keyword.token, .hl.lean .literal.token, .hl.lean .option.token, .hl.lean .var.token, .hl.lean .typed.token, .hl.lean .level-var, .hl.lean .level-const, .hl.lean .level-op, .hl.lean .sort').forEach(element => {
        element.setAttribute('data-tippy-theme', 'lean');
      });
      document.querySelectorAll('.hl.lean .has-info.warning').forEach(element => {
        element.setAttribute('data-tippy-theme', 'warning message');
      });
      document.querySelectorAll('.hl.lean .has-info.information').forEach(element => {
        element.setAttribute('data-tippy-theme', 'info message');
      });
      document.querySelectorAll('.hl.lean .has-info.error').forEach(element => {
        element.setAttribute('data-tippy-theme', 'error message');
      });
      document.querySelectorAll('.hl.lean .tactic').forEach(element => {
        element.setAttribute('data-tippy-theme', 'tactic');
      });
      // Skip tokens inside closed tactics — they interfere with tactic tippys
      const closedTactics = new Set();
      document.querySelectorAll('.hl.lean .tactic').forEach(tactic => {
        const toggle = tactic.querySelector('input.tactic-toggle');
        if (toggle && !toggle.checked) closedTactics.add(tactic);
      });
      function isInsideClosedTactic(el) {
        const tactic = el.closest('.tactic');
        return tactic && tactic !== el && closedTactics.has(tactic);
      }

      const tokenSelector = '.hl.lean .const.token, .hl.lean .keyword.token, .hl.lean .literal.token, .hl.lean .option.token, .hl.lean .var.token, .hl.lean .typed.token, .hl.lean .has-info, .hl.lean .tactic, .hl.lean .level-var, .hl.lean .level-const, .hl.lean .level-op, .hl.lean .sort';
      tippy(Array.from(document.querySelectorAll(tokenSelector)).filter(el => !isInsideClosedTactic(el)), defaultTippyProps);

      // Create/destroy token tippys when tactic checkbox toggles
      const tacticTippySelector = '.const.token, .keyword.token, .literal.token, .option.token, .var.token, .typed.token, .has-info, .level-var, .level-const, .level-op, .sort';
      document.querySelectorAll('.hl.lean .tactic').forEach(tactic => {
        const toggle = tactic.querySelector('input.tactic-toggle');
        if (toggle) toggle.addEventListener('change', () => {
          if (toggle.checked) {
            closedTactics.delete(tactic);
            tactic.querySelectorAll('.token').forEach(tok => {
              if (!tok._tippy && tok.matches(tacticTippySelector)) {
                tippy(tok, defaultTippyProps);
              }
            });
          } else {
            closedTactics.add(tactic);
            tactic.querySelectorAll('.token').forEach(tok => {
              if (tok._tippy) tok._tippy.destroy();
            });
          }
        });
      });
  });
}
