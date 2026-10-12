/// <mls fileReference="_102047_/l4/manutencaoFrota/journeys/concluirOrdem.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const concluirOrdemJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "concluirOrdem",
  "business": {
    "actorRef": "gestor",
    "title": "Concluir ordem de manutenção",
    "goal": "Registrar a saída do veículo da oficina e o custo da manutenção.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarOrdem",
        "kind": "locate",
        "entity": "OrdemManutencao",
        "title": "Localizar ordem aberta",
        "description": "O gestor localiza a ordem aberta pelo veículo ou pela oficina."
      },
      {
        "stepId": "conferirOrdem",
        "kind": "inspect",
        "entity": "OrdemManutencao",
        "title": "Conferir ordem",
        "description": "O gestor confere oficina, descrição e data de entrada."
      },
      {
        "stepId": "fecharOrdem",
        "kind": "act",
        "entity": "OrdemManutencao",
        "effect": "transition",
        "transitionRef": "concluir",
        "title": "Concluir ordem",
        "description": "O gestor informa custo e data de saída e conclui a ordem; se for preventiva, o plano passa a prever a próxima preventiva."
      }
    ],
    "outcome": {
      "statement": "A ordem está concluída com custo e data de saída registrados.",
      "evidence": [
        "A ordem aparece como concluída com custo e data de saída",
        "A próxima preventiva do plano é recalculada quando a ordem é preventiva"
      ]
    }
  },
  "businessHash": "sha256:d5d67a3e8762814b940e1705fc5d3801cc70adeff5e8ccaf1c82e8cead44d018"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type ConcluirOrdemJourneyType = typeof concluirOrdemJourney;

export default concluirOrdemJourney;
