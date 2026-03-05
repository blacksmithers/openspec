---
title: Patterns
description: Cross-cutting code standards, imports, and return types that apply to all tickets in a specification or project.
---

The Patterns object defines cross-cutting conventions that apply to all epics and tickets within its scope. Instead of repeating the same coding standards on every ticket, you define them once in Patterns and they propagate automatically.

## Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `codeStandards` | `string[]` | No | General coding standards and conventions to follow. |
| `commonImports` | `string[]` | No | Import statements or modules that should be used across implementations. |
| `returnTypes` | `string[]` | No | Standard return type patterns for functions and API endpoints. |

## Example

```json
{
  "patterns": {
    "codeStandards": [
      "Use TypeScript strict mode for all source files",
      "Follow the existing error handling pattern: wrap async route handlers with asyncHandler()",
      "Use named exports, not default exports",
      "All database queries must use parameterized statements",
      "Maximum function length: 40 lines"
    ],
    "commonImports": [
      "import { db } from '@/lib/database';",
      "import { AppError } from '@/lib/errors';",
      "import { asyncHandler } from '@/middleware/asyncHandler';",
      "import { z } from 'zod';"
    ],
    "returnTypes": [
      "API endpoints return { success: boolean; data?: T; error?: string }",
      "Service functions return Promise<Result<T, AppError>>",
      "Database queries return the raw query result type from the ORM"
    ]
  }
}
```

## Scope and Propagation

Patterns can be defined at two levels:

### Project-Level Patterns

Defined at the root of the document alongside `specifications`. These apply to **every** ticket in the project.

```json
{
  "specforgeVersion": "1.0.0",
  "project": { "id": "proj_app", "name": "My App" },
  "patterns": {
    "codeStandards": ["Use ESLint with the shared config"]
  },
  "specifications": [...]
}
```

### Specification-Level Patterns

Defined within a specific specification. These apply only to tickets within that specification and **supplement** (not replace) project-level patterns.

```json
{
  "specifications": [
    {
      "id": "spec_api",
      "name": "API Layer",
      "patterns": {
        "codeStandards": ["All endpoints must validate input with Zod schemas"],
        "commonImports": ["import { Router } from 'express';"]
      },
      "epics": [...]
    }
  ]
}
```

When both project-level and specification-level patterns exist, agents should merge them:

1. Concatenate arrays (project patterns first, then specification patterns).
2. Both sets of standards apply. There is no override mechanism -- if they conflict, the specification-level pattern is more specific and should take precedence in practice.

## How Agents Should Use Patterns

When an agent picks up a ticket for implementation, it should:

1. Collect all applicable patterns (project-level + specification-level).
2. Apply `codeStandards` as constraints on the generated code.
3. Use `commonImports` when the implementation needs functionality those modules provide.
4. Conform to `returnTypes` for function signatures and API responses.

Patterns provide the "style guide" that ensures consistency across independently implemented tickets. Without them, each ticket would need to redundantly specify the same conventions.
