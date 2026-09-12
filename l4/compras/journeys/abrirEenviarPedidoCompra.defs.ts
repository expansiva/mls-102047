/// <mls fileReference="_102047_/l4/compras/journeys/abrirEenviarPedidoCompra.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const abrirEenviarPedidoCompraJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "abrirEenviarPedidoCompra",
  "business": {
    "actorRef": "comprador",
    "title": "Abrir e enviar pedido de compra",
    "goal": "Emitir um pedido para um fornecedor com os produtos, quantidades e preços necessários.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "selecionarFornecedor",
        "kind": "locate",
        "entity": "Supplier",
        "title": "Selecionar fornecedor",
        "description": "Localiza e seleciona o fornecedor que receberá o pedido."
      },
      {
        "stepId": "selecionarProdutos",
        "kind": "locate",
        "entity": "Product",
        "title": "Selecionar produtos",
        "description": "Localiza os produtos que serão incluídos no pedido."
      },
      {
        "stepId": "abrirPedido",
        "kind": "act",
        "entity": "PurchaseOrder",
        "affects": [
          "PurchaseOrderItem"
        ],
        "title": "Abrir pedido de compra",
        "description": "Cria o pedido com um ou mais produtos, suas quantidades e preços."
      },
      {
        "stepId": "enviarPedido",
        "kind": "act",
        "entity": "PurchaseOrder",
        "title": "Enviar pedido",
        "description": "Envia o pedido de compra para o fluxo de atendimento e aprovação aplicável."
      }
    ],
    "outcome": {
      "statement": "O pedido de compra é enviado com fornecedor, itens, quantidades e preços definidos.",
      "evidence": [
        "Pedido de compra identificado e enviado.",
        "Itens do pedido registram produto, quantidade e preço.",
        "Pedidos acima do valor limite ficam disponíveis para decisão do gerente de compras."
      ]
    }
  },
  "businessHash": "sha256:cd919a29a46886693955cc7ae4f53dbfc341cdec3d238ab0975d8804129de487"
} as const satisfies Ns5JourneyArtifact;

export type AbrirEenviarPedidoCompraJourneyType = typeof abrirEenviarPedidoCompraJourney;

export default abrirEenviarPedidoCompraJourney;
