---
title: Project
description: The root entity in a SpecForge spec file.
---

# Project

The Project is the root container in every SpecForge spec file. It describes the software project being specified.

## Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string (uuid)` | Unique identifier |
| `name` | `string` | Project name |

## Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `description` | `string` | Project description |
| `tags` | `string[]` | Classification tags |

## Example

```json
{
  "specforgeVersion": "1.0",
  "project": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "My SaaS Platform",
    "description": "A multi-tenant SaaS platform with billing integration"
  }
}
```
