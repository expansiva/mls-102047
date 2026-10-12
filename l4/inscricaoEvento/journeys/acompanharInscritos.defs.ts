/// <mls fileReference="_102047_/l4/inscricaoEvento/journeys/acompanharInscritos.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const acompanharInscritosJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "acompanharInscritos",
  "business": {
    "actorRef": "organizador",
    "title": "Acompanhar inscritos e baixar lista",
    "goal": "Ver os inscritos de um evento, o total de vagas ocupadas e baixar a lista em CSV.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarEventoInscritos",
        "kind": "locate",
        "entity": "Evento",
        "title": "Localizar evento",
        "description": "O organizador busca o evento publicado que deseja acompanhar."
      },
      {
        "stepId": "verOcupacao",
        "kind": "inspect",
        "entity": "Evento",
        "title": "Ver vagas ocupadas",
        "description": "O organizador vê o total de vagas, as vagas ocupadas e o tamanho da lista de espera."
      },
      {
        "stepId": "verInscritos",
        "kind": "inspect",
        "entity": "Inscricao",
        "title": "Ver lista de inscritos",
        "description": "O organizador vê os inscritos confirmados e a lista de espera na ordem de chegada."
      },
      {
        "stepId": "baixarCsv",
        "kind": "inspect",
        "entity": "Inscricao",
        "title": "Baixar lista em CSV",
        "description": "O organizador baixa a lista de inscritos do evento em arquivo CSV."
      }
    ],
    "outcome": {
      "statement": "O organizador conhece a ocupação do evento e tem a lista de inscritos em CSV.",
      "evidence": [
        "Total de vagas ocupadas exibido",
        "Arquivo CSV com os inscritos baixado"
      ]
    }
  },
  "businessHash": "sha256:e6fb53d30de796a20f2c1afe1ec31039fb4f401c808ca2612977c43a189e0b6f"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type AcompanharInscritosJourneyType = typeof acompanharInscritosJourney;

export default acompanharInscritosJourney;
