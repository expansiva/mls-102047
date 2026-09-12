/// <mls fileReference="_102047_/l4/inscricaoEvento/journeys/cadastrarEpublicarEvento.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const cadastrarEpublicarEventoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "cadastrarEpublicarEvento",
  "business": {
    "actorRef": "organizador",
    "title": "Cadastrar e publicar evento",
    "goal": "Disponibilizar um evento com informações e capacidade para inscrições públicas.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "cadastrarEvento",
        "kind": "act",
        "entity": "Evento",
        "title": "Cadastra o evento com título, descrição, data, local e número de vagas.",
        "description": "Cadastra o evento com título, descrição, data, local e número de vagas."
      },
      {
        "stepId": "publicarEvento",
        "kind": "act",
        "entity": "Evento",
        "title": "Publica o evento para disponibilizar sua página pública.",
        "description": "Publica o evento para disponibilizar sua página pública."
      }
    ],
    "outcome": {
      "statement": "O evento fica publicado e disponível para inscrições públicas.",
      "evidence": [
        "Evento publicado com título, descrição, data, local e número de vagas.",
        "Página pública do evento disponível."
      ]
    }
  },
  "businessHash": "sha256:0c7970440bf53740901ef85a74f2230fa60393c1cc3a587d0cee7014764d9903"
} as const satisfies Ns5JourneyArtifact;

export type CadastrarEpublicarEventoJourneyType = typeof cadastrarEpublicarEventoJourney;

export default cadastrarEpublicarEventoJourney;
