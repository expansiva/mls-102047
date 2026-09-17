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
          "mdmSubtype": "Person",
          "role": "locacaoEquipamentos.Cliente",
          "namespace": "locacaoEquipamentos"
        },
        {
          "mdmSubtype": "AssetEquipment",
          "role": "locacaoEquipamentos.Equipamento",
          "namespace": "locacaoEquipamentos"
        },
        {
          "mdmSubtype": "Person",
          "role": "locacaoEquipamentos.Atendente",
          "namespace": "locacaoEquipamentos"
        }
      ],
      "generalFields": [],
      "entities": [
        {
          "entityId": "Cliente",
          "kind": "mdm",
          "mdmSubtype": "Person"
        },
        {
          "entityId": "Equipamento",
          "kind": "mdm",
          "mdmSubtype": "AssetEquipment"
        },
        {
          "entityId": "Atendente",
          "kind": "mdm",
          "mdmSubtype": "Person"
        },
        {
          "entityId": "ContratoLocacao",
          "kind": "core"
        },
        {
          "entityId": "RentalItem",
          "kind": "supporting"
        }
      ],
      "events": [
        {
          "eventId": "registrarDevolucao",
          "on": "ContratoLocacao.registrarDevolucao"
        }
      ],
      "updatedAt": "2026-09-12T21:34:32.288Z"
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
          "mdmSubtype": "Person",
          "role": "inscricaoEvento.Participante",
          "namespace": "inscricaoEvento"
        }
      ],
      "generalFields": [],
      "entities": [
        {
          "entityId": "Evento",
          "kind": "core"
        },
        {
          "entityId": "Inscricao",
          "kind": "core"
        },
        {
          "entityId": "Participante",
          "kind": "mdm",
          "mdmSubtype": "Person"
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
          "eventId": "promoverListaEspera",
          "on": "Inscricao.promoverListaEspera"
        }
      ],
      "updatedAt": "2026-09-12T21:37:59.069Z"
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
          "entityId": "ContatoPaciente",
          "kind": "role",
          "mdmSubtype": "ContactChannel",
          "class": "mdm"
        },
        {
          "entityId": "Consulta",
          "kind": "entity",
          "class": "core"
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
      "updatedAt": "2026-09-17T01:05:28.778Z"
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
          "eventId": "presupuestoEmitido",
          "on": "OrdenServicio.emitirPresupuesto"
        },
        {
          "eventId": "presupuestoResuelto",
          "on": "OrdenServicio.resolverPresupuesto"
        },
        {
          "eventId": "reparacionListaParaEntrega",
          "on": "OrdenServicio.marcarListaParaEntrega"
        },
        {
          "eventId": "entregaFinalizada",
          "on": "OrdenServicio.finalizarEntrega"
        }
      ],
      "updatedAt": "2026-09-17T03:44:40.081Z"
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
      "roles": [
        {
          "subtype": "Location",
          "roleTag": "comandaRestaurante.Mesa",
          "namespace": "comandaRestaurante"
        },
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
          "kind": "role",
          "mdmSubtype": "Location",
          "class": "mdm"
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
      "updatedAt": "2026-09-17T04:13:38.255Z"
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
          "roleTag": "compras.Fornecedor",
          "namespace": "compras"
        },
        {
          "subtype": "Product",
          "roleTag": "compras.Produto",
          "namespace": "compras"
        },
        {
          "subtype": "ContactChannel",
          "roleTag": "compras.ContatoFornecedor",
          "namespace": "compras"
        }
      ],
      "generalFields": [],
      "entities": [
        {
          "entityId": "Fornecedor",
          "kind": "role",
          "mdmSubtype": "Company",
          "class": "mdm"
        },
        {
          "entityId": "Produto",
          "kind": "role",
          "mdmSubtype": "Product",
          "class": "mdm"
        },
        {
          "entityId": "ContatoFornecedor",
          "kind": "role",
          "mdmSubtype": "ContactChannel",
          "class": "mdm"
        },
        {
          "entityId": "ProdutoFornecedor",
          "kind": "entity",
          "class": "supporting"
        },
        {
          "entityId": "PedidoCompra",
          "kind": "entity",
          "class": "core"
        },
        {
          "entityId": "RecebimentoPedido",
          "kind": "entity",
          "class": "event"
        }
      ],
      "events": [
        {
          "eventId": "entradaEstoquePorRecebimentoParcial",
          "on": "PedidoCompra.registrarRecebimentoParcial"
        },
        {
          "eventId": "entradaEstoquePorRecebimentoTotal",
          "on": "PedidoCompra.registrarRecebimentoTotal"
        }
      ],
      "updatedAt": "2026-09-17T05:16:45.865Z"
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
          "on": "MaintenanceOrder.create"
        }
      ],
      "updatedAt": "2026-09-17T05:22:14.967Z"
    }
  ]
} as const satisfies Ns4SolutionRegistryArtifact;

export type SolutionRegistryType = typeof solutionRegistry;

export default solutionRegistry;
