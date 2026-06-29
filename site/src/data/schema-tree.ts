export interface SchemaField {
  name: string;
  type: string;
  required: boolean;
  desc: string;
}

export interface SchemaEntity {
  name: string;
  required: boolean;
  fields: SchemaField[];
}

// OpenSpec v1.1 field catalog.
// In v1.1 the document IS a single Specification (there is no Project wrapper and
// no specifications[] array). The root carries schemaVersion: "1.1" and embeds the
// sub-entities below directly.
export const SCHEMA_TREE: SchemaEntity[] = [
  {
    name: "Specification",
    required: true,
    fields: [
      { name: "schemaVersion", type: '"1.1"', required: true, desc: "Schema version constant — always \"1.1\"" },
      { name: "id", type: "string", required: true, desc: "Unique specification identifier" },
      { name: "projectId", type: "string", required: true, desc: "Identifier of the owning project" },
      { name: "title", type: "string", required: true, desc: "Specification title" },
      { name: "status", type: "string", required: true, desc: "Lifecycle status (e.g. planning, ready, in_progress, completed)" },
      { name: "description", type: "string", required: false, desc: "Short summary of the spec" },
      { name: "background", type: "string", required: false, desc: "Context and motivation for the work" },
      { name: "goals", type: "Goal[]", required: true, desc: "Outcomes the spec must achieve (min 3)" },
      { name: "requirements", type: "Requirement[]", required: true, desc: "Functional, business-rule, and integration requirements (min 3)" },
      { name: "architecture", type: "string", required: true, desc: "High-level architecture narrative" },
      { name: "scope", type: "Scope", required: true, desc: "In-scope / out-of-scope boundaries" },
      { name: "techStack", type: "TechStackItem[]", required: true, desc: "Technologies chosen, grouped by layer" },
      { name: "folderStructures", type: "StructureItem[]", required: true, desc: "Planned directory layouts (min 1)" },
      { name: "acceptanceCriteria", type: "AcceptanceCriterion[]", required: true, desc: "Spec-level Given/When/Then criteria" },
      { name: "nonFunctionalRequirements", type: "NFR[]", required: true, desc: "Quality attributes with measurable targets" },
      { name: "guardrails", type: "Guardrail[]", required: true, desc: "Constraints agents must never violate" },
      { name: "sharedPatterns", type: "SharedPattern[]", required: false, desc: "Conventions that propagate down to tickets" },
      { name: "epics", type: "Epic[]", required: true, desc: "Units of work, each containing tickets" },
      { name: "blueprints", type: "Blueprint[]", required: true, desc: "Design artifacts (diagrams, ADRs, schemas)" },
      { name: "fieldDeclarations", type: "object", required: false, desc: "Explicit { value: \"N/A\", reason } declarations per omitted field" },
      { name: "epicTargets", type: "object", required: false, desc: "Target epic counts: foundation, functional, nonFunctional, verification" },
      { name: "estimatedMinutes", type: "integer", required: false, desc: "Total estimated effort in minutes" },
    ],
  },
  {
    name: "Goal",
    required: true,
    fields: [
      { name: "id", type: "string", required: true, desc: "Unique goal identifier" },
      { name: "title", type: "string", required: true, desc: "Short goal statement" },
      { name: "description", type: "string", required: true, desc: "What the goal means and why it matters" },
      { name: "type", type: "enum", required: true, desc: "business | technical | user | operational" },
      { name: "successCriteria", type: "string[]", required: true, desc: "Observable signals the goal is met (min 1)" },
      { name: "kpi", type: "string", required: false, desc: "Key performance indicator that tracks the goal" },
    ],
  },
  {
    name: "Requirement",
    required: true,
    fields: [
      { name: "id", type: "string", required: true, desc: "Unique requirement identifier" },
      { name: "title", type: "string", required: true, desc: "Requirement title" },
      { name: "description", type: "string", required: true, desc: "What the system must do" },
      { name: "type", type: "enum", required: true, desc: "functional | business-rule | integration" },
      { name: "acceptanceCriteria", type: "AcceptanceCriterion[]", required: true, desc: "Given/When/Then criteria for this requirement (min 1)" },
      { name: "source", type: "string", required: false, desc: "Origin of the requirement (brief, stakeholder, etc.)" },
      { name: "dependsOn", type: "string[]", required: false, desc: "IDs of requirements this one depends on" },
      { name: "constraints", type: "string[]", required: false, desc: "Constraints that bound the requirement" },
    ],
  },
  {
    name: "AcceptanceCriterion",
    required: true,
    fields: [
      { name: "id", type: "string", required: true, desc: "Unique criterion identifier" },
      { name: "given", type: "string", required: true, desc: "Precondition / context" },
      { name: "when", type: "string", required: true, desc: "Action or event" },
      { name: "then", type: "string", required: true, desc: "Expected outcome" },
      { name: "order", type: "integer", required: true, desc: "Display / evaluation order (min 1)" },
    ],
  },
  {
    name: "Scope",
    required: true,
    fields: [
      { name: "inScope", type: "string[]", required: true, desc: "What the spec covers (min 3)" },
      { name: "outOfScope", type: "string[]", required: true, desc: "What is explicitly excluded (min 1)" },
      { name: "assumptions", type: "string[]", required: false, desc: "Assumptions the plan relies on" },
      { name: "externalDependencies", type: "string[]", required: false, desc: "Outside systems or services depended upon" },
    ],
  },
  {
    name: "TechStackItem",
    required: true,
    fields: [
      { name: "id", type: "string", required: true, desc: "Unique tech-stack item identifier" },
      { name: "name", type: "string", required: true, desc: "Technology name" },
      { name: "layer", type: "enum", required: true, desc: "database | backend | frontend | infrastructure | devops | observability | auth | integration | testing" },
      { name: "version", type: "string", required: false, desc: "Pinned or target version" },
      { name: "rationale", type: "string", required: false, desc: "Why this technology was chosen" },
      { name: "alternativesConsidered", type: "string[]", required: false, desc: "Other options weighed and rejected" },
    ],
  },
  {
    name: "StructureItem",
    required: true,
    fields: [
      { name: "id", type: "string", required: true, desc: "Unique structure identifier" },
      { name: "scope", type: "string", required: true, desc: "What this layout applies to (service, repository, module…)" },
      { name: "content", type: "string", required: true, desc: "The directory/file tree as text" },
      { name: "description", type: "string", required: false, desc: "Notes about the structure" },
    ],
  },
  {
    name: "NFR",
    required: true,
    fields: [
      { name: "id", type: "string", required: true, desc: "Unique NFR identifier" },
      { name: "description", type: "string", required: true, desc: "The quality attribute being constrained" },
      { name: "category", type: "enum", required: true, desc: "performance | security | scalability | reliability | availability | usability | maintainability | observability | compliance | accessibility" },
      { name: "metric", type: "string", required: true, desc: "What is measured" },
      { name: "target", type: "string", required: true, desc: "The threshold that must be met" },
      { name: "measurementMethod", type: "string", required: false, desc: "How the metric is measured/verified" },
    ],
  },
  {
    name: "Guardrail",
    required: true,
    fields: [
      { name: "id", type: "string", required: true, desc: "Unique guardrail identifier" },
      { name: "description", type: "string", required: true, desc: "The rule that must hold" },
      { name: "category", type: "enum", required: true, desc: "technical | business | regulatory | ethical | operational" },
      { name: "rationale", type: "string", required: true, desc: "Why the guardrail exists" },
      { name: "consequence", type: "string", required: true, desc: "What happens if it is violated" },
      { name: "scope", type: "enum", required: false, desc: "spec | epic | ticket — how broadly it applies" },
    ],
  },
  {
    name: "SharedPattern",
    required: false,
    fields: [
      { name: "id", type: "string", required: true, desc: "Unique pattern identifier" },
      { name: "name", type: "string", required: true, desc: "Pattern name" },
      { name: "description", type: "string", required: true, desc: "What the pattern standardizes" },
      { name: "codeStandards", type: "object", required: false, desc: "errorHandling, naming, language, and other conventions" },
      { name: "commonImports", type: "string[]", required: false, desc: "Imports shared across tickets" },
      { name: "returnTypes", type: "object", required: false, desc: "Standard return-type signatures by key" },
      { name: "additionalImports", type: "string[]", required: false, desc: "Supplementary imports" },
      { name: "commonFiles", type: "object", required: false, desc: "Reusable files keyed by name" },
    ],
  },
  {
    name: "Epic",
    required: true,
    fields: [
      { name: "id", type: "string", required: true, desc: "Unique epic identifier" },
      { name: "specificationId", type: "string", required: true, desc: "ID of the parent specification" },
      { name: "title", type: "string", required: true, desc: "Epic title" },
      { name: "description", type: "string", required: true, desc: "What the epic delivers" },
      { name: "objective", type: "string", required: true, desc: "The concrete outcome of the epic" },
      { name: "tickets", type: "Ticket[]", required: true, desc: "The atomic units of work in this epic" },
      { name: "order", type: "integer", required: false, desc: "Execution ordering within the spec" },
      { name: "estimatedMinutes", type: "integer", required: false, desc: "Estimated effort in minutes" },
      { name: "category", type: "enum", required: false, desc: "foundation | functional | non_functional | verification" },
      { name: "scope", type: "Scope", required: false, desc: "Epic-level in/out-of-scope" },
      { name: "goals", type: "Goal[]", required: false, desc: "Epic-specific goals" },
      { name: "acceptanceCriteria", type: "AcceptanceCriterion[]", required: false, desc: "Epic-level acceptance criteria" },
      { name: "validationCommands", type: "string[]", required: false, desc: "Commands that validate the epic" },
      { name: "apiContracts", type: "object[]", required: false, desc: "API contracts (rest | graphql | rpc | event | cli)" },
      { name: "sharedPatterns", type: "SharedPattern[]", required: false, desc: "Patterns reused within the epic" },
      { name: "fileStructures", type: "StructureItem[]", required: false, desc: "Epic-scoped directory layouts" },
      { name: "requirementsCovered", type: "string[]", required: false, desc: "Requirement IDs this epic addresses" },
      { name: "nfrsCovered", type: "string[]", required: false, desc: "NFR IDs this epic addresses" },
      { name: "goalsCovered", type: "string[]", required: false, desc: "Goal IDs this epic addresses" },
      { name: "fieldDeclarations", type: "object", required: false, desc: "Explicit N/A declarations with rationale" },
    ],
  },
  {
    name: "Ticket",
    required: true,
    fields: [
      { name: "id", type: "string", required: true, desc: "Unique ticket identifier" },
      { name: "epicId", type: "string", required: true, desc: "ID of the parent epic" },
      { name: "title", type: "string", required: true, desc: "Ticket title" },
      { name: "ticketType", type: "enum", required: true, desc: "implementation | verification" },
      { name: "complexity", type: "enum", required: true, desc: "small | medium | large | xlarge" },
      { name: "estimatedMinutes", type: "integer", required: true, desc: "Estimated effort in minutes" },
      { name: "acceptanceCriteria", type: "AcceptanceCriterion[]", required: true, desc: "Given/When/Then criteria for the ticket" },
      { name: "implementationSteps", type: "object[]", required: true, desc: "Ordered steps: { id, text, order }" },
      { name: "filesToBeCreated", type: "string[]", required: true, desc: "Files the ticket will create" },
      { name: "filesToBeModified", type: "string[]", required: true, desc: "Files the ticket will modify" },
      { name: "filesToBeDeleted", type: "string[]", required: true, desc: "Files the ticket will delete" },
      { name: "filesToBeReferenced", type: "string[]", required: true, desc: "Files the agent should read for context" },
      { name: "guardrails", type: "string[]", required: true, desc: "Ticket-level constraints to honor" },
      { name: "codeReferences", type: "object[]", required: true, desc: "Code anchors: { filePath, symbol?, description? }" },
      { name: "typeReferences", type: "object[]", required: true, desc: "Type anchors: { filePath, typeName, description? }" },
      { name: "blueprintReferences", type: "object[]", required: true, desc: "Linked blueprints: { blueprintId, context?, section? }" },
      { name: "dependencies", type: "Dependency[]", required: true, desc: "Ticket dependency graph" },
      { name: "ticketNumber", type: "integer", required: false, desc: "Sequential identifier within the epic" },
      { name: "description", type: "string", required: false, desc: "Ticket description" },
      { name: "order", type: "integer", required: false, desc: "Execution ordering within the epic" },
      { name: "testSpecification", type: "TestSpecification", required: false, desc: "Test types, gates, and commands" },
      { name: "codeSnippets", type: "object[]", required: false, desc: "Illustrative code: { id, language, content, description? }" },
      { name: "typeSnippets", type: "object[]", required: false, desc: "Illustrative types: { id, language, content, description? }" },
      { name: "fieldDeclarations", type: "object", required: false, desc: "Explicit N/A declarations with rationale" },
    ],
  },
  {
    name: "TestSpecification",
    required: false,
    fields: [
      { name: "testTypes", type: "enum[]", required: true, desc: "unit | integration | e2e | typecheck | lint | build | contract | structural | layout | a11y | performance (min 1)" },
      { name: "qualityGates", type: "string[]", required: true, desc: "Conditions that must pass (min 1)" },
      { name: "testCommands", type: "string[]", required: true, desc: "Commands that run the tests" },
      { name: "coverageTarget", type: "number", required: false, desc: "Target coverage percentage (0–100)" },
    ],
  },
  {
    name: "Dependency",
    required: true,
    fields: [
      { name: "ticketId", type: "string", required: true, desc: "ID of the related ticket" },
      { name: "type", type: "enum", required: true, desc: "requires | blocks" },
    ],
  },
  {
    name: "Blueprint",
    required: true,
    fields: [
      { name: "id", type: "string", required: true, desc: "Unique blueprint identifier" },
      { name: "title", type: "string", required: true, desc: "Blueprint title" },
      { name: "category", type: "enum", required: true, desc: "flowchart | architecture | state | sequence | erd | mockup | adr | component | deployment | api | algorithm | protocol | glossary | design_system" },
      { name: "content", type: "string", required: true, desc: "Mermaid, markdown, ASCII, HTML, SVG, or image content" },
      { name: "description", type: "string", required: false, desc: "What the blueprint depicts" },
      { name: "slug", type: "string", required: false, desc: "URL-friendly identifier" },
      { name: "format", type: "enum", required: false, desc: "markdown | mermaid | ascii | mixed | html | svg | image" },
      { name: "coverageType", type: "enum", required: false, desc: "ticket | all — referenced per-ticket or spec-wide" },
      { name: "notes", type: "string", required: false, desc: "Supplementary notes" },
      { name: "version", type: "string", required: false, desc: "Blueprint version label" },
      { name: "order", type: "integer", required: false, desc: "Display ordering" },
      { name: "tags", type: "string[]", required: false, desc: "Free-form tags" },
    ],
  },
];
