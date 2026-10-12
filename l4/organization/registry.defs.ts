/// <mls fileReference="_102047_/l4/organization/registry.defs.ts" enhancement="_blank"/>

import type { Ns4SolutionRegistryArtifact } from '/_102035_/l2/solution/helpers/ns4Types.js';

export const solutionRegistry = {
  "schemaVersion": "ns4-solution-registry-v1",
  "level1SchemaVersion": "2026-09-15-mdm-ontology-v2",
  "modules": [
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
          "subtype": "Person",
          "roleTag": "manutencaoFrota.Motorista",
          "namespace": "manutencaoFrota"
        },
        {
          "subtype": "Company",
          "roleTag": "manutencaoFrota.Oficina",
          "namespace": "manutencaoFrota"
        }
      ],
      "generalFields": [],
      "entities": [
        {
          "entityId": "Motorista",
          "kind": "role",
          "mdmSubtype": "Person",
          "class": "mdm"
        },
        {
          "entityId": "Oficina",
          "kind": "role",
          "mdmSubtype": "Company",
          "class": "mdm"
        },
        {
          "entityId": "Veiculo",
          "kind": "entity",
          "class": "core"
        },
        {
          "entityId": "Abastecimento",
          "kind": "entity",
          "class": "event"
        },
        {
          "entityId": "PlanoManutencao",
          "kind": "entity",
          "class": "core"
        },
        {
          "entityId": "OrdemManutencao",
          "kind": "entity",
          "class": "core"
        }
      ],
      "events": [
        {
          "eventId": "ordemManutencaoConcluida",
          "on": "OrdemManutencao.concluir"
        }
      ],
      "updatedAt": "2026-10-12T19:38:44.675Z"
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
          "class": "core"
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
          "entityId": "PainelMensalidades",
          "kind": "entity",
          "class": "supporting"
        }
      ],
      "events": [
        {
          "eventId": "matriculaCancelada",
          "on": "Matricula.cancelarMatricula"
        },
        {
          "eventId": "mensalidadeGerada",
          "on": "Mensalidade.create"
        },
        {
          "eventId": "pagamentoRegistrado",
          "on": "Pagamento.create"
        }
      ],
      "updatedAt": "2026-10-12T20:25:09.795Z"
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
          "entityId": "OrdenServicio",
          "kind": "entity",
          "class": "core"
        },
        {
          "entityId": "PiezaOrden",
          "kind": "entity",
          "class": "supporting"
        }
      ],
      "events": [
        {
          "eventId": "presupuestoAprobado",
          "on": "OrdenServicio.aprobarPresupuesto"
        },
        {
          "eventId": "presupuestoRechazado",
          "on": "OrdenServicio.rechazarPresupuesto"
        },
        {
          "eventId": "ordenServicioFinalizada",
          "on": "OrdenServicio.finalizar"
        }
      ],
      "updatedAt": "2026-10-12T20:29:01.147Z"
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
          "subtype": "ContactChannel",
          "roleTag": "compras.ContatoFornecedor",
          "namespace": "compras"
        },
        {
          "subtype": "Product",
          "roleTag": "compras.Produto",
          "namespace": "compras"
        },
        {
          "subtype": "Person",
          "roleTag": "compras.Comprador",
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
          "entityId": "ContatoFornecedor",
          "kind": "role",
          "mdmSubtype": "ContactChannel",
          "class": "mdm"
        },
        {
          "entityId": "Produto",
          "kind": "role",
          "mdmSubtype": "Product",
          "class": "mdm"
        },
        {
          "entityId": "Comprador",
          "kind": "role",
          "mdmSubtype": "Person",
          "class": "mdm"
        },
        {
          "entityId": "ProdutoFornecido",
          "kind": "entity",
          "class": "supporting"
        },
        {
          "entityId": "PedidoCompra",
          "kind": "entity",
          "class": "core"
        },
        {
          "entityId": "ItemPedido",
          "kind": "entity",
          "class": "supporting"
        },
        {
          "entityId": "Recebimento",
          "kind": "entity",
          "class": "event"
        },
        {
          "entityId": "PainelCompras",
          "kind": "entity",
          "class": "supporting"
        }
      ],
      "events": [
        {
          "eventId": "recebimentoCompraRegistrado",
          "on": "Recebimento.create"
        },
        {
          "eventId": "pedidoCompraRecebidoTotal",
          "on": "PedidoCompra.receberTotal"
        },
        {
          "eventId": "pedidoCompraAprovado",
          "on": "PedidoCompra.aprovar"
        }
      ],
      "updatedAt": "2026-10-12T20:34:35.305Z"
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
      "updatedAt": "2026-10-12T22:55:44.737Z"
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
      "updatedAt": "2026-10-12T22:58:55.610Z"
    }
  ]
} as const satisfies Ns4SolutionRegistryArtifact;

export type SolutionRegistryType = typeof solutionRegistry;

export default solutionRegistry;
