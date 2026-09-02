/// <mls fileReference="_102047_/l1/controleChamados/layer_2_application/usecases/decideClosure.defs.ts" enhancement="_blank"/>

export const decideClosureUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "decideClosure",
  "moduleName": "controleChamados",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "decideClosure",
    "ports": [
      "Ticket"
    ],
    "rulesApplied": [
      "onlyOpenTicketCanBeClosed"
    ],
    "functions": [
      {
        "functionName": "decideClosure",
        "inputTypeName": "DecideClosureInput",
        "outputTypeName": "DecideClosureOutput",
        "input": [
          {
            "name": "ticketId",
            "type": "string",
            "required": true,
            "description": "Chamado",
            "ofEntity": "Ticket",
            "fieldRef": "Ticket.ticketId",
            "item": {
              "fields": []
            }
          },
          {
            "name": "status",
            "type": "string",
            "required": true,
            "description": "Decisão tomada.",
            "ofEntity": "Ticket",
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
        "rulesApplied": [
          "onlyOpenTicketCanBeClosed"
        ],
        "transactional": true,
        "steps": [
          "Load the Ticket aggregate by ticketId through the Ticket port.",
          "Validate the requested status is closed; field enum constraint requires rejecting other values.",
          "Apply rule onlyOpenTicketCanBeClosed: reject with rule id in error details unless the current ticket status is open.",
          "Call the Ticket domain canTransition helper using the lifecycle matrix, which permits open to closed and treats closed as terminal.",
          "Set the Ticket status to closed and save the parent Ticket aggregate through the Ticket port inside the transaction.",
          "Return the canonical Ticket output shape: ticketId, title, description, and status."
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

export default decideClosureUsecase;

export const pipeline = [
  {
    "id": "decideClosure__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102047_/l1/controleChamados/layer_2_application/usecases/decideClosure.ts",
    "defPath": "_102047_/l1/controleChamados/layer_2_application/usecases/decideClosure.defs.ts",
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
    "rulesApplied": [
      "onlyOpenTicketCanBeClosed"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
