import React, { useState, useEffect } from 'react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section
      const sections = ['hero', 'skills', 'projects', 'experience', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'skills', label: 'Systems' },
    { id: 'projects', label: 'Deployments' },
    { id: 'experience', label: 'Trajectory' },
    { id: 'contact', label: 'Connect' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#050508]/90 backdrop-blur-xl border-b border-[#1a1a2e]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="group flex items-center gap-2"
          >
            <span className="font-condensed text-2xl font-bold text-white">
              AG
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#00ff88]">
              .NETWORK
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 font-mono text-xs tracking-[0.15em] uppercase transition-all duration-300 ${
                  activeSection === item.id
                    ? 'text-[#00ff88]'
                    : 'text-[#8888aa] hover:text-white'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#00ff88] rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Status */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="w-2 h-2 bg-[#00ff88] rounded-full animate-pulse" />
            <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#8888aa]">
              Online
            </span>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2 border-t border-[#1a1a2e]">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left px-4 py-3 font-mono text-xs tracking-[0.15em] uppercase transition-all duration-300 ${
                  activeSection === item.id
                    ? 'text-[#00ff88] bg-[#00ff88]/10'
                    : 'text-[#8888aa] hover:text-white hover:bg-[#1a1a2e]/50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navigation;
