/// <mls fileReference="_102047_/l2/comandaRestaurante/web/contracts/atendimento.defs.ts" enhancement="_blank"/>

/** Mesa disponível para início de atendimento, com identificador operacional para seleção. */
export interface MesaDisponivel {
  id: string;
  code: string;
  readonly disponivel: boolean;
}

/** Resumo de uma comanda aberta para localização e seleção no atendimento. */
export interface ComandaResumo {
  id: string;
  version: number;
  number: number;
  mesaId: string;
  status: 'open' | 'closed';
  code: string;
}

/** Item do cardápio selecionável para compor um lançamento. */
export interface ItemCardapioResumo {
  id: string;
  name: string;
  precoVigente: string;
}

/** Página de mesas disponíveis encontrada para o atendimento. */
export interface PaginaMesasDisponiveis {
  items: MesaDisponivel[];
  readonly total: number;
  page: number;
  pageSize: number;
}

/** Página de comandas abertas encontrada para o atendimento. */
export interface PaginaComandasAbertas {
  items: ComandaResumo[];
  readonly total: number;
  page: number;
  pageSize: number;
}

/** Página de itens do cardápio encontrada para lançamento. */
export interface PaginaItensCardapio {
  items: ItemCardapioResumo[];
  readonly total: number;
  page: number;
  pageSize: number;
}

/** Conjunto paginado de listas para localizar a mesa, a comanda aberta ou o item de cardápio no atendimento. */
export interface ContextoAtendimento {
  mesasDisponiveis: PaginaMesasDisponiveis;
  comandasAbertas: PaginaComandasAbertas;
  itensCardapio: PaginaItensCardapio;
}

/** Linha lançada na comanda, com dados necessários para conferência e cancelamento. */
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

/** Comanda completa para conferência do atendimento, incluindo as linhas e o subtotal calculado. */
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
   * Finalidade: Carrega o contexto inicial para o garçom localizar uma mesa disponível, uma comanda aberta ou um item do cardápio.
   * Entrada: mesasPage, comandasPage e itensPage definem, quando informados, a página inicial de cada lista independente.
   * Processamento: Busca somente mesas cuja disponibilidade calculada é verdadeira, somente comandas com situação open e itens do cardápio ordenados por nome. Cada coleção é paginada em tamanho adequado à tela e traz seu total calculado para a navegação; nenhuma comanda ou item é alterado.
   * Saída: Retorna contextoAtendimento com as três listas já filtradas e paginadas para alimentar a localização e a escolha do contexto de atendimento.
   */
  'comandaRestaurante.atendimento.carregarAtendimento': {
    kind: 'qry';
    input: { mesasPage?: number; comandasPage?: number; itensPage?: number };
    output: { contextoAtendimento: ContextoAtendimento };
    meta: { output: {}; lists: {}; params: {} };
    rules: [];
    access: { actors: ['garcom']; grants: ['garcomAtendimentoComandas']; scope: 'organization' };
  };
  /**
   * Finalidade: Atualiza sob demanda as listas de localização sem carregar detalhes de uma comanda.
   * Entrada: mesaTermo filtra o código da mesa disponível; comandaNumero restringe a comanda aberta pelo número; itemTermo pesquisa o nome do cardápio. Os campos de página determinam qual trecho de cada resultado será devolvido.
   * Processamento: Aplica os filtros informados preservando as situações de interesse da página: mesas disponíveis e comandas open. Pesquisa o cardápio por trecho do nome, ordena os resultados e calcula o total de cada lista antes de paginar.
   * Saída: Retorna contextoAtendimento no mesmo formato da carga inicial para substituir apenas as listas de localização após busca ou troca de página.
   */
  'comandaRestaurante.atendimento.atualizarLocalizacaoAtendimento': {
    kind: 'qry';
    input: { mesaTermo?: string; comandaNumero?: number; itemTermo?: string; mesasPage?: number; comandasPage?: number; itensPage?: number };
    output: { contextoAtendimento: ContextoAtendimento };
    meta: { output: {}; lists: {}; params: {} };
    rules: [];
    access: { actors: ['garcom']; grants: ['garcomAtendimentoComandas']; scope: 'organization' };
  };
  /**
   * Finalidade: Carrega a comanda escolhida com todas as linhas necessárias para o garçom conferir, lançar ou cancelar um item.
   * Entrada: comandaId é o identificador da comanda selecionada na localização.
   * Processamento: Lê a comanda e sua mesa, reúne todos os itens lançados e cancelados com o nome do cardápio e calcula valorTotal de cada linha conforme valorTotalItemComandaCalculado. Calcula subtotal apenas pela soma das linhas não canceladas conforme subtotalComandaCalculado, sem gravar campos derivados.
   * Saída: Retorna a comanda completa com linhas, situações, valores e subtotal para redesenhar a conferência e contextualizar as ações.
   */
  'comandaRestaurante.atendimento.obterComandaAtendimento': {
    kind: 'qry';
    input: { comandaId: string };
    output: { comanda: ComandaAtendimento };
    meta: { output: { comanda: { entity: 'Comanda'; many: false } }; lists: {}; params: {} };
    rules: ['subtotalComandaCalculado', 'valorTotalItemComandaCalculado'];
    access: { actors: ['garcom']; grants: ['garcomAtendimentoComandas']; scope: 'organization' };
  };
  /**
   * Finalidade: Abre uma nova comanda para a mesa disponível selecionada e devolve imediatamente seu estado de atendimento.
   * Entrada: mesaId é a chave da mesa que preencherá o vínculo obrigatório Comanda.mesaId.
   * Processamento: Em transação, confirma que a mesa está disponível conforme mesaDisponivelParaAbrirComanda e que não existe outra comanda open para ela conforme umaComandaAbertaPorMesa. Emite o número sequencial, cria a comanda em situação open e calcula o subtotal vazio segundo subtotalComandaCalculado.
   * Saída: Retorna a comanda recém-aberta, com mesa, número, situação, linhas vazias e subtotal, para a página passar diretamente à conferência e ao lançamento.
   */
  'comandaRestaurante.atendimento.abrirComanda': {
    kind: 'cmd';
    writes: 'Comanda.create';
    input: { mesaId: string };
    output: { comanda: ComandaAtendimento };
    meta: { output: { comanda: { entity: 'Comanda'; many: false } }; lists: {}; params: {} };
    rules: ['mesaDisponivelParaAbrirComanda', 'umaComandaAbertaPorMesa', 'subtotalComandaCalculado'];
    access: { actors: ['garcom']; grants: ['garcomAtendimentoComandas']; scope: 'organization' };
  };
  /**
   * Finalidade: Registra o pedido informado na comanda aberta e retorna a comanda integralmente atualizada.
   * Entrada: comandaId vincula o lançamento à comanda; itemCardapioId identifica o item escolhido; quantidade e observacao preenchem os dados do pedido.
   * Processamento: Recusa o lançamento se a comanda não estiver open conforme itensSomenteEmComandaAberta. Obtém o preço vigente do item e o registra como precoUnitario conforme precoUnitarioRegistradoNoLancamento, calcula valorTotal conforme valorTotalItemComandaCalculado e recalcula o subtotal conforme subtotalComandaCalculado.
   * Saída: Retorna a comanda com a nova linha, os valores calculados e o subtotal atualizado, dispensando nova consulta para redesenhar a conferência.
   */
  'comandaRestaurante.atendimento.lancarItem': {
    kind: 'cmd';
    writes: 'ItemComanda.create';
    input: { comandaId: string; itemCardapioId: string; quantidade: number; observacao?: string };
    output: { comanda: ComandaAtendimento };
    meta: { output: { comanda: { entity: 'Comanda'; many: false } }; lists: {}; params: {} };
    rules: ['itensSomenteEmComandaAberta', 'precoUnitarioRegistradoNoLancamento', 'valorTotalItemComandaCalculado', 'subtotalComandaCalculado'];
    access: { actors: ['garcom']; grants: ['garcomAtendimentoComandas']; scope: 'organization' };
  };
  /**
   * Finalidade: Cancela o item lançado por engano e devolve a comanda com o novo subtotal para conferência imediata.
   * Entrada: id e version identificam o item da comanda e protegem a transição contra alteração concorrente.
   * Processamento: Executa a transição cancelarItemComanda somente para uma linha launched cuja comanda permaneça open, recusando os demais casos conforme itemComandaOperacaoSomenteComandaAberta. Mantém a linha no histórico com situação canceled e recalcula o subtotal sem ela conforme subtotalComandaCalculado.
   * Saída: Retorna a comanda completa com o item marcado como canceled e subtotal atualizado, sem exigir uma segunda chamada.
   */
  'comandaRestaurante.atendimento.cancelarItem': {
    kind: 'cmd';
    writes: 'ItemComanda.cancelarItemComanda';
    input: { id: string; version: number };
    output: { comanda: ComandaAtendimento };
    meta: { output: { comanda: { entity: 'Comanda'; many: false } }; lists: {}; params: {} };
    rules: ['itemComandaOperacaoSomenteComandaAberta', 'subtotalComandaCalculado'];
    access: { actors: ['garcom']; grants: ['garcomAtendimentoComandas']; scope: 'organization' };
  };
}
