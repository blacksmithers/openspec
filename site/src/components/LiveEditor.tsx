'use client';

import { useState } from 'react';
import { MINIMAL_EXAMPLE, FULL_EXAMPLE } from '@/data/examples';
import { validateWithSchema, getSpecifications, getEpics, getTickets } from '@blacksmithers/openspec';
import schema from '../../public/schema/v1.0/openspec-schema.json';
import { ChevronRight, Check, X, Minus } from 'lucide-react';

interface EditorResult {
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
  const [result, setResult] = useState<EditorResult | null>(null);

  const validate = () => {
    try {
      const parsed = JSON.parse(code);
      const validation = validateWithSchema(parsed, schema);
      if (validation.valid) {
        const specs = getSpecifications(parsed);
        const epics = getEpics(parsed);
        const tickets = getTickets(parsed);
        setResult({
          valid: true,
          version: parsed.openSpecVersion,
          project: parsed.project?.name,
          specs: specs.length,
          epics: epics.length,
          tickets: tickets.length,
        });
      } else {
        setResult({
          valid: false,
          errors: validation.errors.map((e) => `${e.path}: ${e.message}`),
        });
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
          <span className="editor-pane-title">Input (.oschema.json)</span>
          <div className="btn-group">
            <button className="btn btn-ghost" onClick={() => loadExample(MINIMAL_EXAMPLE)} style={{ fontSize: 10 }}>
              Minimal
            </button>
            <button className="btn btn-ghost" onClick={() => loadExample(FULL_EXAMPLE)} style={{ fontSize: 10 }}>
              Full
            </button>
            <button className="btn btn-primary" onClick={validate}>
              Validate <ChevronRight size={12} />
            </button>
          </div>
        </div>
        <textarea
          className="editor-textarea"
          value={code}
          onChange={(e) => { setCode(e.target.value); setResult(null); }}
          spellCheck={false}
          placeholder="Paste your .oschema.json here..."
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
                border: `1px solid ${result.valid ? 'var(--green-badge-border)' : 'var(--red-badge-border)'}`,
              }}
            >
              {result.valid ? 'VALID' : 'INVALID'}
            </span>
          )}
        </div>
        <div className="result-content">
          {!result && (
            <div style={{ color: 'var(--text-dim)', fontStyle: 'italic' }}>
              Click &quot;Validate&quot; to check your spec against the v1.0 schema.
            </div>
          )}
          {result && result.valid && (
            <div className="result-success">
              <div><Check size={14} /> Valid OpenSpec (v{result.version})</div>
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
              <div><X size={14} /> Invalid OpenSpec</div>
              <div style={{ height: 1, background: 'var(--border)', margin: '4px 0' }} />
              {result.errors?.map((err, i) => (
                <div key={i} style={{ color: 'var(--red)', fontSize: 11, paddingLeft: 12, position: 'relative' as const }}>
                  <span style={{ position: 'absolute' as const, left: 0 }}><Minus size={12} /></span> {err}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
