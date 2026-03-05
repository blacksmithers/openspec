# Governance

This document describes the governance model for the SpecForge Specification Format (SFF).
It is modeled after the [OpenAPI Initiative](https://www.openapis.org/) governance structure,
adapted for a specification maintained by Solutions Forge LTDA with open community participation.

## Guiding Principles

All changes to the SpecForge Format are evaluated against these principles, in order of priority:

1. **Stability above features.** Existing spec files must not break silently. Every consumer
   of the format -- human or agent -- should be able to trust that a valid v1.0 file today
   remains a valid v1.0 file tomorrow.

2. **Engine-agnostic.** The format describes *what* to build and in *what order*, never *how*
   a particular engine should execute it. No engine-internal concepts (sessions, scoring,
   workflow state) belong in the format.

3. **LLM-first.** Design decisions favor token efficiency, unambiguous field names, and
   flat-when-possible structures. If a field can be inferred at runtime, it does not belong
   in the spec file.

4. **Minimal core.** Every field in the schema must justify its existence. Optional fields
   are preferred over required fields. New entities are added only when they cannot be
   expressed as metadata on existing entities.

## Change Tiers

### Patch (1.0.x)

- **Scope:** Typo fixes, clarifications, example improvements, documentation corrections.
- **Process:** Open a Pull Request directly. No RFC required.
- **Approval:** Merged by a maintainer after review.
- **Examples:** Fix a typo in a field description, add a new example file, correct a
  JSON Schema `description` string.

### Minor (1.x.0)

- **Scope:** New optional fields, new enum values, new entity types, new format support.
- **Process:** RFC required. Open a GitHub Issue tagged `rfc` using the template in
  `rfcs/0000-template.md`.
- **Comment period:** 2 weeks from the date the RFC issue is opened.
- **Approval:** Merged after the RFC is marked `rfc: accepted` by a maintainer.
- **Examples:** Add an optional `tags` array to Ticket, add a new dependency type,
  introduce a new output format.

### Major (x.0.0)

- **Scope:** Removed fields, renamed fields, semantic changes to existing fields,
  new required fields, structural reorganization.
- **Process:** RFC required. Open a GitHub Issue tagged `rfc` using the template in
  `rfcs/0000-template.md`.
- **Comment period:** 4 weeks from the date the RFC issue is opened.
- **Additional requirements:**
  - A migration guide must be included in the RFC or accompanying PR.
  - All breaking changes must be logged in `CHANGELOG.md`.
  - The `@specforge/validator` must ship a new version that supports both the old
    and new schema for at least one release cycle.
- **Approval:** Merged after the RFC is marked `rfc: accepted` by a maintainer.
- **Examples:** Remove the `patterns` field, rename `dependsOnId` to `targetId`,
  make `description` required on Ticket.

## RFC Lifecycle

1. **Draft.** Author opens a GitHub Issue with the tag `rfc`, using the template at
   `rfcs/0000-template.md`. The issue title should follow the format:
   `RFC: [Short Title]`.

2. **Discussion.** The community has 2 weeks (Minor) or 4 weeks (Major) to comment
   on the issue. The author is expected to respond to feedback and revise the proposal
   as needed.

3. **Decision.** A maintainer reviews the discussion and marks the issue as one of:
   - `rfc: accepted` -- The proposal is approved. Proceed to implementation.
   - `rfc: rejected` -- The proposal is declined. The maintainer provides a written
     rationale.

4. **Implementation.** For accepted RFCs, the author (or a maintainer) opens a Pull
   Request implementing the schema change. The PR must include:
   - Updated JSON Schema in `versions/vX.Y/specforge-schema.json`
   - Updated examples if existing examples are affected
   - Updated CHANGELOG.md entry
   - Migration guide (Major changes only)

5. **Archive.** The RFC document is saved to `rfcs/NNNN-short-title.md`, where `NNNN`
   is the next available RFC number. The GitHub Issue is closed and linked to the
   implementing PR.

## Maintainers

The current maintainers of the SpecForge Specification Format are members of
Solutions Forge LTDA engineering team. Maintainer status may be extended to
external contributors who have demonstrated sustained, high-quality contributions
to the specification.

Maintainers are responsible for:
- Reviewing and merging Pull Requests
- Managing the RFC process
- Publishing new schema versions
- Maintaining the validator package
- Ensuring backward compatibility

## Decision-Making

- **Patch changes:** Single maintainer approval.
- **Minor changes:** Single maintainer approval after the comment period closes.
- **Major changes:** Requires approval from at least two maintainers after the
  comment period closes.

In cases of disagreement, the final decision rests with the Solutions Forge LTDA
engineering lead.

## Code of Conduct

All participants in the SpecForge community are expected to follow the
[Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/).
