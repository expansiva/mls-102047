/// <mls fileReference="_102047_/l4/compras/journeys/acompanharIndicadoresDeCompras.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const acompanharIndicadoresDeComprasJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "acompanharIndicadoresDeCompras",
  "business": {
    "actorRef": "gerenteCompras",
    "title": "Acompanhar indicadores de compras",
    "goal": "Monitorar pedidos em aberto, atrasados e o total comprado por fornecedor no mês.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "localizarPedidosParaAcompanhamento",
        "kind": "locate",
        "entity": "PedidoCompra",
        "title": "x",
        "description": "Acessa os pedidos de compra da organização para acompanhamento dos pedidos em aberto e atrasados."
      },
      {
        "stepId": "consultarIndicadoresDePedidos",
        "kind": "inspect",
        "entity": "PedidoCompra",
        "title": "x",
        "description": "Consulta os indicadores de pedidos em aberto e atrasados no painel de compras."
      },
      {
        "stepId": "consultarTotalMensalPorFornecedor",
        "kind": "inspect",
        "entity": "Fornecedor",
        "title": "x",
        "description": "Consulta no painel o total comprado de cada fornecedor no mês."
      }
    ],
    "outcome": {
      "statement": "O gerente dispõe dos indicadores atuais para acompanhar a situação das compras e os valores comprados por fornecedor.",
      "evidence": [
        "Quantidade ou lista de pedidos em aberto apresentada.",
        "Quantidade ou lista de pedidos atrasados apresentada.",
        "Total comprado no mês apresentado por fornecedor."
      ]
    }
  },
  "businessHash": "sha256:08224fafae3e538973018092310a3f67b9bf04d16af95a1cc9864930cf75f975"
} as const satisfies Ns5JourneyArtifact;

export type AcompanharIndicadoresDeComprasJourneyType = typeof acompanharIndicadoresDeComprasJourney;

export default acompanharIndicadoresDeComprasJourney;
