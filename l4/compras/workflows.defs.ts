/// <mls fileReference="_102047_/l4/compras/workflows.defs.ts" enhancement="_blank"/>

import type { Ns5WorkflowsArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const comprasWorkflows = {
  "schemaVersion": "2026-09-17-ns5-workflows-v3",
  "moduleName": "compras",
  "processes": [
    {
      "processId": "cicloPedidoCompra",
      "title": "Ciclo do pedido de compra",
      "description": "Do pedido montado e enviado pelo comprador, passando pela aprovação do gerente de compras quando acima do valor limite, até o recebimento total ou parcial registrado pelo almoxarife.",
      "trigger": {
        "kind": "manual",
        "actorRef": "comprador"
      },
      "tasks": [
        {
          "taskId": "montarEnviarPedido",
          "kind": "human",
          "actorRef": "comprador",
          "journeyRef": "abrirEnviarPedido",
          "next": [
            "decidirAprovacao",
            "aguardarChegada"
          ],
          "description": "O comprador monta o pedido para o fornecedor e o envia; acima do valor limite o pedido segue para o gerente de compras, senão vai direto ao fornecedor."
        },
        {
          "taskId": "decidirAprovacao",
          "kind": "human",
          "actorRef": "gerenteCompras",
          "journeyRef": "aprovarPedido",
          "next": [
            "aguardarChegada"
          ],
          "description": "O gerente de compras aprova ou rejeita o pedido acima do valor limite; o pedido rejeitado encerra o ciclo."
        },
        {
          "taskId": "aguardarChegada",
          "kind": "wait",
          "next": [
            "receberPedido"
          ],
          "description": "Aguarda a chegada dos produtos do pedido enviado ou aprovado ao almoxarifado."
        },
        {
          "taskId": "receberPedido",
          "kind": "human",
          "actorRef": "almoxarife",
          "journeyRef": "registrarRecebimento",
          "next": [
            "aguardarChegada"
          ],
          "description": "O almoxarife registra o recebimento total ou parcial, dando entrada no estoque; se ficar saldo pendente, volta a aguardar a próxima entrega."
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
      "journeyId": "cadastrarProdutoFornecido",
      "inProcess": false
    },
    {
      "journeyId": "abrirEnviarPedido",
      "inProcess": true,
      "processId": "cicloPedidoCompra"
    },
    {
      "journeyId": "aprovarPedido",
      "inProcess": true,
      "processId": "cicloPedidoCompra"
    },
    {
      "journeyId": "registrarRecebimento",
      "inProcess": true,
      "processId": "cicloPedidoCompra"
    },
    {
      "journeyId": "acompanharPainel",
      "inProcess": false
    }
  ]
} as const satisfies Ns5Readonly<Ns5WorkflowsArtifact>;

export type ComprasWorkflowsType = typeof comprasWorkflows;

export default comprasWorkflows;
