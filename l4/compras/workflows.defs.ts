/// <mls fileReference="_102047_/l4/compras/workflows.defs.ts" enhancement="_blank"/>

import type { Ns5WorkflowsArtifact } from '/_102035_/l2/solution/types.js';

export const comprasWorkflows = {
  "schemaVersion": "2026-09-17-ns5-workflows-v3",
  "moduleName": "compras",
  "processes": [
    {
      "processId": "submeterEDecidirPedidoDeCompra",
      "title": "Submeter e decidir pedido de compra",
      "description": "Orquestra o encaminhamento de pedidos acima do limite pelo comprador e a decisão do gerente de compras.",
      "trigger": {
        "kind": "manual",
        "actorRef": "comprador"
      },
      "tasks": [
        {
          "taskId": "submeterPedido",
          "kind": "human",
          "actorRef": "comprador",
          "journeyRef": "submeterPedidoParaAprovacao",
          "next": [
            "decidirPedido"
          ],
          "description": "O comprador abre o pedido acima do limite, submete-o para aprovação e o encaminha ao gerente de compras."
        },
        {
          "taskId": "decidirPedido",
          "kind": "human",
          "actorRef": "gerenteCompras",
          "journeyRef": "decidirPedidoSubmetido",
          "next": [],
          "description": "O gerente de compras analisa o pedido submetido e registra sua aprovação ou rejeição."
        }
      ]
    }
  ],
  "journeyDecisions": [
    {
      "journeyId": "cadastrarFornecedorEcatalogo",
      "inProcess": false
    },
    {
      "journeyId": "atualizarPrecoCombinado",
      "inProcess": false
    },
    {
      "journeyId": "enviarPedidoDentroDoLimite",
      "inProcess": false
    },
    {
      "journeyId": "submeterPedidoParaAprovacao",
      "inProcess": true,
      "processId": "submeterEDecidirPedidoDeCompra"
    },
    {
      "journeyId": "decidirPedidoSubmetido",
      "inProcess": true,
      "processId": "submeterEDecidirPedidoDeCompra"
    },
    {
      "journeyId": "registrarRecebimentoDePedido",
      "inProcess": false
    },
    {
      "journeyId": "acompanharIndicadoresDeCompras",
      "inProcess": false
    }
  ]
} as const satisfies Ns5WorkflowsArtifact;

export type ComprasWorkflowsType = typeof comprasWorkflows;

export default comprasWorkflows;
