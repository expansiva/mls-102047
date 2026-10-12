/// <mls fileReference="_102047_/l2/controleEstoque/web/contracts/produtos.defs.ts" enhancement="_blank"/>

/** Identificação do produto (details.identification). */
export interface ProdutoIdentificacao {
  details: {
    identification: {
      name: string;
    };
  };
}

/** Dados de catálogo do produto (details.product). */
export interface ProdutoCatalogo {
  details: {
    product: {
      sku?: string;
      category?: string;
      unitOfMeasure?: string;
    };
  };
}

/** Namespace do módulo: saldo mínimo gravado e valores derivados das movimentações. */
export interface ProdutoControleEstoque {
  details: {
    controleEstoque: {
      saldoMinimo: number;
      readonly saldoAtual: number;
      readonly abaixoDoMinimo: boolean;
    };
  };
}

/** Documento do produto com as partes que a página mostra. */
export interface ProdutoDetalhes {
  identification: ProdutoIdentificacao;
  product: ProdutoCatalogo;
  controleEstoque: ProdutoControleEstoque;
}

/** Produto com nome, catálogo, saldo mínimo, saldo atual e situação abaixo do mínimo; usado nas listas, no detalhe e no retorno do cadastro. */
export interface ProdutoEstoque {
  id: string;
  version: number;
  details: ProdutoDetalhes;
}

/** Indicadores do estoque já calculados no servidor. */
export interface ResumoSaldo {
  readonly totalProdutos: number;
  readonly totalAbaixoDoMinimo: number;
  readonly saldoAtualTotal: number;
}

export interface ProdutosContracts {
  /**
   * Finalidade: Carrega, na abertura da página, o panorama do estoque: indicadores do saldo e os produtos abaixo do mínimo que geram aviso.
   * Entrada: Nenhuma entrada; o escopo é a organização do estoquista.
   * Processamento: Considera os produtos com a tag de produto de estoque (subtipo Product). Calcula no servidor: total de produtos, quantidade de produtos abaixo do mínimo e soma do saldo atual. O saldo atual é derivado (entradas menos saídas das movimentações) e abaixoDoMinimo é derivado conforme avisoSaldoAbaixoDoMinimo (saldo atual menor que o saldo mínimo); nada disso é gravado pelo endpoint. Filtra os produtos com abaixoDoMinimo verdadeiro, ordenados pelo maior déficit (saldo mínimo menos saldo atual).
   * Saída: resumo com os números prontos para o bloco de resumo e produtosAbaixoMinimo com nome, saldo atual e saldo mínimo para o destaque de aviso.
   */
  'controleEstoque.produtos.carregarVisaoEstoque': {
    kind: 'qry';
    input: {};
    output: { resumo: ResumoSaldo; produtosAbaixoMinimo: ProdutoEstoque[] };
    rules: ['avisoSaldoAbaixoDoMinimo'];
    access: { actors: ['estoquista']; grants: ['gestaoCompletaEstoque']; scope: 'organization' };
  };
  /**
   * Finalidade: Lista os produtos do estoque, paginados, e localiza pelo nome o que o estoquista digita.
   * Entrada: nome: texto opcional procurado no nome do produto; page e pageSize: página pedida e tamanho da página.
   * Processamento: Filtra pelo subtipo Product com a tag do módulo e, se houver texto, pelo nome contendo o texto (locate.byName). Ordena pelo nome. Compõe o saldo atual derivado das movimentações e abaixoDoMinimo derivado segundo avisoSaldoAbaixoDoMinimo, sem gravá-los.
   * Saída: produtos em { items, page, pageSize, hasMore } com nome, SKU, unidade, saldo atual e indicação de abaixo do mínimo para cada linha.
   */
  'controleEstoque.produtos.buscarProdutos': {
    kind: 'qry';
    input: { nome?: string; page: number; pageSize: number };
    output: { produtos: { items: ProdutoEstoque[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['avisoSaldoAbaixoDoMinimo'];
    access: { actors: ['estoquista']; grants: ['gestaoCompletaEstoque']; scope: 'organization' };
  };
  /**
   * Finalidade: Carrega o produto escolhido na lista, no destaque de aviso ou vindo de uma notificação, com o saldo atualizado.
   * Entrada: produtoId: identificador do produto selecionado (seleção ou URL).
   * Processamento: Lê o produto por id (read.byId / controleEstoque.consultarSaldo). Calcula o saldo atual a partir das movimentações e abaixoDoMinimo conforme avisoSaldoAbaixoDoMinimo; valores derivados, nunca gravados.
   * Saída: produto com nome, SKU, categoria, unidade, saldo mínimo, saldo atual e situação abaixo do mínimo para o detalhe, de onde o estoquista segue para registrar movimentação.
   */
  'controleEstoque.produtos.obterProduto': {
    kind: 'qry';
    input: { produtoId: string };
    output: { produto: ProdutoEstoque };
    rules: ['avisoSaldoAbaixoDoMinimo'];
    access: { actors: ['estoquista']; grants: ['gestaoCompletaEstoque']; scope: 'organization' };
  };
  /**
   * Finalidade: Cadastra o produto no estoque com o saldo mínimo que dispara o aviso e devolve o produto gravado como confirmação.
   * Entrada: name: nome do produto; sku: código interno; category: categoria; unitOfMeasure: unidade de medida; saldoMinimo: quantidade mínima para aviso.
   * Processamento: Recusa saldo mínimo negativo (saldoMinimoNaoNegativo). Usa register.createOrAttach: cria o produto com subtipo Product (ou anexa o papel do módulo a um existente), marca a tag controleEstoque.Produto e grava saldoMinimo apenas no namespace controleEstoque; campos de plataforma obrigatórios não editados (país, nomes alternativos) recebem os padrões da organização. Saldo atual nasce derivado (zero sem movimentações) e abaixoDoMinimo é calculado conforme avisoSaldoAbaixoDoMinimo; ambos nunca são gravados.
   * Saída: produto gravado com id, versão, dados de catálogo, saldo mínimo, saldo atual e situação, para confirmar o cadastro e inseri-lo na lista sem nova chamada.
   */
  'controleEstoque.produtos.cadastrarProduto': {
    kind: 'cmd';
    writes: 'Produto.create';
    input: { details: { identification: { name: string }; product: { sku?: string; category?: string; unitOfMeasure?: string }; controleEstoque: { saldoMinimo: number } } };
    output: { produto: ProdutoEstoque };
    rules: ['saldoMinimoNaoNegativo', 'avisoSaldoAbaixoDoMinimo'];
    access: { actors: ['estoquista']; grants: ['gestaoCompletaEstoque']; scope: 'organization' };
  };
}
