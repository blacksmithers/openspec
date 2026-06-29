# Changelog

All notable changes to the OpenSpec Format will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-06-29

The document root is now a **single Specification** (the `Project` wrapper and the
`specifications[]` array are gone) and the planning core is fully structured. v1.0
remains permanent at its existing schema URL.

### Added
- JSON Schema (draft-07) at `versions/v1.1/openspec-schema.json` and served at
  `https://openspec.tech/schema/v1.1/openspec-schema.json`
- Structured planning entities on the specification: `goals[]`, `requirements[]`,
  `scope{}`, `techStack[]`, `nonFunctionalRequirements[]`, `guardrails[]`,
  `acceptanceCriteria[]`, `folderStructures[]`, `sharedPatterns[]`
- `epicTargets`, `fieldDeclarations` (an explicit `N/A` + reason escape hatch),
  `estimatedMinutes`
- New enums: goal/requirement/NFR/guardrail/tech-stack categories, `epic.category`,
  `ticket.ticketType`, blueprint `coverageType`; expanded blueprint `category`/`format`
- v1.1 example specs at `versions/v1.1/examples/`

### Changed (breaking)
- `openSpecVersion: "1.0"` → `schemaVersion: "1.1"`
- Root `project{}` → `projectId` (string); `specifications[]` array removed — the root **is** the spec
- Most string-array fields became structured object arrays (with `minItems` floors)
- `estimatedHours` → `estimatedMinutes` (integer); `fileStructure` → `folderStructures`/`fileStructures`;
  `patterns` → `sharedPatterns`; ticket `implementation{steps,…}` flattened into
  `implementationSteps[]` + `filesToBeCreated/Modified/Deleted/Referenced[]`
- Ticket dependency `dependsOnId` → `ticketId`
- Schema is now strict (`additionalProperties: false`); ID `format: uuid` constraint dropped

### Removed
- `status` (epic/ticket) and `priority` (spec/epic/ticket) enums; `epicNumber`; blueprint `status`;
  ticket `technicalDetails`/`notes`/`actualHours`

## [1.0.0] - 2025-03-05

### Added
- Initial release of the OpenSpec Format v1.0
- Core entities: Project, Specification, Epic, Ticket, Blueprint, Patterns
- JSON Schema (draft-07) at `versions/v1.0/openspec-schema.json`
- Three format support: JSON (.oschema.json), YAML (.oschema.yaml), TOON (.oschema.toon)
- `@blacksmithers/openspec` package with CLI and programmatic API
- Ticket dependency graph with `blocks` and `requires` relationship types
- Blueprint design artifacts with Mermaid, markdown, ASCII, and mixed formats
- Specification-level patterns for coding standards propagation
- RFC governance process (GOVERNANCE.md)
- Example spec files: minimal, full, and dependency-focused
- Astro Starlight documentation site
