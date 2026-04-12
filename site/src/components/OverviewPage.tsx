import Link from 'next/link';

export default function OverviewPage() {
  return (
    <div className="content">
      <div className="overview-hero">
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600, letterSpacing: 2, color: 'var(--accent)', marginBottom: 16, textTransform: 'uppercase' as const }}>
          ◇ Open Standard · v1.0
        </div>
        <h1>
          OpenSpec
        </h1>
        <p style={{ marginTop: 16 }}>
          The open specification format for AI agent orchestration. A versioned, tool-agnostic
          format describing software projects as hierarchical specs that any compliant agent can execute.
        </p>
        <p style={{ marginTop: 12, fontSize: 13, color: 'var(--text-dim)' }}>
          Think OpenAPI, but for agent orchestration instead of REST APIs.
        </p>
      </div>

      <div className="install-block">
        <div className="install-label">Quick Install</div>
        <div className="install-code">
          <span className="prompt">$</span> npm install -g @blacksmithers/openspec
        </div>
      </div>

      <div className="hierarchy-visual">
        <div className="hierarchy-title">Data Hierarchy</div>
        <div className="hierarchy-tree">
          <div className="h-level h-indent-0">
            <span className="h-node h-node-project">Project</span>
            <span className="h-arrow">→ root container</span>
          </div>
          <div className="h-level h-indent-1">
            <span className="h-connector">├─</span>
            <span className="h-node h-node-spec">Specification</span>
            <span className="h-arrow">→ feature or module</span>
          </div>
          <div className="h-level h-indent-2">
            <span className="h-connector">├─</span>
            <span className="h-node h-node-epic">Epic</span>
            <span className="h-arrow">→ work group</span>
          </div>
          <div className="h-level h-indent-3">
            <span className="h-connector">└─</span>
            <span className="h-node h-node-ticket">Ticket</span>
            <span className="h-arrow">→ atomic unit of work</span>
          </div>
        </div>
      </div>

      <div className="ov-core-message">
        <div className="ov-core-label">The Core Insight</div>
        <p className="ov-core-text">
          Traditional tickets say <strong>what</strong>. OpenSpec tickets say <strong>what, where, how, and how to verify</strong>.
          Every field exists because its absence caused a real failure in production AI agent orchestration.
        </p>
      </div>

      <div className="ov-comparison">
        <div className="ov-comparison-label"><span>Human Ticket vs. Agent Ticket</span></div>
        <div className="ov-comparison-grid">
          <div className="ov-ticket ov-ticket-human">
            <div className="ov-ticket-header">Traditional Ticket</div>
            <div className="ov-ticket-body">
              <div className="ov-field"><span className="ov-key">Title</span> Add user authentication</div>
              <div className="ov-field"><span className="ov-key">Desc</span> Implement JWT-based auth with login/register endpoints</div>
              <div className="ov-field"><span className="ov-key">Points</span> 5</div>
            </div>
            <div className="ov-ticket-footer ov-footer-fail">✗ Agent will guess file paths and invent types</div>
          </div>
          <div className="ov-ticket ov-ticket-agent">
            <div className="ov-ticket-header">OpenSpec Ticket</div>
            <pre className="ov-ticket-code">{`{
  "implementation": {
    "filesToCreate": ["src/middleware/auth.ts"],
    "filesToModify": ["src/routes/index.ts"]
  },
  "codeReferences": [{ "name": "JwtConfig", ... }],
  "typeReferences": [{ "name": "UserDocument", ... }],
  "dependencies": [{ "type": "requires", ... }]
}`}</pre>
            <div className="ov-ticket-footer ov-footer-pass">✓ Every reference explicit, every exit verifiable</div>
          </div>
        </div>
        <div className="ov-comparison-cta"><Link href="/why">See the full comparison and 8 lessons →</Link></div>
      </div>

      <div className="overview-grid">
        <Link href="/why" className="overview-card">
          <div className="overview-card-icon">◆</div>
          <h3>Why This Format</h3>
          <p>Eight lessons from 400+ builds. Every field exists because its absence caused a real failure.</p>
        </Link>
        <Link href="/getting-started" className="overview-card">
          <div className="overview-card-icon">▷</div>
          <h3>Getting Started</h3>
          <p>Write, validate, and use an OpenSpec in five minutes. No account required.</p>
        </Link>
        <Link href="/schema" className="overview-card">
          <div className="overview-card-icon">⬡</div>
          <h3>Schema Explorer</h3>
          <p>Browse every entity and field in the format with types, requirements, and descriptions.</p>
        </Link>
        <Link href="/editor" className="overview-card">
          <div className="overview-card-icon">⌘</div>
          <h3>Live Editor</h3>
          <p>Paste or write a spec file and validate it in real-time against the v1.0 schema.</p>
        </Link>
        <Link href="/formats" className="overview-card">
          <div className="overview-card-icon">◈</div>
          <h3>Three Formats</h3>
          <p>JSON for machines, YAML for humans, TOON for LLMs. All lossless representations of one schema.</p>
        </Link>
        <Link href="/validator" className="overview-card">
          <div className="overview-card-icon">▸</div>
          <h3>Offline Validator</h3>
          <p>npm package that validates specs locally. Zero auth, zero SaaS dependency.</p>
        </Link>
      </div>

      <a href="/schema/v1.0/openspec-schema.json" target="_blank" rel="noopener noreferrer" className="overview-card" style={{ marginBottom: 32 }}>
        <div className="overview-card-icon" style={{ color: 'var(--cyan)' }}>◇</div>
        <h3>Schema URL (permanent)</h3>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--cyan)', marginTop: 4 }}>
          https://openspec.tech/schema/v1.0/openspec-schema.json
        </p>
      </a>

      <div className="ov-positioning">
        <p>
          OpenSpec is an open specification. Any tool can generate, validate, and consume{' '}
          <code>.oschema.json</code> files. The format belongs to the ecosystem.
        </p>
      </div>
    </div>
  );
}
