/// <mls fileReference="_102047_/l4/comandaRestaurante/journeys/fecharComanda.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const fecharComandaJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "fecharComanda",
  "business": {
    "actorRef": "caixa",
    "title": "Fechar comanda e liberar mesa",
    "goal": "Receber uma comanda aberta, registrar desconto opcional e pagamento, e liberar a mesa.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarComandaParaFechamento",
        "kind": "locate",
        "entity": "Comanda",
        "title": "Localizar comanda aberta",
        "description": "Usa a comanda em contexto ou localiza a comanda aberta da mesa."
      },
      {
        "stepId": "inspecionarComandaParaFechamento",
        "kind": "inspect",
        "entity": "Comanda",
        "title": "Conferir total da comanda",
        "description": "Confere os itens lançados e o total a cobrar."
      },
      {
        "stepId": "fecharComanda",
        "kind": "act",
        "entity": "Comanda",
        "affects": [
          "Mesa"
        ],
        "title": "Registrar fechamento e pagamento",
        "description": "Aplica desconto opcional, registra a forma de pagamento, fecha a comanda e libera a mesa."
      }
    ],
    "outcome": {
      "statement": "A comanda é fechada, o pagamento fica registrado e a mesa é liberada.",
      "evidence": [
        "Comanda identificada como fechada com total final e desconto, quando aplicado.",
        "Forma de pagamento registrada.",
        "Mesa identificada como disponível."
      ]
    }
  },
  "businessHash": "sha256:d45784c973770e00027fa7462fad3702325eeae3136fb8fd6608e1c3153607f1"
} as const satisfies Ns5JourneyArtifact;

export type FecharComandaJourneyType = typeof fecharComandaJourney;

export default fecharComandaJourney;
