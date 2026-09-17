/// <mls fileReference="_102047_/l4/financeiro/journeys/acompanharPainelRecebiveis.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const acompanharPainelRecebiveisJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "acompanharPainelRecebiveis",
  "business": {
    "actorRef": "gerenteFinanceiro",
    "title": "Acompanhar painel de recebíveis",
    "goal": "Analisar os recebíveis da organização por período e por origem.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "inspecionarPainelRecebiveis",
        "kind": "inspect",
        "entity": "TituloReceber",
        "title": "Visualizar painel de recebíveis",
        "description": "Visualiza o painel calculado de recebíveis para o período e a origem de cobrança desejados, com os valores agrupados por esses critérios."
      }
    ],
    "outcome": {
      "statement": "O gerente financeiro obtém uma visão dos recebíveis no período e nas origens selecionadas.",
      "evidence": [
        "O painel apresenta os totais de títulos a receber para o período consultado.",
        "Os valores podem ser observados discriminados por origem de cobrança."
      ]
    }
  },
  "businessHash": "sha256:cdf17a1c738c0cbb0cbfdfb6fcf7ae2ae2f3d5858e4efbf0662b50c522721928"
} as const satisfies Ns5JourneyArtifact;

export type AcompanharPainelRecebiveisJourneyType = typeof acompanharPainelRecebiveisJourney;

export default acompanharPainelRecebiveisJourney;
