import React, { useRef, useEffect, useState } from 'react';
import Reveal from '../ui/Reveal';
import { ProjectCard } from '../ui/project-card';

// Themed glow per project — deep HSL tones that match the card gradient.
const THEME_COLORS = [
  '160 55% 28%', // ReactViz — emerald
  '258 55% 32%', // Exam Platform — violet
  '28 85% 38%', // Hotel Booking — amber
];

const Projects = ({ projects }) => {
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setRevealed(true);
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      aria-label="Featured work"
      className="bg-[#FFFBF2] px-5 pb-20 pt-14 sm:px-8 dark:bg-dark-bg"
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* Section heading */}
        <div className={`mb-10 transition-all duration-500 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-700 mb-3 dark:text-emerald-400">
            02 — Projects
          </div>
          <h2 className="zk-display text-5xl sm:text-6xl tracking-tight text-zinc-900 dark:text-white">
            Featured Work
          </h2>
          <p className="mt-3 text-zinc-600 max-w-2xl dark:text-zinc-400">
            Production apps I designed and shipped — live demos, real users, real code.
          </p>
        </div>

        {/* Cards: snap scroll on mobile, 3-up grid on desktop */}
        <div className={`flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 transition-all delay-100 duration-500 lg:grid lg:grid-cols-3 lg:overflow-visible ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {projects?.map((project, i) => (
            <Reveal
              key={project.id}
              delay={(i % 3) * 90}
              className="h-[520px] w-[85%] shrink-0 snap-center sm:w-[380px] lg:h-[540px] lg:w-auto"
            >
              <ProjectCard
                imageUrl={project.imageSrc}
                title={project.shortTitle || project.title}
                logo={project.logo}
                description={project.longDescription || project.description}
                tags={project.tags || []}
                liveUrl={project.url}
                githubUrl={project.github}
                featured={project.featured}
                themeColor={THEME_COLORS[i % THEME_COLORS.length]}
              />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://github.com/Abhishek-Gharat"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-900 border border-zinc-300 bg-white px-6 py-3 rounded-xl hover:border-zinc-900 transition-colors dark:text-white dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-white"
          >
            View all on GitHub →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
