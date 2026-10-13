/// <mls fileReference="_102047_/l2/compras/web/contracts/fornecedores.defs.ts" enhancement="_blank"/>

/** Linha da busca de fornecedores: nome, CNPJ, razão social e situação. */
export interface FornecedorResumo {
  id: string;
  details: {
    identification: {
      name: string;
      docId: string;
      readonly status: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
    };
    company: {
      legalName: string;
    };
  };
}

/** Canal de contato vinculado ao fornecedor por HasContact. */
export interface ContatoFornecedorLinha {
  id: string;
  details: {
    identification: {
      name: string;
    };
    contactChannel: {
      contactType: 'Phone' | 'Email' | 'WhatsApp';
      value: string;
    };
  };
}

/** Cadastro completo do fornecedor com seus contatos, como o formulário mostra e edita. */
export interface FornecedorDetalhe {
  id: string;
  version: number;
  details: {
    identification: {
      name: string;
      readonly status: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
      docType: 'CNPJ';
      docId: string;
      countryCode: string;
    };
    company: {
      companyKind: 'LegalEntity' | 'Branch';
      legalName: string;
      tradeName?: string;
    };
    base: {
      notes?: string;
    };
  };
  contatos: ContatoFornecedorLinha[];
}

/** Produto do catálogo mestre identificado pelo nome. */
export interface ProdutoResumo {
  id: string;
  details: {
    identification: {
      name: string;
    };
  };
}

/** Produto fornecido pelo fornecedor com o preço combinado, vigência, última atualização e uso em pedidos. */
export interface ProdutoFornecidoLinha {
  id: string;
  version: number;
  readonly codigo: string;
  produtoId: string;
  produto: ProdutoResumo;
  details: {
    precoCombinado: string;
    vigenteDesde: string;
    readonly precoAtualizadoEm: string;
    codigoNoFornecedor?: string;
    observacoes?: string;
    readonly usadoEmPedidos: number;
  };
  ativo: boolean;
}

/** Item do pedido em rascunho com produto, quantidade, preço e valor do item. */
export interface ItemPedidoLinha {
  id: string;
  numeroItem: number;
  produtoId: string;
  produtoFornecidoId?: string;
  produto: ProdutoResumo;
  details: {
    quantidade: number;
    precoUnitario: string;
    readonly valorTotalItem: string;
  };
}

/** Pedido de compra do fornecedor com seus itens e o valor total calculado. */
export interface PedidoComItens {
  id: string;
  version: number;
  readonly numero: string;
  fornecedorId: string;
  status: 'rascunho' | 'enviado' | 'aprovado' | 'rejeitado' | 'recebidoParcial' | 'recebido';
  dataPrevistaEntrega?: string;
  details: {
    readonly valorTotal: string;
    readonly aguardandoAprovacao: boolean;
  };
  itens: ItemPedidoLinha[];
}

export interface FornecedoresContracts {
  /**
   * Finalidade: Lista os fornecedores da organização, buscados pelo nome, razão social ou CNPJ, para o usuário conferir se já existe antes de cadastrar e escolher com qual trabalhar.
   * Entrada: busca: texto digitado (nome, razão social ou CNPJ), opcional; sem ele retorna os fornecedores em ordem de nome. page e pageSize: página pedida da lista.
   * Processamento: Usa locate.byName e locate.byDocument do Fornecedor (escopo organização para comprador e gerente). CNPJ digitado é comparado sem máscara. Ordena por nome. Lê a situação do cadastro mestre, sem filtrar inativos, para evitar recadastro de um fornecedor existente.
   * Saída: Página { items, page, pageSize, hasMore } de fornecedores com id, nome, CNPJ, razão social e situação, que a lista mostra e de onde o usuário escolhe.
   */
  'compras.fornecedores.buscarFornecedores': {
    kind: 'qry';
    input: { busca?: string; page: number; pageSize: number };
    output: { fornecedores: { items: FornecedorResumo[]; page: number; pageSize: number; hasMore: boolean } };
    rules: [];
    access: { actors: ['comprador', 'gerenteCompras']; grants: ['compradorCadastroFornecedores', 'compradorProdutosFornecidos', 'compradorPedidos', 'gerenteAprovacaoPedidos', 'gerenteCadastros']; scope: 'organization' };
  };
  /**
   * Finalidade: Carrega de uma vez tudo o que a página mostra para o fornecedor escolhido: cadastro e contatos, produtos fornecidos com preço combinado e o pedido em rascunho em andamento para ele.
   * Entrada: fornecedorId: fornecedor escolhido na lista.
   * Processamento: Lê o Fornecedor por read.byId e seus contatos por listLinks (HasContact). Lista os ProdutoFornecido do fornecedor por listByForeignKey (para o comprador, só os do seu escopo próprio; para o gerente, todos da organização), hidratando o nome do Produto em lote por read.mdmRecord; usadoEmPedidos e precoAtualizadoEm são derivados, calculados e não gravados. Busca o pedido de compra mais recente do comprador da sessão para este fornecedor com status rascunho e seus itens; valorTotal e valorTotalItem são calculados como soma de quantidade × preço unitário (valorTotalPedidoCalculado). Os produtos fornecidos ativos servem de sugestão de preço ao incluir item (precoCombinadoSugerePreco).
   * Saída: fornecedor com contatos para o formulário; produtosFornecidos para o detalhe, o formulário de preço e a sugestão do item; pedidoRascunho com itens e total, ausente quando não há rascunho, para as ações de pedido.
   */
  'compras.fornecedores.abrirFornecedor': {
    kind: 'qry';
    input: { fornecedorId: string };
    output: { fornecedor: FornecedorDetalhe; produtosFornecidos: ProdutoFornecidoLinha[]; pedidoRascunho?: PedidoComItens };
    rules: ['precoCombinadoSugerePreco', 'valorTotalPedidoCalculado'];
    access: { actors: ['comprador', 'gerenteCompras']; grants: ['compradorCadastroFornecedores', 'compradorProdutosFornecidos', 'compradorPedidos', 'gerenteAprovacaoPedidos', 'gerenteCadastros']; scope: 'organization' };
  };
  /**
   * Finalidade: Encontra produtos do catálogo pelo nome para escolher qual associar ao fornecedor como produto fornecido.
   * Entrada: busca: parte do nome do produto digitado.
   * Processamento: Usa locate.byName do Produto, retorna apenas produtos com situação Active e limita aos primeiros resultados (lista curta de sugestão, não paginada).
   * Saída: Lista de produtos com id e nome para o seletor do formulário de produto fornecido.
   */
  'compras.fornecedores.buscarProdutos': {
    kind: 'qry';
    input: { busca: string };
    output: { produtos: ProdutoResumo[] };
    rules: [];
    access: { actors: ['comprador', 'gerenteCompras']; grants: ['compradorCadastroFornecedores', 'compradorProdutosFornecidos', 'compradorPedidos', 'gerenteAprovacaoPedidos', 'gerenteCadastros']; scope: 'organization' };
  };
  /**
   * Finalidade: Cadastra o fornecedor: cria a empresa pelo CNPJ quando não existe e anexa o papel compras.Fornecedor.
   * Entrada: name, docType (CNPJ), docId (número do CNPJ), countryCode (BR), companyKind, legalName (razão social), tradeName (nome fantasia) e notes (observações) editados no formulário.
   * Processamento: Usa register.createOrAttach. Aplica fornecedorCnpjObrigatorio: recusa CNPJ ausente ou inválido e recusa quando já existe fornecedor com o mesmo CNPJ. Situação, id e versão são definidos pela plataforma, não pelo endpoint.
   * Saída: O fornecedor gravado com contatos, para o formulário redesenhar e a lista inserir o novo fornecedor sem nova chamada.
   */
  'compras.fornecedores.salvarFornecedor': {
    kind: 'cmd';
    writes: 'Fornecedor.create';
    input: { details: { identification: { name: string; docType: 'CNPJ'; docId: string; countryCode: string }; company: { companyKind: 'LegalEntity' | 'Branch'; legalName: string; tradeName?: string }; base: { notes?: string } } };
    output: { fornecedor: FornecedorDetalhe };
    rules: ['fornecedorCnpjObrigatorio'];
    access: { actors: ['comprador', 'gerenteCompras']; grants: ['compradorCadastroFornecedores', 'compradorProdutosFornecidos', 'compradorPedidos', 'gerenteAprovacaoPedidos', 'gerenteCadastros']; scope: 'organization' };
  };
  /**
   * Finalidade: Associa um produto ao fornecedor escolhido com o preço combinado e a vigência.
   * Entrada: fornecedorId: fornecedor escolhido; compradorId: comprador responsável pelo preço combinado (o comprador da sessão, conferido pelo servidor contra a sessão); produtoId: produto do catálogo; precoCombinado e vigenteDesde; codigoNoFornecedor e observacoes opcionais; ativo indica se é sugerido em pedidos.
   * Processamento: Recusa se o fornecedor não estiver Active (produtoFornecidoSomenteFornecedorAtivo), se o preço não for maior que zero (precoCombinadoPositivo) ou se já existir produto fornecido para o mesmo fornecedor e produto (produtoFornecidoUnicoPorFornecedor). Recusa compradorId diferente do comprador da sessão quando o ator é comprador (escopo próprio). O código é emitido por sequence.next e precoAtualizadoEm é registrado pelo sistema.
   * Saída: A linha do produto fornecido criada, com código, nome do produto e preço, para inserir no detalhe sem recarregar.
   */
  'compras.fornecedores.incluirProdutoFornecido': {
    kind: 'cmd';
    writes: 'ProdutoFornecido.create';
    input: { fornecedorId: string; compradorId: string; produtoId: string; details: { precoCombinado: string; vigenteDesde: string; codigoNoFornecedor?: string; observacoes?: string }; ativo: boolean };
    output: { produtoFornecido: ProdutoFornecidoLinha };
    rules: ['produtoFornecidoUnicoPorFornecedor', 'precoCombinadoPositivo', 'produtoFornecidoSomenteFornecedorAtivo'];
    access: { actors: ['comprador', 'gerenteCompras']; grants: ['compradorCadastroFornecedores', 'compradorProdutosFornecidos', 'compradorPedidos', 'gerenteAprovacaoPedidos', 'gerenteCadastros']; scope: 'organization' };
  };
  /**
   * Finalidade: Altera o preço combinado, a vigência ou a atividade de um produto fornecido escolhido no detalhe.
   * Entrada: id e version do produto fornecido (concorrência otimista); produtoId: produto do catálogo do produto fornecido, como está no formulário; novo precoCombinado, vigenteDesde, codigoNoFornecedor, observacoes e ativo.
   * Processamento: Recusa se o fornecedor do produto fornecido não estiver Active (produtoFornecidoSomenteFornecedorAtivo) ou se o preço não for maior que zero (precoCombinadoPositivo); recusa versão desatualizada. Se produtoId mudar, recusa quando já existir outro produto fornecido do mesmo fornecedor para esse produto (produtoFornecidoUnicoPorFornecedor). Quando o preço muda, precoAtualizadoEm é registrado pelo sistema. Itens de pedido já criados mantêm seu preço.
   * Saída: A linha atualizada com o novo preço e a data de atualização, para substituir no detalhe sem nova chamada.
   */
  'compras.fornecedores.alterarPrecoCombinado': {
    kind: 'cmd';
    writes: 'ProdutoFornecido.update';
    input: { id: string; version: number; produtoId: string; details: { precoCombinado: string; vigenteDesde: string; codigoNoFornecedor?: string; observacoes?: string }; ativo: boolean };
    output: { produtoFornecido: ProdutoFornecidoLinha };
    rules: ['precoCombinadoPositivo', 'produtoFornecidoSomenteFornecedorAtivo', 'produtoFornecidoUnicoPorFornecedor'];
    access: { actors: ['comprador', 'gerenteCompras']; grants: ['compradorCadastroFornecedores', 'compradorProdutosFornecidos', 'compradorPedidos', 'gerenteAprovacaoPedidos', 'gerenteCadastros']; scope: 'organization' };
  };
  /**
   * Finalidade: Abre um pedido de compra em rascunho para o fornecedor escolhido.
   * Entrada: fornecedorId: fornecedor escolhido; compradorId: comprador que abre o pedido (o comprador da sessão, conferido pelo servidor contra a sessão); dataPrevistaEntrega: entrega prevista, opcional na abertura.
   * Processamento: Recusa se o fornecedor não estiver Active (fornecedorInativoSemNovoPedido) ou se o comprador informado estiver inativo (compradorInativoNaoAbrePedido); recusa compradorId diferente do comprador da sessão. Grava com status rascunho e número único emitido por sequence.next (numeroPedidoUnico); dataEmissao é registrada pelo sistema.
   * Saída: O pedido em rascunho com número, situação, itens vazios e valor total zero, para as ações de pedido redesenharem.
   */
  'compras.fornecedores.abrirPedido': {
    kind: 'cmd';
    writes: 'PedidoCompra.create';
    input: { fornecedorId: string; compradorId: string; dataPrevistaEntrega?: string };
    output: { pedido: PedidoComItens };
    rules: ['fornecedorInativoSemNovoPedido', 'compradorInativoNaoAbrePedido', 'numeroPedidoUnico'];
    access: { actors: ['comprador', 'gerenteCompras']; grants: ['compradorCadastroFornecedores', 'compradorProdutosFornecidos', 'compradorPedidos', 'gerenteAprovacaoPedidos', 'gerenteCadastros']; scope: 'organization' };
  };
  /**
   * Finalidade: Inclui um item no pedido em rascunho com quantidade e preço, sugerido pelo preço combinado do fornecedor.
   * Entrada: pedidoCompraId: pedido em rascunho; produtoId: produto do item; produtoFornecidoId: produto fornecido cujo preço combinado sugeriu o preço; quantidade e precoUnitario (pode ter sido alterado pelo comprador).
   * Processamento: Recusa se o pedido não estiver em rascunho (itemPedidoSomenteEmRascunho), se o produto não for um produto fornecido ativo do fornecedor do pedido (itemPedidoProdutoDoFornecedor), se o produto estiver inativo no cadastro mestre (inactiveProductCannotBeOrdered), se a quantidade não for maior que zero ou o preço for negativo (itemPedidoQuantidadePositiva). O preço sugerido vem do preço combinado vigente (precoCombinadoSugerePreco) e o item registra produtoFornecidoId quando houver (precoSugeridoNoItemPedido). numeroItem é o próximo da sequência do pedido. valorTotalItem e valorTotal são calculados (valorTotalPedidoCalculado), não gravados.
   * Saída: O pedido com todos os itens e o valor total recalculado, para a revisão redesenhar sem segunda chamada.
   */
  'compras.fornecedores.incluirItemPedido': {
    kind: 'cmd';
    writes: 'ItemPedido.create';
    input: { pedidoCompraId: string; produtoId: string; produtoFornecidoId?: string; details: { quantidade: number; precoUnitario: string } };
    output: { pedido: PedidoComItens };
    rules: ['itemPedidoSomenteEmRascunho', 'itemPedidoProdutoDoFornecedor', 'inactiveProductCannotBeOrdered', 'itemPedidoQuantidadePositiva', 'precoCombinadoSugerePreco', 'precoSugeridoNoItemPedido', 'valorTotalPedidoCalculado'];
    access: { actors: ['comprador', 'gerenteCompras']; grants: ['compradorCadastroFornecedores', 'compradorProdutosFornecidos', 'compradorPedidos', 'gerenteAprovacaoPedidos', 'gerenteCadastros']; scope: 'organization' };
  };
  /**
   * Finalidade: Envia o pedido em rascunho; até o valor limite segue liberado ao fornecedor, acima aguarda aprovação do gerente de compras.
   * Entrada: id e version do pedido; dataPrevistaEntrega: entrega combinada, payload da transição enviar.
   * Processamento: Executa a transição enviar (rascunho → enviado). Recusa pedido sem ao menos um item com quantidade e preço (pedidoExigeItens) e fornecedor inativo (fornecedorInativoSemNovoPedido); recusa versão desatualizada. Compara o valor total calculado com o valor limite (valorLimiteAprovacao): acima, aguardandoAprovacao fica verdadeiro e o pedido é encaminhado ao gerente; até o limite, fica liberado ao fornecedor. dataEnvio é registrada pelo sistema; aguardandoAprovacao é derivado.
   * Saída: O pedido enviado com situação, valor total e indicação de aguardando aprovação, para a página mostrar o resultado do envio.
   */
  'compras.fornecedores.enviarPedido': {
    kind: 'cmd';
    writes: 'PedidoCompra.enviar';
    input: { id: string; version: number; dataPrevistaEntrega: string };
    output: { pedido: PedidoComItens };
    rules: ['pedidoExigeItens', 'valorLimiteAprovacao', 'fornecedorInativoSemNovoPedido'];
    access: { actors: ['comprador', 'gerenteCompras']; grants: ['compradorCadastroFornecedores', 'compradorProdutosFornecidos', 'compradorPedidos', 'gerenteAprovacaoPedidos', 'gerenteCadastros']; scope: 'organization' };
  };
}
