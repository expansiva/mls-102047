/// <mls fileReference="_102047_/l4/compras/journeys/acompanharPainelCompras.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const acompanharPainelComprasJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "acompanharPainelCompras",
  "business": {
    "actorRef": "gerenteCompras",
    "title": "Acompanhar painel de compras",
    "goal": "Ver os pedidos em aberto, os atrasados e o total comprado por fornecedor no mês.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "verPainelCompras",
        "kind": "inspect",
        "entity": "PainelCompras",
        "title": "Ver painel de compras",
        "description": "Consulta os pedidos em aberto, os atrasados e o total comprado por fornecedor no mês."
      }
    ],
    "outcome": {
      "statement": "O gerente visualiza pedidos em aberto, atrasados e o total comprado por fornecedor no mês.",
      "evidence": [
        "O painel exibe pedidos em aberto e atrasados.",
        "O painel exibe o total comprado por fornecedor no mês."
      ]
    }
  },
  "businessHash": "sha256:fcac4d4d28619505264831c3d0eb36d2fe1b279f5e797311280972f2c8844cf2"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type AcompanharPainelComprasJourneyType = typeof acompanharPainelComprasJourney;

export default acompanharPainelComprasJourney;
