/// <mls fileReference="_102047_/l4/comandaRestaurante/journeys/abrirComanda.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const abrirComandaJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "abrirComanda",
  "business": {
    "actorRef": "garcom",
    "title": "Abrir comanda para uma mesa",
    "goal": "Iniciar o atendimento de uma mesa disponível.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "localizarMesaDisponivel",
        "kind": "locate",
        "entity": "Mesa",
        "title": "Localizar mesa disponível",
        "description": "Localiza e seleciona uma mesa disponível para o novo atendimento."
      },
      {
        "stepId": "abrirComandaParaMesa",
        "kind": "act",
        "entity": "Comanda",
        "effect": "create",
        "title": "Abrir comanda",
        "description": "Abre uma comanda vinculada à mesa selecionada; a mesa passa a estar ocupada."
      }
    ],
    "outcome": {
      "statement": "Uma comanda aberta fica vinculada à mesa selecionada.",
      "evidence": [
        "A comanda possui identificação, mesa vinculada e situação aberta.",
        "A mesa é apresentada como ocupada."
      ]
    }
  },
  "businessHash": "sha256:548a6fcc6bd524ddb8f3a06cc6cebe7d7a68224ff3207f06f1451d85b1051c24"
} as const satisfies Ns5JourneyArtifact;

export type AbrirComandaJourneyType = typeof abrirComandaJourney;

export default abrirComandaJourney;
