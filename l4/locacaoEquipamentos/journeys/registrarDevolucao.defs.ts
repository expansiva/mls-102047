/// <mls fileReference="_102047_/l4/locacaoEquipamentos/journeys/registrarDevolucao.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const registrarDevolucaoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "registrarDevolucao",
  "business": {
    "actorRef": "atendente",
    "title": "Registrar devolução de locação",
    "goal": "Registrar a data efetiva de devolução e apurar eventual multa por atraso.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarContrato",
        "kind": "locate",
        "entity": "ContratoLocacao",
        "title": "x",
        "description": "Localiza o contrato de locação em aberto para o qual os equipamentos foram devolvidos."
      },
      {
        "stepId": "conferirContrato",
        "kind": "inspect",
        "entity": "ContratoLocacao",
        "title": "x",
        "description": "Confere os equipamentos locados, a data prevista de devolução e os dados do contrato antes de registrar o retorno."
      },
      {
        "stepId": "registrarRetorno",
        "kind": "act",
        "entity": "ContratoLocacao",
        "effect": "transition",
        "transitionRef": "registrarDevolucao",
        "title": "x",
        "description": "Registra a data real de devolução. Quando houver atraso, o sistema calcula a multa com base na diária de cada equipamento, nos dias de atraso e no fator de 1,5."
      }
    ],
    "outcome": {
      "statement": "A devolução é registrada e a multa por atraso, quando aplicável, fica apurada no contrato.",
      "evidence": [
        "O contrato registra a data real de devolução.",
        "O contrato apresenta a multa calculada quando a devolução ocorreu após a data prevista."
      ]
    }
  },
  "businessHash": "sha256:80148690075ac2a7a73e849c85e3e89f2f1d2260876febcf680faf45f77c729d"
} as const satisfies Ns5JourneyArtifact;

export type RegistrarDevolucaoJourneyType = typeof registrarDevolucaoJourney;

export default registrarDevolucaoJourney;
