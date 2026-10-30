/// <mls fileReference="_102047_/l4/notasTeste41/journeys/registrarNota.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const registrarNotaJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "registrarNota",
  "business": {
    "actorRef": "operador",
    "title": "Registrar nota",
    "goal": "Registrar uma nota curta e confirmar que ela aparece na lista de notas.",
    "icon": "sticky-note",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "criarNota",
        "kind": "act",
        "entity": "Nota",
        "effect": "create",
        "title": "Criar nova nota",
        "description": "O operador informa o título obrigatório e, se quiser, o texto da nota, e salva; o identificador e a data de criação são atribuídos automaticamente.",
        "icon": "plus"
      },
      {
        "stepId": "confirmarNaLista",
        "kind": "locate",
        "entity": "Nota",
        "title": "Confirmar nota na lista",
        "description": "O operador vê a lista de notas e confirma que a nota recém-criada aparece com seu título e data de criação.",
        "icon": "list"
      }
    ],
    "outcome": {
      "statement": "A nota foi registrada e aparece na lista de notas.",
      "evidence": [
        "A nota aparece na lista com o título informado",
        "A nota tem identificador e data de criação preenchidos"
      ]
    }
  },
  "businessHash": "sha256:4b22532416feea16e41ab83ad7fba4d4578b0fe31c0b95c687cca10afe03da3a"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type RegistrarNotaJourneyType = typeof registrarNotaJourney;

export default registrarNotaJourney;
