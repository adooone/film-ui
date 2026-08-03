import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Backdrop, Glass } from './index';

const navItems = ['foundations', 'components', 'tokens', 'docs'];

function Showcase() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <Backdrop className="h-screen">
      <div className="flex h-screen">
        {/* Left — title + nav on top, subtitle + theme switcher at the bottom */}
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
                {navItems.map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      className="group flex items-center py-1 font-mono text-xl lowercase transition-colors hover:text-primary"
                    >
                      <span className="mr-2 text-primary opacity-20 transition-opacity group-hover:opacity-100">
                        ➭
                      </span>
                      {item}
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

        {/* Right — frosted panel */}
        <Glass className="w-1/2 p-12" />
      </div>
    </Backdrop>
  );
}

const container = document.getElementById('root');
if (container) createRoot(container).render(<Showcase />);
