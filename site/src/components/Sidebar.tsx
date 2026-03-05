'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SCHEMA_TREE } from '@/data/schema-tree';

const SIDEBAR_ITEMS = [
  { id: '/', label: 'Overview', icon: '◇' },
  { id: '/schema', label: 'Schema Explorer', icon: '⬡' },
  { id: '/editor', label: 'Live Editor', icon: '⌘' },
  { id: '/formats', label: 'File Formats', icon: '◈' },
  { id: '/validator', label: 'Validator CLI', icon: '▸' },
  { id: '/changelog', label: 'Changelog', icon: '◦' },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (id: string) => {
    if (id === '/') return pathname === '/' || pathname === '/index' || pathname === '/index/';
    return pathname.startsWith(id);
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
          <div style={{ fontFamily: 'var(--font-mono)', letterSpacing: 0.5 }}>MIT License</div>
          <div>Solutions Forge LTDA</div>
          <div style={{ marginTop: 4, fontStyle: 'italic' }}>The format is open.</div>
          <div style={{ fontStyle: 'italic' }}>The engine is not.</div>
        </div>
      </div>
    </div>
  );
}
