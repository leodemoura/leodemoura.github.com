import VersoBlog
open Verso Genre Blog

def siteCSS : String := include_str "theme.css"

namespace Site

open Output Html Template Theme in
def theme : Theme := { Theme.default with
  primaryTemplate := do
    let postList :=
      match (← param? "posts") with
      | none => Html.empty
      | some html => html
    return {{
      <html>
        <head>
          <meta charset="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <title>{{← param (α := String) "title"}} " — Leonardo de Moura"</title>
          <meta name="author" content="Leonardo de Moura"/>
          <meta name="description" content="Leonardo de Moura — Creator of Lean and Z3"/>
          <link href="https://fonts.googleapis.com/css?family=Inconsolata" rel="stylesheet" type="text/css"/>
          <style>{{siteCSS}}</style>
          {{← builtinHeader}}
        </head>
        <body>
          <div id="outer">
            <div id="top"></div>
            <div id="left">
              <img src="/static/images/leo.jpg" alt="Leonardo de Moura"/>
            </div>
            <div class="site">
              <div class="title">
                <a class="name" href="/">"Leonardo de Moura"</a>
                <input type="checkbox" id="nav-toggle" class="nav-toggle"/>
                <label class="nav-burger" for="nav-toggle">
                  <span class="bar"></span>
                  <span class="bar"></span>
                  <span class="bar"></span>
                </label>
                <nav class="nav-links">
                  <a class="nav" href="/">"home"</a>
                  <a class="nav" href="/about/">"about me"</a>
                  <a class="nav" href="https://scholar.google.com/citations?user=CwazDKgAAAAJ">"publications"</a>
                  <a class="nav" href="/blog/">"blog"</a>
                  <a class="nav" href="/notes/">"notes"</a>
                  <a class="nav" href="/slides/">"presentations"</a>
                </nav>
              </div>
              {{← param "content"}}
              {{postList}}
              <div class="footer">
                <div class="contact">
                  <p>
                    "Leonardo de Moura" <br/>
                    "Senior Principal Applied Scientist at " <a href="https://aws.amazon.com/">"AWS"</a> <br/>
                    "Chief Architect and co-founder of the " <a href="https://lean-fro.org">"Lean FRO"</a> <br/>
                    <a href="mailto:leodemoura0@gmail.com">"leodemoura0@gmail.com"</a>
                  </p>
                </div>
                <div class="contact">
                  <p>
                    <a href="https://github.com/leodemoura">"GitHub"</a> <br/>
                    <a href="https://scholar.google.com/citations?user=CwazDKgAAAAJ">"Google Scholar"</a> <br/>
                    <a href="https://www.linkedin.com/in/leonardo-de-moura-26a27b5/">"LinkedIn"</a> <br/>
                    <a href="https://x.com/Leonard41111588">"X"</a>
                  </p>
                </div>
              </div>
            </div>
            <div id="right"></div>
          </div>
        </body>
      </html>
    }}
  pageTemplate := do
    let path ← currentPath
    let title ← param (α := String) "title"
    let showTitle := !path.isEmpty
    return {{
      <article>
        {{ if showTitle then {{ <h1>{{title}}</h1> }} else Html.empty }}
        {{← param "content"}}
      </article>
    }}
  postTemplate := do
    return {{
      <article>
        <h1>{{← param "title"}}</h1>
        {{ match (← param? "metadata") with
           | none => Html.empty
           | some (md : Post.PartMetadata) => {{
              <div class="post-meta">
                {{md.date.toIso8601String}}
              </div>
           }}
        }}
        {{← param "content"}}
      </article>
    }}
  archiveEntryTemplate := do
    let post : BlogPost ← param "post"
    let target ← if let some p := (← param? "path") then
        pure <| p ++ "/" ++ (← post.postName')
      else post.postName'
    return #[{{
      <li>
        <span>{{post.contents.metadata.map (·.date.toIso8601String) |>.getD ""}}</span>
        " » "
        <a href={{target}}>{{post.contents.titleString}}</a>
      </li>
    }}]
  cssFiles := #[("site.css", siteCSS)]
}

end Site
