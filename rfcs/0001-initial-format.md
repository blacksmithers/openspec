# RFC 0001: Initial OpenSpec Format v1.0

- **Status:** Accepted
- **Author:** Solutions Forge <schema@solutionsforge.tech>
- **Created:** 2025-03-05
- **Tier:** Major

## Summary

This RFC documents the initial design of the OpenSpec Format v1.0.
It establishes the core schema, entity hierarchy, dependency model, and serialization
formats that form the foundation of the specification. This is a retroactive RFC that
records the design decisions made during the creation of v1.0.

## Motivation

AI coding agents are effective at small, well-defined tasks but struggle with large
projects that exceed a single context window. There is no standard way to describe a
software project as a decomposed execution graph that any agent can consume. Existing
approaches are either proprietary (locked to a specific engine), too granular (individual
prompts without structure), or too abstract (project management tools that lack the
metadata agents need).

OpenSpec Format fills this gap: a portable, versionable file format that encodes the
full decomposition of a software project with enough metadata for any compliant agent
to execute it.

## Detailed Design

### 1. Hierarchical Entity Model

**Decision:** Project -> Specification -> Epic -> Ticket (strict hierarchy).

**Rationale:** A flat list of tasks does not capture the natural structure of software
projects. Developers think in terms of features (Specifications), milestones (Epics),
and individual work items (Tickets). The hierarchy provides:

- **Scoping.** An agent working on a Ticket knows which Epic and Specification it
  belongs to, providing automatic context about the broader goal.
- **Parallelism boundaries.** Epics within a Specification can often be parallelized.
  Tickets within an Epic have explicit dependency ordering.
- **Context windowing.** An agent can load a single Epic (with its Tickets) into context
  without needing the entire project. The hierarchy defines natural context boundaries.

A flat model was considered and rejected because it forces either (a) every task to
carry the full context of its parent scope, inflating token cost, or (b) a separate
context-injection mechanism, adding complexity.

### 2. openSpecVersion at Root

**Decision:** The `openSpecVersion` field is required at the root of every spec file.

**Rationale:** This is the single field that makes tooling interoperable. Any tool that
encounters a spec file can read `openSpecVersion` to determine which schema to validate
against, which fields to expect, and which features are available.

Without a version field, tools must guess the schema version from the presence or absence
of fields -- a fragile heuristic that breaks as the format evolves. The version field is
intentionally at the root (not nested inside `project` or `meta`) so that it can be read
without parsing the entire file.

This follows the precedent set by OpenAPI (`openapi: "3.1.0"`), Kubernetes
(`apiVersion: apps/v1`), and Docker Compose (`version: "3"`).

### 3. Dependencies as Typed Objects

**Decision:** Dependencies are objects `{ dependsOnId, type }` where `type` is
`"blocks"` or `"requires"`, not plain UUID arrays.

**Rationale:** A UUID array (`dependencies: ["uuid-1", "uuid-2"]`) answers the question
"what must be done first?" but not "why?" The `type` field encodes the nature of the
relationship:

- **`blocks`:** The depended-on ticket produces an artifact (API, schema, component)
  that the dependent ticket consumes. The dependent ticket literally cannot start until
  the blocker is done.
- **`requires`:** The depended-on ticket should be done first for logical ordering or
  risk reduction, but there is no hard artifact dependency. An agent could technically
  start the dependent ticket in parallel if it makes assumptions.

This distinction matters for execution engines that want to optimize parallelism. With
a flat UUID array, the engine must treat all dependencies as hard blockers, which is
overly conservative. With typed dependencies, the engine can parallelize `requires`
relationships while respecting `blocks` relationships.

The trade-off is a slightly more verbose dependency declaration. This was deemed
acceptable because dependencies are a small fraction of the total spec file size,
and the expressiveness gain is significant.

### 4. Patterns at Specification Level

**Decision:** Patterns (coding standards, conventions, architectural rules) are defined
at the Specification level and inherited by all Epics and Tickets within that Specification.

**Rationale:** Patterns represent project-wide decisions: "use TypeScript strict mode,"
"follow the repository pattern for data access," "use Tailwind CSS for styling." These
decisions apply uniformly across all work items in a specification.

Alternatives considered:

- **Project-level patterns:** Too broad. A project may contain multiple specifications
  with different technology stacks (e.g., a backend spec using Go and a frontend spec
  using TypeScript).
- **Ticket-level patterns:** Too granular. Every ticket would repeat the same patterns,
  inflating file size and creating consistency risks.
- **Epic-level patterns:** Considered as a middle ground but rejected because patterns
  rarely vary between epics within the same specification.

Specification-level patterns strike the right balance: specific enough to vary by
technology stack, broad enough to avoid repetition.

### 5. Blueprint as a Core Entity

**Decision:** Blueprint is a first-class entity in the schema, not an engine workflow
artifact.

**Rationale:** Design artifacts -- architecture diagrams, data flow charts, entity
relationship diagrams, API surface designs -- are part of the specification, not part
of the execution. They inform every ticket in the specification and should be versioned
alongside the spec file.

If blueprints were engine-only artifacts, they would be:
- Lost when exporting a spec file from one engine to another.
- Invisible to agents that consume the spec file directly.
- Inconsistent across engines that generate them differently.

By making Blueprint a core entity with support for multiple content formats (Mermaid,
markdown, ASCII, mixed), the spec file is self-contained. An agent can read the
blueprint to understand the system architecture before starting any ticket.

The `contentFormat` field (`mermaid`, `markdown`, `ascii`, `mixed`) was chosen to
cover the most common diagram and documentation formats that LLMs can both read and
generate.

### 6. Ticket Status Enum

**Decision:** Ticket status is one of `["pending", "ready", "active", "done"]`.

**Rationale:** These four states represent the minimal lifecycle of a work item in
a dependency graph:

- **`pending`:** The ticket has unresolved dependencies. It cannot be started.
- **`ready`:** All dependencies are resolved. The ticket can be picked up by an agent.
- **`active`:** An agent is currently working on this ticket.
- **`done`:** The ticket is complete.

Two additional states were considered and rejected:

- **`completed`** (as a synonym for `done`): Rejected in favor of the shorter,
  more universal term. Every project management tool uses slightly different
  terminology; `done` is the most widely understood.
- **`blocked`:** Rejected because "blocked" is a computed state, not a declared state.
  A ticket is blocked when it has `pending` status and at least one dependency is not
  `done`. Storing `blocked` as an explicit status creates a synchronization problem:
  the status must be updated whenever a dependency's status changes. Instead, "blocked"
  is derived from the dependency graph at query time. This keeps the spec file
  declarative rather than stateful.

### 7. TOON as a First-Class Format

**Decision:** TOON (`.oschema.toon`) is a supported format alongside JSON and YAML from
day one, not a later addition.

**Rationale:** OpenSpec Format is designed to be consumed by LLM agents. Token
efficiency directly impacts cost and context window utilization. TOON achieves 39.9%
fewer tokens than equivalent JSON for the same semantic content.

If TOON were added later as an afterthought:
- The schema would need to be retrofitted to ensure lossless round-tripping.
- Existing tooling would need to be updated, creating a fragmented ecosystem.
- The validator would need special handling for a format that was not part of the
  original design.

By treating TOON as a first-class format from v1.0, the schema, validator, and
documentation are designed from the start to support all three formats equally.
The `@blacksmithers/openspec` package accepts JSON, YAML, and TOON with the same
validation logic and the same error messages.

### 8. What Was Intentionally Left Out

The following concepts exist in the OpenSpec engine but were deliberately excluded
from the v1.0 format:

- **WorkSession.** Sessions are an engine concept representing a single agent
  execution context. They are transient, engine-specific, and do not belong in a
  portable spec file. A spec file describes *what* to build; a session describes
  *how it was built*.

- **Scoring and quality metrics.** Implementation scores, test coverage percentages,
  and quality ratings are computed at runtime by the engine. They are not part of
  the specification. Including them would couple the format to a specific quality
  model.

- **Git integration.** Commit hashes, branch names, and pull request URLs are
  engine-specific metadata that change during execution. The spec file is a
  pre-execution artifact. Git metadata belongs in the engine's data model, linked
  to tickets via the engine's API.

- **Counters and statistics.** Ticket counts per epic, completion percentages, and
  other aggregate statistics are derived data. Storing them in the spec file creates
  a synchronization burden and contradicts the principle of a declarative format.

These exclusions follow the guiding principle: if a field would not exist in a spec
file written by hand and never executed, it does not belong in the format.

## Drawbacks

- The hierarchical model adds structural overhead for very small projects (a single
  ticket still requires a Project, Specification, and Epic wrapper).
- Typed dependencies are more verbose than plain UUID arrays.
- Excluding engine fields means the format cannot fully describe a project's execution
  history -- this is intentional but may surprise users who expect a complete record.

## Alternatives

- **Flat task list with tags.** Simpler but loses structural context. Rejected because
  agents need hierarchy for context windowing.
- **GraphQL-style schema.** More flexible but harder to validate statically. Rejected
  in favor of JSON Schema for broader tooling support.
- **Engine-specific export format.** Would capture more data but sacrifice portability.
  Rejected because interoperability is the primary goal.

## Unresolved Questions

None. This RFC documents decisions that have already been implemented in v1.0. Future
changes to these decisions should be proposed as separate RFCs.
