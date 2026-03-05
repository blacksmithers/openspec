---
title: Dependencies
description: How tickets declare execution order through the SpecForge dependency system.
---

The dependency system in SpecForge Format defines execution order between tickets. Dependencies tell agents which tickets must be completed before others can begin, enabling correct sequencing of implementation work.

## Structure

Each dependency is an object with two fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `dependsOnId` | `string` | Yes | The `id` of the ticket this ticket depends on. |
| `type` | `string` | Yes | The nature of the dependency. See type enum. |

Dependencies are declared as an array on the dependent ticket:

```json
{
  "id": "ticket_api_tests",
  "ticketNumber": "TEST-001",
  "title": "Write API integration tests",
  "dependencies": [
    {
      "dependsOnId": "ticket_api_endpoints",
      "type": "blocks"
    },
    {
      "dependsOnId": "ticket_test_fixtures",
      "type": "requires"
    }
  ]
}
```

## Dependency Types

### `blocks`

A **blocking** dependency means the depended-on ticket must be fully completed (`done` status) before the dependent ticket can begin. This is a hard constraint.

Use `blocks` when the dependent ticket literally cannot be implemented without the output of the blocking ticket. For example:

- API tests **are blocked by** API endpoints (you cannot test what does not exist).
- Frontend integration **is blocked by** the backend API it calls.

### `requires`

A **requires** dependency is a softer constraint. It indicates that the depended-on ticket should ideally be completed first, but partial or parallel work may be possible.

Use `requires` when the dependent ticket benefits from the other being done but could be started with stubs, mocks, or assumptions. For example:

- A dashboard page **requires** the data API, but could be built with mock data.
- Documentation **requires** the feature it documents, but can be drafted early.

## Dependency Graph Resolution

Agents processing a SpecForge document should resolve the dependency graph to determine the correct execution order. The recommended algorithm:

1. **Build the graph.** Create a directed acyclic graph (DAG) where each ticket is a node and each dependency is an edge.
2. **Detect cycles.** If the graph contains cycles, report an error. Circular dependencies are invalid.
3. **Topological sort.** Sort tickets in topological order. Tickets with no dependencies come first.
4. **Respect types.** For `blocks` dependencies, strictly enforce ordering. For `requires` dependencies, prefer the order but allow parallel execution if the agent supports it.
5. **Cross-epic dependencies.** Dependencies can reference tickets in other epics or even other specifications. The graph is global across the entire document.

## Example: Full Dependency Chain

```json
{
  "tickets": [
    {
      "id": "ticket_db_schema",
      "ticketNumber": "DB-001",
      "title": "Create database schema",
      "type": "feature",
      "status": "open",
      "priority": "high",
      "complexity": "medium"
    },
    {
      "id": "ticket_db_seed",
      "ticketNumber": "DB-002",
      "title": "Create seed data script",
      "type": "chore",
      "status": "open",
      "priority": "medium",
      "complexity": "low",
      "dependencies": [
        {
          "dependsOnId": "ticket_db_schema",
          "type": "blocks"
        }
      ]
    },
    {
      "id": "ticket_api_crud",
      "ticketNumber": "API-001",
      "title": "Implement CRUD endpoints",
      "type": "feature",
      "status": "open",
      "priority": "high",
      "complexity": "high",
      "dependencies": [
        {
          "dependsOnId": "ticket_db_schema",
          "type": "blocks"
        }
      ]
    },
    {
      "id": "ticket_api_tests",
      "ticketNumber": "TEST-001",
      "title": "Write API integration tests",
      "type": "feature",
      "status": "open",
      "priority": "high",
      "complexity": "medium",
      "dependencies": [
        {
          "dependsOnId": "ticket_api_crud",
          "type": "blocks"
        },
        {
          "dependsOnId": "ticket_db_seed",
          "type": "requires"
        }
      ]
    }
  ]
}
```

The resolved execution order for this example:

```
1. ticket_db_schema      (no dependencies)
2. ticket_db_seed        (blocked by db_schema)
   ticket_api_crud       (blocked by db_schema, can run parallel with db_seed)
3. ticket_api_tests      (blocked by api_crud, requires db_seed)
```

## Validation Rules

The validator enforces the following rules for dependencies:

- **`dependsOnId` must reference an existing ticket.** Dangling references are errors.
- **No circular dependencies.** The dependency graph must be a DAG.
- **`type` must be a valid enum value.** Only `blocks` and `requires` are accepted.
