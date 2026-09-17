/// <mls fileReference="_102047_/l4/comandaRestaurante/journeys/cancelarItemLancado.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const cancelarItemLancadoJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "cancelarItemLancado",
  "business": {
    "actorRef": "garcom",
    "title": "Cancelar item lançado por engano",
    "goal": "Cancelar um lançamento incorreto enquanto a comanda estiver aberta.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarComandaParaCorrecao",
        "kind": "locate",
        "entity": "Comanda",
        "title": "Localizar comanda aberta",
        "description": "Usa a comanda em contexto ou localiza a comanda aberta que precisa de correção."
      },
      {
        "stepId": "inspecionarItensLancados",
        "kind": "inspect",
        "entity": "ItemComanda",
        "title": "Inspecionar itens lançados",
        "description": "Confere os itens já lançados para identificar o lançamento feito por engano."
      },
      {
        "stepId": "cancelarItem",
        "kind": "act",
        "entity": "ItemComanda",
        "effect": "transition",
        "transitionRef": "cancelarItemComanda",
        "title": "Cancelar item",
        "description": "Cancela o item lançado por engano enquanto a comanda permanece aberta."
      }
    ],
    "outcome": {
      "statement": "O lançamento incorreto é cancelado e deixa de compor a cobrança.",
      "evidence": [
        "O item apresenta situação cancelada.",
        "O total da comanda é recalculado sem o valor do item cancelado."
      ]
    }
  },
  "businessHash": "sha256:7333b3d3790d515c70f6ec212b54e97906b3b286da13ef8efbf1b420e25bd93b"
} as const satisfies Ns5JourneyArtifact;

export type CancelarItemLancadoJourneyType = typeof cancelarItemLancadoJourney;

export default cancelarItemLancadoJourney;
