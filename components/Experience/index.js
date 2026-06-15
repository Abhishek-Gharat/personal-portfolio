import React, { useRef, useEffect, useState } from 'react';

// Process node for experience items
const ProcessNode = ({ item, index, isLast, isVisible }) => {
  const isEducation = item.institution !== undefined;
  const [isHovered, setIsHovered] = useState(false);

  const getNodeColor = (type) => {
    return type === 'experience' ? '#00ff88' : '#7c3aed';
  };

  const color = getNodeColor(isEducation ? 'education' : 'experience');

  return (
    <div
      className={`relative transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 200}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Input connection */}
      <div className="hidden lg:block absolute -top-8 left-8 w-px h-8 bg-gradient-to-b from-[#1a1a2e] to-[#252540]">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#252540]" />
      </div>

      {/* Node container */}
      <div
        className="relative border transition-all duration-300"
        style={{
          borderColor: isHovered ? color : '#1a1a2e',
          background: '#0a0a10',
          borderLeft: isHovered ? `3px solid ${color}` : '1px solid #1a1a2e',
        }}
      >
        {/* Header bar */}
        <div 
          className="px-4 py-2 border-b flex items-center justify-between"
          style={{ borderColor: '#1a1a2e' }}
        >
          <div className="flex items-center gap-2">
            <div 
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: color }}
            />
            <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#8888aa]">
              {isEducation ? 'Education_Node' : 'Experience_Node'}
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#555570] tracking-wider">
            {item.duration}
          </span>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-condensed text-xl md:text-2xl font-bold uppercase mb-2 text-white">
            {isEducation ? item.degree : item.position}
          </h3>
          <p 
            className="font-condensed text-lg mb-3 transition-colors duration-300"
            style={{ color: isHovered ? color : '#8888aa' }}
          >
            {isEducation ? item.institution : item.company}
          </p>
          <p className="text-[#8888aa] text-sm leading-relaxed mb-4">
            {item.description}
          </p>

          {/* Location */}
          <div className="flex items-center gap-2 mb-4 text-[#555570]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="font-mono text-xs">{item.location}</span>
          </div>

          {/* Achievements (experience only) */}
          {!isEducation && item.achievements && (
            <div className="mb-4 space-y-2">
              <div className="font-mono text-[10px] uppercase tracking-wider text-[#555570] mb-2">
                Output Data:
              </div>
              {item.achievements.map((achievement, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-[#8888aa]">
                  <span 
                    className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                    style={{ background: color }}
                  />
                  <span>{achievement}</span>
                </div>
              ))}
            </div>
          )}

          {/* Technologies */}
          {item.technologies && (
            <div className="pt-4 border-t" style={{ borderColor: '#1a1a2e' }}>
              <div className="font-mono text-[10px] uppercase tracking-wider text-[#555570] mb-2">
                Dependencies:
              </div>
              <div className="flex flex-wrap gap-2">
                {item.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[9px] border border-[#1a1a2e] px-2 py-1 text-[#8888aa] transition-all duration-300"
                    style={{
                      borderColor: isHovered ? color : '#1a1a2e',
                      color: isHovered ? color : '#8888aa',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Output handle */}
        <div className="absolute -bottom-1 left-8 w-3 h-3 rounded-full bg-[#1a1a2e] border border-[#252540]" />
      </div>

      {/* Output connection */}
      {!isLast && (
        <div className="hidden lg:block absolute -bottom-8 left-8 w-px h-8 bg-gradient-to-b from-[#252540] to-[#1a1a2e]">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#1a1a2e]" />
        </div>
      )}
    </div>
  );
};

// Workflow diagram showing process flow
const ExperienceWorkflow = ({ experience, education }) => {
  // Combine and sort by date
  const combined = [
    ...experience.map(item => ({ ...item, type: 'experience' })),
    ...education.map(item => ({ ...item, type: 'education' }))
  ].sort((a, b) => {
    const getYear = (duration) => {
      const match = duration.match(/(\d{4})/g);
      return match ? parseInt(match[match.length - 1]) : 0;
    };
    return getYear(b.duration) - getYear(a.duration);
  });

  return (
    <div className="relative max-w-3xl mx-auto">
      {/* Start node */}
      <div className="flex justify-center mb-8">
        <div className="border border-[#00ff88] bg-[#00ff88] px-6 py-3">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-[#050508] flex items-center gap-2">
            <span className="w-2 h-2 bg-[#050508] rounded-full animate-pulse" />
            Career_Start
          </span>
        </div>
      </div>

      {/* Connection */}
      <div className="hidden lg:flex justify-center mb-8">
        <div className="w-px h-8 bg-gradient-to-b from-[#00ff88] to-[#1a1a2e]" />
      </div>

      {/* Process nodes */}
      <div className="space-y-8">
        {combined.map((item, index) => (
          <div key={`${item.type}-${item.id}`} className="relative">
            {/* Side connector line */}
            <div className="hidden lg:block absolute left-0 top-8 bottom-0 w-16">
              <svg width="100%" height="100%" className="overflow-visible">
                <path
                  d={`M 0 0 L 32 0`}
                  stroke="#1a1a2e"
                  strokeWidth="1"
                  fill="none"
                  markerEnd="url(#arrowhead)"
                />
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#1a1a2e" />
                  </marker>
                </defs>
              </svg>
            </div>

            {/* Node */}
            <div className="lg:pl-16">
              <ProcessNode
                item={item}
                index={index}
                isLast={index === combined.length - 1}
                isVisible={true}
              />
            </div>
          </div>
        ))}
      </div>

      {/* End node */}
      <div className="flex justify-center mt-12">
        <div className="border border-[#7c3aed] bg-[#7c3aed] px-6 py-3">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-white flex items-center gap-2">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            Present
          </span>
        </div>
      </div>
    </div>
  );
};

const Experience = ({ experience, education }) => {
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 overflow-x-hidden"
    >
      {/* Background process grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(#00ff88 1px, transparent 1px),
            linear-gradient(90deg, #00ff88 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-4xl mx-auto relative">
        {/* Section Header */}
        <div 
          className={`text-center mb-16 transition-all duration-700 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="section-eyebrow justify-center mx-auto">
            <span>03</span>
            <span>Process Flow</span>
          </div>
          <h2 className="section-title">
            Career<br />
            <span className="text-[#00ff88]">Pipeline</span>
          </h2>
        </div>

        {/* Workflow Visualization */}
        <div className={`transition-all duration-700 delay-200 ${revealed ? 'opacity-100' : 'opacity-0'}`}>
          <ExperienceWorkflow experience={experience} education={education} />
        </div>
      </div>
    </section>
  );
};

export default Experience;
