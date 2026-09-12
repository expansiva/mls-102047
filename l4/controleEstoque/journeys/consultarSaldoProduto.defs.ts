/// <mls fileReference="_102047_/l4/controleEstoque/journeys/consultarSaldoProduto.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const consultarSaldoProdutoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "consultarSaldoProduto",
  "business": {
    "actorRef": "estoquista",
    "title": "Consultar saldo de produto",
    "goal": "Verificar o saldo atual de um produto para acompanhar sua disponibilidade.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarProduto",
        "kind": "locate",
        "entity": "Product",
        "title": "Localizar produto",
        "description": "Localiza o produto cujo estoque será consultado."
      },
      {
        "stepId": "consultarSaldo",
        "kind": "inspect",
        "entity": "Product",
        "title": "Consultar saldo atual",
        "description": "Visualiza o saldo atual e o estoque mínimo definido para o produto."
      }
    ],
    "outcome": {
      "statement": "O estoquista conhece a disponibilidade atual do produto.",
      "evidence": [
        "Saldo atual do produto apresentado.",
        "Estoque mínimo do produto apresentado."
      ]
    }
  },
  "businessHash": "sha256:005b985f096812378eb55a80bca205388a43ec7fcd0e1d2a5dcfdd9103058def"
} as const satisfies Ns5JourneyArtifact;

export type ConsultarSaldoProdutoJourneyType = typeof consultarSaldoProdutoJourney;

export default consultarSaldoProdutoJourney;
