/// <mls fileReference="_102047_/l4/comandaRestaurante/journeys/fecharComanda.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const fecharComandaJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "fecharComanda",
  "business": {
    "actorRef": "caixa",
    "title": "Fechar comanda e registrar pagamento",
    "goal": "Receber uma comanda aberta, aplicar desconto quando necessário e liberar a mesa.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarComandaParaFechamento",
        "kind": "locate",
        "entity": "Comanda",
        "title": "Localizar comanda aberta",
        "description": "Usa a comanda em contexto ou localiza a comanda aberta que será encerrada."
      },
      {
        "stepId": "consultarTotalDaComanda",
        "kind": "inspect",
        "entity": "Comanda",
        "title": "Consultar total",
        "description": "Confere os itens válidos e o total a receber da comanda."
      },
      {
        "stepId": "fecharEregistrarPagamento",
        "kind": "act",
        "entity": "Comanda",
        "effect": "transition",
        "transitionRef": "fecharComanda",
        "title": "Fechar comanda",
        "description": "Aplica desconto opcional, registra a forma de pagamento e encerra a comanda; a mesa vinculada fica livre."
      }
    ],
    "outcome": {
      "statement": "A comanda é encerrada com o pagamento registrado e a mesa é liberada.",
      "evidence": [
        "A comanda apresenta situação fechada, desconto aplicado quando houver e forma de pagamento registrada.",
        "A mesa vinculada é apresentada como disponível."
      ]
    }
  },
  "businessHash": "sha256:fa13c88de6d38f155b78106eccccd347b1a52e8f93440c9d5af87b8446deab58"
} as const satisfies Ns5JourneyArtifact;

export type FecharComandaJourneyType = typeof fecharComandaJourney;

export default fecharComandaJourney;
