/// <mls fileReference="_102047_/l4/inscricaoEvento/journeys/acompanharInscritos.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const acompanharInscritosJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "acompanharInscritos",
  "business": {
    "actorRef": "organizador",
    "title": "Acompanhar inscritos e baixar CSV",
    "goal": "Ver os inscritos de um evento, o total de vagas ocupadas, a lista de espera e baixar a lista em CSV.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarEventoInscritos",
        "kind": "locate",
        "entity": "Evento",
        "title": "Localizar evento",
        "description": "O organizador escolhe o evento cujos inscritos quer acompanhar."
      },
      {
        "stepId": "verOcupacao",
        "kind": "inspect",
        "entity": "Evento",
        "title": "Ver vagas ocupadas",
        "description": "O organizador vê o total de vagas, as vagas ocupadas e o tamanho da lista de espera."
      },
      {
        "stepId": "verInscricoes",
        "kind": "inspect",
        "entity": "Inscricao",
        "title": "Ver lista de inscritos",
        "description": "O organizador vê as inscrições confirmadas e a lista de espera na ordem de chegada."
      },
      {
        "stepId": "baixarCsv",
        "kind": "act",
        "entity": "Inscricao",
        "effect": "create",
        "title": "Baixar lista em CSV",
        "description": "O organizador gera e baixa o arquivo CSV com a lista de inscritos do evento."
      }
    ],
    "outcome": {
      "statement": "O organizador conhece a ocupação do evento e tem a lista de inscritos em CSV.",
      "evidence": [
        "Total de vagas ocupadas exibido",
        "Arquivo CSV baixado com nome e e-mail dos inscritos"
      ]
    }
  },
  "businessHash": "sha256:fe6a74a5880117b1f733059d7f2ef114ec39172d0961f2526b1300d3c4fc574a"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type AcompanharInscritosJourneyType = typeof acompanharInscritosJourney;

export default acompanharInscritosJourney;
