/// <mls fileReference="_102047_/l4/locacaoEquipamentos/journeys/retornarEquipamentoManutencao.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const retornarEquipamentoManutencaoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "retornarEquipamentoManutencao",
  "business": {
    "actorRef": "gerente",
    "title": "Retornar equipamento da manutenção",
    "goal": "Concluída a manutenção, recolocar o equipamento em operação para que fique disponível para novas locações.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarEmManutencao",
        "kind": "locate",
        "entity": "Equipamento",
        "title": "Localizar equipamento em manutenção",
        "description": "Lista os equipamentos em manutenção e seleciona o que teve o conserto concluído."
      },
      {
        "stepId": "retornarManutencao",
        "kind": "act",
        "entity": "Equipamento",
        "effect": "transition",
        "transitionRef": "retornarManutencao",
        "title": "Retornar à operação",
        "description": "Registra o fim da manutenção e o equipamento volta à situação disponível."
      }
    ],
    "outcome": {
      "statement": "O equipamento voltou à operação e está disponível para novas locações.",
      "evidence": [
        "Equipamento aparece com situação disponível",
        "Equipamento pode ser adicionado a um novo contrato de locação"
      ]
    }
  },
  "businessHash": "sha256:f5f91f2e618d652925b8bfe81c6c2ca330e21f34202db87b03fa64034becd41f"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type RetornarEquipamentoManutencaoJourneyType = typeof retornarEquipamentoManutencaoJourney;

export default retornarEquipamentoManutencaoJourney;
