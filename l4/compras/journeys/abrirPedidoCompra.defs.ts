/// <mls fileReference="_102047_/l4/compras/journeys/abrirPedidoCompra.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const abrirPedidoCompraJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "abrirPedidoCompra",
  "business": {
    "actorRef": "comprador",
    "title": "Abrir pedido de compra",
    "goal": "Abrir um pedido de compra para um fornecedor com produtos, quantidades e preços e enviá-lo.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarFornecedorPedido",
        "kind": "locate",
        "entity": "Fornecedor",
        "title": "Localizar fornecedor",
        "description": "Encontra o fornecedor já em mãos ou busca o registro para o qual o pedido será aberto."
      },
      {
        "stepId": "montarPedido",
        "kind": "act",
        "entity": "PedidoCompra",
        "effect": "create",
        "title": "Montar pedido de compra",
        "description": "Abre o pedido para o fornecedor com um ou mais produtos, quantidade e preço."
      },
      {
        "stepId": "conferirPedidoMontado",
        "kind": "inspect",
        "entity": "PedidoCompra",
        "title": "Conferir pedido montado",
        "description": "Revisa fornecedor, itens, quantidades e preços antes de enviar o pedido."
      },
      {
        "stepId": "enviarPedido",
        "kind": "act",
        "entity": "PedidoCompra",
        "effect": "transition",
        "transitionRef": "enviar",
        "title": "Enviar pedido de compra",
        "description": "Envia o pedido de compra para seguir o fluxo de aprovação e atendimento."
      },
      {
        "stepId": "encaminharAprovacao",
        "kind": "handoff",
        "entity": "PedidoCompra",
        "title": "Encaminhar para aprovação",
        "description": "Encaminha o pedido ao gerente de compras quando o valor ultrapassa o limite.",
        "handoffTo": "gerenteCompras"
      }
    ],
    "outcome": {
      "statement": "O pedido de compra é enviado com fornecedor, produtos, quantidades e preços e segue para o gerente quando excede o limite.",
      "evidence": [
        "O pedido consta como enviado com os itens informados.",
        "O gerente de compras recebe o pedido acima do limite para decidir."
      ]
    }
  },
  "businessHash": "sha256:4db3dd6f40c06952137083304fb647536a4ce92c7eaeb31328e79baaec8ce8ed"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type AbrirPedidoCompraJourneyType = typeof abrirPedidoCompraJourney;

export default abrirPedidoCompraJourney;
