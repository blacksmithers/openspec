---
title: Versioning
description: How SpecForge Format versions its schema using semantic versioning and permanent schema URLs.
---

SpecForge Format uses semantic versioning (MAJOR.MINOR.PATCH) to version its schema. Every SpecForge document declares which version of the format it conforms to via the `specforgeVersion` field.

## The specforgeVersion Field

```json
{
  "specforgeVersion": "1.0.0",
  "project": {
    "id": "proj_example",
    "name": "Example"
  }
}
```

This field is **required** in every SpecForge document. It tells validators and agents exactly which schema rules apply.

## Semantic Versioning

SpecForge Format follows [SemVer 2.0.0](https://semver.org/):

| Component | When It Changes | Compatibility |
|-----------|----------------|---------------|
| **MAJOR** (1.x.x) | Breaking changes to the schema. Fields removed, types changed, required fields added. | Documents from a previous major version may not validate against the new schema. |
| **MINOR** (x.1.x) | New optional fields, new enum values, new entity types. | Fully backward compatible. Documents from the same major version will validate. |
| **PATCH** (x.x.1) | Documentation fixes, clarifications, no schema changes. | No impact on validation. |

## Schema URL Permanence

Each released version of the schema has a permanent URL:

```
https://schema.specforge.tech/schema/v1.0/specforge-schema.json
```

URL structure:

```
https://schema.specforge.tech/schema/v{MAJOR}.{MINOR}/specforge-schema.json
```

These URLs are immutable. Once published, a schema at a given URL will never change. This guarantees that a document referencing a specific schema URL will always validate the same way.

Patch versions do not get their own URL because they do not change the schema.

## Using $schema

You can reference the schema URL in the `$schema` field of your JSON documents to enable editor autocompletion and inline validation:

```json
{
  "$schema": "https://schema.specforge.tech/schema/v1.0/specforge-schema.json",
  "specforgeVersion": "1.0.0",
  "project": {
    "id": "proj_example",
    "name": "Example"
  }
}
```

The `$schema` field is optional and not validated by the SpecForge validator. It exists purely for editor tooling support.

## Migration Between Versions

When a new major version is released:

1. A migration guide will be published documenting all breaking changes.
2. The validator will support validating documents against any published schema version.
3. An automated migration tool may be provided for common upgrade paths.

When a new minor version is released:

1. Existing documents remain valid without modification.
2. New features documented in the changelog become available.
3. The schema URL for that minor version is published.

## Current Version

The current version of the SpecForge Format is **1.0.0**. This is the initial release, establishing the core schema for projects, specifications, epics, tickets, blueprints, dependencies, and patterns.
