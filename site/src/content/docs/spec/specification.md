---
title: Specification
description: High-level feature areas that group related epics, blueprints, and patterns within a project.
---

A Specification represents a high-level feature area or subsystem within a project. It groups related epics and blueprints together, providing the broadest organizational unit beneath the project.

## Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier. Convention: `spec_` prefix. |
| `name` | `string` | Yes | Human-readable name for the specification. |
| `description` | `string` | No | Detailed description of the feature area. |
| `status` | `string` | No | Current status of the specification. See status enum below. |
| `epics` | `Epic[]` | No | Array of Epic objects belonging to this specification. |
| `blueprints` | `Blueprint[]` | No | Array of Blueprint objects providing visual documentation. |
| `patterns` | `Patterns` | No | Specification-level patterns that apply to all epics and tickets within. |

## Status Enum

| Value | Description |
|-------|-------------|
| `draft` | The specification is being planned and is not yet ready for implementation. |
| `approved` | The specification has been reviewed and approved for implementation. |
| `in_progress` | Implementation work has begun on one or more epics. |
| `completed` | All epics and tickets within the specification are done. |
| `archived` | The specification is no longer active but retained for reference. |

## Example

```json
{
  "specifications": [
    {
      "id": "spec_user_management",
      "name": "User Management",
      "description": "Complete user lifecycle management including registration, authentication, profile management, and role-based access control.",
      "status": "approved",
      "epics": [
        {
          "id": "epic_registration",
          "name": "User Registration",
          "epicNumber": 1,
          "order": 1,
          "status": "open"
        },
        {
          "id": "epic_rbac",
          "name": "Role-Based Access Control",
          "epicNumber": 2,
          "order": 2,
          "status": "open"
        }
      ],
      "blueprints": [
        {
          "id": "bp_user_erd",
          "name": "User Data Model",
          "category": "architecture",
          "format": "mermaid",
          "content": "erDiagram\n  USER ||--o{ ROLE : has\n  USER { string id PK\n    string email\n    string name }"
        }
      ]
    }
  ]
}
```

## Relationship to Epics and Tickets

A specification contains zero or more epics. Each epic contains zero or more tickets. This three-level hierarchy allows agents to navigate from broad feature areas down to individual implementation tasks:

```
Specification (what to build)
  +-- Epic (implementation phase)
  |     +-- Ticket (atomic task)
  |     +-- Ticket
  +-- Epic
  |     +-- Ticket
  +-- Blueprint (visual documentation)
```

## Specification-Level Patterns

When a `patterns` object is defined on a specification, those patterns apply to all epics and tickets within that specification. They supplement (not replace) any project-level patterns. See [Patterns](/spec/patterns/) for details.
