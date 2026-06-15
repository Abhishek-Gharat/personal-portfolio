import React, { useEffect, useRef, useState } from 'react';
import HeroGraph from '../HeroGraph';

const ParticleField = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    canvas.width = width;
    canvas.height = height;

    // Initialize particles
    const particleCount = Math.floor(width / 120);
    particlesRef.current = [];
    
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.3 + 0.1
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      particlesRef.current.forEach((p, i) => {
        // Update position
        p.x += p.vx;
        p.y += p.vy;
        
        // Bounce off edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 136, ${p.opacity})`;
        ctx.fill();
        
        // Draw connections
        particlesRef.current.slice(i + 1).forEach(p2 => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 180) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 255, 136, ${0.06 * (1 - dist / 180)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
};

const Hero = ({ data }) => {
  const [revealed, setRevealed] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    setRevealed(true);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Get first 4 projects for preview
  const previewProjects = data.projects?.slice(0, 4) || [];

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-20 overflow-hidden"
      style={{ backgroundColor: '#080b14' }}
    >
      {/* Three.js Hero Graph */}
      <HeroGraph />

      {/* Particle Background */}
      <ParticleField />
      
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 z-[1] pointer-events-none opacity-10"
        style={{
          backgroundImage: `linear-gradient(var(--border-subtle) 1px, transparent 1px),
                           linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div
        className="relative z-10 max-w-7xl mx-auto w-full"
        style={{ userSelect: 'none' }}
      >
        {/* Top Label */}
        <div 
          className={`mb-8 transition-all duration-700 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#00ff88]">
              Frontend Developer
            </span>
          </div>
        </div>

        {/* Main Name */}
        <div className="mb-6">
          <h1
            className={`font-condensed font-black text-[clamp(4rem,12vw,10rem)] leading-[0.85] tracking-[-0.02em] uppercase transition-all duration-700 delay-100 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ textShadow: '0 2px 20px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 0, 0, 0.6)' }}
          >
            {data.name}
          </h1>
          <h1
            className={`font-condensed font-black text-[clamp(4rem,12vw,10rem)] leading-[0.85] tracking-[-0.02em] uppercase text-[#00ff88] transition-all duration-700 delay-200 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ textShadow: '0 2px 20px rgba(0, 0, 0, 0.9), 0 0 30px rgba(0, 255, 136, 0.2)' }}
          >
            {data.surname}
          </h1>
        </div>

        {/* Subtitle - Updated from resume */}
        <p
          className={`font-condensed text-[clamp(1.2rem,3vw,2rem)] font-light text-[#00ff88] tracking-[0.05em] uppercase mb-4 transition-all duration-700 delay-300 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ textShadow: '0 2px 16px rgba(0, 0, 0, 0.8)' }}
        >
          {data.subheadline}
        </p>

        {/* Description - Updated from resume */}
        <p
          className={`text-white text-base md:text-lg max-w-2xl mb-12 transition-all duration-700 delay-350 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ textShadow: '0 1px 12px rgba(0, 0, 0, 0.8)' }}
        >
          {data.description}
        </p>

        {/* Stats Row - Updated from resume */}
        <div 
          className={`flex flex-wrap gap-8 mb-12 transition-all duration-700 delay-400 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          {data.hero?.stats?.map((stat, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="flex flex-col">
                <span className="font-condensed text-3xl md:text-4xl font-bold text-white">
                  {stat.num}
                </span>
                <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#555570]">
                  {stat.label}
                </span>
              </div>
              {index < data.hero.stats.length - 1 && (
                <div className="w-px h-12 bg-[#1a1a2e] hidden md:block" />
              )}
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div 
          className={`flex flex-wrap gap-4 mb-16 transition-all duration-700 delay-500 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <button
            onClick={() => scrollToSection('projects')}
            className="group px-8 py-4 bg-[#00ff88] text-[#050508] font-mono text-sm tracking-[0.1em] uppercase font-bold transition-all duration-300 hover:bg-transparent hover:text-[#00ff88] border-2 border-[#00ff88]"
          >
            View Systems →
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="group px-8 py-4 border-2 border-[#252540] text-white font-mono text-sm tracking-[0.1em] uppercase font-bold transition-all duration-300 hover:border-[#00ff88] hover:text-[#00ff88]"
          >
            Initialize Connection
          </button>
        </div>

        {/* Project Previews */}
        <div 
          className={`transition-all duration-700 delay-600 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-[#00ff88]" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#555570]">
              Active Systems
            </span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {previewProjects.map((project, index) => (
              <button
                key={project.id}
                onClick={() => scrollToSection('projects')}
                className="group text-left p-4 border border-[#1a1a2e] bg-[#0a0a10] transition-all duration-300 hover:border-[#00ff88] hover:bg-[#0f0f18]"
              >
                <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#00ff88] mb-2">
                  SYS_0{index + 1}
                </div>
                <h3 className="font-condensed text-lg font-semibold uppercase mb-2 group-hover:text-[#00ff88] transition-colors">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-1">
                  {project.tags?.slice(0, 2).map((tag) => (
                    <span 
                      key={tag}
                      className="font-mono text-[9px] tracking-[0.1em] uppercase text-[#555570] border border-[#1a1a2e] px-2 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Hint */}
      <div className="absolute bottom-8 left-8 flex items-center gap-3 text-[#555570]">
        <span className="font-mono text-xs tracking-[0.2em] uppercase">Explore Universe</span>
        <div className="w-16 h-px bg-[#555570] relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-[#00ff88]"
            style={{
              animation: 'scrollLine 2s infinite'
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollLine {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
