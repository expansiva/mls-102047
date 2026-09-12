/// <mls fileReference="_102047_/l4/locacaoEquipamentos/journeys/criarContratoLocacao.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const criarContratoLocacaoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "criarContratoLocacao",
  "business": {
    "actorRef": "atendente",
    "title": "Criar contrato de locação",
    "goal": "Registrar a locação de um cliente com um ou mais equipamentos para o período solicitado.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "localizarCliente",
        "kind": "locate",
        "entity": "Cliente",
        "title": "Localizar cliente",
        "description": "Localiza o cliente que fará a locação."
      },
      {
        "stepId": "localizarEquipamentos",
        "kind": "locate",
        "entity": "Equipamento",
        "title": "Localizar equipamentos",
        "description": "Localiza os equipamentos solicitados e consulta sua disponibilidade para o período."
      },
      {
        "stepId": "registrarContrato",
        "kind": "act",
        "entity": "ContratoLocacao",
        "affects": [
          "Equipamento"
        ],
        "title": "Registrar contrato",
        "description": "Cria o contrato com os equipamentos, a data de retirada e a data prevista de devolução, impedindo períodos sobrepostos para o mesmo equipamento."
      }
    ],
    "outcome": {
      "statement": "O contrato de locação é registrado para o cliente com equipamentos reservados no período informado.",
      "evidence": [
        "Contrato de locação identificado com cliente, equipamentos e datas de retirada e devolução prevista.",
        "Equipamentos do contrato passam a constar como locados no período contratado."
      ]
    }
  },
  "businessHash": "sha256:a70220331de0e7f8b898efb34aa7bccd801e48124381bb02915b73f32a7cc4f1"
} as const satisfies Ns5JourneyArtifact;

export type CriarContratoLocacaoJourneyType = typeof criarContratoLocacaoJourney;

export default criarContratoLocacaoJourney;
