/// <mls fileReference="_102047_/l4/organization/registry.defs.ts" enhancement="_blank"/>

import type { Ns4SolutionRegistryArtifact } from '/_102035_/l2/agentNewSolution/types.js';

export const solutionRegistry = {
  "schemaVersion": "ns4-solution-registry-v1",
  "level1SchemaVersion": "2026-09-15-mdm-ontology-v2",
  "modules": [
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
      "roles": [
        {
          "subtype": "Product",
          "roleTag": "comandaRestaurante.ItemCardapio",
          "namespace": "comandaRestaurante"
        }
      ],
      "generalFields": [],
      "entities": [
        {
          "entityId": "Mesa",
          "kind": "entity",
          "class": "supporting"
        },
        {
          "entityId": "ItemCardapio",
          "kind": "role",
          "mdmSubtype": "Product",
          "class": "mdm"
        },
        {
          "entityId": "Comanda",
          "kind": "entity",
          "class": "core"
        },
        {
          "entityId": "ItemComanda",
          "kind": "entity",
          "class": "supporting"
        }
      ],
      "events": [
        {
          "eventId": "fecharComanda",
          "on": "Comanda.fecharComanda"
        }
      ],
      "updatedAt": "2026-09-18T06:37:29.224Z"
    },
    {
      "moduleName": "compras",
      "actors": [
        {
          "actorId": "comprador",
          "kind": "internal"
        },
        {
          "actorId": "gerenteCompras",
          "kind": "internal"
        },
        {
          "actorId": "almoxarife",
          "kind": "internal"
        }
      ],
      "roles": [
        {
          "subtype": "Company",
          "roleTag": "compras.Supplier",
          "namespace": "compras"
        },
        {
          "subtype": "ContactChannel",
          "roleTag": "compras.SupplierContact",
          "namespace": "compras"
        },
        {
          "subtype": "Product",
          "roleTag": "compras.Product",
          "namespace": "compras"
        },
        {
          "subtype": "Person",
          "roleTag": "compras.Buyer",
          "namespace": "compras"
        }
      ],
      "generalFields": [],
      "entities": [
        {
          "entityId": "Supplier",
          "kind": "role",
          "mdmSubtype": "Company",
          "class": "mdm"
        },
        {
          "entityId": "SupplierContact",
          "kind": "role",
          "mdmSubtype": "ContactChannel",
          "class": "mdm"
        },
        {
          "entityId": "Product",
          "kind": "role",
          "mdmSubtype": "Product",
          "class": "mdm"
        },
        {
          "entityId": "Buyer",
          "kind": "role",
          "mdmSubtype": "Person",
          "class": "mdm"
        },
        {
          "entityId": "SupplierOffering",
          "kind": "entity",
          "class": "supporting"
        },
        {
          "entityId": "PurchaseOrder",
          "kind": "entity",
          "class": "core"
        },
        {
          "entityId": "GoodsReceipt",
          "kind": "entity",
          "class": "event"
        },
        {
          "entityId": "PurchaseOrderDashboard",
          "kind": "entity",
          "class": "supporting"
        }
      ],
      "events": [
        {
          "eventId": "recebimentoRegistrado",
          "on": "GoodsReceipt.create"
        }
      ],
      "updatedAt": "2026-09-18T08:58:16.019Z"
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
          "entityId": "MovimentacaoEstoque",
          "kind": "entity",
          "class": "event"
        }
      ],
      "events": [
        {
          "eventId": "saldoAbaixoDoMinimo",
          "on": "MovimentacaoEstoque.create"
        }
      ],
      "updatedAt": "2026-09-18T07:17:29.018Z"
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
        },
        {
          "subtype": "Person",
          "roleTag": "financeiro.GerenteFinanceiro",
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
          "entityId": "GerenteFinanceiro",
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
          "entityId": "ExtratoPagador",
          "kind": "entity",
          "class": "supporting"
        },
        {
          "entityId": "PainelRecebiveis",
          "kind": "entity",
          "class": "supporting"
        }
      ],
      "events": [],
      "updatedAt": "2026-09-18T06:51:58.885Z"
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
          "roleTag": "hiringPipeline.CandidateContact",
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
          "entityId": "Candidate",
          "kind": "role",
          "mdmSubtype": "Person",
          "class": "mdm"
        },
        {
          "entityId": "CandidateContact",
          "kind": "role",
          "mdmSubtype": "ContactChannel",
          "class": "mdm"
        },
        {
          "entityId": "HiringManager",
          "kind": "role",
          "mdmSubtype": "Person",
          "class": "mdm"
        },
        {
          "entityId": "JobPosition",
          "kind": "entity",
          "class": "core"
        },
        {
          "entityId": "Application",
          "kind": "entity",
          "class": "event"
        }
      ],
      "events": [
        {
          "eventId": "closeFilledPosition",
          "on": "JobPosition.closeFilledPosition"
        }
      ],
      "updatedAt": "2026-09-18T07:46:42.977Z"
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
          "eventId": "publicarEvento",
          "on": "Evento.publicarEvento"
        },
        {
          "eventId": "cancelarInscricao",
          "on": "Inscricao.cancelarInscricao"
        },
        {
          "eventId": "promoverDaListaEspera",
          "on": "Inscricao.promoverDaListaEspera"
        }
      ],
      "updatedAt": "2026-09-18T07:31:01.171Z"
    },
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
          "eventId": "despesaAprovada",
          "on": "Despesa.registrarDecisaoDaDespesa"
        }
      ],
      "updatedAt": "2026-09-18T07:25:13.858Z"
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
          "entityId": "ItemLocacao",
          "kind": "entity",
          "class": "supporting"
        },
        {
          "entityId": "ManutencaoEquipamento",
          "kind": "entity",
          "class": "supporting"
        }
      ],
      "events": [
        {
          "eventId": "devolucaoRegistrada",
          "on": "ContratoLocacao.registrarDevolucao"
        }
      ],
      "updatedAt": "2026-09-20T10:52:08.240Z"
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
        },
        {
          "subtype": "Person",
          "roleTag": "agendaClinica.Recepcionista",
          "namespace": "agendaClinica"
        },
        {
          "subtype": "ContactChannel",
          "roleTag": "agendaClinica.ContatoPaciente",
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
          "entityId": "Recepcionista",
          "kind": "role",
          "mdmSubtype": "Person",
          "class": "mdm"
        },
        {
          "entityId": "ContatoPaciente",
          "kind": "role",
          "mdmSubtype": "ContactChannel",
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
          "eventId": "registrarFalta",
          "on": "Consulta.registrarFalta"
        },
        {
          "eventId": "registrarAtendimento",
          "on": "Consulta.registrarAtendimento"
        }
      ],
      "updatedAt": "2026-09-25T11:24:15.402Z"
    }
  ]
} as const satisfies Ns4SolutionRegistryArtifact;

export type SolutionRegistryType = typeof solutionRegistry;

export default solutionRegistry;
