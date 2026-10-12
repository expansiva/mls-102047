/// <mls fileReference="_102047_/l4/manutencaoFrota/journeys/abrirOrdemPorAviso.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const abrirOrdemPorAvisoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "abrirOrdemPorAviso",
  "business": {
    "actorRef": "gestor",
    "title": "Abrir ordem por preventiva vencida",
    "goal": "Abrir a ordem de manutenção de um veículo que passou do km previsto para a próxima preventiva.",
    "entry": {
      "mode": "fromNotification"
    },
    "steps": [
      {
        "stepId": "verAviso",
        "kind": "inspect",
        "entity": "PlanoManutencao",
        "title": "Ver aviso de preventiva",
        "description": "O gestor abre o aviso e confere o km atual do veículo e o km previsto no plano."
      },
      {
        "stepId": "abrirOrdemPreventiva",
        "kind": "act",
        "entity": "OrdemManutencao",
        "effect": "create",
        "title": "Abrir ordem preventiva",
        "description": "O gestor abre a ordem de manutenção do tipo preventiva vinculada ao plano, informando oficina, descrição e data de entrada."
      }
    ],
    "outcome": {
      "statement": "Existe uma ordem preventiva aberta para o veículo com plano vencido.",
      "evidence": [
        "A ordem aparece aberta com oficina, descrição e data de entrada",
        "A ordem está vinculada ao plano vencido"
      ]
    }
  },
  "businessHash": "sha256:334f362d0feaff31c4098a235b19e002c22b9d180952e303ded498afd756f899"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type AbrirOrdemPorAvisoJourneyType = typeof abrirOrdemPorAvisoJourney;

export default abrirOrdemPorAvisoJourney;
