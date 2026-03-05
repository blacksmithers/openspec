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

export const SCHEMA_TREE: SchemaEntity[] = [
  {
    name: "Project",
    required: true,
    fields: [
      { name: "id", type: "string (uuid)", required: true, desc: "Unique project identifier" },
      { name: "name", type: "string", required: true, desc: "Project display name" },
      { name: "description", type: "string", required: false, desc: "Project description" },
      { name: "tags", type: "string[]", required: false, desc: "Aspirational — not yet in engine v1" },
    ],
  },
  {
    name: "Specification",
    required: false,
    fields: [
      { name: "id", type: "string (uuid)", required: true, desc: "Unique spec identifier" },
      { name: "title", type: "string", required: true, desc: "Specification title" },
      { name: "description", type: "string", required: false, desc: "Short summary (2-3 sentences)" },
      { name: "content", type: "string", required: false, desc: "Full markdown content body" },
      { name: "status", type: "enum", required: false, desc: "draft | planning | specifying | validating | ready | in_progress | ready_for_review | in_review | reviewed | completed" },
      { name: "goals", type: "string[]", required: false, desc: "Project goals" },
      { name: "requirements", type: "string[]", required: false, desc: "Functional requirements" },
      { name: "acceptanceCriteria", type: "string[]", required: false, desc: "Acceptance criteria list" },
      { name: "patterns", type: "Patterns", required: false, desc: "Coding standards that propagate down" },
      { name: "epics", type: "Epic[]", required: false, desc: "Array of epics" },
      { name: "blueprints", type: "Blueprint[]", required: false, desc: "Design artifacts" },
    ],
  },
  {
    name: "Epic",
    required: false,
    fields: [
      { name: "id", type: "string (uuid)", required: true, desc: "Unique epic identifier" },
      { name: "epicNumber", type: "integer", required: false, desc: "Sequential identifier within specification" },
      { name: "title", type: "string", required: true, desc: "Epic title" },
      { name: "description", type: "string", required: false, desc: "Epic description" },
      { name: "objective", type: "string", required: false, desc: "Epic objective" },
      { name: "status", type: "enum", required: false, desc: "todo | in_progress | completed" },
      { name: "order", type: "integer", required: false, desc: "Execution ordering within specification" },
      { name: "tickets", type: "Ticket[]", required: false, desc: "Array of tickets" },
    ],
  },
  {
    name: "Ticket",
    required: false,
    fields: [
      { name: "id", type: "string (uuid)", required: true, desc: "Unique ticket identifier" },
      { name: "ticketNumber", type: "integer", required: false, desc: "Sequential identifier within epic" },
      { name: "title", type: "string", required: true, desc: "Ticket title" },
      { name: "description", type: "string", required: false, desc: "Ticket description" },
      { name: "status", type: "enum", required: false, desc: "pending | ready | active | done" },
      { name: "complexity", type: "enum", required: false, desc: "small | medium | large | xlarge" },
      { name: "priority", type: "enum", required: false, desc: "critical | high | medium | low" },
      { name: "implementation", type: "object", required: false, desc: "Steps, filesToCreate, filesToModify, notes" },
      { name: "codeReferences", type: "object[]", required: false, desc: "Code snippets the agent must follow" },
      { name: "dependencies", type: "Dependency[]", required: false, desc: "Ticket dependency graph" },
      { name: "testSpecification", type: "object", required: false, desc: "Test types, commands, and gates" },
    ],
  },
  {
    name: "Blueprint",
    required: false,
    fields: [
      { name: "id", type: "string (uuid)", required: true, desc: "Unique blueprint identifier" },
      { name: "title", type: "string", required: true, desc: "Blueprint title" },
      { name: "category", type: "enum", required: true, desc: "flowchart | architecture | state | sequence | erd | mockup | adr | component | deployment | api" },
      { name: "content", type: "string", required: true, desc: "Mermaid, markdown, ASCII, or mixed content" },
      { name: "format", type: "enum", required: false, desc: "markdown | mermaid | ascii | mixed" },
      { name: "status", type: "enum", required: false, desc: "draft | review | approved | deprecated" },
    ],
  },
  {
    name: "Patterns",
    required: false,
    fields: [
      { name: "codeStandards", type: "object", required: false, desc: "Language, naming conventions, error handling" },
      { name: "commonImports", type: "string[]", required: false, desc: "Import statements shared across all tickets" },
      { name: "returnTypes", type: "object", required: false, desc: "Standard return type patterns" },
    ],
  },
];
