/// <mls fileReference="_102047_/l4/compras/workflows.defs.ts" enhancement="_blank"/>

import type { Ns5WorkflowsArtifact } from '/_102035_/l2/solution/types.js';

export const comprasWorkflows = {
  "schemaVersion": "2026-09-12-ns5-workflows-v2",
  "moduleName": "compras",
  "processes": [
    {
      "processId": "aprovarEReceberPedidoCompra",
      "title": "Aprovação e recebimento de pedido de compra",
      "description": "Orquestra o encaminhamento de pedidos que exigem aprovação e seu recebimento após a chegada.",
      "trigger": {
        "kind": "manual",
        "actorRef": "comprador"
      },
      "tasks": [
        {
          "taskId": "abrirEnviarPedido",
          "kind": "human",
          "actorRef": "comprador",
          "journeyRef": "abrirEenviarPedidoCompra",
          "next": [
            "aprovarPedido"
          ],
          "description": "O comprador abre e envia o pedido, encaminhando ao gerente os pedidos cujo valor exige aprovação."
        },
        {
          "taskId": "aprovarPedido",
          "kind": "human",
          "actorRef": "gerenteCompras",
          "journeyRef": "aprovarPedidoAcimaDoLimite",
          "next": [
            "aguardarChegadaPedido"
          ],
          "description": "O gerente de compras avalia e aprova o pedido encaminhado para que ele possa ser recebido."
        },
        {
          "taskId": "aguardarChegadaPedido",
          "kind": "wait",
          "next": [
            "registrarRecebimento"
          ],
          "description": "Aguarda a chegada do pedido aprovado ao almoxarifado."
        },
        {
          "taskId": "registrarRecebimento",
          "kind": "human",
          "actorRef": "almoxarife",
          "journeyRef": "registrarRecebimentoDePedido",
          "next": [
            "aguardarNovoRecebimento"
          ],
          "description": "O almoxarife registra o recebimento total ou parcial e dá entrada no estoque dos produtos recebidos."
        },
        {
          "taskId": "aguardarNovoRecebimento",
          "kind": "wait",
          "next": [
            "registrarRecebimento"
          ],
          "description": "Aguarda uma nova entrega quando ainda houver itens pendentes de recebimento."
        }
      ]
    }
  ],
  "journeyDecisions": [
    {
      "journeyId": "cadastrarFornecedorEoferta",
      "inProcess": false
    },
    {
      "journeyId": "abrirEenviarPedidoCompra",
      "inProcess": true,
      "processId": "aprovarEReceberPedidoCompra"
    },
    {
      "journeyId": "aprovarPedidoAcimaDoLimite",
      "inProcess": true,
      "processId": "aprovarEReceberPedidoCompra"
    },
    {
      "journeyId": "rejeitarPedidoAcimaDoLimite",
      "inProcess": false
    },
    {
      "journeyId": "registrarRecebimentoDePedido",
      "inProcess": true,
      "processId": "aprovarEReceberPedidoCompra"
    },
    {
      "journeyId": "acompanharIndicadoresDeCompras",
      "inProcess": false
    }
  ]
} as const satisfies Ns5WorkflowsArtifact;

export type ComprasWorkflowsType = typeof comprasWorkflows;

export default comprasWorkflows;
