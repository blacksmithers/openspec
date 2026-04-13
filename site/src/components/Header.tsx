import { Github } from 'lucide-react';
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
          <Github size={16} />
        </a>
        <ThemeToggle />
      </div>
    </div>
  );
}
