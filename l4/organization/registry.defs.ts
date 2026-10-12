/// <mls fileReference="_102047_/l4/organization/registry.defs.ts" enhancement="_blank"/>

import type { Ns4SolutionRegistryArtifact } from '/_102035_/l2/solution/helpers/ns4Types.js';

export const solutionRegistry = {
  "schemaVersion": "ns4-solution-registry-v1",
  "level1SchemaVersion": "2026-09-15-mdm-ontology-v2",
  "modules": [
    {
      "moduleName": "manutencaoFrota",
      "actors": [
        {
          "actorId": "motorista",
          "kind": "internal"
        },
        {
          "actorId": "gestor",
          "kind": "internal"
        }
      ],
      "roles": [
        {
          "subtype": "AssetVehicle",
          "roleTag": "manutencaoFrota.Vehicle",
          "namespace": "manutencaoFrota"
        },
        {
          "subtype": "Person",
          "roleTag": "manutencaoFrota.Driver",
          "namespace": "manutencaoFrota"
        },
        {
          "subtype": "Company",
          "roleTag": "manutencaoFrota.Workshop",
          "namespace": "manutencaoFrota"
        }
      ],
      "generalFields": [],
      "entities": [
        {
          "entityId": "Vehicle",
          "kind": "role",
          "mdmSubtype": "AssetVehicle",
          "class": "mdm"
        },
        {
          "entityId": "Driver",
          "kind": "role",
          "mdmSubtype": "Person",
          "class": "mdm"
        },
        {
          "entityId": "Workshop",
          "kind": "role",
          "mdmSubtype": "Company",
          "class": "mdm"
        },
        {
          "entityId": "VehicleAssignment",
          "kind": "entity",
          "class": "supporting"
        },
        {
          "entityId": "Fueling",
          "kind": "entity",
          "class": "event"
        },
        {
          "entityId": "MaintenancePlan",
          "kind": "entity",
          "class": "core"
        },
        {
          "entityId": "MaintenanceOrder",
          "kind": "entity",
          "class": "core"
        }
      ],
      "events": [
        {
          "eventId": "alertaPreventivaVencida",
          "on": "Fueling.create"
        }
      ],
      "updatedAt": "2026-09-18T08:19:42.172Z"
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
          "subtype": "Person",
          "roleTag": "mensalidadesAcademia.Aluno",
          "namespace": "mensalidadesAcademia"
        }
      ],
      "generalFields": [],
      "entities": [
        {
          "entityId": "Aluno",
          "kind": "role",
          "mdmSubtype": "Person",
          "class": "mdm"
        },
        {
          "entityId": "Plano",
          "kind": "entity",
          "class": "supporting"
        },
        {
          "entityId": "Matricula",
          "kind": "entity",
          "class": "core"
        },
        {
          "entityId": "Mensalidade",
          "kind": "entity",
          "class": "core"
        },
        {
          "entityId": "Pagamento",
          "kind": "entity",
          "class": "event"
        },
        {
          "entityId": "IndicadoresAcademia",
          "kind": "entity",
          "class": "supporting"
        }
      ],
      "events": [
        {
          "eventId": "cancelarMatricula",
          "on": "Matricula.cancelarMatricula"
        }
      ],
      "updatedAt": "2026-09-18T06:32:22.971Z"
    },
    {
      "moduleName": "ordenServicio",
      "actors": [
        {
          "actorId": "recepcionista",
          "kind": "internal"
        },
        {
          "actorId": "tecnico",
          "kind": "internal"
        },
        {
          "actorId": "cliente",
          "kind": "external"
        }
      ],
      "roles": [
        {
          "subtype": "Person",
          "roleTag": "ordenServicio.Cliente",
          "namespace": "ordenServicio"
        },
        {
          "subtype": "AssetEquipment",
          "roleTag": "ordenServicio.Aparato",
          "namespace": "ordenServicio"
        }
      ],
      "generalFields": [],
      "entities": [
        {
          "entityId": "Cliente",
          "kind": "role",
          "mdmSubtype": "Person",
          "class": "mdm"
        },
        {
          "entityId": "Aparato",
          "kind": "role",
          "mdmSubtype": "AssetEquipment",
          "class": "mdm"
        },
        {
          "entityId": "OrdenServicio",
          "kind": "entity",
          "class": "core"
        }
      ],
      "events": [
        {
          "eventId": "emitirPresupuesto",
          "on": "OrdenServicio.emitirPresupuesto"
        },
        {
          "eventId": "aprobarPresupuesto",
          "on": "OrdenServicio.aprobarPresupuesto"
        },
        {
          "eventId": "rechazarPresupuesto",
          "on": "OrdenServicio.rechazarPresupuesto"
        },
        {
          "eventId": "marcarLista",
          "on": "OrdenServicio.marcarLista"
        },
        {
          "eventId": "entregarYfinalizar",
          "on": "OrdenServicio.entregarYfinalizar"
        }
      ],
      "updatedAt": "2026-09-18T08:27:38.096Z"
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
          "subtype": "Person",
          "roleTag": "reembolsoDespesas.Colaborador",
          "namespace": "reembolsoDespesas"
        },
        {
          "subtype": "Person",
          "roleTag": "reembolsoDespesas.GestorEquipe",
          "namespace": "reembolsoDespesas"
        }
      ],
      "generalFields": [],
      "entities": [
        {
          "entityId": "Colaborador",
          "kind": "role",
          "mdmSubtype": "Person",
          "class": "mdm"
        },
        {
          "entityId": "GestorEquipe",
          "kind": "role",
          "mdmSubtype": "Person",
          "class": "mdm"
        },
        {
          "entityId": "Despesa",
          "kind": "entity",
          "class": "core"
        }
      ],
      "events": [
        {
          "eventId": "aprovarDespesa",
          "on": "Despesa.aprovarDespesa"
        }
      ],
      "updatedAt": "2026-10-02T15:30:35.579Z"
    },
    {
      "moduleName": "comandaRestaurante",
      "actors": [
        {
          "actorId": "garcom",
          "kind": "internal"
        },
        {
          "actorId": "caixa",
          "kind": "internal"
        }
      ],
      "roles": [],
      "generalFields": [],
      "entities": [
        {
          "entityId": "Mesa",
          "kind": "entity",
          "class": "supporting"
        },
        {
          "entityId": "ItemCardapio",
          "kind": "entity",
          "class": "supporting"
        },
        {
          "entityId": "Comanda",
          "kind": "entity",
          "class": "core"
        },
        {
          "entityId": "ItemComanda",
          "kind": "entity",
          "class": "event"
        }
      ],
      "events": [
        {
          "eventId": "comandaFechada",
          "on": "Comanda.fecharComanda"
        }
      ],
      "updatedAt": "2026-10-04T05:01:31.016Z"
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
          "subtype": "Person",
          "roleTag": "agendaClinica.Paciente",
          "namespace": "agendaClinica"
        },
        {
          "subtype": "Person",
          "roleTag": "agendaClinica.Profissional",
          "namespace": "agendaClinica"
        }
      ],
      "generalFields": [],
      "entities": [
        {
          "entityId": "Paciente",
          "kind": "role",
          "mdmSubtype": "Person",
          "class": "mdm"
        },
        {
          "entityId": "Profissional",
          "kind": "role",
          "mdmSubtype": "Person",
          "class": "mdm"
        },
        {
          "entityId": "Consulta",
          "kind": "entity",
          "class": "event"
        }
      ],
      "events": [
        {
          "eventId": "confirmarConsulta",
          "on": "Consulta.confirmarConsulta"
        },
        {
          "eventId": "registrarFalta",
          "on": "Consulta.registrarFalta"
        },
        {
          "eventId": "registrarAtendimento",
          "on": "Consulta.registrarAtendimento"
        }
      ],
      "updatedAt": "2026-10-07T07:16:47.918Z"
    },
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
          "subtype": "Product",
          "roleTag": "controleEstoque.Produto",
          "namespace": "controleEstoque"
        }
      ],
      "generalFields": [],
      "entities": [
        {
          "entityId": "Produto",
          "kind": "role",
          "mdmSubtype": "Product",
          "class": "mdm"
        },
        {
          "entityId": "Movimentacao",
          "kind": "entity",
          "class": "event"
        }
      ],
      "events": [
        {
          "eventId": "produtoCadastrado",
          "on": "Produto.create"
        },
        {
          "eventId": "movimentacaoRegistrada",
          "on": "Movimentacao.create"
        }
      ],
      "updatedAt": "2026-10-12T15:41:38.204Z"
    },
    {
      "moduleName": "financeiro",
      "actors": [
        {
          "actorId": "caixa",
          "kind": "internal"
        },
        {
          "actorId": "gerenteFinanceiro",
          "kind": "internal"
        },
        {
          "actorId": "pagador",
          "kind": "external"
        }
      ],
      "roles": [
        {
          "subtype": "Person",
          "roleTag": "financeiro.Pagador",
          "namespace": "financeiro"
        }
      ],
      "generalFields": [],
      "entities": [
        {
          "entityId": "Pagador",
          "kind": "role",
          "mdmSubtype": "Person",
          "class": "mdm"
        },
        {
          "entityId": "TituloReceber",
          "kind": "entity",
          "class": "core"
        },
        {
          "entityId": "Recebimento",
          "kind": "entity",
          "class": "event"
        },
        {
          "entityId": "PainelRecebiveis",
          "kind": "entity",
          "class": "supporting"
        }
      ],
      "events": [
        {
          "eventId": "recebimentoRegistrado",
          "on": "Recebimento.create"
        },
        {
          "eventId": "recebimentoEstornado",
          "on": "Recebimento.estornar"
        }
      ],
      "updatedAt": "2026-10-12T19:22:43.458Z"
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
          "subtype": "Person",
          "roleTag": "hiringPipeline.Candidate",
          "namespace": "hiringPipeline"
        },
        {
          "subtype": "ContactChannel",
          "roleTag": "hiringPipeline.CandidateEmail",
          "namespace": "hiringPipeline"
        },
        {
          "subtype": "Person",
          "roleTag": "hiringPipeline.HiringManager",
          "namespace": "hiringPipeline"
        }
      ],
      "generalFields": [],
      "entities": [
        {
          "entityId": "JobPosition",
          "kind": "entity",
          "class": "core"
        },
        {
          "entityId": "Application",
          "kind": "entity",
          "class": "event"
        },
        {
          "entityId": "Candidate",
          "kind": "role",
          "mdmSubtype": "Person",
          "class": "mdm"
        },
        {
          "entityId": "CandidateEmail",
          "kind": "role",
          "mdmSubtype": "ContactChannel",
          "class": "mdm"
        },
        {
          "entityId": "HiringManager",
          "kind": "role",
          "mdmSubtype": "Person",
          "class": "mdm"
        }
      ],
      "events": [
        {
          "eventId": "candidateHired",
          "on": "Application.hire"
        },
        {
          "eventId": "positionClosed",
          "on": "JobPosition.closePosition"
        }
      ],
      "updatedAt": "2026-10-12T19:26:48.918Z"
    },
    {
      "moduleName": "inscricaoEvento",
      "actors": [
        {
          "actorId": "organizador",
          "kind": "internal"
        },
        {
          "actorId": "publico",
          "kind": "external"
        }
      ],
      "roles": [
        {
          "subtype": "Person",
          "roleTag": "inscricaoEvento.Participante",
          "namespace": "inscricaoEvento"
        },
        {
          "subtype": "ContactChannel",
          "roleTag": "inscricaoEvento.EmailParticipante",
          "namespace": "inscricaoEvento"
        }
      ],
      "generalFields": [],
      "entities": [
        {
          "entityId": "Evento",
          "kind": "entity",
          "class": "core"
        },
        {
          "entityId": "Inscricao",
          "kind": "entity",
          "class": "event"
        },
        {
          "entityId": "Participante",
          "kind": "role",
          "mdmSubtype": "Person",
          "class": "mdm"
        },
        {
          "entityId": "EmailParticipante",
          "kind": "role",
          "mdmSubtype": "ContactChannel",
          "class": "mdm"
        }
      ],
      "events": [
        {
          "eventId": "eventoPublicado",
          "on": "Evento.publicar"
        },
        {
          "eventId": "inscricaoRealizada",
          "on": "Inscricao.create"
        },
        {
          "eventId": "inscricaoCancelada",
          "on": "Inscricao.cancelar"
        },
        {
          "eventId": "inscricaoPromovida",
          "on": "Inscricao.promover"
        }
      ],
      "updatedAt": "2026-10-12T19:30:28.695Z"
    },
    {
      "moduleName": "locacaoEquipamentos",
      "actors": [
        {
          "actorId": "atendente",
          "kind": "internal"
        },
        {
          "actorId": "gerente",
          "kind": "internal"
        }
      ],
      "roles": [
        {
          "subtype": "Person",
          "roleTag": "locacaoEquipamentos.Cliente",
          "namespace": "locacaoEquipamentos"
        }
      ],
      "generalFields": [],
      "entities": [
        {
          "entityId": "Cliente",
          "kind": "role",
          "mdmSubtype": "Person",
          "class": "mdm"
        },
        {
          "entityId": "Equipamento",
          "kind": "entity",
          "class": "core"
        },
        {
          "entityId": "ContratoLocacao",
          "kind": "entity",
          "class": "event"
        },
        {
          "entityId": "ItemContrato",
          "kind": "entity",
          "class": "supporting"
        }
      ],
      "events": [
        {
          "eventId": "contratoLocacaoAtivado",
          "on": "ContratoLocacao.ativarContrato"
        },
        {
          "eventId": "devolucaoRegistrada",
          "on": "ContratoLocacao.registrarDevolucao"
        }
      ],
      "updatedAt": "2026-10-12T19:34:07.351Z"
    }
  ]
} as const satisfies Ns4SolutionRegistryArtifact;

export type SolutionRegistryType = typeof solutionRegistry;

export default solutionRegistry;
