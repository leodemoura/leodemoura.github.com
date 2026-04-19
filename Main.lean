import VersoBlog
import Site.Theme
import Site.FrontPage
import Site.About
import Site.Publications
import Site.Slides

import Site.Blog
import Site.Blog.TeachingAI
import Site.Blog.WhenAIWrites
import Site.Blog.ProofAssistants
import Site.Blog.WhyLean
import Site.Blog.WhoWatches
import Site.Blog.SignalShot
import Site.Notes
import Site.Notes.CrayColloquium
import Site.Notes.SymInteractive
import Site.Notes.VersoPort

open Verso Genre Blog Site Syntax

def mySite : Site := site Site.FrontPage /
  static "static" ← "static_files"
  static "files" ← "files"
  "about" Site.About
  "publications" Site.Publications
  "blog" Site.Blog with
    Site.Blog.SignalShot
    Site.Blog.WhyLean
    Site.Blog.WhoWatches
    Site.Blog.TeachingAI
    Site.Blog.WhenAIWrites
    Site.Blog.ProofAssistants
  "notes" Site.Notes with
    Site.Notes.CrayColloquium
    Site.Notes.VersoPort
    Site.Notes.SymInteractive
  "slides" Site.Slides

def main := blogMain Site.theme mySite
