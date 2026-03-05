export default function ChangelogPage() {
  return (
    <div className="content">
      <h2 className="section-title">Changelog</h2>
      <p className="section-desc">
        All notable changes to the SpecForge Format specification.
      </p>

      <div className="changelog-entry">
        <div className="changelog-version">v1.0.0</div>
        <div className="changelog-date">March 2026 — Initial Release</div>
        <div className="changelog-item">Initial SpecForge Format v1.0 schema published</div>
        <div className="changelog-item">6 core entities: Project, Specification, Epic, Ticket, Blueprint, Patterns</div>
        <div className="changelog-item">Three format support: JSON, YAML, TOON</div>
        <div className="changelog-item">@specforge/validator npm package with CLI and programmatic API</div>
        <div className="changelog-item">Dependency graph with blocks/requires relationship types</div>
        <div className="changelog-item">Ticket status: pending → ready → active → done (blocked signaled via statusReason)</div>
        <div className="changelog-item">RFC 0001 documenting all v1.0 design decisions</div>
        <div className="changelog-item">GOVERNANCE.md with OpenAPI-style change tiers (patch/minor/major)</div>
      </div>
    </div>
  );
}
