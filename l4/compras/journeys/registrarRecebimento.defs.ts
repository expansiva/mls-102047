/// <mls fileReference="_102047_/l4/compras/journeys/registrarRecebimento.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const registrarRecebimentoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "registrarRecebimento",
  "business": {
    "actorRef": "almoxarife",
    "title": "Registrar recebimento de pedido",
    "goal": "Registrar a chegada total ou parcial de um pedido e dar entrada no estoque.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarPedido",
        "kind": "locate",
        "entity": "PedidoCompra",
        "title": "Localizar pedido",
        "description": "O almoxarife localiza o pedido aprovado pelo número ou fornecedor."
      },
      {
        "stepId": "conferirItens",
        "kind": "inspect",
        "entity": "PedidoCompra",
        "title": "Conferir itens pedidos",
        "description": "O almoxarife confere os itens e quantidades pendentes de recebimento."
      },
      {
        "stepId": "registrarRecebimento",
        "kind": "act",
        "entity": "Recebimento",
        "effect": "create",
        "title": "Registrar recebimento",
        "description": "O almoxarife informa as quantidades recebidas de cada item, o que dá entrada no estoque dos produtos e marca o pedido como recebido parcial ou totalmente."
      },
      {
        "stepId": "verSituacao",
        "kind": "inspect",
        "entity": "PedidoCompra",
        "title": "Ver situação do pedido",
        "description": "O almoxarife confere se o pedido ficou recebido total ou parcialmente."
      }
    ],
    "outcome": {
      "statement": "O recebimento está registrado e o estoque dos produtos recebidos foi acrescido.",
      "evidence": [
        "Recebimento listado no pedido com quantidades recebidas",
        "Pedido exibe situação recebido parcial ou total",
        "Estoque dos produtos aumentado nas quantidades recebidas"
      ]
    }
  },
  "businessHash": "sha256:d68f33ffb7caee955d1247b1d73afc4f112a844b41295bcaa02205d6aabd13be"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type RegistrarRecebimentoJourneyType = typeof registrarRecebimentoJourney;

export default registrarRecebimentoJourney;
