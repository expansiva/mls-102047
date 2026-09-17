/// <mls fileReference="_102047_/l4/compras/journeys/abrirEenviarPedidoCompra.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const abrirEenviarPedidoCompraJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "abrirEenviarPedidoCompra",
  "business": {
    "actorRef": "comprador",
    "title": "Abrir e enviar pedido de compra",
    "goal": "Solicitar a compra de um ou mais produtos de um fornecedor.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "localizarFornecedor",
        "kind": "locate",
        "entity": "Fornecedor",
        "title": "x",
        "description": "Localiza o fornecedor que atenderá o pedido."
      },
      {
        "stepId": "consultarProdutosDoFornecedor",
        "kind": "inspect",
        "entity": "ProdutoFornecedor",
        "title": "x",
        "description": "Consulta os produtos fornecidos e os preços combinados com o fornecedor."
      },
      {
        "stepId": "abrirPedido",
        "kind": "act",
        "entity": "PedidoCompra",
        "effect": "create",
        "title": "x",
        "description": "Abre o pedido para o fornecedor, informando um ou mais produtos, as quantidades e os preços aplicáveis."
      },
      {
        "stepId": "enviarPedido",
        "kind": "act",
        "entity": "PedidoCompra",
        "effect": "transition",
        "transitionRef": "enviarPedidoCompra",
        "title": "x",
        "description": "Envia o pedido de compra. Quando seu valor ultrapassa o limite, ele é encaminhado para decisão do gerente de compras."
      }
    ],
    "outcome": {
      "statement": "O pedido de compra é enviado com fornecedor, itens, quantidades e preços definidos.",
      "evidence": [
        "Pedido de compra enviado e associado ao fornecedor.",
        "Itens, quantidades e preços do pedido registrados.",
        "Pedidos acima do limite ficam disponíveis para decisão do gerente de compras."
      ]
    }
  },
  "businessHash": "sha256:222c153e638df9fb41437a993714775d39bfe916cf2c0c6c38fccab559573a52"
} as const satisfies Ns5JourneyArtifact;

export type AbrirEenviarPedidoCompraJourneyType = typeof abrirEenviarPedidoCompraJourney;

export default abrirEenviarPedidoCompraJourney;
