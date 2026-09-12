/// <mls fileReference="_102047_/l4/financeiro/journeys/consultarTitulosVencidos.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const consultarTitulosVencidosJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "consultarTitulosVencidos",
  "business": {
    "actorRef": "gerenteFinanceiro",
    "title": "Consultar títulos vencidos",
    "goal": "Identificar títulos a receber que estão vencidos.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "localizarTitulosVencidos",
        "kind": "locate",
        "entity": "TituloReceber",
        "title": "Localizar títulos vencidos",
        "description": "Localizar títulos com vencimento passado e saldo pendente."
      },
      {
        "stepId": "inspecionarTitulosVencidos",
        "kind": "inspect",
        "entity": "TituloReceber",
        "title": "Inspecionar títulos vencidos",
        "description": "Inspecionar o pagador, o valor pendente, o vencimento e a origem de cada título vencido."
      }
    ],
    "outcome": {
      "statement": "Os títulos vencidos ficam disponíveis para acompanhamento financeiro.",
      "evidence": [
        "Lista de títulos vencidos apresentada.",
        "Dados de vencimento e saldo pendente visíveis."
      ]
    }
  },
  "businessHash": "sha256:cf81b0dbc1e8ac2b6bb2f30437f3d9955a371fa2cfbe97b53817dbeda786554d"
} as const satisfies Ns5JourneyArtifact;

export type ConsultarTitulosVencidosJourneyType = typeof consultarTitulosVencidosJourney;

export default consultarTitulosVencidosJourney;
