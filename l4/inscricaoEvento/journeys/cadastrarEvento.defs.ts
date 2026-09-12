/// <mls fileReference="_102047_/l4/inscricaoEvento/journeys/cadastrarEvento.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const cadastrarEventoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "cadastrarEvento",
  "business": {
    "actorRef": "organizador",
    "title": "Cadastrar evento",
    "goal": "Criar um evento com suas informações e capacidade de vagas.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "criarEvento",
        "kind": "act",
        "entity": "Evento",
        "effect": "create",
        "title": "x",
        "description": "Registra o título, a descrição, a data, o local e o número de vagas do evento."
      }
    ],
    "outcome": {
      "statement": "O evento fica cadastrado e pronto para publicação.",
      "evidence": [
        "Evento criado com título, descrição, data, local e número de vagas."
      ]
    }
  },
  "businessHash": "sha256:a1765acb2cd4ec263da681fe7d9b644b84d4d809b0322d7037737ae3e4ff64ea"
} as const satisfies Ns5JourneyArtifact;

export type CadastrarEventoJourneyType = typeof cadastrarEventoJourney;

export default cadastrarEventoJourney;
