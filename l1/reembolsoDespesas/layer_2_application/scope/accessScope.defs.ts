/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_2_application/scope/accessScope.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "accessScope",
  "artifactId": "accessScope",
  "moduleName": "reembolsoDespesas",
  "status": "pending",
  "dependencies": [],
  "data": {
    "scopeId": "accessScope",
    "grants": [
      {
        "grantId": "colaboradorGerenciaPropriasDespesas",
        "actorRef": "colaborador",
        "anchorEntity": "Colaborador",
        "entityRefs": [
          "Despesa"
        ],
        "disclosure": "fullRecord",
        "scopeMode": "own",
        "session": "verified",
        "path": [
          {
            "entityId": "Despesa",
            "steps": [
              {
                "relationshipId": "expenseCollaborator",
                "from": "Despesa",
                "to": "Colaborador",
                "field": "Despesa.colaboradorId"
              }
            ],
            "pending": ""
          }
        ],
        "pending": ""
      },
      {
        "grantId": "financeiroConsultaEpagaDespesasAprovadas",
        "actorRef": "financeiro",
        "anchorEntity": "Colaborador",
        "entityRefs": [
          "Despesa"
        ],
        "disclosure": "fieldsOnly",
        "allowedFields": [
          "Despesa.id",
          "Despesa.colaboradorId",
          "Despesa.status",
          "Despesa.details.dataDespesa",
          "Despesa.details.categoria",
          "Despesa.details.valor",
          "Despesa.details.descricao",
          "Despesa.details.dataPagamento"
        ],
        "scopeMode": "related",
        "session": "verified",
        "path": [
          {
            "entityId": "Despesa",
            "steps": [
              {
                "relationshipId": "expenseCollaborator",
                "from": "Despesa",
                "to": "Colaborador",
                "field": "Despesa.colaboradorId"
              }
            ],
            "pending": ""
          }
        ],
        "pending": ""
      },
      {
        "grantId": "gestorAnalisaDespesasDaEquipe",
        "actorRef": "gestorEquipe",
        "anchorEntity": "Colaborador",
        "entityRefs": [
          "Despesa",
          "Colaborador"
        ],
        "disclosure": "fieldsOnly",
        "allowedFields": [
          "Despesa.id",
          "Despesa.colaboradorId",
          "Despesa.status",
          "Despesa.details.dataDespesa",
          "Despesa.details.categoria",
          "Despesa.details.valor",
          "Despesa.details.descricao",
          "Despesa.details.motivoRejeicao",
          "Despesa.details.reenvioRealizado",
          "Colaborador.id",
          "Colaborador.details.identification",
          "Colaborador.details.base"
        ],
        "scopeMode": "related",
        "session": "verified",
        "path": [
          {
            "entityId": "Despesa",
            "steps": [
              {
                "relationshipId": "expenseCollaborator",
                "from": "Despesa",
                "to": "Colaborador",
                "field": "Despesa.colaboradorId"
              }
            ],
            "pending": ""
          },
          {
            "entityId": "Colaborador",
            "steps": [],
            "pending": ""
          }
        ],
        "pending": ""
      }
    ]
  }
} as const;

export default definition;
