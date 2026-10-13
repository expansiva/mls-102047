/// <mls fileReference="_102047_/l2/compras/web/contracts/painel_compras.defs.ts" enhancement="_blank"/>

/** Linha do painel do mês para um fornecedor: contagens e totais já apurados pelo agregado PainelCompras. */
export interface CompraFornecedorMes {
  readonly fornecedorId: string;
  fornecedor: {
    details: {
      identification: {
        name: string;
      };
    };
  };
  details: {
    readonly pedidosEmAberto: number;
    readonly pedidosAtrasados: number;
    readonly quantidadePedidos: number;
    readonly totalComprado: string;
    readonly totalRecebido: string;
  };
}

/** Indicadores do mês: linha que totaliza a organização (fornecedorId vazio) e o ranking por fornecedor. */
export interface IndicadoresMes {
  readonly mesReferencia: string;
  details: {
    readonly pedidosEmAberto: number;
    readonly pedidosAtrasados: number;
    readonly quantidadePedidos: number;
    readonly totalComprado: string;
    readonly totalRecebido: string;
  };
  fornecedores: CompraFornecedorMes[];
}

/** Contagens dos pedidos por ponto do ciclo, já calculadas no servidor. */
export interface ResumoSituacao {
  readonly aguardandoAprovacao: number;
  readonly liberadoAoFornecedor: number;
  readonly emAberto: number;
  readonly quantidadePendente: number;
}

/** Pedido acima do valor limite aguardando decisão do gerente. */
export interface PedidoPendenteAprovacao {
  id: string;
  version: number;
  readonly numero: string;
  status: 'rascunho' | 'enviado' | 'aprovado' | 'rejeitado' | 'recebidoParcial' | 'recebido';
  fornecedorId: string;
  fornecedor: FornecedorNome;
  compradorId: string;
  comprador: CompradorNome;
  details: {
    readonly dataEnvio?: string;
    readonly valorTotal: string;
    readonly aguardandoAprovacao: boolean;
  };
}

/** Pedido em aberto com entrega prevista vencida. */
export interface PedidoAtrasado {
  id: string;
  readonly numero: string;
  fornecedorId: string;
  fornecedor: FornecedorNome;
  readonly dataEmissao: string;
  dataPrevistaEntrega?: string;
  details: {
    readonly atrasado: boolean;
    readonly valorTotal: string;
    readonly quantidadePendente: number;
  };
}

/** Nome do fornecedor lido do cadastro mestre. */
export interface FornecedorNome {
  details: {
    identification: {
      name: string;
    };
  };
}

/** Nome do comprador lido do cadastro mestre. */
export interface CompradorNome {
  details: {
    identification: {
      name: string;
    };
  };
}

export interface Painel_comprasContracts {
  /**
   * Finalidade: Carrega de uma vez o que o painel do gerente mostra ao abrir: indicadores do mês, resumo da situação dos pedidos e a caixa de pedidos aguardando aprovação.
   * Entrada: mesReferencia: início do mês a resumir; quando ausente, usa o mês corrente.
   * Processamento: Lê o agregado PainelCompras do mês (read.window): a linha sem fornecedor dá os totais da organização e as linhas por fornecedor formam o ranking ordenado por totalComprado desc, com o nome do fornecedor hidratado de uma vez no cadastro mestre. totalComprado segue totalCompradoConsideraPedidosAprovados (só liberados ou recebidos); pedidosEmAberto e pedidosAtrasados seguem pedidoEmAbertoAteRecebimentoTotal e pedidoAtrasadoPrevisaoVencida. O resumo conta (count) pedidos com aguardandoAprovacao, liberadoAoFornecedor e emAberto e soma quantidadePendente dos pedidos em aberto; tudo é derivado e calculado, nunca gravado. A caixa lista os pedidos enviados com aguardandoAprovacao verdadeiro (valorLimiteAprovacao), ordenados por dataEnvio, com nomes de fornecedor e comprador hidratados.
   * Saída: painelMes com totais e ranking por fornecedor; resumoSituacao com os números prontos; aprovacoesPendentes com id e version para decidir na hora.
   */
  'compras.painel_compras.qryPainelCompras': {
    kind: 'qry';
    input: { mesReferencia?: string };
    output: { painelMes: IndicadoresMes; resumoSituacao: ResumoSituacao; aprovacoesPendentes: PedidoPendenteAprovacao[] };
    rules: ['totalCompradoConsideraPedidosAprovados', 'pedidoAtrasadoPrevisaoVencida', 'pedidoEmAbertoAteRecebimentoTotal', 'valorLimiteAprovacao'];
    access: { actors: ['gerenteCompras']; grants: ['gerenteAprovacaoPedidos', 'gerenteCadastros', 'gerentePainel']; scope: 'organization' };
  };
  /**
   * Finalidade: Lista paginada dos pedidos atrasados para o gerente acompanhar e abrir.
   * Entrada: page e pageSize: página pedida e tamanho da página.
   * Processamento: Filtra pedidos em aberto (enviado, aprovado ou recebidoParcial, pedidoEmAbertoAteRecebimentoTotal) com dataPrevistaEntrega anterior a hoje (pedidoAtrasadoPrevisaoVencida), ordenados pela entrega prevista mais antiga; hidrata o nome do fornecedor; valorTotal e quantidadePendente são derivados calculados.
   * Saída: { items, page, pageSize, hasMore } com os pedidos atrasados; a página seguinte é anexada à lista.
   */
  'compras.painel_compras.qryPedidosAtrasados': {
    kind: 'qry';
    input: { page: number; pageSize: number };
    output: { pedidosAtrasados: { items: PedidoAtrasado[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['pedidoAtrasadoPrevisaoVencida', 'pedidoEmAbertoAteRecebimentoTotal'];
    access: { actors: ['gerenteCompras']; grants: ['gerenteAprovacaoPedidos', 'gerenteCadastros', 'gerentePainel']; scope: 'organization' };
  };
  /**
   * Finalidade: Aprova um pedido acima do valor limite, liberando-o ao fornecedor.
   * Entrada: id e version do pedido (concorrência otimista).
   * Processamento: Executa a transição aprovar (enviado → aprovado); recusa se o pedido não estiver enviado aguardando aprovação (valorLimiteAprovacao) ou se a version divergir. decididoEm é registrado pela plataforma. Depois recalcula o resumo e lê o painel do mês atualizado.
   * Saída: O pedido com a nova situação (sai da caixa de pendentes), o resumo da situação e o painel do mês já atualizados, sem nova chamada.
   */
  'compras.painel_compras.cmdAprovarPedido': {
    kind: 'cmd';
    writes: 'PedidoCompra.aprovar';
    input: { id: string; version: number };
    output: { pedido: PedidoPendenteAprovacao; resumoSituacao: ResumoSituacao; painelMes: IndicadoresMes };
    rules: ['valorLimiteAprovacao'];
    access: { actors: ['gerenteCompras']; grants: ['gerenteAprovacaoPedidos', 'gerenteCadastros', 'gerentePainel']; scope: 'organization' };
  };
  /**
   * Finalidade: Rejeita um pedido acima do valor limite registrando o motivo.
   * Entrada: id e version do pedido; motivoRejeicao: texto informado pelo gerente.
   * Processamento: Executa a transição rejeitar (enviado → rejeitado) gravando details.decisao.motivoRejeicao; recusa motivo vazio (rejeicaoExigeMotivo) e pedido que não esteja aguardando aprovação (valorLimiteAprovacao) ou com version divergente. decididoEm é registrado pela plataforma. Recalcula o resumo e lê o painel do mês atualizado.
   * Saída: O pedido rejeitado (sai da caixa), o resumo e o painel atualizados; a lista de atrasados é recarregada pois o pedido deixa de estar em aberto.
   */
  'compras.painel_compras.cmdRejeitarPedido': {
    kind: 'cmd';
    writes: 'PedidoCompra.rejeitar';
    input: { id: string; version: number; details: { decisao: { motivoRejeicao: string } } };
    output: { pedido: PedidoPendenteAprovacao; resumoSituacao: ResumoSituacao; painelMes: IndicadoresMes };
    rules: ['valorLimiteAprovacao', 'rejeicaoExigeMotivo'];
    access: { actors: ['gerenteCompras']; grants: ['gerenteAprovacaoPedidos', 'gerenteCadastros', 'gerentePainel']; scope: 'organization' };
  };
}
