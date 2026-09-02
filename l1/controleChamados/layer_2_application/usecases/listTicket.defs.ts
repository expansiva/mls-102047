/// <mls fileReference="_102047_/l1/controleChamados/layer_2_application/usecases/listTicket.defs.ts" enhancement="_blank"/>

export const listTicketUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "listTicket",
  "moduleName": "controleChamados",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "listTicket",
    "ports": [
      "Ticket"
    ],
    "rulesApplied": [],
    "functions": [
      {
        "functionName": "listTicket",
        "inputTypeName": "ListTicketInput",
        "outputTypeName": "ListTicketOutput",
        "input": [
          {
            "name": "search",
            "type": "string",
            "required": false,
            "description": "Search by title.",
            "fieldRef": "Ticket.title",
            "item": {
              "fields": []
            }
          },
          {
            "name": "sortBy",
            "type": "string",
            "required": false,
            "description": "Listing sort field.",
            "fieldRef": "Ticket.status",
            "item": {
              "fields": []
            }
          },
          {
            "name": "sortOrder",
            "type": "string",
            "required": false,
            "description": "Listing sort direction.",
            "fieldRef": "Ticket.status",
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
          "Load tickets through the Ticket port.",
          "Apply the optional title search filter in memory or through the repository query.",
          "Apply the requested status sort and direction; default to repository order when omitted.",
          "Return the list projection containing ticketId, title, description, and status."
        ],
        "outputShape": {
          "kind": "list",
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

export default listTicketUsecase;

export const pipeline = [
  {
    "id": "listTicket__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102047_/l1/controleChamados/layer_2_application/usecases/listTicket.ts",
    "defPath": "_102047_/l1/controleChamados/layer_2_application/usecases/listTicket.defs.ts",
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
