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
          "mdmSubtype": "Person",
          "role": "ordenServicio.Cliente",
          "namespace": "ordenServicio"
        },
        {
          "mdmSubtype": "AssetEquipment",
          "role": "ordenServicio.Aparato",
          "namespace": "ordenServicio"
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
          "entityId": "Aparato",
          "kind": "mdm",
          "mdmSubtype": "AssetEquipment"
        },
        {
          "entityId": "OrdenServicio",
          "kind": "core"
        },
        {
          "entityId": "BudgetPart",
          "kind": "supporting"
        }
      ],
      "events": [
        {
          "eventId": "enviarPresupuesto",
          "on": "OrdenServicio.enviarPresupuesto"
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
      "updatedAt": "2026-09-12T21:31:27.732Z"
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
          "mdmSubtype": "Person",
          "role": "compras.Comprador",
          "namespace": "compras"
        },
        {
          "mdmSubtype": "Company",
          "role": "compras.Fornecedor",
          "namespace": "compras"
        }
      ],
      "generalFields": [],
      "entities": [
        {
          "entityId": "Comprador",
          "kind": "mdm",
          "mdmSubtype": "Person"
        },
        {
          "entityId": "Fornecedor",
          "kind": "mdm",
          "mdmSubtype": "Company"
        },
        {
          "entityId": "Produto",
          "kind": "supporting"
        },
        {
          "entityId": "EstoqueProduto",
          "kind": "supporting"
        },
        {
          "entityId": "FornecimentoProduto",
          "kind": "supporting"
        },
        {
          "entityId": "PedidoCompra",
          "kind": "core"
        },
        {
          "entityId": "ItemPedidoCompra",
          "kind": "supporting"
        },
        {
          "entityId": "RecebimentoCompra",
          "kind": "event"
        },
        {
          "entityId": "ItemRecebimentoCompra",
          "kind": "supporting"
        }
      ],
      "events": [
        {
          "eventId": "registrarRecebimentoParcial",
          "on": "PedidoCompra.registrarRecebimentoParcial"
        },
        {
          "eventId": "registrarRecebimentoTotal",
          "on": "PedidoCompra.registrarRecebimentoTotal"
        }
      ],
      "updatedAt": "2026-09-12T21:43:47.888Z"
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
          "mdmSubtype": "AssetEquipment",
          "role": "comandaRestaurante.Mesa",
          "namespace": "comandaRestaurante"
        },
        {
          "mdmSubtype": "Product",
          "role": "comandaRestaurante.ItemCardapio",
          "namespace": "comandaRestaurante"
        },
        {
          "mdmSubtype": "Person",
          "role": "comandaRestaurante.Garcom",
          "namespace": "comandaRestaurante"
        }
      ],
      "generalFields": [],
      "entities": [
        {
          "entityId": "Mesa",
          "kind": "mdm",
          "mdmSubtype": "AssetEquipment"
        },
        {
          "entityId": "ItemCardapio",
          "kind": "mdm",
          "mdmSubtype": "Product"
        },
        {
          "entityId": "Garcom",
          "kind": "mdm",
          "mdmSubtype": "Person"
        },
        {
          "entityId": "Comanda",
          "kind": "core"
        },
        {
          "entityId": "ItemComanda",
          "kind": "supporting"
        }
      ],
      "events": [
        {
          "eventId": "comandaFechada",
          "on": "Comanda.fecharComanda"
        }
      ],
      "updatedAt": "2026-09-12T21:48:01.323Z"
    }
  ]
} as const satisfies Ns4SolutionRegistryArtifact;

export type SolutionRegistryType = typeof solutionRegistry;

export default solutionRegistry;
