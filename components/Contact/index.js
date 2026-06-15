import React, { useState, useRef, useEffect } from 'react';

// Connection node component
const ConnectionNode = ({ social, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const getSocialColor = (title) => {
    switch(title) {
      case 'GitHub': return '#00ff88';
      case 'LinkedIn': return '#7c3aed';
      case 'Twitter': return '#f59e0b';
      case 'Email': return '#00ff88';
      default: return '#00ff88';
    }
  };

  const color = getSocialColor(social.title);

  const copyEmail = (email) => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <a
      href={social.link}
      target={social.title === 'Email' ? undefined : "_blank"}
      rel={social.title === 'Email' ? undefined : "noopener noreferrer"}
      onClick={(e) => {
        if (social.title === 'Email') {
          e.preventDefault();
          copyEmail(social.link.replace('mailto:', ''));
        }
      }}
      className={`group relative transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Input connector */}
      <div className="hidden lg:block absolute -top-6 left-1/2 -translate-x-1/2 w-px h-6 bg-gradient-to-b from-[#1a1a2e] to-[#252540]">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#252540]" />
      </div>

      {/* Node */}
      <div
        className="relative border transition-all duration-300 p-6"
        style={{
          borderColor: isHovered ? color : '#1a1a2e',
          background: '#0a0a10',
          borderTop: isHovered ? `3px solid ${color}` : '1px solid #1a1a2e',
        }}
      >
        {/* Icon */}
        <div 
          className="w-12 h-12 mb-4 flex items-center justify-center border transition-all duration-300"
          style={{
            borderColor: isHovered ? color : '#1a1a2e',
            background: isHovered ? `${color}10` : 'transparent',
          }}
        >
          {social.title === 'GitHub' && (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" style={{ color: isHovered ? color : '#8888aa' }}>
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          )}
          {social.title === 'LinkedIn' && (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" style={{ color: isHovered ? color : '#8888aa' }}>
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          )}
          {social.title === 'Twitter' && (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" style={{ color: isHovered ? color : '#8888aa' }}>
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          )}
          {social.title === 'Email' && (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: isHovered ? color : '#8888aa' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          )}
        </div>

        {/* Title */}
        <h3 
          className="font-condensed text-lg font-bold uppercase mb-1 transition-colors duration-300"
          style={{ color: isHovered ? color : '#fff' }}
        >
          {social.title}
        </h3>

        {/* Subtitle */}
        <p className="font-mono text-xs text-[#8888aa] truncate">
          {social.title === 'Email' && copied ? 'Copied!' : social.title === 'Email' ? 'Click to Copy' : `@${social.title.toLowerCase()}`}
        </p>

        {/* Status indicator */}
        <div className="absolute top-4 right-4 flex items-center gap-1">
          <div 
            className="w-1.5 h-1.5 rounded-full"
            style={{ 
              background: color,
              boxShadow: `0 0 8px ${color}`,
            }}
          />
          <span className="font-mono text-[9px] uppercase tracking-wider" style={{ color }}>
            Active
          </span>
        </div>
      </div>
    </a>
  );
};

const Contact = ({ data }) => {
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const socials = data.socials?.filter(s => s.title !== 'Email') || [];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 flex items-center overflow-x-hidden"
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

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div 
            className={`section-eyebrow justify-center mx-auto transition-all duration-700 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <span>04</span>
            <span>Initialize Connection</span>
          </div>
          
          <h2 
            className={`font-condensed text-[clamp(2.5rem,8vw,7rem)] font-black leading-[0.9] tracking-[-0.02em] uppercase mb-6 transition-all duration-700 delay-100 break-words ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            Let's<br />
            <span className="text-[#00ff88]">Connect</span>
          </h2>
          
          <p 
            className={`text-[#8888aa] text-lg max-w-md mx-auto transition-all duration-700 delay-200 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            Open to frontend engineering roles, freelance systems work, and open source collaboration.
          </p>
        </div>

        {/* Workflow Diagram */}
        <div className="relative">
          {/* Trigger node */}
          <div className={`flex justify-center mb-8 transition-all duration-700 delay-300 ${revealed ? 'opacity-100' : 'opacity-0'}`}>
            <div className="border border-[#00ff88] bg-[#00ff88] px-6 py-3">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-[#050508] flex items-center gap-2">
                <span className="w-2 h-2 bg-[#050508] rounded-full animate-pulse" />
                Initiate Contact
              </span>
            </div>
          </div>

          {/* Connection lines */}
          <div className={`hidden lg:block absolute top-16 left-1/2 w-full -translate-x-1/2 transition-all duration-700 delay-400 ${revealed ? 'opacity-100' : 'opacity-0'}`}>
            <svg width="100%" height="60" className="overflow-visible">
              <defs>
                <marker id="arrow-green-contact" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#00ff88" />
                </marker>
              </defs>
              {/* Branches to connection nodes */}
              <line x1="50%" y1="0" x2="20%" y2="60" stroke="#00ff88" strokeWidth="2" markerEnd="url(#arrow-green-contact)" strokeDasharray="5,5" className="animate-pulse" />
              <line x1="50%" y1="0" x2="40%" y2="60" stroke="#1a1a2e" strokeWidth="1" markerEnd="url(#arrow-green-contact)" />
              <line x1="50%" y1="0" x2="60%" y2="60" stroke="#1a1a2e" strokeWidth="1" markerEnd="url(#arrow-green-contact)" />
              <line x1="50%" y1="0" x2="80%" y2="60" stroke="#1a1a2e" strokeWidth="1" markerEnd="url(#arrow-green-contact)" />
            </svg>
          </div>

          {/* Connection nodes */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-16 transition-all duration-700 delay-500 ${revealed ? 'opacity-100' : 'opacity-0'}`}>
            {[
              { title: 'Email', link: `mailto:${data.email}`, color: '#00ff88' },
              ...socials
            ].map((social, index) => (
              <ConnectionNode
                key={social.title}
                social={social}
                index={index}
                isVisible={revealed}
              />
            ))}
          </div>

          {/* Output */}
          <div className={`flex justify-center mt-12 transition-all duration-700 delay-700 ${revealed ? 'opacity-100' : 'opacity-0'}`}>
            <div className="border border-[#7c3aed] bg-[#7c3aed] px-6 py-3">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-white flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                Connection Established
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
