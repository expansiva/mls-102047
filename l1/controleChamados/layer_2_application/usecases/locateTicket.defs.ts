/// <mls fileReference="_102047_/l1/controleChamados/layer_2_application/usecases/locateTicket.defs.ts" enhancement="_blank"/>

export const locateTicketUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "locateTicket",
  "moduleName": "controleChamados",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "locateTicket",
    "ports": [
      "Ticket"
    ],
    "rulesApplied": [],
    "functions": [
      {
        "functionName": "locateTicket",
        "inputTypeName": "LocateTicketInput",
        "outputTypeName": "LocateTicketOutput",
        "input": [],
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
          "Query the Ticket port for the open ticket.",
          "Return the selected ticket projection with ticketId, title, description, and status.",
          "If no open ticket exists, return an empty collection."
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

export default locateTicketUsecase;

export const pipeline = [
  {
    "id": "locateTicket__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102047_/l1/controleChamados/layer_2_application/usecases/locateTicket.ts",
    "defPath": "_102047_/l1/controleChamados/layer_2_application/usecases/locateTicket.defs.ts",
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
