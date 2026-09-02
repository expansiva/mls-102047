/// <mls fileReference="_102047_/l1/controleChamados/layer_3_domain/entities/ticket.defs.ts" enhancement="_blank"/>

export const ticketDomainEntity = {
  "schemaVersion": "2026-06-26",
  "artifactType": "domainEntity",
  "artifactId": "Ticket",
  "moduleName": "controleChamados",
  "status": "draft",
  "source": {
    "agentName": "agentCbDomainEntity",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "Ticket",
    "title": "Chamado",
    "fields": [
      {
        "fieldId": "ticketId",
        "title": "Identificador do chamado",
        "type": "uuid",
        "required": true,
        "description": "Identificador estável do chamado, usado para vinculá-lo aos comentários e aos fluxos de atendimento.",
        "constraints": [
          {
            "constraintId": "uniqueTicketId",
            "kind": "unique",
            "value": "true",
            "description": "Cada chamado possui um identificador estável e exclusivo.",
            "source": "inferred"
          }
        ]
      },
      {
        "fieldId": "title",
        "title": "Título",
        "type": "string",
        "required": true,
        "description": "Título que identifica resumidamente a solicitação de atendimento.",
        "constraints": []
      },
      {
        "fieldId": "description",
        "title": "Descrição",
        "type": "text",
        "required": true,
        "description": "Descrição detalhada da solicitação de atendimento registrada no chamado.",
        "constraints": []
      },
      {
        "fieldId": "status",
        "title": "Status",
        "type": "string",
        "required": true,
        "description": "Situação atual do chamado durante o atendimento.",
        "constraints": [
          {
            "constraintId": "ticketStatusEnum",
            "kind": "enum",
            "value": "[\"open\",\"closed\"]",
            "description": "Estados permitidos para o ciclo de vida do chamado.",
            "source": "journey"
          }
        ],
        "enum": [
          "open",
          "closed"
        ]
      }
    ],
    "valueObjects": [],
    "statusEnum": [
      "open",
      "closed"
    ],
    "lifecycle": {
      "workflowId": "ticketLifecycle",
      "entityRef": "Ticket",
      "states": [
        "closed",
        "open"
      ],
      "initialState": "open",
      "terminalStates": [
        "closed"
      ],
      "allowed": {
        "closed": [],
        "open": [
          "closed"
        ]
      }
    },
    "invariants": [
      "ticketId must be unique and stable for each ticket.",
      "A ticket's status must be either open or closed.",
      "A ticket can only be closed when its current status is open.",
      "A closed ticket cannot be reopened; its status cannot change back to open.",
      "Only a ticket with status open can receive comments."
    ]
  }
} as const;

export default ticketDomainEntity;

export const pipeline = [
  {
    "id": "ticket__domainEntity",
    "type": "domainEntity",
    "outputPath": "_102047_/l1/controleChamados/layer_3_domain/entities/ticket.ts",
    "defPath": "_102047_/l1/controleChamados/layer_3_domain/entities/ticket.defs.ts",
    "dependsFiles": [],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/domainEntity.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
