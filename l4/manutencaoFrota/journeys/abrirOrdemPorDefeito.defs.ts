/// <mls fileReference="_102047_/l4/manutencaoFrota/journeys/abrirOrdemPorDefeito.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const abrirOrdemPorDefeitoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "abrirOrdemPorDefeito",
  "business": {
    "actorRef": "gestor",
    "title": "Abrir ordem por defeito",
    "goal": "Abrir uma ordem de manutenção corretiva quando um veículo apresenta defeito.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarVeiculoDefeito",
        "kind": "locate",
        "entity": "Veiculo",
        "title": "Localizar veículo",
        "description": "O gestor localiza o veículo com defeito pela placa."
      },
      {
        "stepId": "abrirOrdemCorretiva",
        "kind": "act",
        "entity": "OrdemManutencao",
        "effect": "create",
        "title": "Abrir ordem corretiva",
        "description": "O gestor abre a ordem do tipo defeito com oficina, descrição e data de entrada."
      }
    ],
    "outcome": {
      "statement": "Existe uma ordem corretiva aberta para o veículo.",
      "evidence": [
        "A ordem aparece aberta com tipo defeito, oficina, descrição e data de entrada"
      ]
    }
  },
  "businessHash": "sha256:a5a77d087056263a82f8ceede6fd94b080398a46846318a5b8a4b2b7deda7d90"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type AbrirOrdemPorDefeitoJourneyType = typeof abrirOrdemPorDefeitoJourney;

export default abrirOrdemPorDefeitoJourney;
