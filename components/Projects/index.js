import React, { useRef, useEffect, useState } from 'react';

// Workflow node component for projects
const ProjectWorkflowNode = ({ project, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const getProjectColor = (idx) => {
    const colors = ['#00ff88', '#7c3aed', '#f59e0b', '#ef4444', '#3b82f6'];
    return colors[idx % colors.length];
  };

  const color = getProjectColor(index);

  return (
    <div
      className={`relative transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Connection lines from previous node - hidden on mobile */}
      {index > 0 && (
        <div className="hidden lg:block absolute -top-8 left-1/2 w-px h-8 bg-gradient-to-b from-[#1a1a2e] to-[#252540]">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#252540]" />
        </div>
      )}

      {/* Node container */}
      <div
        className="relative border transition-all duration-300"
        style={{
          borderColor: isHovered || isSelected ? color : '#1a1a2e',
          background: '#0a0a10',
          borderLeft: isHovered || isSelected ? `3px solid ${color}` : '1px solid #1a1a2e',
          boxShadow: isHovered ? `0 0 30px ${color}20` : 'none',
        }}
      >
        {/* Node header */}
        <div
          className="px-3 sm:px-4 py-2 border-b flex items-center justify-between flex-wrap gap-2"
          style={{ borderColor: '#1a1a2e' }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: color, boxShadow: `0 0 10px ${color}` }}
            />
            <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.15em] uppercase text-[#8888aa]">
              System_0{index + 1}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {project.featured && (
              <span
                className="font-mono text-[7px] sm:text-[8px] px-2 py-0.5 uppercase"
                style={{ background: `${color}20`, color }}
              >
                Featured
              </span>
            )}
            <span className="font-mono text-[8px] sm:text-[9px] text-[#555570]">
              2024
            </span>
          </div>
        </div>

        {/* Node content */}
        <div className="p-3 sm:p-4 md:p-6 space-y-4">
          {/* Logo + Title Section */}
          <div className="flex items-center gap-3">
            {project.logo && (
              <div
                className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-lg border-2 flex items-center justify-center text-2xl sm:text-3xl"
                style={{
                  borderColor: color,
                  background: `${color}10`,
                  boxShadow: `0 0 15px ${color}15`
                }}
              >
                {project.logo}
              </div>
            )}
            <h3
              className="font-condensed text-base sm:text-lg md:text-xl lg:text-2xl font-bold uppercase transition-colors duration-300 break-words flex-1"
              style={{ color: isHovered ? color : '#fff' }}
            >
              {project.title}
            </h3>
          </div>

          {/* Project visualization */}
          <div
            className="relative aspect-video overflow-hidden border rounded-lg transition-all duration-500"
            style={{
              borderColor: isHovered ? color : '#1a1a2e',
              background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
              boxShadow: isHovered ? `inset 0 0 20px ${color}10` : 'none'
            }}
          >
            {/* Grid pattern background */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `linear-gradient(0deg, transparent 24%, ${color}40 25%, ${color}40 26%, transparent 27%, transparent 74%, ${color}40 75%, ${color}40 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, ${color}40 25%, ${color}40 26%, transparent 27%, transparent 74%, ${color}40 75%, ${color}40 76%, transparent 77%, transparent)`,
                backgroundSize: '50px 50px'
              }}
            />

            {/* Center geometric design */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="relative transition-transform duration-500"
                style={{ transform: isHovered ? 'scale(1.15) rotate(8deg)' : 'scale(1)' }}
              >
                {/* Outer ring */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    width: '80px',
                    height: '80px',
                    border: `2px solid ${color}40`,
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                />
                {/* Inner geometric pattern */}
                <div
                  className="absolute"
                  style={{
                    width: '60px',
                    height: '60px',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: `linear-gradient(135deg, ${color}20 0%, ${color}05 100%)`
                  }}
                >
                  {/* Cross pattern */}
                  <div
                    className="absolute"
                    style={{
                      width: '2px',
                      height: '100%',
                      backgroundColor: color,
                      opacity: 0.3,
                      left: '50%',
                      transform: 'translateX(-50%)'
                    }}
                  />
                  <div
                    className="absolute"
                    style={{
                      height: '2px',
                      width: '100%',
                      backgroundColor: color,
                      opacity: 0.3,
                      top: '50%',
                      transform: 'translateY(-50%)'
                    }}
                  />
                  {/* Corner dots */}
                  {[
                    { top: '10%', left: '10%' },
                    { top: '10%', right: '10%' },
                    { bottom: '10%', left: '10%' },
                    { bottom: '10%', right: '10%' }
                  ].map((pos, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        width: '4px',
                        height: '4px',
                        backgroundColor: color,
                        opacity: 0.6,
                        ...pos
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a10] via-transparent to-transparent opacity-60" />
          </div>

          {/* Description */}
          <p className="text-[#8888aa] text-xs sm:text-sm leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2">
            {project.tags?.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="font-mono text-[7px] sm:text-[8px] border px-2 py-1 transition-all duration-300 whitespace-nowrap"
                style={{
                  borderColor: isHovered ? color : '#1a1a2e',
                  color: isHovered ? color : '#8888aa',
                }}
              >
                {tag}
              </span>
            ))}
            {project.tags && project.tags.length > 4 && (
              <span
                className="font-mono text-[7px] sm:text-[8px] border px-2 py-1 text-[#8888aa]"
                style={{ borderColor: '#1a1a2e' }}
              >
                +{project.tags.length - 4}
              </span>
            )}
          </div>

          {/* Actions - Responsive */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t" style={{ borderColor: '#1a1a2e' }}>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center sm:justify-start gap-2 font-mono text-[9px] sm:text-xs tracking-[0.1em] uppercase transition-all duration-300 px-3 py-2 rounded border"
                style={{
                  color: isHovered ? color : '#fff',
                  borderColor: isHovered ? color : '#1a1a2e',
                  background: isHovered ? `${color}10` : 'transparent'
                }}
              >
                <span>Live Demo</span>
                <svg className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            )}

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center sm:justify-start gap-2 font-mono text-[9px] sm:text-xs tracking-[0.1em] uppercase px-3 py-2 rounded border transition-all duration-300"
                style={{
                  color: isHovered ? color : '#8888aa',
                  borderColor: isHovered ? color : '#1a1a2e',
                  background: isHovered ? `${color}10` : 'transparent'
                }}
              >
                <span>Source</span>
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Output handle */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#1a1a2e] border border-[#252540]" />
      </div>

      {/* Vertical connection to next - hidden on mobile */}
      {!project.isLast && (
        <div className="hidden lg:block absolute -bottom-8 left-1/2 w-px h-8 bg-gradient-to-b from-[#252540] to-[#1a1a2e]" />
      )}
    </div>
  );
};

// Workflow visualization showing project flow
const ProjectWorkflow = ({ projects }) => {
  const featured = projects.filter(p => p.featured);
  const others = projects.filter(p => !p.featured);

  return (
    <div className="relative">
      {/* Input node */}
      <div className="flex justify-center mb-8 sm:mb-12">
        <div className="border border-[#00ff88] bg-[#00ff88] px-4 sm:px-6 py-2 sm:py-3 rounded">
          <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] text-[#050508] flex items-center justify-center gap-2 flex-wrap">
            <span className="w-2 h-2 bg-[#050508] rounded-full animate-pulse" />
            Projects Pipeline
          </span>
        </div>
      </div>

      {/* Connection line - hidden on mobile */}
      <div className="hidden lg:flex justify-center mb-12">
        <div className="w-px h-8 bg-gradient-to-b from-[#00ff88] to-[#1a1a2e] relative">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#1a1a2e]" />
        </div>
      </div>

      {/* Featured projects grid - Full width on mobile, 2 cols on tablet/desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
        {featured.map((project, index) => (
          <ProjectWorkflowNode
            key={project.id}
            project={project}
            index={index}
            isVisible={true}
          />
        ))}
      </div>

      {/* Branch node for additional projects */}
      {others.length > 0 && (
        <>
          <div className="flex justify-center mb-8 sm:mb-12">
            <div className="relative">
              <div className="w-px h-8 bg-[#1a1a2e]" />
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-20 sm:w-32 h-px bg-[#1a1a2e]" />
              <div className="absolute top-8 left-1/2 -translate-x-1/2 font-mono text-[8px] sm:text-[10px] text-[#555570] uppercase tracking-wider bg-[#050508] px-2 -mt-3">
                Branch
              </div>
            </div>
          </div>

          {/* Other projects - 1 col on mobile, 2 cols on tablet, 3 cols on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {others.map((project, index) => (
              <ProjectWorkflowNode
                key={project.id}
                project={{...project, isLast: index === others.length - 1}}
                index={index + featured.length}
                isVisible={true}
              />
            ))}
          </div>
        </>
      )}

      {/* Output */}
      <div className="flex justify-center mt-12 sm:mt-16">
        <div className="border border-[#1a1a2e] bg-[#0a0a10] px-4 sm:px-6 py-2 sm:py-3 rounded">
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.15em] text-[#8888aa] flex items-center justify-center gap-2 flex-wrap">
            <span className="w-2 h-2 rounded-full bg-[#00ff88]" />
            Production Ready
          </span>
        </div>
      </div>
    </div>
  );
};

const Projects = ({ projects }) => {
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
        }
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(#00ff88 1px, transparent 1px),
            linear-gradient(90deg, #00ff88 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div
          className={`mb-12 sm:mb-16 md:mb-20 transition-all duration-700 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="section-eyebrow">
            <span>02</span>
            <span>Deployed Systems</span>
          </div>
          <h2 className="section-title">
            System<br />
            <span className="text-[#00ff88]">Workflow</span>
          </h2>
          <p className="mt-4 text-[#8888aa] max-w-2xl text-sm sm:text-base leading-relaxed">
            A selection of production systems I've built, visualized as a workflow pipeline.
          </p>
        </div>

        {/* Workflow Visualization */}
        <div className={`transition-all duration-700 delay-200 ${revealed ? 'opacity-100' : 'opacity-0'}`}>
          <ProjectWorkflow projects={projects} />
        </div>

        {/* GitHub Link */}
        <div className={`mt-12 sm:mt-16 text-center transition-all duration-700 delay-500 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a
            href="https://github.com/Abhishek-Gharat"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 font-mono text-[10px] sm:text-xs tracking-[0.15em] uppercase text-[#00ff88] border border-[#00ff88] px-4 sm:px-6 py-2 sm:py-3 transition-all duration-300 hover:bg-[#00ff88] hover:text-[#050508] rounded"
          >
            <span>View All Systems</span>
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
