import VersoBlog

open Verso.Doc Verso.Genre.Blog

namespace Site

private def escapeChar : Char → String
  | '&' => "&amp;"
  | '<' => "&lt;"
  | '>' => "&gt;"
  | '"' => "&quot;"
  | '\'' => "&apos;"
  | c   => c.toString

private def escapeXml (s : String) : String := Id.run do
  let mut out := ""
  for c in s.toList do
    out := out ++ escapeChar c
  pure out

private def dayOfWeek (y : Int) (mo d : Nat) : Nat :=
  let (y', m') : Int × Nat := if mo < 3 then (y - 1, mo + 12) else (y, mo)
  let yn : Nat := if y' < 0 then 0 else y'.toNat
  let K := yn % 100
  let J := yn / 100
  (d + (13 * (m' + 1)) / 5 + K + K / 4 + J / 4 + 5 * J) % 7

private def weekdayName : Nat → String
  | 0 => "Sat" | 1 => "Sun" | 2 => "Mon" | 3 => "Tue"
  | 4 => "Wed" | 5 => "Thu" | 6 => "Fri" | _ => "Sat"

private def monthName : Nat → String
  | 1 => "Jan"  | 2 => "Feb"  | 3 => "Mar"  | 4 => "Apr"
  | 5 => "May"  | 6 => "Jun"  | 7 => "Jul"  | 8 => "Aug"
  | 9 => "Sep"  | 10 => "Oct" | 11 => "Nov" | 12 => "Dec"
  | _ => "Jan"

private def pad2 (n : Nat) : String := (if n ≤ 9 then "0" else "") ++ toString n

def rfc822Date (date : Date) : String :=
  let wd := weekdayName (dayOfWeek date.year date.month date.day)
  let mo := monthName date.month
  s!"{wd}, {pad2 date.day} {mo} {date.year} 00:00:00 +0000"

partial def inlineText : Inline Post → String
  | .text s => s
  | .code s => s
  | .linebreak _ => " "
  | .math _ s => s
  | .image alt _ => alt
  | .emph content
  | .bold content
  | .concat content
  | .link content _
  | .footnote _ content
  | .other _ content => content.foldl (fun acc i => acc ++ inlineText i) ""

partial def blockText : Block Post → String
  | .para contents => contents.foldl (fun acc i => acc ++ inlineText i) ""
  | .blockquote items
  | .concat items
  | .other _ items => items.foldl (fun acc b => acc ++ " " ++ blockText b) ""
  | .code s => s
  | .ul items
  | .ol _ items =>
      items.foldl (fun acc ⟨bs⟩ =>
        acc ++ " " ++ bs.foldl (fun a b => a ++ " " ++ blockText b) "") ""
  | .dl items =>
      items.foldl (fun acc ⟨is, bs⟩ =>
        let t := is.foldl (fun a i => a ++ inlineText i) ""
        let d := bs.foldl (fun a b => a ++ " " ++ blockText b) ""
        acc ++ " " ++ t ++ ": " ++ d) ""

private def collapseWs (s : String) : String := Id.run do
  let mut out := ""
  let mut prev : Char := ' '
  for c in s.toList do
    let c' := if c.isWhitespace then ' ' else c
    if c' == ' ' && prev == ' ' then continue
    out := out.push c'
    prev := c'
  pure out.trim

private def slugify (str : String) : String := Id.run do
  let mut slug := ""
  for c in str.toList do
    if c == ' ' then slug := slug.push '-'
    else if c.isAlpha || c.isDigit then slug := slug.push c.toLower
  pure slug

def postSlug (post : BlogPost) : String :=
  let date : Date :=
    post.contents.metadata.map (·.date) |>.getD {year := 1900, month := 1, day := 1}
  s!"{date.year}-{date.month}-{date.day}-{slugify post.contents.titleString}"

partial def partBlocks (p : Part Post) : Array (Block Post) :=
  if p.content.isEmpty then
    p.subParts.foldl (fun acc sp => acc ++ partBlocks sp) #[]
  else p.content

def postSummaryText (post : BlogPost) (maxChars : Nat := 500) : String :=
  let blocks := if post.summary.isEmpty then partBlocks post.contents else post.summary
  let raw := blocks.foldl
    (fun acc b => if acc.length > maxChars then acc else acc ++ " " ++ blockText b) ""
  let text := collapseWs raw
  if text.length ≤ maxChars then text
  else (text.take maxChars).trim.toString ++ "…"

partial def collectDirPosts (parent : String) (d : Dir) : Array (String × BlogPost) :=
  match d with
  | .blog name _ _ posts => posts.map (fun p => (parent ++ "/" ++ name, p))
  | .page name _ _ subs =>
    subs.foldl (fun acc d' => acc ++ collectDirPosts (parent ++ "/" ++ name) d') #[]
  | .static .. => #[]

def collectSitePosts (site : Site) : Array (String × BlogPost) :=
  match site with
  | .page _ _ subs => subs.foldl (fun acc d => acc ++ collectDirPosts "" d) #[]
  | .blog _ _ posts => posts.map (fun p => ("", p))

def postDate (p : BlogPost) : Date :=
  p.contents.metadata.map (·.date) |>.getD {year := 1900, month := 1, day := 1}

private def dateGt (a b : Date) : Bool :=
  if a.year != b.year then a.year > b.year
  else if a.month != b.month then a.month > b.month
  else a.day > b.day

def rssItem (siteUrl parentPath : String) (post : BlogPost) : String :=
  let date := postDate post
  let url := s!"{siteUrl}{parentPath}/{postSlug post}/"
  let title := escapeXml post.contents.titleString
  let pubDate := rfc822Date date
  let cats := post.contents.metadata.map (·.categories) |>.getD []
  let categoriesXml :=
    cats.foldl (fun acc c => acc ++ s!"\n    <category>{escapeXml c.name}</category>") ""
  let description := escapeXml (postSummaryText post)
  "  <item>\n" ++
  s!"    <title>{title}</title>\n" ++
  s!"    <link>{url}</link>\n" ++
  s!"    <guid isPermaLink=\"true\">{url}</guid>\n" ++
  s!"    <pubDate>{pubDate}</pubDate>" ++ categoriesXml ++ "\n" ++
  s!"    <description>{description}</description>\n" ++
  "  </item>"

def rssFeed (siteUrl siteName siteDescription : String) (site : Site) : String :=
  let posts := (collectSitePosts site).qsort
    (fun a b => dateGt (postDate a.2) (postDate b.2))
  let items := posts.foldl
    (fun acc (pp : String × BlogPost) => acc ++ "\n" ++ rssItem siteUrl pp.1 pp.2) ""
  let lastBuild := match posts[0]? with
    | none => ""
    | some (_, p) => s!"\n  <lastBuildDate>{rfc822Date (postDate p)}</lastBuildDate>"
  "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" ++
  "<rss version=\"2.0\" xmlns:atom=\"http://www.w3.org/2005/Atom\">\n" ++
  "<channel>\n" ++
  s!"  <title>{escapeXml siteName}</title>\n" ++
  s!"  <description>{escapeXml siteDescription}</description>\n" ++
  s!"  <link>{siteUrl}</link>\n" ++
  s!"  <atom:link href=\"{siteUrl}/feed.xml\" rel=\"self\" type=\"application/rss+xml\" />" ++
  lastBuild ++ items ++ "\n</channel>\n</rss>\n"

def parseDestination : List String → System.FilePath
  | "--output" :: dir :: _ => dir
  | _ :: rest => parseDestination rest
  | [] => "./_site"

def writeFeed (siteUrl siteName siteDescription : String)
    (destDir : System.FilePath) (site : Site) : IO Unit := do
  IO.FS.createDirAll destDir
  let feed := rssFeed siteUrl siteName siteDescription site
  IO.FS.writeFile (destDir.join "feed.xml") feed

end Site