---
title: Changelog
description: Release history for the SpecForge Format specification.
---

All notable changes to the SpecForge Format specification are documented here. This changelog follows [Keep a Changelog](https://keepachangelog.com/) conventions.

## 1.0.0 -- 2025-01-15

Initial release of the SpecForge Format specification.

### Added

- **Project** entity with `id`, `name`, `description`, and `tags` fields.
- **Specification** entity for grouping related epics and blueprints. Status enum: `draft`, `approved`, `in_progress`, `completed`, `archived`.
- **Epic** entity with `epicNumber` and `order` fields for stable identification and execution sequencing. Status enum: `open`, `in_progress`, `completed`, `blocked`.
- **Ticket** entity as the atomic unit of work. Includes `implementation`, `codeReferences`, `typeReferences`, `testSpecification`, and `dependencies` fields. Status enum: `open`, `in_progress`, `in_review`, `done`, `blocked`. Type enum: `feature`, `bug`, `chore`, `spike`. Priority enum: `critical`, `high`, `medium`, `low`. Complexity enum: `low`, `medium`, `high`, `critical`.
- **Blueprint** entity for inline diagrams. Category enum: `architecture`, `flow`, `erd`, `ui`, `deployment`, `other`. Format enum: `mermaid`, `plantuml`, `ascii`, `svg`.
- **Dependencies** system with `dependsOnId` and `type` (`blocks`, `requires`) fields. Validator enforces DAG constraint (no circular dependencies) and reference integrity.
- **Patterns** object with `codeStandards`, `commonImports`, and `returnTypes` arrays. Supported at project and specification levels.
- **Versioning** via `specforgeVersion` field using semantic versioning (MAJOR.MINOR.PATCH).
- **Three serialization formats**: JSON (`.sf.json`), YAML (`.sf.yaml`), TOON (`.sf.toon`).
- **JSON Schema** published at `https://schema.specforge.tech/schema/v1.0/specforge-schema.json`.
- **Validator** (`@specforge/validator`) with CLI and programmatic API. Supports validation, format conversion, and dependency graph analysis.
