/// <mls fileReference="_102047_/l4/financeiro/journeys/index.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyIndexArtifact } from '/_102035_/l2/solution/types.js';

export const financeiroJourneyIndex = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "moduleName": "financeiro",
  "journeys": [
    {
      "journeyId": "registrarRecebimento",
      "actorRef": "caixa",
      "title": "Registrar recebimento de título"
    },
    {
      "journeyId": "estornarRecebimentoNoMesmoDia",
      "actorRef": "caixa",
      "title": "Estornar recebimento no mesmo dia"
    },
    {
      "journeyId": "acompanharPainelRecebiveis",
      "actorRef": "gerenteFinanceiro",
      "title": "Acompanhar painel de recebíveis"
    },
    {
      "journeyId": "consultarTitulosVencidos",
      "actorRef": "gerenteFinanceiro",
      "title": "Consultar títulos vencidos"
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
