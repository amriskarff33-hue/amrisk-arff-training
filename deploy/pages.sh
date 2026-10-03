#!/usr/bin/env bash
#
# Ship arff-training to GitHub Pages.
#
# Usage
#   ./deploy/pages.sh "describe this change"
#
# What this does
#   1. syntax-checks every script
#   2. bumps the cache-buster (?v=N) in index.html and CACHE_VERSION in sw.js
#   3. commits and pushes
#   4. waits for Pages to finish, then confirms the CDN serves the new build
#
# Why the bump matters
#   index.html loads scripts as js/lessons.js?v=N. Changing N is what makes a
#   browser fetch the new file rather than the one already in its cache, so N
#   must move in the same commit as the content change.
#
# What to expect afterwards
#   A learner whose service worker is already active sees the PREVIOUS build on
#   their very next load, and the new one on the load after that. That is
#   stale-while-revalidate doing its job, not a fault: the worker returns the
#   cached copy immediately and replaces it in the background. It also means a
#   training document never changes halfway through a sitting, which for this
#   audience is a feature worth keeping.
#
set -euo pipefail

REPO="amriskarff33-hue/amrisk-arff-training"
SITE="https://amriskarff33-hue.github.io/amrisk-arff-training"
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MSG="${1:-deploy}"

cd "$DIR"

if [[ -n "$(git status --porcelain)" ]]; then
  echo "note: folding your uncommitted changes into this deploy commit"
  git status --short | sed 's/^/   /'
fi

next_v=$(grep -o '?v=[0-9]*' index.html | head -1 | cut -d= -f2)
next_v=$(( next_v + 1 ))
next_cache=$(grep -oE 'amrisk-arff-v[0-9]+' sw.js | head -1 | grep -oE '[0-9]+')
next_cache=$(( next_cache + 1 ))

echo "1. checking syntax"
for f in js/*.js sw.js; do node --check "$f"; done
echo "   all scripts parse"

echo "2. bumping cache-busters to ?v=$next_v / CACHE_VERSION v$next_cache"
sed -i '' "s/?v=[0-9]*\"/?v=$next_v\"/g" index.html
sed -i '' "s/amrisk-arff-v[0-9]*/amrisk-arff-v$next_cache/" sw.js
for f in js/*.js sw.js; do node --check "$f"; done

git add -A
git commit -q -m "$MSG" -m "Cache-buster bump: ?v=$next_v, CACHE_VERSION v$next_cache."
sha=$(git rev-parse HEAD)

echo "3. pushing ${sha:0:8}"
git push -q origin main

echo "4. waiting for Pages"
built=0
for _ in $(seq 1 40); do
  status=$(gh api "repos/$REPO/pages/builds/latest" --jq '.status' 2>/dev/null || echo unknown)
  commit=$(gh api "repos/$REPO/pages/builds/latest" --jq '.commit // ""' 2>/dev/null || echo)
  if [[ "$status" == "built" && "$commit" == "$sha" ]]; then built=1; break; fi
  printf '   %s\r' "$status"
  sleep 6
done

if [[ "$built" -ne 1 ]]; then
  echo
  echo "error: Pages did not report this build as complete in time." >&2
  echo "       Check https://github.com/$REPO/settings/pages" >&2
  exit 1
fi
echo "   built"

echo "5. confirming the CDN is serving this build"
marker=$(git show "$sha" --format= --name-only | grep -E '^js/.*\.js$' | head -1 || true)
if [[ -n "$marker" ]]; then
  size=$(curl -fsS "$SITE/$marker" | wc -c | tr -d ' ')
  echo "   $marker — $size bytes"
fi
sw_ver=$(curl -fsS "$SITE/sw.js" | grep -oE 'amrisk-arff-v[0-9]+' | head -1 || echo unknown)
echo "   sw.js reports $sw_ver"

echo
echo "Live: $SITE/"
echo "Active service workers pick this up on the load after next."
