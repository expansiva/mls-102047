/// <mls fileReference="_102047_/l4/financeiro/journeys/index.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyIndexArtifact } from '/_102035_/l2/solution/types.js';

export const financeiroJourneyIndex = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "moduleName": "financeiro",
  "journeys": [
    {
      "journeyId": "receberTitulo",
      "actorRef": "caixa",
      "title": "Receber um título"
    },
    {
      "journeyId": "estornarRecebimentoNoMesmoDia",
      "actorRef": "caixa",
      "title": "Estornar um recebimento no mesmo dia"
    },
    {
      "journeyId": "acompanharRecebiveis",
      "actorRef": "gerenteFinanceiro",
      "title": "Acompanhar recebíveis e títulos vencidos"
    },
    {
      "journeyId": "emitirExtratoPorPagador",
      "actorRef": "gerenteFinanceiro",
      "title": "Emitir extrato por pagador"
    },
    {
      "journeyId": "consultarMeusTitulosErecebimentos",
      "actorRef": "pagador",
      "title": "Consultar meus títulos e recebimentos"
    },
    {
      "journeyId": "pagarTituloComCartao",
      "actorRef": "pagador",
      "title": "Pagar título em aberto com cartão"
    }
  ],
  "systemDecisions": []
} as const satisfies Ns5JourneyIndexArtifact;

export type FinanceiroJourneyIndexType = typeof financeiroJourneyIndex;

export default financeiroJourneyIndex;
