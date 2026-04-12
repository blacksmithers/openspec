export interface OpenSpec {
    openSpecVersion: string;
    project: Project;
    specifications?: Specification[];
}
export interface Project {
    id: string;
    name: string;
    description?: string;
    tags?: string[];
}
export interface Specification {
    id: string;
    title: string;
    description?: string;
    content?: string;
    status?: 'draft' | 'planning' | 'specifying' | 'validating' | 'ready' | 'in_progress' | 'ready_for_review' | 'in_review' | 'reviewed' | 'completed';
    background?: string;
    scope?: string;
    goals?: string[];
    requirements?: string[];
    nonFunctionalRequirements?: string[];
    acceptanceCriteria?: string[];
    successMetrics?: string[];
    guardrails?: string[];
    constraints?: string[];
    assumptions?: string[];
    risks?: string[];
    architecture?: string;
    fileStructure?: string;
    techStack?: string[];
    dependencies?: string[];
    apiContracts?: Record<string, unknown>;
    priority?: 'high' | 'medium' | 'low';
    tags?: string[];
    estimatedHours?: number;
    patterns?: Patterns;
    epics?: Epic[];
    blueprints?: Blueprint[];
}
export interface Epic {
    id: string;
    epicNumber?: number;
    title: string;
    description?: string;
    content?: string;
    objective?: string;
    status?: 'todo' | 'in_progress' | 'completed';
    order?: number;
    scope?: string;
    goals?: string[];
    acceptanceCriteria?: string[];
    guardrails?: string[];
    constraints?: string[];
    assumptions?: string[];
    risks?: string[];
    architecture?: string;
    fileStructure?: string;
    techStack?: string[];
    dependencies?: string[];
    estimatedHours?: number;
    priority?: 'high' | 'medium' | 'low';
    tags?: string[];
    tickets?: Ticket[];
}
export interface Ticket {
    id: string;
    ticketNumber?: number;
    title: string;
    description?: string;
    notes?: string;
    status?: 'pending' | 'ready' | 'active' | 'done';
    complexity?: 'small' | 'medium' | 'large' | 'xlarge';
    priority?: 'critical' | 'high' | 'medium' | 'low';
    order?: number;
    estimatedHours?: number;
    actualHours?: number;
    acceptanceCriteria?: string[];
    implementation?: Implementation;
    codeReferences?: CodeReference[];
    technicalDetails?: Record<string, unknown>;
    typeReferences?: TypeReference[];
    testSpecification?: TestSpecification;
    dependencies?: Dependency[];
    tags?: string[];
}
export interface Implementation {
    steps?: string[];
    filesToCreate?: string[];
    filesToModify?: string[];
    notes?: string;
}
export interface CodeReference {
    name: string;
    code: string;
    language?: string;
}
export interface TypeReference {
    name: string;
    definition: string;
}
export interface Dependency {
    dependsOnId: string;
    type: 'blocks' | 'requires';
}
export interface TestSpecification {
    types?: string[];
    commands?: string[];
    gates?: string[];
}
export interface Blueprint {
    id: string;
    title: string;
    description?: string;
    slug?: string;
    category: 'flowchart' | 'architecture' | 'state' | 'sequence' | 'erd' | 'mockup' | 'adr' | 'component' | 'deployment' | 'api';
    format?: 'markdown' | 'mermaid' | 'ascii' | 'mixed';
    content: string;
    notes?: string;
    version?: string;
    order?: number;
    status?: 'draft' | 'review' | 'approved' | 'deprecated';
    tags?: string[];
}
export interface Patterns {
    codeStandards?: Record<string, unknown>;
    commonImports?: string[];
    returnTypes?: Record<string, unknown>;
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
//# sourceMappingURL=types.d.ts.map