'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SCHEMA_TREE } from '@/data/schema-tree';
import { Diamond, Gem, Play, Hexagon, Code, FileCode, Terminal, Clock } from 'lucide-react';
import { type ReactNode } from 'react';

const SIDEBAR_ITEMS: { id: string; label: string; icon: ReactNode }[] = [
  { id: '/', label: 'Overview', icon: <Diamond size={14} /> },
  { id: '/why', label: 'Why This Format', icon: <Gem size={14} /> },
  { id: '/getting-started', label: 'Getting Started', icon: <Play size={14} /> },
  { id: '/schema', label: 'Schema Explorer', icon: <Hexagon size={14} /> },
  { id: '/editor', label: 'Live Editor', icon: <Code size={14} /> },
  { id: '/formats', label: 'File Formats', icon: <FileCode size={14} /> },
  { id: '/validator', label: 'Validator CLI', icon: <Terminal size={14} /> },
  { id: '/changelog', label: 'Changelog', icon: <Clock size={14} /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (id: string) => {
    if (id === '/') return pathname === '/' || pathname === '/index' || pathname === '/index/';
    if (id === '/getting-started') return pathname.startsWith('/getting-started');
    return pathname === id || pathname === `${id}/` || pathname.startsWith(`${id}/`);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <div className="sidebar-label">Navigation</div>
        {SIDEBAR_ITEMS.map((item) => (
          <Link
            key={item.id}
            href={item.id}
            className={`sidebar-item ${isActive(item.id) ? 'active' : ''}`}
          >
            <span className="sidebar-icon">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </div>

      {isActive('/schema') && (
        <div className="sidebar-section">
          <div className="sidebar-label">Entities</div>
          <div className="sidebar-schema-nav">
            {SCHEMA_TREE.map((entity) => (
              <div key={entity.name} className="schema-nav-item">
                <span className="schema-nav-dot" />
                {entity.name}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="sidebar-section" style={{ marginTop: 'auto', paddingTop: 24 }}>
        <div style={{ padding: '0 12px', fontSize: 10, color: 'var(--text-dim)', lineHeight: 1.8 }}>
          <div style={{ fontFamily: 'var(--font-mono)', letterSpacing: 0.5 }}>Apache 2.0 License</div>
          <div>Solutions Forge LTDA</div>
          <div style={{ marginTop: 4, fontStyle: 'italic' }}>The format is open.</div>
        </div>
      </div>
    </div>
  );
}
