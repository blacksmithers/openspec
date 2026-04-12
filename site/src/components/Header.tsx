export default function Header() {
  return (
    <div className="header">
      <div className="header-left">
        <img src="/openspec-logo.svg" height={32} alt="OpenSpec" style={{ flexShrink: 0 }} />
        <div className="version-pill">v1.0</div>
      </div>
      <div className="header-right">
        <a className="header-link" href="https://specforge.tech" target="_blank" rel="noopener noreferrer">
          specforge.tech
        </a>
        <a className="header-link" href="https://github.com/blacksmithers/openspec" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <span className="header-link">RFC</span>
      </div>
    </div>
  );
}
