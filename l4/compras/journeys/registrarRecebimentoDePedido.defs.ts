/// <mls fileReference="_102047_/l4/compras/journeys/registrarRecebimentoDePedido.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const registrarRecebimentoDePedidoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "registrarRecebimentoDePedido",
  "business": {
    "actorRef": "almoxarife",
    "title": "Registrar recebimento total ou parcial",
    "goal": "Registrar os produtos efetivamente recebidos de um pedido e dar entrada no estoque.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarPedidoEnviado",
        "kind": "locate",
        "entity": "PurchaseOrder",
        "title": "Localizar pedido enviado",
        "description": "Abre o pedido associado à entrega recebida ou o localiza entre os pedidos enviados."
      },
      {
        "stepId": "inspecionarItensPendentes",
        "kind": "inspect",
        "entity": "PurchaseOrder",
        "title": "Consultar itens pendentes",
        "description": "Consulta os itens, as quantidades pedidas e os saldos ainda pendentes de recebimento."
      },
      {
        "stepId": "registrarRecebimento",
        "kind": "act",
        "entity": "GoodsReceipt",
        "effect": "create",
        "title": "Registrar recebimento",
        "description": "Registra o recebimento total ou parcial com as quantidades efetivamente entregues; os produtos recebidos dão entrada no estoque e o pedido mantém eventual saldo pendente."
      }
    ],
    "outcome": {
      "statement": "O recebimento é registrado e o estoque recebe entrada apenas das quantidades efetivamente recebidas.",
      "evidence": [
        "Recebimento vinculado ao pedido com quantidades recebidas.",
        "Entrada de estoque registrada para os produtos recebidos."
      ]
    }
  },
  "businessHash": "sha256:a608f185a86eff0add17bf4cc5205d0a6814bb11a442ba7bb8918ce8e69bc3ae"
} as const satisfies Ns5JourneyArtifact;

export type RegistrarRecebimentoDePedidoJourneyType = typeof registrarRecebimentoDePedidoJourney;

export default registrarRecebimentoDePedidoJourney;
