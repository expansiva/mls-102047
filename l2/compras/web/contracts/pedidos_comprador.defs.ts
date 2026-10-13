/// <mls fileReference="_102047_/l2/compras/web/contracts/pedidos_comprador.defs.ts" enhancement="_blank"/>

/** Fornecedor com nome e CNPJ, exibido na lista, no pedido e na escolha do fornecedor. */
export interface FornecedorResumo {
  id: string;
  details: {
    identification: {
      name: string;
      docId: string;
    };
  };
}

/** Produto com nome e unidade de medida. */
export interface ProdutoResumo {
  id: string;
  details: {
    identification: {
      name: string;
    };
    product: {
      unitOfMeasure: string;
    };
  };
}

/** Linha da carteira de pedidos do comprador com situação já calculada. */
export interface PedidoResumo {
  id: string;
  readonly numero: string;
  fornecedorId: string;
  fornecedor: FornecedorResumo;
  readonly dataEmissao: string;
  details: {
    readonly dataEnvio?: string;
    readonly valorTotal: string;
    readonly emAberto: boolean;
    readonly aguardandoAprovacao: boolean;
    readonly liberadoAoFornecedor: boolean;
    readonly atrasado: boolean;
  };
  status: 'rascunho' | 'enviado' | 'aprovado' | 'rejeitado' | 'recebidoParcial' | 'recebido';
}

/** Item do pedido com produto, valores e situação de recebimento. */
export interface ItemPedidoLinha {
  id: string;
  numeroItem: number;
  produtoId: string;
  produto: ProdutoResumo;
  produtoFornecidoId?: string;
  details: {
    quantidade: number;
    precoUnitario: string;
    observacao?: string;
    readonly valorTotalItem: string;
    readonly quantidadeRecebida: number;
    readonly quantidadePendente: number;
    readonly recebidoTotalmente: boolean;
  };
}

/** Recebimento registrado para o pedido, mostrado na linha do tempo. */
export interface RecebimentoEvento {
  id: string;
  readonly numero: string;
  readonly registradoEm: string;
  details: {
    readonly tipoRecebimento: string;
    readonly quantidadeTotalRecebida: number;
  };
}

/** Pedido completo com itens, totais, situação, decisão e recebimentos; usado na montagem, revisão, envio e histórico. */
export interface PedidoDetalhe {
  id: string;
  version: number;
  readonly numero: string;
  status: 'rascunho' | 'enviado' | 'aprovado' | 'rejeitado' | 'recebidoParcial' | 'recebido';
  fornecedorId: string;
  fornecedor: FornecedorResumo;
  readonly dataEmissao: string;
  dataPrevistaEntrega?: string;
  details: {
    readonly dataEnvio?: string;
    decisao: {
      readonly decididoEm?: string;
    };
    readonly valorTotal: string;
    readonly quantidadePendente: number;
    readonly aguardandoAprovacao: boolean;
    readonly liberadoAoFornecedor: boolean;
  };
  itens: ItemPedidoLinha[];
  recebimentos: RecebimentoEvento[];
}

/** Produto fornecido ativo do fornecedor, com preço combinado para sugerir o preço do item. */
export interface ProdutoFornecidoOpcao {
  id: string;
  readonly codigo: string;
  fornecedorId: string;
  produtoId: string;
  produto: ProdutoResumo;
  details: {
    precoCombinado: string;
  };
}

export interface Pedidos_compradorContracts {
  /**
   * Finalidade: Carrega a carteira de pedidos de compra do comprador da sessão, já com a situação de cada um, para a lista principal.
   * Entrada: status: filtra pela etapa do pedido (opcional); somenteAtrasados: quando verdadeiro traz só pedidos atrasados; page e pageSize: paginação da lista.
   * Processamento: Resolve o comprador da sessão e filtra PedidoCompra.compradorId por ele (escopo own). Aplica os filtros opcionais e ordena por dataEmissao decrescente. Lê o nome e CNPJ do fornecedor no cadastro mestre. valorTotal é calculado como soma de quantidade × preço dos itens (valorTotalPedidoCalculado); emAberto, aguardandoAprovacao, liberadoAoFornecedor (valorLimiteAprovacao) e atrasado são calculados, nunca gravados.
   * Saída: Página de pedidos { items, page, pageSize, hasMore } com número, fornecedor, datas, valor total e indicadores de situação, prontos para a lista exibir e escolher um pedido.
   */
  'compras.pedidos_comprador.qryListarPedidos': {
    kind: 'qry';
    input: { status?: 'rascunho' | 'enviado' | 'aprovado' | 'rejeitado' | 'recebidoParcial' | 'recebido'; somenteAtrasados?: boolean; page: number; pageSize: number };
    output: { pedidos: { items: PedidoResumo[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['valorTotalPedidoCalculado', 'valorLimiteAprovacao'];
    access: { actors: ['comprador']; grants: ['compradorCadastroFornecedores', 'compradorProdutosFornecidos', 'compradorPedidos']; scope: 'organization' };
  };
  /**
   * Finalidade: Abre o pedido escolhido na lista com tudo que a revisão, o envio e o histórico mostram, em uma só chamada.
   * Entrada: pedidoId: id do pedido selecionado na lista.
   * Processamento: Lê o pedido pelo id, recusando pedido de outro comprador (escopo own). Compõe os itens ordenados por numeroItem com nome e unidade do produto, e os recebimentos do pedido ordenados por registradoEm. Calcula valorTotalItem (quantidade × preço), quantidadeRecebida, quantidadePendente e recebidoTotalmente de cada item; valorTotal do pedido (valorTotalPedidoCalculado), quantidadePendente total, aguardandoAprovacao e liberadoAoFornecedor (valorLimiteAprovacao); tipoRecebimento e quantidadeTotalRecebida de cada recebimento. Nada disso é gravado.
   * Saída: O pedido com versão, situação, fornecedor, datas de envio e decisão, totais, itens e recebimentos, para a página conferir, enviar e contar a história do pedido.
   */
  'compras.pedidos_comprador.qryDetalharPedido': {
    kind: 'qry';
    input: { pedidoId: string };
    output: { pedido: PedidoDetalhe };
    rules: ['valorTotalPedidoCalculado', 'valorLimiteAprovacao'];
    access: { actors: ['comprador']; grants: ['compradorCadastroFornecedores', 'compradorProdutosFornecidos', 'compradorPedidos']; scope: 'organization' };
  };
  /**
   * Finalidade: Busca o fornecedor para o qual o comprador vai abrir o pedido.
   * Entrada: termo: parte do nome/razão social ou o CNPJ digitado.
   * Processamento: Localiza fornecedores por nome ou CNPJ no cadastro mestre e devolve apenas os ativos, pois fornecedor inativo não recebe novo pedido (fornecedorInativoSemNovoPedido). Limita a uma quantidade curta de resultados para a escolha.
   * Saída: Lista curta de fornecedores com nome e CNPJ para o comprador escolher.
   */
  'compras.pedidos_comprador.qryBuscarFornecedores': {
    kind: 'qry';
    input: { termo: string };
    output: { fornecedores: FornecedorResumo[] };
    rules: ['fornecedorInativoSemNovoPedido'];
    access: { actors: ['comprador']; grants: ['compradorCadastroFornecedores', 'compradorProdutosFornecidos', 'compradorPedidos']; scope: 'organization' };
  };
  /**
   * Finalidade: Oferece os produtos que o fornecedor do pedido fornece, com o preço combinado que sugere o preço do item.
   * Entrada: fornecedorId: fornecedor do pedido em montagem; termo: filtro opcional por nome do produto ou código do produto fornecido.
   * Processamento: Filtra ProdutoFornecido pelo fornecedor, ativo = verdadeiro e do comprador da sessão (escopo own), descartando produtos inativos no cadastro mestre (itemPedidoProdutoDoFornecedor, inactiveProductCannotBeOrdered). Junta nome e unidade do produto. O precoCombinado vigente é devolvido como sugestão do preço unitário (precoCombinadoSugerePreco).
   * Saída: Lista de produtos fornecidos com código, produto, unidade e preço combinado, para preencher produto e preço do item.
   */
  'compras.pedidos_comprador.qryListarProdutosFornecidos': {
    kind: 'qry';
    input: { fornecedorId: string; termo?: string };
    output: { produtosFornecidos: ProdutoFornecidoOpcao[] };
    rules: ['itemPedidoProdutoDoFornecedor', 'inactiveProductCannotBeOrdered', 'precoCombinadoSugerePreco'];
    access: { actors: ['comprador']; grants: ['compradorCadastroFornecedores', 'compradorProdutosFornecidos', 'compradorPedidos']; scope: 'organization' };
  };
  /**
   * Finalidade: Abre um novo pedido de compra em rascunho para o fornecedor escolhido.
   * Entrada: fornecedorId: fornecedor escolhido na busca; compradorId: comprador da sessão que abre o pedido (o servidor confere que corresponde ao usuário logado).
   * Processamento: Confere que compradorId é o comprador resolvido da sessão (escopo own) e recusa se estiver inativo (compradorInativoNaoAbrePedido). Recusa fornecedor inativo (fornecedorInativoSemNovoPedido). Cria o pedido com status rascunho; o número é emitido pela sequência do módulo, único e imutável (numeroPedidoUnico); dataEmissao é preenchida pelo sistema.
   * Saída: O pedido criado com número, fornecedor, versão e valor total zero, sem itens, para a montagem seguir incluindo itens.
   */
  'compras.pedidos_comprador.cmdAbrirPedidoCompra': {
    kind: 'cmd';
    writes: 'PedidoCompra.create';
    input: { fornecedorId: string; compradorId: string };
    output: { pedido: PedidoDetalhe };
    rules: ['compradorInativoNaoAbrePedido', 'fornecedorInativoSemNovoPedido', 'numeroPedidoUnico'];
    access: { actors: ['comprador']; grants: ['compradorCadastroFornecedores', 'compradorProdutosFornecidos', 'compradorPedidos']; scope: 'organization' };
  };
  /**
   * Finalidade: Inclui um item no pedido em montagem e devolve o pedido com o valor do item e o total recalculados.
   * Entrada: pedidoCompraId: pedido em montagem; produtoId: produto do item; produtoFornecidoId: preço combinado que sugeriu o preço (opcional); quantidade e precoUnitario: valores do item; observacao: nota livre opcional.
   * Processamento: Recusa se o pedido não estiver em rascunho ou não for do comprador (itemPedidoSomenteEmRascunho). Exige quantidade > 0 e preço não negativo (itemPedidoQuantidadePositiva). Exige que o produto seja produto fornecido ativo do fornecedor do pedido e ativo no cadastro mestre (itemPedidoProdutoDoFornecedor, inactiveProductCannotBeOrdered). Grava o preço informado pelo comprador e o produtoFornecidoId de origem quando houver (precoSugeridoNoItemPedido). Atribui o próximo numeroItem. valorTotalItem e valorTotal do pedido são calculados na leitura (valorTotalPedidoCalculado), nunca gravados.
   * Saída: O pedido atualizado com todos os itens, valor de cada item e total, para a montagem redesenhar sem nova chamada.
   */
  'compras.pedidos_comprador.cmdIncluirItemPedido': {
    kind: 'cmd';
    writes: 'ItemPedido.create';
    input: { pedidoCompraId: string; produtoId: string; produtoFornecidoId?: string; details: { quantidade: number; precoUnitario: string; observacao?: string } };
    output: { pedido: PedidoDetalhe };
    rules: ['itemPedidoSomenteEmRascunho', 'itemPedidoQuantidadePositiva', 'itemPedidoProdutoDoFornecedor', 'inactiveProductCannotBeOrdered', 'precoSugeridoNoItemPedido', 'valorTotalPedidoCalculado'];
    access: { actors: ['comprador']; grants: ['compradorCadastroFornecedores', 'compradorProdutosFornecidos', 'compradorPedidos']; scope: 'organization' };
  };
  /**
   * Finalidade: Envia o pedido em rascunho informando a entrega prevista; o pedido segue ao fornecedor ou aguarda aprovação conforme o valor.
   * Entrada: pedidoId e version: pedido e versão vista (concorrência otimista); dataPrevistaEntrega: data combinada para a chegada.
   * Processamento: Aplica a transição enviar (rascunho → enviado) só a pedido em rascunho do comprador (edicaoSomenteRascunho). Recusa pedido sem ao menos um item com quantidade e preço (pedidoExigeItens) e fornecedor inativo (fornecedorInativoSemNovoPedido). Grava dataPrevistaEntrega; dataEnvio é registrada pelo sistema. aguardandoAprovacao ou liberadoAoFornecedor resultam do valor total comparado ao valor limite (valorLimiteAprovacao) e são calculados, não gravados.
   * Saída: O pedido atualizado com situação, data de envio e indicação de aguardando aprovação ou liberado, para revisão, envio e histórico redesenharem.
   */
  'compras.pedidos_comprador.cmdEnviarPedido': {
    kind: 'cmd';
    writes: 'PedidoCompra.enviar';
    input: { id: string; version: number; dataPrevistaEntrega: string };
    output: { pedido: PedidoDetalhe };
    rules: ['pedidoExigeItens', 'valorLimiteAprovacao', 'fornecedorInativoSemNovoPedido', 'edicaoSomenteRascunho'];
    access: { actors: ['comprador']; grants: ['compradorCadastroFornecedores', 'compradorProdutosFornecidos', 'compradorPedidos']; scope: 'organization' };
  };
}
