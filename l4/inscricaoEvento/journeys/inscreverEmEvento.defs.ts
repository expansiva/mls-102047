/// <mls fileReference="_102047_/l4/inscricaoEvento/journeys/inscreverEmEvento.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const inscreverEmEventoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "inscreverEmEvento",
  "business": {
    "actorRef": "publico",
    "title": "Inscrever-se em evento",
    "goal": "Garantir uma vaga no evento publicado ou um lugar na lista de espera.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "abrirPaginaPublica",
        "kind": "inspect",
        "entity": "Evento",
        "title": "Abrir página do evento",
        "description": "A pessoa acessa a página pública do evento publicado e vê título, descrição, data, local e disponibilidade de vagas."
      },
      {
        "stepId": "enviarInscricao",
        "kind": "act",
        "entity": "Inscricao",
        "effect": "create",
        "title": "Inscrever com nome e e-mail",
        "description": "A pessoa informa nome e e-mail; a inscrição é confirmada se houver vaga ou entra na lista de espera por ordem de chegada, e é recusada se o e-mail já estiver inscrito no evento."
      }
    ],
    "outcome": {
      "statement": "A pessoa está inscrita no evento, confirmada ou na lista de espera.",
      "evidence": [
        "Mensagem de inscrição confirmada ou de posição na lista de espera",
        "E-mail aparece uma única vez nas inscrições do evento"
      ]
    }
  },
  "businessHash": "sha256:518dc78cdf1bc901f2c7264b15efbc0c697eaeab8e078ff593798222977f4f3b"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type InscreverEmEventoJourneyType = typeof inscreverEmEventoJourney;

export default inscreverEmEventoJourney;
