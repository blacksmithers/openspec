---
title: JSON Format (.sf.json)
description: The standard JSON serialization of SpecForge Format, optimized for machine consumption and tooling.
---

JSON is the primary serialization format for SpecForge. It provides full schema validation support, broad ecosystem compatibility, and is the canonical representation of the format.

## File Extension

```
.sf.json
```

Examples: `my-project.sf.json`, `auth-system.sf.json`

## When to Use JSON

- **API integrations.** JSON is the native format for web APIs and most programming languages.
- **Tooling and CI.** The validator and most tooling consume JSON natively.
- **Schema validation.** JSON Schema provides the richest validation experience with editor support.
- **Storage and interchange.** When storing specs in databases or transmitting between services.

## Example

```json
{
  "$schema": "https://schema.specforge.tech/schema/v1.0/specforge-schema.json",
  "specforgeVersion": "1.0.0",
  "project": {
    "id": "proj_task_manager",
    "name": "Task Manager",
    "description": "A simple task management application.",
    "tags": ["productivity", "typescript", "react"]
  },
  "patterns": {
    "codeStandards": [
      "Use TypeScript strict mode",
      "Use functional components with hooks"
    ],
    "commonImports": [
      "import { prisma } from '@/lib/prisma';"
    ]
  },
  "specifications": [
    {
      "id": "spec_core",
      "name": "Core Task Features",
      "status": "approved",
      "epics": [
        {
          "id": "epic_task_crud",
          "name": "Task CRUD Operations",
          "epicNumber": 1,
          "order": 1,
          "status": "open",
          "tickets": [
            {
              "id": "ticket_task_model",
              "ticketNumber": "TASK-001",
              "title": "Define Task data model",
              "type": "feature",
              "status": "open",
              "priority": "high",
              "complexity": "low",
              "description": "Create the Prisma schema for the Task model.",
              "acceptanceCriteria": [
                "Task model has id, title, description, status, createdAt, updatedAt fields",
                "Migration runs successfully"
              ]
            },
            {
              "id": "ticket_task_api",
              "ticketNumber": "TASK-002",
              "title": "Implement Task API endpoints",
              "type": "feature",
              "status": "open",
              "priority": "high",
              "complexity": "medium",
              "dependencies": [
                {
                  "dependsOnId": "ticket_task_model",
                  "type": "blocks"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

## Characteristics

| Property | Detail |
|----------|--------|
| Human-readable | Yes, with formatting |
| Comments | Not supported (JSON spec limitation) |
| Schema validation | Full support via JSON Schema |
| Token efficiency | Baseline (highest token count of the three formats) |
| Tooling support | Universal |

## Converting to Other Formats

A valid `.sf.json` file can be losslessly converted to `.sf.yaml` or `.sf.toon` using the SpecForge validator:

```bash
specforge-validator convert my-project.sf.json --to yaml
specforge-validator convert my-project.sf.json --to toon
```
