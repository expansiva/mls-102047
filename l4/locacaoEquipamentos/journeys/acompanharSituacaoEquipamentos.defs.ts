/// <mls fileReference="_102047_/l4/locacaoEquipamentos/journeys/acompanharSituacaoEquipamentos.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const acompanharSituacaoEquipamentosJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "acompanharSituacaoEquipamentos",
  "business": {
    "actorRef": "gerente",
    "title": "Acompanhar situação dos equipamentos",
    "goal": "Ver quais equipamentos estão disponíveis, locados ou em manutenção.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "localizarEquipamentosPorSituacao",
        "kind": "locate",
        "entity": "Equipamento",
        "title": "Localizar equipamentos",
        "description": "Localiza os equipamentos conforme sua situação operacional."
      },
      {
        "stepId": "inspecionarSituacaoEquipamentos",
        "kind": "inspect",
        "entity": "Equipamento",
        "title": "Consultar situação",
        "description": "Consulta os equipamentos disponíveis, locados e em manutenção."
      }
    ],
    "outcome": {
      "statement": "O gerente obtém a situação atual da frota de equipamentos.",
      "evidence": [
        "Lista de equipamentos identificada por situação: disponível, locado ou em manutenção."
      ]
    }
  },
  "businessHash": "sha256:ff449ec2dfae63b60b1dc73c26e87c1d28bc88f29866afe2d543fdcb5a78a016"
} as const satisfies Ns5JourneyArtifact;

export type AcompanharSituacaoEquipamentosJourneyType = typeof acompanharSituacaoEquipamentosJourney;

export default acompanharSituacaoEquipamentosJourney;
