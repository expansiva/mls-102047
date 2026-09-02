/// <mls fileReference="_102047_/l1/controleChamados/layer_2_application/usecases/createTicket.defs.ts" enhancement="_blank"/>

export const createTicketUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "createTicket",
  "moduleName": "controleChamados",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "createTicket",
    "ports": [
      "Ticket"
    ],
    "rulesApplied": [],
    "functions": [
      {
        "functionName": "createTicket",
        "inputTypeName": "CreateTicketInput",
        "outputTypeName": "CreateTicketOutput",
        "input": [
          {
            "name": "title",
            "type": "string",
            "required": true,
            "description": "Título que identifica resumidamente a solicitação de atendimento.",
            "ofEntity": "Ticket",
            "fieldRef": "Ticket.title",
            "item": {
              "fields": []
            }
          },
          {
            "name": "description",
            "type": "string",
            "required": true,
            "description": "Descrição detalhada da solicitação de atendimento registrada no chamado.",
            "ofEntity": "Ticket",
            "fieldRef": "Ticket.description",
            "item": {
              "fields": []
            }
          }
        ],
        "output": [
          {
            "name": "ticketId",
            "type": "string",
            "required": true,
            "ofEntity": "Ticket"
          },
          {
            "name": "title",
            "type": "string",
            "required": true,
            "ofEntity": "Ticket"
          },
          {
            "name": "description",
            "type": "string",
            "required": true,
            "ofEntity": "Ticket"
          },
          {
            "name": "status",
            "type": "string",
            "required": true,
            "ofEntity": "Ticket"
          }
        ],
        "ports": [
          "Ticket"
        ],
        "rulesApplied": [],
        "transactional": true,
        "steps": [
          "Resolve the initial status as the Ticket lifecycle initial state, open, using the system default rather than client input.",
          "Validate the required title and description fields.",
          "Generate the ticketId with the platform id generator and construct a Ticket with status open.",
          "Persist the Ticket through the Ticket port within the transaction.",
          "Return the created ticketId, title, description, and status."
        ],
        "outputShape": {
          "kind": "object",
          "fields": [
            {
              "name": "ticketId",
              "type": "string",
              "required": true,
              "fieldRef": "Ticket.ticketId"
            },
            {
              "name": "title",
              "type": "string",
              "required": true,
              "fieldRef": "Ticket.title"
            },
            {
              "name": "description",
              "type": "string",
              "required": true,
              "fieldRef": "Ticket.description"
            },
            {
              "name": "status",
              "type": "string",
              "required": true,
              "fieldRef": "Ticket.status"
            }
          ]
        }
      }
    ],
    "mdmRefs": []
  }
} as const;

export default createTicketUsecase;

export const pipeline = [
  {
    "id": "createTicket__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102047_/l1/controleChamados/layer_2_application/usecases/createTicket.ts",
    "defPath": "_102047_/l1/controleChamados/layer_2_application/usecases/createTicket.defs.ts",
    "dependsFiles": [
      "_102047_/l1/controleChamados/layer_2_application/ports/ticketRepository.d.ts",
      "_102047_/l1/controleChamados/layer_3_domain/entities/ticket.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/applicationUsecase.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
