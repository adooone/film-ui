---
id: IDEA-4
title: Showcase entries for all components
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
- [x] Tier 2 entries: form controls, Modal, feedback components
- [ ] Tier 3 entries: gap-fillers + icon-set grid

### Log
- 2026-08-04 — IconButton and Stamp entries live (with variant/size/dot controls, clickable-stamp counter demo); Button entry gained the danger option; Card entry shows sm/md sizes plus a keyboard-accessible clickable card. Tooltip/Toast entries now live too.
- 2026-08-04 — Structure fix: an earlier Log insertion accidentally split the Phases list, orphaning the Tier 2/3 phases inside the Log — the idea parsed as one checked phase. Restored all three phases under Phases.
