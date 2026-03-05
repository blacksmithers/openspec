---
title: Blueprint
description: Visual diagrams and architectural documentation attached to specifications.
---

A Blueprint provides visual documentation for a specification. Blueprints are diagrams -- architecture overviews, data flow charts, entity-relationship models, sequence diagrams -- stored inline in the spec file. They give agents and humans a visual understanding of how components relate.

## Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier. Convention: `bp_` prefix. |
| `name` | `string` | Yes | Human-readable name for the diagram. |
| `category` | `string` | Yes | The type of diagram. See category enum. |
| `format` | `string` | Yes | The markup format of the content. See format enum. |
| `content` | `string` | Yes | The diagram content in the specified format. |
| `description` | `string` | No | Additional context about what the blueprint shows. |

## Category Enum

| Value | Description |
|-------|-------------|
| `architecture` | High-level system or component architecture diagram. |
| `flow` | Process flow, data flow, or sequence diagram. |
| `erd` | Entity-relationship diagram for data models. |
| `ui` | User interface wireframe or mockup. |
| `deployment` | Infrastructure and deployment topology. |
| `other` | Any diagram that does not fit the above categories. |

## Format Enum

| Value | Description |
|-------|-------------|
| `mermaid` | [Mermaid](https://mermaid.js.org/) diagram syntax. Recommended for most use cases. |
| `plantuml` | PlantUML diagram syntax. |
| `ascii` | Plain ASCII art diagram. |
| `svg` | SVG markup (inline). |

## Example: Mermaid Sequence Diagram

```json
{
  "blueprints": [
    {
      "id": "bp_checkout_flow",
      "name": "Checkout Flow",
      "category": "flow",
      "format": "mermaid",
      "description": "Shows the interaction between the client, API, payment provider, and database during checkout.",
      "content": "sequenceDiagram\n  participant Client\n  participant API\n  participant Stripe\n  participant DB\n\n  Client->>API: POST /api/checkout\n  API->>DB: Create order (pending)\n  API->>Stripe: Create payment intent\n  Stripe-->>API: Payment intent ID\n  API-->>Client: Client secret\n  Client->>Stripe: Confirm payment\n  Stripe-->>API: Webhook: payment_succeeded\n  API->>DB: Update order (paid)\n  API-->>Client: Order confirmation"
    }
  ]
}
```

## Example: Mermaid ERD

```json
{
  "id": "bp_data_model",
  "name": "Core Data Model",
  "category": "erd",
  "format": "mermaid",
  "content": "erDiagram\n  USER ||--o{ ORDER : places\n  ORDER ||--|{ ORDER_ITEM : contains\n  ORDER_ITEM }|--|| PRODUCT : references\n  USER {\n    string id PK\n    string email\n    string name\n    datetime createdAt\n  }\n  ORDER {\n    string id PK\n    string userId FK\n    string status\n    decimal total\n  }\n  PRODUCT {\n    string id PK\n    string name\n    decimal price\n    int stock\n  }"
}
```

## Usage by Agents

Agents can use blueprints to:

1. **Understand architecture** before implementing tickets. A blueprint gives spatial context that prose descriptions lack.
2. **Generate code** that aligns with the documented data model or flow.
3. **Validate implementations** against the intended design by comparing the blueprint with the actual code structure.

Mermaid is the recommended format because it is widely supported, concise, and can be rendered by many documentation tools and IDE extensions.
