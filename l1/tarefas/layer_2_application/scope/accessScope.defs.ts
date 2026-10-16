/// <mls fileReference="_102047_/l1/tarefas/layer_2_application/scope/accessScope.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "accessScope",
  "artifactId": "accessScope",
  "moduleName": "tarefas",
  "status": "pending",
  "dependencies": [],
  "data": {
    "scopeId": "accessScope",
    "grants": [
      {
        "grantId": "gestorAvisosProprios",
        "actorRef": "gestor",
        "anchorEntity": "MembroEquipe",
        "entityRefs": [
          "AvisoVencimento"
        ],
        "disclosure": "fullRecord",
        "scopeMode": "own",
        "session": "verified",
        "path": [
          {
            "entityId": "AvisoVencimento",
            "steps": [
              {
                "relationshipId": "avisoResponsavel",
                "from": "AvisoVencimento",
                "to": "MembroEquipe",
                "field": "AvisoVencimento.responsavelId"
              }
            ],
            "pending": ""
          }
        ],
        "pending": ""
      },
      {
        "grantId": "gestorListas",
        "actorRef": "gestor",
        "entityRefs": [
          "Lista"
        ],
        "disclosure": "fullRecord",
        "scopeMode": "organization",
        "session": "verified",
        "path": [
          {
            "entityId": "Lista",
            "steps": [],
            "pending": ""
          }
        ],
        "pending": ""
      },
      {
        "grantId": "gestorMembros",
        "actorRef": "gestor",
        "entityRefs": [
          "MembroEquipe"
        ],
        "disclosure": "fieldsOnly",
        "allowedFields": [
          "MembroEquipe.id",
          "MembroEquipe.version",
          "MembroEquipe.details.identification",
          "MembroEquipe.details.base",
          "MembroEquipe.details.general",
          "MembroEquipe.details.tarefas"
        ],
        "scopeMode": "organization",
        "session": "verified",
        "path": [
          {
            "entityId": "MembroEquipe",
            "steps": [],
            "pending": ""
          }
        ],
        "pending": ""
      },
      {
        "grantId": "gestorTarefasEquipe",
        "actorRef": "gestor",
        "entityRefs": [
          "Tarefa",
          "ItemChecklist"
        ],
        "disclosure": "fullRecord",
        "scopeMode": "organization",
        "session": "verified",
        "path": [
          {
            "entityId": "Tarefa",
            "steps": [],
            "pending": ""
          },
          {
            "entityId": "ItemChecklist",
            "steps": [],
            "pending": ""
          }
        ],
        "pending": ""
      },
      {
        "grantId": "membroAvisosProprios",
        "actorRef": "membroEquipe",
        "anchorEntity": "MembroEquipe",
        "entityRefs": [
          "AvisoVencimento"
        ],
        "disclosure": "fullRecord",
        "scopeMode": "own",
        "session": "verified",
        "path": [
          {
            "entityId": "AvisoVencimento",
            "steps": [
              {
                "relationshipId": "avisoResponsavel",
                "from": "AvisoVencimento",
                "to": "MembroEquipe",
                "field": "AvisoVencimento.responsavelId"
              }
            ],
            "pending": ""
          }
        ],
        "pending": ""
      },
      {
        "grantId": "membroConsultaListas",
        "actorRef": "membroEquipe",
        "entityRefs": [
          "Lista"
        ],
        "disclosure": "fieldsOnly",
        "allowedFields": [
          "Lista.nome",
          "Lista.ativa",
          "Lista.details.tipo",
          "Lista.details.descricao"
        ],
        "scopeMode": "organization",
        "session": "verified",
        "path": [
          {
            "entityId": "Lista",
            "steps": [],
            "pending": ""
          }
        ],
        "pending": ""
      },
      {
        "grantId": "membroEscolheResponsavel",
        "actorRef": "membroEquipe",
        "entityRefs": [
          "MembroEquipe"
        ],
        "disclosure": "fieldsOnly",
        "allowedFields": [
          "MembroEquipe.details.identification.name",
          "MembroEquipe.details.identification.status"
        ],
        "scopeMode": "organization",
        "session": "verified",
        "path": [
          {
            "entityId": "MembroEquipe",
            "steps": [],
            "pending": ""
          }
        ],
        "pending": ""
      },
      {
        "grantId": "membroTarefasProprias",
        "actorRef": "membroEquipe",
        "anchorEntity": "MembroEquipe",
        "entityRefs": [
          "Tarefa",
          "ItemChecklist"
        ],
        "disclosure": "fullRecord",
        "scopeMode": "own",
        "session": "verified",
        "path": [
          {
            "entityId": "Tarefa",
            "steps": [
              {
                "relationshipId": "tarefaCriador",
                "from": "Tarefa",
                "to": "MembroEquipe",
                "field": "Tarefa.criadorId"
              }
            ],
            "pending": ""
          },
          {
            "entityId": "ItemChecklist",
            "steps": [
              {
                "relationshipId": "itemChecklistTarefa",
                "from": "ItemChecklist",
                "to": "Tarefa",
                "field": "ItemChecklist.tarefaId"
              },
              {
                "relationshipId": "tarefaCriador",
                "from": "Tarefa",
                "to": "MembroEquipe",
                "field": "Tarefa.criadorId"
              }
            ],
            "pending": ""
          }
        ],
        "pending": ""
      }
    ]
  }
} as const;

export default definition;
