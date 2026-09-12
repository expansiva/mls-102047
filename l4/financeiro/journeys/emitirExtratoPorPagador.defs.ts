/// <mls fileReference="_102047_/l4/financeiro/journeys/emitirExtratoPorPagador.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const emitirExtratoPorPagadorJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "emitirExtratoPorPagador",
  "business": {
    "actorRef": "gerenteFinanceiro",
    "title": "Emitir extrato por pagador",
    "goal": "Obter o extrato de títulos e recebimentos de um pagador.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarPagador",
        "kind": "locate",
        "entity": "Pagador",
        "title": "Localizar pagador",
        "description": "Localizar o pagador para o qual será emitido o extrato."
      },
      {
        "stepId": "inspecionarExtratoDoPagador",
        "kind": "inspect",
        "entity": "Pagador",
        "title": "Inspecionar extrato do pagador",
        "description": "Inspecionar os títulos e os recebimentos associados ao pagador."
      },
      {
        "stepId": "emitirExtrato",
        "kind": "act",
        "entity": "ExtratoPagador",
        "effect": "create",
        "title": "Emitir extrato",
        "description": "Emitir o extrato com os títulos e recebimentos do pagador."
      }
    ],
    "outcome": {
      "statement": "O extrato do pagador é emitido.",
      "evidence": [
        "Extrato gerado para o pagador selecionado.",
        "Títulos e recebimentos incluídos no extrato."
      ]
    }
  },
  "businessHash": "sha256:b4f4c730785f7afc079829e1789bdf00067413c81b3031963e26f1938e74f7c7"
} as const satisfies Ns5JourneyArtifact;

export type EmitirExtratoPorPagadorJourneyType = typeof emitirExtratoPorPagadorJourney;

export default emitirExtratoPorPagadorJourney;
