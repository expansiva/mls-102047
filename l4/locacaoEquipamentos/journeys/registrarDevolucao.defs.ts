/// <mls fileReference="_102047_/l4/locacaoEquipamentos/journeys/registrarDevolucao.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const registrarDevolucaoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "registrarDevolucao",
  "business": {
    "actorRef": "atendente",
    "title": "Registrar devolução de equipamentos",
    "goal": "Registrar a data real de devolução e concluir a locação, com multa calculada quando houver atraso.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarContrato",
        "kind": "locate",
        "entity": "ContratoLocacao",
        "title": "x",
        "description": "Localiza o contrato a partir do contrato em mãos ou da identificação do cliente e dos equipamentos."
      },
      {
        "stepId": "conferirContrato",
        "kind": "inspect",
        "entity": "ContratoLocacao",
        "title": "x",
        "description": "Confere os equipamentos locados, a data prevista de devolução e os valores das diárias."
      },
      {
        "stepId": "registrarDataDevolucao",
        "kind": "act",
        "entity": "ContratoLocacao",
        "affects": [
          "Equipamento"
        ],
        "effect": "transition",
        "transitionRef": "registrarDevolucao",
        "title": "x",
        "description": "Registra a data real de devolução, conclui o contrato e libera os equipamentos devolvidos."
      },
      {
        "stepId": "consultarMulta",
        "kind": "inspect",
        "entity": "ContratoLocacao",
        "title": "x",
        "description": "Consulta a multa calculada quando a devolução ocorreu após a data prevista."
      }
    ],
    "outcome": {
      "statement": "A devolução fica registrada, os equipamentos são liberados e a multa por atraso fica disponível quando aplicável.",
      "evidence": [
        "Contrato com data real de devolução registrada.",
        "Situação dos equipamentos devolvidos atualizada.",
        "Multa calculada a partir das diárias e dos dias de atraso, quando houver."
      ]
    }
  },
  "businessHash": "sha256:6e5155b9f6237963e95df05a6bcffd33b6168603f2825e3f066158d477c862f6"
} as const satisfies Ns5JourneyArtifact;

export type RegistrarDevolucaoJourneyType = typeof registrarDevolucaoJourney;

export default registrarDevolucaoJourney;
