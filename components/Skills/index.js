import React, { useEffect, useRef, useState } from 'react';
import { Code2, Server, Wrench } from 'lucide-react';
import Reveal from '../ui/Reveal';

const GROUP_META = {
  Frontend: {
    icon: Code2,
    blurb: 'Interfaces, motion & state',
    chip: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
  },
  Backend: {
    icon: Server,
    blurb: 'APIs, data & services',
    chip: 'bg-sky-500/10 text-sky-700 dark:text-sky-400',
  },
  Tools: {
    icon: Wrench,
    blurb: 'Ship, debug & deliver',
    chip: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
  },
};

const SkillRow = ({ skill, animate }) => {
  const level = skill.level ?? 75;
  return (
    <li>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
          {skill.name}
        </span>
        <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
          {level}%
        </span>
      </div>
      <div
        className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800"
        role="progressbar"
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${skill.name} proficiency`}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-[width] duration-1000 ease-out"
          style={{ width: animate ? `${level}%` : '0%' }}
        />
      </div>
    </li>
  );
};

const SkillGroup = ({ title, skills, animate }) => {
  const meta = GROUP_META[title] || GROUP_META.Tools;
  const Icon = meta.icon;
  return (
    <div className="flex h-full flex-col rounded-3xl border border-zinc-200 bg-white p-6 shadow-[0_2px_16px_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.10)] dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-none dark:hover:border-zinc-700">
      <div className="mb-1 flex items-center gap-3">
        <span className={`grid h-10 w-10 place-items-center rounded-2xl ${meta.chip}`}>
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-zinc-900 dark:text-white">
            {title}
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">{meta.blurb}</p>
        </div>
        <span className="ml-auto rounded-full bg-zinc-100 px-2.5 py-1 font-mono text-[11px] text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
          {skills?.length || 0}
        </span>
      </div>
      <ul className="mt-4 space-y-3.5">
        {skills?.map((skill) => (
          <SkillRow key={skill.name} skill={skill} animate={animate} />
        ))}
      </ul>
    </div>
  );
};

const Skills = ({ skills }) => {
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setRevealed(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const total =
    (skills?.frontend?.length || 0) +
    (skills?.backend?.length || 0) +
    (skills?.tools?.length || 0);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="bg-[#FFFBF2] py-20 px-4 sm:px-6 lg:px-8 dark:bg-dark-bg"
    >
      <div className="max-w-5xl mx-auto">
        <div className={`mb-12 transition-all duration-500 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-700 mb-3 dark:text-emerald-400">
            03 — Skills
          </div>
          <h2 className="zk-display text-5xl sm:text-6xl tracking-tight text-zinc-900 dark:text-white">
            Tech Stack
          </h2>
          <p className="mt-3 text-zinc-600 max-w-2xl dark:text-zinc-400">
            {total} technologies I use in production — grouped by where they ship,
            with honest proficiency from daily use.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <Reveal delay={0} className="h-full">
            <SkillGroup title="Frontend" skills={skills.frontend} animate={revealed} />
          </Reveal>
          <Reveal delay={90} className="h-full">
            <SkillGroup title="Backend" skills={skills.backend} animate={revealed} />
          </Reveal>
          <Reveal delay={180} className="h-full">
            <SkillGroup title="Tools" skills={skills.tools} animate={revealed} />
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Skills;
