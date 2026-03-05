---
title: Specification
description: Feature-level decomposition entity in the SpecForge format.
---

# Specification

A Specification represents a high-level feature area. It contains epics, blueprints, and patterns that define what needs to be built.

## Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string (uuid)` | Unique identifier |
| `title` | `string` | Specification title |

## Status Values

`draft` | `planning` | `specifying` | `validating` | `ready` | `in_progress` | `ready_for_review` | `in_review` | `reviewed` | `completed`

## Key Optional Fields

- `goals`, `requirements`, `acceptanceCriteria` -- define what success looks like
- `patterns` -- coding standards that propagate to all child epics and tickets
- `epics` -- ordered groups of tickets
- `blueprints` -- design artifacts (diagrams, ADRs)

Full field reference available in the [JSON Schema](https://schema.specforge.tech/schema/v1.0/specforge-schema.json).
