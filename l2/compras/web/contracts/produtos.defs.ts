/// <mls fileReference="_102047_/l2/compras/web/contracts/produtos.defs.ts" enhancement="_blank"/>

/** Linha do catálogo de produtos. */
export interface ProdutoResumo {
  id: string;
  details: ProdutoResumoDetails;
}

export interface ProdutoResumoDetails {
  identification: ProdutoResumoIdentification;
  product: ProdutoResumoProduct;
}

export interface ProdutoResumoIdentification {
  details: {
    identification: {
      name: string;
      readonly status: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
      readonly updatedAt: string;
    };
  };
}

export interface ProdutoResumoProduct {
  details: {
    product: {
      sku?: string;
      category?: string;
      brand?: string;
      unitOfMeasure: string;
    };
  };
}

/** Produto completo para o formulário de cadastro/alteração. */
export interface Produto {
  id: string;
  version: number;
  details: ProdutoDetails;
}

export interface ProdutoDetails {
  identification: ProdutoIdentification;
  base: ProdutoBase;
  product: ProdutoProduct;
}

export interface ProdutoIdentification {
  details: {
    identification: {
      name: string;
      readonly status: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
    };
  };
}

export interface ProdutoBase {
  details: {
    base: {
      aliases: string;
      notes?: string;
    };
  };
}

export interface ProdutoProduct {
  details: {
    product: {
      sku?: string;
      productType?: 'Physical' | 'Consumable' | 'Bundle' | 'Digital' | 'Other';
      category?: string;
      brand?: string;
      unitOfMeasure: string;
      isInventoried?: boolean;
    };
  };
}

export interface ProdutosContracts {
  /**
   * Finalidade: Carrega o catálogo de produtos comprados pela organização, página a página, e permite buscar pelo nome ou código para evitar cadastro duplicado.
   * Entrada: busca: texto opcional digitado pela pessoa, comparado ao nome, aos outros nomes e ao código interno (SKU); page e pageSize: página solicitada e seu tamanho.
   * Processamento: Filtra os produtos com o papel compras.Produto no escopo da organização (capacidade locate.byName); aplica a busca por nome/SKU quando informada; ordena por nome; devolve só os campos da lista. Situação e data de alteração são lidas do cadastro mestre, nunca calculadas aqui.
   * Saída: Página { items, page, pageSize, hasMore } de produtos com id, nome, SKU, categoria, marca, unidade de medida, situação e última alteração, para a lista e a escolha do produto a alterar.
   */
  'compras.produtos.listarProdutos': {
    kind: 'qry';
    input: { busca?: string; page: number; pageSize: number };
    output: { produtos: { items: ProdutoResumo[]; page: number; pageSize: number; hasMore: boolean } };
    rules: [];
    access: { actors: ['comprador', 'gerenteCompras']; grants: ['compradorCadastroFornecedores', 'gerenteCadastros']; scope: 'organization' };
  };
  /**
   * Finalidade: Carrega o produto escolhido no catálogo para preencher o formulário de alteração.
   * Entrada: id: identificador do produto selecionado na lista.
   * Processamento: Lê o produto pelo id (read.byId) dentro do escopo da organização e devolve os campos do formulário, incluindo a versão para controle de concorrência.
   * Saída: Produto com id, versão, nome, situação, outros nomes, observações, SKU, tipo, categoria, marca, unidade de medida e se controla estoque.
   */
  'compras.produtos.obterProduto': {
    kind: 'qry';
    input: { id: string };
    output: { produto: Produto };
    rules: [];
    access: { actors: ['comprador', 'gerenteCompras']; grants: ['compradorCadastroFornecedores', 'gerenteCadastros']; scope: 'organization' };
  };
  /**
   * Finalidade: Cadastra um novo produto no catálogo de compras.
   * Entrada: Campos editados no formulário: nome, outros nomes, observações, SKU, tipo, categoria, marca, unidade de medida e se controla estoque.
   * Processamento: Usa register.createOrAttach: se já existe produto no cadastro mestre (mesmo SKU ou nome), anexa o papel compras.Produto em vez de duplicar; senão cria com país padrão da organização (BR). Id, versão, situação, tags e datas são definidos pelo motor, não pelo endpoint. Valida o formato do documento.
   * Saída: O produto gravado, já no formato do formulário, para redesenhar o cadastro sem nova chamada.
   */
  'compras.produtos.cadastrarProduto': {
    kind: 'cmd';
    writes: 'Produto.create';
    input: { details: { identification: { name: string }; base: { aliases: string; notes?: string }; product: { sku?: string; productType?: 'Physical' | 'Consumable' | 'Bundle' | 'Digital' | 'Other'; category?: string; brand?: string; unitOfMeasure: string; isInventoried?: boolean } } };
    output: { produto: Produto };
    rules: [];
    access: { actors: ['comprador', 'gerenteCompras']; grants: ['compradorCadastroFornecedores', 'gerenteCadastros']; scope: 'organization' };
  };
  /**
   * Finalidade: Salva a correção dos dados do produto escolhido.
   * Entrada: id e version do produto carregado (concorrência otimista) e os campos editados: nome, outros nomes, observações, SKU, tipo, categoria, marca, unidade de medida e se controla estoque.
   * Processamento: Usa edit.platformFields/edit.moduleNamespace; recusa se a versão diverge da atual; valida o formato do documento. Versão e data de alteração são atualizadas pelo motor.
   * Saída: O produto atualizado com a nova versão, para redesenhar o formulário sem nova chamada.
   */
  'compras.produtos.salvarAlteracaoProduto': {
    kind: 'cmd';
    writes: 'Produto.update';
    input: { id: string; version: number; details: { identification: { name: string }; base: { aliases: string; notes?: string }; product: { sku?: string; productType?: 'Physical' | 'Consumable' | 'Bundle' | 'Digital' | 'Other'; category?: string; brand?: string; unitOfMeasure: string; isInventoried?: boolean } } };
    output: { produto: Produto };
    rules: [];
    access: { actors: ['comprador', 'gerenteCompras']; grants: ['compradorCadastroFornecedores', 'gerenteCadastros']; scope: 'organization' };
  };
}
