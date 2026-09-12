/// <mls fileReference="_102047_/l4/inscricaoEvento/journeys/inscreverEmEvento.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const inscreverEmEventoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "inscreverEmEvento",
  "business": {
    "actorRef": "publico",
    "title": "Inscrever-se em evento",
    "goal": "Registrar a própria inscrição em um evento publicado.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarEventoPublicado",
        "kind": "locate",
        "entity": "Evento",
        "title": "x",
        "description": "Acessa ou localiza o evento publicado na página pública."
      },
      {
        "stepId": "inspecionarEventoPublicado",
        "kind": "inspect",
        "entity": "Evento",
        "title": "x",
        "description": "Consulta os dados do evento e a disponibilidade de vagas."
      },
      {
        "stepId": "criarInscricao",
        "kind": "act",
        "entity": "Inscricao",
        "effect": "create",
        "title": "x",
        "description": "Informa nome e e-mail para registrar a própria inscrição no evento."
      }
    ],
    "outcome": {
      "statement": "A inscrição é registrada como confirmada quando há vaga ou como entrada na lista de espera quando a capacidade foi atingida.",
      "evidence": [
        "Inscrição vinculada ao evento e ao e-mail informado.",
        "Situação da inscrição indica confirmação ou lista de espera."
      ]
    }
  },
  "businessHash": "sha256:5875af2925d9e998029a4467e12674108eb3e214e2a4bccdc937761ef421339e"
} as const satisfies Ns5JourneyArtifact;

export type InscreverEmEventoJourneyType = typeof inscreverEmEventoJourney;

export default inscreverEmEventoJourney;
