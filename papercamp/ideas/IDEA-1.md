---
id: IDEA-1
title: Tier 1 — the six workhorse components
type: feat
status: planned
created: 2026-08-04
updated: 2026-08-04
tags:
  - components
  - release
---

The paper-camp usage inventory (58 files audited) shows six paper-ui exports carry ~65% of all UI usage: Button (23 files), useToast (21), Card (21), Stamp (19), Tooltip (15), IconButton (13). func-ui must nail these first — everything else in the migration leans on them. `size="small"` is a near-monoculture in the app, so func-ui's `sm` is the tuned-by-default size.

Design decisions baked in: semantic status tokens (`--fui-status-*` fill/text pairs + `--fui-danger`) as the single source of truth replacing the app's seven duplicated color maps; Stamp gets a first-class clickable mode (the app's #1 documented gap — six hand-rolled `<button>` wrappers); Card gets `size="sm"` (kills the `[class*="textureLayer"]` CSS reach-in) and accessible `onClick` (kills four copy-pasted `role="button"` wrappers).

### Phases
- [x] Semantic status tokens in globals (`--fui-status-*` ×5 pairs, `--fui-danger`, theme-aware)
- [x] Button: `danger` variant, `icon`/`iconRight` slots, `isActive` pressed state with aria-pressed
- [x] IconButton: square frosted chip, default/ghost/danger, sm=28px/md=36px, required `label`
- [x] Stamp: 5 semantic variants + free-form fillColor/textColor + square dot + clickable mode with hover lift
- [x] Card: `size="sm"` dense padding + accessible `onClick` mode (role, tab stop, Enter/Space)
- [x] Tooltip: portal, top/bottom/left/right placement, delay, `content: undefined` disables
- [x] Toast: ToastProvider + useToast, info/success/warning/error variants, position, duration (0 = sticky)

### Log
- 2026-08-04 — First five phases landed; types/lint/build green. Tooltip + Toast (the portal pieces) remain.
- 2026-08-04 — Retargeted: func-ui now aims at the radio project ([[IDEA-6]]); paper-camp stays on paper-ui. Component set unchanged — the usage inventory still grounds the APIs.
- 2026-08-04 — All phases complete. Tooltip (portal, clamped, Escape/scroll/resize dismiss, focus-immediate) and Toast (portal stack, 6 positions, status-token accent bars, role=alert for errors) landed with showcase entries; build green.
