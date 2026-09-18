/// <mls fileReference="_102047_/l4/locacaoEquipamentos/journeys/criarContratoLocacao.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const criarContratoLocacaoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "criarContratoLocacao",
  "business": {
    "actorRef": "atendente",
    "title": "Criar contrato de locação",
    "goal": "Registrar a locação de um cliente para um ou mais equipamentos em um período disponível.",
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
        "stepId": "localizarEquipamentos",
        "kind": "locate",
        "entity": "Equipamento",
        "title": "x",
        "description": "Localiza os equipamentos solicitados e consulta sua situação e disponibilidade para o período informado."
      },
      {
        "stepId": "registrarContrato",
        "kind": "act",
        "entity": "ContratoLocacao",
        "effect": "create",
        "title": "x",
        "description": "Cria o contrato com o cliente, os equipamentos, a data de retirada e a data prevista de devolução; o sistema impede a inclusão de equipamento que tenha locação com período sobreposto."
      }
    ],
    "outcome": {
      "statement": "O contrato de locação é registrado para os equipamentos disponíveis no período solicitado.",
      "evidence": [
        "Contrato de locação criado com cliente, período e equipamentos vinculados.",
        "Os equipamentos do contrato passam a constar como locados para o período registrado."
      ]
    }
  },
  "businessHash": "sha256:e848ef07c208a4623814ac4c74b4737f4bc1a5af85898ba2814be976a344c266"
} as const satisfies Ns5JourneyArtifact;

export type CriarContratoLocacaoJourneyType = typeof criarContratoLocacaoJourney;

export default criarContratoLocacaoJourney;
