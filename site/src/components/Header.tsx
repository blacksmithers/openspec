export default function Header() {
  return (
    <div className="header">
      <div className="header-left">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 72" height={32} style={{ flexShrink: 0 }}>
          <defs>
            <linearGradient id="sf-ng" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#D946EF" />
            </linearGradient>
            <linearGradient id="sf-nf" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="40%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#D946EF" />
            </linearGradient>
            <linearGradient id="sf-nb" x1="0%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#1a1225" />
              <stop offset="100%" stopColor="#110d1a" />
            </linearGradient>
          </defs>
          <g transform="translate(36, 36)">
            <rect x="-36" y="-36" width="72" height="72" rx="0" ry="0" fill="url(#sf-nb)" stroke="rgba(139,92,246,0.25)" strokeWidth="1.5" />
            <path d="M 0 -22 L 20 0 L 0 22 L -20 0 Z" fill="none" stroke="url(#sf-ng)" strokeWidth="2.2" strokeLinejoin="round" />
            <path d="M -5 -8 L -12 0 L -5 8" fill="none" stroke="#C084FC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 5 -8 L 12 0 L 5 8" fill="none" stroke="#E879F9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="2.5" y1="-7" x2="-2.5" y2="7" stroke="#F0ABFC" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
            <circle cx="0" cy="-23" r="1.5" fill="#E879F9" opacity="0.8" />
            <circle cx="21" cy="0" r="1.2" fill="#D946EF" opacity="0.6" />
            <circle cx="-21" cy="0" r="1.2" fill="#8B5CF6" opacity="0.6" />
            <circle cx="0" cy="23" r="1.2" fill="#A855F7" opacity="0.5" />
          </g>
          <g transform="translate(88, 50)">
            <text fontFamily="'Outfit', sans-serif" fontWeight="900" fontSize="52" letterSpacing="-2">
              <tspan fill="#f0f0f0">Spec</tspan>
              <tspan fill="url(#sf-nf)">Forge</tspan>
            </text>
          </g>
        </svg>
        <div className="header-badge">FORMAT</div>
        <div className="version-pill">v1.0</div>
      </div>
      <div className="header-right">
        <a className="header-link" href="https://specforge.tech" target="_blank" rel="noopener noreferrer">
          specforge.tech
        </a>
        <a className="header-link" href="https://github.com/solutionsforge/specforge-spec" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <span className="header-link">RFC</span>
      </div>
    </div>
  );
}
