/// <mls fileReference="_102047_/l4/compras/journeys/acompanharIndicadoresDeCompras.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const acompanharIndicadoresDeComprasJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "acompanharIndicadoresDeCompras",
  "business": {
    "actorRef": "gerenteCompras",
    "title": "Acompanhar indicadores de compras",
    "goal": "Visualizar pedidos em aberto, pedidos atrasados e o total comprado por fornecedor no mês.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "localizarPedidosParaIndicadores",
        "kind": "locate",
        "entity": "PurchaseOrder",
        "title": "Localizar pedidos para indicadores",
        "description": "Acessa os pedidos de compra da organização para compor os indicadores."
      },
      {
        "stepId": "inspecionarIndicadoresDePedidos",
        "kind": "inspect",
        "entity": "PurchaseOrder",
        "title": "Consultar indicadores de pedidos",
        "description": "Consulta o painel com pedidos em aberto, pedidos atrasados e total comprado por fornecedor no mês."
      }
    ],
    "outcome": {
      "statement": "O gerente tem uma visão atual dos pedidos pendentes, atrasados e dos valores comprados por fornecedor no mês.",
      "evidence": [
        "Indicador de pedidos em aberto exibido.",
        "Indicador de pedidos atrasados exibido.",
        "Total comprado por fornecedor no mês exibido."
      ]
    }
  },
  "businessHash": "sha256:7b765c7fbd8ef8c79ec1de7c2e06f8286c059fcc0ead9728936e39879060af77"
} as const satisfies Ns5JourneyArtifact;

export type AcompanharIndicadoresDeComprasJourneyType = typeof acompanharIndicadoresDeComprasJourney;

export default acompanharIndicadoresDeComprasJourney;
