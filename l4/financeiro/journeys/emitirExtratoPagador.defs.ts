/// <mls fileReference="_102047_/l4/financeiro/journeys/emitirExtratoPagador.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const emitirExtratoPagadorJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "emitirExtratoPagador",
  "business": {
    "actorRef": "gerenteFinanceiro",
    "title": "Emitir extrato por pagador",
    "goal": "Emitir o extrato de títulos e recebimentos de um pagador.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarPagador",
        "kind": "locate",
        "entity": "Pagador",
        "title": "Buscar pagador",
        "description": "O gerente localiza o pagador pelo nome ou documento."
      },
      {
        "stepId": "verExtrato",
        "kind": "inspect",
        "entity": "TituloReceber",
        "title": "Ver extrato do pagador",
        "description": "O gerente consulta, no período escolhido, os títulos do pagador com seus recebimentos, estornos e saldo em aberto."
      }
    ],
    "outcome": {
      "statement": "O extrato do pagador é emitido com títulos, recebimentos e saldo.",
      "evidence": [
        "Extrato lista títulos com origem, vencimento e valor",
        "Extrato mostra recebimentos e saldo total em aberto do pagador"
      ]
    }
  },
  "businessHash": "sha256:cb15a75c508b1101b0e5450c162b0ef9e834dd67a418a57f264cc4a76a6823ee"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type EmitirExtratoPagadorJourneyType = typeof emitirExtratoPagadorJourney;

export default emitirExtratoPagadorJourney;
