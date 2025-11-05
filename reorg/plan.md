<!-- reorg/plan.md - Human-readable plan of proposed component moves -->
# Component reorganization plan

This document lists the proposed file moves (old -> new) and shows example import updates that will be applied by `reorg/update-imports.js`.

IMPORTANT SAFETY NOTES
- Do NOT run the reorganize script until you commit or stash local changes. The script will check for a clean working tree and refuse to run otherwise.
- Files listed under "MANUAL REVIEW REQUIRED" are not included in `reorg/mapping.json` and will NOT be moved automatically.

---

## Proposed automatic moves

The following mappings are created automatically by scanning `components/` and `pages/` and applying heuristics (homepage imports -> HomePage group; admin imports -> Admin group; Controls by name). These mappings are written to `reorg/mapping.json` and will be used by `reorg/reorganize.sh`.

```
components/Hero.jsx -> components/HomePage/Hero.jsx
components/AboutPreview.jsx -> components/HomePage/AboutPreview.jsx
components/ServicesGrid.jsx -> components/HomePage/ServicesGrid.jsx
components/Stats.jsx -> components/HomePage/Stats.jsx
components/Industries.jsx -> components/HomePage/Industries.jsx
components/ClientsCarousel.jsx -> components/HomePage/ClientsCarousel.jsx
components/CTA.jsx -> components/HomePage/CTA.jsx
components/ContactPreview.jsx -> components/HomePage/ContactPreview.jsx
components/PreviewHomepage.js -> components/HomePage/PreviewHomepage.js
components/PreviewCard.js -> components/HomePage/PreviewCard.js
components/TimelineSection.jsx -> components/HomePage/TimelineSection.jsx
components/ValuesGrid.jsx -> components/HomePage/ValuesGrid.jsx

components/AdminLayout.js -> components/Admin/AdminLayout.js
components/AdminPanel.jsx -> components/Admin/AdminPanel.jsx
components/AdminSection.jsx -> components/Admin/AdminSection.jsx
components/EditorSection.js -> components/Admin/EditorSection.js
components/AnalyticsPlaceholder.js -> components/Admin/AnalyticsPlaceholder.js
components/LoadingCard.js -> components/Admin/LoadingCard.js

components/Header.jsx -> components/shared/Header.jsx
components/Footer.jsx -> components/shared/Footer.jsx
```

These entries are the current contents of `reorg/mapping.json` (editable).

---

## Files left for MANUAL REVIEW (not moved automatically)

Files that could not be mapped confidently are left for manual review. Edit `reorg/mapping.json` to add or adjust mappings before running the reorganize script.

- (none detected automatically)

If you add mappings manually, ensure the source files listed exist exactly and that the destination paths are under `components/`.

---

## Examples: import updates that will be made

1) Absolute-style imports (module-like)

Before:
```
import Hero from 'components/Hero'
import PreviewHomepage from 'components/PreviewHomepage'
```

After:
```
import Hero from 'components/HomePage/Hero'
import PreviewHomepage from 'components/HomePage/PreviewHomepage'
```

2) Relative imports from pages or other components

Suppose `pages/admin.js` currently does:
```
import PreviewHomepage from '../components/PreviewHomepage'
```

After reorg, `PreviewHomepage` moves to `components/HomePage/PreviewHomepage.js` and `reorg/update-imports.js` will update the import to the correct relative path, for example:
```
import PreviewHomepage from '../components/HomePage/PreviewHomepage'
```

The updater computes relative paths and preserves the minimal `./`/`../` form.

---

## Dry-run example (what `bash reorg/reorganize.sh --dry-run` will print)

Sample output (trimmed):

```
# mkdir -p "components/HomePage"
# git mv -v "components/Hero.jsx" "components/HomePage/Hero.jsx"
# mkdir -p "components/Admin"
# git mv -v "components/AdminLayout.js" "components/Admin/AdminLayout.js"
...
``` 

These lines are only printed in `--dry-run` mode. Without `--dry-run` the script will execute the `mkdir -p` and `git mv` commands (after verifying your working tree is clean).

---

## How to edit the plan

- To add or change a mapping, edit `reorg/mapping.json`. Each key is the current path relative to repo root; each value is the desired new path.
- If you add a mapping, ensure it points into `components/` and that the source file exists.
- If uncertain about a file, leave it out of mapping.json and handle it manually after reviewing the codebase.

---

## Notes / assumptions made by the scanner

- Heuristic: files imported by `pages/index.js` are grouped into `HomePage`.
- Heuristic: files imported by `pages/admin.js` are grouped into `Admin`.
- Files named `Button`, `Input`, `Textarea`, `FileInput` were detected under `components/Controls` and left in that folder (no move required).
- Header and Footer are used by multiple pages and were placed into `components/shared`.

If you disagree with any mapping, modify `reorg/mapping.json` before running the reorganizer.

---

Generated: reorg/mapping.json (editable)
