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
        "stepId": "localizarPedidos",
        "kind": "locate",
        "entity": "PurchaseOrder",
        "title": "Localizar pedidos para acompanhamento",
        "description": "Consulta os pedidos de compra em aberto e os pedidos atrasados."
      },
      {
        "stepId": "inspecionarIndicadoresPedidos",
        "kind": "inspect",
        "entity": "PurchaseOrder",
        "title": "Inspecionar indicadores de pedidos",
        "description": "Analisa os indicadores de pedidos em aberto e atrasados."
      },
      {
        "stepId": "inspecionarTotaisPorFornecedor",
        "kind": "inspect",
        "entity": "Supplier",
        "title": "Inspecionar totais por fornecedor",
        "description": "Analisa o total comprado de cada fornecedor no mês."
      }
    ],
    "outcome": {
      "statement": "O gerente de compras visualiza a situação dos pedidos e os totais mensais por fornecedor.",
      "evidence": [
        "Relação de pedidos em aberto disponível.",
        "Relação de pedidos atrasados disponível.",
        "Total comprado por fornecedor no mês disponível."
      ]
    }
  },
  "businessHash": "sha256:07ee9f4789f3c98d88896815e06d7b87714ec9726c3e13a0e97752f1e2c93342"
} as const satisfies Ns5JourneyArtifact;

export type AcompanharIndicadoresComprasJourneyType = typeof acompanharIndicadoresComprasJourney;

export default acompanharIndicadoresComprasJourney;
