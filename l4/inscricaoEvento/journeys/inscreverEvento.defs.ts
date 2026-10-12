/// <mls fileReference="_102047_/l4/inscricaoEvento/journeys/inscreverEvento.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const inscreverEventoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "inscreverEvento",
  "business": {
    "actorRef": "publico",
    "title": "Inscrever-se em evento",
    "goal": "Garantir uma vaga, ou um lugar na lista de espera, em um evento publicado.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "abrirPaginaEvento",
        "kind": "locate",
        "entity": "Evento",
        "title": "Abrir página do evento",
        "description": "A pessoa acessa a página pública de um evento publicado."
      },
      {
        "stepId": "verDetalhesEvento",
        "kind": "inspect",
        "entity": "Evento",
        "title": "Ver detalhes do evento",
        "description": "A pessoa vê título, descrição, data, local e disponibilidade de vagas."
      },
      {
        "stepId": "enviarInscricao",
        "kind": "act",
        "entity": "Inscricao",
        "effect": "create",
        "title": "Inscrever-se com nome e e-mail",
        "description": "A pessoa informa nome e e-mail; a inscrição é confirmada se houver vaga ou entra na lista de espera por ordem de chegada, e é recusada se o e-mail já estiver inscrito no evento."
      }
    ],
    "outcome": {
      "statement": "A pessoa está inscrita no evento, confirmada ou na lista de espera.",
      "evidence": [
        "Inscrição registrada com situação confirmada ou em espera",
        "Posição na lista de espera exibida quando aplicável"
      ]
    }
  },
  "businessHash": "sha256:6c024ff0307b84655fc2218865e8b9a5161a1056994c2777219a710a325db2b3"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type InscreverEventoJourneyType = typeof inscreverEventoJourney;

export default inscreverEventoJourney;
