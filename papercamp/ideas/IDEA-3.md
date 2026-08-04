---
id: IDEA-3
title: Tier 3 — gap-fillers paper-ui never had
type: feat
status: planned
created: 2026-08-04
tags:
  - components
  - release
---

The bespoke-UI census found ~28 hand-rolled chrome-less buttons across 10 files, ~20 loading/empty/error text states, 13 app-local icons plus text-glyph fallbacks with comments naming the missing icon, two inconsistent drawers, and duplicated diff/code/chip/dot patterns. These components make func-ui a genuine upgrade rather than a re-skin.

Skipped for the initial release (no demand from either target inventory): Accordion, Pagination, Avatar, PropTable, Swatch, Island, and the Layout/Page god-components (Backdrop+Glass composition replaces them). Radio/RadioGroup, Tabs, and the table story moved to the radio-parity tier ([[IDEA-7]]) now that the radio project is the target consumer.

### Phases
- [x] LinkButton (inherit/accent color, sizes — fixes the "fixed amber style" complaint)
- [ ] EmptyState (loading / empty / error, centered per UX_PRINCIPLES layout-stability rules)
- [ ] StatusDot + Chip (toggle/filter, aria-pressed) + SegmentedControl
- [ ] Drawer (backdrop, focus trap, Escape, slide) — replaces two inconsistent hand-rolls
- [ ] Kbd + InlineCode + CodeBlock (filename, copy, per-line diff add/remove styling)
- [ ] CopyButton + Breadcrumb + Menu + FileButton
- [ ] Icon set (~20: close, check, copy, plus, folder, lightbulb, chevrons, play, flag, sort arrows, refresh, more, wand, merge, push, pull, shuffle, commit, github, note)
- [ ] (Table/Tabs/Radio moved to [[IDEA-7]] with the radio retarget)
