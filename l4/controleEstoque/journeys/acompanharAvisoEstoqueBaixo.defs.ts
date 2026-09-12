/// <mls fileReference="_102047_/l4/controleEstoque/journeys/acompanharAvisoEstoqueBaixo.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const acompanharAvisoEstoqueBaixoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "acompanharAvisoEstoqueBaixo",
  "business": {
    "actorRef": "estoquista",
    "title": "Acompanhar aviso de estoque baixo",
    "goal": "Identificar um produto cujo saldo está abaixo do mínimo para tomar providências de reposição.",
    "entry": {
      "mode": "fromNotification"
    },
    "steps": [
      {
        "stepId": "consultarProdutoAlertado",
        "kind": "inspect",
        "entity": "Product",
        "title": "Consultar produto alertado",
        "description": "Examina o produto indicado no aviso, seu saldo atual e seu estoque mínimo."
      },
      {
        "stepId": "consultarMovimentacoes",
        "kind": "inspect",
        "entity": "StockMovement",
        "title": "Consultar movimentações",
        "description": "Consulta as entradas e saídas registradas que compõem o saldo do produto."
      }
    ],
    "outcome": {
      "statement": "O estoquista identifica o produto com saldo abaixo do mínimo e dispõe das informações para providenciar sua reposição.",
      "evidence": [
        "Aviso de saldo abaixo do mínimo associado ao produto.",
        "Saldo atual, estoque mínimo e movimentações do produto consultados."
      ]
    }
  },
  "businessHash": "sha256:7c300d26d35dc04701f0c963687f316fc0efdbcf6d942f5971be9ed6d04887b1"
} as const satisfies Ns5JourneyArtifact;

export type AcompanharAvisoEstoqueBaixoJourneyType = typeof acompanharAvisoEstoqueBaixoJourney;

export default acompanharAvisoEstoqueBaixoJourney;
