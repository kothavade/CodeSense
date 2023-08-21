#!/usr/bin/env bash
set -e

mkdir -p src/assets

# bash array of languages
declare -a languages=("rust" "c")

# Check if languages are already built, if not, build them
for lang in "${languages[@]}"
do
  if [ ! -f "src/assets/tree-sitter-$lang.wasm" ]; then
    tree-sitter build-wasm node_modules/tree-sitter-$lang
    mv tree-sitter-$lang.wasm src/assets
  fi
done