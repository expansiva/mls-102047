/// <mls fileReference="_102047_/l4/financeiro/journeys/index.defs.ts" enhancement="_blank"/>

import type { Ns5JourneyIndexArtifact } from '/_102035_/l2/solution/types.js';

export const financeiroJourneyIndex = {
  "schemaVersion": "2026-09-10-ns5-journey-v1",
  "moduleName": "financeiro",
  "journeys": [
    {
      "journeyId": "registrarBaixaDeTitulo",
      "actorRef": "caixa",
      "title": "Registrar recebimento de título"
    },
    {
      "journeyId": "iniciarCobrancaPorCartaoNoCaixa",
      "actorRef": "caixa",
      "title": "Cobrar título por cartão"
    },
    {
      "journeyId": "estornarRecebimentoDoMesmoDia",
      "actorRef": "caixa",
      "title": "Estornar recebimento do mesmo dia"
    },
    {
      "journeyId": "acompanharPainelDeRecebiveis",
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
      "journeyId": "pagarMeuTituloComCartao",
      "actorRef": "pagador",
      "title": "Pagar meu título com cartão"
    },
    {
      "journeyId": "processarPagamentoPorCartao",
      "actorRef": "stripe",
      "title": "Processar pagamento por cartão"
    }
  ],
  "systemDecisions": []
} as const satisfies Ns5JourneyIndexArtifact;

export type FinanceiroJourneyIndexType = typeof financeiroJourneyIndex;

export default financeiroJourneyIndex;
