'use client';

import Link from 'next/link';
import AppShell from '@/components/AppShell';

export default function IntegratePage() {
  return (
    <AppShell>
      <div className="content">
        <div className="gs-breadcrumb">
          <Link href="/getting-started">Getting Started</Link>
          <span className="gs-breadcrumb-sep">/</span>
          <span>Use It Programmatically</span>
        </div>

        <h1>Use It Programmatically</h1>
        <p className="gs-page-lead">
          Parse, validate, traverse, and convert specs in code. The{' '}
          <code>@blacksmithers/openspec</code> package gives you typed access to
          everything in the spec.
        </p>

        <div className="gs-section">
          <h2>Install as a dependency</h2>
          <p>
            Add the package to your project:
          </p>
          <pre className="gs-code gs-code-terminal"><span className="gs-prompt">$ </span>npm install @blacksmithers/openspec</pre>
          <p>
            The CLI is also available globally:
          </p>
          <pre className="gs-code gs-code-terminal"><span className="gs-prompt">$ </span>npm install -g @blacksmithers/openspec</pre>
        </div>

        <div className="gs-section">
          <h2>Parse any format</h2>
          <p>
            The parser handles JSON, YAML, and TOON. You get back a typed{' '}
            <code>OpenSpec</code> object regardless of the source format:
          </p>
          <pre className="gs-code">{`import { parse, detectFormat, toJson, toYaml, toToon } from '@blacksmithers/openspec';

// Parse a string — auto-detects format
const spec = parse(fileContents);

// Detect which format a string is in
const format = detectFormat(fileContents);
// 'json' | 'yaml' | 'toon'

// Convert a parsed spec back to any format
const json = toJson(spec);
const yaml = toYaml(spec);
const toon = toToon(spec);`}</pre>
        </div>

        <div className="gs-section">
          <h2>Validate</h2>
          <p>
            Programmatic validation returns structured results you can act on:
          </p>
          <pre className="gs-code">{`import { validate, validateWithSchema } from '@blacksmithers/openspec';

const result = validate(spec);

if (result.valid) {
  console.log('Spec is valid');
} else {
  for (const error of result.errors) {
    console.error(\`[\${error.path}] \${error.message}\`);
    // [/specifications/0/epics/0/tickets/0] must have required property 'status'
  }
}

// Validate against a specific schema version
const schemaResult = validateWithSchema(spec, schemaObject);`}</pre>
          <p>
            The <code>ValidationResult</code> type gives you <code>valid</code>,{' '}
            <code>errors</code>, and <code>warnings</code> — all fully typed.
          </p>
        </div>

        <div className="gs-section">
          <h2>Traverse the hierarchy</h2>
          <p>
            Walk specs, epics, tickets, and blueprints without manual nesting:
          </p>
          <pre className="gs-code">{`import {
  getSpecifications,
  getEpics,
  getTickets,
  getBlueprints,
  getAllTicketsMap,
  findTicketById,
  findTicketByNumber,
  findByStatus,
  findByTag,
} from '@blacksmithers/openspec';

// Get all specifications from a parsed spec
const specifications = getSpecifications(spec);

// Get all epics across specifications
const epics = getEpics(spec);

// Get all tickets across all epics and specifications
const tickets = getTickets(spec);

// Get all blueprints
const blueprints = getBlueprints(spec);

// Build a map of ticketId → Ticket for fast lookups
const ticketMap = getAllTicketsMap(spec);

// Find a specific ticket by ID or number
const ticket = findTicketById(spec, 'ticket-create-todo');
const ticketByNum = findTicketByNumber(spec, 42);

// Filter tickets by status or tag
const openTickets = findByStatus(spec, 'open');
const apiTickets = findByTag(spec, 'api');`}</pre>
        </div>

        <div className="gs-section">
          <h2>Resolve the dependency graph</h2>
          <p>
            Build a dependency graph and query it for actionable tickets,
            blocked tickets, or execution waves:
          </p>
          <pre className="gs-code">{`import {
  resolveDependencyGraph,
  getReadyTickets,
  getBlockedTickets,
  getExecutionWaves,
  resolvePatterns,
} from '@blacksmithers/openspec';

// Build the full dependency graph
const graph = resolveDependencyGraph(spec);

// What can be worked on right now?
const ready = getReadyTickets(spec);
// [{ id: 'ticket-create-todo', ... }]

// What is blocked and why?
const blocked = getBlockedTickets(spec);
// [{ id: 'ticket-list-todos', blockedBy: ['ticket-create-todo'] }, ...]

// Get execution waves — groups of tickets that can run in parallel
const waves = getExecutionWaves(spec);
// [[ticket-create-todo], [ticket-list-todos, ticket-delete-todo]]

// Resolve inherited patterns for a specification
const patterns = resolvePatterns(spec, 'spec-todo-api');`}</pre>
        </div>

        <div className="gs-section">
          <h2>Types</h2>
          <p>
            All core types are exported for use in your own tools:
          </p>
          <pre className="gs-code">{`import type {
  OpenSpec,
  Project,
  Specification,
  Epic,
  Ticket,
  Blueprint,
  Patterns,
  ValidationResult,
} from '@blacksmithers/openspec';

// Full type safety when working with specs
function processTicket(ticket: Ticket): void {
  console.log(ticket.id, ticket.title, ticket.status);
}

function buildDashboard(spec: OpenSpec): void {
  const project: Project = spec.project;
  const specifications: Specification[] = spec.specifications;
  // ...
}`}</pre>
        </div>

        <div className="gs-section">
          <h2>What you can build</h2>
          <p>
            OpenSpec is an open format. Here are some things people are building
            with the library:
          </p>
          <div className="gs-build-grid">
            <div className="gs-build-card">
              <h3>Agent Orchestrators</h3>
              <p>
                Feed the dependency graph to an agent scheduler. Each agent picks
                up ready tickets, marks them done, and unblocks the next wave.
              </p>
            </div>
            <div className="gs-build-card">
              <h3>Project Dashboards</h3>
              <p>
                Parse the spec and render progress by epic, spec, or ticket
                status. No database required — the spec file is the source of
                truth.
              </p>
            </div>
            <div className="gs-build-card">
              <h3>CI Validators</h3>
              <p>
                Block merges when the spec has circular dependencies, dangling
                references, or missing required fields. Shift left on spec
                quality.
              </p>
            </div>
            <div className="gs-build-card">
              <h3>Code Generators</h3>
              <p>
                Read blueprint schemas and ticket acceptance criteria to scaffold
                boilerplate — routes, models, tests — directly from the spec.
              </p>
            </div>
          </div>
        </div>

        <div className="gs-nav-footer">
          <Link href="/getting-started/validate" className="gs-nav-prev">
            ← Validate It
          </Link>
          <Link href="/schema" className="gs-nav-next">
            Explore the Schema →
          </Link>
        </div>

        <div className="gs-closing">
          <p>
            That&apos;s the full tour. You have a spec, it validates, and you can
            work with it in code. The format is open, the tooling is yours to
            extend.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
