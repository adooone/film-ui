# Film UI

A glossy, noisy, cosy React component library — **frosted glass**, **film grain**,
and a **lava-lamp glow**. Extracted from the [df.adoo.one](https://df.adoo.one) CV site.

> `@dendelion/film-ui` · React 18 · Tailwind-friendly · CSS-modules under the hood

## Install

```bash
pnpm add @dendelion/film-ui
```

```tsx
import { Backdrop, Glass } from '@dendelion/film-ui';
import '@dendelion/film-ui/dist/index.css';

export default function App() {
  return (
    <Backdrop>
      <Glass className="p-12">Frosted. Noisy. Cosy.</Glass>
    </Backdrop>
  );
}
```

Toggle dark mode by adding/removing the `dark` class on `<html>` — every token
(`--fui-*`) retints automatically.

## Components (foundation)

| Component | What it is |
| --- | --- |
| `Backdrop` | Full-bleed ambient shell — composes `Glow` + `Grain` behind content |
| `Grain` | Drifting film-grain overlay |
| `Glow` | The lava-lamp gooey glow (colour follows `--fui-glow`) |
| `Glass` | The frosted translucent surface primitive |

More chunks (Card, Button, IconButton, ThemeToggle, Layout, Page, Nav) are on the way.

## Tailwind preset

```ts
// tailwind.config.ts
import { filmPreset } from '@dendelion/film-ui/tailwind';
export default { presets: [filmPreset], content: [/* ... */] };
```

## Develop

```bash
pnpm install
pnpm dev              # run the showcase
pnpm build            # build the library (dist/)
pnpm build:showcase   # build the showcase site (dist/app/)
pnpm ci               # types + lint + build
```

## License

MIT © Dendelion
