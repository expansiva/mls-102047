/// <mls fileReference="_102047_/l4/compras/workflows.defs.ts" enhancement="_blank"/>

import type { Ns5WorkflowsArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const comprasWorkflows = {
  "schemaVersion": "2026-09-17-ns5-workflows-v3",
  "moduleName": "compras",
  "processes": [
    {
      "processId": "fluxoAprovacaoPedido",
      "title": "Aprovar pedido de compra acima do limite",
      "description": "O comprador abre e envia o pedido de compra e, quando o valor ultrapassa o limite, o gerente de compras aprova ou rejeita.",
      "trigger": {
        "kind": "manual",
        "actorRef": "comprador"
      },
      "tasks": [
        {
          "taskId": "abrirEEnviarPedido",
          "kind": "human",
          "actorRef": "comprador",
          "journeyRef": "abrirPedidoCompra",
          "next": [
            "decidirAprovacao"
          ],
          "description": "O comprador abre o pedido de compra para um fornecedor com produtos, quantidades e preços e o envia."
        },
        {
          "taskId": "decidirAprovacao",
          "kind": "human",
          "actorRef": "gerenteCompras",
          "journeyRef": "aprovarPedidoCompra",
          "next": [],
          "description": "O gerente de compras analisa o pedido acima do limite e decide aprovar ou rejeitar."
        }
      ]
    }
  ],
  "journeyDecisions": [
    {
      "journeyId": "cadastrarFornecedor",
      "inProcess": false
    },
    {
      "journeyId": "cadastrarOfertaFornecedor",
      "inProcess": false
    },
    {
      "journeyId": "abrirPedidoCompra",
      "inProcess": true,
      "processId": "fluxoAprovacaoPedido"
    },
    {
      "journeyId": "aprovarPedidoCompra",
      "inProcess": true,
      "processId": "fluxoAprovacaoPedido"
    },
    {
      "journeyId": "registrarRecebimento",
      "inProcess": false
    },
    {
      "journeyId": "acompanharPainelCompras",
      "inProcess": false
    }
  ]
} as const satisfies Ns5Readonly<Ns5WorkflowsArtifact>;

export type ComprasWorkflowsType = typeof comprasWorkflows;

export default comprasWorkflows;
