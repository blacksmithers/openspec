import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <div className="header">
      <div className="header-left">
        <svg className="header-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 64" height={32}>
          <defs>
            <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B7355"/>
              <stop offset="50%" stopColor="#C2A878"/>
              <stop offset="100%" stopColor="#E8D5B7"/>
            </linearGradient>
            <linearGradient id="fg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B7355"/>
              <stop offset="40%" stopColor="#C2A878"/>
              <stop offset="100%" stopColor="#E8D5B7"/>
            </linearGradient>
            <filter id="gl">
              <feGaussianBlur stdDeviation="1.2" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <g transform="translate(32, 32)">
            <g filter="url(#gl)">
              <path d="M -18 -24 Q -24 -24 -24 -18 L -24 -5 Q -24 0 -30 0 Q -24 0 -24 5 L -24 18 Q -24 24 -18 24"
                    fill="none" stroke="url(#g)" strokeWidth="2.4" strokeLinecap="round"/>
              <path d="M 18 -24 Q 24 -24 24 -18 L 24 -5 Q 24 0 30 0 Q 24 0 24 5 L 24 18 Q 24 24 18 24"
                    fill="none" stroke="url(#g)" strokeWidth="2.4" strokeLinecap="round"/>
            </g>
            <g filter="url(#gl)">
              <line x1="-16" y1="-11" x2="-4" y2="-11" stroke="#E8D5B7" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
              <line x1="-2" y1="-11" x2="16" y2="-11" stroke="#8B7355" strokeWidth="1.6" strokeLinecap="round" opacity="0.3"/>
              <line x1="-16" y1="0" x2="-8" y2="0" stroke="#D4B896" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
              <line x1="-6" y1="0" x2="10" y2="0" stroke="#8B7355" strokeWidth="1.6" strokeLinecap="round" opacity="0.28"/>
              <line x1="-16" y1="11" x2="0" y2="11" stroke="#C2A878" strokeWidth="2" strokeLinecap="round" opacity="0.55"/>
              <line x1="2" y1="11" x2="16" y2="11" stroke="#6B5B3E" strokeWidth="1.6" strokeLinecap="round" opacity="0.25"/>
            </g>
          </g>
          <g transform="translate(78, 46)">
            <text fontFamily="'Outfit', sans-serif" fontWeight="900" fontSize="44" letterSpacing="-2">
              <tspan className="logo-text-open">Open</tspan><tspan fill="url(#fg)">Spec</tspan>
            </text>
          </g>
        </svg>
        <div className="version-pill">v1.0</div>
      </div>
      <div className="header-right">
        <a className="header-link" href="https://specforge.tech" target="_blank" rel="noopener noreferrer">
          specforge.tech
        </a>
        <a className="header-link" href="https://github.com/blacksmithers/openspec" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
        </a>
        <ThemeToggle />
      </div>
    </div>
  );
}
