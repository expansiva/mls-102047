/// <mls fileReference="_102047_/l4/compras/journeys/abrirEnviarPedido.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const abrirEnviarPedidoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "abrirEnviarPedido",
  "business": {
    "actorRef": "comprador",
    "title": "Abrir e enviar pedido de compra",
    "goal": "Montar um pedido de compra para um fornecedor com produtos, quantidades e preços e enviá-lo.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "abrirPedido",
        "kind": "act",
        "entity": "PedidoCompra",
        "effect": "create",
        "title": "Abrir pedido de compra",
        "description": "O comprador escolhe o fornecedor e abre um novo pedido em rascunho."
      },
      {
        "stepId": "incluirItem",
        "kind": "act",
        "entity": "ItemPedido",
        "effect": "create",
        "title": "Incluir itens do pedido",
        "description": "O comprador adiciona um ou mais produtos com quantidade e preço, sugerido pelo preço combinado."
      },
      {
        "stepId": "revisarPedido",
        "kind": "inspect",
        "entity": "PedidoCompra",
        "title": "Revisar pedido",
        "description": "O comprador confere itens e valor total do pedido."
      },
      {
        "stepId": "enviarPedido",
        "kind": "act",
        "entity": "PedidoCompra",
        "effect": "transition",
        "transitionRef": "enviar",
        "title": "Enviar pedido",
        "description": "O comprador envia o pedido; acima do valor limite ele aguarda aprovação do gerente, senão segue ao fornecedor."
      },
      {
        "stepId": "encaminharAprovacao",
        "kind": "handoff",
        "entity": "PedidoCompra",
        "title": "Encaminhar para aprovação",
        "description": "Pedidos acima do valor limite ficam com o gerente de compras para decisão.",
        "handoffTo": "gerenteCompras"
      }
    ],
    "outcome": {
      "statement": "O pedido foi enviado ao fornecedor ou aguarda aprovação do gerente.",
      "evidence": [
        "O pedido aparece com situação enviado ou aguardando aprovação e seu valor total."
      ]
    }
  },
  "businessHash": "sha256:bb2e39215de84edeb8734aa36f1fd5529b20ee8ca2c644c5717317bffae6ada8"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type AbrirEnviarPedidoJourneyType = typeof abrirEnviarPedidoJourney;

export default abrirEnviarPedidoJourney;
