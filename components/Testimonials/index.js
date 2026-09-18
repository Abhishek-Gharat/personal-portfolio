import React from 'react';
import Reveal from '../ui/Reveal';

// Kind words — renders only when `testimonials` exist in the portfolio data.
// Nothing is fabricated: with an empty list the section stays hidden.

const Testimonials = ({ testimonials = [] }) => {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section
      id="testimonials"
      aria-label="Testimonials"
      className="bg-[#FFFBF2] px-4 py-20 sm:px-6 lg:px-8 dark:bg-dark-bg"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-12 text-center">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
            Kind words
          </div>
          <h2 className="zk-display mt-3 text-5xl text-zinc-900 sm:text-6xl dark:text-white">
            What collaborators say
          </h2>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.id || i} delay={i * 100}>
              <figure className="flex h-full flex-col rounded-3xl border border-zinc-200 bg-white/80 p-7 shadow-sm backdrop-blur transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/70">
                <span aria-hidden="true" className="zk-display text-6xl leading-none text-emerald-600/80 dark:text-emerald-400/80">
                  &ldquo;
                </span>
                <blockquote className="mt-2 flex-1 text-[15px] leading-7 text-zinc-700 dark:text-zinc-300">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-zinc-100 pt-5 dark:border-zinc-800">
                  <div className="font-semibold text-zinc-900 dark:text-white">{t.name}</div>
                  {t.role && (
                    <div className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">{t.role}</div>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
