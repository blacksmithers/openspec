---
title: YAML Format (.sf.yaml)
description: The YAML serialization of SpecForge Format, optimized for human editing and CI/CD pipelines.
---

YAML provides a cleaner syntax for hand-editing SpecForge files. It supports comments, uses indentation instead of braces, and is commonly used in CI/CD configurations where developers are already familiar with the format.

## File Extension

```
.sf.yaml
```

Examples: `my-project.sf.yaml`, `auth-system.sf.yaml`

## When to Use YAML

- **Hand-editing.** YAML is easier to read and write without tooling assistance.
- **Version control.** YAML diffs are cleaner than JSON diffs due to fewer syntactic characters.
- **CI/CD pipelines.** Teams already using YAML for GitHub Actions, GitLab CI, or Kubernetes will find this familiar.
- **Commenting.** YAML supports inline comments, useful for annotating specs during review.

## Example

The same Task Manager spec from the JSON format page, expressed in YAML:

```yaml
# SpecForge Format v1.0
specforgeVersion: "1.0.0"

project:
  id: proj_task_manager
  name: Task Manager
  description: A simple task management application.
  tags:
    - productivity
    - typescript
    - react

patterns:
  codeStandards:
    - Use TypeScript strict mode
    - Use functional components with hooks
  commonImports:
    - "import { prisma } from '@/lib/prisma';"

specifications:
  - id: spec_core
    name: Core Task Features
    status: approved
    epics:
      - id: epic_task_crud
        name: Task CRUD Operations
        epicNumber: 1
        order: 1
        status: open
        tickets:
          - id: ticket_task_model
            ticketNumber: "TASK-001"
            title: Define Task data model
            type: feature
            status: open
            priority: high
            complexity: low
            description: Create the Prisma schema for the Task model.
            acceptanceCriteria:
              - Task model has id, title, description, status, createdAt, updatedAt fields
              - Migration runs successfully

          - id: ticket_task_api
            ticketNumber: "TASK-002"
            title: Implement Task API endpoints
            type: feature
            status: open
            priority: high
            complexity: medium
            dependencies:
              - dependsOnId: ticket_task_model
                type: blocks
```

## Characteristics

| Property | Detail |
|----------|--------|
| Human-readable | Excellent |
| Comments | Supported (`#` syntax) |
| Schema validation | Supported (YAML is a superset of JSON; the JSON Schema applies after parsing) |
| Token efficiency | Moderate (fewer tokens than JSON, more than TOON) |
| Tooling support | Broad (most languages have YAML parsers) |

## YAML-Specific Notes

- **Quote strings when needed.** Values like `"TASK-001"` should be quoted to prevent YAML from misinterpreting them.
- **Multiline strings.** Use YAML block scalars (`|` or `>`) for long descriptions:

```yaml
description: |
  This is a long description that spans
  multiple lines. Each line break is preserved
  with the pipe character.
```

- **Anchors and aliases.** YAML anchors (`&` and `*`) are not part of the SpecForge format and should be expanded before validation.

## Converting to Other Formats

```bash
specforge-validator convert my-project.sf.yaml --to json
specforge-validator convert my-project.sf.yaml --to toon
```
