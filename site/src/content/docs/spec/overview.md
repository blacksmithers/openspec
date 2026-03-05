---
title: Quickstart
description: Create, validate, and extend your first SpecForge specification in minutes.
---

This guide walks you through creating a minimal SpecForge spec file, validating it, and extending it with specifications, epics, and tickets.

## Create a Minimal Spec

Create a file named `my-project.sf.json` with the following content:

```json
{
  "$schema": "https://schema.specforge.tech/schema/v1.0/specforge-schema.json",
  "specforgeVersion": "1.0.0",
  "project": {
    "id": "proj_my_project",
    "name": "My Project",
    "description": "A sample project to demonstrate the SpecForge format."
  }
}
```

This is the smallest valid SpecForge file. It declares the schema version and defines a project with an `id` and `name`.

## Validate Your Spec

Install the validator and run it against your file:

```bash
npm install -g @specforge/validator
specforge-validator validate my-project.sf.json
```

Or use npx without installing:

```bash
npx @specforge/validator validate my-project.sf.json
```

If the file is valid, you will see:

```
my-project.sf.json: Valid SpecForge v1.0.0 document.
```

## Add a Specification

Specifications are the top-level grouping of work. Add a `specifications` array to your project:

```json
{
  "$schema": "https://schema.specforge.tech/schema/v1.0/specforge-schema.json",
  "specforgeVersion": "1.0.0",
  "project": {
    "id": "proj_my_project",
    "name": "My Project",
    "description": "A sample project."
  },
  "specifications": [
    {
      "id": "spec_auth",
      "name": "Authentication System",
      "description": "User authentication and authorization.",
      "status": "draft"
    }
  ]
}
```

## Add an Epic

Epics belong to a specification and group related tickets. Add an `epics` array inside your specification:

```json
{
  "specifications": [
    {
      "id": "spec_auth",
      "name": "Authentication System",
      "status": "draft",
      "epics": [
        {
          "id": "epic_login",
          "name": "Login Flow",
          "epicNumber": 1,
          "order": 1,
          "status": "open",
          "description": "Implement the user login flow including form, validation, and session management."
        }
      ]
    }
  ]
}
```

## Add Tickets

Tickets are the atomic units of work. Add a `tickets` array inside your epic:

```json
{
  "epics": [
    {
      "id": "epic_login",
      "name": "Login Flow",
      "epicNumber": 1,
      "order": 1,
      "status": "open",
      "tickets": [
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
            "Client-side validation prevents empty submissions",
            "Form submits credentials to the auth endpoint"
          ]
        },
        {
          "id": "ticket_auth_endpoint",
          "ticketNumber": "AUTH-002",
          "title": "Implement authentication API endpoint",
          "type": "feature",
          "status": "open",
          "priority": "high",
          "complexity": "high",
          "description": "Create the POST /api/auth/login endpoint.",
          "acceptanceCriteria": [
            "Endpoint accepts email and password",
            "Returns JWT token on success",
            "Returns 401 on invalid credentials"
          ],
          "dependencies": [
            {
              "dependsOnId": "ticket_login_form",
              "type": "requires"
            }
          ]
        }
      ]
    }
  ]
}
```

## Add a Blueprint

Blueprints provide visual diagrams for a specification. Add a `blueprints` array at the specification level:

```json
{
  "specifications": [
    {
      "id": "spec_auth",
      "name": "Authentication System",
      "blueprints": [
        {
          "id": "bp_auth_flow",
          "name": "Authentication Flow Diagram",
          "category": "flow",
          "format": "mermaid",
          "content": "sequenceDiagram\n  User->>LoginForm: Enter credentials\n  LoginForm->>API: POST /api/auth/login\n  API->>DB: Validate credentials\n  DB-->>API: User record\n  API-->>LoginForm: JWT token\n  LoginForm-->>User: Redirect to dashboard"
        }
      ]
    }
  ]
}
```

## Next Steps

- Read the [Project](/spec/project/) reference to learn about all project-level fields.
- Explore [Dependencies](/spec/dependencies/) to model execution order.
- See [Patterns](/spec/patterns/) to define cross-cutting code standards.
- Choose your preferred [file format](/formats/json/): JSON, YAML, or TOON.
