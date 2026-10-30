/// <mls fileReference="_102047_/l4/notasTeste41/journeys/consultarNota.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const consultarNotaJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "consultarNota",
  "business": {
    "actorRef": "operador",
    "title": "Consultar nota",
    "goal": "Encontrar uma nota na lista e abri-la para leitura.",
    "icon": "book-open",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "listarNotas",
        "kind": "locate",
        "entity": "Nota",
        "title": "Listar notas",
        "description": "O operador abre a lista de notas e localiza a nota desejada pelo título ou pela data de criação.",
        "icon": "list"
      },
      {
        "stepId": "lerNota",
        "kind": "inspect",
        "entity": "Nota",
        "title": "Abrir nota para leitura",
        "description": "O operador abre a nota e lê o título, o texto, o identificador e a data de criação.",
        "icon": "eye"
      }
    ],
    "outcome": {
      "statement": "O operador leu o conteúdo da nota escolhida.",
      "evidence": [
        "A nota aberta mostra título, texto, identificador e data de criação"
      ]
    }
  },
  "businessHash": "sha256:f206541c03f3fb457cc64a84be677cc269b35d5b5270bccf3b4d0e5b4793a85a"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type ConsultarNotaJourneyType = typeof consultarNotaJourney;

export default consultarNotaJourney;
