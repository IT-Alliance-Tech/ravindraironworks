#!/usr/bin/env bash
# reorg/reorganize.sh - create directories and run `git mv` for mappings in reorg/mapping.json
# Usage: bash reorg/reorganize.sh [--dry-run]

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
MAPPING_FILE="$SCRIPT_DIR/mapping.json"
DRY_RUN=0

if [ "${1:-}" = "--dry-run" ]; then
  DRY_RUN=1
fi

echo "Reorg script"
echo "Mapping: $MAPPING_FILE"

if ! command -v git >/dev/null 2>&1; then
  echo "ERROR: git not found in PATH. Install git before running."
  exit 1
fi

cd "$REPO_ROOT"

if [ $DRY_RUN -eq 0 ]; then
  # require clean working tree
  if [ -n "$(git status --porcelain)" ]; then
    echo "ERROR: Working tree is not clean. Commit or stash changes before running this script."
    echo "Run: git status --porcelain" && git status --porcelain
    exit 2
  fi
else
  echo "DRY RUN: no changes will be made. Commands will be printed only."
fi

if [ ! -f "$MAPPING_FILE" ]; then
  echo "ERROR: mapping file not found at $MAPPING_FILE"
  exit 3
fi

echo "Reading mappings..."

# Use node to safely parse JSON and print mappings as lines old:::new
MAP_LINES=$(node -e "const m=require('$MAPPING_FILE'); for(const k of Object.keys(m)) console.log(k+':::'+m[k]);")

if [ -z "$MAP_LINES" ]; then
  echo "No mappings found in $MAPPING_FILE"
  exit 0
fi

echo "Planned moves:"
echo
while IFS= read -r line; do
  old=${line%%:::*}
  new=${line#*:::}
  printf ' - %s -> %s\n' "$old" "$new"
done <<< "$MAP_LINES"

echo
echo "Executing moves..."
cnt=0
err=0
while IFS= read -r line; do
  old=${line%%:::*}
  new=${line#*:::}

  # Ensure paths are relative to repo root
  old_path="$REPO_ROOT/$old"
  new_path="$REPO_ROOT/$new"

  new_dir="$(dirname "$new_path")"

  if [ ! -e "$old_path" ]; then
    echo "WARN: source not found, skipping: $old"
    err=$((err+1))
    continue
  fi

  if [ -e "$new_path" ]; then
    echo "ERROR: target already exists, aborting: $new"
    exit 4
  fi

  if [ $DRY_RUN -eq 1 ]; then
    echo "# mkdir -p \"$new_dir\""
    echo "# git mv -v \"$old\" \"$new\""
  else
    echo "mkdir -p \"$new_dir\""
    mkdir -p "$new_dir"
    echo "git mv -v \"$old\" \"$new\""
    git mv -v "$old" "$new"
  fi
  cnt=$((cnt+1))
done <<< "$MAP_LINES"

echo
echo "Summary: attempted moves: $cnt, warnings/skipped: $err"
echo "Review the plan at: $SCRIPT_DIR/plan.md"

if [ $DRY_RUN -eq 1 ]; then
  echo "Dry run complete. To execute the moves, run: bash $SCRIPT_DIR/reorganize.sh"
else
  echo "Moves complete. Run 'node $SCRIPT_DIR/update-imports.js' to update imports, then review changes and commit."
fi

exit 0
