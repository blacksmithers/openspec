---
title: Epic
description: Ordered groups of tickets within a specification that break features into implementable phases.
---

An Epic groups related tickets within a specification. Epics represent implementation phases or milestones -- coherent batches of work that can be planned and tracked together.

## Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier. Convention: `epic_` prefix. |
| `name` | `string` | Yes | Human-readable name. |
| `description` | `string` | No | Detailed description of the epic's scope. |
| `epicNumber` | `integer` | Yes | Numeric identifier for the epic within its specification. |
| `order` | `integer` | Yes | Execution order relative to sibling epics. Lower numbers execute first. |
| `status` | `string` | No | Current status. See status enum below. |
| `tickets` | `Ticket[]` | No | Array of Ticket objects belonging to this epic. |

## Status Enum

| Value | Description |
|-------|-------------|
| `open` | The epic is defined but work has not started. |
| `in_progress` | At least one ticket is being actively worked on. |
| `completed` | All tickets in the epic are done. |
| `blocked` | The epic cannot proceed due to unresolved dependencies or issues. |

## epicNumber vs order

These two fields serve different purposes:

- **`epicNumber`** is a stable identifier. It does not change when epics are reordered. Use it in references and human-facing labels (e.g., "Epic 3: Payment Integration").
- **`order`** determines the execution sequence. When an agent processes epics, it should process them in ascending `order` value. Reordering epics only requires changing `order`, not `epicNumber`.

This separation allows you to reorder execution without breaking cross-references.

## Example

```json
{
  "epics": [
    {
      "id": "epic_data_models",
      "name": "Data Models and Database Schema",
      "epicNumber": 1,
      "order": 1,
      "status": "completed",
      "description": "Define all database tables, relationships, and migrations.",
      "tickets": [
        {
          "id": "ticket_user_table",
          "ticketNumber": "DB-001",
          "title": "Create users table migration",
          "type": "feature",
          "status": "done",
          "priority": "high",
          "complexity": "low"
        }
      ]
    },
    {
      "id": "epic_api_endpoints",
      "name": "REST API Endpoints",
      "epicNumber": 2,
      "order": 2,
      "status": "in_progress",
      "description": "Implement all CRUD endpoints for the application.",
      "tickets": [
        {
          "id": "ticket_users_crud",
          "ticketNumber": "API-001",
          "title": "Implement users CRUD endpoints",
          "type": "feature",
          "status": "in_progress",
          "priority": "high",
          "complexity": "medium",
          "dependencies": [
            {
              "dependsOnId": "ticket_user_table",
              "type": "blocks"
            }
          ]
        }
      ]
    }
  ]
}
```

## Relationship to Tickets

An epic contains zero or more tickets. Tickets within an epic may have dependencies on tickets in the same epic or in other epics. The `order` field on the epic suggests a default execution sequence, but explicit ticket-level dependencies always take precedence.

Agents should:

1. Process epics in ascending `order`.
2. Within each epic, resolve the ticket dependency graph to determine execution order.
3. If a ticket in a later epic depends on a ticket in an earlier epic, that dependency must be satisfied before the dependent ticket can start.
