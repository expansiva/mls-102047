/// <mls fileReference="_102047_/l1/controleChamados/layer_2_application/usecases/getTicket.defs.ts" enhancement="_blank"/>

export const getTicketUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "getTicket",
  "moduleName": "controleChamados",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "getTicket",
    "ports": [
      "Ticket"
    ],
    "rulesApplied": [],
    "functions": [
      {
        "functionName": "getTicket",
        "inputTypeName": "GetTicketInput",
        "outputTypeName": "GetTicketOutput",
        "input": [
          {
            "name": "ticketId",
            "type": "string",
            "required": true,
            "description": "Stable identifier of the ticket, used to retrieve it and link it to comments and service workflows.",
            "ofEntity": "Ticket",
            "fieldRef": "Ticket.ticketId",
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
        "transactional": false,
        "steps": [
          "Resolve the selected ticketId from the request.",
          "Load the Ticket aggregate through the Ticket port using ticketId.",
          "Return ticketId, title, description, and status from the loaded Ticket.",
          "If no Ticket is found, return the repository/domain not-found error."
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

export default getTicketUsecase;

export const pipeline = [
  {
    "id": "getTicket__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102047_/l1/controleChamados/layer_2_application/usecases/getTicket.ts",
    "defPath": "_102047_/l1/controleChamados/layer_2_application/usecases/getTicket.defs.ts",
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
