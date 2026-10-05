/// <mls fileReference="_102047_/l2/comandaRestaurante/web/contracts/atendimento.defs.ts" enhancement="_blank"/>

/** Mesa disponível para início de atendimento e seleção pelo garçom. */
export interface MesaDisponivel {
  id: string;
  code: string;
  readonly disponivel: boolean;
}

/** Comanda aberta apresentada na localização do atendimento. */
export interface ComandaResumo {
  id: string;
  version: number;
  number: number;
  mesaId: string;
  status: 'open' | 'closed';
  code: string;
}

/** Item do cardápio selecionável para informar um pedido. */
export interface ItemCardapioResumo {
  id: string;
  name: string;
  precoVigente: string;
}

/** Trecho paginado de mesas sem comanda aberta. */
export interface PaginaMesasDisponiveis {
  items: MesaDisponivel[];
  readonly total: number;
  page: number;
  pageSize: number;
}

/** Trecho paginado de comandas abertas para localização. */
export interface PaginaComandasAbertas {
  items: ComandaResumo[];
  readonly total: number;
  page: number;
  pageSize: number;
}

/** Trecho paginado de itens de cardápio para pesquisa e escolha. */
export interface PaginaItensCardapio {
  items: ItemCardapioResumo[];
  readonly total: number;
  page: number;
  pageSize: number;
}

/** Listas independentes para localizar mesa, comanda aberta e item do cardápio. */
export interface ContextoAtendimento {
  mesasDisponiveis: PaginaMesasDisponiveis;
  comandasAbertas: PaginaComandasAbertas;
  itensCardapio: PaginaItensCardapio;
}

/** Linha da comanda, inclusive linha cancelada, para conferência e eventual cancelamento. */
export interface ItemComandaAtendimento {
  id: string;
  version: number;
  comandaId: string;
  itemCardapioId: string;
  status: 'launched' | 'canceled';
  quantidade: number;
  observacao?: string;
  precoUnitario: string;
  readonly valorTotal: string;
  name: string;
}

/** Comanda escolhida com a mesa, todas as linhas e subtotal calculado para o atendimento. */
export interface ComandaAtendimento {
  id: string;
  version: number;
  number: number;
  mesaId: string;
  status: 'open' | 'closed';
  code: string;
  readonly subtotal: string;
  itens: ItemComandaAtendimento[];
}

export interface AtendimentoContracts {
  /**
   * Finalidade: Carrega o contexto inicial de localização do atendimento para o garçom encontrar mesa, comanda aberta ou item do cardápio.
   * Entrada: mesasPage, comandasPage e itensPage indicam opcionalmente a página inicial de cada lista independente.
   * Processamento: Lista apenas mesas cuja disponibilidade calculada é verdadeira, apenas comandas em situação open e itens de cardápio ordenados por nome. Calcula o total de cada resultado antes de paginar, sem alterar registros.
   * Saída: Devolve as três listas já filtradas, paginadas e no formato usado pela localização e pelo formulário.
   */
  'comandaRestaurante.atendimento.carregarAtendimento': {
    kind: 'qry';
    input: { mesasPage?: number; comandasPage?: number; itensPage?: number };
    output: { contextoAtendimento: ContextoAtendimento };
    rules: [];
    access: { actors: ['garcom']; grants: ['garcomAtendimentoComandas']; scope: 'organization' };
  };
  /**
   * Finalidade: Pesquisa ou troca a página das listas de localização sem carregar detalhes de uma comanda.
   * Entrada: mesaTermo filtra o código de mesas disponíveis, comandaNumero restringe pelo número de uma comanda aberta, itemTermo busca trecho do nome do cardápio e os campos Page determinam o trecho retornado.
   * Processamento: Preserva os filtros de situação da página: mesas disponíveis e comandas open. Aplica os termos informados, ordena os resultados, calcula o total de cada coleção e só então pagina cada uma.
   * Saída: Devolve o novo contexto de localização para substituir as listas exibidas após pesquisa ou navegação.
   */
  'comandaRestaurante.atendimento.atualizarLocalizacaoAtendimento': {
    kind: 'qry';
    input: { mesaTermo?: string; comandaNumero?: number; itemTermo?: string; mesasPage?: number; comandasPage?: number; itensPage?: number };
    output: { contextoAtendimento: ContextoAtendimento };
    rules: [];
    access: { actors: ['garcom']; grants: ['garcomAtendimentoComandas']; scope: 'organization' };
  };
  /**
   * Finalidade: Obtém a comanda selecionada com linhas e subtotal para conferência e ações imediatas do garçom.
   * Entrada: comandaId é o identificador da comanda escolhido na lista de atendimento.
   * Processamento: Lê a comanda, sua mesa e todas as linhas, incluindo canceladas, com o nome do item do cardápio. Calcula valorTotal de cada linha conforme valorTotalItemComandaCalculado e subtotal apenas com linhas não canceladas conforme subtotalComandaCalculado; não grava campos derivados.
   * Saída: Devolve a comanda completa para redesenhar a conferência, contextualizar o formulário e permitir selecionar a linha a cancelar.
   */
  'comandaRestaurante.atendimento.obterComandaAtendimento': {
    kind: 'qry';
    input: { comandaId: string };
    output: { comanda: ComandaAtendimento };
    rules: ['subtotalComandaCalculado', 'valorTotalItemComandaCalculado'];
    access: { actors: ['garcom']; grants: ['garcomAtendimentoComandas']; scope: 'organization' };
  };
  /**
   * Finalidade: Abre uma comanda para a mesa disponível selecionada e devolve o atendimento pronto para receber pedidos.
   * Entrada: mesaId preenche o vínculo obrigatório da nova Comanda com a mesa escolhida.
   * Processamento: Em transação, verifica a disponibilidade da mesa conforme mesaDisponivelParaAbrirComanda e impede outra comanda open para ela conforme umaComandaAbertaPorMesa. Gera o número sequencial, cria a comanda open e calcula seu subtotal vazio conforme subtotalComandaCalculado.
   * Saída: Devolve a nova comanda, com mesa, número, situação, linhas vazias e subtotal, para a página redesenhar a conferência sem nova consulta.
   */
  'comandaRestaurante.atendimento.abrirComanda': {
    kind: 'cmd';
    writes: 'Comanda.create';
    input: { mesaId: string };
    output: { comanda: ComandaAtendimento };
    rules: ['mesaDisponivelParaAbrirComanda', 'umaComandaAbertaPorMesa', 'subtotalComandaCalculado'];
    access: { actors: ['garcom']; grants: ['garcomAtendimentoComandas']; scope: 'organization' };
  };
  /**
   * Finalidade: Registra o pedido na comanda aberta e devolve a conferência integral já atualizada.
   * Entrada: comandaId vincula a linha à comanda, itemCardapioId identifica o pedido, quantidade informa o volume e observacao registra a orientação opcional de preparo.
   * Processamento: Recusa o lançamento se a comanda não estiver open conforme itensSomenteEmComandaAberta. Obtém e registra o preço vigente conforme precoUnitarioRegistradoNoLancamento, calcula valorTotal conforme valorTotalItemComandaCalculado e recalcula o subtotal conforme subtotalComandaCalculado.
   * Saída: Devolve a comanda com a nova linha, preço registrado, valores calculados e subtotal atualizado, dispensando uma segunda chamada.
   */
  'comandaRestaurante.atendimento.lancarItem': {
    kind: 'cmd';
    writes: 'ItemComanda.create';
    input: { comandaId: string; itemCardapioId: string; quantidade: number; observacao?: string };
    output: { comanda: ComandaAtendimento };
    rules: ['itensSomenteEmComandaAberta', 'precoUnitarioRegistradoNoLancamento', 'valorTotalItemComandaCalculado', 'subtotalComandaCalculado'];
    access: { actors: ['garcom']; grants: ['garcomAtendimentoComandas']; scope: 'organization' };
  };
  /**
   * Finalidade: Cancela a linha escolhida por engano e devolve a comanda com a cobrança recalculada.
   * Entrada: id identifica o item da comanda e version protege a transição contra alteração concorrente.
   * Processamento: Executa cancelarItemComanda somente sobre item launched de uma comanda open, conforme itemComandaOperacaoSomenteComandaAberta. Conserva a linha no histórico como canceled, apresenta seu valor calculado conforme valorTotalItemComandaCalculado e recalcula o subtotal sem a linha conforme subtotalComandaCalculado.
   * Saída: Devolve a comanda completa com a linha marcada como canceled e subtotal atualizado para conferência imediata.
   */
  'comandaRestaurante.atendimento.cancelarItem': {
    kind: 'cmd';
    writes: 'ItemComanda.cancelarItemComanda';
    input: { id: string; version: number };
    output: { comanda: ComandaAtendimento };
    rules: ['itemComandaOperacaoSomenteComandaAberta', 'valorTotalItemComandaCalculado', 'subtotalComandaCalculado'];
    access: { actors: ['garcom']; grants: ['garcomAtendimentoComandas']; scope: 'organization' };
  };
}
