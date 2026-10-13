/// <mls fileReference="_102047_/l2/financeiro/web/contracts/titulos_pagador.defs.ts" enhancement="_blank"/>

/** Nome e documento do pagador para o resumo, o extrato e a confirmação do pagamento. */
export interface PagadorIdentificacao {
  id: string;
  details: {
    identification: {
      name: string;
      docId?: string;
    };
  };
}

/** Indicadores da posição do pagador, já calculados no servidor. */
export interface ResumoPagador {
  readonly totalRecebido: number;
  readonly saldoAberto: number;
  readonly totalVencido: number;
  readonly quantidadeVencidos: number;
}

/** Título do pagador com a situação e os dados de conferência usados na lista e no detalhe. */
export interface TituloPagador {
  id: string;
  version: number;
  readonly numero: string;
  origem: 'restaurante' | 'academia' | 'assistenciaTecnica';
  emissao: string;
  vencimento: string;
  details: {
    valor: string;
    descricao?: string;
    origemRotulo?: string;
    readonly totalRecebido: string;
    readonly saldoAberto: string;
    readonly quitado: boolean;
    readonly parcialmenteRecebido: boolean;
    readonly vencido: boolean;
    readonly diasAtraso: number;
  };
}

/** Recebimento de um título do pagador na linha do tempo, com estorno quando houver. */
export interface RecebimentoPagador {
  id: string;
  readonly numero: string;
  tituloId: string;
  readonly recebidoEm: string;
  details: {
    valor: string;
    readonly baixaParcial: boolean;
    estorno: {
      readonly estornadoEm?: string;
    };
  };
  formaPagamento: 'dinheiro' | 'pix' | 'cartao';
  status: 'registrado' | 'estornado';
}

export interface Titulos_pagadorContracts {
  /**
   * Finalidade: Carrega de uma vez a posição completa do pagador: identificação, indicadores, títulos com situação e histórico de recebimentos.
   * Entrada: pagadorId: pagador vindo da URL quando quem acessa é o gerente financeiro; para o pagador no portal é ignorado e o pagador é resolvido pelo login da sessão (locate.byLogin).
   * Processamento: Resolve o pagador (pela sessão no portal, aplicando pagadorVeApenasProprios e pagadorVeSomenteProprios; pelo id para o gerente). Lê nome e documento no registro mestre. Lista os títulos do pagador (listByForeignKey) ordenados por vencimento e os recebimentos desses títulos ordenados por recebidoEm decrescente, incluindo estornados. Calcula por título totalRecebido somando recebimentos não estornados (recebimentoEstornadoNaoConta), saldoAberto = valor - totalRecebido nunca negativo (saldoAbertoCalculado), quitado e parcialmenteRecebido (tituloQuitadoQuandoSaldoZera), vencido e diasAtraso (tituloVencidoEmAbertoAposVencimento); por recebimento calcula baixaParcial. O resumo soma totalRecebido (sem estornos, estornoExcluiDoRecebido), saldoAberto, saldo vencido e conta os vencidos. Nada derivado é gravado.
   * Saída: pagador para cabeçalho e extrato; resumo com os números já prontos; titulos com tudo o que a lista e o detalhe mostram (o detalhe abre do item da lista sem nova chamada); recebimentos para a linha do tempo e o extrato.
   */
  'financeiro.titulos_pagador.carregarPosicaoPagador': {
    kind: 'qry';
    input: { pagadorId?: string };
    output: { pagador: PagadorIdentificacao; resumo: ResumoPagador; titulos: TituloPagador[]; recebimentos: RecebimentoPagador[] };
    rules: ['pagadorVeApenasProprios', 'pagadorVeSomenteProprios', 'saldoAbertoCalculado', 'recebimentoEstornadoNaoConta', 'estornoExcluiDoRecebido', 'tituloQuitadoQuandoSaldoZera', 'tituloVencidoEmAbertoAposVencimento'];
    access: { actors: ['gerenteFinanceiro', 'pagador']; grants: ['gerenteRecebiveis', 'gerentePagadores', 'pagadorMeuCadastro', 'pagadorMeusTitulos', 'pagadorMeusRecebimentos']; scope: 'organization' };
  };
  /**
   * Finalidade: Paga com cartão via Stripe o saldo integral de um título em aberto do pagador logado e registra o recebimento.
   * Entrada: tituloId: título escolhido na lista; cartaoToken: token do cartão gerado pelo Stripe no navegador, não gravado.
   * Processamento: Confirma que o título é do pagador da sessão (pagadorVeSomenteProprios) e que não está quitado (tituloQuitadoNaoRecebe). Calcula o saldo em aberto (saldoAbertoCalculado) e usa-o como valor (portalPagaSaldoIntegral), recusando valor não positivo ou acima do saldo (recebimentoValorPositivo, recebimentoNaoExcedeSaldo). Cobra o cartão no Stripe (portalSomenteCartao) e, ao confirmar, cria em transação o recebimento com formaPagamento cartao, canal portal, status registrado, stripePaymentIntentId único (stripePagamentoUnico) e número de sequence.next (numeroRecebimentoUnico). Recalcula o título (quitado pela tituloQuitadoQuandoSaldoZera) e o resumo do pagador; derivados não são gravados.
   * Saída: recebimento criado para a linha do tempo e confirmação, o título atualizado (quitado, saldo zero) para a lista e o detalhe, e o resumo recalculado; a página não precisa recarregar.
   */
  'financeiro.titulos_pagador.pagarTituloComCartao': {
    kind: 'cmd';
    writes: 'Recebimento.create';
    input: { tituloId: string; cartaoToken: string };
    output: { recebimento: RecebimentoPagador; titulo: TituloPagador; resumo: ResumoPagador };
    rules: ['portalSomenteCartao', 'portalPagaSaldoIntegral', 'pagadorVeSomenteProprios', 'tituloQuitadoNaoRecebe', 'recebimentoValorPositivo', 'recebimentoNaoExcedeSaldo', 'numeroRecebimentoUnico', 'stripePagamentoUnico', 'saldoAbertoCalculado', 'tituloQuitadoQuandoSaldoZera'];
    access: { actors: ['gerenteFinanceiro', 'pagador']; grants: ['gerenteRecebiveis', 'gerentePagadores', 'pagadorMeuCadastro', 'pagadorMeusTitulos', 'pagadorMeusRecebimentos']; scope: 'organization' };
  };
}
