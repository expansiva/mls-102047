/// <mls fileReference="_102047_/l4/financeiro/journeys/emitirExtratoPorPagador.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const emitirExtratoPorPagadorJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "emitirExtratoPorPagador",
  "business": {
    "actorRef": "gerenteFinanceiro",
    "title": "Emitir extrato por pagador",
    "goal": "Gerar a posição de títulos e recebimentos de um pagador.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarPagador",
        "kind": "locate",
        "entity": "Pagador",
        "title": "Localizar pagador",
        "description": "Localiza o pagador a partir do contexto disponível ou por consulta na organização."
      },
      {
        "stepId": "inspecionarTitulosDoPagador",
        "kind": "inspect",
        "entity": "TituloReceber",
        "title": "Consultar títulos do pagador",
        "description": "Consulta os títulos do pagador, incluindo valores, vencimentos, origens e saldos."
      },
      {
        "stepId": "inspecionarRecebimentosDoPagador",
        "kind": "inspect",
        "entity": "Recebimento",
        "title": "Emitir extrato do pagador",
        "description": "Consulta os recebimentos vinculados aos títulos do pagador e emite o extrato consolidado."
      }
    ],
    "outcome": {
      "statement": "O extrato do pagador é emitido com seus títulos e recebimentos.",
      "evidence": [
        "O extrato identifica o pagador consultado.",
        "O extrato apresenta títulos, saldos e recebimentos relacionados ao pagador."
      ]
    }
  },
  "businessHash": "sha256:9dce2144ae906b1438174be29dac147c6a49c4fa2b618a35b386bd854b884ab0"
} as const satisfies Ns5JourneyArtifact;

export type EmitirExtratoPorPagadorJourneyType = typeof emitirExtratoPorPagadorJourney;

export default emitirExtratoPorPagadorJourney;
