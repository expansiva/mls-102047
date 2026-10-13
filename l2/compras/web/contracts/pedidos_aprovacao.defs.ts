/// <mls fileReference="_102047_/l2/compras/web/contracts/pedidos_aprovacao.defs.ts" enhancement="_blank"/>

/** Identificação do fornecedor no cadastro mestre. */
export interface FornecedorIdentificacao {
  details: {
    identification: {
      name: string;
      docId?: string;
    };
  };
}

/** Dados de empresa do fornecedor. */
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

/** Fornecedor do pedido; na lista vem só o nome, na análise também razão social e CNPJ. */
export interface FornecedorPedido {
  details: FornecedorDetalhes;
}

export interface CompradorIdentificacao {
  details: {
    identification: {
      name: string;
    };
  };
}

export interface CompradorDetalhes {
  identification: CompradorIdentificacao;
}

/** Comprador que abriu o pedido. */
export interface CompradorPedido {
  details: CompradorDetalhes;
}

export interface PedidoResumoDetalhes {
  details: {
    readonly valorTotal: string;
    readonly quantidadePendente: number;
    readonly aguardandoAprovacao: boolean;
    readonly atrasado: boolean;
    readonly emAberto: boolean;
    readonly liberadoAoFornecedor: boolean;
  };
}

/** Linha da lista de pedidos. */
export interface PedidoResumo {
  id: string;
  version: number;
  readonly numero: string;
  status: 'rascunho' | 'enviado' | 'aprovado' | 'rejeitado' | 'recebidoParcial' | 'recebido';
  readonly dataEmissao: string;
  dataPrevistaEntrega?: string;
  fornecedorId: string;
  compradorId: string;
  details: PedidoResumoDetalhes;
  fornecedor: FornecedorPedido;
  comprador: CompradorPedido;
}

export interface PedidoDecisao {
  details: {
    decisao: {
      readonly decididoEm?: string;
      motivoRejeicao?: string;
    };
  };
}

export interface PedidoAnaliseDetalhes {
  details: {
    readonly valorTotal: string;
    readonly quantidadePendente: number;
    readonly aguardandoAprovacao: boolean;
    condicaoPagamento?: string;
    observacoes?: string;
    readonly dataEnvio?: string;
  };
  decisao?: PedidoDecisao;
}

export interface ProdutoIdentificacao {
  details: {
    identification: {
      name: string;
    };
  };
}

export interface ProdutoProduct {
  details: {
    product: {
      unitOfMeasure: string;
    };
  };
}

export interface ProdutoDetalhes {
  identification: ProdutoIdentificacao;
  product: ProdutoProduct;
}

/** Produto do item com nome e unidade. */
export interface ProdutoItem {
  details: ProdutoDetalhes;
}

export interface ItemPedidoDetalhes {
  details: {
    quantidade: number;
    precoUnitario: string;
    readonly valorTotalItem: string;
    readonly quantidadeRecebida: number;
    readonly quantidadePendente: number;
    readonly recebidoTotalmente: boolean;
  };
}

/** Linha de item do pedido na análise. */
export interface ItemPedidoAnalise {
  id: string;
  numeroItem: number;
  produtoId: string;
  details: ItemPedidoDetalhes;
  produto: ProdutoItem;
}

/** Pedido com fornecedor, comprador, itens e totais, usado na análise, na decisão e no cabeçalho do histórico. */
export interface PedidoAnalise {
  id: string;
  version: number;
  readonly numero: string;
  status: 'rascunho' | 'enviado' | 'aprovado' | 'rejeitado' | 'recebidoParcial' | 'recebido';
  readonly dataEmissao: string;
  dataPrevistaEntrega?: string;
  details: PedidoAnaliseDetalhes;
  fornecedor: FornecedorPedido;
  comprador: CompradorPedido;
  itens: ItemPedidoAnalise[];
}

export interface RecebimentoDetalhes {
  details: {
    readonly tipoRecebimento: string;
    readonly quantidadeTotalRecebida: number;
  };
}

/** Recebimento do pedido na linha do tempo. */
export interface RecebimentoHistorico {
  id: string;
  readonly numero: string;
  dataRecebimento: string;
  readonly registradoEm: string;
  details: RecebimentoDetalhes;
}

export interface EntradaEstoqueDetalhes {
  details: {
    quantidade: number;
    readonly valorTotal?: string;
    readonly publicada: boolean;
  };
}

/** Entrada no estoque gerada pelo sistema na linha do tempo. */
export interface EntradaEstoqueHistorico {
  id: string;
  readonly numero: string;
  recebimentoId: string;
  readonly dataEntrada: string;
  details: EntradaEstoqueDetalhes;
}

/** Recebimentos e entradas no estoque do pedido, em ordem cronológica. */
export interface HistoricoPedido {
  recebimentos: RecebimentoHistorico[];
  entradas: EntradaEstoqueHistorico[];
}

export interface Pedidos_aprovacaoContracts {
  /**
   * Finalidade: Carrega a lista paginada dos pedidos de compra da organização, já filtrada pelo filtro rápido escolhido pelo gerente.
   * Entrada: filtro: ’todos’ (padrão), ’pendentesAprovacao’ (aguardandoAprovacao verdadeiro) ou ’atrasados’ (atrasado verdadeiro); page e pageSize: página solicitada e tamanho.
   * Processamento: Localiza os pedidos da organização por situação, ordenados pela data de abertura mais recente; aplica o filtro: pendentes são os enviados acima do valor limite ainda sem decisão (valorLimiteAprovacao); atrasados são os em aberto (enviados, aprovados ou recebidos parcialmente, pedidoEmAbertoAteRecebimentoTotal) com entrega prevista anterior a hoje (pedidoAtrasadoPrevisaoVencida). Os campos derivados (valorTotal, quantidadePendente, aguardandoAprovacao, atrasado, emAberto, liberadoAoFornecedor) são calculados, nunca gravados. Hidrata de uma vez o nome do fornecedor e do comprador pelo cadastro mestre.
   * Saída: Página { items, page, pageSize, hasMore } de linhas com número, situação, datas, valor total, quantidade pendente, indicadores e nomes de fornecedor e comprador, prontas para a lista.
   */
  'compras.pedidos_aprovacao.qryListarPedidos': {
    kind: 'qry';
    input: { filtro?: 'todos' | 'pendentesAprovacao' | 'atrasados'; page: number; pageSize: number };
    output: { pedidos: { items: PedidoResumo[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['valorLimiteAprovacao', 'pedidoAtrasadoPrevisaoVencida', 'pedidoEmAbertoAteRecebimentoTotal'];
    access: { actors: ['gerenteCompras']; grants: ['gerenteAprovacaoPedidos', 'gerenteCadastros']; scope: 'organization' };
  };
  /**
   * Finalidade: Abre o pedido escolhido na lista com tudo o que a análise, a decisão e o histórico mostram, numa só chamada.
   * Entrada: pedidoId: id do pedido selecionado na lista.
   * Processamento: Lê o pedido pelo id, seus itens (listByForeignKey) com nome e unidade do produto, fornecedor (nome, razão social, CNPJ) e comprador pelo cadastro mestre. Calcula valorTotalItem, quantidadeRecebida (soma das entradas do item), quantidadePendente e recebidoTotalmente de cada item, e valorTotal do pedido como soma de quantidade x preço dos itens (valorTotalPedidoCalculado), além da quantidadePendente e aguardandoAprovacao do pedido. Lista os recebimentos do pedido e as entradas no estoque desses recebimentos, ordenados cronologicamente; valorTotal da entrada é quantidade x valor unitário e publicada é verdadeiro quando há momento de publicação (entradaPublicadaAoEstoque). Derivados são calculados, nunca gravados.
   * Saída: pedido: cabeçalho com itens, totais, data de envio e decisão (usado na análise, na decisão e nos eventos de envio e decisão do histórico); historico: recebimentos e entradas no estoque para a linha do tempo.
   */
  'compras.pedidos_aprovacao.qryObterPedido': {
    kind: 'qry';
    input: { pedidoId: string };
    output: { pedido: PedidoAnalise; historico: HistoricoPedido };
    rules: ['valorTotalPedidoCalculado', 'quantidadeRecebidaNaoExcedePedido', 'entradaPublicadaAoEstoque'];
    access: { actors: ['gerenteCompras']; grants: ['gerenteAprovacaoPedidos', 'gerenteCadastros']; scope: 'organization' };
  };
  /**
   * Finalidade: Aprova o pedido que aguarda decisão do gerente, liberando-o ao fornecedor.
   * Entrada: id e version do pedido em análise (concorrência otimista).
   * Processamento: Executa a transição aprovar (enviado → aprovado). Recusa se o pedido não estiver enviado ou não estiver aguardando aprovação, isto é, se o valor total não estiver acima do valor limite (valorLimiteAprovacao), ou se a versão divergir. O momento da decisão é registrado pela transição; aguardandoAprovacao e liberadoAoFornecedor passam a refletir a nova situação por cálculo.
   * Saída: pedido: o pedido atualizado com itens e totais para redesenhar análise, decisão e histórico; resumo: a linha atualizada para a lista.
   */
  'compras.pedidos_aprovacao.cmdAprovarPedido': {
    kind: 'cmd';
    writes: 'PedidoCompra.aprovar';
    input: { id: string; version: number };
    output: { pedido: PedidoAnalise; resumo: PedidoResumo };
    rules: ['valorLimiteAprovacao'];
    access: { actors: ['gerenteCompras']; grants: ['gerenteAprovacaoPedidos', 'gerenteCadastros']; scope: 'organization' };
  };
  /**
   * Finalidade: Rejeita o pedido que aguarda decisão do gerente, encerrando o processo com o motivo informado.
   * Entrada: id e version do pedido em análise; motivoRejeicao: texto do motivo informado pelo gerente.
   * Processamento: Executa a transição rejeitar (enviado → rejeitado) gravando o motivo. Recusa sem motivo preenchido (rejeicaoExigeMotivo), se o pedido não estiver aguardando aprovação por estar até o valor limite ou fora da situação enviado (valorLimiteAprovacao), ou se a versão divergir. O momento da decisão é registrado pela transição.
   * Saída: pedido: o pedido atualizado com motivo e data da decisão para redesenhar análise, decisão e histórico; resumo: a linha atualizada para a lista.
   */
  'compras.pedidos_aprovacao.cmdRejeitarPedido': {
    kind: 'cmd';
    writes: 'PedidoCompra.rejeitar';
    input: { id: string; version: number; details: { decisao: { motivoRejeicao: string } } };
    output: { pedido: PedidoAnalise; resumo: PedidoResumo };
    rules: ['valorLimiteAprovacao', 'rejeicaoExigeMotivo'];
    access: { actors: ['gerenteCompras']; grants: ['gerenteAprovacaoPedidos', 'gerenteCadastros']; scope: 'organization' };
  };
}
