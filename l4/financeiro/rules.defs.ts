/// <mls fileReference="_102047_/l4/financeiro/rules.defs.ts" enhancement="_blank"/>

import type { Ns5RulesArtifactV2 } from '/_102035_/l2/solution/types.js';

export const financeiroRules = {
  "schemaVersion": "2026-09-16-ns5-rules-v2",
  "moduleName": "financeiro",
  "rules": {
    "sameDayReversal": "Um recebimento somente pode ser estornado na mesma data em que foi registrado.",
    "ruleForeignNamespaceRefused": "Dados de namespaces de outros módulos não podem ser gravados no namespace financeiro.",
    "ruleDocumentShapeValidated": "Todo documento de pessoa deve obedecer à estrutura válida para o seu tipo e país.",
    "ruleIdentityNeverInNamespace": "Dados de identidade da pessoa não podem ser armazenados no namespace financeiro.",
    "rulePersonSsnUniqueForUs": "Nos Estados Unidos, um número de seguridade social informado só pode identificar uma única pessoa.",
    "rulePersonPrivacyConsentRequiredBrEu": "No Brasil e na União Europeia, o consentimento de privacidade deve estar registrado quando exigido pela legislação aplicável.",
    "origemCobrancaUnica": "Cada combinação de módulo de origem e referência de origem pode gerar apenas um título a receber.",
    "saldoTituloConsistente": "O saldo em aberto do título deve ser igual ao valor original menos a soma dos recebimentos não estornados vinculados a ele.",
    "receiptAmountPositive": "O valor de cada recebimento deve ser maior que zero.",
    "receiptCannotExceedOpenBalance": "O valor de um recebimento não pode ser maior que o saldo em aberto do título no momento do registro.",
    "cardPaymentRequiresStripeConfirmation": "Todo recebimento por cartão deve possuir a confirmação da transação pela Stripe.",
    "tituloVencidoComSaldoAberto": "Um título é considerado vencido quando sua data de vencimento é anterior à data atual e seu saldo em aberto é maior que zero.",
    "painelRecebiveisAgrupado": "O painel de recebíveis deve consolidar os valores dos títulos conforme o período e a origem de cobrança selecionados.",
    "extratoPagadorConsolidado": "O extrato por pagador deve consolidar os títulos e os recebimentos vinculados aos títulos desse pagador."
  }
} as const satisfies Ns5RulesArtifactV2;

export type FinanceiroRulesType = typeof financeiroRules;

export default financeiroRules;
