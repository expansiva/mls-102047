/// <mls fileReference="_102047_/l4/compras/journeys/abrirEnviarPedido.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const abrirEnviarPedidoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "abrirEnviarPedido",
  "business": {
    "actorRef": "comprador",
    "title": "Abrir e enviar pedido de compra",
    "goal": "Criar um pedido de compra para um fornecedor com itens e enviá-lo.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "selecionarFornecedor",
        "kind": "locate",
        "entity": "Fornecedor",
        "title": "Selecionar fornecedor",
        "description": "O comprador escolhe o fornecedor para o qual vai comprar."
      },
      {
        "stepId": "abrirPedido",
        "kind": "act",
        "entity": "PedidoCompra",
        "effect": "create",
        "title": "Abrir pedido de compra",
        "description": "O comprador abre um pedido de compra em rascunho para o fornecedor."
      },
      {
        "stepId": "incluirItem",
        "kind": "act",
        "entity": "ItemPedido",
        "effect": "create",
        "title": "Incluir itens do pedido",
        "description": "O comprador inclui um ou mais produtos com quantidade e preço, sugerido pelo preço combinado."
      },
      {
        "stepId": "revisarPedido",
        "kind": "inspect",
        "entity": "PedidoCompra",
        "title": "Revisar pedido",
        "description": "O comprador confere itens, quantidades, preços e o valor total do pedido."
      },
      {
        "stepId": "enviarPedido",
        "kind": "act",
        "entity": "PedidoCompra",
        "effect": "transition",
        "transitionRef": "enviar",
        "title": "Enviar pedido",
        "description": "O comprador envia o pedido; acima do valor limite ele aguarda aprovação, senão segue ao fornecedor."
      },
      {
        "stepId": "encaminharAprovacao",
        "kind": "handoff",
        "entity": "PedidoCompra",
        "title": "Encaminhar para aprovação",
        "description": "Pedidos acima do valor limite são encaminhados ao gerente de compras para decisão.",
        "handoffTo": "gerenteCompras"
      }
    ],
    "outcome": {
      "statement": "O pedido de compra está enviado, aguardando aprovação ou já liberado ao fornecedor.",
      "evidence": [
        "Pedido exibe situação enviado ou aguardando aprovação",
        "Valor total do pedido calculado a partir dos itens"
      ]
    }
  },
  "businessHash": "sha256:17b45d204052afe53f9d3fca96bb3600556636ec2db41ebb4cc43ec61f24a15f"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type AbrirEnviarPedidoJourneyType = typeof abrirEnviarPedidoJourney;

export default abrirEnviarPedidoJourney;
