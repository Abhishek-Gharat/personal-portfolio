"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

// --- Sky hero ---------------------------------------------------------------
// Original artwork + motion built with the reference's mechanics:
// layered day/night sky, drifting clouds, per-letter entrance, rolling verb,
// vinyl-player widget, scroll parallax, wave divider into the next section.
// Night mode follows the site's existing `.dark` class on <html>.

export interface SkyHeroProps {
  eyebrow?: string;
  line1?: string;
  rollWords?: string[];
  playerTitle?: string;
  verticalText?: string;
  tagline?: string;
  primaryCta?: string;
  onPrimaryCta?: () => void;
  secondaryCtaHref?: string;
  githubHref?: string;
  linkedinHref?: string;
}

const LOOP_SECONDS = 120;
const ROLL_MS = 2600;
const ROLL_EASE = "transform 560ms cubic-bezier(0.22, 1.15, 0.36, 1)";

export const SkyHero = ({
  eyebrow = "Hello, I'm Abhishek Gharat —",
  line1 = "Developer who",
  rollWords = ["Builds", "Ships", "Scales", "Automates"],
  playerTitle = "Dev journey, looped",
  verticalText = "REACT / NEXT.JS / FLOWS",
  tagline = "React · Next.js · React Flow — production interfaces",
  primaryCta = "View My Work",
  onPrimaryCta,
  secondaryCtaHref = "/resume",
  githubHref = "https://github.com/Abhishek-Gharat",
  linkedinHref = "https://www.linkedin.com/in/abhishek-gharat-922237218/",
}: SkyHeroProps = {}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sunRef = useRef<HTMLDivElement>(null);
  const [night, setNight] = useState(false);
  const [reduced, setReduced] = useState(false);

  // ---- night follows site theme -------------------------------------------
  useEffect(() => {
    const el = document.documentElement;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setNight(el.classList.contains("dark"));
      setReduced(mq.matches);
    };
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(el, { attributes: true, attributeFilter: ["class"] });
    mq.addEventListener?.("change", sync);
    return () => {
      obs.disconnect();
      mq.removeEventListener?.("change", sync);
    };
  }, []);

  // ---- scroll parallax (single rAF, direct style writes) --------------------
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let raf = 0;
    let queued = false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const update = () => {
      queued = false;
      const y = window.scrollY;
      const vh = window.innerHeight || 1;
      if (y > vh * 1.2) return; // hero offscreen — no work
      const p = Math.min(y / vh, 1);
      if (contentRef.current) {
        contentRef.current.style.transform = reduce
          ? ""
          : `translate3d(0, ${(y * 0.28).toFixed(1)}px, 0) scale(${(1 - 0.08 * p).toFixed(4)})`;
        contentRef.current.style.opacity = String(1 - 0.55 * p);
      }
      if (sunRef.current && !reduce) {
        sunRef.current.style.transform = `translate3d(0, ${(y * 0.12).toFixed(1)}px, 0)`;
      }
      root.querySelectorAll<HTMLElement>("[data-px]").forEach((n) => {
        if (reduce) return;
        const s = parseFloat(n.dataset.px || "0");
        n.style.transform = `translate3d(0, ${(y * s).toFixed(1)}px, 0)`;
      });
    };
    const onScroll = () => {
      if (queued) return;
      queued = true;
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // ---- rolling verb ----------------------------------------------------------
  // (index mirrored in a ref so the interval never writes state inside a
  // state updater — updaters must stay pure under double-invocation)
  const words = useMemo(() => [...rollWords, rollWords[0]], [rollWords]);
  const [rollIdx, setRollIdx] = useState(0);
  const [rollInstant, setRollInstant] = useState(false);
  const rollIdxRef = useRef(0);
  useEffect(() => {
    if (reduced || rollWords.length < 2) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const advance = () => {
      const next = rollIdxRef.current + 1;
      if (next >= words.length) {
        // on the duplicate: snap back to 0 without transition
        setRollInstant(true);
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            rollIdxRef.current = 0;
            setRollIdx(0);
            setRollInstant(false);
          })
        );
        return;
      }
      rollIdxRef.current = next;
      setRollIdx(next);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !timer) timer = setInterval(advance, ROLL_MS);
        else if (!e.isIntersecting && timer) {
          clearInterval(timer);
          timer = undefined;
        }
      },
      { threshold: 0 }
    );
    if (rootRef.current) io.observe(rootRef.current);
    return () => {
      io.disconnect();
      if (timer) clearInterval(timer);
    };
  }, [reduced, words, rollWords.length]);

  // ---- letter split for line 1 ----------------------------------------------
  const line1Words = useMemo(() => line1.split(" "), [line1]);
  let charClock = 0;

  // ---- deterministic stars (no hydration mismatch) ---------------------------
  const stars = useMemo(
    () =>
      Array.from({ length: 42 }, (_, i) => ({
        left: `${(i * 37.7 + 11) % 100}%`,
        top: `${(i * 53.3 + 5) % 62}%`,
        delay: `${-((i * 0.7) % 3.2).toFixed(1)}s`,
        size: i % 5 === 0 ? 4 : 3,
      })),
    []
  );

  return (
    <div ref={rootRef} className={`zk-hero relative w-full overflow-hidden ${night ? "zk-night" : ""}`}>
      {/* sky base */}
      <div aria-hidden="true" className="zk-sky absolute inset-0" />
      <div aria-hidden="true" className="zk-grain pointer-events-none absolute inset-0" />

      {/* stars (night) */}
      <div aria-hidden="true" className="zk-stars pointer-events-none absolute inset-0">
        {stars.map((s, i) => (
          <span key={i} style={{ left: s.left, top: s.top, animationDelay: s.delay, width: s.size, height: s.size }} />
        ))}
      </div>

      {/* sun + moon (shared parallax anchor) */}
      <div ref={sunRef} aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-[340px] w-[min(48vw,400px)]">
        <div className="zk-sun absolute -right-10 -top-24 aspect-square w-[min(34vw,340px)] transition-opacity duration-700" />
        {/* moon: smaller disc, fully in view with breathing room from the corner.
            Glow comes from the disc's own round box-shadow so no box edge
            can ever show around it. */}
        <div className="absolute right-8 top-10 aspect-square w-[clamp(96px,10vw,140px)] sm:right-16 sm:top-[52px]">
          <div className="zk-moon absolute inset-0 rounded-full" />
        </div>
      </div>

      {/* clouds */}
      <Cloud className="zk-cloud absolute left-[30%] top-[11%] w-36 text-white opacity-90 dark:opacity-25" speed={0.18} />
      <Cloud className="zk-cloud zk-cloud-b absolute right-[30%] top-[7%] w-24 text-white opacity-80 dark:opacity-20" speed={0.32} />
      <Cloud className="zk-cloud zk-cloud-c absolute left-[56%] top-[54%] w-48 text-white opacity-60 dark:opacity-15" speed={0.26} />

      {/* birds */}
      <Bird className="zk-bird absolute left-[8%] top-[56%] w-16 text-white/90" delay="0s" />
      <Bird className="zk-bird absolute left-[15%] top-[61%] w-10 text-white/70" delay="-3s" />
      <Bird className="zk-bird absolute right-[38%] top-[58%] w-14 text-white/80" delay="-5s" />

      {/* vertical rail */}
      <p
        aria-hidden="true"
        className="absolute left-5 top-1/2 hidden -translate-y-1/2 select-none font-mono text-[12px] tracking-[0.35em] text-white/90 lg:block"
        style={{ writingMode: "vertical-rl", transform: "translateY(-50%) rotate(180deg)" }}
      >
        {verticalText}
      </p>

      {/* content */}
      <div ref={contentRef} className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-40 pt-28 sm:px-8 sm:pt-32 lg:pt-36">
        <p className="font-mono text-[13px] uppercase tracking-[0.14em] text-white sm:text-sm">
          <span aria-hidden="true" className="zk-dot mr-3 inline-block h-2 w-2 rounded-full bg-[#f6c740]" />
          {eyebrow}
        </p>

        <h1
          className="mt-5 font-bold text-[#fff9e9]"
          style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(3.2rem, 10.5vw, 8.5rem)", lineHeight: 1.04, letterSpacing: "0.02em" }}
        >
          <span className="sr-only">Abhishek Gharat, Frontend Developer in Mumbai, India — </span>
          <span aria-hidden="true">
            {line1Words.map((w, wi) => (
              <span key={wi} className="zk-mask">
                {w.split("").map((ch, ci) => {
                  const d = 150 + charClock++ * 26;
                  return (
                    <span key={ci} className="zk-letter" style={{ animationDelay: reduced ? "0ms" : `${d}ms` }}>
                      {ch}
                    </span>
                  );
                })}
                {wi < line1Words.length - 1 && <span>&nbsp;</span>}
              </span>
            ))}
          </span>
          <span aria-hidden="true" className="mt-1 flex flex-wrap items-center gap-x-8 gap-y-5">
            <Player title={playerTitle} />
            <span className="zk-roll-viewport inline-block max-w-full">
              <span
                className="zk-roll block"
                style={{ transform: `translateY(${-rollIdx}em)`, transition: rollInstant ? "none" : ROLL_EASE }}
              >
                {words.map((w, i) => (
                  <span key={i} className="zk-roll-word">
                    {w}
                  </span>
                ))}
              </span>
            </span>
          </span>
        </h1>

        {/* hiring CTAs, styled into the scene */}
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onPrimaryCta}
            className="rounded-full bg-[#fff9e9] px-7 py-3 text-sm font-semibold text-zinc-900 shadow-lg transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
          >
            {primaryCta}
          </button>
          <a
            href={secondaryCtaHref}
            download="Abhishek_Gharat_Resume.pdf"
            className="rounded-full border-2 border-[#fff9e9]/70 px-7 py-[10px] text-sm font-semibold text-[#fff9e9] drop-shadow-sm transition-colors hover:border-[#fff9e9] hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
          >
            Download Resume
          </a>
          <span className="ml-1 flex items-center gap-4 text-sm font-medium text-[#fff9e9]/85">
            <a href={githubHref} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="transition-colors hover:text-white">
              GitHub
            </a>
            <a href={linkedinHref} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="transition-colors hover:text-white">
              LinkedIn
            </a>
          </span>
        </div>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white/85 drop-shadow-sm">{tagline}</p>
      </div>

      {/* wave into next section (cream paper / site dark-bg) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-[-1px] z-[5] text-[#FFFBF2] dark:text-[#0a0a0f]">
        <svg viewBox="0 0 1440 140" preserveAspectRatio="none" className="block h-[72px] w-full sm:h-[110px]">
          <path
            fill="currentColor"
            d="M0 78 C 120 50 200 96 320 84 C 440 72 480 30 620 44 C 760 58 800 100 940 88 C 1080 76 1140 40 1280 52 C 1360 59 1400 70 1440 64 L1440 140 L0 140 Z"
          />
          <ellipse cx="180" cy="70" rx="90" ry="26" fill="currentColor" />
          <ellipse cx="1230" cy="60" rx="110" ry="30" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
};

/* --- fluffy cloud, original path ------------------------------------------ */
const Cloud = ({ className = "", speed = 0.2 }: { className?: string; speed?: number }) => (
  <div aria-hidden="true" data-px={speed} className={`pointer-events-none ${className}`}>
    <svg viewBox="0 0 220 90" className="h-auto w-full" fill="currentColor">
      <ellipse cx="60" cy="62" rx="52" ry="24" />
      <ellipse cx="115" cy="48" rx="58" ry="30" />
      <ellipse cx="170" cy="62" rx="44" ry="22" />
      <ellipse cx="110" cy="66" rx="80" ry="20" />
    </svg>
  </div>
);

/* --- tiny gull ---------------------------------------------------------------- */
const Bird = ({ className = "", delay = "0s" }: { className?: string; delay?: string }) => (
  <svg aria-hidden="true" viewBox="0 0 64 20" style={{ animationDelay: delay }} className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <path d="M4 14 Q 16 4 30 12 Q 44 4 60 12" />
  </svg>
);

/* --- vinyl player widget -------------------------------------------------------
   Original look, real function: toggles a small generative WebAudio loop so the
   disks, progress and timer are live — no fake UI. */
const SCALE = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33];

const Player = ({ title }: { title: string }) => {
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const rig = useRef<{
    ctx: AudioContext;
    master: GainNode;
    timer: ReturnType<typeof setInterval>;
    raf: number;
    nextTime: number;
    note: number;
    startedAt: number;
    accrued: number;
  } | null>(null);

  const stopRig = () => {
    const r = rig.current;
    if (!r) return;
    clearInterval(r.timer);
    cancelAnimationFrame(r.raf);
    r.accrued += r.ctx.currentTime - r.startedAt;
    void r.ctx.suspend();
  };

  const tick = () => {
    const r = rig.current;
    if (!r) return;
    const t = (r.accrued + (r.ctx.currentTime - r.startedAt)) % LOOP_SECONDS;
    setElapsed(t);
    r.raf = requestAnimationFrame(tick);
  };

  const pluck = (ctx: AudioContext, master: GainNode, freq: number, when: number) => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.value = freq;
    g.gain.setValueAtTime(0, when);
    g.gain.linearRampToValueAtTime(0.5, when + 0.015);
    g.gain.exponentialRampToValueAtTime(0.001, when + 1.1);
    osc.connect(g).connect(master);
    osc.start(when);
    osc.stop(when + 1.2);
  };

  const toggle = async () => {
    if (playing) {
      stopRig();
      setPlaying(false);
      return;
    }
    let r = rig.current;
    if (!r) {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctx();
      const master = ctx.createGain();
      master.gain.value = 0.14;
      const delay = ctx.createDelay();
      delay.delayTime.value = 0.32;
      const fb = ctx.createGain();
      fb.gain.value = 0.3;
      master.connect(ctx.destination);
      master.connect(delay).connect(fb).connect(delay);
      // gentle lowpass so the loop sits under the page like background music
      const lp = ctx.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = 2400;
      master.disconnect();
      master.connect(lp).connect(ctx.destination);
      master.connect(delay).connect(fb).connect(delay).connect(lp);
      r = { ctx, master, timer: 0 as unknown as ReturnType<typeof setInterval>, raf: 0, nextTime: 0, note: 3, startedAt: 0, accrued: 0 };
      rig.current = r;
    }
    await r.ctx.resume();
    r.startedAt = r.ctx.currentTime;
    r.nextTime = r.ctx.currentTime + 0.06;
    r.timer = setInterval(() => {
      if (!rig.current) return;
      while (r.nextTime < r.ctx.currentTime + 0.45) {
        r.note = Math.max(0, Math.min(SCALE.length - 1, r.note + (Math.random() < 0.5 ? -1 : 1) * (Math.random() < 0.25 ? 2 : 1)));
        pluck(r.ctx, r.master, SCALE[r.note], r.nextTime);
        if (Math.random() < 0.3) pluck(r.ctx, r.master, SCALE[r.note] / 2, r.nextTime + 0.21);
        r.nextTime += 0.42;
      }
    }, 150);
    r.raf = requestAnimationFrame(tick);
    setPlaying(true);
  };

  useEffect(
    () => () => {
      const r = rig.current;
      if (r) {
        clearInterval(r.timer);
        cancelAnimationFrame(r.raf);
        void r.ctx.close().catch(() => {});
        rig.current = null;
      }
    },
    []
  );

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  const pct = (elapsed / LOOP_SECONDS) * 100;

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-3 rounded-full bg-[#dfdcd5] py-2 pl-2 pr-5 text-zinc-900 shadow-xl sm:gap-4 sm:py-2.5 sm:pl-3 sm:pr-7 ${playing ? "zk-playing" : ""}`}
      role="region"
      aria-label={`Audio player — ${title}`}
      style={{ width: "min(376px, 100%)" }}
    >
      <Disk />
      <span className="flex min-w-0 flex-1 flex-col items-stretch gap-1">
        <span className="truncate font-mono text-[10px] tracking-wide text-zinc-700 sm:text-[11px]">{title}</span>
        <span className="relative h-[7px] overflow-hidden rounded-full bg-zinc-900/80" aria-hidden="true">
          <span className="absolute inset-y-0 left-0 rounded-full bg-[#f6c740]" style={{ width: `${pct}%` }} />
          <span className="absolute left-1 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-[#fbf7ec]" style={{ left: `calc(${pct}% - 5px)` }} />
        </span>
        <span className="flex items-center justify-between font-mono text-[10px] text-zinc-700">
          <span>{fmt(elapsed)}</span>
          <span className="zk-eq text-zinc-800" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span>{fmt(LOOP_SECONDS)}</span>
        </span>
      </span>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause" : "Play"}
        aria-pressed={playing}
        className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-zinc-900 text-[#fbf7ec] transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/60"
      >
        {playing ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
            <rect x="1.5" y="1" width="4" height="12" rx="1" />
            <rect x="8.5" y="1" width="4" height="12" rx="1" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
            <path d="M3.5 1.8v10.4c0 .8.9 1.3 1.6.9l8-5.2c.6-.4.6-1.4 0-1.8l-8-5.2c-.7-.4-1.6.1-1.6.9z" />
          </svg>
        )}
      </button>
      <Disk />
    </span>
  );
};

/* --- vinyl disk, pure CSS ------------------------------------------------------ */
const Disk = () => (
  <span aria-hidden="true" className="zk-disk relative block h-14 w-14 shrink-0 rounded-full bg-zinc-950 sm:h-[72px] sm:w-[72px]">
    <span
      className="absolute inset-0 rounded-full"
      style={{ background: "repeating-radial-gradient(circle at 50% 50%, #0a0a0a 0 2px, #26262a 2px 4px)" }}
    />
    <span className="absolute inset-0 rounded-full" style={{ background: "conic-gradient(from 20deg, transparent 0 40deg, rgba(255,255,255,0.16) 55deg, transparent 75deg)" }} />
    <span className="absolute left-1/2 top-1/2 grid h-5 w-5 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#e89a1c] sm:h-6 sm:w-6">
      <span className="h-1.5 w-1.5 rounded-full bg-[#fbf7ec]" />
    </span>
  </span>
);
