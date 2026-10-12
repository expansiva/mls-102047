/// <mls fileReference="_102047_/l4/locacaoEquipamentos/journeys/registrarDevolucao.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const registrarDevolucaoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "registrarDevolucao",
  "business": {
    "actorRef": "atendente",
    "title": "Registrar devolução",
    "goal": "Encerrar a locação registrando a data real de devolução e a multa por atraso, quando houver.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarContrato",
        "kind": "locate",
        "entity": "ContratoLocacao",
        "title": "Localizar o contrato",
        "description": "Busca o contrato vigente pelo cliente, número do contrato ou código do equipamento."
      },
      {
        "stepId": "conferirContrato",
        "kind": "inspect",
        "entity": "ContratoLocacao",
        "title": "Conferir contrato e equipamentos",
        "description": "Confere os equipamentos, o período contratado e a data prevista de devolução."
      },
      {
        "stepId": "registrarDataReal",
        "kind": "act",
        "entity": "ContratoLocacao",
        "effect": "transition",
        "transitionRef": "registrarDevolucao",
        "title": "Registrar data real de devolução",
        "description": "Informa a data real de devolução; se houve atraso, o sistema calcula a multa (diária × dias de atraso × 1,5) e os equipamentos voltam a ficar disponíveis."
      },
      {
        "stepId": "conferirMulta",
        "kind": "inspect",
        "entity": "ContratoLocacao",
        "title": "Conferir multa por atraso",
        "description": "Verifica os dias de atraso e o valor da multa calculada para informar ao cliente."
      }
    ],
    "outcome": {
      "statement": "O contrato está encerrado com a data real de devolução e a multa calculada quando houve atraso.",
      "evidence": [
        "Contrato aparece como devolvido com a data real de devolução",
        "Multa por atraso exibida com dias de atraso e valor quando a devolução passou da data prevista",
        "Equipamentos devolvidos aparecem com situação disponível"
      ]
    }
  },
  "businessHash": "sha256:7d0e355a8ab073d0965a7dbc31e5e5b77f188df1fdd5414cfc47ad73af52e0d0"
} as const satisfies Ns5Readonly<Ns5JourneyArtifact>;

export type RegistrarDevolucaoJourneyType = typeof registrarDevolucaoJourney;

export default registrarDevolucaoJourney;
