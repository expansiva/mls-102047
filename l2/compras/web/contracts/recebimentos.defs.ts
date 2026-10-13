/// <mls fileReference="_102047_/l2/compras/web/contracts/recebimentos.defs.ts" enhancement="_blank"/>

/** Identificação do fornecedor no cadastro mestre. */
export interface FornecedorIdentificacao {
  details: {
    identification: {
      name: string;
    };
  };
}

/** Dados da empresa do fornecedor. */
export interface FornecedorEmpresa {
  details: {
    company: {
      legalName: string;
    };
  };
}

export interface FornecedorDetalhes {
  identification: FornecedorIdentificacao;
  company?: FornecedorEmpresa;
}

/** Fornecedor do pedido, lido do cadastro mestre. */
export interface FornecedorRef {
  details: FornecedorDetalhes;
}

export interface PedidoFilaDetalhes {
  details: {
    readonly liberadoAoFornecedor: boolean;
    readonly quantidadePendente: number;
    readonly dataEnvio?: string;
  };
}

/** Linha da fila de pedidos liberados aguardando chegada. */
export interface PedidoFila {
  id: string;
  readonly numero: string;
  status: 'rascunho' | 'enviado' | 'aprovado' | 'rejeitado' | 'recebidoParcial' | 'recebido';
  readonly dataEmissao: string;
  dataPrevistaEntrega?: string;
  fornecedorId: string;
  details: PedidoFilaDetalhes;
  fornecedor: FornecedorRef;
}

export interface PedidoPendenciaDetalhes {
  details: {
    readonly emAberto: boolean;
    readonly atrasado: boolean;
    readonly quantidadePendente: number;
  };
}

/** Pedido em aberto ou atrasado com sua quantidade pendente, para priorizar a conferência. */
export interface PedidoPendencia {
  id: string;
  readonly numero: string;
  dataPrevistaEntrega?: string;
  details: PedidoPendenciaDetalhes;
  fornecedor: FornecedorRef;
}

export interface ProdutoIdentificacao {
  details: {
    identification: {
      name: string;
    };
  };
}

export interface ProdutoCodigo {
  details: {
    product: {
      sku?: string;
      unitOfMeasure: string;
    };
  };
}

export interface ProdutoDetalhes {
  identification: ProdutoIdentificacao;
  product: ProdutoCodigo;
}

/** Produto lido do cadastro mestre: nome, SKU e unidade. */
export interface ProdutoRef {
  details: ProdutoDetalhes;
}

export interface ItemConferenciaDetalhes {
  details: {
    quantidade: number;
    readonly quantidadeRecebida: number;
    readonly quantidadePendente: number;
    readonly recebidoTotalmente: boolean;
  };
}

/** Item do pedido com quantidades pedida, recebida e pendente e o produto. */
export interface ItemConferencia {
  id: string;
  numeroItem: number;
  produtoId: string;
  details: ItemConferenciaDetalhes;
  produto: ProdutoRef;
}

export interface EntradaHistoricoDetalhes {
  details: {
    quantidade: number;
    readonly valorTotal?: string;
    readonly publicada: boolean;
  };
}

/** Entrada no estoque gerada por um recebimento. */
export interface EntradaHistorico {
  id: string;
  readonly numero: string;
  readonly dataEntrada: string;
  produtoId: string;
  details: EntradaHistoricoDetalhes;
  produto: ProdutoRef;
}

export interface RecebimentoHistoricoDetalhes {
  details: {
    readonly tipoRecebimento: string;
    readonly quantidadeTotalRecebida: number;
  };
}

/** Recebimento registrado com suas entradas no estoque. */
export interface RecebimentoHistorico {
  id: string;
  readonly numero: string;
  dataRecebimento: string;
  readonly registradoEm: string;
  details: RecebimentoHistoricoDetalhes;
  entradas: EntradaHistorico[];
}

/** Pedido escolhido com itens para conferência e histórico de recebimentos e entradas. */
export interface PedidoConferencia {
  id: string;
  version: number;
  readonly numero: string;
  status: 'rascunho' | 'enviado' | 'aprovado' | 'rejeitado' | 'recebidoParcial' | 'recebido';
  fornecedor: FornecedorRef;
  itens: ItemConferencia[];
  recebimentos: RecebimentoHistorico[];
}

/** Quantidade recebida de um item na entrega. */
export interface RecebimentoItemEntrada {
  details: {
    itens: {
      itemPedidoId: string;
      produtoId: string;
      quantidadeRecebida: number;
      observacao?: string;
    };
  };
}

export interface RecebimentoDetalhesEntrada {
  details: {
    observacoes?: string;
  };
  itens: RecebimentoItemEntrada[];
}

export interface RecebimentosContracts {
  /**
   * Finalidade: Carrega na abertura da página a primeira página da fila de pedidos aguardando chegada e o resumo de pedidos em aberto e atrasados.
   * Entrada: pageSize: tamanho da primeira página da fila (opcional, padrão do servidor).
   * Processamento: Fila: pedidos com liberadoAoFornecedor verdadeiro ou status recebidoParcial (recebimentoSomenteLiberado; exclui rascunho, aguardando aprovação, rejeitado e recebido conforme recebimentoSomentePedidoAprovado), ordenados pela entrega prevista, com nome e razão social do fornecedor lidos do cadastro mestre de uma vez. Resumo: conta os pedidos com emAberto e com atrasado (atrasado = em aberto com entrega prevista anterior a hoje) e lista os pedidos atrasados primeiro e depois os em aberto, limitados aos mais urgentes, com a quantidade pendente. Campos derivados são calculados, nunca gravados.
   * Saída: fila paginada ({ items, page, pageSize, hasMore }), os totais já calculados e a lista curta de pendências, para a página abrir sem outra chamada.
   */
  'compras.recebimentos.qryRecebimentosInicio': {
    kind: 'qry';
    input: { page: number; pageSize: number };
    output: { fila: { items: PedidoFila[]; page: number; pageSize: number; hasMore: boolean }; readonly totalEmAberto: number; readonly totalAtrasados: number; pendencias: PedidoPendencia[] };
    rules: ['recebimentoSomenteLiberado', 'recebimentoSomentePedidoAprovado'];
    access: { actors: ['almoxarife']; grants: ['almoxarifePedidos', 'almoxarifeRecebimentos', 'almoxarifeConsultaCadastros']; scope: 'organization' };
  };
  /**
   * Finalidade: Busca na fila de chegada o pedido pelo número ou pelo fornecedor e pagina a fila.
   * Entrada: busca: texto com o número do pedido ou o nome/razão social do fornecedor; page e pageSize: página pedida.
   * Processamento: Aplica o mesmo filtro da fila (recebimentoSomenteLiberado e recebimentoSomentePedidoAprovado: só pedidos liberados ao fornecedor ou recebidos parcialmente) e casa o texto com PedidoCompra.numero ou com o nome/razão social do fornecedor; ordena pela entrega prevista.
   * Saída: Página da fila no mesmo formato da abertura, que substitui a fila exibida.
   */
  'compras.recebimentos.qryBuscarPedidosAguardando': {
    kind: 'qry';
    input: { busca?: string; page: number; pageSize: number };
    output: { fila: { items: PedidoFila[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['recebimentoSomenteLiberado', 'recebimentoSomentePedidoAprovado'];
    access: { actors: ['almoxarife']; grants: ['almoxarifePedidos', 'almoxarifeRecebimentos', 'almoxarifeConsultaCadastros']; scope: 'organization' };
  };
  /**
   * Finalidade: Abre o pedido escolhido com seus itens para conferência e registro e o histórico de recebimentos com as entradas no estoque.
   * Entrada: pedidoCompraId: pedido escolhido na fila ou no resumo de pendências.
   * Processamento: Lê o pedido, seus itens ordenados por numeroItem e os recebimentos do pedido ordenados pela data, com as entradas de cada recebimento (findManyByValues); hidrata nome, SKU e unidade dos produtos e o nome do fornecedor do cadastro mestre de uma vez. Calcula quantidadeRecebida, quantidadePendente e recebidoTotalmente de cada item a partir das entradas, tipoRecebimento e quantidadeTotalRecebida de cada recebimento, valorTotal de cada entrada e publicada quando há momento de publicação registrado (entradaPublicadaAoEstoque). Não expõe preço nem valor do pedido.
   * Saída: O pedido com itens e histórico, que alimenta a conferência, o formulário de registro e a linha do tempo.
   */
  'compras.recebimentos.qryPedidoConferencia': {
    kind: 'qry';
    input: { pedidoCompraId: string };
    output: { pedido: PedidoConferencia };
    rules: ['entradaPublicadaAoEstoque'];
    access: { actors: ['almoxarife']; grants: ['almoxarifePedidos', 'almoxarifeRecebimentos', 'almoxarifeConsultaCadastros']; scope: 'organization' };
  };
  /**
   * Finalidade: Registra a chegada total ou parcial do pedido e dá entrada no estoque dos produtos recebidos.
   * Entrada: pedidoCompraId: pedido recebido; dataRecebimento: data da chegada; details.observacoes: observações gerais da entrega; details.itens: para cada item, itemPedidoId, produtoId, quantidadeRecebida e observação de avaria ou divergência.
   * Processamento: Recusa se o pedido não está liberado ao fornecedor nem recebido parcialmente (recebimentoSomenteLiberado, recebimentoSomentePedidoAprovado). Ignora itens com quantidade zero; recusa quantidade negativa ou maior que a pendente do item (quantidadeRecebidaNaoExcedePendente, quantidadeRecebidaNaoExcedePedido) e produto diferente do item (entradaProdutoDoItemPedido). Emite o número do recebimento pela sequência (numeroRecebimentoUnico); em uma única transação grava o recebimento, uma entrada no estoque por item recebido com quantidade positiva, produto e preço unitário do item (recebimentoGeraEntradaEstoque, entradaGeradaPeloRecebimento, quantidadeEntradaPositiva, entradaUnicaPorItemRecebimento) e move o pedido para recebido quando todos os itens ficam completos ou recebidoParcial caso contrário (recebimentoAtualizaSituacaoPedido). tipoRecebimento e quantidadeTotalRecebida são calculados, não informados.
   * Saída: O pedido atualizado com itens, nova situação e histórico incluindo o novo recebimento e suas entradas, para redesenhar conferência, formulário e linha do tempo sem nova chamada.
   */
  'compras.recebimentos.cmdRegistrarRecebimento': {
    kind: 'cmd';
    writes: 'Recebimento.create';
    input: { pedidoCompraId: string; dataRecebimento: string; details: RecebimentoDetalhesEntrada };
    output: { pedido: PedidoConferencia };
    rules: ['recebimentoSomenteLiberado', 'recebimentoSomentePedidoAprovado', 'quantidadeRecebidaNaoExcedePendente', 'quantidadeRecebidaNaoExcedePedido', 'quantidadeEntradaPositiva', 'recebimentoGeraEntradaEstoque', 'entradaGeradaPeloRecebimento', 'entradaProdutoDoItemPedido', 'entradaUnicaPorItemRecebimento', 'recebimentoAtualizaSituacaoPedido', 'numeroRecebimentoUnico'];
    access: { actors: ['almoxarife']; grants: ['almoxarifePedidos', 'almoxarifeRecebimentos', 'almoxarifeConsultaCadastros']; scope: 'organization' };
  };
}
