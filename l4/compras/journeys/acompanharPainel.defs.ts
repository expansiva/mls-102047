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
        "stepId": "abrirPainel",
        "kind": "inspect",
        "entity": "PainelCompras",
        "title": "Abrir painel de compras",
        "description": "O gerente vê os indicadores de pedidos em aberto, atrasados e total comprado por fornecedor no mês."
      },
      {
        "stepId": "listarAtrasados",
        "kind": "locate",
        "entity": "PedidoCompra",
        "title": "Listar pedidos atrasados",
        "description": "O gerente filtra os pedidos em aberto ou atrasados."
      },
      {
        "stepId": "detalharPedido",
        "kind": "inspect",
        "entity": "PedidoCompra",
        "title": "Detalhar pedido",
        "description": "O gerente abre um pedido para ver itens, fornecedor e recebimentos."
      }
    ],
    "outcome": {
      "statement": "O gerente conhece a situação dos pedidos e o volume comprado por fornecedor no mês.",
      "evidence": [
        "Contagem de pedidos em aberto e atrasados exibida",
        "Total comprado no mês por fornecedor exibido"
      ]
    }
  },
  "businessHash": "sha256:ba482c6dcb5050deac9986961d3d337b72207b17804f3caf82eb9b9472613b3e"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type AcompanharPainelJourneyType = typeof acompanharPainelJourney;

export default acompanharPainelJourney;
