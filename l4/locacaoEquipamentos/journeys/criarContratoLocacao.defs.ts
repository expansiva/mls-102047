/// <mls fileReference="_102047_/l4/locacaoEquipamentos/journeys/criarContratoLocacao.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const criarContratoLocacaoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "criarContratoLocacao",
  "business": {
    "actorRef": "atendente",
    "title": "Criar contrato de locação",
    "goal": "Registrar a locação de equipamentos para um cliente no período solicitado.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "informarContrato",
        "kind": "act",
        "entity": "ContratoLocacao",
        "effect": "create",
        "title": "x",
        "description": "Cria o contrato para o cliente, informando a data de retirada, a data prevista de devolução e um ou mais equipamentos. O sistema impede a locação de um equipamento em períodos sobrepostos."
      }
    ],
    "outcome": {
      "statement": "Um contrato de locação é registrado para os equipamentos disponíveis no período informado.",
      "evidence": [
        "O contrato possui identificação, cliente, equipamentos, data de retirada e data prevista de devolução.",
        "Os equipamentos incluídos não possuem outra locação com período sobreposto."
      ]
    }
  },
  "businessHash": "sha256:694634d5424c48494e1e11546442bc27423a21d6e3f392ac8cec36a88deeafc3"
} as const satisfies Ns5JourneyArtifact;

export type CriarContratoLocacaoJourneyType = typeof criarContratoLocacaoJourney;

export default criarContratoLocacaoJourney;
