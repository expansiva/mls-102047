/// <mls fileReference="_102047_/l4/financeiro/journeys/processarPagamentoPorCartao.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const processarPagamentoPorCartaoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "processarPagamentoPorCartao",
  "business": {
    "actorRef": "stripe",
    "title": "Processar pagamento por cartão",
    "goal": "Processar uma cobrança por cartão recebida do módulo financeiro.",
    "entry": {
      "mode": "fromNotification"
    },
    "steps": [
      {
        "stepId": "inspecionarSolicitacaoDeCartao",
        "kind": "inspect",
        "entity": "Recebimento",
        "title": "Inspecionar solicitação de cartão",
        "description": "Inspecionar a solicitação de recebimento por cartão encaminhada para processamento."
      },
      {
        "stepId": "confirmarPagamentoComCartao",
        "kind": "act",
        "entity": "Recebimento",
        "affects": [
          "TituloReceber"
        ],
        "effect": "transition",
        "transitionRef": "confirmarPagamentoComCartao",
        "title": "Confirmar pagamento com cartão",
        "description": "Confirmar o pagamento por cartão processado."
      }
    ],
    "outcome": {
      "statement": "O pagamento por cartão confirmado é refletido no recebimento e no título.",
      "evidence": [
        "Recebimento confirmado por cartão.",
        "Saldo do título atualizado após a confirmação."
      ]
    }
  },
  "businessHash": "sha256:ed9b9d02026c33bd58eab087f9c76f690b49abd31ca52b41bc59963324105a02"
} as const satisfies Ns5JourneyArtifact;

export type ProcessarPagamentoPorCartaoJourneyType = typeof processarPagamentoPorCartaoJourney;

export default processarPagamentoPorCartaoJourney;
