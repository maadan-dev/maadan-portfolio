import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { personalInfo } from '../../data/content';

const E = [0.16, 1, 0.3, 1] as const;

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isBlogPage = location.pathname.startsWith('/blog') || location.pathname === '/writing';
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // On homepage, hero has its own branding — hide nav until scrolled
  const showNav = !isHomePage || scrolled;

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        padding: scrolled ? 'clamp(8px, 1.5vh, 16px) clamp(16px, 3vw, 40px)' : 'clamp(16px, 2.5vh, 32px) clamp(16px, 3vw, 40px)',
        transition: 'padding 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: E as any }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: scrolled ? 999 : 0,
          padding: scrolled ? '10px 20px' : '0',
          background: scrolled ? 'rgba(5,5,5,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          border: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          opacity: showNav ? 1 : 0,
          pointerEvents: showNav ? 'auto' : 'none',
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80" data-hover>
          <img
            src="/logo_horizontal.png"
            alt="ABDULYEKEEN MAADAN"
            style={{ height: scrolled ? 22 : 26, width: 'auto', objectFit: 'contain', transition: 'height 0.3s ease' }}
          />
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          {isBlogPage ? (
            <>
              <Link to="/" data-hover style={navLinkStyle}>Home</Link>
              <Link to="/#case-studies" data-hover style={navLinkStyle}>Work</Link>
              <Link to="/#method" data-hover style={navLinkStyle}>About</Link>
              <Link to="/#contact" data-hover style={navLinkStyle}>Contact</Link>
            </>
          ) : (
            <>
              <a href="#case-studies" data-hover style={navLinkStyle}>Work</a>
              <a href="#method" data-hover style={navLinkStyle}>About</a>
              <Link to="/writing" data-hover style={navLinkStyle}>Writing</Link>
              <a href="#contact" data-hover style={navLinkStyle}>Contact</a>
            </>
          )}
        </nav>

        {/* Resume CTA */}
        <div className="hidden md:block">
          <a
            href={personalInfo.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            data-hover
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#050505',
              background: 'rgba(250,250,250,0.92)',
              padding: '7px 18px',
              borderRadius: 999,
              textDecoration: 'none',
              transition: 'background 0.2s ease, transform 0.2s ease',
            }}
          >
            Resume
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 z-50 relative"
          aria-label="Menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={`w-5 h-[1.5px] bg-white block transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`}></span>
          <span className={`w-5 h-[1.5px] bg-white block transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-5 h-[1.5px] bg-white block transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 transition-all duration-500 flex flex-col items-center justify-center gap-8 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ background: 'rgba(5,5,5,0.97)', backdropFilter: 'blur(24px)' }}
      >
        {isBlogPage ? (
          <>
            <Link to="/" onClick={() => setIsOpen(false)} style={mobileLinkStyle}>Home</Link>
            <Link to="/#case-studies" onClick={() => setIsOpen(false)} style={mobileLinkStyle}>Work</Link>
            <Link to="/#method" onClick={() => setIsOpen(false)} style={mobileLinkStyle}>About</Link>
            <Link to="/#contact" onClick={() => setIsOpen(false)} style={mobileLinkStyle}>Contact</Link>
          </>
        ) : (
          <>
            <a href="#case-studies" onClick={() => setIsOpen(false)} style={mobileLinkStyle}>Work</a>
            <a href="#method" onClick={() => setIsOpen(false)} style={mobileLinkStyle}>About</a>
            <Link to="/writing" onClick={() => setIsOpen(false)} style={mobileLinkStyle}>Writing</Link>
            <a href="#contact" onClick={() => setIsOpen(false)} style={mobileLinkStyle}>Contact</a>
          </>
        )}
        <a
          href={personalInfo.resumePdf}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setIsOpen(false)}
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 600,
            fontSize: 14,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#050505',
            background: 'white',
            padding: '12px 28px',
            borderRadius: 999,
            textDecoration: 'none',
            marginTop: 16,
          }}
        >
          Download Resume
        </a>
      </div>
    </motion.header>
  );
}

const navLinkStyle: React.CSSProperties = {
  fontFamily: "'Barlow Condensed', sans-serif",
  fontWeight: 500,
  fontSize: 12,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'rgba(250,250,250,0.55)',
  textDecoration: 'none',
  transition: 'color 0.2s ease',
};

const mobileLinkStyle: React.CSSProperties = {
  fontFamily: "'Bebas Neue', sans-serif",
  fontSize: 'clamp(2rem, 8vw, 3.5rem)',
  color: 'rgba(250,250,250,0.9)',
  textDecoration: 'none',
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
};
