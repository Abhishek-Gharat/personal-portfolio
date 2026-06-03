import React from 'react';

const Footer = ({ data }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#1a1a2e] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left: Logo & Copyright */}
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <div className="flex items-center gap-2">
              <span className="font-condensed text-xl font-bold text-white">AG</span>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#00ff88]">.NETWORK</span>
            </div>
            <span className="font-mono text-xs text-[#555570]">
              © {currentYear} {data.name} {data.surname}
            </span>
          </div>

          {/* Center: Quick Links */}
          <nav className="flex items-center gap-6">
            {[
              { href: '#hero', label: 'Top' },
              { href: '#projects', label: 'Systems' },
              { href: '#contact', label: 'Connect' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-xs tracking-[0.1em] uppercase text-[#8888aa] transition-colors duration-300 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: Status */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#00ff88] rounded-full animate-pulse" />
            <span className="font-mono text-xs tracking-[0.1em] uppercase text-[#00ff88]">
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
