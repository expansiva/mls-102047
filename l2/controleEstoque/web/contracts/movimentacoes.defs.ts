/// <mls fileReference="_102047_/l2/controleEstoque/web/contracts/movimentacoes.defs.ts" enhancement="_blank"/>

/** Produto encontrado na busca por nome, para o estoquista escolher o item da movimentação. */
export interface ProdutoOpcao {
  id: string;
  details: {
    identification: {
      name: string;
    };
    product: {
      sku?: string;
      unitOfMeasure?: string;
    };
  };
}

/** Produto escolhido com seu saldo atual, saldo mínimo e situação abaixo do mínimo, já calculados. */
export interface ProdutoSaldo {
  id: string;
  details: {
    identification: {
      name: string;
    };
    product: {
      sku?: string;
      unitOfMeasure?: string;
    };
    controleEstoque: {
      readonly saldoAtual: number;
      saldoMinimo: number;
      readonly abaixoDoMinimo: boolean;
    };
  };
}

/** Nome e unidade do produto de uma movimentação. */
export interface ProdutoRef {
  details: {
    identification: {
      name: string;
    };
    product: {
      unitOfMeasure?: string;
    };
  };
}

/** Linha do histórico de movimentações, com o produto e sua unidade. */
export interface MovimentacaoHistoricoItem {
  id: string;
  numero: string;
  tipo: 'inbound' | 'outbound';
  registradoEm: string;
  details: {
    quantidade: number;
  };
  produtoId: string;
  produto: ProdutoRef;
}

export interface MovimentacoesContracts {
  /**
   * Finalidade: Carrega o histórico permanente de entradas e saídas do estoque, paginado, ao abrir a página e quando o estoquista filtra ou pede a próxima página.
   * Entrada: tipo: filtra entradas (inbound) ou saídas (outbound); registradoDe/registradoAte: período de registro (inclusivo); numero: texto contido no número da movimentação; page/pageSize: paginação.
   * Processamento: Filtra Movimentacao por tipo e intervalo de registradoEm (colunas indexadas) e por número contendo o texto; ordena por registradoEm decrescente; junta o nome e a unidade de medida do Produto apontado por produtoId numa única consulta, sem chamada por linha.
   * Saída: Página { items, page, pageSize, hasMore } de movimentações com número, tipo, quantidade, data e produto (nome e unidade), já no formato da lista.
   */
  'controleEstoque.movimentacoes.qryHistoricoMovimentacoes': {
    kind: 'qry';
    input: { tipo?: 'inbound' | 'outbound'; registradoDe?: string; registradoAte?: string; numero?: string; page: number; pageSize: number };
    output: { movimentacoes: { items: MovimentacaoHistoricoItem[]; page: number; pageSize: number; hasMore: boolean } };
    rules: [];
    access: { actors: ['estoquista']; grants: ['gestaoCompletaEstoque']; scope: 'organization' };
  };
  /**
   * Finalidade: Busca produtos pelo nome enquanto o estoquista digita, para escolher o produto da movimentação.
   * Entrada: texto: parte do nome do produto digitado.
   * Processamento: Filtra produtos de subtipo Product com situação Active cujo nome contém o texto; ordena por nome e limita a poucas opções (ex.: 20), sem paginar.
   * Saída: Lista curta de opções com id, nome, SKU e unidade para o seletor do formulário.
   */
  'controleEstoque.movimentacoes.qryBuscarProdutos': {
    kind: 'qry';
    input: { texto: string };
    output: { produtos: ProdutoOpcao[] };
    rules: [];
    access: { actors: ['estoquista']; grants: ['gestaoCompletaEstoque']; scope: 'organization' };
  };
  /**
   * Finalidade: Lê o produto escolhido com o saldo atual e o mínimo, para o estoquista conferir antes de registrar.
   * Entrada: produtoId: id do produto escolhido no formulário (ou vindo da URL).
   * Processamento: Lê o produto pelo id; saldoAtual é calculado como soma das entradas menos soma das saídas das movimentações do produto; abaixoDoMinimo é calculado comparando saldoAtual < saldoMinimo (avisoSaldoAbaixoDoMinimo). Valores derivados nunca são gravados.
   * Saída: Produto com nome, SKU, unidade, saldo atual, saldo mínimo e indicador abaixo do mínimo, exibidos no formulário e nas ações.
   */
  'controleEstoque.movimentacoes.qryProdutoSaldo': {
    kind: 'qry';
    input: { produtoId: string };
    output: { produto: ProdutoSaldo };
    rules: ['avisoSaldoAbaixoDoMinimo'];
    access: { actors: ['estoquista']; grants: ['gestaoCompletaEstoque']; scope: 'organization' };
  };
  /**
   * Finalidade: Registra a entrada ou saída de quantidade do produto e devolve o que a página redesenha: a nova linha do histórico, o saldo atualizado e o aviso.
   * Entrada: produtoId: produto movimentado; tipo: inbound (entrada) ou outbound (saída); quantidade: quantidade na unidade do produto.
   * Processamento: Recusa quantidade menor ou igual a zero (quantidadePositiva); verifica que o produto existe; emite o número pela sequência da plataforma e grava registradoEm com a hora do servidor; insere a movimentação como registro permanente, sem nenhuma operação de alteração (movimentacaoImutavel); recalcula saldoAtual a partir das movimentações e abaixoDoMinimo (saldoAtual < saldoMinimo), sem gravá-los; sinaliza o aviso quando o saldo fica abaixo do mínimo (avisoSaldoAbaixoDoMinimo).
   * Saída: movimentacao: linha nova para inserir no histórico; produto: saldo atualizado para o formulário e as ações; avisoAbaixoDoMinimo: true quando o produto ficou abaixo do mínimo, para exibir o aviso.
   */
  'controleEstoque.movimentacoes.cmdRegistrarMovimentacao': {
    kind: 'cmd';
    writes: 'Movimentacao.create';
    input: { produtoId: string; tipo: 'inbound' | 'outbound'; details: { quantidade: number } };
    output: { movimentacao: MovimentacaoHistoricoItem; produto: ProdutoSaldo; readonly avisoAbaixoDoMinimo: boolean };
    rules: ['quantidadePositiva', 'movimentacaoImutavel', 'avisoSaldoAbaixoDoMinimo'];
    access: { actors: ['estoquista']; grants: ['gestaoCompletaEstoque']; scope: 'organization' };
  };
}
