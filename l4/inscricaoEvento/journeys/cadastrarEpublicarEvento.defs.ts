/// <mls fileReference="_102047_/l4/inscricaoEvento/journeys/cadastrarEpublicarEvento.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const cadastrarEpublicarEventoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "cadastrarEpublicarEvento",
  "business": {
    "actorRef": "organizador",
    "title": "Cadastrar e publicar evento",
    "goal": "Disponibilizar um evento com suas informações e capacidade para inscrições públicas.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "criarEvento",
        "kind": "act",
        "entity": "Evento",
        "effect": "create",
        "title": "Cadastrar evento",
        "description": "Informa título, descrição, data, local e número de vagas do evento."
      },
      {
        "stepId": "publicarEvento",
        "kind": "act",
        "entity": "Evento",
        "effect": "transition",
        "transitionRef": "publicarEvento",
        "title": "Publicar evento",
        "description": "Publica o evento para disponibilizar sua página pública de inscrição."
      }
    ],
    "outcome": {
      "statement": "O evento é publicado e fica disponível para inscrições públicas.",
      "evidence": [
        "Evento com status publicado.",
        "Página pública do evento disponível com título, data, local e vagas."
      ]
    }
  },
  "businessHash": "sha256:cac9effd8f825650081d93d9cd7362496fd50b20b8e9b534d21e6039afb27f92"
} as const satisfies Ns5JourneyArtifact;

export type CadastrarEpublicarEventoJourneyType = typeof cadastrarEpublicarEventoJourney;

export default cadastrarEpublicarEventoJourney;
