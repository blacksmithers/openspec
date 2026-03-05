---
title: Blueprint
description: Design artifacts linked to specifications.
---

# Blueprint

A Blueprint is a design artifact -- a diagram, ADR, mockup, or other visual documentation linked to a specification.

## Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string (uuid)` | Unique identifier |
| `title` | `string` | Blueprint title |
| `category` | `string` | Type of artifact |
| `content` | `string` | The artifact content |

## Categories

`flowchart` | `architecture` | `state` | `sequence` | `erd` | `mockup` | `adr` | `component` | `deployment` | `api`

## Formats

`markdown` | `mermaid` | `ascii` | `mixed`
