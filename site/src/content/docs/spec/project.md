---
title: Project
description: The root entity of every SpecForge document, containing project metadata and configuration.
---

The Project is the root entity of every SpecForge document. Every valid `.sf.json`, `.sf.yaml`, or `.sf.toon` file describes exactly one project.

## Fields

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | A unique identifier for the project. Convention: `proj_` prefix followed by a snake_case name. |
| `name` | `string` | Human-readable project name. |

### Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `description` | `string` | A brief description of the project's purpose and scope. |
| `tags` | `string[]` | An array of tags for categorization and filtering. |

## Example

A minimal project:

```json
{
  "$schema": "https://schema.specforge.tech/schema/v1.0/specforge-schema.json",
  "specforgeVersion": "1.0.0",
  "project": {
    "id": "proj_ecommerce_platform",
    "name": "E-Commerce Platform"
  }
}
```

A project with all optional fields:

```json
{
  "$schema": "https://schema.specforge.tech/schema/v1.0/specforge-schema.json",
  "specforgeVersion": "1.0.0",
  "project": {
    "id": "proj_ecommerce_platform",
    "name": "E-Commerce Platform",
    "description": "A full-featured e-commerce platform with product catalog, shopping cart, checkout, and order management.",
    "tags": ["ecommerce", "typescript", "nextjs", "postgresql"]
  }
}
```

## ID Conventions

Project IDs should be globally unique within your organization. The recommended format is:

```
proj_<snake_case_name>
```

Examples:
- `proj_my_saas_app`
- `proj_internal_dashboard`
- `proj_mobile_api`

The `proj_` prefix makes it easy to distinguish project IDs from specification, epic, or ticket IDs when they appear in logs, dependency graphs, or cross-references.

## Relationship to Other Entities

The project is the top-level container. Beneath it, the document may contain:

- **`specifications`** -- an array of Specification objects
- **`patterns`** -- a Patterns object with cross-cutting standards
- **`specforgeVersion`** -- the schema version this document conforms to

```
Project
  +-- specifications[]
  |     +-- epics[]
  |     |     +-- tickets[]
  |     +-- blueprints[]
  +-- patterns
```

All other entities (specifications, epics, tickets, blueprints) are nested within the project context. There is no separate "workspace" or "organization" entity in the format; those concerns are left to the tooling layer.
