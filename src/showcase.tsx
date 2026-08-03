import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Backdrop, Glass } from './index';

function Showcase() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className="flex h-screen">
      {/* Sidebar — half the screen, showing the noise + visible lava */}
      <aside className="w-1/2">
        <Backdrop className="h-full">
          <div className="flex h-full flex-col justify-between p-12">
            <div>
              <p className="font-mono text-sm uppercase tracking-wide text-accent">film ui</p>
              <h1 className="mt-3 font-title text-5xl font-bold leading-tight">
                Frosted.
                <br />
                Noisy.
                <br />
                Cosy.
              </h1>
            </div>
            <button
              type="button"
              onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
              className="self-start font-mono text-sm lowercase text-accent"
            >
              theme: {theme}
            </button>
          </div>
        </Backdrop>
      </aside>

      {/* Content — a frosted Glass panel */}
      <main className="flex w-1/2 items-center justify-center bg-bg p-12">
        <Glass className="w-full max-w-md p-10">
          <p className="font-mono text-sm uppercase tracking-wide text-accent">glass</p>
          <h2 className="mt-2 font-title text-2xl font-bold">The frosted surface</h2>
          <p className="mt-3 opacity-80">
            A translucent panel over the noisy, glowing sidebar — the core building block for cards
            and pages.
          </p>
        </Glass>
      </main>
    </div>
  );
}

const container = document.getElementById('root');
if (container) createRoot(container).render(<Showcase />);
