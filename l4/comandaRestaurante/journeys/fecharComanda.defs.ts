/// <mls fileReference="_102047_/l4/comandaRestaurante/journeys/fecharComanda.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const fecharComandaJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "fecharComanda",
  "business": {
    "actorRef": "caixa",
    "title": "Fechar comanda e liberar mesa",
    "goal": "Registrar o pagamento de uma comanda, aplicar eventual desconto e concluir o atendimento da mesa.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarComandaParaFechamento",
        "kind": "locate",
        "entity": "Comanda",
        "title": "Localizar comanda aberta",
        "description": "Usa a comanda em contexto ou localiza a comanda aberta da mesa para fechamento."
      },
      {
        "stepId": "consultarTotal",
        "kind": "inspect",
        "entity": "Comanda",
        "title": "Consultar total",
        "description": "Confere o total calculado a partir dos itens válidos lançados na comanda."
      },
      {
        "stepId": "concluirFechamento",
        "kind": "act",
        "entity": "Comanda",
        "effect": "transition",
        "transitionRef": "fecharComanda",
        "title": "Fechar comanda",
        "description": "Aplica um desconto, quando houver, registra a forma de pagamento e fecha a comanda, liberando a mesa."
      }
    ],
    "outcome": {
      "statement": "A comanda é encerrada com o pagamento registrado e a mesa fica disponível.",
      "evidence": [
        "A comanda fechada apresenta o total final, o desconto aplicado quando existente e a forma de pagamento.",
        "A mesa vinculada à comanda está livre para novo atendimento."
      ]
    }
  },
  "businessHash": "sha256:523a96944308896534532d4f3f50e3a97e502b77bb03f9bc1ae37b83b6b91486"
} as const satisfies Ns5JourneyArtifact;

export type FecharComandaJourneyType = typeof fecharComandaJourney;

export default fecharComandaJourney;
