/// <mls fileReference="_102047_/l4/inscricaoEvento/journeys/acompanharEexportarInscricoes.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const acompanharEexportarInscricoesJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "acompanharEexportarInscricoes",
  "business": {
    "actorRef": "organizador",
    "title": "Acompanhar e exportar inscrições",
    "goal": "Consultar os inscritos e a ocupação do evento e obter a lista de inscrições em CSV.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarEvento",
        "kind": "locate",
        "entity": "Evento",
        "title": "Localizar evento",
        "description": "Localiza o evento cadastrado ou usa o evento já aberto no contexto."
      },
      {
        "stepId": "consultarInscritosEocupacao",
        "kind": "inspect",
        "entity": "Evento",
        "title": "Consultar inscritos e ocupação",
        "description": "Visualiza as inscrições do evento, suas situações e o total de vagas ocupadas."
      },
      {
        "stepId": "baixarListaCsv",
        "kind": "inspect",
        "entity": "Inscricao",
        "title": "Baixar lista de inscrições em CSV",
        "description": "Obtém a lista de inscrições do evento no formato CSV, sem alterar as inscrições."
      }
    ],
    "outcome": {
      "statement": "O organizador consulta a ocupação do evento e obtém a lista de inscrições em CSV.",
      "evidence": [
        "Lista de inscritos e respectivas situações exibida.",
        "Total de vagas ocupadas exibido.",
        "Arquivo CSV da lista de inscrições disponibilizado para download."
      ]
    }
  },
  "businessHash": "sha256:870333f5ec002296b221f9d055dfe59b68986524cf1f5f1d6e35b66855cc8044"
} as const satisfies Ns5JourneyArtifact;

export type AcompanharEexportarInscricoesJourneyType = typeof acompanharEexportarInscricoesJourney;

export default acompanharEexportarInscricoesJourney;
