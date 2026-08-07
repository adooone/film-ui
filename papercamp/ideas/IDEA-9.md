---
id: IDEA-9
title: Glass frost flickers on scroll — move the filter off the scroller's ancestry
type: fix
status: done
created: 2026-08-05
updated: 2026-08-07
tags:
  - components
  - rendering
---

The frosted panel flickered during small scrolls on macOS Chrome, reproduced and diagnosed live in the owner's browser via a striped test element behind the panel: in steady state the blur smears it correctly; on a scroll tick the blurred wash vanished for a frame — the backdrop-filter transiently drops while its render surface is invalidated.

Root cause: the original flicker fix moved the blur off the scroll *element* but the Glass host remained the scroller's **ancestor**, so inner-scroll invalidations still propagated into the filter's render surface. Chromium then transiently mis-composites the blur.

Fix: the frost now lives on a `::before` layer inside Glass — a *sibling* of the scrolling content, absolutely positioned behind it (`z-index: -1`, host gets `z-index: 0`, no `isolation` — that would create a backdrop root and break sampling). Inner scrolling can no longer touch the filter. `blur={0}` travels as `--fui-glass-backdrop: none`; the blur radius stays on `--fui-glass-blur`. Verified with the same probe: the wash now survives scroll ticks in both directions.

Also fixed in passing: Select's dropdown carried a raw `backdrop-filter: blur(12px)` without the `--fui-nested-backdrop` switch — a latent nested-filter regression whenever it opens inside a Glass surface.

### Phases
- [x] Move the frost to a ::before sibling layer in the glass mixin
- [x] Route blur={0} and blur radius through custom properties to the pseudo
- [x] Verify live on the affected machine (probe wash survives scroll ticks)
- [x] Give Select's dropdown the --fui-nested-backdrop switch
