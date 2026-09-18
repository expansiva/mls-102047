/// <mls fileReference="_102047_/l4/controleEstoque/journeys/acompanharSaldoProdutos.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const acompanharSaldoProdutosJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "acompanharSaldoProdutos",
  "business": {
    "actorRef": "estoquista",
    "title": "Acompanhar saldos de estoque",
    "goal": "Consultar o saldo atual dos produtos para acompanhar sua disponibilidade.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "localizarProdutos",
        "kind": "locate",
        "entity": "Produto",
        "title": "Localizar produtos",
        "description": "Localiza os produtos que deseja acompanhar."
      },
      {
        "stepId": "consultarSaldos",
        "kind": "inspect",
        "entity": "Produto",
        "title": "Consultar saldos",
        "description": "Consulta o saldo atual calculado de cada produto e seu saldo mínimo definido."
      }
    ],
    "outcome": {
      "statement": "O estoquista visualiza a disponibilidade atual dos produtos.",
      "evidence": [
        "O saldo atual é exibido para cada produto consultado.",
        "Os produtos abaixo do saldo mínimo podem ser identificados."
      ]
    }
  },
  "businessHash": "sha256:60ba69fb17f04cbcb178abe9c287ef22aa13726e376325269958f4d3e8a4a6c1"
} as const satisfies Ns5JourneyArtifact;

export type AcompanharSaldoProdutosJourneyType = typeof acompanharSaldoProdutosJourney;

export default acompanharSaldoProdutosJourney;
