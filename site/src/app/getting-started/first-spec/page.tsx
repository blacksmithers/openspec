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
            An OpenSpec file is JSON, YAML, or TOON. In v1.1 the document{' '}
            <em>is</em> a single specification — there is no <code>project</code>{' '}
            wrapper and no <code>specifications</code> array. The root carries{' '}
            <code>schemaVersion: &quot;1.1&quot;</code> plus a handful of required
            fields: <code>id</code>, <code>projectId</code>, <code>title</code>,{' '}
            <code>status</code>, <code>goals</code>, <code>requirements</code>,{' '}
            <code>architecture</code>, <code>scope</code>, <code>techStack</code>,{' '}
            <code>folderStructures</code>, <code>acceptanceCriteria</code>,{' '}
            <code>nonFunctionalRequirements</code>, <code>guardrails</code>,{' '}
            <code>epics</code>, and <code>blueprints</code>. Here is the smallest
            valid Todo API spec:
          </p>
          <pre className="gs-code">{`{
  "schemaVersion": "1.1",
  "id": "spec-todo-api",
  "projectId": "proj-todo",
  "title": "Todo API",
  "status": "planning",
  "goals": [
    {
      "id": "goal-capture",
      "title": "Capture todos quickly",
      "description": "Let users create and list todos with minimal friction.",
      "type": "user",
      "successCriteria": ["A todo can be created and listed in under one second"]
    },
    {
      "id": "goal-durable",
      "title": "Keep todos durable",
      "description": "Persist todos so they survive restarts.",
      "type": "technical",
      "successCriteria": ["No todo is lost across a service restart"]
    },
    {
      "id": "goal-contract",
      "title": "Expose a stable contract",
      "description": "Offer a predictable REST surface clients can rely on.",
      "type": "business",
      "successCriteria": ["The public endpoints follow a documented contract"]
    }
  ],
  "requirements": [
    {
      "id": "req-create",
      "title": "Create a todo",
      "description": "Clients can create a todo with a title.",
      "type": "functional",
      "acceptanceCriteria": [
        {
          "id": "ac-create",
          "given": "a valid todo payload",
          "when": "the client POSTs to /todos",
          "then": "the todo is stored and returned with a generated id",
          "order": 1
        }
      ]
    },
    {
      "id": "req-list",
      "title": "List todos",
      "description": "Clients can retrieve all todos.",
      "type": "functional",
      "acceptanceCriteria": [
        {
          "id": "ac-list",
          "given": "stored todos exist",
          "when": "the client GETs /todos",
          "then": "all todos are returned in creation order",
          "order": 1
        }
      ]
    },
    {
      "id": "req-validate",
      "title": "Reject invalid input",
      "description": "Malformed payloads are rejected clearly.",
      "type": "business-rule",
      "acceptanceCriteria": [
        {
          "id": "ac-validate",
          "given": "a payload without a title",
          "when": "the client POSTs to /todos",
          "then": "the request is rejected with a 400",
          "order": 1
        }
      ]
    }
  ],
  "architecture": "A stateless HTTP service backed by a relational database, exposing a small REST API for todos.",
  "scope": {
    "inScope": ["Creating todos", "Listing todos", "Input validation"],
    "outOfScope": ["Authentication and multi-user accounts"]
  },
  "techStack": [],
  "folderStructures": [
    {
      "id": "fs-service",
      "scope": "service",
      "content": "src/\\n  routes/todos.ts\\n  db/index.ts\\n  server.ts"
    }
  ],
  "acceptanceCriteria": [],
  "nonFunctionalRequirements": [],
  "guardrails": [],
  "epics": [],
  "blueprints": []
}`}</pre>
          <p>
            Save this as <code>todo-api.oschema.json</code>. That&apos;s a valid
            OpenSpec spec. Everything else builds on this skeleton.
          </p>
        </div>

        <div className="gs-section">
          <h2>Goals and requirements are structured</h2>
          <p>
            In v1.1, <code>goals</code> and <code>requirements</code> are no longer
            plain strings — each is a typed object. A goal declares a{' '}
            <code>type</code> and <code>successCriteria</code>; a requirement
            carries <code>acceptanceCriteria</code> written as Given / When / Then
            so an agent has a concrete checklist to verify against.
          </p>
          <pre className="gs-code">{`{
  "goals": [
    {
      "id": "goal-capture",
      "title": "Capture todos quickly",
      "description": "Let users create and list todos with minimal friction.",
      "type": "user",
      "successCriteria": ["A todo can be created and listed in under one second"]
    }
  ],
  "requirements": [
    {
      "id": "req-create",
      "title": "Create a todo",
      "description": "Clients can create a todo with a title.",
      "type": "functional",
      "acceptanceCriteria": [
        {
          "id": "ac-create",
          "given": "a valid todo payload",
          "when": "the client POSTs to /todos",
          "then": "the todo is stored and returned with a generated id",
          "order": 1
        }
      ]
    }
  ]
}`}</pre>
          <div className="gs-annotation-box">
            <strong>Why this matters:</strong> Agents hallucinate requirements when
            the spec is vague. Structured acceptance criteria give them an explicit
            pass/fail checklist instead of a paragraph to interpret.{' '}
            <Link href="/why#hallucination">See: Hallucinated Requirements →</Link>
          </div>
        </div>

        <div className="gs-section">
          <h2>Shared patterns</h2>
          <p>
            Shared patterns capture conventions that apply across tickets. They
            prevent style drift by giving agents a single source of truth for code
            standards, common imports, and return types.
          </p>
          <pre className="gs-code">{`{
  "sharedPatterns": [
    {
      "id": "sp-rest",
      "name": "REST conventions",
      "description": "All endpoints return JSON and use plural resource URLs.",
      "codeStandards": {
        "naming": "camelCase for fields, plural nouns for routes",
        "errorHandling": "Return a typed Result at module boundaries"
      },
      "commonImports": ["import { Result, ok, err } from '../shared/result'"],
      "returnTypes": { "handler": "Promise<Result<Response, AppError>>" }
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
            Blueprints are design artifacts — diagrams, schemas, ADRs — referenced
            by tickets. Each has a <code>category</code>, a <code>format</code>, and
            a <code>content</code> body. They keep design decisions discoverable
            instead of buried in chat logs or document folders.
          </p>
          <pre className="gs-code">{`{
  "blueprints": [
    {
      "id": "bp-db-schema",
      "title": "Database schema",
      "category": "erd",
      "format": "mermaid",
      "content": "erDiagram\\n  TODO {\\n    uuid id PK\\n    string title\\n    bool completed\\n  }"
    },
    {
      "id": "bp-api-contract",
      "title": "API contract",
      "category": "api",
      "format": "markdown",
      "content": "GET /todos -> 200 [Todo]\\nPOST /todos -> 201 Todo"
    }
  ]
}`}</pre>
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
            Tickets live inside an epic and are the smallest piece of work in a
            spec. Each declares a <code>ticketType</code>, a <code>complexity</code>,
            an <code>estimatedMinutes</code> budget, Given / When / Then{' '}
            <code>acceptanceCriteria</code>, ordered <code>implementationSteps</code>,
            and the files it will touch — so the implementing agent knows exactly
            what to build and how it will be checked.
          </p>
          <pre className="gs-code">{`{
  "id": "ticket-create-todo",
  "epicId": "epic-core",
  "title": "Implement POST /todos",
  "description": "Create a todo. Validate the title is non-empty. Return 201 with the created resource.",
  "ticketType": "implementation",
  "complexity": "small",
  "estimatedMinutes": 90,
  "acceptanceCriteria": [
    {
      "id": "ac-create-201",
      "given": "a payload with a title",
      "when": "POST /todos is called",
      "then": "a 201 is returned with the created todo",
      "order": 1
    },
    {
      "id": "ac-create-400",
      "given": "a payload without a title",
      "when": "POST /todos is called",
      "then": "a 400 is returned with an error envelope",
      "order": 2
    }
  ],
  "implementationSteps": [
    { "id": "step-1", "text": "Add the POST /todos route handler", "order": 1 },
    { "id": "step-2", "text": "Validate the payload and persist the todo", "order": 2 }
  ],
  "filesToBeCreated": ["src/routes/todos.ts"],
  "blueprintReferences": [
    { "blueprintId": "bp-api-contract", "context": "Create path" }
  ],
  "dependencies": []
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
            Tickets can declare dependencies on other tickets using a target{' '}
            <code>ticketId</code> and a type. OpenSpec supports two dependency
            types:
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
          <pre className="gs-code">{`[
  {
    "id": "ticket-create-todo",
    "title": "POST /todos",
    "dependencies": []
  },
  {
    "id": "ticket-list-todos",
    "title": "GET /todos",
    "dependencies": [
      { "ticketId": "ticket-create-todo", "type": "requires" }
    ]
  },
  {
    "id": "ticket-delete-todo",
    "title": "DELETE /todos/:id",
    "dependencies": [
      { "ticketId": "ticket-create-todo", "type": "requires" }
    ]
  }
]`}</pre>
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
