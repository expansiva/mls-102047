/// <mls fileReference="_102047_/l1/agendaClinica/layer_1_external/adapters/persistence/seeds.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "persistenceSeeds",
  "artifactId": "seeds",
  "moduleName": "agendaClinica",
  "status": "pending",
  "dependencies": [
    "_102047_/l1/agendaClinica/layer_1_external/adapters/persistence/consulta.defs.ts"
  ],
  "data": {
    "seedId": "seeds",
    "phase": "plan",
    "scenarios": [
      {
        "scenarioId": "agendarConsulta",
        "tableId": "consulta",
        "source": "journey:agendarConsulta",
        "constraints": [
          "ref:pacienteId:Paciente",
          "ref:profissionalId:Profissional",
          "state:scheduled",
          "uniqueKeys:profissionalId+scheduledAt"
        ],
        "refs": [
          {
            "field": "pacienteId",
            "relationshipId": "consultaPaciente",
            "entityId": "Paciente"
          },
          {
            "field": "profissionalId",
            "relationshipId": "consultaProfissional",
            "entityId": "Profissional"
          }
        ],
        "states": [
          "scheduled"
        ],
        "entityId": "Consulta",
        "stateField": "status"
      },
      {
        "scenarioId": "confirmarConsulta",
        "tableId": "consulta",
        "source": "journey:confirmarConsulta",
        "constraints": [
          "ref:pacienteId:Paciente",
          "ref:profissionalId:Profissional",
          "state:confirmed",
          "uniqueKeys:profissionalId+scheduledAt"
        ],
        "refs": [
          {
            "field": "pacienteId",
            "relationshipId": "consultaPaciente",
            "entityId": "Paciente"
          },
          {
            "field": "profissionalId",
            "relationshipId": "consultaProfissional",
            "entityId": "Profissional"
          }
        ],
        "states": [
          "confirmed"
        ],
        "entityId": "Consulta",
        "stateField": "status"
      },
      {
        "scenarioId": "consultarAgendaDiaria",
        "tableId": "consulta",
        "source": "journey:consultarAgendaDiaria",
        "constraints": [
          "ref:pacienteId:Paciente",
          "ref:profissionalId:Profissional",
          "uniqueKeys:profissionalId+scheduledAt"
        ],
        "refs": [
          {
            "field": "pacienteId",
            "relationshipId": "consultaPaciente",
            "entityId": "Paciente"
          },
          {
            "field": "profissionalId",
            "relationshipId": "consultaProfissional",
            "entityId": "Profissional"
          }
        ],
        "states": [],
        "entityId": "Consulta",
        "stateField": "status"
      },
      {
        "scenarioId": "registrarConsultaAtendida",
        "tableId": "consulta",
        "source": "journey:registrarConsultaAtendida",
        "constraints": [
          "ref:pacienteId:Paciente",
          "ref:profissionalId:Profissional",
          "state:attended",
          "uniqueKeys:profissionalId+scheduledAt"
        ],
        "refs": [
          {
            "field": "pacienteId",
            "relationshipId": "consultaPaciente",
            "entityId": "Paciente"
          },
          {
            "field": "profissionalId",
            "relationshipId": "consultaProfissional",
            "entityId": "Profissional"
          }
        ],
        "states": [
          "attended"
        ],
        "entityId": "Consulta",
        "stateField": "status"
      },
      {
        "scenarioId": "registrarFalta",
        "tableId": "consulta",
        "source": "journey:registrarFalta",
        "constraints": [
          "ref:pacienteId:Paciente",
          "ref:profissionalId:Profissional",
          "state:missed",
          "uniqueKeys:profissionalId+scheduledAt"
        ],
        "refs": [
          {
            "field": "pacienteId",
            "relationshipId": "consultaPaciente",
            "entityId": "Paciente"
          },
          {
            "field": "profissionalId",
            "relationshipId": "consultaProfissional",
            "entityId": "Profissional"
          }
        ],
        "states": [
          "missed"
        ],
        "entityId": "Consulta",
        "stateField": "status"
      }
    ],
    "dependencies": [
      {
        "entityId": "Consulta",
        "kind": "module",
        "seeded": false
      },
      {
        "entityId": "ContatoPaciente",
        "kind": "mdm",
        "seeded": false
      },
      {
        "entityId": "Paciente",
        "kind": "mdm",
        "seeded": false
      },
      {
        "entityId": "Profissional",
        "kind": "mdm",
        "seeded": false
      },
      {
        "entityId": "Recepcionista",
        "kind": "mdm",
        "seeded": false
      }
    ],
    "datasets": [
      {
        "datasetId": "consulta",
        "tableId": "consulta",
        "owners": [
          "agendarConsulta",
          "confirmarConsulta",
          "consultarAgendaDiaria",
          "registrarConsultaAtendida",
          "registrarFalta"
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
          "supportId": "data:Consulta",
          "entityId": "Consulta",
          "tableId": "consulta",
          "dependsOn": [],
          "sourceRefs": [
            "grant:consultarPropriaAgenda",
            "grant:organizarAgenda",
            "journey:agendarConsulta/localizarPaciente",
            "journey:agendarConsulta/localizarProfissional",
            "journey:agendarConsulta/registrarAgendamento",
            "journey:agendarConsulta/verificarHorarioDisponivel",
            "journey:cadastrarPaciente/informarDadosPaciente",
            "journey:confirmarConsulta/consultarContatoPaciente",
            "journey:confirmarConsulta/localizarConsultaParaConfirmacao",
            "journey:confirmarConsulta/registrarConfirmacao",
            "journey:consultarAgendaDiaria/consultarDetalhesConsulta",
            "journey:consultarAgendaDiaria/localizarAgendaDoDia",
            "journey:registrarConsultaAtendida/localizarConsultaDaAgenda",
            "journey:registrarConsultaAtendida/registrarAtendimento",
            "journey:registrarConsultaAtendida/revisarConsultaSelecionada",
            "journey:registrarFalta/conferirConsultaAgendada",
            "journey:registrarFalta/localizarConsultaDoPaciente",
            "journey:registrarFalta/marcarFaltaPaciente",
            "ontology:Consulta/lifecycleStates/confirmed",
            "ontology:Consulta/lifecycleStates/scheduled",
            "relationship:Consulta/consultaPaciente",
            "relationship:Consulta/consultaProfissional",
            "relationship:Paciente/consultaPaciente",
            "relationship:Profissional/consultaProfissional"
          ]
        }
      ],
      "runtime": [
        {
          "supportId": "identity:profissional",
          "kind": "identity",
          "entityId": "Profissional",
          "actorRefs": [
            "profissional"
          ],
          "gap": "RUNTIME_TEST_IDENTITY_UNREFERENCED: no verified runtime capability provisions an authenticated test identity for profissional bound to Profissional",
          "owner": "runtime"
        },
        {
          "supportId": "identity:recepcionista",
          "kind": "identity",
          "entityId": "Recepcionista",
          "actorRefs": [
            "recepcionista"
          ],
          "gap": "RUNTIME_TEST_IDENTITY_UNREFERENCED: no verified runtime capability provisions an authenticated test identity for recepcionista bound to Recepcionista",
          "owner": "runtime"
        },
        {
          "supportId": "mdm:ContatoPaciente",
          "kind": "mdm",
          "entityId": "ContatoPaciente",
          "actorRefs": [
            "recepcionista"
          ],
          "gap": "RUNTIME_MDM_FIXTURE_UNREFERENCED: no verified runtime capability provisions and removes ContatoPaciente records by execution id",
          "owner": "runtime"
        },
        {
          "supportId": "mdm:Paciente",
          "kind": "mdm",
          "entityId": "Paciente",
          "actorRefs": [
            "profissional",
            "recepcionista"
          ],
          "gap": "RUNTIME_MDM_FIXTURE_UNREFERENCED: no verified runtime capability provisions and removes Paciente records by execution id",
          "owner": "runtime"
        }
      ],
      "gaps": []
    }
  }
} as const;

export default definition;
