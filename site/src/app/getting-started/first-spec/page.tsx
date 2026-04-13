'use client';

import Link from 'next/link';
import AppShell from '@/components/AppShell';
import { ArrowDown } from 'lucide-react';

export default function FirstSpecPage() {
  return (
    <AppShell>
      <div className="content">
        <div className="gs-breadcrumb">
          <Link href="/getting-started">Getting Started</Link>
          <span className="gs-breadcrumb-sep">/</span>
          <span>Write Your First Spec</span>
        </div>

        <h1>Write Your First Spec</h1>
        <p className="gs-page-lead">
          Build a real spec for a Todo API. By the end you will have a file that
          any OpenSpec-compatible engine can parse, validate, and execute.
        </p>

        <div className="gs-section">
          <h2>The smallest valid spec</h2>
          <p>
            An OpenSpec file is JSON, YAML, or TOML. Here is the absolute
            minimum — a project with one specification, one epic, and one ticket:
          </p>
          <pre className="gs-code">{`{
  "openSpecVersion": "1.0",
  "project": {
    "name": "todo-api",
    "description": "A simple Todo REST API"
  },
  "specifications": [
    {
      "id": "spec-todo-api",
      "title": "Todo API",
      "status": "draft",
      "epics": [
        {
          "id": "epic-core",
          "title": "Core CRUD",
          "tickets": [
            {
              "id": "ticket-create-todo",
              "title": "POST /todos",
              "status": "open",
              "priority": "high",
              "estimate": "S"
            }
          ]
        }
      ]
    }
  ]
}`}</pre>
          <p>
            Save this as <code>todo-api.oschema.json</code>. That&apos;s a valid
            OpenSpec spec. Everything else builds on this skeleton.
          </p>
        </div>

        <div className="gs-section">
          <h2>Adding a Specification with Patterns</h2>
          <p>
            Patterns capture architectural decisions that apply across tickets.
            They prevent style drift by giving agents a single source of truth
            for conventions.
          </p>
          <pre className="gs-code">{`{
  "id": "spec-todo-api",
  "title": "Todo API",
  "status": "draft",
  "patterns": [
    {
      "id": "pattern-rest-conventions",
      "title": "REST Conventions",
      "description": "All endpoints follow JSON:API style responses.",
      "rules": [
        "Use plural nouns for resource URLs",
        "Return 201 for successful POST, 200 for GET/PUT, 204 for DELETE",
        "Wrap response data in a { \\"data\\": ... } envelope"
      ]
    },
    {
      "id": "pattern-error-format",
      "title": "Error Format",
      "description": "Consistent error shape across all endpoints.",
      "rules": [
        "Return { \\"error\\": { \\"code\\": string, \\"message\\": string } }",
        "Use HTTP status codes correctly — 400 for validation, 404 for missing, 500 for server errors"
      ]
    }
  ]
}`}</pre>
          <div className="gs-annotation-box">
            <strong>Why this matters:</strong> Without shared patterns, each agent
            (or developer) invents their own conventions. The spec becomes
            inconsistent over time.{' '}
            <Link href="/why#style-drift">See: Style Drift →</Link>
          </div>
        </div>

        <div className="gs-section">
          <h2>Blueprints</h2>
          <p>
            Blueprints are design artifacts — diagrams, schemas, wireframes —
            referenced by tickets. They keep design decisions discoverable
            instead of buried in chat logs or document folders.
          </p>
          <pre className="gs-code">{`"blueprints": [
  {
    "id": "blueprint-db-schema",
    "title": "Database Schema",
    "type": "schema",
    "content": "CREATE TABLE todos (\\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\\n  title TEXT NOT NULL,\\n  completed BOOLEAN DEFAULT false,\\n  created_at TIMESTAMPTZ DEFAULT now()\\n);",
    "format": "sql"
  },
  {
    "id": "blueprint-api-contract",
    "title": "API Contract",
    "type": "api",
    "content": "openapi: 3.0.0\\npaths:\\n  /todos:\\n    get:\\n      summary: List all todos",
    "format": "yaml"
  }
]`}</pre>
          <div className="gs-annotation-box">
            <strong>Why this matters:</strong> Design artifacts that live outside
            the spec get lost or go stale. Blueprints keep them version-controlled
            and linked to the tickets that implement them.{' '}
            <Link href="/why#orphan-design">See: Orphan Design Artifacts →</Link>
          </div>
        </div>

        <div className="gs-section">
          <h2>Tickets — The atomic unit of agent work</h2>
          <p>
            A ticket is the smallest piece of work in a OpenSpec spec. It has a
            status, a priority, an estimate, and optionally references patterns
            and blueprints so the implementing agent knows what to follow and
            what to build against.
          </p>
          <pre className="gs-code">{`{
  "id": "ticket-create-todo",
  "title": "POST /todos",
  "description": "Create a new todo item. Validate title is non-empty. Return 201 with the created resource.",
  "status": "open",
  "priority": "high",
  "estimate": "S",
  "patternRefs": ["pattern-rest-conventions", "pattern-error-format"],
  "blueprintRefs": ["blueprint-db-schema", "blueprint-api-contract"],
  "acceptanceCriteria": [
    "POST /todos with { \\"title\\": \\"Buy milk\\" } returns 201",
    "Response body matches { \\"data\\": { \\"id\\": string, \\"title\\": string, \\"completed\\": false } }",
    "POST /todos with empty title returns 400 with error envelope"
  ]
}`}</pre>
          <div className="gs-annotation-box">
            <strong>Why this matters:</strong> Agents hallucinate requirements
            when the spec is vague. Acceptance criteria give them a concrete
            checklist to verify against.{' '}
            <Link href="/why#hallucination">See: Hallucinated Requirements →</Link>
          </div>
        </div>

        <div className="gs-section">
          <h2>Dependencies — The execution graph</h2>
          <p>
            Tickets can declare dependencies on other tickets. OpenSpec supports
            two dependency types:
          </p>
          <ul className="gs-list">
            <li>
              <code>requires</code> — this ticket needs the other to be complete
              before it can start.
            </li>
            <li>
              <code>blocks</code> — this ticket prevents the other from starting
              until it is complete.
            </li>
          </ul>
          <pre className="gs-code">{`{
  "id": "ticket-list-todos",
  "title": "GET /todos",
  "status": "open",
  "priority": "high",
  "estimate": "S",
  "dependencies": [
    {
      "ticketId": "ticket-create-todo",
      "type": "requires"
    }
  ]
},
{
  "id": "ticket-delete-todo",
  "title": "DELETE /todos/:id",
  "status": "open",
  "priority": "medium",
  "estimate": "S",
  "dependencies": [
    {
      "ticketId": "ticket-create-todo",
      "type": "requires"
    }
  ]
}`}</pre>
          <div className="gs-annotation-box">
            <strong>Why this matters:</strong> Without explicit dependency data,
            an engine might start a ticket whose prerequisites are not done yet.
            The validator catches circular dependencies and dangling references
            at lint time.{' '}
            <Link href="/why#status-that-shouldnt-exist">See: Work That Shouldn&apos;t Exist Yet →</Link>
          </div>
        </div>

        <div className="gs-section">
          <h2>How an engine sees this spec</h2>
          <p>
            The dependency graph for our Todo API looks like this. An engine
            walks the graph to determine what can be worked on next.
          </p>
          <div className="gs-graph">
            <div className="gs-graph-row">
              <div className="gs-graph-node gs-graph-root">ticket-create-todo</div>
            </div>
            <div className="gs-graph-arrows">
              <span className="gs-graph-arrow"><ArrowDown size={14} /></span>
              <span className="gs-graph-arrow"><ArrowDown size={14} /></span>
            </div>
            <div className="gs-graph-row">
              <div className="gs-graph-node">ticket-list-todos</div>
              <div className="gs-graph-node">ticket-delete-todo</div>
            </div>
          </div>
          <p>
            <code>ticket-create-todo</code> has no dependencies, so it is
            actionable immediately. The other two require it, so they wait.
          </p>
        </div>

        <div className="gs-nav-footer">
          <Link href="/getting-started" className="gs-nav-prev">
            ← Getting Started
          </Link>
          <Link href="/getting-started/validate" className="gs-nav-next">
            Validate It →
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
