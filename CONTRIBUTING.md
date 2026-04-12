# Contributing to OpenSpec Format

Thank you for your interest in contributing to the OpenSpec Format.
This document explains how to contribute effectively.

## How to Open an RFC

If you want to propose a new feature, a schema change, or a structural modification:

1. Read [GOVERNANCE.md](./GOVERNANCE.md) to understand the change tiers (Patch, Minor, Major).
2. Open a GitHub Issue with the tag `rfc`.
3. Use the template at `rfcs/0000-template.md` as the body of your issue.
4. Title your issue: `RFC: [Short Title]`.
5. The community will discuss your proposal during the comment period:
   - **Minor changes:** 2-week comment period.
   - **Major changes:** 4-week comment period.
6. A maintainer will mark the issue as `rfc: accepted` or `rfc: rejected`.
7. If accepted, open a Pull Request implementing the schema change.

## How to Improve Examples

Example spec files live in `versions/v1.0/examples/`. To add or improve examples:

1. Fork the repository.
2. Add or modify files in `versions/v1.0/examples/`.
3. Ensure your example validates against the schema:
   ```bash
   npx @blacksmithers/openspec ./versions/v1.0/examples/your-example.oschema.json
   ```
4. Open a Pull Request with a clear description of what the example demonstrates.

Examples do not require an RFC. They are Patch-level changes.

## How to Improve Documentation

Documentation source files live in `site/src/`. The site is a Next.js static export. To improve docs:

1. Fork the repository.
2. Edit or add files in `site/src/` (pages in `app/`, components in `components/`, data in `data/`).
3. Run `cd site && npm run build` to verify the site builds without errors.
4. Open a Pull Request describing your changes.

Documentation fixes do not require an RFC. They are Patch-level changes.

## How to Report a Schema Bug

If you believe the JSON Schema does not match the documented behavior, or if
a valid spec file is rejected (or an invalid one accepted) by the validator:

1. Open a GitHub Issue with the tag `bug`.
2. Include:
   - The schema version you are using (e.g., v1.0).
   - A minimal spec file that reproduces the issue.
   - The expected behavior.
   - The actual behavior (validator output, error message, etc.).
3. Schema bugs are treated as Patch-level fixes and do not require an RFC.

## What NOT to Submit

The OpenSpec Format is deliberately minimal and engine-agnostic. The following
types of changes will be declined:

- **Engine-internal fields.** Fields that only make sense in the context of a
  specific execution engine (e.g., `workSession`, `score`, `retryCount`,
  `agentId`). These belong in the engine, not the format.
- **SaaS-specific concepts.** Authentication tokens, billing metadata, team
  management fields, or any concept tied to a hosted service.
- **Runtime state.** Fields that represent transient execution state rather than
  specification data (e.g., `lastRunAt`, `currentAgent`, `progressPercentage`).
- **Vendor extensions without an RFC.** If you need a vendor-specific field,
  propose an extension mechanism via RFC first.

### Format Fields vs Engine Fields

A useful test: *Would this field exist in a spec file that was written by hand
and never executed?*

- **Yes** -> It is a format field. It belongs in the schema.
- **No** -> It is an engine field. It belongs in the engine's internal data model.

Examples:

| Field | Format or Engine? | Reason |
|-------|-------------------|--------|
| `ticket.title` | Format | Describes what to build |
| `ticket.status` | Format | Indicates readiness in the dependency graph |
| `ticket.dependencies` | Format | Defines execution ordering |
| `ticket.startedAt` | Engine | Runtime timestamp, not part of the spec |
| `ticket.assignedAgent` | Engine | Execution detail, not specification |
| `ticket.score` | Engine | Quality metric computed at runtime |

## Build Tooling on the Format

The format is Apache 2.0-licensed and intentionally decoupled from any engine. You are
encouraged to build your own tools on top of it:

- **Validators** in any language (the JSON Schema is the source of truth)
- **Converters** between OpenSpec and your own task/ticket formats (Jira, Linear, GitHub Issues)
- **Generators** that produce `.oschema.json` from natural language, PRDs, or existing codebases
- **Visualizers** that render the dependency graph
- **Executors** that consume specs and drive your own agents

If you build something, open an issue with the `ecosystem` label. We maintain a
tooling list in the README and will add your project to it.

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/).
By participating, you are expected to uphold this code. Please report unacceptable
behavior to schema@solutionsforge.tech.