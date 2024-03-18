#!/usr/bin/env sh
url="https://github.com/Mickaress/test.git"

set -e
vite build --mode gh-pages
cd dist
cp index.html 404.html
git init 
git add .
git commit -m "deploy"
git checkout -b gh-pages
git push -f $url gh-pages
rm -rf .git