---
title: TOON Format (.sf.toon)
description: The token-optimized object notation for SpecForge, designed to minimize token consumption in LLM context windows.
---

TOON (Token-Optimized Object Notation) is a compact serialization format designed specifically for large language model consumption. It reduces token count significantly compared to JSON while maintaining full fidelity with the SpecForge schema.

## What Is TOON?

TOON is a data serialization format that eliminates the syntactic overhead of JSON -- braces, brackets, quotes, commas -- and replaces them with a minimal, indentation-aware syntax. It was created to solve a specific problem: when feeding structured data into an LLM context window, every token matters.

Key design decisions:
- **No braces or brackets.** Objects and arrays are expressed through indentation.
- **No quotes around keys.** Keys are bare identifiers followed by a colon.
- **No commas.** Entries are separated by newlines.
- **Uniform arrays use table syntax.** Arrays of objects with the same keys (like tickets, epics, specifications) are expressed as compact tables.

## File Extension

```
.sf.toon
```

Examples: `my-project.sf.toon`, `auth-system.sf.toon`

## Why TOON Exists

LLMs process text as tokens. Every `{`, `}`, `"`, and `,` in a JSON document consumes tokens that could be used for actual content. For large SpecForge documents with dozens of tickets, the syntactic overhead of JSON becomes substantial.

TOON addresses this by:
- Removing all redundant syntax
- Using table format for uniform arrays (arrays where every element has the same shape)
- Preserving complete semantic fidelity with JSON and YAML

## JSON vs TOON Comparison

Here is a ticket in JSON:

```json
{
  "id": "ticket_login_form",
  "ticketNumber": "AUTH-001",
  "title": "Create login form component",
  "type": "feature",
  "status": "open",
  "priority": "high",
  "complexity": "medium",
  "description": "Build a reusable login form with email and password fields.",
  "acceptanceCriteria": [
    "Form renders with email and password inputs",
    "Client-side validation prevents empty submissions"
  ]
}
```

The same ticket in TOON:

```
id: ticket_login_form
ticketNumber: AUTH-001
title: Create login form component
type: feature
status: open
priority: high
complexity: medium
description: Build a reusable login form with email and password fields.
acceptanceCriteria:
  - Form renders with email and password inputs
  - Client-side validation prevents empty submissions
```

## Table Syntax for Uniform Arrays

Where TOON truly shines is with uniform arrays. SpecForge documents contain arrays of tickets, epics, and specifications that all share the same fields. TOON represents these as tables:

```
tickets:
  | id                  | ticketNumber | title                          | type    | status | priority | complexity |
  | ticket_login_form   | AUTH-001     | Create login form component    | feature | open   | high     | medium     |
  | ticket_auth_api     | AUTH-002     | Implement auth API endpoint    | feature | open   | high     | high       |
  | ticket_auth_tests   | AUTH-003     | Write authentication tests     | feature | open   | medium   | medium     |
```

This table syntax dramatically reduces token count compared to repeating the same keys for every object in a JSON array.

## Benchmark Numbers

Empirical benchmarks comparing TOON against JSON for SpecForge documents:

| Metric | JSON | TOON | Difference |
|--------|------|------|------------|
| Token count (average) | Baseline | **39.9% fewer tokens** | TOON uses roughly 60% of the tokens JSON requires |
| LLM task accuracy | 75.0% | **76.4%** | Slight accuracy improvement, likely due to reduced noise |
| Semantic fidelity | 100% | 100% | Lossless round-trip conversion |

The token savings scale with document size. Larger documents with more tickets see greater savings because the table syntax amortizes the header row across many data rows.

## When to Use TOON

- **Feeding specs to LLMs.** When you need to include a full spec in an agent's context window, TOON maximizes the useful content per token.
- **Large specifications.** Documents with 50+ tickets benefit most from TOON's table syntax.
- **Context-constrained environments.** When operating near the context window limit of a model.

## When NOT to Use TOON

- **Tooling and APIs.** Most programming languages do not have TOON parsers. Use JSON for machine-to-machine communication.
- **Hand-editing.** YAML is more forgiving for manual editing. TOON's table syntax requires careful alignment.
- **Schema validation in editors.** JSON Schema tooling does not understand TOON natively.

## How the Validator Handles TOON

The SpecForge validator natively supports `.sf.toon` files:

```bash
specforge-validator validate my-project.sf.toon
```

Internally, the validator:

1. Parses the TOON file into an in-memory object representation.
2. Validates the object against the same JSON Schema used for `.sf.json` files.
3. Reports errors with line numbers referencing the original TOON file.

You can also convert between formats:

```bash
# TOON to JSON
specforge-validator convert my-project.sf.toon --to json

# JSON to TOON
specforge-validator convert my-project.sf.json --to toon
```

## Format Comparison Summary

| Consideration | JSON | YAML | TOON |
|---------------|------|------|------|
| Machine consumption | Best | Good | Requires parser |
| Human editing | Adequate | Best | Difficult |
| LLM context efficiency | Worst | Middle | Best |
| Schema validation | Native | Via parsing | Via parsing |
| Comment support | No | Yes | Yes |
| Ecosystem support | Universal | Broad | SpecForge-specific |
