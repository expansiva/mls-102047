/// <mls fileReference="_102047_/l4/organization/registry.defs.ts" enhancement="_blank"/>

import type { Ns4SolutionRegistryArtifact } from '/_102035_/l2/agentNewSolution/types.js';

export const solutionRegistry = {
  "schemaVersion": "ns4-solution-registry-v1",
  "level1SchemaVersion": "ns4-level1-v1",
  "modules": [
    {
      "moduleName": "controleEstoque",
      "actors": [
        {
          "actorId": "estoquista",
          "kind": "internal"
        }
      ],
      "roles": [
        {
          "mdmSubtype": "Product",
          "role": "controleEstoque.Produto",
          "namespace": "controleEstoque"
        }
      ],
      "generalFields": [],
      "entities": [
        {
          "entityId": "Produto",
          "kind": "mdm",
          "mdmSubtype": "Product"
        },
        {
          "entityId": "MovimentacaoEstoque",
          "kind": "event"
        }
      ],
      "events": [
        {
          "eventId": "estoqueAbaixoDoMinimo",
          "on": "MovimentacaoEstoque.create"
        }
      ],
      "updatedAt": "2026-09-12T19:32:37.338Z"
    },
    {
      "moduleName": "agendaClinica",
      "actors": [
        {
          "actorId": "recepcionista",
          "kind": "internal"
        },
        {
          "actorId": "profissional",
          "kind": "internal"
        }
      ],
      "roles": [
        {
          "mdmSubtype": "Person",
          "role": "agendaClinica.Paciente",
          "namespace": "agendaClinica"
        },
        {
          "mdmSubtype": "Person",
          "role": "agendaClinica.Profissional",
          "namespace": "agendaClinica"
        }
      ],
      "generalFields": [],
      "entities": [
        {
          "entityId": "Paciente",
          "kind": "mdm",
          "mdmSubtype": "Person"
        },
        {
          "entityId": "Profissional",
          "kind": "mdm",
          "mdmSubtype": "Person"
        },
        {
          "entityId": "Consulta",
          "kind": "core"
        }
      ],
      "events": [
        {
          "eventId": "consultaConfirmada",
          "on": "Consulta.confirmarConsulta"
        },
        {
          "eventId": "consultaComFaltaRegistrada",
          "on": "Consulta.registrarFalta"
        },
        {
          "eventId": "consultaAtendida",
          "on": "Consulta.registrarAtendimento"
        }
      ],
      "updatedAt": "2026-09-12T19:43:15.338Z"
    },
    {
      "moduleName": "reembolsoDespesas",
      "actors": [
        {
          "actorId": "colaborador",
          "kind": "internal"
        },
        {
          "actorId": "gestorEquipe",
          "kind": "internal"
        },
        {
          "actorId": "financeiro",
          "kind": "internal"
        }
      ],
      "roles": [
        {
          "mdmSubtype": "Person",
          "role": "reembolsoDespesas.Colaborador",
          "namespace": "reembolsoDespesas"
        },
        {
          "mdmSubtype": "Person",
          "role": "reembolsoDespesas.GestorEquipe",
          "namespace": "reembolsoDespesas"
        }
      ],
      "generalFields": [],
      "entities": [
        {
          "entityId": "Despesa",
          "kind": "core"
        },
        {
          "entityId": "Colaborador",
          "kind": "mdm",
          "mdmSubtype": "Person"
        },
        {
          "entityId": "GestorEquipe",
          "kind": "mdm",
          "mdmSubtype": "Person"
        }
      ],
      "events": [
        {
          "eventId": "despesaEnviadaParaAprovacao",
          "on": "Despesa.submitForApproval"
        },
        {
          "eventId": "despesaReenviadaParaAprovacao",
          "on": "Despesa.resubmitForApproval"
        },
        {
          "eventId": "decisaoDeAprovacaoRegistrada",
          "on": "Despesa.recordApprovalDecision"
        },
        {
          "eventId": "pagamentoDeDespesaRegistrado",
          "on": "Despesa.registerPayment"
        }
      ],
      "updatedAt": "2026-09-12T19:47:57.034Z"
    },
    {
      "moduleName": "hiringPipeline",
      "actors": [
        {
          "actorId": "recruiter",
          "kind": "internal"
        },
        {
          "actorId": "hiringManager",
          "kind": "internal"
        }
      ],
      "roles": [
        {
          "mdmSubtype": "Person",
          "role": "hiringPipeline.Candidate",
          "namespace": "hiringPipeline"
        }
      ],
      "generalFields": [],
      "entities": [
        {
          "entityId": "JobPosition",
          "kind": "core"
        },
        {
          "entityId": "Candidate",
          "kind": "mdm",
          "mdmSubtype": "Person"
        },
        {
          "entityId": "Application",
          "kind": "core"
        }
      ],
      "events": [
        {
          "eventId": "advanceToInterview",
          "on": "Application.advanceToInterview"
        },
        {
          "eventId": "issueOffer",
          "on": "Application.issueOffer"
        },
        {
          "eventId": "markHired",
          "on": "Application.markHired"
        },
        {
          "eventId": "rejectApplication",
          "on": "Application.rejectApplication"
        }
      ],
      "updatedAt": "2026-09-12T19:59:56.097Z"
    },
    {
      "moduleName": "manutencaoFrota",
      "actors": [
        {
          "actorId": "motorista",
          "kind": "internal"
        },
        {
          "actorId": "gestorFrota",
          "kind": "internal"
        }
      ],
      "roles": [
        {
          "mdmSubtype": "Person",
          "role": "manutencaoFrota.Motorista",
          "namespace": "manutencaoFrota"
        },
        {
          "mdmSubtype": "Company",
          "role": "manutencaoFrota.Oficina",
          "namespace": "manutencaoFrota"
        },
        {
          "mdmSubtype": "AssetVehicle",
          "role": "manutencaoFrota.Veiculo",
          "namespace": "manutencaoFrota"
        }
      ],
      "generalFields": [],
      "entities": [
        {
          "entityId": "Abastecimento",
          "kind": "event"
        },
        {
          "entityId": "Motorista",
          "kind": "mdm",
          "mdmSubtype": "Person"
        },
        {
          "entityId": "Oficina",
          "kind": "mdm",
          "mdmSubtype": "Company"
        },
        {
          "entityId": "Veiculo",
          "kind": "mdm",
          "mdmSubtype": "AssetVehicle"
        },
        {
          "entityId": "PlanoManutencao",
          "kind": "core"
        },
        {
          "entityId": "OrdemManutencao",
          "kind": "core"
        }
      ],
      "events": [
        {
          "eventId": "preventivaVencida",
          "on": "Abastecimento.create"
        }
      ],
      "updatedAt": "2026-09-12T20:05:09.582Z"
    },
    {
      "moduleName": "mensalidadesAcademia",
      "actors": [
        {
          "actorId": "recepcao",
          "kind": "internal"
        },
        {
          "actorId": "gerencia",
          "kind": "internal"
        },
        {
          "actorId": "aluno",
          "kind": "external"
        }
      ],
      "roles": [
        {
          "mdmSubtype": "Person",
          "role": "mensalidadesAcademia.Aluno",
          "namespace": "mensalidadesAcademia"
        }
      ],
      "generalFields": [],
      "entities": [
        {
          "entityId": "Plano",
          "kind": "core"
        },
        {
          "entityId": "Aluno",
          "kind": "mdm",
          "mdmSubtype": "Person"
        },
        {
          "entityId": "Matricula",
          "kind": "core"
        },
        {
          "entityId": "Mensalidade",
          "kind": "event"
        },
        {
          "entityId": "Pagamento",
          "kind": "event"
        }
      ],
      "events": [
        {
          "eventId": "matriculaCancelada",
          "on": "Matricula.cancelarMatricula"
        }
      ],
      "updatedAt": "2026-09-12T20:09:09.008Z"
    }
  ]
} as const satisfies Ns4SolutionRegistryArtifact;

export type SolutionRegistryType = typeof solutionRegistry;

export default solutionRegistry;
