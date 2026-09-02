/// <mls fileReference="_102047_/l1/controleChamados/layer_2_application/usecases/deleteTicket.defs.ts" enhancement="_blank"/>

export const deleteTicketUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "deleteTicket",
  "moduleName": "controleChamados",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "deleteTicket",
    "ports": [
      "Ticket"
    ],
    "rulesApplied": [],
    "functions": [
      {
        "functionName": "deleteTicket",
        "inputTypeName": "DeleteTicketInput",
        "outputTypeName": "DeleteTicketOutput",
        "input": [
          {
            "name": "ticketId",
            "type": "string",
            "required": true,
            "description": "Stable identifier of the ticket to delete.",
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
        "transactional": true,
        "steps": [
          "Resolve the Ticket port and load the ticket by ticketId.",
          "If the ticket does not exist, propagate the repository not-found error.",
          "Capture ticketId, title, description, and status from the loaded ticket.",
          "Delete the ticket through the Ticket port within the transaction.",
          "Return the captured deleted-ticket fields using the canonical output shape."
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

export default deleteTicketUsecase;

export const pipeline = [
  {
    "id": "deleteTicket__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102047_/l1/controleChamados/layer_2_application/usecases/deleteTicket.ts",
    "defPath": "_102047_/l1/controleChamados/layer_2_application/usecases/deleteTicket.defs.ts",
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
