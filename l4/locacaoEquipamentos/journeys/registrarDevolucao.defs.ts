/// <mls fileReference="_102047_/l4/locacaoEquipamentos/journeys/registrarDevolucao.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const registrarDevolucaoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "registrarDevolucao",
  "business": {
    "actorRef": "atendente",
    "title": "Registrar devolução de equipamentos",
    "goal": "Registrar a data real de devolução de uma locação e apurar eventual multa por atraso.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarContrato",
        "kind": "locate",
        "entity": "ContratoLocacao",
        "title": "x",
        "description": "Localiza o contrato de locação em devolução quando ele não estiver previamente em contexto."
      },
      {
        "stepId": "consultarContrato",
        "kind": "inspect",
        "entity": "ContratoLocacao",
        "title": "x",
        "description": "Confere os equipamentos locados e a data prevista de devolução do contrato."
      },
      {
        "stepId": "confirmarDevolucao",
        "kind": "act",
        "entity": "ContratoLocacao",
        "effect": "transition",
        "transitionRef": "registrarDevolucao",
        "title": "x",
        "description": "Registra a data real de devolução e encerra a locação; caso haja atraso, o sistema calcula a multa pela diária de cada equipamento multiplicada pelos dias de atraso e por 1,5."
      }
    ],
    "outcome": {
      "statement": "A devolução é registrada e a multa por atraso, quando aplicável, fica apurada no contrato.",
      "evidence": [
        "Contrato marcado como devolvido com a data real de devolução.",
        "Valor da multa calculado quando a devolução ocorreu após a data prevista."
      ]
    }
  },
  "businessHash": "sha256:240300fd9f8ad6e6806ebe1a572ff671e47011b48675f7f82065a3b05d3b3222"
} as const satisfies Ns5JourneyArtifact;

export type RegistrarDevolucaoJourneyType = typeof registrarDevolucaoJourney;

export default registrarDevolucaoJourney;
