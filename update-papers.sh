# Update paper list
cd _includes
rm -f *.html
bibtex2html -dl -r -d -nodoc cv-leonardo.bib
cd ..

