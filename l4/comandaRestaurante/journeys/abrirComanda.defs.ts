/// <mls fileReference="_102047_/l4/comandaRestaurante/journeys/abrirComanda.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const abrirComandaJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "abrirComanda",
  "business": {
    "actorRef": "garcom",
    "title": "Abrir comanda para uma mesa",
    "goal": "Iniciar o atendimento de uma mesa ocupada com uma comanda aberta.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "localizarMesa",
        "kind": "locate",
        "entity": "Mesa",
        "title": "Localizar mesa",
        "description": "Localiza a mesa que receberá a comanda e confirma que ela está disponível."
      },
      {
        "stepId": "criarComanda",
        "kind": "act",
        "entity": "Comanda",
        "effect": "create",
        "title": "Abrir comanda",
        "description": "Abre uma comanda vinculada à mesa selecionada, deixando-a disponível para o lançamento de itens."
      }
    ],
    "outcome": {
      "statement": "Uma comanda aberta fica associada à mesa para registrar o consumo.",
      "evidence": [
        "A comanda aberta está identificada para a mesa selecionada.",
        "A mesa passa a estar ocupada pela comanda."
      ]
    }
  },
  "businessHash": "sha256:11342c75532e708c14dfc42502689718e156c9e987285dd0c03ba28120a096ad"
} as const satisfies Ns5JourneyArtifact;

export type AbrirComandaJourneyType = typeof abrirComandaJourney;

export default abrirComandaJourney;
