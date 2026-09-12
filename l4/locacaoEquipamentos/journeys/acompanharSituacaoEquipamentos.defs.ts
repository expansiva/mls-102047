/// <mls fileReference="_102047_/l4/locacaoEquipamentos/journeys/acompanharSituacaoEquipamentos.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const acompanharSituacaoEquipamentosJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "acompanharSituacaoEquipamentos",
  "business": {
    "actorRef": "gerente",
    "title": "Acompanhar situação dos equipamentos",
    "goal": "Visualizar quais equipamentos estão disponíveis, locados ou em manutenção.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "localizarEquipamentos",
        "kind": "locate",
        "entity": "Equipamento",
        "title": "x",
        "description": "Localiza os equipamentos da locadora."
      },
      {
        "stepId": "consultarSituacaoEquipamentos",
        "kind": "inspect",
        "entity": "Equipamento",
        "title": "x",
        "description": "Consulta o código, a descrição, a diária e a situação de disponibilidade, locação ou manutenção de cada equipamento."
      }
    ],
    "outcome": {
      "statement": "O gerente acompanha a disponibilidade e a situação operacional dos equipamentos.",
      "evidence": [
        "Lista de equipamentos com situação disponível, locado ou em manutenção.",
        "Dados de código, descrição e valor da diária visíveis para cada equipamento."
      ]
    }
  },
  "businessHash": "sha256:8ecf34f2834ca6111cd14e70e15eb7ed5b773c3a2b3d776d996ca09279b49cf4"
} as const satisfies Ns5JourneyArtifact;

export type AcompanharSituacaoEquipamentosJourneyType = typeof acompanharSituacaoEquipamentosJourney;

export default acompanharSituacaoEquipamentosJourney;
