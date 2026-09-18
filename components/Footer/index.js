import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const CREAM = '#F7F6EB';
const INK = '#141414';

// Exact Framer Sites spring from designbomb.it:
// initial { opacity: 0.001, y: 150 } → animate { opacity: 1, y: 0,
// transition: { bounce: 0.2, delay: 0.7, duration: 1, type: 'spring' } }
// GSAP has no spring solver, elastic.out(1, 0.65) is the closest match
// (slight overshoot, ~1s settle, no endless wobble).
const SPRING_EASE = 'elastic.out(1, 0.65)';

const STICKERS = [
  { text: 'React', bg: '#CEFF00', color: INK, rotate: -8, x: '6%', y: '18%' },
  { text: 'Next.js', bg: CREAM, color: INK, rotate: 6, x: '22%', y: '8%' },
  { text: 'TypeScript', bg: '#4A60FF', color: CREAM, rotate: -4, x: '42%', y: '16%' },
  { text: 'React Flow', bg: '#FF5CD1', color: INK, rotate: 7, x: '63%', y: '10%' },
  { text: 'Open to work ●', bg: CREAM, color: INK, rotate: -6, x: '82%', y: '20%' },
  { text: 'UI / UX', bg: '#FF6B00', color: INK, rotate: 5, x: '12%', y: '58%' },
  { text: 'Mumbai → Remote', bg: CREAM, color: INK, rotate: -3, x: '34%', y: '66%' },
  { text: 'Workflow automation', bg: '#7DF9FF', color: INK, rotate: 4, x: '58%', y: '60%' },
  { text: '∞ Flows', bg: INK, color: CREAM, rotate: -7, x: '80%', y: '62%', outline: true },
];

const TICKER_QUOTES = [
  { text: '\u201CInterfaces that think in flows\u201D', bg: '#CEFF00', color: INK, shape: 'pill', rotate: -3 },
  { text: 'React \u2022 Next.js \u2022 TypeScript', bg: '#4A60FF', color: CREAM, shape: 'ticket', rotate: 2 },
  { text: '\u201CShip fast, break nothing\u201D', bg: '#FF5CD1', color: INK, shape: 'tag', rotate: -2 },
  { text: 'Workflow automation, beautifully visual', bg: CREAM, color: INK, shape: 'pill', rotate: 3 },
  { text: '\u201COpen to work \u2014 Mumbai / Remote\u201D', bg: '#FF6B00', color: INK, shape: 'burst', rotate: 0 },
  { text: 'React Flow \u2022 UI/UX \u2022 Motion', bg: '#7DF9FF', color: INK, shape: 'ticket', rotate: -3 },
  { text: '\u201CDesign is intelligence made visible\u201D', bg: CREAM, color: INK, shape: 'tag', rotate: 2 },
  { text: 'Let\u2019s build something rare', bg: '#CEFF00', color: INK, shape: 'pill', rotate: -2 },
];

const shapeStyle = (shape) => {
  switch (shape) {
    case 'ticket':
      return { borderRadius: '8px', borderStyle: 'dashed', borderWidth: '1.5px' };
    case 'tag':
      return { borderRadius: '4px 14px 4px 14px' };
    case 'burst':
      return { borderRadius: '999px', clipPath: 'polygon(3% 15%, 7% 5%, 15% 2%, 25% 0%, 35% 3%, 45% 0%, 55% 3%, 65% 0%, 75% 3%, 85% 1%, 93% 6%, 98% 15%, 100% 30%, 98% 45%, 100% 60%, 97% 75%, 92% 88%, 84% 95%, 72% 99%, 60% 97%, 48% 100%, 36% 97%, 24% 99%, 13% 95%, 5% 88%, 0% 75%, 2% 60%, 0% 45%, 2% 30%)', paddingLeft: '1.1rem', paddingRight: '1.1rem' };
    default:
      return { borderRadius: '999px' };
  }
};

const Footer = ({ data }) => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const rootRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const playgroundRef = useRef(null);
  const tickerRef = useRef(null);
  const stickerRefs = useRef([]);
  const dragState = useRef({ active: -1, startX: 0, startY: 0, baseX: 0, baseY: 0 });

  const name = data ? `${data.name} ${data.surname}` : 'Abhishek Gharat';
  const contactEmail = data?.email || 'gharatabhi53@gmail.com';

  // useEffect (not useLayoutEffect): avoids SSR warning, GSAP still runs on mount.
  // GSAP entrance needs measured layout, so refresh triggers after first paint.
  useEffect(() => {
    if (typeof window === 'undefined' || !rootRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // ── 1. Entrance — mirrors Framer appear exactly ──
      gsap.set([titleRef.current, formRef.current], { opacity: 0.001, y: 150 });
      gsap.set('.gsap-sticker', { opacity: 0, y: 90 });

      gsap.to(titleRef.current, {
        opacity: 1, y: 0, duration: 1, delay: 0.15, ease: SPRING_EASE,
        scrollTrigger: { trigger: rootRef.current, start: 'top 85%', once: true },
      });
      // form + privacy share delay 0.7 like 1olzzf9 / ovcuup on designbomb
      gsap.to(formRef.current, {
        opacity: 1, y: 0, duration: 1, delay: 0.7, ease: SPRING_EASE,
        scrollTrigger: { trigger: rootRef.current, start: 'top 85%', once: true },
      });
      gsap.to('.gsap-sticker', {
        opacity: 1, y: 0, duration: 0.9, ease: SPRING_EASE, stagger: 0.08, delay: 0.3,
        scrollTrigger: { trigger: playgroundRef.current, start: 'top 88%', once: true },
      });

      if (reduceMotion) return;

      // ── 2. Ticker — infinite, seamless (xPercent -33.333 = 1/3 loop) ──
      gsap.to(tickerRef.current, {
        xPercent: -33.333, duration: 22, ease: 'none', repeat: -1,
      });

      // ── 3. Float loop per sticker (y + rotation wobble, staggered) ──
      stickerRefs.current.forEach((el, i) => {
        if (!el) return;
        const inner = el.querySelector('.gsap-sticker-inner');
        gsap.to(inner, {
          y: -12, duration: 1.7 + (i % 4) * 0.35, ease: 'sine.inOut',
          yoyo: true, repeat: -1, delay: i * 0.25,
        });
        gsap.to(inner, {
          rotation: `+=2.5`, duration: 2.2 + (i % 3) * 0.4, ease: 'sine.inOut',
          yoyo: true, repeat: -1, delay: i * 0.2,
        });
      });

      // ── 4. Mouse parallax via quickTo (no re-renders, single transform) ──
      const setters = stickerRefs.current.map((el, i) => (el ? {
        x: gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' }),
        y: gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' }),
        depth: 14 + i * 4,
      } : null));

      const onMove = (e) => {
        if (dragState.current.active !== -1) return;
        const r = playgroundRef.current.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        setters.forEach((s) => {
          if (!s) return;
          s.x(nx * s.depth);
          s.y(ny * s.depth);
        });
      };
      const onLeave = () => {
        setters.forEach((s) => {
          if (!s) return;
          s.x(0);
          s.y(0);
        });
      };
      const pg = playgroundRef.current;
      pg.addEventListener('mousemove', onMove);
      pg.addEventListener('mouseleave', onLeave);

      return () => {
        pg.removeEventListener('mousemove', onMove);
        pg.removeEventListener('mouseleave', onLeave);
      };
    }, rootRef);

    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => ctx.revert();
  }, []);

  // ── Pointer drag (GSAP-set, no plugin needed) ──
  const onStickerDown = (i) => (e) => {
    const el = stickerRefs.current[i];
    if (!el) return;
    e.preventDefault();
    dragState.current = {
      active: i,
      startX: e.clientX, startY: e.clientY,
      baseX: gsap.getProperty(el, 'x'), baseY: gsap.getProperty(el, 'y'),
    };
    gsap.to(el, { scale: 1.12, duration: 0.2, ease: 'power2.out' });
    window.addEventListener('pointermove', onStickerMove);
    window.addEventListener('pointerup', onStickerUp, { once: true });
  };
  const onStickerMove = (e) => {
    const d = dragState.current;
    if (d.active === -1) return;
    const el = stickerRefs.current[d.active];
    gsap.set(el, { x: d.baseX + (e.clientX - d.startX), y: d.baseY + (e.clientY - d.startY) });
  };
  const onStickerUp = () => {
    const d = dragState.current;
    if (d.active !== -1 && stickerRefs.current[d.active]) {
      // elastic snap-back toward parallax origin, like a physics canvas
      gsap.to(stickerRefs.current[d.active], { scale: 1, duration: 0.5, ease: SPRING_EASE });
    }
    dragState.current.active = -1;
    window.removeEventListener('pointermove', onStickerMove);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      // shake on error, GSAP style
      gsap.fromTo(formRef.current.querySelector('form'), { x: 0 }, { x: -8, duration: 0.06, repeat: 5, yoyo: true, clearProps: 'x' });
      setTimeout(() => setStatus('idle'), 2200);
      return;
    }
    setStatus('sending');
    const subject = encodeURIComponent(`Portfolio inquiry from ${email}`);
    const body = encodeURIComponent(`Hi Abhishek,\n\n${email} wants to get in touch via your footer.\n\n— sent from portfolio footer`);
    setTimeout(() => {
      window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
      setStatus('done');
      setEmail('');
      setTimeout(() => setStatus('idle'), 4000);
    }, 600);
  };

  return (
    <footer ref={rootRef} id="contact" className="bg-[#FFFBF2] px-4 pt-4 pb-2 text-zinc-900 dark:bg-[#141414] dark:text-[#F7F6EB]">
      <div className="max-w-[1400px] mx-auto">
        <div className="rounded-2xl bg-white border border-zinc-200 dark:bg-[#141414] dark:border-[#F7F6EB]/25 overflow-hidden">
          {/* Header: title + form */}
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-6 p-6 sm:p-10 lg:p-12">
            <div ref={titleRef} style={{ opacity: 0.001 }}>
              <h2
                className="font-condensed font-semibold text-zinc-900 dark:text-[#F7F6EB]"
                style={{ fontSize: 'clamp(2.75rem, 6vw, 4rem)', letterSpacing: '-0.03em', lineHeight: 0.9 }}
              >
                Let&apos;s build
                <br />
                something rare
              </h2>
              <p className="mt-4 text-[18px] leading-[1.1] text-zinc-600 dark:text-[#F7F6EB]/90 max-w-md">
                Drop your email — I reply within 24 hours. No spam, just builds.
              </p>
              <nav className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
                {[
                  { href: '#hero', label: 'Top' },
                  { href: '#experience', label: 'Experience' },
                  { href: '#projects', label: 'Projects' },
                  { href: '#contact', label: 'Contact' },
                ].map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className="group relative font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500 hover:text-zinc-900 dark:text-[#F7F6EB]/70 dark:hover:text-[#F7F6EB] transition-colors duration-200"
                  >
                    {l.label}
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#CEFF00] transition-all duration-300 group-hover:w-full" />
                  </a>
                ))}
              </nav>
            </div>

            <div ref={formRef} style={{ opacity: 0.001 }}>
              <form onSubmit={submit} className="flex w-full flex-row gap-2">
                <input
                  type="email"
                  name="EMAIL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  aria-label="Email address"
                  className="flex-1 min-w-0 rounded-md bg-zinc-100 text-zinc-900 placeholder:text-zinc-400 px-4 py-4 text-[16px] leading-none outline-none border border-zinc-200 dark:bg-[#F7F6EB] dark:text-[#141414] dark:placeholder:text-[#141414]/50 dark:border-[#F7F6EB]"
                  style={{ transition: 'all 0.2s ease' }}
                />
                <button
                  type="submit"
                  aria-label="Send email"
                  className="shrink-0 rounded-md bg-zinc-900 text-white px-5 py-4 flex items-center justify-center hover:bg-[#CEFF00] hover:text-[#141414] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] disabled:opacity-70 dark:bg-[#F7F6EB] dark:text-[#141414]"
                  style={{ transition: 'all 0.2s ease' }}
                  disabled={status === 'sending'}
                >
                  {status === 'done' ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  ) : status === 'sending' ? (
                    <span className="block w-4 h-4 border-2 border-white/30 border-t-white dark:border-[#141414]/30 dark:border-t-[#141414] rounded-full animate-spin" />
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
                  )}
                </button>
              </form>
              <p className="mt-3 text-[10px] leading-[1.3] text-zinc-500 dark:text-[#F7F6EB]/80 max-w-md">
                {status === 'done'
                  ? '✓ Opening your mail app — talk soon.'
                  : status === 'error'
                    ? 'Please enter a valid email address.'
                    : (
                      <>
                        *By subscribing, you agree to receive a personal reply from {name.split(' ')[0]} — no newsletters, no tracking. See{' '}
                        <a href="#contact" className="underline underline-offset-2 hover:text-emerald-600 dark:hover:text-[#CEFF00] transition-colors">contact</a>.
                      </>
                    )}
              </p>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-zinc-300 dark:border-[#F7F6EB]/25 px-4 py-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-600 dark:text-[#F7F6EB]/80">Open to work</span>
              </div>
            </div>
          </div>

          {/* ── Interactive playground (canvas homage, GSAP-driven) ── */}
          <div
            ref={playgroundRef}
            className="relative h-[320px] sm:h-[420px] lg:h-[500px] overflow-hidden border-t border-zinc-200 dark:border-[#F7F6EB]/10 select-none"
          >
            <div className="absolute top-0 left-0 right-0 overflow-hidden py-2.5 border-b border-zinc-200 bg-[#FFFBF2] dark:border-[#F7F6EB]/10 dark:bg-[#141414]">
              <div ref={tickerRef} className="flex w-max gap-4 items-center will-change-transform">
                {[...TICKER_QUOTES, ...TICKER_QUOTES, ...TICKER_QUOTES].map((q, i) => (
                  <span
                    key={i}
                    className="font-condensed font-bold text-[13px] tracking-wide px-4 py-1.5 border whitespace-nowrap"
                    style={{
                      background: q.bg,
                      color: q.color,
                      borderColor: 'rgba(247,246,235,0.4)',
                      transform: `rotate(${q.rotate}deg)`,
                      textTransform: 'none',
                      ...shapeStyle(q.shape),
                    }}
                  >
                    {q.text}
                  </span>
                ))}
              </div>
            </div>

            <div
              className="absolute inset-0 opacity-60 dark:opacity-[0.35] pointer-events-none [background-image:radial-gradient(rgba(24,24,27,0.14)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(247,246,235,0.18)_1px,transparent_1px)]"
              style={{ backgroundSize: '26px 26px' }}
            />

            {STICKERS.map((s, i) => (
              <div
                key={s.text}
                ref={(el) => { stickerRefs.current[i] = el; }}
                onPointerDown={onStickerDown(i)}
                className="gsap-sticker absolute cursor-grab active:cursor-grabbing touch-none"
                style={{ left: s.x, top: s.y, opacity: 0 }}
              >
                <div
                  className="gsap-sticker-inner font-condensed font-bold uppercase whitespace-nowrap px-5 py-2.5 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.45)] will-change-transform"
                  style={{
                    background: s.bg,
                    color: s.color,
                    fontSize: 'clamp(0.95rem, 2vw, 1.35rem)',
                    letterSpacing: '0.01em',
                    rotate: `${s.rotate}deg`,
                    border: s.outline ? `1px solid ${CREAM}` : '1px solid rgba(0,0,0,0.25)',
                  }}
                >
                  {s.text}
                </div>
              </div>
            ))}

            <div
              className="gsap-watermark pointer-events-none absolute bottom-[-2vw] left-1/2 -translate-x-1/2 font-condensed font-black uppercase leading-none whitespace-nowrap text-transparent [-webkit-text-stroke:1px_rgba(24,24,27,0.25)] dark:[-webkit-text-stroke:1px_rgba(247,246,235,0.22)]"
              style={{ fontSize: 'clamp(4rem, 14vw, 12rem)' }}
            >
              {data?.surname || 'GHARAT'}®
            </div>

            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-400 dark:text-[#F7F6EB]/40 pointer-events-none">
              drag the stickers — it&apos;s alive
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-2 sm:px-3 py-5 text-[14px] text-zinc-600 dark:text-[#F7F6EB]">
          <a href="#hero" className="hover:text-zinc-900 dark:hover:text-[#CEFF00] transition-colors duration-200">
            Proudly built by {name}
          </a>
          <div className="flex items-center gap-5">
            {data?.socials?.filter((s) => s.title !== 'Email').map((s) => (
              <a
                key={s.id}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-600 hover:text-zinc-900 dark:text-[#F7F6EB]/90 dark:hover:text-[#CEFF00] transition-colors duration-200"
              >
                {s.title}
              </a>
            )) || null}
            <span className="hidden sm:inline text-zinc-400 dark:text-[#F7F6EB]/40">© {currentYear}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-zinc-500 dark:text-[#F7F6EB]/60 font-mono text-xs">Mumbai, IN</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top"
              className="w-9 h-9 rounded-full border border-zinc-300 flex items-center justify-center hover:bg-zinc-900 hover:text-white dark:border-[#F7F6EB]/40 dark:hover:bg-[#F7F6EB] dark:hover:text-[#141414] transition-all duration-200 hover:-translate-y-0.5"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
