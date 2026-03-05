---
title: Validator Usage
description: CLI commands, programmatic API, and error output format for the SpecForge validator.
---

This page covers the full usage of the SpecForge validator, including CLI commands, programmatic API, and how to interpret error output.

## CLI Commands

### validate

Validate one or more SpecForge files:

```bash
# Validate a single file
specforge-validator validate my-project.sf.json

# Validate multiple files
specforge-validator validate project.sf.json api-spec.sf.yaml

# Validate all spec files in a directory
specforge-validator validate ./specs/*.sf.json
```

Options:

| Flag | Description |
|------|-------------|
| `--strict` | Enable strict mode. Warns on unknown fields in addition to schema errors. |
| `--format <type>` | Output format: `text` (default), `json`, or `junit`. |
| `--quiet` | Suppress output on success. Only print errors. |

### convert

Convert between SpecForge file formats:

```bash
# JSON to YAML
specforge-validator convert project.sf.json --to yaml

# YAML to TOON
specforge-validator convert project.sf.yaml --to toon

# TOON to JSON
specforge-validator convert project.sf.toon --to json

# Specify output file
specforge-validator convert project.sf.json --to yaml --output project.sf.yaml
```

The converter validates the input file before converting. If the input is invalid, conversion is aborted and errors are reported.

### check-deps

Analyze the dependency graph without full validation:

```bash
specforge-validator check-deps project.sf.json
```

This command:
- Detects circular dependencies
- Reports dangling references (dependencies on non-existent tickets)
- Outputs the topological execution order

## Error Output Format

### Text Format (Default)

```
project.sf.json: 3 errors found.

  ERROR  /specifications/0/epics/0/tickets/0/status
    Invalid enum value. Expected: open | in_progress | in_review | done | blocked
    Received: "pending"

  ERROR  /specifications/0/epics/0/tickets/1/dependencies/0/dependsOnId
    Referenced ticket "ticket_nonexistent" does not exist.

  ERROR  Dependency graph
    Circular dependency detected: ticket_a -> ticket_b -> ticket_c -> ticket_a
```

Each error includes:
- The JSON Pointer path to the problematic field
- A description of the error
- The received value (when applicable)

### JSON Format

Use `--format json` for machine-readable output:

```bash
specforge-validator validate project.sf.json --format json
```

```json
{
  "valid": false,
  "file": "project.sf.json",
  "errors": [
    {
      "path": "/specifications/0/epics/0/tickets/0/status",
      "message": "Invalid enum value. Expected: open | in_progress | in_review | done | blocked",
      "received": "pending",
      "rule": "enum"
    },
    {
      "path": "/specifications/0/epics/0/tickets/1/dependencies/0/dependsOnId",
      "message": "Referenced ticket \"ticket_nonexistent\" does not exist.",
      "rule": "reference"
    }
  ],
  "warnings": []
}
```

### JUnit Format

Use `--format junit` for CI systems that consume JUnit XML:

```bash
specforge-validator validate project.sf.json --format junit > results.xml
```

## Programmatic API

### validate(filePath, options?)

```javascript
import { validate } from '@specforge/validator';

const result = await validate('./project.sf.json', {
  strict: true
});

// result.valid: boolean
// result.errors: Array<{ path: string, message: string, rule: string }>
// result.warnings: Array<{ path: string, message: string }>
```

### validateContent(content, format, options?)

Validate a string or object directly without reading from disk:

```javascript
import { validateContent } from '@specforge/validator';

const spec = {
  specforgeVersion: '1.0.0',
  project: { id: 'proj_test', name: 'Test' }
};

const result = await validateContent(spec, 'json');
```

### convert(filePath, targetFormat)

Convert a file and return the result as a string:

```javascript
import { convert } from '@specforge/validator';

const yaml = await convert('./project.sf.json', 'yaml');
console.log(yaml);
```

### checkDependencies(filePath)

Analyze the dependency graph:

```javascript
import { checkDependencies } from '@specforge/validator';

const result = await checkDependencies('./project.sf.json');

// result.valid: boolean (no cycles, no dangling refs)
// result.order: string[] (topological order of ticket IDs)
// result.cycles: string[][] (detected cycles, if any)
// result.danglingRefs: Array<{ from: string, to: string }>
```

## Exit Codes

| Code | Meaning |
|------|---------|
| `0` | Validation passed. No errors. |
| `1` | Validation failed. One or more errors found. |
| `2` | File not found or unreadable. |
| `3` | Unknown file format (not .sf.json, .sf.yaml, or .sf.toon). |
