/// <mls fileReference="_102047_/l4/financeiro/journeys/emitirExtratoPorPagador.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const emitirExtratoPorPagadorJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "emitirExtratoPorPagador",
  "business": {
    "actorRef": "gerenteFinanceiro",
    "title": "Emitir extrato por pagador",
    "goal": "Gerar um extrato dos títulos e recebimentos de um pagador.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarPagador",
        "kind": "locate",
        "entity": "Pagador",
        "title": "x",
        "description": "Localiza o pagador para o qual o extrato será emitido."
      },
      {
        "stepId": "consultarMovimentacoesDoPagador",
        "kind": "inspect",
        "entity": "TituloReceber",
        "title": "x",
        "description": "Confere os títulos, saldos e recebimentos associados ao pagador selecionado."
      },
      {
        "stepId": "gerarExtratoDoPagador",
        "kind": "act",
        "entity": "ExtratoPagador",
        "effect": "create",
        "title": "x",
        "description": "Emite o extrato do pagador com seus títulos e recebimentos."
      }
    ],
    "outcome": {
      "statement": "O extrato do pagador é emitido com a movimentação financeira consultada.",
      "evidence": [
        "Extrato gerado para o pagador selecionado.",
        "Extrato apresenta títulos, recebimentos e saldos correspondentes."
      ]
    }
  },
  "businessHash": "sha256:aab4d856be67482e82d2944a0345916230269b377b653b67311cff60c1a6a27d"
} as const satisfies Ns5JourneyArtifact;

export type EmitirExtratoPorPagadorJourneyType = typeof emitirExtratoPorPagadorJourney;

export default emitirExtratoPorPagadorJourney;
