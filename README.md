<p align="center">
  <img src="https://schema.specforge.tech/logo-lockup.svg" alt="SpecForge Format" height="56" />
</p>

<p align="center">
  <strong>The open specification format for AI agent orchestration.</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@specforge/validator"><img src="https://img.shields.io/npm/v/@specforge/validator?style=flat-square&color=8B5CF6&label=validator" alt="npm" /></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-MIT-8B5CF6?style=flat-square" alt="MIT License" /></a>
  <a href="https://schema.specforge.tech"><img src="https://img.shields.io/badge/schema-v1.0-22c55e?style=flat-square" alt="Schema v1.0" /></a>
  <a href="https://github.com/solutionsforge/specforge-schema/issues?q=label%3Arfc"><img src="https://img.shields.io/github/issues/solutionsforge/specforge-schema/rfc?style=flat-square&color=D946EF&label=open%20RFCs" alt="RFCs" /></a>
</p>

<p align="center">
  <a href="https://schema.specforge.tech">Documentation</a> · <a href="#quickstart">Quickstart</a> · <a href="./CONTRIBUTING.md">Contributing</a> · <a href="./GOVERNANCE.md">Governance</a> · <a href="https://github.com/solutionsforge/specforge-schema/issues?q=label%3Arfc">RFCs</a>
</p>

---

## What is this

SpecForge Format (SFF) is a versioned, tool-agnostic format for describing software projects as hierarchical specifications that AI agents can execute.

```
specforgeVersion: "1.0"
```

One field. Any tool that reads it knows exactly what to expect.

Think **OpenAPI for agent orchestration** — instead of describing REST endpoints, you describe decomposed work: `Project → Specifications → Epics → Tickets`, with a dependency graph, acceptance criteria, implementation instructions, and quality patterns. Any compliant agent can consume it.

## Why it exists

AI agents are good at small, bounded tasks. The hard part is decomposition: how do you describe a large project in a way that preserves context, enforces ordering, and survives the limits of a single context window?

SpecForge Format encodes the full decomposition graph — with rich metadata per entity — in a portable, versionable file. The format is **engine-agnostic**: you can build tooling on top of it without depending on any specific platform.

## Quickstart

### Validate an existing spec

```bash
npm install -g @specforge/validator

specforge-validate ./my-project.sf.json
# ✓ Valid SpecForge spec (v1.0) — json
```

Works offline. No auth. No SaaS dependency. Supports `.sf.json`, `.sf.yaml`, and `.sf.toon`.

### Write a minimal spec

The smallest valid spec — two required fields:

```json
{
  "specforgeVersion": "1.0",
  "project": {
    "id": "00000000-0000-0000-0000-000000000001",
    "name": "My Project"
  }
}
```

### Use the validator programmatically

```typescript
import { validate, toJson } from '@specforge/validator';

const raw = fs.readFileSync('./spec.sf.yaml', 'utf-8');
const data = toJson(raw);          // auto-detects format
const result = validate(data);     // { valid: boolean, errors: string[] }

if (result.valid) {
  console.log('Ship it.');
}
```

## Data Model

```
Project
└── Specification          # a feature, module, or deliverable
    ├── Patterns           # coding standards that inherit down
    ├── Blueprint[]        # design artifacts (diagrams, ADRs, mockups)
    └── Epic[]             # work groups
        └── Ticket[]       # atomic units of work
            ├── implementation    # steps, files to create/modify
            ├── codeReferences    # snippets the agent must follow
            ├── typeReferences    # TypeScript types to use
            ├── testSpecification # test commands and quality gates
            └── dependencies[]    # { dependsOnId, type: blocks | requires }
```

Full schema reference: [schema.specforge.tech](https://schema.specforge.tech)

## Three Formats, One Schema

| Format | Extension | Best for | Token efficiency |
|--------|-----------|----------|-----------------|
| **JSON** | `.sf.json` | Programmatic generation, CI pipelines, storage | Baseline |
| **YAML** | `.sf.yaml` | Human authoring, version control, readable diffs | ~15% fewer |
| **TOON** | `.sf.toon` | LLM agent context injection | **39.9% fewer** |

All three are lossless representations of the same schema. The validator accepts all three. Round-trip conversion is guaranteed: `JSON → TOON → JSON` produces identical output.

## Schema

JSON Schema published at permanent versioned URLs:

```
https://schema.specforge.tech/schema/v1.0/specforge-schema.json
```

**Stability guarantee:** old schema URLs never change. Every published version is permanent. See [GOVERNANCE.md](./GOVERNANCE.md) for the versioning policy.

## Versioning

The format follows `MAJOR.MINOR.PATCH` with an RFC-based change process:

| Tier | What changes | Process | Comment period |
|------|-------------|---------|---------------|
| **Patch** (1.0.x) | Typos, clarifications, examples | PR directly | None |
| **Minor** (1.x.0) | New optional fields, new enum values | RFC required | 2 weeks |
| **Major** (x.0.0) | Breaking changes, removed/renamed fields | RFC + migration guide | 4 weeks |

## Repository Structure

```
specforge-schema/
├── versions/v1.0/
│   ├── specforge-schema.json       # source of truth
│   ├── specforge-schema.yaml       # generated mirror
│   └── examples/                   # valid example specs
├── packages/validator/             # @specforge/validator (npm)
├── site/                           # schema.specforge.tech
├── rfcs/                           # accepted RFC documents
├── GOVERNANCE.md                   # change process
├── CONTRIBUTING.md                 # how to contribute
├── CHANGELOG.md                    # all schema changes
└── LICENSE                         # MIT
```

## Contributing

There are many ways to help, regardless of whether you use the SpecForge engine:

| Contribution | Where | Process |
|-------------|-------|---------|
| **Report a schema bug** (wrong type, missing enum value) | [GitHub Issues](https://github.com/solutionsforge/specforge-schema/issues) | Open an issue with the `bug` label |
| **Propose a new field or entity** | [GitHub Issues](https://github.com/solutionsforge/specforge-schema/issues) | Open an RFC using the [template](./rfcs/0000-template.md) |
| **Add an example spec** | `versions/v1.0/examples/` | PR directly |
| **Improve documentation** | `site/src/` | PR directly |
| **Build tooling on the format** | Your own repo | Let us know — we'll list it |

Read [CONTRIBUTING.md](./CONTRIBUTING.md) for full guidelines.

### Build Your Own Tools

The format is MIT-licensed and intentionally decoupled from any engine. You can build:

- **Validators** in any language (the JSON Schema is the source of truth)
- **Converters** between SFF and your own task/ticket formats
- **Generators** that produce `.sf.json` from natural language, PRDs, or existing codebases
- **Visualizers** that render the dependency graph
- **Executors** that consume specs and drive your own agents

If you build something, open an issue with the `ecosystem` label and we'll add it to the tooling list.

## Ecosystem

> This section will grow as the community builds tooling. To add yours, open an issue with the `ecosystem` label.

| Tool | Description | Author |
|------|-------------|--------|
| [@specforge/validator](./packages/validator) | Official offline validator (JSON, YAML, TOON) | Solutions Forge |
| [SpecForge Engine](https://specforge.tech) | Spec-driven development platform with MCP tools | Solutions Forge |

## Design Principles

These principles guide every RFC and schema change:

1. **Stability above features.** Old schema URLs never break. Ever.
2. **Engine-agnostic.** The format must not encode workflow concepts specific to any platform.
3. **LLM-first.** Fields must be meaningful to an agent, not just a human reader.
4. **Minimal core.** If in doubt, leave it out and let engines extend via `technicalDetails`.
5. **Dependency-driven.** Execution order comes from the graph, not from array position.

## FAQ

**Is this just for the SpecForge engine?**
No. The format is MIT-licensed and designed to be consumed by any tool. The engine is one implementation — you can build your own.

**Why not just use Jira exports or GitHub Issues?**
Those formats describe human workflows. SFF describes agent-executable work with implementation instructions, code references, type definitions, and dependency graphs. Different problem.

**Why three file formats?**
JSON for machines, YAML for humans, TOON for LLMs. Each optimizes for a different consumer. The schema is one — the encoding varies.

**Can I extend the schema with custom fields?**
Use `technicalDetails` (on Ticket) or `apiContracts` (on Specification) for engine-specific data. For format-level changes, open an RFC.

**Where is the TOON spec?**
TOON (Token-Oriented Object Notation) is documented at [schema.specforge.tech/formats/toon](https://schema.specforge.tech/formats/toon). The reference implementation is [`@toon-format/toon`](https://www.npmjs.com/package/@toon-format/toon).

## License

MIT — [Solutions Forge LTDA](https://solutionsforge.com.br).

The format is open. The engine is not.

---

<p align="center">
  <sub>
    <a href="https://schema.specforge.tech">schema.specforge.tech</a> · <a href="https://specforge.tech">specforge.tech</a> · <a href="https://github.com/solutionsforge/specforge-schema">GitHub</a>
  </sub>
</p>