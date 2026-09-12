/// <mls fileReference="_102047_/l4/compras/journeys/abrirEenviarPedidoCompra.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const abrirEenviarPedidoCompraJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "abrirEenviarPedidoCompra",
  "business": {
    "actorRef": "comprador",
    "title": "Abrir e enviar pedido de compra",
    "goal": "Criar um pedido para um fornecedor com os produtos, quantidades e preços necessários e enviá-lo para processamento.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "localizarFornecedor",
        "kind": "locate",
        "entity": "Fornecedor",
        "title": "x",
        "description": "Localiza o fornecedor para o qual o pedido será aberto."
      },
      {
        "stepId": "consultarOfertas",
        "kind": "inspect",
        "entity": "OfertaFornecedor",
        "title": "x",
        "description": "Consulta os produtos fornecidos e os preços combinados para compor o pedido."
      },
      {
        "stepId": "abrirPedido",
        "kind": "act",
        "entity": "PedidoCompra",
        "effect": "create",
        "title": "x",
        "description": "Cria o pedido com um ou mais produtos, suas quantidades e preços."
      },
      {
        "stepId": "enviarPedido",
        "kind": "act",
        "entity": "PedidoCompra",
        "effect": "transition",
        "transitionRef": "enviarPedido",
        "title": "x",
        "description": "Envia o pedido de compra para processamento."
      },
      {
        "stepId": "encaminharParaAprovacao",
        "kind": "handoff",
        "entity": "PedidoCompra",
        "title": "x",
        "description": "Encaminha o pedido ao gerente de compras quando o valor exige aprovação.",
        "handoffTo": "gerenteCompras"
      }
    ],
    "outcome": {
      "statement": "O pedido de compra é enviado e, quando exigido pelo valor, fica disponível para decisão do gerente de compras.",
      "evidence": [
        "Pedido registra fornecedor, itens, quantidades e preços.",
        "Pedido consta como enviado ou aguardando aprovação, conforme o valor."
      ]
    }
  },
  "businessHash": "sha256:e30aad8ce3480a9ca0086e8442abcfa8ab2dfcd745bf26791fb1988115b856ed"
} as const satisfies Ns5JourneyArtifact;

export type AbrirEenviarPedidoCompraJourneyType = typeof abrirEenviarPedidoCompraJourney;

export default abrirEenviarPedidoCompraJourney;
