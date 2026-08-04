import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { type CSSProperties, type ReactNode, type Ref, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Backdrop, Button, Card, Glass, cn } from './index';

const sections = ['welcome', 'components', 'tokens', 'docs'] as const;

// Long enough that one copy always exceeds the panel width; rendered twice
// for the seamless -50% marquee loop.
const marqueeText = 'frosted · noisy · cosy · funky · '.repeat(3);

// Titles and title-refrains only — song titles aren't copyrightable,
// full lyric verses are.
const funkLines = [
  { quote: 'We want the funk — give up the funk', src: 'parliament · 1975' },
  { quote: 'One nation under a groove', src: 'funkadelic · 1978' },
  { quote: 'Play that funky music', src: 'wild cherry · 1976' },
  { quote: 'Get up offa that thing', src: 'james brown · 1976' },
  { quote: "Le freak, c'est chic", src: 'chic · 1978' },
  { quote: 'Dance to the music', src: 'sly & the family stone · 1968' },
  { quote: 'Get down on it', src: 'kool & the gang · 1981' },
];
type Section = (typeof sections)[number];

function Control<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="w-24 shrink-0 font-mono text-xs uppercase tracking-wide opacity-50">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={cn(
              'border px-3 py-1 font-mono text-sm lowercase transition-colors',
              value === opt
                ? 'border-accent text-accent'
                : 'border-black/15 opacity-60 hover:opacity-100 dark:border-white/15',
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function SectionBlock({
  id,
  title,
  lead,
  innerRef,
  children,
}: {
  id: string;
  title: string;
  lead?: string;
  innerRef?: Ref<HTMLElement>;
  children: ReactNode;
}) {
  return (
    <section ref={innerRef} id={id} className="scroll-mt-10">
      <h2 className="font-title text-3xl font-bold">{title}</h2>
      {lead && <p className="mt-3 max-w-lg opacity-70">{lead}</p>}
      <div className="mt-6 flex flex-col gap-12">{children}</div>
    </section>
  );
}

function Entry({
  name,
  description,
  children,
}: {
  name: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div>
      <h3 className="font-mono text-sm uppercase tracking-wide text-accent">{name}</h3>
      <p className="mt-2 max-w-md opacity-80">{description}</p>
      {children && <div className="mt-5">{children}</div>}
    </div>
  );
}

function Swatch({ name, color }: { name: string; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="h-10 w-10 shrink-0 shadow-[3px_3px_0_0_var(--fui-shadow-color)]"
        style={{ backgroundColor: color }}
      />
      <div>
        <p className="font-mono text-sm lowercase">{name}</p>
        <p className="font-[ui-monospace,monospace] text-xs opacity-60">{color}</p>
      </div>
    </div>
  );
}

function Showcase() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() =>
    localStorage.getItem('fui-theme') === 'light' ? 'light' : 'dark',
  );
  const [active, setActive] = useState<Section>('welcome');

  const wrapperRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const componentsRef = useRef<HTMLElement>(null);

  const [variant, setVariant] = useState<'primary' | 'secondary' | 'ghost'>('primary');
  const [size, setSize] = useState<'sm' | 'md'>('md');
  const [disabled, setDisabled] = useState(false);

  // A different line every visit, like the lamp.
  const [funkLine] = useState(() => funkLines[Math.floor(Math.random() * funkLines.length)]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('fui-theme', theme);
  }, [theme]);

  // Scrub the ½ ⇄ ⅔ layout with scroll, then snap to the nearer state on
  // release — GSAP ScrollTrigger handles both.
  useEffect(() => {
    const scroller = scrollRef.current;
    const trigger = componentsRef.current;
    const left = leftRef.current;
    const wrapper = wrapperRef.current;
    if (!scroller || !trigger || !left || !wrapper) return;

    // Tween --fui-glow-x on the Glow svg itself, not the wrapper: animating an
    // inherited custom property on the page root invalidates styles for the
    // whole subtree on every scrubbed frame. The wrapper keeps the static var
    // as the pre-mount position.
    const glowSvg = wrapper.querySelector('svg');

    gsap.registerPlugin(ScrollTrigger);
    // Skip the scrub under prefers-reduced-motion (the CSS layers already
    // honour it) — the layout simply stays at the ½ state.
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger,
          scroller,
          start: 'top bottom',
          end: 'top 48px',
          scrub: 0.6,
          snap: {
            snapTo: [0, 1],
            duration: { min: 0.2, max: 0.6 },
            ease: 'power2.inOut',
          },
        },
      });
      tl.fromTo(left, { width: '50%' }, { width: '33.333%', ease: 'none' }, 0);
      if (glowSvg) {
        tl.fromTo(
          glowSvg,
          { '--fui-glow-x': '-30vw' },
          { '--fui-glow-x': '-38vw', ease: 'none' },
          0,
        );
      }
    });
    return () => mm.revert();
  }, []);

  // Highlight the nav item for the section currently in view.
  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as Section);
        }
      },
      { root, rootMargin: '-35% 0px -60% 0px' },
    );
    for (const s of sections) {
      const el = document.getElementById(s);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const scrollTo = (s: Section) => {
    document.getElementById(s)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div ref={wrapperRef} className="h-screen" style={{ '--fui-glow-x': '-30vw' } as CSSProperties}>
      <Backdrop className="h-screen">
        <div className="flex h-screen">
          {/* Left — title + section nav; shrinks as Components reaches the top */}
          <div ref={leftRef} className="flex shrink-0 flex-col p-12" style={{ width: '50%' }}>
            <div>
              <p className="font-mono text-sm font-bold uppercase tracking-wide text-accent">
                func ui
              </p>
              <h1 className="mt-3 font-title text-5xl font-bold leading-tight">
                Frosted.
                <br />
                Noisy.
                <br />
                Cosy.
              </h1>

              <nav className="mt-10">
                <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
                  {sections.map((s) => (
                    <li key={s}>
                      <button
                        type="button"
                        onClick={() => scrollTo(s)}
                        className={cn(
                          'group flex items-center py-1 font-mono text-lg lowercase transition-colors',
                          active === s ? 'text-primary' : 'hover:text-primary',
                        )}
                      >
                        <span
                          className={cn(
                            'mr-2 text-primary transition-opacity',
                            active === s ? 'opacity-100' : 'opacity-20 group-hover:opacity-100',
                          )}
                        >
                          ➭
                        </span>
                        {s}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="mt-auto flex flex-col gap-3">
              {/* Fixed measure — the width scrub must not rewrap this every frame */}
              <p className="max-w-xs opacity-80">A funky little UI library for React.</p>
              <button
                type="button"
                onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
                className="self-start font-mono text-sm font-bold lowercase text-accent"
              >
                theme: {theme}
              </button>
            </div>
          </div>

          {/* Right — frost lives on Glass; scrolling happens in a plain child
              so the blur surface never repaints on scroll */}
          <Glass className="flex-1">
            <div
              ref={scrollRef}
              className="flex h-full flex-col gap-16 overflow-x-hidden overflow-y-auto p-12"
            >
              {/* Welcome fills the panel's first viewport, so Components sits
                  right at the fold and the width scrub starts on first scroll.
                  Composition flows diagonally: text top-left (mirroring the
                  page title), start-here card middle-right, marquee bottom. */}
              <section id="welcome" className="flex min-h-full scroll-mt-10 flex-col">
                {/* Top-right — a funk line, set like the library tagline in
                    the opposite corner */}
                <div className="self-end text-right">
                  <p className="ml-auto max-w-sm opacity-80">{funkLine.quote}</p>
                  <p className="mt-2 font-mono text-sm font-bold lowercase text-accent">
                    {funkLine.src}
                  </p>
                </div>

                {/* Ghost marquee — drifts through the empty centre of the
                    view; the edges dissolve via mask instead of a hard clip.
                    The track is absolutely positioned so its huge nowrap
                    width can't inflate the flex line; content duplicated
                    twice for a seamless loop */}
                <div
                  className="pointer-events-none relative my-auto h-32 select-none overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
                  aria-hidden
                >
                  <div className="absolute left-0 top-0 animate-[marquee_55s_linear_infinite] whitespace-nowrap font-sans text-9xl font-bold uppercase leading-none opacity-[0.05] motion-reduce:animate-none">
                    <span>{marqueeText}</span>
                    <span>{marqueeText}</span>
                  </div>
                </div>

                {/* Bottom-right corner — point-symmetric to "Frosted." top-left */}
                <div className="self-end text-right">
                  <h2 className="font-title text-5xl font-bold leading-tight">Welcome!</h2>
                  <Button className="mt-6" onClick={() => scrollTo('components')}>
                    Explore components
                  </Button>
                </div>
              </section>

              <SectionBlock
                id="components"
                title="Components"
                innerRef={componentsRef}
                lead="Interactive elements built on the foundations — each theme-aware and re-skinnable through the --fui-* tokens."
              >
                <Entry
                  name="Button"
                  description="A chunky, uppercase action with a hard offset shadow that snaps flush when pressed."
                >
                  <div className="flex min-h-[100px] items-center">
                    <Button variant={variant} size={size} disabled={disabled}>
                      Button
                    </Button>
                  </div>
                  <div className="mt-4 flex flex-col gap-3">
                    <Control
                      label="variant"
                      options={['primary', 'secondary', 'ghost'] as const}
                      value={variant}
                      onChange={setVariant}
                    />
                    <Control
                      label="size"
                      options={['sm', 'md'] as const}
                      value={size}
                      onChange={setSize}
                    />
                    <Control
                      label="disabled"
                      options={['false', 'true'] as const}
                      value={disabled ? 'true' : 'false'}
                      onChange={(v) => setDisabled(v === 'true')}
                    />
                  </div>
                </Entry>

                <Entry
                  name="Card"
                  description="A frosted surface with the film offset shadow, for grouping related content."
                >
                  <Card className="max-w-xs">
                    <Card.Title>Frosted card</Card.Title>
                    <Card.Body>A translucent panel that sits above the noisy background.</Card.Body>
                  </Card>
                </Entry>
              </SectionBlock>

              <SectionBlock
                id="tokens"
                title="Tokens"
                lead="Theme-aware design tokens, exposed as CSS variables — override any --fui-* to re-skin the whole library."
              >
                <Entry name="Colour" description="Theme-aware colours driven by CSS variables.">
                  <div className="flex flex-col gap-3">
                    <Swatch name="accent" color="#2BA579" />
                    <Swatch name="glow" color="#36CE91" />
                  </div>
                </Entry>
                <Entry name="Typography" description="Serif titles, geometric body and accents.">
                  <div className="flex flex-col gap-2">
                    <p className="font-title text-2xl">KyivType Serif — titles</p>
                    <p className="text-lg">Montserrat Alternates — body</p>
                    <p className="font-mono text-lg lowercase">montserrat alternates — accents</p>
                  </div>
                </Entry>
              </SectionBlock>

              <SectionBlock id="docs" title="Docs" lead="Getting started with the package.">
                <Entry name="Install" description="Add the package and import the stylesheet once.">
                  <pre className="overflow-x-auto bg-black/20 p-4 font-[ui-monospace,monospace] text-sm dark:bg-black/40">
                    {`pnpm add @dendelion/func-ui

import { Backdrop, Glass, Button } from '@dendelion/func-ui';
import '@dendelion/func-ui/dist/index.css';`}
                  </pre>
                </Entry>
                <Entry
                  name="Foundations"
                  description="The atmosphere is four layered primitives, composed once as the page shell — everything else sits on top of them."
                >
                  <ul className="m-0 flex max-w-md list-none flex-col gap-2 p-0">
                    <li>
                      <span className="font-mono text-sm text-accent">backdrop</span> — the
                      full-bleed shell composing the layers below over the base colour
                    </li>
                    <li>
                      <span className="font-mono text-sm text-accent">grain</span> — a drifting
                      film-noise texture with theme-aware opacity
                    </li>
                    <li>
                      <span className="font-mono text-sm text-accent">glow</span> — the lava-lamp
                      ambient behind a soft halo, tinted by the --fui-glow token
                    </li>
                    <li>
                      <span className="font-mono text-sm text-accent">glass</span> — a heavy
                      backdrop blur over a translucent fill; the panel you're reading
                    </li>
                  </ul>
                </Entry>
              </SectionBlock>
            </div>
          </Glass>
        </div>
      </Backdrop>
    </div>
  );
}

const container = document.getElementById('root');
if (container) createRoot(container).render(<Showcase />);
