/// <mls fileReference="_102047_/l4/locacaoEquipamentos/journeys/criarContratoLocacao.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const criarContratoLocacaoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "criarContratoLocacao",
  "business": {
    "actorRef": "atendente",
    "title": "Criar contrato de locação",
    "goal": "Registrar a locação de um cliente para um ou mais equipamentos no período solicitado.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "localizarCliente",
        "kind": "locate",
        "entity": "Cliente",
        "title": "x",
        "description": "Localiza o cliente que fará a locação."
      },
      {
        "stepId": "consultarEquipamentos",
        "kind": "inspect",
        "entity": "Equipamento",
        "title": "x",
        "description": "Confere os equipamentos solicitados, suas diárias e a disponibilidade no período de locação."
      },
      {
        "stepId": "registrarContrato",
        "kind": "act",
        "entity": "ContratoLocacao",
        "affects": [
          "Equipamento"
        ],
        "effect": "create",
        "title": "x",
        "description": "Cria o contrato com o cliente, os equipamentos, a data de retirada e a data prevista de devolução."
      }
    ],
    "outcome": {
      "statement": "O contrato de locação é registrado para os equipamentos disponíveis no período informado.",
      "evidence": [
        "Contrato de locação criado com cliente, período e equipamentos.",
        "Equipamentos do contrato passam a constar como locados para o período registrado."
      ]
    }
  },
  "businessHash": "sha256:ab1a0c1931d471eac12ccbe0d7eaf26aa7bdfdd9f6ffd6678cacb74e982348a4"
} as const satisfies Ns5JourneyArtifact;

export type CriarContratoLocacaoJourneyType = typeof criarContratoLocacaoJourney;

export default criarContratoLocacaoJourney;
