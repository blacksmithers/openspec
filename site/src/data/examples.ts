export const MINIMAL_EXAMPLE = `{
  "openSpecVersion": "1.0",
  "project": {
    "id": "a1b2c3d4-0000-0000-0000-000000000001",
    "name": "My Project"
  }
}`;

export const FULL_EXAMPLE = `{
  "openSpecVersion": "1.0",
  "project": {
    "id": "a1b2c3d4-0000-0000-0000-000000000001",
    "name": "SaaS Platform",
    "description": "Full-stack SaaS with Stripe billing"
  },
  "specifications": [
    {
      "id": "b2c3d4e5-0000-0000-0000-000000000002",
      "title": "Stripe Webhook Handler",
      "status": "ready",
      "goals": [
        "Process all Stripe webhook events",
        "Idempotent event handling"
      ],
      "epics": [
        {
          "id": "c3d4e5f6-0000-0000-0000-000000000003",
          "epicNumber": 1,
          "title": "Core Webhook Infrastructure",
          "status": "todo",
          "tickets": [
            {
              "id": "d4e5f6a7-0000-0000-0000-000000000004",
              "ticketNumber": 1,
              "title": "Webhook signature verification",
              "status": "ready",
              "complexity": "small",
              "priority": "critical",
              "implementation": {
                "steps": [
                  "Create verifySignature middleware",
                  "Add Stripe webhook secret to env"
                ],
                "filesToCreate": [
                  "src/webhooks/verify.ts"
                ]
              }
            }
          ]
        }
      ]
    }
  ]
}`;

export const TOON_EXAMPLE = `openSpecVersion: 1.0
project:
  id: a1b2c3d4-0000-0000-0000-000000000001
  name: SaaS Platform
  description: Full-stack SaaS with Stripe billing
specifications:
  [1]{id,title,status}
  b2c3d4e5-…02,Stripe Webhook Handler,ready
  epics:
    [1]{id,epicNumber,title,status}
    c3d4e5f6-…03,1,Core Webhook Infra,todo
    tickets:
      [1]{id,ticketNumber,title,status,complexity,priority}
      d4e5f6a7-…04,1,Webhook signature verification,ready,small,critical`;

export const YAML_EXAMPLE = `openSpecVersion: "1.0"
project:
  id: a1b2c3d4-0000-0000-0000-000000000001
  name: SaaS Platform
  description: Full-stack SaaS with Stripe billing
specifications:
  - id: b2c3d4e5-0000-0000-0000-000000000002
    title: Stripe Webhook Handler
    status: ready
    goals:
      - Process all Stripe webhook events
      - Idempotent event handling
    epics:
      - id: c3d4e5f6-0000-0000-0000-000000000003
        epicNumber: 1
        title: Core Webhook Infrastructure
        status: todo
        tickets:
          - id: d4e5f6a7-0000-0000-0000-000000000004
            ticketNumber: 1
            title: Webhook signature verification
            status: ready
            complexity: small
            priority: critical`;
