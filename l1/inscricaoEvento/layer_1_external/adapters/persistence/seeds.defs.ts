/// <mls fileReference="_102047_/l1/inscricaoEvento/layer_1_external/adapters/persistence/seeds.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "persistenceSeeds",
  "artifactId": "seeds",
  "moduleName": "inscricaoEvento",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/inscricaoEvento/layer_1_external/adapters/persistence/evento.defs.ts",
    "_102047_/l1/inscricaoEvento/layer_1_external/adapters/persistence/inscricao.defs.ts"
  ],
  "data": {
    "seedId": "seeds",
    "phase": "plan",
    "scenarios": [
      {
        "scenarioId": "acompanharInscritos",
        "tableId": "evento",
        "source": "journey:acompanharInscritos",
        "constraints": [],
        "refs": [],
        "states": [],
        "entityId": "Evento",
        "stateField": "status"
      },
      {
        "scenarioId": "cadastrarPublicarEvento",
        "tableId": "evento",
        "source": "journey:cadastrarPublicarEvento",
        "constraints": [
          "state:draft"
        ],
        "refs": [],
        "states": [
          "draft"
        ],
        "entityId": "Evento",
        "stateField": "status"
      },
      {
        "scenarioId": "inscreverEmEvento",
        "tableId": "evento",
        "source": "journey:inscreverEmEvento",
        "constraints": [],
        "refs": [],
        "states": [],
        "entityId": "Evento",
        "stateField": "status"
      },
      {
        "scenarioId": "acompanharInscritos",
        "tableId": "inscricao",
        "source": "journey:acompanharInscritos",
        "constraints": [
          "ref:eventoId:Evento",
          "ref:participanteId:Participante",
          "uniqueKeys:eventoId+participanteId"
        ],
        "refs": [
          {
            "field": "eventoId",
            "relationshipId": "inscricaoEvento",
            "entityId": "Evento"
          },
          {
            "field": "participanteId",
            "relationshipId": "inscricaoParticipante",
            "entityId": "Participante"
          }
        ],
        "states": [],
        "entityId": "Inscricao",
        "stateField": "status"
      },
      {
        "scenarioId": "cancelarInscricao",
        "tableId": "inscricao",
        "source": "journey:cancelarInscricao",
        "constraints": [
          "ref:eventoId:Evento",
          "ref:participanteId:Participante",
          "state:cancelled",
          "uniqueKeys:eventoId+participanteId"
        ],
        "refs": [
          {
            "field": "eventoId",
            "relationshipId": "inscricaoEvento",
            "entityId": "Evento"
          },
          {
            "field": "participanteId",
            "relationshipId": "inscricaoParticipante",
            "entityId": "Participante"
          }
        ],
        "states": [
          "cancelled"
        ],
        "entityId": "Inscricao",
        "stateField": "status"
      },
      {
        "scenarioId": "inscreverEmEvento",
        "tableId": "inscricao",
        "source": "journey:inscreverEmEvento",
        "constraints": [
          "ref:eventoId:Evento",
          "ref:participanteId:Participante",
          "state:waitlisted",
          "uniqueKeys:eventoId+participanteId"
        ],
        "refs": [
          {
            "field": "eventoId",
            "relationshipId": "inscricaoEvento",
            "entityId": "Evento"
          },
          {
            "field": "participanteId",
            "relationshipId": "inscricaoParticipante",
            "entityId": "Participante"
          }
        ],
        "states": [
          "waitlisted"
        ],
        "entityId": "Inscricao",
        "stateField": "status"
      }
    ],
    "dependencies": [
      {
        "entityId": "EmailParticipante",
        "kind": "mdm",
        "seeded": false
      },
      {
        "entityId": "Evento",
        "kind": "module",
        "seeded": false
      },
      {
        "entityId": "Inscricao",
        "kind": "module",
        "seeded": false
      },
      {
        "entityId": "Participante",
        "kind": "mdm",
        "seeded": false
      }
    ],
    "datasets": [
      {
        "datasetId": "evento",
        "tableId": "evento",
        "owners": [
          "acompanharInscritos",
          "cadastrarPublicarEvento",
          "inscreverEmEvento"
        ]
      },
      {
        "datasetId": "inscricao",
        "tableId": "inscricao",
        "owners": [
          "acompanharInscritos",
          "cancelarInscricao",
          "inscreverEmEvento"
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
          "supportId": "data:Evento",
          "entityId": "Evento",
          "tableId": "evento",
          "dependsOn": [],
          "sourceRefs": [
            "grant:organizadorEventos",
            "grant:publicoMinhasInscricoes",
            "journey:acompanharInscritos/baixarCsv",
            "journey:acompanharInscritos/localizarEventoOrg",
            "journey:acompanharInscritos/verInscritos",
            "journey:acompanharInscritos/verOcupacao",
            "journey:cadastrarPublicarEvento/criarEvento",
            "journey:cadastrarPublicarEvento/publicarEvento",
            "journey:cadastrarPublicarEvento/revisarEvento",
            "journey:cancelarInscricao/cancelar",
            "journey:cancelarInscricao/localizarInscricao",
            "journey:cancelarInscricao/verInscricao",
            "journey:inscreverEmEvento/criarInscricao",
            "journey:inscreverEmEvento/localizarEvento",
            "journey:inscreverEmEvento/verEvento",
            "ontology:Evento/lifecycleStates/draft",
            "relationship:Evento/eventosDoParticipante",
            "relationship:Evento/inscricaoEvento",
            "relationship:Inscricao/inscricaoEvento",
            "relationship:Inscricao/inscricaoParticipante",
            "relationship:Participante/eventosDoParticipante"
          ]
        },
        {
          "supportId": "data:Inscricao",
          "entityId": "Inscricao",
          "tableId": "inscricao",
          "dependsOn": [
            "Evento"
          ],
          "sourceRefs": [
            "grant:organizadorInscritos",
            "grant:publicoMinhasInscricoes",
            "journey:acompanharInscritos/baixarCsv",
            "journey:acompanharInscritos/localizarEventoOrg",
            "journey:acompanharInscritos/verInscritos",
            "journey:acompanharInscritos/verOcupacao",
            "journey:cadastrarPublicarEvento/criarEvento",
            "journey:cadastrarPublicarEvento/publicarEvento",
            "journey:cadastrarPublicarEvento/revisarEvento",
            "journey:cancelarInscricao/cancelar",
            "journey:cancelarInscricao/localizarInscricao",
            "journey:cancelarInscricao/verInscricao",
            "journey:inscreverEmEvento/criarInscricao",
            "journey:inscreverEmEvento/localizarEvento",
            "journey:inscreverEmEvento/verEvento",
            "ontology:Inscricao/lifecycleStates/confirmed",
            "ontology:Inscricao/lifecycleStates/waitlisted",
            "process:promoverListaEspera",
            "relationship:Evento/eventosDoParticipante",
            "relationship:Evento/inscricaoEvento",
            "relationship:Inscricao/inscricaoEvento",
            "relationship:Inscricao/inscricaoParticipante",
            "relationship:Participante/inscricaoParticipante"
          ]
        }
      ],
      "runtime": [
        {
          "supportId": "identity:organizador",
          "kind": "identity",
          "entityId": "",
          "actorRefs": [
            "organizador"
          ],
          "gap": "PERSON_ENTITY_UNDECLARED: actor organizador declares no personEntity; the test identity cannot be bound",
          "owner": "runtime"
        },
        {
          "supportId": "identity:publico",
          "kind": "identity",
          "entityId": "Participante",
          "actorRefs": [
            "publico"
          ],
          "gap": "RUNTIME_TEST_IDENTITY_UNREFERENCED: no verified runtime capability provisions an authenticated test identity for publico bound to Participante",
          "owner": "runtime"
        },
        {
          "supportId": "mdm:EmailParticipante",
          "kind": "mdm",
          "entityId": "EmailParticipante",
          "actorRefs": [
            "organizador",
            "publico"
          ],
          "gap": "RUNTIME_MDM_FIXTURE_UNREFERENCED: no verified runtime capability provisions and removes EmailParticipante records by execution id",
          "owner": "runtime"
        }
      ],
      "gaps": []
    }
  }
} as const;

export default definition;
