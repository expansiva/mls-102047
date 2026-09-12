/// <mls fileReference="_102047_/l4/comandaRestaurante/journeys/cancelarItemComanda.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const cancelarItemComandaJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "cancelarItemComanda",
  "business": {
    "actorRef": "garcom",
    "title": "Cancelar item lançado por engano",
    "goal": "Cancelar um item registrado indevidamente enquanto a comanda estiver aberta.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarComandaParaCancelamento",
        "kind": "locate",
        "entity": "Comanda",
        "title": "Localizar comanda aberta",
        "description": "Usa a comanda em contexto ou localiza a comanda que contém o item."
      },
      {
        "stepId": "inspecionarComandaParaCancelamento",
        "kind": "inspect",
        "entity": "Comanda",
        "title": "Conferir situação da comanda",
        "description": "Confere que a comanda está aberta."
      },
      {
        "stepId": "localizarItemLancado",
        "kind": "locate",
        "entity": "ItemComanda",
        "title": "Localizar item lançado",
        "description": "Localiza o item que foi lançado por engano."
      },
      {
        "stepId": "inspecionarItemLancado",
        "kind": "inspect",
        "entity": "ItemComanda",
        "title": "Conferir item lançado",
        "description": "Confere o item selecionado antes do cancelamento."
      },
      {
        "stepId": "cancelarItemLancado",
        "kind": "act",
        "entity": "ItemComanda",
        "affects": [
          "Comanda"
        ],
        "title": "Cancelar item",
        "description": "Cancela o item lançado indevidamente na comanda aberta."
      }
    ],
    "outcome": {
      "statement": "O item lançado por engano deixa de compor a comanda.",
      "evidence": [
        "Item identificado como cancelado.",
        "Total da comanda recalculado sem o item cancelado."
      ]
    }
  },
  "businessHash": "sha256:b7b98382e08c6edda1c86fec0d474910eb6cc1c05c295c6366ec45fa148d8f0d"
} as const satisfies Ns5JourneyArtifact;

export type CancelarItemComandaJourneyType = typeof cancelarItemComandaJourney;

export default cancelarItemComandaJourney;
