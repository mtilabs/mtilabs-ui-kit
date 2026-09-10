---
'@mtilabs/ui': minor
---

Add `MtIcon` (`<mt-icon>`): a sizing/accessibility wrapper for a consumer-supplied icon (this library doesn't bundle an icon set). Project any SVG as content; it's sized via `sm`/`md`/`lg` design tokens, inherits the surrounding text color, and is decorative (`aria-hidden`) by default or `role="img"` + `aria-label` when given a `label`.
