/// <mls fileReference="_102047_/l4/inscricaoEvento/journeys/cadastrarPublicarEvento.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const cadastrarPublicarEventoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "cadastrarPublicarEvento",
  "business": {
    "actorRef": "organizador",
    "title": "Cadastrar e publicar evento",
    "goal": "Criar um evento com título, descrição, data, local e número de vagas e publicá-lo para receber inscrições.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "criarEvento",
        "kind": "act",
        "entity": "Evento",
        "effect": "create",
        "title": "Cadastrar novo evento",
        "description": "O organizador informa título, descrição, data, local e número de vagas e salva o evento como rascunho."
      },
      {
        "stepId": "revisarEvento",
        "kind": "inspect",
        "entity": "Evento",
        "title": "Revisar dados do evento",
        "description": "O organizador confere os dados cadastrados antes de publicar."
      },
      {
        "stepId": "publicarEvento",
        "kind": "act",
        "entity": "Evento",
        "effect": "transition",
        "transitionRef": "publicar",
        "title": "Publicar evento",
        "description": "O organizador publica o evento, que passa a ter uma página pública de inscrição."
      }
    ],
    "outcome": {
      "statement": "O evento está publicado e disponível para inscrições na página pública.",
      "evidence": [
        "Evento com situação publicado",
        "Página pública do evento acessível"
      ]
    }
  },
  "businessHash": "sha256:15ae2a8e49b2339f9f00f25d15812013044d794c3ab9627ee346c9f95432b646"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type CadastrarPublicarEventoJourneyType = typeof cadastrarPublicarEventoJourney;

export default cadastrarPublicarEventoJourney;
