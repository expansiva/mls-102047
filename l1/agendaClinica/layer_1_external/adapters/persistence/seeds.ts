/// <mls fileReference="_102047_/l1/agendaClinica/layer_1_external/adapters/persistence/seeds.ts" enhancement="_blank"/>
import type { TableSeedRows } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const seedPlan = {
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
      "scenarioId": "registrarAtendimento",
      "tableId": "consulta",
      "source": "journey:registrarAtendimento",
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
        "state:noShow",
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
        "noShow"
      ],
      "entityId": "Consulta",
      "stateField": "status"
    }
  ]
} as const;

export const certificationFixture = {
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
        "grant:profissionalConsultarEregistrarPropriaAgenda",
        "grant:recepcionistaGerenciarPacientesEconsultas",
        "journey:agendarConsulta/localizarPaciente",
        "journey:agendarConsulta/registrarConsulta",
        "journey:cadastrarPaciente/registrarPaciente",
        "journey:confirmarConsulta/conferirDadosConsulta",
        "journey:confirmarConsulta/confirmarAgendamento",
        "journey:confirmarConsulta/localizarConsulta",
        "journey:consultarAgendaDiaria/consultarConsultasDoDia",
        "journey:consultarAgendaDiaria/localizarAgendaDoDia",
        "journey:registrarAtendimento/localizarConsultaDoDia",
        "journey:registrarAtendimento/registrarAtendimentoRealizado",
        "journey:registrarFalta/localizarConsultaAusente",
        "journey:registrarFalta/marcarFalta",
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
      "entityId": "",
      "actorRefs": [
        "recepcionista"
      ],
      "gap": "PERSON_ENTITY_UNDECLARED: actor recepcionista declares no personEntity; the test identity cannot be bound",
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
} as const;

export function applicableSeeds(mode: string): TableSeedRows[] {
  if (mode !== 'development' && mode !== 'presentation') return [];
  return [];
}
