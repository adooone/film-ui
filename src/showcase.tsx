import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Backdrop, Glass } from './index';

function Showcase() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <Backdrop>
      <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-6">
        <button
          type="button"
          onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
          className="font-mono text-sm lowercase text-accent"
        >
          theme: {theme}
        </button>

        <Glass className="max-w-2xl p-12">
          <p className="font-mono text-sm uppercase tracking-wide text-accent">film ui</p>
          <h1 className="mt-2 font-title text-4xl font-bold">Frosted. Noisy. Cosy.</h1>
          <p className="mt-4 opacity-80">
            A glossy, transparent surface floating over drifting film grain and a lava-lamp glow.
            Toggle the theme — the whole scene retints.
          </p>
        </Glass>

        <div className="flex flex-wrap justify-center gap-6">
          <Glass className="px-6 py-4 font-mono text-sm lowercase">grain</Glass>
          <Glass className="px-6 py-4 font-mono text-sm lowercase">glow</Glass>
          <Glass className="px-6 py-4 font-mono text-sm lowercase">glass</Glass>
        </div>
      </div>
    </Backdrop>
  );
}

const container = document.getElementById('root');
if (container) createRoot(container).render(<Showcase />);
