import { personalInfo } from '../../data/content';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: '#050505',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        padding: 'clamp(24px, 4vh, 40px) clamp(24px, 5vw, 80px)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
        }}
      >
        {/* Left: Name */}
        <span style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700,
          fontSize: 11,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(250,250,250,0.55)',
        }}>
          {personalInfo.name}
        </span>

        {/* Center: Location */}
        <span
          className="hidden md:inline"
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 300,
            fontSize: 10,
            letterSpacing: '0.16em',
            color: 'rgba(250,250,250,0.5)',
          }}
        >
          Engineered in Lagos, Nigeria
        </span>

        {/* Right: Year */}
        <span style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700,
          fontSize: 11,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: `rgba(59,130,246,0.4)`,
        }}>
          © {currentYear}
        </span>
      </div>
    </footer>
  );
}
