/// <mls fileReference="_102047_/l1/reembolsoDespesas/layer_1_external/adapters/persistence/seeds.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "persistenceSeeds",
  "artifactId": "seeds",
  "moduleName": "reembolsoDespesas",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/reembolsoDespesas/layer_1_external/adapters/persistence/despesa.defs.ts"
  ],
  "data": {
    "seedId": "seeds",
    "phase": "plan",
    "scenarios": [
      {
        "scenarioId": "analisarDecidirDespesa",
        "tableId": "despesa",
        "source": "journey:analisarDecidirDespesa",
        "constraints": [
          "ref:colaboradorId:Colaborador"
        ],
        "refs": [
          {
            "field": "colaboradorId",
            "relationshipId": "expenseCollaborator",
            "entityId": "Colaborador"
          }
        ],
        "states": [],
        "entityId": "Despesa",
        "stateField": "status"
      },
      {
        "scenarioId": "consultarDespesasAprovadas",
        "tableId": "despesa",
        "source": "journey:consultarDespesasAprovadas",
        "constraints": [
          "ref:colaboradorId:Colaborador"
        ],
        "refs": [
          {
            "field": "colaboradorId",
            "relationshipId": "expenseCollaborator",
            "entityId": "Colaborador"
          }
        ],
        "states": [],
        "entityId": "Despesa",
        "stateField": "status"
      },
      {
        "scenarioId": "consultarMinhasDespesas",
        "tableId": "despesa",
        "source": "journey:consultarMinhasDespesas",
        "constraints": [
          "ref:colaboradorId:Colaborador"
        ],
        "refs": [
          {
            "field": "colaboradorId",
            "relationshipId": "expenseCollaborator",
            "entityId": "Colaborador"
          }
        ],
        "states": [],
        "entityId": "Despesa",
        "stateField": "status"
      },
      {
        "scenarioId": "corrigirReenviarDespesa",
        "tableId": "despesa",
        "source": "journey:corrigirReenviarDespesa",
        "constraints": [
          "ref:colaboradorId:Colaborador"
        ],
        "refs": [
          {
            "field": "colaboradorId",
            "relationshipId": "expenseCollaborator",
            "entityId": "Colaborador"
          }
        ],
        "states": [],
        "entityId": "Despesa",
        "stateField": "status"
      },
      {
        "scenarioId": "registrarEnviarDespesa",
        "tableId": "despesa",
        "source": "journey:registrarEnviarDespesa",
        "constraints": [
          "ref:colaboradorId:Colaborador",
          "state:draft"
        ],
        "refs": [
          {
            "field": "colaboradorId",
            "relationshipId": "expenseCollaborator",
            "entityId": "Colaborador"
          }
        ],
        "states": [
          "draft"
        ],
        "entityId": "Despesa",
        "stateField": "status"
      },
      {
        "scenarioId": "registrarPagamentoDespesa",
        "tableId": "despesa",
        "source": "journey:registrarPagamentoDespesa",
        "constraints": [
          "ref:colaboradorId:Colaborador",
          "state:paid"
        ],
        "refs": [
          {
            "field": "colaboradorId",
            "relationshipId": "expenseCollaborator",
            "entityId": "Colaborador"
          }
        ],
        "states": [
          "paid"
        ],
        "entityId": "Despesa",
        "stateField": "status"
      }
    ],
    "dependencies": [
      {
        "entityId": "Colaborador",
        "kind": "mdm",
        "seeded": false
      },
      {
        "entityId": "Despesa",
        "kind": "module",
        "seeded": false
      },
      {
        "entityId": "GestorEquipe",
        "kind": "mdm",
        "seeded": false
      }
    ],
    "datasets": [
      {
        "datasetId": "despesa",
        "tableId": "despesa",
        "owners": [
          "analisarDecidirDespesa",
          "consultarDespesasAprovadas",
          "consultarMinhasDespesas",
          "corrigirReenviarDespesa",
          "registrarEnviarDespesa",
          "registrarPagamentoDespesa"
        ]
      }
    ],
    "fixture": {
      "schemaVersion": "2026-09-27-m1-certification-fixture-v1",
      "phase": "plan",
      "targets": [
        "memory",
        "development"
      ],
      "datasets": [
        {
          "supportId": "data:Despesa",
          "entityId": "Despesa",
          "tableId": "despesa",
          "dependsOn": [],
          "sourceRefs": [
            "grant:colaboradorGerenciaPropriasDespesas",
            "grant:financeiroConsultaEpagaDespesasAprovadas",
            "grant:gestorAnalisaDespesasDaEquipe",
            "journey:analisarDecidirDespesa/analisarDespesa",
            "journey:analisarDecidirDespesa/decidirDespesa",
            "journey:analisarDecidirDespesa/localizarDespesasPendentes",
            "journey:consultarDespesasAprovadas/consultarDespesaAprovada",
            "journey:consultarDespesasAprovadas/localizarDespesasAprovadas",
            "journey:consultarMinhasDespesas/consultarDespesa",
            "journey:consultarMinhasDespesas/localizarMinhasDespesas",
            "journey:corrigirReenviarDespesa/consultarMotivoRejeicao",
            "journey:corrigirReenviarDespesa/corrigirDespesa",
            "journey:corrigirReenviarDespesa/localizarDespesaRejeitada",
            "journey:corrigirReenviarDespesa/reenviarDespesa",
            "journey:registrarEnviarDespesa/enviarParaAprovacao",
            "journey:registrarEnviarDespesa/registrarDespesa",
            "journey:registrarPagamentoDespesa/localizarDespesaAprovada",
            "journey:registrarPagamentoDespesa/registrarDataPagamento",
            "ontology:Despesa/lifecycleStates/approved",
            "ontology:Despesa/lifecycleStates/awaitingApproval",
            "ontology:Despesa/lifecycleStates/draft",
            "ontology:Despesa/lifecycleStates/rejected",
            "relationship:Colaborador/expenseCollaborator",
            "relationship:Despesa/expenseCollaborator"
          ]
        }
      ],
      "runtime": [
        {
          "supportId": "identity:colaborador",
          "kind": "identity",
          "entityId": "Colaborador",
          "actorRefs": [
            "colaborador"
          ],
          "gap": "RUNTIME_TEST_IDENTITY_UNREFERENCED: no verified runtime capability provisions an authenticated test identity for colaborador bound to Colaborador",
          "owner": "runtime"
        },
        {
          "supportId": "identity:financeiro",
          "kind": "identity",
          "entityId": "",
          "actorRefs": [
            "financeiro"
          ],
          "gap": "PERSON_ENTITY_UNDECLARED: actor financeiro declares no personEntity; the test identity cannot be bound",
          "owner": "runtime"
        },
        {
          "supportId": "identity:gestorEquipe",
          "kind": "identity",
          "entityId": "GestorEquipe",
          "actorRefs": [
            "gestorEquipe"
          ],
          "gap": "RUNTIME_TEST_IDENTITY_UNREFERENCED: no verified runtime capability provisions an authenticated test identity for gestorEquipe bound to GestorEquipe",
          "owner": "runtime"
        }
      ],
      "gaps": []
    }
  }
} as const;

export default definition;
