/// <mls fileReference="_102047_/l2/financeiro/web/contracts/recebimentos.defs.ts" enhancement="_blank"/>

/** Identificação do pagador lida do registro mestre (somente campos permitidos ao caixa). */
export interface PagadorIdentificacao {
  details: {
    identification: {
      name: string;
      docId?: string;
    };
  };
}

export interface PagadorDetails {
  identification: PagadorIdentificacao;
}

/** Pagador do título, apenas nome e documento. */
export interface PagadorResumo {
  details: PagadorDetails;
}

/** Referência curta ao título baixado pelo recebimento. */
export interface TituloReferencia {
  id: string;
  readonly numero: string;
}

export interface RecebimentoItemDetails {
  details: {
    valor: string;
    readonly estornavel: boolean;
  };
}

/** Linha da lista de recebimentos, com título e pagador já resolvidos. */
export interface RecebimentoItem {
  id: string;
  readonly numero: string;
  readonly recebidoEm: string;
  status: 'registrado' | 'estornado';
  formaPagamento: 'dinheiro' | 'pix' | 'cartao';
  details: RecebimentoItemDetails;
  tituloReceber: TituloReferencia;
  pagador: PagadorResumo;
}

/** Dados do estorno, presentes apenas quando o recebimento foi estornado. */
export interface EstornoInfo {
  details: {
    estorno: {
      motivo: string;
      readonly estornadoEm: string;
    };
  };
}

export interface RecebimentoDetalheDetails {
  details: {
    valor: string;
    canal: 'caixa' | 'portal';
    observacao?: string;
    readonly baixaParcial: boolean;
    readonly estornavel: boolean;
  };
  estorno?: EstornoInfo;
}

export interface TituloSaldoDetails {
  details: {
    readonly saldoAberto: string;
  };
}

/** Título baixado com seu saldo em aberto atual. */
export interface TituloSaldo {
  id: string;
  readonly numero: string;
  details: TituloSaldoDetails;
}

/** Recebimento completo para conferência e estorno. */
export interface RecebimentoDetalhe {
  id: string;
  version: number;
  readonly numero: string;
  tituloId: string;
  status: 'registrado' | 'estornado';
  readonly recebidoEm: string;
  formaPagamento: 'dinheiro' | 'pix' | 'cartao';
  details: RecebimentoDetalheDetails;
  tituloReceber: TituloSaldo;
  pagador: PagadorResumo;
}

export interface TituloAbertoDetails {
  details: {
    valor: string;
    readonly saldoAberto: string;
  };
}

/** Título em aberto disponível para receber, com pagador e saldo. */
export interface TituloAberto {
  id: string;
  readonly numero: string;
  vencimento: string;
  details: TituloAbertoDetails;
  pagador: PagadorResumo;
}

export interface RecebimentosContracts {
  /**
   * Finalidade: Lista paginada dos recebimentos da organização para o caixa e o gerente localizarem um recebimento e verem quais ainda podem ser estornados hoje.
   * Entrada: page/pageSize: página da lista; numero: filtro opcional pelo número do recebimento; recebidoEm: filtro opcional pela data (dia) de recebimento.
   * Processamento: Filtra os recebimentos da organização por número e/ou dia de recebimento, ordenados do mais recente para o mais antigo; resolve o número do título e o nome do pagador (read.mdmRecord). Calcula details.estornavel conforme estornoSomenteMesmoDia: status registrado e recebidoEm no dia de hoje; não é gravado.
   * Saída: Página { items, page, pageSize, hasMore } de RecebimentoItem pronta para a lista, com destaque dos estornáveis.
   */
  'financeiro.recebimentos.listarRecebimentos': {
    kind: 'qry';
    input: { numero?: string; recebidoEm?: string; page: number; pageSize: number };
    output: { recebimentos: { items: RecebimentoItem[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['estornoSomenteMesmoDia'];
    access: { actors: ['caixa', 'gerenteFinanceiro']; grants: ['caixaTitulos', 'caixaRecebimentos', 'caixaPagadorIdentificacao', 'gerenteRecebiveis', 'gerentePagadores']; scope: 'organization' };
  };
  /**
   * Finalidade: Carrega o recebimento selecionado na lista para conferência e eventual estorno.
   * Entrada: recebimentoId: id do recebimento escolhido na lista.
   * Processamento: Lê o recebimento por id, o título baixado com seu saldo em aberto (saldoAbertoCalculado: valor do título menos recebimentos não estornados, recebimentoEstornadoNaoConta) e o nome do pagador. Calcula estornavel (estornoSomenteMesmoDia) e baixaParcial; campos derivados não são gravados.
   * Saída: RecebimentoDetalhe com versão, título e saldo, pagador e dados do estorno quando houver; alimenta o detalhe e as ações de estorno.
   */
  'financeiro.recebimentos.obterRecebimento': {
    kind: 'qry';
    input: { recebimentoId: string };
    output: { recebimento: RecebimentoDetalhe };
    rules: ['estornoSomenteMesmoDia', 'saldoAbertoCalculado', 'recebimentoEstornadoNaoConta'];
    access: { actors: ['caixa', 'gerenteFinanceiro']; grants: ['caixaTitulos', 'caixaRecebimentos', 'caixaPagadorIdentificacao', 'gerenteRecebiveis', 'gerentePagadores']; scope: 'organization' };
  };
  /**
   * Finalidade: Busca os títulos em aberto que o caixa pode receber no formulário de registro.
   * Entrada: busca: texto opcional com número do título, referência de origem ou nome/documento do pagador; page/pageSize: página.
   * Processamento: Retorna apenas títulos não quitados (tituloQuitadoNaoRecebe), ordenados por vencimento; calcula o saldo em aberto como valor menos recebimentos não estornados (saldoAbertoCalculado, recebimentoEstornadoNaoConta); resolve nome e documento do pagador.
   * Saída: Página { items, page, pageSize, hasMore } de TituloAberto com valor, saldo e vencimento para o caixa escolher e não exceder o devido.
   */
  'financeiro.recebimentos.buscarTitulosAbertos': {
    kind: 'qry';
    input: { busca?: string; page: number; pageSize: number };
    output: { titulos: { items: TituloAberto[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['tituloQuitadoNaoRecebe', 'saldoAbertoCalculado', 'recebimentoEstornadoNaoConta'];
    access: { actors: ['caixa', 'gerenteFinanceiro']; grants: ['caixaTitulos', 'caixaRecebimentos', 'caixaPagadorIdentificacao', 'gerenteRecebiveis', 'gerentePagadores']; scope: 'organization' };
  };
  /**
   * Finalidade: Registra no caixa o recebimento total ou parcial de um título.
   * Entrada: tituloId: título baixado; valor: valor recebido; formaPagamento: dinheiro, pix ou cartão; observacao: anotação livre; stripePaymentIntentId: identificador da cobrança no Stripe, obrigatório quando a forma é cartão.
   * Processamento: Em transação: recusa valor <= 0 (recebimentoValorPositivo), valor maior que o saldo em aberto (recebimentoNaoExcedeSaldo), título quitado (tituloQuitadoNaoRecebe), forma fora de dinheiro/pix/cartão (formaPagamentoPermitida), cartão sem identificador Stripe ou com identificador já usado (stripePagamentoUnico). Emite o número por sequence.next (numeroRecebimentoUnico), grava status registrado, canal caixa e recebidoEm pelo sistema. O saldo do título é recalculado (saldoAbertoCalculado) e quitado quando zera (tituloQuitadoQuandoSaldoZera); baixaParcial é derivada, não gravada.
   * Saída: O recebimento criado como linha da lista e o título com saldo atualizado, para a página redesenhar lista e formulário sem nova chamada.
   */
  'financeiro.recebimentos.registrarRecebimento': {
    kind: 'cmd';
    writes: 'Recebimento.create';
    input: { tituloId: string; details: { valor: string; observacao?: string }; formaPagamento: 'dinheiro' | 'pix' | 'cartao'; stripePaymentIntentId?: string };
    output: { recebimento: RecebimentoItem; titulo: TituloAberto };
    rules: ['recebimentoValorPositivo', 'recebimentoNaoExcedeSaldo', 'tituloQuitadoNaoRecebe', 'formaPagamentoPermitida', 'numeroRecebimentoUnico', 'stripePagamentoUnico', 'tituloQuitadoQuandoSaldoZera', 'saldoAbertoCalculado'];
    access: { actors: ['caixa', 'gerenteFinanceiro']; grants: ['caixaTitulos', 'caixaRecebimentos', 'caixaPagadorIdentificacao', 'gerenteRecebiveis', 'gerentePagadores']; scope: 'organization' };
  };
  /**
   * Finalidade: Estorna, pelo caixa, um recebimento registrado por engano no mesmo dia.
   * Entrada: id e version: recebimento e versão para concorrência otimista; motivo: motivo do estorno.
   * Processamento: Apenas o ator caixa. Recusa motivo vazio (estornoExigeMotivo) e recebimento que não esteja registrado ou não seja de hoje (estornoSomenteMesmoDia). Em transação, move para estornado, grava o motivo e estornadoEm pelo sistema; o recebimento deixa de contar no total recebido (recebimentoEstornadoNaoConta) e o saldo do título é restabelecido, deixando de estar quitado se voltar a ter saldo (estornoRestabeleceSaldo).
   * Saída: O recebimento estornado completo, com o saldo do título restabelecido, para o detalhe, e a linha atualizada para a lista.
   */
  'financeiro.recebimentos.estornarRecebimento': {
    kind: 'cmd';
    writes: 'Recebimento.estornar';
    input: { id: string; version: number; details: { estorno: { motivo: string } } };
    output: { recebimento: RecebimentoDetalhe; recebimentoItem: RecebimentoItem };
    rules: ['estornoExigeMotivo', 'estornoSomenteMesmoDia', 'estornoRestabeleceSaldo', 'recebimentoEstornadoNaoConta'];
    access: { actors: ['caixa', 'gerenteFinanceiro']; grants: ['caixaTitulos', 'caixaRecebimentos', 'caixaPagadorIdentificacao', 'gerenteRecebiveis', 'gerentePagadores']; scope: 'organization' };
  };
}
