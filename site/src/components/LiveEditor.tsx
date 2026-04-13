'use client';

import { useState } from 'react';
import { MINIMAL_EXAMPLE, FULL_EXAMPLE, YAML_EXAMPLE, TOON_EXAMPLE } from '@/data/examples';
import { validateWithSchema, getSpecifications, getEpics, getTickets, parse, detectFormat, toJson, toYaml } from '@blacksmithers/openspec';
import type { SpecFormat } from '@blacksmithers/openspec';
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
  format?: SpecFormat;
}

const FORMAT_LABELS: Record<SpecFormat, string> = {
  json: '.oschema.json',
  yaml: '.oschema.yaml',
  toon: '.oschema.toon',
};

export default function LiveEditor() {
  const [code, setCode] = useState(MINIMAL_EXAMPLE);
  const [result, setResult] = useState<EditorResult | null>(null);
  const [activeFormat, setActiveFormat] = useState<SpecFormat>('json');

  const validate = () => {
    try {
      const format = detectFormat(code);

      if (format === 'toon') {
        setResult({ valid: false, errors: ['TOON validation is not yet supported in the browser. Use the CLI: openspec ./spec.oschema.toon'] });
        return;
      }

      const parsed = parse(code, format);
      const validation = validateWithSchema(parsed as unknown, schema);
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
          format,
        });
      } else {
        setResult({
          valid: false,
          errors: validation.errors.map((e) => `${e.path}: ${e.message}`),
          format,
        });
      }
    } catch (e) {
      setResult({ valid: false, errors: [`Parse error: ${(e as Error).message}`] });
    }
  };

  const switchFormat = (target: SpecFormat) => {
    if (target === activeFormat) return;
    const currentFormat = detectFormat(code);

    // Try to convert current content
    if (currentFormat !== 'toon' && target !== 'toon') {
      try {
        const parsed = parse(code, currentFormat);
        const converted = target === 'json' ? toJson(parsed) : toYaml(parsed);
        setCode(converted);
        setActiveFormat(target);
        setResult(null);
        return;
      } catch {
        // Fall through to example
      }
    }

    // Fallback: load example for target format
    const examples: Record<SpecFormat, string> = {
      json: MINIMAL_EXAMPLE,
      yaml: YAML_EXAMPLE,
      toon: TOON_EXAMPLE,
    };
    setCode(examples[target]);
    setActiveFormat(target);
    setResult(null);
  };

  return (
    <div className="editor-layout">
      <div className="editor-pane">
        <div className="editor-pane-header">
          <span className="editor-pane-title">Input ({FORMAT_LABELS[activeFormat]})</span>
          <div className="btn-group">
            <div className="format-tabs">
              <button
                className={`format-tab ${activeFormat === 'json' ? 'active' : ''}`}
                onClick={() => switchFormat('json')}
              >
                JSON
              </button>
              <button
                className={`format-tab ${activeFormat === 'yaml' ? 'active' : ''}`}
                onClick={() => switchFormat('yaml')}
              >
                YAML
              </button>
              <button
                className={`format-tab ${activeFormat === 'toon' ? 'active' : ''}`}
                onClick={() => switchFormat('toon')}
              >
                TOON
              </button>
            </div>
            <button className="btn btn-ghost" onClick={() => { setCode(FULL_EXAMPLE); setActiveFormat('json'); setResult(null); }} style={{ fontSize: 10 }}>
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
          placeholder={`Paste your ${FORMAT_LABELS[activeFormat]} here...`}
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
              <div><Check size={14} /> Valid OpenSpec (v{result.version}) — {result.format}</div>
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
