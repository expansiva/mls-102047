/// <mls fileReference="_102047_/l4/reembolsoDespesas/journeys/avaliarDespesaDaEquipe.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const avaliarDespesaDaEquipeJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "avaliarDespesaDaEquipe",
  "business": {
    "actorRef": "gestorEquipe",
    "title": "Avaliar despesa da equipe",
    "goal": "Decidir se aprova ou rejeita uma despesa enviada por integrante da equipe.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarDespesaDaEquipe",
        "kind": "locate",
        "entity": "Despesa",
        "title": "Localizar despesa da equipe",
        "description": "Localiza uma despesa da equipe que aguarda avaliação."
      },
      {
        "stepId": "consultarDespesaDaEquipe",
        "kind": "inspect",
        "entity": "Despesa",
        "title": "Consultar despesa",
        "description": "Consulta os dados, o comprovante e o histórico de envio da despesa."
      },
      {
        "stepId": "decidirAprovacaoOuRejeicao",
        "kind": "decide",
        "entity": "Despesa",
        "title": "Decidir aprovação ou rejeição",
        "description": "Escolhe aprovar a despesa ou rejeitá-la, registrando um motivo quando a rejeita."
      }
    ],
    "outcome": {
      "statement": "A despesa é aprovada ou rejeitada pelo gestor da equipe.",
      "evidence": [
        "A decisão do gestor fica registrada na despesa.",
        "Uma despesa rejeitada apresenta o motivo informado.",
        "Uma despesa aprovada fica disponível para o financeiro."
      ]
    }
  },
  "businessHash": "sha256:9e8ffb48f2b9ff6abe09d241568e98c985f1a684f91a3208160fac1cab774d8a"
} as const satisfies Ns5JourneyArtifact;

export type AvaliarDespesaDaEquipeJourneyType = typeof avaliarDespesaDaEquipeJourney;

export default avaliarDespesaDaEquipeJourney;
