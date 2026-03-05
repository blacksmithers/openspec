---
title: Ticket
description: The atomic unit of work in the SpecForge format.
---

# Ticket

A Ticket is the atomic unit of work. Each ticket describes a single implementation task with enough context for an AI agent to execute it autonomously.

## Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string (uuid)` | Unique identifier |
| `title` | `string` | Ticket title |

## Status Values

`pending` | `ready` | `active` | `done`

Blocked state is not a status -- it is signaled via `blockReason` on a pending ticket.

## Complexity

`small` | `medium` | `large` | `xlarge`

## Implementation Details

Tickets support rich implementation metadata:

- `implementation` -- steps, files to create/modify, notes
- `codeReferences` -- code snippets the agent must follow
- `typeReferences` -- TypeScript type definitions to use
- `testSpecification` -- test types, commands, quality gates
- `dependencies` -- other tickets this depends on (`blocks` or `requires`)
