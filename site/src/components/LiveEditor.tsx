'use client';

import { useState } from 'react';
import { MINIMAL_EXAMPLE, FULL_EXAMPLE } from '@/data/examples';

interface ValidationResult {
  valid: boolean;
  version?: string;
  project?: string;
  specs?: number;
  epics?: number;
  tickets?: number;
  errors?: string[];
}

export default function LiveEditor() {
  const [code, setCode] = useState(MINIMAL_EXAMPLE);
  const [result, setResult] = useState<ValidationResult | null>(null);

  const validate = () => {
    try {
      const parsed = JSON.parse(code);
      const errors: string[] = [];
      if (!parsed.specforgeVersion) errors.push('Missing required field: specforgeVersion');
      else if (parsed.specforgeVersion !== '1.0') errors.push(`Unknown version: "${parsed.specforgeVersion}". Expected "1.0"`);
      if (!parsed.project) errors.push('Missing required field: project');
      else {
        if (!parsed.project.id) errors.push('project.id is required');
        if (!parsed.project.name) errors.push('project.name is required');
      }
      if (parsed.specifications) {
        parsed.specifications.forEach((spec: { id?: string; title?: string }, i: number) => {
          if (!spec.id) errors.push(`specifications[${i}].id is required`);
          if (!spec.title) errors.push(`specifications[${i}].title is required`);
        });
      }
      if (errors.length === 0) {
        const specCount = parsed.specifications?.length || 0;
        const epicCount = parsed.specifications?.reduce((a: number, s: { epics?: unknown[] }) => a + (s.epics?.length || 0), 0) || 0;
        const ticketCount = parsed.specifications?.reduce((a: number, s: { epics?: { tickets?: unknown[] }[] }) => a + (s.epics?.reduce((b: number, e: { tickets?: unknown[] }) => b + (e.tickets?.length || 0), 0) || 0), 0) || 0;
        setResult({
          valid: true,
          version: parsed.specforgeVersion,
          project: parsed.project.name,
          specs: specCount,
          epics: epicCount,
          tickets: ticketCount,
        });
      } else {
        setResult({ valid: false, errors });
      }
    } catch (e) {
      setResult({ valid: false, errors: [`JSON parse error: ${(e as Error).message}`] });
    }
  };

  const loadExample = (ex: string) => {
    setCode(ex);
    setResult(null);
  };

  return (
    <div className="editor-layout">
      <div className="editor-pane">
        <div className="editor-pane-header">
          <span className="editor-pane-title">Input (.sf.json)</span>
          <div className="btn-group">
            <button className="btn btn-ghost" onClick={() => loadExample(MINIMAL_EXAMPLE)} style={{ fontSize: 10 }}>
              Minimal
            </button>
            <button className="btn btn-ghost" onClick={() => loadExample(FULL_EXAMPLE)} style={{ fontSize: 10 }}>
              Full
            </button>
            <button className="btn btn-primary" onClick={validate}>
              Validate ▸
            </button>
          </div>
        </div>
        <textarea
          className="editor-textarea"
          value={code}
          onChange={(e) => { setCode(e.target.value); setResult(null); }}
          spellCheck={false}
          placeholder="Paste your .sf.json here..."
        />
      </div>
      <div className="result-pane">
        <div className="editor-pane-header">
          <span className="editor-pane-title">Validation Result</span>
          {result && (
            <span
              className="entity-badge"
              style={{
                background: result.valid ? 'var(--green-dim)' : 'var(--red-dim)',
                color: result.valid ? 'var(--green)' : 'var(--red)',
                border: `1px solid ${result.valid ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}`,
              }}
            >
              {result.valid ? 'VALID' : 'INVALID'}
            </span>
          )}
        </div>
        <div className="result-content">
          {!result && (
            <div style={{ color: 'var(--text-dim)', fontStyle: 'italic' }}>
              Click &quot;Validate ▸&quot; to check your spec against the v1.0 schema.
            </div>
          )}
          {result && result.valid && (
            <div className="result-success">
              <div>✓ Valid SpecForge spec (v{result.version})</div>
              <div style={{ height: 1, background: 'var(--border)', margin: '4px 0' }} />
              <div className="result-info">
                <div className="result-info-item">
                  <span className="result-info-label">Project</span>
                  <span style={{ color: 'var(--text)' }}>{result.project}</span>
                </div>
                <div className="result-info-item">
                  <span className="result-info-label">Specs</span>
                  <span style={{ color: 'var(--cyan)' }}>{result.specs}</span>
                </div>
                <div className="result-info-item">
                  <span className="result-info-label">Epics</span>
                  <span style={{ color: 'var(--amber)' }}>{result.epics}</span>
                </div>
                <div className="result-info-item">
                  <span className="result-info-label">Tickets</span>
                  <span style={{ color: 'var(--green)' }}>{result.tickets}</span>
                </div>
              </div>
            </div>
          )}
          {result && !result.valid && (
            <div className="result-error">
              <div>✗ Invalid SpecForge spec</div>
              <div style={{ height: 1, background: 'var(--border)', margin: '4px 0' }} />
              {result.errors?.map((err, i) => (
                <div key={i} style={{ color: 'var(--red)', fontSize: 11, paddingLeft: 12, position: 'relative' as const }}>
                  <span style={{ position: 'absolute' as const, left: 0 }}>—</span> {err}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
