# Changelog

All notable changes to the OpenSpec Format will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
