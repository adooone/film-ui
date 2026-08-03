import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Backdrop, Button, Card, Glass, cn } from './index';

type ComponentKey = 'button' | 'card';
const components: ComponentKey[] = ['button', 'card'];

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

function Showcase() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [selected, setSelected] = useState<ComponentKey>('button');

  // Button config
  const [variant, setVariant] = useState<'primary' | 'secondary' | 'ghost'>('primary');
  const [size, setSize] = useState<'sm' | 'md'>('md');
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <Backdrop className="h-screen">
      <div className="flex h-screen">
        {/* Left — title + component nav; subtitle + theme switcher at the bottom */}
        <div className="flex w-1/2 flex-col p-12">
          <div>
            <p className="font-mono text-sm uppercase tracking-wide text-accent">film ui</p>
            <h1 className="mt-3 font-title text-5xl font-bold leading-tight">
              Frosted.
              <br />
              Noisy.
              <br />
              Cosy.
            </h1>

            <nav className="mt-10">
              <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
                {components.map((c) => (
                  <li key={c}>
                    <button
                      type="button"
                      onClick={() => setSelected(c)}
                      className={cn(
                        'group flex items-center py-1 font-mono text-xl lowercase transition-colors',
                        selected === c ? 'text-primary' : 'hover:text-primary',
                      )}
                    >
                      <span
                        className={cn(
                          'mr-2 text-primary transition-opacity',
                          selected === c ? 'opacity-100' : 'opacity-20 group-hover:opacity-100',
                        )}
                      >
                        ➭
                      </span>
                      {c}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="mt-auto flex flex-col gap-3">
            <p className="opacity-80">A glossy, noisy, cosy React component library.</p>
            <button
              type="button"
              onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
              className="self-start font-mono text-sm lowercase text-accent"
            >
              theme: {theme}
            </button>
          </div>
        </div>

        {/* Right — a single live component + description + controls */}
        <Glass className="flex w-1/2 flex-col gap-10 overflow-y-auto p-12">
          {selected === 'button' && (
            <>
              <div>
                <h2 className="font-title text-3xl font-bold">Button</h2>
                <p className="mt-3 max-w-md opacity-80">
                  A chunky, uppercase action with a hard offset shadow that snaps flush when
                  pressed.
                </p>
              </div>
              <div className="flex min-h-[140px] items-center justify-center">
                <Button variant={variant} size={size} disabled={disabled}>
                  Button
                </Button>
              </div>
              <div className="flex flex-col gap-3">
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
            </>
          )}

          {selected === 'card' && (
            <>
              <div>
                <h2 className="font-title text-3xl font-bold">Card</h2>
                <p className="mt-3 max-w-md opacity-80">
                  A frosted surface with the film offset shadow, for grouping related content.
                </p>
              </div>
              <div className="flex min-h-[140px] items-center justify-center">
                <Card className="max-w-xs">
                  <Card.Title>Frosted card</Card.Title>
                  <Card.Body>A translucent panel that sits above the noisy background.</Card.Body>
                </Card>
              </div>
            </>
          )}
        </Glass>
      </div>
    </Backdrop>
  );
}

const container = document.getElementById('root');
if (container) createRoot(container).render(<Showcase />);
