/// <mls fileReference="_102047_/l4/inscricaoEvento/journeys/cancelarInscricaoNoEvento.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const cancelarInscricaoNoEventoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "cancelarInscricaoNoEvento",
  "business": {
    "actorRef": "publico",
    "title": "Cancelar inscrição em evento",
    "goal": "Cancelar uma inscrição realizada e liberar a vaga para a lista de espera quando aplicável.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarInscricao",
        "kind": "locate",
        "entity": "Inscricao",
        "title": "Localiza a própria inscrição no evento.",
        "description": "Localiza a própria inscrição no evento."
      },
      {
        "stepId": "consultarInscricao",
        "kind": "inspect",
        "entity": "Inscricao",
        "title": "Consulta os dados e a situação da inscrição.",
        "description": "Consulta os dados e a situação da inscrição."
      },
      {
        "stepId": "cancelarInscricao",
        "kind": "act",
        "entity": "Inscricao",
        "affects": [
          "Evento"
        ],
        "title": "Cancela a inscrição.",
        "description": "Cancela a inscrição e, quando houver lista de espera, promove a primeira inscrição aguardando."
      }
    ],
    "outcome": {
      "statement": "A inscrição é cancelada e a próxima pessoa da lista de espera é promovida quando existir.",
      "evidence": [
        "Situação da inscrição cancelada registrada.",
        "Vaga ocupada atualizada no evento.",
        "Primeira inscrição da lista de espera passa a confirmada, quando houver."
      ]
    }
  },
  "businessHash": "sha256:8ee68a8328399f965222f3e89f0b6029ab02a512bed757f0f8356362b9913eea"
} as const satisfies Ns5JourneyArtifact;

export type CancelarInscricaoNoEventoJourneyType = typeof cancelarInscricaoNoEventoJourney;

export default cancelarInscricaoNoEventoJourney;
