/// <mls fileReference="_102047_/l4/locacaoEquipamentos/journeys/registrarDevolucao.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const registrarDevolucaoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "registrarDevolucao",
  "business": {
    "actorRef": "atendente",
    "title": "Registrar devolução de equipamentos",
    "goal": "Registrar a data real de devolução dos equipamentos de um contrato e apurar eventual multa por atraso.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarContrato",
        "kind": "locate",
        "entity": "ContratoLocacao",
        "title": "Localizar contrato",
        "description": "Localiza o contrato em aberto para devolução."
      },
      {
        "stepId": "inspecionarContrato",
        "kind": "inspect",
        "entity": "ContratoLocacao",
        "title": "Conferir locação",
        "description": "Consulta os equipamentos locados e a data prevista de devolução."
      },
      {
        "stepId": "registrarDataDevolucao",
        "kind": "act",
        "entity": "ContratoLocacao",
        "affects": [
          "Equipamento"
        ],
        "title": "Registrar devolução",
        "description": "Registra a data real de devolução e atualiza a situação dos equipamentos; quando houver atraso, o sistema calcula a multa."
      }
    ],
    "outcome": {
      "statement": "A devolução é registrada e a multa por atraso, quando aplicável, fica apurada no contrato.",
      "evidence": [
        "Contrato contém a data real de devolução.",
        "Contrato apresenta a multa calculada quando a devolução ocorreu após a data prevista.",
        "Equipamentos devolvidos deixam de constar como locados."
      ]
    }
  },
  "businessHash": "sha256:9c33ac173c9f1662af037af4a55e6abc5a825a0bd6e32e0cf266866e051c178c"
} as const satisfies Ns5JourneyArtifact;

export type RegistrarDevolucaoJourneyType = typeof registrarDevolucaoJourney;

export default registrarDevolucaoJourney;
