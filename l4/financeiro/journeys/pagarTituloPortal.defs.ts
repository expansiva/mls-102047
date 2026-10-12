/// <mls fileReference="_102047_/l4/financeiro/journeys/pagarTituloPortal.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const pagarTituloPortalJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "pagarTituloPortal",
  "business": {
    "actorRef": "pagador",
    "title": "Pagar título com cartão",
    "goal": "Pagar com cartão um título em aberto pelo portal.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarTituloAberto",
        "kind": "locate",
        "entity": "TituloReceber",
        "title": "Escolher título em aberto",
        "description": "O pagador localiza entre os seus títulos um que esteja em aberto."
      },
      {
        "stepId": "conferirValor",
        "kind": "inspect",
        "entity": "TituloReceber",
        "title": "Conferir valor a pagar",
        "description": "O pagador confere origem, vencimento e saldo em aberto do título."
      },
      {
        "stepId": "pagarCartao",
        "kind": "act",
        "entity": "Recebimento",
        "effect": "create",
        "title": "Pagar com cartão",
        "description": "O pagador paga o saldo com cartão via Stripe e o recebimento é registrado, quitando o título."
      }
    ],
    "outcome": {
      "statement": "O título é pago com cartão e aparece quitado no portal.",
      "evidence": [
        "Recebimento com forma cartão registrado no título",
        "Título exibido como quitado no portal"
      ]
    }
  },
  "businessHash": "sha256:162603317092494763db800e055c4d8775f53f0209c2177e6af716ffdb57c372"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type PagarTituloPortalJourneyType = typeof pagarTituloPortalJourney;

export default pagarTituloPortalJourney;
