'use client';

/**
 * /why/ page for openspec.tech
 *
 * Design rationale for OpenSpec.
 * This is the single most important page for SEO and for the Evaluator persona.
 *
 * Content structure:
 * 1. Hero — "Why Traditional Tickets Fail for AI Agents"
 * 2. Human vs AI Ticket comparison (interactive)
 * 3. 8 Lessons from 400+ Builds
 * 4. Positioning statement
 */

import Link from 'next/link';
import AppShell from '@/components/AppShell';

// ─── Lesson Data ────────────────────────────────────────────────────────────

interface Lesson {
  number: number;
  title: string;
  slug: string;
  problem: string;
  consequence: string;
  solution: string;
  schemaFields: string[];
  principle: string;
}

const LESSONS: Lesson[] = [
  {
    number: 1,
    title: 'The Jira Ticket Hallucination',
    slug: 'hallucination',
    problem:
      'An agent received a human-style user story: "Add JWT authentication to the API." No file paths. No type signatures. No reference to existing code.',
    consequence:
      'The agent hallucinated file paths that didn\'t exist, invented API signatures incompatible with the codebase, and created types that duplicated ones already defined three directories away. The code compiled. It was wrong in every way that mattered.',
    solution:
      'Every ticket now carries explicit implementation instructions: filesToCreate lists exact paths for new files. filesToModify names every existing file the agent will touch. codeReferences provides the actual signatures and patterns the agent must follow. typeReferences defines the TypeScript types the agent must use — not invent.',
    schemaFields: [
      'implementation.filesToCreate',
      'implementation.filesToModify',
      'codeReferences',
      'typeReferences',
    ],
    principle:
      'If the agent has to guess, it will guess wrong. Every reference must be explicit.',
  },
  {
    number: 2,
    title: 'The Merge Conflict Massacre',
    slug: 'merge-conflict',
    problem:
      'Multiple agents working in parallel modified the same file. Agent A added an import at line 3. Agent B rewrote the function starting at line 5. Agent C added a new export at the end.',
    consequence:
      'Three-way merge conflicts on every file touched by more than one agent. Manual resolution wiped out the productivity gains of parallel execution. The more agents ran simultaneously, the worse it got.',
    solution:
      'With filesToCreate and filesToModify declared in the schema, a scheduler can compute which tickets touch which files before execution starts. Tickets that share files go into the same wave — sequential within the wave, parallel across waves. Zero file collisions by construction, not by luck.',
    schemaFields: [
      'implementation.filesToCreate',
      'implementation.filesToModify',
    ],
    principle:
      'Declare what you\'ll touch before you touch it. Let the scheduler do the math.',
  },
  {
    number: 3,
    title: 'The Status That Shouldn\'t Exist',
    slug: 'status-that-shouldnt-exist',
    problem:
      'The ticket lifecycle had an explicit "blocked" status. When a dependency wasn\'t met, the ticket was marked blocked. When the dependency resolved, someone (or something) had to remember to flip it back to "ready."',
    consequence:
      'Agents got stuck in blocked state because nothing triggered the transition back. Tickets that were theoretically unblocked stayed frozen. The blocked status created a dead state that required external intervention to escape — the opposite of autonomous execution.',
    solution:
      'Blocked was eliminated as a status. The lifecycle became four clean states: pending → ready → active → done. Blocked is now inferred from the dependency graph: if a ticket\'s dependencies (type: blocks) aren\'t done, it\'s pending. When they resolve, it becomes ready automatically. No status transition needed. The dependencies.type field distinguishes blocks (hard gate — cannot start) from requires (needs output, but can be sequenced flexibly).',
    schemaFields: [
      'ticket.status (pending | ready | active | done)',
      'dependencies[].type (blocks | requires)',
    ],
    principle:
      'Don\'t encode derived state as explicit state. Compute it from the graph.',
  },
  {
    number: 4,
    title: 'The Style Drift at Scale',
    slug: 'style-drift',
    problem:
      'With dozens of agents executing tickets in parallel, each one produced code in its own style. Different naming conventions. Different error handling patterns. Different import orderings. Different return type shapes.',
    consequence:
      'The codebase compiled but looked like it was written by 50 different people — because it was. Consistency reviews became the bottleneck. The more agents you added, the worse the Frankenstein effect got.',
    solution:
      'Patterns became a first-class entity in the schema, defined at the Specification level and inherited by every Epic and Ticket beneath it. codeStandards encodes naming conventions, error handling strategy, and language-specific rules. commonImports lists the import statements every ticket should use. returnTypes defines the standard response shapes (e.g., Result&lt;T, E&gt; patterns). Define once at the top. Every agent reads the same patterns.',
    schemaFields: [
      'patterns.codeStandards',
      'patterns.commonImports',
      'patterns.returnTypes',
    ],
    principle:
      'Consistency is a specification problem, not a review problem. Push it upstream.',
  },
  {
    number: 5,
    title: 'The Orphan Design Document',
    slug: 'orphan-design',
    problem:
      'Architecture diagrams, ADRs (Architecture Decision Records), and mockups lived in separate documents — Notion pages, Confluence wikis, Figma files, scattered markdown. No agent knew they existed.',
    consequence:
      'Agents reimplemented things that had already been decided differently. ERD diagrams showed a normalized schema; the agent created a denormalized one. An ADR specified event-driven communication; the agent built synchronous REST calls. Design decisions existed but had no path to execution.',
    solution:
      'Blueprints became a first-class entity in the schema, directly linked to a Specification. Each blueprint has a typed category (flowchart, architecture, sequence, erd, adr, mockup, component, deployment, api), a format (mermaid, markdown, ascii, mixed), a lifecycle status (draft, review, approved, deprecated), and the actual content inline. The agent doesn\'t need to search for design documents — they\'re in the same payload as the tickets.',
    schemaFields: [
      'blueprints[].category',
      'blueprints[].format',
      'blueprints[].status',
      'blueprints[].content',
    ],
    principle:
      'Design decisions that aren\'t in the spec don\'t exist. Make them first-class.',
  },
  {
    number: 6,
    title: 'The Acceptance Criteria Gap',
    slug: 'acceptance-gap',
    problem:
      'Tickets without explicit acceptance criteria produced code that "worked" in isolation but didn\'t satisfy the actual requirement. The agent declared the ticket done because it had no way to verify otherwise.',
    consequence:
      'Reviews became the only quality gate. But by the time a human reviewed the output, the agent had already moved on, building subsequent tickets on top of incorrect foundations. Errors compounded geometrically.',
    solution:
      'acceptanceCriteria became a required array of verifiable strings on every ticket. Combined with testSpecification.gates (unit, integration, e2e), it creates a binary contract: either the ticket passes all criteria and all gates, or it\'s not done. No ambiguity. No "it mostly works." The agent has a checklist it can verify before declaring completion.',
    schemaFields: [
      'ticket.acceptanceCriteria',
      'testSpecification.gates',
      'testSpecification.commands',
    ],
    principle:
      'If the agent can\'t verify it\'s done, it isn\'t done. Make the exit contract explicit.',
  },
  {
    number: 7,
    title: 'The Feedback Loop That Teaches Decomposition',
    slug: 'feedback-loop',
    problem:
      'Without tracking estimated vs. actual time, there was no signal to calibrate decomposition quality. Tickets estimated at 2 hours that took 20 were indistinguishable from tickets that took 2.',
    consequence:
      'Decomposition quality stagnated. The system produced tickets that were either too granular (wasting orchestration overhead) or too broad (exceeding context windows and agent capabilities). There was no feedback mechanism to improve.',
    solution:
      'Both estimatedHours and actualHours live on every ticket. The delta between them is the decomposition quality signal. If actual consistently exceeds estimated, the tickets aren\'t atomic enough — the decomposer needs to produce smaller units. If actual is consistently a fraction of estimated, tickets are over-decomposed. The schema carries the evidence that the next decomposition cycle needs to improve.',
    schemaFields: [
      'ticket.estimatedHours',
      'ticket.actualHours',
    ],
    principle:
      'Agents don\'t learn from memory. They learn from data in the schema. Build the feedback loop into the format.',
  },
  {
    number: 8,
    title: 'The Context Window Graveyard',
    slug: 'context-graveyard',
    problem:
      'In long conversations, the model compacts context. Critical information — which file to create, which type to reference, which pattern to follow — silently disappears from the window. The agent keeps executing, but it\'s now operating on incomplete information.',
    consequence:
      'The agent produces plausible but wrong output. It invents what it can\'t remember. And because the output looks correct — syntactically valid, structurally reasonable — the error isn\'t caught until integration, when the damage is already done.',
    solution:
      'Tickets are designed to be atomic and self-contained. Each ticket carries its complete implementation context: filesToCreate, filesToModify, codeReferences, typeReferences, inherited Patterns, resolved dependencies. The agent doesn\'t need to remember anything from previous tickets or earlier conversation turns. The ticket is the entire context. The schema is designed for intentional amnesia.',
    schemaFields: [
      'ticket.implementation (complete)',
      'ticket.codeReferences (inline)',
      'ticket.typeReferences (inline)',
      'patterns (inherited from specification)',
    ],
    principle:
      'Assume the agent remembers nothing. Make every ticket a complete world.',
  },
];

// ─── Components ─────────────────────────────────────────────────────────────

function HumanVsAIComparison() {
  return (
    <div className="why-comparison">
      <div className="why-comparison-header">
        <h2>Human Ticket vs. Agent Ticket</h2>
        <p>
          The left ticket is how humans communicate work. The right ticket is how
          agents need it. Every field in OpenSpec exists because its
          absence caused a real failure.
        </p>
      </div>

      <div className="why-comparison-grid">
        {/* Human ticket */}
        <div className="why-ticket why-ticket-human">
          <div className="why-ticket-label">Traditional Ticket</div>
          <div className="why-ticket-content">
            <div className="why-ticket-field">
              <span className="why-field-key">Title</span>
              <span className="why-field-value">Add user authentication</span>
            </div>
            <div className="why-ticket-field">
              <span className="why-field-key">Description</span>
              <span className="why-field-value">
                Implement JWT-based auth with login/register endpoints. Use bcrypt
                for passwords. Add middleware for protected routes.
              </span>
            </div>
            <div className="why-ticket-field">
              <span className="why-field-key">Acceptance Criteria</span>
              <span className="why-field-value why-field-list">
                • Users can register{'\n'}• Users can login{'\n'}• Protected routes
                require valid token
              </span>
            </div>
            <div className="why-ticket-field">
              <span className="why-field-key">Story Points</span>
              <span className="why-field-value">5</span>
            </div>
            <div className="why-ticket-field">
              <span className="why-field-key">Assigned to</span>
              <span className="why-field-value">@ai-agent</span>
            </div>
          </div>
          <div className="why-ticket-verdict">
            <span className="why-verdict-icon">✗</span>
            <span>
              The agent will guess file paths, invent type signatures, and ignore
              your existing code structure.
            </span>
          </div>
        </div>

        {/* Agent ticket */}
        <div className="why-ticket why-ticket-agent">
          <div className="why-ticket-label">OpenSpec Ticket</div>
          <pre className="why-ticket-code">
{`{
  "title": "Implement JWT auth middleware",
  "implementation": {
    "filesToCreate": [
      "src/middleware/auth.middleware.ts",
      "src/types/auth.types.ts"
    ],
    "filesToModify": [
      "src/routes/index.ts",
      "src/types/express.d.ts"
    ],
    "steps": [
      "Create AuthPayload and AuthRequest types",
      "Implement verifyToken middleware",
      "Add middleware to protected route group",
      "Extend Express Request type declaration"
    ]
  },
  "codeReferences": [{
    "name": "JwtConfig",
    "code": "src/config/jwt.config.ts::JwtConfig",
    "language": "typescript"
  }],
  "typeReferences": [{
    "name": "UserDocument",
    "definition": "src/models/user.model.ts::UserDocument"
  }],
  "acceptanceCriteria": [
    "Returns 401 for missing token",
    "Returns 403 for expired token",
    "req.user contains decoded UserDocument",
    "Existing routes remain unaffected"
  ],
  "testSpecification": {
    "gates": ["unit", "integration"],
    "commands": ["npm run test:auth"]
  },
  "dependencies": [{
    "dependsOnId": "uuid-of-user-model-ticket",
    "type": "requires"
  }],
  "estimatedHours": 2
}`}
          </pre>
          <div className="why-ticket-verdict why-verdict-pass">
            <span className="why-verdict-icon">✓</span>
            <span>
              The agent knows exactly what to create, what to modify, what
              existing code to reference, and how to verify it&apos;s done.
            </span>
          </div>
        </div>
      </div>

      <div className="why-comparison-callouts">
        <div className="why-callout">
          <span className="why-callout-arrow">→</span>
          <span>
            A traditional ticket says <strong>what</strong>. An OpenSpec ticket
            says <strong>what, where, how, and how to verify</strong>.
          </span>
        </div>
        <div className="why-callout">
          <span className="why-callout-arrow">→</span>
          <span>
            The dependency with type <code>requires</code> means the scheduler
            can run this ticket in parallel with non-dependent work. Type{' '}
            <code>blocks</code> would gate the entire wave.
          </span>
        </div>
        <div className="why-callout">
          <span className="why-callout-arrow">→</span>
          <span>
            Every field shown here maps to a lesson learned from a real failure.
            Hover over the lesson titles below to see the connections.
          </span>
        </div>
      </div>
    </div>
  );
}

function LessonCard({ lesson }: { lesson: Lesson }) {
  return (
    <div className="why-lesson" id={lesson.slug}>
      <div className="why-lesson-header">
        <span className="why-lesson-number">
          {String(lesson.number).padStart(2, '0')}
        </span>
        <h3>{lesson.title}</h3>
      </div>

      <div className="why-lesson-body">
        <div className="why-lesson-section">
          <div className="why-lesson-label">The Problem</div>
          <p>{lesson.problem}</p>
        </div>

        <div className="why-lesson-section">
          <div className="why-lesson-label why-label-red">What Happened</div>
          <p>{lesson.consequence}</p>
        </div>

        <div className="why-lesson-section">
          <div className="why-lesson-label why-label-green">The Fix</div>
          <p>{lesson.solution}</p>
        </div>

        <div className="why-lesson-fields">
          <div className="why-lesson-label why-label-purple">Schema Fields</div>
          <div className="why-fields-list">
            {lesson.schemaFields.map((field) => (
              <code key={field} className="why-field-tag">
                {field}
              </code>
            ))}
          </div>
        </div>

        <div className="why-lesson-principle">
          <span className="why-principle-icon">◇</span>
          <span>{lesson.principle}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function WhyPage() {
  return (
    <AppShell>
      <div className="content">
        {/* Hero */}
        <div className="why-hero">
          <div className="why-hero-label">◇ Design Rationale</div>
          <h1>
            Why Traditional Tickets{' '}
            <span>Fail for AI Agents</span>
          </h1>
          <p className="why-hero-lead">
            Jira tickets, GitHub Issues, and Linear cards were designed for humans
            who can infer context, navigate codebases, and ask clarifying questions.
            AI agents can do none of these things. They need a different format — one
            where every field exists because its absence caused a real failure.
          </p>
          <p className="why-hero-sub">
            OpenSpec was distilled from 400+ builds across 14M+ lines of
            production TypeScript. Every field you see in the{' '}
            <Link href="/schema">schema</Link> earned its place by solving a problem
            that no amount of prompt engineering could fix.
          </p>
        </div>

        {/* Core insight */}
        <div className="why-insight-block">
          <div className="why-insight-label">The Core Insight</div>
          <blockquote className="why-insight-quote">
            Tickets designed for agents, not humans.
          </blockquote>
          <p className="why-insight-text">
            A human developer reading &quot;Add JWT auth&quot; knows to check the existing
            codebase for auth patterns, look at the project structure, find related
            types, and ask a colleague if something is unclear. An AI agent reading
            the same ticket will hallucinate file paths, invent type signatures, and
            produce code that compiles but integrates with nothing. The gap between
            what a human infers and what an agent needs explicitly stated is the
            entire problem OpenSpec solves.
          </p>
        </div>

        {/* Comparison */}
        <HumanVsAIComparison />

        {/* Lessons section */}
        <div className="why-lessons-section">
          <div className="why-lessons-header">
            <h2>
              Eight Lessons from <span>400+ Builds</span>
            </h2>
            <p>
              Each lesson below describes a real failure mode encountered while
              building production software with AI agents. The schema field that
              fixed it is listed at the end. Nothing in the format is theoretical —
              every field is scar tissue.
            </p>
          </div>

          <div className="why-lessons-nav">
            {LESSONS.map((l) => (
              <a key={l.slug} href={`#${l.slug}`} className="why-lessons-nav-item">
                <span className="why-nav-num">
                  {String(l.number).padStart(2, '0')}
                </span>
                <span className="why-nav-title">{l.title}</span>
              </a>
            ))}
          </div>

          <div className="why-lessons-list">
            {LESSONS.map((lesson) => (
              <LessonCard key={lesson.slug} lesson={lesson} />
            ))}
          </div>
        </div>

        {/* Design Principles */}
        <div className="why-principles-section">
          <h2>Design Principles</h2>
          <p>
            These principles guide every RFC and schema change. They emerge directly
            from the eight lessons above.
          </p>
          <div className="why-principles-grid">
            <div className="why-principle-card">
              <div className="why-pcard-num">01</div>
              <h4>Explicit over inferred</h4>
              <p>
                If the agent would need to guess, make it a field. Implicit context
                is where hallucinations begin.
              </p>
            </div>
            <div className="why-principle-card">
              <div className="why-pcard-num">02</div>
              <h4>Atomic and self-contained</h4>
              <p>
                Every ticket carries its complete execution context. Assume the agent
                remembers nothing from previous work.
              </p>
            </div>
            <div className="why-principle-card">
              <div className="why-pcard-num">03</div>
              <h4>Graph over sequence</h4>
              <p>
                Execution order comes from the dependency graph, not from array
                position. Derived state is computed, not stored.
              </p>
            </div>
            <div className="why-principle-card">
              <div className="why-pcard-num">04</div>
              <h4>Consistency at specification time</h4>
              <p>
                Patterns, standards, and conventions are declared once and inherited.
                Consistency is a specification problem, not a review problem.
              </p>
            </div>
            <div className="why-principle-card">
              <div className="why-pcard-num">05</div>
              <h4>Verifiable exit contracts</h4>
              <p>
                Every ticket has acceptance criteria and test gates. If the agent
                can&apos;t verify completion, it isn&apos;t complete.
              </p>
            </div>
            <div className="why-principle-card">
              <div className="why-pcard-num">06</div>
              <h4>Engine-agnostic</h4>
              <p>
                The format describes work, not workflow. Any compliant engine can
                consume it. The schema belongs to the ecosystem.
              </p>
            </div>
          </div>
        </div>

        {/* Positioning */}
        <div className="why-closing">
          <div className="why-closing-statement">
            <p>
              OpenSpec is an open specification. Any tool can generate,
              validate, and consume <code>.oschema.json</code> files. SpecForge
              (the product) is a reference implementation — the most advanced engine
              for executing specs — but the format belongs to the ecosystem.
            </p>
          </div>

          <div className="why-closing-cta">
            <Link href="/getting-started" className="why-cta-primary">
              Get Started →
            </Link>
            <Link href="/schema" className="why-cta-secondary">
              Explore the Schema
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
