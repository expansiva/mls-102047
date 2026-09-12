/// <mls fileReference="_102047_/l4/financeiro/journeys/iniciarCobrancaPorCartaoNoCaixa.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyArtifact } from '/_102035_/l2/solution/types.js';

export const iniciarCobrancaPorCartaoNoCaixaJourney = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "journeyId": "iniciarCobrancaPorCartaoNoCaixa",
  "business": {
    "actorRef": "caixa",
    "title": "Cobrar título por cartão",
    "goal": "Iniciar no caixa o pagamento de um título em aberto por cartão.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "localizarTituloParaCartao",
        "kind": "locate",
        "entity": "TituloReceber",
        "title": "Localizar título para cartão",
        "description": "Localizar o título em aberto que será cobrado por cartão."
      },
      {
        "stepId": "conferirDadosDaCobranca",
        "kind": "inspect",
        "entity": "TituloReceber",
        "title": "Conferir dados da cobrança",
        "description": "Conferir o pagador, o valor e o saldo do título antes de iniciar a cobrança."
      },
      {
        "stepId": "registrarSolicitacaoDeCartao",
        "kind": "act",
        "entity": "Recebimento",
        "affects": [
          "TituloReceber"
        ],
        "effect": "create",
        "title": "Registrar solicitação de cartão",
        "description": "Registrar a solicitação de recebimento por cartão vinculada ao título."
      },
      {
        "stepId": "encaminharCobrancaParaStripe",
        "kind": "handoff",
        "entity": "Recebimento",
        "title": "Encaminhar cobrança para processamento",
        "description": "Encaminhar a cobrança por cartão para processamento.",
        "handoffTo": "stripe"
      }
    ],
    "outcome": {
      "statement": "A cobrança por cartão é encaminhada para processamento.",
      "evidence": [
        "Solicitação de recebimento por cartão registrada.",
        "Cobrança encaminhada ao processador."
      ]
    }
  },
  "businessHash": "sha256:15a80bafc3ca4f3b6e5da164047118ebc976718400a90fdf470299fe38a922ea"
} as const satisfies Ns5JourneyArtifact;

export type IniciarCobrancaPorCartaoNoCaixaJourneyType = typeof iniciarCobrancaPorCartaoNoCaixaJourney;

export default iniciarCobrancaPorCartaoNoCaixaJourney;
