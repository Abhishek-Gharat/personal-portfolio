import React, { useState } from 'react';
import Reveal from '../ui/Reveal';
import LegoOnboarding from '../ui/interactive-tech-stack-builder';

const AI_NOTES = [
  {
    n: '01',
    title: 'Quotas live server-side, or they don\u2019t exist',
    body: 'Free previews are consumed with a row-locked UPDATE \u2026 WHERE used < 3 and fail closed \u2014 no session means unauthorized, never ok:true. Hugging Face runs the same playbook: anonymous buckets per IP on 5-minute windows, 429s with reset headers. Client-side counters are decoration.',
    tag: 'HF rate-limit tiers',
  },
  {
    n: '02',
    title: 'Anonymous \u2260 Sybil-open',
    body: 'Trials bind to the OS machine UID with highest-seen-wins across SQLite, keychain and localStorage, so reinstalls can\u2019t reset the 3-query preview. YC\u2019s current Requests for Startups literally asks for a trust layer proving you\u2019re human \u2014 free tiers live or die on exactly this.',
    tag: 'YC RFS: Proving You\u2019re Human',
  },
  {
    n: '03',
    title: 'Route before you pay',
    body: 'hosted-auth / hosted-trial / BYOK / none is resolved before any provider work runs; BYOK skips credits entirely and trial spend happens once per user request, never on continuations. It mirrors Hugging Face billing: credits apply to routed calls only, custom keys bill the provider.',
    tag: 'HF routed vs custom-key',
  },
  {
    n: '04',
    title: 'Evals are the feature',
    body: 'A 184-test harness with routing truth tables and a blocked-telemetry error taxonomy (TrialExhausted, Suspended, HostedAuthRequired). YC\u2019s newest agent startups sell exactly this \u2014 continuous red-teaming \u2014 because agents change behavior without code changing.',
    tag: 'YC agent red-teaming wave',
  },
];

const StackBuilder = () => {
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

        <Reveal delay={100}>
          <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-[#f8ece4] shadow-[0_2px_16px_rgba(0,0,0,0.04)] dark:border-zinc-800 dark:bg-zinc-950">
            <LegoOnboarding
              className="!min-h-0"
              onComplete={handleComplete}
            />
          </div>
        </Reveal>

        {/* Advanced AI engineering notes — hiring signal, not filler */}
        <div className="mt-12">
          <Reveal className="mb-6">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
              Production AI notes
            </div>
            <h3 className="zk-display mt-2 text-3xl tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
              What shipping AI actually teaches you
            </h3>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {AI_NOTES.map((note, i) => (
              <Reveal key={note.n} delay={(i % 2) * 90} className="h-full">
                <article className="flex h-full flex-col rounded-3xl border border-zinc-200 bg-white p-6 shadow-[0_2px_16px_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.10)] dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-none dark:hover:border-zinc-700">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
                      {note.n}
                    </span>
                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-400">
                      {note.tag}
                    </span>
                  </div>
                  <h4 className="mt-3 text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
                    {note.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {note.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StackBuilder;
