import VersoBlog
open Verso.Genre.Blog.Post

namespace Site

def blog : Category where
  name := "Blog"
  slug := "blog"

def notes : Category where
  name := "Lean Notes"
  slug := "lean-notes"
