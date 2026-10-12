/// <mls fileReference="_102047_/l4/financeiro/journeys/emitirExtratoPagador.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const emitirExtratoPagadorJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "emitirExtratoPagador",
  "business": {
    "actorRef": "gerenteFinanceiro",
    "title": "Emitir extrato por pagador",
    "goal": "Gerar o extrato de títulos e recebimentos de um pagador.",
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
        "description": "O gerente vê os títulos do pagador no período, com recebimentos, estornos e saldo."
      },
      {
        "stepId": "exportarExtrato",
        "kind": "inspect",
        "entity": "TituloReceber",
        "title": "Emitir extrato",
        "description": "O gerente imprime ou baixa o extrato do pagador."
      }
    ],
    "outcome": {
      "statement": "O extrato do pagador foi emitido com seus títulos, recebimentos e saldo.",
      "evidence": [
        "Extrato listando títulos, recebimentos e saldo do pagador no período",
        "Arquivo do extrato disponível para impressão ou download"
      ]
    }
  },
  "businessHash": "sha256:770991887ef0ba6214074aeb3238606b50e9f5f0ed2d414111eb207b11bbb27e"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type EmitirExtratoPagadorJourneyType = typeof emitirExtratoPagadorJourney;

export default emitirExtratoPagadorJourney;
