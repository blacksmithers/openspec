/**
 * TypeScript model for the OpenSpec Format, version 1.1.
 *
 * In v1.1 the document IS a single Specification: there is no `project`
 * object and no `specifications[]` wrapper. The root object carries the
 * spec metadata directly, plus `epics[]` and `blueprints[]`.
 */

export interface OpenSpec {
  schemaVersion: '1.1';
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: string;
  background?: string;
  goals: Goal[];
  requirements: Requirement[];
  architecture: string;
  scope: Scope;
  techStack: TechStackItem[];
  folderStructures: FolderStructure[];
  acceptanceCriteria: AcceptanceCriterion[];
  nonFunctionalRequirements: NonFunctionalRequirement[];
  sharedPatterns?: SharedPattern[];
  guardrails: Guardrail[];
  epics: Epic[];
  blueprints: Blueprint[];
  fieldDeclarations?: Record<string, FieldDeclaration>;
  epicTargets?: EpicTargets;
  estimatedMinutes?: number;
}

/**
 * The root document is itself the specification. This alias keeps call
 * sites that talk about a "Specification" readable.
 */
export type Specification = OpenSpec;

export interface Goal {
  id: string;
  title: string;
  description: string;
  type: 'business' | 'technical' | 'user' | 'operational';
  successCriteria: string[];
  kpi?: string;
}

export interface AcceptanceCriterion {
  id: string;
  given: string;
  when: string;
  then: string;
  order: number;
}

export interface Requirement {
  id: string;
  title: string;
  description: string;
  type: 'functional' | 'business-rule' | 'integration';
  source?: string;
  acceptanceCriteria: AcceptanceCriterion[];
  dependsOn?: string[];
  constraints?: string[];
}

export interface Scope {
  inScope: string[];
  outOfScope: string[];
  assumptions?: string[];
  externalDependencies?: string[];
}

export interface TechStackItem {
  id: string;
  name: string;
  version?: string;
  layer:
    | 'database'
    | 'backend'
    | 'frontend'
    | 'infrastructure'
    | 'devops'
    | 'observability'
    | 'auth'
    | 'integration'
    | 'testing';
  rationale?: string;
  alternativesConsidered?: string[];
}

export interface FolderStructure {
  id: string;
  scope: string;
  description?: string;
  content: string;
}

export interface NonFunctionalRequirement {
  id: string;
  description: string;
  category:
    | 'performance'
    | 'security'
    | 'scalability'
    | 'reliability'
    | 'availability'
    | 'usability'
    | 'maintainability'
    | 'observability'
    | 'compliance'
    | 'accessibility';
  metric: string;
  target: string;
  measurementMethod?: string;
}

export interface SharedPattern {
  id: string;
  name: string;
  description: string;
  codeStandards?: {
    errorHandling?: string;
    naming?: string;
    language?: string;
    [key: string]: string | undefined;
  };
  commonImports?: string[];
  returnTypes?: Record<string, string>;
  additionalImports?: string[];
  commonFiles?: Record<string, string>;
}

export interface Guardrail {
  id: string;
  description: string;
  category: 'technical' | 'business' | 'regulatory' | 'ethical' | 'operational';
  rationale: string;
  consequence: string;
  scope?: 'spec' | 'epic' | 'ticket';
}

export interface FieldDeclaration {
  value: 'N/A';
  reason: string;
}

export interface EpicTargets {
  foundation: number;
  functional: number;
  nonFunctional: number;
  verification: number;
}

export interface BlueprintReference {
  blueprintId: string;
  context?: string;
  section?: string;
}

export interface ApiContract {
  id: string;
  name: string;
  type: 'rest' | 'graphql' | 'rpc' | 'event' | 'cli';
  description?: string;
  blueprintReferences?: BlueprintReference[];
}

export interface Epic {
  id: string;
  specificationId: string;
  title: string;
  description?: string;
  objective?: string;
  order?: number;
  estimatedMinutes?: number;
  architecture?: string;
  scope?: Scope;
  goals?: Goal[];
  acceptanceCriteria?: AcceptanceCriterion[];
  validationCommands?: string[];
  apiContracts?: ApiContract[];
  sharedPatterns?: SharedPattern[];
  fileStructures?: FolderStructure[];
  requirementsCovered?: string[];
  nfrsCovered?: string[];
  goalsCovered?: string[];
  tickets: Ticket[];
  fieldDeclarations?: Record<string, FieldDeclaration>;
  category?: 'foundation' | 'functional' | 'non_functional' | 'verification';
}

export interface ImplementationStep {
  id: string;
  text: string;
  order: number;
}

export interface CodeReference {
  filePath: string;
  symbol?: string;
  description?: string;
}

export interface TypeReference {
  filePath: string;
  typeName: string;
  description?: string;
}

export interface CodeSnippet {
  id: string;
  language: string;
  description?: string;
  content: string;
}

export interface TestSpecification {
  testTypes: string[];
  qualityGates: string[];
  testCommands: string[];
  coverageTarget?: number;
}

export interface Dependency {
  ticketId: string;
  type: 'requires' | 'blocks';
}

export interface Ticket {
  id: string;
  epicId: string;
  ticketNumber?: number;
  title: string;
  description?: string;
  ticketType: 'implementation' | 'verification';
  complexity: 'small' | 'medium' | 'large' | 'xlarge';
  estimatedMinutes: number;
  order?: number;
  acceptanceCriteria: AcceptanceCriterion[];
  implementationSteps: ImplementationStep[];
  filesToBeCreated: string[];
  filesToBeModified: string[];
  filesToBeDeleted: string[];
  filesToBeReferenced: string[];
  testSpecification?: TestSpecification;
  guardrails: string[];
  codeReferences: CodeReference[];
  typeReferences: TypeReference[];
  codeSnippets?: CodeSnippet[];
  typeSnippets?: CodeSnippet[];
  blueprintReferences: BlueprintReference[];
  dependencies: Dependency[];
  fieldDeclarations?: Record<string, FieldDeclaration>;
}

export interface Blueprint {
  id: string;
  title: string;
  description?: string;
  slug?: string;
  category:
    | 'flowchart'
    | 'architecture'
    | 'state'
    | 'sequence'
    | 'erd'
    | 'mockup'
    | 'adr'
    | 'component'
    | 'deployment'
    | 'api'
    | 'algorithm'
    | 'protocol'
    | 'glossary'
    | 'design_system';
  format?: 'markdown' | 'mermaid' | 'ascii' | 'mixed' | 'html' | 'svg' | 'image';
  coverageType?: 'ticket' | 'all';
  content: string;
  notes?: string;
  version?: string;
  order?: number;
  tags?: string[];
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

export interface ValidationError {
  path: string;
  message: string;
  hint?: string;
}
