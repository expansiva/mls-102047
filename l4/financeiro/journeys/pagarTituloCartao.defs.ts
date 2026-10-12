/// <mls fileReference="_102047_/l4/financeiro/journeys/pagarTituloCartao.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const pagarTituloCartaoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "pagarTituloCartao",
  "business": {
    "actorRef": "pagador",
    "title": "Pagar título com cartão",
    "goal": "Pagar pelo portal, com cartão, um título próprio em aberto.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarTituloAberto",
        "kind": "locate",
        "entity": "TituloReceber",
        "title": "Escolher título em aberto",
        "description": "O pagador localiza entre os próprios títulos um que esteja em aberto."
      },
      {
        "stepId": "conferirTituloAberto",
        "kind": "inspect",
        "entity": "TituloReceber",
        "title": "Conferir valor e vencimento",
        "description": "O pagador confere valor em aberto, vencimento e origem do título."
      },
      {
        "stepId": "pagarCartao",
        "kind": "act",
        "entity": "Recebimento",
        "effect": "create",
        "title": "Pagar com cartão",
        "description": "O pagador paga com cartão via Stripe; o recebimento é registrado e o saldo do título é baixado."
      }
    ],
    "outcome": {
      "statement": "O título foi pago com cartão e aparece quitado no portal.",
      "evidence": [
        "Recebimento com forma cartão registrado no título",
        "Título com saldo zero e situação quitado"
      ]
    }
  },
  "businessHash": "sha256:d3f17c860e0d463a305ddc7fcc36e05a8447ec6d173d42bd75760f5fceb1f584"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type PagarTituloCartaoJourneyType = typeof pagarTituloCartaoJourney;

export default pagarTituloCartaoJourney;
