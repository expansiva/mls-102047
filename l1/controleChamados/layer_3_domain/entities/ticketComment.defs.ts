/// <mls fileReference="_102047_/l1/controleChamados/layer_3_domain/entities/ticketComment.defs.ts" enhancement="_blank"/>

export const ticketCommentDomainEntity = {
  "schemaVersion": "2026-06-26",
  "artifactType": "domainEntity",
  "artifactId": "TicketComment",
  "moduleName": "controleChamados",
  "status": "draft",
  "source": {
    "agentName": "agentCbDomainEntity",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "TicketComment",
    "title": "Comentário do chamado",
    "fields": [
      {
        "fieldId": "ticketCommentId",
        "title": "Identificador do comentário",
        "type": "uuid",
        "required": true,
        "description": "Identificador estável do comentário, usado para referenciá-lo no histórico do chamado.",
        "constraints": [
          {
            "constraintId": "uniqueTicketCommentId",
            "kind": "unique",
            "value": "true",
            "description": "Cada comentário possui um identificador estável e exclusivo.",
            "source": "inferred"
          }
        ]
      },
      {
        "fieldId": "ticketId",
        "title": "Chamado",
        "type": "uuid",
        "required": true,
        "description": "Chamado selecionado ao qual este comentário pertence e em cujo histórico será exibido.",
        "constraints": []
      },
      {
        "fieldId": "commentText",
        "title": "Comentário",
        "type": "text",
        "required": true,
        "description": "Atualização do atendimento registrada pelo atendente no histórico do chamado.",
        "constraints": [
          {
            "constraintId": "commentTextMinLength",
            "kind": "minLength",
            "value": "1",
            "description": "O comentário deve conter uma atualização escrita pelo atendente.",
            "source": "journey"
          }
        ]
      }
    ],
    "valueObjects": [],
    "statusEnum": [],
    "invariants": [
      "ticketCommentId must be unique and stable.",
      "commentText must contain at least 1 character.",
      "A comment may be added only to a ticket whose status is open."
    ]
  }
} as const;

export default ticketCommentDomainEntity;

export const pipeline = [
  {
    "id": "ticketComment__domainEntity",
    "type": "domainEntity",
    "outputPath": "_102047_/l1/controleChamados/layer_3_domain/entities/ticketComment.ts",
    "defPath": "_102047_/l1/controleChamados/layer_3_domain/entities/ticketComment.defs.ts",
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
