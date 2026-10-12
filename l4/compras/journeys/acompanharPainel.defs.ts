/// <mls fileReference="_102047_/l4/compras/journeys/acompanharPainel.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const acompanharPainelJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "acompanharPainel",
  "business": {
    "actorRef": "gerenteCompras",
    "title": "Acompanhar painel de compras",
    "goal": "Ver pedidos em aberto, atrasados e o total comprado por fornecedor no mês.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "verPainel",
        "kind": "inspect",
        "entity": "PainelCompras",
        "title": "Ver painel de compras",
        "description": "O gerente vê a quantidade de pedidos em aberto, atrasados e o total comprado por fornecedor no mês."
      },
      {
        "stepId": "listarAtrasados",
        "kind": "locate",
        "entity": "PedidoCompra",
        "title": "Listar pedidos atrasados",
        "description": "O gerente abre os pedidos em aberto ou atrasados a partir do painel."
      },
      {
        "stepId": "verPedido",
        "kind": "inspect",
        "entity": "PedidoCompra",
        "title": "Ver detalhes do pedido",
        "description": "O gerente consulta fornecedor, itens, previsão de entrega e recebimentos."
      }
    ],
    "outcome": {
      "statement": "O gerente conhece a situação das compras do mês.",
      "evidence": [
        "O painel exibe pedidos em aberto, atrasados e total por fornecedor no mês."
      ]
    }
  },
  "businessHash": "sha256:e17f32b0a20883a0e4a6c183739cd8c7e4eabb33c5e074134df8e77afc0fc3d2"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type AcompanharPainelJourneyType = typeof acompanharPainelJourney;

export default acompanharPainelJourney;
