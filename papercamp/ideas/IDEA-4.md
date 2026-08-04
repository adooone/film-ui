---
id: IDEA-4
title: Showcase gallery entries for every release component
type: docs
status: planned
created: 2026-08-04
tags:
  - showcase
  - release
---

Every component shipped in IDEA-1..3 needs an entry in the showcase's Components section (src/showcase.tsx), following the existing Entry + Control pattern (live component + variant/size/state toggles). The showcase is the library's documentation surface — nothing ships undocumented.

### Phases
- [x] Tier 1 entries: IconButton, Stamp, Tooltip, Toast (+ extend Button entry with danger/icons/isActive)

### Log
- 2026-08-04 — IconButton and Stamp entries live (with variant/size/dot controls, clickable-stamp counter demo); Button entry gained the danger option; Card entry shows sm/md sizes plus a keyboard-accessible clickable card. Tooltip/Toast entries pending their components.
- [ ] Tier 2 entries: form controls, Modal, feedback components
- [ ] Tier 3 entries: gap-fillers + icon-set grid
