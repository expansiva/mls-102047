/// <mls fileReference="_102047_/l4/financeiro/rules.defs.ts" enhancement="_blank"/>

import type { Ns5RulesArtifactV2, Ns5Readonly } from '/_102035_/l2/solution/types.js';

export const financeiroRules = {
  "schemaVersion": "2026-09-16-ns5-rules-v2",
  "moduleName": "financeiro",
  "rules": {
    "estornoSomenteMesmoDia": "Um recebimento só pode ser estornado se ainda estiver registrado e se o estorno ocorrer na mesma data do recebimento.",
    "estornoDevolveSaldoTitulo": "Ao estornar um recebimento, o valor dele volta ao saldo em aberto do título, que deixa de estar quitado se estava.",
    "pagadorVeSomenteProprios": "No portal, o pagador só acessa dados em que ele é o pagador; títulos e recebimentos de outros pagadores nunca ficam visíveis para ele.",
    "pagadorVeSoPropriosTitulos": "A lista de títulos do portal mostra apenas os títulos cujo pagador é o próprio usuário, em aberto e quitados.",
    "pagadorVeSomenteProprioRecebimento": "O pagador só vê os recebimentos registrados em títulos dos quais ele é o pagador.",
    "tituloOrigemUnica": "A combinação de origem e identificador da cobrança no módulo de origem é única, de modo que a mesma comanda, mensalidade ou ordem de serviço não gera dois títulos.",
    "tituloValorPositivo": "O valor de um título a receber deve ser maior que zero.",
    "tituloNumeroPorSequencia": "O número do título é atribuído pela sequência da plataforma na entrada do título e não é informado nem alterado manualmente.",
    "recebimentoNaoExcedeSaldo": "O valor de um recebimento deve ser maior que zero e não pode exceder o saldo em aberto do título no momento do registro.",
    "valorRecebidoNaoExcedeSaldo": "A soma dos recebimentos não estornados de um título nunca pode ultrapassar o valor total do título.",
    "tituloQuitadoNaoRecebe": "Um título quitado, com saldo em aberto igual a zero, não aceita novos recebimentos.",
    "tituloComRecebimentoNaoAltera": "Um título que já possui recebimento não estornado não pode ter valor, pagador ou origem alterados.",
    "tituloQuitadoQuandoSaldoZero": "O saldo em aberto do título é o valor menos a soma dos recebimentos não estornados, e o título fica quitado quando esse saldo chega a zero.",
    "cartaoSomenteViaStripe": "Recebimento com cartão só é registrado com um pagamento confirmado pelo Stripe, e o mesmo pagamento do Stripe não pode gerar dois recebimentos.",
    "pagadorPagaSomenteTituloProprioEmAberto": "Pelo portal, o pagador só pode pagar, e apenas com cartão, um título do qual ele é o pagador e que ainda tenha saldo em aberto.",
    "painelRecalculadoDosTitulosERecebimentos": "Os totais do painel de recebíveis são sempre calculados a partir dos títulos e recebimentos, por período e por origem, e nunca são digitados.",
    "estornoNaoContaComoRecebido": "Recebimentos estornados não entram no valor recebido, no saldo baixado nem nos totais recebidos, sendo somados apenas no total estornado.",
    "tituloVencidoEmAbertoAposVencimento": "Um título está vencido quando tem saldo em aberto e o vencimento é anterior a hoje, e os dias em atraso contam do vencimento até hoje.",
    "painelVisivelSoGerenteFinanceiro": "O painel de recebíveis e o extrato por pagador estão disponíveis apenas para o gerente financeiro.",
    "formaPagamentoPermitida": "A forma de pagamento de um recebimento deve ser dinheiro, pix ou cartão."
  }
} as const satisfies Ns5Readonly<Ns5RulesArtifactV2>;

export type FinanceiroRulesType = typeof financeiroRules;

export default financeiroRules;
