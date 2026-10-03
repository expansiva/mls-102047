/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_3_domain/entities/despesa.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "domainEntity",
  "artifactId": "Despesa",
  "moduleName": "reembolsoDespesas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/reembolsoDespesas/layer_3_domain/entities/colaborador.defs.ts"
  ],
  "data": {
    "entityId": "Despesa",
    "storageTarget": "moduleDatabase",
    "fields": [
      {
        "name": "id",
        "type": "uuid",
        "derived": true
      },
      {
        "name": "version",
        "type": "integer",
        "derived": true
      },
      {
        "name": "colaboradorId",
        "type": "record",
        "ref": "Colaborador"
      },
      {
        "name": "status",
        "type": "enum"
      },
      {
        "name": "details",
        "type": "object"
      },
      {
        "name": "details.dataDespesa",
        "type": "date"
      },
      {
        "name": "details.categoria",
        "type": "string"
      },
      {
        "name": "details.valor",
        "type": "money"
      },
      {
        "name": "details.descricao",
        "type": "text"
      },
      {
        "name": "details.motivoRejeicao",
        "type": "text"
      },
      {
        "name": "details.reenvioRealizado",
        "type": "boolean"
      },
      {
        "name": "details.dataPagamento",
        "type": "date"
      }
    ],
    "lifecycle": {
      "states": [
        {
          "state": "draft",
          "reachedBy": "actor"
        },
        {
          "state": "awaitingApproval",
          "reachedBy": "actor"
        },
        {
          "state": "rejected",
          "reachedBy": "actor"
        },
        {
          "state": "approved",
          "reachedBy": "actor"
        },
        {
          "state": "paid",
          "reachedBy": "actor"
        }
      ],
      "transitions": [
        {
          "transitionId": "enviarParaAprovacao",
          "from": [
            "draft"
          ],
          "to": "awaitingApproval",
          "by": [
            "colaborador"
          ],
          "ruleRefs": [
            "proofRequiredBeforeSubmission",
            "expenseOwnerOnly",
            "validExpenseData"
          ]
        },
        {
          "transitionId": "reenviarParaAprovacao",
          "from": [
            "rejected"
          ],
          "to": "awaitingApproval",
          "by": [
            "colaborador"
          ],
          "ruleRefs": [
            "expenseOwnerOnly",
            "singleResubmission",
            "proofRequiredBeforeSubmission",
            "validExpenseData"
          ]
        },
        {
          "transitionId": "aprovarDespesa",
          "from": [
            "awaitingApproval"
          ],
          "to": "approved",
          "by": [
            "gestorEquipe"
          ],
          "ruleRefs": [
            "managerTeamExpenseAccess"
          ]
        },
        {
          "transitionId": "rejeitarDespesa",
          "from": [
            "awaitingApproval"
          ],
          "to": "rejected",
          "by": [
            "gestorEquipe"
          ],
          "ruleRefs": [
            "managerTeamExpenseAccess",
            "rejectionReasonRequired"
          ]
        },
        {
          "transitionId": "registrarPagamento",
          "from": [
            "approved"
          ],
          "to": "paid",
          "by": [
            "financeiro"
          ],
          "ruleRefs": [
            "financeApprovedExpenseAccess",
            "paymentDateRequired"
          ]
        }
      ]
    },
    "invariants": [],
    "imports": []
  }
} as const;

export default definition;
