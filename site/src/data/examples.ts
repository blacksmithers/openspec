// OpenSpec v1.1 example specifications.
// A v1.1 document IS a single Specification (no Project / specifications[] wrapper).
// MINIMAL_EXAMPLE mirrors versions/v1.1/examples/minimal.oschema.json (the smallest valid spec).
// FULL_EXAMPLE / YAML_EXAMPLE / TOON_EXAMPLE are the same Todo API spec
// (versions/v1.1/examples/todo-api.oschema.json) expressed in JSON, YAML, and TOON.

export const MINIMAL_EXAMPLE = `{
  "schemaVersion": "1.1",
  "id": "spec-task-tracker",
  "projectId": "proj-task-tracker",
  "title": "Task Tracker API",
  "status": "planning",
  "goals": [
    {
      "id": "goal-1",
      "title": "Let users capture tasks quickly",
      "description": "Provide a low-friction way to create and list tasks so nothing is forgotten.",
      "type": "user",
      "successCriteria": [
        "A task can be created and listed in under one second"
      ]
    },
    {
      "id": "goal-2",
      "title": "Keep task data durable",
      "description": "Persist tasks so they survive restarts and are never silently lost.",
      "type": "technical",
      "successCriteria": [
        "No task is lost across a service restart"
      ]
    },
    {
      "id": "goal-3",
      "title": "Expose a stable HTTP contract",
      "description": "Offer a predictable REST surface that clients can integrate against.",
      "type": "business",
      "successCriteria": [
        "The public endpoints follow a documented, versioned contract"
      ]
    }
  ],
  "requirements": [
    {
      "id": "req-1",
      "title": "Create a task",
      "description": "Clients can create a task with a title and optional description.",
      "type": "functional",
      "acceptanceCriteria": [
        {
          "id": "ac-1",
          "given": "a valid task payload",
          "when": "the client POSTs to /tasks",
          "then": "the task is stored and returned with a generated id",
          "order": 1
        }
      ]
    },
    {
      "id": "req-2",
      "title": "List tasks",
      "description": "Clients can retrieve the list of existing tasks.",
      "type": "functional",
      "acceptanceCriteria": [
        {
          "id": "ac-2",
          "given": "stored tasks exist",
          "when": "the client GETs /tasks",
          "then": "all tasks are returned in creation order",
          "order": 1
        }
      ]
    },
    {
      "id": "req-3",
      "title": "Reject invalid input",
      "description": "Malformed task payloads are rejected with a clear error.",
      "type": "business-rule",
      "acceptanceCriteria": [
        {
          "id": "ac-3",
          "given": "a task payload without a title",
          "when": "the client POSTs to /tasks",
          "then": "the request is rejected with a 400 and a descriptive message",
          "order": 1
        }
      ]
    }
  ],
  "architecture": "A single stateless HTTP service backed by a relational database, exposing a small REST API for tasks.",
  "scope": {
    "inScope": [
      "Creating tasks",
      "Listing tasks",
      "Input validation"
    ],
    "outOfScope": [
      "Authentication and multi-user accounts"
    ]
  },
  "techStack": [],
  "folderStructures": [
    {
      "id": "fs-1",
      "scope": "service",
      "content": "src/\\n  routes/tasks.ts\\n  db/index.ts\\n  server.ts"
    }
  ],
  "acceptanceCriteria": [],
  "nonFunctionalRequirements": [],
  "guardrails": [],
  "epics": [],
  "blueprints": []
}`;

export const FULL_EXAMPLE = `{
  "schemaVersion": "1.1",
  "id": "spec-todo-api",
  "projectId": "proj-todo",
  "title": "Todo API",
  "description": "A small REST API for creating, listing, completing, and deleting todo items.",
  "status": "planning",
  "background": "Teams need a minimal, dependency-light service to track todo items behind a stable HTTP contract.",
  "goals": [
    {
      "id": "goal-crud",
      "title": "Offer full todo lifecycle",
      "description": "Support creating, listing, completing, and deleting todo items over HTTP.",
      "type": "user",
      "successCriteria": [
        "A todo can be created, completed, and deleted via the API",
        "Listing returns todos in a stable order"
      ]
    },
    {
      "id": "goal-durable",
      "title": "Persist todos durably",
      "description": "Store todos in a relational database so they survive restarts.",
      "type": "technical",
      "successCriteria": [
        "No todo is lost across a service restart"
      ]
    },
    {
      "id": "goal-contract",
      "title": "Maintain a versioned contract",
      "description": "Expose a documented, backward-compatible REST contract.",
      "type": "business",
      "successCriteria": [
        "Breaking changes are gated behind a new API version"
      ]
    }
  ],
  "requirements": [
    {
      "id": "req-create",
      "title": "Create a todo",
      "description": "Clients can create a todo with a title and optional notes.",
      "type": "functional",
      "acceptanceCriteria": [
        {
          "id": "ac-create",
          "given": "a valid todo payload",
          "when": "the client POSTs to /todos",
          "then": "the todo is persisted and returned with a generated id and createdAt",
          "order": 1
        }
      ]
    },
    {
      "id": "req-complete",
      "title": "Complete a todo",
      "description": "Clients can mark an existing todo as completed.",
      "type": "functional",
      "acceptanceCriteria": [
        {
          "id": "ac-complete",
          "given": "an existing open todo",
          "when": "the client PATCHes /todos/{id} with completed=true",
          "then": "the todo is marked completed and the updated record is returned",
          "order": 1
        }
      ]
    },
    {
      "id": "req-validate",
      "title": "Validate input",
      "description": "Reject malformed payloads with a descriptive error.",
      "type": "business-rule",
      "acceptanceCriteria": [
        {
          "id": "ac-validate",
          "given": "a todo payload without a title",
          "when": "the client POSTs to /todos",
          "then": "the request fails with a 400 and a field-level error",
          "order": 1
        }
      ]
    }
  ],
  "architecture": "A stateless Node.js HTTP service exposing a REST API, backed by PostgreSQL for persistence. Requests are validated at the edge before reaching the data layer.",
  "scope": {
    "inScope": [
      "Todo create, list, complete, and delete",
      "Request payload validation",
      "Relational persistence"
    ],
    "outOfScope": [
      "Authentication and authorization",
      "Real-time updates"
    ],
    "assumptions": [
      "A single PostgreSQL instance is available"
    ],
    "externalDependencies": [
      "PostgreSQL 15+"
    ]
  },
  "techStack": [
    {
      "id": "tech-node",
      "name": "Node.js",
      "version": "20",
      "layer": "backend",
      "rationale": "Lightweight, ubiquitous runtime for small HTTP services."
    },
    {
      "id": "tech-postgres",
      "name": "PostgreSQL",
      "version": "15",
      "layer": "database",
      "rationale": "Durable relational store with strong consistency guarantees."
    }
  ],
  "folderStructures": [
    {
      "id": "fs-service",
      "scope": "service",
      "description": "Top-level layout of the HTTP service.",
      "content": "src/\\n  routes/todos.ts\\n  db/todos.ts\\n  validation/todo.ts\\n  server.ts"
    }
  ],
  "acceptanceCriteria": [
    {
      "id": "spec-ac-1",
      "given": "the service is running",
      "when": "a client exercises the documented endpoints",
      "then": "each endpoint behaves per its requirement's acceptance criteria",
      "order": 1
    }
  ],
  "nonFunctionalRequirements": [
    {
      "id": "nfr-latency",
      "description": "Read endpoints respond quickly under nominal load.",
      "category": "performance",
      "metric": "p95 latency for GET /todos",
      "target": "< 100ms at 50 rps",
      "measurementMethod": "Load test with k6 against a staging instance"
    }
  ],
  "guardrails": [
    {
      "id": "gr-no-pii",
      "description": "Todo content must not be used to store secrets or personal data.",
      "category": "regulatory",
      "rationale": "The service has no encryption-at-rest or access controls.",
      "consequence": "Storing sensitive data would create an uncontrolled data-exposure risk.",
      "scope": "spec"
    }
  ],
  "epics": [
    {
      "id": "ep-core",
      "specificationId": "spec-todo-api",
      "title": "Core todo endpoints",
      "description": "Implement the create, list, complete, and delete endpoints with persistence.",
      "objective": "Deliver a working todo CRUD API backed by PostgreSQL.",
      "order": 0,
      "category": "functional",
      "tickets": [
        {
          "id": "tkt-create",
          "epicId": "ep-core",
          "ticketNumber": 1,
          "title": "Implement POST /todos",
          "description": "Add the create-todo route with validation and persistence.",
          "ticketType": "implementation",
          "complexity": "medium",
          "estimatedMinutes": 90,
          "order": 0,
          "acceptanceCriteria": [
            {
              "id": "ac-tkt-create",
              "given": "a valid payload",
              "when": "POST /todos is called",
              "then": "a 201 is returned with the persisted todo",
              "order": 1
            }
          ],
          "implementationSteps": [
            {
              "id": "step-1",
              "text": "Define the todo validation schema",
              "order": 1
            },
            {
              "id": "step-2",
              "text": "Add the POST /todos route handler",
              "order": 2
            },
            {
              "id": "step-3",
              "text": "Insert the todo via the data layer",
              "order": 3
            }
          ],
          "filesToBeCreated": [
            "src/routes/todos.ts",
            "src/validation/todo.ts"
          ],
          "filesToBeModified": [
            "src/server.ts"
          ],
          "filesToBeDeleted": [],
          "filesToBeReferenced": [
            "src/db/todos.ts"
          ],
          "testSpecification": {
            "testTypes": [
              "unit",
              "integration"
            ],
            "qualityGates": [
              "All new code paths covered by tests"
            ],
            "testCommands": [
              "npm test"
            ],
            "coverageTarget": 80
          },
          "guardrails": [
            "Reject payloads larger than 8KB"
          ],
          "codeReferences": [
            {
              "filePath": "src/db/todos.ts",
              "symbol": "insertTodo",
              "description": "Existing insert helper to reuse"
            }
          ],
          "typeReferences": [
            {
              "filePath": "src/types/todo.ts",
              "typeName": "Todo",
              "description": "Shared todo type"
            }
          ],
          "blueprintReferences": [
            {
              "blueprintId": "bp-todo-flow",
              "context": "Create path"
            }
          ],
          "dependencies": []
        },
        {
          "id": "tkt-list",
          "epicId": "ep-core",
          "ticketNumber": 2,
          "title": "Implement GET /todos",
          "description": "Add the list-todos route returning todos in creation order.",
          "ticketType": "implementation",
          "complexity": "small",
          "estimatedMinutes": 45,
          "order": 1,
          "acceptanceCriteria": [
            {
              "id": "ac-tkt-list",
              "given": "stored todos exist",
              "when": "GET /todos is called",
              "then": "a 200 is returned with todos in creation order",
              "order": 1
            }
          ],
          "implementationSteps": [
            {
              "id": "step-1",
              "text": "Add the GET /todos route handler",
              "order": 1
            },
            {
              "id": "step-2",
              "text": "Query todos ordered by createdAt",
              "order": 2
            }
          ],
          "filesToBeCreated": [],
          "filesToBeModified": [
            "src/routes/todos.ts"
          ],
          "filesToBeDeleted": [],
          "filesToBeReferenced": [
            "src/db/todos.ts"
          ],
          "testSpecification": {
            "testTypes": [
              "unit",
              "integration"
            ],
            "qualityGates": [
              "List ordering verified by a test"
            ],
            "testCommands": [
              "npm test"
            ],
            "coverageTarget": 80
          },
          "guardrails": [],
          "codeReferences": [
            {
              "filePath": "src/db/todos.ts",
              "symbol": "listTodos"
            }
          ],
          "typeReferences": [
            {
              "filePath": "src/types/todo.ts",
              "typeName": "Todo"
            }
          ],
          "blueprintReferences": [],
          "dependencies": [
            {
              "ticketId": "tkt-create",
              "type": "requires"
            }
          ]
        }
      ]
    }
  ],
  "blueprints": [
    {
      "id": "bp-todo-flow",
      "title": "Todo request flow",
      "description": "Sequence of a create-todo request from route to database.",
      "category": "sequence",
      "format": "mermaid",
      "coverageType": "all",
      "content": "sequenceDiagram\\n  Client->>API: POST /todos\\n  API->>DB: insertTodo()\\n  DB-->>API: row\\n  API-->>Client: 201 Created",
      "order": 0
    }
  ]
}`;

export const YAML_EXAMPLE = `schemaVersion: "1.1"
id: spec-todo-api
projectId: proj-todo
title: Todo API
description: A small REST API for creating, listing, completing, and deleting todo items.
status: planning
background: Teams need a minimal, dependency-light service to track todo items
  behind a stable HTTP contract.
goals:
  - id: goal-crud
    title: Offer full todo lifecycle
    description: Support creating, listing, completing, and deleting todo items over HTTP.
    type: user
    successCriteria:
      - A todo can be created, completed, and deleted via the API
      - Listing returns todos in a stable order
  - id: goal-durable
    title: Persist todos durably
    description: Store todos in a relational database so they survive restarts.
    type: technical
    successCriteria:
      - No todo is lost across a service restart
  - id: goal-contract
    title: Maintain a versioned contract
    description: Expose a documented, backward-compatible REST contract.
    type: business
    successCriteria:
      - Breaking changes are gated behind a new API version
requirements:
  - id: req-create
    title: Create a todo
    description: Clients can create a todo with a title and optional notes.
    type: functional
    acceptanceCriteria:
      - id: ac-create
        given: a valid todo payload
        when: the client POSTs to /todos
        then: the todo is persisted and returned with a generated id and createdAt
        order: 1
  - id: req-complete
    title: Complete a todo
    description: Clients can mark an existing todo as completed.
    type: functional
    acceptanceCriteria:
      - id: ac-complete
        given: an existing open todo
        when: the client PATCHes /todos/{id} with completed=true
        then: the todo is marked completed and the updated record is returned
        order: 1
  - id: req-validate
    title: Validate input
    description: Reject malformed payloads with a descriptive error.
    type: business-rule
    acceptanceCriteria:
      - id: ac-validate
        given: a todo payload without a title
        when: the client POSTs to /todos
        then: the request fails with a 400 and a field-level error
        order: 1
architecture: A stateless Node.js HTTP service exposing a REST API, backed by
  PostgreSQL for persistence. Requests are validated at the edge before reaching
  the data layer.
scope:
  inScope:
    - Todo create, list, complete, and delete
    - Request payload validation
    - Relational persistence
  outOfScope:
    - Authentication and authorization
    - Real-time updates
  assumptions:
    - A single PostgreSQL instance is available
  externalDependencies:
    - PostgreSQL 15+
techStack:
  - id: tech-node
    name: Node.js
    version: "20"
    layer: backend
    rationale: Lightweight, ubiquitous runtime for small HTTP services.
  - id: tech-postgres
    name: PostgreSQL
    version: "15"
    layer: database
    rationale: Durable relational store with strong consistency guarantees.
folderStructures:
  - id: fs-service
    scope: service
    description: Top-level layout of the HTTP service.
    content: |-
      src/
        routes/todos.ts
        db/todos.ts
        validation/todo.ts
        server.ts
acceptanceCriteria:
  - id: spec-ac-1
    given: the service is running
    when: a client exercises the documented endpoints
    then: each endpoint behaves per its requirement's acceptance criteria
    order: 1
nonFunctionalRequirements:
  - id: nfr-latency
    description: Read endpoints respond quickly under nominal load.
    category: performance
    metric: p95 latency for GET /todos
    target: < 100ms at 50 rps
    measurementMethod: Load test with k6 against a staging instance
guardrails:
  - id: gr-no-pii
    description: Todo content must not be used to store secrets or personal data.
    category: regulatory
    rationale: The service has no encryption-at-rest or access controls.
    consequence: Storing sensitive data would create an uncontrolled data-exposure risk.
    scope: spec
epics:
  - id: ep-core
    specificationId: spec-todo-api
    title: Core todo endpoints
    description: Implement the create, list, complete, and delete endpoints with
      persistence.
    objective: Deliver a working todo CRUD API backed by PostgreSQL.
    order: 0
    category: functional
    tickets:
      - id: tkt-create
        epicId: ep-core
        ticketNumber: 1
        title: Implement POST /todos
        description: Add the create-todo route with validation and persistence.
        ticketType: implementation
        complexity: medium
        estimatedMinutes: 90
        order: 0
        acceptanceCriteria:
          - id: ac-tkt-create
            given: a valid payload
            when: POST /todos is called
            then: a 201 is returned with the persisted todo
            order: 1
        implementationSteps:
          - id: step-1
            text: Define the todo validation schema
            order: 1
          - id: step-2
            text: Add the POST /todos route handler
            order: 2
          - id: step-3
            text: Insert the todo via the data layer
            order: 3
        filesToBeCreated:
          - src/routes/todos.ts
          - src/validation/todo.ts
        filesToBeModified:
          - src/server.ts
        filesToBeDeleted: []
        filesToBeReferenced:
          - src/db/todos.ts
        testSpecification:
          testTypes:
            - unit
            - integration
          qualityGates:
            - All new code paths covered by tests
          testCommands:
            - npm test
          coverageTarget: 80
        guardrails:
          - Reject payloads larger than 8KB
        codeReferences:
          - filePath: src/db/todos.ts
            symbol: insertTodo
            description: Existing insert helper to reuse
        typeReferences:
          - filePath: src/types/todo.ts
            typeName: Todo
            description: Shared todo type
        blueprintReferences:
          - blueprintId: bp-todo-flow
            context: Create path
        dependencies: []
      - id: tkt-list
        epicId: ep-core
        ticketNumber: 2
        title: Implement GET /todos
        description: Add the list-todos route returning todos in creation order.
        ticketType: implementation
        complexity: small
        estimatedMinutes: 45
        order: 1
        acceptanceCriteria:
          - id: ac-tkt-list
            given: stored todos exist
            when: GET /todos is called
            then: a 200 is returned with todos in creation order
            order: 1
        implementationSteps:
          - id: step-1
            text: Add the GET /todos route handler
            order: 1
          - id: step-2
            text: Query todos ordered by createdAt
            order: 2
        filesToBeCreated: []
        filesToBeModified:
          - src/routes/todos.ts
        filesToBeDeleted: []
        filesToBeReferenced:
          - src/db/todos.ts
        testSpecification:
          testTypes:
            - unit
            - integration
          qualityGates:
            - List ordering verified by a test
          testCommands:
            - npm test
          coverageTarget: 80
        guardrails: []
        codeReferences:
          - filePath: src/db/todos.ts
            symbol: listTodos
        typeReferences:
          - filePath: src/types/todo.ts
            typeName: Todo
        blueprintReferences: []
        dependencies:
          - ticketId: tkt-create
            type: requires
blueprints:
  - id: bp-todo-flow
    title: Todo request flow
    description: Sequence of a create-todo request from route to database.
    category: sequence
    format: mermaid
    coverageType: all
    content: |-
      sequenceDiagram
        Client->>API: POST /todos
        API->>DB: insertTodo()
        DB-->>API: row
        API-->>Client: 201 Created
    order: 0`;

export const TOON_EXAMPLE = `schemaVersion: "1.1"
id: spec-todo-api
projectId: proj-todo
title: Todo API
description: "A small REST API for creating, listing, completing, and deleting todo items."
status: planning
background: "Teams need a minimal, dependency-light service to track todo items behind a stable HTTP contract."
goals[3]:
  - id: goal-crud
    title: Offer full todo lifecycle
    description: "Support creating, listing, completing, and deleting todo items over HTTP."
    type: user
    successCriteria[2]: "A todo can be created, completed, and deleted via the API",Listing returns todos in a stable order
  - id: goal-durable
    title: Persist todos durably
    description: Store todos in a relational database so they survive restarts.
    type: technical
    successCriteria[1]: No todo is lost across a service restart
  - id: goal-contract
    title: Maintain a versioned contract
    description: "Expose a documented, backward-compatible REST contract."
    type: business
    successCriteria[1]: Breaking changes are gated behind a new API version
requirements[3]:
  - id: req-create
    title: Create a todo
    description: Clients can create a todo with a title and optional notes.
    type: functional
    acceptanceCriteria[1]{id,given,when,then,order}:
      ac-create,a valid todo payload,the client POSTs to /todos,the todo is persisted and returned with a generated id and createdAt,1
  - id: req-complete
    title: Complete a todo
    description: Clients can mark an existing todo as completed.
    type: functional
    acceptanceCriteria[1]{id,given,when,then,order}:
      ac-complete,an existing open todo,"the client PATCHes /todos/{id} with completed=true",the todo is marked completed and the updated record is returned,1
  - id: req-validate
    title: Validate input
    description: Reject malformed payloads with a descriptive error.
    type: business-rule
    acceptanceCriteria[1]{id,given,when,then,order}:
      ac-validate,a todo payload without a title,the client POSTs to /todos,the request fails with a 400 and a field-level error,1
architecture: "A stateless Node.js HTTP service exposing a REST API, backed by PostgreSQL for persistence. Requests are validated at the edge before reaching the data layer."
scope:
  inScope[3]: "Todo create, list, complete, and delete",Request payload validation,Relational persistence
  outOfScope[2]: Authentication and authorization,Real-time updates
  assumptions[1]: A single PostgreSQL instance is available
  externalDependencies[1]: PostgreSQL 15+
techStack[2]{id,name,version,layer,rationale}:
  tech-node,Node.js,"20",backend,"Lightweight, ubiquitous runtime for small HTTP services."
  tech-postgres,PostgreSQL,"15",database,Durable relational store with strong consistency guarantees.
folderStructures[1]{id,scope,description,content}:
  fs-service,service,Top-level layout of the HTTP service.,"src/\\n  routes/todos.ts\\n  db/todos.ts\\n  validation/todo.ts\\n  server.ts"
acceptanceCriteria[1]{id,given,when,then,order}:
  spec-ac-1,the service is running,a client exercises the documented endpoints,each endpoint behaves per its requirement's acceptance criteria,1
nonFunctionalRequirements[1]{id,description,category,metric,target,measurementMethod}:
  nfr-latency,Read endpoints respond quickly under nominal load.,performance,p95 latency for GET /todos,< 100ms at 50 rps,Load test with k6 against a staging instance
guardrails[1]{id,description,category,rationale,consequence,scope}:
  gr-no-pii,Todo content must not be used to store secrets or personal data.,regulatory,The service has no encryption-at-rest or access controls.,Storing sensitive data would create an uncontrolled data-exposure risk.,spec
epics[1]:
  - id: ep-core
    specificationId: spec-todo-api
    title: Core todo endpoints
    description: "Implement the create, list, complete, and delete endpoints with persistence."
    objective: Deliver a working todo CRUD API backed by PostgreSQL.
    order: 0
    category: functional
    tickets[2]:
      - id: tkt-create
        epicId: ep-core
        ticketNumber: 1
        title: Implement POST /todos
        description: Add the create-todo route with validation and persistence.
        ticketType: implementation
        complexity: medium
        estimatedMinutes: 90
        order: 0
        acceptanceCriteria[1]{id,given,when,then,order}:
          ac-tkt-create,a valid payload,POST /todos is called,a 201 is returned with the persisted todo,1
        implementationSteps[3]{id,text,order}:
          step-1,Define the todo validation schema,1
          step-2,Add the POST /todos route handler,2
          step-3,Insert the todo via the data layer,3
        filesToBeCreated[2]: src/routes/todos.ts,src/validation/todo.ts
        filesToBeModified[1]: src/server.ts
        filesToBeDeleted[0]:
        filesToBeReferenced[1]: src/db/todos.ts
        testSpecification:
          testTypes[2]: unit,integration
          qualityGates[1]: All new code paths covered by tests
          testCommands[1]: npm test
          coverageTarget: 80
        guardrails[1]: Reject payloads larger than 8KB
        codeReferences[1]{filePath,symbol,description}:
          src/db/todos.ts,insertTodo,Existing insert helper to reuse
        typeReferences[1]{filePath,typeName,description}:
          src/types/todo.ts,Todo,Shared todo type
        blueprintReferences[1]{blueprintId,context}:
          bp-todo-flow,Create path
        dependencies[0]:
      - id: tkt-list
        epicId: ep-core
        ticketNumber: 2
        title: Implement GET /todos
        description: Add the list-todos route returning todos in creation order.
        ticketType: implementation
        complexity: small
        estimatedMinutes: 45
        order: 1
        acceptanceCriteria[1]{id,given,when,then,order}:
          ac-tkt-list,stored todos exist,GET /todos is called,a 200 is returned with todos in creation order,1
        implementationSteps[2]{id,text,order}:
          step-1,Add the GET /todos route handler,1
          step-2,Query todos ordered by createdAt,2
        filesToBeCreated[0]:
        filesToBeModified[1]: src/routes/todos.ts
        filesToBeDeleted[0]:
        filesToBeReferenced[1]: src/db/todos.ts
        testSpecification:
          testTypes[2]: unit,integration
          qualityGates[1]: List ordering verified by a test
          testCommands[1]: npm test
          coverageTarget: 80
        guardrails[0]:
        codeReferences[1]{filePath,symbol}:
          src/db/todos.ts,listTodos
        typeReferences[1]{filePath,typeName}:
          src/types/todo.ts,Todo
        blueprintReferences[0]:
        dependencies[1]{ticketId,type}:
          tkt-create,requires
blueprints[1]{id,title,description,category,format,coverageType,content,order}:
  bp-todo-flow,Todo request flow,Sequence of a create-todo request from route to database.,sequence,mermaid,all,"sequenceDiagram\\n  Client->>API: POST /todos\\n  API->>DB: insertTodo()\\n  DB-->>API: row\\n  API-->>Client: 201 Created",0`;
