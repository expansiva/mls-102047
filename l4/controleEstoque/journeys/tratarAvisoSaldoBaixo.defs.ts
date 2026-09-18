/// <mls fileReference="_102047_/l4/controleEstoque/journeys/tratarAvisoSaldoBaixo.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const tratarAvisoSaldoBaixoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "tratarAvisoSaldoBaixo",
  "business": {
    "actorRef": "estoquista",
    "title": "Verificar aviso de saldo baixo",
    "goal": "Identificar um produto cujo saldo caiu abaixo do mínimo e acompanhar sua situação.",
    "entry": {
      "mode": "fromNotification"
    },
    "steps": [
      {
        "stepId": "consultarProdutoAvisado",
        "kind": "inspect",
        "entity": "Produto",
        "title": "Consultar produto avisado",
        "description": "Consulta o produto indicado no aviso, seu saldo atual e o saldo mínimo configurado."
      },
      {
        "stepId": "consultarMovimentacoesProduto",
        "kind": "inspect",
        "entity": "MovimentacaoEstoque",
        "title": "Consultar movimentações do produto",
        "description": "Consulta as movimentações já registradas do produto para acompanhar a origem do saldo atual."
      }
    ],
    "outcome": {
      "statement": "O estoquista confirma a situação de saldo baixo do produto avisado.",
      "evidence": [
        "O produto exibido no aviso apresenta saldo atual abaixo do saldo mínimo.",
        "As movimentações registradas do produto podem ser consultadas sem alteração."
      ]
    }
  },
  "businessHash": "sha256:59ee82bacd0f09985559760d7b0552822aa0d8025e526a4777fd99ba716af4b4"
} as const satisfies Ns5JourneyArtifact;

export type TratarAvisoSaldoBaixoJourneyType = typeof tratarAvisoSaldoBaixoJourney;

export default tratarAvisoSaldoBaixoJourney;
