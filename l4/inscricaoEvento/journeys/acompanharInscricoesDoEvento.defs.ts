/// <mls fileReference="_102047_/l4/inscricaoEvento/journeys/acompanharInscricoesDoEvento.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const acompanharInscricoesDoEventoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "acompanharInscricoesDoEvento",
  "business": {
    "actorRef": "organizador",
    "title": "Acompanhar inscrições e baixar lista",
    "goal": "Consultar os inscritos de um evento, suas vagas ocupadas e obter a lista em CSV.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarEventoParaAcompanhamento",
        "kind": "locate",
        "entity": "Evento",
        "title": "x",
        "description": "Localiza o evento cujas inscrições deseja acompanhar."
      },
      {
        "stepId": "inspecionarOcupacaoDoEvento",
        "kind": "inspect",
        "entity": "Evento",
        "title": "x",
        "description": "Consulta o total de vagas ocupadas e a capacidade do evento."
      },
      {
        "stepId": "inspecionarListaDeInscricoes",
        "kind": "inspect",
        "entity": "Inscricao",
        "title": "x",
        "description": "Visualiza os inscritos, suas situações e a lista disponível para download em CSV."
      }
    ],
    "outcome": {
      "statement": "O organizador acompanha a ocupação e obtém a lista de inscrições do evento em CSV.",
      "evidence": [
        "Total de vagas ocupadas exibido para o evento.",
        "Lista de inscrições disponível e baixada em formato CSV."
      ]
    }
  },
  "businessHash": "sha256:5d9af0b0a37decbf8a35a03cf73d00ec02e73baac43b95124a6e65a78bc95ddd"
} as const satisfies Ns5JourneyArtifact;

export type AcompanharInscricoesDoEventoJourneyType = typeof acompanharInscricoesDoEventoJourney;

export default acompanharInscricoesDoEventoJourney;
