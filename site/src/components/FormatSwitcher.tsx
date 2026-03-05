'use client';

import { useState } from 'react';
import { FULL_EXAMPLE, TOON_EXAMPLE, YAML_EXAMPLE } from '@/data/examples';

const FORMATS = [
  { id: 'json', ext: '.sf.json', label: 'Machine-first', stat: '100%', statLabel: 'Baseline tokens' },
  { id: 'yaml', ext: '.sf.yaml', label: 'Human-first', stat: '~85%', statLabel: 'vs JSON tokens' },
  { id: 'toon', ext: '.sf.toon', label: 'LLM-optimized', stat: '60.1%', statLabel: 'vs JSON tokens' },
];

const CODE_MAP: Record<string, string> = {
  json: FULL_EXAMPLE,
  yaml: YAML_EXAMPLE,
  toon: TOON_EXAMPLE,
};

const TITLE_MAP: Record<string, string> = {
  json: 'example.sf.json',
  yaml: 'example.sf.yaml',
  toon: 'example.sf.toon',
};

const DESC_MAP: Record<string, string> = {
  json: 'Programmatic generation · CI · Storage',
  yaml: 'Human-authored · Version control · Readable diffs',
  toon: 'LLM context injection · 39.9% fewer tokens',
};

export default function FormatSwitcher() {
  const [selected, setSelected] = useState('json');

  return (
    <div className="content">
      <h2 className="section-title">File Formats</h2>
      <p className="section-desc">
        Three lossless representations of the same schema. Choose the format that fits your workflow.
      </p>

      <div className="format-comparison">
        {FORMATS.map((f) => (
          <div
            key={f.id}
            className={`format-card ${selected === f.id ? 'selected' : ''}`}
            onClick={() => setSelected(f.id)}
          >
            <div className="format-ext" style={{ color: selected === f.id ? 'var(--purple)' : 'var(--text)' }}>
              {f.ext}
            </div>
            <div className="format-label">{f.label}</div>
            <div className="format-stat" style={{ color: f.id === 'toon' ? 'var(--green)' : 'var(--text-muted)' }}>
              {f.stat}
            </div>
            <div className="format-stat-label">{f.statLabel}</div>
          </div>
        ))}
      </div>

      <div className="format-code-block">
        <div className="format-code-header">
          <span className="format-code-title">{TITLE_MAP[selected]}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-dim)' }}>
            {DESC_MAP[selected]}
          </span>
        </div>
        <div className="format-code-body">
          {CODE_MAP[selected]}
        </div>
      </div>

      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', padding: 24 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600, letterSpacing: 1.5, color: 'var(--text-dim)', textTransform: 'uppercase' as const, marginBottom: 16 }}>
          When to use each format
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, fontSize: 12, lineHeight: 1.7, color: 'var(--text-muted)' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>.sf.json</div>
            Programmatic generation, CI pipelines, database storage, API responses.
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>.sf.yaml</div>
            Hand-authored specs, version control with readable diffs, config files.
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>.sf.toon</div>
            Injecting specs into LLM agent context windows. 39.9% fewer tokens.
          </div>
        </div>
      </div>
    </div>
  );
}
