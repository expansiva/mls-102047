/// <mls fileReference="_102047_/l4/comandaRestaurante/journeys/abrirComanda.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const abrirComandaJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "abrirComanda",
  "business": {
    "actorRef": "garcom",
    "title": "Abrir comanda para uma mesa",
    "goal": "Iniciar uma comanda em uma mesa disponível para registrar o consumo.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "localizarMesa",
        "kind": "locate",
        "entity": "Mesa",
        "title": "Localizar mesa disponível",
        "description": "Localiza a mesa que receberá a comanda."
      },
      {
        "stepId": "inspecionarMesa",
        "kind": "inspect",
        "entity": "Mesa",
        "title": "Conferir mesa",
        "description": "Confere se a mesa está disponível para abertura de comanda."
      },
      {
        "stepId": "abrirComanda",
        "kind": "act",
        "entity": "Comanda",
        "affects": [
          "Mesa"
        ],
        "title": "Abrir comanda",
        "description": "Abre uma comanda vinculada à mesa e a marca como ocupada."
      }
    ],
    "outcome": {
      "statement": "Uma comanda aberta fica vinculada à mesa selecionada.",
      "evidence": [
        "Comanda identificada como aberta para a mesa.",
        "Mesa identificada como ocupada."
      ]
    }
  },
  "businessHash": "sha256:eb23ac2024818599a616b7719c3a868a1eeccd33c801adfc35703f6edb59496f"
} as const satisfies Ns5JourneyArtifact;

export type AbrirComandaJourneyType = typeof abrirComandaJourney;

export default abrirComandaJourney;
