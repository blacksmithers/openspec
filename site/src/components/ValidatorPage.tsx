export default function ValidatorPage() {
  return (
    <div className="content">
      <h2 className="section-title">Validator CLI</h2>
      <p className="section-desc">
        Standalone offline validator for the SpecForge Format. Supports JSON, YAML, and TOON.
        Zero SaaS dependency. Zero auth required.
      </p>

      <div className="terminal-block">
        <div className="terminal-header">
          <span className="terminal-dot" style={{ background: '#ef4444' }} />
          <span className="terminal-dot" style={{ background: '#f59e0b' }} />
          <span className="terminal-dot" style={{ background: '#22c55e' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-dim)', marginLeft: 8 }}>terminal</span>
        </div>
        <div className="terminal-body">
          <div><span className="t-comment"># Install globally</span></div>
          <div><span className="t-prompt">$ </span><span className="t-cmd">npm install -g</span> <span className="t-flag">@specforge/validator</span></div>
          <div style={{ height: 12 }} />
          <div><span className="t-comment"># Validate a JSON spec</span></div>
          <div><span className="t-prompt">$ </span><span className="t-cmd">specforge-validate</span> <span className="t-path">./my-spec.sf.json</span></div>
          <div><span className="t-ok">✓ Valid SpecForge spec (v1.0) — json</span></div>
          <div style={{ height: 12 }} />
          <div><span className="t-comment"># Validate a TOON spec</span></div>
          <div><span className="t-prompt">$ </span><span className="t-cmd">specforge-validate</span> <span className="t-path">./my-spec.sf.toon</span></div>
          <div><span className="t-ok">✓ Valid SpecForge spec (v1.0) — toon</span></div>
          <div style={{ height: 12 }} />
          <div><span className="t-comment"># Invalid spec — get specific errors</span></div>
          <div><span className="t-prompt">$ </span><span className="t-cmd">specforge-validate</span> <span className="t-path">./broken.sf.json</span></div>
          <div><span className="t-err">✗ Invalid SpecForge spec:</span></div>
          <div><span className="t-err">  - Missing required field: project.id</span></div>
          <div><span className="t-err">  - specifications[0].status must be one of: draft, planning, ...</span></div>
        </div>
      </div>

      <div className="install-block">
        <div className="install-label">Programmatic Usage</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.8, color: 'var(--text-muted)' }}>
          <div style={{ color: 'var(--purple)' }}>import</div>
          <div style={{ paddingLeft: 16 }}>{'{ validate, toJson }'}</div>
          <div style={{ color: 'var(--purple)' }}>from <span style={{ color: 'var(--green)' }}>&apos;@specforge/validator&apos;</span></div>
          <div style={{ height: 12 }} />
          <div style={{ color: 'var(--text-dim)' }}>// Validate any format</div>
          <div><span style={{ color: 'var(--purple)' }}>const</span> data = <span style={{ color: 'var(--cyan)' }}>toJson</span>(rawInput)</div>
          <div><span style={{ color: 'var(--purple)' }}>const</span> result = <span style={{ color: 'var(--cyan)' }}>validate</span>(data)</div>
          <div style={{ height: 8 }} />
          <div><span style={{ color: 'var(--purple)' }}>if</span> (result.<span style={{ color: 'var(--cyan)' }}>valid</span>) {'{'}</div>
          <div style={{ paddingLeft: 16, color: 'var(--green)' }}>// Ship it</div>
          <div>{'}'}</div>
        </div>
      </div>

      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', padding: 24 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600, letterSpacing: 1.5, color: 'var(--text-dim)', textTransform: 'uppercase' as const, marginBottom: 16 }}>
          Features
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {[
            { label: 'Offline', desc: 'No network calls. No SaaS dependency. Works anywhere.' },
            { label: 'Multi-format', desc: 'Accepts .sf.json, .sf.yaml, and .sf.toon files.' },
            { label: 'Specific errors', desc: 'Points to exact field and provides clear error messages.' },
            { label: 'Programmatic API', desc: 'Import validate() and toJson() in your own tools.' },
          ].map((f) => (
            <div key={f.label} style={{ display: 'flex', gap: 10 }}>
              <span style={{ color: 'var(--green)', flexShrink: 0 }}>✓</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{f.label}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.5 }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
