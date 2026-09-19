/// <mls fileReference="_102047_/l4/locacaoEquipamentos/journeys/consultarSituacaoEquipamentos.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const consultarSituacaoEquipamentosJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "consultarSituacaoEquipamentos",
  "business": {
    "actorRef": "gerente",
    "title": "Consultar situação dos equipamentos",
    "goal": "Acompanhar quais equipamentos estão disponíveis, locados ou em manutenção.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarEquipamentos",
        "kind": "locate",
        "entity": "Equipamento",
        "title": "x",
        "description": "Localiza os equipamentos para acompanhamento da operação."
      },
      {
        "stepId": "consultarSituacao",
        "kind": "inspect",
        "entity": "Equipamento",
        "title": "x",
        "description": "Consulta a situação de cada equipamento, identificando se está disponível, locado ou em manutenção."
      }
    ],
    "outcome": {
      "statement": "O gerente visualiza a situação operacional dos equipamentos.",
      "evidence": [
        "Cada equipamento consultado apresenta sua situação como disponível, locado ou em manutenção."
      ]
    }
  },
  "businessHash": "sha256:2321a01cdf865d6b834b7013369a36b5f6aad5f3b6f615c0b2ff396eb6d86c00"
} as const satisfies Ns5JourneyArtifact;

export type ConsultarSituacaoEquipamentosJourneyType = typeof consultarSituacaoEquipamentosJourney;

export default consultarSituacaoEquipamentosJourney;
