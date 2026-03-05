---
title: Epic
description: Ordered groups of tickets within a specification.
---

# Epic

An Epic groups related tickets into an implementable phase within a specification. Epics are ordered and executed sequentially.

## Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string (uuid)` | Unique identifier |
| `title` | `string` | Epic title |

## Status Values

`todo` | `in_progress` | `completed`

## Ordering

- `epicNumber` -- sequential identifier within the specification (1-based)
- `order` -- execution ordering (0-based)

## Key Optional Fields

- `objective` -- what this epic achieves
- `tickets` -- the atomic work items
- `guardrails`, `constraints`, `assumptions`, `risks` -- context for agents
