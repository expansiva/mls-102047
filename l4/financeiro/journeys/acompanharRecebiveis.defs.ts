/// <mls fileReference="_102047_/l4/financeiro/journeys/acompanharRecebiveis.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const acompanharRecebiveisJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "acompanharRecebiveis",
  "business": {
    "actorRef": "gerenteFinanceiro",
    "title": "Acompanhar recebíveis e títulos vencidos",
    "goal": "Analisar os recebíveis por período e origem e identificar títulos vencidos.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "localizarTitulosParaAnalise",
        "kind": "locate",
        "entity": "TituloReceber",
        "title": "x",
        "description": "Localiza os títulos para a análise do período e da origem desejados, incluindo os títulos vencidos."
      },
      {
        "stepId": "inspecionarRecebiveis",
        "kind": "inspect",
        "entity": "TituloReceber",
        "title": "x",
        "description": "Consulta o painel consolidado de recebíveis por período e origem e examina os títulos vencidos, seus pagadores, valores e vencimentos."
      }
    ],
    "outcome": {
      "statement": "O gerente financeiro dispõe de uma visão dos recebíveis e dos títulos vencidos no recorte analisado.",
      "evidence": [
        "Totais de recebíveis apresentados para o período e a origem consultados.",
        "Relação de títulos vencidos disponível com valor e vencimento."
      ]
    }
  },
  "businessHash": "sha256:0e7b719ab97007ed7762eae89e6701cd3a99426b58ed13c8d90e06bda131a73d"
} as const satisfies Ns5JourneyArtifact;

export type AcompanharRecebiveisJourneyType = typeof acompanharRecebiveisJourney;

export default acompanharRecebiveisJourney;
