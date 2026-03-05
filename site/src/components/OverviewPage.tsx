export default function OverviewPage() {
  return (
    <div className="content">
      <div className="overview-hero">
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600, letterSpacing: 2, color: 'var(--purple)', marginBottom: 16, textTransform: 'uppercase' as const }}>
          ◇ Open Standard · v1.0
        </div>
        <h1>
          SpecForge <span>Format</span>
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
          <span className="prompt">$</span> npm install -g @specforge/validator
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

      <div className="overview-grid">
        <div className="overview-card">
          <div className="overview-card-icon">⬡</div>
          <h3>Schema Explorer</h3>
          <p>Browse every entity and field in the format with types, requirements, and descriptions.</p>
        </div>
        <div className="overview-card">
          <div className="overview-card-icon">⌘</div>
          <h3>Live Editor</h3>
          <p>Paste or write a spec file and validate it in real-time against the v1.0 schema.</p>
        </div>
        <div className="overview-card">
          <div className="overview-card-icon">◈</div>
          <h3>Three Formats</h3>
          <p>JSON for machines, YAML for humans, TOON for LLMs. All lossless representations of one schema.</p>
        </div>
        <div className="overview-card">
          <div className="overview-card-icon">▸</div>
          <h3>Offline Validator</h3>
          <p>npm package that validates specs locally. Zero auth, zero SaaS dependency.</p>
        </div>
      </div>

      <div className="install-block">
        <div className="install-label">Schema URL (permanent)</div>
        <div className="install-code" style={{ color: 'var(--cyan)', fontSize: 12 }}>
          https://schema.specforge.tech/schema/v1.0/specforge-schema.json
        </div>
      </div>
    </div>
  );
}
