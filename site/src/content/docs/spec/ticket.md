---
title: Ticket
description: The atomic unit of work in SpecForge, describing a single implementation task with full context for AI agents.
---

A Ticket is the atomic unit of work in the SpecForge format. Each ticket describes a single implementation task with enough context for an AI agent (or a human developer) to execute it independently, given that its dependencies are satisfied.

## Fields

### Core Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier. Convention: `ticket_` prefix. |
| `ticketNumber` | `string` | Yes | Human-readable ticket number (e.g., `AUTH-001`). |
| `title` | `string` | Yes | Short, descriptive title. |
| `type` | `string` | Yes | The type of work. See type enum. |
| `status` | `string` | Yes | Current status. See status enum. |
| `priority` | `string` | Yes | Priority level. See priority enum. |
| `complexity` | `string` | Yes | Estimated complexity. See complexity enum. |
| `description` | `string` | No | Detailed description of the work to be done. |
| `acceptanceCriteria` | `string[]` | No | List of criteria that must be met for the ticket to be considered done. |

### Implementation Details

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `implementation` | `object` | No | Detailed implementation guidance for the agent. |
| `implementation.steps` | `string[]` | No | Ordered list of implementation steps. |
| `implementation.notes` | `string` | No | Additional context or caveats. |
| `codeReferences` | `object[]` | No | References to existing code the agent should read or modify. |
| `codeReferences[].path` | `string` | No | File path relative to the project root. |
| `codeReferences[].description` | `string` | No | Why this file is relevant. |
| `typeReferences` | `object[]` | No | Type definitions the implementation should conform to. |
| `typeReferences[].name` | `string` | No | Name of the type or interface. |
| `typeReferences[].definition` | `string` | No | The type definition content. |

### Testing

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `testSpecification` | `object` | No | Testing requirements for this ticket. |
| `testSpecification.unitTests` | `string[]` | No | Unit test descriptions. |
| `testSpecification.integrationTests` | `string[]` | No | Integration test descriptions. |
| `testSpecification.e2eTests` | `string[]` | No | End-to-end test descriptions. |

### Relationships

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `dependencies` | `Dependency[]` | No | Array of dependency objects. See [Dependencies](/spec/dependencies/). |

## Status Enum

| Value | Description |
|-------|-------------|
| `open` | The ticket is defined but work has not started. |
| `in_progress` | The ticket is being actively worked on. |
| `in_review` | Implementation is complete and awaiting review. |
| `done` | The ticket is complete and all acceptance criteria are met. |
| `blocked` | The ticket cannot proceed due to unresolved dependencies. |

## Type Enum

| Value | Description |
|-------|-------------|
| `feature` | New functionality to be implemented. |
| `bug` | A defect to be fixed. |
| `chore` | Maintenance, refactoring, or tooling work. |
| `spike` | Research or investigation task. |

## Priority Enum

| Value | Description |
|-------|-------------|
| `critical` | Must be addressed immediately. Blocks other work. |
| `high` | Important. Should be completed in the current iteration. |
| `medium` | Standard priority. Scheduled normally. |
| `low` | Nice to have. Can be deferred. |

## Complexity Enum

| Value | Description |
|-------|-------------|
| `low` | Straightforward change. Minimal risk. |
| `medium` | Moderate effort. May touch multiple files or systems. |
| `high` | Significant effort. Architectural decisions involved. |
| `critical` | Very high effort. Cross-cutting concerns, high risk. |

## Full Example

```json
{
  "id": "ticket_auth_middleware",
  "ticketNumber": "AUTH-003",
  "title": "Implement JWT authentication middleware",
  "type": "feature",
  "status": "open",
  "priority": "high",
  "complexity": "medium",
  "description": "Create an Express middleware that validates JWT tokens on protected routes, extracts the user payload, and attaches it to the request object.",
  "acceptanceCriteria": [
    "Middleware rejects requests without a valid Authorization header",
    "Middleware decodes and validates JWT tokens using the shared secret",
    "Decoded user payload is attached to req.user",
    "Expired tokens return 401 with a descriptive error message",
    "Middleware can be applied to individual routes or route groups"
  ],
  "implementation": {
    "steps": [
      "Create src/middleware/auth.ts",
      "Import jsonwebtoken and the JWT_SECRET from config",
      "Extract the Bearer token from the Authorization header",
      "Verify the token and attach the decoded payload to req.user",
      "Export the middleware as a named export"
    ],
    "notes": "Use the existing error handling pattern from src/middleware/errorHandler.ts."
  },
  "codeReferences": [
    {
      "path": "src/middleware/errorHandler.ts",
      "description": "Follow the same middleware pattern and error response structure."
    },
    {
      "path": "src/config/index.ts",
      "description": "JWT_SECRET is exported from here."
    }
  ],
  "typeReferences": [
    {
      "name": "AuthenticatedRequest",
      "definition": "interface AuthenticatedRequest extends Request { user: { id: string; email: string; role: string; }; }"
    }
  ],
  "testSpecification": {
    "unitTests": [
      "Should return 401 when no Authorization header is present",
      "Should return 401 when token is expired",
      "Should return 401 when token signature is invalid",
      "Should attach decoded user to req.user on valid token",
      "Should call next() on successful validation"
    ],
    "integrationTests": [
      "Protected route returns 401 without token",
      "Protected route returns 200 with valid token"
    ]
  },
  "dependencies": [
    {
      "dependsOnId": "ticket_auth_endpoint",
      "type": "requires"
    }
  ]
}
```
