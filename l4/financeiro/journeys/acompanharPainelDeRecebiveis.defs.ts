/// <mls fileReference="_102047_/l4/financeiro/journeys/acompanharPainelDeRecebiveis.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const acompanharPainelDeRecebiveisJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "acompanharPainelDeRecebiveis",
  "business": {
    "actorRef": "gerenteFinanceiro",
    "title": "Acompanhar painel de recebíveis",
    "goal": "Analisar os recebíveis da organização por período e por origem.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "inspecionarIndicadoresDeRecebiveis",
        "kind": "inspect",
        "entity": "TituloReceber",
        "title": "Inspecionar indicadores de recebíveis",
        "description": "Inspecionar os valores e a composição dos recebíveis por período e origem."
      }
    ],
    "outcome": {
      "statement": "O gerente financeiro visualiza a situação dos recebíveis no recorte solicitado.",
      "evidence": [
        "Indicadores de recebíveis exibidos para o período selecionado.",
        "Recebíveis identificados por origem."
      ]
    }
  },
  "businessHash": "sha256:ba9c3c455fc9610dc72644d248a80666d3da9ee9cbc8a22d872d1f18a939731b"
} as const satisfies Ns5JourneyArtifact;

export type AcompanharPainelDeRecebiveisJourneyType = typeof acompanharPainelDeRecebiveisJourney;

export default acompanharPainelDeRecebiveisJourney;
