'use client';

import { useState } from 'react';
import { SCHEMA_TREE, type SchemaEntity } from '@/data/schema-tree';
import { ChevronRight } from 'lucide-react';

function EntityCard({ entity }: { entity: SchemaEntity }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="entity-card">
      <div className="entity-header" onClick={() => setOpen(!open)}>
        <div className="entity-name">
          {entity.name}
          <span className={`entity-badge ${entity.required ? 'required' : 'optional'}`}>
            {entity.required ? 'required' : 'optional'}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-dim)' }}>
            {entity.fields.length} fields
          </span>
        </div>
        <span className={`entity-toggle ${open ? 'open' : ''}`}><ChevronRight size={14} /></span>
      </div>
      {open && (
        <div className="entity-fields">
          <div className="field-header">
            <span>Field</span>
            <span>Type</span>
            <span>Description</span>
          </div>
          {entity.fields.map((f) => (
            <div className="field-row" key={f.name}>
              <div className="field-name">
                {f.required && <span className="field-required-dot" />}
                {f.name}
              </div>
              <div className="field-type">{f.type}</div>
              <div className="field-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SchemaExplorer() {
  return (
    <div className="content">
      <div className="schema-header">
        <h2>Schema Explorer</h2>
        <p>
          Browse the complete OpenSpec v1.0 schema. Click any entity to expand its fields.
          Required fields are marked with a dot.
        </p>
      </div>

      <div style={{ marginBottom: 20, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-dim)' }}>
        Root: <span style={{ color: 'var(--accent)' }}>openSpecVersion</span>
        <span style={{ color: 'var(--text-dim)' }}> : &quot;1.0&quot;</span>
        <span style={{ margin: '0 8px' }}>·</span>
        <span style={{ color: 'var(--accent)' }}>project</span>
        <span style={{ color: 'var(--text-dim)' }}> : Project</span>
        <span style={{ margin: '0 8px' }}>·</span>
        <span style={{ color: 'var(--accent)' }}>specifications</span>
        <span style={{ color: 'var(--text-dim)' }}> : Specification[]</span>
      </div>

      {SCHEMA_TREE.map((entity) => (
        <EntityCard key={entity.name} entity={entity} />
      ))}
    </div>
  );
}
