import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Backdrop, Glass } from './index';

function Showcase() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <Backdrop className="h-screen">
      <div className="flex h-screen">
        {/* Left half — a frosted panel; the lava's left half shows through the glass */}
        <Glass className="flex w-1/2 flex-col justify-center gap-3 p-12">
          <p className="font-mono text-sm uppercase tracking-wide text-accent">film ui</p>
          <h1 className="font-title text-5xl font-bold leading-tight">
            Frosted.
            <br />
            Noisy.
            <br />
            Cosy.
          </h1>
          <p className="max-w-sm opacity-80">
            The lava lamp sits at the centre of the page — its left half diffused through this frosted
            panel, its right half glowing raw over the noisy background.
          </p>
          <button
            type="button"
            onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
            className="mt-2 self-start font-mono text-sm lowercase text-accent"
          >
            theme: {theme}
          </button>
        </Glass>

        {/* Right half — open noisy background */}
        <div className="w-1/2" />
      </div>
    </Backdrop>
  );
}

const container = document.getElementById('root');
if (container) createRoot(container).render(<Showcase />);
