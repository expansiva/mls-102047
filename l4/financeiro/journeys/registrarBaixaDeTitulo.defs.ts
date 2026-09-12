/// <mls fileReference="_102047_/l4/financeiro/journeys/registrarBaixaDeTitulo.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const registrarBaixaDeTituloJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "registrarBaixaDeTitulo",
  "business": {
    "actorRef": "caixa",
    "title": "Registrar recebimento de título",
    "goal": "Receber total ou parcialmente um título por dinheiro ou Pix.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarTituloEmAberto",
        "kind": "locate",
        "entity": "TituloReceber",
        "title": "Localizar título em aberto",
        "description": "Localizar o título em aberto que será recebido."
      },
      {
        "stepId": "conferirTitulo",
        "kind": "inspect",
        "entity": "TituloReceber",
        "title": "Conferir título",
        "description": "Conferir o pagador, o valor, o vencimento e o saldo pendente do título."
      },
      {
        "stepId": "registrarRecebimento",
        "kind": "act",
        "entity": "Recebimento",
        "affects": [
          "TituloReceber"
        ],
        "effect": "create",
        "title": "Registrar recebimento",
        "description": "Registrar o valor recebido, inclusive em baixa parcial, e o meio de pagamento em dinheiro ou Pix."
      }
    ],
    "outcome": {
      "statement": "O recebimento é registrado e o saldo do título é atualizado.",
      "evidence": [
        "Comprovante de recebimento registrado.",
        "Saldo pendente do título atualizado."
      ]
    }
  },
  "businessHash": "sha256:05fda5443e3d2a11fe326f8b92172c73b49377395d5f875a0f1070fe5140ed2d"
} as const satisfies Ns5JourneyArtifact;

export type RegistrarBaixaDeTituloJourneyType = typeof registrarBaixaDeTituloJourney;

export default registrarBaixaDeTituloJourney;
