/// <mls fileReference="_102047_/l2/financeiro/web/contracts/painel_recebiveis.defs.ts" enhancement="_blank"/>

/** Totais do período de uma origem, somados das linhas diárias do painel. */
export interface PainelOrigemDetails {
  readonly totalAReceber: number;
  readonly totalRecebido: number;
  readonly totalEmAberto: number;
  readonly quantidadeTitulos: number;
  readonly quantidadeRecebimentos: number;
}

/** Posição do período escolhido para uma origem. */
export interface PosicaoOrigem {
  readonly periodo: string;
  readonly origem: string;
  details: PainelOrigemDetails;
}

/** Saldo e quantidade de títulos vencidos e não quitados do período. */
export interface ResumoVencidosDetails {
  readonly totalVencido: number;
  readonly quantidadeVencidos: number;
}

/** Resumo dos vencidos no período e origem filtrados. */
export interface ResumoVencidos {
  readonly periodo: string;
  readonly origem?: string;
  details: ResumoVencidosDetails;
}

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

/** Nome e documento do pagador lidos do registro mestre. */
export interface PagadorResumo {
  details: PagadorDetails;
}

export interface TituloVencidoLinhaDetails {
  details: {
    readonly vencido: boolean;
    readonly diasAtraso: number;
    readonly saldoAberto: string;
  };
}

/** Linha da lista de títulos vencidos. */
export interface TituloVencidoLinha {
  id: string;
  readonly numero: string;
  pagadorId: string;
  pagador: PagadorResumo;
  origem: 'restaurante' | 'academia' | 'assistenciaTecnica';
  emissao: string;
  vencimento: string;
  details: TituloVencidoLinhaDetails;
}

export interface RecebimentoEstorno {
  details: {
    estorno: {
      readonly estornadoEm?: string;
    };
  };
}

export interface RecebimentoDetails {
  details: {
    valor: string;
    readonly baixaParcial: boolean;
  };
  estorno?: RecebimentoEstorno;
}

/** Recebimento do título, inclusive estornado. */
export interface RecebimentoLinha {
  id: string;
  readonly numero: string;
  readonly recebidoEm: string;
  formaPagamento: 'dinheiro' | 'pix' | 'cartao';
  status: 'registrado' | 'estornado';
  details: RecebimentoDetails;
}

export interface TituloVencidoDetalheDetails {
  details: {
    valor: string;
    descricao?: string;
    origemRotulo?: string;
    readonly totalRecebido: string;
    readonly saldoAberto: string;
    readonly diasAtraso: number;
    readonly parcialmenteRecebido: boolean;
  };
}

/** Título vencido com pagador, saldo e recebimentos. */
export interface TituloVencidoDetalhe {
  id: string;
  readonly numero: string;
  pagadorId: string;
  pagador: PagadorResumo;
  origem: 'restaurante' | 'academia' | 'assistenciaTecnica';
  vencimento: string;
  details: TituloVencidoDetalheDetails;
  recebimentos: RecebimentoLinha[];
}

export interface Painel_recebiveisContracts {
  /**
   * Finalidade: Carrega de uma vez o painel de recebíveis do período escolhido: os totais por origem, o resumo dos vencidos e a primeira página da lista de títulos vencidos. É chamada de novo quando o gerente troca período, origem ou busca de pagador.
   * Entrada: periodoInicio/periodoFim: janela de datas do período (padrão: mês corrente); origem: filtra uma origem (restaurante, academia, assistência técnica), ausente = todas; pagadorBusca: nome ou documento do pagador para restringir a lista de vencidos; pageSize: tamanho da primeira página da lista.
   * Processamento: Acesso somente ao gerente financeiro (painelSomenteGerenteFinanceiro). Lê o painel pela janela (read.window) e soma as linhas diárias por origem: totalAReceber, totalRecebido, totalEmAberto, quantidadeTitulos e quantidadeRecebimentos (painelTotaisCalculados; estornos excluídos do recebido e da quantidade, estornoExcluiDoRecebido). Soma totalVencido e quantidadeVencidos do período/origem para o resumo. A lista traz títulos com vencimento no período, saldo em aberto > 0 e vencimento anterior a hoje (tituloVencidoEmAbertoAposVencimento; saldo = valor − recebimentos não estornados, saldoAbertoCalculado), com nome do pagador do registro mestre, ordenada por diasAtraso decrescente, página 1. Campos derivados são calculados, nunca gravados.
   * Saída: porOrigem: uma posição por origem com os totais já calculados; resumoVencidos: valor e quantidade vencidos; vencidos: primeira página { items, page, pageSize, hasMore } da lista de vencidos.
   */
  'financeiro.painel_recebiveis.qryPainelRecebiveis': {
    kind: 'qry';
    input: { periodoInicio: string; periodoFim: string; origem?: 'restaurante' | 'academia' | 'assistenciaTecnica'; pagadorBusca?: string; page: number; pageSize: number };
    output: { porOrigem: PosicaoOrigem[]; resumoVencidos: ResumoVencidos; vencidos: { items: TituloVencidoLinha[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['painelSomenteGerenteFinanceiro', 'painelTotaisCalculados', 'estornoExcluiDoRecebido', 'tituloVencidoEmAbertoAposVencimento', 'saldoAbertoCalculado'];
    access: { actors: ['gerenteFinanceiro']; grants: ['gerenteRecebiveis', 'gerentePagadores']; scope: 'organization' };
  };
  /**
   * Finalidade: Traz as páginas seguintes da lista de títulos vencidos quando o gerente rola ou pede mais.
   * Entrada: Os mesmos filtros do painel (periodoInicio, periodoFim, origem, pagadorBusca) e page/pageSize da página pedida.
   * Processamento: Somente gerente financeiro (painelSomenteGerenteFinanceiro). Filtra títulos do período/origem/pagador com saldo em aberto e vencimento anterior a hoje (tituloVencidoEmAbertoAposVencimento), saldo calculado como valor menos recebimentos não estornados (saldoAbertoCalculado), dias de atraso calculados até hoje; ordena por diasAtraso decrescente e lê o nome do pagador no registro mestre.
   * Saída: vencidos: { items, page, pageSize, hasMore } que a página acrescenta à lista já exibida.
   */
  'financeiro.painel_recebiveis.qryVencidosPagina': {
    kind: 'qry';
    input: { periodoInicio: string; periodoFim: string; origem?: 'restaurante' | 'academia' | 'assistenciaTecnica'; pagadorBusca?: string; page: number; pageSize: number };
    output: { vencidos: { items: TituloVencidoLinha[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['painelSomenteGerenteFinanceiro', 'tituloVencidoEmAbertoAposVencimento', 'saldoAbertoCalculado'];
    access: { actors: ['gerenteFinanceiro']; grants: ['gerenteRecebiveis', 'gerentePagadores']; scope: 'organization' };
  };
  /**
   * Finalidade: Abre o título vencido selecionado na lista com pagador, valores, atraso e todos os recebimentos, inclusive estornados.
   * Entrada: tituloId: id do título escolhido na lista de vencidos.
   * Processamento: Somente gerente financeiro (painelSomenteGerenteFinanceiro). Lê o título por id, o nome e o documento do pagador no registro mestre e os recebimentos do título (listByForeignKey) ordenados por recebidoEm. totalRecebido exclui estornados (recebimentoEstornadoNaoConta); saldoAberto = valor − totalRecebido, nunca negativo (saldoAbertoCalculado); parcialmenteRecebido conforme tituloQuitadoQuandoSaldoZera; diasAtraso conforme tituloVencidoEmAbertoAposVencimento. Tudo calculado na leitura.
   * Saída: titulo: o detalhe completo com a lista de recebimentos, para a página exibir sem outra chamada.
   */
  'financeiro.painel_recebiveis.qryTituloVencido': {
    kind: 'qry';
    input: { tituloId: string };
    output: { titulo: TituloVencidoDetalhe };
    rules: ['painelSomenteGerenteFinanceiro', 'saldoAbertoCalculado', 'recebimentoEstornadoNaoConta', 'tituloQuitadoQuandoSaldoZera', 'tituloVencidoEmAbertoAposVencimento'];
    access: { actors: ['gerenteFinanceiro']; grants: ['gerenteRecebiveis', 'gerentePagadores']; scope: 'organization' };
  };
}
