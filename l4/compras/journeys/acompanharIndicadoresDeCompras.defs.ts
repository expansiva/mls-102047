/// <mls fileReference="_102047_/l4/compras/journeys/acompanharIndicadoresDeCompras.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const acompanharIndicadoresDeComprasJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "acompanharIndicadoresDeCompras",
  "business": {
    "actorRef": "gerenteCompras",
    "title": "Acompanhar indicadores de compras",
    "goal": "Visualizar os pedidos em aberto, os pedidos atrasados e o total comprado por fornecedor no mês.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "localizarPedidosParaAcompanhamento",
        "kind": "locate",
        "entity": "PedidoCompra",
        "title": "x",
        "description": "Acessa os pedidos de compra relevantes para o acompanhamento."
      },
      {
        "stepId": "inspecionarIndicadoresDePedidos",
        "kind": "inspect",
        "entity": "PedidoCompra",
        "title": "x",
        "description": "Consulta os indicadores de pedidos em aberto, pedidos atrasados e total comprado por fornecedor no mês."
      }
    ],
    "outcome": {
      "statement": "O gerente de compras dispõe dos indicadores atuais para acompanhar o andamento e o volume das compras.",
      "evidence": [
        "Indicador de pedidos em aberto é exibido.",
        "Indicador de pedidos atrasados é exibido.",
        "Total comprado por fornecedor no mês é exibido."
      ]
    }
  },
  "businessHash": "sha256:d157fe0e07779cb3a591d862b828c45fc45bdee0c246a38d744d82a187eb1272"
} as const satisfies Ns5JourneyArtifact;

export type AcompanharIndicadoresDeComprasJourneyType = typeof acompanharIndicadoresDeComprasJourney;

export default acompanharIndicadoresDeComprasJourney;
