/// <mls fileReference="_102047_/l1/controleChamados/layer_2_application/usecases/updateTicket.defs.ts" enhancement="_blank"/>

export const updateTicketUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "updateTicket",
  "moduleName": "controleChamados",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "updateTicket",
    "ports": [
      "Ticket"
    ],
    "rulesApplied": [],
    "functions": [
      {
        "functionName": "updateTicket",
        "inputTypeName": "UpdateTicketInput",
        "outputTypeName": "UpdateTicketOutput",
        "input": [
          {
            "name": "ticketId",
            "type": "string",
            "required": true,
            "description": "Identificador estável do chamado.",
            "ofEntity": "Ticket",
            "fieldRef": "Ticket.ticketId",
            "item": {
              "fields": []
            }
          },
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
          "Load the Ticket aggregate through the Ticket port using ticketId.",
          "Update the Ticket title and description with the supplied values.",
          "Preserve the current Ticket status; this operation does not request a status transition.",
          "Save the Ticket aggregate through the Ticket port in the transaction.",
          "Return ticketId, title, description, and status from the updated Ticket."
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

export default updateTicketUsecase;

export const pipeline = [
  {
    "id": "updateTicket__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102047_/l1/controleChamados/layer_2_application/usecases/updateTicket.ts",
    "defPath": "_102047_/l1/controleChamados/layer_2_application/usecases/updateTicket.defs.ts",
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
