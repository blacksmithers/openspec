# SpecForge Format

> The open specification format for AI agent orchestration.

`specforgeVersion: "1.0"` -- one field that makes any tool interoperable.

## What it is

SpecForge Format (SFF) is a versioned, tool-agnostic format for describing
software projects as hierarchical specifications that AI agents can execute.

Think OpenAPI, but for agent orchestration instead of REST APIs.

A spec file describes a Project -> Specifications -> Epics -> Tickets -- a
decomposed, dependency-aware execution graph any compliant agent can consume.

## Why it exists

AI agents are good at small, bounded tasks. The problem is decomposition:
how do you describe a large project in a way that preserves context, enforces
ordering, and survives the limits of a single context window?

SpecForge Format solves this by encoding the full decomposition graph --
with rich metadata per entity -- in a portable, versionable file.

## Three formats, one schema

| Format | Extension | Best for |
|--------|-----------|----------|
| JSON   | `.sf.json` | Programmatic generation, CI, storage |
| YAML   | `.sf.yaml` | Human-authored, version control |
| TOON   | `.sf.toon` | LLM agent context injection (39.9% fewer tokens) |

All three formats are lossless representations of the same schema.
The `@specforge/validator` package accepts all three.

## Validator

```bash
npm install -g @specforge/validator

specforge-validate ./my-spec.sf.json   # Valid SpecForge spec (v1.0)
specforge-validate ./my-spec.sf.toon   # Valid SpecForge spec (v1.0) -- toon
```

Works offline. No SaaS dependency. Zero auth required.

## Schema

JSON Schema published at permanent versioned URLs:

```
https://schema.specforge.tech/schema/v1.0/specforge-schema.json
```

Old schema URLs never change. Every version is permanent.

## Versioning

`MAJOR.MINOR.PATCH` -- see [GOVERNANCE.md](./GOVERNANCE.md) for the full RFC process.

- **Patch**: Typo fixes, clarifications. No RFC required.
- **Minor**: New optional fields. RFC with 2-week comment period.
- **Major**: Breaking changes. RFC with 4-week comment period + migration guide.

## Contributing

We welcome RFCs, bug reports on schema accuracy, new examples, and docs improvements.

See [CONTRIBUTING.md](./CONTRIBUTING.md) to get started.

## License

MIT -- Solutions Forge LTDA.
The format is open. The engine is not.
