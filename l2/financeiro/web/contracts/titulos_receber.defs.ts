/// <mls fileReference="_102047_/l2/financeiro/web/contracts/titulos_receber.defs.ts" enhancement="_blank"/>

/** Indicadores da posição dos títulos a receber, já calculados no servidor. */
export interface ResumoTitulos {
  readonly saldoAbertoTotal: number;
  readonly totalRecebido: number;
  readonly quantidadeVencidos: number;
  readonly quantidadeBaixaParcial: number;
}

/** Identificação do pagador lida do registro mestre. */
export interface PagadorIdentificacao {
  details: {
    identification: {
      name: string;
      docId?: string;
    };
  };
  readonly docTypeRotulo?: string;
}

export interface PagadorDetalhes {
  identification: PagadorIdentificacao;
}

/** Pagador do título, apenas com os campos de identificação permitidos. */
export interface PagadorRef {
  details: PagadorDetalhes;
}

export interface TituloItemDetalhes {
  details: {
    valor: string;
    readonly saldoAberto: string;
    readonly quitado: boolean;
    readonly vencido: boolean;
    readonly parcialmenteRecebido: boolean;
  };
}

/** Linha da lista de títulos com situação já calculada. */
export interface TituloItem {
  id: string;
  readonly numero: string;
  pagadorId: string;
  origem: 'restaurante' | 'academia' | 'assistenciaTecnica';
  vencimento: string;
  details: TituloItemDetalhes;
  pagador: PagadorRef;
}

export interface TituloDetalhes {
  details: {
    valor: string;
    descricao?: string;
    origemRotulo?: string;
    readonly totalRecebido: string;
    readonly saldoAberto: string;
    readonly quitado: boolean;
    readonly vencido: boolean;
    readonly parcialmenteRecebido: boolean;
    readonly diasAtraso: number;
  };
}

export interface RecebimentoDetalhes {
  details: {
    valor: string;
    readonly baixaParcial: boolean;
  };
}

/** Recebimento já lançado no título. */
export interface RecebimentoLinha {
  id: string;
  readonly numero: string;
  readonly recebidoEm: string;
  formaPagamento: 'dinheiro' | 'pix' | 'cartao';
  status: 'registrado' | 'estornado';
  details: RecebimentoDetalhes;
}

/** Título com pagador, totais derivados e os recebimentos lançados. */
export interface TituloFicha {
  id: string;
  version: number;
  readonly numero: string;
  pagadorId: string;
  origem: 'restaurante' | 'academia' | 'assistenciaTecnica';
  emissao: string;
  vencimento: string;
  details: TituloDetalhes;
  pagador: PagadorRef;
  recebimentos: RecebimentoLinha[];
}

export interface Titulos_receberContracts {
  /**
   * Finalidade: Abre a tela de títulos a receber com os indicadores de posição e a primeira página da lista de títulos, em uma única chamada.
   * Entrada: page e pageSize: página inicial da lista de títulos e seu tamanho.
   * Processamento: Lê os títulos da organização ordenados por vencimento, com nome e documento do pagador do registro mestre. Calcula por título saldoAberto, totalRecebido, quitado, parcialmenteRecebido e vencido (saldoAbertoCalculado, recebimentoEstornadoNaoConta, tituloQuitadoQuandoSaldoZera, tituloVencidoEmAbertoAposVencimento); esses campos são derivados, nunca gravados. O resumo soma o saldo em aberto e o total recebido e conta os títulos vencidos e com baixa parcial no servidor.
   * Saída: resumo com os quatro indicadores já calculados e titulos paginado ({ items, page, pageSize, hasMore }) com número, pagador, origem, vencimento, valor, saldo e situação.
   */
  'financeiro.titulos_receber.carregarTitulosReceber': {
    kind: 'qry';
    input: { page: number; pageSize: number };
    output: { resumo: ResumoTitulos; titulos: { items: TituloItem[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['saldoAbertoCalculado', 'recebimentoEstornadoNaoConta', 'tituloQuitadoQuandoSaldoZera', 'tituloVencidoEmAbertoAposVencimento'];
    access: { actors: ['caixa', 'gerenteFinanceiro']; grants: ['caixaTitulos', 'caixaRecebimentos', 'caixaPagadorIdentificacao', 'gerenteRecebiveis', 'gerentePagadores']; scope: 'organization' };
  };
  /**
   * Finalidade: Busca títulos pelo número ou pelo nome/documento do pagador, com filtros opcionais de origem e de vencidos, para levar o usuário direto ao título a conferir.
   * Entrada: busca: texto com número do título, nome ou documento do pagador; origem: módulo de origem; somenteVencidos: restringe aos títulos vencidos com saldo; page e pageSize: paginação.
   * Processamento: Combina a busca por texto no número do título com a localização do pagador por nome ou documento; aplica origem e, se pedido, vencido = saldo em aberto com vencimento anterior a hoje (tituloVencidoEmAbertoAposVencimento). Ordena por vencimento. Saldo, quitado e baixa parcial são calculados conforme saldoAbertoCalculado, recebimentoEstornadoNaoConta e tituloQuitadoQuandoSaldoZera.
   * Saída: titulos paginado que substitui a lista exibida.
   */
  'financeiro.titulos_receber.buscarTitulos': {
    kind: 'qry';
    input: { busca?: string; origem?: 'restaurante' | 'academia' | 'assistenciaTecnica'; somenteVencidos?: boolean; page: number; pageSize: number };
    output: { titulos: { items: TituloItem[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['saldoAbertoCalculado', 'recebimentoEstornadoNaoConta', 'tituloQuitadoQuandoSaldoZera', 'tituloVencidoEmAbertoAposVencimento'];
    access: { actors: ['caixa', 'gerenteFinanceiro']; grants: ['caixaTitulos', 'caixaRecebimentos', 'caixaPagadorIdentificacao', 'gerenteRecebiveis', 'gerentePagadores']; scope: 'organization' };
  };
  /**
   * Finalidade: Carrega a ficha do título selecionado com os recebimentos já lançados, para conferência e para o registro do recebimento ao lado.
   * Entrada: tituloId: título escolhido na lista.
   * Processamento: Lê o título por id, o nome, o tipo (como rótulo legível) e o número do documento do pagador no registro mestre e os recebimentos do título ordenados por recebidoEm. Calcula totalRecebido sem os estornados, saldoAberto, quitado, vencido e diasAtraso (saldoAbertoCalculado, recebimentoEstornadoNaoConta, tituloQuitadoQuandoSaldoZera, tituloVencidoEmAbertoAposVencimento) e a baixaParcial de cada recebimento.
   * Saída: titulo com pagador, origem, valores, saldo, dias de atraso e a lista de recebimentos.
   */
  'financeiro.titulos_receber.obterTitulo': {
    kind: 'qry';
    input: { tituloId: string };
    output: { titulo: TituloFicha };
    rules: ['saldoAbertoCalculado', 'recebimentoEstornadoNaoConta', 'tituloQuitadoQuandoSaldoZera', 'tituloVencidoEmAbertoAposVencimento'];
    access: { actors: ['caixa', 'gerenteFinanceiro']; grants: ['caixaTitulos', 'caixaRecebimentos', 'caixaPagadorIdentificacao', 'gerenteRecebiveis', 'gerentePagadores']; scope: 'organization' };
  };
  /**
   * Finalidade: Registra no caixa o recebimento total ou parcial do título e devolve o título, a linha da lista e os indicadores já atualizados.
   * Entrada: tituloId: título baixado; valor: valor recebido; formaPagamento: dinheiro, pix ou cartão; observacao: anotação livre do caixa; stripePaymentIntentId: identificador da cobrança confirmada no Stripe quando a forma é cartão.
   * Processamento: Em uma transação: recusa valor menor ou igual a zero (recebimentoValorPositivo), título quitado (tituloQuitadoNaoRecebe) e valor acima do saldo em aberto atual (recebimentoNaoExcedeSaldo); aceita só dinheiro, pix ou cartão (formaPagamentoPermitida); em cartão exige o stripePaymentIntentId e recusa confirmação já usada (stripePagamentoUnico). Cria o Recebimento com status registrado, canal caixa, número da sequência (numeroRecebimentoUnico) e recebidoEm do servidor. Depois recalcula saldo, total recebido, quitado e baixa parcial (saldoAbertoCalculado, tituloQuitadoQuandoSaldoZera, recebimentoEstornadoNaoConta) sem gravar campos derivados, e recompõe o resumo.
   * Saída: titulo com o novo recebimento e saldo atualizado, tituloItem para atualizar a linha na lista e resumo recalculado, para que a página redesenhe sem nova chamada.
   */
  'financeiro.titulos_receber.registrarRecebimento': {
    kind: 'cmd';
    writes: 'Recebimento.create';
    input: { tituloId: string; details: { valor: string; observacao?: string }; formaPagamento: 'dinheiro' | 'pix' | 'cartao'; stripePaymentIntentId?: string };
    output: { titulo: TituloFicha; tituloItem: TituloItem; resumo: ResumoTitulos };
    rules: ['recebimentoValorPositivo', 'recebimentoNaoExcedeSaldo', 'tituloQuitadoNaoRecebe', 'formaPagamentoPermitida', 'stripePagamentoUnico', 'numeroRecebimentoUnico', 'saldoAbertoCalculado', 'tituloQuitadoQuandoSaldoZera', 'recebimentoEstornadoNaoConta'];
    access: { actors: ['caixa', 'gerenteFinanceiro']; grants: ['caixaTitulos', 'caixaRecebimentos', 'caixaPagadorIdentificacao', 'gerenteRecebiveis', 'gerentePagadores']; scope: 'organization' };
  };
}
