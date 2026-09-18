/// <mls fileReference="_102047_/l4/compras/journeys/acompanharIndicadoresCompras.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const acompanharIndicadoresComprasJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "acompanharIndicadoresCompras",
  "business": {
    "actorRef": "gerenteCompras",
    "title": "Acompanhar indicadores de compras",
    "goal": "Acompanhar pedidos em aberto, atrasados e o total comprado por fornecedor no mês.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "localizarPedidosParaIndicadores",
        "kind": "locate",
        "entity": "PurchaseOrder",
        "title": "Localizar pedidos",
        "description": "Recupera os pedidos de compra relevantes para o período de acompanhamento."
      },
      {
        "stepId": "inspecionarIndicadoresCompras",
        "kind": "inspect",
        "entity": "PurchaseOrder",
        "title": "Inspecionar indicadores de compras",
        "description": "Consulta os indicadores de pedidos em aberto, pedidos atrasados e total comprado por fornecedor no mês."
      }
    ],
    "outcome": {
      "statement": "O gerente obtém uma visão atual dos indicadores de compras.",
      "evidence": [
        "Quantidade de pedidos em aberto apresentada.",
        "Quantidade de pedidos atrasados apresentada.",
        "Total comprado por fornecedor no mês apresentado."
      ]
    }
  },
  "businessHash": "sha256:ad62670d6eb23624ebfb0ba2ff8194e3bf231b3d24c0812f0dbf6f55f3a3c102"
} as const satisfies Ns5JourneyArtifact;

export type AcompanharIndicadoresComprasJourneyType = typeof acompanharIndicadoresComprasJourney;

export default acompanharIndicadoresComprasJourney;
