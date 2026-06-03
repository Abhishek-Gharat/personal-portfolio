import React, { useEffect, useRef, useState } from 'react';

// Custom node components for React Flow-style visualization
const WorkflowNode = ({ children, className = '', style = {}, id, onClick, active = false }) => {
  const nodeRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={nodeRef}
      className={`relative cursor-pointer transition-all duration-300 ${className}`}
      style={{
        ...style,
        boxShadow: active || hovered 
          ? '0 0 30px rgba(0, 255, 136, 0.3)' 
          : style.boxShadow,
        transform: hovered ? 'scale(1.02)' : 'scale(1)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {/* Connection handles */}
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#1a1a2e] border border-[#252540]" />
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#1a1a2e] border border-[#252540]" />
      <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 rounded-full bg-[#1a1a2e] border border-[#252540]" />
      <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 rounded-full bg-[#1a1a2e] border border-[#252540]" />
      
      {/* Active indicator */}
      {(active || hovered) && (
        <div className="absolute -inset-[1px] border border-[#00ff88] pointer-events-none" 
          style={{ boxShadow: '0 0 20px rgba(0, 255, 136, 0.3)' }} 
        />
      )}
      
      {children}
    </div>
  );
};

// Animated connection line
const WorkflowEdge = ({ start, end, animated = true, active = false }) => {
  // Calculate path
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: start.x,
        top: start.y,
        width: length,
        height: 2,
        transformOrigin: '0 50%',
        transform: `rotate(${angle}deg)`,
      }}
    >
      <svg width="100%" height="100%" className="overflow-visible">
        <defs>
          <marker
            id={`arrowhead-${start.x}-${start.y}`}
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill={active ? '#00ff88' : '#1a1a2e'}
            />
          </marker>
        </defs>
        <line
          x1="0"
          y1="1"
          x2="100%"
          y2="1"
          stroke={active ? '#00ff88' : '#1a1a2e'}
          strokeWidth={active ? 2 : 1}
          markerEnd={`url(#arrowhead-${start.x}-${start.y})`}
          strokeDasharray={animated ? '5,5' : 'none'}
          style={animated ? {
            animation: 'flowAnimation 1s linear infinite',
          } : {}}
        />
      </svg>
    </div>
  );
};

// Skill Node component - STRICT BOUNDARY ENFORCEMENT
const SkillNode = ({ skill, category, index }) => {
  const getCategoryColor = (cat) => {
    switch(cat) {
      case 'frontend': return '#00ff88';
      case 'backend': return '#7c3aed';
      case 'tools': return '#f59e0b';
      default: return '#00ff88';
    }
  };

  const color = getCategoryColor(category);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <WorkflowNode
        style={{
          background: '#0a0a10',
          border: `1px solid ${isHovered ? color : '#1a1a2e'}`,
          borderLeft: `3px solid ${color}`,
          padding: '10px 12px',
          minWidth: '120px',
          maxWidth: '160px',
          boxSizing: 'border-box',
        }}
      >
        {/* Header row - constrained within node */}
        <div className="flex items-center justify-between gap-2 mb-2 overflow-hidden">
          <span 
            className="font-mono text-xs text-white uppercase tracking-wide truncate"
            style={{ maxWidth: 'calc(100% - 40px)' }}
          >
            {skill.name}
          </span>
          <span 
            className="font-mono text-[9px] px-1.5 py-0.5 flex-shrink-0"
            style={{ 
              background: `${color}20`,
              color: color,
            }}
          >
            {skill.level}%
          </span>
        </div>
        
        {/* Progress bar - full width inside node */}
        <div className="h-1 bg-[#1a1a2e] overflow-hidden">
          <div
            className="h-full transition-all duration-500"
            style={{ 
              width: `${skill.level}%`,
              background: color,
            }}
          />
        </div>
      </WorkflowNode>
    </div>
  );
};

// Skill Group Container - STRICT BOUNDARY ENFORCEMENT
const SkillGroupNode = ({ title, category, skills, children }) => {
  const getCategoryColor = (cat) => {
    switch(cat) {
      case 'frontend': return '#00ff88';
      case 'backend': return '#7c3aed';
      case 'tools': return '#f59e0b';
      default: return '#00ff88';
    }
  };

  const color = getCategoryColor(category);

  return (
    <div className="relative">
      {/* Group container with strict boundaries */}
      <div
        className="border p-4 md:p-5 relative overflow-hidden"
        style={{ 
          borderColor: '#252540',
          background: 'rgba(10, 10, 16, 0.9)',
          boxSizing: 'border-box',
        }}
      >
        {/* Header - constrained */}
        <div className="flex items-center gap-2 mb-4 overflow-hidden">
          <div 
            className="w-2.5 h-2.5 rounded-full animate-pulse flex-shrink-0"
            style={{ background: color }}
          />
          <h3 
            className="font-mono text-[10px] md:text-xs tracking-[0.15em] uppercase truncate"
            style={{ color }}
          >
            {title}
          </h3>
          <div className="flex-1 h-px bg-[#1a1a2e] min-w-[20px]" />
        </div>

        {/* Skills grid - responsive within container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2">
          {skills.map((skill, index) => (
            <div key={skill.name} className="min-w-0">
              <SkillNode skill={skill} category={category} index={index} />
            </div>
          ))}
        </div>

        {/* Output handle - positioned outside content area */}
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#1a1a2e] border border-[#252540] z-10" />
      </div>
    </div>
  );
};

const Skills = ({ skills }) => {
  const [revealed, setRevealed] = useState(false);
  const [activePath, setActivePath] = useState(null);
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

  // Simulate data flow animation
  useEffect(() => {
    if (revealed) {
      const paths = ['frontend', 'backend', 'tools'];
      let current = 0;
      const interval = setInterval(() => {
        setActivePath(paths[current]);
        current = (current + 1) % paths.length;
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [revealed]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8"
    >
      {/* Background workflow grid */}
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

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div 
          className={`mb-16 transition-all duration-700 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="section-eyebrow">
            <span>01</span>
            <span>System Core</span>
          </div>
          <h2 className="section-title">
            Technical<br />
            <span className="text-[#00ff88]">Workflow</span>
          </h2>
        </div>

        {/* Workflow Visualization */}
        <div className="relative">
          {/* Trigger Node */}
          <div className={`flex justify-center mb-8 transition-all duration-700 delay-200 ${revealed ? 'opacity-100' : 'opacity-0'}`}>
            <WorkflowNode
              style={{
                background: '#00ff88',
                padding: '12px 24px',
                color: '#050508',
              }}
            >
              <span className="font-mono text-xs font-bold uppercase tracking-[0.15em] flex items-center gap-2">
                <span className="w-2 h-2 bg-[#050508] rounded-full animate-pulse" />
                User Input
              </span>
            </WorkflowNode>
          </div>

          {/* Connection lines to skill groups */}
          <div className="hidden lg:block absolute top-16 left-1/2 w-full -translate-x-1/2 h-20 pointer-events-none">
            <svg width="100%" height="100%" className="overflow-visible" style={{ opacity: revealed ? 1 : 0, transition: 'opacity 0.5s' }}>
              <defs>
                <marker id="arrow-green" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#00ff88" />
                </marker>
              </defs>
              {/* Lines to each group */}
              <line x1="50%" y1="0" x2="20%" y2="100%" stroke={activePath === 'frontend' ? '#00ff88' : '#1a1a2e'} strokeWidth={activePath === 'frontend' ? 2 : 1} markerEnd="url(#arrow-green)" strokeDasharray="5,5" className={activePath === 'frontend' ? 'animate-pulse' : ''} />
              <line x1="50%" y1="0" x2="50%" y2="100%" stroke={activePath === 'backend' ? '#7c3aed' : '#1a1a2e'} strokeWidth={activePath === 'backend' ? 2 : 1} markerEnd="url(#arrow-green)" strokeDasharray="5,5" className={activePath === 'backend' ? 'animate-pulse' : ''} />
              <line x1="50%" y1="0" x2="80%" y2="100%" stroke={activePath === 'tools' ? '#f59e0b' : '#1a1a2e'} strokeWidth={activePath === 'tools' ? 2 : 1} markerEnd="url(#arrow-green)" strokeDasharray="5,5" className={activePath === 'tools' ? 'animate-pulse' : ''} />
            </svg>
          </div>

          {/* Skill Groups */}
          <div className={`grid lg:grid-cols-3 gap-8 transition-all duration-700 delay-300 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className={activePath === 'frontend' ? 'scale-[1.02] transition-transform duration-500' : ''}>
              <SkillGroupNode
                title="Frontend Systems"
                category="frontend"
                skills={skills.frontend}
              />
            </div>
            
            <div className={activePath === 'backend' ? 'scale-[1.02] transition-transform duration-500' : ''}>
              <SkillGroupNode
                title="Backend Infrastructure"
                category="backend"
                skills={skills.backend}
              />
            </div>
            
            <div className={activePath === 'tools' ? 'scale-[1.02] transition-transform duration-500' : ''}>
              <SkillGroupNode
                title="Engineering Tools"
                category="tools"
                skills={skills.tools}
              />
            </div>
          </div>

          {/* Output node */}
          <div className={`flex justify-center mt-12 transition-all duration-700 delay-500 ${revealed ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-center gap-4">
              <div className="hidden lg:block w-24 h-px bg-gradient-to-r from-transparent to-[#00ff88]" />
              <WorkflowNode
                style={{
                  background: '#0f0f18',
                  border: '1px solid #00ff88',
                  borderRadius: '50%',
                  width: '80px',
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 30px rgba(0, 255, 136, 0.2)',
                }}
              >
                <span className="font-mono text-xs text-[#00ff88] uppercase text-center leading-tight">
                  Full<br/>Stack
                </span>
              </WorkflowNode>
              <div className="hidden lg:block w-24 h-px bg-gradient-to-l from-transparent to-[#00ff88]" />
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className={`mt-12 flex flex-wrap justify-center gap-8 transition-all duration-700 delay-600 ${revealed ? 'opacity-100' : 'opacity-0'}`}>
          {[
            { label: 'Data Flow', color: '#00ff88', animated: true },
            { label: 'Active Node', color: '#00ff88', animated: false },
            { label: 'Connection', color: '#1a1a2e', animated: false },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div 
                className="w-8 h-0.5"
                style={{ 
                  background: item.color,
                  backgroundImage: item.animated ? 'repeating-linear-gradient(90deg, transparent, transparent 5px, #050508 5px, #050508 10px)' : 'none',
                }}
              />
              <span className="font-mono text-xs text-[#8888aa] uppercase tracking-wider">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
