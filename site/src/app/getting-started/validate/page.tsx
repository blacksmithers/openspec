'use client';

import Link from 'next/link';
import AppShell from '@/components/AppShell';

export default function ValidatePage() {
  return (
    <AppShell>
      <div className="content">
        <div className="gs-breadcrumb">
          <Link href="/getting-started">Getting Started</Link>
          <span className="gs-breadcrumb-sep">/</span>
          <span>Validate It</span>
        </div>

        <h1>Validate It</h1>
        <p className="gs-page-lead">
          Install the CLI validator and check your spec against the v1.0 schema.
          Catch errors before they reach your engine.
        </p>

        <div className="gs-section">
          <h2>Install the validator</h2>
          <p>
            The validator is a standalone CLI. Install it globally so you can use
            it from any project:
          </p>
          <pre className="gs-code gs-code-terminal"><span className="gs-prompt">$ </span>npm install -g @blacksmithers/openspec</pre>
        </div>

        <div className="gs-section">
          <h2>Validate your spec</h2>
          <p>
            Point it at the file you created in Step 1:
          </p>
          <pre className="gs-code gs-code-terminal"><span className="gs-prompt">$ </span>openspec todo-api.oschema.json</pre>
          <div className="gs-terminal-output gs-output-success">
            <pre>{`✔ Schema valid (v1.0)
✔ 3 tickets, 0 errors
✔ Dependency graph: acyclic
✔ All patternRefs resolve
✔ All blueprintRefs resolve`}</pre>
          </div>
        </div>

        <div className="gs-section">
          <h2>All three formats work</h2>
          <p>
            The validator auto-detects the format from the file extension. JSON,
            YAML, and TOML are all supported:
          </p>
          <pre className="gs-code gs-code-terminal"><span className="gs-prompt">$ </span>openspec todo-api.oschema.yaml
<span className="gs-prompt">$ </span>openspec todo-api.oschema.toon
<span className="gs-prompt">$ </span>openspec todo-api.oschema.json</pre>
        </div>

        <div className="gs-section">
          <h2>What errors look like</h2>
          <p>
            The validator produces clear, actionable error messages. Here are
            three common mistakes and what the output looks like:
          </p>

          <h3>Missing required field</h3>
          <pre className="gs-code gs-code-terminal"><span className="gs-prompt">$ </span>openspec bad-spec.oschema.json</pre>
          <div className="gs-terminal-output gs-output-error">
            <pre>{`✘ Validation failed

  error: specifications[0].epics[0].tickets[0] must have required property 'status'

  at: /specifications/0/epics/0/tickets/0
  fix: Add a "status" field with one of: open, in-progress, done, blocked`}</pre>
          </div>

          <h3>Circular dependency</h3>
          <pre className="gs-code gs-code-terminal"><span className="gs-prompt">$ </span>openspec circular.oschema.json</pre>
          <div className="gs-terminal-output gs-output-error">
            <pre>{`✘ Validation failed

  error: Circular dependency detected
  cycle: ticket-a → ticket-b → ticket-c → ticket-a

  fix: Remove one dependency to break the cycle`}</pre>
          </div>

          <h3>Dangling reference</h3>
          <pre className="gs-code gs-code-terminal"><span className="gs-prompt">$ </span>openspec dangling.oschema.json</pre>
          <div className="gs-terminal-output gs-output-error">
            <pre>{`✘ Validation failed

  error: Unresolved patternRef "pattern-auth" in ticket "ticket-create-todo"
  available patterns: pattern-rest-conventions, pattern-error-format

  fix: Add pattern "pattern-auth" to the specification's patterns array,
       or remove the reference from the ticket`}</pre>
          </div>

          <div className="gs-annotation-box">
            <strong>Why this matters:</strong> A ticket with status
            &quot;in-progress&quot; whose dependency is still &quot;open&quot; is a
            contradiction. The validator catches these so your engine never
            starts work that shouldn&apos;t exist yet.{' '}
            <Link href="/why#status-that-shouldnt-exist">See: Work That Shouldn&apos;t Exist Yet →</Link>
          </div>
        </div>

        <div className="gs-section">
          <h2>Validate in CI</h2>
          <p>
            Add validation to your CI pipeline so specs are always checked on
            push. Here is a GitHub Actions example:
          </p>
          <pre className="gs-code">{`name: Validate OpenSpec Spec
on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - run: npm install -g @blacksmithers/openspec

      - run: openspec ./specs/*.oschema.json`}</pre>
          <p>
            Any validation error will fail the build and show up in the PR
            checks.
          </p>
        </div>

        <div className="gs-nav-footer">
          <Link href="/getting-started/first-spec" className="gs-nav-prev">
            ← Write Your First Spec
          </Link>
          <Link href="/getting-started/integrate" className="gs-nav-next">
            Use It Programmatically →
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
