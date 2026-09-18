import React, { useState } from 'react';
import Reveal from '../ui/Reveal';
import LegoOnboarding from '../ui/interactive-tech-stack-builder';

const StackBuilder = () => {
  const [visible, setVisible] = useState(true);
  const [builtStack, setBuiltStack] = useState([]);

  const handleComplete = (stack) => {
    setBuiltStack(stack.map((m) => m.name));
    const contact = document.getElementById('contact');
    if (contact) {
      contact.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="stack-builder"
      aria-label="Interactive stack builder"
      className="bg-[#FFFBF2] px-4 pb-20 sm:px-6 lg:px-8 dark:bg-dark-bg"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-8 text-center">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
            04 — Playground
          </div>
          <h2 className="zk-display mt-3 text-5xl tracking-tight text-zinc-900 sm:text-6xl dark:text-white">
            Build My Stack
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
            Click the LEGO blocks to stack the tech I ship with.
            Hit Continue and you land at my inbox.
          </p>
          {builtStack.length > 0 && (
            <p className="mx-auto mt-3 inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-700 dark:text-emerald-300">
              Your stack: {builtStack.join(' + ')}
            </p>
          )}
        </Reveal>

        {visible ? (
          <Reveal delay={100}>
            <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-[#f8ece4] shadow-[0_2px_16px_rgba(0,0,0,0.04)] dark:border-zinc-800 dark:bg-zinc-950">
              <LegoOnboarding
                className="!min-h-0"
                onComplete={handleComplete}
                onSkip={() => setVisible(false)}
              />
            </div>
          </Reveal>
        ) : (
          <div className="text-center">
            <button
              type="button"
              onClick={() => setVisible(true)}
              className="rounded-xl border border-zinc-300 bg-white px-6 py-3 text-sm font-medium text-zinc-900 transition-colors hover:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:border-white"
            >
              Show playground
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default StackBuilder;
