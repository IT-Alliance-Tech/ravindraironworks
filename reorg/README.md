<!-- reorg/README.md - instructions and safety notes for the reorg helper -->
# Reorg helper — README

Purpose
- A small local toolset to help reorganize component files under `components/` into page-focused folders while preserving git history.

Files created
- `reorg/plan.md` — human-readable plan and examples.
- `reorg/mapping.json` — editable JSON mapping of oldPath -> newPath (relative to repo root).
- `reorg/reorganize.sh` — bash script to create folders and run `git mv` for each mapping. Supports `--dry-run`.
- `reorg/update-imports.js` — Node script to update import strings across `pages/`, `components/`, `lib/`, and `src/`.
- `reorg/changes.log` — created by the updater (appended to), contains a log of replacements.

Safety steps (read before running)
1) Commit or stash all local changes. The reorganizer will refuse to run on an unclean working tree.
2) Inspect `reorg/plan.md` and `reorg/mapping.json`. Edit `mapping.json` to add or adjust mappings. Files not present in `mapping.json` will not be moved.
3) Run the reorganizer in dry-run first to confirm commands:

```bash
bash reorg/reorganize.sh --dry-run
```

4) If the dry-run looks correct, run the real move:

```bash
bash reorg/reorganize.sh
```

5) Update imports (this creates `.bak` backups for modified files):

```bash
node reorg/update-imports.js
```

6) Review `reorg/changes.log` and `.bak` files, run the app, and commit the reorg changes when satisfied.

Notes and constraints
- The shell script uses `git mv` so file history is preserved.
- The Node updater performs conservative string-based replacements for import paths and creates `.bak` backups of any changed files.
- The tool does not delete files. It only moves files listed in `reorg/mapping.json`.
- The mapping is editable. If the scanner could not confidently map a file, it will be listed under `reorg/plan.md` as MANUAL REVIEW REQUIRED and not included in `mapping.json`.

Troubleshooting
- If `reorg/reorganize.sh` aborts due to an unclean working tree, run:

```bash
git status --porcelain
git add -A
git commit -m "WIP: save before reorg"
# or git stash
```

- If `reorg/update-imports.js` does not change an import you expected, open the file and check whether the import string matched exactly (with/without extension). Consider editing `reorg/mapping.json` to include the exact source path as found on disk.

Checklist (recommended)
1. Review `reorg/plan.md` and `reorg/mapping.json` — edit mapping if needed.
2. Create a local branch or commit: `git checkout -b reorg/components && git add . && git commit -m "backup before reorg"`
3. Run `bash reorg/reorganize.sh --dry-run`
4. If output looks correct, run `bash reorg/reorganize.sh`
5. Run `node reorg/update-imports.js`
6. Run local dev server and test
7. Commit the reorganized tree if everything works

If you need help adjusting the mapping or handling an ambiguous file, edit `reorg/mapping.json` and re-run the scripts.
